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

export default function Tooth31() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth31Diagnozis = teethDiagnozis.tooth31;
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
            d="M1053,1203.9c0,0,7,74,10,101s10,68,28,68s21-12,21-41s1-87,1-100
                        s3.8-80.8,2.9-97.4c-1.9-35.6-15.9-50.6-15.9-79.6s16-32.8,15.5-67.9s-5.5-155.1-6.5-174.1s-12-28-26-28s-25,6-28,33s-6,157-5,171
                        s18,42,19,66s-21,47-20,93C1049.8,1184.9,1053,1203.9,1053,1203.9z"
          />
        </g>
        <g
          id="T_31"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_31"
              style={{
                visibility:
                  !tooth31Diagnozis.implant &&
                  !tooth31Diagnozis.apex &&
                  !tooth31Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_31"
                className={`st9 change-color-psr-up ${tooth31Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1107.5,1206.7c-0.2,0.7-0.5,1.4-0.8,2c-2.4,5.6-5.6,10.8-10.8,14.1
                                c-1.7,1.1-3.6,1.9-5.5,2.5c-3.6,1-7.4,1.1-11,0.1c-1.9-0.5-3.7-1.2-5.5-2.2c-8.3-4.8-12.3-14-15.2-23.1
                                c0.9,14.6,2.4,29.1,3.9,43.7c2,19.9,4.2,39.7,7.2,59.5c2.4,15.4,5.1,30.7,8.9,45.6c1.9,7.4,5.2,14.8,10.8,15.7
                                c-5.6-0.9-9-8.2-10.9-15.7c-3.8-14.9-6.5-30.3-8.9-45.6c-3.1-19.7-5.2-39.6-7.2-59.5c-1.9-18.5-3.8-37.1-4.5-55.6
                                c-0.2-5.2-0.3-10.4-0.3-15.6c0-7.5,0.4-14.9,0.9-22.4l1.4-2.5l1.8-1l37.9,0.1l1.6,1.4l0.9,1.5c1.8,8.6,3.2,17.3,4.1,26
                                c0.5,5,0.9,10.1,1.1,15.2C1107.6,1196.2,1107.6,1201.5,1107.5,1206.7z"
              />
            </g>
            <g
              id="dentin_n_31"
              style={{
                visibility:
                  !tooth31Diagnozis.implant &&
                  !tooth31Diagnozis.abutment &&
                  !tooth31Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_31"
                className={`st10 change-color-psr ${tooth31Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1107,1236.9c0,10.3,0.3,20.7,0.4,31c0,11-0.3,22-0.6,33
                                c-0.2,8.3-0.4,16.7-1.4,24.9c-0.8,6.7-2,13.3-3,20c-1.2,8-3.6,16.3-9,18.4c0,0,0,0,0,0c-0.8,0.3-1.7,0.5-2.6,0.5
                                c-6.4,0.1-10-7.8-12.1-15.8c-3.8-14.9-6.5-30.3-8.9-45.6c-3.1-19.7-5.2-39.6-7.2-59.5c-1.5-14.5-2.9-29.1-3.9-43.7
                                c2.9,9.1,6.9,18.4,15.2,23.1c1.7,1,3.6,1.7,5.5,2.2c3.6,0.9,7.4,0.9,11-0.1c1.9-0.5,3.8-1.4,5.5-2.5c5.2-3.3,8.4-8.5,10.8-14.1
                                c0.3-0.7,0.6-1.4,0.9-2.2C1107.5,1216.7,1107,1226.8,1107,1236.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.pulpit ? 'pulpit' : ''} ${tooth31Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1091.2,1201.6c0,4.4-0.4,8.8-0.5,13.2c-0.2,3.5-0.2,7-0.3,10.5
                                c-0.9,0.3-1.9,0.5-2.8,0.6c-1.4,0.2-2.8,0.2-4.2,0.2c-0.2,0-0.4,0-0.7-0.1c-1.1-0.1-2.2-0.3-3.3-0.6c0,0,0,0,0,0
                                c-0.6-3.5-1.2-7-1.8-10.5c-1.1-6.3-2.3-12.7-3-19.1c-0.7-6.7-0.9-13.4-0.5-20l1.2-2l12.7-0.2l1,1.8c0.6,3.9,1.1,7.9,1.4,11.9
                                C1090.9,1192.1,1091.2,1196.8,1091.2,1201.6z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.pulpit ? 'pulpit' : ''} ${tooth31Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1091.7,1294.8c-0.2,0-0.5,0-0.8,0.1c-1.4,0.1-2.8,0-4.1-0.3
                                c-0.2-2.2-0.3-4.4-0.5-6.6c-1-13.2-2.1-26.4-3.7-39.5c-0.9-7.7-2.1-15.3-3.3-22.9v0c0,0,0,0,0,0c1.1,0.3,2.2,0.5,3.3,0.6
                                c0.2,0,0.4,0,0.7,0.1c1.4,0.1,2.8,0,4.2-0.2c0.9-0.1,1.9-0.3,2.8-0.6c0,0,0,0,0,0c0,5.2,0,10.4,0.1,15.7
                                c0.2,15.7,0.7,31.4,1.1,47.1C1091.6,1290.3,1091.7,1292.6,1091.7,1294.8z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.channel_class} ${tooth31Diagnozis.pulpit ? 'pulpit' : ''} ${tooth31Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1093.4,1364.2v0.2C1093.4,1364.3,1093.4,1364.3,1093.4,1364.2L1093.4,1364.2
                                c-1.8-13.7-3.2-27.5-4.4-41.3c-0.8-9.4-1.5-18.9-2.2-28.3c1.4,0.3,2.7,0.4,4.1,0.3c0.2,0,0.5,0,0.8-0.1
                                c0.3,10.8,0.6,21.6,0.9,32.5C1092.9,1339.6,1093.2,1351.9,1093.4,1364.2z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth31Diagnozis.culttab &&
                !tooth31Diagnozis.abutment &&
                !tooth31Diagnozis.implant &&
                !tooth31Diagnozis.shaper &&
                !tooth31Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1114.9,1130c0.1-1.7-0.4-3.5-1.5-4.8c-1-1.2-2.3-2.1-3.8-2.5l-13.1,0.1l-32.3,0.3
                            l-9.4,0.1c-0.9-0.1-1.7,0.1-2.5,0.5c-1.9,1-2.9,3.1-2.5,5.2c-0.9,12.1-0.6,24.2,0.9,36.3c1.5,11.8,4.1,23.5,7.7,34.8
                            c0.1,0.3,0.2,0.7,0.3,1.1c2.9,8.9,6.9,17.7,15,22.3c6.9,3.9,15.3,3.8,22-0.4c5.2-3.3,8.4-8.5,10.8-14.1c1.2-2.7,2.1-5.5,2.9-8.4
                            c1.8-6.2,2.8-12.6,3.6-19C1115.3,1164.4,1115.9,1147.2,1114.9,1130z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth31Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth31Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1114.9 1130C1115 1128.3 1114.5 1126.5 1113.4 1125.2C1112.4 1124 1111.1 1123.1 1109.6 1122.7L1096.5 1122.8L1064.2 1123.1L1054.8 1123.2C1053.9 1123.1 1053.1 1123.3 1052.3 1123.7C1050.4 1124.7 1049.4 1126.8 1049.8 1128.9C1048.9 1141 1049.2 1153.1 1050.7 1165.2C1052.2 1177 1054.8 1188.7 1058.4 1200C1058.5 1200.3 1058.6 1200.7 1058.7 1201.1C1061.6 1210 1065.6 1218.8 1073.7 1223.4C1080.6 1227.3 1089 1227.2 1095.7 1223C1100.9 1219.7 1104.1 1214.5 1106.5 1208.9C1107.7 1206.2 1108.6 1203.4 1109.4 1200.5C1111.2 1194.3 1112.2 1187.9 1113 1181.5C1115.3 1164.4 1115.9 1147.2 1114.9 1130Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
