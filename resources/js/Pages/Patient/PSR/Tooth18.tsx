import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNewToothActive,
  setSubDiagnosis,
  setToothDiagnoze,
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

export default function Tooth18() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth18Diagnozis = teethDiagnozis.tooth18;
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
      <g id="18" className={`tooth-number-active`}>
        <text
          transform="matrix(1 0 0 1 247 717)"
          className={`st3 st4 st5 ${toothActive.tooth18.active ? 'num-active' : ''}`}
        >
          18
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
            d="M279.6,235.5c-5-0.4-10.5,1.6-14.1,5c-8.6,8.1-5.5,21-6.4,31.4
                    c-1.8,20.4-16.5,41.4-27.1,58c-10.5,16.3-17.8,37.3-17.5,57.4c0.6,35,12,65.7,18.4,90.5c6.4,24.8-6.4,64.9-10.7,85.7
                    c-8.9,44-10.8,95.8,6.5,137.8c2.1,5.1,4.5,10.1,7.5,14.7c5.2,8,12.5,15,21.5,18.2c10.4,3.8,22.2,2.3,32.5-1.8
                    c13.3-5.2,21.9-15.2,27-28.5c8-20.7,6.1-41.8,7.1-63.8c1-23.3,3.8-48.9-0.4-71.9c-2.3-12.4-4.1-24.8-8.2-36.8
                    c-2.3-6.8-5.1-13.3-8-19.8c-1.9-4.4-3.7-9-4.2-13.8c-0.8-7.8,1.1-15.6,3.6-23c1.3-3.7,2.7-7.3,4.1-11c1.1-2.7,1.8-5.7,2.8-8.5
                    c4.2-12.4,7.3-20.9,10.8-33.6c1.6-5.8,2.2-15.7,3.3-21.6c4.5-24.4-5.8-72.1-8.3-86.7C317.4,298.9,315.6,238.5,279.6,235.5z"
          ></path>
        </g>
        <g
          id="T_18"
          className="common-view"
          style={{
            visibility: tooth18Diagnozis.absent ? 'hidden' : 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_18"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth18Diagnozis.implant &&
                  !tooth18Diagnozis.apex &&
                  !tooth18Diagnozis.shaper &&
                  !tooth18Diagnozis.apex
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color-psr-up ${tooth18Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M236.8,341l0.2,0c0,0,0.2-0.1,0.4-0.2c3.5-1.7,7.3-2.5,11.2-2.9c6.3-0.7,12.7-0.3,19,0.7
                                c3.8,0.6,7.6,1.4,11.4,2.3c2,0.5,4,1,6,1.6c6.8,1.9,13.4,4.4,19.6,7.9c8.2,4.6,15.3,11,20.8,18.6c0,0,0,0,0,0
                                c0.1,0.4,0.2,0.8,0.3,1.2c-0.2,10.3-3.9,25.6-6.2,32.8c-1.1,3.4-2.3,6.9-3.5,10.3c-1.2,3.4-2.5,6.8-3.8,10.2
                                c-2.4-2.7-5.1-5.1-8-7.3c-4.1-3.1-8.6-5.7-13.5-7.7c-3,0.5-5.8,1.6-8.1,3.3c-1.3,1-2.5,2.1-3.5,3.3c-4.5-2.4-8.8-5-13-7.7
                                c-4-2.6-8.1-5.5-13-5.6c-3.7-0.1-7.1,1.4-10.4,3c-3.5,1.7-6.9,3.4-10.4,5.1c-1.5-7.8-2.7-15.6-3.4-23.5
                                c-0.8-7.7-1.1-15.4-1.1-23.1c2.9-7.3,5.8-14.5,8.8-21.7C236.6,341.3,236.7,341.1,236.8,341"
              />
            </g>
            <g
              id="dentin_n_18"
              style={{
                visibility:
                  !tooth18Diagnozis.implant &&
                  !tooth18Diagnozis.abutment &&
                  !tooth18Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color-psr ${tooth18Diagnozis?.change_color ? 'diagnoze' : ''}`}
                d="M325.4,368.9C325.4,368.9,325.4,368.9,325.4,368.9c-5.5-7.6-12.6-14-20.8-18.6c-6.2-3.5-12.8-5.9-19.6-7.9
                                c-2-0.6-4-1.1-6-1.6c-3.8-0.9-7.6-1.7-11.4-2.3c-6.3-1-12.6-1.4-19-0.7c-4,0.4-8,1.3-11.5,3.1c0.4-1,0.9-2.1,1.3-3.1
                                c8.7-21,17.8-41.8,26-62.9c1.2-3.2,2.5-6.6,1.4-9.8c-0.9-3-3.7-5.4-4.5-8.4c-0.5-2.2,0-4.4,1.3-6.2c1.6-2.4,4.2-4,7-4.9
                                c1.6-0.5,3.2-0.7,4.8-0.8c0.5,0,0.9,0,1.3,0c2.1,0.1,4.2,0.4,6.1,1.1c7,2.4,12.1,7.7,15.8,13.7c7.1,11.5,9.2,24.8,11.2,37.9
                                c1.2,8.4,2.5,16.9,3.9,25.3c1.2,6.9,9.5,33.9,13,46.7C325.6,369.2,325.5,369.1,325.4,368.9z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g className="hEmpty hRoot hImplant pulpitis-pfilling">
              <path
                className={`st22 target top ${tooth18Diagnozis.channel_class} ${tooth18Diagnozis.channel_class} ${tooth18Diagnozis.pulpit ? 'pulpit' : ''} ${tooth18Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M292.2,387c-4.1-5.4-10.3-9.2-17.4-10.5c-6.3-1.2-12.9-0.3-18.6,2.4
                            c3.5-15.7,11.8-42.5,11.1-40.4c3.8,0.6,7.6,1.4,11.4,2.3c2,0.5,4,1,6,1.6C285.3,357.5,287.8,372.5,292.2,387z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth18Diagnozis.channel_class} ${tooth18Diagnozis.channel_class} ${tooth18Diagnozis.pulpit ? 'pulpit' : ''} ${tooth18Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M284.7,343c-2-0.6-4-1.1-6-1.6c-3.8-0.9-7.6-1.7-11.4-2.3c0.7-2,1.4-4.1,2.1-6.1
                            c4.4-12.7,9.3-25.8,11.3-38.7c1.9,0.4,3.8,0.8,5.7,1.3c0.1,11.6-1.4,23.5-1.7,35.3C284.5,334.9,284.6,339,284.7,343z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth18Diagnozis.channel_class} ${tooth18Diagnozis.channel_class} ${tooth18Diagnozis.pulpit ? 'pulpit' : ''} ${tooth18Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M280.6,294.3c1.5-10,1.2-19.9-2.5-29.6c-2.4-6.2-6.1-11.9-10.9-16.8
                            c6,5.4,10.6,11.9,13.8,19c4,9.2,5.3,18.9,5.4,28.7C284.5,295.1,282.5,294.6,280.6,294.3z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth18Diagnozis.culttab &&
                !tooth18Diagnozis.abutment &&
                !tooth18Diagnozis.implant &&
                !tooth18Diagnozis.shaper &&
                !tooth18Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M326.9,375.3c-0.2-1.7-0.5-3.4-0.8-5.1c-5.7-8.2-13.1-14.9-21.8-19.8c-8-4.5-16.7-7.3-25.6-9.5
                            c-10-2.4-20.2-4.1-30.4-3c-5.2,0.6-10.4,1.9-14.7,5.1c-2.3,1.7-4.2,3.9-5.6,6.4c-1.9,3.2-3.6,6.5-5.1,10c-1.7,3.8-3,7.7-4.1,11.7
                            c-1.7,6-2.6,12.3-2.9,18.5c-0.3,6.2,0.5,12.3,2.2,18.2c1.6,5.5,4,10.7,7.2,15.5l4.8,0l5.1-3.7c-1.5-2.3-2.8-4.8-4-7.3
                            c-2.1-4.4-3.6-9.1-4.5-14c-0.3-1.9-0.6-3.7-0.8-5.6l1.9-0.7c-0.5,3-0.5,6,0.1,9c0.4,2,1.1,4,2.1,5.8l5.7,11.9l1.1,2.4l5.5,8.5
                            l7.9,0.4c3-2.5,6.6-4.1,10.4-4.8c3.2-0.6,6.6-0.5,9.6-1.6c2.5-0.9,4.7-2.7,6.2-4.9c0.5,1.9,1.4,3.8,2.7,5.3
                            c4.7,5.7,12.7,6.7,18.8,10.8c0.7,0.5,1.4,1,2,1.5c2,1.7,3.6,3.7,4.8,6.1l4.2,1c3.3-2.1,6.2-4.8,8.7-7.8c2.8-3.4,5-7.2,6.6-11.4
                            c1.5-5.9,2.5-12,3.2-18.1C328.4,395.7,328.3,385.4,326.9,375.3z"
            />
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth18Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth18Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth18Diagnozis.vinir_color}`}
                d="M326.9 375.3C326.7 373.6 326.4 371.9 326.1 370.2C320.4 362 313 355.3 304.3 350.4C296.3 345.9
                                287.6 343.1 278.7 340.9C268.7 338.5 258.5 336.8 248.3 337.9C243.1 338.5 237.9 339.8 233.6 343C231.3
                                344.7 229.4 346.9 228 349.4C226.1 352.6 224.4 355.9 222.9 359.4C221.2 363.2 219.9 367.1 218.8
                                371.1C217.1 377.1 216.2 383.4 215.9 389.6C215.6 395.8 216.4 401.9 218.1 407.8C219.7 413.3 222.1
                                418.5 225.3 423.3H230.1L235.2 419.6C233.7 417.3 232.4 414.8 231.2 412.3C229.1 407.9 227.6 403.2 226.7
                                398.3C226.4 396.4 226.1 394.6 225.9 392.7L227.8 392C227.3 395 227.3 398 227.9 401C228.3 403 229 405
                                230 406.8L235.7 418.7L236.8 421.1L242.3 429.6L250.2 430C253.2 427.5 256.8 425.9 260.6 425.2C263.8
                                424.6 267.2 424.7 270.2 423.6C272.7 422.7 274.9 420.9 276.4 418.7C276.9 420.6 277.8 422.5 279.1
                                424C283.8 429.7 291.8 430.7 297.9 434.8C298.6 435.3 299.3 435.8 299.9 436.3C301.9 438 303.5
                                440 304.7 442.4L308.9 443.4C312.2 441.3 315.1 438.6 317.6 435.6C320.4 432.2 322.6 428.4 324.2
                                424.2C325.7 418.3 326.7 412.2 327.4 406.1C328.4 395.7 328.3 385.4 326.9 375.3Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
