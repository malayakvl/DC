import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage34() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth34Diagnozis = teethDiagnozis.tooth34;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth34Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1345.6" cy="1360.7" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth34Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1347.6" cy="1368.9" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth34Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1349.2" cy="1379.2" r="30" />
      </g>
    </>
  );
}
