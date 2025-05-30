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

export default function Tooth12() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth12Diagnozis = teethDiagnozis.tooth12;
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
            d="M870,307.9c0,0-1,25,2,59s5.5,72.9,5,88c-2,64,10.5,63.1,13,81
                        c4,29-14,28.5-12,58.7c2,30.3-9,90.3,2,118.3s41,23,53,15c11.2-7.5,14-19,16-54s0-71,0-84s-13.6-27-12-45c2-22,13-23,12-66
                        c-1.3-55-15-68-20-112s-8.8-67.1-13-78c-5-13-16-21-26-19S870,282.9,870,307.9z"
          />
        </g>
        <g
          id="T_12"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_12"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth12Diagnozis.implant &&
                  !tooth12Diagnozis.apex &&
                  !tooth12Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_12"
                className={`st9 change-color-psr-up ${tooth12Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M938,483.1l-1.7,2.4l-2.1,1l-38.5,5.2l-1.9-1.4l-1.1-1.5
                                c-4.5-9.7-8-19.8-10.5-30.1c-1.7-7.2-3-14.6-3.7-22c0.2-1,0.5-2,0.8-3c2.2-7.5,6.5-14.4,13.3-18c1.7-0.9,3.5-1.6,5.2-2
                                c4.2-1,8.6-0.8,12.9,0.3c0.8,0.2,1.6,0.4,2.3,0.7c5.4,1.9,10.4,5,14.6,9.2c2.6,2.6,4.9,5.5,6.9,8.7c-0.1-0.2-0.1-0.4-0.2-0.6
                                c1.2,4.1,2.5,8.2,3.3,12.4c1,5,1.3,10.2,1.4,15.3C939.3,467.6,938.9,475.4,938,483.1z"
              />
            </g>
            <g
              id="dentin_n_12"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth12Diagnozis.implant &&
                  !tooth12Diagnozis.abutment &&
                  !tooth12Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_12"
                className={`st10 change-color-psr ${tooth12Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M934.5,432.8c-2-3.1-4.3-6.1-6.9-8.7c-4.2-4.2-9.2-7.3-14.6-9.2
                                c-0.8-0.3-1.5-0.5-2.3-0.7c-4.3-1.1-8.7-1.4-12.9-0.3c-1.8,0.4-3.6,1.1-5.2,2c-6.7,3.6-11,10.5-13.3,18c-0.3,1-0.5,2-0.8,3
                                c-0.1-1.3-0.3-2.6-0.4-3.9c-0.8-10.2-0.9-20.3-0.8-30.4c0-10.2,0.2-20.5-0.5-30.7c-0.6-10.9-2.1-21.8-2.1-32.7
                                c0-8.2,0.8-16.5,1.7-24.7c0.7-6.6,1.3-13.2,2.2-19.8c1.1-8,4.3-16.2,10.8-18.2c0,0,0,0,0.1,0c1-0.3,2-0.5,3.1-0.5
                                c7.6,0,12,7.8,14.5,15.6c4.7,14.8,7.7,30,10.7,45.2c3.8,19.6,7.5,39.2,10.1,59c1.4,10.8,2.6,21.8,5.4,32.4
                                C933.6,429.7,934.1,431.2,934.5,432.8z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth12Diagnozis.channel_class} ${tooth12Diagnozis.channel_class} ${tooth12Diagnozis.pulpit ? 'pulpit' : ''} ${tooth12Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M916.7,455.7l-1,2l-12.7,1l-1.1-1.7c-0.9-3.8-1.7-7.7-2.4-11.6
                                c-0.8-4.6-1.4-9.3-1.7-14c-0.3-5.9-0.1-11.7,0.1-17.6c4.2-1,8.6-0.8,12.9,0.3c-0.2-0.9-0.4-1.9-0.7-2.8c0.5,2,1,3.9,1.5,5.9
                                c1.6,6.2,3.4,12.3,4.4,18.6C916.9,442.5,917.2,449.2,916.7,455.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth12Diagnozis.channel_class} ${tooth12Diagnozis.channel_class} ${tooth12Diagnozis.pulpit ? 'pulpit' : ''} ${tooth12Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M910.7,414.2c-4.3-1.1-8.7-1.3-12.9-0.3c0-1,0.1-2,0.1-3
                                c0.4-21.9-1.9-43.7-4.2-65.4c1.2-0.2,2.4-0.3,3.7-0.4c0.3,0,0.7,0,1,0c0.6,4.3,1.1,8.6,1.8,12.9c0,0.1,0,0.2,0,0.3
                                c0.3,2.2,0.6,4.3,0.9,6.4c0.2,1.1,0.3,2.2,0.5,3.3c0.5,3.2,1,6.4,1.6,9.7c0.1,0.5,0.2,1,0.2,1.5c0.3,1.8,0.6,3.6,0.9,5.4
                                c0.2,1.1,0.4,2.2,0.6,3.3c0.2,1.1,0.4,2.2,0.6,3.3c0,0.3,0.1,0.6,0.2,0.8C907.2,399.4,908.9,406.8,910.7,414.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth12Diagnozis.channel_class} ${tooth12Diagnozis.channel_class} ${tooth12Diagnozis.pulpit ? 'pulpit' : ''} ${tooth12Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M898.5,345.1c-0.3,0-0.7,0-1,0c-1.2,0-2.5,0.2-3.7,0.4c-1.3-12.7-2.7-25.4-3.5-38.1
                                c-0.4-5.7-0.6-11.5-0.7-17.2c-0.1-3.5-0.1-7-0.1-10.5c0-1.1,0-2.2,0-3.3v-0.5c0,0,0,0,0,0.1c0,0.1,0,0.2,0,0.4
                                c1.2,8.7,2.4,17.5,3.6,26.2c0,0,0,0.1,0,0.1c0.4,2.9,0.8,5.9,1.1,8.8c0.3,2.1,0.6,4.3,0.8,6.4c0,0.1,0,0.1,0,0.2
                                c1.1,8.5,2.1,17.1,3.2,25.6c0,0.3,0.1,0.7,0.1,1C898.4,344.8,898.4,344.9,898.5,345.1z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth12Diagnozis.culttab &&
                !tooth12Diagnozis.abutment &&
                !tooth12Diagnozis.implant &&
                !tooth12Diagnozis.shaper &&
                !tooth12Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M946.9,466.1c-1.3-6.9-3.2-13.6-5.8-20.1c-1.3-3.4-2.8-6.6-4.5-9.7
                            c-2.5-4.5-5.4-8.6-9-12.1c-4.2-4.2-9.2-7.3-14.6-9.2c-6.8-2.3-14.1-2.5-20.5,1c-6.7,3.6-11,10.5-13.3,18c-0.8,2.8-1.4,5.6-1.8,8.5
                            c-0.8,6.5-0.6,13-0.5,19.6c0.2,10.2,0.3,20.5,3.6,30.2c0.9,2.8,2.1,5.6,3.6,8.2c1.3,2.9,3.1,5.4,5.3,7.5c1.7,1.6,3.7,2.9,5.8,3.8
                            c3,0.4,6,0.7,9.1,0.8c1.3,0,2.6,0.1,3.9,0.1c6.8,0,13.5-0.8,20.1-2.2c2.8-0.6,5.5-1.3,8.2-2.1c1.4-0.4,2.8-0.9,4.3-1.4l4.2-3.9
                            c0.4-0.5,0.7-1,1-1.5c0.3-0.5,0.6-1.1,0.8-1.6c0.5-1.3,0.8-2.7,1-4.1c0.2-1.4,0.4-2.8,0.5-4.2C949.2,483,948.5,474.4,946.9,466.1z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth12Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth12Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M946.9 466.1C945.6 459.2 943.7 452.5 941.1 446C939.8 442.6 938.3 439.4 936.6 436.3C934.1 
                                431.8 931.2 427.7 927.6 424.2C923.4 420 918.4 416.9 913 415C906.2 412.7 898.9 412.5 892.5 416C885.8 419.6 881.5 426.5 879.2 434C878.4 436.8 877.8 439.6 877.4 
                                442.5C876.6 449 876.8 455.5 876.9 462.1C877.1 472.3 877.2 482.6 880.5 492.3C881.4 495.1 882.6 497.9 884.1 500.5C885.4 503.4 887.2 
                                505.9 889.4 508C891.1 509.6 893.1 510.9 895.2 511.8C898.2 512.2 901.2 512.5 904.3 512.6C905.6 512.6 906.9 512.7 908.2 512.7C915 512.7 921.7 511.9 928.3 510.5C931.1 
                                509.9 933.8 509.2 936.5 508.4C937.9 508 939.3 507.5 940.8 507L945 503.1C945.4 502.6 945.7 502.1 946 501.6C946.3 501.1 946.6 500.5 946.8 500C947.3 498.7 
                                947.6 497.3 947.8 495.9C948 494.5 948.2 493.1 948.3 491.7C949.2 483 948.5 474.4 946.9 466.1Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
