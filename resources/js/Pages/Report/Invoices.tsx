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
    setDataLoadingAction,
} from '../../Redux/Layout/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

interface BalanceProps {
    filials: any[];
    dateFrom: string;
    dateTo: string;
    suppliers: any[];
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

export default function Invoices({ filials, dateFrom, dateTo, suppliers }: BalanceProps) {
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
        supplier_id: '',
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

        axios.post(`/report/generateInvoicesReport`, { values: currentValues }, {})
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
                    supplier_id: item.supplier_id,
                    supplier_name: item.supplier_name,
                    opening: Number(item.running_balance || 0),
                    items: [],
                    totalIn: 0,
                    totalOut: 0,
                    closing: 0
                };
            } else if (item.row_type === 'movement') {
                if (currentGroup) {
                    currentGroup.items.push(item);
                    currentGroup.totalIn += Number(item.debit || 0);
                    currentGroup.totalOut += Number(item.credit || 0);
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
                            <th style={{ ...thStyle, width: '20%' }}>{msg.get('report.title.date')}</th>
                            <th style={{ ...thStyle, width: '20%' }}>{msg.get('report.title.document')}</th>
                            <th style={{ ...thStyle, textAlign: 'center', width: '15%' }}>{msg.get('report.title.opening_balance')}</th>
                            <th style={{ ...thStyle, textAlign: 'center', width: '15%' }}>{msg.get('report.title.income')}</th>
                            <th style={{ ...thStyle, textAlign: 'center', width: '15%' }}>{msg.get('report.title.expense')}</th>
                            <th style={{ ...thStyle, textAlign: 'right', width: '15%' }}>{msg.get('report.title.closing_balance')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group, gIdx) => (
                            <React.Fragment key={gIdx}>
                                {/* Header Summary Row for Material */}
                                <tr style={{ background: "#374151", fontWeight: 'bold', borderTop: '2px solid #4b5563' }}>
                                    <td style={{ ...tdStyle, color: '#60a5fa', fontSize: 14 }}>
                                        {group.supplier_name}
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
                                    return (
                                        <tr key={mIdx}>
                                            <td style={{ ...tdStyle, paddingLeft: 16, color: '#9ca3af', fontSize: 12 }}>
                                                {formatDateSafe(item.created_at)}
                                            </td>
                                            <td style={{ ...tdStyle }}>
                                                <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => console.log(item.document_id)}>
                                                    {item.document_type ? msg.get("report.document_type." + item.document_type) : ""}
                                                    {item.document_id ? (item.document_type === 'payment' ? ' за накладною ' : '') + " #" + item.document_id + "" : ""}
                                                </div>
                                            </td>
                                            <td style={{ ...tdStyle }}></td>
                                            <td style={{ ...tdStyle, textAlign: 'center' }}>
                                                {Number(item.debit) > 0 ? <span style={{ color: "#4ade80" }}>{fmtNum(item.debit)}</span> : ""}
                                            </td>
                                            <td style={{ ...tdStyle, textAlign: 'center' }}>
                                                {Number(item.credit) > 0 ? <span style={{ color: "#f87171" }}>{fmtNum(item.credit)}</span> : ""}
                                            </td>
                                            <td style={{ ...tdRightStyle, color: Number(item.running_balance) > 0 ? '#f87171' : '#9ca3af' }}>
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
            <Head title={'Supplier Report'} />
            <div className="py-0">
                <div>
                    <div className="p-4 sm:p-8 mb-8 content-data bg-content">
                        <section>
                            <header>
                                <div className="flex inline-flex">
                                    <h2 className="text-white" style={{ fontSize: '1rem', color: 'white' }}>{msg.get('report.title.suppliers.report')}</h2>
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
                                            <div className="mx-2 font-bold pt-[5px] text-white">{msg.get('report.supplier')}</div>
                                            <div className="relative">
                                                <InputSelect
                                                    translatable={false}
                                                    name={'supplier_id'}
                                                    className={'mb-1 input-report-store'}
                                                    values={values}
                                                    value={values.supplier_id}
                                                    options={suppliers}
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