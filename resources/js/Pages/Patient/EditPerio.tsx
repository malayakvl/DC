import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPencil, faPrint, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import Perio from './Perio/index';
import {
  chartBarDown2Selector,
  chartBarDownSelector,
  chartBarUp2Selector,
  chartBarUpSelector,
  chartKrayDownSelector,
  chartKrayUp2Selector,
  chartKrayDown2Selector,
  chartKrayUpSelector,
  chartZondDown2Selector,
  chartZondDownSelector,
  chartZondUp2Selector,
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
  setPerioZ4838OralData,
} from '../../Redux/Formula';

export default function PatientPerioIndex({
  patientData,
  treatmentData,
  clinicData,
}: {
  patientData: any;
  treatmentData: any;
  clinicData: any;
}) {
  let tDia, tValues;

  const [tab] = useState('history');
  const appLang: string = useSelector(appLangSelector);
  const teethDiagnozis: any = useSelector(perioDiagnozisSelector);
  const yasen1828VestData: any = useSelector(getPerioYK1828VDataSelector);
  const yasen1828OralData: any = useSelector(getPerioYK1828ODataSelector);
  const yasen4838VestData: any = useSelector(getPerioYK4838VDataSelector);
  const yasen4838OralData: any = useSelector(getPerioYK4838ODataSelector);

  const zond1828VestData: any = useSelector(getPerioZ1828VDataSelector);
  const zond1828OralData: any = useSelector(getPerioZ1828ODataSelector);
  const zond4838VestData: any = useSelector(getPerioZ4838VDataSelector);
  const zond4838OralData: any = useSelector(getPerioZ4838ODataSelector);

  const zond1828VestChart: any = useSelector(chartZondUpSelector);
  const yasen1828VestChart: any = useSelector(chartKrayUpSelector);
  const bar1828VestChart: any = useSelector(chartBarUpSelector);

  const zond1828OralChart: any = useSelector(chartZondDownSelector);
  const yasen1828OralChart: any = useSelector(chartKrayDownSelector);
  const bar1828OralChart: any = useSelector(chartBarDownSelector);

  const zond4838VestChart: any = useSelector(chartZondUp2Selector);
  const yasen4838VestChart: any = useSelector(chartKrayUp2Selector);
  const bar4838VestChart: any = useSelector(chartBarUp2Selector);

  const zond4838OralChart: any = useSelector(chartZondDown2Selector);
  const yasen4838OralChart: any = useSelector(chartKrayDown2Selector);
  const bar4838OralChart: any = useSelector(chartBarDown2Selector);

  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const dispatch = useDispatch<any>();

  // const handleTabClick = (tabName: any) => {
  //   setTab(tabName);
  // };

  const [values] = useState({
    clinic_id: clinicData.id,
    patientData: patientData,
    treatmentData: teethDiagnozis,
    formula_type: '',
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
  }, [treatmentData.formula]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = { ...values };
    payload['treatmentData'] = teethDiagnozis;
    payload['perioValues'] = {
      yk1828Vest: yasen1828VestData,
      yk1828Oral: yasen1828OralData,
      yk4838Vest: yasen4838VestData,
      yk4838Oral: yasen4838OralData,
      z1828Vest: zond1828VestData,
      z1828Oral: zond1828OralData,
      z4838Vest: zond4838VestData,
      z4838Oral: zond4838OralData,
    };
    payload['chartsData'] = {
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
      bar4838OralChart: bar4838OralChart,
    };
    payload['teethType'] = '';

    dispatch(setClearPerio());
    if (treatmentData.id) {
      router.post(`/patient/update-perio?id=${treatmentData.id}`, payload);
    }
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <Details patientData={patientData} clinicData={clinicData} className={''} />

            <div className="mt-2">
              <div className="inline w-full">
                <h3 className="text-left inline-block w-[80%]">{treatmentData.stage_name}</h3>
                <ul className="action-patient-icon inline-block w-[20%] text-right">
                  <li>
                    <Link
                      href={`/patient/edit/${patientData.id}`}
                      title="Редагувати картку"
                      className="patient-yellow-btns"
                    >
                      <FontAwesomeIcon
                        icon={faUserDoctor}
                        className="text-xs"
                        style={{ color: '#dd841d' }}
                      />
                    </Link>
                  </li>
                  {/*<li>*/}
                  {/*  <Link href={`patient/edit/`} className={'patient-yellow-list-btns'}>*/}
                  {/*    <FontAwesomeIcon icon={faUserDoctor} className="mr-5" color={'#dd841d'} />*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  <li>
                    <Link href={`patient/edit/`} className="patient-yellow-btns ml-2">
                      <FontAwesomeIcon
                        icon={faPrint}
                        className="text-xs"
                        style={{ color: '#dd841d' }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href={`patient/edit/`} className="patient-yellow-btns ml-2">
                      <FontAwesomeIcon
                        icon={faFloppyDisk}
                        className="text-xs"
                        style={{ color: '#dd841d' }}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="flex w-full patient-content-border">
                {/*<Perio editPerio={!!treatmentData.perioValues} />*/}
                <Perio />

                <div className="clearfix" />
              </div>
              <div className="mt-[20px] mb-[30px] float-right relative z-10">
                <Link
                  className="btn-back"
                  title={msg.get('patient.back')}
                  href={`/patient/view/${patientData.id}`}
                >
                  {msg.get('patient.back')}
                </Link>
                <PrimaryButton onClick={(e) => submit(e)}>{msg.get('patient.save')}</PrimaryButton>
              </div>
              <div className="clearfix" style={{ marginBottom: '40px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
