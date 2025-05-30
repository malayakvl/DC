import React from 'react';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../../Redux/Formula/selectors';

export default function Furcazia({ toothNum }) {
  // const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  // const tooth11Diagnozis = teethDiagnozis.tooth11;

  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        style={{ width: '100%', height: '20px' }}
        xml:space="preserve"
      >
        <g className="furcation bottom" data-tooth="48" data-position="1">
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="rgba(255, 255, 255, 0)"
            stroke="rgba(200, 200, 200, 0.9)"
            stroke-width="7px"
          ></circle>
          <path
            d="M50,25 a1,1 0 0,0 0,50"
            fill="rgb(127, 0, 0)"
            opacity="0"
          ></path>
        </g>
      </svg>
    </>
  );
}
