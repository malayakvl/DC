import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngRole from '../../Lang/Role/translation';
import { Link } from '@inertiajs/react';
import InputText from '../../Components/Form/InputText';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { PERMISSION_CATEGORIES } from '@/Constants/Permissions';

export default function Edit({ roleData, permissionData, rolePermissions }) {
  useDispatch();
  const authUser = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  // Перетворюємо всі ID дозволів на цілі числа для стабільності
  const normalizedRolePermissions = rolePermissions.map((id) => parseInt(id));

  const [values, setValues] = useState({
    name: roleData.name,
    permissions: normalizedRolePermissions,
  });

  const { processing, recentlySuccessful } = useForm();

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handlePermission = (el) => {
    const tmpPermis = [...values.permissions];
    const permissionId = parseInt(el.id);

    if (el.checked) {
      if (!tmpPermis.includes(permissionId)) {
        tmpPermis.push(permissionId);
      }
    } else {
      const index = tmpPermis.indexOf(permissionId);
      if (index > -1) {
        tmpPermis.splice(index, 1);
      }
    }
    setValues((values) => ({
      ...values,
      ['permissions']: tmpPermis,
    }));
  };

  // Швидкий сценарій: увімкнути/вимкнути всі дозволи одразу
  const setAllPermissions = (checkedState) => {
    if (checkedState) {
      const allIds = permissionData.map((p) => parseInt(p.id));
      setValues((values) => ({ ...values, permissions: allIds }));
    } else {
      setValues((values) => ({ ...values, permissions: [] }));
    }
  };

  // Масовий перемикач для конкретної категорії (модуля)
  const toggleModuleGroup = (colName, checkedState) => {
    const filteredPermissions = permissionData.filter((item) => item.name.includes(colName));
    const targetIds = filteredPermissions.map((p) => parseInt(p.id));

    setValues((prev) => {
      let updatedPermissions = [...prev.permissions];
      if (checkedState) {
        targetIds.forEach((id) => {
          if (!updatedPermissions.includes(id)) updatedPermissions.push(id);
        });
      } else {
        updatedPermissions = updatedPermissions.filter((id) => !targetIds.includes(id));
      }
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const getCategoryIcon = (colName) => {
    const lower = colName.toLowerCase();
    console.log(lower);

    // Склад и материалы / Storage
    switch (lower) {
      case 'clinic':
        return { icon: 'domain', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'filial':
        return { icon: 'location_on', bg: 'bg-teal-500/15', text: 'text-teal-700' }; // Иконка для филиала
      case 'customer':
        return { icon: 'handshake', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'store':
        return { icon: 'storefront', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'invoice-incoming':
        return { icon: 'post_add', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'invoice-outgoing':
        return { icon: 'receipt_long', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'invoice-change':
        return { icon: 'swap_horiz', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'opening-balance':
        return { icon: 'playlist_add', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'material':
        return { icon: 'inventory_2', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'service':
        return { icon: 'medical_services', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'producer':
        return { icon: 'factory', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'employee':
        return { icon: 'badge', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'report':
        return { icon: 'insights', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'scheduler':
        return { icon: 'calendar_month', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'patient':
        return { icon: 'personal_injury', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'settings':
        return { icon: 'settings', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'act':
        return { icon: 'description', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      case 'role':
        return { icon: 'admin_panel_settings', bg: 'bg-teal-500/15', text: 'text-teal-700' };
      default:
        return { icon: 'grid_view', bg: 'bg-teal-500/15', text: 'text-teal-700' };
    }

    // Дефолтная иконка для остальных модулей
    return { icon: 'grid_view', bg: 'bg-teal-500/15', text: 'text-teal-700' };
  };

  const submit = (e) => {
    e.preventDefault();
    router.post(`/role/update/${roleData.id}`, values);
  };

  return (
    <AuthenticatedLayout header={<Head title={msg.get('role.title.edit') || 'Редагувати роль'} />}>
      <Head title={msg.get('role.title.edit') || 'Редагувати роль'} />

      {/* Підключення шрифтів та Material Symbols, якщо вони ще не підключені глобально */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      <div className="w-full bg-background font-body-md text-on-surface antialiased min-h-screen pb-12">
        <div className="max-w-[1520px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <form onSubmit={submit} className="flex flex-col gap-6">
            {/* Ххлібні крихти та верхня панель дій */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 font-label-md text-sm text-outline">
                  <Link
                    href="/roles"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">shield_person</span>
                    <span>Налаштування доступу</span>
                  </Link>
                  <span className="text-outline-variant">/</span>
                  <Link href="/roles" className="hover:text-primary transition-colors">
                    Ролі та права
                  </Link>
                  <span className="text-outline-variant">/</span>
                  <span className="text-on-surface font-bold">{msg.get('role.title.edit')}</span>
                </div>
                <Link
                  href={`/roles`}
                  className="inline-flex items-center gap-1 text-sm text-primary font-bold hover:text-primary-container transition-colors py-1 px-3 rounded-lg hover:bg-surface-container-low"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>{msg.get('role.back') || 'До списку ролей'}</span>
                </Link>
              </div>

              {/* Заголовок та основні кнопки збереження */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-700 shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">
                      admin_panel_settings
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl font-bold tracking-tight text-on-surface">
                        {msg.get('role.title.edit')}
                      </h1>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-teal-50 text-teal-700 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                        Системна роль
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Конфігурація гранулярних прав доступу, операційних дозволів та обмежень для
                      посади
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
                  <PrimaryButton
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 text-white font-semibold shadow-md hover:bg-teal-800 transition-all"
                  >
                    <span>{msg.get('role.save')}</span>
                  </PrimaryButton>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-teal-600 font-medium">{msg.get('role.saved')}</p>
                  </Transition>
                </div>
              </div>
            </div>

            {/* Картка з базовими полями (Назва та Опис) */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-6 border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Назва ролі */}
                <div className="lg:col-span-6 flex flex-col gap-1.5">
                  <label
                    className="text-sm text-gray-600 flex items-center gap-1 font-bold"
                    htmlFor="name"
                  >
                    <span className="material-symbols-outlined text-[16px] text-teal-700">
                      badge
                    </span>
                    <span>{msg.get('role.name')}</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[20px] text-teal-700">
                      key
                    </span>
                    <input
                      id="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 text-gray-900 font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-600 transition-all border border-gray-200"
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    ID ролі в системі:{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                      ROLE_ID_{roleData.id}
                    </code>
                  </span>
                </div>

                {/* Інформаційний блок щодо призначених користувачів */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        Призначено користувачів
                      </span>
                      <span className="text-base text-gray-900 font-bold">Активна посада</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-teal-700 text-[24px]">
                        verified_user
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Зміна прав цієї ролі миттєво вплине на всіх користувачів, яким вона призначена.
                  </p>
                </div>
              </div>

              {/* Панель швидких сценаріїв */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500 font-bold">Швидкі сценарії:</span>
                  <button
                    type="button"
                    onClick={() => setAllPermissions(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">select_all</span>
                    <span>Увімкнути всі дозволи</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllPermissions(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    <span>Зняти всі дозволи</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Матриця прав: Сітка категорій (модулів) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {PERMISSION_CATEGORIES.map((colName) => {
                const filteredPermissions =
                  permissionData && permissionData.filter((item) => item.name.includes(colName));

                if (!filteredPermissions || filteredPermissions.length === 0) {
                  return null;
                }

                // Перевіряємо чи вибрані всі дозволи в цій категорії для загального світчера
                const categoryMeta = getCategoryIcon(colName);
                const categoryPermissionIds = filteredPermissions.map((p) => parseInt(p.id));
                const allModuleChecked = categoryPermissionIds.every((id) =>
                  values.permissions.includes(id)
                );

                return (
                  <div
                    key={colName}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden border border-gray-100"
                  >
                    {/* Заголовок модуля звітів/прав */}
                    <div className="p-4 bg-gray-50 flex items-center justify-between gap-2 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 ${categoryMeta.bg} ${categoryMeta.text} rounded-xl flex items-center justify-center`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {categoryMeta.icon}
                          </span>
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-gray-900 leading-tight">
                            {msg.get(`role.${colName}`) || colName}
                          </h2>
                          <span className="text-xs text-gray-400">Модуль системи</span>
                        </div>
                      </div>

                      {/* Світчер для вибору всього модуля */}
                      <label
                        className="relative inline-flex items-center cursor-pointer"
                        title="Перемкнути весь модуль"
                      >
                        <input
                          type="checkbox"
                          checked={allModuleChecked}
                          onChange={(e) => toggleModuleGroup(colName, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-700"></div>
                      </label>
                    </div>

                    {/* Список дозволів усередині категорії */}
                    <div className="p-4 flex flex-col gap-2">
                      {filteredPermissions.map((_p) => {
                        const permissionId = parseInt(_p.id);
                        const isChecked = values['permissions'].includes(permissionId);

                        return (
                          <label
                            key={_p.id}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 pr-2">
                              <span className="material-symbols-outlined text-[18px] text-teal-600">
                                check_small
                              </span>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-800 group-hover:text-teal-700 transition-colors">
                                  {msg.get(`role.${_p.name}`) || _p.name}
                                </span>
                              </div>
                            </div>

                            <input
                              id={`${_p.id}`}
                              name={`remember[${_p.id}]`}
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => handlePermission(e.target)}
                              className="w-5 h-5 rounded text-teal-700 focus:ring-teal-600 accent-teal-700 cursor-pointer"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Нижній блок збереження */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>
                  Власник акаунта:{' '}
                  <strong className="text-gray-800">{authUser?.name || 'Адміністратор'}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  href={`/roles`}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-semibold transition-colors text-center"
                >
                  {msg.get('role.back') || 'Скасувати'}
                </Link>
                <PrimaryButton
                  disabled={processing}
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>{msg.get('role.save')}</span>
                </PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
