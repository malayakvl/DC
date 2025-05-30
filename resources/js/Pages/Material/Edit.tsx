import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import React from 'react';

export default function Edit({
  clinicData,
  categoryData,
  unitsData,
  formData,
}) {
  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Materials Edit'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              formData={formData}
              categoryData={categoryData}
              unitsData={unitsData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
