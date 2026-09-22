import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import lngCustomer from '../../Lang/Customer/translation';

export default function List({ clinicData, customerData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  console.log(customerData);

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Customers" />
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
                        {msg.get('customer.title.list')}
                      </h1>

                      {/* Бейдж кількості прив'язаний чітко до заголовка */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                        {customerData?.length || 0} {msg.get('customer.title.total')}
                      </span>
                    </div>

                    {/* Підзаголовок винесено окремо під заголовок */}
                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {msg.get('customer.title.description')}
                    </p>
                  </div>

                  {/* Правий блок: Кнопка дії */}
                  <PrimaryButton>
                    <NavLink href={'customer/create'}>{msg.get('customer.title.create')}</NavLink>
                  </PrimaryButton>
                </div>
              </header>
            </section>
            <section className="table-card">
              <DataTable paginationType={PaginationType.CUSTOMERS} sendRequest={sendRequest}>
                {customerData?.map((item) => (
                  <tr
                    className="hover:bg-surface-container-low/40 transition-colors group"
                    key={item.id}
                  >
                    <td className="py-3 pl-6 pr-3" style={{ width: '100px' }}>
                      <div className="flex items-center gap-space-md justify-center">
                        <div className="relative shrink-0">
                          <img
                            src={
                              item.avatar ? `/storage/users/${item.avatar}` : '/images/no-photo.png'
                            }
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                            alt={`${item.first_name} ${item.last_name}`}
                            onError={(e) => {
                              e.currentTarget.src = '/images/no-image.png';
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.inn}</td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('customer.edit')}
                        href={`customer/edit/${item.id}`}
                      />
                      <Link
                        className="btn-assign"
                        title={msg.get('customer.attach')}
                        href={`customer/assign/${item.id}`}
                      />
                      {/*<NavLink*/}
                      {/*  className="btn-view"*/}
                      {/*  title={msg.get('customer.view')}*/}
                      {/*  href={`customer/show/${item.id}`}*/}
                      {/*/>*/}
                      <NavLink
                        className="btn-delete"
                        title={msg.get('customer.delete')}
                        href={`customer/delete/${item.id}`}
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
