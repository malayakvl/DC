import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMoneyIn from '../../Lang/MoneyIn/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import ListHeader from '../../Components/Common/ListHeader';
import Filters from './Partials/Filters';
import Pagination from './Partials/Pagination';

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
            <ListHeader
              title={msg.get('money_in.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('money_in.title.total')}
              description={msg.get('money_in.title.description')}
              createHref="/money-in/create"
              createLabel={msg.get('money_in.title.create')}
            />
            <Filters />

            <Pagination listData={listData} />

            <section className="table-card mt-4">
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
