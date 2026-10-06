import React, { useMemo, useRef } from 'react';
import Lang from 'lang.js';
import { useSelector } from 'react-redux';
import lngScheduler from '../../Lang/Scheduler/translation';
import { appLangSelector } from '@/Redux/Layout/selectors';
import {
  eventsDataSelector,
  schedulerBaseDateSelector,
  schedulerCabinetFilterSelector,
  schedulerDoctorFilterSelector,
  schedulerStatusSelector,
  viewScheduleSelector,
} from '@/Redux/Scheduler/selectors';
import { generateTimeSlots } from './engine/timeEngine';
import { getEventLayout } from './engine/eventLayout';
import { buildDayColumns } from './engine/dayColumns';
import { getSchedulePeople } from './engine/schedulePeople';
import SchedulerDayViewHeader from './components/SchedulerDayViewHeader';
import SchedulerEventCard from './components/SchedulerEventCard';
import SchedulerTimeColumn from './components/SchedulerTimeColumn';
import { useSchedulerEvents } from './hooks/useSchedulerEvents';

const SLOT_HEIGHT = 35;
const COLUMN_WIDTH = 320;

type IndexDayProps = {
  cabinetData: any[];
  groupedOptions: any[];
  eventsData: any[];
};

export default function IndexDay({ cabinetData, groupedOptions, eventsData }: IndexDayProps) {
  const appLang = useSelector(appLangSelector);
  const date = useSelector(schedulerBaseDateSelector);
  const tab = useSelector(viewScheduleSelector);
  const cabinetFilterId = useSelector(schedulerCabinetFilterSelector);
  const doctorFilterId = useSelector(schedulerDoctorFilterSelector);
  const statusFilter = useSelector(schedulerStatusSelector);
  const remoteEvents = useSelector(eventsDataSelector);
  const headerColumnsRef = useRef<HTMLDivElement | null>(null);
  const isResizingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const blockClickRef = useRef(false);
  const msg = new Lang({ messages: lngScheduler, locale: appLang });
  const timeSlots = useMemo(() => generateTimeSlots(8, 20, 15), []);
  const gridHeight = timeSlots.length * SLOT_HEIGHT;

  const sourceEvents = remoteEvents.length > 0 ? remoteEvents : eventsData;
  const { localEvents, handleCellClick, handleEventClick, handleDragStart, handleResizeStart } =
    useSchedulerEvents(sourceEvents, msg, blockClickRef, isResizingRef, isDraggingRef, SLOT_HEIGHT);

  const currentTabPeople = useMemo(() => {
    return getSchedulePeople(groupedOptions, tab);
  }, [groupedOptions, tab]);

  const columns = useMemo(
    () => buildDayColumns(cabinetData, currentTabPeople, cabinetFilterId, doctorFilterId),
    [cabinetData, cabinetFilterId, currentTabPeople, doctorFilterId]
  );

  const visibleEvents = useMemo(
    () =>
      localEvents.filter(
        (event) =>
          event.event_date === date && (!statusFilter || event.status_name === statusFilter)
      ),
    [date, localEvents, statusFilter]
  );

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(appLang, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(new Date(`${date}T12:00:00`)),
    [appLang, date]
  );

  const syncHeaderScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (headerColumnsRef.current) {
      headerColumnsRef.current.style.transform = `translateX(-${event.currentTarget.scrollLeft}px)`;
    }
  };

  return (
    <div className="scheduler-day-view">
      <div className="scheduler-day-view__header-viewport">
        <SchedulerDayViewHeader
          columns={columns}
          columnsRef={headerColumnsRef}
          columnWidth={COLUMN_WIDTH}
          dateLabel={dateLabel}
        />
      </div>

      <div className="scheduler-day-view__grid-viewport" onScroll={syncHeaderScroll}>
        <div
          className="scheduler-day-view__grid"
          style={{ minWidth: 70 + columns.length * COLUMN_WIDTH, width: '100%' }}
        >
          <SchedulerTimeColumn timeSlots={timeSlots} slotHeight={SLOT_HEIGHT} />

          {columns.map((column) => {
            const columnEvents = visibleEvents.filter(
              (event) =>
                Number(event.cabinet_id) === Number(column.cabinet.id) &&
                Number(event.doctor_id) === Number(column.doctor.id)
            );

            return (
              <div
                className="scheduler-day-view__column"
                data-cabinet-id={column.cabinet.id}
                data-column-type="doctor-cell"
                data-date={date}
                data-doctor-id={column.doctor.id}
                key={column.id}
                onClick={(event) =>
                  handleCellClick(event, date, column.cabinet.id, column.doctor.id, timeSlots)
                }
                style={{
                  height: gridHeight,
                  minWidth: COLUMN_WIDTH,
                  flex: `1 0 ${COLUMN_WIDTH}px`,
                }}
              >
                {columnEvents.map((event) => {
                  const layout = getEventLayout(event);

                  return (
                    <SchedulerEventCard
                      event={event}
                      key={event.id}
                      layout={layout}
                      onClick={(mouseEvent) => handleEventClick(mouseEvent, event)}
                      onMouseDown={(mouseEvent) => handleDragStart(mouseEvent, event)}
                      onResizeStart={(mouseEvent) =>
                        handleResizeStart(mouseEvent, event.id, event.end)
                      }
                      statusLabel={msg.get(`scheduler.statuses.${event.status_name}`)}
                    />
                  );
                })}
              </div>
            );
          })}

          {columns.length === 0 && (
            <div className="scheduler-day-view__empty" style={{ height: gridHeight }}>
              Немає колонок для вибраних кабінету та лікаря.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
