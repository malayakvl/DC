import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Dropdown from '../../Components/Form/Dropdown';
import { changeLangAction } from '@/Redux/Layout';
import { usePage } from '@inertiajs/react';

export default function LangMenu() {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const user = usePage().props.auth.user;

  // Форматируем отображение языка (например, 'uk' -> 'UA', 'en' -> 'EN')
  const formattedLang = appLang?.toUpperCase() === 'UK' ? 'UA' : appLang?.toUpperCase();

  return (
    <div className={`lang-block-new ${user ? 'user-lang' : ''}`}>
      <Dropdown>
        <Dropdown.Trigger>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            title="Змінити мову"
          >
            {/* Иконка глобуса */}
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

            {/* Иконка стрелки вниз */}
            <svg
              className="w-3 h-3 text-slate-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <span
            className="dropdown-span cursor-pointer block px-4 py-2 hover:bg-slate-100"
            onClick={() => dispatch(changeLangAction('uk'))}
          >
            Укр
          </span>
          <span
            className="dropdown-span cursor-pointer block px-4 py-2 hover:bg-slate-100"
            onClick={() => dispatch(changeLangAction('en'))}
          >
            En
          </span>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
