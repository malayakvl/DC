import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatientStatus from '../../Lang/PatientStatus/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatientStatus,
    locale: appLang,
  });

  // State для инлайн-формы
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Inertia Form State (настроено под поля name и discount для статуса пациента)
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    id: null,
    name: '',
    discount: '',
  });

  // Открыть форму на создание
  const handleOpenCreate = () => {
    clearErrors();
    reset();
    setEditingItem(null);
    setData({ id: null, name: '', discount: '' });
    setIsFormOpen(true);
  };

  // Открыть форму на редактирование
  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingItem(item);
    setData({
      id: item.id,
      name: item.name || '',
      discount: item.discount || '',
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

  // Сохранение (Создание / Обновление отправляется на ваш метод update/store)
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('patient.status.update'), {
      onSuccess: () => handleCloseForm(),
      preserveScroll: true,
    });
  };

  // Удаление
  const handleDelete = (id) => {
    if (confirm(msg.get('status.confirm.delete') || 'Видалити цей статус?')) {
      router.get(`/patient-status/delete/${id}`);
    }
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={msg.get('status.title.list')} />}>
      <Head title={msg.get('status.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('status.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('status.title.total')}
              description={msg.get('status.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('status.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
            />

            {/* Инлайн-форма */}
            {isFormOpen && (
              <section className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {!editingItem
                      ? msg.get('status.title.create') || 'Створити статус'
                      : `${msg.get('status.title.edit') || 'Редагувати статус'} (ID: ${editingItem?.id})`}
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
                  <div className="md:col-span-8 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('status.name') || 'Назва'}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="напр., VIP або Постійний"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                      required
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                  </div>

                  {/* Знижка % / Знижка */}
                  <div className="md:col-span-4 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('status.discount') || 'Знижка'}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={data.discount}
                        onChange={(e) => setData('discount', e.target.value)}
                        placeholder="10"
                        className="w-full px-3 py-2 pr-7 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-medium"
                      />
                      <span className="absolute right-3 text-xs text-slate-400 font-bold pointer-events-none">
                        %
                      </span>
                    </div>
                    {errors.discount && (
                      <span className="text-xs text-red-500">{errors.discount}</span>
                    )}
                  </div>

                  {/* Кнопка збереження */}
                  <div className="md:col-span-12 flex justify-end gap-2 mt-2">
                    <PrimaryButton type="submit" disabled={processing}>
                      {processing
                        ? 'Збереження...'
                        : editingItem
                          ? msg.get('status.update') || 'Оновити'
                          : msg.get('status.save') || 'Зберегти'}
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            )}

            {/* Таблица */}
            <section className="table-card">
              <DataTable paginationType={PaginationType.PATIENTSTATUSES} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="hover:bg-slate-50/80 transition-colors" key={item.id}>
                    <td className="py-3 pl-4 font-medium text-slate-900">{item.name}</td>
                    <td className="py-3">
                      {item.discount ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          {item.discount}%
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="text-right py-3 pr-4">
                      <div className="inline-flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="btn-edit mr-2"
                          title={msg.get('status.title.edit')}
                          onClick={() => handleOpenEdit(item)}
                        />
                        <button
                          type="button"
                          className="btn-delete"
                          title={msg.get('status.title.delete')}
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
