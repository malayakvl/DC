import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';
import lngPatient from '../../Lang/Patient/translation';
import { useSelector, useDispatch } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faPrint,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
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
} from '../../Redux/Formula/selectors';
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
  setClearFormula, setChangeDia,
} from '../../Redux/Formula';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import Details from './Partials/Details';
import { emptyFormula } from '../../Constants';

export default function index({ patientData, treatmentData, clinicData }) {
  const [tab, setTab] = useState('history');
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

  // if (!treatmentData.formula) {
  //   dispatch(setChangeDia(Math.random()));
  //   dispatch(setToothDiagnoze(emptyFormula));
  // }
  const tData = treatmentData.formula
    ? JSON.parse(treatmentData.formula)
    : null;

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

  const [values, setValues] = useState({
    clinic_id: clinicData.id,
    patientData: patientData,
    treatmentData: treatmentData,
    formula_type: teethType,
  });

  useEffect(() => {
    dispatch(setTeethType(treatmentData.formula_type));
    if (treatmentData.formula !== null) {
      dispatch(setDataDiagnozes(tData));
    }
  }, [treatmentData]);

  const showAllTeeth = () => {
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

  const submit = e => {
    e.preventDefault();
    values['treatmentData'] = tData;
    values['teethType'] = teethType;

    // clear selector
    dispatch(dispatch(setClearFormula()));

    if (treatmentData.id) {
      router.post(`/patient/update-formula?id=${treatmentData.id}`, values);
    } else {
      router.post('/pricing/update', {
        clinic_id: values.clinic_id,
        category_id: values.category_id,
        name: values.name,
        price: values.price,
        rows: invoiceItems,
      });
    }
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <Details clinicData={clinicData} patientData={patientData} />
            {tab === 'history' && (
              <ul className="sub-tab text-right mt-5">
                <li className="relative">
                  <Link href="/">
                    <i className="icon-plan-treatment" />
                    <span className="inline-block ml-[35px]">
                      Етап лікування
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link href="/">
                    <i className="icon-formula" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.formula')}
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link href="/">
                    <i className="icon-psr" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.test')}
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link href="/">
                    <i className="icon-perio" />
                    <span className="inline-block ml-[35px]">
                      {msg.get('patient.tab.perio')}
                    </span>
                  </Link>
                </li>
              </ul>
            )}
            <div className="mt-2">
              <div className="inline w-full">
                <h3 className="text-left inline-block w-[80%]">
                  {treatmentData.stage_name}
                </h3>
                <ul className="action-patient-icon inline-block w-[20%] text-right">
                  <li>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faUserDoctor} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faPrint} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/`}>
                      <FontAwesomeIcon icon={faFloppyDisk} className="mr-5" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="flex w-full patient-content-border">
                <div className="w-1/2">
                  <Formula
                    action={'edit'}
                    formulaData={JSON.parse(treatmentData.formula)}
                  />
                  {/* {teethType === 'adult' && <Formula />}
                                    {teethType !== 'adult' && <FormulaMilk />} */}
                </div>
                <div className="w-1/2">
                  <div className="flex p-2">
                    <div className="w-1/2">
                      <div className="action-block">
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
                                    document.getElementById(
                                      'TH-11'
                                    ).style.visibility = 'inherit';
                                    document.getElementById(
                                      'TH-51'
                                    ).style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth61.show) {
                                    document.getElementById(
                                      'TH-21'
                                    ).style.visibility = 'inherit';
                                    document.getElementById(
                                      'TH-61'
                                    ).style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth52.show) {
                                    document.getElementById(
                                      'TH-12'
                                    ).style.visibility = 'inherit';
                                    document.getElementById(
                                      'TH-52'
                                    ).style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth53.show) {
                                    document.getElementById(
                                      'TH-13'
                                    ).style.visibility = 'inherit';
                                    document.getElementById(
                                      'TH-53'
                                    ).style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth54.show) {
                                    document.getElementById(
                                      'TH-14'
                                    ).style.visibility = 'inherit';
                                    document.getElementById(
                                      'TH-54'
                                    ).style.visibility = 'hidden';
                                  }
                                  if (!tData.tooth55.show) {
                                    document.getElementById(
                                      'TH-15'
                                    ).style.visibility = 'inherit';
                                    document.getElementById(
                                      'TH-55'
                                    ).style.visibility = 'hidden';
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
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'absent' ? '' : 'absent'
                                  )
                                );
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
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'apex' ? '' : 'apex'
                                  )
                                );
                              }}
                            >
                              {msgFormula.get('formula.apex')}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="action-block mt-4">
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
                                  setDiagnosis(
                                    diagnozis === 'change_color'
                                      ? ''
                                      : 'change_color'
                                  )
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
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'fissure' ? '' : 'fissure'
                                  )
                                );
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
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'caries' ? '' : 'caries'
                                  )
                                );
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
                                    diagnozis === 'cervical_caries'
                                      ? ''
                                      : 'cervical_caries'
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
                          <li>
                            <div className="flex">
                              <div className="w-1/2">
                                <span
                                  className={`diagnoze-title cursor-pointer
                                                                        pl-[8px] w-1/2 cursor-pointer
                                                                        ${diagnozis === 'tartar' ? 'active' : ''}`}
                                  onClick={() =>
                                    dispatch(
                                      setDiagnosis(
                                        diagnozis === 'tartar' ? '' : 'tartar'
                                      )
                                    )
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
                                      setSubDiagnosis(
                                        subdiagnozis === 'st1' ? '' : 'st1'
                                      )
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
                                      setSubDiagnosis(
                                        subdiagnozis === 'st2' ? '' : 'st2'
                                      )
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
                      {/*NOT WORKED*/}
                      <div className="action-block mt-4">
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
                                      diagnozis === 'paradont_health'
                                        ? ''
                                        : 'paradont_health'
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
                                }}
                              >
                                {msgFormula.get(
                                  'formula.parodontit.health.all'
                                )}
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
                                      setDiagnosis(
                                        diagnozis === 'parodontit'
                                          ? ''
                                          : 'parodontit'
                                      )
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
                                        setSubDiagnosis(
                                          subdiagnozis === 'pst1' ? '' : 'pst1'
                                        )
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
                                        setSubDiagnosis(
                                          subdiagnozis === 'pst2' ? '' : 'pst2'
                                        )
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
                                        setSubDiagnosis(
                                          subdiagnozis === 'pst3' ? '' : 'pst3'
                                        )
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
                                  if (diagnozis !== 'parodontit') {
                                    dispatch(setDiagnosis('parodontit'));
                                    dispatch(
                                      setSubDiagnosis(
                                        subdiagnozis === 'allst1'
                                          ? ''
                                          : 'allst1'
                                      )
                                    );
                                  } else if (
                                    diagnozis === 'parodontit' &&
                                    subdiagnozis !== 'allst1'
                                  ) {
                                    dispatch(setSubDiagnosis('allst1'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSubDiagnosis(''));
                                  }
                                }}
                                className={`diagnoze-title ${subdiagnozis === 'allst1' ? 'active' : ''} cursor-pointer`}
                              >
                                {msgFormula.get('formula.parodontit.all.st.1')}
                              </span>
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'parodontit') {
                                    dispatch(setDiagnosis('parodontit'));
                                  } else if (
                                    diagnozis === 'parodontit' &&
                                    subdiagnozis !== 'allst2'
                                  ) {
                                    dispatch(setSubDiagnosis('allst2'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSubDiagnosis(''));
                                  }
                                  dispatch(
                                    setSubDiagnosis(
                                      subdiagnozis === 'allst2' ? '' : 'allst2'
                                    )
                                  );
                                }}
                                className={`diagnoze-title ${subdiagnozis === 'allst2' ? 'active' : ''} cursor-pointer`}
                              >
                                {msgFormula.get('formula.parodontit.all.st.2')}
                              </span>
                              <span
                                onClick={() => {
                                  if (diagnozis !== 'parodontit') {
                                    dispatch(setDiagnosis('parodontit'));
                                  } else if (
                                    diagnozis === 'parodontit' &&
                                    subdiagnozis !== 'allst3'
                                  ) {
                                    dispatch(setSubDiagnosis('allst3'));
                                  } else {
                                    dispatch(setDiagnosis(''));
                                    dispatch(setSubDiagnosis(''));
                                  }
                                  dispatch(
                                    setSubDiagnosis(
                                      subdiagnozis === 'allst3' ? '' : 'allst3'
                                    )
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
                              className={`diagnoze-title flex-initial cursor-pointer ${teethType === 'adultAAAA' ? 'active' : ''}`}
                            >
                              Відсутній запальний процес
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title flex-initial cursor-pointer ${teethType === 'adultAAAA' ? 'active' : ''}`}
                            >
                              Запалені ясна
                            </span>
                          </li>
                          <li>
                            <span
                              className={`diagnoze-title flex-initial cursor-pointer ${teethType === 'adultAAAA' ? 'active' : ''}`}
                            >
                              Значно запалені ясна
                            </span>
                          </li>
                        </ul>

                        {/* <ul className='inline-list formula-action'>
                                                    <li
                                                        className={`${diagnozis === 'tartar' ? 'active' : ''}`}
                                                        onClick={() => dispatch(setDiagnosis(diagnozis === 'tartar' ? '' : 'tartar'))}
                                                        >
                                                        {msgFormula.get('formula.tartar')}
                                                    </li>
                                                    <li>
                                                        <span className='mr-1'>1 ст</span>
                                                        <span className='mr-1'>2 ст</span>
                                                    </li>
                                                </ul> */}
                      </div>
                    </div>
                    <div className="w-1/2 ml-4">
                      <div className="action-block">
                        <h4 className="formula-block-title mb-4">
                          {msg.get('patient.teeth.endo')}
                        </h4>
                        <ul className="inline-list formula-action">
                          <li>
                            <span
                              className={`diagnoze-title cursor-pointer ${diagnozis === 'pulpit' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(setSubDiagnosis(''));
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'pulpit' ? '' : 'pulpit'
                                  )
                                );
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
                                    diagnozis === 'channel_not_sealed'
                                      ? ''
                                      : 'channel_not_sealed'
                                  )
                                );
                                dispatch(
                                  setDiagnosisClass(
                                    diagnozis === 'channel_not_sealed'
                                      ? ''
                                      : 'channel-not-sealed'
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
                                    diagnozis === 'channel_top_sealed'
                                      ? ''
                                      : 'channel_top_sealed'
                                  )
                                );
                                dispatch(
                                  setDiagnosisClass(
                                    diagnozis === 'channel_top_sealed'
                                      ? ''
                                      : 'channel-top-sealed'
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
                                    diagnozis === 'channel_part_sealed'
                                      ? ''
                                      : 'channel_part_sealed'
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
                                    if (diagnozis === 'periodontit')
                                      dispatch(setSubDiagnosis(''));
                                    dispatch(
                                      setDiagnosis(
                                        diagnozis === 'periodontit'
                                          ? ''
                                          : 'periodontit'
                                      )
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
                                    // if (diagnozis !== 'periodontit' ) {
                                    //     dispatch(setDiagnosis('periodontit'));
                                    // } else if (subdiagnozis !== 'st1') {
                                    //     dispatch(setDiagnosis('st1'));
                                    // } else {
                                    //     dispatch(setDiagnosis(''));
                                    // }
                                    // dispatch(setSubDiagnosis(subdiagnozis === 'st1' ? '' : 'st1'))
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
                                    // if (diagnozis !== 'periodontit') {
                                    //     dispatch(setDiagnosis('periodontit'));
                                    // } else {
                                    //     dispatch(setDiagnosis(''));
                                    // }
                                    // dispatch(setSubDiagnosis(subdiagnozis === 'st2' ? '' : 'st2'))
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
                      <div className="action-block">
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
                                  } else if (
                                    diagnozis === 'seal' &&
                                    sealColor1 != 'blue'
                                  ) {
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
                                  } else if (
                                    diagnozis === 'seal' &&
                                    sealColor2 != 'yellow'
                                  ) {
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
                                  } else if (
                                    diagnozis === 'seal' &&
                                    sealColor3 != 'pink'
                                  ) {
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
                                  } else if (
                                    diagnozis === 'vinir' &&
                                    vinirColor !== 'blue'
                                  ) {
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
                                  } else if (
                                    diagnozis === 'vinir' &&
                                    vinirColor !== 'yellow'
                                  ) {
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
                                  } else if (
                                    diagnozis === 'vinir' &&
                                    scColor !== 'yellow'
                                  ) {
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
                                  console.log(diagnozis, ceramicCrownColor);
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
                                  console.log(diagnozis, ceramicCrownColor);
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
                              display:
                                teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'pin' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(
                                  setDiagnosis(diagnozis === 'pin' ? '' : 'pin')
                                );
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.pin')}
                            </span>
                          </li>
                          {/* КУЛЬТОВА НАКЛАДКА */}
                          <li
                            style={{
                              display:
                                teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'culttab' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'culttab' ? '' : 'culttab'
                                  )
                                );
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.cult.tab')}
                            </span>
                          </li>
                          {/* АБАТМЕНТ */}
                          <li
                            style={{
                              display:
                                teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'abutment' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'abutment' ? '' : 'abutment'
                                  )
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
                              display:
                                teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'shaper' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'shaper' ? '' : 'shaper'
                                  )
                                );
                                dispatch(setSubDiagnosis(''));
                              }}
                            >
                              {msgFormula.get('formula.shaper')}
                            </span>
                          </li>
                          {/* ІМПЛАНТ */}
                          <li
                            style={{
                              display:
                                teethType === 'child' ? 'none' : 'inherit',
                            }}
                          >
                            <span
                              className={`diagnoze-title ${diagnozis === 'implant' ? 'active' : ''}`}
                              onClick={() => {
                                dispatch(
                                  setDiagnosis(
                                    diagnozis === 'implant' ? '' : 'implant'
                                  )
                                );
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
                      href={`/patients`}
                    >
                      {msg.get('patient.back')}
                    </Link>
                    <PrimaryButton onClick={e => submit(e)}>
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
