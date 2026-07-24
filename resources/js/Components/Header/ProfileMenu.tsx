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
                  <div className="mt-0 relative text-white">
                    {/*<div className="icon-user"></div>*/}
                    <div>
                      <div className="h-avatar-user">
                        <img
                          src={
                            user.clinic_user.avatar
                              ? '/storage/users/' + user.clinic_user.avatar
                              : ''
                          }
                          alt={user.name}
                          className="w-[40px] h-[40px] rounded-full"
                        />
                      </div>
                      <div className="h-info-user">
                        <span className="fio-user">{fioResult}</span>
                        <small className="user-profile-role">
                          {usePage().props.auth.role.length > 0 ? (
                            <>
                              <span className="clinic-name">{user?.current_clinic?.name}</span>
                              <span className="flex gap-[12px]">
                                <small className="header-filial-name">{user?.current_filial}</small>
                                <span>{' \u00B7'}</span>
                                {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                                <span className="clinic-role">{usePage().props.auth.role}</span>
                              </span>
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
              dropdownWClasses={'w-[320px] '}
            >
              <span className="dropdown-span-header hm-title">{lng.get('menu.user.hprofile')}</span>
              <div className="flex flex-row h-user-block">
                <div>
                  <img
                    src={user.clinic_user.avatar ? '/storage/users/' + user.clinic_user.avatar : ''}
                    alt={user.name}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div>
                  <span className="h-user-name">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="h-user-email">{user.email}</span>
                </div>
              </div>

              {(usePage().props?.auth?.user?.roles?.length > 0 &&
                // eslint-disable-next-line react-hooks/rules-of-hooks
                usePage().props?.auth?.user?.roles[0]?.name === 'Admin') ||
                (permissions['clinic-create'] && (
                  <Link className="dropdown-span-header c-name-header" href={'/clinic/create'}>
                    <div className="flex flex-row">
                      <IconBuilding className={'mr-2'} />
                      {lng.get('menu.clinic')}
                    </div>
                    <div className={'d-clinic-dropdown'}>{user?.current_clinic?.name} ❯</div>
                  </Link>
                ))}

              {(permissions['filial-all'] || permissions['filial-view']) && (
                <Link className="dropdown-span-header c-name-header" href={'/filials'}>
                  <div className="flex flex-row">
                    <IconPin className={'mr-2'} />
                    {lng.get('menu.filials')}
                  </div>
                  <div className={'d-clinic-dropdown'}>{user?.current_filial} ❯</div>
                </Link>
              )}
              {(permissions['store-all'] || permissions['store-view']) && (
                <Link className="dropdown-span-header" href={'/stores'}>
                  <IconBuildingWarehouse className={'mr-2'} />
                  {lng.get('menu.stores')}
                </Link>
              )}
              {(permissions['currency-all'] || permissions['currency-view']) && (
                <Link className="dropdown-span-header" href={'/currency'}>
                  <IconCoin className={'mr-2'} />
                  {lng.get('menu.currencies')}
                </Link>
              )}
              {(permissions['filial-all'] || permissions['filial-view']) && (
                <Link className="dropdown-span-header" href={'/taxes'}>
                  <IconReceiptTax className={'mr-2'} />
                  {lng.get('menu.taxes')}
                </Link>
              )}
              {permissions['clinic-create'] && (
                <Link className="dropdown-span-header h-import" href={'/import-data'}>
                  <IconFileImport className={'mr-2'} />
                  {lng.get('menu.import')}
                </Link>
              )}
              <div className="dropdown-span-separator"></div>
              <Link className="dropdown-span-header dh-profile" href={'/profile'}>
                <IconUser className={'mr-2'} />
                {lng.get('menu.profile')}
              </Link>
              <div className="dropdown-span-separator"></div>
              <Dropdown.Link
                className="dropdown-logout"
                href={'/logout'}
                method="post"
                as="button"
                onClick={() => {
                  localStorage.removeItem('filialName');
                }}
              >
                <IconLogout className={'mr-2'} />
                {lng.get('menu.logout')}
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
