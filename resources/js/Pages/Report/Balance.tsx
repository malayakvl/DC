import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngReport from '../../Lang/Report/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import InputSelect from '../../Components/Form/InputSelect';
import {
    generateBalanceReportAction,
    emptyBalanceReportAction,
} from '../../Redux/Report/actions';
import { reportResultSelector } from '../../Redux/Report/selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputCustomerSelect from '../../Components/Form/InputCustomerSelect';
import axios from 'axios';

interface BalanceProps {
    filials: any[];
    dateFrom: string;
    dateTo: string;
    customerData: any[];
}

export default function Balance({ filials, dateFrom, dateTo, customerData }: BalanceProps) {
    const dispatch = useDispatch();
    const appLang = useSelector(appLangSelector);
    const msg = new Lang({
        messages: lngReport,
        locale: appLang,
    });
    const [values, setValues] = useState({
        filial_id: '',
        dateFrom: dateFrom,
        dateTo: dateTo,
        patient_id: '',
        patient: ''
    });
    const [storeError, setStoreError] = useState('');
    const [reportFromDate, setReportFromDate] = useState(new Date());
    const [reportToDate, setReportToDate] = useState(new Date());
    const [serchResults, setSerchResults] = useState([]);
    const [reportResult, setReportResult] = useState([]);

    const handleChangeSelect = e => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));

    };

    const generateReport = () => {
        // If no filial is selected, try to use the first available filial
        let filialId = values['filial_id'];
        if (!filialId && filials && filials.length > 0) {
            filialId = filials[0].id;
            setValues(values => ({
                ...values,
                filial_id: filialId,
            }));
        }

        setStoreError('');
        // Format dates to YYYY-MM-DD format
        const formattedFromDate = reportFromDate instanceof Date ?
            reportFromDate.toISOString().split('T')[0] : reportFromDate;
        const formattedToDate = reportToDate instanceof Date ?
            reportToDate.toISOString().split('T')[0] : reportToDate;

        axios.post(`/report/generateBalanceReport`, { values }, {})
            .then(res => {
                setReportResult(res.data);
            })
    };

    const clearReport = () => {
        setReportResult([]);
    };


    const renderReportResult = () => {
        if (!reportResult || reportResult.length === 0) return null;

        let lastPatientId: number | null = null;

        // финальный баланс пациента
        const finalBalanceByPatient: Record<number, number> = {};
        for (const row of reportResult) {
            finalBalanceByPatient[row.patient_id] = Number(row.running_balance) || 0;
        }

        return (
            <div style={{ marginTop: 16, marginLeft: 40, marginRight: 40 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                        <tr>
                            <th style={th}>Пацієнт</th>
                            <th style={th}>Дата</th>
                            <th style={th}>Документ</th>
                            <th style={{ ...th, textAlign: 'right' }}>Сума</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportResult.map((item: any, index: number) => {
                            const isNewPatient = item.patient_id !== lastPatientId;
                            const finalBalance = finalBalanceByPatient[item.patient_id];

                            if (isNewPatient) {
                                lastPatientId = item.patient_id;
                            }

                            const isAct = item.document_type === 'act';
                            const amountSign = isAct ? '−' : '+';
                            const amountColor = isAct ? '#c62828' : '#2e7d32';

                            return (
                                <React.Fragment key={index}>
                                    {isNewPatient && (
                                        <tr
                                            style={{
                                                background:
                                                    finalBalance < 0
                                                        ? '#610b0b'
                                                        : finalBalance > 0
                                                            ? '#f67d1a'
                                                            : '#427245',
                                                fontWeight: 600,
                                                color: '#fff'
                                            }}
                                        >
                                            <td colSpan={4} style={{ padding: '10px 8px' }}>
                                                {item.patient_name}
                                                <span style={{ marginLeft: 12, fontWeight: 500 }}>
                                                    {finalBalance === 0 && '✅ Оплачено'}
                                                    {finalBalance < 0 &&
                                                        ` ❗ Задолженность ${Math.abs(finalBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                                                    {finalBalance > 0 &&
                                                        ` 🟢 Переплата ${finalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                                                </span>
                                            </td>
                                        </tr>
                                    )}

                                    <tr>
                                        <td style={td}></td>

                                        <td style={td}>
                                            {new Date(item.document_date).toLocaleDateString()}
                                        </td>

                                        <td style={td}>
                                            {isAct ? '🧾 Act' : '💳 Payment'}{' '}
                                            <strong>{item.document_number}</strong>
                                        </td>

                                        <td
                                            style={{
                                                ...td,
                                                textAlign: 'right',
                                                fontWeight: 500,
                                                color: amountColor
                                            }}
                                        >
                                            {amountSign}
                                            {Number(item.amount).toLocaleString(undefined, {
                                                minimumFractionDigits: 2
                                            })}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };



    const th: React.CSSProperties = {
        borderBottom: '2px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        background: '#fff',
        color: '#000'
    };

    const td: React.CSSProperties = {
        borderBottom: '1px solid #eee',
        background: '#fff',
        padding: '8px',
        color: '#000'
    };




    // const renderReportResult = () => {
    //     // Use reportResult if available, otherwise use initialData
    //     const dataToDisplay = (reportResult && Object.keys(reportResult).length > 0) ? reportResult :
    //         (initialData && Object.keys(initialData).length > 0) ? initialData : {};

    //     // Always render the table, even if empty
    //     return (
    //         <div className="mt-4">
    //             <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
    //                 <thead>
    //                     <tr>
    //                         <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Material</th>
    //                         <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Beginning Balance</th>
    //                         <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Incoming</th>
    //                         <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Outgoing</th>
    //                         <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Ending Balance</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {/* Warehouse/Store information as a separate row */}
    //                     <tr>
    //                         <td colSpan={5} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e6f3ff', fontWeight: 'bold' }}>
    //                             Store: {values.store_id ? storesData.find(store => store.id == values.store_id)?.name : 'All Stores'}
    //                         </td>
    //                     </tr>
    //                     {dataToDisplay && Object.keys(dataToDisplay).length > 0 ? (
    //                         Object.keys(dataToDisplay).map((productId) => {
    //                             const productData = dataToDisplay[productId];

    //                             // Calculate totals for incoming and outgoing
    //                             let totalIncoming = 0;
    //                             let totalOutgoing = 0;
    //                             let totalIncomingFact = 0;
    //                             let totalOutgoingFact = 0;

    //                             if (productData.movement && productData.movement.length > 0) {
    //                                 productData.movement.forEach(move => {
    //                                     const incomingQty = parseFloat(move.incoming_qty) || 0;
    //                                     const outgoingQty = parseFloat(move.outgoing_qty) || 0;
    //                                     const incomingFactQty = parseFloat(move.incoming_fact_qty) || 0;
    //                                     const outgoingFactQty = parseFloat(move.outgoing_fact_qty) || 0;

    //                                     totalIncoming += incomingQty;
    //                                     totalOutgoing += outgoingQty;
    //                                     totalIncomingFact += incomingFactQty;
    //                                     totalOutgoingFact += outgoingFactQty;
    //                                 });
    //                             }

    //                             // Calculate ending balance
    //                             const beginningBalance = productData.startPeriod?.balance_quantity ?
    //                                 parseFloat(productData.startPeriod.balance_quantity) : 0;
    //                             const beginningBalanceFact = productData.startPeriod?.balance_fact_quantity ?
    //                                 parseFloat(productData.startPeriod.balance_fact_quantity) : 0;
    //                             const endingBalance = beginningBalance + totalIncoming - totalOutgoing;
    //                             const endingBalanceFact = beginningBalanceFact + totalIncomingFact - totalOutgoingFact;

    //                             return (
    //                                 <React.Fragment key={productId}>
    //                                     {/* Main row with material data */}
    //                                     <tr>
    //                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{productData.startPeriod?.product_name || 'N/A'}</td>
    //                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{beginningBalance.toFixed(2)} ({beginningBalanceFact.toFixed(2)})</td>
    //                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalIncoming.toFixed(2)} ({totalIncomingFact.toFixed(2)})</td>
    //                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalOutgoing.toFixed(2)} ({totalOutgoingFact.toFixed(2)})</td>
    //                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{endingBalance.toFixed(2)} ({endingBalanceFact.toFixed(2)})</td>
    //                                     </tr>

    //                                     {/* Document rows */}
    //                                     {productData.movement && productData.movement.length > 0 && (
    //                                         <tr>
    //                                             <td colSpan="5" style={{ padding: 0 }}>
    //                                                 <table style={{ width: '100%', borderCollapse: 'collapse', marginLeft: '20px' }}>
    //                                                     <thead>
    //                                                         <tr>
    //                                                             <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Date</th>
    //                                                             <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Document Type</th>
    //                                                             <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Document Number</th>
    //                                                             <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Incoming</th>
    //                                                             <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f9f9f9', fontSize: '0.9em' }}>Outgoing</th>
    //                                                         </tr>
    //                                                     </thead>
    //                                                     <tbody>
    //                                                         {productData.movement.map((move, index) => {
    //                                                             const incomingQty = parseFloat(move.incoming_qty) || 0;
    //                                                             const outgoingQty = parseFloat(move.outgoing_qty) || 0;
    //                                                             const incomingFactQty = parseFloat(move.incoming_fact_qty) || 0;
    //                                                             const outgoingFactQty = parseFloat(move.outgoing_fact_qty) || 0;

    //                                                             return (
    //                                                                 <tr key={index}>
    //                                                                     <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em' }}>{move.operation_date}</td>
    //                                                                     <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em' }}>{move.document_type}</td>
    //                                                                     <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em' }}>{move.invoice_number}</td>
    //                                                                     <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em', textAlign: 'right' }}>
    //                                                                         {incomingQty > 0 ? `${incomingQty.toFixed(2)} (${incomingFactQty.toFixed(2)})` : ''}
    //                                                                     </td>
    //                                                                     <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '0.8em', textAlign: 'right' }}>
    //                                                                         {outgoingQty > 0 ? `${outgoingQty.toFixed(2)} (${outgoingFactQty.toFixed(2)})` : ''}
    //                                                                     </td>
    //                                                                 </tr>
    //                                                             );
    //                                                         })}
    //                                                     </tbody>
    //                                                 </table>
    //                                             </td>
    //                                         </tr>
    //                                     )}
    //                                 </React.Fragment>
    //                             );
    //                         })
    //                     ) : (
    //                         <tr>
    //                             <td colSpan={5} style={{ border: '1px solid #ddd', padding: '8px' }}>No report data available for the selected store and date range.</td>
    //                         </tr>
    //                     )}
    //                 </tbody>
    //             </table>
    //         </div>
    //     );
    // };




    // Auto-generate report when component mounts
    // useEffect(() => {
    //     // If we have initial data and no report has been generated yet, use initial data
    //     if (initialData && Object.keys(initialData).length > 0 &&
    //         (!reportResult || Object.keys(reportResult).length === 0)) {
    //         // Don't need to do anything, initialData will be displayed
    //     } else if (storesData && storesData.length > 0 && values.store_id) {
    //         // Small delay to ensure component is fully mounted
    //         setTimeout(() => {
    //             generateReport();
    //         }, 100);
    //     }
    // }, []);
    const handleChangePatient = (e) => {
        const value = e.target.value;
        setValues(values => ({
            ...values,
            patient: value,
        }));
        // fetch patient
        if (value.length >= 3) {
            fetchPatient(value);
        }
    }

    const calcPos = (index) => {
        return 50;
    }

    const renderSearchPatientResult = index => {
        if (serchResults.length > 0) {
            return (
                <div
                    className="absolute autocomplete"
                    style={{ top: calcPos(index) + 'px', width: '500px' }}
                >
                    <ul>
                        {serchResults.map(_res => (
                            <li
                                className="cursor-pointer py-0.5"
                                onClick={() => {
                                    setSerchResults([]);
                                    setValues(values => ({
                                        ...values,
                                        patient_id: _res.id,
                                        patient: _res.name,
                                    }));
                                }}
                            >
                                {_res.name}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <></>;
        }
    };

    const fetchPatient = (value) => {
        axios.get(`/report-patients/${value}`)
            .then(response => {
                setSerchResults(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <AuthenticatedLayout header={<Head />}>
            <Head title={'Balance Report'} />
            <div className="py-0">
                <div>
                    <div className="p-4 sm:p-8 mb-8 content-data bg-content">
                        <section>
                            <header>
                                <div className="flex inline-flex">
                                    <h2 className="text-white" style={{ fontSize: '1.5rem', color: 'white' }}>{msg.get('report.title.balance')}</h2>
                                    <div className="pl-5 mt-2">
                                        <div className="flex">
                                            <div className="mr-3">
                                                <DatePicker
                                                    id={'from_date'}
                                                    name={`from_date`}
                                                    selected={reportFromDate}
                                                    className={`input-text input-report-date`}
                                                    onChange={(date: Date | null) => {
                                                        if (date) setReportFromDate(date)
                                                    }}
                                                />
                                            </div>
                                            <div className="mr-3">
                                                <DatePicker
                                                    id={'to_date'}
                                                    name={`to_date`}
                                                    selected={reportToDate}
                                                    className={`input-text input-report-date`}
                                                    onChange={(date: Date | null) => {
                                                        if (date) setReportToDate(date)
                                                    }}
                                                />
                                            </div>
                                            <div className="mx-2 font-bold pt-[5px] text-white">{msg.get('report.title.filial')}</div>
                                            <InputSelect
                                                translatable={false}
                                                name={'filial_id'}
                                                className={'mb-1 input-report-store'}
                                                values={values}
                                                value={values.filial_id}
                                                options={filials}
                                                onChange={handleChangeSelect}
                                                required
                                                label={``}
                                            />
                                            <div className="mx-2 font-bold pt-[5px] text-white">{msg.get('report.title.patient')}</div>
                                            <div className="relative">
                                                <input
                                                    name="patient_id"
                                                    className="input-text input-invoice material-input"
                                                    type="text"
                                                    value={values.patient}
                                                    onChange={event => handleChangePatient(event)}
                                                />
                                                {renderSearchPatientResult(0)}
                                            </div>
                                            <div className="ml-4">
                                                <PrimaryButton>
                                                    <div
                                                        onClick={() => {
                                                            generateReport();
                                                        }}
                                                    >
                                                        {msg.get('report.generate')}
                                                    </div>
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                        <div className={`form-error`}>{storeError}</div>
                                    </div>
                                </div>
                            </header>
                        </section>

                    </div>
                    <div>
                        {renderReportResult()}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}