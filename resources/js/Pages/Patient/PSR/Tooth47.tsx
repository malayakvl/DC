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

export default function Tooth47() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth47Diagnozis = teethDiagnozis.tooth47;
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
            d="M434.1,1221.1c-1.7,3.2-3.4,6.5-4.8,9.9c-2.7,6.2-5.3,12.5-7.5,19
                        c-4,12-8,24-19,35s-22,20-39,20s-37-3-52-8s-30-20-31-39s0-33,7-52s27-56,31-70c2.8-9.8,7-25,10-35s20-33,21-47s-26-38-23-76
                        s14.2-105,16-122c3-28,15-81,65-82s72,26,77,69s-2,118-6,143s-17,46-17,64s25,54,19,78c-4.7,19-13,36.8-22.6,53.7
                        C450.7,1194.9,441.3,1207.6,434.1,1221.1z"
          />
        </g>
        <g
          id="T_47"
          className="common-view"
          style={{
            visibility: tooth47Diagnozis.absent ? 'hidden' : 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          <g className="dentin">
            <g
              id="dentin_v_47"
              style={{
                visibility:
                  !tooth47Diagnozis.implant &&
                  !tooth47Diagnozis.apex &&
                  !tooth47Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color-psr-up ${tooth47Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M460.5,1138.7c-0.3,8.3-3.4,29.5-5.4,37.5c-0.2,0.3-0.5,0.6-0.7,0.8
                                c-14,5.4-29.2,7.5-44.1,6c-1.3-0.1-2.6-0.3-3.9-0.5c-16.6-2.3-32.2-8.8-46.7-17.3c-0.4-0.2-0.7-0.4-1.1-0.7
                                c-12.8-7.8-24.6-17.1-35-27.9c0-0.2,0-0.4,0-0.5c6.1-7.3,11.7-23.2,18-30.1c5.5-6.1,11.2-12.1,16.9-18.1l37.2,23.3l60.9-6.6
                                C459.7,1115.8,460.9,1127.2,460.5,1138.7z"
              />
            </g>
            <g
              id="dentin_n_47"
              style={{
                visibility:
                  !tooth47Diagnozis.implant &&
                  !tooth47Diagnozis.abutment &&
                  !tooth47Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_47"
                className={`st10 change-color-psr ${tooth47Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M454.5,1177.1c-9.2,11.2-14.9,17.1-20.7,30.4c-8.3,19.2-12.7,33.7-21.7,52.7
                                c-6.2,13.2-15,25.8-29,32c-6,2.7-12.7,4-19.4,3.7c-3.9-0.7-7.2-3.2-8.7-6.7c-1.7-3.7-1-7.8,0.6-11.6c2.6-6.2,7.5-11.2,11.7-16.6
                                c4.4-5.5,8.1-11.6,10-18.2c2.3-7.9,1.8-16.2,0-24.2c-0.9-3.9-2.2-8-5.8-10.3c-4.1-2.7-9.6-2.2-14.3-0.2c-4.7,2-8.7,5.3-12,9
                                c-14.9,16.8-16.6,41.3-34.1,56c-3.7,3.1-8.4,5.6-13.2,4.5c-6.1-1.5-8.7-7.5-10-13.3c-3.1-13.3-3.2-27.1,0-40.3
                                c1.5-6.1,3.6-11.9,6-17.7c6.6-15.5,15.2-30.1,21-45.9c4-10.7,4.4-13,8.4-24c0.1-0.1,0.2-0.2,0.2-0.3c0,0.2,0,0.4,0,0.5
                                c10.4,10.8,22.2,20.2,35,27.9c0.4,0.2,0.7,0.4,1.1,0.7c14.4,8.6,30.1,15,46.7,17.3c1.3,0.2,2.6,0.3,3.9,0.5
                                C425.4,1184.5,440.5,1182.5,454.5,1177.1z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.pulpit ? 'pulpit' : ''} ${tooth47Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M422.1,1134.3c-0.3,5.6-1.5,11.1-3.3,16.4c-2.6,7.1-6.5,13.8-9.2,20.9
                                c-1.3,3.6-2.3,7.3-3.1,11c-1.5-0.2-3-0.4-4.5-0.7c-0.6-0.1-1.1-0.2-1.7-0.3c0,0,0,0,0,0c-1-0.2-2-0.4-3.1-0.7
                                c-0.1,0-0.1,0-0.2-0.1c-2.2-0.5-4.4-1.1-6.5-1.8c-0.5-0.2-1.1-0.3-1.6-0.5c-0.5-0.2-1.1-0.3-1.6-0.5c-0.5-0.2-1.1-0.4-1.6-0.5
                                c-1.1-0.4-2.1-0.8-3.2-1.2c-2.1-0.8-4.2-1.7-6.2-2.6c-0.8-0.4-1.7-0.7-2.5-1.1c-0.7-0.3-1.4-0.7-2.1-1c-0.4-0.2-0.9-0.4-1.3-0.6
                                c-0.1,0-0.2-0.1-0.2-0.1c-0.7-0.4-1.5-0.7-2.2-1.1c-0.8-0.4-1.6-0.8-2.3-1.2c-0.2-0.1-0.5-0.2-0.7-0.4c-0.8-0.4-1.5-0.8-2.3-1.3
                                c-0.1,0-0.1-0.1-0.2-0.1c-0.9-0.5-1.8-1-2.7-1.6c-0.4-0.2-0.7-0.4-1.1-0.7c3.2-4.5,6-9.2,7.7-14.4c1.5-4.6,2-9.4,3.8-13.9
                                c1.6-4.3,4.3-8.2,7.8-11.5c3.9,6.1,10.2,10.8,17.6,12.9C404.7,1140.4,414.5,1139.1,422.1,1134.3z"
              />
            </g>
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.pulpit ? 'pulpit' : ''} ${tooth47Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M322.9,1211.5c1.1,0.5,2.3,1,3.5,1.6c4.8-7.3,10.3-14.3,16.9-20.5
                                c13-12.4,32.4-19.3,45.1-8.8c5.5,4.6,7.3,11.3,8.2,17.8c1.2,9.5,0.9,18.9-0.6,28.1c1.4,0,2.8-0.1,4.2-0.2
                                c1.6-7.8,2.5-15.7,3.3-23.6c0.8-7.8,1.4-15.7,3-23.3c-2.1-0.3-4.1-0.6-6.2-1.1c-0.9-0.2-1.9-0.4-2.8-0.6c-0.3-0.1-0.7-0.2-1-0.2
                                c-0.4-0.1-0.7-0.2-1.1-0.3c-0.5-0.1-1.1-0.3-1.6-0.4c-0.5-0.1-1.1-0.3-1.6-0.5c-0.5-0.1-1.1-0.3-1.6-0.5c-2.7-0.8-5.3-1.7-8-2.7
                                c-0.5-0.2-1-0.4-1.6-0.6c-1.1-0.4-2.1-0.8-3.1-1.3c-0.5-0.2-1-0.4-1.5-0.7c-0.8-0.4-1.7-0.7-2.5-1.1c-0.7-0.3-1.4-0.7-2.1-1
                                c-0.4-0.2-0.9-0.4-1.3-0.6c-0.1,0-0.1-0.1-0.2-0.1c-0.7-0.4-1.4-0.7-2.2-1.1c-0.8-0.4-1.6-0.8-2.3-1.2c-0.1-0.1-0.3-0.2-0.4-0.2
                                c-0.9-0.5-1.7-0.9-2.5-1.4c-0.1,0-0.1-0.1-0.2-0.1c-0.9-0.5-1.8-1-2.7-1.6c-0.4-0.2-0.7-0.4-1.1-0.7c-3,4.2-6.4,8.2-9.8,12.1
                                C339.5,1187.9,330.5,1199.3,322.9,1211.5z"
              />
            </g>
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.pulpit ? 'pulpit' : ''} ${tooth47Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M395.9,1229.7c1.4,0,2.8-0.1,4.2-0.2c-0.7,3.6-1.6,7.2-2.7,10.8c-6.2,20.8-18.8,39.6-36.1,54.1
                                c13-12.8,22.7-27.8,28.8-43.9C392.8,1243.8,394.7,1236.8,395.9,1229.7z"
              />
              <path
                className={`st22 target top ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.channel_class} ${tooth47Diagnozis.pulpit ? 'pulpit' : ''} ${tooth47Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M317,1221.5c1.8-3.4,3.8-6.8,5.9-10c1.1,0.5,2.3,1,3.5,1.6c-8.3,12.7-14.4,26.8-19.7,41
                                c-2.8,7.4-5.3,14.9-7.7,22.4C301.6,1257.3,307.7,1238.7,317,1221.5z"
              />
            </g>
          </g>
          <g
            className="toutline "
            style={{
              visibility:
                !tooth47Diagnozis.culttab &&
                !tooth47Diagnozis.abutment &&
                !tooth47Diagnozis.implant &&
                !tooth47Diagnozis.shaper &&
                !tooth47Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M469.8,1092.2c-3.6-4.6-8-8.7-12.8-11.9c-0.1,0-0.1-0.1-0.2-0.1l-8.7-1.2
                            c-3,2.1-6,4.2-9,6.3c-3.6,2.5-7.3,5.1-11.7,6.2c-4.6,1.1-9.5,0.3-13.9,2.1c-4.8,1.9-8.1,6.3-8.5,11.4l-2-1.6
                            c2.4-2.8,3.8-6.2,4.2-9.9c0.3-2.8-0.1-5.7-1.5-8.1c-2.6-4.6-7.8-6.7-11.9-9.8c-3.5-2.7-6.3-6.2-8.1-10.3l-6.9-2.4
                            c-3.9,0.8-7.8,1.8-11.6,3.1c-2.8,0.9-5.6,2-8.3,3.2c-5.4,2.4-10.5,5.2-15.4,8.5c-3.6,5.2-6.8,10.6-9.6,16.2
                            c-4.5,8.9-8.2,18.3-9.6,28.2c-0.3,2.5-0.7,4.5-1,6.6c-0.2,2-0.3,3.9-0.1,6.3c10.7,11.1,23.6,22.5,36.8,30.3
                            c15.5,9.2,32.5,16,50.5,17.8c15.4,1.5,30.9-0.7,45.2-6.4c3.6-3.4,7-7.2,9.9-11.3c3.4-4.7,6.3-9.9,8.6-15.3c3-7.2,5-14.8,6.6-22.5
                            c0.2-0.8,0.3-1.6,0.5-2.4C481.2,1113.3,477.2,1101.7,469.8,1092.2z"
            />
          </g>
          <g className="hRoot" style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth47Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth47Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth47Diagnozis.vinir_color}`}
                d="M469.8 1092.2C466.2 1087.6 461.8 1083.5 457 1080.3C456.9 1080.3 456.9 1080.2 456.8 1080.2L448.1 1079C445.1 1081.1 442.1 1083.2 439.1 1085.3C435.5 1087.8 431.8 1090.4 427.4 1091.5C422.8 1092.6 417.9 1091.8 413.5 1093.6C408.7 1095.5 405.4 1099.9 405 1105L403 1103.4C405.4 1100.6 406.8 1097.2 407.2 1093.5C407.5 1090.7 407.1 
                                1087.8 405.7 1085.4C403.1 1080.8 397.9 1078.7 393.8 1075.6C390.3 1072.9 387.5 1069.4 385.7 1065.3L378.8 1062.9C374.9 1063.7 371 1064.7 367.2 1066C364.4 1066.9 361.6 1068 358.9 1069.2C353.5 1071.6 348.4 1074.4 343.5 1077.7C339.9 1082.9 336.7 1088.3 333.9 1093.9C329.4 1102.8 325.7 1112.2 324.3 1122.1C324 1124.6 323.6 1126.6 323.3 1128.7C323.1 1130.7 323 
                                1132.6 323.2 1135C333.9 1146.1 346.8 1157.5 360 1165.3C375.5 1174.5 392.5 1181.3 410.5 1183.1C425.9 1184.6 441.4 1182.4 455.7 1176.7C459.3 1173.3 462.7 1169.5 465.6 1165.4C469 1160.7 471.9 1155.5 474.2 1150.1C477.2 1142.9 479.2 1135.3 480.8 1127.6C481 1126.8 481.1 1126 481.3 1125.2C481.2 
                                1113.3 477.2 1101.7 469.8 1092.2Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
