import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';

export type JawFilter = 'all' | 'up' | 'down';

export interface ToothMeta {
  title: string;
  colloquial?: string;
  quadrant: string;
  jaw: 'ВЧ' | 'НЧ';
  isPrimary?: boolean;
}

export const JAW_UP_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
export const JAW_DOWN_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

export const D_ARRAY = [
  'absent',
  'abutment',
  'apex',
  'change_color',
  'culttab',
  'fissure',
  'implant',
  'parodontit',
  'periodontit',
  'pin',
  'shaper',
  'tartar',
  'temporary_crown',
  'wedge_shaped_defect',
];

export const D_COLORED_ARRAY = [
  'caries_bottom',
  'caries_center',
  'caries_left',
  'caries_right',
  'caries_top',
  'cervical_caries',
  'ceramic_crown',
  'channel_not_sealed',
  'channel_part_sealed',
  'channel_top_sealed',
  'pulpit',
  'seal_cervical',
  'seal_bottom',
  'seal_center',
  'seal_left',
  'seal_right',
  'seal_top',
  'metalic_crown',
  'mceramic_crown',
  'zirconia_crown',
  'vinir',
  'inflamed_gums',
  'significantly_gums',
  'no_inflammatory_process',
];

export const DISPLAYED_DIAGNOZIS = [...D_ARRAY, ...D_COLORED_ARRAY];

const TOOTH_BASE_MAP: Record<number, { title: string; colloquial?: string }> = {
  1: { title: 'Центральний різець', colloquial: 'одиниця' },
  2: { title: 'Бічний різець', colloquial: 'двійка' },
  3: { title: 'Ікло', colloquial: 'трійка' },
  4: { title: 'Перший премоляр', colloquial: 'четвірка' },
  5: { title: 'Другий премоляр', colloquial: 'п’ятірка' },
  6: { title: 'Перший моляр', colloquial: 'шістка' },
  7: { title: 'Другий моляр', colloquial: 'сімка' },
  8: { title: 'Третій моляр', colloquial: 'вісімка' },
};

const PRIMARY_TOOTH_BASE_MAP: Record<number, { title: string; colloquial?: string }> = {
  1: { title: 'Тимчасовий центральний різець' },
  2: { title: 'Тимчасовий бічний різець' },
  3: { title: 'Тимчасове ікло' },
  4: { title: 'Тимчасовий перший моляр' },
  5: { title: 'Тимчасовий другий моляр' },
};

const QUADRANT_MAP: Record<number, { quadrant: string; jaw: 'ВЧ' | 'НЧ' }> = {
  1: { quadrant: 'Q1', jaw: 'ВЧ' },
  2: { quadrant: 'Q2', jaw: 'ВЧ' },
  3: { quadrant: 'Q3', jaw: 'НЧ' },
  4: { quadrant: 'Q4', jaw: 'НЧ' },
  5: { quadrant: 'Q1', jaw: 'ВЧ' },
  6: { quadrant: 'Q2', jaw: 'ВЧ' },
  7: { quadrant: 'Q3', jaw: 'НЧ' },
  8: { quadrant: 'Q4', jaw: 'НЧ' },
};

export const getToothMeta = (num: number): ToothMeta => {
  const quadCode = Math.floor(num / 10);
  const posCode = num % 10;
  const quadInfo = QUADRANT_MAP[quadCode] ?? { quadrant: '', jaw: 'ВЧ' };
  const isPrimary = quadCode >= 5 && quadCode <= 8;

  const baseInfo = isPrimary ? PRIMARY_TOOTH_BASE_MAP[posCode] : TOOTH_BASE_MAP[posCode];

  return {
    title: baseInfo?.title ?? `Зуб ${num}`,
    colloquial: baseInfo?.colloquial,
    quadrant: quadInfo.quadrant,
    jaw: quadInfo.jaw,
    isPrimary,
  };
};

export const formatToothTitle = (meta: ToothMeta, includeColloquial = true): string => {
  if (includeColloquial && meta.colloquial) {
    return `${meta.title} (${meta.colloquial})`;
  }
  return meta.title;
};

const pluralizeUa = (count: number, one: string, few: string, many: string): string => {
  const abs = Math.abs(count) % 100;
  const lastDigit = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (lastDigit === 1) return one;
  if (lastDigit >= 2 && lastDigit <= 4) return few;
  return many;
};

export const formatTeethCountUa = (count: number): string =>
  `${count} ${pluralizeUa(count, 'зуб', 'зуби', 'зубів')}`;

export const formatStatesCountUa = (count: number): string =>
  `${count} ${pluralizeUa(count, 'стан', 'стани', 'станів')}`;

export const getToothActiveDiagnozis = (tooth: Record<string, any> | undefined): string[] => {
  if (!tooth || typeof tooth !== 'object') return [];
  return Object.keys(tooth).filter(
    (key) => Boolean(tooth[key]) && DISPLAYED_DIAGNOZIS.includes(key)
  );
};

