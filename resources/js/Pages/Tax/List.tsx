import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngTaxes from '../../Lang/Tax/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngTaxes,
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
      rate: item.rate || '',
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
      post('/tax/update', {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    } else {
      // Маршрут оновлення (підлаштуй URL під свій роут, наприклад /unit/update/${editingId} або put)
      put(`/tax/update/${editingId}`, {
        preserveScroll: true,
        onSuccess: () => handleCloseForm(),
      });
    }
  };

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title={'Taxes'} />}>
      <Head title={'Tax'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('taxes.title.list')}
              count={listData?.length || 0}
              totalLabel={msg.get('taxes.title.total')}
              description={msg.get('taxes.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('taxes.create')}
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
                      ? msg.get('taxes.title.edit')
                      : `${msg.get('taxes.title.edit')} (ID: ${editingId})`}
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
                      {msg.get('taxes.name')}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Наприклад: ПДВ 20%"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    />
                    {errors.name && <span className="text-xs text-rose-500">{errors.name}</span>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {msg.get('taxes.rate')}
                    </label>
                    <input
                      type="text"
                      value={data.rate}
                      onChange={(e) => setData('rate', e.target.value)}
                      placeholder="Наприклад: 10.5"
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    />
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
              <DataTable paginationType={PaginationType.TAXES} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td>
                      <span className="pl-2">{item.name}</span>
                    </td>
                    <td>{item.rate}</td>
                    <td className="text-right">
                      {/* Кнопка редагування тепер відкриває інлайн-форму замість переходу за посиланням */}
                      <button
                        type="button"
                        className="actn-btns"
                        title={msg.get('taxes.title.edit')}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <span className="material-symbols-outlined text-[18px] block">edit</span>
                      </button>
                      <Link
                        className="actn-btns"
                        title={msg.get('taxes.title.delete')}
                        href={`taxes/delete/${item.id}`}
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
