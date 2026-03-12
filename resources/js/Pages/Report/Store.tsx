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
import {
    setDataLoadingAction,
} from '../../Redux/Layout/actions';
import { reportResultSelector } from '../../Redux/Report/selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputCustomerSelect from '../../Components/Form/InputCustomerSelect';
import axios from 'axios';

interface BalanceProps {
    filials: any[];
    dateFrom: string;
    dateTo: string;
    stores: any[];
}

type ReportRow = {
    row_type: "opening_balance" | "movement" | "closing_balance" | string;
    created_at?: string | null;
    material_id?: number;
    document_type?: string | null;
    document_id?: number | null;
    qty?: string | number | null;
    running_balance?: string | number | null;
};

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
    background: '#111827',
    color: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden'
};

const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #374151',
    fontWeight: 600,
    background: '#1f2937',
    color: '#9ca3af'
};

const tdStyle: React.CSSProperties = {
    padding: '10px',
    borderBottom: '1px solid #1f2937'
};

const tdRightStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'right',
    borderBottom: '1px solid #1f2937'
};

const formatDateSafe = (s?: string | null) => {
    if (!s) return "";
    // Создаём из строки дату — если формат ISO/SQL, это должно работать
    const d = new Date(s);
    if (isNaN(d.getTime())) return s; // fallback: вернуть как есть
    // Локаль можно поменять при необходимости
    return d.toLocaleString(); // e.g. "7.03.2026, 21:55:23"
};

const fmtNum = (v: string | number | null | undefined) => {
    const n = Number(v ?? 0);
    // Число с 4 знаками после запятой (подстрой под свою БД/формат)
    return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 });
};

