import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import React from 'react';
import { Calendar, FileUser, UserRoundGroupIcon, BuildingComplex, LucideMapPinXInside } from 'lucide-react';
export default function Dashboard({ clinicsData }: { clinicsData: any }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });
  const { auth } = usePage().props as unknown as {
    auth: {
      user: any;
      can: any;
      role: string[] | any[];
    };
  };

  return (
    <AuthenticatedLayout header={<Head title="Dashboard Select" />}>
      <Head title={msg.get('dashboard.title')} />
      <div className="mx-auto px-2 sm:px-4 mt-[30px]">
        <section
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10"
          data-purpose="page-hero-and-kpis"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/70 shadow-sm mb-4">
              <span className="text-sm">👋</span>
              <span>
                {msg.get('dashboard.welcome')} {auth.user.name}!
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {msg.get('dashboard.page_title')} <br className="hidden sm:inline" />
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {msg.get('dashboard.page_subtitle')}
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
                <span className="text-[11px] font-medium text-slate-500">
                  {msg.get('dashboard.clinic')}
                </span>
              </div>
            </div>
            <div className="hidden flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100/80 min-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                <LucideMapPinXInside />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="p-4 shadow-md">
        <section className="bg-white rounded-3xl border border-teal-500/20 shadow-card hover:shadow-card-hover smooth-transition overflow-hidden">
          {clinicsData.map((clinic: any) => (
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
                        {msg.get('dashboard.descr_clinic')}
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
                      {msg.get('dashboard.title_moz')}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center bg-slate-100 px-2.5 py-1 rounded-md text-[12px]">
                      ID {msg.get('dashboard.line_id')}: {clinic.clinic_id}
                    </span>
                    <span className="inline-flex items-center bg-slate-100 px-2.5 py-1 rounded-md text-[12px]">
                      {msg.get('dashboard.license')} {clinic.clinic_license || 'Немає'}
                    </span>
                  </div>
                  <div className="my-6 border-t border-slate-100"></div>
                  <div className="grid grid-cols-2 gap-3" data-purpose="clinic-metrics">
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <BuildingComplex className="w-4 h-4" color={'#f87a14'} />
                        <span className="text-xs font-medium">{msg.get('dashboard.filials')}</span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        {clinic.filials.length}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          {msg.get('dashboard.location')}
                        </span>
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <UserRoundGroupIcon className="w-4 h-4" color={'#f87a14'} />
                        <span className="text-xs font-medium">
                          {msg.get('dashboard.customers')}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        {clinic.totalCustomers}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          {msg.get('dashboard.staff')}
                        </span>
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <FileUser className="w-4 h-4" color={'#f87a14'} />
                        <span className="text-xs font-medium">{msg.get('dashboard.patient')}</span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">
                        {clinic.totalPatients}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          {msg.get('dashboard.active')}
                        </span>
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-2 text-slate-400 mb-1">
                        <Calendar className="w-4 h-4" color={'#f87a14'} />
                        <span className="text-xs font-medium">{msg.get('dashboard.today')}</span>
                      </div>
                      <span className="text-lg font-bold text-emerald-600">
                        {clinic.totalVisits || 0}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          {msg.get('dashboard.visit')}
                        </span>
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
                  {clinic.filials.map((filial: any) => (
                    <div
                      key={filial.id}
                      className="group relative rounded-2xl border border-slate-200 hover:border-teal-500/80 p-5 bg-white hover:bg-teal-50/20 smooth-transition shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start space-x-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#f0fdfa] text-teal-600 border border-[#99f6e4] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 smooth-transition">
                          <BuildingComplex color={'#0d968a'} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 smooth-transition">
                              {filial.name}
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                              {msg.get('dashboard.title_tip_filial')}&nbsp;
                              {filial.start_at} - {filial.end_at}{' '}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 flex items-center">
                            <LucideMapPinXInside className="w-4 h-4" />
                            &nbsp;{filial.address}
                          </p>
                          <div className="pt-1 flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-[#f87a14] border border-[#f87a14]">
                              {msg.get('dashboard.role')}: {filial.role_name}
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
        {clinicsData.length === 0 && (
          <div className="text-gray-300">{msg.get('dashboard.no_filials')}</div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
