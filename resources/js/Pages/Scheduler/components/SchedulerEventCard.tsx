import React from 'react';
import { router } from '@inertiajs/react';

const COMPACT_EVENT_HEIGHT = 90;
const PRICE_EVENT_HEIGHT = 110;
const EVENT_WITHOUT_FOOTER_CHROME = 62;
const EVENT_WITH_FOOTER_CHROME = 84;
const EVENT_SERVICE_LINE_HEIGHT = 18;

type SchedulerEventCardProps = {
  event: any;
  layout: { top: number; height: number };
  statusLabel: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  onResizeStart: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const getEventBackground = (status?: string) => {
  switch (status) {
    case 'done':
      return '#dbfaf6';
    case 'planned':
      return '#eff6ff';
    case 'inclinic':
      return '#fffbeb';
    case 'incabinet':
      return '#ede5fb';
    case 'confirm':
      return '#dffdf4';
    case 'deny':
      return '#f8dae6';
    case 'noanswer':
      return '#faf8f4';
    case 'absent':
      return '#eceaea';
    case 'late':
      return '#f8d0d0';
    case 'new':
      return '#faefc4';
    default:
      return '#f8fafc';
  }
};

const getStatusBackground = (status?: string) => {
  switch (status) {
    case 'done':
      return '#4e9795';
    case 'planned':
      return '#053d98';
    case 'inclinic':
      return '#ef7e34';
    case 'incabinet':
      return '#a984ec';
    case 'confirm':
      return '#10B981';
    case 'deny':
      return '#aaa7a8';
    case 'noanswer':
      return '#a1a09c';
    case 'absent':
      return '#8c8889';
    case 'late':
      return '#f42727';
    case 'new':
      return '#f1b55a';
    default:
      return '#818385';
  }
};

const formatPatientName = (name?: string) => {
  if (!name) return '';

  const [surname, ...rest] = name.trim().split(/\s+/);
  const initials = rest.map((part) => `${part.charAt(0)}.`).join(' ');

  return initials ? `${surname} ${initials}` : surname;
};

const parseServices = (services: unknown): any[] => {
  if (Array.isArray(services)) return services;

  if (typeof services === 'string') {
    try {
      const parsed = JSON.parse(services);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

export default function SchedulerEventCard({
  event,
  layout,
  statusLabel,
  onClick,
  onMouseDown,
  onResizeStart,
}: SchedulerEventCardProps) {
  const compact = layout.height < COMPACT_EVENT_HEIGHT;
  const showPrice = layout.height >= PRICE_EVENT_HEIGHT;
  const services = parseServices(event.services);
  const serviceLineCapacity = compact
    ? 1
    : Math.max(
        1,
        Math.floor(
          (layout.height - (showPrice ? EVENT_WITH_FOOTER_CHROME : EVENT_WITHOUT_FOOTER_CHROME)) /
            EVENT_SERVICE_LINE_HEIGHT
        )
      );
  const visibleServicesCount =
    services.length > serviceLineCapacity ? Math.max(1, serviceLineCapacity - 1) : services.length;
  const hiddenServicesCount = Math.max(0, services.length - visibleServicesCount);
  const showInlineMore = hiddenServicesCount > 0 && serviceLineCapacity === 1;

  return (
    <div
      className={`shadow-sm calendar-event scheduler-event-card ${compact ? 'compact' : ''}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        top: layout.top,
        height: layout.height,
        left: 4,
        right: 4,
        backgroundColor: getEventBackground(event.status_name),
        border: '1px solid transparent',
      }}
    >
      <div className="calendar-event-body scheduler-event-card__body">
        <div className="scheduler-event-card__header">
          <span className="scheduler-event-card__time">
            {event.event_time_from}-{event.event_time_to}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Двойной бейдж: Статус + Цена */}
            <div
              className={`inline-flex items-center rounded-lg text-white text-[11px] font-semibold overflow-hidden shadow-sm`}
            >
              <span
                style={{ backgroundColor: getStatusBackground(event.status_name) }}
                className={`px-2 py-0.5`}
              >
                {statusLabel}
              </span>
              <span className="px-2 py-0.5 bg-white text-black font-bold">
                {event.service?.total_price ?? event.total_price ?? 0} ₴
              </span>
            </div>

            {/* Кнопка создания акта */}
            <button
              type="button"
              onClick={(mouseEvent) => {
                mouseEvent.stopPropagation();
                mouseEvent.preventDefault();
                router.visit(`/act/create?visit_id=${event.id}`);
              }}
              title="Створити акт"
              className="w-6 h-6 rounded-md bg-surface-container-lowest/80 text-on-surface flex items-center justify-center hover:bg-surface-container-lowest transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">description</span>
            </button>
          </div>
        </div>

        <div className="scheduler-event-card__patient">{formatPatientName(event.patient_name)}</div>

        <div className="scheduler-event-card__services">
          {services.length === 0 && (
            <div className="scheduler-event-card__service-name">{event.title}</div>
          )}

          {services.slice(0, visibleServicesCount).map((service: any, index: number) => (
            <div
              className="scheduler-event-card__service-line"
              key={service.id ?? `${event.id}-${index}`}
            >
              <span className="scheduler-event-card__service-name">{service.name}</span>
              {showInlineMore && index === visibleServicesCount - 1 && (
                <span className="scheduler-event-card__more scheduler-event-card__more--inline">
                  +{hiddenServicesCount} ще
                </span>
              )}
            </div>
          ))}

          {hiddenServicesCount > 0 && !showInlineMore && (
            <span className="scheduler-event-card__more">+{hiddenServicesCount} ще</span>
          )}
        </div>

        {showPrice && <div className="scheduler-event-card__footer">3,200 ₴</div>}
      </div>

      <div onMouseDown={onResizeStart} data-resize-handle className="calendar-event-resize" />
    </div>
  );
}
