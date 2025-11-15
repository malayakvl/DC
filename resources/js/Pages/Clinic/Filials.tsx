import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
x
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFilial from '../../Lang/Filial/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';

export default function Filials({ clinicData, filialData, permissions }) {
  const dispatch = useDispatch();
  const user = usePage().props.auth.user;
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
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>
                    {msg.get('filial.title.filials')} «{clinicData.name}»
                  </h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/filial/create'}>
                        {msg.get('filial.title.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <DataTable
              paginationType={PaginationType.FILIALS}
              sendRequest={sendRequest}
            >
              {filialData?.map(item => (
                <tr className="" key={item.id}>
                  <td className="">{item.name}</td>
                  <td className="">{item.address}</td>
                  <td className="">{item.inn}</td>
                  <td className="">{item.edrpou}</td>
                  <td className="text-right">
                    <Link
                      className="btn-edit"
                      title={msg.get('filial.filial.edit')}
                      href={`filial/edit/${item.id}`}
                    />
                    <NavLink
                      className="btn-view"
                      title={msg.get('filial.filial.view')}
                      href={`filial/show/${item.id}`}
                    />
                    {filialData.length > 1 && (
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`filial/delete/${item.id}`}
                      />
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
