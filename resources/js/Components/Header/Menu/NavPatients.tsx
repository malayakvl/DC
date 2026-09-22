import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../../Lang/Header/translation';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { UsersRound, CircleCheck } from 'lucide-react';

export default function NavPatients() {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const { url, props } = usePage();

  const permissions = usePage().props.auth.can;
  const activeRoutes = ['/patients', '/patient-statuses'];
  const isActive = activeRoutes.some((route) => url.startsWith(route));

  return (
    <>
      {(usePage().props.auth.user?.roles[0]?.name === 'Admin' || permissions['patient-edit']) && (
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="top-nav flex flex-col items-center">
            <span className="hidden md:block">{lng.get('menu.patients')}</span>
          </MenuButton>
          <MenuItems
            transition
            className="top-submenu absolute left-0 mt-2 w-[380px] rounded-2xl ring-1 ring-black/5 divide-y divide-slate-100 z-50 focus:outline-none origin-top-left transition-all duration-200 data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400">
                {lng.get('menu.tipStore.customers')}
              </div>

              {permissions['patient-edit'] && (
                <MenuItem>
                  <Link
                    href={'/patients'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/patients')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <UsersRound className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-teal-900">
                          {lng.get('menu.patients')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.patients')}
                      </p>
                    </div>
                  </Link>
                </MenuItem>
              )}

              {permissions['patient-edit'] && (
                <MenuItem>
                  <Link
                    href={'/patient-statuses'}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/70 transition-colors"
                  >
                    <div
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs ${
                        url.startsWith('/patient-statuses')
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <CircleCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-900">
                          {lng.get('menu.patient.statuses')}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lng.get('menu.tipStore.patient_statuses')}
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
