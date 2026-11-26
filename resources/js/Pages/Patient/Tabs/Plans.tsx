import React, { useState } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router, useForm } from '@inertiajs/react';
import { patientServicesSelector, patientTabSelector } from '../../../Redux/Patient/selectors';

export default function Plans({
  typeTab,
  patientData,
}: {
  typeTab: any;
  patientData: any;
}) {
  const dispatch = useDispatch();
  const tab = useSelector(patientTabSelector);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Плани лікування</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Комплексні протоколи, кошториси та клінічні етапи реабілітації пацієнта
          </p>
        </div>
        <Link
          href={`/patient/plan-create/${patientData.id}`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          id="openModalBtnTop"
          type="button"
        >
          <svg
            className="w-4 h-4 stroke-[2.2]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Створити план лікування</span>
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 sm:p-14 text-center mt-4">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-sm ring-8 ring-teal-50/60 mb-6">
          <svg
            className="w-10 h-10 stroke-[1.6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          У пацієнта ще немає створених планів лікування
        </h3>
        <p className="max-w-xl mx-auto text-sm text-slate-500 leading-relaxed mb-8">
          Сформуйте індивідуальний комплексний або етапний план лікування з автоматичною
          синхронізацією патологій із зубної формули, діагностичних КТ-знімків та кошторису послуг.
        </p>
        {/*<div className="mb-14">*/}
        {/*  <button className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2" id="openModalBtnCenter" type="button">*/}
        {/*    <svg className="w-5 h-5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
        {/*      <path d="M12 4v16m8-8H4" stroke-linecap="round" stroke-linejoin="round"></path>*/}
        {/*    </svg>*/}
        {/*    <span>Створити перший план лікування</span>*/}
        {/*  </button>*/}
        {/*</div>*/}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 text-left border-t border-slate-100 pt-0">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-teal-600 mb-3 shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                ></path>
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
              Синхронізація з картою
              <span className="text-[10px] bg-teal-100 text-teal-800 font-mono px-1.5 py-0.2 rounded font-semibold">
                Auto
              </span>
            </h4>
            <p className="text-xs text-slate-500 leading-normal">
              Автоімпорт виявлених карієсів та кісткових дефектів із поточної зубної формули (
              <span className="font-mono text-teal-700 font-medium">#16, #48</span>).
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-teal-600 mb-3 shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                ></path>
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-slate-800 mb-1">
              Оптимальний та Альтернативний
            </h4>
            <p className="text-xs text-slate-500 leading-normal">
              Можливість розробити та презентувати пацієнту план «А» (рекомендований) та план «Б»
              (компромісний/бюджетний).
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-teal-600 mb-3 shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                ></path>
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-slate-800 mb-1">
              Поетапна оплата та Дія.Підпис
            </h4>
            <p className="text-xs text-slate-500 leading-normal">
              Розподіл фінансових траншів за клінічними етапами з можливістю затвердження через
              КЕП/ЕЦП або Дія.Шерінг.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
