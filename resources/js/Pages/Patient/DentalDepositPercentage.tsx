import { useMemo } from 'react';

// Список зубів
const teeth = [
  '18', '17', '16', '15', '14', '13', '12', '11',
  '21', '22', '23', '24', '25', '26', '27', '28',
  '48', '47', '46', '45', '44', '43', '42', '41',
  '31', '32', '33', '34', '35', '36', '37', '38'
];

// Функція для збору даних із pDia
const collectDentalDepositData = (pDia) => {
  const data = {};
  teeth.forEach(tooth => {
    const toothKey = `tooth${tooth}`;
    data[tooth] = pDia[toothKey] || {};
    data[tooth].dentaldeposit_vest_st1 = data[tooth].dentaldeposit_vest_st1 || false;
    data[tooth].dentaldeposit_vest_st2 = data[tooth].dentaldeposit_vest_st2 || false;
    data[tooth].dentaldeposit_vest_st3 = data[tooth].dentaldeposit_vest_st3 || false;
    data[tooth].dentaldeposit_oral_st1 = data[tooth].dentaldeposit_oral_st1 || false;
    data[tooth].dentaldeposit_oral_st2 = data[tooth].dentaldeposit_oral_st2 || false;
    data[tooth].dentaldeposit_oral_st3 = data[tooth].dentaldeposit_oral_st3 || false;
    data[tooth].status = data[tooth].status || null;
  });
  return data;
};

// Компонент для відображення відсотка зубних відкладень
const DentalDepositPercentage = ({ pDia }) => {
  const totalPercentage = useMemo(() => {
    const data = collectDentalDepositData(pDia);
    let totalPoints = 0;
    const totalPossiblePoints = 32 * 2; // 64 точки

    teeth.forEach(tooth => {
      if (data[tooth].status === 'implant') return; // Пропускаємо імпланти
console.log(tooth)
      const vestibularPoints = Math.max(
        data[tooth].dentaldeposit_vest_st1 ? 0 : 0,
        data[tooth].dentaldeposit_vest_st2 ? 0.833 : 0,
        data[tooth].dentaldeposit_vest_st3 ? 1 : 0
      );
console.log('vestibularPoints', vestibularPoints)
      const oralPoints = Math.max(
        data[tooth].dentaldeposit_oral_st1 ? 0 : 0,
        data[tooth].dentaldeposit_oral_st2 ? 0.833 : 0,
        data[tooth].dentaldeposit_oral_st3 ? 1 : 0
      );
// console.log(const depth = Number(tooth[depthKey]);)
      // Враховуємо лише зуби 18 і 17
      if (tooth === '18' || tooth === '17') {
        totalPoints += vestibularPoints + oralPoints;
      }
    });

    return ((totalPoints / totalPossiblePoints) * 100).toFixed(2);
  }, [pDia]);

  return <b>{totalPercentage}%</b>;
};

export default DentalDepositPercentage;