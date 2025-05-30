import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage45() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth45Diagnozis = teethDiagnozis.tooth45;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth45Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="629.2" cy="1347.7" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth45Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="627.4" cy="1354.5" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth45Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="625.2" cy="1367" r="30" />
      </g>
    </>
  );
}
