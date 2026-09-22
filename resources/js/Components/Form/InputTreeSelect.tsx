import InputLabel from './InputLabel';
import React, { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function InputTreeSelect({
  className = '',
  elId = '',
  name,
  label,
  values,
  onChange,
  options = [],
  defaultTips = 'Select',
  selectedLabelClass = '',
  ...props
}) {
  const { errors } = usePage().props as any;
  const displayError = errors[name];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закриття при кліку зовні
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedValue = values?.[name];
  const normalizedOptions = Array.isArray(options) ? options : (options as any)?.data || [];

  // Знаходимо поточну обрану категорію
  const selectedOption = normalizedOptions.find(
    (opt: any) => String(opt.id) === String(selectedValue)
  );
  const selectedLabel = selectedOption ? selectedOption.name : defaultTips;

  const handleSelect = (optId: string) => {
    setIsOpen(false);
    if (onChange) {
      const syntheticEvent = {
        target: {
          id: elId || name,
          name: name,
          value: optId,
        },
      };
      onChange(syntheticEvent);
    }
  };
  console.log(className);
  return (
    <div className="relative" ref={dropdownRef}>
      {label && <InputLabel htmlFor={name} value={label} />}

      {/* Кнопка-селект */}
      <div
        id={elId || name}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-xl border bg-white text-slate-800 text-sm py-2.5 px-3.5 shadow-xs cursor-pointer flex items-center justify-between transition ${className} ${
          displayError ? 'border-rose-500' : 'border-slate-300 hover:border-brand-500'
        } ${className}`}
        {...props}
      >
        <span
          className={`${selectedValue ? 'text-slate-900 font-medium' : 'text-slate-400'} ${selectedLabelClass}`}
        >
          {selectedLabel}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Випадаючий список з підтримкою ієрархії */}
      {isOpen && normalizedOptions.length > 0 && (
        <div className="absolute z-30 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1.5">
          <ul>
            <li
              className="cursor-pointer py-2 px-3 hover:bg-slate-100 rounded-lg text-sm text-slate-400 transition mb-1"
              onClick={() => handleSelect('')}
            >
              --------
            </li>

            {normalizedOptions.map((option: any) => {
              const isSelected = String(option.id) === String(selectedValue);
              // Формуємо відступ залежно від рівня (level)
              const indent =
                option.level > 0 ? '\u00A0\u00A0\u00A0\u00A0'.repeat(option.level) : '';

              return (
                <li
                  key={option.id}
                  className={`cursor-pointer py-2 px-3 rounded-lg text-sm transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => handleSelect(option.id)}
                >
                  <span className="whitespace-pre">
                    {indent}
                    {option.name}
                  </span>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-brand-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {displayError && <div className="form-error text-rose-500 text-xs mt-1">{displayError}</div>}
    </div>
  );
}
