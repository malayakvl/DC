import React from 'react';

export default function PeriodontitStage81({ toothData }) {
  const tooth81Diagnozis = toothData;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth81Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1003.2" cy="1364.7" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth81Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1002.2" cy="1372.9" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth81Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="998.2" cy="1382.9" r="30"></circle>
      </g>
    </>
  );
}
