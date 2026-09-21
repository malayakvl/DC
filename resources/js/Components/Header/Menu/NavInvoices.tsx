import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { ClipboardList, FilePlus, FileMinus, FileCheck, ArrowLeftRight } from 'lucide-react';

export default function NavInvoices() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const { url, props } = usePage();

  const permissions = usePage().props.auth.can;
  const activeRoutes = ['/patients', '/patient-statuses'];
  const isActive = activeRoutes.some((route) => url.startsWith(route));
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
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="top-nav flex flex-col items-center">
            <span className="hidden md:block">{lng.get('menu.invoices')}</span>
          </MenuButton>
          <MenuItems
            transition
            className="top-submenu absolute left-0 mt-2 w-[380px] rounded-2xl ring-1 ring-black/5 divide-y divide-slate-100 z-50 focus:outline-none origin-top-left transition-all duration-200 data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400">
                {lng.get('menu.tipStore.accounter_docs')}
              </div>

              {permissions['invoice-incoming-all'] && (
                <MenuItem>
                  <Link
                    href={'/opening-balance'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/opening-balance')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-teal-900">
                          {lng.get('menu.opening.balance')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.opening_balance')}
                      </p>
                    </div>
                  </Link>
                </MenuItem>
              )}

              {permissions['invoice-incoming-all'] && (
                <MenuItem>
                  <Link
                    href={'/invoice-incoming'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/invoice-incoming')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <FilePlus className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                          {lng.get('menu.invoice-incoming')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.invoice_incoming')}
                      </p>
                    </div>
                  </Link>
                </MenuItem>
              )}
              {permissions['invoice-outgoing-all'] && (
                <MenuItem>
                  <Link
                    href={'/invoice-outgoing'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/invoice-outgoing')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <FileMinus className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                          {lng.get('menu.invoice-outgoing')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.invoice_outgoing')}
                      </p>
                    </div>
                  </Link>
                </MenuItem>
              )}
              {permissions['invoice-outgoing-all'] && (
                <MenuItem>
                  <Link
                    href={'/invoice-exchange'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/invoice-exchange')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ArrowLeftRight className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                          {lng.get('menu.invoice-change')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.invoice_change')}
                      </p>
                    </div>
                  </Link>
                </MenuItem>
              )}
              {permissions['act-all'] && (
                <MenuItem>
                  <Link
                    href={'/acts'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/acts')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                          {lng.get('menu.acts')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.acts')}
                      </p>
                    </div>
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
