import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../../Lang/Customer/translation';
import InputText from '../../../Components/Form/InputText';
import React, { useState, useEffect } from 'react';
import { findUserByEmailAction, emptyUserAutocompleteAction } from '@/Redux/Clinic';
import { userSearchResultsSelector } from '@/Redux/Clinic/selectors';
import { paletterDataSelector } from '@/Redux/Staff/selectors';
import { ArrowLeft } from 'lucide-react';

interface Props {
  formData: any;
  clinicData: any;
  roleData?: any;
  photoPath?: any;
  className?: string;
}

export default function CustomerForm({ formData, clinicData, photoPath = null }: Props) {
  const dispatch = useAppDispatch();
  const appLang = useAppSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  const { errors } = usePage().props;
  const [values, setValues] = useState({
    id: formData.id,
    name: formData.name,
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    inn: formData.inn,
    phone: formData.phone,
    clinic_id: clinicData.id,
    photo: null,
    file: null as File | null,
  });
  const [hideFields, setHideFields] = useState(false);
  useAppSelector(paletterDataSelector);
  const serchResults = useAppSelector(userSearchResultsSelector);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState(photoPath ? photoPath : '/images/nf.png');
  const { processing, recentlySuccessful, progress } = useForm({
    id: formData.id,
    file: null,
    name: formData.name,
    first_name: formData.first_name,
    last_name: formData.last_name,
    phone: formData.phone,
    email: formData.email,
    inn: formData.inn,
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(photoPath ? photoPath : '/images/no-image.png');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    console.log(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, photoPath]);

  const renderSearchResult = () => {
    if (serchResults.length > 0) {
      return (
        <div className="absolute autocomplete">
          <ul>
            {serchResults.map((_res) => (
              // eslint-disable-next-line react/jsx-key
              <li
                className="cursor-pointer"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyUserAutocompleteAction());
                  setValues((values) => ({
                    ...values,
                    ['email']: _res.email,
                  }));
                }}
              >
                {_res.name} [{_res.email}]
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeEmail = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    if (value.length > 3) {
      dispatch(findUserByEmailAction(e.target.value));
    } else {
      dispatch(emptyUserAutocompleteAction());
      setHideFields(false);
    }
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // const handleChangeFile = e => {
  //   const key = e.target.id;
  //   console.log('KEY',key)
  //   setValues(values => ({
  //     ...values,
  //     [key]: e.target.files[0],
  //   }));
  // };

  const submit = (e) => {
    e.preventDefault();

    if (formData.id) {
      router.post(route('customer.update'), values, { preserveScroll: true });
    } else {
      router.post(route('customer.update'), values);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <Link
              href="/customers"
              className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-teal-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mt-space-xs">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {formData?.id
                      ? msg.get('customer.title.edit')
                      : msg.get('customer.title.create')}
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {msg.get('customer.title.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={processing} className="btn-submit">
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              {msg.get('customer.save') || 'Зберегти зміни'}
            </div>
          </button>
        </div>
      </div>
      <div className="flex-1 max-w-[1780px] w-full mx-auto sm:px-6 lg:px-0 py-6 sm:py-8">
        <form onSubmit={submit} className="mt-0 w-full bg-white p-4" encType="multipart/form-data">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
              {/* Блок завантаження фото */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    {msg.get('customer.photo_markup')}
                  </h2>
                  <span className="text-xs text-brand-600 font-semibold">
                    {msg.get('customer.optional')}
                  </span>
                </div>
                <div className="photo-block">
                  <div className="flex flex-row relative input-bordered">
                    <div className="product-preview material-preview inline-block">
                      {!selectedFile && !photoPath && (
                        <div className="upload-zone">
                          <p className="mt-3 text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                            {msg.get('customer.dragdrop_files')}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {msg.get('customer.or_select_file_type')}
                          </p>
                          <span className="inline-block mt-3 px-2 py-0.5 text-[11px] font-medium bg-slate-200/60 text-slate-600 rounded">
                            {msg.get('customer.file_sizes')}
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
                <span className="text-red-600 text-xs mt-1 block">{errors.file}</span>

                {progress && (
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-3">
                    <div
                      className="bg-brand-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                    >
                      {progress.percentage}%
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* ПРАВА КОЛОНКА: Основні реквізити, одиниці, ціноутворення */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="relative">
                  <InputText
                    name={'email'}
                    values={values}
                    value={values.email}
                    onChange={handleChangeEmail}
                    required
                    label={msg.get('customer.email')}
                  />
                  <>{renderSearchResult()}</>
                </div>
                <div className={`${hideFields ? 'hidden' : ''}`}>
                  <InputText
                    name={'last_name'}
                    values={values}
                    value={values.last_name}
                    onChange={handleChange}
                    required
                    label={msg.get('customer.last_name')}
                  />
                  <InputText
                    name={'first_name'}
                    values={values}
                    value={values.first_name}
                    onChange={handleChange}
                    required
                    label={msg.get('customer.first_name')}
                  />
                  <InputText
                    name={'inn'}
                    values={values}
                    value={values.inn}
                    onChange={handleChange}
                    required
                    label={msg.get('customer.inn')}
                  />
                  <InputText
                    name={'phone'}
                    values={values}
                    value={values.phone}
                    onChange={handleChange}
                    required
                    label={msg.get('customer.phone')}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link className="btn-back" title={msg.get('customer.back')} href={`/customer`}>
              {msg.get('customer.back')}
            </Link>
            <div className="flex items-center gap-3">
              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-teal-600 font-semibold">
                  {msg.get('customer.saved') || 'Збережено!'}
                </p>
              </Transition>

              <button type="submit" disabled={processing} className="btn-submit">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  {msg.get('customer.save') || 'Зберегти зміни'}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
