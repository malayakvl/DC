import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

interface FurkaciaProps {
  toothNum: number | string;
  type: string;
  qty?: number;
}

export default function Furkacia({ toothNum, type, qty = 1 }: FurkaciaProps) {
  const dispatch = useDispatch<any>();
  const perioDiagnozis = useSelector(perioDiagnozisSelector);

  const toothKey = `tooth${toothNum}`;
  const toothData = perioDiagnozis?.[toothKey] || {};

  const handleToggle = (stage: number) => {
    const fieldKey = `furkacia_${type}_st${stage}`;
    const updatedDiagnozis = {
      ...perioDiagnozis,
      [toothKey]: {
        ...toothData,
        [fieldKey]: !toothData[fieldKey],
      },
    };

    dispatch(setPerioDiagnoze(updatedDiagnozis));
  };

  // Якщо фуркація не передбачена для цього зуба (qty === 0) — показуємо прочерк як на макеті
  if (!qty) {
    return (
      <div
        style={{
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#CBD5E1',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        -
      </div>
    );
  }

  const stages = qty === 2 ? [1, 2] : [1];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: '22px',
      }}
    >
      {stages.map((stage) => {
        const isActive = Boolean(toothData[`furkacia_${type}_st${stage}`]);

        return (
          <button
            key={stage}
            type="button"
            onClick={() => handleToggle(stage)}
            title={`Фуркація (${type}) ${stage}`}
            style={{
              // Зручна зона кліку (hitbox), навіть якщо кружечок компактний
              width: '20px',
              height: '20px',
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
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: isActive
                  ? '2px solid #2563EB' // насичений синій як у Stitch
                  : '1.5px solid #CBD5E1', // мʼякий сірий контур
                transition: 'all 0.15s ease',
                boxSizing: 'border-box',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
