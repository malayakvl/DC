import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

interface MovingProps {
  toothNum: number | string;
}

export default function Moving({ toothNum }: MovingProps) {
  const dispatch = useDispatch<any>();
  const perioDiagnozis = useSelector(perioDiagnozisSelector);

  const toothKey = `tooth${toothNum}`;
  const currentStage: number = perioDiagnozis?.[toothKey]?.moving_st || 0;

  const handleToggleStage = () => {
    const nextStage = currentStage >= 3 ? 0 : currentStage + 1;

    // Иммутабельное обновление, чтобы React/Redux сам перерисовал компонент
    const updatedDiagnozis = {
      ...perioDiagnozis,
      [toothKey]: {
        ...perioDiagnozis[toothKey],
        moving_st: nextStage,
      },
    };

    dispatch(setPerioDiagnoze(updatedDiagnozis));
  };

  return (
    <div
      onClick={handleToggleStage}
      role="button"
      tabIndex={0}
      title={`Рухомість: ${currentStage} ст.`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: '20px',
        cursor: 'pointer',
      }}
    >
      {[1, 2, 3].map((level) => (
        <span
          key={level}
          style={{
            width: '3.5px',
            height: '13px',
            borderRadius: '999px',
            backgroundColor: currentStage >= level ? '#E11D48' : '#E2E8F0',
            transition: 'background-color 0.15s ease',
          }}
        />
      ))}
    </div>
  );
}
