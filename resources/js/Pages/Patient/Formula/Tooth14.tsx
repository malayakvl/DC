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
import PeriodontitStage14 from './periodontit14';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth14() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth14Diagnozis = teethDiagnozis.tooth14;
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
        teethDiagnozis.tooth14.caries_bottom =
          !teethDiagnozis.tooth14.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth14.caries_center =
          !teethDiagnozis.tooth14.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth14.caries_left =
          !teethDiagnozis.tooth14.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth14.caries_right =
          !teethDiagnozis.tooth14.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth14.caries_top = !teethDiagnozis.tooth14.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth14.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth14.seal_center_color = sealColor1;
          teethDiagnozis.tooth14.seal_center = true;
        } else if (
          teethDiagnozis.tooth14.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth14.seal_center_color = sealColor2;
          teethDiagnozis.tooth14.seal_center = true;
        } else if (
          teethDiagnozis.tooth14.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth14.seal_center_color = sealColor3;
          teethDiagnozis.tooth14.seal_center = true;
        } else {
          teethDiagnozis.tooth14.seal_center =
            !teethDiagnozis.tooth14.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth14.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth14.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth14.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth14.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth14.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth14.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth14.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth14.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth14.seal_bottom = true;
        } else {
          teethDiagnozis.tooth14.seal_bottom =
            !teethDiagnozis.tooth14.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth14.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth14.seal_left_color = sealColor1;
          teethDiagnozis.tooth14.seal_left = true;
        } else if (
          teethDiagnozis.tooth14.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth14.seal_left_color = sealColor2;
          teethDiagnozis.tooth14.seal_left = true;
        } else if (
          teethDiagnozis.tooth14.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth14.seal_left_color = sealColor3;
          teethDiagnozis.tooth14.seal_left = true;
        } else {
          teethDiagnozis.tooth14.seal_left = !teethDiagnozis.tooth14.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth14.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth14.seal_right_color = sealColor1;
          teethDiagnozis.tooth14.seal_right = true;
        } else if (
          teethDiagnozis.tooth14.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth14.seal_right_color = sealColor2;
          teethDiagnozis.tooth14.seal_right = true;
        } else if (
          teethDiagnozis.tooth14.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth14.seal_right_color = sealColor3;
          teethDiagnozis.tooth14.seal_right = true;
        } else {
          teethDiagnozis.tooth14.seal_right =
            !teethDiagnozis.tooth14.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth14.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth14.seal_top_color = sealColor1;
          teethDiagnozis.tooth14.seal_top = true;
        } else if (
          teethDiagnozis.tooth14.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth14.seal_top_color = sealColor2;
          teethDiagnozis.tooth14.seal_top = true;
        } else if (
          teethDiagnozis.tooth14.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth14.seal_top_color = sealColor3;
          teethDiagnozis.tooth14.seal_top = true;
        } else {
          teethDiagnozis.tooth14.seal_top = !teethDiagnozis.tooth14.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth14.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth14.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth14.wedge_shaped_defect_color =
          !teethDiagnozis.tooth14.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth14.show) {
        document.getElementById('TH-14').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth54.show) {
        document.getElementById('TH-54').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth14.show) {
        document.getElementById('TH-14').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth54.show) {
          document.getElementById('TH-54').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth14.show) {
        document.getElementById('TH-54').classList.remove('f-tooth-active');
        document.getElementById('TH-14').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth14.show) {
        document.getElementById('TH-14').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth54.show) {
          document.getElementById('TH-54').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="14"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 717.8535 716.1968)"
          className={`st3 st4 st5 ${selectedTooth === 14 ? 'num-active' : ''}`}
        >
          14
        </text>
      </g>
      <g
        id="TH-14"
        className={`f-tooth-init ${(teethDiagnozis.tooth14.show || allTeeth) && !teethDiagnozis.tooth14.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth14.show = !teethDiagnozis.tooth14.show;
            teethDiagnozis.tooth54.show = false;
          }

          dispatch(setSelectedToothNumber(14));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              14,
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
          className={`underlay ${selectedTooth === 14 ? 'selected' : ''}`}
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
            d="M699,241.9c0,0-1,33-1,50s2,52,1,83s-4.1,72.1-4,83.6c0,11.4,6,34.4,10,50.4
                        c4,16-2,38-4,46s-7.1,25-6,50.5c1,25.5,0,107.5,20,122.5c9.8,7.4,24.6,11.3,36.5,6.8c17.9-6.8,18.8-28.9,20.5-44.9
                        c1.4-13.6,1.3-27.3,2-40.9c1-19,9-61,9-74c0-13-16-36-16-51c0-15,15-41,15-58s-2-41-4-58s-12-74-14-93s-5-59-7-69s-7-16-14-20
                        S700,211.9,699,241.9z"
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
                  !tooth14Diagnozis.culttab &&
                  !tooth14Diagnozis.implant &&
                  !tooth14Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className="st24"
                d="M703.6,600.4c-1.5-6-1.5-11.9,0.8-17.4c2.4-5.6,7.2-10.3,12.4-14.1
                                c6.3-4.6,13.6-8.2,21.6-8.2c8.6,0.1,16.1,4.2,22.2,9.4c3.1,2.6,6,5.6,8.1,8.9c2.5,3.8,4,8.1,4,12.6c0,7.4-3.9,13.9-7.4,20.3
                                c-2.5,4.5-4.6,9-7.6,13.5c-1.9,3-4.4,5.9-7.5,8c-4,2.6-8.8,3.7-13.5,4c-4.1,0.2-8.2-0.2-12.1-1.7c-4.6-1.9-8.3-5.2-10.6-9.1
                                c-2.2-3.6-3.2-7.6-4.7-11.4C707.6,610.2,705,605.7,703.6,600.4z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth14Diagnozis?.apex || tooth14Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth14Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth14Diagnozis?.apex ? 'apex' : ''}`}
                d="M703.6 600.4C702.1 594.4 702.1 588.5 704.4 583C706.8 577.4 711.6 572.7 716.8 568.9C723.1 564.3 730.4 560.7 738.4 560.7C747 560.8 754.5 564.9 760.6 570.1C763.7 572.7 766.6 575.7 768.7 579C771.2 582.8 772.7 587.1 
                                772.7 591.6C772.7 599 768.8 605.5 765.3 611.9C762.8 616.4 760.7 620.9 757.7 625.4C755.8 628.4 753.3 631.3 750.2 633.4C746.2 636 
                                741.4 637.1 736.7 637.4C732.6 637.6 728.5 637.2 724.6 635.7C720 633.8 716.3 630.5 714 626.6C711.8 623 710.8 619 709.3 615.2C707.6 
                                610.2 705 605.7 703.6 600.4Z"
              />
              <path
                className={`st53 change-color ${tooth14Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth14Diagnozis?.apex ? 'apex' : ''}`}
                d="M729 599C730.393 611.07 733.029 621 738 621C742.971 621 745.607 611.07 747 599C748.5 586 742 577 738 577C733.5 
                                577 727.5 586 729 599Z"
              />
            </g>
          </g>
          {/* PULPIT */}
          <g
            className="pulp"
            style={{ visibility: tooth14Diagnozis.apex ? 'inherit' : 'hidden' }}
          >
            <g
              className="pulpitis-pfilling"
              style={{
                visibility: tooth14Diagnozis?.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M733.062 586.821C733.612 591.656 735.273 597 738 597C740.727 597 742.449 591.664 742.938 586.821C743.487 581.393 740.253 578 738 578C735.747 578 732.512 581.987 733.062 586.821Z"
                style={{ fill: '#e80808' }}
              ></path>
              <path
                className="st22 target"
                d="M733 610.661C733 615.356 736.13 620 738.005 620C739.88 620 743 615.356 743 610.661C743 605.967 740.505 603 738.005 603C735.505 603 733 605.967 733 610.661Z"
                style={{ fill: '#e80808' }}
              ></path>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth14Diagnozis.implant || tooth14Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="738.5" cy="595.5" r="20.5" />
            <g className="st27">
              <mask id="implant_14" className="st49">
                <path
                  className="st50"
                  d="M727.871 582.971L725.176 582.093C722.886 584.398 721.182 587.286 720.308 590.515L722.416 592.412C722.227 593.412 722.129 594.444 722.129 595.5C722.129 596.555 722.227 597.588 722.416 598.588L720.308 600.484C721.182 603.713 722.886 606.602 725.177 608.906L727.871 608.029C729.427 609.371 731.236 610.428 733.217 611.119L733.804 613.892C735.357 614.301 736.986 614.519 738.667 614.519C740.349 614.519 741.979 614.301 743.532 613.891L744.119 611.118C746.099 610.427 747.908 609.37 749.464 608.028L752.158 608.906C754.449 606.601 756.152 603.712 757.027 600.483L754.918 598.587C755.107 597.587 755.206 596.555 755.206 595.5C755.206 594.445 755.107 593.413 754.918 592.413L757.027 590.517C756.152 587.287 754.449 584.399 752.158 582.094L749.464 582.971C747.908 581.629 746.099 580.572 744.119 579.881L743.532 577.108C741.979 576.699 740.349 576.48 738.667 576.48C736.986 576.48 735.357 576.698 733.804 577.108L733.217 579.88C731.236 580.571 729.427 581.629 727.871 582.971Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M727.871 582.971L725.176 582.093C722.886 584.398 721.182 587.286 720.308 590.515L722.416 592.412C722.227 593.412 722.129 594.444 722.129 595.5C722.129 596.555 722.227 597.588 722.416 598.588L720.308 600.484C721.182 603.713 722.886 606.602 725.177 608.906L727.871 608.029C729.427 609.371 731.236 610.428 733.217 611.119L733.804 613.892C735.357 614.301 736.986 614.519 738.667 614.519C740.349 614.519 741.979 614.301 743.532 613.891L744.119 611.118C746.099 610.427 747.908 609.37 749.464 608.028L752.158 608.906C754.449 606.601 756.152 603.712 757.027 600.483L754.918 598.587C755.107 597.587 755.206 596.555 755.206 595.5C755.206 594.445 755.107 593.413 754.918 592.413L757.027 590.517C756.152 587.287 754.449 584.399 752.158 582.094L749.464 582.971C747.908 581.629 746.099 580.572 744.119 579.881L743.532 577.108C741.979 576.699 740.349 576.48 738.667 576.48C736.986 576.48 735.357 576.698 733.804 577.108L733.217 579.88C731.236 580.571 729.427 581.629 727.871 582.971Z"
              ></path>
              <path
                className="st52"
                d="M725.176 582.093L725.796 580.192L724.625 579.81L723.758 580.683L725.176 582.093ZM727.871 582.971L727.252 584.872L728.324 585.221L729.177 584.485L727.871 582.971ZM720.308 590.515L718.377 589.992L718.056 591.18L718.97 592.002L720.308 590.515ZM722.416 592.412L724.382 592.783L724.591 591.677L723.754 590.924L722.416 592.412ZM722.416 598.588L723.754 600.075L724.591 599.323L724.382 598.217L722.416 598.588ZM720.308 600.484L718.97 598.997L718.056 599.82L718.377 601.007L720.308 600.484ZM725.177 608.906L723.758 610.316L724.626 611.189L725.796 610.808L725.177 608.906ZM727.871 608.029L729.177 606.514L728.324 605.778L727.252 606.127L727.871 608.029ZM733.217 611.119L735.173 610.705L734.94 609.602L733.876 609.231L733.217 611.119ZM733.804 613.892L731.848 614.306L732.103 615.511L733.294 615.826L733.804 613.892ZM743.532 613.891L744.042 615.825L745.233 615.511L745.488 614.306L743.532 613.891ZM744.119 611.118L743.46 609.23L742.396 609.602L742.163 610.704L744.119 611.118ZM749.464 608.028L750.083 606.127L749.011 605.778L748.157 606.514L749.464 608.028ZM752.158 608.906L751.539 610.808L752.709 611.189L753.577 610.316L752.158 608.906ZM757.027 600.483L758.957 601.006L759.279 599.818L758.364 598.996L757.027 600.483ZM754.918 598.587L752.953 598.216L752.744 599.321L753.581 600.074L754.918 598.587ZM754.918 592.413L753.581 590.926L752.744 591.678L752.953 592.784L754.918 592.413ZM757.027 590.517L758.364 592.004L759.279 591.181L758.957 589.994L757.027 590.517ZM752.158 582.094L753.577 580.684L752.709 579.811L751.539 580.192L752.158 582.094ZM749.464 582.971L748.157 584.486L749.011 585.222L750.083 584.873L749.464 582.971ZM744.119 579.881L742.163 580.296L742.396 581.398L743.46 581.769L744.119 579.881ZM743.532 577.108L745.488 576.694L745.233 575.489L744.042 575.174L743.532 577.108ZM733.804 577.108L733.294 575.174L732.103 575.488L731.848 576.693L733.804 577.108ZM733.217 579.88L733.876 581.769L734.94 581.397L735.173 580.295L733.217 579.88ZM724.557 583.995L727.252 584.872L728.49 581.069L725.796 580.192L724.557 583.995ZM722.238 591.038C723.02 588.152 724.543 585.567 726.595 583.503L723.758 580.683C721.229 583.228 719.345 586.42 718.377 589.992L722.238 591.038ZM723.754 590.924L721.645 589.028L718.97 592.002L721.079 593.899L723.754 590.924ZM724.129 595.5C724.129 594.57 724.216 593.661 724.382 592.783L720.451 592.04C720.239 593.163 720.129 594.319 720.129 595.5H724.129ZM724.382 598.217C724.216 597.338 724.129 596.43 724.129 595.5H720.129C720.129 596.68 720.239 597.837 720.451 598.959L724.382 598.217ZM721.645 601.971L723.754 600.075L721.079 597.101L718.97 598.997L721.645 601.971ZM726.595 607.496C724.544 605.432 723.02 602.847 722.238 599.961L718.377 601.007C719.345 604.579 721.229 607.771 723.758 610.316L726.595 607.496ZM727.252 606.127L724.557 607.005L725.796 610.808L728.49 609.931L727.252 606.127ZM733.876 609.231C732.137 608.624 730.547 607.695 729.177 606.514L726.565 609.543C728.308 611.047 730.336 612.232 732.558 613.008L733.876 609.231ZM735.761 613.477L735.173 610.705L731.26 611.534L731.848 614.306L735.761 613.477ZM738.667 612.519C737.16 612.519 735.702 612.324 734.314 611.958L733.294 615.826C735.012 616.278 736.813 616.519 738.667 616.519V612.519ZM743.022 611.957C741.634 612.323 740.175 612.519 738.667 612.519V616.519C740.522 616.519 742.324 616.278 744.042 615.825L743.022 611.957ZM742.163 610.704L741.575 613.477L745.488 614.306L746.076 611.533L742.163 610.704ZM748.157 606.514C746.788 607.695 745.199 608.623 743.46 609.23L744.778 613.007C747 612.231 749.027 611.046 750.77 609.543L748.157 606.514ZM752.777 607.004L750.083 606.127L748.844 609.93L751.539 610.808L752.777 607.004ZM755.096 599.96C754.315 602.847 752.791 605.431 750.739 607.496L753.577 610.316C756.106 607.77 757.99 604.578 758.957 601.006L755.096 599.96ZM753.581 600.074L755.69 601.97L758.364 598.996L756.255 597.099L753.581 600.074ZM753.206 595.5C753.206 596.43 753.119 597.337 752.953 598.216L756.883 598.958C757.095 597.836 757.206 596.68 757.206 595.5H753.206ZM752.953 592.784C753.119 593.662 753.206 594.57 753.206 595.5H757.206C757.206 594.32 757.095 593.164 756.883 592.042L752.953 592.784ZM755.69 589.029L753.581 590.926L756.255 593.9L758.364 592.004L755.69 589.029ZM750.74 583.503C752.791 585.568 754.315 588.153 755.096 591.039L758.957 589.994C757.99 586.421 756.106 583.229 753.577 580.684L750.74 583.503ZM750.083 584.873L752.777 583.995L751.539 580.192L748.844 581.069L750.083 584.873ZM743.46 581.769C745.199 582.376 746.788 583.305 748.157 584.486L750.77 581.457C749.027 579.954 747 578.768 744.778 577.993L743.46 581.769ZM741.575 577.523L742.163 580.296L746.076 579.467L745.488 576.694L741.575 577.523ZM738.667 578.48C740.175 578.48 741.634 578.676 743.022 579.042L744.042 575.174C742.324 574.721 740.522 574.48 738.667 574.48V578.48ZM734.314 579.042C735.702 578.676 737.16 578.48 738.667 578.48V574.48C736.813 574.48 735.012 574.721 733.294 575.174L734.314 579.042ZM735.173 580.295L735.761 577.522L731.848 576.693L731.26 579.466L735.173 580.295ZM729.177 584.485C730.547 583.304 732.137 582.376 733.876 581.769L732.558 577.992C730.336 578.767 728.308 579.953 726.565 581.456L729.177 584.485Z"
                mask="url(#implant_14)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle className="st44" cx="738.435" cy="595.435" r="22.435" />
            <path
              className="st45"
              d="M736.577 586.739C737.129 584.804 739.871 584.804 740.423 586.739L740.929 588.511C741.225 589.549 742.291 590.164 743.338 589.902L745.126 589.454C747.077 588.965 748.448 591.339 747.049 592.785L745.767 594.109C745.016 594.884 745.016 596.116 745.767 596.891L747.049 598.215C748.448 599.661 747.077 602.035 745.126 601.546L743.338 601.098C742.291 600.836 741.225 601.451 740.929 602.489L740.423 604.261C739.871 606.196 737.129 606.196 736.577 604.261L736.071 602.489C735.775 601.451 734.709 600.836 733.662 601.098L731.874 601.546C729.923 602.035 728.552 599.661 729.951 598.215L731.233 596.891C731.984 596.116 731.984 594.884 731.233 594.109L729.951 592.785C728.552 591.339 729.923 588.965 731.874 589.454L733.662 589.902C734.709 590.164 735.775 589.549 736.071 588.511L736.577 586.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth14Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth14Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M703.6 600.4C702.1 594.4 702.1 588.5 704.4 583C706.8 577.4 711.6 572.7 716.8 568.9C723.1 564.3 730.4 560.7 
                            738.4 560.7C747 560.8 754.5 564.9 760.6 570.1C763.7 572.7 766.6 575.7 768.7 579C771.2 582.8 772.7 587.1 772.7 591.6C772.7 599 
                            768.8 605.5 765.3 611.9C762.8 616.4 760.7 620.9 757.7 625.4C755.8 628.4 753.3 631.3 750.2 633.4C746.2 636 741.4 637.1 736.7 
                            637.4C732.6 637.6 728.5 637.2 724.6 635.7C720 633.8 716.3 630.5 714 626.6C711.8 623 710.8 619 709.3 615.2C707.6 610.2 705 
                            605.7 703.6 600.4Z"
            />
            <path
              className="st47"
              d="M714.697 599.898C713.692 595.833 713.692 591.836 715.234 588.109C716.842 584.315 720.058 
                            581.131 723.543 578.556C727.764 575.439 732.656 573 738.016 573C743.779 573.068 748.805 575.846 752.892 
                            579.369C754.969 581.13 756.913 583.163 758.32 585.399C759.995 587.974 761 590.887 761 593.936C761 598.95 
                            758.387 603.354 756.041 607.69C754.366 610.739 752.959 613.788 750.949 616.837C749.676 618.87 748 620.835 
                            745.923 622.257C743.243 624.019 740.027 624.764 736.877 624.968C734.13 625.103 731.382 624.832 728.769 
                            623.816C725.687 622.528 723.208 620.292 721.666 617.65C720.192 615.211 719.522 612.501 718.517 609.926C717.378 
                            606.538 715.636 603.489 714.697 599.898Z"
            />
            <circle className="st45" cx="738" cy="595" r="13" />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth14Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M703.6 600.4C702.1 594.4 702.1 588.5 704.4 583C706.8 577.4 711.6 572.7 716.8 568.9C723.1 
                            564.3 730.4 560.7 738.4 560.7C747 560.8 754.5 564.9 760.6 570.1C763.7 572.7 766.6 575.7 768.7 579C771.2 582.8 772.7 
                            587.1 772.7 591.6C772.7 599 768.8 605.5 765.3 611.9C762.8 616.4 760.7 620.9 757.7 625.4C755.8 628.4 753.3 631.3 750.2 
                            633.4C746.2 636 741.4 637.1 736.7 637.4C732.6 637.6 728.5 637.2 724.6 635.7C720 633.8 716.3 630.5 714 626.6C711.8 623 
                            710.8 619 709.3 615.2C707.6 610.2 705 605.7 703.6 600.4Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st56 hIntact"
              d="M714.697 599.898C713.692 595.833 713.692 591.836 715.234 588.109C716.842 584.315 720.058 
                            581.131 723.543 578.556C727.764 575.439 732.656 573 738.016 573C743.779 573.068 748.805 575.846 752.892 579.369C754.969 
                            581.13 756.913 583.163 758.32 585.399C759.995 587.974 761 590.887 761 593.936C761 598.95 758.387 603.354 756.041 
                            607.69C754.366 610.739 752.959 613.788 750.949 616.837C749.676 618.87 748 620.835 745.923 622.257C743.243 624.019 
                            740.027 624.764 736.877 624.968C734.13 625.103 731.382 624.832 728.769 623.816C725.687 622.528 723.208 620.292 721.666 
                            617.65C720.192 615.211 719.522 612.501 718.517 609.926C717.378 606.538 715.636 603.489 714.697 599.898Z"
              style={{ visibility: 'hidden' }}
            />
            <circle
              className="st57"
              id="Ellipse_53"
              cx="738"
              cy="595"
              r="12.25"
              style={{ fill: 'black', opacity: tooth14Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          {/* CULTTAB */}
          <g
            style={{
              visibility: !tooth14Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth14Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M703.6 600.4C702.1 594.4 702.1 588.5 704.4 583C706.8 577.4 711.6 572.7 716.8 568.9C723.1 564.3 730.4 560.7 738.4 560.7C747 560.8 754.5 564.9 760.6 570.1C763.7 572.7 766.6 575.7 768.7 579C771.2 582.8 772.7 587.1 772.7 591.6C772.7 599 768.8 605.5 765.3 611.9C762.8 616.4 760.7 620.9 757.7 625.4C755.8 628.4 753.3 631.3 750.2 633.4C746.2 636 741.4 637.1 736.7 637.4C732.6 637.6 728.5 637.2 724.6 635.7C720 633.8 716.3 630.5 714 626.6C711.8 623 710.8 619 709.3 615.2C707.6 610.2 705 605.7 703.6 600.4Z"
            ></path>
            <path
              className="st47"
              d="M714.697 599.898C713.692 595.833 713.692 591.836 715.234 588.109C716.842 584.315 720.058 581.131 723.543 578.556C727.764 575.439 732.656 573 738.016 573C743.779 573.068 748.805 575.846 752.892 579.369C754.969 581.13 756.913 583.163 758.32 585.399C759.995 587.974 761 590.887 761 593.936C761 598.95 758.387 603.354 756.041 607.69C754.366 610.739 752.959 613.788 750.949 616.837C749.676 618.87 748 620.835 745.923 622.257C743.243 624.019 740.027 624.764 736.877 624.968C734.13 625.103 731.382 624.832 728.769 623.816C725.687 622.528 723.208 620.292 721.666 617.65C720.192 615.211 719.522 612.501 718.517 609.926C717.378 606.538 715.636 603.489 714.697 599.898Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth14Diagnozis.culttab &&
                !tooth14Diagnozis.abutment &&
                !tooth14Diagnozis.implant &&
                !tooth14Diagnozis.apex &&
                !tooth14Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M775.9,568.9c-0.2-0.4-0.4-0.8-0.7-1.1c-2.5-4.1-5.8-7.8-9.2-11.1
                            c-7.5-7.1-16.6-12.9-27-13.1c-9.8-0.1-18.7,4.9-26.3,11.2c-3.6,2.9-7,6.3-9.8,10.1c-2.2,2.9-4,6-5.2,9.3
                            c-2.8,7.5-2.8,15.7-0.9,23.9c1.7,7.3,4.8,13.5,7.2,20.2c1.5,4.4,2.7,8.9,4.6,13.2c0.4,0.9,0.8,1.7,1.2,2.5c2.9,5.4,7.3,10,13,12.6
                            c4.7,2.2,9.7,2.8,14.7,2.5c5.7-0.4,11.5-1.9,16.4-5.4c1.5-1.1,2.8-2.3,4-3.7c2-2.2,3.7-4.7,5.1-7.3c3.5-6.2,6.1-12.3,9.1-18.6
                            c4.1-8.7,8.9-17.7,8.8-27.9C780.8,580,779,574.1,775.9,568.9z"
            />
          </g>
          {/*TARTAR*/}
          <g
            style={{
              opacity: teethDiagnozis.tooth14.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M758.577 547.688C761.234 549.678 763.735 550.706 766.069 553.152C768.094 555.241 770.05 558.757 771.824 561.165C773.375 563.271 774.787 564.234 775.987 566.552C777.482 569.347 778.685 573.577 779.525 576.679C780.404 579.926 782 583.313 782 586.778C782 590.953 781.329 594.938 780.265 598.796C779.088 603.063 777.429 607.176 775.664 611.218C774.767 613.273 772.727 615.311 771.824 617.341C770.192 620.952 769.815 624.563 768.221 628.174C766.824 631.338 764.233 634.502 762.518 637.666C761.176 640.271 760.705 642.827 758.874 645.129C757.531 646.819 754.941 649.629 753.334 650.967C750.828 652.97 748.064 653.126 745.192 654.088C742.453 655.005 739.614 656.768 736.804 656.989C734.386 657.134 731.968 655.813 729.577 655.455C727.004 655.07 724.463 655.6 721.988 654.429C719.44 653.135 717.117 650.154 715.077 648.108C712.607 645.632 710.551 642.688 709.009 639.473C707.71 636.859 705.637 635.362 704.788 632.57C703.877 629.571 704.205 626.528 703.254 623.565C702.395 620.63 700.271 616.553 699.266 613.73C698.454 611.449 698.759 610.423 698.032 608.078C697.352 605.884 696.744 602.38 696.275 600.027C695.623 596.824 695.203 594.896 695.057 591.751L695.416 581.703C695.777 579.03 695.264 576.401 696.139 573.83C697.18 570.842 699.707 568.023 701.378 565.375C702.955 562.877 703.648 560.529 705.596 558.334C707.408 556.292 710.457 554.381 712.437 552.602C715.442 549.904 718.633 546.178 721.988 544.169C724.433 542.704 726.966 542.74 729.577 541.853C732.58 540.834 735.687 539 738.886 539C742.448 539.051 745.856 539.791 749.096 541.051C752.441 542.353 755.607 545.464 758.577 547.688ZM704.401 582.999C702.101 588.499 702.101 594.399 703.601 600.399C704.901 605.699 707.501 610.199 709.301 615.199C710.801 618.999 711.801 622.999 714.001 626.599C716.301 630.499 720.001 633.799 724.601 635.699C728.501 637.199 732.601 637.599 736.701 637.399C741.401 637.099 746.201 635.999 750.201 633.399C753.301 631.299 755.801 628.399 757.701 625.399C760.701 620.899 762.801 616.399 765.301 611.899C768.801 605.499 772.701 598.999 772.701 591.599C772.701 587.099 771.201 582.799 768.701 578.999C766.601 575.699 763.701 572.699 760.601 570.099C754.501 564.899 747.001 560.799 738.401 560.699C730.401 560.699 723.101 564.299 716.801 568.899C711.601 572.699 706.801 577.399 704.401 582.999Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M758.577 547.688C761.234 549.678 763.735 550.706 766.069 553.152C768.094 555.241 770.05 558.757 771.824 561.165C773.375 563.271 774.787 564.234 775.987 566.552C777.482 569.347 778.685 573.577 779.525 576.679C780.404 579.926 782 583.313 782 586.778C782 590.953 781.329 594.938 780.265 598.796C779.088 603.063 777.429 607.176 775.664 611.218C774.767 613.273 772.727 615.311 771.824 617.341C770.192 620.952 769.815 624.563 768.221 628.174C766.824 631.338 764.233 634.502 762.518 637.666C761.176 640.271 760.705 642.827 758.874 645.129C757.531 646.819 754.941 649.629 753.334 650.967C750.828 652.97 748.064 653.126 745.192 654.088C742.453 655.005 739.614 656.768 736.804 656.989C734.386 657.134 731.968 655.813 729.577 655.455C727.004 655.07 724.463 655.6 721.988 654.429C719.44 653.135 717.117 650.154 715.077 648.108C712.607 645.632 710.551 642.688 709.009 639.473C707.71 636.859 705.637 635.362 704.788 632.57C703.877 629.571 704.205 626.528 703.254 623.565C702.395 620.63 700.271 616.553 699.266 613.73C698.454 611.449 698.759 610.423 698.032 608.078C697.352 605.884 696.744 602.38 696.275 600.027C695.623 596.824 695.203 594.896 695.057 591.751L695.416 581.703C695.777 579.03 695.264 576.401 696.139 573.83C697.18 570.842 699.707 568.023 701.378 565.375C702.955 562.877 703.648 560.529 705.596 558.334C707.408 556.292 710.457 554.381 712.437 552.602C715.442 549.904 718.633 546.178 721.988 544.169C724.433 542.704 726.966 542.74 729.577 541.853C732.58 540.834 735.687 539 738.886 539C742.448 539.051 745.856 539.791 749.096 541.051C752.441 542.353 755.607 545.464 758.577 547.688ZM704.401 582.999C702.101 588.499 702.101 594.399 703.601 600.399C704.901 605.699 707.501 610.199 709.301 615.199C710.801 618.999 711.801 622.999 714.001 626.599C716.301 630.499 720.001 633.799 724.601 635.699C728.501 637.199 732.601 637.599 736.701 637.399C741.401 637.099 746.201 635.999 750.201 633.399C753.301 631.299 755.801 628.399 757.701 625.399C760.701 620.899 762.801 616.399 765.301 611.899C768.801 605.499 772.701 598.999 772.701 591.599C772.701 587.099 771.201 582.799 768.701 578.999C766.601 575.699 763.701 572.699 760.601 570.099C754.501 564.899 747.001 560.799 738.401 560.699C730.401 560.699 723.101 564.299 716.801 568.899C711.601 572.699 706.801 577.399 704.401 582.999Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M699.373 585C699.697 582.872 699.237 580.778 700.021 578.732C700.955 576.352 703.22 574.108 704.718 572C706.132 570.011 706.753 568.142 708.5 566.394C710.125 564.768 712.858 563.247 714.634 561.83C717.328 559.682 720.188 556.715 723.196 555.115C725.389 553.949 727.659 553.978 730 553.272C732.692 552.46 735.478 551 738.346 551C741.54 551.041 744.595 551.63 747.5 552.633C750.499 553.669 753.337 556.147 756 557.918C758.382 559.502 760.625 560.32 762.717 562.268C764.533 563.931 766.286 566.73 767.876 568.648C769.267 570.325 770.534 571.092 771.609 572.937C772.95 575.162 774.028 578.53 774.781 581C775.569 583.585 777 586.282 777 589.041C777 592.365 776.399 595.538 775.445 598.609C774.389 602.007 772.902 605.281 771.32 608.5C770.515 610.136 768.686 611.758 767.876 613.375C766.414 616.25 766.076 619.125 764.646 622C763.394 624.519 761.071 627.039 759.533 629.558C758.33 631.632 757.908 633.667 756.266 635.5C755.062 636.845 752.74 639.082 751.3 640.148C749.052 641.743 746.575 641.867 744 642.633C741.544 643.363 738.999 644.767 736.48 644.943C734.312 645.058 732.143 644.007 730 643.721C727.693 643.414 725.415 643.837 723.196 642.905C720.912 641.874 718.829 639.5 717 637.872C714.786 635.901 712.942 633.556 711.56 630.996C710.395 628.915 708.537 627.723 707.776 625.5C706.958 623.113 707.253 620.69 706.4 618.331C705.63 615.994 703.725 612.747 702.824 610.5C702.096 608.684 702.37 607.867 701.718 606C701.108 604.253 700.564 601.463 700.143 599.59C699.559 597.039 699.182 595.504 699.051 593M699.373 585C699.024 587.297 698.928 590.634 699.051 593M699.373 585L699.051 593M703.601 600.399C702.101 594.399 702.101 588.499 704.401 582.999C706.801 577.399 711.601 572.699 716.801 568.899C723.101 564.299 730.401 560.699 738.401 560.699C747.001 560.799 754.501 564.899 760.601 570.099C763.701 572.699 766.601 575.699 768.701 578.999C771.201 582.799 772.701 587.099 772.701 591.599C772.701 598.999 768.801 605.499 765.301 611.899C762.801 616.399 760.701 620.899 757.701 625.399C755.801 628.399 753.301 631.299 750.201 633.399C746.201 635.999 741.401 637.099 736.701 637.399C732.601 637.599 728.501 637.199 724.601 635.699C720.001 633.799 716.301 630.499 714.001 626.599C711.801 622.999 710.801 618.999 709.301 615.199C707.501 610.199 704.901 605.699 703.601 600.399Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth14Diagnozis.culttab &&
                !tooth14Diagnozis.abutment &&
                !tooth14Diagnozis.implant &&
                !tooth14Diagnozis.shaper &&
                !tooth14Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС CENTER*/}
            <g
              id="s_header_14_5"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M718.8,611c0.4,3.4,2.9,6.8,5.9,9.5c2.8,2.6,6.1,4.5,8.2,5c4.2,1,9.3-1.6,12-5.9c0.2-0.3,0.3-0.5,0.5-0.8
                                c2.5-4.8,8.1-15.3,9.8-20.2c1.5-4.4,0.8-10.5-2.3-13.8c-0.4-0.4-0.8-0.7-1.2-1c-4.1-2.9-15-5.7-15-5.7c-6.2-0.6-11.6,1.5-15.6,5.9
                                c-0.1,0.1-0.2,0.3-0.4,0.4C716.6,588.9,718,604.4,718.8,611z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth14.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth14.seal_center ? `seal-fill ${teethDiagnozis.tooth14.seal_center_color}` : ''}
                                `}
                d="M718.8,611c0.4,3.4,2.9,6.8,5.9,9.5c2.8,2.6,6.1,4.5,8.2,5c4.2,1,9.3-1.6,12-5.9c0.2-0.3,0.3-0.5,0.5-0.8
                                c2.5-4.8,8.1-15.3,9.8-20.2c1.5-4.4,0.8-10.5-2.3-13.8c-0.4-0.4-0.8-0.7-1.2-1c-4.1-2.9-15-5.7-15-5.7c-6.2-0.6-11.6,1.5-15.6,5.9
                                c-0.1,0.1-0.2,0.3-0.4,0.4C716.6,588.9,718,604.4,718.8,611z"
              />
            </g>
            {/*КАРИЕС LEFT*/}
            <g
              id="s_header_14_4"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M696.7,598.1c1.7,7.3,4.8,13.5,7.2,20.2c1.5,4.4,2.7,8.9,4.6,13.2c5.6-3,12.5-8.1,16.2-11
                                c-3-2.7-5.5-6.1-5.9-9.5c-0.8-6.6-2.1-22.1,1.8-26.7c0.1-0.1,0.2-0.3,0.4-0.4c-6-8.2-13.8-15.4-18.2-19.1c-2.2,2.9-4,6-5.2,9.3
                                C694.8,581.6,694.9,589.9,696.7,598.1z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth14.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth14.seal_left ? `seal-fill ${teethDiagnozis.tooth14.seal_left_color}` : ''}
                                `}
                d="M696.7,598.1c1.7,7.3,4.8,13.5,7.2,20.2c1.5,4.4,2.7,8.9,4.6,13.2c5.6-3,12.5-8.1,16.2-11
                                c-3-2.7-5.5-6.1-5.9-9.5c-0.8-6.6-2.1-22.1,1.8-26.7c0.1-0.1,0.2-0.3,0.4-0.4c-6-8.2-13.8-15.4-18.2-19.1c-2.2,2.9-4,6-5.2,9.3
                                C694.8,581.6,694.9,589.9,696.7,598.1z"
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
                d="M708.5,631.5c0.4,0.9,0.8,1.7,1.2,2.5c2.9,5.4,7.3,10,13,12.6c4.7,2.2,9.7,2.8,14.7,2.5
                                c5.7-0.4,11.5-1.9,16.4-5.4c1.5-1.1,2.8-2.3,4-3.7c-4.2-6.7-9.8-15.5-12.9-20.3c-2.6,4.3-7.8,6.9-12,5.9c-2.2-0.5-5.4-2.4-8.2-5
                                C721,623.4,714.1,628.5,708.5,631.5z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth14.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth14.seal_bottom ? `seal-fill ${teethDiagnozis.tooth14.seal_bottom_color}` : ''}
                                `}
                d="M708.5,631.5c0.4,0.9,0.8,1.7,1.2,2.5c2.9,5.4,7.3,10,13,12.6c4.7,2.2,9.7,2.8,14.7,2.5
                                c5.7-0.4,11.5-1.9,16.4-5.4c1.5-1.1,2.8-2.3,4-3.7c-4.2-6.7-9.8-15.5-12.9-20.3c-2.6,4.3-7.8,6.9-12,5.9c-2.2-0.5-5.4-2.4-8.2-5
                                C721,623.4,714.1,628.5,708.5,631.5z"
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
                d="M744.8,619.6c3.1,4.8,8.7,13.6,12.9,20.3c2-2.2,3.7-4.7,5.1-7.3c3.5-6.2,6.1-12.3,9.1-18.6
                                c4.1-8.7,8.9-17.7,8.8-27.9c0-6.2-1.9-12-5-17.3c-0.2-0.4-0.4-0.8-0.7-1.1c-5.5,3.6-16.2,10.9-22.5,17c3.1,3.3,3.8,9.4,2.3,13.8
                                c-1.7,4.9-7.4,15.5-9.8,20.2C745.2,619,745,619.3,744.8,619.6z"
              />
              <path
                className={`
                                    st8 target caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth14.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth14.seal_right ? `seal-fill ${teethDiagnozis.tooth14.seal_right_color}` : ''}
                                `}
                d="M744.8,619.6c3.1,4.8,8.7,13.6,12.9,20.3c2-2.2,3.7-4.7,5.1-7.3c3.5-6.2,6.1-12.3,9.1-18.6
                                c4.1-8.7,8.9-17.7,8.8-27.9c0-6.2-1.9-12-5-17.3c-0.2-0.4-0.4-0.8-0.7-1.1c-5.5,3.6-16.2,10.9-22.5,17c3.1,3.3,3.8,9.4,2.3,13.8
                                c-1.7,4.9-7.4,15.5-9.8,20.2C745.2,619,745,619.3,744.8,619.6z"
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
                d="M702.8,564.8c4.3,3.7,12.2,10.8,18.2,19.1c4-4.3,9.3-6.5,15.6-5.9c0,0,10.9,2.8,15,5.7c0.4,0.3,0.8,0.6,1.2,1
                                c6.3-6.1,16.9-13.4,22.5-17c-2.5-4.1-5.8-7.8-9.2-11.1c-7.5-7.1-16.6-12.9-27-13.1c-9.8-0.1-18.7,4.9-26.3,11.2
                                C709.1,557.7,705.7,561,702.8,564.8z"
              />
              <path
                className={`
                                    st8 target caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth14.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth14.seal_top ? `seal-fill ${teethDiagnozis.tooth14.seal_top_color}` : ''}
                                `}
                d="M702.8,564.8c4.3,3.7,12.2,10.8,18.2,19.1c4-4.3,9.3-6.5,15.6-5.9c0,0,10.9,2.8,15,5.7c0.4,0.3,0.8,0.6,1.2,1
                                c6.3-6.1,16.9-13.4,22.5-17c-2.5-4.1-5.8-7.8-9.2-11.1c-7.5-7.1-16.6-12.9-27-13.1c-9.8-0.1-18.7,4.9-26.3,11.2
                                C709.1,557.7,705.7,561,702.8,564.8z"
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_left &&
                      !tooth14Diagnozis.seal_bottom &&
                      !tooth14Diagnozis.seal_center) ||
                    (tooth14Diagnozis.seal_left &&
                      !tooth14Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M724.5 620.5C722.667 622.333 717.6 626.7 712 629.5"
              />
              {/*Овал лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_left &&
                      !tooth14Diagnozis.seal_center) ||
                    (!tooth14Diagnozis.seal_left &&
                      tooth14Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M724.5 620.5C719.5 613 715 589 721 584"
              />
              {/*Черточка верх лево*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_left &&
                      !tooth14Diagnozis.seal_top) ||
                    (!tooth14Diagnozis.seal_left && tooth14Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M721 584C719.167 580.833 713.3 573.6 706.5 568"
              />
              {/*Овал черточка верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_center &&
                      !tooth14Diagnozis.seal_top) ||
                    (!tooth14Diagnozis.seal_center && tooth14Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M721 584C724.833 578.833 736.5 571.6 752.5 584"
              />
              {/*Черточка верх право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_right &&
                      !tooth14Diagnozis.seal_top) ||
                    (!tooth14Diagnozis.seal_right && tooth14Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
                d="M752.5 584C755.333 580.833 763 573.7 771 570.5"
              />
              {/*Овал черточка право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth14Diagnozis.seal_right &&
                      tooth14Diagnozis.seal_center) ||
                    (tooth14Diagnozis.seal_right &&
                      !tooth14Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M752.5 584C759 592 751.9 608.8 745.5 620"
              />
              {/*Низ черточка право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_right &&
                      !tooth14Diagnozis.seal_bottom) ||
                    (!tooth14Diagnozis.seal_right &&
                      tooth14Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M745.5 620L755.5 636.5"
              />
              {/*Овал черточка низ право*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_center &&
                      !tooth14Diagnozis.seal_bottom) ||
                    (!tooth14Diagnozis.seal_center &&
                      tooth14Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
                d="M745.5 620C742.167 624.833 733.2 631.6 724 620"
              />
            </g>
          </g>
          {/* VINIR */}
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth14Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth14Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth14Diagnozis.vinir_color}`}
                d="M698.116 574.074C699.416 570.674 701.216 567.574 703.316 564.774C706.116 560.974 709.516 557.674 
                                713.116 554.674C720.716 548.474 729.516 543.374 739.416 543.474C749.816 543.574 759.016 549.374 766.416 
                                556.574C769.916 559.874 773.116 563.574 775.616 567.674C775.816 568.074 776.116 568.374 776.316 
                                568.774C779.416 574.074 781.216 579.874 781.316 586.074C781.339 588.435 781.1 590.731 780.667 592.975C778.616 
                                592.905 774.113 591.887 772.514 588.37C772.516 588.204 772.516 588.038 772.514 587.871C772.435 582.938 771.003
                                578.323 768.536 574.106C768.377 573.788 768.138 573.549 767.979 573.231C765.99 569.968 763.444 567.024 
                                760.659 564.399C754.771 558.67 747.451 554.055 739.176 553.976C731.299 553.896 724.298 557.954 718.251 
                                562.887C715.386 565.274 712.681 567.9 710.453 570.923C708.782 573.151 707.35 575.618 706.316 578.323C705.064 
                                581.562 704.514 584.988 704.516 588.475C703.075 592.475 698.428 593.141 696.284 592.975C695.401 586.504 695.81 
                                580.036 698.116 574.074Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth14Diagnozis.temporary_crown ||
                tooth14Diagnozis.ceramic_crown ||
                tooth14Diagnozis.mceramic_crown ||
                tooth14Diagnozis.metalic_crown ||
                tooth14Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth14Diagnozis.temporary_crown ||
                tooth14Diagnozis.ceramic_crown ||
                tooth14Diagnozis.mceramic_crown ||
                tooth14Diagnozis.metalic_crown ||
                tooth14Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth14Diagnozis.ceramic_crown_color}
                                ${tooth14Diagnozis.mceramic_crown_color}
                                ${tooth14Diagnozis.metalic_crown_color}
                                ${tooth14Diagnozis.zirconia_crown_color}
                            `}
              d="M775.9,568.9c-0.2-0.4-0.4-0.8-0.7-1.1c-2.5-4.1-5.8-7.8-9.2-11.1
                            c-7.5-7.1-16.6-12.9-27-13.1c-9.8-0.1-18.7,4.9-26.3,11.2c-3.6,2.9-7,6.3-9.8,10.1c-2.2,2.9-4,6-5.2,9.3
                            c-2.8,7.5-2.8,15.7-0.9,23.9c1.7,7.3,4.8,13.5,7.2,20.2c1.5,4.4,2.7,8.9,4.6,13.2c0.4,0.9,0.8,1.7,1.2,2.5c2.9,5.4,7.3,10,13,12.6
                            c4.7,2.2,9.7,2.8,14.7,2.5c5.7-0.4,11.5-1.9,16.4-5.4c1.5-1.1,2.8-2.3,4-3.7c2-2.2,3.7-4.7,5.1-7.3c3.5-6.2,6.1-12.3,9.1-18.6
                            c4.1-8.7,8.9-17.7,8.8-27.9C780.8,580,779,574.1,775.9,568.9z"
            />
            {/*FISSURE*/}
            <path
              className={`st3 fissure ${tooth14Diagnozis.fissure ? 'diagnoze' : tooth14Diagnozis.fissure ? 'hidden' : ''}`}
              d="M717.8,607.3l-0.5-0.9c7.5-4.4,16.5-6.4,25.4-5.7c5.3,0.4,10.3,1.8,15.1,4.1l-0.5,1
                            c-4.6-2.2-9.5-3.6-14.7-4C734,601,725.2,603,717.8,607.3z"
            />
            <path
              className={`st3 fissure ${tooth14Diagnozis.fissure ? 'diagnoze' : tooth14Diagnozis.fissure ? 'hidden' : ''}`}
              d="M748.6,601.2c-1.7,0-3.5-0.3-5.2-0.6c-0.9-0.2-1.9-0.3-2.8-0.5c-1.7-0.2-3.6-0.3-5.3-0.3
                            c-1.6,0-3.3-0.1-4.9-0.2c-4.7-0.5-9.2-2-12.7-4.4l0.6-0.9c3.3,2.2,7.6,3.7,12.2,4.2c1.6,0.2,3.2,0.2,4.8,0.2
                            c1.8,0,3.6,0.1,5.4,0.3c1,0.1,1.9,0.3,2.9,0.5c2.4,0.4,4.7,0.8,6.9,0.4c1.5-0.3,2.7-0.9,4-1.5c1.2-0.6,2.4-1.2,3.9-1.6l0.2,1.1
                            c-1.4,0.3-2.5,0.9-3.6,1.5c-1.3,0.7-2.6,1.3-4.3,1.6C750,601.2,749.3,601.2,748.6,601.2z"
            />
          </g>
          {/* FISSURES */}
          <g
            className="fissures"
            style={{
              visibility:
                !tooth14Diagnozis.culttab &&
                !tooth14Diagnozis.abutment &&
                !tooth14Diagnozis.implant &&
                !tooth14Diagnozis.apex &&
                !tooth14Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth14Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M717.8,607.3l-0.5-0.9c7.5-4.4,16.5-6.4,25.4-5.7c5.3,0.4,10.3,1.8,15.1,4.1l-0.5,1
                            c-4.6-2.2-9.5-3.6-14.7-4C734,601,725.2,603,717.8,607.3z"
            />
            <path
              className={`st3 fissure ${tooth14Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M748.6,601.2c-1.7,0-3.5-0.3-5.2-0.6c-0.9-0.2-1.9-0.3-2.8-0.5c-1.7-0.2-3.6-0.3-5.3-0.3
                            c-1.6,0-3.3-0.1-4.9-0.2c-4.7-0.5-9.2-2-12.7-4.4l0.6-0.9c3.3,2.2,7.6,3.7,12.2,4.2c1.6,0.2,3.2,0.2,4.8,0.2
                            c1.8,0,3.6,0.1,5.4,0.3c1,0.1,1.9,0.3,2.9,0.5c2.4,0.4,4.7,0.8,6.9,0.4c1.5-0.3,2.7-0.9,4-1.5c1.2-0.6,2.4-1.2,3.9-1.6l0.2,1.1
                            c-1.4,0.3-2.5,0.9-3.6,1.5c-1.3,0.7-2.6,1.3-4.3,1.6C750,601.2,749.3,601.2,748.6,601.2z"
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
              id="dentin_v_14"
              style={{
                visibility:
                  !tooth14Diagnozis.implant &&
                  !tooth14Diagnozis.apex &&
                  !tooth14Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_14"
                className={`st10 change-color ${tooth14Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M769.8,443.2c-1,11.1-3.2,22-6.5,32.7l-25-5.6l-25,2.9
                                c-6-11.7-9.3-24.3-9.8-37.2c-0.2-5.9,0.1-11.7,0.4-17.6c1.1-3,2.4-5.9,4-8.7c4.7-7.9,12.1-13.9,21-16.4c2.3-0.6,4.7-1,7.1-1.2
                                c2.7-0.1,5.3,0.1,7.9,0.7c0.5,0.1,1,0.3,1.6,0.4c4.7,1.4,8.7,4.2,12.3,7.2c3.9,3.3,7.4,6.9,10.4,10.9c-0.3-1.9-0.7-3.8-1-5.6
                                c1.1,5.7,2.1,11.3,3.1,17C770.5,429.7,770.4,436.5,769.8,443.2z"
              />
            </g>
            <g
              id="dentin_n_14"
              style={{
                visibility:
                  !tooth14Diagnozis.implant &&
                  !tooth14Diagnozis.abutment &&
                  !tooth14Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_x5F_14_4_"
                className={`st10 change-color ${tooth14Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M748.7,312.6c5.6,20.7,10.8,41.4,15.6,62.2c-2.9-22.4-5.3-44.8-7.2-67.2
                                c-1-11.5-1.8-23.1-3-34.6c-0.9-8.6-2.1-17.2-2.8-25.9c-0.4-4.6-0.8-9.4-4.2-12.8c-1.6-1.6-3.8-2.8-6.1-2.4
                                c-3.1,0.5-4.7,3.1-5.9,5.7c-1.2,2.7-2.2,5.5-2.7,8.4c-0.7,4.1-0.5,8.3,0.6,12.2C738.5,276.2,743.8,294.3,748.7,312.6z"
              />
              <path
                className={`st10 change-color ${tooth14Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M768.2,411.4c-3-4-6.5-7.6-10.4-10.9c-3.7-3.1-7.7-5.8-12.3-7.2c-0.5-0.2-1-0.3-1.6-0.4
                                c-2.6-0.6-5.2-0.8-7.8-0.7c-2.5,0.1-4.8,0.5-7.1,1.2c-8.8,2.5-16.3,8.5-21,16.4c-1.6,2.8-2.9,5.7-4,8.7c0.1-2,0.2-3.9,0.3-5.9
                                c1-22.8-0.7-45.7-1.6-68.5c-1.2-30.8-1.1-61.7-1.2-92.5c0-8.7,1.7-17.9,7.7-20.8c0.8-0.4,1.7-0.7,2.7-0.8
                                c8.2-1.2,12.9,8.5,15.5,18c3.4,12.5,7.4,24.8,11.2,37.1c1.2,3.9,2.4,7.7,3.5,11.6c0.4,1.2,0.7,2.4,1.1,3.5
                                c6.3,21.7,11.5,43.7,16.1,65.8c2.8,13.2,5.4,26.5,7.9,39.7C767.5,407.7,767.8,409.6,768.2,411.4z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M745.7,434.3c0,3.8-0.1,7.6-0.5,11.4c-3.8-2.6-8.6-3.7-13.2-2.8
                                c-1.8,0.3-3.5,0.9-5.1,1.7c-0.4-1.8-0.6-3.5-0.6-5.3c0-2.5,0.3-5,0.6-7.5c0.3-3.3,0.4-6.6,0.6-9.9c0.2-2.5,0.4-5.1,0.6-7.6
                                c0.5-6.9,0.7-13.9,0.8-20.9c2.3-0.6,4.7-1,7.2-1.2c2.6-0.1,5.3,0.1,7.8,0.7c0.3,9,0.5,18.1,0.8,27.1c0,0.2,0.1,0.5,0.1,0.7
                                C745.3,425.2,745.6,429.7,745.7,434.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M743.9,392.9c-2.6-0.6-5.2-0.8-7.8-0.7c-2.5,0.1-4.9,0.5-7.2,1.2
                                c0.1-16.7-1-33.4-2.6-50.1c-0.9-9.8-2-19.6-3.2-29.4c1.7-0.6,3.6-1.2,5.5-1.6c2.3,12.4,4.4,24.8,6.2,37.2c0.2-3.3,0.4-6.6,0.5-9.9
                                c0.5-9.5,1.1-18.9,1.6-28.4c0.4,0,0.8,0,1.3,0c1.4,0,2.7,0.1,4,0.2c0.1,6.6,0.2,13.2,0.3,19.8c0.3,16.9,0.6,33.8,1.1,50.7
                                C743.7,385.5,743.8,389.2,743.9,392.9z"
              />
            </g>
            <g>
              <path
                className={`st22 target part ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M723.1,313.9c1.7-0.6,3.6-1.2,5.5-1.6c-5.2-27.4-11.7-54.6-19.5-81.5C715,258.3,719.7,286,723.1,313.9z"
              />
              <path
                className={`st22 target part ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.channel_class} ${tooth14Diagnozis.pulpit ? 'pulpit' : ''} ${tooth14Diagnozis.periodontit ? 'periodontit' : ''} top-sealed-part`}
                d="M742,296.7c0-2.8,0-5.5-0.1-8.3c-0.2-18.9-0.2-37.8-0.2-56.7v-1.9c0,0.6-0.1,1.3-0.1,1.9
                                c-0.9,15.4-1.8,30.8-2.7,46.2c-0.2,2.4-0.3,4.8-0.4,7.2c-0.5,8.7-1,17.4-1.5,26.1c0.4,0,0.8,0,1.3,0c1.4,0,2.7,0.1,4,0.2
                                C742.2,306.5,742.1,301.6,742,296.7z"
              />
            </g>
            {/* Отростки периодонтита */}
            <PeriodontitStage14 />
          </g>
          {/*PIN*/}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth14Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M703.1 436.3C703.6 449.2 707 461.8 713 473.5L738 470.6L763 476.2C766.3 465.6 
                            768.5 454.6 769.5 443.5C770.1 436.8 770.2 430 770 423.1C769.3 419.3 768.6 415.5 767.9 411.7C767.5 411.2 
                            767.1 410.7 766.8 410.2C766.5 409.8 766.1 409.4 765.8 408.9C765.7 408.8 765.6 408.6 765.5 408.5C765.2 
                            408.1 764.9 407.7 764.5 407.4C764.4 407.3 764.3 407.2 764.2 407.1C763.9 406.8 763.6 406.4 763.3 406.1C762.5 
                            405.2 761.6 404.3 760.7 403.5C759.7 402.6 758.7 401.7 757.6 400.8C757.1 400.4 756.7 400 756.2 399.7C754.1 
                            398 751.8 396.5 749.4 395.3C748.9 395 748.3 394.8 747.8 394.5C747 394.1 746.1 393.8 745.3 393.6C745 393.5 
                            744.8 393.4 744.5 393.4C744.2 393.3 744 393.3 743.7 393.2C743.4 393.1 743.2 393.1 742.9 393C742.7 392.9 
                            742.4 392.9 742.1 392.8C741.9 392.8 741.6 392.7 741.4 392.7H741.3C741 392.7 740.8 392.6 740.5 392.6C740.2 
                            392.6 740 392.5 739.7 392.5C739.6 392.5 739.4 392.5 739.3 392.5C739.2 392.5 739.1 392.5 739 392.5C738.9 
                            392.5 738.9 392.5 738.8 392.5C738.7 392.5 738.5 392.5 738.3 392.5C738 392.5 737.7 392.5 737.4 392.5C736.9 
                            392.5 736.3 392.5 735.8 392.5C735.4 392.5 735.1 392.5 734.7 392.6C734.4 392.6 734.2 392.6 733.9 392.7C733.7 
                            392.7 733.4 392.7 733.2 392.8H733.1C732.5 392.9 731.9 393 731.3 393.1C731.2 393.1 731.1 393.1 730.9 
                            393.2C730.5 393.3 730 393.4 729.6 393.5H729.5C729.2 393.6 728.9 393.7 728.6 393.7C728.3 393.8 728 393.9 
                            727.8 393.9H727.7C727.5 394 727.2 394 727 394.1C726.5 394.3 725.9 394.5 725.4 394.7C725.2 394.8 724.9 
                            394.9 724.7 395C724.4 395.1 724.1 395.3 723.7 395.4C723.5 395.5 723.2 395.6 723 395.7C722.5 395.9 722 396.2 
                            721.5 396.5C721.3 396.6 721.1 396.7 720.9 396.8C719.9 397.4 718.8 398 717.9 398.7C717.7 398.8 717.5 399 
                            717.4 399.1C717.1 399.3 716.8 399.6 716.5 399.8C716.1 400.1 715.7 400.5 715.3 400.8C714.9 401.1 714.5 401.5 714.1 401.8C712.8 403 711.6 404.3 710.5 
                            405.8C710.2 406.2 709.9 406.6 709.6 407C709.6 407.1 709.5 407.1 709.5 407.2C709.2 407.6 708.9 408 708.6 408.5C708.3 409 
                            708 409.5 707.7 410C707.3 410.7 706.9 411.4 706.5 412.1C706.2 412.7 705.9 413.3 705.6 413.9C705.5 414.2 705.3 414.6 705.1 
                            414.9C705 415.2 704.8 415.6 704.7 415.9C704.6 416.2 704.4 416.6 704.3 416.9C704.1 417.5 703.9 418 703.7 418.6C703.2 424.6 
                            702.8 430.4 703.1 436.3Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M719.799 294.3L723.599 342.9L732.699 471.2L737.899 470.6H737.999L750.999 473.5L724.399 
                            293.7C724.199 292.6 723.299 291.8 722.199 291.8C720.699 291.8 719.699 293 719.799 294.3Z"
              style={{ fill: tooth14Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth14Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth14Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M719.8,294.3l7.7,99.6c0,0,0.1,0,0.1,0c0.3-0.1,0.5-0.2,0.8-0.2c0.3-0.1,0.6-0.2,0.9-0.2c0,0,0,0,0.1,0
                            c0.4-0.1,0.9-0.2,1.3-0.3c0.1,0,0.3-0.1,0.4-0.1c0.6-0.1,1.2-0.2,1.8-0.3c0,0,0.1,0,0.1,0c0.2,0,0.5-0.1,0.7-0.1
                            c0.3,0,0.5-0.1,0.8-0.1c0.4,0,0.7-0.1,1.1-0.1h0c0.5,0,1.1,0,1.6,0h0c0.3,0,0.6,0,0.9,0c0.2,0,0.3,0,0.5,0c0.1,0,0.1,0,0.2,0
                            c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.4,0c0.3,0,0.5,0,0.8,0.1c0.3,0,0.5,0.1,0.8,0.1c0,0,0.1,0,0.1,0c0.2,0,0.5,0.1,0.7,0.1
                            c0.2,0,0.5,0.1,0.8,0.2l-18.3-99.3c-0.2-1.1-1.2-1.9-2.2-1.9C720.8,291.8,719.7,293,719.8,294.3z"
            />
            <path
              className="st15"
              d="M703.1,436.3c0.5,12.9,3.9,25.5,9.9,37.2l25-2.9l25,5.6c3.3-10.6,5.5-21.6,6.5-32.7
                            c0.6-6.7,0.7-13.5,0.5-20.4c-0.7-3.8-1.4-7.6-2.1-11.4c0,0,0,0,0,0c-0.4-0.5-0.8-1-1.1-1.5c-0.3-0.4-0.7-0.8-1-1.3
                            c-0.1-0.1-0.2-0.3-0.3-0.4c-0.3-0.4-0.6-0.8-1-1.1c-0.1-0.1-0.2-0.2-0.3-0.3c-0.3-0.3-0.6-0.7-0.9-1c-0.8-0.9-1.7-1.8-2.6-2.6
                            c-1-0.9-2-1.8-3.1-2.7c-0.5-0.4-0.9-0.8-1.4-1.1c-2.1-1.7-4.4-3.2-6.8-4.4c-0.5-0.3-1.1-0.5-1.6-0.8c0,0,0,0,0,0
                            c-0.8-0.4-1.7-0.7-2.5-0.9c-0.3-0.1-0.5-0.2-0.8-0.2c-0.3-0.1-0.5-0.1-0.8-0.2c-0.3-0.1-0.5-0.1-0.8-0.2
                            c-0.2-0.1-0.5-0.1-0.8-0.2c-0.2,0-0.5-0.1-0.7-0.1c0,0-0.1,0-0.1,0c-0.3,0-0.5-0.1-0.8-0.1c-0.3,0-0.5-0.1-0.8-0.1
                            c-0.1,0-0.3,0-0.4,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.3,0-0.5,0c-0.3,0-0.6,0-0.9,0h0c-0.5,0-1.1,0-1.6,0h0
                            c-0.4,0-0.7,0-1.1,0.1c-0.3,0-0.5,0-0.8,0.1c-0.2,0-0.5,0-0.7,0.1c0,0-0.1,0-0.1,0c-0.6,0.1-1.2,0.2-1.8,0.3
                            c-0.1,0-0.2,0-0.4,0.1c-0.4,0.1-0.9,0.2-1.3,0.3c0,0-0.1,0-0.1,0c-0.3,0.1-0.6,0.2-0.9,0.2c-0.3,0.1-0.6,0.2-0.8,0.2
                            c0,0-0.1,0-0.1,0c-0.2,0.1-0.5,0.1-0.7,0.2c-0.5,0.2-1.1,0.4-1.6,0.6c-0.2,0.1-0.5,0.2-0.7,0.3c-0.3,0.1-0.6,0.3-1,0.4
                            c-0.2,0.1-0.5,0.2-0.7,0.3c-0.5,0.2-1,0.5-1.5,0.8c-0.2,0.1-0.4,0.2-0.6,0.3c-1,0.6-2.1,1.2-3,1.9c-0.2,0.1-0.4,0.3-0.5,0.4
                            c-0.3,0.2-0.6,0.5-0.9,0.7c-0.4,0.3-0.8,0.7-1.2,1c-0.4,0.3-0.8,0.7-1.2,1c-1.3,1.2-2.5,2.5-3.6,4c-0.3,0.4-0.6,0.8-0.9,1.2
                            c0,0.1-0.1,0.1-0.1,0.2c-0.3,0.4-0.6,0.8-0.9,1.3c-0.3,0.5-0.6,1-0.9,1.5c-0.4,0.7-0.8,1.4-1.2,2.1c-0.3,0.6-0.6,1.2-0.9,1.8
                            c-0.1,0.3-0.3,0.7-0.5,1c-0.1,0.3-0.3,0.7-0.4,1c-0.1,0.3-0.3,0.7-0.4,1c-0.2,0.6-0.4,1.1-0.6,1.7c0,0,0,0,0,0
                            C703.2,424.6,702.8,430.4,703.1,436.3z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth14Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth14Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st30"
              d="M767.7,411.7c-3-4-6.5-7.6-10.4-10.9c-3.7-3.1-7.7-5.8-12.3-7.2c-3-0.9-6.2-1.3-9.4-1.1
                            c-11.8,0.6-22.1,7.5-28,17.3l12-24.5l29.9-2.3L767.7,411.7z"
            />
            <path
              className="st17"
              d="M769.3,443.5c-1,11.1-3.2,22-6.5,32.7l-25-5.6l-25,2.9c-6-11.7-9.3-24.3-9.9-37.2
                            c-0.2-5.8,0.1-11.7,0.4-17.6c1.1-3,2.4-5.9,4-8.7c0.1-0.1,0.1-0.2,0.1-0.2c5.9-9.8,16.2-16.7,28-17.3c3.2-0.2,6.4,0.2,9.4,1.1
                            c4.6,1.4,8.7,4.2,12.3,7.2c3.9,3.3,7.4,6.9,10.4,10.9c0.7,3.8,1.4,7.6,2.1,11.4C770.1,429.9,769.9,436.7,769.3,443.5z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <path
              className="st44"
              d="M760.465 420.849C761.032 423.2 759.4 425.514 756.994 425.766L721.73 429.466C719.325 429.718 717.248 427.796 717.314 425.379L718.397 385.633C718.452 383.621 719.993 381.964 721.996 381.762L746.87 379.26C748.858 379.06 750.689 380.359 751.158 382.302L760.465 420.849Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth14Diagnozis.abutment ||
                tooth14Diagnozis.implant ||
                tooth14Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M756,382.5l-42,3.2c-1.6-22.3-2.6-44.6-3.1-66.8c-0.5-21.6-0.6-43.2-0.1-64.8c3.1-4.2,7.6-6.8,12.7-7.2
                            c5.3-0.5,10.8,1.5,15,5.5c3.5,22.4,6.7,44.8,9.7,67.2C751,340.6,753.6,361.5,756,382.5z"
            />
            <line className="st19" x1="758.2" y1="364" x2="709.9" y2="373.9" />
            <line className="st19" x1="756.2" y1="338.5" x2="708" y2="348.4" />
            <line className="st19" x1="753.3" y1="313" x2="705.1" y2="322.9" />
            <line
              className="st19"
              x1="751.4"
              y1="287.5"
              x2="703.1"
              y2="297.4"
            />
            <line className="st19" x1="749.4" y1="262" x2="701.2" y2="271.9" />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth14Diagnozis.culttab &&
                !tooth14Diagnozis.abutment &&
                !tooth14Diagnozis.implant &&
                !tooth14Diagnozis.shaper &&
                !tooth14Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M781.2,450.5c-0.7-4.6-1.9-9.2-2.9-13.8c-0.7-3.4-1.3-6.8-2.3-10
                            c-0.8-2.8-1.9-5.4-3.2-7.9c-3.6-6.9-8.8-13-14.9-18.1c-3.7-3.1-7.7-5.8-12.3-7.2c-3-0.9-6.2-1.3-9.4-1.1
                            c-11.9,0.6-22.3,7.6-28.1,17.5c-2.3,3.9-3.8,8.1-5.3,12.4c-0.5,1.4-0.9,2.7-1.4,4.1c-2,5.9-4.3,11.7-5.4,17.8
                            c-1.3,7.1-1.1,14.3,0.6,21.3c1.8,4.9,4.1,9.5,6.9,13.9c3.8,6.1,8.6,11.6,12.8,17.3c0.4,0.5,0.8,1,1.1,1.5
                            c3.3,4.6,6.8,9.3,12.2,11.7c4.8,2.2,10.5,2,15.3-0.1c6.5-2.9,10.6-8.9,15.8-13.6c0.2-0.2,0.4-0.4,0.7-0.6
                            c5.1-4.5,11.1-8,15.1-13.4c2.3-3.1,3.9-6.7,4.5-10.5C782.1,464.5,782.2,457.4,781.2,450.5z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth14Diagnozis.culttab && !tooth14Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M700.585 429.395C698.908 434.242 697.238 439.069 696.248 444.1C694.848 451.2 
                            695.048 458.5 696.748 465.2C698.548 470.1 700.848 474.7 703.648 479.1C706.157 483.127 709.101 486.893 712.021 
                            490.627C713.524 492.549 715.021 494.463 716.448 496.4C716.748 496.9 717.148 497.4 717.548 497.9C720.848 502.6 
                            724.248 507.2 729.648 509.6C734.448 511.8 740.048 511.7 744.948 509.5C749.472 507.482 752.834 503.962 756.213 
                            500.424C757.688 498.878 759.168 497.329 760.748 495.9C761.048 495.701 761.248 495.501 761.448 495.301L761.448 
                            495.3C763.13 493.816 764.91 492.441 766.684 491.071C770.288 488.285 773.868 485.52 776.548 481.9C778.848 
                            478.8 780.348 475.2 781.048 471.4C782.348 464.5 782.448 457.4 781.448 450.4C780.951 447.064 780.202 443.827 
                            779.452 440.585C779.145 439.26 778.838 437.935 778.548 436.6C778.392 435.866 778.242 435.126 778.09 
                            434.383C777.561 431.791 777.026 429.166 776.248 426.6C775.448 423.9 774.348 421.2 773.048 418.7C769.448 411.8 
                            764.248 405.7 758.148 400.6C754.548 397.6 750.448 394.8 745.848 393.4C742.848 392.5 739.648 392.1 736.448 
                            392.3C724.548 392.9 714.248 399.9 708.348 409.8C706.048 413.7 704.448 417.9 703.048 422.2C702.833 422.802 702.637 423.404 702.443 
                            423.998C702.186 424.786 701.933 425.559 701.648 426.3C701.298 427.334 700.941 428.365 700.585 429.395ZM712.15 421.695C711.702 
                            422.954 712.558 424.318 713.889 424.43L765.544 428.775C766.879 428.887 767.953 427.678 767.629 426.379C767.466 425.725 767.288 
                            425.074 767.09 424.427C766.491 422.429 765.667 420.43 764.694 418.58C761.998 413.472 758.104 408.957 753.535 405.181C750.839 402.961 
                            747.769 400.888 744.324 399.852C742.077 399.185 739.681 398.889 737.284 399.037C728.372 399.482 720.659 404.663 716.24 411.991C714.603 414.736 713.565 417.681 712.522 420.641C712.398 420.993 712.274 421.344 712.15 421.695Z"
            />
            <path
              className={`st7 ${tooth14Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M713.671 424.43C712.339 424.318 711.483 422.954 711.931 421.695C713.109 418.382 714.19 415.062 716.022 
                                411.991C720.44 404.663 728.154 399.482 737.066 399.037C739.462 398.889 741.858 399.185 744.105 399.852C747.55 400.888 
                                750.621 402.961 753.317 405.181C757.885 408.957 761.779 413.472 764.475 418.58C765.449 420.43 766.273 422.429 766.872 
                                424.427C767.07 425.074 767.247 425.725 767.41 426.379C767.734 427.678 766.66 428.887 765.325 428.775L713.671 424.43Z"
            />
            <path
              className={`st60
                                    ${tooth14Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth14Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth14Diagnozis.seal_cervical_color}
                                `}
              d="M713.671 424.43C712.339 424.318 711.483 422.954 711.931 421.695C713.109 418.382 714.19 
                            415.062 716.022 411.991C720.44 404.663 728.154 399.482 737.066 399.037C739.462 398.889 741.858 399.185 744.105 399.852C747.55 
                            400.888 750.621 402.961 753.317 405.181C757.885 408.957 761.779 413.472 764.475 418.58C765.449 420.43 766.273 422.429 766.872 
                            424.427C767.07 425.074 767.247 425.725 767.41 426.379C767.734 427.678 766.66 428.887 765.325 428.775L713.671 424.43Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth14.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M779.5 444L777.5 443L776.5 441L775.5 439.5L774.5 438.5L774 437L773.5 435.5V434L772.5 
                            431.5V429L771.5 426L770.5 424.5L770 421.5L769 419.5L767.5 417.5V415.5L766 414.5L764.5 412L763 410.5L761.5 408.5L759.5 
                            407.5L758 406L757 405L755.5 403L753.5 401.5L752 400.5L749.5 398.5L746.5 397.5L745 396H743L740 394.5H738.5L735 
                            396H733H731L727.5 396.5L724 397.5L721.5 399.5L719 401.5L717 402.5L715.5 405H714.5L713.5 407L712.5 408.5L711 409.5L709 
                            412L708 415.5V417.5L706.5 418.5V419.5L705 421.5V423.5L704 424.5V426L702.5 429L701.5 432.5L701 434L700 435.5L697.5 
                            436.5L697 435L697.5 432.5L697 431.5V428.5L698.5 426L699.5 424V421.5L700 419.5L701 417.5L701.5 415.5V412V410.5V409.5L702.5 
                            407.5V405.5L703 403.5L702.5 401.5L704 398.5L703.5 396V393L704 390.5V388.5L705 388L706.5 386L708 385L709 384L712.5 382.5L715.5 
                            380L719 378L720.5 377L724.5 376.5L726.5 375H728.5L731 374.5L733 375L736 374.5L738.5 373.5L743 374.5H745L747.5 375L751 
                            376.5L753.5 379L755.5 380L758 381L759.5 382.5L762.5 383.5L764.5 386L765.5 387L766 388.5L767.5 390.5V393L768.5 397.5L770.5 
                            401.5L770 405L771.5 407.5L772.5 410.5L774 413.5L774.5 415.5L776 418.5L776.5 421.5V423.5L777.5 427V429L778.5 431.5L779 
                            434.5L779.5 437L780.5 439.5V441L780 442.5L779.5 444Z"
            />
            <path
              className="st61 level1"
              d="M779.5 444L777.5 443L776.5 441L775.5 439.5L774.5 438.5L774 437L773.5 435.5V434L772.5 
                            431.5V429L771.5 426L770.5 424.5L770 421.5L769 419.5L767.5 417.5V415.5L766 414.5L764.5 412L763 410.5L761.5 408.5L759.5 407.5L758 
                            406L757 405L755.5 403L753.5 401.5L752 400.5L749.5 398.5L746.5 397.5L745 396H743L740 394.5H738.5L735 396H733H731L727.5 
                            396.5L724 397.5L721.5 399.5L719 401.5L717 402.5L715.5 405H714.5L713.5 407L712.5 408.5L711 409.5L709 412L708 415.5V417.5L706.5 
                            418.5V419.5L705 421.5V423.5L704 424.5V426L702.5 429L701.5 432.5L701 434L700 435.5L697.5 436.5L697 435L697.5 432.5L698.5 
                            430.5V428.5L700 426L700.5 424.5V421.5L701.5 420.5L702 417.5L703 415L704 411V408.5L705 405L706.5 401.5L708.5 399.5L709.5 
                            397.5L714.5 394.5L715.5 393L721 389.5L724 388L725 387L731 386H734L740 386.5H744.5L746.5 388L751 389.5L753.5 391.5L756 
                            393.5L760.5 396.5L761.5 398.5L765 401L766 403.5L768.5 406L770 408.5L771 411L772.5 414.5L773.5 415.5L775.5 418.5V420.5V422.5L776.5 
                            423.5L777.5 427V429L778.5 431.5L779 434.5L779.5 437L780.5 439.5V441L780 442.5L779.5 444Z"
            />
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth14Diagnozis.culttab &&
                !tooth14Diagnozis.abutment &&
                !tooth14Diagnozis.implant &&
                !tooth14Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС CENTER*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M713.8,452.7c1.2,14.7,2.7,35.1,3.4,45.3c3.3,4.6,6.8,9.3,12.2,11.7c4.8,2.2,10.5,2,15.3-0.1
                                c6.5-2.9,10.6-8.9,15.8-13.6c0.2-0.2,0.4-0.4,0.7-0.6c-0.1-9.3-0.3-24.3-0.3-37.3c-6.2-4.2-16.7-10.5-24.7-10.5
                                C728.3,447.6,719.2,450.6,713.8,452.7z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth14.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth14.seal_center ? `seal-fill ${teethDiagnozis.tooth14.seal_center_color}` : ''}
                            `}
                d="M713.8,452.7c1.2,14.7,2.7,35.1,3.4,45.3c3.3,4.6,6.8,9.3,12.2,11.7c4.8,2.2,10.5,2,15.3-0.1
                                c6.5-2.9,10.6-8.9,15.8-13.6c0.2-0.2,0.4-0.4,0.7-0.6c-0.1-9.3-0.3-24.3-0.3-37.3c-6.2-4.2-16.7-10.5-24.7-10.5
                                C728.3,447.6,719.2,450.6,713.8,452.7z"
                style={{
                  fill: teethDiagnozis.tooth14.caries_center
                    ? '#606c80'
                    : teethDiagnozis.tooth14.seal_center
                      ? teethDiagnozis.tooth14.seal_center_color
                      : 'transparent',
                }}
              />
            </g>
            {/*КАРИЕС LEFT*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth14.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth14.seal_left ? `seal-fill ${teethDiagnozis.tooth14.seal_left_color}` : ''}
                            `}
                d="M696.4,465.2c1.8,4.9,4.1,9.5,6.9,13.9c3.8,6.1,8.6,11.6,12.8,17.3c0.4,0.5,0.8,1,1.1,1.5
                                c-0.7-10.2-2.2-30.5-3.4-45.3c-0.8-9.5-1.4-16.7-1.6-17.3c-0.4-1.3-6.4-9.1-9.6-13.3c-0.5,1.4-0.9,2.7-1.4,4.1
                                c-2,5.9-4.3,11.7-5.4,17.8C694.5,451,694.7,458.3,696.4,465.2z"
              />
              <path
                className="st58"
                d="M696.4,465.2c1.8,4.9,4.1,9.5,6.9,13.9c3.8,6.1,8.6,11.6,12.8,17.3c0.4,0.5,0.8,1,1.1,1.5
                                c-0.7-10.2-2.2-30.5-3.4-45.3c-0.8-9.5-1.4-16.7-1.6-17.3c-0.4-1.3-6.4-9.1-9.6-13.3c-0.5,1.4-0.9,2.7-1.4,4.1
                                c-2,5.9-4.3,11.7-5.4,17.8C694.5,451,694.7,458.3,696.4,465.2z"
                style={{ fill: 'transparent', zIndex: 2000 }}
              />
            </g>
            {/* КАРИЕС RIGHT */}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M760.8,458c0,13,0.2,28,0.3,37.3c5.1-4.5,11.1-8,15.1-13.4c2.3-3.1,3.9-6.7,4.5-10.5c1.3-6.9,1.5-14,0.4-21
                                c-0.7-4.6-1.9-9.2-2.9-13.8c-0.7-3.4-1.3-6.8-2.3-10c-0.8-2.8-1.9-5.4-3.2-7.9c-4.1,4.4-10.7,11.7-11.4,14.4
                                C760.9,434.6,760.8,445.3,760.8,458z"
              />
              <path
                className={`st8 caries-right
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth14.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth14.seal_right ? `seal-fill ${teethDiagnozis.tooth14.seal_right_color}` : ''}
                            `}
                d="M760.8,458c0,13,0.2,28,0.3,37.3c5.1-4.5,11.1-8,15.1-13.4c2.3-3.1,3.9-6.7,4.5-10.5c1.3-6.9,1.5-14,0.4-21
                                c-0.7-4.6-1.9-9.2-2.9-13.8c-0.7-3.4-1.3-6.8-2.3-10c-0.8-2.8-1.9-5.4-3.2-7.9c-4.1,4.4-10.7,11.7-11.4,14.4
                                C760.9,434.6,760.8,445.3,760.8,458z"
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
                className="st58"
                d="M702.6,422.1c3.3,4.2,9.2,12,9.6,13.3c0.2,0.6,0.8,7.8,1.6,17.3c5.4-2.1,14.4-5.1,22.3-5.1
                                c8,0,18.5,6.2,24.7,10.5c0-12.7,0.1-23.4,0.5-24.9c0.7-2.7,7.3-10.1,11.4-14.4c-3.6-6.9-8.8-13-14.9-18.1
                                c-3.7-3.1-7.7-5.8-12.3-7.2c-3-0.9-6.2-1.3-9.4-1.1c-11.9,0.6-22.3,7.6-28.1,17.5C705.6,413.6,704.1,417.9,702.6,422.1z"
              />
              <path
                className={`
                                    st8 target caries-top
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth14.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth14.seal_top ? `seal-fill ${teethDiagnozis.tooth14.seal_top_color}` : ''}
                                `}
                d="M702.6,422.1c3.3,4.2,9.2,12,9.6,13.3c0.2,0.6,0.8,7.8,1.6,17.3c5.4-2.1,14.4-5.1,22.3-5.1
                                c8,0,18.5,6.2,24.7,10.5c0-12.7,0.1-23.4,0.5-24.9c0.7-2.7,7.3-10.1,11.4-14.4c-3.6-6.9-8.8-13-14.9-18.1
                                c-3.7-3.1-7.7-5.8-12.3-7.2c-3-0.9-6.2-1.3-9.4-1.1c-11.9,0.6-22.3,7.6-28.1,17.5C705.6,413.6,704.1,417.9,702.6,422.1z"
              />
            </g>
            <g className="with">
              {/*Черточка лево низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_left &&
                      !tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_center) ||
                    (tooth14Diagnozis.seal_left &&
                      tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_center) ||
                    (!tooth14Diagnozis.seal_left &&
                      tooth14Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M714 452.501L716.5 488.501"
              />
              {/*Черточка лево верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_left &&
                      !tooth14Diagnozis.seal_top) ||
                    (!tooth14Diagnozis.seal_left &&
                      tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_center) ||
                    (!tooth14Diagnozis.seal_left &&
                      tooth14Diagnozis.seal_top &&
                      tooth14Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M714 452.501C713 444.001 713.3 430.201 706.5 427.001"
              />
              {/*Черточка середина*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_center) ||
                    (tooth14Diagnozis.seal_right &&
                      tooth14Diagnozis.seal_left &&
                      tooth14Diagnozis.seal_center &&
                      !tooth14Diagnozis.seal_top) ||
                    (!tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_bottom &&
                      tooth14Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M714 452.501C733 446.002 745.3 446.401 760.5 458.001"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_right &&
                      !tooth14Diagnozis.seal_top) ||
                    (!tooth14Diagnozis.seal_right &&
                      tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_center) ||
                    (!tooth14Diagnozis.seal_right &&
                      tooth14Diagnozis.seal_top &&
                      tooth14Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M760.5 458.001C760.5 433.001 759.5 429.701 769.5 422.501"
              />
              {/*Черточка право низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth14Diagnozis.seal_right &&
                      !tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_center) ||
                    (tooth14Diagnozis.seal_right &&
                      tooth14Diagnozis.seal_top &&
                      !tooth14Diagnozis.seal_center) ||
                    (!tooth14Diagnozis.seal_right &&
                      tooth14Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M760.5 457.5L761 489.5"
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
                visibility: tooth14Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth14Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth14Diagnozis.vinir_color}`}
                d="M781.2 450.5C780.5 445.9 779.3 441.3 778.3 436.7C777.6 433.3 777 429.9 776 426.7C775.2 423.9 774.1 
                                421.3 772.8 418.8C769.2 411.9 764 405.8 757.9 400.7C754.2 397.6 750.2 394.9 745.6 393.5C742.6 392.6 
                                739.4 392.2 736.2 392.4C724.3 393 713.9 400 708.1 409.9C705.8 413.8 704.3 418 702.8 422.3C702.3 423.7 
                                701.9 425 701.4 426.4C699.4 432.3 697.1 438.1 696 444.2C694.7 451.3 694.9 458.5 696.6 465.5C698.4 
                                470.4 700.7 475 703.5 479.4C707.3 485.5 712.1 491 716.3 496.7C716.7 497.2 717.1 497.7 717.4 498.2C720.7 
                                502.8 724.2 507.5 729.6 509.9C734.4 512.1 740.1 511.9 744.9 509.8C751.4 506.9 755.5 500.9 760.7 
                                496.2C760.9 496 761.1 495.8 761.4 495.6C766.5 491.1 772.5 487.6 776.5 482.2C778.8 479.1 780.4 475.5 
                                781 471.7C782.1 464.5 782.2 457.4 781.2 450.5Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth14Diagnozis.temporary_crown ||
                tooth14Diagnozis.ceramic_crown ||
                tooth14Diagnozis.mceramic_crown ||
                tooth14Diagnozis.metalic_crown ||
                tooth14Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth14Diagnozis.temporary_crown ||
                tooth14Diagnozis.ceramic_crown ||
                tooth14Diagnozis.mceramic_crown ||
                tooth14Diagnozis.metalic_crown ||
                tooth14Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth14Diagnozis.ceramic_crown_color}
                                ${tooth14Diagnozis.mceramic_crown_color}
                                ${tooth14Diagnozis.metalic_crown_color}
                                ${tooth14Diagnozis.zirconia_crown_color}
                            `}
              d="M781.2,450.5c-0.7-4.6-1.9-9.2-2.9-13.8c-0.7-3.4-1.3-6.8-2.3-10
                            c-0.8-2.8-1.9-5.4-3.2-7.9c-3.6-6.9-8.8-13-14.9-18.1c-3.7-3.1-7.7-5.8-12.3-7.2c-3-0.9-6.2-1.3-9.4-1.1
                            c-11.9,0.6-22.3,7.6-28.1,17.5c-2.3,3.9-3.8,8.1-5.3,12.4c-0.5,1.4-0.9,2.7-1.4,4.1c-2,5.9-4.3,11.7-5.4,17.8
                            c-1.3,7.1-1.1,14.3,0.6,21.3c1.8,4.9,4.1,9.5,6.9,13.9c3.8,6.1,8.6,11.6,12.8,17.3c0.4,0.5,0.8,1,1.1,1.5
                            c3.3,4.6,6.8,9.3,12.2,11.7c4.8,2.2,10.5,2,15.3-0.1c6.5-2.9,10.6-8.9,15.8-13.6c0.2-0.2,0.4-0.4,0.7-0.6
                            c5.1-4.5,11.1-8,15.1-13.4c2.3-3.1,3.9-6.7,4.5-10.5C782.1,464.5,782.2,457.4,781.2,450.5z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
