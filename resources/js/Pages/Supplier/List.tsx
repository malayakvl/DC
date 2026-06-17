import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngSupplier from '../../Lang/Supplier/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';

export default function List({ listData}) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngSupplier,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Suppliers'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex w-full mb-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {msg.get('supplier.title.list')}
                  </h2>
                  <div className="flex-1 text-right mt-[5px]">
                    <PrimaryButton>
                      <NavLink href={'/supplier/create'}>{msg.get('supplier.create')}</NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <section className="table-card">
              <DataTable paginationType={PaginationType.PRODUCERS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.name}</td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`producer/edit/${item.id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`producer/delete/${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </DataTable>'
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
