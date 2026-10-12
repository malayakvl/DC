import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMoneyIn from '@/Lang/MoneyIn/translation';

interface MoneyInFiltersProps {
  filters?: {
    search?: string;
    status?: string;
    account_id?: string;
    customer_id?: string;
    date_from?: string;
    date_to?: string;
  };
  paymentMethods?: any[];
  customerData?: any[];
  statusData?: any[];
  totalCount?: number;
}

export default function Filters({
  filters = {},
  paymentMethods = [],
  customerData = [],
  statusData = [],
  totalCount = 0,
}: MoneyInFiltersProps) {
  // Локальный стейт фильтров
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    date_from: filters.date_from || '',
    date_to: filters.date_to || '',
    status: filters.status || '',
    account_id: filters.account_id || '',
    customer_id: filters.customer_id || '',
  });
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMoneyIn,
    locale: appLang,
  });

  const handleApplyClick = () => {
    // Очищаем объект от пустых значений для чистого URL
    const cleanedFilters = Object.fromEntries(
      Object.entries(localFilters).filter(
        ([, value]) => value !== '' && value !== null && value !== undefined
      )
    );

    router.get(window.location.pathname, cleanedFilters, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const handleChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetClick = () => {
    const resetState = {
      search: '',
      date_from: '',
      date_to: '',
      status: '',
      account_id: '',
      customer_id: '',
    };
    setLocalFilters(resetState);

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
      {/* Сетка фильтров: Поиск + Селекты + Даты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. Пошук (Номер документа) */}
        <div className="relative col-span-1 sm:col-span-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input
            type="text"
            value={localFilters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder={msg.get('money_in.tip_filter') || 'Пошук за номером, ТТН...'}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* 2. Дропдаун Статуса транзакции */}
        <div>
          <select
            value={localFilters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">Всі статуси</option>
            {statusData && statusData.length > 0 ? (
              statusData.map((st: any) => (
                <option key={st.id} value={st.id}>
                  {msg.get('money_in.' + st.name.toLowerCase())}
                </option>
              ))
            ) : (
              <>
                <option value="processed">Проведені</option>
                <option value="draft">Чернетки</option>
              </>
            )}
          </select>
        </div>

        {/* 3. Рахунок / Каса */}
        <div>
          <select
            value={localFilters.account_id}
            onChange={(e) => handleChange('account_id', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">{msg.get('money_in.filter_all_account')}</option>
            {paymentMethods.map((item: any) => (
              <option key={item.id} value={String(item.id)}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Відповідальна особа */}
        <div>
          <select
            value={localFilters.customer_id || ''}
            onChange={(e) => handleChange('customer_id', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">{msg.get('money_in.person') || 'Всі особи'}</option>
            {customerData.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name || `${item.first_name || ''} ${item.last_name || ''}`.trim()}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Період дат (З — По) */}
        <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2 lg:col-span-2">
          <input
            type="date"
            value={localFilters.date_from}
            onChange={(e) => handleChange('date_from', e.target.value)}
            className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          />
          <span className="text-slate-400">—</span>
          <input
            type="date"
            value={localFilters.date_to}
            onChange={(e) => handleChange('date_to', e.target.value)}
            className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          />
        </div>
        {/* Кнопка применения фильтров */}
        <div className="flex items-end">
          <button type="button" onClick={handleApplyClick} className="filter-btn">
            <span className="material-symbols-outlined text-[16px]">filter_alt</span>
            {msg.get('money_in.apply')}
          </button>
        </div>
      </div>

      {/* Нижняя строчка: Счетчик результатов + Сброс */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
        {/* Права частина: Знайдено + Очистити */}
        <div className="flex items-center gap-4 text-xs ml-auto">
          <span className="text-slate-500">
            {msg.get('money_in.found_filter')}:{' '}
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
            {msg.get('money_in.clear_filter') || 'Очистити'}
          </button>
        </div>
      </div>
    </div>
  );
}
