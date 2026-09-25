import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCurrency from '../../Lang/Currrency/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, clinicData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCurrency,
    locale: appLang,
  });

  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);

  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    name: '',
    symbol: '',
    rate: '',
    clinic_id: clinicData?.id || '',
  });

  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleOpenCreate = () => {
    reset();
    clearErrors();
    setData('clinic_id', clinicData?.id || '');
    setEditingId('create');
    scrollToForm();
  };

  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingId(item.id);
    setData({
      name: item.name || '',
      symbol: item.symbol || '',
      rate: item.rate || item.rate_value || '',
      clinic_id: clinicData?.id || '',
    });
    scrollToForm();
  };

  const handleCloseForm = () => {
    reset();
    clearErrors();
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId === 'create') {
      post('/currency/update', {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    } else {
      post(`/currency/update?id=${editingId}`, {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    }
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Currencies'} />}>
      <Head title={'Currencies'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('currency.title.list') || 'Валюти'}
              count={listData?.length || 0}
              totalLabel={msg.get('currency.title.total') || 'Всього'}
              description={
                msg.get('currency.title.description') || 'Управління курсами валют та позначеннями'
              }
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('currency.title.create') || 'Додати валюту'}
              isCreateDisabled={editingId === 'create'}
            />

            {/* Компактна інлайн-форма */}
            {editingId && (
              <section
                ref={formRef}
                className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200/80 shadow-sm transition-all scroll-mt-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {editingId === 'create'
                      ? msg.get('currency.title.create') || 'Створити валюту'
                      : `${msg.get('currency.title.edit') || 'Редагувати'} (ID: ${editingId})`}
                  </h3>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    {/* Назва валюти */}
                    <div className="md:col-span-5">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('currency.name') || 'Назва валюти'} *
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Наприклад: Долар США"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                        autoFocus
                      />
                      {errors.name && (
                        <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    {/* Символ */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('currency.symbol') || 'Символ'} *
                      </label>
                      <input
                        type="text"
                        value={data.symbol}
                        onChange={(e) => setData('symbol', e.target.value)}
                        placeholder="$"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                      />
                      {errors.symbol && (
                        <span className="text-xs text-rose-500 mt-1 block">{errors.symbol}</span>
                      )}
                    </div>

                    {/* Курс */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('currency.rate') || 'Курс'} *
                      </label>
                      <input
                        type="text"
                        value={data.rate}
                        onChange={(e) => setData('rate', e.target.value)}
                        placeholder="1.00"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                      />
                      {errors.rate && (
                        <span className="text-xs text-rose-500 mt-1 block">{errors.rate}</span>
                      )}
                    </div>

                    {/* Кнопка збереження */}
                    <div className="md:col-span-2 flex justify-end">
                      <PrimaryButton disabled={processing} className="w-full justify-center">
                        {processing ? '...' : msg.get('currency.save') || 'Зберегти'}
                      </PrimaryButton>
                    </div>
                  </div>
                </form>
              </section>
            )}

            {/* Таблиця валют */}
            <section className="table-card">
              <DataTable paginationType={PaginationType.CURRENCY} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="pl-3 font-medium text-slate-900">{item.name}</span>
                    </td>
                    <td>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-xs font-semibold">
                        {item.symbol}
                      </span>
                    </td>
                    <td>{item.rate_value || item.rate}</td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="actn-btns"
                        title={msg.get('currency.edit') || 'Редагувати'}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
