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
  currencyData,
  clinicData,
}: {
  listData: any;
  storesData: any;
  suppliers: any[];
  paymentMethods: any[];
  currencyData: any[];
  clinicData: any;
}) {
  const appLang = useSelector(appLangSelector);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethodId, setPaymentMethodId] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentAmountError, setPaymentAmountError] = useState(false);
  const [paymentDocument, setPaymentDocument] = useState<any>(null);
  const [selectedTip, setSelectedTip] = useState('full');
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currencyPayed, setCurrencyPayed] = useState('');

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
      setPaymentAmount(0);
      setPaymentMethodId(0);
      setSelectedMethod(null);
      setPaymentAmountError(false);
      setCurrencyPayed('');
    }
  };

  const fetchNbuRate = async (currency: any, invoiceDate: any) => {
    if (currency.id === clinicData.currency_id) {
      setCurrencyRate(1);
      return;
    }

    // Превращаем дату из '2026-10-09' в '20261009' для НБУ
    // Ообрезаем время (берем только дату 'YYYY-MM-DD') и убираем дефисы -> 'YYYYMMDD'
    const cleanDate = invoiceDate ? invoiceDate.split(' ')[0].replaceAll('-', '') : '';

    try {
      const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency.name}&date=${cleanDate}&json`;

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        setCurrencyRate(data[0].rate);
        setPaymentAmount(Number((paymentAmount / data[0].rate).toFixed(2)));
        // setExchangeRate(data[0].rate); // Успешно достали курс (например, 41.2500)
      }
    } catch (error) {
      console.error('Помилка завантаження курсу НБУ:', error);
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
                      <Link href={`invoice-incoming/edit/${item.invoice_id}`} className="block">
                        {item.invoice_number}
                      </Link>
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
                            setPaymentDocument(item);
                            setShowModal(true);
                            setCurrencyPayed(item.currency_name);
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
              <div
                id="paymentModal"
                className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
              >
                <div className="relative w-full max-w-[670px] bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col transition-all">
                  {/* Top Color Accent */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600"></div>
                  <div className="px-6 pt-5 flex items-center justify-between px-0 py-4 pt-0 border-b border-surface-container-low bg-surface-container-lowest">
                    <div className="flex items-center gap-3">
                      {/* Иконка оплаты с аккуратной плашкой */}
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-9a1.5 1.5 0 011.5-1.5zM3.75 9h16.5"
                          />
                        </svg>
                      </div>

                      {/* Заголовок и подзаголовок */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-0 pb-0">
                          {msg.get('invoice_incoming.payment')} № {selectedInvoice?.invoice_number}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {msg.get('invoice_incoming.payment_description')}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                  <div className="px-6 pt-5">
                    <div className="flex flex-col gap-space-xs mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">
                            1
                          </span>
                          {msg.get('invoice_incoming.payment_supplier_title')}
                        </span>
                        <span className="text-sm text-label-sm text-outline">
                          {msg.get('invoice_incoming.from')}{' '}
                          {format(new Date(paymentDocument.invoice_date), 'dd.MM.yyyy HH:mm')}
                        </span>
                      </div>
                      <div className="rounded-xl bg-[#f6f7ff] p-[16px] flex flex-col gap-space-sm border border-surface-container mt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                          <div className="flex items-center gap-space-sm">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-base">
                                  {paymentDocument.supplier_name}
                                </span>
                                <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                  {msg.get('invoice_incoming.doc_edrpou')}:{' '}
                                  {paymentDocument.supplier_edrpou}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <span className="material-symbols-outlined text-[15px] text-emerald-600">
                                  inventory_2
                                </span>
                                <span>
                                  {msg.get('invoice_incoming.doc_name')}{' '}
                                  <b>№ {paymentDocument.invoice_number}</b> •{' '}
                                  {msg.get('invoice_incoming.doc_store')}:{' '}
                                  {paymentDocument.store_name}{' '}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-px bg-gray-200 w-full mt-2"></div>
                        <div className="grid grid-cols-3 gap-3 text-center pt-2">
                          {/* Сума накладної */}
                          <div className="flex flex-col items-center sm:items-start">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                              {msg.get('invoice_incoming.doc_amount')}
                            </span>
                            <span className="text-base font-bold text-gray-900 mt-0.5">
                              {paymentDocument.total_amount}{' '}
                              <span className="text-xs text-gray-400 font-normal">
                                {paymentDocument.currency_name}
                              </span>
                            </span>
                          </div>
                          {/* Вже сплачено */}
                          <div className="flex flex-col items-center sm:items-start border-x border-gray-100 px-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                              {msg.get('invoice_incoming.doc_already_pay')}
                            </span>
                            <span className="text-base font-bold text-emerald-600 mt-0.5">
                              {paymentDocument.paid_amount}{' '}
                              <span className="text-xs text-gray-400 font-normal">
                                {paymentDocument.currency_name}
                              </span>
                            </span>
                          </div>
                          {/* Залишок / Борг */}
                          <div className="flex flex-col items-center sm:items-start pl-1">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                              {msg.get('invoice_incoming.doc_need_pay')}
                            </span>
                            <span className="text-base font-bold text-rose-600 mt-0.5">
                              {paymentDocument.total_amount - paymentDocument.paid_amount}{' '}
                              <span className="text-xs text-rose-500 font-normal">
                                {paymentDocument.currency_name}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] flex items-center justify-center font-bold">
                            2
                          </span>
                          {msg.get('invoice_incoming.doc_total_pay')}
                        </span>
                      </div>
                      {/* Быстрые кнопки (чипсы) */}
                      <div className="flex flex-wrap gap-2 mb-1">
                        <button
                          onClick={() => {
                            setPaymentAmount(paymentDocument.debt_amount);
                            setSelectedTip('full');
                          }} // подставляем весь остаток долга
                          className={`invoice-tip ${selectedTip === 'full' ? 'selected' : ''}`}
                          id="preset-saas-full"
                          type="button"
                        >
                          {selectedTip === 'full' && (
                            <span className="material-symbols-outlined text-[15px]">check</span>
                          )}
                          {msg.get('invoice_incoming.doc_all_pay')} (
                          {Number(paymentDocument.debt_amount / currencyRate).toFixed(2)}{' '}
                          {currencyPayed})
                        </button>

                        <button
                          onClick={() => {
                            setPaymentAmount(Number(paymentDocument.debt_amount / 2));
                            setSelectedTip('half');
                          }} // подставляем 50% от долга
                          className={`invoice-tip ${selectedTip !== 'full' ? 'selected' : ''}`}
                          id="preset-saas-half"
                          type="button"
                        >
                          {selectedTip !== 'full' && (
                            <span className="material-symbols-outlined text-[15px]">check</span>
                          )}
                          {msg.get('invoice_incoming.doc_half_pay')} (
                          {(paymentDocument.debt_amount / 2 / currencyRate).toFixed(2)}{' '}
                          {currencyPayed})
                        </button>
                      </div>
                      {/* Поле ввода суммы и выбор валюты */}
                      <div className="rounded-xl bg-gray-50 p-2 flex items-center gap-2 border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-600 focus-within:bg-white transition-all">
                        <div className="relative flex-1 flex items-center">
                          <span
                            className="text-emerald-600 font-bold text-xl pl-3 pointer-events-none"
                            id="currency-symbol-display"
                          >
                            {currencyPayed}
                          </span>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full bg-gray-50 text-gray-900 font-bold text-lg px-3 py-2.5 rounded-lg border-0  focus:bg-white transition-all"
                            value={paymentAmount}
                            onChange={(e: any) => setPaymentAmount(e.target.value)}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="relative shrink-0 pr-1">
                          <select
                            className="bg-white hover:bg-gray-50 text-gray-900 text-sm font-bold px-3 py-2 rounded-lg border border-gray-200 cursor-pointer appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-sm"
                            id="saas-currency-selector"
                            onChange={(e: any) => {
                              const selectedId = e.target.value;
                              // Находим выбранную валюту в массиве по ее id
                              const foundCurrency = currencyData.find((c) => c.id == selectedId);

                              if (foundCurrency) {
                                setCurrencyPayed(foundCurrency.name);
                                // Если это гривна (id = 1 или код UAH), курс всегда 1.
                                // Иначе запрашиваем курс НБУ для foundCurrency.code (например, 'USD')
                                fetchNbuRate(foundCurrency, paymentDocument.invoice_date);
                              }
                            }}
                          >
                            {currencyData.map((currency: any, inxCurrency: number) => (
                              <option
                                key={inxCurrency}
                                id={currency.name}
                                value={currency.id}
                                selected={currency.id === paymentDocument.currency_id}
                              >
                                {currency.name} ({currency.symbol})
                              </option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined text-[18px] text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                        {/* Если выбрана не гривна, показываем поле курса */}
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                          <span className="text-xs text-gray-500 font-medium">Курс НБУ:</span>
                          <input
                            type="text"
                            className="w-20 bg-transparent text-gray-900 border-0 font-bold text-sm focus:outline-none"
                            value={currencyRate}
                            onChange={(e) => {
                              const newRate = Number(e.target.value);
                              setCurrencyRate(Number(e.target.value));

                              // Пересчитываем сумму оплаты от базовой суммы документа, если курс больше нуля
                              if (newRate > 0) {
                                setPaymentAmount(
                                  Number((Number(paymentDocument.debt_amount) / newRate).toFixed(2))
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                      {/* Статус-бар */}
                      <div
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium mt-0.5"
                        id="saas-calc-feedback"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="material-symbols-outlined text-[16px]"
                            id="saas-feedback-icon"
                          >
                            check_circle
                          </span>
                          <span className="font-medium" id="saas-feedback-text">
                            Повне закриття накладної (Залишок після оплати: 0.00 UAH)
                          </span>
                        </div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded"
                          id="saas-feedback-tag"
                        >
                          Закрито 100%
                        </span>
                      </div>
                    </div>
                    <form id="paymentForm">
                      <input type="hidden" id="invoiceId" value={selectedInvoice?.id} />
                      {/* Сума до сплати */}
                      <div className="flex flex-col gap-2 mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] flex items-center justify-center font-bold">
                              3
                            </span>
                            {msg.get('invoice_incoming.payment_method')}
                          </span>
                          <span className="text-xs text-gray-400">Оберіть касу або рахунок</span>
                        </div>
                        {/* Компактная сетка карточек */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {paymentMethods
                            .filter((method) => method.balance > 0) // <--- Оставляем только те, где есть деньги
                            .map((method) => {
                              const isSelected = paymentMethodId === method.id;
                              const getIcon = (name: string) => {
                                const lower = name.toLowerCase();
                                if (
                                  lower.includes('безгот') ||
                                  lower.includes('iban') ||
                                  lower.includes('банк')
                                )
                                  return 'account_balance';
                                if (lower.includes('карт') || lower.includes('pos'))
                                  return 'credit_card';
                                if (
                                  lower.includes('usd') ||
                                  lower.includes('eur') ||
                                  lower.includes('валют')
                                )
                                  return 'currency_exchange';
                                return 'payments';
                              };
                              return (
                                <button
                                  key={method.id}
                                  type="button"
                                  onClick={() => {
                                    setPaymentMethodId(method.id);
                                    setSelectedMethod(method);
                                  }}
                                  className={`px-3 py-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                                    isSelected
                                      ? 'bg-emerald-50/70 border-emerald-600 ring-1 ring-emerald-600 shadow-sm'
                                      : 'bg-gray-50/60 hover:bg-gray-100 border-gray-200 text-gray-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span
                                      className={`material-symbols-outlined text-[20px] shrink-0 ${
                                        isSelected ? 'text-emerald-600' : 'text-gray-400'
                                      }`}
                                    >
                                      {getIcon(method.name)}
                                    </span>
                                    <span
                                      className={`text-xs font-semibold truncate ${
                                        isSelected ? 'text-gray-900' : 'text-gray-700'
                                      }`}
                                    >
                                      {method.name}
                                    </span>
                                  </div>
                                  <div
                                    className={`text-xs font-bold shrink-0 ${
                                      isSelected ? 'text-emerald-700' : 'text-gray-500'
                                    }`}
                                  >
                                    {method.balance}{' '}
                                    <span className="text-[10px] font-normal">
                                      {method.currency_name}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                        {paymentAmountError && (
                          <span className="text-rose-500 text-xs mt-1 block font-medium">
                            Недостатньо коштів на обраному рахунку
                          </span>
                        )}
                      </div>
                      {/* Кнопки дій */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3 pb-4">
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <span className="material-symbols-outlined text-emerald-600 text-[16px]">
                            lock
                          </span>
                          <span className="text-gray-500 text-[11px]">
                            Захищений запис у журнал
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowModal(false)}
                          >
                            Скасувати
                          </button>
                          <button
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              makePayment(
                                selectedInvoice?.invoice_id,
                                paymentMethodId,
                                Number(paymentAmount),
                                selectedInvoice?.currency_id,
                                selectedMethod
                              );
                            }}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[18px]">check</span>
                            <span>Оприбуткувати</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
