import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../Lang/Customer/translation';
import lngRole from '../../Lang/Role/translation';
import { InputColor } from '@/Components/Form/InputColor';

export default function Create({
  formData,
  filialData,
  rolesData,
  imagePath,
  assignedData,
  customer,
}: {
  formData: any;
  filialData: any;
  rolesData: any;
  imagePath: string;
  assignedData: any;
  customer: any;
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  const [values, setValues] = useState({
    permissions: assignedData || [],
  });
  const msgRole = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  const renderRoleData = (roles: any) => {
    return (
      <>
        {roles?.length > 0 && (
          <ul className="list-none">
            {roles.map((option: any) => (
              <li className="mb-2" key={'option' + option}>
                <b>{option.filialName}</b>:&nbsp;&nbsp;
                {option.clinicId ? option.roleName : msgRole.get(`role.${option.roleName}`)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <AuthenticatedLayout header={<Head title={msg.get('customer.title.show')} />}>
      <Head title={msg.get('customer.title.show')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <header>
              <h2>
                <Link className="icon-back" href={'/customers'}>
                  &nbsp;
                </Link>
                {formData.name}
              </h2>
            </header>
            <div className="mt-0 ml-4 grid grid-flow-col auto-cols-max">
              <div className="columns-1">
                {imagePath && (
                  <img
                    src={`http://localhost:8000/storage/clinic/users/${formData.photo}`}
                    width={200}
                    className="float-left rounded"
                    height="auto"
                  />
                )}
              </div>
              <div className="ml-10">
                <ul className="list-none">
                  <li className="mb-2">
                    <b>{msg.get('customer.name')}</b>: {formData.name}
                  </li>
                  <li className="mb-2 py-1">
                    <b>{msg.get('customer.email')}</b>: {formData.email}
                  </li>
                  <li className="mb-2 py-1">
                    <b>{msg.get('customer.inn')}</b>: {formData.inn}
                  </li>
                  <li className="mb-2 py-1">
                    <b>{msg.get('customer.phone')}</b>: {formData.phone}
                  </li>
                </ul>
                <div className="mt-3">
                  <h5 className="underline">{msg.get('customer.role')}:</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filialData?.map((item: any) => {
                      const currentPermission = values.permissions.find(
                        (_data: any) => _data.filial_id === item.id
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
                                    <h2 className="text-base font-bold text-slate-900">
                                      {item.name}
                                    </h2>
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

                            {/* Schedule Badge Color Selection Section with InputColor */}
                            {/*<div className="flex flex-col gap-2 pt-1">*/}
                            {/*  <InputColor*/}
                            {/*    defaultColor={activeColor}*/}
                            {/*    style="w-full"*/}
                            {/*    icon="palette"*/}
                            {/*    name={`color_${item.id}`}*/}
                            {/*    label={msg.get('customer.color') || 'Колір у розкладі'}*/}
                            {/*    placeholder="#0d9488"*/}
                            {/*    tips={null}*/}
                            {/*    disabled={!isAssigned}*/}
                            {/*  />*/}
                            {/*</div>*/}

                            {/* Role Selection Dropdown */}
                            {/*<div className="flex flex-col gap-1.5">*/}
                            {/*  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">*/}
                            {/*    <span>{msg.get('customer.role') || 'Роль у цій філії'}</span>*/}
                            {/*  </label>*/}
                            {/*  <div className="relative">*/}
                            {/*    <select*/}
                            {/*      id={`role_id_${item.id}`}*/}
                            {/*      value={activeRoleId}*/}
                            {/*      onChange={(e) => {*/}
                            {/*        const tmpPerm = [...values['permissions']];*/}
                            {/*        const filialId = item.id;*/}
                            {/*        const existingIdx = tmpPerm.findIndex(*/}
                            {/*          (obj) => obj.filial_id === filialId*/}
                            {/*        );*/}
                            {/*        const val = e.target.value;*/}

                            {/*        if (existingIdx !== -1) {*/}
                            {/*          if (val) {*/}
                            {/*            tmpPerm[existingIdx].role_id = val;*/}
                            {/*          } else {*/}
                            {/*            tmpPerm.splice(existingIdx, 1);*/}
                            {/*          }*/}
                            {/*        } else if (val) {*/}
                            {/*          tmpPerm.push({*/}
                            {/*            filial_id: filialId,*/}
                            {/*            role_id: val,*/}
                            {/*            color: customer.color || '#0d9488',*/}
                            {/*          });*/}
                            {/*        }*/}
                            {/*        setValues((vals) => ({ ...vals, permissions: tmpPerm }));*/}
                            {/*      }}*/}
                            {/*      className="filter-select w-full text-[13px]"*/}
                            {/*    >*/}
                            {/*      <option value="">{msg.get('customer.select_role')}</option>*/}
                            {/*      {rolesData?.map((role: any) => (*/}
                            {/*        <option key={role.id} value={role.id}>*/}
                            {/*          {role.name}*/}
                            {/*        </option>*/}
                            {/*      ))}*/}
                            {/*    </select>*/}
                            {/*    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">*/}
                            {/*      unfold_more*/}
                            {/*    </span>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                  {renderRoleData(rolesData)}
                </div>
              </div>
            </div>
            <div className="block">
              <Link className="btn-back" title={msg.get('customer.edit')} href={`/customers`}>
                {msg.get('customer.back')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
