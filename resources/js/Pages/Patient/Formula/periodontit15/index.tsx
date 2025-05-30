import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage15() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth15Diagnozis = teethDiagnozis.tooth15;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth15Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
          // opacity: ((tooth15Diagnozis.periodontit && pStage === 'st1' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="641.5" cy="216.9" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth15Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
          // opacity: ((tooth15Diagnozis.periodontit && pStage === 'st2' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="643.2" cy="208.8" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth15Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
          // opacity: ((tooth15Diagnozis.periodontit && pStage === 'st3' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="641.5" cy="196.3" r="30" />
      </g>
    </>
  );
}
