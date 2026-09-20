import React from 'react';

export const ClinicInventoryStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 p-3 bg-slate-50">
      {/* 1. Вартість складу */}
      <div className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[135px]">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Вартість складу
            </span>
            <div className="flex items-center justify-center w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">482 450</span>
            <span className="text-base font-medium text-slate-700">₴</span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-slate-100/70">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span>+4.2%</span>
            <span className="font-normal text-slate-400">до мин. міс.</span>
          </div>
        </div>
      </div>

      {/* 2. Дефіцит матеріалів */}
      <div className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[135px]">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">
              Дефіцит матеріалів
            </span>
            <div className="flex items-center justify-center w-9 h-9 bg-rose-100/70 text-rose-600 rounded-xl shrink-0">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-rose-700 tracking-tight">4</span>
            <span className="text-sm font-medium text-slate-600">позиції</span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-slate-100/70">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-rose-100/60 text-rose-800 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            <span>Потребують закупівлі</span>
          </div>
        </div>
      </div>

      {/* 3. Термін придатності */}
      <div className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[135px]">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
              Термін придатності
            </span>
            <div className="flex items-center justify-center w-9 h-9 bg-amber-100/70 text-amber-600 rounded-xl shrink-0">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-amber-600 tracking-tight">3</span>
            <span className="text-sm font-medium text-slate-600">позиції</span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-slate-100/70">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-amber-100/60 text-amber-900 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Спливає &lt; 30 днів</span>
          </div>
        </div>
      </div>

      {/* 4. Поставки в дорозі */}
      <div className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[135px]">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Поставки в дорозі
            </span>
            <div className="flex items-center justify-center w-9 h-9 bg-blue-50 text-blue-600 rounded-xl shrink-0">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">2</span>
            <span className="text-sm font-medium text-slate-500">доставки</span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-slate-100/70">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium truncate">Dentsply Sirona</span>
            <span className="text-blue-600 font-semibold shrink-0">Сьогодні, 14:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
