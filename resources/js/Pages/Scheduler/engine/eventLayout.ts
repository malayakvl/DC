const PIXELS_PER_MINUTE = 2;
const DAY_START = 8 * 60; // 08:00

function toMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function getEventLayout(event: any) {
  const start = toMinutes(event.start.split('T')[1].slice(0, 5));
  const end = toMinutes(event.end.split('T')[1].slice(0, 5));

  return {
    top: (start - DAY_START) * PIXELS_PER_MINUTE,
    height: (end - start) * PIXELS_PER_MINUTE,
  };
}
