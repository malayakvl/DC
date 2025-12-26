import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../../Lang/Act/translation';
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
    messages: lngAct,
    locale: appLang,
  });
  const dispatch = useDispatch();
  const invoiceItems = useSelector(invoiceItemsSelector);
  const documentTax = useSelector(invoiceTaxSelector);
  const showTableError = useSelector(tableErrorSelector);
  // const [showRowsError, setShowRowsError] = useState(false);

  const [values, setValues] = useState({
    act_number: formData.invoice_number ? formData.invoice_number : '',
    act_date: formData.invoice_date,
    clinic_id: clinicData.id,
    patient_id: formData.patient_id,
    doctor_id: formData.doctor_id,
    status_id: formData.status_id,
    visit_id: formData.visit_id,
    comment: formData.comment,
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
    if (!values['act_date']) {
      values['act_date'] = new Date();
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
        router.post(`/invoice-incoming/update?id=${formData.id}`, {
          act_number: values.act_number,
          act_date: values.act_date,
          clinic_id: values.clinic_id,
          patient_id: values.patient_id,
          doctor_id: values.doctor_id,
          status_id: values.status_id,
          type_id: values.type_id,
          rows: invoiceItems,
        });
      } else {
        router.post('/invoice-incoming/update', {
          act_number: values.act_number,
          act_date: values.act_date,
          clinic_id: values.clinic_id,
          patient_id: values.patient_id,
          doctor_id: values.doctor_id,
          status_id: values.status_id,
          type_id: values.type_id,
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
            ? msg.get('act.title.edit')
            : msg.get('act.title.create')}
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
                <div className="w-1/4">
                  <InputText
                    name={'act_number'}
                    values={values}
                    dataValue={values.act_number}
                    value={values.act_number}
                    onChange={handleChange}
                    required
                    label={msg.get('act.number')}
                  />
                </div>
                <div className="w-1/4">
                  <InputCalendar
                    name={'act_date'}
                    values={values}
                    dataValue={values.act_date}
                    value={values.act_date}
                    onChange={handleChangeCalendar}
                    required
                    label={msg.get('act.date')}
                  />
                </div>
                <div className={`w-1/4`}>
                  <InputSelect
                    translatable={true}
                    name={'status_id'}
                    className={'mb-1'}
                    values={values}
                    value={values.status_id}
                    options={statusData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('act.status')}
                  />
                </div>
                <div className="w-1/4">
                    <InputCustomerSelect
                      name={'doctor_id'}
                      values={values}
                      value={values.doctor_id}
                      options={customerData}
                      onChange={handleChangeSelect}
                      required
                      label={msg.get('act.doctor')}
                    />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="mb-2">
                <div className="flex gap-2">
                  <div className="w-1/4">
                    <InputSelect
                      name={'patient_id'}
                      values={values}
                      value={values.patient_id}
                      options={producerData}
                      onChange={handleChangeSelect}
                      required
                      label={msg.get('act.patient')}
                    />
                  </div>
                  <div className={`w-1/4`}>
                    <InputSelect
                      translatable={true}
                      name={'visit_id'}
                      className={'mb-1'}
                      values={values}
                      value={values.visit_id}
                      options={statusData}
                      onChange={handleChangeSelect}
                      required
                      label={msg.get('act.visits')}
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
                <th className="pb-3">{msg.get('invoice.product')}</th>
                <th className="pb-3 w-qty">{msg.get('invoice.qty')}</th>
                <th className="pb-3">{msg.get('invoice.unit')}</th>
                <th className="pb-3">{msg.get('invoice.factqty')}</th>
                <th className="pb-3 w-price">{msg.get('invoice.price')}</th>
                <th className="pb-3 w-price">{msg.get('invoice.tax')}</th>
                <th className="pb-3 w-price">{msg.get('invoice.total')}</th>
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
          <hr/>
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
