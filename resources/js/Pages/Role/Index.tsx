import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngRole from '../../Lang/Role/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';

export default function Index({ roleData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title="Roles" />}>
      <Head title={'Roles'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <section>
              <header className="mb-6 mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  {/* Лівий блок: Заголовок + Бейдж + Підзаголовок */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        {msg.get('role.title.list')}
                      </h1>

                      {/* Бейдж кількості прив'язаний чітко до заголовка */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                        {roleData?.length || 0} {msg.get('role.title.total')}
                      </span>
                    </div>

                    {/* Підзаголовок винесено окремо під заголовок */}
                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {msg.get('role.title.description')}
                    </p>
                  </div>

                  {/* Правий блок: Кнопка дії */}
                  <PrimaryButton>
                    <NavLink href={'/role/create'}>{msg.get('role.title.create')}</NavLink>
                  </PrimaryButton>
                </div>
              </header>
            </section>
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <DataTable paginationType={PaginationType.ROLES} sendRequest={sendRequest}>
                {roleData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">
                      {item.clinic_id ? item.name : msg.get(`role.${item.name}`)}
                    </td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`/role/edit/${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
