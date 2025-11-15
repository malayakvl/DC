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
import lngUnit from '../../../Lang/Unit/translation';
import InputText from '../../../Components/Form/InputText';

export default function Form({ clinicData, formData, className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngUnit,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name,
    unit_qty: formData.unit_qty,
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
      router.post(`/unit/update?id=${formData.id}`, values);
    } else {
      router.post('/unit/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/units'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('unit.title.edit')
            : msg.get('unit.title.create')}
        </h2>
      </header>

      <form onSubmit={submit} className="mt-0 space-y-4">
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('unit.name')}
        />
        <InputText
          name={'unit_qty'}
          values={values}
          dataValue={values.unit_qty}
          value={values.unit_qty}
          onChange={handleChange}
          required
          label={msg.get('unit.fact_qty')}
        />
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('unit.back')}
            href={`/units`}
          >
            {msg.get('unit.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('unit.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('unit.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
