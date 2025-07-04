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
import setupDiagnoze from '../../../lib/tFunctions';
import PeriodontitStage31 from './periodontit31';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth31() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth31Diagnozis = teethDiagnozis.tooth31;
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
        teethDiagnozis.tooth31.caries_bottom =
          !teethDiagnozis.tooth31.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth31.caries_center =
          !teethDiagnozis.tooth31.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth31.caries_left =
          !teethDiagnozis.tooth31.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth31.caries_right =
          !teethDiagnozis.tooth31.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth31.caries_top = !teethDiagnozis.tooth31.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth31.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth31.seal_center_color = sealColor1;
          teethDiagnozis.tooth31.seal_center = true;
        } else if (
          teethDiagnozis.tooth31.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth31.seal_center_color = sealColor2;
          teethDiagnozis.tooth31.seal_center = true;
        } else if (
          teethDiagnozis.tooth31.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth31.seal_center_color = sealColor3;
          teethDiagnozis.tooth31.seal_center = true;
        } else {
          teethDiagnozis.tooth31.seal_center =
            !teethDiagnozis.tooth31.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth31.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth31.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth31.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth31.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth31.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth31.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth31.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth31.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth31.seal_bottom = true;
        } else {
          teethDiagnozis.tooth31.seal_bottom =
            !teethDiagnozis.tooth31.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth31.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth31.seal_left_color = sealColor1;
          teethDiagnozis.tooth31.seal_left = true;
        } else if (
          teethDiagnozis.tooth31.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth31.seal_left_color = sealColor2;
          teethDiagnozis.tooth31.seal_left = true;
        } else if (
          teethDiagnozis.tooth31.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth31.seal_left_color = sealColor3;
          teethDiagnozis.tooth31.seal_left = true;
        } else {
          teethDiagnozis.tooth31.seal_left = !teethDiagnozis.tooth31.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth31.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth31.seal_right_color = sealColor1;
          teethDiagnozis.tooth31.seal_right = true;
        } else if (
          teethDiagnozis.tooth31.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth31.seal_right_color = sealColor2;
          teethDiagnozis.tooth31.seal_right = true;
        } else if (
          teethDiagnozis.tooth31.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth31.seal_right_color = sealColor3;
          teethDiagnozis.tooth31.seal_right = true;
        } else {
          teethDiagnozis.tooth31.seal_right =
            !teethDiagnozis.tooth31.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth31.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth31.seal_top_color = sealColor1;
          teethDiagnozis.tooth31.seal_top = true;
        } else if (
          teethDiagnozis.tooth31.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth31.seal_top_color = sealColor2;
          teethDiagnozis.tooth31.seal_top = true;
        } else if (
          teethDiagnozis.tooth31.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth31.seal_top_color = sealColor3;
          teethDiagnozis.tooth31.seal_top = true;
        } else {
          teethDiagnozis.tooth31.seal_top = !teethDiagnozis.tooth31.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth31.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth31.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth31.wedge_shaped_defect_color =
          !teethDiagnozis.tooth31.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth31.show) {
        document.getElementById('TH-31').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth71.show) {
        document.getElementById('TH-71').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth31.show) {
        document.getElementById('TH-31').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth71.show) {
          document.getElementById('TH-71').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth31.show) {
        document.getElementById('TH-71').classList.remove('f-tooth-active');
        document.getElementById('TH-31').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth31.show) {
        document.getElementById('TH-31').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth71.show) {
          document.getElementById('TH-71').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="31"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1061.5439 842.0025)"
          className={`st3 st4 st5 ${selectedTooth === 31 ? 'num-active' : ''}`}
        >
          31
        </text>
      </g>
      <g
        id="TH-31"
        className={`f-tooth-init ${(teethDiagnozis.tooth31.show || allTeeth) && !teethDiagnozis.tooth31.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth31.show = !teethDiagnozis.tooth31.show;
            teethDiagnozis.tooth71.show = false;
          }

          dispatch(setSelectedToothNumber(31));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              31,
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
          className={`underlay ${selectedTooth === 31 ? 'selected' : ''}`}
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
            d="M1053,1203.9c0,0,7,74,10,101s10,68,28,68s21-12,21-41s1-87,1-100
                        s3.8-80.8,2.9-97.4c-1.9-35.6-15.9-50.6-15.9-79.6s16-32.8,15.5-67.9s-5.5-155.1-6.5-174.1s-12-28-26-28s-25,6-28,33s-6,157-5,171
                        s18,42,19,66s-21,47-20,93C1049.8,1184.9,1053,1203.9,1053,1203.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideTopCommonView('over');
          }}
          onMouseLeave={() => {
            showHideTopCommonView('leave');
          }}
        >
          {/* CHANGE COLOR/APEX/CULTTAB */}
          <g className="dentin">
            <g
              style={{
                visibility:
                  !tooth31Diagnozis.culttab &&
                  !tooth31Diagnozis.implant &&
                  !tooth31Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st24"
                d="M1108.4,990.6c-1.4,2.6-4.3,4.2-7.3,5.4c-5.5,2.1-11.7,3-17.8,3c-5.2-0.1-10.3-0.8-15.1-2.5
                                c-3.5-1.3-6.9-3.1-8.6-6.1c-1.2-2.3-1.2-4.9,0.3-7.1c1.2-1.8,3.3-2.9,5-4.3c4.1-3.2,6.7-7.6,10.3-11.3c2.4-2.4,5.4-4.5,9-4.9
                                c2.7-0.3,5.3,0.4,7.4,1.9c1.6,1.2,2.8,3,3.9,4.6c2.5,3.5,5.5,6.8,8.6,9.8c1.6,1.5,3.2,3.1,4.2,5
                                C1109.3,986.3,1109.4,988.6,1108.4,990.6z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth31Diagnozis?.apex || tooth31Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth31Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth31Diagnozis?.apex ? 'apex' : ''}`}
                d="M1108.4 990.6C1107 993.2 1104.1 994.8 1101.1 996C1095.6 998.1 1089.4 999 1083.3 999C1078.1 998.9 1073 998.2 1068.2 996.5C1064.7 995.2 1061.3 993.4 1059.6 990.4C1058.4 988.1 1058.4 985.5 1059.9 983.3C1061.1 981.5 1063.2 980.4 1064.9 979C1069 975.8 1071.6 971.4 1075.2 967.7C1077.6 965.3 1080.6 963.2 1084.2 962.8C1086.9 962.5 1089.5 963.2 1091.6 964.7C1093.2 965.9 1094.4 967.7 1095.5 969.3C1098 972.8 1101 976.1 1104.1 979.1C1105.7 980.6 1107.3 982.2 1108.3 984.1C1109.3 986.3 1109.4 988.6 1108.4 990.6Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth31Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth31Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M1089.25 985.525C1089.25 985.127 1089.67 984.097 1087.65 981.941C1086.15 980.568 1085.64 978.146 1083.72 978.108C1081.65 978.068 1081.08 980.258 1079.74 981.717C1078.13 983.468 1077.91 984.752 1078.1 985.525C1078.5 987.117 1079.59 987.147 1083.72 987.172C1087.84 987.197 1089.25 985.923 1089.25 985.525Z"
                style={{ fill: '#e80808' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            style={{
              visibility:
                tooth31Diagnozis.implant || tooth31Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1084.5" cy="982.5" r="14.5" />
            <g className="st27">
              <mask id="implant_31" className="st49">
                <path
                  className="st50"
                  d="M1077.23 973.928L1075.39 973.328C1073.82 974.905 1072.66 976.881 1072.06 979.09L1073.5 980.387C1073.37 981.072 1073.31 981.778 1073.31 982.5C1073.31 983.222 1073.37 983.928 1073.5 984.613L1072.06 985.91C1072.66 988.12 1073.82 990.096 1075.39 991.673L1077.23 991.072C1078.3 991.99 1079.54 992.714 1080.89 993.186L1081.29 995.084C1082.36 995.364 1083.47 995.513 1084.62 995.513C1085.77 995.513 1086.89 995.364 1087.95 995.084L1088.35 993.186C1089.71 992.713 1090.94 991.99 1092.01 991.072L1093.85 991.672C1095.42 990.095 1096.58 988.119 1097.18 985.909L1095.74 984.612C1095.87 983.928 1095.94 983.222 1095.94 982.5C1095.94 981.778 1095.87 981.072 1095.74 980.388L1097.18 979.091C1096.58 976.881 1095.42 974.905 1093.85 973.328L1092.01 973.928C1090.94 973.01 1089.71 972.287 1088.35 971.814L1087.95 969.918C1086.89 969.638 1085.77 969.488 1084.62 969.488C1083.47 969.488 1082.36 969.637 1081.29 969.917L1080.89 971.814C1079.54 972.286 1078.3 973.01 1077.23 973.928Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1077.23 973.928L1075.39 973.328C1073.82 974.905 1072.66 976.881 1072.06 979.09L1073.5 980.387C1073.37 981.072 1073.31 981.778 1073.31 982.5C1073.31 983.222 1073.37 983.928 1073.5 984.613L1072.06 985.91C1072.66 988.12 1073.82 990.096 1075.39 991.673L1077.23 991.072C1078.3 991.99 1079.54 992.714 1080.89 993.186L1081.29 995.084C1082.36 995.364 1083.47 995.513 1084.62 995.513C1085.77 995.513 1086.89 995.364 1087.95 995.084L1088.35 993.186C1089.71 992.713 1090.94 991.99 1092.01 991.072L1093.85 991.672C1095.42 990.095 1096.58 988.119 1097.18 985.909L1095.74 984.612C1095.87 983.928 1095.94 983.222 1095.94 982.5C1095.94 981.778 1095.87 981.072 1095.74 980.388L1097.18 979.091C1096.58 976.881 1095.42 974.905 1093.85 973.328L1092.01 973.928C1090.94 973.01 1089.71 972.287 1088.35 971.814L1087.95 969.918C1086.89 969.638 1085.77 969.488 1084.62 969.488C1083.47 969.488 1082.36 969.637 1081.29 969.917L1080.89 971.814C1079.54 972.286 1078.3 973.01 1077.23 973.928Z"
              ></path>
              <path
                className="st52"
                d="M1075.39 973.328L1076.01 971.426L1074.84 971.045L1073.97 971.918L1075.39 973.328ZM1077.23 973.928L1076.61 975.83L1077.69 976.179L1078.54 975.443L1077.23 973.928ZM1072.06 979.09L1070.13 978.567L1069.81 979.754L1070.72 980.577L1072.06 979.09ZM1073.5 980.387L1075.47 980.758L1075.68 979.652L1074.84 978.9L1073.5 980.387ZM1073.5 984.613L1074.84 986.1L1075.68 985.348L1075.47 984.242L1073.5 984.613ZM1072.06 985.91L1070.72 984.423L1069.81 985.246L1070.13 986.433L1072.06 985.91ZM1075.39 991.673L1073.97 993.082L1074.84 993.955L1076.01 993.574L1075.39 991.673ZM1077.23 991.072L1078.54 989.558L1077.69 988.821L1076.61 989.17L1077.23 991.072ZM1080.89 993.186L1082.85 992.772L1082.61 991.669L1081.55 991.298L1080.89 993.186ZM1081.29 995.084L1079.34 995.499L1079.59 996.704L1080.78 997.018L1081.29 995.084ZM1087.95 995.084L1088.46 997.018L1089.65 996.703L1089.91 995.498L1087.95 995.084ZM1088.35 993.186L1087.69 991.298L1086.63 991.669L1086.39 992.771L1088.35 993.186ZM1092.01 991.072L1092.63 989.17L1091.55 988.821L1090.7 989.557L1092.01 991.072ZM1093.85 991.672L1093.23 993.574L1094.4 993.955L1095.27 993.082L1093.85 991.672ZM1097.18 985.909L1099.11 986.432L1099.43 985.245L1098.52 984.422L1097.18 985.909ZM1095.74 984.612L1093.77 984.241L1093.56 985.347L1094.4 986.099L1095.74 984.612ZM1095.74 980.388L1094.4 978.901L1093.56 979.653L1093.77 980.759L1095.74 980.388ZM1097.18 979.091L1098.52 980.578L1099.43 979.755L1099.11 978.568L1097.18 979.091ZM1093.85 973.328L1095.27 971.918L1094.4 971.045L1093.23 971.426L1093.85 973.328ZM1092.01 973.928L1090.7 975.443L1091.55 976.179L1092.63 975.83L1092.01 973.928ZM1088.35 971.814L1086.39 972.229L1086.63 973.331L1087.69 973.702L1088.35 971.814ZM1087.95 969.918L1089.91 969.503L1089.65 968.298L1088.46 967.984L1087.95 969.918ZM1081.29 969.917L1080.78 967.984L1079.59 968.298L1079.34 969.503L1081.29 969.917ZM1080.89 971.814L1081.55 973.702L1082.61 973.331L1082.85 972.228L1080.89 971.814ZM1074.77 975.23L1076.61 975.83L1077.85 972.026L1076.01 971.426L1074.77 975.23ZM1073.99 979.613C1074.5 977.747 1075.48 976.074 1076.81 974.738L1073.97 971.918C1072.17 973.735 1070.82 976.015 1070.13 978.567L1073.99 979.613ZM1074.84 978.9L1073.4 977.603L1070.72 980.577L1072.16 981.874L1074.84 978.9ZM1075.31 982.5C1075.31 981.903 1075.36 981.321 1075.47 980.758L1071.54 980.016C1071.38 980.822 1071.31 981.653 1071.31 982.5H1075.31ZM1075.47 984.242C1075.36 983.679 1075.31 983.097 1075.31 982.5H1071.31C1071.31 983.347 1071.38 984.178 1071.54 984.984L1075.47 984.242ZM1073.4 987.398L1074.84 986.1L1072.16 983.126L1070.72 984.423L1073.4 987.398ZM1076.81 990.263C1075.48 988.926 1074.5 987.254 1073.99 985.388L1070.13 986.433C1070.82 988.986 1072.17 991.265 1073.97 993.082L1076.81 990.263ZM1076.61 989.17L1074.77 989.771L1076.01 993.574L1077.85 992.974L1076.61 989.17ZM1081.55 991.298C1080.44 990.91 1079.42 990.315 1078.54 989.558L1075.93 992.587C1077.18 993.666 1078.64 994.518 1080.23 995.075L1081.55 991.298ZM1083.25 994.669L1082.85 992.772L1078.94 993.601L1079.34 995.499L1083.25 994.669ZM1084.62 993.513C1083.64 993.513 1082.7 993.387 1081.8 993.15L1080.78 997.018C1082.01 997.341 1083.3 997.513 1084.62 997.513V993.513ZM1087.44 993.15C1086.54 993.387 1085.6 993.513 1084.62 993.513V997.513C1085.94 997.513 1087.23 997.341 1088.46 997.018L1087.44 993.15ZM1086.39 992.771L1085.99 994.669L1089.91 995.498L1090.31 993.6L1086.39 992.771ZM1090.7 989.557C1089.82 990.314 1088.8 990.909 1087.69 991.298L1089.01 995.074C1090.61 994.517 1092.06 993.666 1093.31 992.586L1090.7 989.557ZM1094.47 989.771L1092.63 989.17L1091.39 992.973L1093.23 993.574L1094.47 989.771ZM1095.25 985.387C1094.75 987.253 1093.76 988.926 1092.43 990.263L1095.27 993.082C1097.08 991.265 1098.42 988.985 1099.11 986.432L1095.25 985.387ZM1094.4 986.099L1095.84 987.397L1098.52 984.422L1097.08 983.125L1094.4 986.099ZM1093.94 982.5C1093.94 983.097 1093.88 983.678 1093.77 984.241L1097.7 984.983C1097.86 984.177 1097.94 983.347 1097.94 982.5H1093.94ZM1093.77 980.759C1093.88 981.322 1093.94 981.903 1093.94 982.5H1097.94C1097.94 981.653 1097.86 980.823 1097.7 980.017L1093.77 980.759ZM1095.84 977.604L1094.4 978.901L1097.08 981.875L1098.52 980.578L1095.84 977.604ZM1092.43 974.738C1093.76 976.075 1094.75 977.747 1095.25 979.614L1099.11 978.568C1098.42 976.015 1097.07 973.735 1095.27 971.918L1092.43 974.738ZM1092.63 975.83L1094.47 975.23L1093.23 971.426L1091.39 972.027L1092.63 975.83ZM1087.69 973.702C1088.8 974.091 1089.82 974.686 1090.7 975.443L1093.31 972.414C1092.06 971.335 1090.61 970.483 1089.01 969.926L1087.69 973.702ZM1085.99 970.332L1086.39 972.229L1090.31 971.4L1089.91 969.503L1085.99 970.332ZM1084.62 971.488C1085.6 971.488 1086.54 971.615 1087.44 971.852L1088.46 967.984C1087.23 967.66 1085.94 967.488 1084.62 967.488V971.488ZM1081.8 971.851C1082.7 971.615 1083.64 971.488 1084.62 971.488V967.488C1083.3 967.488 1082.01 967.66 1080.78 967.984L1081.8 971.851ZM1082.85 972.228L1083.25 970.332L1079.34 969.503L1078.94 971.399L1082.85 972.228ZM1078.54 975.443C1079.42 974.685 1080.44 974.09 1081.55 973.702L1080.23 969.925C1078.64 970.482 1077.18 971.334 1075.93 972.413L1078.54 975.443Z"
                mask="url(#implant_31)"
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
              r="17.5"
              transform="matrix(-1 0 0 1 1083.5 982.5)"
            />
            <path
              className="st45"
              d="M1085.42 973.739C1084.87 971.804 1082.13 971.804 1081.58 973.739L1081.07 975.511C1080.77 976.549 1079.71 977.164 1078.66 976.902L1076.87 976.454C1074.92 975.965 1073.55 978.339 1074.95 979.785L1076.23 981.109C1076.98 981.884 1076.98 983.116 1076.23 983.891L1074.95 985.215C1073.55 986.661 1074.92 989.035 1076.87 988.546L1078.66 988.098C1079.71 987.836 1080.77 988.451 1081.07 989.489L1081.58 991.261C1082.13 993.196 1084.87 993.196 1085.42 991.261L1085.93 989.489C1086.23 988.451 1087.29 987.836 1088.34 988.098L1090.13 988.546C1092.08 989.035 1093.45 986.661 1092.05 985.215L1090.77 983.891C1090.02 983.116 1090.02 981.884 1090.77 981.109L1092.05 979.785C1093.45 978.339 1092.08 975.965 1090.13 976.454L1088.34 976.902C1087.29 977.164 1086.23 976.549 1085.93 975.511L1085.42 973.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth31Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth31Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1060.86 983.854L1060.86 983.854L1060.85 983.863C1059.59 985.719 1059.56 987.914 1060.61 989.922C1062.12 992.58 1065.21 994.273 1068.67 995.56C1073.34 997.211 1078.32 997.9 1083.44 998C1089.44 997.999 1095.51 997.112 1100.86 995.068C1103.83 993.88 1106.42 992.392 1107.64 990.139C1108.48 988.441 1108.5 986.482 1107.54 984.556C1106.62 982.825 1105.14 981.328 1103.54 979.829L1103.54 979.824L1103.53 979.818C1100.4 976.79 1097.36 973.444 1094.81 969.881L1094.81 969.874L1094.8 969.866C1094.77 969.813 1094.73 969.759 1094.69 969.706C1093.61 968.122 1092.53 966.553 1091.14 965.507C1089.24 964.155 1086.89 963.521 1084.44 963.794C1081.17 964.157 1078.37 966.076 1076.04 968.402C1074.68 969.8 1073.47 971.292 1072.24 972.818C1071.88 973.267 1071.51 973.719 1071.14 974.172C1069.52 976.144 1067.79 978.111 1065.65 979.78C1065.12 980.215 1064.51 980.655 1063.94 981.07C1063.58 981.323 1063.25 981.567 1062.95 981.796C1062.09 982.45 1061.37 983.094 1060.86 983.854Z"
            ></path>
            <path
              className="st47"
              d="M1064.93 983.571L1064.93 983.571L1064.92 983.58C1063.91 985.054 1063.89 986.797 1064.73 988.406C1065.96 990.546 1068.48 991.929 1071.35 992.991C1075.22 994.35 1079.35 994.918 1083.61 995C1088.59 994.999 1093.63 994.268 1098.07 992.586C1100.54 991.604 1102.64 990.393 1103.63 988.588C1104.3 987.238 1104.32 985.678 1103.54 984.134C1102.79 982.731 1101.58 981.511 1100.25 980.271L1100.24 980.266L1100.24 980.26C1097.62 977.751 1095.08 974.975 1092.95 972.017L1092.95 972.01L1092.94 972.002C1092.91 971.962 1092.88 971.921 1092.86 971.88C1091.94 970.562 1091.06 969.285 1089.93 968.437C1088.38 967.343 1086.46 966.829 1084.46 967.05C1081.78 967.345 1079.48 968.903 1077.56 970.814C1076.43 971.964 1075.43 973.19 1074.4 974.451C1074.1 974.823 1073.8 975.199 1073.48 975.576C1072.13 977.208 1070.68 978.847 1068.89 980.239C1068.44 980.601 1067.93 980.972 1067.44 981.319C1067.15 981.527 1066.87 981.726 1066.63 981.909C1065.92 982.447 1065.34 982.966 1064.93 983.571Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1085.13 983)"
            />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth31Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1060.86 983.854L1060.86 983.854L1060.85 983.863C1059.59 985.719 1059.57 987.914 1060.61 989.922C1062.12 992.58 1065.21 994.273 1068.67 995.56C1073.34 997.211 1078.32 997.9 1083.44 998C1089.44 997.999 1095.51 997.112 1100.86 995.068C1103.83 993.88 1106.42 992.392 1107.64 990.139C1108.48 988.441 1108.5 986.482 1107.54 984.556C1106.63 982.825 1105.14 981.328 1103.54 979.829L1103.54 979.824L1103.53 979.818C1100.4 976.79 1097.36 973.444 1094.81 969.881L1094.81 969.874L1094.8 969.866C1094.77 969.813 1094.73 969.759 1094.69 969.706C1093.61 968.122 1092.53 966.553 1091.14 965.507C1089.24 964.155 1086.89 963.521 1084.44 963.794C1081.17 964.157 1078.37 966.076 1076.04 968.402C1074.68 969.8 1073.47 971.292 1072.24 972.818C1071.88 973.267 1071.51 973.719 1071.14 974.172C1069.52 976.144 1067.79 978.111 1065.65 979.78C1065.12 980.215 1064.51 980.655 1063.94 981.07C1063.59 981.323 1063.25 981.567 1062.95 981.796C1062.09 982.45 1061.37 983.094 1060.86 983.854Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1064.93 983.571L1064.93 983.571L1064.92 983.58C1063.91 985.054 1063.89 986.797 1064.73 988.406C1065.96 990.546 1068.48 991.929 1071.36 992.991C1075.22 994.35 1079.36 994.918 1083.61 995C1088.59 994.999 1093.63 994.268 1098.07 992.586C1100.54 991.604 1102.64 990.393 1103.63 988.588C1104.3 987.238 1104.32 985.678 1103.54 984.134C1102.8 982.731 1101.58 981.511 1100.25 980.271L1100.24 980.266L1100.24 980.26C1097.63 977.751 1095.08 974.975 1092.95 972.017L1092.95 972.01L1092.94 972.002C1092.91 971.962 1092.89 971.921 1092.86 971.88C1091.95 970.562 1091.06 969.285 1089.93 968.437C1088.38 967.343 1086.46 966.829 1084.46 967.05C1081.78 967.345 1079.49 968.903 1077.56 970.814C1076.43 971.964 1075.43 973.19 1074.41 974.451C1074.1 974.823 1073.8 975.199 1073.48 975.576C1072.13 977.208 1070.68 978.847 1068.89 980.239C1068.45 980.601 1067.93 980.972 1067.44 981.319C1067.15 981.527 1066.87 981.726 1066.63 981.909C1065.92 982.447 1065.34 982.966 1064.93 983.571Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1085.13 983)"
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth31Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth31Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1060.86 983.854L1060.86 983.854L1060.85 983.863C1059.59 985.719 1059.56 987.914 1060.61 989.922C1062.12 992.58 1065.21 994.273 1068.67 995.56C1073.34 997.211 1078.32 997.9 1083.44 998C1089.44 997.999 1095.51 997.112 1100.86 995.068C1103.83 993.88 1106.42 992.392 1107.64 990.139C1108.48 988.441 1108.5 986.482 1107.54 984.556C1106.62 982.825 1105.14 981.328 1103.54 979.829L1103.54 979.824L1103.53 979.818C1100.4 976.79 1097.36 973.444 1094.81 969.881L1094.81 969.874L1094.8 969.866C1094.77 969.813 1094.73 969.759 1094.69 969.706C1093.61 968.122 1092.53 966.553 1091.14 965.507C1089.24 964.155 1086.89 963.521 1084.44 963.794C1081.17 964.157 1078.37 966.076 1076.04 968.402C1074.68 969.8 1073.47 971.292 1072.24 972.818C1071.88 973.267 1071.51 973.719 1071.14 974.172C1069.52 976.144 1067.79 978.111 1065.65 979.78C1065.12 980.215 1064.51 980.655 1063.94 981.07C1063.58 981.323 1063.25 981.567 1062.95 981.796C1062.09 982.45 1061.37 983.094 1060.86 983.854Z"
            ></path>
            <path
              className="st47"
              d="M1064.93 983.571L1064.93 983.571L1064.92 983.58C1063.91 985.054 1063.89 986.797 1064.73 988.406C1065.96 990.546 1068.48 991.929 1071.35 992.991C1075.22 994.35 1079.35 994.918 1083.61 995C1088.59 994.999 1093.63 994.268 1098.07 992.586C1100.54 991.604 1102.64 990.393 1103.63 988.588C1104.3 987.238 1104.32 985.678 1103.54 984.134C1102.79 982.731 1101.58 981.511 1100.25 980.271L1100.24 980.266L1100.24 980.26C1097.62 977.751 1095.08 974.975 1092.95 972.017L1092.95 972.01L1092.94 972.002C1092.91 971.962 1092.88 971.921 1092.86 971.88C1091.94 970.562 1091.06 969.285 1089.93 968.437C1088.38 967.343 1086.46 966.829 1084.46 967.05C1081.78 967.345 1079.48 968.903 1077.56 970.814C1076.43 971.964 1075.43 973.19 1074.4 974.451C1074.1 974.823 1073.8 975.199 1073.48 975.576C1072.13 977.208 1070.68 978.847 1068.89 980.239C1068.44 980.601 1067.93 980.972 1067.44 981.319C1067.15 981.527 1066.87 981.726 1066.63 981.909C1065.92 982.447 1065.34 982.966 1064.93 983.571Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth31Diagnozis.culttab &&
                !tooth31Diagnozis.abutment &&
                !tooth31Diagnozis.implant &&
                !tooth31Diagnozis.apex &&
                !tooth31Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1114.9,983.6c-1.2-3-3.3-5.5-5.3-7.9c-2.4-2.9-4.8-5.9-6.9-9c-1.5-2.1-2.9-4.3-4.2-6.6
                            c-1.5-2.6-3-5.3-5.1-7.3c-2.7-2.4-6-3.5-9.6-3c-4.7,0.7-8.6,4-11.7,7.9c-2.4,3-4.5,6.3-6.7,9.5c-2.1,3.1-4.2,6-6.9,8.5
                            c-2.3,2.2-5,4-6.6,6.9c-1.9,3.4-2,7.7-0.4,11.3c1.2,2.8,3.1,4.9,5.4,6.5c1.7,1.3,3.7,2.3,5.6,3.1c6.1,2.6,12.8,3.8,19.6,3.8
                            c8,0,16-1.5,23.2-4.9c1.8-0.9,3.7-1.9,5.3-3.2c1.8-1.5,3.3-3.2,4.3-5.5C1116.2,990.6,1116.2,986.9,1114.9,983.6z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth31.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1049.54 982.551C1051.18 979.352 1055.24 976.026 1057.56 973.538C1059.5 971.571 1060.01 970.719 1061.6 968.38C1063.21 966.018 1065.9 962.167 1067.44 959.713C1068.78 957.576 1070.15 956.83 1071.65 954.829C1073.41 952.543 1074.21 950.41 1076.44 948.814C1078.37 947.431 1081.67 946.451 1083.95 946.121C1087.65 945.588 1091.2 946.832 1094.07 949.498C1096.26 951.63 1097.9 953.458 1099.4 956.301C1100.55 958.395 1101.78 961.82 1103.07 963.827C1104.42 965.939 1105.84 966.627 1107.29 968.626C1108.56 970.37 1109.85 973.44 1111.16 975.087C1113.35 977.753 1115.54 979.225 1116.91 982.601C1118.27 986.511 1118.41 991.969 1117.04 995.524C1116.27 997.389 1115.16 1000.34 1113.85 1001.69C1111.9 1003.7 1109.51 1003.85 1107.06 1005.12C1103.45 1006.91 1099.62 1009.58 1095.69 1010.45C1091.43 1011.39 1087.06 1010.45 1082.72 1010.45C1079.4 1010.37 1076.11 1011.42 1072.88 1010.8C1069.19 1010.1 1065.58 1007.62 1062.08 1006.01C1059.6 1004.81 1057.16 1004.75 1055.06 1002.91C1053.1 1001.19 1051.44 999.113 1050.32 996.54C1049.46 994.407 1049.05 990.757 1049.15 988.51C1049.24 986.452 1048.56 984.42 1049.54 982.551ZM1101.1 996.001C1104.1 994.801 1107 993.201 1108.4 990.601C1109.4 988.601 1109.3 986.301 1108.3 984.101C1107.3 982.201 1105.7 980.601 1104.1 979.101C1101 976.101 1098 972.801 1095.5 969.301C1094.4 967.701 1093.2 965.901 1091.6 964.701C1089.5 963.201 1086.9 962.501 1084.2 962.801C1080.6 963.201 1077.6 965.301 1075.2 967.701C1071.6 971.401 1069 975.801 1064.9 979.001C1063.2 980.401 1061.1 981.501 1059.9 983.301C1058.4 985.501 1058.4 988.101 1059.6 990.401C1061.3 993.401 1064.7 995.201 1068.2 996.501C1073 998.201 1078.1 998.901 1083.3 999.001C1089.4 999.001 1095.6 998.101 1101.1 996.001Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1049.54 982.551C1051.18 979.352 1055.24 976.026 1057.56 973.538C1059.5 971.571 1060.01 970.719 1061.6 968.38C1063.21 966.018 1065.9 962.167 1067.44 959.713C1068.78 957.576 1070.15 956.83 1071.65 954.829C1073.41 952.543 1074.21 950.41 1076.44 948.814C1078.37 947.431 1081.67 946.451 1083.95 946.121C1087.65 945.588 1091.2 946.832 1094.07 949.498C1096.26 951.63 1097.9 953.458 1099.4 956.301C1100.55 958.395 1101.78 961.82 1103.07 963.827C1104.42 965.939 1105.84 966.627 1107.29 968.626C1108.56 970.37 1109.85 973.44 1111.16 975.087C1113.35 977.753 1115.54 979.225 1116.91 982.601C1118.27 986.511 1118.41 991.969 1117.04 995.524C1116.27 997.389 1115.16 1000.34 1113.85 1001.69C1111.9 1003.7 1109.51 1003.85 1107.06 1005.12C1103.45 1006.91 1099.62 1009.58 1095.69 1010.45C1091.43 1011.39 1087.06 1010.45 1082.72 1010.45C1079.4 1010.37 1076.11 1011.42 1072.88 1010.8C1069.19 1010.1 1065.58 1007.62 1062.08 1006.01C1059.6 1004.81 1057.16 1004.75 1055.06 1002.91C1053.1 1001.19 1051.44 999.113 1050.32 996.54C1049.46 994.407 1049.05 990.757 1049.15 988.51C1049.24 986.452 1048.56 984.42 1049.54 982.551ZM1101.1 996.001C1104.1 994.801 1107 993.201 1108.4 990.601C1109.4 988.601 1109.3 986.301 1108.3 984.101C1107.3 982.201 1105.7 980.601 1104.1 979.101C1101 976.101 1098 972.801 1095.5 969.301C1094.4 967.701 1093.2 965.901 1091.6 964.701C1089.5 963.201 1086.9 962.501 1084.2 962.801C1080.6 963.201 1077.6 965.301 1075.2 967.701C1071.6 971.401 1069 975.801 1064.9 979.001C1063.2 980.401 1061.1 981.501 1059.9 983.301C1058.4 985.501 1058.4 988.101 1059.6 990.401C1061.3 993.401 1064.7 995.201 1068.2 996.501C1073 998.201 1078.1 998.901 1083.3 999.001C1089.4 999.001 1095.6 998.101 1101.1 996.001Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1055.34 982.654C1056.72 980.322 1060.14 977.896 1062.1 976.082C1063.73 974.647 1064.16 974.026 1065.5 972.32C1066.85 970.598 1069.12 967.789 1070.41 966C1071.54 964.442 1072.7 963.898 1073.96 962.438C1075.44 960.771 1076.12 959.216 1078 958.052C1079.63 957.044 1082.4 956.329 1084.32 956.088C1087.43 955.7 1090.43 956.607 1092.85 958.551C1094.69 960.106 1096.07 961.438 1097.34 963.512C1098.31 965.039 1099.34 967.537 1100.42 969C1101.56 970.54 1102.75 971.042 1103.98 972.5C1105.04 973.772 1106.14 976.01 1107.24 977.212C1109.08 979.155 1110.93 980.229 1112.08 982.691C1113.23 985.542 1113.34 989.523 1112.19 992.114C1111.54 993.475 1110.61 995.624 1109.5 996.613C1107.86 998.074 1105.85 998.185 1103.79 999.112C1100.74 1000.42 1097.52 1002.37 1094.21 1003C1090.62 1003.68 1086.94 1003 1083.29 1003C1080.49 1002.94 1077.72 1003.71 1075 1003.26C1071.89 1002.74 1068.85 1000.93 1065.9 999.76C1063.82 998.889 1061.76 998.844 1059.99 997.5C1058.34 996.246 1056.94 994.732 1056 992.855C1055.28 991.3 1054.93 988.638 1055.01 987C1055.09 985.499 1054.52 984.017 1055.34 982.654ZM1101.1 996.001C1104.1 994.801 1107 993.201 1108.4 990.601C1109.4 988.601 1109.3 986.301 1108.3 984.101C1107.3 982.201 1105.7 980.601 1104.1 979.101C1101 976.101 1098 972.801 1095.5 969.301C1094.4 967.701 1093.2 965.901 1091.6 964.701C1089.5 963.201 1086.9 962.501 1084.2 962.801C1080.6 963.201 1077.6 965.301 1075.2 967.701C1071.6 971.401 1069 975.801 1064.9 979.001C1063.2 980.401 1061.1 981.501 1059.9 983.301C1058.4 985.501 1058.4 988.101 1059.6 990.401C1061.3 993.401 1064.7 995.201 1068.2 996.501C1073 998.201 1078.1 998.901 1083.3 999.001C1089.4 999.001 1095.6 998.101 1101.1 996.001Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth31Diagnozis.culttab &&
                !tooth31Diagnozis.abutment &&
                !tooth31Diagnozis.implant &&
                !tooth31Diagnozis.shaper &&
                !tooth31Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС LEFT*/}
            <g
              id="s_header_31_4"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1069.8,988.5c-1.4,2.1-8.2,8-13,11.9c-2.3-1.7-4.2-3.8-5.4-6.5c-1.6-3.6-1.5-7.8,0.4-11.3
                                c1.6-2.8,4.3-4.7,6.6-6.9c2.6-2.5,4.8-5.5,6.9-8.5c1.1,2.4,3.3,7.3,4.5,10.1c0.5,1.2,1,2.5,1.2,3.7
                                C1071.6,983.7,1071.3,986.3,1069.8,988.5z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth31.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth31.seal_left ? `seal-fill ${teethDiagnozis.tooth31.seal_left_color}` : ''}
                                `}
                d="M1069.8,988.5c-1.4,2.1-8.2,8-13,11.9c-2.3-1.7-4.2-3.8-5.4-6.5c-1.6-3.6-1.5-7.8,0.4-11.3
                                c1.6-2.8,4.3-4.7,6.6-6.9c2.6-2.5,4.8-5.5,6.9-8.5c1.1,2.4,3.3,7.3,4.5,10.1c0.5,1.2,1,2.5,1.2,3.7
                                C1071.6,983.7,1071.3,986.3,1069.8,988.5z"
              />
            </g>
            <g
              id="s_header_31_3"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M1102.6,966.7c-2.8,4.3-8.2,12.9-8.3,15.7c-6.9,0-17.4-0.8-23.3-1.3c-0.2-1.2-0.7-2.5-1.2-3.7
                                c-1.2-2.8-3.4-7.7-4.5-10.1c2.2-3.2,4.3-6.5,6.7-9.5c3.2-3.9,7-7.2,11.7-7.9c3.6-0.5,6.9,0.5,9.6,3c2.1,1.9,3.6,4.7,5.1,7.3
                                C1099.7,962.4,1101.1,964.6,1102.6,966.7z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth31.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth31.seal_bottom ? `seal-fill ${teethDiagnozis.tooth31.seal_bottom_color}` : ''}
                                `}
                d="M1102.6,966.7c-2.8,4.3-8.2,12.9-8.3,15.7c-6.9,0-17.4-0.8-23.3-1.3c-0.2-1.2-0.7-2.5-1.2-3.7
                                c-1.2-2.8-3.4-7.7-4.5-10.1c2.2-3.2,4.3-6.5,6.7-9.5c3.2-3.9,7-7.2,11.7-7.9c3.6-0.5,6.9,0.5,9.6,3c2.1,1.9,3.6,4.7,5.1,7.3
                                C1099.7,962.4,1101.1,964.6,1102.6,966.7z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_31_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M1110.6,999.3c-1.6,1.3-3.4,2.3-5.3,3.2c-7.2,3.4-15.2,4.9-23.2,4.9c-6.7,0-13.4-1.2-19.6-3.8
                                c-2-0.8-3.9-1.9-5.6-3.1c4.8-4,11.6-9.8,13-11.9c1.5-2.2,1.7-4.8,1.2-7.5c5.9,0.5,16.3,1.3,23.3,1.3c0,0.3,0,0.5,0.1,0.6
                                C1095.4,984.5,1104.6,993.5,1110.6,999.3z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth31.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth31.seal_center ? `seal-fill ${teethDiagnozis.tooth31.seal_center_color}` : ''}
                                `}
                d="M1110.6,999.3c-1.6,1.3-3.4,2.3-5.3,3.2c-7.2,3.4-15.2,4.9-23.2,4.9c-6.7,0-13.4-1.2-19.6-3.8
                                c-2-0.8-3.9-1.9-5.6-3.1c4.8-4,11.6-9.8,13-11.9c1.5-2.2,1.7-4.8,1.2-7.5c5.9,0.5,16.3,1.3,23.3,1.3c0,0.3,0,0.5,0.1,0.6
                                C1095.4,984.5,1104.6,993.5,1110.6,999.3z"
              />
            </g>
            {/*КАРИЕС TOP*/}
            <g
              id="s_header_31_1"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M1114.9,993.8c-1,2.2-2.5,4-4.3,5.5c-6-5.8-15.1-14.8-16.1-16.3c-0.1-0.1-0.1-0.4-0.1-0.6
                                c0.1-2.8,5.5-11.4,8.3-15.7c2.2,3.1,4.5,6.1,6.9,9c2,2.4,4.2,4.9,5.3,7.9C1116.2,986.9,1116.2,990.6,1114.9,993.8z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth31.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth31.seal_right ? `seal-fill ${teethDiagnozis.tooth31.seal_right_color}` : ''}
                                `}
                d="M1114.9,993.8c-1,2.2-2.5,4-4.3,5.5c-6-5.8-15.1-14.8-16.1-16.3c-0.1-0.1-0.1-0.4-0.1-0.6
                                c0.1-2.8,5.5-11.4,8.3-15.7c2.2,3.1,4.5,6.1,6.9,9c2,2.4,4.2,4.9,5.3,7.9C1116.2,986.9,1116.2,990.6,1114.9,993.8z"
              />
            </g>
            <g className="with up">
              {/*Черточка право низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_right &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_right &&
                      tooth31Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1093.5 981.5C1096.33 985.167 1103.2 993.3 1108 996.5"
              />
              {/*Право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_right &&
                      !tooth31Diagnozis.seal_bottom) ||
                    (tooth31Diagnozis.seal_bottom &&
                      !tooth31Diagnozis.seal_right)
                      ? 5
                      : 0,
                }}
                d="M1093.5 981.5C1093.83 979.667 1095.5 974.8 1099.5 970"
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_bottom &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_bottom &&
                      tooth31Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1093.5 981.5C1090.5 982.167 1082.2 982.9 1073 980.5"
              />
              {/*Лево верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_left &&
                      !tooth31Diagnozis.seal_bottom) ||
                    (!tooth31Diagnozis.seal_left &&
                      tooth31Diagnozis.seal_bottom &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_left &&
                      tooth31Diagnozis.seal_bottom &&
                      tooth31Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1073 980.5C1072.17 979.5 1070.3 976 1069.5 970"
              />
              {/* Лево низ */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_left &&
                      !tooth31Diagnozis.seal_top &&
                      !tooth31Diagnozis.seal_center) ||
                    (tooth31Diagnozis.seal_left &&
                      !tooth31Diagnozis.seal_top &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_left &&
                      tooth31Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1073 980.5C1072.33 983.167 1068.9 989.9 1060.5 995.5"
              />
            </g>
          </g>
          {/* VINIR */}
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth31Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth31Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1051.5 993.9C1052.7 996.7 1054.6 998.8 1056.9 1000.4C1058.6 1001.7 1060.6 1002.7 1062.5 1003.5C1068.6 1006.1 1075.3 1007.3 1082.1 1007.3C1090.1 1007.3 1098.1 1005.8 1105.3 1002.4C1107.1 1001.5 1109 1000.5 1110.6 999.2C1112.4 997.7 1113.9 996 1114.9 993.7C1115.48 992.33 1115.8 990.842 1115.86 989.323C1113.76 989.217 1107.86 990.065 1100.89 994.239C1100.74 994.328 1100.6 994.415 1100.46 994.5C1099.83 994.867 1099.2 995.199 1098.57 995.514C1093.52 997.933 1087.9 999 1082.28 999C1077.5 999 1072.8 998.146 1068.51 996.296C1067.38 995.814 1066.2 995.23 1065.14 994.5C1065.1 994.473 1065.06 994.445 1065.02 994.417C1058.78 990.09 1052.69 989.311 1050.41 989.465C1050.51 990.987 1050.88 992.497 1051.5 993.9Z"
              ></path>
              <path
                className="st55"
                d="M1064.58 994.09C1064.72 994.202 1064.87 994.311 1065.02 994.417M1102.3 993.237C1101.85 993.601 1101.38 993.932 1100.89 994.239M1100.46 994.5C1099.83 994.867 1099.2 995.199 1098.57 995.514C1093.52 997.933 1087.9 999 1082.28 999C1077.5 999 1072.8 998.146 1068.51 996.296C1067.38 995.814 1066.2 995.23 1065.14 994.5C1065.1 994.473 1065.06 994.445 1065.02 994.417M1100.46 994.5C1100.6 994.415 1100.74 994.328 1100.89 994.239M1100.46 994.5C1100.6 994.412 1100.74 994.325 1100.89 994.239M1100.89 994.239C1107.86 990.065 1113.76 989.217 1115.86 989.323C1115.8 990.842 1115.48 992.33 1114.9 993.7C1113.9 996 1112.4 997.7 1110.6 999.2C1109 1000.5 1107.1 1001.5 1105.3 1002.4C1098.1 1005.8 1090.1 1007.3 1082.1 1007.3C1075.3 1007.3 1068.6 1006.1 1062.5 1003.5C1060.6 1002.7 1058.6 1001.7 1056.9 1000.4C1054.6 998.8 1052.7 996.7 1051.5 993.9C1050.88 992.497 1050.51 990.987 1050.41 989.465C1052.69 989.311 1058.78 990.09 1065.02 994.417"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth31Diagnozis.temporary_crown ||
                tooth31Diagnozis.ceramic_crown ||
                tooth31Diagnozis.mceramic_crown ||
                tooth31Diagnozis.metalic_crown ||
                tooth31Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth31Diagnozis.temporary_crown ||
                tooth31Diagnozis.ceramic_crown ||
                tooth31Diagnozis.mceramic_crown ||
                tooth31Diagnozis.metalic_crown ||
                tooth31Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth31Diagnozis.ceramic_crown_color}
                                ${tooth31Diagnozis.mceramic_crown_color}
                                ${tooth31Diagnozis.metalic_crown_color}
                                ${tooth31Diagnozis.zirconia_crown_color}
                            `}
              d="M1114.9,983.6c-1.2-3-3.3-5.5-5.3-7.9c-2.4-2.9-4.8-5.9-6.9-9c-1.5-2.1-2.9-4.3-4.2-6.6
                            c-1.5-2.6-3-5.3-5.1-7.3c-2.7-2.4-6-3.5-9.6-3c-4.7,0.7-8.6,4-11.7,7.9c-2.4,3-4.5,6.3-6.7,9.5c-2.1,3.1-4.2,6-6.9,8.5
                            c-2.3,2.2-5,4-6.6,6.9c-1.9,3.4-2,7.7-0.4,11.3c1.2,2.8,3.1,4.9,5.4,6.5c1.7,1.3,3.7,2.3,5.6,3.1c6.1,2.6,12.8,3.8,19.6,3.8
                            c8,0,16-1.5,23.2-4.9c1.8-0.9,3.7-1.9,5.3-3.2c1.8-1.5,3.3-3.2,4.3-5.5C1116.2,990.6,1116.2,986.9,1114.9,983.6z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
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
              id="dentin_v_31"
              style={{
                visibility:
                  !tooth31Diagnozis.implant &&
                  !tooth31Diagnozis.apex &&
                  !tooth31Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_31"
                className={`st10 change-color ${tooth31Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1107.5,1206.7c-0.2,0.7-0.5,1.4-0.8,2c-2.4,5.6-5.6,10.8-10.8,14.1
                                c-1.7,1.1-3.6,1.9-5.5,2.5c-3.6,1-7.4,1.1-11,0.1c-1.9-0.5-3.7-1.2-5.5-2.2c-8.3-4.8-12.3-14-15.2-23.1
                                c0.9,14.6,2.4,29.1,3.9,43.7c2,19.9,4.2,39.7,7.2,59.5c2.4,15.4,5.1,30.7,8.9,45.6c1.9,7.4,5.2,14.8,10.8,15.7
                                c-5.6-0.9-9-8.2-10.9-15.7c-3.8-14.9-6.5-30.3-8.9-45.6c-3.1-19.7-5.2-39.6-7.2-59.5c-1.9-18.5-3.8-37.1-4.5-55.6
                                c-0.2-5.2-0.3-10.4-0.3-15.6c0-7.5,0.4-14.9,0.9-22.4l1.4-2.5l1.8-1l37.9,0.1l1.6,1.4l0.9,1.5c1.8,8.6,3.2,17.3,4.1,26
                                c0.5,5,0.9,10.1,1.1,15.2C1107.6,1196.2,1107.6,1201.5,1107.5,1206.7z"
              />
            </g>
            <g
              id="dentin_n_31"
              style={{
                visibility:
                  !tooth31Diagnozis.implant &&
                  !tooth31Diagnozis.abutment &&
                  !tooth31Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_31"
                className={`st10 change-color ${tooth31Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1107,1236.9c0,10.3,0.3,20.7,0.4,31c0,11-0.3,22-0.6,33
                                c-0.2,8.3-0.4,16.7-1.4,24.9c-0.8,6.7-2,13.3-3,20c-1.2,8-3.6,16.3-9,18.4c0,0,0,0,0,0c-0.8,0.3-1.7,0.5-2.6,0.5
                                c-6.4,0.1-10-7.8-12.1-15.8c-3.8-14.9-6.5-30.3-8.9-45.6c-3.1-19.7-5.2-39.6-7.2-59.5c-1.5-14.5-2.9-29.1-3.9-43.7
                                c2.9,9.1,6.9,18.4,15.2,23.1c1.7,1,3.6,1.7,5.5,2.2c3.6,0.9,7.4,0.9,11-0.1c1.9-0.5,3.8-1.4,5.5-2.5c5.2-3.3,8.4-8.5,10.8-14.1
                                c0.3-0.7,0.6-1.4,0.9-2.2C1107.5,1216.7,1107,1226.8,1107,1236.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.pulpit ? 'pulpit' : ''} ${tooth31Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1091.2,1201.6c0,4.4-0.4,8.8-0.5,13.2c-0.2,3.5-0.2,7-0.3,10.5
                                c-0.9,0.3-1.9,0.5-2.8,0.6c-1.4,0.2-2.8,0.2-4.2,0.2c-0.2,0-0.4,0-0.7-0.1c-1.1-0.1-2.2-0.3-3.3-0.6c0,0,0,0,0,0
                                c-0.6-3.5-1.2-7-1.8-10.5c-1.1-6.3-2.3-12.7-3-19.1c-0.7-6.7-0.9-13.4-0.5-20l1.2-2l12.7-0.2l1,1.8c0.6,3.9,1.1,7.9,1.4,11.9
                                C1090.9,1192.1,1091.2,1196.8,1091.2,1201.6z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.pulpit ? 'pulpit' : ''} ${tooth31Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1091.7,1294.8c-0.2,0-0.5,0-0.8,0.1c-1.4,0.1-2.8,0-4.1-0.3
                                c-0.2-2.2-0.3-4.4-0.5-6.6c-1-13.2-2.1-26.4-3.7-39.5c-0.9-7.7-2.1-15.3-3.3-22.9v0c0,0,0,0,0,0c1.1,0.3,2.2,0.5,3.3,0.6
                                c0.2,0,0.4,0,0.7,0.1c1.4,0.1,2.8,0,4.2-0.2c0.9-0.1,1.9-0.3,2.8-0.6c0,0,0,0,0,0c0,5.2,0,10.4,0.1,15.7
                                c0.2,15.7,0.7,31.4,1.1,47.1C1091.6,1290.3,1091.7,1292.6,1091.7,1294.8z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.pulpit ? 'pulpit' : ''} ${tooth31Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1093.4,1364.2v0.2C1093.4,1364.3,1093.4,1364.3,1093.4,1364.2L1093.4,1364.2
                                c-1.8-13.7-3.2-27.5-4.4-41.3c-0.8-9.4-1.5-18.9-2.2-28.3c1.4,0.3,2.7,0.4,4.1,0.3c0.2,0,0.5,0,0.8-0.1
                                c0.3,10.8,0.6,21.6,0.9,32.5C1092.9,1339.6,1093.2,1351.9,1093.4,1364.2z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage31 />
            {/* <g className="level hEmpty hImplant periodontitis"  dataposition="31"  style={{visibility: 'inherit', opacity:0}}>
                            <circle className="st42" cx="1094.9" cy="1364.7" r="8.2"></circle>
                        </g>
                        <g className="level hEmpty hImplant periodontitis"  dataposition="31"  style={{visibility: 'inherit', opacity:0}}>
                            <circle className="st42" cx="1095.9" cy="1372.9" r="17.5"></circle>
                        </g>
                        <g className="level hEmpty hImplant periodontitis"  dataposition="31"  style={{visibility: 'inherit', opacity:0}}>
                            <circle className="st42" cx="1100" cy="1382.9" r="30"></circle>
                        </g> */}
          </g>
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth31Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1107.5 1206.6C1107.2 1207.3 1106.9 1208 1106.6 1208.8C1104.2 1214.4 1101 1219.6 1095.8 1222.9C1094.1 1224 1092.2 1224.8 1090.3 1225.4H1090.2C1086.6 1226.4 1082.9 1226.4 1079.3 1225.5C1078.9 1225.4 1078.5 1225.3 1078.1 1225.2C1076.6 1224.7 1075.2 1224.1 1073.8 1223.3C1065.5 1218.5 1061.5 1209.3 1058.6 1200.2C1058.3 1196.2 1058.1 1192.2 1058 1188.3C1057.8 1183.1 1057.7 1177.9 1057.7 1172.7C1057.7 1165.2 1058 1157.8 1058.7 1150.3L1060.1 1147.8L1061.8 1146.8L1099.7 1146.9L1101.3 1148.3L1102.2 
                            1149.8C1104 1158.4 1105.4 1167 1106.3 1175.8C1106.8 1180.8 1107.2 1185.9 1107.4 1191C1107.6 1196.2 1107.6 1201.4 1107.5 1206.6Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M1069 1146.9L1078.1 1225.1L1085.9 1292.2L1088.2 1311.9C1088.3 1312.9 1089.2 1313.7 1090.2 1313.7C1091.3 1313.7 1092.3 1312.8 1092.2 1311.6L1091.6 1286.3L1090.1 1225.3L1088.2 1146.9H1069Z"
              style={{ fill: tooth31Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth31Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth31Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M1090.2,1313.7L1090.2,1313.7c-1,0-1.9-0.8-2-1.8l-10.1-86.8c0.4,0.1,0.8,0.2,1.2,0.3
                            c3.6,0.9,7.4,0.9,10.9-0.1l2,86.3C1092.3,1312.8,1091.4,1313.7,1090.2,1313.7z"
            />
            <path
              className="st15"
              d="M1107.5,1206.6c-0.3,0.7-0.6,1.4-0.9,2.2c-2.4,5.6-5.6,10.8-10.8,14.1c-1.7,1.1-3.6,1.9-5.5,2.5
                            c0,0-0.1,0-0.1,0c-3.6,1-7.3,1-10.9,0.1c-0.4-0.1-0.8-0.2-1.2-0.3c-1.5-0.5-2.9-1.1-4.3-1.9c-8.3-4.8-12.3-14-15.2-23.1
                            c-0.3-4-0.5-8-0.6-11.9c-0.2-5.2-0.3-10.4-0.3-15.6c0-7.5,0.3-14.9,1-22.4l1.4-2.5l1.7-1l37.9,0.1l1.6,1.4l0.9,1.5
                            c1.8,8.6,3.2,17.2,4.1,26c0.5,5,0.9,10.1,1.1,15.2C1107.6,1196.2,1107.6,1201.4,1107.5,1206.6z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth31Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth31Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M1107.5,1206.6l-10.3,30.4l-21.1,0.8l-17.5-37.6c2.9,9.1,6.9,18.3,15.2,23.1c6.9,3.9,15.3,3.8,22-0.4
                            c5.2-3.3,8.4-8.5,10.8-14.1C1107,1208.1,1107.3,1207.4,1107.5,1206.6z"
            />
            <path
              className="st17"
              d="M1107.5,1206.6c-0.3,0.7-0.6,1.5-0.9,2.2c-2.4,5.6-5.6,10.8-10.8,14.1c-6.7,4.2-15.1,4.3-22,0.4
                            c-8.3-4.7-12.3-14-15.2-23.1c-0.3-4-0.5-8-0.6-11.9c-0.2-5.2-0.3-10.4-0.3-15.6c0-7.5,0.3-14.9,1-22.4l1.4-2.5l1.7-1l37.9,0.1
                            l1.6,1.4l0.9,1.5c1.8,8.6,3.2,17.2,4.1,26c0.5,5,0.9,10.1,1.1,15.2C1107.6,1196.2,1107.6,1201.4,1107.5,1206.6z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1102.42 1196.45C1102.62 1194.08 1100.72 1192.07 1098.35 1192.12L1072.57 1192.7C1070.2 1192.75 1068.39 1194.85 1068.69 1197.2L1073.68 1236.51C1073.94 1238.55 1075.71 1240.06 1077.76 1240.01L1095.31 1239.52C1097.35 1239.46 1099.02 1237.88 1099.19 1235.85L1102.42 1196.45Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth31Diagnozis.abutment ||
                tooth31Diagnozis.implant ||
                tooth31Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1103.3,1237c0,0,1.3,40,1.5,49.4c0.2,9.4-0.7,70.2-0.7,70.2s-5.1,6.9-11.9,6.2s-10.7-5.7-10.9-7
                            c-0.3-1.3-4.8-46.2-5.4-52.3c-0.6-6.1-6-65.7-6-65.7L1103.3,1237z"
            />
            <line
              className="st19"
              x1="1108"
              y1="1247.5"
              x2="1066.6"
              y2="1255"
            />
            <line
              className="st19"
              x1="1108"
              y1="1271.5"
              x2="1068.6"
              y2="1278"
            />
            <line
              className="st19"
              x1="1110"
              y1="1294.5"
              x2="1070.6"
              y2="1301"
            />
            <line
              className="st19"
              x1="1111"
              y1="1317.5"
              x2="1071.6"
              y2="1324"
            />
            <line
              className="st19"
              x1="1112"
              y1="1341.5"
              x2="1072.6"
              y2="1348"
            />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth31Diagnozis.culttab &&
                !tooth31Diagnozis.abutment &&
                !tooth31Diagnozis.implant &&
                !tooth31Diagnozis.shaper &&
                !tooth31Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1114.9,1130c0.1-1.7-0.4-3.5-1.5-4.8c-1-1.2-2.3-2.1-3.8-2.5l-13.1,0.1l-32.3,0.3
                            l-9.4,0.1c-0.9-0.1-1.7,0.1-2.5,0.5c-1.9,1-2.9,3.1-2.5,5.2c-0.9,12.1-0.6,24.2,0.9,36.3c1.5,11.8,4.1,23.5,7.7,34.8
                            c0.1,0.3,0.2,0.7,0.3,1.1c2.9,8.9,6.9,17.7,15,22.3c6.9,3.9,15.3,3.8,22-0.4c5.2-3.3,8.4-8.5,10.8-14.1c1.2-2.7,2.1-5.5,2.9-8.4
                            c1.8-6.2,2.8-12.6,3.6-19C1115.3,1164.4,1115.9,1147.2,1114.9,1130z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth31Diagnozis.culttab && !tooth31Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1113.4 1125.2C1114.5 1126.5 1115 1128.3 1114.9 1130C1115.9 1147.2 1115.3 1164.4 1113 1181.5C1112.2 1187.9 1111.2 1194.3 1109.4 1200.5C1108.6 1203.4 1107.7 1206.2 1106.5 1208.9C1104.1 1214.5 1100.9 1219.7 1095.7 1223C1089 1227.2 1080.6 1227.3 1073.7 1223.4C1065.6 1218.8 1061.6 1210 1058.7 1201.1L1058.7 1201.1C1058.6 1200.7 1058.5 1200.3 1058.4 1200C1054.8 1188.7 1052.2 1177 1050.7 1165.2C1049.2 1153.1 1048.9 1141 1049.8 1128.9C1049.4 1126.8 1050.4 1124.7 1052.3 1123.7C1053.1 1123.3 1053.9 1123.1 1054.8 1123.2L1064.2 1123.1L1096.5 1122.8L1109.6 1122.7C1111.1 1123.1 1112.4 1124 1113.4 1125.2ZM1065.53 1201.16C1065.45 1200.86 1065.38 1200.56 1065.31 1200.34C1064.71 1198.43 1064.15 1196.52 1063.63 1194.59C1063.3 1193.35 1064.21 1192.14 1065.49 1192.11L1102.6 1191.07C1103.85 1191.03 1104.83 1192.13 1104.61 1193.36C1104.18 1195.84 1103.65 1198.29 1102.96 1200.71C1102.37 1202.88 1101.7 1204.98 1100.82 1207C1099.04 1211.2 1096.68 1215.1 1092.84 1217.57C1087.9 1220.72 1081.7 1220.79 1076.6 1217.87C1070.62 1214.42 1067.67 1207.83 1065.53 1201.16L1065.53 1201.16Z"
            ></path>
            <path
              className={`st7 ${tooth31Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1065.31 1200.34C1065.38 1200.56 1065.45 1200.86 1065.53 1201.16L1065.53 1201.16C1067.67 1207.83 1070.62 1214.42 1076.6 1217.87C1081.7 1220.79 1087.9 1220.72 1092.84 1217.57C1096.68 1215.1 1099.04 1211.2 1100.82 1207C1101.7 1204.98 1102.37 1202.88 1102.96 1200.71C1103.65 1198.29 1104.18 1195.84 1104.61 1193.36C1104.83 1192.13 1103.85 1191.03 1102.6 1191.07L1065.49 1192.11C1064.21 1192.14 1063.3 1193.35 1063.63 1194.59C1064.15 1196.52 1064.71 1198.43 1065.31 1200.34Z"
            />
            <path
              className={`st60
                                    ${tooth31Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth31Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth31Diagnozis.seal_cervical_color}
                                `}
              d="M1065.31 1200.34C1065.38 1200.56 1065.45 1200.86 1065.53 1201.16L1065.53 1201.16C1067.67 1207.83 1070.62 1214.42 1076.6 1217.87C1081.7 1220.79 1087.9 1220.72 1092.84 1217.57C1096.68 1215.1 1099.04 1211.2 1100.82 1207C1101.7 1204.98 1102.37 1202.88 1102.96 1200.71C1103.65 1198.29 1104.18 1195.84 1104.61 1193.36C1104.83 1192.13 1103.85 1191.03 1102.6 1191.07L1065.49 1192.11C1064.21 1192.14 1063.3 1193.35 1063.63 1194.59C1064.15 1196.52 1064.71 1198.43 1065.31 1200.34Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar hImplant hEmpty"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth31.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1054.5 1186L1057 1187.5L1058.5 1190.5V1192L1060 1193.5V1195.5L1062 1200.5V1203.5L1064.5 1206.5L1066.5 1211L1067 1213.5L1068.5 1216L1069.5 1217L1072 1219L1073.5 1219.5L1074.5 1220.5L1079 1223L1082 1224L1083.5 1223H1086.5L1090.5 1222L1093.5 1220.5H1096L1097.5 1219L1100.5 1217L1102 1213.5L1104 1209L1105.5 1206.5V1204.5L1107 1203.5L1108 1200.5L1107.5 1199L1108 1197.5V1195L1110 1191L1110.5 1188.5L1111 1186.5L1113 1184.5L1113.5 1185V1186.5L1113 1188.5V1189.5V1192L1112.5 1193.5L1111.5 1196.5V1198V1200.5L1111 1201.5L1110 1203.5V1205V1207.5L1108.5 1209V1211V1212.5L1108 1214V1217L1108.5 1218L1108 1220.5L1107.5 1224V1227.5L1108 1232L1107 1235.5L1107.5 1238L1105.5 1240.5L1102 1242L1097.5 1246L1092 1248.5L1086.5 1249.5H1081L1077 1247.5H1073.5L1072 1246H1068.5L1066.5 1243L1063.5 1242L1062 1239.5V1237L1061 1233V1229.5L1060 1227.5V1225L1058.5 1223L1059 1221.5V1219L1058.5 1217L1059.5 1214.5L1058.5 1212.5V1207.5L1057 1205V1200.5L1055.5 1198L1054.5 1194.5L1055 1192L1053.5 1188L1054.5 1186Z"
            ></path>
            <path
              className="st61 level1"
              d="M1054.5 1186L1057 1187.5L1058.5 1190.5V1192L1060 1193.5V1195.5L1062 1200.5V1203.5L1064.5 1206.5L1066.5 1211L1067 1213.5L1068.5 1216L1069.5 1217L1072 1219L1073.5 1219.5L1074.5 1220.5L1079 1223L1082 1224L1083.5 1223H1086.5L1090.5 1222L1093.5 1220.5H1096L1097.5 1219L1100.5 1217L1102 1213.5L1104 1209L1105.5 1206.5V1204.5L1107 1203.5L1108 1200.5L1107.5 1199L1108 1197.5V1195L1110 1191L1110.5 1188.5L1111 1186.5L1113 1184.5V1186.5L1112.5 1189.5V1192L1111.5 1194.5L1111 1197L1110.5 1200.5L1109 1203.5V1206.5L1108 1209V1212.5L1107.5 1214.5V1216L1106 1218.5L1104 1220L1101.5 1221.5L1099.5 1224L1096 1225L1093.5 1225.5L1091.5 1227L1088.5 1228L1086.5 1229H1083.5L1080.5 1228H1077.5L1074.5 1227L1069.5 1225.5L1068.5 1224L1065.5 1222H1063L1061.5 1220L1060 1217V1214.5L1059 1212.5L1059.5 1211.5L1059 1210V1208.5L1058 1206L1057.5 1203.5V1201.5L1057 1199.5L1055.5 1197L1055 1194V1191.5L1054.5 1189.5L1054 1187.5L1054.5 1186Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth31Diagnozis.culttab &&
                !tooth31Diagnozis.abutment &&
                !tooth31Diagnozis.implant &&
                !tooth31Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M1113.2,1181.4c-0.8,6.4-1.8,12.8-3.6,19c-2.4-2-5.8-4.9-6.6-6.6c-1.3-2.7-2.1-12.3-3.7-30.8
                                c-1.2-13.4-2.2-31.4-2.7-40.3l13.1-0.1c1.5,0.4,2.8,1.3,3.8,2.5c1.1,1.4,1.6,3.1,1.5,4.8
                                C1115.9,1147.2,1115.3,1164.4,1113.2,1181.4z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth31.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth31.seal_right ? `seal-fill ${teethDiagnozis.tooth31.seal_right_color}` : ''}
                            `}
                d="M1113.2,1181.4c-0.8,6.4-1.8,12.8-3.6,19c-2.4-2-5.8-4.9-6.6-6.6c-1.3-2.7-2.1-12.3-3.7-30.8
                                c-1.2-13.4-2.2-31.4-2.7-40.3l13.1-0.1c1.5,0.4,2.8,1.3,3.8,2.5c1.1,1.4,1.6,3.1,1.5,4.8
                                C1115.9,1147.2,1115.3,1164.4,1113.2,1181.4z"
                style={{
                  fill: teethDiagnozis.tooth31.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth31.seal_right
                      ? teethDiagnozis.tooth31.seal_right_color
                      : 'transparent',
                }}
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
                d="M1058.9,1201c-0.1-0.4-0.2-0.7-0.3-1.1c-3.6-11.3-6.2-23-7.7-34.8c-1.5-12-1.8-24.2-0.9-36.3
                                c-0.4-2.1,0.6-4.2,2.5-5.2c0.8-0.4,1.6-0.6,2.5-0.5l9.4-0.1v44.8C1064.3,1180.9,1066,1195.2,1058.9,1201z"
              />
              <path
                className={`
                                st8 target caries-left 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth31.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth31.seal_left ? `seal-fill ${teethDiagnozis.tooth31.seal_left_color}` : ''}
                            `}
                d="M1058.9,1201c-0.1-0.4-0.2-0.7-0.3-1.1c-3.6-11.3-6.2-23-7.7-34.8c-1.5-12-1.8-24.2-0.9-36.3
                                c-0.4-2.1,0.6-4.2,2.5-5.2c0.8-0.4,1.6-0.6,2.5-0.5l9.4-0.1v44.8C1064.3,1180.9,1066,1195.2,1058.9,1201z"
                style={{
                  fill: teethDiagnozis.tooth31.caries_left
                    ? '#606c80'
                    : teethDiagnozis.tooth31.seal_left
                      ? teethDiagnozis.tooth31.seal_left_color
                      : 'transparent',
                }}
              />
            </g>
            <g
              className="caries-filling center"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M1109.6,1200.4c-0.8,2.9-1.8,5.7-2.9,8.4c-2.4,5.6-5.6,10.8-10.8,14.1c-6.7,4.2-15.1,4.3-22,0.4
                                c-8.1-4.6-12.1-13.4-15-22.3c7.2-5.8,5.4-20.1,5.4-33.1v-44.8l32.3-0.3c0.5,8.9,1.5,26.9,2.7,40.3c1.6,18.5,2.4,28.1,3.7,30.8
                                C1103.8,1195.5,1107.2,1198.4,1109.6,1200.4z"
              />
              <path
                className={`
                                st8 target caries-center 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth31.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth31.seal_center ? `seal-fill ${teethDiagnozis.tooth31.seal_center_color}` : ''}
                            `}
                d="M1109.6,1200.4c-0.8,2.9-1.8,5.7-2.9,8.4c-2.4,5.6-5.6,10.8-10.8,14.1c-6.7,4.2-15.1,4.3-22,0.4
                                c-8.1-4.6-12.1-13.4-15-22.3c7.2-5.8,5.4-20.1,5.4-33.1v-44.8l32.3-0.3c0.5,8.9,1.5,26.9,2.7,40.3c1.6,18.5,2.4,28.1,3.7,30.8
                                C1103.8,1195.5,1107.2,1198.4,1109.6,1200.4z"
                style={{
                  fill: teethDiagnozis.tooth31.caries_center
                    ? '#606c80'
                    : teethDiagnozis.tooth31.seal_center
                      ? teethDiagnozis.tooth31.seal_center_color
                      : 'transparent',
                }}
              />
            </g>
            <g className="with down">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_right &&
                      !tooth31Diagnozis.seal_top &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_right &&
                      tooth31Diagnozis.seal_top) ||
                    (tooth31Diagnozis.seal_center &&
                      !tooth31Diagnozis.seal_right)
                      ? 5
                      : 0,
                }}
                d="M1100 1164L1097.5 1128"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_right &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_right &&
                      tooth31Diagnozis.seal_top &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_right &&
                      !tooth31Diagnozis.seal_top &&
                      tooth31Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1100 1164C1101.5 1188 1102 1191 1105.5 1196.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_left &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_left &&
                      tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_left &&
                      tooth31Diagnozis.seal_top &&
                      tooth31Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1065 1165.5V1128.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth31Diagnozis.seal_left &&
                      !tooth31Diagnozis.seal_center) ||
                    (!tooth31Diagnozis.seal_left &&
                      tooth31Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1065 1165.5C1065 1182 1066 1190.5 1063 1196"
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
                visibility: tooth31Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth31Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1114.9 1130C1115 1128.3 1114.5 1126.5 1113.4 1125.2C1112.4 1124 1111.1 1123.1 1109.6 1122.7L1096.5 1122.8L1064.2 1123.1L1054.8 1123.2C1053.9 1123.1 1053.1 1123.3 1052.3 1123.7C1050.4 1124.7 1049.4 1126.8 1049.8 1128.9C1048.9 1141 1049.2 1153.1 1050.7 1165.2C1052.2 1177 1054.8 1188.7 1058.4 1200C1058.5 1200.3 1058.6 1200.7 1058.7 1201.1C1061.6 1210 1065.6 1218.8 1073.7 1223.4C1080.6 1227.3 1089 1227.2 1095.7 1223C1100.9 1219.7 1104.1 1214.5 1106.5 1208.9C1107.7 1206.2 1108.6 1203.4 1109.4 1200.5C1111.2 1194.3 1112.2 1187.9 1113 1181.5C1115.3 1164.4 1115.9 1147.2 1114.9 1130Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth31Diagnozis.temporary_crown ||
                tooth31Diagnozis.ceramic_crown ||
                tooth31Diagnozis.mceramic_crown ||
                tooth31Diagnozis.metalic_crown ||
                tooth31Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth31Diagnozis.temporary_crown ||
                tooth31Diagnozis.ceramic_crown ||
                tooth31Diagnozis.mceramic_crown ||
                tooth31Diagnozis.metalic_crown ||
                tooth31Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth31Diagnozis.ceramic_crown_color}
                                ${tooth31Diagnozis.mceramic_crown_color}
                                ${tooth31Diagnozis.metalic_crown_color}
                                ${tooth31Diagnozis.zirconia_crown_color}
                            `}
              d="M1114.9,1130c0.1-1.7-0.4-3.5-1.5-4.8c-1-1.2-2.3-2.1-3.8-2.5l-13.1,0.1l-32.3,0.3
                            l-9.4,0.1c-0.9-0.1-1.7,0.1-2.5,0.5c-1.9,1-2.9,3.1-2.5,5.2c-0.9,12.1-0.6,24.2,0.9,36.3c1.5,11.8,4.1,23.5,7.7,34.8
                            c0.1,0.3,0.2,0.7,0.3,1.1c2.9,8.9,6.9,17.7,15,22.3c6.9,3.9,15.3,3.8,22-0.4c5.2-3.3,8.4-8.5,10.8-14.1c1.2-2.7,2.1-5.5,2.9-8.4
                            c1.8-6.2,2.8-12.6,3.6-19C1115.3,1164.4,1115.9,1147.2,1114.9,1130z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
