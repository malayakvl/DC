import React, { useMemo, useState, useRef } from 'react';
import { addDays, format, parseISO, differenceInMinutes } from 'date-fns';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { cabinets, doctors, SchedulerEvent } from './mock/data';
import { generateTimeSlots } from './engine/timeEngine';
import { getEventLayout } from './engine/eventLayout';
import { Head } from '@inertiajs/react';
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
} from '@/Redux/Scheduler';
import { showOverlayAction } from '@/Redux/Layout';
import dayjs from 'dayjs';
import Pricing from './Pricing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/Form/SecondaryButton';

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
}) {
  const [baseDate, setBaseDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [view, setView] = useState<'day' | '3days'>('3days');
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
  const DOCTOR_WIDTH = 150;

  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const dayStep = view === 'day' ? 1 : 3;
  const days = useMemo(() => {
    return getDays(baseDate, dayStep, appLang);
  }, [baseDate, dayStep]);
  // const [servicesPopover, setServicesPopover] = useState<{
  //   event: any;
  //   anchor: HTMLElement | null;
  // } | null>(null);
  // const [popover, setPopover] = useState<{
  //   x: number;
  //   y: number;
  //   services: any[];
  //   total: number;
  // } | null>(null);

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

  // ================= DRAG & DROP ENGINE =================
  const handleDragStart = (e: React.MouseEvent, event: SchedulerEvent) => {
    // Предотвращаем ресайз, если кликнули по хэндлеру ресайза
    if ((e.target as HTMLElement).hasAttribute('data-resize-handle')) return;

    e.stopPropagation();
    e.preventDefault();

    isDraggingRef.current = true;

    const startY = e.clientY;
    const baseStart = parseISO(event.start);
    const baseEnd = parseISO(event.end);
    const durationMin = differenceInMinutes(baseEnd, baseStart);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      // 2px = 1 минута, шаг — 15 минут
      const minutesDelta = Math.round(deltaY / 2 / 15) * 15;

      // Находим элемент колонки под курсором мыши
      const elementOver = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
      const columnEl = elementOver?.closest('[data-column-type="doctor-cell"]');

      let newDate = event.event_date;
      let newCabinetId = event.cabinet_id;
      let newDoctorId = event.doctor_id;

      if (columnEl) {
        newDate = columnEl.getAttribute('data-date') || newDate;
        newCabinetId = Number(columnEl.getAttribute('data-cabinet-id')) || newCabinetId;
        newDoctorId = Number(columnEl.getAttribute('data-doctor-id')) || newDoctorId;
      }

      // Вычисляем новое время старта и конца
      const newStartDate = new Date(baseStart.getTime() + minutesDelta * 60000);
      const newEndDate = new Date(newStartDate.getTime() + durationMin * 60000);

      const newStartISO = `${newDate}T${format(newStartDate, 'HH:mm:ss')}`;
      const newEndISO = `${newDate}T${format(newEndDate, 'HH:mm:ss')}`;

      setLocalEvents((prev) =>
        prev.map((ev) => {
          if (ev.id !== event.id) return ev;
          return {
            ...ev,
            event_date: newDate,
            cabinet_id: newCabinetId,
            doctor_id: newDoctorId,
            start: newStartISO,
            end: newEndISO,
            event_time_from: format(newStartDate, 'HH:mm'),
            event_time_to: format(newEndDate, 'HH:mm'),
          };
        })
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
      console.log('✅ Драг закончен, ивент перенесен!');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

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
  const handleCellClick = (
    e: React.MouseEvent<HTMLDivElement>,
    date: string,
    cabinet: (typeof cabinets)[0],
    doctor: (typeof doctors)[0]
  ) => {
    if (isResizingRef.current || isDraggingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const slotIndex = Math.floor(clickY / SLOT_HEIGHT);

    if (slotIndex >= 0 && slotIndex < timeSlots.length) {
      const clickedSlot = timeSlots[slotIndex];
      // alert(
      //   `Запердолить евент?\n📅 Дата: ${date}\n🕒 Время: ${clickedSlot.label}\n🚪 Кабинет: ${cabinet.name}\n👨‍⚕️ Врач: ${doctor.name}`
      // );
      const now = moment();
      dispatch(setExistServicesAction([]));
      // Создаем полную дату и время из выбранной даты и временного слота
      const selectedDateTime = moment(`${date} ${clickedSlot.label}`, 'YYYY-MM-DD HH:mm');

      // Проверка: нельзя планировать на прошедшее время
      if (selectedDateTime.isBefore(now)) {
        alert(msg.get('scheduler.error.pastTime'));
        setShowAlert(true); // Показать алерт
        return;
      }
      dispatch(showSchedulePopupAction(true));
      dispatch(setPopupCabinetAction(cabinet.id));
      dispatch(setSchedulePopupDoctorAction(doctor.id));
      dispatch(showOverlayAction(true));
      dispatch(setScheduleDateAction(dayjs(date).format('DD.MM.YYYY')));
      dispatch(setScheduleTimeAction(clickedSlot.label)); // Сохраняем как HH:mm
    }
  };

  const handleEventClick = (e: React.MouseEvent, cellEvent: SchedulerEvent) => {
    dispatch(setScheduleEditEventAction(cellEvent));
    dispatch(showScheduleEditPopupAction(true));
  };

  // Функция для создания инициалов (например, "Иван Иванов" -> "И. И.")
  // Или если это один кусочек: "Victory" -> "Vi"
  function getInitials(name: string) {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}.${parts[1].charAt(0)}.`;
    }
    return name.slice(0, 2).toUpperCase();
  }

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

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Scheduler Management" />
      <div>
        <div className="p-4 sm:p-8 mb-4 content-data bg-content">
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
          />
        )}
        {editEventPopup && (
          <SchedulerFormEdit
            clinicData={clinicData}
            cabinetData={cabinetData}
            assistantData={assistantData}
            customerData={customerData}
            currency={currencyData}
          />
        )}
        {showPrice && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
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
        {/*CALENDAR SCRIPT*/}
        <div
          style={{
            display: 'flex',
            marginLeft: '40px',
            marginRight: '40px',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            background: '#f1f5f9',
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
              zIndex: showEventPopup ? 0 : 100,
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

            <div>
              <button
                onClick={() => setView('day')}
                style={{ marginRight: 8, opacity: view === 'day' ? 1 : 0.5 }}
              >
                {msg.get('scheduler.day')}
              </button>
              <button
                className="btn-submit"
                onClick={() => setView('3days')}
                style={{ opacity: view === '3days' ? 1 : 0.5 }}
              >
                {msg.get('scheduler.3days')}
              </button>
            </div>
          </div>

          {/* ================= MAIN HORIZONTAL SCROLL CONTAINER ================= */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            {days.map((day, dayIdx) => {
              const isToday = day.date === format(new Date(), 'yyyy-MM-dd');

              return (
                <div
                  key={day.date}
                  style={{
                    // minWidth: 900,
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                    borderRight: dayIdx < days.length - 1 ? '4px solid #cbd5e1' : 'none',
                    height: '100%',
                    zIndex: showEventPopup ? 0 : 40,
                  }}
                >
                  {/* FIXED HEADER AREA */}
                  <div
                    style={{
                      flexShrink: 0,
                      background: '#fff',
                      zIndex: 40,
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,.05)',
                    }}
                  >
                    <div
                      style={{
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: '0.05em',
                        background: isToday ? TODAY_BG : '#f8fafc',
                        boxShadow: 'inset 0 -2px 0 #e2e8f0',
                      }}
                    >
                      {day.label.toUpperCase()}
                    </div>

                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          width: 70,
                          flexShrink: 0,
                          background: '#fff',
                          borderRight: '2px solid #e2e8f0',
                          height: '115px',
                        }}
                      />
                      <div style={{ display: 'flex', flex: 1 }}>
                        {cabinetData.map((cab, cabIdx) => (
                          <div
                            key={cab.id}
                            style={{
                              flex: 1,
                              borderRight:
                                cabIdx < cabinetData.length - 1 ? '2px solid #94a3b8' : 'none',
                            }}
                          >
                            <div
                              style={{
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                background: '#f1f5f9',
                                color: '#334155',
                                boxShadow: 'inset 0 -1px 0 #cbd5e1',
                              }}
                            >
                              {cab.cabinet_name}
                            </div>
                            <div style={{ display: 'flex', height: 34 }}>
                              {currentTabPeople.map((doc, docIdx) => {
                                const fullName = doc.name || doc.label || '';
                                const initials = getInitials(fullName);
                                // Используем цвет из базы, либо генерируем дефолтный серый/синий для заглушки
                                const avatarBg = doc.color || '#94a3b8';

                                return (
                                  <div
                                    key={doc.id}
                                    style={{
                                      width: DOCTOR_WIDTH,
                                      flexShrink: 0,
                                      flex: 1,
                                      display: 'flex',
                                      flexDirection: 'column', // Элементы друг под другом
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      height: '70px',
                                      padding: '4px 2px',
                                      background: '#fff',
                                      borderRight:
                                        docIdx < currentTabPeople.length - 1
                                          ? '1px solid #e2e8f0'
                                          : '1px solid #e2e8f0',
                                      minWidth: 0, // Важно для работы text-overflow: ellipsis в flex-контейнерах
                                    }}
                                  >
                                    {/* КРУГЛЫЙ АВАТАР */}
                                    <div
                                      style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        backgroundColor: avatarBg,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: '#fff',
                                        overflow: 'hidden',
                                        marginBottom: 2,
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                      }}
                                      title={fullName} // При наведении покажет полное имя
                                    >
                                      {doc.avatar ? (
                                        <img
                                          src={`/storage/${doc.avatar}`} // Корректируй путь в зависимости от твоего Laravel Storage
                                          alt={fullName}
                                          style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                          }}
                                          onError={(e) => {
                                            // Если картинка не прогрузилась — покажем инициалы
                                            (e.target as HTMLElement).style.display = 'none';
                                          }}
                                        />
                                      ) : (
                                        initials
                                      )}
                                    </div>

                                    {/* ТЕКСТ ПОД АВАТАРОМ С АВТО-СОКРАЩЕНИЕМ */}
                                    <div
                                      style={{
                                        fontSize: 10,
                                        fontWeight: 600,
                                        color: '#334155',
                                        textAlign: 'center',
                                        width: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis', // Добавит "..." если имя всё равно слишком длинное
                                        padding: '0 2px',
                                      }}
                                      title={fullName} // При наведении покажет полное имя
                                    >
                                      {fullName}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SCROLLABLE BODY AREA */}
                  <div
                    style={{ display: 'flex', flex: 1, overflowY: 'auto', position: 'relative' }}
                  >
                    {/* TIME COLUMN */}
                    <div
                      style={{
                        width: 70,
                        flexShrink: 0,
                        position: 'sticky',
                        left: 0,
                        zIndex: 30,
                        background: '#fff',
                      }}
                    >
                      {timeSlots.map((slot, index) => {
                        const isHour = index % 4 === 0;
                        return (
                          <div
                            key={slot.label}
                            style={{
                              height: SLOT_HEIGHT,
                              fontSize: 13,
                              paddingLeft: 8,
                              display: 'flex',
                              alignItems: 'center',
                              boxShadow: isHour
                                ? 'inset 0 -1px 0 rgba(0,0,0,.15)'
                                : 'inset 0 -1px 0 rgba(0,0,0,.04)',
                              background: isHour ? '#0ea5a4' : '#fff',
                              fontWeight: isHour ? 600 : 400,
                              color: isHour ? '#fff' : '#64748b',
                              borderRight: '1px solid #e2e8f0',
                            }}
                          >
                            {slot.label}
                          </div>
                        );
                      })}
                    </div>

                    {/* GRID */}
                    <div style={{ display: 'flex', flex: 1, height: gridHeight }}>
                      {cabinets.map((cab, cabIdx) => (
                        <div
                          key={cab.id}
                          style={{
                            flex: 1,
                            display: 'flex',
                            height: '100%',
                            borderRight:
                              cabIdx < cabinets.length - 1 ? '2px solid #94a3b8' : 'none',
                          }}
                        >
                          {currentTabPeople.map((doc, docIdx) => {
                            const dayEvents = localEvents.filter(
                              (e) =>
                                e.event_date === day.date &&
                                e.cabinet_id === cab.id &&
                                e.doctor_id === doc.id
                            );

                            return (
                              <div
                                key={doc.id}
                                onClick={(e) => handleCellClick(e, day.date, cab, doc)}
                                // Важнейшие data-атрибуты для определения ячейки при Dnd:
                                data-column-type="doctor-cell"
                                data-date={day.date}
                                data-cabinet-id={cab.id}
                                data-doctor-id={doc.id}
                                style={{
                                  width: DOCTOR_WIDTH,
                                  flex: 1,
                                  position: 'relative',
                                  height: '100%',
                                  backgroundColor: FREE_SLOT_BG,
                                  cursor: 'pointer',
                                  borderRight:
                                    docIdx < doctors.length - 1
                                      ? '1px solid #e2e8f0'
                                      : '1px solid #e2e8f0',
                                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.03) 1px, transparent 1px)`,
                                  backgroundSize: `100% ${SLOT_HEIGHT * 4}px, 100% ${SLOT_HEIGHT}px`,
                                }}
                              >
                                {dayEvents.map((event) => {
                                  const layout = getEventLayout(event);

                                  const compact = layout.height < 70;
                                  const medium = layout.height >= 70 && layout.height < 110;
                                  const large = layout.height >= 110;
                                  const previewTotal = hoverPreview
                                    ? hoverPreview.services.reduce(
                                        (sum, service) =>
                                          sum +
                                          Number(service.total_price ?? service.price) *
                                            Number(service.qty ?? 1),
                                        0
                                      )
                                    : 0;

                                  const services = (() => {
                                    try {
                                      return JSON.parse(event.services || '[]');
                                    } catch {
                                      return [];
                                    }
                                  })();

                                  const servicesCount = services.length;

                                  return (
                                    <div
                                      key={event.id}
                                      onClick={(e) => handleEventClick(e, event)}
                                      onMouseDown={(e) => handleDragStart(e, event)}
                                      onMouseEnter={(e) => showPreview(e, event, services)}
                                      onMouseLeave={() => {
                                        setHoverPreview(null);
                                      }}
                                      className={`calendar-event ${compact ? 'compact' : ''}`}
                                      style={{
                                        position: 'absolute',
                                        top: layout.top,
                                        height: layout.height,
                                        left: 4,
                                        right: 4,
                                        borderLeft: `4px solid ${event.status_color}`,
                                      }}
                                    >
                                      <div className="calendar-event-body">
                                        {/* ---------- HEADER ---------- */}

                                        <div className="calendar-event-header">
                                          <div className="calendar-event-patient">
                                            {event.patient_name}
                                          </div>

                                          {!compact && (
                                            <div className="calendar-event-price">
                                              {event.price} ₴
                                            </div>
                                          )}
                                        </div>

                                        {/* ---------- SERVICES ---------- */}

                                        <div className="calendar-event-services">
                                          {servicesCount === 0 && (
                                            <div className="calendar-event-service">
                                              {event.title}
                                            </div>
                                          )}

                                          {servicesCount === 1 && (
                                            <div className="calendar-event-service">
                                              🦷 {services[0].name}
                                            </div>
                                          )}

                                          {servicesCount > 1 && large && (
                                            <>
                                              {services.slice(0, 2).map((service) => (
                                                <div
                                                  key={service.id}
                                                  className="calendar-event-service"
                                                >
                                                  🦷 {service.name}
                                                </div>
                                              ))}

                                              {services.length > 2 && (
                                                <div className="calendar-event-more">
                                                  +{services.length - 2} ще...
                                                </div>
                                              )}
                                            </>
                                          )}

                                          {servicesCount > 1 && !large && (
                                            <div className="calendar-event-more hover-target">
                                              🦷 {servicesCount} послуги
                                            </div>
                                          )}
                                        </div>

                                        {/* ---------- FOOTER ---------- */}

                                        {!compact && (
                                          <div className="calendar-event-footer">
                                            <div className="calendar-event-time">
                                              <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                              >
                                                <circle
                                                  cx="12"
                                                  cy="12"
                                                  r="9"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                />

                                                <path
                                                  d="M12 7v5l3 2"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                />
                                              </svg>
                                              {event.event_time_from} — {event.event_time_to}
                                            </div>

                                            <div className="calendar-event-duration">
                                              {event.duration ?? 30} хв
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      <div
                                        onMouseDown={(e) =>
                                          handleResizeStart(e, event.id, event.end)
                                        }
                                        data-resize-handle
                                        className="calendar-event-resize"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {hoverPreview && (
              <div
                className="calendar-preview"
                style={{
                  left: hoverPreview.x,
                  top: hoverPreview.y,
                }}
                onMouseEnter={() => {
                  window.clearTimeout(hoverTimeout.current);
                }}
                onMouseLeave={() => {
                  setHoverPreview(null);
                }}
              >
                <div className="flex flex-row justify-between">
                  <div className="calendar-preview-title">{hoverPreview.event.patient_name}</div>
                  <div className="calendar-preview-cab-title">
                    {hoverPreview.event.cabinet_name}
                    <span className="calendar-doctor">{hoverPreview.event.doctor_name}</span>
                  </div>
                </div>
                <div className="calendar-preview-subtitle">Послуги</div>
                <div className="calendar-preview-list">
                  <table className="preview-table">
                    {hoverPreview.services.map((service) => (
                      <tr key={service.id} style={{ width: '100%' }}>
                        <td className="service-pr-name">{service.name}</td>
                        <td className="service-pr-price">
                          <strong>{service.total_price} ₴</strong>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="calendar-preview-footer">
                  <span>Разом</span>
                  <strong>{hoverPreview.event.amount_total} ₴</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
