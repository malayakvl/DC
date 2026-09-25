import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngServiceCategories from '../../Lang/Services/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ clinicData, tree, services, currency }) {
  useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });

  // State для инлайн-формы
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Inertia Form State для категории услуг
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    id: null,
    name: '',
    clinic_id: clinicData?.id || '',
  });

  // Открыть форму на создание
  const handleOpenCreate = () => {
    clearErrors();
    reset();
    setEditingItem(null);
    setData({ id: null, name: '', clinic_id: clinicData?.id || '' });
    setIsFormOpen(true);
  };

  // Закрыть форму
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    reset();
    clearErrors();
  };

  // Отправка формы создания категории
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/service-category/update', {
      onSuccess: () => {
        handleCloseForm();
      },
      preserveScroll: true,
    });
  };

  // 🌟 Состояние для поиска
  const [searchQuery, setSearchQuery] = useState('');

  const renderPriceBlock = (item) => {
    const filteredServices = services[item.id]?.filter((_item) =>
      _item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchQuery && (!filteredServices || filteredServices.length === 0)) {
      return null;
    }

    const categoryServices = filteredServices || services[item.id] || [];

    return (
      <div
        key={item.id}
        className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-200 mb-6 border border-slate-200/80"
      >
        {/* Accordion Header */}
        <div className="flex items-center justify-between p-6 bg-slate-100/80 cursor-pointer hover:bg-slate-100 transition-colors select-none border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900">{item.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                  {categoryServices.length} {msg.get('service.title.total')}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Категорія прайсу медичних послуг</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-right">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Сер. націнка</span>
                <span className="text-sm text-slate-800 font-semibold">5.8x</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Сер. маржа</span>
                <span className="text-sm text-teal-700 font-bold">81.9%</span>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Category Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200/60">
                <th className="py-3 px-4 font-bold">Код / Назва послуги</th>
                <th className="py-3 px-4 font-bold text-center">Тривалість</th>
                <th className="py-3 px-4 font-bold text-right">Собівартість</th>
                <th className="py-3 px-4 font-bold text-right">Націнка</th>
                <th className="py-3 px-4 font-bold text-right">Ціна для пацієнта</th>
                <th className="py-3 px-4 font-bold text-center">Маржа</th>
                <th className="py-3 px-4 font-bold text-center">Техкарта</th>
                <th className="py-3 px-4 font-bold text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 text-sm">
              {categoryServices.map((_item, index) => (
                <tr
                  key={_item.id}
                  className={`hover:bg-slate-50/60 transition-colors group ${index % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'}`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0"
                        title="У наявності"
                      ></div>
                      <div>
                        <Link
                          href={`service/edit/${_item.id}`}
                          className="font-semibold text-slate-900 block group-hover:text-teal-700 transition-colors"
                        >
                          {_item.name}
                        </Link>
                        <span className="text-xs text-slate-400">Код: SRV-{_item.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center text-slate-500">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-xs">
                      30 хв
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right text-slate-500 font-mono text-xs">
                    {_item.cost_price ? _item.cost_price + ' ' + currency : '—'}
                  </td>

                  <td className="py-3.5 px-4 text-right font-semibold text-slate-900 font-mono text-xs">
                    {_item.markup ? _item.markup + 'x' : '5.0x'}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="font-bold text-slate-900 font-mono">
                      {_item.total_price ? _item.total_price + ' ' + currency : 'Розрахувати'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
                      80%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <Link
                      href={`service/edit/${_item.id}`}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                      title="Редагувати"
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-teal-700 text-xs font-semibold">
                        техкарта
                      </span>
                    </Link>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Ви впевнені, що хочете видалити цю послугу?')) {
                            router.delete(`service/destroy/${_item.id}`);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Видалити"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Футер карточки с добавлением услуги */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200/80">
          <NavLink
            href="/service/create"
            className="text-teal-700 text-sm font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>+</span> {msg.get('service.add')}
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Services'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('service.title.list')}
              count={tree?.length || 0}
              totalLabel={msg.get('service.title.total')}
              description={msg.get('service.title.description')}
              onCreateClick={handleOpenCreate}
              createLabel={msg.get('service.create')}
              isCreateDisabled={Boolean(editingItem?.id)}
            />

            {/* Инлайн-форма для добавления категории */}
            {isFormOpen && (
              <section className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {msg.get('service.create')}
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
                  <div className="md:col-span-10 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      {msg.get('service.name')}
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="напр., Терапія або Хірургія"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                      required
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2">
                    <PrimaryButton
                      type="submit"
                      disabled={processing}
                      className="w-full justify-center"
                    >
                      {processing ? 'Збереження...' : msg.get('service.save')}
                    </PrimaryButton>
                  </div>
                </form>
              </section>
            )}

            <div className="mt-6">
              {tree?.map((item) => (
                <React.Fragment key={item.id}>{renderPriceBlock(item)}</React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
