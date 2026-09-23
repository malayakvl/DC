import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCabinet from '../../Lang/Cabinet/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, filials = [] }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCabinet,
    locale: appLang,
  });

  // State для инлайн-формы
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Inertia Form State
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    id: null,
    name: '',
    filial_id: '',
    place_count: '',
  });

  // Открыть форму на создание
  const handleOpenCreate = () => {
    clearErrors();
    reset();
    setEditingItem(null);
    setData({ id: null, name: '', filial_id: '', place_count: '' });
    setIsFormOpen(true);
  };

  // Открыть форму на редактирование
  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingItem(item);
    setData({
      id: item.id,
      name: item.name || '',
      filial_id: item.filial_id || '',
      place_count: item.place_count || '',
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
    post(route('cabinet.update'), {
      onSuccess: () => handleCloseForm(),
      preserveScroll: true,
    });
  };

  // Удаление кабинета
  const handleDelete = (id) => {
    if (confirm(msg.get('cabinet.confirm.delete') || 'Видалити цей кабінет?')) {
      router.get(`/cabinet/delete/${id}`);
    }
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={msg.get('cabinet.title.list')} />}>
      <Head title={'Cabinets'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('cabinet.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('cabinet.title.total') || 'Всього'}
              description={msg.get('cabinet.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('cabinet.title.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
            />

            {/* Инлайн-форма */}
            {isFormOpen && (
              <section className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {!editingItem
                      ? msg.get('cabinet.title.create') || 'Створити кабінет'
                      : `${msg.get('cabinet.edit') || 'Редагувати'} (ID: ${editingItem?.id})`}
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
                  {/* Філія (якщо передається список філій, інакше можна адаптувати під текстове поле або випадаючий список) */}
                  <div className="md:col-span-4 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('cabinet.filial') || 'Філія'}
                    </label>
                    <select
                      value={data.filial_id}
                      onChange={(e) => setData('filial_id', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    >
                      <option value="">
                        — {msg.get('cabinet.select.filial') || 'Оберіть філію'} —
                      </option>
                      {filials.map((filial) => (
                        <option key={filial.id} value={filial.id}>
                          {filial.name}
                        </option>
                      ))}
                    </select>
                    {errors.filial_id && (
                      <span className="text-xs text-red-500">{errors.filial_id}</span>
                    )}
                  </div>

                  {/* Назва кабінету */}
                  <div className="md:col-span-5 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('cabinet.name') || 'Назва'}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="напр., Кабінет №1"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                      required
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                  </div>

                  {/* Кількість місць / Крісел */}
                  <div className="md:col-span-3 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('cabinet.place_count') || 'Кількість місць'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={data.place_count}
                      onChange={(e) => setData('place_count', e.target.value)}
                      placeholder="1"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-medium"
                    />
                    {errors.place_count && (
                      <span className="text-xs text-red-500">{errors.place_count}</span>
                    )}
                  </div>

                  {/* Кнопка збереження */}
                  <div className="md:col-span-12 flex justify-end gap-2 mt-2">
                    <PrimaryButton type="submit" disabled={processing}>
                      {processing
                        ? 'Збереження...'
                        : editingItem
                          ? msg.get('cabinet.update') || 'Оновити'
                          : msg.get('cabinet.save') || 'Зберегти'}
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            )}

            {/* Таблиця */}
            <section className="table-card">
              <DataTable paginationType={PaginationType.CABINETS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="hover:bg-slate-50/80 transition-colors" key={item.id}>
                    <td className="py-3 pl-4 font-medium text-slate-900">{item.name}</td>
                    <td className="py-3 text-slate-600">{item.filial_name}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                        {item.place_count}
                      </span>
                    </td>
                    <td className="text-right py-3 pr-4">
                      <div className="inline-flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="btn-edit mr-2"
                          title={msg.get('cabinet.edit')}
                          onClick={() => handleOpenEdit(item)}
                        />
                        <button
                          type="button"
                          className="btn-delete"
                          title={msg.get('cabinet.delete')}
                          onClick={() => handleDelete(item.id)}
                        />
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
