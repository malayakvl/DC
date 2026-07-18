import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import InputText from '../../../Components/Form/InputText';
import InputTextarea from '../../../Components/Form/InputTextarea';
import InputSelect from '../../../Components/Form/InputSelect';
import lngScheduler from '../../../Lang/Scheduler/translation';
import SecondaryButton from '../../../Components/Form/SecondaryButton';
import {
  minusServiceAction,
  plusServiceAction,
  setServicesAction,
  showSchedulePopupAction,
} from '@/Redux/Scheduler';
import 'rc-time-picker/assets/index.css';
import InputMask from 'react-input-mask';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import {
  newPatientDataSelector,
  patientIdSelector,
  popupCabinetSelector,
  popupDateSelector,
  popupDoctorSelector,
  popupStatusSelector,
  popupTimeSelector,
  servicesSelector,
  showSchedulePopupSelector,
} from '@/Redux/Scheduler/selectors';
import EventStatus from '../../../Components/Scheduler/EventStatus';
import EventPatient from '../../../Components/Scheduler/EventPatient';
import { setPopupAction, showOverlayAction } from '@/Redux/Layout';
import { Trash, ListPlus } from 'lucide-react';

export default function SchedulerFormCreate({
  formData,
  clinicData,
  cabinetData,
  customerData,
  assistantData,
  currency,
  serviceCategories,
  services,
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const parsedTimePlus30 = () => {
    const time = timeStart;
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(2025, 0, 1, hours, minutes);
    date.setMinutes(date.getMinutes() + 30);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const [values, setValues] = useState({
    title: formData.title,
    clinic_id: clinicData.id,
    cabinet_id: formData.cabinet_id,
    doctor_id: formData.doctor_id,
    assistent: formData.assistent_id,
    comment: formData.comment,
    status_id: formData.status_id,
    event_date: formData.event_date,
    event_time_from: formData.event_time_from,
    event_time_to: formData.event_time_to,
  });

  const { processing, recentlySuccessful } = useForm();
  const doctorId = useSelector(popupDoctorSelector);
  const cabinetId = useSelector(popupCabinetSelector);
  const timeStart = useSelector(popupTimeSelector);
  console.log(timeStart);
  const timeEnd = parsedTimePlus30();
  const patientId = useSelector(patientIdSelector);
  const eventStatus = useSelector(popupStatusSelector);
  const dispatch = useDispatch();
  const newPatientData = useSelector(newPatientDataSelector);
  const eventDate = useSelector(popupDateSelector);
  const showPopup = useSelector(showSchedulePopupSelector);
  const popupServices = useSelector(servicesSelector);
  const [showServices, setShowServices] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    serviceCategories.length ? serviceCategories[0].id : null
  );
  const handleChangeSelect = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeTimeFrom = (value) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const isValid = regex.test(value);
    if (isValid) {
      setValues((values) => ({
        ...values,
        ['event_time_from']: value,
      }));
    }
  };

  const handleChangeTimeTo = (value) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const isValid = regex.test(value);
    if (isValid) {
      setValues((values) => ({
        ...values,
        ['event_time_to']: value,
      }));
    }
  };

  useEffect(() => {
    setValues((values) => ({
      ...values,
      ['event_time_from']: timeStart,
      ['event_time_to']: timeEnd,
      ['status_id']: eventStatus,
    }));
  }, [timeStart]);

  useEffect(() => {
    console.log('Setup cabinet', cabinetId);
    setValues((values) => ({
      ...values,
      ['event_date']: eventDate,
      ['doctor_id']: doctorId,
      ['status_id']: eventStatus,
      ['cabinet_id']: cabinetId,
    }));
  }, [eventDate, doctorId, eventStatus, cabinetId]);

  const submitOld = (e) => {
    e.preventDefault();
    values['newPatientData'] = newPatientData;
    // const inputDate = '01.07.2025'; // Input in DD.MM.YYYY format
    const [day, month, year] = eventDate.split('.'); // Split the input string
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    values['event_date'] = formattedDate;
    values['services'] = popupServices;
    if (patientId) {
      values['patientId'] = patientId;
    }
    if (formData.id) {
      router.post(`/scheduler/update?id=${formData.id}`, values);
    } else {
      router.post('/scheduler/update', values);
    }
    dispatch(showOverlayAction(false));
  };

  const submit = (e) => {
    e.preventDefault();

    values['newPatientData'] = newPatientData;
    const [day, month, year] = eventDate.split('.');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    values['event_date'] = formattedDate;
    values['services'] = popupServices;

    if (patientId) {
      values['patientId'] = patientId;
    }

    const url = formData.id ? `/scheduler/update?id=${formData.id}` : '/scheduler/update';

    router.post(url, values, {
      preserveState: true, // Чтобы страница не перезагружалась и не сбрасывала стейт React
      preserveScroll: true, // Чтобы сетка календаря не прыгала вверх
      onSuccess: () => {
        // Когда бэк успешно обработал запрос, Inertia обновит пропсы в Index.tsx
        // Нам нужно просто закрыть модалку
        dispatch(showOverlayAction(false));
        dispatch(showSchedulePopupAction(false));
        dispatch(showOverlayAction(false));
        dispatch(setPopupAction(false));

        // Если у тебя тут еще дергаются стейты закрытия конкретных попапов, добавь их:
        // dispatch(showSchedulePopupAction(false));
        // dispatch(showScheduleEditPopupAction(false));
      },
      onError: (errors) => {
        console.error('Ошибки при сохранении:', errors);
      },
    });
  };

  const renderService = (item) => {
    return (
      <div className="selected-service selected-services-block">
        <div className="service-info">
          <div className="service-title">{item.name}</div>
          <div className="service-price-selected">
            {item.price} {currency}
          </div>
        </div>

        <div className="service-actions">
          <button className="qty-btn" onClick={() => dispatch(minusServiceAction(item))}>
            −
          </button>

          <span className="qty-value">{item.qty ?? 1}</span>

          <button className="qty-btn" onClick={() => dispatch(plusServiceAction(item))}>
            +
          </button>
        </div>

        <div className="service-total">
          {item.price * item.qty} {currency}
        </div>

        <button className="delete-btn" onClick={() => dispatch(setServicesAction(item))}>
          <Trash className={'w-4 h-4 ml-2'} />
        </button>
      </div>
    );
  };

  const addService = (_item) => {
    dispatch(setServicesAction(_item));
  };

  return (
    <section className={`scheduler-popup ${showPopup ? '' : 'hidden'}`}>
      <header>
        <h2 className={'pt-7 pb-7'}>
          {formData?.id
            ? msg.get('mCategories.pricing.edit')
            : msg.get('scheduler.title.create.visit')}
        </h2>
      </header>

      <form
        onSubmit={(event) => submit(event)}
        className="mt-0 space-y-3 min-w-[350px]"
        encType="multipart/form-data"
      >
        <EventStatus />

        <EventPatient values={values} />

        <div className={'flex w-full'}>
          <div className={'w-1/2'}>
            <InputText
              name={'title'}
              values={values}
              dataValue={values.title}
              value={values.title}
              onChange={handleChange}
              required
              label={msg.get('scheduler.form.title')}
            />
          </div>
          <div className={'w-1/2 ml-3'}>
            <InputSelect
              name={'cabinet_id'}
              className={'w-1/2'}
              values={values}
              value={values.cabinet_id}
              options={cabinetData}
              onChange={handleChangeSelect}
              defaultValue={cabinetId}
              required
              label={msg.get('scheduler.form.cabinet')}
            />
          </div>
        </div>

        <div className={'flex w-full'}>
          <div className={'w-1/2'}>
            <InputSelect
              name={'doctor_id'}
              values={values}
              value={values.doctor_id}
              options={customerData}
              defaultValue={doctorId}
              onChange={handleChangeSelect}
              required
              label={msg.get('scheduler.form.doctor')}
            />
          </div>
          <div className={'w-1/2 ml-3'}>
            <InputSelect
              name={'assistent_id'}
              values={values}
              value={values.assistent}
              options={assistantData}
              defaultValue={doctorId}
              onChange={handleChangeSelect}
              required
              label={msg.get('scheduler.form.assistent')}
            />
          </div>
        </div>
        <div className={'clearfix'} />

        <div className={'clearfix'} />
        {timeStart && (
          <div className="flex">
            <div className={'w-1/3 relative'}>
              <span className={'block text-[14px]'}>{msg.get('scheduler.sch.date')}</span>
              <InputMask
                mask="99.99.9999"
                name={'event_date'}
                defaultValue={eventDate}
                onChange={(newValue) => handleChangeTimeFrom(newValue)}
                className={'shc-form-date'}
              />
              <i className={'f-calendar'} />
            </div>
            <div className={'w-1/3 relative'}>
              <span className={'block text-[14px]'}>{msg.get('scheduler.time.from')}</span>
              <InputMask
                mask="99:99"
                name={'event_time_from'}
                defaultValue={formData.event_time_from ? formData.event_time_from : timeStart}
                className={'shc-form-date'}
                onChange={(newValue) => handleChangeTimeFrom(newValue)}
              />
              <i className={'f-clock'} />
            </div>
            <div className={'w-1/3 relative'}>
              <span className={'block text-[14px]'}>{msg.get('scheduler.time.to')}</span>
              <InputMask
                mask="99:99"
                name={'event_time_to'}
                defaultValue={formData.event_time_to ? formData.event_time_to : timeEnd}
                className={'shc-form-date'}
                onChange={(e) => handleChangeTimeTo(e.target.value)}
              />
              <i className={'f-clock'} />
            </div>
          </div>
        )}
        <InputTextarea
          name={'comment'}
          values={values}
          value={values.comment}
          onChange={handleChange}
          required
          label={msg.get('scheduler.form.comment')}
        />
        <div className={'manipulation flex flex-col'}>
          <div
            className={'add-services'}
            onClick={() => {
              // dispatch(showPricePopupAction(true));
              setShowServices(!showServices);
            }}
          >
            <ListPlus className={'w-[16px] h-[16px] block mt-[4px] ml-[3px]'} />
            &nbsp;{msg.get('scheduler.btn.add')}
          </div>
          <div className="mt-2 ml-0">
            {popupServices?.map((item) => <>{renderService(item)}</>)}
          </div>
          {showServices && (
            <div className="services-selector">
              <div className="service-categories">
                <div className="services-title">Категорії</div>

                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>

                    <span className="category-count">{services[category.id]?.length ?? 0}</span>
                  </button>
                ))}
              </div>

              <div className="services-panel">
                <div className="services-header">
                  <div className="services-title">Послуги</div>

                  <input className="service-search" placeholder="Пошук..." />
                </div>

                <div className="services-list">
                  {(services[selectedCategory] || []).length === 0 && (
                    <div className="empty-services">У даній категорії ще немає послуг</div>
                  )}

                  {(services[selectedCategory] || []).map((service) => (
                    <div
                      key={service.id}
                      className="service-item"
                      onClick={() => addService(service)}
                    >
                      <div className="service-name">{service.name}</div>

                      <div className="service-duration">{service.duration ?? 30} хв</div>

                      <div className="service-price">{service.price} ₴</div>

                      <button type="button" className="service-add-btn">
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className={'clearfix'} />
        </div>
        <div className="flex items-center pb-7">
          <SecondaryButton
            className="btn-back"
            onClick={() => {
              const element = document.getElementsByTagName('body')[0];
              element.style.overflow = 'inherit';
              dispatch(showSchedulePopupAction(false));
              dispatch(showOverlayAction(false));
              dispatch(setPopupAction(false));
            }}
            title={msg.get('scheduler.close')}
          >
            {msg.get('scheduler.close')}
          </SecondaryButton>
          <PrimaryButton disabled={processing}>{msg.get('scheduler.save')}</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('mCategories.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
