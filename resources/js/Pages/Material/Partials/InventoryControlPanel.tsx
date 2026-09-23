import React, { useState } from 'react';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import InputSelect from '../../../Components/Form/InputSelect';

export const InventoryControlPanel = ({ categories, msg, totalItems, supplierData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [stockStatus, setStockStatus] = useState('all');

  const tabs = [
    { id: 'all', label: 'Всі матеріали', count: 142 },
    { id: 'low', label: 'Закінчуються', count: 4, badgeBg: 'bg-rose-100 text-rose-700 font-bold' },
    { id: 'in_stock', label: 'В наявності', count: 128 },
  ];

  return (
    <div className="w-full mb-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        {/* ВЕРХНІЙ РЯД: Пошук + Селекти Фільтрів (как у пациентов) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Пошук */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук за назвою, брендом, категорією..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
          </div>

          {/* Селект: Категорії */}
          <div className="lg:col-span-3">
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
          <div className="lg:col-span-2 relative">
            <div className="relative">
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="w-full appearance-none py-2 pl-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
              >
                <option value="all">
                  {msg?.get('material.filter_status_all') || 'Всі статуси'}
                </option>
                <option value="ok">{msg?.get('material.filter_status_ok') || 'В наявності'}</option>
                <option value="low">
                  {msg?.get('material.filter_status_low') || 'Закінчуються'}
                </option>
              </select>
              <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 top-2.5 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* НИЖНІЙ РЯД: Таби-сегментація та Кнопка Скинути (как у пациентов снизу) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Таби статусів / сегментація */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {totalItems !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] rounded-full transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : tab.badgeBg || 'text-slate-600 bg-slate-200/60'
                      }`}
                    >
                      {tab.count || totalItems}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Лічильник та Кнопка очищення */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Знайдено: <strong className="text-slate-800">142 матеріали</strong>
            </span>
            <button
              onClick={() => {
                setSearch('');
                setStockStatus('all');
                setActiveTab('all');
              }}
              className="font-semibold text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              <span>Очистити фільтри</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
