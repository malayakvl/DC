import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FilialForm from './Partials/FormFilial.js';
import React from 'react';

export default function Create({
  clinicData,
  filialData,
  storeData,
  employeesData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Filial" />}>
      <Head title={'Filial Create'} />

      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <FilialForm
              clinicData={clinicData}
              filialData={filialData}
              storeData={storeData}
              employeesData={employeesData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
