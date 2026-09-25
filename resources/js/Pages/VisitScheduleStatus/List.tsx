import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngVisitScheduleStatus from '../../Lang/VisitScheduleStatus/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngVisitScheduleStatus,
    locale: appLang,
  });

  // State для инлайн-формы
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Inertia Form State
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    id: null,
    name: '',
    color: '#319795', // дефолтный цвет для статуса
  });

  // Открыть форму на создание
  const handleOpenCreate = () => {
    clearErrors();
    reset();
    setEditingItem(null);
    setData({ id: null, name: '', color: '#319795' });
    setIsFormOpen(true);
  };

  // Открыть форму на редактирование
  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingItem(item);
    setData({
      id: item.id,
      name: item.name || '',
      color: item.color || '',
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

  // Отправка формы создания / обновления
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/visit-schedule-status/update', {
      onSuccess: () => {
        handleCloseForm();
      },
      preserveScroll: true,
    });
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Visit Schedule Status'} />}>
      <Head title={'Visit Schedule Status'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('status.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('status.title.total') || 'Всього'}
              description={msg.get('status.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('status.title.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
            />

            {/* Инлайн-форма для добавления/редактирования статуса */}
            {isFormOpen && (
              <section className="mb-6 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {msg.get('status.title.create') || 'Новий статус'}
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
                  <div className="md:col-span-8 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('status.name') || 'Назва'}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="напр., Заплановано"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition"
                      required
                    />
                    {errors.name && <span className="text-xs text-rose-500">{errors.name}</span>}
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">Колір</label>
                    <input
                      type="color"
                      value={data.color}
                      onChange={(e) => setData('color', e.target.value)}
                      className="w-full h-[38px] px-1 py-1 bg-slate-50/50 border border-slate-200 rounded-xl cursor-pointer"
                    />
                    {errors.color && <span className="text-xs text-rose-500">{errors.color}</span>}
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <PrimaryButton
                      type="submit"
                      disabled={processing}
                      className="w-full justify-center h-[38px]"
                    >
                      {processing ? 'Збереження...' : 'Зберегти'}
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            )}

            <section className="table-card">
              <DataTable
                paginationType={PaginationType.VISITSCHEDULESTATUSES}
                sendRequest={sendRequest}
              >
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td className="">{item.name}</td>
                    <td className="">
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: item.color,
                          border: '1px solid #ccc',
                          borderRadius: '3px',
                        }}
                      />
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="actn-btns"
                        title={msg.get('cabinet.edit')}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </button>
                      <Link
                        className="actn-btns actn-delete"
                        title={msg.get('cabinet.delete')}
                        href={`/schedule-status/delete/${item.id}`}
                        method="delete"
                        as="button"
                        preserveScroll
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
