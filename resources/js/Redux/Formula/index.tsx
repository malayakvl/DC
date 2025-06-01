import { handleActions } from 'redux-actions';
import {
  setTeethType,
  setAllTeeth,
  setDataDiagnozes,
  setToothDiagnoze,
  setPerioDiagnoze,
  setPerioDeepZond,
  setSelectedTooth,
  setDiagnosis,
  setDiagnosisClass,
  setSubDiagnosis,
  setSealColor1,
  setSealColor2,
  setSealColor3,
  setSealServicalColor,
  setVinirColor,
  setCeramicCrownColor,
  setMCeramicCrownColor,
  setMetalicCrownColor,
  setZirconiaCrownColor,
  setNewToothActive,
  setDisactiveAll,
  setSelectedToothNumber,
  setDeepZondData,
  setPsrChange,
  setChangeDia,

  // 1828
  setPerioZ1828VestData,
  setPerioYK1828VestData,
  setPZondChart1828Up,
  setPKrayChart1828Up,
  setPBarChart1828Up,
  setPerioZ1828OralData,
  setPerioYK1828OralData,
  setPZondChart1828Down,
  setPKrayChart1828Down,
  setPBarChart1828Down,

  // 4838
  setPerioZ4838VestData,
  setPerioYK4838VestData,
  setPZondChart4838Up,
  setPKrayChart4838Up,
  setPBarChart4838Up,
  setPerioZ4838OralData,
  setPerioYK4838OralData,
  setPZondChart4838Down,
  setPKrayChart4838Down,
  setPBarChart4838Down,
  setSchema,
  showAllAdult,
  showAllChild,
  checkAction,
  setStateFormula,
  setClearFormula,
  setRemoveDia,
} from './actions';

