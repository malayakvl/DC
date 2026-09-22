import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, router, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Lang from 'lang.js';
import { appLangSelector } from '@/Redux/Layout/selectors';
import lngServiceCategories from '../../../Lang/Services/translation';
import AddDynamicInputFields, { AddDynamicInputFieldsRef } from '../Partials/Row';
import { pricingItemsSelector, totalPriceItemsSelector } from '@/Redux/Service/selectors';
import { Sliders, ArrowLeft } from 'lucide-react';

export default function Form({
  categoryData = null,
  clinicData,
  formRowData = null,
  formData,
  unitData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });

  const invoiceItems = useSelector(pricingItemsSelector);
  const totalItemPrice = useSelector(totalPriceItemsSelector);
  const rowRef = useRef<AddDynamicInputFieldsRef | null>(null);

  const [values, setValues] = useState({
    name: formData?.name || '',
    clinic_id: clinicData?.id || '',
    category_id: formData?.category_id || '',
    price: formData?.price || '',
  });

  const { processing, recentlySuccessful } = useForm();

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name;
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...values,
      rows: invoiceItems,
    };

    if (formData?.id) {
      router.post(`/service/update?id=${formData.id}`, payload);
    } else {
      router.post('/service/update', payload);
    }
  };

  return (
    <div className={`w-full px-4 sm:px-8 py-6 flex flex-col gap-6 ${className}`}>
      {/* Верхня навігація та хлібні крихти */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <Link
              href="/services"
              className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-teal-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mt-space-xs">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {formData?.id
                      ? 'Редагування технологічної карти послуги'
                      : 'Нова технологічна карта'}
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Налаштування нормативів списання матеріалів, розрахунок собівартості та
                    ціноутворення
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={processing} className="btn-submit">
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              {msg.get('service.save') || 'Зберегти зміни'}
            </div>
          </button>
        </div>
      </div>

      {/* Основна форма */}
      <form onSubmit={submit} className="flex flex-col gap-6">
        {/* Основні параметри */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Основні параметри послуги</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Назва послуги</label>
              <input
                id="name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                type="text"
                value={values.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Категорія прайсу</label>
              <select
                id="category_id"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium cursor-pointer"
                value={values.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Оберіть категорію...</option>
                {categoryData?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Базова ціна / послуги
              </label>
              <input
                id="price"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-bold"
                type="number"
                step="0.01"
                value={values.price}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Таблиця специфікації матеріалів */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Специфікація матеріалів</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Нормативи списання розхідних матеріалів на 1 прийом
              </p>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-3 px-3 font-bold">Матеріал / Торгова назва</th>
                  <th className="pb-3 px-3 font-bold w-32">Одиниця</th>
                  <th className="pb-3 px-3 font-bold w-28 text-center">Норма витрати</th>
                  <th className="pb-3 px-3 font-bold w-28 text-center">
                    {msg.get('service.price')}
                  </th>
                  <th className="pb-3 px-3 font-bold w-28 text-center">
                    {msg.get('service.mark_up')}
                  </th>
                  <th className="pb-3 px-3 font-bold w-28 text-center">
                    {msg.get('service.total')}
                  </th>
                  <th className="pb-3 px-3 font-bold w-16 text-center">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <AddDynamicInputFields
                  ref={rowRef}
                  formRowData={
                    formRowData?.length > 0
                      ? formRowData
                      : [
                          {
                            product_id: '',
                            product: '',
                            quantity: '',
                            unit_id: '',
                            price: '',
                            total: '',
                          },
                        ]
                  }
                  unitData={unitData}
                />
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={7}>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 transition-colors"
                      onClick={() => rowRef.current?.addRow()}
                    >
                      + Додати матеріал
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Підсумок собівартості */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">
              Підсумок витрат на матеріали:
            </span>
            <div className="flex items-baseline gap-1 px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-100">
              <span className="text-base font-bold text-teal-700 tabular-nums">
                {totalItemPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-teal-700">₴</span>
            </div>
          </div>
        </div>

        {/* Футер із кнопками збереження */}
        <div className="flex items-center justify-between pt-2">
          <Link className="btn-back" title={msg.get('service.back')} href={`/services`}>
            {msg.get('service.back')}
          </Link>

          <div className="flex items-center gap-3">
            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-teal-600 font-semibold">
                {msg.get('service.saved') || 'Збережено!'}
              </p>
            </Transition>

            <button type="submit" disabled={processing} className="btn-submit">
              <div className="flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                {msg.get('service.save') || 'Зберегти зміни'}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
