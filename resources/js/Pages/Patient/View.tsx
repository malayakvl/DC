import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
// import History from './Tabs/History';
import MedicalDatas from './Tabs/MedicalDatas';
import Finances from './Tabs/Finances';
import { setPatientTab, setTreatmentsTab } from '@/Redux/Patient';
import { useAppDispatch } from '../../hooks';
import { patientTabSelector } from '@/Redux/Patient/selectors';
import Plans from '@/Pages/Patient/Tabs/Plans';
import Visits from '@/Pages/Patient/Tabs/Visits';
import Documents from '@/Pages/Patient/Tabs/Documents';
import Details from '@/Pages/Patient/Partials/Details';

export default function index({
  clinicData,
  patientData,
  typeTab,
  treatmentData,
  quickActData,
  discountStatus,
  discountValue,
  services,
  tree,
  scheduleId,
  actData,
  visitsData,
  documentsData,
}: {
  clinicData: any;
  patientData: any;
  typeTab: string;
  treatmentData: any;
  quickActData: any;
  discountStatus: any;
  discountValue: any;
  services: any;
  tree: any;
  scheduleId: any;
  actData: any;
  visitsData?: any;
  documentsData?: any;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [globalDiscountType] = useState('percent');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tab = typeTab || useSelector(patientTabSelector);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (quickActData.length > 0) {
    dispatch(setPatientTab('finances'));
  }

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head
        title={
          msg.get('patient.title.view') + ' ' + patientData.first_name + ' ' + patientData.last_name
        }
      />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <section
              className={`max-w-[1920px] mx-auto w-full pt-4 pb-2`}
              data-purpose="patient-identity-card"
            >
              <Details patientData={patientData} showSubTab={false} />

              {/*=======================================*/}
              {/*Таби отображения данних*/}
              {/*=======================================*/}
              {tab == 'medic_data' && (
                <>
                  <div className="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs mt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{msg.get('patient.caption_filters')}</span>
                      {/* Tooth Formula */}
                      <button
                        onClick={() => dispatch(setTreatmentsTab('formula'))}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-[#dd841d]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill={'#fef3c7'}
                            d="M7 3C4.5 3 3 5.5 3 9c0 4.5 3 8 4.5 12 .5 1.5 2 1.5 2.5 0 .5-1.5 1-4 2-4s1.5 2.5 2 4c.5 1.5 2 1.5 2.5 0 1.5-4 4.5-7.5 4.5-12 0-3.5-1.5-6-4-6-2 0-3.5 1.5-4.5 2C10.5 4.5 9 3 7 3z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span>{msg.get('patient.tab.formula')}</span>
                      </button>
                      {/* Periodontal Screening Test PSR */}
                      <button
                        onClick={() => dispatch(setTreatmentsTab('psr'))}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition"
                      >
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                          PSR
                        </span>
                        <span>{msg.get('patient.tab.test')}</span>
                      </button>
                      {/* Periodontal Chart Active Pill */}
                      <button
                        onClick={() => dispatch(setTreatmentsTab('perio'))}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 text-[#dd841d]"
                        >
                          <path
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        <span>{msg.get('patient.tab.perio')}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>

            {tab === 'finances' && (
              <>
                <Finances
                  typeTab={typeTab}
                  scheduleId={scheduleId}
                  clinicData={clinicData}
                  patientData={patientData}
                  discountStatus={discountStatus}
                  pDiscountValue={discountValue}
                  pServices={services}
                  tree={tree}
                  actData={actData}
                  currency={undefined}
                />
              </>
            )}
            {tab === 'plans' && (
              <>
                <Plans patientData={patientData} typeTab={typeTab} />
              </>
            )}
            {tab === 'visits' && (
              <>
                <Visits patientData={patientData} typeTab={typeTab} visitsData={visitsData} />
              </>
            )}
            {tab === 'documents' && (
              <>
                <Documents
                  patientData={patientData}
                  typeTab={typeTab}
                  documentsData={documentsData}
                />
              </>
            )}
            {tab === 'medic_data' && (
              <>
                <MedicalDatas
                  patientData={patientData}
                  type={typeTab}
                  treatmentData={treatmentData}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
