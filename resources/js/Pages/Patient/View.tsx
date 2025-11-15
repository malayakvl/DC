import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import History from './Tabs/History'
import Finances from './Tabs/Finances'
import { patientTabSelector } from '../../Redux/Patient/selectors';
import { setPatientTab, setExistServicesAction, setPatientSubTab } from '../../Redux/Patient';


export default function index({
  clinicData,
  patientData,
  type,
  treatmentData,
  quickActData,
  discountStatus,
  discountValue,
  services,
  tree,
  scheduleId,
  actData
}) {
  const tab = useSelector(patientTabSelector);
  const dispatch = useDispatch();

  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const [globalDiscount, setGlobalDiscount] = useState(discountValue || '');
  const [globalDiscountType, setGlobalDiscountType] = useState('percent');

  if (quickActData.length > 0 ) {
    dispatch(setPatientTab('finances'));
  }
  if (scheduleId) {
    dispatch(setPatientSubTab('act'));
  } else {
    dispatch(setPatientSubTab('actpayment'));
  }

console.log('quickActData', quickActData)
  useEffect(() => {
    if (quickActData.services) {
      const initialServices = JSON.parse(quickActData.services).map(service => ({
        ...service,
        discountValue: discountValue || 0,
        discountType: globalDiscountType,
      }));
      dispatch(setExistServicesAction(initialServices));
    } else {
      dispatch(setExistServicesAction([]));
    }
  }, [quickActData])

  const handleTabClick = tabName => {
    console.log(tabName)
    dispatch(setPatientTab(tabName));
  };

console.log('TAB', tab);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('patient.title.view')+ ' '+patientData.first_name+' '+patientData.last_name } />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <div className="patient-view-border relative">
              <div className="flex">
                {patientData.avatar ? (
                  <div
                    className="profile-photo"
                    style={{
                      backgroundImage: `url(/uploads/patients/${patientData.avatar})`,
                    }}
                  />
                ) : (
                  <div className="profile-photo" />
                )}
                <div className="parient-info">
                  <b>
                    {patientData.first_name} {patientData.last_name}
                  </b>
                  <span className="block text-[11px]">{patientData.phone}</span>
                  <span className="block text-[13px] p-discount">{patientData.discount ? `${discountStatus} -${discountValue}%` : '2'}</span>
                </div>
              </div>
              <div className="icon-block">
                <ul>
                  <li>
                    <Link href="/">
                      <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href={`/patient/edit/${patientData.id}`}>
                      <FontAwesomeIcon icon={faPencil} />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="tabs-block">
                <ul>
                  <li
                    id="documents"
                    className={tab === 'documents' ? 'active' : ''}
                    onClick={() => handleTabClick('documents')}
                  >
                    Документи
                  </li>
                  <li
                    id="visits"
                    className={tab === 'visits' ? 'active' : ''}
                    onClick={() => handleTabClick('visits')}
                  >
                    Візити
                  </li>
                  <li
                    id="plans"
                    className={tab === 'plans' ? 'active' : ''}
                    onClick={() => handleTabClick('plans')}
                  >
                    Плани лікування
                  </li>
                  <li
                    id="history"
                    className={tab === 'history' ? 'active' : ''}
                    onClick={() => handleTabClick('history')}
                  >
                    Історія лікування
                  </li>
                  <li
                    id="finances"
                    className={tab === 'finances' ? 'active' : ''}
                    onClick={() => handleTabClick('finances')}
                  >
                    {msg.get('patient.finances')}
                  </li>
                </ul>
              </div>
            </div>
            {tab === 'finances' && (
              <>
                <Finances
                  scheduleId={scheduleId}
                  clinicData={clinicData}
                  patientData={patientData}
                  type={type}
                  discountStatus={discountStatus}
                  pDiscountValue={discountValue}
                  pServices={services}
                  tree={tree}
                  actData={actData}
                />
              </>
            )}
            {tab === 'history' && (
              <>
                <History patientData={patientData} type={type} treatmentData={treatmentData} />
              </>
            )}

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
