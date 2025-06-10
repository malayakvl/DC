import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeethDiagnozisSelector, perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

export default function DentalDepositsView({ data, toothNum, type }) {

  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 300 100"
        style={{ width: '100%', height: '20px' }}
        xmlSpace="preserve"
      >
        <circle
          className="plaque bottom"
          data-tooth="48"
          data-position="1"
          cx="50"
          cy="50"
          r="25"
          fill={
            data[`tooth${toothNum}`]?.[`dentaldeposit_${type}_st1`]
              ? 'rgb(201,199,193)'
              : 'rgba(255, 255, 255, 0)'
          }
          stroke={
            data[`tooth${toothNum}`]?.[`dentaldeposit_${type}_st1`]
              ? 'rgba(80,79,77,0.9)'
              : 'rgba(200, 200, 200, 0.9)'
          }
          strokeWidth="7px"
        ></circle>
        <circle
          className="plaque bottom"
          data-tooth="48"
          data-position="2"
          cx="150"
          cy="50"
          r="25"
          fill={
            data[`tooth${toothNum}`]?.[`dentaldeposit_${type}_st2`]
              ? 'rgb(201,199,193)'
              : 'rgba(255, 255, 255, 0)'
          }
          stroke={
            data[`tooth${toothNum}`]?.[`dentaldeposit_${type}_st2`]
              ? 'rgba(80,79,77,0.9)'
              : 'rgba(200, 200, 200, 0.9)'
          }
          strokeWidth="7px"
        ></circle>
        <circle
          className="plaque bottom"
          data-tooth="48"
          data-position="3"
          cx="250"
          cy="50"
          r="25"
          fill={
            data[`tooth${toothNum}`]?.[`dentaldeposit_${type}_st3`]
              ? 'rgb(201,199,193)'
              : 'rgba(255, 255, 255, 0)'
          }
          stroke={
            data[`tooth${toothNum}`]?.[`dentaldeposit_${type}_st3`]
              ? 'rgba(80,79,77,0.9)'
              : 'rgba(200, 200, 200, 0.9)'
          }
          strokeWidth="7px"
        ></circle>
      </svg>
    </>
  );
}
