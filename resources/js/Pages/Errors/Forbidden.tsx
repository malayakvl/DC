import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function Forbidden({ requiredPermission }: { requiredPermission: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setCopied] = useState(false);

  const copyErrorCode = () => {
    navigator.clipboard.writeText('SEC-ERR-403-8942A');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitRequest = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AuthenticatedLayout header={<Head title={'Unit'} />}>
      <Head title={'Unit'} />
      <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen font-['Plus_Jakarta_Sans']">
        <div className="w-full pt-16 min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
          <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Левая карточка */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 shadow-xl shadow-teal-900/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 text-red-600">
                    <span className="material-symbols-outlined text-3xl">gpp_bad</span>
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-1">
                      HTTP 403 Forbidden
                    </span>
                    <p className="text-sm text-gray-500">Політику ізоляції даних активовано</p>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  Доступ обмежено
                </h1>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Ваш поточний профіль не має необхідного рівня авторизації для перегляду цієї
                  сторінки. Це зроблено для захисту медичної таємниці та фінансової звітності
                  клініки.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-700 text-white font-semibold shadow-md hover:bg-teal-800 transition-all"
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                  <span>Повернутися назад</span>
                </button>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">dashboard</span>
                  <span>На головну</span>
                </Link>
              </div>
            </div>

            {/* Правая карточка диагностики */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-teal-900/5">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-700">verified_user</span>
                    <h2 className="font-bold text-gray-900">Діагностика сесії</h2>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                    Автентифіковано
                  </span>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between p-2.5 rounded-lg bg-gray-50">
                    <span className="text-gray-500">Запитуваний ресурс</span>
                    <code className="text-xs bg-gray-200 px-1.5 py-0.5 rounded text-red-600 font-mono">
                      {requiredPermission || 'money-in'}
                    </code>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-4 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">key</span>
                  <span>Надіслати запит на доступ</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Модалка запроса доступа */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <h3 className="text-lg font-bold">Запит на доступ</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={submitRequest} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Причина запиту</label>
                    <select
                      className="w-full p-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="audit">Звірка оплат пацієнтів / Звіт</option>
                      <option value="emergency">Термінова перевірка витрат</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-700 text-white font-semibold"
                  >
                    Відправити адміністратору
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-emerald-600">
                    check_circle
                  </span>
                  <h4 className="font-bold text-lg">Запит успішно надіслано!</h4>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 px-6 py-2 rounded-xl bg-teal-700 text-white"
                  >
                    Закрити
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
