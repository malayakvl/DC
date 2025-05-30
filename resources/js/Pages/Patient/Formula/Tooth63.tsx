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
import PeriodontitStage63 from './periodontit63';
import setupDiagnoze from '../../../lib/tfunctions';

export default function Tooth63() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth63Diagnozis = teethDiagnozis.tooth63;
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
        teethDiagnozis.tooth63.caries_bottom =
          !teethDiagnozis.tooth63.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth63.caries_center =
          !teethDiagnozis.tooth63.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth63.caries_left =
          !teethDiagnozis.tooth63.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth63.caries_right =
          !teethDiagnozis.tooth63.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth63.caries_top = !teethDiagnozis.tooth63.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth63.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth63.seal_center_color = sealColor1;
          teethDiagnozis.tooth63.seal_center = true;
        } else if (
          teethDiagnozis.tooth63.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth63.seal_center_color = sealColor2;
          teethDiagnozis.tooth63.seal_center = true;
        } else if (
          teethDiagnozis.tooth63.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth63.seal_center_color = sealColor3;
          teethDiagnozis.tooth63.seal_center = true;
        } else {
          teethDiagnozis.tooth63.seal_center =
            !teethDiagnozis.tooth63.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth63.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth63.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth63.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth63.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth63.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth63.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth63.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth63.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth63.seal_bottom = true;
        } else {
          teethDiagnozis.tooth63.seal_bottom =
            !teethDiagnozis.tooth63.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth63.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth63.seal_left_color = sealColor1;
          teethDiagnozis.tooth63.seal_left = true;
        } else if (
          teethDiagnozis.tooth63.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth63.seal_left_color = sealColor2;
          teethDiagnozis.tooth63.seal_left = true;
        } else if (
          teethDiagnozis.tooth63.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth63.seal_left_color = sealColor3;
          teethDiagnozis.tooth63.seal_left = true;
        } else {
          teethDiagnozis.tooth63.seal_left = !teethDiagnozis.tooth63.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth63.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth63.seal_right_color = sealColor1;
          teethDiagnozis.tooth63.seal_right = true;
        } else if (
          teethDiagnozis.tooth63.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth63.seal_right_color = sealColor2;
          teethDiagnozis.tooth63.seal_right = true;
        } else if (
          teethDiagnozis.tooth63.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth63.seal_right_color = sealColor3;
          teethDiagnozis.tooth63.seal_right = true;
        } else {
          teethDiagnozis.tooth63.seal_right =
            !teethDiagnozis.tooth63.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth63.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth63.seal_top_color = sealColor1;
          teethDiagnozis.tooth63.seal_top = true;
        } else if (
          teethDiagnozis.tooth63.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth63.seal_top_color = sealColor2;
          teethDiagnozis.tooth63.seal_top = true;
        } else if (
          teethDiagnozis.tooth63.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth63.seal_top_color = sealColor3;
          teethDiagnozis.tooth63.seal_top = true;
        } else {
          teethDiagnozis.tooth63.seal_top = !teethDiagnozis.tooth63.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth63.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth63.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth63.wedge_shaped_defect_color =
          !teethDiagnozis.tooth63.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over') {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth63.show &&
        !teethDiagnozis.tooth23.show
      ) {
        document.getElementById('TH-63').classList.add('f-tooth-active');
        document.getElementById('TH-63').style.opacity = '1';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth63.show &&
        teethDiagnozis.tooth23.show
      ) {
        document.getElementById('TH-63').classList.add('f-tooth-active');
        document.getElementById('TH-23').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-63').classList.remove('f-tooth-active');
        document.getElementById('TH-23').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave') {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth63.show &&
        !teethDiagnozis.tooth23.show
      ) {
        document.getElementById('TH-63').classList.remove('f-tooth-active');
        document.getElementById('TH-63').style.opacity = '0';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth63.show &&
        teethDiagnozis.tooth23.show
      ) {
        document.getElementById('TH-63').classList.remove('f-tooth-active');
        document.getElementById('TH-23').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over') {
      if (teethType === 'child' && teethDiagnozis.tooth23.show) {
        document.getElementById('TH-63').classList.add('f-tooth-active');
        document.getElementById('TH-23').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth63.show) {
        document.getElementById('TH-63').classList.remove('f-tooth-active');
        document.getElementById('TH-23').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave') {
      if (teethType === 'child' && teethDiagnozis.tooth23.show) {
        document.getElementById('TH-23').classList.add('f-tooth-active');
        document.getElementById('TH-63').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="63"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1250 716)"
          className={`st3 st4 st5 ${selectedTooth === 63 ? 'num-active' : ''}`}
        >
          63
        </text>
      </g>
      <g
        id="TH-63"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth63.show || allTeeth) && !teethDiagnozis.tooth63.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          teethDiagnozis.tooth63.show = !teethDiagnozis.tooth63.show;
          teethDiagnozis.tooth23.show = false;

          dispatch(setSelectedToothNumber(63));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              63,
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
          className={`underlay ${selectedTooth === 63 ? 'selected' : ''}`}
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          <path
            className="st40"
            d="M1281.4,213.1c-2.6,7-4.3,14.1-5.3,18.5c-5.1,22.4-11.2,44.3-16.2,66.8
                        c-4.4,19.5-8.1,39.4-13.9,58.6c-6,20-22.9,85.4-24.2,99.7c-3.8,41.3,10.2,52.3,9.2,78.3c-0.5,12.4-11,45-10,59.6
                        c0.6,9.4,8,85.4,11,102.4s16,35,39,35s34-11,40-55s6-71,5-90c-0.7-14-12-44-12-61c0-24,10-19,12-69s5-84,7-106s4.4-84,3-102
                        c-3-38-9-52-19-56C1294.2,187.8,1286.2,200.3,1281.4,213.1z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 19, 26)',
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
              style={{
                visibility:
                  !tooth63Diagnozis.culttab &&
                  !tooth63Diagnozis.implant &&
                  !tooth63Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth63Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth63Diagnozis?.apex ? 'apex' : ''}`}
                d="M1306.6,598.3c0.7-5.4-0.9-10.5-3.2-15.3c-2.2-4.5-5.1-8.9-9-12.4
                                c-6.6-6-15.6-10.5-25.8-10.4c-9.5,0.1-17.8,4.2-24,9.7c-4.5,3.9-7.9,8.9-11,13.9c-2.1,3.3-4.1,6.8-4.3,11
                                c-0.3,5.1,2.7,9.5,5.8,13.2c3.4,4,7.2,7.6,10.5,11.9c1.8,2.4,3.6,4.9,5.9,7c3.9,3.5,9.1,5.8,14.7,6.6c7.2,1,14.6-0.5,19.9-4.5
                                c3-2.3,4.9-5.2,7-8c2.4-3.3,5-6.6,7.3-10C1303.2,607.1,1306,603.2,1306.6,598.3z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth63Diagnozis?.apex || tooth63Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth63Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth63Diagnozis?.apex ? 'apex' : ''}`}
                d="M1306.6 598.3C1307.3 592.9 1305.7 587.8 1303.4 583C1301.2 578.5 1298.3 574.1 1294.4 570.6C1287.8 564.6 1278.8 560.1 1268.6 560.2C1259.1 560.3 1250.8 564.4 1244.6 569.9C1240.1 573.8 1236.7 578.8 1233.6 583.8C1231.5 587.1 1229.5 590.6 1229.3 594.8C1229 599.9 1232 604.3 1235.1 608C1238.5 612 1242.3 615.6 1245.6 619.9C1247.4 622.3 1249.2 624.8 1251.5 626.9C1255.4 630.4 1260.6 632.7 1266.2 633.5C1273.4 634.5 1280.8 633 1286.1 629C1289.1 626.7 1291 623.8 1293.1 621C1295.5 617.7 1298.1 614.4 1300.4 611C1303.2 607.1 1306 603.2 1306.6 598.3Z"
              ></path>
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth63Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth63Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M1269.46 608.01C1273.09 608.119 1278.1 604.647 1278.28 598.549C1278.46 592.45 1273.75 586.035 1270.12 585.926C1266.5 585.818 1262.76 590.655 1262.58 596.753C1262.4 602.851 1265.84 607.902 1269.46 608.01Z"
                style={{ fill: '#e80808' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            style={{
              visibility:
                tooth63Diagnozis.implant || tooth63Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1270.5" cy="596.5" r="26.5"></circle>
            <g className="st27">
              <mask id="implant_63" className="st49">
                <path
                  className="st50"
                  d="M1256.9 580.474L1253.46 579.352C1250.53 582.3 1248.35 585.994 1247.23 590.124L1249.93 592.55C1249.69 593.829 1249.56 595.15 1249.56 596.5C1249.56 597.85 1249.69 599.17 1249.93 600.45L1247.23 602.875C1248.35 607.006 1250.53 610.7 1253.46 613.648L1256.9 612.525C1258.9 614.242 1261.21 615.594 1263.74 616.478L1264.49 620.024C1266.48 620.548 1268.56 620.827 1270.71 620.827C1272.86 620.827 1274.95 620.548 1276.94 620.024L1277.69 616.477C1280.22 615.593 1282.53 614.241 1284.52 612.525L1287.97 613.647C1290.9 610.699 1293.08 607.004 1294.2 602.874L1291.5 600.448C1291.74 599.169 1291.87 597.849 1291.87 596.5C1291.87 595.15 1291.74 593.831 1291.5 592.552L1294.2 590.126C1293.08 585.995 1290.9 582.301 1287.97 579.352L1284.52 580.475C1282.53 578.758 1280.22 577.406 1277.69 576.522L1276.94 572.976C1274.95 572.452 1272.86 572.173 1270.71 572.173C1268.56 572.173 1266.48 572.452 1264.49 572.975L1263.74 576.521C1261.21 577.405 1258.9 578.758 1256.9 580.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1256.9 580.474L1253.46 579.352C1250.53 582.3 1248.35 585.994 1247.23 590.124L1249.93 592.55C1249.69 593.829 1249.56 595.15 1249.56 596.5C1249.56 597.85 1249.69 599.17 1249.93 600.45L1247.23 602.875C1248.35 607.006 1250.53 610.7 1253.46 613.648L1256.9 612.525C1258.9 614.242 1261.21 615.594 1263.74 616.478L1264.49 620.024C1266.48 620.548 1268.56 620.827 1270.71 620.827C1272.86 620.827 1274.95 620.548 1276.94 620.024L1277.69 616.477C1280.22 615.593 1282.53 614.241 1284.52 612.525L1287.97 613.647C1290.9 610.699 1293.08 607.004 1294.2 602.874L1291.5 600.448C1291.74 599.169 1291.87 597.849 1291.87 596.5C1291.87 595.15 1291.74 593.831 1291.5 592.552L1294.2 590.126C1293.08 585.995 1290.9 582.301 1287.97 579.352L1284.52 580.475C1282.53 578.758 1280.22 577.406 1277.69 576.522L1276.94 572.976C1274.95 572.452 1272.86 572.173 1270.71 572.173C1268.56 572.173 1266.48 572.452 1264.49 572.975L1263.74 576.521C1261.21 577.405 1258.9 578.758 1256.9 580.474Z"
              ></path>
              <path
                className="st52"
                d="M1253.46 579.352L1254.08 577.45L1252.91 577.069L1252.04 577.942L1253.46 579.352ZM1256.9 580.474L1256.29 582.376L1257.36 582.725L1258.21 581.989L1256.9 580.474ZM1247.23 590.124L1245.3 589.601L1244.98 590.789L1245.89 591.611L1247.23 590.124ZM1249.93 592.55L1251.89 592.921L1252.1 591.815L1251.27 591.063L1249.93 592.55ZM1249.93 600.45L1251.27 601.937L1252.1 601.184L1251.89 600.079L1249.93 600.45ZM1247.23 602.875L1245.89 601.388L1244.98 602.211L1245.3 603.398L1247.23 602.875ZM1253.46 613.648L1252.04 615.057L1252.91 615.93L1254.08 615.549L1253.46 613.648ZM1256.9 612.525L1258.21 611.011L1257.36 610.275L1256.29 610.624L1256.9 612.525ZM1263.74 616.478L1265.7 616.063L1265.47 614.961L1264.4 614.59L1263.74 616.478ZM1264.49 620.024L1262.54 620.439L1262.79 621.644L1263.98 621.958L1264.49 620.024ZM1276.94 620.024L1277.45 621.958L1278.64 621.643L1278.89 620.438L1276.94 620.024ZM1277.69 616.477L1277.03 614.589L1275.96 614.96L1275.73 616.063L1277.69 616.477ZM1284.52 612.525L1285.14 
                                610.623L1284.07 610.274L1283.22 611.01L1284.52 612.525ZM1287.97 613.647L1287.35 615.549L1288.52 615.93L1289.39 615.057L1287.97 613.647ZM1294.2 602.874L1296.13 603.396L1296.45 602.209L1295.53 601.386L1294.2 602.874ZM1291.5 600.448L1289.53 600.077L1289.33 601.183L1290.16 601.935L1291.5 600.448ZM1291.5 592.552L1290.16 591.064L1289.33 591.817L1289.53 592.923L1291.5 592.552ZM1294.2 590.126L1295.53 591.613L1296.45 590.791L1296.13 589.603L1294.2 590.126ZM1287.97 579.352L1289.39 577.943L1288.52 577.07L1287.35 577.451L1287.97 579.352ZM1284.52 580.475L1283.22 581.989L1284.07 582.726L1285.14 582.376L1284.52 580.475ZM1277.69 576.522L1275.73 576.937L1275.96 578.039L1277.03 578.411L1277.69 576.522ZM1276.94 572.976L1278.89 572.561L1278.64 571.356L1277.45 571.042L1276.94 572.976ZM1264.49 572.975L1263.98 571.041L1262.79 571.355L1262.54 572.561L1264.49 572.975ZM1263.74 576.521L1264.4 578.41L1265.47 578.039L1265.7 576.936L1263.74 
                                576.521ZM1252.84 581.254L1256.29 582.376L1257.52 578.573L1254.08 577.45L1252.84 581.254ZM1249.16 590.647C1250.19 586.86 1252.19 583.469 1254.88 580.762L1252.04 577.942C1248.87 581.13 1246.51 585.128 1245.3 589.601L1249.16 590.647ZM1251.27 591.063L1248.57 588.637L1245.89 591.611L1248.59 594.037L1251.27 591.063ZM1251.56 596.5C1251.56 595.275 1251.67 594.079 1251.89 592.921L1247.96 592.179C1247.7 593.58 1247.56 595.025 1247.56 596.5H1251.56ZM1251.89 600.079C1251.67 598.921 1251.56 597.725 1251.56 596.5H1247.56C1247.56 597.975 1247.7 599.42 1247.96 600.821L1251.89 600.079ZM1248.57 604.362L1251.27 601.937L1248.59 598.963L1245.89 601.388L1248.57 604.362ZM1254.88 612.238C1252.19 609.53 1250.19 606.14 1249.16 602.352L1245.3 603.398C1246.51 607.872 1248.87 611.869 1252.04 615.057L1254.88 612.238ZM1256.29 610.624L1252.84 611.746L1254.08 615.549L1257.52 614.427L1256.29 610.624ZM1264.4 614.59C1262.11 613.79 1260.01 612.566 1258.21 611.011L1255.6 614.04C1257.78 615.918 1260.31 617.398 1263.08 618.366L1264.4 614.59ZM1266.45 619.61L1265.7 616.063L1261.79 
                                616.893L1262.54 620.439L1266.45 619.61ZM1270.71 618.827C1268.74 618.827 1266.82 618.57 1265 618.09L1263.98 621.958C1266.13 622.525 1268.39 622.827 1270.71 622.827V618.827ZM1276.43 618.09C1274.6 618.57 1272.69 618.827 1270.71 618.827V622.827C1273.04 622.827 1275.29 622.525 1277.45 621.958L1276.43 618.09ZM1275.73 616.063L1274.98 619.609L1278.89 620.438L1279.64 616.892L1275.73 616.063ZM1283.22 611.01C1281.41 612.565 1279.32 613.789 1277.03 614.589L1278.35 618.365C1281.12 617.397 1283.65 615.917 1285.83 614.039L1283.22 611.01ZM1288.59 611.745L1285.14 610.623L1283.9 614.426L1287.35 615.549L1288.59 611.745ZM1292.27 602.351C1291.24 606.139 1289.24 609.53 1286.55 612.237L1289.39 615.057C1292.56 611.868 1294.92 607.87 1296.13 603.396L1292.27 602.351ZM1290.16 601.935L1292.86 604.361L1295.53 601.386L1292.84 598.961L1290.16 601.935ZM1289.87 596.5C1289.87 597.724 1289.75 598.92 1289.53 600.077L1293.47 600.819C1293.73 599.418 1293.87 597.974 1293.87 596.5H1289.87ZM1289.53 592.923C1289.75 594.08 1289.87 595.276 1289.87 596.5H1293.87C1293.87 595.025 1293.73 593.581 1293.47 592.18L1289.53 592.923ZM1292.86 588.639L1290.16 591.064L1292.84 594.039L1295.53 591.613L1292.86 588.639ZM1286.55 580.762C1289.24 583.47 1291.24 586.861 1292.27 590.649L1296.13 
                                589.603C1294.92 585.129 1292.56 581.131 1289.39 577.943L1286.55 580.762ZM1285.14 582.376L1288.59 581.254L1287.35 577.451L1283.9 578.573L1285.14 582.376ZM1277.03 578.411C1279.32 579.21 1281.41 580.434 1283.22 581.989L1285.83 578.96C1283.65 577.083 1281.12 575.602 1278.35 574.634L1277.03 578.411ZM1274.98 573.39L1275.73 576.937L1279.64 576.108L1278.89 572.561L1274.98 573.39ZM1270.71 574.173C1272.69 574.173 1274.6 574.429 1276.43 574.91L1277.45 571.042C1275.29 570.475 1273.04 570.173 1270.71 570.173V574.173ZM1265 574.909C1266.82 574.429 1268.74 574.173 1270.71 574.173V570.173C1268.39 570.173 1266.13 570.474 1263.98 571.041L1265 574.909ZM1265.7 576.936L1266.45 573.39L1262.54 572.561L1261.79 576.107L1265.7 576.936ZM1258.21 581.989C1260.01 580.433 1262.11 579.209 1264.4 578.41L1263.08 574.633C1260.31 575.601 1257.78 577.082 1255.6 578.96L1258.21 581.989Z"
              />
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle
              className="st44"
              r="28.37"
              transform="matrix(-1 0 0 1 1270.37 596.37)"
            ></circle>
            <path
              className="st45"
              d="M1272.16 587.739C1271.61 585.804 1268.87 585.804 1268.32 587.739L1267.81 589.511C1267.51 590.549 1266.45 591.164 1265.4 590.902L1263.61 590.454C1261.66 589.965 1260.29 592.339 1261.69 593.785L1262.97 595.109C1263.72 595.884 1263.72 597.116 1262.97 597.891L1261.69 599.215C1260.29 600.661 1261.66 603.035 1263.61 602.546L1265.4 602.098C1266.45 601.836 1267.51 602.451 1267.81 603.489L1268.32 605.261C1268.87 607.196 1271.61 607.196 1272.16 605.261L1272.67 603.489C1272.97 602.451 1274.03 601.836 1275.08 602.098L1276.87 602.546C1278.82 603.035 1280.19 600.661 1278.79 599.215L1277.51 597.891C1276.76 597.116 1276.76 595.884 1277.51 595.109L1278.79 593.785C1280.19 592.339 1278.82 589.965 1276.87 590.454L1275.08 590.902C1274.03 591.164 1272.97 590.549 1272.67 589.511L1272.16 587.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth63Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth63Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1306.65 598.3C1307.35 592.9 1305.75 587.8 1303.45 583C1301.25 578.5 1298.35 574.1 1294.45 570.6C1287.85 564.6 1278.85 560.1 1268.65 560.2C1259.15 560.3 1250.85 564.4 1244.65 569.9C1240.15 573.8 1236.75 578.8 1233.65 583.8C1231.55 587.1 1229.55 590.6 1229.35 594.8C1229.05 599.9 1232.05 604.3 1235.15 608C1238.55 612 1242.35 615.6 1245.65 619.9C1247.45 622.3 1249.25 624.8 1251.55 626.9C1255.45 630.4 1260.65 632.7 1266.25 633.5C1273.45 634.5 1280.85 633 1286.15 629C1289.15 626.7 1291.05 623.8 1293.15 621C1295.55 617.7 1298.15 614.4 1300.45 611C1303.35 607.1 1306.05 603.2 1306.65 598.3Z"
            ></path>
            <path
              className="st47"
              d="M1293.05 597.848C1293.5 594.327 1292.47 591.001 1290.98 587.87C1289.56 584.936 1287.69 582.066 1285.18 579.784C1280.92 575.871 1275.11 572.936 1268.53 573.001C1262.4 573.066 1257.04 575.74 1253.04 579.327C1250.14 581.87 1247.94 585.131 1245.94 588.392C1244.59 590.544 1243.3 592.827 1243.17 595.566C1242.97 598.892 1244.91 601.761 1246.91 604.174C1249.1 606.783 1251.56 609.131 1253.69 611.935C1254.85 613.5 1256.01 615.131 1257.49 616.5C1260.01 618.783 1263.37 620.283 1266.98 620.804C1271.62 621.457 1276.4 620.478 1279.82 617.87C1281.76 616.37 1282.98 614.478 1284.34 612.652C1285.89 610.5 1287.56 608.348 1289.05 606.131C1290.92 603.587 1292.66 601.044 1293.05 597.848Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1269.15 596)"
            ></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth63Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1306.65 598.3C1307.35 592.9 1305.75 587.8 1303.45 583C1301.25 578.5 1298.35 574.1 1294.45 570.6C1287.85 564.6 1278.85 560.1 1268.65 560.2C1259.15 560.3 1250.85 564.4 1244.65 569.9C1240.15 573.8 1236.75 578.8 1233.65 583.8C1231.55 587.1 1229.55 590.6 1229.35 594.8C1229.05 599.9 1232.05 604.3 1235.15 608C1238.55 612 1242.35 615.6 1245.65 619.9C1247.45 622.3 1249.25 624.8 1251.55 626.9C1255.45 630.4 1260.65 632.7 1266.25 633.5C1273.45 634.5 1280.85 633 1286.15 629C1289.15 626.7 1291.05 623.8 1293.15 621C1295.55 617.7 1298.15 614.4 1300.45 611C1303.35 607.1 1306.05 603.2 1306.65 598.3Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1293.05 597.848C1293.5 594.327 1292.46 591.001 1290.98 587.87C1289.56 584.936 1287.69 582.066 1285.17 579.784C1280.91 575.871 1275.11 572.936 1268.52 573.001C1262.39 573.066 1257.04 575.74 1253.04 579.327C1250.13 581.87 1247.94 585.131 1245.94 588.392C1244.59 590.544 1243.29 592.827 1243.17 595.566C1242.97 598.892 1244.91 601.761 1246.91 604.174C1249.1 606.783 1251.55 609.131 1253.68 611.935C1254.85 613.5 1256.01 615.131 1257.49 616.5C1260.01 618.783 1263.36 620.283 1266.98 620.804C1271.62 621.457 1276.4 620.478 1279.82 617.87C1281.75 616.37 1282.98 614.478 1284.33 612.652C1285.88 610.5 1287.56 608.348 1289.04 606.131C1290.92 603.587 1292.66 601.044 1293.05 597.848Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1269.15 596)"
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth63Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth63Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1306.65 598.3C1307.35 592.9 1305.75 587.8 1303.45 583C1301.25 578.5 1298.35 574.1 1294.45 570.6C1287.85 564.6 1278.85 560.1 1268.65 560.2C1259.15 560.3 1250.85 564.4 1244.65 569.9C1240.15 573.8 1236.75 578.8 1233.65 583.8C1231.55 587.1 1229.55 590.6 1229.35 594.8C1229.05 599.9 1232.05 604.3 1235.15 608C1238.55 612 1242.35 615.6 1245.65 619.9C1247.45 622.3 1249.25 624.8 1251.55 626.9C1255.45 630.4 1260.65 632.7 1266.25 633.5C1273.45 634.5 1280.85 633 1286.15 629C1289.15 626.7 1291.05 623.8 1293.15 621C1295.55 617.7 1298.15 614.4 1300.45 611C1303.35 607.1 1306.05 603.2 1306.65 598.3Z"
            ></path>
            <path
              className="st47"
              d="M1293.05 597.848C1293.5 594.327 1292.47 591.001 1290.98 587.87C1289.56 584.936 1287.69 582.066 1285.18 579.784C1280.92 575.871 1275.11 572.936 1268.53 573.001C1262.4 573.066 1257.04 575.74 1253.04 579.327C1250.14 581.87 1247.94 585.131 1245.94 588.392C1244.59 590.544 1243.3 592.827 1243.17 595.566C1242.97 598.892 1244.91 601.761 1246.91 604.174C1249.1 606.783 1251.56 609.131 1253.69 611.935C1254.85 613.5 1256.01 615.131 1257.49 616.5C1260.01 618.783 1263.37 620.283 1266.98 620.804C1271.62 621.457 1276.4 620.478 1279.82 617.87C1281.76 616.37 1282.98 614.478 1284.34 612.652C1285.89 610.5 1287.56 608.348 1289.05 606.131C1290.92 603.587 1292.66 601.044 1293.05 597.848Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth63Diagnozis.culttab &&
                !tooth63Diagnozis.abutment &&
                !tooth63Diagnozis.implant &&
                !tooth63Diagnozis.apex &&
                !tooth63Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1312.3,575.5c-0.7-1.5-1.4-3-2.2-4.5c-2.4-4.5-5.3-8.7-8.8-12.3
                            c-8-8.1-19.2-14.1-31.7-13.9c-11.7,0.2-21.9,5.8-29.6,13.2c-5.5,5.4-9.7,12-13.5,18.8c-0.9,1.6-1.8,3.2-2.6,4.9
                            c-1.5,3.1-2.6,6.4-2.8,10c-0.4,7,3.2,12.9,7,17.9c4.2,5.5,8.8,10.3,12.9,16.1c1.5,2.1,2.9,4.3,4.5,6.4c0.9,1.1,1.8,2.1,2.8,3.1
                            c4.8,4.7,11.2,7.8,18,8.9c8.8,1.4,18-0.8,24.4-6.2c3.7-3.1,6.1-7,8.6-10.8c1.4-2.1,2.8-4.2,4.2-6.2c1.7-2.4,3.3-4.9,4.9-7.3
                            c3.6-5.5,7-10.8,7.8-17.4C1317.1,588.9,1315.2,582,1312.3,575.5z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth63.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1240.43 627.604C1242.68 631.116 1243.81 634.775 1246.69 637.848C1249.24 640.528 1253.37 643.966 1256.66 645.621C1259.65 647.129 1262.87 648.186 1266.22 648.744C1272.02 649.686 1277.92 647.875 1283.16 645.786C1286.06 644.629 1289.89 643.008 1292.26 640.921C1294.26 639.127 1294.74 637.084 1296.21 634.946C1297.49 633.073 1298.66 631.127 1299.89 629.214C1301.39 626.797 1304.09 624.381 1305.64 621.947C1307.19 619.515 1307.59 617.066 1309.03 614.58C1310.78 611.731 1312.53 610.121 1313.93 607.09C1315.35 604.049 1316.41 599.586 1316.79 595.994C1317.26 591.724 1316.9 587.582 1316 583.568C1315.25 580.154 1315.24 575.595 1313.91 572.366C1312.31 568.547 1309.29 566.014 1307.03 562.521C1305.4 559.992 1304.7 557.609 1302.65 555.458C1300.01 552.659 1295.94 550.082 1292.75 547.876C1290.97 546.652 1289.12 544.303 1287.2 543.332C1285.17 542.311 1283.07 542.682 1280.91 541.998C1277.19 540.827 1273.28 538.954 1269.22 539.001C1266.25 539.037 1263.37 539.44 1260.6 540.148C1257.69 540.894 1254.9 543.216 1252.26 544.57C1249.63 545.918 1246.01 547.533 1243.68 549.348C1241.68 550.91 1240.93 552.62 1239.18 554.434C1237.31 556.324 1234.47 558.39 1232.87 560.574C1231.3 562.718 1229.84 564.975 1229.59 567.29C1228.12 569.742 1225.61 572.258 1224.28 574.775C1222.76 577.562 1222.41 580.446 1221.39 583.568C1220.64 585.856 1220.13 588.273 1220.02 590.873C1219.83 594.689 1220.72 599.476 1222.15 602.757C1223.52 605.892 1225.39 607.544 1227.28 610.19C1229.44 613.157 1230.6 615.975 1232.87 618.852C1235.08 621.649 1238.39 624.502 1240.43 627.604ZM1303.39 582.999C1305.69 587.799 1307.29 592.899 1306.59 598.299C1305.99 603.199 1303.19 607.099 1300.39 610.999C1298.09 614.399 1295.49 617.699 1293.09 620.999C1290.99 623.799 1289.09 626.699 1286.09 628.999C1280.79 632.999 1273.39 634.499 1266.19 633.499C1260.59 632.699 1255.39 630.399 1251.49 626.899C1249.19 624.799 1247.39 622.299 1245.59 619.899C1242.29 615.599 1238.49 611.999 1235.09 607.999C1231.99 604.299 1228.99 599.899 1229.29 594.799C1229.49 590.599 1231.49 587.099 1233.59 583.799C1236.69 578.799 1240.09 573.799 1244.59 569.899C1250.79 564.399 1259.09 560.299 1268.59 560.199C1278.79 560.099 1287.79 564.599 1294.39 570.599C1298.29 574.099 1301.19 578.499 1303.39 582.999Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1240.43 627.604C1242.68 631.116 1243.81 634.775 1246.69 637.848C1249.24 640.528 1253.37 643.966 1256.66 645.621C1259.65 647.129 1262.87 648.186 1266.22 648.744C1272.02 649.686 1277.92 647.875 1283.16 645.786C1286.06 644.629 1289.89 643.008 1292.26 640.921C1294.26 639.127 1294.74 637.084 1296.21 634.946C1297.49 633.073 1298.66 631.127 1299.89 629.214C1301.39 626.797 1304.09 624.381 1305.64 621.947C1307.19 619.515 1307.59 617.066 1309.03 614.58C1310.78 611.731 1312.53 610.121 1313.93 607.09C1315.35 604.049 1316.41 599.586 1316.79 595.994C1317.26 591.724 1316.9 587.582 1316 583.568C1315.25 580.154 1315.24 575.595 1313.91 572.366C1312.31 568.547 1309.29 566.014 1307.03 562.521C1305.4 559.992 1304.7 557.609 1302.65 555.458C1300.01 552.659 1295.94 550.082 1292.75 547.876C1290.97 546.652 1289.12 544.303 1287.2 543.332C1285.17 542.311 1283.07 542.682 1280.91 541.998C1277.19 540.827 1273.28 538.954 1269.22 539.001C1266.25 539.037 1263.37 539.44 1260.6 540.148C1257.69 540.894 1254.9 543.216 1252.26 544.57C1249.63 545.918 1246.01 547.533 1243.68 549.348C1241.68 550.91 1240.93 552.62 1239.18 554.434C1237.31 556.324 1234.47 558.39 1232.87 560.574C1231.3 562.718 1229.84 564.975 1229.59 567.29C1228.12 569.742 1225.61 572.258 1224.28 574.775C1222.76 577.562 1222.41 580.446 1221.39 583.568C1220.64 585.856 1220.13 588.273 1220.02 590.873C1219.83 594.689 1220.72 599.476 1222.15 602.757C1223.52 605.892 1225.39 607.544 1227.28 610.19C1229.44 613.157 1230.6 615.975 1232.87 618.852C1235.08 621.649 1238.39 624.502 1240.43 627.604ZM1303.39 582.999C1305.69 587.799 1307.29 592.899 1306.59 598.299C1305.99 603.199 1303.19 607.099 1300.39 610.999C1298.09 614.399 1295.49 617.699 1293.09 620.999C1290.99 623.799 1289.09 626.699 1286.09 628.999C1280.79 632.999 1273.39 634.499 1266.19 633.499C1260.59 632.699 1255.39 630.399 1251.49 626.899C1249.19 624.799 1247.39 622.299 1245.59 619.899C1242.29 615.599 1238.49 611.999 1235.09 607.999C1231.99 604.299 1228.99 599.899 1229.29 594.799C1229.49 590.599 1231.49 587.099 1233.59 583.799C1236.69 578.799 1240.09 573.799 1244.59 569.899C1250.79 564.399 1259.09 560.299 1268.59 560.199C1278.79 560.099 1287.79 564.599 1294.39 570.599C1298.29 574.099 1301.19 578.499 1303.39 582.999Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st61 level1"
              d="M1243.11 623.57C1245.11 626.407 1246.11 629.362 1248.66 631.845C1250.93 634.01 1254.59 636.786 1257.5 638.124C1260.15 639.342 1263.01 640.195 1265.98 640.646C1271.12 641.407 1276.35 639.944 1281 638.257C1283.57 637.322 1286.97 636.012 1289.06 634.327C1290.84 632.878 1291.27 631.227 1292.57 629.501C1293.7 627.988 1294.74 626.416 1295.83 624.871C1297.17 622.919 1299.55 620.967 1300.93 619.001C1302.3 617.037 1302.66 615.058 1303.93 613.05C1305.49 610.749 1307.04 609.449 1308.28 607.001C1309.54 604.544 1310.48 600.939 1310.82 598.038C1311.24 594.589 1310.91 591.243 1310.12 588.001C1309.45 585.243 1309.44 581.561 1308.26 578.953C1306.85 575.868 1304.17 573.822 1302.17 571.001C1300.72 568.958 1300.09 567.033 1298.28 565.296C1295.94 563.035 1292.33 560.954 1289.5 559.172C1287.93 558.182 1286.28 556.285 1284.58 555.501C1282.78 554.676 1280.92 554.976 1279 554.423C1275.71 553.478 1272.24 551.965 1268.64 552.003C1266.01 552.032 1263.45 552.357 1261 552.929C1258.42 553.531 1255.95 555.407 1253.6 556.501C1251.27 557.59 1248.06 558.895 1246 560.36C1244.22 561.622 1243.55 563.003 1242 564.468C1240.35 565.995 1237.83 567.664 1236.41 569.428C1235.02 571.159 1233.73 572.983 1233.5 574.853C1232.2 576.833 1229.98 578.866 1228.8 580.899C1227.45 583.15 1227.14 585.479 1226.23 588.001C1225.57 589.849 1225.12 591.801 1225.02 593.901C1224.85 596.984 1225.64 600.851 1226.91 603.501C1228.12 606.033 1229.78 607.367 1231.46 609.504C1233.37 611.901 1234.4 614.177 1236.41 616.501C1238.37 618.76 1241.31 621.065 1243.11 623.57ZM1303.4 583C1305.7 587.8 1307.3 592.9 1306.6 598.3C1306 603.2 1303.2 607.1 1300.4 611C1298.1 614.4 1295.5 617.7 1293.1 621C1291 623.8 1289.1 626.7 1286.1 629C1280.8 633 1273.4 634.5 1266.2 633.5C1260.6 632.7 1255.4 630.4 1251.5 626.9C1249.2 624.8 1247.4 622.3 1245.6 619.9C1242.3 615.6 1238.5 612 1235.1 608C1232 604.3 1229 599.9 1229.3 594.8C1229.5 590.6 1231.5 587.1 1233.6 583.8C1236.7 578.8 1240.1 573.8 1244.6 569.9C1250.8 564.4 1259.1 560.3 1268.6 560.2C1278.8 560.1 1287.8 564.6 1294.4 570.6C1298.3 574.1 1301.2 578.5 1303.4 583Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth63Diagnozis.culttab &&
                !tooth63Diagnozis.abutment &&
                !tooth63Diagnozis.implant &&
                !tooth63Diagnozis.shaper &&
                !tooth63Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС LEFT*/}
            <g
              id="s_header_63_4"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1258,606.7c0,0.1-0.1,0.2-0.2,0.5c-1.3,2-7.8,9.8-9.4,12.8c-1.3,2.4-2.7,7.3-2.8,12.1
                                c-1.6-2.1-3.1-4.3-4.5-6.4c-4.1-5.8-8.7-10.6-12.9-16.1c-3.8-5-7.4-10.9-7-17.9c0.2-3.6,1.3-6.9,2.8-10c6.4,4.1,19,12.2,22.4,14.5
                                C1251,599.5,1258,606,1258,606.7z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth63.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth63.seal_left ? `seal-fill ${teethDiagnozis.tooth63.seal_left_color}` : ''}
                                `}
                d="M1258,606.7c0,0.1-0.1,0.2-0.2,0.5c-1.3,2-7.8,9.8-9.4,12.8c-1.3,2.4-2.7,7.3-2.8,12.1
                                c-1.6-2.1-3.1-4.3-4.5-6.4c-4.1-5.8-8.7-10.6-12.9-16.1c-3.8-5-7.4-10.9-7-17.9c0.2-3.6,1.3-6.9,2.8-10c6.4,4.1,19,12.2,22.4,14.5
                                C1251,599.5,1258,606,1258,606.7z"
              />
            </g>
            <g
              id="s_header_63_3"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M1303.6,620.9c-1.4,2.1-2.8,4.2-4.2,6.2c-2.5,3.8-4.9,7.7-8.6,10.8c-6.5,5.4-15.6,7.6-24.4,6.2
                                c-6.8-1.1-13.2-4.2-18-8.9c-1-1-1.9-2-2.8-3.1c0.1-4.8,1.5-9.7,2.8-12.1c1.6-3,8.1-10.8,9.4-12.8c3.4-1,8.1-1.9,14.2-1.8
                                c3.1,0.1,6.3,0.6,9.5,1.4C1291.1,609.3,1300.4,614.8,1303.6,620.9z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth63.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth63.seal_bottom ? `seal-fill ${teethDiagnozis.tooth63.seal_bottom_color}` : ''}
                                `}
                d="M1303.6,620.9c-1.4,2.1-2.8,4.2-4.2,6.2c-2.5,3.8-4.9,7.7-8.6,10.8c-6.5,5.4-15.6,7.6-24.4,6.2
                                c-6.8-1.1-13.2-4.2-18-8.9c-1-1-1.9-2-2.8-3.1c0.1-4.8,1.5-9.7,2.8-12.1c1.6-3,8.1-10.8,9.4-12.8c3.4-1,8.1-1.9,14.2-1.8
                                c3.1,0.1,6.3,0.6,9.5,1.4C1291.1,609.3,1300.4,614.8,1303.6,620.9z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_63_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M1316.2,596.2c-0.8,6.6-4.2,12-7.8,17.4c-1.6,2.4-3.2,4.8-4.9,7.3c-3.2-6-12.4-11.6-22.2-14.1
                                c-5-7.5,4.4-13.8,9.2-18.3c5.1-4.8,14.8-13.3,19.5-17.5c0.8,1.5,1.5,3,2.2,4.5C1315.2,582,1317.1,588.9,1316.2,596.2z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth63.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth63.seal_right ? `seal-fill ${teethDiagnozis.tooth63.seal_right_color}` : ''}
                                `}
                d="M1316.2,596.2c-0.8,6.6-4.2,12-7.8,17.4c-1.6,2.4-3.2,4.8-4.9,7.3c-3.2-6-12.4-11.6-22.2-14.1
                                c-5-7.5,4.4-13.8,9.2-18.3c5.1-4.8,14.8-13.3,19.5-17.5c0.8,1.5,1.5,3,2.2,4.5C1315.2,582,1317.1,588.9,1316.2,596.2z"
              />
            </g>
            {/*КАРИЕС TOP*/}
            <g
              id="s_header_63_1"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M1310.1,571c-4.7,4.1-14.5,12.7-19.5,17.5c-4.8,4.5-14.2,10.8-9.2,18.3c-3.2-0.8-6.4-1.3-9.5-1.4
                                c-6.1-0.2-10.8,0.7-14.2,1.8c0.2-0.2,0.2-0.4,0.2-0.5c0-0.7-7-7.2-11.7-10.3c-3.4-2.3-16-10.4-22.4-14.5c0.8-1.7,1.7-3.3,2.6-4.9
                                c3.8-6.8,8-13.5,13.5-18.8c7.7-7.4,17.9-13,29.6-13.2c12.5-0.2,23.7,5.8,31.7,13.9C1304.9,562.3,1307.8,566.6,1310.1,571z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth63.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth63.seal_top ? `seal-fill ${teethDiagnozis.tooth63.seal_top_color}` : ''}
                                `}
                d="M1310.1,571c-4.7,4.1-14.5,12.7-19.5,17.5c-4.8,4.5-14.2,10.8-9.2,18.3c-3.2-0.8-6.4-1.3-9.5-1.4
                                c-6.1-0.2-10.8,0.7-14.2,1.8c0.2-0.2,0.2-0.4,0.2-0.5c0-0.7-7-7.2-11.7-10.3c-3.4-2.3-16-10.4-22.4-14.5c0.8-1.7,1.7-3.3,2.6-4.9
                                c3.8-6.8,8-13.5,13.5-18.8c7.7-7.4,17.9-13,29.6-13.2c12.5-0.2,23.7,5.8,31.7,13.9C1304.9,562.3,1307.8,566.6,1310.1,571z"
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_right &&
                      !tooth63Diagnozis.seal_bottom &&
                      !tooth63Diagnozis.seal_center) ||
                    (tooth63Diagnozis.seal_bottom &&
                      !tooth63Diagnozis.seal_center &&
                      !tooth63Diagnozis.seal_left &&
                      !tooth63Diagnozis.seal_right &&
                      tooth63Diagnozis.seal_top) ||
                    (!tooth63Diagnozis.seal_right &&
                      !tooth63Diagnozis.seal_top &&
                      !tooth63Diagnozis.seal_center &&
                      tooth63Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1281.5 607.5C1285 607.833 1293.8 610.3 1301 617.5"
              />
              {/*Овал лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_right &&
                      !tooth63Diagnozis.seal_top) ||
                    (!tooth63Diagnozis.seal_right && tooth63Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1282 607C1284 593.286 1300 581.095 1307 575"
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_bottom &&
                      !tooth63Diagnozis.seal_top) ||
                    (!tooth63Diagnozis.seal_bottom &&
                      !tooth63Diagnozis.seal_center &&
                      tooth63Diagnozis.seal_top) ||
                    (tooth63Diagnozis.seal_right &&
                      !tooth63Diagnozis.seal_bottom &&
                      tooth63Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1282 607.5C1277.83 606.167 1267.8 603.7 1259 608.5"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_left &&
                      !tooth63Diagnozis.seal_top) ||
                    (!tooth63Diagnozis.seal_left && tooth63Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1259 608.5C1256.83 604.167 1247.8 593.5 1229 585.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_left &&
                      !tooth63Diagnozis.seal_bottom) ||
                    (!tooth63Diagnozis.seal_left &&
                      tooth63Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1259 608.5C1255.83 610.333 1249.5 614.7 1247.5 625.5"
              />
            </g>
          </g>
          {/* VINIR */}
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth63Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth63Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth63Diagnozis.vinir_color}`}
                d="M1312.3 575.5C1311.6 574 1310.9 572.5 1310.1 571C1307.7 566.5 1304.8 562.3 1301.3 558.7C1293.3 550.6 1282.1 544.6 1269.6 544.8C1257.9 545 1247.7 550.6 1240 558C1234.5 563.4 1230.3 570 1226.5 576.8C1225.6 578.4 1224.7 580 1223.9 581.7C1222.4 584.8 1221.3 588.1 1221.1 591.7C1221.07 592.16 1221.06 592.615 1221.07 593.065C1223.78 592.841 1229.52 591.614 1230.75 588.5C1231.14 587.155 1231.67 585.861 1232.28 584.608C1232.93 583.244 1233.65 581.96 1234.38 580.677C1237.45 575.221 1240.84 569.926 1245.28 565.594C1251.5 559.657 1259.74 555.164 1269.18 555.004C1279.28 554.843 1288.32 559.657 1294.78 566.156C1297.61 569.044 1299.95 572.413 1301.89 576.024C1302.53 577.227 1303.1 578.43 1303.67 579.634C1304.95 582.493 1305.99 585.448 1306.55 588.5C1308.86 592.1 1314.09 593 1316.42 593C1316.51 586.876 1314.77 581.042 1312.3 575.5Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth63Diagnozis.temporary_crown ||
                tooth63Diagnozis.ceramic_crown ||
                tooth63Diagnozis.mceramic_crown ||
                tooth63Diagnozis.metalic_crown ||
                tooth63Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth63Diagnozis.temporary_crown ||
                tooth63Diagnozis.ceramic_crown ||
                tooth63Diagnozis.mceramic_crown ||
                tooth63Diagnozis.metalic_crown ||
                tooth63Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth63Diagnozis.ceramic_crown_color}
                                ${tooth63Diagnozis.mceramic_crown_color}
                                ${tooth63Diagnozis.metalic_crown_color}
                                ${tooth63Diagnozis.zirconia_crown_color}
                            `}
              d="M1312.3,575.5c-0.7-1.5-1.4-3-2.2-4.5c-2.4-4.5-5.3-8.7-8.8-12.3
                            c-8-8.1-19.2-14.1-31.7-13.9c-11.7,0.2-21.9,5.8-29.6,13.2c-5.5,5.4-9.7,12-13.5,18.8c-0.9,1.6-1.8,3.2-2.6,4.9
                            c-1.5,3.1-2.6,6.4-2.8,10c-0.4,7,3.2,12.9,7,17.9c4.2,5.5,8.8,10.3,12.9,16.1c1.5,2.1,2.9,4.3,4.5,6.4c0.9,1.1,1.8,2.1,2.8,3.1
                            c4.8,4.7,11.2,7.8,18,8.9c8.8,1.4,18-0.8,24.4-6.2c3.7-3.1,6.1-7,8.6-10.8c1.4-2.1,2.8-4.2,4.2-6.2c1.7-2.4,3.3-4.9,4.9-7.3
                            c3.6-5.5,7-10.8,7.8-17.4C1317.1,588.9,1315.2,582,1312.3,575.5z"
            />
            {/* FISSURES */}
            <path
              className="st3 fissure"
              d="M1254.4,610.4l-0.4-1c4.7-2,9.8-3.2,15.1-3.7c5-0.5,10.1-0.2,15.1,0.7l-0.2,1.1c-4.9-0.9-9.8-1.1-14.8-0.7
                            C1264.1,607.2,1259.1,608.5,1254.4,610.4z"
            />
          </g>
          {/* FISSURES */}
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{ visibility: 'hidden' }}
          >
            <path
              className="st3 fissure"
              d="M1254.4,610.4l-0.4-1c4.7-2,9.8-3.2,15.1-3.7c5-0.5,10.1-0.2,15.1,0.7l-0.2,1.1c-4.9-0.9-9.8-1.1-14.8-0.7
                            C1264.1,607.2,1259.1,608.5,1254.4,610.4z"
              style={{ stroke: 'none' }}
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 39, 95)',
          }}
          onMouseOver={() => {
            showHideTopCommonView('over');
          }}
          onMouseLeave={() => {
            showHideTopCommonView('leave');
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_21"
              style={{
                visibility:
                  !tooth63Diagnozis.implant &&
                  !tooth63Diagnozis.apex &&
                  !tooth63Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth63Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1312.9,431.4c-0.2,6.4-0.3,12.9-2.4,19c-3.2,9.4-10.5,17-17.1,24.8
                                c-4.8,5.7-9.4,11.7-16.4,14.9c-1.3,0.6-2.7,1.1-4,1.5c-1.4-0.4-2.7-1-4-1.6c-6.1-3.2-10-8.8-15.2-13c-6-4.8-13.8-7.9-18.2-14
                                c-4.5-6.2-4.4-13.4-3.6-20.6c0.8-7.8,2.3-15.8,4.1-23.6c4.3-18.8,9.8-37.4,15-56c-4.9,17.5-10,34.9-14.2,52.5
                                c4.7-6.5,10.5-12.4,16.8-17.7c3.7-3.1,7.6-6,12.2-7.5c1-0.3,2.1-0.6,3.1-0.8c2-0.4,4.1-0.5,6.2-0.3c4.8,0.3,9.4,1.7,13.6,3.9
                                c5.9,3.2,10.9,8.2,14.4,14.3c3,5.3,4.8,11.2,6.6,17c1,3.2,2.1,6.3,3,9.5C1312.9,433,1312.9,432.2,1312.9,431.4z"
              />
            </g>
            {/*змінений у кольорі*/}
            <g
              id="dentin_n_21"
              style={{
                visibility:
                  !tooth63Diagnozis.implant &&
                  !tooth63Diagnozis.abutment &&
                  !tooth63Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth63Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1319.1,302.9c-0.1,16.8-0.6,33.7-1.2,50.5c-0.5,13.5-1.1,27-2.2,40.5
                                c-1,11.6-2.4,23.1-2.7,34.9c-0.1,1.7-0.1,3.4-0.1,5.2c-1-3.2-2-6.3-3-9.5c-1.9-5.8-3.6-11.7-6.6-17c-3.5-6.1-8.4-11.1-14.4-14.3
                                c-4.1-2.2-8.7-3.6-13.5-3.9c-2.1-0.1-4.2,0-6.2,0.3c-1.1,0.2-2.1,0.5-3.1,0.8c-4.6,1.5-8.5,4.4-12.2,7.5
                                c-6.3,5.2-12.1,11.1-16.8,17.6c6.8-28.9,16.3-57.2,22.9-86.2c2.6-11.4,4.7-23,7.1-34.4c2.2-10.2,4.7-20.4,7.2-30.6
                                c3.7-15.1,7.6-30.1,11.8-45c2.4-8.4,7.5-16.7,16-15.5c0.3,0,0.7,0.1,1,0.2c0,0,0,0,0,0c7.5,1.8,9.2,10.5,9.7,18.4
                                c0.3,6.2,1.2,12.3,2.1,18.5c0.9,6.1,1.9,12.3,2.6,18.4C1318.9,273.6,1319.2,288.3,1319.1,302.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth63Diagnozis.channel_class} ${tooth63Diagnozis.channel_class} ${tooth63Diagnozis.pulpit ? 'pulpit' : ''} ${tooth63Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1288,392.6c0.3,0.1,0.5,0.3,0.8,0.4c-0.8,8.9-1.6,17.9-2.7,26.8
                                c-0.9,8-1.6,16-4.7,23.7c-1.4,3.5-3.4,6.8-5.6,9.9c-0.8,1-2.2,1.4-3.4,1.1c-1.6-0.4-2.4-1.9-3.1-3.2c-1.4-2.8-2.9-5.7-4-8.6
                                c-1.8-4.9-2.9-10.1-3-15.3c-0.2-8.2,1.6-16.2,3.5-24.2c1.1-4.6,2.2-9.1,3.2-13.7c0.3,0,0.5-0.1,0.8-0.1c0.2,0,0.4-0.1,0.6-0.1
                                c0.2,0,0.5-0.1,0.7-0.1c0.1,0,0.2,0,0.3,0c0.2,0,0.4,0,0.5,0c0.2,0,0.5,0,0.7,0c0.9,0,1.8,0,2.6,0c0.3,0,0.6,0,0.9,0.1
                                c0.3,0,0.6,0,0.9,0.1c0.3,0,0.5,0.1,0.8,0.1c1.2,0.2,2.5,0.4,3.6,0.7c0.3,0.1,0.6,0.2,0.8,0.2c0.3,0.1,0.6,0.2,0.8,0.3
                                c0.3,0.1,0.6,0.2,0.9,0.3c0.8,0.3,1.6,0.6,2.4,1c0.3,0.1,0.5,0.2,0.8,0.4C1287.5,392.4,1287.8,392.5,1288,392.6z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth63Diagnozis.channel_class} ${tooth63Diagnozis.channel_class} ${tooth63Diagnozis.pulpit ? 'pulpit' : ''} ${tooth63Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1295,299c-0.3,4.3-0.6,8.5-0.8,12.8c-1.6,27.1-3.1,54.2-5.4,81.2
                                c-0.3-0.1-0.5-0.3-0.8-0.4c-0.3-0.1-0.5-0.3-0.8-0.4c-0.3-0.1-0.5-0.3-0.8-0.4c-0.8-0.3-1.6-0.7-2.4-1c-0.3-0.1-0.6-0.2-0.9-0.3
                                c-0.3-0.1-0.6-0.2-0.8-0.3c-0.3-0.1-0.6-0.2-0.8-0.2c-1.2-0.3-2.4-0.6-3.6-0.7c-0.2,0-0.5-0.1-0.8-0.1c-0.3,0-0.6-0.1-0.9-0.1
                                c-0.3,0-0.6,0-0.9-0.1c-0.9,0-1.8-0.1-2.6,0c-0.2,0-0.5,0-0.7,0c-0.2,0-0.3,0-0.5,0c-0.1,0-0.2,0-0.3,0c-0.2,0-0.5,0-0.7,0.1
                                c-0.2,0-0.4,0-0.6,0.1c-0.3,0-0.5,0.1-0.8,0.1c5.5-23.6,10.8-47.3,15.5-71c1.4-6.7,2.6-13.5,3.9-20.2c1.8,0,3.6,0.1,5.2,0.4
                                C1294.2,298.8,1294.6,298.9,1295,299z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth63Diagnozis.channel_class} ${tooth63Diagnozis.channel_class} ${tooth63Diagnozis.pulpit ? 'pulpit' : ''} ${tooth63Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1303,202.8c0,0.3-0.1,0.7-0.1,1c-3.2,31.6-5.8,63.4-7.9,95.2
                                c-0.4-0.1-0.9-0.2-1.3-0.3c-1.6-0.3-3.4-0.5-5.2-0.4c5.8-31.4,10.6-62.9,14.4-94.5C1302.9,203.5,1303,203.1,1303,202.8z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage63 />
          </g>
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth63Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1312.8 433.8C1312.6 439.4 1312.3 445 1310.5 450.4C1307.3 459.8 1300 467.4 1293.4 475.2C1288.6 480.9 1284 486.9 1277 490.1C1275.7 490.7 1274.4 491.2 1273 491.6C1271.6 491.2 1270.2 490.6 1269 490C1262.9 486.8 1259 481.2 1253.8 477C1247.8 472.2 1240 469.1 1235.6 463C1231.1 456.8 1231.2 449.7 1232 442.4C1232.8 434.5 1234.3 426.6 1236.1 418.8C1236.4 417.6 
                            1236.6 416.5 1236.9 415.3C1241.6 408.8 1247.4 402.9 1253.7 397.7C1257.4 394.6 1261.3 391.7 1265.9 390.2C1268.9 389.2 1272.1 388.9 1275.3 389.1C1287.1 389.8 1297.4 397 1303.2 407.3C1306.2 412.6 1308 418.5 1309.8 424.3C1310.8 427.5 1311.9 430.7 1312.8 433.8Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st57"
              d="M1294.1 293.299L1284.3 485.299C1282.1 487.299 1279.7 488.999 1277 490.299C1275.7 490.899 1274.4 491.399 1273 491.799C1271.6 491.399 1270.3 490.799 1269 490.199C1266.3 488.799 1263.9 486.799 
                            1261.8 484.799L1288.5 294.299C1288.6 292.199 1290.8 290.799 1292.7 291.699C1293.4 291.799 1293.9 292.499 1294.1 293.299Z"
              style={{ fill: tooth63Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth63Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth63Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st16"
              d="M1295.3,398.9c-0.2-0.2-0.4-0.4-0.6-0.5c-1.9-1.7-4-3.1-6.2-4.4h0c-0.3-0.1-0.5-0.3-0.8-0.4
                            s-0.5-0.3-0.8-0.4c-0.3-0.1-0.5-0.3-0.8-0.4c-0.3-0.1-0.6-0.3-0.9-0.4c-0.2-0.1-0.5-0.2-0.7-0.3c-0.2-0.1-0.5-0.2-0.7-0.3
                            c0,0-0.1,0-0.1,0c-0.3-0.1-0.6-0.2-0.8-0.3c-0.3-0.1-0.6-0.2-0.8-0.3h0c-0.3-0.1-0.6-0.2-0.8-0.2c0,0,0,0,0,0
                            c-0.3-0.1-0.6-0.1-0.9-0.2c-0.6-0.1-1.2-0.3-1.8-0.4c-0.3,0-0.6-0.1-0.9-0.1c-0.2,0-0.5-0.1-0.8-0.1c-0.3,0-0.6-0.1-0.9-0.1
                            c-0.3,0-0.6-0.1-0.9-0.1c-0.9-0.1-1.8-0.1-2.6,0c-0.2,0-0.5,0-0.7,0c-0.2,0-0.3,0-0.5,0c-0.1,0-0.2,0-0.3,0c-0.2,0-0.5,0-0.7,0.1
                            c-0.1,0-0.2,0-0.2,0c0,0,0,0-0.1,0c-0.1,0-0.2,0-0.3,0c-0.2,0-0.5,0.1-0.7,0.1c0,0,0,0-0.1,0c0,0,0,0,0,0c-0.3,0-0.5,0.1-0.8,0.1
                            c-0.3,0.1-0.5,0.1-0.8,0.2c-0.3,0.1-0.6,0.1-0.8,0.2c-0.2,0.1-0.5,0.1-0.7,0.2c-1.1,0.4-2.2,0.8-3.2,1.3c1.6-1.1,3.1-2.1,4.7-3
                            l21.5-95.4c0.1-2.1,2.3-3.5,4.2-2.7c0.8,0.3,1.3,1,1.5,1.8l-0.7,103.2C1294.2,397.3,1294.8,398.1,1295.3,398.9z"
            />
            <path
              className="st15"
              d="M1312.8,433.8c-0.2,5.6-0.5,11.2-2.3,16.6c-3.2,9.4-10.5,17-17.1,24.8c-4.8,5.7-9.4,11.7-16.4,14.9
                            c-1.3,0.6-2.6,1.1-4,1.5c-1.4-0.4-2.8-1-4-1.6c-6.1-3.2-10-8.8-15.2-13c-6-4.8-13.8-7.9-18.2-14c-4.5-6.2-4.4-13.3-3.6-20.6
                            c0.8-7.9,2.3-15.8,4.1-23.6c0.3-1.2,0.5-2.3,0.8-3.5c4.7-6.5,10.5-12.4,16.8-17.6c3.7-3.1,7.6-6,12.2-7.5c3-1,6.2-1.3,9.4-1.1
                            c11.8,0.7,22.1,7.9,27.9,18.2c3,5.3,4.8,11.2,6.6,17C1310.8,427.5,1311.9,430.7,1312.8,433.8z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth63Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth63Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M1236.9,415.7c4.4-5.6,11.3-13.3,16.8-17.9c3.7-3.1,7.6-6,12.2-7.5c3-1,6.2-1.3,9.3-1.1
                            c11.8,0.7,22.1,7.9,27.9,18.2c1.5,2.7,8.7,23.5,9.7,26.4l-14.5-52.4l-37.6-4.9L1236.9,415.7z"
            />
            <path
              className="st17"
              d="M1235.7,463.1c4.4,6.1,12.2,9.2,18.2,14c5.2,4.2,9.1,9.8,15.2,13c1.3,0.7,2.6,1.2,4,1.6
                            c1.4-0.4,2.8-0.9,4.1-1.5c7-3.3,11.6-9.3,16.3-14.9c6.6-7.8,13.9-15.4,17.1-24.8c1.8-5.4,2.2-11,2.3-16.6c-1-3.2-2-6.3-3-9.5
                            c-0.9-2.9-1.8-5.8-2.8-8.6c-1-2.9-2.2-5.7-3.8-8.4c-5.9-10.3-16.1-17.5-27.9-18.2c-3.2-0.2-6.3,0.2-9.3,1.1
                            c-4.6,1.5-8.5,4.4-12.2,7.5c-5.5,4.6-10.6,9.7-15,15.2l0,0c-0.6,0.8-1.2,1.6-1.8,2.4c-0.3,1.2-0.5,2.3-0.8,3.4
                            c-1.8,7.8-3.2,15.7-4.1,23.6C1231.3,449.7,1231.2,456.8,1235.7,463.1z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1246.71 414.639C1245.97 417 1247.53 419.453 1249.98 419.788L1296.49 426.139C1298.94 426.474 1301.1 424.531 1301.03 422.061L1299.87 382.117C1299.82 380.157 1298.35 378.526 1296.4 378.268L1262.87 373.805C1260.94 373.547 1259.1 374.721 1258.52 376.584L1246.71 414.639Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility: tooth63Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth63Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st18"
              d="M1255.7,376l49.4,6.4c3.2-26.2,5.8-52.5,7.9-78.8c2-25.5,3.3-51,4.2-76.5c-3.4-5.1-8.6-8.5-14.6-9.3
                            c-6.3-0.9-12.8,1.1-18.1,5.6c-5.5,26.3-10.7,52.5-15.7,78.8C1264.2,326.8,1259.8,351.4,1255.7,376z"
            ></path>
            <line
              className="st19"
              x1="1254.3"
              y1="354"
              x2="1310.7"
              y2="368.8"
            ></line>
            <line
              className="st19"
              x1="1258.2"
              y1="324"
              x2="1314.6"
              y2="338.8"
            ></line>
            <line
              className="st19"
              x1="1263.2"
              y1="294.1"
              x2="1319.6"
              y2="308.8"
            ></line>
            <line
              className="st19"
              x1="1267.1"
              y1="264.1"
              x2="1323.5"
              y2="278.8"
            ></line>
            <line
              className="st19"
              x1="1271"
              y1="234"
              x2="1327.3"
              y2="248.8"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth63Diagnozis.culttab &&
                !tooth63Diagnozis.abutment &&
                !tooth63Diagnozis.implant &&
                !tooth63Diagnozis.shaper &&
                !tooth63Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1315.1,442.8c-0.5-2.3-1-4.7-1.7-7c-1.1-3.8-2.4-7.6-3.6-11.4
                            c-1.9-5.8-3.6-11.7-6.6-17c-5.9-10.3-16.1-17.5-27.9-18.2c-3.2-0.2-6.3,0.2-9.4,1.1c-4.6,1.5-8.5,4.4-12.2,7.5
                            c-6.5,5.5-12.5,11.6-17.4,18.5c-4.1,5.9-7.4,12.3-9.4,19.4c-1,3.4-1.6,6.9-2.3,10.4c-1,4.8-2.2,9.5-2.9,14.3
                            c-1,7.2-0.9,14.6,0.4,21.8c1.7,4.1,4.3,7.8,7.7,10.8c2.4,2.1,5.1,3.8,7.9,5.5c2.6,1.5,5.3,3,7.8,4.7c5.6,3.8,10.4,8.8,15.7,13
                            c4.1,3.3,8.9,6.3,14.1,5.5c5.3-0.7,8.7-4.5,12-8.5c0.6-0.7,1.2-1.3,1.7-2c3.8-4.5,7.9-9.2,11.3-14c4-5.6,7.7-11.6,10.5-17.9
                            c2.1-4.6,3.6-9.5,4.7-14.4C1316.7,457.5,1316.6,450.1,1315.1,442.8z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth63Diagnozis.culttab && !tooth63Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1314.97 442.182C1315.01 442.389 1315.06 442.595 1315.1 442.8C1316.6 450.1 1316.7 457.5 1315.5 464.9C1314.4 469.8 1312.9 474.7 1310.8 479.3C1308 485.6 1304.3 491.6 1300.3 497.2C1297.38 501.316 1293.95 505.359 1290.64 509.266C1290.09 509.914 1289.54 510.559 1289 511.2C1288.66 511.675 1288.28 512.104 1287.87 512.55C1287.69 512.761 1287.49 512.975 1287.3 513.2C1284 517.2 1280.6 521 1275.3 521.7C1270.1 522.5 1265.3 519.5 1261.2 516.2C1259.11 514.543 1257.1 512.763 1255.08 510.98C1251.99 508.243 1248.89 505.501 1245.5 503.2C1243.39 501.762 1241.13 500.467 1238.91 499.194C1238.5 498.962 1238.1 498.731 1237.7 498.5C1234.9 496.8 1232.2 495.1 1229.8 493C1226.4 490 1223.8 486.3 1222.1 482.2C1220.8 475 1220.7 467.6 1221.7 460.4C1222.19 457.033 1222.93 453.715 1223.67 450.377C1223.99 448.957 1224.3 447.533 1224.6 446.1C1224.73 445.426 1224.87 444.753 1225 444.08C1225.55 441.256 1226.09 438.446 1226.9 435.7C1228.9 428.6 1232.2 422.2 1236.3 416.3C1241.2 409.4 1247.2 403.3 1253.7 397.8C1257.4 394.7 1261.3 391.8 1265.9 390.3C1269 389.4 1272.1 389 1275.3 389.2C1287.1 389.9 1297.3 397.1 1303.2 407.4C1305.8 411.987 1307.42 417.023 1309.04 422.055C1309.29 422.837 1309.54 423.62 1309.8 424.4C1310.2 425.666 1310.61 426.933 1311.02 428.2C1311.84 430.733 1312.67 433.266 1313.4 435.8C1314.04 437.895 1314.51 440.073 1314.97 442.182ZM1300.11 421.861C1300.3 422.475 1300.5 423.09 1300.7 423.703C1301.02 424.698 1301.34 425.694 1301.66 426.689C1301.85 427.283 1302.05 427.877 1302.24 428.471C1302.63 429.703 1301.76 430.97 1300.46 431.048L1237.68 434.838C1236.34 434.919 1235.31 433.69 1235.68 432.407C1237.27 427.02 1239.8 421.963 1243.01 417.337C1246.86 411.915 1251.56 407.121 1256.67 402.798C1259.57 400.362 1262.63 398.083 1266.24 396.904C1268.68 396.197 1271.11 395.882 1273.62 396.04C1282.88 396.59 1290.89 402.248 1295.52 410.343C1297.56 413.948 1298.83 417.906 1300.11 421.861Z"
            ></path>
            <path
              className={`st7 ${tooth63Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1300.7 423.703C1299.21 419.145 1297.88 414.508 1295.52 410.343C1290.89 402.248 1282.88 396.59 1273.62 396.04C1271.11 395.882 1268.68 396.197 1266.24 396.904C1262.63 398.083 1259.57 400.362 1256.67 402.798C1251.56 407.121 1246.86 411.915 1243.01 417.337C1239.8 421.963 1237.27 427.02 1235.68 432.407C1235.31 433.69 1236.34 434.919 1237.68 434.838L1300.46 431.048C1301.76 430.97 1302.63 429.703 1302.24 428.471C1301.73 426.881 1301.2 425.292 1300.7 423.703Z"
            />
            <path
              className={`st60
                                    ${tooth63Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth63Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth63Diagnozis.seal_cervical_color}
                                `}
              d="M1300.7 423.703C1299.21 419.145 1297.88 414.508 1295.52 410.343C1290.89 402.248 1282.88 396.59 1273.62 396.04C1271.11 395.882 1268.68 396.197 1266.24 396.904C1262.63 398.083 1259.57 400.362 1256.67 402.798C1251.56 407.121 1246.86 411.915 1243.01 417.337C1239.8 421.963 1237.27 427.02 1235.68 432.407C1235.31 433.69 1236.34 434.919 1237.68 434.838L1300.46 431.048C1301.76 430.97 1302.63 429.703 1302.24 428.471C1301.73 426.881 1301.2 425.292 1300.7 423.703Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar hImplant hEmpty"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth63.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1223.5 451L1225 449.5L1226 448L1227 445.5L1228.5 443V440.5L1229.5 437.5L1231.5 435.5V434L1233.5 430.5L1234.5 427L1235.5 425L1237.5 421.5V420L1239 418.5L1240.5 416.5L1242 415.5L1243 413.5L1244 412L1246 409L1249.5 407L1252 403.5L1255.5 401L1257 399L1258.5 398L1261.5 396.5L1265 395L1266.5 393.5H1270L1274 392.5L1277 393.5H1281L1284.5 395L1286.5 396.5L1289.5 398L1292.5 400L1293.5 401L1295 403.5L1297.5 405L1299.5 409L1301 410L1303 413.5V415.5L1304.5 416.5L1305.5 418.5V420V423L1306.5 425L1308 427V429L1309 433L1311 435.5V439.5L1313 442L1315.5 444V440.5V438.5L1314.5 435.5V433L1313 430.5L1313.5 427.5L1313 426V424L1313.5 421.5L1314.5 418.5L1313.5 416.5L1314.5 414.5V412L1315.5 410L1314.5 407L1315.5 403.5V400L1316 396L1313.5 392.5H1312L1311 390L1308 387.5L1306.5 385L1304.5 382.5L1301.5 380.5L1300 381L1298.5 378.5L1296.5 377.5L1293.5 374.5L1291 373.5L1288 371L1284.5 370.5L1281 372L1278.5 370.5H1276L1274 371H1271.5L1269 370.5L1265 371L1261.5 373.5L1259 374L1255.5 376H1253L1252 378.5L1249 380L1246 381L1244 384L1243.5 386.5L1242 389V392.5V395L1240.5 396.5V399L1239 401V403.5L1237.5 405V407L1236.5 409L1234.5 412L1233.5 413.5L1232.5 416.5L1231.5 420L1230.5 423L1228.5 426L1227 429L1226.5 432.5L1225 436.5V439.5L1224.5 442.5L1223.5 446.5L1223 449L1223.5 451Z"
            ></path>
            <path
              className="st61 level1"
              d="M1223.5 451L1225 449.5L1226 448L1227 445.5L1228.5 443V440.5L1229.5 437.5L1231.5 435.5V434L1233.5 430.5L1234.5 427L1235.5 425L1237.5 421.5V420L1239 418.5L1240.5 416.5L1242 415.5L1243 413.5L1244 412L1246 409L1249.5 407L1252 403.5L1255.5 401L1257 399L1258.5 398L1261.5 396.5L1265 395L1266.5 393.5H1270L1274 392.5L1277 393.5H1281L1284.5 395L1286.5 396.5L1289.5 398L1292.5 400L1293.5 401L1295 403.5L1297.5 405L1299.5 409L1301 410L1303 413.5V415.5L1304.5 416.5L1305.5 418.5V420V423L1306.5 425L1308 427V429L1309 433L1311 435.5V439.5L1313 442L1315.5 444V442L1315 439.5V438L1314 435L1313 432V429L1312.5 427.5L1313 425L1312 423V420V416.5L1311 413.5L1312 410L1311 409V406L1309 404.5L1308 402L1306.5 401L1305.5 399L1304 397.5L1302 396.5L1299.5 393.5L1298.5 392H1296.5L1294 390.5L1292.5 389L1289 387.5L1286.5 386H1284.5L1282 384.5L1280 383.5L1278 384.5L1275.5 383.5H1272L1268.5 384.5L1266.5 386H1265L1262.5 387H1261L1258.5 387.5L1257 390L1254.5 392H1252.5L1251 395H1249.5L1246 398V399L1244 400L1242 402L1241 404.5L1239 407V409L1237.5 411L1236.5 413.5L1235.5 415.5L1233 419L1231.5 421.5L1230.5 425L1229.5 426.5L1228.5 429L1227.5 431L1227 434L1226 437.5V439.5L1225 442L1223.5 445.5V448V451Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth63Diagnozis.culttab &&
                !tooth63Diagnozis.abutment &&
                !tooth63Diagnozis.implant &&
                !tooth63Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1237.7,498.4c-2.8-1.7-5.5-3.4-7.9-5.5c-3.4-3-6-6.7-7.7-10.8c-1.3-7.2-1.4-14.5-0.4-21.8
                                c0.7-4.8,1.9-9.5,2.9-14.3c0.7-3.5,1.4-7,2.3-10.4c2-7,5.3-13.5,9.4-19.4c2.9,6.8,7.8,18.8,8.5,21.5
                                C1245.5,440.6,1240.6,477.6,1237.7,498.4z"
              />
              <path
                className={`
                                st8 target caries-left 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth63.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth63.seal_left ? `seal-fill ${teethDiagnozis.tooth63.seal_left_color}` : ''}
                            `}
                d="M1237.7,498.4c-2.8-1.7-5.5-3.4-7.9-5.5c-3.4-3-6-6.7-7.7-10.8c-1.3-7.2-1.4-14.5-0.4-21.8
                                c0.7-4.8,1.9-9.5,2.9-14.3c0.7-3.5,1.4-7,2.3-10.4c2-7,5.3-13.5,9.4-19.4c2.9,6.8,7.8,18.8,8.5,21.5
                                C1245.5,440.6,1240.6,477.6,1237.7,498.4z"
                style={{
                  fill: teethDiagnozis.tooth63.caries_left
                    ? '#606c80'
                    : teethDiagnozis.tooth63.seal_left
                      ? teethDiagnozis.tooth63.seal_left_color
                      : 'transparent',
                }}
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M1315.6,464.9c-1.1,4.9-2.6,9.8-4.7,14.4c-2.8,6.4-6.5,12.3-10.5,17.9c-3.4,4.8-7.5,9.5-11.3,14
                                c3.3-19.6,10.2-59.8,11.2-61.5c0.9-1.6,8.9-9.7,13.2-13.9c0.7,2.3,1.2,4.6,1.7,7C1316.6,450.1,1316.7,457.5,1315.6,464.9z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth63.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth63.seal_right ? `seal-fill ${teethDiagnozis.tooth63.seal_right_color}` : ''}
                            `}
                d="M1315.6,464.9c-1.1,4.9-2.6,9.8-4.7,14.4c-2.8,6.4-6.5,12.3-10.5,17.9c-3.4,4.8-7.5,9.5-11.3,14
                                c3.3-19.6,10.2-59.8,11.2-61.5c0.9-1.6,8.9-9.7,13.2-13.9c0.7,2.3,1.2,4.6,1.7,7C1316.6,450.1,1316.7,457.5,1315.6,464.9z"
                style={{
                  fill: teethDiagnozis.tooth63.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth63.seal_right
                      ? teethDiagnozis.tooth63.seal_right_color
                      : 'transparent',
                }}
              />
            </g>
            <g
              className="caries-filling hoho1"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st58"
                d="M1313.4,435.8c-4.3,4.3-12.3,12.3-13.2,13.9c-0.9,1.7-7.8,41.8-11.2,61.5c-0.6,0.7-1.2,1.4-1.7,2
                                c-3.4,4-6.7,7.8-12.1,8.5c-5.2,0.7-10-2.2-14.1-5.5c-5.3-4.3-10-9.2-15.7-13c-2.5-1.7-5.2-3.2-7.8-4.7c2.9-20.9,7.8-57.9,7.1-60.7
                                c-0.7-2.8-5.6-14.7-8.5-21.5c4.8-6.9,10.8-13,17.4-18.5c3.7-3.1,7.6-6,12.2-7.5c3-1,6.2-1.3,9.3-1.1c11.8,0.7,22.1,7.9,27.9,18.2
                                c3,5.3,4.8,11.2,6.6,17C1311,428.2,1312.3,432,1313.4,435.8z"
              />
              <path
                className={`
                                st8 target caries-top 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth63.caries_top ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth63.seal_top ? `seal-fill ${teethDiagnozis.tooth63.seal_top_color}` : ''}
                            `}
                d="M1313.4,435.8c-4.3,4.3-12.3,12.3-13.2,13.9c-0.9,1.7-7.8,41.8-11.2,61.5c-0.6,0.7-1.2,1.4-1.7,2
                                c-3.4,4-6.7,7.8-12.1,8.5c-5.2,0.7-10-2.2-14.1-5.5c-5.3-4.3-10-9.2-15.7-13c-2.5-1.7-5.2-3.2-7.8-4.7c2.9-20.9,7.8-57.9,7.1-60.7
                                c-0.7-2.8-5.6-14.7-8.5-21.5c4.8-6.9,10.8-13,17.4-18.5c3.7-3.1,7.6-6,12.2-7.5c3-1,6.2-1.3,9.3-1.1c11.8,0.7,22.1,7.9,27.9,18.2
                                c3,5.3,4.8,11.2,6.6,17C1311,428.2,1312.3,432,1313.4,435.8z"
                style={{
                  fill: teethDiagnozis.tooth63.caries_top
                    ? '#606c80'
                    : teethDiagnozis.tooth63.seal_top
                      ? teethDiagnozis.tooth63.seal_top_color
                      : 'transparent',
                }}
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_right &&
                      !tooth63Diagnozis.seal_top &&
                      !tooth63Diagnozis.seal_center) ||
                    (!tooth63Diagnozis.seal_right && tooth63Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1290.5 501.5L1297 464"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_right &&
                      !tooth63Diagnozis.seal_top) ||
                    (!tooth63Diagnozis.seal_right &&
                      tooth63Diagnozis.seal_top &&
                      !tooth63Diagnozis.seal_center) ||
                    (!tooth63Diagnozis.seal_right &&
                      tooth63Diagnozis.seal_top &&
                      tooth63Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1297 464C1300.5 446.5 1302.7 442.7 1309.5 439.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_left &&
                      !tooth63Diagnozis.seal_top) ||
                    (!tooth63Diagnozis.seal_left &&
                      tooth63Diagnozis.seal_top &&
                      !tooth63Diagnozis.seal_center) ||
                    (!tooth63Diagnozis.seal_left &&
                      tooth63Diagnozis.seal_top &&
                      tooth63Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1243.5 457C1246.5 433.5 1242.9 431.2 1238.5 422"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth63Diagnozis.seal_left &&
                      !tooth63Diagnozis.seal_top) ||
                    (tooth63Diagnozis.seal_left &&
                      tooth63Diagnozis.seal_left &&
                      tooth63Diagnozis.seal_center &&
                      !tooth63Diagnozis.seal_top) ||
                    (!tooth63Diagnozis.seal_left && tooth63Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1243.5 457L1238.5 492.5"
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
                visibility: tooth63Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth63Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth63Diagnozis.vinir_color}`}
                d="M1315.1 442.8C1314.6 440.5 1314.1 438.1 1313.4 435.8C1312.3 432 1311 428.2 1309.8 424.4C1307.9 418.6 1306.2 412.7 1303.2 407.4C1297.3 397.1 1287.1 389.9 1275.3 389.2C1272.1 389 1269 389.4 1265.9 390.3C1261.3 391.8 1257.4 394.7 1253.7 397.8C1247.2 403.3 1241.2 409.4 1236.3 416.3C1232.2 422.2 1228.9 428.6 1226.9 435.7C1225.9 439.1 1225.3 442.6 1224.6 446.1C1223.6 450.9 1222.4 455.6 1221.7 460.4C1220.7 467.6 1220.8 475 1222.1 482.2C1223.8 486.3 1226.4 490 1229.8 493C1232.2 495.1 1234.9 496.8 1237.7 498.5C1240.3 500 1243 501.5 1245.5 503.2C1251.1 507 1255.9 512 1261.2 516.2C1265.3 519.5 1270.1 522.5 1275.3 521.7C1280.6 521 1284 517.2 1287.3 513.2C1287.9 512.5 1288.5 511.9 1289 511.2C1292.8 506.7 1296.9 502 1300.3 497.2C1304.3 491.6 1308 485.6 1310.8 479.3C1312.9 474.7 1314.4 469.8 1315.5 464.9C1316.7 457.5 1316.6 450.1 1315.1 442.8Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth63Diagnozis.temporary_crown ||
                tooth63Diagnozis.ceramic_crown ||
                tooth63Diagnozis.mceramic_crown ||
                tooth63Diagnozis.metalic_crown ||
                tooth63Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth63Diagnozis.temporary_crown ||
                tooth63Diagnozis.ceramic_crown ||
                tooth63Diagnozis.mceramic_crown ||
                tooth63Diagnozis.metalic_crown ||
                tooth63Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth63Diagnozis.ceramic_crown_color}
                                ${tooth63Diagnozis.mceramic_crown_color}
                                ${tooth63Diagnozis.metalic_crown_color}
                                ${tooth63Diagnozis.zirconia_crown_color}
                            `}
              d="M1315.1,442.8c-0.5-2.3-1-4.7-1.7-7c-1.1-3.8-2.4-7.6-3.6-11.4
                            c-1.9-5.8-3.6-11.7-6.6-17c-5.9-10.3-16.1-17.5-27.9-18.2c-3.2-0.2-6.3,0.2-9.4,1.1c-4.6,1.5-8.5,4.4-12.2,7.5
                            c-6.5,5.5-12.5,11.6-17.4,18.5c-4.1,5.9-7.4,12.3-9.4,19.4c-1,3.4-1.6,6.9-2.3,10.4c-1,4.8-2.2,9.5-2.9,14.3
                            c-1,7.2-0.9,14.6,0.4,21.8c1.7,4.1,4.3,7.8,7.7,10.8c2.4,2.1,5.1,3.8,7.9,5.5c2.6,1.5,5.3,3,7.8,4.7c5.6,3.8,10.4,8.8,15.7,13
                            c4.1,3.3,8.9,6.3,14.1,5.5c5.3-0.7,8.7-4.5,12-8.5c0.6-0.7,1.2-1.3,1.7-2c3.8-4.5,7.9-9.2,11.3-14c4-5.6,7.7-11.6,10.5-17.9
                            c2.1-4.6,3.6-9.5,4.7-14.4C1316.7,457.5,1316.6,450.1,1315.1,442.8z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
