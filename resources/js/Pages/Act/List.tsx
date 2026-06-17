import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../Lang/Act/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import Pagination from './Partials/Pagination';
import Filters from './Partials/Filters';

export default function List({ listData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngAct,
    locale: appLang,
  });
  const msgDropdown = new Lang({
    messages: lngDropdown,
    locale: appLang,
  });
  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Act'} />
      <div className="">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex w-full mb-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {msg.get('act.title.list')}
                  </h2>
                  <div className="flex-1 text-right mt-[5px]">
                    <PrimaryButton>
                      <NavLink href={'/act/create'}>{msg.get('act.title.create')}</NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>

            <Filters />

            <Pagination listData={listData} />

            <section className="table-card mt-4">
              <DataTable paginationType={PaginationType.ACTS} sendRequest={sendRequest}>
                {listData.data?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.act_number}</td>
                    <td className="">{format(new Date(item.act_date), 'dd.MM.yyyy HH:mm')}</td>
                    <td className="">
                      <span
                        className={`doc-status ${
                          item.status === 'new' ? 'status-new' : 'status-posted'
                        }`}
                      >
                        <span className="status-dot"></span>
                        {item.status === 'new' ? 'Новий' : 'Проведений'}
                      </span>
                    </td>
                    <td className="">
                      {item.patient_first_name} {item.patient_last_name}
                    </td>
                    <td className="">
                      {item.doctor_first_name} {item.doctor_last_name}
                    </td>
                    <td>{item.total_amount}</td>
                    <td className="">{item.payment_amount}</td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`act/edit/${item.id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`act/delete/${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
            <Pagination listData={listData} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
