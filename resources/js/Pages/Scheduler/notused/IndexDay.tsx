import React from 'react';
import IndexSticky from './IndexSticky';

/**
 * Однодневное представление расписания.
 *
 * Переиспользует всю логику IndexSticky: создание и редактирование визитов,
 * перетаскивание, изменение длительности и предпросмотр. В отличие от
 * IndexSticky, отображает только один день и не показывает переключатель
 * представлений.
 */
export default function IndexDay(props) {
  return <IndexSticky {...props} initialView="day" allowViewSwitch={false} />;
}
