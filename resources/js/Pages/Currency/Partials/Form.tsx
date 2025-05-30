import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCurrency from '../../../Lang/Currrency/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';

export default function Form({ clinicData, formData, className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCurrency,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name,
    rate: formData.rate,
    clinic_id: clinicData.id,
    currency_id: formData.id,
    symbol: formData.symbol,
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
    if (formData.id) {
      router.post(`/currency/update?id=${formData.id}`, values);
    } else {
      router.post('/currency/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/currency'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('currency.title.edit')
            : msg.get('currency.title.create')}
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
          label={msg.get('currency.name')}
        />
        <InputText
          name={'symbol'}
          values={values}
          dataValue={values.symbol}
          value={values.symbol}
          onChange={handleChange}
          required
          label={msg.get('currency.symbol')}
        />
        <InputText
          name={'rate'}
          values={values}
          dataValue={values.rate}
          value={values.rate}
          onChange={handleChange}
          required
          label={msg.get('currency.rate')}
        />
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('currency.back')}
            href={`/producers`}
          >
            {msg.get('currency.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('currency.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('currency.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