export const calculateFormulaSummary = (
  teethDiagnozis: Record<string, any> | undefined,
  toothNumbers: number[] = [...JAW_UP_TEETH, ...JAW_DOWN_TEETH]
) => {
  let teethCount = 0;
  let statesCount = 0;

  toothNumbers.forEach((num) => {
    const activeKeys = getToothActiveDiagnozis(teethDiagnozis?.[`tooth${num}`]);
    if (activeKeys.length > 0) {
      teethCount += 1;
      statesCount += activeKeys.length;
    }
  });

  return {
    teethCount,
    statesCount,
    summaryLabel: `${formatTeethCountUa(teethCount)} / ${formatStatesCountUa(statesCount)}`,
  };
};

export default function ViewFormulaDiagnozis({
                                               formulaData,
                                               formulaId,
                                             }: {
  formulaData: any;
  formulaId: number;
}) {
  const appLang = useSelector(appLangSelector);
  const [jawFilter, setJawFilter] = useState<JawFilter>('all');

  const msgFormula = useMemo(
    () =>
      new Lang({
        messages: lngFormula,
        locale: appLang,
      }),
    [appLang]
  );

  const teethDiagnozis = formulaData || {};

  const summary = useMemo(() => {
    const allSummary = calculateFormulaSummary(teethDiagnozis, [...JAW_UP_TEETH, ...JAW_DOWN_TEETH]);
    const upSummary = calculateFormulaSummary(teethDiagnozis, JAW_UP_TEETH);
    const downSummary = calculateFormulaSummary(teethDiagnozis, JAW_DOWN_TEETH);

    return {
      all: allSummary,
      up: upSummary,
      down: downSummary,
    };
  }, [teethDiagnozis]);

  const activeSummary =
    jawFilter === 'up' ? summary.up : jawFilter === 'down' ? summary.down : summary.all;

  const renderDiagnoze = (num: number) => {
    const tooth = teethDiagnozis?.[`tooth${num}`];
    const activeKeys = getToothActiveDiagnozis(tooth);
    if (!tooth || activeKeys.length === 0) {
      return null;
    }

    const meta = getToothMeta(num);
    const toothLabel = formatToothTitle(meta, true);

    return (
      <div className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 transition-all mb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-md bg-white border border-slate-300 shadow-xs flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-xs">🦷</span>
              <span className="text-[11px] font-bold text-slate-800 leading-none">{num}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-xs font-bold text-slate-800">{toothLabel}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {meta.quadrant} • {meta.jaw}
                </span>
              </div>

              {/* Diagnozis */}
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {activeKeys.map((key, idx) => {
                  if (D_ARRAY.includes(key)) {
                    const stageLabel =
                      key === 'parodontit' && tooth['parodontit_stage']
                        ? ` ${msgFormula.get(`formula.${tooth['parodontit_stage']}`)}`
                        : '';

                    return (
                      <span
                        key={`${key}-${idx}`}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200"
                      >
                        {msgFormula.get(`formula.${key}`)}
                        {stageLabel}
                      </span>
                    );
                  }

                  const extraColorClass = tooth[`${key}_color`] ? ` ${tooth[`${key}_color`]}` : '';

                  return (
                    <span
                      key={`${key}-${idx}`}
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200${extraColorClass}`}
                    >
                      {msgFormula.get(`formula.${key}`)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              className="p-1 hover:text-teal-700 text-slate-400 rounded"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              type="button"
              className="p-1 hover:text-red-600 text-slate-400 rounded"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderJawSection = (
    title: string,
    teeth: number[],
    jawTeethCount: number,
    containerId: string
  ) => (
    <>
      <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-slate-100">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-teal-500" />
          <span>{title}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          {formatTeethCountUa(jawTeethCount)} із записами
        </span>
      </div>
      <div className="w-full" id={containerId}>
        {teeth.map((num) => (
          <React.Fragment key={num}>{renderDiagnoze(num)}</React.Fragment>
        ))}
      </div>
    </>
  );

  return (
    <div className="w-full flex flex-col">
      {/* Шапка реестра и фильтры челюстей */}
      <div className="mb-3 pb-3 border-b border-slate-100">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Реєстр діагнозів та станів</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Сформовано на основі поточної зубної формули
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 whitespace-nowrap">
            {activeSummary.summaryLabel}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setJawFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              jawFilter === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Всі ({summary.all.teethCount})
          </button>

          <button
            type="button"
            onClick={() => setJawFilter('up')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              jawFilter === 'up'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Верхня щелепа ({summary.up.teethCount})
          </button>

          <button
            type="button"
            onClick={() => setJawFilter('down')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              jawFilter === 'down'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Нижня щелепа ({summary.down.teethCount})
          </button>
        </div>
      </div>

      {/* Списки зубов по выбранному фильтру */}
      {(jawFilter === 'all' || jawFilter === 'up') &&
        renderJawSection(
          'Верхня щелепа (Maxilla)',
          JAW_UP_TEETH,
          summary.up.teethCount,
          `dia-up-${formulaId}`
        )}

      {(jawFilter === 'all' || jawFilter === 'down') &&
        renderJawSection(
          'Нижня щелепа (Mandibula)',
          JAW_DOWN_TEETH,
          summary.down.teethCount,
          `dia-down-${formulaId}`
        )}
    </div>
  );
}