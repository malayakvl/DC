import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Edit({
  clinicData,
  formData,
  producerData,
  categoryData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Store" />}>
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              producerData={producerData}
              categoryData={categoryData}
              formData={formData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
