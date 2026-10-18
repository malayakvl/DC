import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { format } from 'date-fns';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../Lang/Act/translation';
import { useSelector } from 'react-redux';


export default function View({
  clinicData,
  formData,
  formRowData = [],
  patient,
  doctor,
}: {
  clinicData: any;
  formData: any;
  formRowData: any[];
  patient: any;
  doctor: any;
}) {
  const handlePrint = () => {
    window.print();
  };
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngAct,
    locale: appLang,
  });

  const totalAmountComponents = formRowData.reduce((acc, row) => acc + Number(row.total || 0), 0);

  return (
    <AuthenticatedLayout
      header={<Head title={`${msg.get('act.view_title')} № ${formData.act_number}`} />}
    >
      <Head title={`${msg.get('act.view_title')} № ${formData.act_number}`} />

      {/* Стилі для друкованої сторінки */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-act, #printable-act * {
            visibility: visible;
          }
          #printable-act {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="py-2 space-y-6">
        {/* Шапка з кнопками дій */}
        <div className="flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <Link
              href="/acts"
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center transition shadow-2xs"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              {msg.get('act.view_title')} № {formData.act_number}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                {msg.get('act.view_status')}
              </span>
            </h1>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition shadow-2xs active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            {msg.get('act.view_print')}
          </button>
        </div>

        {/* Системне сповіщення */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5 text-emerald-900 text-xs font-semibold">
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
            {msg.get('act.view_verified')}
          </div>
          <span className="text-xs font-bold text-emerald-700">ID: #{formData.id}</span>
        </div>

        {/* Друкована область */}
        <div id="printable-act" className="space-y-6">
          {/* Блок з реквізитами (4 картки) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
            {/* Документ */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">description</span>
                {msg.get('act.view_document')}
              </span>
              <div className="font-bold text-slate-900 text-sm">№ {formData.act_number}</div>
              <div className="text-xs text-slate-500">
                {msg.get('act.view_from')}{' '}
                {formData.act_date ? format(new Date(formData.act_date), 'dd.MM.yyyy HH:mm') : '-'}
              </div>
            </div>

            {/* Пацієнт */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">person</span>
                {msg.get('act.view_patient')}
              </span>
              <div className="font-bold text-slate-900 text-sm">
                {patient ? `${patient.first_name} ${patient.last_name}` : '-'}
              </div>
              <div className="text-xs text-slate-500">{patient?.email || ''}</div>
            </div>

            {/* Лікар / Відповідальний */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">stethoscope</span>
                {msg.get('act.view_doctor')}
              </span>
              <div className="font-bold text-slate-900 text-sm">
                {doctor ? `${doctor.first_name} ${doctor.last_name}` : '-'}
              </div>
            </div>

            {/* Філіал / Склад */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">domain</span>
                {msg.get('act.view_clinic')}
              </span>
              <div className="font-bold text-slate-900 text-sm">
                {clinicData?.name || 'Основна клініка'}
              </div>
              <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {msg.get('act.view_doc_status')}
              </div>
            </div>
          </div>

          {/* Таблиця послуг та матеріалів */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {msg.get('act.view_doc_title')}
              </h3>
              <p className="text-xs text-slate-400">{msg.get('act.view_doc_description')}</p>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">№</th>
                  <th className="py-3 px-4">{msg.get('act.view_service')}</th>
                  <th className="py-3 px-4 text-center">{msg.get('act.view_qty')}</th>
                  <th className="py-3 px-4 text-right">{msg.get('act.view_price')}</th>
                  <th className="py-3 px-4 text-right">{msg.get('act.view_amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {formRowData.map((row: any, idx: number) => {
                  const components = Array.isArray(row.components) ? row.components : [];

                  return (
                    <React.Fragment key={`row-view-${idx}`}>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 text-center text-slate-400 font-bold">
                          {idx + 1}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800 text-sm">
                          {row.product || 'Послуга'}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                          {Number(row.qty ?? row.quantity ?? 1).toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                          {Number(row.price || 0).toFixed(2)} ₴
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 text-sm">
                          {Number(row.total || 0).toFixed(2)} ₴
                        </td>
                      </tr>

                      {/* Підрядки: використані матеріали */}
                      {components.length > 0 && (
                        <tr>
                          <td colSpan={5} className="py-2 px-4 bg-slate-50/30">
                            <div className="pl-6 space-y-1.5 border-l-2 border-teal-500/40 my-1">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                {msg.get('act.view_fifo_description')}:
                              </span>
                              {components.map((comp: any, cIdx: number) => (
                                <div
                                  key={`comp-view-${cIdx}`}
                                  className="flex items-center justify-between text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100"
                                >
                                  <span className="font-medium text-slate-800 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px] text-teal-600">
                                      subdirectory_arrow_right
                                    </span>
                                    {comp.product || `Матеріал #${comp.material_id}`}
                                  </span>
                                  <span className="font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded">
                                    {Number(comp.quantity || 0)} {comp.unit_name || 'од.'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {/* Підсумок */}
            <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                {msg.get('act.view_total_services')}:{' '}
                <strong className="text-slate-800">{formRowData.length}</strong>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                  {msg.get('act.view_total_pay')}
                </span>
                <span className="text-2xl font-black text-slate-900 tabular-nums">
                  {Number(formData.total_amount).toFixed(2)}{' '}
                  <span className="text-base font-bold text-slate-500">₴</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
