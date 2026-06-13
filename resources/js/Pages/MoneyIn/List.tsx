import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMoneyIn from '../../Lang/MoneyIn/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import InputText from '../../Components/Form/InputText';
import InputSelect from '../../Components/Form/InputSelect';

export default function List({ listData, filters, paymentsMethods }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMoneyIn,
    locale: appLang,
  });
  new Lang({
    messages: lngDropdown,
    locale: appLang,
  });
  const [values, setValues] = useState({
    date_from: filters?.date_from || '',
    date_to: filters?.date_to || '',
    account_id: filters?.account_id || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    router.get('/money-in', values, {
      preserveState: true,
      replace: true,
    });
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Money In'} />
      <div className="">
        <div>
          <div className="p-3.5 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex w-full mb-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {msg.get('money_in.title.list')}
                  </h2>
                  <div className="flex-1 text-right mt-[5px]">
                    <PrimaryButton>
                      <NavLink href={'/money-in/create'}>
                        {msg.get('money_in.title.create')}
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
                  label={msg.get('money_in.date_from')}
                  values={values}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
                <InputText
                  type="date"
                  name="date_to"
                  label={msg.get('money_in.date_to')}
                  values={values}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
                <InputSelect
                  name="account_id"
                  label={msg.get('money_in.account_id')}
                  values={values}
                  onChange={handleChange}
                  options={paymentsMethods}
                  className="mt-1 block w-full min-w-[200px]"
                />
                <div className="flex mb-1">
                  <PrimaryButton onClick={handleFilter}>{msg.get('money_in.filter')}</PrimaryButton>
                  <button
                    onClick={() => {
                      const reset = { date_from: '', date_to: '', account_id: '' };
                      setValues(reset);
                      router.get('/money-in', reset);
                    }}
                    className="btn-submit !bg-none !bg-gray-200 !text-gray-700 hover:!bg-gray-300 transition-colors duration-200"
                  >
                    {msg.get('money_in.reset')}
                  </button>
                </div>
              </div>
            </section>
            <section className="table-card">
              <DataTable paginationType={PaginationType.MONEYIN} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.document_number}</td>
                    <td className="">{format(new Date(item.document_date), 'dd.MM.yyyy HH:mm')}</td>
                    <td className="">
                      <span
                        className={`doc-status ${
                          item.status === 'draft' ? 'status-new' : 'status-posted'
                        }`}
                      >
                        <span className="status-dot"></span>
                        {msg.get(`money_in.${item.status}`)}
                      </span>
                    </td>
                    <td className="">{item.payment_method_name}</td>
                    <td className="">
                      {item.amount} {item.currency_name}
                    </td>

                    <td className="">{item.created_by}</td>
                    <td className="text-right">
                      <Link
                        className="btn-edit"
                        title={msg.get('money_in.money_in.edit')}
                        href={`money-in/edit/${item.id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('money_in.money_in.delete')}
                        href={`money-in/delete/${item.id}`}
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
