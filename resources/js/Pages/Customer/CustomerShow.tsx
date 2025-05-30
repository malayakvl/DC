import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../Lang/Customer/translation';
import lngRole from '../../Lang/Role/translation';

export default function Create({ formData, rolesData, imagePath }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  const msgRole = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  const renderRoleData = roles => {
    return (
      <>
        {roles.length > 0 && (
          <ul className="list-none">
            {roles.map((option: any) => (
              <li className="mb-2">
                <b>{option.filialName}</b>:&nbsp;&nbsp;
                {option.clinicId
                  ? option.roleName
                  : msgRole.get(`role.${option.roleName}`)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <AuthenticatedLayout
      header={<Head title={msg.get('customer.title.show')} />}
    >
      <Head title={msg.get('customer.title.show')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <header>
              <h2>
                <Link className="icon-back" href={'/customers'}>
                  &nbsp;
                </Link>
                {formData.name}
              </h2>
            </header>
            <div className="mt-0 ml-4 grid grid-flow-col auto-cols-max">
              <div className="columns-1">
                {imagePath && (
                  <img
                    src={`http://localhost:8000/storage/clinic/users/${formData.photo}`}
                    width={200}
                    className="float-left rounded"
                    height="auto"
                  />
                )}
              </div>
              <div className="ml-10">
                <ul className="list-none">
                  <li className="mb-2">
                    <b>{msg.get('customer.name')}</b>: {formData.name}
                  </li>
                  <li className="mb-2 py-1">
                    <b>{msg.get('customer.email')}</b>: {formData.email}
                  </li>
                  <li className="mb-2 py-1">
                    <b>{msg.get('customer.inn')}</b>: {formData.inn}
                  </li>
                  <li className="mb-2 py-1">
                    <b>{msg.get('customer.phone')}</b>: {formData.phone}
                  </li>
                </ul>
                <div className="mt-3">
                  <h5 className="underline">{msg.get('customer.role')}:</h5>
                  {renderRoleData(rolesData)}
                </div>
              </div>
            </div>
            <div className="block">
              <Link
                className="btn-back"
                title={msg.get('customer.edit')}
                href={`/customers`}
              >
                {msg.get('customer.back')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
