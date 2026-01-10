import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Create({
  categoryData,
  clinicData,
  unitData,
  formData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Pricing Create" />}>
      <Head title="Pricing Create" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              categoryData={categoryData}
              clinicData={clinicData}
              formData={formData}
              unitData={unitData}
              // className="max-w-2xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
