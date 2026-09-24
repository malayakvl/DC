import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngOpeningBalance from '../../Lang/OpeningBalance/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import InputText from '@/Components/Form/InputText';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, filters }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngOpeningBalance,
    locale: appLang,
  });
  new Lang({
    messages: lngDropdown,
    locale: appLang,
  });

  const [values, setValues] = useState({
    date_from: filters?.date_from || '',
    date_to: filters?.date_to || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    router.get('/opening-balance', values, {
      preserveState: true,
      replace: true,
    });
  };
  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Opening Balance'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('opening_balance.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('opening_balance.title.total')}
              description={msg.get('opening_balance.title.description')}
              createHref="/opening-balance/create"
              createLabel={msg.get('opening_balance.title.create')}
            />
            <section>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                {/* Верхній рядок: Поле дат та випадаючі списки */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* Дата з */}
                  <div className="md:col-span-3">
                    <InputText
                      type="date"
                      name="date_from"
                      label={msg.get('opening_balance.date_from')}
                      values={values}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                    />
                  </div>

                  {/* Дата по */}
                  <div className="md:col-span-3">
                    <InputText
                      type="date"
                      name="date_to"
                      label={msg.get('opening_balance.date_to')}
                      values={values}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Нижній рядок: Таби швидкого фільтру + Лічильник і очищення праворуч */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  {/* Таби швидкого перемикання */}
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-teal-600 text-white font-bold shadow-sm">
                      <span>Всі накладні</span>
                      <span className="px-1.5 py-0.2 rounded-full transition-colors text-white font-bold">
                        {listData.length || 0}
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold">
                      <span>Проведені</span>
                      <span className="px-1.5 py-0.2 rounded-full transition-colors text-slate-600">
                        0
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold">
                      <span>Не проведені</span>
                      <span className="px-1.5 py-0.2 rounded-full transition-colors text-slate-600">
                        0
                      </span>
                    </button>
                  </div>

                  {/* Права частина: Знайдено + Очистити фільтри */}
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-500 font-medium">
                      Знайдено:{' '}
                      <strong className="text-slate-800 font-bold">
                        {listData.length || 0} накладних
                      </strong>
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-semibold transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                      <span>Очистити фільтри</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="table-card">
              <DataTable paginationType={PaginationType.OPENINGBALANCE} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.doc_number}</td>
                    <td className="">{format(new Date(item.doc_date), 'dd.MM.yyyy HH:mm')}</td>
                    <td className="">
                      <span
                        className={`doc-status ${
                          item.status === 'new' ? 'status-new' : 'status-posted'
                        }`}
                      >
                        <span className="status-dot"></span>
                        {item.status === 'new' ? 'Новий' : 'Проведений'}
                      </span>
                    </td>
                    <td className="">{item.storeName}</td>
                    <td className="">{item.customerName}</td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`opening-balance/edit/${item.id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`opening-balance/delete/${item.id}`}
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
