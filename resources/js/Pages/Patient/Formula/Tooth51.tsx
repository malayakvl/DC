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
import PeriodontitStage51 from './periodontit51';
import setupDiagnoze from '../../../lib/tfunctions';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth51() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth51Diagnozis = teethDiagnozis.tooth51;
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
        teethDiagnozis.tooth51.caries_bottom =
          !teethDiagnozis.tooth51.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth51.caries_center =
          !teethDiagnozis.tooth51.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth51.caries_left =
          !teethDiagnozis.tooth51.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth51.caries_right =
          !teethDiagnozis.tooth51.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth51.caries_top = !teethDiagnozis.tooth51.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth51.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth51.seal_center_color = sealColor1;
          teethDiagnozis.tooth51.seal_center = true;
        } else if (
          teethDiagnozis.tooth51.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth51.seal_center_color = sealColor2;
          teethDiagnozis.tooth51.seal_center = true;
        } else if (
          teethDiagnozis.tooth51.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth51.seal_center_color = sealColor3;
          teethDiagnozis.tooth51.seal_center = true;
        } else {
          teethDiagnozis.tooth51.seal_center =
            !teethDiagnozis.tooth51.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth51.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth51.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth51.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth51.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth51.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth51.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth51.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth51.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth51.seal_bottom = true;
        } else {
          teethDiagnozis.tooth51.seal_bottom =
            !teethDiagnozis.tooth51.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth51.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth51.seal_left_color = sealColor1;
          teethDiagnozis.tooth51.seal_left = true;
        } else if (
          teethDiagnozis.tooth51.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth51.seal_left_color = sealColor2;
          teethDiagnozis.tooth51.seal_left = true;
        } else if (
          teethDiagnozis.tooth51.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth51.seal_left_color = sealColor3;
          teethDiagnozis.tooth51.seal_left = true;
        } else {
          teethDiagnozis.tooth51.seal_left = !teethDiagnozis.tooth51.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth51.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth51.seal_right_color = sealColor1;
          teethDiagnozis.tooth51.seal_right = true;
        } else if (
          teethDiagnozis.tooth51.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth51.seal_right_color = sealColor2;
          teethDiagnozis.tooth51.seal_right = true;
        } else if (
          teethDiagnozis.tooth51.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth51.seal_right_color = sealColor3;
          teethDiagnozis.tooth51.seal_right = true;
        } else {
          teethDiagnozis.tooth51.seal_right =
            !teethDiagnozis.tooth51.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth51.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth51.seal_top_color = sealColor1;
          teethDiagnozis.tooth51.seal_top = true;
        } else if (
          teethDiagnozis.tooth51.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth51.seal_top_color = sealColor2;
          teethDiagnozis.tooth51.seal_top = true;
        } else if (
          teethDiagnozis.tooth51.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth51.seal_top_color = sealColor3;
          teethDiagnozis.tooth51.seal_top = true;
        } else {
          teethDiagnozis.tooth51.seal_top = !teethDiagnozis.tooth51.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth51.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth51.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth51.wedge_shaped_defect_color =
          !teethDiagnozis.tooth51.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth51.show &&
        !teethDiagnozis.tooth11.show
      ) {
        document.getElementById('TH-51').classList.add('f-tooth-active');
        document.getElementById('TH-51').style.opacity = '1';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth51.show &&
        teethDiagnozis.tooth11.show
      ) {
        document.getElementById('TH-51').classList.add('f-tooth-active');
        document.getElementById('TH-11').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-51').classList.remove('f-tooth-active');
        document.getElementById('TH-11').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth51.show &&
        !teethDiagnozis.tooth11.show
      ) {
        document.getElementById('TH-51').classList.remove('f-tooth-active');
        document.getElementById('TH-51').style.opacity = '0';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth51.show &&
        teethDiagnozis.tooth11.show
      ) {
        document.getElementById('TH-51').classList.remove('f-tooth-active');
        document.getElementById('TH-11').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth11.show) {
        document.getElementById('TH-51').classList.add('f-tooth-active');
        document.getElementById('TH-11').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth51.show) {
        document.getElementById('TH-51').classList.remove('f-tooth-active');
        document.getElementById('TH-11').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth11.show) {
        document.getElementById('TH-11').classList.add('f-tooth-active');
        document.getElementById('TH-51').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="51"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 980 716)"
          className={`st3 st4 st5 ${selectedTooth === 51 ? 'num-active' : ''}`}
        >
          51
        </text>
      </g>
      <g
        id="TH-51"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth51.show || allTeeth) && !teethDiagnozis.tooth51.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth51.show = !teethDiagnozis.tooth51.show;
            teethDiagnozis.tooth11.show = false;
          }

          dispatch(setSelectedToothNumber(51));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              51,
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
          className={`underlay ${selectedTooth === 51 ? 'selected' : ''}`}
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
            d="M958,255.9c-0.3,1.2-0.6,2.3-0.9,3.4c-3.8,13.5-6,27.6-7.1,41.6
                        c-2,25-4,63-1,88s0.9,90.4-0.2,101.7c-1.8,17.3,8.2,36.3,10.2,50.3s-11.2,31.5-9.1,53.7c2.1,22.3,7.1,89.3,11.1,108.3s16,38,45,36
                        c21-1.4,32-23,35-41s9-92,8-104s-13-29-12-40s11-17,12-50s-3-71-6-91s-15-83-18-98c-5-24.9-12.1-50-20.1-74
                        c-4.2-12.6-17.2-22.4-30.5-14.7C964.4,232,960.9,245.1,958,255.9z"
          />
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 24, 17)',
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
                  !tooth51Diagnozis.culttab &&
                  !tooth51Diagnozis.implant &&
                  !tooth51Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st24"
                d="M960.3,597.9c-2-5.8,4.6-9.9,13.4-11.6c9.3-1.8,20-1.4,30.7-1.1c8.9,0.3,17.8,0.7,25,3.2
                            c3.9,1.4,7.1,3.3,8.3,6.3c2.2,5.4-3.6,10.2-8.8,14.5c-2.4,2-4.7,4.1-6.7,6.4c-3.5,4.1-5.9,9.1-11.2,12.5c-3.2,2-7.1,3.3-11.4,3.4
                            c-5,0.2-9.9-1.2-13.7-3.6c-5.6-3.5-8.3-8.5-10.5-13.3c-1.3-2.8-2.5-5.6-5.1-8C967.1,603.7,961.6,601.7,960.3,597.9z"
              ></path>
            </g>
            <g
              style={{
                visibility:
                  tooth51Diagnozis?.apex || tooth51Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth51Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth51Diagnozis?.apex ? 'apex' : ''}`}
                d="M961.349 595.139C959.407 587.917 965.818 582.811 974.366 580.695C983.4 578.453 993.794 578.951 1004.19 579.325C1012.83 579.698 1021.48 580.197 1028.47 583.309C1032.26 585.053 1035.37 587.419 1036.53 591.154C1038.67 597.878 1033.04 603.855 1027.99 609.209C1025.66 611.699 1023.42 614.314 1021.48 617.178C1018.08 622.283 1015.75 628.509 1010.6 632.743C1007.49 635.233 1003.7 636.852 999.525 636.976C994.668 637.226 989.908 635.482 986.217 632.494C980.777 628.136 978.154 621.91 976.017 615.933C974.755 612.447 973.589 608.96 971.063 605.972C967.955 602.361 962.612 599.87 961.349 595.139Z"
              ></path>
            </g>
          </g>
          <g
            className="pulp"
            style={{ visibility: tooth51Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth51Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                style={{ fill: '#e80808' }}
                d="M989.706 604.016C989.801 605.739 991.258 606.641 993.868 608.969C995.774 610.67 996.42 612.996 998.833 613.014C1001.43 613.033 1002.11 610.273 1003.77 608.421C1005.76 606.198 1007.5 605.623 1007.39 603.47C1007.27 601.317 1003.87 600.785 998.154 600.743C992.438 600.701 989.575 601.65 989.706 604.016Z"
              />
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth51Diagnozis.implant || tooth51Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="998.5" cy="604.5" r="23.5"></circle>
            <g className="st27">
              <mask id="implant_51" className="st49">
                <path
                  className="st50"
                  d="M986.388 590.223L983.317 589.223C980.707 591.85 978.766 595.141 977.769 598.821L980.172 600.981C979.957 602.121 979.844 603.298 979.844 604.5C979.844 605.703 979.957 606.88 980.172 608.02L977.769 610.18C978.766 613.86 980.708 617.151 983.318 619.778L986.388 618.778C988.162 620.307 990.223 621.512 992.48 622.299L993.149 625.458C994.918 625.925 996.775 626.173 998.69 626.173C1000.61 626.173 1002.46 625.925 1004.23 625.458L1004.9 622.298C1007.16 621.511 1009.22 620.306 1010.99 618.777L1014.06 619.777C1016.67 617.151 1018.62 613.859 1019.61 610.179L1017.21 608.018C1017.42 606.878 1017.54 605.702 1017.54 604.5C1017.54 603.298 1017.42 602.123 1017.21 600.983L1019.61 598.822C1018.62 595.142 1016.67 591.85 1014.06 589.224L1010.99 590.224C1009.22 588.694 1007.16 587.49 1004.9 586.702L1004.23 583.543C1002.46 583.076 1000.61 582.827 998.69 582.827C996.775 582.827 994.918 583.076 993.149 583.542L992.48 586.701C990.223 587.489 988.161 588.694 986.388 590.223Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M986.388 590.223L983.317 589.223C980.707 591.85 978.766 595.141 977.769 598.821L980.172 600.981C979.957 602.121 979.844 603.298 979.844 604.5C979.844 605.703 979.957 606.88 980.172 608.02L977.769 610.18C978.766 613.86 980.708 617.151 983.318 619.778L986.388 618.778C988.162 620.307 990.223 621.512 992.48 622.299L993.149 625.458C994.918 625.925 996.775 626.173 998.69 626.173C1000.61 626.173 1002.46 625.925 1004.23 625.458L1004.9 622.298C1007.16 621.511 1009.22 620.306 1010.99 618.777L1014.06 619.777C1016.67 617.151 1018.62 613.859 1019.61 610.179L1017.21 608.018C1017.42 606.878 1017.54 605.702 1017.54 604.5C1017.54 603.298 1017.42 602.123 1017.21 600.983L1019.61 598.822C1018.62 595.142 1016.67 591.85 1014.06 589.224L1010.99 590.224C1009.22 588.694 1007.16 587.49 1004.9 586.702L1004.23 583.543C1002.46 583.076 1000.61 582.827 998.69 582.827C996.775 582.827 994.918 583.076 993.149 583.542L992.48 586.701C990.223 587.489 988.161 588.694 986.388 590.223Z"
              ></path>
              <path
                className="st52"
                d="M983.317 589.223L983.936 587.322L982.766 586.941L981.899 587.814L983.317 589.223ZM986.388 590.223L985.769 592.125L986.84 592.474L987.694 591.738L986.388 590.223ZM977.769 598.821L975.839 598.298L975.517 599.485L976.432 600.308L977.769 598.821ZM980.172 600.981L982.137 601.353L982.346 600.247L981.51 599.494L980.172 600.981ZM980.172 608.02L981.51 609.507L982.346 608.754L982.138 607.648L980.172 608.02ZM977.769 610.18L976.432 608.693L975.517 609.516L975.839 610.703L977.769 610.18ZM983.318 619.778L981.899 621.188L982.767 622.06L983.937 621.679L983.318 619.778ZM986.388 618.778L987.694 617.263L986.841 616.527L985.769 616.876L986.388 618.778ZM992.48 622.299L994.436 621.885L994.203 620.782L993.139 620.411L992.48 622.299ZM993.149 625.458L991.193 625.873L991.448 627.078L992.639 627.392L993.149 625.458ZM1004.23 625.458L1004.74 627.392L1005.94 627.078L1006.19 625.872L1004.23 625.458ZM1004.9 622.298L1004.24 620.41L1003.18 620.781L1002.95 621.884L1004.9 622.298ZM1010.99 618.777L1011.61 616.876L1010.54 616.527L1009.69 617.263L1010.99 618.777ZM1014.06 619.777L1013.44 621.679L1014.61 622.06L1015.48 621.187L1014.06 619.777ZM1019.61 610.179L1021.54 610.702L1021.86 609.514L1020.95 608.692L1019.61 610.179ZM1017.21 608.018L1015.24 607.647L1015.03 608.753L1015.87 609.505L1017.21 608.018ZM1017.21 600.983L1015.87 599.496L1015.03 600.248L1015.24 601.354L1017.21 600.983ZM1019.61 598.822L1020.95 600.309L1021.86 599.487L1021.54 598.299L1019.61 598.822ZM1014.06 589.224L1015.48 587.814L1014.62 586.941L1013.44 587.322L1014.06 589.224ZM1010.99 590.224L1009.69 591.738L1010.54 592.474L1011.61 592.125L1010.99 590.224ZM1004.9 586.702L1002.95 587.117L1003.18 588.219L1004.24 588.591L1004.9 586.702ZM1004.23 583.543L1006.19 583.128L1005.94 581.923L1004.74 581.609L1004.23 583.543ZM993.149 583.542L992.639 581.608L991.448 581.922L991.193 583.127L993.149 583.542ZM992.48 586.701L993.139 588.59L994.203 588.219L994.436 587.116L992.48 586.701ZM982.698 591.125L985.769 592.125L987.007 588.321L983.936 587.322L982.698 591.125ZM979.7 599.343C980.603 596.007 982.365 593.019 984.736 590.633L981.899 587.814C979.05 590.68 976.928 594.275 975.839 598.298L979.7 599.343ZM981.51 599.494L979.107 597.333L976.432 600.308L978.835 602.469L981.51 599.494ZM981.844 604.5C981.844 603.423 981.945 602.371 982.137 601.353L978.207 600.61C977.969 601.872 977.844 603.173 977.844 604.5H981.844ZM982.138 607.648C981.945 606.63 981.844 605.578 981.844 604.5H977.844C977.844 605.828 977.969 607.129 978.207 608.391L982.138 607.648ZM979.107 611.668L981.51 609.507L978.835 606.533L976.432 608.693L979.107 611.668ZM984.736 618.368C982.365 615.982 980.604 612.994 979.7 609.658L975.839 610.703C976.929 614.726 979.05 618.321 981.899 621.188L984.736 618.368ZM985.769 616.876L982.698 617.876L983.937 621.679L987.008 620.68L985.769 616.876ZM993.139 620.411C991.123 619.708 989.281 618.631 987.694 617.263L985.082 620.292C987.042 621.983 989.322 623.316 991.821 624.187L993.139 620.411ZM995.106 625.044L994.436 621.885L990.523 622.714L991.193 625.873L995.106 625.044ZM998.69 624.173C996.949 624.173 995.263 623.947 993.659 623.525L992.639 627.392C994.573 627.902 996.602 628.173 998.69 628.173V624.173ZM1003.72 623.524C1002.12 623.947 1000.43 624.173 998.69 624.173V628.173C1000.78 628.173 1002.81 627.902 1004.74 627.392L1003.72 623.524ZM1002.95 621.884L1002.28 625.043L1006.19 625.872L1006.86 622.713L1002.95 621.884ZM1009.69 617.263C1008.1 618.631 1006.26 619.707 1004.24 620.41L1005.56 624.187C1008.06 623.315 1010.34 621.982 1012.3 620.292L1009.69 617.263ZM1014.68 617.875L1011.61 616.876L1010.37 620.679L1013.44 621.679L1014.68 617.875ZM1017.68 609.656C1016.78 612.993 1015.02 615.981 1012.65 618.367L1015.48 621.187C1018.33 618.32 1020.45 614.725 1021.54 610.702L1017.68 609.656ZM1015.87 609.505L1018.27 611.666L1020.95 608.692L1018.55 606.531L1015.87 609.505ZM1015.54 604.5C1015.54 605.577 1015.44 606.629 1015.24 607.647L1019.17 608.389C1019.41 607.128 1019.54 605.828 1019.54 604.5H1015.54ZM1015.24 601.354C1015.44 602.372 1015.54 603.423 1015.54 604.5H1019.54C1019.54 603.173 1019.41 601.873 1019.17 600.612L1015.24 601.354ZM1018.27 597.335L1015.87 599.496L1018.55 602.47L1020.95 600.309L1018.27 597.335ZM1012.65 590.634C1015.02 593.02 1016.78 596.008 1017.68 599.345L1021.54 598.299C1020.45 594.276 1018.33 590.681 1015.48 587.814L1012.65 590.634ZM1011.61 592.125L1014.68 591.126L1013.44 587.322L1010.37 588.322L1011.61 592.125ZM1004.24 588.591C1006.26 589.294 1008.1 590.37 1009.69 591.738L1012.3 588.709C1010.34 587.019 1008.06 585.686 1005.56 584.814L1004.24 588.591ZM1002.28 583.957L1002.95 587.117L1006.86 586.288L1006.19 583.128L1002.28 583.957ZM998.69 584.827C1000.43 584.827 1002.12 585.053 1003.72 585.476L1004.74 581.609C1002.81 581.098 1000.78 580.827 998.69 580.827V584.827ZM993.659 585.476C995.263 585.053 996.949 584.827 998.69 584.827V580.827C996.602 580.827 994.573 581.098 992.639 581.608L993.659 585.476ZM994.436 587.116L995.106 583.957L991.193 583.127L990.523 586.287L994.436 587.116ZM987.694 591.738C989.281 590.369 991.123 589.293 993.139 588.59L991.821 584.813C989.322 585.685 987.042 587.018 985.082 588.709L987.694 591.738Z"
                mask="url(#implant_51)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <circle
              className="st44"
              cx="998.535"
              cy="604.535"
              r="25.535"
            ></circle>
            <path
              className="st45"
              d="M996.577 595.739C997.129 593.804 999.871 593.804 1000.42 595.739L1000.93 597.511C1001.23 598.549 1002.29 599.164 1003.34 598.902L1005.13 598.454C1007.08 597.965 1008.45 600.339 1007.05 601.785L1005.77 603.109C1005.02 603.884 1005.02 605.116 1005.77 605.891L1007.05 607.215C1008.45 608.661 1007.08 611.035 1005.13 610.546L1003.34 610.098C1002.29 609.836 1001.23 610.451 1000.93 611.489L1000.42 613.261C999.871 615.196 997.129 615.196 996.577 613.261L996.071 611.489C995.775 610.451 994.709 609.836 993.662 610.098L991.874 610.546C989.923 611.035 988.552 608.661 989.951 607.215L991.233 605.891C991.984 605.116 991.984 603.884 991.233 603.109L989.951 601.785C988.552 600.339 989.923 597.965 991.874 598.454L993.662 598.902C994.709 599.164 995.775 598.549 996.071 597.511L996.577 595.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth51Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth51Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M961.349 595.139C959.407 587.917 965.818 582.811 974.366 580.695C983.4 578.453 993.794 578.951 1004.19 579.325C1012.83 579.698 1021.48 580.197 1028.47 583.309C1032.26 585.053 1035.37 587.419 1036.53 591.154C1038.67 597.878 1033.04 603.855 1027.99 609.209C1025.66 611.699 1023.42 614.314 1021.48 617.178C1018.08 622.283 1015.75 628.509 1010.6 632.743C1007.49 635.233 1003.7 636.852 999.525 636.976C994.668 637.226 989.908 635.482 986.217 632.494C980.777 628.136 978.154 621.91 976.017 615.933C974.755 612.447 973.589 608.96 971.063 605.972C967.955 602.361 962.612 599.87 961.349 595.139Z"
            ></path>
            <path
              className="st47"
              d="M971.257 598.243C969.826 592.764 974.55 588.891 980.849 587.286C987.505 585.585 995.164 585.963 1002.82 586.246C1009.19 586.53 1015.56 586.908 1020.72 589.269C1023.51 590.592 1025.8 592.386 1026.66 595.22C1028.23 600.321 1024.08 604.855 1020.36 608.917C1018.64 610.806 1016.99 612.79 1015.56 614.963C1013.06 618.836 1011.34 623.559 1007.55 626.77C1005.26 628.66 1002.46 629.888 999.387 629.982C995.808 630.171 992.301 628.849 989.581 626.582C985.573 623.275 983.64 618.552 982.065 614.018C981.135 611.373 980.276 608.728 978.415 606.461C976.125 603.722 972.188 601.833 971.257 598.243Z"
            ></path>
            <circle className="st45" cx="998" cy="605" r="13"></circle>
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth51Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M961.349 595.139C959.406 587.917 965.817 582.811 974.365 580.695C983.399 578.453 993.793 578.951 1004.19 579.325C1012.83 579.698 1021.48 580.197 1028.47 583.309C1032.26 585.053 1035.37 587.419 1036.53 591.154C1038.67 597.878 1033.04 603.855 1027.99 609.209C1025.65 611.699 1023.42 614.314 1021.48 617.178C1018.08 622.283 1015.75 628.509 1010.6 632.743C1007.49 635.233 1003.7 636.852 999.524 636.976C994.667 637.226 989.908 635.482 986.216 632.494C980.777 628.136 978.154 621.91 976.017 615.933C974.754 612.447 973.588 608.96 971.063 605.972C967.954 602.361 962.612 599.87 961.349 595.139Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M971.257 598.243C969.825 592.764 974.549 588.891 980.848 587.286C987.505 585.585 995.163 585.963 1002.82 586.246C1009.19 586.53 1015.56 586.908 1020.72 589.269C1023.51 590.592 1025.8 592.386 1026.66 595.22C1028.23 600.321 1024.08 604.855 1020.36 608.917C1018.64 610.806 1016.99 612.79 1015.56 614.963C1013.06 618.836 1011.34 623.559 1007.55 626.77C1005.26 628.66 1002.46 629.888 999.386 629.982C995.807 630.171 992.3 628.849 989.58 626.582C985.572 623.275 983.64 618.552 982.065 614.018C981.134 611.373 980.275 608.728 978.415 606.461C976.124 603.722 972.187 601.833 971.257 598.243Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle
              className="st57"
              id="Ellipse_48"
              cx="998"
              cy="605"
              r="12.25"
              style={{ fill: 'black', opacity: tooth51Diagnozis.pin ? 1 : 0 }}
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth51Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth51Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M961.349 595.139C959.407 587.917 965.818 582.811 974.366 580.695C983.4 578.453 993.794 578.951 1004.19 579.325C1012.83 579.698 1021.48 580.197 1028.47 583.309C1032.26 585.053 1035.37 587.419 1036.53 591.154C1038.67 597.878 1033.04 603.855 1027.99 609.209C1025.66 611.699 1023.42 614.314 1021.48 617.178C1018.08 622.283 1015.75 628.509 1010.6 632.743C1007.49 635.233 1003.7 636.852 999.525 636.976C994.668 637.226 989.908 635.482 986.217 632.494C980.777 628.136 978.154 621.91 976.017 615.933C974.755 612.447 973.589 608.96 971.063 605.972C967.955 602.361 962.612 599.87 961.349 595.139Z"
            ></path>
            <path
              className="st47"
              d="M971.257 598.243C969.826 592.764 974.55 588.891 980.849 587.286C987.505 585.585 995.164 585.963 1002.82 586.246C1009.19 586.53 1015.56 586.908 1020.72 589.269C1023.51 590.592 1025.8 592.386 1026.66 595.22C1028.23 600.321 1024.08 604.855 1020.36 608.917C1018.64 610.806 1016.99 612.79 1015.56 614.963C1013.06 618.836 1011.34 623.559 1007.55 626.77C1005.26 628.66 1002.46 629.888 999.387 629.982C995.808 630.171 992.301 628.849 989.581 626.582C985.573 623.275 983.64 618.552 982.065 614.018C981.135 611.373 980.276 608.728 978.415 606.461C976.125 603.722 972.188 601.833 971.257 598.243Z"
            ></path>
          </g>
          <g
            className="hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth51Diagnozis.culttab &&
                !tooth51Diagnozis.abutment &&
                !tooth51Diagnozis.implant &&
                !tooth51Diagnozis.apex &&
                !tooth51Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1048.2,588.7c-1.5-4.5-5.6-7.5-10.6-9.6c-0.2-0.1-0.3-0.1-0.5-0.2
                        c-9.1-3.7-20.2-4.3-31.3-4.8c-13.6-0.6-27.2-1.1-39,1.6c-5.4,1.2-10.1,3.3-13.3,6.1c-3.4,3.1-5.1,6.9-3.8,11.6
                        c1.7,5.9,8.6,8.9,12.9,13.6c3.3,3.5,4.8,7.9,6.5,12.2c0.4,1,0.8,2,1.2,2.9c2.6,6.4,6,12.8,12.1,17.4c4.8,3.6,11,5.8,17.4,5.5
                        c5.4-0.2,10.4-2.2,14.4-5.3c5.7-4.4,8.8-10.5,12.3-16.1c0.6-1,1.3-2,2-2.9c2.5-3.5,5.4-6.7,8.5-9.8
                        C1043.7,604.3,1051,597.1,1048.2,588.7z"
            ></path>
          </g>
          {/*TARTAR*/}
          <g
            className="tartar hImplant hEmpty"
            style={{
              opacity: teethDiagnozis.tooth51.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M1038.55 575.947C1043.51 578.345 1046.46 581.599 1047.98 586.737C1049.27 590.99 1049.54 596.253 1047.58 600.088C1045.29 604.592 1040.36 607.592 1036.78 611.569C1033.73 614.994 1033.06 618.591 1030.52 622.53C1028.14 626.281 1025.02 630.473 1022.67 634.451C1020.61 637.919 1017.14 642.452 1014 645.164C1011.96 646.872 1009.71 647.055 1007.28 648.061C1004.84 649.072 1002.23 650.901 999.485 650.987C996.03 651.173 992.614 649.324 989.438 648.061C986.762 646.995 983.126 646.701 980.914 644.822C977.115 641.628 974.365 636.478 972.201 632.266C970.303 628.573 968.856 624.657 967.548 620.817C965.893 616.022 964.365 613.681 961.056 609.571C958.895 607.017 957.16 603.643 954.659 601.275C952.297 599.039 950.262 595.378 949.458 592.217C948.633 588.999 948.957 586.086 950.154 583.52C951.391 580.866 953.56 577.356 956.356 575.488C959.202 573.587 962.696 573.344 966.515 572.351C970.962 571.193 975.66 569.339 980.515 569.036C984.629 568.779 988.856 569.981 993.138 570.06C997.256 570.137 1001.43 569.083 1005.59 569.24C1009.39 569.412 1013.19 569.604 1016.9 569.943C1020.81 570.3 1024.62 572.048 1028.25 572.882C1031.48 573.622 1035.68 574.609 1038.55 575.947ZM974.366 580.695C965.818 582.811 959.407 587.917 961.349 595.139C962.612 599.87 967.858 602.361 971.063 605.972C973.589 608.96 974.754 612.447 976.017 615.933C978.154 621.91 980.777 628.136 986.217 632.494C989.908 635.482 994.668 637.226 999.525 636.976C1003.7 636.852 1007.49 635.233 1010.6 632.743C1015.75 628.509 1018.08 622.283 1021.48 617.178C1023.42 614.314 1025.66 611.699 1027.99 609.209C1033.04 603.855 1038.67 597.878 1036.53 591.154C1035.37 587.419 1032.26 585.053 1028.47 583.309C1021.48 580.197 1012.83 579.698 1004.19 579.325C993.794 578.951 983.4 578.453 974.366 580.695Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M1038.55 575.947C1043.51 578.345 1046.46 581.599 1047.98 586.737C1049.27 590.99 1049.54 596.253 1047.58 600.088C1045.29 604.592 1040.36 607.592 1036.78 611.569C1033.73 614.994 1033.06 618.591 1030.52 622.53C1028.14 626.281 1025.02 630.473 1022.67 634.451C1020.61 637.919 1017.14 642.452 1014 645.164C1011.96 646.872 1009.71 647.055 1007.28 648.061C1004.84 649.072 1002.23 650.901 999.485 650.987C996.03 651.173 992.614 649.324 989.438 648.061C986.762 646.995 983.126 646.701 980.914 644.822C977.115 641.628 974.365 636.478 972.201 632.266C970.303 628.573 968.856 624.657 967.548 620.817C965.893 616.022 964.365 613.681 961.056 609.571C958.895 607.017 957.16 603.643 954.659 601.275C952.297 599.039 950.262 595.378 949.458 592.217C948.633 588.999 948.957 586.086 950.154 583.52C951.391 580.866 953.56 577.356 956.356 575.488C959.202 573.587 962.696 573.344 966.515 572.351C970.962 571.193 975.66 569.339 980.515 569.036C984.629 568.779 988.856 569.981 993.138 570.06C997.256 570.137 1001.43 569.083 1005.59 569.24C1009.39 569.412 1013.19 569.604 1016.9 569.943C1020.81 570.3 1024.62 572.048 1028.25 572.882C1031.48 573.622 1035.68 574.609 1038.55 575.947ZM974.366 580.695C965.818 582.811 959.407 587.917 961.349 595.139C962.612 599.87 967.858 602.361 971.063 605.972C973.589 608.96 974.754 612.447 976.017 615.933C978.154 621.91 980.777 628.136 986.217 632.494C989.908 635.482 994.668 637.226 999.525 636.976C1003.7 636.852 1007.49 635.233 1010.6 632.743C1015.75 628.509 1018.08 622.283 1021.48 617.178C1023.42 614.314 1025.66 611.699 1027.99 609.209C1033.04 603.855 1038.67 597.878 1036.53 591.154C1035.37 587.419 1032.26 585.053 1028.47 583.309C1021.48 580.197 1012.83 579.698 1004.19 579.325C993.794 578.951 983.4 578.453 974.366 580.695Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M1034.13 580.829C1038.51 582.783 1041.11 585.434 1042.46 589.62C1043.6 593.086 1043.83 597.374 1042.11 600.499C1040.08 604.169 1035.72 606.614 1032.56 609.854C1029.86 612.645 1029.28 615.576 1027.03 618.785C1024.92 621.842 1022.17 625.257 1020.09 628.499C1018.28 631.325 1015.21 635.019 1012.43 637.228C1010.64 638.62 1008.65 638.769 1006.5 639.588C1004.34 640.412 1002.03 641.903 999.608 641.973C996.556 642.124 993.537 640.618 990.731 639.588C988.367 638.721 985.153 638.481 983.199 636.949C979.843 634.347 977.413 630.15 975.5 626.718C973.824 623.709 972.545 620.519 971.389 617.39C969.927 613.482 968.577 611.575 965.653 608.226C963.744 606.145 962.21 603.396 960 601.467C957.913 599.644 956.115 596.661 955.405 594.086C954.676 591.464 954.963 589.09 956.02 586.999C957.113 584.837 959.03 581.976 961.5 580.454C964.015 578.906 967.102 578.707 970.477 577.898C974.406 576.955 978.557 575.445 982.847 575.197C986.482 574.988 990.217 575.967 994 576.032C997.639 576.094 1001.32 575.235 1005.01 575.363C1008.36 575.504 1011.72 575.66 1015 575.936C1018.45 576.227 1021.82 577.651 1025.03 578.331C1027.88 578.934 1031.59 579.738 1034.13 580.829ZM974.366 580.694C965.818 582.811 959.407 587.916 961.35 595.138C962.613 599.87 967.858 602.36 971.064 605.971C973.589 608.959 974.755 612.446 976.018 615.932C978.155 621.909 980.778 628.135 986.217 632.493C989.909 635.482 994.668 637.225 999.525 636.976C1003.7 636.851 1007.49 635.233 1010.6 632.742C1015.75 628.509 1018.08 622.283 1021.48 617.177C1023.42 614.314 1025.66 611.699 1027.99 609.208C1033.04 603.854 1038.67 597.877 1036.54 591.153C1035.37 587.418 1032.26 585.052 1028.47 583.309C1021.48 580.196 1012.83 579.698 1004.19 579.324C993.794 578.951 983.4 578.453 974.366 580.694Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth51Diagnozis.culttab &&
                !tooth51Diagnozis.abutment &&
                !tooth51Diagnozis.implant &&
                !tooth51Diagnozis.shaper &&
                !tooth51Diagnozis.apex
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
                d="M949.8,593.5c1.7,5.9,8.6,8.9,12.9,13.6c3.3,3.5,4.8,7.9,6.5,12.2c0.4,1,0.8,2,1.2,2.9
                                c2.8-3.9,7.4-10.8,8.2-14.5c0.2-0.9,0.2-1.8,0-2.6c-0.8-4.1-5.4-7.3-9.1-10.5c-3.3-2.8-11.7-9.4-15.8-12.7
                                C950.1,585,948.5,588.9,949.8,593.5z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth51.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth51.seal_left ? `seal-fill ${teethDiagnozis.tooth51.seal_left_color}` : ''}
                                `}
                d="M949.8,593.5c1.7,5.9,8.6,8.9,12.9,13.6c3.3,3.5,4.8,7.9,6.5,12.2c0.4,1,0.8,2,1.2,2.9
                                c2.8-3.9,7.4-10.8,8.2-14.5c0.2-0.9,0.2-1.8,0-2.6c-0.8-4.1-5.4-7.3-9.1-10.5c-3.3-2.8-11.7-9.4-15.8-12.7
                                C950.1,585,948.5,588.9,949.8,593.5z"
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
                d="M970.3,622.2c2.6,6.4,6,12.8,12.1,17.4c4.8,3.6,11,5.8,17.4,5.5c5.4-0.2,10.4-2.2,14.4-5.3
                                c5.7-4.4,8.8-10.5,12.3-16.1c-3.8-4.6-10.1-12.6-11.5-17.2c-4.9-0.4-16.5-1.3-20.5-1.3h-16.2c0.2,0.8,0.2,1.7,0,2.6
                                C977.7,611.4,973.1,618.3,970.3,622.2z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth51.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth51.seal_bottom ? `seal-fill ${teethDiagnozis.tooth51.seal_bottom_color}` : ''}
                                `}
                d="M970.3,622.2c2.6,6.4,6,12.8,12.1,17.4c4.8,3.6,11,5.8,17.4,5.5c5.4-0.2,10.4-2.2,14.4-5.3
                                c5.7-4.4,8.8-10.5,12.3-16.1c-3.8-4.6-10.1-12.6-11.5-17.2c-4.9-0.4-16.5-1.3-20.5-1.3h-16.2c0.2,0.8,0.2,1.7,0,2.6
                                C977.7,611.4,973.1,618.3,970.3,622.2z"
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
                d="M1014.8,604.8c0,0.5,0.1,1,0.3,1.7c1.4,4.6,7.7,12.6,11.5,17.2c0.6-1,1.3-2,2-2.9c2.5-3.5,5.4-6.7,8.5-9.8
                                c6.6-6.6,14-13.9,11.2-22.2c-1.5-4.5-5.6-7.5-10.6-9.6c-0.2-0.1-0.3-0.1-0.5-0.2c-3.4,2.3-8.6,6.2-13.1,10.8
                                C1016.8,597.3,1014.9,601.3,1014.8,604.8z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth51.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth51.seal_right ? `seal-fill ${teethDiagnozis.tooth51.seal_right_color}` : ''}
                                `}
                d="M1014.8,604.8c0,0.5,0.1,1,0.3,1.7c1.4,4.6,7.7,12.6,11.5,17.2c0.6-1,1.3-2,2-2.9c2.5-3.5,5.4-6.7,8.5-9.8
                                c6.6-6.6,14-13.9,11.2-22.2c-1.5-4.5-5.6-7.5-10.6-9.6c-0.2-0.1-0.3-0.1-0.5-0.2c-3.4,2.3-8.6,6.2-13.1,10.8
                                C1016.8,597.3,1014.9,601.3,1014.8,604.8z"
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
                d="M953.6,581.9c4.2,3.3,12.6,9.9,15.8,12.7c3.7,3.2,8.2,6.4,9.1,10.5h16.2c4,0,15.5,0.9,20.5,1.3
                                c-0.2-0.6-0.3-1.2-0.3-1.7c0-3.5,2-7.5,9.3-15c4.5-4.6,9.7-8.5,13.1-10.8c-9.1-3.7-20.2-4.3-31.3-4.8c-13.6-0.6-27.2-1.1-39,1.6
                                C961.5,577.1,956.8,579.1,953.6,581.9z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth51.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth51.seal_top ? `seal-fill ${teethDiagnozis.tooth51.seal_top_color}` : ''}
                                `}
                d="M953.6,581.9c4.2,3.3,12.6,9.9,15.8,12.7c3.7,3.2,8.2,6.4,9.1,10.5h16.2c4,0,15.5,0.9,20.5,1.3
                                c-0.2-0.6-0.3-1.2-0.3-1.7c0-3.5,2-7.5,9.3-15c4.5-4.6,9.7-8.5,13.1-10.8c-9.1-3.7-20.2-4.3-31.3-4.8c-13.6-0.6-27.2-1.1-39,1.6
                                C961.5,577.1,956.8,579.1,953.6,581.9z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_left &&
                      !tooth51Diagnozis.seal_bottom &&
                      !tooth51Diagnozis.seal_center) ||
                    (tooth51Diagnozis.seal_left &&
                      !tooth51Diagnozis.seal_bottom &&
                      !tooth51Diagnozis.seal_center) ||
                    (!tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M978.5 604.999C978.333 607.166 977.1 612.699 973.5 617.499"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_left &&
                      !tooth51Diagnozis.seal_top) ||
                    (!tooth51Diagnozis.seal_left && tooth51Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M978.5 604.999C973 593.999 962 587.999 957.5 584.999"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_top &&
                      !tooth51Diagnozis.seal_bottom) ||
                    (!tooth51Diagnozis.seal_left &&
                      !tooth51Diagnozis.seal_top &&
                      tooth51Diagnozis.seal_bottom) ||
                    (!tooth51Diagnozis.seal_left &&
                      !tooth51Diagnozis.seal_right &&
                      tooth51Diagnozis.seal_top &&
                      !tooth51Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M978.5 604.999C983.833 604.332 998.6 603.699 1015 606.499"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_right &&
                      !tooth51Diagnozis.seal_top) ||
                    (!tooth51Diagnozis.seal_right && tooth51Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1015 606.499C1014 603.832 1016.2 595.199 1033 581.999"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_right &&
                      !tooth51Diagnozis.seal_bottom) ||
                    (!tooth51Diagnozis.seal_right &&
                      tooth51Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M1015 606.499C1014.83 607.666 1016.3 611.999 1023.5 619.999"
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
                visibility: tooth51Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth51Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth51Diagnozis.vinir_color}`}
                d="M954.015 581.875C957.215 579.075 961.915 576.975 967.315 575.775C979.115 573.075 992.715 573.575 1006.31 574.175C1017.41 574.675 1028.51 575.275 1037.61 578.975C1037.71 578.975 1037.91 579.075 1038.11 579.175C1043.01 581.275 1047.11 584.275 1048.71 588.775C1049.2 590.204 1049.38 591.604 1049.32 592.976C1046.72 593.132 1039.81 592.447 1033.01 588.46C1031.81 587.577 1030.42 586.83 1028.95 586.191C1028.79 586.114 1028.64 586.037 1028.56 586.037C1021.61 583.187 1013.13 582.725 1004.65 582.34C994.256 581.877 983.865 581.492 974.848 583.572C970.722 584.496 967.131 586.114 964.686 588.271C964.612 588.339 964.54 588.407 964.468 588.476C959.231 592.076 952.763 592.976 950.184 592.976C949.134 588.592 950.739 584.862 954.015 581.875Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth51Diagnozis.temporary_crown ||
                tooth51Diagnozis.ceramic_crown ||
                tooth51Diagnozis.mceramic_crown ||
                tooth51Diagnozis.metalic_crown ||
                tooth51Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth51Diagnozis.temporary_crown ||
                tooth51Diagnozis.ceramic_crown ||
                tooth51Diagnozis.mceramic_crown ||
                tooth51Diagnozis.metalic_crown ||
                tooth51Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth51Diagnozis.ceramic_crown_color}
                                ${tooth51Diagnozis.mceramic_crown_color}
                                ${tooth51Diagnozis.metalic_crown_color}
                                ${tooth51Diagnozis.zirconia_crown_color}
                            `}
              d="M1048.2,588.7c-1.5-4.5-5.6-7.5-10.6-9.6c-0.2-0.1-0.3-0.1-0.5-0.2
                            c-9.1-3.7-20.2-4.3-31.3-4.8c-13.6-0.6-27.2-1.1-39,1.6c-5.4,1.2-10.1,3.3-13.3,6.1c-3.4,3.1-5.1,6.9-3.8,11.6
                            c1.7,5.9,8.6,8.9,12.9,13.6c3.3,3.5,4.8,7.9,6.5,12.2c0.4,1,0.8,2,1.2,2.9c2.6,6.4,6,12.8,12.1,17.4c4.8,3.6,11,5.8,17.4,5.5
                            c5.4-0.2,10.4-2.2,14.4-5.3c5.7-4.4,8.8-10.5,12.3-16.1c0.6-1,1.3-2,2-2.9c2.5-3.5,5.4-6.7,8.5-9.8
                            C1043.7,604.3,1051,597.1,1048.2,588.7z"
            />
          </g>
        </g>
        <g
          className="common-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 22, 103)',
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
                  !tooth51Diagnozis.implant &&
                  !tooth51Diagnozis.apex &&
                  !tooth51Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st9"
                d="M1039.9,464.5c-0.6,9.1-1.5,18.2-2.8,27.3l-2.2,2.9l-2.7,1.2
                                c-17.7,0.4-35.4-0.1-53.1-1.4c-5.2-0.4-10.4-0.8-15.6-1.4l-2.5-1.6l-1.5-1.7c-3.1-13.9-4.9-28-5.5-42.3v0
                                c1.5-6.3,3.5-12.5,6.1-18.4c3.7-8.5,9-16.6,17.3-20.9c8.2-4.2,17.8-3.9,26.7-1.1c7,2.2,13.5,5.9,19,10.7
                                c7.5,6.5,13,14.8,16.9,23.8C1040.6,449.1,1040.4,456.8,1039.9,464.5z"
              />
            </g>
            <g
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth51Diagnozis.implant &&
                  !tooth51Diagnozis.abutment &&
                  !tooth51Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth51Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M1040.1,441.5c-3.9-9-9.5-17.3-16.9-23.8c-5.5-4.8-12-8.5-19-10.7
                                c-8.8-2.8-18.5-3.1-26.7,1.1c-8.3,4.3-13.6,12.4-17.3,20.9c-2.6,6-4.5,12.1-6.1,18.4c0-0.3,0-0.6,0-0.8c-0.3-9.8,0-19.5,0.1-29.3
                                c0.3-23.3-0.2-46.5-0.3-69.7c-0.1-15.9,0-31.7,1.3-47.4c0.7-7.9,1.6-15.8,3.5-23.5c1.9-7.9,4.7-15.5,6.9-23.3
                                c3-10.5,7.4-21.8,18.1-22c9.7-0.2,15.5,9,18.7,18.4c5.9,17.4,10,35.3,13.9,53.2c5,23,9.7,46.1,13,69.3c1.8,12.7,3.2,25.5,5.6,38.1
                                c1.5,7.9,3.5,15.8,4.5,23.8C1039.7,436.7,1039.9,439.1,1040.1,441.5z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth51Diagnozis.channel_class} ${tooth51Diagnozis.channel_class} ${tooth51Diagnozis.pulpit ? 'pulpit' : ''} ${tooth51Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1010.9,458.7l-2.2,2.3l-22.7,0l-1.8-2.1c-0.9-4.6-1.6-9.2-2.2-13.9
                                c-0.6-5.5-1-11-0.7-16.6c0.5-7.7,2.3-15.2,3.5-22.8c6.3-1.2,13-0.5,19.2,1.4c1,0.3,1.9,0.6,2.9,1c0.4,1.7,0.8,3.3,1.1,5
                                c1.8,7.4,3.9,14.8,4.6,22.4C1013.6,443.2,1012.9,451.1,1010.9,458.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth51Diagnozis.channel_class} ${tooth51Diagnozis.channel_class} ${tooth51Diagnozis.pulpit ? 'pulpit' : ''} ${tooth51Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M1007,408c-1-0.4-1.9-0.7-2.9-1c-6.3-2-12.9-2.7-19.2-1.4c0.1-0.5,0.2-0.9,0.2-1.3
                                c3.2-20.4,1.4-40.9-0.1-61.4c-0.5-7-1-14-1.5-21.1c3-0.6,6.1-0.9,9.4-0.7c1,5.9,1.9,11.8,2.7,17.6
                                C999.2,361.8,1001.9,385.1,1007,408z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth51Diagnozis.channel_class} ${tooth51Diagnozis.channel_class} ${tooth51Diagnozis.pulpit ? 'pulpit' : ''} ${tooth51Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M993,321c-3.3-0.2-6.5,0.1-9.4,0.7c-0.9-13.5-1.8-27-3-40.5
                                c-1.4-15.6-3.1-31.2-5.1-46.8c0-0.1,0-0.2,0-0.3c0,0.1,0,0.2,0.1,0.2c4.2,17.2,8.1,34.5,11.4,51.9
                                C989.1,297.9,991.1,309.4,993,321z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage51 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth51Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M954.1 447.499C954.6 461.699 956.5 475.899 959.6 489.799L961.1 491.499L963.6 493.099C966.6 493.399 969.6 493.699 972.6 493.899C974.8 494.099 977 494.299 979.2 494.399C995.5 495.599 1011.8 496.099 1028.1 495.799C1029.5 495.799 1030.9 495.799 1032.3 495.699L1035 494.499L1037.2 491.599C1038.5 482.499 1039.5 473.399 1040 464.299C1040.4 458.199 1040.6 451.999 1040.4 445.799C1040.4 444.299 1040.3 442.799 1040.2 441.299C1040 440.699 1039.7 440.199 1039.4 439.599C1039.2 439.099 1038.9 438.599 1038.7 438.099C1038.4 437.499 1038.1 436.899 1037.8 436.299C1037.5 435.799 1037.2 435.199 1036.9 434.699C1036.3 433.599 1035.7 432.599 1035.1 431.599C1035.1 431.599 1035.1 431.599 1035.1 431.499C1034.8 430.999 1034.5 430.599 1034.2 430.099C1034.2 429.999 1034.1 429.999 1034.1 429.899C1033.8 429.399 1033.4 428.899 1033.1 428.399C1032.8 427.899 1032.4 427.399 1032.1 426.899C1032.1 426.899 1032.1 426.899 1032 426.799C1031.6 426.299 1031.3 425.799 1030.9 425.399C1030.5 424.899 1030.1 424.399 1029.7 423.999C1029.3 423.499 1028.9 423.099 1028.5 422.599C1028.1 422.199 1027.7 421.699 1027.3 421.299C1026 419.999 1024.7 418.699 1023.3 417.399C1020.6 415.099 1017.7 412.999 1014.6 411.199C1014.3 410.999 1013.9 410.799 1013.6 410.599C1013.3 410.399 1012.9 410.199 1012.6 410.099C1012.3 409.899 1011.9 409.699 1011.5 409.599C1011.1 409.399 1010.8 409.299 1010.4 409.099C1010 408.899 1009.7 408.799 1009.3 408.599C1008.8 408.399 1008.2 408.099 1007.6 407.899C1007.4 407.799 1007.2 407.799 1007.1 407.699C1006.6 407.499 1006.2 407.399 1005.7 407.199C1005.2 406.999 1004.7 406.799 1004.2 406.699C999.8 405.299 995.1 404.499 990.5 404.699C989.9 404.699 989.3 404.699 988.7 404.799C988.4 404.799 988.1 404.799 987.8 404.899C987.5 404.899 987.2 404.999 986.9 404.999C986.6 404.999 986.3 405.099 986 405.099C985.6 405.199 985.3 405.199 984.9 405.299C984.7 405.299 984.5 405.399 984.2 405.399C984 405.399 983.7 405.499 983.5 405.599C983.4 405.599 983.4 405.599 983.3 405.599C983 405.699 982.8 405.699 982.5 405.799C982.2 405.899 981.9 405.999 981.6 406.099C981.3 406.199 981.1 406.299 980.8 406.399C980.5 406.499 980.2 406.599 980 406.699C979.7 406.799 979.4 406.899 979.2 406.999C978.6 407.199 978.1 407.499 977.6 407.799C974.7 409.299 972.2 411.199 970 413.399C965.8 417.699 962.7 423.099 960.3 428.699C959 431.599 957.9 434.599 956.9 437.599C956.4 439.099 955.9 440.599 955.5 442.099C955.1 443.599 954.7 445.199 954.3 446.699C954.1 447.199 954.1 447.399 954.1 447.499Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              style={{ fill: tooth51Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M981.8 301.9L984.7 494.9H984.8C994.3 495.5 1003.8 495.9 1013.2 496L989.4 301.2C989.2 300.3 988.8 299.5 988.1 298.9C987.4 298.3 986.6 298 985.6 298C983.5 298 981.8 299.7 981.8 301.9Z"
            ></path>
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth51Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth51Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st16"
              d="M981.9,301.8l1.6,104c0.2-0.1,0.5-0.1,0.7-0.2c0.2-0.1,0.5-0.1,0.7-0.1c0,0,0,0,0,0
                            c0.4-0.1,0.7-0.1,1.1-0.2c0.3,0,0.6-0.1,0.9-0.1c0.3,0,0.6-0.1,0.9-0.1c0.3,0,0.6,0,0.9-0.1h0c0.6,0,1.2-0.1,1.8-0.1
                            c4.6-0.1,9.2,0.7,13.7,2c0.5,0.2,1,0.3,1.5,0.5c0.5,0.2,0.9,0.3,1.4,0.5c0.2,0.1,0.4,0.1,0.5,0.2l-18-107.1
                            c-0.2-0.9-0.6-1.7-1.3-2.3c-0.7-0.6-1.5-0.9-2.5-0.9C983.6,297.9,981.9,299.7,981.9,301.8z"
            />
            <path
              className="st15"
              d="M954.1,447.5C954.1,447.5,954.1,447.5,954.1,447.5c0.5,14.2,2.4,28.4,5.5,42.3l1.5,1.7l2.5,1.6
                            c3,0.3,6,0.6,9,0.8c2.2,0.2,4.4,0.4,6.6,0.5c16.3,1.2,32.6,1.7,48.9,1.4c1.4,0,2.8,0,4.2-0.1l2.7-1.2l2.2-2.9
                            c1.3-9.1,2.3-18.2,2.8-27.3c0.4-6.1,0.6-12.3,0.4-18.5c0-1.5-0.1-3-0.2-4.5c0,0,0,0,0,0c-0.2-0.6-0.5-1.1-0.8-1.7
                            c-0.2-0.5-0.5-1-0.7-1.5c-0.3-0.6-0.6-1.2-0.9-1.8c-0.3-0.5-0.6-1.1-0.9-1.6c-0.6-1.1-1.2-2.1-1.8-3.1c0,0,0,0,0-0.1
                            c-0.3-0.5-0.6-0.9-0.9-1.4c0-0.1-0.1-0.1-0.1-0.2c-0.3-0.5-0.7-1-1-1.5c-0.3-0.5-0.7-1-1-1.5c0,0,0,0-0.1-0.1
                            c-0.4-0.5-0.7-1-1.1-1.4c-0.4-0.5-0.8-1-1.2-1.4c-0.4-0.5-0.8-0.9-1.2-1.4c0,0,0,0,0,0c-0.4-0.4-0.8-0.9-1.2-1.3
                            c-1.3-1.3-2.6-2.6-4-3.9c-2.7-2.3-5.6-4.4-8.7-6.2c-0.3-0.2-0.7-0.4-1-0.6c-0.3-0.2-0.7-0.4-1-0.5c-0.3-0.2-0.7-0.4-1.1-0.5
                            c-0.4-0.2-0.7-0.3-1.1-0.5c-0.4-0.2-0.7-0.3-1.1-0.5c-0.5-0.2-1.1-0.5-1.7-0.7c-0.2-0.1-0.4-0.1-0.5-0.2
                            c-0.5-0.2-0.9-0.3-1.4-0.5c-0.5-0.2-1-0.4-1.5-0.5c-4.4-1.4-9.1-2.2-13.7-2c-0.6,0-1.2,0-1.8,0.1h0c-0.3,0-0.6,0-0.9,0.1
                            c-0.3,0-0.6,0.1-0.9,0.1c-0.3,0-0.6,0.1-0.9,0.1c-0.4,0.1-0.7,0.1-1.1,0.2c0,0,0,0,0,0c-0.2,0-0.4,0.1-0.7,0.1
                            c-0.2,0-0.5,0.1-0.7,0.2c-0.1,0-0.1,0-0.2,0c-0.3,0.1-0.5,0.1-0.8,0.2c-0.3,0.1-0.6,0.2-0.9,0.3c-0.3,0.1-0.5,0.2-0.8,0.3
                            c-0.3,0.1-0.6,0.2-0.8,0.3c-0.3,0.1-0.6,0.2-0.8,0.3c-0.6,0.2-1.1,0.5-1.6,0.8c-2.9,1.5-5.4,3.4-7.6,5.6
                            c-4.2,4.3-7.3,9.7-9.7,15.3c-1.3,2.9-2.4,5.9-3.4,8.9c-0.5,1.5-1,3-1.4,4.5c-0.4,1.5-0.8,3.1-1.2,4.6
                            C954.1,447.2,954.1,447.4,954.1,447.5z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth51Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth51Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M1039.8,442.1c-4-6.4-12.9-21.1-16.6-24.4c-5.5-4.8-12-8.5-19-10.7c-8.8-2.8-18.5-3.1-26.7,1.1
                            c-4.2,2.2-20.7,36.1-23.5,39.8l2.7-10l19.3-39.2l36.3-3.4l27.2,43C1039.5,438.4,1040.3,442.8,1039.8,442.1z"
            />
            <path
              className="st33"
              d="M1039.9,464.5c-0.6,9.1-1.5,18.3-2.8,27.3l-2.2,2.9l-2.7,1.2c-17.7,0.4-35.4-0.1-53.1-1.4
                            c-5.2-0.4-10.4-0.8-15.6-1.4l-2.5-1.6l-1.5-1.7c-3.1-13.9-4.9-28-5.5-42.3c1.5-6.3,3.5-12.5,6-18.4c1.8-4.2,4.1-8.3,6.8-11.9
                            c2.8-3.7,6.3-6.8,10.5-9c8.2-4.2,17.8-3.9,26.7-1.1c7,2.2,13.5,5.9,19,10.7c4.2,3.6,7.8,7.8,10.8,12.4l0,0c1.6,2.4,3,4.8,4.2,7.4
                            c0,0,0,0.1,0.1,0.1c0.6,1.3,1.2,2.5,1.8,3.8C1040.6,449.1,1040.4,456.8,1039.9,464.5z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <path
              className="st44"
              d="M1024.05 433.822C1024.64 436.197 1022.97 438.538 1020.54 438.764L979.264 442.601C976.829 442.827 974.762 440.834 974.9 438.393L977.143 398.596C977.255 396.614 978.804 395.013 980.782 394.837L1010.28 392.209C1012.24 392.033 1014.04 393.318 1014.51 395.233L1024.05 433.822Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth51Diagnozis.abutment ||
                tooth51Diagnozis.implant ||
                tooth51Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M1019.5,394.2l-46.5,3.6c-1.7-24.7-2.9-49.4-3.5-74.1c-0.6-24-0.6-47.9-0.1-71.8c3.4-4.6,8.5-7.5,14.1-8
                        c5.9-0.5,11.9,1.7,16.7,6.1c3.9,24.8,7.5,49.7,10.8,74.6C1014,347.7,1016.9,370.9,1019.5,394.2z"
            ></path>
            <line
              className="st19"
              x1="1021.9"
              y1="373.6"
              x2="968.4"
              y2="384.7"
            ></line>
            <line
              className="st19"
              x1="1019.8"
              y1="345.4"
              x2="966.3"
              y2="356.4"
            ></line>
            <line
              className="st19"
              x1="1016.5"
              y1="317.1"
              x2="963"
              y2="328.1"
            ></line>
            <line
              className="st19"
              x1="1014.4"
              y1="288.8"
              x2="960.9"
              y2="299.8"
            ></line>
            <line
              className="st19"
              x1="1012.2"
              y1="260.5"
              x2="958.7"
              y2="271.6"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth51Diagnozis.culttab &&
                !tooth51Diagnozis.abutment &&
                !tooth51Diagnozis.implant &&
                !tooth51Diagnozis.shaper &&
                !tooth51Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M1047,466.5c-1.1-7.3-2.8-14.6-5.5-21.5c-0.2-0.6-0.5-1.3-0.7-1.9
                        c-3.9-9.7-9.7-18.5-17.6-25.4c-5.5-4.8-12-8.5-19-10.7c-8.8-2.8-18.5-3.1-26.7,1.1c-8.3,4.3-13.6,12.4-17.3,20.9
                        c-2.6,5.8-4.5,11.9-6,18.1c-1.6,6.6-2.7,13.4-3.6,20.2c-1.4,11.3-2.1,22.7-0.6,34c0.5,3.6,1.1,7.1,2,10.6c1.7,3.4,4.1,6.3,7,8.7
                        c2.3,1.9,4.8,3.4,7.6,4.4c3,0.3,5.9,0.5,8.9,0.8c7.5,0.6,15,1,22.6,1.3c10.3,0.4,20.6,0.5,30.9,0.4c4.3,0,8.6-0.2,12.9-0.3
                        l2.9-1.2c1-1.1,1.8-2.3,2.4-3.6c0.7-1.5,1.1-3.1,1.2-4.7c0.5-7.2,0.7-14.5,0.6-21.7C1049,486.2,1048.5,476.3,1047,466.5z"
            ></path>
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth51Diagnozis.culttab && !tooth51Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M954.401 447.2C952.801 453.8 951.601 460.6 950.801 467.4C949.401 478.7 948.701 490.1 950.201 501.4C950.601 504.9 951.301 508.5 952.201 512C953.901 515.3 956.301 518.3 959.201 520.7C961.501 522.6 964.001 524 966.801 525.1C967.053 525.125 967.303 525.15 967.554 525.176C970.288 525.45 972.953 525.717 975.701 525.9C983.301 526.5 990.801 526.9 998.301 527.2C1008.6 527.6 1018.9 527.7 1029.2 527.6C1033.5 527.6 1037.8 527.5 1042.1 527.3L1045 526.1C1046 525 1046.8 523.8 1047.4 522.5C1048 521 1048.5 519.4 1048.6 517.8C1049 510.6 1049.2 503.4 1049.2 496.1C1049.2 486.3 1048.7 476.4 1047.2 466.6C1046 459.3 1044.3 452 1041.7 445.1C1041.66 444.982 1041.62 444.861 1041.58 444.737C1041.42 444.229 1041.24 443.682 1041 443.2C1037.1 433.6 1031.3 424.7 1023.4 417.8C1017.9 413 1011.4 409.3 1004.4 407.1C995.501 404.3 985.901 404 977.701 408.2C969.401 412.5 964.101 420.6 960.401 429.1C957.801 435 955.901 441 954.401 447.2ZM982.39 413.462C975.928 416.788 971.801 423.052 968.92 429.626C967.773 432.213 966.8 434.824 965.96 437.474C965.567 438.716 966.485 439.971 967.787 440.011L1029.35 441.911C1030.74 441.954 1031.75 440.597 1031.22 439.308C1028.35 432.313 1023.63 425.798 1017.97 420.887C1013.69 417.174 1008.63 414.313 1003.18 412.611C996.25 410.446 988.775 410.214 982.39 413.462Z"
            ></path>
            <path
              className={`st7 ${tooth51Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M968.702 429.626C971.583 423.052 975.71 416.788 982.173 413.462C988.557 410.214 996.032 410.446 1002.96 412.611C1008.41 414.313 1013.47 417.174 1017.76 420.887C1023.42 425.798 1028.13 432.313 1031 439.308C1031.53 440.597 1030.52 441.954 1029.13 441.911L967.569 440.011C966.267 439.971 965.349 438.716 965.743 437.474C966.582 434.824 967.555 432.213 968.702 429.626Z"
            />
            <path
              className={`st60
                                    ${tooth51Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth51Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth51Diagnozis.seal_cervical_color}
                                `}
              d="M968.702 429.626C971.583 423.052 975.71 416.788 982.173 413.462C988.557 410.214 996.032 410.446 1002.96 412.611C1008.41 414.313 1013.47 417.174 1017.76 420.887C1023.42 425.798 1028.13 432.313 1031 439.308C1031.53 440.597 1030.52 441.954 1029.13 441.911L967.569 440.011C966.267 439.971 965.349 438.716 965.743 437.474C966.582 434.824 967.555 432.213 968.702 429.626Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar hImplant hEmpty"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth51.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M1045.5 458.199L1042.5 453.699L1040.5 449.699L1039 444.699L1036.5 439.199L1034 435.199L1031.5 431.699L1029 426.699L1023.5 421.199L1018.5 417.199L1015.5 414.199L1010 412.199L1005.5 409.199L1000.5 407.699H996L992 406.699L988.5 407.699H984.5L979.5 409.199L977 410.199L973.5 413.199L970 417.199L967.5 419.699L965.5 424.199L962.5 427.699V430.699L960 435.199L959 439.199L957 442.199V444.699L956 446.699L955 449.699L952.5 454.699L952 453.699V448.699L953 444.699L952 440.199V438.199L953 435.699V434.199L954 430.699L953 427.699V425.199L954 421.199L953 417.199V413.199L952.5 406.699L954 402.699V397.699L959 394.199L964 388.699L970 386.699L973.5 384.699L978.5 381.699L983 381.199L988.5 379.699L992 381.199L998 379.699L1002 381.199L1007 382.199L1012 384.699H1015.5L1020 386.699L1025.5 391.199H1029L1031.5 394.199L1034 395.699L1035 399.199L1034 402.699V406.699L1036.5 409.199V414.199L1038.5 417.199L1038 420.199L1039 424.199V426.699L1040.5 430.699V434.199L1041.5 438.199L1042.5 441.199L1043.5 445.699L1044.5 448.699L1045.5 453.699L1046 456.699L1045.5 458.199Z"
            ></path>
            <path
              className="st61 level1"
              d="M1045.5 458.5L1042.5 454L1040.5 450L1039 445L1036.5 439.5L1034 435.5L1031.5 432L1029 427L1023.5 421.5L1018.5 417.5L1015.5 414.5L1010 412.5L1005.5 409.5L1000.5 408H996L992 407L988.5 408H984.5L979.5 409.5L977 410.5L973.5 413.5L970 417.5L967.5 420L965.5 424.5L962.5 428V431L960 435.5L959 439.5L957 442.5V445L956 447L955 450L952.5 455L952 454V449L953 445L952 440.5V438.5L953 436V434.5L954 431L953 428L954.5 426L955.5 424L957.5 422L960 419L962 416.5L964 414.5L965.5 412.5L969 410.5L972 407L974.5 405.5L977.5 403L981 402.5L984.5 400.5H986.5L989 400H991.5L994.5 399.5L997.5 400H1000.5L1003.5 400.5L1005.5 401.5L1009 402.5L1012.5 403.5L1015.5 405.5L1017 407L1020 408.5L1022 409.5L1024.5 411.5L1026.5 413.5L1029 414.5L1032 417L1034 420L1036.5 421.5L1037.5 423L1039 424.5V427L1040.5 431V434.5L1041.5 438.5L1042.5 441.5L1043.5 446L1044.5 449L1045.5 454L1046 457L1045.5 458.5Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth51Diagnozis.culttab &&
                !tooth51Diagnozis.abutment &&
                !tooth51Diagnozis.implant &&
                !tooth51Diagnozis.shaper
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
                d="M950,501.4c0.5,3.6,1.1,7.1,2,10.6c1.7,3.4,4.1,6.3,7,8.7c2.3,1.9,4.8,3.4,7.6,4.4c3,0.3,5.9,0.5,8.9,0.8
                                c-1.6-17.3-5.9-62.7-6.5-65.6c-0.5-2.5-9.7-9.5-14.8-13.2c-1.6,6.6-2.7,13.4-3.6,20.2C949.2,478.7,948.6,490.1,950,501.4z"
              />
              <path
                className={`
                                st8 target caries-left 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth51.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth51.seal_left ? `seal-fill ${teethDiagnozis.tooth51.seal_left_color}` : ''}
                            `}
                d="M950,501.4c0.5,3.6,1.1,7.1,2,10.6c1.7,3.4,4.1,6.3,7,8.7c2.3,1.9,4.8,3.4,7.6,4.4c3,0.3,5.9,0.5,8.9,0.8
                                c-1.6-17.3-5.9-62.7-6.5-65.6c-0.5-2.5-9.7-9.5-14.8-13.2c-1.6,6.6-2.7,13.4-3.6,20.2C949.2,478.7,948.6,490.1,950,501.4z"
                style={{
                  fill: teethDiagnozis.tooth51.caries_left
                    ? '#606c80'
                    : teethDiagnozis.tooth51.seal_left
                      ? teethDiagnozis.tooth51.seal_left_color
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
                d="M1029,527.6c4.3,0,8.6-0.2,12.9-0.3l2.9-1.2c1-1.1,1.8-2.3,2.4-3.6c0.7-1.5,1.1-3.1,1.2-4.7
                                c0.5-7.2,0.7-14.5,0.6-21.7c0-9.9-0.5-19.8-2-29.5c-1.1-7.3-2.8-14.6-5.5-21.5c-5.1,4.2-13.9,11.7-14.3,12.7
                                C1026.8,458.9,1028.4,511.2,1029,527.6z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth51.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth51.seal_right ? `seal-fill ${teethDiagnozis.tooth51.seal_right_color}` : ''}
                            `}
                d="M1029,527.6c4.3,0,8.6-0.2,12.9-0.3l2.9-1.2c1-1.1,1.8-2.3,2.4-3.6c0.7-1.5,1.1-3.1,1.2-4.7
                                c0.5-7.2,0.7-14.5,0.6-21.7c0-9.9-0.5-19.8-2-29.5c-1.1-7.3-2.8-14.6-5.5-21.5c-5.1,4.2-13.9,11.7-14.3,12.7
                                C1026.8,458.9,1028.4,511.2,1029,527.6z"
                style={{
                  fill: teethDiagnozis.tooth51.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth51.seal_right
                      ? teethDiagnozis.tooth51.seal_right_color
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
                d="M954.2,447.1c5.1,3.7,14.3,10.7,14.8,13.2c0.6,2.9,4.9,48.3,6.5,65.6c7.5,0.6,15,1,22.6,1.3
                                c10.3,0.4,20.6,0.5,30.9,0.4c-0.5-16.4-2.1-68.7-1.7-69.9c0.3-1,9.2-8.5,14.3-12.7c-0.2-0.6-0.5-1.3-0.7-1.9
                                c-3.9-9.7-9.7-18.5-17.6-25.4c-5.5-4.8-12-8.5-19-10.7c-8.8-2.8-18.5-3.1-26.7,1.1c-8.3,4.3-13.6,12.4-17.3,20.9
                                C957.6,434.9,955.7,441,954.2,447.1z"
              />
              <path
                className={`
                                st8 target caries-top 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth51.caries_top ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth51.seal_top ? `seal-fill ${teethDiagnozis.tooth51.seal_top_color}` : ''}
                            `}
                d="M954.2,447.1c5.1,3.7,14.3,10.7,14.8,13.2c0.6,2.9,4.9,48.3,6.5,65.6c7.5,0.6,15,1,22.6,1.3
                                c10.3,0.4,20.6,0.5,30.9,0.4c-0.5-16.4-2.1-68.7-1.7-69.9c0.3-1,9.2-8.5,14.3-12.7c-0.2-0.6-0.5-1.3-0.7-1.9
                                c-3.9-9.7-9.7-18.5-17.6-25.4c-5.5-4.8-12-8.5-19-10.7c-8.8-2.8-18.5-3.1-26.7,1.1c-8.3,4.3-13.6,12.4-17.3,20.9
                                C957.6,434.9,955.7,441,954.2,447.1z"
                style={{
                  fill: teethDiagnozis.tooth51.caries_top
                    ? '#606c80'
                    : teethDiagnozis.tooth51.seal_top
                      ? teethDiagnozis.tooth51.seal_top_color
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
                    (tooth51Diagnozis.seal_left &&
                      !tooth51Diagnozis.seal_top &&
                      !tooth51Diagnozis.seal_center) ||
                    (!tooth51Diagnozis.seal_left && tooth51Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M970 469.5L975 520.5"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_left &&
                      !tooth51Diagnozis.seal_top) ||
                    (!tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_top &&
                      !tooth51Diagnozis.seal_center) ||
                    (!tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_top &&
                      tooth51Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M970 469.5C969 457.5 966.9 455.2 958.5 450"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_right &&
                      !tooth51Diagnozis.seal_top) ||
                    (!tooth51Diagnozis.seal_right &&
                      !tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_top &&
                      tooth51Diagnozis.seal_bottom) ||
                    (tooth51Diagnozis.seal_right &&
                      tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_center &&
                      !tooth51Diagnozis.seal_top) ||
                    (!tooth51Diagnozis.seal_center &&
                      !tooth51Diagnozis.seal_bottom &&
                      tooth51Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1027 469.5C1027 456.5 1029.2 452.4 1038 448"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth51Diagnozis.seal_right &&
                      !tooth51Diagnozis.seal_top) ||
                    (!tooth51Diagnozis.seal_right &&
                      !tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_top &&
                      tooth51Diagnozis.seal_bottom) ||
                    (tooth51Diagnozis.seal_right &&
                      tooth51Diagnozis.seal_left &&
                      tooth51Diagnozis.seal_center &&
                      !tooth51Diagnozis.seal_top) ||
                    (!tooth51Diagnozis.seal_center &&
                      !tooth51Diagnozis.seal_bottom &&
                      tooth51Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M1027 469.5L1029 522"
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
                visibility: tooth51Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth51Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth51Diagnozis.vinir_color}`}
                d="M1047 466.5C1045.9 459.2 1044.2 451.9 1041.5 445C1041.3 444.4 1041 443.7 1040.8 443.1C1036.9 433.4 1031.1 424.6 1023.2 417.7C1017.7 412.9 1011.2 409.2 1004.2 407C995.4 404.2 985.7 403.9 977.5 408.1C969.2 412.4 963.9 420.5 960.2 429C957.6 434.8 955.7 440.9 954.2 447.1C952.6 453.7 951.5 460.5 950.6 467.3C949.2 478.6 948.5 490 950 501.3C950.5 504.9 951.1 508.4 952 511.9C953.7 515.3 956.1 518.2 959 520.6C961.3 522.5 963.8 524 966.6 525C969.6 525.3 972.5 525.5 975.5 525.8C983 526.4 990.5 526.8 998.1 527.1C1008.4 527.5 1018.7 527.6 1029 527.5C1033.3 527.5 1037.6 527.3 1041.9 527.2L1044.8 526C1045.8 524.9 1046.6 523.7 1047.2 522.4C1047.9 520.9 1048.3 519.3 1048.4 517.7C1048.9 510.5 1049.1 503.2 1049 496C1049 486.2 1048.5 476.3 1047 466.5Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth51Diagnozis.temporary_crown ||
                tooth51Diagnozis.ceramic_crown ||
                tooth51Diagnozis.mceramic_crown ||
                tooth51Diagnozis.metalic_crown ||
                tooth51Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth51Diagnozis.temporary_crown ||
                tooth51Diagnozis.ceramic_crown ||
                tooth51Diagnozis.mceramic_crown ||
                tooth51Diagnozis.metalic_crown ||
                tooth51Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth51Diagnozis.ceramic_crown_color}
                                ${tooth51Diagnozis.mceramic_crown_color}
                                ${tooth51Diagnozis.metalic_crown_color}
                                ${tooth51Diagnozis.zirconia_crown_color}
                            `}
              d="M1047,466.5c-1.1-7.3-2.8-14.6-5.5-21.5c-0.2-0.6-0.5-1.3-0.7-1.9
                            c-3.9-9.7-9.7-18.5-17.6-25.4c-5.5-4.8-12-8.5-19-10.7c-8.8-2.8-18.5-3.1-26.7,1.1c-8.3,4.3-13.6,12.4-17.3,20.9
                            c-2.6,5.8-4.5,11.9-6,18.1c-1.6,6.6-2.7,13.4-3.6,20.2c-1.4,11.3-2.1,22.7-0.6,34c0.5,3.6,1.1,7.1,2,10.6c1.7,3.4,4.1,6.3,7,8.7
                            c2.3,1.9,4.8,3.4,7.6,4.4c3,0.3,5.9,0.5,8.9,0.8c7.5,0.6,15,1,22.6,1.3c10.3,0.4,20.6,0.5,30.9,0.4c4.3,0,8.6-0.2,12.9-0.3
                            l2.9-1.2c1-1.1,1.8-2.3,2.4-3.6c0.7-1.5,1.1-3.1,1.2-4.7c0.5-7.2,0.7-14.5,0.6-21.7C1049,486.2,1048.5,476.3,1047,466.5z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
