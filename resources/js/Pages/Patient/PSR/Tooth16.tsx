import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSubDiagnosis,
  setToothDiagnoze,
  setNewToothActive,
  setDisactiveAll,
  setSelectedToothNumber,
  setTooth16Active,
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

export default function Tooth16() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth16Diagnozis = teethDiagnozis.tooth16;
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
            d="M496.7,264.2c0,0-11.2,23.7-9.6,44.1c1.6,20.4,6.2,35.2,2.7,50.9
                        c-3.5,15.7-24.5,35.9-27.9,65.9c-3.4,30,2.4,45.9,25.1,66.7c11.9,10.9-0.6,30.4-10.1,49c-8.6,16.8-13.4,38.3-18.7,56.1
                        c-11.2,37.5-16.1,59.8-2.1,94.8c14,35,64.5,54.8,93.9,40.3c17-8.4,33.3-33.2,44.6-69.9c8.3-26.9,13.3-48.1,13.3-86.1
                        c0-25-7.5-36.4-15.2-49.9c-6.6-11.7-3.9-20.3-1.6-26.5c6.2-16.9,6.6-14.6,10.9-23.9c13-27.9,6-55.4,7.9-66.4
                        c3.1-18.1,12.3-51.1,8.1-91.3c-4.1-40.2-14.4-61.6-25.1-68.3c-10.7-6.6-26.9-13.9-43.6-13S506.4,241.9,496.7,264.2z"
          />
        </g>
        <g
          id="T_16"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_16"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth16Diagnozis.implant &&
                  !tooth16Diagnozis.apex &&
                  !tooth16Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color-psr-up ${tooth16Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M606.3,407.9c-1.3,8.2-2.7,16.5-4.9,24.5c-2.9,10.7-7.3,21-13,30.7l-18.3-13.1
                                l-21.6,2.8l-29.3-12l-28,8.1c-8.2-16.1-11.8-34.2-8.5-51.7c0.7-3.8,1.8-7.5,3-11.1c0.1-0.1,0.2-0.2,0.2-0.2
                                c8.8-4,18.2-6.8,28.1-8.4c23.2-3.6,47.7,0,68.3,10.7c9.1,4.8,17.2,10.8,23.9,17.9C606.2,406.7,606.2,407.3,606.3,407.9z"
              />
            </g>
            <g
              id="dentin_n_16"
              style={{
                visibility:
                  !tooth16Diagnozis.implant &&
                  !tooth16Diagnozis.abutment &&
                  !tooth16Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color-psr ${tooth16Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M614.5,349.4c-0.7,17.4-4.3,34.5-7.1,51.7c-0.4,2.3-0.7,4.5-1.1,6.8c-0.1-0.6-0.1-1.2-0.2-1.8
                                c-6.7-7.1-14.7-13.1-23.9-17.9c-20.6-10.7-45-14.3-68.3-10.7c-9.9,1.5-19.4,4.3-28.1,8.3c-0.1,0.1-0.2,0.2-0.2,0.2
                                c3.4-10.6,8-20.9,9-31.8c1.2-12.6-1.7-25.2-2.4-37.8c-0.5-9,0.1-17.9,1.6-26.8c1-6.1,2.5-12.1,3.7-18.1
                                c1.8-9.6,7.8-18.2,15.6-15.3c3.7,1.3,5.1,5,5.8,8.6c1.2,6.4,0.8,12.8,1,19.3c0.2,7.7,1.4,15.3,3.4,22.7
                                c1.8,6.7,4.3,13.1,7.6,19.3c4.3,8.2,11.1,15.5,16.8,21.9c3.6,4.1,7.2,7.7,13.1,7.9c10.4,0.4,15.4-10.1,17.5-20.4
                                c2.4-11.7,4.5-23.6,3.7-35.5c-0.8-11.8-4.5-23.6-2.5-35.4c0.6-3.6,2.1-7.3,5.7-8.6c5.9-2.1,11.3,3.1,14.2,9.1
                                c4.3,8.8,6.9,18.2,9.1,27.7C612.6,311.6,615.2,330.5,614.5,349.4z"
              />
              <path
                className={`st10 change-color-psr ${tooth16Diagnozis?.change_color ? 'diagnoze' : ''}`}
                d="M544.9,342.6c1.7,2.4,3.3,4.8,5.2,7.1c2.9,3.4,6.7,6.3,11,5.9c3-0.3,5.4-2.1,7.4-4.4
                                c3.6-4,5.7-8.9,7.3-14c1.8-5.9,2.9-12.1,3.1-18.3c-2.7-10.6-5.6-21.1-8.7-31.6c-3.5-12-7.3-23.8-10.5-35.9
                                c-0.6-2.3-1.2-4.7-2.6-6.7c-1.8-2.5-4.7-4.1-7.8-4.1c-4.4-0.1-8.4,2.8-9.8,7c-1.2,7.9-2.1,15.7-2.8,23.6
                                c-0.9,10.1-1.5,20.2-2.2,30.3c-0.6,8.3-1.3,16.7-2,25c2.6,3.5,5.2,6.9,7.9,10.2C541.9,338.7,543.5,340.6,544.9,342.6z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.pulpit ? 'pulpit' : ''} ${tooth16Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M576.9,385.7c-1.4,5-2.5,10.1-2.9,15.3c-0.4,5.5-0.2,10.9-1,16.4
                                c-0.6,4.3-1.9,8.4-3.8,12.4c-3.9-7.2-11.2-12.4-19.8-14.2c-9.8-2-20,0.7-27.1,7c-0.5-3.9-0.6-7.9-0.2-11.8
                                c1-11.6,5.6-22.8,5.4-34.5C544.5,375.6,561.5,378.8,576.9,385.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.pulpit ? 'pulpit' : ''} ${tooth16Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M597,326.2c-0.2,2-0.5,4-0.9,6c-2.1,10.7-6.5,20.9-10.8,31.1
                                c-3.1,7.4-6.2,14.8-8.4,22.4c-15.3-6.9-32.4-10-49.4-9.4c0-0.8,0-1.5-0.1-2.3c-0.8-10.2-5.4-19.3-9.4-28.7
                                c-3.7-8.8-6.8-17.8-8.9-27c1.1-0.4,2.3-0.7,3.7-1.1c3.6,11.7,8.9,22.8,15.1,33.6c3.6,6.3,8,12.7,14.3,16.4
                                c0.8-7.6,1.5-15.1,2.1-22.7c0.1-0.8,0.1-1.6,0.2-2.4c0.8-9.8,1.4-19.5,1.9-29.3c1.5,0,3.1,0.1,4.6,0.2c2.2,0.1,4.3,0.4,6.5,0.7
                                c2.2,13.7,4.5,27.3,7,40.9c0.1,0.4,0.1,0.8,0.2,1.1c0.7,3.9,1.5,7.9,2.2,11.8c6.9-3.6,12.7-9.8,16.9-16.6c4.1-6.7,7.2-13.9,9-21.3
                                c0.4-1.6,0.7-3.2,0.9-4.8C594.9,325.2,596,325.7,597,326.2z"
              />
            </g>
            {/* Отростки периодонтита */}
            <g>
              <path
                className={`st22 target part ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.pulpit ? 'pulpit' : ''} ${tooth16Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M510.1,256c-2.2,9-3.6,18.1-4,27.3c-0.5,10.6,0.2,21.2,2.3,31.7c0.2,1.1,0.4,2.1,0.7,3.2
                                    c1.1-0.4,2.3-0.7,3.7-1.1c-0.4-1.3-0.8-2.6-1.1-3.9C506.5,294.4,506,274.9,510.1,256z"
              />
              <path
                className={`st22 target part ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.pulpit ? 'pulpit' : ''} ${tooth16Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M547.7,240.8c0-0.2,0-0.3,0-0.5C547.6,240.5,547.7,240.6,547.7,240.8c0.3,19.9,0.1,39.7-0.7,59.6
                                    c-0.2,4.1-0.3,8.2-0.6,12.3c1.5,0,3.1,0.1,4.6,0.2c2.2,0.1,4.3,0.4,6.5,0.7c-0.4-2.4-0.8-4.9-1.1-7.3
                                    C553.1,284.5,550.2,262.7,547.7,240.8z"
              />
              <path
                className={`st22 target part ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.channel_class} ${tooth16Diagnozis.pulpit ? 'pulpit' : ''} ${tooth16Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M595.6,294.3c-2-12.4-5.2-24.7-9.5-36.8c4,13.3,6.6,26.9,7.9,40.7c0.8,8.8,1.1,17.8-0.3,26.5
                                c1.2,0.5,2.3,1.1,3.3,1.5C598.2,315.6,597.3,304.8,595.6,294.3z"
              />
            </g>
          </g>
          <g
            style={{
              visibility:
                !tooth16Diagnozis.culttab &&
                !tooth16Diagnozis.abutment &&
                !tooth16Diagnozis.implant &&
                !tooth16Diagnozis.shaper &&
                !tooth16Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M607.9,422.5c-0.5-5.4-1.1-10.8-1.8-16.2c0-0.1,0-0.1,0-0.2
                            c-6.7-7.1-14.7-13.1-23.9-17.9c-20.6-10.8-45-14.3-68.2-10.7c-9.9,1.5-19.4,4.4-28.1,8.4c-0.1,0.1-0.2,0.2-0.2,0.2
                            c-3.9,4.2-7.6,8.6-11,13.2c-3.4,4.6-6.6,9.3-9,14.3c-2.4,4.9-4,10-4.9,15.3c-0.7,8.5,0.5,17,3.6,25.2c2.4,6.4,5.9,12.6,10.3,18.2
                            l5.6,1.3c0.9-0.5,1.9-1,2.9-1.4c1.7-0.6,3.4-1,5.2-1.1c-2.4-2-4.6-4.2-6.6-6.5c-2.9-3.1-5.4-6.5-6.9-10.2
                            c-0.7-1.8-1.2-3.6-1.4-5.5l1.7-0.2c0.2,2,0.8,3.9,1.6,5.8c2.7,6.5,8.3,11.8,14.4,16.5c2.7,2,5.5,4,8.4,5.8c0.8,0.5,1.7,1,2.6,1.6
                            l4.6,0.3c3.7-2.6,8-4.5,12.7-5.7c5.4-1.4,11.2-1.7,16.3-3.6c1.6-0.6,3.1-1.3,4.4-2.2l3.7-6.9l1.2-10.1l5.4-5.1l1,1.4l-4.9,4.2
                            l-1,9.9l-3.4,7.3c1.8,1.2,3.6,2.3,5.5,3.4c6,3.5,12.5,6.5,18.1,10.4c0.6,0.4,1.2,0.8,1.7,1.2c2.1,1.5,3.9,3.2,5.7,5l6.1,0.8
                            c7.8-3.4,14.6-8.2,19.8-14.1c3.2-3.6,5.8-7.5,7.7-11.7c1.5-6.5,2.3-13.1,2.4-19.7C609.2,436.4,608.6,429.4,607.9,422.5z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth16Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth16Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M607.9 422.5C607.4 417.1 606.8 411.7 606.1 406.3C606.1 406.2 606.1 406.2 606.1 
                                406.1C599.4 399 591.4 393 582.2 388.2C561.6 377.4 537.2 373.9 514 377.5C504.1 379 494.6 381.9 485.9 
                                385.9C485.8 386 485.7 386.1 485.7 386.1C481.8 390.3 478.1 394.7 474.7 399.3C471.3 403.9 468.1 408.6 465.7 
                                413.6C463.3 418.5 461.7 423.6 460.8 428.9C460.1 437.4 461.3 445.9 464.4 454.1C466.8 460.5 470.3 466.7 474.7 
                                472.3L480.3 473.6C481.2 473.1 482.2 472.6 483.2 472.2C484.9 471.6 486.6 471.2 488.4 471.1C486 469.1 
                                483.8 466.9 481.8 464.6C478.9 461.5 476.4 458.1 474.9 454.4C474.2 452.6 473.7 450.8 473.5 448.9L475.2 
                                448.7C475.4 450.7 476 452.6 476.8 454.5C479.5 461 485.1 466.3 491.2 471C493.9 473 496.7 475 499.6 
                                476.8C500.4 477.3 501.3 477.8 502.2 478.4L506.8 478.7C510.5 476.1 514.8 474.2 519.5 473C524.9 471.6 530.7 
                                471.3 535.8 469.4C537.4 468.8 538.9 468.1 540.2 467.2L543.9 460.3L545.1 450.2L550.5 445.1L551.5 446.5L546.6 
                                450.7L545.6 460.6L542.2 467.9C544 469.1 545.8 470.2 547.7 471.3C553.7 474.8 560.2 477.8 565.8 481.7C566.4 
                                482.1 567 482.5 567.5 482.9C569.6 484.4 571.4 486.1 573.2 487.9L579.3 488.7C587.1 485.3 593.9 480.5 599.1 
                                474.6C602.3 471 604.9 467.1 606.8 462.9C608.3 456.4 609.1 449.8 609.2 443.2C609.2 436.4 608.6 429.4 607.9 
                                422.5Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
