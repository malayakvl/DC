import React from 'react';
import FormulaView from './FormulaView/index';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../Redux/Formula/selectors';

export default function ViewFormula({ formulaData }) {
  const fData = JSON.parse(formulaData.formula);
  const defData = useSelector(getTeethDiagnozisSelector);

  return (
    <div className="py-0 w-full">
      <FormulaView formulaData={fData || defData} id={formulaData.id} />
    </div>
  );
}
