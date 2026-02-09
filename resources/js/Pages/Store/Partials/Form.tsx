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
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState(stampPath ? stampPath : '/images/no-photo.png');


  const [values, setValues] = useState({
    name: formData.name || '',
    address: formData.address || '',
    uraddress: formData.uraddress || '',
    phone: formData.phone || '',
    file: null,
    filial_id: formData.is_main ? null : (formData.filial_id || (filialData && filialData.length > 0 ? filialData[0].id : null)),
    user_id: formData.user_id || (customerData && customerData.length > 0 ? customerData[0].id : null),
  });

  const { data, setData, post, processing, recentlySuccessful, errors, progress } = useForm({
    id: formData.id || null,
    name: formData.name || '',
    address: formData.address || '',
    uraddress: formData.uraddress || '',
    phone: formData.phone || '',
    filial_id: formData.is_main ? null : (formData.filial_id || (filialData && filialData.length > 0 ? filialData[0].id : null)),
    file: null,
    user_id: formData.user_id || (customerData && customerData.length > 0 ? customerData[0].id : null),
    clinic_id: clinicData.id,
  });

  const handleChangeSelect = e => {
    setData(e.target.name, e.target.value);
  };

  const handleChange = e => {
    setData(e.target.id, e.target.value);
  };

  const handleChangeFile = e => {
    setData('file', e.target.files[0]);
  };

  const submit = e => {
    e.preventDefault();
    post('/store/update');
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
        <div className="flex mt-[50px] px-[0px] mb-[50px]">
          <div className="md:w-1/2">
            <InputSelect
              name={'user_id'}
              values={values}
              value={values.user_id}
              options={customerData}
              onChange={handleChangeSelect}
              required
              label={msg.get('store.ceo')}
              error={errors.user_id}
            />
            <InputText
              name={'name'}
              values={data}
              onChange={handleChange}
              required
              label={msg.get('store.name')}
              error={errors.name}
            />
            <InputText
              name={'address'}
              values={data}
              dataValue={data.address}
              value={data.address}
              onChange={handleChange}
              required
              label={msg.get('store.address')}
              error={errors.address}
            />
            <InputText
              name={'uraddress'}
              values={data}
              dataValue={data.uraddress}
              value={data.uraddress}
              onChange={handleChange}
              required
              label={msg.get('store.uraddress')}
              error={errors.uraddress}
            />
            <InputText
              name={'phone'}
              values={data}
              dataValue={data.phone}
              value={data.phone}
              onChange={handleChange}
              required
              label={msg.get('store.phone')}
              error={errors.phone}
            />
          </div>
        </div>

        {/* <>
          <InputLabel htmlFor="file" value={msg.get('store.stamp')} children={null} />
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
          <div className="mt-4">
            {stampPath && <img src={stampPath} alt="Store Stamp" width={150} className="border p-2 rounded shadow-sm" />}
          </div>
        </> */}
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
