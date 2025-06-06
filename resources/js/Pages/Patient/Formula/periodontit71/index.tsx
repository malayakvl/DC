import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage71() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth71Diagnozis = teethDiagnozis.tooth71;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth71Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1094.9" cy="1364.7" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth71Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1095.9" cy="1372.9" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth71Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1100" cy="1382.9" r="30"></circle>
      </g>
    </>
  );
}
