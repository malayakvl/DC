import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage16() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth16Diagnozis = teethDiagnozis.tooth16;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth16Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
          // opacity: ((tooth16Diagnozis.periodontit && pStage === 'st1' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="509.3" cy="248.9" r="8.2" />
        <circle className="st42" cx="544.9" cy="233.4" r="8.2" />
        <circle className="st42" cx="582.5" cy="249.9" r="8.2" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth16Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
        // opacity: ((tooth16Diagnozis.periodontit && pStage === 'st2' ) ? 1 : 0)}}
      >
        <circle className="st42" cx="510.6" cy="241.8" r="17.5" />
        <circle className="st42" cx="547.2" cy="226.2" r="17.5" />
        <circle className="st42" cx="583.3" cy="241.8" r="17.5" />
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth16Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
          // opacity: ((tooth16Diagnozis.periodontit && pStage === 'st3' ) ? 1 : 0)
        }}
      >
        <circle className="st42" cx="581.2" cy="228.1" r="30" />
        <circle className="st42" cx="545.9" cy="214.1" r="30" />
        <circle className="st42" cx="509.6" cy="229.3" r="30" />
      </g>
    </>
  );
}
