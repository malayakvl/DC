import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import React from 'react';

export default function Edit({ formData, customerData, contactData, statusesData }) {
  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              formData={formData}
              customerData={customerData}
              contactData={contactData}
              statusesData={statusesData}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
