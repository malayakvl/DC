import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setToothDiagnoze,
  setSelectedToothNumber,
  setChangeDia,
} from '../../../Redux/Formula';
import {
  getDiagnosisSelector,
  getSealColor1Selector,
  getSealColor2Selector,
  getSealColor3Selector,
  getSubDiagnosisSelector,
  getTeethDiagnozisSelector,
  getSealServicalColorSelector,
  getVinirColorSelector,
  getCeramicCrownColorSelector,
  getCeramicMCrownColorSelector,
  getMetalicCrownColorSelector,
  getZirconiaCrownColorSelector,
  teethTypeSelector,
  allTeethAdultSelector,
  getActiveToothNumberSelector,
} from '../../../Redux/Formula/selectors';
import setupDiagnoze from '../../../lib/tfunctions';
import PeriodontitStage22 from './periodontit22';

export default function Tooth22() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth22Diagnozis = teethDiagnozis.tooth22;
  const sealColor1 = useSelector(getSealColor1Selector);
  const sealColor2 = useSelector(getSealColor2Selector);
  const sealColor3 = useSelector(getSealColor3Selector);
  const wsDefectColor = useSelector(getSealServicalColorSelector);
  const vinirColor = useSelector(getVinirColorSelector);
  const ceramicCrownColor = useSelector(getCeramicCrownColorSelector);
  const mceramicCrownColor = useSelector(getCeramicMCrownColorSelector);
  const metalicCrownColor = useSelector(getMetalicCrownColorSelector);
  const zirconiaCrownColor = useSelector(getZirconiaCrownColorSelector);
  const teethType = useSelector(teethTypeSelector);
  const selectedTooth = useSelector(getActiveToothNumberSelector);
  const allTeeth = useSelector(allTeethAdultSelector);

  const setColordedPart = (diagnozis, toothPart = '') => {
    if (diagnozis === 'caries') {
      if (toothPart === 'bottom') {
        teethDiagnozis.tooth22.caries_bottom =
          !teethDiagnozis.tooth22.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth22.caries_center =
          !teethDiagnozis.tooth22.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth22.caries_left =
          !teethDiagnozis.tooth22.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth22.caries_right =
          !teethDiagnozis.tooth22.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth22.caries_top = !teethDiagnozis.tooth22.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth22.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth22.seal_center_color = sealColor1;
          teethDiagnozis.tooth22.seal_center = true;
        } else if (
          teethDiagnozis.tooth22.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth22.seal_center_color = sealColor2;
          teethDiagnozis.tooth22.seal_center = true;
        } else if (
          teethDiagnozis.tooth22.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth22.seal_center_color = sealColor3;
          teethDiagnozis.tooth22.seal_center = true;
        } else {
          teethDiagnozis.tooth22.seal_center =
            !teethDiagnozis.tooth22.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth22.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth22.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth22.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth22.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth22.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth22.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth22.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth22.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth22.seal_bottom = true;
        } else {
          teethDiagnozis.tooth22.seal_bottom =
            !teethDiagnozis.tooth22.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth22.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth22.seal_left_color = sealColor1;
          teethDiagnozis.tooth22.seal_left = true;
        } else if (
          teethDiagnozis.tooth22.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth22.seal_left_color = sealColor2;
          teethDiagnozis.tooth22.seal_left = true;
        } else if (
          teethDiagnozis.tooth22.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth22.seal_left_color = sealColor3;
          teethDiagnozis.tooth22.seal_left = true;
        } else {
          teethDiagnozis.tooth22.seal_left = !teethDiagnozis.tooth22.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth22.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth22.seal_right_color = sealColor1;
          teethDiagnozis.tooth22.seal_right = true;
        } else if (
          teethDiagnozis.tooth22.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth22.seal_right_color = sealColor2;
          teethDiagnozis.tooth22.seal_right = true;
        } else if (
          teethDiagnozis.tooth22.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth22.seal_right_color = sealColor3;
          teethDiagnozis.tooth22.seal_right = true;
        } else {
          teethDiagnozis.tooth22.seal_right =
            !teethDiagnozis.tooth22.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth22.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth22.seal_top_color = sealColor1;
          teethDiagnozis.tooth22.seal_top = true;
        } else if (
          teethDiagnozis.tooth22.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth22.seal_top_color = sealColor2;
          teethDiagnozis.tooth22.seal_top = true;
        } else if (
          teethDiagnozis.tooth22.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth22.seal_top_color = sealColor3;
          teethDiagnozis.tooth22.seal_top = true;
        } else {
          teethDiagnozis.tooth22.seal_top = !teethDiagnozis.tooth22.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth22.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth22.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth22.wedge_shaped_defect_color =
          !teethDiagnozis.tooth22.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over') {
      if (teethType === 'adult' && !teethDiagnozis.tooth22.show) {
        document.getElementById('TH-22').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave') {
      if (teethType === 'child' && !teethDiagnozis.tooth62.show) {
        document.getElementById('TH-62').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth22.show) {
        document.getElementById('TH-22').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth62.show) {
          document.getElementById('TH-62').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over') {
      if (teethType === 'adult' && !teethDiagnozis.tooth22.show) {
        document.getElementById('TH-62').classList.remove('f-tooth-active');
        document.getElementById('TH-22').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave') {
      if (teethType === 'adult' && !teethDiagnozis.tooth22.show) {
        document.getElementById('TH-22').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth62.show) {
          document.getElementById('TH-62').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="22"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 1176.7275 716.1968)"
          className={`st3 st4 st5 ${selectedTooth === 22 ? 'num-active' : ''}`}
        >
          22
        </text>
      </g>
      <g
        id="TH-22"
        className={`f-tooth-init ${(teethDiagnozis.tooth22.show || allTeeth) && !teethDiagnozis.tooth22.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          teethDiagnozis.tooth22.show = !teethDiagnozis.tooth22.show;
          teethDiagnozis.tooth62.show = false;
          dispatch(setSelectedToothNumber(22));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              22,
              diagnozis,
              subDiagnozis,
              teethDiagnozis,
              dispatch,
              vinirColor,
              ceramicCrownColor,
              mceramicCrownColor,
              metalicCrownColor,
              zirconiaCrownColor,
              wsDefectColor
            );
            dispatch(setToothDiagnoze(tDiaData));
          }
          dispatch(setToothDiagnoze(teethDiagnozis));
        }}
      >
        <g
          className={`underlay ${selectedTooth === 22 ? 'selected' : ''}`}
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideTeeth('over');
          }}
          onMouseLeave={() => {
            showHideTeeth('leave');
          }}
        >
          <path
            className="st40"
            d="M1181,302.9c0,0-10,51-14,69s-16.6,82.9-17.8,104c-1.2,21-1.2,43,5.8,62
                        s-4.5,36.3-5.7,54.6c-1.2,18,2,102.9,7.7,120.4c5,15.3,17,24,32,23s30-6,32-32s-2-102-1-114s-17.1-30.8-16-50c1-18,16-34,17-72
                        c0.9-34.1,7.1-74,8-92c1-20,1-40,1-52c0-12,1-38-7-50s-26-8-32,1S1181,302.9,1181,302.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideTopCommonView('over');
          }}
          onMouseLeave={() => {
            showHideTopCommonView('leave');
          }}
        >
          {/* CHANGE COLOR/APEX/CULTTAB */}
          <g className="dentin">
            <g
              className="hEmpty hRoot hImplant"
              style={{
                visibility:
                  !tooth22Diagnozis.culttab &&
                  !tooth22Diagnozis.implant &&
                  !tooth22Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth22Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth22Diagnozis?.apex ? 'apex' : ''}`}
                d="M1211.2,597.2c1.9-4.6-2.9-8.6-9-10.1c-5.2-1.3-11.1-1.3-17-1.4
                                c-5.9-0.1-11.8-0.4-17.1,0.5c-5.7,0.9-10.9,3.8-10.7,8.5c0.1,2.5,2.1,4.6,4.3,6.3c2.5,1.9,5.4,3.5,7.7,5.7
                                c2.9,2.9,4.5,6.6,7.5,9.4c1.7,1.6,3.7,2.8,6.1,3.2c3.5,0.6,7-0.7,9.7-2.7c3.4-2.6,5.2-6.4,7.6-9.6c1-1.4,2.2-2.8,3.7-3.9
                                C1206.6,601.2,1210.1,600,1211.2,597.2z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth22Diagnozis?.apex || tooth22Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth22Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth22Diagnozis?.apex ? 'apex' : ''}`}
                d="M1215.51 594.821C1217.72 588.167 1212.14 582.381 1205.05 580.211C1199.01 578.331 1192.16 578.331 1185.3 578.187C1178.45 578.042 1171.6 577.608 1165.44 578.91C1158.82 580.212 1152.77 584.406 1153.01 591.205C1153.12 594.821 1155.45 597.858 1158 600.317C1160.91 603.065 1164.28 605.38 1166.95 608.562C1170.32 612.757 1172.18 618.108 1175.66
                                622.158C1177.64 624.473 1179.96 626.208 1182.75 626.787C1186.81 627.655 1190.88 625.775 1194.02 622.882C1197.97 619.121 1200.06 613.624 1202.85 608.996C1204.01 606.971 1205.4 604.946 1207.15 603.355C1210.17 600.606
                                1214.23 598.871 1215.51 594.821Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth22Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth22Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M1190.25 597.772C1190.25 598.17 1190.67 599.199 1188.65 601.356C1187.15 602.729 1186.64 605.151 1184.72 605.189C1182.65 605.229 1182.08 603.039 1180.74 601.58C1179.13 599.829 1178.91 598.545 1179.1 597.772C1179.5 596.179 1180.59 596.15 1184.72 596.125C1188.84 596.1 1190.25 597.374 1190.25 597.772Z"
                style={{ fill: '#e80808' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth22Diagnozis.implant || tooth22Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="1185" cy="600" r="19" />
            <g className="st27">
              <mask id="implant_22" className="st49">
                <path
                  className="st50"
                  d="M1175.11 588.345L1172.61 587.529C1170.48 589.673 1168.89 592.359 1168.08 595.363L1170.04 597.127C1169.86 598.058 1169.77 599.018 1169.77 600C1169.77 600.982 1169.86 601.942 1170.04 602.873L1168.08 604.637C1168.89 607.64 1170.48 610.327 1172.61 612.471L1175.11 611.655C1176.56 612.903 1178.24 613.887 1180.09 614.529L1180.63 617.109C1182.08 617.489 1183.59 617.692 1185.16 617.692C1186.72 617.692 1188.24 617.489 1189.68 617.108L1190.23 614.529C1192.07 613.886 1193.75 612.903 1195.2 611.654L1197.71 612.471C1199.84 610.327 1201.42 607.64 1202.23 604.635L1200.27 602.871C1200.45 601.941 1200.54 600.981 1200.54 600C1200.54 599.018 1200.45 598.059 1200.27 597.128L1202.23 595.364C1201.42 592.36 1199.84 589.673 1197.71 587.529L1195.2 588.345C1193.75 587.097 1192.07 586.114 1190.23 585.471L1189.68 582.892C1188.24 582.511 1186.72 582.308 1185.16 582.308C1183.59 582.308 1182.08 582.51 1180.63 582.891L1180.09 585.47C1178.24 586.113 1176.56 587.096 1175.11 588.345Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M1175.11 588.345L1172.61 587.529C1170.48 589.673 1168.89 592.359 1168.08 595.363L1170.04 597.127C1169.86 598.058 1169.77 599.018 1169.77 600C1169.77 600.982 1169.86 601.942 1170.04 602.873L1168.08 604.637C1168.89 607.64 1170.48 610.327 1172.61 612.471L1175.11 611.655C1176.56 612.903 1178.24 613.887 1180.09 614.529L1180.63 617.109C1182.08 617.489 1183.59 617.692 1185.16 617.692C1186.72 617.692 1188.24 617.489 1189.68 617.108L1190.23 614.529C1192.07 613.886 1193.75 612.903 1195.2 611.654L1197.71 612.471C1199.84 610.327 1201.42 607.64 1202.23 604.635L1200.27 602.871C1200.45 601.941 1200.54 600.981 1200.54 600C1200.54 599.018 1200.45 598.059 1200.27 597.128L1202.23 595.364C1201.42 592.36 1199.84 589.673 1197.71 587.529L1195.2 588.345C1193.75 587.097 1192.07 586.114 1190.23 585.471L1189.68 582.892C1188.24 582.511 1186.72 582.308 1185.16 582.308C1183.59 582.308 1182.08 582.51 1180.63 582.891L1180.09 585.47C1178.24 586.113 1176.56 587.096 1175.11 588.345Z"
              ></path>
              <path
                className="st52"
                d="M1172.61 587.529L1173.23 585.627L1172.06 585.246L1171.19 586.119L1172.61 587.529ZM1175.11 588.345L1174.49 590.247L1175.57 590.596L1176.42 589.859L1175.11 588.345ZM1168.08 595.363L1166.15 594.84L1165.82 596.028L1166.74 596.85L1168.08 595.363ZM1170.04 597.127L1172 597.498L1172.21 596.392L1171.38 595.64L1170.04 597.127ZM1170.04 602.873L1171.38 604.36L1172.21 603.607L1172 602.501L1170.04 602.873ZM1168.08 604.637L1166.74 603.149L1165.82 603.972L1166.15 605.159L1168.08 604.637ZM1172.61 612.471L1171.19 613.881L1172.05 614.754L1173.23 614.373L1172.61 612.471ZM1175.11 611.655L1176.42 610.14L1175.57 609.404L1174.49 609.753L1175.11 611.655ZM1180.09 614.529L1182.04 614.115L1181.81 613.012L1180.74 612.641L1180.09 614.529ZM1180.63 617.109L1178.68 617.523L1178.93 618.728L1180.12 619.043L1180.63 617.109ZM1189.68 617.108L1190.19 619.042L1191.38 618.728L1191.64 617.523L1189.68 617.108ZM1190.23 614.529L1189.57 612.64L1188.5 613.012L1188.27 614.114L1190.23 614.529ZM1195.2 611.654L1195.82 609.753L1194.75 609.404L1193.89 610.14L1195.2 611.654ZM1197.71 612.471L1197.09 614.372L1198.26 614.753L1199.12 613.88L1197.71 612.471ZM1202.23 604.635L1204.16 605.158L1204.49 603.971L1203.57 603.148L1202.23 604.635ZM1200.27 602.871L1198.31 602.5L1198.1 603.606L1198.94 604.358L1200.27 602.871ZM1200.27 597.128L1198.94 595.641L1198.1 596.394L1198.31 597.499L1200.27 597.128ZM1202.23 595.364L1203.57 596.851L1204.49 596.029L1204.16 594.842L1202.23 595.364ZM1197.71 587.529L1199.12 586.119L1198.26 585.246L1197.09 585.627L1197.71 587.529ZM1195.2 588.345L1193.89 589.86L1194.75 590.596L1195.82 590.247L1195.2 588.345ZM1190.23 585.471L1188.27 585.885L1188.5 586.988L1189.57 587.359L1190.23 585.471ZM1189.68 582.892L1191.64 582.477L1191.38 581.272L1190.19 580.958L1189.68 582.892ZM1180.63 582.891L1180.12 580.957L1178.93 581.271L1178.68 582.477L1180.63 582.891ZM1180.09 585.47L1180.74 587.358L1181.81 586.987L1182.04 585.885L1180.09 585.47ZM1171.99 589.43L1174.49 590.247L1175.73 586.443L1173.23 585.627L1171.99 589.43ZM1170.01 595.886C1170.73 593.225 1172.13 590.842 1174.02 588.938L1171.19 586.119C1168.82 588.503 1167.05 591.493 1166.15 594.84L1170.01 595.886ZM1171.38 595.64L1169.41 593.876L1166.74 596.85L1168.7 598.614L1171.38 595.64ZM1171.77 600C1171.77 599.143 1171.85 598.307 1172 597.498L1168.07 596.756C1167.87 597.808 1167.77 598.893 1167.77 600H1171.77ZM1172 602.501C1171.85 601.692 1171.77 600.856 1171.77 600H1167.77C1167.77 601.107 1167.87 602.191 1168.07 603.244L1172 602.501ZM1169.41 606.124L1171.38 604.36L1168.7 601.385L1166.74 603.149L1169.41 606.124ZM1174.02 611.061C1172.13 609.158 1170.73 606.775 1170.01 604.114L1166.15 605.159C1167.05 608.506 1168.82 611.497 1171.19 613.881L1174.02 611.061ZM1174.49 609.753L1171.99 610.569L1173.23 614.373L1175.73 613.556L1174.49 609.753ZM1180.74 612.641C1179.14 612.082 1177.68 611.227 1176.42 610.14L1173.81 613.169C1175.44 614.579 1177.34 615.691 1179.43 616.418L1180.74 612.641ZM1182.59 616.694L1182.04 614.115L1178.13 614.944L1178.68 617.523L1182.59 616.694ZM1185.16 615.692C1183.77 615.692 1182.42 615.512 1181.14 615.175L1180.12 619.043C1181.73 619.467 1183.42 619.692 1185.16 619.692V615.692ZM1189.17 615.174C1187.89 615.512 1186.55 615.692 1185.16 615.692V619.692C1186.89 619.692 1188.58 619.467 1190.19 619.042L1189.17 615.174ZM1188.27 614.114L1187.72 616.694L1191.64 617.523L1192.18 614.943L1188.27 614.114ZM1193.89 610.14C1192.63 611.227 1191.17 612.082 1189.57 612.64L1190.89 616.417C1192.97 615.69 1194.87 614.578 1196.5 613.169L1193.89 610.14ZM1198.32 610.569L1195.82 609.753L1194.58 613.556L1197.09 614.372L1198.32 610.569ZM1200.3 604.113C1199.58 606.774 1198.18 609.157 1196.29 611.061L1199.12 613.88C1201.49 611.496 1203.26 608.505 1204.16 605.158L1200.3 604.113ZM1198.94 604.358L1200.9 606.123L1203.57 603.148L1201.61 601.384L1198.94 604.358ZM1198.54 600C1198.54 600.856 1198.46 601.692 1198.31 602.5L1202.24 603.242C1202.44 602.19 1202.54 601.106 1202.54 600H1198.54ZM1198.31 597.499C1198.46 598.308 1198.54 599.144 1198.54 600H1202.54C1202.54 598.893 1202.44 597.809 1202.24 596.757L1198.31 597.499ZM1200.9 593.877L1198.94 595.641L1201.61 598.616L1203.57 596.851L1200.9 593.877ZM1196.29 588.939C1198.18 590.843 1199.58 593.226 1200.3 595.887L1204.16 594.842C1203.26 591.494 1201.49 588.504 1199.12 586.119L1196.29 588.939ZM1195.82 590.247L1198.32 589.431L1197.09 585.627L1194.58 586.444L1195.82 590.247ZM1189.57 587.359C1191.17 587.918 1192.63 588.773 1193.89 589.86L1196.51 586.831C1194.87 585.421 1192.97 584.31 1190.89 583.582L1189.57 587.359ZM1187.72 583.306L1188.27 585.885L1192.18 585.056L1191.64 582.477L1187.72 583.306ZM1185.16 584.308C1186.55 584.308 1187.89 584.488 1189.17 584.825L1190.19 580.958C1188.58 580.533 1186.89 580.308 1185.16 580.308V584.308ZM1181.14 584.825C1182.42 584.488 1183.77 584.308 1185.16 584.308V580.308C1183.42 580.308 1181.73 580.533 1180.12 580.957L1181.14 584.825ZM1182.04 585.885L1182.59 583.306L1178.68 582.477L1178.13 585.055L1182.04 585.885ZM1176.42 589.859C1177.68 588.772 1179.14 587.917 1180.74 587.358L1179.43 583.582C1177.34 584.309 1175.44 585.421 1173.81 586.83L1176.42 589.859Z"
                mask="url(#implant_22)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle
              className="st44"
              r="20.77"
              transform="matrix(-1 0 0 1 1183.23 599.77)"
            />
            <path
              className="st45"
              d="M1185.42 591.739C1184.87 589.804 1182.13 589.804 1181.58 591.739L1181.07 593.511C1180.77 594.549 1179.71 595.164 1178.66 594.902L1176.87 594.454C1174.92 593.965 1173.55 596.339 1174.95 597.785L1176.23 599.109C1176.98 599.884 1176.98 601.116 1176.23 601.891L1174.95 603.215C1173.55 604.661 1174.92 607.035 1176.87 606.546L1178.66 606.098C1179.71 605.836 1180.77 606.451 1181.07 607.489L1181.58 609.261C1182.13 611.196 1184.87 611.196 1185.42 609.261L1185.93 607.489C1186.23 606.451 1187.29 605.836 1188.34 606.098L1190.13 606.546C1192.08 607.035 1193.45 604.661 1192.05 603.215L1190.77 601.891C1190.02 601.116 1190.02 599.884 1190.77 599.109L1192.05 597.785C1193.45 596.339 1192.08 593.965 1190.13 594.454L1188.34 594.902C1187.29 595.164 1186.23 594.549 1185.93 593.511L1185.42 591.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth22Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth22Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M1215.51 594.821C1217.72 588.167 1212.14 582.381 1205.05 580.211C1199.01 578.331 1192.16 578.331 1185.3 578.187C1178.45 578.042 1171.6 577.608 1165.44 578.91C1158.82 580.212 1152.77 584.406 1153.01 591.205C1153.12 594.821 1155.45 597.858 1158 600.317C1160.91 603.065 1164.28 605.38 1166.95 608.562C1170.32 612.757 1172.18 618.108 1175.66 622.158C1177.64 624.473 1179.96 626.208 1182.75 626.787C1186.81 627.655 1190.88 625.775 1194.02 622.882C1197.97 619.121 1200.06 613.624 1202.85 608.996C1204.01 606.971 1205.4 604.946 1207.15 603.355C1210.05 600.606 1214.12 598.871 1215.51 594.821Z"
            ></path>
            <path
              className="st47"
              d="M1206.65 597.015C1208.23 592.262 1204.24 588.129 1199.18 586.58C1194.87 585.237 1189.97 585.237 1185.07 585.133C1180.18 585.03 1175.28 584.72 1170.88 585.65C1166.15 586.58 1161.84 589.576 1162 594.432C1162.09 597.015 1163.75 599.184 1165.57 600.941C1167.65 602.904 1170.05 604.557 1171.96 606.83C1174.37 609.826 1175.7 613.649 1178.19 616.542C1179.6 618.195 1181.26 619.435 1183.25 619.848C1186.15 620.468 1189.06 619.125 1191.3 617.058C1194.12 614.372 1195.61 610.446 1197.61 607.14C1198.44 605.693 1199.43 604.247 1200.68 603.11C1202.75 601.147 1205.65 599.908 1206.65 597.015Z"
            ></path>
            <circle
              className="st45"
              r="13"
              transform="matrix(-1 0 0 1 1185 600)"
            />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth22Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1215.5 594.822C1217.71 588.168 1212.13 582.382 1205.05 580.212C1199.01 578.332 1192.15 578.332 1185.3 578.187C1178.44 578.043 1171.59 577.609 1165.43 578.911C1158.81 580.213 1152.77 584.407 1153 591.206C1153.12 594.822 1155.44 597.859 1158 600.318C1160.9 603.066 1164.27 605.381 1166.94 608.563C1170.31 612.758 1172.17 618.109 1175.65 622.159C1177.63 624.474 1179.95 626.209 1182.74 626.788C1186.81 627.656 1190.87 625.775 1194.01 622.883C1197.96 619.122 1200.05 613.625 1202.84 608.997C1204 606.972 1205.4 604.947 1207.14 603.356C1210.04 600.607 1214.11 598.872 1215.5 594.822Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M1206.64 597.016C1208.22 592.263 1204.24 588.13 1199.18 586.581C1194.86 585.237 1189.96 585.238 1185.07 585.134C1180.17 585.031 1175.28 584.721 1170.88 585.651C1166.15 586.581 1161.83 589.577 1162 594.433C1162.08 597.016 1163.74 599.185 1165.57 600.942C1167.64 602.905 1170.05 604.558 1171.96 606.831C1174.36 609.827 1175.69 613.65 1178.18 616.543C1179.59 618.196 1181.25 619.436 1183.24 619.849C1186.15 620.469 1189.05 619.126 1191.29 617.059C1194.11 614.373 1195.61 610.447 1197.6 607.141C1198.43 605.694 1199.42 604.248 1200.67 603.111C1202.74 601.148 1205.65 599.909 1206.64 597.016Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle
              className="st57"
              r="12.25"
              transform="matrix(-1 0 0 1 1184.99 600.001)"
              style={{ fill: 'black', opacity: tooth22Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth22Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth22Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M1215.51 594.821C1217.72 588.167 1212.14 582.381 1205.05 580.211C1199.01 578.331 1192.16 578.331 1185.3 578.187C1178.45 578.042 1171.6 577.608 1165.44 578.91C1158.82 580.212 1152.77 584.406 1153.01 591.205C1153.12 594.821 1155.45 597.858 1158 600.317C1160.91 603.065 1164.28 605.38 1166.95 608.562C1170.32 612.757 1172.18 618.108 1175.66 622.158C1177.64 624.473 1179.96 626.208 1182.75 626.787C1186.81 627.655 1190.88 625.775 1194.02 622.882C1197.97 619.121 1200.06 613.624 1202.85 608.996C1204.01 606.971 1205.4 604.946 1207.15 603.355C1210.05 600.606 1214.12 598.871 1215.51 594.821Z"
            ></path>
            <path
              className="st47"
              d="M1206.65 597.015C1208.23 592.262 1204.24 588.129 1199.18 586.58C1194.87 585.237 1189.97 585.237 1185.07 585.133C1180.18 585.03 1175.28 584.72 1170.88 585.65C1166.15 586.58 1161.84 589.576 1162 594.432C1162.09 597.015 1163.75 599.184 1165.57 600.941C1167.65 602.904 1170.05 604.557 1171.96 606.83C1174.37 609.826 1175.7 613.649 1178.19 616.542C1179.6 618.195 1181.26 619.435 1183.25 619.848C1186.15 620.468 1189.06 619.125 1191.3 617.058C1194.12 614.372 1195.61 610.446 1197.61 607.14C1198.44 605.693 1199.43 604.247 1200.68 603.11C1202.75 601.147 1205.65 599.908 1206.65 597.015Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth22Diagnozis.culttab &&
                !tooth22Diagnozis.abutment &&
                !tooth22Diagnozis.implant &&
                !tooth22Diagnozis.apex &&
                !tooth22Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1213.9,581.6c-1.8-1.2-3.9-2.2-6.2-2.8c-6.8-1.9-14.5-1.9-22.2-2
                            c-7.8-0.1-15.5-0.4-22.5,1c-2.7,0.5-5.4,1.5-7.6,2.9c-3.9,2.4-6.6,6-6.5,10.6c0.1,4,2.7,7.2,5.6,9.8c3.3,3,7.1,5.5,10,8.9
                            c1,1.2,1.9,2.5,2.8,3.9c2.3,3.7,4.1,7.7,7,10.9c2.2,2.4,4.9,4.4,8,5c4.6,0.9,9.2-1.1,12.7-4.4c3.2-3,5.4-6.9,7.5-10.7
                            c0.8-1.5,1.7-3,2.6-4.5c1.4-2.2,2.9-4.4,4.8-6.1c3.4-3,8-4.9,9.6-9.4C1221.2,589.5,1218.5,584.7,1213.9,581.6z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth22.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1174.26 626.3C1176.55 629.034 1179.24 632.199 1182.47 632.883C1185.02 633.438 1187.57 631.929 1189.95 630.907C1191.96 630.041 1194.95 628.724 1196.62 627.154C1199.23 624.615 1200.06 621.406 1201.82 618.101C1203.14 615.622 1205.46 613.089 1206.85 610.745C1208.2 608.352 1208.72 607.072 1210.74 605.192C1212.41 603.642 1214.36 601.251 1216.1 599.818C1218 598.25 1219.66 596.495 1220.43 593.993C1221.63 590.3 1220.85 586.833 1218.82 583.929C1217.7 582.322 1217.29 580.888 1215.54 579.683C1213.72 578.429 1211.63 576.309 1209.41 575.615C1206.68 574.749 1202.71 575.334 1199.75 575.001C1197.61 574.761 1195.43 573.509 1193.22 573.42C1190.64 573.316 1188.04 574.392 1185.43 574.336C1182.57 574.274 1179.7 573.055 1176.87 573.016C1174.48 572.984 1172.11 573 1169.79 573.133C1167.26 573.279 1164.79 574.677 1162.41 575.191C1160.23 575.629 1158.1 575.231 1156.17 576.216C1154.37 577.138 1152.75 578.296 1151.44 579.683C1149.23 582.018 1147.89 586.116 1148.01 589.72C1148.08 591.941 1148.84 595.092 1149.97 596.944C1151.01 598.654 1152.37 600.207 1153.8 601.602C1155.59 603.336 1156.45 603.809 1158.35 605.484C1160.01 606.948 1161.63 608.478 1163.07 610.232C1165.29 613.05 1166.95 616.31 1168.7 619.478C1170.03 621.882 1172.52 624.234 1174.26 626.3ZM1205.05 580.213C1212.14 582.383 1217.71 588.169 1215.51 594.823C1214.23 598.873 1210.16 600.608 1207.14 603.357C1205.4 604.948 1204 606.973 1202.84 608.998C1200.05 613.626 1197.96 619.123 1194.01 622.884C1190.88 625.776 1186.81 627.657 1182.74 626.789C1179.95 626.21 1177.63 624.475 1175.66 622.16C1172.17 618.11 1170.31 612.759 1166.94 608.564C1164.27 605.382 1160.9 603.067 1158 600.319C1155.44 597.86 1153.12 594.823 1153 591.206C1152.77 584.408 1158.81 580.213 1165.43 578.912C1171.59 577.61 1178.44 578.044 1185.3 578.188C1192.15 578.333 1199.01 578.333 1205.05 580.213Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1174.26 626.3C1176.55 629.034 1179.24 632.199 1182.47 632.883C1185.02 633.438 1187.57 631.929 1189.95 630.907C1191.96 630.041 1194.95 628.724 1196.62 627.154C1199.23 624.615 1200.06 621.406 1201.82 618.101C1203.14 615.622 1205.46 613.089 1206.85 610.745C1208.2 608.352 1208.72 607.072 1210.74 605.192C1212.41 603.642 1214.36 601.251 1216.1 599.818C1218 598.25 1219.66 596.495 1220.43 593.993C1221.63 590.3 1220.85 586.833 1218.82 583.929C1217.7 582.322 1217.29 580.888 1215.54 579.683C1213.72 578.429 1211.63 576.309 1209.41 575.615C1206.68 574.749 1202.71 575.334 1199.75 575.001C1197.61 574.761 1195.43 573.509 1193.22 573.42C1190.64 573.316 1188.04 574.392 1185.43 574.336C1182.57 574.274 1179.7 573.055 1176.87 573.016C1174.48 572.984 1172.11 573 1169.79 573.133C1167.26 573.279 1164.79 574.677 1162.41 575.191C1160.23 575.629 1158.1 575.231 1156.17 576.216C1154.37 577.138 1152.75 578.296 1151.44 579.683C1149.23 582.018 1147.89 586.116 1148.01 589.72C1148.08 591.941 1148.84 595.092 1149.97 596.944C1151.01 598.654 1152.37 600.207 1153.8 601.602C1155.59 603.336 1156.45 603.809 1158.35 605.484C1160.01 606.948 1161.63 608.478 1163.07 610.232C1165.29 613.05 1166.95 616.31 1168.7 619.478C1170.03 621.882 1172.52 624.234 1174.26 626.3ZM1205.05 580.213C1212.14 582.383 1217.71 588.169 1215.51 594.823C1214.23 598.873 1210.16 600.608 1207.14 603.357C1205.4 604.948 1204 606.973 1202.84 608.998C1200.05 613.626 1197.96 619.123 1194.01 622.884C1190.88 625.776 1186.81 627.657 1182.74 626.789C1179.95 626.21 1177.63 624.475 1175.66 622.16C1172.17 618.11 1170.31 612.759 1166.94 608.564C1164.27 605.382 1160.9 603.067 1158 600.319C1155.44 597.86 1153.12 594.823 1153 591.206C1152.77 584.408 1158.81 580.213 1165.43 578.912C1171.59 577.61 1178.44 578.044 1185.3 578.188C1192.15 578.333 1199.01 578.333 1205.05 580.213Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1175.1 623.862C1177.2 626.318 1179.67 629.16 1182.64 629.774C1184.98 630.272 1187.32 628.917 1189.5 628C1191.35 627.222 1194.09 626.039 1195.62 624.629C1198.02 622.349 1198.78 619.468 1200.39 616.5C1201.61 614.274 1203.74 611.999 1205.01 609.893C1206.25 607.744 1206.73 606.595 1208.58 604.907C1210.12 603.515 1211.9 601.368 1213.5 600.082C1215.25 598.673 1216.77 597.097 1217.48 594.85C1218.58 591.534 1217.86 588.42 1216 585.812C1214.97 584.37 1214.6 583.082 1212.99 582C1211.32 580.873 1209.4 578.97 1207.36 578.347C1204.85 577.569 1201.22 578.094 1198.5 577.795C1196.54 577.579 1194.53 576.455 1192.5 576.375C1190.14 576.282 1187.75 577.248 1185.36 577.198C1182.73 577.143 1180.1 576.047 1177.5 576.013C1175.3 575.984 1173.13 575.998 1171 576.118C1168.68 576.249 1166.41 577.505 1164.23 577.965C1162.22 578.359 1160.27 578.001 1158.5 578.886C1156.85 579.714 1155.36 580.754 1154.16 582C1152.13 584.097 1150.9 587.777 1151.01 591.013C1151.07 593.008 1151.77 595.837 1152.81 597.5C1153.77 599.036 1155.01 600.431 1156.32 601.683C1157.97 603.24 1158.76 603.665 1160.5 605.17C1162.02 606.484 1163.51 607.858 1164.83 609.433C1166.87 611.964 1168.39 614.891 1170 617.736C1171.22 619.895 1173.5 622.007 1175.1 623.862ZM1205.05 580.211C1212.14 582.381 1217.71 588.167 1215.51 594.821C1214.23 598.871 1210.16 600.606 1207.14 603.355C1205.4 604.946 1204 606.971 1202.84 608.996C1200.05 613.624 1197.96 619.121 1194.01 622.882C1190.88 625.775 1186.81 627.655 1182.74 626.787C1179.95 626.208 1177.63 624.473 1175.66 622.158C1172.17 618.108 1170.31 612.757 1166.94 608.562C1164.27 605.38 1160.9 603.065 1158 600.317C1155.44 597.858 1153.12 594.821 1153 591.205C1152.77 584.406 1158.81 580.212 1165.43 578.91C1171.59 577.608 1178.44 578.042 1185.3 578.187C1192.15 578.331 1199.01 578.331 1205.05 580.211Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth22Diagnozis.culttab &&
                !tooth22Diagnozis.abutment &&
                !tooth22Diagnozis.implant &&
                !tooth22Diagnozis.shaper &&
                !tooth22Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС LEFT*/}
            <g
              id="s_header_22_4"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M1172.1,602.1c-0.2,1.3-0.7,2.5-1.2,3.8c-0.9,2.1-2.5,5.5-3.6,8c-0.8-1.4-1.7-2.7-2.8-3.9
                                c-2.9-3.4-6.7-5.9-10-8.9c-2.9-2.6-5.5-5.9-5.6-9.8c-0.2-4.6,2.6-8.2,6.5-10.6c4.3,3.6,13.8,11.5,15.5,14
                                C1172.3,596.9,1172.6,599.5,1172.1,602.1z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth22.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth22.seal_left ? `seal-fill ${teethDiagnozis.tooth22.seal_left_color}` : ''}
                                `}
                d="M1172.1,602.1c-0.2,1.3-0.7,2.5-1.2,3.8c-0.9,2.1-2.5,5.5-3.6,8c-0.8-1.4-1.7-2.7-2.8-3.9
                                c-2.9-3.4-6.7-5.9-10-8.9c-2.9-2.6-5.5-5.9-5.6-9.8c-0.2-4.6,2.6-8.2,6.5-10.6c4.3,3.6,13.8,11.5,15.5,14
                                C1172.3,596.9,1172.6,599.5,1172.1,602.1z"
              />
            </g>
            <g
              id="s_header_22_3"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M1202.5,614.7c-2.1,3.8-4.3,7.7-7.5,10.7c-3.5,3.3-8.1,5.3-12.7,4.4c-3.1-0.6-5.9-2.5-8-5
                                c-2.9-3.2-4.7-7.2-7-10.9c1.1-2.5,2.7-5.9,3.6-8c0.5-1.2,1-2.5,1.2-3.8c5.9-0.5,16.3-1.3,23.3-1.3
                                C1195.4,603.2,1199.6,610.1,1202.5,614.7z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth22.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth22.seal_bottom ? `seal-fill ${teethDiagnozis.tooth22.seal_bottom_color}` : ''}
                                `}
                d="M1202.5,614.7c-2.1,3.8-4.3,7.7-7.5,10.7c-3.5,3.3-8.1,5.3-12.7,4.4c-3.1-0.6-5.9-2.5-8-5
                                c-2.9-3.2-4.7-7.2-7-10.9c1.1-2.5,2.7-5.9,3.6-8c0.5-1.2,1-2.5,1.2-3.8c5.9-0.5,16.3-1.3,23.3-1.3
                                C1195.4,603.2,1199.6,610.1,1202.5,614.7z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_22_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M1219.4,594.7c-1.5,4.4-6.2,6.3-9.5,9.4c-1.9,1.7-3.5,3.9-4.8,6.1c-0.9,1.5-1.7,3-2.6,4.5
                                c-2.9-4.5-7-11.5-7.1-13.9c0-0.3,0-0.5,0.1-0.6c1.1-1.7,12.9-13.2,18.4-18.5C1218.5,584.7,1221.2,589.5,1219.4,594.7z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth22.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth22.seal_right ? `seal-fill ${teethDiagnozis.tooth22.seal_right_color}` : ''}
                                `}
                d="M1219.4,594.7c-1.5,4.4-6.2,6.3-9.5,9.4c-1.9,1.7-3.5,3.9-4.8,6.1c-0.9,1.5-1.7,3-2.6,4.5
                                c-2.9-4.5-7-11.5-7.1-13.9c0-0.3,0-0.5,0.1-0.6c1.1-1.7,12.9-13.2,18.4-18.5C1218.5,584.7,1221.2,589.5,1219.4,594.7z"
              />
            </g>
            {/*КАРИЕС TOP*/}
            <g
              id="s_header_22_1"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M1213.9,581.6c-5.6,5.4-17.4,16.9-18.4,18.5c-0.1,0.1-0.1,0.4-0.1,0.6c-6.9,0-17.4,0.8-23.3,1.3
                                c0.5-2.6,0.3-5.2-1.2-7.5c-1.7-2.5-11.1-10.4-15.5-14c2.2-1.4,4.9-2.3,7.6-2.9c7-1.4,14.7-1.1,22.5-1c7.7,0.1,15.4,0.1,22.2,2
                                C1210,579.4,1212.1,580.4,1213.9,581.6z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth22.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth22.seal_top ? `seal-fill ${teethDiagnozis.tooth22.seal_top_color}` : ''}
                                `}
                d="M1213.9,581.6c-5.6,5.4-17.4,16.9-18.4,18.5c-0.1,0.1-0.1,0.4-0.1,0.6c-6.9,0-17.4,0.8-23.3,1.3
                                c0.5-2.6,0.3-5.2-1.2-7.5c-1.7-2.5-11.1-10.4-15.5-14c2.2-1.4,4.9-2.3,7.6-2.9c7-1.4,14.7-1.1,22.5-1c7.7,0.1,15.4,0.1,22.2,2
                                C1210,579.4,1212.1,580.4,1213.9,581.6z"
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_right &&
                      !tooth22Diagnozis.seal_bottom &&
                      !tooth22Diagnozis.seal_center) ||
                    (tooth22Diagnozis.seal_bottom &&
                      !tooth22Diagnozis.seal_center &&
                      !tooth22Diagnozis.seal_left &&
                      !tooth22Diagnozis.seal_right &&
                      tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_right &&
                      !tooth22Diagnozis.seal_top &&
                      !tooth22Diagnozis.seal_center &&
                      tooth22Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1195 601C1195.33 602.5 1196.7 606.4 1199.5 610"
              />
              {/*Овал лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_right &&
                      !tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_right && tooth22Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1195 601C1197.67 597.667 1204.5 589.8 1210.5 585"
              />
              {/*Черточка верх лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_bottom &&
                      !tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_bottom &&
                      !tooth22Diagnozis.seal_center &&
                      tooth22Diagnozis.seal_top) ||
                    (tooth22Diagnozis.seal_right &&
                      !tooth22Diagnozis.seal_bottom &&
                      tooth22Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1195 601C1191 600.5 1180.9 600 1172.5 602"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_left &&
                      !tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_left && tooth22Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1172.5 602C1174.17 599.667 1173.9 592.8 1159.5 584"
              />
              {/*Черточка верх право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_left &&
                      !tooth22Diagnozis.seal_bottom) ||
                    (!tooth22Diagnozis.seal_left &&
                      tooth22Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1173 602L1169.5 608.5"
              />
            </g>
          </g>
          {/* VINIR */}
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth22Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth22Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1213.89 581.601C1212.09 580.401 1209.99 579.401 1207.69 578.801C1200.89 576.901 1193.19 576.901 1185.49 576.801C1177.69 576.701 1169.99 576.401 1162.99 577.801C1160.29 578.301 1157.59 579.301 1155.39 580.701C1151.49 583.101 1148.79 586.701 1148.89 591.301C1148.91 591.884 1148.98 592.45 1149.09 593C1150.69 593.072 1155.4 592.303 1161.49 588.644C1162.13 588.001 1162.86 587.427 1163.66 586.924C1165.23 585.9 1167.17 585.168 1169.11 584.803C1174.13 583.778 1179.65 583.998 1185.24 584.071C1190.76 584.144 1196.29 584.144 1201.16 585.534C1202.81 585.973 1204.32 586.705 1205.61 587.582C1206.03 587.869 1206.42 588.176 1206.79 588.5C1208.46 589.833 1213.42 592.6 1219.9 593C1220.58 588.465 1217.99 584.36 1213.89 581.601Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth22Diagnozis.temporary_crown ||
                tooth22Diagnozis.ceramic_crown ||
                tooth22Diagnozis.mceramic_crown ||
                tooth22Diagnozis.metalic_crown ||
                tooth22Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth22Diagnozis.temporary_crown ||
                tooth22Diagnozis.ceramic_crown ||
                tooth22Diagnozis.mceramic_crown ||
                tooth22Diagnozis.metalic_crown ||
                tooth22Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth22Diagnozis.ceramic_crown_color}
                                ${tooth22Diagnozis.mceramic_crown_color}
                                ${tooth22Diagnozis.metalic_crown_color}
                                ${tooth22Diagnozis.zirconia_crown_color}
                            `}
              d="M1213.9,581.6c-1.8-1.2-3.9-2.2-6.2-2.8c-6.8-1.9-14.5-1.9-22.2-2
                            c-7.8-0.1-15.5-0.4-22.5,1c-2.7,0.5-5.4,1.5-7.6,2.9c-3.9,2.4-6.6,6-6.5,10.6c0.1,4,2.7,7.2,5.6,9.8c3.3,3,7.1,5.5,10,8.9
                            c1,1.2,1.9,2.5,2.8,3.9c2.3,3.7,4.1,7.7,7,10.9c2.2,2.4,4.9,4.4,8,5c4.6,0.9,9.2-1.1,12.7-4.4c3.2-3,5.4-6.9,7.5-10.7
                            c0.8-1.5,1.7-3,2.6-4.5c1.4-2.2,2.9-4.4,4.8-6.1c3.4-3,8-4.9,9.6-9.4C1221.2,589.5,1218.5,584.7,1213.9,581.6z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideTopCommonView('over');
          }}
          onMouseLeave={() => {
            showHideTopCommonView('leave');
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              id="dentin_v_24"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth22Diagnozis.implant &&
                  !tooth22Diagnozis.apex &&
                  !tooth22Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth22Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1219.5,436.9c-0.8,7.4-2,14.7-3.7,21.9c-2.5,10.3-6,20.4-10.5,30.1l-1.1,1.5
                                l-1.9,1.4l-38.5-5.2l-2.1-1l-1.7-2.4c-0.9-7.7-1.3-15.5-1.1-23.2c0.1-5.1,0.4-10.2,1.4-15.3c0.8-4,2-7.8,3.1-11.7v0
                                c2-3.2,4.3-6.1,6.9-8.7c4.2-4.2,9.2-7.3,14.6-9.2c0.8-0.3,1.5-0.5,2.3-0.7c4.3-1.1,8.7-1.4,12.9-0.3c1.8,0.4,3.6,1.1,5.2,2
                                c6.7,3.6,11,10.5,13.3,18C1219,434.9,1219.3,435.9,1219.5,436.9z"
              />
            </g>
            <g
              id="dentin_n_24"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth22Diagnozis.implant &&
                  !tooth22Diagnozis.abutment &&
                  !tooth22Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_x5F_n_x5F_22_1_"
                className={`st10 change-color ${tooth22Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1221.2,371.8c-0.6,10.2-0.5,20.5-0.4,30.7c0.1,10.2,0,20.3-0.8,30.4
                                c-0.1,1.3-0.2,2.6-0.4,3.9c-0.2-1-0.5-2-0.8-3c-2.2-7.5-6.6-14.4-13.3-18c-1.7-0.9-3.4-1.6-5.2-2c-4.2-1-8.6-0.8-12.9,0.3
                                c-0.8,0.2-1.6,0.4-2.3,0.7c-5.4,1.9-10.4,5-14.6,9.2c-2.6,2.6-4.9,5.5-6.9,8.7c0.5-1.6,0.9-3.2,1.4-4.7c2.8-10.6,4-21.5,5.4-32.4
                                c2.6-19.8,6.2-39.4,10.1-59c3-15.2,6.1-30.5,10.7-45.2c2.5-7.8,6.9-15.6,14.4-15.6c1.1,0,2.1,0.2,3.1,0.5c0,0,0,0,0.1,0
                                c6.5,2,9.7,10.2,10.8,18.2c0.9,6.6,1.5,13.2,2.2,19.8c0.8,8.2,1.7,16.4,1.7,24.7C1223.3,350,1221.8,360.9,1221.2,371.8z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.pulpit ? 'pulpit' : ''} ${tooth22Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1200.3,431.5c-0.3,4.7-0.9,9.3-1.7,14c-0.7,3.9-1.5,7.8-2.3,11.6l-1.2,1.7
                                l-12.7-1l-1-2c-0.5-6.5-0.2-13.2,0.8-19.8c1-6.3,2.8-12.5,4.4-18.6c0.5-2.1,1-4.2,0.8-3.1c0,0,0,0,0,0c1.5-0.4,3-0.7,4.6-0.8
                                c0.3,0,0.6-0.1,0.9-0.1c1.8-0.1,3.6-0.1,5.3,0.2c0.2,0,0.5,0.1,0.7,0.1c0.5,0.1,0.9,0.2,1.4,0.3
                                C1200.4,419.7,1200.6,425.6,1200.3,431.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.pulpit ? 'pulpit' : ''} ${tooth22Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1200.2,413.9L1200.2,413.9c-0.4-0.1-0.9-0.2-1.4-0.3c-0.2,0-0.5-0.1-0.7-0.1
                                c-1.8-0.3-3.5-0.3-5.3-0.2c-0.3,0-0.6,0-0.9,0.1c-1.5,0.2-3.1,0.4-4.6,0.8c0,0,0,0,0,0c5.6-22.6,9.2-45.7,12.2-68.8
                                c1.3-0.2,2.7-0.3,4.1-0.2c0.2,0,0.4,0,0.7,0c-2.3,21.8-4.6,43.7-4.2,65.6C1200.2,411.9,1200.2,412.9,1200.2,413.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.channel_class} ${tooth22Diagnozis.pulpit ? 'pulpit' : ''} ${tooth22Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M1208.6,275.9v0.5c0.1,10.3-0.2,20.7-0.8,31c-0.8,12.7-2.1,25.3-3.5,37.9
                                c-0.2,0-0.4,0-0.7,0c-1.4-0.1-2.8,0-4.1,0.2c1.5-11.3,2.9-22.7,4.3-34c1.5-11.7,3.1-23.4,4.7-35.1v0
                                C1208.6,276.2,1208.6,276.1,1208.6,275.9z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage22 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth22Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M1220.1 437.1C1219.3 444.5 1218.1 451.8 1216.4 459C1213.9 469.3 1210.4 479.4 1205.9 489.1L1204.8 490.6L1202.9 492L1164.4 486.8L1162.3 485.8L1160.6 483.4C1159.7 475.7 1159.3 467.9 1159.4 460.2C1159.5 455.1 1159.8 450 1160.8 444.9C1161.6 440.9 1162.8 437 1164 433.1C1164.2 432.7 1164.5 432.3 1164.8 432C1165.1 431.6 1165.3 431.2 1165.6 430.8C1165.8 430.5 1166 430.3 1166.2 430C1166.4 429.7 1166.7 429.4 1166.9
                            429C1167.1 428.7 1167.3 428.4 1167.6 428.2C1167.7 428.1 1167.8 428 1167.9 427.8C1168.2 427.4 1168.5 427.1 1168.8 426.7C1169.2 426.3 1169.5 425.9 1169.9 425.5C1170.3 425.1 1170.6 424.7 1171 424.4C1171.3 424.1 1171.5 423.9 1171.8 423.6C1172.9 422.6 1174 421.7 1175.1 420.8C1178.3 418.4 1181.8 416.5 1185.5 415.2C1185.7 415.1 1185.9 415.1 1186.1 415C1186.7 414.8 1187.2 414.6 1187.8 414.5C1188.2 414.4 1188.6 414.3 1188.9 414.2C1189.5 414.1 1190 414 1190.6 413.9C1190.9 413.8 1191.1 413.8
                            1191.4 413.8C1191.7 413.7 1192 413.7 1192.3 413.7C1192.6 413.7 1192.9 413.7 1193.2 413.6H1193.3C1193.9 413.6 1194.5 413.5 1195.1 413.5C1195.4 413.5 1195.7 413.5 1196 413.5C1196.2 413.5 1196.4 413.5 1196.7 413.5C1196.9 413.5 1197 413.5 1197.2 413.5C1197.4 413.5 1197.6 413.5 1197.8 413.5C1197.9 413.5 1197.9 413.5 1198 413.5C1198.2 413.5 1198.4 413.5 1198.6 413.6C1198.8 413.6 1199 413.7 1199.3 413.7C1199.3 413.7 1199.3 413.7 1199.4 413.7C1199.8 413.8 1200.3 413.9 1200.7 414C1201.5 414.2 1202.4 414.5 1203.2 414.8C1204.1 415.1 1205 415.6 1205.9 416C1208 417.1
                            1209.9 418.6 1211.5 420.3C1215.1 424 1217.6 428.9 1219.2 434C1219.7 435.1 1219.9 436.1 1220.1 437.1Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M1206.8 330.5L1194.2 490.6L1173 487.7L1186.5 414.9L1186.6 414.5L1194.9 369.9L1196.2 362.8L1202.3 330C1202.5 328.9 1203.5 328.1 1204.6 328.1C1205.8 328.2 1206.8
                            329.2 1206.8 330.5Z"
              style={{ fill: tooth22Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth22Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth22Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st16"
              d="M1206.6,330.5L1206.6,330.5l-3.3,84.4c-0.8-0.3-1.7-0.6-2.5-0.8h0c-0.5-0.1-0.9-0.2-1.3-0.3c0,0,0,0-0.1,0
                            c-0.2,0-0.4-0.1-0.7-0.1c0,0,0,0,0,0c-0.2,0-0.4-0.1-0.6-0.1c-0.1,0-0.1,0-0.2,0c-0.2,0-0.4,0-0.6,0c-0.2,0-0.3,0-0.5,0
                            c-0.2,0-0.4,0-0.7,0c-0.3,0-0.6,0-0.9,0c-0.6,0-1.2,0-1.8,0.1h-0.1c-0.3,0-0.6,0-0.9,0.1c0,0,0,0,0,0c-0.3,0-0.6,0.1-0.9,0.1
                            c-0.3,0-0.5,0.1-0.8,0.1c-0.6,0.1-1.1,0.2-1.7,0.3c-0.4,0.1-0.8,0.2-1.1,0.3h0c-0.6,0.1-1.1,0.3-1.7,0.5l15.8-84.9
                            c0.2-1.1,1.2-1.9,2.3-1.9C1205.6,328.2,1206.6,329.2,1206.6,330.5z"
            />
            <path
              className="st15"
              d="M1220.1,437.1c-0.8,7.4-2,14.7-3.7,21.9c-2.5,10.3-6,20.4-10.5,30.1l-1.1,1.5l-1.9,1.4l-38.5-5.2l-2.1-1
                            l-1.7-2.4c-0.9-7.7-1.3-15.5-1.2-23.2c0.1-5.1,0.4-10.2,1.4-15.3c0.8-4,2-7.9,3.2-11.8v0c0.2-0.4,0.5-0.8,0.8-1.1
                            c0.3-0.4,0.5-0.8,0.8-1.2c0.2-0.3,0.4-0.5,0.6-0.8c0.2-0.3,0.5-0.6,0.7-1c0.2-0.3,0.4-0.6,0.7-0.8c0.1-0.1,0.2-0.2,0.3-0.4
                            c0.3-0.4,0.6-0.7,0.9-1.1c0.4-0.4,0.7-0.8,1.1-1.2c0.4-0.4,0.7-0.8,1.1-1.1c0.3-0.3,0.5-0.5,0.8-0.8c1.1-1,2.2-1.9,3.3-2.8
                            c3.2-2.4,6.7-4.3,10.4-5.6c0.2-0.1,0.4-0.1,0.6-0.2c0.6-0.2,1.1-0.4,1.7-0.5h0c0.4-0.1,0.8-0.2,1.1-0.3c0.6-0.1,1.1-0.2,1.7-0.3
                            c0.3-0.1,0.5-0.1,0.8-0.1c0.3-0.1,0.6-0.1,0.9-0.1c0,0,0,0,0,0c0.3,0,0.6,0,0.9-0.1h0.1c0.6,0,1.2-0.1,1.8-0.1c0.3,0,0.6,0,0.9,0
                            c0.2,0,0.4,0,0.7,0c0.2,0,0.3,0,0.5,0c0.2,0,0.4,0,0.6,0c0.1,0,0.1,0,0.2,0c0.2,0,0.4,0,0.6,0.1c0,0,0,0,0,0
                            c0.2,0,0.4,0.1,0.7,0.1c0,0,0,0,0.1,0c0.4,0.1,0.9,0.2,1.3,0.3h0c0.8,0.2,1.7,0.5,2.5,0.8c0.9,0.3,1.8,0.8,2.7,1.2
                            c2.1,1.1,4,2.6,5.6,4.3c3.6,3.7,6.1,8.6,7.7,13.7C1219.7,435.1,1219.9,436.1,1220.1,437.1z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth22Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth22Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M1164,433c2-3.2,4.3-6.1,6.9-8.7c4.2-4.1,9.2-7.3,14.6-9.2c6.8-2.3,14.1-2.5,20.5,1
                            c5.8,3.1,11.7,14.6,14.1,20.8l-10.9-37.1l-25.9-2.4L1164,433z"
            />
            <path
              className="st17"
              d="M1160.6,483.3l1.7,2.4l2.1,1l38.5,5.2l1.9-1.4l1.1-1.5c4.5-9.7,8-19.8,10.5-30.1c1.7-7.2,3-14.6,3.7-21.9
                            c-0.2-1-0.5-2-0.8-3c-0.1-0.3-0.2-0.7-0.3-1l-0.8-2.1c-2.4-6.2-6.4-11.7-12.2-14.8c-6.3-3.4-13.7-3.3-20.5-1
                            c-5.4,1.9-10.4,5-14.6,9.2c-2.6,2.6-4.9,5.5-6.9,8.7c-1.2,3.9-2.4,7.8-3.2,11.8c-1,5-1.3,10.2-1.4,15.3
                            C1159.3,467.8,1159.7,475.6,1160.6,483.3z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M1170.29 437.859C1169.73 440.197 1171.34 442.496 1173.73 442.763L1205.76 446.344C1208.15 446.611 1210.23 444.726 1210.2 442.324L1209.76 402.614C1209.74 400.587 1208.2 398.898 1206.19 398.682L1183.8 396.284C1181.8 396.07 1179.95 397.375 1179.48 399.333L1170.29 437.859Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility: tooth22Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth22Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st18"
              d="M1176.5,398.9l37.9,3.6c1.8-20.1,3.1-40.2,3.9-60.3c0.8-19.5,1.2-39,1.1-58.5c-2.7-3.8-6.8-6.3-11.4-6.7
                            c-4.8-0.5-9.8,1.2-13.7,4.8c-3.5,20.2-6.8,40.4-9.8,60.6C1181.6,361.1,1178.9,380,1176.5,398.9z"
            />
            <line
              className="st19"
              x1="1174.8"
              y1="382.1"
              x2="1218.2"
              y2="391.9"
            />
            <line
              className="st19"
              x1="1177"
              y1="359.1"
              x2="1220.4"
              y2="368.9"
            />
            <line
              className="st19"
              x1="1180"
              y1="336.1"
              x2="1223.4"
              y2="345.9"
            />
            <line
              className="st19"
              x1="1182.2"
              y1="313.1"
              x2="1225.6"
              y2="322.9"
            />
            <line
              className="st19"
              x1="1184.3"
              y1="290.1"
              x2="1227.7"
              y2="299.9"
            />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth22Diagnozis.culttab &&
                !tooth22Diagnozis.abutment &&
                !tooth22Diagnozis.implant &&
                !tooth22Diagnozis.shaper &&
                !tooth22Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1220.5,442.4c-0.4-2.9-0.9-5.7-1.8-8.5c-2.2-7.5-6.6-14.3-13.3-18
                            c-6.3-3.4-13.7-3.3-20.4-1c-5.4,1.9-10.4,5-14.6,9.2c-3.6,3.5-6.5,7.6-9,12.1c-1.7,3.1-3.2,6.4-4.5,9.7
                            c-2.6,6.5-4.5,13.2-5.8,20.1c-1.6,8.4-2.3,16.9-1.6,25.4c0.1,1.4,0.3,2.8,0.5,4.2c0.1,1.4,0.4,2.8,1,4.1c0.2,0.6,0.5,1.1,0.8,1.6
                            c0.3,0.5,0.6,1,1,1.5l4.2,3.9c1.4,0.5,2.8,1,4.3,1.4c2.7,0.8,5.4,1.5,8.2,2.1c6.6,1.4,13.3,2.2,20.1,2.2c1.3,0,2.6,0,3.9-0.1
                            c3-0.1,6.1-0.4,9.1-0.8c2.1-0.9,4.1-2.2,5.8-3.8c2.2-2.1,4.1-4.6,5.3-7.5c1.4-2.6,2.6-5.4,3.6-8.2c3.2-9.7,3.4-20,3.6-30.2
                            C1221.1,455.4,1221.3,448.8,1220.5,442.4z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth22Diagnozis.culttab && !tooth22Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M1218.7 433.9C1219.6 436.7 1220.1 439.5 1220.5 442.4C1221.3 448.8 1221.1 455.4 1220.9 461.8L1220.9 461.82C1220.7 472.013 1220.5 482.306 1217.3 492C1216.3 494.8 1215.1 497.6 1213.7 500.2C1212.5 503.1 1210.6 505.6 1208.4 507.7C1206.7 509.3 1204.7 510.6 1202.6 511.5C1199.6 511.9 1196.5 512.2 1193.5 512.3C1192.2 512.4 1190.9 512.4 1189.6 512.4C1182.8 512.4 1176.1 511.6 1169.5 510.2C1166.7 509.6 1164 508.9 1161.3 508.1C1159.8 507.7 1158.4 507.2 1157 506.7L1152.8 502.8C1152.4 502.3 1152.1 501.8 1151.8 501.3L1151.8 501.299C1151.5 500.8 1151.2 500.3 1151 499.7C1150.4 498.4 1150.1 497 1150 495.6C1149.8 494.2 1149.6 492.8 1149.5 491.4C1148.8 482.9 1149.5 474.4 1151.1 466C1152.4 459.1 1154.3 452.4 1156.9 445.9C1158.2 442.6 1159.7 439.3 1161.4 436.2C1163.9 431.7 1166.8 427.6 1170.4 424.1C1174.6 419.9 1179.6 416.8 1185 414.9C1191.7 412.6 1199.1 412.5 1205.4 415.9C1212.1 419.6 1216.5 426.4 1218.7 433.9ZM1201.6 420.086C1206.88 422.999 1210.34 428.351 1212.07 434.254C1212.22 434.723 1212.36 435.192 1212.48 435.661C1212.8 436.843 1211.9 437.972 1210.68 438.025L1168.27 439.859C1166.77 439.923 1165.74 438.388 1166.44 437.063C1166.61 436.728 1166.79 436.394 1166.97 436.064C1168.94 432.522 1171.22 429.295 1174.05 426.54C1177.36 423.235 1181.3 420.795 1185.55 419.299C1190.82 417.489 1196.64 417.41 1201.6 420.086Z"
            ></path>
            <path
              className={`st7 ${tooth22Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M1212.07 434.254C1210.34 428.351 1206.88 422.999 1201.6 420.086C1196.64 417.41 1190.82 417.489 1185.55 419.299C1181.3 420.795 1177.36 423.235 1174.05 426.54C1171.22 429.295 1168.94 432.522 1166.97 436.064C1166.79 436.394 1166.61 436.728 1166.44 437.063C1165.74 438.388 1166.77 439.923 1168.27 439.859L1210.68 438.025C1211.9
                            437.972 1212.8 436.843 1212.48 435.661C1212.36 435.192 1212.22 434.723 1212.07 434.254Z"
            />
            <path
              className={`st60
                                    ${tooth22Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth22Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth22Diagnozis.seal_cervical_color}
                                `}
              d="M1212.07 434.254C1210.34 428.351 1206.88 422.999 1201.6 420.086C1196.64 417.41 1190.82 417.489 1185.55 419.299C1181.3 420.795 1177.36 423.235 1174.05 426.54C1171.22 429.295 1168.94 432.522 1166.97 436.064C1166.79 436.394 1166.61 436.728 1166.44 437.063C1165.74 438.388 1166.77
                            439.923 1168.27 439.859L1210.68 438.025C1211.9 437.972 1212.8 436.843 1212.48 435.661C1212.36 435.192 1212.22 434.723 1212.07 434.254Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar hImplant hEmpty"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth22.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1154 454.5L1156 453L1157.5 450L1160 447L1161 444.5L1162 441L1164 437L1166 434V432L1168.5 430.5L1170 428.5L1171.5 426L1173.5 424.5L1175.5 422.5H1176.5L1178 420.5L1180 419.5L1182.5 418L1185 417L1187.5 416.5L1189.5 415.5L1192 416L1194.5 415L1197 415.5L1199 416.5H1200L1202 417L1204.5 418L1206 418.5L1207 419.5L1208 420.5L1209.5 422.5L1211.5 426L1213.5 428.5L1215 432L1216.5 434V437L1218 439V442.5L1219.5 444.5V447C1219.67 447.833 1220.2 449.7 1221 450.5L1222 449.5V446.5V443V440.5L1221.5 438L1222 436L1221.5 433.5V432V429L1222 427L1221.5 424.5V422.5L1222.5 418L1221.5 414L1223 409.5L1222.5 407L1223 404.5L1221.5 401.5L1222 397.5L1219.5 394.5L1216.5 392.5L1212 391L1209.5 388.5L1207 387.5H1203.5L1201.5 385.5L1197.5 384.5L1193.5 386.5L1189.5 385L1185 388.5L1181.5 389.5L1178 390.5L1175.5 392.5H1173.5L1170 395.5V399L1167.5 402V408L1166 413V416L1164.5 418.5V422.5L1162.5 425.5L1162 428.5L1160 432L1159 437L1157.5 441L1156.5 443.5L1156 447L1154 450V454.5Z"
            ></path>
            <path
              className="st61 level1"
              d="M1154 454.5L1156 453L1157.5 450L1160 447L1161 444.5L1162 441L1164 437L1166 434V432L1168.5 430.5L1170 428.5L1171.5 426L1173.5 424.5L1175.5 422.5H1176.5L1178 420.5L1180 419.5L1182.5 418L1185 417L1187.5 416.5L1189.5 415.5L1192 416L1194.5 415L1197 415.5L1199 416.5H1200L1202 417L1204.5 418L1206 418.5L1207 419.5L1208 420.5L1209.5 422.5L1211.5 426L1213.5 428.5L1215 432L1216.5 434V437L1218 439V442.5L1219.5 444.5V447C1219.67 447.833 1220.2 449.7 1221 450.5L1221.5 449L1222 446.5L1221.5 443L1222 441L1221 437V435L1221.5 432L1221 429L1221.5 427L1221 426L1221.5 423.5L1221 421.5L1219.5 420.5L1218.5 419L1216 417L1213.5 415.5L1212.5 414.5L1209.5 413L1206 411.5L1203.5 411H1201.5L1198.5 409H1196L1194.5 410L1192 409H1189.5H1188.5L1184 410L1182 411.5L1179.5 412.5H1176.5L1174 415L1172 415.5L1171 416.5L1169 417L1167 419V421.5L1165.5 423.5V425.5L1164 428.5L1163.5 430.5L1162 432.5L1161 436L1160 437.5L1159 440L1157.5 442.5V445.5L1156 448L1155 450.5L1154 454.5Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth22Diagnozis.culttab &&
                !tooth22Diagnozis.abutment &&
                !tooth22Diagnozis.implant &&
                !tooth22Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M1161.3,508.2c-1.4-0.4-2.8-0.9-4.3-1.4l-4.2-3.9c-0.4-0.5-0.7-1-1-1.5c-0.3-0.5-0.6-1.1-0.8-1.6
                                c-0.5-1.3-0.8-2.7-1-4.1c-0.2-1.4-0.4-2.8-0.5-4.2c-0.7-8.5,0-17,1.6-25.4c1.3-6.9,3.2-13.6,5.8-20.1c1.3-3.4,2.8-6.6,4.5-9.7
                                c2.9,5.1,7,12.6,7.7,15.5C1170,455,1164.3,490.4,1161.3,508.2z"
              />
              <path
                className={`
                                st8 target caries-left 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth22.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth22.seal_left ? `seal-fill ${teethDiagnozis.tooth22.seal_left_color}` : ''}
                            `}
                d="M1161.3,508.2c-1.4-0.4-2.8-0.9-4.3-1.4l-4.2-3.9c-0.4-0.5-0.7-1-1-1.5c-0.3-0.5-0.6-1.1-0.8-1.6
                                c-0.5-1.3-0.8-2.7-1-4.1c-0.2-1.4-0.4-2.8-0.5-4.2c-0.7-8.5,0-17,1.6-25.4c1.3-6.9,3.2-13.6,5.8-20.1c1.3-3.4,2.8-6.6,4.5-9.7
                                c2.9,5.1,7,12.6,7.7,15.5C1170,455,1164.3,490.4,1161.3,508.2z"
                style={{
                  fill: teethDiagnozis.tooth22.caries_left
                    ? '#606c80'
                    : teethDiagnozis.tooth22.seal_left
                      ? teethDiagnozis.tooth22.seal_left_color
                      : 'transparent',
                }}
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M1221,462c-0.2,10.2-0.3,20.5-3.6,30.2c-0.9,2.8-2.1,5.6-3.6,8.2c-1.3,2.9-3.1,5.4-5.3,7.5
                                c-1.7,1.6-3.7,2.9-5.8,3.8c-3,0.4-6,0.7-9.1,0.8c3.3-16.9,10.8-54.4,12.6-57c1.6-2.4,9.8-9.4,14.3-13.1
                                C1221.3,448.8,1221.1,455.4,1221,462z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth22.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth22.seal_right ? `seal-fill ${teethDiagnozis.tooth22.seal_right_color}` : ''}
                            `}
                d="M1221,462c-0.2,10.2-0.3,20.5-3.6,30.2c-0.9,2.8-2.1,5.6-3.6,8.2c-1.3,2.9-3.1,5.4-5.3,7.5
                                c-1.7,1.6-3.7,2.9-5.8,3.8c-3,0.4-6,0.7-9.1,0.8c3.3-16.9,10.8-54.4,12.6-57c1.6-2.4,9.8-9.4,14.3-13.1
                                C1221.3,448.8,1221.1,455.4,1221,462z"
                style={{
                  fill: teethDiagnozis.tooth22.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth22.seal_right
                      ? teethDiagnozis.tooth22.seal_right_color
                      : 'transparent',
                }}
              />
            </g>
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st58"
                d="M1220.5,442.4c-4.5,3.7-12.7,10.6-14.3,13.1c-1.7,2.6-9.2,40.1-12.6,57c-1.3,0-2.6,0.1-3.9,0.1
                                c-6.8,0-13.5-0.8-20.1-2.2c-2.8-0.6-5.5-1.3-8.2-2.1c3-17.8,8.7-53.2,7.8-56.5c-0.7-2.9-4.8-10.4-7.7-15.5
                                c2.5-4.5,5.4-8.6,9-12.1c4.2-4.2,9.2-7.3,14.6-9.2c6.8-2.3,14.1-2.5,20.4,1c6.7,3.6,11,10.5,13.3,18
                                C1219.6,436.7,1220.1,439.5,1220.5,442.4z"
              />
              <path
                className={`
                                st8 target caries-top 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth22.caries_top ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth22.seal_top ? `seal-fill ${teethDiagnozis.tooth22.seal_top_color}` : ''}
                            `}
                d="M1220.5,442.4c-4.5,3.7-12.7,10.6-14.3,13.1c-1.7,2.6-9.2,40.1-12.6,57c-1.3,0-2.6,0.1-3.9,0.1
                                c-6.8,0-13.5-0.8-20.1-2.2c-2.8-0.6-5.5-1.3-8.2-2.1c3-17.8,8.7-53.2,7.8-56.5c-0.7-2.9-4.8-10.4-7.7-15.5
                                c2.5-4.5,5.4-8.6,9-12.1c4.2-4.2,9.2-7.3,14.6-9.2c6.8-2.3,14.1-2.5,20.4,1c6.7,3.6,11,10.5,13.3,18
                                C1219.6,436.7,1220.1,439.5,1220.5,442.4z"
              />
            </g>
            <g className="with">
              {/*Черточка right низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_right &&
                      !tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_right &&
                      tooth22Diagnozis.seal_top &&
                      !tooth22Diagnozis.seal_center) ||
                    (!tooth22Diagnozis.seal_right &&
                      tooth22Diagnozis.seal_top &&
                      tooth22Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1203 468L1195 507"
              />
              {/*Черточка right верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_right &&
                      !tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_right &&
                      tooth22Diagnozis.seal_top &&
                      !tooth22Diagnozis.seal_center) ||
                    (!tooth22Diagnozis.seal_right &&
                      tooth22Diagnozis.seal_top &&
                      tooth22Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1203 468C1205.5 456 1207.7 451.6 1216.5 446"
              />
              {/*Черточка left верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_left &&
                      !tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_left &&
                      tooth22Diagnozis.seal_top &&
                      !tooth22Diagnozis.seal_center) ||
                    (!tooth22Diagnozis.seal_left &&
                      tooth22Diagnozis.seal_top &&
                      tooth22Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1169 463.5C1170.5 453.5 1172.5 448.6 1164.5 441"
              />
              {/*Черточка верх низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth22Diagnozis.seal_left &&
                      !tooth22Diagnozis.seal_top) ||
                    (!tooth22Diagnozis.seal_left &&
                      tooth22Diagnozis.seal_top &&
                      !tooth22Diagnozis.seal_center) ||
                    (!tooth22Diagnozis.seal_left &&
                      tooth22Diagnozis.seal_top &&
                      tooth22Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M1169 463.5L1163 502.5"
              />
            </g>
          </g>
          <g
            className="hEmpty hImplant hRoot"
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{
                visibility: tooth22Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth22Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M1220.5 442.4C1220.1 439.5 1219.6 436.7 1218.7 433.9C1216.5 426.4 1212.1 419.6 1205.4 415.9C1199.1 412.5 1191.7 412.6 1185 414.9C1179.6 416.8 1174.6 419.9 1170.4 424.1C1166.8 427.6 1163.9 431.7 1161.4 436.2C1159.7 439.3 1158.2 442.6 1156.9 445.9C1154.3 452.4 1152.4 459.1 1151.1 466C1149.5 474.4 1148.8 482.9 1149.5 491.4C1149.6 492.8 1149.8 494.2 1150 495.6C1150.1 497 1150.4 498.4 1151 499.7C1151.2 500.3 1151.5 500.8 1151.8 501.3C1152.1 501.8 1152.4 502.3 1152.8 502.8L1157 506.7C1158.4 507.2 1159.8 507.7 1161.3 508.1C1164 508.9 1166.7 509.6 1169.5 510.2C1176.1 511.6 1182.8 512.4 1189.6 512.4C1190.9 512.4 1192.2 512.4 1193.5 512.3C1196.5 512.2 1199.6 511.9 1202.6 511.5C1204.7 510.6 1206.7 509.3 1208.4 507.7C1210.6 505.6 1212.5 503.1 1213.7 500.2C1215.1 497.6 1216.3 494.8 1217.3 492C1220.5 482.3 1220.7 472 1220.9 461.8C1221.1 455.4 1221.3 448.8 1220.5 442.4Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth22Diagnozis.temporary_crown ||
                tooth22Diagnozis.ceramic_crown ||
                tooth22Diagnozis.mceramic_crown ||
                tooth22Diagnozis.metalic_crown ||
                tooth22Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth22Diagnozis.temporary_crown ||
                tooth22Diagnozis.ceramic_crown ||
                tooth22Diagnozis.mceramic_crown ||
                tooth22Diagnozis.metalic_crown ||
                tooth22Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth22Diagnozis.ceramic_crown_color}
                                ${tooth22Diagnozis.mceramic_crown_color}
                                ${tooth22Diagnozis.metalic_crown_color}
                                ${tooth22Diagnozis.zirconia_crown_color}
                            `}
              d="M1220.5,442.4c-0.4-2.9-0.9-5.7-1.8-8.5c-2.2-7.5-6.6-14.3-13.3-18
                            c-6.3-3.4-13.7-3.3-20.4-1c-5.4,1.9-10.4,5-14.6,9.2c-3.6,3.5-6.5,7.6-9,12.1c-1.7,3.1-3.2,6.4-4.5,9.7
                            c-2.6,6.5-4.5,13.2-5.8,20.1c-1.6,8.4-2.3,16.9-1.6,25.4c0.1,1.4,0.3,2.8,0.5,4.2c0.1,1.4,0.4,2.8,1,4.1c0.2,0.6,0.5,1.1,0.8,1.6
                            c0.3,0.5,0.6,1,1,1.5l4.2,3.9c1.4,0.5,2.8,1,4.3,1.4c2.7,0.8,5.4,1.5,8.2,2.1c6.6,1.4,13.3,2.2,20.1,2.2c1.3,0,2.6,0,3.9-0.1
                            c3-0.1,6.1-0.4,9.1-0.8c2.1-0.9,4.1-2.2,5.8-3.8c2.2-2.1,4.1-4.6,5.3-7.5c1.4-2.6,2.6-5.4,3.6-8.2c3.2-9.7,3.4-20,3.6-30.2
                            C1221.1,455.4,1221.3,448.8,1220.5,442.4z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
