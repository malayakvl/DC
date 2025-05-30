import React from 'react';
import {
  setSubDiagnosis,
  setToothDiagnoze,
  setNewToothActive,
  setDisactiveAll,
  setSelectedToothNumber,
} from '../../../Redux/Formula';
import { useDispatch, useSelector } from 'react-redux';
import {
  allTeethSelector,
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
  getStatusesSelector,
} from '../../../Redux/Formula/selectors';

export default function Tooth24() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
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

  return (
    <>
      <g className={`f-tooth-active`}>
        <g
          className="underlay"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
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
          id="T_24"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
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
                className={`st9 change-color-psr-up ${tooth24Diagnozis.change_color ? 'diagnoze' : ''}`}
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
                className={`st9 change-color-psr ${tooth24Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1365.1,258.1c1.1-4,1.3-8.2,0.6-12.2c-0.5-2.9-1.5-5.7-2.7-8.4
                                c-1.2-2.6-2.8-5.2-5.9-5.7c-2.3-0.3-4.5,0.8-6.1,2.4c-3.4,3.5-3.8,8.3-4.2,12.8c-0.7,8.6-1.9,17.3-2.8,25.9
                                c-1.2,11.5-2,23.1-3,34.6c-1.9,22.4-4.3,44.9-7.2,67.2c4.8-20.8,10-41.5,15.6-62.2C1354.3,294.3,1359.5,276.2,1365.1,258.1z"
              />
              <path
                className={`st9 change-color-psr ${tooth24Diagnozis.change_color ? 'diagnoze' : ''}`}
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
        </g>
      </g>
    </>
  );
}
