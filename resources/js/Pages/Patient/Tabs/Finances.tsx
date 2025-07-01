import React, { useState, useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import lngFormula from '../../../Lang/Formula/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { setExistServicesAction, setPatientTab } from '../../../Redux/Patient';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import { showOverlayAction } from '../../../Redux/Layout';
import Pricing from '../Pricing';
import { patientServicesSelector } from '../../../Redux/Patient/selectors';

export default function Finances({
  type,
  quickActData,
  discountStatus,
  pDiscountValue,
  categoriesData,
  pServices,
  tree,
  clinicData,
  currency
}) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(type || 'history');
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });
  const initialServices = useSelector(patientServicesSelector) || [];
  const [sInit, setSInit] = useState(false);
  // let initialServices = [];
  // // // Парсим сервисы и применяем pDiscountValue и percent по умолчанию
  // initialServices = JSON.parse(quickActData.services).map(service => ({
  //   ...service,
  //   discountValue: pDiscountValue || service.discountValue || '',
  //   discountType: 'percent',
  // }));
  const [services, setServices] = useState(initialServices);
  const [globalDiscount, setGlobalDiscount] = useState(pDiscountValue || '');
  const [globalDiscountType, setGlobalDiscountType] = useState('percent');
  const { processing, recentlySuccessful, errors } = useForm();
