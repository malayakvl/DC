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
        className="p-0 space-y-4 min-w-[420px] "
        encType="multipart/form-data"
      >
        <EventStatus />

        <div className="px-space-xl py-space-lg space-y-space-lg max-h-[calc(86vh-130px)] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span>Пацієнт</span>
                  <span className="text-rose-500">*</span>
                </label>
                <button
                  className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1 transition"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">person_add</span>
                  <span>+ Створити нову картку</span>
                </button>
              </div>

              <div className="relative p-1">
                <div className="max-h-[50px] flex items-center w-full px-3.5 py-2.5 rounded-xl bg-[#f2f3ff] border border-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-teal-700 text-[20px] mr-2.5 shrink-0">
                    person_search
                  </span>
                  <input
                    className="input-calendar w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0"
                    id="patientInput"
                    placeholder="Введіть ПІБ, телефон або номер картки пацієнта..."
                    type="text"
                    defaultValue="Коваленко Анна Михайлівна"
                  />
                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span className="px-2 py-0.5 text-xs font-mono font-medium text-teal-800 bg-teal-100/60 rounded-md whitespace-nowrap">
                      #P-1120
                    </span>
                    <button
                      className="p-1 hover:bg-slate-200/60 rounded-lg text-slate-500 hover:text-slate-800 transition flex items-center justify-center shrink-0"
                      type="button"
                      title="Картка пацієнта"
                    >
                      <span className="material-symbols-outlined text-[18px]">badge</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 p-3 bg-[#f2f3ff] border border-slate-200/60 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                    АК
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-0">
                    <span className="font-semibold text-slate-900">+38 (067) 412-89-01</span>
                    <span className="mx-1.5 text-slate-300 hidden sm:inline">•</span>
                    <span className="text-slate-500">Останній візит: 14 серпня 2026</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-slate-800 shadow-2xs">
                    <span className="material-symbols-outlined text-[14px] text-teal-700">
                      clinical_notes
                    </span>
                    Алергія: Пеніциліни
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-teal-800 font-semibold shadow-2xs">
                    Баланс: 0.00 ₴
                  </span>
                </div>
              </div>

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
                        Кабінет 1 (Терапія)
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
                        НР
                      </div>
                      <span className="text-xs font-medium text-slate-900 truncate">
                        Наталія Радчук
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
                        ІС
                      </div>
                      <span className="text-xs font-medium text-slate-900 truncate">
                        Ірина Савченко
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
                      Дата візиту
                    </label>
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                      <span className="text-xs font-mono font-medium text-slate-900">
                        21.09.2026
                      </span>
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
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                      <span className="text-xs font-mono font-medium text-slate-900">09:00</span>
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
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium text-slate-900">09:30</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          30 хв
                        </span>
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
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition"
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
            <div className="mt-3 p-3 bg-[#f2f3ff] border border-slate-200/80 rounded-2xl flex flex-col md:flex-row gap-3">
              {/* Левая колонка с категориями (фиксированная ширина) */}
              <div className="w-full md:w-[240px] shrink-0 space-y-1">
                <div className="text-xs font-bold text-slate-700 mb-2 px-1">Категорії</div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                  {serviceCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
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

              {/* Правая колонка с услугами (занимает всю оставшуюся ширину) */}
              <div className="flex-1 space-y-2 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
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
                    <div className="mt-2.5 p-2 bg-[#f2f3ff] border border-slate-200/80 rounded-xl shadow-2xs flex items-center justify-between gap-3">
                      {/* Название услуги */}
                      <div className="text-xs font-semibold text-slate-900 truncate min-w-0 flex-1">
                        Пломба композитна світлового...
                      </div>

                      {/* Правая часть: Цена и кнопка удаления */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-slate-600 font-medium">
                          100.00 ₴
                        </span>
                        <button
                          type="button"
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 text-teal-700 font-bold flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition text-sm shadow-2xs"
                          title="Видалити послугу"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-5 mt-5 border-t border-slate-100 pb-4">
          {/* Сообщение об успешном сохранении (слева от кнопок, появляется плавно) */}
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

          {/* Кнопка "Закрыть" (стиль серой кнопки) */}
          <button
            type="button"
            // h-9 для идеального выравнивания, px-5 для правильного отступа
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

          {/* Кнопка "Сохранить" (стиль teal кнопки) */}
          <button
            type="submit" // Обычно это submit, если форма
            disabled={processing}
            // h-9 для выравнивания, фирменный teal, тень shadow-sm, состояние disabled
            className="h-9 px-6 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processing ? 'Обробка...' : msg.get('scheduler.save')}
          </button>
        </div>
      </form>
    </section>
  );
}
