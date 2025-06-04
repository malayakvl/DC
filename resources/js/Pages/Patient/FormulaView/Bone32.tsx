import React from 'react';


export default function Bone32({ formulaToothData }) {
  const tooth32Diagnozis = formulaToothData;

  return (
    <g
      id={'B-32'}
      className="df-bone top"
      style={{ opacity: 1, transition: 'opacity 0.2s' }}
    >
      <g
        style={{ opacity: tooth32Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M1114.4,1216.9c1.8,49.2,3.8,102.1,5.8,151c0.2,4.6,0.4,9.3,0.6,14.1
                c0.1,2.8,0.2,5.6,0.3,8.5c1.6,40.2,3.2,86,4.7,124.5c15.4-0.6,30.8-1.3,46.1-2.2c12.1-0.7,24.2-1.5,36.3-2.7
                c-4.1-47.7-8.1-103-12.1-150.2c-4.1-47.3-8.1-98.5-12.2-146.1c-0.3-0.1-0.7-0.1-1-0.1c-2.2,0.2-3.6,1.9-4.9,3.4
                c-3.8,4.6-8.7,11.6-13.7,14.7c-5.3,3.4-11.1,5.9-17.8,5.7c-11.6-0.4-19.5-11.9-28.1-18.5
                C1117.2,1218.2,1115.9,1217.3,1114.4,1216.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M1184,1213.9c-0.3-0.1-0.7-0.1-1-0.1c-2.2,0.2-3.6,1.9-4.9,3.4c-3.8,4.6-8.7,11.6-13.7,14.7
                c-5.3,3.4-11.1,5.9-17.8,5.7c-11.6-0.4-19.5-11.9-28.1-18.5c-1.2-1-2.6-1.9-4-2.3"
          style={{ strokeWidth: tooth32Diagnozis.inflamed_gums ? 5 :
              tooth32Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth32Diagnozis.parodontit &&
              tooth32Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1115.5,1246.7c1.5,40.3,3.1,82.1,4.7,121.2c0.2,4.6,0.4,9.3,0.6,14.1
                c0.1,2.8,0.2,5.6,0.3,8.5c1.6,40.2,3.2,86,4.7,124.5c15.4-0.6,30.8-1.3,46.1-2.2c12.1-0.7,24.2-1.5,36.3-2.7
                c-4.1-47.7-8.1-103-12.2-150.2c-3.2-37.3-6.4-77-9.6-115.5c-0.1,0-0.1,0-0.2,0c-6,0-13.3,18.4-40.7,17.7
                C1124.7,1261.5,1120.5,1248.8,1115.5,1246.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M1186.6,1244.5c-0.1,0-0.1,0-0.2,0c-6,0-13.3,18.4-40.7,17.7
                    c-21-0.6-25.2-13.3-30.2-15.4"
          style={{ strokeWidth: tooth32Diagnozis.inflamed_gums ? 5 :
              tooth32Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth32Diagnozis.parodontit &&
              tooth32Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1116.6,1276.6c1.2,30.8,2.4,61.8,3.6,91.3c0.2,4.6,0.4,9.3,0.6,14.1
                c0.1,2.8,0.2,5.6,0.3,8.5c1.6,40.2,3.2,86,4.7,124.5c15.4-0.6,30.8-1.3,46.1-2.2c12.1-0.7,24.2-1.5,36.3-2.7
                c-4.1-47.7-8.1-103-12.2-150.2c-2.3-26.6-4.5-54.4-6.8-82.1c-0.2-0.1-0.5-0.1-0.7-0.1c-6.2-0.3-12.4,14.7-39.8,13.9
                C1127.7,1291.1,1122,1278.6,1116.6,1276.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M1189.3,1277.9c-0.2-0.1-0.5-0.1-0.7-0.1c-6.2-0.3-12.4,14.7-39.8,13.9
                c-21.1-0.6-26.9-13.1-32.2-15.1"
          style={{ strokeWidth: tooth32Diagnozis.inflamed_gums ? 5 :
              tooth32Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth32Diagnozis.parodontit &&
              tooth32Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1117.7,1305.6c0.8,21.1,1.7,42.1,2.5,62.3c0.2,4.6,0.4,9.3,0.6,14.1
                c0.1,2.8,0.2,5.6,0.3,8.5c1.6,40.2,3.2,86,4.7,124.5c15.4-0.6,30.8-1.3,46.1-2.2c12.1-0.7,24.2-1.5,36.3-2.7
                c-4.1-47.7-8.1-103-12.2-150.2c-1.5-18.1-3.1-36.7-4.7-55.5c-0.2,0-0.4-0.1-0.6-0.1c-5.6,0.1-12.4,19.3-39.8,18.5
                C1130.3,1322.3,1122.7,1308,1117.7,1305.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M1191.5,1304.5c-0.2,0-0.4-0.1-0.6-0.1c-5.6,0.1-12.4,19.3-39.8,18.5
                c-20.9-0.6-28.5-14.9-33.4-17.3"
          style={{ strokeWidth: tooth32Diagnozis.inflamed_gums ? 5 :
              tooth32Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
