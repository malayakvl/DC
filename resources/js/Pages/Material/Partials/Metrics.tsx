import React from 'react';

// Пропсы для первого блока (Стоимость)
interface TotalValueCardProps {
  title: string;
  amount: string;
  currency: string;
  percentage: string;
  periodText: string;
}

// Пропсы для второго блока (Дефицит)
interface DeficitCardProps {
  title: string;
  count: number;
  unit: string;
  badgeText: string;
}

export const MaterialMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4 bg-slate-50">
      {/* 1. Блок: Загальна вартість складу */}
      <div className="flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[180px]">
        <div>
          {/* Шапка карточки */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Загальна вартість складу
            </span>
            <div className="flex items-center justify-center w-11 h-11 bg-indigo-50/70 text-emerald-700 rounded-2xl">
              {/* Иконка кошелька */}
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Главное число */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">482 450</span>
            <span className="text-xl font-medium text-slate-700">₴</span>
          </div>
        </div>

        {/* Футер карточки (процент и мини-график) */}
        <div className="flex items-center justify-between pt-4 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            {/* Стрелочка вверх */}
            <svg
              className="w-4 h-4"
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
            <span className="font-normal text-slate-500 ml-0.5">за місяць</span>
          </div>

          {/* Мини-график (SVG Sparkline) */}
          <div className="w-24 h-8">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 25 Q 30 20 50 18 T 100 5 L 100 30 L 0 30 Z" fill="url(#chartGradient)" />
              <path
                d="M 0 25 Q 30 20 50 18 T 100 5"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Блок: Дефіцит / Критичні залишки */}
      <div className="flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[180px]">
        <div>
          {/* Шапка карточки */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
              Дефіцит / Критичні залишки
            </span>
            <div className="flex items-center justify-center w-11 h-11 bg-rose-100/70 text-rose-600 rounded-2xl">
              {/* Иконка предупреждения */}
              <svg
                className="w-5 h-5"
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

          {/* Главное число */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-rose-700 tracking-tight">4</span>
            <span className="text-lg font-medium text-slate-700">позиції</span>
          </div>
        </div>

        {/* Пилл-бейдж снизу */}
        <div className="pt-4 mt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-100/60 text-rose-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span>Потребують термінового замовлення</span>
          </div>
        </div>
      </div>
    </div>
  );
};
