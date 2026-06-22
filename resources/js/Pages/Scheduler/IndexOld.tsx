import React, { useMemo, useState } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { cabinets, doctors, events, SchedulerEvent } from './mock/data';
import { generateTimeSlots } from './engine/timeEngine';
import { getEventLayout } from './engine/eventLayout';
import { Head } from '@inertiajs/react';
// import PrimaryButton from '@/Components/Form/PrimaryButton';
// import NavLink from '@/Components/Links/NavLink';
import Lang from 'lang.js';
import lngScheduler from '../../Lang/Scheduler/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';

// ================= CORE GRID ENGINE =================
const SLOT_HEIGHT = 30;

const FREE_SLOT_BG = '#fbfdff';
const TODAY_BG = '#eef6ff';

function getDays(baseDate: string, count: number) {
  const start = parseISO(baseDate);

  return Array.from({ length: count }).map((_, i) => {
    const d = addDays(start, i);

    return {
      date: format(d, 'yyyy-MM-dd'),
      label: format(d, 'EEE dd'),
    };
  });
}

export default function Index() {
  const [baseDate, setBaseDate] = useState('2026-06-21');
  const [view, setView] = useState<'day' | '3days'>('3days');
  const appLang = useSelector(appLangSelector);
  const isResizingRef = React.useRef(false);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const dayStep = view === 'day' ? 1 : 3;

  const days = useMemo(() => {
    return getDays(baseDate, dayStep);
  }, [baseDate, dayStep]);

  const timeSlots = useMemo(() => generateTimeSlots(8, 20, 15), []);
  const gridHeight = timeSlots.length * SLOT_HEIGHT;

  // ================= INTERACTIVE EVENTS STATE =================
  const [localEvents, setLocalEvents] = useState<SchedulerEvent[]>(() => {
    const targetCabinetId = cabinets[0]?.id || 1;
    const targetDoctorId = doctors[0]?.id || 1;

    return [
      ...events,
      {
        id: 'test-sharp-event',
        cabinet_id: targetCabinetId,
        doctor_id: targetDoctorId,
        event_date: '2026-06-21',
        start: '2026-06-21T09:00:00',
        end: '2026-06-21T10:30:00',
        event_time_from: '09:00',
        event_time_to: '10:30',
        title: '💥 Тестовый замес (Консультация)',
        status_color: '#38bdf8',
      },
    ];
  });

  // ================= RESIZE ENGINE =================
  const handleResizeStart = (e: React.MouseEvent, eventId: string, currentEndISO: string) => {
    e.stopPropagation(); // Чтобы не триггерился клик по самой карточке или сетке
    e.preventDefault();

    const startY = e.clientY;
    const baseEnd = parseISO(currentEndISO);
    isResizingRef.current = true; // <-- Включили режим ресайза

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;

      // Переводим пиксели в минуты (у тебя 2px = 1 минута, значит делим на 2)
      // И округляем до шага в 15 минут
      const minutesDelta = Math.round(deltaY / 2 / 15) * 15;

      if (minutesDelta !== 0) {
        // Вычисляем новое конечное время, добавляя дельту в минутах к базовому времени
        // Используем чистый JS Date, чтобы не тягать лишние импорты для секундного экшена
        const newEndDate = new Date(baseEnd.getTime() + minutesDelta * 60000);

        // Форматируем обратно в ISO и в человеческий вид
        const newEndISO = `${format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss")}`;
        const newEndTimeHuman = format(newEndDate, 'HH:mm');

        setLocalEvents((prevEvents) =>
          prevEvents.map((ev) => {
            if (ev.id !== eventId) return ev;

            // Проверяем, чтобы конец не стал раньше начала (минимальная длительность 15 мин)
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

      // Сбрасываем флаг чуть позже, чтобы сработавший следом клик заблокировался
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
    // Если мы только что ресайзили — на выход, никакой модалки/алерта!
    if (isResizingRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    const slotIndex = Math.floor(clickY / SLOT_HEIGHT);

    if (slotIndex >= 0 && slotIndex < timeSlots.length) {
      const clickedSlot = timeSlots[slotIndex];

      console.log('🔥 Клик по сетке:', {
        date,
        cabinetName: cabinet.name,
        cabinetId: cabinet.id,
        doctorName: doctor.name,
        doctorId: doctor.id,
        time: clickedSlot.label,
      });

      alert(
        `Запердолить евент?\n📅 Дата: ${date}\n🕒 Время: ${clickedSlot.label}\n🚪 Кабинет: ${cabinet.name}\n👨‍⚕️ Врач: ${doctor.name}`
      );
    }
  };

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Customers" />
      <div>
        <div className="p-4 sm:p-8 content-data bg-content">
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
        <div
          style={{
            display: 'flex',
            marginLeft: '20px',
            marginRight: '20px',
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
              zIndex: 100,
            }}
          >
            <div>
              <button
                className="btn-submit"
                onClick={() =>
                  setBaseDate((prev) => format(addDays(parseISO(prev), -dayStep), 'yyyy-MM-dd'))
                }
              >
                Prev
              </button>
              <span style={{ margin: '0 12px', fontWeight: 600 }}>
                {days[0].label}
                {days.length > 1 && ` → ${days[days.length - 1].label}`}
              </span>
              <button
                className="btn-submit"
                onClick={() =>
                  setBaseDate((prev) => format(addDays(parseISO(prev), dayStep), 'yyyy-MM-dd'))
                }
              >
                Next
              </button>
            </div>

            <div>
              <button
                onClick={() => setView('day')}
                style={{ marginRight: 8, opacity: view === 'day' ? 1 : 0.5 }}
              >
                Day
              </button>
              <button
                onClick={() => setView('3days')}
                style={{ opacity: view === '3days' ? 1 : 0.5 }}
              >
                3 Days
              </button>
            </div>
          </div>

          {/* ================= MAIN HORIZONTAL SCROLL CONTAINER ================= */}
          <div style={{ display: 'flex', flex: 1, overflowX: 'auto', alignItems: 'stretch' }}>
            {days.map((day, dayIdx) => {
              const isToday = day.date === format(new Date(), 'yyyy-MM-dd');

              return (
                <div
                  key={day.date}
                  style={{
                    minWidth: 900,
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                    borderRight: dayIdx < days.length - 1 ? '4px solid #cbd5e1' : 'none',
                    height: '100%',
                  }}
                >
                  {/* ================= FIXED HEADER AREA ================= */}
                  <div
                    style={{
                      flexShrink: 0,
                      background: '#fff',
                      zIndex: 40,
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,.05)',
                    }}
                  >
                    {/* DAY HEADER */}
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

                    {/* CAB + DOCTORS */}
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          width: 70,
                          flexShrink: 0,
                          background: '#fff',
                          borderRight: '2px solid #e2e8f0',
                        }}
                      />

                      <div style={{ display: 'flex', flex: 1 }}>
                        {cabinets.map((cab, cabIdx) => (
                          <div
                            key={cab.id}
                            style={{
                              flex: 1,
                              borderRight:
                                cabIdx < cabinets.length - 1 ? '2px solid #94a3b8' : 'none',
                            }}
                          >
                            {/* Название кабинета */}
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
                              {cab.name}
                            </div>

                            {/* Врачи в кабинете */}
                            <div style={{ display: 'flex', height: 34 }}>
                              {doctors.map((doc, docIdx) => (
                                <div
                                  key={doc.id}
                                  style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: '#475569',
                                    background: '#fff',
                                    borderRight:
                                      docIdx < doctors.length - 1 ? '1px solid #e2e8f0' : 'none',
                                  }}
                                >
                                  {doc.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ================= SCROLLABLE BODY AREA ================= */}
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
                          {doctors.map((doc, docIdx) => {
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
                                style={{
                                  flex: 1,
                                  position: 'relative',
                                  height: '100%',
                                  backgroundColor: FREE_SLOT_BG,
                                  cursor: 'pointer',
                                  borderRight:
                                    docIdx < doctors.length - 1 ? '1px solid #e2e8f0' : 'none',
                                  backgroundImage: `
                                linear-gradient(to bottom, rgba(0,0,0,.12) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(0,0,0,.03) 1px, transparent 1px)
                              `,
                                  backgroundSize: `
                                100% ${SLOT_HEIGHT * 4}px,
                                100% ${SLOT_HEIGHT}px
                              `,
                                }}
                              >
                                {dayEvents.map((event) => {
                                  const layout = getEventLayout(event);

                                  return (
                                    <div
                                      key={event.id}
                                      onClick={(e) => e.stopPropagation()}
                                      style={{
                                        position: 'absolute',
                                        top: layout.top,
                                        height: layout.height,
                                        left: 4,
                                        right: 4,
                                        background: event.status_color || '#dff1ff',
                                        borderRadius: 6,
                                        padding: '4px 6px',
                                        fontSize: 11,
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 4px rgba(0,0,0,.08)',
                                        zIndex: 10,
                                        borderLeft: '3px solid rgba(0,0,0,.15)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between', // Растянет контент, чтобы ресайзер ушел вниз
                                      }}
                                    >
                                      <div>
                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>
                                          {event.title}
                                        </div>
                                        <div
                                          style={{ fontSize: 10, opacity: 0.8, color: '#334155' }}
                                        >
                                          {event.event_time_from} — {event.event_time_to}
                                        </div>
                                      </div>

                                      {/* ХЕНДЛЕР ДЛЯ РЕСАЙЗА (Нижняя полосочка шириной во всю карточку) */}
                                      <div
                                        onMouseDown={(e) =>
                                          handleResizeStart(e, event.id, event.end)
                                        }
                                        style={{
                                          position: 'absolute',
                                          bottom: 0,
                                          left: 0,
                                          right: 0,
                                          height: 8,
                                          cursor: 'ns-resize', // Курсор стрелочек "вверх-вниз"
                                          background: 'transparent',
                                          zIndex: 20,
                                        }}
                                        className="hover:bg-slate-400/30 transition-colors" // Подсветим при наведении для удобства
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
