import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Dropdown from '../../Components/Form/Dropdown';
import { changeLangAction } from '@/Redux/Layout';
import { usePage } from '@inertiajs/react';

export default function LangMenu() {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const user = usePage().props.auth.user;

  const formattedLang = appLang?.toUpperCase() === 'UK' ? 'UA' : appLang?.toUpperCase();

  return (
    <div className={`lang-block-new ${user ? 'user-lang' : ''}`}>
      <Dropdown>
        <Dropdown.Trigger>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-sm"
            title="Змінити мову"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" x2="22" y1="12" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>

            <span>{formattedLang}</span>

            <svg
              className="w-3 h-3 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </Dropdown.Trigger>

        {/* Додали фіксовану мінімальну ширину, красиву тінь і закруглення, прибрали гігантські відступи */}
        <Dropdown.Content
          className="absolute right-0 mt-2 w-16 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 z-50"
          style={{ minWidth: '200px' }}
        >
          <div
            onClick={() => dispatch(changeLangAction('uk'))}
            className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md cursor-pointer transition-colors min-w-[200px] ${
              appLang === 'uk'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Українська</span>
            {appLang === 'uk' && (
              <span className="material-symbols-outlined text-[14px] text-primary">check</span>
            )}
          </div>

          <div
            onClick={() => dispatch(changeLangAction('en'))}
            className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl cursor-pointer transition-colors mt-0.5 ${
              appLang === 'en'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>English</span>
            {appLang === 'en' && (
              <span className="material-symbols-outlined text-[14px] text-primary">check</span>
            )}
          </div>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
