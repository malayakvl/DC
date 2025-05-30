import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../Lang/Material/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import InputSelect from '../../Components/Form/InputSelect';
import { setInvoiceItems, setInvoiceTax } from '../../Redux/Incominginvoice';
import {
  generateStoreReportAction,
  emptyStoreReportAction,
} from '../../Redux/Material';
import { reportResultSelector } from '../../Redux/Material/selectors';

export default function List({ storesData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const [values, setValues] = useState({
    store_id: '',
  });
  const [storeError, setStoreError] = useState('');
  const reportResult = useSelector(reportResultSelector);

  const handleChangeSelect = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
    if (key === 'tax_id') {
      dispatch(setInvoiceTax(e.target.value));
    }
  };

  const generateReport = () => {
    if (!values['store_id']) {
      setStoreError(msg.get('material.report.error.store'));
    } else {
      setStoreError('');
      dispatch(generateStoreReportAction(values['store_id']));
    }
    return;
  };

  useEffect(() => {
    if (!values['store_id']) {
      dispatch(emptyStoreReportAction());
    }
  }, [reportResult]);

  const renderReportReult = () => {
    if (reportResult) {
      return (
        <div className="mt-4">
          <table className="table">
            <thead>
              <tr>
                <td>
                  <b>Материал</b>
                </td>
                <td className="tqty">
                  <b>Количество</b>
                </td>
                <td className="tqty">
                  <b>Фактична кількість</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {reportResult.map(_data => (
                <tr>
                  <td>
                    {_data.name} ({_data.producername})
                  </td>
                  <td className="tqty">
                    {_data.quantity} {_data.unitname}
                  </td>
                  <td className="tqty">
                    {_data.weight > 0 ? _data.weight : ''}{' '}
                    {_data.weight > 0 ? _data.unitsizename : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Store Report'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>{msg.get('material.title.report')}</h2>
                  <div className="pl-5 mt-2">
                    <div className="flex">
                      <InputSelect
                        translatable={false}
                        name={'store_id'}
                        className={'mb-1'}
                        values={values}
                        value={values.store_id}
                        options={storesData}
                        onChange={handleChangeSelect}
                        required
                        label={``}
                      />
                      <div className="ml-4">
                        <PrimaryButton>
                          <div
                            onClick={() => {
                              generateReport();
                            }}
                          >
                            {msg.get('material.report.generate')}
                          </div>
                        </PrimaryButton>
                      </div>
                    </div>
                    <div className={`form-error`}>{storeError}</div>
                  </div>
                </div>
              </header>
            </section>
            <div>{renderReportReult()}</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
