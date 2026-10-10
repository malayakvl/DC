import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import { router } from '@inertiajs/react';

interface TabOption {
  id: string;
  label: string;
  count?: number;
  variant?: 'default' | 'danger' | 'success';
}

interface InvoicesFiltersProps {
  filters?: {
    search?: string;
    ttn?: string;
    status?: string;
    supplier_id?: string;
    store_id?: string;
    customer_id?: string;
    payment_status?: string;
    date_from?: string;
    date_to?: string;
  };
  producerData: any[];
  storeData: any[];
  customerData: any[];
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  totalCount?: number;
}

export default function Filters({
  filters = {},
  producerData = [],
  storeData = [],
  customerData = [],
  totalCount = 0,
}: InvoicesFiltersProps) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngInvoiceIncoming,
    locale: appLang,
  });

  // Локальный стейт для полей формы, чтобы они не дергали роутер при каждом изменении
  // Убираем useEffect! Инициализируем локальный стейт один раз при маунте
  // или берем значения из прилетевших пропсов
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    date_from: filters.date_from || '',
    date_to: filters.date_to || '',
    payment_status: filters.payment_status || '',
    supplier_id: filters.supplier_id || '',
    store_id: filters.store_id || '',
    customer_id: filters.customer_id || '',
  });
  // Синхронизируем, если URL/пропсы изменились извне (например, при сбросе)

  const handleChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyClick = () => {
    // Очищаем объект от пустых значений, чтобы URL оставался чистым
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
    // 1. Сбрасываем локальный стейт формы
    setLocalFilters({
      search: '',
      date_from: '',
      date_to: '',
      payment_status: '',
      supplier_id: '',
      store_id: '',
      customer_id: '',
    });

    // 2. Отправляем пустой запрос на роут без параметров, очищая URL
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
      {/* Верхній рядок: Пошук + Селекти + Дати */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {/* 1. Пошук (Номер, ТТН) */}
        <div className="relative col-span-1 sm:col-span-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input
            type="text"
            value={localFilters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder={msg.get('invoice_incoming.tip_filter') || 'Пошук за номером, ТТН...'}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        {/* 5. Період дат (З - По) */}
        <div className="flex items-center gap-1.5">
          <input
            type="date"
            value={localFilters.date_from || ''}
            onChange={(e) => handleChange('date_from', e.target.value)}
            className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 text-slate-700"
          />
          <span className="text-slate-400">—</span>
          <input
            type="date"
            value={localFilters.date_to || ''}
            onChange={(e) => handleChange('date_to', e.target.value)}
            className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 text-slate-700"
          />
        </div>

        {/* 2.1. Статус оплати */}
        <div>
          <select
            value={localFilters.payment_status || ''}
            onChange={(e) => handleChange('payment_status', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">
              {msg.get('invoice_incoming.payment_status_filter') || 'Статус оплати'}
            </option>
            <option value="paid">{msg.get('invoice_incoming.payed_filter') || 'Сплачено'}</option>
            <option value="unpaid">
              {msg.get('invoice_incoming.not_payed_filter') || 'Не сплачено'}
            </option>
            <option value="partially">
              {msg.get('invoice_incoming.part_payed_filter') || 'Частково'}
            </option>
          </select>
        </div>

        {/* 2. Постачальник */}
        <div>
          <select
            value={localFilters.supplier_id || ''}
            onChange={(e) => handleChange('supplier_id', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">{msg.get('invoice_incoming.producer') || 'Всі постачальники'}</option>
            {producerData.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.title || item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Склад */}
        <div>
          <select
            value={localFilters.store_id || ''}
            onChange={(e) => handleChange('store_id', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">{msg.get('invoice_incoming.store') || 'Всі склади'}</option>
            {storeData.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.title || item.name}
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
            <option value="">{msg.get('invoice_incoming.person') || 'Всі особи'}</option>
            {customerData.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name || `${item.first_name || ''} ${item.last_name || ''}`.trim()}
              </option>
            ))}
          </select>
        </div>

        {/* Кнопка применения фильтров */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleApplyClick}
            className="filter-btn"
          >
            <span className="material-symbols-outlined text-[16px]">filter_alt</span>
            Застосувати
          </button>
        </div>
      </div>

      {/* Нижній рядок: Чіпси-статуси + Лічильник + Скидання */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
        {/* Чіпси статусів */}
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
