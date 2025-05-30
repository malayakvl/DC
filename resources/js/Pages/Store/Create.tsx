import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Create({
  clinicData,
  formData,
  customerData,
  filialData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Store" />}>
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              filialData={filialData}
              customerData={customerData}
              clinicData={clinicData}
              formData={formData}
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
