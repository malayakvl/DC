import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import Dropdown from '../../Components/Form/Dropdown';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import LangMenu from './LangMenu';

export default function Header({auth}) {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
console.log('Current user', user);
  return (
    <>
    <header className="flex items-center justify-between py-6 neon-header">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white">
                <img src="../../images/new-diz/logo-e.png" className="h-[50px]" />
            </Link>
            <div className="flex lg:hidden">
              <button type="button"
                      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Open main menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" dataslot="icon"
                    aria-hidden="true" className="size-6">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div>
              <Link href="/" className="text-white">
              <div className="text-md font-bold leading-tight gradient-text-h">DentalCare</div>
              <div className="slogan">Автоматизація обліку</div>
              </Link>
            </div>
          </div>
          

          <nav className="hidden md:flex items-center gap-8 text-sm text-white">
            {/* <a className="hover:text-white" href="#">Features</a> */}
            <a className="hover:text-white" href="#">Прайс</a>
            <a className="hover:text-white" href="#">Інтеграція</a>
            <a className="hover:text-white" href="#">Піддтримка</a>
            {/* <a className="hover:text-white" href="#">Blog</a> */}
          </nav>

          <div className="flex items-center gap-3 relative">
            <LangMenu />
            {auth?.user ? (
              <Link href="/dashboard" className="text-white">
                Dashboard1
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-slate-300 px-3 py-2 rounded-md hover:bg-white/2 rounded-lg bg-gradient-to-r from-[#b44dd6] to-[#7974e3] text-white shadow-[0_12px_40px_rgba(21,195,255,0.12)] font-bold"
                >
                  {lng.get('menu.login')} <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/register"
                  className="reg-btn"
                >
                  {lng.get('menu.register')}
                </Link>
                {/* <div className="mt-1">
                  <Link
                    href="/login"
                    className="rounded-md px-4 py-2 text-black ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    {lng.get('menu.login')} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div> */}
              </>
            )}
          </div>
        </header>
    </>
  );
}
