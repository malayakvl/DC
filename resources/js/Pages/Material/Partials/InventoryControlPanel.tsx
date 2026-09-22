import React, { useState } from 'react';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import InputSelect from '../../../Components/Form/InputSelect';

export const InventoryControlPanel = ({ categories, msg, totalItems, supplierData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  //   const [category, setCategory] = useState('all');
  //   const [supplier, setSupplier] = useState('all');
  const [stockStatus, setStockStatus] = useState('all');

  const tabs = [
    { id: 'all', label: 'Всі матеріали', count: 142 },
    { id: 'low', label: 'Закінчуються', count: 4, badgeBg: 'bg-rose-100 text-rose-700 font-bold' },
    { id: 'in_stock', label: 'В наявності', count: 128 },
  ];

  return (
    <div className="p-3 bg-slate-50 mb-4">
      <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
        {/* ВЕРХНІЙ РЯД: Таби та Перемикач Таблиця/Сітка */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-50">
          {/* Таби статусів */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {totalItems !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 text-[11px] rounded-full transition-colors ${
                        isActive
                          ? 'bg-white text-emerald-800'
                          : tab.badgeBg || 'text-slate-600 bg-slate-100'
                      }`}
                    >
                      {totalItems}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* НИЖНІЙ РЯД: Пошук + Селекти Фільтрів */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Пошук з ⌘K */}
          <div className="relative flex-1 min-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук за назвою, брендом, категорією або штрихкодом..."
              className="w-full pl-10 pr-12 py-2 text-xs bg-indigo-50/40 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 text-slate-800 placeholder-slate-400 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-200/60 rounded border border-slate-300/50">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Селект: Категорії */}
          <div className="relative min-w-[160px]">
            <div className="md:col-span-2 flex flex-col">
              {/* Контейнер-обертка, который имитирует идеальный инпут */}
              <div>
                <InputTreeSelect
                  name={'category_id'}
                  defaultTips={'Всі категорії'}
                  className="filter-tree"
                  options={categories}
                  selectedLabelClass={'filter-label-selected'}
                  required
                  label={''}
                  // Передаем классы прямо в className компонента,
                  // они применятся на его внутренний блок-кнопку
                />
              </div>
            </div>
          </div>

          {/* Селект: Постачальники */}
          <div className="relative min-w-[170px]">
            <InputSelect
              name={'supplier_id'}
              defaultTips={'Всі постачальники'}
              options={supplierData}
              selectedLabelClass={'filter-label-selected'}
              className="filter-select"
            />
          </div>

          {/* Селект: Статус залишку */}
          <div className="relative min-w-[170px]">
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs font-medium bg-indigo-50/40 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:outline-none text-slate-700 cursor-pointer transition-all"
            >
              <option value="all">{msg.get('material.filter_status_all')}</option>
              <option value="ok">{msg.get('material.filter_status_ok')}</option>
              <option value="low">{msg.get('material.filter_status_low')}</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Кнопка Скинути фільтри */}
          <button className="p-2 text-slate-500 bg-indigo-50/40 hover:bg-slate-100 hover:text-slate-800 rounded-xl transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
