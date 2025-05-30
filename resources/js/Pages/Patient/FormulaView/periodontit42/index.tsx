import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage42() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth42Diagnozis = teethDiagnozis.tooth42;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth42Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="939.3" cy="1369.9" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth42Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="938" cy="1376.7" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth42Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="933.5" cy="1386.4" r="30" />
      </g>
    </>
  );
}
