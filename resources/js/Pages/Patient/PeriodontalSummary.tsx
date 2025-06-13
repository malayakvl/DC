import React from 'react';

const PeriodontalSummary = ({ data }) => {

  let totalSites = 0;
  let bleedingSites = 0;
  let totalSuppuration = 0;
  let totalDentalDeposits = 0;
  let totalProbingSitesOver5mm = 0;
  let bleedingSitesOver5mm = 0;

  Object.values(data).forEach((tooth) => {
    if (!tooth) return;

    for (let site = 1; site <= 3; site++) {
      ['vest', 'oral'].forEach((side) => {
        const bleedingKey = `bleeding_${side}_st${site}`;
        const suppurationKey = `fertilizer_${side}_st${site}`;
        const depositKey = `dentaldeposit_${side}_st${site}`;
        const depthKey = `depth_${side}_st${site}`;

        totalSites++;

        const hasBleeding = tooth[bleedingKey];
        const hasSuppuration = tooth[suppurationKey];
        const hasDeposit = tooth[depositKey];
        const depth = Number(tooth[depthKey]);

        if (hasBleeding) bleedingSites++;
        if (hasDeposit) totalDentalDeposits++;
        if (hasSuppuration) totalSuppuration++;

        if (!isNaN(depth) && depth === 5) {
          totalProbingSitesOver5mm++;
          if (hasBleeding) bleedingSitesOver5mm++;
        }
      });
    }
  });

  const percent = (part, whole) =>
    whole > 0 ? ((part / whole) * 100).toFixed(2) : '0.00';

  return (
    <div>
      <p>Кровоточивість при зондуванні (BOP): <b>{percent(bleedingSites, totalSites)}%</b></p>
      <p>Кровоточивість при зондуванні 5мм (BOP): <b>{percent(bleedingSitesOver5mm, totalProbingSitesOver5mm)}%</b></p>
      <p>Гноєтеча: <b>{percent(totalSuppuration, totalSites)}%</b></p>
      <p>Зубні відкладення: <b>{percent(totalDentalDeposits, totalSites)}%</b></p>
    </div>
  );
};

export default PeriodontalSummary;
