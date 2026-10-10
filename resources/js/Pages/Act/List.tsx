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
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <Link
                        href={`act/edit/${item.id}`}
                        className="hover:text-teal-700 transition-colors"
                      >
                        {item.act_number}
                      </Link>
                    </td>

                    {/* Дата */}
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {format(new Date(item.act_date), 'dd.MM.yyyy HH:mm')}
                    </td>

                    {/* Статус */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.status === 'new'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            : 'bg-teal-50 text-teal-800 border border-teal-200/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'new' ? 'bg-amber-500' : 'bg-teal-600'
                          }`}
                        ></span>
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
                              <span className="inline-block ml-2">
                                <span className="paied-btn">{item.payment_amount}</span>
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </td>

                    {/* Сума оплати */}
                    {/*<td className="py-3.5 px-4 font-mono text-xs text-teal-700 font-semibold">*/}
                    {/*  <span className="paied-btn">{item.payment_amount}</span>*/}
                    {/*</td>*/}

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
