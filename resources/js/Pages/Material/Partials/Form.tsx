import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import InputText from '../../../Components/Form/InputText';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import {
  emptyProducersAutocompleteAction,
  findProducersAction,
} from '../../../Redux/Clinic';
import { useDispatch, useSelector } from 'react-redux';
import { userSearchResultsSelector } from '../../../Redux/Clinic/selectors';
import {
  categoryPercentSelector,
  sizeSearchResultsSelector,
  unitSearchResultsSelector,
} from '../../../Redux/Material/selectors';
import {
  emptySizeAction,
  emptyUnitAction,
  findSizeAction,
  findUnitAction,
  findPercentAction,
  setPercentAction,
} from '../../../Redux/Material';
import InputSelect from '../../../Components/Form/InputSelect';

export default function Form({
  clinicData,
  formData,
  categoryData,
  unitsData,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: formData.name,
    price: formData.price,
    retail_price: formData.retail_price,
    clinic_id: clinicData.id,
    category_id: formData.category_id,
    unit: formData.unit,
    unit_id: formData.unit_id,
    weightunit_id: formData.weightunit_id,
    weight: formData.weight,
    producer: formData.producer,
    percent: formData.percent,
    price_per_unit: formData.price_per_unit,
  });
  const [_, setHideFields] = useState(false);
  const serchResults = useSelector(userSearchResultsSelector);
  const serchUnitResults = useSelector(unitSearchResultsSelector);
  const serchSizeResults = useSelector(sizeSearchResultsSelector);
  const categoryPercent = useSelector(categoryPercentSelector);
  const { processing, recentlySuccessful, errors } = useForm();

  useEffect(() => {
    if (categoryPercent) {
      dispatch(setPercentAction(parseFloat(categoryPercent).toFixed(2)));
    }
  }, [categoryPercent]);

  const handleChangeSelect = e => {
    const key = e.target.id;
    const value = e.target.value;
    dispatch(findPercentAction(e.target.value));
    setValues(values => ({
      ...values,
      [key]: value,
    }));
    if (key === 'unit_id') {
      const _fUnit = unitsData.find(_d => _d.id == value);
      values['weight'] = _fUnit.unit_qty;
      values['price_per_unit'] = parseFloat(values['retail_price'])/parseFloat(_fUnit.unit_qty ? _fUnit.unit_qty : 1).toFixed(2);
    }
  };

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));

  };

  useEffect(() => {
    if (values.price && categoryPercent) {
      const _pRice = parseFloat(values.price);
      const percent = 1 + parseFloat(categoryPercent) / 100;
      const retailValue = (_pRice * percent).toFixed(2);
      const keyRetail = 'retail_price';
      setValues(values => ({
        ...values,
        [keyRetail]: retailValue,
      }));
      values['price_per_unit'] = (parseFloat(retailValue) / parseFloat(values['weight'] ? values['weight'] : 1)).toFixed(2)

      // calcPricePerUnit();
    } else {
      const _cat = categoryData.find(_d => _d.id == values['category_id']);
      dispatch(setPercentAction(parseFloat(_cat.percent).toFixed(2)));
    }
  }, [values.price]);

  const handleChangePrice = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));

  };

  const handleChangeRetailPrice = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
    // calculate percent
    const _pRice = parseFloat(values.price);
    const _rPrice = parseFloat(value);
    const percent = ((_rPrice - _pRice) / _pRice).toFixed(2);
    dispatch(setPercentAction(percent * 100));
  };

  const handleChangeProducer = e => {
    const key = e.target.id;
    const value = e.target.value;
    if (value.length > 3) {
      dispatch(findProducersAction(e.target.value));
    } else {
      dispatch(emptyProducersAutocompleteAction());
      setHideFields(false);
    }
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeUnit = e => {
    const key = e.target.id;
    const value = e.target.value;
    if (value.length >= 1) {
      dispatch(findUnitAction(e.target.value));
    } else {
      dispatch(emptyUnitAction());
      setHideFields(false);
    }
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeSize = e => {
    const key = e.target.id;
    const value = e.target.value;
    if (value.length >= 1) {
      dispatch(findSizeAction(e.target.value));
    } else {
      dispatch(emptySizeAction());
      setHideFields(false);
    }
    calcPricePerUnit();

    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const calcPricePerUnit = () => {
    // пересчитиваем в одно функции для всех вариантов изменения цени, ретейл цени, еденици измерения
    values['price_per_unit'] = (parseFloat(values['retail_price']) / parseFloat(values['weight'] ? values['weight'] : 1)).toFixed(2)
  }

  const submit = e => {
    e.preventDefault();
    if (formData.id) {
      router.post(`/material/update?id=${formData.id}`, values);
    } else {
      router.post('/material/update', values);
    }
  };

  const renderSearchProducerResult = () => {
    if (serchResults.length > 0) {
      return (
        <div className="absolute autocomplete">
          <ul>
            {serchResults.map(_res => (
              <li
                className="cursor-pointer py-1"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyProducersAutocompleteAction());
                  setValues(values => ({
                    ...values,
                    ['producer']: _res.name,
                  }));
                }}
              >
                {_res.name}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const renderSearchUnitResult = () => {
    if (serchUnitResults.length > 0) {
      return (
        <div className="absolute autocomplete">
          <ul>
            {serchUnitResults.map(_res => (
              <li
                className="cursor-pointer py-1"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyUnitAction());
                  setValues(values => ({
                    ...values,
                    ['unit']: _res.name,
                  }));
                }}
              >
                {_res.name}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const renderSearchSizeResult = () => {
    if (serchSizeResults.length > 0) {
      return (
        <div className="absolute autocomplete">
          <ul>
            {serchSizeResults.map(_res => (
              <li
                className="cursor-pointer py-1"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptySizeAction());
                  setValues((values: any) => ({
                    ...values,
                    ['size']: _res.name,
                  }));
                }}
              >
                {_res.name}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <section className={className}>
      <header>
        <h2>
          <Link className="icon-back" href={'/materials'}>
            &nbsp;
          </Link>
          {formData?.id
            ? msg.get('material.title.edit')
            : msg.get('material.title.create')}
        </h2>
      </header>

      <form onSubmit={submit} className="mt-0 space-y-4">
        <InputTreeSelect
          name={'category_id'}
          values={values}
          value={values.category_id}
          options={categoryData}
          onChange={handleChangeSelect}
          required
          label={msg.get('material.category')}
        />
        <InputText
          name={'name'}
          values={values}
          dataValue={values.name}
          value={values.name}
          onChange={handleChange}
          required
          label={msg.get('material.name')}
        />
        <div className="relative">
          <InputText
            name={'producer'}
            values={values}
            value={values.producer}
            onChange={handleChangeProducer}
            required
            label={msg.get('material.producer')}
          />
          <>{renderSearchProducerResult()}</>
        </div>
        <div className="relative">
          <InputText
            name={'price'}
            values={values}
            dataValue={values.price}
            value={values.price}
            onChange={handleChangePrice}
            required
            label={msg.get('material.price')}
          />
          <span className="percent-price">
            {categoryPercent &&
              msg.get('material.percent') + ': ' + categoryPercent + '%'}
          </span>
        </div>
        <InputText
          name={'retail_price'}
          values={values}
          dataValue={values.retail_price}
          value={values.retail_price}
          onChange={handleChangeRetailPrice}
          required
          label={msg.get('material.retail_price')}
        />
        <div className="relative">
          <InputSelect
            translatable={false}
            name={'unit_id'}
            className={'mb-1'}
            values={values}
            value={values.unit_id}
            options={unitsData}
            onChange={handleChangeSelect}
            required
            label={msg.get('material.unit')}
          />
        </div>
        <div className="relative">
          <InputText
            name={'weight'}
            values={values}
            value={values.weight}
            onChange={handleChangeSize}
            label={msg.get('material.size')}
          />
          <>{renderSearchSizeResult()}</>
        </div>
        <div className="relative">
          <InputSelect
            translatable={false}
            name={'weightunit_id'}
            className={'mb-1'}
            values={values}
            value={values.weightunit_id}
            options={unitsData}
            onChange={handleChangeSelect}
            required
            label={msg.get('material.sizeunit')}
          />
        </div>
        <InputText
          name={'price_per_unit'}
          values={values}
          dataValue={values.price_per_unit}
          value={values.price_per_unit}
          onChange={handleChangeRetailPrice}
          required
          label={msg.get('material.price.per.unit')}
        />
        <div className="flex items-center">
          <Link
            className="btn-back"
            title={msg.get('material.back')}
            href={`/materials`}
          >
            {msg.get('material.back')}
          </Link>
          <PrimaryButton disabled={processing}>
            {msg.get('material.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('producer.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
