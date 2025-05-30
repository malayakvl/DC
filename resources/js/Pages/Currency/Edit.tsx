import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import React from 'react';

export default function Edit({
  clinicData,
  formData,
  filialData,
  customerData,
}) {
  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Currency'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              filialData={filialData}
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
