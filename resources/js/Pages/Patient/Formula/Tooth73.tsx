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
import setupDiagnoze from '../../../lib/tfunctions';
import PeriodontitStage73 from './periodontit73';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth73() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth73Diagnozis = teethDiagnozis.tooth73;
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
        teethDiagnozis.tooth73.caries_bottom =
          !teethDiagnozis.tooth73.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth73.caries_center =
          !teethDiagnozis.tooth73.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth73.caries_left =
          !teethDiagnozis.tooth73.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth73.caries_right =
          !teethDiagnozis.tooth73.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth73.caries_top = !teethDiagnozis.tooth73.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth73.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth73.seal_center_color = sealColor1;
          teethDiagnozis.tooth73.seal_center = true;
        } else if (
          teethDiagnozis.tooth73.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth73.seal_center_color = sealColor2;
          teethDiagnozis.tooth73.seal_center = true;
        } else if (
          teethDiagnozis.tooth73.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth73.seal_center_color = sealColor3;
          teethDiagnozis.tooth73.seal_center = true;
        } else {
          teethDiagnozis.tooth73.seal_center =
            !teethDiagnozis.tooth73.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth73.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth73.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth73.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth73.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth73.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth73.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth73.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth73.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth73.seal_bottom = true;
        } else {
          teethDiagnozis.tooth73.seal_bottom =
            !teethDiagnozis.tooth73.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth73.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth73.seal_left_color = sealColor1;
          teethDiagnozis.tooth73.seal_left = true;
        } else if (
          teethDiagnozis.tooth73.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth73.seal_left_color = sealColor2;
          teethDiagnozis.tooth73.seal_left = true;
        } else if (
          teethDiagnozis.tooth73.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth73.seal_left_color = sealColor3;
          teethDiagnozis.tooth73.seal_left = true;
        } else {
          teethDiagnozis.tooth73.seal_left = !teethDiagnozis.tooth73.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth73.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth73.seal_right_color = sealColor1;
          teethDiagnozis.tooth73.seal_right = true;
        } else if (
          teethDiagnozis.tooth73.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth73.seal_right_color = sealColor2;
          teethDiagnozis.tooth73.seal_right = true;
        } else if (
          teethDiagnozis.tooth73.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth73.seal_right_color = sealColor3;
          teethDiagnozis.tooth73.seal_right = true;
        } else {
          teethDiagnozis.tooth73.seal_right =
            !teethDiagnozis.tooth73.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth73.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth73.seal_top_color = sealColor1;
          teethDiagnozis.tooth73.seal_top = true;
        } else if (
          teethDiagnozis.tooth73.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth73.seal_top_color = sealColor2;
          teethDiagnozis.tooth73.seal_top = true;
        } else if (
          teethDiagnozis.tooth73.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth73.seal_top_color = sealColor3;
          teethDiagnozis.tooth73.seal_top = true;
        } else {
          teethDiagnozis.tooth73.seal_top = !teethDiagnozis.tooth73.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth73.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth73.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth73.wedge_shaped_defect_color =
          !teethDiagnozis.tooth73.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth73.show &&
        !teethDiagnozis.tooth33.show
      ) {
        document.getElementById('TH-73').classList.add('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth73.show &&
        teethDiagnozis.tooth33.show
      ) {
        document.getElementById('TH-73').classList.add('f-tooth-active');
        document.getElementById('TH-33').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-73').classList.remove('f-tooth-active');
        document.getElementById('TH-33').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth73.show &&
        !teethDiagnozis.tooth33.show
      ) {
        document.getElementById('TH-73').classList.remove('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth73.show &&
        teethDiagnozis.tooth33.show
      ) {
        document.getElementById('TH-73').classList.remove('f-tooth-active');
        document.getElementById('TH-33').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth33.show) {
        document.getElementById('TH-73').classList.add('f-tooth-active');
        document.getElementById('TH-33').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth73.show) {
        document.getElementById('TH-73').classList.remove('f-tooth-active');
        document.getElementById('TH-33').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth33.show) {
        document.getElementById('TH-33').classList.add('f-tooth-active');
        document.getElementById('TH-73').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="73"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1205 842)"
          className={`st3 st4 st5 ${selectedTooth === 73 ? 'num-active' : ''}`}
        >
          73
        </text>
      </g>
      <g
        id="TH-73"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth73.show || allTeeth) && !teethDiagnozis.tooth73.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth73.show = !teethDiagnozis.tooth73.show;
            teethDiagnozis.tooth33.show = false;
          }

          dispatch(setSelectedToothNumber(73));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              73,
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
          className={`underlay ${selectedTooth === 73 ? 'selected' : ''}`}
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
            d="M1195,1239.9c0,0,5,56,6,71s7,66,11,75s12,28,30,27s26-16,26-34s-3-62-5-81
                        s1-75,3-87s6-36,6-52c0-31-29-61-28-89s26.2-45.3,27.1-78.2c0.9-32.8-3.1-144.8-4.1-169.8s-18-41-39-42s-38,17-40,52s-7,151-7,158
                        c0,29,22,50,24,73s-23,38-23,94C1182,1196.9,1193,1220.9,1195,1239.9z"
          ></path>
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 20, 11)',
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
                  !tooth73Diagnozis.culttab &&
                  !tooth73Diagnozis.implant &&
                  !tooth73Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st6 change-color ${tooth73Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth73Diagnozis?.apex ? 'apex' : ''}`}
                d="M1261.6,978.6c2.3,5.4,1.3,11-1.6,16.1c-2.4,4.2-6.2,7.9-10.1,11.2
                                c-6.5,5.4-14.2,10.3-23.3,10.2c-3.9,0-7.7-1-11.1-2.5c-4-1.7-7.6-3.9-11.1-6.3c-5.5-3.7-11-7.7-12.9-13.4
                                c-1.1-3.3-0.9-6.8,0.2-10.2c2.6-7.8,9.4-13.9,14.1-20.9c1.7-2.6,3.2-5.3,5.1-7.9c3.4-4.5,8.6-8.3,15.1-8.9
                                c4.2-0.4,8.3,0.6,11.6,2.6c3.4,2,5.8,4.9,7.9,7.8c2.5,3.6,4.5,7.3,7.3,10.8C1255.8,971,1259.8,974.2,1261.6,978.6z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth73Diagnozis?.apex || tooth73Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st6 change-color ${tooth73Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth73Diagnozis?.apex ? 'apex' : ''}`}
                d="M1261.6 978.6C1263.9 984 1262.9 989.6 1260 994.7C1257.6 998.9 1253.8 1002.6 1249.9 1005.9C1243.4 1011.3 1235.7 1016.2 1226.6 1016.1C1222.7 1016.1 1218.9 1015.1 1215.5 1013.6C1211.5 1011.9 1207.9 1009.7 1204.4 1007.3C1198.9 1003.6 1193.4 999.6 1191.5 993.9C1190.4 990.6 1190.6 987.1 1191.7 983.7C1194.3 975.9 1201.1 969.8 1205.8 962.8C1207.5 960.2 1209 957.5 1210.9 954.9C1214.3 950.4 1219.5 946.6 1226 946C1230.2 945.6 1234.3 946.6 1237.6 948.6C1241 950.6 1243.4 953.5 1245.5 956.4C1248 960 1250 963.7 1252.8 967.2C1255.8 971 1259.8 974.2 1261.6 978.6Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth73Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g>
              <path
                className="st22 target"
                style={{ fill: '#e80808' }}
                d="M1225.22 972.254C1228.84 972.146 1233.85 975.618 1234.03 981.716C1234.22 987.814 1229.5 994.23 1225.88 994.338C1222.25 994.446 1218.51 989.61 1218.33 983.512C1218.15 977.413 1221.59 972.362 1225.22 972.254Z"
              />
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth73Diagnozis.implant || tooth73Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1225.5" cy="983.5" r="20.5"></circle>
            <g className="st27">
              <mask id="implant_73" className="st49">
                <path
                  className="st50"
                  d="M1214.87 970.971L1212.18 970.093C1209.89 972.398 1208.18 975.286 1207.31 978.515L1209.42 980.412C1209.23 981.412 1209.13 982.444 1209.13 983.5C1209.13 984.555 1209.23 985.588 1209.42 986.588L1207.31 988.484C1208.18 991.713 1209.89 994.602 1212.18 996.906L1214.87 996.029C1216.43 997.371 1218.24 998.428 1220.22 999.119L1220.8 1001.89C1222.36 1002.3 1223.99 1002.52 1225.67 1002.52C1227.35 1002.52 1228.98 1002.3 1230.53 1001.89L1231.12 999.118C1233.1 998.427 1234.91 997.37 1236.46 996.028L1239.16 996.906C1241.45 994.601 1243.15 991.712 1244.03 988.483L1241.92 986.587C1242.11 985.587 1242.21 984.555 1242.21 983.5C1242.21 982.445 1242.11 981.413 1241.92 980.413L1244.03 978.517C1243.15 975.287 1241.45 972.399 1239.16 970.094L1236.46 970.971C1234.91 969.629 1233.1 968.572 1231.12 967.881L1230.53 965.108C1228.98 964.699 1227.35 964.48 1225.67 964.48C1223.99 964.48 1222.36 964.698 1220.8 965.108L1220.22 967.88C1218.24 968.571 1216.43 969.629 1214.87 970.971Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1214.87 970.971L1212.18 970.093C1209.89 972.398 1208.18 975.286 1207.31 978.515L1209.42 980.412C1209.23 981.412 1209.13 982.444 1209.13 983.5C1209.13 984.555 1209.23 985.588 1209.42 986.588L1207.31 988.484C1208.18 991.713 1209.89 994.602 1212.18 996.906L1214.87 996.029C1216.43 997.371 1218.24 998.428 1220.22 999.119L1220.8 1001.89C1222.36 1002.3 1223.99 1002.52 1225.67 1002.52C1227.35 1002.52 1228.98 1002.3 1230.53 1001.89L1231.12 999.118C1233.1 998.427 1234.91 997.37 1236.46 996.028L1239.16 996.906C1241.45 994.601 1243.15 991.712 1244.03 988.483L1241.92 986.587C1242.11 985.587 1242.21 984.555 1242.21 983.5C1242.21 982.445 1242.11 981.413 1241.92 980.413L1244.03 978.517C1243.15 975.287 1241.45 972.399 1239.16 970.094L1236.46 970.971C1234.91 969.629 1233.1 968.572 1231.12 967.881L1230.53 965.108C1228.98 964.699 1227.35 964.48 1225.67 964.48C1223.99 964.48 1222.36 964.698 1220.8 965.108L1220.22 967.88C1218.24 968.571 1216.43 969.629 1214.87 970.971Z"
              ></path>
              <path
                className="st52"
                d="M1212.18 970.093L1212.8 968.192L1211.63 967.81L1210.76 968.683L1212.18 970.093ZM1214.87 970.971L1214.25 972.872L1215.32 973.221L1216.18 972.485L1214.87 970.971ZM1207.31 978.515L1205.38 977.992L1205.06 979.18L1205.97 980.002L1207.31 978.515ZM1209.42 980.412L1211.38 980.783L1211.59 979.677L1210.75 978.924L1209.42 980.412ZM1209.42 986.588L1210.75 988.075L1211.59 987.323L1211.38 986.217L1209.42 986.588ZM1207.31 988.484L1205.97 986.997L1205.06 987.82L1205.38 989.007L1207.31 988.484ZM1212.18 996.906L1210.76 998.316L1211.63 999.189L1212.8 998.808L1212.18 996.906ZM1214.87 996.029L1216.18 994.514L1215.32 993.778L1214.25 994.127L1214.87 996.029ZM1220.22 999.119L1222.17 998.705L1221.94 997.602L1220.88 997.231L1220.22 999.119ZM1220.8 1001.89L1218.85 1002.31L1219.1 1003.51L1220.29 1003.83L1220.8 1001.89ZM1230.53 1001.89L1231.04 1003.82L1232.23 1003.51L1232.49 1002.31L1230.53 1001.89ZM1231.12 999.118L1230.46 997.23L1229.4 997.602L1229.16 998.704L1231.12 999.118ZM1236.46 996.028L1237.08 994.127L1236.01 993.778L1235.16 994.514L1236.46 996.028ZM1239.16 996.906L1238.54 998.808L1239.71 999.189L1240.58 998.316L1239.16 996.906ZM1244.03 988.483L1245.96 989.006L1246.28 987.818L1245.36 986.996L1244.03 988.483ZM1241.92 986.587L1239.95 986.216L1239.74 987.321L1240.58 988.074L1241.92 986.587ZM1241.92 980.413L1240.58 978.926L1239.74 979.678L1239.95 980.784L1241.92 980.413ZM1244.03 978.517L1245.36 980.004L1246.28 979.181L1245.96 977.994L1244.03 978.517ZM1239.16 970.094L1240.58 968.684L1239.71 967.811L1238.54 968.192L1239.16 970.094ZM1236.46 970.971L1235.16 972.486L1236.01 973.222L1237.08 972.873L1236.46 970.971ZM1231.12 967.881L1229.16 968.296L1229.4 969.398L1230.46 969.769L1231.12 967.881ZM1230.53 965.108L1232.49 964.694L1232.23 963.489L1231.04 963.174L1230.53 965.108ZM1220.8 965.108L1220.29 963.174L1219.1 963.488L1218.85 964.693L1220.8 965.108ZM1220.22 967.88L1220.88 969.769L1221.94 969.397L1222.17 968.295L1220.22 967.88ZM1211.56 971.995L1214.25 972.872L1215.49 969.069L1212.8 968.192L1211.56 971.995ZM1209.24 979.038C1210.02 976.152 1211.54 973.567 1213.6 971.503L1210.76 968.683C1208.23 971.228 1206.34 974.42 1205.38 977.992L1209.24 979.038ZM1210.75 978.924L1208.64 977.028L1205.97 980.002L1208.08 981.899L1210.75 978.924ZM1211.13 983.5C1211.13 982.57 1211.22 981.661 1211.38 980.783L1207.45 980.04C1207.24 981.163 1207.13 982.319 1207.13 983.5H1211.13ZM1211.38 986.217C1211.22 985.338 1211.13 984.43 1211.13 983.5H1207.13C1207.13 984.68 1207.24 985.837 1207.45 986.959L1211.38 986.217ZM1208.65 989.971L1210.75 988.075L1208.08 985.101L1205.97 986.997L1208.65 989.971ZM1213.6 995.496C1211.54 993.432 1210.02 990.847 1209.24 987.961L1205.38 989.007C1206.34 992.579 1208.23 995.771 1210.76 998.316L1213.6 995.496ZM1214.25 994.127L1211.56 995.005L1212.8 998.808L1215.49 997.931L1214.25 994.127ZM1220.88 997.231C1219.14 996.624 1217.55 995.695 1216.18 994.514L1213.56 997.543C1215.31 999.047 1217.34 1000.23 1219.56 1001.01L1220.88 997.231ZM1222.76 1001.48L1222.17 998.705L1218.26 999.534L1218.85 1002.31L1222.76 1001.48ZM1225.67 1000.52C1224.16 1000.52 1222.7 1000.32 1221.31 999.958L1220.29 1003.83C1222.01 1004.28 1223.81 1004.52 1225.67 1004.52V1000.52ZM1230.02 999.957C1228.63 1000.32 1227.17 1000.52 1225.67 1000.52V1004.52C1227.52 1004.52 1229.32 1004.28 1231.04 1003.82L1230.02 999.957ZM1229.16 998.704L1228.58 1001.48L1232.49 1002.31L1233.08 999.533L1229.16 998.704ZM1235.16 994.514C1233.79 995.695 1232.2 996.623 1230.46 997.23L1231.78 1001.01C1234 1000.23 1236.03 999.046 1237.77 997.543L1235.16 994.514ZM1239.78 995.004L1237.08 994.127L1235.84 997.93L1238.54 998.808L1239.78 995.004ZM1242.1 987.96C1241.31 990.847 1239.79 993.431 1237.74 995.496L1240.58 998.316C1243.11 995.77 1244.99 992.578 1245.96 989.006L1242.1 987.96ZM1240.58 988.074L1242.69 989.97L1245.36 986.996L1243.26 985.099L1240.58 988.074ZM1240.21 983.5C1240.21 984.43 1240.12 985.337 1239.95 986.216L1243.88 986.958C1244.1 985.836 1244.21 984.68 1244.21 983.5H1240.21ZM1239.95 980.784C1240.12 981.662 1240.21 982.57 1240.21 983.5H1244.21C1244.21 982.32 1244.1 981.164 1243.88 980.042L1239.95 980.784ZM1242.69 977.029L1240.58 978.926L1243.26 981.9L1245.36 980.004L1242.69 977.029ZM1237.74 971.503C1239.79 973.568 1241.31 976.153 1242.1 979.039L1245.96 977.994C1244.99 974.421 1243.11 971.229 1240.58 968.684L1237.74 971.503ZM1237.08 972.873L1239.78 971.995L1238.54 968.192L1235.84 969.069L1237.08 972.873ZM1230.46 969.769C1232.2 970.376 1233.79 971.305 1235.16 972.486L1237.77 969.457C1236.03 967.954 1234 966.768 1231.78 965.993L1230.46 969.769ZM1228.58 965.523L1229.16 968.296L1233.08 967.467L1232.49 964.694L1228.58 965.523ZM1225.67 966.48C1227.17 966.48 1228.63 966.676 1230.02 967.042L1231.04 963.174C1229.32 962.721 1227.52 962.48 1225.67 962.48V966.48ZM1221.31 967.042C1222.7 966.676 1224.16 966.48 1225.67 966.48V962.48C1223.81 962.48 1222.01 962.721 1220.29 963.174L1221.31 967.042ZM1222.17 968.295L1222.76 965.522L1218.85 964.693L1218.26 967.466L1222.17 968.295ZM1216.18 972.485C1217.55 971.304 1219.14 970.376 1220.88 969.769L1219.56 965.992C1217.34 966.767 1215.31 967.953 1213.56 969.456L1216.18 972.485Z"
                mask="url(#implant_73)"
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
              r="22.5"
              transform="matrix(-1 0 0 1 1225.5 983.5)"
            ></circle>
            <path
              className="st45"
              d="M1227.42 974.739C1226.87 972.804 1224.13 972.804 1223.58 974.739L1223.07 976.511C1222.77 977.549 1221.71 978.164 1220.66 977.902L1218.87 977.454C1216.92 976.965 1215.55 979.339 1216.95 980.785L1218.23 982.109C1218.98 982.884 1218.98 984.116 1218.23 984.891L1216.95 986.215C1215.55 987.661 1216.92 990.035 1218.87 989.546L1220.66 989.098C1221.71 988.836 1222.77 989.451 1223.07 990.489L1223.58 992.261C1224.13 994.196 1226.87 994.196 1227.42 992.261L1227.93 990.489C1228.23 989.451 1229.29 988.836 1230.34 989.098L1232.13 989.546C1234.08 990.035 1235.45 987.661 1234.05 986.215L1232.77 984.891C1232.02 984.116 1232.02 982.884 1232.77 982.109L1234.05 980.785C1235.45 979.339 1234.08 976.965 1232.13 977.454L1230.34 977.902C1229.29 978.164 1228.23 977.549 1227.93 976.511L1227.42 974.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth73Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth73Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1226.96 1015.1L1226.97 1015.1C1235.7 1015.2 1243.16 1010.5 1249.62 1005.13C1253.5 1001.85 1257.18 998.246 1259.49 994.204C1262.29 989.292 1263.19 984.026 1261.04 978.994C1260.15 976.938 1258.79 975.131 1257.22 973.331C1256.68 972.707 1256.1 972.071 1255.51 971.424C1254.45 970.257 1253.35 969.055 1252.38 967.822C1250.95 966.031 1249.73 964.197 1248.56 962.377C1248.27 961.927 1247.98 961.479 1247.7 961.033C1246.83 959.667 1245.98 958.318 1245.05 956.979C1242.97 954.108 1240.67 951.352 1237.46 949.462L1237.46 949.462L1237.44 949.455C1234.33 947.566 1230.44 946.616 1226.46 946.996L1226.45 946.996C1220.31 947.563 1215.34 951.161 1212.07 955.496C1210.87 957.128 1209.87 958.761 1208.84 960.421C1208.25 961.386 1207.65 962.36 1207 963.347L1207 963.347L1206.99 963.357C1205.39 965.749 1203.52 968.064 1201.69 970.335C1200.81 971.419 1199.94 972.494 1199.12 973.562C1196.52 976.914 1194.26 980.279 1193.01 984.012C1191.96 987.255 1191.79 990.53 1192.81 993.584C1194.59 998.909 1199.77 1002.74 1205.32 1006.47L1205.32 1006.47L1205.33 1006.48C1208.8 1008.86 1212.34 1011.02 1216.25 1012.68L1216.25 1012.68L1216.27 1012.69C1219.57 1014.14 1223.23 1015.1 1226.96 1015.1Z"
            ></path>
            <path
              className="st47"
              d="M1226.72 1003V1003L1226.73 1003C1232.29 1003.06 1237.07 1000.05 1241.26 996.55C1243.78 994.406 1246.15 992.074 1247.62 989.481C1249.41 986.325 1249.96 982.988 1248.62 979.815C1248.06 978.516 1247.19 977.364 1246.18 976.193C1245.84 975.797 1245.46 975.386 1245.08 974.965C1244.38 974.193 1243.66 973.387 1243.01 972.571C1242.07 971.383 1241.27 970.169 1240.5 968.974C1240.31 968.677 1240.13 968.381 1239.94 968.088C1239.38 967.195 1238.82 966.32 1238.22 965.449C1236.87 963.578 1235.41 961.822 1233.38 960.622L1233.38 960.622L1233.37 960.615C1231.4 959.416 1228.95 958.811 1226.42 959.052L1226.42 959.053C1222.54 959.413 1219.39 961.699 1217.29 964.484C1216.52 965.544 1215.88 966.592 1215.22 967.67C1214.83 968.304 1214.43 968.949 1214 969.613L1214 969.613L1213.99 969.623C1212.94 971.203 1211.7 972.741 1210.5 974.236C1209.93 974.944 1209.37 975.641 1208.84 976.329C1207.16 978.518 1205.71 980.686 1204.92 983.075C1204.25 985.147 1204.15 987.217 1204.79 989.135C1205.9 992.497 1209.17 994.944 1212.81 997.403L1212.81 997.403L1212.82 997.408C1215.07 998.963 1217.36 1000.36 1219.88 1001.44L1219.88 1001.44L1219.89 1001.45C1222.01 1002.39 1224.35 1003 1226.72 1003Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1225.36 983)"
            ></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth73Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1226.96 1015.1L1226.97 1015.1C1235.69 1015.2 1243.16 1010.5 1249.61 1005.13C1253.49 1001.85 1257.18 998.246 1259.49 994.204C1262.28 989.292 1263.18 984.026 1261.04 978.994C1260.15 976.938 1258.78 975.131 1257.21 973.331C1256.67 972.707 1256.09 972.071 1255.5 971.424C1254.44 970.257 1253.35 969.055 1252.37 967.822C1250.94 966.031 1249.72 964.197 1248.55 962.377C1248.26 961.927 1247.98 961.479 1247.7 961.033C1246.83 959.667 1245.97 958.318 1245.04 956.979C1242.96 954.108 1240.66 951.352 1237.45 949.462L1237.45 949.462L1237.44 949.455C1234.32 947.566 1230.44 946.616 1226.45 946.996L1226.45 946.996C1220.3 947.563 1215.34 951.161 1212.06 955.496C1210.87 957.128 1209.86 958.761 1208.84 960.421C1208.24 961.386 1207.64 962.36 1206.99 963.347L1206.99 963.347L1206.99 963.357C1205.38 965.749 1203.51 968.064 1201.68 970.335C1200.8 971.419 1199.94 972.494 1199.11 973.562C1196.52 976.914 1194.25 980.279 1193.01 984.012C1191.96 987.255 1191.79 990.53 1192.81 993.584C1194.58 998.909 1199.76 1002.74 1205.32 1006.47L1205.32 1006.47L1205.32 1006.48C1208.8 1008.86 1212.33 1011.02 1216.25 1012.68L1216.25 1012.68L1216.26 1012.69C1219.56 1014.14 1223.23 1015.1 1226.96 1015.1Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1226.71 1003V1003L1226.73 1003C1232.28 1003.06 1237.06 1000.05 1241.26 996.55C1243.78 994.406 1246.14 992.074 1247.62 989.481C1249.4 986.325 1249.95 982.988 1248.61 979.815C1248.05 978.516 1247.19 977.364 1246.17 976.193C1245.83 975.797 1245.46 975.386 1245.08 974.965C1244.38 974.193 1243.65 973.387 1243.01 972.571C1242.06 971.383 1241.26 970.169 1240.5 968.974C1240.31 968.677 1240.12 968.381 1239.94 968.088C1239.37 967.195 1238.82 966.32 1238.22 965.449C1236.87 963.578 1235.4 961.822 1233.38 960.622L1233.38 960.622L1233.36 960.615C1231.4 959.416 1228.94 958.811 1226.42 959.052L1226.42 959.053C1222.53 959.413 1219.38 961.699 1217.28 964.484C1216.51 965.544 1215.87 966.592 1215.21 967.67C1214.82 968.304 1214.43 968.949 1213.99 969.613L1213.99 969.613L1213.99 969.623C1212.93 971.203 1211.7 972.741 1210.5 974.236C1209.93 974.944 1209.37 975.641 1208.84 976.329C1207.15 978.518 1205.71 980.686 1204.91 983.075C1204.25 985.147 1204.15 987.217 1204.78 989.135C1205.9 992.497 1209.17 994.944 1212.8 997.403L1212.8 997.403L1212.81 997.408C1215.07 998.963 1217.35 1000.36 1219.87 1001.44L1219.87 1001.44L1219.88 1001.45C1222 1002.39 1224.34 1003 1226.71 1003Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1225.36 983)"
              style={{ fill: 'black', opacity: tooth73Diagnozis.pin ? 1 : 0 }}
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth73Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth73Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1226.96 1015.1L1226.97 1015.1C1235.7 1015.2 1243.16 1010.5 1249.62 1005.13C1253.5 1001.85 1257.18 998.246 1259.49 994.204C1262.29 989.292 1263.19 984.026 1261.04 978.994C1260.15 976.938 1258.79 975.131 1257.22 973.331C1256.68 972.707 1256.1 972.071 1255.51 971.424C1254.45 970.257 1253.35 969.055 1252.38 967.822C1250.95 966.031 1249.73 964.197 1248.56 962.377C1248.27 961.927 1247.98 961.479 1247.7 961.033C1246.83 959.667 1245.98 958.318 1245.05 956.979C1242.97 954.108 1240.67 951.352 1237.46 949.462L1237.46 949.462L1237.44 949.455C1234.33 947.566 1230.44 946.616 1226.46 946.996L1226.45 946.996C1220.31 947.563 1215.34 951.161 1212.07 955.496C1210.87 957.128 1209.87 958.761 1208.84 960.421C1208.25 961.386 1207.65 962.36 1207 963.347L1207 963.347L1206.99 963.357C1205.39 965.749 1203.52 968.064 1201.69 970.335C1200.81 971.419 1199.94 972.494 1199.12 973.562C1196.52 976.914 1194.26 980.279 1193.01 984.012C1191.96 987.255 1191.79 990.53 1192.81 993.584C1194.59 998.909 1199.77 1002.74 1205.32 1006.47L1205.32 1006.47L1205.33 1006.48C1208.8 1008.86 1212.34 1011.02 1216.25 1012.68L1216.25 1012.68L1216.27 1012.69C1219.57 1014.14 1223.23 1015.1 1226.96 1015.1Z"
            ></path>
            <path
              className="st47"
              d="M1226.72 1003V1003L1226.73 1003C1232.29 1003.06 1237.07 1000.05 1241.26 996.55C1243.78 994.406 1246.15 992.074 1247.62 989.481C1249.41 986.325 1249.96 982.988 1248.62 979.815C1248.06 978.516 1247.19 977.364 1246.18 976.193C1245.84 975.797 1245.46 975.386 1245.08 974.965C1244.38 974.193 1243.66 973.387 1243.01 972.571C1242.07 971.383 1241.27 970.169 1240.5 968.974C1240.31 968.677 1240.13 968.381 1239.94 968.088C1239.38 967.195 1238.82 966.32 1238.22 965.449C1236.87 963.578 1235.41 961.822 1233.38 960.622L1233.38 960.622L1233.37 960.615C1231.4 959.416 1228.95 958.811 1226.42 959.052L1226.42 959.053C1222.54 959.413 1219.39 961.699 1217.29 964.484C1216.52 965.544 1215.88 966.592 1215.22 967.67C1214.83 968.304 1214.43 968.949 1214 969.613L1214 969.613L1213.99 969.623C1212.94 971.203 1211.7 972.741 1210.5 974.236C1209.93 974.944 1209.37 975.641 1208.84 976.329C1207.16 978.518 1205.71 980.686 1204.92 983.075C1204.25 985.147 1204.15 987.217 1204.79 989.135C1205.9 992.497 1209.17 994.944 1212.81 997.403L1212.81 997.403L1212.82 997.408C1215.07 998.963 1217.36 1000.36 1219.88 1001.44L1219.88 1001.44L1219.89 1001.45C1222.01 1002.39 1224.35 1003 1226.72 1003Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth73Diagnozis.culttab &&
                !tooth73Diagnozis.abutment &&
                !tooth73Diagnozis.implant &&
                !tooth73Diagnozis.apex &&
                !tooth73Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1269.3,976.6c-2.3-6.5-7.3-11.4-11-16.9c-1.1-1.7-2.2-3.4-3.2-5.2c-2-3.6-3.9-7.3-6-10.9
                            c-2.6-4.4-5.6-8.7-9.9-11.7c-4.2-2.9-9.2-4.5-14.4-3.9c-8.1,0.8-14.4,6.4-18.7,13.1c-2.4,3.7-4.2,7.8-6.3,11.6
                            c-0.2,0.4-0.5,0.9-0.7,1.3c-5.7,9.9-13.6,18.6-16.6,29.7c-1.3,5-1.6,10.2-0.2,15.1c1,3.3,2.6,6.2,4.6,8.9
                            c3.2,4.2,7.3,7.7,11.5,11.1c4.4,3.5,8.8,6.9,13.8,9.4c4.3,2.2,9,3.7,13.9,3.8c11.3,0.2,20.9-7,28.9-15c1.7-1.7,3.3-3.4,4.9-5.3
                            c2.9-3.5,5.6-7.2,7.5-11.3C1271,993,1272.2,984.7,1269.3,976.6z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth73.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1226.09 1037C1221.2 1037 1216.43 1036.7 1212.16 1034.29C1209.4 1032.78 1205.67 1031.03 1203.15 1029.11C1201.09 1027.55 1200.2 1024.56 1198.23 1022.82C1194.6 1019.68 1190.96 1019.04 1187.99 1015.3C1185.31 1011.94 1182.05 1005.58 1180.92 1001.23C1179.54 995.912 1179.79 990.273 1181.17 984.795C1182.24 980.695 1182.74 976.886 1184.66 973.223C1186.79 969.144 1190.39 965.246 1192.85 961.328C1194.95 957.981 1197.04 954.62 1198.87 951.119C1201 946.93 1201.77 942.58 1204.15 938.39C1205.24 936.536 1205.68 934.755 1207.35 933.115C1208.84 931.66 1211.53 930.316 1212.96 929.13C1214.34 927.991 1216 926.997 1217.79 926.192C1220.23 925.089 1222.9 924.339 1225.34 924.05C1228.19 923.702 1231 925.327 1233.63 926.192C1235.88 926.93 1237.99 926.756 1239.9 928.239C1241.75 929.633 1243.36 931.297 1244.8 933.115C1246.7 935.503 1249.44 938.155 1250.93 940.807C1252.38 943.485 1252.58 946.197 1253.92 948.895C1255.49 952.043 1258.2 955.173 1260.1 958.209C1261.93 961.193 1262.95 963.947 1264.91 966.808C1266.98 969.817 1269.98 972.943 1271.14 976.577C1272.58 980.905 1271.87 985.313 1271.47 989.661C1271.07 994.055 1270.96 999.704 1269.13 1003.83C1267.53 1007.44 1264.31 1010.82 1261.95 1013.99C1259.89 1016.77 1258.74 1020.71 1256.46 1023.19C1253.68 1026.15 1249.61 1026.39 1246.48 1028.88C1243.65 1031.12 1240.67 1033.06 1237.54 1034.48C1233.94 1036.11 1230.12 1037.06 1226.09 1037ZM1260 994.701C1262.9 989.601 1263.9 984.001 1261.6 978.601C1259.8 974.201 1255.8 971.001 1252.8 967.201C1250 963.701 1248 960.001 1245.5 956.401C1243.4 953.501 1241 950.601 1237.6 948.601C1234.3 946.601 1230.2 945.601 1226 946.001C1219.5 946.601 1214.3 950.401 1210.9 954.901C1209 957.501 1207.5 960.201 1205.8 962.801C1201.1 969.801 1194.3 975.901 1191.7 983.701C1190.6 987.101 1190.4 990.601 1191.5 993.901C1193.4 999.601 1198.9 1003.6 1204.4 1007.3C1207.9 1009.7 1211.5 1011.9 1215.5 1013.6C1218.9 1015.1 1222.7 1016.1 1226.6 1016.1C1235.7 1016.2 1243.4 1011.3 1249.9 1005.9C1253.8 1002.6 1257.6 998.901 1260 994.701Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1226.09 1037C1221.2 1037 1216.43 1036.7 1212.16 1034.29C1209.4 1032.78 1205.67 1031.03 1203.15 1029.11C1201.09 1027.55 1200.2 1024.56 1198.23 1022.82C1194.6 1019.68 1190.96 1019.04 1187.99 1015.3C1185.31 1011.94 1182.05 1005.58 1180.92 1001.23C1179.54 995.912 1179.79 990.273 1181.17 984.795C1182.24 980.695 1182.74 976.886 1184.66 973.223C1186.79 969.144 1190.39 965.246 1192.85 961.328C1194.95 957.981 1197.04 954.62 1198.87 951.119C1201 946.93 1201.77 942.58 1204.15 938.39C1205.24 936.536 1205.68 934.755 1207.35 933.115C1208.84 931.66 1211.53 930.316 1212.96 929.13C1214.34 927.991 1216 926.997 1217.79 926.192C1220.23 925.089 1222.9 924.339 1225.34 924.05C1228.19 923.702 1231 925.327 1233.63 926.192C1235.88 926.93 1237.99 926.756 1239.9 928.239C1241.75 929.633 1243.36 931.297 1244.8 933.115C1246.7 935.503 1249.44 938.155 1250.93 940.807C1252.38 943.485 1252.58 946.197 1253.92 948.895C1255.49 952.043 1258.2 955.173 1260.1 958.209C1261.93 961.193 1262.95 963.947 1264.91 966.808C1266.98 969.817 1269.98 972.943 1271.14 976.577C1272.58 980.905 1271.87 985.313 1271.47 989.661C1271.07 994.055 1270.96 999.704 1269.13 1003.83C1267.53 1007.44 1264.31 1010.82 1261.95 1013.99C1259.89 1016.77 1258.74 1020.71 1256.46 1023.19C1253.68 1026.15 1249.61 1026.39 1246.48 1028.88C1243.65 1031.12 1240.67 1033.06 1237.54 1034.48C1233.94 1036.11 1230.12 1037.06 1226.09 1037ZM1260 994.701C1262.9 989.601 1263.9 984.001 1261.6 978.601C1259.8 974.201 1255.8 971.001 1252.8 967.201C1250 963.701 1248 960.001 1245.5 956.401C1243.4 953.501 1241 950.601 1237.6 948.601C1234.3 946.601 1230.2 945.601 1226 946.001C1219.5 946.601 1214.3 950.401 1210.9 954.901C1209 957.501 1207.5 960.201 1205.8 962.801C1201.1 969.801 1194.3 975.901 1191.7 983.701C1190.6 987.101 1190.4 990.601 1191.5 993.901C1193.4 999.601 1198.9 1003.6 1204.4 1007.3C1207.9 1009.7 1211.5 1011.9 1215.5 1013.6C1218.9 1015.1 1222.7 1016.1 1226.6 1016.1C1235.7 1016.2 1243.4 1011.3 1249.9 1005.9C1253.8 1002.6 1257.6 998.901 1260 994.701Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1226.25 1024C1221.87 1024 1217.6 1023.77 1213.78 1021.94C1211.31 1020.79 1207.97 1019.46 1205.72 1018C1203.87 1016.81 1203.08 1014.54 1201.31 1013.22C1198.06 1010.83 1194.81 1010.34 1192.15 1007.5C1189.75 1004.95 1186.83 1000.1 1185.82 996.798C1184.59 992.754 1184.81 988.466 1186.05 984.3C1187 981.182 1187.45 978.286 1189.17 975.5C1191.07 972.398 1194.3 969.434 1196.5 966.455C1198.38 963.91 1200.25 961.354 1201.89 958.691C1203.8 955.506 1204.48 952.198 1206.62 949.012C1207.59 947.602 1207.98 946.247 1209.48 945.001C1210.81 943.894 1213.22 942.872 1214.5 941.97C1215.73 941.103 1217.22 940.348 1218.82 939.736C1221.01 938.897 1223.4 938.327 1225.58 938.107C1228.13 937.842 1230.64 939.078 1233 939.736C1235.01 940.297 1236.91 940.165 1238.61 941.293C1240.26 942.352 1241.7 943.618 1243 945.001C1244.7 946.816 1247.15 948.833 1248.49 950.85C1249.78 952.886 1249.96 954.948 1251.16 957C1252.56 959.394 1254.99 961.774 1256.69 964.083C1258.33 966.352 1259.24 968.446 1261 970.622C1262.85 972.91 1265.54 975.287 1266.57 978.051C1267.86 981.342 1267.23 984.694 1266.87 988C1266.51 991.342 1266.41 995.637 1264.78 998.778C1263.34 1001.52 1260.46 1004.09 1258.35 1006.5C1256.5 1008.62 1255.48 1011.61 1253.43 1013.5C1250.95 1015.75 1247.31 1015.93 1244.5 1017.82C1241.97 1019.53 1239.31 1021 1236.5 1022.08C1233.27 1023.32 1229.86 1024.04 1226.25 1024ZM1259.99 994.699C1262.89 989.599 1263.89 983.999 1261.59 978.599C1259.79 974.199 1255.79 970.999 1252.79 967.199C1249.99 963.699 1247.99 959.999 1245.49 956.399C1243.39 953.499 1240.99 950.599 1237.59 948.599C1234.29 946.599 1230.19 945.599 1225.99 945.999C1219.49 946.599 1214.29 950.399 1210.89 954.899C1208.99 957.499 1207.49 960.199 1205.79 962.799C1201.09 969.799 1194.29 975.899 1191.69 983.699C1190.59 987.099 1190.39 990.599 1191.49 993.899C1193.39 999.599 1198.89 1003.6 1204.39 1007.3C1207.89 1009.7 1211.49 1011.9 1215.49 1013.6C1218.89 1015.1 1222.69 1016.1 1226.59 1016.1C1235.69 1016.2 1243.39 1011.3 1249.89 1005.9C1253.79 1002.6 1257.59 998.899 1259.99 994.699Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth73Diagnozis.culttab &&
                !tooth73Diagnozis.abutment &&
                !tooth73Diagnozis.implant &&
                !tooth73Diagnozis.shaper &&
                !tooth73Diagnozis.apex
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
                className="st7"
                d="M1182.12 998.8C1183.02 1002.1 1184.72 1005 1186.72 1007.7C1202.32 1004 1215.83 989 1215.82 979.5C1213.32 967.5 1200.32 964 1198.92 954C1193.12 963.9 1185.32 972.7 1182.32 983.7C1181.02 988.7 1180.72 993.9 1182.12 998.8Z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth73.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth73.seal_left ? `seal-fill ${teethDiagnozis.tooth73.seal_left_color}` : ''}
                                `}
                d="M1182.12 998.8C1183.02 1002.1 1184.72 1005 1186.72 1007.7C1202.32 1004 1215.83 989 1215.82 979.5C1213.32 967.5 1200.32 964 1198.92 954C1193.12 963.9 1185.32 972.7 1182.32 983.7C1181.02 988.7 1180.72 993.9 1182.12 998.8Z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M1199.62 952.7C1199.42 953.1 1199.22 953.6 1198.92 954C1200.22 961.492 1206.71 965.237 1211.32 970.5C1213.49 972.964 1215.03 976.152 1215.82 979.5C1233.42 983.1 1250.82 965.5 1254.82 954.5C1252.82 950.9 1251.02 947.2 1248.92 943.6C1246.32 939.2 1243.32 934.9 1239.02 931.9C1234.92 929 1229.82 927.5 1224.62 928C1216.52 928.9 1210.12 934.4 1205.92 941.1C1203.52 944.8 1201.72 948.9 1199.62 952.7Z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth73.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth73.seal_top ? `seal-fill ${teethDiagnozis.tooth73.seal_top_color}` : ''}
                                `}
                d="M1199.62 952.7C1199.42 953.1 1199.22 953.6 1198.92 954C1200.22 961.492 1206.71 965.237 1211.32 970.5C1213.49 972.964 1215.03 976.152 1215.82 979.5C1233.42 983.1 1250.82 965.5 1254.82 954.5C1252.82 950.9 1251.02 947.2 1248.92 943.6C1246.32 939.2 1243.32 934.9 1239.02 931.9C1234.92 929 1229.82 927.5 1224.62 928C1216.52 928.9 1210.12 934.4 1205.92 941.1C1203.52 944.8 1201.72 948.9 1199.62 952.7Z"
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
                d="M1259.72 1011.8C1262.62 1008.3 1265.22 1004.6 1267.22 1000.5C1270.72 993 1272.02 984.7 1269.12 976.6C1266.82 970.1 1261.92 965.3 1258.12 959.7C1256.92 958 1255.92 956.3 1254.92 954.5C1250.2 966.1 1239.56 973.667 1234.82 976C1230.32 984 1241.32 993 1259.72 1011.8Z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth73.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth73.seal_right ? `seal-fill ${teethDiagnozis.tooth73.seal_right_color}` : ''}
                                `}
                d="M1259.72 1011.8C1262.62 1008.3 1265.22 1004.6 1267.22 1000.5C1270.72 993 1272.02 984.7 1269.12 976.6C1266.82 970.1 1261.92 965.3 1258.12 959.7C1256.92 958 1255.92 956.3 1254.92 954.5C1250.2 966.1 1239.56 973.667 1234.82 976C1230.32 984 1241.32 993 1259.72 1011.8Z"
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M1259.62 1011.7L1259.62 1011.7C1247.32 998 1229.22 984.8 1234.82 976C1230.82 978 1223.02 981.1 1215.82 979.5C1215.82 987.9 1203.82 1004 1186.62 1007.7C1189.82 1011.9 1193.92 1015.5 1198.12 1018.8C1202.52 1022.3 1206.92 1025.7 1211.92 1028.2C1216.32 1030.4 1220.92 1031.9 1225.82 1032C1237.12 1032.2 1246.72 1025 1254.72 1017C1256.42 1015.3 1258.02 1013.5 1259.62 1011.7Z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth73.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth73.seal_center ? `seal-fill ${teethDiagnozis.tooth73.seal_center_color}` : ''}
                            `}
                d="M1259.62 1011.7L1259.62 1011.7C1247.32 998 1229.22 984.8 1234.82 976C1230.82 978 1223.02 981.1 1215.82 979.5C1215.82 987.9 1203.82 1004 1186.62 1007.7C1189.82 1011.9 1193.92 1015.5 1198.12 1018.8C1202.52 1022.3 1206.92 1025.7 1211.92 1028.2C1216.32 1030.4 1220.92 1031.9 1225.82 1032C1237.12 1032.2 1246.72 1025 1254.72 1017C1256.42 1015.3 1258.02 1013.5 1259.62 1011.7Z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_right &&
                      !tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_right &&
                      tooth73Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1235 976C1230.5 986 1241 995 1257 1008.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_right &&
                      !tooth73Diagnozis.seal_top) ||
                    (!tooth73Diagnozis.seal_right && tooth73Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1235 976C1238.78 974.229 1247.47 968.35 1252 959"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_center &&
                      !tooth73Diagnozis.seal_top) ||
                    (!tooth73Diagnozis.seal_center && tooth73Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1236.5 975C1233 976.333 1224.2 978.8 1217 978"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_top &&
                      !tooth73Diagnozis.seal_left) ||
                    (!tooth73Diagnozis.seal_top && tooth73Diagnozis.seal_left)
                      ? 5
                      : 0,
                }}
                d="M1217 978C1214.5 973 1203.7 965.4 1202.5 959"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_left &&
                      !tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_left &&
                      tooth73Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1216 979C1214.4 984.396 1207.17 997.151 1191 1005"
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
                visibility: tooth73Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth73Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth73Diagnozis.vinir_color}`}
                d="M1267.12 1000.4C1265.12 1004.5 1262.52 1008.2 1259.62 1011.7C1258.02 1013.5 1256.42 1015.3 1254.72 1017C1246.72 1025 1237.12 1032.2 1225.82 1032C1220.92 1031.9 1216.32 1030.4 1211.92 1028.2C1206.92 1025.7 1202.52 1022.3 1198.12 1018.8C1193.92 1015.5 1189.82 1011.9 1186.62 1007.7C1184.62 1005 1182.92 1002.1 1182.02 998.8C1181.11 995.629 1180.92 992.29 1181.25 989C1184.33 989.067 1190.7 990.16 1191.5 994C1191.56 994.283 1191.64 994.565 1191.71 994.845C1192.42 997.444 1193.75 999.729 1195.31 1001.86C1197.81 1005.16 1201.02 1008 1204.3 1010.6C1207.74 1013.36 1211.18 1016.03 1215.09 1018C1218.53 1019.74 1222.12 1020.92 1225.95 1021C1234.79 1021.15 1242.29 1015.48 1248.55 1009.18C1249.88 1007.84 1251.13 1006.42 1252.38 1005.01L1252.38 1005.01C1254.64 1002.25 1256.68 999.335 1258.24 996.105C1258.65 995.252 1259.02 994.383 1259.35 993.5C1261.26 989.5 1267.6 988.5 1270.53 988.5C1270.16 992.603 1268.95 996.631 1267.12 1000.4Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth73Diagnozis.temporary_crown ||
                tooth73Diagnozis.ceramic_crown ||
                tooth73Diagnozis.mceramic_crown ||
                tooth73Diagnozis.metalic_crown ||
                tooth73Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth73Diagnozis.temporary_crown ||
                tooth73Diagnozis.ceramic_crown ||
                tooth73Diagnozis.mceramic_crown ||
                tooth73Diagnozis.metalic_crown ||
                tooth73Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth73Diagnozis.ceramic_crown_color}
                                ${tooth73Diagnozis.mceramic_crown_color}
                                ${tooth73Diagnozis.metalic_crown_color}
                                ${tooth73Diagnozis.zirconia_crown_color}
                            `}
              d="M1269.3,976.6c-2.3-6.5-7.3-11.4-11-16.9c-1.1-1.7-2.2-3.4-3.2-5.2c-2-3.6-3.9-7.3-6-10.9
                            c-2.6-4.4-5.6-8.7-9.9-11.7c-4.2-2.9-9.2-4.5-14.4-3.9c-8.1,0.8-14.4,6.4-18.7,13.1c-2.4,3.7-4.2,7.8-6.3,11.6
                            c-0.2,0.4-0.5,0.9-0.7,1.3c-5.7,9.9-13.6,18.6-16.6,29.7c-1.3,5-1.6,10.2-0.2,15.1c1,3.3,2.6,6.2,4.6,8.9
                            c3.2,4.2,7.3,7.7,11.5,11.1c4.4,3.5,8.8,6.9,13.8,9.4c4.3,2.2,9,3.7,13.9,3.8c11.3,0.2,20.9-7,28.9-15c1.7-1.7,3.3-3.4,4.9-5.3
                            c2.9-3.5,5.6-7.2,7.5-11.3C1271,993,1272.2,984.7,1269.3,976.6z"
            />
            <path
              className="st3 fissure"
              d="M1223.6,981.3c-4.9,0-9.7-0.8-14.4-2.3l0.3-1c5.4,1.7,11,2.5,16.5,2.2c5.3-0.3,10.6-1.5,15.5-3.7l0.4,1
                            c-5,2.2-10.4,3.5-15.9,3.8C1225.3,981.3,1224.5,981.3,1223.6,981.3z"
            />
          </g>
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{ visibility: 'hidden' }}
          >
            <path
              className="st3 fissure"
              d="M1223.6,981.3c-4.9,0-9.7-0.8-14.4-2.3l0.3-1c5.4,1.7,11,2.5,16.5,2.2c5.3-0.3,10.6-1.5,15.5-3.7l0.4,1
                            c-5,2.2-10.4,3.5-15.9,3.8C1225.3,981.3,1224.5,981.3,1223.6,981.3z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 18, -12)',
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
                  !tooth73Diagnozis.implant &&
                  !tooth73Diagnozis.apex &&
                  !tooth73Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth73Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1263,1180.9c0,9.9-2.1,19.7-3.5,29.6c-0.3,0.7-0.6,1.3-0.9,1.9
                                c-4,8.3-9,16.3-16.3,21.9c-2.4,1.8-5,3.4-7.7,4.4c-2.2,0.8-4.4,1.2-6.8,1.1c-1.7-0.1-3.2-0.4-4.7-0.9c-6.2-2.1-11.1-7.4-15.1-12.9
                                c-4.1-5.7-7.6-11.7-10.8-17.9c2.4,21,6.4,41.8,9.1,62.7c1.5,11.6,2.6,23.2,3.6,34.8c0.8,10.3,1.6,20.7,2.5,31
                                c1.5,15.4,3.6,30.7,8.4,45.5c2.6,7.9,7.8,15.5,15.1,16c-7.3-0.4-12.6-8-15.2-16c-4.8-14.8-6.9-30.2-8.4-45.5
                                c-1-10.3-1.7-20.7-2.5-31c-1-11.6-2.1-23.2-3.6-34.8c-3-22.8-7.3-45.4-9.7-68.2c-0.8-7.9-1.4-15.9-1.8-23.8l1.3-17.2
                                c2.7-5.5,6.1-10.8,10-15.7c3.4-4.2,7.1-8,10.6-12.1c1.4-1.7,2.9-3.4,5.2-3.8c2.4-0.4,4.6,1,6.4,2.6c5.3,4.6,8.8,10.5,14,15.1
                                c4.2,3.7,9.2,6.4,14.7,8l2,1.6C1261.7,1164.9,1263,1172.9,1263,1180.9z"
              />
            </g>
            <g>
              <path
                className={`st10 change-color ${tooth73Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1259.6,1210.3c-0.3,1.9-0.6,3.9-0.8,5.9c-1.2,10-1.2,20.1-1.3,30.2
                                c-0.2,17-0.9,34-1.1,51.1c-0.2,14.8-0.2,29.6-1.9,44.3c-0.7,6.2-1.7,12.4-2.6,18.6c-0.9,6.2-1.6,12.4-2.1,18.7
                                c-0.6,8.2-2.5,17.1-10.7,18.9c-9,1.9-15.4-6.6-18.3-15.7c-4.8-14.8-6.9-30.2-8.4-45.5c-1-10.3-1.7-20.7-2.5-31
                                c-1-11.6-2.1-23.2-3.6-34.8c-2.7-21-6.7-41.8-9.1-62.7c3.2,6.2,6.7,12.2,10.8,17.9c4,5.6,8.9,10.9,15.1,12.9
                                c1.5,0.5,3.1,0.8,4.7,0.9c2.3,0.1,4.6-0.3,6.7-1.1c2.8-1,5.4-2.5,7.7-4.3c7.3-5.7,12.3-13.6,16.3-21.9
                                C1258.9,1211.7,1259.2,1211,1259.6,1210.3z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth73Diagnozis.channel_class} ${tooth73Diagnozis.channel_class} ${tooth73Diagnozis.pulpit ? 'pulpit' : ''} ${tooth73Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1236.4,1190.3c-1.3,16.1-1.9,32.3-1.9,48.4c-0.5,0.2-0.9,0.3-1.4,0.4
                                c-0.3,0.1-0.6,0.2-0.9,0.2c-0.2,0.1-0.5,0.1-0.8,0.2c-0.1,0-0.3,0-0.4,0.1c-0.2,0-0.5,0.1-0.7,0.1c-0.2,0-0.4,0.1-0.6,0.1
                                c-0.1,0-0.3,0-0.4,0c-0.5,0-1,0-1.5,0c-1.7-0.1-3.2-0.4-4.7-0.9c0,0,0,0,0,0c-1.5-15.7-2.7-31.6-7.5-46.8
                                c-0.5-1.6-1.1-3.2-1.4-4.8c-0.9-4.1-0.3-8.3,1.4-12.1c0.6-1.4,1.5-2.7,2.2-4c1.1-2.3,2.2-4.6,4.9-4.9c3-0.4,4.8,2.2,6.8,4.3
                                c1.3,1.4,3.2,2.7,4.4,4.4c1.6,2.2,2.2,4.9,2.4,7.5C1236.6,1185.1,1236.6,1187.7,1236.4,1190.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth73Diagnozis.channel_class} ${tooth73Diagnozis.channel_class} ${tooth73Diagnozis.pulpit ? 'pulpit' : ''} ${tooth73Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1237.2,1317.2c-0.8,0.1-1.6,0.1-2.3,0.1c-0.8,0-1.6-0.1-2.5-0.2
                                c-0.1-1.3-0.2-2.6-0.4-3.8c-0.5-5.7-1.2-11.3-1.8-17c-2.1-18.1-5-36.1-6.9-54.2c-0.1-1.1-0.2-2.2-0.3-3.4v0c0,0,0,0,0,0
                                c1.5,0.5,3.1,0.8,4.7,0.9c0.5,0,1,0,1.5,0c0.1,0,0.3,0,0.4,0c0.2,0,0.4,0,0.6-0.1c0.2,0,0.5,0,0.7-0.1c0.1,0,0.3,0,0.4-0.1
                                l0.8-0.2c0.3-0.1,0.6-0.1,0.9-0.2c0.5-0.1,0.9-0.3,1.4-0.4c0,0,0,0,0,0c0,0.7,0,1.4,0,2.2c0.1,12.9,0.7,25.9,1.2,38.8
                                c0.5,11.2,0.9,22.3,1.3,33.5C1237.1,1314.5,1237.2,1315.9,1237.2,1317.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth73Diagnozis.channel_class} ${tooth73Diagnozis.channel_class} ${tooth73Diagnozis.pulpit ? 'pulpit' : ''} ${tooth73Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1238.3,1396.1c-1-16.7-2.2-33.3-3.4-49.9c-0.7-9.7-1.5-19.3-2.4-29
                                c0.8,0.1,1.6,0.2,2.5,0.2c0.8,0,1.5,0,2.3-0.1c0,0.4,0,0.8,0,1.2C1238.1,1344.3,1238.4,1370.2,1238.3,1396.1z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage73 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth73Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1263 1180.9C1263 1190.8 1261 1200.5 1259.5 1210.2C1259.2 1210.9 1258.8 1211.7 1258.5 1212.4C1254.5 1220.7 1249.5 1228.7 1242.3 1234.3C1240.3 1235.8 1238.2 1237.2 1235.9 1238.1C1235.5 1238.3 1235 1238.5 1234.5 1238.6C1232.3 1239.4 1230.1 1239.8 1227.7 1239.6C1226.1 1239.5 1224.5 1239.2 1223 1238.7C1223 1238.7 1223 1238.7 1222.9 1238.7C1216.7 1236.6 1211.8 1231.3 1207.8 1225.8C1203.7 1220.1 1200.2 1214.1 1197 1207.9C1196.8 1206.1 1196.6 1204.3 1196.4 1202.5C1195.6 1194.6 1195 1186.6 1194.7 1178.7L1196 1161.5C1198.7 1156 1202.1 1150.7 1206 1145.8C1209.3 1141.7 1213.1 1137.8 1216.6 1133.7C1218 1132 1219.5 1130.3 1221.8 1129.9C1224.2 1129.5 1226.4 1130.9 1228.2 1132.5C1233.4 1137.1 1237 1143 1242.2 1147.6C1246.3 1151.3 1251.4 1154 1256.9 1155.6L1258.9 1157.3C1261.6 1164.9 1263 1172.9 1263 1180.9Z"
            />
            <path
              className="st57"
              style={{ fill: tooth73Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M1212.3 1138.8L1229.3 1294.3L1232 1318.9C1232.1 1320 1233.1 1320.9 1234.2 1320.9C1235.4 1320.9 1236.4 1319.9 1236.4 1318.7L1236.2 1293.3V1141.3C1233.7 1138.3 1231.2 1135.2 1228.2 1132.6C1226.4 1131 1224.2 1129.6 1221.8 1130C1219.5 1130.3 1218 1132.1 1216.6 1133.8C1215.3 1135.5 1213.8 1137.1 1212.3 1138.8Z"
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth73Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth73Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M1234.2,1320.9L1234.2,1320.9c-1.1,0-2.1-0.9-2.2-2l-8.9-80c1.5,0.5,3,0.8,4.7,0.9c2.3,0.1,4.6-0.3,6.8-1
                            c0.5-0.2,0.9-0.3,1.4-0.5l0.6,80.5C1236.5,1319.9,1235.5,1320.9,1234.2,1320.9z"
            />
            <path
              className="st15"
              d="M1263,1180.9c0,9.9-2,19.6-3.5,29.3c-0.3,0.7-0.7,1.5-1,2.2c-4,8.3-9,16.3-16.2,21.9
                            c-2,1.5-4.1,2.9-6.4,3.8c-0.4,0.2-0.9,0.4-1.4,0.5c-2.2,0.8-4.4,1.2-6.8,1c-1.6-0.1-3.2-0.4-4.7-0.9c0,0,0,0-0.1,0
                            c-6.2-2.1-11.1-7.4-15.1-12.9c-4.1-5.7-7.6-11.7-10.8-17.9c-0.2-1.8-0.4-3.6-0.6-5.4c-0.8-7.9-1.4-15.9-1.7-23.8l1.3-17.2
                            c2.7-5.5,6.1-10.8,10-15.7c3.3-4.1,7.1-8,10.6-12.1c1.4-1.7,2.9-3.4,5.2-3.8c2.4-0.4,4.6,1,6.4,2.6c5.2,4.6,8.8,10.5,14,15.1
                            c4.1,3.7,9.2,6.4,14.7,8l2,1.7C1261.6,1164.9,1263,1172.9,1263,1180.9z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth73Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth73Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M1197.2,1208l21.3,47.9l26.6-2.6l14.5-43.1c-0.3,0.7-0.7,1.5-1,2.2c-4,8.3-8.9,16.3-16.2,21.9
                            c-4.2,3.3-9.2,5.7-14.5,5.4c-8.4-0.4-14.8-6.9-19.8-13.8C1203.9,1220.2,1200.3,1214.2,1197.2,1208z"
            />
            <path
              className="st17"
              d="M1194.8,1178.7c0.4,7.9,0.9,15.9,1.7,23.8c0.2,1.8,0.4,3.6,0.6,5.4c3.2,6.2,6.7,12.3,10.8,17.9
                            c5,6.9,11.4,13.4,19.8,13.8c5.3,0.2,10.3-2.1,14.5-5.4c7.3-5.7,12.3-13.6,16.2-21.9c0.3-0.7,0.7-1.5,1-2.2
                            c1.4-9.8,3.5-19.5,3.5-29.3c0-8-1.3-16-4-23.6l-2-1.6c-5.5-1.6-10.6-4.3-14.7-8c-5.2-4.6-8.8-10.6-14-15.1
                            c-1.8-1.5-4-2.9-6.4-2.6c-2.3,0.3-3.8,2.1-5.2,3.8c-3.5,4.1-7.2,7.9-10.6,12.1c-4,4.9-7.3,10.2-10,15.7L1194.8,1178.7z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1252.31 1212.64C1252.48 1210.23 1250.47 1208.22 1248.05 1208.38L1211.78 1210.78C1209.36 1210.94 1207.64 1213.19 1208.12 1215.57L1216.04 1254.55C1216.44 1256.51 1218.24 1257.88 1220.24 1257.74L1245.87 1255.93C1247.86 1255.79 1249.45 1254.21 1249.58 1252.22L1252.31 1212.64Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth73Diagnozis.abutment ||
                tooth73Diagnozis.implant ||
                tooth73Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1251.2,1252.6c0,0,4,72.3,4.8,80.1s1,59.5,1,59.5s-5.2,8.9-15.2,7.3c-10-1.6-13.8-9-13.8-9
                            s-3.2-25.4-3.7-29.6s-8.2-59.9-8.9-66.2c-0.7-6.2-4.8-39.6-4.8-39.6L1251.2,1252.6z"
            />
            <line
              className="st19"
              x1="1255.7"
              y1="1264.7"
              x2="1209"
              y2="1274.7"
            ></line>
            <line
              className="st19"
              x1="1258.7"
              y1="1291.7"
              x2="1212"
              y2="1301.7"
            ></line>
            <line
              className="st19"
              x1="1261.7"
              y1="1318.7"
              x2="1215"
              y2="1328.7"
            ></line>
            <line
              className="st19"
              x1="1263.7"
              y1="1346.7"
              x2="1217"
              y2="1356.7"
            ></line>
            <line
              className="st19"
              x1="1265.7"
              y1="1373.7"
              x2="1219"
              y2="1383.7"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth73Diagnozis.culttab &&
                !tooth73Diagnozis.abutment &&
                !tooth73Diagnozis.implant &&
                !tooth73Diagnozis.shaper &&
                !tooth73Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1271.8,1157.3c-0.4-6.3-2.1-12.5-4.8-18.2c-3.2-3.2-6.7-6.1-10.5-8.6
                            c-3.1-2-6.4-3.8-9.6-5.8c-1.9-1.2-3.8-2.5-5.5-4.1c-4.8-4.2-8.2-9.8-13.5-13.3c-2.3-1.5-4.8-2.5-7.6-2.6
                            c-7-0.3-11.8,4.5-16.1,10.3c-1.9,2.6-3.7,5.4-5.6,8.1c-3.4,4.9-7.4,9.3-12,13.1l-3.7,7.6c-1.4,10.4-0.9,21.1,1.4,31.4
                            c1.9,8.2,4.9,16.1,8.4,23.8c1.2,2.7,2.5,5.4,3.8,8c3.3,6.5,7,12.9,11.3,18.9c5,6.9,11.4,13.4,19.8,13.8c5.3,0.2,10.3-2.2,14.5-5.4
                            c7.3-5.7,12.3-13.6,16.2-21.9c1.6-3.4,3.1-6.9,4.5-10.5v0c2.5-6.7,4.5-13.5,6.2-20.5C1271,1173.5,1272.4,1165.4,1271.8,1157.3z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth73Diagnozis.culttab && !tooth73Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1267 1139.1C1269.7 1144.8 1271.4 1151 1271.8 1157.3C1272.4 1165.4 1271 1173.5 1269 1181.4C1267.3 1188.4 1265.3 1195.2 1262.8 1201.9C1261.4 1205.5 1259.9 1209 1258.3 1212.4C1254.4 1220.7 1249.4 1228.6 1242.1 1234.3C1237.9 1237.5 1232.9 1239.9 1227.6 1239.7C1219.2 1239.3 1212.8 1232.8 1207.8 1225.9C1203.5 1219.9 1199.8 1213.5 1196.5 1207C1195.2 1204.4 1193.9 1201.7 1192.7 1199C1189.2 1191.3 1186.2 1183.4 1184.3 1175.2C1182 1164.9 1181.5 1154.2 1182.9 1143.8L1186.6 1136.2C1191.2 1132.4 1195.2 1128 1198.6 1123.1C1199.39 1121.98 1200.16 1120.84 1200.93 1119.7C1202.01 1118.11 1203.09 1116.52 1204.2 1115C1208.5 1109.2 1213.3 1104.4 1220.3 1104.7C1223 1104.8 1225.6 1105.8 1227.9 1107.3C1231.01 1109.36 1233.47 1112.14 1235.94 1114.93C1237.68 1116.9 1239.42 1118.87 1241.4 1120.6C1243.1 1122.2 1245 1123.5 1246.9 1124.7C1248.33 1125.6 1249.79 1126.46 1251.24 1127.31C1253.02 1128.36 1254.79 1129.4 1256.5 1130.5C1260.3 1133 1263.8 1135.9 1267 1139.1ZM1204.76 1206.73C1203.8 1204.8 1202.84 1202.8 1201.96 1200.79C1200.87 1198.38 1199.84 1195.94 1198.91 1193.47C1198.44 1192.21 1199.36 1190.88 1200.71 1190.84L1255.35 1189.08C1256.68 1189.04 1257.68 1190.28 1257.34 1191.56C1256.3 1195.42 1255.12 1199.2 1253.73 1202.95C1252.7 1205.62 1251.59 1208.21 1250.41 1210.74C1247.53 1216.89 1243.83 1222.76 1238.44 1226.98C1235.34 1229.36 1231.65 1231.14 1227.73 1230.99C1221.53 1230.69 1216.8 1225.87 1213.11 1220.75C1209.93 1216.3 1207.2 1211.55 1204.76 1206.73Z"
            ></path>
            <path
              className={`st7 ${tooth73Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1201.96 1200.79C1202.84 1202.8 1203.8 1204.8 1204.76 1206.73C1207.2 1211.55 1209.93 1216.3 1213.11 1220.75C1216.8 1225.87 1221.53 1230.69 1227.73 1230.99C1231.65 1231.14 1235.34 1229.36 1238.44 1226.98C1243.83 1222.76 1247.53 1216.89 1250.41 1210.74C1251.59 1208.21 1252.7 1205.62 1253.73 1202.95C1255.12 1199.2 1256.3 1195.42 1257.34 1191.56C1257.68 1190.28 1256.68 1189.04 1255.35 1189.08L1200.71 1190.84C1199.36 1190.88 1198.44 1192.21 1198.91 1193.47C1199.84 1195.94 1200.87 1198.38 1201.96 1200.79Z"
            />
            <path
              className={`st60
                                    ${tooth73Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth73Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth73Diagnozis.seal_cervical_color}
                                `}
              d="M1201.96 1200.79C1202.84 1202.8 1203.8 1204.8 1204.76 1206.73C1207.2 1211.55 1209.93 1216.3 1213.11 1220.75C1216.8 1225.87 1221.53 1230.69 1227.73 1230.99C1231.65 1231.14 1235.34 1229.36 1238.44 1226.98C1243.83 1222.76 1247.53 1216.89 1250.41 1210.74C1251.59 1208.21 1252.7 1205.62 1253.73 1202.95C1255.12 1199.2 1256.3 1195.42 1257.34 1191.56C1257.68 1190.28 1256.68 1189.04 1255.35 1189.08L1200.71 1190.84C1199.36 1190.88 1198.44 1192.21 1198.91 1193.47C1199.84 1195.94 1200.87 1198.38 1201.96 1200.79Z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth73.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1186.5 1183L1187.5 1183.5L1188.5 1185L1189.5 1185.5L1190.5 1187.5L1192 1189L1192.5 1191L1195.5 1194.5L1198 1198.5L1199 1203L1201.5 1208.5L1202.5 1210V1212.5L1206.5 1218L1209 1220L1212.5 1226.5L1214.5 1228L1217 1230L1218.5 1232L1225.5 1235L1228.5 1236.5L1231 1235.5H1234.5L1238 1234.5L1242.5 1230.5L1246 1228L1249 1222L1251.5 1218.5L1254.5 1215.5L1255.5 1212.5L1257 1208.5L1259 1206L1260.5 1200L1262.5 1196L1263.5 1195.5L1265.5 1190V1187.5L1266.5 1185.5L1267.5 1182.5L1268 1181.5L1269.5 1180.5L1270 1181.5V1183.5L1269.5 1186V1187.5L1268.5 1190.5V1193.5L1268 1196L1266.5 1198.5V1201L1265.5 1203L1264.5 1206V1208.5L1262 1212V1214.5L1261.5 1216L1262 1218L1261.5 1219V1222V1224.5L1260.5 1226.5V1229.5L1259 1234.5V1239.5L1258 1243.5V1247L1256 1249.5H1253.5L1251 1251.5L1248 1253.5L1244 1255H1240.5L1237 1257.5H1233L1229 1258.5L1225 1258L1219.5 1257H1215.5L1212.5 1255.5L1208.5 1254.5H1205.5L1202.5 1251.5V1248.5L1201.5 1244L1200.5 1239.5L1198.5 1236.5L1198 1232L1197 1229.5V1226.5L1196 1224.5L1196.5 1221.5L1195.5 1218.5L1194.5 1216V1213.5L1193 1210L1192.5 1207.5L1192 1205L1191 1203L1190.5 1199L1189.5 1197.5L1188.5 1193.5L1186.5 1190.5L1186 1187.5L1185.5 1185L1186.5 1183Z"
            ></path>
            <path
              className="st61 level1"
              d="M1186.5 1183L1187.5 1183.5L1188.5 1185L1189.5 1185.5L1190.5 1187.5L1192 1189L1192.5 1191L1195.5 1194.5L1198 1198.5L1199 1203L1201.5 1208.5L1202.5 1210V1212.5L1206.5 1218L1209 1220L1212.5 1226.5L1214.5 1228L1217 1230L1218.5 1232L1225.5 1235L1228.5 1236.5L1231 1235.5H1234.5L1238 1234.5L1242.5 1230.5L1246 1228L1249 1222L1251.5 1218.5L1254.5 1215.5L1255.5 1212.5L1257 1208.5L1259 1206L1260.5 1200L1262.5 1196L1263.5 1195.5L1265.5 1190V1187.5L1266.5 1185.5L1267.5 1182.5L1268 1181.5L1269.5 1180.5L1270 1182L1269.5 1183.5V1185.5L1269 1188.5L1268 1191L1267.5 1194V1196L1266.5 1197.5L1265.5 1201L1264 1203L1263.5 1206L1263 1208L1262 1209.5V1211L1261.5 1212.5V1214L1260.5 1216.5V1218.5L1261 1219.5L1260 1221.5V1223L1259 1224L1256.5 1225L1253.5 1229L1251 1231.5L1250 1234L1249 1235L1246 1236.5L1243.5 1240L1241 1241L1238.5 1241.5L1233.5 1242.5L1231 1243.5H1227.5L1225.5 1242.5H1221.5L1218.5 1241H1216L1214 1240.5L1212 1239.5L1210.5 1237.5L1207.5 1235.5L1206 1232L1204 1231.5L1201 1229L1199 1226.5V1224L1198 1222V1218.5L1196.5 1215.5V1214L1195.5 1212.5V1210L1193.5 1207L1192.5 1203L1191 1201V1199.5L1189.5 1197.5V1195L1188.5 1192.5L1188 1190.5L1187.5 1188.5L1186.5 1186L1186 1184.5L1186.5 1183Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth73Diagnozis.culttab &&
                !tooth73Diagnozis.abutment &&
                !tooth73Diagnozis.implant &&
                !tooth73Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1205.1,1197.7c-1,2.8-5.4,6.8-8.5,9.3c-1.3-2.6-2.6-5.3-3.8-8c-3.4-7.7-6.5-15.5-8.4-23.8
                                c-2.4-10.3-2.8-20.9-1.4-31.4l3.7-7.6c4.6-3.8,8.6-8.2,12-13.1c1.8-2.6,3.6-5.5,5.5-8.1c0.6,13,1.8,42.4,2,51
                                C1206.5,1177.4,1206.7,1193.3,1205.1,1197.7z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth73.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth73.seal_left ? `seal-fill ${teethDiagnozis.tooth73.seal_left_color}` : ''}
                            `}
                d="M1205.1,1197.7c-1,2.8-5.4,6.8-8.5,9.3c-1.3-2.6-2.6-5.3-3.8-8c-3.4-7.7-6.5-15.5-8.4-23.8
                                c-2.4-10.3-2.8-20.9-1.4-31.4l3.7-7.6c4.6-3.8,8.6-8.2,12-13.1c1.8-2.6,3.6-5.5,5.5-8.1c0.6,13,1.8,42.4,2,51
                                C1206.5,1177.4,1206.7,1193.3,1205.1,1197.7z"
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M1263,1201.9L1263,1201.9c-1.3,3.6-2.8,7.1-4.5,10.5c-4,8.3-9,16.3-16.2,21.9c-4.2,3.3-9.2,5.7-14.5,5.4
                                c-8.4-0.4-14.8-6.9-19.8-13.8c-4.3-6-8-12.3-11.3-18.9c3-2.5,7.4-6.6,8.5-9.3c1.6-4.4,1.4-20.3,1.1-31.6c-0.2-8.7-1.4-38-2-51
                                c4.3-5.8,9.1-10.6,16.1-10.3c2.7,0.1,5.3,1.1,7.6,2.6c5.3,3.5,8.8,9.1,13.5,13.3c1.7,1.5,3.6,2.8,5.5,4.1c0.6,7,1.7,18.2,2.4,26.5
                                c1.1,12.8,4,35.9,5.4,40.8C1255.9,1196.1,1258.6,1198.4,1263,1201.9z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth73.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth73.seal_center ? `seal-fill ${teethDiagnozis.tooth73.seal_center_color}` : ''}
                            `}
                d="M1263,1201.9L1263,1201.9c-1.3,3.6-2.8,7.1-4.5,10.5c-4,8.3-9,16.3-16.2,21.9c-4.2,3.3-9.2,5.7-14.5,5.4
                                c-8.4-0.4-14.8-6.9-19.8-13.8c-4.3-6-8-12.3-11.3-18.9c3-2.5,7.4-6.6,8.5-9.3c1.6-4.4,1.4-20.3,1.1-31.6c-0.2-8.7-1.4-38-2-51
                                c4.3-5.8,9.1-10.6,16.1-10.3c2.7,0.1,5.3,1.1,7.6,2.6c5.3,3.5,8.8,9.1,13.5,13.3c1.7,1.5,3.6,2.8,5.5,4.1c0.6,7,1.7,18.2,2.4,26.5
                                c1.1,12.8,4,35.9,5.4,40.8C1255.9,1196.1,1258.6,1198.4,1263,1201.9z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              style={{ zIndex: 3000 }}
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M1269.2,1181.4c-1.6,7-3.6,13.8-6.2,20.5c-4.4-3.5-7.1-5.7-8.2-9.8c-1.4-4.9-4.2-28-5.4-40.8
                                c-0.7-8.2-1.8-19.5-2.4-26.5c3.1,2,6.4,3.8,9.5,5.8c3.8,2.5,7.3,5.3,10.5,8.6c2.7,5.7,4.3,11.9,4.8,18.2
                                C1272.4,1165.4,1271,1173.5,1269.2,1181.4z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth73.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth73.seal_right ? `seal-fill ${teethDiagnozis.tooth73.seal_right_color}` : ''}
                            `}
                d="M1269.2,1181.4c-1.6,7-3.6,13.8-6.2,20.5c-4.4-3.5-7.1-5.7-8.2-9.8c-1.4-4.9-4.2-28-5.4-40.8
                                c-0.7-8.2-1.8-19.5-2.4-26.5c3.1,2,6.4,3.8,9.5,5.8c3.8,2.5,7.3,5.3,10.5,8.6c2.7,5.7,4.3,11.9,4.8,18.2
                                C1272.4,1165.4,1271,1173.5,1269.2,1181.4z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_right &&
                      !tooth73Diagnozis.seal_top &&
                      !tooth73Diagnozis.seal_center) ||
                    (tooth73Diagnozis.seal_right &&
                      tooth73Diagnozis.seal_top &&
                      !tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_right &&
                      tooth73Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1250.5 1171L1246.5 1130.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_right &&
                      !tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_right &&
                      !tooth73Diagnozis.seal_bottom &&
                      tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_right &&
                      tooth73Diagnozis.seal_bottom &&
                      tooth73Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1250.5 1171C1252 1188 1252 1192.1 1258 1198.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_left &&
                      !tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_left &&
                      tooth73Diagnozis.seal_center) ||
                    (tooth73Diagnozis.seal_right &&
                      tooth73Diagnozis.seal_left &&
                      !tooth73Diagnozis.seal_center &&
                      !tooth73Diagnozis.seal_top) ||
                    (!tooth73Diagnozis.seal_top &&
                      !tooth73Diagnozis.seal_bottom &&
                      tooth73Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1205.5 1173.5C1205.5 1192.5 1207 1197.5 1200 1203"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth73Diagnozis.seal_left &&
                      !tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_left &&
                      !tooth73Diagnozis.seal_bottom &&
                      tooth73Diagnozis.seal_center) ||
                    (!tooth73Diagnozis.seal_left &&
                      tooth73Diagnozis.seal_bottom &&
                      tooth73Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1205.5 1173.5L1203.5 1123"
              />
            </g>
          </g>
          <g>
            <g
              className="vinir"
              style={{
                visibility: tooth73Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth73Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth73Diagnozis.vinir_color}`}
                d="M1271.8 1157.3C1271.4 1151 1269.7 1144.8 1267 1139.1C1263.8 1135.9 1260.3 1133 1256.5 1130.5C1253.4 1128.5 1250.1 1126.7 1246.9 1124.7C1245 1123.5 1243.1 1122.2 1241.4 1120.6C1236.6 1116.4 1233.2 1110.8 1227.9 1107.3C1225.6 1105.8 1223 1104.8 1220.3 1104.7C1213.3 1104.4 1208.5 1109.2 1204.2 1115C1202.3 1117.6 1200.5 1120.4 1198.6 1123.1C1195.2 1128 1191.2 1132.4 1186.6 1136.2L1182.9 1143.8C1181.5 1154.2 1182 1164.9 1184.3 1175.2C1186.2 1183.4 1189.2 1191.3 1192.7 1199C1193.9 1201.7 1195.2 1204.4 1196.5 1207C1199.8 1213.5 1203.5 1219.9 1207.8 1225.9C1212.8 1232.8 1219.2 1239.3 1227.6 1239.7C1232.9 1239.9 1237.9 1237.5 1242.1 1234.3C1249.4 1228.6 1254.4 1220.7 1258.3 1212.4C1259.9 1209 1261.4 1205.5 1262.8 1201.9C1265.3 1195.2 1267.3 1188.4 1269 1181.4C1271 1173.5 1272.4 1165.4 1271.8 1157.3Z"
              ></path>
            </g>
          </g>
          <g
            className="crown"
            style={{
              visibility:
                tooth73Diagnozis.temporary_crown ||
                tooth73Diagnozis.ceramic_crown ||
                tooth73Diagnozis.mceramic_crown ||
                tooth73Diagnozis.metalic_crown ||
                tooth73Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth73Diagnozis.temporary_crown ||
                tooth73Diagnozis.ceramic_crown ||
                tooth73Diagnozis.mceramic_crown ||
                tooth73Diagnozis.metalic_crown ||
                tooth73Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth73Diagnozis.ceramic_crown_color}
                                ${tooth73Diagnozis.mceramic_crown_color}
                                ${tooth73Diagnozis.metalic_crown_color}
                                ${tooth73Diagnozis.zirconia_crown_color}
                            `}
              d="M1271.8,1157.3c-0.4-6.3-2.1-12.5-4.8-18.2c-3.2-3.2-6.7-6.1-10.5-8.6
                            c-3.1-2-6.4-3.8-9.6-5.8c-1.9-1.2-3.8-2.5-5.5-4.1c-4.8-4.2-8.2-9.8-13.5-13.3c-2.3-1.5-4.8-2.5-7.6-2.6
                            c-7-0.3-11.8,4.5-16.1,10.3c-1.9,2.6-3.7,5.4-5.6,8.1c-3.4,4.9-7.4,9.3-12,13.1l-3.7,7.6c-1.4,10.4-0.9,21.1,1.4,31.4
                            c1.9,8.2,4.9,16.1,8.4,23.8c1.2,2.7,2.5,5.4,3.8,8c3.3,6.5,7,12.9,11.3,18.9c5,6.9,11.4,13.4,19.8,13.8c5.3,0.2,10.3-2.2,14.5-5.4
                            c7.3-5.7,12.3-13.6,16.2-21.9c1.6-3.4,3.1-6.9,4.5-10.5v0c2.5-6.7,4.5-13.5,6.2-20.5C1271,1173.5,1272.4,1165.4,1271.8,1157.3z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
