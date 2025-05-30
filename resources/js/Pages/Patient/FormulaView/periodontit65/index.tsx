import React from 'react';

export default function PeriodontitStage54({ toothData }) {
  const tooth65Diagnozis = toothData;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth65Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1735.3" cy="237.3" r="8.2"></circle>
        <circle className="st42" cx="1684.2" cy="215" r="8.2"></circle>
        <circle className="st42" cx="1665.1" cy="239.6" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth65Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1734.2" cy="229.2" r="17.5"></circle>
        <circle className="st42" cx="1681.8" cy="206.8" r="17.5"></circle>
        <circle className="st42" cx="1662.3" cy="231.3" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth65Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1664.3" cy="218.8" r="30"></circle>
        <circle className="st42" cx="1685.5" cy="194.1" r="30"></circle>
        <circle className="st42" cx="1734.2" cy="215.8" r="30"></circle>
      </g>
    </>
  );
}
