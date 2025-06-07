import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeethDiagnozisSelector, perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

export default function Moving({ toothNum, type }) {
  const dispatch = useDispatch<any>();
  const perioDiagnozis = useSelector(perioDiagnozisSelector);
  const [changeState, setChangeState] = useState(false);

  const setDiagnozis = () => {
    let stage = 0;
    if (perioDiagnozis[`tooth${toothNum}`][`moving_st`] === 0)
      stage = 1;
    else if (perioDiagnozis[`tooth${toothNum}`][`moving_st`] === 1)
      stage = 2;
    else if (perioDiagnozis[`tooth${toothNum}`][`moving_st`] === 2)
      stage = 3;
    else if (perioDiagnozis[`tooth${toothNum}`][`moving_st`] === 3)
      stage = 0;

    perioDiagnozis[`tooth${toothNum}`][`moving_st`] = stage;
    dispatch(setPerioDiagnoze(perioDiagnozis));
    setChangeState(!changeState);
  };

  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        style={{ width: '100%', height: '20px' }}
        xmlSpace="preserve"
      >
        <g className="mobility" onClick={() => setDiagnozis()}>
          <path
            d="M 0 10 L 100 10 L 100 90 L 0 90 Z"
            fill="rgba(255, 255, 255, 0)"
          ></path>
          <path
            className="level1"
            d="M 0 25 L 0 75"
            strokeWidth="10px"
            style={{stroke: perioDiagnozis[`tooth${toothNum}`]?.[`moving_st`] >= 1 ? 'red' : 'rgba(200, 200, 200, 0.9)'}}
          ></path>
          <path
            className="level2"
            d="M 45 25 L 45 75"
            strokeWidth="10px"
            style={{stroke: perioDiagnozis[`tooth${toothNum}`]?.[`moving_st`] >= 2 ? 'red' : 'rgba(200, 200, 200, 0.9)'}}
          ></path>
          <path
            className="level3"
            d="M 90 25 L 90 75"
            strokeWidth="10px"
            style={{stroke: perioDiagnozis[`tooth${toothNum}`]?.[`moving_st`] >= 3 ? 'red' : 'rgba(200, 200, 200, 0.9)'}}
          ></path>
        </g>
      </svg>
    </>
  );
}
