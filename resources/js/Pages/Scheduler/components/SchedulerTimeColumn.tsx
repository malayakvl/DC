import React from 'react';

type TimeSlot = { label: string };

type SchedulerTimeColumnProps = {
  timeSlots: TimeSlot[];
  slotHeight: number;
};

export default function SchedulerTimeColumn({ timeSlots, slotHeight }: SchedulerTimeColumnProps) {
  return (
    <div
      className="scheduler-time-column"
      style={{
        width: 70,
        flexShrink: 0,
        position: 'sticky',
        left: 0,
        top: 0,
        alignSelf: 'flex-start',
        zIndex: 30,
        background: '#fff',
      }}
    >
      {timeSlots.map((slot, index) => {
        const isHour = index % 4 === 0;
        const timeStr = slot.label; // например, "08:00", "08:15", "08:30", "08:45"

        return (
          <div
            key={timeStr}
            style={{
              height: slotHeight,
              background: isHour ? '#f4fefb' : '#fff',
              borderRight: '1px solid #0ea5a4',
              borderLeft: '1px solid #0ea5a4',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '6px 8px',
              textAlign: 'right',
            }}
          >
            {isHour ? (
              /* Начало часа: с точкой и белым текстом (поскольку фон teal) */
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '5px',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#fff',
                    display: 'inline-block',
                  }}
                ></span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#0ea5a4',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#000', lineHeight: 1 }}>
                  {timeStr}
                </span>
              </div>
            ) : (
              /* Промежуточные интервалы (15, 30, 45 минут) */
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: timeStr.endsWith(':30') ? 600 : 400, // 30-я минута чуть заметнее
                  color: timeStr.endsWith(':30') ? '#475569' : '#94a3b8',
                  width: '100%',
                  textAlign: 'right',
                  lineHeight: 1,
                }}
              >
                {timeStr}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
