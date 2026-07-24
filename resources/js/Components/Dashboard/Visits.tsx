import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import { usePage } from '@inertiajs/react';
import React from 'react';
import { IconCalendarCog } from '@tabler/icons-react';

export default function Visits({ type = 'relative' }) {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });

  return (
    <div className="dashboard-block">
      <div className="flex-auto p-4">
        <div className="flex flex-row -mx-3">
          <div className="px-1">
            <div className="d-icon icon-2">
              <IconCalendarCog className="w-[40px] h-[40px]" color={'#358307'} />
            </div>
          </div>
          <div className="flex-none w-2/3 max-w-full px-3">
            <div>
              <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                Прийомів сьогодні
              </p>
              <h5 className="mb-0 font-bold">12</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
