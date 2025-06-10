import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPerioSelector,
  getPerioStatusChangeSelector,
  perioDiagnozisSelector,
} from '../../../Redux/Formula/selectors';
import Furkacia from './Furkacia';
import FormulaPerio1828 from './FormulaPerio1828';
import FormulaPerio3848 from './FormulaPerio3848';
import DentalDeposits from './DentalDeposits';
import Fertilizer from './Fertilizer';
import Bleeding from './Bleeding';
import Moving from './Moving';
import Statuses from './Statuses';
import DeepZond1828 from './DeepZoond1828';
import YasenKray1828 from './YasenKray1828';
import DeepZond4838 from './DeepZoond4838';
import YasenKray4838 from './YasenKray4838';

import { checkAction } from '../../../Redux/Formula';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';

export default function Index() {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const perioDiagnozis = useSelector(perioDiagnozisSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  // Create an array of refs for YasenKray1828 inputs (vest and oral combined)
  const inputUp1828YasenRefs = useRef(new Array(48).fill(null)); // 48 for vest yeasen
  const inputUpZond1828Refs = useRef(new Array(48).fill(null)); // 48 for vest yeasen
  const inputDownYasen1828Refs = useRef(new Array(48).fill(null)); // 48 for vest yeasen
  const inputDownZond1828Refs = useRef(new Array(48).fill(null)); // 48 for vest yeasen

  const inputUp4838YasenRefs = useRef(new Array(48).fill(null)); // 48 for vest yeasen
  const inputUpZond4838Refs = useRef(new Array(48).fill(null)); // 48 for vest yeasen
  const inputDownYasen4838Refs = useRef(new Array(48).fill(null)); // 48 for vest yeasen
  const inputDownZond4838Refs = useRef(new Array(48).fill(null)); // 48 for vest yeasen

  useEffect(() => {
    dispatch(checkAction());
  });

  // Define tooth numbers and indices for mapping
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
    <div className="w-full scroll-x">
      <table className="table-auto perio-table">
        <tbody>
          <tr>
            <td className="title">{msgFormula.get('formula.teeth.status')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <Statuses type={'vest'} toothNum={18} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={17} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={16} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={15} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={14} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={13} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={12} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={11} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={21} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={22} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={23} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={24} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={25} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={26} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={27} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={28} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.moving')}</td>
            {toothNumbersUp.map((tooth) => (
              <td
                key={`moving-${tooth}`}
                style={tooth === 18 ? { borderLeft: 'none', borderRight: 'none' } : {}}
              >
                <Moving toothNum={tooth} />
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
                  <Furkacia toothNum={tooth} type="vest" />
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
                <Bleeding toothNum={tooth} type="vest" />
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
                <Fertilizer toothNum={tooth} type={'vest'} />
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
                <DentalDeposits toothNum={tooth} type={'vest'} />
              </td>
            ))}
          </tr>
          {/*YASEN AND ZOND UP 18-28*/}
          <tr>
            <td className="title">{msgFormula.get('formula.yasn')}</td>
            {yasenUpKrayVestIndices.map((sIndx0, i) => (
              <td
                key={`yasen-vest-${toothNumbers[i]}`}
                style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
              >
                <div className="col-xs-12 action-zone-v">
                  <YasenKray1828
                    type="vest"
                    idx={sIndx0}
                    ref={(el) => (inputUp1828YasenRefs.current[sIndx0] = el)}
                    onEnter={focusNextUp1828YasenInput}
                  />
                  <YasenKray1828
                    type="vest"
                    idx={sIndx0 + 1}
                    ref={(el) => (inputUp1828YasenRefs.current[sIndx0 + 1] = el)}
                    onEnter={focusNextUp1828YasenInput}
                  />
                  <YasenKray1828
                    type="vest"
                    idx={sIndx0 + 2}
                    ref={(el) => (inputUp1828YasenRefs.current[sIndx0 + 2] = el)}
                    onEnter={focusNextUp1828YasenInput}
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
                  <DeepZond1828
                    type="vest"
                    idx={sIndx1}
                    ref={(el) => (inputUpZond1828Refs.current[sIndx1] = el)}
                    onEnter={focusNextUp1828ZondInput}
                  />
                  <DeepZond1828
                    type="vest"
                    idx={sIndx1 + 1}
                    ref={(el) => (inputUpZond1828Refs.current[sIndx1 + 1] = el)}
                    onEnter={focusNextUp1828ZondInput}
                  />
                  <DeepZond1828
                    type="vest"
                    idx={sIndx1 + 2}
                    ref={(el) => (inputUpZond1828Refs.current[sIndx1 + 2] = el)}
                    onEnter={focusNextUp1828ZondInput}
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
                <IntersectChart1828Up />
              </div>
              <FormulaPerio1828 />
              <div className="relative">
                <IntersectChart1828Down />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={17} style={{ height: '40px' }}></td>
          </tr>
          {/*YASEN AND ZOND DOWN 18-28*/}
          <tr>
            <td className="title">{msgFormula.get('formula.zond')}</td>
            {deepUpZondVestIndices.map((sIndx2, i) => (
              <td
                key={`yasen-oral-${toothNumbers[i]}`}
                style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
              >
                <div className="col-xs-12 action-zone-v">
                  <DeepZond1828
                    type="oral"
                    idx={sIndx2}
                    ref={(el) => (inputDownZond1828Refs.current[sIndx2] = el)}
                    onEnter={focusNextDown1828ZondInput}
                  />
                  <DeepZond1828
                    type="oral"
                    idx={sIndx2 + 1}
                    ref={(el) => (inputDownZond1828Refs.current[sIndx2 + 1] = el)}
                    onEnter={focusNextDown1828ZondInput}
                  />
                  <DeepZond1828
                    type="oral"
                    idx={sIndx2 + 2}
                    ref={(el) => (inputDownZond1828Refs.current[sIndx2 + 2] = el)}
                    onEnter={focusNextDown1828ZondInput}
                  />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.yasn')}</td>
            {yasenUpKrayVestIndices.map((sIndx3, i) => (
              <td
                key={`yasen-oral-${toothNumbers[i]}`}
                style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
              >
                <div className="col-xs-12 action-zone-v">
                  <YasenKray1828
                    type="oral"
                    idx={sIndx3}
                    ref={(el) => (inputDownYasen1828Refs.current[sIndx3] = el)}
                    onEnter={focusNextDown1828YasenInput}
                  />
                  <YasenKray1828
                    type="oral"
                    idx={sIndx3 + 1}
                    ref={(el) => (inputDownYasen1828Refs.current[sIndx3 + 1] = el)}
                    onEnter={focusNextDown1828YasenInput}
                  />
                  <YasenKray1828
                    type="oral"
                    idx={sIndx3 + 2}
                    ref={(el) => (inputDownYasen1828Refs.current[sIndx3 + 2] = el)}
                    onEnter={focusNextDown1828YasenInput}
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
                <DentalDeposits toothNum={tooth} type={'oral'} />
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
                <Fertilizer toothNum={tooth} type={'oral'} />
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
                <Bleeding toothNum={tooth} type="oral" />
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
                  <Furkacia toothNum={tooth} type="oral" qty={2} />
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
                {(tooth >= 46 && tooth <= 48) || (tooth >= 46 && tooth <= 48) ? (
                  <Furkacia toothNum={tooth} type="vest" />
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
                <Bleeding toothNum={tooth} type="vest" />
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
                <Fertilizer toothNum={tooth} type={'vest'} />
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
                <DentalDeposits toothNum={tooth} type={'vest'} />
              </td>
            ))}
          </tr>
          {/*YASEN AND ZOND UP 48-38*/}
          <tr>
            <td className="title">{msgFormula.get('formula.yasn')}</td>
            {yasenUpKrayVestIndices.map((bIndx0, i) => (
              <td
                key={`yasen-vest-${toothNumbers[i]}`}
                style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
              >
                <div className="col-xs-12 action-zone-v">
                  <YasenKray4838
                    type="vest"
                    idx={bIndx0}
                    ref={(el) => (inputUp4838YasenRefs.current[bIndx0] = el)}
                    onEnter={focusNextUp4838YasenInput}
                  />
                  <YasenKray4838
                    type="vest"
                    idx={bIndx0 + 1}
                    ref={(el) => (inputUp4838YasenRefs.current[bIndx0 + 1] = el)}
                    onEnter={focusNextUp4838YasenInput}
                  />
                  <YasenKray4838
                    type="vest"
                    idx={bIndx0 + 2}
                    ref={(el) => (inputUp4838YasenRefs.current[bIndx0 + 2] = el)}
                    onEnter={focusNextUp4838YasenInput}
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
                  <DeepZond4838
                    type="vest"
                    idx={bIndx1}
                    ref={(el) => (inputUpZond4838Refs.current[bIndx1] = el)}
                    onEnter={focusNextUp4838ZondInput}
                  />
                  <DeepZond4838
                    type="vest"
                    idx={bIndx1 + 1}
                    ref={(el) => (inputUpZond4838Refs.current[bIndx1 + 1] = el)}
                    onEnter={focusNextUp4838ZondInput}
                  />
                  <DeepZond4838
                    type="vest"
                    idx={bIndx1 + 2}
                    ref={(el) => (inputUpZond4838Refs.current[bIndx1 + 2] = el)}
                    onEnter={focusNextUp4838ZondInput}
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
                />
              </div>
              <FormulaPerio3848 />
              <div className="relative">
                <IntersectChart4838DownView
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
                key={`yasen-oral-${toothNumbers[i]}`}
                style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
              >
                <div className="col-xs-12 action-zone-v">
                  <DeepZond4838
                    type="oral"
                    idx={bIndx2}
                    ref={(el) => (inputDownZond4838Refs.current[bIndx2] = el)}
                    onEnter={focusNextDown4838ZondInput}
                  />
                  <DeepZond4838
                    type="oral"
                    idx={bIndx2 + 1}
                    ref={(el) => (inputDownZond4838Refs.current[bIndx2 + 1] = el)}
                    onEnter={focusNextDown4838ZondInput}
                  />
                  <DeepZond4838
                    type="oral"
                    idx={bIndx2 + 2}
                    ref={(el) => (inputDownZond4838Refs.current[bIndx2 + 2] = el)}
                    onEnter={focusNextDown4838ZondInput}
                  />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.yasn')}</td>
            {yasenUpKrayVestIndices.map((bIndx3, i) => (
              <td
                key={`yasen-oral-${toothNumbers[i]}`}
                style={i === 0 ? { borderLeft: 'none', borderRight: 'none' } : {}}
              >
                <div className="col-xs-12 action-zone-v">
                  <YasenKray4838
                    type="oral"
                    idx={bIndx3}
                    ref={(el) => (inputDownYasen4838Refs.current[bIndx3] = el)}
                    onEnter={focusNextDown4838YasenInput}
                  />
                  <YasenKray4838
                    type="oral"
                    idx={bIndx3 + 1}
                    ref={(el) => (inputDownYasen4838Refs.current[bIndx3 + 1] = el)}
                    onEnter={focusNextDown4838YasenInput}
                  />
                  <YasenKray4838
                    type="oral"
                    idx={bIndx3 + 2}
                    ref={(el) => (inputDownYasen4838Refs.current[bIndx3 + 2] = el)}
                    onEnter={focusNextDown4838YasenInput}
                  />
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td className="title">{msgFormula.get('formula.depozit')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <DentalDeposits toothNum={48} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={47} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={46} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={45} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={44} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={43} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={42} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={41} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={31} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={32} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={33} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={34} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={35} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={36} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={37} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.fertilizer')}</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Fertilizer toothNum={48} />
            </td>
            <td>
              <Fertilizer toothNum={47} />
            </td>
            <td>
              <Fertilizer toothNum={46} />
            </td>
            <td>
              <Fertilizer toothNum={45} />
            </td>
            <td>
              <Fertilizer toothNum={44} />
            </td>
            <td>
              <Fertilizer toothNum={43} />
            </td>
            <td>
              <Fertilizer toothNum={42} />
            </td>
            <td>
              <Fertilizer toothNum={41} />
            </td>
            <td>
              <Fertilizer toothNum={31} />
            </td>
            <td>
              <Fertilizer toothNum={32} />
            </td>
            <td>
              <Fertilizer toothNum={33} />
            </td>
            <td>
              <Fertilizer toothNum={34} />
            </td>
            <td>
              <Fertilizer toothNum={35} />
            </td>
            <td>
              <Fertilizer toothNum={36} />
            </td>
            <td>
              <Fertilizer toothNum={37} />
            </td>
            <td>
              <Fertilizer toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.furkacia')}</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Furkacia toothNum={48} />
            </td>
            <td>
              <Furkacia toothNum={47} />
            </td>
            <td>
              <Furkacia toothNum={46} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.moving')}</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Moving toothNum={48} />
            </td>
            <td>
              <Moving toothNum={47} />
            </td>
            <td>
              <Moving toothNum={46} />
            </td>
            <td>
              <Moving toothNum={45} />
            </td>
            <td>
              <Moving toothNum={44} />
            </td>
            <td>
              <Moving toothNum={43} />
            </td>
            <td>
              <Moving toothNum={42} />
            </td>
            <td>
              <Moving toothNum={41} />
            </td>
            <td>
              <Moving toothNum={31} />
            </td>
            <td>
              <Moving toothNum={32} />
            </td>
            <td>
              <Moving toothNum={33} />
            </td>
            <td>
              <Moving toothNum={34} />
            </td>
            <td>
              <Moving toothNum={35} />
            </td>
            <td>
              <Moving toothNum={36} />
            </td>
            <td>
              <Moving toothNum={37} />
            </td>
            <td>
              <Moving toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.teeth.status')}</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Statuses type={'vest'} toothNum={48} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={47} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={46} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={45} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={44} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={43} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={42} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={41} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={31} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={32} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={33} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={34} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={35} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={36} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={37} />
            </td>
            <td>
              <Statuses type={'vest'} toothNum={38} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
