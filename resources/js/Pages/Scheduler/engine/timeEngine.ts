export function generateTimeSlots(startHour = 8, endHour = 20, step = 15) {
  const slots = [];

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += step) {
      slots.push({
        label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
        minutes: h * 60 + m,
      });
    }
  }

  return slots;
}
