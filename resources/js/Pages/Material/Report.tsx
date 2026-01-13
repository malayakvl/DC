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

export default function List({ storesData, firstStoreId, initialReportData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const [values, setValues] = useState({
    store_id: firstStoreId || (storesData && storesData.length > 0 ? storesData[0].id : ''),
  });
  const [storeError, setStoreError] = useState('');
  const [reportFromDate, setReportFromDate] = useState(new Date());
  const [reportToDate, setReportToDate] = useState(new Date());
  const [initialData, setInitialData] = useState(initialReportData || {});
  const reportResult = useSelector(reportResultSelector);
  // Update initialData when initialReportData prop changes
  useEffect(() => {
    if (initialReportData && Object.keys(initialReportData).length > 0) {
      setInitialData(initialReportData);
    }
  }, [initialReportData]);

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
    // If no store is selected, try to use the first available store
    let storeId = values['store_id'];
    if (!storeId && storesData && storesData.length > 0) {
      storeId = storesData[0].id;
      setValues(values => ({
        ...values,
        store_id: storeId,
      }));
    }
    
    if (!storeId) {
      setStoreError(msg.get('material.report.error.store'));
      return;
    } else {
      setStoreError('');
      // Format dates to YYYY-MM-DD format
      const formattedFromDate = reportFromDate instanceof Date ? 
        reportFromDate.toISOString().split('T')[0] : reportFromDate;
      const formattedToDate = reportToDate instanceof Date ? 
        reportToDate.toISOString().split('T')[0] : reportToDate;
      dispatch(generateStoreReportAction(storeId, formattedFromDate, formattedToDate));
    }
  };



  const renderReportResult = () => {
    // Use reportResult if available, otherwise use initialData
    const dataToDisplay = (reportResult && Object.keys(reportResult).length > 0) ? reportResult : 
                         (initialData && Object.keys(initialData).length > 0) ? initialData : {};

    // Always render the table, even if empty
    return (
      <div className="mt-4">
        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Material</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Beginning Balance</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Incoming</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Outgoing</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Ending Balance</th>
            </tr>
          </thead>
          <tbody>
            {/* Warehouse/Store information as a separate row */}
            <tr>
              <td colSpan={5} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e6f3ff', fontWeight: 'bold' }}>
                Store: {values.store_id ? storesData.find(store => store.id == values.store_id)?.name : 'All Stores'}
              </td>
            </tr>
            {dataToDisplay && Object.keys(dataToDisplay).length > 0 ? (
              Object.keys(dataToDisplay).map((productId) => {
                const productData = dataToDisplay[productId];
                
                // Calculate totals for incoming and outgoing
                let totalIncoming = 0;
                let totalOutgoing = 0;
                let totalIncomingFact = 0;
                let totalOutgoingFact = 0;
                
                if (productData.movement && productData.movement.length > 0) {
                  productData.movement.forEach(move => {
                    const incomingQty = parseFloat(move.incoming_qty) || 0;
                    const outgoingQty = parseFloat(move.outgoing_qty) || 0;
                    const incomingFactQty = parseFloat(move.incoming_fact_qty) || 0;
                    const outgoingFactQty = parseFloat(move.outgoing_fact_qty) || 0;
                    
                    totalIncoming += incomingQty;
                    totalOutgoing += outgoingQty;
                    totalIncomingFact += incomingFactQty;
                    totalOutgoingFact += outgoingFactQty;
                  });
                }
                
                // Calculate ending balance
                const beginningBalance = productData.startPeriod?.balance_quantity ? 
                  parseFloat(productData.startPeriod.balance_quantity) : 0;
                const beginningBalanceFact = productData.startPeriod?.balance_fact_quantity ? 
                  parseFloat(productData.startPeriod.balance_fact_quantity) : 0;
                const endingBalance = beginningBalance + totalIncoming - totalOutgoing;
                const endingBalanceFact = beginningBalanceFact + totalIncomingFact - totalOutgoingFact;
                
                return (
                  <React.Fragment key={productId}>
                    {/* Main row with material data */}
                    <tr>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{productData.startPeriod?.product_name || 'N/A'}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{beginningBalance.toFixed(2)} ({beginningBalanceFact.toFixed(2)})</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalIncoming.toFixed(2)} ({totalIncomingFact.toFixed(2)})</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalOutgoing.toFixed(2)} ({totalOutgoingFact.toFixed(2)})</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{endingBalance.toFixed(2)} ({endingBalanceFact.toFixed(2)})</td>
                    </tr>
                    
                    {/* Document rows */}
                    {productData.movement && productData.movement.length > 0 && (
                      <tr>
                        <td colSpan="5" style={{ padding: 0 }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', marginLeft: '20px' }}>
                            <thead>
                              <tr>
                                <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Date</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Document Type</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Document Number</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Incoming</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Outgoing</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productData.movement.map((move, index) => {
                                const incomingQty = parseFloat(move.incoming_qty) || 0;
                                const outgoingQty = parseFloat(move.outgoing_qty) || 0;
                                const incomingFactQty = parseFloat(move.incoming_fact_qty) || 0;
                                const outgoingFactQty = parseFloat(move.outgoing_fact_qty) || 0;
                                
                                return (
                                  <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em' }}>{move.operation_date}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em' }}>{move.document_type}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em' }}>{move.invoice_number}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em', textAlign: 'right' }}>
                                      {incomingQty > 0 ? `${incomingQty.toFixed(2)} (${incomingFactQty.toFixed(2)})` : ''}
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em', textAlign: 'right' }}>
                                      {outgoingQty > 0 ? `${outgoingQty.toFixed(2)} (${outgoingFactQty.toFixed(2)})` : ''}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ border: '1px solid #ddd', padding: '8px' }}>No report data available for the selected store and date range.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const changeReportDate = (date) => {
    console.log('Date change', date)
  }
  
  
  // Auto-generate report when component mounts
  useEffect(() => {
    // If we have initial data and no report has been generated yet, use initial data
    if (initialData && Object.keys(initialData).length > 0 && 
        (!reportResult || Object.keys(reportResult).length === 0)) {
      // Don't need to do anything, initialData will be displayed
    } else if (storesData && storesData.length > 0 && values.store_id) {
      // Small delay to ensure component is fully mounted
      setTimeout(() => {
        generateReport();
      }, 100);
    }
  }, []);
  
  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Store Report'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2 className="text-white" style={{ fontSize: '1.5rem', color: 'white' }}>{msg.get('material.title.report')}</h2>
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
                      <div className="mx-2 font-bold pt-[5px] text-white">{msg.get('material.store')}</div>
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
                      <div className="ml-4">
                        <PrimaryButton>
                          <div
                            onClick={() => {
                              // Generate report for today with default store
                              setReportFromDate(new Date());
                              setReportToDate(new Date());
                              generateReport();
                            }}
                          >
                            Today's Report
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
              {renderReportResult()}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}