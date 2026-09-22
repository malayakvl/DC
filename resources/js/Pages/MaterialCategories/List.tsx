import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterialCategories from '../../Lang/MaterialCategories/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import {
  Stethoscope, // Загальна/Хірургія
  Activity, // Терапія / Обстеження
  Smile, // Ортопедія / Естетика
  Sparkles, // Пасти / Полірування
  ShieldCheck, // Антисептики / Захист
  Box, // Розходники / Склад
  Folder, // Дефолтна для решти
  CornerDownRight,
  Pencil,
  Trash2,
} from 'lucide-react';
export default function List({ tree }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterialCategories,
    locale: appLang,
  });

  // State для инлайн-формы
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Inertia Form State
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    id: null,
    name: '',
    parent_id: '',
    percent: '',
  });

  // Открыть форму на создание
  const handleOpenCreate = () => {
    clearErrors();
    reset();
    setEditingItem(null);
    setData({ id: null, name: '', parent_id: '', percent: '' });
    setIsFormOpen(true);
  };

  // Открыть форму на редактирование
  const handleOpenEdit = (item) => {
    clearErrors();
    setEditingItem(item);
    setData({
      id: item.id,
      name: item.name || '',
      parent_id: item.parent_id || '',
      percent: item.percent || '',
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

  // Сохранение (Создание / Обновление отправляется на твой метод update)
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('material.categories.update'), {
      onSuccess: () => handleCloseForm(),
    });
  };

  // Удаление категории
  const handleDelete = (id) => {
    if (confirm('Видалити цю категорію?')) {
      router.get(`/material-category/delete/${id}`);
    }
  };

  const getCategoryTheme = (name) => {
    const title = name?.toLowerCase() || '';

    if (title.includes('хірургія')) {
      return {
        icon: Stethoscope,
        bg: 'bg-rose-500/10',
        text: 'text-rose-600',
        subText: 'text-rose-500/70',
      };
    }
    if (title.includes('терапія')) {
      return {
        icon: Activity,
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-600',
        subText: 'text-emerald-500/70',
      };
    }
    if (title.includes('ортопедія')) {
      return {
        icon: Smile,
        bg: 'bg-blue-500/10',
        text: 'text-blue-600',
        subText: 'text-blue-500/70',
      };
    }
    if (title.includes('ендодонтія')) {
      return {
        icon: Sparkles,
        bg: 'bg-purple-500/10',
        text: 'text-purple-600',
        subText: 'text-purple-500/70',
      };
    }
    if (title.includes('пасти') || title.includes('полірування')) {
      return {
        icon: Sparkles,
        bg: 'bg-amber-500/10',
        text: 'text-amber-600',
        subText: 'text-amber-500/70',
      };
    }
    if (title.includes('антисептик')) {
      return {
        icon: ShieldCheck,
        bg: 'bg-teal-500/10',
        text: 'text-teal-600',
        subText: 'text-teal-500/70',
      };
    }
    if (title.includes('розходник')) {
      return {
        icon: Box,
        bg: 'bg-slate-500/10',
        text: 'text-slate-600',
        subText: 'text-slate-400',
      };
    }

    // Дефолтная тема для новых категорий
    return {
      icon: Folder,
      bg: 'bg-slate-500/10',
      text: 'text-slate-600',
      subText: 'text-slate-400',
    };
  };

  const renderCategoryName = (item) => {
    // Для подкатегорий (level > 0)
    if (item.level > 0) {
      return (
        <div className="flex items-center pl-6 text-slate-400 gap-2 shrink-0">
          <CornerDownRight className="w-4 h-4 text-slate-300" />
          <span className="text-slate-700 font-medium text-sm">{item.name}</span>
        </div>
      );
    }

    // Для родительских категорий (level === 0)
    const theme = getCategoryTheme(item.name);
    const IconComponent = theme.icon;

    return (
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg ${theme.bg} flex items-center justify-center ${theme.text} shrink-0`}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <b className="text-slate-900 font-semibold text-base">{item.name}</b>
      </div>
    );
  };

  const getPercentBadgeStyle = (percent, level) => {
    const numPercent = Number(percent) || 0;

    // 1. Акцент для високої націнки (> 50%)
    if (numPercent > 50) {
      return 'bg-amber-50 text-amber-800 border border-amber-200/80 font-bold';
    }

    // 2. Стиль для батьківської категорії (level === 0)
    if (level === 0) {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold';
    }

    // 3. Стиль для підкатегорії (level > 0)
    return 'bg-slate-100 text-slate-600 font-medium';
  };

  // Фильтруем категории для дропдауна, чтобы нельзя было выбрать саму себя в качестве родителя
  const parentOptions = tree?.filter((c) => c.level === 0) || [];

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Material Categories'} />
      <div className="py-0">
        <div className="p-4 sm:p-4 mb-8 content-data bg-content">
          <section className="mb-6">
            <header className="mt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                {/* Лівий блок: Заголовок + Бейдж + Підзаголовок */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                      {msg.get('mCategories.title.list')}
                    </h1>

                    {/* Бейдж кількості */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                      {tree?.length || 0} {msg.get('mCategories.title.total')}
                    </span>
                  </div>

                  {/* Підзаголовок */}
                  <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                    {msg.get('mCategories.title.description')}
                  </p>
                </div>

                {/* Правий блок: Перемикач кнопки */}
                <div className="flex items-center shrink-0">
                  <PrimaryButton
                    type="button"
                    onClick={handleOpenCreate}
                    disabled={Boolean(editingItem?.id)} // заблокована, якщо є активний editingId
                    className={editingItem?.id ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    {msg.get('mCategories.create')}
                  </PrimaryButton>
                </div>
              </div>
            </header>
          </section>

          {/* Инлайн-форма */}
          {isFormOpen && (
            <section className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  {editingItem?.id === 'create'
                    ? msg.get('mCategories.title.create')
                    : `${msg.get('mCategories.title.edit')} (ID: ${editingItem?.id})`}
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
                {/* Батьківська категорія */}
                <div className="md:col-span-4 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    {msg.get('mCategories.category')}
                  </label>
                  <select
                    value={data.parent_id}
                    onChange={(e) => setData('parent_id', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  >
                    <option value="">— {msg.get('mCategories.base.category')} —</option>
                    {parentOptions
                      .filter((c) => !editingItem || c.id !== editingItem.id)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  {errors.parent_id && (
                    <span className="text-xs text-red-500">{errors.parent_id}</span>
                  )}
                </div>

                {/* Назва */}
                <div className="md:col-span-5 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    {msg.get('mCategories.name')}
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="напр., Хірургія або Шовні матеріали"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    required
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>

                {/* Націнка % */}
                <div className="md:col-span-3 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    {msg.get('mCategories.percent')}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={data.percent}
                      onChange={(e) => setData('percent', e.target.value)}
                      placeholder="30"
                      className="w-full px-3 py-2 pr-7 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-medium"
                    />
                    <span className="absolute right-3 text-xs text-slate-400 font-bold pointer-events-none">
                      %
                    </span>
                  </div>
                  {errors.percent && <span className="text-xs text-red-500">{errors.percent}</span>}
                </div>

                {/* Кнопки */}
                <div className="md:col-span-12 flex justify-end gap-2 mt-2">
                  <PrimaryButton type="submit" disabled={processing}>
                    {processing ? 'Збереження...' : editingItem ? 'Оновити' : 'Зберегти'}
                  </PrimaryButton>
                </div>
              </form>
            </section>
          )}

          {/* Таблица категорий */}
          <section className="table-card">
            <DataTable paginationType={PaginationType.MCATEGORIES}>
              {tree?.map((item) => (
                <tr className="hover:bg-slate-50/80 transition-colors" key={item.id}>
                  {/* Колонка: Назва + Вложенность + Красивый плашка-иконка */}
                  <td className="py-3 pl-4">
                    <div className="flex items-center gap-3">{renderCategoryName(item)}</div>
                  </td>

                  {/* Колонка: Наценка */}
                  <td className="py-3">
                    {item.percent > 0 ? (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-label-sm text-label-sm transition-colors ${getPercentBadgeStyle(
                          item.percent,
                          item.level
                        )}`}
                      >
                        {item.percent}%
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs pl-2">—</span>
                    )}
                  </td>

                  {/* Колонка: Действия */}
                  <td className="text-right py-3 pr-4">
                    {!item.special && (
                      <div className="inline-flex items-center justify-end gap-1">
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
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </DataTable>
          </section>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
