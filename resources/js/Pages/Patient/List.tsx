import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import Filters from './Partials/Filters';
import Pagination from './Partials/Pagination';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, currency }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('patient.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('patient.title.list')}
              count={listData.data.length || 0}
              totalLabel={msg.get('patient.title.total')}
              description={msg.get('patient.title.description')}
              createHref="patient/create"
              createLabel={msg.get('patient.title.create')}
            />

            <Filters />

            <Pagination listData={listData} />

            <div className="table-responsive">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">{msg.get('patient.patient')}</th>
                    <th className="py-3 px-4">{msg.get('patient.contacts')}</th>
                    <th className="py-3 px-4">{msg.get('patient.finance.balance')}</th>
                    <th className="py-3 px-4">{msg.get('patient.visit.lastNext')}</th>
                    <th className="py-3 px-4">{msg.get('patient.doctor')}</th>
                    <th className="py-3 px-4 text-center min-w-[200px]">
                      {msg.get('patient.action')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 text-sm">
                  {listData.data?.map((item) => {
                    const debt = item.sum_acts - item.sum_payments;
                    const hasDebt = debt > 0;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition group ${hasDebt ? 'bg-rose-300/20' : ''}`}
                      >
                        {/* Пацієнт */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-center gap-3">
                            {item.avatar ? (
                              <img
                                className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                                src={`/uploads/patients/${item.avatar}`}
                                alt=""
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold text-sm flex items-center justify-center flex-shrink-0">
                                {item.patient_name
                                  ?.split(' ')
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join('')}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              {/* Первая строка: ФИО и бейджи (ID, Скидка) */}
                              <div className="flex items-center flex-wrap gap-2">
                                <Link
                                  href={`/patient/view/${item.id}`}
                                  className="text-sm font-bold text-slate-900 hover:text-teal-600 transition truncate h-[24px]"
                                >
                                  {item.patient_name}
                                </Link>
                                <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                  #D-{item.id}
                                </span>
                                {item.discount > 0 && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                    -{item.discount}%
                                  </span>
                                )}
                              </div>

                              {/* Нижняя строка: Пол, номер карты или другие данные */}
                              <div className="flex items-center gap-3 text-slate-505 text-xs mt-0.5">
                                {item.medical_card_no && (
                                  <>
                                    <span className="material-symbols-outlined text-[16px] text-slate-400 block">
                                      badge
                                    </span>

                                    <span className="text-slate-500">
                                      {msg.get('patient.card')}: {item.medical_card_no}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Контакти */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="space-y-1">
                            <a
                              href={`tel:${item.primary_phone}`}
                              className="font-semibold text-slate-800 hover:text-teal-600 flex items-center gap-1.5"
                            >
                              <span className="material-symbols-outlined text-[15px] text-slate-400">
                                call
                              </span>
                              {item.primary_phone}
                            </a>
                            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                Viber
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Фінанси (Баланс) */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              {hasDebt ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold">
                                  <span className="material-symbols-outlined text-[13px]">
                                    warning
                                  </span>
                                  ⚠️ {msg.get('patient.dept.at')}: {debt} {currency}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                                  <span className="material-symbols-outlined text-[13px]">
                                    check_circle
                                  </span>
                                  {msg.get('patient.payed.all')}
                                </span>
                              )}
                            </div>
                            <div className="text-slate-500 text-[11px] flex items-center gap-2">
                              <span>
                                {msg.get('patient.worked.at')}:{' '}
                                <strong className="text-slate-800">
                                  {item.sum_acts} {currency}
                                </strong>
                              </span>
                              <span>•</span>
                              <span>
                                {msg.get('patient.payed.at')}:{' '}
                                <strong className="text-emerald-700 font-semibold">
                                  {item.sum_payments} {currency}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Останній / Наступний візит (тут вивів статичні/динамічні поля за аналогією з твоїм макетом) */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="space-y-0.5">
                            <div className="text-slate-700 font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-slate-400">
                                event_available
                              </span>
                              {item.visits_count || 'Немає даних'}
                            </div>
                            <div className="text-teal-600 font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                upcoming
                              </span>
                              {msg.get('patient.next')}: {item.last_visit || 'Не призначено'}
                            </div>
                          </div>
                        </td>

                        {/* Лікуючий лікар */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="font-medium text-slate-800">
                            {item.doctor_name || 'Не вказано'}
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            {item.doctor_specialty || ''}
                          </div>
                        </td>

                        {/* Швидкі дії */}
                        <td className="py-3.5 px-4 align-middle text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Візити */}
                            <Link
                              href={`/patient/visits/${item.id}`}
                              className="actn-btns"
                              title="Візити"
                            >
                              <span className="material-symbols-outlined text-[18px] block">
                                schedule
                              </span>
                            </Link>

                            {/* Плани лікування */}
                            <Link
                              href={`/patient/plans/${item.id}`}
                              className="actn-btns"
                              title="Плани лікування"
                            >
                              <span className="material-symbols-outlined text-[18px] block">
                                assignment
                              </span>
                            </Link>

                            {/* Зубна карта / Перегляд */}
                            <Link
                              href={`/patient/view/${item.id}`}
                              className="actn-btns"
                              title="Зубна карта"
                            >
                              <span className="material-symbols-outlined text-[18px] block">
                                medical_services
                              </span>
                            </Link>

                            {/* Фінанси */}
                            <Link
                              href={`/patient/finances/${item.id}`}
                              className="actn-btns"
                              title="Фінанси"
                            >
                              <span className="material-symbols-outlined text-[18px] block">
                                payments
                              </span>
                            </Link>

                            {/* Редагування */}
                            <Link
                              href={`/patient/edit/${item.id}`}
                              className="actn-btns"
                              title="Редагувати"
                            >
                              <span className="material-symbols-outlined text-[18px] block">
                                edit
                              </span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <Pagination listData={listData} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
