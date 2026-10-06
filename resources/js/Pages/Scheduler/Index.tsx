import React, { useEffect } from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import IndexDay from './IndexDay';
import Index3Days from './Index3Days';
import { Head } from '@inertiajs/react';
import Lang from 'lang.js';
import lngScheduler from '../../Lang/Scheduler/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import {
  pricePopupSelector,
  showEditPopupSelector,
  showSchedulePopupSelector,
  schedulerViewSelector,
} from '@/Redux/Scheduler/selectors';
import SchedulerFormCreate from '@/Pages/Scheduler/Form/FormPopupCreate';
import SchedulerFormEdit from '@/Pages/Scheduler/Form/FormPopupEdit';
import { setTypeViewAction, showPricePopupAction } from '@/Redux/Scheduler';
import Pricing from './Pricing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/Form/SecondaryButton';
import { SchedulerToolbar } from './components/SchedulerToolbar';
import { useAppDispatch } from '@/hooks';

type SchedulerIndexProps = {
  customerData: any[];
  formData: any;
  clinicData: any;
  cabinetData: any[];
  groupedOptions: any[];
  assistantData: any[];
  eventsData: any[];
  currencyData: any;
  tree: any;
  services: any;
  serviceCategories: any[];
  initialView?: 'day' | '3days';
  allowViewSwitch?: boolean;
  statusesData: any[];
};

export default function Index({
  customerData,
  formData,
  clinicData,
  cabinetData,
  groupedOptions,
  assistantData,
  eventsData,
  currencyData,
  tree,
  services,
  serviceCategories,
  initialView = '3days',
  allowViewSwitch = true,
  statusesData,
}: SchedulerIndexProps) {
  const appLang = useSelector(appLangSelector);
  const dispatch = useAppDispatch();
  const showEventPopup = useSelector(showSchedulePopupSelector);
  const editEventPopup = useSelector(showEditPopupSelector);
  const schedulerView = useSelector(schedulerViewSelector);
  const showPrice = useSelector(pricePopupSelector);

  useEffect(() => {
    dispatch(setTypeViewAction(initialView));
  }, [dispatch, initialView]);

  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Scheduler Management" />
      <div>
        <div className="p-4 sm:py-8 sm:px-4 mb-4 content-data bg-content">
          <SchedulerToolbar
            allowViewSwitch={allowViewSwitch}
            statusesData={statusesData}
            cabinetsData={cabinetData}
            customerData={customerData}
            onNewAppointment={() => {
              // Логіка відкриття створення нового запису через Redux, якщо потрібно
              // наприклад: dispatch(showSchedulePopupAction(true)); dispatch(showOverlayAction(true));
            }}
          />
        </div>
        {showEventPopup && (
          <SchedulerFormCreate
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            assistantData={assistantData}
            customerData={customerData}
            currency={currencyData}
            serviceCategories={serviceCategories}
            services={services}
          />
        )}
        {editEventPopup && (
          <SchedulerFormEdit
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            assistantData={assistantData}
            customerData={customerData}
            currency={currencyData}
            serviceCategories={serviceCategories}
            services={services}
          />
        )}
        {showPrice && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-0 max-w-[550px] pb-[30px] relative">
              <div
                className={'absolute right-[20px] top-[10px] cursor-pointer z-50'}
                onClick={() => {
                  dispatch(showPricePopupAction(false));
                }}
              >
                <FontAwesomeIcon icon={faClose} className="ml-5" />
              </div>
              <div style={{ maxHeight: '400px', overflow: 'scroll' }}>
                <Pricing
                  clinicData={clinicData}
                  currency={currencyData}
                  services={services}
                  tree={tree}
                />
              </div>
              <SecondaryButton
                className="btn-back float-right mt-4 mr-[30px]"
                onClick={() => {
                  dispatch(showPricePopupAction(false));
                }}
                title={msg.get('scheduler.close')}
              >
                {msg.get('scheduler.close')}
              </SecondaryButton>
            </div>
          </div>
        )}
        {schedulerView === '3days' ? (
          <div>
            <Index3Days
              cabinetData={cabinetData}
              groupedOptions={groupedOptions}
              eventsData={eventsData}
            />
          </div>
        ) : (
          <IndexDay
            cabinetData={cabinetData}
            eventsData={eventsData}
            groupedOptions={groupedOptions}
          />
        )}
      </div>
    </AuthenticatedLayout>
  );
}
