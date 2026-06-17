import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPrint } from '@fortawesome/free-solid-svg-icons';
import Formula from './Formula/index';
import {
  getDiagnosisSelector,
  getSealColor1Selector,
  getSealColor2Selector,
  getSealColor3Selector,
  getSubDiagnosisSelector,
  teethTypeSelector,
  getSealServicalColorSelector,
  getVinirColorSelector,
  getCeramicCrownColorSelector,
  getCeramicMCrownColorSelector,
  getMetalicCrownColorSelector,
  getZirconiaCrownColorSelector,
  getTeethDiagnozisSelector,
} from '@/Redux/Formula/selectors';
import {
  setTeethType,
  setDiagnosis,
  setSubDiagnosis,
  setSealColor1,
  setSealColor2,
  setSealColor3,
  setSealServicalColor,
  setVinirColor,
  setCeramicCrownColor,
  setMCeramicCrownColor,
  setMetalicCrownColor,
  setZirconiaCrownColor,
  setDiagnosisClass,
  setToothDiagnoze,
  showAllAdult,
  showAllChild,
  setDataDiagnozes,
  setClearFormula,
  setChangeDia,
} from '@/Redux/Formula';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import DetailsNew from './Partials/DetailsNew';
import { emptyFormula } from '@/Constants';
import {
  faTooth,
  faTriangleExclamation,
  faSyringe,
  faCrown,
  faHeartPulse,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

export default function EditFormula({
  patientData,
  treatmentData,
  clinicData,
  discountStatus,
  discountValue,
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  const dispatch = useDispatch<any>();
  const teethType = useSelector(teethTypeSelector);
  const [activeBlock, setActiveBlock] = useState('teeth_type');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ teeth_type: true });

  let tData = treatmentData.formula ? JSON.parse(treatmentData.formula) : null;

  const diagnozis = useSelector(getDiagnosisSelector);
  const subdiagnozis = useSelector(getSubDiagnosisSelector);
  const sealColor1 = useSelector(getSealColor1Selector);
  const sealColor2 = useSelector(getSealColor2Selector);
  const sealColor3 = useSelector(getSealColor3Selector);
  const scColor = useSelector(getSealServicalColorSelector);
  const vinirColor = useSelector(getVinirColorSelector);
  const ceramicCrownColor = useSelector(getCeramicCrownColorSelector);
  const mceramicCrownColor = useSelector(getCeramicMCrownColorSelector);
  const metalicCrownColor = useSelector(getMetalicCrownColorSelector);
  const zirconiaCrownColor = useSelector(getZirconiaCrownColorSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);

  const [values] = useState({
    clinic_id: clinicData.id,
    patientData: patientData,
    treatmentData: teethDiagnozis,
    formula_type: teethType,
  });

  useEffect(() => {
    dispatch(setTeethType(treatmentData.formula_type));
    if (treatmentData.formula !== null) {
      dispatch(setDataDiagnozes(tData));
    }
  }, [treatmentData]);

  const showAllTeeth = () => {
    tData = teethDiagnozis;
    if (teethType === 'adult') {
      dispatch(showAllAdult(true));
      for (let i = 11; i <= 18; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }
      for (let i = 41; i <= 48; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }
      for (let i = 21; i <= 28; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }
      for (let i = 31; i <= 38; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }

      for (let i = 51; i <= 55; i++) {
        if (!tData[`tooth${i}`].absent && tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }
      for (let i = 61; i <= 65; i++) {
        if (!tData[`tooth${i}`].absent && tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }
      for (let i = 81; i <= 85; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }
      for (let i = 71; i <= 75; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }
      dispatch(setToothDiagnoze(tData));
    } else {
      dispatch(showAllAdult(false));
      dispatch(showAllChild(true));
      for (let i = 11; i <= 18; i++) {
        if (!tData[`tooth${i}`].absent && tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }
      for (let i = 41; i <= 48; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }
      for (let i = 21; i <= 28; i++) {
        if (!tData[`tooth${i}`].absent && tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }
      for (let i = 31; i <= 38; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = false;
        }
      }

      for (let i = 51; i <= 55; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }
      for (let i = 61; i <= 65; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }
      for (let i = 81; i <= 85; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }
      for (let i = 71; i <= 75; i++) {
        if (!tData[`tooth${i}`].absent && !tData[`tooth${i}`].show) {
          tData[`tooth${i}`].show = true;
        }
      }
      dispatch(setToothDiagnoze(tData));
    }
  };

  const paradontAllHealthTeeth = () => {
    if (!tData) {
      tData = emptyFormula;
    }
    if (teethType === 'adult') {
      for (let i = 11; i <= 18; i++) {
        tData[`tooth${i}`].paradont_health = true;
      }
      for (let i = 41; i <= 48; i++) {
        tData[`tooth${i}`].paradont_health = true;
      }
      for (let i = 21; i <= 28; i++) {
        tData[`tooth${i}`].paradont_health = true;
      }
      for (let i = 31; i <= 38; i++) {
        tData[`tooth${i}`].paradont_health = true;
      }

      dispatch(setDataDiagnozes(tData));
    }
  };

  const paradontAllStageTeeth = (stage) => {
    if (!tData) {
      tData = emptyFormula;
    }
    if (teethType === 'adult') {
      // dispatch(showAllAdult(true));
      for (let i = 11; i <= 18; i++) {
        tData[`tooth${i}`].paradont_health = false;
        tData[`tooth${i}`].parodontit = true;
        tData[`tooth${i}`].parodontit_stage = stage;
      }
      for (let i = 41; i <= 48; i++) {
        tData[`tooth${i}`].paradont_health = false;
        tData[`tooth${i}`].parodontit = true;
        tData[`tooth${i}`].parodontit_stage = stage;
      }
      for (let i = 21; i <= 28; i++) {
        tData[`tooth${i}`].paradont_health = false;
        tData[`tooth${i}`].parodontit = true;
        tData[`tooth${i}`].parodontit_stage = stage;
      }
      for (let i = 31; i <= 38; i++) {
        tData[`tooth${i}`].paradont_health = false;
        tData[`tooth${i}`].parodontit = true;
        tData[`tooth${i}`].parodontit_stage = stage;
      }

      dispatch(setDataDiagnozes(tData));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    values['treatmentData'] = teethDiagnozis;
    values['teethType'] = teethType;

    // clear selector
    dispatch(dispatch(setClearFormula()));

    if (treatmentData.id) {
      router.post(`/patient/update-formula?id=${treatmentData.id}`, values);
    } else {
      // router.post('/pricing/update', {
      //   clinic_id: values.clinic_id,
      //   category_id: values?.category_id,
      //   name: values.name,
      //   price: values.price,
      //   rows: invoiceItems,
      // });
    }
  };

  const showBlock = (block: string) => {
    setActiveBlock(block);

    // Accordion: close all groups, then open only the clicked one
    setOpenGroups({
      teeth_type: false,
      injuries: false,
      endo: false,
      constructs: false,
      parodont: false,
      [block]: true,
    });
  };

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  console.log(treatmentData);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <DetailsNew
              clinicData={clinicData}
              patientData={patientData}
              discountStatus={discountStatus}
              discountValue={discountValue}
            />
            <div className="mt-2">
              <div className="inline w-full">
                <h3 className="text-left inline-block w-[80%]">{treatmentData.stage_name}</h3>
                <div className="patient-actions pb-4 text-right">
                  <button className="action-chip">
                    <FontAwesomeIcon icon={faPrint} />
                    <span>{msg.get('patient.print')}</span>
                  </button>

                  <button className="action-chip save">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    <span>{msg.get('patient.save')}</span>
                  </button>
                </div>
              </div>
              <div className="clearfix" />
              <div className="flex w-full patient-content-border white-view">
                <div className="w-1/2">
                  <Formula action={'edit'} formulaData={JSON.parse(treatmentData.formula)} />
                </div>
                <div className="w-1/2">
                  {/*<h5>Категорії диагнозів</h5>*/}
                  {/*<div className="pv-tabs-teeth">*/}
                  {/*  <button className="pv-tab" onClick={() => showBlock('all')}>*/}
                  {/*    Усі*/}
                  {/*  </button>*/}
                  {/*  <button className="pv-tab" onClick={() => showBlock('injuries')}>*/}
                  {/*    Ураження*/}
                  {/*  </button>*/}
                  {/*  <button className="pv-tab" onClick={() => showBlock('endo')}>*/}
                  {/*    Endo*/}
                  {/*  </button>*/}
                  {/*  <button className="pv-tab" onClick={() => showBlock('constructs')}>*/}
                  {/*    Конструкції*/}
                  {/*  </button>*/}
                  {/*  <button className="pv-tab" onClick={() => showBlock('parodont')}>*/}
                  {/*    Парадонт*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                  <div className="diagnosis-block">
                    <div className="diagnosis-filter">
                      <div className="diagnosis-tabs">
                        <button
                          className={`diagnosis-tab all ${activeBlock === 'teeth_type' ? 'active' : ''}`}
                          onClick={() => showBlock('teeth_type')}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faTooth} />
                          <span>Тип зуба</span>
                        </button>

                        <button
                          className={`diagnosis-tab injuries ${activeBlock === 'injuries' ? 'active' : ''}`}
                          onClick={() => showBlock('injuries')}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faTriangleExclamation} color={'#f59e0b'} />
                          <span>Ураження</span>
                        </button>

                        <button
                          className={`diagnosis-tab endo ${activeBlock === 'endo' ? 'active' : ''}`}
                          onClick={() => showBlock('endo')}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faSyringe} />
                          <span>Endo</span>
                        </button>

                        <button
                          className={`diagnosis-tab constructs ${activeBlock === 'constructs' ? 'active' : ''}`}
                          onClick={() => showBlock('constructs')}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faCrown} />
                          <span>Конструкції</span>
                        </button>

                        <button
                          className={`diagnosis-tab parodont ${activeBlock === 'parodont' ? 'active' : ''}`}
                          onClick={() => showBlock('parodont')}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faHeartPulse} />
                          <span>Пародонт</span>
                        </button>
                      </div>
                    </div>
                    <div className="diagnosis-groups">
                      <div className={`diagnosis-group ${openGroups.teeth_type ? 'open' : ''}`}>
                        <button
                          className="diagnosis-group-header"
                          onClick={() => toggleGroup('teeth_type')}
                          type="button"
                        >
                          <div className="diagnosis-group-left">
                            <FontAwesomeIcon icon={faTooth} />
                            <span>Тип зуба</span>
                          </div>

                          <span className="accordion-arrow">
                            <FontAwesomeIcon icon={faChevronDown} />
                          </span>
                        </button>

                        <div
                          className={`diagnosis-group-content ${!openGroups.teeth_type ? 'hidden' : ''}`}
                        >
                          <ul className="inline-list formula-action">
                            <li className={'w-full'}>
                              <div className={`flex`}>
                                <span
                                  className={`diagnoze-title flex-initial cursor-pointer ${teethType === 'adult' ? 'active' : ''}`}
                                  onClick={() => {
                                    dispatch(setTeethType('adult'));
                                    if (!tData.tooth51.show) {
                                      document.getElementById('TH-11').style.visibility = 'inherit';
                                      document.getElementById('TH-51').style.visibility = 'hidden';
                                    }
                                    if (!tData.tooth61.show) {
                                      document.getElementById('TH-21').style.visibility = 'inherit';
                                      document.getElementById('TH-61').style.visibility = 'hidden';
                                    }
                                    if (!tData.tooth52.show) {
                                      document.getElementById('TH-12').style.visibility = 'inherit';
                                      document.getElementById('TH-52').style.visibility = 'hidden';
                                    }
                                    if (!tData.tooth53.show) {
                                      document.getElementById('TH-13').style.visibility = 'inherit';
                                      document.getElementById('TH-53').style.visibility = 'hidden';
                                    }
                                    if (!tData.tooth54.show) {
                                      document.getElementById('TH-14').style.visibility = 'inherit';
                                      document.getElementById('TH-54').style.visibility = 'hidden';
                                    }
                                    if (!tData.tooth55.show) {
                                      document.getElementById('TH-15').style.visibility = 'inherit';
                                      document.getElementById('TH-55').style.visibility = 'hidden';
                                    }
                                  }}
                                >
                                  {msgFormula.get('formula.stable')}
                                </span>
                                <span
                                  className={`diagnoze-title flex-initial cursor-pointer ml-4 ${teethType !== 'adult' ? 'active' : ''}`}
                                  onClick={() => {
                                    dispatch(setTeethType('child'));
                                  }}
                                >
                                  {msgFormula.get('formula.milk')}
                                </span>
                              </div>
                            </li>
                            <div className={`clearfix`} />
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title`}
                                onClick={() => {
                                  // нажали показать все и вибран тип постоянние
                                  showAllTeeth();
                                }}
                              >
                                {msgFormula.get('formula.allteeth')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title ${diagnozis === 'absent' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setDiagnosis(diagnozis === 'absent' ? '' : 'absent'));
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.absent.tooth')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title flex-initial cursor-pointer`}
                                onClick={() => console.log(1)}
                              >
                                {msgFormula.get('formula.absent.top.teeth')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title flex-initial cursor-pointer`}
                                onClick={() => console.log(1)}
                              >
                                {msgFormula.get('formula.absent.bottom.teeth')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title flex-initial cursor-pointer`}
                                onClick={() => console.log(1)}
                              >
                                {msgFormula.get('formula.absent.all')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title ${diagnozis === 'apex' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(setDiagnosis(diagnozis === 'apex' ? '' : 'apex'));
                                }}
                              >
                                {msgFormula.get('formula.apex')}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className={'clearfix'}></div>
                      <div
                        className={`diagnosis-group injuries ${openGroups.injuries ? 'open' : ''}`}
                      >
                        <button
                          className="diagnosis-group-header"
                          onClick={() => toggleGroup('injuries')}
                          type="button"
                        >
                          <div className="diagnosis-group-left">
                            <FontAwesomeIcon icon={faTriangleExclamation} color={'#f59e0b'} />
                            <span>Ураження</span>
                          </div>

                          <span className="accordion-arrow">
                            <FontAwesomeIcon icon={faChevronDown} color={'#f59e0b'} />
                          </span>
                        </button>

                        <div
                          className={`diagnosis-group-content ${!openGroups.injuries ? 'hidden' : ''}`}
                          id="injuries-conent"
                        >
                          <ul className="inline-list formula-action">
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title ${diagnozis === 'change_color' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(
                                    setDiagnosis(diagnozis === 'change_color' ? '' : 'change_color')
                                  );
                                }}
                              >
                                {msgFormula.get('formula.change.color')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title ${diagnozis === 'fissure' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(setDiagnosis(diagnozis === 'fissure' ? '' : 'fissure'));
                                }}
                              >
                                {msgFormula.get('formula.fissure')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title ${diagnozis === 'caries' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(setDiagnosis(diagnozis === 'caries' ? '' : 'caries'));
                                }}
                              >
                                {msgFormula.get('formula.caries')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title ${diagnozis === 'cervical_caries' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(
                                    setDiagnosis(
                                      diagnozis === 'cervical_caries' ? '' : 'cervical_caries'
                                    )
                                  );
                                }}
                              >
                                {msgFormula.get('formula.cervical.caries')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                className={`diagnoze-title ${diagnozis === 'wedge_shaped_defect' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(
                                    setDiagnosis(
                                      diagnozis === 'wedge_shaped_defect'
                                        ? ''
                                        : 'wedge_shaped_defect'
                                    )
                                  );
                                }}
                              >
                                {msgFormula.get('formula.wedge.shaped.defect')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <div className="flex">
                                <div className="w-1/2">
                                  <span
                                    className={`diagnoze-title cursor-pointer
                                                                        pl-[8px] w-1/2 cursor-pointer
                                                                        ${diagnozis === 'tartar' ? 'active' : ''}`}
                                    onClick={() =>
                                      dispatch(setDiagnosis(diagnozis === 'tartar' ? '' : 'tartar'))
                                    }
                                  >
                                    {msgFormula.get('formula.tartar')}
                                  </span>
                                </div>
                                <div className="w-1/2 text-right">
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'tartar') {
                                        dispatch(setDiagnosis('tartar'));
                                      }
                                      dispatch(
                                        setSubDiagnosis(subdiagnozis === 'st1' ? '' : 'st1')
                                      );
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'st1' ? 'active' : ''} mr-1 cursor-pointer`}
                                  >
                                    1 ст
                                  </span>
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'tartar') {
                                        dispatch(setDiagnosis('tartar'));
                                      }
                                      dispatch(
                                        setSubDiagnosis(subdiagnozis === 'st2' ? '' : 'st2')
                                      );
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'st2' ? 'active' : ''} mr-1 cursor-pointer`}
                                  >
                                    2 ст
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className={`diagnosis-group endo ${openGroups.endo ? 'open' : ''}`}>
                        <button
                          className="diagnosis-group-header"
                          onClick={() => toggleGroup('endo')}
                          type="button"
                        >
                          <div className="diagnosis-group-left">
                            <FontAwesomeIcon icon={faSyringe} />
                            <span>Ендо</span>
                          </div>

                          <span className="accordion-arrow">
                            <FontAwesomeIcon icon={faChevronDown} color={'#f59e0b'} />
                          </span>
                        </button>

                        <div
                          className={`diagnosis-group-content ${!openGroups.endo ? 'hidden' : ''}`}
                        >
                          <ul className="inline-list formula-action">
                            <li className={'w-full'}>
                              <div className={`flex`}>
                                <span
                                  className={`diagnoze-title w-[50%] flex-initial cursor-pointer whitespace-nowrap ${diagnozis === 'paradont_health' ? 'active' : ''}`}
                                  onClick={() => {
                                    dispatch(setSubDiagnosis(''));
                                    dispatch(
                                      setDiagnosis(
                                        diagnozis === 'paradont_health' ? '' : 'paradont_health'
                                      )
                                    );
                                  }}
                                >
                                  {msgFormula.get('formula.parodontit.health')}
                                </span>
                                <span
                                  className={`diagnoze-title w-[50%] flex-initial text-right
                                                                    cursor-pointer ml-4 ${diagnozis === 'paradont_all_health' ? 'active' : ''}
                                                                `}
                                  onClick={() => {
                                    dispatch(setSubDiagnosis(''));
                                    dispatch(
                                      setDiagnosis(
                                        diagnozis === 'paradont_all_health'
                                          ? ''
                                          : 'paradont_all_health'
                                      )
                                    );
                                    paradontAllHealthTeeth();
                                  }}
                                >
                                  {msgFormula.get('formula.parodontit.health.all')}
                                </span>
                              </div>
                            </li>
                            <li className={'w-full'}>
                              <div className="flex">
                                <div className="w-1/2">
                                  <span
                                    className={`diagnoze-title cursor-pointer
                                                                        pl-[8px] w-1/2 cursor-pointer
                                                                        ${diagnozis === 'parodontit' ? 'active' : ''}`}
                                    onClick={() => {
                                      if (diagnozis === 'parodontit') {
                                        dispatch(setSubDiagnosis(''));
                                      }
                                      dispatch(
                                        setDiagnosis(diagnozis === 'parodontit' ? '' : 'parodontit')
                                      );
                                      dispatch(setSubDiagnosis('pst1'));
                                    }}
                                  >
                                    {msgFormula.get('formula.parodontit')}
                                  </span>
                                </div>
                                <div className="w-1/2 text-right">
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'parodontit') {
                                        dispatch(setDiagnosis('parodontit'));
                                        dispatch(
                                          setSubDiagnosis(subdiagnozis === 'pst1' ? '' : 'pst1')
                                        );
                                      } else if (
                                        diagnozis === 'parodontit' &&
                                        subdiagnozis !== 'pst1'
                                      ) {
                                        dispatch(setSubDiagnosis('pst1'));
                                      } else {
                                        dispatch(setDiagnosis(''));
                                        dispatch(setSubDiagnosis(''));
                                      }
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'pst1' ? 'active' : ''} mr-1 cursor-pointer`}
                                  >
                                    {msgFormula.get('formula.parodontit.st.1')}
                                  </span>
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'parodontit') {
                                        dispatch(setDiagnosis('parodontit'));
                                        dispatch(
                                          setSubDiagnosis(subdiagnozis === 'pst2' ? '' : 'pst2')
                                        );
                                      } else if (
                                        diagnozis === 'parodontit' &&
                                        subdiagnozis !== 'pst2'
                                      ) {
                                        dispatch(setSubDiagnosis('pst2'));
                                      } else {
                                        dispatch(setDiagnosis(''));
                                        dispatch(setSubDiagnosis(''));
                                      }
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'pst2' ? 'active' : ''} mr-1 cursor-pointer`}
                                  >
                                    {msgFormula.get('formula.parodontit.st.2')}
                                  </span>
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'parodontit') {
                                        dispatch(setDiagnosis('parodontit'));
                                        dispatch(
                                          setSubDiagnosis(subdiagnozis === 'pst3' ? '' : 'pst3')
                                        );
                                      } else if (
                                        diagnozis === 'parodontit' &&
                                        subdiagnozis !== 'pst3'
                                      ) {
                                        dispatch(setSubDiagnosis('pst3'));
                                      } else {
                                        dispatch(setDiagnosis(''));
                                        dispatch(setSubDiagnosis(''));
                                      }
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'pst3' ? 'active' : ''} cursor-pointer`}
                                  >
                                    {msgFormula.get('formula.parodontit.st.3')}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className={`clearfix`} />
                            <li style={{ marginTop: '-15px', float: 'right' }} className={'w-full'}>
                              <div className={'float-right'}>
                                <span
                                  onClick={() => {
                                    paradontAllStageTeeth('pst1');
                                    dispatch(setChangeDia(Math.random()));
                                    dispatch(setSubDiagnosis('allst1'));
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'allst1' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.all.st.1')}
                                </span>
                                <span
                                  onClick={() => {
                                    dispatch(setChangeDia(Math.random()));
                                    paradontAllStageTeeth('pst2');
                                    dispatch(setChangeDia(Math.random()));
                                    dispatch(
                                      setSubDiagnosis(subdiagnozis === 'allst2' ? '' : 'allst2')
                                    );
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'allst2' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.all.st.2')}
                                </span>
                                <span
                                  onClick={() => {
                                    paradontAllStageTeeth('pst3');
                                    dispatch(setChangeDia(Math.random()));
                                    dispatch(
                                      setSubDiagnosis(subdiagnozis === 'allst3' ? '' : 'allst3')
                                    );
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'allst3' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.all.st.3')}
                                </span>
                              </div>
                            </li>
                            <li style={{ clear: 'both' }} />
                            <li className={'w-full'}>
                              <span
                                onClick={() => {
                                  dispatch(setDiagnosis('no_inflammatory_process'));
                                }}
                                className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'no_inflammatory_process' ? 'active' : ''}`}
                              >
                                {msgFormula.get('formula.no_inflammatory_process')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                onClick={() => {
                                  dispatch(setDiagnosis('inflamed_gums'));
                                }}
                                className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'inflamed_gums' ? 'active' : ''}`}
                              >
                                {msgFormula.get('formula.inflamed_gums')}
                              </span>
                            </li>
                            <li className={'w-full'}>
                              <span
                                onClick={() => {
                                  dispatch(setDiagnosis('significantly_gums'));
                                }}
                                className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'significantly_gums' ? 'active' : ''}`}
                              >
                                {msgFormula.get('formula.significantly_gums')}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className={`diagnosis-group constructs ${openGroups.constructs ? 'open' : ''}`}
                      >
                        <button
                          className="diagnosis-group-header"
                          onClick={() => toggleGroup('constructs')}
                          type="button"
                        >
                          <div className="diagnosis-group-left">
                            <FontAwesomeIcon icon={faCrown} />
                            <span>Конструкції</span>
                          </div>

                          <span className="accordion-arrow">
                            <FontAwesomeIcon icon={faChevronDown} color={'#f59e0b'} />
                          </span>
                        </button>

                        <div
                          className={`diagnosis-group-content ${!openGroups.constructs ? 'hidden' : ''}`}
                        >
                          <ul className="inline-list formula-action mt-3.5">
                            {/* ПЛОМБА */}
                            <li className="w-full">
                              <span
                                className={`diagnoze-title ${diagnozis === 'seal' ? 'active' : ''} mr-10`}
                                onClick={() => {
                                  if (diagnozis !== 'seal') {
                                    dispatch(setDiagnosis('seal'));
                                    dispatch(setSealColor1('blue'));
                                    dispatch(setSealColor2(''));
                                    dispatch(setSealColor3(''));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealColor1(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.seal')}
                              </span>
                              <div className="inline float-right">
                                <span
                                  data-tooltip="Пломба"
                                  data-tooltip-position="top"
                                  onClick={() => {
                                    if (diagnozis !== 'seal') {
                                      dispatch(setDiagnosis('seal'));
                                      dispatch(setSealColor1('blue'));
                                    } else if (diagnozis === 'seal' && sealColor1 != 'blue') {
                                      dispatch(setSealColor1('blue'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSealColor1(''));
                                    }
                                    dispatch(setSealColor2(''));
                                    dispatch(setSealColor3(''));
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-blue cursor-pointer ${sealColor1 === 'blue' && diagnozis === 'seal' && 'active'}`}
                                />
                                <span
                                  data-tooltip-position="top"
                                  data-tooltip="Вторинний карієс"
                                  onClick={() => {
                                    if (diagnozis !== 'seal') {
                                      dispatch(setDiagnosis('seal'));
                                      dispatch(setSealColor2('yellow'));
                                    } else if (diagnozis === 'seal' && sealColor2 != 'yellow') {
                                      dispatch(setSealColor2('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSealColor2(''));
                                    }
                                    dispatch(setSealColor1(''));
                                    dispatch(setSealColor3(''));
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-yellow cursor-pointer ${sealColor2 === 'yellow' && diagnozis === 'seal' && 'active'}`}
                                />
                                <span
                                  data-tooltip-position="top"
                                  data-tooltip="Пломба з порушеним крайовим приляганням"
                                  onClick={() => {
                                    if (diagnozis !== 'seal') {
                                      dispatch(setDiagnosis('seal'));
                                      dispatch(setSealColor3('pink'));
                                    } else if (diagnozis === 'seal' && sealColor3 != 'pink') {
                                      dispatch(setSealColor3('pink'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSealColor3(''));
                                    }
                                    dispatch(setSealColor1(''));
                                    dispatch(setSealColor2(''));
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-pink cursor-pointer ${sealColor3 === 'pink' && diagnozis === 'seal' && 'active'}`}
                                />
                              </div>
                            </li>

                            {/* ПРИШИЙКОВА ПЛОМБА */}
                            <li className="w-full">
                              <span
                                className={`diagnoze-title ${diagnozis === 'seal_cervical' ? 'active' : ''} mr-10`}
                                onClick={() => {
                                  if (diagnozis !== 'seal_cervical') {
                                    dispatch(setDiagnosis('seal_cervical'));
                                    dispatch(setSealServicalColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealServicalColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.seal_cervical')}
                              </span>
                              <div className="inline float-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'seal_cervical') {
                                      dispatch(setDiagnosis('seal_cervical'));
                                      dispatch(setSealServicalColor('blue'));
                                    } else if (
                                      diagnozis === 'seal_cervical' &&
                                      scColor !== 'blue'
                                    ) {
                                      dispatch(setSealServicalColor('blue'));
                                    } else if (
                                      diagnozis === 'seal_cervical' &&
                                      scColor !== 'yellow'
                                    ) {
                                      dispatch(setSealServicalColor('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSealServicalColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-blue cursor-pointer ${scColor === 'blue' && diagnozis === 'seal_cervical' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'seal_cervical') {
                                      dispatch(setDiagnosis('seal_cervical'));
                                      dispatch(setSealServicalColor('yellow'));
                                    } else if (
                                      diagnozis === 'seal_cervical' &&
                                      scColor !== 'yellow'
                                    ) {
                                      dispatch(setSealServicalColor('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSealServicalColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-yellow cursor-pointer ${scColor === 'yellow' && diagnozis === 'seal_cervical' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'seal_cervical') {
                                      dispatch(setDiagnosis('seal_cervical'));
                                      dispatch(setSealServicalColor('pink'));
                                    } else if (
                                      diagnozis === 'seal_cervical' &&
                                      scColor !== 'yellow'
                                    ) {
                                      dispatch(setSealServicalColor('pink'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSealServicalColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-pink cursor-pointer ${scColor === 'pink' && diagnozis === 'seal_cervical' && 'active'}`}
                                />
                              </div>
                            </li>

                            {/* ВІНІР */}
                            <li className="w-full">
                              <span
                                className={`diagnoze-title ${diagnozis === 'vinir' ? 'active' : ''} mr-10`}
                                onClick={() => {
                                  if (diagnozis !== 'vinir') {
                                    dispatch(setDiagnosis('vinir'));
                                    dispatch(setVinirColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setVinirColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.vinir')}
                              </span>
                              <div className="inline float-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'vinir') {
                                      dispatch(setDiagnosis('vinir'));
                                      dispatch(setVinirColor('blue'));
                                    } else if (diagnozis === 'vinir' && vinirColor !== 'blue') {
                                      dispatch(setVinirColor('blue'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setVinirColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-blue cursor-pointer ${vinirColor === 'blue' && diagnozis === 'vinir' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'vinir') {
                                      dispatch(setDiagnosis('vinir'));
                                      dispatch(setVinirColor('yellow'));
                                    } else if (diagnozis === 'vinir' && vinirColor !== 'yellow') {
                                      dispatch(setVinirColor('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setVinirColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-yellow cursor-pointer ${vinirColor === 'yellow' && diagnozis === 'vinir' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'vinir') {
                                      dispatch(setDiagnosis('vinir'));
                                      dispatch(setVinirColor('pink'));
                                    } else if (diagnozis === 'vinir' && scColor !== 'yellow') {
                                      dispatch(setVinirColor('pink'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setVinirColor(''));
                                    }
                                  }}
                                  className={`circle-pink cursor-pointer ${vinirColor === 'pink' && diagnozis === 'vinir' && 'active'}`}
                                />
                              </div>
                            </li>
                            {/* ТИМЧАСОВА КОРОНКА */}
                            <li className="w-full">
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'temporary_crown') {
                                    dispatch(setDiagnosis('temporary_crown'));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`diagnoze-title ${diagnozis === 'temporary_crown' ? 'active' : ''} mr-10`}
                              >
                                {msgFormula.get('formula.temporary.crown')}
                              </span>
                            </li>
                            {/* КОРОНКА КЕРАМІЧНА */}
                            <li className="w-full">
                              <span
                                className={`diagnoze-title ${diagnozis === 'ceramic_crown' ? 'active' : ''} mr-10`}
                                onClick={() => {
                                  if (diagnozis !== 'ceramic_crown') {
                                    dispatch(setDiagnosis('ceramic_crown'));
                                    dispatch(setCeramicCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.ceramic.crown')}
                              </span>
                              <div className="inline float-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'ceramic_crown') {
                                      dispatch(setDiagnosis('ceramic_crown'));
                                      dispatch(setCeramicCrownColor('blue'));
                                    } else if (
                                      diagnozis === 'ceramic_crown' &&
                                      ceramicCrownColor != 'blue'
                                    ) {
                                      dispatch(setCeramicCrownColor('blue'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setCeramicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-blue cursor-pointer ${ceramicCrownColor === 'blue' && diagnozis === 'ceramic_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'ceramic_crown') {
                                      dispatch(setDiagnosis('ceramic_crown'));
                                      dispatch(setCeramicCrownColor('yellow'));
                                    } else if (
                                      diagnozis === 'ceramic_crown' &&
                                      ceramicCrownColor != 'yellow'
                                    ) {
                                      dispatch(setCeramicCrownColor('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setCeramicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-yellow cursor-pointer ${ceramicCrownColor === 'yellow' && diagnozis === 'ceramic_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'ceramic_crown') {
                                      dispatch(setDiagnosis('ceramic_crown'));
                                      dispatch(setSealColor3('pink'));
                                    } else if (
                                      diagnozis === 'ceramic_crown' &&
                                      ceramicCrownColor != 'pink'
                                    ) {
                                      dispatch(setCeramicCrownColor('pink'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setCeramicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-pink cursor-pointer ${ceramicCrownColor === 'pink' && diagnozis === 'ceramic_crown' && 'active'}`}
                                />
                              </div>
                            </li>
                            {/* КОРОНКА МЕТАЛОКЕРАМІЧНА */}
                            <li className="w-full">
                              <span
                                className={`diagnoze-title ${diagnozis === 'mceramic_crown' ? 'active' : ''} mr-10`}
                                onClick={() => {
                                  if (diagnozis !== 'mceramic_crown') {
                                    dispatch(setDiagnosis('mceramic_crown'));
                                    dispatch(setMCeramicCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.ceramic.mcrown')}
                              </span>
                              <div className="inline float-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'mceramic_crown') {
                                      dispatch(setDiagnosis('mceramic_crown'));
                                      dispatch(setMCeramicCrownColor('blue'));
                                    } else if (
                                      diagnozis === 'mceramic_crown' &&
                                      mceramicCrownColor != 'blue'
                                    ) {
                                      dispatch(setMCeramicCrownColor('blue'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setMCeramicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-blue cursor-pointer ${mceramicCrownColor === 'blue' && diagnozis === 'mceramic_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'mceramic_crown') {
                                      dispatch(setDiagnosis('mceramic_crown'));
                                      dispatch(setMCeramicCrownColor('yellow'));
                                    } else if (
                                      diagnozis === 'mceramic_crown' &&
                                      mceramicCrownColor != 'yellow'
                                    ) {
                                      dispatch(setMCeramicCrownColor('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setMCeramicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-yellow cursor-pointer ${mceramicCrownColor === 'yellow' && diagnozis === 'mceramic_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'mceramic_crown') {
                                      dispatch(setDiagnosis('mceramic_crown'));
                                      dispatch(setMCeramicCrownColor('pink'));
                                    } else if (
                                      diagnozis === 'mceramic_crown' &&
                                      mceramicCrownColor != 'pink'
                                    ) {
                                      dispatch(setMCeramicCrownColor('pink'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setMCeramicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-pink cursor-pointer ${mceramicCrownColor === 'pink' && diagnozis === 'mceramic_crown' && 'active'}`}
                                />
                              </div>
                            </li>
                            {/* КОРОНКА МЕТАЛЕВА */}
                            <li className="w-full">
                              <span
                                className={`diagnoze-title ${diagnozis === 'metalic_crown' ? 'active' : ''} mr-10`}
                                onClick={() => {
                                  if (diagnozis !== 'metalic_crown') {
                                    dispatch(setDiagnosis('metalic_crown'));
                                    dispatch(setMetalicCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMetalicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.ceramic.metaliccrown')}
                              </span>
                              <div className="inline float-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'metalic_crown') {
                                      dispatch(setDiagnosis('metalic_crown'));
                                      dispatch(setMetalicCrownColor('blue'));
                                    } else if (
                                      diagnozis === 'metalic_crown' &&
                                      metalicCrownColor != 'blue'
                                    ) {
                                      dispatch(setMetalicCrownColor('blue'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setMetalicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-blue cursor-pointer ${metalicCrownColor === 'blue' && diagnozis === 'metalic_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'metalic_crown') {
                                      dispatch(setDiagnosis('metalic_crown'));
                                      dispatch(setMetalicCrownColor('yellow'));
                                    } else if (
                                      diagnozis === 'metalic_crown' &&
                                      metalicCrownColor != 'yellow'
                                    ) {
                                      dispatch(setMetalicCrownColor('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setMetalicCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-yellow cursor-pointer ${metalicCrownColor === 'yellow' && diagnozis === 'metalic_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'metalic_crown') {
                                      dispatch(setDiagnosis('metalic_crown'));
                                      dispatch(setMetalicCrownColor('pink'));
                                    } else if (
                                      diagnozis === 'metalic_crown' &&
                                      metalicCrownColor != 'pink'
                                    ) {
                                      dispatch(setMetalicCrownColor('pink'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setMetalicCrownColor(''));
                                    }
                                  }}
                                  className={`circle-pink cursor-pointer ${metalicCrownColor === 'pink' && diagnozis === 'metalic_crown' && 'active'}`}
                                />
                              </div>
                            </li>
                            {/* КОРОНКА ЦИРКОНІЄВАЯ */}
                            <li className="w-full">
                              <span
                                className={`diagnoze-title ${diagnozis === 'zirconia_crown' ? 'active' : ''} mr-10`}
                                onClick={() => {
                                  if (diagnozis !== 'zirconia_crown') {
                                    dispatch(setDiagnosis('zirconia_crown'));
                                    dispatch(setZirconiaCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setZirconiaCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.zirconia.crown')}
                              </span>
                              <div className="inline float-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'zirconia_crown') {
                                      dispatch(setDiagnosis('zirconia_crown'));
                                      dispatch(setZirconiaCrownColor('blue'));
                                    } else if (
                                      diagnozis === 'zirconia_crown' &&
                                      zirconiaCrownColor != 'blue'
                                    ) {
                                      dispatch(setZirconiaCrownColor('blue'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setZirconiaCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-blue cursor-pointer ${zirconiaCrownColor === 'blue' && diagnozis === 'zirconia_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'zirconia_crown') {
                                      dispatch(setDiagnosis('zirconia_crown'));
                                      dispatch(setZirconiaCrownColor('yellow'));
                                    } else if (
                                      diagnozis === 'zirconia_crown' &&
                                      zirconiaCrownColor != 'yellow'
                                    ) {
                                      dispatch(setZirconiaCrownColor('yellow'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setZirconiaCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-yellow cursor-pointer ${zirconiaCrownColor === 'yellow' && diagnozis === 'zirconia_crown' && 'active'}`}
                                />
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'zirconia_crown') {
                                      dispatch(setDiagnosis('zirconia_crown'));
                                      dispatch(setZirconiaCrownColor('pink'));
                                    } else if (
                                      diagnozis === 'zirconia_crown' &&
                                      zirconiaCrownColor != 'pink'
                                    ) {
                                      dispatch(setZirconiaCrownColor('pink'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setZirconiaCrownColor(''));
                                    }
                                    dispatch(setSubDiagnosis(''));
                                  }}
                                  className={`circle-pink cursor-pointer ${zirconiaCrownColor === 'pink' && diagnozis === 'zirconia_crown' && 'active'}`}
                                />
                              </div>
                            </li>
                            {/* ШТИФТ */}
                            <li
                              style={{
                                display: teethType === 'child' ? 'none' : 'inherit',
                              }}
                            >
                              <span
                                className={`diagnoze-title ${diagnozis === 'pin' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setDiagnosis(diagnozis === 'pin' ? '' : 'pin'));
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.pin')}
                              </span>
                            </li>
                            {/* КУЛЬТОВА НАКЛАДКА */}
                            <li
                              style={{
                                display: teethType === 'child' ? 'none' : 'inherit',
                              }}
                            >
                              <span
                                className={`diagnoze-title ${diagnozis === 'culttab' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setDiagnosis(diagnozis === 'culttab' ? '' : 'culttab'));
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.cult.tab')}
                              </span>
                            </li>
                            {/* АБАТМЕНТ */}
                            <li
                              style={{
                                display: teethType === 'child' ? 'none' : 'inherit',
                              }}
                            >
                              <span
                                className={`diagnoze-title ${diagnozis === 'abutment' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(
                                    setDiagnosis(diagnozis === 'abutment' ? '' : 'abutment')
                                  );
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.abutment')}
                              </span>
                            </li>
                            {/* ФОРМУВАЧ */}
                            <li
                              style={{
                                display: teethType === 'child' ? 'none' : 'inherit',
                              }}
                            >
                              <span
                                className={`diagnoze-title ${diagnozis === 'shaper' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setDiagnosis(diagnozis === 'shaper' ? '' : 'shaper'));
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.shaper')}
                              </span>
                            </li>
                            {/* ІМПЛАНТ */}
                            <li
                              style={{
                                display: teethType === 'child' ? 'none' : 'inherit',
                              }}
                            >
                              <span
                                className={`diagnoze-title ${diagnozis === 'implant' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setDiagnosis(diagnozis === 'implant' ? '' : 'implant'));
                                  dispatch(setSubDiagnosis(''));
                                }}
                              >
                                {msgFormula.get('formula.implant')}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div
                        className={`diagnosis-group parodont ${openGroups.parodont ? 'open' : ''}`}
                      >
                        <button
                          className="diagnosis-group-header"
                          onClick={() => toggleGroup('parodont')}
                          type="button"
                        >
                          <div className="diagnosis-group-left">
                            <FontAwesomeIcon icon={faHeartPulse} />
                            <span>Парадонт</span>
                          </div>

                          <span className="accordion-arrow">
                            <FontAwesomeIcon icon={faChevronDown} />
                          </span>
                        </button>

                        <div
                          className={`diagnosis-group-content ${!openGroups.parodont ? 'hidden' : ''}`}
                        >
                          <ul className="inline-list formula-action">
                            <li className={'w-full'}>
                              <div className={`flex`}>
                                <span
                                  className={`diagnoze-title w-[50%] flex-initial cursor-pointer whitespace-nowrap ${diagnozis === 'paradont_health' ? 'active' : ''}`}
                                  onClick={() => {
                                    dispatch(setSubDiagnosis(''));
                                    dispatch(
                                      setDiagnosis(
                                        diagnozis === 'paradont_health' ? '' : 'paradont_health'
                                      )
                                    );
                                  }}
                                >
                                  {msgFormula.get('formula.parodontit.health')}
                                </span>
                                <span
                                  className={`diagnoze-title w-[50%] flex-initial text-right
                                                                    cursor-pointer ml-4 ${diagnozis === 'paradont_all_health' ? 'active' : ''}
                                                                `}
                                  onClick={() => {
                                    dispatch(setSubDiagnosis(''));
                                    dispatch(
                                      setDiagnosis(
                                        diagnozis === 'paradont_all_health'
                                          ? ''
                                          : 'paradont_all_health'
                                      )
                                    );
                                    paradontAllHealthTeeth();
                                  }}
                                >
                                  {msgFormula.get('formula.parodontit.health.all')}
                                </span>
                              </div>
                            </li>
                            <li className={'w-full'}>
                              <div className="flex">
                                <div className="w-1/2">
                                  <span
                                    className={`diagnoze-title cursor-pointer
                                                                        pl-[8px] w-1/2 cursor-pointer
                                                                        ${diagnozis === 'parodontit' ? 'active' : ''}`}
                                    onClick={() => {
                                      if (diagnozis === 'parodontit') {
                                        dispatch(setSubDiagnosis(''));
                                      }
                                      dispatch(
                                        setDiagnosis(diagnozis === 'parodontit' ? '' : 'parodontit')
                                      );
                                      dispatch(setSubDiagnosis('pst1'));
                                    }}
                                  >
                                    {msgFormula.get('formula.parodontit')}
                                  </span>
                                </div>
                                <div className="w-1/2 text-right">
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'parodontit') {
                                        dispatch(setDiagnosis('parodontit'));
                                        dispatch(
                                          setSubDiagnosis(subdiagnozis === 'pst1' ? '' : 'pst1')
                                        );
                                      } else if (
                                        diagnozis === 'parodontit' &&
                                        subdiagnozis !== 'pst1'
                                      ) {
                                        dispatch(setSubDiagnosis('pst1'));
                                      } else {
                                        dispatch(setDiagnosis(''));
                                        dispatch(setSubDiagnosis(''));
                                      }
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'pst1' ? 'active' : ''} mr-1 cursor-pointer`}
                                  >
                                    {msgFormula.get('formula.parodontit.st.1')}
                                  </span>
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'parodontit') {
                                        dispatch(setDiagnosis('parodontit'));
                                        dispatch(
                                          setSubDiagnosis(subdiagnozis === 'pst2' ? '' : 'pst2')
                                        );
                                      } else if (
                                        diagnozis === 'parodontit' &&
                                        subdiagnozis !== 'pst2'
                                      ) {
                                        dispatch(setSubDiagnosis('pst2'));
                                      } else {
                                        dispatch(setDiagnosis(''));
                                        dispatch(setSubDiagnosis(''));
                                      }
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'pst2' ? 'active' : ''} mr-1 cursor-pointer`}
                                  >
                                    {msgFormula.get('formula.parodontit.st.2')}
                                  </span>
                                  <span
                                    onClick={() => {
                                      if (diagnozis !== 'parodontit') {
                                        dispatch(setDiagnosis('parodontit'));
                                        dispatch(
                                          setSubDiagnosis(subdiagnozis === 'pst3' ? '' : 'pst3')
                                        );
                                      } else if (
                                        diagnozis === 'parodontit' &&
                                        subdiagnozis !== 'pst3'
                                      ) {
                                        dispatch(setSubDiagnosis('pst3'));
                                      } else {
                                        dispatch(setDiagnosis(''));
                                        dispatch(setSubDiagnosis(''));
                                      }
                                    }}
                                    className={`diagnoze-title ${subdiagnozis === 'pst3' ? 'active' : ''} cursor-pointer`}
                                  >
                                    {msgFormula.get('formula.parodontit.st.3')}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className={`clearfix`} />
                            <li className={'w-full'} style={{ marginTop: '-15px', float: 'right' }}>
                              <div className={'float-right'}>
                                <span
                                  onClick={() => {
                                    paradontAllStageTeeth('pst1');
                                    dispatch(setChangeDia(Math.random()));
                                    dispatch(setSubDiagnosis('allst1'));
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'allst1' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.all.st.1')}
                                </span>
                                <span
                                  onClick={() => {
                                    dispatch(setChangeDia(Math.random()));
                                    paradontAllStageTeeth('pst2');
                                    dispatch(setChangeDia(Math.random()));
                                    dispatch(
                                      setSubDiagnosis(subdiagnozis === 'allst2' ? '' : 'allst2')
                                    );
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'allst2' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.all.st.2')}
                                </span>
                                <span
                                  onClick={() => {
                                    paradontAllStageTeeth('pst3');
                                    dispatch(setChangeDia(Math.random()));
                                    dispatch(
                                      setSubDiagnosis(subdiagnozis === 'allst3' ? '' : 'allst3')
                                    );
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'allst3' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.all.st.3')}
                                </span>
                              </div>
                            </li>
                            <li style={{ clear: 'both' }} />
                            <li className={'w-full'}>
                              <span
                                onClick={() => {
                                  dispatch(setDiagnosis('no_inflammatory_process'));
                                }}
                                className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'no_inflammatory_process' ? 'active' : ''}`}
                              >
                                {msgFormula.get('formula.no_inflammatory_process')}
                              </span>
                            </li>
                            <li>
                              <span
                                onClick={() => {
                                  dispatch(setDiagnosis('inflamed_gums'));
                                }}
                                className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'inflamed_gums' ? 'active' : ''}`}
                              >
                                {msgFormula.get('formula.inflamed_gums')}
                              </span>
                            </li>
                            <li>
                              <span
                                onClick={() => {
                                  dispatch(setDiagnosis('significantly_gums'));
                                }}
                                className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'significantly_gums' ? 'active' : ''}`}
                              >
                                {msgFormula.get('formula.significantly_gums')}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix w-full"></div>
                  <div className="flex p-2 hidden">
                    <div className="w-full">
                      <div className="clearfix"></div>
                      <div className="action-block" id="teethType">
                        <h4 className="formula-block-title mb-4">
                          {msg.get('patient.teeth.type')}
                        </h4>
                        <ul className="inline-list formula-action">
                          <li>
                            <div className={`flex`}>
                              <span
                                className={`diagnoze-title flex-initial cursor-pointer ${teethType === 'adult' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setTeethType('adult'));
                                  if (!tData.tooth51.show) {
                                    document.getElementById('TH-11').style.visibility = 'inherit';
                                    document.getElementById('TH-51').style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth61.show) {
                                    document.getElementById('TH-21').style.visibility = 'inherit';
                                    document.getElementById('TH-61').style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth52.show) {
                                    document.getElementById('TH-12').style.visibility = 'inherit';
                                    document.getElementById('TH-52').style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth53.show) {
                                    document.getElementById('TH-13').style.visibility = 'inherit';
                                    document.getElementById('TH-53').style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth54.show) {
                                    document.getElementById('TH-14').style.visibility = 'inherit';
                                    document.getElementById('TH-54').style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth55.show) {
                                    document.getElementById('TH-15').style.visibility = 'inherit';
                                    document.getElementById('TH-55').style.visibility = 'hidden';
                                  }
                                }}
                              >
                                {msgFormula.get('formula.stable')}
                              </span>
                              <span
                                className={`diagnoze-title flex-initial cursor-pointer ml-4 ${teethType !== 'adult' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setTeethType('child'));
                                }}
                              >
                                {msgFormula.get('formula.milk')}
                              </span>
                            </div>
                          </li>
                          <div className={`clearfix`} />
                          <li>
                            <span
                              className={`diagnoze-title`}
                              onClick={() => {
                                // нажали показать все и вибран тип постоянние
                                showAllTeeth();
                              }}
                            >
                              {msgFormula.get('formula.allteeth')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title ${diagnozis === 'absent' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setDiagnosis(diagnozis === 'absent' ? '' : 'absent'));
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.absent.tooth')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title flex-initial cursor-pointer`}
                              onClick={() => console.log(1)}
                            >
                              {msgFormula.get('formula.absent.top.teeth')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title flex-initial cursor-pointer`}
                              onClick={() => console.log(1)}
                            >
                              {msgFormula.get('formula.absent.bottom.teeth')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title flex-initial cursor-pointer`}
                              onClick={() => console.log(1)}
                            >
                              {msgFormula.get('formula.absent.all')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title ${diagnozis === 'apex' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(setDiagnosis(diagnozis === 'apex' ? '' : 'apex'));
                              }}
                            >
                              {msgFormula.get('formula.apex')}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="action-block mt-4" id="injuries">
                        <h4 className="formula-block-title mb-4">
                          {msg.get('patient.teeth.destroy')}
                        </h4>
                        <ul className="inline-list formula-action">
                          <li>
                            <span
                              className={`diagnoze-title ${diagnozis === 'change_color' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(
                                  setDiagnosis(diagnozis === 'change_color' ? '' : 'change_color')
                                );
                              }}
                            >
                              {msgFormula.get('formula.change.color')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title ${diagnozis === 'fissure' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(setDiagnosis(diagnozis === 'fissure' ? '' : 'fissure'));
                              }}
                            >
                              {msgFormula.get('formula.fissure')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title ${diagnozis === 'caries' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(setDiagnosis(diagnozis === 'caries' ? '' : 'caries'));
                              }}
                            >
                              {msgFormula.get('formula.caries')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title ${diagnozis === 'cervical_caries' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'cervical_caries' ? '' : 'cervical_caries'
                                  )
                                );
                              }}
                            >
                              {msgFormula.get('formula.cervical.caries')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title ${diagnozis === 'wedge_shaped_defect' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'wedge_shaped_defect' ? '' : 'wedge_shaped_defect'
                                  )
                                );
                              }}
                            >
                              {msgFormula.get('formula.wedge.shaped.defect')}
                            </span>
                          </li>
                          <li>
                            <div className="flex">
                              <div className="w-1/2">
                                <span
                                  className={`diagnoze-title cursor-pointer
                                                                        pl-[8px] w-1/2 cursor-pointer
                                                                        ${diagnozis === 'tartar' ? 'active' : ''}`}
                                  onClick={() =>
                                    dispatch(setDiagnosis(diagnozis === 'tartar' ? '' : 'tartar'))
                                  }
                                >
                                  {msgFormula.get('formula.tartar')}
                                </span>
                              </div>
                              <div className="w-1/2 text-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'tartar') {
                                      dispatch(setDiagnosis('tartar'));
                                    }
                                    dispatch(setSubDiagnosis(subdiagnozis === 'st1' ? '' : 'st1'));
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'st1' ? 'active' : ''} mr-1 cursor-pointer`}
                                >
                                  1 ст
                                </span>
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'tartar') {
                                      dispatch(setDiagnosis('tartar'));
                                    }
                                    dispatch(setSubDiagnosis(subdiagnozis === 'st2' ? '' : 'st2'));
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'st2' ? 'active' : ''} mr-1 cursor-pointer`}
                                >
                                  2 ст
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/*NOT WORKED*/}
                      <div className="action-block mt-4" id="paradont">
                        <h4 className="formula-block-title mb-4">
                          {msg.get('patient.teeth.paradont')}
                        </h4>
                        <ul className="inline-list formula-action">
                          <li>
                            <div className={`flex`}>
                              <span
                                className={`diagnoze-title w-[50%] flex-initial cursor-pointer whitespace-nowrap ${diagnozis === 'paradont_health' ? 'active' : ''}`}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(
                                    setDiagnosis(
                                      diagnozis === 'paradont_health' ? '' : 'paradont_health'
                                    )
                                  );
                                }}
                              >
                                {msgFormula.get('formula.parodontit.health')}
                              </span>
                              <span
                                className={`diagnoze-title w-[50%] flex-initial text-right
                                                                    cursor-pointer ml-4 ${diagnozis === 'paradont_all_health' ? 'active' : ''}
                                                                `}
                                onClick={() => {
                                  dispatch(setSubDiagnosis(''));
                                  dispatch(
                                    setDiagnosis(
                                      diagnozis === 'paradont_all_health'
                                        ? ''
                                        : 'paradont_all_health'
                                    )
                                  );
                                  paradontAllHealthTeeth();
                                }}
                              >
                                {msgFormula.get('formula.parodontit.health.all')}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="flex">
                              <div className="w-1/2">
                                <span
                                  className={`diagnoze-title cursor-pointer
                                                                        pl-[8px] w-1/2 cursor-pointer
                                                                        ${diagnozis === 'parodontit' ? 'active' : ''}`}
                                  onClick={() => {
                                    if (diagnozis === 'parodontit') {
                                      dispatch(setSubDiagnosis(''));
                                    }
                                    dispatch(
                                      setDiagnosis(diagnozis === 'parodontit' ? '' : 'parodontit')
                                    );
                                    dispatch(setSubDiagnosis('pst1'));
                                  }}
                                >
                                  {msgFormula.get('formula.parodontit')}
                                </span>
                              </div>
                              <div className="w-1/2 text-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'parodontit') {
                                      dispatch(setDiagnosis('parodontit'));
                                      dispatch(
                                        setSubDiagnosis(subdiagnozis === 'pst1' ? '' : 'pst1')
                                      );
                                    } else if (
                                      diagnozis === 'parodontit' &&
                                      subdiagnozis !== 'pst1'
                                    ) {
                                      dispatch(setSubDiagnosis('pst1'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSubDiagnosis(''));
                                    }
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'pst1' ? 'active' : ''} mr-1 cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.st.1')}
                                </span>
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'parodontit') {
                                      dispatch(setDiagnosis('parodontit'));
                                      dispatch(
                                        setSubDiagnosis(subdiagnozis === 'pst2' ? '' : 'pst2')
                                      );
                                    } else if (
                                      diagnozis === 'parodontit' &&
                                      subdiagnozis !== 'pst2'
                                    ) {
                                      dispatch(setSubDiagnosis('pst2'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSubDiagnosis(''));
                                    }
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'pst2' ? 'active' : ''} mr-1 cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.st.2')}
                                </span>
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'parodontit') {
                                      dispatch(setDiagnosis('parodontit'));
                                      dispatch(
                                        setSubDiagnosis(subdiagnozis === 'pst3' ? '' : 'pst3')
                                      );
                                    } else if (
                                      diagnozis === 'parodontit' &&
                                      subdiagnozis !== 'pst3'
                                    ) {
                                      dispatch(setSubDiagnosis('pst3'));
                                    } else {
                                      dispatch(setDiagnosis(''));
                                      dispatch(setSubDiagnosis(''));
                                    }
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'pst3' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.parodontit.st.3')}
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className={`clearfix`} />
                          <li style={{ marginTop: '-15px', float: 'right' }}>
                            <div>
                              <span
                                onClick={() => {
                                  paradontAllStageTeeth('pst1');
                                  dispatch(setChangeDia(Math.random()));
                                  dispatch(setSubDiagnosis('allst1'));
                                }}
                                className={`diagnoze-title ${subdiagnozis === 'allst1' ? 'active' : ''} cursor-pointer`}
                              >
                                {msgFormula.get('formula.parodontit.all.st.1')}
                              </span>
                              <span
                                onClick={() => {
                                  dispatch(setChangeDia(Math.random()));
                                  paradontAllStageTeeth('pst2');
                                  dispatch(setChangeDia(Math.random()));
                                  dispatch(
                                    setSubDiagnosis(subdiagnozis === 'allst2' ? '' : 'allst2')
                                  );
                                }}
                                className={`diagnoze-title ${subdiagnozis === 'allst2' ? 'active' : ''} cursor-pointer`}
                              >
                                {msgFormula.get('formula.parodontit.all.st.2')}
                              </span>
                              <span
                                onClick={() => {
                                  paradontAllStageTeeth('pst3');
                                  dispatch(setChangeDia(Math.random()));
                                  dispatch(
                                    setSubDiagnosis(subdiagnozis === 'allst3' ? '' : 'allst3')
                                  );
                                }}
                                className={`diagnoze-title ${subdiagnozis === 'allst3' ? 'active' : ''} cursor-pointer`}
                              >
                                {msgFormula.get('formula.parodontit.all.st.3')}
                              </span>
                            </div>
                          </li>
                          <li style={{ clear: 'both' }} />
                          <li>
                            <span
                              onClick={() => {
                                dispatch(setDiagnosis('no_inflammatory_process'));
                              }}
                              className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'no_inflammatory_process' ? 'active' : ''}`}
                            >
                              {msgFormula.get('formula.no_inflammatory_process')}
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => {
                                dispatch(setDiagnosis('inflamed_gums'));
                              }}
                              className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'inflamed_gums' ? 'active' : ''}`}
                            >
                              {msgFormula.get('formula.inflamed_gums')}
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => {
                                dispatch(setDiagnosis('significantly_gums'));
                              }}
                              className={`diagnoze-title flex-initial cursor-pointer ${diagnozis === 'significantly_gums' ? 'active' : ''}`}
                            >
                              {msgFormula.get('formula.significantly_gums')}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-1/2 ml-4">
                      <div className="action-block" id="endo">
                        <h4 className="formula-block-title mb-4">
                          {msg.get('patient.teeth.endo')}
                        </h4>
                        <ul className="inline-list formula-action">
                          <li>
                            <span
                              className={`diagnoze-title cursor-pointer ${diagnozis === 'pulpit' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(setDiagnosis(diagnozis === 'pulpit' ? '' : 'pulpit'));
                              }}
                            >
                              {msgFormula.get('formula.change.pulpit')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title cursor-pointer ${diagnozis === 'channel_not_sealed' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'channel_not_sealed' ? '' : 'channel_not_sealed'
                                  )
                                );
                                dispatch(
                                  setDiagnosisClass(
                                    diagnozis === 'channel_not_sealed' ? '' : 'channel-not-sealed'
                                  )
                                );
                              }}
                            >
                              {msgFormula.get('formula.channel.not.sealed')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title cursor-pointer ${diagnozis === 'channel_top_sealed' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'channel_top_sealed' ? '' : 'channel_top_sealed'
                                  )
                                );
                                dispatch(
                                  setDiagnosisClass(
                                    diagnozis === 'channel_top_sealed' ? '' : 'channel-top-sealed'
                                  )
                                );
                              }}
                            >
                              {msgFormula.get('formula.channel.top.sealed')}
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title cursor-pointer ${diagnozis === 'channel_part_sealed' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'channel_part_sealed' ? '' : 'channel_part_sealed'
                                  )
                                );
                              }}
                            >
                              {msgFormula.get('formula.channel.part.sealed')}
                            </span>
                          </li>
                          <li>
                            <div className="flex">
                              <div className="w-1/3">
                                <span
                                  className={`diagnoze-title cursor-pointer
                                                                        pl-[8px] w-1/2 cursor-pointer
                                                                        ${diagnozis === 'periodontit' ? 'active' : ''}`}
                                  onClick={() => {
                                    if (diagnozis === 'periodontit') dispatch(setSubDiagnosis(''));
                                    dispatch(
                                      setDiagnosis(diagnozis === 'periodontit' ? '' : 'periodontit')
                                    );
                                    // dispatch(setDiagnosisClass(diagnozis === 'periodontit' ? '' : 'channel_not_sealed'))
                                  }}
                                >
                                  {msgFormula.get('formula.periodontit')}
                                </span>
                              </div>
                              <div className="w-2/3 text-right">
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'periodontit') {
                                      dispatch(setDiagnosis('periodontit'));
                                      dispatch(setSubDiagnosis('st1'));
                                    } else if (
                                      diagnozis === 'periodontit' &&
                                      subdiagnozis !== 'st1'
                                    ) {
                                      dispatch(setDiagnosis('periodontit'));
                                      dispatch(setSubDiagnosis('st1'));
                                    } else if (
                                      diagnozis === 'periodontit' &&
                                      subdiagnozis === 'st1'
                                    ) {
                                      dispatch(setSubDiagnosis(''));
                                      dispatch(setDiagnosis(''));
                                    }
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'st1' ? 'active' : ''} mr-1 cursor-pointer`}
                                >
                                  {msgFormula.get('formula.periodontit.st.1')}
                                </span>
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'periodontit') {
                                      dispatch(setDiagnosis('periodontit'));
                                      dispatch(setSubDiagnosis('st2'));
                                    } else if (
                                      diagnozis === 'periodontit' &&
                                      subdiagnozis !== 'st2'
                                    ) {
                                      dispatch(setDiagnosis('periodontit'));
                                      dispatch(setSubDiagnosis('st2'));
                                    } else if (
                                      diagnozis === 'periodontit' &&
                                      subdiagnozis === 'st2'
                                    ) {
                                      dispatch(setSubDiagnosis(''));
                                      dispatch(setDiagnosis(''));
                                    }
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'st2' ? 'active' : ''} mr-1 cursor-pointer`}
                                >
                                  {msgFormula.get('formula.periodontit.st.2')}
                                </span>
                                <span
                                  onClick={() => {
                                    if (diagnozis !== 'periodontit') {
                                      dispatch(setDiagnosis('periodontit'));
                                      dispatch(setSubDiagnosis('st3'));
                                    } else if (
                                      diagnozis === 'periodontit' &&
                                      subdiagnozis !== 'st3'
                                    ) {
                                      dispatch(setDiagnosis('periodontit'));
                                      dispatch(setSubDiagnosis('st3'));
                                    } else if (
                                      diagnozis === 'periodontit' &&
                                      subdiagnozis === 'st3'
                                    ) {
                                      dispatch(setSubDiagnosis(''));
                                      dispatch(setDiagnosis(''));
                                    }
                                    // if (diagnozis !== 'periodontit') {
                                    //     dispatch(setDiagnosis('periodontit'));
                                    // } else {
                                    //     dispatch(setDiagnosis(''));
                                    // }
                                    // dispatch(setSubDiagnosis(subdiagnozis === 'st3' ? '' : 'st3'))
                                  }}
                                  className={`diagnoze-title ${subdiagnozis === 'st3' ? 'active' : ''} cursor-pointer`}
                                >
                                  {msgFormula.get('formula.periodontit.st.3')}
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className={`clearfix`} />
                        </ul>
                      </div>
                      <div className="action-block" id="constructs">
                        <h4 className="formula-block-title mb-4">
                          {msg.get('patient.teeth.construction')}
                        </h4>
                        <ul className="inline-list formula-action mt-3.5">
                          {/* ПЛОМБА */}
                          <li className="w-full">
                            <span
                              className={`diagnoze-title ${diagnozis === 'seal' ? 'active' : ''} mr-10`}
                              onClick={() => {
                                if (diagnozis !== 'seal') {
                                  dispatch(setDiagnosis('seal'));
                                  dispatch(setSealColor1('blue'));
                                  dispatch(setSealColor2(''));
                                  dispatch(setSealColor3(''));
                                } else {
                                  dispatch(setDiagnosis(''));
                                  dispatch(setSealColor1(''));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.seal')}
                            </span>
                            <div className="inline float-right">
                              <span
                                data-tooltip="Пломба"
                                data-tooltip-position="top"
                                onClick={() => {
                                  if (diagnozis !== 'seal') {
                                    dispatch(setDiagnosis('seal'));
                                    dispatch(setSealColor1('blue'));
                                  } else if (diagnozis === 'seal' && sealColor1 != 'blue') {
                                    dispatch(setSealColor1('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealColor1(''));
                                  }
                                  dispatch(setSealColor2(''));
                                  dispatch(setSealColor3(''));
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-blue cursor-pointer ${sealColor1 === 'blue' && diagnozis === 'seal' && 'active'}`}
                              />
                              <span
                                data-tooltip-position="top"
                                data-tooltip="Вторинний карієс"
                                onClick={() => {
                                  if (diagnozis !== 'seal') {
                                    dispatch(setDiagnosis('seal'));
                                    dispatch(setSealColor2('yellow'));
                                  } else if (diagnozis === 'seal' && sealColor2 != 'yellow') {
                                    dispatch(setSealColor2('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealColor2(''));
                                  }
                                  dispatch(setSealColor1(''));
                                  dispatch(setSealColor3(''));
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-yellow cursor-pointer ${sealColor2 === 'yellow' && diagnozis === 'seal' && 'active'}`}
                              />
                              <span
                                data-tooltip-position="top"
                                data-tooltip="Пломба з порушеним крайовим приляганням"
                                onClick={() => {
                                  if (diagnozis !== 'seal') {
                                    dispatch(setDiagnosis('seal'));
                                    dispatch(setSealColor3('pink'));
                                  } else if (diagnozis === 'seal' && sealColor3 != 'pink') {
                                    dispatch(setSealColor3('pink'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealColor3(''));
                                  }
                                  dispatch(setSealColor1(''));
                                  dispatch(setSealColor2(''));
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-pink cursor-pointer ${sealColor3 === 'pink' && diagnozis === 'seal' && 'active'}`}
                              />
                            </div>
                          </li>

                          {/* ПРИШИЙКОВА ПЛОМБА */}
                          <li className="w-full">
                            <span
                              className={`diagnoze-title ${diagnozis === 'seal_cervical' ? 'active' : ''} mr-10`}
                              onClick={() => {
                                if (diagnozis !== 'seal_cervical') {
                                  dispatch(setDiagnosis('seal_cervical'));
                                  dispatch(setSealServicalColor('blue'));
                                } else {
                                  dispatch(setDiagnosis(''));
                                  dispatch(setSealServicalColor(''));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.seal_cervical')}
                            </span>
                            <div className="inline float-right">
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'seal_cervical') {
                                    dispatch(setDiagnosis('seal_cervical'));
                                    dispatch(setSealServicalColor('blue'));
                                  } else if (diagnozis === 'seal_cervical' && scColor !== 'blue') {
                                    dispatch(setSealServicalColor('blue'));
                                  } else if (
                                    diagnozis === 'seal_cervical' &&
                                    scColor !== 'yellow'
                                  ) {
                                    dispatch(setSealServicalColor('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealServicalColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-blue cursor-pointer ${scColor === 'blue' && diagnozis === 'seal_cervical' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'seal_cervical') {
                                    dispatch(setDiagnosis('seal_cervical'));
                                    dispatch(setSealServicalColor('yellow'));
                                  } else if (
                                    diagnozis === 'seal_cervical' &&
                                    scColor !== 'yellow'
                                  ) {
                                    dispatch(setSealServicalColor('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealServicalColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-yellow cursor-pointer ${scColor === 'yellow' && diagnozis === 'seal_cervical' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'seal_cervical') {
                                    dispatch(setDiagnosis('seal_cervical'));
                                    dispatch(setSealServicalColor('pink'));
                                  } else if (
                                    diagnozis === 'seal_cervical' &&
                                    scColor !== 'yellow'
                                  ) {
                                    dispatch(setSealServicalColor('pink'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSealServicalColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-pink cursor-pointer ${scColor === 'pink' && diagnozis === 'seal_cervical' && 'active'}`}
                              />
                            </div>
                          </li>

                          {/* ВІНІР */}
                          <li className="w-full">
                            <span
                              className={`diagnoze-title ${diagnozis === 'vinir' ? 'active' : ''} mr-10`}
                              onClick={() => {
                                if (diagnozis !== 'vinir') {
                                  dispatch(setDiagnosis('vinir'));
                                  dispatch(setVinirColor('blue'));
                                } else {
                                  dispatch(setDiagnosis(''));
                                  dispatch(setVinirColor(''));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.vinir')}
                            </span>
                            <div className="inline float-right">
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'vinir') {
                                    dispatch(setDiagnosis('vinir'));
                                    dispatch(setVinirColor('blue'));
                                  } else if (diagnozis === 'vinir' && vinirColor !== 'blue') {
                                    dispatch(setVinirColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setVinirColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-blue cursor-pointer ${vinirColor === 'blue' && diagnozis === 'vinir' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'vinir') {
                                    dispatch(setDiagnosis('vinir'));
                                    dispatch(setVinirColor('yellow'));
                                  } else if (diagnozis === 'vinir' && vinirColor !== 'yellow') {
                                    dispatch(setVinirColor('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setVinirColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-yellow cursor-pointer ${vinirColor === 'yellow' && diagnozis === 'vinir' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'vinir') {
                                    dispatch(setDiagnosis('vinir'));
                                    dispatch(setVinirColor('pink'));
                                  } else if (diagnozis === 'vinir' && scColor !== 'yellow') {
                                    dispatch(setVinirColor('pink'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setVinirColor(''));
                                  }
                                }}
                                className={`circle-pink cursor-pointer ${vinirColor === 'pink' && diagnozis === 'vinir' && 'active'}`}
                              />
                            </div>
                          </li>
                          {/* ТИМЧАСОВА КОРОНКА */}
                          <li className="w-full">
                            <span
                              onClick={() => {
                                if (diagnozis !== 'temporary_crown') {
                                  dispatch(setDiagnosis('temporary_crown'));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                              className={`diagnoze-title ${diagnozis === 'temporary_crown' ? 'active' : ''} mr-10`}
                            >
                              {msgFormula.get('formula.temporary.crown')}
                            </span>
                          </li>
                          {/* КОРОНКА КЕРАМІЧНА */}
                          <li className="w-full">
                            <span
                              className={`diagnoze-title ${diagnozis === 'ceramic_crown' ? 'active' : ''} mr-10`}
                              onClick={() => {
                                if (diagnozis !== 'ceramic_crown') {
                                  dispatch(setDiagnosis('ceramic_crown'));
                                  dispatch(setCeramicCrownColor('blue'));
                                } else {
                                  dispatch(setDiagnosis(''));
                                  dispatch(setCeramicCrownColor(''));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.ceramic.crown')}
                            </span>
                            <div className="inline float-right">
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'ceramic_crown') {
                                    dispatch(setDiagnosis('ceramic_crown'));
                                    dispatch(setCeramicCrownColor('blue'));
                                  } else if (
                                    diagnozis === 'ceramic_crown' &&
                                    ceramicCrownColor != 'blue'
                                  ) {
                                    dispatch(setCeramicCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-blue cursor-pointer ${ceramicCrownColor === 'blue' && diagnozis === 'ceramic_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'ceramic_crown') {
                                    dispatch(setDiagnosis('ceramic_crown'));
                                    dispatch(setCeramicCrownColor('yellow'));
                                  } else if (
                                    diagnozis === 'ceramic_crown' &&
                                    ceramicCrownColor != 'yellow'
                                  ) {
                                    dispatch(setCeramicCrownColor('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-yellow cursor-pointer ${ceramicCrownColor === 'yellow' && diagnozis === 'ceramic_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'ceramic_crown') {
                                    dispatch(setDiagnosis('ceramic_crown'));
                                    dispatch(setSealColor3('pink'));
                                  } else if (
                                    diagnozis === 'ceramic_crown' &&
                                    ceramicCrownColor != 'pink'
                                  ) {
                                    dispatch(setCeramicCrownColor('pink'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-pink cursor-pointer ${ceramicCrownColor === 'pink' && diagnozis === 'ceramic_crown' && 'active'}`}
                              />
                            </div>
                          </li>
                          {/* КОРОНКА МЕТАЛОКЕРАМІЧНА */}
                          <li className="w-full">
                            <span
                              className={`diagnoze-title ${diagnozis === 'mceramic_crown' ? 'active' : ''} mr-10`}
                              onClick={() => {
                                if (diagnozis !== 'mceramic_crown') {
                                  dispatch(setDiagnosis('mceramic_crown'));
                                  dispatch(setMCeramicCrownColor('blue'));
                                } else {
                                  dispatch(setDiagnosis(''));
                                  dispatch(setMCeramicCrownColor(''));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.ceramic.mcrown')}
                            </span>
                            <div className="inline float-right">
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'mceramic_crown') {
                                    dispatch(setDiagnosis('mceramic_crown'));
                                    dispatch(setMCeramicCrownColor('blue'));
                                  } else if (
                                    diagnozis === 'mceramic_crown' &&
                                    mceramicCrownColor != 'blue'
                                  ) {
                                    dispatch(setMCeramicCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-blue cursor-pointer ${mceramicCrownColor === 'blue' && diagnozis === 'mceramic_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'mceramic_crown') {
                                    dispatch(setDiagnosis('mceramic_crown'));
                                    dispatch(setMCeramicCrownColor('yellow'));
                                  } else if (
                                    diagnozis === 'mceramic_crown' &&
                                    mceramicCrownColor != 'yellow'
                                  ) {
                                    dispatch(setMCeramicCrownColor('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-yellow cursor-pointer ${mceramicCrownColor === 'yellow' && diagnozis === 'mceramic_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'mceramic_crown') {
                                    dispatch(setDiagnosis('mceramic_crown'));
                                    dispatch(setMCeramicCrownColor('pink'));
                                  } else if (
                                    diagnozis === 'mceramic_crown' &&
                                    mceramicCrownColor != 'pink'
                                  ) {
                                    dispatch(setMCeramicCrownColor('pink'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMCeramicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-pink cursor-pointer ${mceramicCrownColor === 'pink' && diagnozis === 'mceramic_crown' && 'active'}`}
                              />
                            </div>
                          </li>
                          {/* КОРОНКА МЕТАЛЕВА */}
                          <li className="w-full">
                            <span
                              className={`diagnoze-title ${diagnozis === 'metalic_crown' ? 'active' : ''} mr-10`}
                              onClick={() => {
                                if (diagnozis !== 'metalic_crown') {
                                  dispatch(setDiagnosis('metalic_crown'));
                                  dispatch(setMetalicCrownColor('blue'));
                                } else {
                                  dispatch(setDiagnosis(''));
                                  dispatch(setMetalicCrownColor(''));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.ceramic.metaliccrown')}
                            </span>
                            <div className="inline float-right">
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'metalic_crown') {
                                    dispatch(setDiagnosis('metalic_crown'));
                                    dispatch(setMetalicCrownColor('blue'));
                                  } else if (
                                    diagnozis === 'metalic_crown' &&
                                    metalicCrownColor != 'blue'
                                  ) {
                                    dispatch(setMetalicCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMetalicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-blue cursor-pointer ${metalicCrownColor === 'blue' && diagnozis === 'metalic_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'metalic_crown') {
                                    dispatch(setDiagnosis('metalic_crown'));
                                    dispatch(setMetalicCrownColor('yellow'));
                                  } else if (
                                    diagnozis === 'metalic_crown' &&
                                    metalicCrownColor != 'yellow'
                                  ) {
                                    dispatch(setMetalicCrownColor('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMetalicCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-yellow cursor-pointer ${metalicCrownColor === 'yellow' && diagnozis === 'metalic_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'metalic_crown') {
                                    dispatch(setDiagnosis('metalic_crown'));
                                    dispatch(setMetalicCrownColor('pink'));
                                  } else if (
                                    diagnozis === 'metalic_crown' &&
                                    metalicCrownColor != 'pink'
                                  ) {
                                    dispatch(setMetalicCrownColor('pink'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setMetalicCrownColor(''));
                                  }
                                }}
                                className={`circle-pink cursor-pointer ${metalicCrownColor === 'pink' && diagnozis === 'metalic_crown' && 'active'}`}
                              />
                            </div>
                          </li>
                          {/* КОРОНКА ЦИРКОНІЄВАЯ */}
                          <li className="w-full">
                            <span
                              className={`diagnoze-title ${diagnozis === 'zirconia_crown' ? 'active' : ''} mr-10`}
                              onClick={() => {
                                if (diagnozis !== 'zirconia_crown') {
                                  dispatch(setDiagnosis('zirconia_crown'));
                                  dispatch(setZirconiaCrownColor('blue'));
                                } else {
                                  dispatch(setDiagnosis(''));
                                  dispatch(setZirconiaCrownColor(''));
                                }
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.zirconia.crown')}
                            </span>
                            <div className="inline float-right">
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'zirconia_crown') {
                                    dispatch(setDiagnosis('zirconia_crown'));
                                    dispatch(setZirconiaCrownColor('blue'));
                                  } else if (
                                    diagnozis === 'zirconia_crown' &&
                                    zirconiaCrownColor != 'blue'
                                  ) {
                                    dispatch(setZirconiaCrownColor('blue'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setZirconiaCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-blue cursor-pointer ${zirconiaCrownColor === 'blue' && diagnozis === 'zirconia_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'zirconia_crown') {
                                    dispatch(setDiagnosis('zirconia_crown'));
                                    dispatch(setZirconiaCrownColor('yellow'));
                                  } else if (
                                    diagnozis === 'zirconia_crown' &&
                                    zirconiaCrownColor != 'yellow'
                                  ) {
                                    dispatch(setZirconiaCrownColor('yellow'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setZirconiaCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-yellow cursor-pointer ${zirconiaCrownColor === 'yellow' && diagnozis === 'zirconia_crown' && 'active'}`}
                              />
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'zirconia_crown') {
                                    dispatch(setDiagnosis('zirconia_crown'));
                                    dispatch(setZirconiaCrownColor('pink'));
                                  } else if (
                                    diagnozis === 'zirconia_crown' &&
                                    zirconiaCrownColor != 'pink'
                                  ) {
                                    dispatch(setZirconiaCrownColor('pink'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setZirconiaCrownColor(''));
                                  }
                                  dispatch(setSubDiagnosis(''));
                                }}
                                className={`circle-pink cursor-pointer ${zirconiaCrownColor === 'pink' && diagnozis === 'zirconia_crown' && 'active'}`}
                              />
                            </div>
                          </li>
                          {/* ШТИФТ */}
                          <li
                            style={{
                              display: teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'pin' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setDiagnosis(diagnozis === 'pin' ? '' : 'pin'));
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.pin')}
                            </span>
                          </li>
                          {/* КУЛЬТОВА НАКЛАДКА */}
                          <li
                            style={{
                              display: teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'culttab' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setDiagnosis(diagnozis === 'culttab' ? '' : 'culttab'));
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.cult.tab')}
                            </span>
                          </li>
                          {/* АБАТМЕНТ */}
                          <li
                            style={{
                              display: teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'abutment' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setDiagnosis(diagnozis === 'abutment' ? '' : 'abutment'));
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.abutment')}
                            </span>
                          </li>
                          {/* ФОРМУВАЧ */}
                          <li
                            style={{
                              display: teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'shaper' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setDiagnosis(diagnozis === 'shaper' ? '' : 'shaper'));
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.shaper')}
                            </span>
                          </li>
                          {/* ІМПЛАНТ */}
                          <li
                            style={{
                              display: teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'implant' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setDiagnosis(diagnozis === 'implant' ? '' : 'implant'));
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.implant')}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[10px] mb-[10px] float-right">
                    <Link
                      className="btn-back"
                      title={msg.get('patient.back')}
                      href={`/patient/view/${patientData.id}`}
                    >
                      {msg.get('patient.back')}
                    </Link>
                    <PrimaryButton onClick={(e) => submit(e)}>
                      {msg.get('patient.save')}
                    </PrimaryButton>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