console.log('initialServices', initialServices)
  // Синхронизация services с initialServices и применение начальной скидки
  // useEffect(() => {
  //   console.log('tut');
  //   const updatedServices = initialServices.map(service => ({
  //     ...service,
  //     discountValue: pDiscountValue || service.discountValue || '',
  //     discountType: service.discountType || 'percent',
  //   }));
  //   setServices(updatedServices);
  //   dispatch(setExistServicesAction(JSON.stringify(updatedServices)));
  //   setSInit(true);
  // }, [initialServices, pDiscountValue, dispatch]);

  // Применяем начальную скидку ко всем сервисам при загрузке
  useEffect(() => {
    if (pDiscountValue) {
      const updatedServices = services.map(service => ({
        ...service,
        discountValue: pDiscountValue,
        discountType: 'percent',
      }));
      setServices(updatedServices);
      // dispatch(setExistServicesAction(JSON.stringify(updatedServices)));
    }
    setSInit(true);
  }, [pDiscountValue]);

  // Обработчик изменения скидки для конкретного сервиса
  const handleDiscountChange = (serviceId, value) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const numValue = parseFloat(value) || 0;
        if (value === '' || (!isNaN(value) && numValue >= 0)) {
          if (service.discountType === 'percent' && numValue > 100) return service;
          if (service.discountType === 'absolute' && numValue > (service.price * (service.qty || 1))) return service;
          return { ...service, discountValue: value };
        }
      }
      return service;
    });
    setServices(updatedServices);
    dispatch(setExistServicesAction((updatedServices)));
  };

  // Обработчик изменения типа скидки
  const handleTypeChange = (serviceId, newType) => {
    const updatedServices = services.map(service =>
      service.id === serviceId
        ? { ...service, discountType: newType, discountValue: '' }
        : service
    );
    setServices(updatedServices);
    dispatch(setExistServicesAction((updatedServices)));
  };

  // Обработчик удаления сервиса
  const handleRemove = (serviceId) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
    dispatch(setExistServicesAction((updatedServices)));
  };

  const submit = e => {
    e.preventDefault();
  };

  // Применение массовой скидки
  const applyGlobalDiscount = () => {
    const numValue = parseFloat(globalDiscount) || 0;
    if (numValue < 0) return;

    const updatedServices = services.map(service => ({
      ...service,
      discountValue: globalDiscountType === 'percent' && numValue > 100 ? '' : globalDiscount,
      discountType: globalDiscountType,
    }));
    setServices(updatedServices);
    dispatch(setExistServicesAction((updatedServices)));
    // Не очищаем globalDiscount, чтобы значение осталось в поле
  };

  // Расчёт итоговой цены для сервиса
  const calculateDiscountedPrice = (service) => {
    const price = service.price || 0;
    const qty = service.qty || 1;
    const discount = parseFloat(service.discountValue) || 0;
    const total = price * qty;

    if (service.discountType === 'percent') {
      return (total * (1 - discount / 100)).toFixed(2);
    }
    return (total - discount).toFixed(2);
  };

  // Расчёт общей суммы
  const calculateTotal = () => {
    return services
      .reduce((sum, service) => sum + parseFloat(calculateDiscountedPrice(service)), 0)
      .toFixed(2);
  };

  const handleTabClick = (tab) => {

  }

  return (
    <>
      {/* TABS BLOCK */}
      <div className="tabs-block w-full bg-white mt-10 flex">
        <div className="w-full flex">
          <div className="sh-btns-block">
            <div className="mt-2">
              <Link href="/">
                <span className="btn-quickact cursor-pointer">{msg.get('patient.quickact')}</span>
              </Link>
              <Link href="/" className="ml-2">
                <span className="btn-acceptpayment cursor-pointer">{msg.get('patient.acceptpayment')}</span>
              </Link>
              <Link href="/" className="ml-2">
                <span className="btn-returnmoney cursor-pointer">{msg.get('patient.returnmoney')}</span>
              </Link>
            </div>
          </div>
          <div className="tabls-list mt-2">
            <ul>
              <li
                id="documents"
                className={tab === 'documents' ? 'active' : ''}
                onClick={() => handleTabClick('documents')}
              >
                <span className="btn-white cursor-pointer">Платежі та акти</span>

              </li>
              <li
                id="visits"
                className={tab === 'visits' ? 'active' : ''}
                onClick={() => handleTabClick('visits')}
              >
                <span className="btn-white cursor-pointer">Виконані роботи</span>

              </li>
              <li
                id="plans"
                className={tab === 'plans' ? 'active' : ''}
                onClick={() => handleTabClick('plans')}
              >
                <span className="btn-white cursor-pointer">Платежі</span>
              </li>
              <li
                id="history"
                className={tab === 'history' ? 'active' : ''}
                onClick={() => handleTabClick('history')}
              >
                <span className="btn-white cursor-pointer">Акти</span>
              </li>
              <li
                id="finances"
                className={tab === 'finances' ? 'active' : ''}
                onClick={() => handleTabClick('finances')}
              >
                <Link href="/">
                  <span className="btn-quickact cursor-pointer">{msg.get('patient.quickact')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="clearfix" />

      <div className={`w-full flex`}>
        <div className={`w-1/2`}>
          {/* Масовая скидка */}
          <form
            onSubmit={event => submit(event)}
            className="mt-0 space-y-3 min-w-[350px]"
            encType="multipart/form-data"
          >
            <div className="mt-4 flex items-center gap-2 w-[700px] justify-end">
              <label>{msg.get('patient.discount')}</label>
              <input
                type="text"
                value={globalDiscount}
                onChange={(e) => {
                  if (e.target.value === '' || (!isNaN(e.target.value) && e.target.value >= 0)) {
                    setGlobalDiscount(e.target.value);
                  }
                }}
                placeholder={msg.get('patient.globalDiscount')}
                className="discount-input w-24"
              />
              <select
                value={globalDiscountType}
                onChange={(e) => {
                  setGlobalDiscountType(e.target.value);
                  setGlobalDiscount('');
                }}
                className="discount-select"
              >
                <option value="percent">%</option>
                <option value="absolute">₴</option>
              </select>
              <button
                onClick={applyGlobalDiscount}
                className="bg-blue-500 text-white px-4 py-1 rounded disabled:bg-gray-300 uppercase text-[12px] font-bold"
                disabled={!globalDiscount}
              >
                {msg.get('patient.applyGlobal')}
              </button>
            </div>

            {/* Таблица акта */}
            <div className="bg-white mt-4 rounded-md border shadow-lg w-[700px] min-h-[100px] p-10">
              <h1 className="text-center uppercase text-black mt-4">{msg.get('patient.workAct')}</h1>
              {initialServices.length > 0 && (
                <table className="w-full mt-10">
                  <thead>
                  <tr>
                    <th className="text-left pb-3 px-2">{msg.get('patient.service')}</th>
                    <th className="text-center pb-3 px-2">{msg.get('patient.price')}</th>
                    <th className="text-center pb-3 px-2">{msg.get('patient.quantity')}</th>
                    <th className="text-left pb-3 px-2">{msg.get('patient.discount')}</th>
                    <th className="text-right pb-3 px-2">{msg.get('patient.discountedPrice')}</th>
                    <th className="text-right pb-3 px-2"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {initialServices.map(service => (
                    <tr key={service.id}>
                      <td className="text-left text-[14px] px-2">{service.name}</td>
                      <td className="text-center text-[14px] px-2">{service.price || ''}</td>
                      <td className="text-center text-[14px] px-2">{service.qty || 1}</td>
                      <td className="text-left text-[14px] pl-2">
                        <span className="flex">
                          <input
                            id={`d-value${service.id}`}
                            className="discount-input w-20"
                            type="text"
                            value={service.discountValue}
                            onChange={(e) => handleDiscountChange(service.id, e.target.value)}
                            placeholder="0"
                          />
                          <select
                            id={`d-type-${service.id}`}
                            className="discount-select inline-block"
                            value={service.discountType}
                            onChange={(e) => handleTypeChange(service.id, e.target.value)}
                          >
                            <option value="percent">%</option>
                            <option value="absolute">₴</option>
                          </select>
                        </span>
                      </td>
                      <td id={`d-price-${service.id}`} className="text-right text-[14px] pb-2 px-2">
                        {calculateDiscountedPrice(service)}
                      </td>
                      <td className="text-right text-[14px] pb-2 px-3">
                        <FontAwesomeIcon
                          icon={faClose}
                          color="#e13333"
                          className="cursor-pointer"
                          onClick={() => handleRemove(service.id)}
                        />
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              )}

              <div className="text-right mt-4">
              <span className="text-[16px] font-bold">
                {msg.get('patient.total')}: {calculateTotal()} ₴
              </span>
              </div>
              <div className="text-right mt-4">
                <PrimaryButton disabled={processing}>
                  {msg.get('patient.save')}
                </PrimaryButton>
                <Transition
                  show={recentlySuccessful}
                  enter="transition ease-in-out"
                  enterFrom="opacity-0"
                  leave="transition ease-in-out"
                  leaveTo="opacity-0"
                >
                  <p className="text-sm text-gray-600">
                    {msg.get('patient.saved')}
                  </p>
                </Transition>
              </div>
            </div>
            <div className="clearfix" />
          </form>
        </div>
        {/*PRICING BLOCK*/}
        <div className={`w-1/2 ml-20`}>
          <div className={`p-pricing`}>
            <Pricing
              clinicData={clinicData}
              tree={tree}
              services={pServices}
              currency={currency}
            />
          </div>
        </div>
      </div>

    </>
  );
}