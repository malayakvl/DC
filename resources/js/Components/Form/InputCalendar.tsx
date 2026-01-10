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
  type = 'text',
  ...props
}) {
  const { errors } = usePage().props;
  const [startDate, setStartDate] = useState(values[name] ? new Date(values[name]) : new Date());

  return (
    <div className={`relative`}>
      <InputLabel htmlFor={name} value={label} children={null} />
      <DatePicker
        id={name}
        name={name}
        className={`input-text ${className}`}
        selected={startDate}
        onChange={(date: any) => {
          setStartDate(date);
          onChange(date);
        }}
        {...props}
      />
      {/*<input*/}
      {/*    id={name}*/}
      {/*    onChange={onChange}*/}
      {/*    onClick={() => {*/}
      {/*        console.log('show calendar')*/}
      {/*    }}*/}
      {/*    type={type ? type : 'text'}*/}
      {/*    value={values[name]}*/}

      {/*    className={*/}
      {/*        'input-text ' +*/}
      {/*        className*/}
      {/*    }*/}
      {/*/>*/}
      {errors[name] && <div className="form-error">{errors[name]}</div>}
    </div>
  );
}
