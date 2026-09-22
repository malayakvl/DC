import InputLabel from './InputLabel';
import React, { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import lngDropdown from '../../Lang/Dropdown/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';

export default function InputCustomerSelect({
  className = '',
  elId = '',
  name,
  label,
  values,
  onChange,
  defaultValue = null,
  error = null,
  options = [],
  selectedLabelClass = '',
  ...props
}) {
  const { errors: pageErrors } = usePage().props as any;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDropdown,
    locale: appLang,
  });

  const displayError = error || pageErrors[name];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const rawValue = defaultValue ?? values?.[name];
  let targetId = rawValue;

  if (rawValue && typeof rawValue === 'object') {
    targetId = rawValue.id !== undefined ? rawValue.id : rawValue.name;
  }

  const stringSelectedValue = targetId !== null && targetId !== undefined ? String(targetId) : '';
  const normalizedOptions = Array.isArray(options) ? options : (options as any)?.data || [];

  // Фильтрация уникальных клиентов по ID
  const uniqueOptions = normalizedOptions.filter(
    (option: any, index: number, self: any[]) =>
      self.findIndex((o: any) => o.id === option.id) === index
  );

  // Находим выбранного клиента
  const selectedOption = uniqueOptions.find((opt: any) => String(opt.id) === stringSelectedValue);

  let selectedLabel = msg.get('dropdown.select');
  if (selectedOption) {
    selectedLabel = `${selectedOption.first_name || ''} ${selectedOption.last_name || ''}`.trim();
  }

  const handleSelect = (optValue: string) => {
    setIsOpen(false);
    if (onChange) {
      const syntheticEvent = {
        target: {
          id: elId || name,
          name: name,
          value: optValue,
        },
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <InputLabel htmlFor={name} value={label} />}

      {/* Кнопка-селект */}
      <div
        id={elId || name}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-xl border bg-white text-slate-800 text-sm py-2.5 px-3.5 shadow-xs cursor-pointer flex items-center justify-between transition ${className} ${
          displayError ? 'border-rose-500' : 'border-slate-300 hover:border-brand-500'
        }`}
        {...props}
      >
        <span
          className={`${stringSelectedValue ? 'text-slate-900 font-medium' : 'text-slate-400'} ${selectedLabelClass}`}
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

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute z-30 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1.5">
          <ul>
            <li
              className="cursor-pointer py-2 px-3 hover:bg-slate-100 rounded-lg text-sm text-slate-400 transition mb-1"
              onClick={() => handleSelect('')}
            >
              {msg.get('dropdown.select')}
            </li>

            {uniqueOptions.map((option: any, index: number) => {
              const optValue = String(option.id);
              const optLabel = `${option.first_name || ''} ${option.last_name || ''}`.trim();
              const isSelected = optValue === stringSelectedValue;

              return (
                <li
                  key={option.id || index}
                  className={`cursor-pointer py-2 px-3 rounded-lg text-sm transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => handleSelect(optValue)}
                >
                  <span>{optLabel}</span>
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
