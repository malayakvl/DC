import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import InputText from '../../../Components/Form/InputText';
import { useForm } from '@inertiajs/react';
import { patientClearFiltersSelector, patientFiltersSelector } from '@/Redux/Patient/selectors';
import { setFilters, clearFilters } from '@/Redux/Patient';

export default function Filters() {
  const appLang = useSelector(appLangSelector);
  const isClear = useSelector(patientClearFiltersSelector);
  const ref = React.useRef(null);
  const dispatch = useAppDispatch();
  const filtersData = useSelector(patientFiltersSelector);
  const { setData, post } = useForm(filtersData);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const updated = { ...filtersData, [key]: value };
    setData(updated);
    dispatch(setFilters(updated));
  };

  const search = () => {
    post(route('patient.index'));
  };

  const searchClear = () => {
    dispatch(clearFilters());
    setData(() => ({
      filterName: '',
      filterPhone: '',
    }));
    ref.current.reset();
  };

  useEffect(() => {
    if (isClear) {
      post(route('patient.index'));
    }
  }, [isClear]);
  console.log('filtersData', filtersData);
  return (
    <form ref={ref} className={'w-full'}>
      <div className="flex flex-wrap gap-4 mb-6 p-4 transparent rounded-lg border border-[#D8DEE8] bg-white items-end">
        <div className="mb-6 w-1/3">
          <InputText
            name={'filterName'}
            values={filtersData}
            dataValue={filtersData['filterName']}
            value={filtersData['filterName']}
            className={'mt-1 block w-full'}
            onChange={handleChange}
            required
            label={msg.get('patient.first.name')}
          />
        </div>
        <div className="mb-6 w-1/3">
          <InputText
            name={'filterPhone'}
            values={filtersData}
            dataValue={filtersData['filterPhone']}
            value={filtersData['filterPhone']}
            className={'mt-1 block w-full'}
            onChange={handleChange}
            required
            label={msg.get('patient.phone')}
          />
        </div>
        <div className="md:flex md:items-center mb-6 ml-3">
          <span className="btn-submit" title={msg.get('patient.search')} onClick={() => search()}>
            {msg.get('patient.search')}
          </span>
          <span
            className="btn-back"
            onClick={() => {
              ref.current.reset();
              searchClear();
            }}
            title={msg.get('patient.search.clear')}
          >
            {msg.get('patient.search.clear')}
          </span>
        </div>
      </div>
    </form>
  );
}
