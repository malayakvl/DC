import React, { useMemo } from 'react';

type SchedulerDayHeaderProps = {
  day: { label: string; date?: string };
  isToday: boolean;
  cabinets: any[];
  people: any[];
  doctorWidth: number;
  todayBg: string;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const getContrastColor = (hexColor: string) => {
  if (!hexColor || !hexColor.startsWith('#')) return '#0f766e';
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#0f172a' : '#ffffff';
};

export default function SchedulerDayHeader({
  day,
  isToday,
  cabinets,
  people,
  doctorWidth,
  todayBg,
}: SchedulerDayHeaderProps) {
  const dateParts = useMemo(() => {
    if (!day?.date) return { main: day?.label || 'сб, 19', monthYear: 'вересня 2026' };

    const d = new Date(day.date);
    const weekdayAndDay = d.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric' });
    const month = d.toLocaleDateString('uk-UA', { month: 'long' });
    const year = d.toLocaleDateString('uk-UA', { year: 'numeric' });

    return {
      main: weekdayAndDay.toLowerCase(),
      monthYear: `${month} ${year}`.toLowerCase(),
    };
  }, [day]);

  return (
    <div
      className="calendar-header-content"
      style={{
        flexShrink: 0,
        background: '#fff',
        zIndex: 100,
      }}
    >
      {/* Верхняя строка: Дата и подпись (выровнена по сетке с нижней частью) */}
      <div
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          boxShadow: 'inset 0 -1px 0 #e2e8f0',
        }}
      >
        {/* Левый блок «ДАТА» строго шириной 70px под колонку времени */}
        <div
          style={{
            width: 70,
            flexShrink: 0,
            background: '#fff',
            borderRight: '2px solid #e2e8f0',
            borderLeft: '1px solid #e2e8f0',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontSize: '11px',
            color: '#64748b',
            boxShadow: 'inset 0 -1px 0 #e2e8f0',
          }}
        >
          <span className="material-symbols-outlined text-[15px] text-slate-400">
            calendar_month
          </span>
          ДАТА
        </div>

        {/* Правый блок верхней строки (над кабинетами) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            padding: '0 16px',
          }}
        >
          <div
            style={{
              height: 56,
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              boxShadow: 'inset 0 -1px 0 #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 12px',
                background: '#f0fdfa',
                border: '1px solid #2dd4bf',
                borderRadius: '16px',
                color: '#0f766e',
                fontSize: 13,
              }}
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <span style={{ fontWeight: 700, fontSize: '11px' }}>{dateParts.main}</span>
                <span style={{ fontWeight: 400, fontSize: '11px' }}>{dateParts.monthYear}</span>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#64748b', marginLeft: '20px' }}>
              Розклад робочого дня кабінетів клініки
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть шапки: Колонка времени слева и кабинеты с докторами справа */}
      <div style={{ display: 'flex' }}>
        {/* Левая колонка «ЧАС» общей высотой 115px (48px строка кабинета + 67px строка докторов) */}
        <div
          style={{
            width: 70,
            flexShrink: 0,
            background: '#f1f5f9',
            borderRight: '2px solid #e2e8f0',
            borderLeft: '1px solid #e2e8f0',
            height: '115px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontSize: '11px',
            color: '#64748b',
          }}
        >
          <span className="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
          ЧАС
        </div>

        {/* Правая часть с кабинетами */}
        <div style={{ display: 'flex', flex: 1 }}>
          {cabinets.map((cab, cabIdx) => (
            <div
              key={cab.id}
              style={{
                flex: 1,
                borderRight: cabIdx < cabinets.length - 1 ? '2px solid #94a3b8' : 'none',
              }}
            >
              {/* Шапка конкретного кабинета (высота 48px) */}
              <div
                style={{ height: 48 }}
                className="w-full shrink-0 bg-teal-50/70 text-teal-950 px-4 flex items-center justify-between border-b border-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[17px]">meeting_room</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight text-teal-950">
                      {cab.cabinet_name}
                    </span>
                    {cab.cabinet_type && (
                      <span className="text-xs text-teal-700 font-medium">
                        ({cab.cabinet_type})
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[11px] font-bold bg-white/90 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                  {cab.doctors_count || 6} спеціалістів • {cab.appointments_count || 18} прийомів
                </span>
              </div>

              {/* Список докторов под кабинетом (высота 67px, итого 48 + 67 = 115px) */}
              <div style={{ display: 'flex', height: 67, background: '#fff' }}>
                {people.map((doc) => {
                  const fullName = doc.name || doc.label || '';
                  const initials = getInitials(fullName);
                  const avatarBg = doc.color || '#94a3b8';

                  return (
                    <div
                      key={doc.id}
                      style={{
                        width: doctorWidth,
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                        height: '100%',
                        padding: '0 10px',
                        background: '#fff',
                        borderRight: '1px solid #e2e8f0',
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: '50%',
                          backgroundColor: avatarBg ? `${avatarBg}15` : 'rgba(45, 212, 191, 0.15)',
                          border: `1.5px solid ${avatarBg || '#2dd4bf'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 700,
                          color: avatarBg || '#0f766e',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                        title={fullName}
                      >
                        {doc.avatar ? (
                          <img
                            src={`/storage/${doc.avatar}`}
                            alt={fullName}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          initials
                        )}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#0f172a',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: '1.2',
                          }}
                          title={fullName}
                        >
                          {fullName}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: '#0f766e',
                            letterSpacing: '0.03em',
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={doc.specialty || 'ТЕРАПЕВТ'}
                        >
                          ТЕРАПЕВТ
                        </div>
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
  );
}