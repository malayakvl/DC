import React, { useState, useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import lngFormula from '../../../Lang/Formula/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  minusServiceAction,
  setExistServicesAction,
  plusServiceAction,
  setPatientSubTab,
} from '../../../Redux/Patient';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';
import Pricing from '../Pricing';
import { patientServicesSelector, patientSubTabSelector } from '../../../Redux/Patient/selectors';
import SecondaryButton from '../../../Components/Form/SecondaryButton';
import QuickAct from '../FinanceTabs/QuickAct';

export default function Finances({
  type,
  patientData,
  pDiscountValue,
  pServices,
  tree,
  clinicData,
  currency,
  scheduleId
}) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(type || 'history');
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });
  const subTab = useSelector(patientSubTabSelector);
  const initialServices = useSelector(patientServicesSelector) || [];
  const [sInit, setSInit] = useState(false);
  const [services, setServices] = useState(initialServices);
  const [globalDiscount, setGlobalDiscount] = useState(pDiscountValue || '');
  const [globalDiscountType, setGlobalDiscountType] = useState('percent');
  const { processing, recentlySuccessful, errors } = useForm();

  // Применяем начальную скидку ко всем сервисам при загрузке
  useEffect(() => {
    if (pDiscountValue) {
      const updatedServices = initialServices.map(service => ({
        ...service,
        discountValue: pDiscountValue,
        discountType: 'percent',
      }));
      // setServices(updatedServices);
      dispatch(setExistServicesAction((updatedServices)));
    }
    setSInit(true);
  }, [pDiscountValue]);

  useEffect(() => {
    applyGlobalDiscount();
  }, [initialServices.length])

  // Обработчик изменения скидки для конкретного сервиса
  const handleDiscountChange = (serviceId, value) => {
    const updatedServices = initialServices.map(service => {
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
    // setServices(updatedServices);
    dispatch(setExistServicesAction((updatedServices)));
  };

  // Обработчик изменения типа скидки
  const handleTypeChange = (serviceId, newType) => {
    const updatedServices = initialServices.map(service =>
      service.id === serviceId
        ? { ...service, discountType: newType, discountValue: '' }
        : service
    );
    // setServices(updatedServices);
    dispatch(setExistServicesAction((updatedServices)));
  };


  const submit = e => {
    e.preventDefault();
    router.post(`/patient/update-act`, {
      patient_id: patientData.id,
      services: initialServices,
      schedule_id: scheduleId,
      clinic_id: clinicData.id,
      discount: globalDiscount,
      discountType: globalDiscountType,
      total: calculateFullTotal(),
      total_with_discount: calculateTotal()
    });
  };

  // Применение массовой скидки
  const applyGlobalDiscount = () => {
    const numValue = parseFloat(globalDiscount) || 0;
    if (numValue < 0) return;

    const updatedServices = initialServices.map(service => ({
      ...service,
      discountValue: globalDiscountType === 'percent' && numValue > 100 ? '' : globalDiscount,
      discountType: globalDiscountType,
    }));
    // setServices(updatedServices);
    dispatch(setExistServicesAction((updatedServices)));
    // Не очищаем globalDiscount, чтобы значение осталось в поле
  };

  // Расчёт итоговой цены для сервиса
  const calculateDiscountedPrice = (service) => {
    const price = service.total || 0;
    const qty = service.qty || 1;
    const discount = parseFloat(service.discountValue) || 0;
    const total = price * qty;

    if (service.discountType === 'percent') {
      return (total * (1 - discount / 100)).toFixed(2);
    }
    return (total - discount).toFixed(2);
  };

  // Расчёт итоговой цены для сервиса
  const calculateFullPrice = (service) => {
    const price = service.total || 0;
    const qty = service.qty || 1;
    const discount = parseFloat(service.discountValue) || 0;
    const total = price * qty;

    if (service.discountType === 'percent') {
      return (total).toFixed(2);
    }
    return (total).toFixed(2);
  };

  // Расчёт общей суммы
  const calculateTotal = () => {
    return initialServices
      .reduce((sum, service) => sum + parseFloat(calculateDiscountedPrice(service)), 0)
      .toFixed(2);
  };

  const calculateFullTotal = () => {
    return initialServices
      .reduce((sum, service) => sum + parseFloat(calculateFullPrice(service)), 0)
      .toFixed(2);
  };

  const handleTabClick = (tab) => {
    dispatch(setPatientSubTab(tab));
  }
console.log('Fin', subTab);
  return (
    <>
      {/* TABS BLOCK */}
      <div className="tabs-block w-full bg-white mt-5 mb-3 flex">
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
                id="actpayment"
                onClick={() => handleTabClick('actpayment')}
              >
                <span className={`btn-white cursor-pointer ${subTab === 'actpayment' ? 'active' : ''}`}>Платежі та акти</span>

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
                  <span className="btn-quickact cursor-pointer">{msg.get('patient.createevent')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="clearfix" />

      <div className={`w-full flex ${subTab === 'actpayment' ? '' : 'hidden'}`}>

      </div>
      {subTab === 'act' && (
        <QuickAct
          patientData={patientData}
          pDiscountValue={pDiscountValue}
          pServices={pServices}
          tree={tree}
          clinicData={clinicData}
          currency={currency}
          scheduleId={scheduleId}
        />
      )}
      {subTab === 'actpayment' && (
        <>Act and payment coming here</>
      )}
    </>
  );
}