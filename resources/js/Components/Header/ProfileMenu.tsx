import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import Dropdown from '../../Components/Form/Dropdown';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import {
  IconBuilding,
  IconPin,
  IconBuildingWarehouse,
  IconCoin,
  IconFileImport,
  IconReceiptTax,
  IconUser,
  IconLogout,
} from '@tabler/icons-react';

export default function ProfileMenu() {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const permissions = usePage().props.auth.can;
  const source = user?.name;
  const array = source.split(' ');
  const fioResult =
    array[0] + ' ' + (array[1] ? array[1][0] : '') + '. ' + (array[2] ? array[2][0] : '') + '.';

  return (
    <div>
      <div className="md:space-x-4 md:flex md:pr-[30px] relative">
        <div className="profile-block">
          {/*<div className="icon-user"></div>*/}
          <Dropdown>
            <Dropdown.Trigger>
              <div className="relative">
                <button type="button" className="profile-top-btn">
                  <div className="mt-0 relative">
                    {/*<div className="icon-user"></div>*/}
                    <div className="flex items-center pl-1 pr-3 py-1 cursor-pointer smooth-transition">
                      <div className="h-avatar-user">
                        <img
                          src={
                            user.clinic_user.avatar
                              ? '/storage/users/' + user.clinic_user.avatar
                              : ''
                          }
                          alt={user.name}
                          className="w-[32px] h-[32px] rounded-full ring-2"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="text-left leading-tight mr-2 hidden sm:block">
                        <span className="user-profile-name">
                          {fioResult} <span className="role-tips">{usePage().props.auth.role}</span>
                        </span>
                        <small className="user-profile-role">
                          {usePage().props.auth.role.length > 0 ? (
                            <>
                              <span className="header-filial-name">{user?.current_filial}</span>
                              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <span className="clinic-name">• {user?.current_clinic?.name}</span>
                              </div>
                            </>
                          ) : (
                            user?.current_clinic?.name || lng.get('menu.no.clinic')
                          )}
                        </small>
                      </div>
                    </div>
                  </div>
                  <span className="icon-arrow-down" />
                </button>
              </div>
            </Dropdown.Trigger>

            <Dropdown.Content
              className={'dropdown-profile-contend'}
              dropdownWClasses={
                'w-[390px] p-0 rounded-2xl shadow-menu border border-slate-200/90 overflow-hidden text-slate-700 bg-white'
              }
            >
              {/* User Card Highlight */}
              <div className="p-5 pb-4 border-b border-slate-100 flex items-start space-x-3.5 bg-white">
                <div className="relative flex-shrink-0">
                  <img
                    src={user.clinic_user.avatar ? '/storage/users/' + user.clinic_user.avatar : ''}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                {/* Добавили min-w-0, чтобы имя и email не ломали флекс и не наползали на аватарку */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">
                      {user.first_name} {user.last_name}
                    </h4>
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded flex-shrink-0">
                      {user?.clinic_user?.role_title || 'Owner'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate font-normal mt-1.5">{user.email}</p>
                </div>
              </div>

              {/* Scrollable Action Groups */}
              <div className="max-h-[calc(100vh-230px)] overflow-y-auto custom-scroll divide-y divide-slate-100">
                {/* Group 1: Клініка та Локації */}
                <div className="py-2 px-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Клініка та робочий простір
                  </div>

                  {/* Item: Моя Клініка (Clinic Create / Settings) */}
                  {((usePage().props?.auth?.user?.roles?.length > 0 &&
                    usePage().props?.auth?.user?.roles[0]?.name === 'Admin') ||
                    permissions['clinic-create']) && (
                    <Link
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition"
                      href={'/clinic/create'}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm group-hover:bg-indigo-100 transition">
                          <IconBuilding className={'w-4 h-4'} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition block leading-tight">
                            {lng.get('menu.clinic')}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Налаштування бренду та реквізитів
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700">
                        <span className="font-bold text-slate-900">
                          {user?.current_clinic?.name}
                        </span>
                        <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                          ❯
                        </span>
                      </div>
                    </Link>
                  )}

                  {/* Item: Філіали */}
                  {(permissions['filial-all'] || permissions['filial-view']) && (
                    <Link
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition"
                      href={'/filials'}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm group-hover:bg-amber-100 transition">
                          <IconPin className={'w-4 h-4'} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition block leading-tight">
                            {lng.get('menu.filials')}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Мережа відділень клініки
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {user?.current_filial || 'Філія 1'}
                        </span>
                        <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                          ❯
                        </span>
                      </div>
                    </Link>
                  )}

                  {/* Item: Склади */}
                  {(permissions['store-all'] || permissions['store-view']) && (
                    <Link
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition"
                      href={'/stores'}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-sm group-hover:bg-teal-100 transition">
                          <IconBuildingWarehouse className={'w-4 h-4'} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition block leading-tight">
                            {lng.get('menu.stores')}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Залишки, стерилізація, медикаменти
                          </span>
                        </div>
                      </div>
                      <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                        ❯
                      </span>
                    </Link>
                  )}
                </div>

                {/* Group 2: Фінанси та налаштування обліку */}
                <div className="py-2 px-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Фінанси та налаштування обліку
                  </div>

                  {/* Item: Валюти */}
                  {(permissions['currency-all'] || permissions['currency-view']) && (
                    <Link
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition"
                      href={'/currency'}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm group-hover:bg-emerald-100 transition">
                          <IconCoin className={'w-4 h-4'} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition block leading-tight">
                            {lng.get('menu.currencies')}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Курси обміну: UAH (осн.), USD, EUR
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">UAH ₴</span>
                    </Link>
                  )}

                  {/* Item: Ставки податку */}
                  {(permissions['filial-all'] || permissions['filial-view']) && (
                    <Link
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition"
                      href={'/taxes'}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm group-hover:bg-purple-100 transition">
                          <IconReceiptTax className={'w-4 h-4'} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition block leading-tight">
                            {lng.get('menu.taxes')}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            ПРРО фіскалізація, ПДВ 20%
                          </span>
                        </div>
                      </div>
                      <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                        ❯
                      </span>
                    </Link>
                  )}

                  {/* Item: Імпорт */}
                  {permissions['clinic-create'] && (
                    <Link
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition"
                      href={'/import-data'}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm group-hover:bg-blue-100 transition">
                          <IconFileImport className={'w-4 h-4'} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition block leading-tight">
                            {lng.get('menu.import')}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Бази пацієнтів, послуг з Excel, 1С
                          </span>
                        </div>
                      </div>
                      <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                        ❯
                      </span>
                    </Link>
                  )}
                </div>

                {/* Group 3: Безпека та кабінет */}
                <div className="py-2 px-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Безпека та кабінет
                  </div>

                  <Link
                    className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition"
                    href={'/profile'}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-sm group-hover:bg-teal-50 group-hover:text-teal-700 transition">
                        <IconUser className={'w-4 h-4'} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition block leading-tight">
                          {lng.get('menu.profile')}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Пароль, 2FA, електронний підпис
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">⚙️</span>
                  </Link>
                </div>

                {/* Group 4: Вихід із системи */}
                <div className="p-2 bg-slate-50/70">
                  <Dropdown.Link
                    className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 transition w-full no-underline"
                    href={'/logout'}
                    method="post"
                    as="button"
                    onClick={() => {
                      localStorage.removeItem('filialName');
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center text-sm group-hover:bg-rose-200 transition">
                        <IconLogout className={'w-4 h-4'} />
                      </div>
                      <span className="text-sm font-bold block leading-tight">
                        {lng.get('menu.logout')}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-rose-400 tracking-wider">
                      ⇧ ⌘ Q
                    </span>
                  </Dropdown.Link>
                </div>
              </div>

              {/* Dropdown Footer Meta */}
              <div className="px-5 py-2.5 bg-slate-100/70 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
                  <span>ISO 27001 &amp; HIPAA</span>
                </span>
                <span>DentalCare OS v4.8</span>
              </div>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
