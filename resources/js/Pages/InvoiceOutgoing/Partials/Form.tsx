import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoice from '../../../Lang/Invoice/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import AddDynamicInputFields from './Row';
import InputCalendar from '../../../Components/Form/InputCalendar';
import {
  invoiceItemsSelector,
  invoiceTaxSelector,
  tableErrorSelector,
} from '../../../Redux/OutgoingInvoice/selectors';
import {
  setInvoiceTax,
  setShowTableError,
} from '../../../Redux/OutgoingInvoice';
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
  taxData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngInvoice,
    locale: appLang,
  });
  const dispatch = useDispatch();
  const invoiceItems = useSelector(invoiceItemsSelector);
  const documentTax = useSelector(invoiceTaxSelector);
  const showTableError = useSelector(tableErrorSelector);

  const [values, setValues] = useState({
    invoice_number: formData.invoice_number ? formData.invoice_number : '',
    invoice_date: formData.invoice_date,
    clinic_id: clinicData.id,
    store_id: formData.store_id,
    customer_id: formData.customer_id,
    producer_id: formData.producer_id,
    status_id: formData.status_id,
    type_id: formData.type_id,
    comment: formData.comment,
    currency_id: formData.currency_id,
    tax_id: formData.tax_id,
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

    values['rows'] = invoiceItems;
    values['invoice_date'] = new Date();
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
        router.post(`/invoice-outgoing/update?id=${formData.id}`, {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          store_id: values.store_id,
          customer_id: values.customer_id,
          producer_id: values.producer_id,
          status_id: values.status_id,
          currency_id: values.currency_id,
          type_id: values.type_id,
          tax_id: values.tax_id,
          rows: invoiceItems,
        });
      } else {
        router.post('/invoice-outgoing/update', {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          store_id: values.store_id,
          customer_id: values.customer_id,
          producer_id: values.producer_id,
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
          <Link className="icon-back" href={'/invoice-outgoing'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('invoice.title.edit')
            : msg.get('invoice.title.create')}
        </h2>
      </header>
      <form
        onSubmit={submit}
        className="mt-0 space-y-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 px-2">
            <div className="mb-2 flex gap-2">
              <div className="w-1/4">
                <InputText
                  name={'invoice_number'}
                  values={values}
                  dataValue={values.invoice_number}
                  value={values.invoice_number}
                  onChange={handleChange}
                  required
                  label={msg.get('invoice.number')}
                />
              </div>
              <div className="w-1/4">
                <InputCalendar
                  name={'invoice_date'}
                  values={values}
                  dataValue={values.invoice_date}
                  value={values.invoice_date}
                  onChange={handleChange}
                  required
                  label={msg.get('invoice.date')}
                />
              </div>
              <div className="w-1/4">
                <InputSelect
                  translatable={true}
                  name={'currency_id'}
                  className={'mb-1'}
                  values={values}
                  value={values.currency_id}
                  options={currencyData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('invoice.currency')}
                />
              </div>
              <div className="w-1/4">
                <InputSelect
                  translatable={true}
                  name={'status_id'}
                  className={'mb-1'}
                  values={values}
                  value={values.status_id}
                  options={statusData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('invoice.status')}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <div className="mb-2">
              <div className="flex gap-2">
                <div className="w-1/4">
                  <InputSelect
                    name={'producer_id'}
                    values={values}
                    value={values.producer_id}
                    options={producerData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('invoice.buyer')}
                  />
                </div>
                <div className="w-1/4">
                  <InputSelect
                    name={'store_id'}
                    values={values}
                    value={values.store_id}
                    options={storeData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('invoice.store')}
                  />
                </div>
                <div className="w-1/4">
                  <InputTaxSelect
                    translatable={true}
                    name={'tax_id'}
                    className={'mb-1 t-select'}
                    values={values}
                    value={values.tax_id}
                    options={taxData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('invoice.tax')}
                  />
                </div>
                <div className="w-1/4">
                  <InputSelect
                    name={'customer_id'}
                    values={values}
                    value={values.customer_id}
                    options={customerData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('invoice.person')}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2"></div>
          </div>
        </div>

        <div className="relative">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-3">{msg.get('invoice.product')}</th>
                <th className="pb-3 w-qty">{msg.get('invoice.qty')}</th>
                <th className="pb-3 w-price">{msg.get('invoice.price')}</th>
                <th className="pb-3 w-price">{msg.get('invoice.tax')}</th>
                <th className="pb-3 w-price">{msg.get('invoice.total')}</th>
                <th className="pb-3 w-btn">&nbsp;</th>
                <th className="pb-3 w-btn">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {formRowData?.length > 0 ? (
                <AddDynamicInputFields formRowData={formRowData} />
              ) : (
                <AddDynamicInputFields
                  formRowData={[
                    {
                      product_id: '',
                      product: '',
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
        <div>
          <div style={{ clear: 'both' }}></div>
          <div
            className={`mb-4 clearfix row-invoice-error ${showTableError ? 'block' : 'hidden'}`}
          >
            {msg.get('invoice.rows.error')}
          </div>
          <div className="row w-full">
            <Link
              className="btn-back"
              title={msg.get('invoice.back')}
              href={`/invoice-outgoing`}
            >
              {msg.get('invoice.back')}
            </Link>
            <Link
              disabled={processing}
              className="btn-submit"
              onClick={e => submit(e)}
            >
              {msg.get('invoice.save')}
            </Link>

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
