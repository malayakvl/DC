import React from 'react';
import FormulaView from './FormulaView/index';
import { useSelector } from 'react-redux';
import { getTeethDiagnozisSelector } from '../../Redux/Formula/selectors';
import ViewFormulaDiagnozis from './Partials/ViewFormulaDiagnozis';

export default function ViewDiagnoze({ formulaData }) {
  const fData = JSON.parse(formulaData.formula);
  const defData = useSelector(getTeethDiagnozisSelector);
  return (
    <div className="py-0 w-full">
      <ViewFormulaDiagnozis formulaData={fData || defData} id={formulaData.id} />
    </div>
  );
}
