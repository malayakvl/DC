import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage13() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth13Diagnozis = teethDiagnozis.tooth13;
  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth13Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
          // opacity: ((tooth13Diagnozis.periodontit && pStage === 'st1' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="793.1" cy="199.8" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth13Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
          // opacity: ((tooth13Diagnozis.periodontit && pStage === 'st2' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="795" cy="192.8" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth13Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
          // opacity: ((tooth13Diagnozis.periodontit && pStage === 'st3' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="792.3" cy="180.3" r="30" />
      </g>
    </>
  );
}
