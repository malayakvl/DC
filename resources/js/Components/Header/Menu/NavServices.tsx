import { Menu, MenuButton } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { usePage } from '@inertiajs/react';
import React from 'react';
import NavLink from '@/Components/Links/NavLink';

export default function NavServices() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const permissions = usePage().props.auth.can;

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || permissions['service-all']) && (
        <Menu as="div" className="relative top-menu-nav">
          <MenuButton className="top-nav">
            <NavLink href={'/services'}>{lng.get('menu.services')}</NavLink>
          </MenuButton>
        </Menu>
      )}
    </>
  );
}
