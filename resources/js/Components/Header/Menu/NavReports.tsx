import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { FileSpreadsheet, Truck, Boxes, BarChart3 } from 'lucide-react';

export default function NavReports() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const { url } = usePage();
  const permissions = usePage().props.auth.can;

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || permissions['customer-all']) && (
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="top-nav flex flex-col items-center">
            <span className="hidden md:block">{lng.get('menu.reports')}</span>
          </MenuButton>
          <MenuItems
            transition
            className="top-submenu absolute left-0 mt-2 w-[380px] rounded-2xl ring-1 ring-black/5 divide-y divide-slate-100 z-50 focus:outline-none origin-top-left transition-all duration-200 data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div>
              <div className="p-2 space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  {lng.get('menu.tipStore.reports') || 'Аналітика та звіти'}
                </div>

                {permissions['customer-all'] && (
                  <MenuItem>
                    <Link
                      href={'/report-balance'}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                    >
                      <div
                        className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                          url.startsWith('/report-balance')
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-teal-900">
                            {lng.get('menu.balance')}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {lng.get('menu.tipStore.balance')}
                        </p>
                      </div>
                    </Link>
                  </MenuItem>
                )}

                {permissions['producer-all'] && (
                  <MenuItem>
                    <Link
                      href={'/report-invoices'}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                    >
                      <div
                        className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                          url.startsWith('/report-invoices')
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                            {lng.get('menu.invoices.balance')}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {lng.get('menu.tipStore.invoice_balance')}
                        </p>
                      </div>
                    </Link>
                  </MenuItem>
                )}

                {permissions['store-create'] && (
                  <MenuItem>
                    <Link
                      href={'/store-report'}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                    >
                      <div
                        className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                          url.startsWith('/store-report')
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Boxes className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                            {lng.get('menu.material.report')}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {lng.get('menu.tipStore.material_report')}
                        </p>
                      </div>
                    </Link>
                  </MenuItem>
                )}

                {permissions['store-create'] && (
                  <MenuItem>
                    <Link
                      href={'/finanses-report'}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                    >
                      <div
                        className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                          url.startsWith('/finanses-report')
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                            {lng.get('menu.finanses.report')}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {lng.get('menu.tipStore.finanses_report')}
                        </p>
                      </div>
                    </Link>
                  </MenuItem>
                )}
              </div>
            </div>
          </MenuItems>
        </Menu>
      )}
    </>
  );
}
