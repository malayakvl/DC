import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage18() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth18Diagnozis = teethDiagnozis.tooth18;

  return (
    <>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth18Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
          // opacity: ((tooth18Diagnozis.periodontit && (pStage === 'st1' || (activeNumber === 18 && subDiagnozis === 'st1')) ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="261.6" cy="242.8" r="8.2" />
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth18Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="264.7" cy="236.5" r="17.5"></circle>
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth18Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
          // opacity: (((tooth18Diagnozis.periodontit && tooth18Diagnozis.periodontit_stage === 'st3') || activeNumber === '18' && tStage === 'st3')  ? 1 : 0)
        }}
      >
        <circle className="st42" cx="262.6" cy="224" r="30"></circle>
      </g>
    </>
  );
}
