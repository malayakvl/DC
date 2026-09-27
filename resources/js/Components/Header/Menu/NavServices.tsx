import { Menu, MenuButton } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { usePage } from '@inertiajs/react';
import React from 'react';
import NavLink from '@/Components/Links/NavLink';
import { BriefcaseMedical } from 'lucide-react';

export default function NavServices() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const { url, props } = usePage();
  const permissions = usePage().props.auth.can;
  const activeRoutes = ['/services'];
  const isActive = activeRoutes.some((route) => url.startsWith(route));

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || permissions['service-all']) && (
        <Menu
          as="div"
          className={`relative top-menu-nav ${
            isActive
              ? 'text-teal-700 bg-teal-50/90 ring-1 ring-teal-500/20 shadow-xs rounded-[8px]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <MenuButton className="top-nav flex flex-col items-center">
            <NavLink href={'/services'}>{lng.get('menu.services')}</NavLink>
          </MenuButton>
        </Menu>
      )}
    </>
  );
}
