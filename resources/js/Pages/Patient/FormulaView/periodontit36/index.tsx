import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage36() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth36Diagnozis = teethDiagnozis.tooth36;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth36Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1643.7" cy="1329.2" r="8.2"></circle>
        <circle className="st42" cx="1549.8" cy="1345.3" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth36Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1643.7" cy="1335" r="17.5"></circle>
        <circle className="st42" cx="1552.5" cy="1352.3" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth36Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1646.1" cy="1345.3" r="30"></circle>
        <circle className="st42" cx="1552.5" cy="1363.6" r="30"></circle>
      </g>
    </>
  );
}
