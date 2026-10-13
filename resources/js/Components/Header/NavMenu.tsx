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
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  const { auth } = usePage().props as unknown as {
    auth: {
      user: any;
      can: any;
      role: string[] | any[];
    };
  };

  return (
    <>
      <div className="">
        {auth.role.length > 0 && (
          <div className="md:mt-[-5px] md:mr-[20px]">
            <Menu as="div" className="relative top-menu-nav">
              <MenuButton className="top-nav flex flex-col items-center">
                <NavLink href={'/dashboard'}>{lng.get('menu.dashboard')}</NavLink>
              </MenuButton>
            </Menu>

            <NavCustomers />

            <NavPatients />

            <NavScheduler />

            <NavStores />

            <NavServices />

            <NavInvoices />

            <NavPayments />

            <NavReports />
          </div>
        )}
      </div>
    </>
  );
}
