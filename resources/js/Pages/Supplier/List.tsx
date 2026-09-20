import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngSupplier from '../../Lang/Supplier/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';

export default function List({ listData, clinicData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngSupplier,
    locale: appLang,
  });

  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);

  // useForm строго под поля твоей схемы suppliers
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    name: '',
    contact_name: '',
    phone: '',
    email: '',
    address: '',
  });

  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleOpenCreate = () => {
    reset();
    clearErrors();
    setEditingId('create');
    scrollToForm();
  };

  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingId(item.id);
    setData({
      name: item.name || '',
      contact_name: item.contact_name || '',
      phone: item.phone || '',
      email: item.email || '',
      address: item.address || '',
      clinic_id: clinicData.id,
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
      post('/supplier/update', {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    } else {
      console.log(1);
      put(`/supplier/update/${editingId}`, {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    }
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Suppliers'} />}>
      <Head title={'Suppliers'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <section className="mb-6">
              <header className="mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  {/* Заголовок + Бейдж + Подзаголовок */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        {msg.get('supplier.title.list')}
                      </h1>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                        {listData?.length || 0} {msg.get('supplier.title.total')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {msg.get('supplier.title.description')}
                    </p>
                  </div>

                  {/* Кнопка создания / отмены */}
                  <div className="flex items-center shrink-0">
                    <PrimaryButton
                      type="button"
                      onClick={handleOpenCreate}
                      disabled={Boolean(editingId)} // заблокована, якщо є активний editingId
                      className={editingId ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      + {msg.get('supplier.create')}
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>

            {/* Компактная инлайн-форма на 2 строки */}
            {editingId && (
              <section
                ref={formRef}
                className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200/80 shadow-sm transition-all scroll-mt-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {editingId === 'create'
                      ? msg.get('supplier.title.create')
                      : `${msg.get('supplier.title.edit')} (ID: ${editingId})`}
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
                  {/* Строка 1: Название и Контактное лицо */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-7">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.name')} *
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder='Наприклад: ТОВ "Дент-Маркет"'
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                        autoFocus
                      />
                      {errors.name && (
                        <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.contact_name')}
                      </label>
                      <input
                        type="text"
                        value={data.contact_name}
                        onChange={(e) => setData('contact_name', e.target.value)}
                        placeholder="Олексій (менеджер)"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Строка 2: Телефон, Email, Адрес и Кнопка */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.phone')}
                      </label>
                      <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="+380..."
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.email')}
                      </label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="order@dent.com"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.address')}
                      </label>
                      <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Нова Пошта №5 або адреса"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                      <PrimaryButton disabled={processing} className="w-full justify-center">
                        {processing
                          ? '...'
                          : editingId === 'create'
                            ? msg.get('supplier.save')
                            : msg.get('supplier.update')}
                      </PrimaryButton>
                    </div>
                  </div>
                </form>
              </section>
            )}

            {/* Таблица поставщиков */}
            <section className="table-card">
              <DataTable paginationType={PaginationType.SUPPLIERS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="pl-2">
                        <div className="font-medium text-slate-900">{item.name}</div>
                        {item.address && (
                          <div className="text-xs text-slate-400 leading-tight">{item.address}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-slate-700">
                        {item.contact_name || '—'}
                      </span>
                    </td>
                    <td>
                      <div className="text-xs text-slate-600">
                        {item.phone && <div>{item.phone}</div>}
                        {item.email && <div className="text-slate-400">{item.email}</div>}
                        {!item.phone && !item.email && '—'}
                      </div>
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn-edit mr-2"
                        title={msg.get('supplier.edit')}
                        onClick={() => handleOpenEdit(item)}
                      />
                      <Link
                        className="btn-delete"
                        title={msg.get('supplier.delete')}
                        href={`/supplier/delete/${item.id}`}
                        method="delete"
                        as="button"
                        preserveScroll
                      />
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
