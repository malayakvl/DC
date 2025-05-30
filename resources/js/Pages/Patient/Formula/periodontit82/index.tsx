import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage82() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth82Diagnozis = teethDiagnozis.tooth82;

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
