import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngStore from '../../Lang/Store/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ storeData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngStore,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Store'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('store.title.list')}
              count={storeData?.length || 0}
              totalLabel={msg.get('store.title.total')}
              description={msg.get('store.title.description')}
              createHref="/store/create"
              createLabel={msg.get('store.title.create')}
            />
            <section className="table-card mt-4">
              <DataTable paginationType={PaginationType.STORES} sendRequest={sendRequest}>
                {storeData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.name}</td>
                    <td className="">{item.filialName}</td>
                    <td className="">{item.ceoName}</td>
                    <td className="">{item.address}</td>
                    <td className="text-right">
                      <Link
                        className="actn-btns"
                        title={msg.get('filial.filial.edit')}
                        href={`store/edit/${item.id}`}
                        // active={route().current('filial.edit')}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </Link>
                      <Link
                        className="actn-btns hover:bg-rose-50 hover:text-rose-600"
                        title={msg.get('store.delete') || 'Видалити'}
                        href={`store/delete/${item.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px] block">delete</span>
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
