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
import StickyFormFooter from '../../../Components/Common/StickyFormFooter';
import FormHeader from '../../../Components/Common/FormHeader';

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
      <div className="flex flex-col gap-3 mt-2">
        <FormHeader
          title={formData?.id ? msg.get('store.title.edit') : msg.get('store.title.create')}
          description={msg.get('store.title.description')}
          backUrl="/stores"
          processing={processing}
          saveText={msg.get('store.save') || 'Зберегти зміни'}
        />
      </div>
      <form onSubmit={submit} className="mt-0 space-y-4" encType="multipart/form-data">
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

        {/* Master Action Footer Bar */}
        <StickyFormFooter
          backUrl="/stores"
          backLabel={msg.get('store.back') || 'Повернутись'}
          saveLabel={msg.get('store.save') || 'Зберегти'}
          processingLabel="Збереження..."
          successMessage={msg.get('store.saved') || 'Збережено успішно!'}
          processing={processing}
          recentlySuccessful={recentlySuccessful}
        />
      </form>
    </section>
  );
}
