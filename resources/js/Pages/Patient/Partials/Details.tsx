import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPencil } from '@fortawesome/free-solid-svg-icons';

interface DetailsProps {
  patientData: any;
  clinicData?: any;
  className?: string | null;
  activeSubTab?: 'stage' | 'formula' | 'psr' | 'perio';
  onSubTabChange?: (subTab: 'stage' | 'formula' | 'psr' | 'perio') => void;
}

export default function Details({
  patientData,
  clinicData,
  className = '',
  activeSubTab = 'perio',
  onSubTabChange,
}: DetailsProps) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  const [tab, setTab] = useState('history');
  const [subTab, setSubTab] = useState<'stage' | 'formula' | 'psr' | 'perio'>(activeSubTab);

  const handleTabClick = (nextTab: string) => {
    setTab(nextTab);
  };

  const handleSubTabClick = (nextSubTab: 'stage' | 'formula' | 'psr' | 'perio') => {
    setSubTab(nextSubTab);
    if (onSubTabChange) {
      onSubTabChange(nextSubTab);
    }
  };

  const mainTabs = [
    { id: 'documents', label: 'Документи' },
    { id: 'visits', label: 'Візити' },
    { id: 'plans', label: 'Плани лікування' },
    { id: 'history', label: 'Історія лікування' },
    { id: 'finances', label: 'Фінанси' },
  ];

  // Формируем строку пола и возраста, если переданы в patientData
  const genderLabel =
    patientData?.gender === 'female'
      ? 'Жінка'
      : patientData?.gender === 'male'
        ? 'Чоловік'
        : patientData?.gender || null;

  const demographics = [genderLabel, patientData?.age ? `${patientData.age} років` : null]
    .filter(Boolean)
    .join(', ');

  return (
    <section
      className={`max-w-[1920px] mx-auto w-full pt-4 pb-2 ${className || ''}`}
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
                    href="/patient/create"
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
                  МЕДИЧНА КАРТА №{patientData?.medical_card_no || patientData?.id || '—'}
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

        {/* Нижний ряд: Клинические подвкладки (показываем в "Історія лікування" или всегда — как удобнее) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Етап лікування */}
            <button
              type="button"
              onClick={() => handleSubTabClick('stage')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                subTab === 'stage'
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${subTab === 'stage' ? 'text-teal-100' : 'text-amber-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Етап лікування</span>
            </button>

            {/* Зубна формула */}
            <button
              type="button"
              onClick={() => handleSubTabClick('formula')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                subTab === 'formula'
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${subTab === 'formula' ? 'text-teal-100' : 'text-[#dd841d]'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 3C4.5 3 3 5.5 3 9c0 4.5 3 8 4.5 12 .5 1.5 2 1.5 2.5 0 .5-1.5 1-4 2-4s1.5 2.5 2 4c.5 1.5 2 1.5 2.5 0 1.5-4 4.5-7.5 4.5-12 0-3.5-1.5-6-4-6-2 0-3.5 1.5-4.5 2C10.5 4.5 9 3 7 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Зубна формула</span>
            </button>

            {/* PSR */}
            <button
              type="button"
              onClick={() => handleSubTabClick('psr')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                subTab === 'psr'
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span
                className={`text-[10px] font-bold px-1 rounded ${
                  subTab === 'psr' ? 'bg-teal-500 text-white' : 'text-amber-600 bg-amber-50'
                }`}
              >
                PSR
              </span>
              <span>Пародонтальний скринінг-тест</span>
            </button>

            {/* Періо карта */}
            <button
              type="button"
              onClick={() => handleSubTabClick('perio')}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                subTab === 'perio'
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${subTab === 'perio' ? 'text-teal-100' : 'text-teal-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Періо карта</span>
            </button>
          </div>

          {/* Метаинформация последнего измерения справа */}
          <div className="text-[11px] text-slate-400">
            Останнє вимірювання:{' '}
            <span className="font-medium text-slate-600">
              {patientData?.last_perio_date || '—'}
            </span>
            {patientData?.doctor_name && ` (лікар ${patientData.doctor_name})`}
          </div>
        </div>
      </div>
    </section>
  );
}
