import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';
import { setPercentAction } from '../../Redux/Material';
import { useAppDispatch } from '../../hooks';
import React from 'react';
export default function Create({
  clinicData,
  categoryData,
  formData,
  unitsData,
}) {
  const dispatch = useAppDispatch();

  dispatch(setPercentAction(0));

  return (
    <AuthenticatedLayout header={<Head title="Materials" />}>
      <Head title={'Materials Create'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Form
              clinicData={clinicData}
              formData={formData}
              categoryData={categoryData}
              unitsData={unitsData}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
