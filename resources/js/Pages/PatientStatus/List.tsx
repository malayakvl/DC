import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatientStatus from '../../Lang/PatientStatus/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';

export default function List({ listData, permissions }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatientStatus,
    locale: appLang,
  });
  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Patient Status'} />}>
      <Head title={'Unit'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>{msg.get('status.title.list')}</h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/patient-status/create'}>
                        {msg.get('status.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <DataTable
              paginationType={PaginationType.PATIENTSTATUSES}
              sendRequest={sendRequest}
            >
              {listData?.map(item => (
                <tr className="" key={item.id}>
                  <td className="">{item.name}</td>
                  <td className="">{item.discount}</td>
                  <td className="text-right">
                    <Link
                      className="btn-edit"
                      title={msg.get('status.title.edit')}
                      href={`patient-status/edit/${item.id}`}
                      // active={route().current('filial.edit')}
                    />
                    <NavLink
                      className="btn-delete"
                      title={msg.get('status.title.delete')}
                      href={`patient-status/delete/${item.id}`}
                      // active={route().current('filial.view')}
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
