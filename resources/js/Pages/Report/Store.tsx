import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngReport from '../../Lang/Report/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import InputSelect from '../../Components/Form/InputSelect';
import { setDataLoadingAction } from '@/Redux/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

interface BalanceProps {
  filials: any[];
  dateFrom: string;
  dateTo: string;
  stores: any[];
}

type ReportRow = {
  row_type: 'opening_balance' | 'movement' | 'closing_balance' | string;
  document_date?: string | null;
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
  background: '#fff',
  color: '#0F172A',
  borderRadius: 8,
  overflow: 'hidden',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px',
  borderBottom: '1px solid #374151',
  fontWeight: 600,
  background: '#fff',
  color: '#0F172A',
};

const tdStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: '1px solid #1f2937',
};

const tdRightStyle: React.CSSProperties = {
  padding: '10px',
  textAlign: 'right',
  borderBottom: '1px solid #1f2937',
};

const formatDateSafe = (s?: string | null) => {
  if (!s) return '';
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
    store_id: '',
  });
  const [storeError, setStoreError] = useState('');
  const [reportFromDate, setReportFromDate] = useState(dateFrom ? new Date(dateFrom) : new Date());
  const [reportToDate, setReportToDate] = useState(dateTo ? new Date(dateTo) : new Date());
  const [reportResult, setReportResult] = useState([]);
  const [batchesByMaterial, setBatchesByMaterial] = useState({});
  const [batchesByDocument, setBatchesByDocument] = useState({});
  const [expandedMaterials, setExpandedMaterials] = useState({});

  const handleChangeSelect = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const generateReport = () => {
    dispatch(setDataLoadingAction(true));
    if (!values.store_id) {
      setStoreError('Будь ласка, виберіть склад');
      dispatch(setDataLoadingAction(false));
      return;
    }

    const currentValues = { ...values };

    // If no filial is selected, try to use the first available filial
    if (!currentValues.filial_id && filials && filials.length > 0) {
      currentValues.filial_id = String(filials[0].id);
      setValues((prev) => ({
        ...prev,
        filial_id: currentValues.filial_id,
      }));
    }

    // Format dates to YYYY-MM-DD format and ensure they are in currentValues
    const formattedFromDate =
      reportFromDate instanceof Date ? reportFromDate.toISOString().split('T')[0] : reportFromDate;
    const formattedToDate =
      reportToDate instanceof Date ? reportToDate.toISOString().split('T')[0] : reportToDate;

    currentValues.dateFrom = formattedFromDate;
    currentValues.dateTo = formattedToDate;

    setStoreError('');

    // axios
    //   .post(`/report/generateStoreReport`, { values: currentValues }, {})
    //   .then((res) => {
    //     setReportResult(res.data.movements || []);
    //     setBatchesByMaterial(
    //       (res.data.batches || []).reduce((result, batch) => {
    //         const key = String(batch.material_id);
    //         result[key] = [...(result[key] || []), batch];
    //         return result;
    //       }, {})
    //     );
    //     setExpandedMaterials({});
    //     console.log('Report data received:', res.data);
    //     dispatch(setDataLoadingAction(false));
    //   })
    //   .catch((err) => {
    //     console.error('Report generation failed:', err);
    //     dispatch(setDataLoadingAction(false));
    //   });
    axios
      .post(`/report/generateStoreReport`, { values: currentValues }, {})
      .then((res) => {
        setReportResult(res.data.movements || []);

        const byMaterial = {};
        const byDocument = {};

        (res.data.batches || []).forEach((batch) => {
          // группировка по материалу (если еще понадобится)
          const materialKey = String(batch.material_id);
          byMaterial[materialKey] = [...(byMaterial[materialKey] || []), batch];

          // группировка по документу, создавшему партию
          const documentKey = `${batch.source_type}_${batch.source_id}`;
          byDocument[documentKey] = [...(byDocument[documentKey] || []), batch];
        });

        setBatchesByMaterial(byMaterial);
        setBatchesByDocument(byDocument);

        setExpandedMaterials({});

        console.log('Report data received:', res.data);

        dispatch(setDataLoadingAction(false));
      })
      .catch((err) => {
        console.error('Report generation failed:', err);
        dispatch(setDataLoadingAction(false));
      });
  };

  const clearReport = () => {
    setReportResult([]);
    setBatchesByMaterial({});
    setExpandedMaterials({});
  };

  const toggleMaterialBatches = (materialId) => {
    const key = String(materialId);
    setExpandedMaterials((current) => ({ ...current, [key]: !current[key] }));
  };

  const renderReportResult = () => {
    if (!reportResult || reportResult.length === 0) return null;

    // Group data by material
    const groups: any[] = [];
    let currentGroup: any = null;
    console.log('reportResult!', reportResult);
    reportResult.forEach((item) => {
      if (item.row_type === 'opening_balance') {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = {
          material_id: item.material_id,
          material_name: item.material_name,
          opening: Number(item.running_balance || 0),
          items: [],
          totalIn: 0,
          totalOut: 0,
          closing: 0,
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
            {groups.map((group, gIdx) => {
              // Безопасная проверка: проверяем, что это массив и в нем есть элементы
              const materialBatches = batchesByMaterial?.[String(group.material_id)] || [];

              // Проверяем, есть ли хотьphp одна партия, привязанная к документам движения
              const hasBatches = group.items.some((item: any) =>
                materialBatches.some(
                  (batch: any) =>
                    batch.source_type === item.document_type &&
                    Number(batch.source_id) === Number(item.document_id)
                )
              );

              return (
                <React.Fragment key={gIdx}>
                  {/* Header Summary Row for Material */}
                  <tr
                    style={{
                      background: '#fff',
                      fontWeight: 'bold',
                      borderTop: '2px solid #4b5563',
                    }}
                  >
                    <td style={{ ...tdStyle, color: '#0F172A', fontSize: 14 }}>
                      {hasBatches ? (
                        <button
                          type="button"
                          onClick={() => toggleMaterialBatches(group.material_id)}
                          style={{
                            color: '#0F172A',
                            background: 'none',
                            border: 0,
                            padding: 0,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            textAlign: 'left',
                          }}
                        >
                          {expandedMaterials[String(group.material_id)] ? '▾' : '▸'}{' '}
                          {group.material_name}
                        </button>
                      ) : (
                        <span>{group.material_name}</span>
                      )}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: 'right',
                        color: '#0F172A',
                        fontWeight: 400,
                        fontSize: 12,
                      }}
                    >
                      Обороти за період:
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: 'center',
                        color: '#0F172A',
                        background: 'none',
                      }}
                    >
                      {fmtNum(group.opening)}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center', color: '#4ade80' }}>
                      {group.totalIn > 0 ? '+' + fmtNum(group.totalIn) : '0'}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center', color: '#f87171' }}>
                      {group.totalOut > 0 ? '-' + fmtNum(group.totalOut) : '0'}
                    </td>
                    <td
                      style={{
                        ...tdRightStyle,
                        color: '#0F172A',
                        background: 'none',
                        fontSize: 15,
                      }}
                    >
                      {fmtNum(group.closing)}
                    </td>
                  </tr>

                  {/* Movement Rows & Nested Document Batches */}
                  {group.items.map((item: any, mIdx: number) => {
                    const qtyNum = Number(item.qty ?? 0);
                    const documentBatches = (
                      batchesByMaterial[String(group.material_id)] || []
                    ).filter(
                      (batch: any) =>
                        batch.source_type === item.document_type &&
                        Number(batch.source_id) === Number(item.document_id)
                    );

                    return (
                      <React.Fragment key={mIdx}>
                        <tr>
                          <td
                            style={{ ...tdStyle, paddingLeft: 16, color: '#0F172A', fontSize: 12 }}
                          >
                            {formatDateSafe(item.document_date)}
                          </td>

                          <td
                            style={{ ...tdStyle, cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => console.log(item.document_id)}
                          >
                            {item.document_type
                              ? msg.get('report.document_type.' + item.document_type)
                              : ''}
                            {item.document_id ? ' #' + item.document_id : ''}
                          </td>

                          <td style={{ ...tdStyle, textAlign: 'center' }} />

                          <td style={{ ...tdStyle, textAlign: 'center' }}>
                            {qtyNum > 0 && (
                              <span style={{ color: '#16a34a' }}>+{fmtNum(qtyNum)}</span>
                            )}
                          </td>

                          <td style={{ ...tdStyle, textAlign: 'center' }}>
                            {qtyNum < 0 && (
                              <span style={{ color: '#0F172A' }}>{fmtNum(Math.abs(qtyNum))}</span>
                            )}
                          </td>

                          <td style={{ ...tdRightStyle, color: '#2e507a' }}>
                            {fmtNum(item.running_balance)}
                          </td>
                        </tr>

                        {expandedMaterials[String(group.material_id)] &&
                          documentBatches.map((batch: any) => (
                            <tr key={`batch-${batch.batch_id}`} style={{ background: '#f8fafc' }}>
                              <td
                                style={{
                                  ...tdStyle,
                                  paddingLeft: 40,
                                  color: '#2563eb',
                                  fontSize: 12,
                                }}
                              >
                                ↳ Партія #{batch.batch_id}
                                <div style={{ fontSize: 11 }}>
                                  {formatDateSafe(batch.arrived_at)}
                                </div>
                              </td>

                              <td
                                style={{
                                  ...tdStyle,
                                  color: '#2563eb',
                                  fontSize: 12,
                                }}
                              >
                                FIFO: {fmtNum(batch.price_per_unit)}
                              </td>

                              <td
                                style={{
                                  ...tdStyle,
                                  textAlign: 'center',
                                  color: '#2563eb',
                                }}
                              >
                                {fmtNum(batch.qty)}
                              </td>

                              <td />

                              <td />

                              <td
                                style={{
                                  ...tdRightStyle,
                                  color: '#2563eb',
                                }}
                              >
                                {fmtNum(batch.qty_left)}

                                {Number(batch.fact_qty) !== Number(batch.qty) && (
                                  <div style={{ fontSize: 11 }}>
                                    факт.: {fmtNum(batch.fact_qty_left)}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderReportResultOld = () => {
    if (!reportResult || reportResult.length === 0) return null;

    // Group data by material
    const groups: any[] = [];
    let currentGroup: any = null;
    console.log('reportResult!', reportResult);
    reportResult.forEach((item) => {
      if (item.row_type === 'opening_balance') {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = {
          material_id: item.material_id,
          material_name: item.material_name,
          opening: Number(item.running_balance || 0),
          items: [],
          totalIn: 0,
          totalOut: 0,
          closing: 0,
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
                <tr
                  style={{
                    background: '#fff',
                    fontWeight: 'bold',
                    borderTop: '2px solid #4b5563',
                  }}
                >
                  <td style={{ ...tdStyle, color: '#0F172A', fontSize: 14 }}>
                    <button
                      type="button"
                      onClick={() => toggleMaterialBatches(group.material_id)}
                      style={{
                        color: '#0F172A',
                        background: 'none',
                        border: 0,
                        padding: 0,
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}
                    >
                      {expandedMaterials[String(group.material_id)] ? '▾' : '▸'}{' '}
                      {group.material_name}
                    </button>
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: 'right',
                      color: '#0F172A',
                      fontWeight: 400,
                      fontSize: 12,
                    }}
                  >
                    Обороти за період:
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: 'center',
                      color: '#0F172A',
                      background: 'none',
                    }}
                  >
                    {fmtNum(group.opening)}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center', color: '#4ade80' }}>
                    {group.totalIn > 0 ? '+' + fmtNum(group.totalIn) : '0'}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center', color: '#f87171' }}>
                    {group.totalOut > 0 ? '-' + fmtNum(group.totalOut) : '0'}
                  </td>
                  <td
                    style={{
                      ...tdRightStyle,
                      color: '#0F172A',
                      background: 'none',
                      fontSize: 15,
                    }}
                  >
                    {fmtNum(group.closing)}
                  </td>
                </tr>

                {expandedMaterials[String(group.material_id)] && (
                  <>
                    {(batchesByMaterial[String(group.material_id)] || []).map((batch) => (
                      <tr key={`batch-${batch.batch_id}`} style={{ background: 'none' }}>
                        <td style={{ ...tdStyle, paddingLeft: 32, color: '#2e507a', fontSize: 12 }}>
                          Партія #{batch.batch_id} · {formatDateSafe(batch.arrived_at)} [
                          {batch.row_type}]
                        </td>
                        <td style={{ ...tdStyle, color: '#2e507a', fontSize: 12 }}>
                          FIFO ціна: {fmtNum(batch.price_per_unit)}
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center', color: '#2e507a' }}>
                          {fmtNum(batch.qty)}
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center', color: '#2e507a' }}></td>
                        <td style={{ ...tdStyle, textAlign: 'center', color: '#2e507a' }}></td>
                        <td style={{ ...tdRightStyle, color: '#2e507a' }}>
                          {fmtNum(batch.qty_left)}
                          {Number(batch.fact_qty) !== Number(batch.qty) && (
                            <span style={{ display: 'block', fontSize: 11, color: '#2e507a' }}>
                              факт.: {fmtNum(batch.fact_qty_left)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {!(batchesByMaterial[String(group.material_id)] || []).length && (
                      <tr style={{ background: 'none' }}>
                        <td
                          colSpan={6}
                          style={{ ...tdStyle, paddingLeft: 32, color: '#2e507a', fontSize: 12 }}
                        >
                          Активних партій немає
                        </td>
                      </tr>
                    )}
                  </>
                )}

                {/* Movement Rows */}
                {group.items.map((item, mIdx) => {
                  const qtyNum = Number(item.qty ?? 0);
                  return (
                    <tr key={mIdx}>
                      <td style={{ ...tdStyle, paddingLeft: 16, color: '#0F172A', fontSize: 12 }}>
                        {formatDateSafe(item.document_date)}
                      </td>
                      <td
                        style={{ ...tdStyle, cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => console.log(item.document_id)}
                      >
                        {item.document_type
                          ? msg.get('report.document_type.' + item.document_type)
                          : ''}
                        {item.document_id ? ' #' + item.document_id : ''}
                      </td>
                      <td style={{ ...tdStyle }}></td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        {qtyNum > 0 ? (
                          <span style={{ color: '#16a34a' }}>+{fmtNum(qtyNum)}</span>
                        ) : (
                          ''
                        )}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        {qtyNum < 0 ? (
                          <span style={{ color: '#0F172A' }}>{fmtNum(Math.abs(qtyNum))}</span>
                        ) : (
                          ''
                        )}
                      </td>
                      <td style={{ ...tdRightStyle, color: '#2e507a' }}>
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
    color: '#000',
  };

  const td: React.CSSProperties = {
    borderBottom: '1px solid #eee',
    background: '#fff',
    padding: '8px',
    color: '#000',
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Balance Report'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data mt-[40px]">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2 className="text-main" style={{ fontSize: '1rem', color: 'white' }}>
                    {msg.get('report.title.store.report')}
                  </h2>
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
                              setValues((prev) => ({ ...prev, dateFrom: formatted }));
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
                              setValues((prev) => ({ ...prev, dateTo: formatted }));
                            }
                          }}
                        />
                      </div>
                      <div className="mx-2 font-bold pt-[5px] text-main">
                        {msg.get('report.title.filial')}
                      </div>
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
                      <div className="mx-2 font-bold pt-[5px] text-main">
                        {msg.get('report.store')}
                      </div>
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
          <div style={{ minHeight: '300px' }}>{renderReportResult()}</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
