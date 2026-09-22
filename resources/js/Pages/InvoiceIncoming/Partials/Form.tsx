import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import AddDynamicInputFields, { AddDynamicInputFieldsRef } from './Row';
import InputCalendar from '../../../Components/Form/InputCalendar';
import InputCustomerSelect from '../../../Components/Form/InputCustomerSelect';
import {
  invoiceItemsSelector,
  invoiceTaxSelector,
  tableErrorSelector,
} from '@/Redux/Incominginvoice/selectors';
import { setInvoiceTax, setShowTableError } from '@/Redux/Incominginvoice';
import InputTaxSelect from '../../../Components/Form/InputTaxSelect';
import { ArrowLeft } from 'lucide-react';

export default function Form({
  clinicData,
  storeData,
  statusData,
  producerData,
  customerData,
  formData,
  formRowData = null,
  currencyData,
  unitsData,
  taxData,
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngInvoiceIncoming,
    locale: appLang,
  });
  const dispatch = useAppDispatch();
  const rowRef = useRef<AddDynamicInputFieldsRef | null>(null);
  const invoiceItems = useSelector(invoiceItemsSelector);
  const documentTax = useSelector(invoiceTaxSelector);
  const showTableError = useSelector(tableErrorSelector);
  // const [showRowsError, setShowRowsError] = useState(false);

  const [values, setValues] = useState({
    invoice_number: formData.invoice_number ? formData.invoice_number : '',
    invoice_date: formData.invoice_date,
    clinic_id: clinicData.id,
    store_id: formData.store_id,
    customer_id: formData.customer_id,
    supplier_id: formData.supplier_id,
    status_id: formData.status_id,
    status: formData.status,
    type_id: formData.type_id,
    comment: formData.comment,
    currency_id: formData.currency_id,
    tax_id: formData.tax_id,
    rate: formData.rate,
  });
  const { processing, recentlySuccessful } = useForm();
  const isPosted = formData.status === 'posted';

  const handleChangeSelect = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
    if (key === 'tax_id') {
      dispatch(setInvoiceTax(e.target.value));
    }
  };

  const handleChangeCalendar = (data) => {
    const key = 'invoice_date';
    setValues((values) => ({
      ...values,
      [key]: data,
    }));
  };

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!values['invoice_date']) {
      values['invoice_date'] = new Date();
    }

    values['rows'] = invoiceItems;
    let haveErrorInRow = false;
    invoiceItems.forEach((_row) => {
      if (!_row.product_id) {
        haveErrorInRow = true;
      }
    });
    if (haveErrorInRow) {
      dispatch(setShowTableError(true));
    } else {
      documentTax.split('_');
      if (formData.id) {
        router.post(`/invoice-incoming/update?id=${formData.id}`, {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          store_id: values.store_id,
          customer_id: values.customer_id,
          supplier_id: values.supplier_id,
          status_id: values.status_id,
          status: values.status,
          currency_id: values.currency_id,
          type_id: values.type_id,
          tax_id: values.tax_id,
          rows: invoiceItems,
        });
      } else {
        router.post('/invoice-incoming/update', {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          store_id: values.store_id,
          status: values.status,
          customer_id: values.customer_id,
          supplier_id: values.supplier_id,
          status_id: values.status_id,
          currency_id: values.currency_id,
          type_id: values.type_id,
          tax_id: values.tax_id,
          rows: invoiceItems,
        });
      }
    }
  };

  return (
    <section className={`w-full px-4 sm:px-8 py-6 flex flex-col gap-6`}>
      {/* Шапка сторінки */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <Link
              href="/materials"
              className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-teal-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mt-space-xs">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {formData?.id
                      ? msg.get('invoice_incoming.title.edit')
                      : msg.get('invoice_incoming.title.create')}
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Управління специфікацією, облік витрат та контроль залишків матеріалів
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={processing} className="btn-submit">
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              {msg.get('invoice_incoming.save') || 'Зберегти зміни'}
            </div>
          </button>
        </div>
      </div>
      <form onSubmit={submit} className="mt-0 space-y-4" encType="multipart/form-data">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          {/* Заголовок карточки */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">
                description
              </span>
              <h2 className="text-base font-semibold text-gray-900">
                Реквізити документа та умови постачання
              </h2>
            </div>
          </div>

          {/* Сетка полей (4 колонки, 2 ряда) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 1. Номер накладной */}
            <div className="flex flex-col gap-1.5">
              <div className="w-full flex items-center justify-between">
                <InputText
                  name={'invoice_number'}
                  values={values}
                  dataValue={values.invoice_number}
                  value={values.invoice_number}
                  onChange={handleChange}
                  required
                  label={msg.get('invoice_incoming.number')}
                  className="filter-select-bordered-bordered w-full"
                />
              </div>
            </div>

            {/* 2. Дата */}
            <div className="flex flex-col gap-1.5">
              <div className="w-full flex items-center justify-between">
                <InputCalendar
                  name={'invoice_date'}
                  values={values}
                  dataValue={values.invoice_date}
                  value={values.invoice_date}
                  onChange={handleChangeCalendar}
                  required
                  label={msg.get('invoice_incoming.date')}
                  className="filter-select-bordered w-full"
                />
              </div>
            </div>

            {/* 3. Статус */}
            <div className="flex flex-col gap-1.5">
              <div className="w-full flex items-center justify-between">
                <InputSelect
                  translatable={true}
                  name={'status'}
                  values={values}
                  value={values.status}
                  options={statusData}
                  onChange={handleChangeSelect}
                  required
                  className="filter-select-bordered w-full"
                  label={msg.get('invoice_incoming.status')}
                />
              </div>
            </div>

            {/* 4. Поставщик */}
            <div className="flex flex-col gap-1.5">
              <div className="w-full flex items-center justify-between">
                <InputSelect
                  translatable={false}
                  name={'supplier_id'}
                  className="filter-select-bordered w-full"
                  values={values}
                  value={values.supplier_id}
                  options={producerData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('invoice_incoming.producer')}
                />
              </div>
            </div>

            {/* 5. Склад */}
            <div className="flex flex-col gap-1.5 mt-[-15px]">
              <div className="w-full flex items-center justify-between">
                <InputSelect
                  name={'store_id'}
                  className="filter-select-bordered w-full"
                  values={values}
                  value={values.store_id}
                  options={storeData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('invoice_incoming.store')}
                />
              </div>
            </div>

            {/* 6. Налог (ПДВ) */}
            <div className="flex flex-col gap-1.5 mt-[-15px]">
              <div className="w-full flex items-center justify-between">
                <InputTaxSelect
                  name={'tax_id'}
                  className="filter-select-bordered w-full"
                  values={values}
                  value={values.tax_id}
                  options={taxData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('invoice_incoming.tax')}
                />
              </div>
            </div>

            {/* 7. Валюта */}
            <div className="flex flex-col gap-1.5 mt-[-15px]">
              <div className="w-full flex items-center justify-between">
                <InputSelect
                  name={'currency_id'}
                  className="filter-select-bordered w-full"
                  values={values}
                  value={values.currency_id}
                  options={currencyData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('invoice_incoming.currency')}
                />
              </div>
            </div>

            {/* 8. Ответственное лицо */}
            <div className="flex flex-col gap-1.5 mt-[-15px]">
              <div className="w-full flex items-center justify-between">
                <InputCustomerSelect
                  name={'customer_id'}
                  className="filter-select-bordered w-full"
                  values={values}
                  value={values.customer_id}
                  options={customerData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('invoice_incoming.person')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 text-center">
                    {msg.get('invoice_incoming.product')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100  text-center">
                    {msg.get('invoice_incoming.qty')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 text-center">
                    {msg.get('invoice_incoming.unit')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 text-center">
                    {msg.get('invoice_incoming.factqty')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100  text-center">
                    {msg.get('invoice_incoming.price')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100  text-center">
                    {msg.get('invoice_incoming.total')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 w-btn">
                    {msg.get('invoice_incoming.actions')}
                  </th>
                  {/*<th className="pb-3 w-btn">&nbsp;</th>*/}
                </tr>
              </thead>
              <tbody>
                {formRowData?.length > 0 ? (
                  <AddDynamicInputFields
                    ref={rowRef}
                    formRowData={formRowData}
                    unitsData={unitsData}
                    msg={msg}
                  />
                ) : (
                  <AddDynamicInputFields
                    ref={rowRef}
                    msg={msg}
                    unitsData={unitsData}
                    formRowData={[
                      {
                        product_id: '',
                        product: '',
                        unit_id: '',
                        quantity: '',
                        price: '',
                        total: '',
                      },
                    ]}
                  />
                )}
              </tbody>
              {!isPosted && (
                <tfoot>
                  <tr>
                    <td colSpan="7">
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 transition-colors"
                        onClick={() => rowRef.current?.addRow()}
                      >
                        + {msg.get('invoice_incoming.add_position')}
                      </button>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
        <div className="bg-blue-100 align-items-end">
          <div className={`mb-4 clearfix row-invoice-error ${showTableError ? 'block' : 'hidden'}`}>
            {msg.get('invoice_incoming.rows.error')}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Link
            className="btn-back"
            title={msg.get('invoice_incoming.back')}
            href={`/invoice-incoming`}
          >
            {msg.get('invoice_incoming.back')}
          </Link>

          <div className="flex items-center gap-3">
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-teal-600 font-semibold">
                {msg.get('invoice_incoming.saved') || 'Збережено!'}
              </p>
            </Transition>

            <button type="submit" disabled={processing} className="btn-submit">
              <div className="flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                {msg.get('invoice_incoming.save') || 'Зберегти зміни'}
              </div>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
