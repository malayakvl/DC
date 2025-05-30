import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import React from 'react';

export default function Create({ clinicData, filialData, formData }) {
  return (
    <AuthenticatedLayout header={<Head title="Cabinets" />}>
      <Head title="Cabinets" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              filialData={filialData}
              formData={formData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
