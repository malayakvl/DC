import React from 'react';
import { DayColumn } from '../engine/dayColumns';

type SchedulerDayViewHeaderProps = {
  dateLabel: string;
  columns: DayColumn[];
  columnWidth: number;
  columnsRef: React.RefObject<HTMLDivElement>;
};

export default function SchedulerDayViewHeader({
  dateLabel,
  columns,
  columnWidth,
  columnsRef,
}: SchedulerDayViewHeaderProps) {
  return (
    <div
      className="scheduler-day-view-header"
      style={{ minWidth: 70 + columns.length * columnWidth, width: '100%' }}
    >
      <div className="scheduler-day-view-header__date">
        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
        {dateLabel}
      </div>
      <div ref={columnsRef} className="scheduler-day-view-header__columns">
        {columns.map(({ id, cabinet, doctor }) => (
          <div
            className="scheduler-day-view-header__column"
            key={id}
            style={{ flex: `1 0 ${columnWidth}px`, minWidth: columnWidth }}
          >
            <div className="scheduler-day-view-header__cabinet">
              <span className="material-symbols-outlined text-[17px]">meeting_room</span>
              {cabinet.cabinet_name || cabinet.name}
            </div>
            <div className="scheduler-day-view-header__doctor">
              <span className="scheduler-day-view-header__avatar">
                {(doctor.name || doctor.label || '?')
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part: string) => part[0])
                  .join('')}
              </span>
              <span className="scheduler-day-view-header__doctor-name">
                {doctor.name || doctor.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
