import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Create({
  clinicData,
  statusData,
  typeData,
  customerData,
  paymentsMethodsData,
  formData,
  currencyData,
}) {
  return (
    <AuthenticatedLayout header={<Head title="Money In" />}>
      <Head title="Money In" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              statusData={statusData}
              typeData={typeData}
              customerData={customerData}
              paymentsMethodsData={paymentsMethodsData}
              formData={formData}
              currencyData={currencyData}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
