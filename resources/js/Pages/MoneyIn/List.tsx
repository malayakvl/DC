import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMoneyIn from '../../Lang/MoneyIn/translation';
import lngDropdown from '../../Lang/Dropdown/translation';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import Filters from './Partials/Filters';
import Pagination from './Partials/Pagination';

export default function List({
  listData,
  filters,
  paymentMethods,
  customerData,
  statusData,
  currencyData,
}: {
  listData: any;
  filters: any;
  paymentMethods: any[];
  customerData: any[];
  statusData: any[];
  currencyData: any[];
}) {
  const appLang = useSelector(appLangSelector);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Modal & Edit State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [amount, setAmount] = useState('0');
  const [currency, setCurrency] = useState('UAH');
  const [currencySymbol, setCurrencySymbol] = useState('₴');
  const [docNumber, setDocNumber] = useState('№-000125');
  const [status, setStatus] = useState('processed');
  const [cashAccount, setCashAccount] = useState('');
  const [responsibleUser, setResponsibleUser] = useState(customerData?.[0]?.id || '');
  const [selectedBalance] = useState(0);
  const [paymentNote, setPaymentNote] = useState('');
  const [paymentDate, setPaymentDate] = useState(getTodayDate());
  const [isFiscalCheck, setIsFiscalCheck] = useState(true);

  const msg = new Lang({
    messages: lngMoneyIn,
    locale: appLang,
  });
  new Lang({
    messages: lngDropdown,
    locale: appLang,
  });

  // Amount Helper Functions
  const parseAmount = (val: string) => {
    if (!val) return 0;
    const clean = val
      .toString()
      .replace(',', '.')
      .replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  };

  const formatAmountStr = (num: number) =>
    num.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleAddAmount = (delta: number) => {
    const current = parseAmount(amount);
    setAmount(formatAmountStr(current + delta));
  };

  const handleSetExactAmount = (val: number) => {
    setAmount(formatAmountStr(val));
  };

  const handleCurrencyChange = (curr: string, sym: string) => {
    setCurrency(curr);
    setCurrencySymbol(sym);
  };

  // Открытие модалки для создания нового платежа
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setDocNumber('№-000125');
    setPaymentDate(getTodayDate());
    setStatus('processed');
    setCashAccount('');
    setResponsibleUser(customerData?.[0]?.id || '');
    setAmount('0');
    setCurrency('UAH');
    setCurrencySymbol('₴');
    setPaymentNote('');
    setIsFiscalCheck(true);
    setShowModal(true);
  };

  // Открытие модалки для редактирования существующего платежа
  // Открытие модалки для редактирования существующего платежа
  const handleOpenEditModal = (item: any) => {
    setEditingId(item.id);
    setDocNumber(item.document_number || '');
    setPaymentDate(
      item.document_date ? String(item.document_date).substring(0, 10) : getTodayDate()
    );
    setStatus(item.status || 'processed');
    // Приводим ID к строке для корректного выбора в <select>
    setCashAccount(item.account_id ? String(item.account_id) : '');
    setResponsibleUser(item.created_by_id ? String(item.created_by_id) : '');
    setAmount(item.amount ? String(item.amount) : '0');

    // Определение валюты по currency_id или названию
    const currObj = currencyData?.find(
      (c: any) => String(c.id) === String(item.currency_id) || c.name === item.currency_name
    );
    if (currObj) {
      setCurrency(currObj.name);
      setCurrencySymbol(currObj.symbol);
    } else {
      setCurrency('UAH');
      setCurrencySymbol('₴');
    }

    // В базе поле называется `comment`
    setPaymentNote(item.comment || item.note || '');
    setIsFiscalCheck(item.is_fiscal ?? true);
    setShowModal(true);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Если есть editingId, отправляем на эндпоинт обновления, иначе на создание
    const url = editingId ? `/money-in/update` : '/money-in';

    router.post(
      url,
      {
        id: editingId,
        document_number: docNumber,
        document_date: paymentDate,
        status,
        account_id: cashAccount,
        customer_id: responsibleUser,
        amount: parseAmount(amount),
        currency_id: currency, // Либо id валюты, в зависимости от бэкенда
        note: paymentNote,
        is_fiscal: isFiscalCheck,
      },
      {
        onSuccess: () => {
          setShowModal(false);
        },
      }
    );
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Money In'} />
      <div>
        <div className="p-3.5 mb-8 content-data bg-content">
          <section className="mb-6 mt-2">
            <header className="pb-4 border-b border-surface-container-low">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Лівий блок: Заголовок + Бейдж + Підзаголовок */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-xl font-bold text-on-surface tracking-tight">
                      {msg.get('money_in.title.list')}
                    </h1>

                    {/* Бейдж кількості */}
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                      {listData?.length || 0} {msg.get('money_in.title.total')}
                    </span>
                  </div>

                  {/* Підзаголовок */}
                  <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                    {msg.get('money_in.title.description')}
                  </p>
                </div>

                {/* Правий блок: Кнопка створення */}
                <button
                  className={
                    'group relative inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-md bg-orange-500 hover:bg-orange-700 text-white font-bold text-sm'
                  }
                  onClick={handleOpenCreateModal}
                >
                  <span className="material-symbols-outlined text-[18px] mt-[-5px]">add</span>
                  <span className="text-[13px]">{msg.get('money_in.title.create')}</span>
                </button>
              </div>
            </header>
          </section>

          <Filters
            paymentMethods={paymentMethods}
            customerData={customerData}
            statusData={statusData}
            totalCount={listData.length | 0}
          />

          <Pagination listData={listData} />

          <section className="table-card mt-4">
            <DataTable paginationType={PaginationType.MONEYIN}>
              {listData?.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.document_number}</td>
                  <td>
                    {item.document_date
                      ? format(new Date(item.document_date), 'dd.MM.yyyy HH:mm')
                      : ''}
                  </td>
                  <td>
                    <span
                      className={`doc-status ${
                        item.status === 'draft' ? 'status-new' : 'status-posted'
                      }`}
                    >
                      <span className="status-dot"></span>
                      {msg.get(`money_in.${item.status}`)}
                    </span>
                  </td>
                  <td>{item.payment_method_name}</td>
                  <td>
                    {item.amount} {item.currency_name}
                  </td>
                  <td>{item.created_by}</td>
                  <td className="text-right flex items-center justify-end gap-1">
                    <button
                      type="button"
                      className="actn-btns"
                      title={msg.get('money_in.money_in.edit')}
                      onClick={() => handleOpenEditModal(item)}
                    >
                      <span className="material-symbols-outlined text-[18px] block">edit</span>
                    </button>
                    <Link
                      className="actn-btns hover:bg-rose-50 hover:text-rose-600"
                      title={msg.get('filial.filial.delete') || 'Видалити'}
                      href={`money-in/delete/${item.id}`}
                    >
                      <span className="material-symbols-outlined text-[18px] block">delete</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </DataTable>
          </section>
        </div>
      </div>

      {/* ================= MODAL: НОВИЙ / РЕДАГУВАННЯ ПЛАТІЖУ ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-[670px] bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col transition-all">
            {/* Top Color Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600"></div>

            {/* Header */}
            <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4 border-b border-gray-100">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">
                    {editingId ? 'edit_document' : 'payments'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-0 pb-0">
                      {editingId ? 'Редагувати платіж' : 'Новий платіж'}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Надходження
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {editingId
                      ? 'Зміна параметрів та фіксація даних існуючого платежу'
                      : 'Оприбуткування та фіксація надходження коштів на касу або рахунок клініки'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
                onClick={() => setShowModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Form Content */}
            <form
              onSubmit={handleSubmitPayment}
              className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto"
            >
              {/* Section 1: Transaction Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                {/* Doc Number */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Номер документа
                  </label>
                  <div className="relative flex items-center h-[38px] bg-white px-2.5 rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600">
                    <div className="flex items-center gap-1 min-w-0 w-full">
                      <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0">
                        tag
                      </span>
                      <input
                        type="text"
                        className="w-full bg-transparent text-xs font-bold text-gray-800 outline-none border-0 p-0 focus:ring-0"
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        placeholder="№ документа"
                      />
                    </div>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Дата проведення
                  </label>
                  <div className="relative flex items-center h-[38px] bg-white px-2.5 rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] mr-1.5 shrink-0">
                      calendar_today
                    </span>
                    <input
                      type="date"
                      className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none cursor-pointer border-0 p-0 focus:ring-0"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status Select */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Статус транзакції
                  </label>
                  <div className="relative flex items-center h-[38px] bg-white px-2.5 rounded-lg border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mr-2 animate-pulse"></span>
                    <select
                      className="w-full bg-transparent text-xs border-0 font-semibold text-gray-800 outline-none cursor-pointer appearance-none pr-4 p-0 focus:ring-0"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {statusData && (
                        <>
                          {statusData.map((statusItem, index) => (
                            <option key={`status-${index}`} value={statusItem.id}>
                              {msg.get('money_in.' + statusItem.name.toLowerCase())}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Account & Responsible Staff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Account Dropdown */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700">
                      Рахунок / Каса зарахування
                    </label>
                    <span className="text-[11px] font-bold text-emerald-600">
                      Баланс: {selectedBalance} ₴
                    </span>
                  </div>
                  <div className="relative flex items-center h-[42px] bg-white px-2 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mr-2.5 shrink-0 border border-emerald-100">
                      <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <select
                        className="w-full bg-transparent text-xs font-bold text-gray-900 outline-none cursor-pointer appearance-none pr-4 border-0 p-0 focus:ring-0"
                        value={cashAccount}
                        onChange={(e) => setCashAccount(e.target.value)}
                      >
                        <option value="">Оберіть рахунок/касу</option>
                        {paymentMethods &&
                          paymentMethods.map((payment, index) => (
                            <option key={`payment-${index}`} value={String(payment.id)}>
                              {payment.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Responsible Officer */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700">
                      Відповідальна особа
                    </label>
                  </div>
                  <div className="relative flex items-center h-[42px] bg-white px-2 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg overflow-hidden mr-2.5 shrink-0 bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                      {/* Динамічні ініціали вибраного користувача */}
                      {(() => {
                        const selected = customerData?.find(
                          (c: any) => String(c.id) === String(responsibleUser)
                        );
                        const name = selected?.name || '—';
                        if (!selected || name === '—') return '—';

                        const parts = name.trim().split(' ');
                        if (parts.length >= 2) {
                          return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase();
                        }
                        return name.substring(0, 2).toUpperCase();
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <select
                        className="w-full border-0 bg-transparent text-xs font-bold text-gray-900 outline-none cursor-pointer appearance-none pr-4 p-0 focus:ring-0"
                        value={responsibleUser}
                        onChange={(e) => setResponsibleUser(e.target.value)}
                      >
                        <option value="">Оберіть значення</option>
                        {customerData?.map((customer: any, cIndx: number) => (
                          <option key={`customer-${cIndx}`} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Amount Block */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/50 via-gray-50 to-emerald-50/30 border border-emerald-100/80 relative shadow-sm">
                <div className="flex items-center justify-between mb-2 pb-2">
                  <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">
                      account_balance_wallet
                    </span>
                    Сума надходження до сплати
                  </label>
                </div>

                {/* Amount Input + Currency Switcher */}
                <div className="flex items-center bg-white rounded-xl p-1 border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-emerald-600 focus-within:border-transparent transition-all">
                  <div className="relative flex-1 flex items-center pl-2">
                    <span className="text-2xl font-bold text-emerald-600 mr-2 select-none">
                      {currencySymbol}
                    </span>
                    <input
                      type="text"
                      className="w-full border-0 bg-transparent text-2xl font-bold text-gray-900 outline-none tracking-tight"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>

                  {/* Currency Pills */}
                  <div className="shrink-0 pl-2">
                    <div className="flex items-center bg-gray-100 p-1 rounded-lg gap-1">
                      {currencyData?.map((curr: any) => (
                        <button
                          key={`currency-${curr.id}`}
                          type="button"
                          onClick={() => handleCurrencyChange(curr.name, curr.symbol)}
                          className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                            currency === curr.name
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {curr.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Amount Presets */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-medium text-gray-500 mr-1">Швидкі суми:</span>
                  <button
                    type="button"
                    onClick={() => handleAddAmount(500)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200 transition-all shadow-sm active:scale-95"
                  >
                    +500 {currencySymbol}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddAmount(1000)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200 transition-all shadow-sm active:scale-95"
                  >
                    +1 000 {currencySymbol}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetExactAmount(2000)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    2 000 {currencySymbol}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetExactAmount(5000)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200 transition-all shadow-sm active:scale-95"
                  >
                    5 000 {currencySymbol}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetExactAmount(10000)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200 transition-all shadow-sm active:scale-95"
                  >
                    10 000 {currencySymbol}
                  </button>
                </div>
              </div>

              {/* Примітка / Призначення платежу */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Примітка / Призначення платежу
                </label>
                <textarea
                  className="w-full bg-white px-2.5 py-2 text-xs font-semibold text-gray-800 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none resize-none"
                  rows={2}
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  placeholder="Введіть примітку до платежу..."
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">
                    lock
                  </span>
                  <span className="text-gray-500 text-[11px]">Захищений запис у журнал</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowModal(false)}
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>
                      {editingId ? 'Зберегти зміни' : `Оприбуткувати ${amount} ${currencySymbol}`}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
