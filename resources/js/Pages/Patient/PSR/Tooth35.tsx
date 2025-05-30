import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSubDiagnosis,
  setToothDiagnoze,
  setNewToothActive,
  setDisactiveAll,
  setSelectedToothNumber,
  settooth35Active,
} from '../../../Redux/Formula';
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

export default function Tooth35() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth35Diagnozis = teethDiagnozis.tooth35;
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
            d="M1390,1213.9c0,0,12,33,17,51s13,47,17,62s4,36,28,34s28-21,26-38
                        s-11-50-13-65s-6-42-5-66s1-59-1-75s-18-32-20-54s20-52,22-79c0,0-3.6-77.5-4.3-100.8c-0.4-12.7,1.2-39-2.3-61.4
                        c-2.9-18.7-8.4-32.8-23.4-37.8c-26.6-8.9-49,4-55,36s-11,158-11,168c0,36,17,40,17,67c0,37.2-20,41-17,82
                        C1366.4,1155.9,1382,1191.9,1390,1213.9z"
          />
        </g>
        <g
          id="T_35"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_35"
              style={{
                visibility:
                  !tooth35Diagnozis.implant &&
                  !tooth35Diagnozis.apex &&
                  !tooth35Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_35"
                className={`st9 change-color-psr-up ${tooth35Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1455.1,1163.8c-0.4,4.8-0.7,9.6-0.9,14.3c-1.5,4-3.4,7.7-5.9,11.2
                                c-3.8,5.3-8.7,9.7-14.7,12.3c-0.4,0.2-0.9,0.4-1.3,0.6c-5.1,2-10.6,2.6-16,2c-3-0.3-5.9-0.9-8.8-1.9c-7.9-2.6-14.9-7.2-20.7-13.1
                                c-1.7-5.4-3.4-10.8-5.2-16.3c-0.5-5-0.7-10.1-0.6-15.1c0-8.4,0.8-16.8,2.1-25.2l27,0.9l28.6-8.2c3.4,5.7,6.4,11.6,9,17.6
                                C1450.7,1149.7,1453.1,1156.7,1455.1,1163.8z"
              />
            </g>
            <g
              id="dentin_n_35"
              style={{
                visibility:
                  !tooth35Diagnozis.implant &&
                  !tooth35Diagnozis.abutment &&
                  !tooth35Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_35"
                className={`st10 change-color-psr ${tooth35Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1465.9,1343.9c-4.3,1.2-8-0.7-11.3-3.5c-3.6-3-7.4-7-10.3-11.5
                                c-8.4-12.8-14.8-26.6-21.1-40.5c-8.6-19-16.9-38.2-23.6-57.8c-3.6-10.6-6.8-21.3-10-32c-0.9-3.2-1.9-6.3-2.9-9.5
                                c5.8,5.9,12.8,10.5,20.7,13.1c2.9,0.9,5.8,1.6,8.8,1.9c5.4,0.6,10.9,0,16-2c0.5-0.2,0.9-0.4,1.3-0.5c5.9-2.6,10.9-7,14.6-12.3
                                c2.5-3.5,4.4-7.3,5.9-11.2c-0.9,21.2,0.2,42.5,3.3,63.6c2,13.9,4.9,27.7,8.3,41.3c1.7,6.8,3.4,13.5,4.3,20.4
                                c0.9,6.8,0.9,13.7,2,20.4C1473.4,1332.2,1473.8,1341.7,1465.9,1343.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth35Diagnozis.channel_class} ${tooth35Diagnozis.channel_class} ${tooth35Diagnozis.pulpit ? 'pulpit' : ''} ${tooth35Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1432.3,1202.2c-0.1,0-0.2,0.1-0.3,0.1c-0.3,0.1-0.6,0.2-0.9,0.3
                                c-0.2,0.1-0.4,0.1-0.5,0.2c-0.1,0-0.1,0-0.2,0.1c-0.3,0.1-0.6,0.2-0.9,0.3c-0.3,0.1-0.6,0.1-0.8,0.2c-0.6,0.1-1.1,0.3-1.7,0.4
                                c-0.3,0.1-0.6,0.1-0.9,0.2c-0.3,0.1-0.6,0.1-0.9,0.1c-0.1,0-0.1,0-0.1,0c-0.2,0-0.5,0.1-0.7,0.1c-0.3,0-0.6,0.1-0.8,0.1
                                c-0.3,0-0.6,0-0.9,0.1c-0.6,0-1.1,0.1-1.7,0.1c-0.8,0-1.6,0-2.5,0c-0.5,0-1.1-0.1-1.6-0.1c0,0-0.1,0-0.1,0c-0.1,0-0.2,0-0.3,0
                                c-0.1,0-0.2,0-0.3,0c-2.9-9.7-5.6-19.4-8.3-29.2c-0.3-1.3-0.4-2.5-0.6-3.8c-0.3-3.3-0.1-6.7,0.5-10c2.9,1.3,6.2,1.7,9.5,1.3
                                c3.2-0.4,6.1-1.6,8.5-3.5c1.4,1.8,2.4,3.8,3,5.8c0.6,2,0.9,4.1,0.7,6.2C1430.3,1181.5,1431.2,1191.8,1432.3,1202.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth35Diagnozis.channel_class} ${tooth35Diagnozis.channel_class} ${tooth35Diagnozis.pulpit ? 'pulpit' : ''} ${tooth35Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1444.1,1272.3C1444,1272.3,1444,1272.3,1444.1,1272.3c-2.1,0.2-4,0.3-5.8,0.2
                                c-0.6-1.7-1.2-3.5-1.8-5.2c-2.4-7-4.8-14-7.1-21.1c-4.6-13.9-8.9-27.9-13.1-42l0,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.3,0
                                c0,0,0.1,0,0.1,0c0.5,0,1,0.1,1.6,0.1c0.8,0,1.6,0,2.5,0c0.6,0,1.1,0,1.7-0.1c0.3,0,0.6-0.1,0.9-0.1c0.3,0,0.6-0.1,0.9-0.1
                                c0.2,0,0.4-0.1,0.7-0.1c0,0,0.1,0,0.2,0c0.3-0.1,0.6-0.1,0.9-0.2c0.3,0,0.6-0.1,0.9-0.2c0.6-0.1,1.1-0.2,1.7-0.4
                                c0.3-0.1,0.6-0.2,0.8-0.2c0.3-0.1,0.6-0.2,0.9-0.3c0.1,0,0.1,0,0.1-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.3-0.1,0.6-0.2,0.9-0.3
                                c0.1,0,0.2-0.1,0.3-0.1v0c1.9,17.2,4.4,34.4,7.8,51.4c0.8,4.2,1.7,8.4,2.6,12.6C1443.2,1268.2,1443.6,1270.2,1444.1,1272.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth35Diagnozis.channel_class} ${tooth35Diagnozis.channel_class} ${tooth35Diagnozis.pulpit ? 'pulpit' : ''} ${tooth35Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1465,1342.9c-9.5-23.2-18.4-46.7-26.7-70.4c1.8,0.1,3.7,0,5.7-0.2
                                c0,0,0.1,0,0.1,0C1449.6,1296.2,1456.6,1319.7,1465,1342.9z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth35Diagnozis.culttab &&
                !tooth35Diagnozis.abutment &&
                !tooth35Diagnozis.implant &&
                !tooth35Diagnozis.shaper &&
                !tooth35Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1459.7,1132.1c-1-4.4-2.6-8.7-4.9-12.7c-2.8-4.2-6.8-7.6-11.5-9.6
                            c-4-1.7-8.3-2.4-12.4-3.9c-0.6-0.2-1.2-0.4-1.7-0.7c-7.1-3.1-12.4-9.3-19.7-11.8c-4.3-1.5-9.1-1.6-13,0.6
                            c-3.6,2.1-5.7,5.5-7.8,9.1c-1.1,1.9-2.1,3.8-3.3,5.6c-1.4,2.2-2.8,4.4-4.5,6.3c-3,3.3-6.8,5.8-9.9,8.9c-1.8,1.8-3.4,3.8-4.7,6
                            l-1.1,4.4c0.2,7.7,1.4,15.4,3.6,22.8c3,10.3,7.7,20,14.6,28.2c0.1,0.1,0.1,0.1,0.2,0.2c6.4,7.6,14.6,13.6,24,16.7
                            c8.6,2.8,17.9,2.9,26.2-0.7c5.9-2.6,10.9-7,14.6-12.3c4-5.7,6.6-12.1,8.4-18.8c0.7-2.5,1.3-4.9,1.8-7.4
                            C1460.7,1152.9,1461.9,1142.4,1459.7,1132.1z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth35Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth35Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1459.7 1132.1C1458.7 1127.7 1457.1 1123.4 1454.8 1119.4C1452 1115.2 1448 1111.8 1443.3 1109.8C1439.3 1108.1 1435 1107.4 1430.9 1105.9C1430.3 1105.7 1429.7 1105.5 1429.2 1105.2C1422.1 1102.1 1416.8 1095.9 1409.5 1093.4C1405.2 1091.9 1400.4 1091.8 1396.5 1094C1392.9 1096.1 1390.8 1099.5 1388.7 1103.1C1387.6 1105 1386.6 1106.9 1385.4 1108.7C1384 1110.9 1382.6 1113.1 1380.9 1115C1377.9 1118.3 1374.1 1120.8 1371 1123.9C1369.2 1125.7 1367.6 1127.7 1366.3 1129.9L1365.2 1134.3C1365.4 1142 1366.6 1149.7 1368.8 1157.1C1371.8 1167.4 1376.5 1177.1 1383.4 1185.3C1383.5 1185.4 1383.5 1185.4 1383.6 1185.5C1390 1193.1 1398.2 1199.1 1407.6 1202.2C1416.2 1205 1425.5 1205.1 1433.8 1201.5C1439.7 1198.9 1444.7 1194.5 1448.4 1189.2C1452.4 1183.5 1455 1177.1 1456.8 1170.4C1457.5 1167.9 1458.1 1165.5 1458.6 1163C1460.7 1152.9 1461.9 1142.4 1459.7 1132.1Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
