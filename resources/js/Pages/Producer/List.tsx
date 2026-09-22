import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngProducer from '../../Lang/Producer/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';

export default function List({ listData, clinicData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngProducer,
    locale: appLang,
  });
  console.log(clinicData);

  // Стан для форми: null — закрита, 'create' — створення, або ID елемента — редагування
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);

  // Inertia useForm для Producer (тільки назва)
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    name: '',
  });

  // Функция для плавного скролла к форме
  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Відкриття форми для створення
  const handleOpenCreate = () => {
    reset();
    clearErrors();
    setEditingId('create');
    scrollToForm();
  };

  // Відкриття форми для редагування
  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingId(item.id);
    setData({
      name: item.name || '',
      clinic_id: clinicData.id,
    });
    scrollToForm();
  };

  // Закриття форми
  const handleCloseForm = () => {
    reset();
    clearErrors();
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId === 'create') {
      post('/producer/store', {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    } else {
      put(`/producer/update/${editingId}`, {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    }
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Producers'} />}>
      <Head title={'Producers'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <section className="mb-6">
              <header className="mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  {/* Лівий блок: Заголовок + Бейдж + Підзаголовок */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        {msg.get('producer.title.list')}
                      </h1>

                      {/* Бейдж кількості */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                        {listData?.length || 0} {msg.get('producer.title.total')}
                      </span>
                    </div>

                    {/* Підзаголовок */}
                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {msg.get('producer.title.description')}
                    </p>
                  </div>

                  {/* Правий блок: Перемикач кнопки */}
                  <div className="flex items-center shrink-0">
                    <PrimaryButton
                      type="button"
                      onClick={handleOpenCreate}
                      disabled={Boolean(editingId)} // заблокована, якщо є активний editingId
                      className={editingId ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      {msg.get('producer.create')}
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>

            {/* Інлайн-форма створення / редагування */}
            {editingId && (
              <section
                ref={formRef}
                className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200/80 shadow-sm transition-all scroll-mt-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {editingId === 'create'
                      ? msg.get('producer.title.create')
                      : `${msg.get('producer.title.edit')} (ID: ${editingId})`}
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
                  <div className="md:col-span-10">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {msg.get('producer.name')}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Наприклад: Cerkamed, 3M ESPE, Dentsply Sirona"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                      autoFocus
                    />
                    {errors.name && (
                      <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <PrimaryButton
                      disabled={processing}
                      className="w-full sm:w-auto justify-center"
                    >
                      {processing
                        ? '...'
                        : editingId === 'create'
                          ? msg.get('producer.save')
                          : msg.get('producer.update')}
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            )}

            {/* Таблиця даних */}
            <section className="table-card">
              <DataTable paginationType={PaginationType.PRODUCERS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="pl-2 font-medium text-slate-800">{item.name}</span>
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn-edit mr-2"
                        title={msg.get('producer.edit')}
                        onClick={() => handleOpenEdit(item)}
                      />
                      <Link
                        className="btn-delete"
                        title={msg.get('producer.delete')}
                        href={`/producer/delete/${item.id}`}
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
