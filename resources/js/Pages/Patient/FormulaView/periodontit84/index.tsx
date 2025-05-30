import React from 'react';

export default function PeriodontitStage84({ toothData }) {
  const tooth84Diagnozis = toothData;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth84Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="454.5" cy="1329.2" r="8.2"></circle>
        <circle className="st42" cx="548.4" cy="1345.3" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth84Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="454.5" cy="1335" r="17.5"></circle>
        <circle className="st42" cx="545.7" cy="1352.3" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth84Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="452.1" cy="1345.3" r="30"></circle>
        <circle className="st42" cx="545.7" cy="1363.6" r="30"></circle>
      </g>
    </>
  );
}
