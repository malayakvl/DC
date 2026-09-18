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
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Producers'} />
      <div className="p-4 sm:p-4 mb-8 content-data bg-content">
        <h2>{msg.get('dashboard.pageNotFound')}</h2>
        <img src="/images/bg/404.webp" className="pageNotFound" />
      </div>
    </AuthenticatedLayout>
  );
}
