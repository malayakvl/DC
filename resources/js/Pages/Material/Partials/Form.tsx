import { Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import InputText from '../../../Components/Form/InputText';
import Checkbox from '../../../Components/Form/Checkbox';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import { emptyProducersAutocompleteAction, findProducersAction } from '../../../Redux/Clinic';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks';
import { userSearchResultsSelector } from '../../../Redux/Clinic/selectors';
import {
  categoryPercentSelector,
  sizeSearchResultsSelector,
} from '../../../Redux/Material/selectors';
import {
  emptySizeAction,
  findSizeAction,
  findPercentAction,
  setPercentAction,
} from '../../../Redux/Material';
import InputSelect from '../../../Components/Form/InputSelect';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { ArrowLeft } from 'lucide-react';

export default function Form({
  clinicData,
  formData,
  categoryData,
  unitsData,
  photoPath = null,
  currency,
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
    is_instrument: formData.is_instrument ?? false,
    expected_uses: formData.expected_uses || '',
    file: null as File | null,
  });

  const [_, setHideFields] = useState(false);
  const serchResults = useSelector(userSearchResultsSelector);
  const searchSizeResults = useSelector(sizeSearchResultsSelector);
  const categoryPercent = useSelector(categoryPercentSelector);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(photoPath ? photoPath : '/images/no-image.png');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, photoPath]);

  useEffect(() => {
    if (categoryPercent) {
      dispatch(setPercentAction(parseFloat(categoryPercent).toFixed(2)));
    }
  }, [categoryPercent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.id;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(key as any, value);
  };

  useEffect(() => {
    if (data.price && categoryPercent) {
      const _pRice = parseFloat(data.price as string);
      const percent = 1 + parseFloat(categoryPercent) / 100;
      const retailValue = (_pRice * percent).toFixed(2);

      setData((prev) => ({
        ...prev,
        retail_price: retailValue,
        price_per_unit: calcPricePerUnit(retailValue, prev.weight),
      }));
    } else {
      const _cat = categoryData.find((_d) => _d.id == data.category_id);
      if (_cat) dispatch(setPercentAction(parseFloat(_cat.percent).toFixed(2)));
    }
  }, [data.price]);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const percent = categoryPercent ? 1 + parseFloat(categoryPercent) / 100 : 1;
    const retail = value ? (parseFloat(value) * percent).toFixed(2) : '';

    setData((prev) => ({
      ...prev,
      price: value,
      retail_price: retail,
      price_per_unit: calcPricePerUnit(retail, prev.weight),
    }));
  };

  const handleChangeRetailPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setData((prev) => ({
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

    setData((prev) => ({
      ...prev,
      weight: value,
      price_per_unit: calcPricePerUnit(prev.retail_price, value),
    }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.id;
    const value = e.target.value;

    if (key === 'unit_id') {
      const unit = unitsData.find((u) => u.id == value);
      setData((prev) => ({
        ...prev,
        unit_id: value,
        weight: unit?.unit_qty ?? prev.weight,
        price_per_unit: calcPricePerUnit(prev.retail_price, unit?.unit_qty ?? prev.weight),
      }));
      return;
    }

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

  const calcPricePerUnit = (retailPrice, weight) => {
    const p = parseFloat(retailPrice);
    const w = parseFloat(weight);

    if (!p || !w || w <= 0) return '';
    return (p / w).toFixed(2);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      post(`/material/update?id=${formData.id}`);
    } else {
      post('/material/update');
    }
  };

  const renderSearchProducerResult = () => {
    if (serchResults.length > 0) {
      return (
        <div className="absolute autocomplete z-20 bg-white border border-slate-200 rounded-xl shadow-lg mt-1 w-full max-h-48 overflow-y-auto p-1">
          <ul>
            {serchResults.map((_res) => (
              <li
                key={_res.id}
                className="cursor-pointer py-1.5 px-3 hover:bg-slate-100 rounded-lg text-sm text-slate-700"
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
    }
    return null;
  };

  const renderSearchSizeResult = () => {
    if (searchSizeResults.length > 0) {
      return (
        <div className="absolute autocomplete z-20 bg-white border border-slate-200 rounded-xl shadow-lg mt-1 w-full max-h-48 overflow-y-auto p-1">
          <ul>
            {searchSizeResults.map((_res) => (
              <li
                key={_res.id}
                className="cursor-pointer py-1.5 px-3 hover:bg-slate-100 rounded-lg text-sm text-slate-700"
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
    }
    return null;
  };
  return (
    <section className={`w-full px-4 sm:px-8 py-6 flex flex-col gap-6`}>
      {/* Шапка сторінки */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <Link
              href="/materials"
              className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-teal-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mt-space-xs">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {formData?.id ? 'Редагування матеріалу' : 'Новий матеріал'}
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {msg.get('material.title.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={processing} className="btn-submit">
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              {msg.get('material.save') || 'Зберегти зміни'}
            </div>
          </button>
        </div>
      </div>

      {/* Основна форма */}
      <div className="flex-1 max-w-[1780px] w-full mx-auto sm:px-6 lg:px-0 py-6 sm:py-8">
        <form onSubmit={submit} id="material-form" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
            {/* ЛІВА КОЛОНКА: Фото та Складські параметри */}
            <div className="lg:col-span-4 space-y-6">
              {/* Блок завантаження фото */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    {msg.get('material.photo_markup')}
                  </h2>
                  <span className="text-xs text-brand-600 font-semibold">
                    {msg.get('material.optional')}
                  </span>
                </div>
                <div className="photo-block">
                  <div className="flex flex-row relative input-bordered">
                    <div className="product-preview material-preview inline-block">
                      {!selectedFile && !photoPath && (
                        <div className="upload-zone">
                          <p className="mt-3 text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                            {msg.get('material.dragdrop_files')}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {msg.get('material.or_select_file_type')}
                          </p>
                          <span className="inline-block mt-3 px-2 py-0.5 text-[11px] font-medium bg-slate-200/60 text-slate-600 rounded">
                            {msg.get('material.file_sizes')}
                          </span>
                        </div>
                      )}
                      {!selectedFile && photoPath && (
                        <div
                          className={'product-photo'}
                          style={{
                            backgroundImage: `url(${photoPath})`,
                          }}
                        ></div>
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
                  <div className="upload-product-btn-block ml-[5px] relative">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={(e) => {
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
                <span className="text-red-600 text-xs mt-1 block">{errors.file}</span>

                {progress && (
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-3">
                    <div
                      className="bg-brand-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                    >
                      {progress.percentage}%
                    </div>
                  </div>
                )}
              </div>

              {/* Інструмент та ресурс */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  {msg.get('material.store_tip')}
                </h2>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <Checkbox
                    name={'is_instrument'}
                    checked={Boolean(data.is_instrument)} // <--- отут секрет успіху
                    onChange={handleChange}
                    label={msg.get('material.is_instrument')}
                  />
                  <p className="text-xs text-slate-500 mt-1 pl-6">
                    {msg.get('material.instrument_tip')}
                  </p>

                  <div className="mt-3 pl-6 pt-2 border-t border-slate-200/60">
                    <InputText
                      name={'expected_uses'}
                      values={data}
                      dataValue={data.expected_uses}
                      value={data.expected_uses}
                      onChange={handleChange}
                      label={msg.get('material.expected_uses')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ПРАВА КОЛОНКА: Основні реквізити, одиниці, ціноутворення */}
            <div className="lg:col-span-8 space-y-6">
              {/* Основні реквізити */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">
                    {msg.get('material.main_parameters')}
                  </h2>
                  <span className="text-xs font-semibold text-rose-500">
                    * {msg.get('material.required_fileds')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <InputTreeSelect
                      name={'category_id'}
                      values={data}
                      value={data.category_id}
                      options={categoryData}
                      onChange={handleChangeSelect}
                      required
                      label={msg.get('material.category')}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <InputText
                      name={'name'}
                      values={data}
                      dataValue={data.name}
                      value={data.name}
                      onChange={handleChange}
                      required
                      label={msg.get('material.name')}
                    />
                  </div>

                  <div>
                    <InputText
                      name={'articul'}
                      values={data}
                      dataValue={data.articul}
                      value={data.articul}
                      onChange={handleChange}
                      required
                      label={msg.get('material.articul')}
                    />
                  </div>

                  <div className="relative">
                    <InputText
                      name={'producer'}
                      values={data}
                      value={data.producer}
                      onChange={handleChangeProducer}
                      required
                      label={msg.get('material.producer')}
                    />
                    {renderSearchProducerResult()}
                  </div>
                </div>
              </div>

              {/* Одиниці вимірювання та фасування */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">
                    {msg.get('material.units_tip')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InputSelect
                    translatable={false}
                    name={'unit_id'}
                    values={data}
                    value={data.unit_id}
                    options={unitsData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('material.unit')}
                  />

                  <div className="relative">
                    <InputText
                      name={'weight'}
                      values={data}
                      value={data.weight}
                      onChange={handleChangeSize}
                      label={msg.get('material.size')}
                    />
                    {renderSearchSizeResult()}
                  </div>

                  <InputSelect
                    translatable={false}
                    name={'weightunit_id'}
                    values={data}
                    value={data.weightunit_id}
                    options={unitsData}
                    onChange={handleChangeSelect}
                    required
                    label={msg.get('material.sizeunit')}
                  />
                </div>
              </div>

              {/* Ціноутворення */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">
                    {msg.get('material.price_and_money')}
                  </h2>
                  <span className="px-2 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
                    {msg.get('material.currency')}: {currency}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <span className="absolute top-0 right-0 text-xs text-brand-600 font-semibold mt-1">
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

                  <InputText
                    name={'price_per_unit'}
                    values={data}
                    dataValue={data.price_per_unit}
                    value={data.price_per_unit}
                    required
                    label={msg.get('material.price.per.unit')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Нижня панель дій */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <Link className="btn-back" title={msg.get('material.back')} href={`/materials`}>
              {msg.get('material.back')}
            </Link>

            <div className="flex items-center gap-3">
              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-emerald-600 font-medium">{msg.get('producer.saved')}</p>
              </Transition>

              <PrimaryButton disabled={processing}>{msg.get('material.save')}</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
