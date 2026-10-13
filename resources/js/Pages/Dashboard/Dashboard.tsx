import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngDashboard from '../../Lang/Dashboard/translation';

export default function Dashboard() {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngDashboard,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('dashboard.title')} />
      <div className="py-0 bg-slate-50 min-h-screen">
        <div className="p-4 sm:p-6 mb-8 max-w-[1680px] mx-auto space-y-6">
          {/* Top Greeting & Control Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900">Панель керування клінікою</h1>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="text-sm text-slate-500 font-medium">Центральне відділення №1</span>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Клініка працює у штатному режимі</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-teal-600">
                    calendar_today
                  </span>
                  <span>Понеділок, 12 жовтня 2026</span>
                </div>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                <div className="flex items-center gap-1.5 text-teal-700 font-semibold">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  <span>Каса дня: 48,250 ₴</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap w-full xl:w-auto justify-between xl:justify-end">
              <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl">
                <button
                  className="px-3.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold shadow-sm transition-all"
                  type="button"
                >
                  Сьогодні
                </button>
                <button
                  className="px-3.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 text-xs font-medium transition-colors"
                  type="button"
                >
                  Цей тиждень
                </button>
                <button
                  className="px-3.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 text-xs font-medium transition-colors"
                  type="button"
                >
                  Місяць
                </button>
              </div>
              <button
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-all shadow-sm active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Записати пацієнта</span>
              </button>
            </div>
          </div>

          {/* 4 Key Performance Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Card 1: Revenue */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Дохід за сьогодні
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <span className="material-symbols-outlined text-[20px]">
                      account_balance_wallet
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-slate-900">42,850 ₴</span>
                  <span className="inline-flex items-center text-emerald-600 text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +14%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">порівняно з попереднім робочим днем</p>
              </div>
              <div className="pt-3 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>
                    Готівка: <strong className="text-slate-800">18,200 ₴</strong>
                  </span>
                  <span>
                    POS / IBAN: <strong className="text-slate-800">24,650 ₴</strong>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 flex overflow-hidden">
                  <div className="bg-teal-600 h-full" style={{ width: '42.5%' }}></div>
                  <div className="bg-emerald-400 h-full" style={{ width: '57.5%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 2: Appointments Today */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Прийоми сьогодні
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-slate-900">28</span>
                  <span className="text-sm font-semibold text-slate-500">пацієнтів</span>
                  <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-700 text-[11px] font-bold">
                    Завантаження 92%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">Середній час візиту: 45 хв</p>
              </div>
              <div className="pt-3 bg-slate-50 -mx-5 -mb-5 p-3 rounded-b-2xl border-t border-slate-100">
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="bg-white py-1.5 px-1 rounded-lg border border-slate-100">
                    <span className="text-emerald-600 font-bold block text-sm">18</span>
                    <span className="text-slate-400 text-[10px]">виконано</span>
                  </div>
                  <div className="bg-white py-1.5 px-1 rounded-lg border border-slate-100">
                    <span className="text-teal-600 font-bold block text-sm">6</span>
                    <span className="text-slate-400 text-[10px]">у кріслі</span>
                  </div>
                  <div className="bg-white py-1.5 px-1 rounded-lg border border-slate-100">
                    <span className="text-amber-600 font-bold block text-sm">4</span>
                    <span className="text-slate-400 text-[10px]">очікують</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Dental Chairs Status */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Завантаженість кабінетів
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-teal-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">
                      airline_seat_recline_extra
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-slate-900">4 / 5</span>
                  <span className="text-sm font-semibold text-slate-500">крісел зайняті</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">Каб. 5: автостерилізація (15 хв)</p>
              </div>
              <div className="pt-3 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block ring-2 ring-white"
                      title="Каб. 1"
                    ></span>
                    <span
                      className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block ring-2 ring-white"
                      title="Каб. 2"
                    ></span>
                    <span
                      className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block ring-2 ring-white"
                      title="Каб. 3"
                    ></span>
                    <span
                      className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block ring-2 ring-white"
                      title="Каб. 4"
                    ></span>
                    <span
                      className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block ring-2 ring-white"
                      title="Каб. 5"
                    ></span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    80% пропускна здатність
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Unpaid invoices */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Неоплачені акти / Заборгованість
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-extrabold text-rose-600">3,290 ₴</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold">
                    2 пацієнти
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">Термін очікування: менше 48 год</p>
              </div>
              <div className="pt-3 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 truncate max-w-[180px]">
                  Ковальчук М. (2,100 ₴), Сахно І...
                </span>
                <button
                  className="text-teal-600 hover:text-teal-800 text-xs font-bold flex items-center gap-0.5"
                  type="button"
                >
                  <span>Звірити</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Block A: Real-time schedule stream */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Поточний прийом та найближчі візити
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Синхронізовано з кабінетною мережею в реальному часі
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 w-44 sm:w-56 transition-all"
                        placeholder="Пошук пацієнта..."
                        type="text"
                      />
                      <span className="material-symbols-outlined text-[18px] text-slate-400 absolute left-2.5 top-2">
                        search
                      </span>
                    </div>
                    <button
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Фільтр"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    </button>
                  </div>
                </div>

                {/* Appointment Items */}
                <div className="space-y-3">
                  {/* Patient 1 */}
                  <div className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm shrink-0">
                        АК
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">Анна Коваленко</span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                            У кабінеті
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mt-1 flex-wrap">
                          <span className="text-teal-700 font-semibold">
                            Професійна гігієна AirFlow
                          </span>
                          <span>•</span>
                          <span>Д-р Іваненко О. В.</span>
                          <span>•</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">
                            Каб. 1
                          </span>
                          <span>•</span>
                          <span>+380 98 123 45 67</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900 block">1,800 ₴</span>
                        <span className="text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                          09:00 - 10:00
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">description</span>
                        </button>
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">
                            folder_shared
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Patient 2 */}
                  <div className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
                        МП
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">Максим Петренко</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-semibold">
                            Заплановано
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mt-1 flex-wrap">
                          <span className="text-teal-700 font-semibold">
                            Імплантація Straumann (Етап 2)
                          </span>
                          <span>•</span>
                          <span>Д-р Іваненко О. В.</span>
                          <span>•</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">
                            Каб. 1
                          </span>
                          <span>•</span>
                          <span>+380 50 442 19 80</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900 block">
                          14,500 ₴
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                          10:30 - 12:00
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">description</span>
                        </button>
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">
                            folder_shared
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Patient 3 */}
                  <div className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                        ІШ
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">Ірина Шевченко</span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Очікує в клініці
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mt-1 flex-wrap">
                          <span className="text-teal-700 font-semibold">
                            Консультація та прицільний знімок
                          </span>
                          <span>•</span>
                          <span>Д-р Коваль О. П.</span>
                          <span>•</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">
                            Каб. 2
                          </span>
                          <span>•</span>
                          <span>+380 67 993 11 22</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900 block">650 ₴</span>
                        <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          11:15 - 11:45
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">description</span>
                        </button>
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">
                            folder_shared
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Показано 3 з 28 запланованих записів
                  </span>
                  <a
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors"
                    href="#"
                  >
                    <span>Перейти до повного розкладу</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Block B: Materials Alerts */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
                      <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-bold text-slate-900">
                          Критичні залишки матеріалів
                        </h2>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                          Потребують поповнення (3)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Автоматичний моніторинг витратних матеріалів
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200/60 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                        <th className="py-2 px-3">Матеріал</th>
                        <th className="py-2 px-3">Категорія</th>
                        <th className="py-2 px-3 text-center">Залишок</th>
                        <th className="py-2 px-3 text-center">Поріг</th>
                        <th className="py-2 px-3 text-right">Дія</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-800 block">
                            ESSENTIA HiFlo Universal
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            Шприц 2 мл • Відтінок A2
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">
                            Композити
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[11px]">
                            2 шт
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-400">4 шт</td>
                        <td className="py-3 px-3 text-right">
                          <button className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white font-semibold transition-colors">
                            Замовити
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Швидкі операції</h2>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    ADMIN DESK
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white transition-all text-left group border border-slate-100"
                    type="button"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-teal-700 group-hover:text-white text-teal-600 flex items-center justify-center shrink-0 shadow-sm transition-colors">
                      <span className="material-symbols-outlined text-[20px]">person_add</span>
                    </div>
                    <div>
                      <span className="font-bold block text-sm leading-tight text-slate-800 group-hover:text-white">
                        Новий пацієнт
                      </span>
                      <span className="text-xs text-slate-400 group-hover:text-teal-100">
                        Швидка реєстрація картки
                      </span>
                    </div>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white transition-all text-left group border border-slate-100"
                    type="button"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-teal-700 group-hover:text-white text-teal-600 flex items-center justify-center shrink-0 shadow-sm transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                    </div>
                    <div>
                      <span className="font-bold block text-sm leading-tight text-slate-800 group-hover:text-white">
                        Записати на прийом
                      </span>
                      <span className="text-xs text-slate-400 group-hover:text-teal-100">
                        Вибір лікаря та крісла
                      </span>
                    </div>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white transition-all text-left group border border-slate-100"
                    type="button"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-teal-700 group-hover:text-white text-teal-600 flex items-center justify-center shrink-0 shadow-sm transition-colors">
                      <span className="material-symbols-outlined text-[20px]">post_add</span>
                    </div>
                    <div>
                      <span className="font-bold block text-sm leading-tight text-slate-800 group-hover:text-white">
                        Створити рахунок / Акт
                      </span>
                      <span className="text-xs text-slate-400 group-hover:text-teal-100">
                        Формування рахунку за послуги
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Doctors on Duty */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Чергові спеціалісти</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    4 на зміні
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                        ІО
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">
                          Д-р Іваненко О. В.
                        </span>
                        <span className="text-[11px] text-slate-400">Терапевт • Каб. 1</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      У кріслі
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
