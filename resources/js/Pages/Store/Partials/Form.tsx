import InputError from '../../../Components/Form/InputError';
import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import TextInput from '../../../Components/Form/TextInput';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngStore from '../../../Lang/Store/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';

export default function Form({
  clinicData,
  filialData,
  customerData,
  formData,
  stampPath = null,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngStore,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name,
    address: formData.address,
    uraddress: formData.uraddress,
    phone: formData.phone,
    filial_id: formData.filial_id,
    file: null,
    user_id: formData.user_id,
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
      router.post(`/store/update?id=${formData.id}`, values);
    } else {
      router.post('/store/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/stores'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('store.title.edit')
            : msg.get('store.title.create')}
        </h2>
      </header>

      <form
        onSubmit={submit}
        className="mt-0 space-y-4"
        encType="multipart/form-data"
      >
        <InputSelect
          name={'filial_id'}
          values={values}
          value={values.filial_id}
          options={filialData}
          onChange={handleChangeSelect}
          required
          label={msg.get('store.filial')}
        />
        <InputSelect
          name={'user_id'}
          values={values}
          value={values.user_id}
          options={customerData}
          onChange={handleChangeSelect}
          required
          label={msg.get('store.ceo')}
        />
        <InputSelect
          name={'filial_id'}
          values={values}
          value={values.filial_id}
          options={filialData}
          onChange={handleChangeSelect}
          required
          label={msg.get('store.filial')}
        />
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('store.name')}
        />
        <InputText
          name={'address'}
          values={values}
          dataValue={values.address}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('store.address')}
        />
        <InputText
          name={'uraddress'}
          values={values}
          dataValue={values.uraddress}
          value={values.uraddress}
          onChange={handleChange}
          required
          label={msg.get('store.uraddress')}
        />
        <InputText
          name={'phone'}
          values={values}
          dataValue={values.phone}
          value={values.phone}
          onChange={handleChange}
          required
          label={msg.get('store.phone')}
        />
        <>
          <InputLabel htmlFor="name" value={msg.get('store.stamp')} />
          <div className="input_container">
            <input
              type="file"
              id="file"
              className="w-full px-4 py-0"
              name="file"
              onChange={handleChangeFile}
            />
            {/*<InputError className="mt-2" message={errors.file} />*/}
          </div>
          <div>{stampPath && <img src={stampPath} width={100} />}</div>
        </>
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('store.back')}
            href={`/stores`}
          >
            {msg.get('store.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('store.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('store.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
