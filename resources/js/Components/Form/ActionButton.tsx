import React from 'react';

export default function ActionButton({
  className = '',
  disabled = false,
  children = null,
  icon = null,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold text-sm text-white transition-all shadow-md ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-slate-400 shadow-none'
          : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/20 active:scale-[0.98]'
      } ${className}`}
    >
      {icon && <span className="shrink-0 pt-[5px]">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
