import React from 'react';

export default function PrimaryButton({
  className = '',
  disabled = false,
  children = null,
  icon = null, // додаємо можливість передавати іконку опціонально
  ...props
}) {
  return (
    <button
      {...props}
      className={`btn-submit transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && icon}
        {children}
      </div>
    </button>
  );
}
