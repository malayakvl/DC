import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../Lang/Act/translation';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import Pagination from './Partials/Pagination';
import Filters from './Partials/Filters';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData }: { listData: any }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngAct,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Act'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('act.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('act.title.total')}
              description={msg.get('act.title.description')}
              createHref="/act/create"
              createLabel={msg.get('act.title.create')}
              isCreateDisabled={false}
              onCreateClick={null}
            />

            <Filters />

            <Pagination listData={listData} />

            <section className="table-card mt-4">
              <DataTable paginationType={PaginationType.ACTS}>
                {listData.data?.map((item: any, index: any) => (
                  <tr
                    className={`hover:bg-slate-50/60 transition-colors group ${
                      index % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                    key={item.id}
                  >
                    {/* Номер акту */}
                    <td style={{ paddingLeft: '15px' }}>
                      <Link href={`act/edit/${item.id}`} className="block">
                        {item.act_number}
                      </Link>
                    </td>

                    {/* Дата */}
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {format(new Date(item.act_date), 'dd.MM.yyyy HH:mm')}
                    </td>

                    {/* Статус */}
                    <td className="">
                      <span
                        className={`doc-status ${
                          item.status === 'new' ? 'status-new' : 'status-posted'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#137870] group-hover/btn:scale-110 transition-transform"></span>
                        {item.status === 'new' ? 'Новий' : 'Проведений'}
                      </span>
                    </td>

                    {/* Пацієнт */}
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {item.patient_first_name} {item.patient_last_name}
                    </td>

                    {/* Лікар */}
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {item.doctor_first_name} {item.doctor_last_name}
                    </td>

                    {/* Сума загальна */}
                    <td className="py-3.5 px-4">
                      {(() => {
                        const parts = Number(item.total_amount || 0)
                          .toFixed(2)
                          .split('.');
                        const integerPart = Number(parts[0])
                          .toLocaleString('en-US')
                          .replace(/,/g, ' '); // разделение пробелами (например: 1 532)
                        const decimalPart = parts[1];

                        return (
                          <>
                            <div>
                              <span className="text-base font-extrabold text-slate-900 tracking-tight tabular-nums group-hover:text-teal-900 transition-colors">
                                {integerPart}
                                <span className="text-slate-400 font-semibold">.{decimalPart}</span>
                                {item.currency_name && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 tracking-wider">
                                    {item.currency_name}
                                  </span>
                                )}
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </td>

                    {/* Сума оплати */}
                    <td className="py-3.5 px-4 text-xs text-teal-700 font-semibold">
                      <div className="flex flex-col items-center gap-2">
                        {Number(item.total_amount || 0) - Number(item.payment_amount || 0) > 0 && (
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200/70 text-rose-700 shadow-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-wide">
                              {msg.get('act.credt')}:
                            </span>
                            <span className="text-base font-extrabold tabular-nums tracking-tight">
                              {(
                                Number(item.total_amount || 0) - Number(item.payment_amount || 0)
                              ).toFixed(2)}
                            </span>
                            <span className="text-xs font-bold text-rose-500">
                              {item.currency_name}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-600 font-medium">
                            <strong className="text-slate-800 font-bold tabular-nums">
                              {Number(item.payment_amount || 0).toFixed(2)}
                            </strong>{' '}
                            {item.currency_name || 'UAH'}
                          </span>
                          {Number(item.total_amount || 0) - Number(item.payment_amount || 0) >
                            0 && (
                            <button
                              className="group/btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-xs active:scale-[0.98]"
                              type="button"
                            >
                              <span className="">{msg.get('act.pay')}</span>
                              <svg
                                className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></path>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Дії */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          className="actn-btns"
                          title={msg.get('act.edit') || 'Редагувати'}
                          href={`act/edit/${item.id}`}
                        >
                          <span className="material-symbols-outlined text-[18px] block">edit</span>
                        </Link>
                        <Link
                          className="actn-btns hover:bg-rose-50 hover:text-rose-600"
                          title={msg.get('filial.filial.delete') || 'Видалити'}
                          href={`act/delete/${item.id}`}
                        >
                          <span className="material-symbols-outlined text-[18px] block">
                            delete
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
            <Pagination listData={listData} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
