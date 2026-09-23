import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import Filters from './Partials/Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from './Partials/Pagination';
import {
  faPersonWalking,
  faEdit,
  faEuro,
  faList,
  faTooth,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, currency }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  console.log('List data', listData.data.length);
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
                    <th className="py-3 px-4">Пацієнт</th>
                    <th className="py-3 px-4">Контакти</th>
                    <th className="py-3 px-4">Фінанси (Баланс)</th>
                    <th className="py-3 px-4">Останній / Наступний візит</th>
                    <th className="py-3 px-4">Лікуючий лікар</th>
                    <th className="py-3 px-4 text-center min-w-[200px]">Швидкі дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 text-xs">
                  {listData.data?.map((item) => {
                    const debt = item.sum_acts - item.sum_payments;
                    const hasDebt = debt > 0;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition group ${hasDebt ? 'bg-rose-50/20' : ''}`}
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
                            <div>
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/patient/view/${item.id}`}
                                  className="text-sm font-bold text-slate-900 hover:text-teal-600 transition"
                                >
                                  {item.patient_name}
                                </Link>
                                <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                  #D-{item.id}
                                </span>
                                {item.discount && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                    -{item.discount}%
                                  </span>
                                )}
                              </div>
                              {/* Додаткові мітки (наприклад, вік/стать, якщо є в базі, або можна вивести інші дані) */}
                              <div className="flex items-center gap-2 text-slate-500 text-xs mt-0.5">
                                <span>{item.gender === 'female' ? 'Жін.' : 'Чол.'}</span>
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
                                  ⚠️ Борг: {debt} {currency}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                                  <span className="material-symbols-outlined text-[13px]">
                                    check_circle
                                  </span>
                                  Розраховано повністю
                                </span>
                              )}
                            </div>
                            <div className="text-slate-500 text-[11px] flex items-center gap-2">
                              <span>
                                Виконано:{' '}
                                <strong className="text-slate-800">
                                  {item.sum_acts} {currency}
                                </strong>
                              </span>
                              <span>•</span>
                              <span>
                                Сплачено:{' '}
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
                              {item.last_visit || 'Немає даних'}
                            </div>
                            <div className="text-teal-600 font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">
                                upcoming
                              </span>
                              Наст: {item.next_visit || 'Не призначено'}
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
                        <td className="py-3.5 px-4 align-middle text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Link href="/patient/visits" className="action-btn">
                              <FontAwesomeIcon icon={faPersonWalking} />
                            </Link>

                            <Link href="/patient/plans" className="action-btn">
                              <FontAwesomeIcon icon={faList} />
                            </Link>

                            <Link href={`/patient/view/${item.id}`} className="action-btn">
                              <FontAwesomeIcon icon={faTooth} />
                            </Link>

                            <Link href={`/patient/finances/${item.id}`} className="action-btn">
                              <FontAwesomeIcon icon={faEuro} />
                            </Link>

                            <Link href={`/patient/edit/${item.id}`} className="action-btn">
                              <FontAwesomeIcon icon={faEdit} />
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
