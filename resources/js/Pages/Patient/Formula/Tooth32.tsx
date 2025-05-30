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
import PeriodontitStage32 from './periodontit32';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth32() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth32Diagnozis = teethDiagnozis.tooth32;
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
        teethDiagnozis.tooth32.caries_bottom =
          !teethDiagnozis.tooth32.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth32.caries_center =
          !teethDiagnozis.tooth32.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth32.caries_left =
          !teethDiagnozis.tooth32.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth32.caries_right =
          !teethDiagnozis.tooth32.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth32.caries_top = !teethDiagnozis.tooth32.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth32.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth32.seal_center_color = sealColor1;
          teethDiagnozis.tooth32.seal_center = true;
        } else if (
          teethDiagnozis.tooth32.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth32.seal_center_color = sealColor2;
          teethDiagnozis.tooth32.seal_center = true;
        } else if (
          teethDiagnozis.tooth32.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth32.seal_center_color = sealColor3;
          teethDiagnozis.tooth32.seal_center = true;
        } else {
          teethDiagnozis.tooth32.seal_center =
            !teethDiagnozis.tooth32.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth32.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth32.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth32.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth32.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth32.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth32.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth32.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth32.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth32.seal_bottom = true;
        } else {
          teethDiagnozis.tooth32.seal_bottom =
            !teethDiagnozis.tooth32.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth32.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth32.seal_left_color = sealColor1;
          teethDiagnozis.tooth32.seal_left = true;
        } else if (
          teethDiagnozis.tooth32.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth32.seal_left_color = sealColor2;
          teethDiagnozis.tooth32.seal_left = true;
        } else if (
          teethDiagnozis.tooth32.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth32.seal_left_color = sealColor3;
          teethDiagnozis.tooth32.seal_left = true;
        } else {
          teethDiagnozis.tooth32.seal_left = !teethDiagnozis.tooth32.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth32.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth32.seal_right_color = sealColor1;
          teethDiagnozis.tooth32.seal_right = true;
        } else if (
          teethDiagnozis.tooth32.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth32.seal_right_color = sealColor2;
          teethDiagnozis.tooth32.seal_right = true;
        } else if (
          teethDiagnozis.tooth32.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth32.seal_right_color = sealColor3;
          teethDiagnozis.tooth32.seal_right = true;
        } else {
          teethDiagnozis.tooth32.seal_right =
            !teethDiagnozis.tooth32.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth32.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth32.seal_top_color = sealColor1;
          teethDiagnozis.tooth32.seal_top = true;
        } else if (
          teethDiagnozis.tooth32.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth32.seal_top_color = sealColor2;
          teethDiagnozis.tooth32.seal_top = true;
        } else if (
          teethDiagnozis.tooth32.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth32.seal_top_color = sealColor3;
          teethDiagnozis.tooth32.seal_top = true;
        } else {
          teethDiagnozis.tooth32.seal_top = !teethDiagnozis.tooth32.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth32.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth32.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth32.wedge_shaped_defect_color =
          !teethDiagnozis.tooth32.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth32.show) {
        document.getElementById('TH-32').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth72.show) {
        document.getElementById('TH-72').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth32.show) {
        document.getElementById('TH-32').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth72.show) {
          document.getElementById('TH-72').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth32.show) {
        document.getElementById('TH-72').classList.remove('f-tooth-active');
        document.getElementById('TH-32').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth32.show) {
        document.getElementById('TH-32').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth72.show) {
          document.getElementById('TH-72').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="32"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1124.4463 842.0025)"
          className={`st3 st4 st5 ${selectedTooth === 32 ? 'num-active' : ''}`}
        >
          32
        </text>
      </g>
      <g
        id="TH-32"
        className={`f-tooth-init ${(teethDiagnozis.tooth32.show || allTeeth) && !teethDiagnozis.tooth32.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          teethDiagnozis.tooth32.show = !teethDiagnozis.tooth32.show;
          teethDiagnozis.tooth72.show = false;

          dispatch(setSelectedToothNumber(32));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              32,
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
          className={`underlay ${selectedTooth === 32 ? 'selected' : ''}`}
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
            d="M1119,1202.9c0,0,2,48,5,71s6,60,11,77s14,29,25,28s15-12,17-30s2-66,2-90
                        s2.7-79,3.3-98c1.7-62-17.3-79-16.3-107s15-43.5,15-67.2c0-23.8-0.6-158.8-2-173.8c-2-21-16-28-29-29s-34,4-36,38s0.8,161,1,167
                        c1,26,16,39,16,68s-17,49-15,87S1119,1202.9,1119,1202.9z"
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
                  !tooth32Diagnozis.implant &&
                  !tooth32Diagnozis.apex &&
                  !tooth32Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth32Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1173.4,990.6c-1.4,2.6-4.3,4.2-7.3,5.4c-5.5,2.1-11.7,3-17.8,3c-5.2-0.1-10.3-0.8-15.1-2.5
                                c-3.5-1.3-6.9-3.1-8.6-6.1c-1.2-2.3-1.2-4.9,0.3-7.1c1.2-1.8,3.3-2.9,5-4.3c4.1-3.2,6.7-7.6,10.3-11.3c2.4-2.4,5.4-4.5,9-4.9
                                c2.7-0.3,5.3,0.4,7.4,1.9c1.6,1.2,2.8,3,3.9,4.6c2.5,3.5,5.5,6.8,8.6,9.8c1.6,1.5,3.2,3.1,4.2,5
                                C1174.4,986.3,1174.5,988.6,1173.4,990.6z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth32Diagnozis?.apex || tooth32Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth32Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1173.4 990.6C1172 993.2 1169.1 994.8 1166.1 996C1160.6 998.1 1154.4 999 1148.3 999C1143.1 998.9 1138 998.2 1133.2 996.5C1129.7 995.2 1126.3 993.4 1124.6 990.4C1123.4 988.1 1123.4 985.5 1124.9 983.3C1126.1 981.5 1128.2 980.4 1129.9 979C1134 975.8 1136.6 971.4 1140.2 967.7C1142.6 965.3 1145.6 963.2 1149.2 962.8C1151.9 962.5 1154.5 963.2 1156.6 964.7C1158.2 965.9 1159.4 967.7 1160.5 969.3C1163 972.8 1166 976.1 1169.1 979.1C1170.7 980.6 1172.3 982.2 1173.3 984.1C1174.4 986.3 1174.5 988.6 1173.4 990.6Z"
              />
            </g>
          </g>
          <g className="pulp">
            <g
              style={{
                visibility: tooth32Diagnozis.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                style={{ fill: '#e80808' }}
                d="M1154.25 985.525C1154.25 985.127 1154.67 984.097 1152.65 981.941C1151.15 980.568 1150.64 978.146 1148.72 978.108C1146.65 978.068 1146.08 980.258 1144.74 981.717C1143.13 983.468 1142.91 984.752 1143.1 985.525C1143.5 987.117 1144.59 987.147 1148.72 987.172C1152.84 987.197 1154.25 985.923 1154.25 
                                985.525Z"
              />
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            style={{
              visibility:
                tooth32Diagnozis.implant || tooth32Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1149.5" cy="983.5" r="14.5" />
            <g className="st27">
              <mask id="implant_32" className="st49">
                <path
                  className="st50"
                  d="M1142.34 975.051L1140.52 974.46C1138.98 976.014 1137.83 977.961 1137.24 980.139L1138.66 981.417C1138.54 982.092 1138.47 982.788 1138.47 983.5C1138.47 984.211 1138.54 984.907 1138.66 985.582L1137.24 986.86C1137.83 989.038 1138.98 990.985 1140.52 992.539L1142.34 991.947C1143.39 992.852 1144.61 993.565 1145.95 994.031L1146.34 995.901C1147.39 996.177 1148.49 996.324 1149.62 996.324C1150.75 996.324 1151.85 996.177 1152.9 995.901L1153.3 994.031C1154.63 993.565 1155.85 992.852 1156.9 991.947L1158.72 992.539C1160.26 990.985 1161.41 989.037 1162 986.859L1160.58 985.581C1160.71 984.906 1160.77 984.211 1160.77 983.5C1160.77 982.788 1160.71 982.092 1160.58 981.418L1162 980.139C1161.41 977.962 1160.26 976.014 1158.72 974.46L1156.9 975.052C1155.85 974.147 1154.63 973.434 1153.3 972.968L1152.9 971.099C1151.85 970.823 1150.75 970.676 1149.62 970.676C1148.49 970.676 1147.39 970.823 1146.34 971.099L1145.95 972.968C1144.61 973.434 1143.39 974.147 1142.34 975.051Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1142.34 975.051L1140.52 974.46C1138.98 976.014 1137.83 977.961 1137.24 980.139L1138.66 981.417C1138.54 982.092 1138.47 982.788 1138.47 983.5C1138.47 984.211 1138.54 984.907 1138.66 985.582L1137.24 986.86C1137.83 989.038 1138.98 990.985 1140.52 992.539L1142.34 991.947C1143.39 992.852 1144.61 993.565 1145.95 994.031L1146.34 995.901C1147.39 996.177 1148.49 996.324 1149.62 996.324C1150.75 996.324 1151.85 996.177 1152.9 995.901L1153.3 994.031C1154.63 993.565 1155.85 992.852 1156.9 991.947L1158.72 992.539C1160.26 990.985 1161.41 989.037 1162 986.859L1160.58 985.581C1160.71 984.906 1160.77 984.211 1160.77 983.5C1160.77 982.788 1160.71 982.092 1160.58 981.418L1162 980.139C1161.41 977.962 1160.26 976.014 1158.72 974.46L1156.9 975.052C1155.85 974.147 1154.63 973.434 1153.3 972.968L1152.9 971.099C1151.85 970.823 1150.75 970.676 1149.62 970.676C1148.49 970.676 1147.39 970.823 1146.34 971.099L1145.95 972.968C1144.61 973.434 1143.39 974.147 1142.34 975.051Z"
              ></path>
              <path
                className="st52"
                d="M1140.52 974.46L1141.14 972.558L1139.97 972.177L1139.11 973.05L1140.52 974.46ZM1142.34 975.051L1141.72 976.953L1142.79 977.302L1143.65 976.566L1142.34 975.051ZM1137.24 980.139L1135.31 979.616L1134.99 980.803L1135.9 981.626L1137.24 980.139ZM1138.66 981.417L1140.63 981.788L1140.84 980.682L1140 979.93L1138.66 981.417ZM1138.66 985.582L1140 987.069L1140.84 986.316L1140.63 985.211L1138.66 985.582ZM1137.24 986.86L1135.9 985.373L1134.99 986.196L1135.31 987.383L1137.24 986.86ZM1140.52 992.539L1139.11 993.949L1139.97 994.822L1141.14 994.441L1140.52 992.539ZM1142.34 991.947L1143.65 990.433L1142.79 989.697L1141.72 990.046L1142.34 991.947ZM1145.95 994.031L1147.9 993.617L1147.67 992.514L1146.6 992.143L1145.95 994.031ZM1146.34 995.901L1144.39 996.316L1144.64 997.521L1145.83 997.835L1146.34 995.901ZM1152.9 995.901L1153.41 997.835L1154.6 997.52L1154.86 996.315L1152.9 995.901ZM1153.3 994.031L1152.64 992.142L1151.57 992.514L1151.34 993.616L1153.3 994.031ZM1156.9 991.947L1157.52 990.045L1156.45 989.696L1155.59 990.433L1156.9 991.947ZM1158.72 992.539L1158.1 994.441L1159.27 994.822L1160.14 993.949L1158.72 992.539ZM1162 986.859L1163.93 987.382L1164.25 986.195L1163.34 985.372L1162 986.859ZM1160.58 985.581L1158.61 985.21L1158.4 986.315L1159.24 987.068L1160.58 985.581ZM1160.58 981.418L1159.24 979.931L1158.4 980.683L1158.61 981.789L1160.58 981.418ZM1162 980.139L1163.34 981.627L1164.25 980.804L1163.93 979.617L1162 980.139ZM1158.72 974.46L1160.14 973.05L1159.27 972.177L1158.1 972.558L1158.72 974.46ZM1156.9 975.052L1155.59 976.566L1156.45 977.303L1157.52 976.953L1156.9 975.052ZM1153.3 972.968L1151.34 973.383L1151.57 974.485L1152.64 974.857L1153.3 972.968ZM1152.9 971.099L1154.86 970.685L1154.6 969.48L1153.41 969.165L1152.9 971.099ZM1146.34 971.099L1145.83 969.165L1144.64 969.479L1144.39 970.684L1146.34 971.099ZM1145.95 972.968L1146.6 974.856L1147.67 974.485L1147.9 973.382L1145.95 972.968ZM1139.91 976.362L1141.72 976.953L1142.96 973.15L1141.14 972.558L1139.91 976.362ZM1139.17 980.662C1139.67 978.827 1140.64 977.183 1141.94 975.87L1139.11 973.05C1137.32 974.844 1135.99 977.095 1135.31 979.616L1139.17 980.662ZM1140 979.93L1138.58 978.651L1135.9 981.626L1137.33 982.904L1140 979.93ZM1140.47 983.5C1140.47 982.913 1140.52 982.341 1140.63 981.788L1136.7 981.046C1136.55 981.842 1136.47 982.663 1136.47 983.5H1140.47ZM1140.63 985.211C1140.52 984.658 1140.47 984.086 1140.47 983.5H1136.47C1136.47 984.336 1136.55 985.157 1136.7 985.953L1140.63 985.211ZM1138.58 988.348L1140 987.069L1137.33 984.095L1135.9 985.373L1138.58 988.348ZM1141.94 991.129C1140.64 989.816 1139.67 988.172 1139.17 986.338L1135.31 987.383C1135.99 989.904 1137.32 992.155 1139.11 993.949L1141.94 991.129ZM1141.72 990.046L1139.9 990.637L1141.14 994.441L1142.96 993.849L1141.72 990.046ZM1146.6 992.143C1145.51 991.761 1144.51 991.177 1143.65 990.433L1141.03 993.462C1142.27 994.528 1143.71 995.369 1145.29 995.92L1146.6 992.143ZM1148.3 995.486L1147.9 993.617L1143.99 994.446L1144.39 996.316L1148.3 995.486ZM1149.62 994.324C1148.66 994.324 1147.73 994.2 1146.85 993.967L1145.83 997.835C1147.04 998.154 1148.31 998.324 1149.62 998.324V994.324ZM1152.39 993.967C1151.51 994.199 1150.58 994.324 1149.62 994.324V998.324C1150.93 998.324 1152.2 998.154 1153.41 997.835L1152.39 993.967ZM1151.34 993.616L1150.94 995.486L1154.86 996.315L1155.25 994.445L1151.34 993.616ZM1155.59 990.433C1154.73 991.176 1153.73 991.761 1152.64 992.142L1153.96 995.919C1155.53 995.369 1156.97 994.528 1158.21 993.462L1155.59 990.433ZM1159.34 990.637L1157.52 990.045L1156.28 993.849L1158.1 994.441L1159.34 990.637ZM1160.07 986.337C1159.57 988.171 1158.6 989.815 1157.3 991.129L1160.14 993.949C1161.92 992.154 1163.25 989.903 1163.93 987.382L1160.07 986.337ZM1159.24 987.068L1160.66 988.347L1163.34 985.372L1161.92 984.094L1159.24 987.068ZM1158.77 983.5C1158.77 984.086 1158.72 984.657 1158.61 985.21L1162.54 985.952C1162.69 985.156 1162.77 984.336 1162.77 983.5H1158.77ZM1158.61 981.789C1158.72 982.342 1158.77 982.913 1158.77 983.5H1162.77C1162.77 982.663 1162.69 981.843 1162.54 981.047L1158.61 981.789ZM1160.66 978.652L1159.24 979.931L1161.92 982.905L1163.34 981.627L1160.66 978.652ZM1157.3 975.87C1158.6 977.184 1159.57 978.828 1160.07 980.662L1163.93 979.617C1163.25 977.096 1161.92 974.845 1160.14 973.05L1157.3 975.87ZM1157.52 976.953L1159.34 976.362L1158.1 972.558L1156.28 973.15L1157.52 976.953ZM1152.64 974.857C1153.73 975.238 1154.73 975.823 1155.59 976.566L1158.21 973.537C1156.97 972.471 1155.53 971.63 1153.96 971.08L1152.64 974.857ZM1150.94 971.514L1151.34 973.383L1155.25 972.554L1154.86 970.685L1150.94 971.514ZM1149.62 972.676C1150.58 972.676 1151.51 972.8 1152.39 973.033L1153.41 969.165C1152.2 968.846 1150.93 968.676 1149.62 968.676V972.676ZM1146.85 973.033C1147.73 972.8 1148.66 972.676 1149.62 972.676V968.676C1148.31 968.676 1147.04 968.845 1145.83 969.165L1146.85 973.033ZM1147.9 973.382L1148.3 971.513L1144.39 970.684L1143.99 972.553L1147.9 973.382ZM1143.65 976.566C1144.51 975.822 1145.51 975.238 1146.6 974.856L1145.29 971.079C1143.71 971.63 1142.27 972.471 1141.03 973.537L1143.65 976.566Z"
                mask="url(#implant_32)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <circle
              className="st44"
              r="16.5"
              transform="matrix(-1 0 0 1 1149.5 984.5)"
            />
            <path
              className="st45"
              d="M1151.42 975.739C1150.87 973.804 1148.13 973.804 1147.58 975.739L1147.07 977.511C1146.77 978.549 1145.71 979.164 1144.66 978.902L1142.87 978.454C1140.92 977.965 1139.55 980.339 1140.95 981.785L1142.23 983.109C1142.98 983.884 1142.98 985.116 1142.23 985.891L1140.95 987.215C1139.55 988.661 1140.92 991.035 1142.87 990.546L1144.66 990.098C1145.71 989.836 1146.77 990.451 1147.07 991.489L1147.58 993.261C1148.13 995.196 1150.87 995.196 1151.42 993.261L1151.93 991.489C1152.23 990.451 1153.29 989.836 1154.34 990.098L1156.13 990.546C1158.08 991.035 1159.45 988.661 1158.05 987.215L1156.77 985.891C1156.02 985.116 1156.02 983.884 1156.77 983.109L1158.05 981.785C1159.45 980.339 1158.08 977.965 1156.13 978.454L1154.34 978.902C1153.29 979.164 1152.23 978.549 1151.93 977.511L1151.42 975.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth32Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth32Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1125.86 983.854L1125.86 983.854L1125.85 983.863C1124.59 985.719 1124.56 987.914 1125.61 989.922C1127.12 992.58 1130.21 994.273 1133.67 995.56C1138.34 997.211 1143.32 997.9 1148.44 998C1154.44 997.999 1160.51 997.112 1165.86 995.068C1168.83 993.88 1171.42 992.392 1172.64 990.139C1173.48 988.441 1173.5 986.482 1172.54 984.556C1171.62 982.825 1170.14 981.328 1168.54 979.829L1168.54 979.824L1168.53 979.818C1165.4 976.79 1162.36 973.444 1159.81 969.881L1159.81 969.874L1159.8 969.866C1159.77 969.813 1159.73 969.759 1159.69 969.706C1158.61 968.122 1157.53 966.553 1156.14 965.507C1154.24 964.155 1151.89 963.521 1149.44 963.794C1146.17 964.157 1143.37 966.076 1141.04 968.402C1139.68 969.8 1138.47 971.292 1137.24 972.818C1136.88 973.267 1136.51 973.719 1136.14 974.172C1134.52 976.144 1132.79 978.111 1130.65 979.78C1130.12 980.215 1129.51 980.655 1128.94 981.07C1128.58 981.323 1128.25 981.567 1127.95 981.796C1127.09 982.45 1126.37 983.094 1125.86 983.854Z"
            ></path>
            <path
              className="st47"
              d="M1129.93 983.571L1129.93 983.571L1129.92 983.58C1128.91 985.054 1128.89 986.797 1129.73 988.406C1130.96 990.546 1133.48 991.929 1136.35 992.991C1140.22 994.35 1144.35 994.918 1148.61 995C1153.59 994.999 1158.63 994.268 1163.07 992.586C1165.54 991.604 1167.64 990.393 1168.63 988.588C1169.3 987.238 1169.32 985.678 1168.54 984.134C1167.79 982.731 1166.58 981.511 1165.25 980.271L1165.24 980.266L1165.24 980.26C1162.62 977.751 1160.08 974.975 1157.95 972.017L1157.95 972.01L1157.94 972.002C1157.91 971.962 1157.88 971.921 1157.86 971.88C1156.94 970.562 1156.06 969.285 1154.93 968.437C1153.38 967.343 1151.46 966.829 1149.46 967.05C1146.78 967.345 1144.48 968.903 1142.56 970.814C1141.43 971.964 1140.43 973.19 1139.4 974.451C1139.1 974.823 1138.8 975.199 1138.48 975.576C1137.13 977.208 1135.68 978.847 1133.89 980.239C1133.44 980.601 1132.93 980.972 1132.44 981.319C1132.15 981.527 1131.87 981.726 1131.63 981.909C1130.92 982.447 1130.34 982.966 1129.93 983.571Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1150.13 983)"
            ></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth32Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1125.86 983.854L1125.86 983.854L1125.85 983.863C1124.59 985.719 1124.56 987.914 1125.61 989.922C1127.12 992.58 1130.21 994.273 1133.67 995.56C1138.34 997.211 1143.32 997.9 1148.44 998C1154.44 997.999 1160.51 997.112 1165.86 995.068C1168.83 993.88 1171.42 992.392 1172.64 990.139C1173.48 988.441 1173.5 986.482 1172.54 984.556C1171.62 982.825 1170.14 981.328 1168.54 979.829L1168.54 979.824L1168.53 979.818C1165.4 976.79 1162.36 973.444 1159.81 969.881L1159.81 969.874L1159.8 969.866C1159.77 969.813 1159.73 969.759 1159.69 969.706C1158.61 968.122 1157.53 966.553 1156.14 965.507C1154.24 964.155 1151.89 963.521 1149.44 963.794C1146.17 964.157 1143.37 966.076 1141.04 968.402C1139.68 969.8 1138.47 971.292 1137.24 972.818C1136.88 973.267 1136.51 973.719 1136.14 974.172C1134.52 976.144 1132.79 978.111 1130.65 979.78C1130.12 980.215 1129.51 980.655 1128.94 981.07C1128.58 981.323 1128.25 981.567 1127.95 981.796C1127.09 982.45 1126.37 983.094 1125.86 983.854Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1129.93 983.571L1129.93 983.571L1129.92 983.58C1128.91 985.054 1128.89 986.797 1129.73 988.406C1130.96 990.546 1133.48 991.929 1136.35 992.991C1140.22 994.35 1144.35 994.918 1148.61 995C1153.59 994.999 1158.63 994.268 1163.07 992.586C1165.54 991.604 1167.64 990.393 1168.63 988.588C1169.3 987.238 1169.32 985.678 1168.54 984.134C1167.79 982.731 1166.58 981.511 1165.25 980.271L1165.24 980.266L1165.24 980.26C1162.62 977.751 1160.08 974.975 1157.95 972.017L1157.95 972.01L1157.94 972.002C1157.91 971.962 1157.89 971.921 1157.86 971.88C1156.94 970.562 1156.06 969.285 1154.93 968.437C1153.38 967.343 1151.46 966.829 1149.46 967.05C1146.78 967.345 1144.48 968.903 1142.56 970.814C1141.43 971.964 1140.43 973.19 1139.4 974.451C1139.1 974.823 1138.8 975.199 1138.48 975.576C1137.13 977.208 1135.68 978.847 1133.89 980.239C1133.44 980.601 1132.93 980.972 1132.44 981.319C1132.15 981.527 1131.87 981.726 1131.63 981.909C1130.92 982.447 1130.34 982.966 1129.93 983.571Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1150.13 983)"
              style={{ fill: 'black', opacity: tooth32Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          <g
            className="stump"
            style={{
              visibility: !tooth32Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth32Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1125.86 983.854L1125.86 983.854L1125.85 983.863C1124.59 985.719 1124.56 987.914 1125.61 989.922C1127.12 992.58 1130.21 994.273 1133.67 995.56C1138.34 997.211 1143.32 997.9 1148.44 998C1154.44 997.999 1160.51 997.112 1165.86 995.068C1168.83 993.88 1171.42 992.392 1172.64 990.139C1173.48 988.441 1173.5 986.482 1172.54 984.556C1171.62 982.825 1170.14 981.328 1168.54 979.829L1168.54 979.824L1168.53 979.818C1165.4 976.79 1162.36 973.444 1159.81 969.881L1159.81 969.874L1159.8 969.866C1159.77 969.813 1159.73 969.759 1159.69 969.706C1158.61 968.122 1157.53 966.553 1156.14 965.507C1154.24 964.155 1151.89 963.521 1149.44 963.794C1146.17 964.157 1143.37 966.076 1141.04 968.402C1139.68 969.8 1138.47 971.292 1137.24 972.818C1136.88 973.267 1136.51 973.719 1136.14 974.172C1134.52 976.144 1132.79 978.111 1130.65 979.78C1130.12 980.215 1129.51 980.655 1128.94 981.07C1128.58 981.323 1128.25 981.567 1127.95 981.796C1127.09 982.45 1126.37 983.094 1125.86 983.854Z"
            ></path>
            <path
              className="st47"
              d="M1129.93 983.571L1129.93 983.571L1129.92 983.58C1128.91 985.054 1128.89 986.797 1129.73 988.406C1130.96 990.546 1133.48 991.929 1136.35 992.991C1140.22 994.35 1144.35 994.918 1148.61 995C1153.59 994.999 1158.63 994.268 1163.07 992.586C1165.54 991.604 1167.64 990.393 1168.63 988.588C1169.3 987.238 1169.32 985.678 1168.54 984.134C1167.79 982.731 1166.58 981.511 1165.25 980.271L1165.24 980.266L1165.24 980.26C1162.62 977.751 1160.08 974.975 1157.95 972.017L1157.95 972.01L1157.94 972.002C1157.91 971.962 1157.88 971.921 1157.86 971.88C1156.94 970.562 1156.06 969.285 1154.93 968.437C1153.38 967.343 1151.46 966.829 1149.46 967.05C1146.78 967.345 1144.48 968.903 1142.56 970.814C1141.43 971.964 1140.43 973.19 1139.4 974.451C1139.1 974.823 1138.8 975.199 1138.48 975.576C1137.13 977.208 1135.68 978.847 1133.89 980.239C1133.44 980.601 1132.93 980.972 1132.44 981.319C1132.15 981.527 1131.87 981.726 1131.63 981.909C1130.92 982.447 1130.34 982.966 1129.93 983.571Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth32Diagnozis.culttab &&
                !tooth32Diagnozis.abutment &&
                !tooth32Diagnozis.implant &&
                !tooth32Diagnozis.apex &&
                !tooth32Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1180,983.6c-1.2-3-3.3-5.5-5.3-7.9c-2.8-3.3-5.4-6.7-7.8-10.3c-1.2-1.7-2.3-3.5-3.3-5.3
                            c-1.5-2.6-3-5.3-5.1-7.3c-2.7-2.4-6-3.5-9.6-3c-4.7,0.7-8.6,4-11.7,7.9c-1.9,2.4-3.6,4.9-5.3,7.5c-2.5,3.8-5,7.5-8.3,10.6
                            c-2.3,2.2-5,4-6.6,6.9c-1.9,3.4-2,7.7-0.4,11.3c0.9,2.2,2.4,4,4.1,5.4c2,1.8,4.5,3.1,7,4.2c6.2,2.6,12.8,3.8,19.6,3.8
                            c8,0,16-1.5,23.2-4.9c1.8-0.9,3.7-1.9,5.2-3.2c1.8-1.5,3.4-3.2,4.3-5.5C1181.3,990.6,1181.2,986.9,1180,983.6z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              opacity: teethDiagnozis.tooth32.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1115.76 996.002C1114.17 991.842 1113.28 987.138 1115.26 983.159C1116.85 979.903 1119.51 977.913 1121.75 975.38C1123.35 973.673 1125.78 970.351 1127.11 968.355C1128.71 965.972 1131.29 963.873 1132.78 961.354C1134.27 958.825 1134.79 957.303 1136.47 954.939C1137.93 952.93 1140.57 949.611 1142.37 948.086C1144.47 946.314 1146.8 946.464 1149.35 946.075C1151.15 945.801 1152.91 944.562 1154.58 945.162C1156.21 945.752 1157.75 948.168 1159.12 949.512C1161.24 951.683 1163.93 953.513 1165.38 956.407C1166.96 959.429 1167.57 963.795 1169.39 966.632C1171.39 969.74 1173.49 971.298 1175.63 974.135C1177.74 976.848 1180.97 981.169 1182.29 984.606C1183.74 988.586 1182.76 992.746 1181.31 996.364C1180.5 998.425 1180.42 1000.14 1179 1001.6C1177.19 1003.46 1173.89 1004.91 1171.67 1006.13C1168.35 1007.87 1164.84 1010.58 1161.24 1011.46C1156.95 1012.51 1152.54 1011.56 1148.16 1011.56C1144.55 1011.46 1140.97 1012.49 1137.47 1011.69C1134.31 1010.97 1131.22 1008.49 1128.22 1007.04C1125.98 1005.9 1122.66 1004.54 1120.72 1002.83C1118.66 1001.01 1116.91 998.796 1115.76 996.002ZM1166.1 996.001C1169.1 994.801 1172 993.201 1173.4 990.601C1174.5 988.601 1174.4 986.301 1173.3 984.101C1172.3 982.201 1170.7 980.601 1169.1 979.101C1166 976.101 1163 972.801 1160.5 969.301C1159.4 967.701 1158.2 965.901 1156.6 964.701C1154.5 963.201 1151.9 962.501 1149.2 962.801C1145.6 963.201 1142.6 965.301 1140.2 967.701C1136.6 971.401 1134 975.801 1129.9 979.001C1128.2 980.401 1126.1 981.501 1124.9 983.301C1123.4 985.501 1123.4 988.101 1124.6 990.401C1126.3 993.401 1129.7 995.201 1133.2 996.501C1138 998.201 1143.1 998.901 1148.3 999.001C1154.4 999.001 1160.6 998.101 1166.1 996.001Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1115.76 996.002C1114.17 991.842 1113.28 987.138 1115.26 983.159C1116.85 979.903 1119.51 977.913 1121.75 975.38C1123.35 973.673 1125.78 970.351 1127.11 968.355C1128.71 965.972 1131.29 963.873 1132.78 961.354C1134.27 958.825 1134.79 957.303 1136.47 954.939C1137.93 952.93 1140.57 949.611 1142.37 948.086C1144.47 946.314 1146.8 946.464 1149.35 946.075C1151.15 945.801 1152.91 944.562 1154.58 945.162C1156.21 945.752 1157.75 948.168 1159.12 949.512C1161.24 951.683 1163.93 953.513 1165.38 956.407C1166.96 959.429 1167.57 963.795 1169.39 966.632C1171.39 969.74 1173.49 971.298 1175.63 974.135C1177.74 976.848 1180.97 981.169 1182.29 984.606C1183.74 988.586 1182.76 992.746 1181.31 996.364C1180.5 998.425 1180.42 1000.14 1179 1001.6C1177.19 1003.46 1173.89 1004.91 1171.67 1006.13C1168.35 1007.87 1164.84 1010.58 1161.24 1011.46C1156.95 1012.51 1152.54 1011.56 1148.16 1011.56C1144.55 1011.46 1140.97 1012.49 1137.47 1011.69C1134.31 1010.97 1131.22 1008.49 1128.22 1007.04C1125.98 1005.9 1122.66 1004.54 1120.72 1002.83C1118.66 1001.01 1116.91 998.796 1115.76 996.002ZM1166.1 996.001C1169.1 994.801 1172 993.201 1173.4 990.601C1174.5 988.601 1174.4 986.301 1173.3 984.101C1172.3 982.201 1170.7 980.601 1169.1 979.101C1166 976.101 1163 972.801 1160.5 969.301C1159.4 967.701 1158.2 965.901 1156.6 964.701C1154.5 963.201 1151.9 962.501 1149.2 962.801C1145.6 963.201 1142.6 965.301 1140.2 967.701C1136.6 971.401 1134 975.801 1129.9 979.001C1128.2 980.401 1126.1 981.501 1124.9 983.301C1123.4 985.501 1123.4 988.101 1124.6 990.401C1126.3 993.401 1129.7 995.201 1133.2 996.501C1138 998.201 1143.1 998.901 1148.3 999.001C1154.4 999.001 1160.6 998.101 1166.1 996.001Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1119.03 992.092C1117.6 989.175 1118.6 985.877 1120.39 983.086C1121.81 980.803 1123.31 979.408 1125.33 977.633C1126.77 976.436 1128.06 974.107 1129.26 972.707C1130.7 971.036 1133.02 970.266 1134.36 968.499C1135.71 966.726 1137.07 964.958 1138.59 963.301C1139.91 961.892 1141.38 959.565 1143.01 958.496C1144.9 957.253 1146.99 957.358 1149.29 957.086C1150.91 956.894 1152.5 956.025 1154 956.446C1155.47 956.859 1156.86 958.553 1158.09 959.496C1160 961.018 1162.42 962.301 1163.73 964.33C1165.15 966.449 1165.71 969.51 1167.35 971.499C1169.14 973.678 1171.04 974.771 1172.96 976.759C1174.87 978.662 1177.77 981.691 1178.96 984.101C1180.27 986.891 1179.39 989.809 1178.08 992.345C1177.35 993.79 1177.28 994.991 1176 996.013C1174.37 997.324 1171.4 998.339 1169.39 999.194C1166.41 1000.41 1163.25 1002.31 1160 1002.93C1156.14 1003.66 1152.16 1003 1148.22 1003C1144.97 1002.93 1141.74 1003.65 1138.59 1003.09C1135.75 1002.59 1132.96 1000.85 1130.26 999.828C1128.24 999.028 1125.25 998.079 1123.5 996.879C1121.65 995.606 1120.07 994.05 1119.03 992.092ZM1166.1 996C1169.1 994.8 1172 993.2 1173.4 990.6C1174.5 988.6 1174.4 986.3 1173.3 984.1C1172.3 982.2 1170.7 980.6 1169.1 979.1C1166 976.1 1163 972.8 1160.5 969.3C1159.4 967.7 1158.2 965.9 1156.6 964.7C1154.5 963.2 1151.9 962.5 1149.2 962.8C1145.6 963.2 1142.6 965.3 1140.2 967.7C1136.6 971.4 1134 975.8 1129.9 979C1128.2 980.4 1126.1 981.5 1124.9 983.3C1123.4 985.5 1123.4 988.1 1124.6 990.4C1126.3 993.4 1129.7 995.2 1133.2 996.5C1138 998.2 1143.1 998.9 1148.3 999C1154.4 999 1160.6 998.1 1166.1 996Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth32Diagnozis.culttab &&
                !tooth32Diagnozis.abutment &&
                !tooth32Diagnozis.implant &&
                !tooth32Diagnozis.shaper &&
                !tooth32Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС C*/}
            <g
              id="s_header_14_5"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1179.9,993.8c-1,2.3-2.5,4-4.3,5.5c-5.9-5.7-16.1-15.7-17.2-17.3c-0.1-0.1-0.1-0.4-0.1-0.6
                                c0.1-2.8,5.8-11.8,8.5-16c2.4,3.6,5.1,7,7.8,10.3c2,2.4,4.2,4.9,5.3,7.9C1181.2,986.9,1181.3,990.6,1179.9,993.8z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth32.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth32.seal_right ? `seal-fill ${teethDiagnozis.tooth32.seal_right_color}` : ''}
                                `}
                d="M1179.9,993.8c-1,2.3-2.5,4-4.3,5.5c-5.9-5.7-16.1-15.7-17.2-17.3c-0.1-0.1-0.1-0.4-0.1-0.6
                                c0.1-2.8,5.8-11.8,8.5-16c2.4,3.6,5.1,7,7.8,10.3c2,2.4,4.2,4.9,5.3,7.9C1181.2,986.9,1181.3,990.6,1179.9,993.8z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_32_4"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M1166.8,965.4c-2.7,4.2-8.4,13.2-8.5,16c-6.1,0-15-0.6-21.1-1.1c0-2-0.6-4-1.4-5.9c-1.1-2.5-2.9-6.5-4.1-9.1
                                c1.7-2.6,3.4-5.1,5.3-7.5c3.2-3.9,7-7.2,11.7-7.9c3.6-0.5,6.9,0.5,9.6,3c2.1,1.9,3.6,4.7,5.1,7.3
                                C1164.5,961.9,1165.6,963.7,1166.8,965.4z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth32.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth32.seal_bottom ? `seal-fill ${teethDiagnozis.tooth32.seal_bottom_color}` : ''}
                                `}
                d="M1166.8,965.4c-2.7,4.2-8.4,13.2-8.5,16c-6.1,0-15-0.6-21.1-1.1c0-2-0.6-4-1.4-5.9c-1.1-2.5-2.9-6.5-4.1-9.1
                                c1.7-2.6,3.4-5.1,5.3-7.5c3.2-3.9,7-7.2,11.7-7.9c3.6-0.5,6.9,0.5,9.6,3c2.1,1.9,3.6,4.7,5.1,7.3
                                C1164.5,961.9,1165.6,963.7,1166.8,965.4z"
              />
            </g>
            <g
              id="s_header_14_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M1137.3,980.3c0.1,1.9-0.4,3.7-1.4,5.3c-1.7,2.5-10.8,10.2-15.3,13.8c-1.7-1.5-3.1-3.2-4.1-5.4
                                c-1.6-3.6-1.5-7.8,0.4-11.3c1.6-2.8,4.3-4.7,6.6-6.9c3.2-3,5.7-6.8,8.3-10.6c1.2,2.6,3,6.7,4.1,9.1
                                C1136.7,976.3,1137.2,978.3,1137.3,980.3z"
              />
              <path
                className={`
                                    st8 target caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth32.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth32.seal_left ? `seal-fill ${teethDiagnozis.tooth32.seal_left_color}` : ''}
                                `}
                d="M1137.3,980.3c0.1,1.9-0.4,3.7-1.4,5.3c-1.7,2.5-10.8,10.2-15.3,13.8c-1.7-1.5-3.1-3.2-4.1-5.4
                                c-1.6-3.6-1.5-7.8,0.4-11.3c1.6-2.8,4.3-4.7,6.6-6.9c3.2-3,5.7-6.8,8.3-10.6c1.2,2.6,3,6.7,4.1,9.1
                                C1136.7,976.3,1137.2,978.3,1137.3,980.3z"
              />
            </g>
            {/*КАРИЕС C*/}
            <g
              id="s_header_14_1"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M1175.6,999.3c-1.6,1.3-3.4,2.3-5.2,3.2c-7.2,3.4-15.2,4.9-23.2,4.9c-6.7,0-13.4-1.2-19.6-3.8
                                c-2.5-1.1-5-2.4-7-4.2c4.4-3.7,13.6-11.3,15.3-13.8c1.1-1.6,1.5-3.4,1.4-5.3c6.1,0.5,14.9,1.1,21.1,1.1c0,0.3,0,0.5,0.1,0.6
                                C1159.5,983.6,1169.7,993.6,1175.6,999.3z"
              />
              <path
                className={`
                                    st8 target caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth32.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth32.seal_center ? `seal-fill ${teethDiagnozis.tooth32.seal_center_color}` : ''}
                                `}
                d="M1175.6,999.3c-1.6,1.3-3.4,2.3-5.2,3.2c-7.2,3.4-15.2,4.9-23.2,4.9c-6.7,0-13.4-1.2-19.6-3.8
                                c-2.5-1.1-5-2.4-7-4.2c4.4-3.7,13.6-11.3,15.3-13.8c1.1-1.6,1.5-3.4,1.4-5.3c6.1,0.5,14.9,1.1,21.1,1.1c0,0.3,0,0.5,0.1,0.6
                                C1159.5,983.6,1169.7,993.6,1175.6,999.3z"
              />
            </g>
            <g className="with up">
              {/* Черточка лево верх */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_right &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_right &&
                      tooth32Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1158.5 981.5C1161.33 985.167 1168.2 993.3 1173 996.5"
              />
              {/* Черточка лево низ */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_right &&
                      !tooth32Diagnozis.seal_bottom) ||
                    (tooth32Diagnozis.seal_bottom &&
                      !tooth32Diagnozis.seal_right)
                      ? 5
                      : 0,
                }}
                d="M1158.5 981.5C1158.83 979.667 1160.5 974.8 1164.5 970"
              />
              {/* Черточка середина */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_bottom &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_bottom &&
                      tooth32Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1158.5 981.5C1155.5 982.167 1147.2 982.9 1138 980.5"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_left &&
                      !tooth32Diagnozis.seal_bottom) ||
                    (!tooth32Diagnozis.seal_left &&
                      tooth32Diagnozis.seal_bottom &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_left &&
                      tooth32Diagnozis.seal_bottom &&
                      tooth32Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1138 980.5C1137.17 979.5 1135.3 976 1134.5 970"
              />
              {/*Черточка право низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_left &&
                      !tooth32Diagnozis.seal_top &&
                      !tooth32Diagnozis.seal_center) ||
                    (tooth32Diagnozis.seal_left &&
                      !tooth32Diagnozis.seal_top &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_left &&
                      tooth32Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1138 980.5C1137.33 983.167 1133.9 989.9 1125.5 995.5"
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
                visibility: tooth32Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth32Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1120.7 999.4C1119 998 1117.5 996.2 1116.6 994C1115.95 992.546 1115.58 990.978 1115.5 989.401C1118.3 989.567 1124.77 990.685 1129.1 993.82C1129.27 993.947 1129.45 994.076 1129.61 994.209C1130.82 995.082 1132.21 995.767 1133.59 996.367C1137.94 998.169 1142.58 999 1147.36 999C1152.98 999 1158.6 997.961 1163.66 995.604C1164.55 995.169 1165.46 994.701 1166.3 994.151C1166.38 994.092 1166.47 994.033 1166.55 993.975C1172.7 989.846 1178.73 988.935 1181 989C1180.87 991.18 1180.59 992.325 1180 993.8C1179.1 996.1 1177.5 997.8 1175.7 999.3C1174.2 1000.6 1172.3 1001.6 1170.5 1002.5C1163.3 1005.9 1155.3 1007.4 1147.3 1007.4C1140.5 1007.4 1133.9 1006.2 1127.7 1003.6C1125.2 1002.5 1122.7 1001.2 1120.7 999.4Z"
              ></path>
              <path
                className="st55"
                d="M1128.67 993.456C1128.97 993.722 1129.28 993.973 1129.61 994.209M1167.32 993.387C1167 993.659 1166.66 993.913 1166.3 994.151M1166.3 994.151C1165.46 994.701 1164.55 995.169 1163.66 995.604C1158.6 997.961 1152.98 999 1147.36 999C1142.58 999 1137.94 998.169 1133.59 996.367C1132.21 995.767 1130.82 995.082 1129.61 994.209M1166.3 994.151C1172.53 989.872 1178.7 988.934 1181 989C1180.87 991.18 1180.59 992.325 1180 993.8C1179.1 996.1 1177.5 997.8 1175.7 999.3C1174.2 1000.6 1172.3 1001.6 1170.5 1002.5C1163.3 1005.9 1155.3 1007.4 1147.3 1007.4C1140.5 1007.4 1133.9 1006.2 1127.7 1003.6C1125.2 1002.5 1122.7 1001.2 1120.7 999.4C1119 998 1117.5 996.2 1116.6 994C1115.95 992.546 1115.58 990.978 1115.5 989.401C1118.41 989.573 1125.3 990.777 1129.61 994.209"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth32Diagnozis.temporary_crown ||
                tooth32Diagnozis.ceramic_crown ||
                tooth32Diagnozis.mceramic_crown ||
                tooth32Diagnozis.metalic_crown ||
                tooth32Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth32Diagnozis.temporary_crown ||
                tooth32Diagnozis.ceramic_crown ||
                tooth32Diagnozis.mceramic_crown ||
                tooth32Diagnozis.metalic_crown ||
                tooth32Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth32Diagnozis.ceramic_crown_color}
                                ${tooth32Diagnozis.mceramic_crown_color}
                                ${tooth32Diagnozis.metalic_crown_color}
                                ${tooth32Diagnozis.zirconia_crown_color}
                            `}
              d="M1180,983.6c-1.2-3-3.3-5.5-5.3-7.9c-2.8-3.3-5.4-6.7-7.8-10.3c-1.2-1.7-2.3-3.5-3.3-5.3
                            c-1.5-2.6-3-5.3-5.1-7.3c-2.7-2.4-6-3.5-9.6-3c-4.7,0.7-8.6,4-11.7,7.9c-1.9,2.4-3.6,4.9-5.3,7.5c-2.5,3.8-5,7.5-8.3,10.6
                            c-2.3,2.2-5,4-6.6,6.9c-1.9,3.4-2,7.7-0.4,11.3c0.9,2.2,2.4,4,4.1,5.4c2,1.8,4.5,3.1,7,4.2c6.2,2.6,12.8,3.8,19.6,3.8
                            c8,0,16-1.5,23.2-4.9c1.8-0.9,3.7-1.9,5.2-3.2c1.8-1.5,3.4-3.2,4.3-5.5C1181.3,990.6,1181.2,986.9,1180,983.6z"
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
              id="dentin_v_32"
              style={{
                visibility:
                  !tooth32Diagnozis.implant &&
                  !tooth32Diagnozis.apex &&
                  !tooth32Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_x5F_v_x5F_32_1_"
                className={`st9 change-color ${tooth32Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1172.6,1211.7c-2.3,5.4-5.5,10.3-10.4,13.5c-2,1.3-4.2,2.2-6.5,2.8
                                c-3.6,0.9-7.5,0.7-11.1-0.4c-1.5-0.5-3-1.1-4.4-1.9c-8.4-4.9-12.4-14.5-15.3-23.9c-0.4-1.4-0.9-2.8-1.3-4.2
                                c0.9,15.4,2.4,30.9,4.1,46.4c2.1,19.9,4.6,39.7,7.2,59.5c2.1,15.4,4.5,30.8,8.9,45.6c1.7,5.7,4.6,10.8,7.9,14.4
                                c2,2.1,4.2,3.6,6.7,3.9c-2.5-0.2-4.8-1.7-6.8-3.9c-3.3-3.5-6.2-8.7-7.9-14.4c-4.4-14.8-6.9-30.2-8.9-45.6
                                c-2.7-19.8-5.1-39.6-7.2-59.5c-2-18.5-3.8-37.1-4.5-55.6c-0.2-5.2-0.3-10.4-0.3-15.6c0-7.5,0.3-14.9,1-22.4l1.4-2.5l1.8-1
                                l37.9,0.1l1.6,1.4l0.9,1.5c1.8,8.6,3.2,17.3,4.1,26c0.5,5,0.9,10.1,1.1,15.2C1172.8,1197.9,1172.8,1204.8,1172.6,1211.7z"
              />
            </g>
            <g
              id="dentin_n_32"
              style={{
                visibility:
                  !tooth32Diagnozis.implant &&
                  !tooth32Diagnozis.abutment &&
                  !tooth32Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_x5F_32_1_"
                className={`st10 change-color ${tooth32Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1172.5,1267.9c0.1,11,0,22-0.6,33c-0.4,8.3-1,16.6-1.4,24.9
                                c-0.3,6.7-0.4,13.3-0.7,20c-0.2,5.3-1,10.8-2.9,15.3c-1.1,2.7-2.5,4.9-5.3,5.7c-1,0.3-2,0.4-3,0.4c0,0-0.1,0-0.1,0
                                c-2.6-0.2-4.9-1.7-6.9-3.9c-3.3-3.5-6.2-8.7-7.9-14.4c-4.4-14.8-6.9-30.2-8.9-45.6c-2.7-19.8-5.1-39.6-7.2-59.5
                                c-1.7-15.4-3.2-30.9-4.1-46.4c0.4,1.4,0.8,2.8,1.3,4.2c3,9.4,6.9,19,15.3,23.9c1.4,0.8,2.9,1.5,4.4,1.9c3.6,1.1,7.4,1.3,11.1,0.4
                                c2.3-0.5,4.5-1.5,6.5-2.8c5-3.2,8.1-8.2,10.5-13.6c-0.2,8.4-0.5,16.9-0.6,25.4C1172,1247.3,1172.4,1257.6,1172.5,1267.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth32Diagnozis.channel_class} ${tooth32Diagnozis.channel_class} ${tooth32Diagnozis.pulpit ? 'pulpit' : ''} ${tooth32Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1156.5,1202.1c0,4.5-0.4,9-0.6,13.5c-0.2,4.1-0.3,8.2-0.3,12.3
                                c-0.1,0-0.2,0.1-0.4,0.1c-0.5,0.1-0.9,0.2-1.4,0.3h-0.1c-0.2,0-0.5,0.1-0.7,0.1c-0.2,0-0.5,0-0.7,0.1c-0.2,0-0.3,0-0.5,0
                                c-0.3,0-0.6,0-0.8,0h-0.1c-0.5,0-0.9,0-1.4-0.1c-0.1,0-0.2,0-0.2,0c-0.8-0.1-1.5-0.2-2.3-0.3c-0.3-0.1-0.6-0.1-0.9-0.2
                                c-0.5-0.1-1-0.3-1.5-0.4c0,0,0,0,0,0c-0.6-3.9-1.3-7.8-2-11.7c-1.1-6.5-2.3-12.9-3-19.5c-0.7-6.8-0.9-13.6-0.5-20.4l1.2-2l13-0.2
                                l1,1.8c0.6,4,1.1,8.1,1.5,12.1C1156.3,1192.5,1156.6,1197.3,1156.5,1202.1z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth32Diagnozis.channel_class} ${tooth32Diagnozis.channel_class} ${tooth32Diagnozis.pulpit ? 'pulpit' : ''} ${tooth32Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1157.1,1297.7c-1.1,0.2-2.2,0.2-3.2,0.2c-0.6,0-1.2,0-1.8-0.1
                                c-0.2-2.6-0.4-5.2-0.6-7.8c-1-13.4-2.1-26.7-3.8-40c-0.9-7.5-2-15-3.2-22.5c0,0,0,0,0,0c0,0,0,0,0,0c0.5,0.2,1,0.3,1.5,0.4
                                c0.3,0.1,0.6,0.1,0.9,0.2c0.8,0.1,1.5,0.2,2.3,0.3c0.1,0,0.1,0,0.2,0c0.5,0,0.9,0,1.4,0h0.1c0.3,0,0.6,0,0.8,0c0.2,0,0.3,0,0.5,0
                                c0.2,0,0.5-0.1,0.7-0.1c0.2,0,0.5-0.1,0.7-0.1h0.1c0.5-0.1,1-0.2,1.4-0.3c0.1,0,0.2-0.1,0.4-0.1c0,0,0,0,0,0c0,4.8,0,9.6,0.1,14.5
                                c0.2,15.7,0.7,31.5,1.1,47.2C1156.9,1292.3,1157,1295,1157.1,1297.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth32Diagnozis.channel_class} ${tooth32Diagnozis.channel_class} ${tooth32Diagnozis.pulpit ? 'pulpit' : ''} ${tooth32Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1158.6,1367.2L1158.6,1367.2c-1.7-13.7-3.2-27.5-4.3-41.3
                                c-0.8-9.4-1.5-18.8-2.2-28.2c0.6,0.1,1.2,0.1,1.8,0.1c1,0,2.1,0,3.2-0.2c0.3,10.9,0.6,21.8,0.9,32.7c0.3,12.3,0.6,24.6,0.8,36.8
                                c0,0.4,0,0.7,0,1.1C1158.7,1367.9,1158.7,1367.6,1158.6,1367.2z"
              />
            </g>
            <PeriodontitStage32 />
            {/* <g className="level hEmpty hImplant periodontitis"  dataposition="32"  style={{visibility: 'inherit', opacity:0}}>
                            <circle className="st42" cx="1158.9" cy="1369.9" r="8.2"></circle>
                        </g>
                        <g className="level hEmpty hImplant periodontitis"  dataposition="32"  style={{visibility: 'inherit', opacity:0}}>
                            <circle className="st42" cx="1160.2" cy="1376.7" r="17.5"></circle>
                        </g>
                        <g className="level hEmpty hImplant periodontitis"  dataposition="32"  style={{visibility: 'inherit', opacity:0}}>
                            <circle className="st42" cx="1164.6" cy="1386.4" r="30"></circle>
                        </g> */}
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth32Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1172.59 1211.6C1170.19 1217 1167.09 1222 1162.09 1225.2C1160.29 1226.3 1158.39 1227.2 1156.49 1227.7C1156.19 1227.8 1155.89 1227.9 1155.59 1227.9C1151.99 1228.8 1148.09 1228.6 1144.49 1227.5C1144.39 1227.5 1144.29 1227.4 1144.19 1227.4C1142.79 1226.9 1141.39 1226.3 1140.09 1225.6C1131.69 1220.7 1127.69 1211.1 1124.79 1201.7C1124.39 1200.3 1123.99 1198.9 1123.59 1197.6C1123.39 1194.5 1123.29 1191.4 1123.09 1188.3C1122.89 1183.1 1122.79 1177.9 1122.79 1172.7C1122.79 1165.2 1123.09 1157.8 1123.79 1150.3L1125.19 1147.8L1126.89 1146.8L1164.79 1146.9L1166.39 1148.3L1167.29 1149.8C1169.09 1158.4 1170.49 1167.1 1171.39 1175.8C1171.89 1180.8 1172.29 1185.9 1172.49 1191C1172.79 1197.8 1172.79 1204.7 1172.59 1211.6Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st57"
              style={{ fill: tooth32Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M1135.79 1146.9L1144.09 1227.4H1144.19C1144.29 1227.4 1144.39 1227.5 1144.49 1227.5C1144.39 1227.5 1144.29 1227.4 1144.19 1227.4L1150.19 1286.2L1150.49 1289.2L1152.89 1312.6C1152.99 1313.7 1153.89 1314.5 1154.99 1314.5C1156.19 1314.5 1157.09 1313.6 1157.09 1312.4L1156.89 1284.2V1284.1L1156.39 1227.8L1155.69 1147L1135.79 1146.9Z"
            ></path>
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth32Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth32Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M1155.1,1314.5L1155.1,1314.5c-1.1,0-2-0.8-2.1-1.9l-8.7-85.2c0.1,0,0.2,0.1,0.3,0.1
                            c3.6,1.1,7.4,1.3,11.1,0.4c0.3-0.1,0.6-0.1,0.9-0.2l0.6,84.7C1157.2,1313.5,1156.2,1314.5,1155.1,1314.5z"
            />
            <path
              className="st15"
              d="M1172.6,1211.6c-2.4,5.4-5.5,10.4-10.5,13.6c-1.8,1.1-3.7,2-5.6,2.5c-0.3,0.1-0.6,0.2-0.9,0.2
                            c-3.6,0.9-7.5,0.7-11.1-0.4c-0.1,0-0.2-0.1-0.3-0.1c-1.4-0.5-2.8-1.1-4.1-1.8c-8.4-4.9-12.4-14.5-15.3-23.9
                            c-0.4-1.4-0.8-2.8-1.2-4.1c-0.2-3.1-0.3-6.2-0.5-9.3c-0.2-5.2-0.3-10.4-0.3-15.6c0-7.5,0.3-14.9,1-22.4l1.4-2.5l1.7-1l37.9,0.1
                            l1.6,1.4l0.9,1.5c1.8,8.6,3.2,17.3,4.1,26c0.5,5,0.9,10.1,1.1,15.2C1172.8,1197.8,1172.8,1204.7,1172.6,1211.6z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth32Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth32Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M1123.6,1197.5l17.9,40.2l19.2-1.2l11.9-24.9c-2.3,5.4-5.5,10.3-10.5,13.6c-6.7,4.3-15.1,4.4-22,0.4
                            c-8.4-4.9-12.4-14.5-15.3-23.9C1124.4,1200.3,1124,1198.9,1123.6,1197.5z"
            />
            <path
              className="st17"
              d="M1122.9,1172.7c0,5.2,0.1,10.4,0.3,15.6c0.1,3.1,0.3,6.1,0.5,9.2c0.4,1.4,0.8,2.8,1.3,4.2
                            c2.9,9.4,6.9,19,15.3,23.9c6.9,4,15.3,3.9,22-0.4c5-3.2,8.1-8.2,10.5-13.6c0.2-6.9,0.2-13.7-0.1-20.6c-0.2-5.1-0.6-10.1-1.1-15.2
                            c-0.9-8.7-2.3-17.4-4.1-26l-0.9-1.5l-1.6-1.4l-37.9-0.1l-1.7,1l-1.4,2.5C1123.2,1157.8,1122.9,1165.2,1122.9,1172.7z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1167.6 1196.47C1167.76 1194.1 1165.83 1192.12 1163.46 1192.21L1137.58 1193.18C1135.21 1193.27 1133.44 1195.39 1133.77 1197.74L1139.37 1236.97C1139.66 1239 1141.45 1240.49 1143.5 1240.4L1161.12 1239.64C1163.16 1239.55 1164.81 1237.95 1164.94 1235.91L1167.6 1196.47Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth32Diagnozis.abutment ||
                tooth32Diagnozis.implant ||
                tooth32Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1166.9,1236.8c0,0,1.5,49.5,1.8,57.5c0.3,8,0.5,60.5,0.5,60.5s-4.1,6.2-11.8,7c-7.8,0.8-11.2-7.2-11.2-7.2
                            s-8.6-73.4-9.4-77.6c-0.8-4.3-4.1-38.9-4.1-38.9L1166.9,1236.8z"
            />
            <line
              className="st19"
              x1="1170.3"
              y1="1246.5"
              x2="1131.2"
              y2="1254.6"
            />
            <line
              className="st19"
              x1="1172.3"
              y1="1269.5"
              x2="1133.2"
              y2="1277.6"
            />
            <line
              className="st19"
              x1="1174.3"
              y1="1293.5"
              x2="1135.2"
              y2="1301.6"
            />
            <line
              className="st19"
              x1="1175.4"
              y1="1317.1"
              x2="1136.1"
              y2="1324"
            />
            <line
              className="st19"
              x1="1177.4"
              y1="1340.1"
              x2="1138.1"
              y2="1347"
            />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth32Diagnozis.culttab &&
                !tooth32Diagnozis.abutment &&
                !tooth32Diagnozis.implant &&
                !tooth32Diagnozis.shaper &&
                !tooth32Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1181.3,1130.2c0.1-1.8-0.4-3.5-1.5-4.9c-1-1.3-2.3-2.2-3.8-2.6l-17.6,0.2l-28.2,0.2
                            l-9,0.1c-0.9-0.1-1.7,0.1-2.5,0.6c-1.9,1-2.9,3.2-2.5,5.3c-0.9,12.4-0.6,24.8,0.9,37.1c1.5,12.1,4.1,24,7.7,35.6
                            c0.1,0.4,0.2,0.7,0.3,1.1c2.9,9.1,6.9,18.1,15,22.8c6.9,4,15.3,3.9,22-0.4c5.2-3.4,8.4-8.7,10.8-14.4c1.5-3.7,2.7-7.6,3.7-11.5
                            c1.3-5.4,2.2-11,2.8-16.5C1181.6,1165.3,1182.2,1147.7,1181.3,1130.2z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth32Diagnozis.culttab && !tooth32Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1179.79 1125.3C1180.89 1126.7 1181.39 1128.4 1181.29 1130.2C1182.19 1147.7 1181.59 1165.3 1179.39 1182.9C1178.79 1188.4 1177.89 1194 1176.59 1199.4C1175.59 1203.3 1174.39 1207.2 1172.89 1210.9C1170.49 1216.6 1167.29 1221.9 1162.09 1225.3C1155.39 1229.6 1146.99 1229.7 1140.09 1225.7C1131.99 1221 1127.99 1212 1125.09 1202.9C1125.04 1202.7 1124.99 1202.53 1124.94 1202.35C1124.89 1202.18 1124.84 1202 1124.79 1201.8C1121.19 1190.2 1118.59 1178.3 1117.09 1166.2C1115.59 1153.9 1115.29 1141.5 1116.19 1129.1C1115.79 1127 1116.79 1124.8 1118.69 1123.8C1119.49 1123.3 1120.29 1123.1 1121.19 1123.2L1130.19 1123.1L1158.39 1122.9L1175.99 1122.7C1177.49 1123.1 1178.79 1124 1179.79 1125.3ZM1130.18 1202.06C1130.14 1201.94 1130.1 1201.81 1130.06 1201.67C1129.17 1198.98 1128.36 1196.28 1127.62 1193.55C1127.29 1192.31 1128.21 1191.1 1129.49 1191.07L1169.65 1190.06C1170.88 1190.03 1171.85 1191.11 1171.66 1192.32C1171.25 1194.88 1170.73 1197.44 1170.08 1199.94C1169.31 1202.75 1168.38 1205.56 1167.23 1208.23C1165.37 1212.34 1162.9 1216.16 1158.88 1218.61C1153.7 1221.71 1147.21 1221.78 1141.88 1218.9C1135.62 1215.51 1132.53 1209.02 1130.29 1202.46C1130.25 1202.31 1130.22 1202.19 1130.18 1202.06Z"
            ></path>
            <path
              className={`st7 ${tooth32Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1130.06 1201.67C1130.14 1201.95 1130.22 1202.17 1130.29 1202.46C1132.53 1209.02 1135.62 1215.51 1141.88 1218.9C1147.21 1221.78 1153.7 1221.71 1158.88 1218.61C1162.9 1216.16 1165.37 1212.34 1167.23 1208.23C1168.38 1205.56 1169.31 1202.75 1170.08 1199.94C1170.73 1197.44 1171.25 1194.88 1171.66 1192.32C1171.85 1191.11 1170.88 1190.03 1169.65 1190.06L1129.49 1191.07C1128.21 1191.1 1127.29 1192.31 1127.62 1193.55C1128.36 1196.28 1129.17 1198.98 1130.06 1201.67Z"
            />
            <path
              className={`st60
                                    ${tooth32Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth32Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth32Diagnozis.seal_cervical_color}
                                `}
              d="M1130.06 1201.67C1130.14 1201.95 1130.22 1202.17 1130.29 1202.46C1132.53 1209.02 1135.62 1215.51 1141.88 1218.9C1147.21 1221.78 1153.7 1221.71 1158.88 1218.61C1162.9 1216.16 1165.37 1212.34 1167.23 1208.23C1168.38 1205.56 1169.31 1202.75 1170.08 1199.94C1170.73 1197.44 1171.25 1194.88 1171.66 1192.32C1171.85 1191.11 1170.88 1190.03 1169.65 1190.06L1129.49 1191.07C1128.21 1191.1 1127.29 1192.31 1127.62 1193.55C1128.36 1196.28 1129.17 1198.98 1130.06 1201.67Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth32.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1120.5 1184L1123 1187.5L1124.5 1190.5V1192L1126 1193.5V1195.5L1128 1200.5V1203.5L1130.5 1206.5L1132.5 1211L1133 1213.5L1134.5 1216L1135.5 1217L1138 1219L1139.5 1219.5L1140.5 1220.5L1145 1223L1148 1224L1149.5 1223H1152.5L1156.5 1222L1159.5 1220.5H1162L1163.5 1219L1166.5 1217L1168 1213.5L1170 1209L1171.5 1206.5V1204.5L1173 1203.5L1174 1200.5L1173.5 1199L1174 1197.5V1195L1176 1191L1176.5 1188.5L1177 1186.5L1179 1183.5L1179.5 1185V1186.5L1179 1188.5V1189.5V1192L1178.5 1193.5L1177.5 1196.5V1198V1200.5L1177 1201.5L1176 1203.5V1205V1207.5L1174.5 1209V1211V1212.5L1174 1214V1217L1174.5 1218L1174 1223.5L1173 1228V1231.5V1235L1172 1238L1172.5 1241L1171.5 1243.5L1165.5 1246.5L1159.5 1247.5L1154.5 1248.5L1150.5 1250L1145 1248.5H1140.5L1136 1247.5L1131.5 1244.5L1129 1243.5L1127 1241L1126.5 1238V1235L1125.5 1231.5V1229V1227L1125 1225L1124.5 1223L1125 1221.5V1219L1124.5 1217L1125.5 1214.5L1124.5 1212.5V1207.5L1123 1205V1200.5L1121.5 1198L1120.5 1194.5L1121 1192L1119.5 1188L1120.5 1184Z"
            ></path>
            <path
              className="st61 level1"
              d="M1120.5 1184L1123 1187.5L1124.5 1190.5V1192L1126 1193.5V1195.5L1128 1200.5V1203.5L1130.5 1206.5L1132.5 1211L1133 1213.5L1134.5 1216L1135.5 1217L1138 1219L1139.5 1219.5L1140.5 1220.5L1145 1223L1148 1224L1149.5 1223H1152.5L1156.5 1222L1159.5 1220.5H1162L1163.5 1219L1166.5 1217L1168 1213.5L1170 1209L1171.5 1206.5V1204.5L1173 1203.5L1174 1200.5L1173.5 1199L1174 1197.5V1195L1176 1191L1176.5 1188.5L1177 1186.5L1179 1183.5V1186.5L1178.5 1189.5V1192L1177.5 1194.5L1177 1197L1176.5 1200.5L1175 1203.5V1206.5L1174 1209V1212.5L1173.5 1214.5V1216L1172 1219.5L1170 1221L1167.5 1222.5L1165.5 1225L1162 1226L1159.5 1226.5L1157.5 1228L1154.5 1229L1152.5 1230L1149.5 1229H1146.5L1143.5 1228L1140.5 1227L1135.5 1225.5L1134.5 1224L1131.5 1222H1129L1127.5 1220L1126 1217V1214.5L1125 1212.5L1125.5 1211.5L1125 1210V1208.5L1124 1206L1123.5 1203.5V1201.5L1123 1199.5L1121.5 1197L1121 1194V1191.5L1120.5 1189.5L1120 1187.5L1120.5 1184Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling"
            style={{
              visibility:
                !tooth32Diagnozis.culttab &&
                !tooth32Diagnozis.abutment &&
                !tooth32Diagnozis.implant &&
                !tooth32Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС R*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M1179.5,1182.7c-0.7,5.5-1.5,11.1-2.8,16.5c-5.7-4.2-8.5-8.8-9.3-11.1c-0.8-2.6-3.1-10.3-5.7-31.3
                                c-1.8-14.4-2.9-27.3-3.4-34l17.6-0.2c1.5,0.4,2.8,1.3,3.8,2.6c1.1,1.4,1.6,3.2,1.5,4.9C1182.2,1147.7,1181.6,1165.3,1179.5,1182.7
                                z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth32.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth32.seal_right ? `seal-fill ${teethDiagnozis.tooth32.seal_right_color}` : ''}
                            `}
                d="M1179.5,1182.7c-0.7,5.5-1.5,11.1-2.8,16.5c-5.7-4.2-8.5-8.8-9.3-11.1c-0.8-2.6-3.1-10.3-5.7-31.3
                                c-1.8-14.4-2.9-27.3-3.4-34l17.6-0.2c1.5,0.4,2.8,1.3,3.8,2.6c1.1,1.4,1.6,3.2,1.5,4.9C1182.2,1147.7,1181.6,1165.3,1179.5,1182.7
                                z"
              />
            </g>
            {/*КАРИЕС L*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1129.6,1196.8c-0.6,1.3-2.8,4-4.4,5.9c-0.1-0.4-0.2-0.7-0.4-1.1c-3.6-11.6-6.2-23.5-7.7-35.6
                                c-1.5-12.3-1.8-24.7-0.9-37.1c-0.4-2.1,0.6-4.3,2.5-5.3c0.8-0.4,1.6-0.6,2.5-0.6l9-0.1c0.2,9.7,0.6,30.9,0.9,41
                                C1131.4,1177.3,1131.2,1193.3,1129.6,1196.8z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth32.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth32.seal_left ? `seal-fill ${teethDiagnozis.tooth32.seal_left_color}` : ''}
                            `}
                d="M1129.6,1196.8c-0.6,1.3-2.8,4-4.4,5.9c-0.1-0.4-0.2-0.7-0.4-1.1c-3.6-11.6-6.2-23.5-7.7-35.6
                                c-1.5-12.3-1.8-24.7-0.9-37.1c-0.4-2.1,0.6-4.3,2.5-5.3c0.8-0.4,1.6-0.6,2.5-0.6l9-0.1c0.2,9.7,0.6,30.9,0.9,41
                                C1131.4,1177.3,1131.2,1193.3,1129.6,1196.8z"
              />
            </g>
            {/* КАРИЕС C */}
            <g
              className="caries-filling hoho1"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M1176.7,1199.2c-1,3.9-2.2,7.8-3.7,11.5c-2.4,5.7-5.6,11-10.8,14.4c-6.7,4.3-15.1,4.4-22,0.4
                                c-8.1-4.7-12.1-13.7-15-22.8c1.6-1.9,3.8-4.6,4.4-5.9c1.6-3.5,1.8-19.5,1.5-32.8c-0.2-10-0.7-31.3-0.9-41l28.2-0.2
                                c0.5,6.6,1.6,19.5,3.4,34c2.6,21,4.8,28.7,5.7,31.3C1168.2,1190.5,1171,1195,1176.7,1199.2z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth32.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth32.seal_center ? `seal-fill ${teethDiagnozis.tooth32.seal_center_color}` : ''}
                            `}
                d="M1176.7,1199.2c-1,3.9-2.2,7.8-3.7,11.5c-2.4,5.7-5.6,11-10.8,14.4c-6.7,4.3-15.1,4.4-22,0.4
                                c-8.1-4.7-12.1-13.7-15-22.8c1.6-1.9,3.8-4.6,4.4-5.9c1.6-3.5,1.8-19.5,1.5-32.8c-0.2-10-0.7-31.3-0.9-41l28.2-0.2
                                c0.5,6.6,1.6,19.5,3.4,34c2.6,21,4.8,28.7,5.7,31.3C1168.2,1190.5,1171,1195,1176.7,1199.2z"
              />
            </g>
            <g className="with down">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_right &&
                      !tooth32Diagnozis.seal_top &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_right &&
                      tooth32Diagnozis.seal_top) ||
                    (tooth32Diagnozis.seal_center &&
                      !tooth32Diagnozis.seal_right)
                      ? 5
                      : 0,
                }}
                d="M1163.5 1162.5C1162.5 1157.17 1160.4 1142.4 1160 1128"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_right &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_right &&
                      tooth32Diagnozis.seal_top &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_right &&
                      !tooth32Diagnozis.seal_top &&
                      tooth32Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1163.5 1162.5C1167 1181.5 1167 1186.6 1173 1195"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_left &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_left &&
                      tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_left &&
                      tooth32Diagnozis.seal_top &&
                      tooth32Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1132 1164.5C1132 1181.5 1133.5 1192 1130 1198"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth32Diagnozis.seal_left &&
                      !tooth32Diagnozis.seal_center) ||
                    (!tooth32Diagnozis.seal_left &&
                      tooth32Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1132 1164.5L1130.5 1128.5"
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
                visibility: tooth32Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth32Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1181.29 1130.2C1181.39 1128.4 1180.89 1126.7 1179.79 1125.3C1178.79 1124 1177.49 1123.1 1175.99 1122.7L1158.39 1122.9L1130.19 1123.1L1121.19 1123.2C1120.29 1123.1 1119.49 1123.3 1118.69 1123.8C1116.79 1124.8 1115.79 1127 1116.19 1129.1C1115.29 1141.5 1115.59 1153.9 1117.09 1166.2C1118.59 1178.3 1121.19 1190.2 1124.79 1201.8C1124.89 1202.2 1124.99 1202.5 1125.09 1202.9C1127.99 1212 1131.99 1221 1140.09 1225.7C1146.99 1229.7 1155.39 1229.6 1162.09 1225.3C1167.29 1221.9 1170.49 1216.6 1172.89 1210.9C1174.39 1207.2 1175.59 1203.3 1176.59 1199.4C1177.89 1194 1178.79 1188.4 1179.39 1182.9C1181.59 1165.3 1182.19 1147.7 1181.29 1130.2Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth32Diagnozis.temporary_crown ||
                tooth32Diagnozis.ceramic_crown ||
                tooth32Diagnozis.mceramic_crown ||
                tooth32Diagnozis.metalic_crown ||
                tooth32Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth32Diagnozis.temporary_crown ||
                tooth32Diagnozis.ceramic_crown ||
                tooth32Diagnozis.mceramic_crown ||
                tooth32Diagnozis.metalic_crown ||
                tooth32Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth32Diagnozis.ceramic_crown_color}
                                ${tooth32Diagnozis.mceramic_crown_color}
                                ${tooth32Diagnozis.metalic_crown_color}
                                ${tooth32Diagnozis.zirconia_crown_color}
                            `}
              d="M1181.3,1130.2c0.1-1.8-0.4-3.5-1.5-4.9c-1-1.3-2.3-2.2-3.8-2.6l-17.6,0.2l-28.2,0.2
                            l-9,0.1c-0.9-0.1-1.7,0.1-2.5,0.6c-1.9,1-2.9,3.2-2.5,5.3c-0.9,12.4-0.6,24.8,0.9,37.1c1.5,12.1,4.1,24,7.7,35.6
                            c0.1,0.4,0.2,0.7,0.3,1.1c2.9,9.1,6.9,18.1,15,22.8c6.9,4,15.3,3.9,22-0.4c5.2-3.4,8.4-8.7,10.8-14.4c1.5-3.7,2.7-7.6,3.7-11.5
                            c1.3-5.4,2.2-11,2.8-16.5C1181.6,1165.3,1182.2,1147.7,1181.3,1130.2z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
