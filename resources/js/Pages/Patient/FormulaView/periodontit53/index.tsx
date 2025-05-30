import React from 'react';

export default function PeriodontitStage53({ toothData }) {
  const tooth53Diagnozis = toothData;
  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth53Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="793.1" cy="199.8" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth53Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="795" cy="192.8" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth53Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="792.3" cy="180.3" r="30"></circle>
      </g>
    </>
  );
}
