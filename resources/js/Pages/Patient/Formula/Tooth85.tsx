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
import PeriodontitStage85 from './periodontit85';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth85() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth85Diagnozis = teethDiagnozis.tooth85;
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
        teethDiagnozis.tooth85.caries_bottom =
          !teethDiagnozis.tooth85.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth85.caries_center =
          !teethDiagnozis.tooth85.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth85.caries_left =
          !teethDiagnozis.tooth85.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth85.caries_right =
          !teethDiagnozis.tooth85.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth85.caries_top = !teethDiagnozis.tooth85.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth85.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth85.seal_center_color = sealColor1;
          teethDiagnozis.tooth85.seal_center = true;
        } else if (
          teethDiagnozis.tooth85.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth85.seal_center_color = sealColor2;
          teethDiagnozis.tooth85.seal_center = true;
        } else if (
          teethDiagnozis.tooth85.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth85.seal_center_color = sealColor3;
          teethDiagnozis.tooth85.seal_center = true;
        } else {
          teethDiagnozis.tooth85.seal_center =
            !teethDiagnozis.tooth85.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth85.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth85.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth85.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth85.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth85.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth85.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth85.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth85.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth85.seal_bottom = true;
        } else {
          teethDiagnozis.tooth85.seal_bottom =
            !teethDiagnozis.tooth85.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth85.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth85.seal_left_color = sealColor1;
          teethDiagnozis.tooth85.seal_left = true;
        } else if (
          teethDiagnozis.tooth85.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth85.seal_left_color = sealColor2;
          teethDiagnozis.tooth85.seal_left = true;
        } else if (
          teethDiagnozis.tooth85.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth85.seal_left_color = sealColor3;
          teethDiagnozis.tooth85.seal_left = true;
        } else {
          teethDiagnozis.tooth85.seal_left = !teethDiagnozis.tooth85.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth85.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth85.seal_right_color = sealColor1;
          teethDiagnozis.tooth85.seal_right = true;
        } else if (
          teethDiagnozis.tooth85.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth85.seal_right_color = sealColor2;
          teethDiagnozis.tooth85.seal_right = true;
        } else if (
          teethDiagnozis.tooth85.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth85.seal_right_color = sealColor3;
          teethDiagnozis.tooth85.seal_right = true;
        } else {
          teethDiagnozis.tooth85.seal_right =
            !teethDiagnozis.tooth85.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth85.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth85.seal_top_color = sealColor1;
          teethDiagnozis.tooth85.seal_top = true;
        } else if (
          teethDiagnozis.tooth85.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth85.seal_top_color = sealColor2;
          teethDiagnozis.tooth85.seal_top = true;
        } else if (
          teethDiagnozis.tooth85.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth85.seal_top_color = sealColor3;
          teethDiagnozis.tooth85.seal_top = true;
        } else {
          teethDiagnozis.tooth85.seal_top = !teethDiagnozis.tooth85.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth85.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth85.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth85.wedge_shaped_defect_color =
          !teethDiagnozis.tooth85.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth85.show &&
        !teethDiagnozis.tooth45.show
      ) {
        document.getElementById('TH-85').classList.add('f-tooth-active');
        document.getElementById('TH-85').style.opacity = '1';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth85.show &&
        teethDiagnozis.tooth45.show
      ) {
        document.getElementById('TH-85').classList.add('f-tooth-active');
        document.getElementById('TH-45').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-85').classList.remove('f-tooth-active');
        document.getElementById('TH-45').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth85.show &&
        !teethDiagnozis.tooth45.show
      ) {
        document.getElementById('TH-85').classList.remove('f-tooth-active');
        document.getElementById('TH-85').style.opacity = '0';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth85.show &&
        teethDiagnozis.tooth45.show
      ) {
        document.getElementById('TH-85').classList.remove('f-tooth-active');
        document.getElementById('TH-45').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth45.show) {
        document.getElementById('TH-85').classList.add('f-tooth-active');
        document.getElementById('TH-45').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth85.show) {
        document.getElementById('TH-85').classList.remove('f-tooth-active');
        document.getElementById('TH-45').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth45.show) {
        document.getElementById('TH-45').classList.add('f-tooth-active');
        document.getElementById('TH-85').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="85"
        onMouseOver={() => {
          showHideOverlay('over');
        }}
        onMouseLeave={() => {
          showHideOverlay('leave');
        }}
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 660 842)"
          className={`st3 st4 st5 ${selectedTooth === 85 ? 'num-active' : ''}`}
        >
          85
        </text>
      </g>
      <g
        id="TH-85"
        className={`f-tooth-init-milk ${teethType} ${(teethDiagnozis.tooth85.show || allTeeth) && !teethDiagnozis.tooth85.absent ? 'f-tooth-active' : ''}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth85.show = !teethDiagnozis.tooth85.show;
            teethDiagnozis.tooth45.show = false;
          }

          dispatch(setSelectedToothNumber(85));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              85,
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
          className={`underlay ${selectedTooth === 85 ? 'selected' : ''}`}
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
            d="M707.8,1213.9c0,0-12,33-17,51s-13,47-17,62s-4,36-28,34s-28-21-26-38
                        s11-50,13-65s6-42,5-66s-1-59,1-75s18-32,20-54s-20-52-22-79c0,0,3.6-77.5,4.3-100.8c0.4-12.7-1.2-39,2.3-61.4
                        c2.9-18.7,8.4-32.8,23.4-37.8c26.6-8.9,49,4,55,36s11,158,11,168c0,36-17,40-17,67c0,37.2,20,41,17,82
                        C731.4,1155.9,715.8,1191.9,707.8,1213.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 315, 50)',
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
                  !tooth85Diagnozis.culttab &&
                  !tooth85Diagnozis.implant &&
                  !tooth85Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st6 change-color ${tooth85Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth85Diagnozis?.apex ? 'apex' : ''}`}
                d="M335.8,962.7c-0.6,4-1.5,8-1.7,12.1c-0.4,7.6,1.5,15.3,5.5,22.3c2.9,5,6.8,9.8,12.3,13.3
                                c3.9,2.5,8.3,4.2,12.9,5.9c6.5,2.3,13.2,4.4,20.3,5.4c7.2,1,14.5,0.7,21.7,0.4c6.4-0.3,12.8-0.6,19.1-1.5
                                c4.7-0.7,9.4-1.8,13.7-3.4c4-1.5,7.6-3.4,11.1-5.4c5-3,9.5-6.4,12.8-10.6c3.5-4.3,5.4-9.3,6.8-14.3c2.5-8.4,3.9-17.1,2.9-25.8
                                c-0.7-6.1-2.5-12.2-6-17.8c-3.8-6-9.4-11.2-16.8-14.8c-7.6-3.7-16.6-5.4-25.6-6c-4.6-0.3-9.3-0.4-13.7,0.5
                                c-3.4,0.7-6.5,2-10.1,2.1c-2.6,0-5.1-0.7-7.6-1.3c-4.9-1.2-10-1.9-15.1-2.2c-5-0.3-10.1-0.4-15,0.3c-5.7,0.8-11.1,2.6-15.6,5.4
                                c-3.5,2.3-6.2,5-7.8,8.3c-1.5,3-1.9,6.3-2.3,9.5C337.1,950.8,336.7,956.7,335.8,962.7z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth85Diagnozis?.apex || tooth85Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth85Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth85Diagnozis?.apex ? 'apex' : ''}`}
                d="M335.8 962.7C335.2 966.7 334.3 970.7 334.1 974.8C333.7 982.4 335.6 990.1 339.6 997.1C342.5 1002.1 346.4 1006.9 351.9 1010.4C355.8 1012.9 360.2 1014.6 364.8 1016.3C371.3 1018.6 378 1020.7 385.1 1021.7C392.3 1022.7 399.6 1022.4 406.8 1022.1C413.2 1021.8 419.6 1021.5 425.9 1020.6C430.6 1019.9 435.3 1018.8 439.6 1017.2C443.6 1015.7 447.2 1013.8 450.7 1011.8C455.7 1008.8 460.2 1005.4 463.5 1001.2C467 996.9 468.9 991.9 470.3 986.9C472.8 978.5 474.2 969.8 473.2 961.1C472.5 955 470.7 948.9 467.2 943.3C463.4 937.3 457.8 932.1 450.4 928.5C442.8 924.8 433.8 923.1 424.8 922.5C420.2 922.2 415.5 922.1 411.1 923C407.7 923.7 404.6 925 401 925.1C398.4 925.1 395.9 924.4 393.4 923.8C388.5 922.6 383.4 921.9 378.3 921.6C373.3 921.3 368.2 921.2 363.3 921.9C357.6 922.7 352.2 924.5 347.7 927.3C344.2 929.6 341.5 932.3 339.9 935.6C338.4 938.6 338 941.9 337.6 945.1C337.1 950.8 336.7 
                                956.7 335.8 962.7Z"
              />
              <path
                className={`st24 change-color ${tooth85Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth85Diagnozis?.apex ? 'apex' : ''}`}
                d="M433.928 966.325C432.939 982.262 438.262 991 403.508 991C368.754 991 371.387 972 371.387 961.576C371.387 954.226 374.635 949 400.227 949C425.819 949 434.917 950.388 433.928 966.325Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth85Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g className="pulpitis-pfilling">
              <ellipse
                className="st22 target"
                cx="379.543"
                cy="969.098"
                rx="10.9723"
                ry="7.35396"
                transform="rotate(-90.9902 379.543 969.098)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                cx="423.376"
                cy="960.454"
                rx="8.41967"
                ry="7.78385"
                transform="rotate(-130.036 423.376 960.454)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                cx="423.223"
                cy="980.499"
                rx="8.72166"
                ry="7.94529"
                transform="rotate(-3.74907 423.223 980.499)"
                style={{ fill: '#e80808' }}
              ></ellipse>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth85Diagnozis.implant || tooth85Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="402.5" cy="970.5" r="26.5"></circle>
            <g className="st27">
              <mask id="implant_85" className="st49">
                <path
                  className="st50"
                  d="M388.905 954.474L385.458 953.352C382.529 956.3 380.349 959.994 379.231 964.124L381.928 966.55C381.686 967.829 381.56 969.15 381.56 970.5C381.56 971.85 381.686 973.17 381.928 974.45L379.231 976.875C380.349 981.006 382.529 984.7 385.458 987.648L388.905 986.525C390.895 988.242 393.209 989.594 395.743 990.478L396.494 994.024C398.479 994.548 400.564 994.827 402.714 994.827C404.864 994.827 406.95 994.548 408.936 994.024L409.687 990.477C412.22 989.593 414.533 988.241 416.523 986.525L419.97 987.647C422.899 984.699 425.079 981.004 426.197 976.874L423.5 974.448C423.741 973.169 423.868 971.849 423.868 970.5C423.868 969.15 423.741 967.831 423.5 966.552L426.197 964.126C425.079 959.995 422.899 956.301 419.97 953.352L416.523 954.475C414.533 952.758 412.22 951.406 409.687 950.522L408.936 946.976C406.95 946.452 404.864 946.173 402.714 946.173C400.564 946.173 398.479 946.452 396.494 946.975L395.743 950.521C393.209 951.405 390.895 952.758 388.905 954.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M388.905 954.474L385.458 953.352C382.529 956.3 380.349 959.994 379.231 964.124L381.928 966.55C381.686 967.829 381.56 969.15 381.56 970.5C381.56 971.85 381.686 973.17 381.928 974.45L379.231 976.875C380.349 981.006 382.529 984.7 385.458 987.648L388.905 986.525C390.895 988.242 393.209 989.594 395.743 990.478L396.494 994.024C398.479 994.548 400.564 994.827 402.714 994.827C404.864 994.827 406.95 994.548 408.936 994.024L409.687 990.477C412.22 989.593 414.533 988.241 416.523 986.525L419.97 987.647C422.899 984.699 425.079 981.004 426.197 976.874L423.5 974.448C423.741 973.169 423.868 971.849 423.868 970.5C423.868 969.15 423.741 967.831 423.5 966.552L426.197 964.126C425.079 959.995 422.899 956.301 419.97 953.352L416.523 954.475C414.533 952.758 412.22 951.406 409.687 950.522L408.936 946.976C406.95 946.452 404.864 946.173 402.714 946.173C400.564 946.173 398.479 946.452 396.494 946.975L395.743 950.521C393.209 951.405 390.895 952.758 388.905 954.474Z"
              ></path>
              <path
                className="st52"
                d="M385.458 953.352L386.078 951.45L384.907 951.069L384.04 951.942L385.458 953.352ZM388.905 954.474L388.286 956.376L389.357 956.725L390.211 955.989L388.905 954.474ZM379.231 964.124L377.3 963.601L376.979 964.789L377.893 965.611L379.231 964.124ZM381.928 966.55L383.893 966.921L384.102 965.815L383.265 965.063L381.928 966.55ZM381.928 974.45L383.265 975.937L384.102 975.184L383.893 974.079L381.928 974.45ZM379.231 976.875L377.893 975.388L376.979 976.211L377.3 977.398L379.231 976.875ZM385.458 987.648L384.04 989.057L384.907 989.93L386.078 989.549L385.458 987.648ZM388.905 986.525L390.211 985.011L389.358 984.275L388.286 984.624L388.905 986.525ZM395.743 990.478L397.699 990.063L397.465 988.961L396.401 988.59L395.743 990.478ZM396.494 994.024L394.537 994.439L394.793 995.644L395.984 995.958L396.494 994.024ZM408.936 994.024L409.446 995.958L410.637 995.643L410.892 994.438L408.936 994.024ZM409.687 990.477L409.028 988.589L407.964 988.96L407.731 990.063L409.687 990.477ZM416.523 986.525L417.142 984.623L416.07 984.274L415.217 985.01L416.523 986.525ZM419.97 987.647L419.35 989.549L420.521 989.93L421.388 989.057L419.97 987.647ZM426.197 976.874L428.128 977.396L428.449 976.209L427.534 975.386L426.197 976.874ZM423.5 974.448L421.534 974.077L421.326 975.183L422.162 975.935L423.5 974.448ZM423.5 966.552L422.162 965.064L421.326 965.817L421.534 966.923L423.5 966.552ZM426.197 964.126L427.534 965.613L428.449 964.791L428.128 963.603L426.197 964.126ZM419.97 953.352L421.388 951.943L420.521 951.07L419.35 951.451L419.97 953.352ZM416.523 954.475L415.217 955.989L416.071 956.726L417.142 956.376L416.523 954.475ZM409.687 950.522L407.731 950.937L407.964 952.039L409.028 952.411L409.687 950.522ZM408.936 946.976L410.892 946.561L410.637 945.356L409.446 945.042L408.936 946.976ZM396.494 946.975L395.984 945.041L394.793 945.355L394.537 946.561L396.494 946.975ZM395.743 950.521L396.401 952.41L397.465 952.039L397.699 950.936L395.743 950.521ZM384.839 955.254L388.286 956.376L389.524 952.573L386.078 951.45L384.839 955.254ZM381.161 964.647C382.187 960.86 384.186 957.469 386.877 954.762L384.04 951.942C380.871 955.13 378.512 959.128 377.3 963.601L381.161 964.647ZM383.265 965.063L380.568 962.637L377.893 965.611L380.591 968.037L383.265 965.063ZM383.56 970.5C383.56 969.275 383.675 968.079 383.893 966.921L379.963 966.179C379.698 967.58 379.56 969.025 379.56 970.5H383.56ZM383.893 974.079C383.675 972.921 383.56 971.725 383.56 970.5H379.56C379.56 971.975 379.698 973.42 379.963 974.821L383.893 974.079ZM380.568 978.362L383.265 975.937L380.591 972.963L377.893 975.388L380.568 978.362ZM386.877 986.238C384.186 983.53 382.187 980.14 381.161 976.352L377.3 977.398C378.512 981.872 380.871 985.869 384.04 989.057L386.877 986.238ZM388.286 984.624L384.839 985.746L386.078 989.549L389.524 988.427L388.286 984.624ZM396.401 988.59C394.11 987.79 392.015 986.566 390.211 985.011L387.599 988.04C389.776 989.918 392.309 991.398 395.084 992.366L396.401 988.59ZM398.45 993.61L397.699 990.063L393.786 990.893L394.537 994.439L398.45 993.61ZM402.714 992.827C400.738 992.827 398.824 992.57 397.004 992.09L395.984 995.958C398.134 996.525 400.39 996.827 402.714 996.827V992.827ZM408.426 992.09C406.605 992.57 404.691 992.827 402.714 992.827V996.827C405.038 996.827 407.295 996.525 409.446 995.958L408.426 992.09ZM407.731 990.063L406.979 993.609L410.892 994.438L411.644 990.892L407.731 990.063ZM415.217 985.01C413.414 986.565 411.319 987.789 409.028 988.589L410.346 992.365C413.121 991.397 415.652 989.917 417.829 988.039L415.217 985.01ZM420.589 985.745L417.142 984.623L415.904 988.426L419.35 989.549L420.589 985.745ZM424.267 976.351C423.241 980.139 421.242 983.53 418.551 986.237L421.388 989.057C424.557 985.868 426.916 981.87 428.128 977.396L424.267 976.351ZM422.162 975.935L424.86 978.361L427.534 975.386L424.837 972.961L422.162 975.935ZM421.868 970.5C421.868 971.724 421.753 972.92 421.534 974.077L425.465 974.819C425.729 973.418 425.868 971.974 425.868 970.5H421.868ZM421.534 966.923C421.753 968.08 421.868 969.276 421.868 970.5H425.868C425.868 969.025 425.729 967.581 425.465 966.18L421.534 966.923ZM424.86 962.639L422.162 965.064L424.837 968.039L427.534 965.613L424.86 962.639ZM418.551 954.762C421.242 957.47 423.241 960.861 424.267 964.649L428.128 963.603C426.916 959.129 424.557 955.131 421.388 951.943L418.551 954.762ZM417.142 956.376L420.589 955.254L419.35 951.451L415.904 952.573L417.142 956.376ZM409.028 952.411C411.319 953.21 413.414 954.434 415.217 955.989L417.829 952.96C415.653 951.083 413.121 949.602 410.346 948.634L409.028 952.411ZM406.979 947.39L407.731 950.937L411.644 950.108L410.892 946.561L406.979 947.39ZM402.714 948.173C404.691 948.173 406.605 948.429 408.426 948.91L409.446 945.042C407.295 944.475 405.038 944.173 402.714 944.173V948.173ZM397.004 948.909C398.824 948.429 400.738 948.173 402.714 948.173V944.173C400.39 944.173 398.134 944.474 395.984 945.041L397.004 948.909ZM397.699 950.936L398.45 947.39L394.537 946.561L393.786 950.107L397.699 950.936ZM390.211 955.989C392.015 954.433 394.11 953.209 396.401 952.41L395.084 948.633C392.309 949.601 389.776 951.082 387.599 952.96L390.211 955.989Z"
                mask="url(#implant_85)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle className="st44" cx="402.5" cy="970.5" r="28.5"></circle>
            <path
              className="st45"
              d="M400.577 961.739C401.129 959.804 403.871 959.804 404.423 961.739L404.929 963.511C405.225 964.549 406.291 965.164 407.338 964.902L409.126 964.454C411.077 963.965 412.448 966.339 411.049 967.785L409.767 969.109C409.016 969.884 409.016 971.116 409.767 971.891L411.049 973.215C412.448 974.661 411.077 977.035 409.126 976.546L407.338 976.098C406.291 975.836 405.225 976.451 404.929 977.489L404.423 979.261C403.871 981.196 401.129 981.196 400.577 979.261L400.071 977.489C399.775 976.451 398.709 975.836 397.662 976.098L395.874 976.546C393.923 977.035 392.552 974.661 393.951 973.215L395.233 971.891C395.984 971.116 395.984 969.884 395.233 969.109L393.951 967.785C392.552 966.339 393.923 963.965 395.874 964.454L397.662 964.902C398.709 965.164 399.775 964.549 400.071 963.511L400.577 961.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth85Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth85Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M335.8 962.7C335.2 966.7 334.3 970.7 334.1 974.8C333.7 982.4 335.6 990.1 339.6 997.1C342.5 1002.1 346.4 1006.9 351.9 1010.4C355.8 1012.9 360.2 1014.6 364.8 1016.3C371.3 1018.6 378 1020.7 385.1 1021.7C392.3 1022.7 399.6 1022.4 406.8 1022.1C413.2 1021.8 419.6 1021.5 425.9 1020.6C430.6 1019.9 435.3 1018.8 439.6 1017.2C443.6 1015.7 447.2 1013.8 450.7 1011.8C455.7 1008.8 460.2 1005.4 463.5 1001.2C467 996.9 468.9 991.9 470.3 986.9C472.8 978.5 474.2 969.8 473.2 961.1C472.5 955 470.7 948.9 467.2 943.3C463.4 937.3 457.8 932.1 450.4 928.5C442.8 924.8 433.8 923.1 424.8 922.5C420.2 922.2 415.5 922.1 411.1 923C407.7 923.7 404.6 925 401 925.1C398.4 925.1 395.9 924.4 393.4 923.8C388.5 922.6 383.4 921.9 378.3 921.6C373.3 921.3 368.2 921.2 363.3 921.9C357.6 922.7 352.2 924.5 347.7 927.3C344.2 929.6 341.5 932.3 339.9 935.6C338.4 938.6 338 941.9 337.6 945.1C337.1 950.8 336.7 956.7 335.8 962.7Z"
            ></path>
            <path
              className="st47"
              d="M355.256 964.866C354.826 967.757 354.181 970.647 354.038 973.61C353.751 979.102 355.113 984.667 357.981 989.725C360.06 993.339 362.856 996.807 366.799 999.337C369.596 1001.14 372.75 1002.37 376.048 1003.6C380.708 1005.26 385.512 1006.78 390.602 1007.5C395.765 1008.23 400.998 1008.01 406.161 1007.79C410.749 1007.57 415.338 1007.36 419.854 1006.71C423.224 1006.2 426.594 1005.41 429.677 1004.25C432.545 1003.17 435.126 1001.79 437.635 1000.35C441.22 998.18 444.446 995.723 446.812 992.688C449.322 989.581 450.684 985.968 451.688 982.354C453.48 976.284 454.484 969.997 453.767 963.71C453.265 959.302 451.974 954.894 449.465 950.847C446.741 946.511 442.726 942.753 437.42 940.152C431.971 937.478 425.518 936.249 419.066 935.816C415.768 935.599 412.398 935.527 409.243 936.177C406.806 936.683 404.583 937.622 402.002 937.695C400.138 937.695 398.346 937.189 396.553 936.755C393.04 935.888 389.384 935.382 385.727 935.165C382.142 934.949 378.486 934.876 374.973 935.382C370.886 935.96 367.014 937.261 363.788 939.284C361.279 940.947 359.343 942.898 358.196 945.282C357.12 947.45 356.834 949.835 356.547 952.148C356.188 956.267 355.902 960.53 355.256 964.866Z"
            ></path>
            <circle className="st45" cx="403" cy="970" r="13"></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth85Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M335.8 962.7C335.2 966.7 334.3 970.7 334.1 974.8C333.7 982.4 335.6 990.1 339.6 997.1C342.5 1002.1 346.4 1006.9 351.9 1010.4C355.8 1012.9 360.2 1014.6 364.8 1016.3C371.3 1018.6 378 1020.7 385.1 1021.7C392.3 1022.7 399.6 1022.4 406.8 1022.1C413.2 1021.8 419.6 1021.5 425.9 1020.6C430.6 1019.9 435.3 1018.8 439.6 1017.2C443.6 1015.7 447.2 1013.8 450.7 1011.8C455.7 1008.8 460.2 1005.4 463.5 1001.2C467 996.9 468.9 991.9 470.3 986.9C472.8 978.5 474.2 969.8 473.2 961.1C472.5 955 470.7 948.9 467.2 943.3C463.4 937.3 457.8 932.1 450.4 928.5C442.8 924.8 433.8 923.1 424.8 922.5C420.2 922.2 415.5 922.1 411.1 923C407.7 923.7 404.6 925 401 925.1C398.4 925.1 395.9 924.4 393.4 923.8C388.5 922.6 383.4 921.9 378.3 921.6C373.3 921.3 368.2 921.2 363.3 921.9C357.6 922.7 352.2 924.5 347.7 927.3C344.2 929.6 341.5 932.3 339.9 935.6C338.4 938.6 338 941.9 337.6 945.1C337.1 950.8 336.7 956.7 335.8 962.7Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st56 hIntact"
              d="M354.281 965.275C353.842 968.206 353.184 971.136 353.038 974.139C352.745 979.707 354.135 985.347 357.06 990.475C359.181 994.138 362.033 997.654 366.055 1000.22C368.907 1002.05 372.125 1003.29 375.489 1004.54C380.242 1006.22 385.142 1007.76 390.334 1008.5C395.599 1009.23 400.938 1009.01 406.203 1008.79C410.884 1008.57 415.564 1008.35 420.171 1007.69C423.608 1007.18 427.045 1006.37 430.19 1005.2C433.115 1004.1 435.748 1002.71 438.307 1001.24C441.964 999.046 445.255 996.555 447.668 993.479C450.227 990.329 451.617 986.666 452.641 983.003C454.469 976.85 455.493 970.477 454.762 964.103C454.25 959.635 452.933 955.166 450.374 951.064C447.595 946.669 443.5 942.859 438.088 940.222C432.53 937.512 425.948 936.266 419.367 935.827C416.003 935.607 412.566 935.534 409.348 936.193C406.861 936.706 404.594 937.658 401.962 937.732C400.06 937.732 398.232 937.219 396.404 936.779C392.82 935.9 389.091 935.387 385.361 935.168C381.705 934.948 377.975 934.875 374.392 935.387C370.223 935.973 366.274 937.292 362.983 939.343C360.424 941.028 358.449 943.006 357.279 945.423C356.182 947.621 355.89 950.038 355.597 952.383C355.232 956.558 354.939 960.88 354.281 965.275Z"
              style={{ visibility: 'inherit' }}
            />
            <circle
              className="st57"
              r="13"
              transform="matrix(-1 0 0 1 402.736 970)"
              style={{ fill: 'black', opacity: tooth85Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth85Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth85Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M335.8 962.7C335.2 966.7 334.3 970.7 334.1 974.8C333.7 982.4 335.6 990.1 339.6 997.1C342.5 1002.1 346.4 1006.9 351.9 1010.4C355.8 1012.9 360.2 1014.6 364.8 1016.3C371.3 1018.6 378 1020.7 385.1 1021.7C392.3 1022.7 399.6 1022.4 406.8 1022.1C413.2 1021.8 419.6 1021.5 425.9 1020.6C430.6 1019.9 435.3 1018.8 439.6 1017.2C443.6 1015.7 447.2 1013.8 450.7 1011.8C455.7 1008.8 460.2 1005.4 463.5 1001.2C467 996.9 468.9 991.9 470.3 986.9C472.8 978.5 474.2 969.8 473.2 961.1C472.5 955 470.7 948.9 467.2 943.3C463.4 937.3 457.8 932.1 450.4 928.5C442.8 924.8 433.8 923.1 424.8 922.5C420.2 922.2 415.5 922.1 411.1 923C407.7 923.7 404.6 925 401 925.1C398.4 925.1 395.9 924.4 393.4 923.8C388.5 922.6 383.4 921.9 378.3 921.6C373.3 921.3 368.2 921.2 363.3 921.9C357.6 922.7 352.2 924.5 347.7 927.3C344.2 929.6 341.5 932.3 339.9 935.6C338.4 938.6 338 941.9 337.6 945.1C337.1 950.8 336.7 956.7 335.8 962.7Z"
            ></path>
            <path
              className="st47"
              d="M355.256 964.866C354.826 967.757 354.181 970.647 354.038 973.61C353.751 979.102 355.113 984.667 357.981 989.725C360.06 993.339 362.856 996.807 366.799 999.337C369.596 1001.14 372.75 1002.37 376.048 1003.6C380.708 1005.26 385.512 1006.78 390.602 1007.5C395.765 1008.23 400.998 1008.01 406.161 1007.79C410.749 1007.57 415.338 1007.36 419.854 1006.71C423.224 1006.2 426.594 1005.41 429.677 1004.25C432.545 1003.17 435.126 1001.79 437.635 1000.35C441.22 998.18 444.446 995.723 446.812 992.688C449.322 989.581 450.684 985.968 451.688 982.354C453.48 976.284 454.484 969.997 453.767 963.71C453.265 959.302 451.974 954.894 449.465 950.847C446.741 946.511 442.726 942.753 437.42 940.152C431.971 937.478 425.518 936.249 419.066 935.816C415.768 935.599 412.398 935.527 409.243 936.177C406.806 936.683 404.583 937.622 402.002 937.695C400.138 937.695 398.346 937.189 396.553 936.755C393.04 935.888 389.384 935.382 385.727 935.165C382.142 934.949 378.486 934.876 374.973 935.382C370.886 935.96 367.014 937.261 363.788 939.284C361.279 940.947 359.343 942.898 358.196 945.282C357.12 947.45 356.834 949.835 356.547 952.148C356.188 956.267 355.902 960.53 355.256 964.866Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth85Diagnozis.culttab &&
                !tooth85Diagnozis.abutment &&
                !tooth85Diagnozis.implant &&
                !tooth85Diagnozis.apex &&
                !tooth85Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M480.6,953.8c-0.7-8.8-2.6-17.4-6.4-25.4c-0.4-0.8-0.8-1.5-1.2-2.3
                            c-4-7.5-9.7-14.1-17-18.7c-8.3-5.2-18.1-7.5-27.9-8.3c-5-0.4-10.1-0.5-15,0.9c-3.7,1.1-7.2,3-11,3.1c-2.9,0-5.6-1-8.3-1.8
                            c-5.4-1.6-10.9-2.5-16.5-3c-5.5-0.4-11-0.4-16.4,0.6c-6.3,1.2-12.2,3.8-17.1,7.9c-1.6,1.4-3.1,2.9-4.4,4.5
                            c-1.8,2.2-3.2,4.7-4.2,7.4c-1.7,4.3-2.2,9-2.6,13.5c-0.8,8.5-1.3,16.9-2.3,25.4c-0.7,5.8-1.8,11.5-2,17.3
                            c-0.5,10.9,1.5,21.8,5.8,31.8c0.5,1.3,1.1,2.5,1.8,3.8c2.9,5.7,6.6,11,11.6,15c4.2,3.5,9.1,6,14,8.2c7.1,3.3,14.4,6.2,22.1,7.4
                            c7.8,1.3,15.8,0.8,23.8,0.3c7-0.4,14-0.9,20.9-2.3c5.2-1.1,10.3-2.7,15-5c4.4-2.1,8.4-4.9,12.2-7.9c1.1-0.9,2.2-1.8,3.3-2.7
                            c4.2-3.7,8-7.8,10.9-12.5c3.8-6.2,6-13.3,7.7-20.4C479.9,978.6,481.5,966.2,480.6,953.8z"
            ></path>
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth85.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M328.828 957.296C328.157 963.675 326.083 970.054 325.859 976.592C325.592 983.828 324.31 991.12 325.828 998.197C326.854 1002.98 327.138 1007.66 328.941 1012.16C332.184 1020.13 337.477 1029.11 343.627 1034.69C347.988 1038.67 351.839 1037.71 356.983 1040.42C360.074 1041.98 367.478 1045.84 370.667 1047.17C374.977 1048.98 379.392 1048.79 383.955 1049.71C388.052 1050.52 392.179 1049.47 396.304 1049.49C400.286 1049.5 404.266 1051.22 408.22 1050.99C411.909 1050.74 415.598 1048.17 419.271 1047.8C422.725 1047.44 426.164 1049.33 429.577 1048.63C434.833 1047.52 442.088 1044.4 446.897 1041.85C451.369 1039.46 453.395 1041.79 457.308 1038.6C460.04 1036.26 461.638 1033.41 464.011 1030.7C466.496 1027.85 471.734 1022.12 473.621 1018.69C477.535 1011.84 477.659 1003.86 479.225 995.889C480.548 989.547 481.596 983.098 482.214 976.592C482.901 969.356 485.057 962.05 484.468 954.744C484.076 949.877 485.377 945.01 484.285 940.243C483.195 935.482 479.851 930.82 477.895 926.357C475.939 921.951 474.624 917.817 471.815 914.077C468.522 909.693 464.643 904.531 460.178 901.433C456.414 898.82 449.138 898.153 444.897 896.666C439.561 894.796 433.954 892.398 428.347 891.865C423.204 891.386 417.948 891.227 413.028 892.662C409.226 893.778 405.76 894.851 401.734 895.011C398.827 895.011 396.032 894.895 393.236 893.938C387.757 892.024 382.054 889.587 376.351 889.109C370.76 888.63 365.058 889.791 359.579 890.908C356.451 891.534 353.404 893.864 350.518 895.258C347.521 896.705 344.698 897.245 342.135 899.519C338.221 903.188 334.134 908.814 332.345 914.077C330.667 918.861 331.288 924.124 330.841 929.227C329.214 938.317 329.947 947.727 328.828 957.296ZM333.834 974.8C334.034 970.7 334.934 966.7 335.534 962.7C336.534 956.7 336.834 950.8 337.334 945.1L337.347 944.996C337.743 941.829 338.15 938.567 339.634 935.6C341.234 932.3 343.934 929.6 347.434 927.3C351.934 924.5 357.334 922.7 363.034 921.9C367.934 921.2 373.034 921.3 378.034 921.6C383.134 921.9 388.234 922.6 393.134 923.8C395.634 924.4 398.134 925.1 400.734 925.1C404.334 925 407.434 923.7 410.834 923C415.234 922.1 419.934 922.2 424.534 922.5C433.534 923.1 442.534 924.8 450.134 928.5C457.534 932.1 463.134 937.3 466.934 943.3C470.434 948.9 472.234 955 472.934 961.1C473.934 969.8 472.534 978.5 470.034 986.9C468.634 991.9 466.734 996.9 463.234 1001.2C459.934 1005.4 455.434 1008.8 450.434 1011.8C446.934 1013.8 443.334 1015.7 439.334 1017.2C435.034 1018.8 430.334 1019.9 425.634 1020.6C419.334 1021.5 412.934 1021.8 406.534 1022.1C399.334 1022.4 392.034 1022.7 384.834 1021.7C377.734 1020.7 371.034 1018.6 364.534 1016.3C359.934 1014.6 355.534 1012.9 351.634 1010.4C346.134 1006.9 342.234 1002.1 339.334 997.1C335.334 990.1 333.434 982.4 333.834 974.8Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M328.828 957.296C328.157 963.675 326.083 970.054 325.859 976.592C325.592 983.828 324.31 991.12 325.828 998.197C326.854 1002.98 327.138 1007.66 328.941 1012.16C332.184 1020.13 337.477 1029.11 343.627 1034.69C347.988 1038.67 351.839 1037.71 356.983 1040.42C360.074 1041.98 367.478 1045.84 370.667 1047.17C374.977 1048.98 379.392 1048.79 383.955 1049.71C388.052 1050.52 392.179 1049.47 396.304 1049.49C400.286 1049.5 404.266 1051.22 408.22 1050.99C411.909 1050.74 415.598 1048.17 419.271 1047.8C422.725 1047.44 426.164 1049.33 429.577 1048.63C434.833 1047.52 442.088 1044.4 446.897 1041.85C451.369 1039.46 453.395 1041.79 457.308 1038.6C460.04 1036.26 461.638 1033.41 464.011 1030.7C466.496 1027.85 471.734 1022.12 473.621 1018.69C477.535 1011.84 477.659 1003.86 479.225 995.889C480.548 989.547 481.596 983.098 482.214 976.592C482.901 969.356 485.057 962.05 484.468 954.744C484.076 949.877 485.377 945.01 484.285 940.243C483.195 935.482 479.851 930.82 477.895 926.357C475.939 921.951 474.624 917.817 471.815 914.077C468.522 909.693 464.643 904.531 460.178 901.433C456.414 898.82 449.138 898.153 444.897 896.666C439.561 894.796 433.954 892.398 428.347 891.865C423.204 891.386 417.948 891.227 413.028 892.662C409.226 893.778 405.76 894.851 401.734 895.011C398.827 895.011 396.032 894.895 393.236 893.938C387.757 892.024 382.054 889.587 376.351 889.109C370.76 888.63 365.058 889.791 359.579 890.908C356.451 891.534 353.404 893.864 350.518 895.258C347.521 896.705 344.698 897.245 342.135 899.519C338.221 903.188 334.134 908.814 332.345 914.077C330.667 918.861 331.288 924.124 330.841 929.227C329.214 938.317 329.947 947.727 328.828 957.296ZM333.834 974.8C334.034 970.7 334.934 966.7 335.534 962.7C336.534 956.7 336.834 950.8 337.334 945.1L337.347 944.996C337.743 941.829 338.15 938.567 339.634 935.6C341.234 932.3 343.934 929.6 347.434 927.3C351.934 924.5 357.334 922.7 363.034 921.9C367.934 921.2 373.034 921.3 378.034 921.6C383.134 921.9 388.234 922.6 393.134 923.8C395.634 924.4 398.134 925.1 400.734 925.1C404.334 925 407.434 923.7 410.834 923C415.234 922.1 419.934 922.2 424.534 922.5C433.534 923.1 442.534 924.8 450.134 928.5C457.534 932.1 463.134 937.3 466.934 943.3C470.434 948.9 472.234 955 472.934 961.1C473.934 969.8 472.534 978.5 470.034 986.9C468.634 991.9 466.734 996.9 463.234 1001.2C459.934 1005.4 455.434 1008.8 450.434 1011.8C446.934 1013.8 443.334 1015.7 439.334 1017.2C435.034 1018.8 430.334 1019.9 425.634 1020.6C419.334 1021.5 412.934 1021.8 406.534 1022.1C399.334 1022.4 392.034 1022.7 384.834 1021.7C377.734 1020.7 371.034 1018.6 364.534 1016.3C359.934 1014.6 355.534 1012.9 351.634 1010.4C346.134 1006.9 342.234 1002.1 339.334 997.1C335.334 990.1 333.434 982.4 333.834 974.8Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M337.336 945.101C336.836 950.801 336.536 956.701 335.536 962.701C334.936 966.701 334.036 970.701 333.836 974.801C333.436 982.401 335.336 990.101 339.336 997.101C342.236 1002.1 346.136 1006.9 351.636 1010.4C355.536 1012.9 359.936 1014.6 364.536 1016.3C371.036 1018.6 377.736 1020.7 384.836 1021.7C392.036 1022.7 399.336 1022.4 406.536 1022.1C412.936 1021.8 419.336 1021.5 425.636 1020.6C430.336 1019.9 435.036 1018.8 439.336 1017.2C443.336 1015.7 446.936 1013.8 450.436 1011.8C455.436 1008.8 459.936 1005.4 463.236 1001.2C466.736 996.901 468.636 991.901 470.036 986.901C472.536 978.501 473.936 969.801 472.936 961.101C472.236 955.001 470.436 948.901 466.936 943.301C463.136 937.301 457.536 932.101 450.136 928.501C442.536 924.801 433.536 923.101 424.536 922.501C419.936 922.201 415.236 922.101 410.836 923.001C407.436 923.701 404.336 925.001 400.736 925.101C398.136 925.101 395.636 924.401 393.136 923.801C388.236 922.601 383.136 921.901 378.036 921.601C373.036 921.301 367.936 921.201 363.036 921.901C357.336 922.701 351.936 924.501 347.436 927.301C343.936 929.601 341.236 932.301 339.636 935.601C338.153 938.568 337.745 941.829 337.349 944.997M337.336 945.101L337.349 944.997M337.336 945.101C337.341 945.066 337.345 945.031 337.349 944.997M332.668 960.912C332.04 965.743 330.098 970.574 329.889 975.526C329.639 981.005 331.247 986.527 332.668 991.887C333.628 995.506 332.958 999.05 334.646 1002.46C337.682 1008.5 340.764 1015.29 346.521 1019.52C350.604 1022.54 354.209 1025.59 359.024 1027.65C361.918 1028.83 368.849 1027.96 371.834 1028.98C375.869 1030.34 380.002 1032.47 384.274 1033.17C388.109 1033.78 391.972 1032.99 395.834 1033C399.561 1033.01 403.287 1035.83 406.988 1035.65C410.442 1035.46 413.895 1034.28 417.334 1033.99C420.567 1033.72 423.786 1031.37 426.982 1030.84C431.901 1029.99 436.821 1030.67 441.322 1028.73C445.509 1026.92 449.278 1022.63 452.941 1020.21C455.498 1018.44 457.93 1018.56 460.152 1016.5C462.478 1014.35 464.573 1010 466.34 1007.41C470.004 1002.22 471.992 996.178 473.458 990.139C474.697 985.336 475.677 980.452 476.256 975.526C476.899 970.046 477.045 964.513 476.493 958.98C476.127 955.294 475.472 951.609 474.45 947.999C473.43 944.393 474.044 940.862 472.213 937.483C470.382 934.147 469.151 931.015 466.521 928.183C463.439 924.863 459.807 920.955 455.627 918.608C452.104 916.629 445.293 916.124 441.322 914.998C436.327 913.582 431.079 911.766 425.83 911.362C421.015 911 416.095 910.879 411.489 911.966C407.93 912.811 404.686 914.381 400.917 914.502C398.196 914.502 395.579 913.657 392.962 912.932C387.833 911.483 382.494 909.638 377.156 909.275C371.922 908.913 366.583 909.792 361.454 910.638C358.526 911.112 355.674 912.877 352.972 913.932C350.167 915.028 347.524 915.437 345.125 917.159C341.461 919.937 337.635 924.198 335.96 928.183C334.39 931.806 334.971 935.792 334.552 939.657C333.029 946.541 333.715 953.666 332.668 960.912Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth85Diagnozis.culttab &&
                !tooth85Diagnozis.abutment &&
                !tooth85Diagnozis.implant &&
                !tooth85Diagnozis.shaper &&
                !tooth85Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС ЦЕНТР*/}
            <g
              id="s_header_85_5"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M362.4,987.9c2.3,3.3,5.3,6.1,9,8.6c12,8.2,30.7,11.1,43,9.2c8.1-1.3,16.8-8.7,22.9-17
                                c3.2-4.3,5.6-8.8,6.9-12.8c2.9-8.8,2.1-19.7-3.8-27.3c-2-2.6-4.5-4.8-7.7-6.4c-8.9-4.5-18.6-4.5-28.3-4.1c-3.5,0.1-7,0.4-10.4,0.5
                                c-11.1,0.5-22.7,3.6-29.6,12c-1.9,2.4-3.5,5.2-4.6,8.5C356,971,357.3,980.4,362.4,987.9z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth85.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth85.seal_center ? `seal-fill ${teethDiagnozis.tooth85.seal_center_color}` : ''}
                                `}
                d="M362.4,987.9c2.3,3.3,5.3,6.1,9,8.6c12,8.2,30.7,11.1,43,9.2c8.1-1.3,16.8-8.7,22.9-17
                                c3.2-4.3,5.6-8.8,6.9-12.8c2.9-8.8,2.1-19.7-3.8-27.3c-2-2.6-4.5-4.8-7.7-6.4c-8.9-4.5-18.6-4.5-28.3-4.1c-3.5,0.1-7,0.4-10.4,0.5
                                c-11.1,0.5-22.7,3.6-29.6,12c-1.9,2.4-3.5,5.2-4.6,8.5C356,971,357.3,980.4,362.4,987.9z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_85_4"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M437.3,988.7c2.3,2.4,6.3,6.9,10.9,14.3c4.3,6.9,8,15,10.3,20.6c4.2-3.7,8-7.8,10.9-12.5
                                c3.8-6.2,6-13.3,7.7-20.4c2.9-12.1,4.4-24.5,3.5-36.8c-0.7-8.8-2.6-17.4-6.4-25.4c-0.4-0.8-0.8-1.5-1.2-2.3
                                c-3,3.4-7.6,7.7-13.9,11.8c-7.5,4.9-14.2,8.5-18.7,10.7c5.8,7.6,6.6,18.5,3.8,27.3C442.9,979.9,440.5,984.4,437.3,988.7z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth85.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth85.seal_right ? `seal-fill ${teethDiagnozis.tooth85.seal_right_color}` : ''}
                                `}
                d="M437.3,988.7c2.3,2.4,6.3,6.9,10.9,14.3c4.3,6.9,8,15,10.3,20.6c4.2-3.7,8-7.8,10.9-12.5
                                c3.8-6.2,6-13.3,7.7-20.4c2.9-12.1,4.4-24.5,3.5-36.8c-0.7-8.8-2.6-17.4-6.4-25.4c-0.4-0.8-0.8-1.5-1.2-2.3
                                c-3,3.4-7.6,7.7-13.9,11.8c-7.5,4.9-14.2,8.5-18.7,10.7c5.8,7.6,6.6,18.5,3.8,27.3C442.9,979.9,440.5,984.4,437.3,988.7z"
              />
            </g>
            <g
              id="s_header_85_3"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M339.4,911.4c3.4,4.5,10.2,13.6,14.5,20.1c3.7,5.6,7.6,12.4,10.6,19c6.9-8.4,18.5-11.5,29.6-12
                                c3.4-0.1,6.9-0.3,10.4-0.5c9.7-0.4,19.3-0.3,28.3,4.1c3.2,1.6,5.8,3.8,7.7,6.4c4.5-2.2,11.2-5.8,18.7-10.7
                                c6.3-4.1,10.8-8.4,13.9-11.8c-4-7.5-9.7-14.1-17-18.7c-8.3-5.2-18.1-7.5-27.9-8.3c-5-0.4-10.1-0.5-15,0.9c-3.7,1.1-7.2,3-11,3.1
                                c-2.9,0-5.6-1-8.3-1.8c-5.4-1.6-10.9-2.5-16.5-3c-5.5-0.4-11-0.4-16.4,0.6c-6.3,1.2-12.2,3.8-17.1,7.9
                                C342.2,908.3,340.7,909.8,339.4,911.4z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth85.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth85.seal_top ? `seal-fill ${teethDiagnozis.tooth85.seal_top_color}` : ''}
                                `}
                d="M339.4,911.4c3.4,4.5,10.2,13.6,14.5,20.1c3.7,5.6,7.6,12.4,10.6,19c6.9-8.4,18.5-11.5,29.6-12
                                c3.4-0.1,6.9-0.3,10.4-0.5c9.7-0.4,19.3-0.3,28.3,4.1c3.2,1.6,5.8,3.8,7.7,6.4c4.5-2.2,11.2-5.8,18.7-10.7
                                c6.3-4.1,10.8-8.4,13.9-11.8c-4-7.5-9.7-14.1-17-18.7c-8.3-5.2-18.1-7.5-27.9-8.3c-5-0.4-10.1-0.5-15,0.9c-3.7,1.1-7.2,3-11,3.1
                                c-2.9,0-5.6-1-8.3-1.8c-5.4-1.6-10.9-2.5-16.5-3c-5.5-0.4-11-0.4-16.4,0.6c-6.3,1.2-12.2,3.8-17.1,7.9
                                C342.2,908.3,340.7,909.8,339.4,911.4z"
              />
            </g>
            {/*КАРИЕС НИЗ*/}
            <g
              id="s_header_85_3"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M334,1006.8c0.5,1.3,1.1,2.5,1.8,3.8c8.2-12.9,19.7-19.6,26.7-22.7c-5.2-7.4-6.4-16.9-2.5-28.9
                                c1.1-3.3,2.6-6.1,4.6-8.5c-3-6.6-6.9-13.5-10.6-19c-4.2-6.4-11-15.5-14.5-20.1c-1.8,2.2-3.2,4.7-4.2,7.4c-1.7,4.3-2.2,9-2.6,13.5
                                c-0.8,8.5-1.3,16.9-2.3,25.4c-0.7,5.8-1.8,11.5-2,17.3C327.7,985.9,329.7,996.7,334,1006.8z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth85.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth85.seal_left ? `seal-fill ${teethDiagnozis.tooth85.seal_left_color}` : ''}
                                `}
                d="M334,1006.8c0.5,1.3,1.1,2.5,1.8,3.8c8.2-12.9,19.7-19.6,26.7-22.7c-5.2-7.4-6.4-16.9-2.5-28.9
                                c1.1-3.3,2.6-6.1,4.6-8.5c-3-6.6-6.9-13.5-10.6-19c-4.2-6.4-11-15.5-14.5-20.1c-1.8,2.2-3.2,4.7-4.2,7.4c-1.7,4.3-2.2,9-2.6,13.5
                                c-0.8,8.5-1.3,16.9-2.3,25.4c-0.7,5.8-1.8,11.5-2,17.3C327.7,985.9,329.7,996.7,334,1006.8z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_85_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M335.7,1010.5c2.9,5.7,6.6,11,11.6,15c4.2,3.5,9.1,6,14,8.2c7.1,3.3,14.4,6.2,22.1,7.4
                                c7.8,1.3,15.8,0.8,23.8,0.3c7-0.5,14-0.9,20.9-2.4c5.2-1.1,10.3-2.7,15-5c4.4-2.1,8.4-4.9,12.2-7.9c1.1-0.9,2.2-1.8,3.3-2.7
                                c-2.3-5.6-6-13.7-10.3-20.6c-4.6-7.4-8.6-11.9-10.9-14.3c-6.1,8.3-14.8,15.8-22.9,17c-12.3,1.9-31-1-43-9.2
                                c-3.7-2.5-6.7-5.4-9-8.6C355.4,990.9,344,997.6,335.7,1010.5z"
              />
              <path
                className={`
                                    st8 target caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth85.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth85.seal_bottom ? `seal-fill ${teethDiagnozis.tooth85.seal_bottom_color}` : ''}
                                `}
                d="M335.7,1010.5c2.9,5.7,6.6,11,11.6,15c4.2,3.5,9.1,6,14,8.2c7.1,3.3,14.4,6.2,22.1,7.4
                                c7.8,1.3,15.8,0.8,23.8,0.3c7-0.5,14-0.9,20.9-2.4c5.2-1.1,10.3-2.7,15-5c4.4-2.1,8.4-4.9,12.2-7.9c1.1-0.9,2.2-1.8,3.3-2.7
                                c-2.3-5.6-6-13.7-10.3-20.6c-4.6-7.4-8.6-11.9-10.9-14.3c-6.1,8.3-14.8,15.8-22.9,17c-12.3,1.9-31-1-43-9.2
                                c-3.7-2.5-6.7-5.4-9-8.6C355.4,990.9,344,997.6,335.7,1010.5z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_left &&
                      !tooth85Diagnozis.seal_bottom) ||
                    (!tooth85Diagnozis.seal_left &&
                      tooth85Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M362.5 988C357.333 989.333 345.4 994.8 339 1006"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_left &&
                      !tooth85Diagnozis.seal_center) ||
                    (!tooth85Diagnozis.seal_left &&
                      tooth85Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M362.5 988C354 979.5 356.1 957.7 364.5 950.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_left &&
                      !tooth85Diagnozis.seal_top) ||
                    (!tooth85Diagnozis.seal_left && tooth85Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M364.5 950.5C363 944.667 356.6 929.6 343 916"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_center &&
                      !tooth85Diagnozis.seal_top) ||
                    (!tooth85Diagnozis.seal_center && tooth85Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M364.5 950.5C377 936.001 428.5 933.7 440.5 948.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_right &&
                      !tooth85Diagnozis.seal_top) ||
                    (!tooth85Diagnozis.seal_right && tooth85Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M440.5 948.5C445 947 457 941.3 469 930.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth85Diagnozis.seal_right &&
                      tooth85Diagnozis.seal_center) ||
                    (tooth85Diagnozis.seal_right &&
                      !tooth85Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M440.5 948.5C447.5 956 444.7 973.3 437.5 988.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_right &&
                      !tooth85Diagnozis.seal_bottom) ||
                    (!tooth85Diagnozis.seal_right &&
                      tooth85Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M438 989C446.27 997.947 450.941 1006.79 456 1019"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_center &&
                      !tooth85Diagnozis.seal_bottom) ||
                    (!tooth85Diagnozis.seal_center &&
                      tooth85Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M437.5 988.5C421.5 1011 375.3 1003.9 362.5 987.5"
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
                visibility: tooth85Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth85Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth85Diagnozis.vinir_color}`}
                d="M477.202 990.7C475.502 997.8 473.402 1004.9 469.502 1011.1C466.602 1015.8 462.802 1019.9 458.602 1023.6L455.302 1026.3C451.502 1029.3 447.502 1032 443.102 1034.2C438.302 1036.5 433.302 1038.1 428.102 1039.2C421.202 1040.6 414.202 1041.1 407.202 1041.5C399.302 1042 391.302 1042.5 383.402 1041.2C375.702 1039.9 368.402 1037 361.302 1033.8C356.402 1031.5 351.502 1029 347.302 1025.6C342.402 1021.5 338.602 1016.3 335.702 1010.6C335.103 1009.4 334.505 1008.1 333.906 1006.81L333.902 1006.8C329.702 996.7 327.702 985.9 328.302 975C328.441 972.319 328.729 969.658 329.068 967C331.861 967.5 337.611 969.4 338.274 973C338.243 973.439 338.216 973.879 338.193 974.319C337.671 983.862 339.412 993.317 343.068 1002.16L343.071 1002.16C343.592 1003.3 344.114 1004.44 344.636 1005.49C347.16 1010.48 350.469 1015.03 354.735 1018.62C358.391 1021.6 362.657 1023.78 366.923 1025.8C373.105 1028.6 379.46 1031.14 386.164 1032.28C393.042 1033.41 400.007 1032.98 406.885 1032.54C412.979 1032.19 419.074 1031.75 425.081 1030.52C429.608 1029.56 433.961 1028.16 438.14 1026.15C441.971 1024.22 445.453 1021.86 448.762 1019.23L451.635 1016.87C455.291 1013.63 458.6 1010.04 461.125 1005.92C464.52 1000.5 466.348 994.28 467.828 988.064C468.232 986.385 468.604 984.696 468.942 983C469.726 979.4 476.381 978.5 479.611 978.5C478.991 982.602 478.175 986.673 477.202 990.7Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth85Diagnozis.temporary_crown ||
                tooth85Diagnozis.ceramic_crown ||
                tooth85Diagnozis.mceramic_crown ||
                tooth85Diagnozis.metalic_crown ||
                tooth85Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth85Diagnozis.temporary_crown ||
                tooth85Diagnozis.ceramic_crown ||
                tooth85Diagnozis.mceramic_crown ||
                tooth85Diagnozis.metalic_crown ||
                tooth85Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth85Diagnozis.ceramic_crown_color}
                                ${tooth85Diagnozis.mceramic_crown_color}
                                ${tooth85Diagnozis.metalic_crown_color}
                                ${tooth85Diagnozis.zirconia_crown_color}
                            `}
              d="M480.6,953.8c-0.7-8.8-2.6-17.4-6.4-25.4c-0.4-0.8-0.8-1.5-1.2-2.3
                            c-4-7.5-9.7-14.1-17-18.7c-8.3-5.2-18.1-7.5-27.9-8.3c-5-0.4-10.1-0.5-15,0.9c-3.7,1.1-7.2,3-11,3.1c-2.9,0-5.6-1-8.3-1.8
                            c-5.4-1.6-10.9-2.5-16.5-3c-5.5-0.4-11-0.4-16.4,0.6c-6.3,1.2-12.2,3.8-17.1,7.9c-1.6,1.4-3.1,2.9-4.4,4.5
                            c-1.8,2.2-3.2,4.7-4.2,7.4c-1.7,4.3-2.2,9-2.6,13.5c-0.8,8.5-1.3,16.9-2.3,25.4c-0.7,5.8-1.8,11.5-2,17.3
                            c-0.5,10.9,1.5,21.8,5.8,31.8c0.5,1.3,1.1,2.5,1.8,3.8c2.9,5.7,6.6,11,11.6,15c4.2,3.5,9.1,6,14,8.2c7.1,3.3,14.4,6.2,22.1,7.4
                            c7.8,1.3,15.8,0.8,23.8,0.3c7-0.4,14-0.9,20.9-2.3c5.2-1.1,10.3-2.7,15-5c4.4-2.1,8.4-4.9,12.2-7.9c1.1-0.9,2.2-1.8,3.3-2.7
                            c4.2-3.7,8-7.8,10.9-12.5c3.8-6.2,6-13.3,7.7-20.4C479.9,978.6,481.5,966.2,480.6,953.8z"
            />
            <path
              className={`st3 fissure ${tooth85Diagnozis.fissure ? 'diagnoze' : tooth85Diagnozis.fissure ? 'hidden' : ''}`}
              d="M454.1,963.8c-3.8,0.4-7.7,1-11.5,1.8c-2,0.4-4.1,0.8-5.9,0c-0.1,0-0.1-0.1-0.2-0.1
                            c0-0.1,0.1-0.2,0.1-0.3l-1-0.5c0,0.1,0,0.1-0.1,0.2c-0.4-0.3-0.8-0.6-1.1-1c-1-0.9-2.1-1.9-3.5-2.2c-2.3-0.5-4.1,0.8-5.8,2
                            l-0.4,0.3c-1.7,1.2-3.6,2.1-5.4,2.7c-4.2,1.5-8.7,1.3-12.7-0.5c0.3-2.1,0.2-4.2,0-6c-0.1-0.9-0.2-1.9-0.3-2.8
                            c-0.3-2.1-0.5-4.3-0.5-6.5c0-2.7,0.5-5.4,0.9-8c0.5-3.3,1.1-6.6,0.8-10c-0.4-5.3-2.7-10.3-6.4-14l-0.8,0.8
                            c3.6,3.6,5.7,8.3,6.1,13.4c0.2,3.3-0.3,6.6-0.8,9.8c-0.4,2.6-0.9,5.4-0.9,8.1c0,2.2,0.3,4.5,0.5,6.6c0.1,0.9,0.2,1.9,0.3,2.8
                            c0.2,1.7,0.3,3.6,0,5.5c-4.8-1.7-9.8-3.1-14.8-4.2c-5.5-1.1-11.8-2.1-17.7-1c-0.5,0.1-1.1,0.2-1.6,0.3c-2.7,0.6-5.3,1.2-7.7-0.2
                            c-2.1-1.2-3.1-3.6-4.1-5.9l-0.2-0.4c-1.2-2.8-2.5-5.5-4.1-8.1l-0.9,0.6c1.5,2.6,2.9,5.2,4,8l0.2,0.4c1,2.4,2.1,5.1,4.6,6.4
                            c2.7,1.5,5.6,0.9,8.4,0.3c0.5-0.1,1.1-0.2,1.6-0.3c5.7-1.1,11.9-0.1,17.3,1c5,1,10,2.5,14.9,4.2c0,0.2-0.1,0.4-0.1,0.6
                            c-0.6,2.1-1.7,4.1-2.8,6.1c-1.3,2.3-2.7,4.6-3.1,7.2c-0.7,4.1,0.7,7.9,2,11.6c1.1,3.1,2.3,6.2,2.2,9.5c0,2-0.6,3.9-1.1,5.8
                            l-0.3,1.1c-0.6,2.2-1,4.4-1.3,6.7l1.1,0.2c0.3-2.2,0.8-4.4,1.3-6.6l0.3-1.1c0.5-2,1-4,1.1-6.1c0.1-3.4-1.1-6.7-2.3-9.9
                            c-1.4-3.7-2.7-7.3-2-11.1c0.4-2.5,1.7-4.6,3-6.9c1.2-2,2.3-4,2.9-6.3c0-0.2,0.1-0.3,0.1-0.5c2.3,1,4.8,1.5,7.2,1.5
                            c2.1,0,4.1-0.4,6.1-1.1c1.9-0.7,3.8-1.7,5.6-2.9l0.4-0.3c1.6-1.1,3.2-2.1,5-1.8c1.2,0.2,2.1,1.1,3,1.9c0.5,0.4,0.9,0.8,1.5,1.2
                            c-0.7,1.9-0.9,3.9-0.6,6c0.5,2.8,1.9,5.4,4.1,7.2l0.7-0.8c-2-1.6-3.3-3.9-3.8-6.5c-0.3-1.7-0.1-3.5,0.5-5.2c0,0,0.1,0.1,0.1,0.1
                            c2.1,1,4.4,0.5,6.6,0.1c3.8-0.7,7.6-1.3,11.4-1.8L454.1,963.8z"
            />
          </g>
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{
              visibility:
                !tooth85Diagnozis.culttab &&
                !tooth85Diagnozis.abutment &&
                !tooth85Diagnozis.implant &&
                !tooth85Diagnozis.apex &&
                !tooth85Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth85Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M454.1,963.8c-3.8,0.4-7.7,1-11.5,1.8c-2,0.4-4.1,0.8-5.9,0c-0.1,0-0.1-0.1-0.2-0.1
                            c0-0.1,0.1-0.2,0.1-0.3l-1-0.5c0,0.1,0,0.1-0.1,0.2c-0.4-0.3-0.8-0.6-1.1-1c-1-0.9-2.1-1.9-3.5-2.2c-2.3-0.5-4.1,0.8-5.8,2
                            l-0.4,0.3c-1.7,1.2-3.6,2.1-5.4,2.7c-4.2,1.5-8.7,1.3-12.7-0.5c0.3-2.1,0.2-4.2,0-6c-0.1-0.9-0.2-1.9-0.3-2.8
                            c-0.3-2.1-0.5-4.3-0.5-6.5c0-2.7,0.5-5.4,0.9-8c0.5-3.3,1.1-6.6,0.8-10c-0.4-5.3-2.7-10.3-6.4-14l-0.8,0.8
                            c3.6,3.6,5.7,8.3,6.1,13.4c0.2,3.3-0.3,6.6-0.8,9.8c-0.4,2.6-0.9,5.4-0.9,8.1c0,2.2,0.3,4.5,0.5,6.6c0.1,0.9,0.2,1.9,0.3,2.8
                            c0.2,1.7,0.3,3.6,0,5.5c-4.8-1.7-9.8-3.1-14.8-4.2c-5.5-1.1-11.8-2.1-17.7-1c-0.5,0.1-1.1,0.2-1.6,0.3c-2.7,0.6-5.3,1.2-7.7-0.2
                            c-2.1-1.2-3.1-3.6-4.1-5.9l-0.2-0.4c-1.2-2.8-2.5-5.5-4.1-8.1l-0.9,0.6c1.5,2.6,2.9,5.2,4,8l0.2,0.4c1,2.4,2.1,5.1,4.6,6.4
                            c2.7,1.5,5.6,0.9,8.4,0.3c0.5-0.1,1.1-0.2,1.6-0.3c5.7-1.1,11.9-0.1,17.3,1c5,1,10,2.5,14.9,4.2c0,0.2-0.1,0.4-0.1,0.6
                            c-0.6,2.1-1.7,4.1-2.8,6.1c-1.3,2.3-2.7,4.6-3.1,7.2c-0.7,4.1,0.7,7.9,2,11.6c1.1,3.1,2.3,6.2,2.2,9.5c0,2-0.6,3.9-1.1,5.8
                            l-0.3,1.1c-0.6,2.2-1,4.4-1.3,6.7l1.1,0.2c0.3-2.2,0.8-4.4,1.3-6.6l0.3-1.1c0.5-2,1-4,1.1-6.1c0.1-3.4-1.1-6.7-2.3-9.9
                            c-1.4-3.7-2.7-7.3-2-11.1c0.4-2.5,1.7-4.6,3-6.9c1.2-2,2.3-4,2.9-6.3c0-0.2,0.1-0.3,0.1-0.5c2.3,1,4.8,1.5,7.2,1.5
                            c2.1,0,4.1-0.4,6.1-1.1c1.9-0.7,3.8-1.7,5.6-2.9l0.4-0.3c1.6-1.1,3.2-2.1,5-1.8c1.2,0.2,2.1,1.1,3,1.9c0.5,0.4,0.9,0.8,1.5,1.2
                            c-0.7,1.9-0.9,3.9-0.6,6c0.5,2.8,1.9,5.4,4.1,7.2l0.7-0.8c-2-1.6-3.3-3.9-3.8-6.5c-0.3-1.7-0.1-3.5,0.5-5.2c0,0,0.1,0.1,0.1,0.1
                            c2.1,1,4.4,0.5,6.6,0.1c3.8-0.7,7.6-1.3,11.4-1.8L454.1,963.8z"
            />
          </g>
        </g>
        <g
          className="common-view"
          onMouseOver={() => {
            showHideTopCommonView('over');
          }}
          onMouseLeave={() => {
            showHideTopCommonView('leave');
          }}
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 340, 35)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth85Diagnozis.implant &&
                  !tooth85Diagnozis.apex &&
                  !tooth85Diagnozis.shaper &&
                  !tooth85Diagnozis.apex
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth85Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M460.5,1138.7c-0.3,8.3-3.4,29.5-5.4,37.5c-0.2,0.3-0.5,0.6-0.7,0.8
                                c-14,5.4-29.2,7.5-44.1,6c-1.3-0.1-2.6-0.3-3.9-0.5c-16.6-2.3-32.2-8.8-46.7-17.3c-0.4-0.2-0.7-0.4-1.1-0.7
                                c-12.8-7.8-24.6-17.1-35-27.9c0-0.2,0-0.4,0-0.5c6.1-7.3,11.7-23.2,18-30.1c5.5-6.1,11.2-12.1,16.9-18.1l37.2,23.3l60.9-6.6
                                C459.7,1115.8,460.9,1127.2,460.5,1138.7z"
              />
            </g>
            <g
              style={{
                visibility:
                  !tooth85Diagnozis.implant &&
                  !tooth85Diagnozis.abutment &&
                  !tooth85Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth85Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M454.5,1177.1c-9.2,11.2-14.9,17.1-20.7,30.4c-8.3,19.2-12.7,33.7-21.7,52.7
                                c-6.2,13.2-15,25.8-29,32c-6,2.7-12.7,4-19.4,3.7c-3.9-0.7-7.2-3.2-8.7-6.7c-1.7-3.7-1-7.8,0.6-11.6c2.6-6.2,7.5-11.2,11.7-16.6
                                c4.4-5.5,8.1-11.6,10-18.2c2.3-7.9,1.8-16.2,0-24.2c-0.9-3.9-2.2-8-5.8-10.3c-4.1-2.7-9.6-2.2-14.3-0.2c-4.7,2-8.7,5.3-12,9
                                c-14.9,16.8-16.6,41.3-34.1,56c-3.7,3.1-8.4,5.6-13.2,4.5c-6.1-1.5-8.7-7.5-10-13.3c-3.1-13.3-3.2-27.1,0-40.3
                                c1.5-6.1,3.6-11.9,6-17.7c6.6-15.5,15.2-30.1,21-45.9c4-10.7,4.4-13,8.4-24c0.1-0.1,0.2-0.2,0.2-0.3c0,0.2,0,0.4,0,0.5
                                c10.4,10.8,22.2,20.2,35,27.9c0.4,0.2,0.7,0.4,1.1,0.7c14.4,8.6,30.1,15,46.7,17.3c1.3,0.2,2.6,0.3,3.9,0.5
                                C425.4,1184.5,440.5,1182.5,454.5,1177.1z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.pulpit ? 'pulpit' : ''} ${tooth85Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M422.1,1134.3c-0.3,5.6-1.5,11.1-3.3,16.4c-2.6,7.1-6.5,13.8-9.2,20.9
                                c-1.3,3.6-2.3,7.3-3.1,11c-1.5-0.2-3-0.4-4.5-0.7c-0.6-0.1-1.1-0.2-1.7-0.3c0,0,0,0,0,0c-1-0.2-2-0.4-3.1-0.7
                                c-0.1,0-0.1,0-0.2-0.1c-2.2-0.5-4.4-1.1-6.5-1.8c-0.5-0.2-1.1-0.3-1.6-0.5c-0.5-0.2-1.1-0.3-1.6-0.5c-0.5-0.2-1.1-0.4-1.6-0.5
                                c-1.1-0.4-2.1-0.8-3.2-1.2c-2.1-0.8-4.2-1.7-6.2-2.6c-0.8-0.4-1.7-0.7-2.5-1.1c-0.7-0.3-1.4-0.7-2.1-1c-0.4-0.2-0.9-0.4-1.3-0.6
                                c-0.1,0-0.2-0.1-0.2-0.1c-0.7-0.4-1.5-0.7-2.2-1.1c-0.8-0.4-1.6-0.8-2.3-1.2c-0.2-0.1-0.5-0.2-0.7-0.4c-0.8-0.4-1.5-0.8-2.3-1.3
                                c-0.1,0-0.1-0.1-0.2-0.1c-0.9-0.5-1.8-1-2.7-1.6c-0.4-0.2-0.7-0.4-1.1-0.7c3.2-4.5,6-9.2,7.7-14.4c1.5-4.6,2-9.4,3.8-13.9
                                c1.6-4.3,4.3-8.2,7.8-11.5c3.9,6.1,10.2,10.8,17.6,12.9C404.7,1140.4,414.5,1139.1,422.1,1134.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.pulpit ? 'pulpit' : ''} ${tooth85Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M322.9,1211.5c1.1,0.5,2.3,1,3.5,1.6c4.8-7.3,10.3-14.3,16.9-20.5
                                c13-12.4,32.4-19.3,45.1-8.8c5.5,4.6,7.3,11.3,8.2,17.8c1.2,9.5,0.9,18.9-0.6,28.1c1.4,0,2.8-0.1,4.2-0.2
                                c1.6-7.8,2.5-15.7,3.3-23.6c0.8-7.8,1.4-15.7,3-23.3c-2.1-0.3-4.1-0.6-6.2-1.1c-0.9-0.2-1.9-0.4-2.8-0.6c-0.3-0.1-0.7-0.2-1-0.2
                                c-0.4-0.1-0.7-0.2-1.1-0.3c-0.5-0.1-1.1-0.3-1.6-0.4c-0.5-0.1-1.1-0.3-1.6-0.5c-0.5-0.1-1.1-0.3-1.6-0.5c-2.7-0.8-5.3-1.7-8-2.7
                                c-0.5-0.2-1-0.4-1.6-0.6c-1.1-0.4-2.1-0.8-3.1-1.3c-0.5-0.2-1-0.4-1.5-0.7c-0.8-0.4-1.7-0.7-2.5-1.1c-0.7-0.3-1.4-0.7-2.1-1
                                c-0.4-0.2-0.9-0.4-1.3-0.6c-0.1,0-0.1-0.1-0.2-0.1c-0.7-0.4-1.4-0.7-2.2-1.1c-0.8-0.4-1.6-0.8-2.3-1.2c-0.1-0.1-0.3-0.2-0.4-0.2
                                c-0.9-0.5-1.7-0.9-2.5-1.4c-0.1,0-0.1-0.1-0.2-0.1c-0.9-0.5-1.8-1-2.7-1.6c-0.4-0.2-0.7-0.4-1.1-0.7c-3,4.2-6.4,8.2-9.8,12.1
                                C339.5,1187.9,330.5,1199.3,322.9,1211.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.pulpit ? 'pulpit' : ''} ${tooth85Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M395.9,1229.7c1.4,0,2.8-0.1,4.2-0.2c-0.7,3.6-1.6,7.2-2.7,10.8c-6.2,20.8-18.8,39.6-36.1,54.1
                                c13-12.8,22.7-27.8,28.8-43.9C392.8,1243.8,394.7,1236.8,395.9,1229.7z"
              />
              <path
                className={`st22 target part ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.channel_class} ${tooth85Diagnozis.pulpit ? 'pulpit' : ''} ${tooth85Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M317,1221.5c1.8-3.4,3.8-6.8,5.9-10c1.1,0.5,2.3,1,3.5,1.6c-8.3,12.7-14.4,26.8-19.7,41
                                c-2.8,7.4-5.3,14.9-7.7,22.4C301.6,1257.3,307.7,1238.7,317,1221.5z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage85 />
          </g>
          {/*PIN*/}
          <g
            className="pin hEmpty hImplant"
            style={{
              visibility: 'inherit',
              opacity: tooth85Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M322.9 1133C322.9 1133.6 323 1134.2 323 1134.9C331.7 1143.9 341.7 1153 352.3 1160.3C354.4 1161.8 356.6 1163.2 358.7 1164.5C359.1 1164.7 359.4 1164.9 359.8 1165.2C361.9 1166.4 364 1167.7 366.2 1168.8C378.8 1175.6 392.3 1180.6 406.5 1182.5C407.8 1182.7 409.1 1182.8 410.4 1183C425.6 1184.5 441 1182.4 455.3 1176.7C455.4 1176.6 455.5 1176.5 455.6 1176.3C457.6 1168.2 460.3 1146.8 460.6 1138.6C461 1127.1 459.7 1115.7 456.9 1104.5L396 1111.1L358.8 1087.8C353.1 1093.8 347.5 1099.8 341.9 1105.9C335.6 1112.8 326.3 1121.7 322.9 1133Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st57"
              d="M413.6 1109.3L332.7 1211.1L331.5 1212.6L317.6 1230.1C316.9 1231 315.6 1231.2 314.7 1230.6C313.7 1230 313.4 1228.7 314 1227.7L326.6 1205.5L352.4 1160.4L384.6 1104.1L396 1111.2L413.6 1109.3Z"
              style={{ fill: tooth85Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: tooth85Diagnozis.culttab ? 'inherit' : 'hidden',
              opacity: tooth85Diagnozis.culttab ? 1 : 0,
            }}
          >
            <path
              className="st14"
              d="M314.7,1230.6L314.7,1230.6c0.9,0.6,2.2,0.4,2.9-0.5l48.7-61.3c-2.2-1.1-4.3-2.3-6.4-3.6
                            c-0.4-0.2-0.7-0.4-1.1-0.7c-2.2-1.3-4.3-2.7-6.4-4.2l-38.4,67.3C313.4,1228.7,313.7,1230,314.7,1230.6z"
            />
            <path
              className="st15"
              d="M322.9,1133c0,0.6,0.1,1.2,0.1,1.9c8.7,9,18.7,18.1,29.3,25.4c2.1,1.5,4.3,2.9,6.4,4.2
                            c0.4,0.2,0.7,0.4,1.1,0.7c2.1,1.2,4.2,2.5,6.4,3.6c12.6,6.8,26.1,11.8,40.3,13.7c1.3,0.2,2.6,0.3,3.9,0.5
                            c15.2,1.5,30.6-0.6,44.9-6.3c0.1-0.1,0.2-0.2,0.3-0.4c2-8.1,4.7-29.5,5-37.7c0.4-11.5-0.9-22.9-3.7-34.1l-60.9,6.6l-37.2-23.3
                            c-5.7,6-11.3,12-16.9,18.1C335.6,1112.8,326.3,1121.7,322.9,1133z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth85Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth85Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M449.8,1178.7l-61.4,20.1l-25.4-12.8l-39.3-49.3c10.7,11.1,22.8,20.7,36.1,28.6c15.5,9.2,32.5,16,50.5,17.8
                            C423.7,1184.4,437.2,1182.9,449.8,1178.7z"
            ></path>
            <path
              className="st17"
              d="M460.5,1138.7c-0.3,8.3-3.4,29.5-5.4,37.5c-0.2,0.3-0.5,0.6-0.7,0.8c-1.5,0.6-3.1,1.2-4.7,1.7
                            c-12.7,4.2-26.1,5.7-39.5,4.3c-18-1.8-35-8.6-50.5-17.8c-13.2-7.9-25.4-17.5-36.1-28.6c0-0.2,0-0.4,0-0.6
                            c6.1-7.3,11.7-23.2,18-30.1c5.5-6.1,11.2-12.1,16.9-18.1l37.2,23.3l60.9-6.6C459.7,1115.8,460.9,1127.2,460.5,1138.7z"
            ></path>
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M366.572 1142.02C367.115 1139.6 369.71 1138.25 372.004 1139.2L417.513 1158.02C419.807 1158.97 420.692 1161.75 419.366 1163.85L398.001 1197.67C396.959 1199.32 394.879 1199.98 393.078 1199.23L360.217 1185.51C358.427 1184.76 357.431 1182.84 357.855 1180.94L366.572 1142.02Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth85Diagnozis.abutment ||
                tooth85Diagnozis.implant ||
                tooth85Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M353.1,1180c0,0-8.3,24.5-10.2,33.1c-1.9,8.6-8.6,33.6-10.2,41.5c-1.5,7.9-3.1,16.5-3.1,17.3
                            c0,0.9,4.7,10.9,13.4,13c8.7,2.1,16.2-2,16.2-2s12.9-19.6,15.2-24.4c2.4-4.9,18.3-36.2,20.7-41.1s7.2-16.8,7.2-16.8L353.1,1180z"
            ></path>
            <line
              className="st19"
              x1="345.7"
              y1="1185.7"
              x2="400.4"
              y2="1217.5"
            ></line>
            <line
              className="st19"
              x1="339.7"
              y1="1203.7"
              x2="394.4"
              y2="1235.5"
            ></line>
            <line
              className="st19"
              x1="332.7"
              y1="1219.7"
              x2="385.4"
              y2="1251.5"
            ></line>
            <line
              className="st19"
              x1="326.7"
              y1="1237.7"
              x2="379.4"
              y2="1269.5"
            ></line>
            <line
              className="st19"
              x1="320.7"
              y1="1254.7"
              x2="373.4"
              y2="1286.5"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth85Diagnozis.culttab &&
                !tooth85Diagnozis.abutment &&
                !tooth85Diagnozis.implant &&
                !tooth85Diagnozis.shaper &&
                !tooth85Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M469.8,1092.2c-3.6-4.6-8-8.7-12.8-11.9c-0.1,0-0.1-0.1-0.2-0.1l-8.7-1.2
                            c-3,2.1-6,4.2-9,6.3c-3.6,2.5-7.3,5.1-11.7,6.2c-4.6,1.1-9.5,0.3-13.9,2.1c-4.8,1.9-8.1,6.3-8.5,11.4l-2-1.6
                            c2.4-2.8,3.8-6.2,4.2-9.9c0.3-2.8-0.1-5.7-1.5-8.1c-2.6-4.6-7.8-6.7-11.9-9.8c-3.5-2.7-6.3-6.2-8.1-10.3l-6.9-2.4
                            c-3.9,0.8-7.8,1.8-11.6,3.1c-2.8,0.9-5.6,2-8.3,3.2c-5.4,2.4-10.5,5.2-15.4,8.5c-3.6,5.2-6.8,10.6-9.6,16.2
                            c-4.5,8.9-8.2,18.3-9.6,28.2c-0.3,2.5-0.7,4.5-1,6.6c-0.2,2-0.3,3.9-0.1,6.3c10.7,11.1,23.6,22.5,36.8,30.3
                            c15.5,9.2,32.5,16,50.5,17.8c15.4,1.5,30.9-0.7,45.2-6.4c3.6-3.4,7-7.2,9.9-11.3c3.4-4.7,6.3-9.9,8.6-15.3c3-7.2,5-14.8,6.6-22.5
                            c0.2-0.8,0.3-1.6,0.5-2.4C481.2,1113.3,477.2,1101.7,469.8,1092.2z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth85Diagnozis.culttab && !tooth85Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M324.004 1123.92C323.722 1125.62 323.468 1127.13 323.321 1128.6C323.121 1130.6 323.021 1132.6 323.421 1135C334.121 1146.1 347.021 1157.4 360.221 1165.3C375.721 1174.5 392.721 1181.3 410.721 1183.1C426.021 1184.6 441.621 1182.4 455.921 1176.7C459.521 1173.3 462.821 1169.5 465.721 1165.5C469.121 1160.8 472.021 1155.6 474.321 1150.2C477.321 1143 479.221 1135.4 480.821 1127.7C480.921 1127.3 480.996 1126.9 481.071 1126.5C481.146 1126.1 481.221 1125.7 481.321 1125.3C481.121 1113.3 477.021 1101.7 469.721 1092.3C466.121 1087.6 461.821 1083.6 456.921 1080.4C456.921 1080.34 456.883 1080.31 456.83 1080.28C456.798 1080.26 456.759 1080.24 456.721 1080.2L448.021 1079C445.955 1080.4 443.977 1081.8 442 1083.2C441.011 1083.9 440.022 1084.6 439.021 1085.3C435.421 1087.9 431.721 1090.5 427.321 1091.5C425.353 1091.97 423.33 1092.11 421.315 1092.25C418.62 1092.44 415.939 1092.63 413.421 1093.6C408.721 1095.5 405.421 1099.9 404.921 1105L402.921 1103.4C405.321 1100.6 406.721 1097.2 407.121 1093.5C407.421 1090.7 407.021 1087.9 405.621 1085.4C403.85 1082.14 400.724 1080.14 397.558 1078.11C396.255 1077.27 394.946 1076.43 393.721 1075.5C390.221 1072.8 387.421 1069.3 385.621 1065.2L378.721 1062.8C374.721 1063.6 370.821 1064.7 366.921 1066C364.221 1066.9 361.521 1067.9 358.921 1069.1C353.521 1071.4 348.421 1074.3 343.521 1077.6C340.021 1082.8 336.821 1088.2 333.921 1093.8C329.321 1102.7 325.721 1112.1 324.321 1122C324.214 1122.67 324.107 1123.31 324.004 1123.92ZM365.915 1162.2C379.223 1170.1 393.82 1175.94 409.275 1177.48C426.822 1179.2 445.733 1177.22 456.499 1162.37C458.149 1160.09 459.661 1157.67 461.021 1155.16C461.649 1154 460.937 1152.59 459.646 1152.33C411.753 1142.78 384.295 1136.1 337.714 1122.61C336.584 1122.29 335.393 1123 335.294 1124.17C333.666 1143.38 360.108 1158.81 365.372 1161.88C365.59 1162.01 365.772 1162.11 365.915 1162.2Z"
            ></path>
            <path
              className={`st7 ${tooth85Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M409.056 1177.48C393.601 1175.94 379.004 1170.1 365.696 1162.2C362.135 1160.08 333.38 1144.18 335.075 1124.17C335.174 1123 336.366 1122.29 337.495 1122.61C384.076 1136.1 411.534 1142.78 459.427 1152.33C460.718 1152.59 461.43 1154 460.803 1155.16C459.443 1157.67 457.93 1160.09 456.28 1162.37C445.514 1177.22 426.603 1179.2 409.056 1177.48Z"
            />
            <path
              className={`st60
                                    ${tooth85Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth85Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth85Diagnozis.seal_cervical_color}
                                `}
              d="M409.056 1177.48C393.601 1175.94 379.004 1170.1 365.696 1162.2C362.135 1160.08 333.38 1144.18 335.075 1124.17C335.174 1123 336.366 1122.29 337.495 1122.61C384.076 1136.1 411.534 1142.78 459.427 1152.33C460.718 1152.59 461.43 1154 460.803 1155.16C459.443 1157.67 457.93 1160.09 456.28 1162.37C445.514 1177.22 426.603 1179.2 409.056 1177.48Z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth85.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M326.5 1112.5L327.5 1113.5L328 1115L327.5 1117.5L328 1119.5L328.5 1123L328 1124.5L328.5 1127.5L330 1130L331 1133L332.5 1136V1138L334.5 1139.5L336 1142L339 1145.5L342 1147.5L343 1149.5L346.5 1152L349.5 1155L353.5 1157.5L354.5 1159L359.5 1162L361 1163L367 1166L370.5 1168L371.5 1169H373.5L376.5 1171L381 1172.5L385 1175L393 1176.5L397 1178L401.5 1179.5H407L411.5 1180.5H418.5C419.667 1181.17 422.2 1182.4 423 1182C424 1181.5 429 1180.5 430.5 1180.5H434L438.5 1178H446L451 1172.5L458 1171L463 1163L467 1159L469 1155L470 1152L473 1148.5L476 1146.5L475.5 1149L474.5 1152L473.5 1154V1156L472 1158V1160.5L470 1163V1166.5L468 1169L467 1172.5L464.5 1175.5L463 1179.5L459 1183.5L457 1186.5L454.5 1189L451 1191L448.5 1193L446 1195.5L442.5 1196.5L440 1200L437.5 1203L429 1205.5L420.5 1204L414.5 1205.5H403L390.5 1201.5H378.5L370.5 1196.5L359.5 1193L349.5 1186L342 1182L335 1176.5L330 1169L323 1166L319.5 1160.5L316.5 1156V1152L318.5 1147.5L319.5 1142V1136L321.5 1130V1124.5L323 1119.5L324.5 1117.5V1115L326.5 1112.5Z"
            ></path>
            <path
              className="st61 level1"
              d="M327.5 1113.5L326.5 1112.5L325 1115V1117.5L324 1119.5L323 1123V1125.5L321.5 1127.5V1130L320.5 1133V1136L323 1139.5L324 1142L328 1144.5L328.5 1147.5L332.5 1150.5L336 1155L339 1159L343 1162L347.5 1164L348.5 1166L352 1169L357 1171L361 1173.5L367 1176.5L371.5 1179.5H377.5L384 1182C385.333 1182.33 388.4 1183 390 1183C391.6 1183 395.333 1185 397 1186H404C405.5 1186.5 408.8 1187.5 410 1187.5L415.5 1188.5L418.5 1187.5L423 1188.5H428.5H432.5L435.5 1187.5L440.5 1186H444L449 1184H452L454.5 1182H457L458 1180.5L459 1179L460.5 1177.5L463 1175V1172.5L465 1171L467 1169L468 1166L469 1164L470 1160.5L471.5 1159L473 1156.5V1155L474 1152L475 1150.5L476 1146.5L473 1148.5L470 1152L469 1155L467 1159L463 1163L458 1171L451 1172.5L446 1178H438.5L434 1180.5H430.5C429 1180.5 424 1181.5 423 1182C422.2 1182.4 419.667 1181.17 418.5 1180.5H411.5L407 1179.5H401.5L397 1178L393 1176.5L385 1175L381 1172.5L376.5 1171L373.5 1169H371.5L370.5 1168L367 1166L361 1163L359.5 1162L354.5 1159L353.5 1157.5L349.5 1155L346.5 1152L343 1149.5L342 1147.5L339 1145.5L336 1142L334.5 1139.5L332.5 1138V1136L331 1133L330 1130L328.5 1127.5L328 1124.5L328.5 1123L328 1119.5L327.5 1117.5L328 1115L327.5 1113.5Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth85Diagnozis.culttab &&
                !tooth85Diagnozis.abutment &&
                !tooth85Diagnozis.implant &&
                !tooth85Diagnozis.shaper &&
                !tooth85Diagnozis.apex
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
                d="M358.4,1108c9.1,6.3,24.4,15.5,40.3,18.9c19,4,43.3,3.1,54.3,2.3v0c1.3-5,2.6-10.2,3.4-15.3
                                c1.3-8.3,1-23.3,0.6-33.6c-0.1,0-0.1-0.1-0.2-0.1l-8.7-1.2c-3,2.1-6,4.2-9,6.3c-3.6,2.5-7.3,5.1-11.7,6.2
                                c-4.6,1.1-9.5,0.3-13.9,2.1c-4.8,1.9-8.1,6.3-8.5,11.4l-2-1.6c2.4-2.8,3.8-6.2,4.2-9.9c0.3-2.8-0.1-5.7-1.5-8.1
                                c-2.6-4.6-7.8-6.7-11.9-9.8c-3.5-2.7-6.3-6.2-8.1-10.3l-6.9-2.4c-3.9,0.8-7.8,1.8-11.6,3.1c-0.8,5.9-2,13.6-4,20.2
                                C361.6,1092,359.9,1100.4,358.4,1108z"
              />
              <path
                className={`
                                st8 target caries-center 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth85.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth85.seal_center ? `seal-fill ${teethDiagnozis.tooth85.seal_center_color}` : ''}
                            `}
                d="M358.4,1108c9.1,6.3,24.4,15.5,40.3,18.9c19,4,43.3,3.1,54.3,2.3v0c1.3-5,2.6-10.2,3.4-15.3
                                c1.3-8.3,1-23.3,0.6-33.6c-0.1,0-0.1-0.1-0.2-0.1l-8.7-1.2c-3,2.1-6,4.2-9,6.3c-3.6,2.5-7.3,5.1-11.7,6.2
                                c-4.6,1.1-9.5,0.3-13.9,2.1c-4.8,1.9-8.1,6.3-8.5,11.4l-2-1.6c2.4-2.8,3.8-6.2,4.2-9.9c0.3-2.8-0.1-5.7-1.5-8.1
                                c-2.6-4.6-7.8-6.7-11.9-9.8c-3.5-2.7-6.3-6.2-8.1-10.3l-6.9-2.4c-3.9,0.8-7.8,1.8-11.6,3.1c-0.8,5.9-2,13.6-4,20.2
                                C361.6,1092,359.9,1100.4,358.4,1108z"
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
                d="M450.7,1150.9c2.8,9,10.2,12.9,15.1,14.5c3.4-4.7,6.3-9.9,8.6-15.3c3-7.2,5-14.8,6.6-22.5
                                c0.2-0.8,0.3-1.6,0.5-2.4c-0.2-12-4.2-23.6-11.6-33c-3.6-4.6-8-8.7-12.8-11.9c0.4,10.3,0.7,25.3-0.6,33.6
                                c-0.8,5.1-2.1,10.3-3.4,15.3v0C450.9,1137.6,449,1145.4,450.7,1150.9z"
              />
              <path
                className={`st8 caries-right
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth85.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth85.seal_right ? `seal-fill ${teethDiagnozis.tooth85.seal_right_color}` : ''}
                            `}
                d="M450.7,1150.9c2.8,9,10.2,12.9,15.1,14.5c3.4-4.7,6.3-9.9,8.6-15.3c3-7.2,5-14.8,6.6-22.5
                                c0.2-0.8,0.3-1.6,0.5-2.4c-0.2-12-4.2-23.6-11.6-33c-3.6-4.6-8-8.7-12.8-11.9c0.4,10.3,0.7,25.3-0.6,33.6
                                c-0.8,5.1-2.1,10.3-3.4,15.3v0C450.9,1137.6,449,1145.4,450.7,1150.9z"
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
                d="M323.5,1128.7c14.8,0.2,29,0,30.7-2.8c1-1.6,2.5-9.2,4.2-17.8c1.5-7.6,3.3-16,5-21.9c1.9-6.6,3.2-14.4,4-20.2
                                c-2.8,0.9-5.6,2-8.3,3.2c-5.4,2.4-10.5,5.2-15.4,8.5c-3.6,5.2-6.8,10.6-9.6,16.2c-4.5,8.9-8.2,18.3-9.6,28.2
                                C324.1,1124.6,323.7,1126.6,323.5,1128.7z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth85.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth85.seal_left ? `seal-fill ${teethDiagnozis.tooth85.seal_left_color}` : ''}
                            `}
                d="M323.5,1128.7c14.8,0.2,29,0,30.7-2.8c1-1.6,2.5-9.2,4.2-17.8c1.5-7.6,3.3-16,5-21.9c1.9-6.6,3.2-14.4,4-20.2
                                c-2.8,0.9-5.6,2-8.3,3.2c-5.4,2.4-10.5,5.2-15.4,8.5c-3.6,5.2-6.8,10.6-9.6,16.2c-4.5,8.9-8.2,18.3-9.6,28.2
                                C324.1,1124.6,323.7,1126.6,323.5,1128.7z"
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
                d="M323.4,1134.9c10.7,11.1,23.6,22.5,36.8,30.3c15.5,9.2,32.5,16,50.5,17.8c15.4,1.5,30.9-0.7,45.2-6.4
                                c3.6-3.4,7-7.2,9.9-11.3c-4.9-1.6-12.3-5.5-15.1-14.5c-1.7-5.5,0.1-13.3,2.3-21.7c-11,0.7-35.3,1.7-54.3-2.3
                                c-15.9-3.4-31.2-12.5-40.3-18.9c-1.8,8.6-3.3,16.2-4.2,17.8c-1.7,2.9-15.9,3.1-30.7,2.8C323.2,1130.6,323.1,1132.6,323.4,1134.9z"
              />
              <path
                className={`st8 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth85.caries_bottom ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth85.seal_bottom ? `seal-fill ${teethDiagnozis.tooth85.seal_bottom_color}` : ''}
                            `}
                d="M323.4,1134.9c10.7,11.1,23.6,22.5,36.8,30.3c15.5,9.2,32.5,16,50.5,17.8c15.4,1.5,30.9-0.7,45.2-6.4
                                c3.6-3.4,7-7.2,9.9-11.3c-4.9-1.6-12.3-5.5-15.1-14.5c-1.7-5.5,0.1-13.3,2.3-21.7c-11,0.7-35.3,1.7-54.3-2.3
                                c-15.9-3.4-31.2-12.5-40.3-18.9c-1.8,8.6-3.3,16.2-4.2,17.8c-1.7,2.9-15.9,3.1-30.7,2.8C323.2,1130.6,323.1,1132.6,323.4,1134.9z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_left &&
                      !tooth85Diagnozis.seal_top &&
                      !tooth85Diagnozis.seal_center) ||
                    (tooth85Diagnozis.seal_left &&
                      tooth85Diagnozis.seal_top &&
                      !tooth85Diagnozis.seal_center) ||
                    (!tooth85Diagnozis.seal_left &&
                      tooth85Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M358.5 1108L366.5 1071.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_left &&
                      !tooth85Diagnozis.seal_bottom) ||
                    (!tooth85Diagnozis.seal_left &&
                      tooth85Diagnozis.seal_bottom &&
                      !tooth85Diagnozis.seal_center) ||
                    (!tooth85Diagnozis.seal_left &&
                      tooth85Diagnozis.seal_bottom &&
                      tooth85Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M358.5 1108C355.5 1120 355.1 1129.3 327.5 1128.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_bottom &&
                      !tooth85Diagnozis.seal_center) ||
                    (!tooth85Diagnozis.seal_bottom &&
                      tooth85Diagnozis.seal_center) ||
                    (tooth85Diagnozis.seal_right &&
                      tooth85Diagnozis.seal_left &&
                      !tooth85Diagnozis.seal_center &&
                      !tooth85Diagnozis.seal_top) ||
                    (!tooth85Diagnozis.seal_top &&
                      !tooth85Diagnozis.seal_bottom &&
                      tooth85Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M358.5 1108C369.333 1118.5 403.4 1137.4 453 1129"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_right &&
                      !tooth85Diagnozis.seal_bottom) ||
                    (!tooth85Diagnozis.seal_right &&
                      tooth85Diagnozis.seal_bottom &&
                      !tooth85Diagnozis.seal_center) ||
                    (!tooth85Diagnozis.seal_right &&
                      tooth85Diagnozis.seal_bottom &&
                      tooth85Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M453 1129C451.5 1141.5 444.1 1147.8 460.5 1163"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth85Diagnozis.seal_right &&
                      !tooth85Diagnozis.seal_bottom &&
                      !tooth85Diagnozis.seal_center) ||
                    (tooth85Diagnozis.seal_right &&
                      tooth85Diagnozis.seal_bottom &&
                      !tooth85Diagnozis.seal_center) ||
                    (!tooth85Diagnozis.seal_right &&
                      tooth85Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M453 1129C455.5 1119.5 457.9 1098.1 457.5 1086.5"
              />
            </g>
          </g>
          <g>
            <g
              className="vinir"
              style={{
                visibility: tooth85Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth85Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth85Diagnozis.vinir_color}`}
                d="M469.8 1092.2C466.2 1087.6 461.8 1083.5 457 1080.3C456.9 1080.3 456.9 1080.2 456.8 1080.2L448.1 1079C445.1 1081.1 442.1 1083.2 439.1 1085.3C435.5 1087.8 431.8 1090.4 427.4 1091.5C422.8 1092.6 417.9 1091.8 413.5 1093.6C408.7 1095.5 405.4 1099.9 405 1105L403 1103.4C405.4 1100.6 406.8 1097.2 407.2 1093.5C407.5 1090.7 407.1 1087.8 405.7 1085.4C403.1 1080.8 397.9 1078.7 393.8 1075.6C390.3 1072.9 387.5 1069.4 385.7 1065.3L378.8 1062.9C374.9 1063.7 371 1064.7 367.2 1066C364.4 1066.9 361.6 1068 358.9 1069.2C353.5 1071.6 348.4 1074.4 343.5 1077.7C339.9 1082.9 336.7 1088.3 333.9 1093.9C329.4 1102.8 325.7 1112.2 324.3 1122.1C324 1124.6 323.6 1126.6 323.3 1128.7C323.1 1130.7 323 1132.6 323.2 1135C333.9 1146.1 346.8 1157.5 360 1165.3C375.5 1174.5 392.5 1181.3 410.5 1183.1C425.9 1184.6 441.4 1182.4 455.7 1176.7C459.3 1173.3 462.7 1169.5 465.6 1165.4C469 1160.7 471.9 1155.5 474.2 1150.1C477.2 1142.9 479.2 1135.3 480.8 1127.6C481 1126.8 481.1 1126 481.3 1125.2C481.2 1113.3 477.2 1101.7 469.8 1092.2Z"
              ></path>
            </g>
          </g>
          <g
            className="crown"
            style={{
              visibility:
                tooth85Diagnozis.temporary_crown ||
                tooth85Diagnozis.ceramic_crown ||
                tooth85Diagnozis.mceramic_crown ||
                tooth85Diagnozis.metalic_crown ||
                tooth85Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth85Diagnozis.temporary_crown ||
                tooth85Diagnozis.ceramic_crown ||
                tooth85Diagnozis.mceramic_crown ||
                tooth85Diagnozis.metalic_crown ||
                tooth85Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth85Diagnozis.ceramic_crown_color}
                                ${tooth85Diagnozis.mceramic_crown_color}
                                ${tooth85Diagnozis.metalic_crown_color}
                                ${tooth85Diagnozis.zirconia_crown_color}
                            `}
              d="M469.8,1092.2c-3.6-4.6-8-8.7-12.8-11.9c-0.1,0-0.1-0.1-0.2-0.1l-8.7-1.2
                            c-3,2.1-6,4.2-9,6.3c-3.6,2.5-7.3,5.1-11.7,6.2c-4.6,1.1-9.5,0.3-13.9,2.1c-4.8,1.9-8.1,6.3-8.5,11.4l-2-1.6
                            c2.4-2.8,3.8-6.2,4.2-9.9c0.3-2.8-0.1-5.7-1.5-8.1c-2.6-4.6-7.8-6.7-11.9-9.8c-3.5-2.7-6.3-6.2-8.1-10.3l-6.9-2.4
                            c-3.9,0.8-7.8,1.8-11.6,3.1c-2.8,0.9-5.6,2-8.3,3.2c-5.4,2.4-10.5,5.2-15.4,8.5c-3.6,5.2-6.8,10.6-9.6,16.2
                            c-4.5,8.9-8.2,18.3-9.6,28.2c-0.3,2.5-0.7,4.5-1,6.6c-0.2,2-0.3,3.9-0.1,6.3c10.7,11.1,23.6,22.5,36.8,30.3
                            c15.5,9.2,32.5,16,50.5,17.8c15.4,1.5,30.9-0.7,45.2-6.4c3.6-3.4,7-7.2,9.9-11.3c3.4-4.7,6.3-9.9,8.6-15.3c3-7.2,5-14.8,6.6-22.5
                            c0.2-0.8,0.3-1.6,0.5-2.4C481.2,1113.3,477.2,1101.7,469.8,1092.2z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
