import React, { useState } from 'react';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import InputSelect from '../../../Components/Form/InputSelect';

export const Filters = ({ categories, msg, totalItems, supplierData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [stockStatus, setStockStatus] = useState('all');

  const tabs = [
    { id: 'all', label: 'Всі матеріали', count: 142 },
    {
      id: 'low',
      label: 'Закінчуються',
      count: 4,
      isSpecial: true, // Флаг для особого стиля (как Боржники)
    },
    { id: 'in_stock', label: 'В наявності', count: 128 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 mb-4">
      {/* ВЕРХНІЙ РЯД: Таби та Лічильники */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
        {/* Пошук з ⌘K */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за назвою, брендом, категорією..."
            className="w-full pl-10 pr-16 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-600 border border-slate-300">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Селект: Категорії */}
        <div className="lg:col-span-2">
          <InputTreeSelect
            name={'category_id'}
            defaultTips={'Всі категорії'}
            className="filter-tree"
            options={categories}
            selectedLabelClass={'filter-label-selected'}
            required
            label={''}
          />
        </div>

        {/* Селект: Постачальники */}
        <div className="lg:col-span-2">
          <InputSelect
            name={'supplier_id'}
            defaultTips={'Всі постачальники'}
            options={supplierData}
            selectedLabelClass={'filter-label-selected'}
            className="filter-select"
          />
        </div>

        {/* Селект: Статус залишку */}
        <div className="lg:col-span-2">
          <div className="relative">
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              className="w-full appearance-none py-2 pl-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
            >
              <option value="all">{msg.get('material.filter_status_all')}</option>
              <option value="ok">{msg.get('material.filter_status_ok')}</option>
              <option value="low">{msg.get('material.filter_status_low')}</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 top-2.5 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

      </div>
      {/* НИЖНІЙ РЯД: Пошук + Селекти Фільтрів */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            // Если это специальный таб «Закінчуються»
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
                  <span className={`w-1.5 h-1.5  ${isActive ? 'bg-white' : 'bg-rose-500'}`}></span>
                  {tab.label} ({tab.count})
                </button>
              );
            }

            // Обычные табы
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
                <span
                  className={`px-1.5 py-0.2 rounded-full transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Знайдено: <strong className="text-slate-800">5 пацієнтів</strong>
          </span>
          <button
            type="button"
            className="text-xs font-semibold text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">restart_alt</span>Очистити
            фільтри
          </button>
        </div>
      </div>
    </div>
  );
};
