import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setToothDiagnoze,
  setSelectedToothNumber,
  setChangeDia,
} from '../../../Redux/Formula';
import {
  getDiagnosisSelector,
  getSealColor1Selector,
  getSealColor2Selector,
  getSealColor3Selector,
  getSubDiagnosisSelector,
  getTeethDiagnozisSelector,
  getSealServicalColorSelector,
  getVinirColorSelector,
  getCeramicCrownColorSelector,
  getCeramicMCrownColorSelector,
  getMetalicCrownColorSelector,
  getZirconiaCrownColorSelector,
  teethTypeSelector,
  getActiveToothNumberSelector,
  allTeethChildSelector,
} from '../../../Redux/Formula/selectors';
import PeriodontitStage65 from './periodontit65';
import setupDiagnoze from '../../../lib/tfunctions';

export default function tooth65() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth65Diagnozis = teethDiagnozis.tooth65;
  const sealColor1 = useSelector(getSealColor1Selector);
  const sealColor2 = useSelector(getSealColor2Selector);
  const sealColor3 = useSelector(getSealColor3Selector);
  const wsDefectColor = useSelector(getSealServicalColorSelector);
  const vinirColor = useSelector(getVinirColorSelector);
  const ceramicCrownColor = useSelector(getCeramicCrownColorSelector);
  const mceramicCrownColor = useSelector(getCeramicMCrownColorSelector);
  const metalicCrownColor = useSelector(getMetalicCrownColorSelector);
  const zirconiaCrownColor = useSelector(getZirconiaCrownColorSelector);
  const teethType = useSelector(teethTypeSelector);
  const selectedTooth = useSelector(getActiveToothNumberSelector);
  const allTeeth = useSelector(allTeethChildSelector);

  const setColordedPart = (diagnozis, toothPart = '') => {
    if (diagnozis === 'caries') {
      if (toothPart === 'bottom') {
        teethDiagnozis.tooth65.caries_bottom =
          !teethDiagnozis.tooth65.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth65.caries_center =
          !teethDiagnozis.tooth65.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth65.caries_left =
          !teethDiagnozis.tooth65.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth65.caries_right =
          !teethDiagnozis.tooth65.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth65.caries_top = !teethDiagnozis.tooth65.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth65.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth65.seal_center_color = sealColor1;
          teethDiagnozis.tooth65.seal_center = true;
        } else if (
          teethDiagnozis.tooth65.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth65.seal_center_color = sealColor2;
          teethDiagnozis.tooth65.seal_center = true;
        } else if (
          teethDiagnozis.tooth65.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth65.seal_center_color = sealColor3;
          teethDiagnozis.tooth65.seal_center = true;
        } else {
          teethDiagnozis.tooth65.seal_center =
            !teethDiagnozis.tooth65.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth65.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth65.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth65.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth65.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth65.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth65.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth65.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth65.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth65.seal_bottom = true;
        } else {
          teethDiagnozis.tooth65.seal_bottom =
            !teethDiagnozis.tooth65.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth65.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth65.seal_left_color = sealColor1;
          teethDiagnozis.tooth65.seal_left = true;
        } else if (
          teethDiagnozis.tooth65.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth65.seal_left_color = sealColor2;
          teethDiagnozis.tooth65.seal_left = true;
        } else if (
          teethDiagnozis.tooth65.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth65.seal_left_color = sealColor3;
          teethDiagnozis.tooth65.seal_left = true;
        } else {
          teethDiagnozis.tooth65.seal_left = !teethDiagnozis.tooth65.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth65.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth65.seal_right_color = sealColor1;
          teethDiagnozis.tooth65.seal_right = true;
        } else if (
          teethDiagnozis.tooth65.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth65.seal_right_color = sealColor2;
          teethDiagnozis.tooth65.seal_right = true;
        } else if (
          teethDiagnozis.tooth65.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth65.seal_right_color = sealColor3;
          teethDiagnozis.tooth65.seal_right = true;
        } else {
          teethDiagnozis.tooth65.seal_right =
            !teethDiagnozis.tooth65.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth65.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth65.seal_top_color = sealColor1;
          teethDiagnozis.tooth65.seal_top = true;
        } else if (
          teethDiagnozis.tooth65.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth65.seal_top_color = sealColor2;
          teethDiagnozis.tooth65.seal_top = true;
        } else if (
          teethDiagnozis.tooth65.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth65.seal_top_color = sealColor3;
          teethDiagnozis.tooth65.seal_top = true;
        } else {
          teethDiagnozis.tooth65.seal_top = !teethDiagnozis.tooth65.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth65.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth65.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth65.wedge_shaped_defect_color =
          !teethDiagnozis.tooth65.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over') {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth65.show &&
        !teethDiagnozis.tooth25.show
      ) {
        document.getElementById('TH-65').classList.add('f-tooth-active');
        document.getElementById('TH-65').style.opacity = '1';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth65.show &&
        teethDiagnozis.tooth25.show
      ) {
        document.getElementById('TH-65').classList.add('f-tooth-active');
        document.getElementById('TH-25').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-65').classList.remove('f-tooth-active');
        document.getElementById('TH-25').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave') {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth65.show &&
        !teethDiagnozis.tooth25.show
      ) {
        document.getElementById('TH-65').classList.remove('f-tooth-active');
        document.getElementById('TH-65').style.opacity = '0';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth65.show &&
        teethDiagnozis.tooth25.show
      ) {
        document.getElementById('TH-65').classList.remove('f-tooth-active');
        document.getElementById('TH-25').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over') {
      if (teethType === 'child' && teethDiagnozis.tooth25.show) {
        document.getElementById('TH-65').classList.add('f-tooth-active');
        document.getElementById('TH-25').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth65.show) {
        document.getElementById('TH-65').classList.remove('f-tooth-active');
        document.getElementById('TH-25').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave') {
      if (teethType === 'child' && teethDiagnozis.tooth25.show) {
        document.getElementById('TH-25').classList.add('f-tooth-active');
        document.getElementById('TH-65').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="65"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1425 716)"
          className={`st3 st4 st5 ${selectedTooth === 65 ? 'num-active' : ''}`}
        >
          65
        </text>
      </g>
      <g
        id="TH-65"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth65.show || allTeeth) && !teethDiagnozis.tooth65.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          teethDiagnozis.tooth65.show = !teethDiagnozis.tooth65.show;
          teethDiagnozis.tooth25.show = false;

          dispatch(setSelectedToothNumber(65));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              65,
              diagnozis,
              subDiagnozis,
              teethDiagnozis,
              dispatch,
              vinirColor,
              ceramicCrownColor,
              mceramicCrownColor,
              metalicCrownColor,
              zirconiaCrownColor,
              wsDefectColor
            );
            dispatch(setToothDiagnoze(tDiaData));
          }
          dispatch(setToothDiagnoze(teethDiagnozis));
        }}
      >
        <g
          onMouseOver={() => {
            showHideOverlay('over');
          }}
          onMouseLeave={() => {
            showHideOverlay('leave');
          }}
          className={`underlay ${selectedTooth === 65 ? 'selected' : ''}`}
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          <path
            className="st40"
            d="M1426,248.9c0,0-7,25-11,48s-11,92-12,105s-0.3,37.5-0.2,49.7
                        s6.2,31.3,11.2,43.3s8,25,0,39s-12.9,31.5-10.4,58.2c2.4,26.8,2.4,107.8,8.4,122.8s19,25,38,22s30-13,32-38s10.5-92,9-112
                        c-3-40-17-52-16-74c1.3-28,15-31,15-59c0-14-4-44-6-59s-9-57-10-68s-4-67-5-80s0-32-16-34S1429,238.9,1426,248.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55,  -222, 31)',
          }}
          onMouseOver={() => {
            showHideOverlay('over');
          }}
          onMouseLeave={() => {
            showHideOverlay('leave');
          }}
        >
          {/* CHANGE COLOR/APEX/CULTTAB */}
          <g className="dentin">
            <g
              className={`d-ch-color`}
              style={{
                visibility:
                  !tooth65Diagnozis.culttab &&
                  !tooth65Diagnozis.implant &&
                  !tooth65Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth65Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth65Diagnozis?.apex ? 'apex' : ''}`}
                d="M1762.6,607c-1-3.9-3.3-7.6-4.4-11.5c-2.8-9.6,1.1-20.5-5.2-29.3
                                c-4.8-6.8-13.7-10.4-23.8-11.8c-9.5-1.3-19.3-0.5-28.9-1.7c-6.1-0.8-12.2-2.2-18.2-2.6c-6.4-0.5-12.7,0.2-18.4,1.8
                                c-3.9,1.1-7.6,2.7-10.8,4.9c-5.4,3.8-8.4,9.1-9.5,14.6c-1.3,6.4-0.1,12.9,2.5,19.1c3.8,9.3,10.5,17.8,15.1,26.9
                                c2.8,5.6,4.9,11.5,9.5,16.5c4,4.4,9.9,7.8,16.8,8.7c5.1,0.7,10.3,0,15.5-0.5c6.5-0.6,13-0.7,19.5-1.1c5.7-0.3,11.4-0.8,16.7-2.4
                                C1755.8,633.9,1766.2,620.7,1762.6,607z"
              />
            </g>
            <g
              className="hIntact hImplant hEmpty"
              style={{ visibility: 'hidden' }}
            >
              <path
                className={`st24 ${tooth65Diagnozis.apex ? 'apex' : ''}`}
                d="M1762.6 606.999C1761.6 603.099 1759.3 599.399 1758.2 595.499C1755.4 585.899 1759.3 574.999 1753 566.199C1748.2 559.399 1739.3 555.799 1729.2 554.399C1719.7 553.099 1709.9 553.899 1700.3 552.699C1694.2 551.899 1688.1 550.499 1682.1 550.099C1675.7 549.599 1669.4 550.299 1663.7 551.899C1659.8 552.999 1656.1 554.599 1652.9 556.799C1647.5 560.599 1644.5 565.899 1643.4 571.399C1642.1 577.799 1643.3 584.299 1645.9 590.499C1649.7 599.799 1656.4 608.299 1661 617.399C1663.8 622.999 1665.9 628.899 1670.5 633.899C1674.5 638.299 1680.4 641.699 1687.3 642.599C1692.4 643.299 1697.6 642.599 1702.8 642.099C1709.3 641.499 1715.8 641.399 1722.3 640.999C1728 640.699 1733.7 640.199 1739 638.599C1755.8 633.899 1766.2 620.699 1762.6 606.999Z"
                style={{ fill: 'rgb(248, 223, 168)' }}
              ></path>
              <path
                className={`st24 ${tooth65Diagnozis.apex ? 'apex' : ''}`}
                d="M1733.38 595.522C1732.45 610.7 1725.5 618.5 1717.5 618.5C1707 618.5 1674 606.5 1674 591C1674 584 1677.08 579.022 1701.38 579.022C1725.69 579.022 1734.32 580.345 1733.38 595.522Z"
                style={{ fill: 'rgb(248, 223, 168)' }}
              ></path>
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g
            className="pulp"
            style={{
              visibility:
                tooth65Diagnozis.apex || tooth65Diagnozis.pulpit
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="hIntact hEmpty hImplant pulpitis-pfilling"
              style={{
                visibility:
                  tooth65Diagnozis.apex || tooth65Diagnozis.pulpit
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <ellipse
                className="st22 target"
                cx="1682.1"
                cy="591.727"
                rx="8.62899"
                ry="5.75303"
                transform="rotate(-90.9902 1682.1 591.727)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                cx="1724.62"
                cy="590.464"
                rx="7.75725"
                ry="7.03431"
                transform="rotate(-130.036 1724.62 590.464)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                cx="1716.78"
                cy="609.499"
                rx="8.72166"
                ry="7.94529"
                transform="rotate(-3.74907 1716.78 609.499)"
                style={{ fill: '#e80808' }}
              ></ellipse>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth65Diagnozis.implant || tooth65Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1706.5" cy="597.5" r="26.5"></circle>
            <g className="st27">
              <mask id="implant_65" className="st49">
                <path
                  className="st50"
                  d="M1692.9 581.474L1689.46 580.352C1686.53 583.3 1684.35 586.994 1683.23 591.124L1685.93 593.55C1685.69 594.829 1685.56 596.15 1685.56 597.5C1685.56 598.85 1685.69 600.17 1685.93 601.45L1683.23 603.875C1684.35 608.006 1686.53 611.7 1689.46 614.648L1692.9 613.525C1694.9 615.242 1697.21 616.594 1699.74 617.478L1700.49 621.024C1702.48 621.548 1704.56 621.827 1706.71 621.827C1708.86 621.827 1710.95 621.548 1712.94 621.024L1713.69 617.477C1716.22 616.593 1718.53 615.241 1720.52 613.525L1723.97 614.647C1726.9 611.699 1729.08 608.004 1730.2 603.874L1727.5 601.448C1727.74 600.169 1727.87 598.849 1727.87 597.5C1727.87 596.15 1727.74 594.831 1727.5 593.552L1730.2 591.126C1729.08 586.995 1726.9 583.301 1723.97 580.352L1720.52 581.475C1718.53 579.758 1716.22 578.406 1713.69 577.522L1712.94 573.976C1710.95 573.452 1708.86 573.173 1706.71 573.173C1704.56 573.173 1702.48 573.452 1700.49 573.975L1699.74 577.521C1697.21 578.405 1694.9 579.758 1692.9 581.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1692.9 581.474L1689.46 580.352C1686.53 583.3 1684.35 586.994 1683.23 591.124L1685.93 593.55C1685.69 594.829 1685.56 596.15 1685.56 597.5C1685.56 598.85 1685.69 600.17 1685.93 601.45L1683.23 603.875C1684.35 608.006 1686.53 611.7 1689.46 614.648L1692.9 613.525C1694.9 615.242 1697.21 616.594 1699.74 617.478L1700.49 621.024C1702.48 621.548 1704.56 621.827 1706.71 621.827C1708.86 621.827 1710.95 621.548 1712.94 621.024L1713.69 617.477C1716.22 616.593 1718.53 615.241 1720.52 613.525L1723.97 614.647C1726.9 611.699 1729.08 608.004 1730.2 603.874L1727.5 601.448C1727.74 600.169 1727.87 598.849 1727.87 597.5C1727.87 596.15 1727.74 594.831 1727.5 593.552L1730.2 591.126C1729.08 586.995 1726.9 583.301 1723.97 580.352L1720.52 581.475C1718.53 579.758 1716.22 578.406 1713.69 577.522L1712.94 573.976C1710.95 573.452 1708.86 573.173 1706.71 573.173C1704.56 573.173 1702.48 573.452 1700.49 573.975L1699.74 577.521C1697.21 578.405 1694.9 579.758 1692.9 581.474Z"
              ></path>
              <path
                className="st52"
                d="M1689.46 580.352L1690.08 578.45L1688.91 578.069L1688.04 578.942L1689.46 580.352ZM1692.9 581.474L1692.29 583.376L1693.36 583.725L1694.21 582.989L1692.9 581.474ZM1683.23 591.124L1681.3 590.601L1680.98 591.789L1681.89 592.611L1683.23 591.124ZM1685.93 593.55L1687.89 593.921L1688.1 592.815L1687.27 592.063L1685.93 593.55ZM1685.93 601.45L1687.27 602.937L1688.1 602.184L1687.89 601.079L1685.93 601.45ZM1683.23 603.875L1681.89 602.388L1680.98 603.211L1681.3 604.398L1683.23 603.875ZM1689.46 614.648L1688.04 616.057L1688.91 616.93L1690.08 616.549L1689.46 614.648ZM1692.9 613.525L1694.21 612.011L1693.36 611.275L1692.29 611.624L1692.9 613.525ZM1699.74 617.478L1701.7 617.063L1701.47 615.961L1700.4 615.59L1699.74 617.478ZM1700.49 621.024L1698.54 621.439L1698.79 622.644L1699.98 622.958L1700.49 621.024ZM1712.94 621.024L1713.45 622.958L1714.64 622.643L1714.89 621.438L1712.94 621.024ZM1713.69 617.477L1713.03 615.589L1711.96 615.96L1711.73 617.063L1713.69 617.477ZM1720.52 613.525L1721.14 611.623L1720.07 611.274L1719.22 612.01L1720.52 613.525ZM1723.97 614.647L1723.35 616.549L1724.52 616.93L1725.39 616.057L1723.97 614.647ZM1730.2 603.874L1732.13 604.396L1732.45 603.209L1731.53 602.386L1730.2 603.874ZM1727.5 601.448L1725.53 601.077L1725.33 602.183L1726.16 602.935L1727.5 601.448ZM1727.5 593.552L1726.16 592.064L1725.33 592.817L1725.53 593.923L1727.5 593.552ZM1730.2 591.126L1731.53 592.613L1732.45 591.791L1732.13 590.603L1730.2 591.126ZM1723.97 580.352L1725.39 578.943L1724.52 578.07L1723.35 578.451L1723.97 580.352ZM1720.52 581.475L1719.22 582.989L1720.07 583.726L1721.14 583.376L1720.52 581.475ZM1713.69 577.522L1711.73 577.937L1711.96 579.039L1713.03 579.411L1713.69 577.522ZM1712.94 573.976L1714.89 573.561L1714.64 572.356L1713.45 572.042L1712.94 573.976ZM1700.49 573.975L1699.98 572.041L1698.79 572.355L1698.54 573.561L1700.49 573.975ZM1699.74 577.521L1700.4 579.41L1701.47 579.039L1701.7 577.936L1699.74 577.521ZM1688.84 582.254L1692.29 583.376L1693.52 579.573L1690.08 578.45L1688.84 582.254ZM1685.16 591.647C1686.19 587.86 1688.19 584.469 1690.88 581.762L1688.04 578.942C1684.87 582.13 1682.51 586.128 1681.3 590.601L1685.16 591.647ZM1687.27 592.063L1684.57 589.637L1681.89 592.611L1684.59 595.037L1687.27 592.063ZM1687.56 597.5C1687.56 596.275 1687.67 595.079 1687.89 593.921L1683.96 593.179C1683.7 594.58 1683.56 596.025 1683.56 597.5H1687.56ZM1687.89 601.079C1687.67 599.921 1687.56 598.725 1687.56 597.5H1683.56C1683.56 598.975 1683.7 600.42 1683.96 601.821L1687.89 601.079ZM1684.57 605.362L1687.27 602.937L1684.59 599.963L1681.89 602.388L1684.57 605.362ZM1690.88 613.238C1688.19 610.53 1686.19 607.14 1685.16 603.352L1681.3 604.398C1682.51 608.872 1684.87 612.869 1688.04 616.057L1690.88 613.238ZM1692.29 611.624L1688.84 612.746L1690.08 616.549L1693.52 615.427L1692.29 611.624ZM1700.4 615.59C1698.11 614.79 1696.01 613.566 1694.21 612.011L1691.6 615.04C1693.78 616.918 1696.31 618.398 1699.08 619.366L1700.4 615.59ZM1702.45 620.61L1701.7 617.063L1697.79 617.893L1698.54 621.439L1702.45 620.61ZM1706.71 619.827C1704.74 619.827 1702.82 619.57 1701 619.09L1699.98 622.958C1702.13 623.525 1704.39 623.827 1706.71 623.827V619.827ZM1712.43 619.09C1710.6 619.57 1708.69 619.827 1706.71 619.827V623.827C1709.04 623.827 1711.29 623.525 1713.45 622.958L1712.43 619.09ZM1711.73 617.063L1710.98 620.609L1714.89 621.438L1715.64 617.892L1711.73 617.063ZM1719.22 612.01C1717.41 613.565 1715.32 614.789 1713.03 615.589L1714.35 619.365C1717.12 618.397 1719.65 616.917 1721.83 615.039L1719.22 612.01ZM1724.59 612.745L1721.14 611.623L1719.9 615.426L1723.35 616.549L1724.59 612.745ZM1728.27 603.351C1727.24 607.139 1725.24 610.53 1722.55 613.237L1725.39 616.057C1728.56 612.868 1730.92 608.87 1732.13 604.396L1728.27 603.351ZM1726.16 602.935L1728.86 605.361L1731.53 602.386L1728.84 599.961L1726.16 602.935ZM1725.87 597.5C1725.87 598.724 1725.75 599.92 1725.53 601.077L1729.47 601.819C1729.73 600.418 1729.87 598.974 1729.87 597.5H1725.87ZM1725.53 593.923C1725.75 595.08 1725.87 596.276 1725.87 597.5H1729.87C1729.87 596.025 1729.73 594.581 1729.47 593.18L1725.53 593.923ZM1728.86 589.639L1726.16 592.064L1728.84 595.039L1731.53 592.613L1728.86 589.639ZM1722.55 581.762C1725.24 584.47 1727.24 587.861 1728.27 591.649L1732.13 590.603C1730.92 586.129 1728.56 582.131 1725.39 578.943L1722.55 581.762ZM1721.14 583.376L1724.59 582.254L1723.35 578.451L1719.9 579.573L1721.14 583.376ZM1713.03 579.411C1715.32 580.21 1717.41 581.434 1719.22 582.989L1721.83 579.96C1719.65 578.083 1717.12 576.602 1714.35 575.634L1713.03 579.411ZM1710.98 574.39L1711.73 577.937L1715.64 577.108L1714.89 573.561L1710.98 574.39ZM1706.71 575.173C1708.69 575.173 1710.6 575.429 1712.43 575.91L1713.45 572.042C1711.29 571.475 1709.04 571.173 1706.71 571.173V575.173ZM1701 575.909C1702.82 575.429 1704.74 575.173 1706.71 575.173V571.173C1704.39 571.173 1702.13 571.474 1699.98 572.041L1701 575.909ZM1701.7 577.936L1702.45 574.39L1698.54 573.561L1697.79 577.107L1701.7 577.936ZM1694.21 582.989C1696.01 581.433 1698.11 580.209 1700.4 579.41L1699.08 575.633C1696.31 576.601 1693.78 578.082 1691.6 579.96L1694.21 582.989Z"
                mask="url(#implant_65)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle
              className="st44"
              r="28.5"
              transform="matrix(-1 0 0 1 1706.5 597.5)"
            ></circle>
            <path
              className="st45"
              d="M1708.42 588.739C1707.87 586.804 1705.13 586.804 1704.58 588.739L1704.07 590.511C1703.77 591.549 1702.71 592.164 1701.66 591.902L1699.87 591.454C1697.92 590.965 1696.55 593.339 1697.95 594.785L1699.23 596.109C1699.98 596.884 1699.98 598.116 1699.23 598.891L1697.95 600.215C1696.55 601.661 1697.92 604.035 1699.87 603.546L1701.66 603.098C1702.71 602.836 1703.77 603.451 1704.07 604.489L1704.58 606.261C1705.13 608.196 1707.87 608.196 1708.42 606.261L1708.93 604.489C1709.23 603.451 1710.29 602.836 1711.34 603.098L1713.13 603.546C1715.08 604.035 1716.45 601.661 1715.05 600.215L1713.77 598.891C1713.02 598.116 1713.02 596.884 1713.77 596.109L1715.05 594.785C1716.45 593.339 1715.08 590.965 1713.13 591.454L1711.34 591.902C1710.29 592.164 1709.23 591.549 1708.93 590.511L1708.42 588.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth65Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth65Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1762.52 607C1761.52 603.1 1759.22 599.4 1758.12 595.5C1755.32 585.9 1759.22 575 1752.92 566.2C1748.12 559.4 1739.22 555.8 1729.12 554.4C1719.62 553.1 1709.82 553.9 1700.22 552.7C1694.12 551.9 1688.02 550.499 1682.02 550.099C1675.62 549.599 1669.32 550.3 1663.62 551.9C1659.72 553 1656.02 554.6 1652.82 556.8C1647.42 560.6 1644.42 565.9 1643.32 571.4C1642.02 577.8 1643.22 584.3 1645.82 590.5C1649.62 599.8 1656.32 608.3 1660.92 617.4C1663.72 623 1665.82 628.9 1670.42 633.9C1674.42 638.3 1680.32 641.699 1687.22 642.599C1692.32 643.299 1697.52 642.599 1702.72 642.099C1709.22 641.499 1715.72 641.4 1722.22 641C1727.92 640.7 1733.62 640.199 1738.92 638.599C1755.72 633.899 1766.12 620.7 1762.52 607Z"
            ></path>
            <path
              className="st47"
              d="M1745.51 604.127C1744.79 601.316 1743.15 598.649 1742.37 595.838C1740.37 588.919 1743.15 581.062 1738.65 574.719C1735.23 569.818 1728.87 567.223 1721.66 566.214C1714.88 565.277 1707.88 565.854 1701.02 564.989C1696.67 564.412 1692.31 563.403 1688.03 563.115C1683.46 562.754 1678.96 563.259 1674.89 564.412C1672.1 565.205 1669.46 566.358 1667.18 567.944C1663.32 570.683 1661.18 574.503 1660.39 578.467C1659.47 583.08 1660.32 587.765 1662.18 592.234C1664.89 598.938 1669.68 605.064 1672.96 611.623C1674.96 615.66 1676.46 619.912 1679.74 623.516C1682.6 626.688 1686.81 629.139 1691.74 629.787C1695.38 630.292 1699.1 629.787 1702.81 629.427C1707.45 628.994 1712.09 628.922 1716.73 628.634C1720.8 628.418 1724.87 628.057 1728.66 626.904C1740.65 623.516 1748.08 614.002 1745.51 604.127Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1706.02 598)"
            ></circle>
          </g>
          {/* PIN */}
          <g
            className="abutment"
            style={{
              visibility: 'inherit',
              opacity: tooth65Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1762.52 607C1761.52 603.1 1759.22 599.401 1758.12 595.5C1755.32 585.9 1759.22 575.001 1752.92 566.201C1748.12 559.401 1739.22 555.801 1729.12 554.401C1719.62 553.101 1709.82 553.901 1700.22 552.701C1694.12 551.901 1688.02 550.5 1682.02 550.1C1675.62 549.6 1669.32 550.301 1663.62 551.901C1659.72 553.001 1656.02 554.6 1652.82 556.8C1647.42 560.6 1644.42 565.901 1643.32 571.401C1642.02 577.801 1643.22 584.3 1645.82 590.5C1649.62 599.8 1656.32 608.301 1660.92 617.401C1663.72 623.001 1665.82 628.901 1670.42 633.901C1674.42 638.301 1680.32 641.7 1687.22 642.6C1692.32 643.3 1697.52 642.6 1702.72 642.1C1709.22 641.5 1715.72 641.4 1722.22 641C1727.92 640.7 1733.62 640.2 1738.92 638.6C1755.72 633.9 1766.12 620.701 1762.52 607Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1745.51 604.127C1744.8 601.316 1743.15 598.649 1742.37 595.838C1740.37 588.919 1743.15 581.062 1738.65 574.719C1735.23 569.818 1728.87 567.223 1721.66 566.214C1714.88 565.277 1707.88 565.854 1701.02 564.989C1696.67 564.412 1692.31 563.403 1688.03 563.115C1683.46 562.754 1678.96 563.259 1674.89 564.412C1672.1 565.205 1669.46 566.358 1667.18 567.944C1663.32 570.683 1661.18 574.503 1660.39 578.467C1659.47 583.08 1660.32 587.765 1662.18 592.234C1664.89 598.938 1669.68 605.064 1672.96 611.623C1674.96 615.66 1676.46 619.912 1679.75 623.516C1682.6 626.688 1686.81 629.139 1691.74 629.787C1695.38 630.292 1699.1 629.787 1702.81 629.427C1707.45 628.994 1712.09 628.922 1716.73 628.634C1720.8 628.418 1724.87 628.057 1728.66 626.904C1740.65 623.516 1748.08 614.002 1745.51 604.127Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1706.02 598)"
            ></circle>
          </g>
          <g className="stump" style={{ visibility: 'hidden', opacity: 0 }}>
            <path
              className="st47"
              d="M1762.52 607C1761.52 603.1 1759.22 599.4 1758.12 595.5C1755.32 585.9 1759.22 575 1752.92 566.2C1748.12 559.4 1739.22 555.8 1729.12 554.4C1719.62 553.1 1709.82 553.9 1700.22 552.7C1694.12 551.9 1688.02 550.499 1682.02 550.099C1675.62 549.599 1669.32 550.3 1663.62 551.9C1659.72 553 1656.02 554.6 1652.82 556.8C1647.42 560.6 1644.42 565.9 1643.32 571.4C1642.02 577.8 1643.22 584.3 1645.82 590.5C1649.62 599.8 1656.32 608.3 1660.92 617.4C1663.72 623 1665.82 628.9 1670.42 633.9C1674.42 638.3 1680.32 641.699 1687.22 642.599C1692.32 643.299 1697.52 642.599 1702.72 642.099C1709.22 641.499 1715.72 641.4 1722.22 641C1727.92 640.7 1733.62 640.199 1738.92 638.599C1755.72 633.899 1766.12 620.7 1762.52 607Z"
            ></path>
            <path
              className="st47"
              d="M1745.51 604.127C1744.79 601.316 1743.15 598.649 1742.37 595.838C1740.37 588.919 1743.15 581.062 1738.65 574.719C1735.23 569.818 1728.87 567.223 1721.66 566.214C1714.88 565.277 1707.88 565.854 1701.02 564.989C1696.67 564.412 1692.31 563.403 1688.03 563.115C1683.46 562.754 1678.96 563.259 1674.89 564.412C1672.1 565.205 1669.46 566.358 1667.18 567.944C1663.32 570.683 1661.18 574.503 1660.39 578.467C1659.47 583.08 1660.32 587.765 1662.18 592.234C1664.89 598.938 1669.68 605.064 1672.96 611.623C1674.96 615.66 1676.46 619.912 1679.74 623.516C1682.6 626.688 1686.81 629.139 1691.74 629.787C1695.38 630.292 1699.1 629.787 1702.81 629.427C1707.45 628.994 1712.09 628.922 1716.73 628.634C1720.8 628.418 1724.87 628.057 1728.66 626.904C1740.65 623.516 1748.08 614.002 1745.51 604.127Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth65Diagnozis.culttab &&
                !tooth65Diagnozis.abutment &&
                !tooth65Diagnozis.implant &&
                !tooth65Diagnozis.apex &&
                !tooth65Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1771.1,609.2c-1.2-5.5-3.7-10.6-5-16.1c-3.2-13.5,1.4-28.7-5.7-41.1
                            c-0.1-0.3-0.3-0.5-0.5-0.8c-5.6-9-15.6-13.8-26.8-15.6c-10.9-1.8-22.2-0.6-33.3-2.2c-7-1-14-2.9-21-3.5
                            c-7.3-0.6-14.6,0.4-21.3,2.7c-4.6,1.6-8.8,3.8-12.5,7c-5.3,4.5-8.6,10.6-10.4,17.1c-0.3,1.2-0.6,2.4-0.8,3.5
                            c-1.6,9-0.2,18.1,2.7,26.8c4.3,13,11.9,24.9,17.2,37.6c2.1,5.2,3.9,10.5,6.3,15.5c1.3,2.6,2.7,5.2,4.5,7.6
                            c4.6,6.1,11.3,10.8,19.2,12.1c5.9,1,11.9-0.1,17.9-0.8c7.5-0.9,15-1.2,22.5-1.8c6.6-0.5,13.1-1.3,19.3-3.4
                            c8.1-2.8,14.8-7.6,19.8-13.6C1770.2,631.6,1773.4,620.5,1771.1,609.2z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth65.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1772.25 611.115C1771.08 605.16 1771.38 600.51 1770.1 594.555C1769.39 591.383 1769.05 587.118 1768.87 583.813C1768.67 580.124 1769.77 576.385 1769.71 572.669C1769.65 568.703 1768.42 564.763 1767.86 560.938C1767.24 556.717 1765.19 551.636 1763.09 547.814C1761.32 544.544 1757.99 541.759 1755.38 539.41C1752.67 536.975 1748.56 534.836 1745.17 533.288C1743.51 532.53 1741.78 532.105 1740 531.798C1737.79 531.418 1735.5 532.394 1733.15 531.969C1729.5 531.318 1725.81 528.666 1722.11 528.484C1720.12 528.386 1718.13 527.42 1716.14 527.64C1713.97 527.879 1711.8 529.307 1709.63 529.202C1706.18 529.033 1702.74 527.585 1699.31 527.027C1695.88 526.44 1692.45 526.813 1689.03 526.074C1685.33 525.276 1681.65 523.374 1678.01 523.057C1675.33 522.784 1672.67 523.535 1670.04 524.372C1665.63 525.784 1660.45 525.522 1656.47 526.979C1651.9 528.658 1646.49 531.101 1642.74 534.461C1640.11 536.877 1638.13 539.689 1636.43 542.756C1635.36 544.687 1634.16 546.718 1633.19 548.814C1632.01 551.386 1633.12 554.054 1632.7 556.755C1632.27 559.51 1630.99 562.278 1631 565.044C1631.01 567.591 1632.27 570.136 1632.6 572.669C1631.77 574.633 1633.2 576.59 1633.63 578.534C1634.17 581.02 1634.85 583.485 1635.63 585.92C1636.15 587.579 1635.63 589.222 1636.23 590.851C1637.85 595.226 1640.82 599.505 1642.8 603.755C1643.94 606.214 1644.02 608.663 1645.19 611.115L1645.2 611.137C1646.07 612.974 1646.94 614.813 1648.87 616.658C1650.44 620.069 1650.87 623.503 1652.22 626.996C1652.99 629.007 1652.8 631.043 1653.53 633.081C1654.47 635.698 1656.41 638.318 1657.46 640.89C1659.07 644.83 1659.85 648.658 1662.34 652.191C1664.63 655.472 1669.53 658.388 1672.76 660.674C1674.41 661.843 1676.16 664.021 1678.01 664.824C1679.94 665.667 1681.98 665.116 1684.1 665.476C1686.98 665.992 1689.89 667.183 1692.82 666.976C1695.95 666.756 1699.1 665.107 1702.24 664.712C1703.98 664.503 1705.72 664.333 1707.46 664.189C1709.45 664.024 1711.44 665.065 1713.43 664.945C1717.31 664.709 1721.19 663.344 1725.07 663.033C1726.98 662.902 1728.89 663.121 1730.78 663.235C1732.24 663.321 1733.68 662.172 1735.12 661.928C1736.76 661.647 1738.39 662.477 1740 662.049C1741.56 661.633 1743.11 661.137 1744.62 660.541C1746.2 659.963 1747.74 658.128 1749.22 657.388C1751.02 656.489 1752.74 654.303 1754.38 653.185C1756.79 651.54 1760.09 650.844 1762.09 648.787C1764.43 646.39 1766.39 643.566 1768.1 640.717C1769.58 638.25 1770.81 635.807 1771.76 633.081C1772.94 629.707 1772.61 627.164 1772.88 623.524C1773.02 621.592 1773.12 618.634 1772.99 616.658C1772.87 614.822 1772.62 612.972 1772.25 611.115ZM1758.2 595.501C1759.3 599.401 1761.6 603.101 1762.6 607.001C1766.2 620.701 1755.8 633.9 1739 638.6C1733.7 640.2 1728 640.7 1722.3 641C1715.8 641.4 1709.3 641.5 1702.8 642.1C1697.6 642.6 1692.4 643.3 1687.3 642.6C1680.4 641.7 1674.5 638.301 1670.5 633.901C1665.9 628.901 1663.8 623.001 1661 617.401C1656.4 608.301 1649.7 599.801 1645.9 590.501C1643.3 584.301 1642.1 577.801 1643.4 571.401C1644.5 565.901 1647.5 560.6 1652.9 556.8C1656.1 554.6 1659.8 553.001 1663.7 551.901C1669.4 550.301 1675.7 549.6 1682.1 550.1C1688.1 550.5 1694.2 551.901 1700.3 552.701C1709.9 553.901 1719.7 553.101 1729.2 554.401C1739.3 555.801 1748.2 559.401 1753 566.201C1759.3 575.001 1755.4 585.901 1758.2 595.501Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1772.25 611.115C1771.08 605.16 1771.38 600.51 1770.1 594.555C1769.39 591.383 1769.05 587.118 1768.87 583.813C1768.67 580.124 1769.77 576.385 1769.71 572.669C1769.65 568.703 1768.42 564.763 1767.86 560.938C1767.24 556.717 1765.19 551.636 1763.09 547.814C1761.32 544.544 1757.99 541.759 1755.38 539.41C1752.67 536.975 1748.56 534.836 1745.17 533.288C1743.51 532.53 1741.78 532.105 1740 531.798C1737.79 531.418 1735.5 532.394 1733.15 531.969C1729.5 531.318 1725.81 528.666 1722.11 528.484C1720.12 528.386 1718.13 527.42 1716.14 527.64C1713.97 527.879 1711.8 529.307 1709.63 529.202C1706.18 529.033 1702.74 527.585 1699.31 527.027C1695.88 526.44 1692.45 526.813 1689.03 526.074C1685.33 525.276 1681.65 523.374 1678.01 523.057C1675.33 522.784 1672.67 523.535 1670.04 524.372C1665.63 525.784 1660.45 525.522 1656.47 526.979C1651.9 528.658 1646.49 531.101 1642.74 534.461C1640.11 536.877 1638.13 539.689 1636.43 542.756C1635.36 544.687 1634.16 546.718 1633.19 548.814C1632.01 551.386 1633.12 554.054 1632.7 556.755C1632.27 559.51 1630.99 562.278 1631 565.044C1631.01 567.591 1632.27 570.136 1632.6 572.669C1631.77 574.633 1633.2 576.59 1633.63 578.534C1634.17 581.02 1634.85 583.485 1635.63 585.92C1636.15 587.579 1635.63 589.222 1636.23 590.851C1637.85 595.226 1640.82 599.505 1642.8 603.755C1643.94 606.214 1644.02 608.663 1645.19 611.115L1645.2 611.137C1646.07 612.974 1646.94 614.813 1648.87 616.658C1650.44 620.069 1650.87 623.503 1652.22 626.996C1652.99 629.007 1652.8 631.043 1653.53 633.081C1654.47 635.698 1656.41 638.318 1657.46 640.89C1659.07 644.83 1659.85 648.658 1662.34 652.191C1664.63 655.472 1669.53 658.388 1672.76 660.674C1674.41 661.843 1676.16 664.021 1678.01 664.824C1679.94 665.667 1681.98 665.116 1684.1 665.476C1686.98 665.992 1689.89 667.183 1692.82 666.976C1695.95 666.756 1699.1 665.107 1702.24 664.712C1703.98 664.503 1705.72 664.333 1707.46 664.189C1709.45 664.024 1711.44 665.065 1713.43 664.945C1717.31 664.709 1721.19 663.344 1725.07 663.033C1726.98 662.902 1728.89 663.121 1730.78 663.235C1732.24 663.321 1733.68 662.172 1735.12 661.928C1736.76 661.647 1738.39 662.477 1740 662.049C1741.56 661.633 1743.11 661.137 1744.62 660.541C1746.2 659.963 1747.74 658.128 1749.22 657.388C1751.02 656.489 1752.74 654.303 1754.38 653.185C1756.79 651.54 1760.09 650.844 1762.09 648.787C1764.43 646.39 1766.39 643.566 1768.1 640.717C1769.58 638.25 1770.81 635.807 1771.76 633.081C1772.94 629.707 1772.61 627.164 1772.88 623.524C1773.02 621.592 1773.12 618.634 1772.99 616.658C1772.87 614.822 1772.62 612.972 1772.25 611.115ZM1758.2 595.501C1759.3 599.401 1761.6 603.101 1762.6 607.001C1766.2 620.701 1755.8 633.9 1739 638.6C1733.7 640.2 1728 640.7 1722.3 641C1715.8 641.4 1709.3 641.5 1702.8 642.1C1697.6 642.6 1692.4 643.3 1687.3 642.6C1680.4 641.7 1674.5 638.301 1670.5 633.901C1665.9 628.901 1663.8 623.001 1661 617.401C1656.4 608.301 1649.7 599.801 1645.9 590.501C1643.3 584.301 1642.1 577.801 1643.4 571.401C1644.5 565.901 1647.5 560.6 1652.9 556.8C1656.1 554.6 1659.8 553.001 1663.7 551.901C1669.4 550.301 1675.7 549.6 1682.1 550.1C1688.1 550.5 1694.2 551.901 1700.3 552.701C1709.9 553.901 1719.7 553.101 1729.2 554.401C1739.3 555.801 1748.2 559.401 1753 566.201C1759.3 575.001 1755.4 585.901 1758.2 595.501Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1650.08 610.274C1649.01 608.184 1648.93 606.096 1647.88 604C1646.06 600.377 1643.32 596.729 1641.83 593C1641.27 591.611 1641.75 590.211 1641.27 588.796C1640.55 586.72 1639.92 584.619 1639.42 582.5C1639.03 580.842 1637.71 579.174 1638.48 577.5C1638.17 575.34 1637.01 573.171 1637 571C1636.99 568.642 1638.17 566.282 1638.57 563.933C1638.95 561.631 1638.85 559.356 1639.95 557.164C1640.84 555.377 1642.87 553.646 1643.85 552C1645.42 549.386 1645.4 546.988 1647.82 544.928C1651.28 542.065 1656.27 539.982 1660.48 538.55C1664.22 537.285 1668.91 537.535 1673 536.328C1675.42 535.614 1677.87 534.974 1680.34 535.207C1683.7 535.477 1687.09 537.098 1690.5 537.779C1693.65 538.409 1696.82 538.091 1699.99 538.591C1703.14 539.067 1706.32 540.301 1709.5 540.445C1711.5 540.535 1713.5 539.318 1715.5 539.114C1717.34 538.926 1719.17 539.75 1721 539.833C1724.42 539.988 1727.82 542.249 1731.18 542.804C1733.35 543.166 1735.46 542.334 1737.5 542.659C1739.14 542.92 1740.73 543.282 1742.26 543.928C1745.39 545.249 1748.25 547.924 1750.76 550C1753.17 552.002 1756.24 554.377 1757.87 557.164C1759.8 560.422 1759.85 563.901 1760.42 567.5C1760.94 570.76 1762.07 574.119 1762.13 577.5C1762.18 580.668 1761.17 583.855 1761.35 587C1761.51 589.817 1761.83 592.601 1762.48 595.305C1763.67 600.381 1766.15 605.198 1767.23 610.274C1767.58 611.857 1767.8 613.435 1767.92 615C1768.04 616.684 1767.03 618.353 1766.89 620C1766.64 623.103 1766.95 626.124 1765.86 629C1764.98 631.324 1763.85 632.553 1762.48 634.657C1760.91 637.085 1760.02 640.345 1757.87 642.389C1756.02 644.142 1752.98 644.736 1750.76 646.138C1749.25 647.091 1747.66 648.955 1746 649.721C1744.63 650.352 1743.22 651.916 1741.76 652.409C1740.36 652.917 1738.94 653.34 1737.5 653.695C1736.02 654.059 1734.52 653.352 1733 653.591C1731.68 653.8 1730.34 654.779 1729 654.705C1727.25 654.609 1725.49 654.421 1723.73 654.533C1720.16 654.798 1716.58 655.962 1713 656.163C1711.17 656.265 1709.33 655.378 1707.5 655.518C1705.89 655.641 1704.29 655.786 1702.69 655.965C1699.79 656.301 1696.89 657.707 1694 657.895C1691.3 658.071 1688.62 657.056 1685.95 656.615C1684 656.309 1682.13 656.778 1680.34 656.06C1678.64 655.375 1677.02 653.519 1675.5 652.522C1672.53 650.574 1668.93 648.087 1666.82 645.291C1664.52 642.279 1663.8 639.016 1662.32 635.657C1661.35 633.465 1660.48 631.231 1659.62 629C1658.95 627.263 1657.28 625.527 1656.57 623.812C1655.32 620.835 1654.93 617.907 1653.48 615C1651.7 613.426 1650.89 611.859 1650.09 610.293M1650.08 610.274L1650.09 610.293M1650.08 610.274C1650.08 610.281 1650.09 610.287 1650.09 610.293M1762.6 607C1761.6 603.1 1759.3 599.4 1758.2 595.5C1755.4 585.9 1759.3 575 1753 566.2C1748.2 559.4 1739.3 555.8 1729.2 554.4C1719.7 553.1 1709.9 553.9 1700.3 552.7C1694.2 551.9 1688.1 550.5 1682.1 550.1C1675.7 549.6 1669.4 550.3 1663.7 551.9C1659.8 553 1656.1 554.6 1652.9 556.8C1647.5 560.6 1644.5 565.9 1643.4 571.4C1642.1 577.8 1643.3 584.3 1645.9 590.5C1649.7 599.8 1656.4 608.3 1661 617.4C1663.8 623 1665.9 628.9 1670.5 633.9C1674.5 638.3 1680.4 641.7 1687.3 642.6C1692.4 643.3 1697.6 642.6 1702.8 642.1C1709.3 641.5 1715.8 641.4 1722.3 641C1728 640.7 1733.7 640.2 1739 638.6C1755.8 633.9 1766.2 620.7 1762.6 607Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling"
            style={{
              visibility:
                !tooth65Diagnozis.culttab &&
                !tooth65Diagnozis.abutment &&
                !tooth65Diagnozis.implant &&
                !tooth65Diagnozis.shaper &&
                !tooth65Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="caries-filling"
              data-position={'65_5'}
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M1747.5,608.4c-0.6,2.8-1.7,5.8-3.5,8.6c-4.2,6.6-12.3,12.4-27.7,12.4c-21.1,0-27.9-7.4-33.1-13.3
                                c-0.2-0.2-0.4-0.4-0.6-0.6c-5.2-6.1-6.8-19.6-9.9-28.7c-0.9-2.5-1.3-4.8-1.3-7c0.1-5.9,3.4-10.4,11-11.7c10.4-1.8,27.1,0,27.1,0
                                c10.6,0.6,19.3,2.5,25.6,7c1.9,1.3,3.6,2.9,5.1,4.7C1746.6,587.6,1749.6,599.2,1747.5,608.4z"
              />
              <path
                className={`st8 caries-center 
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth65.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth65.seal_center ? `seal-fill ${teethDiagnozis.tooth65.seal_center_color}` : ''}
                                `}
                d="M1747.5,608.4c-0.6,2.8-1.7,5.8-3.5,8.6c-4.2,6.6-12.3,12.4-27.7,12.4c-21.1,0-27.9-7.4-33.1-13.3
                                c-0.2-0.2-0.4-0.4-0.6-0.6c-5.2-6.1-6.8-19.6-9.9-28.7c-0.9-2.5-1.3-4.8-1.3-7c0.1-5.9,3.4-10.4,11-11.7c10.4-1.8,27.1,0,27.1,0
                                c10.6,0.6,19.3,2.5,25.6,7c1.9,1.3,3.6,2.9,5.1,4.7C1746.6,587.6,1749.6,599.2,1747.5,608.4z"
              />
            </g>
            {/*КАРИЕС LEFT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M1683.3,616.1c-3.8,5.3-11.4,14.7-23.4,24.1c-2.4-5-4.2-10.3-6.3-15.5c-5.2-12.7-12.8-24.5-17.2-37.6
                                c-2.9-8.7-4.3-17.8-2.7-26.8c0.2-1.2,0.5-2.4,0.8-3.5c7.8,4.2,26.2,14.3,37,23.1c0,2.2,0.4,4.6,1.3,7c3.2,9,4.7,22.6,9.9,28.7
                                C1682.9,615.6,1683.1,615.8,1683.3,616.1z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth65.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth65.seal_left ? `seal-fill ${teethDiagnozis.tooth65.seal_left_color}` : ''}
                                `}
                d="M1683.3,616.1c-3.8,5.3-11.4,14.7-23.4,24.1c-2.4-5-4.2-10.3-6.3-15.5c-5.2-12.7-12.8-24.5-17.2-37.6
                                c-2.9-8.7-4.3-17.8-2.7-26.8c0.2-1.2,0.5-2.4,0.8-3.5c7.8,4.2,26.2,14.3,37,23.1c0,2.2,0.4,4.6,1.3,7c3.2,9,4.7,22.6,9.9,28.7
                                C1682.9,615.6,1683.1,615.8,1683.3,616.1z"
              />
            </g>
            {/*КАРИЕС НИЗ*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M1763.1,640.3c-4.9,6-11.7,10.8-19.8,13.6c-6.2,2.2-12.8,2.9-19.3,3.4c-7.5,0.6-15,0.9-22.5,1.8
                                c-6,0.7-12,1.8-17.9,0.8c-7.9-1.3-14.6-6-19.2-12.1c-1.8-2.4-3.3-5-4.5-7.6c12-9.4,19.6-18.8,23.4-24.1c5.1,6,11.9,13.3,33.1,13.3
                                c15.3,0,23.4-5.8,27.7-12.4C1746.8,621.7,1752.4,629.5,1763.1,640.3z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth65.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth65.seal_bottom ? `seal-fill ${teethDiagnozis.tooth65.seal_bottom_color}` : ''}
                                `}
                d="M1763.1,640.3c-4.9,6-11.7,10.8-19.8,13.6c-6.2,2.2-12.8,2.9-19.3,3.4c-7.5,0.6-15,0.9-22.5,1.8
                                c-6,0.7-12,1.8-17.9,0.8c-7.9-1.3-14.6-6-19.2-12.1c-1.8-2.4-3.3-5-4.5-7.6c12-9.4,19.6-18.8,23.4-24.1c5.1,6,11.9,13.3,33.1,13.3
                                c15.3,0,23.4-5.8,27.7-12.4C1746.8,621.7,1752.4,629.5,1763.1,640.3z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M1763.1,640.3c-10.7-10.7-16.3-18.6-19.1-23.2c1.8-2.8,2.9-5.8,3.5-8.6c2-9.2-0.9-20.8-7.2-28.7
                                c-1.5-1.8-3.2-3.4-5.1-4.7c9.6-11.7,19.5-19.8,24.7-23.8c0.2,0.3,0.3,0.5,0.5,0.8c7.1,12.4,2.5,27.6,5.7,41.1
                                c1.3,5.5,3.9,10.6,5,16.1C1773.4,620.5,1770.2,631.6,1763.1,640.3z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth65.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth65.seal_right ? `seal-fill ${teethDiagnozis.tooth65.seal_right_color}` : ''}
                                `}
                d="M1763.1,640.3c-10.7-10.7-16.3-18.6-19.1-23.2c1.8-2.8,2.9-5.8,3.5-8.6c2-9.2-0.9-20.8-7.2-28.7
                                c-1.5-1.8-3.2-3.4-5.1-4.7c9.6-11.7,19.5-19.8,24.7-23.8c0.2,0.3,0.3,0.5,0.5,0.8c7.1,12.4,2.5,27.6,5.7,41.1
                                c1.3,5.5,3.9,10.6,5,16.1C1773.4,620.5,1770.2,631.6,1763.1,640.3z"
              />
            </g>
            {/*КАРИЕС ВЕРХ*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1759.9,551.2c-5.2,3.9-15,12.1-24.7,23.8c-6.3-4.4-15-6.4-25.6-7c0,0-16.7-1.8-27.1,0
                                c-7.5,1.3-10.9,5.9-11,11.7c-10.8-8.7-29.2-18.9-37-23.1c1.7-6.5,5.1-12.6,10.4-17.1c3.7-3.2,8-5.4,12.5-7
                                c6.7-2.3,14-3.3,21.3-2.7c7,0.6,14,2.5,21,3.5c11.1,1.6,22.4,0.4,33.3,2.2C1744.3,537.5,1754.3,542.2,1759.9,551.2z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth65.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth65.seal_top ? `seal-fill ${teethDiagnozis.tooth65.seal_top_color}` : ''}
                                `}
                d="M1759.9,551.2c-5.2,3.9-15,12.1-24.7,23.8c-6.3-4.4-15-6.4-25.6-7c0,0-16.7-1.8-27.1,0
                                c-7.5,1.3-10.9,5.9-11,11.7c-10.8-8.7-29.2-18.9-37-23.1c1.7-6.5,5.1-12.6,10.4-17.1c3.7-3.2,8-5.4,12.5-7
                                c6.7-2.3,14-3.3,21.3-2.7c7,0.6,14,2.5,21,3.5c11.1,1.6,22.4,0.4,33.3,2.2C1744.3,537.5,1754.3,542.2,1759.9,551.2z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_right &&
                      !tooth65Diagnozis.seal_bottom) ||
                    (!tooth65Diagnozis.seal_right &&
                      tooth65Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1760 636C1755.29 632.893 1744.51 622.629 1741 618"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_right &&
                      !tooth65Diagnozis.seal_center) ||
                    (!tooth65Diagnozis.seal_right &&
                      tooth65Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1741 618C1746.67 611.667 1753.4 594.2 1735 575"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_right &&
                      !tooth65Diagnozis.seal_top) ||
                    (!tooth65Diagnozis.seal_right && tooth65Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1735 575C1738 570.5 1746.5 560 1756.5 554"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_center &&
                      !tooth65Diagnozis.seal_top) ||
                    (!tooth65Diagnozis.seal_center && tooth65Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1735 575C1715.33 570.834 1675.1 565.9 1671.5 579.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_left &&
                      !tooth65Diagnozis.seal_top) ||
                    (!tooth65Diagnozis.seal_left && tooth65Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1671.5 579.5C1669.33 576.167 1659.8 567.5 1639 559.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth65Diagnozis.seal_left &&
                      tooth65Diagnozis.seal_center) ||
                    (tooth65Diagnozis.seal_left &&
                      !tooth65Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1671.5 579.5C1671.83 588 1674.5 607.3 1682.5 616.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_left &&
                      !tooth65Diagnozis.seal_bottom) ||
                    (!tooth65Diagnozis.seal_left &&
                      tooth65Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1682.5 616.5C1681 620.5 1674.9 630.3 1662.5 637.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_center &&
                      !tooth65Diagnozis.seal_bottom) ||
                    (!tooth65Diagnozis.seal_center &&
                      tooth65Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1741.5 618.5C1732.5 627 1697.7 629.7 1682.5 616.5"
              />
            </g>
          </g>
          {/*VINIR*/}
          <g>
            <g
              className="vinir"
              style={{
                visibility: tooth65Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth65Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth65Diagnozis.vinir_color}`}
                d="M1760.4 551.999C1760.3 551.699 1760.1 551.499 1759.9 551.199C1754.3 542.199 1744.3 537.399 1733.1 535.599C1722.2 533.799 1710.9 534.999 1699.8 533.399C1692.8 532.399 1685.8 530.499 1678.8 529.899C1671.5 529.299 1664.2 530.299 1657.5 532.599C1652.9 534.199 1648.7 536.399 1645 539.599C1639.7 544.099 1636.4 550.199 1634.6 556.699C1634.3 557.899 1634 559.099 1633.8 560.199C1632.2 569.199 1633.6 578.299 1636.5 586.999C1637.17 589.024 1637.92 591.022 1638.73 593C1641.53 592.801 1647.1 591.663 1646.98 588.702C1646.94 588.563 1646.89 588.424 1646.84 588.285C1644.4 580.95 1643.22 573.278 1644.57 565.69C1644.74 564.762 1644.99 563.751 1645.24 562.739C1646.76 557.259 1649.54 552.116 1654.01 548.322C1657.13 545.624 1660.68 543.769 1664.56 542.42C1670.21 540.481 1676.37 539.638 1682.52 540.144C1688.43 540.65 1694.33 542.252 1700.24 543.095C1709.6 544.444 1719.13 543.432 1728.33 544.95C1737.77 546.467 1746.21 550.514 1750.93 558.102C1751.1 558.355 1751.27 558.523 1751.35 558.776C1756.49 567.745 1754.36 578.452 1755.36 588.5C1756.45 591.7 1762.96 592.84 1766.08 593.01C1762.92 579.532 1767.48 564.372 1760.4 551.999Z"
              ></path>
              <path
                className={`vinir-fill ${tooth65Diagnozis.vinir_color}`}
                d="M1766.1 593.099C1766.09 593.07 1766.09 593.04 1766.08 593.01M1766.08 593.01C1762.92 579.532 1767.48 564.372 1760.4 551.999C1760.3 551.699 1760.1 551.499 1759.9 551.199C1754.3 542.199 1744.3 537.399 1733.1 535.599C1722.2 533.799 1710.9 534.999 1699.8 533.399C1692.8 532.399 1685.8 530.499 1678.8 529.899C1671.5 529.299 1664.2 530.299 1657.5 532.599C1652.9 534.199 1648.7 536.399 1645 539.599C1639.7 544.099 1636.4 550.199 1634.6 556.699C1634.3 557.899 1634 559.099 1633.8 560.199C1632.2 569.199 1633.6 578.299 1636.5 586.999C1637.17 589.024 1637.92 591.022 1638.73 593C1641.53 592.801 1647.1 591.663 1646.98 588.702C1646.94 588.563 1646.89 588.424 1646.84 588.285C1644.4 580.95 1643.22 573.278 1644.57 565.69C1644.74 564.762 1644.99 563.751 1645.24 562.739C1646.76 557.259 1649.54 552.116 1654.01 548.322C1657.13 545.624 1660.68 543.769 1664.56 542.42C1670.21 540.481 1676.37 539.638 1682.52 540.144C1688.43 540.65 1694.33 542.252 1700.24 543.095C1709.6 544.444 1719.13 543.432 1728.33 544.95C1737.77 546.467 1746.21 550.514 1750.93 558.102C1751.1 558.355 1751.27 558.523 1751.35 558.776C1756.49 567.745 1754.36 578.452 1755.36 588.5C1756.45 591.7 1762.96 592.84 1766.08 593.01Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth65Diagnozis.temporary_crown ||
                tooth65Diagnozis.ceramic_crown ||
                tooth65Diagnozis.mceramic_crown ||
                tooth65Diagnozis.metalic_crown ||
                tooth65Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth65Diagnozis.temporary_crown ||
                tooth65Diagnozis.ceramic_crown ||
                tooth65Diagnozis.mceramic_crown ||
                tooth65Diagnozis.metalic_crown ||
                tooth65Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth65Diagnozis.ceramic_crown_color}
                                ${tooth65Diagnozis.mceramic_crown_color}
                                ${tooth65Diagnozis.metalic_crown_color}
                                ${tooth65Diagnozis.zirconia_crown_color}
                            `}
              d="M1771.1,609.2c-1.2-5.5-3.7-10.6-5-16.1c-3.2-13.5,1.4-28.7-5.7-41.1
                            c-0.1-0.3-0.3-0.5-0.5-0.8c-5.6-9-15.6-13.8-26.8-15.6c-10.9-1.8-22.2-0.6-33.3-2.2c-7-1-14-2.9-21-3.5
                            c-7.3-0.6-14.6,0.4-21.3,2.7c-4.6,1.6-8.8,3.8-12.5,7c-5.3,4.5-8.6,10.6-10.4,17.1c-0.3,1.2-0.6,2.4-0.8,3.5
                            c-1.6,9-0.2,18.1,2.7,26.8c4.3,13,11.9,24.9,17.2,37.6c2.1,5.2,3.9,10.5,6.3,15.5c1.3,2.6,2.7,5.2,4.5,7.6
                            c4.6,6.1,11.3,10.8,19.2,12.1c5.9,1,11.9-0.1,17.9-0.8c7.5-0.9,15-1.2,22.5-1.8c6.6-0.5,13.1-1.3,19.3-3.4
                            c8.1-2.8,14.8-7.6,19.8-13.6C1770.2,631.6,1773.4,620.5,1771.1,609.2z"
            />
            {/*FISSURE*/}
            <path
              className={`st3 fissure ${tooth65Diagnozis.fissure ? 'diagnoze' : tooth65Diagnozis.fissure ? 'hidden' : ''}`}
              d="M1746.7,592.7c-0.6-0.7-1.3-1.5-1.7-2.3c-1-2-0.5-4.4,1.2-5.8l-0.7-0.8c-2.2,1.8-2.8,4.7-1.5,7.2
                            c0.5,0.9,1.2,1.7,1.8,2.5c1.5,1.8,2.4,3,1.6,4.5c-0.8,1.5-2.7,1.5-4.8,1.5l-0.2,0c-4.2-0.1-8.7,0.9-13.1,1.9
                            c-0.8,0.2-1.5,0.3-2.3,0.5c-3.4,0.8-6.9,1.6-10.2,2.5c-1.4,0.3-2.8,0.7-4.1,1c-2.2-2.7-4.7-5.1-7.4-7.3l-1-0.8
                            c-4-3.1-8.2-6.3-7.4-11c0.5-2.9,3-4.7,5.6-6.6c0.9-0.6,1.8-1.3,2.6-2c5-4.3,7.3-10.5,6.1-16.8l-1.1,0.2
                            c1.1,5.8-1.1,11.7-5.8,15.7c-0.8,0.7-1.7,1.3-2.6,2c-2.7,2-5.5,4-6.1,7.3c-0.9,5.3,3.7,8.9,7.8,12l1,0.8c2.7,2.1,5.2,4.5,7.3,7.1
                            c-0.1,0.2-0.3,0.3-0.4,0.5c-6,7.2-10.1,15.7-11.9,24.6l1.1,0.2c1.8-8.8,5.9-17.1,11.7-24.1c0.2-0.3,0.5-0.6,0.7-0.9
                            c1.4-0.3,2.8-0.7,4.1-1c3.3-0.8,6.8-1.7,10.2-2.4c0.7-0.2,1.5-0.3,2.3-0.5c4.3-1,8.7-2,12.8-1.9l0.2,0c2.3,0,4.6,0.1,5.7-2
                            C1749.7,596.2,1748.1,594.4,1746.7,592.7z"
            />
            <path
              className={`st3 fissure ${tooth65Diagnozis.fissure ? 'diagnoze' : tooth65Diagnozis.fissure ? 'hidden' : ''}`}
              d="M1674.6,595.5l-0.4,0.2c-3,1.4-6.1,2.8-9.3,2.1c-2-0.4-3.5-1.7-5.2-2.9c-1.7-1.3-3.4-2.7-5.7-3.1l-0.2,1.1
                            c2,0.4,3.6,1.7,5.2,2.9c1.7,1.3,3.4,2.6,5.6,3.1c0.7,0.1,1.3,0.2,2,0.2c2.8,0,5.4-1.2,8-2.4l0.4-0.2c3.4-1.6,7.1-3,11.3-4.3
                            l-0.3-1C1681.8,592.5,1678.1,593.9,1674.6,595.5z"
            />
          </g>
          {/* FISSURES */}
          <g
            style={{
              visibility:
                !tooth65Diagnozis.culttab &&
                !tooth65Diagnozis.abutment &&
                !tooth65Diagnozis.implant &&
                !tooth65Diagnozis.apex &&
                !tooth65Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth65Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1746.7,592.7c-0.6-0.7-1.3-1.5-1.7-2.3c-1-2-0.5-4.4,1.2-5.8l-0.7-0.8c-2.2,1.8-2.8,4.7-1.5,7.2
                            c0.5,0.9,1.2,1.7,1.8,2.5c1.5,1.8,2.4,3,1.6,4.5c-0.8,1.5-2.7,1.5-4.8,1.5l-0.2,0c-4.2-0.1-8.7,0.9-13.1,1.9
                            c-0.8,0.2-1.5,0.3-2.3,0.5c-3.4,0.8-6.9,1.6-10.2,2.5c-1.4,0.3-2.8,0.7-4.1,1c-2.2-2.7-4.7-5.1-7.4-7.3l-1-0.8
                            c-4-3.1-8.2-6.3-7.4-11c0.5-2.9,3-4.7,5.6-6.6c0.9-0.6,1.8-1.3,2.6-2c5-4.3,7.3-10.5,6.1-16.8l-1.1,0.2
                            c1.1,5.8-1.1,11.7-5.8,15.7c-0.8,0.7-1.7,1.3-2.6,2c-2.7,2-5.5,4-6.1,7.3c-0.9,5.3,3.7,8.9,7.8,12l1,0.8c2.7,2.1,5.2,4.5,7.3,7.1
                            c-0.1,0.2-0.3,0.3-0.4,0.5c-6,7.2-10.1,15.7-11.9,24.6l1.1,0.2c1.8-8.8,5.9-17.1,11.7-24.1c0.2-0.3,0.5-0.6,0.7-0.9
                            c1.4-0.3,2.8-0.7,4.1-1c3.3-0.8,6.8-1.7,10.2-2.4c0.7-0.2,1.5-0.3,2.3-0.5c4.3-1,8.7-2,12.8-1.9l0.2,0c2.3,0,4.6,0.1,5.7-2
                            C1749.7,596.2,1748.1,594.4,1746.7,592.7z"
            />
            <path
              className={`st3 fissure ${tooth65Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1674.6,595.5l-0.4,0.2c-3,1.4-6.1,2.8-9.3,2.1c-2-0.4-3.5-1.7-5.2-2.9c-1.7-1.3-3.4-2.7-5.7-3.1l-0.2,1.1
                            c2,0.4,3.6,1.7,5.2,2.9c1.7,1.3,3.4,2.6,5.6,3.1c0.7,0.1,1.3,0.2,2,0.2c2.8,0,5.4-1.2,8-2.4l0.4-0.2c3.4-1.6,7.1-3,11.3-4.3
                            l-0.3-1C1681.8,592.5,1678.1,593.9,1674.6,595.5z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, -224, 121)',
          }}
          onMouseOver={() => {
            showHideTopCommonView('over');
          }}
          onMouseLeave={() => {
            showHideTopCommonView('leave');
          }}
        >
          <g className="dentin">
            <g
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth65Diagnozis.implant &&
                  !tooth65Diagnozis.apex &&
                  !tooth65Diagnozis.shaper &&
                  !tooth65Diagnozis.apex
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth65Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1760.3,401.5c-0.1,10.4-3.5,20.7-9.7,29.7l-33.3-6.7l-33.6,10.1l-14.2,14.8
                                c-10-6.6-18.1-15.1-23.6-24.9c-3.3-5.9-5.6-12.2-6.8-18.7c-0.3-4.2-0.4-9-0.4-13.9c0-0.5,0-1,0-1.5c2.8-5.6,6.4-10.8,10.7-15.3
                                c6.5-6.7,14.4-11.9,23.1-15.3c0.2-0.1,0.5-0.2,0.7-0.3c9-3.5,18.6-5.1,28.2-5.8c2.8-0.2,5.5-0.4,8.3-0.5
                                c8.8-0.3,17.6,0.1,26.3,1.1c0.3,0.2,0.6,0.5,0.8,0.8c3.9,6.7,10,12.9,15.7,18.5C1757.8,382.2,1760.4,391.7,1760.3,401.5z"
              />
            </g>
            <g
              style={{
                visibility:
                  !tooth65Diagnozis.implant &&
                  !tooth65Diagnozis.abutment &&
                  !tooth65Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth65Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1736.8,355.1c-0.3-0.3-0.6-0.5-0.8-0.8c-8.7-1.1-17.5-1.4-26.3-1.1c-2.8,0.1-5.6,0.2-8.3,0.5
                                c-9.6,0.8-19.2,2.4-28.2,5.8c-0.2,0.1-0.5,0.2-0.7,0.3c-8.7,3.4-16.6,8.6-23.1,15.3c-4.3,4.5-7.9,9.7-10.7,15.3c0,0.5,0,1,0,1.5
                                c0-2.5,0-5-0.1-7.4c-0.1-6.6,0.5-13.1-0.2-19.7c-0.8-8.6-2.1-17.1-2.4-25.7c-0.4-12.1,1.3-24.2,2.8-36.2
                                c1.6-12.6,3.1-25.1,6.2-37.5c1.3-5.3,3-10.6,6.2-15.3c1.3-1.9,2.9-3.8,5.3-4.6c1.7-0.5,3.5-0.5,5.1,0c1.4,0.4,2.5,1.2,3.6,2
                                c5.8,4.9,5.7,12.4,5.3,19.4c-0.5,10.5-0.6,21.2,0,31.6c0.3,5.6,0.9,11.1,1.6,16.8c0.5,4.7,1.1,9.4,3.1,13.7
                                c0.3,0.6,0.6,1.2,0.9,1.8c0.7,1.2,1.5,2.3,2.4,3.3c2.2-1.8,4.2-3.8,6-6c2.7-3.2,4.9-6.8,6.9-10.4c1.4-2.6,2.6-5.3,3.8-8
                                c3.3-7.5,6.2-15.2,8.8-22.9c2.8-8.4,5.1-16.9,7.4-25.4c1.6-5.9,3.3-11.9,7.8-16.5c1.7-1.7,3.8-3.1,6.4-3.3c3.4-0.2,6.3,1.9,8,4.5
                                c1,1.5,1.6,3,1.9,4.7c0.9,4.7-0.9,9.4-2.3,14c-2.9,9.7-3.9,19.7-4.3,29.6c-0.5,12.9,0,25.8,2.5,38.5c1.3,6.3,1,12.6,3.7,18.6
                                C1735.7,352.9,1736.2,354,1736.8,355.1z"
              />
              <path
                className={`st10 change-color ${tooth65Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1672.2,259.9c0.1,11.2-0.6,22.4,0,33.6c0.3,6.3,0.9,12.5,1.7,18.8
                                c0.5,3.9,0.9,7.8,1.9,11.6c0.7,2.7,1.7,5.4,3,7.9c2-1.9,3.9-3.9,5.6-6.1c3.1-4.1,5.6-8.7,7.8-13.3c3.2-6.5,6.2-13.2,8.9-20
                                c0.9-12.5-0.5-25.1-4.2-37.1c-1.6-5.3-3.7-10.5-4.9-16c-0.5-2.6-0.9-5.2-1.6-7.7c-0.9-3.5-2.6-6.9-5.7-8.9
                                c-1.4-0.9-3.1-1.4-4.8-1c-2.3,0.6-3.8,2.8-4.9,5c-3.4,7-5.2,14.6-5.7,22.2c0.9,1.3,1.6,2.8,2.1,4.4
                                C1672.1,255.5,1672.2,257.7,1672.2,259.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.pulpit ? 'pulpit' : ''} ${tooth65Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1719.1,399.8c-5.9-4.1-13.5-5.7-20.8-4.4c-8.6,1.5-15.8,6.8-19.3,14.1
                                c-2.9-5.3-4.6-11-5.1-16.9c-0.7-7.7,0.8-15.4,0.3-23.1c-0.2-3.3-0.9-6.5-1.7-9.7c0.2-0.1,0.5-0.2,0.7-0.3l0,0
                                c2.2-0.9,4.5-1.6,6.9-2.3c1-0.3,2-0.5,3.1-0.8c6-1.5,12.1-2.3,18.3-2.8c1.2-0.1,2.3-0.2,3.5-0.2c0.9-0.1,1.8-0.1,2.7-0.1
                                c0.6,0,1.2,0,1.8-0.1c0.1,0,0.2,0,0.3,0c0.3,7.2,1,14.4,3.5,21.2c1.6,4.4,3.9,8.5,5.2,13C1719.6,391.5,1719.8,395.7,1719.1,399.8z"
              />
            </g>
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.pulpit ? 'pulpit' : ''} ${tooth65Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1713.2,298c-3.1,17.7-4.2,35.6-3.6,53.5c0,0.6,0,1.2,0.1,1.7c-0.1,0-0.2,0-0.3,0
                                c-0.6,0-1.2,0-1.8,0.1c-0.9,0-1.8,0.1-2.7,0.1c-1.2,0.1-2.3,0.2-3.5,0.2c-6.2,0.5-12.3,1.3-18.3,2.8c-1,0.2-2,0.5-3.1,0.8
                                c-2.3,0.7-4.6,1.4-6.8,2.3l0,0c-0.2,0.1-0.5,0.2-0.7,0.3c-2.1-7.9-5.7-15.5-8.6-23.2c-4.2-11-7.1-22.3-8.5-33.9
                                c-0.1-1.1-0.2-2.1-0.3-3.2c0.6-0.4,1.3-0.9,2-1.3c1.6,14,5.4,27.8,11.6,40.9c1.3,2.7,2.8,5.4,4.8,7.6c0.7-5.9,1.3-11.7,1.9-17.6
                                c0,0,0,0,0,0c0.2-1.8,0.4-3.6,0.5-5.5c1-10.8,1.9-21.5,2.7-32.3c2.5-0.3,5.1-0.4,8-0.4c0.3,0,0.6,0,0.9,0c1,8,2.2,15.9,3.6,23.9v0
                                c0.2,1,0.3,2,0.5,3c1.3,7.7,2.8,15.4,4.3,23.1c0.9-2,1.6-4.2,2.2-6.3c4.1-14,8.6-28,12.8-42.1c1.2,0.1,2.3,0.3,3.5,0.4
                                C1713.9,294.7,1713.5,296.3,1713.2,298z"
              />
            </g>
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target middle ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.pulpit ? 'pulpit' : ''} ${tooth65Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1655,299.5c0.6-0.4,1.3-0.9,2-1.3c-1.9-17-0.5-34.2,4.3-50.9C1655.6,264.1,1653.4,281.9,1655,299.5z"
              />
              <path
                className={`st22 target middle ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.pulpit ? 'pulpit' : ''} ${tooth65Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1681.6,222c-0.5,21.9-1.4,43.8-2.9,65.6c-0.1,1.2-0.2,2.5-0.3,3.7c2.5-0.3,5.1-0.4,8-0.4
                                c0.3,0,0.6,0,0.9,0c-0.4-3.2-0.8-6.4-1.2-9.6C1683.8,261.6,1682.3,241.8,1681.6,222z"
              />
              <path
                className={`st22 target middle ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.channel_class} ${tooth65Diagnozis.pulpit ? 'pulpit' : ''} ${tooth65Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1718.7,266.9c-2.8,7.5-4.9,15.1-7.1,22.8c-0.3,1-0.6,1.9-0.9,2.9c1.2,0.1,2.3,0.3,3.5,0.4
                                c3.4-17.1,8.8-33.9,15.9-49.9C1725.5,250.7,1721.7,258.7,1718.7,266.9z"
              />
            </g>
            <PeriodontitStage65 />
          </g>
          {/*PIN*/}
          <g
            className="pin hEmpty hImplant"
            style={{
              visibility: 'inherit',
              opacity: tooth65Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1760 401.5C1759.9 411.9 1756.5 422.2 1750.3 431.2L1717 424.5L1683.4 434.6L1669.2 449.4C1659.2 442.8 1651.1 434.3 1645.6 424.5C1642.3 418.6 1640 412.3 1638.8 405.8C1638.5 401.6 1638.4 396.8 1638.4 391.9V391.7C1638.4 391.3 1638.4 390.8 1638.5 390.4C1638.6 390.2 1638.7 390.1 1638.8 389.9C1639 389.5 1639.1 389.2 1639.3 388.9C1639.5 388.6 1639.7 388.2 1639.8 387.9C1640 387.5 1640.2 387.2 1640.4 386.9C1640.6 386.5 1640.8 386.2 1641 385.9C1641.3 385.4 1641.6 384.9 1641.9 384.5C1642.3 383.9 1642.7 383.2 1643.2 382.6C1645 380.1 1647 377.6 1649.1 375.4C1649.5 375 1649.9 374.5 1650.4 374.1C1650.8 373.7 1651.3 373.3 1651.7 372.9C1652.1 372.5 1652.6 372.1 1653 371.7C1654.3 370.5 1655.8 369.4 1657.2 368.4C1657.7 368 1658.2 367.7 1658.7 367.4C1659.2 367.1 1659.7 366.7 1660.2 366.4C1660.7 366.1 1661.2 365.8 1661.7 365.4C1662.2 365.1 1662.7 364.8 1663.2 364.5C1663.7 364.2 1664.2 363.9 1664.8 363.6C1665.3 363.4 1665.7 363.1 1666.2 362.9C1666.6 362.7 1667.1 362.5 1667.5 362.3C1668 362.1 1668.5 361.8 1669 361.6C1669.4 361.4 1669.8 361.2 1670.2 361C1670.7 360.8 1671.3 360.5 1671.9 360.3C1672 360.3 1672.1 360.2 1672.2 360.2C1672.3 360.1 1672.4 360.1 1672.6 360.1C1672.7 360.1 1672.8 360 1673 360C1673.4 359.9 1673.8 359.7 1674.2 359.6C1674.4 359.5 1674.5 359.5 1674.7 359.4C1675 359.3 1675.3 359.2 1675.5 359.1C1675.8 359 1676.1 358.9 1676.4 358.8C1676.6 358.7 1676.8 358.7 1677 358.6C1677.2 358.5 1677.4 358.5 1677.6 358.4C1677.8 358.3 1678 358.3 1678.3 358.2C1678.7 358.1 1679.2 357.9 1679.6 357.8C1679.8 357.8 1679.9 357.7 1680.1 357.7C1680.6 357.6 1681 357.5 1681.4 357.3C1681.8 357.2 1682.3 357.1 1682.7 357H1682.8C1683.5 356.8 1684.2 356.7 1684.9 356.5C1684.9 356.5 1684.9 356.5 1685 356.5C1685.7 356.3 1686.5 356.2 1687.2 356C1688 355.9 1688.7 355.7 1689.5 355.6C1690.1 355.5 1690.8 355.4 1691.4 355.3C1691.4 355.3 1691.4 355.3 1691.5 355.3C1691.8 355.3 1692.1 355.2 1692.5 355.2H1692.6C1693.1 355.1 1693.6 355.1 1694.1 355C1694.7 354.9 1695.3 354.8 1696 354.8C1696.6 354.7 1697.2 354.7 1697.8 354.6H1697.9C1698.4 354.6 1698.8 354.5 1699.3 354.5C1699.9 354.4 1700.5 354.4 1701.1 354.3C1701.5 354.3 1702 354.2 1702.4 354.2C1702.7 354.2 1703 354.2 1703.3 354.1C1703.7 354.1 1704.1 354.1 1704.6 354C1705.5 353.9 1706.4 353.9 1707.3 353.9C1707.8 353.9 1708.4 353.9 1708.9 353.8C1709.1 353.8 1709.2 353.8 1709.3 353.8C1718.1 353.5 1726.9 353.9 1735.6 354.9C1735.7 355 1735.9 355.1 1736 355.3C1736.1 355.4 1736.1 355.4 1736.2 355.5C1736.3 355.6 1736.3 355.6 1736.4 355.7C1740.3 362.4 1746.4 368.6 1752.1 374.2C1757.4 382.2 1760.1 391.8 1760 401.5Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st57"
              style={{ fill: tooth65Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M1708.9 426.999L1683.6 434.599L1683.1 435.199C1682.9 415.299 1682.1 370.699 1681.3 331.599C1681.3 330.799 1681.3 329.999 1681.3 329.199C1680.6 292.299 1680 260.999 1680 260.999C1680.1 259.999 1680.9 259.199 1682 259.199C1683 259.199 1683.8 259.899 1683.9 260.899L1691.7 313.199V313.299L1692.1 316.299V316.399L1697.8 353.999C1697.9 354.999 1705 401.299 1708.9 426.999Z"
            ></path>
          </g>
          {/* CULT TAB */}
          <g
            className="stump"
            style={{
              visibility: tooth65Diagnozis.culttab ? 'inherit' : 'hidden',
              opacity: tooth65Diagnozis.culttab ? 1 : 0,
            }}
          >
            <path
              className="st14"
              d="M1697.8,354c-0.6,0.1-1.2,0.1-1.8,0.2c-0.6,0.1-1.2,0.1-1.9,0.2c-0.5,0.1-1,0.1-1.5,0.2c0,0-0.1,0-0.1,0
                            c-0.3,0-0.6,0.1-1,0.1c0,0,0,0-0.1,0c-0.6,0.1-1.3,0.2-1.9,0.3c-0.8,0.1-1.5,0.3-2.3,0.4c-0.7,0.1-1.5,0.3-2.2,0.5
                            c0,0-0.1,0-0.1,0c-0.7,0.2-1.4,0.3-2.1,0.5c0,0-0.1,0-0.1,0c0,0,0,0,0,0c-0.5,0.1-0.9,0.2-1.3,0.3c-0.5,0.1-0.9,0.2-1.3,0.4
                            c-0.2,0-0.3,0.1-0.5,0.1c-0.4,0.1-0.9,0.2-1.3,0.4c-0.2,0.1-0.4,0.1-0.7,0.2c-0.2,0.1-0.4,0.1-0.6,0.2c-0.2,0.1-0.4,0.1-0.6,0.2
                            c-0.3,0.1-0.6,0.2-0.9,0.3c-0.3,0.1-0.6,0.2-0.8,0.3c0,0,0,0,0,0c-0.2,0.1-0.3,0.1-0.5,0.2c-0.4,0.1-0.8,0.3-1.2,0.4l0,0
                            c-0.1,0-0.2,0.1-0.4,0.1c-0.1,0-0.2,0.1-0.4,0.1c-0.1,0-0.2,0.1-0.3,0.1l8.1-99c0.1-1,0.9-1.8,2-1.8h0c1,0,1.8,0.7,1.9,1.7
                            L1697.8,354z"
            />
            <path
              className="st15"
              d="M1760,401.5c-0.1,10.4-3.5,20.7-9.7,29.7l-33.3-6.7l-33.6,10.1l-14.2,14.8c-10-6.6-18.1-15.1-23.6-24.9
                            c-3.3-5.9-5.6-12.2-6.8-18.7c-0.3-4.2-0.4-9-0.4-13.9v-0.2c0-0.4,0-0.9,0.1-1.3c0.1-0.2,0.2-0.3,0.3-0.5c0.2-0.4,0.3-0.7,0.5-1
                            c0.2-0.3,0.4-0.7,0.5-1c0.2-0.4,0.4-0.7,0.6-1c0.2-0.4,0.4-0.7,0.6-1c0.3-0.5,0.6-1,0.9-1.4c0.4-0.6,0.8-1.3,1.3-1.9
                            c1.8-2.5,3.8-5,5.9-7.2c0.4-0.4,0.8-0.9,1.3-1.3c0.4-0.4,0.9-0.8,1.3-1.2c0.4-0.4,0.9-0.8,1.3-1.2c1.3-1.2,2.8-2.3,4.2-3.3
                            c0.5-0.4,1-0.7,1.5-1c0.5-0.3,1-0.7,1.5-1s1-0.6,1.5-1c0,0,0,0,0,0c0.5-0.3,1-0.6,1.5-0.9c0.5-0.3,1-0.6,1.6-0.9
                            c0.5-0.2,0.9-0.5,1.4-0.7c0.4-0.2,0.9-0.4,1.3-0.6c0.5-0.2,1-0.5,1.5-0.7c0.4-0.2,0.8-0.4,1.2-0.6c0.5-0.2,1.1-0.5,1.7-0.7
                            c0.1,0,0.2-0.1,0.3-0.1c0.1-0.1,0.2-0.1,0.4-0.1c0.1,0,0.2-0.1,0.4-0.1l0,0c0.4-0.1,0.8-0.3,1.2-0.4c0.2-0.1,0.3-0.1,0.5-0.2
                            c0,0,0,0,0,0c0.3-0.1,0.6-0.2,0.8-0.3c0.3-0.1,0.6-0.2,0.9-0.3c0.2-0.1,0.4-0.1,0.6-0.2c0.2-0.1,0.4-0.1,0.6-0.2
                            c0.2-0.1,0.4-0.1,0.7-0.2c0.4-0.1,0.9-0.3,1.3-0.4c0.2,0,0.3-0.1,0.5-0.1c0.5-0.1,0.9-0.2,1.3-0.4c0.4-0.1,0.9-0.2,1.3-0.3
                            c0,0,0,0,0,0c0,0,0.1,0,0.1,0c0.7-0.2,1.4-0.3,2.1-0.5c0,0,0,0,0.1,0c0.7-0.2,1.5-0.3,2.2-0.5c0.8-0.1,1.5-0.3,2.3-0.4
                            c0.6-0.1,1.3-0.2,1.9-0.3c0,0,0,0,0.1,0c0.3,0,0.6-0.1,1-0.1c0,0,0.1,0,0.1,0c0.5-0.1,1-0.1,1.5-0.2c0.6-0.1,1.2-0.2,1.9-0.2
                            c0.6-0.1,1.2-0.1,1.8-0.2c0,0,0.1,0,0.1,0c0.5,0,0.9-0.1,1.4-0.1c0.6-0.1,1.2-0.1,1.8-0.2c0.4,0,0.9-0.1,1.3-0.1
                            c0.3,0,0.6,0,0.9-0.1c0.4,0,0.8,0,1.3-0.1c0.9-0.1,1.8-0.1,2.7-0.1c0.5,0,1.1,0,1.6-0.1c0.2,0,0.3,0,0.4,0h0
                            c8.8-0.3,17.6,0.1,26.3,1.1c0.1,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.1,0.1,0.1,0.2,0.2l0,0
                            c3.9,6.7,10,12.9,15.7,18.5C1757.4,382.2,1760.1,391.8,1760,401.5z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth65Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth65Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M1654.3,370.5c5.6-4.7,12-8.3,18.8-11c9-3.5,18.6-5.1,28.2-5.9c11.1-0.9,23.1-0.2,34.2,1l-32-14.1
                            l-34.1,4.9L1654.3,370.5z"
            />
            <path
              className="st17"
              d="M1638,405.8c1.2,6.5,4.5,12.8,7.8,18.7c5.5,9.8,13.5,18.3,23.6,24.9l14.2-14.8l33.6-10.1l33.3,6.7
                            c6.2-9,9.6-19.3,9.7-29.7c0.1-9.7-2.5-19.3-7.7-27.9c-6.3-6.1-12.2-11.2-15.8-18.6c-0.2-0.2-0.5-0.4-0.7-0.6
                            c-0.4-0.1-0.8-0.1-1.3-0.1c-11.1-1.3-22.3-1.4-33.4-0.5c-9.6,0.8-19.2,2.4-28.2,5.9c-6.8,2.6-13.2,6.3-18.8,11
                            c-1.7,1.4-3.4,3-5,4.6c-4.3,4.5-7.9,9.7-10.7,15.3c0,1.3-0.1,2.7-0.1,4c0,0.1,0,0.2,0,0.3C1638.5,398.4,1638.3,402.1,1638,405.8z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1665.12 390.613C1665.04 393.094 1667.22 395.046 1669.68 394.698L1718.44 387.789C1720.9 387.441 1722.45 384.962 1721.69 382.601L1709.41 344.526C1708.81 342.669 1706.96 341.515 1705.03 341.795L1669.79 346.907C1667.87 347.185 1666.42 348.802 1666.36 350.741L1665.12 390.613Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth65Diagnozis.abutment ||
                tooth65Diagnozis.implant ||
                tooth65Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1661.9,349.9l52.1-7.5c-3.1-15.8-6.9-31.4-11.5-46.9c-4.5-15.1-9.7-30.2-15.6-45c-4.1-3-9.9-4.4-15.6-3.5
                            c-6.4,1-11.9,4.6-14.9,9.4c-0.8,15-0.8,30,0,45C1657.2,317.6,1659.1,333.8,1661.9,349.9z"
            ></path>
            <line
              className="st19"
              x1="1654.6"
              y1="333.6"
              x2="1716.6"
              y2="333.5"
            ></line>
            <line
              className="st19"
              x1="1651.1"
              y1="315.6"
              x2="1713.1"
              y2="315.5"
            ></line>
            <line
              className="st19"
              x1="1648.8"
              y1="297.4"
              x2="1710.9"
              y2="297.3"
            ></line>
            <line
              className="st19"
              x1="1645.3"
              y1="279.4"
              x2="1707.4"
              y2="279.3"
            ></line>
            <line
              className="st19"
              x1="1641.8"
              y1="261.3"
              x2="1703.9"
              y2="261.3"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth65Diagnozis.culttab &&
                !tooth65Diagnozis.abutment &&
                !tooth65Diagnozis.implant &&
                !tooth65Diagnozis.shaper &&
                !tooth65Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1768.7,393.4c-1.4-4.2-4-7.8-6.8-11.3c-7.8-10-16.4-19.2-25.8-27.7
                            c-0.1,0-0.1-0.1-0.1-0.1c-11.5-1.4-23.1-1.6-34.6-0.7c-9.6,0.8-19.2,2.4-28.2,5.8c-9,3.5-17.2,8.7-23.8,15.6
                            c-4.3,4.5-7.9,9.7-10.7,15.3c0,0.4,0,0.8,0,1.2c-0.2,5.4-0.5,10.7-0.9,16.1c-0.4,5.8-1,11.6-0.9,17.4c0.1,6.8,1.2,13.5,3.2,20
                            c0.8,1.4,1.7,2.8,2.7,4.1c5.8,7.9,14.2,13.3,23.4,16.9c4.2,1.7,8.6,2.9,13,3.8l5.4-1c0.4-1.9,1.3-3.8,2.6-5.3
                            c0.2-0.2,0.4-0.5,0.6-0.7c6.1-6.7,18-7,21.6-15.8c1.3-3.2,1-6.9,0-10.2c-0.7-2.4-1.6-4.7-2.8-6.9l1.9,0.1c0.7,2.7,1.8,5.4,3.1,7.8
                            c1.9,3.6,4.5,6.9,8.1,8.7c5.9,3,12.7,1.4,19.2,1.9c4.1,0.3,8.1,1.5,11.8,3.5l2.1-0.8l2.9-1.1c8.4-9.4,13.4-21.4,14.3-34
                            c0.1-2.1,0.2-4.1,0.2-6.2C1770.2,404.3,1770.5,398.7,1768.7,393.4z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth65Diagnozis.culttab && !tooth65Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1761.9 382.099C1764.7 385.599 1767.3 389.199 1768.7 393.399C1770.28 398.038 1770.24 402.906 1770.21 407.735C1770.21 408.424 1770.2 409.113 1770.2 409.799C1770.2 411.809 1770.11 413.727 1770.02 415.729L1770 415.999C1769.1 428.599 1764.1 440.599 1755.7 449.999L1752.8 451.099L1750.7 451.899C1747 449.899 1743 448.699 1738.9 448.399C1736.86 448.242 1734.79 448.292 1732.73 448.342C1728.22 448.45 1723.75 448.558 1719.7 446.499C1716.1 444.699 1713.5 441.399 1711.6 437.799C1710.3 435.399 1709.2 432.699 1708.5 429.999L1706.6 429.899C1707.8 432.099 1708.7 434.399 1709.4 436.799C1710.4 440.099 1710.7 443.799 1709.4 446.999C1707.33 452.068 1702.5 454.317 1697.61 456.593C1694.02 458.269 1690.39 459.959 1687.8 462.799C1687.7 462.899 1687.6 463.024 1687.5 463.149C1687.4 463.274 1687.3 463.399 1687.2 463.499C1685.9 464.999 1685 466.899 1684.6 468.799L1679.2 469.799C1674.8 468.899 1670.4 467.699 1666.2 465.999C1657 462.399 1648.6 456.999 1642.8 449.099C1641.8 447.799 1640.9 446.399 1640.1 444.999C1638.1 438.499 1637 431.799 1636.9 424.999C1636.82 420.488 1637.17 415.977 1637.52 411.466C1637.62 410.177 1637.71 408.888 1637.8 407.599C1638.2 402.199 1638.5 396.899 1638.7 391.499V390.299C1641.5 384.699 1645.1 379.499 1649.4 374.999C1656 368.099 1664.2 362.899 1673.2 359.399C1682.2 355.999 1691.8 354.399 1701.4 353.599C1712.9 352.699 1724.5 352.899 1736 354.299C1736 354.299 1736 354.399 1736.1 354.399C1745.5 362.899 1754.1 372.099 1761.9 382.099ZM1700.89 358.256C1692.66 358.946 1684.44 360.327 1676.73 363.261C1669.02 366.282 1661.99 370.77 1656.34 376.724C1651.54 381.783 1648.18 386.118 1647.24 392.537C1647.05 393.797 1648.19 394.805 1649.44 394.598L1745.57 378.773C1747.09 378.523 1747.77 376.713 1746.77 375.537C1739.56 367.049 1735.18 363.321 1727.92 360.962C1721.37 358.836 1711.9 357.388 1700.89 358.256Z"
            ></path>
            <path
              className={`st7 ${tooth65Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1676.73 363.261C1684.44 360.327 1692.66 358.946 1700.89 358.256C1711.9 357.388 1721.37 358.836 1727.92 360.962C1735.18 363.321 1739.56 367.049 1746.77 375.537C1747.77 376.713 1747.09 378.523 1745.57 378.773L1649.44 394.598C1648.19 394.805 1647.05 393.797 1647.24 392.537C1648.18 386.118 1651.54 381.783 1656.34 376.724C1661.99 370.77 1669.02 366.282 1676.73 363.261Z"
              style={{ fill: 'rgb(255, 255, 255)', opacity: 0.7 }}
            ></path>
            <path
              className={`st60
                                    ${tooth65Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth65Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth65Diagnozis.seal_cervical_color}
                                `}
              d="M1676.73 363.261C1684.44 360.327 1692.66 358.946 1700.89 358.256C1711.9 357.388 1721.37 358.836 1727.92 360.962C1735.18 363.321 1739.56 367.049 1746.77 375.537C1747.77 376.713 1747.09 378.523 1745.57 378.773L1649.44 394.598C1648.19 394.805 1647.05 393.797 1647.24 392.537C1648.18 386.118 1651.54 381.783 1656.34 376.724C1661.99 370.77 1669.02 366.282 1676.73 363.261Z"
              style={{
                opacity: 0,
                stroke: 'rgb(156, 156, 156)',
                strokeWidth: 2,
              }}
            ></path>
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth65.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1638 408L1639 407L1639.5 406.5L1640 405.5L1641 403.5L1642 400.5L1643 398.5V396.5L1644.5 392L1645 388L1647.5 383.5L1651 378.5L1654 375.5L1657 371L1660 370L1664.5 368L1668.5 364L1674 362.5L1678 360H1683L1690 358L1696.5 356H1702L1706.5 355H1711.5L1715 356L1719 357L1725 358L1731 360H1733L1736 361L1738.5 364L1741.5 366L1744.5 369L1747 373L1753 377L1754.5 380L1756.5 381.5L1758.5 382.5L1761.5 387L1763 388L1764.5 389H1766.5L1765.5 385.5L1764.5 383.5L1762.5 380.5L1761.5 378.5L1759.5 377L1758.5 375.5L1757.5 373L1756.5 370L1754.5 368L1753 366L1751 362.5L1747 360V358L1744.5 355L1742.5 352.5L1740.5 350L1738.5 348.5L1736.5 346L1734.5 343L1731 342H1727L1721.5 340L1716.5 339L1711.5 340H1706.5L1702 338L1696.5 340H1692H1688H1683L1678 342H1674L1668.5 344H1665L1660 345.5L1657 348.5L1651 350L1647.5 352.5L1643 355L1639.5 360L1635.5 364L1637 368L1635.5 373V377L1635 380L1634 383.5L1635.5 388L1635 393L1637 397V400.5V405.5L1638 408Z"
            ></path>
            <path
              className="st61 level1"
              d="M1638 408L1639 407L1639.5 406.5L1640 405.5L1641 403.5L1642 400.5L1643 398.5V396.5L1644.5 392L1645 388L1647.5 383.5L1651 378.5L1654 375.5L1657 371L1660 370L1664.5 368L1668.5 364L1674 362.5L1678 360H1683L1690 358L1696.5 356H1702L1706.5 355H1711.5L1715 356L1719 357L1725 358L1731 360H1733L1736 361L1738.5 364L1741.5 366L1744.5 369L1747 373L1753 377L1754.5 380L1756.5 381.5L1758.5 382.5L1761.5 387L1763 388L1764.5 389H1766.5V387L1763 383.5L1760.5 378L1757 372L1753 369L1750.5 364L1744.5 358L1742.5 354.5L1739 352.75L1734.5 352L1727 350H1719L1711.5 349L1704 348L1697.5 349L1690 350H1684.5L1678 352L1670 355L1666 358L1658.5 360L1654 364L1651 366L1647.5 368L1644.5 371L1643 373.5L1642 376.5L1639.5 379.5L1637 382L1636 383.5V386L1637 390V393L1638 395.5L1637.5 398L1638 400.5V403L1638 405L1638 408Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling"
            style={{ visibility: 'inherit' }}
          >
            {/*КАРИЕС CENTER*/}
            <g
              data-position={'65_5'}
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M1752.6,451.1l-2.1,0.8c-3.6-2-7.6-3.1-11.8-3.5c-6.5-0.5-13.3,1.1-19.2-1.9c-3.6-1.8-6.2-5.1-8.1-8.7
                                c-1.3-2.5-2.4-5.1-3.1-7.8l-1.9-0.1c1.2,2.2,2.1,4.5,2.8,6.9c0.9,3.4,1.3,7,0,10.2c-3.6,8.8-15.5,9.1-21.6,15.8
                                c-4-7.5-13.4-24.8-20.7-38.1c3.4-3.4,8.2-7.6,13.2-10.1c12.9-6.5,36.7-12.3,58.7-7.1C1743.9,424,1749.8,442.5,1752.6,451.1z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth65.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth65.seal_center ? `seal-fill ${teethDiagnozis.tooth65.seal_center_color}` : ''}
                            `}
                d="M1752.6,451.1l-2.1,0.8c-3.6-2-7.6-3.1-11.8-3.5c-6.5-0.5-13.3,1.1-19.2-1.9c-3.6-1.8-6.2-5.1-8.1-8.7
                                c-1.3-2.5-2.4-5.1-3.1-7.8l-1.9-0.1c1.2,2.2,2.1,4.5,2.8,6.9c0.9,3.4,1.3,7,0,10.2c-3.6,8.8-15.5,9.1-21.6,15.8
                                c-4-7.5-13.4-24.8-20.7-38.1c3.4-3.4,8.2-7.6,13.2-10.1c12.9-6.5,36.7-12.3,58.7-7.1C1743.9,424,1749.8,442.5,1752.6,451.1z"
              />
            </g>
            {/*КАРИЕС CENTER*/}
            <g
              data-position={'65_4'}
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1687.6,462.8c-0.2,0.2-0.4,0.5-0.6,0.7c-1.2,1.6-2.1,3.4-2.6,5.3l-5.4,1c-4.4-0.9-8.8-2.1-13-3.8
                                c-9.1-3.6-17.6-9-23.4-16.9c-1-1.3-1.9-2.7-2.7-4.1c-2-6.5-3-13.2-3.2-20c-0.1-5.8,0.5-11.6,0.9-17.4c0.4-5.3,0.7-10.7,0.9-16.1
                                c6,4.7,16.5,13.1,18.7,16.3c1,1.5,4.9,8.3,9.5,16.8C1674.2,438,1683.5,455.3,1687.6,462.8z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth65.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth65.seal_left ? `seal-fill ${teethDiagnozis.tooth65.seal_left_color}` : ''}
                            `}
                d="M1687.6,462.8c-0.2,0.2-0.4,0.5-0.6,0.7c-1.2,1.6-2.1,3.4-2.6,5.3l-5.4,1c-4.4-0.9-8.8-2.1-13-3.8
                                c-9.1-3.6-17.6-9-23.4-16.9c-1-1.3-1.9-2.7-2.7-4.1c-2-6.5-3-13.2-3.2-20c-0.1-5.8,0.5-11.6,0.9-17.4c0.4-5.3,0.7-10.7,0.9-16.1
                                c6,4.7,16.5,13.1,18.7,16.3c1,1.5,4.9,8.3,9.5,16.8C1674.2,438,1683.5,455.3,1687.6,462.8z"
              />
            </g>
            {/*КАРИЕС У BOTTOM*/}
            <g
              data-position={'65_2'}
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className={`st8 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${tooth65Diagnozis.caries_bottom ? 'caries-fill' : ''}
                                ${tooth65Diagnozis.seal_bottom ? `seal-fill ${teethDiagnozis.tooth65.seal_bottom_color}` : ''}
                            `}
                d="M1738.8,407.6c-22-5.2-45.8,0.6-58.7,7.1c-4.9,2.5-9.7,6.7-13.2,10.1c-4.7-8.5-8.5-15.3-9.5-16.8
                                c-2.2-3.2-12.7-11.6-18.7-16.3c0-0.4,0-0.8,0-1.2c2.8-5.6,6.3-10.8,10.7-15.3c6.7-6.9,14.8-12.1,23.8-15.6
                                c9-3.5,18.6-5.1,28.2-5.8c11.5-0.9,23.1-0.7,34.6,0.7c0.1,0,0.1,0.1,0.1,0.1c-2.4,6.9-6.8,19.7-6.8,21.7
                                C1729.3,377.3,1733.7,391.5,1738.8,407.6z"
              />
              <path
                className={`st58 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${tooth65Diagnozis.caries_bottom ? 'caries-fill' : ''}
                                ${tooth65Diagnozis.seal_bottom ? `seal-fill ${teethDiagnozis.tooth65.seal_bottom_color}` : ''}
                            `}
                d="M1738.8,407.6c-22-5.2-45.8,0.6-58.7,7.1c-4.9,2.5-9.7,6.7-13.2,10.1c-4.7-8.5-8.5-15.3-9.5-16.8
                                c-2.2-3.2-12.7-11.6-18.7-16.3c0-0.4,0-0.8,0-1.2c2.8-5.6,6.3-10.8,10.7-15.3c6.7-6.9,14.8-12.1,23.8-15.6
                                c9-3.5,18.6-5.1,28.2-5.8c11.5-0.9,23.1-0.7,34.6,0.7c0.1,0,0.1,0.1,0.1,0.1c-2.4,6.9-6.8,19.7-6.8,21.7
                                C1729.3,377.3,1733.7,391.5,1738.8,407.6z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              data-position={'65_3'}
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M1770,409.8c-0.1,2.1-0.1,4.1-0.2,6.2c-0.9,12.6-5.9,24.6-14.3,34l-2.9,1.1c-2.8-8.6-8.7-27-13.8-43.5
                                c-5.1-16.1-9.4-30.3-9.4-31.4c0-1.9,4.4-14.8,6.8-21.7c9.4,8.5,18,17.7,25.8,27.7c2.7,3.5,5.4,7.1,6.8,11.3
                                C1770.5,398.7,1770.2,404.3,1770,409.8z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth65.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth65.seal_right ? `seal-fill ${teethDiagnozis.tooth65.seal_right_color}` : ''}
                            `}
                d="M1770,409.8c-0.1,2.1-0.1,4.1-0.2,6.2c-0.9,12.6-5.9,24.6-14.3,34l-2.9,1.1c-2.8-8.6-8.7-27-13.8-43.5
                                c-5.1-16.1-9.4-30.3-9.4-31.4c0-1.9,4.4-14.8,6.8-21.7c9.4,8.5,18,17.7,25.8,27.7c2.7,3.5,5.4,7.1,6.8,11.3
                                C1770.5,398.7,1770.2,404.3,1770,409.8z"
              />
            </g>

            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_right &&
                      !tooth65Diagnozis.seal_top &&
                      !tooth65Diagnozis.seal_center) ||
                    (tooth65Diagnozis.seal_right &&
                      tooth65Diagnozis.seal_top &&
                      !tooth65Diagnozis.seal_center) ||
                    (!tooth65Diagnozis.seal_right &&
                      tooth65Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1739.5 407L1751.5 446"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_right &&
                      !tooth65Diagnozis.seal_bottom) ||
                    (!tooth65Diagnozis.seal_right &&
                      tooth65Diagnozis.seal_bottom &&
                      !tooth65Diagnozis.seal_center) ||
                    (!tooth65Diagnozis.seal_right &&
                      tooth65Diagnozis.seal_bottom &&
                      tooth65Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1739.5 407C1730.5 379.5 1726.6 377.9 1735 359.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_bottom &&
                      !tooth65Diagnozis.seal_center) ||
                    (tooth65Diagnozis.seal_right &&
                      tooth65Diagnozis.seal_left &&
                      tooth65Diagnozis.seal_center &&
                      !tooth65Diagnozis.seal_bottom) ||
                    (!tooth65Diagnozis.seal_bottom &&
                      !tooth65Diagnozis.seal_top &&
                      tooth65Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1739.5 407C1722.5 402.999 1683.5 411 1667.5 425"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_left &&
                      !tooth65Diagnozis.seal_bottom) ||
                    (!tooth65Diagnozis.seal_left &&
                      tooth65Diagnozis.seal_bottom &&
                      !tooth65Diagnozis.seal_center) ||
                    (!tooth65Diagnozis.seal_left &&
                      tooth65Diagnozis.seal_bottom &&
                      tooth65Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1667.5 425C1656.39 405.109 1657.04 402.656 1644 395.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth65Diagnozis.seal_left &&
                      !tooth65Diagnozis.seal_top &&
                      !tooth65Diagnozis.seal_center) ||
                    (tooth65Diagnozis.seal_left &&
                      tooth65Diagnozis.seal_top &&
                      !tooth65Diagnozis.seal_center) ||
                    (!tooth65Diagnozis.seal_left &&
                      tooth65Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1667.5 425L1685.5 457.5"
              />
            </g>
          </g>
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth65Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth65Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth65Diagnozis.vinir_color}`}
                d="M1768.7 393.399C1767.3 389.199 1764.7 385.599 1761.9 382.099C1754.1 372.099 1745.5 362.899 1736.1 354.399C1736 354.399 1736 354.299 1736 354.299C1724.5 352.899 1712.9 352.699 1701.4 353.599C1691.8 354.399 1682.2 355.999 1673.2 359.399C1664.2 362.899 1656 368.099 1649.4 374.999C1645.1 379.499 1641.5 384.699 1638.7 390.299C1638.7 390.699 1638.7 391.099 1638.7 391.499C1638.5 396.899 1638.2 402.199 1637.8 407.599C1637.4 413.399 1636.8 419.199 1636.9 424.999C1637 431.799 1638.1 438.499 1640.1 444.999C1640.9 446.399 1641.8 447.799 1642.8 449.099C1648.6 456.999 1657 462.399 1666.2 465.999C1670.4 467.699 1674.8 468.899 1679.2 469.799L1684.6 468.799C1685 466.899 1685.9 464.999 1687.2 463.499C1687.4 463.299 1687.6 462.999 1687.8 462.799C1693.9 456.099 1705.8 455.799 1709.4 446.999C1710.7 443.799 1710.4 440.099 1709.4 436.799C1708.7 434.399 1707.8 432.099 1706.6 429.899L1708.5 429.999C1709.2 432.699 1710.3 435.399 1711.6 437.799C1713.5 441.399 1716.1 444.699 1719.7 446.499C1725.6 449.499 1732.4 447.899 1738.9 448.399C1743 448.699 1747 449.899 1750.7 451.899L1752.8 451.099L1755.7 449.999C1764.1 440.599 1769.1 428.599 1770 415.999C1770.1 413.899 1770.2 411.899 1770.2 409.799C1770.2 404.299 1770.5 398.699 1768.7 393.399Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА/КЕРАМІЧНА/МЕТАЛОКЕРАМІЧНА КОРОНКА*/}
          <g
            className="crown"
            style={{
              visibility:
                tooth65Diagnozis.temporary_crown ||
                tooth65Diagnozis.ceramic_crown ||
                tooth65Diagnozis.mceramic_crown ||
                tooth65Diagnozis.metalic_crown ||
                tooth65Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth65Diagnozis.temporary_crown ||
                tooth65Diagnozis.ceramic_crown ||
                tooth65Diagnozis.mceramic_crown ||
                tooth65Diagnozis.metalic_crown ||
                tooth65Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`
                                temporary-crown crown-fill
                                ${diagnozis}
                                ${tooth65Diagnozis.ceramic_crown_color}
                                ${tooth65Diagnozis.mceramic_crown_color}
                                ${tooth65Diagnozis.metalic_crown_color}
                                ${tooth65Diagnozis.zirconia_crown_color}
                            `}
              d="M1768.7,393.4c-1.4-4.2-4-7.8-6.8-11.3c-7.8-10-16.4-19.2-25.8-27.7
                            c-0.1,0-0.1-0.1-0.1-0.1c-11.5-1.4-23.1-1.6-34.6-0.7c-9.6,0.8-19.2,2.4-28.2,5.8c-9,3.5-17.2,8.7-23.8,15.6
                            c-4.3,4.5-7.9,9.7-10.7,15.3c0,0.4,0,0.8,0,1.2c-0.2,5.4-0.5,10.7-0.9,16.1c-0.4,5.8-1,11.6-0.9,17.4c0.1,6.8,1.2,13.5,3.2,20
                            c0.8,1.4,1.7,2.8,2.7,4.1c5.8,7.9,14.2,13.3,23.4,16.9c4.2,1.7,8.6,2.9,13,3.8l5.4-1c0.4-1.9,1.3-3.8,2.6-5.3
                            c0.2-0.2,0.4-0.5,0.6-0.7c6.1-6.7,18-7,21.6-15.8c1.3-3.2,1-6.9,0-10.2c-0.7-2.4-1.6-4.7-2.8-6.9l1.9,0.1c0.7,2.7,1.8,5.4,3.1,7.8
                            c1.9,3.6,4.5,6.9,8.1,8.7c5.9,3,12.7,1.4,19.2,1.9c4.1,0.3,8.1,1.5,11.8,3.5l2.1-0.8l2.9-1.1c8.4-9.4,13.4-21.4,14.3-34
                            c0.1-2.1,0.2-4.1,0.2-6.2C1770.2,404.3,1770.5,398.7,1768.7,393.4z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
