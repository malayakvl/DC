import React from 'react';

interface MovingViewProps {
  data?: number | string | null;
}

export default function MovingView({ data }: MovingViewProps) {
  const currentStage = Number(data) || 0;

  return (
    <div
      title={`Рухомість: ${currentStage} ст.`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: '20px',
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
          }}
        />
      ))}
    </div>
  );
}