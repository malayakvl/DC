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
import PeriodontitStage75 from './periodontit75';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth75() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth75Diagnozis = teethDiagnozis.tooth75;
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
        teethDiagnozis.tooth75.caries_bottom =
          !teethDiagnozis.tooth75.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth75.caries_center =
          !teethDiagnozis.tooth75.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth75.caries_left =
          !teethDiagnozis.tooth75.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth75.caries_right =
          !teethDiagnozis.tooth75.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth75.caries_top = !teethDiagnozis.tooth75.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth75.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth75.seal_center_color = sealColor1;
          teethDiagnozis.tooth75.seal_center = true;
        } else if (
          teethDiagnozis.tooth75.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth75.seal_center_color = sealColor2;
          teethDiagnozis.tooth75.seal_center = true;
        } else if (
          teethDiagnozis.tooth75.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth75.seal_center_color = sealColor3;
          teethDiagnozis.tooth75.seal_center = true;
        } else {
          teethDiagnozis.tooth75.seal_center =
            !teethDiagnozis.tooth75.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth75.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth75.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth75.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth75.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth75.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth75.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth75.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth75.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth75.seal_bottom = true;
        } else {
          teethDiagnozis.tooth75.seal_bottom =
            !teethDiagnozis.tooth75.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth75.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth75.seal_left_color = sealColor1;
          teethDiagnozis.tooth75.seal_left = true;
        } else if (
          teethDiagnozis.tooth75.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth75.seal_left_color = sealColor2;
          teethDiagnozis.tooth75.seal_left = true;
        } else if (
          teethDiagnozis.tooth75.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth75.seal_left_color = sealColor3;
          teethDiagnozis.tooth75.seal_left = true;
        } else {
          teethDiagnozis.tooth75.seal_left = !teethDiagnozis.tooth75.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth75.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth75.seal_right_color = sealColor1;
          teethDiagnozis.tooth75.seal_right = true;
        } else if (
          teethDiagnozis.tooth75.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth75.seal_right_color = sealColor2;
          teethDiagnozis.tooth75.seal_right = true;
        } else if (
          teethDiagnozis.tooth75.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth75.seal_right_color = sealColor3;
          teethDiagnozis.tooth75.seal_right = true;
        } else {
          teethDiagnozis.tooth75.seal_right =
            !teethDiagnozis.tooth75.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth75.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth75.seal_top_color = sealColor1;
          teethDiagnozis.tooth75.seal_top = true;
        } else if (
          teethDiagnozis.tooth75.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth75.seal_top_color = sealColor2;
          teethDiagnozis.tooth75.seal_top = true;
        } else if (
          teethDiagnozis.tooth75.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth75.seal_top_color = sealColor3;
          teethDiagnozis.tooth75.seal_top = true;
        } else {
          teethDiagnozis.tooth75.seal_top = !teethDiagnozis.tooth75.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth75.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth75.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth75.wedge_shaped_defect_color =
          !teethDiagnozis.tooth75.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth75.show &&
        !teethDiagnozis.tooth35.show
      ) {
        document.getElementById('TH-75').classList.add('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth75.show &&
        teethDiagnozis.tooth35.show
      ) {
        document.getElementById('TH-75').classList.add('f-tooth-active');
        document.getElementById('TH-35').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-75').classList.remove('f-tooth-active');
        document.getElementById('TH-35').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth75.show &&
        !teethDiagnozis.tooth35.show
      ) {
        document.getElementById('TH-75').classList.remove('f-tooth-active');
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth75.show &&
        teethDiagnozis.tooth35.show
      ) {
        document.getElementById('TH-75').classList.remove('f-tooth-active');
        document.getElementById('TH-35').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth35.show) {
        document.getElementById('TH-75').classList.add('f-tooth-active');
        document.getElementById('TH-35').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth75.show) {
        document.getElementById('TH-75').classList.remove('f-tooth-active');
        document.getElementById('TH-35').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth35.show) {
        document.getElementById('TH-35').classList.add('f-tooth-active');
        document.getElementById('TH-75').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="75"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1395 842)"
          className={`st3 st4 st5 ${selectedTooth === 75 ? 'num-active' : ''}`}
        >
          75
        </text>
      </g>
      <g
        id="TH-75"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth75.show || allTeeth) && !teethDiagnozis.tooth75.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          teethDiagnozis.tooth75.show = !teethDiagnozis.tooth75.show;
          teethDiagnozis.tooth35.show = false;

          dispatch(setSelectedToothNumber(75));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              75,
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
          className={`underlay ${selectedTooth === 75 ? 'selected' : ''}`}
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
            d="M1390,1213.9c0,0,12,33,17,51s13,47,17,62s4,36,28,34s28-21,26-38
                        s-11-50-13-65s-6-42-5-66s1-59-1-75s-18-32-20-54s20-52,22-79c0,0-3.6-77.5-4.3-100.8c-0.4-12.7,1.2-39-2.3-61.4
                        c-2.9-18.7-8.4-32.8-23.4-37.8c-26.6-8.9-49,4-55,36s-11,158-11,168c0,36,17,40,17,67c0,37.2-20,41-17,82
                        C1366.4,1155.9,1382,1191.9,1390,1213.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, -245, 39)',
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
                  !tooth75Diagnozis.culttab &&
                  !tooth75Diagnozis.implant &&
                  !tooth75Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st6 change-color ${tooth75Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth75Diagnozis?.apex ? 'apex' : ''}`}
                d="M1762.3,962.7c0.6,4,1.5,8,1.7,12.1c0.4,7.6-1.5,15.3-5.5,22.3c-2.9,5-6.8,9.8-12.3,13.3
                                c-3.9,2.5-8.3,4.2-12.9,5.9c-6.5,2.3-13.2,4.4-20.3,5.4c-7.2,1-14.5,0.7-21.7,0.4c-6.4-0.3-12.8-0.6-19.1-1.5
                                c-4.7-0.7-9.4-1.8-13.7-3.4c-4-1.5-7.6-3.4-11.1-5.4c-5-3-9.5-6.4-12.8-10.6c-3.5-4.3-5.4-9.3-6.8-14.3
                                c-2.5-8.4-3.9-17.1-2.9-25.8c0.7-6.1,2.5-12.2,6-17.8c3.8-6,9.4-11.2,16.8-14.8c7.6-3.7,16.6-5.4,25.6-6
                                c4.6-0.3,9.3-0.4,13.7,0.5c3.4,0.7,6.5,2,10.1,2.1c2.6,0,5.1-0.7,7.6-1.3c4.9-1.2,10-1.9,15.1-2.2c5-0.3,10.1-0.4,15,0.3
                                c5.7,0.8,11.1,2.6,15.6,5.4c3.5,2.3,6.2,5,7.8,8.3c1.5,3,1.9,6.3,2.3,9.5C1761,950.8,1761.3,956.7,1762.3,962.7z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth75Diagnozis?.apex || tooth75Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth75Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth75Diagnozis?.apex ? 'apex' : ''}`}
                d="M1762.3 962.7C1762.9 966.7 1763.8 970.7 1764 974.8C1764.4 982.4 1762.5 990.1 1758.5 997.1C1755.6 1002.1 1751.7 1006.9 1746.2 1010.4C1742.3 1012.9 1737.9 1014.6 1733.3 1016.3C1726.8 1018.6 1720.1 1020.7 1713 1021.7C1705.8 1022.7 1698.5 1022.4 1691.3 1022.1C1684.9 1021.8 1678.5 1021.5 1672.2 1020.6C1667.5 1019.9 1662.8 1018.8 1658.5 1017.2C1654.5 1015.7 1650.9 1013.8 1647.4 1011.8C1642.4 1008.8 1637.9 1005.4 1634.6 1001.2C1631.1 996.9 1629.2 991.9 1627.8 986.9C1625.3 978.5 1623.9 969.8 1624.9 961.1C1625.6 955 1627.4 948.9 1630.9 943.3C1634.7 937.3 1640.3 932.1 1647.7 928.5C1655.3 924.8 1664.3 923.1 1673.3 922.5C1677.9 922.2 1682.6 922.1 1687 923C1690.4 923.7 1693.5 925 1697.1 925.1C1699.7 925.1 1702.2 924.4 1704.7 923.8C1709.6 922.6 1714.7 921.9 1719.8 921.6C1724.8 921.3 1729.9 921.2 1734.8 921.9C1740.5 922.7 1745.9 924.5 1750.4 927.3C1753.9 929.6 1756.6 932.3 1758.2 935.6C1759.7 938.6 1760.1 941.9 1760.5 945.1C1761 950.8 1761.3 956.7 1762.3 962.7Z"
              />
              <path
                className={`st24 change-color ${tooth75Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth75Diagnozis?.apex ? 'apex' : ''}`}
                d="M1664.16 966.325C1665.15 982.262 1659.83 991 1694.58 991C1729.34 991 1726.71 972 1726.71 961.576C1726.71 954.226 1723.46 949 1697.87 949C1672.27 949 1663.18 950.388 1664.16 966.325Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth75Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g>
              <ellipse
                className="st22 target"
                rx="10.9723"
                ry="7.35396"
                transform="matrix(0.0172822 -0.999851 -0.999851 -0.0172822 1718.55 969.098)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="8.41967"
                ry="7.78385"
                transform="matrix(0.643274 -0.765636 -0.765636 -0.643274 1674.72 960.454)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="8.72166"
                ry="7.94529"
                transform="matrix(-0.99786 -0.0653869 -0.0653869 0.99786 1674.87 980.499)"
                style={{ fill: '#e80808' }}
              ></ellipse>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth75Diagnozis.implant || tooth75Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1695.5" cy="970.5" r="26.5"></circle>
            <g className="st27">
              <mask id="implant_75" className="st49">
                <path
                  className="st50"
                  d="M1681.9 954.474L1678.46 953.352C1675.53 956.3 1673.35 959.994 1672.23 964.124L1674.93 966.55C1674.69 967.829 1674.56 969.15 1674.56 970.5C1674.56 971.85 1674.69 973.17 1674.93 974.45L1672.23 976.875C1673.35 981.006 1675.53 984.7 1678.46 987.648L1681.9 986.525C1683.9 988.242 1686.21 989.594 1688.74 990.478L1689.49 994.024C1691.48 994.548 1693.56 994.827 1695.71 994.827C1697.86 994.827 1699.95 994.548 1701.94 994.024L1702.69 990.477C1705.22 989.593 1707.53 988.241 1709.52 986.525L1712.97 987.647C1715.9 984.699 1718.08 981.004 1719.2 976.874L1716.5 974.448C1716.74 973.169 1716.87 971.849 1716.87 970.5C1716.87 969.15 1716.74 967.831 1716.5 966.552L1719.2 964.126C1718.08 959.995 1715.9 956.301 1712.97 953.352L1709.52 954.475C1707.53 952.758 1705.22 951.406 1702.69 950.522L1701.94 946.976C1699.95 946.452 1697.86 946.173 1695.71 946.173C1693.56 946.173 1691.48 946.452 1689.49 946.975L1688.74 950.521C1686.21 951.405 1683.9 952.758 1681.9 954.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1681.9 954.474L1678.46 953.352C1675.53 956.3 1673.35 959.994 1672.23 964.124L1674.93 966.55C1674.69 967.829 1674.56 969.15 1674.56 970.5C1674.56 971.85 1674.69 973.17 1674.93 974.45L1672.23 976.875C1673.35 981.006 1675.53 984.7 1678.46 987.648L1681.9 986.525C1683.9 988.242 1686.21 989.594 1688.74 990.478L1689.49 994.024C1691.48 994.548 1693.56 994.827 1695.71 994.827C1697.86 994.827 1699.95 994.548 1701.94 994.024L1702.69 990.477C1705.22 989.593 1707.53 988.241 1709.52 986.525L1712.97 987.647C1715.9 984.699 1718.08 981.004 1719.2 976.874L1716.5 974.448C1716.74 973.169 1716.87 971.849 1716.87 970.5C1716.87 969.15 1716.74 967.831 1716.5 966.552L1719.2 964.126C1718.08 959.995 1715.9 956.301 1712.97 953.352L1709.52 954.475C1707.53 952.758 1705.22 951.406 1702.69 950.522L1701.94 946.976C1699.95 946.452 1697.86 946.173 1695.71 946.173C1693.56 946.173 1691.48 946.452 1689.49 946.975L1688.74 950.521C1686.21 951.405 1683.9 952.758 1681.9 954.474Z"
              ></path>
              <path
                className="st52"
                d="M1678.46 953.352L1679.08 951.45L1677.91 951.069L1677.04 951.942L1678.46 953.352ZM1681.9 954.474L1681.29 956.376L1682.36 956.725L1683.21 955.989L1681.9 954.474ZM1672.23 964.124L1670.3 963.601L1669.98 964.789L1670.89 965.611L1672.23 964.124ZM1674.93 966.55L1676.89 966.921L1677.1 965.815L1676.27 965.063L1674.93 966.55ZM1674.93 974.45L1676.27 975.937L1677.1 975.184L1676.89 974.079L1674.93 974.45ZM1672.23 976.875L1670.89 975.388L1669.98 976.211L1670.3 977.398L1672.23 976.875ZM1678.46 987.648L1677.04 989.057L1677.91 989.93L1679.08 989.549L1678.46 987.648ZM1681.9 986.525L1683.21 985.011L1682.36 984.275L1681.29 984.624L1681.9 986.525ZM1688.74 990.478L1690.7 990.063L1690.47 988.961L1689.4 988.59L1688.74 990.478ZM1689.49 994.024L1687.54 994.439L1687.79 995.644L1688.98 995.958L1689.49 994.024ZM1701.94 994.024L1702.45 995.958L1703.64 995.643L1703.89 994.438L1701.94 994.024ZM1702.69 990.477L1702.03 988.589L1700.96 988.96L1700.73 990.063L1702.69 990.477ZM1709.52 986.525L1710.14 984.623L1709.07 984.274L1708.22 985.01L1709.52 986.525ZM1712.97 987.647L1712.35 989.549L1713.52 989.93L1714.39 989.057L1712.97 987.647ZM1719.2 976.874L1721.13 977.396L1721.45 976.209L1720.53 975.386L1719.2 976.874ZM1716.5 974.448L1714.53 974.077L1714.33 975.183L1715.16 975.935L1716.5 974.448ZM1716.5 966.552L1715.16 965.064L1714.33 965.817L1714.53 966.923L1716.5 966.552ZM1719.2 964.126L1720.53 965.613L1721.45 964.791L1721.13 963.603L1719.2 964.126ZM1712.97 953.352L1714.39 951.943L1713.52 951.07L1712.35 951.451L1712.97 953.352ZM1709.52 954.475L1708.22 955.989L1709.07 956.726L1710.14 956.376L1709.52 954.475ZM1702.69 950.522L1700.73 950.937L1700.96 952.039L1702.03 952.411L1702.69 950.522ZM1701.94 946.976L1703.89 946.561L1703.64 945.356L1702.45 945.042L1701.94 946.976ZM1689.49 946.975L1688.98 945.041L1687.79 945.355L1687.54 946.561L1689.49 946.975ZM1688.74 950.521L1689.4 952.41L1690.47 952.039L1690.7 950.936L1688.74 950.521ZM1677.84 955.254L1681.29 956.376L1682.52 952.573L1679.08 951.45L1677.84 955.254ZM1674.16 964.647C1675.19 960.86 1677.19 957.469 1679.88 954.762L1677.04 951.942C1673.87 955.13 1671.51 959.128 1670.3 963.601L1674.16 964.647ZM1676.27 965.063L1673.57 962.637L1670.89 965.611L1673.59 968.037L1676.27 965.063ZM1676.56 970.5C1676.56 969.275 1676.67 968.079 1676.89 966.921L1672.96 966.179C1672.7 967.58 1672.56 969.025 1672.56 970.5H1676.56ZM1676.89 974.079C1676.67 972.921 1676.56 971.725 1676.56 970.5H1672.56C1672.56 971.975 1672.7 973.42 1672.96 974.821L1676.89 974.079ZM1673.57 978.362L1676.27 975.937L1673.59 972.963L1670.89 975.388L1673.57 978.362ZM1679.88 986.238C1677.19 983.53 1675.19 980.14 1674.16 976.352L1670.3 977.398C1671.51 981.872 1673.87 985.869 1677.04 989.057L1679.88 986.238ZM1681.29 984.624L1677.84 985.746L1679.08 989.549L1682.52 988.427L1681.29 984.624ZM1689.4 988.59C1687.11 987.79 1685.01 986.566 1683.21 985.011L1680.6 988.04C1682.78 989.918 1685.31 991.398 1688.08 992.366L1689.4 988.59ZM1691.45 993.61L1690.7 990.063L1686.79 990.893L1687.54 994.439L1691.45 993.61ZM1695.71 992.827C1693.74 992.827 1691.82 992.57 1690 992.09L1688.98 995.958C1691.13 996.525 1693.39 996.827 1695.71 996.827V992.827ZM1701.43 992.09C1699.6 992.57 1697.69 992.827 1695.71 992.827V996.827C1698.04 996.827 1700.29 996.525 1702.45 995.958L1701.43 992.09ZM1700.73 990.063L1699.98 993.609L1703.89 994.438L1704.64 990.892L1700.73 990.063ZM1708.22 985.01C1706.41 986.565 1704.32 987.789 1702.03 988.589L1703.35 992.365C1706.12 991.397 1708.65 989.917 1710.83 988.039L1708.22 985.01ZM1713.59 985.745L1710.14 984.623L1708.9 988.426L1712.35 989.549L1713.59 985.745ZM1717.27 976.351C1716.24 980.139 1714.24 983.53 1711.55 986.237L1714.39 989.057C1717.56 985.868 1719.92 981.87 1721.13 977.396L1717.27 976.351ZM1715.16 975.935L1717.86 978.361L1720.53 975.386L1717.84 972.961L1715.16 975.935ZM1714.87 970.5C1714.87 971.724 1714.75 972.92 1714.53 974.077L1718.47 974.819C1718.73 973.418 1718.87 971.974 1718.87 970.5H1714.87ZM1714.53 966.923C1714.75 968.08 1714.87 969.276 1714.87 970.5H1718.87C1718.87 969.025 1718.73 967.581 1718.47 966.18L1714.53 966.923ZM1717.86 962.639L1715.16 965.064L1717.84 968.039L1720.53 965.613L1717.86 962.639ZM1711.55 954.762C1714.24 957.47 1716.24 960.861 1717.27 964.649L1721.13 963.603C1719.92 959.129 1717.56 955.131 1714.39 951.943L1711.55 954.762ZM1710.14 956.376L1713.59 955.254L1712.35 951.451L1708.9 952.573L1710.14 956.376ZM1702.03 952.411C1704.32 953.21 1706.41 954.434 1708.22 955.989L1710.83 952.96C1708.65 951.083 1706.12 949.602 1703.35 948.634L1702.03 952.411ZM1699.98 947.39L1700.73 950.937L1704.64 950.108L1703.89 946.561L1699.98 947.39ZM1695.71 948.173C1697.69 948.173 1699.6 948.429 1701.43 948.91L1702.45 945.042C1700.29 944.475 1698.04 944.173 1695.71 944.173V948.173ZM1690 948.909C1691.82 948.429 1693.74 948.173 1695.71 948.173V944.173C1693.39 944.173 1691.13 944.474 1688.98 945.041L1690 948.909ZM1690.7 950.936L1691.45 947.39L1687.54 946.561L1686.79 950.107L1690.7 950.936ZM1683.21 955.989C1685.01 954.433 1687.11 953.209 1689.4 952.41L1688.08 948.633C1685.31 949.601 1682.78 951.082 1680.6 952.96L1683.21 955.989Z"
                mask="url(#implant_75)"
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
              transform="matrix(-1 0 0 1 1695.5 970.5)"
            ></circle>
            <path
              className="st45"
              d="M1697.42 961.739C1696.87 959.804 1694.13 959.804 1693.58 961.739L1693.07 963.511C1692.77 964.549 1691.71 965.164 1690.66 964.902L1688.87 964.454C1686.92 963.965 1685.55 966.339 1686.95 967.785L1688.23 969.109C1688.98 969.884 1688.98 971.116 1688.23 971.891L1686.95 973.215C1685.55 974.661 1686.92 977.035 1688.87 976.546L1690.66 976.098C1691.71 975.836 1692.77 976.451 1693.07 977.489L1693.58 979.261C1694.13 981.196 1696.87 981.196 1697.42 979.261L1697.93 977.489C1698.23 976.451 1699.29 975.836 1700.34 976.098L1702.13 976.546C1704.08 977.035 1705.45 974.661 1704.05 973.215L1702.77 971.891C1702.02 971.116 1702.02 969.884 1702.77 969.109L1704.05 967.785C1705.45 966.339 1704.08 963.965 1702.13 964.454L1700.34 964.902C1699.29 965.164 1698.23 964.549 1697.93 963.511L1697.42 961.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth75Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth75Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1762.77 962.7C1763.37 966.7 1764.27 970.7 1764.47 974.8C1764.87 982.4 1762.97 990.1 1758.97 997.1C1756.07 1002.1 1752.17 1006.9 1746.67 1010.4C1742.77 1012.9 1738.37 1014.6 1733.77 1016.3C1727.27 1018.6 1720.57 1020.7 1713.47 1021.7C1706.27 1022.7 1698.97 1022.4 1691.77 1022.1C1685.37 1021.8 1678.97 1021.5 1672.67 1020.6C1667.97 1019.9 1663.27 1018.8 1658.97 1017.2C1654.97 1015.7 1651.37 1013.8 1647.87 1011.8C1642.87 1008.8 1638.37 1005.4 1635.07 1001.2C1631.57 996.9 1629.67 991.9 1628.27 986.9C1625.77 978.5 1624.37 969.8 1625.37 961.1C1626.07 955 1627.87 948.9 1631.37 943.3C1635.17 937.3 1640.77 932.1 1648.17 928.5C1655.77 924.8 1664.77 923.1 1673.77 922.5C1678.37 922.2 1683.07 922.1 1687.47 923C1690.87 923.7 1693.97 925 1697.57 925.1C1700.17 925.1 1702.67 924.4 1705.17 923.8C1710.07 922.6 1715.17 921.9 1720.27 921.6C1725.27 921.3 1730.37 921.2 1735.27 921.9C1740.97 922.7 1746.37 924.5 1750.87 927.3C1754.37 929.6 1757.07 932.3 1758.67 935.6C1760.17 938.6 1760.57 941.9 1760.97 945.1C1761.47 950.8 1761.87 956.7 1762.77 962.7Z"
            ></path>
            <path
              className="st47"
              d="M1743.32 964.866C1743.75 967.757 1744.39 970.647 1744.54 973.61C1744.82 979.102 1743.46 984.667 1740.59 989.725C1738.51 993.339 1735.72 996.807 1731.77 999.337C1728.98 1001.14 1725.82 1002.37 1722.52 1003.6C1717.86 1005.26 1713.06 1006.78 1707.97 1007.5C1702.81 1008.23 1697.57 1008.01 1692.41 1007.79C1687.82 1007.57 1683.24 1007.36 1678.72 1006.71C1675.35 1006.2 1671.98 1005.41 1668.9 1004.25C1666.03 1003.17 1663.45 1001.79 1660.94 1000.35C1657.35 998.18 1654.13 995.723 1651.76 992.688C1649.25 989.581 1647.89 985.968 1646.89 982.354C1645.09 976.284 1644.09 969.997 1644.81 963.71C1645.31 959.302 1646.6 954.894 1649.11 950.847C1651.83 946.511 1655.85 942.753 1661.15 940.152C1666.6 937.478 1673.05 936.249 1679.51 935.816C1682.81 935.599 1686.18 935.527 1689.33 936.177C1691.77 936.683 1693.99 937.622 1696.57 937.695C1698.44 937.695 1700.23 937.189 1702.02 936.755C1705.53 935.888 1709.19 935.382 1712.85 935.165C1716.43 934.949 1720.09 934.876 1723.6 935.382C1727.69 935.96 1731.56 937.261 1734.78 939.284C1737.29 940.947 1739.23 942.898 1740.38 945.282C1741.45 947.45 1741.74 949.835 1742.03 952.148C1742.38 956.267 1742.67 960.53 1743.32 964.866Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1695.57 970)"
            ></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth75Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1762.77 962.7C1763.37 966.7 1764.27 970.7 1764.47 974.8C1764.87 982.4 1762.97 990.1 1758.97 997.1C1756.07 1002.1 1752.17 1006.9 1746.67 1010.4C1742.77 1012.9 1738.37 1014.6 1733.77 1016.3C1727.27 1018.6 1720.57 1020.7 1713.47 1021.7C1706.27 1022.7 1698.97 1022.4 1691.77 1022.1C1685.37 1021.8 1678.97 1021.5 1672.67 1020.6C1667.97 1019.9 1663.27 1018.8 1658.97 1017.2C1654.97 1015.7 1651.37 1013.8 1647.87 1011.8C1642.87 1008.8 1638.37 1005.4 1635.07 1001.2C1631.57 996.9 1629.67 991.9 1628.27 986.9C1625.77 978.5 1624.37 969.8 1625.37 961.1C1626.07 955 1627.87 948.9 1631.37 943.3C1635.17 937.3 1640.77 932.1 1648.17 928.5C1655.77 924.8 1664.77 923.1 1673.77 922.5C1678.37 922.2 1683.07 922.1 1687.47 923C1690.87 923.7 1693.97 925 1697.57 925.1C1700.17 925.1 1702.67 924.4 1705.17 923.8C1710.07 922.6 1715.17 921.9 1720.27 921.6C1725.27 921.3 1730.37 921.2 1735.27 921.9C1740.97 922.7 1746.37 924.5 1750.87 927.3C1754.37 929.6 1757.07 932.3 1758.67 935.6C1760.17 938.6 1760.57 941.9 1760.97 945.1C1761.47 950.8 1761.87 956.7 1762.77 962.7Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1744.29 965.275C1744.73 968.206 1745.39 971.136 1745.53 974.139C1745.83 979.707 1744.44 985.347 1741.51 990.475C1739.39 994.138 1736.54 997.654 1732.52 1000.22C1729.66 1002.05 1726.45 1003.29 1723.08 1004.54C1718.33 1006.22 1713.43 1007.76 1708.24 1008.5C1702.97 1009.23 1697.63 1009.01 1692.37 1008.79C1687.69 1008.57 1683.01 1008.35 1678.4 1007.69C1674.96 1007.18 1671.53 1006.37 1668.38 1005.2C1665.46 1004.1 1662.82 1002.71 1660.26 1001.24C1656.61 999.046 1653.32 996.555 1650.9 993.479C1648.34 990.329 1646.95 986.666 1645.93 983.003C1644.1 976.85 1643.08 970.477 1643.81 964.103C1644.32 959.635 1645.64 955.166 1648.2 951.064C1650.98 946.669 1655.07 942.859 1660.48 940.222C1666.04 937.512 1672.62 936.266 1679.2 935.827C1682.57 935.607 1686.01 935.534 1689.22 936.193C1691.71 936.706 1693.98 937.658 1696.61 937.732C1698.51 937.732 1700.34 937.219 1702.17 936.779C1705.75 935.9 1709.48 935.387 1713.21 935.168C1716.87 934.948 1720.6 934.875 1724.18 935.387C1728.35 935.973 1732.3 937.292 1735.59 939.343C1738.15 941.028 1740.12 943.006 1741.29 945.423C1742.39 947.621 1742.68 950.038 1742.97 952.383C1743.34 956.558 1743.63 960.88 1744.29 965.275Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <circle
              className="st57"
              cx="1695.83"
              cy="970"
              r="13"
              style={{ fill: 'black', opacity: tooth75Diagnozis.pin ? 1 : 0 }}
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth75Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth75Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1762.77 962.7C1763.37 966.7 1764.27 970.7 1764.47 974.8C1764.87 982.4 1762.97 990.1 1758.97 997.1C1756.07 1002.1 1752.17 1006.9 1746.67 1010.4C1742.77 1012.9 1738.37 1014.6 1733.77 1016.3C1727.27 1018.6 1720.57 1020.7 1713.47 1021.7C1706.27 1022.7 1698.97 1022.4 1691.77 1022.1C1685.37 1021.8 1678.97 1021.5 1672.67 1020.6C1667.97 1019.9 1663.27 1018.8 1658.97 1017.2C1654.97 1015.7 1651.37 1013.8 1647.87 1011.8C1642.87 1008.8 1638.37 1005.4 1635.07 1001.2C1631.57 996.9 1629.67 991.9 1628.27 986.9C1625.77 978.5 1624.37 969.8 1625.37 961.1C1626.07 955 1627.87 948.9 1631.37 943.3C1635.17 937.3 1640.77 932.1 1648.17 928.5C1655.77 924.8 1664.77 923.1 1673.77 922.5C1678.37 922.2 1683.07 922.1 1687.47 923C1690.87 923.7 1693.97 925 1697.57 925.1C1700.17 925.1 1702.67 924.4 1705.17 923.8C1710.07 922.6 1715.17 921.9 1720.27 921.6C1725.27 921.3 1730.37 921.2 1735.27 921.9C1740.97 922.7 1746.37 924.5 1750.87 927.3C1754.37 929.6 1757.07 932.3 1758.67 935.6C1760.17 938.6 1760.57 941.9 1760.97 945.1C1761.47 950.8 1761.87 956.7 1762.77 962.7Z"
            ></path>
            <path
              className="st47"
              d="M1743.32 964.866C1743.75 967.757 1744.39 970.647 1744.54 973.61C1744.82 979.102 1743.46 984.667 1740.59 989.725C1738.51 993.339 1735.72 996.807 1731.77 999.337C1728.98 1001.14 1725.82 1002.37 1722.52 1003.6C1717.86 1005.26 1713.06 1006.78 1707.97 1007.5C1702.81 1008.23 1697.57 1008.01 1692.41 1007.79C1687.82 1007.57 1683.24 1007.36 1678.72 1006.71C1675.35 1006.2 1671.98 1005.41 1668.9 1004.25C1666.03 1003.17 1663.45 1001.79 1660.94 1000.35C1657.35 998.18 1654.13 995.723 1651.76 992.688C1649.25 989.581 1647.89 985.968 1646.89 982.354C1645.09 976.284 1644.09 969.997 1644.81 963.71C1645.31 959.302 1646.6 954.894 1649.11 950.847C1651.83 946.511 1655.85 942.753 1661.15 940.152C1666.6 937.478 1673.05 936.249 1679.51 935.816C1682.81 935.599 1686.18 935.527 1689.33 936.177C1691.77 936.683 1693.99 937.622 1696.57 937.695C1698.44 937.695 1700.23 937.189 1702.02 936.755C1705.53 935.888 1709.19 935.382 1712.85 935.165C1716.43 934.949 1720.09 934.876 1723.6 935.382C1727.69 935.96 1731.56 937.261 1734.78 939.284C1737.29 940.947 1739.23 942.898 1740.38 945.282C1741.45 947.45 1741.74 949.835 1742.03 952.148C1742.38 956.267 1742.67 960.53 1743.32 964.866Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth75Diagnozis.culttab &&
                !tooth75Diagnozis.abutment &&
                !tooth75Diagnozis.implant &&
                !tooth75Diagnozis.apex &&
                !tooth75Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1769.8,975c-0.3-5.8-1.3-11.5-2-17.3c-1.1-8.5-1.6-16.9-2.3-25.4c-0.4-4.5-0.9-9.2-2.6-13.5
                            c-1-2.7-2.5-5.1-4.2-7.4c-1.3-1.6-2.8-3.1-4.4-4.5c-4.9-4.1-10.8-6.7-17.1-7.9c-5.4-1-10.9-1.1-16.4-0.6c-5.6,0.4-11.1,1.4-16.5,3
                            c-2.7,0.8-5.5,1.8-8.4,1.8c-3.8-0.1-7.3-2-11-3.1c-4.8-1.4-9.9-1.3-15-0.9c-9.8,0.8-19.6,3.1-27.9,8.3c-7.3,4.6-13,11.2-17,18.7
                            c-0.4,0.8-0.8,1.5-1.2,2.3c-3.8,7.9-5.7,16.6-6.4,25.4c-0.9,12.4,0.6,24.8,3.5,36.8c1.7,7.1,3.8,14.2,7.7,20.4
                            c2.9,4.7,6.7,8.8,10.9,12.5c1.1,0.9,2.2,1.8,3.3,2.7c3.8,3,7.8,5.7,12.2,7.9c4.8,2.3,9.8,3.9,15,5c6.9,1.4,13.9,1.9,20.9,2.3
                            c7.9,0.5,15.9,1,23.8-0.3c7.7-1.3,15-4.2,22.1-7.4c4.9-2.3,9.8-4.8,14-8.2c4.9-4.1,8.7-9.3,11.6-15c0.6-1.2,1.2-2.5,1.8-3.8
                            C1768.4,996.7,1770.4,985.9,1769.8,975z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth75.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1769.01 957.296C1769.68 963.675 1771.75 970.054 1771.97 976.592C1772.24 983.828 1773.52 991.12 1772.01 998.197C1770.98 1002.98 1770.7 1007.66 1768.89 1012.16C1765.65 1020.13 1760.36 1029.11 1754.21 1034.69C1749.85 1038.67 1745.99 1037.71 1740.85 1040.42C1737.76 1041.98 1730.36 1045.84 1727.17 1047.17C1722.86 1048.98 1718.44 1048.79 1713.88 1049.71C1709.78 1050.52 1705.66 1049.47 1701.53 1049.49C1697.55 1049.5 1693.57 1051.22 1689.61 1050.99C1685.93 1050.74 1682.24 1048.17 1678.56 1047.8C1675.11 1047.44 1671.67 1049.33 1668.26 1048.63C1663 1047.52 1655.75 1044.4 1650.94 1041.85C1646.46 1039.46 1644.44 1041.79 1640.53 1038.6C1637.79 1036.26 1636.2 1033.41 1633.82 1030.7C1631.34 1027.85 1626.1 1022.12 1624.21 1018.69C1620.3 1011.84 1620.17 1003.86 1618.61 995.889C1617.29 989.547 1616.24 983.098 1615.62 976.592C1614.93 969.356 1612.78 962.05 1613.37 954.744C1613.76 949.877 1612.46 945.01 1613.55 940.243C1614.64 935.482 1617.98 930.82 1619.94 926.357C1621.9 921.951 1623.21 917.817 1626.02 914.077C1629.31 909.693 1633.19 904.531 1637.66 901.433C1641.42 898.82 1648.7 898.153 1652.94 896.666C1658.27 894.796 1663.88 892.398 1669.49 891.865C1674.63 891.386 1679.89 891.227 1684.81 892.662C1688.61 893.778 1692.07 894.851 1696.1 895.011C1699.01 895.011 1701.8 894.895 1704.6 893.938C1710.08 892.024 1715.78 889.587 1721.48 889.109C1727.07 888.63 1732.78 889.791 1738.26 890.908C1741.38 891.534 1744.43 893.864 1747.32 895.258C1750.31 896.705 1753.14 897.245 1755.7 899.519C1759.61 903.188 1763.7 908.814 1765.49 914.077C1767.17 918.861 1766.55 924.124 1766.99 929.227C1768.62 938.317 1767.89 947.727 1769.01 957.296ZM1764 974.8C1763.8 970.7 1762.9 966.7 1762.3 962.7C1761.3 956.7 1761 950.8 1760.5 945.1L1760.49 944.996C1760.09 941.829 1759.68 938.567 1758.2 935.6C1756.6 932.3 1753.9 929.6 1750.4 927.3C1745.9 924.5 1740.5 922.7 1734.8 921.9C1729.9 921.2 1724.8 921.3 1719.8 921.6C1714.7 921.9 1709.6 922.6 1704.7 923.8C1702.2 924.4 1699.7 925.1 1697.1 925.1C1693.5 925 1690.4 923.7 1687 923C1682.6 922.1 1677.9 922.2 1673.3 922.5C1664.3 923.1 1655.3 924.8 1647.7 928.5C1640.3 932.1 1634.7 937.3 1630.9 943.3C1627.4 948.9 1625.6 955 1624.9 961.1C1623.9 969.8 1625.3 978.5 1627.8 986.9C1629.2 991.9 1631.1 996.9 1634.6 1001.2C1637.9 1005.4 1642.4 1008.8 1647.4 1011.8C1650.9 1013.8 1654.5 1015.7 1658.5 1017.2C1662.8 1018.8 1667.5 1019.9 1672.2 1020.6C1678.5 1021.5 1684.9 1021.8 1691.3 1022.1C1698.5 1022.4 1705.8 1022.7 1713 1021.7C1720.1 1020.7 1726.8 1018.6 1733.3 1016.3C1737.9 1014.6 1742.3 1012.9 1746.2 1010.4C1751.7 1006.9 1755.6 1002.1 1758.5 997.1C1762.5 990.1 1764.4 982.4 1764 974.8Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1769.01 957.296C1769.68 963.675 1771.75 970.054 1771.97 976.592C1772.24 983.828 1773.52 991.12 1772.01 998.197C1770.98 1002.98 1770.7 1007.66 1768.89 1012.16C1765.65 1020.13 1760.36 1029.11 1754.21 1034.69C1749.85 1038.67 1745.99 1037.71 1740.85 1040.42C1737.76 1041.98 1730.36 1045.84 1727.17 1047.17C1722.86 1048.98 1718.44 1048.79 1713.88 1049.71C1709.78 1050.52 1705.66 1049.47 1701.53 1049.49C1697.55 1049.5 1693.57 1051.22 1689.61 1050.99C1685.93 1050.74 1682.24 1048.17 1678.56 1047.8C1675.11 1047.44 1671.67 1049.33 1668.26 1048.63C1663 1047.52 1655.75 1044.4 1650.94 1041.85C1646.46 1039.46 1644.44 1041.79 1640.53 1038.6C1637.79 1036.26 1636.2 1033.41 1633.82 1030.7C1631.34 1027.85 1626.1 1022.12 1624.21 1018.69C1620.3 1011.84 1620.17 1003.86 1618.61 995.889C1617.29 989.547 1616.24 983.098 1615.62 976.592C1614.93 969.356 1612.78 962.05 1613.37 954.744C1613.76 949.877 1612.46 945.01 1613.55 940.243C1614.64 935.482 1617.98 930.82 1619.94 926.357C1621.9 921.951 1623.21 917.817 1626.02 914.077C1629.31 909.693 1633.19 904.531 1637.66 901.433C1641.42 898.82 1648.7 898.153 1652.94 896.666C1658.27 894.796 1663.88 892.398 1669.49 891.865C1674.63 891.386 1679.89 891.227 1684.81 892.662C1688.61 893.778 1692.07 894.851 1696.1 895.011C1699.01 895.011 1701.8 894.895 1704.6 893.938C1710.08 892.024 1715.78 889.587 1721.48 889.109C1727.07 888.63 1732.78 889.791 1738.26 890.908C1741.38 891.534 1744.43 893.864 1747.32 895.258C1750.31 896.705 1753.14 897.245 1755.7 899.519C1759.61 903.188 1763.7 908.814 1765.49 914.077C1767.17 918.861 1766.55 924.124 1766.99 929.227C1768.62 938.317 1767.89 947.727 1769.01 957.296ZM1764 974.8C1763.8 970.7 1762.9 966.7 1762.3 962.7C1761.3 956.7 1761 950.8 1760.5 945.1L1760.49 944.996C1760.09 941.829 1759.68 938.567 1758.2 935.6C1756.6 932.3 1753.9 929.6 1750.4 927.3C1745.9 924.5 1740.5 922.7 1734.8 921.9C1729.9 921.2 1724.8 921.3 1719.8 921.6C1714.7 921.9 1709.6 922.6 1704.7 923.8C1702.2 924.4 1699.7 925.1 1697.1 925.1C1693.5 925 1690.4 923.7 1687 923C1682.6 922.1 1677.9 922.2 1673.3 922.5C1664.3 923.1 1655.3 924.8 1647.7 928.5C1640.3 932.1 1634.7 937.3 1630.9 943.3C1627.4 948.9 1625.6 955 1624.9 961.1C1623.9 969.8 1625.3 978.5 1627.8 986.9C1629.2 991.9 1631.1 996.9 1634.6 1001.2C1637.9 1005.4 1642.4 1008.8 1647.4 1011.8C1650.9 1013.8 1654.5 1015.7 1658.5 1017.2C1662.8 1018.8 1667.5 1019.9 1672.2 1020.6C1678.5 1021.5 1684.9 1021.8 1691.3 1022.1C1698.5 1022.4 1705.8 1022.7 1713 1021.7C1720.1 1020.7 1726.8 1018.6 1733.3 1016.3C1737.9 1014.6 1742.3 1012.9 1746.2 1010.4C1751.7 1006.9 1755.6 1002.1 1758.5 997.1C1762.5 990.1 1764.4 982.4 1764 974.8Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1760.5 945.101C1761 950.801 1761.3 956.701 1762.3 962.701C1762.9 966.701 1763.8 970.701 1764 974.801C1764.4 982.401 1762.5 990.101 1758.5 997.101C1755.6 1002.1 1751.7 1006.9 1746.2 1010.4C1742.3 1012.9 1737.9 1014.6 1733.3 1016.3C1726.8 1018.6 1720.1 1020.7 1713 1021.7C1705.8 1022.7 1698.5 1022.4 1691.3 1022.1C1684.9 1021.8 1678.5 1021.5 1672.2 1020.6C1667.5 1019.9 1662.8 1018.8 1658.5 1017.2C1654.5 1015.7 1650.9 1013.8 1647.4 1011.8C1642.4 1008.8 1637.9 1005.4 1634.6 1001.2C1631.1 996.901 1629.2 991.901 1627.8 986.901C1625.3 978.501 1623.9 969.801 1624.9 961.101C1625.6 955.001 1627.4 948.901 1630.9 943.301C1634.7 937.301 1640.3 932.101 1647.7 928.501C1655.3 924.801 1664.3 923.101 1673.3 922.501C1677.9 922.201 1682.6 922.101 1687 923.001C1690.4 923.701 1693.5 925.001 1697.1 925.101C1699.7 925.101 1702.2 924.401 1704.7 923.801C1709.6 922.601 1714.7 921.901 1719.8 921.601C1724.8 921.301 1729.9 921.201 1734.8 921.901C1740.5 922.701 1745.9 924.501 1750.4 927.301C1753.9 929.601 1756.6 932.301 1758.2 935.601C1759.68 938.568 1760.09 941.829 1760.48 944.997M1760.5 945.101L1760.48 944.997M1760.5 945.101C1760.49 945.066 1760.49 945.031 1760.48 944.997M1765.17 960.912C1765.79 965.743 1767.74 970.574 1767.95 975.526C1768.2 981.005 1766.59 986.527 1765.17 991.887C1764.21 995.506 1764.88 999.05 1763.19 1002.46C1760.15 1008.5 1757.07 1015.29 1751.31 1019.52C1747.23 1022.54 1743.62 1025.59 1738.81 1027.65C1735.92 1028.83 1728.99 1027.96 1726 1028.98C1721.97 1030.34 1717.83 1032.47 1713.56 1033.17C1709.72 1033.78 1705.86 1032.99 1702 1033C1698.27 1033.01 1694.55 1035.83 1690.85 1035.65C1687.39 1035.46 1683.94 1034.28 1680.5 1033.99C1677.27 1033.72 1674.05 1031.37 1670.85 1030.84C1665.93 1029.99 1661.01 1030.67 1656.51 1028.73C1652.32 1026.92 1648.56 1022.63 1644.89 1020.21C1642.34 1018.44 1639.9 1018.56 1637.68 1016.5C1635.36 1014.35 1633.26 1010 1631.49 1007.41C1627.83 1002.22 1625.84 996.178 1624.38 990.139C1623.14 985.336 1622.16 980.452 1621.58 975.526C1620.93 970.046 1620.79 964.513 1621.34 958.98C1621.71 955.294 1622.36 951.609 1623.38 947.999C1624.4 944.393 1623.79 940.862 1625.62 937.483C1627.45 934.147 1628.68 931.015 1631.31 928.183C1634.4 924.863 1638.03 920.955 1642.21 918.608C1645.73 916.629 1652.54 916.124 1656.51 914.998C1661.51 913.582 1666.76 911.766 1672 911.362C1676.82 911 1681.74 910.879 1686.34 911.966C1689.9 912.811 1693.15 914.381 1696.92 914.502C1699.64 914.502 1702.26 913.657 1704.87 912.932C1710 911.483 1715.34 909.638 1720.68 909.275C1725.91 908.913 1731.25 909.792 1736.38 910.638C1739.31 911.112 1742.16 912.877 1744.86 913.932C1747.67 915.028 1750.31 915.437 1752.71 917.159C1756.37 919.937 1760.2 924.198 1761.87 928.183C1763.44 931.806 1762.86 935.792 1763.28 939.657C1764.8 946.541 1764.12 953.666 1765.17 960.912Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth75Diagnozis.culttab &&
                !tooth75Diagnozis.abutment &&
                !tooth75Diagnozis.implant &&
                !tooth75Diagnozis.shaper &&
                !tooth75Diagnozis.apex
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
                d="M1735.6,987.9c-2.3,3.3-5.3,6.1-9,8.6c-12,8.2-30.7,11.1-43,9.2c-8.1-1.3-16.8-8.7-22.9-17
                                c-3.2-4.3-5.6-8.8-6.9-12.8c-2.9-8.8-2.1-19.7,3.8-27.3c2-2.6,4.5-4.8,7.7-6.4c8.9-4.5,18.6-4.5,28.3-4.1c3.5,0.1,7,0.4,10.4,0.5
                                c11.1,0.5,22.7,3.6,29.6,12c1.9,2.4,3.5,5.2,4.6,8.5C1742.1,971,1740.8,980.4,1735.6,987.9z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth75.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth75.seal_center ? `seal-fill ${teethDiagnozis.tooth75.seal_center_color}` : ''}
                                `}
                d="M1735.6,987.9c-2.3,3.3-5.3,6.1-9,8.6c-12,8.2-30.7,11.1-43,9.2c-8.1-1.3-16.8-8.7-22.9-17
                                c-3.2-4.3-5.6-8.8-6.9-12.8c-2.9-8.8-2.1-19.7,3.8-27.3c2-2.6,4.5-4.8,7.7-6.4c8.9-4.5,18.6-4.5,28.3-4.1c3.5,0.1,7,0.4,10.4,0.5
                                c11.1,0.5,22.7,3.6,29.6,12c1.9,2.4,3.5,5.2,4.6,8.5C1742.1,971,1740.8,980.4,1735.6,987.9z"
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
                d="M1764.1,1006.8c-0.5,1.3-1.1,2.5-1.8,3.8c-8.2-12.9-19.7-19.6-26.7-22.7c5.2-7.4,6.4-16.9,2.5-28.9
                                c-1.1-3.3-2.6-6.1-4.6-8.5c3-6.6,6.9-13.5,10.6-19c4.2-6.4,11-15.5,14.5-20.1c1.8,2.2,3.2,4.7,4.2,7.4c1.7,4.3,2.2,9,2.6,13.5
                                c0.8,8.5,1.3,16.9,2.3,25.4c0.7,5.8,1.8,11.5,2,17.3C1770.4,985.9,1768.4,996.7,1764.1,1006.8z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth75.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth75.seal_left ? `seal-fill ${teethDiagnozis.tooth75.seal_left_color}` : ''}
                                `}
                d="M1764.1,1006.8c-0.5,1.3-1.1,2.5-1.8,3.8c-8.2-12.9-19.7-19.6-26.7-22.7c5.2-7.4,6.4-16.9,2.5-28.9
                                c-1.1-3.3-2.6-6.1-4.6-8.5c3-6.6,6.9-13.5,10.6-19c4.2-6.4,11-15.5,14.5-20.1c1.8,2.2,3.2,4.7,4.2,7.4c1.7,4.3,2.2,9,2.6,13.5
                                c0.8,8.5,1.3,16.9,2.3,25.4c0.7,5.8,1.8,11.5,2,17.3C1770.4,985.9,1768.4,996.7,1764.1,1006.8z"
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
                d="M1758.6,911.4c-3.4,4.5-10.2,13.6-14.5,20.1c-3.7,5.6-7.6,12.4-10.6,19c-6.9-8.4-18.5-11.5-29.6-12
                                c-3.4-0.1-6.9-0.3-10.4-0.5c-9.7-0.4-19.3-0.3-28.3,4.1c-3.2,1.6-5.8,3.8-7.7,6.4c-4.4-2.2-11.2-5.8-18.7-10.7
                                c-6.3-4.1-10.8-8.4-13.9-11.8c4-7.5,9.7-14.1,17-18.7c8.3-5.2,18.1-7.5,27.9-8.3c5-0.4,10.1-0.5,15,0.9c3.7,1.1,7.2,3,11,3.1
                                c2.9,0,5.6-1,8.3-1.8c5.4-1.6,10.9-2.5,16.5-3c5.5-0.4,11-0.4,16.4,0.6c6.3,1.2,12.2,3.8,17.1,7.9
                                C1755.8,908.3,1757.3,909.8,1758.6,911.4z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth75.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth75.seal_top ? `seal-fill ${teethDiagnozis.tooth75.seal_top_color}` : ''}
                                `}
                d="M1758.6,911.4c-3.4,4.5-10.2,13.6-14.5,20.1c-3.7,5.6-7.6,12.4-10.6,19c-6.9-8.4-18.5-11.5-29.6-12
                                c-3.4-0.1-6.9-0.3-10.4-0.5c-9.7-0.4-19.3-0.3-28.3,4.1c-3.2,1.6-5.8,3.8-7.7,6.4c-4.4-2.2-11.2-5.8-18.7-10.7
                                c-6.3-4.1-10.8-8.4-13.9-11.8c4-7.5,9.7-14.1,17-18.7c8.3-5.2,18.1-7.5,27.9-8.3c5-0.4,10.1-0.5,15,0.9c3.7,1.1,7.2,3,11,3.1
                                c2.9,0,5.6-1,8.3-1.8c5.4-1.6,10.9-2.5,16.5-3c5.5-0.4,11-0.4,16.4,0.6c6.3,1.2,12.2,3.8,17.1,7.9
                                C1755.8,908.3,1757.3,909.8,1758.6,911.4z"
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
                d="M1660.7,988.7c-2.3,2.4-6.3,6.9-10.9,14.3c-4.3,6.9-8,15-10.3,20.6c-4.2-3.7-8-7.8-10.9-12.5
                                c-3.8-6.2-6-13.3-7.7-20.4c-2.8-12.1-4.4-24.5-3.5-36.8c0.7-8.8,2.6-17.4,6.4-25.4c0.4-0.8,0.8-1.5,1.2-2.3
                                c3,3.4,7.6,7.7,13.9,11.8c7.5,4.9,14.2,8.5,18.7,10.7c-5.8,7.6-6.6,18.5-3.8,27.3C1655.1,979.9,1657.6,984.4,1660.7,988.7z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth75.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth75.seal_right ? `seal-fill ${teethDiagnozis.tooth75.seal_right_color}` : ''}
                                `}
                d="M1660.7,988.7c-2.3,2.4-6.3,6.9-10.9,14.3c-4.3,6.9-8,15-10.3,20.6c-4.2-3.7-8-7.8-10.9-12.5
                                c-3.8-6.2-6-13.3-7.7-20.4c-2.8-12.1-4.4-24.5-3.5-36.8c0.7-8.8,2.6-17.4,6.4-25.4c0.4-0.8,0.8-1.5,1.2-2.3
                                c3,3.4,7.6,7.7,13.9,11.8c7.5,4.9,14.2,8.5,18.7,10.7c-5.8,7.6-6.6,18.5-3.8,27.3C1655.1,979.9,1657.6,984.4,1660.7,988.7z"
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
                d="M1762.3,1010.5c-2.9,5.7-6.6,11-11.6,15c-4.2,3.5-9.1,6-14,8.2c-7.1,3.3-14.4,6.2-22.1,7.4
                                c-7.8,1.3-15.8,0.8-23.8,0.3c-7-0.5-14-0.9-20.9-2.4c-5.2-1.1-10.3-2.7-15-5c-4.3-2.1-8.4-4.9-12.2-7.9c-1.1-0.9-2.2-1.8-3.3-2.7
                                c2.3-5.6,6-13.7,10.3-20.6c4.6-7.4,8.6-11.9,10.9-14.3c6.1,8.3,14.8,15.8,22.9,17c12.3,1.9,31-1,43-9.2c3.7-2.5,6.7-5.4,9-8.6
                                C1742.6,990.9,1754.1,997.6,1762.3,1010.5z"
              ></path>
              <path
                className={`st8 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth75.caries_bottom ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth75.seal_bottom ? `seal-fill ${teethDiagnozis.tooth75.seal_bottom_color}` : ''}
                            `}
                d="M1762.3,1010.5c-2.9,5.7-6.6,11-11.6,15c-4.2,3.5-9.1,6-14,8.2c-7.1,3.3-14.4,6.2-22.1,7.4
                                c-7.8,1.3-15.8,0.8-23.8,0.3c-7-0.5-14-0.9-20.9-2.4c-5.2-1.1-10.3-2.7-15-5c-4.3-2.1-8.4-4.9-12.2-7.9c-1.1-0.9-2.2-1.8-3.3-2.7
                                c2.3-5.6,6-13.7,10.3-20.6c4.6-7.4,8.6-11.9,10.9-14.3c6.1,8.3,14.8,15.8,22.9,17c12.3,1.9,31-1,43-9.2c3.7-2.5,6.7-5.4,9-8.6
                                C1742.6,990.9,1754.1,997.6,1762.3,1010.5z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_left &&
                      !tooth75Diagnozis.seal_bottom) ||
                    (!tooth75Diagnozis.seal_left &&
                      tooth75Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1735.5 988C1740.67 989.333 1752.6 994.8 1759 1006"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_left &&
                      !tooth75Diagnozis.seal_center) ||
                    (!tooth75Diagnozis.seal_left &&
                      tooth75Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1735.5 988C1744 979.5 1741.9 957.7 1733.5 950.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_left &&
                      !tooth75Diagnozis.seal_top) ||
                    (!tooth75Diagnozis.seal_left && tooth75Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1733.5 950.5C1735 944.667 1741.4 929.6 1755 916"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_center &&
                      !tooth75Diagnozis.seal_top) ||
                    (!tooth75Diagnozis.seal_center && tooth75Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1733.5 950.5C1721 936.001 1669.5 933.7 1657.5 948.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_right &&
                      !tooth75Diagnozis.seal_top) ||
                    (!tooth75Diagnozis.seal_right && tooth75Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1657.5 948.5C1653 947 1641 941.3 1629 930.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth75Diagnozis.seal_right &&
                      tooth75Diagnozis.seal_center) ||
                    (tooth75Diagnozis.seal_right &&
                      !tooth75Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1657.5 948.5C1650.5 956 1653.3 973.3 1660.5 988.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_right &&
                      !tooth75Diagnozis.seal_bottom) ||
                    (!tooth75Diagnozis.seal_right &&
                      tooth75Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1660 989C1651.73 997.947 1647.06 1006.79 1642 1019"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_center &&
                      !tooth75Diagnozis.seal_bottom) ||
                    (!tooth75Diagnozis.seal_center &&
                      tooth75Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1660.5 988.5C1676.5 1011 1722.7 1003.9 1735.5 987.5"
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
                visibility: tooth75Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth75Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth75Diagnozis.vinir_color}`}
                d="M1620.9 990.7C1622.6 997.8 1624.7 1004.9 1628.6 1011.1C1631.5 1015.8 1635.3 1019.9 1639.5 1023.6L1642.8 1026.3C1646.6 1029.3 1650.6 1032 1655 1034.2C1659.8 1036.5 1664.8 1038.1 1670 1039.2C1676.9 1040.6 1683.9 1041.1 1690.9 1041.5C1698.8 1042 1706.8 1042.5 1714.7 1041.2C1722.4 1039.9 1729.7 1037 1736.8 1033.8C1741.7 1031.5 1746.6 1029 1750.8 1025.6C1755.7 1021.5 1759.5 1016.3 1762.4 1010.6C1763 1009.4 1763.6 1008.1 1764.19 1006.81L1764.2 1006.8C1768.4 996.7 1770.4 985.9 1769.8 975C1769.66 972.319 1769.37 969.658 1769.03 967C1766.24 967.5 1760.49 969.4 1759.83 973C1759.86 973.439 1759.88 973.879 1759.91 974.319C1760.43 983.862 1758.69 993.317 1755.03 1002.16L1755.03 1002.16C1754.51 1003.3 1753.99 1004.44 1753.46 1005.49C1750.94 1010.48 1747.63 1015.03 1743.37 1018.62C1739.71 1021.6 1735.44 1023.78 1731.18 1025.8C1725 1028.6 1718.64 1031.14 1711.94 1032.28C1705.06 1033.41 1698.09 1032.98 1691.22 1032.54C1685.12 1032.19 1679.03 1031.75 1673.02 1030.52C1668.49 1029.56 1664.14 1028.16 1659.96 1026.15C1656.13 1024.22 1652.65 1021.86 1649.34 1019.23L1646.47 1016.87C1642.81 1013.63 1639.5 1010.04 1636.98 1005.92C1633.58 1000.5 1631.75 994.28 1630.27 988.064C1629.87 986.385 1629.5 984.696 1629.16 983C1628.37 979.4 1621.72 978.5 1618.49 978.5C1619.11 982.602 1619.92 986.673 1620.9 990.7Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth75Diagnozis.temporary_crown ||
                tooth75Diagnozis.ceramic_crown ||
                tooth75Diagnozis.mceramic_crown ||
                tooth75Diagnozis.metalic_crown ||
                tooth75Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth75Diagnozis.temporary_crown ||
                tooth75Diagnozis.ceramic_crown ||
                tooth75Diagnozis.mceramic_crown ||
                tooth75Diagnozis.metalic_crown ||
                tooth75Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth75Diagnozis.ceramic_crown_color}
                                ${tooth75Diagnozis.mceramic_crown_color}
                                ${tooth75Diagnozis.metalic_crown_color}
                                ${tooth75Diagnozis.zirconia_crown_color}
                            `}
              d="M1769.8,975c-0.3-5.8-1.3-11.5-2-17.3c-1.1-8.5-1.6-16.9-2.3-25.4c-0.4-4.5-0.9-9.2-2.6-13.5
                            c-1-2.7-2.5-5.1-4.2-7.4c-1.3-1.6-2.8-3.1-4.4-4.5c-4.9-4.1-10.8-6.7-17.1-7.9c-5.4-1-10.9-1.1-16.4-0.6c-5.6,0.4-11.1,1.4-16.5,3
                            c-2.7,0.8-5.5,1.8-8.4,1.8c-3.8-0.1-7.3-2-11-3.1c-4.8-1.4-9.9-1.3-15-0.9c-9.8,0.8-19.6,3.1-27.9,8.3c-7.3,4.6-13,11.2-17,18.7
                            c-0.4,0.8-0.8,1.5-1.2,2.3c-3.8,7.9-5.7,16.6-6.4,25.4c-0.9,12.4,0.6,24.8,3.5,36.8c1.7,7.1,3.8,14.2,7.7,20.4
                            c2.9,4.7,6.7,8.8,10.9,12.5c1.1,0.9,2.2,1.8,3.3,2.7c3.8,3,7.8,5.7,12.2,7.9c4.8,2.3,9.8,3.9,15,5c6.9,1.4,13.9,1.9,20.9,2.3
                            c7.9,0.5,15.9,1,23.8-0.3c7.7-1.3,15-4.2,22.1-7.4c4.9-2.3,9.8-4.8,14-8.2c4.9-4.1,8.7-9.3,11.6-15c0.6-1.2,1.2-2.5,1.8-3.8
                            C1768.4,996.7,1770.4,985.9,1769.8,975z"
            />
            <path
              className={`st3 fissure ${tooth75Diagnozis.fissure ? 'diagnoze' : tooth75Diagnozis.fissure ? 'hidden' : ''}`}
              d="M1742.7,946.3c-1.5,2.6-2.9,5.3-4.1,8.1l-0.2,0.4c-1,2.3-2,4.7-4.1,5.9
                            c-2.4,1.3-4.9,0.8-7.7,0.2c-0.5-0.1-1.1-0.2-1.6-0.3c-5.9-1.1-12.3-0.1-17.7,1c-5,1-10,2.4-14.8,4.2c-0.2-1.9-0.1-3.8,0-5.5
                            c0.1-0.9,0.2-1.9,0.3-2.8c0.3-2.2,0.5-4.4,0.5-6.6c0-2.7-0.5-5.5-0.9-8.1c-0.5-3.2-1.1-6.5-0.8-9.8c0.4-5,2.5-9.8,6.1-13.4
                            l-0.8-0.8c-3.7,3.8-6,8.8-6.4,14c-0.3,3.4,0.3,6.8,0.8,10c0.4,2.6,0.9,5.3,0.9,8c0,2.2-0.3,4.4-0.5,6.5c-0.1,0.9-0.2,1.9-0.3,2.8
                            c-0.2,1.8-0.3,3.9,0,6c0,0,0,0,0,0c-4,1.8-8.5,2-12.7,0.5c-1.8-0.6-3.6-1.6-5.4-2.7l-0.4-0.3c-1.7-1.2-3.5-2.4-5.8-1.9
                            c-1.5,0.3-2.5,1.3-3.5,2.2c-0.4,0.4-0.8,0.7-1.1,1c0-0.1,0-0.1-0.1-0.2l-1,0.5c0,0.1,0.1,0.2,0.1,0.3c-0.1,0-0.1,0.1-0.2,0.1
                            c-1.8,0.8-3.9,0.4-5.9,0c-3.8-0.7-7.6-1.3-11.5-1.8l-0.1,1.1c3.8,0.4,7.6,1,11.4,1.8c2.1,0.4,4.5,0.9,6.6-0.1c0,0,0.1-0.1,0.1-0.1
                            c0.6,1.7,0.8,3.5,0.5,5.2c-0.4,2.6-1.8,4.9-3.8,6.5l0.7,0.8c2.2-1.8,3.7-4.3,4.1-7.2c0.3-2,0.1-4.1-0.6-6c0.5-0.4,1-0.8,1.5-1.2
                            c1-0.9,1.9-1.7,3-1.9c1.8-0.4,3.4,0.7,5,1.8l0.4,0.3c1.8,1.2,3.7,2.2,5.6,2.9c2,0.7,4.1,1.1,6.1,1.1c2.5,0,4.9-0.5,7.2-1.5
                            c0,0.2,0,0.3,0.1,0.5c0.6,2.3,1.8,4.3,2.9,6.3c1.3,2.3,2.6,4.4,3,6.9c0.7,3.8-0.6,7.3-2,11.1c-1.2,3.2-2.3,6.4-2.3,9.9
                            c0.1,2.1,0.6,4.1,1.1,6.1l0.3,1.1c0.5,2.2,1,4.4,1.3,6.6l1.1-0.2c-0.3-2.2-0.8-4.4-1.3-6.7l-0.3-1.1c-0.5-1.9-1-3.9-1.1-5.8
                            c-0.1-3.2,1.1-6.4,2.2-9.5c1.4-3.7,2.8-7.6,2-11.6c-0.5-2.7-1.8-5-3.1-7.2c-1.1-1.9-2.3-3.9-2.8-6.1c0-0.2-0.1-0.4-0.1-0.5
                            c4.8-1.7,9.8-3.1,14.9-4.2c5.3-1.1,11.6-2.1,17.3-1c0.5,0.1,1.1,0.2,1.6,0.3c2.8,0.6,5.7,1.3,8.4-0.3c2.4-1.4,3.6-4,4.6-6.4
                            l0.2-0.4c1.2-2.7,2.5-5.4,4-8L1742.7,946.3z"
            />
          </g>
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{
              visibility:
                !tooth75Diagnozis.culttab &&
                !tooth75Diagnozis.abutment &&
                !tooth75Diagnozis.implant &&
                !tooth75Diagnozis.apex &&
                !tooth75Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth75Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1742.7,946.3c-1.5,2.6-2.9,5.3-4.1,8.1l-0.2,0.4c-1,2.3-2,4.7-4.1,5.9
                            c-2.4,1.3-4.9,0.8-7.7,0.2c-0.5-0.1-1.1-0.2-1.6-0.3c-5.9-1.1-12.3-0.1-17.7,1c-5,1-10,2.4-14.8,4.2c-0.2-1.9-0.1-3.8,0-5.5
                            c0.1-0.9,0.2-1.9,0.3-2.8c0.3-2.2,0.5-4.4,0.5-6.6c0-2.7-0.5-5.5-0.9-8.1c-0.5-3.2-1.1-6.5-0.8-9.8c0.4-5,2.5-9.8,6.1-13.4
                            l-0.8-0.8c-3.7,3.8-6,8.8-6.4,14c-0.3,3.4,0.3,6.8,0.8,10c0.4,2.6,0.9,5.3,0.9,8c0,2.2-0.3,4.4-0.5,6.5c-0.1,0.9-0.2,1.9-0.3,2.8
                            c-0.2,1.8-0.3,3.9,0,6c0,0,0,0,0,0c-4,1.8-8.5,2-12.7,0.5c-1.8-0.6-3.6-1.6-5.4-2.7l-0.4-0.3c-1.7-1.2-3.5-2.4-5.8-1.9
                            c-1.5,0.3-2.5,1.3-3.5,2.2c-0.4,0.4-0.8,0.7-1.1,1c0-0.1,0-0.1-0.1-0.2l-1,0.5c0,0.1,0.1,0.2,0.1,0.3c-0.1,0-0.1,0.1-0.2,0.1
                            c-1.8,0.8-3.9,0.4-5.9,0c-3.8-0.7-7.6-1.3-11.5-1.8l-0.1,1.1c3.8,0.4,7.6,1,11.4,1.8c2.1,0.4,4.5,0.9,6.6-0.1c0,0,0.1-0.1,0.1-0.1
                            c0.6,1.7,0.8,3.5,0.5,5.2c-0.4,2.6-1.8,4.9-3.8,6.5l0.7,0.8c2.2-1.8,3.7-4.3,4.1-7.2c0.3-2,0.1-4.1-0.6-6c0.5-0.4,1-0.8,1.5-1.2
                            c1-0.9,1.9-1.7,3-1.9c1.8-0.4,3.4,0.7,5,1.8l0.4,0.3c1.8,1.2,3.7,2.2,5.6,2.9c2,0.7,4.1,1.1,6.1,1.1c2.5,0,4.9-0.5,7.2-1.5
                            c0,0.2,0,0.3,0.1,0.5c0.6,2.3,1.8,4.3,2.9,6.3c1.3,2.3,2.6,4.4,3,6.9c0.7,3.8-0.6,7.3-2,11.1c-1.2,3.2-2.3,6.4-2.3,9.9
                            c0.1,2.1,0.6,4.1,1.1,6.1l0.3,1.1c0.5,2.2,1,4.4,1.3,6.6l1.1-0.2c-0.3-2.2-0.8-4.4-1.3-6.7l-0.3-1.1c-0.5-1.9-1-3.9-1.1-5.8
                            c-0.1-3.2,1.1-6.4,2.2-9.5c1.4-3.7,2.8-7.6,2-11.6c-0.5-2.7-1.8-5-3.1-7.2c-1.1-1.9-2.3-3.9-2.8-6.1c0-0.2-0.1-0.4-0.1-0.5
                            c4.8-1.7,9.8-3.1,14.9-4.2c5.3-1.1,11.6-2.1,17.3-1c0.5,0.1,1.1,0.2,1.6,0.3c2.8,0.6,5.7,1.3,8.4-0.3c2.4-1.4,3.6-4,4.6-6.4
                            l0.2-0.4c1.2-2.7,2.5-5.4,4-8L1742.7,946.3z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, -249, 24)',
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
                  !tooth75Diagnozis.implant &&
                  !tooth75Diagnozis.apex &&
                  !tooth75Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st9"
                d="M1775.1,1133c0,0.6,0,1.2-0.1,1.9c-10.4,10.8-22.8,21.8-35.7,29.7c-0.4,0.2-0.7,0.4-1.1,0.7
                                c-14.4,8.6-30.1,15-46.7,17.3c-1.3,0.2-2.6,0.3-3.9,0.5c-15.3,1.5-30.6-0.6-44.9-6.3c-0.1-0.1-0.2-0.2-0.3-0.4
                                c-2-8.1-4.7-29.5-5-37.7c-0.4-11.5,0.9-22.9,3.7-34.1l60.9,6.6l37.2-23.3c5.7,6,11.3,12,16.9,18.1
                                C1762.4,1112.8,1771.7,1121.7,1775.1,1133z"
              />
            </g>
            <g>
              <path
                className={`st10 change-color ${tooth75Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1810,1264.3c-1.3,5.8-3.9,11.9-10,13.3c-4.8,1.1-9.5-1.3-13.2-4.5
                                c-17.6-14.7-19.2-39.2-34.1-56c-3.3-3.7-7.2-7-12-9c-4.7-2-10.1-2.6-14.3,0.2c-3.5,2.3-4.9,6.4-5.8,10.3c-1.8,8-2.3,16.3,0,24.2
                                c1.9,6.6,5.7,12.7,10,18.2c4.2,5.3,9.1,10.4,11.7,16.6c1.6,3.7,2.2,7.9,0.6,11.6c-1.5,3.4-4.8,5.9-8.7,6.7
                                c-6.7,0.2-13.3-1-19.3-3.7c-14-6.3-22.8-18.8-29-32c-9-19-12-32.5-20.4-51.7c-5.8-13.5-13.3-20.1-22.7-31.6
                                c14.2,5.6,29.6,7.8,44.9,6.3c1.3-0.1,2.6-0.3,3.9-0.5c16.6-2.3,32.2-8.8,46.7-17.3c0.4-0.2,0.7-0.4,1.1-0.7
                                c12.9-7.8,25.3-18.9,35.7-29.7c0.1-0.7,0.1-1.3,0.1-1.9c0.1,0.5,0.3,0.9,0.4,1.4c1.2,11.2,3.5,15.3,7.5,26
                                c5.8,15.7,14.5,30.4,21,45.9c2.4,5.8,4.6,11.7,6.1,17.7C1813.3,1237.3,1813.1,1251,1810,1264.3z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth75Diagnozis.channel_class} ${tooth75Diagnozis.channel_class} ${tooth75Diagnozis.pulpit ? 'pulpit' : ''} ${tooth75Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1739.3,1164.6c-0.4,0.2-0.7,0.4-1.1,0.7c-0.9,0.5-1.8,1.1-2.7,1.6
                                c-0.1,0-0.1,0.1-0.2,0.1c-0.8,0.5-1.7,0.9-2.5,1.4c-0.1,0.1-0.3,0.2-0.4,0.2c-0.8,0.4-1.6,0.8-2.4,1.2c-0.7,0.4-1.4,0.7-2.2,1.1
                                c-0.1,0-0.2,0.1-0.2,0.1c-0.4,0.2-0.8,0.4-1.3,0.6c-0.7,0.3-1.4,0.7-2.2,1c-0.8,0.4-1.7,0.8-2.5,1.1c-0.5,0.2-1,0.4-1.5,0.7
                                c-1,0.4-2.1,0.9-3.1,1.3c-0.5,0.2-1,0.4-1.6,0.6c-2.6,1-5.3,1.9-8,2.7c-0.5,0.2-1.1,0.3-1.6,0.5c-0.5,0.2-1.1,0.3-1.6,0.5
                                c-0.6,0.2-1.1,0.3-1.6,0.4c-0.4,0.1-0.7,0.2-1.1,0.3c-0.3,0.1-0.7,0.2-1,0.2c-0.9,0.2-1.9,0.4-2.8,0.6c-2,0.4-4.1,0.8-6.2,1.1
                                c-0.8-3.7-1.8-7.4-3.1-11c-2.6-7.1-6.6-13.8-9.1-20.9c-1.9-5.3-3-10.8-3.4-16.4c7.6,4.8,17.4,6.1,26.5,3.4
                                c7.5-2.2,13.8-6.8,17.6-12.9c3.5,3.3,6.1,7.2,7.8,11.5c1.7,4.5,2.3,9.3,3.8,13.9C1733.3,1155.4,1736,1160.1,1739.3,1164.6z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth75Diagnozis.channel_class} ${tooth75Diagnozis.channel_class} ${tooth75Diagnozis.pulpit ? 'pulpit' : ''} ${tooth75Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1775.2,1211.5c-1.1,0.5-2.3,1-3.5,1.6c-4.8-7.3-10.3-14.3-16.9-20.5
                                c-13-12.4-32.4-19.3-45.1-8.8c-5.5,4.6-7.3,11.3-8.2,17.8c-1.2,9.5-0.9,18.9,0.6,28.1c-1.4,0-2.8-0.1-4.2-0.2
                                c-1.6-7.8-2.5-15.7-3.3-23.6c-0.8-7.8-1.4-15.7-3-23.3c2.1-0.3,4.1-0.6,6.2-1.1c0.9-0.2,1.9-0.4,2.8-0.6c0.3-0.1,0.7-0.2,1-0.2
                                c0.4-0.1,0.7-0.2,1.1-0.3c0.5-0.1,1.1-0.3,1.6-0.4c0.5-0.1,1.1-0.3,1.6-0.5c0.5-0.1,1.1-0.3,1.6-0.5c2.7-0.8,5.3-1.7,8-2.7
                                c0.5-0.2,1-0.4,1.6-0.6c1.1-0.4,2.1-0.8,3.1-1.3c0.5-0.2,1-0.4,1.5-0.7c0.8-0.4,1.7-0.7,2.5-1.1c0.7-0.3,1.4-0.7,2.1-1
                                c0.4-0.2,0.9-0.4,1.3-0.6c0.1,0,0.1-0.1,0.2-0.1c0.7-0.4,1.4-0.7,2.2-1.1c0.8-0.4,1.6-0.8,2.3-1.2c0.1-0.1,0.3-0.2,0.4-0.2
                                c0.9-0.5,1.7-0.9,2.5-1.4c0.1,0,0.1-0.1,0.2-0.1c0.9-0.5,1.8-1,2.7-1.6c0.4-0.2,0.7-0.4,1.1-0.7c3,4.2,6.4,8.2,9.8,12.1
                                C1758.5,1187.9,1767.6,1199.3,1775.2,1211.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth75Diagnozis.channel_class} ${tooth75Diagnozis.channel_class} ${tooth75Diagnozis.pulpit ? 'pulpit' : ''} ${tooth75Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1702.1,1229.7c-1.4,0-2.8-0.1-4.2-0.2c0.7,3.6,1.6,7.2,2.7,10.8c6.2,20.8,18.8,39.6,36.1,54.1
                                c-13-12.8-22.7-27.8-28.8-43.9C1705.3,1243.8,1703.3,1236.8,1702.1,1229.7z"
              />
              <path
                className="st22 target part"
                d="M1781.1,1221.5c-1.8-3.4-3.8-6.8-5.9-10c-1.1,0.5-2.3,1-3.5,1.6c8.3,12.7,14.4,26.8,19.7,41
                                c2.8,7.4,5.3,14.9,7.7,22.4C1796.5,1257.3,1790.4,1238.7,1781.1,1221.5z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage75 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth75Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1775.1 1133C1775.1 1133.6 1775 1134.2 1775 1134.9C1766.3 1143.9 1756.3 1153 1745.7 1160.3C1743.6 1161.8 1741.4 1163.2 1739.3 1164.5C1738.9 1164.7 1738.6 1164.9 1738.2 1165.2C1736.1 1166.4 1734 1167.7 1731.8 1168.8C1719.2 1175.6 1705.7 1180.6 1691.5 1182.5C1690.2 1182.7 1688.9 1182.8 1687.6 1183C1672.4 1184.5 1657 1182.4 1642.7 1176.7C1642.6 1176.6 1642.5 1176.5 1642.4 1176.3C1640.5 1168.2 1637.7 1146.8 1637.4 1138.6C1637 1127.1 1638.3 1115.7 1641.1 1104.5L1702 1111.1L1739.2 1087.8C1744.9 1093.8 1750.5 1099.8 1756.1 1105.9C1762.4 1112.8 1771.7 1121.7 1775.1 1133Z"
            />
            <path
              className="st57"
              style={{ fill: tooth75Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M1684.4 1109.3L1765.3 1211.1L1766.5 1212.6L1780.4 1230.1C1781.1 1231 1782.4 1231.2 1783.3 1230.6C1784.3 1230 1784.6 1228.7 1784 1227.7L1771.4 1205.5L1745.6 1160.4L1713.4 1104.1L1702 1111.2L1684.4 1109.3Z"
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth75Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth75Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M1783.4,1230.6L1783.4,1230.6c-0.9,0.6-2.2,0.4-2.9-0.5l-48.7-61.3c2.2-1.1,4.3-2.3,6.4-3.6
                            c0.4-0.2,0.7-0.4,1.1-0.7c2.2-1.3,4.3-2.7,6.4-4.2l38.4,67.3C1784.7,1228.7,1784.4,1230,1783.4,1230.6z"
            />
            <path
              className="st15"
              d="M1775.1,1133c0,0.6-0.1,1.2-0.1,1.9c-8.7,9-18.7,18.1-29.3,25.4c-2.1,1.5-4.3,2.9-6.4,4.2
                            c-0.4,0.2-0.7,0.4-1.1,0.7c-2.1,1.2-4.2,2.5-6.4,3.6c-12.6,6.8-26.1,11.8-40.3,13.7c-1.3,0.2-2.6,0.3-3.9,0.5
                            c-15.2,1.5-30.6-0.6-44.9-6.3c-0.1-0.1-0.2-0.2-0.3-0.4c-1.9-8.1-4.7-29.5-5-37.7c-0.4-11.5,0.9-22.9,3.7-34.1l60.9,6.6
                            l37.2-23.3c5.7,6,11.3,12,16.9,18.1C1762.4,1112.8,1771.7,1121.7,1775.1,1133z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth75Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth75Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M1648.2,1178.7l61.4,20.1l25.4-12.8l39.3-49.3c-10.7,11.1-22.8,20.7-36.1,28.6c-15.5,9.2-32.5,16-50.5,17.8
                            C1674.3,1184.4,1660.9,1182.9,1648.2,1178.7z"
            />
            <path
              className="st17"
              d="M1637.5,1138.7c0.3,8.3,3.4,29.5,5.4,37.5c0.2,0.3,0.4,0.6,0.7,0.8c1.5,0.6,3.1,1.2,4.7,1.7
                            c12.7,4.2,26.1,5.7,39.5,4.3c18-1.8,35-8.6,50.5-17.8c13.2-7.9,25.4-17.5,36.1-28.6c0-0.2,0-0.4,0-0.6
                            c-6.1-7.3-11.7-23.2-18-30.1c-5.5-6.1-11.2-12.1-16.9-18.1l-37.2,23.3l-60.9-6.6C1638.4,1115.8,1637.1,1127.2,1637.5,1138.7z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1732.81 1142.02C1732.27 1139.6 1729.67 1138.25 1727.38 1139.2L1681.87 1158.02C1679.58 1158.97 1678.69 1161.75 1680.02 1163.85L1701.38 1197.67C1702.42 1199.32 1704.5 1199.98 1706.31 1199.23L1739.17 1185.51C1740.96 1184.76 1741.95 1182.84 1741.53 1180.94L1732.81 1142.02Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth75Diagnozis.abutment ||
                tooth75Diagnozis.implant ||
                tooth75Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1746.1,1178.3c0,0,8.3,24.5,10.2,33.1c1.9,8.6,8.6,33.6,10.2,41.5c1.5,7.9,3.1,16.5,3.1,17.3
                            c0,0.9-4.7,10.9-13.4,13s-16.2-2-16.2-2s-12.9-19.6-15.2-24.4c-2.4-4.9-18.3-36.2-20.7-41.1s-7.2-16.8-7.2-16.8L1746.1,1178.3z"
            />
            <line
              className="st19"
              x1="1753.5"
              y1="1183.9"
              x2="1698.7"
              y2="1215.8"
            ></line>
            <line
              className="st19"
              x1="1759.5"
              y1="1201.9"
              x2="1704.7"
              y2="1233.8"
            ></line>
            <line
              className="st19"
              x1="1766.5"
              y1="1217.9"
              x2="1713.7"
              y2="1249.8"
            ></line>
            <line
              className="st19"
              x1="1772.5"
              y1="1235.9"
              x2="1719.7"
              y2="1267.8"
            ></line>
            <line
              className="st19"
              x1="1778.5"
              y1="1252.9"
              x2="1725.7"
              y2="1284.8"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth75Diagnozis.culttab &&
                !tooth75Diagnozis.abutment &&
                !tooth75Diagnozis.implant &&
                !tooth75Diagnozis.shaper &&
                !tooth75Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1774.9,1128.6c-0.2-2-0.6-4.1-1-6.6c-1.4-9.9-5-19.3-9.6-28.2
                            c-2.9-5.6-6.1-11-9.6-16.2c-4.9-3.3-10-6.2-15.4-8.5c-2.6-1.2-5.3-2.2-8-3.1c-3.9-1.3-7.8-2.4-11.8-3.2l-6.9,2.4
                            c-1.8,4.1-4.6,7.6-8.1,10.3c-4.2,3.2-9.4,5.3-11.9,9.9c-1.4,2.5-1.8,5.3-1.5,8.1c0.4,3.7,1.8,7.1,4.2,9.9l-2,1.6
                            c-0.5-5.1-3.8-9.5-8.5-11.4c-4.4-1.7-9.3-1-13.9-2.1c-4.4-1-8.1-3.6-11.7-6.2c-3-2.1-5.9-4.2-9-6.3l-8.7,1.2
                            c-0.1,0.1-0.2,0.1-0.2,0.2c-4.9,3.2-9.2,7.2-12.8,11.9c-7.3,9.4-11.4,21-11.6,33c0.2,0.8,0.3,1.6,0.5,2.4
                            c1.6,7.7,3.5,15.3,6.5,22.5c2.3,5.4,5.2,10.6,8.6,15.3c2.9,4,6.2,7.8,9.8,11.2c14.3,5.7,29.9,7.9,45.2,6.4
                            c18-1.8,35-8.6,50.5-17.8c13.2-7.9,26.1-19.2,36.8-30.3C1775.2,1132.6,1775.1,1130.6,1774.9,1128.6z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped hRoot hImplant hEmpty"
            style={{ visibility: 'inherit' }}
          >
            <path
              className="st7 st59"
              d="M1774.22 1123.92C1774.5 1125.62 1774.75 1127.13 1774.9 1128.6C1775.1 1130.6 1775.2 1132.6 1774.8 1135C1764.1 1146.1 1751.2 1157.4 1738 1165.3C1722.5 1174.5 1705.5 1181.3 1687.5 1183.1C1672.2 1184.6 1656.6 1182.4 1642.3 1176.7C1638.7 1173.3 1635.4 1169.5 1632.5 1165.5C1629.1 1160.8 1626.2 1155.6 1623.9 1150.2C1620.9 1143 1619 1135.4 1617.4 1127.7C1617.3 1127.3 1617.23 1126.9 1617.15 1126.5C1617.08 1126.1 1617 1125.7 1616.9 1125.3C1617.1 1113.3 1621.2 1101.7 1628.5 1092.3C1632.1 1087.6 1636.4 1083.6 1641.3 1080.4C1641.3 1080.34 1641.34 1080.31 1641.39 1080.28C1641.42 1080.26 1641.46 1080.24 1641.5 1080.2L1650.2 1079C1652.27 1080.4 1654.25 1081.8 1656.22 1083.2C1657.21 1083.9 1658.2 1084.6 1659.2 1085.3C1662.8 1087.9 1666.5 1090.5 1670.9 1091.5C1672.87 1091.97 1674.89 1092.11 1676.91 1092.25C1679.6 1092.44 1682.28 1092.63 1684.8 1093.6C1689.5 1095.5 1692.8 1099.9 1693.3 1105L1695.3 1103.4C1692.9 1100.6 1691.5 1097.2 1691.1 1093.5C1690.8 1090.7 1691.2 1087.9 1692.6 1085.4C1694.37 1082.14 1697.5 1080.14 1700.66 1078.11C1701.97 1077.27 1703.28 1076.43 1704.5 1075.5C1708 1072.8 1710.8 1069.3 1712.6 1065.2L1719.5 1062.8C1723.5 1063.6 1727.4 1064.7 1731.3 1066C1734 1066.9 1736.7 1067.9 1739.3 1069.1C1744.7 1071.4 1749.8 1074.3 1754.7 1077.6C1758.2 1082.8 1761.4 1088.2 1764.3 1093.8C1768.9 1102.7 1772.5 1112.1 1773.9 1122C1774.01 1122.67 1774.12 1123.31 1774.22 1123.92ZM1732.31 1162.2C1719 1170.1 1704.4 1175.94 1688.95 1177.48C1671.4 1179.2 1652.49 1177.22 1641.72 1162.37C1640.07 1160.09 1638.56 1157.67 1637.2 1155.16C1636.57 1154 1637.29 1152.59 1638.58 1152.33C1686.47 1142.78 1713.93 1136.1 1760.51 1122.61C1761.64 1122.29 1762.83 1123 1762.93 1124.17C1764.56 1143.38 1738.11 1158.81 1732.85 1161.88C1732.63 1162.01 1732.45 1162.11 1732.31 1162.2Z"
            ></path>
            <path
              className={`st7 ${tooth75Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1688.95 1177.48C1704.4 1175.94 1719 1170.1 1732.31 1162.2C1735.87 1160.08 1764.62 1144.18 1762.93 1124.17C1762.83 1123 1761.64 1122.29 1760.51 1122.61C1713.93 1136.1 1686.47 1142.78 1638.58 1152.33C1637.29 1152.59 1636.57 1154 1637.2 1155.16C1638.56 1157.67 1640.07 1160.09 1641.72 1162.37C1652.49 1177.22 1671.4 1179.2 1688.95 1177.48Z"
            />
            <path
              className={`st60
                                    ${tooth75Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth75Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth75Diagnozis.seal_cervical_color}`}
              d="M1688.95 1177.48C1704.4 1175.94 1719 1170.1 1732.31 1162.2C1735.87 1160.08 1764.62 1144.18 1762.93 1124.17C1762.83 1123 1761.64 1122.29 1760.51 1122.61C1713.93 1136.1 1686.47 1142.78 1638.58 1152.33C1637.29 1152.59 1636.57 1154 1637.2 1155.16C1638.56 1157.67 1640.07 1160.09 1641.72 1162.37C1652.49 1177.22 1671.4 1179.2 1688.95 1177.48Z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth75.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1772 1112.5L1771 1113.5L1770.5 1115L1771 1117.5L1770.5 1119.5L1770 1123L1770.5 1124.5L1770 1127.5L1768.5 1130L1767.5 1133L1766 1136V1138L1764 1139.5L1762.5 1142L1759.5 1145.5L1756.5 1147.5L1755.5 1149.5L1752 1152L1749 1155L1745 1157.5L1744 1159L1739 1162L1737.5 1163L1731.5 1166L1728 1168L1727 1169H1725L1722 1171L1717.5 1172.5L1713.5 1175L1705.5 1176.5L1701.5 1178L1697 1179.5H1691.5L1687 1180.5H1680C1678.83 1181.17 1676.3 1182.4 1675.5 1182C1674.5 1181.5 1669.5 1180.5 1668 1180.5H1664.5L1660 1178H1652.5L1647.5 1172.5L1640.5 1171L1635.5 1163L1631.5 1159L1629.5 1155L1628.5 1152L1625.5 1148.5L1622.5 1146.5L1623 1149L1624 1152L1625 1154V1156L1626.5 1158V1160.5L1628.5 1163V1166.5L1630.5 1169L1631.5 1172.5L1634 1175.5L1635.5 1179.5L1639.5 1183.5L1641.5 1186.5L1644 1189L1647.5 1191L1650 1193L1652.5 1195.5L1656 1196.5L1658.5 1200L1661 1203L1669.5 1205.5L1678 1204L1684 1205.5H1695.5L1708 1201.5H1720L1728 1196.5L1739 1193L1749 1186L1756.5 1182L1763.5 1176.5L1768.5 1169L1775.5 1166L1779 1160.5L1782 1156V1152L1780 1147.5L1779 1142V1136L1777 1130V1124.5L1775.5 1119.5L1774 1117.5V1115L1772 1112.5Z"
            ></path>
            <path
              className="st61 level1"
              d="M1771 1113.5L1772 1112.5L1773.5 1115V1117.5L1774.5 1119.5L1775.5 1123V1125.5L1777 1127.5V1130L1778 1133V1136L1775.5 1139.5L1774.5 1142L1770.5 1144.5L1770 1147.5L1766 1150.5L1762.5 1155L1759.5 1159L1755.5 1162L1751 1164L1750 1166L1746.5 1169L1741.5 1171L1737.5 1173.5L1731.5 1176.5L1727 1179.5H1721L1714.5 1182C1713.17 1182.33 1710.1 1183 1708.5 1183C1706.9 1183 1703.17 1185 1701.5 1186H1694.5C1693 1186.5 1689.7 1187.5 1688.5 1187.5L1683 1188.5L1680 1187.5L1675.5 1188.5H1670H1666L1663 1187.5L1658 1186H1654.5L1649.5 1184H1646.5L1644 1182H1641.5L1640.5 1180.5L1639.5 1179L1638 1177.5L1635.5 1175V1172.5L1633.5 1171L1631.5 1169L1630.5 1166L1629.5 1164L1628.5 1160.5L1627 1159L1625.5 1156.5V1155L1624.5 1152L1623.5 1150.5L1622.5 1146.5L1625.5 1148.5L1628.5 1152L1629.5 1155L1631.5 1159L1635.5 1163L1640.5 1171L1647.5 1172.5L1652.5 1178H1660L1664.5 1180.5H1668C1669.5 1180.5 1674.5 1181.5 1675.5 1182C1676.3 1182.4 1678.83 1181.17 1680 1180.5H1687L1691.5 1179.5H1697L1701.5 1178L1705.5 1176.5L1713.5 1175L1717.5 1172.5L1722 1171L1725 1169H1727L1728 1168L1731.5 1166L1737.5 1163L1739 1162L1744 1159L1745 1157.5L1749 1155L1752 1152L1755.5 1149.5L1756.5 1147.5L1759.5 1145.5L1762.5 1142L1764 1139.5L1766 1138V1136L1767.5 1133L1768.5 1130L1770 1127.5L1770.5 1124.5L1770 1123L1770.5 1119.5L1771 1117.5L1770.5 1115L1771 1113.5Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth75Diagnozis.culttab &&
                !tooth75Diagnozis.abutment &&
                !tooth75Diagnozis.implant &&
                !tooth75Diagnozis.shaper &&
                !tooth75Diagnozis.apex
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
                d="M1741.4,1107.1c-11.7,8-29.6,18.3-47.2,20.8c-19.9,2.8-38.7,2.2-48.9,1.5c-1.3-5.6-2.7-11.6-3.6-17.1
                                c-1.3-8.4-0.9-22.6-0.4-31.9c0.1-0.1,0.2-0.1,0.2-0.2l8.7-1.2c3,2.1,6,4.2,9,6.3c3.6,2.5,7.3,5.1,11.7,6.2
                                c4.6,1.1,9.5,0.3,13.9,2.1c4.8,1.9,8.1,6.3,8.5,11.4l2-1.6c-2.4-2.8-3.8-6.3-4.2-9.9c-0.3-2.8,0.1-5.7,1.5-8.1
                                c2.6-4.6,7.8-6.7,11.9-9.9c3.5-2.7,6.3-6.2,8.1-10.3l6.9-2.4c4,0.8,7.9,1.9,11.8,3.2c0.4,3.9,1.2,10.3,3.2,18.5
                                C1736.8,1093.8,1739.1,1101.3,1741.4,1107.1z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth75.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth75.seal_center ? `seal-fill ${teethDiagnozis.tooth75.seal_center_color}` : ''}
                                `}
                d="M1741.4,1107.1c-11.7,8-29.6,18.3-47.2,20.8c-19.9,2.8-38.7,2.2-48.9,1.5c-1.3-5.6-2.7-11.6-3.6-17.1
                                c-1.3-8.4-0.9-22.6-0.4-31.9c0.1-0.1,0.2-0.1,0.2-0.2l8.7-1.2c3,2.1,6,4.2,9,6.3c3.6,2.5,7.3,5.1,11.7,6.2
                                c4.6,1.1,9.5,0.3,13.9,2.1c4.8,1.9,8.1,6.3,8.5,11.4l2-1.6c-2.4-2.8-3.8-6.3-4.2-9.9c-0.3-2.8,0.1-5.7,1.5-8.1
                                c2.6-4.6,7.8-6.7,11.9-9.9c3.5-2.7,6.3-6.2,8.1-10.3l6.9-2.4c4,0.8,7.9,1.9,11.8,3.2c0.4,3.9,1.2,10.3,3.2,18.5
                                C1736.8,1093.8,1739.1,1101.3,1741.4,1107.1z"
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
                d="M1774.9,1128.6c-3.8-0.2-8.5-0.5-11.4-0.9c-5.4-0.8-15.2-6.2-18.4-12.2c-1.2-2.3-2.5-5.1-3.7-8.3
                                c-2.2-5.8-4.5-13.3-6.8-22.6c-2-8.2-2.9-14.6-3.2-18.5c2.7,0.9,5.4,1.9,8,3.1c5.4,2.4,10.5,5.2,15.4,8.5
                                c3.6,5.2,6.8,10.6,9.6,16.2c4.5,8.9,8.2,18.3,9.6,28.2C1774.3,1124.6,1774.7,1126.6,1774.9,1128.6z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth75.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth75.seal_left ? `seal-fill ${teethDiagnozis.tooth75.seal_left_color}` : ''}
                                `}
                d="M1774.9,1128.6c-3.8-0.2-8.5-0.5-11.4-0.9c-5.4-0.8-15.2-6.2-18.4-12.2c-1.2-2.3-2.5-5.1-3.7-8.3
                                c-2.2-5.8-4.5-13.3-6.8-22.6c-2-8.2-2.9-14.6-3.2-18.5c2.7,0.9,5.4,1.9,8,3.1c5.4,2.4,10.5,5.2,15.4,8.5
                                c3.6,5.2,6.8,10.6,9.6,16.2c4.5,8.9,8.2,18.3,9.6,28.2C1774.3,1124.6,1774.7,1126.6,1774.9,1128.6z"
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
                d="M1632.6,1165.5c-3.4-4.8-6.3-9.9-8.6-15.3c-3-7.2-5-14.8-6.5-22.5c-0.2-0.8-0.3-1.6-0.5-2.4
                                c0.2-12,4.2-23.6,11.6-33c3.6-4.6,7.9-8.6,12.8-11.9c-0.5,9.3-0.9,23.5,0.4,31.9c0.9,5.5,2.3,11.6,3.6,17.1
                                c1.5,6.3,2.8,11.9,3,15.7C1648.7,1151.4,1644.5,1162.1,1632.6,1165.5z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth75.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth75.seal_right ? `seal-fill ${teethDiagnozis.tooth75.seal_right_color}` : ''}
                                `}
                d="M1632.6,1165.5c-3.4-4.8-6.3-9.9-8.6-15.3c-3-7.2-5-14.8-6.5-22.5c-0.2-0.8-0.3-1.6-0.5-2.4
                                c0.2-12,4.2-23.6,11.6-33c3.6-4.6,7.9-8.6,12.8-11.9c-0.5,9.3-0.9,23.5,0.4,31.9c0.9,5.5,2.3,11.6,3.6,17.1
                                c1.5,6.3,2.8,11.9,3,15.7C1648.7,1151.4,1644.5,1162.1,1632.6,1165.5z"
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
                d="M1775,1134.9c-10.7,11.1-23.6,22.4-36.8,30.3c-15.5,9.2-32.5,16-50.5,17.8c-15.4,1.5-30.9-0.7-45.2-6.4
                                c-3.6-3.4-6.9-7.2-9.8-11.2c11.9-3.4,16.1-14,15.7-20.3c-0.2-3.8-1.5-9.5-3-15.7c10.2,0.7,29,1.3,48.9-1.5
                                c17.5-2.5,35.5-12.8,47.2-20.8c1.3,3.3,2.5,6.1,3.7,8.3c3.2,6.1,13,11.4,18.4,12.2c2.9,0.4,7.6,0.7,11.4,0.9
                                C1775.1,1130.6,1775.2,1132.6,1775,1134.9z"
              />
              <path
                className={`st8 caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth75.caries_bottom ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth75.seal_bottom ? `seal-fill ${teethDiagnozis.tooth75.seal_bottom_color}` : ''}
                            `}
                d="M1775,1134.9c-10.7,11.1-23.6,22.4-36.8,30.3c-15.5,9.2-32.5,16-50.5,17.8c-15.4,1.5-30.9-0.7-45.2-6.4
                                c-3.6-3.4-6.9-7.2-9.8-11.2c11.9-3.4,16.1-14,15.7-20.3c-0.2-3.8-1.5-9.5-3-15.7c10.2,0.7,29,1.3,48.9-1.5
                                c17.5-2.5,35.5-12.8,47.2-20.8c1.3,3.3,2.5,6.1,3.7,8.3c3.2,6.1,13,11.4,18.4,12.2c2.9,0.4,7.6,0.7,11.4,0.9
                                C1775.1,1130.6,1775.2,1132.6,1775,1134.9z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_left &&
                      !tooth75Diagnozis.seal_top &&
                      !tooth75Diagnozis.seal_center) ||
                    (tooth75Diagnozis.seal_left &&
                      tooth75Diagnozis.seal_top &&
                      !tooth75Diagnozis.seal_center) ||
                    (!tooth75Diagnozis.seal_left &&
                      tooth75Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1739.5 1108L1731.5 1071.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_left &&
                      !tooth75Diagnozis.seal_bottom) ||
                    (!tooth75Diagnozis.seal_left &&
                      tooth75Diagnozis.seal_bottom &&
                      !tooth75Diagnozis.seal_center) ||
                    (!tooth75Diagnozis.seal_left &&
                      tooth75Diagnozis.seal_bottom &&
                      tooth75Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1739.5 1108C1742.5 1120 1742.9 1129.3 1770.5 1128.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_bottom &&
                      !tooth75Diagnozis.seal_center) ||
                    (!tooth75Diagnozis.seal_bottom &&
                      tooth75Diagnozis.seal_center) ||
                    (tooth75Diagnozis.seal_right &&
                      tooth75Diagnozis.seal_left &&
                      !tooth75Diagnozis.seal_center &&
                      !tooth75Diagnozis.seal_top) ||
                    (!tooth75Diagnozis.seal_top &&
                      !tooth75Diagnozis.seal_bottom &&
                      tooth75Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1739.5 1108C1728.67 1118.5 1694.6 1137.4 1645 1129"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_right &&
                      !tooth75Diagnozis.seal_bottom) ||
                    (!tooth75Diagnozis.seal_right &&
                      tooth75Diagnozis.seal_bottom &&
                      !tooth75Diagnozis.seal_center) ||
                    (!tooth75Diagnozis.seal_right &&
                      tooth75Diagnozis.seal_bottom &&
                      tooth75Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1645 1129C1646.5 1141.5 1653.9 1147.8 1637.5 1163"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth75Diagnozis.seal_right &&
                      !tooth75Diagnozis.seal_bottom &&
                      !tooth75Diagnozis.seal_center) ||
                    (tooth75Diagnozis.seal_right &&
                      tooth75Diagnozis.seal_bottom &&
                      !tooth75Diagnozis.seal_center) ||
                    (!tooth75Diagnozis.seal_right &&
                      tooth75Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1645 1129C1642.5 1119.5 1640.1 1098.1 1640.5 1086.5"
              />
            </g>
          </g>
          <g>
            <g
              className="vinir"
              style={{
                visibility: tooth75Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth75Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth75Diagnozis.vinir_color}`}
                d="M1774.9 1128.6C1774.7 1126.6 1774.3 1124.5 1773.9 1122C1772.5 1112.1 1768.9 1102.7 1764.3 1093.8C1761.4 1088.2 1758.2 1082.8 1754.7 1077.6C1749.8 1074.3 1744.7 1071.4 1739.3 1069.1C1736.7 1067.9 1734 1066.9 1731.3 1066C1727.4 1064.7 1723.5 1063.6 1719.5 1062.8L1712.6 1065.2C1710.8 1069.3 1708 1072.8 1704.5 1075.5C1700.3 1078.7 1695.1 1080.8 1692.6 1085.4C1691.2 1087.9 1690.8 1090.7 1691.1 1093.5C1691.5 1097.2 1692.9 1100.6 1695.3 1103.4L1693.3 1105C1692.8 1099.9 1689.5 1095.5 1684.8 1093.6C1680.4 1091.9 1675.5 1092.6 1670.9 1091.5C1666.5 1090.5 1662.8 1087.9 1659.2 1085.3C1656.2 1083.2 1653.3 1081.1 1650.2 1079L1641.5 1080.2C1641.4 1080.3 1641.3 1080.3 1641.3 1080.4C1636.4 1083.6 1632.1 1087.6 1628.5 1092.3C1621.2 1101.7 1617.1 1113.3 1616.9 1125.3C1617.1 1126.1 1617.2 1126.9 1617.4 1127.7C1619 1135.4 1620.9 1143 1623.9 1150.2C1626.2 1155.6 1629.1 1160.8 1632.5 1165.5C1635.4 1169.5 1638.7 1173.3 1642.3 1176.7C1656.6 1182.4 1672.2 1184.6 1687.5 1183.1C1705.5 1181.3 1722.5 1174.5 1738 1165.3C1751.2 1157.4 1764.1 1146.1 1774.8 1135C1775.2 1132.6 1775.1 1130.6 1774.9 1128.6Z"
              ></path>
            </g>
          </g>
          <g
            className="crown"
            style={{
              visibility:
                tooth75Diagnozis.temporary_crown ||
                tooth75Diagnozis.ceramic_crown ||
                tooth75Diagnozis.mceramic_crown ||
                tooth75Diagnozis.metalic_crown ||
                tooth75Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth75Diagnozis.temporary_crown ||
                tooth75Diagnozis.ceramic_crown ||
                tooth75Diagnozis.mceramic_crown ||
                tooth75Diagnozis.metalic_crown ||
                tooth75Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth75Diagnozis.ceramic_crown_color}
                                ${tooth75Diagnozis.mceramic_crown_color}
                                ${tooth75Diagnozis.metalic_crown_color}
                                ${tooth75Diagnozis.zirconia_crown_color}
                            `}
              d="M1774.9,1128.6c-0.2-2-0.6-4.1-1-6.6c-1.4-9.9-5-19.3-9.6-28.2
                            c-2.9-5.6-6.1-11-9.6-16.2c-4.9-3.3-10-6.2-15.4-8.5c-2.6-1.2-5.3-2.2-8-3.1c-3.9-1.3-7.8-2.4-11.8-3.2l-6.9,2.4
                            c-1.8,4.1-4.6,7.6-8.1,10.3c-4.2,3.2-9.4,5.3-11.9,9.9c-1.4,2.5-1.8,5.3-1.5,8.1c0.4,3.7,1.8,7.1,4.2,9.9l-2,1.6
                            c-0.5-5.1-3.8-9.5-8.5-11.4c-4.4-1.7-9.3-1-13.9-2.1c-4.4-1-8.1-3.6-11.7-6.2c-3-2.1-5.9-4.2-9-6.3l-8.7,1.2
                            c-0.1,0.1-0.2,0.1-0.2,0.2c-4.9,3.2-9.2,7.2-12.8,11.9c-7.3,9.4-11.4,21-11.6,33c0.2,0.8,0.3,1.6,0.5,2.4
                            c1.6,7.7,3.5,15.3,6.5,22.5c2.3,5.4,5.2,10.6,8.6,15.3c2.9,4,6.2,7.8,9.8,11.2c14.3,5.7,29.9,7.9,45.2,6.4
                            c18-1.8,35-8.6,50.5-17.8c13.2-7.9,26.1-19.2,36.8-30.3C1775.2,1132.6,1775.1,1130.6,1774.9,1128.6z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
