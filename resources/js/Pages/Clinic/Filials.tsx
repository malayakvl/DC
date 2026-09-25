import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFilial from '../../Lang/Filial/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function Filials({ clinicData, filialData }) {
  const dispatch = useDispatch();
  usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngFilial,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title="List" />}>
      <Head title={'Filials'} />

      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('filial.title.list')}
              count={filialData?.length || 0}
              totalLabel={msg.get('filial.title.total')}
              description={msg.get('filial.title.description')}
              createHref="/filial/create"
              createLabel={msg.get('filial.title.create')}
            />
            <section className="table-card mt-4">
              <DataTable paginationType={PaginationType.FILIALS} sendRequest={sendRequest}>
                {filialData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.name}</td>
                    <td className="">{item.address}</td>
                    <td className="">{item.inn}</td>
                    <td className="">{item.edrpou}</td>
                    <td className="text-right">
                      <Link
                        className="actn-btns"
                        title={msg.get('filial.filial.edit')}
                        href={`filial/edit/${item.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </Link>
                      <Link
                        className="actn-btns"
                        title={msg.get('filial.filial.view')}
                        href={`filial/show/${item.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px] block">visibility</span>
                      </Link>
                      {filialData.length > 1 && (
                        <Link
                          className="actn-btns"
                          title={msg.get('filial.filial.delete')}
                          href={`filial/delete/${item.id}`}
                        >
                          <span className="material-symbols-outlined text-[18px] block">delete</span>
                        </Link>
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
