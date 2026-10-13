import InputLabel from './InputLabel';
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function InputCalendar({
  className = '',
  name,
  label,
  values,
  onChange,
  ...props
}: {
  className?: string;
  name: string;
  label?: string;
  values?: Record<string, any>;
  onChange?: (value: any) => void;
}) {
  const { errors } = usePage().props;
  const [startDate, setStartDate] = useState<any>(
    values?.[name] ? new Date(values[name]) : new Date()
  );

  return (
    <div className={`relative`}>
      <InputLabel htmlFor={name} value={label} />
      <DatePicker
        id={name}
        name={name}
        className={`input-text ${className}`}
        selected={startDate}
        onChange={(date: any) => {
          setStartDate(date);
          onChange?.(date);
        }}
        {...props}
      />
      {errors[name] && <div className="form-error">{errors[name]}</div>}
    </div>
  );
}
