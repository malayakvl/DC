import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngSupplier from '../../Lang/Supplier/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, clinicData }: { listData: any; clinicData: any }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngSupplier,
    locale: appLang,
  });

  const [editingId, setEditingId] = useState<any>(null);
  const [editingItem] = useState<any>(null);

  const formRef = useRef<HTMLDivElement | null>(null);

  // useForm строго под поля твоей схемы suppliers
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<any>({
    name: '',
    contact_name: '',
    phone: '',
    email: '',
    address: '',
    bank_number: '',
    edrpou: '',
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

  const handleOpenEdit = (item: any) => {
    clearErrors();
    setEditingId(item.id);
    setData({
      name: item.name || '',
      contact_name: item.contact_name || '',
      phone: item.phone || '',
      email: item.email || '',
      address: item.address || '',
      clinic_id: clinicData.id,
      bank_number: item.bank_number || '',
      edrpou: item.edurpou || '',
    });
    scrollToForm();
  };

  const handleCloseForm = () => {
    reset();
    clearErrors();
    setEditingId(null);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (editingId === 'create') {
      post('/supplier/update', {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    } else {
      put(`/supplier/update/${editingId}`, {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    }
  };

  return (
    <AuthenticatedLayout header={<Head title={'Suppliers'} />}>
      <Head title={'Suppliers'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('supplier.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('supplier.title.total')}
              description={msg.get('supplier.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('supplier.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
              createHref={null}
            />
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
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.name')}
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder={msg.get('supplier.name_tips')}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                        autoFocus
                      />
                      {errors.name && (
                        <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.edrpou')}
                      </label>
                      <input
                        type="text"
                        value={data.edrpou}
                        onChange={(e) => setData('edrpou', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                        autoFocus
                      />
                      {errors.edrpou && (
                        <span className="text-xs text-rose-500 mt-1 block">{errors.edrpou}</span>
                      )}
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {msg.get('supplier.bank_number')} *
                      </label>
                      <input
                        type="text"
                        value={data.bank_number}
                        onChange={(e) => setData('bank_number', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                        autoFocus
                      />
                      {errors.bank_number && (
                        <span className="text-xs text-rose-500 mt-1 block">
                          {errors.bank_number}
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-3">
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
              <DataTable paginationType={PaginationType.SUPPLIERS}>
                {listData?.map((item: any) => (
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
                      {item.edrpou && (
                        <span className="text-xs font-medium text-slate-700 block">
                          {item.edrpou || '—'}
                        </span>
                      )}
                      {item.bank_number && (
                        <>
                          <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] text-teal-700 font-mono bg-teal-50/80 px-1.5 py-0.5 rounded border border-teal-200/40 w-fit">
                            <svg
                              className="w-3 h-3 text-teal-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M12 3L2 8h20L12 3z"
                              ></path>
                            </svg>
                            <span>{item.bank_number || '—'}</span>
                            <button
                              className="hover:text-teal-900 transition-colors"
                              title="Скопіювати штрихкод"
                              type="button"
                            >
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></path>
                              </svg>
                            </button>
                          </div>{' '}
                        </>
                      )}
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
                        className="actn-btns"
                        title={msg.get('supplier.edit')}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </button>
                      <Link
                        className="actn-btns hover:bg-rose-50 hover:text-rose-600"
                        title={msg.get('supplier.delete') || 'Видалити'}
                        href={`/supplier/delete/${item.id}`}
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
      </div>
    </AuthenticatedLayout>
  );
}
