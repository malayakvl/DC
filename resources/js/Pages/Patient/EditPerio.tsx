import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faFloppyDisk,
  faPencil,
  faTrash,
  faPrint,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Perio from './Perio/index';
import Formula from './Formula/index';
import FormulaMilk from './FormulaMilk/index';
import {
  getDiagnosisSelector,
  getSealColor1Selector,
  getSealColor2Selector,
  getSealColor3Selector,
  getSubDiagnosisSelector,
  teethTypeSelector,
  getSealServicalColorSelector,
  getVinirColorSelector,
  getCeramicCrownColorSelector,
  getCeramicMCrownColorSelector,
  getMetalicCrownColorSelector,
  getZirconiaCrownColorSelector,
} from '../../Redux/Formula/selectors';
import {
  setTeethType,
  setDiagnosis,
  setSubDiagnosis,
  setSealColor1,
  setSealColor2,
  setSealColor3,
  setSealServicalColor,
  setVinirColor,
  setCeramicCrownColor,
  setMCeramicCrownColor,
  setMetalicCrownColor,
  setZirconiaCrownColor,
  setDiagnosisClass,
} from '../../Redux/Formula';
import Details from './Partials/Details';

export default function index({ patientData, treatmentData, clinicData }) {
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

  const dispatch = useDispatch<any>();
  const teethType = useSelector(teethTypeSelector);
  const handleTabClick = tabName => {
    setTab(tabName);
  };
  const diagnozis = useSelector(getDiagnosisSelector);
  const subdiagnozis = useSelector(getSubDiagnosisSelector);
  const sealColor1 = useSelector(getSealColor1Selector);
  const sealColor2 = useSelector(getSealColor2Selector);
  const sealColor3 = useSelector(getSealColor3Selector);
  const scColor = useSelector(getSealServicalColorSelector);
  const vinirColor = useSelector(getVinirColorSelector);
  const ceramicCrownColor = useSelector(getCeramicCrownColorSelector);
  const mceramicCrownColor = useSelector(getCeramicMCrownColorSelector);
  const metalicCrownColor = useSelector(getMetalicCrownColorSelector);
  const zirconiaCrownColor = useSelector(getZirconiaCrownColorSelector);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Details patientData={patientData} clinicData={clinicData} />

            {/* <div className="patient-view-border relative">
                            <div className='flex'>
                                {patientData.avatar ? (
                                    <div className='profile-photo' style={{backgroundImage: `url(/uploads/patients/${patientData.avatar})`}} />
                                ) : (
                                    <div className='profile-photo' />
                                )}
                                <div className='parient-info'>
                                    <b>{patientData.first_name} {patientData.last_name}</b>
                                    <span className='block text-[11px]'>{patientData.phone}</span>
                                </div>
                            </div>
                            <div className='icon-block'>
                                <ul>
                                    <li>
                                        <Link href="/">
                                            <FontAwesomeIcon icon={faUserPlus} className='mr-3' />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="">
                                            <FontAwesomeIcon icon={faPencil} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='tabs-block'>
                                <ul>
                                    <li id="documents" className={tab === 'documents' ? 'active' : ''} onClick={() => handleTabClick('documents')}>
                                        Документи
                                    </li>
                                    <li id="visits" className={tab === 'visits' ? 'active' : ''} onClick={() => handleTabClick('visits')}>
                                        Візити
                                    </li>
                                    <li id="plans" className={tab === 'plans' ? 'active' : ''} onClick={() => handleTabClick('plans')}>
                                        Плани лікування
                                    </li>
                                    <li id="history" className={tab === 'history' ? 'active' : ''} onClick={() => handleTabClick('history')}>
                                        Історія лікування
                                    </li>
                                    <li id="finances" className={tab === 'finances' ? 'active' : ''} onClick={() => handleTabClick('finances')}>
                                        Фінанси
                                    </li>
                                </ul>
                            </div>
                        </div> */}
            {tab === 'history' && (
              <ul className="sub-tab text-right mt-5">
                <li className="relative">
                  <Link href="/">
                    <i className="icon-plan-treatment" />
                    <span className="inline-block ml-[35px]">
                      Етап лікування
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link href="/">
                    <i className="icon-formula" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.formula')}
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link href="/">
                    <i className="icon-psr" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.test')}
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link href="/">
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
                  {treatmentData.stage_name}
                </h3>
                <ul className="action-patient-icon inline-block w-[20%] text-right">
                  <li>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faUserDoctor} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faPrint} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faFloppyDisk} className="mr-5" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="flex w-full patient-content-border">
                <Perio />

                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
