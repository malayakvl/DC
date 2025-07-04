import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import InputText from '../../../Components/Form/InputText';
import { Link, useForm } from '@inertiajs/react';
import { patientClearFiltersSelector, patientFiltersSelector } from '../../../Redux/Patient/selectors';
import { setFilters, clearFilters } from '../../../Redux/Patient';

export default function Filters({ listData }) {
  const appLang = useSelector(appLangSelector);
  const isClear = useSelector(patientClearFiltersSelector);
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const filtersData = useSelector(patientFiltersSelector);
  const { data, setData, post } =
    useForm(filtersData);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setData(values => ({
      ...values,
      [key]: value,
    }));
    filtersData[key] = value;
    dispatch(setFilters(filtersData));
  };

  const search = () => {
    post(route('patient.index'));
  }

  const searchClear = () => {
    dispatch(clearFilters());
    setData(values => ({
      filterName: '',
      filterPhone: ''
    }));
    ref.current.reset();
  }

  useEffect(() => {
    if (isClear) {
      post(route('patient.index'));
    }
  }, [isClear])


  return (
    <form ref={ref} className={'w-full'}>
      <div className="mt-4 flex justify-end align-items-end">

        <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="inline-label">
            {msg.get('patient.last.name')}
          </label>
        </div>
        <div className="md:w-2/3">
          <InputText
            name={'filterName'}
            values={''}
            dataValue={''}
            value={''}
            className={'input-text-noborder f-24'}
            onChange={handleChange}
            showLabel={false}
            required
            label={msg.get('patient.first.name')}
          />
        </div>
      </div>
        <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="inline-label">
            {msg.get('patient.phone')}
          </label>
        </div>
        <div className="md:w-2/3">
          <InputText
            name={'filterPhone'}
            values={''}
            dataValue={''}
            value={''}
            className={'input-text-noborder f-24'}
            onChange={handleChange}
            showLabel={false}
            required
            label={msg.get('patient.phone')}
          />
        </div>
      </div>
        <div className="md:flex md:items-center mb-6 ml-3">
        <span
          className="btn-back"
          title={msg.get('patient.search')}
          onClick={() => search()}
        >
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
