import React, { useMemo, useState, useRef, useEffect } from 'react';
import { addDays, format, parseISO, differenceInMinutes } from 'date-fns';
// import { cabinets, doctors, SchedulerEvent } from './_mock/data';
import { generateTimeSlots } from './engine/timeEngine';
import { getEventLayout } from './engine/eventLayout';
import { router } from '@inertiajs/react';
import Lang from 'lang.js';
import lngScheduler from '../../Lang/Scheduler/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import {
  showEditPopupSelector,
  showSchedulePopupSelector,
  viewScheduleSelector,
  schedulerViewSelector,
  schedulerBaseDateSelector,
} from '@/Redux/Scheduler/selectors';
import SchedulerDayHeader from './components/SchedulerDayHeader';
import SchedulerTimeColumn from './components/SchedulerTimeColumn';
import { useSchedulerEvents } from './hooks/useSchedulerEvents';
import { SchedulerEvent } from '@/Pages/SchedulerCopy/mock/data';
import { setCalendarDateAction } from '../../Redux/Scheduler/index';

const SLOT_HEIGHT = 35;
const FREE_SLOT_BG = '#fff';
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
  cabinetData,
  groupedOptions,
  customerData,
  eventsData,
  allowViewSwitch = true,
}) {
  //   useSelector(pricePopupSelector);
  const [baseDate, setBaseDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const dispatch = useDispatch();
  //   const [view, setView] = useState(initialView);
  const view = useSelector(schedulerViewSelector);
  const baseCalendarDate = useSelector(schedulerBaseDateSelector);
  const appLang = useSelector(appLangSelector);
  const showEventPopup = useSelector(showSchedulePopupSelector);
  const editEventPopup = useSelector(showEditPopupSelector);

  // Рефы для блокировки кликов
  const isResizingRef = React.useRef(false);
  const isDraggingRef = React.useRef(false);
  const blockClickRef = React.useRef(false);

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

  const hoverTimeout = useRef<number | undefined>(undefined);

  const { handleEventClick, handleCellClick } = useSchedulerEvents(
    eventsData,
    msg,
    blockClickRef,
    isResizingRef,
    isDraggingRef
  );

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
        othersOptions = [...othersOptions, ...(group.options || [])];
      }
    });

    return {
      doctorsTabOptions: doctorsOptions,
      assistantsTabOptions: assistantsOptions,
      othersTabOptions: othersOptions,
    };
  }, [groupedOptions]);

  const currentTabPeople = useMemo(() => {
    switch (tab) {
      case 'patients':
        return doctorsTabOptions;
      case 'visits':
        return assistantsTabOptions;
      case 'plans':
        return othersTabOptions;
      default:
        return doctorsTabOptions;
    }
  }, [tab, doctorsTabOptions, assistantsTabOptions, othersTabOptions]);

  const DOCTOR_WIDTH = 180;
  const dayWidth = 70 + cabinetData.length * currentTabPeople.length * DOCTOR_WIDTH;
  const headerTrackRef = useRef<HTMLDivElement | null>(null);

  const syncHeaderScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (headerTrackRef.current) {
      headerTrackRef.current.style.transform = `translateX(-${event.currentTarget.scrollLeft}px)`;
    }
  };

  const dayStep = view === 'day' ? 1 : 3;
  const days = useMemo(() => {
    return getDays(baseCalendarDate, dayStep, appLang);
    //     return getDays(baseDate, dayStep, appLang);
  }, [baseDate, dayStep, baseCalendarDate]);

  const timeSlots = useMemo(() => generateTimeSlots(8, 20, 15), []);
  const gridHeight = timeSlots.length * SLOT_HEIGHT;

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
      patient_name: event.patient_last_name + ' ' + event.patient_first_name,
      services: event.services,
      cabinet_name: event.cabinet_name,
      doctor_name: event.doctor_first_name + ' ' + event.doctor_last_name,
    }));
  });

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
          patient_name: event.patient_last_name + ' ' + event.patient_first_name,
          services: event.services,
          cabinet_name: event.cabinet_name,
          doctor_name: event.doctor_first_name + ' ' + event.doctor_last_name,
        }))
      );
    }
  }, [eventsData]);

  // ================= DRAG & DROP =================
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
        blockClickRef.current = true;
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
        isDraggingRef.current = false;
        blockClickRef.current = false;
        return;
      }

      const hasIntersection = localEvents.some((ev) => {
        if (ev.id === event.id) return false;
        if (ev.event_date !== finalDate) return false;

        const sameDoctor = Number(ev.doctor_id) === Number(finalDoctorId);
        const sameCabinet = Number(ev.cabinet_id) === Number(finalCabinetId);

        if (!sameDoctor && !sameCabinet) return false;

        const evStart = parseISO(ev.start);
        const evEnd = parseISO(ev.end);
        return finalStartDate < evEnd && finalEndDate > evStart;
      });

      if (hasIntersection) {
        alert('Ошибка: Данное время уже занято этим врачом или кабинетом!');

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

        setTimeout(() => {
          isDraggingRef.current = false;
          blockClickRef.current = false;
        }, 300);

        return;
      }

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
          onFinish: () => {
            setTimeout(() => {
              isDraggingRef.current = false;
              blockClickRef.current = false;
            }, 300);
          },
        }
      );
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // ================= RESIZE =================
  const handleResizeStart = (e: React.MouseEvent, eventId: string, currentEndISO: string) => {
    e.stopPropagation();
    e.preventDefault();

    const startY = e.clientY;
    const baseEnd = parseISO(currentEndISO);
    let hasResizedEnough = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;

      if (!hasResizedEnough && Math.abs(deltaY) < 3) {
        return;
      }

      if (!hasResizedEnough) {
        hasResizedEnough = true;
        isResizingRef.current = true;
        blockClickRef.current = true;
      }

      const minutesDelta = Math.round(deltaY / 2 / 15) * 15;

      if (minutesDelta !== 0) {
        const newEndDate = new Date(baseEnd.getTime() + minutesDelta * 60000);
        const newEndISO = format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss");
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

      if (!hasResizedEnough) {
        isResizingRef.current = false;
        blockClickRef.current = false;
        return;
      }

      // Удерживаем блокировку 400мс — это полностью перекрывает цикл синтетических кликов
      setTimeout(() => {
        isResizingRef.current = false;
        blockClickRef.current = false;
      }, 400);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const PREVIEW_WIDTH = 340;
  const PREVIEW_HEIGHT = 280;

  const showPreview = (e: React.MouseEvent<HTMLDivElement>, event: any, services: any[]) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const margin = 12;

    let x = rect.right + margin;
    let y = rect.top;

    if (x + PREVIEW_WIDTH > window.innerWidth - margin) {
      x = rect.left - PREVIEW_WIDTH - margin;
    }

    if (x < margin) {
      x = margin;
    }

    if (y + PREVIEW_HEIGHT > window.innerHeight - margin) {
      y = window.innerHeight - PREVIEW_HEIGHT - margin;
    }

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

  const formatPatientName = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0];
    }

    const surname = parts[0];

    const initials = parts
      .slice(1)
      .map((part) => `${part.charAt(0)}.`)
      .join(' ');

    return `${surname} ${initials}`;
  };

  // Функція для переведення поточного часу в пікселі від початку дня (наприклад, від 08:00)
  const getCurrentTimeTop = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const startHour = 8; // Початок дня (08:00)

    // Кількість хвилин від початку дня
