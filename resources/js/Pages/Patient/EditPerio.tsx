import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
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
import {
  chartBarDown2Selector,
  chartBarDownSelector, chartBarUp2Selector, chartBarUpSelector,
  getPerioYK1828ODataSelector, getPerioYK1828VDataSelector, getPerioYK4838ODataSelector,
  getPerioYK4838VDataSelector,
  getPerioZ1828ODataSelector,
  getPerioZ1828VDataSelector, getPerioZ4838ODataSelector, getPerioZ4838VDataSelector,
  perioDiagnozisSelector,
  teethTypeSelector,
} from '../../Redux/Formula/selectors';
import Details from './Partials/Details';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import { setClearPerio } from '../../Redux/Formula';

export default function index({ patientData, treatmentData, clinicData }) {
  const [tab, setTab] = useState('history');
  const appLang = useSelector(appLangSelector);
  const teethDiagnozis = useSelector(perioDiagnozisSelector);

  const yasen1828VestData = useSelector(getPerioYK1828VDataSelector);
  const yasen1828OralData = useSelector(getPerioYK1828ODataSelector);
  const yasen4838VestData = useSelector(getPerioYK4838VDataSelector);
  const yasen4838OralData = useSelector(getPerioYK4838ODataSelector);
  const bar1828VestData = useSelector(chartBarUpSelector);
  const bar1828OralData = useSelector(chartBarDownSelector);

  const zond1828VestData = useSelector(getPerioZ1828VDataSelector);
  const zond1828OralData = useSelector(getPerioZ1828ODataSelector);
  const zond4838VestData = useSelector(getPerioZ4838VDataSelector);
  const zond4838OralData = useSelector(getPerioZ4838ODataSelector);
  const bar4838VestData = useSelector(chartBarUp2Selector);
  const bar4838OralData = useSelector(chartBarDown2Selector);

  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const dispatch = useDispatch<any>();
  const teethType = useSelector(teethTypeSelector);
  const handleTabClick = tabName => {
    setTab(tabName);
  };

  const [values, setValues] = useState({
    clinic_id: clinicData.id,
    patientData: patientData,
    treatmentData: teethDiagnozis,
    formula_type: teethType,

    yk1828Vest: yasen1828VestData,
    yk1828Oral: yasen1828OralData,
    yk4838Vest: yasen4838VestData,
    yk4838Oral: yasen4838OralData,

    z1828Vest: zond1828VestData,
    z1828Oral: zond1828OralData,
    z4838Vest: zond4838VestData,
    z4838Oral: zond4838OralData,

    bar1828VestData: bar1828VestData,
    bar1828OralData: bar1828OralData,

    bar4838VestData: bar4838VestData,
    bar4838OralData: bar4838OralData
  });

  const submit = e => {
    e.preventDefault();

    values['yk1828Vest'] = yasen1828VestData;
    values['yk1828Oral'] = yasen1828OralData;
    values['yk4838Vest'] = yasen4838VestData;
    values['yk4838Oral'] = yasen4838OralData;
    values['bar1828VestData'] = bar1828VestData;
    values['bar1828OralData'] = bar1828OralData;

    values['z1828Vest'] = zond1828VestData;
    values['z1828Oral'] = zond1828OralData;
    values['z4838Vest'] = zond4838VestData;
    values['z4838Oral'] = zond4838OralData;
    values['bar4838VestData'] = bar4838VestData;
    values['bar4838OralData'] = bar4838OralData;

    values['treatmentData'] = teethDiagnozis;
    values['perioChartData'] = {
      yk1828Vest: yasen1828VestData,
      yk1828Oral: yasen1828OralData,
      yk4838Vest: yasen4838VestData,
      yk4838Oral: yasen4838OralData,
      z1828Vest: zond1828VestData,
      z1828Oral: zond1828OralData,
      z4838Vest: zond4838VestData,
      z4838Oral: zond4838OralData,
      bar1828VestData: bar1828VestData,
      bar1828OralData: bar1828OralData,
      bar4838VestData: bar4838VestData,
      bar4838OralData: bar4838OralData
    }
    values['teethType'] = '';
    console.log('VALUES', values);
    // // clear selector
    dispatch(setClearPerio());
    //
    // if (treatmentData.id) {
    //   router.post(`/patient/update-perio?id=${treatmentData.id}`, values);
    // } else {
    // }
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
                <Perio />

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
