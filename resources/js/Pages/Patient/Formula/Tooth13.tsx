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
import setupDiagnoze from '../../../lib/tFunctions';
import PeriodontitStage13 from './periodontit13';
import { excludeToothEffect } from '../../../Constants';


export default function Tooth13() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth13Diagnozis = teethDiagnozis.tooth13;
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
        teethDiagnozis.tooth13.caries_bottom =
          !teethDiagnozis.tooth13.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth13.caries_center =
          !teethDiagnozis.tooth13.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth13.caries_left =
          !teethDiagnozis.tooth13.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth13.caries_right =
          !teethDiagnozis.tooth13.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth13.caries_top = !teethDiagnozis.tooth13.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth13.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth13.seal_center_color = sealColor1;
          teethDiagnozis.tooth13.seal_center = true;
        } else if (
          teethDiagnozis.tooth13.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth13.seal_center_color = sealColor2;
          teethDiagnozis.tooth13.seal_center = true;
        } else if (
          teethDiagnozis.tooth13.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth13.seal_center_color = sealColor3;
          teethDiagnozis.tooth13.seal_center = true;
        } else {
          teethDiagnozis.tooth13.seal_center =
            !teethDiagnozis.tooth13.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth13.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth13.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth13.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth13.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth13.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth13.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth13.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth13.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth13.seal_bottom = true;
        } else {
          teethDiagnozis.tooth13.seal_bottom =
            !teethDiagnozis.tooth13.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth13.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth13.seal_left_color = sealColor1;
          teethDiagnozis.tooth13.seal_left = true;
        } else if (
          teethDiagnozis.tooth13.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth13.seal_left_color = sealColor2;
          teethDiagnozis.tooth13.seal_left = true;
        } else if (
          teethDiagnozis.tooth13.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth13.seal_left_color = sealColor3;
          teethDiagnozis.tooth13.seal_left = true;
        } else {
          teethDiagnozis.tooth13.seal_left = !teethDiagnozis.tooth13.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth13.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth13.seal_right_color = sealColor1;
          teethDiagnozis.tooth13.seal_right = true;
        } else if (
          teethDiagnozis.tooth13.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth13.seal_right_color = sealColor2;
          teethDiagnozis.tooth13.seal_right = true;
        } else if (
          teethDiagnozis.tooth13.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth13.seal_right_color = sealColor3;
          teethDiagnozis.tooth13.seal_right = true;
        } else {
          teethDiagnozis.tooth13.seal_right =
            !teethDiagnozis.tooth13.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth13.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth13.seal_top_color = sealColor1;
          teethDiagnozis.tooth13.seal_top = true;
        } else if (
          teethDiagnozis.tooth13.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth13.seal_top_color = sealColor2;
          teethDiagnozis.tooth13.seal_top = true;
        } else if (
          teethDiagnozis.tooth13.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth13.seal_top_color = sealColor3;
          teethDiagnozis.tooth13.seal_top = true;
        } else {
          teethDiagnozis.tooth13.seal_top = !teethDiagnozis.tooth13.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth13.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth13.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth13.wedge_shaped_defect_color =
          !teethDiagnozis.tooth13.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth13.show) {
        document.getElementById('TH-13').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth53.show) {
        document.getElementById('TH-53').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth13.show) {
        document.getElementById('TH-13').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth53.show) {
          document.getElementById('TH-53').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth13.show) {
        document.getElementById('TH-53').classList.remove('f-tooth-active');
        document.getElementById('TH-13').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth13.show) {
        document.getElementById('TH-13').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth53.show) {
          document.getElementById('TH-53').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="13"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 806.7852 716.1968)"
          className={`st3 st4 st5 ${selectedTooth === 13 ? 'num-active' : ''}`}
        >
          13
        </text>
      </g>
      <g
        id="TH-13"
        className={`f-tooth-init ${(teethDiagnozis.tooth13.show || allTeeth) && !teethDiagnozis.tooth13.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth13.show = !teethDiagnozis.tooth13.show;
            teethDiagnozis.tooth53.show = false;
          }
          dispatch(setSelectedToothNumber(13));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              13,
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
          className={`underlay ${selectedTooth === 13 ? 'selected' : ''}`}
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
            d="M779,217.9c0,0-4,32-6,53s-1,59,0,75s6.9,68.5,7.4,86.8
                        c0.6,18.2,1.6,52.2,4.6,65.2s14,21,13,37s-16.6,29.5-16.3,55.2c0.3,25.8,9.3,90.8,15.3,112.8s24,27,36,27s30-10,32-32s5-53,6-61
                        s7-40,7-46s-12-39-10-61c2-22,11-43,9-75s-18-66-22-83s-21-105-26-119c-4.5-12.6-14-48-19-54s-16-7-21-3S782,203.9,779,217.9z"
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
              style={{
                visibility:
                  !tooth13Diagnozis.culttab &&
                  !tooth13Diagnozis.implant &&
                  !tooth13Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 ${tooth13Diagnozis.apex ? 'apex' : ''}`}
                d="M791.5,598.3c-0.7-5.4,0.9-10.5,3.2-15.3c2.2-4.5,5.1-8.9,9-12.4
                                c6.6-6,15.6-10.5,25.8-10.4c9.5,0.1,17.8,4.2,24,9.7c4.5,3.9,7.9,8.9,11,13.9c2.1,3.3,4.1,6.8,4.3,11c0.3,5.1-2.7,9.5-5.8,13.2
                                c-3.4,4-7.2,7.6-10.5,11.9c-1.8,2.4-3.6,4.9-5.9,7c-3.9,3.5-9.1,5.8-14.7,6.6c-7.2,1-14.6-0.5-19.9-4.5c-3-2.3-4.9-5.2-7-8
                                c-2.4-3.3-5-6.6-7.3-10C794.8,607.1,792.1,603.2,791.5,598.3z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth13Diagnozis?.apex || tooth13Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth13Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth13Diagnozis?.apex ? 'apex' : ''}`}
                d="M791.5 598.3C790.8 592.9 792.4 587.8 794.7 583C796.9 578.5 799.8 574.1 803.7 570.6C810.3 564.6 819.3 
                                560.1 829.5 560.2C839 560.3 847.3 564.4 853.5 569.9C858 573.8 861.4 578.8 864.5 583.8C866.6 587.1 868.6 
                                590.6 868.8 594.8C869.1 599.9 866.1 604.3 863 608C859.6 612 855.8 615.6 852.5 619.9C850.7 622.3 848.9 
                                624.8 846.6 626.9C842.7 630.4 837.5 632.7 831.9 633.5C824.7 634.5 817.3 633 812 629C809 626.7 807.1 623.8 
                                805 621C802.6 617.7 800 614.4 797.7 611C794.8 607.1 792.1 603.2 791.5 598.3Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth13Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth13Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M829.435 608.01C825.812 608.119 820.799 604.647 820.617 598.549C820.435 592.45 825.152 586.035 828.775 585.926C832.398 585.818 836.139 590.655 836.321 596.753C836.503 602.851 833.058 607.902 829.435 608.01Z"
                style={{ fill: '#e80808' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth13Diagnozis.implant || tooth13Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="828.5" cy="596.5" r="26.5" />
            <g className="st27">
              <mask id="implant_13" className="st49">
                <path
                  className="st50"
                  d="M814.905 580.474L811.458 579.352C808.529 582.3 806.349 585.994 805.231 590.124L807.928 592.55C807.686 593.829 807.56 595.15 807.56 596.5C807.56 597.85 807.686 599.17 807.928 600.45L805.231 602.875C806.349 607.006 808.529 610.7 811.458 613.648L814.905 612.525C816.895 614.242 819.209 615.594 821.743 616.478L822.494 620.024C824.479 620.548 826.564 620.827 828.714 620.827C830.864 620.827 832.95 620.548 834.936 620.024L835.687 616.477C838.22 615.593 840.533 614.241 842.523 612.525L845.97 613.647C848.899 610.699 851.079 607.004 852.197 602.874L849.5 600.448C849.741 599.169 849.868 597.849 849.868 596.5C849.868 595.15 849.741 593.831 849.5 592.552L852.197 590.126C851.079 585.995 848.899 582.301 845.97 579.352L842.523 580.475C840.533 578.758 838.22 577.406 835.687 576.522L834.936 572.976C832.95 572.452 830.864 572.173 828.714 572.173C826.564 572.173 824.479 572.452 822.494 572.975L821.743 576.521C819.209 577.405 816.895 578.758 814.905 580.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M814.905 580.474L811.458 579.352C808.529 582.3 806.349 585.994 805.231 590.124L807.928 592.55C807.686 593.829 807.56 595.15 807.56 596.5C807.56 597.85 807.686 599.17 807.928 600.45L805.231 602.875C806.349 607.006 808.529 610.7 811.458 613.648L814.905 612.525C816.895 614.242 819.209 615.594 821.743 616.478L822.494 620.024C824.479 620.548 826.564 620.827 828.714 620.827C830.864 620.827 832.95 620.548 834.936 620.024L835.687 616.477C838.22 615.593 840.533 614.241 842.523 612.525L845.97 613.647C848.899 610.699 851.079 607.004 852.197 602.874L849.5 600.448C849.741 599.169 849.868 597.849 849.868 596.5C849.868 595.15 849.741 593.831 849.5 592.552L852.197 590.126C851.079 585.995 848.899 582.301 845.97 579.352L842.523 580.475C840.533 578.758 838.22 577.406 835.687 576.522L834.936 572.976C832.95 572.452 830.864 572.173 828.714 572.173C826.564 572.173 824.479 572.452 822.494 572.975L821.743 576.521C819.209 577.405 816.895 578.758 814.905 580.474Z"
              ></path>
              <path
                className="st52"
                d="M811.458 579.352L812.078 577.45L810.907 577.069L810.04 577.942L811.458 579.352ZM814.905 580.474L814.286 582.376L815.357 582.725L816.211 581.989L814.905 580.474ZM805.231 590.124L803.3 589.601L802.979 590.789L803.893 591.611L805.231 590.124ZM807.928 592.55L809.893 592.921L810.102 591.815L809.265 591.063L807.928 592.55ZM807.928 600.45L809.265 601.937L810.102 601.184L809.893 600.079L807.928 600.45ZM805.231 602.875L803.893 601.388L802.979 602.211L803.3 603.398L805.231 602.875ZM811.458 613.648L810.04 615.057L810.907 615.93L812.078 615.549L811.458 613.648ZM814.905 612.525L816.211 611.011L815.358 610.275L814.286 610.624L814.905 612.525ZM821.743 616.478L823.699 616.063L823.465 614.961L822.401 614.59L821.743 616.478ZM822.494 620.024L820.537 620.439L820.793 621.644L821.984 621.958L822.494 620.024ZM834.936 620.024L835.446 621.958L836.637 621.643L836.892 620.438L834.936 620.024ZM835.687 616.477L835.028 614.589L833.964 614.96L833.731 616.063L835.687 616.477ZM842.523 612.525L843.142 610.623L842.07 610.274L841.217 611.01L842.523 612.525ZM845.97 613.647L845.35 615.549L846.521 615.93L847.388 615.057L845.97 613.647ZM852.197 602.874L854.128 603.396L854.449 602.209L853.534 601.386L852.197 602.874ZM849.5 600.448L847.534 600.077L847.326 601.183L848.162 601.935L849.5 600.448ZM849.5 592.552L848.162 591.064L847.326 591.817L847.534 592.923L849.5 592.552ZM852.197 590.126L853.534 591.613L854.449 590.791L854.128 589.603L852.197 590.126ZM845.97 579.352L847.388 577.943L846.521 577.07L845.35 577.451L845.97 579.352ZM842.523 580.475L841.217 581.989L842.071 582.726L843.142 582.376L842.523 580.475ZM835.687 576.522L833.731 576.937L833.964 578.039L835.028 578.411L835.687 576.522ZM834.936 572.976L836.892 572.561L836.637 571.356L835.446 571.042L834.936 572.976ZM822.494 572.975L821.984 571.041L820.793 571.355L820.537 572.561L822.494 572.975ZM821.743 576.521L822.401 578.41L823.465 578.039L823.699 576.936L821.743 576.521ZM810.839 581.254L814.286 582.376L815.524 578.573L812.078 577.45L810.839 581.254ZM807.161 590.647C808.187 586.86 810.186 583.469 812.877 580.762L810.04 577.942C806.871 581.13 804.512 585.128 803.3 589.601L807.161 590.647ZM809.265 591.063L806.568 588.637L803.893 591.611L806.591 594.037L809.265 591.063ZM809.56 596.5C809.56 595.275 809.675 594.079 809.893 592.921L805.963 592.179C805.698 593.58 805.56 595.025 805.56 596.5H809.56ZM809.893 600.079C809.675 598.921 809.56 597.725 809.56 596.5H805.56C805.56 597.975 805.698 599.42 805.963 600.821L809.893 600.079ZM806.568 604.362L809.265 601.937L806.591 598.963L803.893 601.388L806.568 604.362ZM812.877 612.238C810.186 609.53 808.187 606.14 807.161 602.352L803.3 603.398C804.512 607.872 806.871 611.869 810.04 615.057L812.877 612.238ZM814.286 610.624L810.839 611.746L812.078 615.549L815.524 614.427L814.286 610.624ZM822.401 614.59C820.11 613.79 818.015 612.566 816.211 611.011L813.599 614.04C815.776 615.918 818.309 617.398 821.084 618.366L822.401 614.59ZM824.45 619.61L823.699 616.063L819.786 616.893L820.537 620.439L824.45 619.61ZM828.714 618.827C826.738 618.827 824.824 618.57 823.004 618.09L821.984 621.958C824.134 622.525 826.39 622.827 828.714 622.827V618.827ZM834.426 618.09C832.605 618.57 830.691 618.827 828.714 618.827V622.827C831.038 622.827 833.295 622.525 835.446 621.958L834.426 618.09ZM833.731 616.063L832.979 619.609L836.892 620.438L837.644 616.892L833.731 616.063ZM841.217 611.01C839.414 612.565 837.319 613.789 835.028 614.589L836.346 618.365C839.121 617.397 841.652 615.917 843.829 614.039L841.217 611.01ZM846.589 611.745L843.142 610.623L841.904 614.426L845.35 615.549L846.589 611.745ZM850.267 602.351C849.241 606.139 847.242 609.53 844.551 612.237L847.388 615.057C850.557 611.868 852.916 607.87 854.128 603.396L850.267 602.351ZM848.162 601.935L850.86 604.361L853.534 601.386L850.837 598.961L848.162 601.935ZM847.868 596.5C847.868 597.724 847.753 598.92 847.534 600.077L851.465 600.819C851.729 599.418 851.868 597.974 851.868 596.5H847.868ZM847.534 592.923C847.753 594.08 847.868 595.276 847.868 596.5H851.868C851.868 595.025 851.729 593.581 851.465 592.18L847.534 592.923ZM850.86 588.639L848.162 591.064L850.837 594.039L853.534 591.613L850.86 588.639ZM844.551 580.762C847.242 583.47 849.241 586.861 850.267 590.649L854.128 589.603C852.916 585.129 850.557 581.131 847.388 577.943L844.551 580.762ZM843.142 582.376L846.589 581.254L845.35 577.451L841.904 578.573L843.142 582.376ZM835.028 578.411C837.319 579.21 839.414 580.434 841.217 581.989L843.829 578.96C841.653 577.083 839.121 575.602 836.346 574.634L835.028 578.411ZM832.979 573.39L833.731 576.937L837.644 576.108L836.892 572.561L832.979 573.39ZM828.714 574.173C830.691 574.173 832.605 574.429 834.426 574.91L835.446 571.042C833.295 570.475 831.038 570.173 828.714 570.173V574.173ZM823.004 574.909C824.824 574.429 826.738 574.173 828.714 574.173V570.173C826.39 570.173 824.134 570.474 821.984 571.041L823.004 574.909ZM823.699 576.936L824.45 573.39L820.537 572.561L819.786 576.107L823.699 576.936ZM816.211 581.989C818.015 580.433 820.11 579.209 822.401 578.41L821.084 574.633C818.309 575.601 815.776 577.082 813.599 578.96L816.211 581.989Z"
                mask="url(#implant_13)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <circle className="st44" cx="828.37" cy="596.37" r="28.37" />
            <path
              className="st45"
              d="M826.577 587.739C827.129 585.804 829.871 585.804 830.423 587.739L830.929 589.511C831.225 590.549 832.291 591.164 833.338 590.902L835.126 590.454C837.077 589.965 838.448 592.339 837.049 593.785L835.767 595.109C835.016 595.884 835.016 597.116 835.767 597.891L837.049 599.215C838.448 600.661 837.077 603.035 835.126 602.546L833.338 602.098C832.291 601.836 831.225 602.451 830.929 603.489L830.423 605.261C829.871 607.196 827.129 607.196 826.577 605.261L826.071 603.489C825.775 602.451 824.709 601.836 823.662 602.098L821.874 602.546C819.923 603.035 818.552 600.661 819.951 599.215L821.233 597.891C821.984 597.116 821.984 595.884 821.233 595.109L819.951 593.785C818.552 592.339 819.923 589.965 821.874 590.454L823.662 590.902C824.709 591.164 825.775 590.549 826.071 589.511L826.577 587.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth13Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth13Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M791.5 598.3C790.8 592.9 792.4 587.8 794.7 583C796.9 578.5 799.8 574.1 803.7 570.6C810.3 564.6 819.3 560.1 829.5 560.2C839 560.3 847.3 564.4 853.5 569.9C858 573.8 861.4 578.8 864.5 583.8C866.6 587.1 868.6 590.6 868.8 594.8C869.1 599.9 866.1 604.3 863 608C859.6 612 855.8 615.6 852.5 619.9C850.7 622.3 848.9 624.8 846.6 626.9C842.7 630.4 837.5 632.7 831.9 633.5C824.7 634.5 817.3 633 812 629C809 626.7 807.1 623.8 805 621C802.6 617.7 800 614.4 797.7 611C794.8 607.1 792.1 603.2 791.5 598.3Z"
            ></path>
            <path
              className="st47"
              d="M805.107 597.848C804.655 594.327 805.688 591.001 807.172 587.87C808.592 584.936 810.463 582.066 812.979 579.784C817.238 575.871 823.046 572.936 829.627 573.001C835.757 573.066 841.113 575.74 845.114 579.327C848.018 581.87 850.212 585.131 852.212 588.392C853.567 590.544 854.858 592.827 854.987 595.566C855.18 598.892 853.244 601.761 851.244 604.174C849.05 606.783 846.598 609.131 844.469 611.935C843.307 613.5 842.146 615.131 840.662 616.5C838.145 618.783 834.79 620.283 831.176 620.804C826.53 621.457 821.755 620.478 818.335 617.87C816.399 616.37 815.173 614.478 813.818 612.652C812.27 610.5 810.592 608.348 809.108 606.131C807.236 603.587 805.494 601.044 805.107 597.848Z"
            ></path>
            <circle className="st45" cx="829" cy="596" r="13" />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth13Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56"
              d="M791.5 598.301C790.8 592.901 792.4 587.801 794.7 583.001C796.9 578.501 799.8 
                            574.101 803.7 570.601C810.3 564.601 819.3 560.101 829.5 560.201C839 560.301 847.3 564.401 853.5 569.901C858 
                            573.801 861.4 578.801 864.5 583.801C866.6 587.101 868.6 590.601 868.8 594.801C869.1 599.901 866.1 604.301 
                            863 608.001C859.6 612.001 855.8 615.601 852.5 619.901C850.7 622.301 848.9 624.801 846.6 626.901C842.7 
                            630.401 837.5 632.701 831.9 633.501C824.7 634.501 817.3 633.001 812 629.001C809 626.701 807.1 623.801 805 
                            621.001C802.6 617.701 800 614.401 797.7 611.001C794.8 607.101 792.1 603.201 791.5 598.301Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st56"
              d="M805.107 597.849C804.655 594.328 805.688 591.002 807.172 587.871C808.592 
                            584.937 810.463 582.067 812.979 579.784C817.238 575.872 823.046 572.937 829.627 573.002C835.757 573.067 
                            841.113 575.741 845.114 579.328C848.018 581.871 850.212 585.132 852.212 588.393C853.567 590.545 854.858 
                            592.828 854.987 595.567C855.18 598.893 853.244 601.762 851.244 604.175C849.05 606.784 846.598 609.132 844.469 
                            611.936C843.307 613.501 842.146 615.132 840.662 616.501C838.145 618.784 834.79 620.284 831.176 620.805C826.53 
                            621.457 821.755 620.479 818.335 617.871C816.399 616.371 815.173 614.479 813.818 612.653C812.27 610.501 
                            810.592 608.349 809.108 606.132C807.236 603.588 805.494 601.045 805.107 597.849Z"
              style={{ visibility: 'hidden' }}
            />
            <circle
              className="st57"
              cx="829"
              cy="596.001"
              r="12.25"
              style={{ fill: 'black', opacity: tooth13Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth13Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth13Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M791.5 598.3C790.8 592.9 792.4 587.8 794.7 583C796.9 578.5 799.8 574.1 803.7 570.6C810.3 564.6 819.3 560.1 829.5 560.2C839 560.3 847.3 564.4 853.5 569.9C858 573.8 861.4 578.8 864.5 583.8C866.6 587.1 868.6 590.6 868.8 594.8C869.1 599.9 866.1 604.3 863 608C859.6 612 855.8 615.6 852.5 619.9C850.7 622.3 848.9 624.8 846.6 626.9C842.7 630.4 837.5 632.7 831.9 633.5C824.7 634.5 817.3 633 812 629C809 626.7 807.1 623.8 805 621C802.6 617.7 800 614.4 797.7 611C794.8 607.1 792.1 603.2 791.5 598.3Z"
            ></path>
            <path
              className="st47"
              d="M805.107 597.848C804.655 594.327 805.688 591.001 807.172 587.87C808.592 584.936 810.463 582.066 812.979 579.784C817.238 575.871 823.046 572.936 829.627 573.001C835.757 573.066 841.113 575.74 845.114 579.327C848.018 581.87 850.212 585.131 852.212 588.392C853.567 590.544 854.858 592.827 854.987 595.566C855.18 598.892 853.244 601.761 851.244 604.174C849.05 606.783 846.598 609.131 844.469 611.935C843.307 613.5 842.146 615.131 840.662 616.5C838.145 618.783 834.79 620.283 831.176 620.804C826.53 621.457 821.755 620.478 818.335 617.87C816.399 616.37 815.173 614.478 813.818 612.652C812.27 610.5 810.592 608.348 809.108 606.131C807.236 603.587 805.494 601.044 805.107 597.848Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth13Diagnozis.culttab &&
                !tooth13Diagnozis.abutment &&
                !tooth13Diagnozis.implant &&
                !tooth13Diagnozis.apex &&
                !tooth13Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M877,591.8c-0.2-3.6-1.3-6.9-2.8-10c-0.8-1.7-1.7-3.3-2.6-4.9
                            c-3.8-6.8-8-13.5-13.5-18.8c-7.7-7.4-17.9-13-29.6-13.2c-12.5-0.2-23.7,5.8-31.7,13.9c-3.5,3.6-6.5,7.8-8.8,12.3
                            c-0.8,1.5-1.5,3-2.2,4.5c-2.9,6.5-4.8,13.4-3.9,20.7c0.8,6.6,4.2,12,7.8,17.4c1.6,2.4,3.2,4.8,4.9,7.3c1.4,2.1,2.8,4.2,4.2,6.2
                            c2.5,3.8,4.9,7.7,8.6,10.8c6.5,5.4,15.6,7.6,24.4,6.2c6.8-1.1,13.2-4.2,18-8.9c1-1,1.9-2,2.8-3.1c1.6-2.1,3.1-4.3,4.5-6.4
                            c4.1-5.8,8.7-10.6,12.9-16.1C873.7,604.7,877.3,598.8,877,591.8z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth13.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M857.567 627.604C855.314 631.116 854.189 634.775 851.309 637.848C848.754 640.528 844.626 643.966 841.341 645.621C838.349 647.129 835.121 648.186 831.78 648.744C825.979 649.686 820.076 647.875 814.835 645.786C811.932 644.629 808.105 643.008 805.74 640.921C803.739 639.127 803.256 637.084 801.791 634.946C800.506 633.073 799.333 631.127 798.105 629.214C796.602 626.797 793.908 624.381 792.358 621.947C790.81 619.515 790.406 617.066 788.967 614.58C787.218 611.731 785.468 610.121 784.061 607.09C782.649 604.049 781.582 599.586 781.206 595.994C780.732 591.724 781.099 587.582 781.992 583.568C782.75 580.154 782.76 575.595 784.084 572.366C785.681 568.547 788.701 566.014 790.962 562.521C792.598 559.992 793.3 557.609 795.35 555.458C797.984 552.659 802.052 550.082 805.248 547.876C807.022 546.652 808.876 544.303 810.8 543.332C812.822 542.311 814.922 542.682 817.091 541.998C820.801 540.827 824.712 538.954 828.775 539.001C831.748 539.037 834.626 539.44 837.393 540.148C840.304 540.894 843.091 543.216 845.735 544.57C848.367 545.918 851.985 547.533 854.312 549.348C856.315 550.91 857.07 552.62 858.819 554.434C860.684 556.324 863.527 558.39 865.126 560.574C866.696 562.718 868.155 564.975 868.411 567.29C869.875 569.742 872.382 572.258 873.717 574.775C875.234 577.562 875.581 580.446 876.606 583.568C877.357 585.856 877.866 588.273 877.972 590.873C878.164 594.689 877.276 599.476 875.843 602.757C874.474 605.892 872.608 607.544 870.712 610.19C868.554 613.157 867.395 615.975 865.126 618.852C862.92 621.649 859.604 624.502 857.567 627.604ZM794.602 582.999C792.302 587.799 790.702 592.899 791.402 598.299C792.002 603.199 794.802 607.099 797.602 610.999C799.902 614.399 802.502 617.699 804.902 620.999C807.002 623.799 808.902 626.699 811.902 628.999C817.202 632.999 824.602 634.499 831.802 633.499C837.402 632.699 842.602 630.399 846.502 626.899C848.802 624.799 850.602 622.299 852.402 619.899C855.702 615.599 859.502 611.999 862.902 607.999C866.002 604.299 869.002 599.899 868.702 594.799C868.502 590.599 866.502 587.099 864.402 583.799C861.302 578.799 857.902 573.799 853.402 569.899C847.202 564.399 838.902 560.299 829.402 560.199C819.202 560.099 810.202 564.599 803.602 570.599C799.702 574.099 796.802 578.499 794.602 582.999Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M857.567 627.604C855.314 631.116 854.189 634.775 851.309 637.848C848.754 640.528 844.626 643.966 841.341 645.621C838.349 647.129 835.121 648.186 831.78 648.744C825.979 649.686 820.076 647.875 814.835 645.786C811.932 644.629 808.105 643.008 805.74 640.921C803.739 639.127 803.256 637.084 801.791 634.946C800.506 633.073 799.333 631.127 798.105 629.214C796.602 626.797 793.908 624.381 792.358 621.947C790.81 619.515 790.406 617.066 788.967 614.58C787.218 611.731 785.468 610.121 784.061 607.09C782.649 604.049 781.582 599.586 781.206 595.994C780.732 591.724 781.099 587.582 781.992 583.568C782.75 580.154 782.76 575.595 784.084 572.366C785.681 568.547 788.701 566.014 790.962 562.521C792.598 559.992 793.3 557.609 795.35 555.458C797.984 552.659 802.052 550.082 805.248 547.876C807.022 546.652 808.876 544.303 810.8 543.332C812.822 542.311 814.922 542.682 817.091 541.998C820.801 540.827 824.712 538.954 828.775 539.001C831.748 539.037 834.626 539.44 837.393 540.148C840.304 540.894 843.091 543.216 845.735 544.57C848.367 545.918 851.985 547.533 854.312 549.348C856.315 550.91 857.07 552.62 858.819 554.434C860.684 556.324 863.527 558.39 865.126 560.574C866.696 562.718 868.155 564.975 868.411 567.29C869.875 569.742 872.382 572.258 873.717 574.775C875.234 577.562 875.581 580.446 876.606 583.568C877.357 585.856 877.866 588.273 877.972 590.873C878.164 594.689 877.276 599.476 875.843 602.757C874.474 605.892 872.608 607.544 870.712 610.19C868.554 613.157 867.395 615.975 865.126 618.852C862.92 621.649 859.604 624.502 857.567 627.604ZM794.602 582.999C792.302 587.799 790.702 592.899 791.402 598.299C792.002 603.199 794.802 607.099 797.602 610.999C799.902 614.399 802.502 617.699 804.902 620.999C807.002 623.799 808.902 626.699 811.902 628.999C817.202 632.999 824.602 634.499 831.802 633.499C837.402 632.699 842.602 630.399 846.502 626.899C848.802 624.799 850.602 622.299 852.402 619.899C855.702 615.599 859.502 611.999 862.902 607.999C866.002 604.299 869.002 599.899 868.702 594.799C868.502 590.599 866.502 587.099 864.402 583.799C861.302 578.799 857.902 573.799 853.402 569.899C847.202 564.399 838.902 560.299 829.402 560.199C819.202 560.099 810.202 564.599 803.602 570.599C799.702 574.099 796.802 578.499 794.602 582.999Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M854.882 623.57C852.884 626.407 851.887 629.362 849.334 631.845C847.069 634.01 843.408 636.786 840.496 638.124C837.843 639.342 834.982 640.195 832.019 640.646C826.877 641.407 821.642 639.944 816.996 638.257C814.423 637.322 811.029 636.012 808.933 634.327C807.158 632.878 806.73 631.227 805.431 629.501C804.292 627.988 803.252 626.416 802.163 624.871C800.831 622.919 798.442 620.967 797.068 619.001C795.695 617.037 795.337 615.058 794.061 613.05C792.51 610.749 790.959 609.449 789.712 607.001C788.46 604.544 787.514 600.939 787.18 598.038C786.76 594.589 787.086 591.243 787.877 588.001C788.549 585.243 788.559 581.561 789.732 578.953C791.148 575.868 793.826 573.822 795.83 571.001C797.281 568.958 797.903 567.033 799.721 565.296C802.056 563.035 805.662 560.954 808.496 559.172C810.069 558.182 811.713 556.285 813.419 555.501C815.211 554.676 817.073 554.976 818.996 554.423C822.286 553.478 825.753 551.965 829.355 552.003C831.991 552.032 834.543 552.357 836.996 552.929C839.577 553.531 842.048 555.407 844.392 556.501C846.726 557.59 849.933 558.895 851.996 560.36C853.772 561.622 854.441 563.003 855.992 564.468C857.646 565.995 860.166 567.664 861.584 569.428C862.976 571.159 864.27 572.983 864.496 574.853C865.794 576.833 868.017 578.866 869.201 580.899C870.546 583.15 870.853 585.479 871.762 588.001C872.428 589.849 872.879 591.801 872.973 593.901C873.143 596.984 872.356 600.851 871.085 603.501C869.872 606.033 868.217 607.367 866.536 609.504C864.623 611.901 863.595 614.177 861.584 616.501C859.628 618.76 856.688 621.065 854.882 623.57ZM794.6 583C792.3 587.8 790.7 592.9 791.4 598.3C792 603.2 794.8 607.1 797.6 611C799.9 614.4 802.5 617.7 804.9 621C807 623.8 808.9 626.7 811.9 629C817.2 633 824.6 634.5 831.8 633.5C837.4 632.7 842.6 630.4 846.5 626.9C848.8 624.8 850.6 622.3 852.4 619.9C855.7 615.6 859.5 612 862.9 608C866 604.3 869 599.9 868.7 594.8C868.5 590.6 866.5 587.1 864.4 583.8C861.3 578.8 857.9 573.8 853.4 569.9C847.2 564.4 838.9 560.3 829.4 560.2C819.2 560.1 810.2 564.6 803.6 570.6C799.7 574.1 796.8 578.5 794.6 583Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth13Diagnozis.culttab &&
                !tooth13Diagnozis.abutment &&
                !tooth13Diagnozis.implant &&
                !tooth13Diagnozis.shaper &&
                !tooth13Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС LEFT*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M781.8,596.2c0.8,6.6,4.2,12,7.8,17.4c1.6,2.4,3.2,4.8,4.9,7.3c3.2-6,12.4-11.6,22.2-14.1
                                c5-7.5-4.4-13.8-9.2-18.3c-5.1-4.8-14.8-13.3-19.5-17.5c-0.8,1.5-1.5,3-2.2,4.5C782.9,582,781,588.9,781.8,596.2z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth13.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth13.seal_left ? `seal-fill ${teethDiagnozis.tooth13.seal_left_color}` : ''}
                                `}
                d="M781.8,596.2c0.8,6.6,4.2,12,7.8,17.4c1.6,2.4,3.2,4.8,4.9,7.3c3.2-6,12.4-11.6,22.2-14.1
                                c5-7.5-4.4-13.8-9.2-18.3c-5.1-4.8-14.8-13.3-19.5-17.5c-0.8,1.5-1.5,3-2.2,4.5C782.9,582,781,588.9,781.8,596.2z"
              />
            </g>
            {/*КАРИЕС НИЗ*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M794.5,620.9c1.4,2.1,2.8,4.2,4.2,6.2c2.5,3.8,4.9,7.7,8.6,10.8c6.5,5.4,15.6,7.6,24.4,6.2
                                c6.8-1.1,13.2-4.2,18-8.9c1-1,1.9-2,2.8-3.1c-0.1-4.8-1.5-9.7-2.8-12.1c-1.6-3-8.1-10.8-9.4-12.8c-3.4-1-8.1-1.9-14.2-1.8
                                c-3.1,0.1-6.3,0.6-9.5,1.4C806.9,609.3,797.7,614.8,794.5,620.9z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth13.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth13.seal_bottom ? `seal-fill ${teethDiagnozis.tooth13.seal_bottom_color}` : ''}
                                `}
                d="M794.5,620.9c1.4,2.1,2.8,4.2,4.2,6.2c2.5,3.8,4.9,7.7,8.6,10.8c6.5,5.4,15.6,7.6,24.4,6.2
                                c6.8-1.1,13.2-4.2,18-8.9c1-1,1.9-2,2.8-3.1c-0.1-4.8-1.5-9.7-2.8-12.1c-1.6-3-8.1-10.8-9.4-12.8c-3.4-1-8.1-1.9-14.2-1.8
                                c-3.1,0.1-6.3,0.6-9.5,1.4C806.9,609.3,797.7,614.8,794.5,620.9z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M840,606.7c0,0.1,0.1,0.2,0.2,0.5c1.3,2,7.8,9.8,9.4,12.8c1.3,2.4,2.7,7.3,2.8,12.1c1.6-2.1,3.1-4.3,4.5-6.4
                                c4.1-5.8,8.7-10.6,12.9-16.1c3.8-5,7.4-10.9,7-17.9c-0.2-3.6-1.3-6.9-2.8-10c-6.4,4.1-19,12.2-22.4,14.5
                                C847.1,599.5,840,606,840,606.7z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth13.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth13.seal_right ? `seal-fill ${teethDiagnozis.tooth13.seal_right_color}` : ''}
                                `}
                d="M840,606.7c0,0.1,0.1,0.2,0.2,0.5c1.3,2,7.8,9.8,9.4,12.8c1.3,2.4,2.7,7.3,2.8,12.1c1.6-2.1,3.1-4.3,4.5-6.4
                                c4.1-5.8,8.7-10.6,12.9-16.1c3.8-5,7.4-10.9,7-17.9c-0.2-3.6-1.3-6.9-2.8-10c-6.4,4.1-19,12.2-22.4,14.5
                                C847.1,599.5,840,606,840,606.7z"
              />
            </g>
            {/*КАРИЕС TOP*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M787.9,571c4.7,4.1,14.5,12.7,19.5,17.5c4.8,4.5,14.2,10.8,9.2,18.3c3.2-0.8,6.4-1.3,9.5-1.4
                                c6.1-0.2,10.8,0.7,14.2,1.8c-0.2-0.2-0.2-0.4-0.2-0.5c0-0.7,7-7.2,11.7-10.3c3.4-2.3,16-10.4,22.4-14.5c-0.8-1.7-1.7-3.3-2.6-4.9
                                c-3.8-6.8-8-13.5-13.5-18.8c-7.7-7.4-17.9-13-29.6-13.2c-12.5-0.2-23.7,5.8-31.7,13.9C793.2,562.3,790.3,566.6,787.9,571z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth13.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth13.seal_top ? `seal-fill ${teethDiagnozis.tooth13.seal_top_color}` : ''}
                                `}
                d="M787.9,571c4.7,4.1,14.5,12.7,19.5,17.5c4.8,4.5,14.2,10.8,9.2,18.3c3.2-0.8,6.4-1.3,9.5-1.4
                                c6.1-0.2,10.8,0.7,14.2,1.8c-0.2-0.2-0.2-0.4-0.2-0.5c0-0.7,7-7.2,11.7-10.3c3.4-2.3,16-10.4,22.4-14.5c-0.8-1.7-1.7-3.3-2.6-4.9
                                c-3.8-6.8-8-13.5-13.5-18.8c-7.7-7.4-17.9-13-29.6-13.2c-12.5-0.2-23.7,5.8-31.7,13.9C793.2,562.3,790.3,566.6,787.9,571z"
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_left &&
                      !tooth13Diagnozis.seal_bottom &&
                      !tooth13Diagnozis.seal_center) ||
                    (tooth13Diagnozis.seal_left &&
                      !tooth13Diagnozis.seal_bottom &&
                      !tooth13Diagnozis.seal_center) ||
                    (!tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M815.5 607.5C812 607.833 803.2 610.3 796 617.5"
              />
              {/*Овал лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_left &&
                      !tooth13Diagnozis.seal_top) ||
                    (!tooth13Diagnozis.seal_left && tooth13Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M815 607C813 593.286 797 581.095 790 575"
              />
              {/*Черточка верх лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_top &&
                      !tooth13Diagnozis.seal_bottom) ||
                    (!tooth13Diagnozis.seal_left &&
                      !tooth13Diagnozis.seal_top &&
                      tooth13Diagnozis.seal_bottom) ||
                    (!tooth13Diagnozis.seal_left &&
                      !tooth13Diagnozis.seal_right &&
                      tooth13Diagnozis.seal_top &&
                      !tooth13Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M815 607.5C819.167 606.167 829.2 603.7 838 608.5"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_right &&
                      !tooth13Diagnozis.seal_top) ||
                    (!tooth13Diagnozis.seal_right && tooth13Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M838 608.5C840.167 604.167 849.2 593.5 868 585.5"
              />
              {/*Черточка верх право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_right &&
                      !tooth13Diagnozis.seal_bottom) ||
                    (!tooth13Diagnozis.seal_right &&
                      tooth13Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M838 608.5C841.167 610.333 847.5 614.7 849.5 625.5"
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
                visibility: tooth13Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth13Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M786.213 575.475C786.913 573.975 787.613 572.475 788.413 570.975C790.813 566.475 
                                793.713 562.275 797.213 558.675C805.213 550.575 816.413 544.575 828.913 544.775C840.613 544.975 850.813 
                                550.575 858.513 557.975C864.013 563.375 868.213 569.975 872.013 576.775C872.913 578.375 873.813 579.975 
                                874.613 581.675C876.113 584.775 877.213 588.075 877.413 591.675C877.439 592.135 877.448 592.59 877.441 
                                593.041C874.725 592.816 868.987 591.589 867.76 588.476C867.366 587.131 866.837 585.837 866.227 584.584C865.581 
                                583.22 864.854 581.936 864.128 580.652C861.059 575.197 857.667 569.902 853.226 565.57C847.008 559.633 838.772 
                                555.14 829.324 554.979C819.23 554.819 810.186 559.633 803.726 566.131C800.9 569.019 798.558 572.389 796.62 
                                575.999C795.974 577.203 795.409 578.406 794.844 579.609C793.56 582.468 792.519 585.424 791.96 588.476C789.653 
                                592.076 784.42 592.976 782.092 592.976C781.994 586.851 783.74 581.018 786.213 575.475Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth13Diagnozis.temporary_crown ||
                tooth13Diagnozis.ceramic_crown ||
                tooth13Diagnozis.mceramic_crown ||
                tooth13Diagnozis.metalic_crown ||
                tooth13Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth13Diagnozis.temporary_crown ||
                tooth13Diagnozis.ceramic_crown ||
                tooth13Diagnozis.mceramic_crown ||
                tooth13Diagnozis.metalic_crown ||
                tooth13Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth13Diagnozis.ceramic_crown_color}
                                ${tooth13Diagnozis.mceramic_crown_color}
                                ${tooth13Diagnozis.metalic_crown_color}
                                ${tooth13Diagnozis.zirconia_crown_color}
                            `}
              d="M877,591.8c-0.2-3.6-1.3-6.9-2.8-10c-0.8-1.7-1.7-3.3-2.6-4.9
                            c-3.8-6.8-8-13.5-13.5-18.8c-7.7-7.4-17.9-13-29.6-13.2c-12.5-0.2-23.7,5.8-31.7,13.9c-3.5,3.6-6.5,7.8-8.8,12.3
                            c-0.8,1.5-1.5,3-2.2,4.5c-2.9,6.5-4.8,13.4-3.9,20.7c0.8,6.6,4.2,12,7.8,17.4c1.6,2.4,3.2,4.8,4.9,7.3c1.4,2.1,2.8,4.2,4.2,6.2
                            c2.5,3.8,4.9,7.7,8.6,10.8c6.5,5.4,15.6,7.6,24.4,6.2c6.8-1.1,13.2-4.2,18-8.9c1-1,1.9-2,2.8-3.1c1.6-2.1,3.1-4.3,4.5-6.4
                            c4.1-5.8,8.7-10.6,12.9-16.1C873.7,604.7,877.3,598.8,877,591.8z"
            />
            {/*FISSURE*/}
            <path
              className={`fissure ${tooth13Diagnozis.fissure ? 'diagnoze' : tooth13Diagnozis.fissure ? 'hidden' : ''}`}
              d="M843.6,610.4c-4.6-1.9-9.6-3.1-14.7-3.6c-4.9-0.5-9.9-0.2-14.7,0.7l-0.2-1.1c5-0.9,10-1.2,15.1-0.7
                            c5.2,0.5,10.3,1.7,15.1,3.7L843.6,610.4z"
            />
          </g>
          {/* FISSURES */}
          <g
            className={`fissure ${tooth13Diagnozis.fissure ? 'diagnoze' : ''}`}
            style={{
              visibility:
                !tooth13Diagnozis.culttab &&
                !tooth13Diagnozis.abutment &&
                !tooth13Diagnozis.implant &&
                !tooth13Diagnozis.apex &&
                !tooth13Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st3 fissure"
              d="M843.6,610.4c-4.6-1.9-9.6-3.1-14.7-3.6c-4.9-0.5-9.9-0.2-14.7,0.7l-0.2-1.1c5-0.9,10-1.2,15.1-0.7
                            c5.2,0.5,10.3,1.7,15.1,3.7L843.6,610.4z"
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
              style={{
                visibility:
                  !tooth13Diagnozis.implant &&
                  !tooth13Diagnozis.apex &&
                  !tooth13Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth13Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M862.4,463.1c-4.4,6.1-12.2,9.2-18.2,14c-5.2,4.2-9.1,9.8-15.2,13
                                c-1.3,0.7-2.6,1.2-4,1.6c-1.4-0.4-2.8-0.9-4-1.5c-7-3.3-11.6-9.3-16.4-14.9c-6.6-7.8-13.9-15.4-17-24.8c-2.1-6.1-2.2-12.6-2.4-19
                                c0,0.8,0,1.6,0.1,2.4c1-3.2,2-6.3,3-9.5c1.9-5.8,3.6-11.7,6.6-17c3.5-6.1,8.4-11.1,14.4-14.3c4.1-2.2,8.7-3.6,13.5-3.9
                                c2.1-0.1,4.2,0,6.2,0.3c1.1,0.2,2.1,0.5,3.1,0.8c4.6,1.5,8.5,4.4,12.2,7.5c6.3,5.2,12.1,11.1,16.8,17.6c0.3,1.2,0.5,2.3,0.8,3.5
                                c1.8,7.8,3.2,15.7,4.1,23.6C866.8,449.7,866.8,456.8,862.4,463.1z"
              />
            </g>
            <g
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth13Diagnozis.implant &&
                  !tooth13Diagnozis.abutment &&
                  !tooth13Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth13Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M861.1,415.4c-4.7-6.5-10.5-12.4-16.8-17.6c-3.7-3.1-7.6-6-12.2-7.5
                                c-1-0.3-2.1-0.6-3.1-0.8c-2-0.4-4.1-0.5-6.2-0.3c-4.8,0.3-9.4,1.7-13.5,3.9c-5.9,3.2-10.9,8.2-14.4,14.3c-3,5.3-4.8,11.2-6.6,17
                                c-1,3.2-2.1,6.3-3,9.5c0-1.7-0.1-3.4-0.1-5.2c-0.4-11.7-1.8-23.2-2.7-34.9c-1.1-13.4-1.7-27-2.2-40.5c-0.6-16.8-1.1-33.7-1.2-50.5
                                c-0.1-14.6,0.2-29.2,1.9-43.8c0.7-6.1,1.7-12.3,2.6-18.4c0.9-6.1,1.7-12.3,2.1-18.5c0.5-8,2.2-16.7,9.7-18.4c0,0,0,0,0,0
                                c0.3-0.1,0.7-0.2,1-0.2c8.5-1.2,13.6,7.2,16,15.5c4.3,14.9,8.1,30,11.8,45c2.5,10.2,5,20.4,7.2,30.6c2.5,11.5,4.5,23,7.1,34.4
                                C844.8,358.2,854.4,386.5,861.1,415.4z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.pulpit ? 'pulpit' : ''} ${tooth13Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M835.7,427.4c-0.1,5.2-1.2,10.3-3,15.3c-1.1,3-2.5,5.8-4,8.6
                                c-0.7,1.4-1.5,2.8-3.1,3.2c-1.3,0.4-2.7-0.1-3.4-1.1c-2.2-3.1-4.2-6.4-5.6-9.9c-3.1-7.7-3.8-15.7-4.7-23.7
                                c-1-8.9-1.9-17.8-2.7-26.8c4.1-2.2,8.7-3.6,13.6-3.9c2.1-0.1,4.2,0,6.2,0.4c1.1,4.6,2.1,9.1,3.2,13.7
                                C834.1,411.2,836,419.2,835.7,427.4z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.pulpit ? 'pulpit' : ''} ${tooth13Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M829,389.5c-2-0.4-4.1-0.5-6.2-0.4c-4.8,0.3-9.4,1.7-13.6,3.9
                                c-2.3-27-3.8-54.1-5.4-81.2c-0.2-4.1-0.5-8.2-0.8-12.4c1.7-0.5,3.4-0.9,5.2-1.1c0.4,0,0.8-0.1,1.3-0.1c1.3,6.7,2.6,13.5,3.9,20.2
                                C818.2,342.1,823.5,365.9,829,389.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.channel_class} ${tooth13Diagnozis.pulpit ? 'pulpit' : ''} ${tooth13Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M809.6,298.3c-0.4,0-0.8,0.1-1.3,0.1c-1.8,0.2-3.6,0.5-5.2,1.1
                                c-2-32-4.6-63.9-7.9-95.6c0-0.3-0.1-0.7-0.1-1c0,0.3,0.1,0.7,0.1,1C798.9,235.4,803.7,266.8,809.6,298.3z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage13 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth13Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56"
              d="M862.2 463.1C857.8 469.2 850 472.3 844 477.1C838.8 481.3 834.9 486.9 828.8 
                            490.1C827.5 490.8 826.2 491.3 824.8 491.7C823.4 491.3 822 490.8 820.8 490.2C813.8 486.9 809.2 480.9 804.4 
                            475.3C797.8 467.5 790.5 459.9 787.4 450.5C785.6 445.1 785.3 439.5 785.1 433.9C786.1 430.7 787.1 427.6 788.1 
                            424.4C790 418.6 791.7 412.7 794.7 407.4C800.6 397.1 810.8 389.9 822.6 389.2C825.8 389 828.9 389.3 831.9 
                            390.3C836.5 391.8 840.4 394.7 844.1 397.8C850.4 403 856.2 408.9 860.9 415.4C861.2 416.6 861.5 417.7 861.7 
                            418.9C863.5 426.7 865 434.6 865.8 442.5C866.6 449.7 866.7 456.8 862.2 463.1Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M803.8 293.5L813.6 485.5C815.8 487.5 818.1 489.2 820.9 490.5C822.2 491.1 823.5 491.6 
                            824.9 492C826.3 491.6 827.6 491 828.9 490.4C831.6 489 833.9 487 836.1 485L809.4 294.5C809.3 292.4 807.1 291 
                            805.2 291.9C804.5 292 804 292.7 803.8 293.5Z"
              style={{ fill: tooth13Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth13Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth13Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st16"
              d="M802.2,399.2c0.2-0.2,0.4-1.4,0.6-1.5c1.9-1.7,4-3.1,6.2-4.4h0c0.3-0.1,0.5-0.3,0.8-0.4s0.5-0.3,0.8-0.4
                            c0.3-0.1,0.5-0.3,0.8-0.4c0.3-0.1,0.6-0.3,0.9-0.4c0.2-0.1,0.5-0.2,0.7-0.3c0.2-0.1,0.5-0.2,0.7-0.3c0,0,0.1,0,0.1,0
                            c0.3-0.1,0.6-0.2,0.8-0.3c0.3-0.1,0.6-0.2,0.8-0.3h0c0.3-0.1,0.5-0.2,0.8-0.2c0,0,0,0,0,0c0.3-0.1,0.6-0.1,0.9-0.2
                            c0.6-0.1,1.2-0.3,1.8-0.4c0.3,0,0.6-0.1,0.9-0.1c0.2,0,0.5-0.1,0.8-0.1c0.3,0,0.6-0.1,0.9-0.1c0.3,0,0.6-0.1,0.9-0.1
                            c0.9-0.1,1.8-0.1,2.6,0c0.2,0,0.5,0,0.7,0c0.2,0,0.3,0,0.5,0c0.1,0,0.2,0,0.3,0c0.2,0,0.5,0,0.7,0.1c0.1,0,0.2,0,0.2,0
                            c0,0,0,0,0.1,0c0.1,0,0.2,0,0.3,0c0.2,0,0.5,0.1,0.7,0.1c0,0,0,0,0.1,0c0,0,0,0,0,0c0.3,0,0.5,0.1,0.8,0.1
                            c0.3,0.1,0.5,0.1,0.8,0.2c0.3,0.1,0.6,0.1,0.8,0.2c0.2,0.1,0.5,0.1,0.7,0.2c1.1,0.4,2.2,0.8,3.2,1.3c-1.5-1.1-3.1-2.1-4.7-3
                            L809,293.3c-0.1-2.1-2.3-3.5-4.2-2.7c-0.8,0.3-1.3,1-1.5,1.8l0.7,103.2C803.3,396.5,802.8,398.3,802.2,399.2z"
            />
            <path
              className="st15"
              d="M862.2,463.1c-4.4,6.1-12.2,9.2-18.2,14c-5.2,4.2-9.1,9.8-15.2,13c-1.3,0.7-2.6,1.2-4,1.6
                            c-1.4-0.4-2.8-0.9-4-1.5c-7-3.3-11.6-9.3-16.4-14.9c-6.6-7.8-13.9-15.4-17-24.8c-1.8-5.4-2.1-11-2.3-16.6c1-3.2,2-6.3,3-9.5
                            c1.9-5.8,3.6-11.7,6.6-17c5.9-10.3,16.1-17.5,27.9-18.2c3.2-0.2,6.3,0.1,9.3,1.1c4.6,1.5,8.5,4.4,12.2,7.5
                            c6.3,5.2,12.1,11.1,16.8,17.6c0.3,1.2,0.6,2.3,0.8,3.5c1.8,7.8,3.3,15.7,4.1,23.6C866.6,449.7,866.7,456.8,862.2,463.1z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth13Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth13Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M861,415.9c-4.4-5.6-11.3-13.3-16.8-17.9c-3.7-3.1-7.6-6-12.2-7.5c-3-1-6.2-1.3-9.3-1.1
                            c-11.8,0.7-22.1,7.9-27.9,18.2c-1.5,2.7-8.7,23.5-9.7,26.4l14.5-52.4l37.6-4.9L861,415.9z"
            />
            <path
              className="st17"
              d="M862.3,463.3c-4.4,6.1-12.2,9.2-18.2,14c-5.2,4.2-9.1,9.8-15.2,13c-1.3,0.7-2.6,1.2-4,1.6
                            c-1.4-0.4-2.8-0.9-4.1-1.5c-7-3.3-11.6-9.3-16.3-14.9c-6.6-7.8-13.9-15.4-17.1-24.8c-1.8-5.4-2.2-11-2.3-16.6c1-3.2,2-6.3,3-9.5
                            c0.9-2.9,1.8-5.8,2.8-8.6c1-2.9,2.2-5.7,3.8-8.4c5.9-10.3,16.1-17.5,27.9-18.2c3.2-0.2,6.3,0.2,9.3,1.1c4.6,1.5,8.5,4.4,12.2,7.5
                            c5.5,4.6,10.6,9.7,15,15.2l0,0c0.6,0.8,1.2,1.6,1.8,2.4c0.3,1.2,0.5,2.3,0.8,3.4c1.8,7.8,3.2,15.7,4.1,23.6
                            C866.7,450,866.7,457.1,862.3,463.3z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <path
              className="st44"
              d="M852.183 414.639C852.915 417 851.353 419.453 848.904 419.788L802.399 426.139C799.951 426.474 797.788 424.531 797.86 422.061L799.014 382.117C799.07 380.157 800.54 378.526 802.484 378.268L836.02 373.805C837.953 373.547 839.789 374.721 840.367 376.584L852.183 414.639Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth13Diagnozis.abutment ||
                tooth13Diagnozis.implant ||
                tooth13Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M843.9,376l-49.4,6.4c-3.2-26.2-5.8-52.5-7.9-78.8c-2-25.5-3.3-51-4.2-76.5c3.4-5.1,8.6-8.5,14.6-9.3
                            c6.3-0.9,12.8,1.1,18.1,5.6c5.5,26.3,10.7,52.5,15.7,78.8C835.5,326.8,839.8,351.4,843.9,376z"
            />
            <line className="st19" x1="845.3" y1="354" x2="789" y2="368.8" />
            <line className="st19" x1="841.5" y1="324" x2="785.1" y2="338.8" />
            <line className="st19" x1="836.4" y1="294.1" x2="780" y2="308.8" />
            <line
              className="st19"
              x1="832.6"
              y1="264.1"
              x2="776.2"
              y2="278.8"
            />
            <line className="st19" x1="828.7" y1="234" x2="772.3" y2="248.8" />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth13Diagnozis.culttab &&
                !tooth13Diagnozis.abutment &&
                !tooth13Diagnozis.implant &&
                !tooth13Diagnozis.shaper &&
                !tooth13Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M876.3,460.3c-0.7-4.8-1.9-9.5-2.9-14.3c-0.7-3.5-1.4-7-2.3-10.4
                            c-2-7-5.3-13.5-9.4-19.4c-4.8-6.9-10.8-13-17.4-18.5c-3.7-3.1-7.6-6-12.2-7.5c-3-1-6.2-1.3-9.3-1.1c-11.8,0.7-22.1,7.9-27.9,18.2
                            c-3,5.3-4.8,11.2-6.6,17c-1.2,3.8-2.5,7.6-3.6,11.4c-0.7,2.3-1.2,4.6-1.7,7c-1.4,7.3-1.6,14.8-0.5,22.1c1,4.9,2.6,9.8,4.7,14.4
                            c2.8,6.4,6.5,12.3,10.5,17.9c3.5,4.8,7.5,9.5,11.3,14c0.6,0.7,1.2,1.4,1.7,2c3.4,4,6.7,7.8,12,8.5c5.2,0.7,10-2.2,14.1-5.5
                            c5.3-4.3,10-9.2,15.7-13c2.5-1.7,5.2-3.2,7.8-4.7c2.8-1.7,5.5-3.4,7.9-5.5c3.4-3,6-6.7,7.7-10.8
                            C877.2,474.9,877.4,467.5,876.3,460.3z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth13Diagnozis.culttab && !tooth13Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M783.257 442.182C783.213 442.389 783.168 442.595 783.124 442.8C781.624 450.1 781.524 457.5 
                            782.724 464.9C783.824 469.8 785.323 474.7 787.423 479.3C790.223 485.6 793.923 491.6 797.923 497.2C800.839 501.316 804.27 
                            505.359 807.585 509.266C808.135 509.914 808.682 510.559 809.224 511.2C809.563 511.675 809.948 512.104 810.349 512.55C810.538 
                            512.761 810.731 512.975 810.923 513.2C814.223 517.2 817.623 521 822.923 521.7C828.123 522.5 832.924 519.5 837.024 516.2C839.114 
                            514.543 841.126 512.763 843.141 510.98C846.234 508.243 849.332 505.501 852.724 503.2C854.838 501.762 857.096 500.467 
                            859.315 499.194C859.719 498.962 860.123 498.731 860.524 498.5C863.324 496.8 866.023 495.1 868.423 493C871.823 490 
                            874.424 486.3 876.124 482.2C877.424 475 877.524 467.6 876.524 460.4C876.033 457.033 875.295 453.715 874.554 
                            450.377C874.238 448.957 873.922 447.533 873.624 446.1C873.489 445.426 873.358 444.753 873.227 444.08C872.678 441.256 872.131 
                            438.446 871.324 435.7C869.324 428.6 866.023 422.2 861.923 416.3C857.023 409.4 851.024 403.3 844.524 397.8C840.824 394.7 
                            836.924 391.8 832.324 390.3C829.224 389.4 826.123 389 822.923 389.2C811.123 389.9 800.924 397.1 795.024 407.4C792.427 
                            411.987 790.804 417.023 789.183 422.055C788.931 422.837 788.679 423.62 788.423 424.4C788.024 425.666 787.612 426.933 
                            787.201 428.2C786.379 430.733 785.557 433.266 784.824 435.8C784.186 437.895 783.714 440.073 783.257 442.182ZM798.118 
                            421.861C797.92 422.475 797.722 423.09 797.522 423.703C797.208 424.698 796.885 425.694 796.563 426.689C796.37 427.283 
                            796.178 427.877 795.987 428.471C795.591 429.703 796.468 430.97 797.761 431.048L860.546 434.838C861.882 434.919 
                            862.918 433.69 862.54 432.407C860.954 427.02 858.425 421.963 855.215 417.337C851.369 411.915 846.659 407.121 841.557 
                            402.798C838.653 400.362 835.591 398.083 831.981 396.904C829.547 396.197 827.114 395.882 824.602 396.04C815.34 396.59 
                            807.334 402.248 802.702 410.343C800.664 413.948 799.391 417.906 798.118 421.861Z"
            />
            <path
              className={`st7 ${tooth13Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M797.302 423.703C798.793 419.145 800.128 414.508 802.483 410.343C807.114 402.248 815.12 396.59 
                            824.382 396.04C826.894 395.882 829.328 396.197 831.761 396.904C835.372 398.083 838.433 400.362 841.337 402.798C846.439 407.121 
                            851.149 411.915 854.995 417.337C858.205 421.963 860.734 427.02 862.32 432.407C862.698 433.69 861.662 434.919 860.327 434.838L797.541 
                            431.048C796.248 430.97 795.371 429.703 795.767 428.471C796.277 426.881 796.801 425.292 797.302 423.703Z"
            />
            <path
              className={`st60
                                    ${tooth13Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth13Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth13Diagnozis.seal_cervical_color}
                                `}
              d="M797.302 423.703C798.793 419.145 800.128 414.508 802.483 410.343C807.114 402.248 815.12 396.59 824.382 396.04C826.894 
                            395.882 829.328 396.197 831.761 396.904C835.372 398.083 838.433 400.362 841.337 402.798C846.439 407.121 851.149 411.915 
                            854.995 417.337C858.205 421.963 860.734 427.02 862.32 432.407C862.698 433.69 861.662 434.919 860.327 434.838L797.541 
                            431.048C796.248 430.97 795.371 429.703 795.767 428.471C796.277 426.881 796.801 425.292 797.302 423.703Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar hImplant hEmpty"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth13.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M874.5 451L873 449.5L872 448L871 445.5L869.5 443V440.5L868.5 437.5L866.5 
                            435.5V434L864.5 430.5L863.5 427L862.5 425L860.5 421.5V420L859 418.5L857.5 416.5L856 415.5L855 413.5L854 
                            412L852 409L848.5 407L846 403.5L842.5 401L841 399L839.5 398L836.5 396.5L833 395L831.5 393.5H828L824 392.5L821 
                            393.5H817L813.5 395L811.5 396.5L808.5 398L805.5 400L804.5 401L803 403.5L800.5 405L798.5 409L797 410L795 
                            413.5V415.5L793.5 416.5L792.5 418.5V420V423L791.5 425L790 427V429L789 433L787 435.5V439.5L785 442L782.5 
                            444V440.5V438.5L783.5 435.5V433L785 430.5L784.5 427.5L785 426V424L784.5 421.5L783.5 418.5L784.5 416.5L783.5 
                            414.5V412L782.5 410L783.5 407L782.5 403.5V400L782 396L784.5 392.5H786L787 390L790 387.5L791.5 385L793.5 
                            382.5L796.5 380.5L798 381L799.5 378.5L801.5 377.5L804.5 374.5L807 373.5L810 371L813.5 370.5L817 372L819.5 
                            370.5H822L824 371H826.5L829 370.5L833 371L836.5 373.5L839 374L842.5 376H845L846 378.5L849 380L852 381L854 
                            384L854.5 386.5L856 389V392.5V395L857.5 396.5V399L859 401V403.5L860.5 405V407L861.5 409L863.5 412L864.5 
                            413.5L865.5 416.5L866.5 420L867.5 423L869.5 426L871 429L871.5 432.5L873 436.5V439.5L873.5 442.5L874.5 
                            446.5L875 449L874.5 451Z"
            />
            <path
              className="st61 level1"
              d="M875 451L873.5 449.5L872.5 448L871.5 445.5L870 443V440.5L869 437.5L867 
                            435.5V434L865 430.5L864 427L863 425L861 421.5V420L859.5 418.5L858 416.5L856.5 415.5L855.5 413.5L854.5 
                            412L852.5 409L849 407L846.5 403.5L843 401L841.5 399L840 398L837 396.5L833.5 395L832 393.5H828.5L824.5 
                            392.5L821.5 393.5H817.5L814 395L812 396.5L809 398L806 400L805 401L803.5 403.5L801 405L799 409L797.5 
                            410L795.5 413.5V415.5L794 416.5L793 418.5V420V423L792 425L790.5 427V429L789.5 433L787.5 435.5V439.5L785.5 
                            442L783 444V442L783.5 439.5V438L784.5 435L785.5 432V429L786 427.5L785.5 425L786.5 423V420V416.5L787.5 
                            413.5L786.5 410L787.5 409V406L789.5 404.5L790.5 402L792 401L793 399L794.5 397.5L796.5 396.5L799 
                            393.5L800 392H802L804.5 390.5L806 389L809.5 387.5L812 386H814L816.5 384.5L818.5 383.5L820.5 
                            384.5L823 383.5H826.5L830 384.5L832 386H833.5L836 387H837.5L840 387.5L841.5 390L844 392H846L847.5 
                            395H849L852.5 398V399L854.5 400L856.5 402L857.5 404.5L859.5 407V409L861 411L862 413.5L863 415.5L865.5 
                            419L867 421.5L868 425L869 426.5L870 429L871 431L871.5 434L872.5 437.5V439.5L873.5 442L875 445.5V448V451Z"
            />
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth13Diagnozis.culttab &&
                !tooth13Diagnozis.abutment &&
                !tooth13Diagnozis.implant &&
                !tooth13Diagnozis.shaper
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
              {/*КАРИЕС LEFT*/}
              <path
                className="st58"
                d="M782.4,464.9c1,4.9,2.6,9.8,4.7,14.4c2.8,6.4,6.5,12.3,10.5,17.9c3.5,4.8,7.5,9.5,11.3,14
                                c-3.3-19.6-10.2-59.8-11.2-61.5c-0.9-1.6-8.9-9.7-13.2-13.9c-0.7,2.3-1.2,4.6-1.7,7C781.5,450,781.3,457.5,782.4,464.9z"
              />
              <path
                className={`
                                st8 target caries-left 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth13.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth13.seal_left ? `seal-fill ${teethDiagnozis.tooth13.seal_left_color}` : ''}
                            `}
                d="M782.4,464.9c1,4.9,2.6,9.8,4.7,14.4c2.8,6.4,6.5,12.3,10.5,17.9c3.5,4.8,7.5,9.5,11.3,14
                                c-3.3-19.6-10.2-59.8-11.2-61.5c-0.9-1.6-8.9-9.7-13.2-13.9c-0.7,2.3-1.2,4.6-1.7,7C781.5,450,781.3,457.5,782.4,464.9z"
                style={{
                  fill: teethDiagnozis.tooth13.caries_left
                    ? '#606c80'
                    : teethDiagnozis.tooth13.seal_left
                      ? teethDiagnozis.tooth13.seal_left_color
                      : 'transparent',
                }}
              />
            </g>
            <g
              className="caries-filling hoho"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M860.3,498.4c2.8-1.7,5.5-3.4,7.9-5.5c3.4-3,6-6.7,7.7-10.8c1.3-7.2,1.4-14.5,0.4-21.8
                                c-0.7-4.8-1.9-9.5-2.9-14.3c-0.7-3.5-1.4-7-2.3-10.4c-2-7-5.3-13.5-9.4-19.4c-2.9,6.8-7.8,18.8-8.5,21.5
                                C852.6,440.5,857.5,477.6,860.3,498.4z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth13.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth13.seal_right ? `seal-fill ${teethDiagnozis.tooth13.seal_right_color}` : ''}
                            `}
                d="M860.3,498.4c2.8-1.7,5.5-3.4,7.9-5.5c3.4-3,6-6.7,7.7-10.8c1.3-7.2,1.4-14.5,0.4-21.8
                                c-0.7-4.8-1.9-9.5-2.9-14.3c-0.7-3.5-1.4-7-2.3-10.4c-2-7-5.3-13.5-9.4-19.4c-2.9,6.8-7.8,18.8-8.5,21.5
                                C852.6,440.5,857.5,477.6,860.3,498.4z"
                style={{
                  fill: teethDiagnozis.tooth13.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth13.seal_right
                      ? teethDiagnozis.tooth13.seal_right_color
                      : 'transparent',
                }}
              />
            </g>
            {/*КАРИЕС CENTER*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st58"
                d="M784.6,435.8c4.3,4.3,12.3,12.3,13.2,13.9c0.9,1.7,7.8,41.8,11.2,61.5c0.6,0.7,1.2,1.4,1.7,2
                                c3.4,4,6.7,7.8,12,8.5c5.2,0.7,10-2.2,14.1-5.5c5.3-4.3,10-9.2,15.7-13c2.5-1.7,5.2-3.2,7.8-4.7c-2.9-20.9-7.8-57.9-7.1-60.7
                                c0.7-2.8,5.6-14.7,8.5-21.5c-4.8-6.9-10.8-13-17.4-18.5c-3.7-3.1-7.6-6-12.2-7.5c-3-1-6.2-1.3-9.3-1.1
                                c-11.8,0.7-22.1,7.9-27.9,18.2c-3,5.3-4.8,11.2-6.6,17C787,428.2,785.7,431.9,784.6,435.8z"
              />
              <path
                className={`
                                st8 target caries-top 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth13.caries_top ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth13.seal_top ? `seal-fill ${teethDiagnozis.tooth13.seal_top_color}` : ''}
                            `}
                d="M784.6,435.8c4.3,4.3,12.3,12.3,13.2,13.9c0.9,1.7,7.8,41.8,11.2,61.5c0.6,0.7,1.2,1.4,1.7,2
                                c3.4,4,6.7,7.8,12,8.5c5.2,0.7,10-2.2,14.1-5.5c5.3-4.3,10-9.2,15.7-13c2.5-1.7,5.2-3.2,7.8-4.7c-2.9-20.9-7.8-57.9-7.1-60.7
                                c0.7-2.8,5.6-14.7,8.5-21.5c-4.8-6.9-10.8-13-17.4-18.5c-3.7-3.1-7.6-6-12.2-7.5c-3-1-6.2-1.3-9.3-1.1
                                c-11.8,0.7-22.1,7.9-27.9,18.2c-3,5.3-4.8,11.2-6.6,17C787,428.2,785.7,431.9,784.6,435.8z"
                style={{
                  fill: teethDiagnozis.tooth13.caries_top
                    ? '#606c80'
                    : teethDiagnozis.tooth13.seal_top
                      ? teethDiagnozis.tooth13.seal_top_color
                      : 'transparent',
                }}
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_left &&
                      !tooth13Diagnozis.seal_top &&
                      !tooth13Diagnozis.seal_center) ||
                    (!tooth13Diagnozis.seal_left && tooth13Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M807.5 501.5L801 464"
              />
              {/*Черточка лево верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_left &&
                      !tooth13Diagnozis.seal_top) ||
                    (!tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_top &&
                      !tooth13Diagnozis.seal_center) ||
                    (!tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_top &&
                      tooth13Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M801 464C797.5 446.5 795.3 442.7 788.5 439.5"
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_right &&
                      !tooth13Diagnozis.seal_top) ||
                    (!tooth13Diagnozis.seal_right &&
                      !tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_top &&
                      tooth13Diagnozis.seal_bottom) ||
                    (tooth13Diagnozis.seal_right &&
                      tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_center &&
                      !tooth13Diagnozis.seal_top) ||
                    (!tooth13Diagnozis.seal_center &&
                      !tooth13Diagnozis.seal_bottom &&
                      tooth13Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M854.5 457C851.5 433.5 855.1 431.2 859.5 422"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth13Diagnozis.seal_right &&
                      !tooth13Diagnozis.seal_top) ||
                    (!tooth13Diagnozis.seal_right &&
                      !tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_top &&
                      tooth13Diagnozis.seal_bottom) ||
                    (tooth13Diagnozis.seal_right &&
                      tooth13Diagnozis.seal_left &&
                      tooth13Diagnozis.seal_center &&
                      !tooth13Diagnozis.seal_top) ||
                    (!tooth13Diagnozis.seal_center &&
                      !tooth13Diagnozis.seal_bottom &&
                      tooth13Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M854.5 457L859.5 492.5"
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
                visibility: tooth13Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth13Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth13Diagnozis.vinir_color}`}
                d="M876.3 460.299C875.6 455.499 874.4 450.799 873.4 445.999C872.7 442.499 872 
                                439 871.1 435.6C869.1 428.6 865.8 422.1 861.7 416.2C856.9 409.3 850.9 403.2 844.3 397.7C840.6 394.6 
                                836.7 391.7 832.1 390.2C829.1 389.2 825.9 388.9 822.8 389.1C811 389.8 800.7 396.999 794.9 407.299C791.9 
                                412.599 790.1 418.499 788.3 424.299C787.1 428.099 785.8 431.9 784.7 435.7C784 438 783.5 440.3 783 
                                442.7C781.6 450 781.4 457.499 782.5 464.799C783.5 469.699 785.1 474.6 787.2 479.2C790 485.6 793.7 491.5 
                                797.7 497.1C801.2 501.9 805.2 506.6 809 511.1C809.6 511.8 810.2 512.499 810.7 513.099C814.1 517.099 
                                817.4 520.899 822.7 521.599C827.9 522.299 832.7 519.399 836.8 516.099C842.1 511.799 846.8 506.9 852.5 
                                503.1C855 501.4 857.7 499.899 860.3 498.399C863.1 496.699 865.8 494.999 868.2 492.899C871.6 489.899 874.2 
                                486.2 875.9 482.1C877.2 474.9 877.4 467.499 876.3 460.299Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth13Diagnozis.temporary_crown ||
                tooth13Diagnozis.ceramic_crown ||
                tooth13Diagnozis.mceramic_crown ||
                tooth13Diagnozis.metalic_crown ||
                tooth13Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth13Diagnozis.temporary_crown ||
                tooth13Diagnozis.ceramic_crown ||
                tooth13Diagnozis.mceramic_crown ||
                tooth13Diagnozis.metalic_crown ||
                tooth13Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth13Diagnozis.ceramic_crown_color}
                                ${tooth13Diagnozis.mceramic_crown_color}
                                ${tooth13Diagnozis.metalic_crown_color}
                                ${tooth13Diagnozis.zirconia_crown_color}
                            `}
              d="M876.3,460.3c-0.7-4.8-1.9-9.5-2.9-14.3c-0.7-3.5-1.4-7-2.3-10.4
                            c-2-7-5.3-13.5-9.4-19.4c-4.8-6.9-10.8-13-17.4-18.5c-3.7-3.1-7.6-6-12.2-7.5c-3-1-6.2-1.3-9.3-1.1c-11.8,0.7-22.1,7.9-27.9,18.2
                            c-3,5.3-4.8,11.2-6.6,17c-1.2,3.8-2.5,7.6-3.6,11.4c-0.7,2.3-1.2,4.6-1.7,7c-1.4,7.3-1.6,14.8-0.5,22.1c1,4.9,2.6,9.8,4.7,14.4
                            c2.8,6.4,6.5,12.3,10.5,17.9c3.5,4.8,7.5,9.5,11.3,14c0.6,0.7,1.2,1.4,1.7,2c3.4,4,6.7,7.8,12,8.5c5.2,0.7,10-2.2,14.1-5.5
                            c5.3-4.3,10-9.2,15.7-13c2.5-1.7,5.2-3.2,7.8-4.7c2.8-1.7,5.5-3.4,7.9-5.5c3.4-3,6-6.7,7.7-10.8
                            C877.2,474.9,877.4,467.5,876.3,460.3z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
