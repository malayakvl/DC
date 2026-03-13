import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPaymentMethod from '../../Lang/PaymentMethod/translation';

export default function Edit({ clinicData, formData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPaymentMethod,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head title={msg.get('payment_method.edit')} />}>
      <Head title={msg.get('payment_method.edit')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              formData={formData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
