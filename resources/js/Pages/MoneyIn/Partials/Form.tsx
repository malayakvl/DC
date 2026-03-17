import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMoneyIn from '../../../Lang/MoneyIn/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import InputCalendar from '../../../Components/Form/InputCalendar';
import InputCustomerSelect from '../../../Components/Form/InputCustomerSelect';

import {
  invoiceItemsSelector,
  invoiceTaxSelector,
  tableErrorSelector,
} from '../../../Redux/OutgoingInvoice/selectors';

export default function Form({
  clinicData,
  statusData,
  typeData,
  paymentsMethodsData,
  customerData,
  formData,
  formRowData = null,
  currencyData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMoneyIn,
    locale: appLang,
  });
  const dispatch = useDispatch();
  const invoiceItems = useSelector(invoiceItemsSelector);
  const documentTax = useSelector(invoiceTaxSelector);
  const showTableError = useSelector(tableErrorSelector);
  console.log(msg)
  const [values, setValues] = useState({
    invoice_number: formData.invoice_number ? formData.invoice_number : '',
    invoice_date: formData.invoice_date,
    clinic_id: clinicData.id,
    account_id: formData.account_id,
    customer_id: formData.customer_id,
    status: formData.status,
    type_id: formData.type_id,
    comment: formData.comment,
    currency_id: formData.currency_id,
    amount: formData.amount,
  });

  const { processing, recentlySuccessful } = useForm();

  const handleChangeSelect = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
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

    values['rows'] = invoiceItems;
    values['invoice_date'] = new Date();
    let haveErrorInRow = false;
    invoiceItems.forEach(_row => {
      if (!_row.product_id) {
        haveErrorInRow = true;
      }
    });
    if (haveErrorInRow) {
      // dispatch(setShowTableError(true));
    } else {
      const taxData = documentTax.split('_');
      if (formData.id) {
        router.post(`/money-in/update?id=${formData.id}`, {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          account_id: values.account_id,
          customer_id: values.customer_id,
          status: values.status,
          currency_id: values.currency_id,
          type_id: values.type_id,
          amount: values.amount,
        });
      } else {
        router.post('/money-in/update', {
          invoice_number: values.invoice_number,
          invoice_date: values.invoice_date,
          clinic_id: values.clinic_id,
          account_id: values.account_id,
          customer_id: values.customer_id,
          status: values.status,
          currency_id: values.currency_id,
          type_id: values.type_id,
          amount: values.amount,
        });
      }
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/money-in'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('money_in.title.edit')
            : msg.get('money_in.title.create')}
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
              <div className="w-1/3">
                <InputText
                  name={'invoice_number'}
                  values={values}
                  dataValue={values.invoice_number}
                  value={values.invoice_number}
                  onChange={handleChange}
                  required
                  label={msg.get('money_in.number')}
                />
              </div>
              <div className="w-1/3">
                <InputCalendar
                  name={'invoice_date'}
                  values={values}
                  dataValue={values.invoice_date}
                  value={values.invoice_date}
                  onChange={handleChange}
                  required
                  label={msg.get('money_in.date')}
                />
              </div>
              <div className="w-1/3">
                <InputSelect
                  translatable={true}
                  name={'status'}
                  className={'mb-1'}
                  values={values}
                  value={values.status}
                  options={statusData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('money_in.status')}
                />

              </div>
            </div>
            <div className="mb-2 flex flex-row gap-2">
              <div className="w-1/3">
                <InputSelect
                  translatable={true}
                  name={'currency_id'}
                  className={'mb-1'}
                  values={values}
                  value={values.currency_id}
                  options={currencyData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('money_in.currency')}
                />
              </div>
              <div className="w-1/3">
                <InputSelect
                  name={'account_id'}
                  values={values}
                  value={values.account_id}
                  options={paymentsMethodsData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('money_in.account')}
                />
              </div>
              <div className="w-1/3">
                <InputCustomerSelect
                  name={'customer_id'}
                  values={values}
                  value={values.customer_id}
                  options={customerData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('money_in.person')}
                />
              </div>
            </div>
            <div className="mb-2 flex flex-row gap-2">
              <div className="w-1/2">
                <InputText
                  name={'amount'}
                  values={values}
                  value={values.amount}
                  onChange={handleChange}
                  required
                  label={msg.get('money_in.amount')}
                />
              </div>
            </div>
          </div>

        </div>

        {/* <div className="relative">
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
        </div> */}
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
              title={msg.get('money_in.back')}
              href={`/money-in`}
            >
              {msg.get('money_in.back')}
            </Link>
            <Link
              disabled={processing}
              className="btn-submit"
              onClick={e => submit(e)} href={''}            >
              {msg.get('money_in.save')}
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
    </section >
  );
}
