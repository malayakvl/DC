import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
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
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import InputTextarea from '../../../Components/Form/InputTextarea';
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
    setValues((values) => ({
      ...values,
      ['event_date']: eventDate,
      ['doctor_id']: doctorId,
      ['status_id']: eventStatus,
      ['cabinet_id']: cabinetId,
    }));
  }, [eventDate, doctorId, eventStatus, cabinetId]);

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
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        dispatch(showOverlayAction(false));
        dispatch(showSchedulePopupAction(false));
        dispatch(setPopupAction(false));
      },
      onError: (errors) => {
        console.error('Ошибки при сохранении:', errors);
      },
    });
  };

  const renderService = (item) => {
    return (
      <div
        key={item.id}
        className="flex items-center justify-between p-3 mb-2 bg-slate-50 border border-slate-200/80 rounded-xl text-sm"
      >
        <div className="flex-1 min-w-0 pr-2">
          <div className="font-semibold text-slate-900 truncate">{item.name}</div>
          <div className="text-xs text-slate-500 font-mono">
            {item.total_price} {currency}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition"
            onClick={() => dispatch(minusServiceAction(item))}
          >
            −
          </button>
          <span className="w-6 text-center font-semibold text-xs text-slate-800">
            {item.qty ?? 1}
          </span>
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition"
            onClick={() => dispatch(plusServiceAction(item))}
          >
            +
          </button>
        </div>

        <div className="w-20 text-right font-mono font-bold text-xs text-slate-900 ml-4">
          {item.total_price * (item.qty ?? 1)} {currency}
        </div>

        <button
          type="button"
          className="p-1.5 ml-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
          onClick={() => dispatch(setServicesAction(item))}
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const addService = (_item) => {
    dispatch(setServicesAction(_item));
  };

  return (
    <section className={`scheduler-popup ${showPopup ? '' : 'hidden'}`}>
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          {formData?.id
            ? msg.get('mCategories.pricing.edit')
            : msg.get('scheduler.title.create.visit')}
        </h2>
      </div>
      <form
        onSubmit={(event) => submit(event)}
        className="p-6 space-y-4 min-w-[420px] "
        encType="multipart/form-data"
      >
        <EventStatus />

        <EventPatient values={values} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <InputText
              name="title"
              values={values}
              dataValue={values.title}
              value={values.title}
              onChange={handleChange}
              required
              label={msg.get('scheduler.form.title')}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
          </div>
          <div>
            <InputSelect
              name="cabinet_id"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              values={values}
              options={cabinetData}
              onChange={handleChangeSelect}
              required
              label={msg.get('scheduler.form.cabinet')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <InputSelect
              name="doctor_id"
              values={values}
              options={customerData}
              onChange={handleChangeSelect}
              required
              label={msg.get('scheduler.form.doctor')}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
          </div>
          <div>
            <InputSelect
              name="assistent_id"
              values={values}
              options={assistantData}
              onChange={handleChangeSelect}
              required
              label={msg.get('scheduler.form.assistent')}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
          </div>
        </div>

        {timeStart && (
          <div className="grid grid-cols-3 gap-3">
            <div className="relative">
              <span className="block text-xs font-semibold text-slate-600 mb-1">
                {msg.get('scheduler.sch.date')}
              </span>
              <InputMask
                mask="99.99.9999"
                name="event_date"
                defaultValue={eventDate}
                onChange={(newValue) => handleChangeTimeFrom(newValue)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>
            <div className="relative">
              <span className="block text-xs font-semibold text-slate-600 mb-1">
                {msg.get('scheduler.time.from')}
              </span>
              <InputMask
                mask="99:99"
                name="event_time_from"
                defaultValue={formData.event_time_from ? formData.event_time_from : timeStart}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                onChange={(newValue) => handleChangeTimeFrom(newValue)}
              />
            </div>
            <div className="relative">
              <span className="block text-xs font-semibold text-slate-600 mb-1">
                {msg.get('scheduler.time.to')}
              </span>
              <InputMask
                mask="99:99"
                name="event_time_to"
                defaultValue={formData.event_time_to ? formData.event_time_to : timeEnd}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                onChange={(e) => handleChangeTimeTo(e.target.value)}
              />
            </div>
          </div>
        )}

        <InputTextarea
          name="comment"
          values={values}
          value={values.comment}
          onChange={handleChange}
          required
          label={msg.get('scheduler.form.comment')}
          className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition min-h-[80px]"
        />

        <div className="manipulation flex flex-col pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 text-xs font-semibold cursor-pointer w-fit py-1 px-2 rounded-lg bg-teal-50/60 border border-teal-100 transition"
            onClick={() => setShowServices(!showServices)}
          >
            <ListPlus className="w-4 h-4" />
            <span>{msg.get('scheduler.btn.add')}</span>
          </button>

          <div className="mt-3">{popupServices?.map((item) => renderService(item))}</div>

          {showServices && (
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-700 mb-2">Категорії</div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                  {serviceCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        selectedCategory === category.id
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="truncate">{category.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCategory === category.id ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {services[category.id]?.length ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-700">Послуги</div>
                </div>
                <div className="max-h-[200px] overflow-y-auto space-y-1.5 pr-1">
                  {(services[selectedCategory] || []).length === 0 && (
                    <div className="text-xs text-slate-400 text-center py-4">
                      У даній категорії ще немає послуг
                    </div>
                  )}

                  {(services[selectedCategory] || []).map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-2 bg-white border border-slate-200/80 rounded-xl hover:border-teal-400 transition cursor-pointer group"
                      onClick={() => addService(service)}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-teal-600 transition truncate">
                          {service.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {service.total_price} ₴
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-6 h-6 rounded-lg bg-slate-100 text-teal-700 font-bold flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition text-xs shrink-0"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <SecondaryButton
            type="button"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
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

          <PrimaryButton disabled={processing} className="px-5 py-2 text-xs font-semibold">
            {msg.get('scheduler.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-xs text-emerald-600 font-medium">{msg.get('mCategories.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
