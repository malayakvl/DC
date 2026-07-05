import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngHeader from '../../Lang/Header/translation';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { IconCalendar } from '@tabler/icons-react';

export default function Records() {
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
            <div className="d-icon icon-4">
              <IconCalendar className="w-[40px] h-[40px]" color={'#fdb723'} />
            </div>
          </div>
          <div className="flex-none w-2/3 max-w-full px-3">
            <div>
              <p className="mb-0 font-sans font-semibold leading-normal text-sm">Записів завтра</p>
              <h5 className="mb-0 font-bold">10</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
