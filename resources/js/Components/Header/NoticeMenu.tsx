import React, { useState, useRef, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function NoticeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = usePage().props.auth.user;

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
      className={`relative inline-block text-left notice-block ${user?.current_filial ? 'filial-notice' : ''}`}
      ref={menuRef}
    >
      {/* Кнопка сповіщень */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Сповіщення"
        className="relative flex items-center justify-center w-12 h-12 bg-indigo-50/60 hover:bg-indigo-100/80 rounded-2xl transition-colors focus:outline-none"
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
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100">Сповіщення</h3>
            <span
              className="text-xs text-indigo-400 cursor-pointer hover:underline"
              onClick={() => setHasUnread(false)}
            >
              Прочитати все
            </span>
          </div>

          {/* Список сповіщень */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
            <div className="p-3 hover:bg-slate-800/50 transition-colors cursor-pointer">
              <p className="text-xs text-slate-300 font-medium">Новий валідатор підключено</p>
              <span className="text-[10px] text-slate-500">2 хвилини тому</span>
            </div>

            <div className="p-3 hover:bg-slate-800/50 transition-colors cursor-pointer">
              <p className="text-xs text-slate-300 font-medium">Змінився Stake у Solana Node</p>
              <span className="text-[10px] text-slate-500">1 годину тому</span>
            </div>
          </div>

          <div className="p-2 text-center bg-slate-950/40 border-t border-slate-800">
            <button className="text-xs text-slate-400 hover:text-white transition-colors">
              Показати все
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
