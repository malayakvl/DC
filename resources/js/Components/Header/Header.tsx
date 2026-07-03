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
    // <>
    //   <header className="flex items-center justify-between py-6 welcome-header">
    //     <div className="flex items-center gap-4">
    //       <Link href="/" className="text-white">
    //         <img src="../../images/new-diz/logo-e.png" className="h-[50px]" />
    //       </Link>
    //       <div className="flex lg:hidden">
    //         <button
    //           type="button"
    //           className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
    //         >
    //           <span className="sr-only">Open main menu</span>
    //           <svg
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //             strokeWidth="1.5"
    //             aria-hidden="true"
    //             className="size-6"
    //           >
    //             <path
    //               d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <div>
    //         <Link href="/" className="text-white">
    //           <div className="text-md font-bold leading-tight gradient-text-h">DentalCare</div>
    //           <div className="slogan">Автоматизація обліку</div>
    //         </Link>
    //       </div>
    //     </div>
    //
    //     <nav className="hidden md:flex items-center gap-8 text-sm text-white md:min-w-[300px]">
    //       {/* <a className="hover:text-white" href="#">Features</a> */}
    //       <a className="hover:text-white" href="#">
    //         Прайс
    //       </a>
    //       <a className="hover:text-white" href="#">
    //         Інтеграція
    //       </a>
    //       <a className="hover:text-white" href="#">
    //         Піддтримка
    //       </a>
    //       {/* <a className="hover:text-white" href="#">Blog</a> */}
    //     </nav>
    //
    //     <div className="flex items-center gap-3 relative">
    //       <LangMenu />
    //       {auth?.user ? (
    //         <Link href="/dashboard" className="text-white">
    //           Dashboard
    //         </Link>
    //       ) : (
    //         <>
    //           <Link
    //             href="/login"
    //             className="text-sm text-slate-300 px-3 py-2 rounded-md hover:bg-white/2 rounded-lg bg-gradient-to-r from-[#b44dd6] to-[#7974e3] text-white shadow-[0_12px_40px_rgba(21,195,255,0.12)] font-bold"
    //           >
    //             {lng.get('menu.login')} <span aria-hidden="true">&rarr;</span>
    //           </Link>
    //           <Link href="/register" className="reg-btn">
    //             {lng.get('menu.register')}
    //           </Link>
    //           {/* <div className="mt-1">
    //               <Link
    //                 href="/login"
    //                 className="rounded-md px-4 py-2 text-black ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
    //               >
    //                 {lng.get('menu.login')} <span aria-hidden="true">&rarr;</span>
    //               </Link>
    //             </div> */}
    //         </>
    //       )}
    //     </div>
    //   </header>
    // </>
  );
}
