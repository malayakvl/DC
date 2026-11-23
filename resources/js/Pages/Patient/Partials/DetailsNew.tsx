import { Link } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPencil } from '@fortawesome/free-solid-svg-icons';

export default function DetailsNew({
  patientData,
  discountStatus,
  discountValue,
  className = '',
}: {
  patientData: any;
  discountStatus: any;
  discountValue: any;
  className: string;
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
        </div>
      </div>
    </section>
  );
}
