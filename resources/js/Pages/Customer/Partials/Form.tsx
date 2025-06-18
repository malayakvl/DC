import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../../Lang/Customer/translation';
import InputText from '../../../Components/Form/InputText';
import { InputColor } from '../../../Components/Form/InputColor';
import React, { useState, useEffect } from 'react';
import InputLabel from '../../../Components/Form/InputLabel';
import InputError from '../../../Components/Form/InputError';
import {
  findUserByEmailAction,
  emptyUserAutocompleteAction,
} from '../../../Redux/Clinic';
import { userSearchResultsSelector } from '../../../Redux/Clinic/selectors';
import { SketchPicker } from 'react-color';
import { paletterDataSelector } from '../../../Redux/Staff/selectors';

export default function CustomerForm({
  formData,
  clinicData,
  imagePath,
  className = '',
}) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  const { errors } = usePage().props;
  const [values, setValues] = useState({
    name: formData.name,
    email: formData.email,
    inn: formData.inn,
    phone: formData.phone,
    clinic_id: clinicData.id,
    photo: null,
    color: formData.color,
  });
  const [hideFields, setHideFields] = useState(false);
  const [_, setCustomerColor] = useState('#000000');
  const colorSettings = useSelector(paletterDataSelector);
  const serchResults = useSelector(userSearchResultsSelector);
  // const { processing, recentlySuccessful, progress } = useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(formData.file ? `/images/users/${formData.file}` : '/images/no-photo.png');
  const { data, setData, processing, post, recentlySuccessful, progress } =
    useForm({
      id: formData.id,
      file: null,
      name: formData.name,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      email: formData.email,
      color: formData.color,
      inn: formData.inn
    });

  const handleChangeComplete = color => {
    setCustomerColor(color.hex);
  };

  const renderSearchResult = () => {
    if (serchResults.length > 0) {
      return (
        <div className="absolute autocomplete">
          <ul>
            {serchResults.map(_res => (
              <li
                className="cursor-pointer"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyUserAutocompleteAction());
                  setValues(values => ({
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

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeEmail = e => {
    const key = e.target.id;
    const value = e.target.value;
    if (value.length > 3) {
      dispatch(findUserByEmailAction(e.target.value));
    } else {
      dispatch(emptyUserAutocompleteAction());
      setHideFields(false);
    }
    setValues(values => ({
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

  const submit = e => {
    e.preventDefault();
    values['color'] = colorSettings.color;

    if (formData.id) {
      post(route('customer.update'));
      // router.post(`/customer/update?id=${formData.id}`, values);
    } else {
      router.post('/customer/update', values);
    }
  };

console.log(formData.photo)
  return (
    <section>
      <header>
        <h2>
          <Link className="icon-back" href={'/customers'}>
            &nbsp;
          </Link>
          {formData.id
            ? msg.get('customer.title.edit')
            : msg.get('customer.title.create')}
        </h2>
      </header>

      <form
        onSubmit={submit}
        className="mt-0 w-full"
        encType="multipart/form-data"
      >
        <div className="flex mt-[50px] px-[100px] mb-[50px]">
          <div className="w-1/3">
            <div className="flex flex-row relative">
              <div className="file-preview inline-block">
                {(!selectedFile && !formData.photo) && (
                  <img src="/images/no-photo.png" width={197} height={250} />
                )}
                {(!selectedFile && formData.photo) &&  (
                  <div className={'patient-avatar'} style={{
                    background: `url(/uploads/patients/${formData.photo})`,
                  }}></div>
                )}
                {selectedFile && (
                  <div
                    className="preview-photo"
                    style={{ backgroundImage: `url(${preview})` }}
                  ></div>
                )}
                <div className="btn-upload-photo-patient"></div>
              </div>
              <div className="upload-patient-btn-block ml-[5px] relative">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={e => {
                    setData('file', e.target.files[0]);
                    if (!e.target.files || e.target.files.length === 0) {
                      setSelectedFile(undefined);
                      return;
                    }

                    // I've kept this example simple by using the first image instead of multiple
                    setSelectedFile(e.target.files[0]);
                  }}
                />
                <label htmlFor="file" className="btn-2" />
              </div>
            </div>
            <span className="text-red-600">{errors.file}</span>
            {progress && (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  width={progress.percentage}
                >
                  {progress.percentage}%
                </div>
              </div>
            )}
          </div>
          <div className="w-2/3">
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
            <div className="relative">
              <InputColor
                defaultColor={formData.color || '#000000'}
                name={'color'}
                label={msg.get('customer.color')}
              />
            </div>
            <div className={`${hideFields ? 'hidden' : ''}`}>
              <InputText
                name={'name'}
                values={values}
                value={values.name}
                onChange={handleChange}
                required
                label={msg.get('customer.name')}
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

              {/*<InputLabel htmlFor="name" value={msg.get('customer.photo')} />*/}
              {/*<div className="mb-0">*/}
              {/*  <label className="">File</label>*/}
              {/*  <input*/}
              {/*    type="file"*/}
              {/*    className="w-full px-4 py-2"*/}
              {/*    label="File"*/}
              {/*    name="file"*/}
              {/*    onChange={(e) =>*/}
              {/*      setData("file", e.target.files[0])*/}
              {/*    }*/}
              {/*  />*/}
              {/*  <span className="text-red-600">*/}
              {/*    {errors.file}*/}
              {/*  </span>*/}

              {/*</div>*/}
              {/*<div className="input-container">*/}
              {/*  <input*/}
              {/*    type="file"*/}
              {/*    id="file"*/}
              {/*    className="w-full px-0 py-0 mt-4"*/}
              {/*    style={{width: '100px', height: '40px', color: '#fff'}}*/}
              {/*    name="file"*/}
              {/*    onChange={handleChangeFile}*/}
              {/*  />*/}
              {/*  <InputError className="mt-2" message={errors.file} />*/}
              {/*</div>*/}
              <div>
                <img src={imagePath} width={100} />
              </div>
            </div>
          </div>
        </div>

        <div className={`flex items-center ${hideFields ? 'hidden' : ''}`}>
          <Link
            className="btn-back"
            title={msg.get('customer.back')}
            href={`/customers`}
          >
            {msg.get('customer.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('customer.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('customer.saved')}</p>
          </Transition>
        </div>
        <div className={`flex items-center ${hideFields ? '' : 'hidden'}`}>
          <Link
            className="btn-invite"
            title={msg.get('customer.invite')}
            href={`/customer/invite`}
          >
            {msg.get('customer.invite')}
          </Link>
        </div>
      </form>
    </section>
  );
}
