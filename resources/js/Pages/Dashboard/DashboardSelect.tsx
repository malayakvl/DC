import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import React from 'react';

export default function Dashboard({ clinicsData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });

  const renderClinicBlock = (clinic) => {
    return (
      <div key={clinic.clinic_id} className="mb-6 border border-[#0ea5a4] rounded p-4 bg-white">
        {/* Название клиники */}
        <h3 className="d-clinic-name">{clinic.clinic_name}</h3>

        {/* Таблица филиалов */}
        <table className="data-table select-table w-full">
          <thead>
            <tr>
              <th className="text-left text-white py-2">{msg.get('dashboard.clinic')}</th>
              <th className="text-left text-white py-2">{msg.get('dashboard.role')}</th>
              <th className="text-right text-white py-2">&nbsp;</th>
            </tr>
          </thead>

          <tbody>
            {clinic.filials.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center text-gray-400 py-3">
                  {msg.get('dashboard.no_filials')}
                </td>
              </tr>
            )}

            {clinic.filials.map((filial) => (
              <tr key={filial.id}>
                <td className="w-[75%]">{filial.name}</td>
                <td className="w-[15%]">
                  <span className="role-badge">{filial.role_name}</span>
                </td>
                <td className="text-right">
                  <Link
                    className="group cursor-pointer transition-all "
                    href={`/enter-filial?clinicId=${clinic.clinic_id}&filialId=${filial.id}`}
                    onClick={() => {
                      localStorage.setItem('filialName', filial.name);
                      localStorage.setItem('filialId', filial.id);
                      localStorage.setItem('clinicId', clinic.clinic_id);
                      localStorage.setItem('clinicName', clinic.clinic_name);
                    }}
                  >
                    <span className={'no-wrap'}>{msg.get('dashboard.enter')}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <AuthenticatedLayout header={<Head title="Dashboard Select" />}>
      <Head title={msg.get('dashboard.title')} />
      <div className="p-4 shadow-md">
        <h2 className="text-xl font-semibold leading-tight">{msg.get('dashboard.select.title')}</h2>

        {clinicsData.length === 0 && (
          <div className="text-gray-300">У вас нет доступных клиник или филиалов.</div>
        )}

        {clinicsData.map((clinic) => renderClinicBlock(clinic))}
      </div>
    </AuthenticatedLayout>
  );
}
