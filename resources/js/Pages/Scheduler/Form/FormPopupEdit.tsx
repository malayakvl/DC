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
import InputMask from 'react-input-mask';
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
  assistantData,
  currency
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const editEventData = useSelector(editEventSelector);
  const [year, month, day] = editEventData.event_date.split('-'); // Split the input string
  const formattedDate = `${day}.${month}.${year}`;
  const [values, setValues] = useState({
    title: editEventData.title,
    clinic_id: clinicData.id,
    cabinet_id: editEventData.cabinet_id,
    doctor_id: editEventData.doctor_id,
    assistent_id: editEventData.doctor_id,
    comment: editEventData.comment,
    status_id: editEventData.status_id,
    event_date: formattedDate,
    event_time_from: editEventData.event_time_from,
    event_time_to: editEventData.event_time_to,
  });

  const { processing, recentlySuccessful } = useForm();
  const doctorId = useSelector(popupDoctorSelector);
  const timeStart = useSelector(popupTimeSelector);
  const timeEnd = useSelector(popupTimeSelector);
  const patientId = editEventData.patient_id;
  const eventStatus = useSelector(popupStatusSelector);
  const dispatch = useDispatch();
  const newPatientData = useSelector(newPatientDataSelector);
  const eventDate = useSelector(popupDateSelector);
  const showPopup = useSelector(showEditPopupSelector);
  const popupServices = useSelector(servicesSelector);

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

  const closeModal = () => {
    dispatch(showSchedulePopupAction(false));
    const element = document.getElementsByTagName('body')[0];
    element.style.overflow = 'inherit';
    dispatch(setPopupAction(false));
  };

  const submit = e => {
    e.preventDefault();
    values['newPatientData'] = newPatientData;
    values['status'] = eventStatus;
    values['services'] = popupServices;
    if (patientId) {
      values['patientId'] = patientId;
    }
    const [day, month, year] = values['event_date'].split('.'); // Split the input string
    values['fotmatted_date'] = `${year}-${month}-${day}`;
    router.post(`/scheduler/update?id=${editEventData.event_id}`, values);
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
          <span onClick={() => {
            dispatch(minusServiceAction(item))
          }}>
            <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" />
            </svg>
          </span>
          <span className="mr-2 font-bold bg-white px-2 text-[10px]">{ item.qty ?  item.qty : 1}</span>
          <span onClick={() => dispatch(plusServiceAction(item))}>
            <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
          </span>
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
        <EventStatus defaultStatus={editEventData.event_status} defaultColor={editEventData.status_color} />

        <div className={`relative`}>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 ">
            {msg.get('scheduler.patient')}
            <span className="text-discount float-right">
              &nbsp;{editEventData.status_name && `${editEventData.patient_status_name} (-${editEventData.discount}%)`}
            </span>
          </label>
          <div className={'sh-p-view'}>{editEventData.pl_name} {editEventData.p_name}</div>

        </div>
        <div className={'flex w-full'}>
          <div className={'w-1/2'}>
            <InputText
              name={'title'}
              values={values}
              dataValue={values.title}
              value={values.title}
              onChange={handleChange}
              required
              label={msg.get('scheduler.form.title')}
            />
          </div>
          <div className={'w-1/2 ml-3'}>
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
        </div>

        <div className={'flex w-full'}>
          <div className={'w-1/2'}>
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
          <div className={'w-1/2 ml-3'}>
            <InputSelect
              name={'assistent_id'}
              values={values}
              value={values.assistent_id}
              options={assistantData}
              defaultValue={doctorId}
              onChange={handleChangeSelect}
              required
              label={msg.get('scheduler.form.assistent')}
            />
          </div>
        </div>
        <div className={'clearfix'} />
        {formattedDate && (
          <div className="flex">
            <div className={'w-1/3 relative'}>
              <span className={'block text-[14px]'}>{msg.get('scheduler.sch.date')}</span>
              <InputMask
                mask="99.99.9999"
                name={'event_date'}
                defaultValue={values.event_date}
                className={'shc-form-date'}
                onChange={(e) => {
                  setValues(values => ({
                    ...values,
                    ['event_date']: e.target.value,
                  }));
                }}
              />
              <i className={'f-calendar'} />
            </div>
            <div className={'w-1/3 relative'}>
              <span className={'block text-[14px]'}>{msg.get('scheduler.time.from')}</span>
              <InputMask mask="99:99"
                         name={'event_time_from'}
                         defaultValue={values.event_time_from ? values.event_time_from : timeStart}
                         className={'shc-form-date'}
                         onChange={(e) => {
                           setValues(values => ({
                             ...values,
                             ['event_time_from']: e.target.value,
                           }));
                         }}
              />
              <i className={'f-clock'} />
            </div>
            <div className={'w-1/3 relative'}>
              <span className={'block text-[14px]'}>{msg.get('scheduler.time.to')}</span>
              <InputMask mask="99:99"
                         name={'event_time_to'}
                         defaultValue={values.event_time_to ? values.event_time_to : timeEnd}
                         className={'shc-form-date'}
                         onChange={(e) => {
                           setValues(values => ({
                             ...values,
                             ['event_time_to']: e.target.value,
                           }));
                         }}
              />
              <i className={'f-clock'} />
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
          <div className={'add-services ml-3 btn-link font-bold text-[14px]'} onClick={() => {
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
