import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage48() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth48Diagnozis = teethDiagnozis.tooth48;

  return (
    <>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth48Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="227" cy="1211.7" r="8.2" />
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth48Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="226.4" cy="1218.3" r="17.5" />
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth48Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="223" cy="1229.6" r="30" />
      </g>
    </>
  );
}
