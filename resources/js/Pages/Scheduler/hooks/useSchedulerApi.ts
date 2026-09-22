// services/schedulerApi.ts
import { router } from '@inertiajs/react';
import { format } from 'date-fns';

interface UpdatePositionParams {
  eventId: string | number;
  finalDate: string;
  finalCabinetId: number;
  finalDoctorId: number;
  finalStartDate: Date;
  finalEndDate: Date;
  onDone?: () => void; // Общий коллбэк для сброса флагов (isDraggingRef и т.д.)
}

export const updateEventPosition = ({
  eventId,
  finalDate,
  finalCabinetId,
  finalDoctorId,
  finalStartDate,
  finalEndDate,
  onDone,
}: UpdatePositionParams) => {
  router.put(
    route('scheduler.update-position', eventId),
    {
      event_date: finalDate,
      cabinet_id: finalCabinetId,
      doctor_id: finalDoctorId,
      event_time_from: format(finalStartDate, 'HH:mm'),
      event_time_to: format(finalEndDate, 'HH:mm'),
    },
    {
      preserveScroll: true,
      onSuccess: () => {
        setTimeout(() => {
          onDone?.();
        }, 100);
      },
      onError: () => {
        setTimeout(() => {
          onDone?.();
        }, 100);
      },
    }
  );
};
