import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage41() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth41Diagnozis = teethDiagnozis.tooth41;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth41Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1003.2" cy="1364.7" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth41Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1002.2" cy="1372.9" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth41Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="998.2" cy="1382.9" r="30" />
      </g>
    </>
  );
}
