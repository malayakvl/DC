import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { patientFiltersSelector } from '@/Redux/Patient/selectors';
import { setFilters, clearFilters } from '@/Redux/Patient';
import { useForm } from '@inertiajs/react';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { router } from '@inertiajs/react'; // <--- убедись, что импорт есть

export default function Filters({ listData = [], customerData }) {
  const dispatch = useAppDispatch();
  const filtersData = useSelector(patientFiltersSelector);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const searchInputRef = useRef(null);

  const handleFieldChange = (key, value) => {
    const updated = { ...filtersData, [key]: value };
    dispatch(setFilters(updated));
    // Если это клик по сегменту или селекту — отправляем сразу!
    // Для поля поиска ('search') мы ждем Enter, поэтому для него отправку здесь не делаем
    if (key !== 'search') {
      submitFilters(updated);
    }
  };

  const submitFilters = (newFilters) => {
    router.get(route('patient.index'), newFilters, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitFilters(filtersData);
    }
  };

  // Обработка глобального нажатия Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Проверяем Cmd+K (Mac) или Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        e.stopPropagation(); // Останавливаем всплытие, чтобы браузер не лез в адресную строку
        searchInputRef.current?.focus();
      }
    };

    // Вешаем на capture-фазу (true), чтобы перехватить событие ДО браузера
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  const handleClear = () => {
    // 1. Очищаем стейт в Redux
    dispatch(clearFilters());

    // 2. Делаем запрос на чистый роут без GET-параметров
    router.get(
      route('patient.index'),
      {}, // Пустой объект сбросит все параметры в URL (?segment=... и т.д.)
      {
        preserveState: true,
        preserveScroll: true,
        replace: true, // Заменяем текущую запись в истории, чтобы юзер не кликал "Назад" по всем старым фильтрам
      }
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
      {/* Search Input + Selectors Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
        {/* Omnisearch input */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            ref={searchInputRef}
            value={filtersData.search || ''}
            onChange={(e) => handleFieldChange('search', e.target.value)}
            onKeyDown={handleKeyDownSearch}
            className="w-full pl-10 pr-16 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            placeholder={msg.get('patient.gender_search_tips')}
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-600 border border-slate-300">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Filter Dropdown 1: Лікар */}
        <div className="lg:col-span-2">
          <div className="relative">
            <select
              value={filtersData.doctor || 'all'}
              onChange={(e) => handleFieldChange('doctor', e.target.value)}
              className="w-full appearance-none py-2 pl-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
            >
              <option value="all">{msg.get('patient.all_doctors')}</option>
              {customerData?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 top-2.5 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Filter Dropdown 3: Період */}
        <div className="lg:col-span-2">
          <div className="relative">
            <select
              value={filtersData.period || 'all_time'}
              onChange={(e) => handleFieldChange('period', e.target.value)}
              className="w-full appearance-none py-2 pl-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
            >
              <option value="all_time">Період: Весь час</option>
              <option value="today">Сьогодні</option>
              <option value="month">Цей місяць</option>
              <option value="year">2026 рік</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 top-2.5 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
        {/* Кнопка Скинути фільтри */}
      </div>

      {/* Quick Segmentation Pills & Reset Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => handleFieldChange('segment', 'all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filtersData.segment === 'all' || !filtersData.segment
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold'
            }`}
          >
            {msg.get('patient.all_patients')} ({listData.total})
          </button>

          <button
            type="button"
            onClick={() => handleFieldChange('segment', 'my')}
            className={`px-3 py-1.5 rounded-lg text-xs transition ${
              filtersData.segment === 'my'
                ? 'bg-teal-600 text-white font-bold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold'
            }`}
          >
            {msg.get('patient.my_patients')} (412)
          </button>

          <button
            type="button"
            onClick={() => handleFieldChange('segment', 'open_plan')}
            className={`px-3 py-1.5 rounded-lg text-xs transition hidden ${
              filtersData.segment === 'open_plan'
                ? 'bg-teal-600 text-white font-bold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold'
            }`}
          >
            З відкритим планом (89)
          </button>

          <button
            type="button"
            onClick={() => handleFieldChange('segment', 'debtors')}
            className={`px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 ${
              filtersData.segment === 'debtors'
                ? 'bg-rose-600 text-white font-bold shadow-sm'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-semibold'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${filtersData.segment === 'debtors' ? 'bg-white' : 'bg-rose-500'}`}
            ></span>
            {msg.get('patient.credit_patients')}
          </button>

          <button
            type="button"
            onClick={() => handleFieldChange('segment', 'no_visit')}
            className={`px-3 py-1.5 rounded-lg text-xs transition hidden ${
              filtersData.segment === 'no_visit'
                ? 'bg-teal-600 text-white font-bold shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold'
            }`}
          >
            Без візиту &gt; 6 міс (145)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            {msg.get('patient.found')}:{' '}
            <strong className="text-slate-800">
              {listData.total} {msg.get('patient.found_patients')}
            </strong>
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-semibold text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">restart_alt</span>
            {msg.get('patient.clear_filter')}
          </button>
        </div>
      </div>
    </div>
  );
}
