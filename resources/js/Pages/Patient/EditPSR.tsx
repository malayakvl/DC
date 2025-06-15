import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faPrint,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PSR from './PSR/index';

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
  getZirconiaCrownColorSelector, getPsrDataSelector,
} from '../../Redux/Formula/selectors';
import Details from './Partials/Details';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import {
  setClearPerio,
  setClearPSR,
  setPerioDiagnoze,
  setPerioYK1828OralData,
  setPerioYK1828VestData,
  setPerioYK4838OralData,
  setPerioYK4838VestData,
  setPerioZ1828OralData,
  setPerioZ1828VestData,
  setPerioZ4838OralData,
  setPerioZ4838VestData,
  setPsrValues,
} from '../../Redux/Formula';

export default function index({ patientData, treatmentData, clinicData }) {
  const [tab, setTab] = useState('history');
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  let psrData = useSelector(getPsrDataSelector);
  const [values, setValues] = useState({
    clinic_id: clinicData.id,
    patientData: patientData,
    treatmentData: psrData,
  });

  const dispatch = useDispatch<any>();
  const handleTabClick = tabName => {
    setTab(tabName);
  };

  useEffect(() => {
    if (treatmentData.psr) {
      psrData = JSON.parse(treatmentData.psr);
      dispatch(setPsrValues(psrData));
    }
  }, [treatmentData.psr])

  const submit = e => {
    e.preventDefault();

    values['treatmentData'] = psrData;

    dispatch(setClearPSR());
    if (treatmentData.id) {
      router.post(`/patient/update-psr?id=${treatmentData.id}`, values);
    } else {
    }
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Details patientData={patientData} clinicData={clinicData} />
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
                <PSR pData={psrData} />

                <div className="clearfix" />
              </div>
              <div className="mt-[20px] mb-[10px] float-right relative z-10">
                <Link
                  className="btn-back"
                  title={msg.get('patient.back')}
                  href={`/patient/view/${patientData.id}`}
                >
                  {msg.get('patient.back')}
                </Link>
                <PrimaryButton onClick={e => submit(e)}>
                  {msg.get('patient.save')}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
