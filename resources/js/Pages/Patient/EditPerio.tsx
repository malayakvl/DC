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
  chartBarDownSelector,
  chartBarUp2Selector,
  chartBarUpSelector, chartKrayDownSelector, chartKrayUp2Selector,
  chartKrayDown2Selector,
  chartKrayUpSelector, chartZondDown2Selector,
  chartZondDownSelector, chartZondUp2Selector,
  chartZondUpSelector,
  getPerioYK1828ODataSelector,
  getPerioYK1828VDataSelector,
  getPerioYK4838ODataSelector,
  getPerioYK4838VDataSelector,
  getPerioZ1828ODataSelector,
  getPerioZ1828VDataSelector,
  getPerioZ4838ODataSelector,
  getPerioZ4838VDataSelector,
  perioDiagnozisSelector,
  teethTypeSelector,
} from '../../Redux/Formula/selectors';
import Details from './Partials/Details';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import {
  setClearPerio,
  setPerioDiagnoze,
  setPerioYK1828VestData,
  setPerioYK4838VestData,
  setPerioYK1828OralData,
  setPerioYK4838OralData,
  setPerioZ1828VestData,
  setPerioZ1828OralData,
  setPerioZ4838VestData,
  setPerioZ4838OralData
} from '../../Redux/Formula';

export default function index({ patientData, treatmentData, clinicData }) {
  let tDia, tValues;

  const [tab, setTab] = useState('history');
  const [editPerio, setEditPerio] = useState(false);
  const appLang = useSelector(appLangSelector);
  const teethDiagnozis = useSelector(perioDiagnozisSelector);
  const yasen1828VestData = useSelector(getPerioYK1828VDataSelector);
  const yasen1828OralData = useSelector(getPerioYK1828ODataSelector);
  const yasen4838VestData = useSelector(getPerioYK4838VDataSelector);
  const yasen4838OralData = useSelector(getPerioYK4838ODataSelector);

  const zond1828VestData = useSelector(getPerioZ1828VDataSelector);
  const zond1828OralData = useSelector(getPerioZ1828ODataSelector);
  const zond4838VestData = useSelector(getPerioZ4838VDataSelector);
  const zond4838OralData = useSelector(getPerioZ4838ODataSelector);

  const zond1828VestChart = useSelector(chartZondUpSelector);
  const yasen1828VestChart = useSelector(chartKrayUpSelector);
  const bar1828VestChart = useSelector(chartBarUpSelector);

  const zond1828OralChart = useSelector(chartZondDownSelector);
  const yasen1828OralChart = useSelector(chartKrayDownSelector);
  const bar1828OralChart = useSelector(chartBarDownSelector);

  const zond4838VestChart = useSelector(chartZondUp2Selector);
  const yasen4838VestChart = useSelector(chartKrayUp2Selector);
  const bar4838VestChart = useSelector(chartBarUp2Selector);

  const zond4838OralChart = useSelector(chartZondDown2Selector);
  const yasen4838OralChart = useSelector(chartKrayDown2Selector);
  const bar4838OralChart = useSelector(chartBarDown2Selector);

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
  });

  useEffect(() => {
    if (treatmentData.formula) {
      tDia = JSON.parse(treatmentData.formula);
      tValues = JSON.parse(treatmentData.perioValues);
      dispatch(setPerioDiagnoze(tDia));
      dispatch(setPerioYK1828VestData(tValues.yk1828Vest));
      dispatch(setPerioYK4838VestData(tValues.yk4838Vest));
      dispatch(setPerioYK1828OralData(tValues.yk1828Oral));
      dispatch(setPerioYK4838OralData(tValues.yk4838Oral));
      dispatch(setPerioZ1828VestData(tValues.z1828Vest));
      dispatch(setPerioZ1828OralData(tValues.z1828Oral));
      dispatch(setPerioZ4838VestData(tValues.z1828Vest));
      dispatch(setPerioZ4838OralData(tValues.z1828Oral));
    }
  }, [treatmentData.formula])

  // useEffect(() => {
  //   setEditPerio(true);
  // }, [treatmentData.perioValues])

  const submit = e => {
    e.preventDefault();

    values['treatmentData'] = teethDiagnozis;
    values['perioValues'] = {
      yk1828Vest: yasen1828VestData,
      yk1828Oral: yasen1828OralData,
      yk4838Vest: yasen4838VestData,
      yk4838Oral: yasen4838OralData,
      z1828Vest: zond1828VestData,
      z1828Oral: zond1828OralData,
      z4838Vest: zond4838VestData,
      z4838Oral: zond4838OralData,
    }
    values['chartsData'] = {
      yasen1828VestChart: yasen1828VestChart,
      zond1828VestChart: zond1828VestChart,
      bar1828VestChart: bar1828VestChart,

      yasen1828OralChart: yasen1828OralChart,
      zond1828OralChart: zond1828OralChart,
      bar1828OralChart: bar1828OralChart,

      yasen4838VestChart: yasen4838VestChart,
      zond4838VestChart: zond4838VestChart,
      bar4838VestChart: bar4838VestChart,

      yasen4838OralChart: yasen4838OralChart,
      zond4838OralChart: zond4838OralChart,
      bar4838OralChart: bar4838OralChart
    }
    values['teethType'] = '';

    dispatch(setClearPerio());
    if (treatmentData.id) {
      router.post(`/patient/update-perio?id=${treatmentData.id}`, values);
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
                <Perio editPerio={!!treatmentData.perioValues} />

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
