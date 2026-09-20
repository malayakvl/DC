import React from 'react';
import { Link } from '@inertiajs/react';

export default function ClinicBranchesSelect({ clinic, msg, lastLoginTime }) {
  // Функція для запису обраної філії в локальне сховище
  const handleSelectFilial = (filial) => {
    localStorage.setItem('filialName', filial.name);
    localStorage.setItem('filialId', filial.id);
    localStorage.setItem('clinicId', clinic.clinic_id);
    localStorage.setItem('clinicName', clinic.clinic_name);
  };

  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 lg:grid-cols-12 lg:divide-y-0 lg:divide-x overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
      {/* Ліва панель: Інформація про клініку та метрики */}
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
              <svg className="h-3.5 w-3.5 fill-current text-emerald-600" viewBox="0 0 20 20">
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
              ID мережі: #{clinic.clinic_id}
            </span>
            {clinic.license_number && (
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1">
                Ліцензія №{clinic.license_number}
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
            <svg className="mr-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          {lastLoginTime && <span className="text-slate-400">Останній вхід: {lastLoginTime}</span>}
        </div>
      </div>

      {/* Права панель: Динамічний список філій */}
      <div className="flex flex-col justify-between space-y-5 bg-white p-6 sm:p-8 lg:col-span-7">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Оберіть філію для входу
            </span>
            <span className="text-xs text-slate-400">Доступно: {clinic.filials?.length || 0}</span>
          </div>

          <div className="space-y-3.5" data-purpose="branches-list-interactive">
            {clinic.filials && clinic.filials.length > 0 ? (
              clinic.filials.map((filial) => (
                <div
                  key={filial.id}
                  className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-500/80 hover:bg-teal-50/10 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex items-start space-x-3.5">
                    {/* Іконка філії */}
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-600 transition-transform group-hover:scale-105">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700">
                          {filial.name}
                        </h3>
                        {/* Статус філії (активна / відкрита) */}
                        <span className="inline-flex items-center rounded-full border border-emerald-200/80 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                          <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                          Відкрито
                        </span>
                      </div>

                      {/* Адреса філії */}
                      {filial.address && (
                        <p className="flex items-center text-xs text-slate-500">
                          <svg
                            className="mr-1 h-3.5 w-3.5 shrink-0 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                          </svg>
                          {filial.address}
                        </p>
                      )}

                      {/* Роль користувача у цій філії */}
                      {filial.role_name && (
                        <div className="pt-1">
                          <span className="inline-flex items-center rounded-md border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700">
                            Роль: {filial.role_name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Кнопка входу */}
                  <div className="shrink-0 sm:self-center">
                    <Link
                      href={`/enter-filial?clinicId=${clinic.clinic_id}&filialId=${filial.id}`}
                      onClick={() => handleSelectFilial(filial)}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all active:scale-95 group-hover:shadow-teal-600/30 sm:w-auto"
                    >
                      <span className="whitespace-nowrap">
                        {msg ? msg.get('dashboard.enter') : 'Увійти'}
                      </span>
                      <svg
                        className="-mr-0.5 ml-1.5 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.2"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                Немає доступних філій для цієї клініки
              </div>
            )}
          </div>
        </div>

        {/* Футер списку */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs sm:flex-row">
          <Link
            href="/filials/create"
            className="inline-flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 px-3.5 py-2 font-medium text-slate-600 transition-colors hover:border-teal-400 hover:bg-slate-50 hover:text-teal-700 sm:w-auto"
          >
            <svg
              className="mr-1.5 h-4 w-4 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4v16m8-8H4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Підключити нову філію
          </Link>
          <span className="text-center text-slate-400 sm:text-right">
            Ліцензовані робочі місця активні
          </span>
        </div>
      </div>
    </div>
  );
}
