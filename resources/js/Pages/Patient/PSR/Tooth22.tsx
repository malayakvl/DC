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

export default function Tooth22() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth22Diagnozis = teethDiagnozis.tooth22;
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
            d="M1181,302.9c0,0-10,51-14,69s-16.6,82.9-17.8,104c-1.2,21-1.2,43,5.8,62
                        s-4.5,36.3-5.7,54.6c-1.2,18,2,102.9,7.7,120.4c5,15.3,17,24,32,23s30-6,32-32s-2-102-1-114s-17.1-30.8-16-50c1-18,16-34,17-72
                        c0.9-34.1,7.1-74,8-92c1-20,1-40,1-52c0-12,1-38-7-50s-26-8-32,1S1181,302.9,1181,302.9z"
          />
        </g>
        <g
          id="T_22"
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
                  !tooth22Diagnozis.implant &&
                  !tooth22Diagnozis.apex &&
                  !tooth22Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_22"
                className={`st9 change-color-psr-up ${tooth22Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1219.5,436.9c-0.8,7.4-2,14.7-3.7,21.9c-2.5,10.3-6,20.4-10.5,30.1l-1.1,1.5
                                l-1.9,1.4l-38.5-5.2l-2.1-1l-1.7-2.4c-0.9-7.7-1.3-15.5-1.1-23.2c0.1-5.1,0.4-10.2,1.4-15.3c0.8-4,2-7.8,3.1-11.7v0
                                c2-3.2,4.3-6.1,6.9-8.7c4.2-4.2,9.2-7.3,14.6-9.2c0.8-0.3,1.5-0.5,2.3-0.7c4.3-1.1,8.7-1.4,12.9-0.3c1.8,0.4,3.6,1.1,5.2,2
                                c6.7,3.6,11,10.5,13.3,18C1219,434.9,1219.3,435.9,1219.5,436.9z"
              />
            </g>
            <g
              id="dentin_n_24"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth22Diagnozis.implant &&
                  !tooth22Diagnozis.abutment &&
                  !tooth22Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_x5F_n_x5F_22_1_"
                className={`st10 change-color-psr ${tooth22Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1221.2,371.8c-0.6,10.2-0.5,20.5-0.4,30.7c0.1,10.2,0,20.3-0.8,30.4
                                c-0.1,1.3-0.2,2.6-0.4,3.9c-0.2-1-0.5-2-0.8-3c-2.2-7.5-6.6-14.4-13.3-18c-1.7-0.9-3.4-1.6-5.2-2c-4.2-1-8.6-0.8-12.9,0.3
                                c-0.8,0.2-1.6,0.4-2.3,0.7c-5.4,1.9-10.4,5-14.6,9.2c-2.6,2.6-4.9,5.5-6.9,8.7c0.5-1.6,0.9-3.2,1.4-4.7c2.8-10.6,4-21.5,5.4-32.4
                                c2.6-19.8,6.2-39.4,10.1-59c3-15.2,6.1-30.5,10.7-45.2c2.5-7.8,6.9-15.6,14.4-15.6c1.1,0,2.1,0.2,3.1,0.5c0,0,0,0,0.1,0
                                c6.5,2,9.7,10.2,10.8,18.2c0.9,6.6,1.5,13.2,2.2,19.8c0.8,8.2,1.7,16.4,1.7,24.7C1223.3,350,1221.8,360.9,1221.2,371.8z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.pulpit ? 'pulpit' : ''} ${tooth22Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1200.3,431.5c-0.3,4.7-0.9,9.3-1.7,14c-0.7,3.9-1.5,7.8-2.3,11.6l-1.2,1.7
                                l-12.7-1l-1-2c-0.5-6.5-0.2-13.2,0.8-19.8c1-6.3,2.8-12.5,4.4-18.6c0.5-2.1,1-4.2,0.8-3.1c0,0,0,0,0,0c1.5-0.4,3-0.7,4.6-0.8
                                c0.3,0,0.6-0.1,0.9-0.1c1.8-0.1,3.6-0.1,5.3,0.2c0.2,0,0.5,0.1,0.7,0.1c0.5,0.1,0.9,0.2,1.4,0.3
                                C1200.4,419.7,1200.6,425.6,1200.3,431.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.pulpit ? 'pulpit' : ''} ${tooth22Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1200.2,413.9L1200.2,413.9c-0.4-0.1-0.9-0.2-1.4-0.3c-0.2,0-0.5-0.1-0.7-0.1
                                c-1.8-0.3-3.5-0.3-5.3-0.2c-0.3,0-0.6,0-0.9,0.1c-1.5,0.2-3.1,0.4-4.6,0.8c0,0,0,0,0,0c5.6-22.6,9.2-45.7,12.2-68.8
                                c1.3-0.2,2.7-0.3,4.1-0.2c0.2,0,0.4,0,0.7,0c-2.3,21.8-4.6,43.7-4.2,65.6C1200.2,411.9,1200.2,412.9,1200.2,413.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.pulpit ? 'pulpit' : ''} ${tooth22Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1208.6,275.9v0.5c0.1,10.3-0.2,20.7-0.8,31c-0.8,12.7-2.1,25.3-3.5,37.9
                                c-0.2,0-0.4,0-0.7,0c-1.4-0.1-2.8,0-4.1,0.2c1.5-11.3,2.9-22.7,4.3-34c1.5-11.7,3.1-23.4,4.7-35.1v0
                                C1208.6,276.2,1208.6,276.1,1208.6,275.9z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth22Diagnozis.culttab &&
                !tooth22Diagnozis.abutment &&
                !tooth22Diagnozis.implant &&
                !tooth22Diagnozis.shaper &&
                !tooth22Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1220.5,442.4c-0.4-2.9-0.9-5.7-1.8-8.5c-2.2-7.5-6.6-14.3-13.3-18
                            c-6.3-3.4-13.7-3.3-20.4-1c-5.4,1.9-10.4,5-14.6,9.2c-3.6,3.5-6.5,7.6-9,12.1c-1.7,3.1-3.2,6.4-4.5,9.7
                            c-2.6,6.5-4.5,13.2-5.8,20.1c-1.6,8.4-2.3,16.9-1.6,25.4c0.1,1.4,0.3,2.8,0.5,4.2c0.1,1.4,0.4,2.8,1,4.1c0.2,0.6,0.5,1.1,0.8,1.6
                            c0.3,0.5,0.6,1,1,1.5l4.2,3.9c1.4,0.5,2.8,1,4.3,1.4c2.7,0.8,5.4,1.5,8.2,2.1c6.6,1.4,13.3,2.2,20.1,2.2c1.3,0,2.6,0,3.9-0.1
                            c3-0.1,6.1-0.4,9.1-0.8c2.1-0.9,4.1-2.2,5.8-3.8c2.2-2.1,4.1-4.6,5.3-7.5c1.4-2.6,2.6-5.4,3.6-8.2c3.2-9.7,3.4-20,3.6-30.2
                            C1221.1,455.4,1221.3,448.8,1220.5,442.4z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth22Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth22Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1220.5 442.4C1220.1 439.5 1219.6 436.7 1218.7 433.9C1216.5 426.4 1212.1 419.6 1205.4 415.9C1199.1 412.5 1191.7 412.6 1185 414.9C1179.6 416.8 1174.6 419.9 1170.4 424.1C1166.8 427.6 1163.9 431.7 1161.4 436.2C1159.7 439.3 1158.2 442.6 1156.9 445.9C1154.3 452.4 1152.4 459.1 1151.1 466C1149.5 474.4 1148.8 482.9 1149.5 491.4C1149.6 492.8 1149.8 494.2 1150 495.6C1150.1 497 1150.4 498.4 1151 499.7C1151.2 500.3 1151.5 500.8 1151.8 501.3C1152.1 501.8 1152.4 502.3 1152.8 502.8L1157 506.7C1158.4 507.2 1159.8 507.7 1161.3 508.1C1164 508.9 1166.7 509.6 1169.5 510.2C1176.1 511.6 1182.8 512.4 1189.6 512.4C1190.9 512.4 1192.2 512.4 1193.5 512.3C1196.5 512.2 1199.6 511.9 1202.6 511.5C1204.7 510.6 1206.7 509.3 1208.4 507.7C1210.6 505.6 1212.5 503.1 1213.7 500.2C1215.1 497.6 1216.3 494.8 1217.3 492C1220.5 482.3 1220.7 472 1220.9 461.8C1221.1 455.4 1221.3 448.8 1220.5 442.4Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
