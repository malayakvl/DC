import React from 'react';

export default function Bone42({ formulaToothData }) {
  const tooth42Diagnozis = formulaToothData;

  return (
    <g
      className="df-bone top"
      style={{ opacity: 1, transition: 'opacity 0.2s' }}
    >
      <g
        style={{ opacity: tooth42Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M984.5,1216.9c-1.8,49.2-3.8,102.1-5.8,151c-0.2,4.6-0.4,9.3-0.6,14.1
                            c-0.1,2.8-0.2,5.6-0.3,8.5c-1.6,40.2-3.2,86-4.7,124.5c-15.4-0.6-30.8-1.3-46.1-2.2c-12.1-0.7-24.2-1.5-36.3-2.7
                            c4.1-47.7,8.1-103,12.1-150.2c4.1-47.3,8.1-98.5,12.2-146.1c0.3-0.1,0.7-0.1,1-0.1c2.2,0.2,3.6,1.9,4.9,3.4
                            c3.8,4.6,8.7,11.6,13.7,14.7c5.3,3.4,11.1,5.9,17.8,5.7c11.6-0.4,19.5-11.9,28.1-18.5C981.7,1218.2,983,1217.3,984.5,1216.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M914.9,1213.9c0.3-0.1,0.7-0.1,1-0.1c2.2,0.2,3.6,1.9,4.9,3.4c3.8,4.6,8.7,11.6,13.7,14.7
                            c5.3,3.4,11.1,5.9,17.8,5.7c11.6-0.4,19.5-11.9,28.1-18.5c1.2-1,2.6-1.9,4-2.3"
          style={{ strokeWidth: tooth42Diagnozis.inflamed_gums ? 5 :
              tooth42Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth42Diagnozis.parodontit &&
              tooth42Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M983.4,1246.7c-1.5,40.3-3.1,82.1-4.7,121.2c-0.2,4.6-0.4,9.3-0.6,14.1
                            c-0.1,2.8-0.2,5.6-0.3,8.5c-1.6,40.2-3.2,86-4.7,124.5c-15.4-0.6-30.8-1.3-46.1-2.2c-12.1-0.7-24.2-1.5-36.3-2.7
                            c4.1-47.7,8.1-103,12.2-150.2c3.2-37.3,6.4-77,9.6-115.5c0.1,0,0.1,0,0.2,0c6,0,13.3,18.4,40.7,17.7
                            C974.2,1261.5,978.4,1248.8,983.4,1246.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M912.3,1244.5c0.1,0,0.1,0,0.2,0c6,0,13.3,18.4,40.7,17.7c21-0.6,25.2-13.3,30.2-15.4"
          style={{ strokeWidth: tooth42Diagnozis.inflamed_gums ? 5 :
              tooth42Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth42Diagnozis.parodontit &&
              tooth42Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M982.2,1276.6c-1.2,30.8-2.4,61.8-3.6,91.3c-0.2,4.6-0.4,9.3-0.6,14.1
                            c-0.1,2.8-0.2,5.6-0.3,8.5c-1.6,40.2-3.2,86-4.7,124.5c-15.4-0.6-30.8-1.3-46.1-2.2c-12.1-0.7-24.2-1.5-36.3-2.7
                            c4.1-47.7,8.1-103,12.2-150.2c2.3-26.6,4.5-54.4,6.8-82.1c0.2-0.1,0.5-0.1,0.7-0.1c6.2-0.3,12.4,14.7,39.8,13.9
                            C971.1,1291.1,976.9,1278.6,982.2,1276.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M909.5,1277.9c0.2-0.1,0.5-0.1,0.7-0.1c6.2-0.3,12.4,14.7,39.8,13.9
                        c21.1-0.6,26.9-13.1,32.2-15.1"
          style={{ strokeWidth: tooth42Diagnozis.inflamed_gums ? 5 :
              tooth42Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth42Diagnozis.parodontit &&
              tooth42Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M981.1,1305.6c-0.8,21.1-1.7,42.1-2.5,62.3c-0.2,4.6-0.4,9.3-0.6,14.1
                            c-0.1,2.8-0.2,5.6-0.3,8.5c-1.6,40.2-3.2,86-4.7,124.5c-15.4-0.6-30.8-1.3-46.1-2.2c-12.1-0.7-24.2-1.5-36.3-2.7
                            c4.1-47.7,8.1-103,12.2-150.2c1.5-18.1,3.1-36.7,4.7-55.5c0.2,0,0.4-0.1,0.6-0.1c5.6,0.1,12.4,19.3,39.8,18.5
                            C968.6,1322.3,976.2,1308,981.1,1305.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M907.4,1304.4c0.2,0,0.4-0.1,0.6-0.1c5.6,0.1,12.4,19.3,39.8,18.5
                            c20.9-0.6,28.5-14.9,33.4-17.3"
          style={{ strokeWidth: tooth42Diagnozis.inflamed_gums ? 5 :
              tooth42Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
