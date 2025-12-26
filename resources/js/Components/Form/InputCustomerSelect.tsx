import InputLabel from './InputLabel';
import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import lngHeaders from '../../Lang/Datatable/translation';
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
  translatable = false,
  defaultValue = null,
  error = null,
  ...props
}) {
  const { errors: pageErrors } = usePage().props;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDropdown,
    locale: appLang,
  });
  const displayError = error || pageErrors[name];
  
  return (
    <div className={`relative`}>
      <InputLabel htmlFor={name} value={label} children={null} />
      {props.options.length > 0 && (
        <select
          id={`${elId || name}`}
          name={name}
          className={`input-text ${className}`}
          defaultValue={`${defaultValue ? defaultValue : values[name]}`}
          onChange={onChange}
        >
          <option value="">{msg.get('dropdown.select')}</option>
          {props.options.map((option: any) => (
            <option key={option.id} value={option.id} selected={option.id === defaultValue}>
              {option.first_name} {option.last_name}
            </option>
          ))}
        </select>
      )}
      {displayError && <div className="form-error">{displayError}</div>}
    </div>
  );
}
