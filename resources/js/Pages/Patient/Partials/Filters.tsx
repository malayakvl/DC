import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import InputText from '../../../Components/Form/InputText';
import { Link } from '@inertiajs/react';

export default function Filters({ listData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;

  };


  return (
    <div className="mt-4 flex justify-end align-items-end">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="inline-label">
            {msg.get('patient.last.name')}
          </label>
        </div>
        <div className="md:w-2/3">
          <InputText
            name={'last_name'}
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
            name={'last_name'}
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
        <Link
          className="btn-back"
          title={msg.get('patient.back')}
          href={`/patients`}
        >
          {msg.get('patient.search')}
        </Link>
        <Link
          className="btn-back"
          title={msg.get('patient.back')}
          href={`/patients`}
        >
          {msg.get('patient.search.clear')}
        </Link>
      </div>
    </div>
  );
}
