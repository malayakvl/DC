import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faPencil,
  faTrash,
  faCopy,
  faPrint,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Formula from './Formula/index';
import FormulaMilk from './Formula/index';
import { teethTypeSelector } from '../../Redux/Formula/selectors';
import lngFormula from '../../Lang/Formula/translation';
import { setPatientTab } from '../../Redux/Patient';

export default function index({ patientData }) {
  const [tab, setTab] = useState('history');
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  const teethType = useSelector(teethTypeSelector);
  const dispatch = useDispatch<any>();

  const handleTabClick = tabName => {
    setTab(tabName);
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
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
                  <b>
                    {patientData.first_name} {patientData.last_name}
                  </b>
                  <span className="block text-[11px]">{patientData.phone}</span>
                </div>
              </div>
              <div className="icon-block">
                <ul>
                  <li>
                    <Link href="/">
                      <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <FontAwesomeIcon icon={faPencil} />
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
            {tab === 'history' && (
              <ul className="sub-tab text-right mt-5">
                <li className="relative">
                  <Link
                    href="javascript:;"
                    onClick={() => dispatch(setPatientTab('stage'))}
                  >
                    <i className="icon-plan-treatment" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.stage')}
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href="javascript:;"
                    onClick={() => dispatch(setPatientTab('formula'))}
                  >
                    <i className="icon-formula" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.formula')}
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href="javascript:;"
                    onClick={() => dispatch(setPatientTab('psr'))}
                  >
                    <i className="icon-psr" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.test')}
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href="javascript:;"
                    onClick={() => dispatch(setPatientTab('perio'))}
                  >
                    <i className="icon-perio" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.perio')}
                    </span>
                  </Link>
                </li>
              </ul>
            )}
            <div className="mt-2">
              <div className="inline w-full">
                <h3 className="text-left inline-block w-[80%]">
                  Зубна формула
                </h3>
                <ul className="action-patient-icon inline-block w-[20%] text-right">
                  <li>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faUserDoctor} className="mr-5" />
                    </Link>
                    <Link href={`/formula/edit/${patientData.id}`}>
                      <FontAwesomeIcon icon={faPencil} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faCopy} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faPrint} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faTrash} className="mr-5" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="flex w-full">
                <div className="w-2/3 bordered">
                  {teethType === 'adult' && <Formula />}
                  {teethType != 'adult' && <FormulaMilk />}
                </div>
                <div className="w-1/3 bordered">
                  <ul className="tabls-list">
                    <li className="active" onClick={() => {}}>
                      {msg.get('patient.upper.jaw')}
                    </li>
                    <li className="active">{msg.get('patient.lower.jaw')}</li>
                    <li className="active">{msg.get('patient.occlusion')}</li>
                    <li className="active">{msg.get('patient.periodontal')}</li>
                    <li className="active">{msg.get('patient.teeth')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
