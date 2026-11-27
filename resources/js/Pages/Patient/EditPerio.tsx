import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
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
import DetailsNew from '@/Pages/Patient/Partials/DetailsNew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import lngFormula from '@/Lang/Formula/translation';


export default function PatientPerioIndex({
  patientData,
  treatmentData,
  clinicData,
  discountStatus,
  discountValue,
}: {
  patientData: any;
  treatmentData: any;
  clinicData: any;
  discountStatus: any;
  discountValue: any;
}) {
  let tDia, tValues;
  const appLang: string = useSelector(appLangSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });

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
            <DetailsNew
              patientData={patientData}
              discountStatus={discountStatus}
              discountValue={discountValue}
              className={''}
            />
            <div className="mt-2">
              <div className="flex w-full lg:col-span-7 xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between mt-4 mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-slate-900 text-sm tracking-tight">
                    {msgFormula.get('formula.perio_title')}
                  </span>
                  <span className="ml-auto">
                    <strong className="text-slate-600 font-medium">
                      {format(new Date(treatmentData.updated_at), 'dd.MM.yyyy HH:mm')}
                    </strong>
                  </span>
                </div>
                <Perio />
                <div className="clearfix" />
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-40">
                <Link
                  className="btn-back"
                  title={msg.get('patient.back')}
                  href={`/patient/view/${patientData.id}`}
                >
                  {msg.get('patient.back')}
                </Link>
                <div>
                  <button className="btn-back">
                    <FontAwesomeIcon icon={faPrint} className="text-xs mr-2" />
                    <span>{msg.get('patient.print')}</span>
                  </button>
                  <PrimaryButton onClick={(e) => submit(e)}>
                    {msg.get('patient.save')}
                  </PrimaryButton>
                </div>
              </div>
              <div className="clearfix" style={{ marginBottom: '40px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
