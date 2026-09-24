import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import lngAct from '../../../Lang/Act/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputText';
import { router, useForm } from '@inertiajs/react';
import { actFiltersSelector, actClearFiltersSelector } from '@/Redux/Act/selectors';
import { setFilters, clearFilters } from '@/Redux/Act';
import PrimaryButton from '@/Components/Form/PrimaryButton';

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
  const [values, setValues] = useState({
    date_from: filtersData?.date_from || '',
    date_to: filtersData?.date_to || '',
    supplier_id: filtersData?.supplier_id || '',
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setData((values) => ({
      ...values,
      [key]: value,
    }));
    filtersData[key] = value;
    dispatch(setFilters(filtersData));
  };

  const handleDateChange = (date, key) => {
    setData((values) => ({
      ...values,
      [key]: date,
    }));
    filtersData[key] = date;
    dispatch(setFilters(filtersData));
  };

  const search = () => {
    post(route('act.index'));
  };

  const searchClear = () => {
    dispatch(clearFilters());
    setData(() => ({
      filterName: '',
      filterAmount: '',
      filterDateFrom: '',
      filterDateTo: '',
    }));
    ref.current.reset();
  };

  useEffect(() => {
    if (isClear) {
      post(route('act.index'));
    }
  }, [isClear]);
console.log(suppliersData)
  return (
    <form ref={ref} className="w-full mb-6">
      <div className="">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          {/* Верхній рядок: Сетка фильтров (Даты, Сумма и Кнопка поиска) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Дата с */}
            <div className="md:col-span-3">
              <InputText
                type="date"
                name="filterDateFrom"
                label={msg.get('act.date_from')}
                values={data}
                onChange={(date) => handleDateChange(date, 'filterDateFrom')}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>

            {/* Дата по */}
            <div className="md:col-span-3">
              <InputText
                type="date"
                name="filterDateTo"
                label={msg.get('act.date_to')}
                values={data}
                onChange={(date) => handleDateChange(date, 'filterDateTo')}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>


            {/* Сумма */}
            <div className="md:col-span-4">
              <InputText
                name="filterAmount"
                values={data}
                type="text"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                onChange={handleChange}
                label={msg.get('act.total')}
              />
            </div>

            {/* Кнопка поиска */}
            <div className="md:col-span-2 pt-5">
              <PrimaryButton
                type="button"
                onClick={search}
                className="w-full justify-center h-[38px] text-xs font-semibold"
              >
                {msg.get('act.filter')}
              </PrimaryButton>
            </div>
          </div>

          {/* Нижній рядок: Таби швидкого фільтру + Лічильник і очищення праворуч */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {/* Таби швидкого перемикання */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-teal-600 text-white font-bold shadow-sm"
              >
                <span>Всі акти</span>
                <span className="px-1.5 py-0.2 rounded-full transition-colors text-white font-bold">
                  0
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold"
              >
                <span>Проведені</span>
                <span className="px-1.5 py-0.2 rounded-full transition-colors text-slate-600">
                  0
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-semibold"
              >
                <span>Не проведені</span>
                <span className="px-1.5 py-0.2 rounded-full transition-colors text-slate-600">
                  0
                </span>
              </button>
            </div>

            {/* Права частина: Знайдено + Очистити фільтри */}
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-500 font-medium">
                Знайдено: <strong className="text-slate-800 font-bold">0 актів</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  searchClear();
                  const reset = { filterDateFrom: '', filterDateTo: '', filterAmount: '' };
                  setData(reset);
                  router.get('/acts', reset);
                }}
                className="flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-semibold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>{msg.get('act.reset')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
