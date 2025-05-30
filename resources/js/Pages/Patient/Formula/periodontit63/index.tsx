import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage63() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth63Diagnozis = teethDiagnozis.tooth63;
  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth63Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1210.1" cy="199.8" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth63Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1209.1" cy="192.8" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth63Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1209.1" cy="180.3" r="30"></circle>
      </g>
    </>
  );
}
