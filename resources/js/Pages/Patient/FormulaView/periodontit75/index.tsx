import React from 'react';

export default function PeriodontitStage75({ toothData }) {
  const tooth75Diagnozis = toothData;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth75Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1802.4" cy="1280.1" r="8.2"></circle>
        <circle className="st42" cx="1742.6" cy="1297.8" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth75Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1802.4" cy="1287.4" r="17.5"></circle>
        <circle className="st42" cx="1743.8" cy="1306" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth75Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1804.9" cy="1298.9" r="30"></circle>
        <circle className="st42" cx="1747.5" cy="1315.3" r="30"></circle>
      </g>
    </>
  );
}
