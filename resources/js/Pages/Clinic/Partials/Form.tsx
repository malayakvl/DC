import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngClinic from '../../../Lang/Clinic/translation';
import InputText from '../../../Components/Form/InputText';
import React, { useState } from 'react';
import InputSelect from '../../../Components/Form/InputSelect';

export default function ClinicForm({
  clinicData,
  currencyData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngClinic,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: clinicData.name || '',
    address: clinicData.address || '',
    uraddress: clinicData.uraddress || '',
    inn: clinicData.inn || '',
    edrpou: clinicData.edrpou || '',
    phone: clinicData.phone || '',
    file: null,
    currency_id: clinicData.currency_id || '',
  });

  const { processing, recentlySuccessful, errors, setError, clearErrors } = useForm();

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeSelect = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const submit = e => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Always submit with clinic ID since we're only updating an existing clinic
    if (clinicData.id) {
      router.post(`/clinic/update?id=${clinicData.id}`, values, {
        onError: (errors) => {
          // Set errors to display in the form
          Object.keys(errors).forEach(key => {
            setError(key, errors[key]);
          });
        }
      });
    } else {
      // If for some reason clinicData.id is not set, show an error
      setError('form', 'Clinic data is not properly initialized. Please refresh the page and try again.');
    }
  };
  return (
    <section className={className}>
      <header>
        <h2>{msg.get('clinic.title.create')}</h2>
      </header>

      <form onSubmit={submit} className="mt-0 space-y-4">
        {errors.form && <div className="form-error mb-4">{errors.form}</div>}
        <InputText
          name={'name'}
          values={values}
          onChange={handleChange}
          required
          label={msg.get('clinic.name')}
          error={errors.name}
        />
        <InputText
          name={'address'}
          values={values}
          onChange={handleChange}
          required
          label={msg.get('clinic.address')}
          error={errors.address}
        />
        <InputText
          name={'uraddress'}
          values={values}
          onChange={handleChange}
          required
          label={msg.get('clinic.uraddress')}
          error={errors.uraddress}
        />
        <InputText
          name={'inn'}
          values={values}
          onChange={handleChange}
          required
          label={msg.get('clinic.inn')}
          error={errors.inn}
        />
        <InputText
          name={'edrpou'}
          values={values}
          onChange={handleChange}
          required
          label={msg.get('clinic.edrpou')}
          error={errors.edrpou}
        />
        <InputText
          name={'phone'}
          values={values}
          onChange={handleChange}
          required
          label={msg.get('clinic.phone')}
          error={errors.phone}
        />
        <InputSelect
          translatable={true}
          name={'currency_id'}
          className={'mb-1'}
          values={values}
          value={values.currency_id}
          options={currencyData}
          onChange={handleChangeSelect}
          required
          label={msg.get('clinic.currency')}
          error={errors.currency_id}
        />

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>
            {msg.get('clinic.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('clinic.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
