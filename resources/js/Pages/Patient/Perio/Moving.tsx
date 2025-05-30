import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../Redux/Formula/selectors';

export default function Moving({ toothNum }) {
  // const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  // const tooth11Diagnozis = teethDiagnozis.tooth11;

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
        <g className="mobility">
          <path
            d="M 0 10 L 100 10 L 100 90 L 0 90 Z"
            fill="rgba(255, 255, 255, 0)"
          ></path>
          <path
            className="level1"
            d="M 0 25 L 0 75"
            stroke="rgba(200, 200, 200, 0.9)"
            strokeWidth="10px"
          ></path>
          <path
            className="level2"
            d="M 45 25 L 45 75"
            stroke="rgba(200, 200, 200, 0.9)"
            strokeWidth="10px"
          ></path>
          <path
            className="level3"
            d="M 90 25 L 90 75"
            stroke="rgba(200, 200, 200, 0.9)"
            strokeWidth="10px"
          ></path>
        </g>
      </svg>
    </>
  );
}
