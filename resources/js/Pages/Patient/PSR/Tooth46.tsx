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

export default function Tooth46() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth46Diagnozis = teethDiagnozis.tooth46;
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
            d="M594,1314c6-12.2,9.4-25.9,11.8-39.1c4-22,8-52,16-76s15-33,16-56
                        s-15-55-15-72s18.4-49.1,15-83c-6-59,27-207-54-220s-87,54-89,74s-12.2,120.3-15.1,140.7c-2.9,20.3,10.1,41.3,11.1,65.3
                        c1,24-5.6,72.3-13.3,91.6c-7.7,19.4-6.7,54.4-12.7,72.4s-23,67-26,88s4,42,51,49c26.3,3.9,61,7.9,83.8-9.3
                        C582.6,1332.9,589.2,1323.9,594,1314z"
          />
        </g>
        <g
          id="T_46"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_46"
              style={{
                visibility:
                  !tooth46Diagnozis.implant &&
                  !tooth46Diagnozis.apex &&
                  !tooth46Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_46"
                className={`change-color-psr-up ${tooth46Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M622.2,1172.1c-0.2,5.8,0,6.1-1,11.4c-0.1,0.2-0.3,0.4-0.5,0.6
                                c-10.3,8.7-22.4,14.8-35.5,17.8c-1.9,0.4-3.9,0.8-5.8,1.1c-9.6,1.5-19.2,1.5-28.9,0.9c-10.8-0.6-21.8-1.9-32.4-4.6
                                c-0.7-0.2-1.4-0.4-2.1-0.6c-10.5-2.8-20.6-7.1-29.2-13.7c-4.5-3.5-8.6-7.5-12-12.1c0-0.1,0-0.1,0-0.1l-0.3,0.6
                                c0.3,0.8,0.5,1.6,0.8,2.5c-0.2-0.9-0.5-1.8-0.8-2.5l21.4-44.6l20.9,6.3l24.4-9.8l37.4,18.7l36.3-12.4c2.4,5.3,4.1,10.9,5.3,16.5
                                C622,1156,622.5,1164.1,622.2,1172.1z"
              />
            </g>
            <g
              id="dentin_n_46"
              style={{
                visibility:
                  !tooth46Diagnozis.implant &&
                  !tooth46Diagnozis.abutment &&
                  !tooth46Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_46"
                className={`change-color-psr ${tooth46Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M621.2,1183.5c0,0.2-0.1,0.5-0.2,0.8c-4.6,9.1-8.9,24.7-11,34.6
                                c-2,9.2-2.8,18.5-4,27.8c-2.5,20-6.6,39.9-14.7,58.7c-5.6,13-13.3,25.6-26.7,32c-4,1.9-8.5,2.8-12.4,3.6c-0.2,0.1-0.5,0.1-0.8,0.1
                                c-0.2,0-0.3,0.1-0.5,0.1c-2.9,0.5-5.7,0.5-8-1.2c-1.8-1.3-2.6-3.5-2.9-5.6c-0.6-3.9,0.3-7.9,1.7-11.6c2.2-5.7,5.6-11,8.2-16.6
                                c2.7-5.8,4.3-12,5.4-18.2c1.4-8,1.7-16.2,0-24.2c-2.3-11.1-9.2-21.5-20.9-23.2c-5-0.7-10,0.6-14.3,3.1c-4.9,2.8-8.5,7-12,11.2
                                c-5.5,6.6-10.5,13.5-15,20.7c-5.9,9.4-10.9,19.3-16.8,28.8c-3.3,5.3-7.6,10.4-11,15.1c-2.2,3-4.3,5.7-7.9,6.4
                                c-0.2,0-0.4,0.1-0.6,0.1c-0.2,0-0.5,0-0.7,0.1c-3.3,0.1-5.9-1.6-7.8-4c-2.2-2.9-3.1-6.7-3.4-10.4c-1.7-18.9,4.6-37.2,10.5-55.4
                                c1.9-5.9,3.8-11.9,6.1-17.7c6.4-16.5,16.2-32.5,15.2-50.2c-0.2-4.3-0.7-10.9-2.3-15l0.3-0.6c0,0.1,0,0.1,0,0.1
                                c3.4,4.5,7.5,8.6,12,12.1c8.6,6.6,18.8,10.8,29.2,13.7c0.7,0.2,1.4,0.4,2.1,0.6c10.6,2.7,21.5,4,32.4,4.6
                                c9.6,0.6,19.3,0.6,28.9-0.9c1.9-0.3,3.9-0.7,5.8-1.1c13.1-3,25.2-9,35.5-17.8C620.9,1183.9,621,1183.7,621.2,1183.5z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.pulpit ? 'pulpit' : ''} ${tooth46Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M583.6,1186.2c-0.8,5.5-2.9,10.7-4.1,16.2c0,0.2-0.1,0.4-0.1,0.6
                                c-0.6,0.1-1.2,0.2-1.7,0.2c-0.4,0.1-0.9,0.1-1.3,0.2c-0.7,0.1-1.5,0.2-2.2,0.2c-0.7,0.1-1.5,0.1-2.2,0.2c-0.5,0-1,0.1-1.5,0.1
                                c-0.5,0-1,0.1-1.4,0.1c-0.4,0-0.7,0-1.1,0c-0.5,0-1,0.1-1.4,0.1c-0.6,0-1.2,0-1.8,0c-4.7,0.1-9.5,0-14.2-0.3
                                c-0.7,0-1.5-0.1-2.2-0.1c-1.4-0.1-2.9-0.2-4.3-0.3c-1.5-0.1-2.9-0.3-4.3-0.4c-0.7-0.1-1.5-0.2-2.2-0.2c-0.7-0.1-1.5-0.2-2.2-0.3
                                c-1.4-0.2-2.9-0.4-4.3-0.6c-0.7-0.1-1.4-0.2-2.2-0.3c-1.4-0.2-2.9-0.5-4.3-0.8c-2.1-0.4-4.3-0.9-6.4-1.4c0,0,0,0,0,0s0,0,0,0
                                c0.8-7.9,0.4-16.1,2.1-23.9c0.8-3.9,2.2-7.8,4.1-11.4c6.6,8.6,18,14.6,30.3,15.9c11,1.2,21.4-1.3,28.4-7
                                C584,1177.4,584.2,1181.9,583.6,1186.2z"
              />
            </g>
            {/* Отростки периодонтита */}
            <g>
              <path
                className={`st22 target middle ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.pulpit ? 'pulpit' : ''} ${tooth46Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M479.4,1259.9c1.7,0.5,3.6,1.1,5.7,1.7c0.9-1.3,1.8-2.7,2.8-4
                                c5.7-7.9,12.2-15.5,20-22.1c8.3-7.1,18.9-12.9,32.1-11.4c18.3,2.1,30.1,16,35.2,30.2c1,2.7,1.8,5.5,2.4,8.2c0.5,2.3,0.9,4.7,1.2,7
                                c1.9-0.4,3.7-0.8,5.4-1.2c0-1.8-0.2-3.7-0.3-5.5c-0.6-6.7-1.8-13.4-2.9-20.1c-2.3-13.4-4.3-26.8-1.5-39.7
                                c-0.6,0.1-1.2,0.2-1.8,0.3c-0.4,0.1-0.8,0.1-1.2,0.2c-1,0.1-2,0.2-3,0.3c-0.5,0.1-1,0.1-1.5,0.1c-0.5,0-1,0.1-1.5,0.1
                                c-0.5,0-1.1,0.1-1.6,0.1c-0.3,0-0.6,0-0.9,0c-0.5,0-1,0-1.5,0.1c-0.6,0-1.3,0-1.9,0.1c-4.7,0.1-9.3,0-14-0.3
                                c-1.1-0.1-2.1-0.1-3.2-0.2c-1.3-0.1-2.6-0.2-3.9-0.3c-0.8-0.1-1.6-0.1-2.4-0.2c-0.2,0-0.4-0.1-0.7-0.1c-1-0.1-1.9-0.2-2.9-0.3
                                c-0.9-0.1-1.8-0.2-2.7-0.3c-1.3-0.2-2.6-0.4-3.9-0.6c-0.9-0.1-1.8-0.3-2.7-0.4c-0.3-0.1-0.6-0.1-0.9-0.2c-0.9-0.2-1.8-0.3-2.7-0.5
                                c0,0-0.1,0-0.1,0c-0.6-0.1-1.1-0.2-1.7-0.4c-0.2,0-0.5-0.1-0.7-0.1c-1.3-0.3-2.7-0.6-4-0.9c0,0,0,0,0,0c-0.5,4.7-1.4,9.2-3.4,13.5
                                c-4.4,9.5-13.4,16.4-20.6,24.6c-5.3,6.1-9.5,12.9-13.3,19.8C480.4,1258.1,479.9,1259,479.4,1259.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.pulpit ? 'pulpit' : ''} ${tooth46Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M551,1341.2c7.7-10.4,14.2-21.2,19.5-32.6c4.6-9.8,8.2-20,8.6-30.7c0.1-2.8,0-5.7-0.3-8.5
                                c1.9-0.4,3.7-0.8,5.4-1.2c0.1,2.7,0,5.4-0.2,8.1c-1.1,13-6.3,25.1-12.8,36.5c-5.6,9.8-12.1,19.3-19.7,28.3c0,0,0,0,0,0
                                c-1.2,1.4-2.3,2.8-3.6,4.1C549,1343.9,550,1342.6,551,1341.2C551,1341.2,551,1341.2,551,1341.2z"
              />
              <path
                className={`st22 target middle ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.channel_class} ${tooth46Diagnozis.pulpit ? 'pulpit' : ''} ${tooth46Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M456.1,1332.8c0.2-2.2,0.5-4.5,0.8-6.7v0c1.5-11.2,4.1-22.1,7.8-32.8c3.5-10.2,7.9-20.1,12.9-29.9
                                c0.6-1.2,1.2-2.3,1.8-3.5c1.7,0.5,3.6,1.1,5.7,1.7c-1,1.5-2,3.1-3,4.7c-11.7,18.7-19.9,38.7-24.6,59.7c0,0,0,0,0,0
                                C457,1328.2,456.6,1330.5,456.1,1332.8z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth46Diagnozis.culttab &&
                !tooth46Diagnozis.abutment &&
                !tooth46Diagnozis.implant &&
                !tooth46Diagnozis.shaper &&
                !tooth46Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M638,1131.5c-0.9-4.4-2.3-8.8-4.2-12.9c-2.4-5.3-5.5-10.3-9.5-14.5
                            c-2.8-2.9-6-5.5-9.5-7.5l-6.8-0.9c-1.4,1.1-2.8,2.2-4.2,3.3c-3,2.4-6.1,4.8-9.1,7.2c-4.5,3.5-8.9,7-13.4,10.5l-6.2,8.8l-0.3,8.2
                            l3.5,6.2l-4.4,12.5l-1.6-0.3l3.8-12l-3.3-4.9l0.5-10.7l4.5-6.8l-1-3.6l-26.9-17.5l-7.1-0.4c-5,2-9.9,4.3-14.6,6.9
                            c-2.6,1.4-5.2,3-7.7,4.6L513,1119l-0.1,18.3l-1.9,0.1l0-0.6c0,0,0,0,0,0l0.4-17.4l-0.6-3.6c-2.2-0.2-4.3-1.1-6.1-2.5
                            c-1.4-1.1-2.6-2.6-4.1-3.6c-1-0.6-2.2-1-3.3-1.1l-11,7.4l-4.8,6.6c-2.3,7.2-4.1,14.5-5.2,22c-1.3,8.6-1.8,17.3-1.5,26
                            c0,0.8,0.1,1.6,0.1,2.4c3.4,4.5,7.5,8.6,12,12c8.7,6.6,18.8,10.9,29.2,13.7c11.3,3.1,22.9,4.5,34.5,5.2c11.6,0.7,23.2,0.5,34.7-2
                            c13.1-3,25.2-9,35.5-17.7c1.8-1.9,3.4-3.9,4.9-6c5.8-8.1,9.8-17.3,11.6-27.1C638.4,1144.5,638.6,1138,638,1131.5z"
            />
          </g>
          <g className="hRoot" style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth46Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth46Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth46Diagnozis.vinir_color}`}
                d="M638 1131.5C637.1 1127.1 635.7 1122.7 633.8 1118.6C631.4 1113.3 628.3 1108.3 624.3 1104.1C621.5 1101.2 618.3 1098.6 614.8 1096.6L608 1095.7C606.6 1096.8 605.2 1097.9 603.8 1099C600.8 1101.4 597.7 1103.8 594.7 1106.2C590.2 1109.7 585.8 1113.2 581.3 1116.7L575.1 1125.5L574.8 1133.7L578.3 1139.9L573.9 1152.4L572.3 1152.1L576.1 1140.1L572.8 1135.2L573.3 1124.5L577.8 1117.7L576.8 1114.1L549.9 1096.6L542.8 1096.2C537.8 1098.2 532.9 1100.5 528.2 1103.1C525.6 1104.5 523 1106.1 520.5 1107.7L513 1119L512.9 1137.3L511 1137.4V1136.8L511.4 1119.4L510.8 1115.8C508.6 1115.6 506.5 1114.7 504.7 1113.3C503.3 1112.2 502.1 1110.7 500.6 1109.7C499.6 1109.1 498.4 1108.7 497.3 1108.6L486.3 1116L481.5 1122.6C479.2 1129.8 477.4 1137.1 476.3 1144.6C475 1153.2 474.5 1161.9 474.8 1170.6C474.8 1171.4 474.9 1172.2 474.9 1173C478.3 1177.5 482.4 1181.6 486.9 1185C495.6 1191.6 505.7 1195.9 516.1 1198.7C527.4 1201.8 539 1203.2 550.6 1203.9C562.2 1204.6 573.8 1204.4 585.3 1201.9C598.4 1198.9 610.5 1192.9 620.8 1184.2C622.6 1182.3 624.2 1180.3 625.7 1178.2C631.5 1170.1 635.5 1160.9 637.3 1151.1C638.4 1144.5 638.6 1138 638 1131.5Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
