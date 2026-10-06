import React from 'react';

// Розширюємо стандартними пропсами HTML-лейбла, щоб TypeScript знав про htmlFor та інші атрибути
interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value?: string | null; // робимо опціональним, раз може не бути
  className?: string;
  children?: React.ReactNode;
}

export default function InputLabel({ value, className = '', children, ...props }: InputLabelProps) {
  return (
    <label {...props} className={`input-label ` + className}>
      {value ? value : children}
    </label>
  );
}
