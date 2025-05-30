import React from 'react';

export default function PeriodontitStage63({ toothData }) {
  const tooth63Diagnozis = toothData;
  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth63Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1210.1" cy="273.3" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth63Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1209.1" cy="264.8" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth63Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1209.1" cy="252.3" r="30"></circle>
      </g>
    </>
  );
}
