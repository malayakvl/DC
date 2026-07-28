import React, { useMemo, useState, useRef, useEffect } from 'react';
import { addDays, format, parseISO, differenceInMinutes } from 'date-fns';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { cabinets, doctors, SchedulerEvent } from './mock/data';
import { generateTimeSlots } from './engine/timeEngine';
import { getEventLayout } from './engine/eventLayout';
import Index3Days from './Index3Days';
import { Head, router } from '@inertiajs/react';
import Lang from 'lang.js';
import lngScheduler from '../../Lang/Scheduler/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import {
  pricePopupSelector,
  showEditPopupSelector,
  showSchedulePopupSelector,
  viewScheduleSelector,
} from '@/Redux/Scheduler/selectors';
import SchedulerFormCreate from '@/Pages/Scheduler/Form/FormPopupCreate';
import SchedulerFormEdit from '@/Pages/Scheduler/Form/FormPopupEdit';
import moment from 'moment/moment';
import {
  setExistServicesAction,
  setPopupCabinetAction,
  setScheduleDateAction,
  setScheduleTimeAction,
  showSchedulePopupAction,
  setSchedulePopupDoctorAction,
  showScheduleEditPopupAction,
  setScheduleEditEventAction,
  showPricePopupAction,
  initServicesAction,
} from '@/Redux/Scheduler';
import { showOverlayAction } from '@/Redux/Layout';
import dayjs from 'dayjs';
import Pricing from './Pricing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/Form/SecondaryButton';
import SchedulerDayHeader from './components/SchedulerDayHeader';
import SchedulerTimeColumn from './components/SchedulerTimeColumn';

// ================= CORE GRID ENGINE =================
const SLOT_HEIGHT = 30;
const FREE_SLOT_BG = '#fbfdff';
const TODAY_BG = '#eef6ff';

function getDays(baseDate: string, count: number, appLang: string) {
  const start = parseISO(baseDate);

  return Array.from({ length: count }).map((_, i) => {
    const d = addDays(start, i);

    return {
      date: format(d, 'yyyy-MM-dd'),
      label: new Intl.DateTimeFormat(appLang, {
        weekday: 'short',
        day: '2-digit',
      }).format(d),
    };
  });
}

