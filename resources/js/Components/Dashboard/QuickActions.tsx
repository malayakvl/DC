import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';
import { usePage } from '@inertiajs/react';
import React from 'react';
import { IconInvoice, IconCalendar, IconUserPlus, IconCurrency } from '@tabler/icons-react';
import NavLink from '@/Components/Links/NavLink';

export default function QuickActions() {
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });

  return (
    <div className="d-right-white">
      <h4>{lng.get('dashboard.quick_actions')}</h4>
      <div className="d-right-white-content">
        <div className="d-right-white-item">
          <IconUserPlus color="#338dfb" />
          <div className="ml-2">
            <NavLink href={'/patient/create'} className={'text-[14px] font-bold'}>
              {lng.get('dashboard.new_patient')}
            </NavLink>
          </div>
        </div>
        <div className="d-right-white-item">
          <IconCalendar color="#3bbe64" />
          <div className="ml-2">
            <NavLink href={'/scheduler'} className={'text-[14px] font-bold'}>
              {lng.get('dashboard.new_appointment')}
            </NavLink>
          </div>
        </div>
        <div className="d-right-white-item">
          <IconInvoice color="#9b5ddd" />
          <div className="ml-2">
            <NavLink href={'/scheduler'} className={'text-[14px] font-bold'}>
              {lng.get('dashboard.new_invoice')}
            </NavLink>
          </div>
        </div>
        <div className="d-right-white-item">
          <IconCurrency color="#f9a313" />
          <div className="ml-2">
            <NavLink href={'/scheduler'} className={'text-[14px] font-bold'}>
              {lng.get('dashboard.new_payment')}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
