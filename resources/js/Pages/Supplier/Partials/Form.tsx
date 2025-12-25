import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngSupplier from '../../../Lang/Supplier/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';

export default function Form({ clinicData, formData, className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngSupplier,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name,
    contact_name: formData.contact_name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    clinic_id: clinicData.id,
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

  const handleChangeFile = e => {
    const key = e.target.id;
    setValues(values => ({
      ...values,
      [key]: e.target.files[0],
    }));
  };

  const submit = e => {
    e.preventDefault();
    if (formData.id) {
      router.post(`/supplier/update?id=${formData.id}`, values);
    } else {
      router.post('/supplier/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/producers'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('supplier.title.edit')
            : msg.get('supplier.title.create')}
        </h2>
      </header>

      <form
        onSubmit={submit}
        className="mt-0 space-y-4"
        encType="multipart/form-data"
      >
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('supplier.name')}
        />
        <InputText
          name={'contact_name'}
          values={values}
          dataValue={values.contact_name}
          value={values.contact_name}
          onChange={handleChange}
          required
          label={msg.get('supplier.contact_name')}
        />
        <InputText
          name={'email'}
          values={values}
          dataValue={values.email}
          value={values.email}
          onChange={handleChange}
          label={msg.get('supplier.email')}
        />
        <InputText
          name={'phone'}
          values={values}
          dataValue={values.phone}
          value={values.phone}
          onChange={handleChange}
          label={msg.get('supplier.phone')}
        />
        <InputText
          name={'address'}
          values={values}
          dataValue={values.address}
          value={values.address}
          onChange={handleChange}
          label={msg.get('supplier.address')}
        />
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('supplier.back')}
            href={`/suppliers`}
          >
            {msg.get('supplier.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('supplier.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('supplier.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
