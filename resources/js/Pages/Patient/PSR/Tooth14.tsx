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

export default function Tooth14() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth14Diagnozis = teethDiagnozis.tooth14;
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
            d="M699,241.9c0,0-1,33-1,50s2,52,1,83s-4.1,72.1-4,83.6c0,11.4,6,34.4,10,50.4
                        c4,16-2,38-4,46s-7.1,25-6,50.5c1,25.5,0,107.5,20,122.5c9.8,7.4,24.6,11.3,36.5,6.8c17.9-6.8,18.8-28.9,20.5-44.9
                        c1.4-13.6,1.3-27.3,2-40.9c1-19,9-61,9-74c0-13-16-36-16-51c0-15,15-41,15-58s-2-41-4-58s-12-74-14-93s-5-59-7-69s-7-16-14-20
                        S700,211.9,699,241.9z"
          />
        </g>
        <g
          id="T_14"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_14"
              style={{
                visibility:
                  !tooth14Diagnozis.implant &&
                  !tooth14Diagnozis.apex &&
                  !tooth14Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_14"
                className={`st9 change-color-psr-up ${tooth14Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M769.8,443.2c-1,11.1-3.2,22-6.5,32.7l-25-5.6l-25,2.9
                                c-6-11.7-9.3-24.3-9.8-37.2c-0.2-5.9,0.1-11.7,0.4-17.6c1.1-3,2.4-5.9,4-8.7c4.7-7.9,12.1-13.9,21-16.4c2.3-0.6,4.7-1,7.1-1.2
                                c2.7-0.1,5.3,0.1,7.9,0.7c0.5,0.1,1,0.3,1.6,0.4c4.7,1.4,8.7,4.2,12.3,7.2c3.9,3.3,7.4,6.9,10.4,10.9c-0.3-1.9-0.7-3.8-1-5.6
                                c1.1,5.7,2.1,11.3,3.1,17C770.5,429.7,770.4,436.5,769.8,443.2z"
              />
            </g>
            <g
              id="dentin_n_14"
              style={{
                visibility:
                  !tooth14Diagnozis.implant &&
                  !tooth14Diagnozis.abutment &&
                  !tooth14Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_x5F_14_4_"
                className={`st10 change-color-psr ${tooth14Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M748.7,312.6c5.6,20.7,10.8,41.4,15.6,62.2c-2.9-22.4-5.3-44.8-7.2-67.2
                                c-1-11.5-1.8-23.1-3-34.6c-0.9-8.6-2.1-17.2-2.8-25.9c-0.4-4.6-0.8-9.4-4.2-12.8c-1.6-1.6-3.8-2.8-6.1-2.4
                                c-3.1,0.5-4.7,3.1-5.9,5.7c-1.2,2.7-2.2,5.5-2.7,8.4c-0.7,4.1-0.5,8.3,0.6,12.2C738.5,276.2,743.8,294.3,748.7,312.6z"
              />
              <path
                className={`st10 change-color-psr ${tooth14Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M768.2,411.4c-3-4-6.5-7.6-10.4-10.9c-3.7-3.1-7.7-5.8-12.3-7.2c-0.5-0.2-1-0.3-1.6-0.4
                                c-2.6-0.6-5.2-0.8-7.8-0.7c-2.5,0.1-4.8,0.5-7.1,1.2c-8.8,2.5-16.3,8.5-21,16.4c-1.6,2.8-2.9,5.7-4,8.7c0.1-2,0.2-3.9,0.3-5.9
                                c1-22.8-0.7-45.7-1.6-68.5c-1.2-30.8-1.1-61.7-1.2-92.5c0-8.7,1.7-17.9,7.7-20.8c0.8-0.4,1.7-0.7,2.7-0.8
                                c8.2-1.2,12.9,8.5,15.5,18c3.4,12.5,7.4,24.8,11.2,37.1c1.2,3.9,2.4,7.7,3.5,11.6c0.4,1.2,0.7,2.4,1.1,3.5
                                c6.3,21.7,11.5,43.7,16.1,65.8c2.8,13.2,5.4,26.5,7.9,39.7C767.5,407.7,767.8,409.6,768.2,411.4z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M745.7,434.3c0,3.8-0.1,7.6-0.5,11.4c-3.8-2.6-8.6-3.7-13.2-2.8
                                c-1.8,0.3-3.5,0.9-5.1,1.7c-0.4-1.8-0.6-3.5-0.6-5.3c0-2.5,0.3-5,0.6-7.5c0.3-3.3,0.4-6.6,0.6-9.9c0.2-2.5,0.4-5.1,0.6-7.6
                                c0.5-6.9,0.7-13.9,0.8-20.9c2.3-0.6,4.7-1,7.2-1.2c2.6-0.1,5.3,0.1,7.8,0.7c0.3,9,0.5,18.1,0.8,27.1c0,0.2,0.1,0.5,0.1,0.7
                                C745.3,425.2,745.6,429.7,745.7,434.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M743.9,392.9c-2.6-0.6-5.2-0.8-7.8-0.7c-2.5,0.1-4.9,0.5-7.2,1.2
                                c0.1-16.7-1-33.4-2.6-50.1c-0.9-9.8-2-19.6-3.2-29.4c1.7-0.6,3.6-1.2,5.5-1.6c2.3,12.4,4.4,24.8,6.2,37.2c0.2-3.3,0.4-6.6,0.5-9.9
                                c0.5-9.5,1.1-18.9,1.6-28.4c0.4,0,0.8,0,1.3,0c1.4,0,2.7,0.1,4,0.2c0.1,6.6,0.2,13.2,0.3,19.8c0.3,16.9,0.6,33.8,1.1,50.7
                                C743.7,385.5,743.8,389.2,743.9,392.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M723.1,313.9c1.7-0.6,3.6-1.2,5.5-1.6c-5.2-27.4-11.7-54.6-19.5-81.5C715,258.3,719.7,286,723.1,313.9z"
              />
              <path
                className={`st22 target part ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M742,296.7c0-2.8,0-5.5-0.1-8.3c-0.2-18.9-0.2-37.8-0.2-56.7v-1.9c0,0.6-0.1,1.3-0.1,1.9
                                c-0.9,15.4-1.8,30.8-2.7,46.2c-0.2,2.4-0.3,4.8-0.4,7.2c-0.5,8.7-1,17.4-1.5,26.1c0.4,0,0.8,0,1.3,0c1.4,0,2.7,0.1,4,0.2
                                C742.2,306.5,742.1,301.6,742,296.7z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth14Diagnozis.culttab &&
                !tooth14Diagnozis.abutment &&
                !tooth14Diagnozis.implant &&
                !tooth14Diagnozis.shaper &&
                !tooth14Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M781.2,450.5c-0.7-4.6-1.9-9.2-2.9-13.8c-0.7-3.4-1.3-6.8-2.3-10
                            c-0.8-2.8-1.9-5.4-3.2-7.9c-3.6-6.9-8.8-13-14.9-18.1c-3.7-3.1-7.7-5.8-12.3-7.2c-3-0.9-6.2-1.3-9.4-1.1
                            c-11.9,0.6-22.3,7.6-28.1,17.5c-2.3,3.9-3.8,8.1-5.3,12.4c-0.5,1.4-0.9,2.7-1.4,4.1c-2,5.9-4.3,11.7-5.4,17.8
                            c-1.3,7.1-1.1,14.3,0.6,21.3c1.8,4.9,4.1,9.5,6.9,13.9c3.8,6.1,8.6,11.6,12.8,17.3c0.4,0.5,0.8,1,1.1,1.5
                            c3.3,4.6,6.8,9.3,12.2,11.7c4.8,2.2,10.5,2,15.3-0.1c6.5-2.9,10.6-8.9,15.8-13.6c0.2-0.2,0.4-0.4,0.7-0.6
                            c5.1-4.5,11.1-8,15.1-13.4c2.3-3.1,3.9-6.7,4.5-10.5C782.1,464.5,782.2,457.4,781.2,450.5z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth14Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth14Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth14Diagnozis.vinir_color}`}
                d="M781.2 450.5C780.5 445.9 779.3 441.3 778.3 436.7C777.6 433.3 777 429.9 776 426.7C775.2 423.9 774.1 
                                421.3 772.8 418.8C769.2 411.9 764 405.8 757.9 400.7C754.2 397.6 750.2 394.9 745.6 393.5C742.6 392.6 
                                739.4 392.2 736.2 392.4C724.3 393 713.9 400 708.1 409.9C705.8 413.8 704.3 418 702.8 422.3C702.3 423.7 
                                701.9 425 701.4 426.4C699.4 432.3 697.1 438.1 696 444.2C694.7 451.3 694.9 458.5 696.6 465.5C698.4 
                                470.4 700.7 475 703.5 479.4C707.3 485.5 712.1 491 716.3 496.7C716.7 497.2 717.1 497.7 717.4 498.2C720.7 
                                502.8 724.2 507.5 729.6 509.9C734.4 512.1 740.1 511.9 744.9 509.8C751.4 506.9 755.5 500.9 760.7 
                                496.2C760.9 496 761.1 495.8 761.4 495.6C766.5 491.1 772.5 487.6 776.5 482.2C778.8 479.1 780.4 475.5 
                                781 471.7C782.1 464.5 782.2 457.4 781.2 450.5Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
