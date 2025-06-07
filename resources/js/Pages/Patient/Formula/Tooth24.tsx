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
import PeriodontitStage24 from './periodontit24';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth24() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth24Diagnozis = teethDiagnozis.tooth24;
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
        teethDiagnozis.tooth24.caries_bottom =
          !teethDiagnozis.tooth24.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth24.caries_center =
          !teethDiagnozis.tooth24.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth24.caries_left =
          !teethDiagnozis.tooth24.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth24.caries_right =
          !teethDiagnozis.tooth24.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth24.caries_top = !teethDiagnozis.tooth24.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth24.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth24.seal_center_color = sealColor1;
          teethDiagnozis.tooth24.seal_center = true;
        } else if (
          teethDiagnozis.tooth24.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth24.seal_center_color = sealColor2;
          teethDiagnozis.tooth24.seal_center = true;
        } else if (
          teethDiagnozis.tooth24.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth24.seal_center_color = sealColor3;
          teethDiagnozis.tooth24.seal_center = true;
        } else {
          teethDiagnozis.tooth24.seal_center =
            !teethDiagnozis.tooth24.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth24.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth24.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth24.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth24.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth24.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth24.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth24.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth24.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth24.seal_bottom = true;
        } else {
          teethDiagnozis.tooth24.seal_bottom =
            !teethDiagnozis.tooth24.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth24.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth24.seal_left_color = sealColor1;
          teethDiagnozis.tooth24.seal_left = true;
        } else if (
          teethDiagnozis.tooth24.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth24.seal_left_color = sealColor2;
          teethDiagnozis.tooth24.seal_left = true;
        } else if (
          teethDiagnozis.tooth24.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth24.seal_left_color = sealColor3;
          teethDiagnozis.tooth24.seal_left = true;
        } else {
          teethDiagnozis.tooth24.seal_left = !teethDiagnozis.tooth24.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth24.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth24.seal_right_color = sealColor1;
          teethDiagnozis.tooth24.seal_right = true;
        } else if (
          teethDiagnozis.tooth24.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth24.seal_right_color = sealColor2;
          teethDiagnozis.tooth24.seal_right = true;
        } else if (
          teethDiagnozis.tooth24.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth24.seal_right_color = sealColor3;
          teethDiagnozis.tooth24.seal_right = true;
        } else {
          teethDiagnozis.tooth24.seal_right =
            !teethDiagnozis.tooth24.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth24.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth24.seal_top_color = sealColor1;
          teethDiagnozis.tooth24.seal_top = true;
        } else if (
          teethDiagnozis.tooth24.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth24.seal_top_color = sealColor2;
          teethDiagnozis.tooth24.seal_top = true;
        } else if (
          teethDiagnozis.tooth24.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth24.seal_top_color = sealColor3;
          teethDiagnozis.tooth24.seal_top = true;
        } else {
          teethDiagnozis.tooth24.seal_top = !teethDiagnozis.tooth24.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth24.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth24.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth24.wedge_shaped_defect_color =
          !teethDiagnozis.tooth24.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth24.show) {
        document.getElementById('TH-24').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth64.show) {
        document.getElementById('TH-64').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth24.show) {
        document.getElementById('TH-24').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth64.show) {
          document.getElementById('TH-64').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth24.show) {
        document.getElementById('TH-64').classList.remove('f-tooth-active');
        document.getElementById('TH-24').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth24.show) {
        document.getElementById('TH-24').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth64.show) {
          document.getElementById('TH-64').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="24"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1339.1816 716.1968)"
          className={`st3 st4 st5 ${selectedTooth === 24 ? 'num-active' : ''}`}
        >
          24
        </text>
      </g>
      <g
        id="TH-24"
        className={`f-tooth-init ${(teethDiagnozis.tooth24.show || allTeeth) && !teethDiagnozis.tooth24.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth24.show = !teethDiagnozis.tooth24.show;
            teethDiagnozis.tooth64.show = false;
          }
          dispatch(setSelectedToothNumber(24));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              24,
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
          className={`underlay ${selectedTooth === 24 ? 'selected' : ''}`}
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
            d="M1339,261.9c0,0-2,39-5,69s-17,111-18,126s7.8,37.6,13,49c11,24,4,33-3,46
                        c-4.9,9.2-9.7,21.9-8.8,37.5c0.8,15.5-1.2,89.5,6.8,116.5c6.6,22.1,19,27,33,27s41-1,43-37s5-94,3-114s-19-40-20-54s20-41,20-71
                        s-6-41-4-74s3-63,4-91s-2-57-8-65s-21-9-35-4C1349,226.9,1343,229.9,1339,261.9z"
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
                  !tooth24Diagnozis.culttab &&
                  !tooth24Diagnozis.implant &&
                  !tooth24Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth24Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth24Diagnozis?.apex ? 'apex' : ''}`}
                d="M1394.4,600.4c1.5-6,1.5-11.9-0.8-17.4c-2.4-5.6-7.2-10.3-12.4-14.1
                                c-6.3-4.6-13.6-8.2-21.6-8.2c-8.6,0.1-16.1,4.2-22.2,9.4c-3.1,2.6-6,5.6-8.1,8.9c-2.5,3.8-4,8.1-4,12.6c0,7.4,3.9,13.9,7.4,20.3
                                c2.5,4.5,4.6,9,7.6,13.5c1.9,3,4.4,5.9,7.5,8c4,2.6,8.8,3.7,13.5,4c4.1,0.2,8.2-0.2,12.1-1.7c4.6-1.9,8.3-5.2,10.6-9.1
                                c2.2-3.6,3.2-7.6,4.7-11.4C1390.5,610.2,1393.1,605.7,1394.4,600.4z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth24Diagnozis?.apex || tooth24Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth24Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth24Diagnozis?.apex ? 'apex' : ''}`}
                d="M1394.4 600.4C1395.9 594.4 1395.9 588.5 1393.6 583C1391.2 577.4 1386.4 572.7 1381.2 568.9C1374.9 564.3 1367.6 560.7 1359.6 560.7C1351 
                                560.8 1343.5 564.9 1337.4 570.1C1334.3 572.7 1331.4 575.7 1329.3 579C1326.8 582.8 1325.3 587.1 1325.3 591.6C1325.3 599 1329.2 605.5 1332.7 611.9C1335.2 616.4 1337.3 620.9 1340.3 625.4C1342.2 628.4 1344.7 631.3 
                                1347.8 633.4C1351.8 636 1356.6 637.1 1361.3 637.4C1365.4 637.6 1369.5 637.2 1373.4 635.7C1378 633.8 1381.7 630.5 1384 626.6C1386.2 623 1387.2 619 1388.7 615.2C1390.5 610.2 
                                1393.1 605.7 1394.4 600.4Z"
              />
              <path
                className={`st53 change-color ${tooth24Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth24Diagnozis?.apex ? 'apex' : ''}`}
                d="M1368.99 599C1367.59 611.07 1364.96 621 1359.99 621C1355.02 621 1352.38 611.07 1350.99 599C1349.49 586 1355.99 577 1359.99 577C1364.49 577
                                 1370.49 586 1368.99 599Z"
              />
            </g>
          </g>
          {/* PULPIT */}
          <g
            className="pulp"
            style={{ visibility: tooth24Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth24Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M1364.92 586.821C1364.37 591.656 1362.71 597 1359.99 597C1357.26 597 1355.54 591.664 1355.05 586.821C1354.5 581.393 1357.73 578 1359.99 578C1362.24 578 1365.47 581.987 1364.92 586.821Z"
                style={{ fill: '#e80808' }}
              ></path>
              <path
                className="st22 target"
                d="M1364.99 610.661C1364.99 615.356 1361.86 620 1359.98 620C1358.11 620 1354.99 615.356 1354.99 610.661C1354.99 605.967 1357.48 603 1359.98 603C1362.48 603 1364.99 605.967 1364.99 610.661Z"
                style={{ fill: '#e80808' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth24Diagnozis.implant || tooth24Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1359.5" cy="596.5" r="20.5" />
            <g className="st27">
              <mask id="implant_24" className="st49">
                <path
                  className="st50"
                  d="M1348.87 583.971L1346.18 583.093C1343.89 585.398 1342.18 588.286 1341.31 591.515L1343.42 593.412C1343.23 594.412 1343.13 595.444 1343.13 596.5C1343.13 597.555 1343.23 598.588 1343.42 599.588L1341.31 601.484C1342.18 604.713 1343.89 607.602 1346.18 609.906L1348.87 609.029C1350.43 610.371 1352.24 611.428 1354.22 612.119L1354.8 614.892C1356.36 615.301 1357.99 615.519 1359.67 615.519C1361.35 615.519 1362.98 615.301 1364.53 614.891L1365.12 612.118C1367.1 611.427 1368.91 610.37 1370.46 609.028L1373.16 609.906C1375.45 607.601 1377.15 604.712 1378.03 601.483L1375.92 599.587C1376.11 598.587 1376.21 597.555 1376.21 596.5C1376.21 595.445 1376.11 594.413 1375.92 593.413L1378.03 591.517C1377.15 588.287 1375.45 585.399 1373.16 583.094L1370.46 583.971C1368.91 582.629 1367.1 581.572 1365.12 580.881L1364.53 578.108C1362.98 577.699 1361.35 577.48 1359.67 577.48C1357.99 577.48 1356.36 577.698 1354.8 578.108L1354.22 580.88C1352.24 581.571 1350.43 582.629 1348.87 583.971Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1348.87 583.971L1346.18 583.093C1343.89 585.398 1342.18 588.286 1341.31 591.515L1343.42 593.412C1343.23 594.412 1343.13 595.444 1343.13 596.5C1343.13 597.555 1343.23 598.588 1343.42 599.588L1341.31 601.484C1342.18 604.713 1343.89 607.602 1346.18 609.906L1348.87 609.029C1350.43 610.371 1352.24 611.428 1354.22 612.119L1354.8 614.892C1356.36 615.301 1357.99 615.519 1359.67 615.519C1361.35 615.519 1362.98 615.301 1364.53 614.891L1365.12 612.118C1367.1 611.427 1368.91 610.37 1370.46 609.028L1373.16 609.906C1375.45 607.601 1377.15 604.712 1378.03 601.483L1375.92 599.587C1376.11 598.587 1376.21 597.555 1376.21 596.5C1376.21 595.445 1376.11 594.413 1375.92 593.413L1378.03 591.517C1377.15 588.287 1375.45 585.399 1373.16 583.094L1370.46 583.971C1368.91 582.629 1367.1 581.572 1365.12 580.881L1364.53 578.108C1362.98 577.699 1361.35 577.48 1359.67 577.48C1357.99 577.48 1356.36 577.698 1354.8 578.108L1354.22 580.88C1352.24 581.571 1350.43 582.629 1348.87 583.971Z"
              ></path>
              <path
                className="st52"
                d="M1346.18 583.093L1346.8 581.192L1345.63 580.81L1344.76 581.683L1346.18 583.093ZM1348.87 583.971L1348.25 585.872L1349.32 586.221L1350.18 585.485L1348.87 583.971ZM1341.31 591.515L1339.38 590.992L1339.06 592.18L1339.97 593.002L1341.31 591.515ZM1343.42 593.412L1345.38 593.783L1345.59 592.677L1344.75 591.924L1343.42 593.412ZM1343.42 599.588L1344.75 601.075L1345.59 600.323L1345.38 599.217L1343.42 599.588ZM1341.31 601.484L1339.97 599.997L1339.06 600.82L1339.38 602.007L1341.31 601.484ZM1346.18 609.906L1344.76 611.316L1345.63 612.189L1346.8 611.808L1346.18 609.906ZM1348.87 609.029L1350.18 607.514L1349.32 606.778L1348.25 607.127L1348.87 609.029ZM1354.22 612.119L1356.17 611.705L1355.94 610.602L1354.88 610.231L1354.22 612.119ZM1354.8 614.892L1352.85 615.306L1353.1 616.511L1354.29 616.826L1354.8 614.892ZM1364.53 614.891L1365.04 616.825L1366.23 616.511L1366.49 615.306L1364.53 614.891ZM1365.12 612.118L1364.46 610.23L1363.4 610.602L1363.16 611.704L1365.12 612.118ZM1370.46 609.028L1371.08 607.127L1370.01 606.778L1369.16 607.514L1370.46 609.028ZM1373.16 609.906L1372.54 611.808L1373.71 612.189L1374.58 611.316L1373.16 609.906ZM1378.03 601.483L1379.96 602.006L1380.28 600.818L1379.36 599.996L1378.03 601.483ZM1375.92 599.587L1373.95 599.216L1373.74 600.321L1374.58 601.074L1375.92 599.587ZM1375.92 593.413L1374.58 591.926L1373.74 592.678L1373.95 593.784L1375.92 593.413ZM1378.03 591.517L1379.36 593.004L1380.28 592.181L1379.96 590.994L1378.03 591.517ZM1373.16 583.094L1374.58 581.684L1373.71 580.811L1372.54 581.192L1373.16 583.094ZM1370.46 583.971L1369.16 585.486L1370.01 586.222L1371.08 585.873L1370.46 583.971ZM1365.12 580.881L1363.16 581.296L1363.4 582.398L1364.46 582.769L1365.12 580.881ZM1364.53 578.108L1366.49 577.694L1366.23 576.489L1365.04 576.174L1364.53 578.108ZM1354.8 578.108L1354.29 576.174L1353.1 576.488L1352.85 577.693L1354.8 578.108ZM1354.22 580.88L1354.88 582.769L1355.94 582.397L1356.17 581.295L1354.22 580.88ZM1345.56 584.995L1348.25 585.872L1349.49 582.069L1346.8 581.192L1345.56 584.995ZM1343.24 592.038C1344.02 589.152 1345.54 586.567 1347.6 584.503L1344.76 581.683C1342.23 584.228 1340.34 587.42 1339.38 590.992L1343.24 592.038ZM1344.75 591.924L1342.65 590.028L1339.97 593.002L1342.08 594.899L1344.75 591.924ZM1345.13 596.5C1345.13 595.57 1345.22 594.661 1345.38 593.783L1341.45 593.04C1341.24 594.163 1341.13 595.319 1341.13 596.5H1345.13ZM1345.38 599.217C1345.22 598.338 1345.13 597.43 1345.13 596.5H1341.13C1341.13 597.68 1341.24 598.837 1341.45 599.959L1345.38 599.217ZM1342.65 602.971L1344.75 601.075L1342.08 598.101L1339.97 599.997L1342.65 602.971ZM1347.6 608.496C1345.54 606.432 1344.02 603.847 1343.24 600.961L1339.38 602.007C1340.34 605.579 1342.23 608.771 1344.76 611.316L1347.6 608.496ZM1348.25 607.127L1345.56 608.005L1346.8 611.808L1349.49 610.931L1348.25 607.127ZM1354.88 610.231C1353.14 609.624 1351.55 608.695 1350.18 607.514L1347.56 610.543C1349.31 612.047 1351.34 613.232 1353.56 614.008L1354.88 610.231ZM1356.76 614.477L1356.17 611.705L1352.26 612.534L1352.85 615.306L1356.76 614.477ZM1359.67 613.519C1358.16 613.519 1356.7 613.324 1355.31 612.958L1354.29 616.826C1356.01 617.278 1357.81 617.519 1359.67 617.519V613.519ZM1364.02 612.957C1362.63 613.323 1361.17 613.519 1359.67 613.519V617.519C1361.52 617.519 1363.32 617.278 1365.04 616.825L1364.02 612.957ZM1363.16 611.704L1362.58 614.477L1366.49 615.306L1367.08 612.533L1363.16 611.704ZM1369.16 607.514C1367.79 608.695 1366.2 609.623 1364.46 610.23L1365.78 614.007C1368 613.231 1370.03 612.046 1371.77 610.543L1369.16 607.514ZM1373.78 608.004L1371.08 607.127L1369.84 610.93L1372.54 611.808L1373.78 608.004ZM1376.1 600.96C1375.31 603.847 1373.79 606.431 1371.74 608.496L1374.58 611.316C1377.11 608.77 1378.99 605.578 1379.96 602.006L1376.1 600.96ZM1374.58 601.074L1376.69 602.97L1379.36 599.996L1377.26 598.099L1374.58 601.074ZM1374.21 596.5C1374.21 597.43 1374.12 598.337 1373.95 599.216L1377.88 599.958C1378.1 598.836 1378.21 597.68 1378.21 596.5H1374.21ZM1373.95 593.784C1374.12 594.662 1374.21 595.57 1374.21 596.5H1378.21C1378.21 595.32 1378.1 594.164 1377.88 593.042L1373.95 593.784ZM1376.69 590.029L1374.58 591.926L1377.26 594.9L1379.36 593.004L1376.69 590.029ZM1371.74 584.503C1373.79 586.568 1375.31 589.153 1376.1 592.039L1379.96 590.994C1378.99 587.421 1377.11 584.229 1374.58 581.684L1371.74 584.503ZM1371.08 585.873L1373.78 584.995L1372.54 581.192L1369.84 582.069L1371.08 585.873ZM1364.46 582.769C1366.2 583.376 1367.79 584.305 1369.16 585.486L1371.77 582.457C1370.03 580.954 1368 579.768 1365.78 578.993L1364.46 582.769ZM1362.58 578.523L1363.16 581.296L1367.08 580.467L1366.49 577.694L1362.58 578.523ZM1359.67 579.48C1361.17 579.48 1362.63 579.676 1364.02 580.042L1365.04 576.174C1363.32 575.721 1361.52 575.48 1359.67 575.48V579.48ZM1355.31 580.042C1356.7 579.676 1358.16 579.48 1359.67 579.48V575.48C1357.81 575.48 1356.01 575.721 1354.29 576.174L1355.31 580.042ZM1356.17 581.295L1356.76 578.522L1352.85 577.693L1352.26 580.466L1356.17 581.295ZM1350.18 585.485C1351.55 584.304 1353.14 583.376 1354.88 582.769L1353.56 578.992C1351.34 579.767 1349.31 580.953 1347.56 582.456L1350.18 585.485Z"
                mask="url(#implant_24)"
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
              r="22.435"
              transform="matrix(-1 0 0 1 1359.57 596.435)"
            />
            <path
              className="st45"
              d="M1361.42 587.739C1360.87 585.804 1358.13 585.804 1357.58 587.739L1357.07 589.511C1356.77 590.549 1355.71 591.164 1354.66 590.902L1352.87 590.454C1350.92 589.965 1349.55 592.339 1350.95 593.785L1352.23 595.109C1352.98 595.884 1352.98 597.116 1352.23 597.891L1350.95 599.215C1349.55 600.661 1350.92 603.035 1352.87 602.546L1354.66 602.098C1355.71 601.836 1356.77 602.451 1357.07 603.489L1357.58 605.261C1358.13 607.196 1360.87 607.196 1361.42 605.261L1361.93 603.489C1362.23 602.451 1363.29 601.836 1364.34 602.098L1366.13 602.546C1368.08 603.035 1369.45 600.661 1368.05 599.215L1366.77 597.891C1366.02 597.116 1366.02 595.884 1366.77 595.109L1368.05 593.785C1369.45 592.339 1368.08 589.965 1366.13 590.454L1364.34 590.902C1363.29 591.164 1362.23 590.549 1361.93 589.511L1361.42 587.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth24Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth24Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1394.66 600.4C1396.16 594.4 1396.16 588.5 1393.86 583C1391.46 577.4 1386.66 572.7 1381.46 568.9C1375.16 564.3 1367.86 560.7 1359.86 560.7C1351.26 560.8 1343.76 564.9 
                            1337.66 570.1C1334.56 572.7 1331.66 575.7 1329.56 579C1327.06 582.8 1325.56 587.1 1325.56 591.6C1325.56 599 1329.46 605.5 1332.96 611.9C1335.46 616.4 
                            1337.56 620.9 1340.56 625.4C1342.46 628.4 1344.96 631.3 1348.06 633.4C1352.06 636 1356.86 637.1 1361.56 637.4C1365.66 637.6 1369.76 637.2 1373.66 635.7C1378.26 633.8 
                            1381.96 630.5 1384.26 626.6C1386.46 623 1387.46 619 1388.96 615.2C1390.66 610.2 1393.26 605.7 1394.66 600.4Z"
            />
            <path
              className="st47"
              d="M1383.56 599.898C1384.57 595.833 1384.57 591.836 1383.03 588.109C1381.42 584.315 1378.2 581.131 1374.72 578.556C1370.5 575.439 1365.6 573 1360.24 573C1354.48 
                            573.068 1349.45 575.846 1345.37 579.369C1343.29 581.13 1341.35 583.163 1339.94 585.399C1338.26 587.974 1337.26 590.887 1337.26 593.936C1337.26 598.95 1339.87 603.354 1342.22 607.69C1343.89 610.739 
                            1345.3 613.788 1347.31 616.837C1348.58 618.87 1350.26 620.835 1352.34 622.257C1355.02 624.019 1358.23 624.764 1361.38 624.968C1364.13 625.103 1366.88 624.832 1369.49 623.816C1372.57 
                            622.528 1375.05 620.292 1376.59 617.65C1378.07 615.211 1378.74 612.501 1379.74 609.926C1380.88 606.538 1382.62 603.489 1383.56 599.898Z"
            />
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1360.26 595)"
            />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth24Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1394.66 600.399C1396.16 594.399 1396.16 588.499 1393.86 582.999C1391.46 577.399 1386.66 572.699 1381.46 568.899C1375.16 564.299 
                            1367.86 560.699 1359.86 560.699C1351.26 560.799 1343.76 564.899 1337.66 570.099C1334.56 572.699 1331.66 575.699 1329.56 578.999C1327.06 582.799 1325.56 587.099 1325.56 591.599C1325.56 
                            598.999 1329.46 605.499 1332.96 611.899C1335.46 616.399 1337.56 620.899 1340.56 625.399C1342.46 628.399 1344.96 631.299 1348.06 633.399C1352.06 635.999 1356.86 637.099 1361.56 637.399C1365.66 637.599 1369.76 637.199 1373.66 635.699C1378.26 
                            633.799 1381.96 630.499 1384.26 626.599C1386.46 622.999 1387.46 618.999 1388.96 615.199C1390.66 610.199 1393.26 605.699 1394.66 600.399Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st56 hIntact"
              d="M1383.56 599.897C1384.57 595.832 1384.57 591.835 1383.02 588.108C1381.42 584.314 1378.2 581.13 1374.72 578.555C1370.49 575.438 1365.6 572.999 1360.24 
                            572.999C1354.48 573.067 1349.45 575.845 1345.37 579.368C1343.29 581.13 1341.35 583.162 1339.94 585.398C1338.26 587.973 1337.26 590.886 1337.26 593.935C1337.26 598.949 1339.87 603.353 1342.22 607.689C1343.89 610.738 
                            1345.3 613.787 1347.31 616.836C1348.58 618.869 1350.26 620.834 1352.34 622.256C1355.02 624.018 1358.23 624.763 1361.38 624.967C1364.13 625.102 1366.88 624.831 1369.49 623.815C1372.57 
                            622.527 1375.05 620.291 1376.59 617.649C1378.07 615.21 1378.74 612.5 1379.74 609.925C1380.88 606.537 1382.62 603.488 1383.56 599.897Z"
              style={{ visibility: 'hidden' }}
            />
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1360.26 594.999)"
              style={{ fill: 'black', opacity: tooth24Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth24Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth24Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1394.66 600.4C1396.16 594.4 1396.16 588.5 1393.86 583C1391.46 577.4 1386.66 572.7 1381.46 568.9C1375.16 564.3 1367.86 560.7 1359.86 560.7C1351.26 560.8 1343.76 564.9 1337.66 570.1C1334.56 572.7 1331.66 575.7 1329.56 579C1327.06 582.8 1325.56 587.1 1325.56 591.6C1325.56 599 1329.46 605.5 1332.96 611.9C1335.46 616.4 1337.56 620.9 1340.56 625.4C1342.46 628.4 1344.96 631.3 1348.06 633.4C1352.06 636 1356.86 637.1 1361.56 637.4C1365.66 637.6 1369.76 637.2 1373.66 635.7C1378.26 633.8 1381.96 630.5 1384.26 626.6C1386.46 623 1387.46 619 1388.96 615.2C1390.66 610.2 1393.26 605.7 1394.66 600.4Z"
            ></path>
            <path
              className="st47"
              d="M1383.56 599.898C1384.57 595.833 1384.57 591.836 1383.03 588.109C1381.42 584.315 1378.2 581.131 1374.72 578.556C1370.5 575.439 1365.6 573 1360.24 573C1354.48 573.068 1349.45 575.846 1345.37 579.369C1343.29 581.13 1341.35 583.163 1339.94 585.399C1338.26 587.974 1337.26 590.887 1337.26 593.936C1337.26 598.95 1339.87 603.354 1342.22 607.69C1343.89 610.739 1345.3 613.788 1347.31 616.837C1348.58 618.87 1350.26 620.835 1352.34 622.257C1355.02 624.019 1358.23 624.764 1361.38 624.968C1364.13 625.103 1366.88 624.832 1369.49 623.816C1372.57 622.528 1375.05 620.292 1376.59 617.65C1378.07 615.211 1378.74 612.501 1379.74 609.926C1380.88 606.538 1382.62 603.489 1383.56 599.898Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth24Diagnozis.culttab &&
                !tooth24Diagnozis.abutment &&
                !tooth24Diagnozis.implant &&
                !tooth24Diagnozis.apex &&
                !tooth24Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1400.4,574.1c-1.3-3.4-3.1-6.5-5.2-9.3c-2.8-3.8-6.2-7.1-9.8-10.1
                            c-7.6-6.2-16.4-11.3-26.3-11.2c-10.4,0.1-19.6,5.9-27,13.1c-3.5,3.3-6.7,7-9.2,11.1c-0.2,0.4-0.5,0.7-0.7,1.1
                            c-3.1,5.3-4.9,11.1-5,17.3c-0.1,10.2,4.7,19.2,8.8,27.9c3,6.2,5.6,12.4,9.1,18.6c1.5,2.5,3.1,5,5.1,7.3c1.2,1.4,2.5,2.6,4,3.7
                            c4.8,3.5,10.7,5.1,16.4,5.4c5,0.3,10-0.3,14.7-2.5c5.6-2.6,10.1-7.2,13-12.6c0.5-0.8,0.9-1.7,1.2-2.5c1.9-4.3,3.1-8.8,4.6-13.2
                            c2.3-6.7,5.5-12.9,7.2-20.2C1403.2,589.9,1403.3,581.6,1400.4,574.1z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{ visibility: 'inherit', opacity: 0 }}
          >
            <path
              className="st61 level2"
              d="M1339.42 547.688C1336.77 549.678 1334.26 550.706 1331.93 553.152C1329.91 555.241 1327.95 558.757 1326.18 561.165C1324.63 563.271 1323.21 564.234 1322.01 566.552C1320.52 569.347 1319.31 573.577 1318.47 576.679C1317.6 579.926 1316 583.313 1316 586.778C1316 590.953 1316.67 594.938 1317.73 598.796C1318.91 603.063 1320.57 607.176 1322.34 611.218C1323.23 613.273 1325.27 615.311 1326.18 617.341C1327.81 620.952 1328.18 624.563 1329.78 628.174C1331.18 631.338 1333.77 634.502 1335.48 637.666C1336.82 640.271 1337.3 642.827 1339.13 645.129C1340.47 646.819 1343.06 649.629 1344.67 650.967C1347.17 652.97 1349.94 653.126 1352.81 654.088C1355.55 655.005 1358.39 656.768 1361.2 656.989C1363.61 657.134 1366.03 655.813 1368.42 655.455C1371 655.07 1373.54 655.6 1376.01 654.429C1378.56 653.135 1380.88 650.154 1382.92 648.108C1385.39 645.632 1387.45 642.688 1388.99 639.473C1390.29 636.859 1392.36 635.362 1393.21 632.57C1394.12 629.571 1393.79 626.528 1394.75 623.565C1395.61 620.63 1397.73 616.553 1398.73 613.73C1399.55 611.449 1399.24 610.423 1399.97 608.078C1400.65 605.884 1401.26 602.38 1401.73 600.027C1402.38 596.824 1402.8 594.896 1402.94 591.751L1402.58 581.703C1402.22 579.03 1402.74 576.401 1401.86 573.83C1400.82 570.842 1398.29 568.023 1396.62 565.375C1395.05 562.877 1394.35 560.529 1392.4 558.334C1390.59 556.292 1387.54 554.381 1385.56 552.602C1382.56 549.904 1379.37 546.178 1376.01 544.169C1373.57 542.704 1371.03 542.74 1368.42 541.853C1365.42 540.834 1362.31 539 1359.11 539C1355.55 539.051 1352.14 539.791 1348.9 541.051C1345.56 542.353 1342.39 545.464 1339.42 547.688ZM1393.6 582.999C1395.9 588.499 1395.9 594.399 1394.4 600.399C1393.1 605.699 1390.5 610.199 1388.7 615.199C1387.2 618.999 1386.2 622.999 1384 626.599C1381.7 630.499 1378 633.799 1373.4 635.699C1369.5 637.199 1365.4 637.599 1361.3 637.399C1356.6 637.099 1351.8 635.999 1347.8 633.399C1344.7 631.299 1342.2 628.399 1340.3 625.399C1337.3 620.899 1335.2 616.399 1332.7 611.899C1329.2 605.499 1325.3 598.999 1325.3 591.599C1325.3 587.099 1326.8 582.799 1329.3 578.999C1331.4 575.699 1334.3 572.699 1337.4 570.099C1343.5 564.899 1351 560.799 1359.6 560.699C1367.6 560.699 1374.9 564.299 1381.2 568.899C1386.4 572.699 1391.2 577.399 1393.6 582.999Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1339.42 547.688C1336.77 549.678 1334.26 550.706 1331.93 553.152C1329.91 555.241 1327.95 558.757 1326.18 561.165C1324.63 563.271 1323.21 564.234 1322.01 566.552C1320.52 569.347 1319.31 573.577 1318.47 576.679C1317.6 579.926 1316 583.313 1316 586.778C1316 590.953 1316.67 594.938 1317.73 598.796C1318.91 603.063 1320.57 607.176 1322.34 611.218C1323.23 613.273 1325.27 615.311 1326.18 617.341C1327.81 620.952 1328.18 624.563 1329.78 628.174C1331.18 631.338 1333.77 634.502 1335.48 637.666C1336.82 640.271 1337.3 642.827 1339.13 645.129C1340.47 646.819 1343.06 649.629 1344.67 650.967C1347.17 652.97 1349.94 653.126 1352.81 654.088C1355.55 655.005 1358.39 656.768 1361.2 656.989C1363.61 657.134 1366.03 655.813 1368.42 655.455C1371 655.07 1373.54 655.6 1376.01 654.429C1378.56 653.135 1380.88 650.154 1382.92 648.108C1385.39 645.632 1387.45 642.688 1388.99 639.473C1390.29 636.859 1392.36 635.362 1393.21 632.57C1394.12 629.571 1393.79 626.528 1394.75 623.565C1395.61 620.63 1397.73 616.553 1398.73 613.73C1399.55 611.449 1399.24 610.423 1399.97 608.078C1400.65 605.884 1401.26 602.38 1401.73 600.027C1402.38 596.824 1402.8 594.896 1402.94 591.751L1402.58 581.703C1402.22 579.03 1402.74 576.401 1401.86 573.83C1400.82 570.842 1398.29 568.023 1396.62 565.375C1395.05 562.877 1394.35 560.529 1392.4 558.334C1390.59 556.292 1387.54 554.381 1385.56 552.602C1382.56 549.904 1379.37 546.178 1376.01 544.169C1373.57 542.704 1371.03 542.74 1368.42 541.853C1365.42 540.834 1362.31 539 1359.11 539C1355.55 539.051 1352.14 539.791 1348.9 541.051C1345.56 542.353 1342.39 545.464 1339.42 547.688ZM1393.6 582.999C1395.9 588.499 1395.9 594.399 1394.4 600.399C1393.1 605.699 1390.5 610.199 1388.7 615.199C1387.2 618.999 1386.2 622.999 1384 626.599C1381.7 630.499 1378 633.799 1373.4 635.699C1369.5 637.199 1365.4 637.599 1361.3 637.399C1356.6 637.099 1351.8 635.999 1347.8 633.399C1344.7 631.299 1342.2 628.399 1340.3 625.399C1337.3 620.899 1335.2 616.399 1332.7 611.899C1329.2 605.499 1325.3 598.999 1325.3 591.599C1325.3 587.099 1326.8 582.799 1329.3 578.999C1331.4 575.699 1334.3 572.699 1337.4 570.099C1343.5 564.899 1351 560.799 1359.6 560.699C1367.6 560.699 1374.9 564.299 1381.2 568.899C1386.4 572.699 1391.2 577.399 1393.6 582.999Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1398.63 585C1398.3 582.872 1398.76 580.778 1397.98 578.732C1397.05 576.352 1394.78 574.108 1393.28 572C1391.87 570.011 1391.25 568.142 1389.5 566.394C1387.88 564.768 1385.14 563.247 1383.37 561.83C1380.67 559.682 1377.81 556.715 1374.8 555.115C1372.61 553.949 1370.34 553.978 1368 553.272C1365.31 552.46 1362.52 551 1359.65 551C1356.46 551.041 1353.4 551.63 1350.5 552.633C1347.5 553.669 1344.66 556.147 1342 557.918C1339.62 559.502 1337.38 560.32 1335.28 562.268C1333.47 563.931 1331.71 566.73 1330.12 568.648C1328.73 570.325 1327.47 571.092 1326.39 572.937C1325.05 575.162 1323.97 578.53 1323.22 581C1322.43 583.585 1321 586.282 1321 589.041C1321 592.365 1321.6 595.538 1322.56 598.609C1323.61 602.007 1325.1 605.281 1326.68 608.5C1327.48 610.136 1329.31 611.758 1330.12 613.375C1331.59 616.25 1331.92 619.125 1333.35 622C1334.61 624.519 1336.93 627.039 1338.47 629.558C1339.67 631.632 1340.09 633.667 1341.73 635.5C1342.94 636.845 1345.26 639.082 1346.7 640.148C1348.95 641.743 1351.43 641.867 1354 642.633C1356.46 643.363 1359 644.767 1361.52 644.943C1363.69 645.058 1365.86 644.007 1368 643.721C1370.31 643.414 1372.58 643.837 1374.8 642.905C1377.09 641.874 1379.17 639.5 1381 637.872C1383.21 635.901 1385.06 633.556 1386.44 630.996C1387.6 628.915 1389.46 627.723 1390.22 625.5C1391.04 623.113 1390.75 620.69 1391.6 618.331C1392.37 615.994 1394.27 612.747 1395.18 610.5C1395.9 608.684 1395.63 607.867 1396.28 606C1396.89 604.253 1397.44 601.463 1397.86 599.59C1398.44 597.039 1398.82 595.504 1398.95 593M1398.63 585C1398.98 587.297 1399.07 590.634 1398.95 593M1398.63 585L1398.95 593M1394.4 600.399C1395.9 594.399 1395.9 588.499 1393.6 582.999C1391.2 577.399 1386.4 572.699 1381.2 568.899C1374.9 564.299 1367.6 560.699 1359.6 560.699C1351 560.799 1343.5 564.899 1337.4 570.099C1334.3 572.699 1331.4 575.699 1329.3 578.999C1326.8 582.799 1325.3 587.099 1325.3 591.599C1325.3 598.999 1329.2 605.499 1332.7 611.899C1335.2 616.399 1337.3 620.899 1340.3 625.399C1342.2 628.399 1344.7 631.299 1347.8 633.399C1351.8 635.999 1356.6 637.099 1361.3 637.399C1365.4 637.599 1369.5 637.199 1373.4 635.699C1378 633.799 1381.7 630.499 1384 626.599C1386.2 622.999 1387.2 618.999 1388.7 615.199C1390.5 610.199 1393.1 605.699 1394.4 600.399Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth24Diagnozis.culttab &&
                !tooth24Diagnozis.abutment &&
                !tooth24Diagnozis.implant &&
                !tooth24Diagnozis.shaper &&
                !tooth24Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС CENTER*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1379.3,611c-0.4,3.4-2.9,6.8-5.9,9.5c-2.8,2.6-6.1,4.5-8.2,5c-4.2,1-9.3-1.6-11.9-5.9
                                c-0.2-0.3-0.3-0.5-0.5-0.8c-2.5-4.8-8.1-15.3-9.8-20.2c-1.5-4.4-0.8-10.5,2.3-13.8c0.4-0.4,0.8-0.7,1.2-1c4.1-2.9,15-5.7,15-5.7
                                c6.2-0.6,11.6,1.5,15.6,5.9c0.1,0.1,0.2,0.3,0.4,0.4C1381.4,588.9,1380,604.4,1379.3,611z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth24.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth24.seal_center ? `seal-fill ${teethDiagnozis.tooth24.seal_center_color}` : ''}
                                `}
                d="M1379.3,611c-0.4,3.4-2.9,6.8-5.9,9.5c-2.8,2.6-6.1,4.5-8.2,5c-4.2,1-9.3-1.6-11.9-5.9
                                c-0.2-0.3-0.3-0.5-0.5-0.8c-2.5-4.8-8.1-15.3-9.8-20.2c-1.5-4.4-0.8-10.5,2.3-13.8c0.4-0.4,0.8-0.7,1.2-1c4.1-2.9,15-5.7,15-5.7
                                c6.2-0.6,11.6,1.5,15.6,5.9c0.1,0.1,0.2,0.3,0.4,0.4C1381.4,588.9,1380,604.4,1379.3,611z"
              />
            </g>
            {/*КАРИЕС LEFT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M1353.2,619.6c-3.1,4.8-8.7,13.6-12.9,20.3c-2-2.2-3.7-4.7-5.1-7.3c-3.5-6.2-6.1-12.3-9.1-18.6
                                c-4.1-8.7-8.9-17.7-8.8-27.9c0-6.2,1.9-12,5-17.3c0.2-0.4,0.4-0.8,0.7-1.1c5.5,3.6,16.2,10.9,22.5,17c-3.1,3.3-3.8,9.4-2.3,13.8
                                c1.7,4.9,7.4,15.5,9.8,20.2C1352.9,619,1353,619.3,1353.2,619.6z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth24.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth24.seal_left ? `seal-fill ${teethDiagnozis.tooth24.seal_left_color}` : ''}
                                `}
                d="M1353.2,619.6c-3.1,4.8-8.7,13.6-12.9,20.3c-2-2.2-3.7-4.7-5.1-7.3c-3.5-6.2-6.1-12.3-9.1-18.6
                                c-4.1-8.7-8.9-17.7-8.8-27.9c0-6.2,1.9-12,5-17.3c0.2-0.4,0.4-0.8,0.7-1.1c5.5,3.6,16.2,10.9,22.5,17c-3.1,3.3-3.8,9.4-2.3,13.8
                                c1.7,4.9,7.4,15.5,9.8,20.2C1352.9,619,1353,619.3,1353.2,619.6z"
              />
            </g>
            {/*КАРИЕС BOTTOM*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M1389.6,631.5c-0.4,0.9-0.8,1.7-1.2,2.5c-2.9,5.4-7.3,10-13,12.6c-4.7,2.2-9.7,2.8-14.7,2.5
                                c-5.7-0.4-11.5-1.9-16.4-5.4c-1.5-1.1-2.8-2.3-4-3.7c4.2-6.7,9.8-15.5,12.9-20.3c2.6,4.3,7.8,6.9,11.9,5.9c2.2-0.5,5.4-2.4,8.2-5
                                C1377.1,623.4,1383.9,628.5,1389.6,631.5z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth24.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth24.seal_bottom ? `seal-fill ${teethDiagnozis.tooth24.seal_bottom_color}` : ''}
                                `}
                d="M1389.6,631.5c-0.4,0.9-0.8,1.7-1.2,2.5c-2.9,5.4-7.3,10-13,12.6c-4.7,2.2-9.7,2.8-14.7,2.5
                                c-5.7-0.4-11.5-1.9-16.4-5.4c-1.5-1.1-2.8-2.3-4-3.7c4.2-6.7,9.8-15.5,12.9-20.3c2.6,4.3,7.8,6.9,11.9,5.9c2.2-0.5,5.4-2.4,8.2-5
                                C1377.1,623.4,1383.9,628.5,1389.6,631.5z"
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
                d="M1401.3,598.1c-1.7,7.3-4.8,13.5-7.2,20.2c-1.5,4.4-2.7,8.9-4.6,13.2c-5.6-3-12.5-8.1-16.2-11
                                c3-2.7,5.5-6.1,5.9-9.5c0.8-6.6,2.1-22.1-1.8-26.7c-0.1-0.1-0.2-0.3-0.4-0.4c6-8.2,13.8-15.4,18.2-19.1c2.2,2.9,3.9,6,5.2,9.3
                                C1403.3,581.6,1403.2,589.9,1401.3,598.1z"
              />
              <path
                className={`
                                    st8 target caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth24.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth24.seal_right ? `seal-fill ${teethDiagnozis.tooth24.seal_right_color}` : ''}
                                `}
                d="M1401.3,598.1c-1.7,7.3-4.8,13.5-7.2,20.2c-1.5,4.4-2.7,8.9-4.6,13.2c-5.6-3-12.5-8.1-16.2-11
                                c3-2.7,5.5-6.1,5.9-9.5c0.8-6.6,2.1-22.1-1.8-26.7c-0.1-0.1-0.2-0.3-0.4-0.4c6-8.2,13.8-15.4,18.2-19.1c2.2,2.9,3.9,6,5.2,9.3
                                C1403.3,581.6,1403.2,589.9,1401.3,598.1z"
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
                d="M1395.2,564.8c-4.3,3.7-12.2,10.8-18.2,19.1c-3.9-4.3-9.3-6.5-15.6-5.9c0,0-10.9,2.8-15,5.7
                                c-0.4,0.3-0.8,0.6-1.2,1c-6.3-6.1-16.9-13.4-22.5-17c2.5-4.1,5.8-7.8,9.2-11.1c7.5-7.1,16.6-12.9,27-13.1
                                c9.8-0.1,18.7,4.9,26.3,11.2C1389,557.7,1392.4,561,1395.2,564.8z"
              />
              <path
                className={`
                                    st8 target caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth24.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth24.seal_top ? `seal-fill ${teethDiagnozis.tooth24.seal_top_color}` : ''}
                                `}
                d="M1395.2,564.8c-4.3,3.7-12.2,10.8-18.2,19.1c-3.9-4.3-9.3-6.5-15.6-5.9c0,0-10.9,2.8-15,5.7
                                c-0.4,0.3-0.8,0.6-1.2,1c-6.3-6.1-16.9-13.4-22.5-17c2.5-4.1,5.8-7.8,9.2-11.1c7.5-7.1,16.6-12.9,27-13.1
                                c9.8-0.1,18.7,4.9,26.3,11.2C1389,557.7,1392.4,561,1395.2,564.8z"
              />
            </g>
            <g className="with">
              {/*Черточка право низ*/}
              <path
                className="st54 lnrb"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_bottom &&
                      !tooth24Diagnozis.seal_top &&
                      !tooth24Diagnozis.seal_center &&
                      !tooth24Diagnozis.seal_right) ||
                    (tooth24Diagnozis.seal_right &&
                      !tooth24Diagnozis.seal_bottom &&
                      !tooth24Diagnozis.seal_center) ||
                    (tooth24Diagnozis.seal_right &&
                      !tooth24Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1374 620.5C1375.83 622.333 1380.9 626.7 1386.5 629.5"
              />
              {/*Овал право*/}
              <path
                className="st54 ovr"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth24Diagnozis.seal_right &&
                      tooth24Diagnozis.seal_center) ||
                    (tooth24Diagnozis.seal_right &&
                      !tooth24Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1374 620.5C1379 613 1383.5 589 1377.5 584"
              />
              {/*Черточка верх право*/}
              <path
                className="st54 lnrt"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_right &&
                      !tooth24Diagnozis.seal_top) ||
                    (!tooth24Diagnozis.seal_right && tooth24Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1377.5 584C1379.33 580.833 1385.2 573.6 1392 568"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54 ovt"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_center &&
                      !tooth24Diagnozis.seal_top) ||
                    (!tooth24Diagnozis.seal_center && tooth24Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1377.5 584C1373.67 578.833 1362 571.6 1346 584"
              />
              {/*Черточка верх лево*/}
              <path
                className="st54 lnlt"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_left &&
                      !tooth24Diagnozis.seal_top) ||
                    (!tooth24Diagnozis.seal_left && tooth24Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1346 584C1343.17 580.833 1335.5 573.7 1327.5 570.5"
              />
              {/*Овал черточка лево*/}
              <path
                className="st54 ovl"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_left &&
                      !tooth24Diagnozis.seal_center) ||
                    (!tooth24Diagnozis.seal_left &&
                      tooth24Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1346 584C1339.5 592 1346.6 608.8 1353 620"
              />
              {/*Черточка низ лево*/}
              <path
                className="st54 lnlb"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_left &&
                      !tooth24Diagnozis.seal_bottom &&
                      !tooth24Diagnozis.seal_center) ||
                    (tooth24Diagnozis.seal_bottom &&
                      !tooth24Diagnozis.seal_center &&
                      !tooth24Diagnozis.seal_left)
                      ? 5
                      : 0,
                }}
                d="M1353 620L1343 636.5"
              />
              {/*Овал черточка низ*/}
              <path
                className="st54 ovb"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth24Diagnozis.seal_right &&
                      tooth24Diagnozis.seal_center) ||
                    (tooth24Diagnozis.seal_bottom &&
                      !tooth24Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1353 620C1356.33 624.833 1365.3 631.6 1374.5 620"
              />
            </g>
          </g>
          {/* VINIR */}
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth24Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth24Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth24Diagnozis.vinir_color}`}
                d="M1400.4 574.099C1399.1 570.699 1397.3 567.599 1395.2 564.799C1392.4 560.999 1389 557.7 1385.4 554.7C1377.8 548.5 1369 543.399 1359.1 543.499C1348.7 543.599 1339.5 549.399 1332.1 556.599C1328.6 559.899 1325.4 563.6 1322.9 567.7C1322.7 568.1 1322.4 568.399 
                                1322.2 568.799C1319.1 574.099 1317.3 579.899 1317.2 586.099C1317.18 588.46 1317.41 590.757 1317.85 593C1319.9 592.93 1324.4 591.912 1326 588.396C1326 588.229 1326 588.063 1326 587.896C1326.08 582.963 1327.51 578.348 1329.98 574.131C1330.14 573.813 1330.38 573.574 1330.54 573.256C1332.52 
                                569.994 1335.07 567.05 1337.86 564.424C1343.74 558.695 1351.06 554.081 1359.34 554.001C1367.22 553.922 1374.22 557.979 1380.26 562.912C1383.13 565.299 1385.83 567.925 1388.06 570.949C1389.73 573.176 1391.16 575.643 1392.2 578.348C1393.45 581.587 1394 585.013 1394 588.5C1395.44 592.5 1400.09 593.167 1402.23 593C1403.11 
                                586.529 1402.7 580.062 1400.4 574.099Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth24Diagnozis.temporary_crown ||
                tooth24Diagnozis.ceramic_crown ||
                tooth24Diagnozis.mceramic_crown ||
                tooth24Diagnozis.metalic_crown ||
                tooth24Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth24Diagnozis.temporary_crown ||
                tooth24Diagnozis.ceramic_crown ||
                tooth24Diagnozis.mceramic_crown ||
                tooth24Diagnozis.metalic_crown ||
                tooth24Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth24Diagnozis.ceramic_crown_color}
                                ${tooth24Diagnozis.mceramic_crown_color}
                                ${tooth24Diagnozis.metalic_crown_color}
                                ${tooth24Diagnozis.zirconia_crown_color}
                            `}
              d="M1400.4,574.1c-1.3-3.4-3.1-6.5-5.2-9.3c-2.8-3.8-6.2-7.1-9.8-10.1
                            c-7.6-6.2-16.4-11.3-26.3-11.2c-10.4,0.1-19.6,5.9-27,13.1c-3.5,3.3-6.7,7-9.2,11.1c-0.2,0.4-0.5,0.7-0.7,1.1
                            c-3.1,5.3-4.9,11.1-5,17.3c-0.1,10.2,4.7,19.2,8.8,27.9c3,6.2,5.6,12.4,9.1,18.6c1.5,2.5,3.1,5,5.1,7.3c1.2,1.4,2.5,2.6,4,3.7
                            c4.8,3.5,10.7,5.1,16.4,5.4c5,0.3,10-0.3,14.7-2.5c5.6-2.6,10.1-7.2,13-12.6c0.5-0.8,0.9-1.7,1.2-2.5c1.9-4.3,3.1-8.8,4.6-13.2
                            c2.3-6.7,5.5-12.9,7.2-20.2C1403.2,589.9,1403.3,581.6,1400.4,574.1z"
            />
            {/*FISSURE*/}
            <path
              className={`st3 fissure ${tooth24Diagnozis.fissure ? 'diagnoze' : tooth24Diagnozis.fissure ? 'hidden' : ''}`}
              d="M1380.2,607.3c-7.4-4.3-16.1-6.2-24.7-5.5c-5.1,0.4-10.1,1.8-14.7,4l-0.5-1c4.7-2.3,9.8-3.7,15.1-4.1
                            c8.8-0.7,17.8,1.3,25.4,5.7L1380.2,607.3z"
            />
            <path
              className={`st3 fissure ${tooth24Diagnozis.fissure ? 'diagnoze' : tooth24Diagnozis.fissure ? 'hidden' : ''}`}
              d="M1349.5,601.2c-0.7,0-1.4,0-2.1-0.2c-1.7-0.3-3-1-4.3-1.6c-1.2-0.6-2.3-1.2-3.6-1.5l0.2-1.1
                            c1.5,0.3,2.7,1,3.9,1.6c1.3,0.7,2.5,1.3,4,1.5c2.2,0.4,4.5,0,6.9-0.4c1-0.2,1.9-0.3,2.9-0.5c1.8-0.2,3.6-0.3,5.4-0.3
                            c1.6,0,3.2-0.1,4.8-0.2c4.6-0.5,8.9-2,12.2-4.2l0.6,0.9c-3.4,2.3-7.9,3.9-12.7,4.4c-1.6,0.2-3.3,0.2-4.9,0.2
                            c-1.8,0-3.6,0.1-5.3,0.3c-0.9,0.1-1.9,0.3-2.8,0.5C1353,600.9,1351.2,601.2,1349.5,601.2z"
            />
          </g>
          {/* FISSURES */}
          <g
            className="fissures hEmpty hRoot hImplant"
            style={{
              visibility:
                !tooth24Diagnozis.culttab &&
                !tooth24Diagnozis.abutment &&
                !tooth24Diagnozis.implant &&
                !tooth24Diagnozis.apex &&
                !tooth24Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth24Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1380.2,607.3c-7.4-4.3-16.1-6.2-24.7-5.5c-5.1,0.4-10.1,1.8-14.7,4l-0.5-1c4.7-2.3,9.8-3.7,15.1-4.1
                            c8.8-0.7,17.8,1.3,25.4,5.7L1380.2,607.3z"
            />
            <path
              className={`st3 fissure ${tooth24Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M1349.5,601.2c-0.7,0-1.4,0-2.1-0.2c-1.7-0.3-3-1-4.3-1.6c-1.2-0.6-2.3-1.2-3.6-1.5l0.2-1.1
                            c1.5,0.3,2.7,1,3.9,1.6c1.3,0.7,2.5,1.3,4,1.5c2.2,0.4,4.5,0,6.9-0.4c1-0.2,1.9-0.3,2.9-0.5c1.8-0.2,3.6-0.3,5.4-0.3
                            c1.6,0,3.2-0.1,4.8-0.2c4.6-0.5,8.9-2,12.2-4.2l0.6,0.9c-3.4,2.3-7.9,3.9-12.7,4.4c-1.6,0.2-3.3,0.2-4.9,0.2
                            c-1.8,0-3.6,0.1-5.3,0.3c-0.9,0.1-1.9,0.3-2.8,0.5C1353,600.9,1351.2,601.2,1349.5,601.2z"
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
              id="dentin_v_24"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth24Diagnozis.implant &&
                  !tooth24Diagnozis.apex &&
                  !tooth24Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_24"
                className={`st10 change-color ${tooth24Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1394.6,436c-0.5,12.9-3.9,25.5-9.9,37.2l-25-2.9l-25,5.6
                                c-3.3-10.7-5.5-21.6-6.5-32.7c-0.6-6.8-0.7-13.6-0.5-20.4c0.7-3.8,1.4-7.6,2.1-11.4c3-4,6.5-7.6,10.4-10.9
                                c3.7-3.1,7.7-5.8,12.3-7.2c0.5-0.2,1-0.3,1.6-0.4c2.6-0.6,5.2-0.8,7.8-0.7c2.4,0.1,4.8,0.5,7.1,1.2c8.8,2.5,16.3,8.5,21,16.4
                                c1.6,2.8,2.9,5.7,4,8.7C1394.5,424.3,1394.8,430.2,1394.6,436z"
              />
            </g>
            <g
              id="dentin_n_24"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth24Diagnozis.implant &&
                  !tooth24Diagnozis.abutment &&
                  !tooth24Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_x5F_14_4_"
                className={`st10 change-color ${tooth24Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1365.1,258.1c1.1-4,1.3-8.2,0.6-12.2c-0.5-2.9-1.5-5.7-2.7-8.4
                                c-1.2-2.6-2.8-5.2-5.9-5.7c-2.3-0.3-4.5,0.8-6.1,2.4c-3.4,3.5-3.8,8.3-4.2,12.8c-0.7,8.6-1.9,17.3-2.8,25.9
                                c-1.2,11.5-2,23.1-3,34.6c-1.9,22.4-4.3,44.9-7.2,67.2c4.8-20.8,10-41.5,15.6-62.2C1354.3,294.3,1359.5,276.2,1365.1,258.1z"
              />
              <path
                className={`st10 change-color ${tooth24Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1395.4,344.1c-0.9,22.8-2.7,45.7-1.6,68.5c0.1,2,0.2,3.9,0.3,5.9c-1.1-3-2.4-5.9-4-8.7
                                c-4.7-7.9-12.1-13.9-21-16.4c-2.3-0.6-4.7-1-7.1-1.2c-2.7-0.1-5.3,0.1-7.8,0.7c-0.5,0.1-1.1,0.3-1.6,0.4
                                c-4.7,1.4-8.7,4.2-12.3,7.2c-3.9,3.3-7.4,6.9-10.4,10.9c0.3-1.9,0.7-3.8,1-5.6c2.5-13.2,5.1-26.5,7.9-39.7
                                c4.7-22.1,9.8-44.2,16.1-65.8c0.3-1.2,0.7-2.4,1.1-3.5c1.2-3.9,2.3-7.7,3.5-11.6c3.8-12.3,7.8-24.6,11.2-37.1
                                c2.6-9.5,7.3-19.3,15.5-18.1c1,0.1,1.9,0.4,2.7,0.8c6,2.9,7.7,12.2,7.7,20.8C1396.5,282.4,1396.7,313.3,1395.4,344.1z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.pulpit ? 'pulpit' : ''} ${tooth24Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1371.7,439.2c0,1.8-0.2,3.6-0.6,5.3c-1.6-0.8-3.3-1.4-5.1-1.7
                                c-4.6-0.8-9.4,0.2-13.2,2.8c-0.3-3.8-0.5-7.6-0.5-11.4c0-4.6,0.4-9.1,0.9-13.6c0-0.2,0.1-0.5,0.1-0.7c0.3-9,0.6-18,0.8-27.1
                                c0.5-0.1,1-0.2,1.5-0.3c0.9-0.2,1.9-0.3,2.8-0.3c0.3,0,0.6,0,0.9-0.1c0.3,0,0.7,0,1,0c0.5,0,1.1,0,1.6,0h0c0.4,0,0.7,0,1.1,0.1
                                c0.3,0,0.6,0,0.8,0.1c0.2,0,0.5,0,0.7,0.1c0.6,0.1,1.3,0.2,1.9,0.3c0.6,0.1,1.1,0.2,1.7,0.4c0.3,0.1,0.6,0.2,0.9,0.2
                                c0,7,0.3,13.9,0.8,20.9c0.2,2.6,0.4,5.1,0.6,7.6c0.2,3.3,0.3,6.6,0.6,9.9C1371.3,434.3,1371.7,436.7,1371.7,439.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.pulpit ? 'pulpit' : ''} ${tooth24Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1375,313.3c-1.2,10-2.3,20-3.3,30c-1.6,16.7-2.7,33.4-2.6,50.1
                                c-0.3-0.1-0.6-0.2-0.9-0.2c-0.6-0.1-1.1-0.3-1.7-0.4c-0.6-0.1-1.3-0.2-1.9-0.3c-0.2,0-0.5-0.1-0.7-0.1c-0.3,0-0.6-0.1-0.8-0.1
                                c-0.4,0-0.7-0.1-1.1-0.1h0c-0.5,0-1.1,0-1.6,0c-0.3,0-0.6,0-1,0c-0.3,0-0.6,0-0.9,0c-0.9,0-1.9,0.2-2.8,0.3
                                c-0.5,0.1-1,0.2-1.5,0.3c0,0,0,0,0,0c0.1-3.7,0.2-7.3,0.3-11c0.4-16.9,0.8-33.8,1.1-50.7c0.1-6,0.2-11.9,0.3-17.8
                                c1.7-0.6,3.5-1,5.3-1.3c0.5,9.2,1.1,18.4,1.6,27.6c0.2,3.3,0.4,6.6,0.6,9.9c1.8-12.6,3.9-25.1,6.3-37.6
                                C1371.6,312.2,1373.4,312.7,1375,313.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.pulpit ? 'pulpit' : ''} ${tooth24Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1369.5,311.9c2.1,0.3,3.9,0.8,5.5,1.4c3.5-27.7,8.1-55.2,13.9-82.6
                                C1381.1,257.5,1374.7,284.6,1369.5,311.9z"
              />
              <path
                className={`st22 target part ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.channel_class} ${tooth24Diagnozis.pulpit ? 'pulpit' : ''} ${tooth24Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1359.5,285.1c-0.1-2.4-0.3-4.8-0.4-7.1c-0.9-15.4-1.8-30.8-2.7-46.2c0-0.6-0.1-1.3-0.1-1.9v1.9
                                c0,18.9,0,37.8-0.2,56.7c0,0,0,0,0,0c0,2.8,0,5.5-0.1,8.2v0c0,0,0,0,0,0c-0.1,5.5-0.1,11.1-0.2,16.6c1.7-0.6,3.5-1,5.3-1.3
                                C1360.6,303.1,1360.1,294.1,1359.5,285.1C1359.5,285.1,1359.5,285.1,1359.5,285.1z"
              />
            </g>
            {/* Отростки периодонтита */}
             <PeriodontitStage24 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth24Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1394.37 436.199C1393.87 449.099 1390.47 461.699 1384.47 473.399L1359.47 470.499L1334.47 476.099C1331.17 465.499 1328.97 454.499 1327.97 443.399C1327.37 436.699 1327.27 429.899 
                            1327.47 422.999C1328.17 419.199 1328.87 415.399 1329.57 411.599C1329.97 411.099 1330.37 410.599 1330.67 410.099C1330.97 409.699 1331.37 409.299 1331.67 408.799C1331.77 408.699 1331.87 408.499 1331.97 408.399C1332.27 407.999 1332.57 407.599 1332.97 
                            407.299C1333.07 407.199 1333.17 407.099 1333.27 406.999C1333.57 406.699 1333.87 406.299 1334.17 405.999C1334.97 405.099 1335.87 404.199 1336.77 403.399C1337.77 402.499 1338.77 401.599 1339.87 400.699C1340.37 400.299 1340.77 399.899 1341.27 399.599C1343.37 397.899 1345.67 396.399 1348.07 
                            395.199C1348.57 394.899 1349.17 394.699 1349.67 394.399C1350.47 393.999 1351.37 393.699 1352.27 393.499C1352.57 393.399 1352.77 393.299 1353.07 393.299C1353.37 393.199 1353.57 393.199 1353.87 393.099C1354.17 392.999 1354.37 392.999 1354.67 392.899C1354.87 392.799 1355.17 392.799 1355.47 
                            392.699C1355.67 392.699 1355.97 392.599 1356.17 392.599H1356.27C1356.57 392.599 1356.77 392.499 1357.07 392.499C1357.37 392.499 1357.57 392.399 1357.87 392.399C1357.97 392.399 1358.17 392.399 1358.27 392.399C1358.37 392.399 1358.47 392.399 1358.57 392.399C1358.67 392.399 1358.67 392.399 
                            1358.77 392.399C1358.97 392.399 1359.07 392.399 1359.27 392.399C1359.57 392.399 1359.87 392.399 1360.17 392.399H1360.27C1360.77 392.399 1361.37 392.399 1361.87 392.399C1362.27 392.399 1362.57 392.399 1362.97 392.499C1363.27 392.499 1363.47 392.499 1363.77 
                            392.599C1363.97 392.599 1364.27 392.599 1364.47 392.699H1364.57C1365.17 392.799 1365.77 392.899 1366.37 392.999C1366.47 392.999 1366.57 392.999 1366.77 393.099C1367.17 393.199 1367.67 393.299 1368.07 393.399H1368.17C1368.47 393.499 1368.77 393.599 1369.07 393.599C1369.37 393.699 1369.67 393.799 1369.87 
                            393.799H1369.97C1370.17 393.899 1370.47 393.899 1370.67 393.999C1371.17 394.199 1371.77 394.399 1372.27 394.599C1372.47 394.699 1372.77 394.799 1372.97 394.899C1373.27 394.999 1373.57 395.199 1373.97 395.299C1374.17 395.399 1374.47 395.499 1374.67 395.599C1375.17 395.799 1375.67 396.099 1376.17 396.399C1376.37 396.499 1376.57 396.599 1376.77 
                            396.699C1377.87 397.299 1378.87 397.899 1379.77 398.599C1379.97 398.699 1380.07 398.899 1380.27 398.999C1380.57 399.199 1380.87 399.499 1381.17 399.699C1381.57 399.999 1381.97 400.399 1382.37 400.699C1382.77 400.999 1383.17 401.399 1383.57 401.699C1384.87 402.899 1386.07 404.199 1387.17 405.699C1387.47 
                            406.099 1387.77 406.499 1388.07 406.899C1388.07 406.999 1388.17 406.999 1388.17 407.099C1388.47 407.499 1388.77 407.899 1389.07 408.399C1389.37 408.899 1389.67 409.399 1389.97 409.899C1390.37 410.599 1390.77 411.299 1391.17 411.999C1391.47 412.599 1391.77 413.199 1392.07 413.799C1392.27 414.099 1392.37 414.499 1392.57 414.799C1392.67 415.099 
                            1392.87 415.499 1392.97 415.799C1393.07 416.099 1393.27 416.499 1393.37 416.799C1393.57 417.399 1393.77 417.899 1393.97 418.499C1394.27 424.499 1394.57 430.399 1394.37 436.199Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M1375.27 291.8C1374.17 291.8 1373.27 292.6 1373.07 293.7L1346.47 473.5L1359.47 470.6H1359.57L1364.77 471.2L1373.87 342.9L1377.67 294.3C1377.67 
                            292.9 1376.57 291.8 1375.27 291.8Z"
              style={{ fill: tooth24Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth24Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth24Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M1377.8,294.1l-7.7,99.6c0,0-0.1,0-0.1,0c-0.3-0.1-0.5-0.2-0.8-0.2c-0.3-0.1-0.6-0.2-0.9-0.2c0,0,0,0-0.1,0
                            c-0.4-0.1-0.9-0.2-1.3-0.3c-0.1,0-0.3-0.1-0.4-0.1c-0.6-0.1-1.2-0.2-1.8-0.3c0,0-0.1,0-0.1,0c-0.2,0-0.5-0.1-0.7-0.1
                            c-0.3,0-0.5-0.1-0.8-0.1c-0.4,0-0.7-0.1-1.1-0.1h0c-0.5,0-1.1,0-1.6,0h-0.1c-0.3,0-0.6,0-0.9,0c-0.2,0-0.3,0-0.5,0
                            c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.3,0-0.4,0c-0.3,0-0.5,0-0.8,0.1c-0.3,0-0.5,0.1-0.8,0.1c0,0-0.1,0-0.1,0
                            c-0.2,0-0.5,0.1-0.7,0.1c-0.2,0-0.5,0.1-0.8,0.2l18.3-99.3c0.2-1.1,1.2-1.9,2.2-1.9C1376.8,291.6,1377.9,292.7,1377.8,294.1z"
            />
            <path
              className="st15"
              d="M1394.6,436c-0.5,12.9-3.9,25.5-9.9,37.2l-25-2.9l-25,5.6c-3.3-10.6-5.5-21.6-6.5-32.7
                            c-0.6-6.7-0.7-13.5-0.5-20.4c0.7-3.8,1.4-7.6,2.1-11.4c0,0,0,0,0,0c0.4-0.5,0.8-1,1.1-1.5c0.3-0.4,0.7-0.8,1-1.3
                            c0.1-0.1,0.2-0.3,0.3-0.4c0.3-0.4,0.6-0.8,1-1.1c0.1-0.1,0.2-0.2,0.3-0.3c0.3-0.3,0.6-0.7,0.9-1c0.8-0.9,1.7-1.8,2.6-2.6
                            c1-0.9,2-1.8,3.1-2.7c0.5-0.4,0.9-0.8,1.4-1.1c2.1-1.7,4.4-3.2,6.8-4.4c0.5-0.3,1.1-0.5,1.6-0.8c0,0,0,0,0,0
                            c0.8-0.4,1.7-0.7,2.6-0.9c0.3-0.1,0.5-0.2,0.8-0.2c0.3-0.1,0.5-0.1,0.8-0.2c0.3-0.1,0.5-0.1,0.8-0.2c0.2-0.1,0.5-0.1,0.8-0.2
                            c0.2,0,0.5-0.1,0.7-0.1c0,0,0.1,0,0.1,0c0.3,0,0.5-0.1,0.8-0.1c0.3,0,0.5-0.1,0.8-0.1c0.1,0,0.3,0,0.4,0c0.1,0,0.2,0,0.3,0
                            c0.1,0,0.1,0,0.2,0c0.2,0,0.3,0,0.5,0c0.3,0,0.6,0,0.9,0h0.1c0.5,0,1.1,0,1.6,0h0c0.4,0,0.7,0,1.1,0.1c0.3,0,0.5,0,0.8,0.1
                            c0.2,0,0.5,0,0.7,0.1c0,0,0.1,0,0.1,0c0.6,0.1,1.2,0.2,1.8,0.3c0.1,0,0.2,0,0.4,0.1c0.4,0.1,0.9,0.2,1.3,0.3c0,0,0.1,0,0.1,0
                            c0.3,0.1,0.6,0.2,0.9,0.2c0.3,0.1,0.6,0.2,0.8,0.2c0,0,0.1,0,0.1,0c0.2,0.1,0.5,0.1,0.7,0.2c0.5,0.2,1.1,0.4,1.6,0.6
                            c0.2,0.1,0.5,0.2,0.7,0.3c0.3,0.1,0.6,0.3,1,0.4c0.2,0.1,0.5,0.2,0.7,0.3c0.5,0.2,1,0.5,1.5,0.8c0.2,0.1,0.4,0.2,0.6,0.3
                            c1.1,0.6,2.1,1.2,3,1.9c0.2,0.1,0.3,0.3,0.5,0.4c0.3,0.2,0.6,0.5,0.9,0.7c0.4,0.3,0.8,0.7,1.2,1c0.4,0.3,0.8,0.7,1.2,1
                            c1.3,1.2,2.5,2.5,3.6,4c0.3,0.4,0.6,0.8,0.9,1.2c0,0.1,0.1,0.1,0.1,0.2c0.3,0.4,0.6,0.8,0.9,1.3c0.3,0.5,0.6,1,0.9,1.5
                            c0.4,0.7,0.8,1.4,1.2,2.1c0.3,0.6,0.6,1.2,0.9,1.8c0.2,0.3,0.3,0.7,0.5,1c0.1,0.3,0.3,0.7,0.4,1s0.3,0.7,0.4,1
                            c0.2,0.6,0.4,1.1,0.6,1.7c0,0,0,0,0,0C1394.5,424.3,1394.8,430.2,1394.6,436z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth24Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth24Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M1329.9,411.5c3-4,6.5-7.6,10.4-10.9c3.7-3.1,7.7-5.8,12.3-7.2c3-0.9,6.2-1.3,9.4-1.1
                            c11.8,0.6,22.1,7.5,28,17.3l-12-24.5l-29.9-2.3L1329.9,411.5z"
            />
            <path
              className="st17"
              d="M1328.3,443.2c1,11.1,3.2,22,6.5,32.7l25-5.6l25,2.9c6-11.7,9.3-24.3,9.9-37.2c0.2-5.8-0.1-11.7-0.4-17.6
                            c-1.1-3-2.4-5.9-4-8.7c-0.1-0.1-0.1-0.2-0.1-0.2c-5.9-9.8-16.2-16.7-28-17.3c-3.2-0.2-6.4,0.2-9.4,1.1c-4.6,1.4-8.7,4.2-12.3,7.2
                            c-3.9,3.3-7.4,6.9-10.4,10.9c-0.7,3.8-1.4,7.6-2.1,11.4C1327.6,429.7,1327.7,436.5,1328.3,443.2z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1338.31 420.849C1337.74 423.2 1339.38 425.514 1341.78 425.766L1377.05 429.466C1379.45 429.718 1381.53 427.796 1381.46 425.379L1380.38 385.633C1380.32 383.621 1378.78 381.964 1376.78 381.762L1351.91 379.26C1349.92 379.06 1348.09 380.359 1347.62 382.302L1338.31 420.849Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{ visibility: 'hidden' }}
          >
            <path
              className="st18"
              d="M1342.4,382.5l42,3.2c1.6-22.3,2.6-44.6,3.1-66.8c0.5-21.6,0.6-43.2,0.1-64.8c-3.1-4.2-7.6-6.8-12.7-7.2
                            c-5.3-0.5-10.8,1.5-15,5.5c-3.5,22.4-6.7,44.8-9.7,67.2C1347.3,340.6,1344.7,361.5,1342.4,382.5z"
            />
            <line
              className="st19"
              x1="1340.2"
              y1="364"
              x2="1388.4"
              y2="373.9"
            />
            <line
              className="st19"
              x1="1342.1"
              y1="338.5"
              x2="1390.4"
              y2="348.4"
            />
            <line
              className="st19"
              x1="1345.1"
              y1="313"
              x2="1393.3"
              y2="322.9"
            />
            <line
              className="st19"
              x1="1347"
              y1="287.5"
              x2="1395.2"
              y2="297.4"
            />
            <line
              className="st19"
              x1="1348.9"
              y1="262"
              x2="1397.2"
              y2="271.9"
            />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth24Diagnozis.culttab &&
                !tooth24Diagnozis.abutment &&
                !tooth24Diagnozis.implant &&
                !tooth24Diagnozis.shaper &&
                !tooth24Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1402.2,443.9c-1.2-6.1-3.4-11.9-5.4-17.8c-0.5-1.3-0.9-2.7-1.4-4.1
                            c-1.4-4.3-3-8.5-5.3-12.4c-5.9-9.9-16.2-16.9-28.1-17.5c-3.2-0.2-6.4,0.2-9.4,1.1c-4.6,1.4-8.7,4.2-12.3,7.2
                            c-6.1,5.1-11.3,11.2-14.9,18.1c-1.3,2.5-2.4,5.2-3.2,7.9c-1,3.3-1.6,6.7-2.3,10c-1,4.6-2.2,9.1-2.9,13.8c-1,7-0.9,14.1,0.4,21
                            c0.7,3.8,2.2,7.4,4.5,10.5c4,5.4,10,8.9,15.1,13.4c0.2,0.2,0.4,0.4,0.7,0.6c5.2,4.7,9.3,10.7,15.8,13.6c4.9,2.2,10.5,2.3,15.3,0.1
                            c5.4-2.4,8.8-7,12.1-11.7c0.4-0.5,0.8-1,1.1-1.5c4.2-5.7,9-11.2,12.8-17.3c2.8-4.4,5.1-9,6.9-13.9
                            C1403.4,458.3,1403.6,451,1402.2,443.9z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth24Diagnozis.culttab && !tooth24Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1397.64 429.395C1399.31 434.242 1400.98 439.069 1401.97 444.1C1403.37 451.2 1403.17 458.5 1401.47 465.2C1399.67 470.1 1397.37 474.7 1394.57 479.1C1392.07 483.127 1389.12 486.893 1386.2 490.627C1384.7 492.549 1383.2 494.463 1381.77 496.4C1381.47 496.9 1381.07 497.4 1380.67 497.9C1377.37 502.6 1373.97 507.2 1368.57 509.6C1363.77 511.8 1358.17 
                            511.7 1353.27 509.5C1348.75 507.482 1345.39 503.962 1342.01 500.424C1340.53 498.878 1339.06 497.329 1337.47 495.9C1337.17 495.701 1336.97 495.501 1336.77 495.301L1336.77 495.3C1335.09 493.816 1333.31 492.441 1331.54 491.071C1327.93 488.285 1324.36 485.52 1321.67 
                            481.9C1319.37 478.8 1317.87 475.2 1317.17 471.4C1315.87 464.5 1315.77 457.4 1316.77 450.4C1317.27 447.064 1318.02 443.827 1318.77 440.585C1319.08 439.26 1319.38 437.935 1319.67 436.6C1319.83 435.866 1319.98 435.126 1320.13 434.383C1320.66 431.791 
                            1321.2 429.166 1321.97 426.6C1322.77 423.9 1323.87 421.2 1325.17 418.7C1328.77 411.8 1333.97 405.7 1340.07 400.6C1343.67 397.6 1347.77 394.8 1352.37 393.4C1355.37 392.5 1358.57 392.1 1361.77 392.3C1373.67 392.9 1383.97 399.9 1389.87 409.8C1392.17 413.7 1393.77 417.9 1395.17 
                            422.2C1395.39 422.802 1395.59 423.404 1395.78 423.998C1396.04 424.786 1396.29 425.559 1396.57 426.3C1396.92 427.334 1397.28 428.365 1397.64 429.395ZM1386.07 421.695C1386.52 422.954 1385.66 424.318 1384.33 424.43L1332.68 428.775C1331.34 428.887 1330.27 427.678 1330.59 426.379C1330.76 425.725 1330.93 425.074 1331.13 424.427C1331.73 422.429 1332.56 420.43 1333.53 
                            418.58C1336.22 413.472 1340.12 408.957 1344.69 405.181C1347.38 402.961 1350.45 400.888 1353.9 399.852C1356.15 399.185 1358.54 398.889 1360.94 399.037C1369.85 399.482 1377.56 404.663 1381.98 411.991C1383.62 414.736 1384.66 417.681 1385.7 420.641C1385.82 420.993 1385.95 421.344 1386.07 421.695Z"
            />
            <path
              className={`st7 ${tooth24Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1384.33 424.43C1385.66 424.318 1386.52 422.954 1386.07 421.695C1384.9 418.382 1383.81 415.062 1381.98 411.991C1377.56 404.663 1369.85 399.482 1360.94 399.037C1358.54 398.889 1356.15 399.185 1353.9 399.852C1350.45 400.888 1347.38 402.961 1344.69 405.181C1340.12 408.957 1336.22 413.472 1333.53 418.58C1332.56 420.43 1331.73 
                            422.429 1331.13 424.427C1330.93 425.074 1330.76 425.725 1330.59 426.379C1330.27 427.678 1331.34 428.887 1332.68 428.775L1384.33 424.43Z"
            />
            <path
              className={`st60
                                    ${tooth24Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth24Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth24Diagnozis.seal_cervical_color}
                                `}
              d="M1384.33 424.43C1385.66 424.318 1386.52 422.954 1386.07 421.695C1384.9 418.382 1383.81 415.062 1381.98 411.991C1377.56 404.663 1369.85 399.482 1360.94 399.037C1358.54 398.889 1356.15 
                                399.185 1353.9 399.852C1350.45 400.888 1347.38 402.961 1344.69 405.181C1340.12 408.957 1336.22 413.472 1333.53 418.58C1332.56 420.43 1331.73 422.429 1331.13 424.427C1330.93 425.074 1330.76 425.725 1330.59 426.379C1330.27 427.678 1331.34 428.887 1332.68 
                                428.775L1384.33 424.43Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth24.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1318 444L1320 443L1321 441L1322 439.5L1323 438.5L1323.5 437L1324 435.5V434L1325 431.5V429L1326 426L1327 424.5L1327.5 421.5L1328.5 419.5L1330 417.5V415.5L1331.5 414.5L1333 412L1334.5 410.5L1336 408.5L1338 407.5L1339.5 406L1340.5 405L1342 403L1344 401.5L1345.5 400.5L1348 398.5L1351 397.5L1352.5 396H1354.5L1357.5 
                            394.5H1359L1362.5 396H1364.5H1366.5L1370 396.5L1373.5 397.5L1376 399.5L1378.5 401.5L1380.5 402.5L1382 405H1383L1384 407L1385 408.5L1386.5 409.5L1388.5 412L1389.5 415.5V417.5L1391 418.5V419.5L1392.5 421.5V423.5L1393.5 424.5V426L1395 429L1396 432.5L1396.5 434L1397.5 435.5L1400 436.5L1400.5 435L1400 432.5L1400.5 431.5V428.5L1399 426L1398 424V421.5L1397.5 419.5L1396.5 
                            417.5L1396 415.5V412V410.5V409.5L1395 407.5V405.5L1394.5 403.5L1395 401.5L1393.5 398.5L1394 396V393L1393.5 390.5V388.5L1392.5 388L1391 386L1389.5 385L1388.5 384L1385 382.5L1382 380L1378.5 378L1377 377L1373 376.5L1371 375H1369L1366.5 374.5L1364.5 375L1361.5 374.5L1359 373.5L1354.5 374.5H1352.5L1350 375L1346.5 376.5L1344 379L1342 380L1339.5 381L1338 382.5L1335 383.5L1333 386L1332 387L1331.5 388.5L1330 390.5V393L1329 397.5L1327 
                            401.5L1327.5 405L1326 407.5L1325 410.5L1323.5 413.5L1323 415.5L1321.5 418.5L1321 421.5V423.5L1320 427V429L1319 431.5L1318.5 434.5L1318 437L1317 439.5V441L1317.5 442.5L1318 444Z"
            />
            <path
              className="st61 level1"
              d="M1318 444L1320 443L1321 441L1322 439.5L1323 438.5L1323.5 437L1324 435.5V434L1325 431.5V429L1326 426L1327 424.5L1327.5 421.5L1328.5 419.5L1330 417.5V415.5L1331.5 414.5L1333 412L1334.5 410.5L1336 408.5L1338 407.5L1339.5 406L1340.5 405L1342 403L1344 401.5L1345.5 400.5L1348 398.5L1351 397.5L1352.5 396H1354.5L1357.5 394.5H1359L1362.5 396H1364.5H1366.5L1370 396.5L1373.5 397.5L1376 399.5L1378.5 
                            401.5L1380.5 402.5L1382 405H1383L1384 407L1385 408.5L1386.5 409.5L1388.5 412L1389.5 415.5V417.5L1391 418.5V419.5L1392.5 421.5V423.5L1393.5 424.5V426L1395 429L1396 432.5L1396.5 434L1397.5 435.5L1400 436.5L1400.5 435L1400 432.5L1399 430.5V428.5L1397.5 426L1397 424.5V421.5L1396 420.5L1395.5 417.5L1394.5 415L1393.5 
                            411V408.5L1392.5 405L1391 401.5L1389 399.5L1388 397.5L1383 394.5L1382 393L1376.5 389.5L1373.5 388L1372.5 387L1366.5 386H1363.5L1357.5 386.5H1353L1351 388L1346.5 389.5L1344 391.5L1341.5 393.5L1337 396.5L1336 398.5L1332.5 401L1331.5 403.5L1329 406L1327.5 408.5L1326.5 411L1325 414.5L1324 415.5L1322 418.5V420.5V422.5L1321 423.5L1320 427V429L1319 431.5L1318.5 434.5L1318 
                            437L1317 439.5V441L1317.5 442.5L1318 444Z"
            />
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth24Diagnozis.culttab &&
                !tooth24Diagnozis.abutment &&
                !tooth24Diagnozis.implant &&
                !tooth24Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС CENTER*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M1384.2,452.7c-1.2,14.7-2.7,35.1-3.4,45.3c-3.3,4.6-6.8,9.3-12.2,11.7c-4.8,2.2-10.5,2-15.3-0.1
                                c-6.5-2.9-10.6-8.9-15.8-13.6c-0.2-0.2-0.4-0.4-0.7-0.6c0.1-9.3,0.3-24.3,0.3-37.3c6.2-4.2,16.7-10.5,24.7-10.5
                                C1369.8,447.6,1378.9,450.6,1384.2,452.7z"
              />
              <path
                className={`
                                st8 target caries-center 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth24.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth24.seal_center ? `seal-fill ${teethDiagnozis.tooth24.seal_center_color}` : ''}
                            `}
                d="M1384.2,452.7c-1.2,14.7-2.7,35.1-3.4,45.3c-3.3,4.6-6.8,9.3-12.2,11.7c-4.8,2.2-10.5,2-15.3-0.1
                                c-6.5-2.9-10.6-8.9-15.8-13.6c-0.2-0.2-0.4-0.4-0.7-0.6c0.1-9.3,0.3-24.3,0.3-37.3c6.2-4.2,16.7-10.5,24.7-10.5
                                C1369.8,447.6,1378.9,450.6,1384.2,452.7z"
                style={{
                  fill: teethDiagnozis.tooth24.caries_center
                    ? '#606c80'
                    : teethDiagnozis.tooth24.seal_center
                      ? teethDiagnozis.tooth24.seal_center_color
                      : 'transparent',
                }}
              />
            </g>
            {/*КАРИЕС LEFT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1337.2,458c0,13-0.2,28-0.3,37.3c-5.1-4.5-11.1-8-15.1-13.4c-2.3-3.1-3.9-6.7-4.5-10.5
                                c-1.3-6.9-1.4-14-0.4-21c0.7-4.6,1.9-9.2,2.9-13.8c0.7-3.4,1.3-6.8,2.3-10c0.8-2.8,1.9-5.4,3.2-7.9c4.1,4.4,10.7,11.7,11.4,14.4
                                C1337.2,434.6,1337.3,445.3,1337.2,458z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth24.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth24.seal_left ? `seal-fill ${teethDiagnozis.tooth24.seal_left_color}` : ''}
                            `}
                d="M1337.2,458c0,13-0.2,28-0.3,37.3c-5.1-4.5-11.1-8-15.1-13.4c-2.3-3.1-3.9-6.7-4.5-10.5
                                c-1.3-6.9-1.4-14-0.4-21c0.7-4.6,1.9-9.2,2.9-13.8c0.7-3.4,1.3-6.8,2.3-10c0.8-2.8,1.9-5.4,3.2-7.9c4.1,4.4,10.7,11.7,11.4,14.4
                                C1337.2,434.6,1337.3,445.3,1337.2,458z"
              />
            </g>
            {/* КАРИЕС RIGHT */}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M1401.7,465.2c-1.8,4.9-4.1,9.5-6.9,13.9c-3.8,6.1-8.6,11.6-12.8,17.3c-0.4,0.5-0.8,1-1.1,1.5
                                c0.7-10.2,2.2-30.5,3.4-45.3c0.8-9.5,1.4-16.7,1.6-17.3c0.4-1.3,6.4-9.1,9.6-13.3c0.5,1.4,0.9,2.7,1.4,4.1
                                c2,5.9,4.3,11.7,5.4,17.8C1403.6,451,1403.4,458.3,1401.7,465.2z"
              />
              <path
                className={`st8 caries-right
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth24.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth24.seal_right ? `seal-fill ${teethDiagnozis.tooth24.seal_right_color}` : ''}
                            `}
                d="M1401.7,465.2c-1.8,4.9-4.1,9.5-6.9,13.9c-3.8,6.1-8.6,11.6-12.8,17.3c-0.4,0.5-0.8,1-1.1,1.5
                                c0.7-10.2,2.2-30.5,3.4-45.3c0.8-9.5,1.4-16.7,1.6-17.3c0.4-1.3,6.4-9.1,9.6-13.3c0.5,1.4,0.9,2.7,1.4,4.1
                                c2,5.9,4.3,11.7,5.4,17.8C1403.6,451,1403.4,458.3,1401.7,465.2z"
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
                className="st58"
                d="M1395.4,422.1c-3.3,4.2-9.2,12-9.6,13.3c-0.2,0.6-0.8,7.8-1.6,17.3c-5.4-2.1-14.4-5.1-22.3-5.1
                                c-8,0-18.5,6.2-24.7,10.5c0-12.7-0.1-23.4-0.5-24.9c-0.7-2.7-7.3-10.1-11.4-14.4c3.6-6.9,8.8-13,14.9-18.1
                                c3.7-3.1,7.7-5.8,12.3-7.2c3-0.9,6.2-1.3,9.4-1.1c11.9,0.6,22.3,7.6,28.1,17.5C1392.4,413.6,1394,417.9,1395.4,422.1z"
              />
              <path
                className={`
                                    st8 target caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth24.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth24.seal_top ? `seal-fill ${teethDiagnozis.tooth24.seal_top_color}` : ''}
                                `}
                d="M1395.4,422.1c-3.3,4.2-9.2,12-9.6,13.3c-0.2,0.6-0.8,7.8-1.6,17.3c-5.4-2.1-14.4-5.1-22.3-5.1
                                c-8,0-18.5,6.2-24.7,10.5c0-12.7-0.1-23.4-0.5-24.9c-0.7-2.7-7.3-10.1-11.4-14.4c3.6-6.9,8.8-13,14.9-18.1
                                c3.7-3.1,7.7-5.8,12.3-7.2c3-0.9,6.2-1.3,9.4-1.1c11.9,0.6,22.3,7.6,28.1,17.5C1392.4,413.6,1394,417.9,1395.4,422.1z"
              />
            </g>
            <g className="with">
              {/*Черточка право низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_right &&
                      !tooth24Diagnozis.seal_top &&
                      !tooth24Diagnozis.seal_center) ||
                    (tooth24Diagnozis.seal_right &&
                      tooth24Diagnozis.seal_top &&
                      !tooth24Diagnozis.seal_center) ||
                    (!tooth24Diagnozis.seal_right &&
                      tooth24Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1385 452.501L1382.5 488.501"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_right &&
                      !tooth24Diagnozis.seal_top) ||
                    (!tooth24Diagnozis.seal_right && tooth24Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1385 452.501C1386 444.001 1385.7 430.201 1392.5 427.001"
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_top &&
                      !tooth24Diagnozis.seal_center) ||
                    (tooth24Diagnozis.seal_right &&
                      tooth24Diagnozis.seal_left &&
                      tooth24Diagnozis.seal_center &&
                      !tooth24Diagnozis.seal_top) ||
                    (!tooth24Diagnozis.seal_top &&
                      !tooth24Diagnozis.seal_bottom &&
                      tooth24Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1385 452.501C1366 446.002 1353.7 446.401 1338.5 458.001"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_left &&
                      !tooth24Diagnozis.seal_top) ||
                    (!tooth24Diagnozis.seal_left && tooth24Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1338.5 458.001C1338.5 433.001 1339.5 429.701 1329.5 422.501"
              />
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth24Diagnozis.seal_left &&
                      !tooth24Diagnozis.seal_center) ||
                    (!tooth24Diagnozis.seal_left &&
                      tooth24Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1338.5 457.5L1338 489.5"
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
                visibility: tooth24Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth24Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth24Diagnozis.vinir_color}`}
                d="M1401.97 444.1C1400.77 438 1398.57 432.2 1396.57 426.3C1396.07 425 1395.67 423.6 1395.17 422.2C1393.77 417.9 1392.17 413.7 1389.87 409.8C1383.97 399.9 1373.67 392.9 1361.77 392.3C1358.57 392.1 1355.37 392.5 1352.37 393.4C1347.77 394.8 1343.67 397.6 1340.07 400.6C1333.97 405.7 1328.77 411.8 1325.17 418.7C1323.87 
                                421.2 1322.77 423.9 1321.97 426.6C1320.97 429.9 1320.37 433.3 1319.67 436.6C1318.67 441.2 1317.47 445.7 1316.77 450.4C1315.77 457.4 1315.87 464.5 1317.17 471.4C1317.87 475.2 1319.37 478.8 1321.67 481.9C1325.67 487.3 1331.67 490.8 1336.77 495.3C1336.97 495.5 1337.17 495.7 1337.47 495.9C1342.67 500.6 1346.77 506.6 1353.27 509.5C1358.17 511.7 
                                1363.77 511.8 1368.57 509.6C1373.97 507.2 1377.37 502.6 1380.67 497.9C1381.07 497.4 1381.47 496.9 1381.77 496.4C1385.97 490.7 1390.77 485.2 1394.57 479.1C1397.37 474.7 1399.67 470.1 1401.47 465.2C1403.17 458.5 1403.37 451.2 1401.97 444.1Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth24Diagnozis.temporary_crown ||
                tooth24Diagnozis.ceramic_crown ||
                tooth24Diagnozis.mceramic_crown ||
                tooth24Diagnozis.metalic_crown ||
                tooth24Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth24Diagnozis.temporary_crown ||
                tooth24Diagnozis.ceramic_crown ||
                tooth24Diagnozis.mceramic_crown ||
                tooth24Diagnozis.metalic_crown ||
                tooth24Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth24Diagnozis.ceramic_crown_color}
                                ${tooth24Diagnozis.mceramic_crown_color}
                                ${tooth24Diagnozis.metalic_crown_color}
                                ${tooth24Diagnozis.zirconia_crown_color}
                            `}
              d="M1402.2,443.9c-1.2-6.1-3.4-11.9-5.4-17.8c-0.5-1.3-0.9-2.7-1.4-4.1
                            c-1.4-4.3-3-8.5-5.3-12.4c-5.9-9.9-16.2-16.9-28.1-17.5c-3.2-0.2-6.4,0.2-9.4,1.1c-4.6,1.4-8.7,4.2-12.3,7.2
                            c-6.1,5.1-11.3,11.2-14.9,18.1c-1.3,2.5-2.4,5.2-3.2,7.9c-1,3.3-1.6,6.7-2.3,10c-1,4.6-2.2,9.1-2.9,13.8c-1,7-0.9,14.1,0.4,21
                            c0.7,3.8,2.2,7.4,4.5,10.5c4,5.4,10,8.9,15.1,13.4c0.2,0.2,0.4,0.4,0.7,0.6c5.2,4.7,9.3,10.7,15.8,13.6c4.9,2.2,10.5,2.3,15.3,0.1
                            c5.4-2.4,8.8-7,12.1-11.7c0.4-0.5,0.8-1,1.1-1.5c4.2-5.7,9-11.2,12.8-17.3c2.8-4.4,5.1-9,6.9-13.9
                            C1403.4,458.3,1403.6,451,1402.2,443.9z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
