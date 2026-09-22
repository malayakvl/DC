import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import React from 'react';
import { IconUserPlus } from '@tabler/icons-react';

export default function Patients() {
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
            <div className="d-icon icon-3">
              <IconUserPlus className="w-[40px] h-[40px]" color={'#944dd1'} />
            </div>
          </div>
          <div className="flex-none w-2/3 max-w-full px-3">
            <div>
              <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                {lng.get('dashboard.patients')}
              </p>
              <h5 className="mb-0 font-bold">
                1200
                <span className="leading-normal text-sm font-bold text-[#0ea5a4] ml-1">
                  +17 в місяць
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
