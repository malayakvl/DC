import React, { useMemo, useState } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import { Link, router } from '@inertiajs/react';
import {
  FolderPlus,
  FolderOpen,
  Plus,
  UserPlus,
  Pencil,
  Copy,
  Printer,
  Trash2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import lngFormula from '../../../Lang/Formula/translation';
import InputText from '../../../Components/Form/InputText';
import ViewFormula from './../ViewFormula';
import ViewPerio from './../ViewPerio';
import moment from 'moment';
import { setChangeDia, setClearFormula, setSelectedToothNumber } from '@/Redux/Formula';
import { emptyFormula } from '@/Constants';
import ViewDiagnoze from './../ViewDiagnoze';
import ViewPSR from './../ViewPSR';

export default function History({
  patientData,
  type,
  treatmentData = [],
}: {
  patientData: any;
  type: string;
  treatmentData: any[];
}) {
  const dispatch = useDispatch();
  const [tab] = useState<string>(type ? type : 'history');
  const [stageTab, setStageTab] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDisableTeethTab] = useState<string>('');
  const [stageName, setStageName] = useState('');
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({});

  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });

  // 1. Знаходимо останній (активний) етап лікування
  const activeStage = useMemo(() => {
    const stages = (treatmentData || []).filter((item) => item.type === 'stage');
    if (stages.length === 0) return null;
    return stages.reduce((latest, current) => (current.id > latest.id ? current : latest));
  }, [treatmentData]);

  // 2. Групуємо документи (formula, perio, psr) по їх stage_id
  const groupedStages = useMemo(() => {
    const items = treatmentData || [];
    const stages = items.filter((item) => item.type === 'stage');
    const docs = items.filter((item) => item.type !== 'stage');

    const groups = stages.map((stage) => ({
      stage,
      documents: docs.filter((doc) => Number(doc.stage_id) === Number(stage.id)),
    }));

    const orphanDocs = docs.filter(
      (doc) => !doc.stage_id || !stages.some((s) => Number(s.id) === Number(doc.stage_id))
    );

    if (orphanDocs.length > 0) {
      groups.push({
        stage: null,
        documents: orphanDocs,
      });
    }

    return groups;
  }, [treatmentData]);

  const toggleStageCollapse = (key: string) => {
    setCollapsedStages((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Створення етапу або документа без затримок setState
  const handleCreate = (
    itemType: 'stage' | 'formula' | 'perio' | 'psr',
    stageId: number | null = null
  ) => {
    if (itemType === 'formula') {
      dispatch(setChangeDia(Math.random()));
      dispatch(setSelectedToothNumber(''));
      dispatch(setClearFormula(emptyFormula));
    }

    router.post(
      '/patient/create-treatment',
      {
        user_id: patientData.id,
        stage_name: stageName,
        stage_id: stageId,
        type: itemType,
      },
      {
        onSuccess: () => {
          if (itemType === 'stage') {
            setStageName('');
          }
        },
      }
    );
  };

  const renderDocumentCard = (element: any) => {
    if (stageTab !== '' && stageTab !== element.type) {
      return null;
    }

    return (
      <div key={element.id} className={`w-full patient-stage stage-${element.type}-view`}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center">
              <span>{msgFormula.get('formula.teeth_formula')}</span>
              <span className="ml-2 text-[10px] font-semibold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                FDI 2-digit System
              </span>
            </h2>
            <div className="text-xs text-slate-400">|</div>
            <div className="text-xs font-medium text-slate-600">
              {moment.utc(element.created_at).format('DD.MM.YY')} -{' '}
              {element.stage_name || msgFormula.get('formula.teeth_formula')}
            </div>
          </div>
          <div className="icon-block actions-block">
            <ul className="flex items-center gap-1.5 m-0 p-0 list-none">
              <li>
                <Link
                  href="/"
                  title="Призначити пацієнта"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                </Link>
              </li>

              {['psr', 'perio', 'formula'].includes(element.type) && (
                <>
                  <li>
                    <Link
                      href={`/${element.type}/edit/${element.id}`}
                      title="Редагувати"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 hover:border-teal-200 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${element.type}/copy/${element.id}`}
                      title="Копіювати"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:bg-sky-50 hover:border-sky-200 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </Link>
                  </li>
                </>
              )}

              <li>
                <button
                  type="button"
                  onClick={() => window.print()}
                  title="Друк"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  title="Видалити"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
            <div className="w-full">
              <ViewPerio periodData={element} />
            </div>
          </div>
        )}

        {element.type === 'formula' && (
          <div className="w-full flex flex-row">
            <div className="w-3/5 mr-2 view-formula-white">
              <div className="formula-gray-tabs">
                <span className={'gray-tab active'} id={`up-t-${element.id}`}>
                  <span
                    onClick={() => {
                      const id = element.id;
                      const lowerEl = document.getElementById(`lower_${id}`);
                      const upperEl = document.getElementById(`upper_${id}`);
                      const diaUpEl = document.getElementById(`dia-up-${id}`);
                      const upTEl = document.getElementById(`up-t-${id}`);
                      const uBEl = document.getElementById(`uB_${id}`);
                      const lBEl = document.getElementById(`lB_${id}`);

                      const setTeethVisibility = (visibility: 'hidden' | 'inherit') => {
                        const upperTeeth = [
                          18, 17, 16, 15, 14, 13, 12, 11, 28, 27, 26, 25, 24, 23, 22, 21,
                        ];
                        upperTeeth.forEach((num) => {
                          const toothEl = document.getElementById(`B-${num}`);
                          if (toothEl) {
                            toothEl.style.visibility = visibility;
                          }
                        });
                      };

                      if (!lowerEl?.classList.contains('hide-up-teeth')) {
                        setDisableTeethTab('up');
                        diaUpEl?.classList.add('hide-dia');
                        upTEl?.classList.remove('active');
                        lowerEl?.classList.remove('show-up-teeth');
                        upperEl?.classList.remove('show-up-teeth');
                        lowerEl?.classList.add('hide-up-teeth');
                        upperEl?.classList.add('hide-teeth');
                        setTeethVisibility('hidden');
                        uBEl?.classList.add('hide-bone');
                        lBEl?.classList.add('move-down-bone');
                      } else {
                        setDisableTeethTab('');
                        diaUpEl?.classList.remove('hide-dia');
                        upTEl?.classList.add('active');
                        lowerEl?.classList.remove('hide-up-teeth');
                        upperEl?.classList.remove('hide-teeth');
                        lowerEl?.classList.add('show-up-teeth');
                        upperEl?.classList.add('show-up-teeth');
                        setTeethVisibility('inherit');
                        uBEl?.classList.remove('hide-bone');
                        lBEl?.classList.remove('move-down-bone');
                      }
                    }}
                  >
                    {msgFormula.get('formula.maxilla')}
                  </span>
                </span>
                <span className={'gray-tab  active'} id={`bottom-t-${element.id}`}>
                  <span
                    onClick={() => {
                      const id = element.id;
                      const lowerEl = document.getElementById(`lower_${id}`);
                      const upperEl = document.getElementById(`upper_${id}`);
                      const diaDownEl = document.getElementById(`dia-down-${id}`);
                      const bottomTEl = document.getElementById(`bottom-t-${id}`);

                      const setLowerTeethVisibility = (visibility: 'hidden' | 'inherit') => {
                        const lowerTeeth = [
                          38, 37, 36, 35, 34, 33, 32, 31, 48, 47, 46, 45, 44, 43, 42, 41,
                        ];
                        lowerTeeth.forEach((num) => {
                          const toothEl = document.getElementById(`B-${num}`);
                          if (toothEl) {
                            toothEl.style.visibility = visibility;
                          }
                        });
                      };

                      if (!lowerEl?.classList.contains('hide-teeth')) {
                        setDisableTeethTab('down');
                        diaDownEl?.classList.add('hide-dia');
                        bottomTEl?.classList.remove('active');
                        lowerEl?.classList.remove('show-up-teeth');
                        upperEl?.classList.remove('show-up-teeth');
                        lowerEl?.classList.add('hide-teeth');
                        setLowerTeethVisibility('hidden');
                      } else {
                        setDisableTeethTab('');
                        diaDownEl?.classList.remove('hide-dia');
                        bottomTEl?.classList.add('active');
                        lowerEl?.classList.remove('hide-teeth');
                        setLowerTeethVisibility('inherit');
                      }
                    }}
                  >
                    {msgFormula.get('formula.mandible')}
                  </span>
                </span>
                <span className={'gray-tab active'} id={`occlusion-${element.id}`}>
                  <span
                    onClick={() => {
                      const id = element.id;
                      const diaDownEl = document.getElementById(`dia-down-${id}`);
                      const diaUpEl = document.getElementById(`dia-up-${id}`);
                      const occlusionEl = document.getElementById(`occlusion-${id}`);
                      const axisEl = document.getElementById(`axis_${id}`);
                      const lBEl = document.getElementById(`lB_${id}`);
                      const lowerEl = document.getElementById(`lower_${id}`);
                      const formulaViewEl = document.getElementById(`formula-view-${id}`);

                      const numbersEl =
                        formulaViewEl?.getElementsByClassName('tooth-number-active');
                      const bonesEl = formulaViewEl?.getElementsByClassName('tooth-number-active');
                      const topElements = formulaViewEl?.getElementsByClassName('top-view');

                      diaDownEl?.classList.remove('hide-dia');
                      diaUpEl?.classList.remove('hide-dia');

                      if (occlusionEl?.classList.contains('active')) {
                        occlusionEl.classList.remove('active');
                        axisEl?.classList.add('hide-axis');
                        lBEl?.classList.add('opclusion');
                        lowerEl?.classList.add('opclusion');

                        Array.from(numbersEl ?? []).forEach((el) => {
                          el.classList.add('hide-number');
                        });
                        Array.from(topElements ?? []).forEach((el) => {
                          el.classList.add('tooth-part-hide');
                        });
                        Array.from(bonesEl ?? []).forEach((el) => {
                          el.classList.add('tooth-part-hide');
                        });
                      } else {
                        occlusionEl?.classList.add('active');
                        axisEl?.classList.remove('hide-axis');
                        lBEl?.classList.remove('opclusion');
                        lowerEl?.classList.remove('opclusion');

                        Array.from(numbersEl ?? []).forEach((el) => {
                          el.classList.remove('hide-number');
                        });
                        Array.from(topElements ?? []).forEach((el) => {
                          el.classList.remove('tooth-part-hide');
                        });
                        Array.from(bonesEl ?? []).forEach((el) => {
                          el.classList.remove('tooth-part-hide');
                        });
                      }

                      setDisableTeethTab('occlusion');
                    }}
                  >
                    {msgFormula.get('formula.occlusion')}
                  </span>
                </span>
              </div>
              <ViewFormula formulaData={element} />
            </div>
            <div className="w-2/5  ml-2 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 text-sm">
                      📋
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 leading-tight">
                        Реєстр діагнозів та станів
                      </h2>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Сформовано на основі поточної зубної формули
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                    6 зубів / 8 станів
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-md bg-teal-600 text-white shadow-xs text-center transition-colors">
                    Всі (6)
                  </button>
                  <button className="flex-1 py-1.5 px-2 text-xs font-medium rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 text-center transition-colors">
                    Верхня щелепа (1)
                  </button>
                  <button className="flex-1 py-1.5 px-2 text-xs font-medium rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 text-center transition-colors">
                    Нижня щелепа (5)
                  </button>
                </div>
              </div>
              <div
                className={`tabs-content tab-view-dia w-full bg-white  mt-0 patient-view-stage flex`}
                id={`up-t-content`}
              >
                <ViewDiagnoze formulaData={element} formulaId={element.id} />
              </div>
              <div
                className={`tabs-content tab-view-dia`}
                id={`bottom-t-content`}
                style={{ display: tab === 'down' ? 'block' : 'none' }}
              ></div>
              <div
                className={`tabs-content tab-view-dia`}
                id={`occlusion-content`}
                style={{ display: tab === 'occlusion' ? 'block' : 'none' }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTreatmentStages = () => {
    return (
      <div className="space-y-6 mt-5">
        {groupedStages.map(({ stage, documents }) => {
          const groupKey = stage ? `stage-${stage.id}` : 'stage-unassigned';
          const isCollapsed = !!collapsedStages[groupKey];
          const isCurrentActive = stage && activeStage && stage.id === activeStage.id;

          return (
            <div
              key={groupKey}
              className=" border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden"
            >
              {/* Шапка етапу лікування */}
              <div
                onClick={() => toggleStageCollapse(groupKey)}
                className="px-4 py-3 bg-[#dadfdf] border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                  <FolderOpen className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-bold text-slate-800">
                    {stage ? stage.stage_name : 'Загальні записи (без етапу)'}
                  </span>
                  {stage && (
                    <span className="text-xs text-slate-400">
                      • {moment.utc(stage.created_at).format('DD.MM.YYYY')}
                    </span>
                  )}
                  {isCurrentActive && (
                    <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      Активний етап
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-200/70 text-slate-600">
                    {documents.length}
                  </span>
                </div>

                {/* Кнопки додавання карти безпосередньо в цей етап */}
                {stage && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <button
                      type="button"
                      onClick={() => handleCreate('formula', stage.id)}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Формула</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCreate('perio', stage.id)}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Періо</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCreate('psr', stage.id)}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>PSR</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Вміст етапу */}
              {!isCollapsed && (
                <div className="p-0">
                  {documents.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      У цьому етапі ще немає карт. Додайте зубну формулу, періо-карту або PSR-тест.
                    </div>
                  ) : (
                    documents.map((doc) => renderDocumentCard(doc))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const setActiveStageTab = (tabName: string) => {
    if (stageTab === tabName) setStageTab('');
    else setStageTab(tabName);
  };

  return (
    <>
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate('stage');
          }}
        >
          <div className="w-full bg-gradient-to-r from-teal-50/60 to-slate-50 border border-teal-200/80 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs mt-3 mb-4">
            {/* Ліва частина: Назва нового етапу */}
            <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
              <label
                className="text-xs font-semibold text-teal-900 shrink-0"
                htmlFor="stage-name-input"
              >
                Новий етап:
              </label>
              <div className="relative flex-1 max-w-md">
                <InputText
                  className="stage-input"
                  name="stage_name"
                  values={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                  placeholder={msg.get('patient.newstage')}
                  label=""
                />
              </div>
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Створити етап</span>
              </button>
            </div>

            {/* Права частина: Швидке створення карти (в активний або введений етап) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 font-medium hidden">
              <span className="text-slate-400 hidden sm:inline">
                {activeStage ? `У етап «${activeStage.stage_name}»:` : 'Створити карту:'}
              </span>

              <button
                type="button"
                onClick={() => handleCreate('formula', activeStage?.id ?? null)}
                className="bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 hover:border-teal-300 px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{msg.get('patient.tab.formula')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCreate('perio', activeStage?.id ?? null)}
                className="bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 hover:border-teal-300 px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{msg.get('patient.tab.perio')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCreate('psr', activeStage?.id ?? null)}
                className="bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 hover:border-teal-300 px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{msg.get('patient.tab.test')}</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* TABS BLOCK */}
      <div className="stage-mode-panel hidden">
        <div className="exam-tabs">
          <button
            type="button"
            className={stageTab === 'formula' ? 'exam-tab active' : 'exam-tab'}
            onClick={() => setActiveStageTab('formula')}
          >
            {msg.get('patient.tab.formula')}
          </button>

          <button
            type="button"
            className={stageTab === 'perio' ? 'exam-tab active' : 'exam-tab'}
            onClick={() => setActiveStageTab('perio')}
          >
            {msg.get('patient.tab.perio')}
          </button>

          <button
            type="button"
            className={stageTab === 'psr' ? 'exam-tab active' : 'exam-tab'}
            onClick={() => setActiveStageTab('psr')}
          >
            {msg.get('patient.tab.test')}
          </button>
        </div>
      </div>

      <div className="w-full">{renderTreatmentStages()}</div>
    </>
  );
}
