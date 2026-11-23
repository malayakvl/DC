import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

interface DentalDepositsProps {
  toothNum: number | string;
  type: string;
}

export default function DentalDeposits({ toothNum, type }: DentalDepositsProps) {
  const dispatch = useDispatch<any>();
  const perioDiagnozis = useSelector(perioDiagnozisSelector);

  const toothKey = `tooth${toothNum}`;
  const toothData = perioDiagnozis?.[toothKey] || {};

  const handleToggle = (stage: number) => {
    const fieldKey = `dentaldeposit_${type}_st${stage}`;
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
        const isActive = Boolean(toothData[`dentaldeposit_${type}_st${stage}`]);

        return (
          <button
            key={stage}
            type="button"
            onClick={() => handleToggle(stage)}
            title={`Зубні відкладення (${type}) — точка ${stage}`}
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
                backgroundColor: isActive ? '#1E293B' : 'transparent',
                border: isActive ? '1.5px solid #0F172A' : '1.5px solid #CBD5E1',
                boxSizing: 'border-box',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
