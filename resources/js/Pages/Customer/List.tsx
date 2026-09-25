import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import lngCustomer from '../../Lang/Customer/translation';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ customerData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Customers" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('customer.title.list')}
              count={customerData?.length || 0}
              totalLabel={msg.get('customer.title.total')}
              description={msg.get('customer.title.description')}
              createHref="customer/create"
              createLabel={msg.get('customer.title.create')}
            />
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
                            className="w-15 h-15 rounded object-cover shadow-sm"
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
                        className="actn-btns"
                        title={msg.get('customer.edit')}
                        href={`customer/edit/${item.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </Link>
                      <Link
                        className="actn-btns"
                        title={msg.get('customer.attach')}
                        href={`customer/assign/${item.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px] block">
                          person_shield
                        </span>
                      </Link>
                      <Link
                        className="actn-btns"
                        title={msg.get('customer.delete')}
                        href={`customer/delete/${item.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px] block">
                          delete
                        </span>
                      </Link>
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
