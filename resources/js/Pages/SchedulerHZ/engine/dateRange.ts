import { addDays, format, parseISO } from 'date-fns';

export function getThreeDayRange(baseDate: string) {
  const start = parseISO(baseDate);

  return [0, 1, 2].map((i) => {
    const d = addDays(start, i);

    return {
      date: format(d, 'yyyy-MM-dd'),
      label: format(d, 'EEE dd'),
    };
  });
}
