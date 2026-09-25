import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPaymentMethod from '../../Lang/PaymentMethod/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, currencies = [] }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPaymentMethod,
    locale: appLang,
  });

  // State для инлайн-формы
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Inertia Form State
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    id: null,
    name: '',
    currency_id: '',
  });

  // Открыть форму на создание
  const handleOpenCreate = () => {
    clearErrors();
    reset();
    setEditingItem(null);
    setData({ id: null, name: '', currency_id: '' });
    setIsFormOpen(true);
  };

  // Открыть форму на редактирование
  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingItem(item);
    setData({
      id: item.id,
      name: item.name || '',
      currency_id: item.currency_id || '',
    });
    setIsFormOpen(true);
  };

  // Закрыть форму
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    reset();
    clearErrors();
  };

  // Сохранение (Создание / Обновление)
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/payment-method/update', {
      onSuccess: () => handleCloseForm(),
      preserveScroll: true,
    });
  };

  // Удаление
  const handleDelete = (id) => {
    if (confirm(msg.get('payment_method.confirm.delete') || 'Видалити цей метод оплати?')) {
      router.get(`/payment-method/delete/${id}`);
    }
  };

  const sendRequest = useCallback(() => {
    //
  }, []);

  return (
    <AuthenticatedLayout header={<Head title={msg.get('payment_method.title.list')} />}>
      <Head title={msg.get('payment_method.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('payment_method.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('payment_method.title.total') || 'Всього'}
              description={
                msg.get('payment_method.title.description') ||
                'Керуйте способами оплати та пов’язаними валютами'
              }
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('payment_method.title.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
            />

            {/* Инлайн-форма */}
            {isFormOpen && (
              <section className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {!editingItem
                      ? msg.get('payment_method.title.create') || 'Створити метод оплати'
                      : `${msg.get('payment_method.edit') || 'Редагувати'} (ID: ${editingItem?.id})`}
                  </h3>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
                >
                  {/* Назва */}
                  <div className="md:col-span-7 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('payment_method.name') || 'Назва'}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="напр., Готівка або Термінал"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                      required
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                  </div>

                  {/* Валюта */}
                  <div className="md:col-span-5 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('payment_method.currency') || 'Валюта'}
                    </label>
                    <select
                      value={data.currency_id}
                      onChange={(e) => setData('currency_id', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    >
                      <option value="">
                        — {msg.get('payment_method.select.currency') || 'Оберіть валюту'} —
                      </option>
                      {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name}
                        </option>
                      ))}
                    </select>
                    {errors.currency_id && (
                      <span className="text-xs text-red-500">{errors.currency_id}</span>
                    )}
                  </div>

                  {/* Кнопка збереження */}
                  <div className="md:col-span-12 flex justify-end gap-2 mt-2">
                    <PrimaryButton type="submit" disabled={processing}>
                      {processing
                        ? 'Збереження...'
                        : editingItem
                          ? msg.get('payment_method.update') || 'Оновити'
                          : msg.get('payment_method.save') || 'Зберегти'}
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            )}

            {/* Таблиця */}
            <section className="table-card">
              <DataTable paginationType={PaginationType.PAYMENTMETHODS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="hover:bg-slate-50/80 transition-colors" key={item.id}>
                    <td className="py-3 pl-4 font-medium text-slate-900">{item.name}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                        {item.currency_name}
                      </span>
                    </td>
                    <td className="text-right py-3 pr-4">
                      <div className="inline-flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="actn-btns"
                          title={msg.get('payment_method.edit')}
                          onClick={() => handleOpenEdit(item)}
                        >
                          <span className="material-symbols-outlined text-[18px] block">edit</span>
                        </button>
                        <button
                          type="button"
                          className="actn-btns"
                          title={msg.get('payment_method.delete')}
                          onClick={() => handleDelete(item.id)}
                        >
                          <span className="material-symbols-outlined text-[18px] block">
                            delete
                          </span>
                        </button>
                      </div>
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
