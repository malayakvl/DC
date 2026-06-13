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
      <div className="">
        <div>
          <div className="p-3.5 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex w-full mb-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {msg.get('opening_balance.title.list')}
                  </h2>
                  <div className="flex-1 text-right mt-[5px]">
                    <PrimaryButton>
                      <NavLink href={'/opening-balance/create'}>
                        {msg.get('opening_balance.title.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <section>
              <div className="flex flex-wrap gap-4 mb-6 p-4 transparent rounded-lg border border-[#D8DEE8] bg-white items-end">
                <InputText
                  type="date"
                  name="date_from"
                  label={msg.get('opening_balance.date_from')}
                  values={values}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
                <InputText
                  type="date"
                  name="date_to"
                  label={msg.get('opening_balance.date_to')}
                  values={values}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
                <div className="flex gap-2 mb-1">
                  <PrimaryButton onClick={handleFilter}>
                    {msg.get('opening_balance.filter')}
                  </PrimaryButton>
                  <button
                    onClick={() => {
                      const reset = { date_from: '', date_to: '', supplier_id: '' };
                      setValues(reset);
                      router.get('/opening-balance', reset);
                    }}
                    className="btn-submit !bg-none !bg-gray-200 !text-gray-700 hover:!bg-gray-300 transition-colors duration-200"
                  >
                    {msg.get('opening_balance.reset')}
                  </button>
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
