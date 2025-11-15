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
import InputCalendar from '../../Components/Form/InputCalendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [reportFromDate, setReportFromDate] = useState(new Date());
  const [reportToDate, setReportToDate] = useState(new Date());
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
      // setStoreError(msg.get('material.report.error.store'));
      dispatch(generateStoreReportAction(null, reportFromDate, reportToDate));
    } else {
      setStoreError('');
      dispatch(generateStoreReportAction(values['store_id'], reportFromDate, reportToDate));
    }
    return;
  };

  // useEffect(() => {
  //   if (!values['store_id']) {
  //     dispatch(emptyStoreReportAction());
  //   }
  // }, [reportResult]);

  const renderReportReult = () => {
    console.log(reportResult);

    if (reportResult) {
      // console.log(reportResult);

      return (
        <div className="mt-4">
          <table className="table">
          <thead>
          <tr>
            <th rowSpan="2">Материал</th>
            <th rowSpan="2">Од виміру</th>
            <th colSpan="4">Склад 1/1</th>
            <th colSpan="4">Склад 1/2</th>
          </tr>
          <tr>
            <th>Нач. остаток</th>
            <th>Приход</th>
            <th>Расход</th>
            <th>Кон периода</th>
            {/*Новий склад*/}
            <th>Нач. остаток</th>
            <th>Приход</th>
            <th>Расход</th>
            <th>Кон периода</th>
          </tr>
          </thead>
            <tbody>
            <tr>
              <td>Материал A</td>
              <td>шт</td>
              <td className="a-right">100</td>
              <td className="a-right">50</td>
              <td className="a-right">30</td>
              <td className="a-right">120</td>
              <td className="a-right">10</td>
              <td className="a-right">5</td>
              <td className="a-right">3</td>
              <td className="a-right">12</td>
            </tr>
            <tr>
              <td>Материал B</td>
              <td>шт</td>
              <td className="a-right">200</td>
              <td className="a-right">80</td>
              <td className="a-right">60</td>
              <td className="a-right">220</td>
              <td className="a-right">20</td>
              <td className="a-right">8</td>
              <td className="a-right">6</td>
              <td className="a-right">22</td>
            </tr>
            </tbody>
          {/*<tbody>*/}
          {/*{Object.keys(reportResult).map((key) => (*/}
          {/*  <React.Fragment key={key}>*/}
          {/*    <tr>*/}
          {/*      <td colSpan="3" style={{background: '#aeaeae'}}>*/}
          {/*        <strong>{key}</strong>*/}
          {/*      </td>*/}
          {/*    </tr>*/}
          {/*    {reportResult[key].map((item) => (*/}
          {/*      <tr key={item.product_id}>*/}
          {/*        <td>{item.product_name}</td>*/}
          {/*        <td style={{textAlign: 'right'}}>{item.total_quantity} {item.unit_name}</td>*/}
          {/*        <td style={{textAlign: 'right'}}>{item.total_fact} {item.unit_weightname}</td>*/}
          {/*      </tr>*/}
          {/*    ))}*/}
          {/*  </React.Fragment>*/}
          {/*))}*/}
          {/*</tbody>*/}
          </table>
        </div>
      );
    }
  };

  const changeReportDate = (date) => {
    console.log('Date change', date)
  }
console.log('Result data', reportResult)
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
                      <div className="mr-3">
                        <DatePicker
                          id={'report_from_date'}
                          name={`report_from_date`}
                          selected={reportFromDate}
                          className={`input-text input-report-date`}
                          onChange={date => {
                            setReportFromDate(date)
                          }}
                        />
                      </div>
                      <div className="mr-3">
                        <DatePicker
                          id={'report_to_date'}
                          name={`report_to_date`}
                          selected={reportToDate}
                          className={`input-text input-report-date`}
                          onChange={date => {
                            setReportToDate(date)
                          }}
                        />
                      </div>
                      <div className="mx-2 font-bold pt-[5px]">{msg.get('material.store')}</div>
                      <InputSelect
                        translatable={false}
                        name={'store_id'}
                        className={'mb-1 input-report-store'}
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
            <div>
              {reportResult && (
                <>
                  {renderReportReult()}
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
