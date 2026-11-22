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
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function EditFormula({
  patientData,
  treatmentData,
  clinicData,
  discountStatus,
  discountValue,
}: {
  patientData: any;
  treatmentData: any;
  clinicData: any;
  discountStatus: any;
  discountValue: any;
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

  const [values] = useState<any>({
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

  const paradontAllStageTeeth = (stage: any) => {
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

  const submit = (e: any) => {
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

  // const handleSwitchToAdultTeeth = () => {
  //   dispatch(setTeethType('adult'));
  //   const primaryToAdultPairs: [number, number][] = [
  //     [51, 11],
  //     [61, 21],
  //     [52, 12],
  //     [53, 13],
  //     [54, 14],
  //     [55, 15],
  //   ];
  //
  //   primaryToAdultPairs.forEach(([primary, adult]) => {
  //     if (!tData?.[`tooth${primary}`]?.show) {
  //       const adultEl = document.getElementById(`TH-${adult}`);
  //       const primaryEl = document.getElementById(`TH-${primary}`);
  //
  //       if (adultEl) adultEl.style.visibility = 'inherit';
  //       if (primaryEl) primaryEl.style.visibility = 'hidden';
  //     }
  //   });
  // };

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Patient Card'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <DetailsNew
              patientData={patientData}
              discountStatus={discountStatus}
              discountValue={discountValue}
              className={''}
            />
            <nav className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-xs text-slate-400 hidden xl:inline-block">
                  Останній запис:{' '}
                  <strong className="text-slate-600 font-medium">16.11.26, 16:40</strong> (лікар
                  Корогод В. Л.)
                </span>
                <div className="h-4 w-px bg-slate-200 hidden xl:block"></div>
                <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all shadow-sm">
                  <i className="ph ph-printer text-base"></i>
                  <span>{msg.get('patient.print')}</span>
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 border border-teal-700 shadow-sm transition-all">
                  <i className="ph-bold ph-floppy-disk text-base"></i>
                  <span>{msg.get('patient.save')}</span>
                </button>
              </div>
            </nav>
            <div className="mt-4">
              {/*<div className="inline w-full">*/}
              {/*  <div className="patient-actions pb-4 text-right">*/}
              {/*    <button className="action-chip">*/}
              {/*      <FontAwesomeIcon icon={faPrint} />*/}
              {/*      <span>{msg.get('patient.print')}</span>*/}
              {/*    </button>*/}

              {/*    <button className="action-chip save">*/}
              {/*      <FontAwesomeIcon icon={faFloppyDisk} />*/}
              {/*      <span>{msg.get('patient.save')}</span>*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div className="clearfix" />*/}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
                <section className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm tracking-tight">
                      {msgFormula.get('formula.formula_title')}
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
                      FDI 2-digit System
                    </span>
                  </div>

                  <Formula action={'edit'} formulaData={JSON.parse(treatmentData.formula)} />
                </section>
                <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col dia-right-block">
                    <div className="p-2.5 border-b border-slate-200 bg-white">
                      <div className="p-2.5 border-b border-slate-200 bg-white">
                        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
                          <button
                            onClick={() => showBlock('teeth_type')}
                            className={`diagnosis-tab-new ${activeBlock === 'teeth_type' ? 'active' : ''}`}
                          >
                            {msgFormula.get('formula.formula_tab_type')}
                          </button>
                          <button
                            onClick={() => showBlock('injuries')}
                            className={`diagnosis-tab-new ${activeBlock === 'injuries' ? 'active' : ''}`}
                          >
                            {msgFormula.get('formula.formula_tab_destroy')}
                          </button>
                          <button
                            onClick={() => showBlock('endo')}
                            className={`diagnosis-tab-new ${activeBlock === 'endo' ? 'active' : ''}`}
                          >
                            {msgFormula.get('formula.formula_tab_endo')}
                          </button>
                          <button
                            onClick={() => showBlock('constructs')}
                            className={`diagnosis-tab-new ${activeBlock === 'constructs' ? 'active' : ''}`}
                          >
                            {msgFormula.get('formula.formula_tab_construct')}
                          </button>
                          <button
                            onClick={() => showBlock('parodont')}
                            className={`diagnosis-tab-new ${activeBlock === 'parodont' ? 'active' : ''}`}
                          >
                            {msgFormula.get('formula.formula_tab_paradont')}
                          </button>
                        </div>
                      </div>
                      <div className="diagnosis-block mt-4">
                        {/*<div className="diagnosis-filter">*/}
                        {/*  <div className="diagnosis-tabs">*/}
                        {/*    <button*/}
                        {/*      className={`diagnosis-tab all ${activeBlock === 'teeth_type' ? 'active' : ''}`}*/}
                        {/*      onClick={() => showBlock('teeth_type')}*/}
                        {/*      type="button"*/}
                        {/*    >*/}
                        {/*      <FontAwesomeIcon icon={faTooth} />*/}
                        {/*      <span>Тип зуба</span>*/}
                        {/*    </button>*/}

                        {/*    <button*/}
                        {/*      className={`diagnosis-tab injuries ${activeBlock === 'injuries' ? 'active' : ''}`}*/}
                        {/*      onClick={() => showBlock('injuries')}*/}
                        {/*      type="button"*/}
                        {/*    >*/}
                        {/*      <FontAwesomeIcon icon={faTriangleExclamation} color={'#f59e0b'} />*/}
                        {/*      <span>Ураження</span>*/}
                        {/*    </button>*/}

                        {/*    <button*/}
                        {/*      className={`diagnosis-tab endo ${activeBlock === 'endo' ? 'active' : ''}`}*/}
                        {/*      onClick={() => showBlock('endo')}*/}
                        {/*      type="button"*/}
                        {/*    >*/}
                        {/*      <FontAwesomeIcon icon={faSyringe} />*/}
                        {/*      <span>Endo</span>*/}
                        {/*    </button>*/}

                        {/*    <button*/}
                        {/*      className={`diagnosis-tab constructs ${activeBlock === 'constructs' ? 'active' : ''}`}*/}
                        {/*      onClick={() => showBlock('constructs')}*/}
                        {/*      type="button"*/}
                        {/*    >*/}
                        {/*      <FontAwesomeIcon icon={faCrown} />*/}
                        {/*      <span>Конструкції</span>*/}
                        {/*    </button>*/}

                        {/*    <button*/}
                        {/*      className={`diagnosis-tab parodont ${activeBlock === 'parodont' ? 'active' : ''}`}*/}
                        {/*      onClick={() => showBlock('parodont')}*/}
                        {/*      type="button"*/}
                        {/*    >*/}
                        {/*      <FontAwesomeIcon icon={faHeartPulse} />*/}
                        {/*      <span>Пародонт</span>*/}
                        {/*    </button>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        <div className="diagnosis-groups">
                          <div className={`diagnosis-group ${openGroups.teeth_type ? 'open' : ''}`}>
                            <button
                              className="diagnosis-group-header teeth_type"
                              onClick={() => toggleGroup('teeth_type')}
                              type="button"
                            >
                              <div className="diagnosis-group-left">
                                <span>{msgFormula.get('formula.formula_tab_type')}</span>
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
                                    <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 w-full">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          dispatch(setTeethType('adult'));

                                          const primaryToAdultPairs: [number, number][] = [
                                            [51, 11],
                                            [61, 21],
                                            [52, 12],
                                            [53, 13],
                                            [54, 14],
                                            [55, 15],
                                          ];

                                          primaryToAdultPairs.forEach(([primary, adult]) => {
                                            if (!tData?.[`tooth${primary}`]?.show) {
                                              const adultEl = document.getElementById(
                                                `TH-${adult}`
                                              );
                                              const primaryEl = document.getElementById(
                                                `TH-${primary}`
                                              );

                                              if (adultEl) adultEl.style.visibility = 'inherit';
                                              if (primaryEl) primaryEl.style.visibility = 'hidden';
                                            }
                                          });
                                        }}
                                        className={`flex-1 py-1.5 px-3 rounded-lg bg-white text-teal-800 font-bold text-xs shadow-xs border border-slate-200 text-center transition-all cursor-pointer ${teethType === 'adult' ? 'activeAdult' : 'activeChild'}`}
                                      >
                                        {msgFormula.get('formula.stable')}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          dispatch(setTeethType('child'));
                                        }}
                                        className="flex-1 py-1.5 px-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/80 font-medium text-xs text-center transition-all"
                                      >
                                        {msgFormula.get('formula.milk')}
                                      </button>
                                    </div>
                                    {/*<span*/}
                                    {/*  className={`diagnoze-title flex-initial cursor-pointer ${teethType === 'adult' ? 'active' : ''}`}*/}
                                    {/*  onClick={() => {*/}
                                    {/*    dispatch(setTeethType('adult'));*/}

                                    {/*    const primaryToAdultPairs: [number, number][] = [*/}
                                    {/*      [51, 11],*/}
                                    {/*      [61, 21],*/}
                                    {/*      [52, 12],*/}
                                    {/*      [53, 13],*/}
                                    {/*      [54, 14],*/}
                                    {/*      [55, 15],*/}
                                    {/*    ];*/}

                                    {/*    primaryToAdultPairs.forEach(([primary, adult]) => {*/}
                                    {/*      if (!tData?.[`tooth${primary}`]?.show) {*/}
                                    {/*        const adultEl = document.getElementById(`TH-${adult}`);*/}
                                    {/*        const primaryEl = document.getElementById(*/}
                                    {/*          `TH-${primary}`*/}
                                    {/*        );*/}

                                    {/*        if (adultEl) adultEl.style.visibility = 'inherit';*/}
                                    {/*        if (primaryEl) primaryEl.style.visibility = 'hidden';*/}
                                    {/*      }*/}
                                    {/*    });*/}
                                    {/*  }}*/}
                                    {/*>*/}
                                    {/*  {msgFormula.get('formula.stable')}*/}
                                    {/*</span>*/}
                                    {/*<span*/}
                                    {/*  className={`diagnoze-title flex-initial cursor-pointer ml-4 ${teethType !== 'adult' ? 'active' : ''}`}*/}
                                    {/*  onClick={() => {*/}
                                    {/*    dispatch(setTeethType('child'));*/}
                                    {/*  }}*/}
                                    {/*>*/}
                                    {/*  {msgFormula.get('formula.milk')}*/}
                                    {/*</span>*/}
                                  </div>
                                </li>
                                <div className={`clearfix`} />
                                <li className={'w-full'}>
                                  <div className="flex flex-wrap gap-1.5">
                                    <button
                                      onClick={() => {
                                        // нажали показать все и вибран тип постоянние
                                        showAllTeeth();
                                      }}
                                      className="text-[12px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                    >
                                      {msgFormula.get('formula.allteeth')}
                                    </button>
                                    <button
                                      onClick={() => {
                                        dispatch(
                                          setDiagnosis(diagnozis === 'absent' ? '' : 'absent')
                                        );
                                        dispatch(setSubDiagnosis(''));
                                      }}
                                      className="text-[12px] font-medium px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                                    >
                                      {msgFormula.get('formula.absent.tooth')}
                                    </button>
                                    <button
                                      onClick={() => {
                                        dispatch(setSubDiagnosis(''));
                                        dispatch(setDiagnosis(diagnozis === 'apex' ? '' : 'apex'));
                                      }}
                                      className={`text-[12px] font-medium px-2.5 py-1 rounded-lg text-amber-800 border border-amber-200 transition-colors ${
                                        diagnozis === 'apex'
                                          ? 'bg-amber-100'
                                          : 'bg-amber-50 hover:bg-amber-100'
                                      }`}
                                    >
                                      {msgFormula.get('formula.apex')}
                                    </button>
                                    <button className="text-[12px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                                      {msgFormula.get('formula.absent.top.teeth')}
                                    </button>
                                    <button className="text-[12px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                                      {msgFormula.get('formula.absent.bottom.teeth')}
                                    </button>
                                    <button className="text-[12px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                                      {msgFormula.get('formula.absent.all')}
                                    </button>
                                  </div>
                                </li>
                                {/*<li className={'w-full'}>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title`}*/}
                                {/*    onClick={() => {*/}
                                {/*      // нажали показать все и вибран тип постоянние*/}
                                {/*      showAllTeeth();*/}
                                {/*    }}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.allteeth')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*<li className={'w-full'}>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title ${diagnozis === 'absent' ? 'active' : ''}`}*/}
                                {/*    onClick={() => {*/}
                                {/*      dispatch(*/}
                                {/*        setDiagnosis(diagnozis === 'absent' ? '' : 'absent')*/}
                                {/*      );*/}
                                {/*      dispatch(setSubDiagnosis(''));*/}
                                {/*    }}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.absent.tooth')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*<li className={'w-full'}>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title flex-initial cursor-pointer`}*/}
                                {/*    onClick={() => console.log(1)}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.absent.top.teeth')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*<li className={'w-full'}>*/}
                                {/*  <span className={`diagnoze-title flex-initial cursor-pointer`}>*/}
                                {/*    {msgFormula.get('formula.absent.bottom.teeth')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*<li className={'w-full'}>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title flex-initial cursor-pointer`}*/}
                                {/*    onClick={() => console.log(1)}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.absent.all')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*<li className={'w-full'}>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title ${diagnozis === 'apex' ? 'active' : ''}`}*/}
                                {/*    onClick={() => {*/}
                                {/*      dispatch(setSubDiagnosis(''));*/}
                                {/*      dispatch(setDiagnosis(diagnozis === 'apex' ? '' : 'apex'));*/}
                                {/*    }}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.apex')}!!*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                              </ul>
                            </div>
                          </div>
                          <div className={'clearfix'}></div>
                          {/*/* ==================================================*/}
                          {/*УРАЖЕННЯ*/}
                          {/*/* ==================================================*/}
                          <div
                            className={`diagnosis-group injuries ${openGroups.injuries ? 'open' : ''}`}
                          >
                            <button
                              className="diagnosis-group-header injuries"
                              onClick={() => toggleGroup('injuries')}
                              type="button"
                            >
                              <div className="diagnosis-group-left">
                                <span>{msgFormula.get('formula.formula_tab_destroy')}</span>
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
                                <li
                                  className={`dia-row ${diagnozis === 'change_color' ? 'active' : ''}`}
                                >
                                  <span
                                    className={`font-medium text-slate-800 text-[13px]  ml-3`}
                                    onClick={() => {
                                      dispatch(setSubDiagnosis(''));
                                      dispatch(
                                        setDiagnosis(
                                          diagnozis === 'change_color' ? '' : 'change_color'
                                        )
                                      );
                                    }}
                                  >
                                    {msgFormula.get('formula.change.color')}
                                  </span>
                                </li>
                                <li
                                  className={`dia-row ${diagnozis === 'fissure' ? 'active' : ''}`}
                                >
                                  <span
                                    className={`font-medium text-slate-800 text-[13px]  ml-3`}
                                    onClick={() => {
                                      dispatch(setSubDiagnosis(''));
                                      dispatch(
                                        setDiagnosis(diagnozis === 'fissure' ? '' : 'fissure')
                                      );
                                    }}
                                  >
                                    {msgFormula.get('formula.fissure')}
                                  </span>
                                </li>
                                <li className={`dia-row ${diagnozis === 'caries' ? 'active' : ''}`}>
                                  <span
                                    className={`font-medium text-slate-800 text-[13px]  ml-3`}
                                    onClick={() => {
                                      dispatch(setSubDiagnosis(''));
                                      dispatch(
                                        setDiagnosis(diagnozis === 'caries' ? '' : 'caries')
                                      );
                                    }}
                                  >
                                    {msgFormula.get('formula.caries')}
                                  </span>
                                </li>
                                <li
                                  className={`dia-row ${diagnozis === 'cervical_caries' ? 'active' : ''}`}
                                >
                                  <span
                                    className={`font-medium text-slate-800 text-[13px]  ml-3`}
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
                                <li
                                  className={`dia-row ${diagnozis === 'wedge_shaped_defect' ? 'active' : ''}`}
                                >
                                  <span
                                    className={`font-medium text-slate-800 text-[13px]  ml-3`}
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
                                <li className={`dia-row ${diagnozis === 'tartar' ? 'active' : ''}`}>
                                  <div className="flex">
                                    <div className="w-1/2">
                                      <span
                                        className={`font-medium text-slate-800 text-[13px]  ml-3`}
                                        onClick={() =>
                                          dispatch(
                                            setDiagnosis(diagnozis === 'tartar' ? '' : 'tartar')
                                          )
                                        }
                                      >
                                        {msgFormula.get('formula.tartar')}
                                      </span>
                                    </div>
                                    <div className="w-1/2 text-right">
                                      <div className="tartar-stage-block">
                                        <span
                                          onClick={() => {
                                            if (diagnozis !== 'tartar') {
                                              dispatch(setDiagnosis('tartar'));
                                            }
                                            dispatch(
                                              setSubDiagnosis(subdiagnozis === 'st1' ? '' : 'st1')
                                            );
                                          }}
                                          className={`tartar-stage-value ${subdiagnozis === 'st1' ? 'active' : ''}`}
                                        >
                                          {msgFormula.get('formula.pst1')}
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
                                          className={`tartar-stage-value ${subdiagnozis === 'st2' ? 'active' : ''}`}
                                        >
                                          {msgFormula.get('formula.pst2')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*/* ==================================================*/}
                          {/*ENDO*/}
                          {/*/* ==================================================*/}
                          <div className={`diagnosis-group endo ${openGroups.endo ? 'open' : ''}`}>
                            <button
                              className="diagnosis-group-header endo"
                              onClick={() => toggleGroup('endo')}
                              type="button"
                            >
                              <div className="diagnosis-group-left">
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
                                    <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 w-full">
                                      <span
                                        className={`paradont-title ${diagnozis === 'paradont_health' ? 'active' : ''}`}
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
                                        className={`paradont-title ${diagnozis === 'paradont_all_health' ? 'active' : ''}`}
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
                                  </div>
                                </li>
                                <li
                                  className={`dia-row ${diagnozis === 'parodontit' ? 'active' : ''}`}
                                >
                                  <div className="flex">
                                    <div className="w-1/2">
                                      <span
                                        className={`font-medium text-slate-800 text-[13px]  ml-3`}
                                        onClick={() => {
                                          if (diagnozis === 'parodontit') {
                                            dispatch(setSubDiagnosis(''));
                                          }
                                          dispatch(
                                            setDiagnosis(
                                              diagnozis === 'parodontit' ? '' : 'parodontit'
                                            )
                                          );
                                          dispatch(setSubDiagnosis('pst1'));
                                        }}
                                      >
                                        {msgFormula.get('formula.parodontit')}
                                      </span>
                                    </div>
                                    <div className="w-1/2 text-right">
                                      <div className="tartar-stage-block parodontit-stage-block">
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
                                          className={`tartar-stage-value ${subdiagnozis === 'pst1' ? 'active' : ''}`}
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
                                          className={`tartar-stage-value ${subdiagnozis === 'pst2' ? 'active' : ''} `}
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
                                          className={`tartar-stage-value ${subdiagnozis === 'pst3' ? 'active' : ''} cursor-pointer`}
                                        >
                                          {msgFormula.get('formula.parodontit.st.3')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li className={`clearfix`} />
                                <li
                                  style={{ marginTop: '-15px', float: 'right' }}
                                  className={'w-full'}
                                >
                                  <div
                                    className={
                                      'tartar-stage-block parodontit-stage-block-2 float-right'
                                    }
                                  >
                                    <span
                                      onClick={() => {
                                        paradontAllStageTeeth('pst1');
                                        dispatch(setChangeDia(Math.random()));
                                        dispatch(setSubDiagnosis('allst1'));
                                      }}
                                      className={`tartar-stage-value ${subdiagnozis === 'allst1' ? 'active' : ''} cursor-pointer`}
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
                                      className={`tartar-stage-value ${subdiagnozis === 'allst2' ? 'active' : ''} cursor-pointer`}
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
                                      className={`tartar-stage-value ${subdiagnozis === 'allst3' ? 'active' : ''} cursor-pointer`}
                                    >
                                      {msgFormula.get('formula.parodontit.all.st.3')}
                                    </span>
                                  </div>
                                </li>
                                <li style={{ clear: 'both' }} />
                                <li
                                  className={`dia-row ${diagnozis === 'no_inflammatory_process' ? 'active' : ''}`}
                                >
                                  <span
                                    onClick={() => {
                                      dispatch(setDiagnosis('no_inflammatory_process'));
                                    }}
                                    className={`font-medium text-slate-800 text-[13px]  ml-3 `}
                                  >
                                    {msgFormula.get('formula.no_inflammatory_process')}
                                  </span>
                                </li>
                                <li
                                  className={`dia-row ${diagnozis === 'inflamed_gums' ? 'active' : ''}`}
                                >
                                  <span
                                    onClick={() => {
                                      dispatch(setDiagnosis('inflamed_gums'));
                                    }}
                                    className={`font-medium text-slate-800 text-[13px] ml-3`}
                                  >
                                    {msgFormula.get('formula.inflamed_gums')}
                                  </span>
                                </li>
                                <li
                                  className={`dia-row ${diagnozis === 'significantly_gums' ? 'active' : ''}`}
                                >
                                  <span
                                    onClick={() => {
                                      dispatch(setDiagnosis('significantly_gums'));
                                    }}
                                    className={`font-medium text-slate-800 text-[13px] ml-3`}
                                  >
                                    {msgFormula.get('formula.significantly_gums')}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*/* ==================================================*/}
                          {/*КОНСТРУКЦІЇ*/}
                          {/*/* ==================================================*/}
                          <div
                            className={`diagnosis-group constructs ${openGroups.constructs ? 'open' : ''}`}
                          >
                            <button
                              className="diagnosis-group-header constructs"
                              onClick={() => toggleGroup('constructs')}
                              type="button"
                            >
                              <div className="diagnosis-group-left">
                                <span>{msgFormula.get('formula.formula_tab_construct')}</span>
                              </div>

                              <span className="accordion-arrow">
                                <FontAwesomeIcon icon={faChevronDown} color={'#f59e0b'} />
                              </span>
                            </button>

                            <div
                              className={`diagnosis-group-content ${!openGroups.constructs ? 'hidden' : ''}`}
                            >
                              <div className="mb-2 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                  <span>Ступінь / Стан конструкції:</span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                                  <div className="flex items-center gap-1.5 text-slate-600 bg-white px-1.5 py-1 rounded border border-slate-200">
                                    <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 shrink-0"></span>
                                    <span className="truncate h-[17px]" title="Норма (задовільно)">
                                      Пломба
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-600 bg-white px-1.5 py-1 rounded border border-slate-200">
                                    <span className="w-2.5 h-2.5 rounded-[2px] bg-amber-300 shrink-0"></span>
                                    <span
                                      className="truncate h-[17px]"
                                      title="Потребує спостереження"
                                    >
                                      Вторинний карієс
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-600 bg-white px-1.5 py-1 rounded border border-slate-200">
                                    <span className="w-2.5 h-2.5 rounded-[2px] bg-rose-400 shrink-0"></span>
                                    <span
                                      className="truncate h-[17px]"
                                      title="Потребує лікування або заміни"
                                    >
                                      Пломба з порушеним крайовим приляганням
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <ul className="inline-list formula-action mt-3.5">
                                <li
                                  className={`dia-row ${diagnozis === 'seal' ? 'active' : ''} mr-10`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      className={'font-medium text-slate-800 text-[13px]'}
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
                                    <div className="flex items-center gap-1">
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-emerald-200 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer ${sealColor1 === 'blue' && diagnozis === 'seal' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-amber-200 hover:bg-amber-400 text-amber-800 hover:text-white transition-colors cursor-pointer ${sealColor2 === 'yellow' && diagnozis === 'seal' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-yellow-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-rose-200 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer ${sealColor3 === 'pink' && diagnozis === 'seal' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                {/* ПРИШИЙКОВА ПЛОМБА */}
                                <li
                                  className={`dia-row ${diagnozis === 'seal_cervical' ? 'active' : ''} mr-10`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      className={`font-medium text-slate-800 text-[13px] ${diagnozis === 'seal_cervical' ? 'active' : ''} mr-10`}
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
                                    <div className="flex items-center gap-1">
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors  cursor-pointer ${scColor === 'blue' && diagnozis === 'seal_cervical' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-amber-400 text-amber-800 hover:text-white transition-colors cursor-pointer ${scColor === 'yellow' && diagnozis === 'seal_cervical' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-yellow-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer ${scColor === 'pink' && diagnozis === 'seal_cervical' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                {/* ВІНІР */}
                                <li
                                  className={`dia-row ${diagnozis === 'vinir' ? 'active' : ''} mr-10`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      className={`font-medium text-slate-800 text-[13px]`}
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
                                    <div className="flex items-center gap-1">
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer cursor-pointer ${vinirColor === 'blue' && diagnozis === 'vinir' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-amber-400 text-amber-800 hover:text-white transition-colors cursor-pointer ${vinirColor === 'yellow' && diagnozis === 'vinir' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-yellow-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer ${vinirColor === 'pink' && diagnozis === 'vinir' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                {/* ТИМЧАСОВА КОРОНКА */}
                                <li
                                  className={`dia-row ${diagnozis === 'temporary_crown' ? 'active' : ''}`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      onClick={() => {
                                        if (diagnozis !== 'temporary_crown') {
                                          dispatch(setDiagnosis('temporary_crown'));
                                        }
                                        dispatch(setSubDiagnosis(''));
                                      }}
                                      className={`font-medium text-slate-800 text-[13px]diagnoze-title  mr-10`}
                                    >
                                      {msgFormula.get('formula.temporary.crown')}
                                    </span>
                                  </div>
                                </li>

                                {/* КОРОНКА КЕРАМІЧНА */}
                                <li
                                  className={`dia-row ${diagnozis === 'ceramic_crown' ? 'active' : ''} mr-10`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      className={'font-medium text-slate-800 text-[13px]'}
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
                                    <div className="flex items-center gap-1">
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors  cursor-pointer ${ceramicCrownColor === 'blue' && diagnozis === 'ceramic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-amber-100 hover:bg-amber-400 text-amber-800 hover:text-white transition-colors cursor-pointer ${ceramicCrownColor === 'yellow' && diagnozis === 'ceramic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-yellow-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-rose-500 hover:text-white transition-colors  cursor-pointer ${ceramicCrownColor === 'pink' && diagnozis === 'ceramic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                {/* КОРОНКА МЕТАЛОКЕРАМІЧНА */}
                                <li
                                  className={`dia-row ${diagnozis === 'mceramic_crown' ? 'active' : ''} mr-10`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      className={'font-medium text-slate-800 text-[13px]'}
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
                                    <div className="flex items-center gap-1">
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer ${mceramicCrownColor === 'blue' && diagnozis === 'mceramic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-amber-100 hover:bg-amber-400 text-amber-800 hover:text-white transition-colors cursor-pointer ${mceramicCrownColor === 'yellow' && diagnozis === 'mceramic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-yellow-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer ${mceramicCrownColor === 'pink' && diagnozis === 'mceramic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                {/* КОРОНКА МЕТАЛЕВА */}
                                <li
                                  className={`dia-row ${diagnozis === 'metalic_crown' ? 'active' : ''} mr-10`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      className={'font-medium text-slate-800 text-[13px]'}
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
                                    <div className="flex items-center gap-1">
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer ${metalicCrownColor === 'blue' && diagnozis === 'metalic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-amber-100 hover:bg-amber-400 text-amber-800 hover:text-white transition-colors cursor-pointer ${metalicCrownColor === 'yellow' && diagnozis === 'metalic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-yellow-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-rose-500 hover:text-white transition-colors  cursor-pointer ${metalicCrownColor === 'pink' && diagnozis === 'metalic_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                {/* КОРОНКА ЦИРКОНІЄВАЯ */}
                                <li
                                  className={`dia-row ${diagnozis === 'zirconia_crown' ? 'active' : ''} mr-10`}
                                >
                                  <div className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-2xs">
                                    <span
                                      className={'font-medium text-slate-800 text-[13px]'}
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
                                    <div className="flex items-center gap-1">
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer ${zirconiaCrownColor === 'blue' && diagnozis === 'zirconia_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-amber-100 hover:bg-amber-400 text-amber-800 hover:text-white transition-colors cursor-pointer ${zirconiaCrownColor === 'yellow' && diagnozis === 'zirconia_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-yellow-500"></span>
                                      </div>
                                      <div
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
                                        className={`w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer ${zirconiaCrownColor === 'pink' && diagnozis === 'zirconia_crown' && 'active'}`}
                                      >
                                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                {/* ШТИФТ */}
                                <li
                                  className={'mt-3'}
                                  style={{
                                    display: teethType === 'child' ? 'none' : 'inherit',
                                  }}
                                >
                                  <div className="ml-4 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                    Хірургічні та опорні елементи
                                  </div>
                                  <span
                                    className={`construct-dia diagnoze-title ${diagnozis === 'pin' ? 'active' : ''}`}
                                    onClick={() => {
                                      dispatch(setDiagnosis(diagnozis === 'pin' ? '' : 'pin'));
                                      dispatch(setSubDiagnosis(''));
                                    }}
                                  >
                                    {msgFormula.get('formula.pin')}
                                  </span>
                                  <span
                                    className={`ml-3 construct-dia diagnoze-title ${diagnozis === 'culttab' ? 'active' : ''}`}
                                    onClick={() => {
                                      dispatch(
                                        setDiagnosis(diagnozis === 'culttab' ? '' : 'culttab')
                                      );
                                      dispatch(setSubDiagnosis(''));
                                    }}
                                  >
                                    {msgFormula.get('formula.cult.tab')}
                                  </span>
                                  <span
                                    className={`ml-3 construct-dia diagnoze-title ${diagnozis === 'abutment' ? 'active' : ''}`}
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
                                <li
                                  style={{
                                    display: teethType === 'child' ? 'none' : 'inherit',
                                  }}
                                >
                                  <span
                                    className={`construct-dia diagnoze-title ${diagnozis === 'shaper' ? 'active' : ''}`}
                                    onClick={() => {
                                      dispatch(
                                        setDiagnosis(diagnozis === 'shaper' ? '' : 'shaper')
                                      );
                                      dispatch(setSubDiagnosis(''));
                                    }}
                                  >
                                    {msgFormula.get('formula.shaper')}
                                  </span>
                                  <span
                                    className={`ml-3 construct-dia diagnoze-title ${diagnozis === 'implant' ? 'active' : ''}`}
                                    onClick={() => {
                                      dispatch(
                                        setDiagnosis(diagnozis === 'implant' ? '' : 'implant')
                                      );
                                      dispatch(setSubDiagnosis(''));
                                    }}
                                  >
                                    {msgFormula.get('formula.implant')}
                                  </span>
                                </li>
                                {/* КУЛЬТОВА НАКЛАДКА */}
                                {/*<li*/}
                                {/*  style={{*/}
                                {/*    display: teethType === 'child' ? 'none' : 'inherit',*/}
                                {/*  }}*/}
                                {/*>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title ${diagnozis === 'culttab' ? 'active' : ''}`}*/}
                                {/*    onClick={() => {*/}
                                {/*      dispatch(*/}
                                {/*        setDiagnosis(diagnozis === 'culttab' ? '' : 'culttab')*/}
                                {/*      );*/}
                                {/*      dispatch(setSubDiagnosis(''));*/}
                                {/*    }}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.cult.tab')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*/!* АБАТМЕНТ *!/*/}
                                {/*<li*/}
                                {/*  style={{*/}
                                {/*    display: teethType === 'child' ? 'none' : 'inherit',*/}
                                {/*  }}*/}
                                {/*>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title ${diagnozis === 'abutment' ? 'active' : ''}`}*/}
                                {/*    onClick={() => {*/}
                                {/*      dispatch(*/}
                                {/*        setDiagnosis(diagnozis === 'abutment' ? '' : 'abutment')*/}
                                {/*      );*/}
                                {/*      dispatch(setSubDiagnosis(''));*/}
                                {/*    }}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.abutment')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*/!* ФОРМУВАЧ *!/*/}
                                {/*<li*/}
                                {/*  style={{*/}
                                {/*    display: teethType === 'child' ? 'none' : 'inherit',*/}
                                {/*  }}*/}
                                {/*>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title ${diagnozis === 'shaper' ? 'active' : ''}`}*/}
                                {/*    onClick={() => {*/}
                                {/*      dispatch(*/}
                                {/*        setDiagnosis(diagnozis === 'shaper' ? '' : 'shaper')*/}
                                {/*      );*/}
                                {/*      dispatch(setSubDiagnosis(''));*/}
                                {/*    }}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.shaper')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                                {/*/!* ІМПЛАНТ *!/*/}
                                {/*<li*/}
                                {/*  style={{*/}
                                {/*    display: teethType === 'child' ? 'none' : 'inherit',*/}
                                {/*  }}*/}
                                {/*>*/}
                                {/*  <span*/}
                                {/*    className={`diagnoze-title ${diagnozis === 'implant' ? 'active' : ''}`}*/}
                                {/*    onClick={() => {*/}
                                {/*      dispatch(*/}
                                {/*        setDiagnosis(diagnozis === 'implant' ? '' : 'implant')*/}
                                {/*      );*/}
                                {/*      dispatch(setSubDiagnosis(''));*/}
                                {/*    }}*/}
                                {/*  >*/}
                                {/*    {msgFormula.get('formula.implant')}*/}
                                {/*  </span>*/}
                                {/*</li>*/}
                              </ul>
                            </div>
                          </div>
                          {/*/*=========================*/}
                          {/*/*========= ПАРАДОНТ ======*/}
                          {/*/*=========================*/}
                          <div
                            className={`diagnosis-group parodont ${openGroups.parodont ? 'open' : ''}`}
                          >
                            <button
                              className="diagnosis-group-header parodont"
                              onClick={() => toggleGroup('parodont')}
                              type="button"
                            >
                              <div className="diagnosis-group-left">
                                <span>{msgFormula.get('formula.formula_tab_paradont')}</span>
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
                                    <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 w-full">
                                      <span
                                        className={`paradont-title ${diagnozis === 'paradont_health' ? 'active' : ''}`}
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
                                        className={`paradont-title ${diagnozis === 'paradont_all_health' ? 'active' : ''}`}
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
                                  </div>
                                </li>
                                <li className={'dia-row'}>
                                  <div className="flex">
                                    <div className="w-1/2">
                                      <span
                                        className={`font-medium text-slate-800 text-[13px]  ml-3 ${diagnozis === 'parodontit' ? 'active' : ''}`}
                                        onClick={() => {
                                          if (diagnozis === 'parodontit') {
                                            dispatch(setSubDiagnosis(''));
                                          }
                                          dispatch(
                                            setDiagnosis(
                                              diagnozis === 'parodontit' ? '' : 'parodontit'
                                            )
                                          );
                                          dispatch(setSubDiagnosis('pst1'));
                                        }}
                                      >
                                        {msgFormula.get('formula.parodontit')}
                                      </span>
                                    </div>
                                    <div className="w-1/2 text-right">
                                      <div className="tartar-stage-block parodontit-stage-block">
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
                                          className={`tartar-stage-value ${subdiagnozis === 'pst1' ? 'active' : ''} mr-1 cursor-pointer`}
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
                                          className={`tartar-stage-value ${subdiagnozis === 'pst2' ? 'active' : ''} mr-1 cursor-pointer`}
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
                                          className={`tartar-stage-value ${subdiagnozis === 'pst3' ? 'active' : ''} cursor-pointer`}
                                        >
                                          {msgFormula.get('formula.parodontit.st.3')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li className={`clearfix`} />
                                <li
                                  className={'w-full'}
                                  style={{ marginTop: '-15px', float: 'right' }}
                                >
                                  <div
                                    className={
                                      'tartar-stage-block parodontit-stage-block-2 float-right'
                                    }
                                  >
                                    <span
                                      onClick={() => {
                                        paradontAllStageTeeth('pst1');
                                        dispatch(setChangeDia(Math.random()));
                                        dispatch(setSubDiagnosis('allst1'));
                                      }}
                                      className={`tartar-stage-value ${subdiagnozis === 'allst1' ? 'active' : ''} cursor-pointer`}
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
                                      className={`tartar-stage-value ${subdiagnozis === 'allst2' ? 'active' : ''} cursor-pointer`}
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
                                      className={`tartar-stage-value ${subdiagnozis === 'allst3' ? 'active' : ''} cursor-pointer`}
                                    >
                                      {msgFormula.get('formula.parodontit.all.st.3')}
                                    </span>
                                  </div>
                                </li>
                                <li style={{ clear: 'both' }} />
                                <li className={`dia-row ${diagnozis === 'no_inflammatory_process' ? 'active' : ''}`}>
                                  <span
                                    onClick={() => {
                                      dispatch(setDiagnosis('no_inflammatory_process'));
                                    }}
                                    className={`font-medium text-slate-800 text-[13px]  ml-3`}
                                  >
                                    {msgFormula.get('formula.no_inflammatory_process')}
                                  </span>
                                </li>
                                <li className={`w-full`}>
                                  <div className={`flex`}>
                                    <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 w-full">
                                      <span
                                        onClick={() => {
                                          dispatch(setDiagnosis('inflamed_gums'));
                                        }}
                                        className={`paradont-title ${diagnozis === 'inflamed_gums' ? 'active' : ''}`}
                                      >
                                        {msgFormula.get('formula.inflamed_gums')}
                                      </span>
                                      <span
                                        onClick={() => {
                                          dispatch(setDiagnosis('significantly_gums'));
                                        }}
                                        className={`paradont-title ${diagnozis === 'significantly_gums' ? 'active' : ''}`}
                                      >
                                        {msgFormula.get('formula.significantly_gums')}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="clearfix w-full"></div>

                  </div>
                </aside>
                <div className="clearfix" />

              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-40">
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
