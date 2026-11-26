import React, { useState, useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router, useForm } from '@inertiajs/react';
import { setExistServicesAction, setPatientTab } from '../../../Redux/Patient';
import { patientServicesSelector, patientTabSelector } from '../../../Redux/Patient/selectors';
import QuickAct from '../FinanceTabs/QuickAct';
import ActPayment from '../FinanceTabs/ActPayment';
import {
  Plus as LucidePlus,
  Undo2,
  CalendarSync as LucideCalendarSync,
  Download,
} from 'lucide-react';

export default function Visits({
  typeTab,
  patientData,
  visitsData,
}: {
  typeTab: any | null;
  patientData: any;
  visitsData: any;
}) {
  const dispatch = useDispatch();
  const tab = useSelector(patientTabSelector);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });
  const subTab = useSelector(patientTabSelector);

  return (
    <>
      <section className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/*Card 1: Next Visit (Teal Left Border)*/}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 border-l-4 border-l-teal-600 flex items-start justify-between relative group hover:shadow-md transition-shadow">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Найближчий візит
              </span>
            </div>
            <div className="flex items-baseline space-x-2 pt-0.5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">28.11.2026</h2>
              <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
                10:30
              </span>
            </div>
            <div className="space-y-0.5 pt-1">
              <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-teal-600">
                  medical_services
                </span>
                <span>Контрольний огляд та зняття швів</span>
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-slate-400">person</span>
                <span>Д-р Громов С. В. • Кабінет №2</span>
              </p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">event_upcoming</span>
          </div>
        </div>
        {/*Card 2: Completed Visits (Emerald Left Border) */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 border-l-4 border-l-emerald-500 flex items-start justify-between relative group hover:shadow-md transition-shadow">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Завершено візитів
              </span>
            </div>
            <div className="flex items-baseline space-x-2 pt-0.5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">6 візитів</h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                100% закриті
              </span>
            </div>
            <div className="space-y-0.5 pt-1">
              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
                <span>100% оформлених протоколів та актів</span>
              </p>
              <p className="text-xs text-slate-400">Всі клінічні карти підписані ЕЦП</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">task_alt</span>
          </div>
        </div>
        {/*Card 3: Cancelled / Rescheduled (Amber Left Border)*/}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 border-l-4 border-l-amber-500 flex items-start justify-between relative group hover:shadow-md transition-shadow">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Скасовано / Неявки
              </span>
            </div>
            <div className="flex items-baseline space-x-2 pt-0.5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">1 візит</h2>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                Без штрафів
              </span>
            </div>
            <div className="space-y-0.5 pt-1">
              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-amber-500">schedule</span>
                <span>Перенесено пацієнтом (12.03.2026)</span>
              </p>
              <p className="text-xs text-slate-400">Попередження за 24 години до прийому</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">event_busy</span>
          </div>
        </div>
      </section>

      <section className="mt-3 bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/*Left: Add button & segmented status buttons*/}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs shadow-sm transition-all shrink-0"
            onClick="document.getElementById('booking-modal').classList.remove('hidden')"
          >
            <span className="material-symbols-outlined text-lg leading-none">add</span>
            <span>+ Записати на прийом</span>
          </button>
          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
          {/*Segmented View Filter*/}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg space-x-1 border border-slate-200/80">
            <button
              className="filter-tab px-3 py-1.5 rounded-md text-xs font-semibold bg-white text-slate-900 shadow-sm transition-all"
              id="filter-all"
              onClick={() => console.log(`filterVisits(all)`)}
            >
              Усі візити <span className="font-mono text-[11px] text-slate-500 ml-1">(8)</span>
            </button>
            <button
              className="filter-tab px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-all"
              id="filter-future"
              onClick={() => console.log(`filterVisits(upcoming)`)}
            >
              Майбутні{' '}
              <span className="font-mono text-[11px] text-teal-600 font-semibold ml-1">(1)</span>
            </button>
            <button
              className="filter-tab px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-all"
              id="filter-done"
              onClick="filterVisits('completed')"
            >
              Завершені <span className="font-mono text-[11px] text-slate-500 ml-1">(6)</span>
            </button>
            <button
              className="filter-tab px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-all"
              id="filter-cancelled"
              onClick="filterVisits('cancelled')"
            >
              Скасовані{' '}
              <span className="font-mono text-[11px] text-amber-600 font-semibold ml-1">(1)</span>
            </button>
          </div>
        </div>
        {/*Right: Period, Doctor filters & search*/}
        <div className="flex flex-wrap items-center gap-2">
          {/*Year Selector*/}
          <div className="relative inline-flex items-center">
            <span className="material-symbols-outlined text-base text-slate-400 absolute left-2.5 pointer-events-none">
              calendar_month
            </span>
            <select className="pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-xs font-medium cursor-pointer appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-teal-600">
              <option>2026 рік</option>
              <option>2025 рік</option>
              <option>Останні 3 місяці</option>
              <option>Весь період картки</option>
            </select>
            <span className="material-symbols-outlined text-sm text-slate-400 absolute right-2 pointer-events-none">
              expand_more
            </span>
          </div>
          {/*Doctor filter*/}
          <div className="relative inline-flex items-center">
            <span className="material-symbols-outlined text-base text-slate-400 absolute left-2.5 pointer-events-none">
              person
            </span>
            <select className="pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-xs font-medium cursor-pointer appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-teal-600">
              <option>Всі лікарі</option>
              <option>Д-р Громов С. В. (хірург)</option>
              <option>Д-р Коваленко А. І. (терапевт)</option>
              <option>Д-р Корогод В. Л. (ортопед)</option>
            </select>
            <span className="material-symbols-outlined text-sm text-slate-400 absolute right-2 pointer-events-none">
              expand_more
            </span>
          </div>
          {/*Search Field*/}
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined text-base text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              search
            </span>
            <input
              className="w-full pl-8 pr-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-lg text-xs transition-colors focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
              id="visitSearchInput"
              placeholder="Пошук за послугою чи лікарем..."
              type="text"
            />
          </div>
        </div>
      </section>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/*Sub-header bar for clinical view info*/}
        <div className="px-5 py-2.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Хронологія візитів пацієнта
            </span>
            <span className="bg-teal-50 border border-teal-200 text-teal-700 px-2 py-0.5 rounded text-[10px] font-mono font-medium">
              Синхронізовано з розкладом
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500 text-xs">
            <span>
              Всього у плані: <strong className="text-slate-800 font-semibold">12 візитів</strong>
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <span className="text-teal-700 font-semibold">Прогрес курсу: 67%</span>
          </div>
        </div>
        {/*Table Scroller*/}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="visits-table">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 w-48" scope="col">
                  Дата та час
                </th>
                <th className="py-3 px-4" scope="col">
                  Послуга / Призначення
                </th>
                <th className="py-3 px-4 w-60" scope="col">
                  Лікар та кабінет
                </th>
                <th className="py-3 px-4 w-64" scope="col">
                  Етап лікування
                </th>
                <th className="py-3 px-4 w-36" scope="col">
                  Статус
                </th>
                <th className="py-3 px-4 text-right w-44" scope="col">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 text-xs">
              {/*Row 1: Upcoming / Active*/}
              <tr
                className="visit-row hover:bg-slate-50/70 transition-colors group"
                data-status="upcoming"
                data-text="контрольний огляд та зняття швів громов хірургія імплантація протезування b04.01 4.6 4.7"
              >
                <td className="py-3.5 px-4 align-top">
                  <div className="flex items-start space-x-2.5">
                    <span className="material-symbols-outlined text-teal-600 text-base mt-0.5">
                      event
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm leading-tight">
                        28.11.2026
                      </div>
                      <div className="font-mono text-teal-700 font-semibold mt-0.5">
                        10:30{' '}
                        <span className="text-slate-500 font-normal text-[11px]">(60 хв)</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-900 leading-snug">
                    Контрольний огляд та зняття швів
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                      Код: B04.01
                    </span>
                    <span>Зони: 4.6, 4.7 • Контрольна прицільна рентгенографія</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-800">Д-р Громов С. В.</div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                    <span>Кабінет №2</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-teal-700 font-medium">Хірург-імплантолог</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    Етап 2: Імплантація та протезування 4.6, 4.7
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-1.5 animate-pulse"></span>
                    Заплановано
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                  <div className="inline-flex items-center space-x-1.5">
                    <button className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors">
                      Перенести
                    </button>
                    <button className="px-2.5 py-1 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold transition-colors">
                      Деталі
                    </button>
                  </div>
                </td>
              </tr>
              {/*Row 2: Completed (Implantation)*/}
              <tr
                className="visit-row hover:bg-slate-50/70 transition-colors group"
                data-status="completed"
                data-text="встановлення дентального імплантата straumann sla громов хірургія хірургічний етап surg-88 зуб 4.6"
              >
                <td className="py-3.5 px-4 align-top">
                  <div className="flex items-start space-x-2.5">
                    <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm leading-tight">
                        14.04.2026
                      </div>
                      <div className="font-mono text-slate-600 mt-0.5">
                        11:45{' '}
                        <span className="text-slate-400 font-normal text-[11px]">(90 хв)</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-900 leading-snug">
                    Встановлення дентального імплантата Straumann SLA
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                      Код: SURG-88
                    </span>
                    <span className="font-semibold text-slate-700">Зуб 4.6</span>
                    <span>• Локальна інфільтраційна анестезія (Убістезин)</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-800">Д-р Громов С. В.</div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                    <span>Кабінет №2</span>
                    <span className="text-slate-300">•</span>
                    <span>Хірургія</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    Хірургічний етап
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Завершено
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                  <div className="inline-flex items-center space-x-1.5">
                    <button className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors">
                      Відкрити картку
                    </button>
                    <button className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium transition-colors inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">receipt_long</span>
                      <span>Акт</span>
                    </button>
                  </div>
                </td>
              </tr>
              {/*Row 3: Hygiene AirFlow*/}
              <tr
                className="visit-row hover:bg-slate-50/70 transition-colors group"
                data-status="completed"
                data-text="комплексна професійна гігієна air-flow ультразвук коваленко терапія підготовчий гігієнічний етап hyg-02"
              >
                <td className="py-3.5 px-4 align-top">
                  <div className="flex items-start space-x-2.5">
                    <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm leading-tight">
                        02.04.2026
                      </div>
                      <div className="font-mono text-slate-600 mt-0.5">
                        15:00{' '}
                        <span className="text-slate-400 font-normal text-[11px]">(45 хв)</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-900 leading-snug">
                    Комплексна професійна гігієна (Air-Flow, ультразвук)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                      Код: HYG-02
                    </span>
                    <span>Зняття над`ясенних нашарувань, полірування пастою Proxyt</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-800">Д-р Коваленко А. І.</div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                    <span>Кабінет №1</span>
                    <span className="text-slate-300">•</span>
                    <span>Терапія</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    Підготовчий гігієнічний етап
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Завершено
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                  <button className="px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors">
                    Деталі
                  </button>
                </td>
              </tr>
              {/*Row 4: CT / Diagnostics*/}
              <tr
                className="visit-row hover:bg-slate-50/70 transition-colors group"
                data-status="completed"
                data-text="діагностичний прийом кт нижньої щелепи фотопротокол громов хірургія діагностика та план diag-10"
              >
                <td className="py-3.5 px-4 align-top">
                  <div className="flex items-start space-x-2.5">
                    <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm leading-tight">
                        28.03.2026
                      </div>
                      <div className="font-mono text-slate-600 mt-0.5">
                        12:00{' '}
                        <span className="text-slate-400 font-normal text-[11px]">(30 хв)</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-900 leading-snug">
                    Діагностичний прийом, КТ нижньої щелепи, фотопротокол
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                      Код: DIAG-10
                    </span>
                    <span>3D-томографія сегмента щелепи, цифровий фотопротокол</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-800">Д-р Громов С. В.</div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                    <span>Кабінет №2</span>
                    <span className="text-slate-300">•</span>
                    <span>Хірургія</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    Діагностика та план
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Завершено
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                  <button className="px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors">
                    Деталі
                  </button>
                </td>
              </tr>
              {/*Row 5: Caries 4.5*/}
              <tr
                className="visit-row hover:bg-slate-50/70 transition-colors group"
                data-status="completed"
                data-text="ендодонтичне лікування та реставрація estelite quick ther-14 зуб 4.5 коваленко терапія терапевтичний етап"
              >
                <td className="py-3.5 px-4 align-top">
                  <div className="flex items-start space-x-2.5">
                    <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm leading-tight">
                        20.03.2026
                      </div>
                      <div className="font-mono text-slate-600 mt-0.5">
                        16:30{' '}
                        <span className="text-slate-400 font-normal text-[11px]">(45 хв)</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-900 leading-snug">
                    Ендодонтичне лікування та реставрація Estelite Quick
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                      Код: THER-14
                    </span>
                    <span className="font-semibold text-slate-700">Зуб 4.5</span>
                    <span>• Фотополімерна композитна реставрація</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-semibold text-slate-800">Д-р Коваленко А. І.</div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                    <span>Кабінет №1</span>
                    <span className="text-slate-300">•</span>
                    <span>Терапія</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    Терапевтичний етап
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Завершено
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                  <button className="px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors">
                    Деталі
                  </button>
                </td>
              </tr>
              {/*Row 6: Cancelled / Rescheduled*/}
              <tr
                className="visit-row hover:bg-slate-50/70 transition-colors group bg-amber-50/20"
                data-status="cancelled"
                data-text="первинна консультація хірурга громов хірургія перенесено скасовано"
              >
                <td className="py-3.5 px-4 align-top">
                  <div className="flex items-start space-x-2.5">
                    <span className="material-symbols-outlined text-amber-500 text-base mt-0.5">
                      event_busy
                    </span>
                    <div>
                      <div className="font-bold text-slate-500 line-through text-sm leading-tight">
                        12.03.2026
                      </div>
                      <div className="font-mono text-slate-400 mt-0.5">
                        14:00{' '}
                        <span className="text-slate-400 font-normal text-[11px]">(60 хв)</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-medium text-slate-600 line-through leading-snug">
                    Первинна консультація хірурга
                  </div>
                  <div className="text-[11px] text-amber-700 mt-1 flex items-center space-x-1">
                    <span className="material-symbols-outlined text-xs">info</span>
                    <span>Перенесено пацієнтом (за 24 години до прийому)</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <div className="font-medium text-slate-600">Д-р Громов С. В.</div>
                  <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                    <span>Кабінет №3</span>
                    <span className="text-slate-300">•</span>
                    <span>Хірургія</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="text-slate-400 text-xs">—</span>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                    Перенесено пацієнтом
                  </span>
                </td>
                <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                  <button className="px-3 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-medium transition-colors inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">replay</span>
                    <span>Відновити</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*Empty State for searches/filters (hidden by default)*/}
        <div className="py-12 px-4 text-center hidden" id="no-visits-found">
          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">event_note</span>
          <p className="font-bold text-sm text-slate-800">Візитів за даним запитом не знайдено</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Перевірте введені ключові слова або виберіть інший статус у фільтрах зверху.
          </p>
        </div>
        {/*Table Bottom Controls & Record Count Strip*/}
        <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span>
              Показано{' '}
              <strong className="text-slate-900 font-semibold" id="visible-count">
                6
              </strong>{' '}
              із 8 візитів
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">2 завершених візити у 2025 році</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors shadow-xs">
              <span className="material-symbols-outlined text-base text-slate-500">
                picture_as_pdf
              </span>
              <span>Експорт розкладу (PDF)</span>
            </button>
            <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors shadow-xs">
              <span className="material-symbols-outlined text-base text-slate-500">history</span>
              <span>Історія переносів</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
