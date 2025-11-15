import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../Lang/Dashboard/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '../Redux/Layout/selectors';
import { emptyUserAutocompleteAction } from '../Redux/Clinic';
import React from 'react';

export default function Dashboard({ filialData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });
  const dispatch = useDispatch();

  const renderFilialData = data => {
    return (
      <>
        <Head title={msg.get('dashboard.title')} />
        {data.map(_res => (
          <tr key={`${_res.clinicName}_${_res.filialName}`}>
            <td>{_res.clinicName}</td>
            <td>{_res.filialName}</td>
            <td>{_res.roleName}</td>
            <td className="text-right" width="200">
              <Link
                className="btn-grad"
                onClick={() => {
                  localStorage.setItem('filialName', _res.filialName);
                  localStorage.setItem('filialId', _res.id);
                }}
                title={msg.get('customer.back')}
                href={`/enter-filial/${_res.filialId}`}
              >
                {msg.get('dashboard.enter')}
              </Link>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <AuthenticatedLayout header={<Head title="Dashboard Select" />}>
      <div className="p-4 bg-white shadow-md mt-[0px]">
        <h2>{msg.get('dashboard.title')}</h2>
        <div className="w-full">
          <div className="bg-white rounded">
            <table className="data-table p-2">
              <tbody>{renderFilialData(filialData)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
