import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import { usePage } from '@inertiajs/react';
// import lngHeader from './../Lang/Header/translation';
import lngHeader from './../../Lang/Header/translation';

export default function ApplicationLogo() {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  return (
    <div className="flex items-center space-x-3.5" data-purpose="brand-logo-container">
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 p-[2px] shadow-md shadow-teal-500/20 flex items-center justify-center">
        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
          {/* Dental Care Heart Tooth Icon */}
          <svg
            className="w-6 h-6 text-teal-600"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.5C7 .5 2 4 2 9c0 5.5 5 9.5 10 13 5-3.5 10-7.5 10-13 0-5-5-8.5-10-4.5z" />
            <path d="M12 9v6" strokeDasharray="2 2" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            DentalCare<span className="text-teal-600">OS</span>
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
            v4.8 • Cloud
          </span>
        </div>
        <span className="text-xs font-medium text-slate-400">{msg.get('menu.h_slogan')}</span>
      </div>
    </div>
  );
}
