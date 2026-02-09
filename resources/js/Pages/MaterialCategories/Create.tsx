import React from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Create({
  categoryData,
  clinicData,
  producerData,
  formData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Material Category" />}>
      <Head title={'Material Category Create'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              producerData={producerData}
              categoryData={categoryData}
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
