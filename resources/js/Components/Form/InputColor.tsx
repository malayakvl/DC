import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

interface Props {
  defaultColor: string;
  style: string | null;
  icon: string | null;
  name: string;
  label: string | null;
  placeholder: string | null;
  tips: string | null;
  disabled?: boolean;
  onChange?: (color: string) => void; // Додаємо нормальний пропс для зміни
}

export const InputColor: React.FC<Props> = ({
  defaultColor,
  style,
  icon,
  name,
  label,
  placeholder,
  tips,
  disabled,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const node = useRef<HTMLDivElement>(null);

  const handleFocus = (e: any) => {
    e.target.select();
  };

  const handleChangeComplete = (color: any) => {
    setSelectedColor(color.hex);
    if (onChange) {
      onChange(color.hex);
    }
  };

  const handleClick = (e: any) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    setShowPicker(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    setSelectedColor(defaultColor);
  }, [defaultColor]);

  return (
    <div className={`${style || ''} relative`} ref={node}>
      {label && (
        <label
          className="control-label block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 shadow-xs">
        {icon && (
          <span className="material-symbols-outlined text-[18px] text-teal-600 mr-2">{icon}</span>
        )}
        <input
          className="w-full bg-transparent border-none text-slate-900 text-[13px] focus:outline-none focus:ring-0 p-0"
          placeholder={placeholder || ''}
          type="text"
          onFocus={handleFocus}
          value={selectedColor}
          name={name}
          disabled={disabled}
          onChange={(e) => {
            setSelectedColor(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
        />
        {/* Кнопка відкриття палетки */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 shadow-inner cursor-pointer"
          style={{ backgroundColor: selectedColor }}
          onClick={() => !disabled && setShowPicker(!showPicker)}
        >
          <span className="material-symbols-outlined text-[14px] text-white">palette</span>
        </div>

        {/* Сам SketchPicker через fixed позиціонування поверх усіх контейнерів */}
        {showPicker && (
          <div className="fixed z-[9999] mt-2 shadow-2xl rounded-lg">
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => {
                e.stopPropagation();
                setShowPicker(false);
              }}
            />
            <div className="relative z-50">
              <SketchPicker
                className="site-picker"
                onChangeComplete={handleChangeComplete}
                color={selectedColor}
              />
            </div>
          </div>
        )}
      </div>
      {tips && <em className="input-tips text-xs text-slate-500 mt-1 block">{tips}</em>}
    </div>
  );
};
