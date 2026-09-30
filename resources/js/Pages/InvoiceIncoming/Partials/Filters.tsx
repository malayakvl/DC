import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import lngAct from '../../../Lang/Act/translation';
import InputText from '../../../Components/Form/InputText';
import { router, useForm } from '@inertiajs/react';
import { actFiltersSelector, actClearFiltersSelector } from '@/Redux/Act/selectors';
import { setFilters, clearFilters } from '@/Redux/Act';

export default function Filters({ suppliersData }) {
  const appLang = useSelector(appLangSelector);
  const isClear = useSelector(actClearFiltersSelector);
  const ref = React.useRef(null);
  const dispatch = useAppDispatch();
  const filtersData = useSelector(actFiltersSelector);
  const { data, setData, post } = useForm(filtersData);
  const msg = new Lang({
    messages: { ...lngInvoiceIncoming, ...lngAct },
    locale: appLang,
  });

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState(filtersData?.filterName || '');
  const [supplierId, setSupplierId] = useState(filtersData?.supplier_id || '');
  const [statusFilter, setStatusFilter] = useState('all');

  const tabs = [
    { id: 'all', label: 'Всі накладні', count: 0 },
    { id: 'posted', label: 'Проведені', count: 0 },
    { id: 'unposted', label: 'Не проведені', count: 0, isSpecial: true },
  ];

  const searchClear = () => {
    dispatch(clearFilters());
    setSearch('');
    setSupplierId('');
    setStatusFilter('all');
    setActiveTab('all');
    setData(() => ({
      filterName: '',
      filterDateFrom: '',
      filterDateTo: '',
      filterAmount: '',
      supplier_id: '',
    }));
    if (ref.current) ref.current.reset();
  };

  useEffect(() => {
    if (isClear) {
      post(route('invoice-incoming.index'));
    }
  }, [isClear]);

  return (
    <form ref={ref} className="w-full mb-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        {/* ВЕРХНІЙ РЯД: Пошук + Селекти в один ряд як на скріншоті */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Пошук з ⌘K */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setData('filterName', e.target.value);
              }}
              placeholder="Пошук за номером, коментарем..."
              className="w-full pl-10 pr-16 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <kbd className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-600 border border-slate-300">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Селект 1: Дата з / Постачальник тощо */}
          <div className="lg:col-span-2">
            <select
              value={supplierId}
              onChange={(e) => {
                setSupplierId(e.target.value);
                setData('supplier_id', e.target.value);
              }}
              className="w-full appearance-none py-2 pl-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
            >
              <option value="">Всі постачальники</option>
              {suppliersData?.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>
          </div>

          {/* Селект 2 */}
          <div className="lg:col-span-2">
            <input
              type="date"
              value={data.filterDateFrom || ''}
              onChange={(e) => setData('filterDateFrom', e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
            />
          </div>

          {/* Селект 3: Статус */}
          <div className="lg:col-span-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none py-2 pl-3 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
              >
                <option value="all">Статус: Всі</option>
                <option value="posted">Проведені</option>
                <option value="unposted">Не проведені</option>
              </select>
              <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 top-2.5 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* НИЖНІЙ РЯД: Таби швидкого вибору + Лічильник і Очистити */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 flex-wrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              if (tab.isSpecial) {
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 font-semibold ${
                      isActive
                        ? 'bg-rose-600 text-white font-bold shadow-sm'
                        : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-rose-500'}`}
                    ></span>
                    {tab.label} ({tab.count})
                  </button>
                );
              }

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition ${
                    isActive
                      ? 'bg-teal-600 text-white font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-slate-600'
                    }`}
                  >
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Знайдено: <strong className="text-slate-800 font-bold">0 накладних</strong>
            </span>
            <button
              type="button"
              onClick={searchClear}
              className="text-xs font-semibold text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              Очистити фільтри
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
