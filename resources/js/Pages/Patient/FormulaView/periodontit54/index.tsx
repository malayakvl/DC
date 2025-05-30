import React from 'react';

export default function PeriodontitStage54({ toothData }) {
  const tooth54Diagnozis = toothData;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth54Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="509.3" cy="248.9" r="8.2"></circle>
        <circle className="st42" cx="544.9" cy="233.4" r="8.2"></circle>
        <circle className="st42" cx="582.5" cy="249.9" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth54Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="510.6" cy="241.8" r="17.5"></circle>
        <circle className="st42" cx="547.2" cy="226.2" r="17.5"></circle>
        <circle className="st42" cx="583.3" cy="241.8" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth54Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="581.2" cy="228.1" r="30"></circle>
        <circle className="st42" cx="545.9" cy="214.1" r="30"></circle>
        <circle className="st42" cx="509.6" cy="229.3" r="30"></circle>
      </g>
    </>
  );
}
