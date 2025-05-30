import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage25() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth25Diagnozis = teethDiagnozis.tooth25;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth25Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
          // opacity: ((tooth25Diagnozis.periodontit && pStage === 'st1' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="1456.7" cy="216.9" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth25Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
          // opacity: ((tooth25Diagnozis.periodontit && pStage === 'st2' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="1455" cy="208.8" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth25Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
          // opacity: ((tooth25Diagnozis.periodontit && pStage === 'st3' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="1456.7" cy="196.3" r="30" />
      </g>
    </>
  );
}
