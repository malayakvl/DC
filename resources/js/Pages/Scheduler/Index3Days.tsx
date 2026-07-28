import React, { useMemo, useState, useRef, useEffect } from 'react';
import { addDays, format, parseISO, differenceInMinutes } from 'date-fns';
import { cabinets, doctors, SchedulerEvent } from './mock/data';
import { generateTimeSlots } from './engine/timeEngine';
import { getEventLayout } from './engine/eventLayout';
import { router } from '@inertiajs/react';
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
  initServicesAction,
} from '@/Redux/Scheduler';
import { showOverlayAction } from '@/Redux/Layout';
import dayjs from 'dayjs';
import SchedulerDayHeader from './components/SchedulerDayHeader';
import SchedulerTimeColumn from './components/SchedulerTimeColumn';
import { useSchedulerEvents } from './hooks/useSchedulerEvents';

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

export default function Index3Days({
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
  const [view, setView] = useState(initialView);
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
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const [hoverPreview, setHoverPreview] = useState<{
    x: number;
    y: number;
    event: any;
    services: any[];
  } | null>(null);

  const hoverTimeout = useRef<number>();
  const { handleEventClick, handleCellClick } = useSchedulerEvents(eventsData, msg);

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

  const dayStep = view === 'day' ? 1 : 3;
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

  // ================= ================== =================
  // ================= DRAG & DROP ENGINE =================
  // ================= ================== =================
  const handleDragStart = (e: React.MouseEvent, event: SchedulerEvent) => {
    if ((e.target as HTMLElement).hasAttribute('data-resize-handle')) return;

    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const baseStart = parseISO(event.start);
    const baseEnd = parseISO(event.end);
    const durationMin = differenceInMinutes(baseEnd, baseStart);

    let hasMovedEnough = false;

    // СЮДА выносим переменные, которые будут общими для MouseMove и MouseUp:
    let finalDate = event.event_date;
    let finalCabinetId = event.cabinet_id;
    let finalDoctorId = event.doctor_id;
    let finalStartDate = baseStart;
    let finalEndDate = baseEnd;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      if (!hasMovedEnough && Math.sqrt(deltaX * deltaX + deltaY * deltaY) < 5) {
        return;
      }

      if (!hasMovedEnough) {
        hasMovedEnough = true;
        isDraggingRef.current = true;
        blockClickRef.current = true; // <--- ВЗВОДИМ БЛОКИРОВКУ КЛИКА ПРИ СДВИГЕ
      }

      const minutesDelta = Math.round(deltaY / 2 / 15) * 15;
      const elementOver = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
      const columnEl = elementOver?.closest('[data-column-type="doctor-cell"]');

      if (columnEl) {
        finalDate = columnEl.getAttribute('data-date') || finalDate;
        finalCabinetId = Number(columnEl.getAttribute('data-cabinet-id')) || finalCabinetId;
        finalDoctorId = Number(columnEl.getAttribute('data-doctor-id')) || finalDoctorId;
      }

      finalStartDate = new Date(baseStart.getTime() + minutesDelta * 60000);
      finalEndDate = new Date(finalStartDate.getTime() + durationMin * 60000);

      const newStartISO = `${finalDate}T${format(finalStartDate, 'HH:mm:ss')}`;
      const newEndISO = `${finalDate}T${format(finalEndDate, 'HH:mm:ss')}`;

      setLocalEvents((prev) =>
        prev.map((ev) => {
          if (ev.id !== event.id) return ev;
          return {
            ...ev,
            event_date: finalDate,
            cabinet_id: finalCabinetId,
            doctor_id: finalDoctorId,
            start: newStartISO,
            end: newEndISO,
            event_time_from: format(finalStartDate, 'HH:mm'),
            event_time_to: format(finalEndDate, 'HH:mm'),
          };
        })
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (!hasMovedEnough) {
        // Если реального движения не было — сбрасываем всё сразу, клик сработает штатно
        isDraggingRef.current = false;
        blockClickRef.current = false;
        return;
      }

      // --- ПРОВЕРКА НА ПЕРЕСЕЧЕНИЯ ---
      const hasIntersection = localEvents.some((ev) => {
        if (ev.id === event.id) return false;
        if (ev.event_date !== finalDate) return false;

        const sameDoctor = Number(ev.doctor_id) === Number(finalDoctorId);
        const sameCabinet = Number(ev.cabinet_id) === Number(finalCabinetId);

        if (!sameDoctor && !sameCabinet) return false;

        const evStart = parseISO(ev.start);
        const evEnd = parseISO(ev.end);
        const isTimeOverlapping = finalStartDate < evEnd && finalEndDate > evStart;

        return isTimeOverlapping;
      });

      if (hasIntersection) {
        alert('Ошибка: Данное время уже занято этим врачом или кабинетом!');

        // ОТКАТ: возвращаем ивент в исходное состояние
        setLocalEvents((prev) =>
          prev.map((ev) => {
            if (ev.id !== event.id) return ev;
            return {
              ...ev,
              event_date: event.event_date,
              cabinet_id: event.cabinet_id,
              doctor_id: event.doctor_id,
              start: event.start,
              end: event.end,
              event_time_from: event.event_time_from,
              event_time_to: event.event_time_to,
            };
          })
        );

        // ИСПРАВЛЕНИЕ: Гасим флаги строго с задержкой, чтобы уберечь от фантомных кликов
        setTimeout(() => {
          isDraggingRef.current = false;
          blockClickRef.current = false;
        }, 100);

        return;
      }

      // ========================================================
      // ЕСЛИ ПРОВЕРКА ПРОЙДЕНА — ОТПРАВЛЯЕМ НА БЭКЕНД
      // ========================================================
      console.log('Отправляем перемещение на бэк:', {
        id: event.id,
        event_date: finalDate,
        cabinet_id: finalCabinetId,
        doctor_id: finalDoctorId,
        event_time_from: format(finalStartDate, 'HH:mm'),
        event_time_to: format(finalEndDate, 'HH:mm'),
      });

      router.put(
        route('scheduler.update-position', event.id),
        {
          event_date: finalDate,
          cabinet_id: finalCabinetId,
          doctor_id: finalDoctorId,
          event_time_from: format(finalStartDate, 'HH:mm'),
          event_time_to: format(finalEndDate, 'HH:mm'),
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            // После успешного сохранения тушим флаги с задержкой
            setTimeout(() => {
              isDraggingRef.current = false;
              blockClickRef.current = false;
            }, 100);
          },
          onError: () => {
            // В случае ошибки бэка тоже делаем откат и тушим
            setTimeout(() => {
              isDraggingRef.current = false;
              blockClickRef.current = false;
            }, 100);
          },
        }
      );
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // ================= ============= =================
  // ================= RESIZE ENGINE =================
  // ================= ============= =================
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

  // ================= ============= =================
  // ================= CELLCLICK ENGINE ==============
  // ================= ============= =================
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

  const getDuration = (from: string, to: string) => {
    const [fh, fm] = from.split(':').map(Number);
    const [th, tm] = to.split(':').map(Number);

    return th * 60 + tm - (fh * 60 + fm);
  };

  return (
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
        </div>
      </div>
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
          )}
        </div>

        {/* ================= MAIN HORIZONTAL SCROLL CONTAINER ================= */}
        <div
          className="calendar-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            // height: '1400px', // временно для проверки
            // overflow: 'hidden',
          }}
        >
          <div
            className="calendar-header-viewport"
            style={{
              position: 'sticky',
              top: 109,
              zIndex: showEventPopup || editEventPopup ? 0 : 50,
              overflow: 'hidden',
              width: '100%',
              background: '#fff',
            }}
          >
            <div
              ref={headerTrackRef}
              style={{
                display: 'flex',
                width: 'max-content',
                minWidth: '100%',
                willChange: 'transform',
              }}
            >
              {days.map((day, dayIdx) => (
                <div
                  key={day.date}
                  style={{
                    flex: '0 0 auto',
                    width: dayWidth,
                    borderRight: dayIdx < days.length - 1 ? '1px solid #cbd5e1' : 'none',
                  }}
                >
                  <SchedulerDayHeader
                    day={day}
                    isToday={day.date === format(new Date(), 'yyyy-MM-dd')}
                    cabinets={cabinetData}
                    people={currentTabPeople}
                    doctorWidth={DOCTOR_WIDTH}
                    todayBg={TODAY_BG}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="calendar"
            onScroll={syncHeaderScroll}
            style={{
              flex: 1,
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'visible',
              alignItems: 'flex-start',
              width: '100%',
              minHeight: 0,
            }}
          >
            {days.map((day, dayIdx) => {
              return (
                <div
                  className={'calendar-day'}
                  key={day.date}
                  style={{
                    // minWidth: 900,
                    display: 'flex',
                    flex: '0 0 auto',
                    width: dayWidth,
                    minWidth: dayWidth,
                    flexDirection: 'column',
                    background: '#fff',
                    borderRight: dayIdx < days.length - 1 ? '4px solid #cbd5e1' : 'none',
                    // position: 'sticky',
                    // top: 0,
                    zIndex: showEventPopup || editEventPopup ? 0 : 40,
                  }}
                >
                  {/* SCROLLABLE BODY AREA */}
                  <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                    <SchedulerTimeColumn timeSlots={timeSlots} slotHeight={SLOT_HEIGHT} />

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
                                onClick={(e) => handleCellClick(e, day.date, cab, doc, timeSlots)}
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
                                              {services.slice(0, 3).map((service) => (
                                                <div
                                                  key={service.id}
                                                  className="calendar-event-service"
                                                >
                                                  🦷 {service.name}
                                                </div>
                                              ))}

                                              {services.length > 3 && (
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
                                          <div
                                            className="calendar-event-footer"
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                              gap: '4px',
                                              marginTop: 'auto',
                                              width: '100%',
                                              overflow: 'hidden',
                                              paddingTop: '4px',
                                              borderTop: '1px dashed rgba(0,0,0,0.08)', // Легкое визуальное отделение футера
                                            }}
                                          >
                                            <div
                                              className="calendar-event-time"
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '3px',
                                                whiteSpace: 'nowrap',
                                                fontSize: '10px', // Слегка уменьшим до 10px для запаса места
                                                flexShrink: 1,
                                                minWidth: 0,
                                                color: '#475569',
                                              }}
                                            >
                                              <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                style={{ flexShrink: 0, minWidth: '11px' }}
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
                                              <span>
                                                {event.event_time_from}-{event.event_time_to}
                                              </span>
                                            </div>

                                            {/* БЛОК С ДЛИТЕЛЬНОСТЬЮ И КНОПКОЙ АКТА */}
                                            <div
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                flexShrink: 0,
                                              }}
                                            >
                                              <span
                                                className="calendar-event-duration"
                                                style={{
                                                  whiteSpace: 'nowrap',
                                                  fontSize: '10px',
                                                  color: '#64748b',
                                                }}
                                              >
                                                {formatDuration(
                                                  event.event_time_from,
                                                  event.event_time_to
                                                )}
                                              </span>

                                              {/* КНОПКА "СТВОРИТИ АКТ" */}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation(); // ЖЕЛЕЗОБЕТОННО блокируем открытие редактирования визита!
                                                  e.preventDefault();

                                                  // Твоя логика создания акта. Например:
                                                  console.log('Создаем акт для визита:', event.id);
                                                  // router.visit(route('acts.create', { event_id: event.id }));
                                                  alert(`Создаем акт для: ${event.patient_name}`);
                                                }}
                                                title="Створити акт"
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  width: '20px',
                                                  height: '20px',
                                                  borderRadius: '4px',
                                                  background: '#0ea5a4', // Твой фирменный бирюзовый цвет
                                                  color: '#fff',
                                                  border: 'none',
                                                  cursor: 'pointer',
                                                  transition: 'all 0.2s',
                                                  flexShrink: 0,
                                                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                }}
                                                onMouseEnter={(e) => {
                                                  e.currentTarget.style.background = '#0d9488'; // Эффект наведения
                                                }}
                                                onMouseLeave={(e) => {
                                                  e.currentTarget.style.background = '#0ea5a4';
                                                }}
                                              >
                                                {/* Аккуратная SVG иконка документа с плюсиком внутри кнопки */}
                                                <svg
                                                  width="11"
                                                  height="11"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                >
                                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                  <polyline points="14 2 14 8 20 8"></polyline>
                                                  <line x1="12" y1="18" x2="12" y2="12"></line>
                                                  <line x1="9" y1="15" x2="15" y2="15"></line>
                                                </svg>
                                              </button>
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
                  <strong>{hoverPreview.event.amount_total.toFixed(2)} ₴</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
