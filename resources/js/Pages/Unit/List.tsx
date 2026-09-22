import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngUnit from '../../Lang/Unit/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngUnit,
    locale: appLang,
  });

  // Стан для форми: null — закрита, 'create' — створення, або ID елемента — редагування
  const [editingId, setEditingId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const formRef = useRef(null);

  // Inertia useForm
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    name: '',
    short_name: '',
    code: '',
    classification: 'piece',
    is_fractional: false,
  });

  // Функция для плавного скролла к форме
  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // небольшая задержка, чтобы React успел отрисовать открытую форму
  };

  // Відкриття форми для створення
  const handleOpenCreate = () => {
    reset();
    clearErrors();
    setEditingId('create');
    scrollToForm(); // <--- Скроллим наверх
  };

  // Відкриття форми для редагування з заповненням даних
  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingId(item.id);
    setData({
      name: item.name || '',
      short_name: item.short_name || '',
      unit_qty: item.unit_qty || 1,
      classification: item.classification || 'piece',
      is_fractional: Boolean(item.is_fractional),
    });
    scrollToForm(); // <--- Скроллим наверх
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
      post('/unit/update', {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    } else {
      // Маршрут оновлення (підлаштуй URL під свій роут, наприклад /unit/update/${editingId} або put)
      put(`/unit/update/${editingId}`, {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    }
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Unit'} />}>
      <Head title={'Unit'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('unit.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('unit.title.total')}
              description={msg.get('unit.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('unit.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
            />
            {/* Єдина інлайн-форма для Створення та Редагування */}
            {editingId && (
              <section
                ref={formRef}
                className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200/80 shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {editingId === 'create'
                      ? msg.get('unit.title.edit')
                      : `${msg.get('unit.title.edit')} (ID: ${editingId})`}
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
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                >
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {msg.get('unit.name')}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Наприклад: Флакон"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    />
                    {errors.name && <span className="text-xs text-rose-500">{errors.name}</span>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {msg.get('unit.short_name')}
                    </label>
                    <input
                      type="text"
                      value={data.short_name}
                      onChange={(e) => setData('short_name', e.target.value)}
                      placeholder="фл"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {msg.get('unit.code')}
                    </label>
                    <input
                      type="text"
                      value={data.code}
                      onChange={(e) => setData('code', e.target.value)}
                      placeholder="фл"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {msg.get('unit.fact_qty')}
                    </label>
                    <input
                      type="text"
                      value={data.unit_qty}
                      onChange={(e) => setData('unit_qty', e.target.value)}
                      placeholder="10"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {msg.get('unit.classificationt')}
                    </label>
                    <select
                      value={data.classification}
                      onChange={(e) => setData('classification', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    >
                      <option value="piece">{msg.get('unit.classification.piece')}</option>
                      <option value="volume">{msg.get('unit.classification.volume')}</option>
                      <option value="weight">{msg.get('unit.classification.weight')}</option>
                    </select>
                  </div>

                  <div className="md:col-span-1 flex justify-end pt-3">
                    <PrimaryButton disabled={processing}>
                      {processing ? '...' : editingId === 'create' ? 'Зберегти' : 'Оновити'}
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            )}

            <section className="table-card">
              <DataTable paginationType={PaginationType.UNITS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td>
                      <span className="pl-2">{item.name}</span>
                    </td>
                    <td>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-slate-600 font-bold text-xs">
                        {item.short_name}
                      </span>
                    </td>
                    <td className="">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-bold text-xs">
                        {item.code}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium inline-flex items-center gap-1">
                        {msg.get(`unit.classification.${item.classification}`)}
                      </span>
                    </td>
                    <td className="">{item.unit_qty}</td>
                    <td className="text-right">
                      {/* Кнопка редагування тепер відкриває інлайн-форму замість переходу за посиланням */}
                      <button
                        type="button"
                        className="btn-edit mr-2"
                        title={msg.get('unit.edit')}
                        onClick={() => handleOpenEdit(item)}
                      />
                      <Link
                        className="btn-delete"
                        title={msg.get('unit.delete')}
                        href={`unit/delete/${item.id}`}
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
