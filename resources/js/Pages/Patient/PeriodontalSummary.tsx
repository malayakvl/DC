import React from 'react';

const PeriodontalSummary = ({ data }: { data: any }) => {
  let totalSites = 0;
  let bleedingSites = 0;
  let totalSuppuration = 0;
  let totalDentalDeposits = 0;
  let totalProbingSitesOver5mm = 0;
  let bleedingSitesOver5mm = 0;

  Object.values(data).forEach((tooth: any) => {
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

  const percent = (part: any, whole: any) =>
    whole > 0 ? ((part / whole) * 100).toFixed(2) : '0.00';

  return (
    <>
      <div className="bg-slate-50 border-t border-slate-200/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs w-full">
        <div className="flex items-center flex-wrap gap-4 text-slate-600">
          <span className="font-semibold text-slate-700">Легенда:</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-1 bg-rose-600 rounded"></span>
            <span>Глибина кишені (PPD / CAL)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-1 bg-blue-600 rounded"></span>
            <span>Ясенний край (GM)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Гнійний ексудат</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span>Зубний наліт / Камінь</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-blue-600"></span>
            <span>Фуркація І-ІІІ ст.</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white px-3 py-1 rounded-md border border-slate-200 text-slate-700 shadow-2xs">
            BOP: <span className="font-bold text-rose-600">22.4%</span>
          </div>
          <div className="bg-white px-3 py-1 rounded-md border border-slate-200 text-slate-700 shadow-2xs">
            Кишені ≥ 5 мм: <span className="font-bold text-rose-600">18 поверхонь</span>
          </div>
          <div className="bg-white px-3 py-1 rounded-md border border-slate-200 text-slate-700 shadow-2xs">
            Сер. глибина: <span className="font-bold text-slate-900">4.8 мм</span>
          </div>
        </div>
      </div>
      <div>
        <p>
          Кровоточивість при зондуванні (BOP): <b>{percent(bleedingSites, totalSites)}%</b>
        </p>
        <p>
          Кровоточивість при зондуванні 5мм (BOP):{' '}
          <b>{percent(bleedingSitesOver5mm, totalProbingSitesOver5mm)}%</b>
        </p>
        <p>
          Гноєтеча: <b>{percent(totalSuppuration, totalSites)}%</b>
        </p>
        <p>
          Зубні відкладення: <b>{percent(totalDentalDeposits, totalSites)}%</b>
        </p>
      </div>
    </>
  );
};

export default PeriodontalSummary;
