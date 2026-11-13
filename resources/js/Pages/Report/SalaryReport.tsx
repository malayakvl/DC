import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngCustomer from '../../Lang/Customer/translation';
import FormHeader from '@/Components/Common/FormHeader';

interface ReportRow {
  user_id: number;
  full_name: string;
  base_salary: number;
  services_amount: number;
  total_commission: number;
  total_payout: number;
}

export default function SalaryReport({
                                       reportData,
                                       filters,
                                     }: {
  reportData: ReportRow[];
  filters: { month: string; year: string };
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngCustomer, locale: appLang });

  const [month, setMonth] = useState(filters.month);
  const [year, setYear] = useState(filters.year);

  const handleFilterChange = (newMonth: string, newYear: string) => {
    setMonth(newMonth);
    setYear(newYear);
    router.get('/customer/salary-report', { month: newMonth, year: newYear }, { preserveState: true });
  };

  // Загальні підсумки по клініці за місяць
  const totalPayroll = reportData.reduce((sum, row) => sum + row.total_payout, 0);
  const totalBase = reportData.reduce((sum, row) => sum + row.base_salary, 0);
  const totalBonus = reportData.reduce((sum, row) => sum + row.total_commission, 0);
  const totalServices = reportData.reduce((sum, row) => sum + row.services_amount, 0);

  return (
    <AuthenticatedLayout header={<Head title="Відомість зарплат" />}>
      <Head title="Відомість зарплат" />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700">
          <FormHeader
            title="Місячна відомість нарахування зарплати"
            description="Розрахунок ставок та відсотків від виробітку за виконані послуги з розкладу"
            backUrl="/customers"
          />

          {/* Фільтр періоду (Місяць / Рік) */}
          <div className="flex flex-wrap items-center gap-4 my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Місяць</label>
              <select
                value={month}
                onChange={(e) => handleFilterChange(e.target.value, year)}
                className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-sm shadow-sm"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const m = String(i + 1).padStart(2, '0');
                  return (
                    <option key={m} value={m}>
                      {new Date(2026, i, 1).toLocaleString('uk-UA', { month: 'long' })}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Рік</label>
              <select
                value={year}
                onChange={(e) => handleFilterChange(month, e.target.value)}
                className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-sm shadow-sm"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>

          {/* Міні-картки підсумків */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Загалом до виплати</span>
              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mt-1">{totalPayroll.toFixed(2)} грн</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 font-medium">Сума ставок</span>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">{totalBase.toFixed(2)} грн</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Виробіток послуг</span>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">{totalServices.toFixed(2)} грн</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/40 rounded-xl border border-green-100 dark:border-green-900">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Нараховані %</span>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{totalBonus.toFixed(2)} грн</p>
            </div>
          </div>

          {/* Таблиця відомості */}
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Співробітник (Лікар)</th>
                <th className="px-6 py-3 text-right">Базова ставка</th>
                <th className="px-6 py-3 text-right">Виробіток послуг</th>
                <th className="px-6 py-3 text-right">Нараховані %</th>
                <th className="px-6 py-3 text-right">До виплати</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {reportData.length > 0 ? (
                reportData.map((row) => (
                  <tr key={row.user_id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{row.full_name}</td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-300">{row.base_salary.toFixed(2)} грн</td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-300">{row.services_amount.toFixed(2)} грн</td>
                    <td className="px-6 py-4 text-right text-green-600 dark:text-green-400 font-medium">+{row.total_commission.toFixed(2)} грн</td>
                    <td className="px-6 py-4 text-right font-bold text-indigo-600 dark:text-indigo-400">{row.total_payout.toFixed(2)} грн</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    За обраний місяць немає даних щодо нарахувань у розкладі.
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}