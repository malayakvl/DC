import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngScheduler from '../../../Lang/Scheduler/translation';
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
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import { useAppDispatch } from '../../../hooks';

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
}: {
  formData: any;
  clinicData: any;
  cabinetData: any;
  customerData: any;
  assistantData: any;
  currency: any;
  serviceCategories: any;
  services?: any;
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const dispatch = useAppDispatch();

  const parsedTimePlus30 = () => {
    const time = timeStart;
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(2025, 0, 1, hours, minutes);
    date.setMinutes(date.getMinutes() + 30);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const [values, setValues] = useState<Record<string, any>>({
    title: formData.title,
    clinic_id: clinicData.id,
    cabinet_id: formData.cabinet_id,
    doctor_id: formData.doctor_id,
    assistent: '',
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
  const newPatientData = useSelector(newPatientDataSelector);
  const eventDate = useSelector(popupDateSelector);
  const showPopup = useSelector(showSchedulePopupSelector);
  const popupServices = useSelector(servicesSelector);
  const [showServices, setShowServices] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    serviceCategories.length ? serviceCategories[0].id : null
  );

  const handleChangeSelect = (e: any) => {
    const key = e.target.id;
    const value = e.target.value;
    console.log(key, value);
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
    console.log(values);
  };

  const handleChange = (e: any) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeTimeFrom = (value: any) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const isValid = regex.test(value);
    if (isValid) {
      setValues((values) => ({
        ...values,
        ['event_time_from']: value,
      }));
    }
  };

  const handleChangeTimeTo = (value: any) => {
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

  const submit = (e: any) => {
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

  const renderService = (item: any) => {
    return (
      <div
        key={item.id}
        className="flex items-center justify-between p-3 mb-2 bg-[#f2f3ff] border border-slate-200/80 rounded-xl text-sm"
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
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            onClick={() => dispatch(minusServiceAction(item))}
          >
            −
          </button>
          <span className="w-6 text-center font-semibold text-xs text-slate-800">
            {item.qty ?? 1}
          </span>
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            onClick={() => {
              dispatch(plusServiceAction(item));
            }}
          >
            +
          </button>
        </div>

        <div className="w-20 text-right font-mono font-bold text-xs text-slate-900 ml-4">
          {item.total_price * (item.qty ?? 1)} {currency}
        </div>

        <button
          type="button"
          className="p-1.5 ml-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
          onClick={() => dispatch(setServicesAction(item))}
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    );
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
        className="p-0 space-y-4 min-w-[420px] "
        encType="multipart/form-data"
      >
        <EventStatus />

        <EventPatient values={values} />

        <div className={'w-full'}>
          <InputText
            name={'title'}
            values={values}
            dataValue={values.title}
            value={values.title}
            onChange={handleChange}
            required
            className={'w-full scheduler-select'}
            label={msg.get('scheduler.form.title')}
          />
        </div>

        <div className="px-space-xl py-space-lg space-y-space-lg max-h-[calc(75vh-130px)] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1.5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Room/Cabinet Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>Кабінет</span>
                  </label>
                  <div className={'w-full'}>
                    <InputSelect
                      name={'cabinet_id'}
                      className={'w-full scheduler-select'}
                      values={values}
                      value={values.cabinet_id}
                      options={cabinetData}
                      onChange={handleChangeSelect}
                      required
                      label={null}
                    />
                  </div>
                </div>

                {/* Doctor Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>Лікар</span>
                  </label>
                  <InputSelect
                    name={'doctor_id'}
                    values={values}
                    value={values.doctor_id}
                    options={customerData}
                    defaultValue={formData.doctor_id}
                    onChange={handleChangeSelect}
                    className={'w-full scheduler-select'}
                    required
                    label={null}
                  />
                </div>

                {/* Assistant Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>Асистент</span>
                  </label>
                  <InputSelect
                    name={'assistent_id'}
                    values={values}
                    value={values.assistent}
                    options={assistantData}
                    defaultValue={''}
                    onChange={handleChangeSelect}
                    className={'w-full scheduler-select'}
                    required
                    label={null}
                  />
                </div>
              </div>

              <div className="p-4 bg-[#f2f3ff] rounded-2xl border border-slate-200/60 flex flex-col gap-3 shadow-sm mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {msg.get('scheduler.visit.date')}
                    </label>
                    <div className="flex items-center justify-between px-3.5 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                      <InputMask
                        mask="99.99.9999"
                        name={'event_date'}
                        defaultValue={eventDate}
                        onChange={(newValue) => handleChangeTimeFrom(newValue)}
                        className={'shc-form-date'}
                      />
                      <span className="material-symbols-outlined text-teal-700 text-[18px]">
                        calendar_month
                      </span>
                    </div>
                  </div>

                  {/* Start Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Початок
                    </label>
                    <div className="flex items-center justify-between px-3.5 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                      <InputMask
                        mask="99:99"
                        name={'time_start'}
                        defaultValue={timeStart}
                        onChange={(newValue) => handleChangeTimeFrom(newValue)}
                        className="text-xs font-mono font-medium text-slate-900 bg-transparent border-none outline-none w-full"
                      />
                      <span className="material-symbols-outlined text-teal-700 text-[18px]">
                        schedule
                      </span>
                    </div>
                  </div>

                  {/* End Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Кінець (авто)
                    </label>
                    <div className="flex items-center justify-between px-3.5 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <InputMask
                          mask="99:99"
                          name={'time_end'}
                          defaultValue={timeEnd}
                          onChange={(newValue) => handleChangeTimeTo(newValue)}
                          className="text-xs font-mono font-medium text-slate-900 bg-transparent border-none outline-none w-full border-0"
                        />
                      </div>
                      <span className="material-symbols-outlined text-teal-700 text-[18px]">
                        schedule
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Час вільний: лікар, асистент та кабінет доступні для запису</span>
                  </div>
                  <button
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition cursor-pointer"
                    type="button"
                  >
                    + Інтервал перерви (10 хв)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="manipulation flex flex-col pt-2">
          {/* Блок выбранных услуг */}
          {popupServices && popupServices.length > 0 && (
            <div className="mb-3 space-y-1">
              {popupServices.map((item: any) => renderService(item))}
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 text-xs font-semibold cursor-pointer w-fit py-1 px-2 rounded-lg bg-teal-50/60 border border-teal-100 transition"
            onClick={() => setShowServices(!showServices)}
          >
            <ListPlus className="w-4 h-4" />
            <span>{msg.get('scheduler.btn.add')}</span>
          </button>

          {showServices && (
            <div className="mt-3 p-3 bg-[#f2f3ff] border border-slate-200/80 rounded-2xl flex flex-col md:flex-row gap-3">
              {/* Левая колонка с категориями */}
              <div className="w-full md:w-[240px] shrink-0 space-y-1">
                <div className="text-xs font-bold text-slate-700 mb-2 px-1">Категорії</div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                  {serviceCategories.map((category: any) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        selectedCategory === category.id
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="truncate text-[13px] text-left pr-2">{category.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] shrink-0 ${selectedCategory === category.id ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {services[category.id]?.length ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Правая колонка с услугами выбранной категории */}
              <div className="flex-1 space-y-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-700">Послуги</div>
                </div>
                <div className="max-h-[200px] overflow-y-auto space-y-1.5 pr-1">
                  {(!selectedCategory || (services[selectedCategory] || []).length === 0) && (
                    <div className="text-xs text-slate-400 text-center py-4">
                      У даній категорії ще немає послуг
                    </div>
                  )}

                  {((selectedCategory !== null && services[selectedCategory]) || []).map(
                    (service: any) => {
                      // Перевіряємо, чи ця послуга вже додана до списку обраних
                      const isSelected = popupServices.some((item: any) => item.id === service.id);

                      return (
                        <div
                          key={service.id}
                          className="mt-2.5 p-2 bg-[#f2f3ff] border border-slate-200/80 rounded-xl shadow-2xs flex items-center justify-between gap-3"
                        >
                          {/* Название услуги */}
                          <div className="text-xs font-semibold text-slate-900 truncate min-w-0 flex-1">
                            {service.name}
                          </div>

                          {/* Правая часть: Цена и кнопка добавления */}
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-mono text-slate-600 font-medium">
                              {service.total_price} {currency}
                            </span>
                            <button
                              type="button"
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition text-sm shadow-2xs cursor-pointer relative z-10 ${
                                isSelected
                                  ? 'bg-teal-600 border-teal-600 text-white font-bold'
                                  : 'bg-white border-slate-200/80 text-teal-700 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 font-bold'
                              }`}
                              title={
                                isSelected
                                  ? 'Вже додано (натисніть, щоб видалити)'
                                  : 'Додати послугу'
                              }
                              onClick={(e) => {
                                e.stopPropagation(); // Защита от всплытия событий
                                dispatch(setServicesAction(service));
                              }}
                            >
                              {isSelected ? '✓' : '+'}
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-5 mt-5 border-t border-slate-100 pb-4">
          <Transition
            show={recentlySuccessful}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-300"
            leaveTo="opacity-0"
          >
            <p className="text-xs text-emerald-700 font-medium pr-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              {msg.get('mCategories.saved')}
            </p>
          </Transition>

          <button
            type="button"
            className="h-9 px-5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center"
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
          </button>

          <button
            type="submit"
            disabled={processing}
            className="h-9 px-6 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {processing ? 'Обробка...' : msg.get('scheduler.save')}
          </button>
        </div>
      </form>
    </section>
  );
}