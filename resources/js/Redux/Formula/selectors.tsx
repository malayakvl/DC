import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  pricing => pricing
);

export const teethTypeSelector = state => state.formula.teethType;
export const allTeethSelector = state => state.formula.allTeeth;
export const getDiagnosisSelector = state => state.formula.diagnosis;
export const getSubDiagnosisSelector = state => state.formula.subdiagnosis;
export const getTeethDiagnozisSelector = state => state.formula.teethDiagnozes;
export const getSealColor1Selector = state => state.formula.seal_color1;
export const getSealColor2Selector = state => state.formula.seal_color2;
export const getSealColor3Selector = state => state.formula.seal_color3;
export const getSealServicalColorSelector = state =>
  state.formula.seal_cervical_color;
export const getVinirColorSelector = state => state.formula.vinir_color;
export const getCeramicCrownColorSelector = state =>
  state.formula.ceramic_crown_color;
export const getCeramicMCrownColorSelector = state =>
  state.formula.mceramic_crown_color;
export const getMetalicCrownColorSelector = state =>
  state.formula.metalic_crown_color;
export const getZirconiaCrownColorSelector = state =>
  state.formula.zirconia_crown_color;
export const getStatusesSelector = state => state.formula.teethStatuses;
export const getActiveToothNumberSelector = state =>
  state.formula.selectedTooth;
export const getStateFormulaSelector = state => state.formula.stateFormula;

// chart variables 1828
export const getPerioZ1828VDataSelector = state => state.formula.vest1828Zond;
export const getPerioYK1828VDataSelector = state => state.formula.vest1828Yasn;

export const chartZondUpSelector = state => state.formula.pZondChartUp;
export const chartKrayUpSelector = state => state.formula.pKrayChartUp;
export const chartBarUpSelector = state => state.formula.pBarUp;

export const getPerioZ1828ODataSelector = state => state.formula.oral1828Zond;
export const getPerioYK1828ODataSelector = state => state.formula.oral1828Yasn;

export const chartZondDownSelector = state => state.formula.pZondChartDown;
export const chartKrayDownSelector = state => state.formula.pKrayChartDown;
export const chartBarDownSelector = state => state.formula.pBarDown;

// chart variables 4838
export const getPerioZ4838VDataSelector = state => state.formula.vest4838Zond;
export const getPerioYK4838VDataSelector = state => state.formula.vest4838Yasn;

export const chartZondUp2Selector = state => state.formula.pZondChart2Up;
export const chartKrayUp2Selector = state => state.formula.pKrayChart2Up;
export const chartBarUp2Selector = state => state.formula.pBar2Up;

export const getPerioZ4838ODataSelector = state => state.formula.oral4838Zond;
export const getPerioYK4838ODataSelector = state => state.formula.oral4838Yasn;

export const chartZondDown2Selector = state => state.formula.pZondChart2Down;
export const chartKrayDown2Selector = state => state.formula.pKrayChart2Down;
export const chartBarDown2Selector = state => state.formula.pBar2Down;

export const perioDiagnozisSelector = state =>
  state.formula.teethDiagnozesPerio;

export const allTeethAdultSelector = state => state.formula.allTeethAdult;
export const allTeethChildSelector = state => state.formula.allTeethChild;
export const changeDiaSelector = state => state.formula.changeDia;
export const getRemoveDiaSelector = state => state.formula.removeDia;
export const getPerioStatusChangeSelector = state => state.formula.perioStatusChange;

export class getPerioSelector {
}