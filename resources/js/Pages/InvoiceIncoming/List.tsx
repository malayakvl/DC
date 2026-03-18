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

export default function List({ listData, permissions, filters, suppliers, paymentMethods }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentAmountError, setPaymentAmountError] = useState(false);
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

  const makePayment = (invoiceId: number, paymentMethodId: number, amount: number, currencyId: number, paymentMethod: any) => {
    console.log(invoiceId, paymentMethodId, amount, currencyId, paymentMethod);
    if (paymentMethod.balance <= 0) {
      setPaymentAmountError(true);
    } else {
      setPaymentAmountError(false);
      router.post('/invoice-incoming/payment', {
        invoiceId,
        paymentMethodId,
        amount,
        currencyId,
        supplierId: selectedInvoice?.supplier_id,
      });
      setShowModal(false);
      setPaymentAmount('');
      setPaymentMethodId(0);
      setSelectedMethod(null);
      setPaymentAmountError(false);
    }
  };

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
                      className="btn-submit !bg-none !bg-gray-200 !text-gray-700 hover:!bg-gray-300 transition-colors duration-200"
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
                  <td className="" style={{ textAlign: 'right' }}>{item.total_amount} {item.currency_name}</td>
                  <td className="">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedInvoice(item);
                        setPaymentAmount(item.debt_amount > 0 ? item.debt_amount : item.total_amount);
                        setPaymentMethodId(0)
                        setSelectedMethod(null)
                        setPaymentAmountError(false)
                        setShowModal(true);
                      }}
                      className="pay-btn text-blue-100 hover:text-blue-200 bg-[#aa53d8] px-1.5 py-0.5 text-[12px] rounded-xl"
                      data-id={item.id}
                    >
                      {Number(item.debt_amount) <= 0 ? msg.get('invoice_incoming.paid') : msg.get('invoice_incoming.unpaid')}
                    </a>
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
            {showModal && (
              <div id="paymentModal" className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-black p-6 rounded-lg w-[450px]">

                  <h2 className="text-md font-semibold leading-tight">{msg.get('invoice_incoming.payment')} № {selectedInvoice?.invoice_number}</h2>

                  <form id="paymentForm">

                    <input type="hidden" id="invoiceId" />

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-white  ">{msg.get('invoice_incoming.amount')}</label>
                      <input
                        type="number"
                        className="w-full border p-2 rounded text-black"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-white  ">{msg.get('invoice_incoming.payment_method')}</label>
                      <select
                        className="w-full border p-2 rounded text-black"
                        value={paymentMethodId || ''}
                        onChange={(e) => {
                          const id = parseInt(e.target.value)
                          setPaymentMethodId(id)
                          setSelectedMethod(paymentMethods.find(method => method.id === id))
                        }}
                      >
                        <option value="" disabled>
                          {msg.get('invoice_incoming.payment_method')}
                        </option>

                        {paymentMethods.map(method => (
                          <option key={method.id} value={method.id}>
                            {method.name} {method.balance} {method.currency_name}
                          </option>
                        ))}
                      </select>
                      {paymentAmountError && <span className="text-red-500">Недостатньо коштів на рахунку</span>}
                    </div>
                    <input type="hidden" name="invoice_id" id="invoice_id" value={selectedInvoice?.id} />

                    <div className="flex gap-2">
                      <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded w-full" onClick={() => setShowModal(false)}>Отмена</button>
                      <button
                        type="button"
                        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
                        onClick={(e) => { e.preventDefault(); makePayment(selectedInvoice?.invoice_id, paymentMethodId, parseFloat(paymentAmount), selectedInvoice?.currency_id, selectedMethod); }}
                      >
                        Оплатить
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
