import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPaymentMethod from '../../../Lang/PaymentMethod/translation';
import InputText from '../../../Components/Form/InputText';

export default function Form({ clinicData, formData, className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPaymentMethod,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name || '',
  });

  const { processing, recentlySuccessful } = useForm();

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
      router.post(`/payment-method/update?id=${formData.id}`, values);
    } else {
      router.post('/payment-method/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/payment-methods'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('payment_method.edit')
            : msg.get('payment_method.create')}
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
          label={msg.get('payment_method.name')}
        />
        <div className="flex items-center space-x-4">
          <Link
            className="btn-back"
            href={`/payment-methods`}
          >
            &nbsp;
          </Link>
          <PrimaryButton disabled={processing}>
            OK
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-green-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
