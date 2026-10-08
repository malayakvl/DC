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

export default function List({
  clinicData,
  tree,
  services,
  currency,
}: {
  clinicData: any;
  tree: any;
  services: any;
  currency: any;
}) {
  useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });

  // State для инлайн-формы
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    post('/service-category/update', {
      onSuccess: () => {
        handleCloseForm();
      },
      preserveScroll: true,
    });
  };

  // 🌟 Состояние для поиска
  const [searchQuery] = useState('');

  const renderPriceBlock = (item: any) => {
    const filteredServices = services[item.id]?.filter((_item: any) =>
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
        <div className="flex items-center justify-between py-0 px-4 bg-slate-100/80 cursor-pointer hover:bg-slate-100 transition-colors select-none border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900 px-0 m-0">{item.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                  {categoryServices.length} {msg.get('service.title.total')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200/60">
                <th className="py-3 px-4 font-bold text-center">Код</th>
                <th className="py-3 px-4 font-bold">Назва послуги</th>
                <th className="py-3 px-4 font-bold text-center">Тривалість</th>
                <th className="py-3 px-4 font-bold text-right">Ціна</th>
                <th className="py-3 px-4 font-bold text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 text-sm">
              {categoryServices.map((_item: any, index: any) => (
                <tr
                  key={_item.id}
                  className={`hover:bg-slate-50/60 transition-colors group ${index % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'}`}
                >
                  <td className="py-0.5 px-4 text-center">
                    <span className="text-xs text-black">{_item.id}</span>
                  </td>
                  <td className="py-0.5 px-4">
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
                      </div>
                    </div>
                  </td>

                  <td className="py-0.5 px-4 text-center text-slate-500">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-xs">
                      {_item.duration} {msg.get('service.min')}
                    </span>
                  </td>

                  <td className="py-0.5 px-4 text-right">
                    <span className="font-bold text-slate-900 font-mono">
                      {_item.total_price !== undefined &&
                      _item.total_price !== null &&
                      _item.price !== undefined &&
                      _item.price !== null
                        ? (Number(_item.total_price) + Number(_item.price)).toFixed(2) +
                          ' ' +
                          currency
                        : 'Розрахувати'}
                    </span>
                  </td>

                  <td className="py-0.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`service/edit/${_item.id}`}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Редагувати"
                      >
                        <span className="action-btn">
                          <span className="material-symbols-outlined text-[18px] block">edit</span>
                        </span>
                      </Link>
                      <button
                        className={'actn-btns'}
                        type="button"
                        onClick={() => {
                          if (confirm('Ви впевнені, що хочете видалити цю послугу?')) {
                            router.delete(`service/destroy/${_item.id}`);
                          }
                        }}
                        title="Видалити"
                      >
                        <span className="material-symbols-outlined text-[18px] block">delete</span>
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
              isCreateDisabled={!!editingItem?.id}
              createHref={null}
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
              {tree?.map((item: any) => (
                <React.Fragment key={item.id}>{renderPriceBlock(item)}</React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
