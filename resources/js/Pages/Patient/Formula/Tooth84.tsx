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
import setupDiagnoze from '../../../lib/tFunctions';
import PeriodontitStage84 from './periodontit84';
import { excludeToothEffect } from '../../../Constants';

export default function tooth84() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth84Diagnozis = teethDiagnozis.tooth84;
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
        teethDiagnozis.tooth84.caries_bottom =
          !teethDiagnozis.tooth84.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth84.caries_center =
          !teethDiagnozis.tooth84.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth84.caries_left =
          !teethDiagnozis.tooth84.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth84.caries_right =
          !teethDiagnozis.tooth84.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth84.caries_top = !teethDiagnozis.tooth84.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth84.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth84.seal_center_color = sealColor1;
          teethDiagnozis.tooth84.seal_center = true;
        } else if (
          teethDiagnozis.tooth84.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth84.seal_center_color = sealColor2;
          teethDiagnozis.tooth84.seal_center = true;
        } else if (
          teethDiagnozis.tooth84.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth84.seal_center_color = sealColor3;
          teethDiagnozis.tooth84.seal_center = true;
        } else {
          teethDiagnozis.tooth84.seal_center =
            !teethDiagnozis.tooth84.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth84.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth84.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth84.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth84.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth84.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth84.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth84.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth84.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth84.seal_bottom = true;
        } else {
          teethDiagnozis.tooth84.seal_bottom =
            !teethDiagnozis.tooth84.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth84.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth84.seal_left_color = sealColor1;
          teethDiagnozis.tooth84.seal_left = true;
        } else if (
          teethDiagnozis.tooth84.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth84.seal_left_color = sealColor2;
          teethDiagnozis.tooth84.seal_left = true;
        } else if (
          teethDiagnozis.tooth84.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth84.seal_left_color = sealColor3;
          teethDiagnozis.tooth84.seal_left = true;
        } else {
          teethDiagnozis.tooth84.seal_left = !teethDiagnozis.tooth84.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth84.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth84.seal_right_color = sealColor1;
          teethDiagnozis.tooth84.seal_right = true;
        } else if (
          teethDiagnozis.tooth84.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth84.seal_right_color = sealColor2;
          teethDiagnozis.tooth84.seal_right = true;
        } else if (
          teethDiagnozis.tooth84.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth84.seal_right_color = sealColor3;
          teethDiagnozis.tooth84.seal_right = true;
        } else {
          teethDiagnozis.tooth84.seal_right =
            !teethDiagnozis.tooth84.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth84.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth84.seal_top_color = sealColor1;
          teethDiagnozis.tooth84.seal_top = true;
        } else if (
          teethDiagnozis.tooth84.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth84.seal_top_color = sealColor2;
          teethDiagnozis.tooth84.seal_top = true;
        } else if (
          teethDiagnozis.tooth84.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth84.seal_top_color = sealColor3;
          teethDiagnozis.tooth84.seal_top = true;
        } else {
          teethDiagnozis.tooth84.seal_top = !teethDiagnozis.tooth84.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth84.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth84.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth84.wedge_shaped_defect_color =
          !teethDiagnozis.tooth84.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth84.show &&
        !teethDiagnozis.tooth44.show
      ) {
        document.getElementById('TH-84').classList.add('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth84.show &&
        teethDiagnozis.tooth44.show
      ) {
        document.getElementById('TH-84').classList.add('f-tooth-active');
        document.getElementById('TH-44').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-84').classList.remove('f-tooth-active');
        document.getElementById('TH-44').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth84.show &&
        !teethDiagnozis.tooth44.show
      ) {
        document.getElementById('TH-84').classList.remove('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth84.show &&
        teethDiagnozis.tooth44.show
      ) {
        document.getElementById('TH-84').classList.remove('f-tooth-active');
        document.getElementById('TH-44').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth44.show) {
        document.getElementById('TH-84').classList.add('f-tooth-active');
        document.getElementById('TH-44').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth84.show) {
        document.getElementById('TH-84').classList.remove('f-tooth-active');
        document.getElementById('TH-44').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth44.show) {
        document.getElementById('TH-44').classList.add('f-tooth-active');
        document.getElementById('TH-84').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="84"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 760 842)"
          className={`st3 st4 st5 ${selectedTooth === 84 ? 'num-active' : ''}`}
        >
          84
        </text>
      </g>
      <g
        id="TH-84"
        className={`f-tooth-init-milk ${teethType} ${(teethDiagnozis.tooth84.show || allTeeth) && !teethDiagnozis.tooth84.absent ? 'f-tooth-active' : ''}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth84.show = !teethDiagnozis.tooth84.show;
            teethDiagnozis.tooth44.show = false;
          }

          dispatch(setSelectedToothNumber(84));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              84,
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
          className={`underlay ${selectedTooth === 84 ? 'selected' : ''}`}
          onMouseOver={() => {
            showHideOverlay('over');
          }}
          onMouseLeave={() => {
            showHideOverlay('leave');
          }}
          style={{ visibility: 'inherit' }}
        >
          <path
            className="st40"
            d="M810.8,1255.9c0,0-8,42-15,67s-14,47-33,47s-25-15-25-28s4-22,5-46s-1-71-2-84
                        s-13-41-9-68s21-54,22-79s-23-45-21-77s5.8-165.8,10-185c5-23,35-31,52-21s22,31,25,86s7,102,7,120s-2,35-15,71
                        c-13,36,18,62,14,100S815.8,1228.9,810.8,1255.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 255, 40)',
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
              style={{
                visibility:
                  !tooth84Diagnozis.culttab &&
                  !tooth84Diagnozis.implant &&
                  !tooth84Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st6 change-color ${tooth84Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth84Diagnozis?.apex ? 'apex' : ''}`}
                d="M489.2,969.7c-2.5,6.3-5.3,12.8-4.1,19.4c0.9,4.9,4.1,9.4,8.1,13.3
                                c3.3,3.2,7.3,6.1,12.2,7.4c5.1,1.4,10.9,0.9,15.9,2.6c5.9,1.9,9.7,6.2,14.7,9.4c7.4,4.6,16.9,6.4,26.4,6.1
                                c5.5-0.2,11.1-1.2,15.5-3.7c2.2-1.3,4.1-2.9,6.5-3.9c6-2.4,12.9-0.7,19.6-0.9c6-0.2,11.5-1.9,15.9-5.1c3.6-2.7,6-6.1,7.9-9.7
                                c1.8-3.4,3.2-6.9,3.8-10.5c1.2-7.2-0.8-14.5-2.6-21.7c-1.7-6.8-3.4-13.7-6.2-20.3c-3.3-7.8-8.4-15.3-17.5-19.5
                                c-8.7-4-19.2-4-29.2-2.4c-4.1,0.6-8.2,1.5-12.4,1.3c-3.9-0.2-7.5-1.3-11.3-2c-5.1-0.9-10.3-1-15.4-0.7c-5.1,0.3-10.2,0.8-15.1,2
                                c-5.5,1.3-10.7,3.3-14.9,6.4c-5.7,4.2-8.8,10-11.2,15.5C493.3,958.2,491.4,963.9,489.2,969.7z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth84Diagnozis?.apex || tooth84Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth84Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth84Diagnozis?.apex ? 'apex' : ''}`}
                d="M489.2 969.7C486.7 976 483.9 982.5 485.1 989.1C486 994 489.2 998.5 493.2 1002.4C496.5 1005.6 500.5 1008.5 505.4 1009.8C510.5 1011.2 516.3 1010.7 521.3 1012.4C527.2 1014.3 531 1018.6 536 1021.8C543.4 1026.4 552.9 1028.2 562.4 1027.9C567.9 1027.7 573.5 1026.7 577.9 1024.2C580.1 1022.9 582 1021.3 584.4 1020.3C590.4 1017.9 597.3 1019.6 604 1019.4C610 1019.2 615.5 1017.5 619.9 1014.3C623.5 1011.6 625.9 1008.2 627.8 1004.6C629.6 1001.2 631 997.7 631.6 
                                994.1C632.8 986.9 630.8 979.6 629 972.4C627.3 965.6 625.6 958.7 622.8 952.1C619.5 944.3 614.4 936.8 605.3 932.6C596.6 928.6 586.1 928.6 576.1 930.2C572 930.8 567.9 931.7 563.7 931.5C559.8 931.3 556.2 930.2 552.4 929.5C547.3 928.6 542.1 928.5 537 928.8C531.9 929.1 526.8 929.6 521.9 930.8C516.4 932.1 511.2 934.1 507 937.2C501.3 941.4 498.2 947.2 495.8 952.7C493.3 958.2 491.4 963.9 489.2 969.7Z"
              />
              <path
                className={`st24 change-color ${tooth84Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth84Diagnozis?.apex ? 'apex' : ''}`}
                d="M589.928 972.325C588.939 988.262 594.262 997 559.508 997C521.068 997 527.387 983.851 527.387 967.576C527.387 960.226 530.635 955 556.227 955C581.819 955 590.917 956.388 589.928 972.325Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth84Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g className="pulpitis-pfilling">
              <ellipse
                className="st22 target"
                cx="534.806"
                cy="976.158"
                rx="10.0437"
                ry="6.63376"
                transform="rotate(-90.9902 534.806 976.158)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                cx="579.376"
                cy="966.454"
                rx="8.41967"
                ry="7.78385"
                transform="rotate(-130.036 579.376 966.454)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                cx="579.223"
                cy="986.499"
                rx="8.72166"
                ry="7.94529"
                transform="rotate(-3.74907 579.223 986.499)"
                style={{ fill: '#e80808' }}
              ></ellipse>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth84Diagnozis.implant || tooth84Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="558.5" cy="979.5" r="26.5"></circle>
            <g className="st27">
              <mask id="implant_84" className="st49">
                <path
                  className="st50"
                  d="M544.905 963.474L541.458 962.352C538.529 965.3 536.349 968.994 535.231 973.124L537.928 975.55C537.686 976.829 537.56 978.15 537.56 979.5C537.56 980.85 537.686 982.17 537.928 983.45L535.231 985.875C536.349 990.006 538.529 993.7 541.458 996.648L544.905 995.525C546.895 997.242 549.209 998.594 551.743 999.478L552.494 1003.02C554.479 1003.55 556.564 1003.83 558.714 1003.83C560.864 1003.83 562.95 1003.55 564.936 1003.02L565.687 999.477C568.22 998.593 570.533 997.241 572.523 995.525L575.97 996.647C578.899 993.699 581.079 990.004 582.197 985.874L579.5 983.448C579.741 982.169 579.868 980.849 579.868 979.5C579.868 978.15 579.741 976.831 579.5 975.552L582.197 973.126C581.079 968.995 578.899 965.301 575.97 962.352L572.523 963.475C570.533 961.758 568.22 960.406 565.687 959.522L564.936 955.976C562.95 955.452 560.864 955.173 558.714 955.173C556.564 955.173 554.479 955.452 552.494 955.975L551.743 959.521C549.209 960.405 546.895 961.758 544.905 963.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M544.905 963.474L541.458 962.352C538.529 965.3 536.349 968.994 535.231 973.124L537.928 975.55C537.686 976.829 537.56 978.15 537.56 979.5C537.56 980.85 537.686 982.17 537.928 983.45L535.231 985.875C536.349 990.006 538.529 993.7 541.458 996.648L544.905 995.525C546.895 997.242 549.209 998.594 551.743 999.478L552.494 1003.02C554.479 1003.55 556.564 1003.83 558.714 1003.83C560.864 1003.83 562.95 1003.55 564.936 1003.02L565.687 999.477C568.22 998.593 570.533 997.241 572.523 995.525L575.97 996.647C578.899 993.699 581.079 990.004 582.197 985.874L579.5 983.448C579.741 982.169 579.868 980.849 579.868 979.5C579.868 978.15 579.741 976.831 579.5 975.552L582.197 973.126C581.079 968.995 578.899 965.301 575.97 962.352L572.523 963.475C570.533 961.758 568.22 960.406 565.687 959.522L564.936 955.976C562.95 955.452 560.864 955.173 558.714 955.173C556.564 955.173 554.479 955.452 552.494 955.975L551.743 959.521C549.209 960.405 546.895 961.758 544.905 963.474Z"
              ></path>
              <path
                className="st52"
                d="M541.458 962.352L542.078 960.45L540.907 960.069L540.04 960.942L541.458 962.352ZM544.905 963.474L544.286 965.376L545.357 965.725L546.211 964.989L544.905 963.474ZM535.231 973.124L533.3 972.601L532.979 973.789L533.893 974.611L535.231 973.124ZM537.928 975.55L539.893 975.921L540.102 974.815L539.265 974.063L537.928 975.55ZM537.928 983.45L539.265 984.937L540.102 984.184L539.893 983.079L537.928 983.45ZM535.231 985.875L533.893 984.388L532.979 985.211L533.3 986.398L535.231 985.875ZM541.458 996.648L540.04 998.057L540.907 998.93L542.078 998.549L541.458 996.648ZM544.905 995.525L546.211 994.011L545.358 993.275L544.286 993.624L544.905 995.525ZM551.743 999.478L553.699 999.063L553.465 997.961L552.401 997.59L551.743 999.478ZM552.494 1003.02L550.537 1003.44L550.793 1004.64L551.984 1004.96L552.494 1003.02ZM564.936 1003.02L565.446 1004.96L566.637 1004.64L566.892 1003.44L564.936 1003.02ZM565.687 999.477L565.028 997.589L563.964 997.96L563.731 999.063L565.687 999.477ZM572.523 995.525L573.142 993.623L572.07 993.274L571.217 994.01L572.523 995.525ZM575.97 996.647L575.35 998.549L576.521 998.93L577.388 998.057L575.97 996.647ZM582.197 985.874L584.128 986.396L584.449 985.209L583.534 984.386L582.197 985.874ZM579.5 983.448L577.534 983.077L577.326 984.183L578.162 984.935L579.5 983.448ZM579.5 975.552L578.162 974.064L577.326 974.817L577.534 975.923L579.5 975.552ZM582.197 973.126L583.534 974.613L584.449 973.791L584.128 972.603L582.197 973.126ZM575.97 962.352L577.388 960.943L576.521 960.07L575.35 960.451L575.97 962.352ZM572.523 963.475L571.217 964.989L572.071 965.726L573.142 965.376L572.523 963.475ZM565.687 959.522L563.731 959.937L563.964 961.039L565.028 961.411L565.687 959.522ZM564.936 955.976L566.892 955.561L566.637 954.356L565.446 954.042L564.936 955.976ZM552.494 955.975L551.984 954.041L550.793 954.355L550.537 955.561L552.494 955.975ZM551.743 959.521L552.401 961.41L553.465 961.039L553.699 959.936L551.743 959.521ZM540.839 964.254L544.286 965.376L545.524 961.573L542.078 960.45L540.839 964.254ZM537.161 973.647C538.187 969.86 540.186 966.469 542.877 963.762L540.04 960.942C536.871 964.13 534.512 968.128 533.3 972.601L537.161 973.647ZM539.265 974.063L536.568 971.637L533.893 974.611L536.591 977.037L539.265 974.063ZM539.56 979.5C539.56 978.275 539.675 977.079 539.893 975.921L535.963 975.179C535.698 976.58 535.56 978.025 535.56 979.5H539.56ZM539.893 983.079C539.675 981.921 539.56 980.725 539.56 979.5H535.56C535.56 980.975 535.698 982.42 535.963 983.821L539.893 983.079ZM536.568 987.362L539.265 984.937L536.591 981.963L533.893 984.388L536.568 987.362ZM542.877 995.238C540.186 992.53 538.187 989.14 537.161 985.352L533.3 986.398C534.512 990.872 536.871 994.869 540.04 998.057L542.877 995.238ZM544.286 993.624L540.839 994.746L542.078 998.549L545.524 997.427L544.286 993.624ZM552.401 997.59C550.11 996.79 548.015 995.566 546.211 994.011L543.599 997.04C545.776 998.918 548.309 1000.4 551.084 1001.37L552.401 997.59ZM554.45 1002.61L553.699 999.063L549.786 999.893L550.537 1003.44L554.45 1002.61ZM558.714 1001.83C556.738 1001.83 554.824 1001.57 553.004 1001.09L551.984 1004.96C554.134 1005.53 556.39 1005.83 558.714 1005.83V1001.83ZM564.426 1001.09C562.605 1001.57 560.691 1001.83 558.714 1001.83V1005.83C561.038 1005.83 563.295 1005.52 565.446 1004.96L564.426 1001.09ZM563.731 999.063L562.979 1002.61L566.892 1003.44L567.644 999.892L563.731 999.063ZM571.217 994.01C569.414 995.565 567.319 996.789 565.028 997.589L566.346 1001.37C569.121 1000.4 571.652 998.917 573.829 997.039L571.217 994.01ZM576.589 994.745L573.142 993.623L571.904 997.426L575.35 998.549L576.589 994.745ZM580.267 985.351C579.241 989.139 577.242 992.53 574.551 995.237L577.388 998.057C580.557 994.868 582.916 990.87 584.128 986.396L580.267 985.351ZM578.162 984.935L580.86 987.361L583.534 984.386L580.837 981.961L578.162 984.935ZM577.868 979.5C577.868 980.724 577.753 981.92 577.534 983.077L581.465 983.819C581.729 982.418 581.868 980.974 581.868 979.5H577.868ZM577.534 975.923C577.753 977.08 577.868 978.276 577.868 979.5H581.868C581.868 978.025 581.729 976.581 581.465 975.18L577.534 975.923ZM580.86 971.639L578.162 974.064L580.837 977.039L583.534 974.613L580.86 971.639ZM574.551 963.762C577.242 966.47 579.241 969.861 580.267 973.649L584.128 972.603C582.916 968.129 580.557 964.131 577.388 960.943L574.551 963.762ZM573.142 965.376L576.589 964.254L575.35 960.451L571.904 961.573L573.142 965.376ZM565.028 961.411C567.319 962.21 569.414 963.434 571.217 964.989L573.829 961.96C571.653 960.083 569.121 958.602 566.346 957.634L565.028 961.411ZM562.979 956.39L563.731 959.937L567.644 959.108L566.892 955.561L562.979 956.39ZM558.714 957.173C560.691 957.173 562.605 957.429 564.426 957.91L565.446 954.042C563.295 953.475 561.038 953.173 558.714 953.173V957.173ZM553.004 957.909C554.824 957.429 556.738 957.173 558.714 957.173V953.173C556.39 953.173 554.134 953.474 551.984 954.041L553.004 957.909ZM553.699 959.936L554.45 956.39L550.537 955.561L549.786 959.107L553.699 959.936ZM546.211 964.989C548.015 963.433 550.11 962.209 552.401 961.41L551.084 957.633C548.309 958.601 545.776 960.082 543.599 961.96L546.211 964.989Z"
                mask="url(#implant_84)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle className="st44" cx="558.5" cy="979.5" r="28.5"></circle>
            <path
              className="st45"
              d="M556.577 970.739C557.129 968.804 559.871 968.804 560.423 970.739L560.929 972.511C561.225 973.549 562.291 974.164 563.338 973.902L565.126 973.454C567.077 972.965 568.448 975.339 567.049 976.785L565.767 978.109C565.016 978.884 565.016 980.116 565.767 980.891L567.049 982.215C568.448 983.661 567.077 986.035 565.126 985.546L563.338 985.098C562.291 984.836 561.225 985.451 560.929 986.489L560.423 988.261C559.871 990.196 557.129 990.196 556.577 988.261L556.071 986.489C555.775 985.451 554.709 984.836 553.662 985.098L551.874 985.546C549.923 986.035 548.552 983.661 549.951 982.215L551.233 980.891C551.984 980.116 551.984 978.884 551.233 978.109L549.951 976.785C548.552 975.339 549.923 972.965 551.874 973.454L553.662 973.902C554.709 974.164 555.775 973.549 556.071 972.511L556.577 970.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth84Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth84Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M490.129 970.069L490.132 970.062L490.135 970.055C490.763 968.401 491.363 966.764 491.956 965.144C493.463 961.034 494.93 957.031 496.71 953.114L496.713 953.107L496.717 953.1C499.099 947.641 502.112 942.044 507.593 938.006L507.594 938.005C511.647 935.013 516.706 933.056 522.13 931.774L522.13 931.774L522.138 931.772C526.95 930.593 531.979 930.098 537.059 929.799C542.107 929.502 547.224 929.603 552.223 930.485C553.344 930.691 554.48 930.942 555.632 931.196C558.224 931.769 560.892 932.358 563.649 932.499L563.652 932.499C567.078 932.662 570.461 932.114 573.708 931.588C574.564 931.449 575.41 931.312 576.245 931.19L576.245 931.19L576.258 931.188C586.179 929.601 596.445 929.63 604.881 933.508C613.67 937.565 618.632 944.815 621.879 952.49L621.879 952.491C624.59 958.881 626.261 965.565 627.931 972.249L628.03 972.643C628.119 972.999 628.208 973.354 628.297 973.709C630.027 980.601 631.715 987.325 630.614 993.936C630.037 997.394 628.686 1000.79 626.916 1004.13L626.916 1004.13C625.058 1007.65 622.744 1010.92 619.305 1013.5C615.094 1016.56 609.8 1018.21 603.97 1018.4C601.874 1018.46 599.811 1018.34 597.712 1018.21C596.481 1018.14 595.237 1018.06 593.968 1018.03C590.615 1017.92 587.223 1018.09 584.029 1019.37L584.022 1019.37L584.015 1019.38C582.73 1019.91 581.594 1020.6 580.527 1021.3C580.19 1021.52 579.864 1021.74 579.543 1021.96C578.829 1022.43 578.138 1022.9 577.399 1023.34C573.201 1025.72 567.79 1026.7 562.367 1026.9C552.999 1027.2 543.715 1025.42 536.533 1020.95C534.897 1019.91 533.421 1018.76 531.914 1017.59C531.153 1017 530.384 1016.4 529.583 1015.81C527.238 1014.07 524.713 1012.45 521.614 1011.45C518.992 1010.56 516.185 1010.25 513.484 1009.99C513.291 1009.97 513.099 1009.96 512.908 1009.94C510.372 1009.69 507.941 1009.46 505.665 1008.84L505.656 1008.83C500.984 1007.59 497.13 1004.82 493.897 1001.68C489.961 997.846 486.93 993.525 486.084 988.921C484.999 982.954 487.354 977.04 489.774 970.963C489.893 970.665 490.011 970.368 490.129 970.069Z"
            ></path>
            <path
              className="st47"
              d="M509.121 972.549L509.123 972.542L509.126 972.535C509.585 971.313 510.022 970.106 510.455 968.912C511.549 965.895 512.611 962.965 513.901 960.095L513.904 960.088L513.907 960.081C515.635 956.077 517.804 952.016 521.73 949.09L521.731 949.089C524.638 946.92 528.278 945.492 532.2 944.555L532.2 944.555L532.208 944.553C535.682 943.693 539.319 943.329 543.007 943.11C546.663 942.893 550.36 942.967 553.966 943.61C554.761 943.758 555.575 943.94 556.406 944.126C558.301 944.549 560.282 944.99 562.31 945.096L562.314 945.096C564.837 945.217 567.336 944.808 569.7 944.42C570.318 944.319 570.927 944.219 571.525 944.13L571.538 944.128C578.73 942.965 586.128 942.995 592.188 945.812C598.494 948.755 602.066 954.017 604.414 959.629L604.414 959.63C606.377 964.309 607.588 969.207 608.804 974.128L608.874 974.409C608.937 974.665 609.001 974.921 609.064 975.176C610.326 980.259 611.541 985.155 610.749 989.962C610.335 992.468 609.366 994.937 608.086 997.381L608.086 997.382C606.745 999.95 605.086 1002.31 602.629 1004.18C599.618 1006.39 595.824 1007.59 591.633 1007.73C590.12 1007.77 588.646 1007.68 587.131 1007.59C586.233 1007.54 585.322 1007.48 584.38 1007.45C581.93 1007.38 579.416 1007.5 577.039 1008.46L577.032 1008.46L577.026 1008.47C576.067 1008.87 575.224 1009.39 574.444 1009.91C574.193 1010.07 573.954 1010.23 573.719 1010.39C573.203 1010.74 572.712 1011.08 572.182 1011.39C569.185 1013.11 565.304 1013.83 561.383 1013.98C554.609 1014.19 547.919 1012.89 542.758 1009.65C541.578 1008.88 540.523 1008.06 539.434 1007.2C538.878 1006.76 538.314 1006.32 537.72 1005.88C536.007 1004.59 534.143 1003.38 531.848 1002.63C529.907 1001.97 527.836 1001.74 525.875 1001.55C525.737 1001.53 525.599 1001.52 525.462 1001.51C523.612 1001.33 521.868 1001.16 520.237 1000.7L520.237 1000.7L520.229 1000.7C516.895 999.808 514.132 997.802 511.799 995.514C508.955 992.709 506.794 989.579 506.192 986.27C505.417 981.958 507.104 977.673 508.872 973.182C508.955 972.972 509.038 972.761 509.121 972.549Z"
            ></path>
            <circle className="st45" cx="559" cy="979" r="13"></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth84Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M490.13 970.068L490.132 970.061L490.135 970.054C490.763 968.4 491.363 966.763 491.957 965.143C493.463 961.033 494.93 957.03 496.71 953.113L496.714 953.106L496.717 953.099C499.099 947.64 502.112 942.043 507.593 938.005L507.594 938.004C511.647 935.012 516.706 933.055 522.13 931.773L522.13 931.773L522.138 931.771C526.95 930.592 531.979 930.097 537.059 929.798C542.108 929.501 547.224 929.602 552.223 930.484C553.344 930.69 554.48 930.941 555.632 931.195C558.224 931.768 560.893 932.357 563.649 932.498L563.653 932.498C567.078 932.661 570.461 932.113 573.708 931.587C574.564 931.448 575.41 931.311 576.245 931.189L576.245 931.189L576.258 931.187C586.179 929.6 596.445 929.629 604.881 933.507C613.67 937.564 618.632 944.814 621.879 952.489L621.88 952.49C624.59 958.88 626.261 965.564 627.931 972.248L628.03 972.642C628.119 972.998 628.208 973.353 628.297 973.708C630.028 980.6 631.716 987.324 630.614 993.935C630.037 997.393 628.686 1000.79 626.916 1004.13L626.916 1004.13C625.058 1007.65 622.744 1010.91 619.306 1013.5C615.094 1016.56 609.8 1018.21 603.97 1018.4C601.874 1018.46 599.811 1018.34 597.712 1018.21C596.481 1018.14 595.237 1018.06 593.968 1018.02C590.615 1017.92 587.223 1018.09 584.029 1019.37L584.022 1019.37L584.016 1019.38C582.73 1019.91 581.594 1020.6 580.527 1021.3C580.19 1021.52 579.864 1021.74 579.543 1021.95C578.829 1022.43 578.138 1022.9 577.399 1023.33C573.201 1025.72 567.79 1026.7 562.367 1026.9C552.999 1027.2 543.715 1025.42 536.533 1020.95C534.897 1019.91 533.421 1018.76 531.915 1017.59C531.153 1017 530.384 1016.4 529.583 1015.81C527.238 1014.07 524.713 1012.45 521.614 1011.45C518.992 1010.56 516.185 1010.25 513.484 1009.99C513.291 1009.97 513.099 1009.95 512.908 1009.94C510.372 1009.69 507.941 1009.46 505.665 1008.84L505.657 1008.83C500.984 1007.59 497.13 1004.82 493.897 1001.68C489.961 997.845 486.93 993.524 486.084 988.92C484.999 982.953 487.355 977.039 489.774 970.962C489.893 970.664 490.011 970.367 490.13 970.068Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st56 hIntact"
              d="M509.121 972.549L509.123 972.542L509.126 972.535C509.585 971.313 510.022 970.106 510.455 968.912C511.549 965.895 512.611 962.965 513.901 960.095L513.904 960.088L513.907 960.081C515.635 956.077 517.804 952.016 521.73 949.09L521.731 949.089C524.638 946.92 528.278 945.492 532.2 944.555L532.2 944.555L532.208 944.553C535.682 943.693 539.319 943.329 543.007 943.11C546.663 942.893 550.36 942.967 553.966 943.61C554.761 943.758 555.575 943.94 556.406 944.126C558.301 944.549 560.282 944.99 562.31 945.096L562.314 945.096C564.837 945.217 567.336 944.808 569.7 944.42C570.318 944.319 570.927 944.219 571.525 944.13L571.538 944.128C578.73 942.965 586.128 942.995 592.188 945.812C598.494 948.755 602.066 954.017 604.414 959.629L604.414 959.63C606.377 964.309 607.588 969.207 608.804 974.128L608.874 974.409C608.937 974.665 609.001 974.921 609.064 975.176C610.326 980.259 611.541 985.155 610.749 989.962C610.335 992.468 609.366 994.937 608.086 997.381L608.086 997.382C606.745 999.95 605.086 1002.31 602.629 1004.18C599.618 1006.39 595.824 1007.59 591.633 1007.73C590.12 1007.77 588.646 1007.68 587.131 1007.59C586.233 1007.54 585.322 1007.48 584.38 1007.45C581.93 1007.38 579.416 1007.5 577.039 1008.46L577.032 1008.46L577.026 1008.47C576.067 1008.87 575.224 1009.39 574.444 1009.91C574.193 1010.07 573.954 1010.23 573.719 1010.39C573.203 1010.74 572.712 1011.08 572.182 1011.39C569.185 1013.11 565.304 1013.83 561.383 1013.98C554.609 1014.19 547.919 1012.89 542.758 1009.65C541.578 1008.88 540.523 1008.06 539.434 1007.2C538.878 1006.76 538.314 1006.32 537.72 1005.88C536.007 1004.59 534.143 1003.38 531.848 1002.63C529.907 1001.97 527.836 1001.74 525.875 1001.55C525.737 1001.53 525.599 1001.52 525.462 1001.51C523.612 1001.33 521.868 1001.16 520.237 1000.7L520.237 1000.7L520.229 1000.7C516.895 999.808 514.132 997.802 511.799 995.514C508.955 992.709 506.794 989.579 506.192 986.27C505.417 981.958 507.104 977.673 508.872 973.182C508.955 972.972 509.038 972.761 509.121 972.549Z"
              style={{ visibility: 'inherit' }}
            />
            <circle
              className="st57"
              cx="559"
              cy="979"
              r="12.25"
              style={{ fill: 'black', opacity: tooth84Diagnozis.pin ? 1 : 0 }}
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth84Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth84Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M490.129 970.069L490.132 970.062L490.135 970.055C490.763 968.401 491.363 966.764 491.956 965.144C493.463 961.034 494.93 957.031 496.71 953.114L496.713 953.107L496.717 953.1C499.099 947.641 502.112 942.044 507.593 938.006L507.594 938.005C511.647 935.013 516.706 933.056 522.13 931.774L522.13 931.774L522.138 931.772C526.95 930.593 531.979 930.098 537.059 929.799C542.107 929.502 547.224 929.603 552.223 930.485C553.344 930.691 554.48 930.942 555.632 931.196C558.224 931.769 560.892 932.358 563.649 932.499L563.652 932.499C567.078 932.662 570.461 932.114 573.708 931.588C574.564 931.449 575.41 931.312 576.245 931.19L576.245 931.19L576.258 931.188C586.179 929.601 596.445 929.63 604.881 933.508C613.67 937.565 618.632 944.815 621.879 952.49L621.879 952.491C624.59 958.881 626.261 965.565 627.931 972.249L628.03 972.643C628.119 972.999 628.208 973.354 628.297 973.709C630.027 980.601 631.715 987.325 630.614 993.936C630.037 997.394 628.686 1000.79 626.916 1004.13L626.916 1004.13C625.058 1007.65 622.744 1010.92 619.305 1013.5C615.094 1016.56 609.8 1018.21 603.97 1018.4C601.874 1018.46 599.811 1018.34 597.712 1018.21C596.481 1018.14 595.237 1018.06 593.968 1018.03C590.615 1017.92 587.223 1018.09 584.029 1019.37L584.022 1019.37L584.015 1019.38C582.73 1019.91 581.594 1020.6 580.527 1021.3C580.19 1021.52 579.864 1021.74 579.543 1021.96C578.829 1022.43 578.138 1022.9 577.399 1023.34C573.201 1025.72 567.79 1026.7 562.367 1026.9C552.999 1027.2 543.715 1025.42 536.533 1020.95C534.897 1019.91 533.421 1018.76 531.914 1017.59C531.153 1017 530.384 1016.4 529.583 1015.81C527.238 1014.07 524.713 1012.45 521.614 1011.45C518.992 1010.56 516.185 1010.25 513.484 1009.99C513.291 1009.97 513.099 1009.96 512.908 1009.94C510.372 1009.69 507.941 1009.46 505.665 1008.84L505.656 1008.83C500.984 1007.59 497.13 1004.82 493.897 1001.68C489.961 997.846 486.93 993.525 486.084 988.921C484.999 982.954 487.354 977.04 489.774 970.963C489.893 970.665 490.011 970.368 490.129 970.069Z"
            ></path>
            <path
              className="st47"
              d="M509.121 972.549L509.123 972.542L509.126 972.535C509.585 971.313 510.022 970.106 510.455 968.912C511.549 965.895 512.611 962.965 513.901 960.095L513.904 960.088L513.907 960.081C515.635 956.077 517.804 952.016 521.73 949.09L521.731 949.089C524.638 946.92 528.278 945.492 532.2 944.555L532.2 944.555L532.208 944.553C535.682 943.693 539.319 943.329 543.007 943.11C546.663 942.893 550.36 942.967 553.966 943.61C554.761 943.758 555.575 943.94 556.406 944.126C558.301 944.549 560.282 944.99 562.31 945.096L562.314 945.096C564.837 945.217 567.336 944.808 569.7 944.42C570.318 944.319 570.927 944.219 571.525 944.13L571.538 944.128C578.73 942.965 586.128 942.995 592.188 945.812C598.494 948.755 602.066 954.017 604.414 959.629L604.414 959.63C606.377 964.309 607.588 969.207 608.804 974.128L608.874 974.409C608.937 974.665 609.001 974.921 609.064 975.176C610.326 980.259 611.541 985.155 610.749 989.962C610.335 992.468 609.366 994.937 608.086 997.381L608.086 997.382C606.745 999.95 605.086 1002.31 602.629 1004.18C599.618 1006.39 595.824 1007.59 591.633 1007.73C590.12 1007.77 588.646 1007.68 587.131 1007.59C586.233 1007.54 585.322 1007.48 584.38 1007.45C581.93 1007.38 579.416 1007.5 577.039 1008.46L577.032 1008.46L577.026 1008.47C576.067 1008.87 575.224 1009.39 574.444 1009.91C574.193 1010.07 573.954 1010.23 573.719 1010.39C573.203 1010.74 572.712 1011.08 572.182 1011.39C569.185 1013.11 565.304 1013.83 561.383 1013.98C554.609 1014.19 547.919 1012.89 542.758 1009.65C541.578 1008.88 540.523 1008.06 539.434 1007.2C538.878 1006.76 538.314 1006.32 537.72 1005.88C536.007 1004.59 534.143 1003.38 531.848 1002.63C529.907 1001.97 527.836 1001.74 525.875 1001.55C525.737 1001.53 525.599 1001.52 525.462 1001.51C523.612 1001.33 521.868 1001.16 520.237 1000.7L520.237 1000.7L520.229 1000.7C516.895 999.808 514.132 997.802 511.799 995.514C508.955 992.709 506.794 989.579 506.192 986.27C505.417 981.958 507.104 977.673 508.872 973.182C508.955 972.972 509.038 972.761 509.121 972.549Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth84Diagnozis.culttab &&
                !tooth84Diagnozis.abutment &&
                !tooth84Diagnozis.implant &&
                !tooth84Diagnozis.apex &&
                !tooth84Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M635.9,971.6c-1.8-9.5-3.5-19.1-6.5-28.3c-1.9-5.8-4.3-11.4-7.6-16.3
                            c-2.9-4.3-6.6-8-11.2-10.8c-9.4-5.5-20.9-5.4-31.8-3.1c-4.5,0.9-8.9,2.2-13.5,2c-4.2-0.2-8.2-1.8-12.3-2.7
                            c-5.5-1.2-11.2-1.2-16.8-0.8c-5.6,0.4-11.1,1.3-16.5,2.9c-6,1.9-11.7,4.8-16.3,9.1c-2.8,2.6-5,5.7-6.8,9c-2.3,4.1-4,8.5-5.5,12.8
                            c-2.7,7.8-4.9,15.8-7.4,23.9c-2.8,8.9-5.9,17.9-4.6,27.2c1,6.9,4.3,13.1,8.6,18.5c1,1.2,2,2.4,3.1,3.5c2.9,3,6.2,5.4,10.1,6.7
                            c5.6,1.9,11.8,1.2,17.3,3.4c6.4,2.6,10.5,8.6,15.9,12.9c8,6.4,18.4,8.8,28.6,8.2c6-0.3,12.1-1.8,17-5.3c2.4-1.8,4.5-4,7.2-5.5
                            c6.5-3.5,14-1.1,21.3-1.4c6.5-0.3,12.6-2.7,17.4-7.3c0.9-0.8,1.7-1.7,2.5-2.7c2.7-3.3,4.6-7.1,6.3-11c2-4.8,3.5-9.7,4.2-14.8
                            C639.9,991.7,637.9,981.6,635.9,971.6z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth84.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M478.126 1000.46C479.106 1007.64 480.48 1012.17 484.832 1017.88C488.423 1022.56 495.935 1028.07 501.266 1029.98C506.814 1032.03 513.071 1032.56 518.511 1035.05C524.93 1037.83 524.958 1041.33 530.398 1046.02C534.076 1049.09 543.39 1052.32 547.804 1053.78C553.052 1055.52 558.666 1055.19 564.28 1054.95C570.264 1054.66 579.357 1053.19 584.144 1049.53C586.538 1047.63 589.765 1044.81 592.376 1043.35C598.904 1039.84 602.251 1043.8 609.54 1043.5C616.068 1043.21 626.052 1035.72 630.839 1031.04C634.756 1027.08 636.42 1022.11 638.487 1016.84C640.446 1011.86 639.969 1006.73 640.622 1001.46C641.313 995.88 640.975 990.257 640.263 984.635C639.631 979.642 638.714 974.651 637.793 969.692C636.803 964.362 638.76 958.991 637.586 953.667C636.567 949.046 634.463 944.461 633.048 939.971C631.282 934.354 629.989 928.844 626.991 923.963C623.894 918.919 615.986 913.546 610.955 910.421C605.952 907.326 600.402 905.602 594.674 905.26C589.565 904.955 584.315 905.539 579.186 906.643C574.725 907.522 570.264 910.103 565.695 909.81C561.452 909.518 557.535 906.643 553.401 905.618C547.852 904.301 542.194 905.418 536.646 905.857C531.097 906.297 524.495 904.501 519.164 906.258C513.18 908.161 506.469 913.617 501.9 918.156C499.075 920.957 495.943 924.244 494.097 927.755C491.89 931.951 490.189 936.465 488.768 940.849C487.763 943.948 486.892 947.091 485.992 950.268C484.554 955.347 485.126 959.251 483.587 964.475C482.246 969.023 479.825 973.906 478.886 978.579C477.921 983.383 477.465 995.564 478.126 1000.46ZM484.816 989.097C483.616 982.497 486.416 975.997 488.916 969.697C491.216 963.897 493.116 958.197 495.516 952.697C497.916 947.197 501.016 941.397 506.716 937.197C510.916 934.097 516.116 932.097 521.616 930.797C526.516 929.597 531.616 929.097 536.716 928.797C541.816 928.497 547.016 928.597 552.116 929.497C555.916 930.197 559.516 931.297 563.416 931.497C567.616 931.697 571.716 930.797 575.816 930.197C585.816 928.597 596.316 928.597 605.016 932.597C614.116 936.797 619.216 944.297 622.516 952.097C625.257 958.559 626.944 965.31 628.61 971.973L628.716 972.397C630.516 979.597 632.516 986.897 631.316 994.097C630.716 997.697 629.316 1001.2 627.516 1004.6C625.616 1008.2 623.216 1011.6 619.616 1014.3C615.216 1017.5 609.716 1019.2 603.716 1019.4C597.016 1019.6 590.116 1017.9 584.116 1020.3C581.716 1021.3 579.816 1022.9 577.616 1024.2C573.216 1026.7 567.616 1027.7 562.116 1027.9C552.616 1028.2 543.116 1026.4 535.716 1021.8C530.716 1018.6 526.916 1014.3 521.016 1012.4C516.016 1010.7 510.216 1011.2 505.116 1009.8C500.216 1008.5 496.216 1005.6 492.916 1002.4C488.916 998.497 485.716 993.997 484.816 989.097Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M478.126 1000.46C479.106 1007.64 480.48 1012.17 484.832 1017.88C488.423 1022.56 495.935 1028.07 501.266 1029.98C506.814 1032.03 513.071 1032.56 518.511 1035.05C524.93 1037.83 524.958 1041.33 530.398 1046.02C534.076 1049.09 543.39 1052.32 547.804 1053.78C553.052 1055.52 558.666 1055.19 564.28 1054.95C570.264 1054.66 579.357 1053.19 584.144 1049.53C586.538 1047.63 589.765 1044.81 592.376 1043.35C598.904 1039.84 602.251 1043.8 609.54 1043.5C616.068 1043.21 626.052 1035.72 630.839 1031.04C634.756 1027.08 636.42 1022.11 638.487 1016.84C640.446 1011.86 639.969 1006.73 640.622 1001.46C641.313 995.88 640.975 990.257 640.263 984.635C639.631 979.642 638.714 974.651 637.793 969.692C636.803 964.362 638.76 958.991 637.586 953.667C636.567 949.046 634.463 944.461 633.048 939.971C631.282 934.354 629.989 928.844 626.991 923.963C623.894 918.919 615.986 913.546 610.955 910.421C605.952 907.326 600.402 905.602 594.674 905.26C589.565 904.955 584.315 905.539 579.186 906.643C574.725 907.522 570.264 910.103 565.695 909.81C561.452 909.518 557.535 906.643 553.401 905.618C547.852 904.301 542.194 905.418 536.646 905.857C531.097 906.297 524.495 904.501 519.164 906.258C513.18 908.161 506.469 913.617 501.9 918.156C499.075 920.957 495.943 924.244 494.097 927.755C491.89 931.951 490.189 936.465 488.768 940.849C487.763 943.948 486.892 947.091 485.992 950.268C484.554 955.347 485.126 959.251 483.587 964.475C482.246 969.023 479.825 973.906 478.886 978.579C477.921 983.383 477.465 995.564 478.126 1000.46ZM484.816 989.097C483.616 982.497 486.416 975.997 488.916 969.697C491.216 963.897 493.116 958.197 495.516 952.697C497.916 947.197 501.016 941.397 506.716 937.197C510.916 934.097 516.116 932.097 521.616 930.797C526.516 929.597 531.616 929.097 536.716 928.797C541.816 928.497 547.016 928.597 552.116 929.497C555.916 930.197 559.516 931.297 563.416 931.497C567.616 931.697 571.716 930.797 575.816 930.197C585.816 928.597 596.316 928.597 605.016 932.597C614.116 936.797 619.216 944.297 622.516 952.097C625.257 958.559 626.944 965.31 628.61 971.973L628.716 972.397C630.516 979.597 632.516 986.897 631.316 994.097C630.716 997.697 629.316 1001.2 627.516 1004.6C625.616 1008.2 623.216 1011.6 619.616 1014.3C615.216 1017.5 609.716 1019.2 603.716 1019.4C597.016 1019.6 590.116 1017.9 584.116 1020.3C581.716 1021.3 579.816 1022.9 577.616 1024.2C573.216 1026.7 567.616 1027.7 562.116 1027.9C552.616 1028.2 543.116 1026.4 535.716 1021.8C530.716 1018.6 526.916 1014.3 521.016 1012.4C516.016 1010.7 510.216 1011.2 505.116 1009.8C500.216 1008.5 496.216 1005.6 492.916 1002.4C488.916 998.497 485.716 993.997 484.816 989.097Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M482.11 996.019C483.04 1001.69 484.346 1002.91 488.477 1007.42C491.886 1011.13 499.018 1015.49 504.079 1017C509.348 1018.62 514.339 1019.04 519.503 1021.01C525.598 1023.21 527.523 1025.19 532.688 1028.89C536.18 1031.33 543.124 1033.09 547.314 1034.24C552.297 1035.62 557.627 1036.15 562.958 1035.96C568.639 1035.73 574.424 1034.57 578.969 1031.67C581.241 1030.17 586.204 1030.32 588.683 1029.16C594.881 1026.38 599.008 1026.35 605.929 1026.12C612.126 1025.88 617.808 1023.91 622.353 1020.21C626.071 1017.08 629.55 1013.14 631.513 1008.97C633.372 1005.03 634.818 1000.98 635.438 996.81C636.095 992.394 634.824 987.945 634.148 983.497C633.548 979.547 633.627 975.598 632.753 971.675C631.813 967.459 629.872 963.209 628.758 958.997C627.791 955.342 627.692 951.714 626.348 948.162C624.672 943.719 621.546 939.359 618.699 935.497C615.758 931.507 612.048 928.047 607.271 925.575C602.522 923.126 597.252 920.972 591.814 920.701C586.964 920.46 581.979 920.921 577.109 921.795C572.874 922.49 568.639 924.533 564.301 924.301C560.272 924.069 556.554 921.795 552.628 920.984C547.36 919.942 541.989 920.826 536.721 921.174C531.453 921.521 525.185 920.1 520.123 921.49C514.442 922.996 508.071 927.313 503.732 930.903C501.05 933.119 500.925 935.72 499.172 938.497C497.077 941.817 494.513 945.388 493.163 948.857C492.209 951.308 492.331 953.794 491.477 956.308C490.112 960.326 487.807 963.415 486.346 967.548C485.072 971.146 483.723 975.801 482.832 979.497C481.915 983.298 481.482 992.143 482.11 996.019ZM484.815 989.098C483.615 982.498 486.415 975.998 488.915 969.698C491.215 963.898 493.115 958.198 495.515 952.698C497.915 947.198 501.015 941.398 506.715 937.198C510.915 934.098 516.115 932.098 521.615 930.798C526.515 929.598 531.615 929.098 536.715 928.798C541.815 928.498 547.015 928.598 552.115 929.498C555.915 930.198 559.515 931.298 563.415 931.498C567.615 931.698 571.715 930.798 575.815 930.198C585.815 928.598 596.315 928.598 605.015 932.598C614.115 936.798 619.215 944.298 622.515 952.098C625.315 958.698 627.015 965.598 628.715 972.398C630.515 979.598 632.515 986.898 631.315 994.098C630.715 997.698 629.315 1001.2 627.515 1004.6C625.615 1008.2 623.215 1011.6 619.615 1014.3C615.215 1017.5 609.715 1019.2 603.715 1019.4C597.015 1019.6 590.115 1017.9 584.115 1020.3C581.715 1021.3 579.815 1022.9 577.615 1024.2C573.215 1026.7 567.615 1027.7 562.115 1027.9C552.615 1028.2 543.115 1026.4 535.715 1021.8C530.715 1018.6 526.915 1014.3 521.015 1012.4C516.015 1010.7 510.215 1011.2 505.115 1009.8C500.215 1008.5 496.215 1005.6 492.915 1002.4C488.915 998.498 485.715 993.998 484.815 989.098Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth84Diagnozis.culttab &&
                !tooth84Diagnozis.abutment &&
                !tooth84Diagnozis.implant &&
                !tooth84Diagnozis.shaper &&
                !tooth84Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M602.5,962.8c2.7,12,3.6,26.6,0,33.9c1.6,3.2,4.6,8.1,10.1,14.9c5.3,6.6,10.9,12.1,15.5,16
                                c2.7-3.3,4.6-7.1,6.3-11c2-4.8,3.5-9.7,4.2-14.8c1.4-10.1-0.7-20.2-2.6-30.2c-1.8-9.5-3.5-19.1-6.5-28.3
                                c-1.9-5.8-4.3-11.4-7.6-16.3c-3.6,4.8-8.1,10.5-11.5,14.7c-3.4,4.2-8.4,8.2-12.5,11.2C600,955.7,601.7,959,602.5,962.8z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth84.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth84.seal_right ? `seal-fill ${teethDiagnozis.tooth84.seal_right_color}` : ''}
                                `}
                d="M602.5,962.8c2.7,12,3.6,26.6,0,33.9c1.6,3.2,4.6,8.1,10.1,14.9c5.3,6.6,10.9,12.1,15.5,16
                                c2.7-3.3,4.6-7.1,6.3-11c2-4.8,3.5-9.7,4.2-14.8c1.4-10.1-0.7-20.2-2.6-30.2c-1.8-9.5-3.5-19.1-6.5-28.3
                                c-1.9-5.8-4.3-11.4-7.6-16.3c-3.6,4.8-8.1,10.5-11.5,14.7c-3.4,4.2-8.4,8.2-12.5,11.2C600,955.7,601.7,959,602.5,962.8z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_84_3"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M496.7,932.6c5.4,4.5,15.1,13.4,20.4,22.8c1.9-2.8,4.2-5.1,6.9-6.4c9-4.2,25-6.7,36-7.1c0,0,11.6-0.8,20,0
                                c5.8,0.5,13,4.5,17.8,10.9c4.1-3,9.1-7.1,12.5-11.2c3.4-4.2,7.8-9.9,11.5-14.7c-2.9-4.3-6.6-8-11.2-10.8
                                c-9.4-5.5-20.9-5.4-31.8-3.1c-4.5,0.9-8.9,2.2-13.5,2c-4.2-0.2-8.2-1.8-12.3-2.7c-5.5-1.2-11.2-1.2-16.8-0.8
                                c-5.6,0.4-11.1,1.3-16.5,2.9c-6,1.9-11.7,4.8-16.3,9.1C500.8,926.2,498.5,929.3,496.7,932.6z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth84.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth84.seal_top ? `seal-fill ${teethDiagnozis.tooth84.seal_top_color}` : ''}
                                `}
                d="M496.7,932.6c5.4,4.5,15.1,13.4,20.4,22.8c1.9-2.8,4.2-5.1,6.9-6.4c9-4.2,25-6.7,36-7.1c0,0,11.6-0.8,20,0
                                c5.8,0.5,13,4.5,17.8,10.9c4.1-3,9.1-7.1,12.5-11.2c3.4-4.2,7.8-9.9,11.5-14.7c-2.9-4.3-6.6-8-11.2-10.8
                                c-9.4-5.5-20.9-5.4-31.8-3.1c-4.5,0.9-8.9,2.2-13.5,2c-4.2-0.2-8.2-1.8-12.3-2.7c-5.5-1.2-11.2-1.2-16.8-0.8
                                c-5.6,0.4-11.1,1.3-16.5,2.9c-6,1.9-11.7,4.8-16.3,9.1C500.8,926.2,498.5,929.3,496.7,932.6z"
              />
            </g>
            <g
              id="s_header_84_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M479.1,996.5c1,6.9,4.3,13.1,8.6,18.5c1,1.2,2,2.4,3.1,3.5c3.3-1.8,8.2-4.9,13.9-9.9
                                c4.2-3.6,7.4-7.2,9.7-10.1c-4-7.5-4.9-15.1-4.6-21.2c0.3-5.8,2.7-15.2,7.2-21.8c-5.3-9.4-15-18.3-20.4-22.8
                                c-2.3,4.1-4,8.5-5.5,12.8c-2.7,7.8-4.9,15.8-7.4,23.9C481,978.2,477.8,987.2,479.1,996.5z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth84.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth84.seal_left ? `seal-fill ${teethDiagnozis.tooth84.seal_left_color}` : ''}
                                `}
                d="M479.1,996.5c1,6.9,4.3,13.1,8.6,18.5c1,1.2,2,2.4,3.1,3.5c3.3-1.8,8.2-4.9,13.9-9.9
                                c4.2-3.6,7.4-7.2,9.7-10.1c-4-7.5-4.9-15.1-4.6-21.2c0.3-5.8,2.7-15.2,7.2-21.8c-5.3-9.4-15-18.3-20.4-22.8
                                c-2.3,4.1-4,8.5-5.5,12.8c-2.7,7.8-4.9,15.8-7.4,23.9C481,978.2,477.8,987.2,479.1,996.5z"
              />
            </g>
            {/*КАРИЕС НИЗ*/}
            <g
              id="s_header_84_1"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M490.8,1018.5c2.9,3,6.2,5.4,10.1,6.7c5.6,1.9,11.8,1.2,17.3,3.4c6.4,2.6,10.5,8.6,15.9,12.9
                                c8,6.4,18.4,8.8,28.6,8.2c6-0.3,12.1-1.8,17-5.3c2.4-1.8,4.5-4,7.2-5.5c6.5-3.5,14-1.1,21.3-1.4c6.5-0.3,12.6-2.7,17.4-7.3
                                c0.9-0.8,1.7-1.7,2.5-2.7c-4.5-3.9-10.2-9.4-15.5-16c-5.5-6.8-8.5-11.7-10.1-14.9c0,0,0,0,0,0c-3.6,7.2-14.7,19.6-33.5,23.1
                                c-18.9,3.4-40.2-3.8-49-13.5c-2.3-2.5-4.1-5.2-5.5-7.8c-2.4,3-5.6,6.5-9.7,10.1C499,1013.5,494.1,1016.6,490.8,1018.5z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth84.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth84.seal_bottom ? `seal-fill ${teethDiagnozis.tooth84.seal_bottom_color}` : ''}
                                `}
                d="M490.8,1018.5c2.9,3,6.2,5.4,10.1,6.7c5.6,1.9,11.8,1.2,17.3,3.4c6.4,2.6,10.5,8.6,15.9,12.9
                                c8,6.4,18.4,8.8,28.6,8.2c6-0.3,12.1-1.8,17-5.3c2.4-1.8,4.5-4,7.2-5.5c6.5-3.5,14-1.1,21.3-1.4c6.5-0.3,12.6-2.7,17.4-7.3
                                c0.9-0.8,1.7-1.7,2.5-2.7c-4.5-3.9-10.2-9.4-15.5-16c-5.5-6.8-8.5-11.7-10.1-14.9c0,0,0,0,0,0c-3.6,7.2-14.7,19.6-33.5,23.1
                                c-18.9,3.4-40.2-3.8-49-13.5c-2.3-2.5-4.1-5.2-5.5-7.8c-2.4,3-5.6,6.5-9.7,10.1C499,1013.5,494.1,1016.6,490.8,1018.5z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_84_5"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M514.5,998.4c1.4,2.7,3.2,5.3,5.5,7.8c8.8,9.7,30.1,16.9,49,13.5c18.9-3.4,29.9-15.8,33.5-23.1c0,0,0,0,0,0
                                c3.6-7.3,2.6-21.9,0-33.9c-0.8-3.7-2.5-7.1-4.7-9.9c-4.8-6.3-12-10.3-17.8-10.9c-8.4-0.8-20,0-20,0c-11,0.4-27.1,2.9-36,7.1
                                c-2.7,1.3-5,3.5-6.9,6.4c-4.5,6.6-6.9,16-7.2,21.8C509.6,983.3,510.5,990.9,514.5,998.4z"
              />
              <path
                className={`
                                    st8 target caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth84.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth84.seal_center ? `seal-fill ${teethDiagnozis.tooth84.seal_center_color}` : ''}
                                `}
                d="M514.5,998.4c1.4,2.7,3.2,5.3,5.5,7.8c8.8,9.7,30.1,16.9,49,13.5c18.9-3.4,29.9-15.8,33.5-23.1c0,0,0,0,0,0
                                c3.6-7.3,2.6-21.9,0-33.9c-0.8-3.7-2.5-7.1-4.7-9.9c-4.8-6.3-12-10.3-17.8-10.9c-8.4-0.8-20,0-20,0c-11,0.4-27.1,2.9-36,7.1
                                c-2.7,1.3-5,3.5-6.9,6.4c-4.5,6.6-6.9,16-7.2,21.8C509.6,983.3,510.5,990.9,514.5,998.4z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_left &&
                      !tooth84Diagnozis.seal_bottom) ||
                    (!tooth84Diagnozis.seal_left &&
                      tooth84Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M514.5 999C512.5 1002 505.8 1009.6 495 1016"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_left &&
                      !tooth84Diagnozis.seal_center) ||
                    (!tooth84Diagnozis.seal_left &&
                      tooth84Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M514.5 999C509.833 993.833 503.8 977.9 517 955.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_left &&
                      !tooth84Diagnozis.seal_top) ||
                    (!tooth84Diagnozis.seal_left && tooth84Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M517 955.5C516 952.333 511.3 944 500.5 936"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_center &&
                      !tooth84Diagnozis.seal_top) ||
                    (!tooth84Diagnozis.seal_center && tooth84Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M517 955.5C525 945 586.8 939.3 598 952.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_right &&
                      !tooth84Diagnozis.seal_top) ||
                    (!tooth84Diagnozis.seal_right && tooth84Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M598 952.5C602 953 611.7 949.5 618.5 931.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth84Diagnozis.seal_right &&
                      tooth84Diagnozis.seal_center) ||
                    (tooth84Diagnozis.seal_right &&
                      !tooth84Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M598 953.5C604 959.5 607 983.1 603 997.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_right &&
                      !tooth84Diagnozis.seal_bottom) ||
                    (!tooth84Diagnozis.seal_right &&
                      tooth84Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M603 996.5C605.333 1002 612.9 1015.2 624.5 1024"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_center &&
                      !tooth84Diagnozis.seal_bottom) ||
                    (!tooth84Diagnozis.seal_center &&
                      tooth84Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M603 996.5C599 1009 548.5 1032.6 514.5 999"
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
                visibility: tooth84Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth84Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth84Diagnozis.vinir_color}`}
                d="M638.701 1001.8C638.001 1006.8 636.501 1011.8 634.501 1016.6C632.901 1020.5 630.901 1024.3 628.201 1027.6L625.801 1030.3C621.001 1034.9 614.901 1037.3 608.401 1037.6C601.101 1038 593.601 1035.6 587.101 1039C584.401 1040.4 582.401 1042.7 579.901 1044.5C575.101 1048.1 569.001 1049.5 562.901 1049.8C552.701 1050.4 542.301 1048 534.301 1041.6C528.901 1037.3 524.801 1031.3 518.401 1028.7C512.901 1026.5 506.701 1027.1 501.101 1025.3C497.201 1024 493.901 1021.5 491.001 1018.6C489.901 1017.5 488.901 1016.3 487.901 1015.1C483.601 1009.7 480.201 1003.5 479.301 996.6C478.389 990.475 479.43 984.52 481.012 978.652C484.302 978.94 490.833 980.464 490.638 984.258C490.078 987.532 489.89 990.848 490.394 994.223C491.17 1000.15 494.099 1005.48 497.803 1010.12C498.664 1011.15 499.526 1012.18 500.473 1013.12C502.971 1015.61 505.814 1017.76 509.174 1018.88C513.998 1020.42 519.339 1019.91 524.077 1021.8C529.59 1024.03 533.122 1029.19 537.774 1032.88C544.665 1038.38 553.624 1040.44 562.411 1039.92C567.666 1039.67 572.921 1038.46 577.056 1035.37C579.209 1033.82 580.932 1031.85 583.258 1030.65C588.857 1027.73 595.318 1029.79 601.607 1029.44C607.206 1029.19 612.461 1027.12 616.596 1023.17L618.663 1020.85C620.989 1018.02 622.712 1014.75 624.091 1011.4C625.813 1007.28 627.106 1002.99 627.709 998.69C628.12 995.733 628.18 992.777 628.017 989.823C628.75 986.482 635.287 985.382 638.463 985.25C639.186 990.755 639.467 996.278 638.701 1001.8Z"
              ></path>
              <path
                className={`vinir-fill ${tooth84Diagnozis.vinir_color}`}
                d="M628.201 1027.6C630.901 1024.3 632.901 1020.5 634.501 1016.6C636.501 1011.8 638.001 1006.8 638.701 1001.8C639.467 996.278 639.186 990.755 638.463 985.25C635.287 985.382 628.75 986.482 628.017 989.823C628.18 992.777 628.12 995.733 627.709 998.69C627.106 1002.99 625.813 1007.28 624.091 1011.4C622.712 1014.75 620.989 1018.02 618.663 1020.85M628.201 1027.6C627.401 1028.5 626.601 1029.4 625.801 1030.3M628.201 1027.6L625.801 1030.3M625.801 1030.3C621.001 1034.9 614.901 1037.3 608.401 1037.6C601.101 1038 593.601 1035.6 587.101 1039C584.401 1040.4 582.401 1042.7 579.901 1044.5C575.101 1048.1 569.001 1049.5 562.901 1049.8C552.701 1050.4 542.301 1048 534.301 1041.6C528.901 1037.3 524.801 1031.3 518.401 1028.7C512.901 1026.5 506.701 1027.1 501.101 1025.3C497.201 1024 493.901 1021.5 491.001 1018.6C489.901 1017.5 488.901 1016.3 487.901 1015.1C483.601 1009.7 480.201 1003.5 479.301 996.6C478.389 990.475 479.43 984.52 481.012 978.652C484.302 978.94 490.833 980.464 490.638 984.258C490.078 987.532 489.89 990.848 490.394 994.223C491.17 1000.15 494.099 1005.48 497.803 1010.12C498.664 1011.15 499.526 1012.18 500.473 1013.12C502.971 1015.61 505.814 1017.76 509.174 1018.88C513.998 1020.42 519.339 1019.91 524.077 1021.8C529.59 1024.03 533.122 1029.19 537.774 1032.88C544.665 1038.38 553.624 1040.44 562.411 1039.92C567.666 1039.67 572.921 1038.46 577.056 1035.37C579.209 1033.82 580.932 1031.85 583.258 1030.65C588.857 1027.73 595.318 1029.79 601.607 1029.44C607.206 1029.19 612.461 1027.12 616.596 1023.17M618.663 1020.85C617.974 1021.63 617.285 1022.4 616.596 1023.17M618.663 1020.85L616.596 1023.17"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth84Diagnozis.temporary_crown ||
                tooth84Diagnozis.ceramic_crown ||
                tooth84Diagnozis.mceramic_crown ||
                tooth84Diagnozis.metalic_crown ||
                tooth84Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth84Diagnozis.temporary_crown ||
                tooth84Diagnozis.ceramic_crown ||
                tooth84Diagnozis.mceramic_crown ||
                tooth84Diagnozis.metalic_crown ||
                tooth84Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth84Diagnozis.ceramic_crown_color}
                                ${tooth84Diagnozis.mceramic_crown_color}
                                ${tooth84Diagnozis.metalic_crown_color}
                                ${tooth84Diagnozis.zirconia_crown_color}
                            `}
              d="M635.9,971.6c-1.8-9.5-3.5-19.1-6.5-28.3c-1.9-5.8-4.3-11.4-7.6-16.3
                            c-2.9-4.3-6.6-8-11.2-10.8c-9.4-5.5-20.9-5.4-31.8-3.1c-4.5,0.9-8.9,2.2-13.5,2c-4.2-0.2-8.2-1.8-12.3-2.7
                            c-5.5-1.2-11.2-1.2-16.8-0.8c-5.6,0.4-11.1,1.3-16.5,2.9c-6,1.9-11.7,4.8-16.3,9.1c-2.8,2.6-5,5.7-6.8,9c-2.3,4.1-4,8.5-5.5,12.8
                            c-2.7,7.8-4.9,15.8-7.4,23.9c-2.8,8.9-5.9,17.9-4.6,27.2c1,6.9,4.3,13.1,8.6,18.5c1,1.2,2,2.4,3.1,3.5c2.9,3,6.2,5.4,10.1,6.7
                            c5.6,1.9,11.8,1.2,17.3,3.4c6.4,2.6,10.5,8.6,15.9,12.9c8,6.4,18.4,8.8,28.6,8.2c6-0.3,12.1-1.8,17-5.3c2.4-1.8,4.5-4,7.2-5.5
                            c6.5-3.5,14-1.1,21.3-1.4c6.5-0.3,12.6-2.7,17.4-7.3c0.9-0.8,1.7-1.7,2.5-2.7c2.7-3.3,4.6-7.1,6.3-11c2-4.8,3.5-9.7,4.2-14.8
                            C639.9,991.7,637.9,981.6,635.9,971.6z"
            />
            <path
              className={`st3 fissure ${tooth84Diagnozis.fissure ? 'diagnoze' : tooth84Diagnozis.fissure ? 'hidden' : ''}`}
              d="M613.8,968.6c-4.5,0.5-8.6,2.8-11.3,6.4c-0.8,1.1-1.6,2.3-2.3,3.5c-2,3.2-3.8,6.3-7.3,6.6
                            c-2.2,0.2-4.2-0.9-6.2-2l-0.4-0.2c-6-3.3-12.3-5.7-18.9-7.2c-0.3-3.3,0-6,1-8.2c0.3-0.6,0.6-1.2,1-1.8c0.9-1.6,1.9-3.3,1.7-5.4
                            c-0.2-2.2-1.6-3.7-3-5.2c-0.9-0.9-1.8-1.9-2.4-3c-1.5-3-0.4-6.4,0.7-9.7c0.2-0.6,0.4-1.2,0.6-1.8c1.2-3.8,1.7-7.8,1.5-11.8
                            l-1.1,0.1c0.2,3.9-0.3,7.7-1.4,11.4c-0.2,0.6-0.4,1.2-0.6,1.8c-1.1,3.5-2.3,7.1-0.6,10.5c0.6,1.3,1.6,2.3,2.5,3.3
                            c1.3,1.4,2.6,2.7,2.7,4.5c0.2,1.7-0.7,3.2-1.6,4.8c-0.4,0.6-0.7,1.3-1,1.9c-1.1,2.3-1.4,5.1-1.2,8.4l-0.1,0
                            c-6.4,1.8-12.5,4.5-18.1,8.1l-0.5,0.3c-2.4,1.6-5,3.2-7.7,2.9c-2.4-0.3-4.4-2-6.3-3.7c-5.4-4.7-11.2-9.1-17.1-13l-0.6,0.9
                            c5.9,3.9,11.6,8.3,17.1,13c2,1.7,4,3.5,6.7,3.8c-1.3,2.9-3.2,5.5-5.6,7.5c-0.8,0.7-1.6,1.3-2.5,1.9c-2.4,1.8-5,3.7-6.1,6.7
                            c-0.8,2-0.7,4.2-0.6,6.2l0,1c0.1,2.4-0.1,4.8-0.4,7.2l1.1,0.1c0.3-2.5,0.5-4.9,0.4-7.4l0-1.1c-0.1-2-0.2-4,0.5-5.8
                            c1-2.7,3.3-4.4,5.7-6.2c0.8-0.6,1.7-1.3,2.5-2c2.6-2.2,4.7-5,6-8.2l-0.2-0.1c0,0,0.1,0,0.1,0c2.8,0,5.2-1.6,7.6-3.1l0.5-0.3
                            c5.5-3.5,11.4-6.2,17.7-7.9c0.4,3.7,1.5,7.2,2.5,10.7c1.1,3.7,2.2,7.4,2.5,11.3c0.3,3.5,0,7.1-0.2,10.2c-0.3,3.5-0.6,7-0.9,10.6
                            l1.1,0.1c0.3-3.5,0.6-7,0.9-10.6c0.3-3.2,0.6-6.8,0.2-10.4c-0.4-3.9-1.5-7.8-2.6-11.5c-1-3.3-1.9-6.7-2.4-10.1
                            c6.4,1.5,12.5,3.8,18.3,7l0.4,0.2c2.1,1.2,4.3,2.4,6.8,2.1c4-0.4,6.1-3.8,8.1-7.1c0.7-1.2,1.4-2.3,2.2-3.4
                            c2.5-3.3,6.4-5.5,10.5-5.9L613.8,968.6z"
            />
          </g>
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{
              visibility:
                !tooth84Diagnozis.culttab &&
                !tooth84Diagnozis.abutment &&
                !tooth84Diagnozis.implant &&
                !tooth84Diagnozis.apex &&
                !tooth84Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth84Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M613.8,968.6c-4.5,0.5-8.6,2.8-11.3,6.4c-0.8,1.1-1.6,2.3-2.3,3.5c-2,3.2-3.8,6.3-7.3,6.6
                            c-2.2,0.2-4.2-0.9-6.2-2l-0.4-0.2c-6-3.3-12.3-5.7-18.9-7.2c-0.3-3.3,0-6,1-8.2c0.3-0.6,0.6-1.2,1-1.8c0.9-1.6,1.9-3.3,1.7-5.4
                            c-0.2-2.2-1.6-3.7-3-5.2c-0.9-0.9-1.8-1.9-2.4-3c-1.5-3-0.4-6.4,0.7-9.7c0.2-0.6,0.4-1.2,0.6-1.8c1.2-3.8,1.7-7.8,1.5-11.8
                            l-1.1,0.1c0.2,3.9-0.3,7.7-1.4,11.4c-0.2,0.6-0.4,1.2-0.6,1.8c-1.1,3.5-2.3,7.1-0.6,10.5c0.6,1.3,1.6,2.3,2.5,3.3
                            c1.3,1.4,2.6,2.7,2.7,4.5c0.2,1.7-0.7,3.2-1.6,4.8c-0.4,0.6-0.7,1.3-1,1.9c-1.1,2.3-1.4,5.1-1.2,8.4l-0.1,0
                            c-6.4,1.8-12.5,4.5-18.1,8.1l-0.5,0.3c-2.4,1.6-5,3.2-7.7,2.9c-2.4-0.3-4.4-2-6.3-3.7c-5.4-4.7-11.2-9.1-17.1-13l-0.6,0.9
                            c5.9,3.9,11.6,8.3,17.1,13c2,1.7,4,3.5,6.7,3.8c-1.3,2.9-3.2,5.5-5.6,7.5c-0.8,0.7-1.6,1.3-2.5,1.9c-2.4,1.8-5,3.7-6.1,6.7
                            c-0.8,2-0.7,4.2-0.6,6.2l0,1c0.1,2.4-0.1,4.8-0.4,7.2l1.1,0.1c0.3-2.5,0.5-4.9,0.4-7.4l0-1.1c-0.1-2-0.2-4,0.5-5.8
                            c1-2.7,3.3-4.4,5.7-6.2c0.8-0.6,1.7-1.3,2.5-2c2.6-2.2,4.7-5,6-8.2l-0.2-0.1c0,0,0.1,0,0.1,0c2.8,0,5.2-1.6,7.6-3.1l0.5-0.3
                            c5.5-3.5,11.4-6.2,17.7-7.9c0.4,3.7,1.5,7.2,2.5,10.7c1.1,3.7,2.2,7.4,2.5,11.3c0.3,3.5,0,7.1-0.2,10.2c-0.3,3.5-0.6,7-0.9,10.6
                            l1.1,0.1c0.3-3.5,0.6-7,0.9-10.6c0.3-3.2,0.6-6.8,0.2-10.4c-0.4-3.9-1.5-7.8-2.6-11.5c-1-3.3-1.9-6.7-2.4-10.1
                            c6.4,1.5,12.5,3.8,18.3,7l0.4,0.2c2.1,1.2,4.3,2.4,6.8,2.1c4-0.4,6.1-3.8,8.1-7.1c0.7-1.2,1.4-2.3,2.2-3.4
                            c2.5-3.3,6.4-5.5,10.5-5.9L613.8,968.6z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 285, 15)',
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
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth84Diagnozis.implant &&
                  !tooth84Diagnozis.apex &&
                  !tooth84Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth84Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M622.2,1172.1c-0.2,5.8,0,6.1-1,11.4c-0.1,0.2-0.3,0.4-0.5,0.6
                                c-10.3,8.7-22.4,14.8-35.5,17.8c-1.9,0.4-3.9,0.8-5.8,1.1c-9.6,1.5-19.2,1.5-28.9,0.9c-10.8-0.6-21.8-1.9-32.4-4.6
                                c-0.7-0.2-1.4-0.4-2.1-0.6c-10.5-2.8-20.6-7.1-29.2-13.7c-4.5-3.5-8.6-7.5-12-12.1c0-0.1,0-0.1,0-0.1l-0.3,0.6
                                c0.3,0.8,0.5,1.6,0.8,2.5c-0.2-0.9-0.5-1.8-0.8-2.5l21.4-44.6l20.9,6.3l24.4-9.8l37.4,18.7l36.3-12.4c2.4,5.3,4.1,10.9,5.3,16.5
                                C622,1156,622.5,1164.1,622.2,1172.1z"
              />
            </g>
            <g>
              <path
                className={`st10 change-color ${tooth84Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M621.2,1183.5c0,0.2-0.1,0.5-0.2,0.8c-4.6,9.1-8.9,24.7-11,34.6
                                c-2,9.2-2.8,18.5-4,27.8c-2.5,20-6.6,39.9-14.7,58.7c-5.6,13-13.3,25.6-26.7,32c-4,1.9-8.5,2.8-12.4,3.6c-0.2,0.1-0.5,0.1-0.8,0.1
                                c-0.2,0-0.3,0.1-0.5,0.1c-2.9,0.5-5.7,0.5-8-1.2c-1.8-1.3-2.6-3.5-2.9-5.6c-0.6-3.9,0.3-7.9,1.7-11.6c2.2-5.7,5.6-11,8.2-16.6
                                c2.7-5.8,4.3-12,5.4-18.2c1.4-8,1.7-16.2,0-24.2c-2.3-11.1-9.2-21.5-20.9-23.2c-5-0.7-10,0.6-14.3,3.1c-4.9,2.8-8.5,7-12,11.2
                                c-5.5,6.6-10.5,13.5-15,20.7c-5.9,9.4-10.9,19.3-16.8,28.8c-3.3,5.3-7.6,10.4-11,15.1c-2.2,3-4.3,5.7-7.9,6.4
                                c-0.2,0-0.4,0.1-0.6,0.1c-0.2,0-0.5,0-0.7,0.1c-3.3,0.1-5.9-1.6-7.8-4c-2.2-2.9-3.1-6.7-3.4-10.4c-1.7-18.9,4.6-37.2,10.5-55.4
                                c1.9-5.9,3.8-11.9,6.1-17.7c6.4-16.5,16.2-32.5,15.2-50.2c-0.2-4.3-0.7-10.9-2.3-15l0.3-0.6c0,0.1,0,0.1,0,0.1
                                c3.4,4.5,7.5,8.6,12,12.1c8.6,6.6,18.8,10.8,29.2,13.7c0.7,0.2,1.4,0.4,2.1,0.6c10.6,2.7,21.5,4,32.4,4.6
                                c9.6,0.6,19.3,0.6,28.9-0.9c1.9-0.3,3.9-0.7,5.8-1.1c13.1-3,25.2-9,35.5-17.8C620.9,1183.9,621,1183.7,621.2,1183.5z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.pulpit ? 'pulpit' : ''} ${tooth84Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M583.6,1186.2c-0.8,5.5-2.9,10.7-4.1,16.2c0,0.2-0.1,0.4-0.1,0.6
                                c-0.6,0.1-1.2,0.2-1.7,0.2c-0.4,0.1-0.9,0.1-1.3,0.2c-0.7,0.1-1.5,0.2-2.2,0.2c-0.7,0.1-1.5,0.1-2.2,0.2c-0.5,0-1,0.1-1.5,0.1
                                c-0.5,0-1,0.1-1.4,0.1c-0.4,0-0.7,0-1.1,0c-0.5,0-1,0.1-1.4,0.1c-0.6,0-1.2,0-1.8,0c-4.7,0.1-9.5,0-14.2-0.3
                                c-0.7,0-1.5-0.1-2.2-0.1c-1.4-0.1-2.9-0.2-4.3-0.3c-1.5-0.1-2.9-0.3-4.3-0.4c-0.7-0.1-1.5-0.2-2.2-0.2c-0.7-0.1-1.5-0.2-2.2-0.3
                                c-1.4-0.2-2.9-0.4-4.3-0.6c-0.7-0.1-1.4-0.2-2.2-0.3c-1.4-0.2-2.9-0.5-4.3-0.8c-2.1-0.4-4.3-0.9-6.4-1.4c0,0,0,0,0,0s0,0,0,0
                                c0.8-7.9,0.4-16.1,2.1-23.9c0.8-3.9,2.2-7.8,4.1-11.4c6.6,8.6,18,14.6,30.3,15.9c11,1.2,21.4-1.3,28.4-7
                                C584,1177.4,584.2,1181.9,583.6,1186.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.pulpit ? 'pulpit' : ''} ${tooth84Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M479.4,1259.9c1.7,0.5,3.6,1.1,5.7,1.7c0.9-1.3,1.8-2.7,2.8-4
                                c5.7-7.9,12.2-15.5,20-22.1c8.3-7.1,18.9-12.9,32.1-11.4c18.3,2.1,30.1,16,35.2,30.2c1,2.7,1.8,5.5,2.4,8.2c0.5,2.3,0.9,4.7,1.2,7
                                c1.9-0.4,3.7-0.8,5.4-1.2c0-1.8-0.2-3.7-0.3-5.5c-0.6-6.7-1.8-13.4-2.9-20.1c-2.3-13.4-4.3-26.8-1.5-39.7
                                c-0.6,0.1-1.2,0.2-1.8,0.3c-0.4,0.1-0.8,0.1-1.2,0.2c-1,0.1-2,0.2-3,0.3c-0.5,0.1-1,0.1-1.5,0.1c-0.5,0-1,0.1-1.5,0.1
                                c-0.5,0-1.1,0.1-1.6,0.1c-0.3,0-0.6,0-0.9,0c-0.5,0-1,0-1.5,0.1c-0.6,0-1.3,0-1.9,0.1c-4.7,0.1-9.3,0-14-0.3
                                c-1.1-0.1-2.1-0.1-3.2-0.2c-1.3-0.1-2.6-0.2-3.9-0.3c-0.8-0.1-1.6-0.1-2.4-0.2c-0.2,0-0.4-0.1-0.7-0.1c-1-0.1-1.9-0.2-2.9-0.3
                                c-0.9-0.1-1.8-0.2-2.7-0.3c-1.3-0.2-2.6-0.4-3.9-0.6c-0.9-0.1-1.8-0.3-2.7-0.4c-0.3-0.1-0.6-0.1-0.9-0.2c-0.9-0.2-1.8-0.3-2.7-0.5
                                c0,0-0.1,0-0.1,0c-0.6-0.1-1.1-0.2-1.7-0.4c-0.2,0-0.5-0.1-0.7-0.1c-1.3-0.3-2.7-0.6-4-0.9c0,0,0,0,0,0c-0.5,4.7-1.4,9.2-3.4,13.5
                                c-4.4,9.5-13.4,16.4-20.6,24.6c-5.3,6.1-9.5,12.9-13.3,19.8C480.4,1258.1,479.9,1259,479.4,1259.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.pulpit ? 'pulpit' : ''} ${tooth84Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M551,1341.2c7.7-10.4,14.2-21.2,19.5-32.6c4.6-9.8,8.2-20,8.6-30.7c0.1-2.8,0-5.7-0.3-8.5
                                c1.9-0.4,3.7-0.8,5.4-1.2c0.1,2.7,0,5.4-0.2,8.1c-1.1,13-6.3,25.1-12.8,36.5c-5.6,9.8-12.1,19.3-19.7,28.3c0,0,0,0,0,0
                                c-1.2,1.4-2.3,2.8-3.6,4.1C549,1343.9,550,1342.6,551,1341.2C551,1341.2,551,1341.2,551,1341.2z"
              />
              <path
                className={`st22 target part ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.channel_class} ${tooth84Diagnozis.pulpit ? 'pulpit' : ''} ${tooth84Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M456.1,1332.8c0.2-2.2,0.5-4.5,0.8-6.7v0c1.5-11.2,4.1-22.1,7.8-32.8c3.5-10.2,7.9-20.1,12.9-29.9
                                c0.6-1.2,1.2-2.3,1.8-3.5c1.7,0.5,3.6,1.1,5.7,1.7c-1,1.5-2,3.1-3,4.7c-11.7,18.7-19.9,38.7-24.6,59.7c0,0,0,0,0,0
                                C457,1328.2,456.6,1330.5,456.1,1332.8z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage84 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth84Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M475.1 1172.8C475.1 1173 475.1 1173.2 475.2 1173.4C475.6 1173.9 476 1174.5 476.4 1175C477.2 1176 478.1 1177 479 1177.9C480.9 1180 483 1181.9 485.2 1183.7C485.8 1184.1 486.3 1184.6 486.9 1185C489.1 1186.7 491.3 1188.2 493.6 1189.5C494.8 1190.2 495.9 1190.8 497.1 1191.5C497.7 1191.8 498.3 1192.1 498.9 1192.4C500.7 1193.3 502.6 1194.1 504.5 1194.9C506.5 1195.7 508.6 1196.5 510.6 1197.1C511.1 1197.3 511.6 1197.4 512.1 1197.6C513.4 1198 514.7 1198.4 516 1198.7C516.7 1198.9 517.4 1199.1 518.1 1199.3C518.8 1199.5 519.5 1199.6 520.2 1199.8C521.2 1200 522.3 1200.3 523.3 1200.5C523.7 1200.6 524 1200.6 524.4 1200.7H524.5C525.2 1200.8 525.9 1201 526.6 1201.1C527.3 1201.2 528 1201.4 528.7 1201.5C529 1201.5 529.3 1201.6 529.6 1201.6C529.8 1201.6 529.9 1201.7 530.1 1201.7C530.2 1201.7 530.3 1201.7 530.4 1201.8C531.1 1201.9 531.8 1202 532.5 1202.1C532.7 1202.1 532.9 1202.2 533 1202.2C533.9 1202.3 534.7 1202.4 535.6 1202.5C535.9 1202.5 536.3 1202.6 536.6 1202.6C536.8 1202.6 537.1 1202.7 537.3 1202.7C537.6 1202.7 537.8 1202.8 538.1 1202.8C538.2 1202.8 538.3 1202.8 538.3 1202.8C540.3 1203 542.3 1203.2 544.2 1203.4C545.2 1203.5 546.1 1203.5 547.1 1203.6C548.2 1203.7 549.2 1203.7 550.3 1203.8C551.4 1203.9 552.5 1203.9 553.5 1204C557.1 1204.2 560.7 1204.2 564.2 1204.1C564.8 1204.1 565.4 1204.1 566 1204.1C566.1 1204.1 566.1 1204.1 566.2 1204.1C566.7 1204.1 567.2 1204.1 567.7 1204C567.8 1204 567.9 1204 568 1204C568.7 1204 569.5 1203.9 570.2 1203.9C570.7 1203.9 571.2 1203.8 571.7 1203.8C572.2 1203.8 572.7 1203.7 573.2 1203.7C573.7 1203.7 574.2 1203.6 574.7 1203.5C575.2 1203.5 575.7 1203.4 576.2 1203.3C576.3 1203.3 576.4 1203.3 576.6 1203.2C576.9 1203.2 577.2 1203.1 577.4 1203.1C578 1203 578.6 1202.9 579.2 1202.9C579.2 1202.9 579.2 1202.9 579.3 1202.9C579.8 1202.8 580.3 1202.7 580.8 1202.7C581.6 1202.5 582.5 1202.4 583.3 1202.2C583.9 1202.1 584.5 1202 585.1 1201.8C586.3 1201.5 587.4 
                            1201.3 588.6 1200.9C589.9 1200.6 591.1 1200.2 592.4 1199.8C592.4 1199.8 592.4 1199.8 592.5 1199.8C594 1199.3 595.4 1198.8 596.9 1198.2C599.3 1197.3 601.7 1196.2 604 1195C605.5 1194.3 606.9 1193.5 608.3 1192.7C608.3 1192.7 608.3 1192.7 608.4 1192.7C609.8 1191.9 611.2 1191 612.6 1190.1C613.3 1189.6 614 1189.2 614.7 1188.7C615.4 1188.2 616.1 1187.7 616.7 1187.2C617.4 1186.7 618.1 1186.2 618.8 1185.6C619.4 1185.1 620 1184.6 620.7 1184.1C621.9 1178.4 622.1 1178.1 622.3 1172.1C622.6 1164.1 622.1 1156 620.4 1148.1C619.2 1142.4 617.4 1136.9 615 1131.6L578.7 1144L541.3 1125.3L516.9 1135.1L496 1128.8L475.1 1172.8Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st57"
              d="M547 1128.2L484.2 1247.7L483.3 1249.4L474.9 1265.3C474.5 1266.9 475.3 1268.5 476.8 1269.1C478.3 1269.7 479.9 1269.1 480.7 1267.8L573.2 1141.4L547 1128.2Z"
              style={{ fill: tooth84Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth84Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth84Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M476.9,1269c1.5,0.6,3.1,0,3.9-1.3l55-65.2c-0.9-0.1-1.7-0.2-2.6-0.3c-0.2,0-0.4-0.1-0.5-0.1
                            c-0.7-0.1-1.4-0.2-2.1-0.3c-0.1,0-0.2,0-0.3-0.1c-0.2,0-0.3,0-0.5-0.1c-0.3,0-0.6-0.1-0.9-0.1c-0.7-0.1-1.4-0.2-2.1-0.4
                            c-0.7-0.1-1.4-0.3-2.1-0.4l-0.1,0c-0.4-0.1-0.7-0.2-1.1-0.2c-1-0.2-2.1-0.5-3.1-0.7c-0.7-0.2-1.4-0.3-2.1-0.5h0c0,0,0,0,0,0
                            c-0.7-0.2-1.4-0.4-2.1-0.6c-1.3-0.4-2.6-0.7-3.9-1.1c-0.5-0.2-1-0.3-1.5-0.5c-0.1,0.5-0.3,1-0.4,1.5l-35.3,66.7
                            C474.5,1266.8,475.4,1268.4,476.9,1269z"
            />
            <path
              className="st15"
              d="M475.1,1172.8c0,0.2,0,0.4,0.1,0.6c0.4,0.5,0.8,1.1,1.2,1.6c0.8,1,1.7,2,2.6,2.9c1.9,2.1,4,4,6.2,5.8
                            c0.6,0.4,1.1,0.9,1.7,1.3c2.2,1.7,4.4,3.2,6.7,4.5h0c1.2,0.7,2.3,1.3,3.5,2c0.6,0.3,1.2,0.6,1.8,0.9c1.8,0.9,3.7,1.7,5.6,2.5
                            c2,0.8,4.1,1.6,6.1,2.2c0.5,0.2,1,0.3,1.5,0.5c1.3,0.4,2.6,0.8,3.9,1.1c0.7,0.2,1.4,0.4,2.1,0.6c0,0,0,0,0,0h0
                            c0.7,0.2,1.4,0.3,2.1,0.5c1,0.2,2.1,0.5,3.1,0.7c0.4,0.1,0.7,0.1,1.1,0.2l0.1,0c0.7,0.1,1.4,0.3,2.1,0.4c0.7,0.1,1.4,0.3,2.1,0.4
                            c0.3,0,0.6,0.1,0.9,0.1c0.2,0,0.3,0.1,0.5,0.1c0.1,0,0.2,0,0.3,0.1c0.7,0.1,1.4,0.2,2.1,0.3c0.2,0,0.4,0.1,0.5,0.1
                            c0.9,0.1,1.7,0.2,2.6,0.3c0.3,0,0.7,0.1,1,0.1c0.2,0,0.5,0.1,0.7,0.1c0.3,0,0.5,0.1,0.8,0.1c0.1,0,0.2,0,0.2,0
                            c2,0.2,4,0.4,5.9,0.6c1,0.1,1.9,0.1,2.9,0.2c1.1,0.1,2.1,0.1,3.2,0.2c1.1,0.1,2.2,0.1,3.2,0.2c3.6,0.2,7.2,0.2,10.7,0.1
                            c0.6,0,1.2,0,1.8,0c0.1,0,0.1,0,0.2,0c0.5,0,1,0,1.5-0.1c0.1,0,0.2,0,0.3,0c0.7,0,1.5-0.1,2.2-0.1c0.5,0,1-0.1,1.5-0.1
                            c0,0,0,0,0,0c0.5,0,1-0.1,1.5-0.1c0,0,0,0,0,0c0.5,0,1-0.1,1.5-0.2c0.5,0,1-0.1,1.5-0.2c0.1,0,0.2,0,0.4-0.1
                            c0.3,0,0.6-0.1,0.8-0.1c0.6-0.1,1.2-0.2,1.8-0.2c0,0,0,0,0.1,0c0.5-0.1,1-0.2,1.5-0.2c0.8-0.2,1.7-0.3,2.5-0.5
                            c0.6-0.1,1.2-0.2,1.8-0.4c1.2-0.3,2.3-0.5,3.5-0.9c1.3-0.3,2.5-0.7,3.8-1.1c0,0,0,0,0.1,0c1.5-0.5,2.9-1,4.4-1.6
                            c2.4-0.9,4.8-2,7.1-3.2c1.5-0.7,2.9-1.5,4.3-2.3c0,0,0,0,0.1,0c1.4-0.8,2.8-1.7,4.2-2.6c0.7-0.5,1.4-0.9,2.1-1.4
                            c0.7-0.5,1.4-1,2-1.5c0.7-0.5,1.4-1,2.1-1.6c0.6-0.5,1.2-1,1.9-1.5l0,0c1.2-5.7,1.4-6,1.6-12c0.3-8-0.2-16.1-1.9-24
                            c-1.2-5.7-3-11.2-5.4-16.5l-36.3,12.4l-37.4-18.7l-24.4,9.8l-20.9-6.3L475.1,1172.8z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth84Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth84Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M618.9,1185.7l-61.4,38.5l-33.3-9.3l-48.9-40.4l0.1-0.8c3.3,4.2,7.1,8,11.4,11.3
                            c8.6,6.6,18.8,10.8,29.2,13.7c11.3,3.1,22.9,4.5,34.5,5.2c11.6,0.7,23.2,0.6,34.7-2c12.7-2.9,24.6-8.7,34.7-17.1L618.9,1185.7z"
            />
            <path
              className="st17"
              d="M622.2,1172.1c-0.2,5.8,0,6.1-1,11.4c-0.2,0.2-0.3,0.4-0.5,0.6c-0.3,0.2-0.5,0.5-0.8,0.7
                            c-10.1,8.4-22,14.2-34.7,17.1c-11.4,2.6-23.1,2.7-34.7,2c-11.6-0.7-23.2-2.1-34.5-5.2c-10.5-2.8-20.6-7.1-29.2-13.7
                            c-4.3-3.3-8.1-7.1-11.4-11.3c-0.2-0.3-0.4-0.5-0.6-0.8c0,0,0-0.1,0-0.1l21.1-44l21,6.3l24.4-9.8l37.5,18.7l36.3-12.4
                            c2.4,5.3,4.1,10.9,5.3,16.5C622,1156,622.6,1164.1,622.2,1172.1z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <path
              className="st44"
              d="M521.766 1170.99C521.901 1168.51 524.238 1166.75 526.657 1167.31L574.651 1178.36C577.069 1178.91 578.402 1181.51 577.441 1183.8L561.956 1220.69C561.201 1222.49 559.258 1223.48 557.357 1223.04L522.682 1214.93C520.793 1214.49 519.493 1212.76 519.598 1210.82L521.766 1170.99Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth84Diagnozis.abutment ||
                tooth84Diagnozis.implant ||
                tooth84Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M513.7,1210.2c0,0-2.6,19.3-3.7,29.6c-1.1,10.3-2.9,34.3-3.4,44.1s-0.9,26-0.7,27.4s8.2,9,15.5,9.6
                            c7.3,0.6,14.6-0.5,18.2-6.9s11.1-26.8,13.8-35.9c2.7-9.2,10.4-35.8,11.5-40.9s3.1-14.6,3.1-14.6L513.7,1210.2z"
            />
            <line
              className="st19"
              x1="507.7"
              y1="1217.4"
              x2="569.3"
              y2="1240.9"
            ></line>
            <line
              className="st19"
              x1="503.7"
              y1="1236.4"
              x2="565.3"
              y2="1259.9"
            ></line>
            <line
              className="st19"
              x1="499.7"
              y1="1255.4"
              x2="561.3"
              y2="1278.9"
            ></line>
            <line
              className="st19"
              x1="495.7"
              y1="1274.4"
              x2="557.3"
              y2="1297.9"
            ></line>
            <line
              className="st19"
              x1="492.7"
              y1="1293.4"
              x2="554.3"
              y2="1316.9"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth84Diagnozis.culttab &&
                !tooth84Diagnozis.abutment &&
                !tooth84Diagnozis.implant &&
                !tooth84Diagnozis.shaper &&
                !tooth84Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M638,1131.5c-0.9-4.4-2.3-8.8-4.2-12.9c-2.4-5.3-5.5-10.3-9.5-14.5
                            c-2.8-2.9-6-5.5-9.5-7.5l-6.8-0.9c-1.4,1.1-2.8,2.2-4.2,3.3c-3,2.4-6.1,4.8-9.1,7.2c-4.5,3.5-8.9,7-13.4,10.5l-6.2,8.8l-0.3,8.2
                            l3.5,6.2l-4.4,12.5l-1.6-0.3l3.8-12l-3.3-4.9l0.5-10.7l4.5-6.8l-1-3.6l-26.9-17.5l-7.1-0.4c-5,2-9.9,4.3-14.6,6.9
                            c-2.6,1.4-5.2,3-7.7,4.6L513,1119l-0.1,18.3l-1.9,0.1l0-0.6c0,0,0,0,0,0l0.4-17.4l-0.6-3.6c-2.2-0.2-4.3-1.1-6.1-2.5
                            c-1.4-1.1-2.6-2.6-4.1-3.6c-1-0.6-2.2-1-3.3-1.1l-11,7.4l-4.8,6.6c-2.3,7.2-4.1,14.5-5.2,22c-1.3,8.6-1.8,17.3-1.5,26
                            c0,0.8,0.1,1.6,0.1,2.4c3.4,4.5,7.5,8.6,12,12c8.7,6.6,18.8,10.9,29.2,13.7c11.3,3.1,22.9,4.5,34.5,5.2c11.6,0.7,23.2,0.5,34.7-2
                            c13.1-3,25.2-9,35.5-17.7c1.8-1.9,3.4-3.9,4.9-6c5.8-8.1,9.8-17.3,11.6-27.1C638.4,1144.5,638.6,1138,638,1131.5z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth84Diagnozis.culttab && !tooth84Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M481.623 1122.6C479.323 1129.8 477.523 1137.1 476.423 1144.6C475.123 1153.2 474.623 1161.9 474.523 1170.4C474.523 1170.8 474.548 1171.2 474.573 1171.6C474.598 1172 474.623 1172.4 474.623 1172.8C478.023 1177.3 482.123 1181.3 486.623 1184.8C495.323 1191.4 505.323 1195.7 515.823 1198.5C527.123 1201.6 538.723 1203 550.323 1203.7C561.923 1204.4 573.623 1204.3 585.023 1201.7C598.123 1198.8 610.223 1192.7 620.523 1184C622.323 1182.1 623.923 1180.1 625.423 1178C631.223 1170 635.223 1160.7 637.023 1150.9C638.223 1144.5 638.523 1138 637.823 1131.5C636.823 1127.1 635.523 1122.7 633.623 1118.6C631.223 1113.3 628.123 1108.3 624.123 1104.1C621.323 1101.2 618.123 1098.7 614.623 1096.6L607.823 1095.7L603.623 1099C600.623 1101.4 597.623 1103.8 594.523 1106.2C592.273 1107.95 590.048 1109.7 587.823 1111.45C585.598 1113.2 583.373 1114.95 581.123 1116.7L574.923 1125.5L574.623 1133.7L578.123 1139.9L573.723 1152.4L572.123 1152.1L575.923 1140.1L572.623 1135.2L573.123 1124.5L577.623 1117.7L576.623 1114.1L549.723 1096.6L542.623 1096.2C537.623 1098.2 532.723 1100.5 528.023 1103.1L528.02 1103.1C525.421 1104.6 522.822 1106.1 520.323 1107.7L513.123 1119L513.023 1137.3L511.123 1137.4V1136.8L511.523 1119.4L510.923 1115.8C508.723 1115.5 506.623 1114.7 504.823 1113.3C504.324 1112.87 503.862 1112.42 503.402 1111.97C502.574 1111.15 501.752 1110.34 500.723 1109.7C499.723 1109.1 498.623 1108.7 497.423 1108.6L486.423 1116L481.623 1122.6ZM579.532 1196.99C590.504 1194.53 600.638 1189.35 609.264 1181.97C611.219 1179.88 612.975 1177.58 614.549 1175.18C615.357 1173.94 614.5 1172.33 613.03 1172.21C561.847 1168.17 533.863 1164.69 489.748 1157.36C488.596 1157.17 487.509 1158 487.426 1159.16C486.658 1169.91 487.705 1175.23 497.119 1182.65C504.406 1188.25 512.781 1191.9 521.575 1194.27C531.039 1196.9 540.754 1198.09 550.47 1198.69C560.185 1199.28 569.984 1199.19 579.532 1196.99Z"
            ></path>
            <path
              className={`st7 ${tooth84Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M609.047 1181.97C600.42 1189.35 590.286 1194.53 579.314 1196.99C569.766 1199.19 559.967 1199.28 550.252 1198.69C540.537 1198.09 530.821 1196.9 521.357 1194.27C512.563 1191.9 504.188 1188.25 496.901 1182.65C487.488 1175.23 486.441 1169.91 487.208 1159.16C487.291 1158 488.378 1157.17 489.53 1157.36C533.645 1164.69 561.629 1168.17 612.812 1172.21C614.282 1172.33 615.139 1173.94 614.332 1175.18C612.757 1177.58 611.001 1179.88 609.047 1181.97Z"
              style={{ fill: 'rgb(255, 255, 255)', opacity: 0.7 }}
            ></path>
            <path
              className={`st60
                                    ${tooth84Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth84Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth84Diagnozis.seal_cervical_color}
                                `}
              d="M609.047 1181.97C600.42 1189.35 590.286 1194.53 579.314 1196.99C569.766 1199.19 559.967 1199.28 550.252 1198.69C540.537 1198.09 530.821 1196.9 521.357 1194.27C512.563 1191.9 504.188 1188.25 496.901 1182.65C487.488 1175.23 486.441 1169.91 487.208 1159.16C487.291 1158 488.378 1157.17 489.53 1157.36C533.645 1164.69 561.629 1168.17 612.812 1172.21C614.282 1172.33 615.139 1173.94 614.332 1175.18C612.757 1177.58 611.001 1179.88 609.047 1181.97Z"
              style={{
                opacity: 0,
                stroke: 'rgb(156, 156, 156)',
                strokeWidth: 2,
              }}
            ></path>
          </g>
          {/*TARTAR*/}
          <g
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth84.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M633 1167L630.5 1168L628.5 1169.5L626 1172L623.5 1176.5L620.5 1177.5L617.5 1181.5L614.5 1184L611 1185.5L608 1188L602.5 1190L599.5 1192.5L595.5 1194.5L592.5 1196.5L587 1198L580 1200H571.5L564 1202H560.5L555.5 1201H548.5H542L532 1199L522.5 1198L517 1194.5L507 1192.5L503 1190L493.5 1185.5L490.5 1181.5L485.5 1177.5L482.5 1172.5L481.5 1168L479 1162L479.5 1156.5L479 1153.5L478.5 1149.5L476.5 1147L476 1149.5V1151.5L475 1153L474.5 1156L473.5 1158.5L474.5 1161.5L473 1165.5L474 1171L475 1176L474 1182.5L475 1189L474 1192.5L476 1196.5V1201L477 1205.5L485.5 1211.5L492.5 1217L501 1218L510.5 1221.5L516.5 1223.5C518 1224 522.5 1227.5 524 1228C525.5 1228.5 527 1228 529 1228.5L534 1230L542 1228.5C543.667 1229.33 547.3 1231.9 548.5 1231.5C549.7 1231.1 554.667 1231.5 556.5 1231L564 1231.5L571.5 1228.5L578.5 1231L587 1228.5L597 1224.5H606L611 1221.5L612.5 1218L614.5 1214L615.5 1209L617.5 1204.5L618.5 1201.5L620.5 1199L622 1194.5L622.5 1190L624.5 1186.5L627.5 1183.5L628.5 1179L632 1175L633 1172V1167Z"
            ></path>
            <path
              className="st61 level1"
              d="M632 1167L629.5 1168L627.5 1169.5L625 1172L622.5 1176.5L619.5 1177.5L616.5 1181.5L613.5 1184L610 1185.5L607 1188L601.5 1190L598.5 1192.5L594.5 1194.5L591.5 1196.5L586 1198L579 1200H570.5L563 1202H559.5L554.5 1201H547.5H541L531 1199L521.5 1198L516 1194.5L506 1192.5L502 1190L492.5 1185.5L489.5 1181.5L484.5 1177.5L481.5 1172.5L480.5 1168L478 1162L478.5 1156.5L478 1153.5L477.5 1149.5L475.5 1147V1149.5L474.5 1153V1156.5L473 1159.5L474.5 1164.5V1168L475.5 1172V1177.5L474.5 1181.5L475.5 1185.5L478.5 1188L481.5 1190L484.5 1194.5L491.5 1196L496 1200L502 1201H508L512.5 1203.5L514.5 1205.5L519.5 1207H525L529 1208.5H537L544.5 1210H551L557.5 1211.5L561 1210H567L575 1211.5L583 1207H587.5H591.5L597 1205.5L601.5 1207L606 1204.5H610L613.5 1203.5L616.5 1201L618 1196L619.5 1194.5L619 1191.5L621 1188L622.5 1185.5L625 1181.5L626.5 1178.5L628.5 1175.5L630.5 1173.5L631.5 1170.5L632 1167Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth84Diagnozis.culttab &&
                !tooth84Diagnozis.abutment &&
                !tooth84Diagnozis.implant &&
                !tooth84Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС TOP*/}
            <g
              className="caries-filling"
              style={{ zIndex: 3000 }}
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M508.2,1144.8c6.3,6.4,16.9,10.9,24.4,12.1c8.4,1.3,27.5,3.3,40,1.3c9.4-1.5,24.2-11.9,31.1-17.1
                                c0.1-9.9,0-30.2-0.1-42.2c-3,2.4-6.1,4.8-9.1,7.2c-4.5,3.5-8.9,7-13.4,10.5l-6.2,8.8l-0.3,8.2l3.5,6.2l-4.4,12.6l-1.6-0.3l3.8-12
                                l-3.3-4.9l0.5-10.7l4.5-6.8l-1-3.6l-26.9-17.5l-7.1-0.4c-5,2-9.9,4.3-14.6,6.9c-2.6,1.4-5.2,2.9-7.7,4.6L513,1119l-0.1,18.3
                                l-1.9,0.1l0-0.6C510.3,1138.9,509.4,1141.7,508.2,1144.8z"
              />
              <path
                className={`
                                st8 target caries-center 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth84.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth84.seal_center ? `seal-fill ${teethDiagnozis.tooth84.seal_center_color}` : ''}
                            `}
                d="M508.2,1144.8c6.3,6.4,16.9,10.9,24.4,12.1c8.4,1.3,27.5,3.3,40,1.3c9.4-1.5,24.2-11.9,31.1-17.1
                                c0.1-9.9,0-30.2-0.1-42.2c-3,2.4-6.1,4.8-9.1,7.2c-4.5,3.5-8.9,7-13.4,10.5l-6.2,8.8l-0.3,8.2l3.5,6.2l-4.4,12.6l-1.6-0.3l3.8-12
                                l-3.3-4.9l0.5-10.7l4.5-6.8l-1-3.6l-26.9-17.5l-7.1-0.4c-5,2-9.9,4.3-14.6,6.9c-2.6,1.4-5.2,2.9-7.7,4.6L513,1119l-0.1,18.3
                                l-1.9,0.1l0-0.6C510.3,1138.9,509.4,1141.7,508.2,1144.8z"
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
                d="M608.6,1168.4c2,2.1,10.1,6.3,16.9,9.6c5.8-8,9.8-17.3,11.6-27.1c1.2-6.4,1.5-12.9,0.8-19.4
                                c-0.9-4.4-2.3-8.8-4.2-12.9c-2.4-5.3-5.5-10.3-9.5-14.5c-2.8-3-6-5.5-9.5-7.5l-6.8-0.9c-1.4,1.1-2.8,2.2-4.2,3.3
                                c0.1,11.9,0.2,32.3,0.1,42.2c0,2.1-0.1,3.7-0.1,4.7C603.3,1153.7,605.1,1164.6,608.6,1168.4z"
              />
              <path
                className={`st8 caries-right
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth84.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth84.seal_right ? `seal-fill ${teethDiagnozis.tooth84.seal_right_color}` : ''}
                            `}
                d="M608.6,1168.4c2,2.1,10.1,6.3,16.9,9.6c5.8-8,9.8-17.3,11.6-27.1c1.2-6.4,1.5-12.9,0.8-19.4
                                c-0.9-4.4-2.3-8.8-4.2-12.9c-2.4-5.3-5.5-10.3-9.5-14.5c-2.8-3-6-5.5-9.5-7.5l-6.8-0.9c-1.4,1.1-2.8,2.2-4.2,3.3
                                c0.1,11.9,0.2,32.3,0.1,42.2c0,2.1-0.1,3.7-0.1,4.7C603.3,1153.7,605.1,1164.6,608.6,1168.4z"
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M474.7,1170.6c5,0,12.8-0.1,16.4-1.1c5.5-1.5,7.3-4.3,13-15.4c1.7-3.2,3-6.4,4.1-9.3c1.2-3.1,2.1-5.9,2.7-8.1
                                c0,0,0,0,0,0l0.4-17.5l-0.6-3.6c-2.2-0.2-4.3-1.1-6.1-2.4c-1.4-1.1-2.6-2.6-4.1-3.6c-1-0.6-2.2-1-3.3-1.1l-11,7.4l-4.8,6.6
                                c-2.3,7.2-4.1,14.5-5.2,22C474.9,1153.2,474.4,1161.9,474.7,1170.6z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth84.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth84.seal_left ? `seal-fill ${teethDiagnozis.tooth84.seal_left_color}` : ''}
                            `}
                d="M474.7,1170.6c5,0,12.8-0.1,16.4-1.1c5.5-1.5,7.3-4.3,13-15.4c1.7-3.2,3-6.4,4.1-9.3c1.2-3.1,2.1-5.9,2.7-8.1
                                c0,0,0,0,0,0l0.4-17.5l-0.6-3.6c-2.2-0.2-4.3-1.1-6.1-2.4c-1.4-1.1-2.6-2.6-4.1-3.6c-1-0.6-2.2-1-3.3-1.1l-11,7.4l-4.8,6.6
                                c-2.3,7.2-4.1,14.5-5.2,22C474.9,1153.2,474.4,1161.9,474.7,1170.6z"
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st58"
                d="M474.7,1170.6c0,0.8,0.1,1.6,0.1,2.3c3.4,4.5,7.5,8.6,12,12.1c8.7,6.6,18.8,10.9,29.2,13.7
                                c11.3,3.1,22.9,4.5,34.5,5.2c11.6,0.7,23.2,0.5,34.7-2c13.1-2.9,25.2-9,35.5-17.7c1.8-1.9,3.4-3.9,4.9-6c-6.8-3.3-15-7.6-16.9-9.6
                                c-3.6-3.8-5.4-14.7-5-22.6c0-1,0.1-2.6,0.1-4.7c-6.9,5.2-21.7,15.7-31.1,17.1c-12.5,1.9-31.7,0-40-1.3
                                c-7.6-1.2-18.1-5.7-24.4-12.1c-1.1,2.9-2.5,6.1-4.1,9.3c-5.7,11.1-7.5,13.9-13,15.4C487.5,1170.5,479.7,1170.6,474.7,1170.6z"
              />
              <path
                className={`st8 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth84.caries_bottom ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth84.seal_bottom ? `seal-fill ${teethDiagnozis.tooth84.seal_bottom_color}` : ''}
                            `}
                d="M474.7,1170.6c0,0.8,0.1,1.6,0.1,2.3c3.4,4.5,7.5,8.6,12,12.1c8.7,6.6,18.8,10.9,29.2,13.7
                                c11.3,3.1,22.9,4.5,34.5,5.2c11.6,0.7,23.2,0.5,34.7-2c13.1-2.9,25.2-9,35.5-17.7c1.8-1.9,3.4-3.9,4.9-6c-6.8-3.3-15-7.6-16.9-9.6
                                c-3.6-3.8-5.4-14.7-5-22.6c0-1,0.1-2.6,0.1-4.7c-6.9,5.2-21.7,15.7-31.1,17.1c-12.5,1.9-31.7,0-40-1.3
                                c-7.6-1.2-18.1-5.7-24.4-12.1c-1.1,2.9-2.5,6.1-4.1,9.3c-5.7,11.1-7.5,13.9-13,15.4C487.5,1170.5,479.7,1170.6,474.7,1170.6z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_left &&
                      !tooth84Diagnozis.seal_top &&
                      !tooth84Diagnozis.seal_center) ||
                    (tooth84Diagnozis.seal_left &&
                      tooth84Diagnozis.seal_top &&
                      !tooth84Diagnozis.seal_center) ||
                    (!tooth84Diagnozis.seal_left &&
                      tooth84Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M508.5 1145C510.5 1138.5 512.3 1135.8 511.5 1123"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_left &&
                      !tooth84Diagnozis.seal_bottom) ||
                    (!tooth84Diagnozis.seal_left &&
                      tooth84Diagnozis.seal_bottom &&
                      !tooth84Diagnozis.seal_center) ||
                    (!tooth84Diagnozis.seal_left &&
                      tooth84Diagnozis.seal_bottom &&
                      tooth84Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M508.5 1145C499.5 1166 493.2 1169.3 480 1170.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_bottom &&
                      !tooth84Diagnozis.seal_center) ||
                    (!tooth84Diagnozis.seal_bottom &&
                      tooth84Diagnozis.seal_center) ||
                    (tooth84Diagnozis.seal_right &&
                      tooth84Diagnozis.seal_left &&
                      !tooth84Diagnozis.seal_center &&
                      !tooth84Diagnozis.seal_top) ||
                    (!tooth84Diagnozis.seal_top &&
                      !tooth84Diagnozis.seal_bottom &&
                      tooth84Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M508.5 1145C522.5 1160.5 579.5 1164.7 603.5 1141.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_right &&
                      !tooth84Diagnozis.seal_bottom) ||
                    (!tooth84Diagnozis.seal_right &&
                      tooth84Diagnozis.seal_bottom &&
                      !tooth84Diagnozis.seal_center) ||
                    (!tooth84Diagnozis.seal_right &&
                      tooth84Diagnozis.seal_bottom &&
                      tooth84Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M603.5 1141.5C603.5 1155.5 600.8 1165.1 620 1175.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth84Diagnozis.seal_right &&
                      !tooth84Diagnozis.seal_bottom &&
                      !tooth84Diagnozis.seal_center) ||
                    (tooth84Diagnozis.seal_right &&
                      tooth84Diagnozis.seal_bottom &&
                      !tooth84Diagnozis.seal_center) ||
                    (!tooth84Diagnozis.seal_right &&
                      tooth84Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M603.5 1141.5V1105.5"
              />
            </g>
          </g>
          <g>
            <g
              className="vinir"
              style={{
                visibility: tooth84Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth84Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth84Diagnozis.vinir_color}`}
                d="M638 1131.5C637.1 1127.1 635.7 1122.7 633.8 1118.6C631.4 1113.3 628.3 1108.3 624.3 1104.1C621.5 1101.2 618.3 1098.6 614.8 1096.6L608 1095.7C606.6 1096.8 605.2 1097.9 603.8 1099C600.8 1101.4 597.7 1103.8 594.7 1106.2C590.2 1109.7 585.8 1113.2 581.3 1116.7L575.1 1125.5L574.8 1133.7L578.3 1139.9L573.9 1152.4L572.3 1152.1L576.1 1140.1L572.8 1135.2L573.3 1124.5L577.8 1117.7L576.8 1114.1L549.9 1096.6L542.8 1096.2C537.8 1098.2 532.9 1100.5 528.2 1103.1C525.6 1104.5 523 1106.1 520.5 1107.7L513 1119L512.9 1137.3L511 1137.4V1136.8L511.4 1119.4L510.8 1115.8C508.6 1115.6 506.5 1114.7 504.7 1113.3C503.3 1112.2 502.1 1110.7 500.6 1109.7C499.6 1109.1 498.4 1108.7 497.3 1108.6L486.3 1116L481.5 1122.6C479.2 1129.8 477.4 1137.1 476.3 1144.6C475 1153.2 474.5 1161.9 474.8 1170.6C474.8 1171.4 474.9 1172.2 474.9 1173C478.3 1177.5 482.4 1181.6 486.9 1185C495.6 1191.6 505.7 1195.9 516.1 1198.7C527.4 1201.8 539 1203.2 550.6 1203.9C562.2 1204.6 573.8 1204.4 585.3 1201.9C598.4 1198.9 610.5 1192.9 620.8 1184.2C622.6 1182.3 624.2 1180.3 625.7 1178.2C631.5 1170.1 635.5 1160.9 637.3 1151.1C638.4 1144.5 638.6 1138 638 1131.5Z"
              ></path>
            </g>
          </g>
          <g
            className="crown"
            style={{
              visibility:
                tooth84Diagnozis.temporary_crown ||
                tooth84Diagnozis.ceramic_crown ||
                tooth84Diagnozis.mceramic_crown ||
                tooth84Diagnozis.metalic_crown ||
                tooth84Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth84Diagnozis.temporary_crown ||
                tooth84Diagnozis.ceramic_crown ||
                tooth84Diagnozis.mceramic_crown ||
                tooth84Diagnozis.metalic_crown ||
                tooth84Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth84Diagnozis.ceramic_crown_color}
                                ${tooth84Diagnozis.mceramic_crown_color}
                                ${tooth84Diagnozis.metalic_crown_color}
                                ${tooth84Diagnozis.zirconia_crown_color}
                            `}
              d="M638,1131.5c-0.9-4.4-2.3-8.8-4.2-12.9c-2.4-5.3-5.5-10.3-9.5-14.5
                            c-2.8-2.9-6-5.5-9.5-7.5l-6.8-0.9c-1.4,1.1-2.8,2.2-4.2,3.3c-3,2.4-6.1,4.8-9.1,7.2c-4.5,3.5-8.9,7-13.4,10.5l-6.2,8.8l-0.3,8.2
                            l3.5,6.2l-4.4,12.5l-1.6-0.3l3.8-12l-3.3-4.9l0.5-10.7l4.5-6.8l-1-3.6l-26.9-17.5l-7.1-0.4c-5,2-9.9,4.3-14.6,6.9
                            c-2.6,1.4-5.2,3-7.7,4.6L513,1119l-0.1,18.3l-1.9,0.1l0-0.6c0,0,0,0,0,0l0.4-17.4l-0.6-3.6c-2.2-0.2-4.3-1.1-6.1-2.5
                            c-1.4-1.1-2.6-2.6-4.1-3.6c-1-0.6-2.2-1-3.3-1.1l-11,7.4l-4.8,6.6c-2.3,7.2-4.1,14.5-5.2,22c-1.3,8.6-1.8,17.3-1.5,26
                            c0,0.8,0.1,1.6,0.1,2.4c3.4,4.5,7.5,8.6,12,12c8.7,6.6,18.8,10.9,29.2,13.7c11.3,3.1,22.9,4.5,34.5,5.2c11.6,0.7,23.2,0.5,34.7-2
                            c13.1-3,25.2-9,35.5-17.7c1.8-1.9,3.4-3.9,4.9-6c5.8-8.1,9.8-17.3,11.6-27.1C638.4,1144.5,638.6,1138,638,1131.5z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
