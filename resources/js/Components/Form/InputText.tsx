import InputLabel from './InputLabel';
import React from 'react';
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
}: {
  className?: string;
  name?: string;
  label?: string;
  values?: any;
  placeholder?: string;
  showLabel?: boolean;
  onChange?: (values: any) => void;
  type?: any;
  error?: any;
}) {
  const { errors: pageErrors } = usePage().props;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const displayError = error || pageErrors[name];

  return (
    <div className={`relative w-full`}>
      {showLabel && <InputLabel htmlFor={name} value={label} />}

      <input
        id={name}
        name={name}
        onChange={onChange}
        type={type ? type : 'text'}
        value={values[name || '']}
        placeholder={placeholder}
        className={'input-text ' + className}
        {...props}
      />
      {displayError && <div className="form-error">{displayError}</div>}
    </div>
  );
}
