import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { Package, Ruler, PackageSearch, Truck, Layers } from 'lucide-react';

export default function NavStores() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  usePage().props.auth.user;
  const permissions = usePage().props.auth.can;

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || permissions['store-all']) && (
        <Menu as="div" className="relative top-menu-nav">
          <MenuButton className="top-nav flex flex-col items-center">
            <Package className={'w-[24px] h-[24px] block'} />
            <span className="hidden md:block">{lng.get('menu.materials')}</span>
          </MenuButton>
          {/*<MenuButton className="top-nav">{lng.get('menu.materials')}</MenuButton>*/}
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
              {permissions['store-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/units'}>
                    <Ruler className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.units')}
                  </Link>
                </MenuItem>
              )}
              {permissions['store-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/producers'}>
                    <PackageSearch className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.material.brands')}
                  </Link>
                </MenuItem>
              )}
              {permissions['store-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/suppliers'}>
                    <Truck className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.material.suppliers')}
                  </Link>
                </MenuItem>
              )}

              {permissions['store-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/material-categories'}>
                    <Layers className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.material.categories')}
                  </Link>
                </MenuItem>
              )}
              {permissions['store-create'] && (
                <MenuItem>
                  <Link className="submenu" href={'/materials'}>
                    <Package className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.materials')}
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
// export default NavStores;
