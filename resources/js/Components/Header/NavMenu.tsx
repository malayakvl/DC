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
import { Gauge } from 'lucide-react';
export default function NavMenu() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  usePage().props.auth.user;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  usePage().props.auth.can;

  return (
    <>
      <div className="">
        {usePage().props.auth.role.length > 0 && (
          <div className="md:mt-[12px] md:mr-[20px]">
            <Menu as="div" className="relative top-menu-nav">
              <MenuButton className="top-nav flex flex-col items-center">
                <Gauge className={'w-[24px] h-[24px] block'} />
                <NavLink href={'/dashboard'}>{lng.get('menu.dashboard')}</NavLink>
              </MenuButton>
            </Menu>

            <NavCustomers />

            <NavPatients />

            <NavStores />

            <NavServices />

            <NavInvoices />

            <NavPayments />

            <NavReports />

            <NavScheduler />
          </div>
        )}
      </div>
    </>
  );
}
