export interface TimeSlot {
  time: string;
  isHour: boolean;
}

export function generateTimeSlots(startHour = 8, endHour = 20, stepMinutes = 15): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += stepMinutes) {
      if (hour === endHour && min > 0) break;
      const HH = String(hour).padStart(2, '0');
      const MM = String(min).padStart(2, '0');
      slots.push({
        time: `${HH}:${MM}`,
        isHour: min === 0,
      });
    }
  }
  return slots;
}

// Перевод времени HH:MM в пиксели относительно начала сетки
export function timeToPixels(
  timeStr: string,
  startHour = 8,
  slotHeight = 30,
  stepMinutes = 15
): number {
  const [hh, mm] = timeStr.split(':').map(Number);
  const totalMinutesFromStart = (hh - startHour) * 60 + mm;
  const slotsFromStart = totalMinutesFromStart / stepMinutes;
  return slotsFromStart * slotHeight;
}
