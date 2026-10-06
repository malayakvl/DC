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
      return '#f4f7fa';
    case 'planned':
      return '#eff6ff';
    case 'inclicnic':
      return '#fffbeb';
    default:
      return '#f8fafc';
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
          <div className="scheduler-event-card__actions">
            <span className={`event-status ${event.status_name}`}>{statusLabel}</span>
            <button
              type="button"
              onClick={(mouseEvent) => {
                mouseEvent.stopPropagation();
                mouseEvent.preventDefault();
                router.visit(`/act/create?visit_id=${event.id}`);
              }}
              title="Створити акт"
              className="act-btn"
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
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
