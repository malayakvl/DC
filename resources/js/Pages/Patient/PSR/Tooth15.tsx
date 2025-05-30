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

export default function Tooth15() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth15Diagnozis = teethDiagnozis.tooth15;
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
      <g id="15" className="df-tooth-text" style={{ opacity: 1 }}>
        <text
          transform="matrix(1 0 0 1 631.0918 716.1968)"
          className={`st3 st4 st5 ${toothActive.tooth15.active ? 'num-active' : ''}`}
        >
          15
        </text>
      </g>
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
            d="M631,233.9c0,0-3,28-4,40s-1,58-3,83s-13.1,61.9-14.1,83.5
                        c-0.9,21.5-3.9,37.5,2.1,54.5s14,23,10,37s-14.6,37.3-14.3,60.7s-0.7,76.3,7.3,105.3s25,36.9,43,36c19-1,35-15,35-57s2-90,3-109
                        s-12-39-14-50c-2-11,12-26,13-63s2-61-1-80s-9-66-13-84s-12-48-15-57s-11-21-22-18C636,218.1,632,223.9,631,233.9z"
          />
        </g>
        <g
          id="T_15"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_15"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth15Diagnozis.implant &&
                  !tooth15Diagnozis.apex &&
                  !tooth15Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color-psr-up ${tooth15Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M690,418.1c-0.6,6.4-1.4,12.8-2.6,19.2c-2.1,11.3-5.2,22.4-9.2,33.3l-26.2-6.6l-23.9,2.9
                                c-3.5-9.1-5.8-18.6-6.8-28.2c-1.2-10.9-0.8-21.8,0.1-32.7c0.8-2.1,1.7-4.2,2.9-6.2c5-8.9,13.6-15.4,23.7-17.2
                                c1.4-0.3,2.8-0.4,4.2-0.5c3.2-0.1,6.3,0.2,9.3,1.1c0.7,0.2,1.4,0.5,2.1,0.7c3.8,1.5,7.1,3.8,10.1,6.5c7.8,7,13.1,16.3,15.9,26.2
                                C689.8,417.1,689.9,417.6,690,418.1z"
              />
            </g>
            <g
              id="dentin_n_15"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth15Diagnozis.implant &&
                  !tooth15Diagnozis.abutment &&
                  !tooth15Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_15"
                className={`st10 change-color-psr ${tooth15Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M690.3,415c-0.1,1-0.1,2.1-0.2,3.1c-0.1-0.5-0.2-1-0.4-1.5
                                c-2.8-10-8-19.2-15.9-26.2c-3-2.7-6.3-5-10.1-6.5c-0.7-0.3-1.4-0.5-2.1-0.7c-3-0.9-6.2-1.3-9.3-1.1c-1.4,0.1-2.8,0.2-4.2,0.5
                                c-10.1,1.8-18.7,8.3-23.7,17.2c-1.1,2-2,4.1-2.9,6.2c0.2-2.4,0.4-4.8,0.7-7.2c2.2-22.4,5.8-44.8,8.3-67.2
                                c3.3-30.1,4.2-60.5,4.3-90.8c0-9.4,2.2-19.5,10.1-21.1c0.2,0,0.4-0.1,0.6-0.1c8.5-1.2,13.5,8.2,16,17.7c4.4,17,8.5,34.1,11.9,51.3
                                c4.4,22.2,7.7,44.6,11.1,66.9c1.9,12.2,3.8,24.5,4.8,36.7C689.9,399.7,690.3,407.3,690.3,415z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.pulpit ? 'pulpit' : ''} ${tooth15Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M666,421.6c0,1.5-0.1,3-0.2,4.5c-0.4,3.8-1.2,7.6-2.6,11.2
                                c-2.6-2-5.8-3.2-9.1-3.4c-3.2-0.2-6.4,0.6-9.1,2.2c-1-2.3-1.5-4.8-1.7-7.2c-0.2-2.4,0-4.9,0.6-7.2c2.1-16.2,4.2-39.5,4.2-39.5
                                s2.8-0.2,4.2-0.3c3.1-0.2,6.3,0.2,9.3,1.1c0.7,0.2,1.4,0.5,2,0.7C664.5,396.3,665.3,408.9,666,421.6z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.pulpit ? 'pulpit' : ''} ${tooth15Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M663.7,383.7c-0.7-0.3-1.4-0.5-2.1-0.8c-3-0.9-6.2-1.2-9.3-1.1
                                c-1.4,0.1-2.8,0.2-4.2,0.5c1.6-18.8,2.5-37.8,2.7-56.7c0.1-7.9,0.1-15.9-0.1-23.8c1.6-0.2,3.4-0.2,5.4,0h0
                                c1.3,11.4,2.5,22.8,3.6,34.3C661.3,352,662.6,367.8,663.7,383.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.pulpit ? 'pulpit' : ''} ${tooth15Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M656.2,301.9L656.2,301.9c-2-0.2-3.8-0.2-5.5,0c-0.5-27.6-2.4-55.1-5.8-82.5
                                C649.2,246.7,653,274.3,656.2,301.9z"
              />
            </g>
          </g>
          <g
            className="toutline hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth15Diagnozis.culttab &&
                !tooth15Diagnozis.abutment &&
                !tooth15Diagnozis.implant &&
                !tooth15Diagnozis.shaper &&
                !tooth15Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M694.8,440.6c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4
                            c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3c-3-0.9-6.2-1.3-9.3-1.1
                            c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                            c-2.2,6.9-2.7,14.3-1.5,21.4c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4c3.6,5,7.1,10.3,12.9,12.9
                            c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7c0.5-0.5,1-0.9,1.5-1.4c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5
                            C695.7,454.8,695.9,447.6,694.8,440.6z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth15Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth15Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth15Diagnozis.vinir_color}`}
                d="M694.8 440.6C694.1 435.9 692.9 431.3 691.9 426.7C691.4 424.6 691 422.4 690.5 420.3C690.2 419.1 689.9 417.8 
                                689.6 416.6C686.8 406.6 681.6 397.4 673.7 390.4C670.2 387.2 666.1 384.5 661.5 383.1C658.5 382.2 655.3 381.8 652.2 382C640.4 
                                382.6 630 389.6 624.3 399.7C621.9 403.9 620.5 408.6 618.8 413.1C618.4 414.1 618 415.2 617.6 416.2C615.2 422.2 612.1 427.9 
                                610.1 434.1C607.9 441 607.4 448.4 608.6 455.5C610.4 460.4 612.6 465.1 615.4 469.5C619.2 475.6 623.9 481.1 628.1 486.9C628.2 
                                487 628.3 487.2 628.4 487.3C632 492.3 635.5 497.6 641.3 500.2C646.1 502.4 651.7 502.2 656.5 500.1C663 497.2 667.2 491.3 
                                672.1 486.4C672.6 485.9 673.1 485.5 673.6 485C678.3 480.7 683.6 477 687.8 472.3C690.6 469.2 692.8 465.6 694.4 461.8C695.7 
                                454.8 695.9 447.6 694.8 440.6Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
