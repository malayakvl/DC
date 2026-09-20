import React, { useState } from 'react';

export const InventoryControlPanel = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [supplier, setSupplier] = useState('all');
  const [stockStatus, setStockStatus] = useState('all');

  const tabs = [
    { id: 'all', label: 'Всі матеріали', count: 142 },
    { id: 'low', label: 'Закінчуються', count: 4, badgeBg: 'bg-rose-100 text-rose-700 font-bold' },
    { id: 'in_stock', label: 'В наявності', count: 128 },
    { id: 'on_order', label: 'Замовлені в дорозі', count: 10 },
    { id: 'expiry', label: 'Партії та терміни придатності' },
  ];

  return (
    <div className="p-3 bg-slate-50">
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
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 text-[11px] rounded-full transition-colors ${
                        isActive
                          ? 'bg-emerald-800 text-white'
                          : tab.badgeBg || 'text-slate-600 bg-slate-100'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Перемикач Виду (Таблиця / Сітка карточок) */}
          <div className="flex items-center p-1 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <svg
                className="w-4 h-4 text-emerald-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <span>Таблиця</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <svg
                className="w-4 h-4 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>Сітка карток</span>
            </button>
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs font-medium bg-indigo-50/40 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:outline-none text-slate-700 cursor-pointer transition-all"
            >
              <option value="all">Всі категорії (6)</option>
              <option value="therapy">Терапія</option>
              <option value="surgery">Хірургія</option>
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

          {/* Селект: Постачальники */}
          <div className="relative min-w-[170px]">
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs font-medium bg-indigo-50/40 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:outline-none text-slate-700 cursor-pointer transition-all"
            >
              <option value="all">Всі постачальники (18)</option>
              <option value="dentsply">Dentsply Sirona</option>
              <option value="gc">GC Europe</option>
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

          {/* Селект: Статус залишку */}
          <div className="relative min-w-[170px]">
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs font-medium bg-indigo-50/40 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:outline-none text-slate-700 cursor-pointer transition-all"
            >
              <option value="all">Статус залишку: Всі</option>
              <option value="ok">В нормі</option>
              <option value="low">Критичний</option>
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
