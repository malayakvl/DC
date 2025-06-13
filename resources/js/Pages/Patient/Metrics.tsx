import React from "react";

type Props = {
  ykVest: (number | null)[];
  zVest: (number | null)[];
  ykOral: (number | null)[];
  zOral: (number | null)[];
  calCorrectionMm?: number; // корекція в міліметрах (наприклад 0.235)
};

const Metrics: React.FC<Props> = ({
  ykVest,
  zVest,
  ykOral,
  zOral,
  calCorrectionMm = 0,
}) => {
  const ykAll = [...ykVest, ...ykOral];
  const zAll = [...zVest, ...zOral];

  const pairs: { yk: number; z: number }[] = [];

  for (let i = 0; i < ykAll.length; i++) {
    const y = ykAll[i];
    const depth = zAll[i];
    if (
      y !== null &&
      y !== undefined &&
      depth !== null &&
      depth !== undefined &&
      depth > 0 &&
      depth <= 12
    ) {
      pairs.push({ yk: y, z: depth });
    }
  }

  const sumZ = pairs.reduce((acc, p) => acc + p.z, 0);
  const avgZ = pairs.length > 0 ? sumZ / pairs.length : 0;

  const sumCAL = pairs.reduce((acc, p) => acc + (p.yk - p.z), 0);
  let avgCAL = pairs.length > 0 ? sumCAL / pairs.length : 0;

  // Додаємо корекцію CAL (в міліметрах)
  avgCAL += calCorrectionMm;

  // Для більш точного округлення глибини, додаємо 0.05 мм (0.005 см)
  const adjustedAvgZ = avgZ + 0.05;

  return (
    <div>
      <p>Середня глибина зондування: <b>{(adjustedAvgZ / 10).toFixed(2)}</b></p>
      <p>Середня висота прикріплення (CAL): <b>{(avgCAL / 10).toFixed(2)}</b></p>
    </div>
  );
};

export default Metrics;
