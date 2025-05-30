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

export default function Tooth23() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth23Diagnozis = teethDiagnozis.tooth23;
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
            d="M1281.4,213.1c-2.6,7-4.3,14.1-5.3,18.5c-5.1,22.4-11.2,44.3-16.2,66.8
                        c-4.4,19.5-8.1,39.4-13.9,58.6c-6,20-22.9,85.4-24.2,99.7c-3.8,41.3,10.2,52.3,9.2,78.3c-0.5,12.4-11,45-10,59.6
                        c0.6,9.4,8,85.4,11,102.4s16,35,39,35s34-11,40-55s6-71,5-90c-0.7-14-12-44-12-61c0-24,10-19,12-69s5-84,7-106s4.4-84,3-102
                        c-3-38-9-52-19-56C1294.2,187.8,1286.2,200.3,1281.4,213.1z"
          />
        </g>
        <g
          id="T_23"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_23"
              style={{
                visibility:
                  !tooth23Diagnozis.implant &&
                  !tooth23Diagnozis.apex &&
                  !tooth23Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_23"
                className={`st10 change-color-psr-up ${tooth23Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1312.9,431.4c-0.2,6.4-0.3,12.9-2.4,19c-3.2,9.4-10.5,17-17.1,24.8
                                c-4.8,5.7-9.4,11.7-16.4,14.9c-1.3,0.6-2.7,1.1-4,1.5c-1.4-0.4-2.7-1-4-1.6c-6.1-3.2-10-8.8-15.2-13c-6-4.8-13.8-7.9-18.2-14
                                c-4.5-6.2-4.4-13.4-3.6-20.6c0.8-7.8,2.3-15.8,4.1-23.6c4.3-18.8,9.8-37.4,15-56c-4.9,17.5-10,34.9-14.2,52.5
                                c4.7-6.5,10.5-12.4,16.8-17.7c3.7-3.1,7.6-6,12.2-7.5c1-0.3,2.1-0.6,3.1-0.8c2-0.4,4.1-0.5,6.2-0.3c4.8,0.3,9.4,1.7,13.6,3.9
                                c5.9,3.2,10.9,8.2,14.4,14.3c3,5.3,4.8,11.2,6.6,17c1,3.2,2.1,6.3,3,9.5C1312.9,433,1312.9,432.2,1312.9,431.4z"
              />
            </g>
            <g
              id="dentin_n_23"
              style={{
                visibility:
                  !tooth23Diagnozis.implant &&
                  !tooth23Diagnozis.abutment &&
                  !tooth23Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_23"
                className={`st10 change-color-psr ${tooth23Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1319.1,302.9c-0.1,16.8-0.6,33.7-1.2,50.5c-0.5,13.5-1.1,27-2.2,40.5
                                c-1,11.6-2.4,23.1-2.7,34.9c-0.1,1.7-0.1,3.4-0.1,5.2c-1-3.2-2-6.3-3-9.5c-1.9-5.8-3.6-11.7-6.6-17c-3.5-6.1-8.4-11.1-14.4-14.3
                                c-4.1-2.2-8.7-3.6-13.5-3.9c-2.1-0.1-4.2,0-6.2,0.3c-1.1,0.2-2.1,0.5-3.1,0.8c-4.6,1.5-8.5,4.4-12.2,7.5
                                c-6.3,5.2-12.1,11.1-16.8,17.6c6.8-28.9,16.3-57.2,22.9-86.2c2.6-11.4,4.7-23,7.1-34.4c2.2-10.2,4.7-20.4,7.2-30.6
                                c3.7-15.1,7.6-30.1,11.8-45c2.4-8.4,7.5-16.7,16-15.5c0.3,0,0.7,0.1,1,0.2c0,0,0,0,0,0c7.5,1.8,9.2,10.5,9.7,18.4
                                c0.3,6.2,1.2,12.3,2.1,18.5c0.9,6.1,1.9,12.3,2.6,18.4C1318.9,273.6,1319.2,288.3,1319.1,302.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth23Diagnozis.channel_class} ${tooth23Diagnozis.channel_class} ${tooth23Diagnozis.pulpit ? 'pulpit' : ''} ${tooth23Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1288,392.6c0.3,0.1,0.5,0.3,0.8,0.4c-0.8,8.9-1.6,17.9-2.7,26.8
                                c-0.9,8-1.6,16-4.7,23.7c-1.4,3.5-3.4,6.8-5.6,9.9c-0.8,1-2.2,1.4-3.4,1.1c-1.6-0.4-2.4-1.9-3.1-3.2c-1.4-2.8-2.9-5.7-4-8.6
                                c-1.8-4.9-2.9-10.1-3-15.3c-0.2-8.2,1.6-16.2,3.5-24.2c1.1-4.6,2.2-9.1,3.2-13.7c0.3,0,0.5-0.1,0.8-0.1c0.2,0,0.4-0.1,0.6-0.1
                                c0.2,0,0.5-0.1,0.7-0.1c0.1,0,0.2,0,0.3,0c0.2,0,0.4,0,0.5,0c0.2,0,0.5,0,0.7,0c0.9,0,1.8,0,2.6,0c0.3,0,0.6,0,0.9,0.1
                                c0.3,0,0.6,0,0.9,0.1c0.3,0,0.5,0.1,0.8,0.1c1.2,0.2,2.5,0.4,3.6,0.7c0.3,0.1,0.6,0.2,0.8,0.2c0.3,0.1,0.6,0.2,0.8,0.3
                                c0.3,0.1,0.6,0.2,0.9,0.3c0.8,0.3,1.6,0.6,2.4,1c0.3,0.1,0.5,0.2,0.8,0.4C1287.5,392.4,1287.8,392.5,1288,392.6z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth23Diagnozis.channel_class} ${tooth23Diagnozis.channel_class} ${tooth23Diagnozis.pulpit ? 'pulpit' : ''} ${tooth23Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1295,299c-0.3,4.3-0.6,8.5-0.8,12.8c-1.6,27.1-3.1,54.2-5.4,81.2
                                c-0.3-0.1-0.5-0.3-0.8-0.4c-0.3-0.1-0.5-0.3-0.8-0.4c-0.3-0.1-0.5-0.3-0.8-0.4c-0.8-0.3-1.6-0.7-2.4-1c-0.3-0.1-0.6-0.2-0.9-0.3
                                c-0.3-0.1-0.6-0.2-0.8-0.3c-0.3-0.1-0.6-0.2-0.8-0.2c-1.2-0.3-2.4-0.6-3.6-0.7c-0.2,0-0.5-0.1-0.8-0.1c-0.3,0-0.6-0.1-0.9-0.1
                                c-0.3,0-0.6,0-0.9-0.1c-0.9,0-1.8-0.1-2.6,0c-0.2,0-0.5,0-0.7,0c-0.2,0-0.3,0-0.5,0c-0.1,0-0.2,0-0.3,0c-0.2,0-0.5,0-0.7,0.1
                                c-0.2,0-0.4,0-0.6,0.1c-0.3,0-0.5,0.1-0.8,0.1c5.5-23.6,10.8-47.3,15.5-71c1.4-6.7,2.6-13.5,3.9-20.2c1.8,0,3.6,0.1,5.2,0.4
                                C1294.2,298.8,1294.6,298.9,1295,299z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth23Diagnozis.channel_class} ${tooth23Diagnozis.channel_class} ${tooth23Diagnozis.pulpit ? 'pulpit' : ''} ${tooth23Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1303,202.8c0,0.3-0.1,0.7-0.1,1c-3.2,31.6-5.8,63.4-7.9,95.2
                                c-0.4-0.1-0.9-0.2-1.3-0.3c-1.6-0.3-3.4-0.5-5.2-0.4c5.8-31.4,10.6-62.9,14.4-94.5C1302.9,203.5,1303,203.1,1303,202.8z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth23Diagnozis.culttab &&
                !tooth23Diagnozis.abutment &&
                !tooth23Diagnozis.implant &&
                !tooth23Diagnozis.shaper &&
                !tooth23Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1315.1,442.8c-0.5-2.3-1-4.7-1.7-7c-1.1-3.8-2.4-7.6-3.6-11.4
                            c-1.9-5.8-3.6-11.7-6.6-17c-5.9-10.3-16.1-17.5-27.9-18.2c-3.2-0.2-6.3,0.2-9.4,1.1c-4.6,1.5-8.5,4.4-12.2,7.5
                            c-6.5,5.5-12.5,11.6-17.4,18.5c-4.1,5.9-7.4,12.3-9.4,19.4c-1,3.4-1.6,6.9-2.3,10.4c-1,4.8-2.2,9.5-2.9,14.3
                            c-1,7.2-0.9,14.6,0.4,21.8c1.7,4.1,4.3,7.8,7.7,10.8c2.4,2.1,5.1,3.8,7.9,5.5c2.6,1.5,5.3,3,7.8,4.7c5.6,3.8,10.4,8.8,15.7,13
                            c4.1,3.3,8.9,6.3,14.1,5.5c5.3-0.7,8.7-4.5,12-8.5c0.6-0.7,1.2-1.3,1.7-2c3.8-4.5,7.9-9.2,11.3-14c4-5.6,7.7-11.6,10.5-17.9
                            c2.1-4.6,3.6-9.5,4.7-14.4C1316.7,457.5,1316.6,450.1,1315.1,442.8z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth23Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth23Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth23Diagnozis.vinir_color}`}
                d="M1315.1 442.8C1314.6 440.5 1314.1 438.1 1313.4 435.8C1312.3 432 1311 428.2 1309.8 424.4C1307.9 418.6 1306.2 412.7 1303.2 407.4C1297.3 397.1 1287.1 389.9 1275.3 389.2C1272.1 389 1269 389.4 1265.9 390.3C1261.3 391.8 1257.4 394.7 1253.7 397.8C1247.2 403.3 1241.2 409.4 1236.3 416.3C1232.2 422.2 1228.9 428.6 1226.9 435.7C1225.9 439.1 1225.3 442.6 1224.6 446.1C1223.6 450.9 1222.4 455.6 1221.7 460.4C1220.7 467.6 1220.8 475 1222.1 482.2C1223.8 486.3 1226.4 490 1229.8 493C1232.2 495.1 1234.9 496.8 1237.7 498.5C1240.3 500 1243 501.5 1245.5 503.2C1251.1 507 1255.9 512 1261.2 516.2C1265.3 519.5 1270.1 522.5 1275.3 521.7C1280.6 521 1284 517.2 1287.3 513.2C1287.9 512.5 1288.5 511.9 1289 511.2C1292.8 506.7 1296.9 502 1300.3 497.2C1304.3 491.6 1308 485.6 1310.8 479.3C1312.9 474.7 1314.4 469.8 1315.5 464.9C1316.7 457.5 1316.6 450.1 1315.1 442.8Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
