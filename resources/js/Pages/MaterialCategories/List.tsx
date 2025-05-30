import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterialCategories from '../../Lang/MaterialCategories/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';

export default function List({ storeData, categoriesData, tree }) {
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
                <div className="flex inline-flex">
                  <h2>{msg.get('mCategories.title.list')}</h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/material-category/create'}>
                        {msg.get('mCategories.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <DataTable
              paginationType={PaginationType.MCATEGORIES}
              sendRequest={sendRequest}
            >
              {tree?.map(item => (
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
                        <NavLink
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
