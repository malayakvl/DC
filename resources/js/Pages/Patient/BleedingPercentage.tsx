import { useMemo } from 'react';

// Список зубів
const teeth = [
  '18', '17', '16', '15', '14', '13', '12', '11',
  '21', '22', '23', '24', '25', '26', '27', '28',
  '48', '47', '46', '45', '44', '43', '42', '41',
  '31', '32', '33', '34', '35', '36', '37', '38'
];

// Функція для збору даних із pDia
const collectBleedingData = (pDia) => {
  const data = {};
  teeth.forEach(tooth => {
    const toothKey = `tooth${tooth}`;
    data[tooth] = pDia[toothKey] || {};
    data[tooth].bleeding_vest_st1 = data[tooth].bleeding_vest_st1 || false;
    data[tooth].bleeding_vest_st2 = data[tooth].bleeding_vest_st2 || false;
    data[tooth].bleeding_vest_st3 = data[tooth].bleeding_vest_st3 || false;
    data[tooth].bleeding_oral_st1 = data[tooth].bleeding_oral_st1 || false;
    data[tooth].bleeding_oral_st2 = data[tooth].bleeding_oral_st2 || false;
    data[tooth].bleeding_oral_st3 = data[tooth].bleeding_oral_st3 || false;
    data[tooth].status = data[tooth].status || null;
  });
  return data;
};

// Компонент для відображення відсотка кровоточивості
const BleedingPercentage = ({ pDia }) => {
  const totalPercentage = useMemo(() => {
    console.log(pDia)
    const data = collectBleedingData(pDia);
    let totalPositivePoints = 0;
    const totalPossiblePoints = 32 * 2; // 64 точки

    teeth.forEach(tooth => {
      if (data[tooth].status === 'implant') return; // Пропускаємо імпланти

      const vestibularPoints = (data[tooth].bleeding_vest_st2 || data[tooth].bleeding_vest_st3) ? 1 : 0;
      const oralPoints = (data[tooth].bleeding_oral_st2 || data[tooth].bleeding_oral_st3) ? 1 : 0;
      const positivePoints = vestibularPoints + oralPoints;

      // Враховуємо лише зуби 18 і 17
      if (tooth === '18' || tooth === '17') {
        totalPositivePoints += positivePoints;
      }
    });

    return ((totalPositivePoints / totalPossiblePoints) * 100).toFixed(2);
  }, [pDia]);

  return <b>{totalPercentage}%</b>;
};

export default BleedingPercentage;