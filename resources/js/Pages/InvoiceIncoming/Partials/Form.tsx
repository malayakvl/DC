import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngOpeningBalance from '../../../Lang/OpeningBalance/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import AddDynamicInputFields from './Row';
import InputCalendar from '../../../Components/Form/InputCalendar';
import InputCustomerSelect from '../../../Components/Form/InputCustomerSelect';
import {
  invoiceItemsSelector,
  invoiceTaxSelector,
  tableErrorSelector,
} from '../../../Redux/Incominginvoice/selectors';
import {
  setInvoiceTax,
  setShowTableError,
} from '../../../Redux/Incominginvoice';
import InputTaxSelect from '../../../Components/Form/InputTaxSelect';

export default function Form({
  clinicData,
  storeData,
  statusData,
  typeData,
  producerData,
  customerData,
  formData,
  formRowData = null,
  currencyData,
  unitsData,
  taxData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngOpeningBalance,
    locale: appLang,
  });
  const dispatch = useAppDispatch();
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

  const handleChangeSelect = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
    if (key === 'tax_id') {
      dispatch(setInvoiceTax(e.target.value));
    }
  };

  const handleChangeCalendar = data => {
    const key = 'invoice_date';
    const value = data;
    setValues(values => ({
      ...values,
      [key]: data,
    }));
  };

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const submit = e => {
    e.preventDefault();
    if (!values['invoice_date']) {
      values['invoice_date'] = new Date();
    }

    values['rows'] = invoiceItems;
    let haveErrorInRow = false;
    invoiceItems.forEach(_row => {
      if (!_row.product_id) {
        haveErrorInRow = true;
      }
    });
    if (haveErrorInRow) {
      dispatch(setShowTableError(true));
    } else {
      const taxData = documentTax.split('_');
      if (formData.id) {
        console.log(values);
        router.post(`/opening-balance/update?id=${formData.id}`, {
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
        router.post('/opening-balance/update', {
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
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/opening-balance'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('opening_balance.title.edit')
            : msg.get('opening_balance.title.create')}
        </h2>
      </header>
      <form
        onSubmit={submit}
        className="mt-0 space-y-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/2">
              <div className="mb-2 flex gap-2">
                <div className="w-1/3">
                  <InputText
                    name={'invoice_number'}
                    values={values}
                    dataValue={values.invoice_number}
                    value={values.invoice_number}
                    onChange={handleChange}
                    required
                    label={msg.get('opening_balance.number')}
                  />
                </div>
                <div className="w-1/3">
                  <InputCalendar
                    name={'invoice_date'}
                    values={values}
                    dataValue={values.invoice_date}
                    value={values.invoice_date}
                    onChange={handleChangeCalendar}
                    required
                    label={msg.get('opening_balance.date')}
                  />
                </div>
                <div className={`w-1/3`}>
                  <InputSelect
                    translatable={true}
                    name={'status'}
                    className={'mb-1'}
                    values={values}
                    value={values.status}
                    options={statusData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('opening_balance.status')}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="mb-2">
                <div className="flex gap-2">
                  <div className="w-1/4">
                    <InputSelect
                      name={'store_id'}
                      values={values}
                      value={values.store_id}
                      options={storeData}
                      onChange={handleChangeSelect}
                      required
                      label={msg.get('opening_balance.store')}
                    />
                  </div>
                  <div className="w-1/4">
                    <InputCustomerSelect
                      name={'customer_id'}
                      values={values}
                      value={values.customer_id}
                      options={customerData}
                      onChange={handleChangeSelect}
                      required
                      label={msg.get('opening_balance.person')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <table className="w-full invoice-table">
            <thead>
              <tr>
                <th className="pb-3">{msg.get('opening_balance.product')}</th>
                <th className="pb-3 w-qty">{msg.get('opening_balance.qty')}</th>
                <th className="pb-3">{msg.get('opening_balance.unit')}</th>
                <th className="pb-3">{msg.get('opening_balance.factqty')}</th>
                <th className="pb-3 w-price">{msg.get('opening_balance.price')}</th>
                <th className="pb-3 w-price">{msg.get('opening_balance.total')}</th>
                <th className="pb-3 w-btn">&nbsp;</th>
                <th className="pb-3 w-btn">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {formRowData?.length > 0 ? (
                <AddDynamicInputFields formRowData={formRowData} unitsData={unitsData} />
              ) : (
                <AddDynamicInputFields
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
          </table>
        </div>
        <div className="bg-blue-100 align-items-end">
          <div style={{ clear: 'both' }}></div>
          <div
            className={`mb-4 clearfix row-invoice-error ${showTableError ? 'block' : 'hidden'}`}
          >
            {msg.get('invoice.rows.error')}
          </div>
          <hr />
          <div className="float-right pt-3">
            <Link
              className="btn-back"
              title={msg.get('invoice.back')}
              href={`/invoice-incoming`}
            >
              {msg.get('invoice.back')}
            </Link>
            {formData.status_id != 2 && (
              <Link
                disabled={processing}
                className="btn-submit"
                onClick={e => submit(e)} href={''}              >
                {msg.get('invoice.save')}
              </Link>
            )}

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-gray-600">
                {msg.get('invoice.saved')}
              </p>
            </Transition>
          </div>
        </div>
      </form>
    </section>
  );
}
