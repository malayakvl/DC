import React from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Create({
  clinicData,
  statusData,
  typeData,
  customerData,
  producerData,
  storeData,
  formData,
  currencyData,
  unitsData,
  taxData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Invoice" />}>
      <Head title="Invoice" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              statusData={statusData}
              typeData={typeData}
              customerData={customerData}
              producerData={producerData}
              storeData={storeData}
              formData={formData}
              currencyData={currencyData}
              unitsData={unitsData}
              taxData={taxData}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
