import React, { useState, useRef, useEffect } from 'react';
import { IconBell } from '@tabler/icons-react';

export default function NoticeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдауна при клике вне него
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
    <div className="relative inline-block text-left notice-block" ref={menuRef}>
      {/* Кнопка с иконкой как на скрине */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="relative flex items-center justify-center w-12 h-12 bg-indigo-50/60 hover:bg-indigo-100/80 rounded-2xl transition-colors focus:outline-none"
      >
        {/* Центрированная иконка колокольчика */}
        <IconBell className="w-6 h-6 text-slate-700" />

        {/* Красный кружочек (Badge) */}
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white p-[2px]">
            <span className="h-full w-full rounded-full bg-rose-500" />
          </span>
        )}
      </button>

      {/* Выпадающее меню (Drop-down) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100">Уведомления</h3>
            <span
              className="text-xs text-indigo-400 cursor-pointer hover:underline"
              onClick={() => setHasUnread(false)}
            >
              Прочитать все
            </span>
          </div>

          {/* Список первых нотайсов */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
            <div className="p-3 hover:bg-slate-800/50 transition-colors cursor-pointer">
              <p className="text-xs text-slate-300 font-medium">Новый валидатор подключен</p>
              <span className="text-[10px] text-slate-500">2 минуты назад</span>
            </div>

            <div className="p-3 hover:bg-slate-800/50 transition-colors cursor-pointer">
              <p className="text-xs text-slate-300 font-medium">Изменился Stake у Solana Node</p>
              <span className="text-[10px] text-slate-500">1 час назад</span>
            </div>
          </div>

          <div className="p-2 text-center bg-slate-950/40 border-t border-slate-800">
            <button className="text-xs text-slate-400 hover:text-white transition-colors">
              Показать все
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
