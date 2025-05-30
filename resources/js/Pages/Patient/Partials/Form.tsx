import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPercent,
  faPhone,
  faEnvelope,
  faFemale,
  faLocationDot,
  faMale,
} from '@fortawesome/free-solid-svg-icons';
import InputTextarea from '../../../Components/Form/InputTextarea';
import { InputMask } from '@react-input/mask';
import moment from 'moment';
import axios from 'axios';

export default function Form({
  formData,
  customerData,
  contactData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  const [_, setUploadedFile] = useState();

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setUploadedFile(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  // const { files } = usePage().props

  const { data, setData, processing, post, recentlySuccessful, progress } =
    useForm({
      id: formData.id,
      file: null,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      phone2: formData.phone2,
      discount: formData.discount,
      address: formData.address,
      email: formData.email,
      birthday: formData.birthday,
      gender: formData.gender,
      important_info: formData.important_info,
      card_number: formData.card_number,
      curator_id: formData.curator_id,
      register_date: formData.register_date
        ? formData.register_date
        : new Date(),
      contact: formData.contact,
      payment: formData.payment,
      status: formData.status_id,
      notice: formData.notice,
    });
  const { errors } = usePage().props;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('/images/no-photo.jpg');

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setData(values => ({
      ...values,
      [key]: value,
    }));
  };

  const submit = e => {
    e.preventDefault();
    post(route('patient.update'));
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

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/patients'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('patient.title.edit')
            : msg.get('patient.title.create')}
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
                {!selectedFile && (
                  <img src="/images/no-photo.png" width={197} height={244} />
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
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="inline-label">
                  {msg.get('patient.last.name')}
                  <span className="asterisk">*</span>
                </label>
              </div>
              <div className="md:w-2/3">
                <InputText
                  name={'last_name'}
                  values={data}
                  dataValue={data.last_name}
                  value={data.last_name}
                  className={'input-text-noborder f-24'}
                  onChange={handleChange}
                  showLabel={false}
                  required
                  label={msg.get('patient.first.name')}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="inline-label">
                  {msg.get('patient.first.name')}
                  <span className="asterisk">*</span>
                </label>
              </div>
              <div className="md:w-2/3">
                <InputText
                  name={'first_name'}
                  values={data}
                  dataValue={data.first_name}
                  value={data.first_name}
                  className={'input-text-noborder f-24'}
                  onChange={handleChange}
                  showLabel={false}
                  required
                  label={msg.get('patient.first.name')}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="inline-label">
                  {msg.get('patient.phone')}
                </label>
              </div>
              <div className="md:w-2/3">
                <InputText
                  name={'phone'}
                  values={data}
                  dataValue={data.phone}
                  value={data.phone}
                  className={'input-text-noborder f-24'}
                  onChange={handleChange}
                  showLabel={false}
                  label={msg.get('patient.phone')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div className="row-span">
            {/* Phone */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.phone')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <small className="form-awasom-icons">
                  <FontAwesomeIcon icon={faPhone} className="mr-5" />
                </small>
                <InputText
                  name={'phone2'}
                  values={data}
                  dataValue={data.phone2}
                  value={data.phone2}
                  className={'input-text-noborder icon-input'}
                  onChange={handleChange}
                  showLabel={false}
                  label={null}
                />
              </div>
            </div>
            {/* Discount */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.discount')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <small className="form-awasom-icons">
                  <FontAwesomeIcon icon={faPercent} className="mr-5" />
                </small>
                <InputText
                  name={'discount'}
                  values={data}
                  dataValue={data.discount}
                  value={data.discount}
                  className={'input-text-noborder icon-input'}
                  onChange={handleChange}
                  showLabel={false}
                  label={null}
                />
              </div>
            </div>
            {/* Address */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.address')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <small className="form-awasom-icons">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-5" />
                </small>
                <InputText
                  name={'address'}
                  values={data}
                  dataValue={data.address}
                  value={data.address}
                  className={'input-text-noborder icon-input'}
                  onChange={handleChange}
                  showLabel={false}
                  label={null}
                />
              </div>
            </div>
            {/* Email */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.email')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <small className="form-awasom-icons">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-5" />
                </small>
                <InputText
                  name={'email'}
                  values={data}
                  dataValue={data.email}
                  value={data.email}
                  className={'input-text-noborder icon-input'}
                  onChange={handleChange}
                  showLabel={false}
                  label={null}
                />
              </div>
            </div>
            {/* Gender */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.gender')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <div className="inline-block">
                  <input
                    type="radio"
                    name="gender"
                    id="gender"
                    value={'female'}
                    checked={'female' === data['gender']}
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={faFemale}
                    className="radio-gender-icon"
                  />
                </div>
                <div className="ml-4 inline-block">
                  <input
                    type="radio"
                    name="gender"
                    id="gender"
                    value={'male'}
                    checked={'male' === data['gender']}
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={faMale}
                    className="radio-gender-icon"
                  />
                </div>
                <div className="ml-4 inline-block">
                  <input
                    type="radio"
                    name="gender"
                    id="gender"
                    value={'none'}
                    checked={'none' === data['gender']}
                    onChange={handleChange}
                  />
                  <span className="ml-2">{msg.get('patient.undefind')}</span>
                </div>
              </div>
            </div>
            {/* Important info */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.important')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputText
                  name={'important_info'}
                  values={data}
                  dataValue={data.important_info}
                  value={data.important_info}
                  className={'input-text-noborder'}
                  onChange={handleChange}
                  showLabel={false}
                  label={null}
                />
              </div>
            </div>
            {/* Notice */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.notice')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputTextarea
                  name={'notice'}
                  values={data}
                  onChange={handleChange}
                  label={null}
                />
              </div>
            </div>
            {/* Card number */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.card')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputText
                  name={'card_number'}
                  values={data}
                  dataValue={data.card_number}
                  value={data.card_number}
                  className={'input-text-noborder'}
                  onChange={handleChange}
                  showLabel={false}
                  label={null}
                />
              </div>
            </div>
          </div>
          <div className="row-span">
            {/* Birthday */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.birthday')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputMask
                  mask="__-__-____"
                  defaultValue={
                    data.birthday
                      ? moment(data.birthday).format('DD-MM-YYYY')
                      : ''
                  }
                  replacement={{ _: /\d/ }}
                  name="birthday"
                  id="birthday"
                  onChange={handleChange}
                  placeholder={'dd-mm-yyyy'}
                  className={'input-text-noborder'}
                />
              </div>
            </div>
            {/* Curator */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.curator')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputSelect
                  name={'curator_id'}
                  values={data}
                  value={data.curator_id}
                  options={customerData}
                  onChange={handleChange}
                  required
                  label={null}
                />
              </div>
            </div>
            {/* Register date */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.register.date')}
                  <span className="asterisk">*</span>
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputMask
                  defaultValue={
                    data.register_date
                      ? moment(data.register_date).format('DD-MM-YYYY')
                      : ''
                  }
                  onChange={handleChange}
                  mask="__-__-____"
                  name="register_date"
                  id="register_date"
                  replacement={{ _: /\d/ }}
                  placeholder={'dd-mm-yyyy'}
                  className={'input-text-noborder'}
                />
                {errors?.register_date && (
                  <div className="form-error">{errors.register_date}</div>
                )}
              </div>
            </div>
            {/* Contact */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.contact')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputSelect
                  name={'contact'}
                  values={data}
                  value={data.contact}
                  options={contactData}
                  onChange={handleChange}
                  required
                  label={null}
                />
              </div>
            </div>
            {/* Notice */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label className="inline-label">
                  {msg.get('patient.payment')}
                </label>
              </div>
              <div className="md:w-4/5 relative">
                <InputTextarea
                  name={'payment'}
                  values={data}
                  onChange={handleChange}
                  label={null}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-[20px]">
          <Link
            className="btn-back"
            title={msg.get('patient.back')}
            href={`/patients`}
          >
            {msg.get('patient.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('patient.save')}
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
