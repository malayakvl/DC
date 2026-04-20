import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngVisitScheduleStatus from '../../Lang/VisitScheduleStatus/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';

export default function List({ listData, permissions }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngVisitScheduleStatus,
    locale: appLang,
  });
  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Visit Schedule Status'} />}>
      <Head title={'Visit Schedule Status'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>{msg.get('status.title.list')}</h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/visit-schedule-status/create'}>
                        {msg.get('status.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <DataTable
              paginationType={PaginationType.VISITSCHEDULESTATUSES}
              sendRequest={sendRequest}
            >
              {listData?.map(item => (
                <tr className="" key={item.id}>
                  <td className="">{item.name}</td>
                  <td className=""><div
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: item.color,
                      border: '1px solid #ccc',
                      borderRadius: '3px'
                    }}
                  /></td>
                  <td className="text-right">
                    <Link
                      className="btn-edit"
                      title={msg.get('status.title.edit')}
                      href={`visit-schedule-status/edit/${item.id}`}
                    // active={route().current('filial.edit')}
                    />
                    <NavLink
                      className="btn-delete"
                      title={msg.get('status.title.delete')}
                      href={`visit-schedule-status/delete/${item.id}`}
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
