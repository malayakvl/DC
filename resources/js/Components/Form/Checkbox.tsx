import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export default function Checkbox({
  label,
  description,
  className = '',
  checked,
  disabled,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId =
    id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label
      htmlFor={checkboxId}
      className={`group relative inline-flex items-start gap-3 select-none ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${className}`}
    >
      {/* Прихований рідний інпут для доступності (a11y) та форм */}
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />

      {/* Кастомний кадровий бокс */}
      <div
        className="
          relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white
          shadow-sm transition-all duration-200 ease-in-out
          
          /* Hover & Focus */
          group-hover:border-[#0ea5a4]
          peer-focus-visible:ring-2 peer-focus-visible:ring-[#0ea5a4]/30 peer-focus-visible:ring-offset-1
          
          /* Checked State */
          peer-checked:border-[#0ea5a4] peer-checked:bg-[#0ea5a4] peer-checked:shadow-[#0ea5a4]/20 peer-checked:shadow-md
          
          /* Active Press Effect */
          active:scale-95
        "
      >
        {/* Анімована SVG галочка */}
        <svg
          className="h-3.5 w-3.5 stroke-white transition-all duration-200 ease-in-out peer-checked:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline
            points="20 6 9 17 4 12"
            className="
              [stroke-dasharray:24]
              [stroke-dashoffset:24]
              transition-[stroke-dashoffset] duration-300 ease-in-out
              peer-checked:[stroke-dashoffset:0]
            "
          />
        </svg>
      </div>

      {/* Опціональний текст лейбла */}
      {(label || description) && (
        <div className="flex flex-col text-sm leading-tight">
          {label && (
            <span className="font-medium text-slate-800 transition-colors group-hover:text-slate-900">
              {label}
            </span>
          )}
          {description && <span className="mt-0.5 text-xs text-slate-500">{description}</span>}
        </div>
      )}
    </label>
  );
}
