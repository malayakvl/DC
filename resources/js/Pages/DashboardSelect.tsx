import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../Lang/Dashboard/translation';
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
      <div key={clinic.clinic_id} className="mb-6 border border-gray-600 rounded p-4">
        <div className="workspace-page">
          <div className="workspace-header">
            <div>
              <span className="workspace-badge">👋 Вітаємо, Вікторе</span>

              <h1>Оберіть клініку для входу</h1>

              <p>
                Ви маєте доступ до декількох клінік та філій. Оберіть робочий простір, у якому
                хочете працювати.
              </p>
            </div>

            <div className="workspace-stats">
              <div className="workspace-stat">
                <strong>2</strong>
                <span>Клініки</span>
              </div>

              <div className="workspace-stat">
                <strong>1</strong>
                <span>Філій</span>
              </div>

              <div className="workspace-stat">
                <strong>2</strong>
                <span>Ролі</span>
              </div>
            </div>
          </div>
          <div></div>

          <div className="clinic-card">
            <div className="clinic-info">
              <div className="clinic-logo">{/*<IconTooth />*/}</div>

              <div>
                <h2>Sunshine Dental</h2>

                <span className="clinic-type">Головна клініка</span>

                <div className="clinic-summary">
                  <div>
                    <strong>2</strong>
                    <span>Філії</span>
                  </div>

                  <div>
                    <strong>18</strong>
                    <span>Лікарів</span>
                  </div>

                  <div>
                    <strong>1260</strong>
                    <span>Пацієнтів</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="clinic-branches">
              <div className="branch-row">
                <div>
                  <strong>Філія 1</strong>

                  <span>вул. Шевченка, 15</span>
                </div>

                <span className="role-pill">CEO</span>

                <button>Перейти →</button>
              </div>

              <div className="branch-row">
                <div>
                  <strong>Філія 2</strong>

                  <span>вул. Хрещатик, 22</span>
                </div>

                <span className="role-pill">Doctor</span>

                <button>Перейти →</button>
              </div>
            </div>
          </div>

          <div className="clinic-card">
            <div className="clinic-info">
              <div className="clinic-logo">{/*<IconTooth />*/}</div>

              <div>
                <h2>Sunshine Dental</h2>

                <span className="clinic-type">Головна клініка</span>

                <div className="clinic-summary">
                  <div>
                    <strong>2</strong>
                    <span>Філії</span>
                  </div>

                  <div>
                    <strong>18</strong>
                    <span>Лікарів</span>
                  </div>

                  <div>
                    <strong>1260</strong>
                    <span>Пацієнтів</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="clinic-branches">
              <div className="branch-row">
                <div>
                  <strong>Філія 1</strong>

                  <span>вул. Шевченка, 15</span>
                </div>

                <span className="role-pill">CEO</span>

                <button>Перейти →</button>
              </div>

              <div className="branch-row">
                <div>
                  <strong>Філія 2</strong>

                  <span>вул. Хрещатик, 22</span>
                </div>

                <span className="role-pill">Doctor</span>

                <button>Перейти →</button>
              </div>
            </div>
          </div>

          {/*<ClinicCard />*/}

          {/*<ClinicCard />*/}
        </div>
        {/* Название клиники */}
        <h3 className="text-xl text-yellow mb-3 font-bold">{clinic.clinic_name}</h3>

        {/* Таблица филиалов */}
        <table className="data-table w-full">
          <thead>
            <tr>
              <th className="text-left text-white py-2">{msg.get('dashboard.filial')}</th>
              <th className="text-right text-white py-2">{msg.get('dashboard.action')}</th>
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

            {clinic.filials.map((filial) => (
              <tr key={filial.id} className="border-t border-gray-700">
                <td className="text-white py-2">{filial.name}</td>

                <td className="text-right py-2">
                  <Link
                    className="btn-grad"
                    href={`/enter-filial?clinicId=${clinic.clinic_id}&filialId=${filial.id}`}
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
        <h2 className="text-2xl text-yellow mb-4">{msg.get('dashboard.title')}!!!</h2>

        {clinicsData.length === 0 && (
          <div className="text-gray-300">У вас нет доступных клиник или филиалов.</div>
        )}

        {clinicsData.map((clinic) => renderClinicBlock(clinic))}
      </div>
    </AuthenticatedLayout>
  );
}
