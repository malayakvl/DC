import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeethDiagnozisSelector, perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

export default function Furkacia({ toothNum, type, qty = 1 }) {
  const dispatch = useDispatch<any>();
  const perioDiagnozis = useSelector(perioDiagnozisSelector);
  const [changeState, setChangeState] = useState(false);

  const setDiagnozis = stage => {
    perioDiagnozis[`tooth${toothNum}`][`furkacia_${type}_st${stage}`] =
      !perioDiagnozis[`tooth${toothNum}`][`furkacia_${type}_st${stage}`];
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
        <g className="furcation top" data-tooth="18" data-position="1">
          {qty === 1 && (
            <circle
              cx="50"
              cy="50"
              r="25"
              onClick={() => {
                setDiagnozis(1);
              }}
              fill={
                perioDiagnozis[`tooth${toothNum}`]?.[`furkacia_${type}_st1`]
                  ? 'rgb(255, 255, 255)'
                  : 'rgba(255, 255, 255, 0)'
              }
              stroke={
                perioDiagnozis[`tooth${toothNum}`]?.[`furkacia_${type}_st1`]
                  ? 'rgba(7,36,183,0.9)'
                  : 'rgba(200, 200, 200, 0.9)'
              }            strokeWidth="7px"
            />
          )}
          {qty === 2 && (
            <>
              <circle
                cx="0"
                cy="50"
                r="25"
                onClick={() => {
                  setDiagnozis(1);
                }}
                fill={
                  perioDiagnozis[`tooth${toothNum}`]?.[`furkacia_${type}_st1`]
                    ? 'rgb(255, 255, 255)'
                    : 'rgba(255, 255, 255, 0)'
                }
                stroke={
                  perioDiagnozis[`tooth${toothNum}`]?.[`furkacia_${type}_st1`]
                    ? 'rgba(7,36,183,0.9)'
                    : 'rgba(200, 200, 200, 0.9)'
                }
                strokeWidth="7px"
              />
              <circle
                cx="100"
                cy="50"
                r="25"
                onClick={() => {
                  setDiagnozis(2);
                }}
                fill={
                  perioDiagnozis[`tooth${toothNum}`]?.[`furkacia_${type}_st2`]
                    ? 'rgb(255, 255, 255)'
                    : 'rgba(255, 255, 255, 0)'
                }
                stroke={
                  perioDiagnozis[`tooth${toothNum}`]?.[`furkacia_${type}_st2`]
                    ? 'rgba(7,36,183,0.9)'
                    : 'rgba(200, 200, 200, 0.9)'
                }
                strokeWidth="7px"
              />
            </>
            )}
        </g>
      </svg>

    </>
  );
}
