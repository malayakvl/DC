import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import React from 'react';

export default function Edit({
  clinicData,
  statusData,
  typeData,
  customerData,
  patientsData,
  formData,
  formRowData,
  currencyData,
  unitsData,
  taxData,
}) {
  console.log(unitsData)
  return (
    <AuthenticatedLayout header={<Head title="Act" />}>
      <Head title="Act" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              statusData={statusData}
              typeData={typeData}
              customerData={customerData}
              patientsData={patientsData}
              formData={formData}
              formRowData={formRowData}
              currencyData={currencyData}
              unitsData={unitsData}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
