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
} from '../../../Redux/Incominginvoice/selectors';
import {
  setInvoiceTax,
  setShowTableError,
} from '../../../Redux/Incominginvoice';
import InputTaxSelect from '../../../Components/Form/InputTaxSelect';
import { setWarehouse } from '../../../Redux/Changeinvoice';

export default function Form({
  clinicData,
  storeData,
  statusData,
  customerData,
  formData,
  formRowData = null,
  className = '',
  unitsData
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
  // const [showRowsError, setShowRowsError] = useState(false);

  const [values, setValues] = useState({
    invoice_number: formData.invoice_number ? formData.invoice_number : '',
    invoice_date: formData.invoice_date,
    clinic_id: clinicData.id,
    status_id: formData.status_id,
    customer_id: formData.customer_id,
    storefrom_id: formData.storefrom_id,
    storeto_id: formData.storeto_id,
    comment: formData.comment,
    currency_id: formData.currency_id,
  });

  const { processing, recentlySuccessful } = useForm();

  const handleChangeSelect = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
    if (key === 'storefrom_id') {
      dispatch(setWarehouse(e.target.value));
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

  const handleChangeCalendar = data => {
    console.log(data);
    const key = 'invoice_date';
    const value = data;
    setValues(values => ({
      ...values,
      [key]: data,
    }));
  };

  const submit = e => {
    e.preventDefault();
    values['rows'] = invoiceItems;
    if (!values['invoice_date']) {
      values['invoice_date'] = new Date();
    }
    // values['invoice_date'] = new Date();
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
        router.post(`/invoice-change/update?id=${formData.id}`, {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          storefrom_id: values.storefrom_id,
          storeto_id: values.storeto_id,
          customer_id: values.customer_id,
          status_id: values.status_id,
          rows: invoiceItems,
        });
      } else {
        router.post('/invoice-change/update', {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          storefrom_id: values.storefrom_id,
          storeto_id: values.storeto_id,
          customer_id: values.customer_id,
          status_id: values.status_id,
          rows: invoiceItems,
        });
      }
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/invoice-incoming'}>
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
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-full px-2">
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
                    onChange={handleChangeCalendar}
                    required
                    label={msg.get('invoice.date')}
                  />
                </div>
                <div className="w-1/3">
                  <InputSelect
                    name={'storefrom_id'}
                    values={values}
                    value={values.storefrom_id}
                    options={storeData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('invoice.store')}
                  />
                </div>
                <div className="w-1/3">
                  <InputSelect
                    name={'storeto_id'}
                    values={values}
                    value={values.storeto_id}
                    options={storeData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('invoice.store')}
                  />
                </div>
                <div className="w-1/3">
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
                <div className="w-1/2">
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
          </div>
        </div>
        <div className="relative">
          <table className="invoice-table">
            <thead>
              <tr>
                <th className="pb-3">{msg.get('invoice.product')}</th>
                <th className="pb-3 w-qty">{msg.get('invoice.qty')}</th>
                <th className="pb-3">{msg.get('invoice.unit')}</th>
                <th className="pb-3">{msg.get('invoice.factqty')}</th>
                {/*<th className="pb-3 w-price">{msg.get('invoice.price')}</th>*/}
                {/*<th className="pb-3 w-price">{msg.get('invoice.tax')}</th>*/}
                {/*<th className="pb-3 w-price">{msg.get('invoice.total')}</th>*/}
                <th className="pb-3 w-btn">&nbsp;</th>
                <th className="pb-3 w-btn">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {formRowData?.length > 0 ? (
                <AddDynamicInputFields unitsData={unitsData} formRowData={formRowData} />
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
              href={`/invoice-incoming`}
            >
              {msg.get('invoice.back')}
            </Link>
            {formData.status_id != 2 && (
              <Link
                disabled={processing}
                className="btn-submit"
                onClick={e => submit(e)}
              >
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
