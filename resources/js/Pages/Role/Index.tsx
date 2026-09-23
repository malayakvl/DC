import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngRole from '../../Lang/Role/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function Index({ roleData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title="Roles" />}>
      <Head title={'Roles'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('role.title.list')}
              count={roleData?.length || 0}
              totalLabel={msg.get('role.title.total')}
              description={msg.get('role.title.description')}
              createHref="role/create"
              createLabel={msg.get('role.title.create')}
            />
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <DataTable paginationType={PaginationType.ROLES} sendRequest={sendRequest}>
                {roleData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="text-left">
                      <span className="whitespace-nowrap pl-3">
                        {item.clinic_id ? item.name : msg.get(`role.${item.name}`)}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`/role/edit/${item.id}`}
                      />
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
