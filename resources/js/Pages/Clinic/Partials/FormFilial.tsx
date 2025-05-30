import InputError from '../../../Components/Form/InputError';
import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFilial from '../../../Lang/Filial/translation';
import { router } from '@inertiajs/react';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';

export default function FilialForm({
  clinicData,
  filialData,
  storeData,
  employeesData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngFilial,
    locale: appLang,
  });
  const { errors } = usePage().props;

  const [values, setValues] = useState({
    name: filialData.name,
    address: filialData.address,
    uraddress: filialData.uraddress,
    inn: filialData.inn,
    edrpou: filialData.edrpou,
    phone: filialData.phone,
    clinic_id: clinicData.id,
    store_id: filialData.store_id,
    file: null,
    ceo_id: null,
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

  const handleChangeSelect = e => {
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
    if (filialData.id) {
      router.post(`/filial/update?id=${filialData.id}`, values);
    } else {
      router.post('/filial/update', values);
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/filials'}>
            &nbsp;
          </Link>
          {filialData.id
            ? msg.get('filial.title.edit')
            : msg.get('filial.title.create')}
        </h2>
      </header>

      <form
        onSubmit={submit}
        className="mt-0 space-y-4"
        encType="multipart/form-data"
      >
        <InputSelect
          name={'ceo_id'}
          values={values}
          value={values.ceo_id}
          options={employeesData}
          onChange={handleChangeSelect}
          required
          label={msg.get('filial.ceo')}
        />
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('filial.name')}
        />
        <InputSelect
          name={'store_id'}
          values={values}
          value={values.store_id}
          options={storeData}
          onChange={handleChangeSelect}
          required
          label={msg.get('filial.store')}
        />
        <InputText
          name={'address'}
          values={values}
          dataValue={values.address}
          value={values.address}
          onChange={handleChange}
          required
          label={msg.get('filial.address')}
        />
        <InputText
          name={'uraddress'}
          values={values}
          dataValue={values.uraddress}
          value={values.uraddress}
          onChange={handleChange}
          required
          label={msg.get('filial.uraddress')}
        />
        <InputText
          name={'inn'}
          values={values}
          dataValue={values.inn}
          value={values.inn}
          onChange={handleChange}
          required
          label={msg.get('filial.inn')}
        />
        <InputText
          name={'edrpou'}
          values={values}
          dataValue={values.edrpou}
          value={values.edrpou}
          onChange={handleChange}
          required
          label={msg.get('filial.edrpou')}
        />
        <InputText
          name={'phone'}
          values={values}
          dataValue={values.phone}
          value={values.phone}
          onChange={handleChange}
          required
          label={msg.get('filial.phone')}
        />

        <InputLabel htmlFor="name" value={msg.get('filial.stamp')} />
        <div className="input_container">
          <input
            type="file"
            id="file"
            className="w-full px-4 py-0"
            name="file"
            onChange={handleChangeFile}
          />
          <InputError className="mt-2" message={errors.file} />
        </div>
        <div>
          <img src={filialData.stamp} width={100} />
        </div>
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('filial.back')}
            href={`/filials`}
          >
            {msg.get('filial.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('filial.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('filial.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
