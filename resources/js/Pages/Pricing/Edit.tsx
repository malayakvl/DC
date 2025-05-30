import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Edit({
  clinicData,
  formData,
  formRowData,
  categoryData,
  unitData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Price" />}>
      <Head title="Price Edit" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              formRowData={formRowData}
              categoryData={categoryData}
              formData={formData}
              unitData={unitData}
              // className="max-w-3xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
