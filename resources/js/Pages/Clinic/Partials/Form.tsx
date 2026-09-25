import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngClinic from '../../../Lang/Clinic/translation';
import InputText from '../../../Components/Form/InputText';
import React from 'react';
import InputSelect from '../../../Components/Form/InputSelect';
import StickyFormFooter from '../../../Components/Common/StickyFormFooter';
import FormHeader from '../../../Components/Common/FormHeader';

export default function ClinicForm({ clinicData, currencyData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngClinic,
    locale: appLang,
  });

  const { data, setData, post, processing, recentlySuccessful, errors, setError, clearErrors } =
    useForm({
      name: clinicData.name || '',
      address: clinicData.address || '',
      uraddress: clinicData.uraddress || '',
      inn: clinicData.inn || '',
      edrpou: clinicData.edrpou || '',
      phone: clinicData.phone || '',
      file: null,
      currency_id: clinicData.currency_id || '',
      form: '',
    });

  const handleChange = (e) => {
    setData(e.target.id, e.target.value);
  };

  const handleChangeSelect = (e) => {
    setData(e.target.id, e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Always submit with clinic ID since we're only updating an existing clinic
    if (clinicData.id) {
      post(`/clinic/update?id=${clinicData.id}`);
    } else {
      // If for some reason clinicData.id is not set, show an error
      setError(
        'form',
        'Clinic data is not properly initialized. Please refresh the page and try again.'
      );
    }
  };
  return (
    <section>
      <div className="flex flex-col gap-3 mt-2">
        <FormHeader
          title={formData?.id ? msg.get('clinic.title.edit') : msg.get('clinic.title.create')}
          description={msg.get('clinic.title.description')}
          backUrl="/dashboard"
          processing={processing}
          saveText={msg.get('customer.save') || 'Зберегти зміни'}
        />
      </div>
      <header>
        <h2>{msg.get('clinic.title.create')}</h2>
      </header>

      <form onSubmit={submit} className="mt-0 space-y-4">
        {errors.form && <div className="form-error mb-4">{errors.form}</div>}
        <InputText
          name={'name'}
          values={data}
          onChange={handleChange}
          required
          label={msg.get('clinic.name')}
          error={errors.name}
        />
        <InputText
          name={'address'}
          values={data}
          onChange={handleChange}
          required
          label={msg.get('clinic.address')}
          error={errors.address}
        />
        <InputText
          name={'uraddress'}
          values={data}
          onChange={handleChange}
          required
          label={msg.get('clinic.uraddress')}
          error={errors.uraddress}
        />
        <InputText
          name={'inn'}
          values={data}
          onChange={handleChange}
          required
          label={msg.get('clinic.inn')}
          error={errors.inn}
        />
        <InputText
          name={'edrpou'}
          values={data}
          onChange={handleChange}
          required
          label={msg.get('clinic.edrpou')}
          error={errors.edrpou}
        />
        <InputText
          name={'phone'}
          values={data}
          onChange={handleChange}
          required
          label={msg.get('clinic.phone')}
          error={errors.phone}
        />
        <InputSelect
          translatable={true}
          name={'currency_id'}
          className={'mb-1'}
          values={data}
          value={data.currency_id}
          options={currencyData}
          onChange={handleChangeSelect}
          required
          label={msg.get('clinic.currency')}
          error={errors.currency_id}
        />
        {/* Master Action Footer Bar */}
        <StickyFormFooter
          backUrl="/"
          backLabel={msg.get('clinic.back') || 'Повернутись'}
          saveLabel={msg.get('clinic.save') || 'Зберегти'}
          processingLabel="Збереження..."
          successMessage={msg.get('clinic.saved') || 'Збережено успішно!'}
          processing={processing}
          recentlySuccessful={recentlySuccessful}
        />
      </form>
    </section>
  );
}
