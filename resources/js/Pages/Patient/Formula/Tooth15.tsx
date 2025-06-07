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
import PeriodontitStage15 from './periodontit15';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth15() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth15Diagnozis = teethDiagnozis.tooth15;
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
        teethDiagnozis.tooth15.caries_bottom =
          !teethDiagnozis.tooth15.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth15.caries_center =
          !teethDiagnozis.tooth15.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth15.caries_left =
          !teethDiagnozis.tooth15.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth15.caries_right =
          !teethDiagnozis.tooth15.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth15.caries_top = !teethDiagnozis.tooth15.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth15.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth15.seal_center_color = sealColor1;
          teethDiagnozis.tooth15.seal_center = true;
        } else if (
          teethDiagnozis.tooth15.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth15.seal_center_color = sealColor2;
          teethDiagnozis.tooth15.seal_center = true;
        } else if (
          teethDiagnozis.tooth15.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth15.seal_center_color = sealColor3;
          teethDiagnozis.tooth15.seal_center = true;
        } else {
          teethDiagnozis.tooth15.seal_center =
            !teethDiagnozis.tooth15.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth15.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth15.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth15.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth15.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth15.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth15.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth15.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth15.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth15.seal_bottom = true;
        } else {
          teethDiagnozis.tooth15.seal_bottom =
            !teethDiagnozis.tooth15.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth15.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth15.seal_left_color = sealColor1;
          teethDiagnozis.tooth15.seal_left = true;
        } else if (
          teethDiagnozis.tooth15.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth15.seal_left_color = sealColor2;
          teethDiagnozis.tooth15.seal_left = true;
        } else if (
          teethDiagnozis.tooth15.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth15.seal_left_color = sealColor3;
          teethDiagnozis.tooth15.seal_left = true;
        } else {
          teethDiagnozis.tooth15.seal_left = !teethDiagnozis.tooth15.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth15.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth15.seal_right_color = sealColor1;
          teethDiagnozis.tooth15.seal_right = true;
        } else if (
          teethDiagnozis.tooth15.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth15.seal_right_color = sealColor2;
          teethDiagnozis.tooth15.seal_right = true;
        } else if (
          teethDiagnozis.tooth15.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth15.seal_right_color = sealColor3;
          teethDiagnozis.tooth15.seal_right = true;
        } else {
          teethDiagnozis.tooth15.seal_right =
            !teethDiagnozis.tooth15.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth15.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth15.seal_top_color = sealColor1;
          teethDiagnozis.tooth15.seal_top = true;
        } else if (
          teethDiagnozis.tooth15.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth15.seal_top_color = sealColor2;
          teethDiagnozis.tooth15.seal_top = true;
        } else if (
          teethDiagnozis.tooth15.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth15.seal_top_color = sealColor3;
          teethDiagnozis.tooth15.seal_top = true;
        } else {
          teethDiagnozis.tooth15.seal_top = !teethDiagnozis.tooth15.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth15.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth15.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth15.wedge_shaped_defect_color =
          !teethDiagnozis.tooth15.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth15.show) {
        document.getElementById('TH-15').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth55.show) {
        document.getElementById('TH-55').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth15.show) {
        document.getElementById('TH-15').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth55.show) {
          document.getElementById('TH-55').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth15.show) {
        document.getElementById('TH-55').classList.remove('f-tooth-active');
        document.getElementById('TH-15').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth15.show) {
        document.getElementById('TH-15').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth55.show) {
          document.getElementById('TH-55').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="15"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 631.0918 716.1968)"
          className={`st3 st4 st5 ${selectedTooth === 15 ? 'num-active' : ''}`}
        >
          15
        </text>
      </g>
      <g
        id="TH-15"
        className={`f-tooth-init ${(teethDiagnozis.tooth15.show || allTeeth) && !teethDiagnozis.tooth15.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth15.show = !teethDiagnozis.tooth15.show;
            teethDiagnozis.tooth55.show = false;
          }

          dispatch(setSelectedToothNumber(15));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              15,
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
          className={`underlay ${selectedTooth === 15 ? 'selected' : ''}`}
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
            d="M631,233.9c0,0-3,28-4,40s-1,58-3,83s-13.1,61.9-14.1,83.5
                        c-0.9,21.5-3.9,37.5,2.1,54.5s14,23,10,37s-14.6,37.3-14.3,60.7s-0.7,76.3,7.3,105.3s25,36.9,43,36c19-1,35-15,35-57s2-90,3-109
                        s-12-39-14-50c-2-11,12-26,13-63s2-61-1-80s-9-66-13-84s-12-48-15-57s-11-21-22-18C636,218.1,632,223.9,631,233.9z"
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
                  !tooth15Diagnozis.culttab &&
                  !tooth15Diagnozis.implant &&
                  !tooth15Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 ${tooth15Diagnozis.apex ? 'apex' : ''}`}
                d="M614.7,597.4c-1.5-6.3-0.3-12.6,3.2-18.3c2.8-4.5,6.9-8.6,11.5-12c6.6-4.9,14.9-8.9,24-7.9
                                c4.9,0.5,9,2.5,13.3,4.2c3.7,1.5,7.8,2.9,11.2,4.8c4,2.2,7.1,5.2,9,8.5c2.1,3.8,2.5,7.9,2.2,12.1c-0.5,6.9-2.8,13.4-6,19.5
                                c-2.4,4.5-5.1,8.8-8.4,13c-2.2,2.9-4.8,5.7-8.3,7.7c-4.4,2.5-9.7,3.6-14.9,3.9c-4.5,0.2-9.1-0.2-13.4-1.7c-5.1-1.8-9.2-5-11.7-8.7
                                c-2.4-3.5-3.5-7.3-5.2-11C619,606.8,616,602.5,614.7,597.4z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth15Diagnozis?.apex || tooth15Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth15Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth15Diagnozis?.apex ? 'apex' : ''}`}
                d="M614.7 597.4C613.2 591.1 614.4 584.8 617.9 579.1C620.7 574.6 624.8 570.5 629.4 
                                567.1C636 562.2 644.3 558.2 653.4 559.2C658.3 559.7 662.4 561.7 666.7 563.4C670.4 564.9 674.5 
                                566.3 677.9 568.2C681.9 570.4 685 573.4 686.9 576.7C689 580.5 689.4 584.6 689.1 588.8C688.6 595.7 
                                686.3 602.2 683.1 608.3C680.7 612.8 678 617.1 674.7 621.3C672.5 624.2 669.9 627 666.4 629C662 631.5 
                                656.7 632.6 651.5 632.9C647 633.1 642.4 632.7 638.1 631.2C633 629.4 628.9 626.2 626.4 622.5C624 619 
                                622.9 615.2 621.2 611.5C619 606.8 616 602.5 614.7 597.4Z"
              />
            </g>
          </g>
          <g
            className="pulp"
            style={{
              visibility:
                tooth15Diagnozis.apex || tooth15Diagnozis.pulpit
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility:
                  tooth15Diagnozis?.apex || tooth15Diagnozis.pulpit
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M643 593.5C643 600.956 647.5 609 651.5 609C655.5 609 660 601.456 660 594C660 586.544 655 582 651.5 582C648.5 582 
                                643 586.044 643 593.5Z"
                style={{ fill: '#e80808' }}
              />
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth15Diagnozis.implant || tooth15Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="651.5" cy="595.5" r="20.5" />
            <g className="st27">
              <mask id="implant_15" className="st49">
                <path
                  className="st50"
                  d="M640.871 582.971L638.176 582.093C635.886 584.398 634.182 587.286 633.308 590.515L635.416 592.412C635.227 593.412 635.129 594.444 635.129 595.5C635.129 596.555 635.227 597.588 635.416 598.588L633.308 600.484C634.182 603.713 635.886 606.602 638.177 608.906L640.871 608.029C642.427 609.371 644.236 610.428 646.217 611.119L646.804 613.892C648.357 614.301 649.986 614.519 651.667 614.519C653.349 614.519 654.979 614.301 656.532 613.891L657.119 611.118C659.099 610.427 660.908 609.37 662.464 608.028L665.158 608.906C667.449 606.601 669.152 603.712 670.027 600.483L667.918 598.587C668.107 597.587 668.206 596.555 668.206 595.5C668.206 594.445 668.107 593.413 667.918 592.413L670.027 590.517C669.152 587.287 667.449 584.399 665.158 582.094L662.464 582.971C660.908 581.629 659.099 580.572 657.119 579.881L656.532 577.108C654.979 576.699 653.349 576.48 651.667 576.48C649.986 576.48 648.357 576.698 646.804 577.108L646.217 579.88C644.236 580.571 642.427 581.629 640.871 582.971Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M640.871 582.971L638.176 582.093C635.886 584.398 634.182 587.286 633.308 590.515L635.416 592.412C635.227 593.412 635.129 594.444 635.129 595.5C635.129 596.555 635.227 597.588 635.416 598.588L633.308 600.484C634.182 603.713 635.886 606.602 638.177 608.906L640.871 608.029C642.427 609.371 644.236 610.428 646.217 611.119L646.804 613.892C648.357 614.301 649.986 614.519 651.667 614.519C653.349 614.519 654.979 614.301 656.532 613.891L657.119 611.118C659.099 610.427 660.908 609.37 662.464 608.028L665.158 608.906C667.449 606.601 669.152 603.712 670.027 600.483L667.918 598.587C668.107 597.587 668.206 596.555 668.206 595.5C668.206 594.445 668.107 593.413 667.918 592.413L670.027 590.517C669.152 587.287 667.449 584.399 665.158 582.094L662.464 582.971C660.908 581.629 659.099 580.572 657.119 579.881L656.532 577.108C654.979 576.699 653.349 576.48 651.667 576.48C649.986 576.48 648.357 576.698 646.804 577.108L646.217 579.88C644.236 580.571 642.427 581.629 640.871 582.971Z"
              ></path>
              <path
                className="st52"
                d="M638.176 582.093L638.796 580.192L637.625 579.81L636.758 580.683L638.176 582.093ZM640.871 582.971L640.252 584.872L641.324 585.221L642.177 584.485L640.871 582.971ZM633.308 590.515L631.377 589.992L631.056 591.18L631.97 592.002L633.308 590.515ZM635.416 592.412L637.382 592.783L637.591 591.677L636.754 590.924L635.416 592.412ZM635.416 598.588L636.754 600.075L637.591 599.323L637.382 598.217L635.416 598.588ZM633.308 600.484L631.97 598.997L631.056 599.82L631.377 601.007L633.308 600.484ZM638.177 608.906L636.758 610.316L637.626 611.189L638.796 610.808L638.177 608.906ZM640.871 608.029L642.177 606.514L641.324 605.778L640.252 606.127L640.871 608.029ZM646.217 611.119L648.173 610.705L647.94 609.602L646.876 609.231L646.217 611.119ZM646.804 613.892L644.848 614.306L645.103 615.511L646.294 615.826L646.804 613.892ZM656.532 613.891L657.042 615.825L658.233 615.511L658.488 614.306L656.532 613.891ZM657.119 611.118L656.46 609.23L655.396 609.602L655.163 610.704L657.119 611.118ZM662.464 608.028L663.083 606.127L662.011 605.778L661.157 606.514L662.464 608.028ZM665.158 608.906L664.539 610.808L665.709 611.189L666.577 610.316L665.158 608.906ZM670.027 600.483L671.957 601.006L672.279 599.818L671.364 598.996L670.027 600.483ZM667.918 598.587L665.953 598.216L665.744 599.321L666.581 600.074L667.918 598.587ZM667.918 592.413L666.581 590.926L665.744 591.678L665.953 592.784L667.918 592.413ZM670.027 590.517L671.364 592.004L672.279 591.181L671.957 589.994L670.027 590.517ZM665.158 582.094L666.577 580.684L665.709 579.811L664.539 580.192L665.158 582.094ZM662.464 582.971L661.157 584.486L662.011 585.222L663.083 584.873L662.464 582.971ZM657.119 579.881L655.163 580.296L655.396 581.398L656.46 581.769L657.119 579.881ZM656.532 577.108L658.488 576.694L658.233 575.489L657.042 575.174L656.532 577.108ZM646.804 577.108L646.294 575.174L645.103 575.488L644.848 576.693L646.804 577.108ZM646.217 579.88L646.876 581.769L647.94 581.397L648.173 580.295L646.217 579.88ZM637.557 583.995L640.252 584.872L641.49 581.069L638.796 580.192L637.557 583.995ZM635.238 591.038C636.02 588.152 637.543 585.567 639.595 583.503L636.758 580.683C634.229 583.228 632.345 586.42 631.377 589.992L635.238 591.038ZM636.754 590.924L634.645 589.028L631.97 592.002L634.079 593.899L636.754 590.924ZM637.129 595.5C637.129 594.57 637.216 593.661 637.382 592.783L633.451 592.04C633.239 593.163 633.129 594.319 633.129 595.5H637.129ZM637.382 598.217C637.216 597.338 637.129 596.43 637.129 595.5H633.129C633.129 596.68 633.239 597.837 633.451 598.959L637.382 598.217ZM634.645 601.971L636.754 600.075L634.079 597.101L631.97 598.997L634.645 601.971ZM639.595 607.496C637.544 605.432 636.02 602.847 635.238 599.961L631.377 601.007C632.345 604.579 634.229 607.771 636.758 610.316L639.595 607.496ZM640.252 606.127L637.557 607.005L638.796 610.808L641.49 609.931L640.252 606.127ZM646.876 609.231C645.137 608.624 643.547 607.695 642.177 606.514L639.565 609.543C641.308 611.047 643.336 612.232 645.558 613.008L646.876 609.231ZM648.761 613.477L648.173 610.705L644.26 611.534L644.848 614.306L648.761 613.477ZM651.667 612.519C650.16 612.519 648.702 612.324 647.314 611.958L646.294 615.826C648.012 616.278 649.813 616.519 651.667 616.519V612.519ZM656.022 611.957C654.634 612.323 653.175 612.519 651.667 612.519V616.519C653.522 616.519 655.324 616.278 657.042 615.825L656.022 611.957ZM655.163 610.704L654.575 613.477L658.488 614.306L659.076 611.533L655.163 610.704ZM661.157 606.514C659.788 607.695 658.199 608.623 656.46 609.23L657.778 613.007C660 612.231 662.027 611.046 663.77 609.543L661.157 606.514ZM665.777 607.004L663.083 606.127L661.844 609.93L664.539 610.808L665.777 607.004ZM668.096 599.96C667.315 602.847 665.791 605.431 663.739 607.496L666.577 610.316C669.106 607.77 670.99 604.578 671.957 601.006L668.096 599.96ZM666.581 600.074L668.69 601.97L671.364 598.996L669.255 597.099L666.581 600.074ZM666.206 595.5C666.206 596.43 666.119 597.337 665.953 598.216L669.883 598.958C670.095 597.836 670.206 596.68 670.206 595.5H666.206ZM665.953 592.784C666.119 593.662 666.206 594.57 666.206 595.5H670.206C670.206 594.32 670.095 593.164 669.883 592.042L665.953 592.784ZM668.69 589.029L666.581 590.926L669.255 593.9L671.364 592.004L668.69 589.029ZM663.74 583.503C665.791 585.568 667.315 588.153 668.096 591.039L671.957 589.994C670.99 586.421 669.106 583.229 666.577 580.684L663.74 583.503ZM663.083 584.873L665.777 583.995L664.539 580.192L661.844 581.069L663.083 584.873ZM656.46 581.769C658.199 582.376 659.788 583.305 661.157 584.486L663.77 581.457C662.027 579.954 660 578.768 657.778 577.993L656.46 581.769ZM654.575 577.523L655.163 580.296L659.076 579.467L658.488 576.694L654.575 577.523ZM651.667 578.48C653.175 578.48 654.634 578.676 656.022 579.042L657.042 575.174C655.324 574.721 653.522 574.48 651.667 574.48V578.48ZM647.314 579.042C648.702 578.676 650.16 578.48 651.667 578.48V574.48C649.813 574.48 648.012 574.721 646.294 575.174L647.314 579.042ZM648.173 580.295L648.761 577.522L644.848 576.693L644.26 579.466L648.173 580.295ZM642.177 584.485C643.547 583.304 645.137 582.376 646.876 581.769L645.558 577.992C643.336 578.767 641.308 579.953 639.565 581.456L642.177 584.485Z"
                mask="url(#implant_15)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle className="st44" cx="651.435" cy="595.435" r="22.435" />
            <path
              className="st45"
              d="M649.577 586.739C650.129 584.804 652.871 584.804 653.423 586.739L653.929 588.511C654.225 589.549 655.291 590.164 656.338 589.902L658.126 589.454C660.077 588.965 661.448 591.339 660.049 592.785L658.767 594.109C658.016 594.884 658.016 596.116 658.767 596.891L660.049 598.215C661.448 599.661 660.077 602.035 658.126 601.546L656.338 601.098C655.291 600.836 654.225 601.451 653.929 602.489L653.423 604.261C652.871 606.196 650.129 606.196 649.577 604.261L649.071 602.489C648.775 601.451 647.709 600.836 646.662 601.098L644.874 601.546C642.923 602.035 641.552 599.661 642.951 598.215L644.233 596.891C644.984 596.116 644.984 594.884 644.233 594.109L642.951 592.785C641.552 591.339 642.923 588.965 644.874 589.454L646.662 589.902C647.709 590.164 648.775 589.549 649.071 588.511L649.577 586.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth15Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth15Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M614.7 597.4C613.2 591.1 614.4 584.8 617.9 579.1C620.7 574.6 624.8 570.5 629.4 567.1C636 562.2 644.3 558.2 653.4 559.2C658.3 559.7 662.4 561.7 666.7 563.4C670.4 564.9 674.5 566.3 677.9 568.2C681.9 570.4 685 573.4 686.9 576.7C689 580.5 689.4 584.6 689.1 588.8C688.6 595.7 686.3 602.2 683.1 608.3C680.7 612.8 678 617.1 674.7 621.3C672.5 624.2 669.9 627 666.4 629C662 631.5 656.7 632.6 651.5 632.9C647 633.1 642.4 632.7 638.1 631.2C633 629.4 628.9 626.2 626.4 622.5C624 619 622.9 615.2 621.2 611.5C619 606.8 616 602.5 614.7 597.4Z"
            ></path>
            <path
              className="st47"
              d="M627.413 596.911C626.435 592.82 627.218 588.728 629.501 585.025C631.327 582.103 634.001 579.44 637.002 577.231C641.307 574.049 646.721 571.451 652.656 572.1C655.852 572.425 658.527 573.724 661.332 574.828C663.745 575.802 666.419 576.712 668.637 577.946C671.246 579.375 673.268 581.323 674.507 583.467C675.877 585.935 676.138 588.598 675.942 591.326C675.616 595.807 674.116 600.029 672.029 603.991C670.463 606.914 668.702 609.707 666.55 612.435C665.115 614.318 663.419 616.137 661.136 617.436C658.266 619.06 654.809 619.774 651.417 619.969C648.482 620.099 645.481 619.839 642.677 618.865C639.35 617.696 636.676 615.617 635.045 613.214C633.48 610.941 632.762 608.473 631.653 606.069C630.218 603.017 628.261 600.224 627.413 596.911Z"
            ></path>
            <circle className="st45" cx="652" cy="595" r="13" />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth15Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M614.695 597.4C613.195 591.1 614.395 584.8 617.895 579.1C620.695 574.6 624.795 
                            570.5 629.395 567.1C635.995 562.2 644.295 558.2 653.395 559.2C658.295 559.7 662.395 561.7 666.695 563.4C670.395 
                            564.9 674.495 566.3 677.895 568.2C681.895 570.4 684.995 573.4 686.895 576.7C688.995 580.5 689.395 584.6 689.095 
                            588.8C688.595 595.7 686.295 602.2 683.095 608.3C680.695 612.8 677.995 617.1 674.695 621.3C672.495 624.2 669.895 
                            627 666.395 629C661.995 631.5 656.695 632.6 651.495 632.9C646.995 633.1 642.395 632.7 638.095 631.2C632.995 
                            629.4 628.895 626.2 626.395 622.5C623.995 619 622.895 615.2 621.195 611.5C618.995 606.8 615.995 602.5 614.695 
                            597.4Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st56 hIntact"
              d="M627.409 596.911C626.43 592.82 627.213 588.728 629.496 585.025C631.322 582.103 
                            633.997 579.44 636.997 577.231C641.302 574.049 646.716 571.451 652.651 572.1C655.848 572.425 658.522 573.724 
                            661.327 574.828C663.74 575.802 666.414 576.712 668.632 577.946C671.241 579.375 673.263 581.323 674.503 583.467C675.872 
                            585.935 676.133 588.598 675.938 591.326C675.611 595.807 674.111 600.029 672.024 603.991C670.458 606.914 668.697 609.707 666.545 
                            612.435C665.11 614.318 663.414 616.137 661.131 617.436C658.261 619.06 654.804 619.774 651.412 619.969C648.477 620.099 645.476 
                            619.839 642.672 618.865C639.345 617.696 636.671 615.617 635.04 613.214C633.475 610.941 632.757 608.473 631.648 606.069C630.213 
                            603.017 628.257 600.224 627.409 596.911Z"
              style={{ visibility: 'hidden' }}
            />
            <circle
              className="st57"
              cx="651.995"
              cy="595"
              r="12.25"
              style={{ fill: 'black', opacity: tooth15Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth15Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth15Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M614.7 597.4C613.2 591.1 614.4 584.8 617.9 579.1C620.7 574.6 624.8 570.5 629.4 567.1C636 562.2 644.3 558.2 653.4 559.2C658.3 559.7 662.4 561.7 666.7 563.4C670.4 564.9 674.5 566.3 677.9 568.2C681.9 570.4 685 573.4 686.9 576.7C689 580.5 689.4 584.6 689.1 588.8C688.6 595.7 686.3 602.2 683.1 608.3C680.7 612.8 678 617.1 674.7 621.3C672.5 624.2 669.9 627 666.4 629C662 631.5 656.7 632.6 651.5 632.9C647 633.1 642.4 632.7 638.1 631.2C633 629.4 628.9 626.2 626.4 622.5C624 619 622.9 615.2 621.2 611.5C619 606.8 616 602.5 614.7 597.4Z"
            ></path>
            <path
              className="st47"
              d="M627.413 596.911C626.435 592.82 627.218 588.728 629.501 585.025C631.327 582.103 634.001 579.44 637.002 577.231C641.307 574.049 646.721 571.451 652.656 572.1C655.852 572.425 658.527 573.724 661.332 574.828C663.745 575.802 666.419 576.712 668.637 577.946C671.246 579.375 673.268 581.323 674.507 583.467C675.877 585.935 676.138 588.598 675.942 591.326C675.616 595.807 674.116 600.029 672.029 603.991C670.463 606.914 668.702 609.707 666.55 612.435C665.115 614.318 663.419 616.137 661.136 617.436C658.266 619.06 654.809 619.774 651.417 619.969C648.482 620.099 645.481 619.839 642.677 618.865C639.35 617.696 636.676 615.617 635.045 613.214C633.48 610.941 632.762 608.473 631.653 606.069C630.218 603.017 628.261 600.224 627.413 596.911Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth15Diagnozis.culttab &&
                !tooth15Diagnozis.abutment &&
                !tooth15Diagnozis.implant &&
                !tooth15Diagnozis.apex &&
                !tooth15Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M692.5,568.1c0-0.1-0.1-0.1-0.1-0.2c-2.2-4.9-5.9-9.1-10.5-12.4c-4.1-2.8-8.8-4.8-13.2-7
                            c-5-2.5-9.8-5.4-15.5-6.2c-10.6-1.5-20.2,4.2-27.9,11.2c-2,1.8-3.9,3.7-5.6,5.8c-3,3.5-5.7,7.4-7.7,11.5c-4,8.2-5.3,17.3-3.5,26.4
                            c1.5,7.4,5.1,13.6,7.6,20.4c1.2,3.3,2.2,6.7,3.5,10c0.8,2,1.6,4,2.7,5.8c3.1,5.4,7.8,10.1,13.8,12.7c5,2.2,10.3,2.8,15.6,2.5
                            c6.1-0.3,12.3-1.9,17.4-5.4c4.1-2.8,7.1-6.9,9.7-11c0.2-0.2,0.3-0.5,0.5-0.8c3.6-5.9,6.6-11.8,9.2-18c3.7-8.8,6.3-18.2,6.7-28.1
                            C695.4,579.4,694.9,573.5,692.5,568.1z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth15.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M648.354 537.011C650.1 536.866 651.877 538.196 653.681 538.458C656.566 538.847 659.218 538.528 661.781 539.73C664.383 540.95 666.893 542.413 669.464 543.755C671.499 544.845 673.635 547.188 675.744 548.304C678.186 549.597 680.59 550.969 682.755 552.568C685.083 554.259 687.154 554.965 688.926 557.167C690.768 559.456 692.287 563.257 693.436 565.894C694.735 568.999 696.56 572.232 696.931 575.549C697.271 578.595 696.217 581.711 696.047 584.864C695.848 588.48 695.411 593.314 694.775 596.79C694.175 600.071 693.398 602.002 692.477 605.158C691.455 608.661 690.256 613.374 688.926 616.723C687.977 619.073 686.989 620.102 685.948 622.389C684.535 625.491 684.1 628.539 682.461 631.549C681.682 632.98 679.799 634.401 678.958 635.816C677.966 637.544 676.905 640.536 675.744 642.158C673.848 644.805 672.758 645.944 670.182 647.888C668.284 649.313 665.171 650.447 663.048 651.337C661.242 652.094 659.376 653.961 657.484 654.391C655.48 654.847 653.446 653.848 651.426 654.002C648.622 654.167 645.785 655.36 642.984 654.892C640.451 654.469 637.947 652.454 635.524 651.337C632.255 649.813 629.332 647.648 626.868 645.066C624.769 642.867 621.929 640.365 620.565 637.698C619.16 634.991 618.131 632.17 617.206 629.31C616.256 626.372 615.416 623.392 614.394 620.452C613.092 616.778 612.599 614.547 611.178 610.951C609.749 607.336 608.468 602.355 607.754 598.347C607.156 595.027 606.919 591.707 607.027 588.423C607.149 584.712 606.635 579.76 607.609 576.193C608.338 573.523 610.372 572.196 611.552 569.656C612.689 567.242 612.933 564.9 614.394 562.652C615.755 560.556 617.239 558.541 618.817 556.622C620.494 554.582 623.349 552.65 625.199 550.843C626.425 549.641 627.7 547.186 629.021 546.077C630.572 544.775 632.185 543.555 633.854 542.457C636.252 540.879 638.764 540.839 641.373 539.881C643.633 539.051 645.964 537.21 648.354 537.011ZM617.897 579.099C614.397 584.799 613.197 591.099 614.697 597.399C615.897 602.499 618.997 606.799 621.197 611.499C622.897 615.199 623.997 618.999 626.397 622.499C628.897 626.199 632.997 629.399 638.097 631.199C642.397 632.699 646.997 633.099 651.497 632.899C656.697 632.599 661.997 631.499 666.397 628.999C669.897 626.999 672.497 624.199 674.697 621.299C677.997 617.099 680.697 612.799 683.097 608.299C686.297 602.199 688.597 595.699 689.097 588.799C689.397 584.599 688.997 580.499 686.897 576.699C684.997 573.399 681.897 570.399 677.897 568.199C674.497 566.299 670.397 564.899 666.697 563.399C662.397 561.699 658.297 559.699 653.397 559.199C644.297 558.199 635.997 562.199 629.397 567.099C624.797 570.499 620.697 574.599 617.897 579.099Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M648.354 537.011C650.1 536.866 651.877 538.196 653.681 538.458C656.566 538.847 659.218 538.528 661.781 539.73C664.383 540.95 666.893 542.413 669.464 543.755C671.499 544.845 673.635 547.188 675.744 548.304C678.186 549.597 680.59 550.969 682.755 552.568C685.083 554.259 687.154 554.965 688.926 557.167C690.768 559.456 692.287 563.257 693.436 565.894C694.735 568.999 696.56 572.232 696.931 575.549C697.271 578.595 696.217 581.711 696.047 584.864C695.848 588.48 695.411 593.314 694.775 596.79C694.175 600.071 693.398 602.002 692.477 605.158C691.455 608.661 690.256 613.374 688.926 616.723C687.977 619.073 686.989 620.102 685.948 622.389C684.535 625.491 684.1 628.539 682.461 631.549C681.682 632.98 679.799 634.401 678.958 635.816C677.966 637.544 676.905 640.536 675.744 642.158C673.848 644.805 672.758 645.944 670.182 647.888C668.284 649.313 665.171 650.447 663.048 651.337C661.242 652.094 659.376 653.961 657.484 654.391C655.48 654.847 653.446 653.848 651.426 654.002C648.622 654.167 645.785 655.36 642.984 654.892C640.451 654.469 637.947 652.454 635.524 651.337C632.255 649.813 629.332 647.648 626.868 645.066C624.769 642.867 621.929 640.365 620.565 637.698C619.16 634.991 618.131 632.17 617.206 629.31C616.256 626.372 615.416 623.392 614.394 620.452C613.092 616.778 612.599 614.547 611.178 610.951C609.749 607.336 608.468 602.355 607.754 598.347C607.156 595.027 606.919 591.707 607.027 588.423C607.149 584.712 606.635 579.76 607.609 576.193C608.338 573.523 610.372 572.196 611.552 569.656C612.689 567.242 612.933 564.9 614.394 562.652C615.755 560.556 617.239 558.541 618.817 556.622C620.494 554.582 623.349 552.65 625.199 550.843C626.425 549.641 627.7 547.186 629.021 546.077C630.572 544.775 632.185 543.555 633.854 542.457C636.252 540.879 638.764 540.839 641.373 539.881C643.633 539.051 645.964 537.21 648.354 537.011ZM617.897 579.099C614.397 584.799 613.197 591.099 614.697 597.399C615.897 602.499 618.997 606.799 621.197 611.499C622.897 615.199 623.997 618.999 626.397 622.499C628.897 626.199 632.997 629.399 638.097 631.199C642.397 632.699 646.997 633.099 651.497 632.899C656.697 632.599 661.997 631.499 666.397 628.999C669.897 626.999 672.497 624.199 674.697 621.299C677.997 617.099 680.697 612.799 683.097 608.299C686.297 602.199 688.597 595.699 689.097 588.799C689.397 584.599 688.997 580.499 686.897 576.699C684.997 573.399 681.897 570.399 677.897 568.199C674.497 566.299 670.397 564.899 666.697 563.399C662.397 561.699 658.297 559.699 653.397 559.199C644.297 558.199 635.997 562.199 629.397 567.099C624.797 570.499 620.697 574.599 617.897 579.099Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M648.497 550.063C650.122 549.95 651.777 550.984 653.456 551.187C656.142 551.489 658.611 551.241 660.997 552.175C663.42 553.123 665.757 554.259 668.15 555.302C670.045 556.149 672.034 557.969 673.997 558.836C676.271 559.84 678.509 560.906 680.525 562.148C682.692 563.461 684.62 564.01 686.27 565.72C687.985 567.498 689.399 570.451 690.469 572.499C691.678 574.911 693.377 577.423 693.723 579.999C694.04 582.365 693.058 584.786 692.899 587.235C692.715 590.044 692.308 593.799 691.716 596.499C691.157 599.048 690.433 600.548 689.576 602.999C688.624 605.72 687.508 609.381 686.27 611.982C685.387 613.808 684.466 614.607 683.497 616.384C682.182 618.793 681.777 621.161 680.251 623.499C679.525 624.611 677.773 625.715 676.989 626.814C676.066 628.156 675.078 630.48 673.997 631.74C672.232 633.796 671.217 634.681 668.819 636.191C667.052 637.298 664.154 638.179 662.177 638.871C660.496 639.458 658.759 640.909 656.997 641.243C655.131 641.597 653.238 640.821 651.356 640.941C648.746 641.069 646.105 641.995 643.497 641.632C641.139 641.304 638.808 639.738 636.551 638.871C633.508 637.687 630.787 636.005 628.492 633.999C626.539 632.291 623.895 630.348 622.624 628.275C621.316 626.173 620.358 623.982 619.497 621.76C618.612 619.478 617.831 617.163 616.879 614.879C615.667 612.025 615.208 610.292 613.885 607.499C612.554 604.691 611.362 600.822 610.697 597.708C610.14 595.129 609.92 592.55 610.021 589.999C610.134 587.117 609.656 583.27 610.562 580.499C611.241 578.426 613.134 577.394 614.233 575.422C615.292 573.546 615.519 571.727 616.879 569.981C618.146 568.353 619.528 566.788 620.997 565.297C622.558 563.712 625.217 562.211 626.939 560.808C628.08 559.874 629.268 557.967 630.497 557.106C631.941 556.095 633.443 555.147 634.997 554.293C637.229 553.068 639.569 553.037 641.997 552.292C644.101 551.648 646.271 550.218 648.497 550.063ZM617.896 579.098C614.396 584.798 613.196 591.099 614.696 597.399C615.896 602.499 618.996 606.799 621.196 611.499C622.896 615.199 623.996 618.999 626.396 622.499C628.896 626.199 632.996 629.399 638.096 631.199C642.396 632.699 646.996 633.099 651.496 632.899C656.696 632.599 661.996 631.498 666.396 628.998C669.896 626.998 672.496 624.198 674.696 621.298C677.996 617.098 680.696 612.798 683.096 608.298C686.296 602.198 688.596 595.698 689.096 588.798C689.396 584.598 688.996 580.499 686.896 576.699C684.996 573.399 681.896 570.399 677.896 568.199C674.496 566.299 670.396 564.899 666.696 563.399C662.396 561.699 658.296 559.699 653.396 559.199C644.296 558.199 635.996 562.198 629.396 567.098C624.796 570.498 620.696 574.598 617.896 579.098Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling"
            style={{
              visibility:
                !tooth15Diagnozis.culttab &&
                !tooth15Diagnozis.abutment &&
                !tooth15Diagnozis.implant &&
                !tooth15Diagnozis.shaper &&
                !tooth15Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС ЦЕНТР*/}
            <g
              id="s_header_15_5"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M636,611.8c2.7,4.4,6.4,7.9,11,8.6c6.3,0.9,11.3-4.1,14.8-10.1c2.7-4.6,4.5-9.6,5.3-12.9
                                c1.2-4.7,2.2-9.6,1.4-13.8c-0.5-2.5-1.6-4.8-3.7-6.6c-5.6-4.9-12.5-6.1-12.5-6.1c-8.6-1.7-14,3.3-16.2,5.4
                                c-0.4,0.3-0.7,0.7-1.1,1.2v0c-2,2.7-4.1,7.9-4.5,14.9C630.3,597.3,632.2,605.6,636,611.8z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth15.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth15.seal_center ? `seal-fill ${teethDiagnozis.tooth15.seal_center_color}` : ''}
                                `}
                d="M636,611.8c2.7,4.4,6.4,7.9,11,8.6c6.3,0.9,11.3-4.1,14.8-10.1c2.7-4.6,4.5-9.6,5.3-12.9
                                c1.2-4.7,2.2-9.6,1.4-13.8c-0.5-2.5-1.6-4.8-3.7-6.6c-5.6-4.9-12.5-6.1-12.5-6.1c-8.6-1.7-14,3.3-16.2,5.4
                                c-0.4,0.3-0.7,0.7-1.1,1.2v0c-2,2.7-4.1,7.9-4.5,14.9C630.3,597.3,632.2,605.6,636,611.8z"
              />
            </g>
            {/*КАРИЕС LEFT*/}
            <g
              id="s_header_15_4"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M608.5,597.2c1.5,7.4,5.1,13.6,7.6,20.4c1.2,3.3,2.2,6.7,3.5,10c8.7-5.6,13.8-11.9,16.4-15.8
                                c-3.8-6.3-5.7-14.5-5.4-19.4c0.4-7,2.5-12.2,4.5-14.9v0c-5.2-8.7-11.6-15-15.4-18.3c-3,3.5-5.7,7.4-7.7,11.5
                                C608,579,606.7,588.1,608.5,597.2z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth15.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth15.seal_left ? `seal-fill ${teethDiagnozis.tooth15.seal_left_color}` : ''}
                                `}
                d="M608.5,597.2c1.5,7.4,5.1,13.6,7.6,20.4c1.2,3.3,2.2,6.7,3.5,10c8.7-5.6,13.8-11.9,16.4-15.8
                                c-3.8-6.3-5.7-14.5-5.4-19.4c0.4-7,2.5-12.2,4.5-14.9v0c-5.2-8.7-11.6-15-15.4-18.3c-3,3.5-5.7,7.4-7.7,11.5
                                C608,579,606.7,588.1,608.5,597.2z"
              />
            </g>
            {/*КАРИЕС НИЗ*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
            >
              <path
                className="st7"
                d="M619.6,627.7c0.8,2,1.6,4,2.7,5.8c3.1,5.4,7.8,10.1,13.8,12.7c5,2.2,10.3,2.8,15.6,2.5
                                c6.1-0.3,12.3-1.9,17.4-5.4c4.1-2.8,7.1-6.9,9.7-11c0.2-0.2,0.3-0.5,0.5-0.8c-5.1-7.6-13.3-16.8-17.4-21.2
                                c-3.5,5.9-8.5,11-14.8,10.1c-4.6-0.7-8.3-4.1-11-8.6C633.4,615.8,628.3,622.1,619.6,627.7z"
              />
              <path
                className={`st8 caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth15.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth15.seal_top ? `seal-fill ${teethDiagnozis.tooth15.seal_top_color}` : ''}
                                `}
                d="M619.6,627.7c0.8,2,1.6,4,2.7,5.8c3.1,5.4,7.8,10.1,13.8,12.7c5,2.2,10.3,2.8,15.6,2.5
                                c6.1-0.3,12.3-1.9,17.4-5.4c4.1-2.8,7.1-6.9,9.7-11c0.2-0.2,0.3-0.5,0.5-0.8c-5.1-7.6-13.3-16.8-17.4-21.2
                                c-3.5,5.9-8.5,11-14.8,10.1c-4.6-0.7-8.3-4.1-11-8.6C633.4,615.8,628.3,622.1,619.6,627.7z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_15_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st7"
                d="M661.8,610.3c4,4.3,12.3,13.5,17.4,21.2c3.6-5.9,6.6-11.8,9.2-18c3.7-8.8,6.3-18.2,6.7-28.1
                                c0.3-6-0.2-11.9-2.6-17.3c-5.1,2.8-16.5,9.1-24,15.5c0.8,4.2-0.2,9.1-1.4,13.8C666.3,600.7,664.5,605.8,661.8,610.3z"
              />
              <path
                className={`
                                    st8 target caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth15.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth15.seal_right ? `seal-fill ${teethDiagnozis.tooth15.seal_right_color}` : ''}
                                `}
                d="M661.8,610.3c4,4.3,12.3,13.5,17.4,21.2c3.6-5.9,6.6-11.8,9.2-18c3.7-8.8,6.3-18.2,6.7-28.1
                                c0.3-6-0.2-11.9-2.6-17.3c-5.1,2.8-16.5,9.1-24,15.5c0.8,4.2-0.2,9.1-1.4,13.8C666.3,600.7,664.5,605.8,661.8,610.3z"
              />
            </g>
            {/*КАРИЕС BOTTOM*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M619.7,559.3c3.8,3.3,10.3,9.5,15.4,18.3c0.4-0.5,0.7-0.9,1.1-1.2c2.2-2.1,7.6-7.1,16.2-5.4
                                c0,0,6.9,1.2,12.5,6.1c2.1,1.8,3.2,4.1,3.7,6.6c7.5-6.4,18.8-12.8,24-15.5c0-0.1-0.1-0.1-0.1-0.2c-2.2-4.9-5.9-9.1-10.5-12.4
                                c-4.1-2.8-8.8-4.8-13.2-7c-5-2.5-9.8-5.4-15.5-6.2c-10.6-1.5-20.2,4.2-27.9,11.2C623.3,555.4,621.5,557.3,619.7,559.3z"
              />
              <path
                className={`
                                    st8 target caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth15.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth15.seal_bottom ? `seal-fill ${teethDiagnozis.tooth15.seal_bottom_color}` : ''}
                                `}
                d="M619.7,559.3c3.8,3.3,10.3,9.5,15.4,18.3c0.4-0.5,0.7-0.9,1.1-1.2c2.2-2.1,7.6-7.1,16.2-5.4
                                c0,0,6.9,1.2,12.5,6.1c2.1,1.8,3.2,4.1,3.7,6.6c7.5-6.4,18.8-12.8,24-15.5c0-0.1-0.1-0.1-0.1-0.2c-2.2-4.9-5.9-9.1-10.5-12.4
                                c-4.1-2.8-8.8-4.8-13.2-7c-5-2.5-9.8-5.4-15.5-6.2c-10.6-1.5-20.2,4.2-27.9,11.2C623.3,555.4,621.5,557.3,619.7,559.3z"
              />
            </g>
            <g className="with">
              {/*Черточка низ лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_left &&
                      !tooth15Diagnozis.seal_top) ||
                    (!tooth15Diagnozis.seal_left && tooth15Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M636.5 612C634.833 614.5 630 620.5 624 624.5"
              />
              {/*Овал лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_left &&
                      !tooth15Diagnozis.seal_center) ||
                    (!tooth15Diagnozis.seal_left &&
                      tooth15Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M636.5 612C632.5 604.667 626.6 587.5 635 577.5"
              />
              {/*Черточка верх лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_left &&
                      !tooth15Diagnozis.seal_bottom) ||
                    (!tooth15Diagnozis.seal_left &&
                      tooth15Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M635 578C633.833 575 630 567.8 624 563"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_center &&
                      !tooth15Diagnozis.seal_bottom) ||
                    (!tooth15Diagnozis.seal_center &&
                      tooth15Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M635 578C645.5 566.001 662.5 574.3 668.5 583.5"
              />
              {/*Черточка верх право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_right &&
                      !tooth15Diagnozis.seal_bottom) ||
                    (!tooth15Diagnozis.seal_right &&
                      tooth15Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M668.5 583.5C670.667 580.667 677.6 574.1 688 570.5"
              />
              {/*Овал черточка право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth15Diagnozis.seal_right &&
                      tooth15Diagnozis.seal_center) ||
                    (tooth15Diagnozis.seal_right &&
                      !tooth15Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M668.5 583.5C674.5 590 664.1 606.5 662.5 610.5"
              />
              {/*Низ черточка право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_right &&
                      !tooth15Diagnozis.seal_top) ||
                    (!tooth15Diagnozis.seal_right && tooth15Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M662.5 610.5C664.167 611.5 669.2 616.2 676 627"
              />
              {/*Овал черточка низ право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_center &&
                      !tooth15Diagnozis.seal_top) ||
                    (!tooth15Diagnozis.seal_center && tooth15Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M662.5 610.5C659 617.833 648.8 628.5 636 612.5"
              />
            </g>
          </g>
          {/*VINIR*/}
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth15Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth15Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth15Diagnozis.vinir_color}`}
                d="M612.373 570.742C614.373 566.642 617.073 562.742 620.073 559.242C621.873 557.242 623.673 555.242 
                                625.673 553.442C633.273 546.442 642.973 540.742 653.573 542.242C659.373 543.042 664.073 545.942 669.073 
                                548.442C673.373 550.642 678.173 552.642 682.273 555.442C686.973 558.642 690.573 562.942 692.773 
                                567.842C692.773 567.942 692.873 567.941 692.873 568.041C695.273 573.441 695.773 579.342 695.473 
                                585.342C695.343 587.909 695.072 590.443 694.679 592.941C692.913 592.941 688.955 592.041 687.251 
                                588.441C687.273 588.116 687.293 587.79 687.31 587.464C687.553 582.685 687.147 577.985 685.201 
                                573.684C685.201 573.604 685.12 573.604 685.12 573.525C683.336 569.622 680.417 566.197 676.605 
                                563.648C673.28 561.418 669.388 559.825 665.9 558.072C661.846 556.081 658.034 553.771 653.331 
                                553.134C644.735 551.939 636.868 556.479 630.705 562.055C629.083 563.489 627.624 565.082 626.164 
                                566.675C623.731 569.463 621.541 572.569 619.92 575.835C617.941 579.818 616.747 584.069 616.448 
                                588.441C614.507 592.441 610.115 593.108 608.162 592.941C607.474 585.221 608.998 577.661 612.373 570.742Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth15Diagnozis.temporary_crown ||
                tooth15Diagnozis.ceramic_crown ||
                tooth15Diagnozis.mceramic_crown ||
                tooth15Diagnozis.metalic_crown ||
                tooth15Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth15Diagnozis.temporary_crown ||
                tooth15Diagnozis.ceramic_crown ||
                tooth15Diagnozis.mceramic_crown ||
                tooth15Diagnozis.metalic_crown ||
                tooth15Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth15Diagnozis.ceramic_crown_color}
                                ${tooth15Diagnozis.mceramic_crown_color}
                                ${tooth15Diagnozis.metalic_crown_color}
                                ${tooth15Diagnozis.zirconia_crown_color}
                            `}
              d="M692.5,568.1c0-0.1-0.1-0.1-0.1-0.2c-2.2-4.9-5.9-9.1-10.5-12.4c-4.1-2.8-8.8-4.8-13.2-7
                            c-5-2.5-9.8-5.4-15.5-6.2c-10.6-1.5-20.2,4.2-27.9,11.2c-2,1.8-3.9,3.7-5.6,5.8c-3,3.5-5.7,7.4-7.7,11.5c-4,8.2-5.3,17.3-3.5,26.4
                            c1.5,7.4,5.1,13.6,7.6,20.4c1.2,3.3,2.2,6.7,3.5,10c0.8,2,1.6,4,2.7,5.8c3.1,5.4,7.8,10.1,13.8,12.7c5,2.2,10.3,2.8,15.6,2.5
                            c6.1-0.3,12.3-1.9,17.4-5.4c4.1-2.8,7.1-6.9,9.7-11c0.2-0.2,0.3-0.5,0.5-0.8c3.6-5.9,6.6-11.8,9.2-18c3.7-8.8,6.3-18.2,6.7-28.1
                            C695.4,579.4,694.9,573.5,692.5,568.1z"
            />
            {/*FISSURE*/}
            <path
              className={`st3 fissure ${tooth15Diagnozis.fissure ? 'diagnoze' : tooth15Diagnozis.fissure ? 'hidden' : ''}`}
              d="M654.2,602.9c-10.1,0-20-1.8-28.9-5.3l0.4-1c9.5,3.7,20.2,5.5,30.9,5.2c7.6-0.2,14.7-1.5,20.9-3.8l0.4,1
                            c-6.4,2.3-13.5,3.6-21.3,3.8C655.8,602.9,655,602.9,654.2,602.9z"
            />
            <path
              className={`st3 fissure ${tooth15Diagnozis.fissure ? 'diagnoze' : tooth15Diagnozis.fissure ? 'hidden' : ''}`}
              d="M676.9,604.7c-3.3-1.6-9.3-2.4-15.5-2.3c-2.1,0.1-4.2,0.2-6.1,0.5l-0.2-1.1c2-0.3,4.1-0.5,6.2-0.5
                            c6.4-0.1,12.5,0.8,16,2.4L676.9,604.7z"
            />
          </g>
          {/* FISSURES */}
          <g
            className="fissures"
            style={{
              visibility:
                !tooth15Diagnozis.culttab &&
                !tooth15Diagnozis.abutment &&
                !tooth15Diagnozis.implant &&
                !tooth15Diagnozis.apex &&
                !tooth15Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth15Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M654.2,602.9c-10.1,0-20-1.8-28.9-5.3l0.4-1c9.5,3.7,20.2,5.5,30.9,5.2c7.6-0.2,14.7-1.5,20.9-3.8l0.4,1
                            c-6.4,2.3-13.5,3.6-21.3,3.8C655.8,602.9,655,602.9,654.2,602.9z"
            />
            <path
              className={`st3 fissure ${tooth15Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M676.9,604.7c-3.3-1.6-9.3-2.4-15.5-2.3c-2.1,0.1-4.2,0.2-6.1,0.5l-0.2-1.1c2-0.3,4.1-0.5,6.2-0.5
                            c6.4-0.1,12.5,0.8,16,2.4L676.9,604.7z"
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
              id="dentin_v_15"
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth15Diagnozis.implant &&
                  !tooth15Diagnozis.apex &&
                  !tooth15Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth15Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M690,418.1c-0.6,6.4-1.4,12.8-2.6,19.2c-2.1,11.3-5.2,22.4-9.2,33.3l-26.2-6.6l-23.9,2.9
                                c-3.5-9.1-5.8-18.6-6.8-28.2c-1.2-10.9-0.8-21.8,0.1-32.7c0.8-2.1,1.7-4.2,2.9-6.2c5-8.9,13.6-15.4,23.7-17.2
                                c1.4-0.3,2.8-0.4,4.2-0.5c3.2-0.1,6.3,0.2,9.3,1.1c0.7,0.2,1.4,0.5,2.1,0.7c3.8,1.5,7.1,3.8,10.1,6.5c7.8,7,13.1,16.3,15.9,26.2
                                C689.8,417.1,689.9,417.6,690,418.1z"
              />
            </g>
            <g
              id="dentin_n_15"
              className="hImplant hEmpty"
              style={{
                visibility:
                  !tooth15Diagnozis.implant &&
                  !tooth15Diagnozis.abutment &&
                  !tooth15Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_15"
                className={`st10 change-color ${tooth15Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M690.3,415c-0.1,1-0.1,2.1-0.2,3.1c-0.1-0.5-0.2-1-0.4-1.5
                                c-2.8-10-8-19.2-15.9-26.2c-3-2.7-6.3-5-10.1-6.5c-0.7-0.3-1.4-0.5-2.1-0.7c-3-0.9-6.2-1.3-9.3-1.1c-1.4,0.1-2.8,0.2-4.2,0.5
                                c-10.1,1.8-18.7,8.3-23.7,17.2c-1.1,2-2,4.1-2.9,6.2c0.2-2.4,0.4-4.8,0.7-7.2c2.2-22.4,5.8-44.8,8.3-67.2
                                c3.3-30.1,4.2-60.5,4.3-90.8c0-9.4,2.2-19.5,10.1-21.1c0.2,0,0.4-0.1,0.6-0.1c8.5-1.2,13.5,8.2,16,17.7c4.4,17,8.5,34.1,11.9,51.3
                                c4.4,22.2,7.7,44.6,11.1,66.9c1.9,12.2,3.8,24.5,4.8,36.7C689.9,399.7,690.3,407.3,690.3,415z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.pulpit ? 'pulpit' : ''} ${tooth15Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M666,421.6c0,1.5-0.1,3-0.2,4.5c-0.4,3.8-1.2,7.6-2.6,11.2
                                c-2.6-2-5.8-3.2-9.1-3.4c-3.2-0.2-6.4,0.6-9.1,2.2c-1-2.3-1.5-4.8-1.7-7.2c-0.2-2.4,0-4.9,0.6-7.2c2.1-16.2,4.2-39.5,4.2-39.5
                                s2.8-0.2,4.2-0.3c3.1-0.2,6.3,0.2,9.3,1.1c0.7,0.2,1.4,0.5,2,0.7C664.5,396.3,665.3,408.9,666,421.6z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.pulpit ? 'pulpit' : ''} ${tooth15Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M663.7,383.7c-0.7-0.3-1.4-0.5-2.1-0.8c-3-0.9-6.2-1.2-9.3-1.1
                                c-1.4,0.1-2.8,0.2-4.2,0.5c1.6-18.8,2.5-37.8,2.7-56.7c0.1-7.9,0.1-15.9-0.1-23.8c1.6-0.2,3.4-0.2,5.4,0h0
                                c1.3,11.4,2.5,22.8,3.6,34.3C661.3,352,662.6,367.8,663.7,383.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.channel_class} ${tooth15Diagnozis.pulpit ? 'pulpit' : ''} ${tooth15Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M656.2,301.9L656.2,301.9c-2-0.2-3.8-0.2-5.5,0c-0.5-27.6-2.4-55.1-5.8-82.5
                                C649.2,246.7,653,274.3,656.2,301.9z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage15 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth15Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M621.6 438.6C622.6 448.2 624.9 457.7 628.4 466.8L652.3 463.9L678.5 470.6C682.5 459.7 685.6 448.6 687.7 
                            437.3C688.9 431 689.7 424.6 690.3 418.2C690.2 417.8 689.6 417.2 689.5 416.7C686.7 406.7 681.5 397.5 673.6 
                            390.5C671 388.1 668.1 386 664.8 384.6C664.5 384.4 664.2 384.3 663.9 384.2C663.8 384.1 663.6 384.1 663.5 
                            384C662.8 383.7 662.1 383.5 661.4 383.3C658.9 382.5 656.3 382.2 653.7 382.2C653.3 382.2 652.9 382.2 652.5 
                            382.2C651.1 382.3 649.7 382.4 648.3 382.7C647.8 382.8 647.3 382.9 646.8 383C637.4 385.1 629.3 391.4 624.6 
                            399.9C623.5 401.9 622.6 404 621.7 406.1C620.8 416.8 620.4 427.7 621.6 438.6Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M644.2 464.9L652 464H652.1L664.5 467.2L655.4 296C655.2 294.6 655 293.1 654.8 291.3C654.4 290.7 653.8 290.3 
                            653 290.2C651.7 290.1 650.5 291.1 650.5 292.4V293.3V293.4L644.2 464.9Z"
              style={{ fill: tooth15Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth15Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth15Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M646.8,382.8c0.5-0.1,1-0.2,1.5-0.3c1.4-0.3,2.8-0.4,4.2-0.5c0.4,0,0.8,0,1.2,0c2.6,0,5.2,0.4,7.7,1.1
                            c0.7,0.2,1.4,0.5,2.1,0.7c0.2,0.1,0.3,0.1,0.4,0.2c0.3,0.1,0.6,0.3,0.9,0.4l-9.6-92.3c-0.1-1.1-1-2-2.2-2.1
                            c-1.3-0.1-2.5,0.9-2.5,2.2L646.8,382.8z"
            />
            <path
              className="st15"
              d="M621.6,438.6c1,9.6,3.3,19.1,6.8,28.2l23.9-2.9l26.2,6.7c4-10.9,7.1-22,9.2-33.3c1.2-6.3,2-12.7,2.6-19.1
                            c-0.1-0.4-0.7-1-0.8-1.5c-2.8-10-8-19.2-15.9-26.2c-2.6-2.4-5.5-4.5-8.8-5.9c-0.3-0.2-0.6-0.3-0.9-0.4c-0.1-0.1-0.3-0.1-0.4-0.2
                            c-0.7-0.3-1.4-0.5-2.1-0.7c-2.5-0.8-5.1-1.1-7.7-1.1c-0.4,0-0.8,0-1.2,0c-1.4,0.1-2.8,0.2-4.2,0.5c-0.5,0.1-1,0.2-1.5,0.3
                            c-9.4,2.1-17.5,8.4-22.2,16.9c-1.1,2-2,4.1-2.9,6.2C620.8,416.8,620.4,427.7,621.6,438.6z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth15Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth15Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M687.7,410.2c-0.6-1.6-1.4-3.2-2.2-4.7c-2.9-5.6-6.7-10.7-11.5-15c-3.5-3.2-7.6-5.9-12.2-7.3
                            c-3-0.9-6.2-1.3-9.3-1.1c-10.9,0.5-20.5,6.5-26.4,15.2c-0.5,0.8-1,1.6-1.5,2.4c-0.5,0.9-0.9,1.8-1.4,2.7c-0.4,0.8-0.7,1.6-1,2.4
                            v-0.6l16.3-31.1l31-0.7L687.7,410.2z"
            />
            <path
              className="st17"
              d="M690.3,418.1c-0.6,6.4-1.4,12.8-2.6,19.1c-2.1,11.3-5.2,22.4-9.2,33.3l-26.2-6.7l-23.9,2.9
                            c-3.5-9.1-5.8-18.6-6.8-28.2c-1.1-10.3-0.8-20.7,0-31c0-0.5,0.1-1.1,0.1-1.6c0.2-0.4,0.3-0.8,0.5-1.2c0.3-0.8,0.7-1.6,1-2.4
                            c0.4-0.9,0.9-1.8,1.4-2.7c0.5-0.8,1-1.6,1.5-2.4c5.9-8.8,15.5-14.7,26.4-15.2c3.2-0.2,6.3,0.2,9.3,1.1c4.6,1.4,8.7,4.1,12.2,7.3
                            c4.8,4.3,8.6,9.4,11.5,15c0.8,1.5,1.5,3.1,2.2,4.7c0.9,2.1,1.6,4.3,2.2,6.5C690,417.1,690.2,417.6,690.3,418.1z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M678.038 412.934C678.407 415.324 676.587 417.493 674.168 417.543L638.718 418.285C636.301 418.336 634.392 416.246 634.659 413.843L639.059 374.327C639.282 372.327 640.956 370.803 642.968 370.77L667.964 370.355C669.963 370.321 671.679 371.768 671.984 373.743L678.038 412.934Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth15Diagnozis.abutment ||
                tooth15Diagnozis.implant ||
                tooth15Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M675.7,372l-42.1,1c-0.4-22.3-0.3-44.6,0.4-66.9c0.6-21.6,1.7-43.2,3.3-64.7c3.3-4,8-6.4,13.1-6.5
                            c5.4-0.2,10.7,2.1,14.7,6.3c2.3,22.5,4.4,45.1,6.2,67.6C673,329.9,674.5,351,675.7,372z"
            />
            <line
              className="st19"
              x1="678.8"
              y1="353.7"
              x2="630.2"
              y2="361.1"
            />
            <line
              className="st19"
              x1="678.3"
              y1="328.1"
              x2="629.6"
              y2="335.5"
            />
            <line className="st19" x1="676.6" y1="302.5" x2="628" y2="309.9" />
            <line className="st19" x1="676" y1="276.9" x2="627.4" y2="284.3" />
            <line
              className="st19"
              x1="675.5"
              y1="251.3"
              x2="626.8"
              y2="258.8"
            />
          </g>
          <g
            className="toutline hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth15Diagnozis.culttab &&
                !tooth15Diagnozis.abutment &&
                !tooth15Diagnozis.implant &&
                !tooth15Diagnozis.shaper &&
                !tooth15Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M694.8,440.6c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4
                            c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3c-3-0.9-6.2-1.3-9.3-1.1
                            c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                            c-2.2,6.9-2.7,14.3-1.5,21.4c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4c3.6,5,7.1,10.3,12.9,12.9
                            c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7c0.5-0.5,1-0.9,1.5-1.4c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5
                            C695.7,454.8,695.9,447.6,694.8,440.6z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth15Diagnozis.culttab && !tooth15Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M614.953 422.955C613.277 426.605 611.599 430.256 610.421 434.1C608.221 441 607.721 448.3 608.921 
                            455.4C610.621 460.3 612.921 465 615.721 469.4C618.194 473.369 621.048 477.085 623.897 480.794C625.426 482.785 626.954 484.774 
                            628.421 486.8C628.471 486.85 628.521 486.925 628.571 487C628.621 487.075 628.671 487.15 628.721 487.2C628.97 487.546 629.219 
                            487.893 629.468 488.241C632.817 492.92 636.223 497.68 641.621 500.1C646.421 502.3 652.021 502.1 656.821 500C661.574 497.846 
                            665.113 494.039 668.667 490.215C669.9 488.889 671.134 487.561 672.421 486.3C672.671 486.05 672.921 485.825 673.171 485.6C673.421 
                            485.375 673.671 485.15 673.921 484.9C675.635 483.332 677.429 481.843 679.22 480.357C682.34 477.768 685.453 475.186 688.121 
                            472.2C690.921 469.1 693.121 465.5 694.721 461.7C696.021 454.7 696.121 447.6 695.121 440.6C694.615 437.2 693.847 433.853 693.082 
                            430.52C692.79 429.245 692.498 427.972 692.221 426.7C691.971 425.65 691.746 424.575 691.521 423.5C691.296 422.425 691.071 421.35 
                            690.821 420.3C690.681 419.456 690.441 418.563 690.207 417.691C690.108 417.322 690.01 416.956 689.921 416.6C687.121 406.7 681.821 
                            397.4 674.021 390.4C670.521 387.2 666.421 384.5 661.821 383.1C658.821 382.2 655.621 381.8 652.521 382C640.621 382.6 630.321 
                            389.6 624.621 399.7C622.432 403.531 620.992 407.695 619.541 411.888C619.402 412.292 619.262 412.696 619.121 413.1C618.722 
                            414.198 618.322 415.196 617.923 416.195L617.921 416.2C617.009 418.48 615.981 420.717 614.953 422.955ZM631.823 402.366C636.171 
                            394.761 644.027 389.49 653.104 389.038C655.468 388.887 657.909 389.189 660.198 389.866C663.706 390.921 666.834 392.954 669.503 
                            395.363C675.453 400.634 679.495 407.637 681.631 415.092C681.983 416.482 682.301 417.877 682.613 419.273C682.912 420.611 681.807 
                            421.85 680.444 421.706L628.92 416.249C627.58 416.107 626.755 414.706 627.229 413.445C627.544 412.61 627.847 411.769 628.15 
                            410.928C629.203 407.999 630.257 405.071 631.823 402.366Z"
            />
            <path
              className={`st7 ${tooth15Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M652.885 389.038C643.808 389.49 635.952 394.761 631.604 402.366C629.589 405.848 628.422 409.7 627.011 413.445C626.536 414.706 
                            627.362 416.107 628.701 416.249L680.226 421.706C681.589 421.85 682.693 420.611 682.394 419.273C682.082 417.877 681.764 416.482 
                            681.412 415.092C679.277 407.637 675.234 400.634 669.284 395.363C666.615 392.954 663.487 390.921 659.979 389.866C657.691 389.189 
                            655.25 388.887 652.885 389.038Z"
            />
            <path
              className={`st60
                                    ${tooth15Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth15Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth15Diagnozis.seal_cervical_color}
                                `}
              d="M652.885 389.038C643.808 389.49 635.952 394.761 631.604 402.366C629.589 405.848 628.422 409.7 627.011 
                            413.445C626.536 414.706 627.362 416.107 628.701 416.249L680.226 421.706C681.589 421.85 682.693 420.611 
                            682.394 419.273C682.082 417.877 681.764 416.482 681.412 415.092C679.277 407.637 675.234 400.634 669.284 
                            395.363C666.615 392.954 663.487 390.921 659.979 389.866C657.691 389.189 655.25 388.887 652.885 389.038Z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth15.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M694 435.999L692 434.499L690.5 431.499L689 428.999V424.999L687.5 422.499L686.5 
                            418.499V416.499L685 414.999L684 410.999L682.5 407.999L681 405.999V403.999L679 399.999L676.5 397.999L675 
                            395.499L671 392.499L668.5 389.999L665 388.499L662 386.999H657.5L655.5 385.499H650.5L648 386.999H645.5L641 
                            388.499L638 389.999L636.5 392.499L633.5 393.499L631 395.499L628 399.999L626.5 401.499L624 406.999L622.5 
                            411.999L620.5 416.499L619.5 420.499L618 422.499L616.5 424.999L612.5 427.499V425.999L613.5 422.999V420.499L614.5 
                            418.499L616.5 414.999V411.999L618 408.999L619 405.499V402.999L619.5 401.499L620 397.499L620.5 395.499V392.499L621.5 
                            389.999L622.5 386.999V383.999L624 382.499L626.5 379.999L630 375.999L633.5 373.999L636.5 370.499L639.5 
                            369.499H642.5L645.5 366.999L650.5 365.499L654 366.999L657.5 365.499L662 366.999H665L668.5 369.499L672.5 
                            370.499L676.5 372.499L679 375.999L682.5 379.999H684L686.5 382.499L689 385.499V389.999L690.5 393.499L691 
                            395.999V398.999L692 401.499V404.499L691 407.999L692 409.999V413.499L693 416.499V420.499L694 424.999L694.5 
                            427.999V431.499L694 435.999Z"
            />
            <path
              className="st61 level1"
              d="M694 436L692 434.5L690.5 431.5L689 429V425L687.5 422.5L686.5 418.5V416.5L685 415L684 
                            411L682.5 408L681 406V404L679 400L676.5 398L675 395.5L671 392.5L668.5 390L665 388.5L662 387H657.5L655.5 
                            385.5H650.5L648 387H645.5L641 388.5L638 390L636.5 392.5L633.5 393.5L631 395.5L628 400L626.5 401.5L624 
                            407L622.5 412L620.5 416.5L619.5 420.5L618 422.5L616.5 425L612.5 427.5L613.5 425L614.5 422.5V420.5L616.5 
                            418.5L617 414.5L618 412V410L619.5 408V406L620.5 404V401.5V399L621.5 396.5L622.5 395.5L625.5 394.5L626.5 392.5L629.5 
                            391L631 389L636.5 385.5L638 384.5L639.5 383L642 381.5H646.5L649.5 379.5H655.5L660 381.5H663.5L667 383L672.5 
                            384.5L675 387L681 391L682.5 393.5L686.5 395.5L690 399L691 401.5V404V406.5L690.5 408V411L692 415V418.5L693 
                            421.5V423.5L694 426L694.5 428.5L694 431.5V433.5V436Z"
            />
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth15Diagnozis.culttab &&
                !tooth15Diagnozis.abutment &&
                !tooth15Diagnozis.implant &&
                !tooth15Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС RIGHT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st8"
                d="M673.7,485c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5c1.3-7,1.4-14.1,0.4-21.1
                                c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4c-4.2,4-11.3,11.4-13.1,16.6c-0.5,1.6-1,5.2-1.5,9.8
                                C675,457.5,674.1,474.1,673.7,485z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth15.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth15.seal_right ? `seal-fill ${teethDiagnozis.tooth15.seal_right_color}` : ''}
                            `}
                d="M673.7,485c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5c1.3-7,1.4-14.1,0.4-21.1
                                c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4c-4.2,4-11.3,11.4-13.1,16.6c-0.5,1.6-1,5.2-1.5,9.8
                                C675,457.5,674.1,474.1,673.7,485z"
                style={{
                  fill: teethDiagnozis.tooth15.caries_right
                    ? '#606c80'
                    : teethDiagnozis.tooth15.seal_right
                      ? teethDiagnozis.tooth15.seal_right_color
                      : 'transparent',
                }}
              />
            </g>
            {/*КАРИЕС CENTER*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth15.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth15.seal_center ? `seal-fill ${teethDiagnozis.tooth15.seal_center_color}` : ''}
                            `}
                d="M628.5,487.3c3.6,5,7.1,10.3,12.9,12.9c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7
                                c0.5-0.5,1-0.9,1.5-1.4c0.5-10.9,1.3-27.5,2.3-38.2c-5.1-2.3-14.9-6.4-22.1-7.1c-9.7-0.9-19.3,2.1-24.4,4.1
                                C629.4,457,628.8,476.3,628.5,487.3z"
              />
              <path
                className="st8 target"
                d="M628.5,487.3c3.6,5,7.1,10.3,12.9,12.9c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7
                                c0.5-0.5,1-0.9,1.5-1.4c0.5-10.9,1.3-27.5,2.3-38.2c-5.1-2.3-14.9-6.4-22.1-7.1c-9.7-0.9-19.3,2.1-24.4,4.1
                                C629.4,457,628.8,476.3,628.5,487.3z"
                style={{ fill: 'transparent', zIndex: 2000 }}
              />
            </g>

            {/* КАРИЕС LEFT */}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M608.7,455.5c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4
                                c0.3-11,0.9-30.3,1-43.5c0.1-7.7,0-13.4-0.3-14.2c-0.8-2-6.7-11.1-10.3-16.5c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                                C608.1,441,607.5,448.3,608.7,455.5z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth15.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth15.seal_left ? `seal-fill ${teethDiagnozis.tooth15.seal_left_color}` : ''}
                            `}
                d="M608.7,455.5c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4
                                c0.3-11,0.9-30.3,1-43.5c0.1-7.7,0-13.4-0.3-14.2c-0.8-2-6.7-11.1-10.3-16.5c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                                C608.1,441,607.5,448.3,608.7,455.5z"
              />
            </g>

            {/*КАРИЕС TOP*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st58"
                d="M629.2,429.6c0.3,0.8,0.4,6.5,0.3,14.2c5.1-2,14.7-5,24.4-4.1c7.2,0.7,17,4.8,22.1,7.1c0.5-4.6,1-8.2,1.5-9.8
                                c1.7-5.2,8.9-12.6,13.1-16.6c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3
                                c-3-0.9-6.2-1.3-9.3-1.1c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4C622.5,418.5,628.4,427.6,629.2,429.6z"
              />
              <path
                className={`
                                    st8 target caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth15.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth15.seal_bottom ? `seal-fill ${teethDiagnozis.tooth15.seal_bottom_color}` : ''}
                                `}
                d="M629.2,429.6c0.3,0.8,0.4,6.5,0.3,14.2c5.1-2,14.7-5,24.4-4.1c7.2,0.7,17,4.8,22.1,7.1c0.5-4.6,1-8.2,1.5-9.8
                                c1.7-5.2,8.9-12.6,13.1-16.6c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3
                                c-3-0.9-6.2-1.3-9.3-1.1c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4C622.5,418.5,628.4,427.6,629.2,429.6z"
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                d="M629.5 443.999L629 479.999"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_left &&
                      !tooth15Diagnozis.seal_top &&
                      !tooth15Diagnozis.seal_center) ||
                    (tooth15Diagnozis.seal_left &&
                      tooth15Diagnozis.seal_top &&
                      !tooth15Diagnozis.seal_center) ||
                    (!tooth15Diagnozis.seal_left &&
                      tooth15Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              {/*Черточка лево верх*/}
              <path
                className="st54"
                d="M629.5 443.999C629.5 430.999 629.6 424.699 622 417.499"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_left &&
                      !tooth15Diagnozis.seal_bottom) ||
                    (!tooth15Diagnozis.seal_left &&
                      tooth15Diagnozis.seal_bottom &&
                      !tooth15Diagnozis.seal_center) ||
                    (!tooth15Diagnozis.seal_left &&
                      tooth15Diagnozis.seal_bottom &&
                      tooth15Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_bottom &&
                      !tooth15Diagnozis.seal_center) ||
                    (tooth15Diagnozis.seal_right &&
                      tooth15Diagnozis.seal_left &&
                      tooth15Diagnozis.seal_center &&
                      !tooth15Diagnozis.seal_top) ||
                    (!tooth15Diagnozis.seal_top &&
                      !tooth15Diagnozis.seal_bottom &&
                      tooth15Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M629.5 443.999C637 439.833 656.8 434.499 676 446.499"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_right &&
                      !tooth15Diagnozis.seal_bottom) ||
                    (!tooth15Diagnozis.seal_right &&
                      tooth15Diagnozis.seal_bottom &&
                      !tooth15Diagnozis.seal_center) ||
                    (!tooth15Diagnozis.seal_right &&
                      tooth15Diagnozis.seal_bottom &&
                      tooth15Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M676 446.499C677 430.499 679.4 426.799 687 423.999"
              />
              {/*Черточка право низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth15Diagnozis.seal_right &&
                      !tooth15Diagnozis.seal_top &&
                      !tooth15Diagnozis.seal_center) ||
                    (tooth15Diagnozis.seal_right &&
                      tooth15Diagnozis.seal_top &&
                      !tooth15Diagnozis.seal_center) ||
                    (!tooth15Diagnozis.seal_right &&
                      tooth15Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M676 446.999L674 477.499"
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
                visibility: tooth15Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth15Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth15Diagnozis.vinir_color}`}
                d="M694.8 440.6C694.1 435.9 692.9 431.3 691.9 426.7C691.4 424.6 691 422.4 690.5 420.3C690.2 419.1 689.9 417.8 
                                689.6 416.6C686.8 406.6 681.6 397.4 673.7 390.4C670.2 387.2 666.1 384.5 661.5 383.1C658.5 382.2 655.3 381.8 652.2 382C640.4 
                                382.6 630 389.6 624.3 399.7C621.9 403.9 620.5 408.6 618.8 413.1C618.4 414.1 618 415.2 617.6 416.2C615.2 422.2 612.1 427.9 
                                610.1 434.1C607.9 441 607.4 448.4 608.6 455.5C610.4 460.4 612.6 465.1 615.4 469.5C619.2 475.6 623.9 481.1 628.1 486.9C628.2 
                                487 628.3 487.2 628.4 487.3C632 492.3 635.5 497.6 641.3 500.2C646.1 502.4 651.7 502.2 656.5 500.1C663 497.2 667.2 491.3 
                                672.1 486.4C672.6 485.9 673.1 485.5 673.6 485C678.3 480.7 683.6 477 687.8 472.3C690.6 469.2 692.8 465.6 694.4 461.8C695.7 
                                454.8 695.9 447.6 694.8 440.6Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth15Diagnozis.temporary_crown ||
                tooth15Diagnozis.ceramic_crown ||
                tooth15Diagnozis.mceramic_crown ||
                tooth15Diagnozis.metalic_crown ||
                tooth15Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth15Diagnozis.temporary_crown ||
                tooth15Diagnozis.ceramic_crown ||
                tooth15Diagnozis.mceramic_crown ||
                tooth15Diagnozis.metalic_crown ||
                tooth15Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth15Diagnozis.ceramic_crown_color}
                                ${tooth15Diagnozis.mceramic_crown_color}
                                ${tooth15Diagnozis.metalic_crown_color}
                                ${tooth15Diagnozis.zirconia_crown_color}
                            `}
              d="M694.8,440.6c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4
                            c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3c-3-0.9-6.2-1.3-9.3-1.1
                            c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                            c-2.2,6.9-2.7,14.3-1.5,21.4c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4c3.6,5,7.1,10.3,12.9,12.9
                            c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7c0.5-0.5,1-0.9,1.5-1.4c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5
                            C695.7,454.8,695.9,447.6,694.8,440.6z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
