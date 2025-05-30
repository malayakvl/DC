import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage44() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth44Diagnozis = teethDiagnozis.tooth44;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth44Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="752.6" cy="1360.7" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth44Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="750.6" cy="1368.9" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth44Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="748.9" cy="1379.2" r="30" />
      </g>
    </>
  );
}
