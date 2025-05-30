import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSubDiagnosis,
  setToothDiagnoze,
  setNewToothActive,
  setDisactiveAll,
  setSelectedToothNumber,
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

export default function Tooth41() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
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
            d="M1044.8,1203.9c0,0-7,74-10,101s-10,68-28,68s-21-12-21-41s-1-87-1-100
                        s-3.8-80.8-2.9-97.4c1.9-35.6,15.9-50.6,15.9-79.6s-16-32.8-15.5-67.9s5.5-155.1,6.5-174.1s13-28,27-28s24,6,27,33s6,157,5,171
                        s-18,42-19,66s21,47,20,93C1048,1184.9,1044.8,1203.9,1044.8,1203.9z"
          />
        </g>
        <g
          id="T_41"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
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
                className={`st9 change-color-psr-up ${tooth41Diagnozis.change_color ? 'diagnoze' : ''}`}
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
                className={`st10 change-color-psr ${tooth41Diagnozis.change_color ? 'diagnoze' : ''}`}
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
        </g>
      </g>
    </>
  );
}