//     const totalMinutesFromStart = (currentHours - startHour) * 79 + currentMinutes;
    const totalMinutesFromStart = (currentHours - startHour) * 79;

    // Оскільки слот 30px відповідає 15 хвилинах, то 1 хвилина = 30 / 15 = 2px
    const topPixels = totalMinutesFromStart * (SLOT_HEIGHT / 15);

    return {
      top: topPixels,
      timeStr: format(now, 'HH:mm'),
    };
  };

  const [currentTimeInfo, setCurrentTimeInfo] = useState(getCurrentTimeTop());

  // Оновлюємо час щохвилини
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeInfo(getCurrentTimeTop());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
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
          position: 'relative',
        }}
      >
        {/* NAV */}
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
        />

        {/* CONTAINER */}
        <div
          className="calendar-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
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
                    display: 'flex',
                    flex: '0 0 auto',
                    width: dayWidth,
                    minWidth: dayWidth,
                    flexDirection: 'column',
                    background: '#fff',
                    borderRight: dayIdx < days.length - 1 ? '4px solid #cbd5e1' : 'none',
                    zIndex: showEventPopup || editEventPopup ? 0 : 40,
                  }}
                >
                  {/* 2. Встав лінію сюди: вона малюватиметься тільки для поточного дня */}
                  {day.date === format(new Date(), 'yyyy-MM-dd') && (
                    <div
                      style={{
                        position: 'absolute',
                        top: `${currentTimeInfo.top}px`,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#ff4d4f',
                        zIndex: 45,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: '10px',
                          backgroundColor: '#ff4d4f',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            display: 'inline-block',
                          }}
                        />
                        Зараз {currentTimeInfo.timeStr}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                    <SchedulerTimeColumn timeSlots={timeSlots} slotHeight={SLOT_HEIGHT} />

                    <div style={{ display: 'flex', flex: 1, height: gridHeight }}>
                      {cabinetData.map((cab, cabIdx) => (
                        <div
                          key={cab.id}
                          style={{
                            flex: 1,
                            display: 'flex',
                            height: '100%',
                            borderRight:
                              cabIdx < cabinetData.length - 1 ? '2px solid #94a3b8' : 'none',
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
                                    docIdx < customerData.length - 1
                                      ? '1px solid #e2e8f0'
                                      : '1px solid #e2e8f0',
                                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.03) 1px, transparent 1px)`,
                                  backgroundSize: `100% ${SLOT_HEIGHT * 4}px, 100% ${SLOT_HEIGHT}px`,
                                }}
                              >
                                {/* Додаємо візуальний блок-затемнення для неробочого часу (наприклад, після 18:00) */}
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: `${(18 - 8) * 4 * SLOT_HEIGHT}px`, // якщо день починається о 8:00, то 18:00 це через 10 годин (10 годин * 4 слоти на годину * SLOT_HEIGHT)
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.07)', // легке затемнення
                                    pointerEvents: 'none', // щоб кліки все одно доходили до обробника, який видасть console.log('disable for click')
                                    borderTop: '1px dashed #cbd5e1',
                                  }}
                                />
                                {dayEvents.map((event) => {
                                  const layout = getEventLayout(event);

                                  const compact = layout.height < 90;
                                  // const medium = layout.height >= 70 && layout.height < 110;
                                  const large = layout.height >= 110;

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
                                        border: 'solid 1px ' + event.status_color,
                                        borderLeft: `4px solid ${event.status_color}`,
                                      }}
                                    >
                                      <div className="calendar-event-body">
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-teal-200/60">
                                            {msg.get('scheduler.statuses.' + event.status_name)}
                                          </span>
                                          <span className="text-[10px] font-semibold text-slate-500">
                                            {event.event_time_from}-{event.event_time_to}
                                          </span>
                                        </div>
                                        <div className="my-0.5 inline-block h-[25px]">
                                          <h5 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors truncate p-0 m-0 mt-0.5">
                                            <b>{formatPatientName(event.patient_name)}</b>
                                          </h5>
                                          <span className="act-zone">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();

                                                router.visit(`/act/create?visit_id=${event.id}`);
                                              }}
                                              title="Створити акт"
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '20px',
                                                height: '20px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                flexShrink: 0,
                                              }}
                                            >
                                              <span className="material-symbols-outlined text-[14px]">
                                                inventory
                                              </span>
                                            </button>
                                          </span>
                                        </div>
                                        <div className="calendar-event-services">
                                          {servicesCount === 0 && (
                                            <div className="calendar-event-service">
                                              {event.title}
                                            </div>
                                          )}

                                          {servicesCount === 1 && (
                                            <p className="text-[11px] text-slate-500 truncate">
                                              {services[0].name}
                                            </p>
                                          )}

                                          {servicesCount > 1 && large && (
                                            <>
                                              {services.slice(0, 3).map((service) => (
                                                <p
                                                  key={service.id}
                                                  className="text-[11px] text-slate-500 truncate"
                                                >
                                                  {service.name}
                                                </p>
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

                                        {!compact && (
                                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 mt-[-10px]">
                                            <span className="font-bold text-teal-800">3,200 ₴</span>
                                            <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600">
                                              <span className="material-symbols-outlined text-[14px]">
                                                dentistry
                                              </span>
                                              <span className="material-symbols-outlined text-[14px]">
                                                history
                                              </span>
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
                    <tbody>
                      {hoverPreview.services.map((service) => (
                        <tr key={service.id} style={{ width: '100%' }}>
                          <td className="service-pr-name">{service.name}</td>
                          <td className="service-pr-price">
                            <strong>{service.total_price} ₴</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
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
