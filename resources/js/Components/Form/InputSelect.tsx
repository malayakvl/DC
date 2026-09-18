import InputLabel from './InputLabel';
import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import lngHeaders from '../../Lang/Datatable/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';

export default function InputSelect({
  className = '',
  elId = '',
  name,
  label,
  values,
  onChange,
  translatable = false,
  defaultValue = null,
  error = null,
  options = [],
  ...props
}: any) {
  const { errors: pageErrors } = usePage().props as any;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDropdown,
    locale: appLang,
  });

  const displayError = error || pageErrors[name];

  // 1. Витягуємо ID з values або defaultValue
  const rawValue = defaultValue ?? values?.[name];
  let targetId = rawValue;

  if (rawValue && typeof rawValue === 'object') {
    targetId = rawValue.id !== undefined ? rawValue.id : rawValue.name;
  }

  // Завжди перетворюємо шукане значення в рядок
  const stringSelectedValue = targetId !== null && targetId !== undefined ? String(targetId) : '';

  // Перевірка на випадок, якщо options загорнуті в data (Laravel Resource)
  const normalizedOptions = Array.isArray(options) ? options : (options as any)?.data || [];

  return (
    <div className="relative">
      {label && <InputLabel htmlFor={name} value={label} />}

      <select
        id={elId || name}
        name={name}
        className={`input-text ${className}`}
        value={stringSelectedValue}
        onChange={onChange}
        {...props}
      >
        <option value="">{msg.get('dropdown.select')}</option>
        {normalizedOptions.map((option: any, index: number) => {
          // Динамічно шукаємо ID опції (чи це id, value, code чи сам елемент)
          const rawOptId =
            typeof option === 'object' && option !== null
              ? (option.id ?? option.value ?? option.code)
              : option;

          const optValue = String(rawOptId);
          const optLabel = typeof option === 'object' ? (option.name ?? option.label) : option;

          return (
            <option key={option.id || index} value={optValue}>
              {translatable ? msg.get('dropdown.' + optLabel) : optLabel}
            </option>
          );
        })}
      </select>

      {displayError && <div className="form-error">{displayError}</div>}
    </div>
  );
}
