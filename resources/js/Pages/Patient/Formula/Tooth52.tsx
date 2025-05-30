import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedToothNumber,
  setToothDiagnoze,
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
  getActiveToothNumberSelector,
  allTeethChildSelector,
} from '../../../Redux/Formula/selectors';
import PeriodontitStage52 from './periodontit52';
import setupDiagnoze from '../../../lib/tfunctions';

export default function Tooth52() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth52Diagnozis = teethDiagnozis.tooth52;
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
  const allTeeth = useSelector(allTeethChildSelector);

  const setColordedPart = (diagnozis, toothPart = '') => {
    if (diagnozis === 'caries') {
      if (toothPart === 'bottom') {
        teethDiagnozis.tooth52.caries_bottom =
          !teethDiagnozis.tooth52.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth52.caries_center =
          !teethDiagnozis.tooth52.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth52.caries_left =
          !teethDiagnozis.tooth52.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth52.caries_right =
          !teethDiagnozis.tooth52.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth52.caries_top = !teethDiagnozis.tooth52.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth52.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth52.seal_center_color = sealColor1;
          teethDiagnozis.tooth52.seal_center = true;
        } else if (
          teethDiagnozis.tooth52.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth52.seal_center_color = sealColor2;
          teethDiagnozis.tooth52.seal_center = true;
        } else if (
          teethDiagnozis.tooth52.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth52.seal_center_color = sealColor3;
          teethDiagnozis.tooth52.seal_center = true;
        } else {
          teethDiagnozis.tooth52.seal_center =
            !teethDiagnozis.tooth52.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth52.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth52.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth52.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth52.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth52.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth52.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth52.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth52.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth52.seal_bottom = true;
        } else {
          teethDiagnozis.tooth52.seal_bottom =
            !teethDiagnozis.tooth52.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth52.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth52.seal_left_color = sealColor1;
          teethDiagnozis.tooth52.seal_left = true;
        } else if (
          teethDiagnozis.tooth52.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth52.seal_left_color = sealColor2;
          teethDiagnozis.tooth52.seal_left = true;
        } else if (
          teethDiagnozis.tooth52.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth52.seal_left_color = sealColor3;
          teethDiagnozis.tooth52.seal_left = true;
        } else {
          teethDiagnozis.tooth52.seal_left = !teethDiagnozis.tooth52.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth52.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth52.seal_right_color = sealColor1;
          teethDiagnozis.tooth52.seal_right = true;
        } else if (
          teethDiagnozis.tooth52.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth52.seal_right_color = sealColor2;
          teethDiagnozis.tooth52.seal_right = true;
        } else if (
          teethDiagnozis.tooth52.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth52.seal_right_color = sealColor3;
          teethDiagnozis.tooth52.seal_right = true;
        } else {
          teethDiagnozis.tooth52.seal_right =
            !teethDiagnozis.tooth52.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth52.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth52.seal_top_color = sealColor1;
          teethDiagnozis.tooth52.seal_top = true;
        } else if (
          teethDiagnozis.tooth52.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth52.seal_top_color = sealColor2;
          teethDiagnozis.tooth52.seal_top = true;
        } else if (
          teethDiagnozis.tooth52.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth52.seal_top_color = sealColor3;
          teethDiagnozis.tooth52.seal_top = true;
        } else {
          teethDiagnozis.tooth52.seal_top = !teethDiagnozis.tooth52.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth52.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth52.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth52.wedge_shaped_defect_color =
          !teethDiagnozis.tooth52.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over') {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth52.show &&
        !teethDiagnozis.tooth12.show
      ) {
        document.getElementById('TH-52').classList.add('f-tooth-active');
        document.getElementById('TH-52').style.opacity = '1';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth52.show &&
        teethDiagnozis.tooth12.show
      ) {
        document.getElementById('TH-52').classList.add('f-tooth-active');
        document.getElementById('TH-12').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-52').classList.remove('f-tooth-active');
        document.getElementById('TH-12').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave') {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth52.show &&
        !teethDiagnozis.tooth12.show
      ) {
        document.getElementById('TH-52').classList.remove('f-tooth-active');
        document.getElementById('TH-52').style.opacity = '0';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth52.show &&
        teethDiagnozis.tooth12.show
      ) {
        document.getElementById('TH-52').classList.remove('f-tooth-active');
        document.getElementById('TH-12').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over') {
      if (teethType === 'child' && teethDiagnozis.tooth12.show) {
        document.getElementById('TH-52').classList.add('f-tooth-active');
        document.getElementById('TH-12').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth52.show) {
        document.getElementById('TH-52').classList.remove('f-tooth-active');
        document.getElementById('TH-12').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave') {
      if (teethType === 'child' && teethDiagnozis.tooth12.show) {
        document.getElementById('TH-12').classList.add('f-tooth-active');
        document.getElementById('TH-52').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="52"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 890 716)"
          className={`st3 st4 st5 ${selectedTooth === 52 ? 'num-active' : ''}`}
        >
          52
        </text>
      </g>
      <g
        id="TH-52"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth52.show || allTeeth) && !teethDiagnozis.tooth52.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          teethDiagnozis.tooth52.show = !teethDiagnozis.tooth52.show;
          teethDiagnozis.tooth12.show = false;

          dispatch(setSelectedToothNumber(52));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              52,
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
          className={`underlay ${selectedTooth === 52 ? 'selected' : ''}`}
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
          onMouseOver={() => {
            showHideOverlay('over');
          }}
          onMouseLeave={() => {
            showHideOverlay('leave');
          }}
        >
          <path
            className="st40"
            d="M870,307.9c0,0-1,25,2,59s5.5,72.9,5,88c-2,64,10.5,63.1,13,81
                        c4,29-14,28.5-12,58.7c2,30.3-9,90.3,2,118.3s41,23,53,15c11.2-7.5,14-19,16-54s0-71,0-84s-13.6-27-12-45c2-22,13-23,12-66
                        c-1.3-55-15-68-20-112s-8.8-67.1-13-78c-5-13-16-21-26-19S870,282.9,870,307.9z"
          ></path>
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 16, 8)',
          }}
          onMouseOver={() => {
            showHideOverlay('over');
          }}
          onMouseLeave={() => {
            showHideOverlay('leave');
          }}
        >
          {/* CHANGE COLOR/APEX/CULTTAB */}
          <g className="dentin">
            <g
              style={{
                visibility:
                  !tooth52Diagnozis.culttab &&
                  !tooth52Diagnozis.implant &&
                  !tooth52Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 ${tooth52Diagnozis.apex ? 'apex' : ''}`}
                d="M886.8,597.2c-1.9-4.6,2.9-8.6,9-10.1c5.2-1.3,11.1-1.3,17-1.4c5.9-0.1,11.8-0.4,17.1,0.5
                                c5.7,0.9,10.9,3.8,10.7,8.5c-0.1,2.5-2.1,4.6-4.3,6.3c-2.5,1.9-5.4,3.5-7.7,5.7c-2.9,2.9-4.5,6.6-7.5,9.4
                                c-1.7,1.6-3.7,2.8-6.1,3.2c-3.5,0.6-7-0.7-9.7-2.7c-3.4-2.6-5.2-6.4-7.6-9.6c-1-1.4-2.2-2.8-3.7-3.9
                                C891.5,601.2,888,600,886.8,597.2z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth52Diagnozis?.apex || tooth52Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth52Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth52Diagnozis?.apex ? 'apex' : ''}`}
                d="M882.489 594.821C880.282 588.167 885.858 582.381 892.945 580.211C898.987 578.331 905.841 578.331 912.696 578.187C919.55 578.042 926.405 577.608 932.562 578.91C939.185 580.212 945.226 584.406 944.994 591.205C944.877 594.821 942.554 597.858 939.998 600.317C937.093 603.065 933.724 605.38 931.052 608.562C927.683 612.757 925.824 618.108 922.339 622.158C920.364 624.473 918.04 626.208 915.252 
                                626.787C911.185 627.655 907.119 625.775 903.982 622.882C900.032 619.121 897.941 613.624 895.153 608.996C893.991 606.971 892.597 604.946 890.854 603.355C887.95 600.606 883.883 598.871 882.489 594.821Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth52Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth52Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                style={{ fill: '#e80808' }}
                d="M908.171 597.772C908.171 598.17 907.749 599.199 909.763 601.356C911.265 602.729 911.78 605.151 913.701 605.189C915.77 605.229 916.34 603.039 917.679 601.58C919.285 599.829 919.512 598.545 919.319 597.772C918.921 596.179 917.824 596.15 913.701 596.125C909.578 596.1 908.171 597.374 
                                  908.171 597.772Z"
              />
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth52Diagnozis.implant || tooth52Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="913" cy="600" r="19"></circle>
            <g className="st27">
              <mask id="implant_52" className="st49">
                <path
                  className="st50"
                  d="M903.113 588.345L900.606 587.529C898.476 589.673 896.891 592.359 896.077 595.363L898.039 597.127C897.863 598.058 897.771 599.018 897.771 600C897.771 600.982 897.863 601.942 898.039 602.873L896.077 604.637C896.891 607.64 898.475 610.327 900.606 612.471L903.113 611.655C904.56 612.903 906.243 613.887 908.085 614.529L908.632 617.109C910.076 617.489 911.592 617.692 913.155 617.692C914.72 617.692 916.236 617.489 917.681 617.108L918.227 614.529C920.069 613.886 921.751 612.903 923.199 611.654L925.705 612.471C927.836 610.327 929.421 607.64 930.234 604.635L928.273 602.871C928.448 601.941 928.54 600.981 928.54 600C928.54 599.018 928.448 598.059 928.273 597.128L930.234 595.364C929.421 592.36 927.836 589.673 925.705 587.529L923.199 588.345C921.751 587.097 920.069 586.114 918.227 585.471L917.681 582.892C916.236 582.511 914.72 582.308 913.155 582.308C911.592 582.308 910.076 582.51 908.632 582.891L908.086 585.47C906.243 586.113 904.56 587.096 903.113 588.345Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M903.113 588.345L900.606 587.529C898.476 589.673 896.891 592.359 896.077 595.363L898.039 597.127C897.863 598.058 897.771 599.018 897.771 600C897.771 600.982 897.863 601.942 898.039 602.873L896.077 604.637C896.891 607.64 898.475 610.327 900.606 612.471L903.113 611.655C904.56 612.903 906.243 613.887 908.085 614.529L908.632 617.109C910.076 617.489 911.592 617.692 913.155 617.692C914.72 617.692 916.236 617.489 917.681 617.108L918.227 614.529C920.069 613.886 921.751 612.903 923.199 611.654L925.705 612.471C927.836 610.327 929.421 607.64 930.234 604.635L928.273 602.871C928.448 601.941 928.54 600.981 928.54 600C928.54 599.018 928.448 598.059 928.273 597.128L930.234 595.364C929.421 592.36 927.836 589.673 925.705 587.529L923.199 588.345C921.751 587.097 920.069 586.114 918.227 585.471L917.681 582.892C916.236 582.511 914.72 582.308 913.155 582.308C911.592 582.308 910.076 582.51 908.632 582.891L908.086 585.47C906.243 586.113 904.56 587.096 903.113 588.345Z"
              ></path>
              <path
                className="st52"
                d="M900.606 587.529L901.225 585.627L900.055 585.246L899.188 586.119L900.606 587.529ZM903.113 588.345L902.493 590.247L903.565 590.596L904.419 589.859L903.113 588.345ZM896.077 595.363L894.147 594.84L893.825 596.028L894.74 596.85L896.077 595.363ZM898.039 597.127L900.004 597.498L900.213 596.392L899.376 595.64L898.039 597.127ZM898.039 602.873L899.376 604.36L900.213 603.607L900.004 602.501L898.039 602.873ZM896.077 604.637L894.74 603.149L893.825 603.972L894.146 605.159L896.077 604.637ZM900.606 612.471L899.187 613.881L900.055 614.754L901.225 614.373L900.606 612.471ZM903.113 611.655L904.419 610.14L903.565 609.404L902.493 609.753L903.113 611.655ZM908.085 614.529L910.042 614.115L909.808 613.012L908.744 612.641L908.085 614.529ZM908.632 617.109L906.675 617.523L906.931 618.728L908.122 619.043L908.632 617.109ZM917.681 617.108L918.191 619.042L919.382 618.728L919.637 617.523L917.681 617.108ZM918.227 614.529L917.568 612.64L916.504 613.012L916.271 614.114L918.227 614.529ZM923.199 611.654L923.818 609.753L922.746 609.404L921.892 610.14L923.199 611.654ZM925.705 612.471L925.086 614.372L926.256 614.753L927.124 613.88L925.705 612.471ZM930.234 604.635L932.165 605.158L932.486 603.971L931.572 603.148L930.234 604.635ZM928.273 602.871L926.307 602.5L926.098 603.606L926.935 604.358L928.273 602.871ZM928.273 597.128L926.935 595.641L926.099 596.394L926.307 597.499L928.273 597.128ZM930.234 595.364L931.572 596.851L932.486 596.029L932.165 594.842L930.234 595.364ZM925.705 587.529L927.124 586.119L926.256 585.246L925.086 585.627L925.705 587.529ZM923.199 588.345L921.892 589.86L922.746 590.596L923.818 590.247L923.199 588.345ZM918.227 585.471L916.271 585.885L916.504 586.988L917.568 587.359L918.227 585.471ZM917.681 582.892L919.637 582.477L919.382 581.272L918.191 580.958L917.681 582.892ZM908.632 582.891L908.122 580.957L906.931 581.271L906.675 582.477L908.632 582.891ZM908.086 585.47L908.744 587.358L909.808 586.987L910.042 585.885L908.086 585.47ZM899.987 589.43L902.493 590.247L903.732 586.443L901.225 585.627L899.987 589.43ZM898.007 595.886C898.728 593.225 900.133 590.842 902.025 588.938L899.188 586.119C896.818 588.503 895.053 591.493 894.147 594.84L898.007 595.886ZM899.376 595.64L897.414 593.876L894.74 596.85L896.701 598.614L899.376 595.64ZM899.771 600C899.771 599.143 899.851 598.307 900.004 597.498L896.073 596.756C895.874 597.808 895.771 598.893 895.771 600H899.771ZM900.004 602.501C899.851 601.692 899.771 600.856 899.771 600H895.771C895.771 601.107 895.875 602.191 896.073 603.244L900.004 602.501ZM897.414 606.124L899.376 604.36L896.701 601.385L894.74 603.149L897.414 606.124ZM902.025 611.061C900.133 609.158 898.728 606.775 898.007 604.114L894.146 605.159C895.053 608.506 896.818 611.497 899.187 613.881L902.025 611.061ZM902.493 609.753L899.987 610.569L901.225 614.373L903.732 613.556L902.493 609.753ZM908.744 612.641C907.144 612.082 905.68 611.227 904.419 610.14L901.807 613.169C903.441 614.579 905.343 615.691 907.427 616.418L908.744 612.641ZM910.589 616.694L910.042 614.115L906.129 614.944L906.675 617.523L910.589 616.694ZM913.155 615.692C911.766 615.692 910.421 615.512 909.142 615.175L908.122 619.043C909.731 619.467 911.418 619.692 913.155 619.692V615.692ZM917.171 615.174C915.891 615.512 914.546 615.692 913.155 615.692V619.692C914.893 619.692 916.581 619.467 918.191 619.042L917.171 615.174ZM916.271 614.114L915.724 616.694L919.637 617.523L920.184 614.943L916.271 614.114ZM921.892 610.14C920.632 611.227 919.168 612.082 917.568 612.64L918.886 616.417C920.97 615.69 922.871 614.578 924.505 613.169L921.892 610.14ZM926.325 610.569L923.818 609.753L922.579 613.556L925.086 614.372L926.325 610.569ZM928.304 604.113C927.583 606.774 926.179 609.157 924.287 611.061L927.124 613.88C929.493 611.496 931.258 608.505 932.165 605.158L928.304 604.113ZM926.935 604.358L928.897 606.123L931.572 603.148L929.61 601.384L926.935 604.358ZM926.54 600C926.54 600.856 926.46 601.692 926.307 602.5L930.238 603.242C930.436 602.19 930.54 601.106 930.54 600H926.54ZM926.307 597.499C926.46 598.308 926.54 599.144 926.54 600H930.54C930.54 598.893 930.436 597.809 930.238 596.757L926.307 597.499ZM928.897 593.877L926.935 595.641L929.61 598.616L931.572 596.851L928.897 593.877ZM924.287 588.939C926.178 590.843 927.583 593.226 928.304 595.887L932.165 594.842C931.258 591.494 929.493 588.504 927.124 586.119L924.287 588.939ZM923.818 590.247L926.324 589.431L925.086 585.627L922.579 586.444L923.818 590.247ZM917.568 587.359C919.169 587.918 920.632 588.773 921.892 589.86L924.505 586.831C922.871 585.421 920.97 584.31 918.886 583.582L917.568 587.359ZM915.724 583.306L916.271 585.885L920.184 585.056L919.637 582.477L915.724 583.306ZM913.155 584.308C914.546 584.308 915.891 584.488 917.171 584.825L918.191 580.958C916.581 580.533 914.893 580.308 913.155 580.308V584.308ZM909.142 584.825C910.421 584.488 911.766 584.308 913.155 584.308V580.308C911.418 580.308 909.731 580.533 908.122 580.957L909.142 584.825ZM910.042 585.885L910.589 583.306L906.675 582.477L906.129 585.055L910.042 585.885ZM904.419 589.859C905.68 588.772 907.143 587.917 908.744 587.358L907.427 583.582C905.343 584.309 903.441 585.421 901.806 586.83L904.419 589.859Z"
              />
            </g>
          </g>
          {/* SHAPER */}
          <g className="shaper" style={{ opacity: 0, visibility: 'hidden' }}>
            <circle className="st44" cx="914.77" cy="599.77" r="20.77"></circle>
            <path
              className="st45"
              d="M912.577 591.739C913.129 589.804 915.871 589.804 916.423 591.739L916.929 593.511C917.225 594.549 918.291 595.164 919.338 594.902L921.126 594.454C923.077 593.965 924.448 596.339 923.049 597.785L921.767 599.109C921.016 599.884 921.016 601.116 921.767 601.891L923.049 603.215C924.448 604.661 923.077 607.035 921.126 606.546L919.338 606.098C918.291 605.836 917.225 606.451 916.929 607.489L916.423 609.261C915.871 611.196 913.129 611.196 912.577 609.261L912.071 607.489C911.775 606.451 910.709 605.836 909.662 606.098L907.874 606.546C905.923 607.035 904.552 604.661 905.951 603.215L907.233 601.891C907.984 601.116 907.984 599.884 907.233 599.109L905.951 597.785C904.552 596.339 905.923 593.965 907.874 594.454L909.662 594.902C910.709 595.164 911.775 594.549 912.071 593.511L912.577 591.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth52Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth52Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M882.489 594.821C880.282 588.167 885.858 582.381 892.945 580.211C898.987 578.331 905.841 578.331 912.696 578.187C919.55 578.042 926.405 577.608 932.562 578.91C939.185 580.212 945.226 584.406 944.994 591.205C944.877 594.821 942.554 597.858 939.998 600.317C937.093 603.065 933.724 605.38 931.052 608.562C927.683 612.757 925.824 618.108 922.339 622.158C920.364 624.473 918.04 626.208 915.252 626.787C911.185 627.655 907.119 625.775 903.982 622.882C900.032 619.121 897.941 613.624 895.153 608.996C893.991 606.971 892.597 604.946 890.854 603.355C887.95 600.606 883.883 598.871 882.489 594.821Z"
            ></path>
            <path
              className="st47"
              d="M891.349 597.015C889.773 592.262 893.756 588.129 898.818 586.58C903.133 585.237 908.029 585.237 912.926 585.133C917.822 585.03 922.718 584.72 927.116 585.65C931.846 586.58 936.161 589.576 935.995 594.432C935.912 597.015 934.253 599.184 932.427 600.941C930.352 602.904 927.946 604.557 926.037 606.83C923.631 609.826 922.303 613.649 919.813 616.542C918.403 618.195 916.743 619.435 914.751 619.848C911.847 620.468 908.942 619.125 906.702 617.058C903.88 614.372 902.386 610.446 900.395 607.14C899.565 605.693 898.569 604.247 897.324 603.11C895.25 601.147 892.345 599.908 891.349 597.015Z"
            ></path>
            <circle className="st45" cx="913" cy="600" r="13"></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth52Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M882.49 594.821C880.282 588.167 885.859 582.381 892.946 580.211C898.987 578.331 905.842 578.331 912.696 578.187C919.551 578.042 926.405 577.608 932.563 578.91C939.185 580.212 945.226 584.406 944.994 591.205C944.878 594.821 942.554 597.858 939.998 600.317C937.094 603.065 933.725 605.38 931.052 608.562C927.683 612.757 925.824 618.108 922.339 622.158C920.364 624.473 918.04 626.208 915.252 626.787C911.186 627.655 907.12 625.775 903.983 622.882C900.033 619.121 897.941 613.624 895.153 608.996C893.991 606.971 892.597 604.946 890.855 603.355C887.95 600.606 883.884 598.871 882.49 594.821Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M891.35 597.015C889.773 592.262 893.756 588.129 898.819 586.58C903.134 585.237 908.03 585.237 912.926 585.133C917.822 585.03 922.718 584.72 927.116 585.65C931.847 586.58 936.162 589.576 935.996 594.432C935.913 597.015 934.253 599.184 932.428 600.941C930.353 602.904 927.946 604.557 926.038 606.83C923.631 609.826 922.303 613.649 919.814 616.542C918.403 618.195 916.743 619.435 914.752 619.848C911.847 620.468 908.943 619.125 906.702 617.058C903.881 614.372 902.387 610.446 900.395 607.14C899.565 605.693 898.57 604.247 897.325 603.11C895.25 601.147 892.346 599.908 891.35 597.015Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle
              className="st57"
              id="Ellipse_49"
              cx="913"
              cy="600"
              r="12.25"
              style={{ fill: 'black', opacity: tooth52Diagnozis.pin ? 1 : 0 }}
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth52Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth52Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M882.489 594.821C880.282 588.167 885.858 582.381 892.945 580.211C898.987 578.331 905.841 578.331 912.696 578.187C919.55 578.042 926.405 577.608 932.562 578.91C939.185 580.212 945.226 584.406 944.994 591.205C944.877 594.821 942.554 597.858 939.998 600.317C937.093 603.065 933.724 605.38 931.052 608.562C927.683 612.757 925.824 618.108 922.339 622.158C920.364 624.473 918.04 626.208 915.252 626.787C911.185 627.655 907.119 625.775 903.982 622.882C900.032 619.121 897.941 613.624 895.153 608.996C893.991 606.971 892.597 604.946 890.854 603.355C887.95 600.606 883.883 598.871 882.489 594.821Z"
            ></path>
            <path
              className="st47"
              d="M891.349 597.015C889.773 592.262 893.756 588.129 898.818 586.58C903.133 585.237 908.029 585.237 912.926 585.133C917.822 585.03 922.718 584.72 927.116 585.65C931.846 586.58 936.161 589.576 935.995 594.432C935.912 597.015 934.253 599.184 932.427 600.941C930.352 602.904 927.946 604.557 926.037 606.83C923.631 609.826 922.303 613.649 919.813 616.542C918.403 618.195 916.743 619.435 914.751 619.848C911.847 620.468 908.942 619.125 906.702 617.058C903.88 614.372 902.386 610.446 900.395 607.14C899.565 605.693 898.569 604.247 897.324 603.11C895.25 601.147 892.345 599.908 891.349 597.015Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth52Diagnozis.culttab &&
                !tooth52Diagnozis.abutment &&
                !tooth52Diagnozis.implant &&
                !tooth52Diagnozis.apex &&
                !tooth52Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M942.7,580.7c-2.2-1.4-4.9-2.3-7.6-2.9c-7-1.4-14.7-1.1-22.5-1
                            c-7.7,0.1-15.4,0.1-22.2,2c-2.3,0.6-4.4,1.6-6.2,2.8c-4.6,3.1-7.3,7.8-5.5,13c1.5,4.4,6.2,6.3,9.5,9.4c1.9,1.7,3.5,3.9,4.8,6.1
                            c0.9,1.5,1.7,3,2.6,4.5c2.1,3.8,4.3,7.7,7.5,10.7c3.5,3.3,8.1,5.3,12.7,4.4c3.1-0.6,5.9-2.5,8-5c2.9-3.2,4.7-7.2,7-10.9
                            c0.8-1.4,1.7-2.7,2.8-3.9c2.9-3.4,6.7-5.9,10-8.9c2.9-2.6,5.5-5.9,5.6-9.8C949.3,586.6,946.6,583,942.7,580.7z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth52.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M923.741 626.3C921.453 629.034 918.761 632.199 915.53 632.883C912.981 633.438 910.432 631.929 908.054 630.907C906.036 630.041 903.051 628.724 901.382 627.154C898.767 624.615 897.944 621.406 896.183 618.101C894.862 615.622 892.536 613.089 891.151 610.745C889.804 608.352 889.279 607.072 887.259 605.192C885.589 603.642 883.642 601.251 881.903 599.818C879.998 598.25 878.341 596.495 877.567 593.993C876.365 590.3 877.154 586.833 879.179 583.929C880.299 582.322 880.708 580.888 882.457 579.683C884.279 578.429 886.372 576.309 888.593 575.615C891.323 574.749 895.286 575.334 898.246 575.001C900.387 574.761 902.573 573.509 904.784 573.42C907.356 573.316 909.962 574.392 912.568 574.336C915.434 574.274 918.299 573.055 921.127 573.016C923.522 572.984 925.891 573 928.209 573.133C930.739 573.279 933.208 574.677 935.588 575.191C937.774 575.629 939.904 575.231 941.828 576.216C943.629 577.138 945.249 578.296 946.562 579.683C948.771 582.018 950.113 586.116 949.992 589.72C949.922 591.941 949.161 595.092 948.03 596.944C946.986 598.654 945.626 600.207 944.204 601.602C942.408 603.336 941.548 603.809 939.649 605.484C937.991 606.948 936.371 608.478 934.928 610.232C932.708 613.05 931.054 616.31 929.299 619.478C927.966 621.882 925.484 624.234 923.741 626.3ZM892.951 580.213C885.864 582.383 880.288 588.169 882.495 594.823C883.773 598.873 887.839 600.608 890.86 603.357C892.603 604.948 893.997 606.973 895.158 608.998C897.947 613.626 900.038 619.123 903.988 622.884C907.125 625.776 911.191 627.657 915.257 626.789C918.046 626.21 920.369 624.475 922.344 622.16C925.83 618.11 927.689 612.759 931.058 608.564C933.73 605.382 937.099 603.067 940.004 600.319C942.56 597.86 944.883 594.823 944.999 591.206C945.232 584.408 939.19 580.213 932.568 578.912C926.411 577.61 919.556 578.044 912.702 578.188C905.847 578.333 898.992 578.333 892.951 580.213Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M923.741 626.3C921.453 629.034 918.761 632.199 915.53 632.883C912.981 633.438 910.432 631.929 908.054 630.907C906.036 630.041 903.051 628.724 901.382 627.154C898.767 624.615 897.944 621.406 896.183 618.101C894.862 615.622 892.536 613.089 891.151 610.745C889.804 608.352 889.279 607.072 887.259 605.192C885.589 603.642 883.642 601.251 881.903 599.818C879.998 598.25 878.341 596.495 877.567 593.993C876.365 590.3 877.154 586.833 879.179 583.929C880.299 582.322 880.708 580.888 882.457 579.683C884.279 578.429 886.372 576.309 888.593 575.615C891.323 574.749 895.286 575.334 898.246 575.001C900.387 574.761 902.573 573.509 904.784 573.42C907.356 573.316 909.962 574.392 912.568 574.336C915.434 574.274 918.299 573.055 921.127 573.016C923.522 572.984 925.891 573 928.209 573.133C930.739 573.279 933.208 574.677 935.588 575.191C937.774 575.629 939.904 575.231 941.828 576.216C943.629 577.138 945.249 578.296 946.562 579.683C948.771 582.018 950.113 586.116 949.992 589.72C949.922 591.941 949.161 595.092 948.03 596.944C946.986 598.654 945.626 600.207 944.204 601.602C942.408 603.336 941.548 603.809 939.649 605.484C937.991 606.948 936.371 608.478 934.928 610.232C932.708 613.05 931.054 616.31 929.299 619.478C927.966 621.882 925.484 624.234 923.741 626.3ZM892.951 580.213C885.864 582.383 880.288 588.169 882.495 594.823C883.773 598.873 887.839 600.608 890.86 603.357C892.603 604.948 893.997 606.973 895.158 608.998C897.947 613.626 900.038 619.123 903.988 622.884C907.125 625.776 911.191 627.657 915.257 626.789C918.046 626.21 920.369 624.475 922.344 622.16C925.83 618.11 927.689 612.759 931.058 608.564C933.73 605.382 937.099 603.067 940.004 600.319C942.56 597.86 944.883 594.823 944.999 591.206C945.232 584.408 939.19 580.213 932.568 578.912C926.411 577.61 919.556 578.044 912.702 578.188C905.847 578.333 898.992 578.333 892.951 580.213Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M922.9 623.862C920.799 626.318 918.328 629.16 915.363 629.774C913.024 630.272 910.684 628.917 908.502 628C906.649 627.222 903.909 626.039 902.378 624.629C899.978 622.349 899.223 619.468 897.606 616.5C896.394 614.274 894.259 611.999 892.988 609.893C891.752 607.744 891.269 606.595 889.416 604.907C887.883 603.515 886.096 601.368 884.5 600.082C882.751 598.673 881.231 597.097 880.52 594.85C879.417 591.534 880.141 588.42 882 585.812C883.028 584.37 883.403 583.082 885.009 582C886.68 580.873 888.601 578.97 890.64 578.347C893.146 577.569 896.783 578.094 899.5 577.795C901.465 577.579 903.471 576.455 905.5 576.375C907.861 576.282 910.253 577.248 912.645 577.198C915.275 577.143 917.905 576.047 920.5 576.013C922.699 575.984 924.872 575.998 927 576.118C929.322 576.249 931.588 577.505 933.773 577.965C935.779 578.359 937.734 578.001 939.5 578.886C941.153 579.714 942.639 580.754 943.845 582C945.872 584.097 947.104 587.777 946.993 591.013C946.929 593.008 946.23 595.837 945.192 597.5C944.234 599.036 942.985 600.431 941.68 601.683C940.032 603.24 939.242 603.665 937.5 605.17C935.978 606.484 934.491 607.858 933.166 609.433C931.129 611.964 929.612 614.891 928 617.736C926.777 619.895 924.499 622.007 922.9 623.862ZM892.951 580.211C885.864 582.381 880.288 588.167 882.495 594.821C883.773 598.871 887.839 600.606 890.86 603.355C892.603 604.946 893.997 606.971 895.158 608.996C897.947 613.624 900.038 619.121 903.988 
                              622.882C907.125 625.775 911.191 627.655 915.257 626.787C918.046 626.208 920.369 624.473 922.344 622.158C925.83 618.108 927.689 612.757 931.058 608.562C933.73 605.38 937.099 603.065 940.004 600.317C942.56 597.858 944.883 594.821 944.999 591.205C945.232 584.406 939.19 580.212 932.568 578.91C926.411 577.608 919.556 578.042 912.702 578.187C905.847 578.331 898.992 578.331 892.951 580.211Z"
            />
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth52Diagnozis.culttab &&
                !tooth52Diagnozis.abutment &&
                !tooth52Diagnozis.implant &&
                !tooth52Diagnozis.shaper &&
                !tooth52Diagnozis.apex
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
                d="M878.6,594.7c1.5,4.4,6.2,6.3,9.5,9.4c1.9,1.7,3.5,3.9,4.8,6.1c0.9,1.5,1.7,3,2.6,4.5
                                c2.9-4.5,7-11.5,7.1-13.9c0-0.3,0-0.5-0.1-0.6c-1.1-1.7-12.9-13.2-18.5-18.5C879.5,584.7,876.8,589.5,878.6,594.7z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth52.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth52.seal_left ? `seal-fill ${teethDiagnozis.tooth52.seal_left_color}` : ''}
                                `}
                d="M878.6,594.7c1.5,4.4,6.2,6.3,9.5,9.4c1.9,1.7,3.5,3.9,4.8,6.1c0.9,1.5,1.7,3,2.6,4.5
                                c2.9-4.5,7-11.5,7.1-13.9c0-0.3,0-0.5-0.1-0.6c-1.1-1.7-12.9-13.2-18.5-18.5C879.5,584.7,876.8,589.5,878.6,594.7z"
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
                d="M895.6,614.7c2.1,3.8,4.3,7.7,7.5,10.7c3.5,3.3,8.1,5.3,12.7,4.4c3.1-0.6,5.9-2.5,8-5c2.9-3.2,4.7-7.2,7-10.9
                                c-1.1-2.5-2.7-5.9-3.6-8c-0.5-1.2-1-2.5-1.2-3.8c-5.9-0.5-16.3-1.3-23.3-1.3C902.6,603.2,898.5,610.1,895.6,614.7z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth52.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth52.seal_bottom ? `seal-fill ${teethDiagnozis.tooth52.seal_bottom_color}` : ''}
                                `}
                d="M895.6,614.7c2.1,3.8,4.3,7.7,7.5,10.7c3.5,3.3,8.1,5.3,12.7,4.4c3.1-0.6,5.9-2.5,8-5c2.9-3.2,4.7-7.2,7-10.9
                                c-1.1-2.5-2.7-5.9-3.6-8c-0.5-1.2-1-2.5-1.2-3.8c-5.9-0.5-16.3-1.3-23.3-1.3C902.6,603.2,898.5,610.1,895.6,614.7z"
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
                d="M926,602.1c0.2,1.3,0.7,2.5,1.2,3.8c0.9,2.1,2.5,5.5,3.6,8c0.8-1.4,1.7-2.7,2.8-3.9c2.9-3.4,6.7-5.9,10-8.9
                                c2.9-2.6,5.5-5.9,5.6-9.8c0.2-4.6-2.5-8.2-6.5-10.6c-4.3,3.6-13.8,11.5-15.5,14C925.7,596.9,925.5,599.5,926,602.1z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth52.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth52.seal_right ? `seal-fill ${teethDiagnozis.tooth52.seal_right_color}` : ''}
                                `}
                d="M926,602.1c0.2,1.3,0.7,2.5,1.2,3.8c0.9,2.1,2.5,5.5,3.6,8c0.8-1.4,1.7-2.7,2.8-3.9c2.9-3.4,6.7-5.9,10-8.9
                                c2.9-2.6,5.5-5.9,5.6-9.8c0.2-4.6-2.5-8.2-6.5-10.6c-4.3,3.6-13.8,11.5-15.5,14C925.7,596.9,925.5,599.5,926,602.1z"
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
                d="M884.1,581.6c5.6,5.4,17.4,16.9,18.5,18.5c0.1,0.1,0.1,0.4,0.1,0.6c6.9,0,17.4,0.8,23.3,1.3
                                c-0.5-2.6-0.3-5.2,1.2-7.5c1.7-2.5,11.1-10.4,15.5-14c-2.2-1.4-4.9-2.3-7.6-2.9c-7-1.4-14.7-1.1-22.5-1c-7.7,0.1-15.4,0.1-22.2,2
                                C888.1,579.4,885.9,580.4,884.1,581.6z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth52.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth52.seal_top ? `seal-fill ${teethDiagnozis.tooth52.seal_top_color}` : ''}
                                `}
                d="M884.1,581.6c5.6,5.4,17.4,16.9,18.5,18.5c0.1,0.1,0.1,0.4,0.1,0.6c6.9,0,17.4,0.8,23.3,1.3
                                c-0.5-2.6-0.3-5.2,1.2-7.5c1.7-2.5,11.1-10.4,15.5-14c-2.2-1.4-4.9-2.3-7.6-2.9c-7-1.4-14.7-1.1-22.5-1c-7.7,0.1-15.4,0.1-22.2,2
                                C888.1,579.4,885.9,580.4,884.1,581.6z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_left &&
                      !tooth52Diagnozis.seal_bottom &&
                      !tooth52Diagnozis.seal_center) ||
                    (tooth52Diagnozis.seal_left &&
                      !tooth52Diagnozis.seal_bottom &&
                      !tooth52Diagnozis.seal_center) ||
                    (!tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M903 601C902.667 602.5 901.3 606.4 898.5 610"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_left &&
                      !tooth52Diagnozis.seal_top) ||
                    (!tooth52Diagnozis.seal_left && tooth52Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M903 601C900.333 597.667 893.5 589.8 887.5 585"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_top &&
                      !tooth52Diagnozis.seal_bottom) ||
                    (!tooth52Diagnozis.seal_left &&
                      !tooth52Diagnozis.seal_top &&
                      tooth52Diagnozis.seal_bottom) ||
                    (!tooth52Diagnozis.seal_left &&
                      !tooth52Diagnozis.seal_right &&
                      tooth52Diagnozis.seal_top &&
                      !tooth52Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M903 601C907 600.5 917.1 600 925.5 602"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_right &&
                      !tooth52Diagnozis.seal_top) ||
                    (!tooth52Diagnozis.seal_right && tooth52Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M925.5 602C923.833 599.667 924.1 592.8 938.5 584"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_right &&
                      !tooth52Diagnozis.seal_bottom) ||
                    (!tooth52Diagnozis.seal_right &&
                      tooth52Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M925 602L928.5 608.5"
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
                visibility: tooth52Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth52Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth52Diagnozis.vinir_color}`}
                d="M884.611 581.577C886.411 580.377 888.511 579.377 890.811 578.777C897.611 576.877 905.311 576.877 913.011 576.777C920.811 576.677 928.511 576.377 935.511 577.777C938.211 578.277 940.911 579.277 943.111 580.677C947.011 583.077 949.711 586.677 949.611 591.277C949.597 591.86 949.529 592.426 949.415 592.976C947.818 593.048 943.102 592.278 937.011 588.62C936.379 587.977 935.648 587.402 934.848 586.9C933.27 585.875 931.334 585.144 929.398 584.778C924.377 583.754 918.855 583.973 913.262 584.047C907.74 
                                  584.12 902.218 584.12 897.341 585.51C895.692 585.949 894.186 586.68 892.895 587.558C892.478 587.845 892.082 588.151 891.713 588.476C890.042 589.809 885.082 592.576 878.606 592.976C877.929 588.44 880.518 584.335 884.611 581.577Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth52Diagnozis.temporary_crown ||
                tooth52Diagnozis.ceramic_crown ||
                tooth52Diagnozis.mceramic_crown ||
                tooth52Diagnozis.metalic_crown ||
                tooth52Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth52Diagnozis.temporary_crown ||
                tooth52Diagnozis.ceramic_crown ||
                tooth52Diagnozis.mceramic_crown ||
                tooth52Diagnozis.metalic_crown ||
                tooth52Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth52Diagnozis.ceramic_crown_color}
                                ${tooth52Diagnozis.mceramic_crown_color}
                                ${tooth52Diagnozis.metalic_crown_color}
                                ${tooth52Diagnozis.zirconia_crown_color}
                            `}
              d="M942.7,580.7c-2.2-1.4-4.9-2.3-7.6-2.9c-7-1.4-14.7-1.1-22.5-1
                            c-7.7,0.1-15.4,0.1-22.2,2c-2.3,0.6-4.4,1.6-6.2,2.8c-4.6,3.1-7.3,7.8-5.5,13c1.5,4.4,6.2,6.3,9.5,9.4c1.9,1.7,3.5,3.9,4.8,6.1
                            c0.9,1.5,1.7,3,2.6,4.5c2.1,3.8,4.3,7.7,7.5,10.7c3.5,3.3,8.1,5.3,12.7,4.4c3.1-0.6,5.9-2.5,8-5c2.9-3.2,4.7-7.2,7-10.9
                            c0.8-1.4,1.7-2.7,2.8-3.9c2.9-3.4,6.7-5.9,10-8.9c2.9-2.6,5.5-5.9,5.6-9.8C949.3,586.6,946.6,583,942.7,580.7z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 24, 85)',
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
                  !tooth52Diagnozis.implant &&
                  !tooth52Diagnozis.apex &&
                  !tooth52Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth52Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M938,483.1l-1.7,2.4l-2.1,1l-38.5,5.2l-1.9-1.4l-1.1-1.5
                                c-4.5-9.7-8-19.8-10.5-30.1c-1.7-7.2-3-14.6-3.7-22c0.2-1,0.5-2,0.8-3c2.2-7.5,6.5-14.4,13.3-18c1.7-0.9,3.5-1.6,5.2-2
                                c4.2-1,8.6-0.8,12.9,0.3c0.8,0.2,1.6,0.4,2.3,0.7c5.4,1.9,10.4,5,14.6,9.2c2.6,2.6,4.9,5.5,6.9,8.7c-0.1-0.2-0.1-0.4-0.2-0.6
                                c1.2,4.1,2.5,8.2,3.3,12.4c1,5,1.3,10.2,1.4,15.3C939.3,467.6,938.9,475.4,938,483.1z"
              />
            </g>
            <g
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth52Diagnozis.implant &&
                  !tooth52Diagnozis.abutment &&
                  !tooth52Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth52Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M934.5,432.8c-2-3.1-4.3-6.1-6.9-8.7c-4.2-4.2-9.2-7.3-14.6-9.2
                                c-0.8-0.3-1.5-0.5-2.3-0.7c-4.3-1.1-8.7-1.4-12.9-0.3c-1.8,0.4-3.6,1.1-5.2,2c-6.7,3.6-11,10.5-13.3,18c-0.3,1-0.5,2-0.8,3
                                c-0.1-1.3-0.3-2.6-0.4-3.9c-0.8-10.2-0.9-20.3-0.8-30.4c0-10.2,0.2-20.5-0.5-30.7c-0.6-10.9-2.1-21.8-2.1-32.7
                                c0-8.2,0.8-16.5,1.7-24.7c0.7-6.6,1.3-13.2,2.2-19.8c1.1-8,4.3-16.2,10.8-18.2c0,0,0,0,0.1,0c1-0.3,2-0.5,3.1-0.5
                                c7.6,0,12,7.8,14.5,15.6c4.7,14.8,7.7,30,10.7,45.2c3.8,19.6,7.5,39.2,10.1,59c1.4,10.8,2.6,21.8,5.4,32.4
                                C933.6,429.7,934.1,431.2,934.5,432.8z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth52Diagnozis.channel_class} ${tooth52Diagnozis.channel_class} ${tooth52Diagnozis.pulpit ? 'pulpit' : ''} ${tooth52Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M916.7,455.7l-1,2l-12.7,1l-1.1-1.7c-0.9-3.8-1.7-7.7-2.4-11.6
                                c-0.8-4.6-1.4-9.3-1.7-14c-0.3-5.9-0.1-11.7,0.1-17.6c4.2-1,8.6-0.8,12.9,0.3c-0.2-0.9-0.4-1.9-0.7-2.8c0.5,2,1,3.9,1.5,5.9
                                c1.6,6.2,3.4,12.3,4.4,18.6C916.9,442.5,917.2,449.2,916.7,455.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth52Diagnozis.channel_class} ${tooth52Diagnozis.channel_class} ${tooth52Diagnozis.pulpit ? 'pulpit' : ''} ${tooth52Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M910.7,414.2c-4.3-1.1-8.7-1.3-12.9-0.3c0-1,0.1-2,0.1-3
                                c0.4-21.9-1.9-43.7-4.2-65.4c1.2-0.2,2.4-0.3,3.7-0.4c0.3,0,0.7,0,1,0c0.6,4.3,1.1,8.6,1.8,12.9c0,0.1,0,0.2,0,0.3
                                c0.3,2.2,0.6,4.3,0.9,6.4c0.2,1.1,0.3,2.2,0.5,3.3c0.5,3.2,1,6.4,1.6,9.7c0.1,0.5,0.2,1,0.2,1.5c0.3,1.8,0.6,3.6,0.9,5.4
                                c0.2,1.1,0.4,2.2,0.6,3.3c0.2,1.1,0.4,2.2,0.6,3.3c0,0.3,0.1,0.6,0.2,0.8C907.2,399.4,908.9,406.8,910.7,414.2z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth52Diagnozis.channel_class} ${tooth52Diagnozis.channel_class} ${tooth52Diagnozis.pulpit ? 'pulpit' : ''} ${tooth52Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M898.5,345.1c-0.3,0-0.7,0-1,0c-1.2,0-2.5,0.2-3.7,0.4c-1.3-12.7-2.7-25.4-3.5-38.1
                                c-0.4-5.7-0.6-11.5-0.7-17.2c-0.1-3.5-0.1-7-0.1-10.5c0-1.1,0-2.2,0-3.3v-0.5c0,0,0,0,0,0.1c0,0.1,0,0.2,0,0.4
                                c1.2,8.7,2.4,17.5,3.6,26.2c0,0,0,0.1,0,0.1c0.4,2.9,0.8,5.9,1.1,8.8c0.3,2.1,0.6,4.3,0.8,6.4c0,0.1,0,0.1,0,0.2
                                c1.1,8.5,2.1,17.1,3.2,25.6c0,0.3,0.1,0.7,0.1,1C898.4,344.8,898.4,344.9,898.5,345.1z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage52 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth52Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M879 437.1C879.8 444.5 881.001 451.8 882.701 459C885.201 469.3 888.701 479.4 893.201 489.1L894.3 490.6L896.201 492L934.701 486.8L936.8 485.8L938.5 483.4C939.4 475.7 939.801 467.9 939.701 460.2C939.601 455.1 939.3 450 938.3 444.9C937.5 440.9 936.3 437 935.1 433.1C934.9 432.7 934.6 432.3 934.3 432C934 431.6 933.8 431.2 933.5 430.8C933.3 430.5 933.101 430.3 932.901 430C932.701 429.7 932.401 429.4 932.201 429C932.001 428.7 931.7 428.4 931.5 428.2C931.4 428.1 931.301 428 931.201 427.8C930.901 427.4 930.6 427.1 930.3 426.7C929.9 426.3 929.601 425.9 929.201 425.5C928.801 425.1 928.5 424.7 928.1 424.4C927.8 424.1 927.6 423.9 927.3 423.6C926.2 422.6 925.1 421.7 924 420.8C920.8 418.4 917.3 416.5 913.6 415.2C913.4 415.1 913.2 415.1 913 415C912.4 414.8 911.9 414.6 911.3 414.5C910.9 414.4 910.501 414.3 910.201 414.2C909.601 414.1 909.1 414 908.5 413.9C908.2 413.8 908.001 413.8 907.701 413.8C907.401 413.7 907.1 413.7 906.8 413.7C906.5 413.7 906.201 413.7 905.901 413.6H905.8C905.2 413.6 904.6 413.5 904 413.5C903.7 413.5 903.4 413.5 903.1 413.5C902.9 413.5 902.701 413.5 902.401 413.5C902.201 413.5 902.101 413.5 901.901 413.5C901.701 413.5 901.5 413.5 901.3 413.5C901.2 413.5 901.2 413.5 901.1 413.5C900.9 413.5 900.7 413.5 900.5 413.6C900.3 413.6 900.1 413.7 899.8 413.7C899.3 413.8 898.9 413.9 898.5 414C897.7 414.2 896.8 414.5 896 414.8C895.1 415.1 894.2 415.6 893.3 416C891.2 417.1 889.301 418.6 887.701 420.3C884.101 424 881.6 428.9 880 434C879.5 435.1 879.3 436.1 879 437.1Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st57"
              style={{ fill: tooth52Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M892.6 330.5L905.2 490.6L926.4 487.7L912.9 415L912.8 414.6L904.5 370L903.2 362.9L897.1 330.1C896.9 329 895.9 328.2 894.8 328.2C893.6 328.2 892.6 329.2 892.6 330.5Z"
            ></path>
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth52Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth52Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st16"
              d="M892.5,330.5L892.5,330.5l3.3,84.4c0.8-0.3,1.7-0.6,2.5-0.8h0c0.5-0.1,0.9-0.2,1.3-0.3c0,0,0,0,0,0
                            c0.2,0,0.4-0.1,0.7-0.1c0,0,0,0,0,0c0.2,0,0.4-0.1,0.6-0.1c0.1,0,0.1,0,0.2,0c0.2,0,0.4,0,0.6,0c0.2,0,0.3,0,0.5,0
                            c0.2,0,0.4,0,0.7,0c0.3,0,0.6,0,0.9,0c0.6,0,1.2,0,1.8,0.1h0.1c0.3,0,0.6,0,0.9,0.1c0,0,0,0,0,0c0.3,0,0.6,0.1,0.9,0.1
                            c0.3,0,0.5,0.1,0.8,0.1c0.6,0.1,1.1,0.2,1.7,0.3c0.4,0.1,0.8,0.2,1.1,0.3h0c0.6,0.1,1.1,0.3,1.7,0.5l-15.8-84.9
                            c-0.2-1.1-1.2-1.9-2.3-1.9C893.6,328.2,892.5,329.2,892.5,330.5z"
            />
            <path
              className="st15"
              d="M879,437.1c0.8,7.4,2,14.7,3.7,21.9c2.5,10.3,6,20.4,10.5,30.1l1.1,1.5l1.9,1.4l38.5-5.2l2.1-1l1.7-2.4
                            c0.9-7.7,1.3-15.5,1.2-23.2c-0.1-5.1-0.4-10.2-1.4-15.3c-0.8-4-2-7.9-3.2-11.8v0c-0.2-0.4-0.5-0.8-0.8-1.1
                            c-0.3-0.4-0.5-0.8-0.8-1.2c-0.2-0.3-0.4-0.5-0.6-0.8c-0.2-0.3-0.5-0.6-0.7-1c-0.2-0.3-0.5-0.6-0.7-0.8c-0.1-0.1-0.2-0.2-0.3-0.4
                            c-0.3-0.4-0.6-0.7-0.9-1.1c-0.4-0.4-0.7-0.8-1.1-1.2c-0.4-0.4-0.7-0.8-1.1-1.1c-0.3-0.3-0.5-0.5-0.8-0.8c-1.1-1-2.2-1.9-3.3-2.8
                            c-3.2-2.4-6.7-4.3-10.4-5.6c-0.2-0.1-0.4-0.1-0.6-0.2c-0.6-0.2-1.1-0.4-1.7-0.5h0c-0.4-0.1-0.8-0.2-1.1-0.3
                            c-0.6-0.1-1.1-0.2-1.7-0.3c-0.3-0.1-0.5-0.1-0.8-0.1c-0.3-0.1-0.6-0.1-0.9-0.1c0,0,0,0,0,0c-0.3,0-0.6,0-0.9-0.1h-0.1
                            c-0.6,0-1.2-0.1-1.8-0.1c-0.3,0-0.6,0-0.9,0c-0.2,0-0.4,0-0.7,0c-0.2,0-0.3,0-0.5,0c-0.2,0-0.4,0-0.6,0c-0.1,0-0.1,0-0.2,0
                            c-0.2,0-0.4,0-0.6,0.1c0,0,0,0,0,0c-0.2,0-0.4,0.1-0.7,0.1c0,0,0,0,0,0c-0.5,0.1-0.9,0.2-1.3,0.3h0c-0.8,0.2-1.7,0.5-2.5,0.8
                            c-0.9,0.3-1.8,0.8-2.7,1.2c-2.1,1.1-4,2.6-5.6,4.3c-3.6,3.7-6.1,8.6-7.7,13.7C879.5,435.1,879.3,436.1,879,437.1z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth52Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth52Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M935.1,433c-2-3.2-4.3-6.1-6.9-8.7c-4.2-4.1-9.2-7.3-14.6-9.2c-6.8-2.3-14.1-2.5-20.5,1
                            c-5.8,3.1-11.7,14.6-14.1,20.8l10.9-37.1l25.9-2.4L935.1,433z"
            />
            <path
              className="st17"
              d="M938.6,483.3l-1.7,2.4l-2.1,1l-38.5,5.2l-1.9-1.4l-1.1-1.5c-4.5-9.7-8-19.8-10.5-30.1
                            c-1.7-7.2-3-14.6-3.7-21.9c0.2-1,0.5-2,0.8-3c0.1-0.3,0.2-0.7,0.3-1l0.8-2.1c2.4-6.2,6.4-11.7,12.2-14.8c6.3-3.4,13.7-3.3,20.5-1
                            c5.4,1.9,10.4,5,14.6,9.2c2.6,2.6,4.9,5.5,6.9,8.7c1.2,3.9,2.4,7.8,3.2,11.8c1,5,1.3,10.2,1.4,15.3
                            C939.9,467.8,939.5,475.6,938.6,483.3z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g className="shaper" style={{ opacity: 0, visibility: 'hidden' }}>
            <path
              className="st44"
              d="M928.473 437.859C929.031 440.197 927.416 442.496 925.027 442.763L892.999 446.344C890.611 446.611 888.528 444.726 888.555 442.324L888.999 402.614C889.022 400.587 890.558 398.898 892.573 398.682L914.959 396.284C916.96 396.07 918.808 397.375 919.275 399.333L928.473 437.859Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth52Diagnozis.abutment ||
                tooth52Diagnozis.implant ||
                tooth52Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M923.1,398.9l-37.9,3.6c-1.8-20.1-3.1-40.2-3.9-60.3c-0.8-19.5-1.2-39-1.1-58.5c2.7-3.8,6.8-6.3,11.4-6.7
                            c4.8-0.5,9.8,1.2,13.7,4.8c3.5,20.2,6.8,40.4,9.8,60.6C917.9,361.1,920.6,380,923.1,398.9z"
            />
            <line
              className="st19"
              x1="924.7"
              y1="382.1"
              x2="881.3"
              y2="391.9"
            ></line>
            <line
              className="st19"
              x1="922.6"
              y1="359.1"
              x2="879.2"
              y2="368.9"
            ></line>
            <line
              className="st19"
              x1="919.5"
              y1="336.1"
              x2="876.1"
              y2="345.9"
            ></line>
            <line
              className="st19"
              x1="917.4"
              y1="313.1"
              x2="874"
              y2="322.9"
            ></line>
            <line
              className="st19"
              x1="915.2"
              y1="290.1"
              x2="871.8"
              y2="299.9"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth52Diagnozis.culttab &&
                !tooth52Diagnozis.abutment &&
                !tooth52Diagnozis.implant &&
                !tooth52Diagnozis.shaper &&
                !tooth52Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M946.9,466.1c-1.3-6.9-3.2-13.6-5.8-20.1c-1.3-3.4-2.8-6.6-4.5-9.7
                            c-2.5-4.5-5.4-8.6-9-12.1c-4.2-4.2-9.2-7.3-14.6-9.2c-6.8-2.3-14.1-2.5-20.5,1c-6.7,3.6-11,10.5-13.3,18c-0.8,2.8-1.4,5.6-1.8,8.5
                            c-0.8,6.5-0.6,13-0.5,19.6c0.2,10.2,0.3,20.5,3.6,30.2c0.9,2.8,2.1,5.6,3.6,8.2c1.3,2.9,3.1,5.4,5.3,7.5c1.7,1.6,3.7,2.9,5.8,3.8
                            c3,0.4,6,0.7,9.1,0.8c1.3,0,2.6,0.1,3.9,0.1c6.8,0,13.5-0.8,20.1-2.2c2.8-0.6,5.5-1.3,8.2-2.1c1.4-0.4,2.8-0.9,4.3-1.4l4.2-3.9
                            c0.4-0.5,0.7-1,1-1.5c0.3-0.5,0.6-1.1,0.8-1.6c0.5-1.3,0.8-2.7,1-4.1c0.2-1.4,0.4-2.8,0.5-4.2C949.2,483,948.5,474.4,946.9,466.1z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth52Diagnozis.culttab && !tooth52Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M879.522 433.9C878.622 436.7 878.122 439.5 877.722 442.4C876.922 448.8 877.122 455.4 877.322 461.8L877.323 461.82C877.523 472.013 877.724 482.306 880.922 492C881.922 494.8 883.122 497.6 884.522 500.2C885.722 503.1 887.622 505.6 889.822 507.7C891.522 509.3 893.522 510.6 895.622 511.5C898.622 511.9 901.722 512.2 904.722 512.3C906.022 512.4 907.322 512.4 908.622 512.4C915.422 512.4 922.122 511.6 928.722 510.2C931.522 509.6 934.222 508.9 936.922 508.1C938.422 507.7 939.822 507.2 941.222 506.7L945.422 502.8C945.822 502.3 946.122 501.8 946.422 501.3L946.423 501.299C946.722 500.8 947.022 500.3 947.222 499.7C947.822 498.4 948.122 497 948.222 495.6C948.422 494.2 948.622 492.8 948.722 491.4C949.422 482.9 948.722 474.4 947.122 466C945.822 459.1 943.922 452.4 941.322 445.9C940.022 442.6 938.522 439.3 936.822 436.2C934.322 431.7 931.422 427.6 927.822 424.1C923.622 419.9 918.622 416.8 913.222 414.9C906.522 412.6 899.122 412.5 892.822 415.9C886.122 419.6 881.722 426.4 879.522 433.9ZM896.618 420.086C891.344 422.999 887.881 428.351 886.149 434.254C885.999 434.723 885.862 435.192 885.738 435.661C885.424 436.843 886.321 437.972 887.542 438.025L929.956 439.859C931.45 439.923 932.479 438.388 931.787 437.063C931.611 436.728 931.433 436.394 931.252 436.064C929.284 432.522 927.001 429.295 924.168 426.54C920.862 423.235 916.926 420.795 912.675 419.299C907.402 417.489 901.577 417.41 896.618 420.086Z"
            ></path>
            <path
              className={`st7 ${tooth52Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M885.933 434.254C887.664 428.351 891.128 422.999 896.401 420.086C901.36 417.41 907.185 417.489 912.459 419.299C916.709 420.795 920.645 423.235 923.951 426.54C926.784 429.295 929.067 432.522 931.035 436.064C931.216 436.394 931.394 436.728 931.57 437.063C932.262 438.388 931.233 439.923 929.74 439.859L887.325 438.025C886.104 437.972 885.208 436.843 885.521 435.661C885.645 435.192 885.782 434.723 885.933 434.254Z"
            ></path>
            <path
              className={`st60
                                    ${tooth52Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth52Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth52Diagnozis.seal_cervical_color}
                                `}
              d="M885.933 434.254C887.664 428.351 891.128 422.999 896.401 420.086C901.36 417.41 907.185 417.489 912.459 419.299C916.709 420.795 920.645 423.235 923.951 426.54C926.784 429.295 929.067 432.522 931.035 436.064C931.216 436.394 931.394 436.728 931.57 437.063C932.262 438.388 931.233 439.923 929.74 439.859L887.325 438.025C886.104 437.972 885.208 436.843 885.521 435.661C885.645 435.192 885.782 434.723 885.933 434.254Z"
            ></path>
          </g>
          {/* TARTAR */}
          <g
            className="tartar hImplant hEmpty"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth52.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M944 454.5L942 453L940.5 450L938 447L937 444.5L936 441L934 437L932 434V432L929.5 430.5L928 428.5L926.5 426L924.5 424.5L922.5 422.5H921.5L920 420.5L918 419.5L915.5 418L913 417L910.5 416.5L908.5 415.5L906 416L903.5 415L901 415.5L899 416.5H898L896 417L893.5 418L892 418.5L891 419.5L890 420.5L888.5 422.5L886.5 426L884.5 428.5L883 432L881.5 434V437L880 439V442.5L878.5 444.5V447C878.333 447.833 877.8 449.7 877 450.5L876 449.5V446.5V443V440.5L876.5 438L876 436L876.5 433.5V432V429L876 427L876.5 424.5V422.5L875.5 418L876.5 414L875 409.5L875.5 407L875 404.5L876.5 401.5L876 397.5L878.5 394.5L881.5 392.5L886 391L888.5 388.5L891 387.5H894.5L896.5 385.5L900.5 384.5L904.5 386.5L908.5 385L913 388.5L916.5 389.5L920 390.5L922.5 392.5H924.5L928 395.5V399L930.5 402V408L932 413V416L933.5 418.5V422.5L935.5 425.5L936 428.5L938 432L939 437L940.5 441L941.5 443.5L942 447L944 450V454.5Z"
            ></path>
            <path
              className="st61 level1"
              d="M944 454.5L942 453L940.5 450L938 447L937 444.5L936 441L934 437L932 434V432L929.5 430.5L928 428.5L926.5 426L924.5 424.5L922.5 422.5H921.5L920 420.5L918 419.5L915.5 418L913 417L910.5 416.5L908.5 415.5L906 416L903.5 415L901 415.5L899 416.5H898L896 417L893.5 418L892 418.5L891 419.5L890 420.5L888.5 422.5L886.5 426L884.5 428.5L883 432L881.5 434V437L880 439V442.5L878.5 444.5V447C878.333 447.833 877.8 449.7 877 450.5L876.5 449L876 446.5L876.5 443L876 441L877 437V435L876.5 432L877 429L876.5 427L877 426L876.5 423.5L877 421.5L878.5 420.5L879.5 419L882 417L884.5 415.5L885.5 414.5L888.5 413L892 411.5L894.5 411H896.5L899.5 409H902L903.5 410L906 409H908.5H909.5L914 410L916 411.5L918.5 412.5H921.5L924 415L926 415.5L927 416.5L929 417L931 419V421.5L932.5 423.5V425.5L934 428.5L934.5 430.5L936 432.5L937 436L938 437.5L939 440L940.5 442.5V445.5L942 448L943 450.5L944 454.5Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth52Diagnozis.culttab &&
                !tooth52Diagnozis.abutment &&
                !tooth52Diagnozis.implant &&
                !tooth52Diagnozis.shaper
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
                d="M877,462c0.2,10.2,0.3,20.5,3.6,30.2c0.9,2.8,2.1,5.6,3.6,8.2c1.3,2.9,3.1,5.4,5.3,7.5
                                c1.7,1.6,3.7,2.9,5.8,3.8c3,0.4,6,0.7,9.1,0.8c-3.3-16.9-10.8-54.4-12.5-57c-1.6-2.4-9.8-9.4-14.3-13.1
                                C876.7,448.8,876.9,455.4,877,462z"
              />
              <path
                className={`
                                st8 target caries-left 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth52.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth52.seal_left ? `seal-fill ${teethDiagnozis.tooth52.seal_left_color}` : ''}
                            `}
                d="M877,462c0.2,10.2,0.3,20.5,3.6,30.2c0.9,2.8,2.1,5.6,3.6,8.2c1.3,2.9,3.1,5.4,5.3,7.5
                                c1.7,1.6,3.7,2.9,5.8,3.8c3,0.4,6,0.7,9.1,0.8c-3.3-16.9-10.8-54.4-12.5-57c-1.6-2.4-9.8-9.4-14.3-13.1
                                C876.7,448.8,876.9,455.4,877,462z"
                style={{
                  fill: teethDiagnozis.tooth52.caries_left
                    ? '#606c80'
                    : teethDiagnozis.tooth52.seal_left
                      ? teethDiagnozis.tooth52.seal_left_color
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
                d="M936.7,508.2c1.4-0.4,2.8-0.9,4.3-1.4l4.2-3.9c0.4-0.5,0.7-1,1-1.5c0.3-0.5,0.6-1.1,0.8-1.6
                                c0.5-1.3,0.8-2.7,1-4.1c0.2-1.4,0.4-2.8,0.5-4.2c0.7-8.5,0-17-1.6-25.4c-1.3-6.9-3.2-13.6-5.8-20.1c-1.3-3.4-2.8-6.6-4.5-9.7
                                c-2.9,5.1-7,12.6-7.7,15.5C928.1,455,933.8,490.4,936.7,508.2z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth52.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth52.seal_right ? `seal-fill ${teethDiagnozis.tooth52.seal_right_color}` : ''}
                            `}
                d="M936.7,508.2c1.4-0.4,2.8-0.9,4.3-1.4l4.2-3.9c0.4-0.5,0.7-1,1-1.5c0.3-0.5,0.6-1.1,0.8-1.6
                                c0.5-1.3,0.8-2.7,1-4.1c0.2-1.4,0.4-2.8,0.5-4.2c0.7-8.5,0-17-1.6-25.4c-1.3-6.9-3.2-13.6-5.8-20.1c-1.3-3.4-2.8-6.6-4.5-9.7
                                c-2.9,5.1-7,12.6-7.7,15.5C928.1,455,933.8,490.4,936.7,508.2z"
                style={{
                  fill: teethDiagnozis.tooth52.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth52.seal_right
                      ? teethDiagnozis.tooth52.seal_right_color
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
                d="M877.6,442.4c4.5,3.7,12.7,10.6,14.3,13.1c1.7,2.6,9.2,40.1,12.5,57c1.3,0,2.6,0.1,3.9,0.1
                                c6.8,0,13.5-0.8,20.1-2.2c2.8-0.6,5.5-1.3,8.2-2.1c-3-17.8-8.7-53.2-7.8-56.5c0.7-2.9,4.8-10.4,7.7-15.5c-2.5-4.5-5.4-8.6-9-12.1
                                c-4.2-4.2-9.2-7.3-14.6-9.2c-6.8-2.3-14.1-2.5-20.5,1c-6.7,3.6-11,10.5-13.3,18C878.5,436.7,877.9,439.5,877.6,442.4z"
              />
              <path
                className={`
                                st8 target caries-top 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth52.caries_top ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth52.seal_top ? `seal-fill ${teethDiagnozis.tooth52.seal_top_color}` : ''}
                            `}
                d="M877.6,442.4c4.5,3.7,12.7,10.6,14.3,13.1c1.7,2.6,9.2,40.1,12.5,57c1.3,0,2.6,0.1,3.9,0.1
                                c6.8,0,13.5-0.8,20.1-2.2c2.8-0.6,5.5-1.3,8.2-2.1c-3-17.8-8.7-53.2-7.8-56.5c0.7-2.9,4.8-10.4,7.7-15.5c-2.5-4.5-5.4-8.6-9-12.1
                                c-4.2-4.2-9.2-7.3-14.6-9.2c-6.8-2.3-14.1-2.5-20.5,1c-6.7,3.6-11,10.5-13.3,18C878.5,436.7,877.9,439.5,877.6,442.4z"
                style={{
                  fill: teethDiagnozis.tooth52.caries_top
                    ? '#606c80'
                    : teethDiagnozis.tooth52.seal_top
                      ? teethDiagnozis.tooth52.seal_top_color
                      : 'transparent',
                }}
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_left &&
                      !tooth52Diagnozis.seal_top &&
                      !tooth52Diagnozis.seal_center) ||
                    (!tooth52Diagnozis.seal_left && tooth52Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M895.5 468L903.5 507"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_left &&
                      !tooth52Diagnozis.seal_top) ||
                    (!tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_top &&
                      !tooth52Diagnozis.seal_center) ||
                    (!tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_top &&
                      tooth52Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M895.5 468C893 456 890.8 451.6 882 446"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_right &&
                      !tooth52Diagnozis.seal_top) ||
                    (!tooth52Diagnozis.seal_right &&
                      !tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_top &&
                      tooth52Diagnozis.seal_bottom) ||
                    (tooth52Diagnozis.seal_right &&
                      tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_center &&
                      !tooth52Diagnozis.seal_top) ||
                    (!tooth52Diagnozis.seal_center &&
                      !tooth52Diagnozis.seal_bottom &&
                      tooth52Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M929.5 463.5C928 453.5 926 448.6 934 441"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth52Diagnozis.seal_right &&
                      !tooth52Diagnozis.seal_top) ||
                    (!tooth52Diagnozis.seal_right &&
                      !tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_top &&
                      tooth52Diagnozis.seal_bottom) ||
                    (tooth52Diagnozis.seal_right &&
                      tooth52Diagnozis.seal_left &&
                      tooth52Diagnozis.seal_center &&
                      !tooth52Diagnozis.seal_top) ||
                    (!tooth52Diagnozis.seal_center &&
                      !tooth52Diagnozis.seal_bottom &&
                      tooth52Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M929.5 463.5L935.5 502.5"
              />
            </g>
          </g>
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth52Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth52Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth52Diagnozis.vinir_color}`}
                d="M946.9 466.1C945.6 459.2 943.7 452.5 941.1 446C939.8 442.6 938.3 439.4 936.6 436.3C934.1 431.8 931.2 427.7 927.6 424.2C923.4 420 918.4 416.9 913 415C906.2 412.7 898.9 412.5 892.5 416C885.8 419.6 881.5 426.5 879.2 434C878.4 436.8 877.8 439.6 877.4 442.5C876.6 449 876.8 455.5 876.9 462.1C877.1 472.3 877.2 482.6 880.5 492.3C881.4 495.1 882.6 497.9 884.1 500.5C885.4 503.4 887.2 505.9 889.4 508C891.1 509.6 893.1 510.9 895.2 511.8C898.2 512.2 901.2 512.5 904.3 
                                512.6C905.6 512.6 906.9 512.7 908.2 512.7C915 512.7 921.7 511.9 928.3 510.5C931.1 509.9 933.8 509.2 936.5 508.4C937.9 508 939.3 507.5 940.8 507L945 503.1C945.4 502.6 945.7 502.1 946 501.6C946.3 501.1 946.6 500.5 946.8 500C947.3 498.7 947.6 497.3 947.8 495.9C948 494.5 948.2 493.1 948.3 491.7C949.2 483 948.5 474.4 946.9 466.1Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth52Diagnozis.temporary_crown ||
                tooth52Diagnozis.ceramic_crown ||
                tooth52Diagnozis.mceramic_crown ||
                tooth52Diagnozis.metalic_crown ||
                tooth52Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth52Diagnozis.temporary_crown ||
                tooth52Diagnozis.ceramic_crown ||
                tooth52Diagnozis.mceramic_crown ||
                tooth52Diagnozis.metalic_crown ||
                tooth52Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth52Diagnozis.ceramic_crown_color}
                                ${tooth52Diagnozis.mceramic_crown_color}
                                ${tooth52Diagnozis.metalic_crown_color}
                                ${tooth52Diagnozis.zirconia_crown_color}
                            `}
              d="M946.9,466.1c-1.3-6.9-3.2-13.6-5.8-20.1c-1.3-3.4-2.8-6.6-4.5-9.7
                            c-2.5-4.5-5.4-8.6-9-12.1c-4.2-4.2-9.2-7.3-14.6-9.2c-6.8-2.3-14.1-2.5-20.5,1c-6.7,3.6-11,10.5-13.3,18c-0.8,2.8-1.4,5.6-1.8,8.5
                            c-0.8,6.5-0.6,13-0.5,19.6c0.2,10.2,0.3,20.5,3.6,30.2c0.9,2.8,2.1,5.6,3.6,8.2c1.3,2.9,3.1,5.4,5.3,7.5c1.7,1.6,3.7,2.9,5.8,3.8
                            c3,0.4,6,0.7,9.1,0.8c1.3,0,2.6,0.1,3.9,0.1c6.8,0,13.5-0.8,20.1-2.2c2.8-0.6,5.5-1.3,8.2-2.1c1.4-0.4,2.8-0.9,4.3-1.4l4.2-3.9
                            c0.4-0.5,0.7-1,1-1.5c0.3-0.5,0.6-1.1,0.8-1.6c0.5-1.3,0.8-2.7,1-4.1c0.2-1.4,0.4-2.8,0.5-4.2C949.2,483,948.5,474.4,946.9,466.1z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
