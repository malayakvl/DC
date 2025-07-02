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
import lgnPatientStatus from '../../../Lang/PatientStatus/translation';
import InputText from '../../../Components/Form/InputText';

export default function Form({ clinicData, formData, className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lgnPatientStatus,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name,
    discount: formData.discount,
    clinic_id: clinicData.id,
  });

  const { processing, recentlySuccessful, errors } = useForm();
  console.log('formData', formData);
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
    if (formData.id) {
      router.post(`/patient-status/update?id=${formData.id}`, values);
    } else {
      router.post('/patient-status/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/patient-statuses'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('status.title.edit')
            : msg.get('status.title.create')}
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
          label={msg.get('status.name')}
        />
        <InputText
          name={'discount'}
          values={values}
          dataValue={values.discount}
          value={values.discount}
          onChange={handleChange}
          required
          label={msg.get('status.discount')}
        />
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('unit.back')}
            href={`/patient-statuses`}
          >
            {msg.get('status.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('status.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('status.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
