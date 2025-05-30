import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage62() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth62Diagnozis = teethDiagnozis.tooth62;
  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth62Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1210.1" cy="273.3" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth62Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1209.1" cy="264.8" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth62Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1209.1" cy="252.3" r="30"></circle>
      </g>
    </>
  );
}
