import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import { usePage } from '@inertiajs/react';

export default function Footer({ type = 'relative' }) {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  return (
    <footer className="w-full border-t border-slate-200/80 bg-slate-50/50 py-4 px-6 text-xs text-slate-500 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Левая часть: копирайт и версия */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="font-medium text-slate-600">
            © {new Date().getFullYear()} DentalCare OS.
          </span>
          <span className="text-slate-400">Всі права захищено.</span>
          <span className="bg-slate-200/60 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600">
            Клінічна версія v4.8
          </span>
        </div>

        {/* Правая часть: статус системы и сертификация (особенно актуально для клиник) */}
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-600 font-medium">Статус системи: Активна</span>
          </div>

          <span className="hidden md:inline text-slate-300">|</span>

          <span className="text-slate-500 font-medium flex items-center gap-1">
            🛡️ Сертифікація МОЗ України
          </span>
        </div>
      </div>
    </footer>
  );
}
