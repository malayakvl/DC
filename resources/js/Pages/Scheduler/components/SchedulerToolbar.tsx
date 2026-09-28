import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  schedulerViewSelector,
  schedulerStatusSelector,
  schedulerBaseDateSelector,
} from '../../../Redux/Scheduler/selectors';
import { setTypeViewAction } from '../../../Redux/Scheduler/index';
import { appLangSelector } from '@/Redux/Layout/selectors';
import getDays from '@/lib/calendarFunctions';
import { addDays, format, parseISO } from 'date-fns';
import { setCalendarDateAction } from '../../../Redux/Scheduler/index';


interface SchedulerToolbarProps {
  onPrevDay?: () => void;
  onNextDay?: () => void;
  onToday?: () => void;
  onNewAppointment?: () => void;
  cabinetsData: any;
  statusesData: any;
  customerData: any;
  allowViewSwitch?: boolean;
}

export const SchedulerToolbar: React.FC<SchedulerToolbarProps> = ({
  onPrevDay,
  onNextDay,
  onToday,
  cabinetsData,
  statusesData,
  customerData,
  onNewAppointment,
}) => {
  const appLang = useSelector(appLangSelector);
  const viewMode = useSelector(schedulerViewSelector);
  const baseCalendarDate = useSelector(schedulerBaseDateSelector);
  const dispatch = useDispatch();

  const dayStep = viewMode === 'day' ? 1 : 3;

  // Динамически получаем дни для текущего периода
  const days = useMemo(() => {
    return getDays(baseCalendarDate, dayStep, appLang);
  }, [dayStep, baseCalendarDate, appLang]);

  // Красивый текст периода между стрелочками
  const periodLabel = useMemo(() => {
    if (!days || days.length === 0) return '';
    const first = days[0].label;
    const last = days[days.length - 1].label;
    return days.length > 1 ? `${first} — ${last}` : first;
  }, [days]);

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
      {/* Левая часть: Кнопка "Сьогодні" + Блок навигации периодом со стрелочками */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Кнопка сброса на сегодняшний день */}
        <button
          onClick={onToday}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors shadow-sm"
          type="button"
        >
          Сьогодні
        </button>

        {/* Единый блок: Стрелка назад -> Текст периода -> Стрелка вперед */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1 gap-2">
          <button
            onClick={() => {
              const newDate = format(addDays(parseISO(baseCalendarDate), -dayStep), 'yyyy-MM-dd');
              dispatch(setCalendarDateAction(newDate));
            }}
            className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors shadow-none hover:shadow-sm"
            title="Попередній період"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>

          <div className="flex items-center gap-1.5 px-2">
            <span className="material-symbols-outlined text-primary text-[18px]">
              calendar_month
            </span>
            <span className="font-bold text-xs text-slate-900 tracking-tight whitespace-nowrap">
              {periodLabel}
            </span>
          </div>

          <button
            onClick={() => {
              const newDate = format(addDays(parseISO(baseCalendarDate), dayStep), 'yyyy-MM-dd');
              dispatch(setCalendarDateAction(newDate));
            }}
            className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors shadow-none hover:shadow-sm"
            title="Наступний період"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
        {/* Центральная часть: Фильтры (Кабинеты, Врачи, Статусы) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Cabinet Filter */}
          <div className="relative">
            <select
              onChange={(e) => console.log(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium pl-3 pr-8 py-2 rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
            >
              <option value="">Всі кабінети</option>
              {cabinetsData?.map((cabinet) => (
                <option key={cabinet.id} value={cabinet.id}>
                  {cabinet.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-slate-400 text-[18px]">
              expand_more
            </span>
          </div>

          {/* Doctor Filter */}
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium pl-3 pr-8 py-2 rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer">
              <option value="">Всі лікарі ({customerData?.length || 0})</option>
              {customerData?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-slate-400 text-[18px]">
              expand_more
            </span>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium pl-3 pr-8 py-2 rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer">
              <option value="">Всі статуси</option>
              {statusesData &&
                statusesData.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-slate-400 text-[18px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Правая часть: Переключатель вида (День / 3 дня) и кнопка создания */}
      <div className="flex items-center gap-3">
        <div className="inline-flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => dispatch(setTypeViewAction('day'))}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors whitespace-nowrap ${viewMode === 'day' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            type="button"
          >
            День
          </button>
          <button
            onClick={() => dispatch(setTypeViewAction('3days'))}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${viewMode === '3days' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            type="button"
          >
            3 дні
          </button>
        </div>

        <button
          onClick={onNewAppointment}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-[#0d9488] text-white hover:bg-[#0d9488] hover:text-slate-900 font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span className="whitespace-nowrap">Новий запис</span>
        </button>
      </div>
    </div>
  );
};
