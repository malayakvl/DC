import React from 'react';

interface SchedulerToolbarProps {
  currentDate?: string;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  onToday?: () => void;
  onNewAppointment?: () => void;
  viewMode?: 'day' | '3days' | 'week';
  onViewModeChange?: (mode: 'day' | '3days' | 'week') => void;
}

export const SchedulerToolbar: React.FC<SchedulerToolbarProps> = ({
  currentDate = 'Субота, 19 вересня 2026',
  onPrevDay,
  onNextDay,
  onToday,
  onNewAppointment,
  viewMode = 'day',
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
      {/* Date Navigation & Quick Picker */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center bg-slate-100 rounded-lg p-1">
          <button
            onClick={onPrevDay}
            className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors shadow-none hover:shadow-sm"
            title="Попередній день"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            onClick={onToday}
            className="px-3 py-1 bg-white text-primary font-bold text-xs rounded shadow-sm"
            type="button"
          >
            Сьогодні
          </button>
          <button
            onClick={onNextDay}
            className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors shadow-none hover:shadow-sm"
            title="Наступний день"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
          <span className="material-symbols-outlined text-primary text-[22px] ml-1">
            calendar_month
          </span>
          <span className="font-bold text-base text-slate-900 tracking-tight">{currentDate}</span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Зміна А (08:00 – 18:00)
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Cabinet Filter */}
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium pl-3 pr-8 py-2 rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer">
            <option>Всі кабінети (Каб. 1 & 2)</option>
            <option>Кабінет 1 (Терапія / Хірургія)</option>
            <option>Кабінет 2 (Ортодонтія / Дитяча)</option>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-slate-400 text-[18px]">
            expand_more
          </span>
        </div>

        {/* Doctor Filter */}
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium pl-3 pr-8 py-2 rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer">
            <option>Всі лікарі на зміні (11)</option>
            <option>Д-р Гребенченко С.</option>
            <option>Д-р Ейхгорн С.</option>
            <option>Д-р Калита С.</option>
            <option>Д-р Радчук Н.</option>
            <option>Д-р Солтис В.</option>
            <option>Д-р Солтис П.</option>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-slate-400 text-[18px]">
            expand_more
          </span>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium pl-3 pr-8 py-2 rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer">
            <option>Всі статуси</option>
            <option>🟢 На прийомі (3)</option>
            <option>🔵 Підтверджено (5)</option>
            <option>🟡 Очікує (1)</option>
            <option>⚪ Завершено (2)</option>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-slate-400 text-[18px]">
            expand_more
          </span>
        </div>
      </div>

      {/* Mode Selector & Action */}
      <div className="flex items-center gap-3">
        {/* Scale Toggle */}
        <div className="inline-flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => onViewModeChange?.('day')}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors whitespace-nowrap ${viewMode === 'day' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            type="button"
          >
            День
          </button>
          <button
            onClick={() => onViewModeChange?.('3days')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${viewMode === '3days' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            type="button"
          >
            3 дні
          </button>
          <button
            onClick={() => onViewModeChange?.('week')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${viewMode === 'week' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            type="button"
          >
            Тиждень
          </button>
        </div>

        {/* Primary Action CTA */}
        <button
          onClick={onNewAppointment}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span className="whitespace-nowrap">+ Новий запис</span>
        </button>
      </div>
    </div>
  );
};
