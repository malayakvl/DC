type TimeSlot = { label: string };

type SchedulerTimeColumnProps = {
  timeSlots: TimeSlot[];
  slotHeight: number;
};

export default function SchedulerTimeColumn({ timeSlots, slotHeight }: SchedulerTimeColumnProps) {
  return (
    <div
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

        return (
          <div
            key={slot.label}
            style={{
              height: slotHeight,
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
              borderRight: '1px solid #0ea5a4',
              borderLeft: '1px solid #0ea5a4',
            }}
          >
            {slot.label}
          </div>
        );
      })}
    </div>
  );
}
