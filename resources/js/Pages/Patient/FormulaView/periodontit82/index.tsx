import React from 'react';

export default function PeriodontitStage82({ toothData }) {
  const tooth82Diagnozis = toothData;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth82Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="939.3" cy="1369.9" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth82Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="938" cy="1376.7" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth82Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="933.5" cy="1386.4" r="30"></circle>
      </g>
    </>
  );
}
