import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngStore from '../../../Lang/MaterialCategories/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import lngMaterialCategories from '../../../Lang/MaterialCategories/translation';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';

export default function Form({
  categoryData = null,
  clinicData,
  producerData,
  formData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterialCategories,
    locale: appLang,
  });
  const [values, setValues] = useState({
    name: formData.name,
    clinic_id: clinicData.id,
    producer_id: formData.producer_id,
    parent_id: formData.parent_id,
    percent: formData.percent,
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
      router.post(`/material-category/update?id=${formData.id}`, values);
    } else {
      router.post('/material-category/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/material-categories'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('mCategories.title.edit')
            : msg.get('mCategories.title.create')}
        </h2>
      </header>

      <form
        onSubmit={submit}
        className="mt-0 space-y-4"
        encType="multipart/form-data"
      >
        <InputTreeSelect
          name={'parent_id'}
          values={values}
          value={values.parent_id}
          options={categoryData}
          onChange={handleChangeSelect}
          required
          label={msg.get('mCategories.category')}
        />
        <InputSelect
          name={'producer_id'}
          values={values}
          value={values.producer_id}
          options={producerData}
          onChange={handleChangeSelect}
          required
          label={msg.get('mCategories.brand')}
        />
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('mCategories.name')}
        />
        <InputText
          name={'percent'}
          values={values}
          dataValue={values.percent}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('mCategories.percent')}
        />
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('mCategories.back')}
            href={`/material-categories`}
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
