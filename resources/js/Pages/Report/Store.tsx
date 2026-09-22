import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngReport from '../../Lang/Report/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import InputText from '../../Components/Form/InputText';
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

const formatDateSafe = (s?: string | null) => {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleString();
};

const fmtNum = (v: string | number | null | undefined) => {
  const n = Number(v ?? 0);
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 });
};

const getCurrentWeekRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    dateFrom: formatDate(monday),
    dateTo: formatDate(sunday),
  };
};

export default function Store({ filials, stores }: BalanceProps) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngReport,
    locale: appLang,
  });
  const { dateFrom, dateTo } = getCurrentWeekRange();

  const [values, setValues] = useState({
    filial_id: '',
    dateFrom: dateFrom,
    dateTo: dateTo,
    patient_id: '',
    store_id: '',
  });
  const [storeError, setStoreError] = useState('');
  const [reportResult, setReportResult] = useState([]);
  const [batchesByMaterial, setBatchesByMaterial] = useState({});

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

    if (!currentValues.filial_id && filials && filials.length > 0) {
      currentValues.filial_id = String(filials[0].id);
      setValues((prev) => ({
        ...prev,
        filial_id: currentValues.filial_id,
      }));
    }

    setStoreError('');
    axios
      .post(`/report/generateStoreReport`, { values: currentValues }, {})
      .then((res) => {
        setReportResult(res.data.movements || []);

        const byMaterial = {};
        (res.data.batches || []).forEach((batch) => {
          const materialKey = String(batch.material_id);
          byMaterial[materialKey] = [...(byMaterial[materialKey] || []), batch];
        });

        setBatchesByMaterial(byMaterial);
        dispatch(setDataLoadingAction(false));
      })
      .catch((err) => {
        console.error('Report generation failed:', err);
        dispatch(setDataLoadingAction(false));
      });
  };

  const renderReportResult = () => {
    if (!reportResult || reportResult.length === 0) return null;

    // 1. Групуємо сирі рядки за матеріалом
    const groups: any[] = [];
    let currentGroup: any = null;
    reportResult.forEach((item) => {
      if (item.row_type === 'opening_balance') {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = {
          material_id: item.material_id,
          material_name: item.material_name,
          category_name: item.category_name || 'Без категорії',
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

    // 2. Групуємо матеріали за назвою категорії
    const categoriesMap: { [key: string]: any[] } = {};
    groups.forEach((group) => {
      const catName = group.category_name;
      if (!categoriesMap[catName]) {
        categoriesMap[catName] = [];
      }
      categoriesMap[catName].push(group);
    });

    return (
      <div className="mt-4 mx-5">
        <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-slate-100/60 text-slate-500 font-semibold text-sm uppercase tracking-wider">
              <th className="py-3.5 px-4 min-w-[320px]">Матеріал / Документ</th>
              <th className="py-3.5 px-3 min-w-[170px]">Дата / Час</th>
              <th className="py-3.5 px-3 text-right min-w-[90px]">Поч. залишок</th>
              <th className="py-3.5 px-3 text-right min-w-[90px]">Прихід</th>
              <th className="py-3.5 px-3 text-right min-w-[90px]">Розхід</th>
              <th className="py-3.5 px-3 text-right min-w-[100px]">Кінц. залишок</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-900">
            {Object.entries(categoriesMap).map(([categoryName, materials], catIdx) => (
              <React.Fragment key={`cat-${catIdx}`}>
                {/* Заголовок категорії */}
                <tr className="bg-slate-100/90 border-t border-slate-200">
                  <td
                    colSpan={6}
                    className="py-2.5 px-4 font-bold text-slate-700 text-sm uppercase tracking-wider"
                  >
                    📁 {categoryName}
                  </td>
                </tr>

                {/* Товари всередині категорії */}
                {materials.map((group, gIdx) => {
                  const materialBatches = batchesByMaterial?.[String(group.material_id)] || [];

                  return (
                    <React.Fragment key={`mat-${gIdx}`}>
                      {/* Зведений рядок матеріалу */}
                      <tr className="hover:bg-slate-50/80 transition-colors bg-white border-t border-slate-100 font-medium">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{group.material_name}</div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-400 text-sm italic"></td>
                        <td className="py-3.5 px-3 text-right text-slate-600">
                          {fmtNum(group.opening)}
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-emerald-600">
                          {group.totalIn > 0 ? '' + fmtNum(group.totalIn) : ''}
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-rose-600">
                          {group.totalOut > 0 ? '' + fmtNum(group.totalOut) : ''}
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                          {fmtNum(group.closing)}
                        </td>
                      </tr>

                      {/* Рядки рухів (документів) */}
                      {group.items.map((item: any, mIdx: number) => {
                        const qtyNum = Number(item.qty ?? 0);

                        // Знаходимо відповідну партію/накладну для цього руху, щоб показати ціну, якщо це прихід або потрібно
                        const matchedBatch = materialBatches.find(
                          (batch: any) =>
                            batch.source_type === item.document_type &&
                            Number(batch.source_id) === Number(item.document_id)
                        );

                        return (
                          <tr
                            key={`mov-${mIdx}`}
                            className="border-b border-slate-100 bg-slate-50/40"
                          >
                            <td className="py-2.5 px-4 text-sm">
                              <div className="flex items-center gap-1.5 pl-4">
                                <span className="material-symbols-outlined text-sm text-slate-400">
                                  subdirectory_arrow_right
                                </span>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(item.document_id);
                                  }}
                                  className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
                                >
                                  <span className="material-symbols-outlined text-sm">
                                    description
                                  </span>
                                  {item.document_type
                                    ? msg.get('report.document_type.' + item.document_type)
                                    : ''}
                                  {item.document_id ? ' #' + item.document_id : ''}
                                </a>
                                {matchedBatch && matchedBatch.price_per_unit && (
                                  <span className="ml-2 text-slate-500 font-normal">
                                    (ціна: {fmtNum(matchedBatch.price_per_unit)} ₴)
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-sm text-slate-500">
                              {formatDateSafe(item.document_date)}
                            </td>
                            <td className="py-2.5 px-3 text-right text-slate-400 text-sm"></td>
                            <td className="py-2.5 px-3 text-right text-sm">
                              {qtyNum > 0 && (
                                <span className="text-emerald-600 font-semibold">
                                  {fmtNum(qtyNum)}
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right text-sm">
                              {qtyNum < 0 && (
                                <span className="text-rose-600 font-semibold">
                                  {fmtNum(qtyNum)}
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right text-sm text-slate-600 font-medium">
                              {fmtNum(item.running_balance)}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Balance Report'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <header className="mb-6 mt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                      {msg.get('report.title.store.report')}
                    </h1>
                  </div>
                </div>
              </div>
            </header>
            <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative flex-1 max-w-[280px]">
                  <InputText
                    type="date"
                    name="dateFrom"
                    label={msg.get('report.from_date')}
                    values={values}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        setValues((prev) => ({ ...prev, dateFrom: val }));
                      }
                    }}
                    className="filter-select"
                  />
                </div>
                <div className="relative flex-1 max-w-[280px]">
                  <InputText
                    type="date"
                    name="dateTo"
                    label={msg.get('report.to_date')}
                    values={values}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        setValues((prev) => ({ ...prev, dateTo: val }));
                      }
                    }}
                    className="filter-select"
                  />
                </div>
                <div className="relative flex-1 max-w-[280px]">
                  <InputSelect
                    translatable={false}
                    name={'filial_id'}
                    className="filter-select"
                    values={values}
                    value={values.filial_id}
                    options={filials}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('report.title.filial')}
                  />
                </div>
                <div className="relative flex-1 max-w-[280px]">
                  <InputSelect
                    translatable={false}
                    className="filter-select"
                    name={'store_id'}
                    values={values}
                    value={values.store_id}
                    options={stores}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('report.store')}
                  />
                </div>
                <div className="relative flex-1 max-w-[280px] mt-6">
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
            </div>
          </div>
          <div style={{ minHeight: '300px' }}>{renderReportResult()}</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
