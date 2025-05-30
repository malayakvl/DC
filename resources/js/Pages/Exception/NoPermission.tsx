import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.js';
import { Head } from '@inertiajs/react';
import Lang from 'lang.js';
import lngDashboard from '@/Lang/Dashboard/translation.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { changeLangAction } from '@/Redux/Layout/index.ts';
import { appLangSelector } from '@/Redux/Layout/selectors.tsx';

export default function Dashboard() {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });

  const dispatch = useDispatch();

  return (
    <AuthenticatedLayout header={<Head title="Dashboard" />}>
      <div className="py-0">
        <h2>{msg.get('dashboard.title')}</h2>
        <div className="relative grid gap-[17px] sm:grid-cols-2 xl:grid-cols-[repeat(15,_minmax(0,_1fr))]"></div>
      </div>
    </AuthenticatedLayout>
  );
}
