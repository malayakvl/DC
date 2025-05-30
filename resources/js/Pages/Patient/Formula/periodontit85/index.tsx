import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage85() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth85Diagnozis = teethDiagnozis.tooth85;

  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth85Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="295.8" cy="1280.1" r="8.2"></circle>
        <circle className="st42" cx="355.5" cy="1297.8" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth85Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="295.8" cy="1287.4" r="17.5"></circle>
        <circle className="st42" cx="354.4" cy="1306" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth85Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="293.2" cy="1298.9" r="30"></circle>
        <circle className="st42" cx="350.7" cy="1315.3" r="30"></circle>
      </g>
    </>
  );
}
