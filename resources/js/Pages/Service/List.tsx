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
import InputLabel from '../../Components/Form/InputLabel';
import InputError from '../../Components/Form/InputError';
import SecondaryButton from '../../Components/Form/SecondaryButton';
import Modal from '../../Components/Modal/Modal';
import InputText from '../../Components/Form/InputText';

export default function List({ clinicData, tree, services, currency }) {
  useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });
  const [confirmingCategory, setConfirmingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const { processing, reset, errors, clearErrors } = useForm({
    password: '',
  });
  // 🌟 ВОТ ЭТУ СТРОКУ НУЖНО ДОБАВИТЬ:
  const [searchQuery, setSearchQuery] = useState('');

  const closeModal = () => {
    clearErrors();
    reset();
  };

  const submitForm = () => {
    router.post(`/service-category/update`, {
      name: categoryName,
      clinic_id: clinicData.id,
    });
    setConfirmingCategory(false);
  };

  const renderPriceBlock = (item) => {
    const filteredServices = services[item.id]?.filter((_item) =>
      _item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchQuery && (!filteredServices || filteredServices.length === 0)) {
      return null;
    }

    const categoryServices = filteredServices || services[item.id] || [];

    const getCategoryIcon = (name) => {
      const lower = name.toLowerCase();

      // Хирургия / Удаление
      if (lower.includes('хірург') || lower.includes('видален') || lower.includes('імплант')) {
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      }
      // Ортопедия / Протезирование / Коронки
      if (lower.includes('ортопед') || lower.includes('корон') || lower.includes('протез')) {
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        );
      }
      // Гігіена / Профілактика / Чистка
      if (lower.includes('гігієн') || lower.includes('профілакт') || lower.includes('чист')) {
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        );
      }
      // Ортодонтія / Брекети
      if (lower.includes('ортодонт') || lower.includes('брекет') || lower.includes('зсув')) {
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        );
      }
      if (lower.includes('обстеж') || lower.includes('обстежен') || lower.includes('зсув')) {
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        );
      }

      // Дефолтная иконка (Терапія / Лікування / Загальна)
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      );
    };

    return (
      <div
        key={item.id}
        className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-200 mb-6 border border-slate-100"
      >
        {/* Accordion Header */}
        <div className="flex items-center justify-between p-6 bg-slate-50/70 cursor-pointer hover:bg-slate-50 transition-colors select-none border-b border-slate-100">
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
              <tr className="bg-slate-50/30 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
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
                      <svg
                        className="w-3.5 h-3.5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
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
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                        техкарта
                      </span>
                    </Link>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          // Тут можна викликати функцію видалення або модалку
                          if (confirm('Ви впевнені, що хочете видалити цю послугу?')) {
                            router.delete(`service/destroy/${_item.id}`);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Видалити"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Футер карточки с добавлением услуги */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
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

  const renderPriceBlockOld = (item) => {
    return (
      <>
        <div className="price-container">
          <b className="service-category-title">{item.name}</b>

          {services[item.id]?.map((_item) => (
            <Link key={_item.id} href={`service/edit/${_item.id}`} className="service-link">
              <div className="service-card">
                <div className="service-info">{_item.name}</div>

                <div className="service-meta">
                  <span className="service-price">
                    {_item.total_price ? _item.total_price + ' ' + currency : 'Розрахувати '}
                  </span>

                  <span className="service-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}

          <div className="mt-4">
            <NavLink href="/service/create" className="price-btn">
              {msg.get('service.add')}
            </NavLink>
          </div>
        </div>
      </>
    );
    // return Math.random().toString(16) + '000000'.substring(2, 8).toUpperCase()
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Services'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <header className="mb-6 mt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                      {msg.get('service.title.list')}
                    </h1>
                    {/* Бейдж кількості прив'язаний чітко до заголовка */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                      {tree.length} {msg.get('service.title.total')}
                    </span>
                  </div>
                  {/* Підзаголовок винесено окремо під заголовок */}
                  <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                    {msg.get('service.title.description')}
                  </p>
                </div>
                {/* Правий блок: Кнопка дії */}
                <PrimaryButton>
                  <a onClick={() => setConfirmingCategory(true)} href={'#'}>
                    {msg.get('service.create')}
                  </a>
                </PrimaryButton>
              </div>
            </header>
            <div className="mt-6">{tree?.map((item) => <>{renderPriceBlock(item)}</>)}</div>
          </div>
        </div>
        <Modal show={confirmingCategory} onClose={closeModal}>
          <form className="p-6 bg-black">
            <h2>{msg.get('service.create')}</h2>

            <div className="mt-0">
              <InputLabel htmlFor="password" value="Password" className="sr-only" />
              <InputText
                name={'name'}
                values={''}
                dataValue={''}
                value={''}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                label={msg.get('service.name')}
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-6 flex justify-end">
              <SecondaryButton
                onClick={() => {
                  setConfirmingCategory(false);
                  closeModal();
                }}
              >
                {msg.get('service.close')}
              </SecondaryButton>

              <SecondaryButton
                className="ms-3 btn-submit"
                disabled={processing}
                onClick={() => submitForm()}
              >
                {msg.get('service.save')}
              </SecondaryButton>
            </div>
          </form>
        </Modal>
      </div>
    </AuthenticatedLayout>
  );
}
