import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import MovingView from './PerioView/MovingView';
import FurkaciaView from './PerioView/FurkaciaView';
import BleedingView from './PerioView/BleedingView';
import FertilizerView from './PerioView/FertilizerView';
import DentalDepositsView from './PerioView/DentalDepositsView';
import YasenKrayView from './PerioView/YasenKrayView';
import DeepZondView from './PerioView/DeepZoondView';
import IntersectChart1828UpView from './PerioView/IntersectChart1828UpView';
import IntersectChart1828DownView from './PerioView/IntersectChart1828DownView';
import IntersectChart4838UpView from './PerioView/IntersectChart4838UpView';
import IntersectChart4838DownView from './PerioView/IntersectChart4838DownView';
import FormulaPerio1828View from './PerioView/FormulaPerio1828View';
import FormulaPerio4838View from './PerioView/FormulaPerio3848View';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';
import { calculatePerioMetrics } from '../../lib/calculatePerioMetrics'; // проверь свой путь импорта

export default function ViewPerio({ periodData }: { periodData: any }) {
  const pDia = useMemo(() => JSON.parse(periodData.formula || '{}'), [periodData.formula]);
  const pValues = useMemo(
    () => JSON.parse(periodData.perioValues || '{}'),
    [periodData.perioValues]
  );
  const pCharts = useMemo(() => JSON.parse(periodData.chartsData || '{}'), [periodData.chartsData]);

  const appLang = useSelector(appLangSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });

  // Расчёт всех 6 клинических индексов по обеим челюстям
  const metrics = useMemo(
    () =>
      calculatePerioMetrics(
        {
          yk1828Vest: pValues.yk1828Vest || [],
          yk1828Oral: pValues.yk1828Oral || [],
          yk4838Vest: pValues.yk4838Vest || [],
          yk4838Oral: pValues.yk4838Oral || [],
          z1828Vest: pValues.z1828Vest || [],
          z1828Oral: pValues.z1828Oral || [],
          z4838Vest: pValues.z4838Vest || [],
          z4838Oral: pValues.z4838Oral || [],
        },
        pDia
      ),
    [pValues, pDia]
  );

  const toothNumbersUp = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const toothNumbersDown = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
  const siteStartIndices = Array.from({ length: 16 }, (_, i) => i * 3);

  return (
    <div className="py-0 w-full mt-4 mb-4">
      {/* Полоска клинических индексов и легенды */}
      <div className="mb-4 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 flex-1">
          <div className="px-3 py-1.5 rounded-lg bg-rose-50/70 border border-rose-100">
            <div className="text-[11px] font-medium text-slate-500">Кровоточивість (BOP)</div>
            <div className="text-sm font-semibold text-rose-700">{metrics.bopPercent}%</div>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-rose-50/70 border border-rose-100">
            <div className="text-[11px] font-medium text-slate-500">BOP у кишенях ≥ 5 мм</div>
            <div className="text-sm font-semibold text-rose-700">{metrics.bopDeepPercent}%</div>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-amber-50/70 border border-amber-100">
            <div className="text-[11px] font-medium text-slate-500">Гноєтеча</div>
            <div className="text-sm font-semibold text-amber-700">
              {metrics.suppurationPercent}%
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200">
            <div className="text-[11px] font-medium text-slate-500">Зубні відкладення</div>
            <div className="text-sm font-semibold text-slate-800">{metrics.plaquePercent}%</div>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-teal-50/70 border border-teal-100">
            <div className="text-[11px] font-medium text-slate-500">Сер. глибина (PPD)</div>
            <div className="text-sm font-semibold text-teal-800">{metrics.meanPpd} мм</div>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-teal-50/70 border border-teal-100">
            <div className="text-[11px] font-medium text-slate-500">Сер. прикріплення (CAL)</div>
            <div className="text-sm font-semibold text-teal-800">{metrics.meanCal} мм</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 border-l border-slate-200 pl-4">
          <span>
            Кишені ≥ 5 мм: <strong className="text-slate-800">{metrics.deepPocketsCount}</strong>
          </span>
          <span>
            Поверхонь: <strong className="text-slate-800">{metrics.totalSites}</strong>
          </span>
        </div>
      </div>

      <div className="w-full scroll-x pt-4">
        <div className="scale-perio-1 w-full">
          <table className="table-auto perio-table perio-table-view">
            <tbody>
              {/* ВЕРХНЯЯ ЧЕЛЮСТЬ (18–28) */}
              <tr>
                <td className="title">{msgFormula.get('formula.moving')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`moving-up-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <MovingView data={pDia?.[`tooth${tooth}`]?.moving_st} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.furkacia')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`furkacia-up-vest-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    {(tooth >= 16 && tooth <= 18) || (tooth >= 26 && tooth <= 28) ? (
                      <FurkaciaView
                        data={pDia?.[`tooth${tooth}`]?.furkacia_vest_st1}
                        qty={null}
                        type="vest"
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.bleeding')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`bleeding-up-vest-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <BleedingView data={pDia} type="vest" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.fertilizer')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`fertilizer-up-vest-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <FertilizerView data={pDia} type="vest" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.depozit')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`deposits-up-vest-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <DentalDepositsView data={pDia} type="vest" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.yasn')}</td>
                {siteStartIndices.map((sIndx0, i) => (
                  <td
                    key={`yasen-up-vest-${toothNumbersUp[i]}`}
                    style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <YasenKrayView idx={sIndx0} data={pValues.yk1828Vest} />
                      <YasenKrayView idx={sIndx0 + 1} data={pValues.yk1828Vest} />
                      <YasenKrayView idx={sIndx0 + 2} data={pValues.yk1828Vest} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.zond')}</td>
                {siteStartIndices.map((sIndx1, i) => (
                  <td
                    key={`deep-zond-up-vest-${toothNumbersUp[i]}`}
                    style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <DeepZondView idx={sIndx1} data={pValues.z1828Vest} />
                      <DeepZondView idx={sIndx1 + 1} data={pValues.z1828Vest} />
                      <DeepZondView idx={sIndx1 + 2} data={pValues.z1828Vest} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title" style={{ backgroundColor: 'none' }}>
                  <span style={{ display: 'block', marginTop: '50px' }}>
                    {msgFormula.get('formula.vest_oral')}
                  </span>
                </td>
                <td
                  colSpan={16}
                  style={{
                    textAlign: 'center',
                    width: '800px',
                    borderRight: 'none',
                    borderLeft: 'none',
                  }}
                >
                  <div className="relative">
                    <IntersectChart1828UpView
                      zondData={pCharts.zond1828VestChart}
                      yasenData={pCharts.yasen1828VestChart}
                      barData={pCharts.bar1828VestChart}
                    />
                  </div>
                  {pDia && <FormulaPerio1828View pDia={pDia} />}
                  <div className="relative">
                    <IntersectChart1828DownView
                      zondData={pCharts.zond1828OralChart}
                      yasenData={pCharts.yasen1828OralChart}
                      barData={pCharts.bar1828OralChart}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ height: '40px' }}></td>
              </tr>

              <tr>
                <td className="title">{msgFormula.get('formula.zond')}</td>
                {siteStartIndices.map((sIndx1, i) => (
                  <td
                    key={`deep-zond-up-oral-${toothNumbersUp[i]}`}
                    style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <DeepZondView idx={sIndx1} data={pValues.z1828Oral} />
                      <DeepZondView idx={sIndx1 + 1} data={pValues.z1828Oral} />
                      <DeepZondView idx={sIndx1 + 2} data={pValues.z1828Oral} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.yasn')}</td>
                {siteStartIndices.map((sIndx0, i) => (
                  <td
                    key={`yasen-up-oral-${toothNumbersUp[i]}`}
                    style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <YasenKrayView idx={sIndx0} data={pValues.yk1828Oral} />
                      <YasenKrayView idx={sIndx0 + 1} data={pValues.yk1828Oral} />
                      <YasenKrayView idx={sIndx0 + 2} data={pValues.yk1828Oral} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.depozit')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`deposits-up-oral-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <DentalDepositsView data={pDia} type="oral" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.fertilizer')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`fertilizer-up-oral-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <FertilizerView data={pDia} type="oral" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.bleeding')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`bleeding-up-oral-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <BleedingView data={pDia} type="oral" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.furkacia')}</td>
                {toothNumbersUp.map((tooth) => (
                  <td
                    key={`furkacia-up-oral-${tooth}`}
                    style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    {(tooth >= 16 && tooth <= 18) || (tooth >= 26 && tooth <= 28) ? (
                      <FurkaciaView
                        data={pDia?.[`tooth${tooth}`]?.furkacia_vest_st1}
                        type="oral"
                        qty={2}
                      />
                    ) : null}
                  </td>
                ))}
              </tr>

              <tr>
                <td
                  colSpan={17}
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                ></td>
              </tr>
              <tr>
                <td
                  colSpan={17}
                  style={{
                    paddingTop: '1px',
                    paddingBottom: '1px',
                    backgroundColor: '#cdcdcd',
                  }}
                ></td>
              </tr>
              <tr>
                <td
                  colSpan={17}
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                ></td>
              </tr>

              {/* НИЖНЯЯ ЧЕЛЮСТЬ (48–38) */}
              <tr>
                <td className="title">{msgFormula.get('formula.furkacia')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`furkacia-down-vest-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    {(tooth >= 46 && tooth <= 48) || (tooth >= 36 && tooth <= 38) ? (
                      <FurkaciaView
                        data={pDia?.[`tooth${tooth}`]?.furkacia_vest_st1}
                        qty={null}
                        type="vest"
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.bleeding')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`bleeding-down-vest-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <BleedingView data={pDia} type="vest" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.fertilizer')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`fertilizer-down-vest-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <FertilizerView data={pDia} type="vest" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.depozit')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`deposits-down-vest-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <DentalDepositsView data={pDia} type="vest" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.yasn')}</td>
                {siteStartIndices.map((bIndx0, i) => (
                  <td
                    key={`yasen-down-vest-${toothNumbersDown[i]}`}
                    style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <YasenKrayView idx={bIndx0} data={pValues.yk4838Vest} />
                      <YasenKrayView idx={bIndx0 + 1} data={pValues.yk4838Vest} />
                      <YasenKrayView idx={bIndx0 + 2} data={pValues.yk4838Vest} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.zond')}</td>
                {siteStartIndices.map((bIndx1, i) => (
                  <td
                    key={`deep-zond-down-vest-${toothNumbersDown[i]}`}
                    style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <DeepZondView idx={bIndx1} data={pValues.z4838Vest} />
                      <DeepZondView idx={bIndx1 + 1} data={pValues.z4838Vest} />
                      <DeepZondView idx={bIndx1 + 2} data={pValues.z4838Vest} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title" style={{ backgroundColor: 'none' }}>
                  <span style={{ display: 'block', marginTop: '50px' }}>
                    {msgFormula.get('formula.vest_oral')}
                  </span>
                </td>
                <td
                  colSpan={16}
                  style={{
                    textAlign: 'center',
                    width: '900px',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                >
                  <div className="relative">
                    <IntersectChart4838UpView
                      zondData={pCharts.zond4838VestChart}
                      yasenData={pCharts.yasen4838VestChart}
                      barData={pCharts.bar4838VestChart}
                    />
                  </div>
                  {pDia && <FormulaPerio4838View pDia={pDia} />}
                  <div className="relative">
                    <IntersectChart4838DownView
                      zondData={pCharts.zond4838OralChart}
                      yasenData={pCharts.yasen4838OralChart}
                      barData={pCharts.bar4838OralChart}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  colSpan={17}
                  style={{
                    height: '40px',
                    borderLeft: 'none',
                    borderRight: 'none',
                  }}
                ></td>
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.zond')}</td>
                {siteStartIndices.map((bIndx2, i) => (
                  <td
                    key={`deep-zond-down-oral-${toothNumbersDown[i]}`}
                    style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <DeepZondView idx={bIndx2} data={pValues.z4838Oral} />
                      <DeepZondView idx={bIndx2 + 1} data={pValues.z4838Oral} />
                      <DeepZondView idx={bIndx2 + 2} data={pValues.z4838Oral} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.yasn')}</td>
                {siteStartIndices.map((bIndx3, i) => (
                  <td
                    key={`yasen-down-oral-${toothNumbersDown[i]}`}
                    style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <div className="col-xs-12 action-zone-v">
                      <YasenKrayView idx={bIndx3} data={pValues.yk4838Oral} />
                      <YasenKrayView idx={bIndx3 + 1} data={pValues.yk4838Oral} />
                      <YasenKrayView idx={bIndx3 + 2} data={pValues.yk4838Oral} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.depozit')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`deposits-down-oral-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <DentalDepositsView data={pDia} type="oral" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.fertilizer')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`fertilizer-down-oral-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <FertilizerView data={pDia} type="oral" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.bleeding')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`bleeding-down-oral-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <BleedingView data={pDia} type="oral" toothNum={tooth} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.furkacia')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`furkacia-down-oral-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    {(tooth >= 46 && tooth <= 48) || (tooth >= 36 && tooth <= 38) ? (
                      <FurkaciaView
                        data={pDia?.[`tooth${tooth}`]?.furkacia_vest_st1}
                        qty={null}
                        type="oral"
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.moving')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`moving-down-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <MovingView data={pDia?.[`tooth${tooth}`]?.moving_st} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="title">{msgFormula.get('formula.teeth.status')}</td>
                {toothNumbersDown.map((tooth) => (
                  <td
                    key={`status-down-${tooth}`}
                    style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                  >
                    <span className="perio-status">
                      {pDia?.[`tooth${tooth}`]?.status
                        ? msgFormula.get(`formula.perio_${pDia[`tooth${tooth}`].status}`)
                        : msgFormula.get('formula.perio_exist')}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
