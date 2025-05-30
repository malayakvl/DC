import React from 'react';
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

export default function Tooth25() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth25Diagnozis = teethDiagnozis.tooth25;

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
            d="M1426,248.9c0,0-7,25-11,48s-11,92-12,105s-0.3,37.5-0.2,49.7
                        s6.2,31.3,11.2,43.3s8,25,0,39s-12.9,31.5-10.4,58.2c2.4,26.8,2.4,107.8,8.4,122.8s19,25,38,22s30-13,32-38s10.5-92,9-112
                        c-3-40-17-52-16-74c1.3-28,15-31,15-59c0-14-4-44-6-59s-9-57-10-68s-4-67-5-80s0-32-16-34S1429,238.9,1426,248.9z"
          />
        </g>
        <g
          id="T_25"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_25"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth25Diagnozis.implant &&
                  !tooth25Diagnozis.apex &&
                  !tooth25Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_25"
                className={`st9 change-color-psr-up ${tooth25Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1476.7,438.6c-1,9.6-3.3,19.1-6.8,28.2l-23.9-2.9l-26.2,6.6
                                c-4-10.9-7.1-22-9.2-33.3c-1.4-7.4-2.3-14.8-2.9-22.2c0-7.7,0.3-15.3,1-23c1.1-12.2,2.9-24.5,4.8-36.7
                                c3.4-22.3,6.8-44.7,11.1-66.9c3.4-17.2,7.4-34.3,11.9-51.3c2.3-9,7-18,14.7-17.8c-7.5,0.2-12,9-14.3,17.8
                                c-4.4,17-8.5,34.1-11.9,51.3c-4.4,22.2-7.7,44.6-11.1,66.9c-1.9,12.2-3.8,24.5-4.8,36.7c-0.7,7.6-1,15.3-1,23
                                c0.1,1,0.2,2.1,0.2,3.1c0.1-0.5,0.2-1,0.4-1.5c2.8-10,8-19.2,15.9-26.2c3-2.7,6.4-5,10.1-6.5c0.7-0.3,1.4-0.5,2.1-0.7
                                c3-0.9,6.2-1.3,9.3-1.1c1.4,0.1,2.8,0.2,4.2,0.5c10.1,1.8,18.7,8.3,23.7,17.2c0.9,1.6,1.6,3.2,2.3,4.9
                                C1477.4,415.9,1477.9,427.3,1476.7,438.6z"
              />
            </g>
            <g
              id="dentin_n_25"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth25Diagnozis.implant &&
                  !tooth25Diagnozis.abutment &&
                  !tooth25Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_25"
                className={`st10 change-color-psr ${tooth25Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1477,405.9c-0.8-2.1-1.7-4.2-2.9-6.2c-5-8.9-13.6-15.3-23.7-17.2
                                c-1.4-0.3-2.8-0.4-4.2-0.5c-3.2-0.2-6.3,0.2-9.3,1.1c-0.7,0.2-1.4,0.5-2.1,0.7c-3.8,1.5-7.1,3.8-10.1,6.5
                                c-7.8,7-13.1,16.3-15.9,26.2c-0.1,0.5-0.3,1-0.4,1.5c-0.1-1-0.2-2-0.2-3.1c0-7.7,0.3-15.3,1-23c1.1-12.2,2.9-24.5,4.8-36.7
                                c3.4-22.3,6.8-44.7,11.1-66.9c3.4-17.2,7.4-34.3,11.9-51.3c2.5-9.5,7.5-19,16-17.7c0.2,0,0.4,0.1,0.6,0.1
                                c7.9,1.6,10.1,11.8,10.1,21.1c0.1,30.3,1.1,60.6,4.3,90.8c2.4,22.5,6,44.8,8.3,67.2C1476.6,401.1,1476.8,403.5,1477,405.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth25Diagnozis.channel_class} ${tooth25Diagnozis.channel_class} ${tooth25Diagnozis.pulpit ? 'pulpit' : ''} ${tooth25Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1454.8,428.9c-0.2,2.5-0.8,4.9-1.7,7.2c-2.7-1.6-5.9-2.4-9.1-2.2
                                c-3.3,0.2-6.5,1.4-9.1,3.4c-1.3-3.6-2.2-7.4-2.6-11.2c-0.2-1.5-0.2-3-0.2-4.5c0.6-12.6,1.4-25.2,2.3-37.7c0.2-0.1,0.3-0.1,0.4-0.2
                                c0.7-0.3,1.4-0.5,2.1-0.7c2.5-0.8,5.1-1.1,7.7-1.1c0.4,0,0.8,0,1.2,0c1.4,0.1,2.8,0.2,4.2,0.5c1.1,13.1,2.5,26.2,4.2,39.3
                                C1454.8,424,1455,426.4,1454.8,428.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth25Diagnozis.channel_class} ${tooth25Diagnozis.channel_class} ${tooth25Diagnozis.pulpit ? 'pulpit' : ''} ${tooth25Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1450.1,382.2C1450.1,382.2,1450.1,382.3,1450.1,382.2c-1.4-0.2-2.8-0.3-4.2-0.4
                                c-0.4,0-0.8,0-1.2,0c-2.6,0-5.2,0.4-7.7,1.1c-0.7,0.2-1.4,0.5-2.1,0.7c-0.2,0.1-0.3,0.1-0.5,0.2c0-0.1,0-0.1,0-0.2
                                c1.1-15.9,2.4-31.7,4-47.5c1.1-11.4,2.3-22.8,3.6-34.3c0.7-0.1,1.4-0.2,2.1-0.2c1.1-0.1,2.3-0.1,3.3,0c-0.2,8-0.2,16-0.1,24
                                C1447.5,344.5,1448.5,363.4,1450.1,382.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth25Diagnozis.channel_class} ${tooth25Diagnozis.channel_class} ${tooth25Diagnozis.pulpit ? 'pulpit' : ''} ${tooth25Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1453.2,219.3c-3.4,27.3-5.3,54.7-5.8,82.3c-1.1,0-2.2,0-3.3,0
                                c-0.7,0-1.4,0.1-2.1,0.2C1445.1,274.3,1448.9,246.7,1453.2,219.3z"
              />
            </g>
            {/* Отростки периодонтита */}
          </g>
          <g
            className="toutline hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth25Diagnozis.culttab &&
                !tooth25Diagnozis.abutment &&
                !tooth25Diagnozis.implant &&
                !tooth25Diagnozis.shaper &&
                !tooth25Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1487.8,434.1c-1.9-6.2-5.1-11.9-7.5-17.9c-0.4-1-0.8-2-1.2-3.1
                            c-1.6-4.6-3.1-9.2-5.5-13.4c-5.7-10.1-16-17.1-27.9-17.7c-3.1-0.2-6.3,0.2-9.3,1.1c-4.6,1.4-8.7,4.1-12.2,7.3
                            c-7.8,7-13.1,16.3-15.9,26.2c-0.3,1.2-0.7,2.5-0.9,3.7c-0.5,2.1-0.9,4.3-1.4,6.4c-1,4.6-2.2,9.2-2.9,13.9c-1,7-0.9,14.1,0.4,21.1
                            c1.6,3.8,3.8,7.4,6.6,10.5c4.2,4.7,9.5,8.4,14.2,12.7c0.5,0.5,1,0.9,1.5,1.4c5,4.9,9.2,10.8,15.6,13.7c4.8,2.1,10.4,2.3,15.2,0.1
                            c5.8-2.6,9.3-7.9,12.9-12.9c0.1-0.1,0.2-0.3,0.3-0.4c4.2-5.8,8.9-11.3,12.7-17.4c2.8-4.4,5.1-9.1,6.8-14
                            C1490.5,448.3,1490,441,1487.8,434.1z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth25Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth25Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth25Diagnozis.vinir_color}`}
                d="M1487.8 434.1C1485.9 427.9 1482.7 422.2 1480.3 416.2C1479.9 415.2 1479.5 414.2 1479.1 413.1C1477.5 408.5 1476 403.9 1473.6 399.7C1467.9 389.6 1457.6 382.6 1445.7 382C1442.6 381.8 1439.4 382.2 1436.4 383.1C1431.8 384.5 1427.7 387.2 1424.2 390.4C1416.4 397.4 1411.1 
                                406.7 1408.3 416.6C1408 417.8 1407.6 419.1 1407.4 420.3C1406.9 422.4 1406.5 424.6 1406 426.7C1405 431.3 1403.8 435.9 1403.1 440.6C1402.1 447.6 1402.2 454.7 1403.5 461.7C1405.1 465.5 1407.3 469.1 1410.1 472.2C1414.3 476.9 1419.6 480.6 1424.3 484.9C1424.8 485.4 1425.3 485.8 1425.8 486.3C1430.8 491.2 1435 497.1 1441.4 500C1446.2 502.1 
                                1451.8 502.3 1456.6 500.1C1462.4 497.5 1465.9 492.2 1469.5 487.2C1469.6 487.1 1469.7 486.9 1469.8 486.8C1474 481 1478.7 475.5 1482.5 469.4C1485.3 465 1487.6 460.3 1489.3 455.4C1490.5 448.3 1490 441 1487.8 434.1Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
