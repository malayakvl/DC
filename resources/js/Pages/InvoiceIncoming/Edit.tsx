import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Edit({
  clinicData,
  statusData,
  customerData,
  producerData,
  storeData,
  formData,
  formRowData,
  currencyData,
  unitsData,
  taxData,
}: {
  clinicData: any;
  statusData: any;
  customerData: any;
  producerData: any;
  storeData: any;
  formData: any;
  formRowData: any;
  currencyData: any;
  unitsData: any;
  taxData: any;
}) {
  return (
    <AuthenticatedLayout header={<Head title="Invoice" />}>
      <Head title="Invoice" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              statusData={statusData}
              customerData={customerData}
              producerData={producerData}
              storeData={storeData}
              formData={formData}
              formRowData={formRowData}
              currencyData={currencyData}
              taxData={taxData}
              unitsData={unitsData}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
