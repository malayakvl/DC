import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import React from 'react';
export default function Dashboard({ clinicsData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });
  const user = usePage().props.auth.user;
  console.log(clinicsData);
  return (
    <AuthenticatedLayout header={<Head title="Dashboard Select" />}>
      <Head title={msg.get('dashboard.title')} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[50px]">
        <section
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10"
          data-purpose="page-hero-and-kpis"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/70 shadow-sm mb-4">
              <span className="text-sm">👋</span>
              <span>Вітаємо, {user.name}!</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Оберіть клініку та філію <br className="hidden sm:inline" />
              для початку роботи
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Ви маєте авторизований доступ до декількох медичних локацій. Оберіть потрібний робочий
              простір для керування записами, перегляду карток та фінансів.
            </p>
          </div>
          <div
            className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-subtle"
            data-purpose="kpi-summary-badges"
          >
            <div className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100/80 min-w-[130px]">
              <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 leading-none">
                  {clinicsData.length}
                </span>
                <span className="text-[11px] font-medium text-slate-500">Клініка</span>
              </div>
            </div>
            <div className="hidden flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100/80 min-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                  <path
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 leading-none">0</span>
                <span className="text-[11px] font-medium text-slate-500">Філії активні</span>
              </div>
            </div>
            <div className="hidden flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100/80 min-w-[130px]">
              <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-sky-700 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 leading-none">22</span>
                <span className="text-[11px] font-medium text-slate-500">Ваші ролі</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="p-4 shadow-md">
        <section className="bg-white rounded-3xl border border-teal-500/20 shadow-card hover:shadow-card-hover smooth-transition overflow-hidden">
          {clinicsData.map((clinic) => (
            <div
              key={clinic.clinic_id}
              className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100"
            >
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white via-white to-slate-50/70">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {clinic.clinic_name}
                      </h2>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">
                        Мережа центрів прогресивної стоматології
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <svg
                        className="w-3.5 h-3.5 fill-current text-emerald-600"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      МОЗ України
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center bg-slate-100 px-2.5 py-1 rounded-md text-[12px]">
                      ID мережі: {clinic.clinic_id}
                    </span>
                    <span className="inline-flex items-center bg-slate-100 px-2.5 py-1 rounded-md text-[12px]">
                      Ліцензія {clinic.edrpou || 'Немає'}
                    </span>
                  </div>
                  <div className="my-6 border-t border-slate-100"></div>
                  <div className="grid grid-cols-2 gap-3" data-purpose="clinic-metrics">
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <svg
                          className="w-4 h-4 text-teal-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        <span className="text-xs font-medium">Філії</span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        {clinic.filials.length}{' '}
                        <span className="text-xs font-normal text-slate-400">локації</span>
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <svg
                          className="w-4 h-4 text-teal-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        <span className="text-xs font-medium">Персонал</span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        18 <span className="text-xs font-normal text-slate-400">лікарів</span>
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <svg
                          className="w-4 h-4 text-teal-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        <span className="text-xs font-medium">Пацієнти</span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        1,260 <span className="text-xs font-normal text-slate-400">активних</span>
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <svg
                          className="w-4 h-4 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        <span className="text-xs font-medium">Сьогодні</span>
                      </div>
                      <span className="text-lg font-bold text-emerald-600">
                        34 <span className="text-xs font-normal text-slate-400">візити</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {msg.get('dashboard.select_filial')}
                    </span>
                    <span className="text-xs text-slate-400">
                      {msg.get('dashboard.available_filials')}
                    </span>
                  </div>
                </div>
                <div className="space-y-3.5">
                  {clinic.filials.map((filial) => (
                    <div
                      key={filial.id}
                      className="group relative rounded-2xl border border-slate-200 hover:border-teal-500/80 p-5 bg-white hover:bg-teal-50/20 smooth-transition shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start space-x-3.5">
                        <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 smooth-transition">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                            ></path>
                          </svg>
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 smooth-transition">
                              {filial.name}
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                              Відкрито • 6 крісел активні
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 flex items-center">
                            <svg
                              className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></path>
                            </svg>
                            {filial.address}
                          </p>
                          <div className="pt-1 flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                              Роль: {filial.role_name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:self-center shrink-0">
                        <Link
                          className="group cursor-pointer transition-all "
                          href={`/enter-filial?clinicId=${clinic.clinic_id}&filialId=${filial.id}`}
                          onClick={() => {
                            localStorage.setItem('filialName', filial.name);
                            localStorage.setItem('filialId', filial.id);
                            localStorage.setItem('clinicId', clinic.clinic_id);
                            localStorage.setItem('clinicName', clinic.clinic_name);
                          }}
                        >
                          <button
                            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-600 shadow-md shadow-teal-600/20 group-hover:shadow-teal-600/30 smooth-transition transform active:scale-95"
                            type="button"
                          >
                            <span>{msg.get('dashboard.enter_clinic')}</span>
                            <svg
                              className="w-4 h-4 ml-1.5 -mr-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                              ></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="workspace-page hidden">
          <div className="clinic-dahsboard-card">
            {clinicsData.map((clinic) => (
              <>
                <div className="grid grid-cols-1 divide-y divide-slate-100 lg:grid-cols-12 lg:divide-y-0 lg:divide-x overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
                  <div className="flex flex-col justify-between bg-gradient-to-br from-white via-white to-slate-50/70 p-6 sm:p-8 lg:col-span-5">
                    <div>
                      {/* Назва клініки та статус ліцензії */}
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            {clinic.clinic_name || 'Мережа клінік'}
                          </h2>
                          <p className="mt-0.5 text-xs font-medium text-slate-400">
                            Мережа центрів прогресивної стоматології
                          </p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <svg
                            className="h-3.5 w-3.5 fill-current text-emerald-600"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              fillRule="evenodd"
                            />
                          </svg>
                          МОЗ України
                        </span>
                      </div>

                      {/* Теги організації */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1">
                          ID мережі: #{clinic.id}
                        </span>
                        {clinic.edrpou && (
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1">
                            EDRPU №{clinic.edrpou}
                          </span>
                        )}
                      </div>

                      <div className="my-6 border-t border-slate-100"></div>

                      {/* Метрики клініки */}
                      <div className="grid grid-cols-2 gap-3" data-purpose="clinic-metrics">
                        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                          <div className="mb-1 flex items-center space-x-2 text-slate-400">
                            <svg
                              className="h-4 w-4 text-teal-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                            <span className="text-xs font-medium">Філії</span>
                          </div>
                          <span className="text-lg font-bold text-slate-800">
                            {clinic.filials?.length || 0}{' '}
                            <span className="text-xs font-normal text-slate-400">локацій</span>
                          </span>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                          <div className="mb-1 flex items-center space-x-2 text-slate-400">
                            <svg
                              className="h-4 w-4 text-teal-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                            <span className="text-xs font-medium">Персонал</span>
                          </div>
                          <span className="text-lg font-bold text-slate-800">
                            {clinic.doctors_count || '—'}{' '}
                            <span className="text-xs font-normal text-slate-400">лікарів</span>
                          </span>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                          <div className="mb-1 flex items-center space-x-2 text-slate-400">
                            <svg
                              className="h-4 w-4 text-teal-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                            <span className="text-xs font-medium">Пацієнти</span>
                          </div>
                          <span className="text-lg font-bold text-slate-800">
                            {clinic.patients_count || '—'}{' '}
                            <span className="text-xs font-normal text-slate-400">активних</span>
                          </span>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                          <div className="mb-1 flex items-center space-x-2 text-slate-400">
                            <svg
                              className="h-4 w-4 text-emerald-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                            <span className="text-xs font-medium">Сьогодні</span>
                          </div>
                          <span className="text-lg font-bold text-emerald-600">
                            {clinic.today_visits || '—'}{' '}
                            <span className="text-xs font-normal text-slate-400">візити</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Швидкі налаштування */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                      <Link
                        href="/clinic/settings"
                        className="inline-flex items-center font-semibold text-teal-600 transition-colors hover:text-teal-700 hover:underline"
                      >
                        <svg
                          className="mr-1 h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                        Налаштування мережі
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Оберіть філію для входу
                      </span>
                    </div>
                  </div>
                </div>
                <div className="clinic-branches hidden">
                  {clinic.filials.map((filial) => (
                    <div className="branch-row">
                      <div>
                        <strong>{filial.name}</strong>

                        <span className="block">{filial.address}</span>
                      </div>

                      <span className="role-pill">{filial.role_name}</span>
                      <Link
                        className="enter-btn"
                        href={`/enter-filial?clinicId=${clinic.clinic_id}&filialId=${filial.id}`}
                        onClick={() => {
                          localStorage.setItem('filialName', filial.name);
                          localStorage.setItem('filialId', filial.id);
                          localStorage.setItem('clinicId', clinic.clinic_id);
                          localStorage.setItem('clinicName', clinic.clinic_name);
                        }}
                      >
                        <span className={'no-wrap'}>{msg.get('dashboard.enter')}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>

        {clinicsData.length === 0 && (
          <div className="text-gray-300">У вас нет доступных клиник или филиалов.</div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
