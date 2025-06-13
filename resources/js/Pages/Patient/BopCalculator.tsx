import React, { useState } from 'react';

const BOPCalculator = () => {
  const [bleedingSites, setBleedingSites] = useState('');
  const totalSites = 6; // Загальна кількість зондів при 5мм зондуванні

  const calculateBOP = () => {
    const bleeding = parseInt(bleedingSites, 10);
    if (isNaN(bleeding) || bleeding < 0 || bleeding > totalSites) {
      return 'Введіть коректне число від 0 до ' + totalSites;
    }
    const bop = (bleeding / totalSites) * 100;
    return bop.toFixed(2) + '%';
  };

  return (
    <div style={{ maxWidth: 400, margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>Розрахунок Кровоточивості при зондуванні 5мм (BOP)</h2>
      <label>
        Введіть кількість зондів з кровотечею (0-{totalSites}):<br />
        <input
          type="number"
          value={bleedingSites}
          onChange={(e) => setBleedingSites(e.target.value)}
          min="0"
          max={totalSites}
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        />
      </label>
      <p>
        Результат: <strong>{calculateBOP()}</strong>
      </p>
    </div>
  );
};

export default BOPCalculator;
