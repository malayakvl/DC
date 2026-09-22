import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { UsersRound, ShieldCheck } from 'lucide-react';

export default function NavCustomers() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  //   const permissions = usePage().props.auth.can;

  const { url, props } = usePage();
  const permissions = props.auth.can;

  const activeRoutes = ['/customers', '/roles'];
  const isActive = activeRoutes.some((route) => url.startsWith(route));

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || permissions['customer-all']) && (
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
              isActive
                ? 'text-teal-700 bg-teal-50/90 ring-1 ring-teal-500/20 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <span className="text-[13px]">{lng.get('menu.customers')}</span>
          </MenuButton>
          <MenuItems
            transition
            className="top-submenu absolute left-0 mt-2 w-[380px] rounded-2xl ring-1 ring-black/5 divide-y divide-slate-100 z-50 focus:outline-none origin-top-left transition-all duration-200 data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {/* Section 1: Catalog & Operations */}
            <div className="p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400">
                {lng.get('menu.tipStore.customers')}
              </div>

              {permissions['customer-all'] && (
                <MenuItem>
                  <Link
                    href={'/customers'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/customers')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <UsersRound className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-teal-900">
                          {lng.get('menu.customers')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.customers_details')}
                      </p>
                    </div>
                  </Link>
                </MenuItem>
              )}

              {permissions['customer-all'] && (
                <MenuItem>
                  <Link
                    href={'/roles'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/roles')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                          {lng.get('menu.customer.roles')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.customer_roles')}
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
