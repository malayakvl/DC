import { createAction } from 'redux-actions';
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";

export const setTeethType = createAction('formula/SET_TEETH_TYPE');
export const setAllTeeth = createAction('formula/SET_ALL_TEETH');
export const setToothDiagnoze = createAction('formula/SET_TOOTH_DIAGNOZE');
export const setPerioDiagnoze = createAction('formula/SET_PERIO_DIAGNOZIS');
export const setPerioDeepZond = createAction('formula/SET_PERIO_ZOND');
export const setDeepZondData = createAction('formula/SET_PERIO_ZOND_DATA');
export const setActiveToothName = createAction(
  'formula/SET_ACTIVE_TOOTH_NUBER'
);
export const setDiagnosis = createAction('formula/SET_DAGNOSIS');
export const setDiagnosisClass = createAction('formula/SET_DAGNOSIS_CLASS');
export const setSubDiagnosis = createAction('formula/SET_SUBDAGNOSIS');
export const setSealColor1 = createAction('formula/SET_SEALCOLOR1');
export const setSealColor2 = createAction('formula/SET_SEALCOLOR2');
export const setSealColor3 = createAction('formula/SET_SEALCOLOR3');
export const setSealServicalColor = createAction(
  'formula/SET_SEALSERVICECOLOR'
);
export const setVinirColor = createAction('formula/SET_VINIRCOLOR');
export const setCeramicCrownColor = createAction(
  'formula/SET_CERAMICCROWNCOLOR'
);
export const setMCeramicCrownColor = createAction(
  'formula/SET_METALOCERAMICCROWNCOLOR'
);
export const setMetalicCrownColor = createAction(
  'formula/SET_METALICCROWNCOLOR'
);
export const setZirconiaCrownColor = createAction(
  'formula/SET_ZIRCONIACROWNCOLOR'
);
export const setNewToothActive = createAction('formula/SET_NEW_TOOTH_ACTIVE');
export const setDisactiveAll = createAction('formula/ALL_TEETH_DISACTIVE');
export const setSelectedToothNumber = createAction('formula/SET_TOOTH_NUMBER');
export const setPsrChange = createAction('formula/SET_PSRCHANGE');
// 1828 actions
export const setPerioZ1828VestData = createAction(
  'formula/SET_1828VEST_ZONDDATA'
);
export const setPerioYK1828VestData = createAction(
  'formula/SET_1828VEST_YASNDATA'
);
export const setPerioZ1828OralData = createAction(
  'formula/SET_1828ORAL_ZONDDATA'
);
export const setPerioYK1828OralData = createAction(
  'formula/SET_1828ORAL_YASNDATA'
);

export const setPZondChart1828Up = createAction(
  'formula/SET_PERIOZOND1828_VEST_DATA'
);
export const setPKrayChart1828Up = createAction(
  'formula/SET_PERIOKRAY1828_VEST_DATA'
);
export const setPBarChart1828Up = createAction(
  'formula/SET_PERIOBAR1828_VEST_DATA'
);
export const setPZondChart1828Down = createAction(
  'formula/SET_PERIOZOND1828_ORAL_DATA'
);
export const setPKrayChart1828Down = createAction(
  'formula/SET_PERIOKRAY1828_ORAL_DATA'
);
export const setPBarChart1828Down = createAction(
  'formula/SET_PERIOBAR1828_ORAL_DATA'
);

// 4838 actions
export const setPerioZ4838VestData = createAction(
  'formula/SET_4838VEST_ZONDDATA'
);
export const setPerioYK4838VestData = createAction(
  'formula/SET_4838VEST_YASNDATA'
);
export const setPerioZ4838OralData = createAction(
  'formula/SET_4838ORAL_ZONDDATA'
);
export const setPerioYK4838OralData = createAction(
  'formula/SET_4838ORAL_YASNDATA'
);

export const setPZondChart4838Up = createAction(
  'formula/SET_PERIOZOND4838_VEST_DATA'
);
export const setPKrayChart4838Up = createAction(
  'formula/SET_PERIOKRAY4838_VEST_DATA'
);
export const setPBarChart4838Up = createAction(
  'formula/SET_PERIOBAR4838_VEST_DATA'
);
export const setPZondChart4838Down = createAction(
  'formula/SET_PERIOZOND4838_ORAL_DATA'
);
export const setPKrayChart4838Down = createAction(
  'formula/SET_PERIOKRAY4838_ORAL_DATA'
);
export const setPBarChart4838Down = createAction(
  'formula/SET_PERIOBAR4838_ORAL_DATA'
);

export const setSchema = createAction('formula/SET_SCHEMA');
export const showAllAdult = createAction('formula/SHOW_ALL_ADULT');
export const showAllChild = createAction('formula/SHOW_ALL_CHILD');

export const checkAction = createAction('formula/CHECK_VALUES');
export const setChangeDia = createAction('formula/CHANGE_DIA');

export const setSelectedTooth = createAction('formula/CHANGE_DIA');
export const setDataDiagnozes = createAction('formula/SET_EXIST_DIAGNOZIS');
export const setStateFormula = createAction('formula/SET_STATE_FORMULA');
export const setClearFormula = createAction('formula/SET_CLEAR_FORMULA');
export const setRemoveDia = createAction('formula/REMOVE_TOOTH_DIA');
export const setPerioStatusChange = createAction('formula/PERIO_TOOTH_STATUS_CHANGE');
export const setClearPerio = createAction('formula/SET_CLEAR_PERIO');
export const setPsrValues = createAction('formula/SET_PSR_VALUES');