const initialState = {
  teethType: 'adult',
  schemaType: 'adult',
  totalPrice: 0,
  curreny: '',
  diagnosis: '',
  subdiagnosis: '',
  seal_color1: '',
  seal_color2: '',
  seal_color3: '',
  seal_cervical_color: 'blue',
  vinir_color: 'blue',
  ceramic_crown_color: 'blue',
  mceramic_crown_color: 'blue',
  metalic_crown_color: 'blue',
  zirconia_crown_color: 'blue',
  showTableError: false,
  allTeeth: false,
  allTeethAdult: false,
  allTeethChild: false,
  selectedTooth: '',
  selected_tooth_number: '',
  psrChange: false,
  changeDia: false,
  teethStatuses: {
    tooth18: { active: false },
    tooth17: { active: false },
    tooth16: { active: false },
    tooth15: { active: false },
    tooth14: { active: false },
    tooth13: { active: false },
    tooth12: { active: false },
    tooth11: { active: false },
    tooth21: { active: false },
    tooth22: { active: false },
    tooth23: { active: false },
    tooth24: { active: false },
    tooth25: { active: false },
    tooth26: { active: false },
    tooth27: { active: false },
    tooth28: { active: false },
    tooth48: { active: false },
    tooth47: { active: false },
    tooth46: { active: false },
    tooth45: { active: false },
    tooth44: { active: false },
    tooth43: { active: false },
    tooth42: { active: false },
    tooth41: { active: false },
    tooth31: { active: false },
    tooth32: { active: false },
    tooth33: { active: false },
    tooth34: { active: false },
    tooth35: { active: false },
    tooth36: { active: false },
    tooth37: { active: false },
    tooth38: { active: false },
    // milk
    tooth55: { active: false },
    tooth54: { active: false },
    tooth53: { active: false },
    tooth52: { active: false },
    tooth51: { active: false },
    tooth61: { active: false },
    tooth62: { active: false },
    tooth63: { active: false },
    tooth64: { active: false },
    tooth65: { active: false },
    tooth85: { active: false },
    tooth84: { active: false },
    tooth83: { active: false },
    tooth82: { active: false },
    tooth81: { active: false },
    tooth71: { active: false },
    tooth72: { active: false },
    tooth73: { active: false },
    tooth74: { active: false },
    tooth75: { active: false },
  },
  teethDiagnozesView: {
    tooth18: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,
      psr1: 0,
      psr2: 0,
      psr3: 0,
      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',

      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth17: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',

      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth16: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth15: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth14: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth13: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth12: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth11: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth21: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth22: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth23: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth24: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth25: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth26: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth27: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth28: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth48: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth47: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth46: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth45: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth44: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth43: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth42: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth41: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth31: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth32: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth33: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth34: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth35: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth36: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth37: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth38: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth55: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth54: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth53: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth52: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth51: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth61: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth62: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth63: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth64: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth65: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth85: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth84: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth83: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth82: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth81: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth71: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth72: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth73: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth74: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth75: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // gums process
      paradont_health: false,
      paradont_all_health: false,
      paradontit: false,
      paradontit_st1: false,
      paradontit_st2: false,
      paradontit_st3: false,
      paradontit_all_st1: false,
      paradontit_all_st2: false,
      paradontit_all_st3: false,
      inflamed_gums: false,
      significantly_gums: false,
      no_inflammatory_process: false,

      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
  },
  teethDiagnozes: {
    tooth18: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,
      psr1: 0,
      psr2: 0,
      psr3: 0,
      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth17: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth16: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth15: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth14: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth13: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth12: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth11: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth21: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth22: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth23: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth24: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth25: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth26: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth27: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth28: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth48: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth47: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth46: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth45: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth44: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth43: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth42: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth41: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth31: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth32: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth33: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth34: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth35: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth36: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth37: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth38: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth55: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth54: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth53: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth52: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth51: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth61: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth62: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth63: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth64: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth65: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth85: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth84: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth83: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth82: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth81: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth71: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth72: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth73: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth74: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
    tooth75: {
      active: false,
      show: false,
      change_color: false,
      fissure: false,

      // caries vars
      caries: false,
      caries_top: false,
      caries_bottom: false,
      caries_left: false,
      caries_right: false,
      caries_center: false,

      cervical_caries: false,
      tartar: false,
      pulpit: false,
      // channel not sealed
      channel_not_sealed: false,
      channel_top_sealed: false,
      channel_part_sealed: false,
      channel_class: '',
      // periodontit
      periodontit: false,
      periodontit_stage: '',
      periodontit_st1: false,
      periodontit_st2: false,
      periodontit_st3: false,
      periodontit_class: '',
      inflamed_gums: false,
      significantly_gums: false,

      // seal vars
      seal: false,
      seal_top: false,
      seal_top_color: '',
      seal_bottom: false,
      seal_bottom_color: '',
      seal_left: false,
      seal_left_color: '',
      seal_right: false,
      seal_right_color: '',
      seal_center: false,
      seal_center_color: '',

      // seal cervical vars
      seal_cervical: false,
      seal_cervical_color: '',

      // vinir vars
      vinir: false,
      vinir_color: '',
      // vinir vars
      temporary_crown: false,
      // ceramic crown
      ceramic_crown: false,
      ceramic_crown_color: '',
      // metaloceramic crown
      mceramic_crown: false,
      mceramic_crown_color: '',
      // metalic crown
      metalic_crown: false,
      metalic_crown_color: '',
      // zirconia crown
      zirconia_crown: false,
      zirconia_crown_color: '',
      // pin
      pin: false,
      apex: false,
      absent: false,
      culttab: false,
      abutment: false,
      abutment_implant: false,
      shaper: false,
      implant: false,
      // paradontit
      parodontit: false,
      parodontit_stage: '',
      parodontit_stage_all: false,
    },
  },
  teethDiagnozesPerio: {
    tooth48: {
      moving_st1: false,
      moving_st2: false,
      moving_st3: false,
      furkacia: false,
      bleeding_vest_st1: false,
      bleeding_vest_st2: false,
      bleeding_vest_st3: false,
      bleeding_oral_st1: false,
      bleeding_oral_st2: false,
      bleeding_oral_st3: false,
      depozit: '',
    },
    tooth18: {
      moving: '',
      furkacia: '',
      bleeding: '',
      depozit: '',
    },
  },
  // perio chart vest 1828
  vest1828Zond: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  vest1828Yasn: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  pZondChartUp: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pKrayChartUp: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pBarUp: [
    0,
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    0,
  ],
  // perio chart oral 1828
  oral1828Zond: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  oral1828Yasn: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  pZondChartDown: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pKrayChartDown: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pBarDown: [
    0,
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    0,
  ],

  // perio chart vest 4838
  vest4838Zond: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  vest4838Yasn: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  pZondChart2Up: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pKrayChart2Up: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pBar2Up: [
    0,
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    0,
  ],
  // perio chart oral 4838
  oral4838Zond: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  oral4838Yasn: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  pZondChart2Down: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pKrayChart2Down: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  pBar2Down: [
    0,
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    0,
  ],

  stateFormula: '',
  removeDia: false,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setRemoveDia.toString()]: {
    next: (state, action) => ({
      ...state,
      removeDia: action.payload,
    }),
  },
  [setSchema.toString()]: {
    next: (state, action) => ({
      ...state,
      schemaType: action.payload,
    }),
  },
  [setTeethType.toString()]: {
    next: (state, action) => ({
      ...state,
      teethType: action.payload,
    }),
  },
  [setAllTeeth.toString()]: {
    next: (state, action) => ({
      ...state,
      allTeeth: action.payload,
    }),
  },
  [setSelectedTooth.toString()]: {
    next: (state, action) => ({
      ...state,
      selectedTooth: action.payload,
    }),
  },
  [setDiagnosis.toString()]: {
    next: (state, action) => ({
      ...state,
      diagnosis: action.payload,
    }),
  },
  [setDiagnosisClass.toString()]: {
    next: (state, action) => ({
      ...state,
      channel_class: action.payload,
    }),
  },
  [setSubDiagnosis.toString()]: {
    next: (state, action) => ({
      ...state,
      subdiagnosis: action.payload,
    }),
  },

  [setSealColor1.toString()]: {
    next: (state, action) => ({
      ...state,
      seal_color1: action.payload,
    }),
  },
  [setSealColor2.toString()]: {
    next: (state, action) => ({
      ...state,
      seal_color2: action.payload,
    }),
  },
  [setSealColor3.toString()]: {
    next: (state, action) => ({
      ...state,
      seal_color3: action.payload,
    }),
  },
  [setSealServicalColor.toString()]: {
    next: (state, action) => ({
      ...state,
      seal_cervical_color: action.payload,
    }),
  },
  [setVinirColor.toString()]: {
    next: (state, action) => ({
      ...state,
      vinir_color: action.payload,
    }),
  },
  [setCeramicCrownColor.toString()]: {
    next: (state, action) => ({
      ...state,
      ceramic_crown_color: action.payload,
    }),
  },
  [setMCeramicCrownColor.toString()]: {
    next: (state, action) => ({
      ...state,
      mceramic_crown_color: action.payload,
    }),
  },
  [setMetalicCrownColor.toString()]: {
    next: (state, action) => ({
      ...state,
      metalic_crown_color: action.payload,
    }),
  },
  [setZirconiaCrownColor.toString()]: {
    next: (state, action) => ({
      ...state,
      zirconia_crown_color: action.payload,
    }),
  },
  [setNewToothActive.toString()]: {
    next: (state, action) => ({
      ...state,
      teethStatuses: { ...state.teethStatuses, ...action.payload },
    }),
  },
  [setDisactiveAll.toString()]: {
    next: (state, action) => ({
      ...state,
      teethStatuses: {
        tooth18: { active: false },
        tooth17: { active: false },
        tooth16: { active: false },
        tooth15: { active: false },
        tooth14: { active: false },
        tooth13: { active: false },
        tooth12: { active: false },
        tooth11: { active: false },
        tooth21: { active: false },
        tooth22: { active: false },
        tooth23: { active: false },
        tooth24: { active: false },
        tooth25: { active: false },
        tooth26: { active: false },
        tooth27: { active: false },
        tooth28: { active: false },
        tooth48: { active: false },
        tooth47: { active: false },
        tooth46: { active: false },
        tooth45: { active: false },
        tooth44: { active: false },
        tooth43: { active: false },
        tooth42: { active: false },
        tooth41: { active: false },
        tooth31: { active: false },
        tooth32: { active: false },
        tooth33: { active: false },
        tooth34: { active: false },
        tooth35: { active: false },
        tooth36: { active: false },
        tooth37: { active: false },
        tooth38: { active: false },
        tooth55: { active: false },
        tooth54: { active: false },
        tooth53: { active: false },
        tooth52: { active: false },
        tooth51: { active: false },
        tooth65: { active: false },
        tooth64: { active: false },
        tooth63: { active: false },
        tooth62: { active: false },
        tooth61: { active: false },
        tooth85: { active: false },
        tooth84: { active: false },
        tooth83: { active: false },
        tooth82: { active: false },
        tooth81: { active: false },
        tooth71: { active: false },
        tooth72: { active: false },
        tooth73: { active: false },
        tooth74: { active: false },
        tooth75: { active: false },
      },
    }),
  },
  [setSelectedToothNumber.toString()]: {
    next: (state, action) => ({
      ...state,
      selectedTooth: action.payload,
    }),
  },
  [setPerioDeepZond.toString()]: {
    next: (state, action) => ({
      ...state,
      teethPerioZond: action.payload,
    }),
  },
  [setDeepZondData.toString()]: {
    next: (state, action) => ({
      ...state,
      perioZondData: action.payload,
    }),
  },
  [setPsrChange.toString()]: {
    next: (state, action) => ({
      ...state,
      psrChange: action.payload,
    }),
  },

  [setPerioZ1828VestData.toString()]: {
    next: (state, action) => ({
      ...state,
      vest1828Zond: action.payload,
    }),
  },
  [setPerioYK1828VestData.toString()]: {
    next: (state, action) => ({
      ...state,
      vest1828Yasn: action.payload,
    }),
  },
  [setPZondChart1828Up.toString()]: {
    next: (state, action) => ({
      ...state,
      pZondChartUp: action.payload,
    }),
  },
  [setPKrayChart1828Up.toString()]: {
    next: (state, action) => ({
      ...state,
      pKrayChartUp: action.payload,
    }),
  },
  [setPBarChart1828Up.toString()]: {
    next: (state, action) => ({
      ...state,
      pBarUp: action.payload,
    }),
  },

  [setPerioZ1828OralData.toString()]: {
    next: (state, action) => ({
      ...state,
      oral1828Zond: action.payload,
    }),
  },
  [setPerioYK1828OralData.toString()]: {
    next: (state, action) => ({
      ...state,
      oral1828Yasn: action.payload,
    }),
  },
  [setPZondChart1828Down.toString()]: {
    next: (state, action) => ({
      ...state,
      pZondChartDown: action.payload,
    }),
  },
  [setPKrayChart1828Down.toString()]: {
    next: (state, action) => ({
      ...state,
      pKrayChartDown: action.payload,
    }),
  },
  [setPBarChart1828Down.toString()]: {
    next: (state, action) => ({
      ...state,
      pBarDown: action.payload,
    }),
  },

  [setPZondChart4838Up.toString()]: {
    next: (state, action) => ({
      ...state,
      pZondChart2Up: action.payload,
    }),
  },
  [setPBarChart4838Up.toString()]: {
    next: (state, action) => ({
      ...state,
      pBar2Up: action.payload,
    }),
  },
  [setPZondChart4838Down.toString()]: {
    next: (state, action) => ({
      ...state,
      pZondChart2Down: action.payload,
    }),
  },
  [setPBarChart4838Down.toString()]: {
    next: (state, action) => ({
      ...state,
      pBar2Down: action.payload,
    }),
  },
  [setPKrayChart4838Down.toString()]: {
    next: (state, action) => ({
      ...state,
      pKrayChart2Down: action.payload,
    }),
  },
  [setPKrayChart4838Up.toString()]: {
    next: (state, action) => ({
      ...state,
      pKrayChart2Up: action.payload,
    }),
  },

  [setPerioDiagnoze.toString()]: {
    next: (state, action) => ({
      ...state,
      teethDiagnozesPerio: action.payload,
    }),
  },

  [showAllAdult.toString()]: {
    next: (state, action) => ({
      ...state,
      allTeethAdult: action.payload,
    }),
  },
  [showAllChild.toString()]: {
    next: (state, action) => ({
      ...state,
      allTeethChild: action.payload,
    }),
  },
  [setChangeDia.toString()]: {
    next: (state, action) => ({
      ...state,
      changeDia: action.payload,
    }),
  },
  [setDataDiagnozes.toString()]: {
    next: (state, action) => ({
      ...state,
      teethDiagnozes: action.payload,
    }),
  },
  [setStateFormula.toString()]: {
    next: (state, action) => ({
      ...state,
      stateFormula: action.payload,
    }),
  },
  [setClearFormula.toString()]: {
    next: (state, action) => ({
      ...state,
      teethDiagnozes: {
        tooth18: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,
          psr1: 0,
          psr2: 0,
          psr3: 0,
          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth17: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth16: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth15: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth14: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth13: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth12: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth11: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth21: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth22: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth23: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth24: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth25: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth26: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth27: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth28: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth48: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth47: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth46: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth45: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth44: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth43: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth42: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth41: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth31: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth32: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth33: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth34: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth35: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth36: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth37: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth38: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth55: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth54: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth53: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth52: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth51: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth61: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth62: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth63: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth64: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth65: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth85: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth84: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth83: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth82: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth81: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth71: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth72: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth73: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth74: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
        tooth75: {
          active: false,
          show: false,
          change_color: false,
          fissure: false,

          // caries vars
          caries: false,
          caries_top: false,
          caries_bottom: false,
          caries_left: false,
          caries_right: false,
          caries_center: false,

          cervical_caries: false,
          tartar: false,
          pulpit: false,
          // channel not sealed
          channel_not_sealed: false,
          channel_top_sealed: false,
          channel_part_sealed: false,
          channel_class: '',
          // periodontit
          periodontit: false,
          periodontit_stage: '',
          periodontit_st1: false,
          periodontit_st2: false,
          periodontit_st3: false,
          periodontit_class: '',

          // seal vars
          seal: false,
          seal_top: false,
          seal_top_color: '',
          seal_bottom: false,
          seal_bottom_color: '',
          seal_left: false,
          seal_left_color: '',
          seal_right: false,
          seal_right_color: '',
          seal_center: false,
          seal_center_color: '',

          // seal cervical vars
          seal_cervical: false,
          seal_cervical_color: '',

          // vinir vars
          vinir: false,
          vinir_color: '',
          // vinir vars
          temporary_crown: false,
          // ceramic crown
          ceramic_crown: false,
          ceramic_crown_color: '',
          // metaloceramic crown
          mceramic_crown: false,
          mceramic_crown_color: '',
          // metalic crown
          metalic_crown: false,
          metalic_crown_color: '',
          // zirconia crown
          zirconia_crown: false,
          zirconia_crown_color: '',
          // pin
          pin: false,
          apex: false,
          absent: false,
          culttab: false,
          abutment: false,
          abutment_implant: false,
          shaper: false,
          implant: false,
          // paradontit
          parodontit: false,
          parodontit_stage: '',
          parodontit_stage_all: false,
        },
      },
    }),
  },
};

