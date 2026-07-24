import React, { useEffect, useState } from 'react';
import Lang from 'lang.js';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import lngScheduler from '../../Lang/Scheduler/translation';
import InputText from '../../Components/Form/InputText';
import { findPatientsAction } from '@/Redux/Scheduler/actions';
import { patientsDataSelector } from '@/Redux/Scheduler/selectors';
import { setSchedulePatientIdAction } from '@/Redux/Scheduler';
import { UserPlus } from 'lucide-react';

export default function EventPatient({ editPatientData = null }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const patientsData = useSelector(patientsDataSelector);
  const [addPatient, setAddPatient] = useState(false);
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    patient: '',
    patientExistId: null,
  });
  const [showPatientsList, setShowPatientsList] = useState(false);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setPatientData((values) => ({
      ...values,
      [key]: value,
    }));
    // find clinic patients
    if (e.target.value.length > 3) {
      dispatch(findPatientsAction(e.target.value) as any);
    }
  };

  const renderPatientsList = () => {
    if (patientsData.length === 0) {
      return;
    }

    return (
      <div className="patient-dropdown">
        {patientsData.length === 0 ? (
          <div className="patient-empty">Пацієнтів не знайдено</div>
        ) : (
          patientsData.map((patient) => (
            <div
              type="button"
              key={patient.id}
              className="patient-item"
              onClick={() => {
                setShowPatientsList(false);

                patientData.patient = `${patient.last_name} ${patient.first_name}`;
                patientData.patientExistId = patient.id;

                dispatch(setSchedulePatientIdAction(patient.id));
              }}
            >
              <div className="patient-avatar-sch">
                {patient.last_name[0]}
                {patient.first_name[0]}
              </div>

              <div className="patient-info">
                <div className="patient-name">
                  {patient.last_name} {patient.first_name}
                </div>

                <div className="patient-sch-meta">{patient.phone || 'Без телефону'}</div>
              </div>

              <svg className="patient-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))
        )}
      </div>
    );
  };

  useEffect(() => {
    setShowPatientsList(true);
  }, [patientsData]);

  return (
    <div>
      <>
        <div className="mb-0 relative">
          {/*<label className="control-label text-sm">{msg.get('scheduler.patient')}</label>*/}
          <InputText
            name={'patient'}
            values={patientData}
            value={patientData.patient || editPatientData?.patient}
            onChange={handleChange}
            required
            label={msg.get('scheduler.patient')}
          />
          <>{showPatientsList && renderPatientsList()}</>
          {!addPatient && (
            <span
              onClick={() => {
                setAddPatient(!addPatient);
              }}
              className="ml-2 mt-1 text-gray-500 cursor-pointer add-patient"
              style={{ width: '32px', height: '20px' }}
            >
              <UserPlus className={'w-[24px] h-[24px] block'} />
            </span>
          )}
        </div>
        {addPatient && (
          <div className="mt-4 bg-gray-50 px-2 rounded-md border pb-4">
            <h2>{msg.get('scheduler.add.patient')}</h2>
            <InputText
              name={'firstName'}
              values={patientData}
              value={patientData.firstName}
              onChange={handleChange}
              required
              label={msg.get('scheduler.form.firstName')}
            />
            <InputText
              name={'lastName'}
              values={patientData}
              value={patientData.lastName}
              onChange={handleChange}
              required
              label={msg.get('scheduler.form.lastName')}
            />
            <InputText
              name={'email'}
              values={patientData}
              value={patientData.email}
              onChange={handleChange}
              required
              label={msg.get('scheduler.form.email')}
            />
            <InputText
              name={'phone'}
              values={patientData}
              value={patientData.phone}
              onChange={handleChange}
              required
              label={msg.get('scheduler.form.phone')}
            />
          </div>
        )}
      </>
    </div>
  );
}
