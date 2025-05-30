import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage61() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth61Diagnozis = teethDiagnozis.tooth61;
  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth61Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1125.2" cy="234.2" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth61Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1122.8" cy="227.8" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth61Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1125.2" cy="215.3" r="30"></circle>
      </g>
    </>
  );
}
