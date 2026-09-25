import { useForm, usePage } from '@inertiajs/react';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFilial from '../../../Lang/Filial/translation';
import { router } from '@inertiajs/react';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import StickyFormFooter from '../../../Components/Common/StickyFormFooter';
import FormHeader from '../../../Components/Common/FormHeader';

export default function FilialForm({
  clinicData,
  filialData,
  storeData,
  employeesData,
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngFilial,
    locale: appLang,
  });
  const { errors } = usePage().props;
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(filialData?.stamp || null);

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
  const [isSameAddress, setIsSameAddress] = useState(
    filialData?.address && filialData?.uraddress ? filialData.address === filialData.uraddress : true
  );

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

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues((values) => ({
        ...values,
        file: file,
      }));
      // Створюємо тимчасове посилання для перегляду картинки в браузері
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleToggleSameAddress = (e) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);
    if (checked) {
      setValues((prev) => ({ ...prev, uraddress: prev.address }));
    }
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
    <section>
      <div className="flex flex-col gap-3 mt-2">
        <FormHeader
          title={filialData?.id ? msg.get('filial.title.edit') : msg.get('filial.title.create')}
          description={msg.get('filial.title.description')}
          backUrl="/filials"
          processing={processing}
          saveText={msg.get('filial.save') || 'Зберегти зміни'}
        />
      </div>
      <form onSubmit={submit} className="mt-0 space-y-4 mt-4" encType="multipart/form-data">
        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
          <div className="flex items-start justify-between pb-4 border-b border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  1. Загальна інформація про філію
                </h2>
                <p className="text-sm text-gray-500">
                  Базові параметри відділення, відповідальна особа та логістичний склад
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Branch Name */}
            <div className="flex flex-col gap-1.5">
              <InputText
                name={'name'}
                values={values}
                dataValue={values.name}
                value={values.name}
                onChange={handleChange}
                required
                label={msg.get('filial.name')}
              />
              {errors.name && <p className="text-tertiary text-xs mt-1">{errors.name}</p>}
              <p className="text-xs text-gray-500">
                Відображається в картках записів, чеках та актах пацієнтів
              </p>
            </div>

            {/* Branch Head / CEO */}
            <div className="flex flex-col gap-1.5">
              <InputSelect
                name={'ceo_id'}
                values={values}
                value={values.ceo_id}
                options={employeesData}
                onChange={handleChangeSelect}
                required
                label={msg.get('filial.ceo')}
              />
              {errors.ceo_id && <p className="text-tertiary text-xs mt-1">{errors.ceo_id}</p>}
              <p className="text-xs text-gray-500">
                Лікар або менеджер з повними правами затвердження актів
              </p>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <div className="absolute right-[15px] top-[40px] flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[18px]">call</span>
                </div>
                <InputText
                  name={'phone'}
                  values={values}
                  dataValue={values.phone}
                  value={values.phone}
                  onChange={handleChange}
                  required
                  label={msg.get('filial.phone')}
                />
              </div>
              {errors.phone && <p className="text-tertiary text-xs mt-1">{errors.phone}</p>}
              <p className="text-xs text-gray-500">
                Прямий номер рецепції для запису пацієнтів та SMS-сповіщень
              </p>
            </div>

            {/* Warehouse Assignment */}
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <InputSelect
                  name={'store_id'}
                  values={values}
                  value={values.store_id}
                  options={storeData}
                  onChange={handleChangeSelect}
                  required
                  label={msg.get('filial.store')}
                />
              </div>
              {errors.store_id && <p className="text-tertiary text-xs mt-1">{errors.store_id}</p>}
              <p className="text-xs text-gray-500">
                Матеріали прийому списуватимуться з балансу обраного складу
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
          <div className="flex items-start justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">2. Адреса та геолокація</h2>
                <p className="text-xs text-gray-500">
                  Фактичне місцезнаходження кабінетів та юридична адреса підрозділу
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Actual Address */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm text-gray-900 font-semibold flex items-center justify-between"
                htmlFor="address"
              >
                <span className="flex items-center gap-1">
                  {msg.get('filial.address') || 'Фактична адреса клініки'}{' '}
                  <span className="text-red-500">*</span>
                </span>
                <button
                  type="button"
                  className="text-teal-700 hover:underline text-xs flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">my_location</span>
                  Перевірити по карті
                </button>
              </label>
              <div className="relative">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Місто, вулиця, номер будинку, корпус / офіс"
                  required
                  className="w-full input-text"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-gray-500 text-[18px]">
                  pin_drop
                </span>
              </div>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Synchronize Checkbox */}
            <div className="p-4 rounded-lg bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  id="same-address-toggle"
                  type="checkbox"
                  checked={isSameAddress}
                  onChange={handleToggleSameAddress}
                  className="w-4 h-4 rounded text-teal-700 focus:ring-teal-600 focus:ring-offset-0 cursor-pointer accent-teal-700"
                />
                <label
                  htmlFor="same-address-toggle"
                  className="text-sm text-gray-900 font-medium cursor-pointer select-none"
                >
                  Юридична адреса повністю збігається з фактичною
                </label>
              </div>
              <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-500 text-xs">
                Автосинхронізація
              </span>
            </div>

            {/* Legal Address (uraddress) */}
            <div
              className={`flex flex-col gap-1.5 transition-all ${isSameAddress ? 'opacity-75' : 'opacity-100'}`}
            >
              <label
                className="text-sm text-gray-900 font-semibold flex items-center gap-1"
                htmlFor="uraddress"
              >
                {msg.get('filial.uraddress') || 'Юридична адреса'}
                <span className="text-gray-500 font-normal">
                  (для договорів та рахунків-фактур)
                </span>
              </label>
              <div className="relative">
                <input
                  id="uraddress"
                  name="uraddress"
                  type="text"
                  value={values.uraddress}
                  readOnly={isSameAddress}
                  onChange={handleChange}
                  placeholder="Юридична адреса за реєстраційними документами"
                  className="w-full input-text"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-gray-500 text-[18px]">
                  apartment
                </span>
              </div>
              {errors.uraddress && <p className="text-red-500 text-xs mt-1">{errors.uraddress}</p>}
              <p className="text-xs text-gray-500">
                Використовується в офіційних фіскальних чеках та договорах надання медичних послуг
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Legal & Tax Details + Stamp */}
        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
          <div className="flex items-start justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  3. Юридичні та податкові реквізити
                </h2>
                <p className="text-sm text-gray-500">
                  Державні коди ЄДРПОУ, ІПН платника податків та електронна печатка
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* EDRPOU */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm text-gray-900 font-semibold flex items-center gap-1"
                htmlFor="edrpou"
              >
                {msg.get('filial.edrpou') || 'Код ЄДРПОУ'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="edrpou"
                  name="edrpou"
                  type="text"
                  maxLength={8}
                  value={values.edrpou}
                  onChange={handleChange}
                  placeholder="12345678"
                  required
                  className="w-full input-text"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-emerald-600 text-[18px]">
                  check_circle
                </span>
              </div>
              {errors.edrpou && <p className="text-red-500 text-xs mt-1">{errors.edrpou}</p>}
              <p className="text-xs text-gray-500">
                8-значний ідентифікаційний код юридичної особи
              </p>
            </div>

            {/* INN (IPN) */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm text-gray-900 font-semibold flex items-center gap-1"
                htmlFor="inn"
              >
                {msg.get('filial.inn') || 'Індивідуальний податковий номер (ІПН)'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="inn"
                  name="inn"
                  type="text"
                  maxLength={12}
                  value={values.inn}
                  onChange={handleChange}
                  placeholder="787878787878"
                  required
                  className="w-full input-text"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-emerald-600 text-[18px]">
                  check_circle
                </span>
              </div>
              {errors.inn && <p className="text-red-500 text-xs mt-1">{errors.inn}</p>}
              <p className="text-xs text-gray-500">10 або 12 цифр платника ПДВ або ФОП</p>
            </div>
          </div>

          {/* Stamp / Seal Upload Area */}
          <div className="flex flex-col gap-2 pt-2">
            <label
              className="text-sm text-gray-900 font-semibold flex items-center justify-between"
              htmlFor="file"
            >
              <span>{msg.get('filial.stamp') || 'Відбиток офіційної печатки філії'}</span>
              <span className="text-xs text-gray-500">
                Формати: PNG, SVG, PDF до 5 МБ з прозорим фоном
              </span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Upload Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="md:col-span-8 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group relative border border-dashed border-gray-200"
              >
                <input
                  type="file"
                  id="file"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleChangeFile}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-teal-700 mb-3 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">cloud_upload</span>
                  </div>
                  <p className="text-sm text-gray-900 font-semibold">
                    {values.file
                      ? values.file.name
                      : 'Натисніть для завантаження або перетягніть файл сюди'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Рекомендовано: квадратне зображення 800×800 px у форматі PNG (300 DPI)
                  </p>
                  {errors.file && <p className="text-red-500 text-xs mt-2">{errors.file}</p>}
                </div>
              </div>

              {/* Current Seal Status & Preview Card */}
              <div className="md:col-span-4 p-4 rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-3 border border-gray-200">
                <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden border border-gray-100">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Seal Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-20 h-20 text-teal-700 opacity-80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 100 100"
                    >
                      <circle cx="50" cy="50" r="45" strokeDasharray="3 3"></circle>
                      <circle cx="50" cy="50" r="38"></circle>
                      <circle cx="50" cy="50" fill="currentColor" fillOpacity="0.1" r="16"></circle>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-semibold text-gray-900">
                    {previewUrl ? 'Поточна печатка' : 'Печатка не завантажена'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {filialData?.id ? `ID філії: ${filialData.id}` : 'Нова філія'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Master Action Footer Bar */}
        <StickyFormFooter
          backUrl="/filials"
          backLabel={msg.get('filial.back') || 'Повернутись'}
          saveLabel={msg.get('filial.save') || 'Зберегти'}
          processingLabel="Збереження..."
          successMessage={msg.get('filial.saved') || 'Збережено успішно!'}
          processing={processing}
          recentlySuccessful={recentlySuccessful}
        />
      </form>
    </section>
  );
}
