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

  const [isSameAddress, setIsSameAddress] = useState(
    formData?.address && formData?.uraddress ? formData.address === formData.uraddress : true
  );
  const [values, setValues] = useState({
    name: formData.name || '',
    address: formData.address || '',
    uraddress: formData.uraddress || '',
    phone: formData.phone || '',
    file: null,
    filial_id: formData.is_main
      ? null
      : formData.filial_id || (filialData && filialData.length > 0 ? filialData[0].id : null),
    user_id:
      formData.user_id || (customerData && customerData.length > 0 ? customerData[0].id : null),
  });

  const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
    id: formData.id || null,
    name: formData.name || '',
    address: formData.address || '',
    uraddress: formData.uraddress || '',
    phone: formData.phone || '',
    filial_id: formData.is_main
      ? null
      : formData.filial_id || (filialData && filialData.length > 0 ? filialData[0].id : null),
    file: null,
    user_id:
      formData.user_id || (customerData && customerData.length > 0 ? customerData[0].id : null),
    clinic_id: clinicData.id,
  });

  const handleChangeSelect = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleChange = (e) => {
    setData(e.target.id, e.target.value);
  };

  const handleToggleSameAddress = (e) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);
    if (checked) {
      setData('uraddress', data.address);
    }
  };

  // Автосинхронізація фактичної адреси в юридичну, якщо чекбокс активний
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setData('address', value);
    if (isSameAddress) {
      setData('uraddress', value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    post('/store/update');
  };

  return (
    <section>
      <div className="flex flex-col gap-3 mt-2">
        <FormHeader
          title={formData?.id ? msg.get('store.title.edit') : msg.get('store.title.create')}
          description={msg.get('store.title.description')}
          backUrl="/filials"
          processing={processing}
          saveText={msg.get('store.save') || 'Зберегти зміни'}
        />
      </div>
      {/* Main Form */}
      <form onSubmit={submit} className="flex flex-col gap-6" encType="multipart/form-data">
        {/* Section 1: Main Parameters */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">domain</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-900">1. Основні параметри складу</h2>
              <p className="text-xs text-gray-500">
                Назва, матеріально відповідальна особа та статус обліку
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Field: Назва складу */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold text-gray-900 flex items-center justify-between"
                htmlFor="name"
              >
                <span>
                  {msg.get('store.name') || 'Назва складу'} <span className="text-red-500">*</span>
                </span>
                <span className="text-[11px] text-gray-400 font-normal">Обов&#39;язкове</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute right-3.5 text-[20px] text-gray-400 pointer-events-none">
                  warehouse
                </span>
                <InputText
                  name={'name'}
                  values={data}
                  onChange={handleChange}
                  required
                  label={null}
                  className="w-full input-text"
                  error={errors.name}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              <p className="text-xs text-gray-500">
                Використовується при формуванні накладних, списань та звітності
              </p>
            </div>

            {/* Field: Відповідальна особа */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold text-gray-900 flex items-center justify-between"
                htmlFor="user_id"
              >
                <span>
                  {msg.get('store.ceo') || 'Матеріально відповідальна особа'}{' '}
                  <span className="text-red-500">*</span>
                </span>
                <span className="text-[11px] text-teal-700 font-medium">Право підпису актів</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute right-3.5 text-[20px] text-gray-400 pointer-events-none z-10">
                  badge
                </span>
                <InputSelect
                  name={'user_id'}
                  values={values}
                  value={values.user_id}
                  options={customerData}
                  onChange={handleChangeSelect}
                  required
                  label={null}
                  error={errors.user_id}
                />
                <span className="material-symbols-outlined absolute right-3 text-[20px] text-gray-400 pointer-events-none">
                  expand_more
                </span>
              </div>
              {errors.user_id && <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>}
              <p className="text-xs text-gray-500">
                Керівник або старша медсестра з повними правами інвентаризації
              </p>
            </div>

            {/* Field: Телефон */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label
                className="text-sm font-semibold text-gray-900 flex items-center justify-between"
                htmlFor="phone"
              >
                <span>
                  {msg.get('store.phone') || 'Телефон'} <span className="text-red-500">*</span>
                </span>
                <span className="text-[11px] text-gray-400 font-normal">
                  Внутрішній або мобільний
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute right-3.5 text-[20px] text-gray-400 pointer-events-none">
                  call
                </span>
                <InputText
                  name={'phone'}
                  values={data}
                  dataValue={data.phone}
                  value={data.phone}
                  onChange={handleChange}
                  required
                  label={null}
                  error={errors.phone}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              <p className="text-xs text-gray-500">
                Контактний номер для внутрішніх кур&#39;єрів та постачальників
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Location and Legal Address */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">location_on</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-gray-900">2. Локація та юридична адреса</h2>
                <p className="text-xs text-gray-500">
                  Фактичне місцезнаходження для логістики та документації
                </p>
              </div>
            </div>
            <button
              className="hidden sm:flex items-center gap-1 text-teal-700 hover:underline font-semibold text-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">map</span>
              Перевірити геокодування
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {/* Field: Фактична адреса */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold text-gray-900 flex items-center justify-between"
                htmlFor="address"
              >
                <span>
                  {msg.get('store.address') || 'Фактична адреса'}{' '}
                  <span className="text-red-500">*</span>
                </span>
                <span className="text-[11px] text-gray-400 font-normal">Фактичне знаходження</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400 pointer-events-none">
                  pin_drop
                </span>
                <input
                  id="address"
                  type="text"
                  value={data.address}
                  onChange={handleAddressChange}
                  required
                  placeholder="Місто, вулиця, номер будинку"
                  className="w-full h-11 pl-11 pr-24 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none transition-all"
                />
                <button
                  className="absolute right-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">my_location</span>
                  Карта
                </button>
              </div>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Quick Synchronize Address Checkbox */}
            <div className="p-4 rounded-lg bg-gray-50 flex items-center justify-between border border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSameAddress}
                  onChange={handleToggleSameAddress}
                  className="w-4 h-4 rounded text-teal-700 focus:ring-teal-700 accent-teal-700 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">
                  Юридична адреса повністю збігається з фактичною
                </span>
              </label>
              <span className="inline-flex items-center gap-1 font-semibold text-xs text-teal-700 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-200">
                <span className="material-symbols-outlined text-[14px]">sync_alt</span>
                Синхронізовано
              </span>
            </div>

            {/* Field: Юридична адреса */}
            <div
              className={`flex flex-col gap-1.5 transition-all ${isSameAddress ? 'opacity-75' : 'opacity-100'}`}
            >
              <label
                className="text-sm font-semibold text-gray-900 flex items-center justify-between"
                htmlFor="uraddress"
              >
                <span>
                  {msg.get('store.uraddress') || 'Юридична адреса'}{' '}
                  <span className="text-red-500">*</span>
                </span>
                <span className="text-[11px] text-gray-400 font-normal">Для податкових та ТТН</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400 pointer-events-none">
                  gavel
                </span>
                <input
                  id="uraddress"
                  type="text"
                  value={data.uraddress}
                  readOnly={isSameAddress}
                  onChange={handleChange}
                  required
                  placeholder="Юридична адреса за документами"
                  className={`w-full h-11 pl-11 pr-4 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none transition-all ${isSameAddress ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50 focus:bg-white focus:border-teal-700 focus:ring-1 focus:ring-teal-700'}`}
                />
              </div>
              {errors.uraddress && <p className="text-red-500 text-xs mt-1">{errors.uraddress}</p>}
              <p className="text-xs text-gray-500">
                Використовується в офіційних актах оприбуткування та договорах з постачальниками
              </p>
            </div>
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
