import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage23() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth23Diagnozis = teethDiagnozis.tooth23;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth23Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
          // opacity: ((tooth23Diagnozis.periodontit && pStage === 'st1' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="1305.1" cy="199.8" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth23Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
          // opacity: ((tooth23Diagnozis.periodontit && pStage === 'st2' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="1303.1" cy="192.8" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth23Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
          // opacity: ((tooth23Diagnozis.periodontit && pStage === 'st3' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="1305.9" cy="180.3" r="30" />
      </g>
    </>
  );
}
