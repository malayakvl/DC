import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import PSR from './PSR/index';

import { getPsrDataSelector } from '../../Redux/Formula/selectors';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import { setClearPSR, setPsrValues } from '../../Redux/Formula';
import DetailsNew from '@/Pages/Patient/Partials/DetailsNew';

export default function EditPSR({
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
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  // const msgFormula = new Lang({
  //   messages: lngFormula,
  //   locale: appLang,
  // });
  let psrData = useSelector(getPsrDataSelector);
  const [values] = useState({
    clinic_id: clinicData.id,
    patientData: patientData,
    treatmentData: psrData,
  });

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (treatmentData.psr) {
      psrData = JSON.parse(treatmentData.psr);
      dispatch(setPsrValues(psrData));
    }
  }, [treatmentData.psr]);

  const submit = (e: any) => {
    e.preventDefault();

    values['treatmentData'] = psrData;

    dispatch(setClearPSR());
    if (treatmentData.id) {
      router.post(`/patient/update-psr?id=${treatmentData.id}`, values);
    }
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient PSR'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <DetailsNew
              patientData={patientData}
              discountStatus={discountStatus}
              discountValue={discountValue}
              className={''}
            />

            <div className="mt-0">
              <div className="clearfix" />
              <div className="flex w-full lg:col-span-7 xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between mt-4 mb-3">
                <PSR />
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
                <PrimaryButton onClick={(e) => submit(e)}>{msg.get('patient.save')}</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
