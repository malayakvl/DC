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

export default function Tooth28() {
  const dispatch = useDispatch<any>();
  const toothActive = useSelector(getStatusesSelector);
  const allTeeth = useSelector(allTeethSelector);
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth28Diagnozis = teethDiagnozis.tooth28;
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
            d="M1820.5,233.5c5-0.4,10.5,1.6,14.1,5c8.6,8.1,5.5,21,6.4,31.4
                        c1.8,20.4,12.5,37.4,23.1,54c10.5,16.3,18.8,43.3,18.5,63.4c-0.6,35-9,63.7-15.4,88.5c-6.4,24.8,2.4,64.9,6.7,85.7
                        c8.9,44,14.8,95.8-2.5,137.8c-2.1,5.1-4.5,10.1-7.5,14.7c-5.2,8-12.5,15-21.5,18.2c-10.4,3.8-22.2,2.3-32.5-1.8
                        c-13.3-5.2-21.9-15.2-27-28.5c-8-20.7-8.1-41.8-9.1-63.8c-1-23.3-2.8-48.9,1.4-71.9c2.3-12.4,23.9-48.5,21.3-70.4
                        c-3.7-31.9-19.8-61.4-23.3-74.1c-1.6-5.8-2.2-17.7-3.3-23.6c-4.5-24.4,7.8-72.1,10.3-86.7C1782.7,296.9,1784.5,236.5,1820.5,233.5z"
          />
        </g>
        <g
          id="T_28"
          className="common-view"
          style={{
            visibility: tooth28Diagnozis.absent ? 'hidden' : 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_28"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth28Diagnozis.implant &&
                  !tooth28Diagnozis.apex &&
                  !tooth28Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color-psr-up ${tooth28Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1828.7,245.5c-4-1.2-8.3-1-12.3,0.3c-7,2.3-12.1,7.7-15.8,13.7
                                c-7.1,11.5-9.2,24.8-11.2,37.9c-1.2,8.4-2.4,16.9-3.9,25.3c-1.2,7-2.6,10-4.1,17c-2.7,12.5-5.6,18.3-8.9,30.8
                                c1.8,7.3,3.7,25.3,6.1,32.5c1.1,3.4,2.3,6.9,3.5,10.3c1.2,3.4,2.5,6.8,3.8,10.2c2.4-2.7,5.1-5.1,8-7.3c4.1-3.1,8.6-5.7,13.5-7.7
                                c3,0.5,5.8,1.6,8.2,3.3c1.3,1,2.5,2.1,3.5,3.3c4.5-2.4,8.8-5,13-7.7c4-2.6,8.1-5.5,13-5.6c3.7-0.1,7.1,1.4,10.4,3
                                c3.5,1.6,6.9,3.3,10.4,5.1c1.5-7.8,2.7-15.6,3.4-23.5c0.7-7.7,1.1-15.4,1.1-23.1c-3.4-8.5-6.8-16.9-10.3-25.3
                                c-8.7-21-17.8-41.8-26-62.9c-1.2-3.2-2.5-6.6-1.4-9.8c0.9-3,3.7-5.4,4.5-8.4c0.5-2.1,0-4.4-1.3-6.3
                                C1834.1,248,1831.6,246.4,1828.7,245.5z"
              />
            </g>
            <g
              id="dentin_n_28"
              style={{
                visibility:
                  !tooth28Diagnozis.implant &&
                  !tooth28Diagnozis.abutment &&
                  !tooth28Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color-psr ${tooth28Diagnozis?.change_color ? 'diagnoze' : ''}`}
                d="M1861.2,341c-3.5-1.8-7.5-2.7-11.5-3.1c-6.4-0.7-12.7-0.3-19,0.7c-3.8,0.6-7.6,1.4-11.4,2.3c-2,0.5-4,1-6,1.6
                                c-6.8,1.9-13.4,4.4-19.6,7.9c-8.2,4.6-15.2,10.9-20.8,18.5c3.2-11.3,5.9-17.1,8.5-29.1c1.5-7,2.9-10,4.1-17
                                c1.5-8.4,2.7-16.9,3.9-25.3c1.9-13.1,4.1-26.4,11.2-37.9c3.7-6,8.8-11.3,15.8-13.7c4-1.3,8.3-1.5,12.3-0.3
                                c2.9,0.9,5.5,2.5,7.1,4.9c1.3,1.9,1.8,4.1,1.3,6.2c-0.7,3.1-3.5,5.4-4.5,8.4c-1,3.3,0.2,6.6,1.4,9.8c8.2,21.1,17.3,42,26,62.9
                                C1860.3,338.9,1860.7,339.9,1861.2,341z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g className="hEmpty hRoot hImplant pulpitis-pfilling">
              <path
                className={`st22 target top ${tooth28Diagnozis.channel_class} ${tooth28Diagnozis.channel_class} ${tooth28Diagnozis.pulpit ? 'pulpit' : ''} ${tooth28Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1841.8,379c-5.7-2.8-12.3-3.6-18.6-2.4c-7.1,1.3-13.3,5.1-17.4,10.5
                                c4.4-14.5,6.9-29.5,7.5-44.5c0,0,0,0,0,0l0,0c0,0,0.1,0,0.1,0c2-0.6,3.9-1.1,5.9-1.6c3.8-0.9,7.5-1.7,11.4-2.3
                                C1835.1,351.9,1838.8,365.3,1841.8,379z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth28Diagnozis.channel_class} ${tooth28Diagnozis.channel_class} ${tooth28Diagnozis.pulpit ? 'pulpit' : ''} ${tooth28Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1830.8,338.5c-3.8,0.6-7.6,1.4-11.4,2.3c-2,0.5-4,1-6,1.6v-0.1c0.2-4,0.2-8,0.1-12
                                c-0.4-11.6-1.8-23.4-1.7-35c1.1-0.1,2.2-0.2,3.5-0.3c0.8,0,1.7-0.1,2.5-0.1c2.1,12.5,6.8,25.2,11.1,37.5
                                C1829.4,334.4,1830.1,336.4,1830.8,338.5C1830.8,338.5,1830.8,338.5,1830.8,338.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth28Diagnozis.channel_class} ${tooth28Diagnozis.channel_class} ${tooth28Diagnozis.pulpit ? 'pulpit' : ''} ${tooth28Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1819.9,264c-3.9,10.1-4,20.5-2.3,30.9c-0.8,0-1.6,0.1-2.5,0.1
                                c-1.2,0.1-2.4,0.2-3.5,0.3c0.1-9.9,1.3-19.7,5.4-29c3.1-7.1,7.8-13.6,13.8-19.1C1826,252.1,1822.3,257.8,1819.9,264z"
              />
            </g>
          </g>
          <g
            className="toutline hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth28Diagnozis.culttab &&
                !tooth28Diagnozis.abutment &&
                !tooth28Diagnozis.implant &&
                !tooth28Diagnozis.shaper &&
                !tooth28Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1882.1,389.5c-0.3-6.3-1.3-12.5-2.9-18.5c-1.1-4-2.5-7.9-4.1-11.7
                            c-1.5-3.4-3.2-6.8-5.1-10c-1.4-2.5-3.3-4.7-5.6-6.4c-4.2-3.2-9.4-4.5-14.7-5.1c-10.2-1.1-20.4,0.6-30.4,3
                            c-8.9,2.2-17.7,5-25.6,9.5c-8.6,4.9-16.1,11.7-21.8,19.8c-0.3,1.7-0.6,3.4-0.8,5.1c-1.4,10.1-1.5,20.4-0.5,30.6
                            c0.6,6.1,1.7,12.1,3.2,18.1c1.5,4.1,3.8,8,6.6,11.4c2.5,3,5.4,5.6,8.7,7.8l4.2-1c1.2-2.3,2.8-4.4,4.8-6.1c0.6-0.6,1.3-1.1,2-1.5
                            c6-4.1,14.1-5.1,18.8-10.8c1.3-1.5,2.2-3.4,2.7-5.3c1.5,2.2,3.6,4,6.2,4.9c3.1,1.1,6.4,1,9.6,1.6c3.8,0.7,7.4,2.4,10.4,4.8
                            l7.9-0.4l5.5-8.5l1.1-2.4l5.7-11.9c0.9-1.8,1.6-3.8,2.1-5.8c0.6-3,0.7-6,0.1-9l1.9,0.7c-0.1,1.9-0.4,3.8-0.8,5.6
                            c-0.9,4.8-2.4,9.5-4.5,14c-1.2,2.5-2.5,5-4,7.3l5.1,3.7l4.8,0c3.2-4.8,5.6-10,7.2-15.5C1881.6,401.8,1882.3,395.7,1882.1,389.5z"
            ></path>
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth28Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth28Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth28Diagnozis.vinir_color}`}
                d="M1882.1 389.5C1881.8 383.2 1880.8 377 1879.2 371C1878.1 367 1876.7 363.1 1875.1 359.3C1873.6 355.9 1871.9 352.5 1870 349.3C1868.6 346.8 1866.7 344.6 1864.4 342.9C1860.2 339.7 1855 338.4 1849.7 337.8C1839.5 336.7 1829.3 338.4 1819.3 340.8C1810.4 343 1801.6 345.8 1793.7 350.3C1785.1 
                                355.2 1777.6 362 1771.9 370.1C1771.6 371.8 1771.3 373.5 1771.1 375.2C1769.7 385.3 1769.6 395.6 1770.6 405.8C1771.2 411.9 1772.3 417.9 1773.8 423.9C1775.3 428 1777.6 431.9 1780.4 435.3C1782.9 438.3 1785.8 440.9 1789.1 443.1L1793.3 442.1C1794.5 439.8 1796.1 437.7 1798.1 436C1798.7 435.4 1799.4 434.9 1800.1 434.5C1806.1 430.4 1814.2 429.4 1818.9 423.7C1820.2 422.2 1821.1 420.3 1821.6 418.4C1823.1 420.6 1825.2 422.4 
                                1827.8 423.3C1830.9 424.4 1834.2 424.3 1837.4 424.9C1841.2 425.6 1844.8 427.3 1847.8 429.7L1855.7 429.3L1861.2 420.8L1862.3 418.4L1868 406.5C1868.9 404.7 1869.6 402.7 1870.1 400.7C1870.7 397.7 1870.8 394.7 1870.2 391.7L1872.1 392.4C1872 394.3 1871.7 396.2 1871.3 398C1870.4 402.8 1868.9 407.5 1866.8 412C1865.6 414.5 1864.3 417 1862.8 419.3L1867.9 423H1872.7C1875.9 418.2 
                                1878.3 413 1879.9 407.5C1881.6 401.8 1882.3 395.7 1882.1 389.5Z"
              />
            </g>
          </g>
        </g>
      </g>
    </>
  );
}
