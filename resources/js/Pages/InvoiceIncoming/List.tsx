import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '../../Lang/InvoiceIncoming/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import InputText from '../../Components/Form/InputText';
import InputSelect from '../../Components/Form/InputSelect';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, filters, suppliers, paymentMethods }) {
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
  new Lang({
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

  const makePayment = (
    invoiceId: number,
    paymentMethodId: number,
    amount: number,
    currencyId: number,
    paymentMethod: any
  ) => {
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
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('invoice_incoming.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('invoice_incoming.title.total')}
              description={msg.get('invoice_incoming.title.description')}
              createHref="/invoice-incoming/create"
              createLabel={msg.get('invoice_incoming.title.create')}
            />
            <div className="p-3 bg-slate-50 mb-4">
              <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                {/* Верхні вкладки / таби швидкого фільтру */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-50">
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                    <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap bg-emerald-700 text-white shadow-sm">
                      <span>Всі накладні</span>
                      <span className="px-1.5 py-0.5 text-[11px] rounded-full transition-colors bg-white text-emerald-800">
                        {listData.length || 0}
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-slate-700 hover:bg-slate-100/80 hover:text-slate-900">
                      <span>Проведені</span>
                      <span className="px-1.5 py-0.5 text-[11px] rounded-full transition-colors bg-rose-100 text-rose-700 font-bold">
                        0
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-slate-700 hover:bg-slate-100/80 hover:text-slate-900">
                      <span>Не проведені</span>
                      <span className="px-1.5 py-0.5 text-[11px] rounded-full transition-colors bg-rose-100 text-rose-700 font-bold">
                        0
                      </span>
                    </button>
                  </div>
                </div>

                {/* Основна панель пошуку та фільтрів */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Пошук за назвою */}
                  <div className="relative flex-1 max-w-[280px]">
                    <InputText
                      type="date"
                      name="date_from"
                      label={msg.get('invoice_incoming.date_from')}
                      values={values}
                      onChange={handleChange}
                      className="filter-select"
                    />
                  </div>
                  <div className="relative flex-1 max-w-[280px]">
                    <InputText
                      type="date"
                      name="date_to"
                      label={msg.get('invoice_incoming.date_to')}
                      values={values}
                      onChange={handleChange}
                      className="filter-select"
                    />
                  </div>

                  {/* Фільтр: Категорія */}
                  <div className="relative min-w-[170px] mt-[-15px]">
                    <InputSelect
                      label={msg.get('invoice_incoming.producer')}
                      name={'supplier_id'}
                      defaultTips={msg.get('invoice_incoming.producer')}
                      options={suppliers}
                      selectedLabelClass={'filter-label-selected'}
                      className="filter-select"
                      values={values}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Кнопка додаткових фільтрів/скидання */}
                  <button
                    className="p-2 text-slate-500 bg-indigo-50/40 hover:bg-slate-100 hover:text-slate-800 rounded-xl transition-colors"
                    title="Додаткові фільтри"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="table-card">
              <DataTable paginationType={PaginationType.INCOMINGINVOICES} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.invoice_number}</td>
                    <td className="">{format(new Date(item.invoice_date), 'dd.MM.yyyy HH:mm')}</td>
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
                    <td className="" style={{ textAlign: 'right' }}>
                      {item.total_amount} {item.currency_name}
                    </td>
                    <td className="">
                      {Number(item.debt_amount) <= 0 ? (
                        <span
                          className={`doc-status ${
                            item.status === 'new'
                              ? 'status-new'
                              : item.status === 'posted'
                                ? 'status-posted'
                                : 'status-paid'
                          }`}
                        >
                          <span className="status-dot"></span>

                          {msg.get('invoice_incoming.paid')}
                        </span>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedInvoice(item);
                            setPaymentAmount(
                              item.debt_amount > 0 ? item.debt_amount : item.total_amount
                            );
                            setPaymentMethodId(0);
                            setSelectedMethod(null);
                            setPaymentAmountError(false);
                            setShowModal(true);
                          }}
                          className="pay-btn "
                          data-id={item.id}
                        >
                          {msg.get('invoice_incoming.unpaid')}
                        </a>
                      )}
                    </td>
                    <td className="">{item.store_name}</td>
                    <td className="">{item.supplier_name}</td>
                    <td className="">{item.customer_name}</td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`invoice-incoming/edit/${item.invoice_id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`invoice-incoming/delete/${item.invoice_id}`}
                      />
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
            {showModal && (
              <div id="paymentModal" className="fixed inset-0  flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-[450px]">
                  <h2 className="text-[20px] font-semibold leading-tight">
                    {msg.get('invoice_incoming.payment')} № {selectedInvoice?.invoice_number}
                  </h2>

                  <form id="paymentForm">
                    <input type="hidden" id="invoiceId" />

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-white  ">
                        {msg.get('invoice_incoming.amount')}
                      </label>
                      <input
                        type="number"
                        className="input-text"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-white  ">
                        {msg.get('invoice_incoming.payment_method')}
                      </label>
                      <select
                        className="w-full input-text"
                        value={paymentMethodId || ''}
                        onChange={(e) => {
                          const id = parseInt(e.target.value);
                          setPaymentMethodId(id);
                          setSelectedMethod(paymentMethods.find((method) => method.id === id));
                        }}
                      >
                        <option value="" disabled>
                          {msg.get('invoice_incoming.payment_method')}
                        </option>

                        {paymentMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name} {method.balance} {method.currency_name}
                          </option>
                        ))}
                      </select>
                      {paymentAmountError && (
                        <span className="text-red-500">Недостатньо коштів на рахунку</span>
                      )}
                    </div>
                    <input
                      type="hidden"
                      name="invoice_id"
                      id="invoice_id"
                      value={selectedInvoice?.id}
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                        onClick={() => setShowModal(false)}
                      >
                        Отмена
                      </button>
                      <button
                        type="button"
                        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          makePayment(
                            selectedInvoice?.invoice_id,
                            paymentMethodId,
                            parseFloat(paymentAmount),
                            selectedInvoice?.currency_id,
                            selectedMethod
                          );
                        }}
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
