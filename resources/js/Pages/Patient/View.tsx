import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import History from './Tabs/History';
import Finances from './Tabs/Finances';
import { patientTabSelector } from '@/Redux/Patient/selectors';
import { setPatientTab, setExistServicesAction, setPatientSubTab } from '@/Redux/Patient';

export default function index({
  clinicData,
  patientData,
  type,
  treatmentData,
  quickActData,
  discountStatus,
  discountValue,
  services,
  tree,
  scheduleId,
  actData,
}: {
  clinicData: any;
  patientData: any;
  type: any;
  treatmentData: any;
  quickActData: any;
  discountStatus: any;
  discountValue: any;
  services: any;
  tree: any;
  scheduleId: any;
  actData: any;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const tab = useSelector(patientTabSelector);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const activeSubTab = 'perio';

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [globalDiscountType] = useState('percent');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tab, setTab] = useState('history');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [subTab, setSubTab] = useState<'stage' | 'formula' | 'psr' | 'perio'>(activeSubTab);

  const handleTabClick1 = (nextTab: string) => {
    setTab(nextTab);
  };

  const handleSubTabClick = (nextSubTab: 'stage' | 'formula' | 'psr' | 'perio') => {
    setSubTab(nextSubTab);
    // if (onSubTabChange) {
    //   onSubTabChange(nextSubTab);
    // }
  };

  const mainTabs = [
    { id: 'documents', label: 'Документи' },
    { id: 'visits', label: 'Візити' },
    { id: 'plans', label: 'Плани лікування' },
    { id: 'history', label: 'Історія лікування' },
    { id: 'finances', label: 'Фінанси' },
  ];
  const genderLabel =
    patientData?.gender === 'female'
      ? 'Жінка'
      : patientData?.gender === 'male'
        ? 'Чоловік'
        : patientData?.gender || null;

  const demographics = [genderLabel, patientData?.age ? `${patientData.age} років` : null]
    .filter(Boolean)
    .join(', ');

  if (quickActData.length > 0) {
    dispatch(setPatientTab('finances'));
  }
  if (scheduleId) {
    dispatch(setPatientSubTab('act'));
  } else {
    dispatch(setPatientSubTab('actpayment'));
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (quickActData.services) {
      const initialServices = JSON.parse(quickActData.services).map((service: any) => ({
        ...service,
        discountValue: discountValue || 0,
        discountType: globalDiscountType,
      }));
      dispatch(setExistServicesAction(initialServices));
    } else {
      dispatch(setExistServicesAction([]));
    }
  }, [quickActData]);

  const handleTabClick = (tabName: any) => {
    dispatch(setPatientTab(tabName));
  };

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
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4">
                {/* Верхний ряд: Аватар + Инфо пациента + Основные вкладки */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Левая часть: Фото и метаданные */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center text-slate-400">
                      {patientData?.avatar ? (
                        <img
                          src={`/uploads/patients/${patientData.avatar}`}
                          alt={`${patientData.first_name || ''} ${patientData.last_name || ''}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-10 h-10 mt-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                      <span
                        className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"
                        title="Активний пацієнт"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                          {patientData?.first_name} {patientData?.last_name}
                        </h1>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5" />
                          Активний курс
                        </span>

                        {/* Компактные кнопки действий (добавить/редактировать) */}
                        <div className="flex items-center gap-1 ml-1">
                          <Link
                            href="/patients/create"
                            title="Додати пацієнта"
                            className="patient-yellow-btns"
                          >
                            <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
                          </Link>
                          <Link
                            href={patientData?.id ? `/patient/edit/${patientData.id}` : '#'}
                            title="Редагувати картку"
                            className="patient-yellow-btns"
                          >
                            <FontAwesomeIcon icon={faPencil} className="text-xs" />
                          </Link>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {demographics && (
                          <>
                            <span>{demographics}</span>
                            <span className="text-slate-300">•</span>
                          </>
                        )}
                        {patientData?.phone && (
                          <>
                            <span className="font-mono">{patientData.phone}</span>
                            <span className="text-slate-300">•</span>
                          </>
                        )}
                        {patientData?.id && (
                          <>
                            <span className="text-slate-400">ID: #{patientData.id}</span>
                            <span className="text-slate-300">•</span>
                          </>
                        )}
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-mono">
                          МЕДИЧНА КАРТА №{patientData?.card_number || patientData?.id || '—'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Правая часть: Верхние вкладки навигации */}
                  <nav className="tab-view-green">
                    {mainTabs.map((item) => {
                      const isActive = tab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleTabClick(item.id)}
                          className={isActive ? 'tab active' : 'tab'}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
              {/*=======================================*/}
              {/*Таби отображения данних*/}
              {/*=======================================*/}
              <div className="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Folder Stage */}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition">
                    <svg className="w-4 h-4 text-[#dd851e]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                    <span>Етап лікування</span>
                  </button>
                  {/* Tooth Formula */}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition">
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
                    <span>Зубна формула</span>
                  </button>
                  {/* Periodontal Screening Test PSR */}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      PSR
                    </span>
                    <span>Пародонтальний скринінг-тест</span>
                  </button>
                  {/* Periodontal Chart Active Pill */}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition">
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
                    <span>Періо карта</span>
                  </button>
                </div>
              </div>
            </section>

            {tab === 'finances' && (
              <>
                <Finances
                  type={''}
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
            {tab === 'history' && (
              <>
                <History patientData={patientData} type={type} treatmentData={treatmentData} />
              </>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
