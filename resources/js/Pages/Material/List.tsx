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
import { InventoryControlPanel } from './Partials/InventoryControlPanel';

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

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('material.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <section>
              <header className="mb-6 mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  {/* Лівий блок: Заголовок + Бейдж + Підзаголовок */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        {msg.get('material.title.list')}
                      </h1>

                      {/* Бейдж кількості прив'язаний чітко до заголовка */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                        {listData?.length || 0} {msg.get('material.title.total')}
                      </span>
                    </div>

                    {/* Підзаголовок винесено окремо під заголовок */}
                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {msg.get('material.title.description')}
                    </p>
                  </div>

                  {/* Правий блок: Кнопка дії */}
                  <PrimaryButton>
                    <NavLink href={'/material/create'}>+ {msg.get('material.create')}</NavLink>
                  </PrimaryButton>
                </div>
              </header>
            </section>
            <section className="table-card">
              <InventoryControlPanel
                categories={categoryData}
                clinicData={clinicData}
                supplierData={supplierData}
                msg={msg}
                totalItems={listData.length}
              />

              <DataTable paginationType={PaginationType.MATERIALS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td>
                      <div className="w-12 h-12 rounded-lg bg-[#f2f3ff] flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-xs">
                        <img
                          src={
                            item.image
                              ? `/storage/materials/${item.id}/${item.image}`
                              : '/images/no-photo.png'
                          }
                          width={65}
                          className="w-full h-full object-contain"
                          height="auto"
                          onError={(e) => {
                            e.currentTarget.src = '/images/no-photo.png';
                          }}
                        />
                      </div>
                    </td>
                    <td className="">{item.name}</td>
                    <td className="">
                      {item.price} {currency}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="font-metric-tabular text-metric-tabular font-bold">
                        {item.retail_price} {currency}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#dbfcf8] text-[#0000000] font-label-sm text-label-sm font-bold">
                        {item.percent ? <span className="percent-tbl">{item.percent}%</span> : ''}
                      </span>
                    </td>
                    <td>
                      <span className="material-categories">{item.categoryName}</span>
                    </td>
                    <td className="">{item.producerName}</td>
                    <td className="text-left">{item.unitName}</td>
                    <td className="text-left">{item.weight}</td>
                    <td className="text-right whitespace-nowrap">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`material/edit/${item.id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`material/delete/${item.id}`}
                      />
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
