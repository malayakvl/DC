import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

interface FertilizerProps {
  toothNum: number | string;
  type: string;
}

export default function Fertilizer({ toothNum, type }: FertilizerProps) {
  const dispatch = useDispatch<any>();
  const perioDiagnozis = useSelector(perioDiagnozisSelector);

  const toothKey = `tooth${toothNum}`;
  const toothData = perioDiagnozis?.[toothKey] || {};

  const handleToggle = (stage: number) => {
    const fieldKey = `fertilizer_${type}_st${stage}`;
    const updatedDiagnozis = {
      ...perioDiagnozis,
      [toothKey]: {
        ...toothData,
        [fieldKey]: !toothData[fieldKey],
      },
    };

    dispatch(setPerioDiagnoze(updatedDiagnozis));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '22px',
      }}
    >
      {[1, 2, 3].map((stage) => {
        const isActive = Boolean(toothData[`fertilizer_${type}_st${stage}`]);

        return (
          <button
            key={stage}
            type="button"
            onClick={() => handleToggle(stage)}
            title={`Гноєтеча (${type}) — точка ${stage}`}
            className="group"
            style={{
              flex: 1,
              height: '100%',
              padding: 0,
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span
              className="transition-transform duration-150 group-hover:scale-125"
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#FACC15' : 'transparent',
                border: isActive ? '1.5px solid #EAB308' : '1.5px solid #CBD5E1',
                boxSizing: 'border-box',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
