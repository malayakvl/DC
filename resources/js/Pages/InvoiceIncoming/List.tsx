import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '../../Lang/InvoiceIncoming/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import ListHeader from '../../Components/Common/ListHeader';
import Filters from './Partials/Filters';
import Pagination from './Partials/Pagination';

export default function List({
  listData,
  storesData,
  suppliers,
  paymentMethods,
}: {
  listData: any;
  storesData: any;
  suppliers: any[];
  paymentMethods: any[];
}) {
  const appLang = useSelector(appLangSelector);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
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
          <div className="p-4 sm:p-4 mb-0 content-data bg-content">
            <ListHeader
              title={msg.get('invoice_incoming.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('invoice_incoming.title.total')}
              description={msg.get('invoice_incoming.title.description')}
              createHref="/invoice-incoming/create"
              createLabel={msg.get('invoice_incoming.title.create')}
              isCreateDisabled={false}
              onCreateClick={null}
            />
            <Filters
              producerData={suppliers}
              totalCount={listData?.length || 0}
              storeData={storesData}
              customerData={[]}
              tabs={[]}
              activeTab={''}
              onTabChange={() => {
                throw new Error('Function not implemented.');
              }}
            />

            <Pagination listData={listData} />
            <section className="table-card">
              <DataTable paginationType={PaginationType.INCOMINGINVOICES}>
                {listData?.map((item: any) => (
                  <tr className="" key={item.id}>
                    <td style={{ paddingLeft: '15px' }}>
                      <span className="block">{item.invoice_number}</span>
                      <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] text-teal-700 font-mono bg-teal-50/80 px-1.5 py-0.5 rounded border border-teal-200/40 w-fit">
                        <svg
                          className="w-3 h-3 text-teal-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          ></path>
                        </svg>
                        <span>#{item.ttn}</span>
                        <button
                          className="hover:text-teal-900 transition-colors"
                          title="Скопіювати штрихкод"
                          type="button"
                        >
                          <svg
                            className="w-2.5 h-2.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="">{format(new Date(item.invoice_date), 'dd.MM.yyyy HH:mm')}</td>
                    <td className="">
                      <span
                        className={`doc-status ${
                          item.document_status === 'new' ? 'status-new' : 'status-posted'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#137870] group-hover/btn:scale-110 transition-transform"></span>
                        {item.document_status === 'new' ? 'Новий' : 'Проведений'}
                      </span>
                    </td>
                    <td className="" style={{ textAlign: 'right' }}>
                      {(() => {
                        const parts = Number(item.total_amount || 0)
                          .toFixed(2)
                          .split('.');
                        const integerPart = Number(parts[0])
                          .toLocaleString('en-US')
                          .replace(/,/g, ' '); // разделение пробелами (например: 1 532)
                        const decimalPart = parts[1];

                        return (
                          <>
                            <div>
                              <span className="text-base font-extrabold text-slate-900 tracking-tight tabular-nums group-hover:text-teal-900 transition-colors">
                                {integerPart}
                                <span className="text-slate-400 font-semibold">.{decimalPart}</span>
                                {item.currency_name && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 tracking-wider">
                                    {item.currency_name}
                                  </span>
                                )}
                              </span>
                            </div>
                            <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                              {item.tax_name}: {item.total_tax}
                            </span>
                          </>
                        );
                      })()}
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
                          <svg
                            className="w-3.5 h-3.5 text-rose-500 group-hover/btn:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                          </svg>

                          {msg.get('invoice_incoming.paid')}
                        </span>
                      ) : (
                        <a
                          href="#"
                          onClick={(e: any) => {
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
                          <span className="w-2 h-2 rounded-full bg-rose-500 group-hover/btn:scale-110 transition-transform"></span>
                          <span>{msg.get('invoice_incoming.unpaid')}</span>
                          <svg
                            className="w-3.5 h-3.5 text-rose-500 group-hover/btn:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                          </svg>
                        </a>
                      )}
                    </td>
                    <td className="">{item.store_name}</td>
                    <td className="">{item.supplier_name}</td>
                    <td className="">{item.customer_name}</td>
                    <td className="text-right">
                      {item.document_status !== 'posted' ? (
                        <>
                          <Link
                            className="actn-btns"
                            title={msg.get('invoice_incoming.edit') || 'Редагувати'}
                            href={`invoice-incoming/edit/${item.invoice_id}`}
                          >
                            <span className="material-symbols-outlined text-[18px] block">
                              edit
                            </span>
                          </Link>
                          <Link
                            className="actn-btns hover:bg-rose-50 hover:text-rose-600"
                            title={msg.get('invoice_incoming.delete') || 'Видалити'}
                            href={`invoice-incoming/delete/${item.invoice_id}`}
                          >
                            <span className="material-symbols-outlined text-[18px] block">
                              delete
                            </span>
                          </Link>
                        </>
                      ) : (
                        <Link
                          className="actn-btns"
                          title={msg.get('invoice_incoming.edit') || 'Редагувати'}
                          href={`invoice-incoming/edit/${item.invoice_id}`}
                        >
                          <span className="material-symbols-outlined text-[18px] block">
                            visibility
                          </span>
                        </Link>
                      )}
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
                        onChange={(e: any) => setPaymentAmount(e.target.value)}
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
