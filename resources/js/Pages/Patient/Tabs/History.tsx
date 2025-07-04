import React from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faPencil,
  faTrash,
  faCopy,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import lngFormula from '../../../Lang/Formula/translation';
import InputText from '../../../Components/Form/InputText';
import ViewFormula from './../ViewFormula';
import ViewPerio from './../ViewPerio';
import moment from 'moment';
import {
  setChangeDia,
  setClearFormula,
  setSelectedToothNumber,
} from '../../../Redux/Formula';
import { emptyFormula } from '../../../Constants';
import ViewDiagnoze from './../ViewDiagnoze';
import ViewPSR from './../ViewPSR'


export default function History({ patientData, type, treatmentData }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState<string>(type ? type : 'history');
  const [stageTab, setStageTab] = useState<string>('');
  const [_, setDisableTeethTab] = useState<string>('');
  const [trType, setTrType] = useState<string>('');
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
      type: trType,
    });
  };

  const renderTreatmentStages = () => {
    return (
      <>
        {treatmentData.map((element, index) => {
          return (
            <div
              key={index}
              style={{display: stageTab === '' || stageTab === element.type ? 'block' : 'none'}}
              className={`w-full bg-white border mt-10 patient-stage stage-${element.type}`}
            >
              <div className="flex justify-between">
                <h2 className="text-left text-[14px] font-bold">
                  <span className="f-date">{moment.utc(element.created_at).format('DD.MM.YY')}</span>
                  {' - '}{element.stage_name}
                </h2>
                <div className="icon-block actions-block">
                  <ul>
                    <li className="inline-block">
                      <Link href="/">
                        <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
                      </Link>
                    </li>
                    {element.type === 'psr' && (
                      <>
                        <li className="inline-block">
                          <Link href={`/psr/edit/${element.id}`}>
                            <FontAwesomeIcon icon={faPencil} className="mr-3" />
                          </Link>
                        </li>
                        <li className="inline-block">
                          <Link href={`/psr/copy/${element.id}`}>
                            <FontAwesomeIcon icon={faCopy} className="mr-3" />
                          </Link>
                        </li>
                      </>
                    )}
                    {element.type === 'perio' && (
                      <>
                        <li className="inline-block">
                          <Link href={`/perio/edit/${element.id}`}>
                            <FontAwesomeIcon icon={faPencil} className="mr-3" />
                          </Link>
                        </li>
                        <li className="inline-block">
                          <Link href={`/perio/copy/${element.id}`}>
                            <FontAwesomeIcon icon={faCopy} className="mr-3" />
                          </Link>
                        </li>
                      </>
                    )}
                    {element.type === 'formula' && (
                      <>
                        <li className="inline-block">
                          <Link href={`/formula/edit/${element.id}`}>
                            <FontAwesomeIcon icon={faPencil} className="mr-3" />
                          </Link>
                        </li>
                        <li className="inline-block">
                          <Link href={`/formula/copy/${element.id}`}>
                            <FontAwesomeIcon icon={faCopy} className="mr-3" />
                          </Link>
                        </li>
                      </>
                    )}
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
              {element.type === 'psr' && (
                <div className="w-full flex flex-row">
                  <div className="w-1/2">
                    <ViewPSR psrData={element} />
                  </div>
                </div>
              )}
              {element.type === 'perio' && (
                <div className="w-full flex flex-row">
                  <div className="w-1/2">
                    <ViewPerio perioData={element} />
                  </div>
                </div>
              )}
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
                              document.getElementById(`dia-up-${element.id}`).classList.add('hide-dia');
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
                              document.getElementById(`dia-up-${element.id}`).classList.remove('hide-dia');
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
                              document.getElementById(`dia-down-${element.id}`).classList.add('hide-dia');
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
                              document.getElementById(`dia-down-${element.id}`).classList.remove('hide-dia');
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
                            document.getElementById(`dia-down-${element.id}`).classList.remove('hide-dia');
                            document.getElementById(`dia-up-${element.id}`).classList.remove('hide-dia');
                            if (
                              document
                                .getElementById(`occlusion-${element.id}`)
                                .classList.contains('active')
                            ) {
                              document.getElementById(`occlusion-${element.id}`).classList.remove('active');
                              document.getElementById(`axis_${element.id}`).classList.add('hide-axis');
                              document.getElementById(`lB_${element.id}`).classList.add('opclusion');
                              document.getElementById(`lower_${element.id}`).classList.add('opclusion');
                              const numbersEl = document.getElementById(`formula-view-${element.id}`).getElementsByClassName('tooth-number-active');
                              const bonesEl = document.getElementById(`formula-view-${element.id}`).getElementsByClassName('tooth-number-active');
                              const topElements = document.getElementById(`formula-view-${element.id}`).getElementsByClassName('top-view');
                              Array.from(numbersEl).forEach(el => {
                                el.classList.add('hide-number');
                              });
                              Array.from(topElements).forEach(el => {
                                el.classList.add('tooth-part-hide');
                              });
                              Array.from(bonesEl).forEach(el => {
                                el.classList.add('tooth-part-hide');
                              });
                            } else {
                              document.getElementById(`occlusion-${element.id}`).classList.add('active');
                              document.getElementById(`axis_${element.id}`).classList.remove('hide-axis');
                              document.getElementById(`lB_${element.id}`).classList.remove('opclusion');
                              document.getElementById(`lower_${element.id}`).classList.remove('opclusion');
                              const numbersEl = document.getElementById(`formula-view-${element.id}`).getElementsByClassName('tooth-number-active');
                              const bonesEl = document.getElementById(`formula-view-${element.id}`).getElementsByClassName('tooth-number-active');
                              const topElements = document.getElementById(`formula-view-${element.id}`).getElementsByClassName('top-view');
                              Array.from(numbersEl).forEach(el => {
                                el.classList.remove('hide-number');
                              });
                              Array.from(topElements).forEach(el => {
                                el.classList.remove('tooth-part-hide');
                              });
                              Array.from(bonesEl).forEach(el => {
                                el.classList.remove('tooth-part-hide');
                              });
                            }
                            setDisableTeethTab('occlusion');
                          }}
                        >
                          {msgFormula.get('formula.occlusion')}
                        </span>
                      </li>
                    </ul>
                    <div className={`tabs-content w-full bg-white border mt-10 patient-stage flex`} id={`up-t-content`} >
                      <ViewDiagnoze formulaData={element} formulaId={element.id} />
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

  const setActiveStageTab = (tab) => {
    if (stageTab === tab)
      setStageTab('');
    else
      setStageTab(tab);

  }

  return (
      <>
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
                      setTrType('formula');
                    }}
                  >
                    <i className="icon-formula" />
                    <span className="inline-block ml-[35px]">
                  {msg.get('patient.tab.formula')}
                </span>
                  </button>
                </li>
                <li className="relative">
                  <button type="submit" onClick={() => setTrType('perio')}>
                    <i className="icon-perio" />
                    <span className="inline-block ml-[35px]">
                  {msg.get('patient.tab.perio')}
                </span>
                  </button>
                </li>
                <li className="relative">
                  <button type="submit" onClick={() => setTrType('psr')}>
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
        {/*TABS BLOCK*/}
        <div className="tabs-block w-full bg-white border mt-10 patient-stage flex">
          <div className={`stage-tabs w-full`}>
            <ul className={'w-full'}>
              <li className={`inline-block w-1/3 text-center ${stageTab === 'formula' ? 'active' : ''}`} onClick={() => setActiveStageTab('formula')}>
                <label>
                  <i className="icon formula-tab"></i><span>{msg.get('patient.tab.formula')}</span>
                </label>
              </li>
              <li className={`inline-block w-1/3 text-center ${stageTab === 'perio' ? 'active' : ''}`} onClick={() => setActiveStageTab('perio')}>
                <label>
                  <i className="icon perio-tab"></i><span>{msg.get('patient.tab.perio')}</span>
                </label>
              </li>
              <li className={`inline-block w-1/3 text-center ${stageTab === 'psr' ? 'active' : ''}`} onClick={() => setActiveStageTab('psr')}>
                <label>
                  <i className="icon psr-tab"></i><span>{msg.get('patient.tab.test')}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">{renderTreatmentStages()}</div>
      </>
  )
}
