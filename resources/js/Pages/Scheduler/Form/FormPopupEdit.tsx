import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import InputText from '../../../Components/Form/InputText';
import InputTextarea from '../../../Components/Form/InputTextarea';
import InputSelect from '../../../Components/Form/InputSelect';
import lngScheduler from '../../../Lang/Scheduler/translation';
import SecondaryButton from '../../../Components/Form/SecondaryButton';
import {
  minusServiceAction,
  plusServiceAction,
  setExistServicesAction,
  setServicesAction,
  showPricePopupAction,
  showScheduleEditPopupAction,
  showSchedulePopupAction,
} from '../../../Redux/Scheduler';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'rc-time-picker/assets/index.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import {
  editEventSelector,
  newPatientDataSelector, patientIdSelector,
  popupDateSelector,
  popupDoctorSelector,
  popupStatusSelector,
  popupTimeSelector,
  servicesSelector, showEditPopupSelector,
  showSchedulePopupSelector,
} from '../../../Redux/Scheduler/selectors';
import EventStatus from '../../../Components/Scheduler/EventStatus';
import EventPatient from '../../../Components/Scheduler/EventPatient';
import { setPopupAction, showOverlayAction } from '../../../Redux/Layout';
import TextField from '@mui/material/TextField';
import {
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputLabel from '../../../Components/Form/InputLabel';

export default function SchedulerFormEdit({
  formData,
  clinicData,
  cabinetData,
  customerData,
  currency
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const editEventData = useSelector(editEventSelector);
  const [values, setValues] = useState({
    title: editEventData.title,
    clinic_id: clinicData.id,
    cabinet_id: editEventData.cabinet_id,
    doctor_id: editEventData.doctor_id,
    comment: editEventData.comment,
    status_id: editEventData.status_id,
    event_date: editEventData.event_date,
    event_time_from: editEventData.event_time_from,
    event_time_to: editEventData.event_time_to,
  });


console.log(JSON.parse(editEventData.services));
  const { processing, recentlySuccessful, errors } = useForm();
  const doctorId = useSelector(popupDoctorSelector);
  const timeStart = useSelector(popupTimeSelector);
  const patientId = editEventData.patient_id;
  const eventStatus = editEventData.status_id;
  const dispatch = useDispatch();
  const newPatientData = useSelector(newPatientDataSelector);
  const eventDate = useSelector(popupDateSelector);
  const showPopup = useSelector(showEditPopupSelector);
  const popupServices = useSelector(servicesSelector);

  // if (editEventData.services) {
  //   console.log(1);
  //   dispatch(setExistServicesAction(JSON.parse(editEventData.services)));
  // }

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
      ['event_time_from']: value.format('HH:mm'),
    }));
  };

  const handleChangeTimeTo = value => {
    setValues(values => ({
      ...values,
      ['event_time_to']: value.format('HH:mm'),
    }));
  };

  useEffect(() => {
    setValues(values => ({
      ...values,
      ['event_time_from']: timeStart,
      ['event_time_to']: timeStart,
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
    dispatch(setPopupAction(false));
  };

  const submit = e => {
    e.preventDefault();
    values['newPatientData'] = newPatientData;
    values['event_date'] = eventDate;
    // values['event_time_from'] = moment(timeStart).format('HH:mm');
    values['services'] = popupServices;
    if (patientId) {
      values['patientId'] = patientId;
    }
    if (formData.id) {
      router.post(`/scheduler/update?id=${formData.id}`, values);
    } else {
      router.post('/scheduler/update', values);
    }
    dispatch(showOverlayAction(false));
  };

  const parsedTime = useMemo(() => {
    return timeStart ? dayjs(`2000-01-01T${timeStart}`) : null;
  }, [timeStart]);
  const parsedTimePlus30 = parsedTime ? parsedTime.add(30, 'minute') : null;


  const renderService = (item, num) => {
    return (
      <div className="flex items-center justify-between px-2 py-1 bg-gray-100 mb-1 text-[12px] w-[405px]">
        <div className="flex-1 text-left font-medium text-gray-800">
          { item.name }
        </div>

        <div className="w-[80px] text-center text-gray-600">
          <button className="text-blue-500 hover:text-blue-700 mr-1" onClick={() => dispatch(minusServiceAction(item))}>
            <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" />
            </svg>
          </button>
          <span className="mr-2 font-bold bg-white px-2 text-[10px]">{ item.qty ?  item.qty : 1}</span>
          <button className="text-blue-500 hover:text-blue-700" onClick={() => dispatch(plusServiceAction(item))}>
            <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="text-gray-600 text-right pr-[2] w-[50px] whitespace-nowrap font-bold">
          {item.price} {currency}
        </div>

        <div className="w-[25px] text-right">
          <FontAwesomeIcon icon={faTrash} color={'#e13333'} className="mr-1" onClick={() => {
              dispatch(setServicesAction(item));
          }} />
        </div>
      </div>
    )
  }
console.log(`${editEventData.pl_name} ${editEventData.p_name}`)
  return (
    <section className={`px-5 max-h-[75vh] form-scheduler form-edit-schedulter bg-white overflow-y-auto ${showPopup ? '' : 'hidden'}`}>
      <header>
        <h2 className={'pt-7 pb-7'}>
          {msg.get('scheduler.title.edit.visit')}
        </h2>
      </header>

      <form
        onSubmit={event => submit(event)}
        className="mt-0 space-y-3 min-w-[350px]"
        encType="multipart/form-data"
      >
        <EventStatus />

        <div className={`relative`}>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 ">
            {msg.get('scheduler.patient')}
            <span className="text-discount float-right">
              &nbsp;{editEventData.status_name && `${editEventData.status_name} (-${editEventData.discount}%)`}
            </span>
          </label>
          <div className={'sh-p-view'}>{editEventData.pl_name} {editEventData.p_name}</div>

        </div>

        <InputText
          name={'title'}
          values={values}
          dataValue={values.title}
          value={values.title}
          onChange={handleChange}
          required
          label={msg.get('scheduler.form.title')}
        />
        <div className={'flex w-full'}>
          <div className={'w-1/2'}>
            <InputSelect
              name={'cabinet_id'}
              className={'w-1/2'}
              values={values}
              value={values.cabinet_id}
              options={cabinetData}
              onChange={handleChangeSelect}
              required
              label={msg.get('scheduler.form.cabinet')}
            />
          </div>
          <div className={'w-1/2 ml-3'}>
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
          </div>
        </div>
        <div className={'clearfix'} />
        {timeStart && (
          <div className="flex flex-row pt-4">
            <div className={'w-1/2'}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
                  label={msg.get('scheduler.from')}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                    },
                  }}
                  defaultValue={parsedTime}
                  name={'event_time_from'}
                  onChange={(newValue) => handleChangeTimeFrom(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={'w-1/2 ml-5'}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
                  label={msg.get('scheduler.from')}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                    },
                  }}
                  defaultValue={parsedTimePlus30}
                  name={'event_time_to'}
                  onChange={(newValue) => handleChangeTimeTo(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        )}
        <InputTextarea
          name={'comment'}
          values={values}
          value={values.comment}
          onChange={handleChange}
          required
          label={msg.get('scheduler.form.comment')}
        />
        <div className={'manipulation flex'}>
          <span className={'text-[14px]'}>{msg.get('scheduler.manipulation')}</span>
          <div className={'add-services ml-3 btn-link font-bold'} onClick={() => {
            dispatch(showPricePopupAction(true))
          }}> 📌 {msg.get('scheduler.btn.add')}
          </div>
          <div className="mt-0 ml-4 text-sm">
            {popupServices?.map((item, index) => <>{renderService(item, index)}</>)}
          </div>
          <div className={'clearfix'} />
        </div>
        <div className="flex items-center pb-7">
          <SecondaryButton
            className="btn-back"
            onClick={() => {
              const element = document.getElementsByTagName('body')[0];
              element.style.overflow = 'inherit';
              dispatch(showScheduleEditPopupAction(false));
              dispatch(showOverlayAction(false));
              dispatch(setPopupAction(false));
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
