import React from 'react';

export default function PrimaryButton({
  className = '',
  disabled = null,
  children = null,
  ...props
}) {
  return (
    <button
      {...props}
      className={`btn-submit ${disabled && 'opacity-25'} ` + className}
      disabled={disabled}
    >
      <div className="flex items-center justify-center">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
        {children}
      </div>
    </button>
  );
}
