// import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import InputTextarea from '../../../Components/Form/InputTextarea';
import { InputMask } from '@react-input/mask';
import moment from 'moment';
import StickyFormFooter from '../../../Components/Common/StickyFormFooter';
import FormHeader from '../../../Components/Common/FormHeader';


export default function Form({
  formData,
  customerData,
  contactData,
  statusesData,
  photoPath = null,
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState(photoPath ? photoPath : '/images/no-image.png');

  const [uploadedFile, setUploadedFile] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFile(acceptedFiles);
  }, []);

  const { data, setData, processing, post, recentlySuccessful, progress } = useForm({
    id: formData.id,
    file: null,
    first_name: formData.first_name,
    last_name: formData.last_name,
    primary_phone: formData.primary_phone,
    phone2: formData.phone2,
    discount: formData.discount,
    address: formData.address,
    email: formData.email,
    birthday: formData.birthday,
    gender: formData.gender,
    important_info: formData.important_info,
    medical_card_no: formData.medical_card_no,
    curator_id: formData.curator_id,
    register_date: formData.register_date ? formData.register_date : new Date(),
    contact: formData.contact,
    payment: formData.payment,
    status_id: formData.status_id,
    notice: formData.notice,
    patient_id: formData.patient_id,
  });
  const { errors } = usePage().props;


  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setData((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('patient.update'));
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <section>
      <div className="flex flex-col gap-3 mt-2">
        <FormHeader
          title={formData?.id ? msg.get('patient.title.edit') : msg.get('patient.title.create')}
          description={msg.get('patient.title.description')}
          backUrl="/patients"
          processing={processing}
          saveText={msg.get('patient.save') || 'Зберегти зміни'}
        />
      </div>
      {/* Шапка */}
      <div className="flex-1 max-w-[1780px] w-full mx-auto sm:px-6 lg:px-0 py-6 sm:py-8">
        <form onSubmit={submit} className="w-full" encType="multipart/form-data">
          {/* Верхний блок: Аватар + основные данные (ФИО, Телефон) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Блок аватарки */}
              <div className="photo-block">
                <div className="flex flex-row relative input-bordered">
                  <div className="product-preview material-preview inline-block">
                    {!selectedFile && !photoPath && (
                      <div className="upload-zone">
                        <p className="mt-3 text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                          {msg.get('patient.dragdrop_files')}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {msg.get('patient.or_select_file_type')}
                        </p>
                        <span className="inline-block mt-3 px-2 py-0.5 text-[11px] font-medium bg-slate-200/60 text-slate-600 rounded">
                          {msg.get('patient.file_sizes')}
                        </span>
                      </div>
                    )}
                    {!selectedFile && photoPath && (
                      <div
                        className={'product-photo'}
                        style={{
                          backgroundImage: `url(${photoPath})`,
                        }}
                      ></div>
                    )}
                    {selectedFile && (
                      <div
                        className="preview-photo"
                        style={{ backgroundImage: `url(${preview})` }}
                      ></div>
                    )}
                    <div className="btn-upload-photo-patient"></div>
                  </div>
                </div>
                <div className="upload-product-btn-block ml-[5px] relative">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => {
                      if (!e.target.files || e.target.files.length === 0) {
                        setSelectedFile(undefined);
                        setData('file', null);
                        return;
                      }
                      setData('file', e.target.files[0]);
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                  <label htmlFor="file" className="btn-2" />
                </div>
                <span className="text-red-600">{errors.file}</span>
                {progress && (
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                    >
                      {progress.percentage}%
                    </div>
                  </div>
                )}
              </div>

              {/* Поля ФИО и Основной телефон */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {msg.get('patient.last.name')} <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    name={'last_name'}
                    values={data}
                    dataValue={data.last_name}
                    value={data.last_name}
                    className={
                      'w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 transition'
                    }
                    onChange={handleChange}
                    showLabel={false}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {msg.get('patient.first.name')} <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    name={'first_name'}
                    values={data}
                    dataValue={data.first_name}
                    value={data.first_name}
                    className={
                      'w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 transition'
                    }
                    onChange={handleChange}
                    showLabel={false}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {msg.get('patient.primary.phone')}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 z-10">
                      <span className="material-symbols-outlined text-[18px]">call</span>
                    </span>
                    <InputText
                      name={'primary_phone'}
                      values={data}
                      dataValue={data.primary_phone}
                      value={data.primary_phone}
                      style={{ paddingLeft: '2.75rem' }} // Принудительный отступ слева для текста
                      className={
                        'w-full pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 transition'
                      }
                      onChange={handleChange}
                      showLabel={false}
                    />
                  </div>
                </div>
                {/* Номер карты */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {msg.get('patient.card')}
                  </label>
                  <InputText
                    name={'medical_card_no'}
                    values={data}
                    dataValue={data.medical_card_no}
                    value={data.medical_card_no}
                    className={'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm'}
                    onChange={handleChange}
                    showLabel={false}
                  />
                </div>
                {/* Скидка */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {msg.get('patient.discount')}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 z-10">
                      <span className="material-symbols-outlined text-[18px]">percent</span>
                    </span>
                    <InputText
                      name={'discount'}
                      values={data}
                      dataValue={data.discount}
                      value={data.discount}
                      style={{ paddingLeft: '2.75rem' }}
                      className={
                        'w-full pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 text-sm transition'
                      }
                      onChange={handleChange}
                      showLabel={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {progress && (
              <div className="w-full bg-slate-100 rounded-full h-2 mt-6 overflow-hidden">
                <div
                  className="bg-teal-500 h-2 transition-all duration-300 rounded-full"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            )}
          </div>

          {/* Двухколоночный блок с остальными полями */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Левая колонка */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
              {/* Дополнительный телефон */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.phone')}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 z-10">
                    <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
                  </span>
                  <InputText
                    name={'phone2'}
                    values={data}
                    dataValue={data.phone2}
                    value={data.phone2}
                    style={{ paddingLeft: '2.75rem' }}
                    className={
                      'w-full pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 text-sm transition'
                    }
                    onChange={handleChange}
                    showLabel={false}
                  />
                </div>
              </div>

              {/* Статус */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.status')}
                </label>
                <InputSelect
                  name={'status_id'}
                  values={data}
                  value={data.status_id}
                  options={statusesData}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  label={null}
                />
              </div>

              {/* Адрес */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.address')}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                  </span>
                  <InputText
                    name={'address'}
                    values={data}
                    dataValue={data.address}
                    value={data.address}
                    className={
                      'w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm'
                    }
                    onChange={handleChange}
                    showLabel={false}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.email')}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </span>
                  <InputText
                    name={'email'}
                    values={data}
                    dataValue={data.email}
                    value={data.email}
                    className={
                      'w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm'
                    }
                    onChange={handleChange}
                    showLabel={false}
                  />
                </div>
              </div>

              {/* Пол */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.gender')}
                </label>
                <div className="flex gap-4">
                  <label
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border cursor-pointer transition ${data.gender === 'female' ? 'bg-teal-50 border-teal-500 text-teal-700 font-medium' : 'border-slate-200 text-slate-600'}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="gender"
                      value={'female'}
                      checked={'female' === data['gender']}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-[18px]">female</span>
                    Жіноча
                  </label>

                  <label
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border cursor-pointer transition ${data.gender === 'male' ? 'bg-teal-50 border-teal-500 text-teal-700 font-medium' : 'border-slate-200 text-slate-600'}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="gender"
                      value={'male'}
                      checked={'male' === data['gender']}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-[18px]">male</span>
                    Чоловіча
                  </label>
                </div>
              </div>

              {/* Важная информация */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.important')}
                </label>
                <InputText
                  name={'important_info'}
                  values={data}
                  dataValue={data.important_info}
                  value={data.important_info}
                  className={'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm'}
                  onChange={handleChange}
                  showLabel={false}
                />
              </div>

              {/* Заметки */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.notice')}
                </label>
                <InputTextarea
                  name={'notice'}
                  values={data}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  label={null}
                />
              </div>
            </div>

            {/* Правая колонка */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5 h-fit">
              {/* Дата рождения */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.birthday')}
                </label>
                <InputMask
                  component="input"
                  mask="__-__-____"
                  defaultValue={data.birthday ? moment(data.birthday).format('DD-MM-YYYY') : ''}
                  replacement={{ _: /\d/ }}
                  name="birthday"
                  id="birthday"
                  onChange={handleChange}
                  placeholder={'дд-мм-рррр'}
                  className={'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm'}
                />
              </div>

              {/* Куратор */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.curator')} <span className="text-red-500">*</span>
                </label>
                <InputSelect
                  name={'curator_id'}
                  values={data}
                  value={data.curator_id}
                  options={customerData}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  label={null}
                />
              </div>

              {/* Дата регистрации */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.register.date')} <span className="text-red-500">*</span>
                </label>
                <InputMask
                  component="input"
                  defaultValue={
                    data.register_date ? moment(data.register_date).format('DD-MM-YYYY') : ''
                  }
                  onChange={handleChange}
                  mask="__-__-____"
                  name="register_date"
                  id="register_date"
                  replacement={{ _: /\d/ }}
                  placeholder={'дд-мм-рррр'}
                  className={'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm'}
                />
                {errors?.register_date && (
                  <div className="text-red-500 text-xs mt-1">{errors.register_date}</div>
                )}
              </div>

              {/* Контакт / Источник */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.contact')} <span className="text-red-500">*</span>
                </label>
                <InputSelect
                  name={'contact'}
                  values={data}
                  value={data.contact}
                  options={contactData}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  label={null}
                />
              </div>

              {/* Оплата / Условия */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {msg.get('patient.payment')}
                </label>
                <InputTextarea
                  name={'payment'}
                  values={data}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  label={null}
                />
              </div>
            </div>
          </div>
          {/* Master Action Footer Bar */}
          <StickyFormFooter
            backUrl="/patients"
            backLabel={msg.get('patient.back') || 'Повернутись'}
            saveLabel={msg.get('patient.save') || 'Зберегти'}
            processingLabel="Збереження..."
            successMessage={msg.get('patient.saved') || 'Збережено успішно!'}
            processing={processing}
            recentlySuccessful={recentlySuccessful}
          />
        </form>
      </div>
    </section>
  );
}
