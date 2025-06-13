import React from 'react';
import { useSelector } from 'react-redux';
import MovingView from './PerioView/MovingView';
import FurkaciaView from './PerioView/FurkaciaView';
import BleedingView from './PerioView/BleedingView';
import FertilizerView from './PerioView/FertilizerView';
import DentalDepositsView from './PerioView/DentalDepositsView';
import YasenKrayView from './PerioView/YasenKrayView';
import DeepZondView from './PerioView/DeepZoondView';
import IntersectChart1828UpView from './PerioView/IntersectChart1828UpView';
import IntersectChart1828DownView from './PerioView/IntersectChart1828DownView'
import IntersectChart4838UpView from './PerioView/IntersectChart4838UpView'
import IntersectChart4838DownView from './PerioView/IntersectChart4838DownView'
import FormulaPerio1828View from './PerioView/FormulaPerio1828View';
import FormulaPerio4838View from './PerioView/FormulaPerio3848View';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';
import FertilizerPercentage from './FertilizerPercentage';
import BleedingPercentage from './BleedingPercentage';
import DentalDepositPercentage from './DentalDepositPercentage';
import Metrics from './Metrics';
import PeriodontalSummary from './PeriodontalSummary'
import BOPCalculator from './BOPCalculator'

export default function ViewPerio({ perioData }) {
  const pDia = JSON.parse(perioData.formula);
  const pValues = JSON.parse(perioData.perioValues);
  const pCharts = JSON.parse(perioData.chartsData)

  const appLang = useSelector(appLangSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  const toothNumbersUp = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
  ];
  const toothNumbersDown = [
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  const toothNumbers = [
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  const yasenUpKrayVestIndices = Array.from({ length: 16 }, (_, i) => i * 3); // Start indices for each tooth (0, 3, 6, ..., 45)
  const deepUpZondVestIndices = Array.from({ length: 16 }, (_, i) => i * 3); // Start indices for each tooth (0, 3, 6, ..., 45)

  const yk1828Vest = [3,6,8,8,7,4,7,8,9,null,null,null,null,null,null,null,null,null,null,null];
  const yk1828Oral = [1,2,4,3,4,3,8,4,3,null,null,null,null,null,null,null,null,null,null,null];
  const z1828Vest = [3,4,5,6,7,5,7,6,18,null,null,null,null,null,null,null,null,null,null,null];
  const z1828Oral = [12,9,8,12,11,11,8,8,9,null,null,null,null,null,null,null,null,null,null,null];

  // console.log(pDia)
  return (
    <div className="py-0 w-full">
      <div className="w-full scroll-x">
        <table className="table-auto perio-table perio-table-view">
          <tbody>
            <tr>
              <td className="title">{msgFormula.get('formula.teeth.status')}</td>
              <td style={{ borderLeft: 'none', borderRight: 'none' }}>
                <span className="perio-status">
                  {pDia.tooth18.status ? msgFormula.get(`formula.perio_${pDia.tooth18.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth17.status ? msgFormula.get(`formula.perio_${pDia.tooth17.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth16.status ? msgFormula.get(`formula.perio_${pDia.tooth16.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth15.status ? msgFormula.get(`formula.perio_${pDia.tooth15.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth14.status ? msgFormula.get(`formula.perio_${pDia.tooth14.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth13.status ? msgFormula.get(`formula.perio_${pDia.tooth13.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth12.status ? msgFormula.get(`formula.perio_${pDia.tooth12.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth11.status ? msgFormula.get(`formula.perio_${pDia.tooth11.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth21.status ? msgFormula.get(`formula.perio_${pDia.tooth21.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth22.status ? msgFormula.get(`formula.perio_${pDia.tooth22.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth23.status ? msgFormula.get(`formula.perio_${pDia.tooth23.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth24.status ? msgFormula.get(`formula.perio_${pDia.tooth24.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth25.status ? msgFormula.get(`formula.perio_${pDia.tooth25.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth26.status ? msgFormula.get(`formula.perio_${pDia.tooth26.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth27.status ? msgFormula.get(`formula.perio_${pDia.tooth27.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth28.status ? msgFormula.get(`formula.perio_${pDia.tooth28.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.moving')}</td>
              {toothNumbersUp.map((tooth) => (
                <td
                  key={`moving-${tooth}`}
                  style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <MovingView data={pDia[`tooth${tooth}`].moving_st}  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.furkacia')}</td>
              {toothNumbersUp.map((tooth) => (
                <td
                  key={`furkacia-${tooth}`}
                  style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  {(tooth >= 16 && tooth <= 18) || (tooth >= 26 && tooth <= 28) ? (
                    <FurkaciaView data={pDia[`tooth${tooth}`][`furkacia_vest_st1`]} type="vest" />
                  ) : null}
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.bleeding')}</td>
              {toothNumbersUp.map((tooth) => (
                <td
                  key={`bleeding-${tooth}`}
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
                  key={`fertilizer-${tooth}`}
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
                  key={`deposits-${tooth}`}
                  style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <DentalDepositsView data={pDia} type="vest" toothNum={tooth} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.yasn')}</td>
              {yasenUpKrayVestIndices.map((sIndx0, i) => (
                <td
                  key={`yasen-vest-${toothNumbers[i]}`}
                  style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <YasenKrayView
                      idx={sIndx0}
                      type="vest"
                      data={pValues.yk1828Vest}
                    />
                    <YasenKrayView
                      idx={sIndx0 + 1}
                      type="vest"
                      data={pValues.yk1828Vest}
                    />
                    <YasenKrayView
                      idx={sIndx0 + 2}
                      type="vest"
                      data={pValues.yk1828Vest}
                    />
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.zond')}</td>
              {deepUpZondVestIndices.map((sIndx1, i) => (
                <td
                  key={`deep-zond-${toothNumbersUp[i]}`}
                  style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <DeepZondView
                      idx={sIndx1}
                      type="vest"
                      data={pValues.z1828Vest}
                    />
                    <DeepZondView
                      idx={sIndx1 + 1}
                      type="vest"
                      data={pValues.z1828Vest}
                    />
                    <DeepZondView
                      idx={sIndx1 + 2}
                      type="vest"
                      data={pValues.z1828Vest}
                    />
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
                  width: '1050px',
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
              {deepUpZondVestIndices.map((sIndx1, i) => (
                <td
                  key={`deep-zond-${toothNumbersUp[i]}`}
                  style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <DeepZondView
                      idx={sIndx1}
                      type="vest"
                      data={pValues.z1828Oral}
                    />
                    <DeepZondView
                      idx={sIndx1 + 1}
                      type="vest"
                      data={pValues.z1828Oral}
                    />
                    <DeepZondView
                      idx={sIndx1 + 2}
                      type="vest"
                      data={pValues.z1828Oral}
                    />
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.yasn')}</td>
              {yasenUpKrayVestIndices.map((sIndx0, i) => (
                <td
                  key={`yasen-vest-${toothNumbers[i]}`}
                  style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <YasenKrayView
                      idx={sIndx0}
                      type="vest"
                      data={pValues.yk1828Oral}
                    />
                    <YasenKrayView
                      idx={sIndx0 + 1}
                      type="vest"
                      data={pValues.yk1828Oral}
                    />
                    <YasenKrayView
                      idx={sIndx0 + 2}
                      type="vest"
                      data={pValues.yk1828Oral}
                    />
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.depozit')}</td>
              {toothNumbersUp.map((tooth) => (
                <td
                  key={`deposits-${tooth}`}
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
                  key={`fertilizer-${tooth}`}
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
                  key={`bleeding-${tooth}`}
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
                  key={`furkacia-${tooth}`}
                  style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  {(tooth >= 16 && tooth <= 18) || (tooth >= 26 && tooth <= 28) ? (
                    <FurkaciaView data={pDia[`tooth${tooth}`][`furkacia_vest_st1`]} type="oral" qty={2} />
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

            {/*************************/}
            {/*************************/}
            {/*TOOTH 48-38*/}
            {/*************************/}
            {/*************************/}
            <tr>
              <td className="title">{msgFormula.get('formula.furkacia')}</td>
              {toothNumbersDown.map((tooth) => (
                <td
                  key={`furkacia-${tooth}`}
                  style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  {(tooth >= 46 && tooth <= 48) || (tooth >= 36 && tooth <= 38) ? (
                    <FurkaciaView data={pDia[`tooth${tooth}`][`furkacia_vest_st1`]} type="vest"  />
                  ) : null}
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.bleeding')}</td>
              {toothNumbersDown.map((tooth) => (
                <td
                  key={`bleeding-${tooth}`}
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
                  key={`fertilizer-${tooth}`}
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
                  key={`deposits-${tooth}`}
                  style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <DentalDepositsView data={pDia} type="vest" toothNum={tooth} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.yasn')}</td>
              {yasenUpKrayVestIndices.map((bIndx0, i) => (
                <td
                  key={`yasen-vest-${toothNumbers[i]}`}
                  style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <YasenKrayView
                      idx={bIndx0}
                      type="vest"
                      data={pValues.yk4838Vest}
                    />
                    <YasenKrayView
                      idx={bIndx0 + 1}
                      type="vest"
                      data={pValues.yk4838Vest}
                    />
                    <YasenKrayView
                      idx={bIndx0 + 2}
                      type="vest"
                      data={pValues.yk4838Vest}
                    />
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.zond')}</td>
              {deepUpZondVestIndices.map((bIndx1, i) => (
                <td
                  key={`deep-zond-${toothNumbersUp[i]}`}
                  style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <DeepZondView
                      idx={bIndx1}
                      type="vest"
                      data={pValues.z4838Oral}
                    />
                    <DeepZondView
                      idx={bIndx1 + 1}
                      type="vest"
                      data={pValues.z4838Oral}
                    />
                    <DeepZondView
                      idx={bIndx1 + 2}
                      type="vest"
                      data={pValues.z4838Oral}
                    />
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
                  width: '1024px',
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
              {deepUpZondVestIndices.map((bIndx2, i) => (
                <td
                  key={`deep-zond-${toothNumbersUp[i]}`}
                  style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <DeepZondView
                      idx={bIndx2}
                      type="oral"
                      data={pValues.z4838Oral}
                    />
                    <DeepZondView
                      idx={bIndx2 + 1}
                      type="oral"
                      data={pValues.z4838Oral}
                    />
                    <DeepZondView
                      idx={bIndx2 + 2}
                      type="oral"
                      data={pValues.z4838Oral}
                    />
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.yasn')}</td>
              {yasenUpKrayVestIndices.map((bIndx3, i) => (
                <td
                  key={`yasen-vest-${toothNumbers[i]}`}
                  style={i === 1 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <div className="col-xs-12 action-zone-v">
                    <YasenKrayView
                      idx={bIndx3}
                      type="oral"
                      data={pValues.yk4838Vest}
                    />
                    <YasenKrayView
                      idx={bIndx3 + 1}
                      type="oral"
                      data={pValues.yk4838Vest}
                    />
                    <YasenKrayView
                      idx={bIndx3 + 2}
                      type="oral"
                      data={pValues.yk4838Vest}
                    />
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.depozit')}</td>
              {toothNumbersDown.map((tooth) => (
                <td
                  key={`deposits-${tooth}`}
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
                  key={`fertilizer-${tooth}`}
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
                  key={`bleeding-${tooth}`}
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
                  key={`furkacia-${tooth}`}
                  style={tooth === 48 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  {(tooth >= 46 && tooth <= 48) || (tooth >= 36 && tooth <= 38) ? (
                    <FurkaciaView data={pDia[`tooth${tooth}`][`furkacia_vest_st1`]} type="oral"  />
                  ) : null}
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.moving')}</td>
              {toothNumbersDown.map((tooth) => (
                <td
                  key={`moving-${tooth}`}
                  style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
                >
                  <MovingView data={pDia[`tooth${tooth}`].moving_st}  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">{msgFormula.get('formula.teeth.status')}</td>
              <td style={{ borderLeft: 'none', borderRight: 'none' }}>
                <span className="perio-status">
                  {pDia.tooth48.status ? msgFormula.get(`formula.perio_${pDia.tooth48.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth47.status ? msgFormula.get(`formula.perio_${pDia.tooth47.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth46.status ? msgFormula.get(`formula.perio_${pDia.tooth46.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth45.status ? msgFormula.get(`formula.perio_${pDia.tooth45.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth44.status ? msgFormula.get(`formula.perio_${pDia.tooth44.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth43.status ? msgFormula.get(`formula.perio_${pDia.tooth43.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth42.status ? msgFormula.get(`formula.perio_${pDia.tooth42.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth41.status ? msgFormula.get(`formula.perio_${pDia.tooth41.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth31.status ? msgFormula.get(`formula.perio_${pDia.tooth31.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth32.status ? msgFormula.get(`formula.perio_${pDia.tooth32.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth33.status ? msgFormula.get(`formula.perio_${pDia.tooth33.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth34.status ? msgFormula.get(`formula.perio_${pDia.tooth34.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth35.status ? msgFormula.get(`formula.perio_${pDia.tooth35.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth36.status ? msgFormula.get(`formula.perio_${pDia.tooth36.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth37.status ? msgFormula.get(`formula.perio_${pDia.tooth37.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
              <td>
                <span className="perio-status">
                  {pDia.tooth38.status ? msgFormula.get(`formula.perio_${pDia.tooth38.status}`) : msgFormula.get('formula.perio_exist')}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="description-perio">
          <PeriodontalSummary data={pDia} />
          <Metrics
            ykVest={pValues.yk1828Vest}
            zVest={pValues.z1828Vest}
            ykOral={pValues.yk1828Oral}
            zOral={pValues.z1828Oral}
            calCorrectionMm={0.235} // +0.235 мм, щоб отримати -0.30 см
          />
        </div>


      </div>
    </div>
  );
}
