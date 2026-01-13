import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';
import lngCustomer from '../../Lang/Customer/translation';

export default function List({ clinicData, customerData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  console.log(customerData)

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Customers" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>
                    {msg.get('customer.title.list')} «{clinicData.name}»
                  </h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/customer/create'}>
                        {msg.get('customer.title.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <DataTable
              paginationType={PaginationType.CUSTOMERS}
              sendRequest={sendRequest}
            >
              {customerData?.map(item => (
                <tr className="" key={item.id}>
                  <td style={{ width: '100px' }}>
                    <img
                      src={item.avatar ? `/storage/users/${item.avatar}` : '/images/no-photo.png'}
                      width={40}
                      className="float-left rounded"
                      height="auto"
                      onError={(e) => {
                        e.currentTarget.src = '/images/no-photo.png';
                      }}
                    />
                  </td>
                  <td className="">{item.first_name}</td>
                  <td className="">{item.last_name}</td>
                  <td className="">{item.phone}</td>
                  <td className="">{item.inn}</td>
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
                    <NavLink
                      className="btn-view"
                      title={msg.get('customer.view')}
                      href={`customer/show/${item.id}`} children={undefined} />
                    <NavLink
                      className="btn-delete"
                      title={msg.get('customer.delete')}
                      href={`customer/delete/${item.id}`} children={undefined} />
                  </td>
                </tr>
              ))}
            </DataTable>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
