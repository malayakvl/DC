import React, { useState, useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router, useForm } from '@inertiajs/react';
import { setExistServicesAction, setPatientTab } from '../../../Redux/Patient';
import { patientServicesSelector, patientTabSelector } from '../../../Redux/Patient/selectors';
import QuickAct from '../FinanceTabs/QuickAct';
import ActPayment from '../FinanceTabs/ActPayment';
import {
  Plus as LucidePlus,
  Undo2,
  CalendarSync as LucideCalendarSync,
  Download,
} from 'lucide-react';

export default function Finances({
  typeTab,
  patientData,
  pDiscountValue,
  pServices,
  tree,
  clinicData,
  currency,
  scheduleId,
  actData,
  discountStatus,
}: {
  typeTab: any;
  patientData: any;
  pDiscountValue: any;
  pServices: any;
  tree: any;
  clinicData: any;
  currency: any;
  scheduleId: any;
  actData: any;
  discountStatus: any;
}) {
  const dispatch = useDispatch();
  const tab = useSelector(patientTabSelector);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });
  const subTab = useSelector(patientTabSelector);
  const initialServices = useSelector(patientServicesSelector) || [];
  const [sInit, setSInit] = useState(false);
  // const [services, setServices] = useState(initialServices);
  const [globalDiscount, setGlobalDiscount] = useState(pDiscountValue || '');
  const [globalDiscountType, setGlobalDiscountType] = useState('percent');
  const { processing, recentlySuccessful, errors } = useForm();

  // Применяем начальную скидку ко всем сервисам при загрузке
  useEffect(() => {
    if (pDiscountValue) {
      const updatedServices = initialServices.map((service: any) => ({
        ...service,
        discountValue: pDiscountValue,
        discountType: 'percent',
      }));
      // setServices(updatedServices);
      dispatch(setExistServicesAction(updatedServices));
    }
    setSInit(true);
  }, [pDiscountValue]);

  useEffect(() => {
    applyGlobalDiscount();
  }, [initialServices.length]);

  // Обработчик изменения скидки для конкретного сервиса
  // const handleDiscountChange = (serviceId: any, value: any) => {
  //   const updatedServices = initialServices.map((service: any) => {
  //     if (service.id === serviceId) {
  //       const numValue = parseFloat(value) || 0;
  //       if (value === '' || (!isNaN(value) && numValue >= 0)) {
  //         if (service.discountType === 'percent' && numValue > 100) return service;
  //         if (service.discountType === 'absolute' && numValue > service.price * (service.qty || 1))
  //           return service;
  //         return { ...service, discountValue: value };
  //       }
  //     }
  //     return service;
  //   });
  //   // setServices(updatedServices);
  //   dispatch(setExistServicesAction(updatedServices));
  // };

  // Обработчик изменения типа скидки
  // const handleTypeChange = (serviceId, newType) => {
  //   const updatedServices = initialServices.map((service) =>
  //     service.id === serviceId ? { ...service, discountType: newType, discountValue: '' } : service
  //   );
  //   // setServices(updatedServices);
  //   dispatch(setExistServicesAction(updatedServices));
  // };

  const submit = (e: any) => {
    e.preventDefault();
    router.post(`/patient/update-act`, {
      patient_id: patientData.id,
      services: initialServices,
      schedule_id: scheduleId,
      clinic_id: clinicData.id,
      discount: globalDiscount,
      discountType: globalDiscountType,
      total: calculateFullTotal(),
      total_with_discount: calculateTotal(),
    });
  };

  // Применение массовой скидки
  const applyGlobalDiscount = () => {
    const numValue = parseFloat(globalDiscount) || 0;
    if (numValue < 0) return;

    const updatedServices = initialServices.map((service: any) => ({
      ...service,
      discountValue: globalDiscountType === 'percent' && numValue > 100 ? '' : globalDiscount,
      discountType: globalDiscountType,
    }));
    // setServices(updatedServices);
    dispatch(setExistServicesAction(updatedServices));
    // Не очищаем globalDiscount, чтобы значение осталось в поле
  };

  // Расчёт итоговой цены для сервиса
  const calculateDiscountedPrice = (service: any) => {
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
  const calculateFullPrice = (service: any) => {
    const price = service.total || 0;
    const qty = service.qty || 1;
    const discount = parseFloat(service.discountValue) || 0;
    const total = price * qty;

    if (service.discountType === 'percent') {
      return total.toFixed(2);
    }
    return total.toFixed(2);
  };

  // Расчёт общей суммы
  const calculateTotal = () => {
    return initialServices
      .reduce((sum: any, service: any) => sum + parseFloat(calculateDiscountedPrice(service)), 0)
      .toFixed(2);
  };

  const calculateFullTotal = () => {
    return initialServices
      .reduce((sum: any, service: any) => sum + parseFloat(calculateFullPrice(service)), 0)
      .toFixed(2);
  };

  const handleTabClick = (tab: string) => {
    dispatch(setPatientTab(tab));
  };
  console.log('Fin', subTab);
  return (
    <>
      {/* TABS BLOCK */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-4 w-full">
          <div className="flex gap-2">
            <button className="btn-quickact cursor-pointer" id="btn-accept-payment" type="button">
              <LucidePlus className="w-3 h-3" />
              <span>Прийняти платіж</span>
            </button>
            <button className="btn-refund cursor-pointer" id="btn-refund" type="button">
              <Undo2 className="w-3 h-3" />
              <span>Повернути кошти</span>
            </button>
            <div className="h-6 w-px bg-surface-container mx-1"></div>
          </div>
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button className="diagnosis-tab-new fin-tab  active" type="button">
              <span>Усі операції</span>
              <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-secondary font-data-mono text-label-sm font-semibold">
                5
              </span>
            </button>
            <button className="diagnosis-tab-new fin-tab" type="button">
              <span>Виконані роботи</span>
            </button>
            <button className="diagnosis-tab-new fin-tab" type="button">
              <span>Платежі</span>
            </button>
            <button className="diagnosis-tab-new fin-tab" type="button">
              <span>Акти</span>
            </button>
          </div>
          <div className="flex items-end ml-auto">
            <button
              className="btn-report-act mr-2 cursor-pointer"
              title="Акт звірки взаєморозрахунків"
              type="button"
            >
              <LucideCalendarSync className="w-3 h-3" />
              <span className="hidden sm:inline">Акт звірки</span>
            </button>
            <button
              className="btn-quickact cursor-pointer"
              title="Експорт виписки у Excel"
              type="button"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">XLSX</span>
            </button>
          </div>
        </div>
      </div>

      <div className="clearfix" />

      <div className={`w-full flex ${subTab === 'actpayment' ? '' : 'hidden'}`}></div>
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
        <ActPayment
          patientData={patientData}
          pDiscountValue={pDiscountValue}
          pServices={pServices}
          tree={tree}
          clinicData={clinicData}
          currency={currency}
          scheduleId={scheduleId}
          actData={actData}
        />
      )}
    </>
  );
}
