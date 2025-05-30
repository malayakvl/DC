import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage24() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth24Diagnozis = teethDiagnozis.tooth24;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth24Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
          // opacity: ((tooth14Diagnozis.periodontit && pStage === 'st1' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="706.5" cy="227.3" r="8.2" />
        <circle className="st42" cx="739" cy="228.8" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth24Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
          // opacity: ((tooth14Diagnozis.periodontit && pStage === 'st2' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="743.9" cy="222" r="17.5" />
        <circle className="st42" cx="710" cy="220.2" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth24Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
          // opacity: ((tooth14Diagnozis.periodontit && pStage === 'st3' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="708.9" cy="205.8" r="30" />
        <circle className="st42" cx="742" cy="209.5" r="30" />
      </g>
    </>
  );
}