export {
  setTeethType,
  setAllTeeth,
  setDataDiagnozes,
  setToothDiagnoze,
  setPerioDiagnoze,
  setPerioDeepZond,
  setDiagnosis,
  setDiagnosisClass,
  setSubDiagnosis,
  setSealColor1,
  setSealColor2,
  setSealColor3,
  setSealServicalColor,
  setVinirColor,
  setCeramicCrownColor,
  setMCeramicCrownColor,
  setMetalicCrownColor,
  setZirconiaCrownColor,
  setSelectedTooth,
  setNewToothActive,
  setDisactiveAll,
  setSelectedToothNumber,
  setDeepZondData,
  setPsrChange,
  setPerioZ1828VestData,
  setPerioYK1828VestData,
  setPZondChart1828Up,
  setPKrayChart1828Up,
  setPBarChart1828Up,
  setPerioZ1828OralData,
  setPerioYK1828OralData,
  setPZondChart1828Down,
  setPKrayChart1828Down,
  setPBarChart1828Down,
  setPerioZ4838VestData,
  setPerioYK4838VestData,
  setPZondChart4838Up,
  setPKrayChart4838Up,
  setPBarChart4838Up,
  setPerioZ4838OralData,
  setPerioYK4838OralData,
  setPZondChart4838Down,
  setPKrayChart4838Down,
  setPBarChart4838Down,
  setSchema,
  showAllAdult,
  showAllChild,
  setChangeDia,
  checkAction,
  setStateFormula,
  setClearFormula,
  setRemoveDia,
};

export default handleActions(ACTION_HANDLERS, initialState);
