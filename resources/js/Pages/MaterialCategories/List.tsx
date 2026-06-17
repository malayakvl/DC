import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterialCategories from '../../Lang/MaterialCategories/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';

export default function List({ tree }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterialCategories,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Material Categories'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex w-full mb-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {msg.get('mCategories.title.list')}
                  </h2>
                  <div className="flex-1 text-right mt-[5px]">
                    <PrimaryButton>
                      <NavLink href={'/material-category/create'}>{msg.get('mCategories.create')}</NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <section className="table-card">
              <DataTable paginationType={PaginationType.MCATEGORIES} sendRequest={sendRequest}>
                {tree?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">
                      {item.level > 0 ? '\u00A0\u00A0\u00A0' : ''}
                      {item.level == 0 ? <b>{item.name}</b> : item.name}
                    </td>
                    <td className="">{item.producerName}</td>
                    <td className="">
                      {item.percent > 0 ? `${item.percent}%` : ''}
                    </td>
                    <td className="text-right">
                      {!item.special && (
                        <>
                          <Link
                            className="btn-edit"
                            title={msg.get('mCategories.edit')}
                            href={`material-category/edit/${item.id}`}
                          />
                          <Link
                            className="btn-delete"
                            title={msg.get('mCategories.delete')}
                            href={`material-category/delete/${item.id}`}
                          />
                        </>
                      )}
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
