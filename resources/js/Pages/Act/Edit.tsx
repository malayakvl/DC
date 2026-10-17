import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { setActItems } from '@/Redux/Act';

export default function Edit({
  clinicData,
  statusData,
  customerData,
  patientsData,
  formData,
  formRowData,
  visitsData,
}: {
  clinicData: any;
  statusData: any;
  customerData: any;
  patientsData: any;
  formData: any;
  formRowData: any;
  visitsData: any;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formData?.id && formRowData?.length > 0) {
      // Очищаємо редьюсер перед завантаженням (щоб не наклалися дані з попереднього акта)
      // dispatch(clearActItemsAction());

      formRowData.forEach((row: any) => {
        dispatch(
          setActItems({
            id: row.service_id,
            service_id: row.service_id,
            name: row.product,
            price: Number(row.price || 0),
            qty: Number(row.qty ?? row.quantity ?? 1),
            quantity: Number(row.qty ?? row.quantity ?? 1),
            components: row.components || [],
          })
        );
      });
    }
  }, [formData?.id, formRowData]);

  return (
    <AuthenticatedLayout header={<Head title="Act" />}>
      <Head title="Act" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <Form
              visitsData={visitsData}
              clinicData={clinicData}
              statusData={statusData}
              customerData={customerData}
              patientsData={patientsData}
              formData={formData}
              formRowData={formRowData}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
