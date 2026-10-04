const SLOT_HEIGHT = 35;
const PIXELS_PER_MINUTE = SLOT_HEIGHT / 15; // 35 / 15 = 2.333 px на 1 минуту
const DAY_START_MINUTES = 8 * 60; // Начало дня в 08:00 (480 минут)

function toMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m; // Реальные минуты в часе, без кривых множителей на 70!
}

export function getEventLayout(event: any) {
  const startMinutes = toMinutes(event.event_time_from || event.start.split('T')[1].slice(0, 5));
  const endMinutes = toMinutes(event.event_time_to || event.end.split('T')[1].slice(0, 5));

  return {
    top: (startMinutes - DAY_START_MINUTES) * PIXELS_PER_MINUTE,
    height: Math.max((endMinutes - startMinutes) * PIXELS_PER_MINUTE - 2, 20),
  };
}