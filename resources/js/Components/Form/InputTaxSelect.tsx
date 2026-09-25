import InputLabel from './InputLabel';
import React, { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import lngDropdown from '../../Lang/Dropdown/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';

export default function InputTaxSelect({
  className = '',
  elId = '',
  name,
  label,
  values,
  onChange,
  translatable = true,
  defaultValue = null,
  error = null,
  options = [],
  selectedLabelClass = '',
  ...props
}: any) {
  const { errors: pageErrors } = usePage().props as any;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDropdown,
    locale: appLang,
  });

  const displayError = error || pageErrors[name];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие селекта при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Извлекаем значение из values или defaultValue
  const rawValue = defaultValue ?? values?.[name];
  let targetId = rawValue;

  if (rawValue && typeof rawValue === 'object') {
    targetId = rawValue.id !== undefined ? rawValue.id : rawValue.name;
  }

  const stringSelectedValue = targetId !== null && targetId !== undefined ? String(targetId) : '';
  const normalizedOptions = Array.isArray(options) ? options : (options as any)?.data || [];

  // Находим текущую опцию для отображения в кнопке
  const selectedOption = normalizedOptions.find((opt: any) => {
    const rawOptId =
      typeof opt === 'object' && opt !== null ? (opt.id ?? opt.value ?? opt.code) : opt;
    // Учитываем составной формат вида ID_VALUE (например для налогов)
    const formattedOptId =
      translatable && typeof opt === 'object' ? `${opt.id}_${opt.value}` : String(rawOptId);
    return formattedOptId === stringSelectedValue || String(rawOptId) === stringSelectedValue;
  });

  let selectedLabel = msg.get('dropdown.select');
  if (selectedOption) {
    const optLabel =
      typeof selectedOption === 'object'
        ? (selectedOption.name ?? selectedOption.label)
        : selectedOption;
    selectedLabel = translatable ? msg.get('dropdown.' + optLabel) : optLabel;
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

            {normalizedOptions.map((option: any, index: number) => {
              const rawOptId =
                typeof option === 'object' && option !== null
                  ? (option.id ?? option.value ?? option.code)
                  : option;

              // Формируем значение с учетом трансляции/налоговой ставки (id_value)
              const optValue =
                translatable && typeof option === 'object' && option.value !== undefined
                  ? `${option.id}_${option.value}`
                  : String(rawOptId);

              const optLabel = typeof option === 'object' ? (option.name ?? option.label) : option;
              const formattedLabel = translatable ? msg.get('dropdown.' + optLabel) : optLabel;
              const isSelected =
                optValue === stringSelectedValue || String(rawOptId) === stringSelectedValue;

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
                  <span>{formattedLabel}</span>
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
