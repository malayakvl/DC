import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import React from 'react';
import { IconBuildings, IconUserCog, IconUsers, IconMapPin } from '@tabler/icons-react';

export default function Dashboard({ clinicsData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });
  const user = usePage().props.auth.user;

  const renderClinicBlock = (clinic) => {
    console.log(clinic.filials);
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
        <div className="workspace-page">
          <div className="workspace-header">
            <div>
              <span className="workspace-badge">👋 Вітаємо, {user.first_name}</span>

              <h1>Оберіть клініку для входу</h1>

              <p>
                Ви маєте доступ до декількох клінік та філій. Оберіть робочий простір, у якому
                хочете працювати.
              </p>
            </div>

            <div className="workspace-stats">
              <div className="workspace-stat">
                <div className="workspace-stat-icon">
                  <IconBuildings style={{ color: '#0ea5a4' }} />
                </div>
                <strong>{clinicsData.length}</strong>
                <span>Клініки</span>
              </div>

              <div className="workspace-stat">
                <div className="workspace-stat-icon">
                  <IconMapPin style={{ color: '#0ea5a4' }} />
                </div>
                <strong>2</strong>
                <span>Філій</span>
              </div>

              <div className="workspace-stat">
                <div className="workspace-stat-icon">
                  <IconUserCog style={{ color: '#0ea5a4' }} />
                </div>
                <strong>2</strong>
                <span>Ролі</span>
              </div>
            </div>
          </div>

          <div className="clinic-dahsboard-card">
            {clinicsData.map((clinic) => (
              <>
                <div className="clinic-info">
                  <div>
                    <h2>{clinic.clinic_name}</h2>

                    {/*<span className="clinic-type">Головна клініка</span>*/}

                    <div className="clinic-summary">
                      <div className="flex flex-row">
                        <div>
                          <IconUsers />
                        </div>
                        <strong className="d-number-el">2</strong>
                        <span className="d-number-el">Філії</span>
                      </div>

                      <div>
                        <div className="flex flex-row">
                          <div>
                            <IconUsers />
                          </div>
                          <strong className="d-number-el">18</strong>
                          <span className="d-number-el">Лікарів</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-row">
                          <IconUsers />
                          <strong className="d-number-el">1260</strong>
                          <span className="d-number-el">Пацієнтів</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clinic-branches">
                  {clinic.filials.map((filial) => (
                    <div className="branch-row">
                      <div>
                        <strong>{filial.name}</strong>

                        <span className="block">{filial.address}</span>
                      </div>

                      <span className="role-pill">{filial.role_name}</span>
                      <Link
                        className="enter-btn"
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
                    </div>
                  ))}
                </div>
              </>
            ))}
            {/*<div className="clinic-info">*/}
            {/*  <div>*/}
            {/*    <h2>Sunshine Dental</h2>*/}

            {/*    <span className="clinic-type">Головна клініка</span>*/}

            {/*    <div className="clinic-summary">*/}
            {/*      <div className="flex flex-row">*/}
            {/*        <div>*/}
            {/*          <IconUsers />*/}
            {/*        </div>*/}
            {/*        <strong className="d-number-el">2</strong>*/}
            {/*        <span className="d-number-el">Філії</span>*/}
            {/*      </div>*/}

            {/*      <div>*/}
            {/*        <div className="flex flex-row">*/}
            {/*          <div>*/}
            {/*            <IconUsers />*/}
            {/*          </div>*/}
            {/*          <strong className="d-number-el">18</strong>*/}
            {/*          <span className="d-number-el">Лікарів</span>*/}
            {/*        </div>*/}
            {/*      </div>*/}

            {/*      <div>*/}
            {/*        <div className="flex flex-row">*/}
            {/*          <IconUsers />*/}
            {/*          <strong className="d-number-el">1260</strong>*/}
            {/*          <span className="d-number-el">Пацієнтів</span>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<div className="clinic-branches">*/}
            {/*  <div className="branch-row">*/}
            {/*    <div>*/}
            {/*      <strong>Філія 1</strong>*/}

            {/*      <span className="block">вул. Шевченка, 15</span>*/}
            {/*    </div>*/}

            {/*    <span className="role-pill">CEO</span>*/}

            {/*    <button>Перейти →</button>*/}
            {/*  </div>*/}

            {/*  <div className="branch-row">*/}
            {/*    <div>*/}
            {/*      <strong>Філія 2</strong>*/}

            {/*      <span className="block">вул. Хрещатик, 22</span>*/}
            {/*    </div>*/}

            {/*    <span className="role-pill">Doctor</span>*/}

            {/*    <button>Перейти →</button>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>

          {/*<ClinicCard />*/}

          {/*<ClinicCard />*/}
        </div>
        <h2 className="text-xl font-semibold leading-tight">{msg.get('dashboard.select.title')}</h2>

        {clinicsData.length === 0 && (
          <div className="text-gray-300">У вас нет доступных клиник или филиалов.</div>
        )}

        {clinicsData.map((clinic) => renderClinicBlock(clinic))}
      </div>
    </AuthenticatedLayout>
  );
}
