import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngOpeningBalance from '../../Lang/OpeningBalance/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';

export default function List({ listData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngOpeningBalance,
    locale: appLang,
  });
  new Lang({
    messages: lngDropdown,
    locale: appLang,
  });
  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Opening Balance'} />
      <div className="">
        <div>
          <div className="p-3.5 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex w-full mb-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {msg.get('opening_balance.title.list')}
                  </h2>
                  <div className="flex-1 text-right mt-[5px]">
                    <PrimaryButton>
                      <NavLink href={'/opening-balance/create'}>
                        {msg.get('opening_balance.title.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <section className="table-card">
              <DataTable paginationType={PaginationType.OPENINGBALANCE} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.doc_number}</td>
                    <td className="">{format(new Date(item.doc_date), 'dd.MM.yyyy HH:mm')}</td>
                    <td className="">
                      {item.status === 'new' && (
                        <>
                          <svg
                            xmlns="http://w3.org"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="gray"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <path d="M12 18v-4l4-4 4 4-4 4z"></path>
                          </svg>
                        </>
                      )}
                      {item.status === 'posted' && (
                        /*<span style={{ background: '#F1F5F9', color: '#0ea5a4' }}>📄</span>*/
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0ea5a4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M9 15l2 2 4-4"></path>
                        </svg>
                      )}
                    </td>
                    <td className="">{item.storeName}</td>
                    <td className="">{item.customerName}</td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`opening-balance/edit/${item.id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`opening-balance/delete/${item.id}`}
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
