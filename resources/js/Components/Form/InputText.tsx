import InputLabel from './InputLabel';
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function InputText({
  className = '',
  name,
  label,
  values,
  placeholder = '',
  showLabel = true,
  onChange,
  type = 'text',
  error = null,
  ...props
}) {
  const { errors: pageErrors } = usePage().props;
  const displayError = error || pageErrors[name];

  return (

    <div className={`relative`}>
      {showLabel && <InputLabel htmlFor={name} value={label} children={null} />}

      <input
        id={name}
        onChange={onChange}
        type={type ? type : 'text'}
        value={values[name]}
        placeholder={placeholder}
        className={'input-text ' + className}
      />
      {displayError && <div className="form-error">{displayError}</div>}
    </div>
  );
}
