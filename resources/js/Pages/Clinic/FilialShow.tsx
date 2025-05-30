import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFilial from '../../Lang/Filial/translation';
import React from 'react';

export default function Create({ filialData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngFilial,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head title="Filial" />}>
      <Head title={'Filial Show'} />

      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <header>
              <h2>
                <Link className="icon-back" href={'/filials'}>
                  &nbsp;
                </Link>
                {msg.get('filial.title.view')} "{filialData.name}"
              </h2>
            </header>
            <div className="mt-0 ml-4">
              <ul className="list-disc">
                <li className="mb-2">
                  {msg.get('filial.name')}: {filialData.name}
                </li>
                <li className="mb-2">
                  {msg.get('filial.address')}: {filialData.address}
                </li>
                <li className="mb-2">
                  {msg.get('filial.uraddress')}: {filialData.uraddress}
                </li>
                <li className="mb-2">
                  {msg.get('filial.inn')}: {filialData.inn}
                </li>
                <li className="mb-2">
                  {msg.get('filial.edrpou')}: {filialData.edrpou}
                </li>
                <li className="mb-2">
                  {msg.get('filial.phone')}: {filialData.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
