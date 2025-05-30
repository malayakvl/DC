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

export default function Tooth48() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth48Diagnozis = teethDiagnozis.tooth48;
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
            d="M197.8,1187.9c0,0,2.2-41,2-65c-0.1-20,1.6-45,2-51c1.2-18,14-39,15-54
                        c1-15-14-36-16-69s7.2-112.7,17-134c11-24,33.2-32,59-31c24.3,0.9,48,9,55,58s1,88-1,98s-1,17-4,30s-18,32-16,45c2,13,18,42,18,64
                        c0,12-0.4,24-3.4,33.9c-2.5,8.2-5.4,15-7.6,19.1c-5,9-24.7,46.2-30,54c-11,16-23,28-39,35c-15.1,6.6-26,10-37,5
                        C195.9,1218.7,196.8,1203.9,197.8,1187.9z"
          />
        </g>

        <g
          id="T_48"
          className="common-view"
          style={{
            visibility: tooth48Diagnozis.absent ? 'hidden' : 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          <g className="dentin">
            <g
              id="dentin_v_48"
              style={{
                visibility:
                  !tooth48Diagnozis.implant &&
                  !tooth48Diagnozis.apex &&
                  !tooth48Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color-psr-up ${tooth48Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M319.6,1097.3c-0.5,8.3-1.4,18.6-2.8,26.8c-1.3,1.3-2.5,2.5-3.6,3.8
                                c-0.9,0.8-1.8,1.5-2.7,2.3c-12.3,2.1-24.9,2.4-37.2,0.8c-2.2-0.3-4.3-0.6-6.4-1c-10.9-1.9-21.6-5.3-31.2-10.6
                                c-2.4-1.3-4.8-2.8-7.1-4.4c-10-6.9-18.3-16-24.2-26.6c3.7-5.8,9.6-16.8,14.1-21.8c4.5-5,9.5-9.7,14.8-14c5,5,10.4,9.6,16.1,13.8
                                c5.8,4.3,12,8.2,18.4,11.7c8.7,0.2,17.4-0.1,26-0.6c8.7-0.6,17.4-1.5,26-2.8C320.2,1082.3,320.1,1089.8,319.6,1097.3z"
              />
            </g>
            <g
              id="dentin_n_48"
              style={{
                visibility:
                  !tooth48Diagnozis.implant &&
                  !tooth48Diagnozis.abutment &&
                  !tooth48Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_48"
                className={`st10 change-color-psr ${tooth48Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M313.3,1127.8c-6.3,6.9-10.3,13.6-14.3,22.5c-2.7,5.9-6.7,12-9.2,18
                                c-3.7,8.9-8.3,17.6-15.1,24.8c-3.4,3.6-7.3,6.8-11.3,9.8c-3.5,2.6-7.4,4.9-11.4,6.3c-2.9,1-6.1,1.4-9,1.9c-2.8,0.5-5.6,1-8.1-0.7
                                c-1.1-0.7-1.8-1.8-2.2-3c0-0.1-0.1-0.2-0.1-0.2c-0.2-0.5-0.2-1-0.3-1.5c-0.2-3,1.3-5.9,2.8-8.6c3.9-7.1,8.1-14.1,10.9-21.7
                                c2.1-5.7,3.5-11.5,4.1-17.5c0.4-3.6-0.1-7.5-3.6-8.7c-2.9-1-5.8,0.8-7.7,3.2c-3.7,4.6-4.7,10.4-6,16c-1.5,6.7-3.7,13.4-3.3,20.2
                                c0.4,6,2.7,11.9,0.9,17.7c-0.5,1.7-1.5,3.4-3.3,4.1c-2.7,1.1-5.6-0.4-7.8-2.3c-10.1-8.8-11.4-22.3-12-35.2
                                c-1.4-30.1-3.8-54.2-3.3-84.3c0.1-0.1,0.2-0.2,0.2-0.4c5.9,10.6,14.2,19.7,24.2,26.6c2.3,1.6,4.7,3,7.1,4.4
                                c9.7,5.3,20.3,8.7,31.2,10.6c2.1,0.4,4.3,0.7,6.4,1c12.4,1.6,24.9,1.3,37.2-0.8C311.5,1129.4,312.4,1128.6,313.3,1127.8z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g className=" pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.pulpit ? 'pulpit' : ''} ${tooth48Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M281,1106c-0.5,3.8-1.3,7.6-2.6,11.3c-1.4,4-3.2,7.8-4.5,11.8
                                c-0.2,0.7-0.4,1.3-0.6,2c-0.5-0.1-1.1-0.1-1.6-0.2c-0.8-0.1-1.6-0.2-2.3-0.3c-0.8-0.1-1.5-0.2-2.3-0.4c-0.1,0-0.2,0-0.2,0
                                c-0.7-0.1-1.4-0.2-2.1-0.4c-0.6-0.1-1.2-0.2-1.9-0.4c-0.1,0-0.2,0-0.3-0.1c-0.5-0.1-1-0.2-1.5-0.3c-1.5-0.3-3-0.7-4.5-1.1
                                c0,0,0,0,0,0c-0.8-0.2-1.7-0.5-2.5-0.7c-0.7-0.2-1.3-0.4-2-0.6c-0.3-0.1-0.6-0.2-0.9-0.3c-0.7-0.2-1.3-0.5-2-0.7
                                c-0.8-0.3-1.6-0.6-2.4-0.9c-0.7-0.3-1.3-0.5-2-0.8c-0.6-0.2-1.2-0.5-1.8-0.8c-0.6-0.2-1.1-0.5-1.7-0.8c-1.9-0.9-3.8-1.8-5.7-2.9
                                c1.2-3.8,1.8-7.7,2.7-11.6c1-4.3,2.3-8.6,4.1-12.7c3.8,5.3,9.9,9.6,17,11.7C267.1,1109.1,275.1,1108.7,281,1106z"
              />
            </g>
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.pulpit ? 'pulpit' : ''} ${tooth48Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M217,1154c0.9,0.4,1.8,0.7,2.7,1.1c2.5-7.6,6.8-14.4,13.9-19.1
                                c4.4-2.9,9.4-4.7,15.2-3.4c8.2,1.8,13.2,8.7,15,15.7c1.4,5.3,1.8,10.7,1.2,15.9c1.3,0,2.6-0.1,3.8-0.1c2-11,1.5-22.5,4.5-33.2
                                c-0.4-0.1-0.8-0.1-1.2-0.2c-0.7-0.1-1.4-0.2-2-0.3c-0.2,0-0.3,0-0.5-0.1c-0.9-0.1-1.8-0.3-2.8-0.4c-0.7-0.1-1.4-0.2-2.1-0.4
                                c-0.6-0.1-1.2-0.2-1.8-0.3c-0.1,0-0.3-0.1-0.4-0.1c-0.6-0.1-1.2-0.3-1.8-0.4c-1.6-0.3-3.1-0.7-4.7-1.1c-0.6-0.2-1.2-0.3-1.8-0.5
                                c-0.7-0.2-1.4-0.4-2-0.6c-0.4-0.1-0.7-0.2-1.1-0.3c-0.6-0.2-1.2-0.4-1.7-0.6c-1.6-0.5-3.1-1.1-4.6-1.7c-0.6-0.2-1.2-0.5-1.7-0.7
                                c-0.2-0.1-0.3-0.2-0.5-0.2c-0.5-0.2-1-0.5-1.6-0.7c-0.5-0.2-1-0.5-1.5-0.7c-0.3-0.1-0.6-0.3-0.9-0.4c-0.5-0.2-0.9-0.4-1.4-0.7
                                c-0.6-0.3-1.2-0.6-1.8-1c-0.1,0.4-0.3,0.8-0.4,1.3c-3.1,8.3-9.7,15-14,22.9C219.4,1146.9,218,1150.4,217,1154z"
              />
            </g>
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.pulpit ? 'pulpit' : ''} ${tooth48Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M260.6,1179.4c2.2-4.8,3.7-9.9,4.3-15.1c1.3,0,2.6-0.1,3.8-0.1c-0.2,0.9-0.4,1.8-0.6,2.8
                                c-1.9,8.5-5.6,16.5-11.3,23.5c-6.1,7.4-14.4,13.2-24.3,17.1c-0.8,0.3-1.6,0.6-2.4,0.9c0.8-0.4,1.6-0.8,2.3-1.1
                                C245.3,1200.8,255.1,1191.1,260.6,1179.4z"
              />
              <path
                className={`st22 target top ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.channel_class} ${tooth48Diagnozis.pulpit ? 'pulpit' : ''} ${tooth48Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M217,1154c0.9,0.4,1.8,0.7,2.7,1.1c-1.1,3.5-1.8,7.1-2.2,10.7c-1.6,14.4,1.2,29.4,8.1,43.3
                                c-5.6-10-9-20.5-10.2-31C214.4,1170,214.8,1161.8,217,1154z"
              />
            </g>
          </g>
          <g
            className="toutline "
            style={{
              visibility:
                !tooth48Diagnozis.culttab &&
                !tooth48Diagnozis.abutment &&
                !tooth48Diagnozis.implant &&
                !tooth48Diagnozis.shaper &&
                !tooth48Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M327,1066.9c-0.8-3.9-1.8-7.8-3-11.6l-3.7-1.1c-1.9,1.4-4.1,2.5-6.4,3.1
                            c0,0-0.1,0-0.1,0c-9.8,2.6-19.6-2.2-29.7-2.8c-4.4-0.3-8.9,0.3-11.9,3.5c-1.3,1.4-2.1,3.1-2.8,4.9c-1.5,3.8-2.5,7.8-3.1,11.8
                            l-1.9,0c0.6-3.6,1.2-7.3,1.8-10.9c0.5-3.2,1-6.6-0.1-9.6c-2.8-8-12.4-8.9-19.6-12.8c-1.1-0.6-2.1-1.2-3-1.9
                            c-2.8-2.2-4.8-5.2-5.7-8.6l-8.3-1.1c-8.1,5.7-15.1,13-20.5,21.4c-2.9,4.5-5.3,9.3-6.5,14.5c-1.4,5.8-1.2,11.7,0.5,17.3
                            c0.4,1.4,0.9,2.7,1.5,4c5,11.3,12.9,21,22.9,28.2c11.3,8.1,24.6,12.7,38.3,15c14.4,2.5,29.2,2.5,43.7,0.1c1.2-0.9,2.3-1.9,3.4-2.9
                            c1.4-1.3,2.7-2.7,3.9-4.2c6.7-8.2,10.4-18.4,11.7-28.9C329.5,1085.1,328.8,1075.9,327,1066.9z"
            />
          </g>
          <g className="hRoot" style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth48Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth48Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth48Diagnozis.vinir_color}`}
                d="M327 1066.9C326.2 1063 325.2 1059.1 324 1055.3L320.3 1054.2C318.4 1055.6 316.2 1056.7 313.9 1057.3H313.8C304 1059.9 294.2 1055.1 284.1 1054.5C279.7 1054.2 275.2 1054.8 272.2 1058C270.9 1059.4 270.1 1061.1 269.4 1062.9C267.9 1066.7 266.9 1070.7 266.3 1074.7H264.4C265 1071.1 265.6 1067.4 266.2 1063.8C266.7 1060.6 267.2 
                                1057.2 266.1 1054.2C263.3 1046.2 253.7 1045.3 246.5 1041.4C245.4 1040.8 244.4 1040.2 243.5 1039.5C240.7 1037.3 238.7 1034.3 237.8 1030.9L229.5 1029.8C221.4 1035.5 214.4 1042.8 209 1051.2C206.1 1055.7 203.7 1060.5 202.5 1065.7C201.1 1071.5 201.3 1077.4 203 1083C203.4 1084.4 203.9 1085.7 204.5 
                                1087C209.5 1098.3 217.4 1108 227.4 1115.2C238.7 1123.3 252 1127.9 265.7 1130.2C280.1 1132.7 294.9 1132.7 309.4 1130.3C310.6 1129.4 311.7 1128.4 312.8 1127.4C314.2 1126.1 315.5 1124.7 316.7 1123.2C323.4 1115 327.1 1104.8 328.4 1094.3C329.5 
                                1085.1 328.8 1075.9 327 1066.9Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
