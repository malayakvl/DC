import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ClinicForm from './Partials/Form.js';
import React from 'react';

export default function Create({ clinicData, currencyData }) {
  return (
    <AuthenticatedLayout header={<Head title="Clinic" />}>
      <Head title={'Clinic Create'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <ClinicForm
              clinicData={clinicData}
              currencyData={currencyData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
