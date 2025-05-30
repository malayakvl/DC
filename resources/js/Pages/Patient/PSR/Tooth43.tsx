import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSubDiagnosis,
  setToothDiagnoze,
  setNewToothActive,
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

export default function Tooth43() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth43Diagnozis = teethDiagnozis.tooth43;
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
            d="M902.8,1239.9c0,0-5,56-6,71s-7,66-11,75s-12,28-30,27s-26-16-26-34s3-62,5-81
                        s-1-75-3-87s-6-36-6-52c0-31,29-61,28-89s-26.2-45.3-27.1-78.2c-0.9-32.8,3.1-144.8,4.1-169.8s18-41,39-42s38,17,40,52s7,151,7,158
                        c0,29-22,50-24,73s23,38,23,94C915.8,1196.9,904.8,1220.9,902.8,1239.9z"
          />
        </g>
        <g
          id="T_43"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_43"
              style={{
                visibility:
                  !tooth43Diagnozis.implant &&
                  !tooth43Diagnozis.apex &&
                  !tooth43Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_43"
                className={`st9 change-color-psr-up ${tooth43Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M903.2,1178.7c-0.4,7.9-0.9,15.9-1.7,23.8c-2.4,22.8-6.7,45.4-9.7,68.2
                                c-1.5,11.6-2.7,23.2-3.6,34.8c-0.8,10.3-1.5,20.7-2.5,31c-1.5,15.4-3.6,30.7-8.3,45.5c-1.5,4.6-3.9,9.1-7.1,12.1
                                c3.2-3,5.6-7.5,7-12.1c4.8-14.8,6.9-30.2,8.3-45.5c1-10.3,1.7-20.7,2.5-31c1-11.6,2.1-23.2,3.6-34.8c2.7-21,6.7-41.8,9.1-62.8
                                c-3.2,6.2-6.7,12.2-10.8,17.9c-4,5.6-8.9,10.9-15.1,12.9c-1.5,0.5-3.1,0.8-4.7,0.9c-2.3,0.1-4.6-0.3-6.7-1.1
                                c-2.8-1-5.4-2.5-7.7-4.4c-7.3-5.7-12.3-13.6-16.2-21.9c-0.3-0.7-0.7-1.4-1-2.1v0c-1.5-9.8-3.5-19.5-3.5-29.4c0-8,1.3-16,4-23.6
                                l2-1.6c5.5-1.6,10.6-4.3,14.7-8c5.2-4.6,8.8-10.6,14-15.1c1.8-1.5,4-2.9,6.4-2.6c2.3,0.3,3.8,2.1,5.2,3.8
                                c3.5,4.1,7.2,7.9,10.6,12.1c4,4.9,7.3,10.2,10,15.7L903.2,1178.7z"
              />
            </g>
            <g
              id="dentin_n_43"
              style={{
                visibility:
                  !tooth43Diagnozis.implant &&
                  !tooth43Diagnozis.abutment &&
                  !tooth43Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_43"
                className={`st10 change-color-psr ${tooth43Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M900.9,1208c-2.4,21-6.4,41.8-9.1,62.8c-1.5,11.6-2.7,23.2-3.6,34.8
                                c-0.8,10.3-1.5,20.7-2.5,31c-1.5,15.4-3.6,30.7-8.4,45.5c-2.9,9.1-9.3,17.6-18.3,15.7c-8.2-1.7-10.1-10.7-10.7-18.9
                                c-0.5-6.2-1.2-12.4-2.1-18.7c-0.9-6.2-1.9-12.4-2.6-18.6c-1.7-14.7-1.6-29.5-1.8-44.3c-0.3-17-0.9-34-1.1-51
                                c-0.1-10.1-0.2-20.2-1.3-30.2c-0.2-2-0.5-3.9-0.8-5.9c0.3,0.7,0.7,1.4,1,2.1c4,8.3,9,16.3,16.2,21.9c2.4,1.8,5,3.4,7.7,4.3
                                c2.2,0.8,4.4,1.2,6.7,1.1c1.7-0.1,3.2-0.4,4.7-0.9c6.1-2.1,11-7.4,15.1-12.9C894.2,1220.2,897.7,1214.2,900.9,1208z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth43Diagnozis.channel_class} ${tooth43Diagnozis.channel_class} ${tooth43Diagnozis.pulpit ? 'pulpit' : ''} ${tooth43Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M883.9,1187.3c-0.3,1.6-0.9,3.2-1.4,4.8c-4.8,15.2-5.9,31-7.5,46.8c0,0,0,0,0,0
                                l-0.6,0.2c-0.6,0.2-1.1,0.3-1.7,0.4c-0.2,0-0.4,0.1-0.6,0.1c-0.2,0-0.4,0.1-0.6,0.1c-0.2,0-0.4,0.1-0.6,0.1c-0.2,0-0.4,0-0.6,0
                                c-0.5,0-1,0-1.5,0c-0.2,0-0.4,0-0.6,0c-0.1,0-0.2,0-0.3,0c-0.2,0-0.4-0.1-0.7-0.1c-0.2,0-0.5-0.1-0.8-0.1
                                c-0.2-0.1-0.5-0.1-0.7-0.2c-0.5-0.1-1-0.2-1.5-0.4c-0.2-0.1-0.5-0.2-0.7-0.2c0.1-16.2-0.6-32.3-1.9-48.4c-0.2-2.6-0.2-5.2,0.1-7.7
                                c0.3-2.7,0.8-5.3,2.5-7.5c1.2-1.7,3.1-3,4.4-4.4c2-2.1,3.7-4.7,6.8-4.3c2.7,0.4,3.8,2.7,4.9,4.9c0.6,1.3,1.5,2.6,2.2,4
                                C884.2,1179,884.7,1183.2,883.9,1187.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth43Diagnozis.channel_class} ${tooth43Diagnozis.channel_class} ${tooth43Diagnozis.pulpit ? 'pulpit' : ''} ${tooth43Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M860.8,1317.2c0.8,0.1,1.6,0.1,2.3,0.1c0.8,0,1.6-0.1,2.5-0.2
                                c0.1-1.3,0.2-2.6,0.4-3.8c0.5-5.7,1.2-11.3,1.8-17c2.1-18.1,5-36.1,6.9-54.2c0.1-1.1,0.2-2.2,0.3-3.4v0c0,0,0,0,0,0
                                c-1.5,0.5-3.1,0.8-4.7,0.9c-0.5,0-1,0-1.5,0c-0.1,0-0.3,0-0.4,0c-0.2,0-0.4,0-0.6-0.1c-0.2,0-0.5,0-0.7-0.1c-0.1,0-0.3,0-0.4-0.1
                                l-0.8-0.2c-0.3-0.1-0.6-0.1-0.9-0.2c-0.5-0.1-0.9-0.3-1.4-0.4c0,0,0,0,0,0c0,0.7,0,1.4,0,2.2c-0.1,12.9-0.7,25.9-1.2,38.8
                                c-0.5,11.2-0.9,22.3-1.3,33.5C860.9,1314.5,860.9,1315.9,860.8,1317.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth43Diagnozis.channel_class} ${tooth43Diagnozis.channel_class} ${tooth43Diagnozis.pulpit ? 'pulpit' : ''} ${tooth43Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M859.8,1396.1c1-16.7,2.2-33.3,3.4-49.9c0.7-9.7,1.5-19.3,2.4-29
                                 c-0.8,0.1-1.6,0.2-2.5,0.2c-0.8,0-1.5,0-2.3-0.1c0,0.4,0,0.8,0,1.2C860,1344.3,859.6,1370.2,859.8,1396.1z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth43Diagnozis.culttab &&
                !tooth43Diagnozis.abutment &&
                !tooth43Diagnozis.implant &&
                !tooth43Diagnozis.shaper &&
                !tooth43Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M915,1143.9l-3.7-7.6c-4.6-3.8-8.6-8.2-12-13.1c-1.8-2.6-3.6-5.5-5.5-8.1
                            c-4.3-5.8-9.1-10.6-16.1-10.3c-2.7,0.1-5.3,1.1-7.6,2.6c-5.3,3.5-8.8,9.1-13.5,13.3c-1.7,1.5-3.6,2.8-5.5,4.1
                            c-3.1,2-6.4,3.8-9.5,5.8c-3.8,2.5-7.3,5.4-10.5,8.6c-2.7,5.7-4.3,11.9-4.8,18.2c-0.6,8.1,0.8,16.2,2.6,24.1
                            c1.6,6.9,3.6,13.8,6.2,20.5v0c1.3,3.6,2.8,7.1,4.5,10.5c4,8.3,9,16.3,16.2,21.9c4.2,3.3,9.2,5.7,14.5,5.4
                            c8.5-0.4,14.8-6.9,19.8-13.8c4.3-6,8-12.3,11.3-18.9c1.3-2.7,2.6-5.3,3.8-8c3.4-7.7,6.5-15.5,8.4-23.8
                            C915.9,1165,916.4,1154.3,915,1143.9z"
            />
          </g>
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth43Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth43Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M915 1143.9L911.3 1136.3C906.7 1132.5 902.7 1128.1 899.3 1123.2C897.5 1120.6 895.7 1117.7 893.8 1115.1C889.5 1109.3 884.7 1104.5 877.7 1104.8C875 1104.9 872.4 1105.9 870.1 1107.4C864.8 1110.9 861.3 1116.5 856.6 1120.7C854.9 1122.2 853 1123.5 851.1 1124.8C848 1126.8 844.7 1128.6 841.6 1130.6C837.8 1133.1 834.3 1136 831.1 1139.2C828.4 1144.9 826.8 1151.1 826.3 1157.4C825.7 1165.5 827.1 1173.6 828.9 1181.5C830.5 1188.4 832.5 1195.3 835.1 1202C836.4 1205.6 837.9 1209.1 839.6 1212.5C843.6 1220.8 848.6 1228.8 855.8 1234.4C860 1237.7 865 1240.1 870.3 1239.8C878.8 1239.4 885.1 1232.9 890.1 1226C894.4 1220 898.1 1213.7 901.4 1207.1C902.7 1204.4 904 1201.8 905.2 1199.1C908.6 1191.4 911.7 1183.6 913.6 1175.3C915.9 1165 916.4 1154.3 915 1143.9Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
