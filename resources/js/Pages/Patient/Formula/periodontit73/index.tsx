import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage73() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth73Diagnozis = teethDiagnozis.tooth73;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth73Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1241.4" cy="1396.1" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth73Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1242.1" cy="1402.3" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth73Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1245.8" cy="1414.8" r="30"></circle>
      </g>
    </>
  );
}
