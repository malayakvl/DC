import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import History from './Tabs/History';
import Finances from './Tabs/Finances';
import { patientTabSelector } from '@/Redux/Patient/selectors';
import { setPatientTab, setExistServicesAction, setPatientSubTab } from '@/Redux/Patient';

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
  actData,
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tab = useSelector(patientTabSelector);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [globalDiscountType] = useState('percent');

  if (quickActData.length > 0) {
    dispatch(setPatientTab('finances'));
  }
  if (scheduleId) {
    dispatch(setPatientSubTab('act'));
  } else {
    dispatch(setPatientSubTab('actpayment'));
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (quickActData.services) {
      const initialServices = JSON.parse(quickActData.services).map((service) => ({
        ...service,
        discountValue: discountValue || 0,
        discountType: globalDiscountType,
      }));
      dispatch(setExistServicesAction(initialServices));
    } else {
      dispatch(setExistServicesAction([]));
    }
  }, [quickActData]);

  const handleTabClick = (tabName) => {
    dispatch(setPatientTab(tabName));
  };


  return (
    <AuthenticatedLayout header={<Head />}>
      <Head
        title={
          msg.get('patient.title.view') + ' ' + patientData.first_name + ' ' + patientData.last_name
        }
      />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            {/*<div className="patient-view-border relative">*/}
            {/*  <div className="patient-header">*/}
            {/*    <div className="patient-profile">*/}
            {/*      {patientData.avatar ? (*/}
            {/*        <div*/}
            {/*          className="profile-photo"*/}
            {/*          style={{*/}
            {/*            backgroundImage: `url(/uploads/patients/${patientData.avatar})`,*/}
            {/*          }}*/}
            {/*        />*/}
            {/*      ) : (*/}
            {/*        <div className="profile-photo patient-initials">*/}
            {/*          {patientData.first_name?.[0]}*/}
            {/*          {patientData.last_name?.[0]}*/}
            {/*        </div>*/}
            {/*      )}*/}

            {/*      <div className="patient-meta">*/}
            {/*        <div className="patient-fullname">*/}
            {/*          {patientData.first_name} {patientData.last_name}*/}
            {/*        </div>*/}

            {/*        <div className="patient-phone">{patientData.primary_phone}</div>*/}

            {/*        {patientData.discount && (*/}
            {/*          <div className="patient-discount">*/}
            {/*            {discountStatus || msg.get('patient.discount')} -*/}
            {/*            {discountValue || patientData.discount}%*/}
            {/*          </div>*/}
            {/*        )}*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="icon-block">*/}
            {/*    <ul>*/}
            {/*      <li>*/}
            {/*        <Link href="/">*/}
            {/*          <FontAwesomeIcon*/}
            {/*            style={{ color: 'white' }}*/}
            {/*            icon={faUserPlus}*/}
            {/*            className="mr-3"*/}
            {/*          />*/}
            {/*        </Link>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <Link href={`/patient/edit/${patientData.id}`}>*/}
            {/*          <FontAwesomeIcon style={{ color: 'white' }} icon={faPencil} />*/}
            {/*        </Link>*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*  <div className="tabs-block">*/}
            {/*    <ul>*/}
            {/*      <li*/}
            {/*        id="documents"*/}
            {/*        className={tab === 'documents' ? 'active' : ''}*/}
            {/*        onClick={() => handleTabClick('documents')}*/}
            {/*      >*/}
            {/*        Документи*/}
            {/*      </li>*/}
            {/*      <li*/}
            {/*        id="visits"*/}
            {/*        className={tab === 'visits' ? 'active' : ''}*/}
            {/*        onClick={() => handleTabClick('visits')}*/}
            {/*      >*/}
            {/*        Візити*/}
            {/*      </li>*/}
            {/*      <li*/}
            {/*        id="plans"*/}
            {/*        className={tab === 'plans' ? 'active' : ''}*/}
            {/*        onClick={() => handleTabClick('plans')}*/}
            {/*      >*/}
            {/*        Плани лікування*/}
            {/*      </li>*/}
            {/*      <li*/}
            {/*        id="history"*/}
            {/*        className={tab === 'history' ? 'active' : ''}*/}
            {/*        onClick={() => handleTabClick('history')}*/}
            {/*      >*/}
            {/*        Історія лікування*/}
            {/*      </li>*/}
            {/*      <li*/}
            {/*        id="finances"*/}
            {/*        className={tab === 'finances' ? 'active' : ''}*/}
            {/*        onClick={() => handleTabClick('finances')}*/}
            {/*      >*/}
            {/*        {msg.get('patient.finances')}*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="pv-shell">
              <div className="pv-top">
                <div className="pv-user">
                  {patientData.avatar ? (
                    <div
                      className="pv-avatar"
                      style={{
                        backgroundImage: `url(/uploads/patients/${patientData.avatar})`,
                      }}
                    />
                  ) : (
                    <div className="pv-avatar pv-avatar-empty">
                      {patientData.first_name?.[0]}
                      {patientData.last_name?.[0]}
                    </div>
                  )}

                  <div className="pv-info">
                    <div className="pv-name">
                      {patientData.first_name} {patientData.last_name}
                    </div>

                    <div className="pv-phone">{patientData.primary_phone}</div>

                    {patientData.discount && (
                      <div className="pv-discount">
                        {discountStatus || msg.get('patient.discount')}
                        {discountValue || patientData.discount}%
                      </div>
                    )}
                  </div>
                </div>

                <div className="pv-actions">
                  <Link href="/" className="pv-action-btn">
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Link>

                  <Link href={`/patient/edit/${patientData.id}`} className="pv-action-btn">
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                </div>
              </div>

              <div className="pv-tabs">
                <button
                  className={tab === 'documents' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('documents')}
                >
                  Документи
                </button>

                <button
                  className={tab === 'visits' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('visits')}
                >
                  Візити
                </button>

                <button
                  className={tab === 'plans' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('plans')}
                >
                  Плани лікування
                </button>

                <button
                  className={tab === 'history' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('history')}
                >
                  Історія лікування
                </button>

                <button
                  className={tab === 'finances' ? 'pv-tab active' : 'pv-tab'}
                  onClick={() => handleTabClick('finances')}
                >
                  {msg.get('patient.finances')}
                </button>
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
  );
}
