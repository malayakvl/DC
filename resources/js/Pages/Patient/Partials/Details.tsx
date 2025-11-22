import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faFloppyDisk,
  faPencil,
  faTrash,
  faPrint,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';

export default function Details({ patientData, clinicData, className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const [tab, setTab] = useState('history');

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  // const { files } = usePage().props

  return (
    <section className={className}>
      <div className="patient-view-border relative">
        <div className="flex">
          {patientData.avatar ? (
            <div
              className="profile-photo"
              style={{
                backgroundImage: `url(/uploads/patients/${patientData.avatar})`,
              }}
            />
          ) : (
            <div className="profile-photo" />
          )}
          <div className="parient-info">
            <b className="text-p-name">
              {patientData.first_name} {patientData.last_name}
            </b>
            <span className="p-phone">
              {patientData.phone}
            </span>
          </div>
        </div>
        <div className="icon-block">
          <ul>
            <li>
              <Link href="/">
                <FontAwesomeIcon style={{color: 'white'}} icon={faUserPlus} className="mr-3" />
              </Link>
            </li>
            <li>
              <Link href="">
                <FontAwesomeIcon style={{color: 'white'}} icon={faPencil} />
              </Link>
            </li>
          </ul>
        </div>
        <div className="tabs-block">
          <ul>
            <li
              id="documents"
              className={tab === 'documents' ? 'active' : ''}
              onClick={() => handleTabClick('documents')}
            >
              Документи
            </li>
            <li
              id="visits"
              className={tab === 'visits' ? 'active' : ''}
              onClick={() => handleTabClick('visits')}
            >
              Візити
            </li>
            <li
              id="plans"
              className={tab === 'plans' ? 'active' : ''}
              onClick={() => handleTabClick('plans')}
            >
              Плани лікування
            </li>
            <li
              id="history"
              className={tab === 'history' ? 'active' : ''}
              onClick={() => handleTabClick('history')}
            >
              Історія лікування
            </li>
            <li
              id="finances"
              className={tab === 'finances' ? 'active' : ''}
              onClick={() => handleTabClick('finances')}
            >
              Фінанси
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
