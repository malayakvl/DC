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
import PeriodontitStage61 from './periodontit61';
import setupDiagnoze from '../../../lib/tfunctions';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth61() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth61Diagnozis = teethDiagnozis.tooth61;
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
        teethDiagnozis.tooth61.caries_bottom =
          !teethDiagnozis.tooth61.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth61.caries_center =
          !teethDiagnozis.tooth61.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth61.caries_left =
          !teethDiagnozis.tooth61.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth61.caries_right =
          !teethDiagnozis.tooth61.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth61.caries_top = !teethDiagnozis.tooth61.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth61.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth61.seal_center_color = sealColor1;
          teethDiagnozis.tooth61.seal_center = true;
        } else if (
          teethDiagnozis.tooth61.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth61.seal_center_color = sealColor2;
          teethDiagnozis.tooth61.seal_center = true;
        } else if (
          teethDiagnozis.tooth61.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth61.seal_center_color = sealColor3;
          teethDiagnozis.tooth61.seal_center = true;
        } else {
          teethDiagnozis.tooth61.seal_center =
            !teethDiagnozis.tooth61.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth61.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth61.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth61.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth61.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth61.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth61.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth61.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth61.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth61.seal_bottom = true;
        } else {
          teethDiagnozis.tooth61.seal_bottom =
            !teethDiagnozis.tooth61.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth61.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth61.seal_left_color = sealColor1;
          teethDiagnozis.tooth61.seal_left = true;
        } else if (
          teethDiagnozis.tooth61.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth61.seal_left_color = sealColor2;
          teethDiagnozis.tooth61.seal_left = true;
        } else if (
          teethDiagnozis.tooth61.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth61.seal_left_color = sealColor3;
          teethDiagnozis.tooth61.seal_left = true;
        } else {
          teethDiagnozis.tooth61.seal_left = !teethDiagnozis.tooth61.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth61.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth61.seal_right_color = sealColor1;
          teethDiagnozis.tooth61.seal_right = true;
        } else if (
          teethDiagnozis.tooth61.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth61.seal_right_color = sealColor2;
          teethDiagnozis.tooth61.seal_right = true;
        } else if (
          teethDiagnozis.tooth61.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth61.seal_right_color = sealColor3;
          teethDiagnozis.tooth61.seal_right = true;
        } else {
          teethDiagnozis.tooth61.seal_right =
            !teethDiagnozis.tooth61.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth61.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth61.seal_top_color = sealColor1;
          teethDiagnozis.tooth61.seal_top = true;
        } else if (
          teethDiagnozis.tooth61.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth61.seal_top_color = sealColor2;
          teethDiagnozis.tooth61.seal_top = true;
        } else if (
          teethDiagnozis.tooth61.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth61.seal_top_color = sealColor3;
          teethDiagnozis.tooth61.seal_top = true;
        } else {
          teethDiagnozis.tooth61.seal_top = !teethDiagnozis.tooth61.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth61.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth61.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth61.wedge_shaped_defect_color =
          !teethDiagnozis.tooth61.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth61.show &&
        !teethDiagnozis.tooth21.show
      ) {
        document.getElementById('TH-61').classList.add('f-tooth-active');
        document.getElementById('TH-61').style.opacity = '1';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth61.show &&
        teethDiagnozis.tooth21.show
      ) {
        document.getElementById('TH-61').classList.add('f-tooth-active');
        document.getElementById('TH-21').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-61').classList.remove('f-tooth-active');
        document.getElementById('TH-21').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth61.show &&
        !teethDiagnozis.tooth21.show
      ) {
        document.getElementById('TH-61').classList.remove('f-tooth-active');
        document.getElementById('TH-61').style.opacity = '0';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth61.show &&
        teethDiagnozis.tooth21.show
      ) {
        document.getElementById('TH-61').classList.remove('f-tooth-active');
        document.getElementById('TH-21').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth21.show) {
        document.getElementById('TH-61').classList.add('f-tooth-active');
        document.getElementById('TH-21').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth61.show) {
        document.getElementById('TH-61').classList.remove('f-tooth-active');
        document.getElementById('TH-21').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth21.show) {
        document.getElementById('TH-21').classList.add('f-tooth-active');
        document.getElementById('TH-61').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="61"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1075 716)"
          className={`st3 st4 st5 ${selectedTooth === 61 ? 'num-active' : ''}`}
        >
          61
        </text>
      </g>
      <g
        id="TH-61"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth61.show || allTeeth) && !teethDiagnozis.tooth61.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth61.show = !teethDiagnozis.tooth61.show;
            teethDiagnozis.tooth21.show = false;
          }

          dispatch(setSelectedToothNumber(61));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              61,
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
          className={`underlay ${selectedTooth === 61 ? 'selected' : ''}`}
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideOverlay('over');
          }}
          onMouseLeave={() => {
            showHideOverlay('leave');
          }}
        >
          <path
            className="st40"
            d="M1088,250.9c0,0-11,37-17,62s-17,119-19,135s-4,66,0,85s10,19,6,31
                        s-8.6,17.1-8.3,32.6c0.3,15.4,1.3,85.4,10.3,112.4s25,28,37,29s37.9-4.6,45-36c7-31,9-104,7-120s-15-20-15-35s14-15,15-58
                        s-1-96,0-111s-1-68-2-85s-6-44-10-53s-8-20-20-20S1097,226.9,1088,250.9z"
          ></path>
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 24, 17)',
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
                  !tooth61Diagnozis.culttab &&
                  !tooth61Diagnozis.implant &&
                  !tooth61Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st24"
                d="M1137.7,597.9c2-5.8-4.6-9.9-13.4-11.6c-9.3-1.8-20-1.4-30.7-1.1
                                c-8.9,0.3-17.8,0.7-25,3.2c-3.9,1.4-7.1,3.3-8.3,6.3c-2.2,5.4,3.6,10.2,8.8,14.5c2.4,2,4.7,4.1,6.7,6.4
                                c3.5,4.1,5.9,9.1,11.2,12.5c3.2,2,7.1,3.3,11.4,3.4c5,0.2,9.9-1.2,13.7-3.6c5.6-3.5,8.3-8.5,10.5-13.3c1.3-2.8,2.5-5.6,5.1-8
                                C1131,603.7,1136.4,601.7,1137.7,597.9z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth61Diagnozis?.apex || tooth61Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth61Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth61Diagnozis?.apex ? 'apex' : ''}`}
                d="M1136.65 595.139C1138.59 587.917 1132.18 582.811 1123.63 580.695C1114.6 578.453 1104.21 578.951 1093.81 579.325C1085.17 579.698 1076.52 580.197 
                                1069.53 583.309C1065.74 585.053 1062.63 587.419 1061.47 591.154C1059.33 597.878 1064.96 603.855 1070.01 609.209C1072.34 611.699 1074.58 614.314 1076.52 
                                617.178C1079.92 622.283 1082.25 628.509 1087.4 632.743C1090.51 635.233 1094.3 636.852 1098.48 636.976C1103.33 637.226 1108.09 635.482 1111.78 632.494C1117.22 628.136 1119.85 621.91 1121.98 
                                615.933C1123.25 612.447 1124.41 608.96 1126.94 605.972C1130.14 602.361 1135.39 599.87 1136.65 595.139Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth61Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth61Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M1108.34 604.016C1108.25 605.739 1106.79 606.641 1104.18 608.969C1102.27 610.67 1101.63 612.996 1099.21 613.014C1096.62 613.033 1095.93 610.273 1094.27 608.421C1092.29 606.198 1090.54 605.623 1090.66 603.47C1090.78 601.317 1094.18 600.785 1099.89 600.743C1105.61 600.701 1108.47 601.65 1108.34 604.016Z"
                style={{ fill: 'rgb(41, 11, 123)' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            style={{
              visibility:
                tooth61Diagnozis.implant || tooth61Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1099.5" cy="604.5" r="23.5"></circle>
            <g className="st27">
              <mask id="implant_61" className="st49">
                <path
                  className="st50"
                  d="M1087.39 590.223L1084.32 589.223C1081.71 591.85 1079.77 595.141 1078.77 598.821L1081.17 600.981C1080.96 602.121 1080.84 603.298 1080.84 604.5C1080.84 605.703 1080.96 606.88 1081.17 608.02L1078.77 
                                    610.18C1079.77 613.86 1081.71 617.151 1084.32 619.778L1087.39 618.778C1089.16 620.307 1091.22 621.512 1093.48 622.299L1094.15 625.458C1095.92 625.925 1097.78 626.173 1099.69 626.173C1101.61 626.173 1103.46 625.925 1105.23 625.458L1105.9 
                                    622.298C1108.16 621.511 1110.22 620.306 1111.99 618.777L1115.06 619.777C1117.67 617.151 1119.62 613.859 1120.61 610.179L1118.21 608.018C1118.42 606.878 1118.54 605.702 1118.54 604.5C1118.54 603.298 1118.42 602.123 1118.21 600.983L1120.61 598.822C1119.62 595.142 
                                    1117.67 591.85 1115.06 589.224L1111.99 590.224C1110.22 588.694 1108.16 587.49 1105.9 586.702L1105.23 583.543C1103.46 583.076 1101.61 582.827 1099.69 582.827C1097.78 582.827 1095.92 583.076 1094.15 583.542L1093.48 586.701C1091.22 587.489 1089.16 588.694 1087.39 590.223Z"
                />
              </mask>
              <path
                className="st50 st51"
                d="M1087.39 590.223L1084.32 589.223C1081.71 591.85 1079.77 595.141 1078.77 598.821L1081.17 600.981C1080.96 602.121 1080.84 603.298 1080.84 604.5C1080.84 605.703 1080.96 606.88 1081.17 608.02L1078.77 610.18C1079.77 613.86 1081.71 617.151 1084.32 619.778L1087.39 618.778C1089.16 620.307 1091.22 621.512 1093.48 622.299L1094.15 625.458C1095.92 
                                625.925 1097.78 626.173 1099.69 626.173C1101.61 626.173 1103.46 625.925 1105.23 625.458L1105.9 622.298C1108.16 621.511 1110.22 620.306 1111.99 618.777L1115.06 619.777C1117.67 617.151 1119.62 613.859 1120.61 610.179L1118.21 608.018C1118.42 606.878 1118.54 605.702 1118.54 604.5C1118.54 
                                603.298 1118.42 602.123 1118.21 600.983L1120.61 598.822C1119.62 595.142 1117.67 591.85 1115.06 589.224L1111.99 590.224C1110.22 588.694 1108.16 587.49 1105.9 586.702L1105.23 583.543C1103.46 583.076 1101.61 582.827 1099.69 582.827C1097.78 582.827 1095.92 583.076 1094.15 583.542L1093.48 586.701C1091.22 587.489 1089.16 588.694 1087.39 590.223Z"
              />
              <path
                className="st52"
                d="M1084.32 589.223L1084.94 587.322L1083.77 586.941L1082.9 587.814L1084.32 589.223ZM1087.39 590.223L1086.77 592.125L1087.84 592.474L1088.69 591.738L1087.39 590.223ZM1078.77 598.821L1076.84 598.298L1076.52 599.485L1077.43 600.308L1078.77 598.821ZM1081.17 600.981L1083.14 601.353L1083.35 600.247L1082.51 599.494L1081.17 600.981ZM1081.17 608.02L1082.51 609.507L1083.35 608.754L1083.14 
                                607.648L1081.17 608.02ZM1078.77 610.18L1077.43 608.693L1076.52 609.516L1076.84 610.703L1078.77 610.18ZM1084.32 619.778L1082.9 621.188L1083.77 622.06L1084.94 621.679L1084.32 619.778ZM1087.39 618.778L1088.69 617.263L1087.84 616.527L1086.77 616.876L1087.39 618.778ZM1093.48 622.299L1095.44 621.885L1095.2 620.782L1094.14 620.411L1093.48 622.299ZM1094.15 625.458L1092.19 625.873L1092.45 627.078L1093.64 627.392L1094.15 625.458ZM1105.23 
                                625.458L1105.74 627.392L1106.94 627.078L1107.19 625.872L1105.23 625.458ZM1105.9 622.298L1105.24 620.41L1104.18 620.781L1103.95 621.884L1105.9 622.298ZM1111.99 618.777L1112.61 616.876L1111.54 616.527L1110.69 617.263L1111.99 618.777ZM1115.06 619.777L1114.44 621.679L1115.61 622.06L1116.48 621.187L1115.06 619.777ZM1120.61 610.179L1122.54 610.702L1122.86 
                                609.514L1121.95 608.692L1120.61 610.179ZM1118.21 608.018L1116.24 607.647L1116.03 608.753L1116.87 609.505L1118.21 608.018ZM1118.21 600.983L1116.87 599.496L1116.03 600.248L1116.24 601.354L1118.21 600.983ZM1120.61 598.822L1121.95 600.309L1122.86 599.487L1122.54 598.299L1120.61 598.822ZM1115.06 589.224L1116.48 587.814L1115.62 586.941L1114.45 587.322L1115.06 589.224ZM1111.99 
                                590.224L1110.69 591.738L1111.54 592.474L1112.61 592.125L1111.99 590.224ZM1105.9 586.702L1103.95 587.117L1104.18 588.219L1105.24 588.591L1105.9 586.702ZM1105.23 583.543L1107.19 583.128L1106.94 581.923L1105.74 581.609L1105.23 583.543ZM1094.15 583.542L1093.64 581.608L1092.45 581.922L1092.19 583.127L1094.15 583.542ZM1093.48 586.701L1094.14 588.59L1095.2 588.219L1095.44 587.116L1093.48 586.701ZM1083.7 591.125L1086.77 592.125L1088.01 588.321L1084.94 587.322L1083.7 591.125ZM1080.7 599.343C1081.6 596.007 
                                1083.36 593.019 1085.74 590.633L1082.9 587.814C1080.05 590.68 1077.93 594.275 1076.84 598.298L1080.7 599.343ZM1082.51 599.494L1080.11 597.333L1077.43 600.308L1079.83 602.469L1082.51 599.494ZM1082.84 604.5C1082.84 603.423 1082.95 602.371 1083.14 601.353L1079.21 600.61C1078.97 601.872 1078.84 603.173 1078.84 604.5H1082.84ZM1083.14 607.648C1082.95 606.63 1082.84 605.578 1082.84 604.5H1078.84C1078.84 605.828 1078.97 607.129 1079.21 608.391L1083.14 607.648ZM1080.11 
                                611.668L1082.51 609.507L1079.84 606.533L1077.43 608.693L1080.11 611.668ZM1085.74 618.368C1083.37 615.982 1081.6 612.994 1080.7 609.658L1076.84 610.703C1077.93 614.726 1080.05 618.321 1082.9 621.188L1085.74 618.368ZM1086.77 616.876L1083.7 617.876L1084.94 621.679L1088.01 620.68L1086.77 616.876ZM1094.14 620.411C1092.12 619.708 1090.28 618.631 1088.69 617.263L1086.08 620.292C1088.04 621.983 1090.32 623.316 1092.82 624.187L1094.14 620.411ZM1096.11 625.044L1095.44 621.885L1091.52 622.714L1092.19 625.873L1096.11 625.044ZM1099.69 624.173C1097.95 624.173 1096.26 623.947 
                                1094.66 623.525L1093.64 627.392C1095.57 627.902 1097.6 628.173 1099.69 628.173V624.173ZM1104.72 623.524C1103.12 623.947 1101.43 624.173 1099.69 624.173V628.173C1101.78 628.173 1103.81 627.902 1105.74 627.392L1104.72 623.524ZM1103.95 621.884L1103.28 625.043L1107.19 625.872L1107.86 622.713L1103.95 621.884ZM1110.69 617.263C1109.1 618.631 1107.26 619.707 1105.24 620.41L1106.56 624.187C1109.06 623.315 1111.34 621.982 1113.3 620.292L1110.69 617.263ZM1115.68 617.875L1112.61 616.876L1111.37 620.679L1114.44 621.679L1115.68 617.875ZM1118.68 609.656C1117.78 612.993 1116.02 615.981 1113.65 618.367L1116.48 621.187C1119.33 618.32 1121.45 
                                614.725 1122.54 610.702L1118.68 609.656ZM1116.87 609.505L1119.27 611.666L1121.95 608.692L1119.55 606.531L1116.87 609.505ZM1116.54 604.5C1116.54 605.577 1116.44 606.629 1116.24 607.647L1120.17 608.389C1120.41 607.128 1120.54 605.828 1120.54 604.5H1116.54ZM1116.24 601.354C1116.44 602.372 1116.54 603.423 1116.54 604.5H1120.54C1120.54 603.173 1120.41 601.873 1120.17 600.612L1116.24 601.354ZM1119.27 597.335L1116.87 599.496L1119.55 602.47L1121.95 600.309L1119.27 597.335ZM1113.65 590.634C1116.02 593.02 1117.78 596.008 1118.68 599.345L1122.54 598.299C1121.45 594.276 1119.33 590.681 1116.48 587.814L1113.65 590.634ZM1112.61 592.125L1115.68 591.126L1114.45 587.322L1111.37 588.322L1112.61 592.125ZM1105.24 588.591C1107.26 
                                589.294 1109.1 590.37 1110.69 591.738L1113.3 588.709C1111.34 587.019 1109.06 585.686 1106.56 584.814L1105.24 588.591ZM1103.28 583.957L1103.95 587.117L1107.86 586.288L1107.19 583.128L1103.28 583.957ZM1099.69 584.827C1101.43 584.827 1103.12 585.053 1104.72 585.476L1105.74 581.609C1103.81 581.098 1101.78 580.827 1099.69 580.827V584.827ZM1094.66 585.476C1096.26 585.053 1097.95 584.827 1099.69 584.827V580.827C1097.6 580.827 1095.57 581.098 1093.64 581.608L1094.66 585.476ZM1095.44 587.116L1096.11 583.957L1092.19 583.127L1091.52 586.287L1095.44 587.116ZM1088.69 591.738C1090.28 590.369 1092.12 589.293 1094.14 588.59L1092.82 584.813C1090.32 585.685 1088.04 587.018 1086.08 588.709L1088.69 591.738Z"
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
              r="25.535"
              transform="matrix(-1 0 0 1 1099.54 604.535)"
            ></circle>
            <path
              className="st45"
              d="M1101.49 595.739C1100.94 593.804 1098.2 593.804 1097.65 595.739L1097.14 597.511C1096.84 598.549 1095.78 599.164 1094.73 598.902L1092.94 598.454C1090.99 597.965 1089.62 600.339 1091.02 601.785L1092.3 603.109C1093.05 603.884 1093.05 605.116 1092.3 605.891L1091.02 607.215C1089.62 608.661 1090.99 611.035 1092.94 610.546L1094.73 610.098C1095.78 609.836 1096.84 610.451 1097.14 611.489L1097.65 613.261C1098.2 615.196 1100.94 615.196 1101.49 613.261L1102 611.489C1102.3 610.451 1103.36 609.836 1104.41 610.098L1106.2 610.546C1108.15 611.035 1109.52 608.661 1108.12 607.215L1106.84 605.891C1106.09 605.116 1106.09 603.884 1106.84 603.109L1108.12 601.785C1109.52 600.339 1108.15 597.965 1106.2 598.454L1104.41 598.902C1103.36 599.164 1102.3 598.549 1102 597.511L1101.49 595.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth61Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth61Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1136.65 595.139C1138.59 587.917 1132.18 582.811 1123.63 580.695C1114.6 578.453 1104.21 578.951 1093.81 579.325C1085.17 579.698 1076.52 580.197 1069.53 583.309C1065.74 585.053 1062.63 587.419 1061.47 591.154C1059.33 597.878 1064.96 603.855 1070.01 609.209C1072.34 611.699 1074.58 614.314 1076.52 617.178C1079.92 622.283 1082.25 628.509 1087.4 632.743C1090.51 635.233 1094.3 636.852 1098.48 636.976C1103.33 637.226 1108.09 635.482 1111.78 632.494C1117.22 628.136 1119.85 621.91 1121.98 615.933C1123.25 612.447 1124.41 608.96 1126.94 605.972C1130.05 602.361 1135.39 599.87 1136.65 595.139Z"
            ></path>
            <path
              className="st47"
              d="M1126.74 598.243C1128.17 592.764 1123.45 588.891 1117.15 587.286C1110.49 585.585 1102.84 585.963 1095.18 586.246C1088.81 586.53 1082.44 586.908 1077.28 589.269C1074.49 590.592 1072.2 592.386 1071.34 595.22C1069.77 600.321 1073.92 604.855 1077.64 608.917C1079.36 610.806 1081.01 612.79 1082.44 614.963C1084.94 618.836 1086.66 623.559 1090.45 626.77C1092.74 628.66 1095.54 629.888 1098.61 629.982C1102.19 630.171 1105.7 628.849 1108.42 626.582C1112.43 623.275 1114.36 618.552 1115.93 614.018C1116.87 611.373 1117.72 608.728 1119.59 606.461C1121.88 603.722 1125.81 601.833 1126.74 598.243Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1100 605)"
            ></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth61Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1136.65 595.139C1138.59 587.917 1132.18 582.811 1123.63 580.695C1114.6 578.453 1104.21 578.951 1093.81 579.325C1085.17 579.698 1076.52 580.197 1069.53 583.309C1065.74 585.053 1062.63 587.419 1061.47 591.154C1059.33 597.878 1064.96 603.855 1070.01 609.209C1072.34 611.699 1074.58 614.314 1076.52 617.178C1079.92 622.283 1082.25 628.509 1087.4 632.743C1090.51 635.233 1094.3 636.852 1098.48 636.976C1103.33 637.226 1108.09 635.482 1111.78 632.494C1117.22 628.136 1119.85 621.91 1121.98 615.933C1123.25 612.447 1124.41 608.96 1126.94 605.972C1130.05 602.361 1135.39 599.87 1136.65 595.139Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1126.74 598.243C1128.17 592.764 1123.45 588.891 1117.15 587.286C1110.49 585.585 1102.84 585.963 1095.18 586.246C1088.81 586.53 1082.44 586.908 1077.28 589.269C1074.49 590.592 1072.2 592.386 1071.34 595.22C1069.77 600.321 1073.92 604.855 1077.64 608.917C1079.36 610.806 1081.01 612.79 1082.44 614.963C1084.94 618.836 1086.66 623.559 1090.45 626.77C1092.74 628.66 1095.54 629.888 1098.61 629.982C1102.19 630.171 1105.7 628.849 1108.42 626.582C1112.43 623.275 1114.36 618.552 1115.93 614.018C1116.87 611.373 1117.72 608.728 1119.59 606.461C1121.88 603.722 1125.81 601.833 1126.74 598.243Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1100 605)"
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth61Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth61Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1136.65 595.139C1138.59 587.917 1132.18 582.811 1123.63 580.695C1114.6 578.453 1104.21 578.951 1093.81 579.325C1085.17 579.698 1076.52 580.197 1069.53 583.309C1065.74 585.053 1062.63 587.419 1061.47 591.154C1059.33 597.878 1064.96 603.855 1070.01 609.209C1072.34 611.699 1074.58 614.314 1076.52 617.178C1079.92 622.283 1082.25 628.509 1087.4 632.743C1090.51 635.233 1094.3 636.852 1098.48 636.976C1103.33 637.226 1108.09 635.482 1111.78 632.494C1117.22 628.136 1119.85 621.91 1121.98 615.933C1123.25 612.447 1124.41 608.96 1126.94 605.972C1130.05 602.361 1135.39 599.87 1136.65 595.139Z"
            ></path>
            <path
              className="st47"
              d="M1126.74 598.243C1128.17 592.764 1123.45 588.891 1117.15 587.286C1110.49 585.585 1102.84 585.963 1095.18 586.246C1088.81 586.53 1082.44 586.908 1077.28 589.269C1074.49 590.592 1072.2 592.386 1071.34 595.22C1069.77 600.321 1073.92 604.855 1077.64 608.917C1079.36 610.806 1081.01 612.79 1082.44 614.963C1084.94 618.836 1086.66 623.559 1090.45 626.77C1092.74 628.66 1095.54 629.888 1098.61 629.982C1102.19 630.171 1105.7 628.849 1108.42 626.582C1112.43 623.275 1114.36 618.552 1115.93 614.018C1116.87 611.373 1117.72 608.728 1119.59 606.461C1121.88 603.722 1125.81 601.833 1126.74 598.243Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth61Diagnozis.culttab &&
                !tooth61Diagnozis.abutment &&
                !tooth61Diagnozis.implant &&
                !tooth61Diagnozis.apex &&
                !tooth61Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1144.5,581.9c-3.2-2.8-7.9-4.9-13.3-6.1c-11.8-2.7-25.4-2.2-39-1.6
                            c-11.1,0.5-22.2,1.1-31.3,4.8c-0.1,0-0.3,0.1-0.5,0.2c-4.9,2.1-9,5.1-10.6,9.6c-2.8,8.3,4.5,15.6,11.2,22.2c3.1,3.1,6,6.3,8.5,9.8
                            c0.7,0.9,1.3,1.9,2,2.9c3.5,5.6,6.6,11.7,12.3,16.1c4,3.1,9,5,14.4,5.3c6.4,0.3,12.6-1.9,17.4-5.5c6.1-4.6,9.5-11,12.1-17.4
                            c0.4-1,0.8-2,1.2-2.9c1.6-4.3,3.2-8.6,6.4-12.2c4.3-4.7,11.2-7.7,12.9-13.6C1149.5,588.9,1147.9,585,1144.5,581.9z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth61.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1059.45 575.947C1054.49 578.345 1051.54 581.599 1050.02 586.737C1048.73 590.99 1048.46 596.253 1050.42 600.088C1052.71 604.592 1057.64 607.592 1061.22 611.569C1064.27 614.994 1064.94 618.591 1067.48 622.53C1069.86 626.281 1072.98 630.473 1075.33 634.451C1077.39 637.919 1080.86 642.452 1084 645.164C1086.04 646.872 1088.29 647.055 1090.72 648.061C1093.16 649.072 1095.77 650.901 1098.52 650.987C1101.97 651.173 1105.39 649.324 1108.56 648.061C1111.24 646.995 1114.87 646.701 1117.09 644.822C1120.88 641.628 1123.63 636.478 1125.8 632.266C1127.7 628.573 1129.14 624.657 1130.45 620.817C1132.11 616.022 1133.63 613.681 1136.94 609.571C1139.1 607.017 1140.84 603.643 1143.34 601.275C1145.7 599.039 1147.74 595.378 1148.54 592.217C1149.37 588.999 1149.04 586.086 1147.85 583.52C1146.61 580.866 1144.44 577.356 1141.64 575.488C1138.8 573.587 1135.3 573.344 1131.48 572.351C1127.04 571.193 1122.34 569.339 1117.48 569.036C1113.37 568.779 1109.14 569.981 1104.86 570.06C1100.74 570.137 1096.57 569.083 1092.41 569.24C1088.61 569.412 1084.81 569.604 1081.1 569.943C1077.19 570.3 1073.38 572.048 1069.75 572.882C1066.52 573.622 1062.32 574.609 1059.45 575.947ZM1123.63 580.695C1132.18 582.811 1138.59 587.917 1136.65 595.139C1135.39 599.87 1130.14 602.361 1126.94 605.972C1124.41 608.96 1123.25 612.447 1121.98 615.933C1119.85 621.91 1117.22 628.136 1111.78 632.494C1108.09 635.482 1103.33 637.226 1098.48 636.976C1094.3 636.852 1090.51 635.233 1087.4 632.743C1082.25 628.509 1079.92 622.283 1076.52 617.178C1074.58 614.314 1072.34 611.699 1070.01 609.209C1064.96 603.855 1059.33 597.878 1061.47 591.154C1062.63 587.419 1065.74 585.053 1069.53 583.309C1076.52 580.197 1085.17 579.698 1093.81 579.325C1104.21 578.951 1114.6 578.453 1123.63 580.695Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1059.45 575.947C1054.49 578.345 1051.54 581.599 1050.02 586.737C1048.73 590.99 1048.46 596.253 1050.42 600.088C1052.71 604.592 1057.64 607.592 1061.22 611.569C1064.27 614.994 1064.94 618.591 1067.48 622.53C1069.86 626.281 1072.98 630.473 1075.33 634.451C1077.39 637.919 1080.86 642.452 1084 645.164C1086.04 646.872 1088.29 647.055 1090.72 648.061C1093.16 649.072 1095.77 650.901 1098.52 650.987C1101.97 651.173 1105.39 649.324 1108.56 648.061C1111.24 646.995 1114.87 646.701 1117.09 644.822C1120.88 641.628 1123.63 636.478 1125.8 632.266C1127.7 628.573 1129.14 624.657 1130.45 620.817C1132.11 616.022 1133.63 613.681 1136.94 609.571C1139.1 607.017 1140.84 603.643 1143.34 601.275C1145.7 599.039 1147.74 595.378 1148.54 592.217C1149.37 588.999 1149.04 586.086 1147.85 583.52C1146.61 580.866 1144.44 577.356 1141.64 575.488C1138.8 573.587 1135.3 573.344 1131.48 572.351C1127.04 571.193 1122.34 569.339 1117.48 569.036C1113.37 568.779 1109.14 569.981 1104.86 570.06C1100.74 570.137 1096.57 569.083 1092.41 569.24C1088.61 569.412 1084.81 569.604 1081.1 569.943C1077.19 570.3 1073.38 572.048 1069.75 572.882C1066.52 573.622 1062.32 574.609 1059.45 575.947ZM1123.63 580.695C1132.18 582.811 1138.59 587.917 1136.65 595.139C1135.39 599.87 1130.14 602.361 1126.94 605.972C1124.41 608.96 1123.25 612.447 1121.98 615.933C1119.85 621.91 1117.22 628.136 1111.78 632.494C1108.09 635.482 1103.33 637.226 1098.48 636.976C1094.3 636.852 1090.51 635.233 1087.4 632.743C1082.25 628.509 1079.92 622.283 1076.52 617.178C1074.58 614.314 1072.34 611.699 1070.01 609.209C1064.96 603.855 1059.33 597.878 1061.47 591.154C1062.63 587.419 1065.74 585.053 1069.53 583.309C1076.52 580.197 1085.17 579.698 1093.81 579.325C1104.21 578.951 1114.6 578.453 1123.63 580.695Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1063.87 580.829C1059.49 582.783 1056.89 585.434 1055.54 589.62C1054.4 593.086 1054.17 597.374 1055.89 600.499C1057.92 604.169 1062.28 606.614 1065.44 609.854C1068.14 612.645 1068.72 615.576 1070.97 618.785C1073.08 621.842 1075.83 625.257 1077.91 628.499C1079.72 631.325 1082.79 635.019 1085.57 637.228C1087.36 638.62 1089.35 638.769 1091.5 639.588C1093.66 640.412 1095.97 641.903 1098.39 641.973C1101.44 642.124 1104.46 640.618 1107.27 639.588C1109.63 638.721 1112.85 638.481 1114.8 636.949C1118.16 634.347 1120.59 630.15 1122.5 626.718C1124.18 623.709 1125.46 620.519 1126.61 617.39C1128.07 613.482 1129.42 611.575 1132.35 608.226C1134.26 606.145 1135.79 603.396 1138 601.467C1140.09 599.644 1141.88 596.661 1142.6 594.086C1143.32 591.464 1143.04 589.09 1141.98 586.999C1140.89 584.837 1138.97 581.976 1136.5 580.454C1133.99 578.906 1130.9 578.707 1127.52 577.898C1123.59 576.955 1119.44 575.445 1115.15 575.197C1111.52 574.988 1107.78 575.967 1104 576.032C1100.36 576.094 1096.68 575.235 1092.99 575.363C1089.64 575.504 1086.28 575.66 1083 575.936C1079.55 576.227 1076.18 577.651 1072.97 578.331C1070.12 578.934 1066.41 579.738 1063.87 580.829ZM1123.63 580.694C1132.18 582.811 1138.59 587.916 1136.65 595.138C1135.39 599.87 1130.14 602.36 1126.94 605.971C1124.41 608.959 1123.25 612.446 1121.98 615.932C1119.85 621.909 1117.22 628.135 1111.78 632.493C1108.09 635.482 1103.33 637.225 1098.47 636.976C1094.3 636.851 1090.51 635.233 1087.4 632.742C1082.25 628.509 1079.92 622.283 1076.52 617.177C1074.58 614.314 1072.34 611.699 1070.01 609.208C1064.96 603.854 1059.33 597.877 1061.46 591.153C1062.63 587.418 1065.74 585.052 1069.53 583.309C1076.52 580.196 1085.17 579.698 1093.81 579.324C1104.21 578.951 1114.6 578.453 1123.63 580.694Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth61Diagnozis.culttab &&
                !tooth61Diagnozis.abutment &&
                !tooth61Diagnozis.implant &&
                !tooth61Diagnozis.shaper &&
                !tooth61Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС LEFT*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1083.2,604.8c0,0.5-0.1,1-0.3,1.7c-1.4,4.6-7.7,12.6-11.5,17.2c-0.6-1-1.3-2-1.9-2.9
                                c-2.5-3.5-5.4-6.7-8.5-9.8c-6.7-6.6-14-13.9-11.2-22.2c1.5-4.5,5.6-7.5,10.6-9.6c0.2-0.1,0.3-0.1,0.5-0.2
                                c3.4,2.3,8.6,6.2,13.1,10.8C1081.2,597.3,1083.2,601.3,1083.2,604.8z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth61.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth61.seal_left ? `seal-fill ${teethDiagnozis.tooth61.seal_left_color}` : ''}
                                `}
                d="M1083.2,604.8c0,0.5-0.1,1-0.3,1.7c-1.4,4.6-7.7,12.6-11.5,17.2c-0.6-1-1.3-2-1.9-2.9
                                c-2.5-3.5-5.4-6.7-8.5-9.8c-6.7-6.6-14-13.9-11.2-22.2c1.5-4.5,5.6-7.5,10.6-9.6c0.2-0.1,0.3-0.1,0.5-0.2
                                c3.4,2.3,8.6,6.2,13.1,10.8C1081.2,597.3,1083.2,601.3,1083.2,604.8z"
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M1127.7,622.2c-2.6,6.4-6,12.8-12.1,17.4c-4.8,3.6-11,5.8-17.4,5.5c-5.4-0.2-10.4-2.2-14.4-5.3
                                c-5.7-4.4-8.8-10.5-12.3-16.1c3.8-4.6,10.1-12.6,11.5-17.2c4.9-0.4,16.5-1.3,20.5-1.3h16.2c-0.2,0.8-0.2,1.7,0,2.6
                                C1120.3,611.4,1124.9,618.3,1127.7,622.2z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth61.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth61.seal_bottom ? `seal-fill ${teethDiagnozis.tooth61.seal_bottom_color}` : ''}
                                `}
                d="M1127.7,622.2c-2.6,6.4-6,12.8-12.1,17.4c-4.8,3.6-11,5.8-17.4,5.5c-5.4-0.2-10.4-2.2-14.4-5.3
                                c-5.7-4.4-8.8-10.5-12.3-16.1c3.8-4.6,10.1-12.6,11.5-17.2c4.9-0.4,16.5-1.3,20.5-1.3h16.2c-0.2,0.8-0.2,1.7,0,2.6
                                C1120.3,611.4,1124.9,618.3,1127.7,622.2z"
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
                d="M1148.2,593.5c-1.7,5.9-8.6,8.9-12.9,13.6c-3.3,3.5-4.8,7.9-6.4,12.2c-0.4,1-0.8,2-1.2,2.9
                                c-2.8-3.9-7.4-10.8-8.2-14.5c-0.2-0.9-0.2-1.8,0-2.6c0.8-4.1,5.4-7.3,9.1-10.5c3.3-2.8,11.7-9.4,15.8-12.7
                                C1147.9,585,1149.5,588.9,1148.2,593.5z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth61.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth61.seal_right ? `seal-fill ${teethDiagnozis.tooth61.seal_right_color}` : ''}
                                `}
                d="M1148.2,593.5c-1.7,5.9-8.6,8.9-12.9,13.6c-3.3,3.5-4.8,7.9-6.4,12.2c-0.4,1-0.8,2-1.2,2.9
                                c-2.8-3.9-7.4-10.8-8.2-14.5c-0.2-0.9-0.2-1.8,0-2.6c0.8-4.1,5.4-7.3,9.1-10.5c3.3-2.8,11.7-9.4,15.8-12.7
                                C1147.9,585,1149.5,588.9,1148.2,593.5z"
              />
            </g>
            {/*КАРИЕС TOP*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M1144.5,581.9c-4.2,3.3-12.6,9.9-15.8,12.7c-3.7,3.2-8.2,6.4-9.1,10.5h-16.2c-4,0-15.5,0.9-20.5,1.3
                                c0.2-0.6,0.3-1.2,0.3-1.7c0-3.5-2-7.5-9.3-15c-4.5-4.6-9.7-8.5-13.1-10.8c9.1-3.7,20.2-4.3,31.3-4.8c13.6-0.6,27.2-1.1,39,1.6
                                C1136.6,577.1,1141.3,579.1,1144.5,581.9z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth61.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth61.seal_top ? `seal-fill ${teethDiagnozis.tooth61.seal_top_color}` : ''}
                                `}
                d="M1144.5,581.9c-4.2,3.3-12.6,9.9-15.8,12.7c-3.7,3.2-8.2,6.4-9.1,10.5h-16.2c-4,0-15.5,0.9-20.5,1.3
                                c0.2-0.6,0.3-1.2,0.3-1.7c0-3.5-2-7.5-9.3-15c-4.5-4.6-9.7-8.5-13.1-10.8c9.1-3.7,20.2-4.3,31.3-4.8c13.6-0.6,27.2-1.1,39,1.6
                                C1136.6,577.1,1141.3,579.1,1144.5,581.9z"
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_right &&
                      !tooth61Diagnozis.seal_bottom &&
                      !tooth61Diagnozis.seal_center) ||
                    (tooth61Diagnozis.seal_bottom &&
                      !tooth61Diagnozis.seal_center &&
                      !tooth61Diagnozis.seal_left &&
                      !tooth61Diagnozis.seal_right &&
                      tooth61Diagnozis.seal_top) ||
                    (!tooth61Diagnozis.seal_right &&
                      !tooth61Diagnozis.seal_top &&
                      !tooth61Diagnozis.seal_center &&
                      tooth61Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1119 605C1119.17 607.167 1120.4 612.7 1124 617.5"
              />
              {/*Овал лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_right &&
                      !tooth61Diagnozis.seal_top) ||
                    (!tooth61Diagnozis.seal_right && tooth61Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1119 605C1124.5 594 1135.5 588 1140 585"
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_bottom &&
                      !tooth61Diagnozis.seal_top) ||
                    (!tooth61Diagnozis.seal_bottom &&
                      !tooth61Diagnozis.seal_center &&
                      tooth61Diagnozis.seal_top) ||
                    (tooth61Diagnozis.seal_right &&
                      !tooth61Diagnozis.seal_bottom &&
                      tooth61Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1119 605C1113.67 604.333 1098.9 603.7 1082.5 606.5"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_left &&
                      !tooth61Diagnozis.seal_top) ||
                    (!tooth61Diagnozis.seal_left && tooth61Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1082.5 606.5C1083.5 603.833 1081.3 595.2 1064.5 582"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_left &&
                      !tooth61Diagnozis.seal_bottom) ||
                    (!tooth61Diagnozis.seal_left &&
                      tooth61Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1082.5 606.5C1082.67 607.667 1081.2 612 1074 620"
              />
            </g>
          </g>
          {/* VINIR */}
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth61Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth61Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1144.5 581.9C1141.3 579.1 1136.6 576.999 1131.2 575.799C1119.4 573.099 1105.8 573.6 1092.2 574.2C1081.1 574.7 1070 575.3 1060.9 579C1060.8 579 1060.6 579.1 1060.4 579.2C1055.5 581.3 1051.4 584.299 1049.8 588.799C1049.32 590.229 1049.14 591.628 1049.2 593C1051.8 593.156 1058.7 592.471 1065.5 588.484C1066.71 587.601 1068.09 586.854 1069.57 586.216C1069.72 586.139 1069.87 586.061 1069.95 586.061C1076.9 583.211 1085.39 582.749 1093.87 582.364C1104.26 581.902 1114.65 581.517 1123.67 583.597C1127.79 584.521 1131.38 586.139 1133.83 588.295C1133.9 588.363 1133.98 588.431 1134.05 588.5C1139.28 592.1 1145.75 593 1148.33 593C1149.38 588.617 1147.78 584.887 1144.5 581.9Z"
              ></path>
              <path
                className="st55"
                d="M1148.2 593.5C1148.25 593.332 1148.29 593.166 1148.33 593M1148.33 593C1149.38 588.617 1147.78 584.887 1144.5 581.9C1141.3 579.1 1136.6 576.999 1131.2 575.799C1119.4 573.099 1105.8 573.6 1092.2 574.2C1081.1 574.7 1070 575.3 1060.9 579C1060.8 579 1060.6 579.1 1060.4 579.2C1055.5 581.3 1051.4 584.299 1049.8 588.799C1049.32 590.229 1049.14 591.628 1049.2 593C1051.8 593.156 1058.7 592.471 1065.5 588.484C1066.71 587.601 1068.09 586.854 1069.57 586.216C1069.72 586.139 1069.87 586.061 1069.95 586.061C1076.9 583.211 1085.39 582.749 1093.87 582.364C1104.26 581.902 1114.65 581.517 1123.67 583.597C1127.79 584.521 1131.38 586.139 1133.83 588.295C1133.9 588.363 1133.98 588.431 1134.05 588.5C1139.28 592.1 1145.75 593 1148.33 593Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth61Diagnozis.temporary_crown ||
                tooth61Diagnozis.ceramic_crown ||
                tooth61Diagnozis.mceramic_crown ||
                tooth61Diagnozis.metalic_crown ||
                tooth61Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth61Diagnozis.temporary_crown ||
                tooth61Diagnozis.ceramic_crown ||
                tooth61Diagnozis.mceramic_crown ||
                tooth61Diagnozis.metalic_crown ||
                tooth61Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth61Diagnozis.ceramic_crown_color}
                                ${tooth61Diagnozis.mceramic_crown_color}
                                ${tooth61Diagnozis.metalic_crown_color}
                                ${tooth61Diagnozis.zirconia_crown_color}
                            `}
              d="M1144.5,581.9c-3.2-2.8-7.9-4.9-13.3-6.1c-11.8-2.7-25.4-2.2-39-1.6
                            c-11.1,0.5-22.2,1.1-31.3,4.8c-0.1,0-0.3,0.1-0.5,0.2c-4.9,2.1-9,5.1-10.6,9.6c-2.8,8.3,4.5,15.6,11.2,22.2c3.1,3.1,6,6.3,8.5,9.8
                            c0.7,0.9,1.3,1.9,2,2.9c3.5,5.6,6.6,11.7,12.3,16.1c4,3.1,9,5,14.4,5.3c6.4,0.3,12.6-1.9,17.4-5.5c6.1-4.6,9.5-11,12.1-17.4
                            c0.4-1,0.8-2,1.2-2.9c1.6-4.3,3.2-8.6,6.4-12.2c4.3-4.7,11.2-7.7,12.9-13.6C1149.5,588.9,1147.9,585,1144.5,581.9z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 25, 101)',
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
                  !tooth61Diagnozis.implant &&
                  !tooth61Diagnozis.apex &&
                  !tooth61Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_61"
                className={`st9 change-color ${tooth61Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1144,446.6c-0.5,14.5-2.3,29-5.5,43.1l-1.5,1.7l-2.4,1.6
                                c-5.2,0.5-10.4,1-15.6,1.4c-17.7,1.3-35.4,1.8-53.1,1.4l-2.7-1.2l-2.2-2.9c-1.3-9.1-2.3-18.2-2.8-27.3c-0.5-7.7-0.7-15.4-0.2-23v0
                                c3.9-9,9.5-17.3,16.9-23.8c4.8-4.1,10.2-7.4,16.1-9.7c0.9-0.4,1.9-0.7,2.9-1c6.3-2,12.9-2.7,19.2-1.5c2.6,0.5,5.1,1.4,7.4,2.6
                                c8.3,4.3,13.6,12.4,17.3,20.9c2.6,5.8,4.5,11.9,6,18.1c0,0.1,0.1,0.2,0.1,0.4C1143.9,447.2,1144,446.9,1144,446.6z"
              />
            </g>
            {/*змінений у кольорі*/}
            <g
              id="dentin_n_21"
              style={{
                visibility:
                  !tooth61Diagnozis.implant &&
                  !tooth61Diagnozis.abutment &&
                  !tooth61Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth61Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1144.2,347.6c-0.1,23.2-0.6,46.4-0.3,69.7c0.1,9.8,0.4,19.5,0.1,29.3
                                c0,0.3,0,0.6,0,0.9c0-0.1,0-0.2-0.1-0.4c-1.5-6.2-3.4-12.2-6-18.1c-3.7-8.5-9-16.6-17.3-20.9c-2.4-1.2-4.9-2.1-7.4-2.6
                                c-6.3-1.2-13-0.5-19.2,1.5c-1,0.3-1.9,0.6-2.9,1c-5.9,2.2-11.4,5.5-16.1,9.7c-7.5,6.5-13,14.8-16.9,23.8c0.2-2.4,0.4-4.8,0.7-7.2
                                c1-8,3-15.9,4.5-23.8c2.4-12.6,3.8-25.4,5.6-38.1c3.3-23.2,8-46.3,13-69.3c3.9-17.9,8-35.8,13.9-53.2c3.2-9.3,9-18.6,18.7-18.4
                                c3.3,0.1,6,1.2,8.2,3c0,0,0,0,0,0c5.1,4.1,7.8,11.8,9.9,19c2.2,7.8,5,15.4,6.9,23.3c1.8,7.7,2.8,15.6,3.5,23.5
                                C1144.2,316,1144.2,331.8,1144.2,347.6z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth61Diagnozis.channel_class} ${tooth61Diagnozis.channel_class} ${tooth61Diagnozis.pulpit ? 'pulpit' : ''} ${tooth61Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1116.7,428.4c0.3,5.5,0,11.1-0.7,16.6c-0.5,4.7-1.3,9.3-2.2,13.9l-1.8,2.1l-22.7,0
                                l-2.2-2.3c-2-7.6-2.7-15.5-1.9-23.3c0.8-7.6,2.8-14.9,4.6-22.4c0.4-1.7,0.8-3.4,1.2-5c0.4-0.2,0.9-0.3,1.3-0.5
                                c0.5-0.2,1-0.4,1.5-0.5c4.4-1.4,9-2.2,13.5-2c0.6,0,1.3,0,1.9,0.1c0.3,0,0.6,0.1,0.9,0.1c0.3,0,0.6,0.1,0.9,0.1
                                c0.3,0,0.6,0.1,0.9,0.1c0.4,0.1,0.7,0.1,1.1,0.2v0C1113,405.1,1116.2,420.2,1116.7,428.4z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth61Diagnozis.channel_class} ${tooth61Diagnozis.channel_class} ${tooth61Diagnozis.pulpit ? 'pulpit' : ''} ${tooth61Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1112.9,404.3c0.1,0.5,0.1,0.9,0.2,1.3v0c-0.4-0.1-0.7-0.1-1.1-0.2
                                c-0.3,0-0.6-0.1-0.9-0.1s-0.6-0.1-0.9-0.1c-0.3,0-0.6,0-0.9-0.1c-0.6,0-1.3-0.1-1.9-0.1c-4.5-0.1-9.1,0.7-13.5,2
                                c-0.5,0.2-1,0.3-1.5,0.5c-0.4,0.2-0.9,0.3-1.3,0.5c5.1-22.9,7.9-46.2,11.3-69.3c0.9-5.8,1.7-11.6,2.7-17.3
                                c0.6-0.1,1.3-0.2,1.9-0.2c2.6-0.2,5.1-0.2,7.6,0c-0.5,7.2-1,14.4-1.5,21.6C1111.5,363.4,1109.7,383.9,1112.9,404.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth61Diagnozis.channel_class} ${tooth61Diagnozis.channel_class} ${tooth61Diagnozis.pulpit ? 'pulpit' : ''} ${tooth61Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1122.6,234.3c0,0.1,0,0.2,0,0.3c-2.1,15.6-3.8,31.2-5.1,46.8
                                c-1.2,13.3-2.1,26.6-3,39.9c-2.5-0.2-5-0.3-7.6,0c-0.6,0.1-1.3,0.1-1.9,0.2c1.9-11.7,3.9-23.3,6.2-35c3.4-17.4,7.2-34.7,11.4-51.9
                                C1122.6,234.5,1122.6,234.4,1122.6,234.3z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage61 />
          </g>
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth61Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1144.32 447.499C1143.82 461.699 1142.02 475.899 1138.92 489.799L1137.42 491.499L1134.92 493.099C1131.92 493.399 1128.92 493.699 1125.92 493.899C1123.72 494.099 1121.52 494.299 1119.32 494.399C1103.02 
                            495.599 1086.72 496.099 1070.42 495.799C1069.02 495.799 1067.62 495.799 1066.22 495.699L1063.52 494.499L1061.32 491.599C1060.02 482.499 1059.02 473.399 1058.52 464.299C1058.12 458.199 1057.92 451.999 1058.12 445.799C1058.12 444.299 1058.22 442.799 1058.32 441.299C1058.52 
                            440.699 1058.82 440.199 1059.12 439.599C1059.32 439.099 1059.62 438.599 1059.82 438.099C1060.12 437.499 1060.42 436.899 1060.72 436.299C1061.02 435.799 1061.32 435.199 1061.62 434.699C1062.22 433.599 1062.82 432.599 1063.42 431.599C1063.42 431.599 1063.42 431.599 1063.42 431.499C1063.72 430.999 1064.02 430.599 1064.32 
                            430.099C1064.32 429.999 1064.42 429.999 1064.42 429.899C1064.72 429.399 1065.02 428.899 1065.42 428.399C1065.72 427.899 1066.12 427.399 1066.42 426.899C1066.42 426.899 1066.42 426.899 1066.52 426.799C1066.92 426.299 1067.22 425.799 1067.62 425.399C1068.02 424.899 1068.42 424.399 1068.82 423.999C1069.22 423.499 
                            1069.62 423.099 1070.02 422.599C1070.42 422.199 1070.82 421.699 1071.22 421.299C1072.52 419.999 1073.82 418.699 1075.22 417.399C1077.92 415.099 1080.82 412.999 1083.92 411.199C1084.22 410.999 1084.62 410.799 1084.92 410.599C1085.22 410.399 1085.62 410.199 1085.92 410.099C1086.22 409.899 1086.62 409.699 1087.02 409.599C1087.42 409.399 1087.72 409.299 
                            1088.12 409.099C1088.52 408.899 1088.82 408.799 1089.22 408.599C1089.72 408.399 1090.32 408.099 1090.92 407.899C1091.12 407.799 1091.32 407.799 1091.42 407.699C1091.92 407.499 1092.32 407.399 1092.82 407.199C1093.32 406.999 1093.82 406.799 1094.32 406.699C1098.72 405.299 1103.42 404.499 1108.02 404.699C1108.62 404.699 1109.22 404.699 1109.82 404.799C1110.12 404.799 1110.42 404.799 1110.72 404.899C1111.02 404.899 1111.32 
                            404.999 1111.62 404.999C1111.92 404.999 1112.22 405.099 1112.52 405.099C1112.92 405.199 1113.22 405.199 1113.62 405.299C1113.82 405.299 1114.02 405.399 1114.32 405.399C1114.52 405.399 1114.82 405.499 1115.02 405.599C1115.12 405.599 1115.12 405.599 1115.22 405.599C1115.52 405.699 1115.82 405.699 1116.02 405.799C1116.32 405.899 1116.62 405.999 1116.92 406.099C1117.22 406.199 1117.42 406.299 1117.72 406.399C1118.02 406.499 1118.32 406.599 1118.52 406.699C1118.82 406.799 1119.12 406.899 1119.32 406.999C1119.92 407.199 1120.42 407.499 1120.92 407.799C1123.82 409.299 1126.32 411.199 1128.52 413.399C1132.72 417.699 1135.82 423.099 1138.22 428.699C1139.52 
                            431.599 1140.62 434.599 1141.62 437.599C1142.12 439.099 1142.62 440.599 1143.02 442.099C1143.42 443.599 1143.82 445.199 1144.22 446.699C1144.32 447.199 1144.32 447.399 1144.32 447.499Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st57"
              d="M1116.62 301.799L1113.72 494.799H1113.62C1104.12 495.399 1094.62 495.799 1085.22 495.899L1109.02 301.099C1109.22 300.199 1109.62 299.399 1110.32 298.799C1111.02 298.199 1111.82 297.899 1112.82 
                            297.899C1114.92 297.899 1116.62 299.699 1116.62 301.799Z"
              style={{ fill: tooth61Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth61Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth61Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st16"
              d="M1116.4,301.8l-1.6,104c-0.2-0.1-0.5-0.1-0.7-0.2c-0.2-0.1-0.4-0.1-0.7-0.1c0,0,0,0,0,0
                            c-0.4-0.1-0.7-0.1-1.1-0.2c-0.3,0-0.6-0.1-0.9-0.1c-0.3,0-0.6-0.1-0.9-0.1c-0.3,0-0.6,0-0.9-0.1h0c-0.6,0-1.2-0.1-1.8-0.1
                            c-4.6-0.1-9.2,0.7-13.7,2c-0.5,0.2-1,0.3-1.5,0.5c-0.5,0.2-0.9,0.3-1.4,0.5c-0.2,0.1-0.4,0.1-0.5,0.2l17.9-107.1
                            c0.2-0.9,0.6-1.7,1.3-2.3c0.7-0.6,1.5-0.9,2.5-0.9C1114.8,297.9,1116.5,299.7,1116.4,301.8z"
            />
            <path
              className="st15"
              d="M1144.3,447.5C1144.3,447.5,1144.3,447.5,1144.3,447.5c-0.5,14.2-2.3,28.4-5.4,42.3l-1.5,1.7l-2.5,1.6
                            c-3,0.3-6,0.6-9,0.8c-2.2,0.2-4.4,0.4-6.6,0.5c-16.3,1.2-32.6,1.7-48.9,1.4c-1.4,0-2.8,0-4.2-0.1l-2.7-1.2l-2.2-2.9
                            c-1.3-9.1-2.3-18.2-2.8-27.3c-0.4-6.1-0.6-12.3-0.4-18.5c0-1.5,0.1-3,0.2-4.5c0,0,0,0,0,0c0.2-0.6,0.5-1.1,0.8-1.7
                            c0.2-0.5,0.5-1,0.7-1.5c0.3-0.6,0.6-1.2,0.9-1.8c0.3-0.5,0.6-1.1,0.9-1.6c0.6-1.1,1.2-2.1,1.8-3.1c0,0,0,0,0-0.1
                            c0.3-0.5,0.6-0.9,0.9-1.4c0-0.1,0.1-0.1,0.1-0.2c0.3-0.5,0.6-1,1-1.5c0.3-0.5,0.7-1,1-1.5c0,0,0,0,0.1-0.1c0.4-0.5,0.7-1,1.1-1.4
                            c0.4-0.5,0.8-1,1.2-1.4c0.4-0.5,0.8-0.9,1.2-1.4c0,0,0,0,0,0c0.4-0.4,0.8-0.9,1.2-1.3c1.3-1.3,2.6-2.6,4-3.9
                            c2.7-2.3,5.6-4.4,8.7-6.2c0.3-0.2,0.7-0.4,1-0.6c0.3-0.2,0.7-0.4,1-0.5c0.3-0.2,0.7-0.4,1.1-0.5c0.4-0.2,0.7-0.3,1.1-0.5
                            c0.4-0.2,0.7-0.3,1.1-0.5c0.5-0.2,1.1-0.5,1.7-0.7c0.2-0.1,0.4-0.1,0.5-0.2c0.5-0.2,0.9-0.3,1.4-0.5c0.5-0.2,1-0.4,1.5-0.5
                            c4.4-1.4,9.1-2.2,13.7-2c0.6,0,1.2,0,1.8,0.1h0c0.3,0,0.6,0,0.9,0.1c0.3,0,0.6,0.1,0.9,0.1c0.3,0,0.6,0.1,0.9,0.1
                            c0.4,0.1,0.7,0.1,1.1,0.2c0,0,0,0,0,0c0.2,0,0.4,0.1,0.7,0.1c0.2,0,0.5,0.1,0.7,0.2c0.1,0,0.1,0,0.2,0c0.3,0.1,0.6,0.1,0.8,0.2
                            c0.3,0.1,0.6,0.2,0.9,0.3c0.3,0.1,0.5,0.2,0.8,0.3c0.3,0.1,0.6,0.2,0.8,0.3c0.3,0.1,0.6,0.2,0.8,0.3c0.6,0.2,1.1,0.5,1.6,0.8
                            c2.9,1.5,5.4,3.4,7.6,5.6c4.2,4.3,7.3,9.7,9.7,15.3c1.3,2.9,2.4,5.9,3.4,8.9c0.5,1.5,1,3,1.4,4.5c0.4,1.5,0.8,3.1,1.2,4.6
                            C1144.3,447.2,1144.3,447.4,1144.3,447.5z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth61Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth61Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M1058.6,442.1c4-6.4,12.9-21.1,16.6-24.4c5.5-4.8,12-8.5,19-10.7c8.8-2.8,18.5-3.1,26.7,1.1
                            c4.2,2.2,20.7,36.1,23.5,39.8l-2.7-10l-19.3-39.2l-36.3-3.4l-27.2,43C1058.8,438.4,1058.1,442.8,1058.6,442.1z"
            />
            <path
              className="st33"
              d="M1058.5,464.5c0.6,9.1,1.5,18.3,2.8,27.3l2.2,2.9l2.7,1.2c17.7,0.4,35.4-0.1,53.1-1.4
                            c5.2-0.4,10.4-0.8,15.6-1.4l2.5-1.6l1.5-1.7c3.1-13.9,4.9-28,5.4-42.3c-1.5-6.3-3.4-12.5-6-18.4c-1.8-4.2-4.1-8.3-6.8-11.9
                            c-2.8-3.7-6.3-6.8-10.5-9c-8.2-4.2-17.8-3.9-26.7-1.1c-7,2.2-13.5,5.9-19,10.7c-4.2,3.6-7.8,7.8-10.8,12.4l0,0
                            c-1.6,2.4-3,4.8-4.2,7.4c0,0-0.1,0.1-0.1,0.1c-0.6,1.3-1.2,2.5-1.8,3.8C1057.8,449.1,1058,456.8,1058.5,464.5z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1074.36 433.822C1073.78 436.197 1075.44 438.538 1077.88 438.764L1119.15 442.601C1121.59 442.827 1123.65 440.834 1123.52 438.393L1121.27 398.596C1121.16 396.614 1119.61 395.013 1117.63 394.837L1088.14 392.209C1086.17 392.033 1084.37 393.318 1083.9 395.233L1074.36 433.822Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility: tooth61Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth61Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st18"
              d="M1079.1,395.2l46.5,3.6c1.7-24.7,2.9-49.4,3.5-74.1c0.6-24,0.6-47.9,0.1-71.8c-3.4-4.6-8.5-7.5-14.1-8
                            c-5.9-0.5-11.9,1.7-16.7,6.1c-3.9,24.8-7.5,49.7-10.8,74.6C1084.6,348.7,1081.8,371.9,1079.1,395.2z"
            />
            <line
              className="st19"
              x1="1076.7"
              y1="374.6"
              x2="1130.2"
              y2="385.7"
            ></line>
            <line
              className="st19"
              x1="1078.9"
              y1="346.4"
              x2="1132.4"
              y2="357.4"
            ></line>
            <line
              className="st19"
              x1="1082.2"
              y1="318.1"
              x2="1135.6"
              y2="329.1"
            ></line>
            <line
              className="st19"
              x1="1084.3"
              y1="289.8"
              x2="1137.8"
              y2="300.8"
            ></line>
            <line
              className="st19"
              x1="1086.4"
              y1="261.5"
              x2="1139.9"
              y2="272.6"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth61Diagnozis.culttab &&
                !tooth61Diagnozis.abutment &&
                !tooth61Diagnozis.implant &&
                !tooth61Diagnozis.shaper &&
                !tooth61Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1147.4,467.4c-0.8-6.8-2-13.6-3.6-20.2c-1.5-6.2-3.4-12.2-6-18.1
                            c-3.7-8.5-9-16.6-17.3-20.9c-8.2-4.2-17.8-3.9-26.7-1.1c-7,2.2-13.5,5.9-19,10.7c-7.9,6.9-13.7,15.8-17.6,25.4
                            c-0.3,0.6-0.5,1.3-0.7,1.9c-2.6,6.9-4.3,14.2-5.5,21.5c-1.5,9.8-2,19.7-2,29.5c0,7.3,0.2,14.5,0.6,21.7c0.1,1.6,0.6,3.2,1.2,4.7
                            c0.6,1.3,1.4,2.5,2.4,3.6l2.9,1.2c4.3,0.2,8.6,0.3,12.9,0.3c10.3,0.1,20.6,0,30.9-0.4c7.5-0.3,15-0.7,22.6-1.3
                            c3-0.2,5.9-0.5,8.9-0.8c2.8-1.1,5.3-2.5,7.6-4.4c2.9-2.4,5.3-5.4,7-8.7c0.9-3.5,1.6-7.1,2-10.6
                            C1149.5,490.1,1148.8,478.7,1147.4,467.4z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth61Diagnozis.culttab && !tooth61Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1143.82 447.2C1145.42 453.8 1146.62 460.6 1147.42 467.4C1148.82 478.7 1149.52 490.1 1148.02 501.4C1147.62 504.9 1146.92 508.5 1146.02 512C1144.32 515.3 1141.92 518.3 1139.02 520.7C1136.72 522.6 1134.22 524 1131.42 525.1C1131.17 525.125 1130.92 525.15 1130.67 525.176C1127.93 525.45 1125.27 525.717 1122.52 525.9C1114.92 526.5 1107.42 526.9 1099.92 527.2C1089.62 527.6 1079.32 527.7 1069.02 527.6C1064.72 527.6 1060.42 527.5 1056.12 527.3L1053.22 526.1C1052.22 525 1051.42 523.8 1050.82 522.5C1050.22 521 1049.72 519.4 1049.62 517.8C1049.22 510.6 1049.02 503.4 1049.02 496.1C1049.02 486.3 1049.52 476.4 1051.02 466.6C1052.22 459.3 1053.92 452 1056.52 445.1C1056.56 444.982 1056.6 444.861 1056.64 444.737C1056.8 444.229 1056.98 443.682 1057.22 443.2C1061.12 433.6 1066.92 424.7 1074.82 417.8C1080.32 413 1086.82 409.3 1093.82 407.1C1102.72 404.3 1112.32 404 1120.52 408.2C1128.82 412.5 1134.12 420.6 1137.82 429.1C1140.42 435 1142.32 441 1143.82 447.2ZM1115.83 413.462C1122.29 416.788 1126.42 423.052 1129.3 429.626C1130.45 432.213 1131.42 434.824 1132.26 437.474C1132.65 438.716 1131.74 439.971 1130.43 440.011L1068.87 441.911C1067.48 441.954 1066.47 440.597 1067 439.308C1069.87 432.313 1074.59 425.798 1080.25 420.887C1084.53 417.174 1089.59 414.313 1095.04 412.611C1101.97 410.446 1109.45 410.214 1115.83 413.462Z"
            ></path>
            <path
              className={`st7 ${tooth61Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1129.3 429.626C1126.42 423.052 1122.29 416.788 1115.83 413.462C1109.45 410.214 1101.97 410.446 1095.04 412.611C1089.59 414.313 1084.53 417.174 1080.25 420.887C1074.59 425.798 1069.87 432.313 1067 439.308C1066.47 440.597 1067.48 441.954 1068.87 441.911L1130.43 440.011C1131.74 439.971 1132.65 438.716 1132.26 437.474C1131.42 434.824 1130.45 432.213 1129.3 429.626Z"
              style={{ fill: 'rgb(255, 255, 255)', opacity: 0.7 }}
            ></path>
            <path
              className={`st60
                                    ${tooth61Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth61Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth61Diagnozis.seal_cervical_color}
                                `}
              d="M1129.3 429.626C1126.42 423.052 1122.29 416.788 1115.83 413.462C1109.45 410.214 1101.97 410.446 1095.04 412.611C1089.59 414.313 1084.53 417.174 1080.25 420.887C1074.59 425.798 1069.87 432.313 1067 439.308C1066.47 440.597 1067.48 441.954 1068.87 441.911L1130.43 440.011C1131.74 439.971 1132.65 438.716 1132.26 437.474C1131.42 434.824 1130.45 432.213 1129.3 429.626Z"
              style={{
                opacity: 0,
                stroke: 'rgb(156, 156, 156)',
                strokeWidth: 2,
              }}
            ></path>
          </g>
          {/* TARTAR */}
          <g
            className="tartar hImplant hEmpty"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth61.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1052.5 458.5L1055.5 454L1057.5 450L1059 445L1061.5 439.5L1064 435.5L1066.5 432L1069 427L1074.5 421.5L1079.5 417.5L1082.5 414.5L1088 412.5L1092.5 409.5L1097.5 408H1102L1106 407L1109.5 408H1113.5L1118.5 409.5L1121 410.5L1124.5 413.5L1128 417.5L1130.5 420L1132.5 424.5L1135.5 428V431L1138 435.5L1139 439.5L1141 442.5V445L1142 447L1143 450L1145.5 455L1146 454V449L1145 445L1146 440.5V438.5L1145 436V434.5L1144 431L1145 428V425.5L1144 421.5L1145 417.5V413.5L1145.5 407L1144 403V398L1139 394.5L1134 389L1128 387L1124.5 385L1119.5 382L1115 381.5L1109.5 380L1106 381.5L1100 380L1096 381.5L1091 382.5L1086 385H1082.5L1078 387L1072.5 391.5H1069L1066.5 394.5L1064 396L1063 399.5L1064 403V407L1061.5 409.5V414.5L1059.5 417.5L1060 420.5L1059 424.5V427L1057.5 431V434.5L1056.5 438.5L1055.5 441.5L1054.5 446L1053.5 449L1052.5 454L1052 457L1052.5 458.5Z"
            ></path>
            <path
              className="st61 level1"
              d="M1052.5 458.5L1055.5 454L1057.5 450L1059 445L1061.5 439.5L1064 435.5L1066.5 432L1069 427L1074.5 421.5L1079.5 417.5L1082.5 414.5L1088 412.5L1092.5 409.5L1097.5 408H1102L1106 407L1109.5 408H1113.5L1118.5 409.5L1121 410.5L1124.5 413.5L1128 417.5L1130.5 420L1132.5 424.5L1135.5 428V431L1138 435.5L1139 439.5L1141 442.5V445L1142 447L1143 450L1145.5 455L1146 454V449L1145 445L1146 440.5V438.5L1145 436V434.5L1144 431L1145 428L1143.5 426L1142.5 424L1140.5 422L1138 419L1136 416.5L1134 414.5L1132.5 412.5L1129 410.5L1126 407L1123.5 405.5L1120.5 403L1117 402.5L1113.5 400.5H1111.5L1109 400H1106.5L1103.5 399.5L1100.5 400H1097.5L1094.5 400.5L1092.5 401.5L1089 402.5L1085.5 403.5L1082.5 405.5L1081 407L1078 408.5L1076 409.5L1073.5 411.5L1071.5 413.5L1069 414.5L1066 417L1064 420L1061.5 421.5L1060.5 423L1059 424.5V427L1057.5 431V434.5L1056.5 438.5L1055.5 441.5L1054.5 446L1053.5 449L1052.5 454L1052 457L1052.5 458.5Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth61Diagnozis.culttab &&
                !tooth61Diagnozis.abutment &&
                !tooth61Diagnozis.implant &&
                !tooth61Diagnozis.shaper
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
                d="M1069.1,527.6c-4.3,0-8.6-0.2-12.9-0.3l-2.9-1.2c-1-1.1-1.8-2.3-2.4-3.6c-0.7-1.5-1.1-3.1-1.2-4.7
                                c-0.5-7.2-0.7-14.5-0.6-21.7c0-9.9,0.5-19.8,2-29.5c1.1-7.3,2.8-14.6,5.5-21.5c5.1,4.2,13.9,11.7,14.3,12.7
                                C1071.2,458.9,1069.6,511.2,1069.1,527.6z"
              />
              <path
                className={`
                                st8 target caries-left 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth61.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth61.seal_left ? `seal-fill ${teethDiagnozis.tooth61.seal_left_color}` : ''}
                            `}
                d="M1069.1,527.6c-4.3,0-8.6-0.2-12.9-0.3l-2.9-1.2c-1-1.1-1.8-2.3-2.4-3.6c-0.7-1.5-1.1-3.1-1.2-4.7
                                c-0.5-7.2-0.7-14.5-0.6-21.7c0-9.9,0.5-19.8,2-29.5c1.1-7.3,2.8-14.6,5.5-21.5c5.1,4.2,13.9,11.7,14.3,12.7
                                C1071.2,458.9,1069.6,511.2,1069.1,527.6z"
                style={{
                  fill: teethDiagnozis.tooth61.caries_left
                    ? '#606c80'
                    : teethDiagnozis.tooth61.seal_left
                      ? teethDiagnozis.tooth61.seal_left_color
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
                d="M1148,501.4c-0.5,3.6-1.1,7.1-2,10.6c-1.7,3.4-4.1,6.3-7,8.7c-2.3,1.9-4.8,3.4-7.6,4.4
                                c-3,0.3-5.9,0.5-8.9,0.8c1.6-17.3,5.9-62.7,6.5-65.6c0.5-2.5,9.7-9.5,14.8-13.2c1.6,6.6,2.7,13.4,3.6,20.2
                                C1148.8,478.7,1149.5,490.1,1148,501.4z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth61.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth61.seal_right ? `seal-fill ${teethDiagnozis.tooth61.seal_right_color}` : ''}
                            `}
                d="M1148,501.4c-0.5,3.6-1.1,7.1-2,10.6c-1.7,3.4-4.1,6.3-7,8.7c-2.3,1.9-4.8,3.4-7.6,4.4
                                c-3,0.3-5.9,0.5-8.9,0.8c1.6-17.3,5.9-62.7,6.5-65.6c0.5-2.5,9.7-9.5,14.8-13.2c1.6,6.6,2.7,13.4,3.6,20.2
                                C1148.8,478.7,1149.5,490.1,1148,501.4z"
                style={{
                  fill: teethDiagnozis.tooth61.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth61.seal_right
                      ? teethDiagnozis.tooth61.seal_right_color
                      : 'transparent',
                }}
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st58"
                d="M1143.8,447.1c-5.1,3.7-14.3,10.7-14.8,13.2c-0.6,2.9-4.9,48.3-6.5,65.6c-7.5,0.6-15,1-22.6,1.3
                                c-10.3,0.4-20.6,0.5-30.9,0.4c0.5-16.4,2.1-68.7,1.7-69.9c-0.3-1-9.2-8.5-14.3-12.7c0.2-0.6,0.5-1.3,0.7-1.9
                                c3.9-9.7,9.7-18.5,17.6-25.4c5.5-4.8,12-8.5,19-10.7c8.8-2.8,18.5-3.1,26.7,1.1c8.3,4.3,13.6,12.4,17.3,20.9
                                C1140.4,434.9,1142.4,441,1143.8,447.1z"
              />
              <path
                className={`
                                st8 target caries-top 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth61.caries_top ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth61.seal_top ? `seal-fill ${teethDiagnozis.tooth61.seal_top_color}` : ''}
                            `}
                d="M1143.8,447.1c-5.1,3.7-14.3,10.7-14.8,13.2c-0.6,2.9-4.9,48.3-6.5,65.6c-7.5,0.6-15,1-22.6,1.3
                                c-10.3,0.4-20.6,0.5-30.9,0.4c0.5-16.4,2.1-68.7,1.7-69.9c-0.3-1-9.2-8.5-14.3-12.7c0.2-0.6,0.5-1.3,0.7-1.9
                                c3.9-9.7,9.7-18.5,17.6-25.4c5.5-4.8,12-8.5,19-10.7c8.8-2.8,18.5-3.1,26.7,1.1c8.3,4.3,13.6,12.4,17.3,20.9
                                C1140.4,434.9,1142.4,441,1143.8,447.1z"
                style={{
                  fill: teethDiagnozis.tooth61.caries_top
                    ? '#606c80'
                    : teethDiagnozis.tooth61.seal_top
                      ? teethDiagnozis.tooth61.seal_top_color
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
                    (tooth61Diagnozis.seal_right &&
                      !tooth61Diagnozis.seal_top &&
                      !tooth61Diagnozis.seal_center) ||
                    (!tooth61Diagnozis.seal_right && tooth61Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1128.5 469.5L1123.5 520.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_right &&
                      !tooth61Diagnozis.seal_top) ||
                    (!tooth61Diagnozis.seal_right &&
                      tooth61Diagnozis.seal_top &&
                      !tooth61Diagnozis.seal_center) ||
                    (!tooth61Diagnozis.seal_right &&
                      tooth61Diagnozis.seal_top &&
                      tooth61Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1128.5 469.5C1129.5 457.5 1131.6 455.2 1140 450"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_left &&
                      !tooth61Diagnozis.seal_top) ||
                    (!tooth61Diagnozis.seal_left &&
                      tooth61Diagnozis.seal_top &&
                      !tooth61Diagnozis.seal_center) ||
                    (!tooth61Diagnozis.seal_left &&
                      tooth61Diagnozis.seal_top &&
                      tooth61Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1071.5 469.5C1071.5 456.5 1069.3 452.4 1060.5 448"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth61Diagnozis.seal_left &&
                      !tooth61Diagnozis.seal_top) ||
                    (tooth61Diagnozis.seal_left &&
                      tooth61Diagnozis.seal_left &&
                      tooth61Diagnozis.seal_center &&
                      !tooth61Diagnozis.seal_top) ||
                    (!tooth61Diagnozis.seal_left && tooth61Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1071.5 469.5L1069.5 522"
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
                visibility: tooth61Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth61Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth61Diagnozis.vinir_color}`}
                d="M1147.42 467.4C1146.62 460.6 1145.42 453.8 1143.82 447.2C1142.32 441 1140.42 435 1137.82 429.1C1134.12 420.6 1128.82 412.5 1120.52 408.2C1112.32 404 1102.72 404.3 1093.82 407.1C1086.82 409.3 1080.32 413 1074.82 417.8C1066.92 424.7 1061.12 433.6 1057.22 443.2C1056.92 443.8 1056.72 444.5 1056.52 445.1C1053.92 452 1052.22 459.3 1051.02 466.6C1049.52 476.4 1049.02 486.3 1049.02 496.1C1049.02 503.4 1049.22 510.6 1049.62 517.8C1049.72 519.4 1050.22 521 1050.82 522.5C1051.42 523.8 1052.22 525 1053.22 526.1L1056.12 527.3C1060.42 527.5 1064.72 527.6 1069.02 527.6C1079.32 527.7 1089.62 527.6 1099.92 527.2C1107.42 526.9 1114.92 526.5 1122.52 525.9C1125.52 525.7 1128.42 525.4 1131.42 525.1C1134.22 524 1136.72 522.6 1139.02 520.7C1141.92 518.3 1144.32 515.3 1146.02 512C1146.92 508.5 1147.62 504.9 1148.02 501.4C1149.52 490.1 1148.82 478.7 1147.42 467.4Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth61Diagnozis.temporary_crown ||
                tooth61Diagnozis.ceramic_crown ||
                tooth61Diagnozis.mceramic_crown ||
                tooth61Diagnozis.metalic_crown ||
                tooth61Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth61Diagnozis.temporary_crown ||
                tooth61Diagnozis.ceramic_crown ||
                tooth61Diagnozis.mceramic_crown ||
                tooth61Diagnozis.metalic_crown ||
                tooth61Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth61Diagnozis.ceramic_crown_color}
                                ${tooth61Diagnozis.mceramic_crown_color}
                                ${tooth61Diagnozis.metalic_crown_color}
                                ${tooth61Diagnozis.zirconia_crown_color}
                            `}
              d="M1147.4,467.4c-0.8-6.8-2-13.6-3.6-20.2c-1.5-6.2-3.4-12.2-6-18.1
                            c-3.7-8.5-9-16.6-17.3-20.9c-8.2-4.2-17.8-3.9-26.7-1.1c-7,2.2-13.5,5.9-19,10.7c-7.9,6.9-13.7,15.8-17.6,25.4
                            c-0.3,0.6-0.5,1.3-0.7,1.9c-2.6,6.9-4.3,14.2-5.5,21.5c-1.5,9.8-2,19.7-2,29.5c0,7.3,0.2,14.5,0.6,21.7c0.1,1.6,0.6,3.2,1.2,4.7
                            c0.6,1.3,1.4,2.5,2.4,3.6l2.9,1.2c4.3,0.2,8.6,0.3,12.9,0.3c10.3,0.1,20.6,0,30.9-0.4c7.5-0.3,15-0.7,22.6-1.3
                            c3-0.2,5.9-0.5,8.9-0.8c2.8-1.1,5.3-2.5,7.6-4.4c2.9-2.4,5.3-5.4,7-8.7c0.9-3.5,1.6-7.1,2-10.6
                            C1149.5,490.1,1148.8,478.7,1147.4,467.4z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
