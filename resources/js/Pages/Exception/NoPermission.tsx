import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngException from '../../Lang/Exception/translation';


export default function NoPermission({ error }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngException,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head title="No Permission" />}>
      <div className="py-0">
        <div className="p-4 sm:p-8 mb-8 content-data bg-content bg-no-permission">
          <div className="text-center py-12">
            <h2 className="text-4xl deny-access-button">
              Denied Access
            </h2>
            <p className="text-lg text-gray-700 text-[#830505] hidden">
              {msg.get('exception.no_permission.message') || 'You do not have permission to access this resource.'}
            </p>
            <div className="mt-8">
              <a 
                href="/dashboard" 
                className="back-system-button"
              >
                <span>
                  {msg.get('exception.no_permission.back_to_dashboard') || 'Back to Dashboard'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}