import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from './../../Lang/Header/translation';

export default function ApplicationLogo() {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  return (
    <div className="flex items-center space-x-3 shrink-0" data-purpose="brand-logo-container">
      {/* Иконка с плавающим бейджем версии */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 p-[2px] shadow-sm shadow-teal-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-teal-600"
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
        {/* Бейдж версии */}
        <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-600 text-white shadow-xs leading-none border border-white">
          v4.8
        </span>
      </div>

      {/* Текстовый блок */}
      <div className="flex flex-col justify-center min-w-0">
        <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
          DentalCare<span className="text-teal-600">OS</span>
        </span>
        <span className="text-[10px] font-medium text-slate-400 truncate mt-1 leading-none max-w-[130px] 2xl:max-w-none">
          {msg.get('menu.h_slogan')}
        </span>
      </div>
    </div>
  );
}
