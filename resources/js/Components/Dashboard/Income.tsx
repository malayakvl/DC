import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import { usePage } from '@inertiajs/react';
import React from 'react';
import { IconCoin } from '@tabler/icons-react';
import lngDashboard from '@/Lang/Dashboard/translation';

export default function Income() {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });

  return (
    <div className="dashboard-block">
      <div className="flex-auto p-4">
        <div className="flex flex-row -mx-3">
          <div className="px-1">
            <div className="d-icon icon-1">
              <IconCoin className="w-[40px] h-[40px]" color={'#5099f8'} />
            </div>
          </div>
          <div className="flex-none w-2/3 max-w-full px-3">
            <div>
              <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                {lng.get('dashboard.total_income')}
              </p>
              <h5 className="mb-0 font-bold">+12.000 UAH</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
