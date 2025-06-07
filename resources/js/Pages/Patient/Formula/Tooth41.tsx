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
import PeriodontitStage41 from './periodontit41';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth41() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth41Diagnozis = teethDiagnozis.tooth41;
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
        teethDiagnozis.tooth41.caries_bottom =
          !teethDiagnozis.tooth41.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth41.caries_center =
          !teethDiagnozis.tooth41.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth41.caries_left =
          !teethDiagnozis.tooth41.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth41.caries_right =
          !teethDiagnozis.tooth41.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth41.caries_top = !teethDiagnozis.tooth41.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth41.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth41.seal_center_color = sealColor1;
          teethDiagnozis.tooth41.seal_center = true;
        } else if (
          teethDiagnozis.tooth41.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth41.seal_center_color = sealColor2;
          teethDiagnozis.tooth41.seal_center = true;
        } else if (
          teethDiagnozis.tooth41.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth41.seal_center_color = sealColor3;
          teethDiagnozis.tooth41.seal_center = true;
        } else {
          teethDiagnozis.tooth41.seal_center =
            !teethDiagnozis.tooth41.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth41.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth41.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth41.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth41.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth41.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth41.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth41.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth41.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth41.seal_bottom = true;
        } else {
          teethDiagnozis.tooth41.seal_bottom =
            !teethDiagnozis.tooth41.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth41.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth41.seal_left_color = sealColor1;
          teethDiagnozis.tooth41.seal_left = true;
        } else if (
          teethDiagnozis.tooth41.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth41.seal_left_color = sealColor2;
          teethDiagnozis.tooth41.seal_left = true;
        } else if (
          teethDiagnozis.tooth41.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth41.seal_left_color = sealColor3;
          teethDiagnozis.tooth41.seal_left = true;
        } else {
          teethDiagnozis.tooth41.seal_left = !teethDiagnozis.tooth41.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth41.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth41.seal_right_color = sealColor1;
          teethDiagnozis.tooth41.seal_right = true;
        } else if (
          teethDiagnozis.tooth41.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth41.seal_right_color = sealColor2;
          teethDiagnozis.tooth41.seal_right = true;
        } else if (
          teethDiagnozis.tooth41.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth41.seal_right_color = sealColor3;
          teethDiagnozis.tooth41.seal_right = true;
        } else {
          teethDiagnozis.tooth41.seal_right =
            !teethDiagnozis.tooth41.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth41.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth41.seal_top_color = sealColor1;
          teethDiagnozis.tooth41.seal_top = true;
        } else if (
          teethDiagnozis.tooth41.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth41.seal_top_color = sealColor2;
          teethDiagnozis.tooth41.seal_top = true;
        } else if (
          teethDiagnozis.tooth41.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth41.seal_top_color = sealColor3;
          teethDiagnozis.tooth41.seal_top = true;
        } else {
          teethDiagnozis.tooth41.seal_top = !teethDiagnozis.tooth41.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth41.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth41.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth41.wedge_shaped_defect_color =
          !teethDiagnozis.tooth41.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth41.show) {
        document.getElementById('TH-41').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth81.show) {
        document.getElementById('TH-81').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth41.show) {
        document.getElementById('TH-41').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth81.show) {
          document.getElementById('TH-81').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth41.show) {
        document.getElementById('TH-81').classList.remove('f-tooth-active');
        document.getElementById('TH-41').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth41.show) {
        document.getElementById('TH-41').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth81.show) {
          document.getElementById('TH-81').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="41"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 995.4922 842.0025)"
          className={`st3 st4 st5 ${selectedTooth === 41 ? 'num-active' : ''}`}
        >
          41
        </text>
      </g>
      <g
        id="TH-41"
        className={`f-tooth-init ${(teethDiagnozis.tooth41.show || allTeeth) && !teethDiagnozis.tooth41.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth41.show = !teethDiagnozis.tooth41.show;
            teethDiagnozis.tooth81.show = false;
          }

          dispatch(setSelectedToothNumber(41));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              41,
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
          className={`underlay ${selectedTooth === 41 ? 'selected' : ''}`}
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
            d="M1044.8,1203.9c0,0-7,74-10,101s-10,68-28,68s-21-12-21-41s-1-87-1-100
                        s-3.8-80.8-2.9-97.4c1.9-35.6,15.9-50.6,15.9-79.6s-16-32.8-15.5-67.9s5.5-155.1,6.5-174.1s13-28,27-28s24,6,27,33s6,157,5,171
                        s-18,42-19,66s21,47,20,93C1048,1184.9,1044.8,1203.9,1044.8,1203.9z"
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
                  !tooth41Diagnozis.implant &&
                  !tooth41Diagnozis.apex &&
                  !tooth41Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth41Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M989.7,990.6c1.4,2.6,4.3,4.2,7.3,5.4c5.5,2.1,11.7,3,17.8,3c5.2-0.1,10.3-0.8,15.1-2.5
                                c3.5-1.3,6.9-3.1,8.6-6.1c1.2-2.3,1.2-4.9-0.3-7.1c-1.2-1.8-3.3-2.9-5-4.3c-4.1-3.2-6.7-7.6-10.3-11.3c-2.4-2.4-5.4-4.5-9-4.9
                                c-2.7-0.3-5.3,0.4-7.4,1.9c-1.6,1.2-2.8,3-3.9,4.6c-2.5,3.5-5.5,6.8-8.6,9.8c-1.6,1.5-3.2,3.1-4.2,5
                                C988.7,986.3,988.6,988.6,989.7,990.6z"
              />
            </g>
            <g
              style={{
                visibility:
                  !tooth41Diagnozis.implant &&
                  !tooth41Diagnozis.abutment &&
                  !tooth41Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth41Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M989.7 990.601C991.1 993.201 994 994.801 997 996.001C1002.5 998.101 1008.7 999.001 1014.8 999.001C1020 998.901 1025.1 998.201 1029.9 996.501C1033.4 995.201 1036.8 993.401 1038.5 990.401C1039.7 988.101 1039.7 985.501 1038.2 983.301C1037 981.501 1034.9 980.401 1033.2 979.001C1029.1 975.801 1026.5 971.401 1022.9 967.701C1020.5 965.301 1017.5 963.201 1013.9 962.801C1011.2 962.501 1008.6 963.201 1006.5 964.701C1004.9 965.901 1003.7 967.701 1002.6 969.301C1000.1 972.801 997.1 976.101 994 979.101C992.4 980.601 990.8 982.201 989.8 984.101C988.7 986.301 988.6 988.601 989.7 990.601Z"
              />
            </g>
          </g>
          <g className="pulp">
            <g
              style={{
                visibility: tooth41Diagnozis.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M1008.17 985.526C1008.17 985.127 1007.75 984.098 1009.76 981.942C1011.26 980.569 1011.78 978.147 1013.7 978.109C1015.77 978.069 1016.34 980.259 1017.68 981.718C1019.28 983.469 1019.51 984.753 1019.32 985.526C1018.92 987.118 1017.82 987.148 1013.7 987.173C1009.58 987.198 1008.17 985.924 1008.17 985.526Z"
                style={{ fill: '#e80808' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            style={{
              visibility:
                tooth41Diagnozis.implant || tooth41Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1013.5" cy="982.5" r="14.5" />
            <g className="st27">
              <mask id="implant_41" className="st49">
                <path
                  className="st50"
                  d="M1006.23 973.928L1004.39 973.328C1002.82 974.905 1001.66 976.881 1001.06 979.09L1002.5 980.387C1002.37 981.072 1002.31 981.778 1002.31 982.5C1002.31 983.222 1002.37 983.929 1002.5 984.613L1001.06 985.91C1001.66 988.12 1002.82 990.096 1004.39 991.673L1006.23 991.072C1007.3 991.991 1008.54 992.714 1009.89 993.187L1010.29 995.084C1011.36 995.364 1012.47 995.513 1013.62 995.513C1014.77 995.513 1015.89 995.364 1016.95 995.084L1017.35 993.186C1018.71 992.713 1019.94 991.99 1021.01 991.072L1022.85 991.672C1024.42 990.095 1025.58 988.119 1026.18 985.909L1024.74 984.612C1024.87 983.928 1024.94 983.222 1024.94 982.5C1024.94 981.779 1024.87 981.072 1024.74 980.388L1026.18 979.091C1025.58 976.881 1024.42 974.905 1022.85 973.328L1021.01 973.928C1019.94 973.01 1018.71 972.287 1017.35 971.815L1016.95 969.918C1015.89 969.638 1014.77 969.488 1013.62 969.488C1012.47 969.488 1011.36 969.637 1010.29 969.918L1009.89 971.814C1008.54 972.287 1007.3 973.01 1006.23 973.928Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1006.23 973.928L1004.39 973.328C1002.82 974.905 1001.66 976.881 1001.06 979.09L1002.5 980.387C1002.37 981.072 1002.31 981.778 1002.31 982.5C1002.31 983.222 1002.37 983.929 1002.5 984.613L1001.06 985.91C1001.66 988.12 1002.82 990.096 1004.39 991.673L1006.23 991.072C1007.3 991.991 1008.54 992.714 1009.89 993.187L1010.29 995.084C1011.36 995.364 1012.47 995.513 1013.62 995.513C1014.77 995.513 1015.89 995.364 1016.95 995.084L1017.35 993.186C1018.71 992.713 1019.94 991.99 1021.01 991.072L1022.85 991.672C1024.42 990.095 1025.58 988.119 1026.18 985.909L1024.74 984.612C1024.87 983.928 1024.94 983.222 1024.94 982.5C1024.94 981.779 1024.87 981.072 1024.74 980.388L1026.18 979.091C1025.58 976.881 1024.42 974.905 1022.85 973.328L1021.01 973.928C1019.94 973.01 1018.71 972.287 1017.35 971.815L1016.95 969.918C1015.89 969.638 1014.77 969.488 1013.62 969.488C1012.47 969.488 1011.36 969.637 1010.29 969.918L1009.89 971.814C1008.54 972.287 1007.3 973.01 1006.23 973.928Z"
              ></path>
              <path
                className="st52"
                d="M1004.39 973.328L1005.01 971.426L1003.84 971.045L1002.97 971.918L1004.39 973.328ZM1006.23 973.928L1005.62 975.83L1006.69 976.179L1007.54 975.443L1006.23 973.928ZM1001.06 979.09L999.129 978.567L998.808 979.754L999.722 980.577L1001.06 979.09ZM1002.5 980.387L1004.47 980.758L1004.68 979.653L1003.84 978.9L1002.5 980.387ZM1002.5 984.613L1003.84 986.1L1004.68 985.348L1004.47 984.242L1002.5 984.613ZM1001.06 985.91L999.722 984.423L998.807 985.246L999.129 986.433L1001.06 985.91ZM1004.39 991.673L1002.97 993.082L1003.84 993.955L1005.01 993.574L1004.39 991.673ZM1006.23 991.072L1007.54 989.558L1006.69 988.821L1005.61 989.17L1006.23 991.072ZM1009.89 993.187L1011.85 992.772L1011.61 991.67L1010.55 991.298L1009.89 993.187ZM1010.29 995.084L1008.34 995.499L1008.59 996.704L1009.78 997.018L1010.29 995.084ZM1016.95 995.084L1017.46 997.018L1018.65 996.703L1018.91 995.498L1016.95 995.084ZM1017.35 993.186L1016.69 991.298L1015.63 991.669L1015.39 992.772L1017.35 993.186ZM1021.01 991.072L1021.63 989.17L1020.55 988.821L1019.7 989.557L1021.01 991.072ZM1022.85 991.672L1022.23 993.574L1023.4 993.955L1024.27 993.082L1022.85 991.672ZM1026.18 985.909L1028.11 986.432L1028.43 985.245L1027.52 984.422L1026.18 985.909ZM1024.74 984.612L1022.77 984.241L1022.56 985.347L1023.4 986.099L1024.74 984.612ZM1024.74 980.388L1023.4 978.901L1022.56 979.653L1022.77 980.759L1024.74 980.388ZM1026.18 979.091L1027.52 980.578L1028.43 979.755L1028.11 978.568L1026.18 979.091ZM1022.85 973.328L1024.27 971.918L1023.4 971.045L1022.23 971.426L1022.85 973.328ZM1021.01 973.928L1019.7 975.443L1020.55 976.179L1021.63 975.83L1021.01 973.928ZM1017.35 971.815L1015.39 972.229L1015.63 973.332L1016.69 973.703L1017.35 971.815ZM1016.95 969.918L1018.91 969.503L1018.65 968.298L1017.46 967.984L1016.95 969.918ZM1010.29 969.918L1009.78 967.984L1008.59 968.298L1008.34 969.503L1010.29 969.918ZM1009.89 971.814L1010.55 973.702L1011.61 973.331L1011.85 972.229L1009.89 971.814ZM1003.77 975.23L1005.62 975.83L1006.85 972.026L1005.01 971.426L1003.77 975.23ZM1002.99 979.613C1003.5 977.747 1004.48 976.074 1005.81 974.738L1002.97 971.918C1001.17 973.735 999.821 976.015 999.129 978.567L1002.99 979.613ZM1003.84 978.9L1002.4 977.603L999.722 980.577L1001.17 981.874L1003.84 978.9ZM1004.31 982.5C1004.31 981.903 1004.36 981.321 1004.47 980.758L1000.54 980.016C1000.38 980.822 1000.31 981.653 1000.31 982.5H1004.31ZM1004.47 984.242C1004.36 983.679 1004.31 983.097 1004.31 982.5H1000.31C1000.31 983.348 1000.38 984.178 1000.54 984.984L1004.47 984.242ZM1002.4 987.398L1003.84 986.1L1001.16 983.126L999.722 984.423L1002.4 987.398ZM1005.81 990.263C1004.48 988.926 1003.5 987.254 1002.99 985.388L999.129 986.433C999.82 988.986 1001.17 991.265 1002.97 993.082L1005.81 990.263ZM1005.61 989.17L1003.77 989.771L1005.01 993.574L1006.85 992.974L1005.61 989.17ZM1010.55 991.298C1009.44 990.91 1008.42 990.315 1007.54 989.558L1004.93 992.587C1006.18 993.666 1007.64 994.518 1009.23 995.075L1010.55 991.298ZM1012.25 994.669L1011.85 992.772L1007.94 993.601L1008.34 995.499L1012.25 994.669ZM1013.62 993.513C1012.64 993.513 1011.7 993.387 1010.8 993.15L1009.78 997.018C1011.01 997.341 1012.3 997.513 1013.62 997.513V993.513ZM1016.44 993.15C1015.54 993.386 1014.6 993.513 1013.62 993.513V997.513C1014.94 997.513 1016.23 997.341 1017.46 997.018L1016.44 993.15ZM1015.39 992.772L1014.99 994.669L1018.91 995.498L1019.31 993.601L1015.39 992.772ZM1019.7 989.557C1018.82 990.314 1017.8 990.91 1016.69 991.298L1018.01 995.075C1019.61 994.517 1021.06 993.666 1022.31 992.586L1019.7 989.557ZM1023.47 989.771L1021.63 989.17L1020.39 992.974L1022.23 993.574L1023.47 989.771ZM1024.25 985.387C1023.75 987.253 1022.76 988.926 1021.43 990.263L1024.27 993.082C1026.08 991.265 1027.42 988.985 1028.11 986.432L1024.25 985.387ZM1023.4 986.099L1024.84 987.397L1027.52 984.422L1026.08 983.125L1023.4 986.099ZM1022.94 982.5C1022.94 983.097 1022.88 983.679 1022.77 984.241L1026.7 984.983C1026.86 984.177 1026.94 983.347 1026.94 982.5H1022.94ZM1022.77 980.759C1022.88 981.322 1022.94 981.904 1022.94 982.5H1026.94C1026.94 981.653 1026.86 980.823 1026.7 980.017L1022.77 980.759ZM1024.84 977.604L1023.4 978.901L1026.08 981.875L1027.52 980.578L1024.84 977.604ZM1021.43 974.738C1022.76 976.075 1023.75 977.747 1024.25 979.614L1028.11 978.568C1027.42 976.015 1026.07 973.735 1024.27 971.918L1021.43 974.738ZM1021.63 975.83L1023.47 975.23L1022.23 971.426L1020.39 972.027L1021.63 975.83ZM1016.69 973.703C1017.8 974.091 1018.82 974.686 1019.7 975.443L1022.31 972.414C1021.06 971.335 1019.61 970.483 1018.01 969.926L1016.69 973.703ZM1014.99 970.332L1015.39 972.229L1019.31 971.4L1018.91 969.503L1014.99 970.332ZM1013.62 971.488C1014.6 971.488 1015.54 971.615 1016.44 971.852L1017.46 967.984C1016.23 967.66 1014.94 967.488 1013.62 967.488V971.488ZM1010.8 971.851C1011.7 971.615 1012.64 971.488 1013.62 971.488V967.488C1012.3 967.488 1011.01 967.66 1009.78 967.984L1010.8 971.851ZM1011.85 972.229L1012.25 970.332L1008.34 969.503L1007.93 971.4L1011.85 972.229ZM1007.54 975.443C1008.42 974.686 1009.44 974.091 1010.55 973.702L1009.23 969.926C1007.64 970.483 1006.18 971.334 1004.93 972.414L1007.54 975.443Z"
                mask="url(#implant_41)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <circle className="st44" cx="1014.5" cy="982.5" r="17.5"></circle>
            <path
              className="st45"
              d="M1012.58 973.739C1013.13 971.804 1015.87 971.804 1016.42 973.739L1016.93 975.511C1017.23 976.549 1018.29 977.164 1019.34 976.902L1021.13 976.454C1023.08 975.965 1024.45 978.339 1023.05 979.785L1021.77 981.109C1021.02 981.884 1021.02 983.116 1021.77 983.891L1023.05 985.215C1024.45 986.661 1023.08 989.035 1021.13 988.546L1019.34 988.098C1018.29 987.836 1017.23 988.451 1016.93 989.489L1016.42 991.261C1015.87 993.196 1013.13 993.196 1012.58 991.261L1012.07 989.489C1011.77 988.451 1010.71 987.836 1009.66 988.098L1007.87 988.546C1005.92 989.035 1004.55 986.661 1005.95 985.215L1007.23 983.891C1007.98 983.116 1007.98 981.884 1007.23 981.109L1005.95 979.785C1004.55 978.339 1005.92 975.965 1007.87 976.454L1009.66 976.902C1010.71 977.164 1011.77 976.549 1012.07 975.511L1012.58 973.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth41Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth41Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1037.27 983.855L1037.27 983.855L1037.27 983.864C1038.54 985.72 1038.56 987.915 1037.52 989.923C1036.01 992.581 1032.92 994.274 1029.46 995.561C1024.79 997.212 1019.81 997.901 1014.69 998.001C1008.69 998 1002.62 997.113 997.264 995.069C994.294 993.881 991.708 992.393 990.488 990.14C989.644 988.442 989.63 986.483 990.59 984.557C991.504 982.826 992.985 981.329 994.584 979.83L994.59 979.825L994.595 979.819C997.725 976.791 1000.77 973.445 1003.31 969.882L1003.32 969.875L1003.32 969.867C1003.36 969.814 1003.4 969.76 1003.43 969.707C1004.52 968.123 1005.6 966.554 1006.99 965.508C1008.89 964.156 1011.24 963.522 1013.69 963.794C1016.96 964.158 1019.76 966.077 1022.09 968.403C1023.45 969.801 1024.65 971.293 1025.89 972.819C1026.25 973.268 1026.62 973.72 1026.99 974.173C1028.61 976.145 1030.34 978.112 1032.47 979.781C1033 980.216 1033.61 980.656 1034.19 981.071C1034.54 981.324 1034.88 981.568 1035.18 981.797C1036.04 982.451 1036.76 983.095 1037.27 983.855Z"
            ></path>
            <path
              className="st47"
              d="M1033.2 983.571L1033.2 983.571L1033.2 983.58C1034.22 985.054 1034.24 986.797 1033.4 988.406C1032.17 990.546 1029.65 991.929 1026.77 992.991C1022.91 994.35 1018.77 994.918 1014.52 995C1009.53 994.999 1004.5 994.268 1000.06 992.586C997.589 991.604 995.487 990.393 994.501 988.588C993.826 987.238 993.812 985.678 994.587 984.134C995.333 982.731 996.547 981.511 997.879 980.271L997.885 980.266L997.891 980.26C1000.5 977.751 1003.05 974.975 1005.18 972.017L1005.18 972.01L1005.19 972.002C1005.21 971.962 1005.24 971.921 1005.27 971.88C1006.18 970.562 1007.07 969.285 1008.2 968.437C1009.75 967.343 1011.67 966.829 1013.67 967.05C1016.34 967.345 1018.64 968.903 1020.57 970.814C1021.7 971.964 1022.7 973.19 1023.72 974.451C1024.03 974.823 1024.33 975.199 1024.64 975.576C1026 977.208 1027.45 978.847 1029.24 980.239C1029.68 980.601 1030.2 980.972 1030.69 981.319C1030.98 981.527 1031.26 981.726 1031.5 981.909C1032.21 982.447 1032.79 982.966 1033.2 983.571Z"
            ></path>
            <circle className="st45" cx="1013" cy="983" r="13"></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth41Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1037.27 983.855L1037.27 983.855L1037.27 983.864C1038.54 985.72 1038.56 987.915 1037.52 989.923C1036.01 992.581 1032.92 994.274 1029.46 995.561C1024.79 997.212 1019.81 997.901 1014.69 998.001C1008.69 998 1002.62 997.113 997.264 995.069C994.294 993.881 991.708 992.393 990.487 990.14C989.644 988.442 989.63 986.483 990.59 984.557C991.503 982.826 992.985 981.329 994.584 979.83L994.59 979.825L994.595 979.819C997.725 976.791 1000.77 973.445 1003.31 969.882L1003.32 969.875L1003.32 969.867C1003.36 969.814 1003.4 969.76 1003.43 969.707C1004.52 968.123 1005.6 966.554 1006.99 965.508C1008.89 964.156 1011.24 963.522 1013.69 963.794C1016.96 964.158 1019.76 966.077 1022.09 968.403C1023.45 969.801 1024.65 971.293 1025.89 972.819C1026.25 973.268 1026.62 973.72 1026.99 974.173C1028.61 976.145 1030.34 978.112 1032.47 979.781C1033 980.216 1033.61 980.656 1034.19 981.071C1034.54 981.324 1034.88 981.568 1035.18 981.797C1036.04 982.451 1036.76 983.095 1037.27 983.855Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1033.2 983.571L1033.2 983.571L1033.2 983.58C1034.22 985.054 1034.24 986.797 1033.4 988.406C1032.17 990.546 1029.65 991.929 1026.77 992.991C1022.91 994.35 1018.77 994.918 1014.52 995C1009.53 994.999 1004.5 994.268 1000.06 992.586C997.589 991.604 995.487 990.393 994.501 988.588C993.826 987.238 993.812 985.678 994.587 984.134C995.333 982.731 996.547 981.511 997.879 980.271L997.885 980.266L997.891 980.26C1000.5 977.751 1003.05 974.975 1005.18 972.017L1005.18 972.01L1005.19 972.002C1005.21 971.962 1005.24 971.921 1005.27 971.88C1006.18 970.562 1007.07 969.285 1008.2 968.437C1009.75 967.343 1011.67 966.829 1013.67 967.05C1016.34 967.345 1018.64 968.903 1020.57 970.814C1021.7 971.964 1022.7 973.19 1023.72 974.451C1024.03 974.823 1024.33 975.199 1024.64 975.576C1026 977.208 1027.45 978.847 1029.24 980.239C1029.68 980.601 1030.2 980.972 1030.69 981.319C1030.98 981.527 1031.26 981.726 1031.5 981.909C1032.21 982.447 1032.79 982.966 1033.2 983.571Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle className="st57" cx="1013" cy="983" r="12.25"></circle>
          </g>
          <g
            className="stump"
            style={{
              visibility: !tooth41Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth41Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1037.27 983.855L1037.27 983.855L1037.27 983.864C1038.54 985.72 1038.56 987.915 1037.52 989.923C1036.01 992.581 1032.92 994.274 1029.46 995.561C1024.79 997.212 1019.81 997.901 1014.69 998.001C1008.69 998 1002.62 997.113 997.264 995.069C994.294 993.881 991.708 992.393 990.488 990.14C989.644 988.442 989.63 986.483 990.59 984.557C991.504 982.826 992.985 981.329 994.584 979.83L994.59 979.825L994.595 979.819C997.725 976.791 1000.77 973.445 1003.31 969.882L1003.32 969.875L1003.32 969.867C1003.36 969.814 1003.4 969.76 1003.43 969.707C1004.52 968.123 1005.6 966.554 1006.99 965.508C1008.89 964.156 1011.24 963.522 1013.69 963.794C1016.96 964.158 1019.76 966.077 1022.09 968.403C1023.45 969.801 1024.65 971.293 1025.89 972.819C1026.25 973.268 1026.62 973.72 1026.99 974.173C1028.61 976.145 1030.34 978.112 1032.47 979.781C1033 980.216 1033.61 980.656 1034.19 981.071C1034.54 981.324 1034.88 981.568 1035.18 981.797C1036.04 982.451 1036.76 983.095 1037.27 983.855Z"
            ></path>
            <path
              className="st47"
              d="M1033.2 983.571L1033.2 983.571L1033.2 983.58C1034.22 985.054 1034.24 986.797 1033.4 988.406C1032.17 990.546 1029.65 991.929 1026.77 992.991C1022.91 994.35 1018.77 994.918 1014.52 995C1009.53 994.999 1004.5 994.268 1000.06 992.586C997.589 991.604 995.487 990.393 994.501 988.588C993.826 987.238 993.812 985.678 994.587 984.134C995.333 982.731 996.547 981.511 997.879 980.271L997.885 980.266L997.891 980.26C1000.5 977.751 1003.05 974.975 1005.18 972.017L1005.18 972.01L1005.19 972.002C1005.21 971.962 1005.24 971.921 1005.27 971.88C1006.18 970.562 1007.07 969.285 1008.2 968.437C1009.75 967.343 1011.67 966.829 1013.67 967.05C1016.34 967.345 1018.64 968.903 1020.57 970.814C1021.7 971.964 1022.7 973.19 1023.72 974.451C1024.03 974.823 1024.33 975.199 1024.64 975.576C1026 977.208 1027.45 978.847 1029.24 980.239C1029.68 980.601 1030.2 980.972 1030.69 981.319C1030.98 981.527 1031.26 981.726 1031.5 981.909C1032.21 982.447 1032.79 982.966 1033.2 983.571Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth41Diagnozis.culttab &&
                !tooth41Diagnozis.abutment &&
                !tooth41Diagnozis.implant &&
                !tooth41Diagnozis.apex &&
                !tooth41Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1046.2,982.7c-1.6-2.8-4.3-4.7-6.6-6.9c-2.6-2.5-4.8-5.5-6.9-8.5
                            c-2.2-3.2-4.3-6.5-6.7-9.5c-3.2-3.9-7-7.2-11.7-7.9c-3.5-0.5-6.9,0.5-9.6,3c-2.1,1.9-3.6,4.7-5.1,7.3c-1.3,2.3-2.7,4.5-4.2,6.6
                            c-2.2,3.1-4.5,6.1-6.9,9c-2,2.4-4.2,4.9-5.3,7.9c-1.3,3.3-1.4,7,0,10.2c1,2.2,2.5,4,4.3,5.5c1.6,1.3,3.4,2.3,5.3,3.2
                            c7.2,3.4,15.2,4.9,23.2,4.9c6.7,0,13.4-1.2,19.6-3.8c2-0.8,3.9-1.9,5.6-3.1c2.3-1.7,4.2-3.8,5.4-6.5
                            C1048.2,990.3,1048.1,986.1,1046.2,982.7z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              opacity: teethDiagnozis.tooth41.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1048.46 982.551C1046.82 979.352 1042.76 976.026 1040.44 973.538C1038.5 971.571 1037.99 970.719 1036.4 968.38C1034.8 966.018 1032.11 962.167 1030.57 959.713C1029.23 957.576 1027.85 956.83 1026.36 954.829C1024.6 952.543 1023.79 950.41 1021.56 948.814C1019.63 947.431 1016.33 946.451 1014.05 946.121C1010.36 945.588 1006.8 946.832 1003.93 949.498C1001.74 951.63 1000.1 953.458 998.6 956.301C997.449 958.395 996.221 961.82 994.936 963.827C993.583 965.939 992.168 966.627 990.715 968.626C989.448 970.37 988.151 973.44 986.841 975.087C984.653 977.753 982.466 979.225 981.098 982.601C979.731 986.511 979.594 991.969 980.962 995.524C981.735 997.389 982.842 1000.34 984.158 1001.69C986.1 1003.7 988.497 1003.85 990.943 1005.12C994.554 1006.91 998.386 1009.58 1002.32 1010.45C1006.57 1011.39 1010.95 1010.45 1015.28 1010.45C1018.6 1010.37 1021.89 1011.42 1025.12 1010.8C1028.81 1010.1 1032.43 1007.62 1035.93 1006.01C1038.4 1004.81 1040.84 1004.75 1042.94 1002.91C1044.9 1001.19 1046.56 999.113 1047.69 996.54C1048.54 994.407 1048.95 990.757 1048.86 988.51C1048.77 986.452 1049.44 984.42 1048.46 982.551ZM996.902 996.001C993.902 994.801 991.002 993.201 989.602 990.601C988.602 988.601 988.702 986.301 989.702 984.101C990.702 982.201 992.302 980.601 993.902 979.101C997.002 976.101 1000 972.801 1002.5 969.301C1003.6 967.701 1004.8 965.901 1006.4 964.701C1008.5 963.201 1011.1 962.501 1013.8 962.801C1017.4 963.201 1020.4 965.301 1022.8 967.701C1026.4 971.401 1029 975.801 1033.1 979.001C1034.8 980.401 1036.9 981.501 1038.1 983.301C1039.6 985.501 1039.6 988.101 1038.4 990.401C1036.7 993.401 1033.3 995.201 1029.8 996.501C1025 998.201 1019.9 998.901 1014.7 999.001C1008.6 999.001 1002.4 998.101 996.902 996.001Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1048.46 982.551C1046.82 979.352 1042.76 976.026 1040.44 973.538C1038.5 971.571 1037.99 970.719 1036.4 968.38C1034.8 966.018 1032.11 962.167 1030.57 959.713C1029.23 957.576 1027.85 956.83 1026.36 954.829C1024.6 952.543 1023.79 950.41 1021.56 948.814C1019.63 947.431 1016.33 946.451 1014.05 946.121C1010.36 945.588 1006.8 946.832 1003.93 949.498C1001.74 951.63 1000.1 953.458 998.6 956.301C997.449 958.395 996.221 961.82 994.936 963.827C993.583 965.939 992.168 966.627 990.715 968.626C989.448 970.37 988.151 973.44 986.841 975.087C984.653 977.753 982.466 979.225 981.098 982.601C979.731 986.511 979.594 991.969 980.962 995.524C981.735 997.389 982.842 1000.34 984.158 1001.69C986.1 1003.7 988.497 1003.85 990.943 1005.12C994.554 1006.91 998.386 1009.58 1002.32 1010.45C1006.57 1011.39 1010.95 1010.45 1015.28 1010.45C1018.6 1010.37 1021.89 1011.42 1025.12 1010.8C1028.81 1010.1 1032.43 1007.62 1035.93 1006.01C1038.4 1004.81 1040.84 1004.75 1042.94 1002.91C1044.9 1001.19 1046.56 999.113 1047.69 996.54C1048.54 994.407 1048.95 990.757 1048.86 988.51C1048.77 986.452 1049.44 984.42 1048.46 982.551ZM996.902 996.001C993.902 994.801 991.002 993.201 989.602 990.601C988.602 988.601 988.702 986.301 989.702 984.101C990.702 982.201 992.302 980.601 993.902 979.101C997.002 976.101 1000 972.801 1002.5 969.301C1003.6 967.701 1004.8 965.901 1006.4 964.701C1008.5 963.201 1011.1 962.501 1013.8 962.801C1017.4 963.201 1020.4 965.301 1022.8 967.701C1026.4 971.401 1029 975.801 1033.1 979.001C1034.8 980.401 1036.9 981.501 1038.1 983.301C1039.6 985.501 1039.6 988.101 1038.4 990.401C1036.7 993.401 1033.3 995.201 1029.8 996.501C1025 998.201 1019.9 998.901 1014.7 999.001C1008.6 999.001 1002.4 998.101 996.902 996.001Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1042.66 982.654C1041.28 980.322 1037.86 977.896 1035.9 976.082C1034.27 974.647 1033.84 974.026 1032.5 972.32C1031.15 970.598 1028.89 967.789 1027.59 966C1026.46 964.442 1025.31 963.898 1024.04 962.438C1022.56 960.771 1021.88 959.216 1020 958.052C1018.38 957.044 1015.6 956.329 1013.68 956.088C1010.57 955.7 1007.58 956.607 1005.16 958.551C1003.32 960.106 1001.93 961.438 1000.67 963.512C999.698 965.039 998.663 967.537 997.581 969C996.442 970.54 995.25 971.042 994.026 972.5C992.959 973.772 991.867 976.01 990.764 977.212C988.921 979.155 987.079 980.229 985.927 982.691C984.776 985.542 984.661 989.523 985.812 992.114C986.463 993.475 987.396 995.624 988.504 996.613C990.14 998.074 992.159 998.185 994.218 999.112C997.26 1000.42 1000.49 1002.37 1003.8 1003C1007.38 1003.68 1011.06 1003 1014.72 1003C1017.51 1002.94 1020.28 1003.71 1023 1003.26C1026.11 1002.74 1029.16 1000.93 1032.1 999.76C1034.19 998.889 1036.24 998.844 1038.01 997.5C1039.66 996.246 1041.06 994.732 1042.01 992.855C1042.73 991.3 1043.07 988.638 1042.99 987C1042.92 985.499 1043.49 984.017 1042.66 982.654ZM996.904 996.001C993.904 994.801 991.004 993.201 989.604 990.601C988.604 988.601 988.704 986.301 989.704 984.101C990.704 982.201 992.304 980.601 993.904 979.101C997.004 976.101 1000 972.801 1002.5 969.301C1003.6 967.701 1004.8 965.901 1006.4 964.701C1008.5 963.201 1011.1 962.501 1013.8 962.801C1017.4 963.201 1020.4 965.301 1022.8 967.701C1026.4 971.401 1029 975.801 1033.1 979.001C1034.8 980.401 1036.9 981.501 1038.1 983.301C1039.6 985.501 1039.6 988.101 1038.4 990.401C1036.7 993.401 1033.3 995.201 1029.8 996.501C1025 998.201 1019.9 998.901 1014.7 999.001C1008.6 999.001 1002.4 998.101 996.904 996.001Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth41Diagnozis.culttab &&
                !tooth41Diagnozis.abutment &&
                !tooth41Diagnozis.implant &&
                !tooth41Diagnozis.shaper &&
                !tooth41Diagnozis.apex
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
                d="M1028.2,988.5c1.4,2.1,8.2,8,13,11.9c2.3-1.7,4.2-3.8,5.4-6.5c1.6-3.6,1.5-7.8-0.4-11.3
                                c-1.6-2.8-4.3-4.7-6.6-6.9c-2.6-2.5-4.8-5.5-6.9-8.5c-1.1,2.4-3.3,7.3-4.5,10.1c-0.5,1.2-0.9,2.5-1.2,3.7
                                C1026.5,983.7,1026.7,986.3,1028.2,988.5z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth41.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth41.seal_right ? `seal-fill ${teethDiagnozis.tooth41.seal_right_color}` : ''}
                                `}
                d="M1028.2,988.5c1.4,2.1,8.2,8,13,11.9c2.3-1.7,4.2-3.8,5.4-6.5c1.6-3.6,1.5-7.8-0.4-11.3
                                c-1.6-2.8-4.3-4.7-6.6-6.9c-2.6-2.5-4.8-5.5-6.9-8.5c-1.1,2.4-3.3,7.3-4.5,10.1c-0.5,1.2-0.9,2.5-1.2,3.7
                                C1026.5,983.7,1026.7,986.3,1028.2,988.5z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_14_4"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M995.4,966.7c2.8,4.3,8.2,12.9,8.3,15.7c6.9,0,17.4-0.8,23.3-1.3c0.2-1.2,0.7-2.5,1.2-3.7
                                c1.2-2.8,3.4-7.7,4.5-10.1c-2.2-3.2-4.3-6.5-6.7-9.5c-3.2-3.9-7-7.2-11.7-7.9c-3.5-0.5-6.9,0.5-9.6,3c-2.1,1.9-3.6,4.7-5.1,7.3
                                C998.3,962.4,996.9,964.6,995.4,966.7z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth41.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth41.seal_bottom ? `seal-fill ${teethDiagnozis.tooth41.seal_bottom_color}` : ''}
                                `}
                d="M995.4,966.7c2.8,4.3,8.2,12.9,8.3,15.7c6.9,0,17.4-0.8,23.3-1.3c0.2-1.2,0.7-2.5,1.2-3.7
                                c1.2-2.8,3.4-7.7,4.5-10.1c-2.2-3.2-4.3-6.5-6.7-9.5c-3.2-3.9-7-7.2-11.7-7.9c-3.5-0.5-6.9,0.5-9.6,3c-2.1,1.9-3.6,4.7-5.1,7.3
                                C998.3,962.4,996.9,964.6,995.4,966.7z"
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
                d="M983.2,993.8c1,2.2,2.5,4,4.3,5.5c6-5.8,15.1-14.8,16.1-16.3c0.1-0.1,0.1-0.4,0.1-0.6
                                c-0.1-2.8-5.5-11.4-8.3-15.7c-2.2,3.1-4.5,6.1-6.9,9c-2,2.4-4.2,4.9-5.3,7.9C981.9,986.9,981.8,990.6,983.2,993.8z"
              />
              <path
                className={`
                                    st8 target caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth41.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth41.seal_left ? `seal-fill ${teethDiagnozis.tooth41.seal_left_color}` : ''}
                                `}
                d="M983.2,993.8c1,2.2,2.5,4,4.3,5.5c6-5.8,15.1-14.8,16.1-16.3c0.1-0.1,0.1-0.4,0.1-0.6
                                c-0.1-2.8-5.5-11.4-8.3-15.7c-2.2,3.1-4.5,6.1-6.9,9c-2,2.4-4.2,4.9-5.3,7.9C981.9,986.9,981.8,990.6,983.2,993.8z"
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
                d="M987.5,999.3c1.6,1.3,3.4,2.3,5.3,3.2c7.2,3.4,15.2,4.9,23.2,4.9c6.7,0,13.4-1.2,19.6-3.8
                                c2-0.8,3.9-1.9,5.6-3.1c-4.8-4-11.6-9.8-13-11.9c-1.5-2.2-1.7-4.8-1.2-7.5c-5.9,0.5-16.3,1.3-23.3,1.3c0,0.3,0,0.5-0.1,0.6
                                C1002.6,984.5,993.5,993.5,987.5,999.3z"
              />
              <path
                className={`
                                    st8 target caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth41.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth41.seal_center ? `seal-fill ${teethDiagnozis.tooth41.seal_center_color}` : ''}
                                `}
                d="M987.5,999.3c1.6,1.3,3.4,2.3,5.3,3.2c7.2,3.4,15.2,4.9,23.2,4.9c6.7,0,13.4-1.2,19.6-3.8
                                c2-0.8,3.9-1.9,5.6-3.1c-4.8-4-11.6-9.8-13-11.9c-1.5-2.2-1.7-4.8-1.2-7.5c-5.9,0.5-16.3,1.3-23.3,1.3c0,0.3,0,0.5-0.1,0.6
                                C1002.6,984.5,993.5,993.5,987.5,999.3z"
              />
            </g>
            <g className="with">
              {/* Черточка лево верх */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth41Diagnozis.seal_left &&
                      !tooth41Diagnozis.seal_top &&
                      !tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_left &&
                      !tooth41Diagnozis.seal_top &&
                      !tooth41Diagnozis.seal_center) ||
                    (!tooth41Diagnozis.seal_left &&
                      tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1005 981.5C1002.17 985.167 995.3 993.3 990.5 996.5"
              />
              {/* Черточка лево низ */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth41Diagnozis.seal_left &&
                      !tooth41Diagnozis.seal_bottom) ||
                    (!tooth41Diagnozis.seal_left &&
                      tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center) ||
                    (!tooth41Diagnozis.seal_left &&
                      tooth41Diagnozis.seal_bottom &&
                      tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1005 981.5C1004.67 979.667 1003 974.8 999 970"
              />
              {/* Черточка середина */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center) ||
                    (!tooth41Diagnozis.seal_bottom &&
                      tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1005 981.5C1008 982.167 1016.3 982.9 1025.5 980.5"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth41Diagnozis.seal_right &&
                      !tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center) ||
                    (!tooth41Diagnozis.seal_right &&
                      tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_right &&
                      !tooth41Diagnozis.seal_bottom &&
                      tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_center &&
                      tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_right)
                      ? 5
                      : 0,
                }}
                d="M1025.5 980.5C1026.33 979.5 1028.2 976 1029 970"
              />
              {/*Черточка право низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth41Diagnozis.seal_right &&
                      tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_right &&
                      !tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1025.5 980.5C1026.17 983.167 1029.6 989.9 1038 995.5"
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
                visibility: tooth41Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth41Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1046.6 993.9C1045.4 996.7 1043.5 998.8 1041.2 1000.4C1039.5 1001.7 1037.5 1002.7 1035.6 1003.5C1029.5 1006.1 1022.8 1007.3 1016 1007.3C1008 1007.3 1000 1005.8 992.802 1002.4C991.002 1001.5 989.102 1000.5 987.502 999.2C985.702 997.7 984.202 996 983.202 993.7C982.627 992.33 982.306 990.842 982.24 989.323C984.347 989.217 990.239 990.065 997.215 994.239C997.358 994.328 997.502 994.415 997.647 994.5C998.269 994.867 998.907 995.199 999.529 995.514C1004.59 997.933 1010.2 999 1015.82 999C1020.6 999 1025.31 998.146 1029.59 996.296C1030.72 995.814 1031.9 995.23 1032.96 994.5C1033 994.473 1033.04 994.445 1033.08 994.417C1039.33 990.09 1045.42 989.311 1047.69 989.465C1047.59 990.987 1047.23 992.497 1046.6 993.9Z"
              ></path>
              <path
                className="st55"
                d="M1033.52 994.09C1033.38 994.202 1033.23 994.311 1033.08 994.417M995.807 993.237C996.249 993.601 996.724 993.932 997.215 994.239M997.647 994.5C998.269 994.867 998.907 995.199 999.529 995.514C1004.59 997.933 1010.2 999 1015.82 999C1020.6 999 1025.31 998.146 1029.59 996.296C1030.72 995.814 1031.9 995.23 1032.96 994.5C1033 994.473 1033.04 994.445 1033.08 994.417M997.647 994.5C997.502 994.415 997.358 994.328 997.215 994.239M997.647 994.5C997.502 994.412 997.358 994.325 997.215 994.239M997.215 994.239C990.239 990.065 984.347 989.217 982.24 989.323C982.306 990.842 982.627 992.33 983.202 993.7C984.202 996 985.702 997.7 987.502 999.2C989.102 1000.5 991.002 1001.5 992.802 1002.4C1000 1005.8 1008 1007.3 1016 1007.3C1022.8 1007.3 1029.5 1006.1 1035.6 1003.5C1037.5 1002.7 1039.5 1001.7 1041.2 1000.4C1043.5 998.8 1045.4 996.7 1046.6 993.9C1047.23 992.497 1047.59 990.987 1047.69 989.465C1045.42 989.311 1039.33 990.09 1033.08 994.417"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth41Diagnozis.temporary_crown ||
                tooth41Diagnozis.ceramic_crown ||
                tooth41Diagnozis.mceramic_crown ||
                tooth41Diagnozis.metalic_crown ||
                tooth41Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth41Diagnozis.temporary_crown ||
                tooth41Diagnozis.ceramic_crown ||
                tooth41Diagnozis.mceramic_crown ||
                tooth41Diagnozis.metalic_crown ||
                tooth41Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth41Diagnozis.ceramic_crown_color}
                                ${tooth41Diagnozis.mceramic_crown_color}
                                ${tooth41Diagnozis.metalic_crown_color}
                                ${tooth41Diagnozis.zirconia_crown_color}
                            `}
              d="M1046.2,982.7c-1.6-2.8-4.3-4.7-6.6-6.9c-2.6-2.5-4.8-5.5-6.9-8.5
                            c-2.2-3.2-4.3-6.5-6.7-9.5c-3.2-3.9-7-7.2-11.7-7.9c-3.5-0.5-6.9,0.5-9.6,3c-2.1,1.9-3.6,4.7-5.1,7.3c-1.3,2.3-2.7,4.5-4.2,6.6
                            c-2.2,3.1-4.5,6.1-6.9,9c-2,2.4-4.2,4.9-5.3,7.9c-1.3,3.3-1.4,7,0,10.2c1,2.2,2.5,4,4.3,5.5c1.6,1.3,3.4,2.3,5.3,3.2
                            c7.2,3.4,15.2,4.9,23.2,4.9c6.7,0,13.4-1.2,19.6-3.8c2-0.8,3.9-1.9,5.6-3.1c2.3-1.7,4.2-3.8,5.4-6.5
                            C1048.2,990.3,1048.1,986.1,1046.2,982.7z"
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
              id="dentin_v_41"
              style={{
                visibility:
                  !tooth41Diagnozis.implant &&
                  !tooth41Diagnozis.apex &&
                  !tooth41Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_41"
                className={`st10 change-color ${tooth41Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1040.3,1172.7c0,5.2-0.1,10.4-0.3,15.6c-0.8,18.5-2.6,37.1-4.5,55.6
                                c-2,19.9-4.2,39.7-7.2,59.5c-2.4,15.4-5.2,30.7-8.9,45.6c-2,7.7-5.5,15.3-11.4,15.7c6-0.5,9.4-8.1,11.4-15.7
                                c3.8-14.9,6.5-30.3,8.9-45.6c3.1-19.7,5.2-39.6,7.2-59.5c1.5-14.5,2.9-29.1,3.9-43.6c-2.9,9.1-6.9,18.3-15.2,23.1
                                c-1.7,1-3.6,1.7-5.5,2.2c-3.6,0.9-7.4,0.9-11-0.1c-1.9-0.5-3.8-1.4-5.5-2.5c-5.2-3.3-8.4-8.5-10.8-14.1c-0.3-0.7-0.6-1.3-0.8-2
                                c-0.1-5.3-0.1-10.5,0.1-15.8c0.2-5.1,0.6-10.1,1.1-15.2c0.9-8.7,2.3-17.4,4.1-26l0.9-1.5l1.6-1.4l37.9-0.1l1.8,1l1.4,2.5
                                C1040,1157.8,1040.3,1165.2,1040.3,1172.7z"
              />
            </g>
            <g
              id="dentin_n_42"
              style={{
                visibility:
                  !tooth41Diagnozis.implant &&
                  !tooth41Diagnozis.abutment &&
                  !tooth41Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_41"
                className={`st10 change-color ${tooth41Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1039.3,1200.2c-0.9,14.5-2.4,29.1-3.9,43.6c-2,19.9-4.2,39.7-7.2,59.5
                                c-2.4,15.4-5.1,30.7-8.9,45.6c-2,7.9-5.7,15.8-12.1,15.8c-0.9,0-1.8-0.2-2.6-0.5c0,0,0,0,0,0c-5.3-2.1-7.8-10.4-9-18.4
                                c-1-6.7-2.2-13.3-3-20c-1-8.3-1.2-16.6-1.4-24.9c-0.3-11-0.6-22-0.6-33c0-10.3,0.4-20.7,0.4-31c0-10.1-0.5-20.2-0.6-30.3
                                c0.3,0.7,0.6,1.4,0.9,2.2c2.4,5.6,5.6,10.8,10.8,14.1c1.7,1.1,3.6,1.9,5.5,2.5c3.6,1,7.4,1.1,11,0.1c1.9-0.5,3.7-1.2,5.5-2.2
                                C1032.4,1218.5,1036.4,1209.3,1039.3,1200.2z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth41Diagnozis.channel_class} ${tooth41Diagnozis.channel_class} ${tooth41Diagnozis.pulpit ? 'pulpit' : ''} ${tooth41Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1023.4,1195.9c-0.7,6.4-1.8,12.8-2.9,19.1c-0.6,3.5-1.2,7-1.8,10.5c0,0,0,0,0,0
                                c0,0,0,0,0,0c-1.1,0.3-2.2,0.5-3.3,0.6c-0.4,0-0.8,0.1-1.2,0.1c-1,0-1.9,0-2.9-0.1c-0.2,0-0.5-0.1-0.7-0.1c-1-0.1-1.9-0.3-2.8-0.6
                                c0-3.5-0.1-7-0.3-10.5c-0.2-4.4-0.5-8.8-0.5-13.2c0-4.7,0.2-9.5,0.7-14.2c0.4-4,0.8-7.9,1.4-11.9l1-1.8l12.7,0.2l1.2,2
                                C1024.3,1182.5,1024.1,1189.2,1023.4,1195.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth41Diagnozis.channel_class} ${tooth41Diagnozis.channel_class} ${tooth41Diagnozis.pulpit ? 'pulpit' : ''} ${tooth41Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1006.3,1294.8c0.2,0,0.5,0,0.8,0.1c1.4,0.1,2.8,0,4.1-0.3
                                c0.2-2.2,0.3-4.4,0.5-6.6c1-13.2,2.1-26.4,3.7-39.5c0.9-7.7,2.1-15.3,3.3-22.9v0c0,0,0,0,0,0c-1.1,0.3-2.2,0.5-3.3,0.6
                                c-0.2,0-0.4,0-0.7,0.1c-1.4,0.1-2.8,0-4.2-0.2c-0.9-0.1-1.9-0.3-2.8-0.6c0,0,0,0,0,0c0,5.2,0,10.4-0.1,15.7
                                c-0.2,15.7-0.7,31.4-1.1,47.1C1006.5,1290.3,1006.4,1292.6,1006.3,1294.8z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth41Diagnozis.channel_class} ${tooth41Diagnozis.channel_class} ${tooth41Diagnozis.pulpit ? 'pulpit' : ''} ${tooth41Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1004.7,1364.2v0.2C1004.7,1364.3,1004.7,1364.3,1004.7,1364.2L1004.7,1364.2
                                c1.8-13.7,3.2-27.5,4.4-41.3c0.8-9.4,1.5-18.9,2.2-28.3c-1.4,0.3-2.7,0.4-4.1,0.3c-0.2,0-0.5,0-0.8-0.1
                                c-0.3,10.8-0.6,21.6-0.9,32.5C1005.1,1339.6,1004.9,1351.9,1004.7,1364.2z"
              />
            </g>
            <PeriodontitStage41 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth41Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56"
              d="M990.5 1206.6C990.8 1207.3 991.1 1208 991.4 1208.8C993.8 1214.4 997 1219.6 1002.2 1222.9C1003.9 1224 1005.8 1224.8 1007.7 1225.4H1007.8C1011.4 1226.4 1015.1 1226.4 1018.7 1225.5C1019.1 1225.4 1019.5 1225.3 1019.9 1225.2C1021.4 1224.7 1022.8 1224.1 1024.2 1223.3C1032.5 1218.5 1036.5 1209.3 1039.4 1200.2C1039.7 1196.2 1039.9 1192.2 1040 1188.3C1040.2 1183.1 1040.3 1177.9 1040.3 1172.7C1040.3 1165.2 1040 1157.8 1039.3 1150.3L1037.9 1147.8L1036.2 1146.8L998.3 1146.9L996.7 1148.3L995.8 1149.8C994 1158.4 992.6 1167 991.7 1175.8C991.2 1180.8 990.8 1185.9 990.6 1191C990.5 1196.2 990.4 1201.4 990.5 1206.6Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st57"
              style={{ fill: tooth41Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M1029.1 1146.9L1020 1225.1L1012.2 1292.2L1009.9 1311.9C1009.8 1312.9 1008.9 1313.7 1007.9 1313.7C1006.8 1313.7 1005.9 1312.8 1005.9 1311.6L1006.5 1286.3L1008 1225.3L1009.9 1146.9H1029.1Z"
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth41Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth41Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M1007.8,1313.7L1007.8,1313.7c1,0,1.9-0.8,2-1.8l10.1-86.8c-0.4,0.1-0.8,0.2-1.2,0.3
                            c-3.6,0.9-7.4,0.9-10.9-0.1l-2,86.3C1005.8,1312.8,1006.7,1313.7,1007.8,1313.7z"
            />
            <path
              className="st15"
              d="M990.5,1206.6c0.3,0.7,0.6,1.4,0.9,2.2c2.4,5.6,5.6,10.8,10.8,14.1c1.7,1.1,3.6,1.9,5.5,2.5
                            c0,0,0.1,0,0.1,0c3.6,1,7.3,1,10.9,0.1c0.4-0.1,0.8-0.2,1.2-0.3c1.5-0.5,2.9-1.1,4.3-1.9c8.3-4.8,12.3-14,15.2-23.1
                            c0.3-4,0.5-8,0.6-11.9c0.2-5.2,0.3-10.4,0.3-15.6c0-7.5-0.3-14.9-1-22.4l-1.4-2.5l-1.7-1l-37.9,0.1l-1.6,1.4l-0.9,1.5
                            c-1.8,8.6-3.2,17.2-4.1,26c-0.5,5-0.9,10.1-1.1,15.2C990.5,1196.2,990.4,1201.4,990.5,1206.6z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth41Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth41Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M990.5,1206.6l10.3,30.4l21.1,0.8l17.5-37.6c-2.9,9.1-6.9,18.3-15.2,23.1c-6.9,3.9-15.3,3.8-22-0.4
                            c-5.2-3.3-8.4-8.5-10.8-14.1C991.1,1208.1,990.8,1207.4,990.5,1206.6z"
            />
            <path
              className="st17"
              d="M990.5,1206.6c0.3,0.7,0.6,1.5,0.9,2.2c2.4,5.6,5.6,10.8,10.8,14.1c6.7,4.2,15.1,4.3,22,0.4
                            c8.3-4.7,12.3-14,15.2-23.1c0.3-4,0.5-8,0.6-11.9c0.2-5.2,0.3-10.4,0.3-15.6c0-7.5-0.3-14.9-1-22.4l-1.4-2.5l-1.7-1l-37.9,0.1
                            l-1.6,1.4l-0.9,1.5c-1.8,8.6-3.2,17.2-4.1,26c-0.5,5-0.9,10.1-1.1,15.2C990.5,1196.2,990.4,1201.4,990.5,1206.6z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <path
              className="st44"
              d="M996.559 1196.45C996.364 1194.08 998.261 1192.07 1000.63 1192.12L1026.41 1192.7C1028.79 1192.75 1030.59 1194.85 1030.29 1197.2L1025.3 1236.51C1025.04 1238.55 1023.28 1240.06 1021.22 1240.01L1003.67 1239.52C1001.63 1239.46 999.962 1237.88 999.795 1235.85L996.559 1196.45Z"
            />
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth41Diagnozis.abutment ||
                tooth41Diagnozis.implant ||
                tooth41Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M995.9,1236.7c0,0-1.3,40-1.5,49.4c-0.2,9.4,0.7,70.2,0.7,70.2s5.1,6.9,11.9,6.2c6.8-0.8,10.7-5.7,10.9-7
                            c0.3-1.3,4.8-46.2,5.4-52.3s6-65.7,6-65.7L995.9,1236.7z"
            />
            <line
              className="st19"
              x1="991.2"
              y1="1247.3"
              x2="1032.6"
              y2="1254.7"
            />
            <line
              className="st19"
              x1="991.2"
              y1="1271.3"
              x2="1030.6"
              y2="1277.7"
            />
            <line
              className="st19"
              x1="989.2"
              y1="1294.3"
              x2="1028.6"
              y2="1300.7"
            />
            <line
              className="st19"
              x1="988.2"
              y1="1317.3"
              x2="1027.6"
              y2="1323.7"
            />
            <line
              className="st19"
              x1="987.2"
              y1="1341.3"
              x2="1026.6"
              y2="1347.7"
            />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth41Diagnozis.culttab &&
                !tooth41Diagnozis.abutment &&
                !tooth41Diagnozis.implant &&
                !tooth41Diagnozis.shaper &&
                !tooth41Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1048.1,1128.9c0.4-2.1-0.6-4.2-2.5-5.2c-0.8-0.4-1.6-0.6-2.5-0.5l-9.4-0.1l-32.3-0.3
                            l-13.1-0.1c-1.5,0.4-2.8,1.3-3.8,2.5c-1.1,1.4-1.6,3.1-1.5,4.8c-1,17.1-0.4,34.3,1.7,51.4c0.8,6.4,1.8,12.8,3.6,19
                            c0.8,2.9,1.8,5.7,2.9,8.4c2.4,5.6,5.6,10.8,10.8,14.1c6.7,4.2,15.1,4.3,22,0.4c8.1-4.6,12.1-13.4,15-22.3c0.1-0.4,0.2-0.7,0.3-1.1
                            c3.6-11.3,6.2-23,7.7-34.8C1048.7,1153.1,1049,1141,1048.1,1128.9z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth41Diagnozis.culttab && !tooth41Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M984.824 1125.2C983.724 1126.5 983.224 1128.3 983.324 1130C982.324 1147.2 982.924 1164.4 985.224 1181.5C986.024 1187.9 987.024 1194.3 988.824 1200.5C989.624 1203.4 990.524 1206.2 991.724 1208.9C994.124 1214.5 997.324 1219.7 1002.52 1223C1009.22 1227.2 1017.62 1227.3 1024.52 1223.4C1032.62 1218.8 1036.62 1210 1039.52 1201.1L1039.53 1201.1C1039.63 1200.7 1039.72 1200.3 1039.82 1200C1043.42 1188.7 1046.02 1177 1047.52 1165.2C1049.02 1153.1 1049.32 1141 1048.42 1128.9C1048.82 1126.8 1047.82 1124.7 1045.92 1123.7C1045.12 1123.3 1044.32 1123.1 1043.42 1123.2L1034.02 1123.1L1001.72 1122.8L988.624 1122.7C987.124 1123.1 985.824 1124 984.824 1125.2ZM1032.7 1201.16C1032.77 1200.86 1032.84 1200.56 1032.92 1200.34C1033.51 1198.43 1034.07 1196.52 1034.59 1194.59C1034.93 1193.35 1034.01 1192.14 1032.73 1192.11L995.618 1191.07C994.371 1191.03 993.395 1192.13 993.61 1193.36C994.044 1195.84 994.575 1198.29 995.266 1200.71C995.857 1202.88 996.521 1204.98 997.407 1207C999.179 1211.2 1001.54 1215.1 1005.38 1217.57C1010.33 1220.72 1016.53 1220.79 1021.62 1217.87C1027.6 1214.42 1030.55 1207.83 1032.69 1201.16L1032.7 1201.16Z"
            ></path>
            <path
              className={`st7 ${tooth41Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1032.7 1200.34C1032.62 1200.56 1032.55 1200.86 1032.48 1201.16L1032.48 1201.16C1030.34 1207.83 1027.38 1214.42 1021.4 1217.87C1016.31 1220.79 1010.11 1220.72 1005.16 1217.57C1001.32 1215.1 998.96 1211.2 997.188 1207C996.302 1204.98 995.638 1202.88 995.047 1200.71C994.357 1198.29 993.825 1195.84 993.392 1193.36C993.176 1192.13 994.153 1191.03 995.399 1191.07L1032.51 1192.11C1033.79 1192.14 1034.71 1193.35 1034.37 1194.59C1033.85 1196.52 1033.29 1198.43 1032.7 1200.34Z"
            />
            <path
              className={`st60
                                    ${tooth41Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth41Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth41Diagnozis.seal_cervical_color}
                                `}
              d="M1032.7 1200.34C1032.62 1200.56 1032.55 1200.86 1032.48 1201.16L1032.48 1201.16C1030.34 1207.83 1027.38 1214.42 1021.4 1217.87C1016.31 1220.79 1010.11 1220.72 1005.16 1217.57C1001.32 1215.1 998.96 1211.2 997.188 1207C996.302 1204.98 995.638 1202.88 995.047 1200.71C994.357 1198.29 993.825 1195.84 993.392 1193.36C993.176 1192.13 994.153 1191.03 995.399 1191.07L1032.51 1192.11C1033.79 1192.14 1034.71 1193.35 1034.37 1194.59C1033.85 1196.52 1033.29 1198.43 1032.7 1200.34Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth41.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1043.5 1186L1041 1187.5L1039.5 1190.5V1192L1038 1193.5V1195.5L1036 1200.5V1203.5L1033.5 1206.5L1031.5 1211L1031 1213.5L1029.5 1216L1028.5 1217L1026 1219L1024.5 1219.5L1023.5 1220.5L1019 1223L1016 1224L1014.5 1223H1011.5L1007.5 1222L1004.5 1220.5H1002L1000.5 1219L997.5 1217L996 1213.5L994 1209L992.5 1206.5V1204.5L991 1203.5L990 1200.5L990.5 1199L990 1197.5V1195L988 1191L987.5 1188.5L987 1186.5L985 1184.5L984.5 1185V1186.5L985 1188.5V1189.5V1192L985.5 1193.5L986.5 1196.5V1198V1200.5L987 1201.5L988 1203.5V1205V1207.5L989.5 1209V1211V1212.5L990 1214V1217L989.5 1218L990 1220.5L990.5 1224V1227.5L990 1232L991 1235.5L990.5 1238L992.5 1240.5L996 1242L1000.5 1246L1006 1248.5L1011.5 1249.5H1017L1021 1247.5H1024.5L1026 1246H1029.5L1031.5 1243L1034.5 1242L1036 1239.5V1237L1037 1233V1229.5L1038 1227.5V1225L1039.5 1223L1039 1221.5V1219L1039.5 1217L1038.5 1214.5L1039.5 1212.5V1207.5L1041 1205V1200.5L1042.5 1198L1043.5 1194.5L1043 1192L1044.5 1188L1043.5 1186Z"
            ></path>
            <path
              className="st61 level1"
              d="M1043.5 1186L1041 1187.5L1039.5 1190.5V1192L1038 1193.5V1195.5L1036 1200.5V1203.5L1033.5 1206.5L1031.5 1211L1031 1213.5L1029.5 1216L1028.5 1217L1026 1219L1024.5 1219.5L1023.5 1220.5L1019 1223L1016 1224L1014.5 1223H1011.5L1007.5 1222L1004.5 1220.5H1002L1000.5 1219L997.5 1217L996 1213.5L994 1209L992.5 1206.5V1204.5L991 1203.5L990 1200.5L990.5 1199L990 1197.5V1195L988 1191L987.5 1188.5L987 1186.5L985 1184.5V1186.5L985.5 1189.5V1192L986.5 1194.5L987 1197L987.5 1200.5L989 1203.5V1206.5L990 1209V1212.5L990.5 1214.5V1216L992 1218.5L994 1220L996.5 1221.5L998.5 1224L1002 1225L1004.5 1225.5L1006.5 1227L1009.5 1228L1011.5 1229H1014.5L1017.5 1228H1020.5L1023.5 1227L1028.5 1225.5L1029.5 1224L1032.5 1222H1035L1036.5 1220L1038 1217V1214.5L1039 1212.5L1038.5 1211.5L1039 1210V1208.5L1040 1206L1040.5 1203.5V1201.5L1041 1199.5L1042.5 1197L1043 1194V1191.5L1043.5 1189.5L1044 1187.5L1043.5 1186Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling"
            style={{
              visibility:
                !tooth41Diagnozis.culttab &&
                !tooth41Diagnozis.abutment &&
                !tooth41Diagnozis.implant &&
                !tooth41Diagnozis.shaper
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
                d="M1039.2,1201c0.1-0.4,0.2-0.7,0.3-1.1c3.6-11.3,6.2-23,7.7-34.8c1.5-12,1.8-24.2,0.9-36.3
                                c0.4-2.1-0.6-4.2-2.5-5.2c-0.8-0.4-1.6-0.6-2.5-0.5l-9.4-0.1v44.8C1033.7,1180.9,1032,1195.2,1039.2,1201z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth41.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth41.seal_right ? `seal-fill ${teethDiagnozis.tooth41.seal_right_color}` : ''}
                            `}
                d="M1039.2,1201c0.1-0.4,0.2-0.7,0.3-1.1c3.6-11.3,6.2-23,7.7-34.8c1.5-12,1.8-24.2,0.9-36.3
                                c0.4-2.1-0.6-4.2-2.5-5.2c-0.8-0.4-1.6-0.6-2.5-0.5l-9.4-0.1v44.8C1033.7,1180.9,1032,1195.2,1039.2,1201z"
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
                d="M984.8,1181.4c0.8,6.4,1.8,12.8,3.6,19c2.4-2,5.8-4.9,6.6-6.6c1.3-2.7,2.1-12.3,3.7-30.8
                                c1.2-13.4,2.2-31.4,2.7-40.3l-13.1-0.1c-1.5,0.4-2.8,1.3-3.8,2.5c-1.1,1.4-1.6,3.1-1.5,4.8
                                C982.1,1147.2,982.8,1164.4,984.8,1181.4z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth41.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth41.seal_left ? `seal-fill ${teethDiagnozis.tooth41.seal_left_color}` : ''}
                            `}
                d="M984.8,1181.4c0.8,6.4,1.8,12.8,3.6,19c2.4-2,5.8-4.9,6.6-6.6c1.3-2.7,2.1-12.3,3.7-30.8
                                c1.2-13.4,2.2-31.4,2.7-40.3l-13.1-0.1c-1.5,0.4-2.8,1.3-3.8,2.5c-1.1,1.4-1.6,3.1-1.5,4.8
                                C982.1,1147.2,982.8,1164.4,984.8,1181.4z"
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
                d="M988.4,1200.4c0.8,2.9,1.8,5.7,2.9,8.4c2.4,5.6,5.6,10.8,10.8,14.1c6.7,4.2,15.1,4.3,22,0.4
                                c8.1-4.6,12.1-13.4,15-22.3c-7.2-5.8-5.4-20.1-5.4-33.1v-44.8l-32.3-0.3c-0.5,8.9-1.5,26.9-2.7,40.3c-1.6,18.5-2.4,28.1-3.7,30.8
                                C994.3,1195.5,990.9,1198.4,988.4,1200.4z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth41.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth41.seal_center ? `seal-fill ${teethDiagnozis.tooth41.seal_center_color}` : ''}
                            `}
                d="M988.4,1200.4c0.8,2.9,1.8,5.7,2.9,8.4c2.4,5.6,5.6,10.8,10.8,14.1c6.7,4.2,15.1,4.3,22,0.4
                                c8.1-4.6,12.1-13.4,15-22.3c-7.2-5.8-5.4-20.1-5.4-33.1v-44.8l-32.3-0.3c-0.5,8.9-1.5,26.9-2.7,40.3c-1.6,18.5-2.4,28.1-3.7,30.8
                                C994.3,1195.5,990.9,1198.4,988.4,1200.4z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth41Diagnozis.seal_left &&
                      !tooth41Diagnozis.seal_top &&
                      !tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_left &&
                      tooth41Diagnozis.seal_top &&
                      !tooth41Diagnozis.seal_center) ||
                    (!tooth41Diagnozis.seal_left &&
                      tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M998.5 1164L1001 1128"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth41Diagnozis.seal_left &&
                      !tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center &&
                      tooth41Diagnozis.seal_left) ||
                    (!tooth41Diagnozis.seal_left &&
                      !tooth41Diagnozis.seal_bottom &&
                      tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M998.5 1164C997 1188 996.5 1191 993 1196.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth41Diagnozis.seal_right &&
                      tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_right &&
                      !tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1033.5 1165.5V1128.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth41Diagnozis.seal_right &&
                      !tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center) ||
                    (tooth41Diagnozis.seal_bottom &&
                      !tooth41Diagnozis.seal_center &&
                      tooth41Diagnozis.seal_right) ||
                    (!tooth41Diagnozis.seal_right &&
                      !tooth41Diagnozis.seal_bottom &&
                      tooth41Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1033.5 1165.5C1033.5 1182 1032.5 1190.5 1035.5 1196"
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
                visibility: tooth41Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth41Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1048.1 1128.9C1048.5 1126.8 1047.5 1124.7 1045.6 1123.7C1044.8 1123.3 1044 1123.1 1043.1 1123.2L1033.7 1123.1L1001.4 1122.8L988.3 1122.7C986.8 1123.1 985.5 1124 984.5 1125.2C983.4 1126.6 982.9 1128.3 983 1130C982 1147.1 982.6 1164.3 984.7 1181.4C985.5 1187.8 986.5 1194.2 988.3 1200.4C989.1 1203.3 990.1 1206.1 991.2 1208.8C993.6 1214.4 996.8 1219.6 1002 1222.9C1008.7 1227.1 1017.1 1227.2 1024 1223.3C1032.1 1218.7 1036.1 1209.9 1039 1201C1039.1 1200.6 1039.2 1200.3 1039.3 1199.9C1042.9 1188.6 1045.5 1176.9 1047 1165.1C1048.7 1153.1 1049 1141 1048.1 1128.9Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth41Diagnozis.temporary_crown ||
                tooth41Diagnozis.ceramic_crown ||
                tooth41Diagnozis.mceramic_crown ||
                tooth41Diagnozis.metalic_crown ||
                tooth41Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth41Diagnozis.temporary_crown ||
                tooth41Diagnozis.ceramic_crown ||
                tooth41Diagnozis.mceramic_crown ||
                tooth41Diagnozis.metalic_crown ||
                tooth41Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth41Diagnozis.ceramic_crown_color}
                                ${tooth41Diagnozis.mceramic_crown_color}
                                ${tooth41Diagnozis.metalic_crown_color}
                                ${tooth41Diagnozis.zirconia_crown_color}
                            `}
              d="M1048.1,1128.9c0.4-2.1-0.6-4.2-2.5-5.2c-0.8-0.4-1.6-0.6-2.5-0.5l-9.4-0.1l-32.3-0.3
                            l-13.1-0.1c-1.5,0.4-2.8,1.3-3.8,2.5c-1.1,1.4-1.6,3.1-1.5,4.8c-1,17.1-0.4,34.3,1.7,51.4c0.8,6.4,1.8,12.8,3.6,19
                            c0.8,2.9,1.8,5.7,2.9,8.4c2.4,5.6,5.6,10.8,10.8,14.1c6.7,4.2,15.1,4.3,22,0.4c8.1-4.6,12.1-13.4,15-22.3c0.1-0.4,0.2-0.7,0.3-1.1
                            c3.6-11.3,6.2-23,7.7-34.8C1048.7,1153.1,1049,1141,1048.1,1128.9z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
