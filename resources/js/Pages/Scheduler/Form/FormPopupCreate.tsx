import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import InputText from '../../../Components/Form/InputText';
import InputTextarea from '../../../Components/Form/InputTextarea';
import InputSelect from '../../../Components/Form/InputSelect';
import lngScheduler from '../../../Lang/Scheduler/translation';
import SecondaryButton from '../../../Components/Form/SecondaryButton';
import { showSchedulePopupAction } from '../../../Redux/Scheduler';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import {
  newPatientDataSelector,
  popupDateSelector,
  popupDoctorSelector,
  popupStatusSelector,
  popupTimeSelector,
} from '../../../Redux/Scheduler/selectors';
import EventStatus from '../../../Components/Scheduler/EventStatus';
import EventPatient from '../../../Components/Scheduler/EventPatient';

export default function SchedulerFormCreate({
  formData,
  clinicData,
  cabinetData,
  customerData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const [values, setValues] = useState({
    title: formData.title,
    clinic_id: clinicData.id,
    cabinet_id: formData.cabinet_id,
    doctor_id: formData.doctor_id,
    comment: formData.comment,
    status_id: formData.status_id,
    event_date: formData.event_date,
    event_time_from: formData.event_time_from,
    event_time_to: formData.event_time_to,
  });
  const { processing, recentlySuccessful, errors } = useForm();
  const doctorId = useSelector(popupDoctorSelector);
  const timeStart = useSelector(popupTimeSelector);
  const eventStatus = useSelector(popupStatusSelector);
  const dispatch = useDispatch();
  const newPatientData = useSelector(newPatientDataSelector);
  const eventDate = useSelector(popupDateSelector);

  const handleChangeSelect = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeTimeFrom = value => {
    setValues(values => ({
      ...values,
      ['event_time_from']: moment(value).format('HH:mm'),
    }));
  };

  const handleChangeTimeTo = value => {
    setValues(values => ({
      ...values,
      ['event_time_to']: moment(value).format('HH:mm'),
    }));
  };

  useEffect(() => {
    setValues(values => ({
      ...values,
      ['event_time_from']: moment(timeStart).format('HH:mm'),
      ['event_time_to']: moment(timeStart).add(30, 'minutes').format('HH:mm'),
      ['status_id']: eventStatus,
    }));
  }, [timeStart]);

  useEffect(() => {
    setValues(values => ({
      ...values,
      ['event_date']: eventDate,
      ['doctor_id']: doctorId,
      ['status_id']: eventStatus,
    }));
  }, [eventDate, doctorId, eventStatus]);
  const closeModal = () => {
    dispatch(showSchedulePopupAction(false));
    const element = document.getElementsByTagName('body')[0];
    element.style.overflow = 'inherit';
  };

  const submit = e => {
    e.preventDefault();
    values['newPatientData'] = newPatientData;
    values['event_date'] = eventDate;
    values['event_time_from'] = moment(timeStart).format('HH:mm');

    if (formData.id) {
      router.post(`/scheduler/update?id=${formData.id}`, values);
    } else {
      router.post('/scheduler/update', values);
    }
  };

  return (
    <section className="p-5  max-h-[80vh] overflow-y-auto">
      <header>
        <h2>
          {formData?.id
            ? msg.get('mCategories.pricing.edit')
            : msg.get('scheduler.title.create.visit')}
        </h2>
      </header>

      <form
        onSubmit={event => submit(event)}
        className="mt-0 space-y-4 min-w-[350px]"
        encType="multipart/form-data"
      >
        <EventStatus />

        <EventPatient values={values} />

        <InputText
          name={'title'}
          values={values}
          dataValue={values.title}
          value={values.title}
          onChange={handleChange}
          required
          label={msg.get('scheduler.form.title')}
        />
        <InputSelect
          name={'cabinet_id'}
          values={values}
          value={values.cabinet_id}
          options={cabinetData}
          onChange={handleChangeSelect}
          required
          label={msg.get('scheduler.form.cabinet')}
        />
        <InputSelect
          name={'doctor_id'}
          values={values}
          value={values.doctor_id}
          options={customerData}
          defaultValue={doctorId}
          onChange={handleChangeSelect}
          required
          label={msg.get('scheduler.form.doctor')}
        />
        <div className="flex">
          <div>
            <TimePicker
              name={'time_from'}
              className={'input-time'}
              defaultValue={moment(timeStart)}
              onChange={handleChangeTimeFrom}
              showSecond={false}
              minuteStep={5}
            />
          </div>
          <div className="ml-4">
            <TimePicker
              name={'time_to'}
              className={'input-time'}
              defaultValue={moment(timeStart).add(30, 'minutes')}
              onChange={handleChangeTimeTo}
              showSecond={false}
              minuteStep={10}
            />
          </div>
        </div>
        <InputTextarea
          name={'comment'}
          values={values}
          value={values.comment}
          onChange={handleChange}
          required
          label={msg.get('scheduler.form.comment')}
        />
        <div className="flex items-center">
          <SecondaryButton
            className="btn-back"
            onClick={() => {
              const element = document.getElementsByTagName('body')[0];
              element.style.overflow = 'inherit';
              dispatch(showSchedulePopupAction(false));
            }}
            title={msg.get('scheduler.close')}
          >
            {msg.get('scheduler.close')}
          </SecondaryButton>
          <PrimaryButton disabled={processing}>
            {msg.get('scheduler.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">
              {msg.get('mCategories.saved')}
            </p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
