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
            <section className="table-card">
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
                        className="actn-btns"
                        title={msg.get('filial.filial.edit')}
                        href={`/role/edit/${item.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
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
