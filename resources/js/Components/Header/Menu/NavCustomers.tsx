import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';

export default function NavCustomers(props) {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const permissions = usePage().props.auth.can;

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' ||
        permissions['customer-all']) && (
        <Menu as="div" className="relative top-menu-nav">
          <MenuButton className="inline-flex items-center text-sm">
            {lng.get('menu.customers')}
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 top-[20px] z-10 w-56 origin-top-right divide-y divide-gray-100
                                        bg-white
                                        transition focus:outline-none
                                        data-[closed]:scale-95 data-[closed]:transform
                                        data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75
                                        data-[enter]:ease-out data-[leave]:ease-in mt-[10px] border rounded-md"
          >
            <div>
              {permissions['customer-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/customers'}>
                    {lng.get('menu.customer.list')}
                  </Link>
                </MenuItem>
              )}
              {permissions['customer-all'] && (
                <MenuItem>
                  <Link href={'/roles'} className="submenu">
                    {lng.get('menu.customer.roles')}
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
