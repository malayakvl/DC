// import { createSelector } from 'reselect';
// import { useSelector } from 'react-redux';
// // ------------------------------------
// // Selectors
// // ------------------------------------
// const rootSelector = createSelector(
//   state => state,
//   pricing => pricing
// );

export const teethTypeSelector = (state: any) => state.formula.teethType;
export const allTeethSelector = (state: any) => state.formula.allTeeth;
export const getDiagnosisSelector = (state: any) => state.formula.diagnosis;
export const getSubDiagnosisSelector = (state: any) => state.formula.subdiagnosis;
export const getTeethDiagnozisSelector = (state: any) => state.formula.teethDiagnozes;
export const getSealColor1Selector = (state: any) => state.formula.seal_color1;
export const getSealColor2Selector = (state: any) => state.formula.seal_color2;
export const getSealColor3Selector = (state: any) => state.formula.seal_color3;
export const getSealServicalColorSelector = (state: any) => state.formula.seal_cervical_color;
export const getVinirColorSelector = (state: any) => state.formula.vinir_color;
export const getCeramicCrownColorSelector = (state: any) => state.formula.ceramic_crown_color;
export const getCeramicMCrownColorSelector = (state: any) => state.formula.mceramic_crown_color;
export const getMetalicCrownColorSelector = (state: any) => state.formula.metalic_crown_color;
export const getZirconiaCrownColorSelector = (state: any) => state.formula.zirconia_crown_color;
export const getStatusesSelector = (state: any) => state.formula.teethStatuses;
export const getActiveToothNumberSelector = (state: any) => state.formula.selectedTooth;
export const getStateFormulaSelector = (state: any) => state.formula.stateFormula;

// chart variables 1828
export const getPerioZ1828VDataSelector = (state: any) => state.formula.vest1828Zond;
export const getPerioYK1828VDataSelector = (state: any) => state.formula.vest1828Yasn;

export const chartZondUpSelector = (state: any) => state.formula.pZondChartUp;
export const chartKrayUpSelector = (state: any) => state.formula.pKrayChartUp;
export const chartBarUpSelector = (state: any) => state.formula.pBarUp;

export const getPerioZ1828ODataSelector = (state: any) => state.formula.oral1828Zond;
export const getPerioYK1828ODataSelector = (state: any) => state.formula.oral1828Yasn;

export const chartZondDownSelector = (state: any) => state.formula.pZondChartDown;
export const chartKrayDownSelector = (state: any) => state.formula.pKrayChartDown;
export const chartBarDownSelector = (state: any) => state.formula.pBarDown;

// chart variables 4838
export const getPerioZ4838VDataSelector = (state: any) => state.formula.vest4838Zond;
export const getPerioYK4838VDataSelector = (state: any) => state.formula.vest4838Yasn;

export const chartZondUp2Selector = (state: any) => state.formula.pZondChart2Up;
export const chartKrayUp2Selector = (state: any) => state.formula.pKrayChart2Up;
export const chartBarUp2Selector = (state: any) => state.formula.pBar2Up;

export const getPerioZ4838ODataSelector = (state: any) => state.formula.oral4838Zond;
export const getPerioYK4838ODataSelector = (state: any) => state.formula.oral4838Yasn;

export const chartZondDown2Selector = (state: any) => state.formula.pZondChart2Down;
export const chartKrayDown2Selector = (state: any) => state.formula.pKrayChart2Down;
export const chartBarDown2Selector = (state: any) => state.formula.pBar2Down;

export const perioDiagnozisSelector = (state: any) => state.formula.teethDiagnozesPerio;

export const allTeethAdultSelector = (state: any) => state.formula.allTeethAdult;
export const allTeethChildSelector = (state: any) => state.formula.allTeethChild;
export const changeDiaSelector = (state: any) => state.formula.changeDia;
export const getRemoveDiaSelector = (state: any) => state.formula.removeDia;
export const getPerioStatusChangeSelector = (state: any) => state.formula.perioStatusChange;

export const getPsrDataSelector = (state: any) => state.formula.psrData;
