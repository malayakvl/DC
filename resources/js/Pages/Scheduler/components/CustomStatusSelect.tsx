import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { schedulerStatusSelector } from '../../../Redux/Scheduler/selectors';
import { useDispatch, useSelector } from 'react-redux';

interface Status {
  id: number | string;
  name: string;
  color?: string;
}

interface CustomStatusSelectProps {
  statuses: Status[];
  selectedStatusId?: number | string | null;
  onSelect: (status: Status | null) => void;
  placeholder?: string;
}

export default function CustomStatusSelect({
  statuses,
  onSelect,
  placeholder = 'Всі статуси',
}: CustomStatusSelectProps) {
  const selectedStatusId = useSelector(schedulerStatusSelector);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Находим текущий выбранный статус
  const selectedStatus = statuses.find((s) => s.id === selectedStatusId);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Кнопка-триггер (выглядит как твой инпут/селект) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[160px] bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium pl-3 pr-8 py-2 rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2 truncate">
          {selectedStatus ? (
            <>
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedStatus.color || '#cbd5e1' }}
              />
              <span className="truncate">{selectedStatus.name}</span>
            </>
          ) : (
            <span className="text-slate-500">{placeholder}</span>
          )}
        </div>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute left-0 z-100 mt-1 w-full min-w-[180px] bg-white border border-slate-200 rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto">
          {/* Опция сброса фильтра */}
          <div
            onClick={() => {
              onSelect(null);
              setIsOpen(false);
            }}
            className="px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            {placeholder}
          </div>

          {/* Список статусов из базы */}
          {statuses.map((status) => (
            <div
              key={status.id}
              onClick={() => {
                onSelect(status);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs text-slate-800 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: status.color || '#cbd5e1' }}
              />
              <span className="truncate">{status.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
