import React, { useState } from 'react';
import NavLink from '../../Components/Links/NavLink';
import { Menu, MenuButton } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import { usePage } from '@inertiajs/react';
import NavStores from './Menu/NavStores';
import NavCustomers from './Menu/NavCustomers';
import NavScheduler from './Menu/NavScheduler';
import NavInvoices from './Menu/NavInvoices';
import NavPatients from './Menu/NavPatients';
import NavServices from './Menu/NavServices';
import NavPayments from './Menu/NavPayments';
import NavReports from './Menu/NavReports';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  const { auth } = usePage<{
    auth: {
      user: any;
      can: any;
      role: string[] | any[];
    };
  }>().props;

  return (
    <div className="relative flex items-center">
      {/* Кнопка-гамбургер только для мобилок */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden absolute -left-[40px] -top-[3px] w-10 h-10 rounded-lg bg-indigo-50/60 backdrop-blur-sm border border-transparent flex flex-col items-center justify-center gap-1 hover:bg-indigo-100/60 transition z-50 focus:outline-none"
        title="Menu"
      >
        <span
          className={`w-5 h-0.5 bg-gray-700 transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
        />
        <span className={`w-5 h-0.5 bg-gray-700 transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <span
          className={`w-5 h-0.5 bg-gray-700 transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
        />
      </button>

      {/* Основной навигационный блок */}
      {auth.role.length > 0 && (
        <div
          className={`
          ${isOpen ? 'block absolute left-[-190px] top-[0px] w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 space-y-1 z-45' : 'hidden'} 
          md:block md:static md:w-auto md:bg-transparent md:shadow-none md:border-none md:p-0 md:space-y-0
        `}
        >
          {/* Контейнер хедера без лишних маргинов */}
          <div className="flex items-center gap-x-1 md:mr-[20px] md:mt-[-10px]">
            {/* КАПСУЛА 1: КЛІНІКА */}
            <div className="flex items-center gap-x-1 bg-slate-100/80 px-1 py-0.5 rounded-xl border border-slate-200/60 backdrop-blur-md">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 hidden xl:inline-block select-none">
                {lng.get('menu.mclinic')}
              </span>

              <div className="bg-white rounded-[5px] shadow-sm px-1 py-0">
                <Menu as="div" className="relative top-menu-nav">
                  <MenuButton className="">
                    <NavLink href={'/dashboard'}>D</NavLink>
                  </MenuButton>
                </Menu>
              </div>

              <NavCustomers />
              <NavPatients />
              <NavScheduler />
              <NavStores />
              <NavServices />
            </div>

            {/* КАПСУЛА 2: ОБЛІК */}
            <div className="flex items-center gap-x-1 bg-slate-100/80 px-1 py-0.5 rounded-xl border border-slate-200/60 backdrop-blur-md">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 hidden xl:inline-block select-none">
                {lng.get('menu.mdocs')}
              </span>

              <NavInvoices />
              <NavPayments />
              <NavReports />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
