import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { ReceiptText } from 'lucide-react';
import { InboxIcon, TrendingUp, TrendingDown, ClipboardCheck } from 'lucide-react';

export default function NavInvoices() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const permissions = usePage().props.auth.can;
  let showMenuInvoice = false;

  if (
    permissions['invoice-incoming-all'] ||
    permissions['invoice-outgoing-all'] ||
    permissions['invoice-exchange-all'] ||
    permissions['report-all'] ||
    permissions['act-all']
  ) {
    showMenuInvoice = true;
  }
  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || showMenuInvoice) && (
        <Menu as="div" className="relative top-menu-nav">
          <MenuButton className="top-nav flex flex-col items-center">
            <ReceiptText className={'w-[24px] h-[24px] block'} />
            <span className="hidden md:block">{lng.get('menu.invoices')}</span>
          </MenuButton>
          {/*<MenuButton className="top-nav">{lng.get('menu.invoices')}</MenuButton>*/}
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
              {permissions['invoice-incoming-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/opening-balance'}>
                    <InboxIcon className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.opening.balance')}
                  </Link>
                </MenuItem>
              )}
              {permissions['invoice-incoming-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/invoice-incoming'}>
                    <TrendingUp className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.invoice-incoming')}
                  </Link>
                </MenuItem>
              )}
              {permissions['invoice-outgoing-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/invoice-outgoing'}>
                    <TrendingDown className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.invoice-outgoing')}
                  </Link>
                </MenuItem>
              )}
              {permissions['invoice-exchange-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/invoice-change'}>
                    {/*<InboxIcon className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />*/}
                    {lng.get('menu.invoice-change')}
                  </Link>
                </MenuItem>
              )}
              {permissions['act-all'] && (
                <MenuItem>
                  <Link className="submenu" href={'/acts'}>
                    <ClipboardCheck className={'w-[20px] h-[20px] mr-2'} color={'#7b7c7e'} />
                    {lng.get('menu.act')}
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
