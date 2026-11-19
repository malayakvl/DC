import React from 'react';

interface DentalDepositsViewProps {
  data?: Record<string, any> | null;
  toothNum: number | string;
  type: string;
}

export default function DentalDepositsView({
                                             data,
                                             toothNum,
                                             type,
                                           }: DentalDepositsViewProps) {
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
        const isActive = Boolean(toothData[`dentaldeposit_${type}_st${stage}`]);

        return (
          <div
            key={stage}
            title={`Зубні відкладення (${type}) — точка ${stage}`}
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
                backgroundColor: isActive ? '#1E293B' : 'transparent',
                border: isActive ? '1.5px solid #0F172A' : '1.5px solid #CBD5E1',
                boxSizing: 'border-box',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}