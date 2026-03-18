import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPaymentMethod from '../../Lang/PaymentMethod/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';

export default function List({ listData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPaymentMethod,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // 
  }, []);

  return (
    <AuthenticatedLayout header={<Head title={msg.get('payment_method.title.list')} />}>
      <Head title={msg.get('payment_method.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>{msg.get('payment_method.title.list')}</h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/payment-method/create'}>
                        {msg.get('payment_method.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <DataTable
              paginationType={PaginationType.PAYMENTMETHODS}
              sendRequest={sendRequest}
            >
              {listData?.map(item => (
                <tr className="" key={item.id}>
                  <td className="">{item.name}</td>
                  <td className="">{item.currency_name}</td>
                  <td className="text-right">
                    <Link
                      className="btn-edit"
                      title={msg.get('payment_method.edit')}
                      href={`/payment-method/edit/${item.id}`}
                    />
                    <Link
                      className="btn-delete"
                      title={msg.get('payment_method.delete')}
                      href={`/payment-method/delete/${item.id}`}
                    />
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
