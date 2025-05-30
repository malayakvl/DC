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

export default function Tooth13() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth13Diagnozis = teethDiagnozis.tooth13;
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
            d="M779,217.9c0,0-4,32-6,53s-1,59,0,75s6.9,68.5,7.4,86.8
                        c0.6,18.2,1.6,52.2,4.6,65.2s14,21,13,37s-16.6,29.5-16.3,55.2c0.3,25.8,9.3,90.8,15.3,112.8s24,27,36,27s30-10,32-32s5-53,6-61
                        s7-40,7-46s-12-39-10-61c2-22,11-43,9-75s-18-66-22-83s-21-105-26-119c-4.5-12.6-14-48-19-54s-16-7-21-3S782,203.9,779,217.9z"
          />
        </g>
        <g
          id="T_13"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_13"
              style={{
                visibility:
                  !tooth13Diagnozis.implant &&
                  !tooth13Diagnozis.apex &&
                  !tooth13Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_13"
                className={`st9 change-color-psr-up ${tooth13Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M862.4,463.1c-4.4,6.1-12.2,9.2-18.2,14c-5.2,4.2-9.1,9.8-15.2,13
                                c-1.3,0.7-2.6,1.2-4,1.6c-1.4-0.4-2.8-0.9-4-1.5c-7-3.3-11.6-9.3-16.4-14.9c-6.6-7.8-13.9-15.4-17-24.8c-2.1-6.1-2.2-12.6-2.4-19
                                c0,0.8,0,1.6,0.1,2.4c1-3.2,2-6.3,3-9.5c1.9-5.8,3.6-11.7,6.6-17c3.5-6.1,8.4-11.1,14.4-14.3c4.1-2.2,8.7-3.6,13.5-3.9
                                c2.1-0.1,4.2,0,6.2,0.3c1.1,0.2,2.1,0.5,3.1,0.8c4.6,1.5,8.5,4.4,12.2,7.5c6.3,5.2,12.1,11.1,16.8,17.6c0.3,1.2,0.5,2.3,0.8,3.5
                                c1.8,7.8,3.2,15.7,4.1,23.6C866.8,449.7,866.8,456.8,862.4,463.1z"
              />
            </g>
            <g
              id="dentin_n_13"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth13Diagnozis.implant &&
                  !tooth13Diagnozis.abutment &&
                  !tooth13Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_x5F_n_x5F_13_1_"
                className={`st10 change-color-psr ${tooth13Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M861.1,415.4c-4.7-6.5-10.5-12.4-16.8-17.6c-3.7-3.1-7.6-6-12.2-7.5
                                c-1-0.3-2.1-0.6-3.1-0.8c-2-0.4-4.1-0.5-6.2-0.3c-4.8,0.3-9.4,1.7-13.5,3.9c-5.9,3.2-10.9,8.2-14.4,14.3c-3,5.3-4.8,11.2-6.6,17
                                c-1,3.2-2.1,6.3-3,9.5c0-1.7-0.1-3.4-0.1-5.2c-0.4-11.7-1.8-23.2-2.7-34.9c-1.1-13.4-1.7-27-2.2-40.5c-0.6-16.8-1.1-33.7-1.2-50.5
                                c-0.1-14.6,0.2-29.2,1.9-43.8c0.7-6.1,1.7-12.3,2.6-18.4c0.9-6.1,1.7-12.3,2.1-18.5c0.5-8,2.2-16.7,9.7-18.4c0,0,0,0,0,0
                                c0.3-0.1,0.7-0.2,1-0.2c8.5-1.2,13.6,7.2,16,15.5c4.3,14.9,8.1,30,11.8,45c2.5,10.2,5,20.4,7.2,30.6c2.5,11.5,4.5,23,7.1,34.4
                                C844.8,358.2,854.4,386.5,861.1,415.4z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.pulpit ? 'pulpit' : ''} ${tooth13Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M835.7,427.4c-0.1,5.2-1.2,10.3-3,15.3c-1.1,3-2.5,5.8-4,8.6
                                c-0.7,1.4-1.5,2.8-3.1,3.2c-1.3,0.4-2.7-0.1-3.4-1.1c-2.2-3.1-4.2-6.4-5.6-9.9c-3.1-7.7-3.8-15.7-4.7-23.7
                                c-1-8.9-1.9-17.8-2.7-26.8c4.1-2.2,8.7-3.6,13.6-3.9c2.1-0.1,4.2,0,6.2,0.4c1.1,4.6,2.1,9.1,3.2,13.7
                                C834.1,411.2,836,419.2,835.7,427.4z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.pulpit ? 'pulpit' : ''} ${tooth13Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M829,389.5c-2-0.4-4.1-0.5-6.2-0.4c-4.8,0.3-9.4,1.7-13.6,3.9
                                c-2.3-27-3.8-54.1-5.4-81.2c-0.2-4.1-0.5-8.2-0.8-12.4c1.7-0.5,3.4-0.9,5.2-1.1c0.4,0,0.8-0.1,1.3-0.1c1.3,6.7,2.6,13.5,3.9,20.2
                                C818.2,342.1,823.5,365.9,829,389.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.pulpit ? 'pulpit' : ''} ${tooth13Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M809.6,298.3c-0.4,0-0.8,0.1-1.3,0.1c-1.8,0.2-3.6,0.5-5.2,1.1
                                c-2-32-4.6-63.9-7.9-95.6c0-0.3-0.1-0.7-0.1-1c0,0.3,0.1,0.7,0.1,1C798.9,235.4,803.7,266.8,809.6,298.3z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth13Diagnozis.culttab &&
                !tooth13Diagnozis.abutment &&
                !tooth13Diagnozis.implant &&
                !tooth13Diagnozis.shaper &&
                !tooth13Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M876.3,460.3c-0.7-4.8-1.9-9.5-2.9-14.3c-0.7-3.5-1.4-7-2.3-10.4
                            c-2-7-5.3-13.5-9.4-19.4c-4.8-6.9-10.8-13-17.4-18.5c-3.7-3.1-7.6-6-12.2-7.5c-3-1-6.2-1.3-9.3-1.1c-11.8,0.7-22.1,7.9-27.9,18.2
                            c-3,5.3-4.8,11.2-6.6,17c-1.2,3.8-2.5,7.6-3.6,11.4c-0.7,2.3-1.2,4.6-1.7,7c-1.4,7.3-1.6,14.8-0.5,22.1c1,4.9,2.6,9.8,4.7,14.4
                            c2.8,6.4,6.5,12.3,10.5,17.9c3.5,4.8,7.5,9.5,11.3,14c0.6,0.7,1.2,1.4,1.7,2c3.4,4,6.7,7.8,12,8.5c5.2,0.7,10-2.2,14.1-5.5
                            c5.3-4.3,10-9.2,15.7-13c2.5-1.7,5.2-3.2,7.8-4.7c2.8-1.7,5.5-3.4,7.9-5.5c3.4-3,6-6.7,7.7-10.8
                            C877.2,474.9,877.4,467.5,876.3,460.3z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth13Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth13Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth13Diagnozis.vinir_color}`}
                d="M876.3 460.299C875.6 455.499 874.4 450.799 873.4 445.999C872.7 442.499 872 
                                439 871.1 435.6C869.1 428.6 865.8 422.1 861.7 416.2C856.9 409.3 850.9 403.2 844.3 397.7C840.6 394.6 
                                836.7 391.7 832.1 390.2C829.1 389.2 825.9 388.9 822.8 389.1C811 389.8 800.7 396.999 794.9 407.299C791.9 
                                412.599 790.1 418.499 788.3 424.299C787.1 428.099 785.8 431.9 784.7 435.7C784 438 783.5 440.3 783 
                                442.7C781.6 450 781.4 457.499 782.5 464.799C783.5 469.699 785.1 474.6 787.2 479.2C790 485.6 793.7 491.5 
                                797.7 497.1C801.2 501.9 805.2 506.6 809 511.1C809.6 511.8 810.2 512.499 810.7 513.099C814.1 517.099 
                                817.4 520.899 822.7 521.599C827.9 522.299 832.7 519.399 836.8 516.099C842.1 511.799 846.8 506.9 852.5 
                                503.1C855 501.4 857.7 499.899 860.3 498.399C863.1 496.699 865.8 494.999 868.2 492.899C871.6 489.899 874.2 
                                486.2 875.9 482.1C877.2 474.9 877.4 467.499 876.3 460.299Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
