import React, { useEffect } from 'react';
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
import PeriodontitStage74 from './periodontit74';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth74() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth74Diagnozis = teethDiagnozis.tooth74;
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
        teethDiagnozis.tooth74.caries_bottom =
          !teethDiagnozis.tooth74.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth74.caries_center =
          !teethDiagnozis.tooth74.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth74.caries_left =
          !teethDiagnozis.tooth74.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth74.caries_right =
          !teethDiagnozis.tooth74.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth74.caries_top = !teethDiagnozis.tooth74.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth74.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth74.seal_center_color = sealColor1;
          teethDiagnozis.tooth74.seal_center = true;
        } else if (
          teethDiagnozis.tooth74.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth74.seal_center_color = sealColor2;
          teethDiagnozis.tooth74.seal_center = true;
        } else if (
          teethDiagnozis.tooth74.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth74.seal_center_color = sealColor3;
          teethDiagnozis.tooth74.seal_center = true;
        } else {
          teethDiagnozis.tooth74.seal_center =
            !teethDiagnozis.tooth74.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth74.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth74.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth74.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth74.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth74.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth74.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth74.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth74.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth74.seal_bottom = true;
        } else {
          teethDiagnozis.tooth74.seal_bottom =
            !teethDiagnozis.tooth74.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth74.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth74.seal_left_color = sealColor1;
          teethDiagnozis.tooth74.seal_left = true;
        } else if (
          teethDiagnozis.tooth74.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth74.seal_left_color = sealColor2;
          teethDiagnozis.tooth74.seal_left = true;
        } else if (
          teethDiagnozis.tooth74.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth74.seal_left_color = sealColor3;
          teethDiagnozis.tooth74.seal_left = true;
        } else {
          teethDiagnozis.tooth74.seal_left = !teethDiagnozis.tooth74.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth74.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth74.seal_right_color = sealColor1;
          teethDiagnozis.tooth74.seal_right = true;
        } else if (
          teethDiagnozis.tooth74.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth74.seal_right_color = sealColor2;
          teethDiagnozis.tooth74.seal_right = true;
        } else if (
          teethDiagnozis.tooth74.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth74.seal_right_color = sealColor3;
          teethDiagnozis.tooth74.seal_right = true;
        } else {
          teethDiagnozis.tooth74.seal_right =
            !teethDiagnozis.tooth74.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth74.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth74.seal_top_color = sealColor1;
          teethDiagnozis.tooth74.seal_top = true;
        } else if (
          teethDiagnozis.tooth74.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth74.seal_top_color = sealColor2;
          teethDiagnozis.tooth74.seal_top = true;
        } else if (
          teethDiagnozis.tooth74.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth74.seal_top_color = sealColor3;
          teethDiagnozis.tooth74.seal_top = true;
        } else {
          teethDiagnozis.tooth74.seal_top = !teethDiagnozis.tooth74.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth74.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth74.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth74.wedge_shaped_defect_color =
          !teethDiagnozis.tooth74.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth74.show &&
        !teethDiagnozis.tooth34.show
      ) {
        document.getElementById('TH-74').classList.add('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth74.show &&
        teethDiagnozis.tooth34.show
      ) {
        document.getElementById('TH-74').classList.add('f-tooth-active');
        document.getElementById('TH-34').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-74').classList.remove('f-tooth-active');
        document.getElementById('TH-34').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth74.show &&
        !teethDiagnozis.tooth34.show
      ) {
        document.getElementById('TH-74').classList.remove('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth74.show &&
        teethDiagnozis.tooth34.show
      ) {
        document.getElementById('TH-74').classList.remove('f-tooth-active');
        document.getElementById('TH-34').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth34.show) {
        document.getElementById('TH-74').classList.add('f-tooth-active');
        document.getElementById('TH-34').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth74.show) {
        document.getElementById('TH-74').classList.remove('f-tooth-active');
        document.getElementById('TH-34').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth34.show) {
        document.getElementById('TH-34').classList.add('f-tooth-active');
        document.getElementById('TH-74').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="74"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1300 842)"
          className={`st3 st4 st5 ${selectedTooth === 74 ? 'num-active' : ''}`}
        >
          74
        </text>
      </g>
      <g
        id="TH-74"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth74.show || allTeeth) && !teethDiagnozis.tooth74.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth74.show = !teethDiagnozis.tooth74.show;
            teethDiagnozis.tooth34.show = false;
          }

          dispatch(setSelectedToothNumber(74));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              74,
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
          className={`underlay ${selectedTooth === 74 ? 'selected' : ''}`}
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
            d="M1287,1255.9c0,0,8,42,15,67s14,47,33,47s25-15,25-28s-4-22-5-46s1-71,2-84
                        s13-41,9-68s-21-54-22-79s23-45,21-77s-5.8-165.8-10-185c-5-23-35-31-52-21s-22,31-25,86s-7,102-7,120s2,35,15,71
                        c13,36-18,62-14,100S1282,1228.9,1287,1255.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, -184, 26)',
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
                  !tooth74Diagnozis.culttab &&
                  !tooth74Diagnozis.implant &&
                  !tooth74Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st6 change-color ${tooth74Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth74Diagnozis?.apex ? 'apex' : ''}`}
                d="M1608.9,969.7c2.5,6.3,5.3,12.8,4.1,19.4c-0.9,4.9-4.1,9.4-8.1,13.3
                                c-3.3,3.2-7.3,6.1-12.2,7.4c-5.1,1.4-10.9,0.9-15.9,2.6c-5.9,1.9-9.7,6.2-14.7,9.4c-7.4,4.6-16.9,6.4-26.4,6.1
                                c-5.5-0.2-11.1-1.2-15.5-3.7c-2.2-1.3-4.1-2.9-6.5-3.9c-6-2.4-12.9-0.7-19.6-0.9c-6-0.2-11.5-1.9-15.9-5.1c-3.6-2.7-6-6.1-7.9-9.7
                                c-1.8-3.4-3.2-6.9-3.8-10.5c-1.2-7.2,0.8-14.5,2.6-21.7c1.7-6.8,3.4-13.7,6.2-20.3c3.3-7.8,8.4-15.3,17.5-19.5
                                c8.7-4,19.2-4,29.2-2.4c4.1,0.6,8.2,1.5,12.4,1.3c3.9-0.2,7.5-1.3,11.3-2c5.1-0.9,10.3-1,15.4-0.7c5.1,0.3,10.2,0.8,15.1,2
                                c5.5,1.3,10.7,3.3,14.9,6.4c5.7,4.2,8.8,10,11.2,15.5C1604.7,958.2,1606.6,963.9,1608.9,969.7z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth74Diagnozis?.apex || tooth74Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth74Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth74Diagnozis?.apex ? 'apex' : ''}`}
                d="M1608.9 969.7C1611.4 976 1614.2 982.5 1613 989.1C1612.1 994 1608.9 998.5 1604.9 1002.4C1601.6 1005.6 1597.6 1008.5 1592.7 1009.8C1587.6 1011.2 1581.8 1010.7 1576.8 1012.4C1570.9 1014.3 1567.1 1018.6 1562.1 1021.8C1554.7 1026.4 1545.2 1028.2 1535.7 1027.9C1530.2 1027.7 1524.6 1026.7 1520.2 1024.2C1518 1022.9 1516.1 1021.3 1513.7 1020.3C1507.7 1017.9 1500.8 1019.6 1494.1 1019.4C1488.1 1019.2 1482.6 1017.5 1478.2 1014.3C1474.6 1011.6 1472.2 1008.2 1470.3 1004.6C1468.5 1001.2 1467.1 997.7 1466.5 994.1C1465.3 986.9 1467.3 979.6 1469.1 972.4C1470.8 965.6 1472.5 958.7 1475.3 952.1C1478.6 944.3 1483.7 936.8 1492.8 932.6C1501.5 928.6 1512 928.6 1522 930.2C1526.1 930.8 1530.2 931.7 1534.4 931.5C1538.3 931.3 1541.9 930.2 1545.7 929.5C1550.8 928.6 1556 928.5 1561.1 928.8C1566.2 929.1 1571.3 929.6 1576.2 930.8C1581.7 932.1 1586.9 934.1 1591.1 937.2C1596.8 941.4 1599.9 947.2 1602.3 952.7C1604.7 958.2 1606.6 963.9 1608.9 969.7Z"
              />
              <path
                className={`st24 change-color ${tooth74Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth74Diagnozis?.apex ? 'apex' : ''}`}
                d="M1508.82 972.325C1509.81 988.262 1504.49 997 1539.24 997C1577.68 997 1571.36 983.851 1571.36 967.576C1571.36 960.226 1568.12 955 1542.52 955C1516.93 955 1507.83 956.388 1508.82 972.325Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth74Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g>
              <ellipse
                className="st22 target"
                rx="10.0437"
                ry="6.63376"
                transform="matrix(0.0172822 -0.999851 -0.999851 -0.0172822 1563.95 976.158)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="8.41967"
                ry="7.78385"
                transform="matrix(0.643274 -0.765636 -0.765636 -0.643274 1519.38 966.454)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="8.72166"
                ry="7.94529"
                transform="matrix(-0.99786 -0.0653869 -0.0653869 0.99786 1519.53 986.499)"
                style={{ fill: '#e80808' }}
              ></ellipse>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth74Diagnozis.implant || tooth74Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1539.5" cy="979.5" r="26.5"></circle>
            <g className="st27">
              <mask id="implant_74" className="st49">
                <path
                  className="st50"
                  d="M1525.9 963.474L1522.46 962.352C1519.53 965.3 1517.35 968.994 1516.23 973.124L1518.93 975.55C1518.69 976.829 1518.56 978.15 1518.56 979.5C1518.56 980.85 1518.69 982.17 1518.93 983.45L1516.23 985.875C1517.35 990.006 1519.53 993.7 1522.46 996.648L1525.9 995.525C1527.9 997.242 1530.21 998.594 1532.74 999.478L1533.49 1003.02C1535.48 1003.55 1537.56 1003.83 1539.71 1003.83C1541.86 1003.83 1543.95 1003.55 1545.94 1003.02L1546.69 999.477C1549.22 998.593 1551.53 997.241 1553.52 995.525L1556.97 996.647C1559.9 993.699 1562.08 990.004 1563.2 985.874L1560.5 983.448C1560.74 982.169 1560.87 980.849 1560.87 979.5C1560.87 978.15 1560.74 976.831 1560.5 975.552L1563.2 973.126C1562.08 968.995 1559.9 965.301 1556.97 962.352L1553.52 963.475C1551.53 961.758 1549.22 960.406 1546.69 959.522L1545.94 955.976C1543.95 955.452 1541.86 955.173 1539.71 955.173C1537.56 955.173 1535.48 955.452 1533.49 955.975L1532.74 959.521C1530.21 960.405 1527.9 961.758 1525.9 963.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1525.9 963.474L1522.46 962.352C1519.53 965.3 1517.35 968.994 1516.23 973.124L1518.93 975.55C1518.69 976.829 1518.56 978.15 1518.56 979.5C1518.56 980.85 1518.69 982.17 1518.93 983.45L1516.23 985.875C1517.35 990.006 1519.53 993.7 1522.46 996.648L1525.9 995.525C1527.9 997.242 1530.21 998.594 1532.74 999.478L1533.49 1003.02C1535.48 1003.55 1537.56 1003.83 1539.71 1003.83C1541.86 1003.83 1543.95 1003.55 1545.94 1003.02L1546.69 999.477C1549.22 998.593 1551.53 997.241 1553.52 995.525L1556.97 996.647C1559.9 993.699 1562.08 990.004 1563.2 985.874L1560.5 983.448C1560.74 982.169 1560.87 980.849 1560.87 979.5C1560.87 978.15 1560.74 976.831 1560.5 975.552L1563.2 973.126C1562.08 968.995 1559.9 965.301 1556.97 962.352L1553.52 963.475C1551.53 961.758 1549.22 960.406 1546.69 959.522L1545.94 955.976C1543.95 955.452 1541.86 955.173 1539.71 955.173C1537.56 955.173 1535.48 955.452 1533.49 955.975L1532.74 959.521C1530.21 960.405 1527.9 961.758 1525.9 963.474Z"
              ></path>
              <path
                className="st52"
                d="M1522.46 962.352L1523.08 960.45L1521.91 960.069L1521.04 960.942L1522.46 962.352ZM1525.9 963.474L1525.29 965.376L1526.36 965.725L1527.21 964.989L1525.9 963.474ZM1516.23 973.124L1514.3 972.601L1513.98 973.789L1514.89 974.611L1516.23 973.124ZM1518.93 975.55L1520.89 975.921L1521.1 974.815L1520.27 974.063L1518.93 975.55ZM1518.93 983.45L1520.27 984.937L1521.1 984.184L1520.89 983.079L1518.93 983.45ZM1516.23 985.875L1514.89 984.388L1513.98 985.211L1514.3 986.398L1516.23 985.875ZM1522.46 996.648L1521.04 998.057L1521.91 998.93L1523.08 998.549L1522.46 996.648ZM1525.9 995.525L1527.21 994.011L1526.36 993.275L1525.29 993.624L1525.9 995.525ZM1532.74 999.478L1534.7 999.063L1534.47 997.961L1533.4 997.59L1532.74 999.478ZM1533.49 1003.02L1531.54 1003.44L1531.79 1004.64L1532.98 1004.96L1533.49 1003.02ZM1545.94 1003.02L1546.45 1004.96L1547.64 1004.64L1547.89 1003.44L1545.94 1003.02ZM1546.69 999.477L1546.03 997.589L1544.96 997.96L1544.73 999.063L1546.69 999.477ZM1553.52 995.525L1554.14 993.623L1553.07 993.274L1552.22 994.01L1553.52 995.525ZM1556.97 996.647L1556.35 998.549L1557.52 998.93L1558.39 998.057L1556.97 996.647ZM1563.2 985.874L1565.13 986.396L1565.45 985.209L1564.53 984.386L1563.2 985.874ZM1560.5 983.448L1558.53 983.077L1558.33 984.183L1559.16 984.935L1560.5 983.448ZM1560.5 975.552L1559.16 974.064L1558.33 974.817L1558.53 975.923L1560.5 975.552ZM1563.2 973.126L1564.53 974.613L1565.45 973.791L1565.13 972.603L1563.2 973.126ZM1556.97 962.352L1558.39 960.943L1557.52 960.07L1556.35 960.451L1556.97 962.352ZM1553.52 963.475L1552.22 964.989L1553.07 965.726L1554.14 965.376L1553.52 963.475ZM1546.69 959.522L1544.73 959.937L1544.96 961.039L1546.03 961.411L1546.69 959.522ZM1545.94 955.976L1547.89 955.561L1547.64 954.356L1546.45 954.042L1545.94 955.976ZM1533.49 955.975L1532.98 954.041L1531.79 954.355L1531.54 955.561L1533.49 955.975ZM1532.74 959.521L1533.4 961.41L1534.47 961.039L1534.7 959.936L1532.74 959.521ZM1521.84 964.254L1525.29 965.376L1526.52 961.573L1523.08 960.45L1521.84 964.254ZM1518.16 973.647C1519.19 969.86 1521.19 966.469 1523.88 963.762L1521.04 960.942C1517.87 964.13 1515.51 968.128 1514.3 972.601L1518.16 973.647ZM1520.27 974.063L1517.57 971.637L1514.89 974.611L1517.59 977.037L1520.27 974.063ZM1520.56 979.5C1520.56 978.275 1520.67 977.079 1520.89 975.921L1516.96 975.179C1516.7 976.58 1516.56 978.025 1516.56 979.5H1520.56ZM1520.89 983.079C1520.67 981.921 1520.56 980.725 1520.56 979.5H1516.56C1516.56 980.975 1516.7 982.42 1516.96 983.821L1520.89 983.079ZM1517.57 987.362L1520.27 984.937L1517.59 981.963L1514.89 984.388L1517.57 987.362ZM1523.88 995.238C1521.19 992.53 1519.19 989.14 1518.16 985.352L1514.3 986.398C1515.51 990.872 1517.87 994.869 1521.04 998.057L1523.88 995.238ZM1525.29 993.624L1521.84 994.746L1523.08 998.549L1526.52 997.427L1525.29 993.624ZM1533.4 997.59C1531.11 996.79 1529.01 995.566 1527.21 994.011L1524.6 997.04C1526.78 998.918 1529.31 1000.4 1532.08 1001.37L1533.4 997.59ZM1535.45 1002.61L1534.7 999.063L1530.79 999.893L1531.54 1003.44L1535.45 1002.61ZM1539.71 1001.83C1537.74 1001.83 1535.82 1001.57 1534 1001.09L1532.98 1004.96C1535.13 1005.53 1537.39 1005.83 1539.71 1005.83V1001.83ZM1545.43 1001.09C1543.6 1001.57 1541.69 1001.83 1539.71 1001.83V1005.83C1542.04 1005.83 1544.29 1005.52 1546.45 1004.96L1545.43 1001.09ZM1544.73 999.063L1543.98 1002.61L1547.89 1003.44L1548.64 999.892L1544.73 999.063ZM1552.22 994.01C1550.41 995.565 1548.32 996.789 1546.03 997.589L1547.35 1001.37C1550.12 1000.4 1552.65 998.917 1554.83 997.039L1552.22 994.01ZM1557.59 994.745L1554.14 993.623L1552.9 997.426L1556.35 998.549L1557.59 994.745ZM1561.27 985.351C1560.24 989.139 1558.24 992.53 1555.55 995.237L1558.39 998.057C1561.56 994.868 1563.92 990.87 1565.13 986.396L1561.27 985.351ZM1559.16 984.935L1561.86 987.361L1564.53 984.386L1561.84 981.961L1559.16 984.935ZM1558.87 979.5C1558.87 980.724 1558.75 981.92 1558.53 983.077L1562.47 983.819C1562.73 982.418 1562.87 980.974 1562.87 979.5H1558.87ZM1558.53 975.923C1558.75 977.08 1558.87 978.276 1558.87 979.5H1562.87C1562.87 978.025 1562.73 976.581 1562.47 975.18L1558.53 975.923ZM1561.86 971.639L1559.16 974.064L1561.84 977.039L1564.53 974.613L1561.86 971.639ZM1555.55 963.762C1558.24 966.47 1560.24 969.861 1561.27 973.649L1565.13 972.603C1563.92 968.129 1561.56 964.131 1558.39 960.943L1555.55 963.762ZM1554.14 965.376L1557.59 964.254L1556.35 960.451L1552.9 961.573L1554.14 965.376ZM1546.03 961.411C1548.32 962.21 1550.41 963.434 1552.22 964.989L1554.83 961.96C1552.65 960.083 1550.12 958.602 1547.35 957.634L1546.03 961.411ZM1543.98 956.39L1544.73 959.937L1548.64 959.108L1547.89 955.561L1543.98 956.39ZM1539.71 957.173C1541.69 957.173 1543.6 957.429 1545.43 957.91L1546.45 954.042C1544.29 953.475 1542.04 953.173 1539.71 953.173V957.173ZM1534 957.909C1535.82 957.429 1537.74 957.173 1539.71 957.173V953.173C1537.39 953.173 1535.13 953.474 1532.98 954.041L1534 957.909ZM1534.7 959.936L1535.45 956.39L1531.54 955.561L1530.79 959.107L1534.7 959.936ZM1527.21 964.989C1529.01 963.433 1531.11 962.209 1533.4 961.41L1532.08 957.633C1529.31 958.601 1526.78 960.082 1524.6 961.96L1527.21 964.989Z"
                mask="url(#implant_74)"
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
              transform="matrix(-1 0 0 1 1539.5 979.5)"
            ></circle>
            <path
              className="st45"
              d="M1541.42 970.739C1540.87 968.804 1538.13 968.804 1537.58 970.739L1537.07 972.511C1536.77 973.549 1535.71 974.164 1534.66 973.902L1532.87 973.454C1530.92 972.965 1529.55 975.339 1530.95 976.785L1532.23 978.109C1532.98 978.884 1532.98 980.116 1532.23 980.891L1530.95 982.215C1529.55 983.661 1530.92 986.035 1532.87 985.546L1534.66 985.098C1535.71 984.836 1536.77 985.451 1537.07 986.489L1537.58 988.261C1538.13 990.196 1540.87 990.196 1541.42 988.261L1541.93 986.489C1542.23 985.451 1543.29 984.836 1544.34 985.098L1546.13 985.546C1548.08 986.035 1549.45 983.661 1548.05 982.215L1546.77 980.891C1546.02 980.116 1546.02 978.884 1546.77 978.109L1548.05 976.785C1549.45 975.339 1548.08 972.965 1546.13 973.454L1544.34 973.902C1543.29 974.164 1542.23 973.549 1541.93 972.511L1541.42 970.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth74Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth74Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1607.65 970.069L1607.65 970.062L1607.64 970.055C1607.01 968.401 1606.41 966.764 1605.82 965.144C1604.31 961.034 1602.85 957.031 1601.07 953.114L1601.06 953.107L1601.06 953.1C1598.68 947.641 1595.67 942.044 1590.18 938.006L1590.18 938.005C1586.13 935.013 1581.07 933.056 1575.65 931.774L1575.65 931.774L1575.64 931.772C1570.83 930.593 1565.8 930.098 1560.72 929.799C1555.67 929.502 1550.55 929.603 1545.55 930.485C1544.43 930.691 1543.3 930.942 1542.15 931.196C1539.55 931.769 1536.89 932.358 1534.13 932.499L1534.13 932.499C1530.7 932.662 1527.32 932.114 1524.07 931.588C1523.21 931.449 1522.37 931.312 1521.53 931.19L1521.53 931.19L1521.52 931.188C1511.6 929.601 1501.33 929.63 1492.9 933.508C1484.11 937.565 1479.15 944.815 1475.9 952.49L1475.9 952.491C1473.19 958.881 1471.52 965.565 1469.85 972.249L1469.75 972.643C1469.66 972.999 1469.57 973.354 1469.48 973.709C1467.75 980.601 1466.06 987.325 1467.16 993.936C1467.74 997.394 1469.09 1000.79 1470.86 1004.13L1470.86 1004.13C1472.72 1007.65 1475.03 1010.92 1478.47 1013.5C1482.68 1016.56 1487.98 1018.21 1493.81 1018.4C1495.9 1018.46 1497.97 1018.34 1500.07 1018.21C1501.3 1018.14 1502.54 1018.06 1503.81 1018.03C1507.16 1017.92 1510.55 1018.09 1513.75 1019.37L1513.76 1019.37L1513.76 1019.38C1515.05 1019.91 1516.18 1020.6 1517.25 1021.3C1517.59 1021.52 1517.91 1021.74 1518.23 1021.96C1518.95 1022.43 1519.64 1022.9 1520.38 1023.34C1524.58 1025.72 1529.99 1026.7 1535.41 1026.9C1544.78 1027.2 1554.06 1025.42 1561.24 1020.95C1562.88 1019.91 1564.36 1018.76 1565.86 1017.59C1566.62 1017 1567.39 1016.4 1568.19 1015.81C1570.54 1014.07 1573.06 1012.45 1576.16 1011.45C1578.79 1010.56 1581.59 1010.25 1584.29 1009.99C1584.49 1009.97 1584.68 1009.96 1584.87 1009.94C1587.41 1009.69 1589.84 1009.46 1592.11 1008.84L1592.12 1008.83C1596.79 1007.59 1600.65 1004.82 1603.88 1001.68C1607.82 997.846 1610.85 993.525 1611.69 988.921C1612.78 982.954 1610.42 977.04 1608 970.963C1607.88 970.665 1607.77 970.368 1607.65 970.069Z"
            ></path>
            <path
              className="st47"
              d="M1588.66 972.549L1588.65 972.542L1588.65 972.535C1588.19 971.313 1587.76 970.106 1587.32 968.912C1586.23 965.895 1585.17 962.965 1583.88 960.095L1583.87 960.088L1583.87 960.081C1582.14 956.077 1579.97 952.016 1576.05 949.09L1576.05 949.089C1573.14 946.92 1569.5 945.492 1565.58 944.555L1565.58 944.555L1565.57 944.553C1562.1 943.693 1558.46 943.329 1554.77 943.11C1551.11 942.893 1547.42 942.967 1543.81 943.61C1543.02 943.758 1542.2 943.94 1541.37 944.126C1539.48 944.549 1537.5 944.99 1535.47 945.096L1535.46 945.096C1532.94 945.217 1530.44 944.808 1528.08 944.42C1527.46 944.319 1526.85 944.219 1526.25 944.13L1526.24 944.128C1519.05 942.965 1511.65 942.995 1505.59 945.812C1499.28 948.755 1495.71 954.017 1493.36 959.629L1493.36 959.63C1491.4 964.309 1490.19 969.207 1488.97 974.128L1488.9 974.409C1488.84 974.665 1488.78 974.921 1488.71 975.176C1487.45 980.259 1486.24 985.155 1487.03 989.962C1487.44 992.468 1488.41 994.937 1489.69 997.381L1489.69 997.382C1491.03 999.95 1492.69 1002.31 1495.15 1004.18C1498.16 1006.39 1501.95 1007.59 1506.14 1007.73C1507.66 1007.77 1509.13 1007.68 1510.65 1007.59C1511.54 1007.54 1512.46 1007.48 1513.4 1007.45C1515.85 1007.38 1518.36 1007.5 1520.74 1008.46L1520.75 1008.46L1520.75 1008.47C1521.71 1008.87 1522.55 1009.39 1523.33 1009.91C1523.58 1010.07 1523.82 1010.23 1524.06 1010.39C1524.57 1010.74 1525.07 1011.08 1525.6 1011.39C1528.59 1013.11 1532.47 1013.83 1536.39 1013.98C1543.17 1014.19 1549.86 1012.89 1555.02 1009.65C1556.2 1008.88 1557.25 1008.06 1558.34 1007.2C1558.9 1006.76 1559.46 1006.32 1560.06 1005.88C1561.77 1004.59 1563.63 1003.38 1565.93 1002.63C1567.87 1001.97 1569.94 1001.74 1571.9 1001.55C1572.04 1001.53 1572.18 1001.52 1572.32 1001.51C1574.17 1001.33 1575.91 1001.16 1577.54 1000.7L1577.54 1000.7L1577.55 1000.7C1580.88 999.808 1583.65 997.802 1585.98 995.514C1588.82 992.709 1590.98 989.579 1591.59 986.27C1592.36 981.958 1590.67 977.673 1588.91 973.182C1588.82 972.972 1588.74 972.761 1588.66 972.549Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1538.78 979)"
            ></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth74Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1607.65 970.068L1607.64 970.061L1607.64 970.054C1607.01 968.4 1606.41 966.763 1605.82 965.143C1604.31 961.033 1602.85 957.03 1601.07 953.113L1601.06 953.106L1601.06 953.099C1598.68 947.64 1595.67 942.043 1590.18 938.005L1590.18 938.004C1586.13 935.012 1581.07 933.055 1575.65 931.773L1575.65 931.773L1575.64 931.771C1570.83 930.592 1565.8 930.097 1560.72 929.798C1555.67 929.501 1550.55 929.602 1545.55 930.484C1544.43 930.69 1543.3 930.941 1542.15 931.195C1539.55 931.768 1536.88 932.357 1534.13 932.498L1534.12 932.498C1530.7 932.661 1527.32 932.113 1524.07 931.587C1523.21 931.448 1522.37 931.311 1521.53 931.189L1521.53 931.189L1521.52 931.187C1511.6 929.6 1501.33 929.629 1492.9 933.507C1484.11 937.564 1479.15 944.814 1475.9 952.489L1475.9 952.49C1473.19 958.88 1471.52 965.564 1469.85 972.248L1469.75 972.642C1469.66 972.998 1469.57 973.353 1469.48 973.708C1467.75 980.6 1466.06 987.324 1467.16 993.935C1467.74 997.393 1469.09 1000.79 1470.86 1004.13L1470.86 1004.13C1472.72 1007.65 1475.03 1010.91 1478.47 1013.5C1482.68 1016.56 1487.98 1018.21 1493.81 1018.4C1495.9 1018.46 1497.97 1018.34 1500.07 1018.21C1501.3 1018.14 1502.54 1018.06 1503.81 1018.02C1507.16 1017.92 1510.55 1018.09 1513.75 1019.37L1513.76 1019.37L1513.76 1019.38C1515.05 1019.91 1516.18 1020.6 1517.25 1021.3C1517.59 1021.52 1517.91 1021.74 1518.23 1021.95C1518.95 1022.43 1519.64 1022.9 1520.38 1023.33C1524.58 1025.72 1529.99 1026.7 1535.41 1026.9C1544.78 1027.2 1554.06 1025.42 1561.24 1020.95C1562.88 1019.91 1564.36 1018.76 1565.86 1017.59C1566.62 1017 1567.39 1016.4 1568.19 1015.81C1570.54 1014.07 1573.06 1012.45 1576.16 1011.45C1578.79 1010.56 1581.59 1010.25 1584.29 1009.99C1584.49 1009.97 1584.68 1009.95 1584.87 1009.94C1587.41 1009.69 1589.84 1009.46 1592.11 1008.84L1592.12 1008.83C1596.79 1007.59 1600.65 1004.82 1603.88 1001.68C1607.82 997.845 1610.85 993.524 1611.69 988.92C1612.78 982.953 1610.42 977.039 1608 970.962C1607.88 970.664 1607.77 970.367 1607.65 970.068Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1588.66 972.549L1588.65 972.542L1588.65 972.535C1588.19 971.313 1587.76 970.106 1587.32 968.912C1586.23 965.895 1585.17 962.965 1583.88 960.095L1583.87 960.088L1583.87 960.081C1582.14 956.077 1579.97 952.016 1576.05 949.09L1576.05 949.089C1573.14 946.92 1569.5 945.492 1565.58 944.555L1565.58 944.555L1565.57 944.553C1562.1 943.693 1558.46 943.329 1554.77 943.11C1551.11 942.893 1547.42 942.967 1543.81 943.61C1543.02 943.758 1542.2 943.94 1541.37 944.126C1539.48 944.549 1537.5 944.99 1535.47 945.096L1535.46 945.096C1532.94 945.217 1530.44 944.808 1528.08 944.42C1527.46 944.319 1526.85 944.219 1526.25 944.13L1526.24 944.128C1519.05 942.965 1511.65 942.995 1505.59 945.812C1499.28 948.755 1495.71 954.017 1493.36 959.629L1493.36 959.63C1491.4 964.309 1490.19 969.207 1488.97 974.128L1488.9 974.409C1488.84 974.665 1488.78 974.921 1488.71 975.176C1487.45 980.259 1486.24 985.155 1487.03 989.962C1487.44 992.468 1488.41 994.937 1489.69 997.381L1489.69 997.382C1491.03 999.95 1492.69 1002.31 1495.15 1004.18C1498.16 1006.39 1501.95 1007.59 1506.14 1007.73C1507.66 1007.77 1509.13 1007.68 1510.65 1007.59C1511.54 1007.54 1512.46 1007.48 1513.4 1007.45C1515.85 1007.38 1518.36 1007.5 1520.74 1008.46L1520.74 1008.46L1520.75 1008.47C1521.71 1008.87 1522.55 1009.39 1523.33 1009.91C1523.58 1010.07 1523.82 1010.23 1524.06 1010.39C1524.57 1010.74 1525.07 1011.08 1525.6 1011.39C1528.59 1013.11 1532.47 1013.83 1536.39 1013.98C1543.17 1014.19 1549.86 1012.89 1555.02 1009.65C1556.2 1008.88 1557.25 1008.06 1558.34 1007.2C1558.9 1006.76 1559.46 1006.32 1560.06 1005.88C1561.77 1004.59 1563.63 1003.38 1565.93 1002.63C1567.87 1001.97 1569.94 1001.74 1571.9 1001.55C1572.04 1001.53 1572.18 1001.52 1572.32 1001.51C1574.17 1001.33 1575.91 1001.16 1577.54 1000.7L1577.54 1000.7L1577.55 1000.7C1580.88 999.808 1583.65 997.802 1585.98 995.514C1588.82 992.709 1590.98 989.579 1591.58 986.27C1592.36 981.958 1590.67 977.673 1588.91 973.182C1588.82 972.972 1588.74 972.761 1588.66 972.549Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1538.78 979)"
              style={{ fill: 'black', opacity: tooth74Diagnozis.pin ? 1 : 0 }}
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth74Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth74Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1607.65 970.069L1607.65 970.062L1607.64 970.055C1607.01 968.401 1606.41 966.764 1605.82 965.144C1604.31 961.034 1602.85 957.031 1601.07 953.114L1601.06 953.107L1601.06 953.1C1598.68 947.641 1595.67 942.044 1590.18 938.006L1590.18 938.005C1586.13 935.013 1581.07 933.056 1575.65 931.774L1575.65 931.774L1575.64 931.772C1570.83 930.593 1565.8 930.098 1560.72 929.799C1555.67 929.502 1550.55 929.603 1545.55 930.485C1544.43 930.691 1543.3 930.942 1542.15 931.196C1539.55 931.769 1536.89 932.358 1534.13 932.499L1534.13 932.499C1530.7 932.662 1527.32 932.114 1524.07 931.588C1523.21 931.449 1522.37 931.312 1521.53 931.19L1521.53 931.19L1521.52 931.188C1511.6 929.601 1501.33 929.63 1492.9 933.508C1484.11 937.565 1479.15 944.815 1475.9 952.49L1475.9 952.491C1473.19 958.881 1471.52 965.565 1469.85 972.249L1469.75 972.643C1469.66 972.999 1469.57 973.354 1469.48 973.709C1467.75 980.601 1466.06 987.325 1467.16 993.936C1467.74 997.394 1469.09 1000.79 1470.86 1004.13L1470.86 1004.13C1472.72 1007.65 1475.03 1010.92 1478.47 1013.5C1482.68 1016.56 1487.98 1018.21 1493.81 1018.4C1495.9 1018.46 1497.97 1018.34 1500.07 1018.21C1501.3 1018.14 1502.54 1018.06 1503.81 1018.03C1507.16 1017.92 1510.55 1018.09 1513.75 1019.37L1513.76 1019.37L1513.76 1019.38C1515.05 1019.91 1516.18 1020.6 1517.25 1021.3C1517.59 1021.52 1517.91 1021.74 1518.23 1021.96C1518.95 1022.43 1519.64 1022.9 1520.38 1023.34C1524.58 1025.72 1529.99 1026.7 1535.41 1026.9C1544.78 1027.2 1554.06 1025.42 1561.24 1020.95C1562.88 1019.91 1564.36 1018.76 1565.86 1017.59C1566.62 1017 1567.39 1016.4 1568.19 1015.81C1570.54 1014.07 1573.06 1012.45 1576.16 1011.45C1578.79 1010.56 1581.59 1010.25 1584.29 1009.99C1584.49 1009.97 1584.68 1009.96 1584.87 1009.94C1587.41 1009.69 1589.84 1009.46 1592.11 1008.84L1592.12 1008.83C1596.79 1007.59 1600.65 1004.82 1603.88 1001.68C1607.82 997.846 1610.85 993.525 1611.69 988.921C1612.78 982.954 1610.42 977.04 1608 970.963C1607.88 970.665 1607.77 970.368 1607.65 970.069Z"
            ></path>
            <path
              className="st47"
              d="M1588.66 972.549L1588.65 972.542L1588.65 972.535C1588.19 971.313 1587.76 970.106 1587.32 968.912C1586.23 965.895 1585.17 962.965 1583.88 960.095L1583.87 960.088L1583.87 960.081C1582.14 956.077 1579.97 952.016 1576.05 949.09L1576.05 949.089C1573.14 946.92 1569.5 945.492 1565.58 944.555L1565.58 944.555L1565.57 944.553C1562.1 943.693 1558.46 943.329 1554.77 943.11C1551.11 942.893 1547.42 942.967 1543.81 943.61C1543.02 943.758 1542.2 943.94 1541.37 944.126C1539.48 944.549 1537.5 944.99 1535.47 945.096L1535.46 945.096C1532.94 945.217 1530.44 944.808 1528.08 944.42C1527.46 944.319 1526.85 944.219 1526.25 944.13L1526.24 944.128C1519.05 942.965 1511.65 942.995 1505.59 945.812C1499.28 948.755 1495.71 954.017 1493.36 959.629L1493.36 959.63C1491.4 964.309 1490.19 969.207 1488.97 974.128L1488.9 974.409C1488.84 974.665 1488.78 974.921 1488.71 975.176C1487.45 980.259 1486.24 985.155 1487.03 989.962C1487.44 992.468 1488.41 994.937 1489.69 997.381L1489.69 997.382C1491.03 999.95 1492.69 1002.31 1495.15 1004.18C1498.16 1006.39 1501.95 1007.59 1506.14 1007.73C1507.66 1007.77 1509.13 1007.68 1510.65 1007.59C1511.54 1007.54 1512.46 1007.48 1513.4 1007.45C1515.85 1007.38 1518.36 1007.5 1520.74 1008.46L1520.75 1008.46L1520.75 1008.47C1521.71 1008.87 1522.55 1009.39 1523.33 1009.91C1523.58 1010.07 1523.82 1010.23 1524.06 1010.39C1524.57 1010.74 1525.07 1011.08 1525.6 1011.39C1528.59 1013.11 1532.47 1013.83 1536.39 1013.98C1543.17 1014.19 1549.86 1012.89 1555.02 1009.65C1556.2 1008.88 1557.25 1008.06 1558.34 1007.2C1558.9 1006.76 1559.46 1006.32 1560.06 1005.88C1561.77 1004.59 1563.63 1003.38 1565.93 1002.63C1567.87 1001.97 1569.94 1001.74 1571.9 1001.55C1572.04 1001.53 1572.18 1001.52 1572.32 1001.51C1574.17 1001.33 1575.91 1001.16 1577.54 1000.7L1577.54 1000.7L1577.55 1000.7C1580.88 999.808 1583.65 997.802 1585.98 995.514C1588.82 992.709 1590.98 989.579 1591.59 986.27C1592.36 981.958 1590.67 977.673 1588.91 973.182C1588.82 972.972 1588.74 972.761 1588.66 972.549Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth74Diagnozis.culttab &&
                !tooth74Diagnozis.abutment &&
                !tooth74Diagnozis.implant &&
                !tooth74Diagnozis.apex &&
                !tooth74Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1614.3,969.3c-2.5-8-4.6-16-7.4-23.9c-1.5-4.3-3.2-8.8-5.6-12.8
                            c-1.8-3.3-4.1-6.4-6.8-9c-4.5-4.4-10.3-7.2-16.3-9.1c-5.3-1.7-10.9-2.5-16.5-2.9c-5.6-0.4-11.3-0.4-16.8,0.8
                            c-4.1,0.9-8.1,2.4-12.3,2.7c-4.6,0.3-9-1-13.5-2c-10.9-2.3-22.3-2.4-31.8,3.1c-4.6,2.7-8.2,6.4-11.2,10.8
                            c-3.3,4.9-5.8,10.6-7.6,16.3c-3,9.2-4.7,18.8-6.5,28.3c-1.9,10-4,20.1-2.6,30.2c0.7,5,2.2,10,4.2,14.8c1.6,3.9,3.6,7.7,6.3,11
                            c0.8,0.9,1.6,1.8,2.4,2.7c4.8,4.6,10.9,7,17.4,7.3c7.3,0.4,14.8-2,21.3,1.4c2.7,1.4,4.7,3.7,7.2,5.5c4.8,3.6,10.9,5,17,5.3
                            c10.2,0.6,20.6-1.8,28.6-8.2c5.4-4.3,9.5-10.3,15.9-12.9c5.5-2.2,11.7-1.6,17.3-3.4c3.9-1.3,7.2-3.8,10.1-6.7
                            c1.1-1.1,2.1-2.3,3.1-3.5c4.3-5.4,7.7-11.6,8.6-18.5C1620.2,987.2,1617,978.2,1614.3,969.3z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth74.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1619.69 1000.46C1618.71 1007.64 1617.33 1012.17 1612.98 1017.88C1609.39 1022.57 1601.88 1028.08 1596.55 1029.98C1591 1032.03 1584.74 1032.56 1579.3 1035.05C1572.88 1037.83 1572.86 1041.34 1567.42 1046.02C1563.74 1049.1 1554.42 1052.32 1550.01 1053.78C1544.76 1055.52 1539.15 1055.19 1533.53 1054.95C1527.55 1054.66 1518.46 1053.19 1513.67 1049.53C1511.28 1047.63 1508.05 1044.82 1505.44 1043.35C1498.91 1039.84 1495.56 1043.8 1488.27 1043.51C1481.75 1043.21 1471.76 1035.72 1466.98 1031.04C1463.06 1027.09 1461.39 1022.11 1459.33 1016.84C1457.37 1011.86 1457.85 1006.74 1457.19 1001.46C1456.5 995.882 1456.84 990.259 1457.55 984.637C1458.18 979.644 1459.1 974.653 1460.02 969.694C1461.01 964.364 1459.05 958.993 1460.23 953.669C1461.25 949.048 1463.35 944.463 1464.77 939.973C1466.53 934.356 1467.83 928.846 1470.82 923.965C1473.92 918.921 1481.83 913.548 1486.86 910.423C1491.86 907.327 1497.41 905.604 1503.14 905.262C1508.25 904.957 1513.5 905.541 1518.63 906.645C1523.09 907.524 1527.55 910.105 1532.12 909.812C1536.36 909.52 1540.28 906.645 1544.41 905.62C1549.96 904.302 1555.62 905.42 1561.17 905.859C1566.72 906.299 1573.32 904.503 1578.65 906.259C1584.63 908.163 1591.35 913.619 1595.91 918.158C1598.74 920.959 1601.87 924.246 1603.72 927.757C1605.92 931.953 1607.63 936.467 1609.05 940.851C1610.05 943.95 1610.92 947.092 1611.82 950.27C1613.26 955.349 1612.69 959.253 1614.23 964.477C1615.57 969.025 1617.99 973.908 1618.93 978.581C1619.89 983.385 1620.35 995.566 1619.69 1000.46ZM1613 989.098C1614.2 982.498 1611.4 975.999 1608.9 969.699C1606.6 963.899 1604.7 958.199 1602.3 952.699C1599.9 947.199 1596.8 941.399 1591.1 937.199C1586.9 934.099 1581.7 932.099 1576.2 930.799C1571.3 929.599 1566.2 929.099 1561.1 928.799C1556 928.499 1550.8 928.599 1545.7 929.499C1541.9 930.199 1538.3 931.299 1534.4 931.499C1530.2 931.699 1526.1 930.799 1522 930.199C1512 928.599 1501.5 928.598 1492.8 932.598C1483.7 936.798 1478.6 944.298 1475.3 952.098C1472.56 958.561 1470.87 965.312 1469.2 971.975L1469.1 972.399C1467.3 979.599 1465.3 986.898 1466.5 994.098C1467.1 997.698 1468.5 1001.2 1470.3 1004.6C1472.2 1008.2 1474.6 1011.6 1478.2 1014.3C1482.6 1017.5 1488.1 1019.2 1494.1 1019.4C1500.8 1019.6 1507.7 1017.9 1513.7 1020.3C1516.1 1021.3 1518 1022.9 1520.2 1024.2C1524.6 1026.7 1530.2 1027.7 1535.7 1027.9C1545.2 1028.2 1554.7 1026.4 1562.1 1021.8C1567.1 1018.6 1570.9 1014.3 1576.8 1012.4C1581.8 1010.7 1587.6 1011.2 1592.7 1009.8C1597.6 1008.5 1601.6 1005.6 1604.9 1002.4C1608.9 998.499 1612.1 993.998 1613 989.098Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1619.69 1000.46C1618.71 1007.64 1617.33 1012.17 1612.98 1017.88C1609.39 1022.57 1601.88 1028.08 1596.55 1029.98C1591 1032.03 1584.74 1032.56 1579.3 1035.05C1572.88 1037.83 1572.86 1041.34 1567.42 1046.02C1563.74 1049.1 1554.42 1052.32 1550.01 1053.78C1544.76 1055.52 1539.15 1055.19 1533.53 1054.95C1527.55 1054.66 1518.46 1053.19 1513.67 1049.53C1511.28 1047.63 1508.05 1044.82 1505.44 1043.35C1498.91 1039.84 1495.56 1043.8 1488.27 1043.51C1481.75 1043.21 1471.76 1035.72 1466.98 1031.04C1463.06 1027.09 1461.39 1022.11 1459.33 1016.84C1457.37 1011.86 1457.85 1006.74 1457.19 1001.46C1456.5 995.882 1456.84 990.259 1457.55 984.637C1458.18 979.644 1459.1 974.653 1460.02 969.694C1461.01 964.364 1459.05 958.993 1460.23 953.669C1461.25 949.048 1463.35 944.463 1464.77 939.973C1466.53 934.356 1467.83 928.846 1470.82 923.965C1473.92 918.921 1481.83 913.548 1486.86 910.423C1491.86 907.327 1497.41 905.604 1503.14 905.262C1508.25 904.957 1513.5 905.541 1518.63 906.645C1523.09 907.524 1527.55 910.105 1532.12 909.812C1536.36 909.52 1540.28 906.645 1544.41 905.62C1549.96 904.302 1555.62 905.42 1561.17 905.859C1566.72 906.299 1573.32 904.503 1578.65 906.259C1584.63 908.163 1591.35 913.619 1595.91 918.158C1598.74 920.959 1601.87 924.246 1603.72 927.757C1605.92 931.953 1607.63 936.467 1609.05 940.851C1610.05 943.95 1610.92 947.092 1611.82 950.27C1613.26 955.349 1612.69 959.253 1614.23 964.477C1615.57 969.025 1617.99 973.908 1618.93 978.581C1619.89 983.385 1620.35 995.566 1619.69 1000.46ZM1613 989.098C1614.2 982.498 1611.4 975.999 1608.9 969.699C1606.6 963.899 1604.7 958.199 1602.3 952.699C1599.9 947.199 1596.8 941.399 1591.1 937.199C1586.9 934.099 1581.7 932.099 1576.2 930.799C1571.3 929.599 1566.2 929.099 1561.1 928.799C1556 928.499 1550.8 928.599 1545.7 929.499C1541.9 930.199 1538.3 931.299 1534.4 931.499C1530.2 931.699 1526.1 930.799 1522 930.199C1512 928.599 1501.5 928.598 1492.8 932.598C1483.7 936.798 1478.6 944.298 1475.3 952.098C1472.56 958.561 1470.87 965.312 1469.2 971.975L1469.1 972.399C1467.3 979.599 1465.3 986.898 1466.5 994.098C1467.1 997.698 1468.5 1001.2 1470.3 1004.6C1472.2 1008.2 1474.6 1011.6 1478.2 1014.3C1482.6 1017.5 1488.1 1019.2 1494.1 1019.4C1500.8 1019.6 1507.7 1017.9 1513.7 1020.3C1516.1 1021.3 1518 1022.9 1520.2 1024.2C1524.6 1026.7 1530.2 1027.7 1535.7 1027.9C1545.2 1028.2 1554.7 1026.4 1562.1 1021.8C1567.1 1018.6 1570.9 1014.3 1576.8 1012.4C1581.8 1010.7 1587.6 1011.2 1592.7 1009.8C1597.6 1008.5 1601.6 1005.6 1604.9 1002.4C1608.9 998.499 1612.1 993.998 1613 989.098Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1615.7 996.021C1614.77 1001.7 1613.47 1002.91 1609.34 1007.43C1605.93 1011.13 1598.8 1015.49 1593.74 1017C1588.47 1018.62 1583.48 1019.04 1578.31 1021.01C1572.22 1023.21 1570.29 1025.19 1565.13 1028.9C1561.63 1031.33 1554.69 1033.09 1550.5 1034.25C1545.52 1035.62 1540.19 1036.15 1534.86 1035.96C1529.18 1035.73 1523.39 1034.57 1518.85 1031.68C1516.57 1030.17 1511.61 1030.32 1509.13 1029.16C1502.93 1026.38 1498.81 1026.35 1491.89 1026.12C1485.69 1025.89 1480.01 1023.92 1475.46 1020.21C1471.74 1017.08 1468.26 1013.14 1466.3 1008.97C1464.44 1005.04 1463 1000.98 1462.38 996.812C1461.72 992.396 1462.99 987.947 1463.67 983.499C1464.27 979.549 1464.19 975.6 1465.06 971.677C1466 967.461 1467.94 963.211 1469.06 958.999C1470.02 955.343 1470.12 951.716 1471.47 948.164C1473.14 943.72 1476.27 939.361 1479.12 935.499C1482.06 931.509 1485.77 928.049 1490.54 925.577C1495.29 923.128 1500.56 920.974 1506 920.703C1510.85 920.462 1515.84 920.923 1520.71 921.797C1524.94 922.492 1529.18 924.535 1533.51 924.303C1537.54 924.071 1541.26 921.797 1545.19 920.986C1550.45 919.944 1555.83 920.828 1561.09 921.176C1566.36 921.523 1572.63 920.102 1577.69 921.492C1583.37 922.998 1589.74 927.314 1594.08 930.905C1596.76 933.121 1596.89 935.722 1598.64 938.499C1600.74 941.819 1603.3 945.39 1604.65 948.859C1605.61 951.31 1605.48 953.796 1606.34 956.31C1607.7 960.328 1610.01 963.417 1611.47 967.55C1612.74 971.148 1614.09 975.802 1614.98 979.499C1615.9 983.3 1616.33 992.145 1615.7 996.021ZM1613 989.1C1614.2 982.5 1611.4 976 1608.9 969.7C1606.6 963.9 1604.7 958.2 1602.3 952.7C1599.9 947.2 1596.8 941.4 1591.1 937.2C1586.9 934.1 1581.7 932.1 1576.2 930.8C1571.3 929.6 1566.2 929.1 1561.1 928.8C1556 928.5 1550.8 928.6 1545.7 929.5C1541.9 930.2 1538.3 931.3 1534.4 931.5C1530.2 931.7 1526.1 930.8 1522 930.2C1512 928.6 1501.5 928.6 1492.8 932.6C1483.7 936.8 1478.6 944.3 1475.3 952.1C1472.5 958.7 1470.8 965.6 1469.1 972.4C1467.3 979.6 1465.3 986.9 1466.5 994.1C1467.1 997.7 1468.5 1001.2 1470.3 1004.6C1472.2 1008.2 1474.6 1011.6 1478.2 1014.3C1482.6 1017.5 1488.1 1019.2 1494.1 1019.4C1500.8 1019.6 1507.7 1017.9 1513.7 1020.3C1516.1 1021.3 1518 1022.9 1520.2 1024.2C1524.6 1026.7 1530.2 1027.7 1535.7 1027.9C1545.2 1028.2 1554.7 1026.4 1562.1 1021.8C1567.1 1018.6 1570.9 1014.3 1576.8 1012.4C1581.8 1010.7 1587.6 1011.2 1592.7 1009.8C1597.6 1008.5 1601.6 1005.6 1604.9 1002.4C1608.9 998.5 1612.1 994 1613 989.1Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth74Diagnozis.culttab &&
                !tooth74Diagnozis.abutment &&
                !tooth74Diagnozis.implant &&
                !tooth74Diagnozis.shaper &&
                !tooth74Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M1583.5,998.4c-1.4,2.7-3.2,5.3-5.5,7.8c-8.8,9.7-30.1,16.9-49,13.5c-18.9-3.4-29.9-15.8-33.5-23.1
                                c0,0,0,0,0,0c-3.6-7.3-2.6-21.9,0-33.9c0.8-3.7,2.5-7.1,4.7-9.9c4.8-6.3,12-10.3,17.8-10.9c8.4-0.8,20,0,20,0
                                c11,0.4,27.1,2.9,36,7.1c2.7,1.3,5,3.5,6.9,6.4c4.5,6.6,6.9,16,7.2,21.8C1588.4,983.3,1587.6,990.9,1583.5,998.4z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth74.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth74.seal_center ? `seal-fill ${teethDiagnozis.tooth74.seal_center_color}` : ''}
                                `}
                d="M1583.5,998.4c-1.4,2.7-3.2,5.3-5.5,7.8c-8.8,9.7-30.1,16.9-49,13.5c-18.9-3.4-29.9-15.8-33.5-23.1
                                c0,0,0,0,0,0c-3.6-7.3-2.6-21.9,0-33.9c0.8-3.7,2.5-7.1,4.7-9.9c4.8-6.3,12-10.3,17.8-10.9c8.4-0.8,20,0,20,0
                                c11,0.4,27.1,2.9,36,7.1c2.7,1.3,5,3.5,6.9,6.4c4.5,6.6,6.9,16,7.2,21.8C1588.4,983.3,1587.6,990.9,1583.5,998.4z"
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M1618.9,996.5c-1,6.9-4.3,13.1-8.6,18.5c-1,1.2-2,2.4-3.1,3.5c-3.3-1.8-8.2-4.9-13.9-9.9
                                c-4.2-3.6-7.4-7.2-9.7-10.1c4-7.5,4.9-15.1,4.6-21.2c-0.3-5.8-2.7-15.2-7.2-21.8c5.3-9.4,15-18.3,20.4-22.8
                                c2.3,4.1,4,8.5,5.6,12.8c2.7,7.8,4.9,15.8,7.4,23.9C1617,978.2,1620.2,987.2,1618.9,996.5z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth74.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth74.seal_left ? `seal-fill ${teethDiagnozis.tooth74.seal_left_color}` : ''}
                                `}
                d="M1618.9,996.5c-1,6.9-4.3,13.1-8.6,18.5c-1,1.2-2,2.4-3.1,3.5c-3.3-1.8-8.2-4.9-13.9-9.9
                                c-4.2-3.6-7.4-7.2-9.7-10.1c4-7.5,4.9-15.1,4.6-21.2c-0.3-5.8-2.7-15.2-7.2-21.8c5.3-9.4,15-18.3,20.4-22.8
                                c2.3,4.1,4,8.5,5.6,12.8c2.7,7.8,4.9,15.8,7.4,23.9C1617,978.2,1620.2,987.2,1618.9,996.5z"
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
                d="M1601.4,932.6c-5.3,4.5-15.1,13.4-20.4,22.8c-1.9-2.8-4.2-5.1-6.9-6.4c-9-4.2-25-6.7-36-7.1
                                c0,0-11.6-0.8-20,0c-5.8,0.5-13,4.5-17.8,10.9c-4.1-3-9.1-7.1-12.5-11.2c-3.4-4.2-7.8-9.9-11.5-14.7c2.9-4.3,6.6-8,11.2-10.8
                                c9.4-5.5,20.9-5.4,31.8-3.1c4.5,0.9,8.9,2.2,13.5,2c4.2-0.2,8.2-1.8,12.3-2.7c5.5-1.2,11.2-1.2,16.8-0.8
                                c5.6,0.4,11.1,1.3,16.5,2.9c6,1.9,11.7,4.8,16.3,9.1C1597.3,926.2,1599.5,929.3,1601.4,932.6z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth74.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth74.seal_top ? `seal-fill ${teethDiagnozis.tooth74.seal_top_color}` : ''}
                                `}
                d="M1601.4,932.6c-5.3,4.5-15.1,13.4-20.4,22.8c-1.9-2.8-4.2-5.1-6.9-6.4c-9-4.2-25-6.7-36-7.1
                                c0,0-11.6-0.8-20,0c-5.8,0.5-13,4.5-17.8,10.9c-4.1-3-9.1-7.1-12.5-11.2c-3.4-4.2-7.8-9.9-11.5-14.7c2.9-4.3,6.6-8,11.2-10.8
                                c9.4-5.5,20.9-5.4,31.8-3.1c4.5,0.9,8.9,2.2,13.5,2c4.2-0.2,8.2-1.8,12.3-2.7c5.5-1.2,11.2-1.2,16.8-0.8
                                c5.6,0.4,11.1,1.3,16.5,2.9c6,1.9,11.7,4.8,16.3,9.1C1597.3,926.2,1599.5,929.3,1601.4,932.6z"
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M1495.5,962.8c-2.7,12-3.6,26.6,0,33.9c-1.6,3.2-4.6,8.1-10.1,14.9c-5.3,6.6-10.9,12.1-15.5,16
                                c-2.7-3.3-4.6-7.1-6.3-11c-2-4.8-3.5-9.7-4.2-14.8c-1.4-10.1,0.7-20.2,2.6-30.2c1.8-9.5,3.5-19.1,6.5-28.3
                                c1.9-5.8,4.3-11.4,7.6-16.3c3.6,4.8,8.1,10.5,11.5,14.7c3.4,4.2,8.4,8.2,12.5,11.2C1498,955.7,1496.3,959,1495.5,962.8z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth74.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth74.seal_right ? `seal-fill ${teethDiagnozis.tooth74.seal_right_color}` : ''}
                                `}
                d="M1495.5,962.8c-2.7,12-3.6,26.6,0,33.9c-1.6,3.2-4.6,8.1-10.1,14.9c-5.3,6.6-10.9,12.1-15.5,16
                                c-2.7-3.3-4.6-7.1-6.3-11c-2-4.8-3.5-9.7-4.2-14.8c-1.4-10.1,0.7-20.2,2.6-30.2c1.8-9.5,3.5-19.1,6.5-28.3
                                c1.9-5.8,4.3-11.4,7.6-16.3c3.6,4.8,8.1,10.5,11.5,14.7c3.4,4.2,8.4,8.2,12.5,11.2C1498,955.7,1496.3,959,1495.5,962.8z"
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
                d="M1607.2,1018.5c-2.9,3-6.2,5.4-10.1,6.7c-5.6,1.9-11.8,1.2-17.3,3.4c-6.4,2.6-10.5,8.6-15.9,12.9
                                c-8,6.4-18.4,8.8-28.6,8.2c-6-0.3-12.1-1.8-17-5.3c-2.4-1.8-4.5-4-7.2-5.5c-6.5-3.5-14-1.1-21.3-1.4c-6.5-0.3-12.6-2.7-17.4-7.3
                                c-0.9-0.8-1.7-1.7-2.5-2.7c4.5-3.9,10.2-9.4,15.5-16c5.5-6.8,8.5-11.7,10.1-14.9c0,0,0,0,0,0c3.6,7.2,14.7,19.6,33.5,23.1
                                c18.9,3.4,40.2-3.8,49-13.5c2.3-2.5,4.1-5.2,5.5-7.8c2.4,3,5.6,6.5,9.7,10.1C1599,1013.5,1603.9,1016.6,1607.2,1018.5z"
              />
              <path
                className={`st8 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth74.caries_bottom ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth74.seal_bottom ? `seal-fill ${teethDiagnozis.tooth74.seal_bottom_color}` : ''}
                            `}
                d="M1607.2,1018.5c-2.9,3-6.2,5.4-10.1,6.7c-5.6,1.9-11.8,1.2-17.3,3.4c-6.4,2.6-10.5,8.6-15.9,12.9
                                c-8,6.4-18.4,8.8-28.6,8.2c-6-0.3-12.1-1.8-17-5.3c-2.4-1.8-4.5-4-7.2-5.5c-6.5-3.5-14-1.1-21.3-1.4c-6.5-0.3-12.6-2.7-17.4-7.3
                                c-0.9-0.8-1.7-1.7-2.5-2.7c4.5-3.9,10.2-9.4,15.5-16c5.5-6.8,8.5-11.7,10.1-14.9c0,0,0,0,0,0c3.6,7.2,14.7,19.6,33.5,23.1
                                c18.9,3.4,40.2-3.8,49-13.5c2.3-2.5,4.1-5.2,5.5-7.8c2.4,3,5.6,6.5,9.7,10.1C1599,1013.5,1603.9,1016.6,1607.2,1018.5z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_left &&
                      !tooth74Diagnozis.seal_bottom) ||
                    (!tooth74Diagnozis.seal_left &&
                      tooth74Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1585 999C1587 1002 1593.7 1009.6 1604.5 1016"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_left &&
                      !tooth74Diagnozis.seal_center) ||
                    (!tooth74Diagnozis.seal_left &&
                      tooth74Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1585 999C1589.67 993.833 1595.7 977.9 1582.5 955.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_left &&
                      !tooth74Diagnozis.seal_top) ||
                    (!tooth74Diagnozis.seal_left && tooth74Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1582.5 955.5C1583.5 952.333 1588.2 944 1599 936"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_center &&
                      !tooth74Diagnozis.seal_top) ||
                    (!tooth74Diagnozis.seal_center && tooth74Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1582.5 955.5C1574.5 945 1512.7 939.3 1501.5 952.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_right &&
                      !tooth74Diagnozis.seal_top) ||
                    (!tooth74Diagnozis.seal_right && tooth74Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1501.5 952.5C1497.5 953 1487.8 949.5 1481 931.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth74Diagnozis.seal_right &&
                      tooth74Diagnozis.seal_center) ||
                    (tooth74Diagnozis.seal_right &&
                      !tooth74Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1501.5 953.5C1495.5 959.5 1492.5 983.1 1496.5 997.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_right &&
                      !tooth74Diagnozis.seal_bottom) ||
                    (!tooth74Diagnozis.seal_right &&
                      tooth74Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1496.5 996.5C1494.17 1002 1486.6 1015.2 1475 1024"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_center &&
                      !tooth74Diagnozis.seal_bottom) ||
                    (!tooth74Diagnozis.seal_center &&
                      tooth74Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1496.5 996.5C1500.5 1009 1551 1032.6 1585 999"
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
                visibility: tooth74Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth74Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth74Diagnozis.vinir_color}`}
                d="M1459.4 1001.8C1460.1 1006.8 1461.6 1011.8 1463.6 1016.6C1465.2 1020.5 1467.2 1024.3 1469.9 1027.6L1472.3 1030.3C1477.1 1034.9 1483.2 1037.3 1489.7 1037.6C1497 1038 1504.5 1035.6 1511 1039C1513.7 1040.4 1515.7 1042.7 1518.2 1044.5C1523 1048.1 1529.1 1049.5 1535.2 1049.8C1545.4 1050.4 1555.8 1048 1563.8 1041.6C1569.2 1037.3 1573.3 1031.3 1579.7 1028.7C1585.2 1026.5 1591.4 1027.1 1597 1025.3C1600.9 1024 1604.2 1021.5 1607.1 1018.6C1608.2 1017.5 1609.2 1016.3 1610.2 1015.1C1614.5 1009.7 1617.9 1003.5 1618.8 996.6C1619.71 990.475 1618.67 984.52 1617.09 978.652C1613.8 978.94 1607.27 980.464 1607.46 984.258C1608.02 987.532 1608.21 990.848 1607.71 994.223C1606.93 1000.15 1604 1005.48 1600.3 1010.12C1599.44 1011.15 1598.57 1012.18 1597.63 1013.12C1595.13 1015.61 1592.29 1017.76 1588.93 1018.88C1584.1 1020.42 1578.76 1019.91 1574.02 1021.8C1568.51 1024.03 1564.98 1029.19 1560.33 1032.88C1553.43 1038.38 1544.48 1040.44 1535.69 1039.92C1530.43 1039.67 1525.18 1038.46 1521.04 1035.37C1518.89 1033.82 1517.17 1031.85 1514.84 1030.65C1509.24 1027.73 1502.78 1029.79 1496.49 1029.44C1490.89 1029.19 1485.64 1027.12 1481.5 1023.17L1479.44 1020.85C1477.11 1018.02 1475.39 1014.75 1474.01 1011.4C1472.29 1007.28 1470.99 1002.99 1470.39 998.69C1469.98 995.733 1469.92 992.777 1470.08 989.823C1469.35 986.482 1462.81 985.382 1459.64 985.25C1458.91 990.755 1458.63 996.278 1459.4 1001.8Z"
              ></path>
              <path
                className={`vinir-fill ${tooth74Diagnozis.vinir_color}`}
                d="M1469.9 1027.6C1467.2 1024.3 1465.2 1020.5 1463.6 1016.6C1461.6 1011.8 1460.1 1006.8 1459.4 1001.8C1458.63 996.278 1458.91 990.755 1459.64 985.25C1462.81 985.382 1469.35 986.482 1470.08 989.823C1469.92 992.777 1469.98 995.733 1470.39 998.69C1470.99 1002.99 1472.29 1007.28 1474.01 1011.4C1475.39 1014.75 1477.11 1018.02 1479.44 1020.85M1469.9 1027.6C1470.7 1028.5 1471.5 1029.4 1472.3 1030.3M1469.9 1027.6L1472.3 1030.3M1472.3 1030.3C1477.1 1034.9 1483.2 1037.3 1489.7 1037.6C1497 1038 1504.5 1035.6 1511 1039C1513.7 1040.4 1515.7 1042.7 1518.2 1044.5C1523 1048.1 1529.1 1049.5 1535.2 1049.8C1545.4 1050.4 1555.8 1048 1563.8 1041.6C1569.2 1037.3 1573.3 1031.3 1579.7 1028.7C1585.2 1026.5 1591.4 1027.1 1597 1025.3C1600.9 1024 1604.2 1021.5 1607.1 1018.6C1608.2 1017.5 1609.2 1016.3 1610.2 1015.1C1614.5 1009.7 1617.9 1003.5 1618.8 996.6C1619.71 990.475 1618.67 984.52 1617.09 978.652C1613.8 978.94 1607.27 980.464 1607.46 984.258C1608.02 987.532 1608.21 990.848 1607.71 994.223C1606.93 1000.15 1604 1005.48 1600.3 1010.12C1599.44 1011.15 1598.57 1012.18 1597.63 1013.12C1595.13 1015.61 1592.29 1017.76 1588.93 1018.88C1584.1 1020.42 1578.76 1019.91 1574.02 1021.8C1568.51 1024.03 1564.98 1029.19 1560.33 1032.88C1553.43 1038.38 1544.48 1040.44 1535.69 1039.92C1530.43 1039.67 1525.18 1038.46 1521.04 1035.37C1518.89 1033.82 1517.17 1031.85 1514.84 1030.65C1509.24 1027.73 1502.78 1029.79 1496.49 1029.44C1490.89 1029.19 1485.64 1027.12 1481.5 1023.17M1479.44 1020.85C1480.13 1021.63 1480.82 1022.4 1481.5 1023.17M1479.44 1020.85L1481.5 1023.17"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth74Diagnozis.temporary_crown ||
                tooth74Diagnozis.ceramic_crown ||
                tooth74Diagnozis.mceramic_crown ||
                tooth74Diagnozis.metalic_crown ||
                tooth74Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth74Diagnozis.temporary_crown ||
                tooth74Diagnozis.ceramic_crown ||
                tooth74Diagnozis.mceramic_crown ||
                tooth74Diagnozis.metalic_crown ||
                tooth74Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth74Diagnozis.ceramic_crown_color}
                                ${tooth74Diagnozis.mceramic_crown_color}
                                ${tooth74Diagnozis.metalic_crown_color}
                                ${tooth74Diagnozis.zirconia_crown_color}
                            `}
              d="M1614.3,969.3c-2.5-8-4.6-16-7.4-23.9c-1.5-4.3-3.2-8.8-5.6-12.8
                            c-1.8-3.3-4.1-6.4-6.8-9c-4.5-4.4-10.3-7.2-16.3-9.1c-5.3-1.7-10.9-2.5-16.5-2.9c-5.6-0.4-11.3-0.4-16.8,0.8
                            c-4.1,0.9-8.1,2.4-12.3,2.7c-4.6,0.3-9-1-13.5-2c-10.9-2.3-22.3-2.4-31.8,3.1c-4.6,2.7-8.2,6.4-11.2,10.8
                            c-3.3,4.9-5.8,10.6-7.6,16.3c-3,9.2-4.7,18.8-6.5,28.3c-1.9,10-4,20.1-2.6,30.2c0.7,5,2.2,10,4.2,14.8c1.6,3.9,3.6,7.7,6.3,11
                            c0.8,0.9,1.6,1.8,2.4,2.7c4.8,4.6,10.9,7,17.4,7.3c7.3,0.4,14.8-2,21.3,1.4c2.7,1.4,4.7,3.7,7.2,5.5c4.8,3.6,10.9,5,17,5.3
                            c10.2,0.6,20.6-1.8,28.6-8.2c5.4-4.3,9.5-10.3,15.9-12.9c5.5-2.2,11.7-1.6,17.3-3.4c3.9-1.3,7.2-3.8,10.1-6.7
                            c1.1-1.1,2.1-2.3,3.1-3.5c4.3-5.4,7.7-11.6,8.6-18.5C1620.2,987.2,1617,978.2,1614.3,969.3z"
            />
            <path
              className={`st3 fissure ${tooth74Diagnozis.fissure ? 'diagnoze' : tooth74Diagnozis.fissure ? 'hidden' : ''}`}
              d="M1573.3,1010.1c0.1-2.1,0.2-4.2-0.6-6.2c-1.1-3-3.6-4.9-6.1-6.7c-0.8-0.6-1.7-1.3-2.5-1.9
                            c-2.4-2-4.3-4.6-5.6-7.5c2.6-0.4,4.7-2.1,6.7-3.9c5.4-4.7,11.1-9,17-12.9l-0.6-0.9c-5.9,4-11.7,8.3-17.2,13.1
                            c-1.9,1.6-3.9,3.3-6.3,3.6c-2.7,0.3-5.3-1.3-7.7-2.9l-0.5-0.3c-5.6-3.6-11.7-6.3-18.1-8.1l-0.1,0c0.3-3.3-0.1-6.1-1.2-8.4
                            c-0.3-0.7-0.7-1.3-1-1.9c-0.9-1.6-1.7-3-1.6-4.8c0.2-1.8,1.4-3.1,2.7-4.5c0.9-1,1.9-2,2.5-3.3c1.7-3.4,0.5-7-0.6-10.5
                            c-0.2-0.6-0.4-1.2-0.6-1.8c-1.1-3.7-1.6-7.6-1.4-11.4l-1.1-0.1c-0.2,4,0.3,8,1.5,11.8c0.2,0.6,0.4,1.2,0.6,1.8
                            c1.1,3.3,2.2,6.6,0.7,9.7c-0.5,1.1-1.5,2.1-2.4,3c-1.4,1.5-2.8,3-3,5.2c-0.2,2.1,0.8,3.8,1.7,5.4c0.3,0.6,0.7,1.2,1,1.8
                            c1,2.2,1.3,4.9,1,8.2c-6.6,1.5-13,3.9-18.9,7.2l-0.4,0.2c-2,1.1-4,2.2-6.2,2c-3.5-0.3-5.3-3.4-7.3-6.6c-0.7-1.2-1.5-2.4-2.3-3.5
                            c-2.7-3.6-6.8-5.9-11.3-6.4l-0.1,1.1c4.2,0.4,8,2.6,10.5,5.9c0.8,1,1.5,2.2,2.2,3.4c2,3.3,4.1,6.8,8.1,7.1c2.6,0.2,4.7-1,6.8-2.1
                            l0.4-0.2c5.8-3.2,11.9-5.5,18.3-7c-0.5,3.4-1.4,6.8-2.4,10.1c-1.1,3.7-2.2,7.5-2.6,11.5c-0.3,3.6,0,7.2,0.2,10.4
                            c0.3,3.5,0.6,7.1,0.9,10.6l1.1-0.1c-0.3-3.5-0.6-7-0.9-10.6c-0.3-3.2-0.6-6.7-0.2-10.2c0.4-3.8,1.5-7.6,2.6-11.3
                            c1-3.5,2.1-7,2.5-10.7c6.3,1.8,12.2,4.4,17.7,7.9l0.5,0.3c2.4,1.5,4.8,3.1,7.6,3.1c0,0,0.1,0,0.1,0l-0.2,0.1
                            c1.4,3.1,3.4,5.9,6,8.2c0.8,0.7,1.7,1.3,2.5,2c2.4,1.8,4.7,3.5,5.7,6.2c0.7,1.8,0.6,3.9,0.5,5.8l0,1.1c-0.1,2.5,0.1,5,0.4,7.4
                            l1.1-0.1c-0.3-2.4-0.5-4.8-0.4-7.2L1573.3,1010.1z"
            />
          </g>
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{
              visibility:
                !tooth74Diagnozis.culttab &&
                !tooth74Diagnozis.abutment &&
                !tooth74Diagnozis.implant &&
                !tooth74Diagnozis.apex &&
                !tooth74Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth74Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1573.3,1010.1c0.1-2.1,0.2-4.2-0.6-6.2c-1.1-3-3.6-4.9-6.1-6.7c-0.8-0.6-1.7-1.3-2.5-1.9
                            c-2.4-2-4.3-4.6-5.6-7.5c2.6-0.4,4.7-2.1,6.7-3.9c5.4-4.7,11.1-9,17-12.9l-0.6-0.9c-5.9,4-11.7,8.3-17.2,13.1
                            c-1.9,1.6-3.9,3.3-6.3,3.6c-2.7,0.3-5.3-1.3-7.7-2.9l-0.5-0.3c-5.6-3.6-11.7-6.3-18.1-8.1l-0.1,0c0.3-3.3-0.1-6.1-1.2-8.4
                            c-0.3-0.7-0.7-1.3-1-1.9c-0.9-1.6-1.7-3-1.6-4.8c0.2-1.8,1.4-3.1,2.7-4.5c0.9-1,1.9-2,2.5-3.3c1.7-3.4,0.5-7-0.6-10.5
                            c-0.2-0.6-0.4-1.2-0.6-1.8c-1.1-3.7-1.6-7.6-1.4-11.4l-1.1-0.1c-0.2,4,0.3,8,1.5,11.8c0.2,0.6,0.4,1.2,0.6,1.8
                            c1.1,3.3,2.2,6.6,0.7,9.7c-0.5,1.1-1.5,2.1-2.4,3c-1.4,1.5-2.8,3-3,5.2c-0.2,2.1,0.8,3.8,1.7,5.4c0.3,0.6,0.7,1.2,1,1.8
                            c1,2.2,1.3,4.9,1,8.2c-6.6,1.5-13,3.9-18.9,7.2l-0.4,0.2c-2,1.1-4,2.2-6.2,2c-3.5-0.3-5.3-3.4-7.3-6.6c-0.7-1.2-1.5-2.4-2.3-3.5
                            c-2.7-3.6-6.8-5.9-11.3-6.4l-0.1,1.1c4.2,0.4,8,2.6,10.5,5.9c0.8,1,1.5,2.2,2.2,3.4c2,3.3,4.1,6.8,8.1,7.1c2.6,0.2,4.7-1,6.8-2.1
                            l0.4-0.2c5.8-3.2,11.9-5.5,18.3-7c-0.5,3.4-1.4,6.8-2.4,10.1c-1.1,3.7-2.2,7.5-2.6,11.5c-0.3,3.6,0,7.2,0.2,10.4
                            c0.3,3.5,0.6,7.1,0.9,10.6l1.1-0.1c-0.3-3.5-0.6-7-0.9-10.6c-0.3-3.2-0.6-6.7-0.2-10.2c0.4-3.8,1.5-7.6,2.6-11.3
                            c1-3.5,2.1-7,2.5-10.7c6.3,1.8,12.2,4.4,17.7,7.9l0.5,0.3c2.4,1.5,4.8,3.1,7.6,3.1c0,0,0.1,0,0.1,0l-0.2,0.1
                            c1.4,3.1,3.4,5.9,6,8.2c0.8,0.7,1.7,1.3,2.5,2c2.4,1.8,4.7,3.5,5.7,6.2c0.7,1.8,0.6,3.9,0.5,5.8l0,1.1c-0.1,2.5,0.1,5,0.4,7.4
                            l1.1-0.1c-0.3-2.4-0.5-4.8-0.4-7.2L1573.3,1010.1z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, -189, 7)',
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
                  !tooth74Diagnozis.implant &&
                  !tooth74Diagnozis.apex &&
                  !tooth74Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st9"
                d="M1623,1172.8c0,0.2-0.1,0.4-0.1,0.6c-3.4,4.4-7.3,8.3-11.7,11.6
                                c-8.6,6.6-18.8,10.8-29.2,13.7c-0.7,0.2-1.4,0.4-2.1,0.6c-10.6,2.7-21.5,4-32.4,4.6c-9.6,0.5-19.3,0.6-28.9-0.9
                                c-1.9-0.3-3.9-0.7-5.8-1.1c-13-2.9-25.2-9-35.4-17.7c-1.2-5.7-1.4-6-1.6-12c-0.3-8,0.2-16.1,1.9-24c1.2-5.7,3-11.2,5.4-16.5
                                l36.3,12.4l37.4-18.7l24.4,9.8l21-6.3L1623,1172.8z"
              />
            </g>
            <g>
              <path
                className={`st10 change-color ${tooth74Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1653,1311.7c-0.3,3.7-1.2,7.5-3.4,10.4c-1.8,2.5-4.5,4.2-7.8,4
                                c-0.2,0-0.5,0-0.7-0.1c-0.2,0-0.4-0.1-0.6-0.1c-3.6-0.7-5.7-3.4-7.9-6.4c-3.4-4.7-7.7-9.8-11-15.1c-5.9-9.5-10.8-19.4-16.8-28.8
                                c-4.5-7.2-9.6-14.1-15.1-20.7c-3.5-4.2-7.1-8.4-12-11.2c-4.3-2.5-9.3-3.8-14.3-3c-11.7,1.6-18.6,12.1-20.9,23.2
                                c-1.7,8-1.3,16.2,0,24.2c1.1,6.2,2.7,12.4,5.4,18.2c2.6,5.6,6,10.8,8.2,16.6c1.4,3.7,2.3,7.7,1.7,11.6c-0.3,2.1-1.1,4.3-2.9,5.6
                                c-2.3,1.7-5.2,1.7-8.1,1.2c-0.2,0-0.3-0.1-0.5-0.1c-0.2,0-0.5-0.1-0.8-0.1c-3.9-0.8-8.4-1.7-12.4-3.6c-13.4-6.5-21.1-19-26.7-32
                                c-8.1-18.8-12.1-38.7-14.7-58.7c-1.2-9.3-2-18.6-4-27.8c-2.1-9.9-6-25.3-10.6-34.4c0-0.1,0-0.2-0.1-0.3
                                c10.2,8.7,22.4,14.7,35.4,17.7c1.9,0.4,3.9,0.8,5.8,1.1c9.6,1.5,19.2,1.5,28.9,0.9c10.8-0.6,21.8-1.9,32.4-4.6
                                c0.7-0.2,1.4-0.4,2.1-0.6c10.4-2.8,20.5-7.1,29.2-13.7c4.4-3.3,8.3-7.2,11.7-11.6c-0.5,3.8-1.4,11-1.6,15.1
                                c-1,17.6,8.8,33.6,15.2,50.2c2.3,5.8,4.1,11.8,6.1,17.7C1648.4,1274.4,1654.7,1292.8,1653,1311.7z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.pulpit ? 'pulpit' : ''} ${tooth74Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1579.9,1199.2C1579.9,1199.2,1579.9,1199.2,1579.9,1199.2c-1.3,0.3-2.7,0.6-4,0.9
                                c-0.2,0.1-0.4,0.1-0.7,0.2c-0.6,0.1-1.1,0.2-1.7,0.3c0,0-0.1,0-0.1,0c-0.9,0.2-1.8,0.3-2.7,0.5c-0.3,0.1-0.6,0.1-0.9,0.2
                                c-0.9,0.2-1.8,0.3-2.7,0.4c-1.3,0.2-2.6,0.4-3.9,0.6c-0.9,0.1-1.8,0.2-2.7,0.3c-1,0.1-1.9,0.2-2.9,0.3c-0.2,0-0.4,0-0.7,0.1
                                c-0.8,0.1-1.6,0.1-2.4,0.2c-1.3,0.1-2.6,0.2-3.9,0.3c-1.1,0.1-2.1,0.1-3.2,0.2c-4.7,0.3-9.3,0.4-14,0.3c-0.7,0-1.3,0-2,0
                                c-0.5,0-1,0-1.5-0.1c-0.3,0-0.6,0-0.9,0c-0.5,0-1.1-0.1-1.6-0.1c-0.5,0-1-0.1-1.5-0.1c-0.5,0-1-0.1-1.5-0.1c-1-0.1-2-0.2-3-0.3
                                c-0.4-0.1-0.8-0.1-1.2-0.2c-0.6-0.1-1.2-0.2-1.8-0.3c0-0.2-0.1-0.4-0.1-0.6c-1.2-5.4-3.3-10.6-4.1-16.2c-0.6-4.3-0.4-8.8,0.6-13.3
                                c7,5.7,17.4,8.2,28.4,7c12.4-1.4,23.8-7.4,30.3-15.9c1.9,3.6,3.2,7.4,4.1,11.4C1579.5,1183.1,1579.1,1191.3,1579.9,1199.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.pulpit ? 'pulpit' : ''} ${tooth74Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1618.6,1259.9c-1.7,0.5-3.6,1.1-5.7,1.7c-0.9-1.3-1.8-2.7-2.8-4
                                c-5.7-7.9-12.2-15.5-20-22.1c-8.3-7.1-18.9-12.9-32.1-11.4c-18.3,2.1-30.1,16-35.2,30.2c-1,2.7-1.8,5.5-2.4,8.2
                                c-0.5,2.3-0.9,4.7-1.2,7c-1.9-0.4-3.7-0.8-5.4-1.2c0-1.8,0.2-3.7,0.3-5.5c0.6-6.7,1.8-13.4,2.9-20.1c2.3-13.4,4.3-26.8,1.5-39.7
                                c0.6,0.1,1.2,0.2,1.8,0.3c0.4,0.1,0.8,0.1,1.2,0.2c1,0.1,2,0.2,3,0.3c0.5,0.1,1,0.1,1.5,0.1c0.5,0,1,0.1,1.5,0.1
                                c0.5,0,1.1,0.1,1.6,0.1c0.3,0,0.6,0,0.9,0c0.5,0,1,0,1.5,0.1c0.6,0,1.3,0,1.9,0.1c4.7,0.1,9.3,0,14-0.3c1.1-0.1,2.1-0.1,3.2-0.2
                                c1.3-0.1,2.6-0.2,3.9-0.3c0.8-0.1,1.6-0.1,2.4-0.2c0.2,0,0.4-0.1,0.7-0.1c1-0.1,1.9-0.2,2.9-0.3c0.9-0.1,1.8-0.2,2.7-0.3
                                c1.3-0.2,2.6-0.4,3.9-0.6c0.9-0.1,1.8-0.3,2.7-0.4c0.3-0.1,0.6-0.1,0.9-0.2c0.9-0.2,1.8-0.3,2.7-0.5c0,0,0.1,0,0.1,0
                                c0.6-0.1,1.1-0.2,1.7-0.4c0.2,0,0.5-0.1,0.7-0.1c1.3-0.3,2.7-0.6,4-0.9c0,0,0,0,0,0c0.5,4.7,1.4,9.2,3.4,13.5
                                c4.4,9.5,13.4,16.4,20.6,24.6c5.3,6.1,9.5,12.9,13.3,19.8C1617.7,1258.1,1618.1,1259,1618.6,1259.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.pulpit ? 'pulpit' : ''} ${tooth74Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1547,1341.2c-7.7-10.4-14.2-21.2-19.5-32.6c-4.6-9.8-8.2-20-8.6-30.7c-0.1-2.8,0-5.7,0.3-8.5
                                c-1.9-0.4-3.7-0.8-5.4-1.2c-0.1,2.7,0,5.4,0.2,8.1c1.1,13,6.3,25.1,12.8,36.5c5.6,9.8,12.1,19.3,19.7,28.3c0,0,0,0,0,0
                                c1.2,1.4,2.3,2.8,3.6,4.1C1549.1,1343.9,1548.1,1342.6,1547,1341.2C1547,1341.2,1547,1341.2,1547,1341.2z"
              />
              <path
                className={`st22 target top ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.channel_class} ${tooth74Diagnozis.pulpit ? 'pulpit' : ''} ${tooth74Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1641.9,1332.8c-0.2-2.2-0.5-4.5-0.8-6.7v0c-1.5-11.2-4.1-22.1-7.8-32.8c-3.5-10.2-7.9-20.1-12.9-29.9
                                c-0.6-1.2-1.2-2.3-1.8-3.5c-1.7,0.5-3.6,1.1-5.7,1.7c1,1.5,2,3.1,3,4.7c11.7,18.7,19.9,38.7,24.6,59.7c0,0,0,0,0,0
                                C1641,1328.2,1641.5,1330.5,1641.9,1332.8z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage74 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth74Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1623 1172.8C1623 1173 1622.9 1173.2 1622.9 1173.4C1622.5 1173.9 1622.1 1174.5 1621.7 1175C1620.9 1176 1620 1177 1619.1 1177.9C1617.2 1180 1615.1 1181.9 1612.9 1183.7C1612.3 1184.1 1611.8 1184.6 1611.2 1185C1609 1186.7 1606.8 1188.2 1604.5 1189.5C1603.3 1190.2 1602.2 1190.8 1601 1191.5C1600.4 1191.8 1599.8 1192.1 1599.2 1192.4C1597.4 1193.3 1595.5 1194.1 1593.6 1194.9C1591.6 1195.7 1589.5 1196.5 1587.4 1197.1C1586.9 1197.3 1586.4 1197.4 1585.9 1197.6C1584.6 1198 1583.3 1198.4 1582 1198.7C1581.3 1198.9 1580.6 1199.1 1579.9 1199.3C1579.2 1199.5 1578.5 1199.6 1577.8 1199.8C1576.8 1200 1575.7 1200.3 1574.7 1200.5C1574.3 1200.6 1574 1200.6 1573.6 1200.7H1573.4C1572.7 1200.8 1572 1201 1571.3 1201.1C1570.6 1201.2 1569.9 1201.4 1569.1 1201.5C1568.8 1201.5 1568.5 1201.6 1568.2 1201.6C1568 1201.6 1567.9 1201.7 1567.7 1201.7C1567.6 1201.7 1567.5 1201.7 1567.4 1201.8C1566.7 1201.9 1566 1202 1565.3 1202.1C1565.1 1202.1 1564.9 1202.2 1564.8 1202.2C1563.9 1202.3 1563.1 1202.4 1562.2 1202.5C1561.9 1202.5 1561.5 1202.6 1561.2 
                            1202.6C1561 1202.6 1560.7 1202.7 1560.5 1202.7C1560.2 1202.7 1560 1202.8 1559.7 1202.8C1559.6 1202.8 1559.5 1202.8 1559.5 1202.8C1557.5 1203 1555.6 1203.2 1553.6 1203.4C1552.6 1203.5 1551.7 1203.5 1550.7 1203.6C1549.6 1203.7 1548.6 1203.7 1547.5 1203.8C1546.4 1203.9 1545.3 1203.9 1544.3 1204C1540.7 1204.2 1537.1 1204.2 1533.6 1204.1C1533 1204.1 1532.4 1204.1 1531.8 1204.1C1531.7 1204.1 1531.7 1204.1 1531.6 1204.1C1531.1 1204.1 1530.6 1204.1 1530.1 1204C1530 1204 1529.9 1204 1529.8 1204C1529.1 1204 1528.3 1203.9 1527.6 1203.9C1527.1 1203.9 1526.6 1203.8 1526.1 1203.8C1525.6 1203.8 1525.1 1203.7 1524.6 1203.7C1524.1 1203.7 1523.6 1203.6 1523.1 1203.5C1522.6 1203.5 1522.1 1203.4 1521.7 1203.3C1521.6 1203.3 1521.5 1203.3 1521.3 1203.2C1521 1203.2 1520.7 1203.1 1520.5 1203.1C1519.9 1203 1519.3 1202.9 1518.7 1202.9C1518.7 1202.9 1518.7 1202.9 1518.6 1202.9C1518.1 1202.8 1517.6 1202.7 1517.2 1202.7C1516.4 1202.5 1515.5 1202.4 1514.7 1202.2C1514.1 1202.1 1513.5 1202 1512.9 1201.8C1511.7 1201.5 
                            1510.6 1201.3 1509.4 1200.9C1508.1 1200.6 1506.9 1200.2 1505.6 1199.8C1505.6 1199.8 1505.6 1199.8 1505.5 1199.8C1504 1199.3 1502.6 1198.8 1501.1 1198.2C1498.7 1197.3 1496.3 1196.2 1493.9 1195C1492.4 1194.3 1491 1193.5 1489.6 1192.7C1489.6 1192.7 1489.6 1192.7 1489.5 1192.7C1488.1 1191.9 1486.7 1191 1485.3 1190.1C1484.6 1189.6 1483.9 1189.2 1483.2 1188.7C1482.5 1188.2 1481.8 1187.7 1481.2 1187.2C1480.5 1186.7 1479.8 1186.2 1479.1 1185.6C1478.5 1185.1 1477.9 1184.6 1477.2 1184.1C1476 1178.4 1475.9 1178.1 1475.6 1172.1C1475.3 1164.1 1475.8 1156 1477.5 1148.1C1478.7 1142.4 1480.5 1136.9 1482.9 1131.6L1519.2 1144L1556.6 1125.3L1581 1135.1L1601.9 1128.8L1623 1172.8Z"
              style={{ visibility: 'inherit' }}
            />
            <path
              className="st57"
              style={{ fill: tooth74Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M1524.8 1141.3L1617.3 1267.7C1618.1 1269 1619.8 1269.6 1621.2 1269C1622.7 1268.4 1623.5 1266.8 1623.1 1265.2L1614.7 1249.3L1613.8 1247.6L1551 1128.1L1524.8 1141.3Z"
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth74Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth74Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M1621.2,1269c-1.4,0.6-3.1,0-3.9-1.3l-55-65.2c0.9-0.1,1.7-0.2,2.6-0.3c0.2,0,0.4-0.1,0.5-0.1
                            c0.7-0.1,1.4-0.2,2.1-0.3c0.1,0,0.2,0,0.3-0.1c0.2,0,0.3,0,0.5-0.1c0.3,0,0.6-0.1,0.9-0.1c0.7-0.1,1.4-0.2,2.2-0.4
                            c0.7-0.1,1.4-0.3,2.1-0.4l0.2,0c0.4-0.1,0.7-0.2,1.1-0.2c1-0.2,2.1-0.5,3.1-0.7c0.7-0.2,1.4-0.3,2.1-0.5h0c0,0,0,0,0,0
                            c0.7-0.2,1.4-0.4,2.1-0.6c1.3-0.4,2.6-0.7,3.9-1.1c0.5-0.2,1-0.3,1.5-0.5c0.2,0.5,0.3,1,0.4,1.5l35.3,66.7
                            C1623.5,1266.8,1622.7,1268.4,1621.2,1269z"
            />
            <path
              className="st15"
              d="M1623,1172.8c0,0.2-0.1,0.4-0.1,0.6c-0.4,0.5-0.8,1.1-1.2,1.6c-0.8,1-1.7,2-2.6,2.9c-1.9,2.1-4,4-6.2,5.8
                            c-0.6,0.4-1.1,0.9-1.7,1.3c-2.2,1.7-4.4,3.2-6.7,4.5h0c-1.2,0.7-2.3,1.3-3.5,2c-0.6,0.3-1.2,0.6-1.8,0.9
                            c-1.8,0.9-3.7,1.7-5.6,2.5c-2,0.8-4.1,1.6-6.2,2.2c-0.5,0.2-1,0.3-1.5,0.5c-1.3,0.4-2.6,0.8-3.9,1.1c-0.7,0.2-1.4,0.4-2.1,0.6
                            c0,0,0,0,0,0h0c-0.7,0.2-1.4,0.3-2.1,0.5c-1,0.2-2.1,0.5-3.1,0.7c-0.4,0.1-0.7,0.1-1.1,0.2l-0.2,0c-0.7,0.1-1.4,0.3-2.1,0.4
                            c-0.7,0.1-1.4,0.3-2.2,0.4c-0.3,0-0.6,0.1-0.9,0.1c-0.2,0-0.3,0.1-0.5,0.1c-0.1,0-0.2,0-0.3,0.1c-0.7,0.1-1.4,0.2-2.1,0.3
                            c-0.2,0-0.4,0.1-0.5,0.1c-0.9,0.1-1.7,0.2-2.6,0.3c-0.3,0-0.7,0.1-1,0.1c-0.2,0-0.5,0.1-0.7,0.1c-0.3,0-0.5,0.1-0.8,0.1
                            c-0.1,0-0.2,0-0.2,0c-2,0.2-3.9,0.4-5.9,0.6c-1,0.1-1.9,0.1-2.9,0.2c-1.1,0.1-2.1,0.1-3.2,0.2c-1.1,0.1-2.2,0.1-3.2,0.2
                            c-3.6,0.2-7.2,0.2-10.7,0.1c-0.6,0-1.2,0-1.8,0c-0.1,0-0.1,0-0.2,0c-0.5,0-1,0-1.5-0.1c-0.1,0-0.2,0-0.3,0
                            c-0.7,0-1.5-0.1-2.2-0.1c-0.5,0-1-0.1-1.5-0.1c0,0,0,0,0,0c-0.5,0-1-0.1-1.5-0.1c0,0,0,0,0,0c-0.5,0-1-0.1-1.5-0.2
                            c-0.5,0-1-0.1-1.4-0.2c-0.1,0-0.2,0-0.4-0.1c-0.3,0-0.6-0.1-0.8-0.1c-0.6-0.1-1.2-0.2-1.8-0.2c0,0,0,0-0.1,0
                            c-0.5-0.1-1-0.2-1.4-0.2c-0.8-0.2-1.7-0.3-2.5-0.5c-0.6-0.1-1.2-0.2-1.8-0.4c-1.2-0.3-2.3-0.5-3.5-0.9c-1.3-0.3-2.5-0.7-3.8-1.1
                            c0,0,0,0-0.1,0c-1.5-0.5-2.9-1-4.4-1.6c-2.4-0.9-4.8-2-7.2-3.2c-1.5-0.7-2.9-1.5-4.3-2.3c0,0,0,0-0.1,0c-1.4-0.8-2.8-1.7-4.2-2.6
                            c-0.7-0.5-1.4-0.9-2.1-1.4c-0.7-0.5-1.4-1-2-1.5c-0.7-0.5-1.4-1-2.1-1.6c-0.6-0.5-1.2-1-1.9-1.5l0,0c-1.2-5.7-1.3-6-1.6-12
                            c-0.3-8,0.2-16.1,1.9-24c1.2-5.7,3-11.2,5.4-16.5l36.3,12.4l37.4-18.7l24.4,9.8l20.9-6.3L1623,1172.8z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth74Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth74Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M1479.1,1185.7l61.4,38.5l33.3-9.3l48.9-40.4l-0.1-0.8c-3.3,4.2-7.1,8-11.4,11.3
                            c-8.7,6.6-18.8,10.8-29.2,13.7c-11.3,3.1-22.9,4.5-34.5,5.2c-11.6,0.7-23.2,0.6-34.7-2c-12.7-2.9-24.6-8.7-34.7-17.1
                            L1479.1,1185.7z"
            />
            <path
              className="st17"
              d="M1475.8,1172.1c0.2,5.8,0,6.1,1,11.4c0.2,0.2,0.3,0.4,0.5,0.6c0.3,0.2,0.5,0.5,0.8,0.7
                            c10.1,8.4,22,14.2,34.7,17.1c11.4,2.6,23.1,2.7,34.7,2c11.6-0.7,23.2-2.1,34.5-5.2c10.5-2.8,20.6-7.1,29.2-13.7
                            c4.3-3.3,8.1-7.1,11.4-11.3c0.2-0.3,0.4-0.5,0.6-0.8c0,0,0-0.1,0-0.1l-21.1-44l-21,6.3l-24.4-9.8l-37.5,18.7l-36.3-12.4
                            c-2.4,5.3-4.1,10.9-5.3,16.5C1476,1156,1475.5,1164.1,1475.8,1172.1z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1575.9 1170.99C1575.76 1168.51 1573.42 1166.75 1571 1167.31L1523.01 1178.36C1520.59 1178.91 1519.26 1181.51 1520.22 1183.8L1535.71 1220.69C1536.46 1222.49 1538.4 1223.48 1540.3 1223.04L1574.98 1214.93C1576.87 1214.49 1578.17 1212.76 1578.06 1210.82L1575.9 1170.99Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth74Diagnozis.abutment ||
                tooth74Diagnozis.implant ||
                tooth74Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1584,1212c0,0,2.1,19.3,2.9,29.7c0.8,10.3,2,34.4,2.2,44.2c0.3,9.8,0.1,26,0,27.4
                            c-0.2,1.4-8.5,8.8-15.7,9.2c-7.3,0.4-14.6-0.9-18-7.4c-3.4-6.5-10.3-27.1-12.8-36.3c-2.5-9.2-9.4-36.1-10.4-41.2
                            c-1-5.1-2.7-14.7-2.7-14.7L1584,1212z"
            />
            <line
              className="st19"
              x1="1589.8"
              y1="1219.3"
              x2="1527.6"
              y2="1241.2"
            ></line>
            <line
              className="st19"
              x1="1593.3"
              y1="1238.4"
              x2="1531.1"
              y2="1260.3"
            ></line>
            <line
              className="st19"
              x1="1596.8"
              y1="1257.5"
              x2="1534.6"
              y2="1279.4"
            ></line>
            <line
              className="st19"
              x1="1600.2"
              y1="1276.6"
              x2="1538.1"
              y2="1298.5"
            ></line>
            <line
              className="st19"
              x1="1602.7"
              y1="1295.7"
              x2="1540.5"
              y2="1317.5"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth74Diagnozis.culttab &&
                !tooth74Diagnozis.abutment &&
                !tooth74Diagnozis.implant &&
                !tooth74Diagnozis.shaper &&
                !tooth74Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1621.8,1144.6c-1.1-7.5-2.9-14.8-5.2-22l-4.8-6.6l-11-7.4c-1.2,0.1-2.3,0.5-3.3,1.1
                            c-1.6,1-2.7,2.4-4.1,3.6c-1.8,1.4-3.9,2.2-6.1,2.5l-0.6,3.6l0.4,17.4c0,0,0,0,0,0l0,0.6l-1.9-0.1l-0.1-18.3l-7.2-11.3
                            c-2.5-1.6-5.1-3.1-7.7-4.6c-4.7-2.6-9.6-4.9-14.6-6.9l-7.1,0.4l-26.9,17.5l-1,3.6l4.5,6.8l0.5,10.7l-3.3,4.9l3.8,12l-1.6,0.3
                            l-4.4-12.5l3.5-6.2l-0.3-8.2l-6.2-8.8c-4.5-3.5-8.9-7-13.4-10.5c-3.1-2.4-6.1-4.8-9.1-7.2c-1.4-1.1-2.8-2.2-4.2-3.3l-6.8,0.9
                            c-3.5,2.1-6.7,4.6-9.5,7.5c-4,4.2-7.1,9.2-9.5,14.5c-1.9,4.1-3.2,8.5-4.2,12.9c-0.7,6.5-0.4,13,0.8,19.4
                            c1.8,9.8,5.8,19.1,11.6,27.1c1.5,2.1,3.1,4.1,4.9,6c10.3,8.7,22.4,14.8,35.5,17.7c11.4,2.6,23.1,2.7,34.7,2
                            c11.6-0.7,23.2-2.1,34.5-5.2c10.5-2.8,20.5-7.1,29.2-13.7c4.5-3.5,8.6-7.5,12-12c0-0.8,0.1-1.6,0.1-2.4
                            C1623.6,1161.9,1623.1,1153.2,1621.8,1144.6z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped hRoot hImplant hEmpty"
            style={{ visibility: 'inherit' }}
          >
            <path
              className="st7 st59"
              d="M1616.6 1122.6C1618.9 1129.8 1620.7 1137.1 1621.8 1144.6C1623.1 1153.2 1623.6 1161.9 1623.7 1170.4C1623.7 1170.8 1623.67 1171.2 1623.65 1171.6C1623.62 1172 1623.6 1172.4 1623.6 1172.8C1620.2 1177.3 1616.1 1181.3 1611.6 1184.8C1602.9 1191.4 1592.9 1195.7 1582.4 1198.5C1571.1 1201.6 1559.5 1203 1547.9 1203.7C1536.3 1204.4 1524.6 1204.3 1513.2 1201.7C1500.1 1198.8 1488 1192.7 1477.7 1184C1475.9 1182.1 1474.3 1180.1 1472.8 1178C1467 1170 1463 1160.7 1461.2 1150.9C1460 1144.5 1459.7 1138 1460.4 1131.5C1461.4 1127.1 1462.7 1122.7 1464.6 1118.6C1467 1113.3 1470.1 1108.3 1474.1 1104.1C1476.9 1101.2 1480.1 1098.7 1483.6 1096.6L1490.4 1095.7L1494.6 1099C1497.6 1101.4 1500.6 1103.8 1503.7 1106.2C1505.95 1107.95 1508.17 1109.7 1510.4 1111.45C1512.62 1113.2 1514.85 1114.95 1517.1 1116.7L1523.3 1125.5L1523.6 1133.7L1520.1 1139.9L1524.5 1152.4L1526.1 1152.1L1522.3 1140.1L1525.6 1135.2L1525.1 1124.5L1520.6 1117.7L1521.6 1114.1L1548.5 1096.6L1555.6 1096.2C1560.6 1098.2 1565.5 1100.5 1570.2 1103.1L1570.2 1103.1C1572.8 1104.6 1575.4 1106.1 1577.9 1107.7L1585.1 1119L1585.2 1137.3L1587.1 1137.4V1136.8L1586.7 1119.4L1587.3 1115.8C1589.5 1115.5 1591.6 1114.7 1593.4 1113.3C1593.9 1112.87 1594.36 1112.42 1594.82 1111.97C1595.65 1111.15 1596.47 1110.34 1597.5 1109.7C1598.5 1109.1 1599.6 1108.7 1600.8 1108.6L1611.8 1116L1616.6 1122.6ZM1518.69 1196.99C1507.72 1194.53 1497.58 1189.35 1488.96 1181.97C1487 1179.88 1485.25 1177.58 1483.67 1175.18C1482.87 1173.94 1483.72 1172.33 1485.19 1172.21C1536.38 1168.17 1564.36 1164.69 1608.47 1157.36C1609.63 1157.17 1610.71 1158 1610.8 1159.16C1611.56 1169.91 1610.52 1175.23 1601.1 1182.65C1593.82 1188.25 1585.44 1191.9 1576.65 1194.27C1567.18 1196.9 1557.47 1198.09 1547.75 1198.69C1538.04 1199.28 1528.24 1199.19 1518.69 1196.99Z"
            ></path>
            <path
              className={`st7 ${tooth74Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1488.96 1181.97C1497.58 1189.35 1507.72 1194.53 1518.69 1196.99C1528.24 1199.19 1538.04 1199.28 1547.75 1198.69C1557.47 1198.09 1567.18 1196.9 1576.65 1194.27C1585.44 1191.9 1593.82 1188.25 1601.1 1182.65C1610.52 1175.23 1611.56 1169.91 1610.8 1159.16C1610.71 1158 1609.63 1157.17 1608.47 1157.36C1564.36 1164.69 1536.38 1168.17 1485.19 1172.21C1483.72 1172.33 1482.87 1173.94 1483.67 1175.18C1485.25 1177.58 1487 1179.88 1488.96 1181.97Z"
            />
            <path
              className={`st60
                                    ${tooth74Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth74Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth74Diagnozis.seal_cervical_color}
                                `}
              d="M1488.96 1181.97C1497.58 1189.35 1507.72 1194.53 1518.69 1196.99C1528.24 1199.19 1538.04 1199.28 1547.75 1198.69C1557.47 1198.09 1567.18 1196.9 1576.65 1194.27C1585.44 1191.9 1593.82 1188.25 1601.1 1182.65C1610.52 1175.23 1611.56 1169.91 1610.8 1159.16C1610.71 1158 1609.63 1157.17 1608.47 1157.36C1564.36 1164.69 1536.38 1168.17 1485.19 1172.21C1483.72 1172.33 1482.87 1173.94 1483.67 1175.18C1485.25 1177.58 1487 1179.88 1488.96 1181.97Z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth74.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1466 1167L1468.5 1168L1470.5 1169.5L1473 1172L1475.5 1176.5L1478.5 1177.5L1481.5 1181.5L1484.5 1184L1488 1185.5L1491 1188L1496.5 1190L1499.5 1192.5L1503.5 1194.5L1506.5 1196.5L1512 1198L1519 1200H1527.5L1535 1202H1538.5L1543.5 1201H1550.5H1557L1567 1199L1576.5 1198L1582 1194.5L1592 1192.5L1596 1190L1605.5 1185.5L1608.5 1181.5L1613.5 1177.5L1616.5 1172.5L1617.5 1168L1620 1162L1619.5 1156.5L1620 1153.5L1620.5 1149.5L1622.5 1147L1623 1149.5V1151.5L1624 1153L1624.5 1156L1625.5 1158.5L1624.5 1161.5L1626 1165.5L1625 1171L1624 1176L1625 1182.5L1624 1189L1625 1192.5L1623 1196.5V1201L1622 1205.5L1613.5 1211.5L1606.5 1217L1598 1218L1588.5 1221.5L1582.5 1223.5C1581 1224 1576.5 1227.5 1575 1228C1573.5 1228.5 1572 1228 1570 1228.5L1565 1230L1557 1228.5C1555.33 1229.33 1551.7 1231.9 1550.5 1231.5C1549.3 1231.1 1544.33 1231.5 1542.5 1231L1535 1231.5L1527.5 1228.5L1520.5 1231L1512 1228.5L1502 1224.5H1493L1488 1221.5L1486.5 1218L1484.5 1214L1483.5 1209L1481.5 1204.5L1480.5 1201.5L1478.5 1199L1477 1194.5L1476.5 1190L1474.5 1186.5L1471.5 1183.5L1470.5 1179L1467 1175L1466 1172V1167Z"
            ></path>
            <path
              className="st61 level1"
              d="M1466 1167L1468.5 1168L1470.5 1169.5L1473 1172L1475.5 1176.5L1478.5 1177.5L1481.5 1181.5L1484.5 1184L1488 1185.5L1491 1188L1496.5 1190L1499.5 1192.5L1503.5 1194.5L1506.5 1196.5L1512 1198L1519 1200H1527.5L1535 1202H1538.5L1543.5 1201H1550.5H1557L1567 1199L1576.5 1198L1582 1194.5L1592 1192.5L1596 1190L1605.5 1185.5L1608.5 1181.5L1613.5 1177.5L1616.5 1172.5L1617.5 1168L1620 1162L1619.5 1156.5L1620 1153.5L1620.5 1149.5L1622.5 1147V1149.5L1623.5 1153V1156.5L1625 1159.5L1623.5 1164.5V1168L1622.5 1172V1177.5L1623.5 1181.5L1622.5 1185.5L1619.5 1188L1616.5 1190L1613.5 1194.5L1606.5 1196L1602 1200L1596 1201H1590L1585.5 1203.5L1583.5 1205.5L1578.5 1207H1573L1569 1208.5H1561L1553.5 1210H1547L1540.5 1211.5L1537 1210H1531L1523 1211.5L1515 1207H1510.5H1506.5L1501 1205.5L1496.5 1207L1492 1204.5H1488L1484.5 1203.5L1481.5 1201L1480 1196L1478.5 1194.5L1479 1191.5L1477 1188L1475.5 1185.5L1473 1181.5L1471.5 1178.5L1469.5 1175.5L1467.5 1173.5L1466.5 1170.5L1466 1167Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth74Diagnozis.culttab &&
                !tooth74Diagnozis.abutment &&
                !tooth74Diagnozis.implant &&
                !tooth74Diagnozis.shaper &&
                !tooth74Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M1589.8,1144.8c-6.3,6.4-16.9,10.9-24.4,12.1c-8.4,1.3-27.5,3.3-40,1.3c-9.4-1.5-24.2-12-31.1-17.1
                                c-0.1-9.9,0-30.2,0.1-42.2c3,2.4,6.1,4.8,9.1,7.2c4.5,3.5,8.9,7,13.4,10.5l6.2,8.8l0.3,8.2l-3.5,6.2l4.4,12.5l1.6-0.3l-3.8-12
                                l3.3-4.9l-0.5-10.7l-4.5-6.8l1-3.6l26.9-17.5l7.1-0.4c5,2,9.9,4.3,14.6,6.9c2.6,1.4,5.2,3,7.7,4.6l7.2,11.3l0.1,18.3l1.9,0.1
                                l0-0.6C1587.7,1138.9,1588.6,1141.7,1589.8,1144.8z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth74.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth74.seal_center ? `seal-fill ${teethDiagnozis.tooth74.seal_center_color}` : ''}
                                `}
                d="M1589.8,1144.8c-6.3,6.4-16.9,10.9-24.4,12.1c-8.4,1.3-27.5,3.3-40,1.3c-9.4-1.5-24.2-12-31.1-17.1
                                c-0.1-9.9,0-30.2,0.1-42.2c3,2.4,6.1,4.8,9.1,7.2c4.5,3.5,8.9,7,13.4,10.5l6.2,8.8l0.3,8.2l-3.5,6.2l4.4,12.5l1.6-0.3l-3.8-12
                                l3.3-4.9l-0.5-10.7l-4.5-6.8l1-3.6l26.9-17.5l7.1-0.4c5,2,9.9,4.3,14.6,6.9c2.6,1.4,5.2,3,7.7,4.6l7.2,11.3l0.1,18.3l1.9,0.1
                                l0-0.6C1587.7,1138.9,1588.6,1141.7,1589.8,1144.8z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1623.3,1170.6c-5,0-12.8-0.1-16.4-1.1c-5.5-1.5-7.3-4.3-13-15.4c-1.7-3.2-3-6.4-4.1-9.3
                                c-1.2-3.1-2.1-5.9-2.7-8c0,0,0,0,0,0l-0.4-17.4l0.6-3.6c2.2-0.2,4.3-1.1,6.1-2.5c1.4-1.1,2.6-2.6,4.1-3.6c1-0.6,2.2-1,3.3-1.1
                                l11,7.4l4.8,6.6c2.3,7.2,4.1,14.5,5.2,22C1623.1,1153.2,1623.6,1161.9,1623.3,1170.6z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth74.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth74.seal_left ? `seal-fill ${teethDiagnozis.tooth74.seal_left_color}` : ''}
                                `}
                d="M1623.3,1170.6c-5,0-12.8-0.1-16.4-1.1c-5.5-1.5-7.3-4.3-13-15.4c-1.7-3.2-3-6.4-4.1-9.3
                                c-1.2-3.1-2.1-5.9-2.7-8c0,0,0,0,0,0l-0.4-17.4l0.6-3.6c2.2-0.2,4.3-1.1,6.1-2.5c1.4-1.1,2.6-2.6,4.1-3.6c1-0.6,2.2-1,3.3-1.1
                                l11,7.4l4.8,6.6c2.3,7.2,4.1,14.5,5.2,22C1623.1,1153.2,1623.6,1161.9,1623.3,1170.6z"
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
                d="M1489.4,1168.4c-2,2.1-10.1,6.3-16.9,9.6c-5.8-8.1-9.8-17.3-11.6-27.1c-1.2-6.4-1.5-12.9-0.8-19.4
                                c0.9-4.4,2.3-8.8,4.2-12.9c2.4-5.3,5.5-10.3,9.5-14.5c2.8-2.9,6-5.5,9.5-7.5l6.8-0.9c1.4,1.1,2.8,2.2,4.2,3.3
                                c-0.1,11.9-0.2,32.3-0.1,42.2c0,2.1,0.1,3.7,0.1,4.7C1494.8,1153.7,1493,1164.6,1489.4,1168.4z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth74.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth74.seal_right ? `seal-fill ${teethDiagnozis.tooth74.seal_right_color}` : ''}
                                `}
                d="M1489.4,1168.4c-2,2.1-10.1,6.3-16.9,9.6c-5.8-8.1-9.8-17.3-11.6-27.1c-1.2-6.4-1.5-12.9-0.8-19.4
                                c0.9-4.4,2.3-8.8,4.2-12.9c2.4-5.3,5.5-10.3,9.5-14.5c2.8-2.9,6-5.5,9.5-7.5l6.8-0.9c1.4,1.1,2.8,2.2,4.2,3.3
                                c-0.1,11.9-0.2,32.3-0.1,42.2c0,2.1,0.1,3.7,0.1,4.7C1494.8,1153.7,1493,1164.6,1489.4,1168.4z"
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
                d="M1623.3,1170.6c0,0.8-0.1,1.6-0.1,2.4c-3.4,4.5-7.5,8.6-12,12c-8.7,6.6-18.8,10.9-29.2,13.7
                                c-11.3,3.1-22.9,4.5-34.5,5.2c-11.6,0.7-23.2,0.5-34.7-2c-13.1-3-25.2-9-35.5-17.7c-1.8-1.9-3.4-3.9-4.9-6
                                c6.8-3.3,15-7.6,16.9-9.6c3.6-3.8,5.3-14.7,4.9-22.6c0-1-0.1-2.6-0.1-4.7c6.9,5.2,21.7,15.7,31.1,17.1c12.5,1.9,31.7,0,40-1.3
                                c7.6-1.2,18.1-5.7,24.4-12.1c1.1,2.9,2.4,6.1,4.1,9.3c5.7,11.1,7.5,13.9,13,15.4C1610.5,1170.5,1618.4,1170.6,1623.3,1170.6z"
              />
              <path
                className={`st8 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth74.caries_bottom ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth74.seal_bottom ? `seal-fill ${teethDiagnozis.tooth74.seal_bottom_color}` : ''}
                            `}
                d="M1623.3,1170.6c0,0.8-0.1,1.6-0.1,2.4c-3.4,4.5-7.5,8.6-12,12c-8.7,6.6-18.8,10.9-29.2,13.7
                                c-11.3,3.1-22.9,4.5-34.5,5.2c-11.6,0.7-23.2,0.5-34.7-2c-13.1-3-25.2-9-35.5-17.7c-1.8-1.9-3.4-3.9-4.9-6
                                c6.8-3.3,15-7.6,16.9-9.6c3.6-3.8,5.3-14.7,4.9-22.6c0-1-0.1-2.6-0.1-4.7c6.9,5.2,21.7,15.7,31.1,17.1c12.5,1.9,31.7,0,40-1.3
                                c7.6-1.2,18.1-5.7,24.4-12.1c1.1,2.9,2.4,6.1,4.1,9.3c5.7,11.1,7.5,13.9,13,15.4C1610.5,1170.5,1618.4,1170.6,1623.3,1170.6z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_left &&
                      !tooth74Diagnozis.seal_top &&
                      !tooth74Diagnozis.seal_center) ||
                    (tooth74Diagnozis.seal_left &&
                      tooth74Diagnozis.seal_top &&
                      !tooth74Diagnozis.seal_center) ||
                    (!tooth74Diagnozis.seal_left &&
                      tooth74Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1589.5 1145C1587.5 1138.5 1585.7 1135.8 1586.5 1123"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_left &&
                      !tooth74Diagnozis.seal_bottom) ||
                    (!tooth74Diagnozis.seal_left &&
                      tooth74Diagnozis.seal_bottom &&
                      !tooth74Diagnozis.seal_center) ||
                    (!tooth74Diagnozis.seal_left &&
                      tooth74Diagnozis.seal_bottom &&
                      tooth74Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1589.5 1145C1598.5 1166 1604.8 1169.3 1618 1170.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_bottom &&
                      !tooth74Diagnozis.seal_center) ||
                    (!tooth74Diagnozis.seal_bottom &&
                      tooth74Diagnozis.seal_center) ||
                    (tooth74Diagnozis.seal_right &&
                      tooth74Diagnozis.seal_left &&
                      !tooth74Diagnozis.seal_center &&
                      !tooth74Diagnozis.seal_top) ||
                    (!tooth74Diagnozis.seal_top &&
                      !tooth74Diagnozis.seal_bottom &&
                      tooth74Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1589.5 1145C1575.5 1160.5 1518.5 1164.7 1494.5 1141.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_right &&
                      !tooth74Diagnozis.seal_bottom) ||
                    (!tooth74Diagnozis.seal_right &&
                      tooth74Diagnozis.seal_bottom &&
                      !tooth74Diagnozis.seal_center) ||
                    (!tooth74Diagnozis.seal_right &&
                      tooth74Diagnozis.seal_bottom &&
                      tooth74Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1494.5 1141.5C1494.5 1155.5 1497.2 1165.1 1478 1175.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth74Diagnozis.seal_right &&
                      !tooth74Diagnozis.seal_bottom &&
                      !tooth74Diagnozis.seal_center) ||
                    (tooth74Diagnozis.seal_right &&
                      tooth74Diagnozis.seal_bottom &&
                      !tooth74Diagnozis.seal_center) ||
                    (!tooth74Diagnozis.seal_right &&
                      tooth74Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1494.5 1141.5V1105.5"
              />
            </g>
          </g>
          <g>
            <g
              className="vinir"
              style={{
                visibility: tooth74Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth74Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth74Diagnozis.vinir_color}`}
                d="M1621.8 1144.6C1620.7 1137.1 1618.9 1129.8 1616.6 1122.6L1611.8 1116L1600.8 1108.6C1599.6 1108.7 1598.5 1109.1 1597.5 1109.7C1595.9 1110.7 1594.8 1112.1 1593.4 1113.3C1591.6 1114.7 1589.5 1115.5 1587.3 1115.8L1586.7 1119.4L1587.1 1136.8V1137.4L1585.2 1137.3L1585.1 1119L1577.9 1107.7C1575.4 1106.1 1572.8 1104.6 1570.2 1103.1C1565.5 1100.5 1560.6 1098.2 1555.6 1096.2L1548.5 1096.6L1521.6 1114.1L1520.6 1117.7L1525.1 1124.5L1525.6 1135.2L1522.3 1140.1L1526.1 1152.1L1524.5 1152.4L1520.1 1139.9L1523.6 1133.7L1523.3 1125.5L1517.1 1116.7C1512.6 1113.2 1508.2 1109.7 1503.7 1106.2C1500.6 1103.8 1497.6 1101.4 1494.6 1099C1493.2 1097.9 1491.8 1096.8 1490.4 1095.7L1483.6 1096.6C1480.1 1098.7 1476.9 1101.2 1474.1 1104.1C1470.1 1108.3 1467 1113.3 1464.6 1118.6C1462.7 1122.7 1461.4 1127.1 1460.4 1131.5C1459.7 1138 1460 1144.5 1461.2 1150.9C1463 1160.7 1467 1170 1472.8 1178C1474.3 1180.1 1475.9 1182.1 1477.7 1184C1488 1192.7 1500.1 1198.8 1513.2 1201.7C1524.6 1204.3 1536.3 1204.4 1547.9 1203.7C1559.5 1203 1571.1 1201.6 1582.4 1198.5C1592.9 1195.7 1602.9 1191.4 1611.6 1184.8C1616.1 1181.3 1620.2 1177.3 1623.6 1172.8C1623.6 1172 1623.7 1171.2 1623.7 1170.4C1623.6 1161.9 1623.1 1153.2 1621.8 1144.6Z"
              ></path>
            </g>
          </g>
          <g
            className="crown"
            style={{
              visibility:
                tooth74Diagnozis.temporary_crown ||
                tooth74Diagnozis.ceramic_crown ||
                tooth74Diagnozis.mceramic_crown ||
                tooth74Diagnozis.metalic_crown ||
                tooth74Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth74Diagnozis.temporary_crown ||
                tooth74Diagnozis.ceramic_crown ||
                tooth74Diagnozis.mceramic_crown ||
                tooth74Diagnozis.metalic_crown ||
                tooth74Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth74Diagnozis.ceramic_crown_color}
                                ${tooth74Diagnozis.mceramic_crown_color}
                                ${tooth74Diagnozis.metalic_crown_color}
                                ${tooth74Diagnozis.zirconia_crown_color}
                            `}
              d="M1621.8,1144.6c-1.1-7.5-2.9-14.8-5.2-22l-4.8-6.6l-11-7.4c-1.2,0.1-2.3,0.5-3.3,1.1
                            c-1.6,1-2.7,2.4-4.1,3.6c-1.8,1.4-3.9,2.2-6.1,2.5l-0.6,3.6l0.4,17.4c0,0,0,0,0,0l0,0.6l-1.9-0.1l-0.1-18.3l-7.2-11.3
                            c-2.5-1.6-5.1-3.1-7.7-4.6c-4.7-2.6-9.6-4.9-14.6-6.9l-7.1,0.4l-26.9,17.5l-1,3.6l4.5,6.8l0.5,10.7l-3.3,4.9l3.8,12l-1.6,0.3
                            l-4.4-12.5l3.5-6.2l-0.3-8.2l-6.2-8.8c-4.5-3.5-8.9-7-13.4-10.5c-3.1-2.4-6.1-4.8-9.1-7.2c-1.4-1.1-2.8-2.2-4.2-3.3l-6.8,0.9
                            c-3.5,2.1-6.7,4.6-9.5,7.5c-4,4.2-7.1,9.2-9.5,14.5c-1.9,4.1-3.2,8.5-4.2,12.9c-0.7,6.5-0.4,13,0.8,19.4
                            c1.8,9.8,5.8,19.1,11.6,27.1c1.5,2.1,3.1,4.1,4.9,6c10.3,8.7,22.4,14.8,35.5,17.7c11.4,2.6,23.1,2.7,34.7,2
                            c11.6-0.7,23.2-2.1,34.5-5.2c10.5-2.8,20.5-7.1,29.2-13.7c4.5-3.5,8.6-7.5,12-12c0-0.8,0.1-1.6,0.1-2.4
                            C1623.6,1161.9,1623.1,1153.2,1621.8,1144.6z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
