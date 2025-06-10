import React from 'react';
import FormulaView from './FormulaView/index';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../Redux/Formula/selectors';
import Statuses from './Perio/Statuses';
import MovingView from './Perio/MovingView';
import FurkaciaView from './Perio/FurkaciaView';
import BleedingView from './Perio/BleedingView';
import FertilizerView from './Perio/FertilizerView';
import DentalDepositsView from './Perio/DentalDepositsView';
import YasenKrayView from './Perio/YasenKrayView';
import DeepZondView from './Perio/DeepZoondView';
import IntersectChart1828UpView from './Perio/IntersectChart1828UpView';
import FormulaPerio1828 from './Perio/FormulaPerio1828';
import IntersectChart1828Down from './Perio/IntersectChart1828Down';
import YasenKray4838 from './Perio/YasenKray4838';
import DeepZond4838 from './Perio/DeepZoond4838';
import IntersectChart4838Up from './Perio/IntersectChart4838Up';
import FormulaPerio3848 from './Perio/FormulaPerio3848';
import IntersectChart4838Down from './Perio/IntersectChart4838Down';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';

export default function ViewPerio({ perioData }) {
  const pDia = JSON.parse(perioData.formula);
  const pValues = JSON.parse(perioData.perioValues);
  const pCharts = JSON.parse(perioData.chartsData)

  console.log('pCharts', pCharts)

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

  return (
    <div className="py-0 w-full">
      <div className="w-full scroll-x">
        <table className="table-auto perio-table">
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
                <FormulaPerio1828 />
                <div className="relative">
                  {/*<IntersectChart1828DownView />*/}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
