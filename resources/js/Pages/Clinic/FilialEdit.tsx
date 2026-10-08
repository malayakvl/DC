import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.js';
import { Head } from '@inertiajs/react';
import FilialForm from './Partials/FormFilial.js';
import React from 'react';

export default function Create({
  clinicData,
  filialData,
  storeData,
  employeesData,
}: {
  clinicData: any;
  filialData: any;
  storeData: any;
  employeesData: any;
}) {
  return (
    <AuthenticatedLayout header={<Head title="Filial" />}>
      <Head title={'Filial Edit'} />

      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <FilialForm
              clinicData={clinicData}
              filialData={filialData}
              storeData={storeData}
              employeesData={employeesData}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
