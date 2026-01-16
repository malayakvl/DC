import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../Lang/Customer/translation';
import React from 'react';

export default function Create({ formData, clinicData, roleData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout
      header={<Head title={msg.get('customer.title.create')} />}
    >
      <Head title={msg.get('customer.title.create')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              formData={formData}
              roleData={roleData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
