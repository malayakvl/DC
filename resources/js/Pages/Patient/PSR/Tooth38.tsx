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

export default function Tooth38() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth38Diagnozis = teethDiagnozis.tooth38;
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
            d="M1899,1187.9c0,0-4-45-3-65s0-43,0-49s-13-41-14-56c-1-15,14-36,16-69
                        s-6.2-115.7-16-137c-11-24-36-32-60-28s-48,9-55,58s-2,88,0,98s1,17,4,30s19,32,17,45c-2,13-20,42-20,64c0,12,2.4,24,5.4,33.9
                        c2.5,8.2,5.4,15,7.6,19.1c5,9,24.7,46.2,30,54c11,16,23,28,39,35c15.1,6.6,26,10,37,5C1902.9,1218.7,1900,1203.9,1899,1187.9z"
          />
        </g>
        <g
          id="T_48"
          className="common-view"
          style={{
            visibility: tooth38Diagnozis.absent ? 'hidden' : 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          <g className="dentin">
            <g
              id="dentin_v_38"
              className=" hImplant hEmpty"
              style={{
                visibility:
                  !tooth38Diagnozis.implant &&
                  !tooth38Diagnozis.apex &&
                  !tooth38Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_38"
                className={`st9 change-color-psr-up ${tooth38Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1892,1087.7c-5,10.9-12.8,20.3-22.5,27.3c-2.3,1.6-4.6,3.1-7.1,4.5
                                c-9.6,5.4-20.3,8.6-31.2,10.5c-2.1,0.4-4.3,0.7-6.4,0.9c-12.4,1.5-24.9,1.2-37.2-0.8c-0.6-0.4-1.2-0.9-1.7-1.4c0,0,0,0,0,0
                                c-1.4-1.4-2.8-2.8-4.3-4.3c-1.3-8.2-2.6-18.8-3.1-27.1c-0.4-7.5-0.5-15.1-0.3-22.6c8.6,1.3,17.3,2.2,26,2.8
                                c8.7,0.6,17.4,0.8,26,0.6c6.4-3.5,12.6-7.4,18.4-11.7c5.7-4.2,11.1-8.8,16.1-13.8c5.3,4.3,10.3,9,14.8,14
                                c4.6,5.1,8.7,10.5,12.4,16.2C1892,1084.5,1892,1086.1,1892,1087.7z"
              />
            </g>
            <g
              id="dentin_n_38"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth38Diagnozis.culttab &&
                  !tooth38Diagnozis.abutment &&
                  !tooth38Diagnozis.implant &&
                  !tooth38Diagnozis.shaper &&
                  !tooth38Diagnozis.apex
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_38"
                className={`st10 change-color-psr ${tooth38Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1890.7,1173.1c-0.6,12.8-1.9,26.4-12,35.2c-2.2,1.9-5.1,3.4-7.8,2.3
                                c-1.8-0.7-2.7-2.4-3.3-4.1c-1.8-5.8,0.5-11.7,0.9-17.7c0.4-6.8-1.8-13.5-3.3-20.2c-1.3-5.6-2.3-11.4-6-16
                                c-1.9-2.4-4.8-4.2-7.7-3.2c-3.4,1.2-3.9,5.1-3.6,8.7c0.6,6,2,11.8,4.1,17.5c2.8,7.5,7,14.6,10.9,21.7c1.5,2.7,3,5.5,2.8,8.6
                                c0,0.5-0.1,1-0.3,1.5c0,0.1,0,0.2-0.1,0.2c-0.4,1.2-1.1,2.2-2.2,3c-2.5,1.7-5.3,1.2-8.1,0.7c-2.9-0.5-6.1-0.9-9-1.9
                                c-4-1.4-7.8-3.7-11.3-6.3c-4.1-3-7.9-6.2-11.3-9.8c-6.8-7.2-11.4-15.9-15.1-24.8c-2.4-6-4.5-12.1-7.2-18c-3.9-8.6-9-15-15.3-21.6
                                c0.6,0.5,1.1,1,1.8,1.4c12.3,2,24.8,2.3,37.2,0.8c2.2-0.3,4.3-0.6,6.4-0.9c10.9-1.9,21.6-5.1,31.2-10.5c2.4-1.3,4.8-2.8,7.1-4.5
                                c9.8-7,17.5-16.4,22.5-27.3C1892.4,1116.2,1892,1144.7,1890.7,1173.1z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g
              className="hEmpty  hImplant pulpitis-pfilling"
              style={{ visibility: 'inherit' }}
            >
              <path
                className={`st22 target top ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.pulpit ? 'pulpit' : ''} ${tooth38Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1862.4,1119.5c-0.6,0.3-1.2,0.6-1.8,1c-0.4,0.2-0.9,0.5-1.4,0.7
                                c-0.3,0.2-0.6,0.3-0.9,0.5c-0.5,0.2-1,0.5-1.5,0.7c-0.5,0.2-1,0.5-1.5,0.7c-0.2,0.1-0.3,0.1-0.5,0.2c-0.6,0.2-1.1,0.5-1.7,0.7
                                c-1.5,0.6-3.1,1.2-4.6,1.7c-0.6,0.2-1.1,0.4-1.7,0.6c-0.4,0.1-0.7,0.2-1.1,0.3c-0.7,0.2-1.3,0.4-2,0.6c-0.6,0.2-1.2,0.3-1.8,0.5
                                c-1.5,0.4-3.1,0.8-4.7,1.1c-0.6,0.1-1.2,0.3-1.8,0.4c-0.1,0-0.3,0-0.4,0.1c-0.6,0.1-1.2,0.2-1.8,0.3c-0.7,0.1-1.4,0.2-2.1,0.4
                                c-0.9,0.2-1.8,0.3-2.8,0.4c-0.1,0-0.3,0.1-0.5,0.1c-0.7,0.1-1.4,0.2-2.1,0.3c-0.4,0.1-0.8,0.1-1.2,0.2c-0.2-0.7-0.4-1.3-0.6-1.9
                                c-1.3-4-3.1-7.8-4.5-11.8c-1.3-3.7-2.1-7.4-2.6-11.3c5.9,2.8,13.9,3.2,21.6,0.8c7-2.1,13.1-6.3,16.9-11.7
                                c1.8,4.1,3.1,8.4,4.1,12.7C1860.6,1111.7,1861.2,1115.7,1862.4,1119.5z"
              />
            </g>
            <g className="pulpitis-pfilling" style={{ visibility: 'inherit' }}>
              <path
                className={`st22 target top ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.pulpit ? 'pulpit' : ''} ${tooth38Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1881.1,1154.1c-0.9,0.4-1.8,0.7-2.7,1.1c-2.5-7.6-6.8-14.4-13.9-19.1
                                c-4.4-2.9-9.4-4.7-15.2-3.4c-8.2,1.8-13.2,8.7-15,15.7c-1.4,5.3-1.8,10.7-1.2,15.9c-1.3,0-2.6-0.1-3.8-0.1
                                c-2-11-1.5-22.5-4.5-33.2c0.4-0.1,0.8-0.1,1.2-0.2c0.7-0.1,1.4-0.2,2-0.3c0.2,0,0.3,0,0.5-0.1c0.9-0.1,1.8-0.3,2.8-0.4
                                c0.7-0.1,1.4-0.2,2.1-0.4c0.6-0.1,1.2-0.2,1.8-0.3c0.1,0,0.3-0.1,0.4-0.1c0.6-0.1,1.2-0.3,1.8-0.4c1.6-0.3,3.1-0.7,4.7-1.1
                                c0.6-0.2,1.2-0.3,1.8-0.5c0.7-0.2,1.4-0.4,2-0.6c0.4-0.1,0.7-0.2,1.1-0.3c0.6-0.2,1.2-0.4,1.7-0.6c1.6-0.5,3.1-1.1,4.6-1.7
                                c0.6-0.2,1.2-0.5,1.7-0.7c0.2-0.1,0.3-0.2,0.5-0.2c0.5-0.2,1-0.5,1.6-0.7c0.5-0.2,1-0.5,1.5-0.7c0.3-0.1,0.6-0.3,0.9-0.4
                                c0.5-0.2,0.9-0.4,1.4-0.7c0.6-0.3,1.2-0.6,1.8-1c0.1,0.4,0.3,0.8,0.4,1.3c3.1,8.3,9.7,15,14,22.9
                                C1878.7,1147,1880.1,1150.5,1881.1,1154.1z"
              />
            </g>
            <g className="pulpitis-pfilling">
              <path
                className={`st22 target top ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.pulpit ? 'pulpit' : ''} ${tooth38Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1837.4,1179.4c-2.2-4.8-3.7-9.9-4.3-15.1c-1.3,0-2.6-0.1-3.8-0.1c0.2,0.9,0.4,1.8,0.6,2.8
                                c1.9,8.5,5.6,16.5,11.3,23.5c6.1,7.4,14.4,13.2,24.3,17.1c0.8,0.3,1.6,0.6,2.4,0.9c-0.8-0.4-1.6-0.8-2.3-1.1
                                C1852.7,1200.9,1842.9,1191.2,1837.4,1179.4z"
              />
              <path
                className={`st22 target top ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.channel_class} ${tooth38Diagnozis.pulpit ? 'pulpit' : ''} ${tooth38Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1881.1,1154.1c-0.9,0.4-1.8,0.7-2.7,1.1c1.1,3.5,1.8,7.1,2.2,10.7c1.6,14.4-1.2,29.4-8.1,43.3
                                c5.6-10,9-20.5,10.2-31C1883.7,1170.1,1883.3,1161.9,1881.1,1154.1z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth38Diagnozis.culttab &&
                !tooth38Diagnozis.abutment &&
                !tooth38Diagnozis.implant &&
                !tooth38Diagnozis.shaper &&
                !tooth38Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1894.3,1065.5c-1.2-5.2-3.6-10-6.5-14.5c-5.4-8.4-12.4-15.6-20.5-21.4l-8.4,1.1
                            c-0.9,3.4-2.9,6.4-5.7,8.6c-0.9,0.7-1.9,1.4-3,1.9c-7.2,3.9-16.8,4.8-19.6,12.8c-1.1,3.1-0.6,6.4-0.1,9.6
                            c0.6,3.6,1.2,7.3,1.8,10.9l-1.9,0c-0.5-4-1.6-8-3.1-11.8c-0.7-1.8-1.5-3.5-2.8-4.9c-3-3.2-7.6-3.8-11.9-3.5
                            c-10,0.7-19.9,5.5-29.7,2.8c0,0-0.1,0-0.1,0c-2.3-0.6-4.5-1.7-6.4-3.1l-3.7,1.1c-1.2,3.8-2.2,7.7-3,11.6c-1.8,9-2.5,18.1-1.4,27.2
                            c1.3,10.5,4.9,20.7,11.7,28.9c1.2,1.5,2.5,2.9,3.9,4.2l0,0c1.1,1,2.2,2,3.4,2.9c14.5,2.4,29.2,2.3,43.7-0.1
                            c13.7-2.3,27-6.9,38.3-15c10-7.2,17.9-16.9,22.9-28.2c0.6-1.3,1.1-2.7,1.5-4l0,0C1895.5,1077.2,1895.7,1071.2,1894.3,1065.5z"
            />
          </g>
          <g className="" style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth38Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth38Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth38Diagnozis.vinir_color}`}
                d="M1894.3 1065.5C1893.1 1060.3 1890.7 1055.5 1887.8 1051C1882.4 1042.6 1875.4 1035.4 1867.3 1029.6L1858.9 1030.7C1858 1034.1 1856 1037.1 1853.2 1039.3C1852.3 1040 1851.3 1040.7 1850.2 1041.2C1843 1045.1 1833.4 1046 1830.6 1054C1829.5 1057.1 1830 1060.4 1830.5 1063.6C1831.1 1067.2 1831.7 1070.9 1832.3 
                                1074.5H1830.4C1829.9 1070.5 1828.8 1066.5 1827.3 1062.7C1826.6 1060.9 1825.8 1059.2 1824.5 1057.8C1821.5 1054.6 1816.9 1054 1812.6 1054.3C1802.6 1055 1792.7 1059.8 1782.9 1057.1H1782.8C1780.5 1056.5 1778.3 1055.4 1776.4 1054L1772.7 1055.1C1771.5 1058.9 1770.5 1062.8 1769.7 1066.7C1767.9 1075.7 1767.2 1084.8 1768.3 1093.9C1769.6 1104.4 1773.2 1114.6 1780 1122.8C1781.2 1124.3 1782.5 1125.7 1783.9 1127C1785 1128 1786.1 1129 1787.3 1129.9C1801.8 1132.3 1816.5 1132.2 1831 
                                1129.8C1844.7 1127.5 1858 1122.9 1869.3 1114.8C1879.3 1107.6 1887.2 1097.9 1892.2 1086.6C1892.8 1085.3 1893.3 1083.9 1893.7 1082.6C1895.5 1077.2 1895.7 1071.2 1894.3 1065.5Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
