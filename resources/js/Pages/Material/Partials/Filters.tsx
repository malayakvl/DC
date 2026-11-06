import React, { useState } from 'react';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import { router } from '@inertiajs/react';

export const Filters = ({
  filters = {
    search: '',
    category_id: null,
    supplier_id: null,
  },
  categories,
  msg,
  totalItems,
  supplierData,
}: {
  filters: {
    search: string;
    category_id: number | null;
    supplier_id: number | null;
  };
  categories: any;
  msg: any;
  totalItems: number;
  supplierData: any;
}) => {
  const [activeTab, setActiveTab] = useState('all');

  // Локальный стейт для всех фильтров
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    category_id: filters.category_id || '',
    supplier_id: filters.supplier_id || '',
  });

  const tabs = [
    { id: 'all', label: msg.get('material.all_filter') },
    {
      id: 'low',
      label: msg.get('material.low_filter'),
      isSpecial: true,
    },
    { id: 'in_stock', label: msg.get('material.in_storck_filter') },
  ];

  // Универсальный обработчик изменений
  const handleChange = (key: string, value: any) => {
    const actualValue =
      value && typeof value === 'object' && 'target' in value ? value.target.value : value;

    // Якщо це ID постачальника чи категорії, спробуємо перевести в число (або залиште рядок, залежно від ваших `supplierData`)
    const finalValue =
      (key === 'supplier_id' || key === 'category_id') && actualValue !== ''
        ? Number(actualValue)
        : actualValue;

    setLocalFilters((prev) => ({
      ...prev,
      [key]: finalValue,
    }));
  };
  const handleApplyClick = () => {
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

  const handleResetClick = () => {
    setLocalFilters({
      search: '',
      category_id: '',
      supplier_id: '',
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
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 mb-4">
      {/* ВЕРХНІЙ РЯД: Таби та Лічильники */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
        {/* Пошук з ⌘K */}
        <div className="lg:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={localFilters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Пошук за назвою, брендом, категорією..."
            className="w-full pl-10 pr-16 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-600 border border-slate-300">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Селект: Категорії (передаємо value / values та onChange) */}
        <div className="lg:col-span-3">
          <InputTreeSelect
            name="category_id"
            defaultTips="Всі категорії"
            className="filter-tree"
            options={categories}
            selectedLabelClass="filter-label-selected"
            label=""
            values={localFilters.category_id}
            onChange={(val: any) => handleChange('category_id', val)}
          />
        </div>

        {/* Селект: Постачальники (передаємо value та onChange) */}
        <div className="lg:col-span-3">
          <select
            value={localFilters.supplier_id || ''}
            onChange={(e) => handleChange('supplier_id', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer text-slate-700"
          >
            <option value="">{msg.get('material.all_suppliers') || 'Всі постачальники'}</option>
            {supplierData.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.title || item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-3">
          <button type="button" onClick={handleApplyClick} className="filter-btn">
            <span className="material-symbols-outlined text-[16px]">filter_alt</span>
            {msg.get('material.apply')}
          </button>
        </div>
      </div>

      {/* НИЖНІЙ РЯД */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            if (tab.isSpecial) {
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 font-semibold ${
                    isActive
                      ? 'bg-rose-600 text-white font-bold shadow-sm'
                      : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 ${isActive ? 'bg-white' : 'bg-rose-500'}`}></span>
                  {tab.label}
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition ${
                  isActive
                    ? 'bg-teal-600 text-white font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            {msg.get('material.find_filter')}:{' '}
            <strong className="text-slate-800">
              {totalItems} {msg.get('material.total_results_filter')}
            </strong>
          </span>
          <button
            type="button"
            onClick={handleResetClick}
            className="text-xs font-semibold text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">restart_alt</span>
            {msg.get('material.clear_filters')}
          </button>
        </div>
      </div>
    </div>
  );
};
