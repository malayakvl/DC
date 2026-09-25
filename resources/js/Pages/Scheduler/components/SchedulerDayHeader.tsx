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
  console.log(day);

  // Все useMemo находятся строго внутри компонента
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
      className={'calendar-header-content'}
      style={{
        flexShrink: 0,
        background: '#fff',
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,.05)',
      }}
    >
      <div
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          background: isToday ? '#fff' : '#fff',
          boxShadow: 'inset 0 -1px 0 #e2e8f0',
        }}
      >
        {/* Левая часть: Стильная плашка с датой и иконкой */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 12px', // Увеличили горизонтальный отступ
            background: '#f0fdfa',
            border: '1px solid #2dd4bf',
            borderRadius: '16px', // Сделали крутые, выраженные скругления
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

        {/* Правая часть: Подпись */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: '#64748b',
          }}
        >
          Розклад робочого дня кабінетів клініки
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: 70,
            flexShrink: 0,
            background: '#fff',
            borderRight: '2px solid #e2e8f0',
            borderLeft: '1px solid #e2e8f0',
            height: '115px',
          }}
        />
        <div style={{ display: 'flex', flex: 1 }}>
          {cabinets.map((cab, cabIdx) => (
            <div
              key={cab.id}
              style={{
                flex: 1,
                borderRight: cabIdx < cabinets.length - 1 ? '2px solid #94a3b8' : 'none',
              }}
            >
              <div
                style={{
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  background: '#f1fcfa',
                  boxShadow: 'inset 0 -1px 0 #cbd5e1',
                }}
              >
                {/* Левая часть: Название кабинета с иконкой и типом */}
                {/* Левая часть: Название кабинета с иконкой */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-bold text-xs shadow-2xs">
                  <span className="material-symbols-outlined text-[16px] text-teal-600">
                    door_front
                  </span>
                  <span>{cab.cabinet_name}</span>
                  {cab.cabinet_type && (
                    <span className="text-[11px] font-medium text-teal-700">
                      ({cab.cabinet_type})
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', height: 34 }}>
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
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                        height: '70px',
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
                          // Полупрозрачный фон на основе цвета доктора (или мятный по умолчанию)
                          backgroundColor: avatarBg ? `${avatarBg}15` : 'rgba(45, 212, 191, 0.15)',
                          // Бордер четко в цвет бг доктора
                          border: `1.5px solid ${avatarBg || '#2dd4bf'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 700,
                          // Цвет текста инициалов берем в тон рамки (или используем getContrastColor, если нужен контраст)
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
