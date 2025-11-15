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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                    aria-hidden="true" className="size-6">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
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
    
    {/* OLD HEADER */}
    {/* <header className="flex items-center justify-between py-6 neon-header">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-1 lg:px-0">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img src="../../images/new-diz/logo-e.png" className="h-[50px]" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                 aria-hidden="true" className="size-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button type="button" aria-expanded="false"
                    className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Про нас
              <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                   className="size-5 flex-none text-gray-400">
                <path
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" fill-rule="evenodd" />
              </svg>
            </button>


          </div>

          <a href="#" className="text-sm/6 font-semibold text-gray-900">Вартість</a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">Контакти</a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">Новини</a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          
        </div>
      </nav>
      <div role="dialog" aria-modal="true" className="lg:hidden">
        <div className="fixed inset-0 z-50"></div>
        <div
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt=""
                   className="h-8 w-auto" />
            </a>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                   aria-hidden="true" className="size-6">
                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="-mx-3">
                  <button type="button" aria-controls="products" aria-expanded="false"
                          className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Про систему

                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                         className="size-5 flex-none">
                      <path
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd" fill-rule="evenodd" />
                    </svg>
                  </button>
                  <div id="products" className="mt-2 space-y-2">
                    <a href="#"
                       className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Analytics</a>
                    <a href="#"
                       className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Engagement</a>
                    <a href="#"
                       className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Security</a>
                    <a href="#"
                       className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Integrations</a>
                    <a href="#"
                       className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Automations</a>
                    <a href="#"
                       className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Watch
                      demo</a>
                    <a href="#"
                       className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Contact
                      sales</a>
                  </div>
                </div>
                <a href="#"
                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#"
                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                <a href="#"
                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
              </div>
              <div className="py-6">
                <a href="#"
                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log
                  in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header> */}
    </>
  );
}
