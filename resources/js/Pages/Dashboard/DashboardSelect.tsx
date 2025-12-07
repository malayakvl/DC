import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import React from 'react';

export default function Dashboard({ clinicsData }) {
    const appLang = useSelector(appLangSelector);
    const msg = new Lang({
        messages: lngDashboard,
        locale: appLang,
    });

    const renderClinicBlock = clinic => {
        return (
            <div key={clinic.clinic_id} className="mb-6 border border-gray-600 bg-[#1b233a] rounded p-4">
                {/* Название клиники */}
                <h3 className="d-clinic-name">
                    {clinic.clinic_name}
                </h3>

                {/* Таблица филиалов */}
                <table className="data-table w-full">
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
                                <td colSpan="2" className="text-center text-gray-400 py-3">
                                    Нет назначенных филиалов
                                </td>
                            </tr>
                        )}

                        {clinic.filials.map(filial => (
                            <tr key={filial.id} className="border-t border-gray-700">
                                <td className="text-white py-2 w-[85%]">{filial.name}</td>
                                <td className="text-white py-2 w-[15%]">{filial.role_name}</td>
                                <td className="text-right py-2">
                                    <Link
                                        className="btn-f-select"
                                        href={`/enter-filial/${filial.id}`}
                                        onClick={() => {
                                            localStorage.setItem('filialName', filial.name);
                                            localStorage.setItem('filialId', filial.id);
                                            localStorage.setItem('clinicId', clinic.clinic_id);
                                            localStorage.setItem('clinicName', clinic.clinic_name);
                                        }}
                                    >
                                        {msg.get('dashboard.enter')}
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
            <div className="p-4 shadow-md">
                <h2 className="text-2xl text-white mb-4">{msg.get('dashboard.title')}</h2>

                {clinicsData.length === 0 && (
                    <div className="text-gray-300">
                        У вас нет доступных клиник или филиалов.
                    </div>
                )}

                {clinicsData.map(clinic => renderClinicBlock(clinic))}
            </div>
        </AuthenticatedLayout>
    );
}
