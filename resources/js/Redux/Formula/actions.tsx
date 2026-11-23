import { createAction } from 'redux-actions';

export const setTeethType: any = createAction('formula/SET_TEETH_TYPE');
export const setAllTeeth: any = createAction('formula/SET_ALL_TEETH');
export const setToothDiagnoze: any = createAction('formula/SET_TOOTH_DIAGNOZE');
export const setPerioDiagnoze: any = createAction('formula/SET_PERIO_DIAGNOZIS');
export const setPerioDeepZond: any = createAction('formula/SET_PERIO_ZOND');
export const setDeepZondData: any = createAction('formula/SET_PERIO_ZOND_DATA');
export const setDiagnosis: any = createAction('formula/SET_DAGNOSIS');
export const setDiagnosisClass: any = createAction('formula/SET_DAGNOSIS_CLASS');
export const setSubDiagnosis: any = createAction('formula/SET_SUBDAGNOSIS');
export const setSealColor1: any = createAction('formula/SET_SEALCOLOR1');
export const setSealColor2: any = createAction('formula/SET_SEALCOLOR2');
export const setSealColor3: any = createAction('formula/SET_SEALCOLOR3');
export const setSealServicalColor: any = createAction('formula/SET_SEALSERVICECOLOR');
export const setVinirColor: any = createAction('formula/SET_VINIRCOLOR');
export const setCeramicCrownColor: any = createAction('formula/SET_CERAMICCROWNCOLOR');
export const setMCeramicCrownColor: any = createAction('formula/SET_METALOCERAMICCROWNCOLOR');
export const setMetalicCrownColor: any = createAction('formula/SET_METALICCROWNCOLOR');
export const setZirconiaCrownColor: any = createAction('formula/SET_ZIRCONIACROWNCOLOR');
export const setNewToothActive: any = createAction('formula/SET_NEW_TOOTH_ACTIVE');
export const setDisactiveAll: any = createAction('formula/ALL_TEETH_DISACTIVE');
export const setSelectedToothNumber: any = createAction('formula/SET_TOOTH_NUMBER');
export const setPsrChange: any = createAction('formula/SET_PSRCHANGE');
// 1828 actions
export const setPerioZ1828VestData: any = createAction('formula/SET_1828VEST_ZONDDATA');
export const setPerioYK1828VestData: any = createAction('formula/SET_1828VEST_YASNDATA');
export const setPerioZ1828OralData: any = createAction('formula/SET_1828ORAL_ZONDDATA');
export const setPerioYK1828OralData: any = createAction('formula/SET_1828ORAL_YASNDATA');

export const setPZondChart1828Up: any = createAction('formula/SET_PERIOZOND1828_VEST_DATA');
export const setPKrayChart1828Up: any = createAction('formula/SET_PERIOKRAY1828_VEST_DATA');
export const setPBarChart1828Up: any = createAction('formula/SET_PERIOBAR1828_VEST_DATA');
export const setPZondChart1828Down: any = createAction('formula/SET_PERIOZOND1828_ORAL_DATA');
export const setPKrayChart1828Down: any = createAction('formula/SET_PERIOKRAY1828_ORAL_DATA');
export const setPBarChart1828Down: any = createAction('formula/SET_PERIOBAR1828_ORAL_DATA');

// 4838 actions
export const setPerioZ4838VestData: any = createAction('formula/SET_4838VEST_ZONDDATA');
export const setPerioYK4838VestData: any = createAction('formula/SET_4838VEST_YASNDATA');
export const setPerioZ4838OralData: any = createAction('formula/SET_4838ORAL_ZONDDATA');
export const setPerioYK4838OralData: any = createAction('formula/SET_4838ORAL_YASNDATA');

export const setPZondChart4838Up: any = createAction('formula/SET_PERIOZOND4838_VEST_DATA');
export const setPKrayChart4838Up: any = createAction('formula/SET_PERIOKRAY4838_VEST_DATA');
export const setPBarChart4838Up: any = createAction('formula/SET_PERIOBAR4838_VEST_DATA');
export const setPZondChart4838Down: any = createAction('formula/SET_PERIOZOND4838_ORAL_DATA');
export const setPKrayChart4838Down: any = createAction('formula/SET_PERIOKRAY4838_ORAL_DATA');
export const setPBarChart4838Down: any = createAction('formula/SET_PERIOBAR4838_ORAL_DATA');

export const setSchema: any = createAction('formula/SET_SCHEMA');
export const showAllAdult: any = createAction('formula/SHOW_ALL_ADULT');
export const showAllChild: any = createAction('formula/SHOW_ALL_CHILD');

export const checkAction: any = createAction('formula/CHECK_VALUES');
export const setChangeDia: any = createAction('formula/CHANGE_DIA');

export const setSelectedTooth: any = createAction('formula/CHANGE_DIA');
export const setDataDiagnozes: any = createAction('formula/SET_EXIST_DIAGNOZIS');
export const setStateFormula: any = createAction('formula/SET_STATE_FORMULA');
export const setClearFormula: any = createAction('formula/SET_CLEAR_FORMULA');
export const setRemoveDia: any = createAction('formula/REMOVE_TOOTH_DIA');
export const setPerioStatusChange: any = createAction('formula/PERIO_TOOTH_STATUS_CHANGE');
export const setClearPerio: any = createAction('formula/SET_CLEAR_PERIO');
export const setPsrValues: any = createAction('formula/SET_PSR_VALUES');
export const setClearPSR: any = createAction('formula/SET_CLEAR_PSR');
