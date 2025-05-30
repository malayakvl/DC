import React from 'react';
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

export default function Tooth11() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth11Diagnozis = teethDiagnozis.tooth11;
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
            d="M958,255.9c-0.3,1.2-0.6,2.3-0.9,3.4c-3.8,13.5-6,27.6-7.1,41.6
                        c-2,25-4,63-1,88s0.9,90.4-0.2,101.7c-1.8,17.3,8.2,36.3,10.2,50.3s-11.2,31.5-9.1,53.7c2.1,22.3,7.1,89.3,11.1,108.3s16,38,45,36
                        c21-1.4,32-23,35-41s9-92,8-104s-13-29-12-40s11-17,12-50s-3-71-6-91s-15-83-18-98c-5-24.9-12.1-50-20.1-74
                        c-4.2-12.6-17.2-22.4-30.5-14.7C964.4,232,960.9,245.1,958,255.9z"
          />
        </g>
        <g
          id="T_11"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_11"
              className="hRoot"
              style={{
                visibility:
                  !tooth11Diagnozis.implant &&
                  !tooth11Diagnozis.apex &&
                  !tooth11Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_11"
                className={`st10 change-color-psr-up ${tooth11Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1039.9,464.5c-0.6,9.1-1.5,18.2-2.8,27.3l-2.2,2.9l-2.7,1.2
                                c-17.7,0.4-35.4-0.1-53.1-1.4c-5.2-0.4-10.4-0.8-15.6-1.4l-2.5-1.6l-1.5-1.7c-3.1-13.9-4.9-28-5.5-42.3v0
                                c1.5-6.3,3.5-12.5,6.1-18.4c3.7-8.5,9-16.6,17.3-20.9c8.2-4.2,17.8-3.9,26.7-1.1c7,2.2,13.5,5.9,19,10.7
                                c7.5,6.5,13,14.8,16.9,23.8C1040.6,449.1,1040.4,456.8,1039.9,464.5z"
              />
            </g>
            <g
              id="dentin_n_11"
              className=""
              style={{
                visibility:
                  !tooth11Diagnozis.implant &&
                  !tooth11Diagnozis.abutment &&
                  !tooth11Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_11"
                className={`st10 change-color-psr ${tooth11Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1040.1,441.5c-3.9-9-9.5-17.3-16.9-23.8c-5.5-4.8-12-8.5-19-10.7
                                c-8.8-2.8-18.5-3.1-26.7,1.1c-8.3,4.3-13.6,12.4-17.3,20.9c-2.6,6-4.5,12.1-6.1,18.4c0-0.3,0-0.6,0-0.8c-0.3-9.8,0-19.5,0.1-29.3
                                c0.3-23.3-0.2-46.5-0.3-69.7c-0.1-15.9,0-31.7,1.3-47.4c0.7-7.9,1.6-15.8,3.5-23.5c1.9-7.9,4.7-15.5,6.9-23.3
                                c3-10.5,7.4-21.8,18.1-22c9.7-0.2,15.5,9,18.7,18.4c5.9,17.4,10,35.3,13.9,53.2c5,23,9.7,46.1,13,69.3c1.8,12.7,3.2,25.5,5.6,38.1
                                c1.5,7.9,3.5,15.8,4.5,23.8C1039.7,436.7,1039.9,439.1,1040.1,441.5z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth11Diagnozis.channel_class} ${tooth11Diagnozis.channel_class} ${tooth11Diagnozis.pulpit ? 'pulpit' : ''} ${tooth11Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1010.9,458.7l-2.2,2.3l-22.7,0l-1.8-2.1c-0.9-4.6-1.6-9.2-2.2-13.9
                                c-0.6-5.5-1-11-0.7-16.6c0.5-7.7,2.3-15.2,3.5-22.8c6.3-1.2,13-0.5,19.2,1.4c1,0.3,1.9,0.6,2.9,1c0.4,1.7,0.8,3.3,1.1,5
                                c1.8,7.4,3.9,14.8,4.6,22.4C1013.6,443.2,1012.9,451.1,1010.9,458.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth11Diagnozis.channel_class} ${tooth11Diagnozis.channel_class} ${tooth11Diagnozis.pulpit ? 'pulpit' : ''} ${tooth11Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1007,408c-1-0.4-1.9-0.7-2.9-1c-6.3-2-12.9-2.7-19.2-1.4c0.1-0.5,0.2-0.9,0.2-1.3
                                c3.2-20.4,1.4-40.9-0.1-61.4c-0.5-7-1-14-1.5-21.1c3-0.6,6.1-0.9,9.4-0.7c1,5.9,1.9,11.8,2.7,17.6
                                C999.2,361.8,1001.9,385.1,1007,408z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth11Diagnozis.channel_class} ${tooth11Diagnozis.channel_class} ${tooth11Diagnozis.pulpit ? 'pulpit' : ''} ${tooth11Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M993,321c-3.3-0.2-6.5,0.1-9.4,0.7c-0.9-13.5-1.8-27-3-40.5
                                c-1.4-15.6-3.1-31.2-5.1-46.8c0-0.1,0-0.2,0-0.3c0,0.1,0,0.2,0.1,0.2c4.2,17.2,8.1,34.5,11.4,51.9
                                C989.1,297.9,991.1,309.4,993,321z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth11Diagnozis.culttab &&
                !tooth11Diagnozis.abutment &&
                !tooth11Diagnozis.implant &&
                !tooth11Diagnozis.shaper &&
                !tooth11Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1047,466.5c-1.1-7.3-2.8-14.6-5.5-21.5c-0.2-0.6-0.5-1.3-0.7-1.9
                            c-3.9-9.7-9.7-18.5-17.6-25.4c-5.5-4.8-12-8.5-19-10.7c-8.8-2.8-18.5-3.1-26.7,1.1c-8.3,4.3-13.6,12.4-17.3,20.9
                            c-2.6,5.8-4.5,11.9-6,18.1c-1.6,6.6-2.7,13.4-3.6,20.2c-1.4,11.3-2.1,22.7-0.6,34c0.5,3.6,1.1,7.1,2,10.6c1.7,3.4,4.1,6.3,7,8.7
                            c2.3,1.9,4.8,3.4,7.6,4.4c3,0.3,5.9,0.5,8.9,0.8c7.5,0.6,15,1,22.6,1.3c10.3,0.4,20.6,0.5,30.9,0.4c4.3,0,8.6-0.2,12.9-0.3
                            l2.9-1.2c1-1.1,1.8-2.3,2.4-3.6c0.7-1.5,1.1-3.1,1.2-4.7c0.5-7.2,0.7-14.5,0.6-21.7C1049,486.2,1048.5,476.3,1047,466.5z"
            />
          </g>
          <g className="" style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth11Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth11Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1047 466.5C1045.9 459.2 1044.2 451.9 1041.5 445C1041.3 444.4 1041 443.7 1040.8 443.1C1036.9 433.4 1031.1 424.6 1023.2 417.7C1017.7 412.9 1011.2 409.2 1004.2 407C995.4 404.2 985.7 403.9 977.5 408.1C969.2 412.4 963.9 420.5 960.2 429C957.6 434.8 955.7 440.9 954.2 447.1C952.6 453.7 951.5 460.5 950.6 467.3C949.2 478.6 948.5 490 950 501.3C950.5 504.9 951.1 508.4 952 511.9C953.7 515.3 956.1 518.2 959 520.6C961.3 522.5 963.8 524 966.6 525C969.6 525.3 972.5 525.5 975.5 525.8C983 526.4 990.5 526.8 998.1 527.1C1008.4 527.5 1018.7 527.6 1029 527.5C1033.3 527.5 1037.6 527.3 1041.9 527.2L1044.8 526C1045.8 524.9 1046.6 523.7 1047.2 522.4C1047.9 520.9 1048.3 519.3 1048.4 517.7C1048.9 510.5 1049.1 503.2 1049 496C1049 486.2 1048.5 476.3 1047 466.5Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
