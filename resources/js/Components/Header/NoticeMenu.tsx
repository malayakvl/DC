import React, { useState, useRef, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function NoticeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const { auth } = usePage().props as unknown as {
    auth: {
      user: any;
      can: any;
      role: string[] | any[];
    };
  };

  // Закриття дропдауну при кліку зовні
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`inline-block text-left notice-block ${auth.user?.current_filial ? 'filial-notice' : ''}`}
      ref={menuRef}
    >
      {/* Кнопка сповіщень */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Сповіщення"
        className="relative flex items-center justify-center w-12 h-12  transition-colors focus:outline-none"
      >
        {/* SVG Іконка Дзвоника */}
        <svg
          className="w-5 h-5 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>

        {/* Анімований червоний індикатор (Badge) */}
        {hasUnread && (
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      {/* Выпадающее меню (Drop-down) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden text-left font-sans">
          {/* Header */}
          <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Сповіщення</h3>
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                3 нових
              </span>
            </div>
            <button
              onClick={() => setHasUnread(false)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              type="button"
            >
              Прочитати все
            </button>
          </div>

          {/* Фільтри */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              className="px-2.5 py-1 rounded-md bg-teal-600 text-white font-medium whitespace-nowrap shadow-sm"
              type="button"
            >
              Всі (5)
            </button>
            <button
              className="px-2.5 py-1 rounded-md bg-white text-slate-600 hover:bg-slate-100 font-medium whitespace-nowrap border border-slate-200"
              type="button"
            >
              Клініка
            </button>
            <button
              className="px-2.5 py-1 rounded-md bg-white text-slate-600 hover:bg-slate-100 font-medium whitespace-nowrap border border-slate-200"
              type="button"
            >
              Склад
            </button>
          </div>

          {/* Список сповіщень */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {/* Повідомлення 1 */}
            <div className="p-3.5 bg-rose-50/40 hover:bg-rose-50/70 transition-colors cursor-pointer">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                    <span className="font-bold text-rose-600 uppercase tracking-wide">Склад</span>
                    <span>2 хв тому</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mb-1">
                    GC ESSENTIA HiFlo (шприц 2мл)
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Залишився лише 1 шт у кабінеті №2 (поріг резерву: 3 шт).
                  </p>
                </div>
              </div>
            </div>

            {/* Повідомлення 2 */}
            <div className="p-3.5 bg-teal-50/40 hover:bg-teal-50/70 transition-colors cursor-pointer">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                    <span className="font-bold text-teal-700 uppercase tracking-wide">Запис</span>
                    <span>18 хв тому</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mb-1">
                    Даниленко А. С. • Гігієна AirFlow
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Призначено до Д-р Іваненко М. В. на сьогодні, 14:00.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              type="button"
            >
              Налаштування
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
            >
              <span>Показати всі</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
