import React from 'react';


export default function Tooth42({ psrValue, psrStar }) {


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
            d="M978.8,1202.9c0,0-2,48-5,71s-6,60-11,77s-14,29-25,28s-15-12-17-30
                        s-2-66-2-90s-2.7-79-3.3-98c-1.7-62,17.3-79,16.3-107s-15-43.5-15-67.2c0-23.8,0.6-158.8,2-173.8c2-21,16-28,29-29s34,4,36,38
                        s-0.8,161-1,167c-1,26-16,39-16,68s17,49,15,87S978.8,1202.9,978.8,1202.9z"
          />
        </g>
        <g
          id="TH-42"
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              style={{
                visibility:'inherit'}}
            >
              <path
                className={`st10 change-color-psr-up color-dia-${psrValue} ${psrStar === 1 ? "star" : ''}`}
                d="M975.2,1172.7c0,5.2-0.1,10.4-0.3,15.6c-0.7,18.5-2.5,37.1-4.5,55.6
                                c-2.1,19.9-4.5,39.7-7.2,59.5c-2.1,15.4-4.5,30.8-8.9,45.6c-1.7,5.7-4.6,10.8-7.9,14.4c-0.1,0.1-0.3,0.3-0.4,0.4
                                c0.1-0.1,0.3-0.3,0.4-0.4c3.3-3.5,6.2-8.7,7.9-14.4c4.4-14.8,6.8-30.2,8.9-45.6c2.7-19.8,5.1-39.6,7.2-59.5
                                c1.7-15.4,3.2-30.9,4-46.3c-0.4,1.4-0.8,2.8-1.2,4.1c-3,9.4-6.9,19-15.3,23.9c-1.4,0.8-2.9,1.5-4.4,1.9c-3.6,1.1-7.4,1.3-11.1,0.4
                                c-2.3-0.5-4.5-1.5-6.5-2.8c-4.9-3.2-8.1-8.1-10.4-13.5c-0.1-6.9-0.2-13.8,0.1-20.7c0.2-5.1,0.6-10.1,1.1-15.2
                                c0.9-8.7,2.3-17.4,4.1-26l0.9-1.5l1.6-1.4l37.9-0.1l1.8,1l1.4,2.5C974.8,1157.8,975.2,1165.2,975.2,1172.7z"
              />
            </g>
            <g
              style={{
                visibility:'inherit'}}
            >
              <path
                className={`st10 change-color-psr color-dia-${psrValue} ${psrStar === 1 ? "star" : ''}`}
                d="M974.4,1197.5c-0.9,15.4-2.4,30.9-4,46.3c-2.1,19.9-4.6,39.7-7.2,59.5
                                c-2.1,15.4-4.5,30.8-8.9,45.6c-1.7,5.7-4.6,10.8-7.9,14.4c-2.1,2.2-4.4,3.7-6.9,3.9c0,0-0.1,0-0.1,0c-1,0.1-1.9,0-3-0.4
                                c-2.8-0.9-4.2-3.1-5.3-5.7c-1.8-4.5-2.7-10-2.9-15.3c-0.3-6.7-0.4-13.3-0.7-20c-0.4-8.3-1-16.6-1.4-24.9c-0.5-11-0.7-22-0.6-33
                                c0.1-10.3,0.4-20.7,0.4-31c-0.1-8.5-0.4-16.9-0.6-25.3c2.3,5.4,5.5,10.3,10.5,13.6c2,1.3,4.2,2.2,6.5,2.8
                                c3.6,0.9,7.5,0.7,11.1-0.4c1.5-0.5,3-1.1,4.4-1.9c8.4-4.9,12.4-14.5,15.3-23.9C973.6,1200.3,974,1198.9,974.4,1197.5z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top`}
                d="M958.4,1196.3c-0.7,6.6-1.9,13-3,19.5c-0.7,3.9-1.3,7.8-2,11.7c0,0,0,0,0,0
                                c-0.3,0.1-0.5,0.2-0.8,0.2c-0.5,0.1-0.9,0.2-1.4,0.3c-0.1,0-0.3,0.1-0.4,0.1c-0.5,0.1-0.9,0.1-1.4,0.2c-0.2,0-0.4,0.1-0.7,0.1
                                c-0.1,0-0.2,0-0.3,0c-0.5,0-0.9,0.1-1.4,0.1h-0.1c-0.3,0-0.6,0-0.9,0c-0.1,0-0.3,0-0.4,0c-0.3,0-0.5,0-0.8-0.1
                                c-0.2,0-0.4,0-0.6-0.1c-0.1,0-0.2,0-0.3,0c-0.4-0.1-0.9-0.1-1.3-0.2c-0.1,0-0.2-0.1-0.4-0.1c0-4.1-0.1-8.2-0.3-12.3
                                c-0.2-4.5-0.5-9-0.6-13.5c0-4.8,0.2-9.7,0.7-14.5c0.4-4,0.9-8.1,1.5-12.1l1-1.8l13,0.2l1.2,2
                                C959.3,1182.7,959.1,1189.5,958.4,1196.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target top`}
                d="M941,1297.7c1.1,0.2,2.2,0.2,3.2,0.2c0.6,0,1.2,0,1.8-0.1
                                c0.2-2.6,0.4-5.2,0.6-7.8c1-13.4,2.1-26.7,3.8-40c0.9-7.5,2-15,3.2-22.5c0,0,0,0,0,0c0,0,0,0,0,0c-0.5,0.2-1,0.3-1.5,0.4
                                c-0.3,0.1-0.6,0.1-0.9,0.2c-0.8,0.1-1.5,0.2-2.3,0.3c-0.1,0-0.1,0-0.2,0c-0.5,0-0.9,0-1.4,0H947c-0.3,0-0.6,0-0.8,0
                                c-0.2,0-0.3,0-0.5,0c-0.2,0-0.5-0.1-0.7-0.1c-0.2,0-0.5-0.1-0.7-0.1h-0.1c-0.5-0.1-1-0.2-1.4-0.3c-0.1,0-0.2-0.1-0.4-0.1
                                c0,0,0,0,0,0c0,4.8,0,9.6-0.1,14.5c-0.2,15.7-0.7,31.5-1.1,47.2C941.1,1292.3,941,1295,941,1297.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target top`}
                d="M939.4,1367.2L939.4,1367.2c1.7-13.7,3.2-27.5,4.3-41.3
                                c0.8-9.4,1.5-18.8,2.2-28.2c-0.6,0.1-1.2,0.1-1.8,0.1c-1,0-2.1,0-3.2-0.2c-0.3,10.9-0.6,21.8-0.9,32.7
                                c-0.3,12.3-0.6,24.6-0.8,36.8c0,0.4,0,0.7,0,1.1C939.3,1367.9,939.4,1367.6,939.4,1367.2z"
              />
            </g>
          </g>
          <g
            className="toutline"
            style={{
              visibility:'inherit'}}
          >
            <path
              className="st46"
              d="M981.8,1129c0.4-2.1-0.6-4.3-2.5-5.3c-0.8-0.4-1.6-0.6-2.5-0.6l-9-0.1l-28.2-0.2
                            l-17.6-0.2c-1.5,0.4-2.8,1.3-3.8,2.6c-1.1,1.4-1.6,3.2-1.5,4.9c-1,17.5-0.3,35.1,1.8,52.5c0.7,5.5,1.5,11.1,2.8,16.5
                            c1,3.9,2.2,7.8,3.7,11.5c2.4,5.7,5.6,11,10.8,14.4c6.7,4.3,15.1,4.4,22,0.4c8.1-4.7,12.1-13.7,15-22.8c0.1-0.4,0.2-0.7,0.4-1.1
                            c3.6-11.6,6.2-23.5,7.7-35.6C982.3,1153.8,982.6,1141.4,981.8,1129z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
