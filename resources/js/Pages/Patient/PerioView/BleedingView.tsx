import React from 'react';

interface BleedingViewProps {
  data?: Record<string, any> | null;
  type: string;
  toothNum: number | string;
}

export default function BleedingView({ data, type, toothNum }: BleedingViewProps) {
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
        const isActive = Boolean(toothData[`bleeding_${type}_st${stage}`]);

        return (
          <div
            key={stage}
            title={`Кровоточивість (${type}) — точка ${stage}`}
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
                backgroundColor: isActive ? '#F43F5E' : 'transparent',
                border: isActive ? '1.5px solid #E11D48' : '1.5px solid #CBD5E1',
                boxSizing: 'border-box',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}