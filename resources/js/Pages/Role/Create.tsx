import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngRole from '../../Lang/Role/translation';
import { PERMISSION_CATEGORIES } from '@/Constants/Permissions';
import StickyFormFooter from '../../Components/Common/StickyFormFooter';
import FormHeader from '../../Components/Common/FormHeader';

// Расширенный хелпер для иконок модулей (категорий)
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

// Хелпер для иконок прав (пермишенов)
const getPermissionVisual = (permName) => {
  const lower = permName.toLowerCase();
  if (
    lower.includes('delete') ||
    lower.includes('remove') ||
    lower.includes('сторнування') ||
    lower.includes('видалити')
  ) {
    return {
      icon: 'delete_forever',
      color: 'text-rose-600',
      hoverGroup: 'group-hover:text-rose-600',
    };
  }
  if (
    lower.includes('create') ||
    lower.includes('створити') ||
    lower.includes('додати') ||
    lower.includes('add')
  ) {
    return { icon: 'add_circle', color: 'text-teal-600', hoverGroup: 'group-hover:text-teal-700' };
  }
  if (lower.includes('edit') || lower.includes('редагувати') || lower.includes('змінити')) {
    return { icon: 'edit_note', color: 'text-teal-600', hoverGroup: 'group-hover:text-teal-700' };
  }
  if (
    lower.includes('analytics') ||
    lower.includes('звіти') ||
    lower.includes('аудит') ||
    lower.includes('аналітика')
  ) {
    return { icon: 'insights', color: 'text-teal-600', hoverGroup: 'group-hover:text-teal-700' };
  }
  return { icon: 'visibility', color: 'text-teal-600', hoverGroup: 'group-hover:text-teal-700' };
};

export default function RoleForm({ roleData, permissionData, rolePermissions = [] }) {
  const authUser = usePage().props.auth?.user;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  const isEditing = Boolean(roleData);
  const normalizedRolePermissions = rolePermissions.map((id) => parseInt(id));

  const { processing, recentlySuccessful } = useForm();

  const [values, setValues] = useState({
    name: roleData ? roleData.name : '',
    permissions: normalizedRolePermissions,
  });

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

  const setAllPermissions = (checkedState) => {
    if (checkedState) {
      const allIds = permissionData.map((p) => parseInt(p.id));
      setValues((values) => ({ ...values, permissions: allIds }));
    } else {
      setValues((values) => ({ ...values, permissions: [] }));
    }
  };

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

  const submit = (e) => {
    e.preventDefault();
    const endpoint = isEditing ? `/role/update/${roleData.id}` : `/role/store`;
    router.post(endpoint, values);
  };

  const titleText = isEditing
    ? msg.get('role.title.edit') || 'Редагувати роль'
    : msg.get('role.title.create') || 'Створити роль';

  return (
    <AuthenticatedLayout header={<Head title={titleText} />}>
      <Head title={msg.get('role.title.create') || 'Створити роль'} />
      <div className="w-full bg-background font-body-md text-on-surface antialiased min-h-screen pb-12">
        <div className="max-w-[1520px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <form onSubmit={submit} className="flex flex-col gap-6">
            <FormHeader
              title={roleData?.id ? msg.get('role.title.edit') : msg.get('role.title.create')}
              description={msg.get('role.title.description')}
              backUrl="/roles"
              processing={processing}
              saveText={msg.get('role.save') || 'Зберегти зміни'}
            />
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-6 border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
                      placeholder="Введіть назву ролі..."
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 text-gray-900 font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-600 transition-all border border-gray-200"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-between h-full gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        Керування доступом
                      </span>
                      <span className="text-base text-gray-900 font-bold">Безпека даних</span>
                    </div>
                    <span className="material-symbols-outlined text-teal-700 text-[24px]">
                      verified_user
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Оберіть потрібні модулі або скористайтеся швидкими сценаріями нижче.
                  </p>
                </div>
              </div>

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

            {/* Сетка модулей с динамическими иконками */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {PERMISSION_CATEGORIES.map((colName) => {
                const filteredPermissions =
                  permissionData && permissionData.filter((item) => item.name.includes(colName));

                if (!filteredPermissions || filteredPermissions.length === 0) {
                  return null;
                }

                const categoryMeta = getCategoryIcon(colName);
                const categoryPermissionIds = filteredPermissions.map((p) => parseInt(p.id));
                const allModuleChecked =
                  categoryPermissionIds.length > 0 &&
                  categoryPermissionIds.every((id) => values.permissions.includes(id));

                return (
                  <div
                    key={colName}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden border border-gray-100"
                  >
                    <div className="p-4 bg-gray-50 flex items-center justify-between gap-2 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${categoryMeta.bg} ${categoryMeta.text} flex items-center justify-center`}
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

                    <div className="p-4 flex flex-col gap-2">
                      {filteredPermissions.map((_p) => {
                        const permissionId = parseInt(_p.id);
                        const isChecked = values['permissions'].includes(permissionId);
                        const visual = getPermissionVisual(_p.name);

                        return (
                          <label
                            key={_p.id}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 pr-2">
                              <span
                                className={`material-symbols-outlined text-[18px] ${visual.color}`}
                              >
                                {visual.icon}
                              </span>
                              <div className="flex flex-col">
                                <span
                                  className={`text-sm font-medium text-gray-800 ${visual.hoverGroup} transition-colors`}
                                >
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

            <StickyFormFooter
              backUrl="/roles"
              backLabel={msg.get('role.back') || 'Повернутись'}
              saveLabel={msg.get('role.save') || 'Зберегти'}
              processingLabel="Збереження..."
              successMessage={msg.get('role.saved') || 'Збережено успішно!'}
              processing={processing}
              recentlySuccessful={recentlySuccessful}
            />
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
