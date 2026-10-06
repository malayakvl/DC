import React from 'react';

// Розширюємо стандартними пропсами HTML-кнопки (тепер type, onClick, form тощо будуть дозволені)
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function PrimaryButton({
  className = '',
  disabled = false,
  children = null,
  icon = null,
  ...props
}: PrimaryButtonProps) {
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
