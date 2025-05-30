import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCabinet from '../../../Lang/Cabinet/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';

export default function Form({
  clinicData,
  filialData,
  formData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCabinet,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: formData.name,
    place_count: formData.place_count,
    filial_id: formData.filial_id,
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

  const submit = e => {
    e.preventDefault();
    if (formData.id) {
      router.post(`/cabinet/update?id=${formData.id}`, values);
    } else {
      router.post('/cabinet/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/cabinets'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('cabinet.title.edit')
            : msg.get('cabinet.title.create')}
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
          label={msg.get('cabinet.filial')}
        />
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('cabinet.name')}
        />
        <InputText
          name={'place_count'}
          values={values}
          dataValue={values.place_count}
          value={values.place_count}
          onChange={handleChange}
          required
          label={msg.get('cabinet.place.count')}
        />
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('cabinet.back')}
            href={`/cabinets`}
          >
            {msg.get('cabinet.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('cabinet.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('size.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
