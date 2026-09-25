import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../Lang/Material/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { Filters } from './Partials/Filters';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, clinicData, categoryData, supplierData, currency }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);
console.log(listData);
  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('material.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('material.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('material.title.total')}
              description={msg.get('material.title.description')}
              createHref="material/create"
              createLabel={msg.get('material.title.create')}
            />
            <section className="table-card">
              <Filters
                categories={categoryData}
                clinicData={clinicData}
                supplierData={supplierData}
                msg={msg}
                totalItems={listData.length}
              />

              <DataTable paginationType={PaginationType.MATERIALS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="hover:bg-slate-50/80 transition group" key={item.id}>
                    {/* Фото и название */}
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-xs">
                          <img
                            src={
                              item.image
                                ? `/storage/materials/${item.id}/${item.image}`
                                : '/images/no-photo.png'
                            }
                            className="w-full h-full object-contain"
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.src = '/images/no-photo.png';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition">
                            {item.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                            {item.producerName && <span>{item.producerName}</span>}
                            {item.producerName && item.categoryName && (
                              <span className="text-slate-300">•</span>
                            )}
                            {item.categoryName && (
                              <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                {item.categoryName}
                              </span>
                            )}
                            {item.unitName && (
                              <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-pink-200 text-slate-900 border border-pink-200">
                                {item.unitName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Ціна закупівлі */}
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="text-xs text-slate-600">
                        {item.price} {currency}
                      </div>
                    </td>

                    {/* Роздрібна ціна та відсоток */}
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-bold text-slate-900">
                          {item.retail_price} {currency}
                        </span>
                        {item.percent ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="material-symbols-outlined text-[13px]">
                              trending_up
                            </span>
                            +{item.percent}%
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <div className="text-xs text-slate-600 font-medium">
                        {item.weight
                          ? `${parseFloat(item.weight)} ${item.weightUnitName || ''}`
                          : ''}
                      </div>
                    </td>

                    {/* Дії (Редагувати / Видалити) */}
                    <td className="py-3.5 px-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          className="actn-btns"
                          title={msg.get('filial.filial.edit') || 'Редагувати'}
                          href={`material/edit/${item.id}`}
                        >
                          <span className="material-symbols-outlined text-[18px] block">edit</span>
                        </Link>
                        <Link
                          className="actn-btns hover:bg-rose-50 hover:text-rose-600"
                          title={msg.get('filial.filial.delete') || 'Видалити'}
                          href={`material/delete/${item.id}`}
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
