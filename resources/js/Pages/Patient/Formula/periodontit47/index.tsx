import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage47() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth47Diagnozis = teethDiagnozis.tooth47;

  return (
    <>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth47Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="295.8" cy="1280.1" r="8.2"></circle>
        <circle className="st42" cx="355.5" cy="1297.8" r="8.2"></circle>
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth47Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="295.8" cy="1287.4" r="17.5"></circle>
        <circle className="st42" cx="354.4" cy="1306" r="17.5"></circle>
      </g>
      <g
        className="level hEmpty hImplant"
        style={{
          visibility: 'inherit',
          opacity: tooth47Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="293.2" cy="1298.9" r="30"></circle>
        <circle className="st42" cx="350.7" cy="1315.3" r="30"></circle>
      </g>
    </>
  );
}
