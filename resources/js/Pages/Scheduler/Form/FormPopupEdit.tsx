import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngScheduler from '../../../Lang/Scheduler/translation';
import {
  minusServiceAction,
  plusServiceAction,
  setServicesAction,
  showScheduleEditPopupAction,
  showSchedulePopupAction,
} from '@/Redux/Scheduler';
import 'rc-time-picker/assets/index.css';
import InputMask from 'react-input-mask';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import {
  eventsDataSelector,
  newPatientDataSelector,
  patientIdSelector,
  popupCabinetSelector,
  popupDateSelector,
  popupDoctorSelector,
  popupStatusSelector,
  popupTimeSelector,
  servicesSelector,
  showEditPopupSelector,
  popupAssistantSelector,
} from '@/Redux/Scheduler/selectors';
import EventStatus from '../../../Components/Scheduler/EventStatus';
import EventPatient from '../../../Components/Scheduler/EventPatient';
import { setPopupAction, showOverlayAction } from '@/Redux/Layout';
import { Trash, ListPlus } from 'lucide-react';

export default function SchedulerFormEdit({
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
  const currentEventData = useSelector(eventsDataSelector);

  const formatDate = (date) => {
    if (!date) return '';
    return dayjs(date).format('DD.MM.YYYY');
  };

  const [values, setValues] = useState({
    id: currentEventData.id || '',
    title: currentEventData.title || '',
    clinic_id: clinicData.id,
    cabinet_id: currentEventData.cabinet_id,
    doctor_id: currentEventData.doctor_id,
    assistent_id: currentEventData.assistent_id,
    comment: currentEventData.comment || '',
    status_id: currentEventData.status_id,
    event_date: formatDate(currentEventData.event_date),
    event_time_from: currentEventData.event_time_from,
    event_time_to: currentEventData.event_time_to,
    patient: currentEventData.patient_name,
    patient_id: currentEventData.patient_id,
  });

  const { processing, recentlySuccessful } = useForm();
  const doctorId = useSelector(popupDoctorSelector);
  const assistent = useSelector(popupAssistantSelector);
  const cabinetId = useSelector(popupCabinetSelector);
  const timeStart = useSelector(popupTimeSelector);
  const timeEnd = currentEventData.event_time_to;
  const patientId = useSelector(patientIdSelector);
  const eventStatus = useSelector(popupStatusSelector);
  const dispatch = useDispatch();
  const newPatientData = useSelector(newPatientDataSelector);
  const eventDate = useSelector(popupDateSelector);
  const showPopup = useSelector(showEditPopupSelector);
  const popupServices = useSelector(servicesSelector);
  const [showServices, setShowServices] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    serviceCategories.length ? serviceCategories[0].id : null
  );

  const handleChange = (e) => {
    const key = e.target.id || e.target.name;
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
    if (timeStart) {
      setValues((values) => ({
        ...values,
        ['event_time_from']: timeStart,
        ['event_time_to']: timeEnd,
        ['status_id']: eventStatus,
      }));
    }
  }, [timeStart]);

  useEffect(() => {
    setValues((values) => ({
      ...values,
      ['event_date']: eventDate || values.event_date,
      ['doctor_id']: doctorId || values.doctor_id,
      ['assistent_id']: assistent || values.assistent_id,
      ['status_id']: eventStatus || values.status_id,
      ['cabinet_id']: cabinetId || values.cabinet_id,
    }));
  }, [eventDate, doctorId, assistent, eventStatus, cabinetId]);

  const submit = (e) => {
    e.preventDefault();

    values['newPatientData'] = newPatientData;
    if (eventDate) {
      const [day, month, year] = eventDate.split('.');
      if (day && month && year) {
        values['event_date'] = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
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
        dispatch(setPopupAction(false));
        dispatch(showSchedulePopupAction(false));
        dispatch(showScheduleEditPopupAction(false));
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
        className="flex items-center justify-between p-3 mb-2 bg-[#f2f3ff] border border-slate-200/80 rounded-xl text-sm"
      >
        <div className="flex-1 min-w-0 pr-2">
          <div className="font-semibold text-slate-900 truncate">{item.name}</div>
          <div className="text-xs text-slate-500 font-mono">
            {item.total_price ?? item.price} {currency}
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
            onClick={() => dispatch(plusServiceAction(item))}
          >
            +
          </button>
        </div>

        <div className="w-20 text-right font-mono font-bold text-xs text-slate-900 ml-4">
          {(item.total_price ?? item.price) * (item.qty ?? 1)} {currency}
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
        className="p-0 space-y-4 min-w-[420px]"
        encType="multipart/form-data"
      >
        <EventStatus />

        <EventPatient
          values={values}
          editPatientData={{ patient: values.patient, patient_id: values.patient_id }}
        />

        <div className="px-space-xl py-space-lg space-y-space-lg max-h-[calc(75vh-130px)] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Room/Cabinet Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span>Кабінет</span>
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#f2f3ff] border border-slate-200/60 hover:bg-slate-100/80 transition-all cursor-pointer shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-teal-700 text-[20px] shrink-0">
                      meeting_room
                    </span>
                    <span className="text-xs font-medium text-slate-900 truncate">
                      {cabinetData.find((c) => c.id == values.cabinet_id)?.name ||
                        'Виберіть кабінет'}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">
                    unfold_more
                  </span>
                </div>
              </div>

              {/* Doctor Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span>Лікар</span>
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#f2f3ff] border border-slate-200/60 hover:bg-slate-100/80 transition-all cursor-pointer shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                      ЛК
                    </div>
                    <span className="text-xs font-medium text-slate-900 truncate">
                      {customerData.find((d) => d.id == values.doctor_id)?.name ||
                        'Виберіть лікаря'}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">
                    unfold_more
                  </span>
                </div>
              </div>

              {/* Assistant Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span>Асистент</span>
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#f2f3ff] border border-slate-200/60 hover:bg-slate-100/80 transition-all cursor-pointer shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                      АС
                    </div>
                    <span className="text-xs font-medium text-slate-900 truncate">
                      {assistantData.find((a) => a.id == values.assistent_id)?.name || 'Не вибрано'}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">
                    unfold_more
                  </span>
                </div>
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
                      value={values.event_date}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, event_date: e.target.value }));
                      }}
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
                      name={'event_time_from'}
                      value={values.event_time_from}
                      onChange={(e) => handleChangeTimeFrom(e.target.value)}
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
                    Кінець
                  </label>
                  <div className="flex items-center justify-between px-3.5 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <InputMask
                      mask="99:99"
                      name={'event_time_to'}
                      value={values.event_time_to}
                      onChange={(e) => handleChangeTimeTo(e.target.value)}
                      className="text-xs font-mono font-medium text-slate-900 bg-transparent border-none outline-none w-full border-0"
                    />
                    <span className="material-symbols-outlined text-teal-700 text-[18px]">
                      schedule
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="manipulation flex flex-col pt-2">
          {popupServices && popupServices.length > 0 && (
            <div className="mb-3 space-y-1">{popupServices.map((item) => renderService(item))}</div>
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
              {/* Категории */}
              <div className="w-full md:w-[240px] shrink-0 space-y-1">
                <div className="text-xs font-bold text-slate-700 mb-2 px-1">Категорії</div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                  {serviceCategories.map((category) => (
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

              {/* Услуги */}
              <div className="flex-1 space-y-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                <div className="text-xs font-bold text-slate-700">Послуги</div>
                <div className="max-h-[200px] overflow-y-auto space-y-1.5 pr-1">
                  {(services[selectedCategory] || []).length === 0 && (
                    <div className="text-xs text-slate-400 text-center py-4">
                      У даній категорії ще немає послуг
                    </div>
                  )}

                  {(services[selectedCategory] || []).map((service) => {
                    const isSelected = popupServices.some((item) => item.id === service.id);

                    return (
                      <div
                        key={service.id}
                        className="mt-2.5 p-2 bg-[#f2f3ff] border border-slate-200/80 rounded-xl shadow-2xs flex items-center justify-between gap-3"
                      >
                        <div className="text-xs font-semibold text-slate-900 truncate min-w-0 flex-1">
                          {service.name}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono text-slate-600 font-medium">
                            {service.total_price ?? service.price} {currency}
                          </span>
                          <button
                            type="button"
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition text-sm shadow-2xs cursor-pointer relative z-10 ${
                              isSelected
                                ? 'bg-teal-600 border-teal-600 text-white font-bold'
                                : 'bg-white border-slate-200/80 text-teal-700 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 font-bold'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(setServicesAction(service));
                            }}
                          >
                            {isSelected ? '✓' : '+'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
              dispatch(showScheduleEditPopupAction(false));
              dispatch(showOverlayAction(false));
              dispatch(setPopupClass ? setPopupAction(false) : () => {});
            }}
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
