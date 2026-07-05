import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import Income from '../../Components/Dashboard/Income';
import Visits from '../../Components/Dashboard/Visits';
import Patients from '../../Components/Dashboard/Patients';
import Records from '../../Components/Dashboard/Records';
import QuickActions from '@/Components/Dashboard/QuickActions';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import React from 'react';
import ScheduleCard from '../../Components/Dashboard/ScheduleCard';
import WeeklyOverview from '@/Components/Dashboard/WeeklyOverview';

export default function Dashboard() {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('dashboard.title')} />
      <div className="py-0">
        <div className="p-4 sm:p-4 mb-8 content-data bg-content">
          <h2>{msg.get('dashboard.title')}&nbsp;</h2>
          <div className="flex flex-row">
            <div className="left-d-block">
              <div className="grid grid-cols-4 gap-4">
                <Income />
                <Visits />
                <Patients />
                <Records />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-[40px]">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <ScheduleCard />
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <WeeklyOverview />
                </div>
              </div>
            </div>
            <div className="right-d-block">
              <QuickActions />
              <div className={'mt-10'}>
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
