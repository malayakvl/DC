import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import { Link } from '@inertiajs/react';
import lngCustomer from '../../Lang/Customer/translation';
import StickyFormFooter from '../../Components/Common/StickyFormFooter';

export default function AssignFilialEdit({
  clinicData,
  filialData,
  rolesData,
  customer,
  assignedData,
}) {
  useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  const { processing, recentlySuccessful } = useForm();

  const [values, setValues] = useState({
    permissions: assignedData || [],
  });

  const submit = (e) => {
    e.preventDefault();
    router.post(`/customer/assign-submit`, {
      customerId: customer.id,
      clinicId: clinicData.id,
      values,
    });
  };

  return (
    <AuthenticatedLayout
      header={<Head title={msg.get('customer.attach') || "Прив'язка до філій"} />}
    >
      <Head title={msg.get('customer.attach') || "Прив'язка до філій"} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-6 mb-8 content-data bg-content flex flex-col gap-6">
            {/* Top Navigation & Action Line */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                {/* Title & Back link */}
                <div className="flex items-center gap-3 mt-1">
                  <Link
                    href="/customers"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all shadow-xs group"
                    title={msg.get('customer.back') || 'Повернутись'}
                  >
                    <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">
                      arrow_back
                    </span>
                  </Link>
                  <div>
                    <h1 className="text-xl sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
                      <span>{msg.get('customer.attach') || "Пов'язати з філіалами"}</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Керування робочими локаціями, посадовими правами та індивідуальним колірним
                      кодуванням в розкладі
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Status Badges */}
              <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ID: DC-{customer.id}</span>
                </div>
              </div>
            </div>

            {/* Staff Summary Banner Card */}
            <section className="bg-white rounded-xl p-4 sm:p-5 shadow-xs relative overflow-hidden border border-slate-100">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-teal-500/5 via-emerald-500/5 to-transparent pointer-events-none hidden md:block"></div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-xs"
                      title="Співробітник"
                    >
                      <span className="material-symbols-outlined text-[12px]">grade</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold text-slate-900">{customer.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase">
                        {customer.position || 'Лікар / Співробітник'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs sm:text-sm text-slate-500 flex-wrap">
                      {customer.phone && (
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-teal-600">
                            call
                          </span>
                          <span>{customer.phone}</span>
                        </span>
                      )}
                      {customer.email && (
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-teal-600">
                            mail
                          </span>
                          <span>{customer.email}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Form */}
            <form onSubmit={submit} className="flex flex-col gap-6">
              {/* Branch Settings: Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filialData?.map((item) => {
                  const currentPermission = values.permissions.find(
                    (_data) => _data.filial_id === item.id
                  );
                  const isAssigned = Boolean(currentPermission);
                  const activeColor = currentPermission?.color || customer.color || '#0d9488';
                  const activeRoleId = currentPermission?.role_id || '';

                  return (
                    <section
                      key={item.id}
                      className="bg-white rounded-xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden border border-slate-100 group hover:shadow-md transition-shadow"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-teal-600"></div>

                      <div className="flex flex-col gap-4">
                        {/* Branch Header Bar */}
                        <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-teal-600 shrink-0">
                              <span className="material-symbols-outlined text-[24px]">
                                apartment
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h2 className="text-base font-bold text-slate-900">{item.name}</h2>
                                {isAssigned && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold uppercase">
                                    Підключено
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] opacity-70">
                                  location_on
                                </span>
                                <span>{item.address || 'Філія медичної мережі'}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Role Selection Dropdown */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                            <span>{msg.get('customer.role') || 'Роль у цій філії'}</span>
                          </label>
                          <div className="relative">
                            <select
                              id={`role_id_${item.id}`}
                              value={activeRoleId}
                              onChange={(e) => {
                                const tmpPerm = [...values['permissions']];
                                const filialId = item.id;
                                const existingIdx = tmpPerm.findIndex(
                                  (obj) => obj.filial_id === filialId
                                );
                                const val = e.target.value;

                                if (existingIdx !== -1) {
                                  if (val) {
                                    tmpPerm[existingIdx].role_id = val;
                                  } else {
                                    tmpPerm.splice(existingIdx, 1);
                                  }
                                } else if (val) {
                                  tmpPerm.push({
                                    filial_id: filialId,
                                    role_id: val,
                                    color: customer.color || '#0d9488',
                                  });
                                }
                                setValues((vals) => ({ ...vals, permissions: tmpPerm }));
                              }}
                              className="filter-select w-full text-[13px]"
                            >
                              <option value="">— Оберіть роль або вимкніть —</option>
                              {rolesData?.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
                              unfold_more
                            </span>
                          </div>
                        </div>

                        {/* Schedule Badge Color Selection Section */}
                        <div className="flex flex-col gap-2 pt-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-teal-600">
                                palette
                              </span>
                              <span>{msg.get('customer.color') || 'Колір у розкладі'}</span>
                            </label>
                            <span className="text-xs font-mono text-slate-500 uppercase font-semibold">
                              {activeColor}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="relative flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 shadow-xs">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 shadow-inner"
                                style={{ backgroundColor: activeColor }}
                              >
                                <span className="material-symbols-outlined text-[14px] text-white">
                                  water_drop
                                </span>
                              </div>
                              <input
                                id={`color_${item.id}`}
                                type="text"
                                value={activeColor}
                                disabled={!isAssigned}
                                onChange={(e) => {
                                  const tmpPerm = [...values['permissions']];
                                  const filialId = item.id;
                                  const existingIdx = tmpPerm.findIndex(
                                    (obj) => obj.filial_id === filialId
                                  );
                                  if (existingIdx !== -1) {
                                    tmpPerm[existingIdx].color = e.target.value;
                                    setValues((vals) => ({ ...vals, permissions: tmpPerm }));
                                  }
                                }}
                                className="customer-color-field"
                              />
                              <input
                                type="color"
                                value={activeColor}
                                disabled={!isAssigned}
                                onChange={(e) => {
                                  const tmpPerm = [...values['permissions']];
                                  const filialId = item.id;
                                  const existingIdx = tmpPerm.findIndex(
                                    (obj) => obj.filial_id === filialId
                                  );
                                  if (existingIdx !== -1) {
                                    tmpPerm[existingIdx].color = e.target.value;
                                    setValues((vals) => ({ ...vals, permissions: tmpPerm }));
                                  }
                                }}
                                className="absolute right-2 opacity-0 w-8 h-8 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>

              {/* Master Action Footer Bar */}
              <StickyFormFooter
                backUrl="/customers"
                backLabel={msg.get('customer.back') || 'Повернутись'}
                saveLabel={msg.get('customer.save') || 'Зберегти'}
                processingLabel="Збереження..."
                successMessage={msg.get('customer.saved') || 'Збережено успішно!'}
                processing={processing}
                recentlySuccessful={recentlySuccessful}
              />
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
