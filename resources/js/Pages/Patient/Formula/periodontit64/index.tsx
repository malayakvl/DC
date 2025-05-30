import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../../Redux/Formula/selectors';

export default function PeriodontitStage64() {
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth64Diagnozis = teethDiagnozis.tooth64;
  return (
    <>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth64Diagnozis.periodontit_stage === 'st1' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1588.9" cy="248.9" r="8.2"></circle>
        <circle className="st42" cx="1553.3" cy="233.4" r="8.2"></circle>
        <circle className="st42" cx="1515.7" cy="249.9" r="8.2"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth64Diagnozis.periodontit_stage === 'st2' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1587.5" cy="241.8" r="17.5"></circle>
        <circle className="st42" cx="1551" cy="226.2" r="17.5"></circle>
        <circle className="st42" cx="1514.9" cy="241.8" r="17.5"></circle>
      </g>
      <g
        style={{
          visibility: 'inherit',
          opacity: tooth64Diagnozis.periodontit_stage === 'st3' ? 1 : 0,
        }}
      >
        <circle className="st42" cx="1517" cy="228.1" r="30"></circle>
        <circle className="st42" cx="1552.3" cy="214.1" r="30"></circle>
        <circle className="st42" cx="1588.6" cy="229.3" r="30"></circle>
      </g>
    </>
  );
}
