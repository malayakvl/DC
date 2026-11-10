import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../Lang/Customer/translation';
import FormHeader from '@/Components/Common/FormHeader';

interface PriceCategory {
  id: number;
  name: string;
}

export default function SalarySettingsCreate({
  usersData,
  priceCategories,
}: {
  usersData: any;
  priceCategories: PriceCategory[];
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngCustomer, locale: appLang });

  // Використовуємо useForm від Inertia
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    base_salary: '',
    salary_type: 'hybrid', // fixed, percent, hybrid
    category_commissions: priceCategories.reduce((acc, cat) => {
        acc[cat.id] = { enabled: false, percentage: '' };
        return acc;
      },
      {} as Record<number, { enabled: boolean; percentage: string }>
    ),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/salaries/settings'); // шлях до бекенд-роуту збереження
  };

  const handleCategoryChange = (catId: number, field: 'enabled' | 'percentage', value: any) => {
    setData('category_commissions', {
      ...data.category_commissions,
      [catId]: {
        ...data.category_commissions[catId],
        [field]: value,
      },
    });
  };

  return (
    <AuthenticatedLayout header={<Head title="Налаштування зарплати" />}>
      <Head title="Налаштування зарплати" />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700">
          <FormHeader
            title={
              (usersData?.id
                ? msg.get('customer.salary.edit')
                : msg.get('customer.salary.create')) +
              ' ' +
              usersData.name
            }
            description={msg.get('customer.salary.description')}
            backUrl="/customers"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Вибір співробітника та ставки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {msg.get('customer.salary.base_price')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={data.base_salary}
                  onChange={(e) => setData('base_salary', e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
                {errors.base_salary && (
                  <span className="text-red-500 text-xs mt-1">{errors.base_salary}</span>
                )}
              </div>
            </div>

            {/* Налаштування % по Категоріях прайсу (price_categories) */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 text-left">
                {msg.get('customer.salary.percent')}
              </h3>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  {priceCategories.map((cat) => {
                    const isEnabled = data.category_commissions[cat.id]?.enabled || false;
                    return (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xs border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`cat-${cat.id}`}
                            checked={isEnabled}
                            onChange={(e) =>
                              handleCategoryChange(cat.id, 'enabled', e.target.checked)
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                          />
                          <label
                            htmlFor={`cat-${cat.id}`}
                            className="font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                          >
                            {cat.name}
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.1"
                            disabled={!isEnabled}
                            value={data.category_commissions[cat.id]?.percentage || ''}
                            onChange={(e) =>
                              handleCategoryChange(cat.id, 'percentage', e.target.value)
                            }
                            placeholder="20"
                            className="w-24 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 disabled:opacity-50 text-right shadow-sm text-sm"
                          />
                          <span className="text-gray-500 text-sm">%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" disabled={processing} className="btn-submit">
                Зберегти налаштування
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}