import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faPencil,
  faTrash,
  faCopy,
  faPrint,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import lngFormula from '../../Lang/Formula/translation';
import InputText from '../../Components/Form/InputText';
import ViewFormula from './ViewFormula';
import moment from 'moment';
import {
  setChangeDia,
  setClearFormula,
  setDataDiagnozes,
  setSelectedToothNumber,
} from '../../Redux/Formula';
import { emptyFormula } from '../../Constants';

export default function index({ patientData, type, treatmentData }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(type ? type : 'history');
  const [disableTeethTab, setDisableTeethTab] = useState('');
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  const [stageName, setStageName] = useState('');
  const handleTabClick = tabName => {
    setTab(tabName);
  };

  const submit = e => {
    e.preventDefault();
    router.post(`/patient/create-treatment`, {
      user_id: patientData.id,
      stage_name: stageName,
      type: tab,
    });
  };

  const renderTreatmentStages = () => {
    return (
      <>
        {treatmentData.map((element, index) => {
          return (
            <div
              key={index}
              className="w-full bg-white border mt-10 patient-stage"
            >
              <div className="flex justify-between">
                <h2 className="text-left text-[14px] font-bold">
                  {element.stage_name}{' '}
                  {moment.utc(element.created_at).format('D.MM.YY')}
                </h2>
                <div className="icon-block actions-block">
                  <ul>
                    <li className="inline-block">
                      <Link href="/">
                        <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
                      </Link>
                    </li>
                    <li className="inline-block">
                      <Link href={`/formula/edit/${element.id}`}>
                        <FontAwesomeIcon icon={faPencil} className="mr-3" />
                      </Link>
                    </li>
                    <li className="inline-block">
                      <Link href="">
                        <FontAwesomeIcon icon={faCopy} className="mr-3" />
                      </Link>
                    </li>
                    <li className="inline-block">
                      <Link href="">
                        <FontAwesomeIcon icon={faPrint} className="mr-3" />
                      </Link>
                    </li>
                    <li className="inline-block">
                      <Link href="">
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {element.type === 'formula' && (
                <div className="w-full flex flex-row">
                  <div className="w-1/2">
                    <ViewFormula formulaData={element} />
                  </div>
                  <div className="w-1/2">
                    <ul className="tabs">
                      <li className={'active'} id={`up-t-${element.id}`}>
                        <span
                          onClick={() => {
                            if (
                              !document
                                .getElementById(`lower_${element.id}`)
                                .classList.contains('hide-up-teeth')
                            ) {
                              setDisableTeethTab('up');
                              document
                                .getElementById(`up-t-${element.id}`)
                                .classList.remove('active');
                              document
                                .getElementById(`lower_${element.id}`)
                                .classList.remove('show-up-teeth');
                              document
                                .getElementById(`upper_${element.id}`)
                                .classList.remove('show-up-teeth');
                              document
                                .getElementById(`lower_${element.id}`)
                                .classList.add('hide-up-teeth');
                              document
                                .getElementById(`upper_${element.id}`)
                                .classList.add('hide-teeth');
                              for (let i = 18; i >= 11; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                              for (let i = 28; i >= 21; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                              document.getElementById(`uB_${element.id}`).classList.add('hide-bone');
                              document.getElementById(`lB_${element.id}`).classList.add('move-down-bone');
                            } else {
                              setDisableTeethTab('');
                              document
                                .getElementById(`up-t-${element.id}`)
                                .classList.add('active');
                              document
                                .getElementById(`lower_${element.id}`)
                                .classList.remove('hide-up-teeth');
                              document
                                .getElementById(`upper_${element.id}`)
                                .classList.remove('hide-teeth');
                              document
                                .getElementById(`lower_${element.id}`)
                                .classList.add('show-up-teeth');
                              document
                                .getElementById(`upper_${element.id}`)
                                .classList.add('show-up-teeth');
                              for (let i = 18; i >= 11; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                              for (let i = 28; i >= 21; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                              document.getElementById(`uB_${element.id}`).classList.remove('hide-bone');
                              document.getElementById(`lB_${element.id}`).classList.remove('move-down-bone');

                            }
                          }}
                        >
                          {msgFormula.get('formula.maxilla')}
                        </span>
                      </li>
                      <li className={'active'} id={`bottom-t-${element.id}`}>
                        <span
                          onClick={() => {
                            if (
                              !document
                                .getElementById(`lower_${element.id}`)
                                .classList.contains('hide-teeth')
                            ) {
                              setDisableTeethTab('down');
                              document
                                .getElementById(`bottom-t-${element.id}`)
                                .classList.remove('active');
                              document
                                .getElementById(`lower_${element.id}`)
                                .classList.remove('show-up-teeth');
                              document
                                .getElementById(`upper_${element.id}`)
                                .classList.remove('show-up-teeth');
                              document
                                .getElementById(`lower_${element.id}`)
                                .classList.add('hide-teeth');
                              for (let i = 38; i >= 31; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                              for (let i = 48; i >= 41; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                            } else {
                              setDisableTeethTab('');
                              document
                                .getElementById(`bottom-t-${element.id}`)
                                .classList.add('active');
                              document
                                .getElementById(`lower_${element.id}`)
                                .classList.remove('hide-teeth');
                              for (let i = 38; i >= 31; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                              for (let i = 48; i >= 41; i--) {
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                            }
                          }}
                        >
                          {msgFormula.get('formula.mandible')}
                        </span>
                      </li>
                      <li className={'active'} id={`occlusion-${element.id}`}>
                        <span
                          onClick={() => {
                            if (
                              document
                                .getElementById(`occlusion-${element.id}`)
                                .classList.contains('active')
                            ) {
                              document.getElementById(`occlusion-${element.id}`).classList.remove('active');
                              document.getElementById(`axis_${element.id}`).classList.add('hide-axis');
                              document.getElementById(`lB_${element.id}`).classList.add('opclusion');
                              document.getElementById(`lower_${element.id}`).classList.add('opclusion');
                              // hide teeth top view
                              for (let i = 18; i >= 11; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'hidden';
                                document.getElementById(`${i}`).style.visibility = 'hidden';
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                              for (let i = 28; i >= 21; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'hidden';
                                document.getElementById(`${i}`).style.visibility = 'hidden';
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                              for (let i = 48; i >= 41; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'hidden';
                                document.getElementById(`${i}`).style.visibility = 'hidden';
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                              for (let i = 38; i >= 31; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'hidden';
                                document.getElementById(`${i}`).style.visibility = 'hidden';
                                document.getElementById(`B-${i}`).style.visibility = 'hidden';
                              }
                            } else {
                              document.getElementById(`occlusion-${element.id}`).classList.add('active');
                              document.getElementById(`axis_${element.id}`).classList.remove('hide-axis');
                              document.getElementById(`lB_${element.id}`).classList.remove('opclusion');
                              document.getElementById(`lower_${element.id}`).classList.remove('opclusion');
                              // hide teeth top view
                              for (let i = 18; i >= 11; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'inherit';
                                document.getElementById(`${i}`).style.visibility = 'inherit';
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                              for (let i = 28; i >= 21; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'inherit';
                                document.getElementById(`${i}`).style.visibility = 'inherit';
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                              for (let i = 48; i >= 41; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'inherit';
                                document.getElementById(`${i}`).style.visibility = 'inherit';
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                              for (let i = 38; i >= 31; i--) {
                                document.getElementById(`TH-${i}`).getElementsByClassName('top-view')[0].style.visibility = 'inherit';
                                document.getElementById(`${i}`).style.visibility = 'inherit';
                                document.getElementById(`B-${i}`).style.visibility = 'inherit';
                              }
                            }
                            setDisableTeethTab('occlusion');
                          }}
                        >
                          {msgFormula.get('formula.occlusion')}
                        </span>
                      </li>
                    </ul>
                    <div className={`tabs-content`} id={`up-t-content`} style={{display: tab === 'up' ? 'block' : 'none'}}>
                      Up teeth diagnozis
                    </div>
                    <div className={`tabs-content`} id={`bottom-t-content`} style={{display: tab === 'down' ? 'block' : 'none'}}></div>
                    <div className={`tabs-content`} id={`occlusion-content`} style={{display: tab === 'occlusion' ? 'block' : 'none'}}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
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
                    <Link href="">
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
                    Фінанси
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full">{renderTreatmentStages()}</div>
            <div className="w-full bg-white border mt-10 patient-stage flex">
              <form
                onSubmit={submit}
                className="flex flex-row w-full"
                encType="multipart/form-data"
              >
                <div className="w-1/3">
                  <div className="mt-[-5px]">
                    <InputText
                      name={'stage_name'}
                      values={''}
                      onChange={e => {
                        setStageName(e.target.value);
                      }}
                      required
                      placeholder={msg.get('patient.newstage')}
                      label={null}
                    />
                  </div>
                </div>
                <div className="w-2/3">
                  <ul className="sub-tab text-right mt-1 mb-4 mt-[-10px]">
                    <li className="relative">
                      <button
                        type="submit"
                        onClick={() => {
                          dispatch(setChangeDia(Math.random()));
                          dispatch(setSelectedToothNumber(''));
                          dispatch(setClearFormula(emptyFormula));
                          setTab('formula');
                        }}
                      >
                        <i className="icon-formula" />
                        <span className="inline-block ml-[35px]">
                          {msg.get('patient.tab.formula')}
                        </span>
                      </button>
                    </li>
                    <li className="relative">
                      <button type="submit" onClick={() => setTab('perio')}>
                        <i className="icon-perio" />
                        <span className="inline-block ml-[35px]">
                          {msg.get('patient.tab.perio')}
                        </span>
                      </button>
                    </li>
                    <li className="relative">
                      <button type="submit" onClick={() => setTab('psr')}>
                        <i className="icon-psr" />
                        <span className="inline-block ml-[35px]">
                          {msg.get('patient.tab.test')}
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
