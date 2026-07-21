import { timeToPixels } from './timeEngine';

interface EventTimeData {
  event_time_from: string;
  event_time_to: string;
}

interface EventLayoutResult {
  top: number;
  height: number;
}

/**
 * Вычисляет позицию и высоту карточки визита на сетке
 * @param event Объект события, содержащий время начала и конца
 * @param startHour Час начала работы сетки (по умолчанию 8)
 * @param slotHeight Высота одного 15-минутного слота вpx (по умолчанию 30)
 * @param stepMinutes Шаг сетки в минутах (по умолчанию 15)
 */
export function getEventLayout(
  event: EventTimeData,
  startHour = 8,
  slotHeight = 30,
  stepMinutes = 15
): EventLayoutResult {
  if (!event.event_time_from || !event.event_time_to) {
    return { top: 0, height: slotHeight };
  }

  // Считаем отступы в пикселях от самого верха сетки
  const topPos = timeToPixels(event.event_time_from, startHour, slotHeight, stepMinutes);
  const bottomPos = timeToPixels(event.event_time_to, startHour, slotHeight, stepMinutes);

  // Вычисляем чистую высоту карточки
  let height = bottomPos - topPos;

  // Защита от схлопывания: минимальная высота карточки — один слот
  if (height < slotHeight) {
    height = slotHeight;
  }

  return {
    top: topPos,
    height: height,
  };
}
