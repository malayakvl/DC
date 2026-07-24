import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import LangMenu from './LangMenu';
import React from 'react';
import ApplicationLogo from '@/Components/Header/ApplicationLogo';

export default function Header({ auth }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  return (
    <>
      <header className="">
        <div className="flex px-4 sm:px-10 top-header font-sans h-[75px] tracking-wide relative z-50 header-fixed">
          <div className="relative flex w-full md:justify-between">
            <div>
              <Link href="/">
                <ApplicationLogo className="block w-auto fill-current text-gray-800" />
              </Link>
            </div>
            <nav className="w-nav">
              <a className="w-nav-link" href="#">
                Огляд
              </a>
              <a className="w-nav-link" href="#">
                Можливості
              </a>
              <a className="w-nav-link" href="#">
                Прайс
              </a>
              <a className="w-nav-link" href="#">
                Піддтримка
              </a>
              <a className="w-nav-link" href="#">
                Інтеграція
              </a>
              <a className="w-nav-link" href="#">
                Відгуки
              </a>
              <a className="w-nav-link" href="#">
                Контакти
              </a>
            </nav>
            <div className="flex items-center relative">
              <div className="w-lang">
                <LangMenu />
              </div>
              {auth?.user ? (
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-300 px-3 py-2 rounded-md hover:bg-white/2 rounded-lg bg-gradient-to-r from-[#b44dd6] to-[#7974e3] text-white shadow-[0_12px_40px_rgba(21,195,255,0.12)] font-bold"
                >
                  {lng.get('menu.dashboard')} <span aria-hidden="true">&rarr;</span>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn-login">
                    {lng.get('menu.login')} <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link href="/register" className="btn-register">
                    {lng.get('menu.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
