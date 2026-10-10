import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import lngAct from '../../../Lang/Act/translation';
import { router } from '@inertiajs/react';

interface TabOption {
  id: string;
  label: string;
  count?: number;
}

interface ActFiltersProps {
  filters?: {
    search?: string;
    filterDateFrom?: string;
    filterDateTo?: string;
    filterAmount?: string;
    status?: string;
  };
  tabs?: TabOption[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  totalCount?: number;
}

export default function Filters({
  filters = {},
  tabs = [
    { id: 'all', label: 'Всі акти', count: 0 },
    { id: 'completed', label: 'Проведені', count: 0 },
    { id: 'uncompleted', label: 'Не проведені', count: 0 },
  ],
  activeTab = 'all',
  onTabChange = () => {},
  totalCount = 0,
}: ActFiltersProps) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: { ...lngPatient, ...lngAct },
    locale: appLang,
  });

  // Локальный стейт для полей формы
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    filterDateFrom: filters.filterDateFrom || '',
    filterDateTo: filters.filterDateTo || '',
    filterAmount: filters.filterAmount || '',
    status: filters.status || '',
  });

  const handleChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyClick = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(localFilters).filter(
        ([_, value]) => value !== '' && value !== null && value !== undefined
      )
    );

    router.get(window.location.pathname, cleanedFilters, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const handleResetClick = () => {
    setLocalFilters({
      search: '',
      filterDateFrom: '',
      filterDateTo: '',
      filterAmount: '',
      status: '',
    });

    router.get(
      window.location.pathname,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
  };

  return (
    <div className="p-4 mb-6 rounded-2xl bg-white shadow-sm border border-slate-100 space-y-4">
      {/* Верхній рядок: Пошук + Дати + Статус (дропдаун) + Кнопка */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center">
        {/* 1. Пошук */}
        <div className="relative md:col-span-3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input
            type="text"
            value={localFilters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Пошук..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        {/* 2. Період дат (З - По) */}
        <div className="flex items-center gap-1.5 md:col-span-4">
          <input
            type="date"
            value={localFilters.filterDateFrom}
            onChange={(e) => handleChange('filterDateFrom', e.target.value)}
            className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 text-slate-700"
          />
          <span className="text-slate-400">—</span>
          <input
            type="date"
            value={localFilters.filterDateTo}
            onChange={(e) => handleChange('filterDateTo', e.target.value)}
            className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 text-slate-700"
          />
        </div>

        {/* 3. Статус (Дропдаун замість суми) */}
        <div className="md:col-span-3">
          <select
            value={localFilters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">Всі статуси</option>
            <option value="completed">Проведені</option>
            <option value="uncompleted">Не проведені</option>
          </select>
        </div>

        {/* 4. Кнопка застосування */}
        <div className="md:col-span-2">
          <button type="button" onClick={handleApplyClick} className="filter-btn">
            <span className="material-symbols-outlined text-[16px]">filter_alt</span>
            {msg.get('act.filter') || 'Застосувати'}
          </button>
        </div>
      </div>

      {/* Нижній рядок: Чіпси-таби + Лічильник + Скидання */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
        {/* Права частина: Знайдено + Очистити */}
        <div className="flex items-center gap-4 text-xs ml-auto">
          <span className="text-slate-500">
            {msg.get('invoice_incoming.found_filter')}:{' '}
            <strong className="text-slate-800">{totalCount}</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              handleResetClick();
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            {msg.get('invoice_incoming.clear_filter') || 'Очистити'}
          </button>
        </div>
      </div>
    </div>
  );
}
