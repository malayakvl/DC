import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngProducer from '../../../Lang/Producer/translation';
import InputText from '../../../Components/Form/InputText';

export default function Form({
  clinicData,
  formData,
  className = '',
}: {
  clinicData: any;
  formData: any;
  className: string;
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngProducer,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name,
    clinic_id: clinicData.id,
  });

  const { processing, recentlySuccessful } = useForm();

  const handleChange = (e: any) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (formData.id) {
      router.post(`/producer/update?id=${formData.id}`, values);
    } else {
      router.post('/producer/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/producers'}>
            &nbsp;
          </Link>
          {formData?.id ? msg.get('producer.title.edit') : msg.get('producer.title.create')}
        </h2>
      </header>

      <form onSubmit={submit} className="mt-0 space-y-4" encType="multipart/form-data">
        <InputText
          name={'name'}
          values={values}
          onChange={handleChange}
          label={msg.get('producer.name')}
        />
        <div className="flex items-center">
          <Link className="btn-back" title={msg.get('producer.back')} href={`/producers`}>
            {msg.get('producer.back')}
          </Link>
          <PrimaryButton disabled={processing}>{msg.get('producer.save')}</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('producer.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
