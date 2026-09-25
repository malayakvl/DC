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
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, clinicData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngProducer,
    locale: appLang,
  });

  // Стан для форми: null — закрита, 'create' — створення, або ID елемента — редагування
  const [editingId, setEditingId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
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
            <ListHeader
              title={msg.get('producer.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('producer.title.total')}
              description={msg.get('producer.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('producer.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
            />
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
                        className="actn-btns"
                        title={msg.get('producer.edit')}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </button>
                      <Link
                        className="actn-btns"
                        title={msg.get('producer.delete') || 'Видалити'}
                        href={`/producer/delete/${item.id}`}
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
