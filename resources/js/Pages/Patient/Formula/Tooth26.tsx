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
  allTeethAdultSelector,
  getActiveToothNumberSelector,
} from '../../../Redux/Formula/selectors';
import setupDiagnoze from '../../../lib/tfunctions';
import PeriodontitStage26 from './periodontit26';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth26() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth26Diagnozis = teethDiagnozis.tooth26;
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
  const allTeeth = useSelector(allTeethAdultSelector);

  const setColordedPart = (diagnozis, toothPart = '') => {
    if (diagnozis === 'caries') {
      if (toothPart === 'bottom') {
        teethDiagnozis.tooth26.caries_bottom =
          !teethDiagnozis.tooth26.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth26.caries_center =
          !teethDiagnozis.tooth26.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth26.caries_left =
          !teethDiagnozis.tooth26.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth26.caries_right =
          !teethDiagnozis.tooth26.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth26.caries_top = !teethDiagnozis.tooth26.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth26.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth26.seal_center_color = sealColor1;
          teethDiagnozis.tooth26.seal_center = true;
        } else if (
          teethDiagnozis.tooth26.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth26.seal_center_color = sealColor2;
          teethDiagnozis.tooth26.seal_center = true;
        } else if (
          teethDiagnozis.tooth26.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth26.seal_center_color = sealColor3;
          teethDiagnozis.tooth26.seal_center = true;
        } else {
          teethDiagnozis.tooth26.seal_center =
            !teethDiagnozis.tooth26.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth26.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth26.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth26.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth26.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth26.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth26.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth26.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth26.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth26.seal_bottom = true;
        } else {
          teethDiagnozis.tooth26.seal_bottom =
            !teethDiagnozis.tooth26.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth26.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth26.seal_left_color = sealColor1;
          teethDiagnozis.tooth26.seal_left = true;
        } else if (
          teethDiagnozis.tooth26.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth26.seal_left_color = sealColor2;
          teethDiagnozis.tooth26.seal_left = true;
        } else if (
          teethDiagnozis.tooth26.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth26.seal_left_color = sealColor3;
          teethDiagnozis.tooth26.seal_left = true;
        } else {
          teethDiagnozis.tooth26.seal_left = !teethDiagnozis.tooth26.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth26.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth26.seal_right_color = sealColor1;
          teethDiagnozis.tooth26.seal_right = true;
        } else if (
          teethDiagnozis.tooth26.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth26.seal_right_color = sealColor2;
          teethDiagnozis.tooth26.seal_right = true;
        } else if (
          teethDiagnozis.tooth26.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth26.seal_right_color = sealColor3;
          teethDiagnozis.tooth26.seal_right = true;
        } else {
          teethDiagnozis.tooth26.seal_right =
            !teethDiagnozis.tooth26.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth26.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth26.seal_top_color = sealColor1;
          teethDiagnozis.tooth26.seal_top = true;
        } else if (
          teethDiagnozis.tooth26.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth26.seal_top_color = sealColor2;
          teethDiagnozis.tooth26.seal_top = true;
        } else if (
          teethDiagnozis.tooth26.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth26.seal_top_color = sealColor3;
          teethDiagnozis.tooth26.seal_top = true;
        } else {
          teethDiagnozis.tooth26.seal_top = !teethDiagnozis.tooth26.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth26.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth26.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth26.wedge_shaped_defect_color =
          !teethDiagnozis.tooth26.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth26.show) {
        document.getElementById('TH-26').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth26.show) {
        document.getElementById('TH-26').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="26"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1549.5791 716.1968)"
          className={`st3 st4 st5 ${selectedTooth === 26 ? 'num-active' : ''}`}
        >
          26
        </text>
      </g>
      <g
        id="TH-26"
        className={`f-tooth-init ${(teethDiagnozis.tooth26.show || allTeeth) && !teethDiagnozis.tooth26.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          teethDiagnozis.tooth26.show = !teethDiagnozis.tooth26.show;

          dispatch(setSelectedToothNumber(26));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              26,
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
        }}
      >
        <g
          className={`underlay ${selectedTooth === 26 ? 'selected' : ''}`}
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideTeeth('over');
          }}
          onMouseLeave={() => {
            showHideTeeth('leave');
          }}
        >
          <path
            className="st40"
            d="M1487,281.9c0,0-8,36-8,50s3.9,48.9,4.4,59c0.6,10,5.6,48,6.6,63s6,33,13,45
                        s-7,27-10,42s-2.6,30.7-1.8,48.8s11.8,82.2,21.8,108.2c6,15.6,20,38,57,38c35,0,63-20,73-46s11-55,6-69c-2.8-7.8-17-44-19-60
                        s-13.6-49.9-12-63c2-16,12-25,16-37c3.8-11.4,5-18,3-32s-10-33-17-50s-13-32-10-60c1.9-17.7,1.6-37.4-6.3-53.8
                        c-9.7-20.2-33.8-27.3-54.7-28.2C1527,235.9,1496,245.9,1487,281.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: tooth26Diagnozis.absent ? 'hidden' : 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideTeeth('over');
          }}
          onMouseLeave={() => {
            showHideTeeth('leave');
          }}
        >
          {/* CHANGE COLOR/APEX/CULTTAB */}
          <g
            className={`hEmpty hRoot hImplant`}
            style={{
              visibility:
                !tooth26Diagnozis.culttab &&
                !tooth26Diagnozis.implant &&
                !tooth26Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="hEmpty hRoot hImplant"
              style={{ visibility: 'inherit' }}
            >
              <path
                className={`st24 change-color ${tooth26Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1636,607.2c-1.5-3.5-3.3-6.9-4.8-10.3c-3.9-8.9-6.2-18.9-11.7-27.4
                                c-5.3-8.3-13.2-14.8-24.9-17.1c-9.5-1.9-19.5,0.1-29.4-0.3c-5.1-0.2-10.4-1-15.4-1.6c-17.3-2.3-35.1-1.8-44.5,9.5
                                c-2.7,3.2-4,6.9-4.8,10.6c-1.6,7.2-1.4,14.4-0.4,21.6c1.4,10.4,4.2,20.9,9.2,30.6c3.9,7.4,9.1,14.4,17.7,18.9
                                c7.3,3.8,16.2,5,24.9,4.2c4.9-0.5,9.7-1.7,14.7-1.6c8.6,0.1,16.3,3.9,24.7,5.2c5.3,0.9,10.8,0.8,16.1,0c5.6-0.8,11-2.2,15.9-4.5
                                c5.4-2.6,9.9-6.3,12.6-10.8C1641.1,625.8,1639.8,616.1,1636,607.2z"
              />
            </g>
            <g
              className="dentin"
              style={{
                visibility:
                  tooth26Diagnozis?.apex || tooth26Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth26Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth26Diagnozis?.apex ? 'apex' : ''}`}
                d="M1635.6 607.2C1634.1 603.7 1632.3 600.3 1630.8 596.9C1626.91 588 1624.61 578 1619.11 569.5C1613.81 561.2 1605.92 554.7 1594.22 552.4C1584.73 550.5 1574.74 552.5 1564.84 552.1C1559.74 551.9 1554.45 551.1 1549.45 550.5C1532.16 548.2 1514.37 548.7 1504.97 560C1502.27 563.2 1500.98 566.9 1500.18 570.6C1498.58 577.8 1498.78 585 1499.78 592.2C1501.18 602.6 1503.97 613.1 1508.97 622.8C1512.87 630.2 1518.07 637.2 1526.66 641.7C1533.96 645.5 1542.85 646.7 1551.55 645.9C1556.45 645.4 1561.24 644.2 1566.24 644.3C1574.84 644.4 1582.53 648.2 1590.93 649.5C1596.22 650.4 1601.72 650.3 1607.02 649.5C1612.61 648.7 1618.01 647.3 1622.91 645C1628.31 642.4 1632.8 638.7 1635.5 634.2C1640.7 625.8 1639.4 616.1 1635.6 607.2Z"
              />
              <path
                className={`st53 change-color ${tooth26Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth26Diagnozis?.apex ? 'apex' : ''}`}
                d="M1603.33 588.108C1603.33 604.978 1607.18 623 1588.48 623C1580.07 623 1571.77 613.671 1561.23 608.158C1546.61 600.512 1530.66 600.403 1530.66 588.108C1530.66 575.812 1546.51 578.474 1566.57 578.474C1586.64 578.474 1599.59 574.763 1603.33 588.108Z"
              />
            </g>
          </g>
          {/* PULPIT */}
          <g
            className="pulp"
            style={{ visibility: tooth26Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth26Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <ellipse
                className="st22 target"
                rx="8.35873"
                ry="8.88548"
                transform="matrix(0.20079 0.979634 -0.979591 0.201001 1589.24 611.974)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="7.49795"
                ry="8.49071"
                transform="matrix(0.462479 -0.88663 0.886423 0.462876 1590.63 588.578)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="7.52553"
                ry="9.0049"
                transform="matrix(0.639533 0.768764 -0.768421 0.639945 1543.54 588.522)"
                style={{ fill: '#e80808' }}
              ></ellipse>
            </g>
          </g>
          {/* IMPLANT */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth26Diagnozis.implant || tooth26Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1566.5" cy="598.5" r="26.5" />
            <g className="st27">
              <mask id="implant_26" className="st49">
                <path
                  className="st50"
                  d="M1552.9 582.474L1549.46 581.352C1546.53 584.3 1544.35 587.994 1543.23 592.124L1545.93 594.55C1545.69 595.829 1545.56 597.15 1545.56 598.5C1545.56 599.85 1545.69 601.17 1545.93 602.45L1543.23 604.875C1544.35 609.006 1546.53 612.7 1549.46 615.648L1552.91 614.525C1554.9 616.242 1557.21 617.594 1559.74 618.478L1560.49 622.024C1562.48 622.548 1564.56 622.827 1566.71 622.827C1568.86 622.827 1570.95 622.548 1572.94 622.024L1573.69 618.477C1576.22 617.593 1578.53 616.241 1580.52 614.525L1583.97 615.647C1586.9 612.699 1589.08 609.004 1590.2 604.874L1587.5 602.448C1587.74 601.169 1587.87 599.849 1587.87 598.5C1587.87 597.15 1587.74 595.831 1587.5 594.552L1590.2 592.126C1589.08 587.995 1586.9 584.301 1583.97 581.352L1580.52 582.475C1578.53 580.758 1576.22 579.406 1573.69 578.522L1572.94 574.976C1570.95 574.452 1568.86 574.173 1566.71 574.173C1564.56 574.173 1562.48 574.452 1560.49 574.975L1559.74 578.521C1557.21 579.405 1554.9 580.758 1552.9 582.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1552.9 582.474L1549.46 581.352C1546.53 584.3 1544.35 587.994 1543.23 592.124L1545.93 594.55C1545.69 595.829 1545.56 597.15 1545.56 598.5C1545.56 599.85 1545.69 601.17 1545.93 602.45L1543.23 604.875C1544.35 609.006 1546.53 612.7 1549.46 615.648L1552.91 614.525C1554.9 616.242 1557.21 617.594 1559.74 618.478L1560.49 622.024C1562.48 622.548 1564.56 622.827 1566.71 622.827C1568.86 622.827 1570.95 622.548 1572.94 622.024L1573.69 618.477C1576.22 617.593 1578.53 616.241 1580.52 614.525L1583.97 615.647C1586.9 612.699 1589.08 609.004 1590.2 604.874L1587.5 602.448C1587.74 601.169 1587.87 599.849 1587.87 598.5C1587.87 597.15 1587.74 595.831 1587.5 594.552L1590.2 592.126C1589.08 587.995 1586.9 584.301 1583.97 581.352L1580.52 582.475C1578.53 580.758 1576.22 579.406 1573.69 578.522L1572.94 574.976C1570.95 574.452 1568.86 574.173 1566.71 574.173C1564.56 574.173 1562.48 574.452 1560.49 574.975L1559.74 578.521C1557.21 579.405 1554.9 580.758 1552.9 582.474Z"
              ></path>
              <path
                className="st52"
                d="M1549.46 581.352L1550.08 579.45L1548.91 579.069L1548.04 579.942L1549.46 581.352ZM1552.9 582.474L1552.29 584.376L1553.36 584.725L1554.21 583.989L1552.9 582.474ZM1543.23 592.124L1541.3 591.601L1540.98 592.789L1541.89 593.611L1543.23 592.124ZM1545.93 594.55L1547.89 594.921L1548.1 593.815L1547.27 593.063L1545.93 594.55ZM1545.93 602.45L1547.27 603.937L1548.1 603.184L1547.89 602.079L1545.93 602.45ZM1543.23 604.875L1541.89 603.388L1540.98 604.211L1541.3 605.398L1543.23 604.875ZM1549.46 615.648L1548.04 617.057L1548.91 617.93L1550.08 617.549L1549.46 615.648ZM1552.91 614.525L1554.21 613.011L1553.36 612.275L1552.29 612.624L1552.91 614.525ZM1559.74 618.478L1561.7 618.063L1561.47 616.961L1560.4 616.59L1559.74 618.478ZM1560.49 622.024L1558.54 622.439L1558.79 623.644L1559.98 623.958L1560.49 622.024ZM1572.94 622.024L1573.45 623.958L1574.64 623.643L1574.89 622.438L1572.94 622.024ZM1573.69 618.477L1573.03 616.589L1571.96 616.96L1571.73 618.063L1573.69 618.477ZM1580.52 614.525L1581.14 612.623L1580.07 612.274L1579.22 613.01L1580.52 614.525ZM1583.97 615.647L1583.35 617.549L1584.52 617.93L1585.39 617.057L1583.97 615.647ZM1590.2 604.874L1592.13 605.396L1592.45 604.209L1591.53 603.386L1590.2 604.874ZM1587.5 602.448L1585.53 602.077L1585.33 603.183L1586.16 603.935L1587.5 602.448ZM1587.5 594.552L1586.16 593.064L1585.33 593.817L1585.53 594.923L1587.5 594.552ZM1590.2 592.126L1591.53 593.613L1592.45 592.791L1592.13 591.603L1590.2 592.126ZM1583.97 581.352L1585.39 579.943L1584.52 579.07L1583.35 579.451L1583.97 581.352ZM1580.52 582.475L1579.22 583.989L1580.07 584.726L1581.14 584.376L1580.52 582.475ZM1573.69 578.522L1571.73 578.937L1571.96 580.039L1573.03 580.411L1573.69 578.522ZM1572.94 574.976L1574.89 574.561L1574.64 573.356L1573.45 573.042L1572.94 574.976ZM1560.49 574.975L1559.98 573.041L1558.79 573.355L1558.54 574.561L1560.49 574.975ZM1559.74 578.521L1560.4 580.41L1561.47 580.039L1561.7 578.936L1559.74 578.521ZM1548.84 583.254L1552.29 584.376L1553.52 580.573L1550.08 579.45L1548.84 583.254ZM1545.16 592.647C1546.19 588.86 1548.19 585.469 1550.88 582.762L1548.04 579.942C1544.87 583.13 1542.51 587.128 1541.3 591.601L1545.16 592.647ZM1547.27 593.063L1544.57 590.637L1541.89 593.611L1544.59 596.037L1547.27 593.063ZM1547.56 598.5C1547.56 597.275 1547.67 596.079 1547.89 594.921L1543.96 594.179C1543.7 595.58 1543.56 597.025 1543.56 598.5H1547.56ZM1547.89 602.079C1547.67 600.921 1547.56 599.725 1547.56 598.5H1543.56C1543.56 599.975 1543.7 601.42 1543.96 602.821L1547.89 602.079ZM1544.57 606.362L1547.27 603.937L1544.59 600.963L1541.89 603.388L1544.57 606.362ZM1550.88 614.238C1548.19 611.53 1546.19 608.14 1545.16 604.352L1541.3 605.398C1542.51 609.872 1544.87 613.869 1548.04 617.057L1550.88 614.238ZM1552.29 612.624L1548.84 613.746L1550.08 617.549L1553.52 616.427L1552.29 612.624ZM1560.4 616.59C1558.11 615.79 1556.01 614.566 1554.21 613.011L1551.6 616.04C1553.78 617.918 1556.31 619.398 1559.08 620.366L1560.4 616.59ZM1562.45 621.61L1561.7 618.063L1557.79 618.893L1558.54 622.439L1562.45 621.61ZM1566.71 620.827C1564.74 620.827 1562.82 620.57 1561 620.09L1559.98 623.958C1562.13 624.525 1564.39 624.827 1566.71 624.827V620.827ZM1572.43 620.09C1570.6 620.57 1568.69 620.827 1566.71 620.827V624.827C1569.04 624.827 1571.3 624.525 1573.45 623.958L1572.43 620.09ZM1571.73 618.063L1570.98 621.609L1574.89 622.438L1575.64 618.892L1571.73 618.063ZM1579.22 613.01C1577.41 614.565 1575.32 615.789 1573.03 616.589L1574.35 620.365C1577.12 619.397 1579.65 617.917 1581.83 616.039L1579.22 613.01ZM1584.59 613.745L1581.14 612.623L1579.9 616.426L1583.35 617.549L1584.59 613.745ZM1588.27 604.351C1587.24 608.139 1585.24 611.53 1582.55 614.237L1585.39 617.057C1588.56 613.868 1590.92 609.87 1592.13 605.396L1588.27 604.351ZM1586.16 603.935L1588.86 606.361L1591.53 603.386L1588.84 600.961L1586.16 603.935ZM1585.87 598.5C1585.87 599.724 1585.75 600.92 1585.53 602.077L1589.47 602.819C1589.73 601.418 1589.87 599.974 1589.87 598.5H1585.87ZM1585.53 594.923C1585.75 596.08 1585.87 597.276 1585.87 598.5H1589.87C1589.87 597.025 1589.73 595.581 1589.47 594.18L1585.53 594.923ZM1588.86 590.639L1586.16 593.064L1588.84 596.039L1591.53 593.613L1588.86 590.639ZM1582.55 582.762C1585.24 585.47 1587.24 588.861 1588.27 592.649L1592.13 591.603C1590.92 587.129 1588.56 583.131 1585.39 579.943L1582.55 582.762ZM1581.14 584.376L1584.59 583.254L1583.35 579.451L1579.9 580.573L1581.14 584.376ZM1573.03 580.411C1575.32 581.21 1577.41 582.434 1579.22 583.989L1581.83 580.96C1579.65 579.083 1577.12 577.602 1574.35 576.634L1573.03 580.411ZM1570.98 575.39L1571.73 578.937L1575.64 578.108L1574.89 574.561L1570.98 575.39ZM1566.71 576.173C1568.69 576.173 1570.6 576.429 1572.43 576.91L1573.45 573.042C1571.3 572.475 1569.04 572.173 1566.71 572.173V576.173ZM1561 576.909C1562.82 576.429 1564.74 576.173 1566.71 576.173V572.173C1564.39 572.173 1562.13 572.474 1559.98 573.041L1561 576.909ZM1561.7 578.936L1562.45 575.39L1558.54 574.561L1557.79 578.107L1561.7 578.936ZM1554.21 583.989C1556.01 582.433 1558.11 581.209 1560.4 580.41L1559.08 576.633C1556.31 577.601 1553.78 579.082 1551.6 580.96L1554.21 583.989Z"
                mask="url(#implant_26)"
              ></path>
            </g>
          </g>
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle
              className="st44"
              r="28.5"
              transform="matrix(-1 0 0 1 1566.5 598.5)"
            />
            <path
              className="st45"
              d="M1568.42 589.739C1567.87 587.804 1565.13 587.804 1564.58 589.739L1564.07 591.511C1563.77 592.549 1562.71 593.164 1561.66 592.902L1559.87 592.454C1557.92 591.965 1556.55 594.339 1557.95 595.785L1559.23 597.109C1559.98 597.884 1559.98 599.116 1559.23 599.891L1557.95 601.215C1556.55 602.661 1557.92 605.035 1559.87 604.546L1561.66 604.098C1562.71 603.836 1563.77 604.451 1564.07 605.489L1564.58 607.261C1565.13 609.196 1567.87 609.196 1568.42 607.261L1568.93 605.489C1569.23 604.451 1570.29 603.836 1571.34 604.098L1573.13 604.546C1575.08 605.035 1576.45 602.661 1575.05 601.215L1573.77 599.891C1573.02 599.116 1573.02 597.884 1573.77 597.109L1575.05 595.785C1576.45 594.339 1575.08 591.965 1573.13 592.454L1571.34 592.902C1570.29 593.164 1569.23 592.549 1568.93 591.511L1568.42 589.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth26Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth26Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1635.41 607.2C1633.91 603.7 1632.11 600.3 1630.61 596.9C1626.71 588 1624.41 578 1618.91 569.5C1613.61 561.2 1605.71 554.7 1594.01 552.4C1584.51 550.5 1574.51 552.5 1564.61 552.1C1559.51 551.9 1554.21 551.1 1549.21 550.5C1531.91 548.2 1514.11 548.7 1504.71 560C1502.01 563.2 1500.71 566.9 1499.91 570.6C1498.31 577.8 1498.51 585 1499.51 592.2C1500.91 602.6 1503.71 613.1 1508.71 622.8C1512.61 630.2 1517.81 637.2 1526.41 641.7C1533.71 645.5 1542.61 646.7 1551.31 645.9C1556.21 645.4 1561.01 644.2 1566.01 644.3C1574.61 644.4 1582.31 648.2 1590.71 649.5C1596.01 650.4 1601.51 650.3 1606.81 649.5C1612.41 648.7 1617.81 647.3 1622.71 645C1628.11 
                            642.4 1632.61 638.7 1635.31 634.2C1640.41 625.8 1639.11 616.1 1635.41 607.2Z"
            />
            <path
              className="st47"
              d="M1618.01 605.458C1616.9 602.887 1615.58 600.39 1614.48 597.892C1611.6 591.354 1609.91 584.009 1605.86 577.765C1601.96 571.668 1596.15 566.893 1587.54 565.203C1580.54 563.808 1573.18 565.277 1565.9 564.983C1562.14 564.836 1558.24 564.248 1554.56 563.808C1541.83 562.118 1528.73 562.485 1521.81 570.786C1519.82 573.137 1518.87 575.855 1518.28 578.573C1517.1 583.862 1517.25 589.151 1517.98 594.44C1519.01 602.079 1521.07 609.792 1524.75 616.918C1527.62 622.354 1531.45 627.496 1537.78 630.802C1543.15 633.593 1549.71 634.474 1556.11 633.887C1559.72 633.52 1563.25 632.638 1566.93 632.711C1573.26 632.785 1578.93 635.576 1585.11 636.531C1589.01 637.192 1593.06 637.119 1596.96 636.531C1601.08 
                            635.944 1605.05 634.915 1608.66 633.226C1612.64 631.316 1615.95 628.598 1617.93 625.292C1621.69 619.122 1620.73 611.996 1618.01 605.458Z"
            />
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1566.41 598)"
            />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth26Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1635.4 607.2C1633.9 603.7 1632.1 600.3 1630.6 596.9C1626.7 588 1624.4 578 1618.9 569.5C1613.6 561.2 1605.7 554.7 1594 552.4C1584.5 550.5 1574.5 552.5 1564.6 552.1C1559.5 551.9 1554.2 551.1 1549.2 550.5C1531.9 548.2 1514.1 548.7 1504.7 560C1502 563.2 1500.7 566.9 1499.9 570.6C1498.3 577.8 1498.5 585 1499.5 592.2C1500.9 602.6 1503.7 613.1 1508.7 622.8C1512.6 630.2 1517.8 637.2 1526.4 641.7C1533.7 645.5 1542.6 646.7 1551.3 645.9C1556.2 645.4 1561 644.2 1566 644.3C1574.6 644.4 1582.3 648.2 1590.7 649.5C1596 650.4 1601.5 650.3 1606.8 649.5C1612.4 648.7 1617.8 647.3 1622.7 645C1628.1 642.4 1632.6 638.7 1635.3 634.2C1640.4 625.8 1639.1 616.1 1635.4 607.2Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1618 605.458C1616.9 602.887 1615.57 600.39 1614.47 597.892C1611.6 591.354 1609.9 584.009 1605.86 577.765C1601.96 571.668 1596.14 566.893 1587.53 565.203C1580.54 563.808 1573.18 565.277 1565.89 564.983C1562.14 564.836 1558.24 564.248 1554.56 563.808C1541.82 562.118 1528.72 562.485 1521.8 570.786C1519.82 573.137 1518.86 575.855 1518.27 578.573C1517.09 583.862 1517.24 589.151 1517.98 594.44C1519.01 602.079 1521.07 609.792 1524.75 616.918C1527.62 622.354 1531.44 627.496 1537.77 630.802C1543.15 633.593 1549.7 634.474 1556.1 633.887C1559.71 633.52 1563.24 632.638 1566.92 632.711C1573.25 632.785 1578.92 635.576 1585.1 636.531C1589 637.192 1593.05 637.119 1596.95 636.531C1601.07 635.944 1605.05 634.915 1608.65 633.226C1612.63 631.316 1615.94 628.598 1617.93 625.292C1621.68 619.122 1620.72 611.996 1618 605.458Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1566.4 598)"
              style={{ fill: 'black', opacity: tooth26Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth26Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth26Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1635.41 607.2C1633.91 603.7 1632.11 600.3 1630.61 596.9C1626.71 588 1624.41 578 1618.91 569.5C1613.61 561.2 1605.71 554.7 1594.01 552.4C1584.51 550.5 1574.51 552.5 1564.61 552.1C1559.51 551.9 1554.21 551.1 1549.21 550.5C1531.91 548.2 1514.11 548.7 1504.71 560C1502.01 563.2 1500.71 566.9 1499.91 570.6C1498.31 577.8 1498.51 585 1499.51 592.2C1500.91 602.6 1503.71 613.1 1508.71 622.8C1512.61 630.2 1517.81 637.2 1526.41 641.7C1533.71 645.5 1542.61 646.7 1551.31 645.9C1556.21 645.4 1561.01 644.2 1566.01 644.3C1574.61 644.4 1582.31 648.2 1590.71 649.5C1596.01 650.4 1601.51 650.3 1606.81 649.5C1612.41 648.7 1617.81 647.3 1622.71 645C1628.11 642.4 1632.61 638.7 1635.31 634.2C1640.41 625.8 1639.11 616.1 1635.41 607.2Z"
            ></path>
            <path
              className="st47"
              d="M1618.01 605.458C1616.9 602.887 1615.58 600.39 1614.48 597.892C1611.6 591.354 1609.91 584.009 1605.86 577.765C1601.96 571.668 1596.15 566.893 1587.54 565.203C1580.54 563.808 1573.18 565.277 1565.9 564.983C1562.14 564.836 1558.24 564.248 1554.56 563.808C1541.83 562.118 1528.73 562.485 1521.81 570.786C1519.82 573.137 1518.87 575.855 1518.28 578.573C1517.1 583.862 1517.25 589.151 1517.98 594.44C1519.01 602.079 1521.07 609.792 1524.75 616.918C1527.62 622.354 1531.45 627.496 1537.78 630.802C1543.15 633.593 1549.71 634.474 1556.11 633.887C1559.72 633.52 1563.25 632.638 1566.93 632.711C1573.26 632.785 1578.93 635.576 1585.11 636.531C1589.01 637.192 1593.06 637.119 1596.96 636.531C1601.08 635.944 1605.05 634.915 1608.66 633.226C1612.64 631.316 1615.95 628.598 1617.93 625.292C1621.69 619.122 1620.73 611.996 1618.01 605.458Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth26Diagnozis.culttab &&
                !tooth26Diagnozis.abutment &&
                !tooth26Diagnozis.implant &&
                !tooth26Diagnozis.apex &&
                !tooth26Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1645,608.5c-1.6-4.9-3.7-9.6-5.4-14.5c-4.4-12.5-6.9-26.6-13-38.5
                            c-1.7-3.4-3.7-6.5-5.9-9.4c-5.5-7-12.6-12.2-22-14.5c-10.8-2.6-22.1,0.4-33.3-0.1c-5.8-0.3-11.8-1.2-17.4-2.1
                            c-19.6-3-39.7-2.2-50.5,13.8c-0.7,1.1-1.4,2.2-2,3.4c-1.8,3.6-2.8,7.6-3.6,11.6c-1.9,10.2-1.7,20.3-0.7,30.4
                            c1.5,14.7,4.5,29.4,10.2,43c3,7.3,6.8,14.3,12.1,20c2.3,2.4,4.8,4.6,7.7,6.4c8.2,5.2,18.3,7,28.1,5.6c5.6-0.7,11-2.4,16.6-2.4
                            c9.8,0.1,18.4,5.3,28,7.1c6,1.2,12.2,1,18.2-0.1c6.4-1.1,12.5-3.2,18-6.5c6.1-3.7,11.2-8.9,14.4-15.3c0,0,0,0,0-0.1
                            C1650.5,634.6,1649.2,621,1645,608.5z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth26.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1646.19 611.422C1644.48 606.146 1641.34 598.53 1639.63 593.403C1637.37 586.595 1636.66 580.604 1634.63 573.453C1632.65 566.512 1632.45 560.895 1629.35 554.583C1626.25 548.172 1623.53 541.473 1618.69 536.973C1614.08 532.69 1605.44 530.247 1598.92 528.556C1593.56 527.14 1586.98 524.916 1581.42 525.227C1575.73 525.544 1568.91 527.409 1563.2 527.104C1557.37 526.802 1552.4 524.351 1546.7 523.447C1541.87 522.6 1537.01 525.25 1532.27 525.082C1527.61 524.917 1523.07 524.41 1518.77 525.235C1514.52 526.052 1509.43 525.189 1505.81 527.297C1501.54 529.777 1495.72 535.507 1492.73 540.26C1489.65 545.084 1488.32 550.663 1487.41 556.241C1486.58 561.149 1488.1 566.056 1488.01 570.964C1487.9 576.911 1489.33 582.859 1489.95 588.807C1490.72 596.361 1489.78 603.95 1491.4 611.422C1493.13 619.46 1494.42 627.363 1497.38 634.942C1499.21 639.542 1504.38 645.284 1506.89 649.457C1510.46 655.405 1512.73 660.695 1518.5 664.683C1522.87 667.684 1529.9 667.364 1534.97 668.344C1539.58 669.235 1544.36 671.589 1549.09 671.015C1554.69 670.261 1559.17 668.452 1564.88 668.602C1570.26 668.685 1575.26 670.448 1580.34 672.346C1584.51 673.907 1589.75 675.558 1594.08 676.442C1600.13 677.799 1606.41 675.404 1612.46 674.198C1618.85 672.991 1626.1 674.37 1631.69 670.903C1637.86 666.983 1641.91 658.915 1645 652.13C1647.89 645.959 1650.1 639.323 1650 632.587C1649.89 625.5 1648.41 618.303 1646.19 611.422ZM1630.8 596.9C1632.3 600.3 1634.1 603.7 1635.6 607.2C1639.4 616.1 1640.7 625.8 1635.5 634.2C1632.8 638.7 1628.3 642.4 1622.91 645C1618.01 647.3 1612.61 648.7 1607.01 649.5C1601.72 650.3 1596.22 650.4 1590.92 649.5C1582.53 648.2 1574.83 644.4 1566.24 644.3C1561.24 644.2 1556.44 645.4 1551.54 645.9C1542.85 646.7 1533.95 645.5 1526.66 641.7C1518.06 637.2 1512.87 630.2 1508.97 622.8C1503.97 613.1 1501.17 602.6 1499.77 592.2C1498.77 585 1498.57 577.8 1500.17 570.6C1500.97 566.9 1502.27 563.2 1504.97 560C1514.36 548.7 1532.15 548.2 1549.45 550.5C1554.44 551.1 1559.74 551.9 1564.84 552.1C1574.73 552.5 1584.73 550.5 1594.22 552.4C1605.91 554.7 1613.81 561.2 1619.11 569.5C1624.6 578 1626.9 588 1630.8 596.9Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1646.19 611.422C1644.48 606.146 1641.34 598.53 1639.63 593.403C1637.37 586.595 1636.66 580.604 1634.63 573.453C1632.65 566.512 1632.45 560.895 1629.35 554.583C1626.25 548.172 1623.53 541.473 1618.69 536.973C1614.08 532.69 1605.44 530.247 1598.92 528.556C1593.56 527.14 1586.98 524.916 1581.42 525.227C1575.73 525.544 1568.91 527.409 1563.2 527.104C1557.37 526.802 1552.4 524.351 1546.7 523.447C1541.87 522.6 1537.01 525.25 1532.27 525.082C1527.61 524.917 1523.07 524.41 1518.77 525.235C1514.52 526.052 1509.43 525.189 1505.81 527.297C1501.54 529.777 1495.72 535.507 1492.73 540.26C1489.65 545.084 1488.32 550.663 1487.41 556.241C1486.58 561.149 1488.1 566.056 1488.01 570.964C1487.9 576.911 1489.33 582.859 1489.95 588.807C1490.72 596.361 1489.78 603.95 1491.4 611.422C1493.13 619.46 1494.42 627.363 1497.38 634.942C1499.21 639.542 1504.38 645.284 1506.89 649.457C1510.46 655.405 1512.73 660.695 1518.5 664.683C1522.87 667.684 1529.9 667.364 1534.97 668.344C1539.58 669.235 1544.36 671.589 1549.09 671.015C1554.69 670.261 1559.17 668.452 1564.88 668.602C1570.26 668.685 1575.26 670.448 1580.34 672.346C1584.51 673.907 1589.75 675.558 1594.08 676.442C1600.13 677.799 1606.41 675.404 1612.46 674.198C1618.85 672.991 1626.1 674.37 1631.69 670.903C1637.86 666.983 1641.91 658.915 1645 652.13C1647.89 645.959 1650.1 639.323 1650 632.587C1649.89 625.5 1648.41 618.303 1646.19 611.422ZM1630.8 596.9C1632.3 600.3 1634.1 603.7 1635.6 607.2C1639.4 616.1 1640.7 625.8 1635.5 634.2C1632.8 638.7 1628.3 642.4 1622.91 645C1618.01 647.3 1612.61 648.7 1607.01 649.5C1601.72 650.3 1596.22 650.4 1590.92 649.5C1582.53 648.2 1574.83 644.4 1566.24 644.3C1561.24 644.2 1556.44 645.4 1551.54 645.9C1542.85 646.7 1533.95 645.5 1526.66 641.7C1518.06 637.2 1512.87 630.2 1508.97 622.8C1503.97 613.1 1501.17 602.6 1499.77 592.2C1498.77 585 1498.57 577.8 1500.17 570.6C1500.97 566.9 1502.27 563.2 1504.97 560C1514.36 548.7 1532.15 548.2 1549.45 550.5C1554.44 551.1 1559.74 551.9 1564.84 552.1C1574.73 552.5 1584.73 550.5 1594.22 552.4C1605.91 554.7 1613.81 561.2 1619.11 569.5C1624.6 578 1626.9 588 1630.8 596.9Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1640.47 608.999C1638.88 604.76 1635.98 598.643 1634.4 594.525C1632.3 589.056 1631.65 584.244 1629.76 578.5C1627.94 572.924 1626.89 568.413 1624.03 563.342C1621.16 558.192 1619.57 552.615 1615.08 549C1610.82 545.559 1602.74 542.991 1596.71 541.633C1591.74 540.495 1585.65 538.512 1580.5 538.761C1575.24 539.016 1568.92 541.514 1563.63 541.269C1558.24 541.027 1553.64 539.058 1548.36 538.332C1543.89 537.651 1539.39 540.173 1535 540.039C1530.69 539.906 1526.48 539.105 1522.5 539.768C1518.57 540.424 1513.86 539.534 1510.5 541.228C1506.55 543.22 1502.09 548.019 1499.32 551.837C1496.46 555.712 1497.09 560.193 1496.24 564.674C1495.48 568.616 1494.1 572.558 1494.02 576.5C1493.92 581.278 1495.24 586.055 1495.82 590.833C1496.53 596.901 1496.59 602.997 1498.09 608.999C1499.69 615.456 1500.81 621.804 1503.55 627.892C1505.25 631.586 1509.18 636.199 1511.5 639.55C1514.81 644.329 1516.91 649.578 1522.26 652.781C1526.3 655.192 1532.8 654.739 1537.5 655.526C1541.77 656.241 1546.2 657.329 1550.57 656.867C1555.75 656.262 1560.83 654.809 1566.11 654.93C1571.1 654.996 1574.8 656.412 1579.5 657.937C1583.36 659.19 1588.22 660.517 1592.22 661.227C1597.82 662.317 1603.64 661.196 1609.24 660.227C1615.16 659.258 1621.87 659.563 1627.05 656.777C1632.75 653.629 1636.51 647.148 1639.36 641.698C1642.04 636.741 1644.09 631.41 1643.99 626C1643.89 620.307 1642.53 614.526 1640.47 608.999ZM1630.8 596.9C1632.3 600.3 1634.1 603.7 1635.6 607.2C1639.4 616.1 1640.7 625.8 1635.5 634.2C1632.8 638.7 1628.3 642.4 1622.91 645C1618.01 647.3 1612.61 648.7 1607.01 649.5C1601.72 650.3 1596.22 650.4 1590.92 649.5C1582.53 648.2 1574.83 644.4 1566.24 644.3C1561.24 644.2 1556.44 645.4 1551.54 645.9C1542.85 646.7 1533.95 645.5 1526.66 641.7C1518.06 637.2 1512.87 630.2 1508.97 622.8C1503.97 613.1 1501.17 602.6 1499.77 592.2C1498.77 585 1498.57 577.8 1500.17 570.6C1500.97 566.9 1502.27 563.2 1504.97 560C1514.36 548.7 1532.16 548.2 1549.45 550.5C1554.44 551.1 1559.74 551.9 1564.84 552.1C1574.73 552.5 1584.73 550.5 1594.22 552.4C1605.91 554.7 1613.81 561.2 1619.11 569.5C1624.6 578 1626.9 588 1630.8 596.9Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth26Diagnozis.culttab &&
                !tooth26Diagnozis.abutment &&
                !tooth26Diagnozis.implant &&
                !tooth26Diagnozis.shaper &&
                !tooth26Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС ЦЕНТР*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M1611.9,612.3c-0.3,3.3-1.1,6-2.4,8.4c-3.6,6.5-11.8,9.4-29.3,10.8c-20.6,1.6-32.6-2-42.5-8.1
                                c-1.5-0.9-2.9-1.9-4.3-2.9c-10.9-7.8-11.7-30-11.7-35.6c0-3.1,1.1-6.3,3.4-9c1.8-2.1,4.4-3.9,7.8-5.3c7.7-3,31.4-3.9,31.4-3.9
                                c20.7-0.9,31.9,2.4,37.7,6.8c2.7,2.1,4.3,4.4,5.2,6.6C1609.8,587,1613.3,599.8,1611.9,612.3z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth26.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth26.seal_center ? `seal-fill ${teethDiagnozis.tooth26.seal_center_color}` : ''}
                                `}
                d="M1611.9,612.3c-0.3,3.3-1.1,6-2.4,8.4c-3.6,6.5-11.8,9.4-29.3,10.8c-20.6,1.6-32.6-2-42.5-8.1
                                c-1.5-0.9-2.9-1.9-4.3-2.9c-10.9-7.8-11.7-30-11.7-35.6c0-3.1,1.1-6.3,3.4-9c1.8-2.1,4.4-3.9,7.8-5.3c7.7-3,31.4-3.9,31.4-3.9
                                c20.7-0.9,31.9,2.4,37.7,6.8c2.7,2.1,4.3,4.4,5.2,6.6C1609.8,587,1613.3,599.8,1611.9,612.3z"
              />
            </g>
            {/*КАРИЕС LEFT*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1537.8,623.4c-3.9,6.2-12.1,17.9-24.2,28.1c-5.3-5.7-9.1-12.7-12.1-20c-5.7-13.7-8.7-28.4-10.2-43
                                c-1-10.1-1.2-20.2,0.7-30.4c0.7-4,1.8-7.9,3.6-11.6c5.9,7.5,16.6,19.7,29.5,29.4c-2.3,2.7-3.4,5.8-3.4,9c0,5.6,0.8,27.9,11.7,35.6
                                C1534.8,621.5,1536.3,622.5,1537.8,623.4z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth26.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth26.seal_left ? `seal-fill ${teethDiagnozis.tooth26.seal_left_color}` : ''}
                                `}
                d="M1537.8,623.4c-3.9,6.2-12.1,17.9-24.2,28.1c-5.3-5.7-9.1-12.7-12.1-20c-5.7-13.7-8.7-28.4-10.2-43
                                c-1-10.1-1.2-20.2,0.7-30.4c0.7-4,1.8-7.9,3.6-11.6c5.9,7.5,16.6,19.7,29.5,29.4c-2.3,2.7-3.4,5.8-3.4,9c0,5.6,0.8,27.9,11.7,35.6
                                C1534.8,621.5,1536.3,622.5,1537.8,623.4z"
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
                d="M1644.7,646.4C1644.6,646.4,1644.6,646.4,1644.7,646.4c-3.2,6.4-8.3,11.6-14.4,15.4c-5.5,3.3-11.6,5.4-18,6.5
                                c-6,1.1-12.2,1.3-18.2,0.1c-9.5-1.8-18.2-7-28-7.1c-5.6,0-11,1.6-16.6,2.4c-9.9,1.3-20-0.4-28.1-5.6c-2.9-1.8-5.4-4-7.7-6.4
                                c12-10.3,20.2-21.9,24.2-28.1c9.9,6.1,21.9,9.7,42.5,8.1c17.5-1.4,25.7-4.3,29.3-10.8c4.9,8.6,14.6,17,25.1,20.9
                                C1639,643.2,1642.3,644.9,1644.7,646.4z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth26.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth26.seal_top ? `seal-fill ${teethDiagnozis.tooth26.seal_top_color}` : ''}
                                `}
                d="M1644.7,646.4C1644.6,646.4,1644.6,646.4,1644.7,646.4c-3.2,6.4-8.3,11.6-14.4,15.4c-5.5,3.3-11.6,5.4-18,6.5
                                c-6,1.1-12.2,1.3-18.2,0.1c-9.5-1.8-18.2-7-28-7.1c-5.6,0-11,1.6-16.6,2.4c-9.9,1.3-20-0.4-28.1-5.6c-2.9-1.8-5.4-4-7.7-6.4
                                c12-10.3,20.2-21.9,24.2-28.1c9.9,6.1,21.9,9.7,42.5,8.1c17.5-1.4,25.7-4.3,29.3-10.8c4.9,8.6,14.6,17,25.1,20.9
                                C1639,643.2,1642.3,644.9,1644.7,646.4z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1644.7,646.4c-2.4-1.5-5.6-3.2-10-4.8c-10.5-3.9-20.2-12.4-25.1-20.9c1.3-2.3,2-5.1,2.4-8.4
                                c1.3-12.5-2.1-25.3-4.8-32.2c-0.8-2.2-2.4-4.5-5.2-6.6c6.3-13.3,14.1-22.6,18.7-27.5c2.2,2.9,4.2,6,6,9.4c6.1,12,8.6,26.1,13,38.5
                                c1.7,4.9,3.7,9.6,5.4,14.5C1649.2,621,1650.5,634.6,1644.7,646.4z"
              />
              <path
                className={`
                                    st8 target caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth26.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth26.seal_right ? `seal-fill ${teethDiagnozis.tooth26.seal_right_color}` : ''}
                                `}
                d="M1644.7,646.4c-2.4-1.5-5.6-3.2-10-4.8c-10.5-3.9-20.2-12.4-25.1-20.9c1.3-2.3,2-5.1,2.4-8.4
                                c1.3-12.5-2.1-25.3-4.8-32.2c-0.8-2.2-2.4-4.5-5.2-6.6c6.3-13.3,14.1-22.6,18.7-27.5c2.2,2.9,4.2,6,6,9.4c6.1,12,8.6,26.1,13,38.5
                                c1.7,4.9,3.7,9.6,5.4,14.5C1649.2,621,1650.5,634.6,1644.7,646.4z"
              />
            </g>
            {/*КАРИЕС ВЕРХ*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1620.7,546c-4.6,4.9-12.4,14.2-18.7,27.5c-5.8-4.4-17-7.8-37.7-6.8c0,0-23.7,0.9-31.4,3.9
                                c-3.4,1.4-6,3.2-7.8,5.3c-12.9-9.6-23.6-21.9-29.5-29.4c0.6-1.2,1.2-2.3,2-3.4c10.8-16,30.9-16.9,50.5-13.8
                                c5.6,0.9,11.6,1.9,17.4,2.1c11.2,0.5,22.5-2.4,33.3,0.1C1608.1,533.8,1615.2,539,1620.7,546z"
              />
              <path
                className={`
                                    st8 target caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth26.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth26.seal_bottom ? `seal-fill ${teethDiagnozis.tooth26.seal_bottom_color}` : ''}
                                `}
                d="M1620.7,546c-4.6,4.9-12.4,14.2-18.7,27.5c-5.8-4.4-17-7.8-37.7-6.8c0,0-23.7,0.9-31.4,3.9
                                c-3.4,1.4-6,3.2-7.8,5.3c-12.9-9.6-23.6-21.9-29.5-29.4c0.6-1.2,1.2-2.3,2-3.4c10.8-16,30.9-16.9,50.5-13.8
                                c5.6,0.9,11.6,1.9,17.4,2.1c11.2,0.5,22.5-2.4,33.3,0.1C1608.1,533.8,1615.2,539,1620.7,546z"
              />
            </g>
            <g className="with bottom-line">
              {/*Черточка низ право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_right &&
                      !tooth26Diagnozis.seal_top) ||
                    (!tooth26Diagnozis.seal_right && tooth26Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1608.5 621C1611.67 625.333 1622.4 636.1 1640 644.5"
              />
              {/*Овал право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_right &&
                      !tooth26Diagnozis.seal_center) ||
                    (!tooth26Diagnozis.seal_right &&
                      tooth26Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1608.5 621C1614 612 1614.2 583.5 1601 573.5"
              />
              {/*Черточка верх право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_right &&
                      !tooth26Diagnozis.seal_bottom) ||
                    (!tooth26Diagnozis.seal_right &&
                      tooth26Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1601 574C1601.5 568.333 1605.2 555.6 1616 550"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_center &&
                      !tooth26Diagnozis.seal_bottom) ||
                    (!tooth26Diagnozis.seal_center &&
                      tooth26Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1601 574C1588 566.5 1530.4 565.2 1524 576"
              />
              {/*Черточка верх лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_left &&
                      !tooth26Diagnozis.seal_bottom) ||
                    (!tooth26Diagnozis.seal_left &&
                      tooth26Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1524 576C1517.83 572.167 1504 561.8 1498 551"
              />
              {/*Овал черточка лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth26Diagnozis.seal_left &&
                      tooth26Diagnozis.seal_center) ||
                    (tooth26Diagnozis.seal_left &&
                      !tooth26Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1524 576C1519 580.5 1519.7 614.4 1536.5 624"
              />
              {/*Низ черточка лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_left &&
                      !tooth26Diagnozis.seal_top) ||
                    (!tooth26Diagnozis.seal_left && tooth26Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1536.5 624C1535.17 628.167 1529.2 639 1516 649"
              />
              {/*Овал черточка низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_center &&
                      !tooth26Diagnozis.seal_top) ||
                    (!tooth26Diagnozis.seal_center && tooth26Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1536.5 624C1546.5 630 1591.4 631.5 1609 621.5"
              />
            </g>
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth26Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth26Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth26Diagnozis.vinir_color}`}
                d="M1626.2 555.5C1624.51 552.1 1622.51 549 1620.31 546.1C1614.81 539.1 1607.71 533.9 1598.32 531.6C1587.53 529 1576.23 532 1565.04 531.5C1559.24 531.2 1553.24 530.3 1547.65 529.4C1528.06 526.4 
                                1507.97 527.2 1497.18 543.2C1496.48 544.3 1495.78 545.4 1495.18 546.6C1493.38 550.2 1492.38 554.2 1491.58 558.2C1489.68 568.4 1489.88 578.5 1490.88 588.6C1491.03 590.067 1491.19 591.534 1491.37 593C1494.09 592.9 1499.92 591.881 1501.51 588.6C1500.77 580.389 1500.69 572.173 1502.24 563.88C1502.93 560.449 
                                1503.79 557.019 1505.34 553.932C1505.85 552.903 1506.46 551.959 1507.06 551.016C1516.35 537.294 1533.63 536.608 1550.49 539.181C1555.31 539.953 1560.47 540.725 1565.46 540.982C1575.09 541.411 1584.81 538.838 1594.1 541.068C1602.18 543.04 1608.29 
                                547.5 1613.02 553.503C1614.91 555.99 1616.63 558.648 1618.09 561.564C1622.37 569.878 1624.59 579.444 1627.31 588.5C1628.47 592.5 1635.49 593.167 1638.85 593C1634.66 580.752 1632.14 567.084 1626.2 555.5Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth26Diagnozis.temporary_crown ||
                tooth26Diagnozis.ceramic_crown ||
                tooth26Diagnozis.mceramic_crown ||
                tooth26Diagnozis.metalic_crown ||
                tooth26Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth26Diagnozis.temporary_crown ||
                tooth26Diagnozis.ceramic_crown ||
                tooth26Diagnozis.mceramic_crown ||
                tooth26Diagnozis.metalic_crown ||
                tooth26Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth26Diagnozis.ceramic_crown_color}
                                ${tooth26Diagnozis.mceramic_crown_color}
                                ${tooth26Diagnozis.metalic_crown_color}
                                ${tooth26Diagnozis.zirconia_crown_color}
                            `}
              d="M1645,608.5c-1.6-4.9-3.7-9.6-5.4-14.5c-4.4-12.5-6.9-26.6-13-38.5
                            c-1.7-3.4-3.7-6.5-5.9-9.4c-5.5-7-12.6-12.2-22-14.5c-10.8-2.6-22.1,0.4-33.3-0.1c-5.8-0.3-11.8-1.2-17.4-2.1
                            c-19.6-3-39.7-2.2-50.5,13.8c-0.7,1.1-1.4,2.2-2,3.4c-1.8,3.6-2.8,7.6-3.6,11.6c-1.9,10.2-1.7,20.3-0.7,30.4
                            c1.5,14.7,4.5,29.4,10.2,43c3,7.3,6.8,14.3,12.1,20c2.3,2.4,4.8,4.6,7.7,6.4c8.2,5.2,18.3,7,28.1,5.6c5.6-0.7,11-2.4,16.6-2.4
                            c9.8,0.1,18.4,5.3,28,7.1c6,1.2,12.2,1,18.2-0.1c6.4-1.1,12.5-3.2,18-6.5c6.1-3.7,11.2-8.9,14.4-15.3c0,0,0,0,0-0.1
                            C1650.5,634.6,1649.2,621,1645,608.5z"
            />
            {/*FISSURE*/}
            <path
              className={`st3 fissure ${tooth26Diagnozis.fissure ? 'diagnoze' : tooth26Diagnozis.fissure ? 'hidden' : ''}`}
              d="M1618.9,584.5c-1.5,3.9-3.7,7.3-6.7,10.2c-3.5,3.4-7.8,5.9-12.1,8.3l-1.2,0.7c-4.3,2.5-8.6,5.1-12.8,7.8
                            l-0.5-0.5c-0.5,0.5-0.9,1.1-1.3,1.6c-6.2-6.7-14-11.9-22.6-15.1c-5.7-2.1-12.2-3.5-20.5-4.3c-6.8-0.7-13.7-1-20.6-0.7l-19.1-13.1
                            l-0.6,0.9l19.4,13.3l0.2,0c6.9-0.2,13.8,0,20.6,0.7c8.1,0.8,14.6,2.2,20.2,4.3c8.5,3.1,16.3,8.3,22.4,15
                            c-2.2,3.6-2.8,7.7-3.3,11.8c-0.2,1.5-0.4,3-0.7,4.4c-1.3,6.7-4.4,13-9,18.2l0.8,0.7c4.7-5.3,7.9-11.8,9.2-18.7
                            c0.3-1.5,0.5-3,0.7-4.5c0.6-4.3,1.1-8.4,3.5-11.8c0,0,0,0,0-0.1c4.8-3.1,9.7-6.1,14.6-8.9l1.2-0.7c4.3-2.4,8.7-5,12.3-8.4
                            c3.1-3,5.4-6.6,7-10.6L1618.9,584.5z"
            />
            <path
              className={`st3 fissure ${tooth26Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1560,558.7c1.4,2.4,2.3,5.1,2.8,7.9l0.2,0l-8.1,27.5l1,0.3l9.1-31c0.8-3.6,2.1-7.1,4.1-10.3
                            c1.2-1.9,2.6-3.7,4.1-5.3l-0.8-0.8c-1.6,1.7-3.1,3.5-4.3,5.4c-2.1,3.3-3.5,6.9-4.3,10.6l-0.5,1.8c-0.6-2.3-1.4-4.6-2.6-6.7
                            c-2.8-5.1-7.4-9.6-11.7-11.5l-0.4,1C1552.9,549.5,1557.3,553.8,1560,558.7z"
            />
          </g>
          {/* FISSURES */}
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{
              visibility:
                !tooth26Diagnozis.culttab &&
                !tooth26Diagnozis.abutment &&
                !tooth26Diagnozis.implant &&
                !tooth26Diagnozis.apex &&
                !tooth26Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth26Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1618.9,584.5c-1.5,3.9-3.7,7.3-6.7,10.2c-3.5,3.4-7.8,5.9-12.1,8.3l-1.2,0.7c-4.3,2.5-8.6,5.1-12.8,7.8
                            l-0.5-0.5c-0.5,0.5-0.9,1.1-1.3,1.6c-6.2-6.7-14-11.9-22.6-15.1c-5.7-2.1-12.2-3.5-20.5-4.3c-6.8-0.7-13.7-1-20.6-0.7l-19.1-13.1
                            l-0.6,0.9l19.4,13.3l0.2,0c6.9-0.2,13.8,0,20.6,0.7c8.1,0.8,14.6,2.2,20.2,4.3c8.5,3.1,16.3,8.3,22.4,15
                            c-2.2,3.6-2.8,7.7-3.3,11.8c-0.2,1.5-0.4,3-0.7,4.4c-1.3,6.7-4.4,13-9,18.2l0.8,0.7c4.7-5.3,7.9-11.8,9.2-18.7
                            c0.3-1.5,0.5-3,0.7-4.5c0.6-4.3,1.1-8.4,3.5-11.8c0,0,0,0,0-0.1c4.8-3.1,9.7-6.1,14.6-8.9l1.2-0.7c4.3-2.4,8.7-5,12.3-8.4
                            c3.1-3,5.4-6.6,7-10.6L1618.9,584.5z"
            />
            <path
              className={`st3 fissure ${tooth26Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1560,558.7c1.4,2.4,2.3,5.1,2.8,7.9l0.2,0l-8.1,27.5l1,0.3l9.1-31c0.8-3.6,2.1-7.1,4.1-10.3
                            c1.2-1.9,2.6-3.7,4.1-5.3l-0.8-0.8c-1.6,1.7-3.1,3.5-4.3,5.4c-2.1,3.3-3.5,6.9-4.3,10.6l-0.5,1.8c-0.6-2.3-1.4-4.6-2.6-6.7
                            c-2.8-5.1-7.4-9.6-11.7-11.5l-0.4,1C1552.9,549.5,1557.3,553.8,1560,558.7z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: tooth26Diagnozis.absent ? 'hidden' : 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideTeeth('over');
          }}
          onMouseLeave={() => {
            showHideTeeth('leave');
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_26"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth26Diagnozis.implant &&
                  !tooth26Diagnozis.apex &&
                  !tooth26Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth26Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1606.9,448.9l-28-8.1l-29.3,12l-21.6-2.8l-18.3,13.1c-5.7-9.7-10.1-20-13-30.7
                                c-2.2-8.1-3.6-16.3-4.9-24.5c0.1-0.6,0.1-1.2,0.2-1.8c6.7-7.1,14.7-13.1,23.9-17.9c1.8-0.9,3.5-1.8,5.3-2.6
                                c15.3-6.9,32.4-10,49.4-9.4c4.5,0.2,9,0.6,13.5,1.3c9.9,1.5,19.4,4.4,28.1,8.4c0.1,0.1,0.1,0.2,0.2,0.2l0,0
                                c1.2,3.7,2.2,7.4,3,11.1C1618.7,414.8,1615.1,432.8,1606.9,448.9z"
              />
            </g>
            <g
              id="dentin_n_26"
              style={{
                visibility:
                  !tooth26Diagnozis.implant &&
                  !tooth26Diagnozis.abutment &&
                  !tooth26Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth26Diagnozis?.change_color ? 'diagnoze' : ''}`}
                d="M1522.2,337.2c1.6,5,3.7,10,7.3,14c2,2.2,4.5,4.1,7.4,4.4c4.4,0.4,8.1-2.4,11-5.9
                                c1.9-2.2,3.5-4.7,5.2-7.1c1.4-2,3-3.9,4.5-5.8c2.7-3.3,5.3-6.7,7.9-10.2c-0.8-8.3-1.5-16.6-2-25c-0.7-10.1-1.2-20.2-2.2-30.3
                                c-0.7-7.9-1.7-15.8-2.8-23.6c-1.4-4.3-5.4-7.1-9.8-7c-3.1,0.1-6,1.6-7.8,4.1c-1.4,2-2,4.4-2.6,6.7c-3.2,12-6.9,23.9-10.5,35.9
                                c-3.1,10.5-6,21-8.7,31.6C1519.3,325.1,1520.3,331.3,1522.2,337.2z"
              />
              <path
                className={`st10 change-color ${tooth26Diagnozis?.change_color ? 'diagnoze' : ''}`}
                d="M1612.4,386.1c-0.1-0.1-0.1-0.2-0.2-0.2c-8.8-4-18.2-6.8-28.1-8.3c-4.5-0.7-9-1.1-13.5-1.3
                                c-17-0.6-34.1,2.5-49.4,9.4c-1.8,0.8-3.6,1.7-5.3,2.6c-9.1,4.8-17.2,10.8-23.9,17.9c-0.1,0.6-0.1,1.2-0.2,1.8
                                c-0.4-2.3-0.7-4.5-1.1-6.8c-2.8-17.2-6.4-34.3-7.1-51.7c-0.8-18.9,1.9-37.8,6.2-56.3c2.2-9.5,4.8-18.9,9.1-27.7
                                c2.9-6,8.2-11.3,14.2-9.1c3.6,1.3,5.1,5,5.7,8.6c2,11.8-1.7,23.5-2.5,35.4c-0.8,11.9,1.4,23.7,3.7,35.5c1.8,8.8,5.8,17.9,13.4,20
                                c1.3,0.3,2.6,0.5,4.1,0.5c5.9-0.2,9.5-3.8,13.1-7.9c1.1-1.2,2.2-2.5,3.3-3.8c4.8-5.5,9.9-11.5,13.4-18.2
                                c3.3-6.2,5.8-12.7,7.6-19.3c2-7.4,3.1-15,3.4-22.7c0.2-6.5-0.3-12.9,1-19.3c0.7-3.6,2.2-7.3,5.8-8.6c7.8-2.9,13.8,5.8,15.6,15.3
                                c1.2,6.1,2.6,12.1,3.7,18.1c1.5,8.9,2.1,17.8,1.6,26.8c-0.7,12.6-3.6,25.2-2.4,37.8C1604.4,365.2,1609,375.6,1612.4,386.1z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.pulpit ? 'pulpit' : ''} ${tooth26Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1575.8,422.5c-7.2-6.4-17.4-9-27.1-7c-8.6,1.8-15.9,7-19.8,14.2
                                c-1.9-3.9-3.2-8.1-3.8-12.4c-0.8-5.4-0.5-10.9-0.9-16.4c-0.4-5.4-1.5-10.5-3-15.7c0,0.1,0.1,0.2,0.1,0.3c0.2-0.1,0.4-0.2,0.5-0.2
                                c0.6-0.3,1.2-0.5,1.9-0.8c1.9-0.8,3.8-1.5,5.7-2.2c0.9-0.3,1.8-0.6,2.7-0.9c0.8-0.3,1.6-0.5,2.4-0.8c0.2-0.1,0.4-0.1,0.6-0.2
                                c1.7-0.5,3.5-1,5.2-1.4c0,0,0.1,0,0.1,0c1-0.2,1.9-0.4,2.9-0.6s1.9-0.4,2.9-0.5c0.8-0.1,1.5-0.3,2.3-0.4c0.3-0.1,0.6-0.1,0.9-0.1
                                c0.9-0.1,1.7-0.2,2.6-0.4c0.8-0.1,1.7-0.2,2.5-0.3c0.2,0,0.4,0,0.6-0.1c0.8-0.1,1.6-0.2,2.4-0.2c0.3,0,0.5,0,0.8-0.1
                                c0.8-0.1,1.5-0.1,2.3-0.1c0.1,0,0.2,0,0.3,0c0.9,0,1.8-0.1,2.8-0.1c0,0,0,0,0,0c1,0,1.9,0,2.9,0c1.4,0,2.8,0,4.1,0.1
                                c-0.2,11.6,4.4,22.9,5.4,34.5C1576.3,414.6,1576.3,418.6,1575.8,422.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.pulpit ? 'pulpit' : ''} ${tooth26Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1589.4,316.2c-2.1,9.9-5.3,19.6-9.3,28.9c-4,9.5-8.7,18.6-9.4,28.7
                                c-0.1,0.8-0.1,1.5-0.1,2.3c-1.4,0-2.8-0.1-4.1-0.1c-1,0-1.9,0-2.9,0c0,0,0,0,0,0c-0.9,0-1.8,0-2.8,0.1c-0.1,0-0.2,0-0.3,0
                                c-0.8,0-1.6,0.1-2.3,0.1c-0.3,0-0.5,0-0.8,0.1c-0.8,0.1-1.6,0.1-2.4,0.2c-0.2,0-0.4,0-0.6,0.1c-0.8,0.1-1.7,0.2-2.5,0.3
                                c-0.9,0.1-1.7,0.2-2.6,0.4c-0.3,0-0.6,0.1-0.9,0.1c-0.8,0.1-1.5,0.2-2.3,0.4c-0.9,0.2-1.9,0.4-2.9,0.6c-0.9,0.2-1.9,0.4-2.8,0.6
                                c0,0-0.1,0-0.1,0c-1.8,0.4-3.5,0.9-5.2,1.4c-0.2,0-0.4,0.1-0.6,0.2c-0.8,0.2-1.6,0.5-2.4,0.8c-0.9,0.3-1.8,0.6-2.7,0.9
                                c-1.9,0.7-3.9,1.4-5.7,2.2c-0.6,0.3-1.2,0.5-1.9,0.8l-0.5,0.2c-2.2-7.6-5.2-15-8.4-22.4c-4.3-10.2-8.8-20.4-10.8-31
                                c-0.3-1.6-0.6-3.2-0.8-4.9c1-0.6,2.1-1.2,3.3-1.9c0.2,1.3,0.5,2.6,0.8,4c1.8,7.5,4.8,14.6,9,21.3c4.2,6.9,10,13.1,16.9,16.6
                                c0.8-3.9,1.5-7.9,2.2-11.8c0.1-0.4,0.1-0.8,0.2-1.1c2.5-13.5,4.8-27.1,6.9-40.8c3.7-0.5,7.5-0.8,11.2-0.9
                                c0.5,9.7,1.2,19.4,1.9,29.2c0,0,0,0,0,0c0.1,0.8,0.1,1.6,0.2,2.4v0c0,0,0,0,0,0c0.6,7.6,1.3,15.2,2.1,22.7
                                c6.3-3.8,10.7-10.1,14.3-16.4c6.4-11.2,12-22.9,15.6-35.1C1587.1,315.8,1588.3,316,1589.4,316.2z"
              />
            </g>
            {/* Отростки периодонтита */}
            <g>
              <path
                className={`st22 target part ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.pulpit ? 'pulpit' : ''} ${tooth26Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1512,257.5c-4.3,12.1-7.5,24.4-9.5,36.8c-1.8,10.9-2.7,22.1-1.3,33.1c1-0.6,2.1-1.2,3.3-1.9
                                c-1.5-9-1.3-18.2-0.4-27.4C1505.4,284.4,1508,270.8,1512,257.5z"
              />
              <path
                className={`st22 target part ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.pulpit ? 'pulpit' : ''} ${tooth26Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1550.4,240.8c0-0.2,0-0.3,0-0.5C1550.4,240.5,1550.4,240.6,1550.4,240.8c-2.5,21.9-5.4,43.7-8.8,65.5
                                c-0.4,2.5-0.8,5-1.2,7.5c3.7-0.5,7.5-0.8,11.2-0.9c-0.2-4.1-0.4-8.3-0.6-12.5C1550.3,280.5,1550,260.6,1550.4,240.8z"
              />
              <path
                className={`st22 target part ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.channel_class} ${tooth26Diagnozis.pulpit ? 'pulpit' : ''} ${tooth26Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1591.9,283.3c-0.4-9.2-1.8-18.3-4-27.3c4.1,18.9,3.6,38.4-1.5,57.2c-0.2,0.8-0.4,1.6-0.7,2.4
                                c1.3,0.2,2.5,0.5,3.6,0.7c0.1-0.4,0.2-0.9,0.3-1.3C1591.7,304.5,1592.4,293.9,1591.9,283.3z"
              />
            </g>
            {/* Отростки пульпита */}
            <PeriodontitStage26 />
          </g>
          {/*PIN*/}
          <g
            className="pin hEmpty hImplant"
            style={{
              visibility: 'inherit',
              opacity: tooth26Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1606.9 448.9L1578.9 440.8L1549.6 452.8L1528 450L1509.7 463.1C1504 453.4 1499.6 443.1 1496.7 432.4C1494.5 424.3 1493.1 416.1 1491.8 407.9C1491.9 407.3 1491.9 406.7 1492 406.1C1492.4 405.7 1492.8 405.2 1493.3 404.8C1497.7 400.3 1502.8 396.2 1508.3 392.7C1509.7 391.8 1511.1 390.9 1512.5 
                            390.1C1513.6 389.5 1514.7 388.9 1515.9 388.3C1517.3 387.5 1518.8 386.8 1520.3 386.1C1520.6 386 1520.9 385.8 1521.2 385.7C1521.4 385.6 1521.6 385.5 1521.7 385.5C1522.3 385.2 1522.9 385 1523.6 384.7C1524.1 384.5 1524.5 384.3 1525 384.1C1525.2 384 1525.5 383.9 1525.8 383.8C1526.5 383.5 1527.2 383.3 1527.9 383C1528.2 382.9 1528.5 382.8 1528.8 382.7C1529 382.6 1529.2 382.6 1529.4 382.5C1530.3 382.2 1531.2 381.9 
                            1532.1 381.6C1532.9 381.3 1533.7 381.1 1534.5 380.8C1534.7 380.7 1534.9 380.7 1535.1 380.6C1536 380.4 1536.8 380.1 1537.7 379.9C1538.6 379.7 1539.5 379.4 1540.3 379.2H1540.4C1541.4 379 1542.3 378.8 1543.2 378.6C1543.3 378.6 1543.4 378.6 1543.5 378.5C1543.9 378.4 1544.3 378.3 1544.7 378.3C1544.9 378.3 1545 378.2 1545.2 378.2C1545.4 378.2 1545.6 378.1 1545.8 378.1C1545.9 378.1 1546 378.1 1546.1 378C1546.4 377.9 
                            1546.7 377.9 1547.1 377.8C1547.5 377.7 1548 377.6 1548.4 377.6C1548.7 377.6 1548.9 377.5 1549.2 377.5C1549.3 377.5 1549.3 377.5 1549.4 377.5C1550.3 377.4 1551.1 377.3 1552 377.1C1552.3 377.1 1552.6 377 1552.9 377C1553.1 377 1553.2 377 1553.4 376.9C1553.5 376.9 1553.6 376.9 1553.6 376.9C1554.2 376.8 1554.7 376.8 1555.3 376.7C1556 376.6 1556.7 376.6 1557.5 376.5C1557.7 376.5 1557.9 376.5 1558.1 376.5C1558.5 376.5 1559 376.4 
                            1559.4 376.4C1559.6 376.4 1559.7 376.4 1559.9 376.4C1560.4 376.4 1561 376.3 1561.6 376.3C1562.1 376.3 1562.5 376.3 1563 376.3C1563.1 376.3 1563.2 376.3 1563.3 376.3C1563.8 376.3 1564.2 376.3 1564.7 376.3C1564.9 376.3 1565.2 376.3 1565.4 376.3C1567.2 376.3 1569 376.3 1570.8 376.4C1575.3 376.6 1579.8 377 1584.3 377.7C1591.7 378.9 1598.9 380.7 1605.7 383.3C1608 384.2 1610.2 385.1 1612.4 386.1C1612.5 386.2 1612.6 386.3 1612.6 386.3C1613.8 390 1614.8 393.7 1615.6 397.4C1618.7 
                            414.8 1615.1 432.8 1606.9 448.9Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M1564.1 446.9L1549.5 452.9L1528.7 450.2L1538 356.1L1538.1 355.6L1546.1 274.4C1546.3 273.3 1547.2 272.5 1548.3 272.5C1549.5 272.5 1550.4 273.4 
                            1550.5 274.6L1555.3 339.9L1555.5 342.5L1564.1 446.9Z"
              style={{ fill: tooth26Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULT TAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: tooth26Diagnozis.culttab ? 'inherit' : 'hidden',
              opacity: tooth26Diagnozis.culttab ? 1 : 0,
            }}
          >
            <path
              className="st14"
              d="M1558,376.5c-0.2,0-0.4,0-0.6,0c-0.7,0-1.4,0.1-2.2,0.2c-0.6,0-1.1,0.1-1.7,0.2c-0.1,0-0.2,0-0.2,0
                            c-0.2,0-0.4,0-0.5,0.1c-0.3,0-0.6,0.1-0.9,0.1c-0.9,0.1-1.7,0.2-2.6,0.4c-0.1,0-0.1,0-0.2,0c-0.3,0-0.5,0.1-0.8,0.1
                            c-0.4,0.1-0.9,0.1-1.3,0.2c-0.3,0-0.6,0.1-1,0.2c-0.1,0-0.2,0-0.3,0.1c-0.2,0-0.4,0.1-0.6,0.1c-0.2,0-0.3,0.1-0.5,0.1
                            c-0.4,0.1-0.8,0.1-1.2,0.2c-0.1,0-0.2,0-0.3,0.1c-0.9,0.2-1.9,0.4-2.8,0.6c0,0-0.1,0-0.1,0c-0.9,0.2-1.8,0.4-2.6,0.7
                            s-1.7,0.5-2.6,0.7c-0.2,0-0.4,0.1-0.6,0.2c-0.8,0.2-1.6,0.5-2.4,0.8c-0.9,0.3-1.8,0.6-2.7,0.9c-0.2,0.1-0.4,0.1-0.6,0.2
                            l17.3-108.3c0.2-1.1,1.1-1.9,2.2-1.9c1.2,0,2.1,0.9,2.2,2.1L1558,376.5z"
            />
            <path
              className="st15"
              d="M1606.9,448.9l-28-8.1l-29.3,12l-21.6-2.8l-18.3,13.1c-5.7-9.7-10.1-20-13-30.7c-2.2-8.1-3.6-16.3-4.9-24.5
                            v0c0.1-0.6,0.1-1.2,0.2-1.8c0.4-0.4,0.8-0.9,1.3-1.3c4.4-4.5,9.5-8.6,15-12.1c1.4-0.9,2.8-1.8,4.2-2.6c1.1-0.6,2.2-1.2,3.4-1.8
                            c1.4-0.8,2.9-1.5,4.4-2.2c0.3-0.1,0.6-0.3,0.9-0.4l0,0c0.2-0.1,0.4-0.2,0.5-0.2c0.6-0.3,1.2-0.5,1.9-0.8c0.5-0.2,0.9-0.4,1.4-0.6
                            c0,0,0,0,0,0c0.2-0.1,0.5-0.2,0.8-0.3c0.7-0.3,1.4-0.5,2.1-0.8c0.3-0.1,0.6-0.2,0.9-0.3c0.2-0.1,0.4-0.1,0.6-0.2
                            c0.9-0.3,1.8-0.6,2.7-0.9c0.8-0.3,1.6-0.5,2.4-0.8c0.2-0.1,0.4-0.1,0.6-0.2c0.9-0.2,1.7-0.5,2.6-0.7s1.8-0.5,2.6-0.7
                            c0,0,0.1,0,0.1,0c1-0.2,1.9-0.4,2.8-0.6c0.1,0,0.2,0,0.3-0.1c0.4-0.1,0.8-0.2,1.2-0.2c0.2,0,0.3-0.1,0.5-0.1
                            c0.2,0,0.4-0.1,0.6-0.1c0.1,0,0.2,0,0.3-0.1c0.3-0.1,0.6-0.1,1-0.2c0.4-0.1,0.9-0.2,1.3-0.2c0.3,0,0.5-0.1,0.8-0.1
                            c0.1,0,0.1,0,0.2,0c0.9-0.1,1.7-0.2,2.6-0.4c0.3,0,0.6-0.1,0.9-0.1c0.2,0,0.3,0,0.5-0.1c0.1,0,0.2,0,0.2,0
                            c0.6-0.1,1.1-0.1,1.7-0.2c0.7-0.1,1.4-0.1,2.2-0.2c0.2,0,0.4,0,0.6,0c0.4,0,0.9-0.1,1.3-0.1c0.2,0,0.3,0,0.5,0
                            c0.5,0,1.1-0.1,1.7-0.1c0.5,0,0.9,0,1.4,0c0.1,0,0.2,0,0.3,0c0.5,0,0.9,0,1.4,0c0.2,0,0.5,0,0.7,0c1.8,0,3.6,0,5.4,0.1
                            c4.5,0.2,9,0.6,13.5,1.3c7.4,1.2,14.6,3,21.4,5.6c2.3,0.9,4.5,1.8,6.7,2.8c0.1,0.1,0.2,0.2,0.2,0.2c1.2,3.7,2.2,7.4,3,11.1
                            C1618.7,414.8,1615.1,432.8,1606.9,448.9z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth26Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth26Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M1492.1,406.2c4.7-3.8,18.2-15.1,23.7-17.9c20.6-10.8,45-14.3,68.3-10.7c9.9,1.5,19.4,4.3,28.1,8.3
                            l-46.7-25.9l-32.1,1.8L1492.1,406.2z"
            />
            <path
              className="st17"
              d="M1491.8,407.9c1.3,8.2,2.7,16.4,4.9,24.5c2.9,10.7,7.3,21,13,30.7l18.3-13.1l21.6,2.8l29.3-12l28,8.1
                            c8.2-16.1,11.8-34.2,8.5-51.7c-0.7-3.8-1.8-7.4-3-11.1c-0.1-0.1-0.2-0.2-0.2-0.3c-8.8-4-18.2-6.8-28.1-8.3
                            c-23.2-3.6-47.6,0-68.3,10.7c-5.5,2.9-10.7,6.2-15.3,10c-3,2.5-5.9,5.1-8.5,7.9C1491.9,406.7,1491.8,407.3,1491.8,407.9z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1524.24 408.394C1523.95 410.859 1525.95 412.992 1528.43 412.857L1577.61 410.186C1580.08 410.052 1581.84 407.717 1581.29 405.298L1572.34 366.305C1571.91 364.403 1570.16 363.094 1568.22 363.206L1532.66 365.254C1530.73 365.366 1529.15 366.852 1528.92 368.778L1524.24 408.394Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth26Diagnozis.abutment ||
                tooth26Diagnozis.implant ||
                tooth26Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1523.9,366.1l55.5-2.2c-1.5-16.9-3.8-33.7-6.9-50.5c-3-16.4-6.9-32.7-11.4-48.9c-4-3.6-9.9-5.7-16-5.4
                            c-6.8,0.3-13,3.5-16.7,8.3c-2.5,15.6-4.1,31.4-4.9,47.2C1522.6,331.7,1522.7,348.9,1523.9,366.1z"
            />
            <line className="st19" x1="1518" y1="348.2" x2="1583.1" y2="355" />
            <line
              className="st19"
              x1="1516.3"
              y1="328.9"
              x2="1581.4"
              y2="335.7"
            />
            <line className="st19" x1="1516" y1="309.6" x2="1581" y2="316.4" />
            <line
              className="st19"
              x1="1514.3"
              y1="290.3"
              x2="1579.4"
              y2="297.1"
            />
            <line
              className="st19"
              x1="1512.6"
              y1="271"
              x2="1577.7"
              y2="277.8"
            />
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth26Diagnozis.culttab &&
                !tooth26Diagnozis.abutment &&
                !tooth26Diagnozis.implant &&
                !tooth26Diagnozis.shaper &&
                !tooth26Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1637.3,429c-0.9-5.3-2.5-10.4-4.9-15.3c-2.4-5-5.6-9.8-9-14.3c-3.4-4.6-7.1-9-11-13.2
                            c-0.1-0.1-0.1-0.2-0.2-0.2c-8.8-4-18.2-6.8-28.1-8.4c-23.2-3.6-47.7,0-68.2,10.7c-9.1,4.8-17.2,10.8-23.9,17.9c0,0.1,0,0.1,0,0.2
                            c-0.6,5.4-1.2,10.8-1.8,16.2c-0.7,6.9-1.4,13.9-1.3,20.8c0.1,6.6,0.9,13.2,2.4,19.7c1.9,4.2,4.5,8.1,7.7,11.7
                            c5.2,5.9,12,10.7,19.8,14.1l6.1-0.8c1.7-1.8,3.6-3.5,5.7-5c0.6-0.4,1.1-0.8,1.7-1.2c5.7-3.9,12.1-6.9,18.1-10.4
                            c1.9-1.1,3.7-2.2,5.5-3.4l-3.4-7.3l-1-9.9l-4.9-4.2l1-1.4l5.4,5.1l1.2,10.1l3.7,6.9c1.4,0.9,2.8,1.6,4.4,2.2
                            c5.1,1.9,10.9,2.3,16.3,3.6c4.7,1.2,9,3.1,12.7,5.7l4.6-0.3c0.9-0.5,1.7-1,2.6-1.6c2.9-1.8,5.7-3.7,8.4-5.8
                            c6.1-4.7,11.7-10,14.4-16.5c0.8-1.9,1.3-3.8,1.6-5.8l1.7,0.2c-0.2,1.9-0.7,3.7-1.4,5.5c-1.5,3.7-4.1,7.1-6.9,10.2
                            c-2.1,2.3-4.3,4.4-6.6,6.5c1.8,0.1,3.6,0.5,5.2,1.1c1,0.4,2,0.8,2.9,1.4l5.6-1.3c4.5-5.7,7.9-11.8,10.3-18.2
                            C1636.8,446,1638,437.4,1637.3,429z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth26Diagnozis.culttab && !tooth26Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1632.4 413.7C1634.8 418.6 1636.4 423.7 1637.3 429C1638 437.4 1636.8 446 1633.7 454.3C1631.3 460.7 1627.9 466.8 1623.4 472.5L1617.8 473.8C1616.9 473.2 1615.9 472.8 1614.9 472.4L1614.9 472.4C1613.3 471.8 1611.5 471.4 1609.7 471.3C1612 469.2 1614.2 467.1 
                            1616.3 464.8C1619.1 461.7 1621.7 458.3 1623.2 454.6C1623.9 452.8 1624.4 451 1624.6 449.1L1622.9 448.9C1622.6 450.9 1622.1 452.8 1621.3 454.7C1618.6 461.2 1613 466.5 1606.9 471.2C1604.2 473.3 1601.4 475.2 1598.5 477C1597.6 477.6 1596.8 478.1 1595.9 478.6L1591.3 478.9C1587.6 476.3 1583.3 474.4 1578.6 473.2C1576.58 472.713 1574.5 472.353 1572.43 471.993C1568.96 471.39 1565.49 470.789 1562.3 469.6C1560.7 469 1559.3 468.3 1557.9 467.4L1554.2 
                            460.5L1553 450.4L1547.6 445.3L1546.6 446.7L1551.5 450.9L1552.5 460.8L1555.9 468.1C1554.1 469.3 1552.3 470.4 1550.4 471.5C1548.25 472.756 1546.04 473.949 1543.83 475.141C1539.89 477.27 1535.95 479.4 1532.3 481.9C1532 482.1 1531.73 482.3 1531.45 482.5C1531.18 482.7 1530.9 482.9 1530.6 483.1C1528.5 484.6 1526.6 486.3 1524.9 488.1L1518.8 488.9C1511 485.5 1504.2 
                            480.7 1499 474.8C1495.8 471.2 1493.2 467.3 1491.3 463.1C1489.8 456.6 1489 450 1488.9 443.4C1488.8 436.5 1489.5 429.5 1490.2 422.6L1492 406.4V406.2C1498.7 399.1 1506.8 393.1 1515.9 388.3C1536.4 377.6 1560.9 374 1584.1 377.6C1594 379.2 1603.4 382 1612.2 386C1612.26 386 1612.29 386.038 1612.32 386.091C1612.34 386.123 1612.36 386.161 1612.4 386.2C1616.3 390.4 1620 394.8 1623.4 399.4C1626.8 403.9 1630 408.7 1632.4 413.7ZM1522.87 391.64C1539.99 383.081 1560.45 380.202 
                            1579.83 383.081C1593.34 385.172 1601.57 387.814 1609.74 396.981C1610.77 398.14 1610.05 399.938 1608.51 400.138L1504.6 413.662C1503.29 413.832 1502.21 412.71 1502.63 411.461C1504.44 406.132 1510.05 397.431 1522.87 391.64Z"
            />
            <path
              className={`st7 ${tooth26Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1579.83 383.081C1560.45 380.202 1539.99 383.081 1522.87 391.64C1510.05 397.431 1504.44 406.132 1502.63 411.461C1502.21 412.71 1503.29 413.832 1504.6 413.662L1608.51 400.138C1610.05 399.938 1610.77 398.14 1609.74 396.981C1601.57 387.814 1593.34 
                            385.172 1579.83 383.081Z"
            />
            <path
              className={`st60
                                    ${tooth26Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth26Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth26Diagnozis.seal_cervical_color}
                                `}
              d="M1579.83 383.081C1560.45 380.202 1539.99 383.081 1522.87 391.64C1510.05 397.431 1504.44 406.132 1502.63 411.461C1502.21 412.71 1503.29 413.832 1504.6 413.662L1608.51 400.138C1610.05 399.938 1610.77 398.14 1609.74 396.981C1601.57 387.814 1593.34 385.172 1579.83 383.081Z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth26.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1489.5 427L1491.5 426V424.5L1492.5 422.5L1493.5 419.5L1495 417.5V414L1498.5 409.5L1500 405L1503 403L1504.5 399.5L1506.5 398L1511.5 395.5L1514 393.5L1517.5 391L1521.5 389L1527 387.5L1529 386H1533L1536.5 383.5L1539 382.5H1544.5L1549 380.5H1551H1552.5H1556.5L1559.5 379.5H1564L1570 380.5L1574 379.5L1579 380.5H1581.5L1585.5 382L1591 382.5L1593.5 383L1596 383.5L1600.5 386L1604 387L1607.5 389L1609.5 391L1612.5 393.5L1614.5 396L1617.5 398L1619.5 400.5L1620.5 403L1623.5 405L1625 407L1627.5 408.5L1630 409.5V407L1629 405L1627.5 403L1626.5 400.5L1625 398L1623.5 396L1622 393.5L1620 391L1619.5 389L1617.5 386L1615.5 384.5L1613.5 382L1612.5 379.5V377.5L1611 375.5L1608.5 373L1607.5 368L1606 364L1602 362.5L1598.5 361L1593.5 358.5L1591 357.5L1586.5 358.5L1581.5 357.5L1577.5 356H1574L1572.5 355.5L1568.5 357.5L1564 355.5H1561L1556.5 356L1552.5 355.5L1547.5 357.5H1542.5H1539L1533 361H1527L1521.5 362.5H1518.5L1515.5 365H1511.5L1508 367L1504.5 370.5H1500L1497 371.5L1493.5 375.5L1489.5 377.5L1486.5 382V384.5V389L1488 392.5L1487.5 397L1488 399.5L1487.5 402.5L1488 404V408.5L1488.5 411.5L1487.5 415.5L1488.5 419.5L1488 424.5L1489.5 427.5V427Z"
            ></path>
            <path
              className="st61 level1"
              d="M1489.5 427L1491.5 426V424.5L1492.5 422.5L1493.5 419.5L1495 417.5V414L1498.5 409.5L1500 405L1503 403L1504.5 399.5L1506.5 398L1511.5 395.5L1514 393.5L1517.5 391L1521.5 389L1527 387.5L1529 386H1533L1536.5 383.5L1539 382.5H1544.5L1549 380.5H1551H1552.5H1556.5L1559.5 379.5H1564L1570 380.5L1574 379.5L1579 380.5H1581.5L1585.5 382L1591 382.5L1593.5 383L1596 383.5L1600.5 386L1604 387L1607.5 389L1609.5 391L1612.5 393.5L1614.5 396L1617.5 398L1619.5 400.5L1620.5 403L1623.5 405L1625 407L1627.5 408.5L1630 409.5L1629 407L1627.5 405L1625 402.327L1623.5 398L1620.5 394.5V392L1617.5 389L1617 385.5L1614.5 384.5L1612.5 380.5L1610 377.5L1605 376L1600.5 375.5L1597.5 374L1594.5 372.5L1587.5 371.5L1583.5 370L1580 370.5L1575 369.5H1570H1566L1561.5 370.5H1556.5H1551L1542.5 372.5H1539L1533 374L1528 376.5H1523L1518.5 379.5L1516.5 380.5L1511.5 382L1507.5 384.5L1503 387L1500 390L1497 392L1495 394.5L1493.5 397L1491.5 398L1490.5 400.5V403L1489.5 406.5L1490.5 409.5V411L1489.5 413V415.5L1489 417.5V419.5L1488.5 422L1489 425L1489.5 427Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{ visibility: 'inherit' }}
          >
            {/*КАРИЕС TOP*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M1598.5,476.9c-0.8,0.5-1.7,1-2.6,1.6l-4.6,0.3c-3.7-2.6-8-4.5-12.7-5.7c-5.4-1.4-11.2-1.7-16.3-3.6
                                c-1.6-0.6-3.1-1.3-4.4-2.2l-3.7-6.9l-1.2-10.1l-5.4-5.1l-1,1.4l4.9,4.2l1,9.9l3.4,7.3c-1.8,1.2-3.6,2.3-5.5,3.4
                                c-6,3.5-12.5,6.5-18.1,10.4c-2.6-8.4-8.4-27-13.2-41.3c6.5-4.5,17.3-12.2,19.1-12.8c2.5-0.9,29.6-1.8,34.8-1.6
                                c3.8,0.2,16.2,6.6,22.8,10.2C1596.7,450.9,1597.8,467.9,1598.5,476.9z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth26.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth26.seal_center ? `seal-fill ${teethDiagnozis.tooth26.seal_center_color}` : ''}
                            `}
                d="M1598.5,476.9c-0.8,0.5-1.7,1-2.6,1.6l-4.6,0.3c-3.7-2.6-8-4.5-12.7-5.7c-5.4-1.4-11.2-1.7-16.3-3.6
                                c-1.6-0.6-3.1-1.3-4.4-2.2l-3.7-6.9l-1.2-10.1l-5.4-5.1l-1,1.4l4.9,4.2l1,9.9l3.4,7.3c-1.8,1.2-3.6,2.3-5.5,3.4
                                c-6,3.5-12.5,6.5-18.1,10.4c-2.6-8.4-8.4-27-13.2-41.3c6.5-4.5,17.3-12.2,19.1-12.8c2.5-0.9,29.6-1.8,34.8-1.6
                                c3.8,0.2,16.2,6.6,22.8,10.2C1596.7,450.9,1597.8,467.9,1598.5,476.9z"
              />
            </g>
            {/* КАРИЕС LEFT */}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1532.3,481.9c-0.6,0.4-1.2,0.8-1.7,1.2c-2.1,1.5-3.9,3.2-5.7,5l-6.1,0.8c-7.8-3.4-14.6-8.2-19.8-14.1
                                c-3.2-3.6-5.8-7.5-7.7-11.7c-1.5-6.5-2.3-13.1-2.4-19.7c-0.1-6.9,0.6-13.9,1.3-20.8c0.6-5.4,1.1-10.8,1.8-16.2
                                c5.6,4.3,17.1,13.1,19.7,15.6c1.2,1.1,4.1,8.8,7.4,18.6C1523.9,454.8,1529.7,473.4,1532.3,481.9z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth26.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth26.seal_left ? `seal-fill ${teethDiagnozis.tooth26.seal_left_color}` : ''}
                            `}
                d="M1532.3,481.9c-0.6,0.4-1.2,0.8-1.7,1.2c-2.1,1.5-3.9,3.2-5.7,5l-6.1,0.8c-7.8-3.4-14.6-8.2-19.8-14.1
                                c-3.2-3.6-5.8-7.5-7.7-11.7c-1.5-6.5-2.3-13.1-2.4-19.7c-0.1-6.9,0.6-13.9,1.3-20.8c0.6-5.4,1.1-10.8,1.8-16.2
                                c5.6,4.3,17.1,13.1,19.7,15.6c1.2,1.1,4.1,8.8,7.4,18.6C1523.9,454.8,1529.7,473.4,1532.3,481.9z"
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
                className="st58"
                d="M1633.7,454.2c-2.4,6.4-5.9,12.6-10.3,18.2l-5.6,1.3c-0.9-0.5-1.9-1-2.9-1.4c-1.7-0.6-3.4-1-5.2-1.1
                                c2.4-2,4.6-4.2,6.6-6.5c2.9-3.1,5.4-6.5,6.9-10.2c0.7-1.8,1.2-3.6,1.4-5.5l-1.7-0.2c-0.2,2-0.8,3.9-1.6,5.8
                                c-2.7,6.5-8.3,11.8-14.4,16.5c-2.7,2-5.5,4-8.4,5.8c-0.6-9-1.8-26-2.7-40.6c-0.8-13.7-1.5-25.3-1.2-26.1
                                c0.5-1.5,12.7-17.4,17.9-24.1c3.9,4.2,7.6,8.6,11,13.2c3.4,4.6,6.6,9.3,9,14.3c2.4,4.9,4,10,4.9,15.3
                                C1638,437.4,1636.8,446,1633.7,454.2z"
              />
              <path
                className={`
                                st8 target caries-right
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth26.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth26.seal_right ? `seal-fill ${teethDiagnozis.tooth26.seal_right_color}` : ''}
                            `}
                d="M1633.7,454.2c-2.4,6.4-5.9,12.6-10.3,18.2l-5.6,1.3c-0.9-0.5-1.9-1-2.9-1.4c-1.7-0.6-3.4-1-5.2-1.1
                                c2.4-2,4.6-4.2,6.6-6.5c2.9-3.1,5.4-6.5,6.9-10.2c0.7-1.8,1.2-3.6,1.4-5.5l-1.7-0.2c-0.2,2-0.8,3.9-1.6,5.8
                                c-2.7,6.5-8.3,11.8-14.4,16.5c-2.7,2-5.5,4-8.4,5.8c-0.6-9-1.8-26-2.7-40.6c-0.8-13.7-1.5-25.3-1.2-26.1
                                c0.5-1.5,12.7-17.4,17.9-24.1c3.9,4.2,7.6,8.6,11,13.2c3.4,4.6,6.6,9.3,9,14.3c2.4,4.9,4,10,4.9,15.3
                                C1638,437.4,1636.8,446,1633.7,454.2z"
              />
            </g>
            {/*КАРИЕС У BOTTOM*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st58"
                d="M1595.8,436.3c-6.6-3.5-19.1-10-22.8-10.2c-5.2-0.2-32.3,0.7-34.8,1.6c-1.8,0.6-12.6,8.2-19.1,12.8
                                c-3.3-9.8-6.2-17.5-7.4-18.6c-2.6-2.5-14.1-11.3-19.7-15.6c0-0.1,0-0.1,0-0.2c6.7-7.1,14.7-13.1,23.9-17.9
                                c20.6-10.8,45-14.3,68.2-10.7c9.9,1.5,19.4,4.4,28.1,8.4c0.1,0.1,0.2,0.2,0.2,0.2c-5.2,6.7-17.3,22.6-17.9,24.1
                                C1594.3,411,1594.9,422.6,1595.8,436.3z"
              />
              <path
                className={`
                                    st8 target caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth26.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth26.seal_bottom ? `seal-fill ${teethDiagnozis.tooth26.seal_bottom_color}` : ''}
                                `}
                d="M1595.8,436.3c-6.6-3.5-19.1-10-22.8-10.2c-5.2-0.2-32.3,0.7-34.8,1.6c-1.8,0.6-12.6,8.2-19.1,12.8
                                c-3.3-9.8-6.2-17.5-7.4-18.6c-2.6-2.5-14.1-11.3-19.7-15.6c0-0.1,0-0.1,0-0.2c6.7-7.1,14.7-13.1,23.9-17.9
                                c20.6-10.8,45-14.3,68.2-10.7c9.9,1.5,19.4,4.4,28.1,8.4c0.1,0.1,0.2,0.2,0.2,0.2c-5.2,6.7-17.3,22.6-17.9,24.1
                                C1594.3,411,1594.9,422.6,1595.8,436.3z"
              />
            </g>
            <g className="with top-line">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_right &&
                      !tooth26Diagnozis.seal_top &&
                      !tooth26Diagnozis.seal_center) ||
                    (tooth26Diagnozis.seal_right &&
                      tooth26Diagnozis.seal_top &&
                      !tooth26Diagnozis.seal_center) ||
                    (!tooth26Diagnozis.seal_right &&
                      tooth26Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1595.5 435.999L1598 471.499"
              />
              {/*Черточка лево верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_right &&
                      !tooth26Diagnozis.seal_bottom) ||
                    (!tooth26Diagnozis.seal_right &&
                      tooth26Diagnozis.seal_bottom &&
                      !tooth26Diagnozis.seal_center) ||
                    (!tooth26Diagnozis.seal_right &&
                      tooth26Diagnozis.seal_bottom &&
                      tooth26Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1595.5 435.999C1594 403.999 1589.5 411.999 1609.5 389.999"
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_bottom &&
                      !tooth26Diagnozis.seal_center) ||
                    (tooth26Diagnozis.seal_bottom &&
                      !tooth26Diagnozis.seal_center &&
                      !tooth26Diagnozis.seal_top) ||
                    (tooth26Diagnozis.seal_right &&
                      tooth26Diagnozis.seal_left &&
                      tooth26Diagnozis.seal_center &&
                      !tooth26Diagnozis.seal_top) ||
                    (!tooth26Diagnozis.seal_top &&
                      !tooth26Diagnozis.seal_bottom &&
                      tooth26Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1595.5 436.999C1579.5 420.999 1538.3 421.699 1519.5 440.499"
              />
              {/*Черточка лево верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_left &&
                      !tooth26Diagnozis.seal_bottom) ||
                    (!tooth26Diagnozis.seal_left &&
                      tooth26Diagnozis.seal_bottom &&
                      !tooth26Diagnozis.seal_center) ||
                    (!tooth26Diagnozis.seal_left &&
                      tooth26Diagnozis.seal_bottom &&
                      tooth26Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1519.5 440.499C1511.5 416.999 1511.3 413.999 1496.5 409.999"
              />
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth26Diagnozis.seal_left &&
                      !tooth26Diagnozis.seal_top &&
                      !tooth26Diagnozis.seal_center) ||
                    (tooth26Diagnozis.seal_left &&
                      tooth26Diagnozis.seal_top &&
                      !tooth26Diagnozis.seal_center) ||
                    (!tooth26Diagnozis.seal_left &&
                      tooth26Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1519.5 440.499L1530.5 476.499"
              />
            </g>
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth26Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth26Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth26Diagnozis.vinir_color}`}
                d="M1637.3 429C1636.4 423.7 1634.8 418.6 1632.4 413.7C1630 408.7 1626.8 403.9 1623.4 399.4C1620 394.8 1616.3 390.4 1612.4 386.2C1612.3 386.1 1612.3 386 1612.2 386C1603.4 382 1594 379.2 1584.1 377.6C1560.9 374 1536.4 377.6 1515.9 388.3C1506.8 393.1 1498.7 399.1 1492 406.2C1492 406.3 1492 406.3 1492 406.4C1491.4 411.8 1490.8 417.2 1490.2 
                                422.6C1489.5 429.5 1488.8 436.5 1488.9 443.4C1489 450 1489.8 456.6 1491.3 463.1C1493.2 467.3 1495.8 471.2 1499 474.8C1504.2 480.7 1511 485.5 1518.8 488.9L1524.9 488.1C1526.6 486.3 1528.5 484.6 1530.6 483.1C1531.2 482.7 1531.7 482.3 1532.3 481.9C1538 478 1544.4 475 1550.4 471.5C1552.3 470.4 1554.1 469.3 1555.9 468.1L1552.5 460.8L1551.5 450.9L1546.6 446.7L1547.6 445.3L1553 450.4L1554.2 460.5L1557.9 467.4C1559.3 
                                468.3 1560.7 469 1562.3 469.6C1567.4 471.5 1573.2 471.9 1578.6 473.2C1583.3 474.4 1587.6 476.3 1591.3 478.9L1595.9 478.6C1596.8 478.1 1597.6 477.6 1598.5 477C1601.4 475.2 1604.2 473.3 1606.9 471.2C1613 466.5 1618.6 461.2 1621.3 454.7C1622.1 452.8 1622.6 450.9 1622.9 448.9L1624.6 449.1C1624.4 451 1623.9 452.8 1623.2 454.6C1621.7 458.3 1619.1 461.7 1616.3 464.8C1614.2 467.1 1612 469.2 1609.7 471.3C1611.5 471.4 1613.3 471.8 1614.9 472.4C1615.9 472.8 1616.9 473.2 
                                1617.8 473.8L1623.4 472.5C1627.9 466.8 1631.3 460.7 1633.7 454.3C1636.8 446 1638 437.4 1637.3 429Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА/КЕРАМІЧНА/МЕТАЛОКЕРАМІЧНА КОРОНКА*/}
          <g
            className="crown"
            style={{
              visibility:
                tooth26Diagnozis.temporary_crown ||
                tooth26Diagnozis.ceramic_crown ||
                tooth26Diagnozis.mceramic_crown ||
                tooth26Diagnozis.metalic_crown ||
                tooth26Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth26Diagnozis.temporary_crown ||
                tooth26Diagnozis.ceramic_crown ||
                tooth26Diagnozis.mceramic_crown ||
                tooth26Diagnozis.metalic_crown ||
                tooth26Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`
                                temporary-crown crown-fill
                                ${diagnozis}
                                ${tooth26Diagnozis.ceramic_crown_color}
                                ${tooth26Diagnozis.mceramic_crown_color}
                                ${tooth26Diagnozis.metalic_crown_color}
                                ${tooth26Diagnozis.zirconia_crown_color}
                            `}
              d="M1637.3,429c-0.9-5.3-2.5-10.4-4.9-15.3c-2.4-5-5.6-9.8-9-14.3c-3.4-4.6-7.1-9-11-13.2
                            c-0.1-0.1-0.1-0.2-0.2-0.2c-8.8-4-18.2-6.8-28.1-8.4c-23.2-3.6-47.7,0-68.2,10.7c-9.1,4.8-17.2,10.8-23.9,17.9c0,0.1,0,0.1,0,0.2
                            c-0.6,5.4-1.2,10.8-1.8,16.2c-0.7,6.9-1.4,13.9-1.3,20.8c0.1,6.6,0.9,13.2,2.4,19.7c1.9,4.2,4.5,8.1,7.7,11.7
                            c5.2,5.9,12,10.7,19.8,14.1l6.1-0.8c1.7-1.8,3.6-3.5,5.7-5c0.6-0.4,1.1-0.8,1.7-1.2c5.7-3.9,12.1-6.9,18.1-10.4
                            c1.9-1.1,3.7-2.2,5.5-3.4l-3.4-7.3l-1-9.9l-4.9-4.2l1-1.4l5.4,5.1l1.2,10.1l3.7,6.9c1.4,0.9,2.8,1.6,4.4,2.2
                            c5.1,1.9,10.9,2.3,16.3,3.6c4.7,1.2,9,3.1,12.7,5.7l4.6-0.3c0.9-0.5,1.7-1,2.6-1.6c2.9-1.8,5.7-3.7,8.4-5.8
                            c6.1-4.7,11.7-10,14.4-16.5c0.8-1.9,1.3-3.8,1.6-5.8l1.7,0.2c-0.2,1.9-0.7,3.7-1.4,5.5c-1.5,3.7-4.1,7.1-6.9,10.2
                            c-2.1,2.3-4.3,4.4-6.6,6.5c1.8,0.1,3.6,0.5,5.2,1.1c1,0.4,2,0.8,2.9,1.4l5.6-1.3c4.5-5.7,7.9-11.8,10.3-18.2
                            C1636.8,446,1638,437.4,1637.3,429z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
