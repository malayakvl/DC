import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
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
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks';
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
  photoPath = null,
  className = '',
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState(photoPath ? photoPath : '/images/no-image.png');
  const { data, setData, processing, post, recentlySuccessful, progress, errors } = useForm({
    name: formData.name || '',
    price: formData.price || '',
    retail_price: formData.retail_price || '',
    clinic_id: clinicData.id,
    category_id: formData.category_id || '',
    unit: formData.unit || '',
    unit_id: formData.unit_id || '',
    weightunit_id: formData.weightunit_id || '',
    weight: formData.weight || '',
    producer: formData.producer || '',
    percent: formData.percent || '',
    price_per_unit: formData.price_per_unit || '',
    articul: formData.articul || '',
    file: null as File | null,
  });

  const [_, setHideFields] = useState(false);
  const serchResults = useSelector(userSearchResultsSelector);
  const serchUnitResults = useSelector(unitSearchResultsSelector);
  const serchSizeResults = useSelector(sizeSearchResultsSelector);
  const categoryPercent = useSelector(categoryPercentSelector);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(photoPath ? photoPath : '/images/no-image.png');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, photoPath]);

  useEffect(() => {
    if (categoryPercent) {
      dispatch(setPercentAction(parseFloat(categoryPercent).toFixed(2)));
    }
  }, [categoryPercent]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    setData(key as any, value);
  };

  useEffect(() => {
    if (data.price && categoryPercent) {
      const _pRice = parseFloat(data.price as string);
      const percent = 1 + parseFloat(categoryPercent) / 100;
      const retailValue = (_pRice * percent).toFixed(2);

      setData(prev => ({
        ...prev,
        retail_price: retailValue,
        price_per_unit: (parseFloat(retailValue) / parseFloat(prev.weight ? prev.weight as string : '1')).toFixed(2)
      }));
    } else {
      const _cat = categoryData.find(_d => _d.id == data.category_id);
      if (_cat)
        dispatch(setPercentAction(parseFloat(_cat.percent).toFixed(2)));
    }
  }, [data.price]);


  // NEW
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const percent = categoryPercent
      ? 1 + parseFloat(categoryPercent) / 100
      : 1;

    const retail = value
      ? (parseFloat(value) * percent).toFixed(2)
      : '';

    setData(prev => ({
      ...prev,
      price: value,
      retail_price: retail,
      price_per_unit: calcPricePerUnit(retail, prev.weight),
    }));
  };

  const handleChangeRetailPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setData(prev => ({
      ...prev,
      retail_price: value,
      price_per_unit: calcPricePerUnit(value, prev.weight),
    }));

    if (data.price) {
      const priceVal = parseFloat(data.price as string);
      if (priceVal > 0) {
        const percent = ((parseFloat(value) - priceVal) / priceVal) * 100;
        dispatch(setPercentAction(percent.toFixed(2)));
      }
    }
  };

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length >= 1) {
      dispatch(findSizeAction(value));
    } else {
      dispatch(emptySizeAction());
      setHideFields(false);
    }

    setData(prev => ({
      ...prev,
      weight: value,
      price_per_unit: calcPricePerUnit(prev.retail_price, value),
    }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.id;
    const value = e.target.value;

    // Одиниця вимірювання
    if (key === 'unit_id') {
      const unit = unitsData.find(u => u.id == value);

      setData(prev => ({
        ...prev,
        unit_id: value,
        weight: unit?.unit_qty ?? prev.weight,
        price_per_unit: calcPricePerUnit(
          prev.retail_price,
          unit?.unit_qty ?? prev.weight
        ),
      }));
      return;
    }

    // Категорія
    if (key === 'category_id') {
      dispatch(findPercentAction(value));
    }

    setData(key as any, value);
  };


  const handleChangeProducer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    if (value.length >= 2) {
      dispatch(findProducersAction(value));
    } else {
      dispatch(emptyProducersAutocompleteAction());
      setHideFields(false);
    }
    setData(key as any, value);
  };

  const handleChangeUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    if (value.length >= 1) {
      dispatch(findUnitAction(value));
    } else {
      dispatch(emptyUnitAction());
      setHideFields(false);
    }
    setData(key as any, value);
  };

  const calcPricePerUnit = (retailPrice, weight) => {
    const p = parseFloat(retailPrice);
    const w = parseFloat(weight);

    if (!p || !w || w <= 0) return '';

    return (p / w).toFixed(2);
  };


  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      post(`/material/update?id=${formData.id}`, {
        onSuccess: () => {
          // any success logic
        }
      });
    } else {
      post('/material/update');
    }
  };

  const renderSearchProducerResult = () => {
    if (serchResults.length > 0) {
      return (
        <div className="absolute autocomplete">
          <ul>
            {serchResults.map(_res => (
              <li
                key={_res.id}
                className="cursor-pointer py-1"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyProducersAutocompleteAction());
                  setData('producer', _res.name);
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
                key={_res.id}
                className="cursor-pointer py-1"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyUnitAction());
                  setData('unit', _res.name);
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
                key={_res.id}
                className="cursor-pointer py-1"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptySizeAction());
                  setData('weight', _res.name);
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

      <form onSubmit={submit} className="mt-0 w-full">
        <div className="flex mt-[50px] px-[100px] mb-[50px]">
          <div className="w-1/3">
            <div className="flex flex-row relative">
              <div className="file-preview inline-block">
                {(!selectedFile && !photoPath) && (
                  <img src="/images/no-image.png" width={250} height={250} />
                )}
                {(!selectedFile && photoPath) && (
                  <div className={'patient-avatar'} style={{
                    background: `url(${photoPath})`,
                  }}></div>
                )}
                {selectedFile && (
                  <div
                    className="preview-photo"
                    style={{ backgroundImage: `url(${preview})` }}
                  ></div>
                )}
                <div className="btn-upload-photo-patient"></div>
              </div>
            </div>
            <div className="upload-patient-btn-block ml-[5px] relative">
              <input
                type="file"
                id="file"
                name="file"
                onChange={e => {
                  if (!e.target.files || e.target.files.length === 0) {
                    setSelectedFile(undefined);
                    setData('file', null);
                    return;
                  }
                  setData('file', e.target.files[0]);
                  setSelectedFile(e.target.files[0]);
                }}
              />
              <label htmlFor="file" className="btn-2" />
            </div>
            <span className="text-red-600">{errors.file}</span>
            {progress && (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${progress.percentage}%` }}
                >
                  {progress.percentage}%
                </div>
              </div>
            )}
          </div>
          <div className="w-2/3">
            <InputTreeSelect
              name={'category_id'}
              values={data}
              value={data.category_id}
              options={categoryData}
              onChange={handleChangeSelect}
              required
              label={msg.get('material.category')}
            />
            <InputText
              name={'name'}
              values={data}
              dataValue={data.name}
              value={data.name}
              onChange={handleChange}
              required
              label={msg.get('material.name')}
            />
            <InputText
              name={'articul'}
              values={data}
              dataValue={data.articul}
              value={data.articul}
              onChange={handleChange}
              required
              label={msg.get('material.articul')}
            />
            <div className="relative">
              <InputText
                name={'producer'}
                values={data}
                value={data.producer}
                onChange={handleChangeProducer}
                required
                label={msg.get('material.producer')}
              />
              <>{renderSearchProducerResult()}</>
            </div>
            <div className="relative">
              <InputText
                name={'price'}
                values={data}
                dataValue={data.price}
                value={data.price}
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
              values={data}
              dataValue={data.retail_price}
              value={data.retail_price}
              onChange={handleChangeRetailPrice}
              required
              label={msg.get('material.retail_price')}
            />
            <div className="relative">
              <InputSelect
                translatable={false}
                name={'unit_id'}
                className={'mb-1'}
                values={data}
                value={data.unit_id}
                options={unitsData}
                onChange={handleChangeSelect}
                required
                label={msg.get('material.unit')}
              />
            </div>
            <div className="relative">
              <InputText
                name={'weight'}
                values={data}
                value={data.weight}
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
                values={data}
                value={data.weightunit_id}
                options={unitsData}
                onChange={handleChangeSelect}
                required
                label={msg.get('material.sizeunit')}
              />
            </div>
            <InputText
              name={'price_per_unit'}
              values={data}
              dataValue={data.price_per_unit}
              value={data.price_per_unit}
              // onChange={handleChangeRetailPrice}
              required
              label={msg.get('material.price.per.unit')} onChange={undefined} />
          </div>
        </div>

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
