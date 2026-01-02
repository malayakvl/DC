import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../Lang/Act/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import Pagination from './Partials/Pagination';

export default function List({ listData, permissions }) {
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
                <div className="flex inline-flex">
                  <h2>{msg.get('act.title.list')}</h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/act/create'}>
                        {msg.get('act.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <Pagination listData={listData} />
            <DataTable
              paginationType={PaginationType.ACTS}
              sendRequest={sendRequest}
            >
              {listData.data?.map(item => (
                <tr className="" key={item.id}>
                  <td className="">{item.act_number}</td>
                  <td className="">{format(new Date(item.act_date), 'dd.MM.yyyy HH:mm')}</td>
                  <td className="">
                    <img
                      src={`../../images/document-icons/${item.status}.svg`}
                      title={msgDropdown.get(`dropdown.${item.status}`)}
                      alt={msgDropdown.get(`dropdown.${item.status}`)}
                      className="icon-doc"
                    />
                  </td>
                  <td className="">{item.patient_first_name} {item.patient_last_name}</td>
                  <td className="">{item.doctor_first_name} {item.doctor_last_name}</td>
                  <td className="">{item.total_amount}</td>
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
                      href={`act/delete/${item.id}`} children={undefined} />
                  </td>
                </tr>
              ))}
            </DataTable>
            <Pagination listData={listData} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
