import React from 'react';

export default function Tooth25({ className = '', tDia }) {
  const tooth25 = tDia;

  return (
    <>
      <g id="25" className="df-tooth-text" data-number="25">
        <text transform="matrix(1 0 0 1 1605 340)" className="st3 st4 st5">
          25
        </text>
      </g>
      <g
        className="df-tooth-perio"
        data-number="25"
        transform={
          className === 'bottom'
            ? 'matrix(-0.6999237, -0.01034999, 0.01034999, -0.6999237  2636 764)'
            : 'matrix(0.6999237, 0.01034999, -0.01034999, 0.6999237 620 -113)'
        }
      >
        <g className="underlay" style={{ visibility: 'inherit' }}>
          <path
            className="st40"
            d="M1426,248.9c0,0-7,25-11,48s-11,92-12,105s-0.3,37.5-0.2,49.7
            s6.2,31.3,11.2,43.3s8,25,0,39s-12.9,31.5-10.4,58.2c2.4,26.8,2.4,107.8,8.4,122.8s19,25,38,22s30-13,32-38s10.5-92,9-112
            c-3-40-17-52-16-74c1.3-28,15-31,15-59c0-14-4-44-6-59s-9-57-10-68s-4-67-5-80s0-32-16-34S1429,238.9,1426,248.9z"
          ></path>
        </g>
        <g id="TH_25" className="common-view" style={{ visibility: tooth25.status !== 'absent' ? 'inherit' : 'hidden' }}>
          <g className="dentin">
            <g
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st9"
                d="M1476.7,438.6c-1,9.6-3.3,19.1-6.8,28.2l-23.9-2.9l-26.2,6.6
                c-4-10.9-7.1-22-9.2-33.3c-1.4-7.4-2.3-14.8-2.9-22.2c0-7.7,0.3-15.3,1-23c1.1-12.2,2.9-24.5,4.8-36.7
                c3.4-22.3,6.8-44.7,11.1-66.9c3.4-17.2,7.4-34.3,11.9-51.3c2.3-9,7-18,14.7-17.8c-7.5,0.2-12,9-14.3,17.8
                c-4.4,17-8.5,34.1-11.9,51.3c-4.4,22.2-7.7,44.6-11.1,66.9c-1.9,12.2-3.8,24.5-4.8,36.7c-0.7,7.6-1,15.3-1,23
                c0.1,1,0.2,2.1,0.2,3.1c0.1-0.5,0.2-1,0.4-1.5c2.8-10,8-19.2,15.9-26.2c3-2.7,6.4-5,10.1-6.5c0.7-0.3,1.4-0.5,2.1-0.7
                c3-0.9,6.2-1.3,9.3-1.1c1.4,0.1,2.8,0.2,4.2,0.5c10.1,1.8,18.7,8.3,23.7,17.2c0.9,1.6,1.6,3.2,2.3,4.9
                C1477.4,415.9,1477.9,427.3,1476.7,438.6z"
              ></path>
            </g>
            <g
              style={{ visibility: (tooth25.status === 'implant' || tooth25.status === 'middlepart') ? 'hidden' : 'inherit' }}
            >
              <path
                className="st10"
                d="M1477,405.9c-0.8-2.1-1.7-4.2-2.9-6.2c-5-8.9-13.6-15.3-23.7-17.2
                c-1.4-0.3-2.8-0.4-4.2-0.5c-3.2-0.2-6.3,0.2-9.3,1.1c-0.7,0.2-1.4,0.5-2.1,0.7c-3.8,1.5-7.1,3.8-10.1,6.5
                c-7.8,7-13.1,16.3-15.9,26.2c-0.1,0.5-0.3,1-0.4,1.5c-0.1-1-0.2-2-0.2-3.1c0-7.7,0.3-15.3,1-23c1.1-12.2,2.9-24.5,4.8-36.7
                c3.4-22.3,6.8-44.7,11.1-66.9c3.4-17.2,7.4-34.3,11.9-51.3c2.5-9.5,7.5-19,16-17.7c0.2,0,0.4,0.1,0.6,0.1
                c7.9,1.6,10.1,11.8,10.1,21.1c0.1,30.3,1.1,60.6,4.3,90.8c2.4,22.5,6,44.8,8.3,67.2C1476.6,401.1,1476.8,403.5,1477,405.9z"
              ></path>
            </g>
          </g>
          <g className="pulp">
            <g
              className="pulpitis-pfilling"
              data-position="25"
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st22 target"
                d="M1454.8,428.9c-0.2,2.5-0.8,4.9-1.7,7.2c-2.7-1.6-5.9-2.4-9.1-2.2
                c-3.3,0.2-6.5,1.4-9.1,3.4c-1.3-3.6-2.2-7.4-2.6-11.2c-0.2-1.5-0.2-3-0.2-4.5c0.6-12.6,1.4-25.2,2.3-37.7c0.2-0.1,0.3-0.1,0.4-0.2
                c0.7-0.3,1.4-0.5,2.1-0.7c2.5-0.8,5.1-1.1,7.7-1.1c0.4,0,0.8,0,1.2,0c1.4,0.1,2.8,0.2,4.2,0.5c1.1,13.1,2.5,26.2,4.2,39.3
                C1454.8,424,1455,426.4,1454.8,428.9z"
              ></path>
            </g>
            <g
              className="pulpitis-pfilling"
              data-position="25"
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st22 target"
                d="M1450.1,382.2C1450.1,382.2,1450.1,382.3,1450.1,382.2c-1.4-0.2-2.8-0.3-4.2-0.4
                c-0.4,0-0.8,0-1.2,0c-2.6,0-5.2,0.4-7.7,1.1c-0.7,0.2-1.4,0.5-2.1,0.7c-0.2,0.1-0.3,0.1-0.5,0.2c0-0.1,0-0.1,0-0.2
                c1.1-15.9,2.4-31.7,4-47.5c1.1-11.4,2.3-22.8,3.6-34.3c0.7-0.1,1.4-0.2,2.1-0.2c1.1-0.1,2.3-0.1,3.3,0c-0.2,8-0.2,16-0.1,24
                C1447.5,344.5,1448.5,363.4,1450.1,382.2z"
              ></path>
            </g>
            <g
              className="pulpitis-pfilling"
              data-position="25"
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st22 target part"
                d="M1453.2,219.3c-3.4,27.3-5.3,54.7-5.8,82.3c-1.1,0-2.2,0-3.3,0
                c-0.7,0-1.4,0.1-2.1,0.2C1445.1,274.3,1448.9,246.7,1453.2,219.3z"
              ></path>
            </g>
            <g
              className="level periodontitis"
              data-level="1"
              data-position="25"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="1456.7" cy="216.9" r="8.2"></circle>
            </g>
            <g
              className="level periodontitis"
              data-level="2"
              data-position="25"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="1455" cy="208.8" r="17.5"></circle>
            </g>
            <g
              className="level periodontitis"
              data-level="3"
              data-position="25"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="1456.7" cy="196.3" r="30"></circle>
            </g>
          </g>
          <g
            className="pin"
            style={{ visibility: 'inherit', opacity: 0 }}
          >
            <path
              className="st56"
              d="M1476.5 438.6C1475.5 448.2 1473.2 457.7 1469.7 466.8L1445.8 463.9L1419.6 470.6C1415.6 459.7 1412.5 448.6 1410.4 437.3C1409.2 431 1408.3 424.6 1407.8 418.2C1407.9 417.8 1408.5 417.2 1408.6 416.7C1411.4 406.7 1416.6 397.5 1424.5 390.5C1427.1 388.1 1430 386 1433.3 384.6C1433.6 384.4 1433.9 384.3 1434.2 384.2C1434.3 384.1 1434.5 384.1 1434.6 384C1435.3 383.7 1436 383.5 1436.7 383.3C1439.2 382.5 1441.8 382.2 1444.4 382.2C1444.8 382.2 1445.2 382.2 1445.6 382.2C1447 382.3 1448.4 382.4 1449.8 382.7C1450.3 382.8 1450.8 382.9 1451.3 383C1460.7 385.1 1468.8 391.4 1473.5 399.9C1474.6 401.9 1475.5 404 1476.4 406.1C1477.2 416.8 1477.6 427.7 1476.5 438.6Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st57"
              d="M1453.9 464.9L1446.1 464H1446L1433.6 467.2L1442.7 296C1442.9 294.6 1443.1 293.1 1443.3 291.3C1443.7 290.7 1444.3 290.3 1445.1 290.2C1446.4 290.1 1447.6 291.1 1447.6 292.4V293.3V293.4L1453.9 464.9Z"
            ></path>
          </g>
          <g
            className="stump"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st14"
              d="M1451.2,382.8c-0.5-0.1-1-0.2-1.5-0.3c-1.4-0.3-2.8-0.4-4.2-0.5c-0.4,0-0.8,0-1.2,0c-2.6,0-5.2,0.4-7.7,1.1
            c-0.7,0.2-1.4,0.5-2.1,0.7c-0.2,0.1-0.3,0.1-0.4,0.2c-0.3,0.1-0.6,0.3-0.9,0.4l9.6-92.3c0.1-1.1,1-2,2.2-2.1
            c1.3-0.1,2.5,0.9,2.5,2.2L1451.2,382.8z"
            ></path>
            <path
              className="st15"
              d="M1476.5,438.6c-1,9.6-3.3,19.1-6.8,28.2l-23.9-2.9l-26.2,6.7c-4-10.9-7.1-22-9.2-33.3
            c-1.2-6.3-2.1-12.7-2.6-19.1c0.1-0.4,0.7-1,0.8-1.5c2.8-10,8-19.2,15.9-26.2c2.6-2.4,5.5-4.5,8.8-5.9c0.3-0.2,0.6-0.3,0.9-0.4
            c0.1-0.1,0.3-0.1,0.4-0.2c0.7-0.3,1.4-0.5,2.1-0.7c2.5-0.8,5.1-1.1,7.7-1.1c0.4,0,0.8,0,1.2,0c1.4,0.1,2.8,0.2,4.2,0.5
            c0.5,0.1,1,0.2,1.5,0.3c9.4,2.1,17.5,8.4,22.2,16.9c1.1,2,2,4.1,2.9,6.2C1477.2,416.8,1477.6,427.7,1476.5,438.6z"
            ></path>
          </g>
          <g
            className="abutment"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st16"
              d="M1410.4,410.2c0.6-1.6,1.4-3.2,2.2-4.7c2.9-5.6,6.7-10.7,11.5-15c3.5-3.2,7.6-5.9,12.2-7.3
                c3-0.9,6.2-1.3,9.3-1.1c10.9,0.5,20.5,6.5,26.4,15.2c0.5,0.8,1,1.6,1.5,2.4c0.5,0.9,0.9,1.8,1.4,2.7c0.4,0.8,0.7,1.6,1,2.4v-0.6
                l-16.3-31.1l-31-0.7L1410.4,410.2z"
            ></path>
            <path
              className="st17"
              d="M1407.8,418.1c0.6,6.4,1.4,12.8,2.6,19.1c2.1,11.3,5.2,22.4,9.2,33.3l26.2-6.7l23.9,2.9
                c3.5-9.1,5.8-18.6,6.8-28.2c1.1-10.3,0.8-20.7,0-31c0-0.5-0.1-1.1-0.1-1.6c-0.2-0.4-0.3-0.8-0.5-1.2c-0.3-0.8-0.7-1.6-1-2.4
                c-0.4-0.9-0.9-1.8-1.4-2.7c-0.5-0.8-1-1.6-1.5-2.4c-5.9-8.8-15.5-14.7-26.4-15.2c-3.2-0.2-6.3,0.2-9.3,1.1
                c-4.6,1.4-8.7,4.1-12.2,7.3c-4.8,4.3-8.6,9.4-11.5,15c-0.8,1.5-1.5,3.1-2.2,4.7c-0.9,2.1-1.6,4.3-2.2,6.5
                C1408,417.1,1407.9,417.6,1407.8,418.1z"
            ></path>
          </g>
          <g
            className="shaper"
            style={{ visibility: 'hidden' }}
          >
            <path
              className="st44"
              d="M1420.86 412.934C1420.49 415.324 1422.31 417.493 1424.73 417.543L1460.18 418.285C1462.6 418.336 1464.51 416.246 1464.24 413.843L1459.84 374.327C1459.62 372.327 1457.94 370.803 1455.93 370.77L1430.93 370.355C1428.94 370.321 1427.22 371.768 1426.91 373.743L1420.86 412.934Z"
            ></path>
          </g>
          <g
            style={{ visibility: (tooth25.status == 'implant') ? 'inherit' : 'hidden' }}
          >
            <path
              className="st18"
              d="M1423.9,373l42.1,1c0.4-22.3,0.3-44.6-0.4-66.9c-0.6-21.6-1.7-43.2-3.3-64.7c-3.3-4-8-6.4-13.1-6.5
                c-5.4-0.2-10.7,2.1-14.7,6.3c-2.3,22.5-4.4,45.1-6.2,67.6C1426.7,330.9,1425.2,352,1423.9,373z"
            ></path>
            <line
              className="st19"
              x1="1420.8"
              y1="354.7"
              x2="1469.5"
              y2="362.1"
            ></line>
            <line
              className="st19"
              x1="1421.4"
              y1="329.1"
              x2="1470"
              y2="336.5"
            ></line>
            <line
              className="st19"
              x1="1423"
              y1="303.5"
              x2="1471.7"
              y2="310.9"
            ></line>
            <line
              className="st19"
              x1="1423.6"
              y1="277.9"
              x2="1472.3"
              y2="285.3"
            ></line>
            <line
              className="st19"
              x1="1424.2"
              y1="252.3"
              x2="1472.8"
              y2="259.8"
            ></line>
          </g>
          <g className="toutline " style={{ visibility: 'inherit' }}>
            <path
              className="st46"
              d="M1487.8,434.1c-1.9-6.2-5.1-11.9-7.5-17.9c-0.4-1-0.8-2-1.2-3.1
                c-1.6-4.6-3.1-9.2-5.5-13.4c-5.7-10.1-16-17.1-27.9-17.7c-3.1-0.2-6.3,0.2-9.3,1.1c-4.6,1.4-8.7,4.1-12.2,7.3
                c-7.8,7-13.1,16.3-15.9,26.2c-0.3,1.2-0.7,2.5-0.9,3.7c-0.5,2.1-0.9,4.3-1.4,6.4c-1,4.6-2.2,9.2-2.9,13.9c-1,7-0.9,14.1,0.4,21.1
                c1.6,3.8,3.8,7.4,6.6,10.5c4.2,4.7,9.5,8.4,14.2,12.7c0.5,0.5,1,0.9,1.5,1.4c5,4.9,9.2,10.8,15.6,13.7c4.8,2.1,10.4,2.3,15.2,0.1
                c5.8-2.6,9.3-7.9,12.9-12.9c0.1-0.1,0.2-0.3,0.3-0.4c4.2-5.8,8.9-11.3,12.7-17.4c2.8-4.4,5.1-9.1,6.8-14
                C1490.5,448.3,1490,441,1487.8,434.1z"
            ></path>
          </g>
          <g
            className="wedge-shaped"
            style={{ visibility: 'inherit' }}
          >
            <path
              className="st7 st59"
              d="M1483.27 422.955C1484.95 426.605 1486.62 430.256 1487.8 434.1C1490 441 1490.5 448.3 1489.3 455.4C1487.6 460.3 1485.3 465 1482.5 469.4C1480.03 473.369 1477.17 477.085 1474.33 480.794C1472.8 482.785 1471.27 484.774 1469.8 486.8C1469.75 486.85 1469.7 486.925 1469.65 487C1469.6 487.075 1469.55 487.15 1469.5 487.2C1469.25 487.546 1469 487.893 1468.75 488.241C1465.41 492.92 1462 497.68 1456.6 500.1C1451.8 502.3 1446.2 502.1 1441.4 500C1436.65 497.846 1433.11 494.039 1429.56 490.215C1428.32 488.889 1427.09 487.561 1425.8 486.3C1425.55 486.05 1425.3 485.825 1425.05 485.6C1424.8 485.375 1424.55 485.15 1424.3 484.9C1422.59 483.332 1420.79 481.843 1419 480.357C1415.88 477.768 1412.77 475.186 1410.1 472.2C1407.3 469.1 1405.1 465.5 1403.5 461.7C1402.2 454.7 1402.1 447.6 1403.1 440.6C1403.61 437.2 1404.38 433.853 1405.14 430.52C1405.43 429.245 1405.72 427.972 1406 426.7C1406.25 425.65 1406.48 424.575 1406.7 423.5C1406.93 422.425 1407.15 421.35 1407.4 420.3C1407.54 419.456 1407.78 418.563 1408.02 417.691C1408.11 417.322 1408.21 416.956 1408.3 416.6C1411.1 406.7 1416.4 397.4 1424.2 390.4C1427.7 387.2 1431.8 384.5 1436.4 383.1C1439.4 382.2 1442.6 381.8 1445.7 382C1457.6 382.6 1467.9 389.6 1473.6 399.7C1475.79 403.531 1477.23 407.695 1478.68 411.888C1478.82 412.292 1478.96 412.696 1479.1 413.1C1479.5 414.198 1479.9 415.196 1480.3 416.195L1480.3 416.2C1481.21 418.48 1482.24 420.717 1483.27 422.955ZM1466.4 402.366C1462.05 394.761 1454.2 389.49 1445.12 389.038C1442.75 388.887 1440.31 389.189 1438.03 389.866C1434.52 390.921 1431.39 392.954 1428.72 395.363C1422.77 400.634 1418.73 407.637 1416.59 415.092C1416.24 416.482 1415.92 417.877 1415.61 419.273C1415.31 420.611 1416.42 421.85 1417.78 421.706L1469.3 416.249C1470.64 416.107 1471.47 414.706 1470.99 413.445C1470.68 412.61 1470.38 411.769 1470.07 410.928C1469.02 407.999 1467.97 405.071 1466.4 402.366Z"
            ></path>
            <path
              className="st7 target"
              d="M1445.12 389.038C1454.2 389.49 1462.05 394.761 1466.4 402.366C1468.41 405.848 1469.58 409.7 1470.99 413.445C1471.47 414.706 1470.64 416.107 1469.3 416.249L1417.78 421.706C1416.42 421.85 1415.31 420.611 1415.61 419.273C1415.92 417.877 1416.24 416.482 1416.59 415.092C1418.73 407.637 1422.77 400.634 1428.72 395.363C1431.39 392.954 1434.52 390.921 1438.03 389.866C1440.31 389.189 1442.75 388.887 1445.12 389.038Z"
            ></path>
            <path
              className="st60 target stroke"
              d="M1445.12 389.038C1454.2 389.49 1462.05 394.761 1466.4 402.366C1468.41 405.848 1469.58 409.7 1470.99 413.445C1471.47 414.706 1470.64 416.107 1469.3 416.249L1417.78 421.706C1416.42 421.85 1415.31 420.611 1415.61 419.273C1415.92 417.877 1416.24 416.482 1416.59 415.092C1418.73 407.637 1422.77 400.634 1428.72 395.363C1431.39 392.954 1434.52 390.921 1438.03 389.866C1440.31 389.189 1442.75 388.887 1445.12 389.038Z"
            ></path>
          </g>
          <g
            className="tartar"
            style={{ visibility: 'inherit', opacity: 0 }}
          >
            <path
              className="st61 level2"
              d="M1404 435.999L1406 434.499L1407.5 431.499L1409 428.999V424.999L1410.5 422.499L1411.5 418.499V416.499L1413 414.999L1414 410.999L1415.5 407.999L1417 405.999V403.999L1419 399.999L1421.5 397.999L1423 395.499L1427 392.499L1429.5 389.999L1433 388.499L1436 386.999H1440.5L1442.5 385.499H1447.5L1450 386.999H1452.5L1457 388.499L1460 389.999L1461.5 392.499L1464.5 393.499L1467 395.499L1470 399.999L1471.5 401.499L1474 406.999L1475.5 411.999L1477.5 416.499L1478.5 420.499L1480 422.499L1481.5 424.999L1485.5 427.499V425.999L1484.5 422.999V420.499L1483.5 418.499L1481.5 414.999V411.999L1480 408.999L1479 405.499V402.999L1478.5 401.499L1478 397.499L1477.5 395.499V392.499L1476.5 389.999L1475.5 386.999V383.999L1474 382.499L1471.5 379.999L1468 375.999L1464.5 373.999L1461.5 370.499L1458.5 369.499H1455.5L1452.5 366.999L1447.5 365.499L1444 366.999L1440.5 365.499L1436 366.999H1433L1429.5 369.499L1425.5 370.499L1421.5 372.499L1419 375.999L1415.5 379.999H1414L1411.5 382.499L1409 385.499V389.999L1407.5 393.499L1407 395.999V398.999L1406 401.499V404.499L1407 407.999L1406 409.999V413.499L1405 416.499V420.499L1404 424.999L1403.5 427.999V431.499L1404 435.999Z"
            ></path>
            <path
              className="st61 level1"
              d="M1404 436L1406 434.5L1407.5 431.5L1409 429V425L1410.5 422.5L1411.5 418.5V416.5L1413 415L1414 411L1415.5 408L1417 406V404L1419 400L1421.5 398L1423 395.5L1427 392.5L1429.5 390L1433 388.5L1436 387H1440.5L1442.5 385.5H1447.5L1450 387H1452.5L1457 388.5L1460 390L1461.5 392.5L1464.5 393.5L1467 395.5L1470 400L1471.5 401.5L1474 407L1475.5 412L1477.5 416.5L1478.5 420.5L1480 422.5L1481.5 425L1485.5 427.5L1484.5 425L1483.5 422.5V420.5L1481.5 418.5L1481 414.5L1480 412V410L1478.5 408V406L1477.5 404V401.5V399L1476.5 396.5L1475.5 395.5L1472.5 394.5L1471.5 392.5L1468.5 391L1467 389L1461.5 385.5L1460 384.5L1458.5 383L1456 381.5H1451.5L1448.5 379.5H1442.5L1438 381.5H1434.5L1431 383L1425.5 384.5L1423 387L1417 391L1415.5 393.5L1411.5 395.5L1408 399L1407 401.5V404V406.5L1407.5 408V411L1406 415V418.5L1405 421.5V423.5L1404 426L1403.5 428.5L1404 431.5V433.5V436Z"
            ></path>
          </g>
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{ visibility: 'inherit' }}
          >
            <g className="caries-filling" data-position="25_1">
              <path
                className="st58"
                d="M1468.9,429.6c-0.3,0.8-0.4,6.5-0.3,14.2c-5.1-2-14.7-5-24.4-4.1c-7.2,0.7-17,4.8-22.1,7.1
                c-0.5-4.6-1-8.2-1.5-9.8c-1.7-5.2-8.9-12.6-13.1-16.6c0.3-1.2,0.6-2.5,0.9-3.7c2.8-10,8-19.2,15.9-26.2c3.5-3.2,7.6-5.9,12.2-7.3
                c3-0.9,6.2-1.3,9.3-1.1c11.8,0.6,22.2,7.6,27.9,17.7c2.4,4.2,3.8,8.9,5.5,13.4C1475.6,418.5,1469.7,427.6,1468.9,429.6z"
              ></path>
              <path
                className="st8 target"
                d="M1468.9,429.6c-0.3,0.8-0.4,6.5-0.3,14.2c-5.1-2-14.7-5-24.4-4.1c-7.2,0.7-17,4.8-22.1,7.1
                c-0.5-4.6-1-8.2-1.5-9.8c-1.7-5.2-8.9-12.6-13.1-16.6c0.3-1.2,0.6-2.5,0.9-3.7c2.8-10,8-19.2,15.9-26.2c3.5-3.2,7.6-5.9,12.2-7.3
                c3-0.9,6.2-1.3,9.3-1.1c11.8,0.6,22.2,7.6,27.9,17.7c2.4,4.2,3.8,8.9,5.5,13.4C1475.6,418.5,1469.7,427.6,1468.9,429.6z"
              ></path>
            </g>
            <g className="caries-filling" data-position="25_2">
              <path
                className="st58"
                d="M1489.4,455.5c-1.8,4.9-4,9.6-6.8,14c-3.8,6.1-8.5,11.6-12.7,17.4c-0.1,0.1-0.2,0.3-0.3,0.4
                c-0.3-11-0.9-30.3-1-43.5c-0.1-7.7,0-13.4,0.3-14.2c0.8-2,6.7-11.1,10.3-16.5c0.4,1,0.8,2.1,1.2,3.1c2.4,6,5.5,11.7,7.5,17.9
                C1490,441,1490.5,448.3,1489.4,455.5z"
              ></path>
              <path
                className="st8 target"
                d="M1489.4,455.5c-1.8,4.9-4,9.6-6.8,14c-3.8,6.1-8.5,11.6-12.7,17.4c-0.1,0.1-0.2,0.3-0.3,0.4
                c-0.3-11-0.9-30.3-1-43.5c-0.1-7.7,0-13.4,0.3-14.2c0.8-2,6.7-11.1,10.3-16.5c0.4,1,0.8,2.1,1.2,3.1c2.4,6,5.5,11.7,7.5,17.9
                C1490,441,1490.5,448.3,1489.4,455.5z"
              ></path>
            </g>
            <g className="caries-filling" data-position="25_5">
              <path
                className="st58"
                d="M1469.6,487.3c-3.6,5-7.1,10.3-12.9,12.9c-4.8,2.2-10.4,2-15.2-0.1c-6.5-2.9-10.7-8.8-15.7-13.7
                c-0.5-0.5-1-0.9-1.5-1.4c-0.5-10.9-1.3-27.5-2.3-38.2c5.1-2.3,14.9-6.4,22.1-7.1c9.7-0.9,19.3,2.1,24.4,4.1
                C1468.7,457,1469.2,476.3,1469.6,487.3z"
              ></path>
              <path
                className="st8 target"
                d="M1469.6,487.3c-3.6,5-7.1,10.3-12.9,12.9c-4.8,2.2-10.4,2-15.2-0.1c-6.5-2.9-10.7-8.8-15.7-13.7
                c-0.5-0.5-1-0.9-1.5-1.4c-0.5-10.9-1.3-27.5-2.3-38.2c5.1-2.3,14.9-6.4,22.1-7.1c9.7-0.9,19.3,2.1,24.4,4.1
                C1468.7,457,1469.2,476.3,1469.6,487.3z"
              ></path>
            </g>
            <g className="caries-filling" data-position="25_4">
              <path
                className="st58"
                d="M1424.4,485c-4.7-4.3-10-8-14.2-12.7c-2.8-3.1-5-6.7-6.6-10.5c-1.3-7-1.4-14.1-0.4-21.1
                c0.7-4.7,1.9-9.3,2.9-13.9c0.5-2.1,0.9-4.3,1.4-6.4c4.2,4,11.3,11.4,13.1,16.6c0.5,1.6,1,5.2,1.5,9.8
                C1423.1,457.5,1423.9,474.1,1424.4,485z"
              ></path>
              <path
                className="st8 target"
                d="M1424.4,485c-4.7-4.3-10-8-14.2-12.7c-2.8-3.1-5-6.7-6.6-10.5c-1.3-7-1.4-14.1-0.4-21.1
                c0.7-4.7,1.9-9.3,2.9-13.9c0.5-2.1,0.9-4.3,1.4-6.4c4.2,4,11.3,11.4,13.1,16.6c0.5,1.6,1,5.2,1.5,9.8
                C1423.1,457.5,1423.9,474.1,1424.4,485z"
              ></path>
            </g>
            <g className="with">
              <path
                className="st54"
                d="M1468.5 443.999L1469 479.999"
              ></path>
              <path
                className="st54"
                d="M1468.5 443.999C1468.5 430.999 1468.4 424.699 1476 417.499"
              ></path>
              <path
                className="st54"
                d="M1468.5 443.999C1461 439.833 1441.2 434.499 1422 446.499"
              ></path>
              <path
                className="st54"
                d="M1422 446.499C1421 430.499 1418.6 426.799 1411 423.999"
              ></path>
              <path
                className="st54"
                d="M1422 446.999L1424 477.499"
              ></path>
            </g>
          </g>
          <g
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              <path
                className="st55"
                d="M1487.8 434.1C1485.9 427.9 1482.7 422.2 1480.3 416.2C1479.9 415.2 1479.5 414.2 1479.1 413.1C1477.5 408.5 1476 403.9 1473.6 399.7C1467.9 389.6 1457.6 382.6 1445.7 382C1442.6 381.8 1439.4 382.2 1436.4 383.1C1431.8 384.5 1427.7 387.2 1424.2 390.4C1416.4 397.4 1411.1 406.7 1408.3 416.6C1408 417.8 1407.6 419.1 1407.4 420.3C1406.9 422.4 1406.5 424.6 1406 426.7C1405 431.3 1403.8 435.9 1403.1 440.6C1402.1 447.6 1402.2 454.7 1403.5 461.7C1405.1 465.5 1407.3 469.1 1410.1 472.2C1414.3 476.9 1419.6 480.6 1424.3 484.9C1424.8 485.4 1425.3 485.8 1425.8 486.3C1430.8 491.2 1435 497.1 1441.4 500C1446.2 502.1 1451.8 502.3 1456.6 500.1C1462.4 497.5 1465.9 492.2 1469.5 487.2C1469.6 487.1 1469.7 486.9 1469.8 486.8C1474 481 1478.7 475.5 1482.5 469.4C1485.3 465 1487.6 460.3 1489.3 455.4C1490.5 448.3 1490 441 1487.8 434.1Z"
              ></path>
            </g>
          </g>
          <g className="crown" style={{ visibility: tooth25.status !== 'exist' && tooth25.status ? 'inherit' : 'hidden', opacity: (tooth25.status !== 'exist') ? 1 : 0 }}>
            <path
              className={`st46 target temporary-crown crown-fill blue`}
              d="M1487.8,434.1c-1.9-6.2-5.1-11.9-7.5-17.9c-0.4-1-0.8-2-1.2-3.1
                c-1.6-4.6-3.1-9.2-5.5-13.4c-5.7-10.1-16-17.1-27.9-17.7c-3.1-0.2-6.3,0.2-9.3,1.1c-4.6,1.4-8.7,4.1-12.2,7.3
                c-7.8,7-13.1,16.3-15.9,26.2c-0.3,1.2-0.7,2.5-0.9,3.7c-0.5,2.1-0.9,4.3-1.4,6.4c-1,4.6-2.2,9.2-2.9,13.9c-1,7-0.9,14.1,0.4,21.1
                c1.6,3.8,3.8,7.4,6.6,10.5c4.2,4.7,9.5,8.4,14.2,12.7c0.5,0.5,1,0.9,1.5,1.4c5,4.9,9.2,10.8,15.6,13.7c4.8,2.1,10.4,2.3,15.2,0.1
                c5.8-2.6,9.3-7.9,12.9-12.9c0.1-0.1,0.2-0.3,0.3-0.4c4.2-5.8,8.9-11.3,12.7-17.4c2.8-4.4,5.1-9.1,6.8-14
                C1490.5,448.3,1490,441,1487.8,434.1z"
            ></path>
          </g>
        </g>
      </g>
    </>
  );
}
