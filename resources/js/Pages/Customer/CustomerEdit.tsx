import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form.js';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../Lang/Customer/translation';

export default function Create({ formData, clinicData, roleData, photoPath }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout
      header={<Head title={msg.get('customer.title.edit')} />}
    >
      <Head title={msg.get('customer.title.edit')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              roleData={roleData}
              formData={formData}
              photoPath={photoPath}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
