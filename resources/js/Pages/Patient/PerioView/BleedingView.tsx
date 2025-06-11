import React from 'react';

export default function BleedingView({ data, type, toothNum }) {

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
          cx="50"
          cy="50"
          r="25"
          fill={
            data[`tooth${toothNum}`]?.[`bleeding_${type}_st1`]
              ? 'rgb(250, 107, 107)'
              : 'rgba(255, 255, 255, 0)'
          }
          stroke={
            data[`tooth${toothNum}`]?.[`bleeding_${type}_st1`]
              ? 'rgba(224, 11, 11, 0.9)'
              : 'rgba(200, 200, 200, 0.9)'
          }
          strokeWidth="7px"
        />
        <circle
          cx="150"
          cy="50"
          r="25"
          fill={
            data[`tooth${toothNum}`]?.[`bleeding_${type}_st2`]
              ? 'rgb(250, 107, 107)'
              : 'rgba(255, 255, 255, 0)'
          }
          stroke={
            data[`tooth${toothNum}`]?.[`bleeding_${type}_st2`]
              ? 'rgba(224, 11, 11, 0.9)'
              : 'rgba(200, 200, 200, 0.9)'
          }
          strokeWidth="7px"
        />
        <circle
          cx="250"
          cy="50"
          r="25"
          fill={
            data[`tooth${toothNum}`]?.[`bleeding_${type}_st3`]
              ? 'rgb(250, 107, 107)'
              : 'rgba(255, 255, 255, 0)'
          }
          stroke={
            data[`tooth${toothNum}`]?.[`bleeding_${type}_st3`]
              ? 'rgba(224, 11, 11, 0.9)'
              : 'rgba(200, 200, 200, 0.9)'
          }
          strokeWidth="7px"
        />
      </svg>
    </>
  );
}
