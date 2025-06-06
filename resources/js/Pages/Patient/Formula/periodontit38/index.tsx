import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage38() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth38Diagnozis = teethDiagnozis.tooth38;

  return (
    <>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth38Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1871.2" cy="1211.7" r="8.2" />
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth38Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1871.8" cy="1218.3" r="17.5" />
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth38Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1875.2" cy="1229.6" r="30" />
      </g>
    </>
  );
}
