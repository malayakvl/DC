export interface PerioNumericArrays {
  yk1828Vest: Array<number | string>;
  yk1828Oral: Array<number | string>;
  yk4838Vest: Array<number | string>;
  yk4838Oral: Array<number | string>;
  z1828Vest: Array<number | string>;
  z1828Oral: Array<number | string>;
  z4838Vest: Array<number | string>;
  z4838Oral: Array<number | string>;
}

export interface PerioMetricsResult {
  bopPercent: string; // Кровоточивість при зондуванні (BOP)
  bopDeepPercent: string; // Кровоточивість при зондуванні ≥ 5 мм (BOP)
  suppurationPercent: string; // Гноєтеча
  plaquePercent: string; // Зубні відкладення
  meanPpd: string; // Середня глибина зондування (мм)
  meanCal: string; // Середня висота прикріплення CAL (мм)
  deepPocketsCount: number; // Кількість поверхонь з кишенями ≥ 5 мм (для бейджа в легенді)
  totalSites: number; // Усього активних поверхонь
}

const UPPER_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

export function calculatePerioMetrics(
  arrays: PerioNumericArrays,
  perioDiagnozis: Record<string, any> = {},
  missingTeeth: Array<number | string> = [] // опционально: список удалённых зубов, если передаёшь
): PerioMetricsResult {
  const missingSet = new Set(missingTeeth.map(String));

  let totalSites = 0;
  let bopCount = 0;
  let deepPocketsCount = 0;
  let deepBopCount = 0;
  let suppurationCount = 0;
  let plaqueCount = 0;
  let ppdSum = 0;
  let calSum = 0;

  const processJaw = (
    teethList: number[],
    zVest: Array<number | string>,
    zOral: Array<number | string>,
    ykVest: Array<number | string>,
    ykOral: Array<number | string>
  ) => {
    teethList.forEach((toothNum, toothIndex) => {
      const toothKey = `tooth${toothNum}`;
      const toothDiag = perioDiagnozis?.[toothKey] || {};

      // Пропускаем удалённые зубы (если статус хранится в missingTeeth или внутри toothDiag)
      if (
        missingSet.has(String(toothNum)) ||
        toothDiag.status === 'missing' ||
        toothDiag.absent === true
      ) {
        return;
      }

      // Проходим по 3 точкам (st1, st2, st3) с вестибулярной и оральной стороны
      for (let st = 1; st <= 3; st++) {
        const arrIdx = toothIndex * 3 + (st - 1);

        // --- 1. Вестибулярная сторона (vest) ---
        const ppdV = Number(zVest?.[arrIdx]) || 0;
        const gmV = Number(ykVest?.[arrIdx]) || 0;
        const hasBleedV = Boolean(toothDiag[`bleeding_vest_st${st}`]);
        const hasSuppV = Boolean(toothDiag[`fertilizer_vest_st${st}`]);
        const hasPlaqueV = Boolean(toothDiag[`dentaldeposit_vest_st${st}`]);

        totalSites++;
        ppdSum += ppdV;
        calSum += ppdV + gmV;
        if (hasBleedV) bopCount++;
        if (hasSuppV) suppurationCount++;
        if (hasPlaqueV) plaqueCount++;
        if (ppdV >= 5) {
          deepPocketsCount++;
          if (hasBleedV) deepBopCount++;
        }

        // --- 2. Оральная сторона (oral) ---
        const ppdO = Number(zOral?.[arrIdx]) || 0;
        const gmO = Number(ykOral?.[arrIdx]) || 0;
        const hasBleedO = Boolean(toothDiag[`bleeding_oral_st${st}`]);
        const hasSuppO = Boolean(toothDiag[`fertilizer_oral_st${st}`]);
        const hasPlaqueO = Boolean(toothDiag[`dentaldeposit_oral_st${st}`]);

        totalSites++;
        ppdSum += ppdO;
        calSum += ppdO + gmO;
        if (hasBleedO) bopCount++;
        if (hasSuppO) suppurationCount++;
        if (hasPlaqueO) plaqueCount++;
        if (ppdO >= 5) {
          deepPocketsCount++;
          if (hasBleedO) deepBopCount++;
        }
      }
    });
  };

  processJaw(
    UPPER_TEETH,
    arrays.z1828Vest || [],
    arrays.z1828Oral || [],
    arrays.yk1828Vest || [],
    arrays.yk1828Oral || []
  );

  processJaw(
    LOWER_TEETH,
    arrays.z4838Vest || [],
    arrays.z4838Oral || [],
    arrays.yk4838Vest || [],
    arrays.yk4838Oral || []
  );

  if (totalSites === 0) {
    return {
      bopPercent: '0.00',
      bopDeepPercent: '0.00',
      suppurationPercent: '0.00',
      plaquePercent: '0.00',
      meanPpd: '0.00',
      meanCal: '0.00',
      deepPocketsCount: 0,
      totalSites: 0,
    };
  }

  return {
    bopPercent: ((bopCount / totalSites) * 100).toFixed(2),
    bopDeepPercent:
      deepPocketsCount > 0 ? ((deepBopCount / deepPocketsCount) * 100).toFixed(2) : '0.00',
    suppurationPercent: ((suppurationCount / totalSites) * 100).toFixed(2),
    plaquePercent: ((plaqueCount / totalSites) * 100).toFixed(2),
    meanPpd: (ppdSum / totalSites).toFixed(2),
    meanCal: (calSum / totalSites).toFixed(2),
    deepPocketsCount,
    totalSites,
  };
}
