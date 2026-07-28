// hooks/useSchedulerEvents.ts
import { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { parseISO, format, differenceInMinutes } from 'date-fns';
import moment from 'moment';
import dayjs from 'dayjs';
import { router } from '@inertiajs/react';
import {
  setExistServicesAction,
  setPopupCabinetAction,
  setSchedulePopupDoctorAction,
  showSchedulePopupAction,
  setScheduleDateAction,
  setScheduleTimeAction,
  setScheduleEditEventAction,
  initServicesAction,
  showScheduleEditPopupAction,
} from '@/Redux/Scheduler';
import { showOverlayAction } from '@/Redux/Layout';
import { SchedulerEvent } from '../mock/data';

const SLOT_HEIGHT = 30;

export function useSchedulerEvents(eventsData: any[], msg: any) {
  const dispatch = useDispatch();

  // 1. Единый стейт локальных событий
  const [localEvents, setLocalEvents] = useState<SchedulerEvent[]>(() => {
    if (!eventsData) return [];
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
      status_color: event.status_color || '#0ea5a4',
      status_name: event.status_name,
      patient_name: event.last_name ? `${event.last_name} ${event.first_name}` : event.patient_name,
      services:
        typeof event.services === 'string'
          ? JSON.parse(event.services || '[]')
          : event.services || [],
      cabinet_name: event.cabinet_name,
      doctor_name: event.doctor_first_name
        ? `${event.doctor_first_name} ${event.doctor_last_name}`
        : event.doctor_name,
    }));
  });

  // 2. Рефы блокировок (чтобы DND/Resize не вызывали клик)
  const isResizingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const blockClickRef = useRef(false);

  // Синхронизация с сервером
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
          status_color: event.status_color || '#0ea5a4',
          status_name: event.status_name,
          patient_name: event.last_name
            ? `${event.last_name} ${event.first_name}`
            : event.patient_name,
          services:
            typeof event.services === 'string'
              ? JSON.parse(event.services || '[]')
              : event.services || [],
          cabinet_name: event.cabinet_name,
          doctor_name: event.doctor_first_name
            ? `${event.doctor_first_name} ${event.doctor_last_name}`
            : event.doctor_name,
        }))
      );
    }
  }, [eventsData]);

  // --- HANDLER 1: Сохранение / Создание ---
  const handleSaveLocalEvent = useCallback((rawEvent: any) => {
    const formattedEvent: SchedulerEvent = {
      id: String(rawEvent.id),
      title: rawEvent.title,
      doctor_id: Number(rawEvent.doctor_id),
      patient_id: Number(rawEvent.patient_id),
      cabinet_id: Number(rawEvent.cabinet_id),
      event_date: rawEvent.event_date,
      event_time_from: rawEvent.event_time_from.slice(0, 5),
      event_time_to: rawEvent.event_time_to.slice(0, 5),
      start: `${rawEvent.event_date}T${rawEvent.event_time_from}`,
      end: `${rawEvent.event_date}T${rawEvent.event_time_to}`,
      status_color: rawEvent.status_color || '#0ea5a4',
      patient_name: rawEvent.last_name
        ? `${rawEvent.last_name} ${rawEvent.first_name}`
        : rawEvent.patient_name,
      services:
        typeof rawEvent.services === 'string'
          ? JSON.parse(rawEvent.services || '[]')
          : rawEvent.services || [],
    };

    setLocalEvents((prev) => {
      const exists = prev.some((ev) => ev.id === formattedEvent.id);
      return exists
        ? prev.map((ev) => (ev.id === formattedEvent.id ? formattedEvent : ev))
        : [...prev, formattedEvent];
    });
  }, []);

  // --- HANDLER 2: Клик по сетке (Создание визита) ---
  const handleCellClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      date: string,
      cabinetId: number,
      doctorId: number,
      timeSlots: any[]
    ) => {
      if (isResizingRef.current || isDraggingRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const slotIndex = Math.floor(clickY / SLOT_HEIGHT);

      if (slotIndex >= 0 && slotIndex < timeSlots.length) {
        const clickedSlot = timeSlots[slotIndex];
        const now = moment();
        const selectedDateTime = moment(`${date} ${clickedSlot.label}`, 'YYYY-MM-DD HH:mm');
        if (selectedDateTime.isBefore(now)) {
          alert(msg.get('scheduler.error.pastTime'));
          return;
        }

        dispatch(setExistServicesAction([]));
        dispatch(showSchedulePopupAction(true));
        dispatch(setPopupCabinetAction(cabinetId));
        dispatch(setSchedulePopupDoctorAction(doctorId));
        dispatch(showOverlayAction(true));
        dispatch(setScheduleDateAction(dayjs(date).format('DD.MM.YYYY')));
        dispatch(setScheduleTimeAction(clickedSlot.label));
      }
    },
    [dispatch, msg]
  );

  // --- HANDLER 3: Клик по карточке события (Редактирование) ---
  const handleEventClick = useCallback(
    (e: React.MouseEvent, cellEvent: SchedulerEvent) => {
      e.stopPropagation();

      if (isDraggingRef.current || isResizingRef.current || blockClickRef.current) {
        e.preventDefault();
        return;
      }

      const servicesArray =
        typeof cellEvent.services === 'string'
          ? JSON.parse(cellEvent.services)
          : cellEvent.services || [];

      dispatch(setScheduleEditEventAction(cellEvent));
      dispatch(setScheduleDateAction(cellEvent.event_date));
      dispatch(initServicesAction(servicesArray));
      dispatch(setScheduleTimeAction(cellEvent.event_time_from));
      dispatch(showOverlayAction(true));
      dispatch(showScheduleEditPopupAction(true));
    },
    [dispatch]
  );

  // --- HANDLER 4: Drag & Drop ---
  const handleDragStart = useCallback((e: React.MouseEvent, event: SchedulerEvent) => {
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

      if (!hasMovedEnough && Math.sqrt(deltaX * deltaX + deltaY * deltaY) < 5) return;

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

      setLocalEvents((prev) =>
        prev.map((ev) => {
          if (ev.id !== event.id) return ev;
          return {
            ...ev,
            event_date: finalDate,
            cabinet_id: finalCabinetId,
            doctor_id: finalDoctorId,
            start: `${finalDate}T${format(finalStartDate, 'HH:mm:ss')}`,
            end: `${finalDate}T${format(finalEndDate, 'HH:mm:ss')}`,
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

      // Проверка перекрытий и сохранение на бэк
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
            }, 100);
          },
        }
      );
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  // --- HANDLER 5: Resize ---
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, eventId: string, currentEndISO: string) => {
      e.stopPropagation();
      e.preventDefault();

      const startY = e.clientY;
      const baseEnd = parseISO(currentEndISO);
      isResizingRef.current = true;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = moveEvent.clientY - startY;
        const minutesDelta = Math.round(deltaY / 2 / 15) * 15;

        if (minutesDelta !== 0) {
          const newEndDate = new Date(baseEnd.getTime() + minutesDelta * 60000);
          const newEndISO = format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss");
          const newEndTimeHuman = format(newEndDate, 'HH:mm');

          setLocalEvents((prevEvents) =>
            prevEvents.map((ev) => {
              if (ev.id !== eventId) return ev;
              if (newEndDate.getTime() <= parseISO(ev.start).getTime()) return ev;

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
        setTimeout(() => {
          isResizingRef.current = false;
        }, 50);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    []
  );

  return {
    localEvents,
    handleSaveLocalEvent,
    handleCellClick,
    handleEventClick,
    handleDragStart,
    handleResizeStart,
  };
}
