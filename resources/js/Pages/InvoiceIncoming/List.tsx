import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '../../Lang/InvoiceIncoming/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '../../Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import InputText from '../../Components/Form/InputText';
import InputSelect from '../../Components/Form/InputSelect';

export default function List({ listData, permissions, filters, suppliers }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngInvoiceIncoming,
    locale: appLang,
  });
  const msgDropdown = new Lang({
    messages: lngDropdown,
    locale: appLang,
  });

  const [values, setValues] = useState({
    date_from: filters?.date_from || '',
    date_to: filters?.date_to || '',
    supplier_id: filters?.supplier_id || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    router.get('/invoice-incoming', values, {
      preserveState: true,
      replace: true,
    });
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Invoice Incoming'} />
      <div className="">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold leading-tight">
                      {msg.get('invoice_incoming.title.list')}
                    </h2>
                    <div className="ml-5">
                      <PrimaryButton>
                        <NavLink href={'/invoice-incoming/create'}>
                          {msg.get('invoice_incoming.title.create')}
                        </NavLink>
                      </PrimaryButton>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 p-4 transparent rounded-lg border border-[#27324f] items-end">
                  <InputText
                    type="date"
                    name="date_from"
                    label={msg.get('invoice_incoming.date_from')}
                    values={values}
                    onChange={handleChange}
                    className="mt-1 block w-full"
                  />
                  <InputText
                    type="date"
                    name="date_to"
                    label={msg.get('invoice_incoming.date_to')}
                    values={values}
                    onChange={handleChange}
                    className="mt-1 block w-full"
                  />
                  <InputSelect
                    name="supplier_id"
                    label={msg.get('invoice_incoming.producer')}
                    values={values}
                    onChange={handleChange}
                    options={suppliers}
                    className="mt-1 block w-full min-w-[200px]"
                  />
                  <div className="flex gap-2 mb-1">
                    <PrimaryButton onClick={handleFilter}>
                      {msg.get('invoice_incoming.filter')}
                    </PrimaryButton>
                    <button
                      onClick={() => {
                        const reset = { date_from: '', date_to: '', supplier_id: '' };
                        setValues(reset);
                        router.get('/invoice-incoming', reset);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                      {msg.get('invoice_incoming.reset')}
                    </button>
                  </div>
                </div>
              </header>
            </section>
            <DataTable
              paginationType={PaginationType.INCOMINGINVOICES}
              sendRequest={sendRequest}
            >
              {listData?.map(item => (
                <tr className="" key={item.id}>
                  <td className="">{item.invoice_number}</td>
                  <td className="">{format(new Date(item.invoice_date), 'dd.MM.yyyy HH:mm')}</td>
                  <td className="">
                    <img
                      src={`../../images/document-icons/${item.document_status}.svg`}
                      title={msgDropdown.get(`dropdown.${item.document_status}`)}
                      alt={msgDropdown.get(`dropdown.${item.document_status}`)}
                      className="icon-doc"
                    />
                  </td>
                  <td className="">
                    <NavLink href={`/invoice-incoming/payment/${item.id}`} className="text-blue-100 hover:text-blue-200 bg-[#aa53d8] px-1.5 py-0.5 text-[12px] rounded-xl">
                      {Number(item.debt_amount) <= 0 ? msg.get('invoice_incoming.paid') : msg.get('invoice_incoming.unpaid')}
                    </NavLink>
                  </td>
                  <td className="">{item.store_name}</td>
                  <td className="">{item.supplier_name}</td>
                  <td className="">{item.customer_name}</td>
                  <td className="text-right">
                    <Link
                      className="btn-edit"
                      title={msg.get('filial.filial.edit')}
                      href={`invoice-incoming/edit/${item.id}`}
                    />
                    <NavLink
                      className="btn-delete"
                      title={msg.get('filial.filial.delete')}
                      href={`invoice-incoming/delete/${item.id}`}
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
