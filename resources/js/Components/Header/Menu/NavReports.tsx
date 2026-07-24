import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { ChartColumn, Truck, ContactRound, Boxes, BadgeDollarSign } from 'lucide-react';

export default function NavReports() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const permissions = usePage().props.auth.can;

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || permissions['customer-all']) && (
        <Menu as="div" className="relative top-menu-nav">
          <MenuButton className="top-nav flex flex-col items-center">
            <ChartColumn className={'w-[24px] h-[24px] block'} />
            <span className="hidden md:block">{lng.get('menu.reports')}</span>
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
              {permissions['customer-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/report-balance'}>
                    <ContactRound className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.balance')}
                  </Link>
                </MenuItem>
              )}
              {permissions['producer-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/report-invoices'}>
                    <Truck className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.invoices.balance')}
                  </Link>
                </MenuItem>
              )}
              {permissions['store-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/store-report'}>
                    <Boxes className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.material.report')}
                  </Link>
                </MenuItem>
              )}
              {permissions['store-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/finanses-report'}>
                    <BadgeDollarSign className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.finanses.report')}
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
