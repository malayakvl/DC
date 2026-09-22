import React from 'react';
import ActionButton from '../Form/ActionButton';
import NavLink from '../Links/NavLink';

export default function ListHeader({
  title,
  count,
  totalLabel,
  description,
  // Пропси для кнопки (можуть бути або посилання, або клік)
  createHref,
  onCreateClick,
  createLabel,
  isCreateDisabled = false,
}) {
  return (
    <section className="mb-6 mt-2">
      <header className="pb-4 border-b border-surface-container-low">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Лівий блок: Заголовок + Бейдж + Підзаголовок */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-on-surface tracking-tight">{title}</h1>

              {/* Бейдж кількості */}
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                {count} {totalLabel}
              </span>
            </div>

            {/* Підзаголовок */}
            {description && (
              <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Правий блок: Кнопка дії (підтримує і лінк, і екшен через клік) */}
          {(createHref || onCreateClick) && (
            <div className="flex items-center shrink-0">
              {createHref ? (
                <NavLink
                  className="group relative inline-flex items-center justify-center gap-2.5 px-2 py-2 rounded-md bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm"
                  href={createHref}
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span className="text-[13px]">{createLabel}</span>
                </NavLink>
              ) : (
                <ActionButton
                  type="button"
                  onClick={onCreateClick}
                  disabled={isCreateDisabled}
                  icon={<span className="material-symbols-outlined text-[14px]">add</span>}
                >
                  <span className="text-[13px]">{createLabel}</span>
                </ActionButton>
              )}
            </div>
          )}
        </div>
      </header>
    </section>
  );
}
