import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import Dropdown from '../../Components/Form/Dropdown';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Footer({type = 'relative'}) {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  return (
    <footer className={`footer-content w-full ${type === 'absolute' ? 'footer-bottom' : ''}`}>
      <div className="mx-auto w-full max-w-screen-xl p-12 py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 w-1/6">
            <a href="/" className="flex items-center">
              <img src="../../images/new-diz/logo-e.png" className="w-[70px] me-3" alt="DentalCare" />
            </a>
          </div>
          <div className="w-5/6 grid grid-cols-2 gap-2 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 className="mb-0 text-sm font-semibold text-white uppercase dark:text-white">Акаунт</h2>
              <ul className="text-white dark:text-gray-400 font-medium">
                <li className="mb-0">
                  <a href="#" className="hover:underline">Вхід</a>
                </li>
                <li className="mb-0">
                  <a href="#" className="hover:underline">Відновити пароль</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Реєстрація</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-0 text-sm font-semibold text-white">Мова</h2>
              <ul className="text-white dark:text-gray-400 font-medium">
                <li className="mb-0">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Украінська</a>
                </li>
                <li>
                  <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">English</a>
                </li>

              </ul>
            </div>
            <div>
              <h2 className="mb-0 text-sm font-semibold text-white">Документи</h2>
              <ul className="text-white dark:text-gray-400 font-medium">
                <li className="mb-0">
                  <a href="#" className="hover:underline">Правила Користування</a>
                </li>
                <li className="mb-0">
                  <a href="#" className="hover:underline">Приклад згоди на обробку даних</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Приклад згоди на обробку даних</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-0 text-sm font-semibold text-white">Посилання</h2>
              <ul className="text-white dark:text-gray-400 font-medium">
                <li className="mb-0">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-[#6d7de6] sm:mx-auto dark:border-gray-700" />
        <div className="sm:flex sm:items-center sm:justify-between mx-1">
          <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2025 <a
            href="https://flowbite.com/" className="hover:underline">DentalCare™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