export default function Store({ filials, dateFrom, dateTo, stores }: BalanceProps) {
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
        store_id: ''
    });
    const [storeError, setStoreError] = useState('');
    const [reportFromDate, setReportFromDate] = useState(dateFrom ? new Date(dateFrom) : new Date());
    const [reportToDate, setReportToDate] = useState(dateTo ? new Date(dateTo) : new Date());
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
        dispatch(setDataLoadingAction(true));

        let currentValues = { ...values };

        // If no filial is selected, try to use the first available filial
        if (!currentValues.filial_id && filials && filials.length > 0) {
            currentValues.filial_id = String(filials[0].id);
            setValues(prev => ({
                ...prev,
                filial_id: currentValues.filial_id,
            }));
        }

        // Format dates to YYYY-MM-DD format and ensure they are in currentValues
        const formattedFromDate = reportFromDate instanceof Date ?
            reportFromDate.toISOString().split('T')[0] : reportFromDate;
        const formattedToDate = reportToDate instanceof Date ?
            reportToDate.toISOString().split('T')[0] : reportToDate;

        currentValues.dateFrom = formattedFromDate;
        currentValues.dateTo = formattedToDate;

        setStoreError('');
        console.log("Generating report with values:", currentValues);

        axios.post(`/report/generateStoreReport`, { values: currentValues }, {})
            .then(res => {
                setReportResult(res.data);
                console.log("Report data received:", res.data);
                dispatch(setDataLoadingAction(false));
            })
            .catch(err => {
                console.error("Report generation failed:", err);
                dispatch(setDataLoadingAction(false));
            });
    };

    const clearReport = () => {
        setReportResult([]);
    };

    const renderReportResult = () => {
        if (!reportResult || reportResult.length === 0) return null;

        // Group data by material
        const groups: any[] = [];
        let currentGroup: any = null;

        reportResult.forEach(item => {
            if (item.row_type === 'opening_balance') {
                if (currentGroup) groups.push(currentGroup);
                currentGroup = {
                    material_id: item.material_id,
                    material_name: item.material_name,
                    opening: Number(item.running_balance || 0),
                    items: [],
                    totalIn: 0,
                    totalOut: 0,
                    closing: 0
                };
            } else if (item.row_type === 'movement') {
                if (currentGroup) {
                    currentGroup.items.push(item);
                    const q = Number(item.qty || 0);
                    if (q > 0) currentGroup.totalIn += q;
                    else currentGroup.totalOut += Math.abs(q);
                }
            } else if (item.row_type === 'closing_balance') {
                if (currentGroup) {
                    currentGroup.closing = Number(item.running_balance || 0);
                }
            }
        });
        if (currentGroup) groups.push(currentGroup);

        return (
            <div style={{ marginTop: 16, marginLeft: 40, marginRight: 40 }}>
                <table style={{ ...tableStyle, borderRadius: 12 }}>
                    <thead>
                        <tr style={{ background: '#1f2937' }}>
                            <th style={{ ...thStyle, width: '22%' }}>Материал / Дата</th>
                            <th style={{ ...thStyle, width: '22%' }}>Документ</th>
                            <th style={{ ...thStyle, textAlign: 'center', width: '13%' }}>Зал. на початок</th>
                            <th style={{ ...thStyle, textAlign: 'center', width: '10%' }}>Приход</th>
                            <th style={{ ...thStyle, textAlign: 'center', width: '10%' }}>Расход</th>
                            <th style={{ ...thStyle, textAlign: 'right', width: '13%' }}>Зал. на кінець</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group, gIdx) => (
                            <React.Fragment key={gIdx}>
                                {/* Header Summary Row for Material */}
                                <tr style={{ background: "#374151", fontWeight: 'bold', borderTop: '2px solid #4b5563' }}>
                                    <td style={{ ...tdStyle, color: '#60a5fa', fontSize: 14 }}>
                                        {group.material_name}
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'right', color: '#9ca3af', fontWeight: 400, fontSize: 12 }}>
                                        Обороти за період:
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'center', color: '#e5e7eb', background: '#2d3748' }}>
                                        {fmtNum(group.opening)}
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'center', color: '#4ade80' }}>
                                        {group.totalIn > 0 ? "+" + fmtNum(group.totalIn) : "0"}
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'center', color: '#f87171' }}>
                                        {group.totalOut > 0 ? "-" + fmtNum(group.totalOut) : "0"}
                                    </td>
                                    <td style={{ ...tdRightStyle, color: '#60a5fa', background: '#2d3748', fontSize: 15 }}>
                                        {fmtNum(group.closing)}
                                    </td>
                                </tr>

                                {/* Movement Rows */}
                                {group.items.map((item, mIdx) => {
                                    const qtyNum = Number(item.qty ?? 0);
                                    return (
                                        <tr key={mIdx}>
                                            <td style={{ ...tdStyle, paddingLeft: 16, color: '#9ca3af', fontSize: 12 }}>
                                                {formatDateSafe(item.created_at)}
                                            </td>
                                            <td style={{ ...tdStyle, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => console.log(item.document_id)}>
                                                {item.document_type ? msg.get("report.document_type." + item.document_type) : ""}
                                                {item.document_id ? " #" + item.document_id : ""}
                                            </td>
                                            <td style={{ ...tdStyle }}></td>
                                            <td style={{ ...tdStyle, textAlign: 'center' }}>
                                                {qtyNum > 0 ? <span style={{ color: "#16a34a" }}>+{fmtNum(qtyNum)}</span> : ""}
                                            </td>
                                            <td style={{ ...tdStyle, textAlign: 'center' }}>
                                                {qtyNum < 0 ? <span style={{ color: "#dc2626" }}>{fmtNum(qtyNum)}</span> : ""}
                                            </td>
                                            <td style={{ ...tdRightStyle, color: '#9ca3af' }}>
                                                {fmtNum(item.running_balance)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };


    const renderReportResultOld = () => {
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
                        </tr>
                    </thead>
                    <tbody>
                        {reportResult.map((item: any, index: number) => {

                            return (
                                <React.Fragment key={index}>


                                    <tr>

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
                                                        if (date) {
                                                            setReportFromDate(date);
                                                            const formatted = date.toISOString().split('T')[0];
                                                            setValues(prev => ({ ...prev, dateFrom: formatted }));
                                                        }
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
                                                        if (date) {
                                                            setReportToDate(date);
                                                            const formatted = date.toISOString().split('T')[0];
                                                            setValues(prev => ({ ...prev, dateTo: formatted }));
                                                        }
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
                                            <div className="mx-2 font-bold pt-[5px] text-white">{msg.get('report.store')}</div>
                                            <div className="relative">
                                                <InputSelect
                                                    translatable={false}
                                                    name={'store_id'}
                                                    className={'mb-1 input-report-store'}
                                                    values={values}
                                                    value={values.store_id}
                                                    options={stores}
                                                    onChange={handleChangeSelect}
                                                    required
                                                    label={``}
                                                />
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