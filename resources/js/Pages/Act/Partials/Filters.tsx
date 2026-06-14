import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import lngAct from '../../../Lang/Act/translation';
import InputText from '../../../Components/Form/InputText';
import InputCalendar from '../../../Components/Form/InputCalendar';
import { router, useForm } from '@inertiajs/react';
import { actFiltersSelector, actClearFiltersSelector } from '@/Redux/Act/selectors';
import { setFilters, clearFilters } from '@/Redux/Act';
import PrimaryButton from '@/Components/Form/PrimaryButton';

export default function Filters() {
  const appLang = useSelector(appLangSelector);
  const isClear = useSelector(actClearFiltersSelector);
  const ref = React.useRef(null);
  const dispatch = useAppDispatch();
  const filtersData = useSelector(actFiltersSelector);
  const { data, setData, post } = useForm(filtersData);
  const msg = new Lang({
    messages: { ...lngPatient, ...lngAct },
    locale: appLang,
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

  return (
    <form ref={ref} className={'w-full'}>
      <div className="flex flex-wrap gap-4 mb-6 p-4 transparent rounded-lg border border-[#D8DEE8] bg-white items-end">
        <InputText
          type="date"
          name="filterDateFrom"
          label={msg.get('act.date_from')}
          values={data}
          onChange={(date) => handleDateChange(date, 'filterDateFrom')}
          className="mt-1 block w-full"
        />
        <InputText
          type="date"
          name="filterDateTo"
          label={msg.get('act.date_to')}
          values={data}
          onChange={(date) => handleDateChange(date, 'filterDateTo')}
          className="mt-1 block w-full"
        />
        <InputText
          name={'filterAmount'}
          values={data}
          type="text"
          className={'mt-1 block w-full'}
          onChange={handleChange}
          label={msg.get('act.total')}
        />
        <div className="flex gap-2 mb-1">
          <PrimaryButton onClick={search}>{msg.get('act.filter')}</PrimaryButton>
          <button
            onClick={() => {
              const reset = { date_from: '', date_to: '', supplier_id: '' };
              setData(reset);
              router.get('/acts', reset);
            }}
            className="btn-submit !bg-none !bg-gray-200 !text-gray-700 hover:!bg-gray-300 transition-colors duration-200"
          >
            {msg.get('act.reset')}
          </button>
        </div>
      </div>

      {/*<div className="md:flex md:items-center mb-6">*/}
      {/*  <div className="md:w-2/3">*/}
      {/*    <InputText*/}
      {/*      name={'filterAmount'}*/}
      {/*      values={data}*/}
      {/*      type="text"*/}
      {/*      className={'mt-1 block w-full'}*/}
      {/*      onChange={handleChange}*/}
      {/*      label={msg.get('act.total')}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="md:flex md:items-center mb-6 ml-3">*/}
      {/*  <span*/}
      {/*    className="btn-back cursor-pointer"*/}
      {/*    title={msg.get('patient.search')}*/}
      {/*    onClick={() => search()}*/}
      {/*  >*/}
      {/*    {msg.get('patient.search')}*/}
      {/*  </span>*/}
      {/*  <span*/}
      {/*    className="btn-back cursor-pointer"*/}
      {/*    onClick={() => {*/}
      {/*      searchClear();*/}
      {/*    }}*/}
      {/*    title={msg.get('patient.search.clear')}*/}
      {/*  >*/}
      {/*    {msg.get('patient.search.clear')}*/}
      {/*  </span>*/}
      {/*</div>*/}
    </form>
  );
}
