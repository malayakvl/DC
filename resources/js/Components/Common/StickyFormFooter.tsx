import React from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import PrimaryButton from '../Form/PrimaryButton'; // Проверьте правильность пути к вашей кнопке

export default function StickyFormFooter({
  backUrl,
  backLabel = 'Повернутись',
  saveLabel = 'Зберегти',
  processingLabel = 'Збереження...',
  successMessage = 'Збережено успішно!',
  processing = false,
  recentlySuccessful = false,
  onSave, // Опционально, если кнопка должна делать что-то кроме submit
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-40">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {backUrl && (
          <Link
            href={backUrl}
            className="btn-new-back"
            /* Если используете отдельный класс, замените классы выше на className="btn-new-back" */
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>{backLabel}</span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <Transition
          show={recentlySuccessful}
          enter="transition ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            {successMessage}
          </p>
        </Transition>

        <PrimaryButton
          type="submit"
          disabled={processing}
          onClick={onSave}
          className="w-full sm:w-auto justify-center px-6"
        >
          <span className="material-symbols-outlined text-[18px]">
            {processing ? 'sync' : 'save'}
          </span>
          <span className={processing ? 'animate-pulse' : ''}>
            {processing ? processingLabel : saveLabel}
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
}
