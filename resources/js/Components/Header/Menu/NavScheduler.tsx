import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { DoorOpen, CalendarDays, CalendarRange, Check } from 'lucide-react';

export default function NavInvoices() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const permissions = usePage().props.auth.can;
  let showMenuScheduler = false;
  if (permissions['schedule-all'] || permissions['store-all']) {
    showMenuScheduler = true;
  }
  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || showMenuScheduler) && (
        <Menu as="div" className="relative top-menu-nav">
          <MenuButton className="top-nav flex flex-col items-center">
            <CalendarDays className={'w-[24px] h-[24px] block'} />
            <span className="hidden md:block">{lng.get('menu.scheduler')}</span>
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 top-[50px] z-10 w-56 origin-top-right divide-y divide-gray-100
                                        top-submenu menu-btn
                                        transition focus:outline-none
                                        data-[closed]:scale-95 data-[closed]:transform
                                        data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75
                                        data-[enter]:ease-out data-[leave]:ease-in mt-[10px]"
          >
            <div>
              {permissions['scheduler-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/cabinets'}>
                    <DoorOpen className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.cabinets')}
                  </Link>
                </MenuItem>
              )}
              {permissions['patient-edit'] && (
                <MenuItem>
                  <Link href={'/visit-schedule-statuses'} className="submenu">
                    <Check className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.visit.schedule.statuses')}
                  </Link>
                </MenuItem>
              )}
              {permissions['scheduler-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/scheduler'}>
                    <CalendarRange className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.scheduler')}
                  </Link>
                </MenuItem>
              )}
            </div>
          </MenuItems>
        </Menu>
      )}
    </>
  );
}
