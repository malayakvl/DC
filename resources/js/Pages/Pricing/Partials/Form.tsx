import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import lngServiceCategories from '../../../Lang/Services/translation';
import AddDynamicInputFields from '../Partials/Row';
import {
  pricingItemsSelector,
  totalPriceItemsSelector,
} from '../../../Redux/Pricing/selectors';

export default function Form({
  categoryData = null,
  clinicData,
  formRowData = null,
  formData,
  unitData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });
  const invoiceItems = useSelector(pricingItemsSelector);
  const totalItemPrice = useSelector(totalPriceItemsSelector);
  const [values, setValues] = useState({
    name: formData.name,
    clinic_id: clinicData.id,
    category_id: formData.category_id,
    price: formData.price,
  });
  const { processing, recentlySuccessful, errors } = useForm();

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

    if (formData.id) {
      router.post(`/pricing/update?id=${formData.id}`, values);
    } else {
      router.post('/pricing/update', {
        clinic_id: values.clinic_id,
        category_id: values.category_id,
        name: values.name,
        price: values.price,
        rows: invoiceItems,
      });
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/pricing'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('mCategories.pricing.edit')
            : msg.get('mCategories.service.create')}
        </h2>
      </header>

      <form
        onSubmit={submit}
        className="mt-0 space-y-4 min-w-[350px]"
        encType="multipart/form-data"
      >
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('mCategories.name')}
        />
        <InputSelect
          name={'category_id'}
          values={values}
          value={values.category_id}
          options={categoryData}
          onChange={handleChangeSelect}
          required
          label={msg.get('mCategories.category')}
        />
        <InputText
          name={'price'}
          values={values}
          dataValue={values.price}
          value={values.price}
          onChange={handleChange}
          // className={'max-w-[200px]'}
          required
          label={msg.get('mCategories.price')}
        />
        <div className="relative">
          <table className="w-full1">
            <thead>
              <tr>
                <th className="pb-3 w-[65%]">
                  {msg.get('mCategories.product')}
                </th>
                <th className="pb-3 w-unit">{msg.get('mCategories.unit')}</th>
                <th className="pb-3 w-qty">{msg.get('mCategories.qty')}</th>
                <th className="pb-3 w-btn">{msg.get('mCategories.price')}</th>
                <th className="pb-3 w-btn">{msg.get('mCategories.total')}</th>
                <th className="pb-3 w-btn">&nbsp;</th>
                <th className="pb-3 w-btn">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {formRowData?.length > 0 ? (
                <AddDynamicInputFields
                  formRowData={formRowData}
                  unitData={unitData}
                />
              ) : (
                <AddDynamicInputFields
                  formRowData={[
                    {
                      product_id: '',
                      product: '',
                      quantity: '',
                      price: '',
                      total: '',
                      unit_id: '',
                    },
                  ]}
                  unitData={unitData}
                />
              )}
            </tbody>
          </table>
          <div className="w-full border-t-2 text-right mt-4 font-bold">
            {msg.get('mCategories.total')}:{' '}
            {(
              Number(values['price'] ? values['price'] : 0) + totalItemPrice
            ).toFixed(2)}{' '}
          </div>
        </div>

        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('mCategories.back')}
            href={`/pricing`}
          >
            {msg.get('mCategories.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('mCategories.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">
              {msg.get('mCategories.saved')}
            </p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
