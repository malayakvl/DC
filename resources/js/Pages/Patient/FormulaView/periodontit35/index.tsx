import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage35() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth35Diagnozis = teethDiagnozis.tooth35;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth35Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1468.9" cy="1347.7" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth35Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1470.7" cy="1354.5" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth35Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1472.9" cy="1367" r="30" />
      </g>
    </>
  );
}
