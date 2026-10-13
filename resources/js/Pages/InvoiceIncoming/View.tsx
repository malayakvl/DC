import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '@/Lang/InvoiceIncoming/translation';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function View({
  clinicData,
  customerData,
  producerData,
  storeData,
  formData,
  formRowData,
  currencyData,
  unitsData,
  taxData,
}: {
  clinicData: any;
  customerData: any;
  producerData: any;
  storeData: any;
  formData: any;
  formRowData: any;
  currencyData: any;
  unitsData: any;
  taxData: any;
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngInvoiceIncoming,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout
      header={
        <Head
          title={
            formData?.invoice_number
              ? `Накладна № ${formData.invoice_number}`
              : 'Прибуткова накладна'
          }
        />
      }
    >
      <Head
        title={
          formData?.invoice_number ? `Накладна № ${formData.invoice_number}` : 'Прибуткова накладна'
        }
      />

      <main className="max-w-[1600px] w-full mx-auto px-6 py-6 flex-1 flex flex-col gap-6">
        {/* 2. ХЛІБНІ КРИХТИ ТА ШАПКА ДОКУМЕНТА */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={'/invoice-incoming'}
                className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-teal-700 transition-all border border-slate-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {msg.get('invoice_incoming.title.list')} № {formData?.invoice_number || '---'}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span className="material-symbols-outlined text-[13px]">lock</span>
                {msg.get('invoice_incoming.for_reading')}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors shadow-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                {msg.get('invoice_incoming.print')}
              </button>
            </div>
          </div>
        </div>

        {/* 3. ЛАКОНІЧНИЙ СИСТЕМНИЙ БАНЕР СТАТУСУ */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-teal-50/70 border border-teal-200/80 text-teal-900 text-xs shadow-xs">
          <div className="flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-[18px] text-teal-700">
              verified_user
            </span>
            <span>{msg.get('invoice_incoming.document_blocked')}</span>
          </div>
          <span className="hidden md:inline-block font-mono text-[11px] text-teal-700/80 bg-teal-100/60 px-2 py-0.5 rounded border border-teal-200">
            ID: #{formData?.id || 'TX-0000'}
          </span>
        </div>

        {/* 4. КАРТКА РЕКВІЗИТІВ (4-колонкова) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-b sm:border-b-0 pb-4 sm:pb-0 sm:border-r border-slate-100 sm:pr-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                {msg.get('invoice_incoming.document')}
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                № {formData?.invoice_number || '---'}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                {msg.get('invoice_incoming.from')}{' '}
                {format(new Date(formData.invoice_date), 'dd.MM.yyyy HH:mm')}
              </div>
            </div>

            <div className="border-b sm:border-b-0 pb-4 sm:pb-0 lg:border-r border-slate-100 lg:pr-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                {msg.get('invoice_incoming.producer')}
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug truncate">
                {producerData?.name || '---'}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <span className="text-emerald-700 font-semibold">{taxData.name}</span>
              </div>
            </div>

            <div className="border-b sm:border-b-0 pb-4 sm:pb-0 sm:border-r border-slate-100 sm:pr-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">warehouse</span>
                {msg.get('invoice_incoming.store_income')}
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">{storeData}</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                ТТН: <span className="font-mono text-slate-700">{formData?.ttn || '—'}</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">badge</span>
                {msg.get('invoice_incoming.text_accounter')}
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {msg.get('invoice_incoming.sys_accounter')}
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {msg.get('invoice_incoming.doc_view_text')}
              </div>
            </div>
          </div>
        </div>

        {/* 5. ТАБЛИЧНА ЧАСТИНА МАТЕРІАЛІВ */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {msg.get('invoice_incoming.specification')}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Повний оприбуткований реєстр партії</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">№</th>
                  <th className="py-3 px-4 min-w-[280px]">
                    {msg.get('invoice_incoming.h_nomenclatura')}
                  </th>
                  <th className="py-3 px-3 text-center">{msg.get('invoice_incoming.unit')}</th>
                  <th className="py-3 px-4 text-right">{msg.get('invoice_incoming.qty')}</th>
                  <th className="py-3 px-4 text-right">{msg.get('invoice_incoming.factqty')}</th>
                  <th className="py-3 px-4 text-right">{msg.get('invoice_incoming.h_terms')}</th>
                  <th className="py-3 px-4 text-right">
                    {msg.get('invoice_incoming.price_per_unit')}
                  </th>
                  <th className="py-3 px-4 text-right whitespace-nowrap">
                    {msg.get('invoice_incoming.price')}
                  </th>
                  <th className="py-3 px-4 text-right whitespace-nowrap">
                    {msg.get('invoice_incoming.total')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {formRowData && formRowData.length > 0 ? (
                  formRowData.map((row: any, index: number) => (
                    <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                        {index + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {row.product || row.name || '—'}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center text-slate-600 font-medium">
                        {row.unit_name || 'од.'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm">
                        {parseFloat(row.quantity || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm">
                        {parseFloat(row.fact_qty || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 w-[70px]">
                        {row.expiry_date ? (
                          <span className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[14px] text-emerald-600">
                              event_available
                            </span>
                            {msg.get('invoice_incoming.until')}{' '}
                            {format(new Date(row.expiry_date), 'dd.MM.yyyy')}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700 whitespace-nowrap">
                        {parseFloat(row.price_per_unit || 0).toFixed(2)} ₴
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700 whitespace-nowrap">
                        {parseFloat(row.price || 0).toFixed(2)} ₴
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm whitespace-nowrap">
                        {parseFloat(row.total || 0).toFixed(2)} ₴
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-slate-400">
                      Позиції відсутні
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. ПІДСУМКОВА ПАНЕЛЬ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-700 text-[20px]">
                    inventory
                  </span>
                  {msg.get('invoice_incoming.store_view')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {msg.get('invoice_incoming.sync')}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-medium pt-4">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">
                    check_circle
                  </span>
                  <span>{msg.get('invoice_incoming.doc_footer_text')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">
                    check_circle
                  </span>
                  <span>{msg.get('invoice_incoming.tems_text')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-700 text-[20px]">
                    account_balance_wallet
                  </span>
                  {msg.get('invoice_incoming.fin_total_text')}
                </h3>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {msg.get('invoice_incoming.currency')}: {currencyData.name} ({currencyData.symbol})
                </span>
              </div>
              <div className="space-y-2.5 my-4">
                <div className="p-3.5 bg-teal-50/70 border border-teal-200/90 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 block">
                      ВСЬОГО ДО СПЛАТИ
                    </span>
                    <span className="text-2xl font-bold text-teal-900 tracking-tight leading-none mt-0.5 block">
                      {parseFloat(formData?.net_amount) + parseFloat(formData?.total_tax)} ₴
                      <span className={'ml-3 inline-block text-[16px]'}>
                        {taxData.name}:&nbsp;{formData?.total_tax}
                      </span>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthenticatedLayout>
  );
}
