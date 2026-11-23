import React from 'react';

interface FertilizerViewProps {
  data?: Record<string, any> | null;
  toothNum: number | string;
  type: string;
}

export default function FertilizerView({ data, toothNum, type }: FertilizerViewProps) {
  const toothData = data?.[`tooth${toothNum}`] || {};

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
          <div
            key={stage}
            title={`Гноєтеча (${type}) — точка ${stage}`}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#FACC15' : 'transparent',
                border: isActive ? '1.5px solid #EAB308' : '1.5px solid #CBD5E1',
                boxSizing: 'border-box',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}