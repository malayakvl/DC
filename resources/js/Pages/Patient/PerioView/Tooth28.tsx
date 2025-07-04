import React from 'react';

export default function Tooth28({ className = '', tDia }) {
  const tooth28 = tDia;

  return (
    <>
      <g id="28" className="df-tooth-text" data-number="28">
        <text transform="matrix(1 0 0 1 1995 340)" className="st3 st4 st5">
          28
        </text>
      </g>
      <g
        className="df-tooth-perio"
        transform={
          className === 'bottom'
            ? 'matrix(-0.6931834, -0.0974505, 0.0974505, -0.6931834 3249 897)'
            : 'matrix(0.6931834, 0.0974505, -0.0974505, 0.6931834 800 -243)'
        }
      >
        <g className="underlay">
          <path
            className="st40"
            d="M1820.5,233.5c5-0.4,10.5,1.6,14.1,5c8.6,8.1,5.5,21,6.4,31.4
                    c1.8,20.4,12.5,37.4,23.1,54c10.5,16.3,18.8,43.3,18.5,63.4c-0.6,35-9,63.7-15.4,88.5c-6.4,24.8,2.4,64.9,6.7,85.7
                    c8.9,44,14.8,95.8-2.5,137.8c-2.1,5.1-4.5,10.1-7.5,14.7c-5.2,8-12.5,15-21.5,18.2c-10.4,3.8-22.2,2.3-32.5-1.8
                    c-13.3-5.2-21.9-15.2-27-28.5c-8-20.7-8.1-41.8-9.1-63.8c-1-23.3-2.8-48.9,1.4-71.9c-2.3-12.4,23.9-48.5,21.3-70.4
                    c-3.7-31.9-19.8-61.4-23.3-74.1c-1.6-5.8-2.2-17.7-3.3-23.6c-4.5-24.4,7.8-72.1,10.3-86.7C1782.7,296.9,1784.5,236.5,1820.5,233.5z"
          ></path>
        </g>
        <g id="TH_27" className="common-view" style={{ visibility: tooth28.status !== 'absent' ? 'inherit' : 'hidden' }}>
          <g className="dentin">
            <g
              style={{ visibility: (tooth28.status === 'implant' || tooth28.status === 'middlepart') ? 'hidden' : 'inherit' }}
            >
              <path
                className="st9"
                d="M1828.7,245.5c-4-1.2-8.3-1-12.3,0.3c-7,2.3-12.1,7.7-15.8,13.7
                        c-7.1,11.5-9.2,24.8-11.2,37.9c-1.2,8.4-2.4,16.9-3.9,25.3c-1.2,7-2.6,10-4.1,17c-2.7,12.5-5.6,18.3-8.9,30.8
                        c1.8,7.3,3.7,25.3,6.1,32.5c1.1,3.4,2.3,6.9,3.5,10.3c1.2,3.4,2.5,6.8,3.8,10.2c2.4-2.7,5.1-5.1,8-7.3c4.1-3.1,8.6-5.7,13.5-7.7
                        c3,0.5,5.8,1.6,8.2,3.3c1.3,1,2.5,2.1,3.5,3.3c4.5-2.4,8.8-5,13-7.7c4-2.6,8.1-5.5,13-5.6c3.7-0.1,7.1,1.4,10.4,3
                        c3.5,1.6,6.9,3.3,10.4,5.1c1.5-7.8,2.7-15.6,3.4-23.5c0.7-7.7,1.1-15.4,1.1-23.1c-3.4-8.5-6.8-16.9-10.3-25.3
                        c-8.7-21-17.8-41.8-26-62.9c-1.2-3.2-2.5-6.6-1.4-9.8c0.9-3,3.7-5.4,4.5-8.4c0.5-2.1,0-4.4-1.3-6.3
                        C1834.1,248,1831.6,246.4,1828.7,245.5z"
              ></path>
            </g>
            <g
              style={{ visibility: (tooth28.status === 'implant' || tooth28.status === 'middlepart') ? 'hidden' : 'inherit' }}
            >
              <path
                className="st10"
                d="M1861.2,341c-3.5-1.8-7.5-2.7-11.5-3.1c-6.4-0.7-12.7-0.3-19,0.7c-3.8,0.6-7.6,1.4-11.4,2.3c-2,0.5-4,1-6,1.6
                        c-6.8,1.9-13.4,4.4-19.6,7.9c-8.2,4.6-15.2,10.9-20.8,18.5c3.2-11.3,5.9-17.1,8.5-29.1c1.5-7,2.9-10,4.1-17
                        c1.5-8.4,2.7-16.9,3.9-25.3c1.9-13.1,4.1-26.4,11.2-37.9c3.7-6,8.8-11.3,15.8-13.7c4-1.3,8.3-1.5,12.3-0.3
                        c2.9,0.9,5.5,2.5,7.1,4.9c1.3,1.9,1.8,4.1,1.3,6.2c-0.7,3.1-3.5,5.4-4.5,8.4c-1,3.3,0.2,6.6,1.4,9.8c8.2,21.1,17.3,42,26,62.9
                        C1860.3,338.9,1860.7,339.9,1861.2,341z"
              ></path>
            </g>
          </g>
          <g className="pulp">
            <g
              className="pulpitis-pfilling"
              data-position="28"
            >
              <path
                className="st22 target"
                d="M1841.8,379c-5.7-2.8-12.3-3.6-18.6-2.4c-7.1,1.3-13.3,5.1-17.4,10.5
                        c4.4-14.5,6.9-29.5,7.5-44.5c0,0,0,0,0,0l0,0c0,0,0.1,0,0.1,0c2-0.6,3.9-1.1,5.9-1.6c3.8-0.9,7.5-1.7,11.4-2.3
                        C1835.1,351.9,1838.8,365.3,1841.8,379z"
                style={{ fill: 'rgb(254, 246, 249)' }}
              ></path>
            </g>
            <g className="pulpitis-pfilling" data-position="28">
              <path
                className="st22 target"
                d="M1830.8,338.5c-3.8,0.6-7.6,1.4-11.4,2.3c-2,0.5-4,1-6,1.6v-0.1c0.2-4,0.2-8,0.1-12
                        c-0.4-11.6-1.8-23.4-1.7-35c1.1-0.1,2.2-0.2,3.5-0.3c0.8,0,1.7-0.1,2.5-0.1c2.1,12.5,6.8,25.2,11.1,37.5
                        C1829.4,334.4,1830.1,336.4,1830.8,338.5C1830.8,338.5,1830.8,338.5,1830.8,338.5z"
                style={{ fill: 'rgb(254, 246, 249)' }}
              ></path>
            </g>
            <g className="pulpitis-pfilling" data-position="28">
              <path
                className="st22 target part"
                d="M1819.9,264c-3.9,10.1-4,20.5-2.3,30.9c-0.8,0-1.6,0.1-2.5,0.1
                        c-1.2,0.1-2.4,0.2-3.5,0.3c0.1-9.9,1.3-19.7,5.4-29c3.1-7.1,7.8-13.6,13.8-19.1C1826,252.1,1822.3,257.8,1819.9,264z"
                style={{ fill: 'rgb(254, 246, 249)' }}
              ></path>
            </g>
            <g
              className="level periodontitis"
              data-level="1"
              data-position="28"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="1836.5" cy="242.8" r="8.2"></circle>
            </g>
            <g
              className="level periodontitis"
              data-level="2"
              data-position="28"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="1833.5" cy="236.5" r="17.5"></circle>
            </g>
            <g
              className="level periodontitis"
              data-level="3"
              data-position="28"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="1836.5" cy="224" r="30"></circle>
            </g>
          </g>
          <g
            className="pin"
            style={{ visibility: 'inherit', opacity: 0 }}
          >
            <path
              className="st56 hIntact"
              d="M1870.3 363.1C1870.3 370.8 1869.9 378.5 1869.2 386.2C1868.4 394.1 1867.3 401.9 1865.7 409.7C1862.3 407.9 1858.8 406.2 1855.4 404.6C1852.1 403.1 1848.7 401.5 1845 401.6C1840.1 401.7 1836 404.6 1832 407.2C1827.8 410 1823.5 412.6 1819 414.9C1818 413.6 1816.8 412.5 1815.5 411.6C1813.1 409.9 1810.3 408.7 1807.3 408.2C1802.5 410.2 1797.9 412.8 1793.8 415.9C1790.9 418.1 1788.2 420.5 1785.8 423.2C1784.5 419.8 1783.2 416.4 1782 413C1780.8 409.6 1779.6 406.2 1778.5 402.7C1776.2 395.5 1774.3 377.6 1772.4 370.2C1772.6 369.6 1772.7 369.1 1772.8 368.6C1778.3 361 1785.4 354.8 1793.6 350.1C1798.7 347.2 1804.1 345 1809.7 343.3C1810.9 342.9 1812 342.6 1813.2 342.2C1815.2 341.6 1817.2 341.1 1819.2 340.6C1820.6 340.3 1822 339.9 1823.4 339.6H1823.5C1824.4 339.4 1825.3 339.2 1826.2 339C1826.7 338.9 1827.1 338.8 1827.6 338.7C1828.5 338.5 1829.5 338.4 1830.4 338.2C1830.4 338.2 1830.4 338.2 1830.5 338.2H1830.6C1835.8 337.4 1841 337 1846.2 337.3C1847.3 337.4 1848.4 337.4 1849.5 337.6C1853.5 338 1857.4 338.9 1860.9 340.7C1860.9 340.7 1860.9 340.7 1860.9 340.6C1861 340.6 1861 340.6 1861 340.7C1864.3 348.3 1867.3 355.7 1870.3 363.1Z"
              style={{ visibility: 'hidden', opacity: 0 }}
            ></path>
            <path
              className="st57"
              d="M1839.1 403.1C1836.6 404.2 1834.3 405.8 1832 407.3C1827.9 410 1823.6 412.6 1819.2 414.9C1818.2 413.7 1817.1 412.6 1815.8 411.6C1815.3 411.2 1813.1 409.7 1812.6 409.4L1813.3 276.8C1813.3 276.1 1813.8 275.6 1814.3 275.3C1814.5 275.2 1814.8 275.1 1815 275.1C1815.8 275.1 1816.5 275.7 1816.7 276.5L1817 277.9C1817 277.9 1834.2 375.6 1839.1 403.1Z"
            ></path>
          </g>
          <g
            className="stump"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st14"
              d="M1830.9,338.5C1830.8,338.5,1830.8,338.5,1830.9,338.5L1830.9,338.5c-0.1,0-0.1,0-0.2,0
                        c-0.9,0.1-1.9,0.3-2.8,0.5c-0.5,0.1-0.9,0.2-1.4,0.3c-0.9,0.2-1.8,0.4-2.7,0.6c0,0-0.1,0-0.1,0c-1.4,0.3-2.8,0.6-4.2,1
                        c-2,0.5-4,1-6,1.6v0c0,0,0,0,0,0c-1.2,0.3-2.3,0.7-3.5,1.1l3.1-66.7c0.1-0.9,0.8-1.7,1.8-1.7c0.8,0,1.5,0.6,1.7,1.4L1830.9,338.5
                        z"
            ></path>
            <path
              className="st15"
              d="M1870.3,363.1c0,7.7-0.4,15.4-1.1,23.1c-0.8,7.9-1.9,15.7-3.5,23.5c-3.4-1.8-6.9-3.5-10.3-5.1
                        c-3.3-1.5-6.7-3.1-10.4-3c-4.9,0.1-9,3-13,5.6c-4.2,2.8-8.5,5.4-13,7.7c-1-1.3-2.2-2.4-3.5-3.3c-2.4-1.7-5.2-2.9-8.2-3.4
                        c-4.8,2-9.4,4.6-13.5,7.7c-2.9,2.2-5.6,4.6-8,7.3c-1.3-3.4-2.6-6.8-3.8-10.2c-1.2-3.4-2.4-6.8-3.5-10.3
                        c-2.3-7.2-4.2-25.1-6.1-32.5c0.2-0.6,0.3-1.1,0.4-1.6c5.5-7.6,12.6-13.8,20.8-18.5c5.1-2.9,10.5-5.1,16.1-6.8
                        c1.2-0.4,2.3-0.7,3.5-1.1c0,0,0,0,0,0v0c2-0.6,4-1.1,6-1.6c1.4-0.3,2.8-0.7,4.2-1c0,0,0.1,0,0.1,0c0.9-0.2,1.8-0.4,2.7-0.6
                        c0.5-0.1,0.9-0.2,1.4-0.3c0.9-0.2,1.9-0.3,2.8-0.5c0,0,0,0,0.1,0v0c0,0,0.1,0,0.1,0c5.2-0.8,10.4-1.2,15.6-0.9
                        c1.1,0.1,2.2,0.1,3.3,0.3c4,0.4,7.9,1.3,11.4,3.1c0,0,0,0,0-0.1c0.1,0,0.1,0,0.1,0.1C1864.3,348.3,1867.3,355.7,1870.3,363.1z"
            ></path>
          </g>
          <g
            className="abutment"
            style={{ visibility: 'hidden' }}
          >
            <path
              className="st25"
              d="M1772.7,370.3c5.6-7.8,12.8-14.3,21.2-19c8-4.5,16.7-7.3,25.6-9.5c9.7-2.4,19.7-4,29.7-3.1
                        c0.2,0,0.5,0,0.7,0.1c3.9,0.4,7.8,1.3,11.2,3c0,0,0,0,0,0l-35.5-12l-31.5,4.5L1772.7,370.3z"
            ></path>
            <path
              className="st26"
              d="M1772.5,371.1c0.2,10.3,3.9,25.6,6.2,32.8c1.1,3.4,2.3,6.9,3.5,10.3c1.2,3.4,2.5,6.8,3.8,10.2
                        c2.4-2.7,5.1-5.1,8-7.3c4.1-3.1,8.6-5.7,13.5-7.7c3,0.5,5.8,1.6,8.2,3.3c1.3,1,2.5,2.1,3.5,3.3c0.1-0.1,0.5-0.3,0.5-0.3
                        c4.3-2.3,8.5-4.8,12.5-7.5c4-2.6,8.1-5.5,13-5.6c3.7-0.1,7.1,1.4,10.4,3c3.5,1.6,6.9,3.3,10.3,5.1c1.5-7.8,2.7-15.6,3.4-23.5
                        c0.8-7.7,1.1-15.4,1.1-23.1c-3-7.4-6-14.8-9-22.2c-0.1,0-0.2-0.1-0.3-0.1c-3.5-1.7-7.3-2.5-11.2-3c-0.2,0-0.5-0.1-0.7-0.1
                        c-10-0.9-19.9,0.7-29.7,3.1c-8.9,2.2-17.6,5-25.6,9.5c-8.3,4.7-15.6,11.2-21.2,19C1772.6,370.6,1772.6,370.9,1772.5,371.1z"
            ></path>
          </g>
          <g
            className="shaper"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1790.02 376.322C1789.94 378.803 1792.12 380.755 1794.58 380.407L1843.34 373.498C1845.8 373.15 1847.35 370.672 1846.58 368.31L1834.31 330.235C1833.71 328.378 1831.86 327.224 1829.93 327.504L1794.68 332.616C1792.76 332.895 1791.32 334.511 1791.26 336.45L1790.02 376.322Z"
            ></path>
          </g>
          <g
            style={{ visibility: (tooth28.status == 'implant') ? 'inherit' : 'hidden' }}
          >
            <path
              className="st18"
              d="M1785.3,335.7l52.1-7.5c-3.1-15.8-6.9-31.4-11.5-46.9c-4.5-15.1-9.7-30.2-15.6-45c-4.1-3-9.9-4.4-15.6-3.5
                        c-6.4,1-11.9,4.6-14.9,9.4c-0.8,15-0.8,30,0,45C1780.6,303.5,1782.5,319.7,1785.3,335.7z"
            ></path>
            <line
              className="st19"
              x1="1778"
              y1="319.5"
              x2="1840"
              y2="319.4"
            ></line>
            <line
              className="st19"
              x1="1774.5"
              y1="301.4"
              x2="1836.5"
              y2="301.4"
            ></line>
            <line
              className="st19"
              x1="1772.2"
              y1="283.3"
              x2="1834.3"
              y2="283.2"
            ></line>
            <line
              className="st19"
              x1="1768.7"
              y1="265.2"
              x2="1830.8"
              y2="265.2"
            ></line>
            <line
              className="st19"
              x1="1765.2"
              y1="247.2"
              x2="1827.3"
              y2="247.2"
            ></line>
          </g>
          <g className="toutline">
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
          <g className="wedge-shaped">
            <path
              className="st7 st59"
              d="M1879.2 371C1880.8 377 1881.8 383.2 1882.1 389.5C1882.3 395.7 1881.6 401.8 1879.9 407.5C1878.3 413 1875.9 418.2 1872.7 423H1867.9L1862.8 419.3C1864.3 417 1865.6 414.5 1866.8 412C1868.9 407.5 1870.4 402.8 1871.3 398C1871.7 396.2 1872 394.3 1872.1 392.4L1870.2 391.7C1870.8 394.7 1870.7 397.7 1870.1 400.7C1869.6 402.7 1868.9 404.7 1868 406.5L1862.3 418.4L1861.2 420.8L1855.7 429.3L1847.8 429.7C1844.8 427.3 1841.2 425.6 1837.4 424.9C1836.22 424.679 1835.03 424.553 1833.84 424.428C1831.8 424.211 1829.76 423.995 1827.8 423.3C1825.2 422.4 1823.1 420.6 1821.6 418.4C1821.1 420.3 1820.2 422.2 1818.9 423.7C1816.05 427.155 1811.95 428.883 1807.83 430.622C1805.15 431.751 1802.46 432.885 1800.1 434.5C1799.4 434.9 1798.7 435.4 1798.1 436C1796.1 437.7 1794.5 439.8 1793.3 442.1L1789.1 443.1C1785.8 440.9 1782.9 438.3 1780.4 435.3C1777.6 431.9 1775.3 428 1773.8 423.9C1772.3 417.9 1771.2 411.9 1770.6 405.8C1769.6 395.6 1769.7 385.3 1771.1 375.2C1771.3 373.501 1771.6 371.802 1771.9 370.103L1771.9 370.1C1777.6 362 1785.1 355.2 1793.7 350.3C1801.6 345.8 1810.4 343 1819.3 340.8C1829.3 338.4 1839.5 336.7 1849.7 337.8C1855 338.4 1860.2 339.7 1864.4 342.9C1866.7 344.6 1868.6 346.8 1870 349.3C1871.9 352.5 1873.6 355.9 1875.1 359.3C1876.7 363.1 1878.1 367 1879.2 371ZM1864.81 352.288C1863.6 350.327 1861.95 348.602 1859.95 347.268C1856.3 344.759 1851.79 343.739 1847.18 343.268C1838.32 342.406 1829.46 343.739 1820.78 345.621C1813.05 347.347 1805.4 349.543 1798.54 353.072C1792.29 356.288 1784.87 361.193 1781.12 366.614C1780.38 367.687 1779.92 368.457 1779.6 369.34C1779.14 370.612 1780.36 371.781 1781.69 371.566L1865.24 358.129C1866.59 357.912 1867.33 356.427 1866.64 355.242C1866.06 354.24 1865.45 353.252 1864.81 352.288Z"
            ></path>
            <path
              className="st7 target"
              d="M1859.95 347.268C1861.95 348.602 1863.6 350.327 1864.81 352.288C1865.45 353.252 1866.06 354.24 1866.64 355.242C1867.33 356.427 1866.59 357.912 1865.24 358.129L1781.69 371.566C1780.36 371.781 1779.14 370.612 1779.6 369.34C1779.92 368.457 1780.38 367.687 1781.12 366.614C1784.87 361.193 1792.29 356.288 1798.54 353.072C1805.4 349.543 1813.05 347.347 1820.78 345.621C1829.46 343.739 1838.32 342.406 1847.18 343.268C1851.79 343.739 1856.3 344.759 1859.95 347.268Z"
            ></path>
            <path
              className="st60 target stroke"
              d="M1859.95 347.268C1861.95 348.602 1863.6 350.327 1864.81 352.288C1865.45 353.252 1866.06 354.24 1866.64 355.242C1867.33 356.427 1866.59 357.912 1865.24 358.129L1781.69 371.566C1780.36 371.781 1779.14 370.612 1779.6 369.34C1779.92 368.457 1780.38 367.687 1781.12 366.614C1784.87 361.193 1792.29 356.288 1798.54 353.072C1805.4 349.543 1813.05 347.347 1820.78 345.621C1829.46 343.739 1838.32 342.406 1847.18 343.268C1851.79 343.739 1856.3 344.759 1859.95 347.268Z"
            ></path>
          </g>
          <g
            className="tartar"
            style={{ visibility: 'inherit', opacity: 0 }}
          >
            <path
              className="st61 level2"
              d="M1770 388.5L1771 388L1772 386.5L1773 384V381L1774.5 376.5V373L1776.5 369L1779.5 366L1781 363.5L1783 360.5L1787 358L1790.5 354.5L1793 353L1796.5 352L1800 350.5L1803.5 348L1808 346.5H1811.5L1817.5 343.5H1819H1823L1827.5 341H1834H1837.5L1842 340L1844.5 341H1851L1854.5 342L1859 343.5L1862 346.5L1865.5 348L1867.5 352L1869 355.5L1871.5 358V359.5L1872.5 362L1874 363.5V366L1875.5 368L1876.5 369C1877 369.333 1878.2 370.1 1879 370.5V368L1878.5 366L1877.5 363.5V362V359.5L1876.5 358L1875.5 355.5L1874.5 353L1871.5 348L1871 346L1869 343L1867 340L1865.5 337.5L1863.5 335L1862 331.5L1859 328.5L1857 326L1854.5 322.5L1852.5 322L1848.5 321.5L1844.5 319.5L1839.5 319L1836 320.5L1831.5 318.5H1828.5L1824.5 320.5H1820L1816.5 321.5L1812 321L1808.5 321.5L1805 323.5L1801 324L1797.5 326.5L1794 327.5H1790.5L1787.5 330L1783 331.5L1782 335L1778.5 340V344.5L1776.5 348V352L1775.5 354.5L1774 358.5L1773 362L1771 365L1770 370.5V373L1769 377V380V384V385.5V387L1770 388.5Z"
            ></path>
            <path
              className="st61 level1"
              d="M1770 388.5L1771 388L1772 386.5L1773 384V381L1774.5 376.5V373L1776.5 369L1779.5 366L1781 363.5L1783 360.5L1787 358L1790.5 354.5L1793 353L1796.5 352L1800 350.5L1803.5 348L1808 346.5H1811.5L1817.5 343.5H1819H1823L1827.5 341H1834H1837.5L1842 340L1844.5 341H1851L1854.5 342L1859 343.5L1862 346.5L1865.5 348L1867.5 352L1869 355.5L1871.5 358V359.5L1872.5 362L1874 363.5V366L1875.5 368L1876.5 369C1877 369.333 1878.2 370.1 1879 370.5V369L1878 366.5L1877.5 363.5L1876.5 360.5L1874 357L1872.5 353L1871.5 349.5L1869 346.5L1866.5 342L1864.5 340L1862 336L1858 334.5H1854.5L1848 332.5H1843L1838.5 331H1836H1831L1826.5 332.5H1819L1814.5 334.5H1811.5L1806.5 336L1802 337.5L1798 340L1794.5 342L1789.5 343.5L1786 346.5L1782 348L1778.5 350.5L1776.5 353V355.5L1775.5 358L1773 362V366L1771 370.5L1770 374.5L1771 376.5L1770 378.5V382L1769.5 386L1770 388.5Z"
            ></path>
          </g>
          <g className="header caries-filling">
            <g className="caries-filling" data-position="28_5">
              <path
                className="st58"
                d="M1790.9,396.2c0.7,3.6,1.3,7.1,1.7,9.7c0.8,4.6,3.9,21.6,5.5,30.2c0.6-0.6,1.3-1.1,2-1.5
                            c6-4.1,14.1-5.1,18.8-10.8c1.3-1.5,2.2-3.4,2.7-5.3c1.5,2.2,3.6,4,6.2,4.9c3.1,1.1,6.4,1,9.6,1.6c3.8,0.7,7.4,2.4,10.4,4.8
                            l7.9-0.4l5.5-8.5l1.1-2.4c-0.7-9.3-1.3-18.6-1-27.9c0.1-3.1,0.2-6.3,0.6-9.5c-10-7-27.3-6.7-43.6-3.3
                            C1805.4,380.6,1795.5,390.6,1790.9,396.2z"
              ></path>
              <path
                className="st8 target"
                d="M1790.9,396.2c0.7,3.6,1.3,7.1,1.7,9.7c0.8,4.6,3.9,21.6,5.5,30.2c0.6-0.6,1.3-1.1,2-1.5
                            c6-4.1,14.1-5.1,18.8-10.8c1.3-1.5,2.2-3.4,2.7-5.3c1.5,2.2,3.6,4,6.2,4.9c3.1,1.1,6.4,1,9.6,1.6c3.8,0.7,7.4,2.4,10.4,4.8
                            l7.9-0.4l5.5-8.5l1.1-2.4c-0.7-9.3-1.3-18.6-1-27.9c0.1-3.1,0.2-6.3,0.6-9.5c-10-7-27.3-6.7-43.6-3.3
                            C1805.4,380.6,1795.5,390.6,1790.9,396.2z"
                style={{ fill: 'none' }}
              ></path>
            </g>
            <g className="caries-filling" data-position="28_4">
              <path
                className="st58"
                d="M1770.7,405.9c0.6,6.1,1.7,12.1,3.2,18.1c1.5,4.1,3.8,8,6.6,11.4c2.5,3,5.4,5.6,8.7,7.8l4.2-1
                        c1.2-2.3,2.8-4.4,4.8-6.1c-1.6-8.6-4.7-25.6-5.5-30.2c-0.4-2.6-1-6.1-1.7-9.7c-1-5.2-2.4-10.5-4-13.3c-2.4-4-8.3-6.3-15.7-7.7
                        C1769.8,385.4,1769.6,395.7,1770.7,405.9z"
              ></path>
              <path
                className="st8 target"
                d="M1770.7,405.9c0.6,6.1,1.7,12.1,3.2,18.1c1.5,4.1,3.8,8,6.6,11.4c2.5,3,5.4,5.6,8.7,7.8l4.2-1
                        c1.2-2.3,2.8-4.4,4.8-6.1c-1.6-8.6-4.7-25.6-5.5-30.2c-0.4-2.6-1-6.1-1.7-9.7c-1-5.2-2.4-10.5-4-13.3c-2.4-4-8.3-6.3-15.7-7.7
                        C1769.8,385.4,1769.6,395.7,1770.7,405.9z"
                style={{ fill: 'none' }}
              ></path>
            </g>
            <g className="caries-filling" data-position="28_2">
              <path
                className="st58"
                d="M1870.1,391.9l1.9,0.7c-0.1,1.9-0.4,3.8-0.8,5.6c-0.9,4.8-2.4,9.5-4.5,14c-1.2,2.5-2.5,5-4,7.3l5.1,3.7l4.8,0
                        c3.2-4.8,5.6-10,7.2-15.5c1.7-5.9,2.5-12.1,2.2-18.2c-0.3-6.3-1.3-12.5-2.9-18.5c-1.1-4-2.5-7.9-4.1-11.7
                        c-0.9,0.3-1.7,0.6-2.4,0.9c-5.1,2.1-6.4,5.4-9.2,13.5c-0.8,2.4-1.3,4.9-1.7,7.5c-0.4,3.2-0.5,6.4-0.6,9.5
                        c-0.3,9.3,0.4,18.6,1,27.9l5.7-11.9c0.9-1.8,1.6-3.8,2.1-5.8C1870.6,397.9,1870.6,394.8,1870.1,391.9z"
              ></path>
              <path
                className="st8 target"
                d="M1870.1,391.9l1.9,0.7c-0.1,1.9-0.4,3.8-0.8,5.6c-0.9,4.8-2.4,9.5-4.5,14c-1.2,2.5-2.5,5-4,7.3l5.1,3.7l4.8,0
                        c3.2-4.8,5.6-10,7.2-15.5c1.7-5.9,2.5-12.1,2.2-18.2c-0.3-6.3-1.3-12.5-2.9-18.5c-1.1-4-2.5-7.9-4.1-11.7
                        c-0.9,0.3-1.7,0.6-2.4,0.9c-5.1,2.1-6.4,5.4-9.2,13.5c-0.8,2.4-1.3,4.9-1.7,7.5c-0.4,3.2-0.5,6.4-0.6,9.5
                        c-0.3,9.3,0.4,18.6,1,27.9l5.7-11.9c0.9-1.8,1.6-3.8,2.1-5.8C1870.6,397.9,1870.6,394.8,1870.1,391.9z"
                style={{ fill: 'none' }}
              ></path>
            </g>
            <g className="caries-filling" data-position="28_1">
              <path
                className="st58"
                d="M1771.2,375.3c7.4,1.3,13.3,3.7,15.7,7.7c1.7,2.8,3,8.1,4,13.3c4.6-5.6,14.5-15.7,27.3-18.4
                        c16.2-3.4,33.5-3.7,43.6,3.3c0.3-2.6,0.8-5.1,1.7-7.5c2.8-8.1,4.1-11.4,9.2-13.5c0.7-0.3,1.5-0.6,2.4-0.9c-1.5-3.4-3.2-6.8-5.1-10
                        c-1.4-2.5-3.3-4.7-5.6-6.4c-4.2-3.2-9.4-4.5-14.7-5.1c-10.2-1.1-20.4,0.6-30.4,3c-8.9,2.2-17.7,5-25.6,9.5
                        c-8.6,4.9-16.1,11.7-21.8,19.8C1771.7,371.9,1771.4,373.6,1771.2,375.3z"
              ></path>
              <path
                className="st8 target"
                d="M1771.2,375.3c7.4,1.3,13.3,3.7,15.7,7.7c1.7,2.8,3,8.1,4,13.3c4.6-5.6,14.5-15.7,27.3-18.4
                        c16.2-3.4,33.5-3.7,43.6,3.3c0.3-2.6,0.8-5.1,1.7-7.5c2.8-8.1,4.1-11.4,9.2-13.5c0.7-0.3,1.5-0.6,2.4-0.9c-1.5-3.4-3.2-6.8-5.1-10
                        c-1.4-2.5-3.3-4.7-5.6-6.4c-4.2-3.2-9.4-4.5-14.7-5.1c-10.2-1.1-20.4,0.6-30.4,3c-8.9,2.2-17.7,5-25.6,9.5
                        c-8.6,4.9-16.1,11.7-21.8,19.8C1771.7,371.9,1771.4,373.6,1771.2,375.3z"
                style={{ fill: 'none' }}
              ></path>
            </g>
            <g className="with">
              <path
                className="st54"
                d="M1861.5 380.999C1861.59 386.832 1861.81 401.599 1862 413.999"
              ></path>
              <path
                className="st54"
                d="M1861.5 380.999C1861.67 375.499 1863.7 363.799 1870.5 360.999"
              ></path>
              <path
                className="st54"
                d="M1861.5 380.999C1845.5 372.5 1805.8 379.999 1791 395.999"
              ></path>
              <path
                className="st54"
                d="M1791 395.999C1791 390.832 1788.1 379.699 1776.5 376.499"
              ></path>
              <path className="st54" d="M1791 395.999L1797 430.999"></path>
            </g>
          </g>
          <g>
            <g className="vinir" style={{ visibility: 'hidden' }}>
              <path
                className="st55"
                d="M1882.1 389.5C1881.8 383.2 1880.8 377 1879.2 371C1878.1 367 1876.7 363.1 1875.1 359.3C1873.6 355.9 1871.9 352.5 1870 349.3C1868.6 346.8 1866.7 344.6 1864.4 342.9C1860.2 339.7 1855 338.4 1849.7 337.8C1839.5 336.7 1829.3 338.4 1819.3 340.8C1810.4 343 1801.6 345.8 1793.7 350.3C1785.1 355.2 1777.6 362 1771.9 370.1C1771.6 371.8 1771.3 373.5 1771.1 375.2C1769.7 385.3 1769.6 395.6 1770.6 405.8C1771.2 411.9 1772.3 417.9 1773.8 423.9C1775.3 428 1777.6 431.9 1780.4 435.3C1782.9 438.3 1785.8 440.9 1789.1 443.1L1793.3 442.1C1794.5 439.8 1796.1 437.7 1798.1 436C1798.7 435.4 1799.4 434.9 1800.1 434.5C1806.1 430.4 1814.2 429.4 1818.9 423.7C1820.2 422.2 1821.1 420.3 1821.6 418.4C1823.1 420.6 1825.2 422.4 1827.8 423.3C1830.9 424.4 1834.2 424.3 1837.4 424.9C1841.2 425.6 1844.8 427.3 1847.8 429.7L1855.7 429.3L1861.2 420.8L1862.3 418.4L1868 406.5C1868.9 404.7 1869.6 402.7 1870.1 400.7C1870.7 397.7 1870.8 394.7 1870.2 391.7L1872.1 392.4C1872 394.3 1871.7 396.2 1871.3 398C1870.4 402.8 1868.9 407.5 1866.8 412C1865.6 414.5 1864.3 417 1862.8 419.3L1867.9 423H1872.7C1875.9 418.2 1878.3 413 1879.9 407.5C1881.6 401.8 1882.3 395.7 1882.1 389.5Z"
              ></path>
            </g>
          </g>
          <g className="crown" style={{ visibility: tooth28.status !== 'exist' && tooth28.status ? 'inherit' : 'hidden', opacity: (tooth28.status !== 'exist') ? 1 : 0 }}>
            <path
              className={`st46 target temporary-crown crown-fill blue`}
              d="M1882.1,389.5c-0.3-6.3-1.3-12.5-2.9-18.5c-1.1-4-2.5-7.9-4.1-11.7
                        c-1.5-3.4-3.2-6.8-5.1-10c-1.4-2.5-3.3-4.7-5.6-6.4c-4.2-3.2-9.4-4.5-14.7-5.1c-10.2-1.1-20.4,0.6-30.4,3
                        c-8.9,2.2-17.7,5-25.6,9.5c-8.6,4.9-16.1,11.7-21.8,19.8c-0.3,1.7-0.6,3.4-0.8,5.1c-1.4,10.1-1.5,20.4-0.5,30.6
                        c0.6,6.1,1.7,12.1,3.2,18.1c1.5,4.1,3.8,8,6.6,11.4c2.5,3,5.4,5.6,8.7,7.8l4.2-1c1.2-2.3,2.8-4.4,4.8-6.1c0.6-0.6,1.3-1.1,2-1.5
                        c6-4.1,14.1-5.1,18.8-10.8c1.3-1.5,2.2-3.4,2.7-5.3c1.5,2.2,3.6,4,6.2,4.9c3.1,1.1,6.4,1,9.6,1.6c3.8,0.7,7.4,2.4,10.4,4.8
                        l7.9-0.4l5.5-8.5l1.1-2.4l5.7-11.9c0.9-1.8,1.6-3.8,2.1-5.8c0.6-3,0.7-6,0.1-9l1.9,0.7c-0.1,1.9-0.4,3.8-0.8,5.6
                        c-0.9,4.8-2.4,9.5-4.5,14c-1.2,2.5-2.5,5-4,7.3l5.1,3.7l4.8,0c3.2-4.8,5.6-10,7.2-15.5C1881.6,401.8,1882.3,395.7,1882.1,389.5z"
            ></path>
          </g>
        </g>
      </g>
    </>
  );
}