export default function Index({
  customerData,
  formData,
  clinicData,
  cabinetData,
  groupedOptions,
  assistantData,
  eventsData,
  currencyData,
  tree,
  services,
  serviceCategories,
  initialView = '3days',
  allowViewSwitch = true,
}) {
  const [baseDate, setBaseDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [typeView, setTypeView] = useState(initialView);
  const appLang = useSelector(appLangSelector);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setShowAlert] = useState(false);
  useSelector(pricePopupSelector);
  const showEventPopup = useSelector(showSchedulePopupSelector);
  const editEventPopup = useSelector(showEditPopupSelector);
  // Рефы для блокировки кликов после перетаскивания / ресайза
  const isResizingRef = React.useRef(false);
  const isDraggingRef = React.useRef(false);
  const blockClickRef = React.useRef(false); // <--- ДОБАВИТЬ СЮДА
  const tab = useSelector(viewScheduleSelector);
  const showPrice = useSelector(pricePopupSelector);
  const [hoverPreview, setHoverPreview] = useState<{
    x: number;
    y: number;
    event: any;
    services: any[];
  } | null>(null);
  const hoverTimeout = useRef<number>();

  // Динамическая фильтрация и группировка опций для вкладок
  const { doctorsTabOptions, assistantsTabOptions, othersTabOptions } = useMemo(() => {
    let doctorsOptions: any[] = [];
    let assistantsOptions: any[] = [];
    let othersOptions: any[] = [];

    groupedOptions?.forEach((group: any) => {
      if (group.label === 'roles.doctor') {
        doctorsOptions = [...doctorsOptions, ...(group.options || [])];
      } else if (group.label === 'roles.assistant') {
        assistantsOptions = [...assistantsOptions, ...(group.options || [])];
      } else {
        // Все остальные роли (ceo, nurse, receptionist и т.д.) уходят во вкладку "Інші"
        othersOptions = [...othersOptions, ...(group.options || [])];
      }
    });

    return {
      doctorsTabOptions: doctorsOptions,
      assistantsTabOptions: assistantsOptions,
      othersTabOptions: othersOptions,
    };
  }, [groupedOptions]);

  // Определяем, какой список людей рендерить в сетке в зависимости от активной вкладки
  const currentTabPeople = useMemo(() => {
    switch (tab) {
      case 'patients': // Первая вкладка (по логике в коде она называется patients, но там врачи)
        return doctorsTabOptions;
      case 'visits': // Вкладка "Асистенти"
        return assistantsTabOptions;
      case 'plans': // Вкладка "Інші"
        return othersTabOptions;
      default:
        return doctorsTabOptions;
    }
  }, [tab, doctorsTabOptions, assistantsTabOptions, othersTabOptions]);
  const DOCTOR_WIDTH = 180;
  const dayWidth = 70 + cabinetData.length * currentTabPeople.length * DOCTOR_WIDTH;
  const headerTrackRef = useRef<HTMLDivElement>(null);

  const syncHeaderScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (headerTrackRef.current) {
      headerTrackRef.current.style.transform = `translateX(-${event.currentTarget.scrollLeft}px)`;
    }
  };

  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const dayStep = typeView === 'day' ? 1 : 3;
  const days = useMemo(() => {
    return getDays(baseDate, dayStep, appLang);
  }, [baseDate, dayStep]);

  const timeSlots = useMemo(() => generateTimeSlots(8, 20, 15), []);
  const gridHeight = timeSlots.length * SLOT_HEIGHT;

  // ================= INTERACTIVE EVENTS STATE =================
  const [localEvents, setLocalEvents] = useState<SchedulerEvent[]>(() => {
    return eventsData.map((event) => ({
      id: String(event.id),
      title: event.title,
      doctor_id: event.doctor_id,
      patient_id: event.patient_id,
      cabinet_id: event.cabinet_id,
      event_date: event.event_date,
      event_time_from: event.event_time_from.slice(0, 5),
      event_time_to: event.event_time_to.slice(0, 5),
      start: `${event.event_date}T${event.event_time_from}`,
      end: `${event.event_date}T${event.event_time_to}`,
      status_color: event.status_color,
      status_name: event.status_name,
      patient_name: event.last_name + ' ' + event.first_name,
      services: event.services,
      cabinet_name: event.cabinet_name,
      doctor_name: event.doctor_first_name + ' ' + event.doctor_last_name,
    }));
  });

  // АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ СЕТКИ ПРИ ИЗМЕНЕНИИ ДАННЫХ С СЕРВЕРА
  useEffect(() => {
    if (eventsData) {
      setLocalEvents(
        eventsData.map((event) => ({
          id: String(event.id),
          title: event.title,
          doctor_id: event.doctor_id,
          patient_id: event.patient_id,
          cabinet_id: event.cabinet_id,
          event_date: event.event_date,
          event_time_from: event.event_time_from.slice(0, 5),
          event_time_to: event.event_time_to.slice(0, 5),
          start: `${event.event_date}T${event.event_time_from}`,
          end: `${event.event_date}T${event.event_time_to}`,
          status_color: event.status_color,
          status_name: event.status_name,
          patient_name: event.last_name + ' ' + event.first_name,
          services: event.services,
          cabinet_name: event.cabinet_name,
          doctor_name: event.doctor_first_name + ' ' + event.doctor_last_name,
        }))
      );
    }
  }, [eventsData]); // Реагирует на любые изменения пропса eventsData

  // ================= DRAG & DROP ENGINE =================

  const handleTabClick = (tab) => {
    console.log(tab);
  };

  // ================= RESIZE ENGINE =================
  const handleResizeStart = (e: React.MouseEvent, eventId: string, currentEndISO: string) => {
    e.stopPropagation();
    e.preventDefault();

    const startY = e.clientY;
    const baseEnd = parseISO(currentEndISO);
    isResizingRef.current = true;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const minutesDelta = Math.round(deltaY / 2 / 15) * 15;

      if (minutesDelta !== 0) {
        const newEndDate = new Date(baseEnd.getTime() + minutesDelta * 60000);
        const newEndISO = `${format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss")}`;
        const newEndTimeHuman = format(newEndDate, 'HH:mm');

        setLocalEvents((prevEvents) =>
          prevEvents.map((ev) => {
            if (ev.id !== eventId) return ev;
            const startTime = parseISO(ev.start).getTime();
            if (newEndDate.getTime() <= startTime) return ev;

            return {
              ...ev,
              end: newEndISO,
              event_time_to: newEndTimeHuman,
            };
          })
        );
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      setTimeout(() => {
        isResizingRef.current = false;
      }, 50);
      console.log('✅ Ресайз закончен, стейт зафиксирован!');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // ================= НАЖАТИЕ НА СЕТКУ (ВРЕМЯ) =================
  // const handleCellClick = (
  //   e: React.MouseEvent<HTMLDivElement>,
  //   date: string,
  //   cabinet: (typeof cabinets)[0],
  //   doctor: (typeof doctors)[0]
  // ) => {
  //   if (isResizingRef.current || isDraggingRef.current) return;
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const clickY = e.clientY - rect.top;
  //   const slotIndex = Math.floor(clickY / SLOT_HEIGHT);
  //
  //   if (slotIndex >= 0 && slotIndex < timeSlots.length) {
  //     const clickedSlot = timeSlots[slotIndex];
  //     const now = moment();
  //     dispatch(setExistServicesAction([]));
  //     // Создаем полную дату и время из выбранной даты и временного слота
  //     const selectedDateTime = moment(`${date} ${clickedSlot.label}`, 'YYYY-MM-DD HH:mm');
  //
  //     // Проверка: нельзя планировать на прошедшее время
  //     if (selectedDateTime.isBefore(now)) {
  //       alert(msg.get('scheduler.error.pastTime'));
  //       setShowAlert(true); // Показать алерт
  //       return;
  //     }
  //
  //     dispatch(showSchedulePopupAction(true));
  //     dispatch(setPopupCabinetAction(cabinet.id));
  //     dispatch(setSchedulePopupDoctorAction(doctor.id));
  //     dispatch(showOverlayAction(true));
  //     dispatch(setScheduleDateAction(dayjs(date).format('DD.MM.YYYY')));
  //     dispatch(setScheduleTimeAction(clickedSlot.label)); // Сохраняем как HH:mm
  //   }
  // };

  // const handleEventClick = (e: React.MouseEvent, cellEvent: SchedulerEvent) => {
  //   console.log(1);
  //   // ЖЕЛЕЗОБЕТОННО останавливаем всплытие, чтобы клик по ивенту НЕ вызывал клик по ячейке!
  //   e.stopPropagation();
  //
  //   // Если ивент только что перетаскивали, ресайзили или сработал блок клика — полностью блокируем
  //   if (isDraggingRef.current || isResizingRef.current || blockClickRef.current) {
  //     e.preventDefault();
  //     return;
  //   }
  //
  //   dispatch(setScheduleEditEventAction(cellEvent));
  //   dispatch(setScheduleDateAction(cellEvent.event_date));
  //   dispatch(initServicesAction(JSON.parse(cellEvent.services || '[]')));
  //   dispatch(setScheduleTimeAction(cellEvent.event_time_from));
  //   dispatch(showOverlayAction(true));
  //   dispatch(showScheduleEditPopupAction(true));
  // };

  // Функция для добавления или обновления ивента в реальном времени
  const handleSaveLocalEvent = (rawEvent: any) => {
    const formattedEvent = {
      id: String(rawEvent.id),
      title: rawEvent.title,
      doctor_id: Number(rawEvent.doctor_id),
      patient_id: Number(rawEvent.patient_id),
      cabinet_id: Number(rawEvent.cabinet_id),
      event_date: rawEvent.event_date,
      event_time_from: rawEvent.event_time_from.slice(0, 5),
      event_time_to: rawEvent.event_time_to.slice(0, 5),
      start: `${rawEvent.event_date}T${rawEvent.event_time_from}`,
      end: `${rawEvent.event_date}T${rawEvent.event_time_to}`,
      status_color: rawEvent.status_color || '#0ea5a4',
      status_name: rawEvent.status_name,
      patient_name: rawEvent.last_name
        ? `${rawEvent.last_name} ${rawEvent.first_name}`
        : rawEvent.patient_name,
      services:
        typeof rawEvent.services === 'string'
          ? rawEvent.services
          : JSON.stringify(rawEvent.services || []),
      cabinet_name: rawEvent.cabinet_name,
      doctor_name: rawEvent.doctor_first_name
        ? `${rawEvent.doctor_first_name} ${rawEvent.doctor_last_name}`
        : rawEvent.doctor_name,
    };

    setLocalEvents((prev) => {
      const exists = prev.some((ev) => ev.id === formattedEvent.id);
      if (exists) {
        // Если редактировали — обновляем старый
        return prev.map((ev) => (ev.id === formattedEvent.id ? formattedEvent : ev));
      }
      // Если новый — добавляем в массив
      return [...prev, formattedEvent];
    });
  };

  const PREVIEW_WIDTH = 340;
  const PREVIEW_HEIGHT = 280;

  const showPreview = (e: React.MouseEvent<HTMLDivElement>, event: any, services: any[]) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const margin = 12;

    let x = rect.right + margin;
    let y = rect.top;

    // ---------- справа не помещается ----------
    if (x + PREVIEW_WIDTH > window.innerWidth - margin) {
      x = rect.left - PREVIEW_WIDTH - margin;
    }

    // ---------- если и слева мало места ----------
    if (x < margin) {
      x = margin;
    }

    // ---------- снизу не помещается ----------
    if (y + PREVIEW_HEIGHT > window.innerHeight - margin) {
      y = window.innerHeight - PREVIEW_HEIGHT - margin;
    }

    // ---------- сверху ----------
    if (y < margin) {
      y = margin;
    }
    const _services = event ? JSON.parse(event.services) : [];
    const previewTotal = event
      ? _services.reduce(
          (sum, service) =>
            sum + Number(service.total_price ?? service.price) * Number(service.qty ?? 1),
          0
        )
      : 0;
    event.amount_total = previewTotal;

    setHoverPreview({
      x,
      y,
      event,
      services,
    });
  };

  const formatDuration = (from: string, to: string) => {
    const [fh, fm] = from.split(':').map(Number);
    const [th, tm] = to.split(':').map(Number);

    const minutes = th * 60 + tm - (fh * 60 + fm);

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins} хв`;
    if (mins === 0) return `${hours} год`;

    return `${hours} год ${mins} хв`;
  };

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Scheduler Management" />
      <div>
        <div className="p-4 sm:py-8 sm:px-4 mb-4 content-data bg-content">
          <div className="pv-shell">
            <div className="pv-top">
              <div className="pv-user">
                <div className="pv-info">
                  <section>
                    <header>
                      <div className="flex inline-flex w-full mb-0">
                        <h2 className="text-xl font-semibold leading-tight">
                          {msg.get('scheduler.title.list')}
                        </h2>
                      </div>
                    </header>
                  </section>
                </div>
              </div>
            </div>
            <div className="pv-shell">
              <div className="pv-tabs">
                <button
                  className={tab === 'patients' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('patients')}
                >
                  {msg.get('scheduler.tab.patients')}
                </button>

                <button
                  className={tab === 'visits' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('visits')}
                >
                  Асистенти
                </button>

                <button
                  className={tab === 'plans' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('plans')}
                >
                  Інші
                </button>
              </div>
            </div>
          </div>
        </div>
        {showEventPopup && (
          <SchedulerFormCreate
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            assistantData={assistantData}
            customerData={customerData}
            currency={currencyData}
            serviceCategories={serviceCategories}
            services={services}
            onSuccess={handleSaveLocalEvent}
          />
        )}
        {editEventPopup && (
          <SchedulerFormEdit
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            assistantData={assistantData}
            customerData={customerData}
            currency={currencyData}
            serviceCategories={serviceCategories}
            services={services}
            onSuccess={handleSaveLocalEvent}
          />
        )}
        {showPrice && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-0 max-w-[550px] pb-[30px] relative">
              <div
                className={'absolute right-[20px] top-[10px] cursor-pointer z-50'}
                onClick={() => {
                  dispatch(showPricePopupAction(false));
                }}
              >
                <FontAwesomeIcon icon={faClose} className="ml-5" />
              </div>
              <div style={{ maxHeight: '400px', overflow: 'scroll' }}>
                <Pricing
                  clinicData={clinicData}
                  currency={currencyData}
                  services={services}
                  tree={tree}
                />
              </div>
              <SecondaryButton
                className="btn-back float-right mt-4 mr-[30px]"
                onClick={() => {
                  dispatch(showPricePopupAction(false));
                }}
                title={msg.get('scheduler.close')}
              >
                {msg.get('scheduler.close')}
              </SecondaryButton>
            </div>
          </div>
        )}
        {typeView === '3days' && (
          <div>
            <Index3Days
              baseDate={baseDate}
              days={days}
              clinicData={clinicData}
              customerData={customerData}
              formData={formData}
              cabinetData={cabinetData}
              groupedOptions={groupedOptions}
              assistantData={assistantData}
              eventsData={eventsData}
              currencyData={currencyData}
              tree={tree}
              services={services}
              serviceCategories={serviceCategories}
              initialView={initialView}
              doctorsTabOptions={doctorsTabOptions}
              assistantsTabOptions={assistantsTabOptions}
              othersTabOptions={othersTabOptions}
            />
          </div>
        )}
        {/* FIXED HEADER AREA */}
        <div
          style={{
            display: 'flex',
            marginLeft: '20px',
            marginRight: '20px',
            flexDirection: 'column',
            overflow: 'visible',
            background: '#f1f5f9',
            marginBottom: '100px',
            borderBottom: 'solid 1px #d5d7d9',
          }}
        >
          {/* ================= NAV ================= */}
          <div
            style={{
              paddingTop: '0px',
              paddingBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fff',
              borderBottom: '1px solid #e2e8f0',
              zIndex: showEventPopup || editEventPopup ? 0 : 100,
            }}
          >
            <div>
              <button
                className="btn-submit btn-prev"
                onClick={() =>
                  setBaseDate((prev) => format(addDays(parseISO(prev), -dayStep), 'yyyy-MM-dd'))
                }
              >
                {msg.get('scheduler.prev')}
              </button>
              <span style={{ margin: '0 12px', fontWeight: 600 }}>
                {days[0].label} {days.length > 1 && ` → ${days[days.length - 1].label}`}
              </span>
              <button
                className="btn-submit btn-prev"
                onClick={() =>
                  setBaseDate((prev) => format(addDays(parseISO(prev), dayStep), 'yyyy-MM-dd'))
                }
              >
                {msg.get('scheduler.next')}
              </button>
            </div>

            {allowViewSwitch && (
              <div>
                <button
                  onClick={() => setTypeView('day')}
                  style={{ marginRight: 8, opacity: typeView === 'day' ? 1 : 0.5 }}
                >
                  {msg.get('scheduler.day')}
                </button>
                <button
                  className="btn-submit"
                  onClick={() => setTypeView('3days')}
                  style={{ opacity: typeView === '3days' ? 1 : 0.5 }}
                >
                  {msg.get('scheduler.3days')}
                </button>
              </div>
            )}
          </div>

          {/*=========================================================================*/}
          {/*=========================================================================*/}
          {/* ================= MAIN HORIZONTAL SCROLL CONTAINER ================= */}
          {/*=========================================================================*/}
          {/*=========================================================================*/}
          {typeView === '3days' && <></>}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
