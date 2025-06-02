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
  getActiveToothNumberSelector,
  allTeethChildSelector,
} from '../../../Redux/Formula/selectors';
import PeriodontitStage55 from './periodontit55';
import setupDiagnoze from '../../../lib/tfunctions';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth55() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
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
  const tooth55Diagnozis = teethDiagnozis.tooth55;
  const selectedTooth = useSelector(getActiveToothNumberSelector);
  const allTeeth = useSelector(allTeethChildSelector);

  const setColordedPart = (diagnozis, toothPart = '') => {
    if (diagnozis === 'caries') {
      if (toothPart === 'bottom') {
        teethDiagnozis.tooth55.caries_bottom =
          !teethDiagnozis.tooth55.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth55.caries_center =
          !teethDiagnozis.tooth55.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth55.caries_left =
          !teethDiagnozis.tooth55.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth55.caries_right =
          !teethDiagnozis.tooth55.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth55.caries_top = !teethDiagnozis.tooth55.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth55.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth55.seal_center_color = sealColor1;
          teethDiagnozis.tooth55.seal_center = true;
        } else if (
          teethDiagnozis.tooth55.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth55.seal_center_color = sealColor2;
          teethDiagnozis.tooth55.seal_center = true;
        } else if (
          teethDiagnozis.tooth55.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth55.seal_center_color = sealColor3;
          teethDiagnozis.tooth55.seal_center = true;
        } else {
          teethDiagnozis.tooth55.seal_center =
            !teethDiagnozis.tooth55.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth55.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth55.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth55.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth55.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth55.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth55.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth55.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth55.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth55.seal_bottom = true;
        } else {
          teethDiagnozis.tooth55.seal_bottom =
            !teethDiagnozis.tooth55.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth55.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth55.seal_left_color = sealColor1;
          teethDiagnozis.tooth55.seal_left = true;
        } else if (
          teethDiagnozis.tooth55.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth55.seal_left_color = sealColor2;
          teethDiagnozis.tooth55.seal_left = true;
        } else if (
          teethDiagnozis.tooth55.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth55.seal_left_color = sealColor3;
          teethDiagnozis.tooth55.seal_left = true;
        } else {
          teethDiagnozis.tooth55.seal_left = !teethDiagnozis.tooth55.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth55.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth55.seal_right_color = sealColor1;
          teethDiagnozis.tooth55.seal_right = true;
        } else if (
          teethDiagnozis.tooth55.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth55.seal_right_color = sealColor2;
          teethDiagnozis.tooth55.seal_right = true;
        } else if (
          teethDiagnozis.tooth55.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth55.seal_right_color = sealColor3;
          teethDiagnozis.tooth55.seal_right = true;
        } else {
          teethDiagnozis.tooth55.seal_right =
            !teethDiagnozis.tooth55.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth55.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth55.seal_top_color = sealColor1;
          teethDiagnozis.tooth55.seal_top = true;
        } else if (
          teethDiagnozis.tooth55.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth55.seal_top_color = sealColor2;
          teethDiagnozis.tooth55.seal_top = true;
        } else if (
          teethDiagnozis.tooth55.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth55.seal_top_color = sealColor3;
          teethDiagnozis.tooth55.seal_top = true;
        } else {
          teethDiagnozis.tooth55.seal_top = !teethDiagnozis.tooth55.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth55.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth55.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth55.wedge_shaped_defect_color =
          !teethDiagnozis.tooth55.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };
  const showHideOverlay = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth55.show &&
        !teethDiagnozis.tooth15.show
      ) {
        document.getElementById('TH-55').classList.add('f-tooth-active');
        document.getElementById('TH-55').style.opacity = '1';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth55.show &&
        teethDiagnozis.tooth15.show
      ) {
        document.getElementById('TH-55').classList.add('f-tooth-active');
        document.getElementById('TH-15').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult') {
        document.getElementById('TH-55').classList.remove('f-tooth-active');
        document.getElementById('TH-15').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth55.show &&
        !teethDiagnozis.tooth15.show
      ) {
        document.getElementById('TH-55').classList.remove('f-tooth-active');
        document.getElementById('TH-55').style.opacity = '0';
      }
      if (
        teethType === 'child' &&
        !teethDiagnozis.tooth55.show &&
        teethDiagnozis.tooth15.show
      ) {
        document.getElementById('TH-55').classList.remove('f-tooth-active');
        document.getElementById('TH-15').classList.add('f-tooth-active');
      }
    }
  };
  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth15.show) {
        document.getElementById('TH-55').classList.add('f-tooth-active');
        document.getElementById('TH-15').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && teethDiagnozis.tooth55.show) {
        document.getElementById('TH-55').classList.remove('f-tooth-active');
        document.getElementById('TH-15').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && teethDiagnozis.tooth15.show) {
        document.getElementById('TH-15').classList.add('f-tooth-active');
        document.getElementById('TH-55').classList.remove('f-tooth-active');
      }
    }
  };

  return (
    <>
      <g
        id="55"
        className={`tooth-number-active ${teethType === 'adult' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 630 716)"
          className={`st3 st4 st5 ${selectedTooth === 55 ? 'num-active' : ''}`}
        >
          55
        </text>
      </g>
      <g
        id="TH-55"
        className={`f-tooth-init-milk ${(teethDiagnozis.tooth55.show || allTeeth) && !teethDiagnozis.tooth55.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth55.show = !teethDiagnozis.tooth55.show;
            teethDiagnozis.tooth15.show = false;
          }

          dispatch(setSelectedToothNumber(55));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              55,
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
          onMouseOver={() => {
            showHideOverlay('over');
          }}
          onMouseLeave={() => {
            showHideOverlay('leave');
          }}
          className={`underlay ${selectedTooth === 55 ? 'selected' : ''}`}
          style={{
            visibility: 'inherit',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          <path
            className="st40"
            d="M631,233.9c0,0-3,28-4,40s-1,58-3,83s-13.1,61.9-14.1,83.5
                    c-0.9,21.5-3.9,37.5,2.1,54.5s14,23,10,37s-14.6,37.3-14.3,60.7s-0.7,76.3,7.3,105.3s25,36.9,43,36c19-1,35-15,35-57s2-90,3-109
                    s-12-39-14-50c-2-11,12-26,13-63s2-61-1-80s-9-66-13-84s-12-48-15-57s-11-21-22-18C636,218.1,632,223.9,631,233.9z"
          ></path>
        </g>
        <g
          className="top-view"
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 286, 35)',
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
              className={`d-ch-color`}
              style={{
                visibility:
                  !tooth55Diagnozis.culttab &&
                  !tooth55Diagnozis.implant &&
                  !tooth55Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st24 change-color ${tooth55Diagnozis?.change_color ? 'diagnoze-opacity' : ''} ${tooth55Diagnozis?.apex ? 'apex' : ''}`}
                d="M335.5,607c1-3.9,3.3-7.6,4.4-11.5c2.8-9.6-1.1-20.5,5.2-29.3c4.8-6.8,13.7-10.4,23.8-11.8
                                c9.5-1.3,19.3-0.5,28.9-1.7c6.1-0.8,12.2-2.2,18.2-2.6c6.4-0.5,12.7,0.2,18.4,1.8c3.9,1.1,7.6,2.7,10.8,4.9
                                c5.4,3.8,8.4,9.1,9.5,14.6c1.3,6.4,0.1,12.9-2.5,19.1c-3.8,9.3-10.5,17.8-15.1,26.9c-2.8,5.6-4.9,11.5-9.5,16.5
                                c-4,4.4-9.9,7.8-16.8,8.7c-5.1,0.7-10.3,0-15.5-0.5c-6.5-0.6-13-0.7-19.5-1.1c-5.7-0.3-11.4-0.8-16.7-2.4
                                C342.3,633.9,331.9,620.7,335.5,607z"
              />
            </g>
            <g
              className="hIntact hImplant hEmpty"
              style={{ visibility: 'hidden' }}
            >
              <path
                className={`st24 ${tooth55Diagnozis.apex ? 'apex' : ''}`}
                d="M335.5 607C336.5 603.1 338.8 599.401 339.9 595.5C342.7 585.9 338.8 575.001 345.1 566.201C349.9 559.401 358.8 555.801 368.9 554.401C378.4 553.101 388.2 553.901 397.8 552.701C403.9 551.901 410 550.5 416 550.1C422.4 549.6 428.7 550.301 434.4 551.901C438.3 553.001 442 554.6 445.2 556.8C450.6 560.6 453.6 565.901 454.7 571.401C456 577.801 454.8 584.3 452.2 590.5C448.4 599.8 441.7 608.301 437.1 617.401C434.3 623.001 432.2 628.901 427.6 633.901C423.6 638.301 417.7 641.7 410.8 642.6C405.7 643.3 400.5 642.6 395.3 642.1C388.8 
                                641.5 382.3 641.4 375.8 641C370.1 640.7 364.4 640.2 359.1 638.6C342.3 633.9 331.9 620.701 335.5 607Z"
              />
              <path
                className={`st53 ${tooth55Diagnozis.apex ? 'apex' : ''}`}
                d="M364.616 595.523C365.555 610.701 372.5 618.501 380.5 618.501C391 618.501 424 606.501 424 591.001C424 584.001 420.916 579.023 396.616 579.023C372.315 579.023 363.676 580.346 364.616 595.523Z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g
            className="pulp"
            style={{
              visibility:
                tooth55Diagnozis.apex || tooth55Diagnozis.pulpit
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="hIntact hEmpty hImplant pulpitis-pfilling"
              style={{
                visibility:
                  tooth55Diagnozis.apex || tooth55Diagnozis.pulpit
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <ellipse
                className="st22 target"
                rx="8.62899"
                ry="5.75303"
                transform="matrix(0.0172822 -0.999851 -0.999851 -0.0172822 415.901 591.728)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="7.75725"
                ry="7.03431"
                transform="matrix(0.643274 -0.765636 -0.765636 -0.643274 373.376 590.464)"
                style={{ fill: '#e80808' }}
              ></ellipse>
              <ellipse
                className="st22 target"
                rx="8.72166"
                ry="7.94529"
                transform="matrix(-0.99786 -0.0653869 -0.0653869 0.99786 381.223 609.499)"
                style={{ fill: '#e80808' }}
              ></ellipse>
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth55Diagnozis.implant || tooth55Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="391.5" cy="598.5" r="26.5"></circle>
            <g className="st27">
              <mask id="implant_55" className="st49">
                <path
                  className="st50"
                  d="M377.905 582.474L374.458 581.352C371.529 584.3 369.349 587.994 368.231 592.124L370.928 594.55C370.686 595.829 370.56 597.15 370.56 598.5C370.56 599.85 370.686 601.17 370.928 602.45L368.231 604.875C369.349 609.006 371.529 612.7 374.458 615.648L377.905 614.525C379.895 616.242 382.209 617.594 384.743 618.478L385.494 622.024C387.479 622.548 389.564 622.827 391.714 622.827C393.864 622.827 395.95 622.548 397.936 622.024L398.687 618.477C401.22 617.593 403.533 616.241 405.523 614.525L408.97 615.647C411.899 612.699 414.079 609.004 415.197 604.874L412.5 602.448C412.741 601.169 412.868 599.849 412.868 598.5C412.868 597.15 412.741 595.831 412.5 594.552L415.197 592.126C414.079 587.995 411.899 584.301 408.97 581.352L405.523 582.475C403.533 580.758 401.22 579.406 398.687 578.522L397.936 574.976C395.95 574.452 393.864 574.173 391.714 574.173C389.564 574.173 387.479 574.452 385.494 574.975L384.743 578.521C382.209 579.405 379.895 580.758 377.905 582.474Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M377.905 582.474L374.458 581.352C371.529 584.3 369.349 587.994 368.231 592.124L370.928 594.55C370.686 595.829 370.56 597.15 370.56 598.5C370.56 599.85 370.686 601.17 370.928 602.45L368.231 604.875C369.349 609.006 371.529 612.7 374.458 615.648L377.905 614.525C379.895 616.242 382.209 617.594 384.743 618.478L385.494 622.024C387.479 622.548 389.564 622.827 391.714 622.827C393.864 622.827 395.95 622.548 397.936 622.024L398.687 618.477C401.22 617.593 403.533 616.241 405.523 614.525L408.97 615.647C411.899 612.699 414.079 609.004 415.197 604.874L412.5 602.448C412.741 601.169 412.868 599.849 412.868 598.5C412.868 597.15 412.741 595.831 412.5 594.552L415.197 592.126C414.079 587.995 411.899 584.301 408.97 581.352L405.523 582.475C403.533 580.758 401.22 579.406 398.687 578.522L397.936 574.976C395.95 574.452 393.864 574.173 391.714 574.173C389.564 574.173 387.479 574.452 385.494 574.975L384.743 578.521C382.209 579.405 379.895 580.758 377.905 582.474Z"
              ></path>
              <path
                className="st52"
                d="M374.458 581.352L375.078 579.45L373.907 579.069L373.04 579.942L374.458 581.352ZM377.905 582.474L377.286 584.376L378.357 584.725L379.211 583.989L377.905 582.474ZM368.231 592.124L366.3 591.601L365.979 592.789L366.893 593.611L368.231 592.124ZM370.928 594.55L372.893 594.921L373.102 593.815L372.265 593.063L370.928 594.55ZM370.928 602.45L372.265 603.937L373.102 603.184L372.893 602.079L370.928 602.45ZM368.231 604.875L366.893 603.388L365.979 604.211L366.3 605.398L368.231 604.875ZM374.458 615.648L373.04 617.057L373.907 617.93L375.078 617.549L374.458 615.648ZM377.905 614.525L379.211 613.011L378.358 612.275L377.286 612.624L377.905 614.525ZM384.743 618.478L386.699 618.063L386.465 616.961L385.401 616.59L384.743 618.478ZM385.494 622.024L383.537 622.439L383.793 623.644L384.984 623.958L385.494 622.024ZM397.936 622.024L398.446 623.958L399.637 623.643L399.892 622.438L397.936 622.024ZM398.687 618.477L398.028 616.589L396.964 616.96L396.731 618.063L398.687 618.477ZM405.523 614.525L406.142 612.623L405.07 612.274L404.217 613.01L405.523 614.525ZM408.97 615.647L408.35 617.549L409.521 617.93L410.388 617.057L408.97 615.647ZM415.197 604.874L417.128 605.396L417.449 604.209L416.534 603.386L415.197 604.874ZM412.5 602.448L410.534 602.077L410.326 603.183L411.162 603.935L412.5 602.448ZM412.5 594.552L411.162 593.064L410.326 593.817L410.534 594.923L412.5 594.552ZM415.197 592.126L416.534 593.613L417.449 592.791L417.128 591.603L415.197 592.126ZM408.97 581.352L410.388 579.943L409.521 579.07L408.35 579.451L408.97 581.352ZM405.523 582.475L404.217 583.989L405.071 584.726L406.142 584.376L405.523 582.475ZM398.687 578.522L396.731 578.937L396.964 580.039L398.028 580.411L398.687 578.522ZM397.936 574.976L399.892 574.561L399.637 573.356L398.446 573.042L397.936 574.976ZM385.494 574.975L384.984 573.041L383.793 573.355L383.537 574.561L385.494 574.975ZM384.743 578.521L385.401 580.41L386.465 580.039L386.699 578.936L384.743 578.521ZM373.839 583.254L377.286 584.376L378.524 580.573L375.078 579.45L373.839 583.254ZM370.161 592.647C371.187 588.86 373.186 585.469 375.877 582.762L373.04 579.942C369.871 583.13 367.512 587.128 366.3 591.601L370.161 592.647ZM372.265 593.063L369.568 590.637L366.893 593.611L369.591 596.037L372.265 593.063ZM372.56 598.5C372.56 597.275 372.675 596.079 372.893 594.921L368.963 594.179C368.698 595.58 368.56 597.025 368.56 598.5H372.56ZM372.893 602.079C372.675 600.921 372.56 599.725 372.56 598.5H368.56C368.56 599.975 368.698 601.42 368.963 602.821L372.893 602.079ZM369.568 606.362L372.265 603.937L369.591 600.963L366.893 603.388L369.568 606.362ZM375.877 614.238C373.186 611.53 371.187 608.14 370.161 604.352L366.3 605.398C367.512 609.872 369.871 613.869 373.04 617.057L375.877 614.238ZM377.286 612.624L373.839 613.746L375.078 617.549L378.524 616.427L377.286 612.624ZM385.401 616.59C383.11 615.79 381.015 614.566 379.211 613.011L376.599 616.04C378.776 617.918 381.309 619.398 384.084 620.366L385.401 616.59ZM387.45 621.61L386.699 618.063L382.786 618.893L383.537 622.439L387.45 621.61ZM391.714 620.827C389.738 620.827 387.824 620.57 386.004 620.09L384.984 623.958C387.134 624.525 389.39 624.827 391.714 624.827V620.827ZM397.426 620.09C395.605 620.57 393.691 620.827 391.714 620.827V624.827C394.038 624.827 396.295 624.525 398.446 623.958L397.426 620.09ZM396.731 618.063L395.979 621.609L399.892 622.438L400.644 618.892L396.731 618.063ZM404.217 613.01C402.414 614.565 400.319 615.789 398.028 616.589L399.346 620.365C402.121 619.397 404.652 617.917 406.829 616.039L404.217 613.01ZM409.589 613.745L406.142 612.623L404.904 616.426L408.35 617.549L409.589 613.745ZM413.267 604.351C412.241 608.139 410.242 611.53 407.551 614.237L410.388 617.057C413.557 613.868 415.916 609.87 417.128 605.396L413.267 604.351ZM411.162 603.935L413.86 606.361L416.534 603.386L413.837 600.961L411.162 603.935ZM410.868 598.5C410.868 599.724 410.753 600.92 410.534 602.077L414.465 602.819C414.729 601.418 414.868 599.974 414.868 598.5H410.868ZM410.534 594.923C410.753 596.08 410.868 597.276 410.868 598.5H414.868C414.868 597.025 414.729 595.581 414.465 594.18L410.534 594.923ZM413.86 590.639L411.162 593.064L413.837 596.039L416.534 593.613L413.86 590.639ZM407.551 582.762C410.242 585.47 412.241 588.861 413.267 592.649L417.128 591.603C415.916 587.129 413.557 583.131 410.388 579.943L407.551 582.762ZM406.142 584.376L409.589 583.254L408.35 579.451L404.904 580.573L406.142 584.376ZM398.028 580.411C400.319 581.21 402.414 582.434 404.217 583.989L406.829 580.96C404.653 579.083 402.121 577.602 399.346 576.634L398.028 580.411ZM395.979 575.39L396.731 578.937L400.644 578.108L399.892 574.561L395.979 575.39ZM391.714 576.173C393.691 576.173 395.605 576.429 397.426 576.91L398.446 573.042C396.295 572.475 394.038 572.173 391.714 572.173V576.173ZM386.004 576.909C387.824 576.429 389.738 576.173 391.714 576.173V572.173C389.39 572.173 387.134 572.474 384.984 573.041L386.004 576.909ZM386.699 578.936L387.45 575.39L383.537 574.561L382.786 578.107L386.699 578.936ZM379.211 583.989C381.015 582.433 383.11 581.209 385.401 580.41L384.084 576.633C381.309 577.601 378.776 579.082 376.599 580.96L379.211 583.989Z"
                mask="url(#implant_55)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <circle className="st44" cx="391.5" cy="598.5" r="28.5"></circle>
            <path
              className="st45"
              d="M389.577 589.739C390.129 587.804 392.871 587.804 393.423 589.739L393.929 591.511C394.225 592.549 395.291 593.164 396.338 592.902L398.126 592.454C400.077 591.965 401.448 594.339 400.049 595.785L398.767 597.109C398.016 597.884 398.016 599.116 398.767 599.891L400.049 601.215C401.448 602.661 400.077 605.035 398.126 604.546L396.338 604.098C395.291 603.836 394.225 604.451 393.929 605.489L393.423 607.261C392.871 609.196 390.129 609.196 389.577 607.261L389.071 605.489C388.775 604.451 387.709 603.836 386.662 604.098L384.874 604.546C382.923 605.035 381.552 602.661 382.951 601.215L384.233 599.891C384.984 599.116 384.984 597.884 384.233 597.109L382.951 595.785C381.552 594.339 382.923 591.965 384.874 592.454L386.662 592.902C387.709 593.164 388.775 592.549 389.071 591.511L389.577 589.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth55Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth55Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M335.5 607C336.5 603.1 338.8 599.401 339.9 595.5C342.7 585.9 338.8 575.001 345.1 566.201C349.9 559.401 358.8 555.801 368.9 554.401C378.4 553.101 388.2 553.901 397.8 552.701C403.9 551.901 410 550.5 416 550.1C422.4 549.6 428.7 550.301 434.4 551.901C438.3 553.001 442 554.6 445.2 556.8C450.6 560.6 453.6 565.901 454.7 571.401C456 577.801 454.8 584.3 452.2 590.5C448.4 599.8 441.7 608.301 437.1 617.401C434.3 623.001 432.2 628.901 427.6 633.901C423.6 638.301 417.7 641.7 410.8 642.6C405.7 643.3 400.5 642.6 395.3 642.1C388.8 641.5 382.3 641.4 375.8 641C370.1 640.7 364.4 640.2 359.1 638.6C342.3 633.9 331.9 620.701 335.5 607Z"
            ></path>
            <path
              className="st47"
              d="M352.508 604.127C353.222 601.316 354.864 598.649 355.65 595.838C357.649 588.919 354.864 581.062 359.363 574.719C362.79 569.818 369.145 567.223 376.357 566.214C383.141 565.277 390.138 565.854 396.993 564.989C401.349 564.412 405.705 563.403 409.989 563.115C414.559 562.754 419.057 563.259 423.128 564.412C425.912 565.205 428.554 566.358 430.839 567.944C434.695 570.683 436.837 574.503 437.623 578.467C438.551 583.08 437.694 587.765 435.838 592.234C433.124 598.938 428.34 605.064 425.056 611.623C423.056 615.66 421.557 619.912 418.272 623.516C415.416 626.688 411.203 629.139 406.276 629.787C402.634 630.292 398.921 629.787 395.208 629.427C390.567 628.994 385.926 628.922 381.284 628.634C377.214 628.418 373.144 628.057 369.36 626.904C357.363 623.516 349.937 614.002 352.508 604.127Z"
            ></path>
            <circle className="st45" cx="392" cy="598" r="13"></circle>
          </g>
          {/* PIN */}
          <g
            className="pin hEmpty hImplant"
            style={{ opacity: 0, visibility: 'inherit' }}
          >
            <path
              className="st56 hIntact"
              d="M335.5 607C336.5 603.1 338.8 599.4 339.9 595.5C342.7 585.9 338.8 575.001 345.1 566.201C349.9 559.401 358.8 555.801 368.9 554.401C378.4 553.101 388.2 553.901 397.8 552.701C403.9 551.901 410 550.5 416 550.1C422.4 549.6 428.7 550.301 434.4 551.901C438.3 553.001 442 554.6 445.2 556.8C450.6 560.6 453.6 565.901 454.7 571.401C456 577.801 454.8 584.3 452.2 590.5C448.4 599.8 441.7 608.301 437.1 617.401C434.3 623.001 432.2 628.901 427.6 633.901C423.6 638.301 417.7 641.7 410.8 642.6C405.7 643.3 400.5 642.6 395.3 642.1C388.8 641.5 382.3 641.4 375.8 641C370.1 640.7 364.4 640.2 359.1 638.6C342.3 633.9 331.9 620.7 335.5 607Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M352.508 604.127C353.222 601.316 354.865 598.649 355.65 595.838C357.65 588.919 354.865 581.062 359.363 574.719C362.791 569.818 369.146 567.223 376.358 566.214C383.141 565.277 390.139 565.854 396.994 564.989C401.35 564.412 405.705 563.403 409.99 563.115C414.559 562.754 419.058 563.259 423.128 564.412C425.913 565.205 428.555 566.358 430.84 567.944C434.696 570.683 436.838 574.503 437.623 578.467C438.552 583.08 437.695 587.765 435.838 592.234C433.125 598.938 428.341 605.064 425.056 611.623C423.057 615.66 421.557 619.912 418.273 623.516C415.416 626.688 411.203 629.139 406.276 629.787C402.635 630.292 398.922 629.787 395.209 629.427C390.567 628.994 385.926 628.922 381.285 628.634C377.215 628.418 373.145 628.057 369.36 626.904C357.364 623.516 349.938 614.002 352.508 604.127Z"
              style={{ visibility: 'hidden' }}
            />
            <circle
              className="st57"
              cx="392"
              cy="598"
              r="12.25"
              style={{ fill: 'black', opacity: tooth55Diagnozis.pin ? 1 : 0 }}
            ></circle>
          </g>
          {/* CULTTAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: !tooth55Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth55Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M335.5 607C336.5 603.1 338.8 599.401 339.9 595.5C342.7 585.9 338.8 575.001 345.1 566.201C349.9 559.401 358.8 555.801 368.9 554.401C378.4 553.101 388.2 553.901 397.8 552.701C403.9 551.901 410 550.5 416 550.1C422.4 549.6 428.7 550.301 434.4 551.901C438.3 553.001 442 554.6 445.2 556.8C450.6 560.6 453.6 565.901 454.7 571.401C456 577.801 454.8 584.3 452.2 590.5C448.4 599.8 441.7 608.301 437.1 617.401C434.3 623.001 432.2 628.901 427.6 633.901C423.6 638.301 417.7 641.7 410.8 642.6C405.7 643.3 400.5 642.6 395.3 642.1C388.8 641.5 382.3 641.4 375.8 641C370.1 640.7 364.4 640.2 359.1 638.6C342.3 633.9 331.9 620.701 335.5 607Z"
            ></path>
            <path
              className="st47"
              d="M352.508 604.127C353.222 601.316 354.864 598.649 355.65 595.838C357.649 588.919 354.864 581.062 359.363 574.719C362.79 569.818 369.145 567.223 376.357 566.214C383.141 565.277 390.138 565.854 396.993 564.989C401.349 564.412 405.705 563.403 409.989 563.115C414.559 562.754 419.057 563.259 423.128 564.412C425.912 565.205 428.554 566.358 430.839 567.944C434.695 570.683 436.837 574.503 437.623 578.467C438.551 583.08 437.694 587.765 435.838 592.234C433.124 598.938 428.34 605.064 425.056 611.623C423.056 615.66 421.557 619.912 418.272 623.516C415.416 626.688 411.203 629.139 406.276 629.787C402.634 630.292 398.921 629.787 395.208 629.427C390.567 628.994 385.926 628.922 381.284 628.634C377.214 628.418 373.144 628.057 369.36 626.904C357.363 623.516 349.937 614.002 352.508 604.127Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth55Diagnozis.culttab &&
                !tooth55Diagnozis.abutment &&
                !tooth55Diagnozis.implant &&
                !tooth55Diagnozis.apex &&
                !tooth55Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M464.3,560.2c-0.2-1.2-0.5-2.4-0.8-3.5c-1.7-6.5-5.1-12.6-10.4-17.1c-3.7-3.2-8-5.4-12.5-7
                        c-6.7-2.3-14-3.3-21.3-2.7c-7,0.6-14,2.5-21,3.5c-11.1,1.6-22.4,0.4-33.3,2.2c-11.3,1.9-21.3,6.6-26.8,15.6
                        c-0.2,0.3-0.3,0.5-0.5,0.8c-7.1,12.4-2.5,27.6-5.7,41.1c-1.3,5.5-3.9,10.6-5,16.1c-2.4,11.3,0.9,22.4,8,31
                        c4.9,6,11.7,10.8,19.8,13.6c6.2,2.2,12.8,2.9,19.3,3.4c7.5,0.6,15,0.9,22.5,1.8c6,0.7,12,1.8,17.9,0.8c7.9-1.3,14.6-6,19.2-12.1
                        c1.8-2.4,3.3-5,4.5-7.6c2.4-5,4.2-10.3,6.3-15.5c5.2-12.7,12.8-24.5,17.2-37.6C464.5,578.3,465.8,569.2,464.3,560.2z"
            ></path>
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              opacity: teethDiagnozis.tooth55.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M325.795 611.115C326.966 605.16 326.658 600.51 327.946 594.555C328.655 591.383 328.997 587.118 329.172 583.813C329.368 580.124 328.271 576.385 328.33 572.669C328.393 568.703 329.62 564.763 330.183 560.938C330.804 556.717 332.851 551.636 334.949 547.814C336.719 544.544 340.049 541.759 342.665 539.41C345.378 536.975 349.488 534.836 352.877 533.288C354.537 532.53 356.263 532.105 358.042 531.798C360.253 531.418 362.547 532.394 364.896 531.969C368.545 531.318 372.233 528.666 375.938 528.484C377.922 528.386 379.912 527.42 381.903 527.64C384.071 527.879 386.242 529.307 388.411 529.202C391.86 529.033 395.305 527.585 398.728 527.027C402.162 526.44 405.597 526.813 409.018 526.074C412.711 525.276 416.389 523.374 420.035 523.057C422.713 522.784 425.376 523.535 427.998 524.372C432.417 525.784 437.597 525.522 441.575 526.979C446.141 528.658 451.557 531.101 455.303 534.461C457.935 536.877 459.911 539.689 461.611 542.756C462.682 544.687 463.879 546.718 464.849 548.814C466.038 551.386 464.926 554.054 465.34 556.755C465.769 559.51 467.05 562.278 467.043 565.044C467.036 567.591 465.772 570.136 465.442 572.669C466.271 574.633 464.841 576.59 464.415 578.534C463.871 581.02 463.196 583.485 462.413 585.92C461.894 587.579 462.412 589.222 461.809 590.851C460.189 595.226 457.219 599.505 455.246 603.755C454.105 606.214 454.019 608.663 452.855 611.115L452.845 611.137C451.973 612.974 451.1 614.813 449.17 616.658C447.598 620.069 447.174 623.503 445.821 626.996C445.05 629.007 445.24 631.043 444.511 633.081C443.574 635.698 441.633 638.318 440.582 640.89C438.972 644.83 438.191 648.658 435.699 652.191C433.413 655.472 428.511 658.388 425.287 660.674C423.637 661.843 421.881 664.021 420.035 664.824C418.099 665.667 416.063 665.116 413.947 665.476C411.062 665.992 408.149 667.183 405.222 666.976C402.092 666.756 398.947 665.107 395.802 664.712C394.061 664.503 392.32 664.333 390.58 664.189C388.591 664.024 386.603 665.065 384.614 664.945C380.734 664.709 376.854 663.344 372.973 663.033C371.066 662.902 369.158 663.121 367.261 663.235C365.807 663.321 364.359 662.172 362.923 661.928C361.278 661.647 359.649 662.477 358.042 662.049C356.479 661.633 354.937 661.137 353.423 660.541C351.84 659.963 350.305 658.128 348.823 657.388C347.022 656.489 345.3 654.303 343.665 653.185C341.257 651.54 337.953 650.844 335.949 648.787C333.614 646.39 331.655 643.566 329.946 640.717C328.465 638.25 327.235 635.807 326.283 633.081C325.105 629.707 325.438 627.164 325.163 623.524C325.018 621.592 324.923 618.634 325.054 616.658C325.176 614.822 325.421 612.972 325.795 611.115ZM339.844 595.501C338.744 599.401 336.444 603.101 335.444 607.001C331.844 620.701 342.244 633.9 359.044 638.6C364.344 640.2 370.044 640.7 375.744 641C382.244 641.4 388.744 641.5 395.244 642.1C400.444 642.6 405.644 643.3 410.744 642.6C417.644 641.7 423.544 638.301 427.544 633.901C432.144 628.901 434.244 623.001 437.044 617.401C441.644 608.301 448.344 599.801 452.144 590.501C454.744 584.301 455.944 577.801 454.644 571.401C453.544 565.901 450.544 560.6 445.144 556.8C441.944 554.6 438.244 553.001 434.344 551.901C428.644 550.301 422.344 549.6 415.944 550.1C409.944 550.5 403.844 551.901 397.744 552.701C388.144 553.901 378.344 553.101 368.844 554.401C358.744 555.801 349.844 559.401 345.044 566.201C338.744 575.001 342.644 585.901 339.844 595.501Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M325.795 611.115C326.966 605.16 326.658 600.51 327.946 594.555C328.655 591.383 328.997 587.118 329.172 583.813C329.368 580.124 328.271 576.385 328.33 572.669C328.393 568.703 329.62 564.763 330.183 560.938C330.804 556.717 332.851 551.636 334.949 547.814C336.719 544.544 340.049 541.759 342.665 539.41C345.378 536.975 349.488 534.836 352.877 533.288C354.537 532.53 356.263 532.105 358.042 531.798C360.253 531.418 362.547 532.394 364.896 531.969C368.545 531.318 372.233 528.666 375.938 528.484C377.922 528.386 379.912 527.42 381.903 527.64C384.071 527.879 386.242 529.307 388.411 529.202C391.86 529.033 395.305 527.585 398.728 527.027C402.162 526.44 405.597 526.813 409.018 526.074C412.711 525.276 416.389 523.374 420.035 523.057C422.713 522.784 425.376 523.535 427.998 524.372C432.417 525.784 437.597 525.522 441.575 526.979C446.141 528.658 451.557 531.101 455.303 534.461C457.935 536.877 459.911 539.689 461.611 542.756C462.682 544.687 463.879 546.718 464.849 548.814C466.038 551.386 464.926 554.054 465.34 556.755C465.769 559.51 467.05 562.278 467.043 565.044C467.036 567.591 465.772 570.136 465.442 572.669C466.271 574.633 464.841 576.59 464.415 578.534C463.871 581.02 463.196 583.485 462.413 585.92C461.894 587.579 462.412 589.222 461.809 590.851C460.189 595.226 457.219 599.505 455.246 603.755C454.105 606.214 454.019 608.663 452.855 611.115L452.845 611.137C451.973 612.974 451.1 614.813 449.17 616.658C447.598 620.069 447.174 623.503 445.821 626.996C445.05 629.007 445.24 631.043 444.511 633.081C443.574 635.698 441.633 638.318 440.582 640.89C438.972 644.83 438.191 648.658 435.699 652.191C433.413 655.472 428.511 658.388 425.287 660.674C423.637 661.843 421.881 664.021 420.035 664.824C418.099 665.667 416.063 665.116 413.947 665.476C411.062 665.992 408.149 667.183 405.222 666.976C402.092 666.756 398.947 665.107 395.802 664.712C394.061 664.503 392.32 664.333 390.58 664.189C388.591 664.024 386.603 665.065 384.614 664.945C380.734 664.709 376.854 663.344 372.973 663.033C371.066 662.902 369.158 663.121 367.261 663.235C365.807 663.321 364.359 662.172 362.923 661.928C361.278 661.647 359.649 662.477 358.042 662.049C356.479 661.633 354.937 661.137 353.423 660.541C351.84 659.963 350.305 658.128 348.823 657.388C347.022 656.489 345.3 654.303 343.665 653.185C341.257 651.54 337.953 650.844 335.949 648.787C333.614 646.39 331.655 643.566 329.946 640.717C328.465 638.25 327.235 635.807 326.283 633.081C325.105 629.707 325.438 627.164 325.163 623.524C325.018 621.592 324.923 618.634 325.054 616.658C325.176 614.822 325.421 612.972 325.795 611.115ZM339.844 595.501C338.744 599.401 336.444 603.101 335.444 607.001C331.844 620.701 342.244 633.9 359.044 638.6C364.344 640.2 370.044 640.7 375.744 641C382.244 641.4 388.744 641.5 395.244 642.1C400.444 642.6 405.644 643.3 410.744 642.6C417.644 641.7 423.544 638.301 427.544 633.901C432.144 628.901 434.244 623.001 437.044 617.401C441.644 608.301 448.344 599.801 452.144 590.501C454.744 584.301 455.944 577.801 454.644 571.401C453.544 565.901 450.544 560.6 445.144 556.8C441.944 554.6 438.244 553.001 434.344 551.901C428.644 550.301 422.344 549.6 415.944 550.1C409.944 550.5 403.844 551.901 397.744 552.701C388.144 553.901 378.344 553.101 368.844 554.401C358.744 555.801 349.844 559.401 345.044 566.201C338.744 575.001 342.644 585.901 339.844 595.501Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M447.962 610.274C449.035 608.184 449.114 606.096 450.166 604C451.985 600.377 454.724 596.729 456.217 593C456.773 591.611 456.295 590.211 456.775 588.796C457.496 586.72 458.118 584.619 458.62 582.5C459.012 580.842 460.331 579.174 459.567 577.5C459.871 575.34 461.037 573.171 461.043 571C461.05 568.642 459.869 566.282 459.473 563.933C459.091 561.631 459.194 559.356 458.098 557.164C457.204 555.377 455.178 553.646 454.191 552C452.623 549.386 452.646 546.988 450.219 544.928C446.765 542.065 441.771 539.982 437.562 538.55C433.825 537.285 429.129 537.535 425.043 536.328C422.626 535.614 420.17 534.974 417.701 535.207C414.339 535.477 410.948 537.098 407.543 537.779C404.389 538.409 401.223 538.091 398.056 538.591C394.9 539.067 391.724 540.301 388.543 540.445C386.544 540.535 384.542 539.318 382.543 539.114C380.707 538.926 378.873 539.75 377.043 539.833C373.627 539.988 370.227 542.249 366.862 542.804C364.697 543.166 362.582 542.334 360.543 542.659C358.903 542.92 357.311 543.282 355.781 543.928C352.656 545.249 349.788 547.924 347.288 550C344.876 552.002 341.805 554.377 340.173 557.164C338.239 560.422 338.196 563.901 337.623 567.5C337.104 570.76 335.972 574.119 335.914 577.5C335.86 580.668 336.871 583.855 336.691 587C336.53 589.817 336.214 592.601 335.56 595.305C334.373 600.381 331.89 605.198 330.811 610.274C330.466 611.857 330.24 613.435 330.128 615C330.007 616.684 331.017 618.353 331.151 620C331.403 623.103 331.097 626.124 332.183 629C333.061 631.324 334.195 632.553 335.56 634.657C337.136 637.085 338.02 640.345 340.173 642.389C342.021 644.142 345.067 644.736 347.288 646.138C348.795 647.091 350.383 648.955 352.043 649.721C353.409 650.352 354.824 651.916 356.284 652.409C357.68 652.917 359.102 653.34 360.543 653.695C362.025 654.059 363.527 653.352 365.043 653.591C366.367 653.8 367.702 654.779 369.043 654.705C370.792 654.609 372.551 654.421 374.31 654.533C377.888 654.798 381.465 655.962 385.043 656.163C386.876 656.265 388.71 655.378 390.543 655.518C392.148 655.641 393.753 655.786 395.358 655.965C398.258 656.301 401.158 657.707 404.043 657.895C406.742 658.071 409.428 657.056 412.088 656.615C414.039 656.309 415.916 656.778 417.701 656.06C419.403 655.375 421.022 653.519 422.543 652.522C425.516 650.574 429.114 648.087 431.222 645.291C433.519 642.279 434.239 639.016 435.723 635.657C436.692 633.465 437.561 631.231 438.424 629C439.096 627.263 440.765 625.527 441.476 623.812C442.724 620.835 443.115 617.907 444.564 615C446.343 613.426 447.148 611.859 447.952 610.293M447.962 610.274L447.952 610.293M447.962 610.274C447.958 610.281 447.955 610.287 447.952 610.293M335.444 607C336.444 603.1 338.744 599.4 339.844 595.5C342.644 585.9 338.744 575 345.044 566.2C349.844 559.4 358.744 555.8 368.844 554.4C378.344 553.1 388.144 553.9 397.744 552.7C403.844 551.9 409.944 550.5 415.944 550.1C422.344 549.6 428.644 550.3 434.344 551.9C438.244 553 441.944 554.6 445.144 556.8C450.544 560.6 453.544 565.9 454.644 571.4C455.944 577.8 454.744 584.3 452.144 590.5C448.344 599.8 441.644 608.3 437.044 617.4C434.244 623 432.144 628.9 427.544 633.9C423.544 638.3 417.644 641.7 410.744 642.6C405.644 643.3 400.444 642.6 395.244 642.1C388.744 641.5 382.244 641.4 375.744 641C370.044 640.7 364.344 640.2 359.044 638.6C342.244 633.9 331.844 620.7 335.444 607Z"
            ></path>
          </g>
          {/*CARIES/SEAL*/}
          <g
            className="header caries-filling"
            style={{
              visibility:
                !tooth55Diagnozis.culttab &&
                !tooth55Diagnozis.abutment &&
                !tooth55Diagnozis.implant &&
                !tooth55Diagnozis.shaper &&
                !tooth55Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M350.5,608.4c0.6,2.8,1.7,5.8,3.5,8.6c4.2,6.6,12.3,12.4,27.7,12.4c21.1,0,27.9-7.4,33.1-13.3
                                c0.2-0.2,0.4-0.4,0.6-0.6c5.2-6.1,6.8-19.6,9.9-28.7c0.9-2.5,1.3-4.8,1.3-7c-0.1-5.9-3.4-10.4-11-11.7c-10.4-1.8-27.1,0-27.1,0
                                c-10.6,0.6-19.3,2.5-25.6,7c-1.9,1.3-3.6,2.9-5.1,4.7C351.4,587.6,348.5,599.2,350.5,608.4z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth55.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth55.seal_center ? `seal-fill ${teethDiagnozis.tooth55.seal_center_color}` : ''}
                                `}
                d="M350.5,608.4c0.6,2.8,1.7,5.8,3.5,8.6c4.2,6.6,12.3,12.4,27.7,12.4c21.1,0,27.9-7.4,33.1-13.3
                                c0.2-0.2,0.4-0.4,0.6-0.6c5.2-6.1,6.8-19.6,9.9-28.7c0.9-2.5,1.3-4.8,1.3-7c-0.1-5.9-3.4-10.4-11-11.7c-10.4-1.8-27.1,0-27.1,0
                                c-10.6,0.6-19.3,2.5-25.6,7c-1.9,1.3-3.6,2.9-5.1,4.7C351.4,587.6,348.5,599.2,350.5,608.4z"
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
                className="st7"
                d="M335,640.3c10.7-10.7,16.3-18.6,19.1-23.2c-1.8-2.8-2.9-5.8-3.5-8.6c-2-9.2,0.9-20.8,7.2-28.7
                                c1.5-1.8,3.2-3.4,5.1-4.7c-9.6-11.7-19.5-19.8-24.7-23.8c-0.2,0.3-0.3,0.5-0.5,0.8c-7.1,12.4-2.5,27.6-5.7,41.1
                                c-1.3,5.5-3.9,10.6-5,16.1C324.6,620.5,327.9,631.6,335,640.3z"
              />
              <path
                className={`st8 caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth55.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth55.seal_left ? `seal-fill ${teethDiagnozis.tooth55.seal_left_color}` : ''}
                                `}
                d="M335,640.3c10.7-10.7,16.3-18.6,19.1-23.2c-1.8-2.8-2.9-5.8-3.5-8.6c-2-9.2,0.9-20.8,7.2-28.7
                                c1.5-1.8,3.2-3.4,5.1-4.7c-9.6-11.7-19.5-19.8-24.7-23.8c-0.2,0.3-0.3,0.5-0.5,0.8c-7.1,12.4-2.5,27.6-5.7,41.1
                                c-1.3,5.5-3.9,10.6-5,16.1C324.6,620.5,327.9,631.6,335,640.3z"
              />
            </g>
            {/*КАРИЕС НИЗ*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M335,640.3c4.9,6,11.7,10.8,19.8,13.6c6.2,2.2,12.8,2.9,19.3,3.4c7.5,0.6,15,0.9,22.5,1.8
                                c6,0.7,12,1.8,17.9,0.8c7.9-1.3,14.6-6,19.2-12.1c1.8-2.4,3.3-5,4.5-7.6c-12-9.4-19.6-18.8-23.4-24.1c-5.1,6-11.9,13.3-33.1,13.3
                                c-15.3,0-23.5-5.8-27.7-12.4C351.2,621.7,345.7,629.5,335,640.3z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth55.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth55.seal_bottom ? `seal-fill ${teethDiagnozis.tooth55.seal_bottom_color}` : ''}
                                `}
                d="M335,640.3c4.9,6,11.7,10.8,19.8,13.6c6.2,2.2,12.8,2.9,19.3,3.4c7.5,0.6,15,0.9,22.5,1.8
                                c6,0.7,12,1.8,17.9,0.8c7.9-1.3,14.6-6,19.2-12.1c1.8-2.4,3.3-5,4.5-7.6c-12-9.4-19.6-18.8-23.4-24.1c-5.1,6-11.9,13.3-33.1,13.3
                                c-15.3,0-23.5-5.8-27.7-12.4C351.2,621.7,345.7,629.5,335,640.3z"
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
                d="M414.7,616.1c3.8,5.3,11.4,14.7,23.4,24.1c2.4-5,4.2-10.3,6.3-15.5c5.2-12.7,12.8-24.5,17.2-37.6
                                c2.9-8.7,4.3-17.8,2.7-26.8c-0.2-1.2-0.5-2.4-0.8-3.5c-7.8,4.2-26.2,14.3-37,23.1c0,2.2-0.4,4.6-1.3,7c-3.2,9-4.7,22.6-9.9,28.7
                                C415.1,615.6,414.9,615.8,414.7,616.1z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth55.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth55.seal_right ? `seal-fill ${teethDiagnozis.tooth55.seal_right_color}` : ''}
                                `}
                d="M414.7,616.1c3.8,5.3,11.4,14.7,23.4,24.1c2.4-5,4.2-10.3,6.3-15.5c5.2-12.7,12.8-24.5,17.2-37.6
                                c2.9-8.7,4.3-17.8,2.7-26.8c-0.2-1.2-0.5-2.4-0.8-3.5c-7.8,4.2-26.2,14.3-37,23.1c0,2.2-0.4,4.6-1.3,7c-3.2,9-4.7,22.6-9.9,28.7
                                C415.1,615.6,414.9,615.8,414.7,616.1z"
              />
            </g>
            {/*КАРИЕС ВЕРХ*/}
            <g
              onClick={() => {
                setColordedPart(diagnozis, 'top');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M338.2,551.2c5.2,3.9,15,12.1,24.7,23.8c6.3-4.4,15-6.4,25.6-7c0,0,16.7-1.8,27.1,0c7.5,1.3,10.9,5.9,11,11.7
                                c10.8-8.7,29.2-18.9,37-23.1c-1.7-6.5-5.1-12.6-10.4-17.1c-3.7-3.2-8-5.4-12.5-7c-6.7-2.3-14-3.3-21.3-2.7c-7,0.6-14,2.5-21,3.5
                                c-11.1,1.6-22.4,0.4-33.3,2.2C353.7,537.5,343.7,542.2,338.2,551.2z"
              />
              <path
                className={`st8 caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth55.caries_top ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth55.seal_top ? `seal-fill ${teethDiagnozis.tooth55.seal_top_color}` : ''}
                                `}
                d="M338.2,551.2c5.2,3.9,15,12.1,24.7,23.8c6.3-4.4,15-6.4,25.6-7c0,0,16.7-1.8,27.1,0c7.5,1.3,10.9,5.9,11,11.7
                                c10.8-8.7,29.2-18.9,37-23.1c-1.7-6.5-5.1-12.6-10.4-17.1c-3.7-3.2-8-5.4-12.5-7c-6.7-2.3-14-3.3-21.3-2.7c-7,0.6-14,2.5-21,3.5
                                c-11.1,1.6-22.4,0.4-33.3,2.2C353.7,537.5,343.7,542.2,338.2,551.2z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                d="M338 636C342.709 632.893 353.492 622.629 357 618"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_left &&
                      !tooth55Diagnozis.seal_bottom) ||
                    (!tooth55Diagnozis.seal_left &&
                      tooth55Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M357 618C351.333 611.667 344.6 594.2 363 575"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_left &&
                      !tooth55Diagnozis.seal_center) ||
                    (!tooth55Diagnozis.seal_left &&
                      tooth55Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M363 575C360 570.5 351.5 560 341.5 554"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_left &&
                      !tooth55Diagnozis.seal_top) ||
                    (!tooth55Diagnozis.seal_left && tooth55Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M363 575C382.667 570.834 422.9 565.9 426.5 579.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_center &&
                      !tooth55Diagnozis.seal_top) ||
                    (!tooth55Diagnozis.seal_center && tooth55Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M426.5 579.5C428.667 576.167 438.2 567.5 459 559.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_right &&
                      !tooth55Diagnozis.seal_top) ||
                    (!tooth55Diagnozis.seal_right && tooth55Diagnozis.seal_top)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M426.5 579.5C426.167 588 423.5 607.3 415.5 616.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth55Diagnozis.seal_right &&
                      tooth55Diagnozis.seal_center) ||
                    (tooth55Diagnozis.seal_right &&
                      !tooth55Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M415.5 616.5C417 620.5 423.1 630.3 435.5 637.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_right &&
                      !tooth55Diagnozis.seal_bottom) ||
                    (!tooth55Diagnozis.seal_right &&
                      tooth55Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M356.5 618.5C365.5 627 400.3 629.7 415.5 616.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_center &&
                      !tooth55Diagnozis.seal_bottom) ||
                    (!tooth55Diagnozis.seal_center &&
                      tooth55Diagnozis.seal_bottom)
                      ? 5
                      : 0,
                }}
              />
            </g>
          </g>
          {/*VINIR*/}
          <g style={{ visibility: 'inherit' }}>
            <g
              className="vinir"
              style={{
                visibility: tooth55Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth55Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth55Diagnozis.vinir_color}`}
                d="M337.115 551.975C337.215 551.675 337.415 551.475 337.615 551.175C343.215 542.175 353.215 537.375 364.415 535.575C375.315 533.775 386.614 534.975 397.714 533.375C404.714 532.375 411.714 530.475 418.714 529.875C426.014 529.275 433.315 530.275 440.015 532.575C444.615 534.175 448.815 536.375 452.515 539.575C457.815 544.075 461.115 550.175 462.915 556.675C463.215 557.875 463.514 559.075 463.714 560.175C465.314 569.175 463.915 578.275 461.015 586.975C460.345 588.999 459.595 590.997 458.787 592.976C455.988 592.777 450.419 591.638 450.531 588.677C450.578 588.538 450.624 588.399 450.67 588.26C453.116 580.925 454.297 573.253 452.948 565.665C452.779 564.738 452.526 563.726 452.273 562.714C450.755 557.234 447.971 552.091 443.5 548.298C440.38 545.6 436.837 543.745 432.957 542.396C427.305 540.457 421.148 539.614 414.99 540.12C409.086 540.625 403.182 542.227 397.277 543.07C387.914 544.419 378.383 543.408 369.189 544.925C359.742 546.443 351.307 550.49 346.583 558.077C346.415 558.33 346.246 558.499 346.162 558.752C341.024 567.721 343.15 578.427 342.153 588.476C341.064
                                591.676 334.554 592.816 331.436 592.986C334.594 579.508 330.03 564.348 337.115 551.975Z"
              />
              <path
                className={`vinir-fill ${tooth55Diagnozis.vinir_color}`}
                d="M331.415 593.075C331.422 593.045 331.429 593.015 331.436 592.986M331.436 592.986C334.594 579.508 330.03 564.348 337.115 551.975C337.215 551.675 337.415 551.475 337.615 551.175C343.215 542.175 353.215 537.375 364.415 535.575C375.315 533.775 386.614 534.975 397.714 533.375C404.714 532.375 411.714 530.475 418.714 529.875C426.014 529.275 433.315 530.275 440.015 532.575C444.615 534.175 448.815 536.375 452.515 539.575C457.815 544.075 461.115 550.175 462.915 556.675C463.215 557.875 463.514 559.075 463.714 560.175C465.314 569.175 463.915 578.275 461.015 586.975C460.345 588.999 459.595 590.997 458.787 592.976C455.988 592.777 450.419 591.638 450.531 588.677C450.578 
                                588.538 450.624 588.399 450.67 588.26C453.116 580.925 454.297 573.253 452.948 565.665C452.779 564.738 452.526 563.726 452.273 562.714C450.755 557.234 447.971 552.091 443.5 548.298C440.38 545.6 436.837 543.745 432.957 542.396C427.305 540.457 421.148 539.614 414.99 540.12C409.086 540.625 403.182 542.227 397.277 543.07C387.914 544.419 378.383 543.408 369.189 544.925C359.742 546.443 351.307 550.49 346.583 558.077C346.415 558.33 346.246 558.499 346.162 558.752C341.024 567.721 343.15 578.427 342.153 588.476C341.064 
                                591.676 334.554 592.816 331.436 592.986Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth55Diagnozis.temporary_crown ||
                tooth55Diagnozis.ceramic_crown ||
                tooth55Diagnozis.mceramic_crown ||
                tooth55Diagnozis.metalic_crown ||
                tooth55Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth55Diagnozis.temporary_crown ||
                tooth55Diagnozis.ceramic_crown ||
                tooth55Diagnozis.mceramic_crown ||
                tooth55Diagnozis.metalic_crown ||
                tooth55Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth55Diagnozis.ceramic_crown_color}
                                ${tooth55Diagnozis.mceramic_crown_color}
                                ${tooth55Diagnozis.metalic_crown_color}
                                ${tooth55Diagnozis.zirconia_crown_color}
                            `}
              d="M464.3,560.2c-0.2-1.2-0.5-2.4-0.8-3.5c-1.7-6.5-5.1-12.6-10.4-17.1c-3.7-3.2-8-5.4-12.5-7
                            c-6.7-2.3-14-3.3-21.3-2.7c-7,0.6-14,2.5-21,3.5c-11.1,1.6-22.4,0.4-33.3,2.2c-11.3,1.9-21.3,6.6-26.8,15.6
                            c-0.2,0.3-0.3,0.5-0.5,0.8c-7.1,12.4-2.5,27.6-5.7,41.1c-1.3,5.5-3.9,10.6-5,16.1c-2.4,11.3,0.9,22.4,8,31
                            c4.9,6,11.7,10.8,19.8,13.6c6.2,2.2,12.8,2.9,19.3,3.4c7.5,0.6,15,0.9,22.5,1.8c6,0.7,12,1.8,17.9,0.8c7.9-1.3,14.6-6,19.2-12.1
                            c1.8-2.4,3.3-5,4.5-7.6c2.4-5,4.2-10.3,6.3-15.5c5.2-12.7,12.8-24.5,17.2-37.6C464.5,578.3,465.8,569.2,464.3,560.2z"
            />
            {/*FISSURE*/}
            <path
              className={`st3 fissure ${tooth55Diagnozis.fissure ? 'diagnoze' : tooth55Diagnozis.fissure ? 'hidden' : ''}`}
              d="M385.6,606.5l-0.3-0.1c-1.5-0.4-3-0.7-4.5-1.1c-3.3-0.8-6.8-1.7-10.2-2.4c-0.7-0.2-1.5-0.3-2.3-0.5
                            c-4.3-1-8.7-2-12.8-1.9l-0.2,0c-2.2,0-4.6,0.1-5.7-2c-1.2-2.2,0.4-4.1,1.8-5.7c0.6-0.7,1.3-1.5,1.7-2.3c1-2,0.5-4.4-1.2-5.8
                            l0.7-0.8c2.2,1.8,2.8,4.7,1.5,7.2c-0.5,0.9-1.2,1.7-1.8,2.5c-1.5,1.8-2.4,3-1.6,4.5c0.8,1.5,2.7,1.5,4.8,1.5l0.2,0
                            c4.3-0.1,8.7,0.9,13.1,1.9c0.8,0.2,1.5,0.3,2.3,0.5c3.4,0.8,6.9,1.6,10.2,2.5c1.4,0.3,2.8,0.7,4.1,1c2.2-2.7,4.7-5.1,7.4-7.3
                            l1-0.8c4-3.1,8.2-6.3,7.4-11c-0.5-2.9-3-4.7-5.6-6.6c-0.9-0.6-1.8-1.3-2.6-2c-5-4.3-7.3-10.5-6.1-16.8l1.1,0.2
                            c-1.1,5.8,1.1,11.7,5.8,15.7c0.8,0.7,1.7,1.3,2.6,2c2.7,2,5.5,4,6.1,7.3c0.9,5.3-3.7,8.9-7.8,12l-1,0.8
                            c-2.8,2.2-5.3,4.7-7.5,7.4L385.6,606.5z"
            />
            <path
              className={`st3 fissure ${tooth55Diagnozis.fissure ? 'diagnoze' : tooth55Diagnozis.fissure ? 'hidden' : ''}`}
              d="M397.3,631.3c-1.8-8.7-5.9-17.1-11.7-24.1c-0.5-0.6-1.1-1.2-1.6-1.9l0.8-0.7c0.6,0.6,1.1,1.2,1.6,1.9
                            c6,7.2,10.1,15.7,11.9,24.6L397.3,631.3z"
            />
            <path
              className={`st3 fissure ${tooth55Diagnozis.fissure ? 'diagnoze' : tooth55Diagnozis.fissure ? 'hidden' : ''}`}
              d="M431.4,599.1c-2.8,0-5.4-1.2-8-2.4l-0.4-0.2c-3.4-1.6-7.1-3-11.3-4.3l0.3-1c4.2,1.3,8,2.8,11.5,4.4l0.4,0.2
                            c3,1.4,6.1,2.8,9.3,2.1c2-0.4,3.5-1.7,5.2-2.9c1.7-1.3,3.4-2.7,5.7-3.1l0.2,1.1c-2,0.4-3.6,1.7-5.2,2.9
                            c-1.7,1.3-3.4,2.6-5.6,3.1C432.7,599.1,432.1,599.1,431.4,599.1z"
            />
          </g>
          {/* FISSURES */}
          <g
            style={{
              visibility:
                !tooth55Diagnozis.culttab &&
                !tooth55Diagnozis.abutment &&
                !tooth55Diagnozis.implant &&
                !tooth55Diagnozis.apex &&
                !tooth55Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className={`st3 fissure ${tooth55Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M385.6,606.5l-0.3-0.1c-1.5-0.4-3-0.7-4.5-1.1c-3.3-0.8-6.8-1.7-10.2-2.4c-0.7-0.2-1.5-0.3-2.3-0.5
                            c-4.3-1-8.7-2-12.8-1.9l-0.2,0c-2.2,0-4.6,0.1-5.7-2c-1.2-2.2,0.4-4.1,1.8-5.7c0.6-0.7,1.3-1.5,1.7-2.3c1-2,0.5-4.4-1.2-5.8
                            l0.7-0.8c2.2,1.8,2.8,4.7,1.5,7.2c-0.5,0.9-1.2,1.7-1.8,2.5c-1.5,1.8-2.4,3-1.6,4.5c0.8,1.5,2.7,1.5,4.8,1.5l0.2,0
                            c4.3-0.1,8.7,0.9,13.1,1.9c0.8,0.2,1.5,0.3,2.3,0.5c3.4,0.8,6.9,1.6,10.2,2.5c1.4,0.3,2.8,0.7,4.1,1c2.2-2.7,4.7-5.1,7.4-7.3
                            l1-0.8c4-3.1,8.2-6.3,7.4-11c-0.5-2.9-3-4.7-5.6-6.6c-0.9-0.6-1.8-1.3-2.6-2c-5-4.3-7.3-10.5-6.1-16.8l1.1,0.2
                            c-1.1,5.8,1.1,11.7,5.8,15.7c0.8,0.7,1.7,1.3,2.6,2c2.7,2,5.5,4,6.1,7.3c0.9,5.3-3.7,8.9-7.8,12l-1,0.8
                            c-2.8,2.2-5.3,4.7-7.5,7.4L385.6,606.5z"
            />
            <path
              className={`st3 fissure ${tooth55Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M397.3,631.3c-1.8-8.7-5.9-17.1-11.7-24.1c-0.5-0.6-1.1-1.2-1.6-1.9l0.8-0.7c0.6,0.6,1.1,1.2,1.6,1.9
                            c6,7.2,10.1,15.7,11.9,24.6L397.3,631.3z"
            />
            <path
              className={`st3 fissure ${tooth55Diagnozis.fissure ? 'diagnoze' : ''}`}
              d="M431.4,599.1c-2.8,0-5.4-1.2-8-2.4l-0.4-0.2c-3.4-1.6-7.1-3-11.3-4.3l0.3-1c4.2,1.3,8,2.8,11.5,4.4l0.4,0.2
                            c3,1.4,6.1,2.8,9.3,2.1c2-0.4,3.5-1.7,5.2-2.9c1.7-1.3,3.4-2.7,5.7-3.1l0.2,1.1c-2,0.4-3.6,1.7-5.2,2.9
                            c-1.7,1.3-3.4,2.6-5.6,3.1C432.7,599.1,432.1,599.1,431.4,599.1z"
            />
          </g>
        </g>
        <g
          className="common-view"
          onMouseOver={() => {
            showHideTopCommonView('over');
          }}
          onMouseLeave={() => {
            showHideTopCommonView('leave');
          }}
          style={{
            visibility: 'inherit',
            transform: 'matrix(0.55, 0, 0, 0.55, 286, 121)',
          }}
        >
          {/* CHANGE COLOR */}
          <g className="dentin">
            <g
              className="hRoot hImplant hEmpty"
              style={{
                visibility:
                  !tooth55Diagnozis.implant &&
                  !tooth55Diagnozis.apex &&
                  !tooth55Diagnozis.shaper &&
                  !tooth55Diagnozis.apex
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth55Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M460,405.8c-1.2,6.5-4.5,12.8-7.8,18.7c-5.5,9.8-13.5,18.3-23.6,24.9
                                l-14.2-14.8l-33.6-10.1l-33.3,6.7c-6.2-9-9.6-19.3-9.7-29.7c-0.1-9.7,2.5-19.3,7.7-27.9c6.3-6.1,12.2-11.3,15.8-18.6
                                c0.2-0.2,0.5-0.4,0.7-0.6c8.7-1,17.5-1.4,26.3-1.1c2.8,0.1,5.5,0.2,8.3,0.5c9.6,0.8,19.2,2.4,28.2,5.8c0.2,0.1,0.5,0.2,0.7,0.3
                                c8.7,3.4,16.6,8.6,23.1,15.3c4.3,4.5,7.9,9.6,10.7,15.3c0,1.4,0.1,2.8,0.1,4.1C459.6,398.3,459.8,402.1,460,405.8z"
              />
            </g>
            <g
              style={{
                visibility:
                  !tooth55Diagnozis.implant &&
                  !tooth55Diagnozis.abutment &&
                  !tooth55Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st10 change-color ${tooth55Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M462,339.2c-0.3,8.6-1.5,17.1-2.4,25.7c-0.6,6.5,0,13.1-0.2,19.7
                                c-0.1,3.3-0.1,6.7,0,10c0-1.4-0.1-2.8-0.1-4.1c-2.8-5.6-6.4-10.8-10.7-15.3c-6.5-6.7-14.4-11.9-23.1-15.3
                                c-0.2-0.1-0.5-0.2-0.7-0.3c-9-3.5-18.6-5.1-28.2-5.8c-2.8-0.2-5.5-0.4-8.3-0.5c-8.8-0.3-17.6,0.1-26.3,1.1
                                c-0.2,0.2-0.5,0.4-0.7,0.6c0.2-0.4,0.4-0.8,0.6-1.2c2.7-6,3.5-14.2,4.7-20.6c2.5-12.7,3-25.6,2.5-38.5c-0.4-10-1.4-19.9-4.3-29.6
                                c-1.4-4.6-3.2-9.3-2.3-14c0.3-1.7,0.9-3.2,1.9-4.7c1.7-2.6,4.6-4.7,8-4.5c2.6,0.1,4.8,1.6,6.4,3.3c4.5,4.5,6.2,10.6,7.8,16.5
                                c2.3,8.5,4.6,17,7.4,25.4c2.5,7.7,5.5,15.4,8.8,22.9c1.2,2.7,2.4,5.4,3.8,8c1.9,3.6,4.1,7.1,6.9,10.4c1.8,2.1,3.8,4.1,6,6
                                c0.9-1,1.7-2.1,2.4-3.3c0.3-0.6,0.6-1.2,0.9-1.8v0c2-4.3,2.6-9,3.1-13.6c0.6-5.7,1.2-11.1,1.6-16.8c0.6-10.4,0.5-21.1,0-31.6
                                c-0.3-7-0.4-14.5,5.3-19.4c1-0.9,2.2-1.6,3.6-2c1.7-0.5,3.5-0.6,5.1,0c2.4,0.8,4,2.7,5.3,4.6c3.2,4.7,4.8,10,6.2,15.3
                                c3.1,12.3,4.6,24.9,6.2,37.5C460.8,315,462.4,327.1,462,339.2z"
              />
              <path
                className={`st10 change-color ${tooth55Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M405.9,312.3c2.3,4.6,4.7,9.2,7.8,13.3c1.7,2.2,3.5,4.3,5.6,6.1
                                c1.3-2.5,2.3-5.2,3-7.9c1-3.8,1.5-7.7,1.9-11.6c0.7-6.2,1.4-12.5,1.7-18.8c0.5-11.2-0.2-22.4,0-33.6c0-2.2,0.1-4.4,0.7-6.6
                                c0.4-1.6,1.1-3.1,2.1-4.4c-0.4-7.7-2.2-15.2-5.7-22.2c-1.1-2.2-2.6-4.4-4.9-5c-1.6-0.4-3.3,0.1-4.8,1c-3,1.9-4.7,5.4-5.6,8.9
                                c-0.7,2.5-1,5.1-1.6,7.7c-1.2,5.5-3.3,10.6-4.9,16c-3.7,12-5.1,24.6-4.2,37.1C399.7,299.1,402.7,305.7,405.9,312.3z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.pulpit ? 'pulpit' : ''} ${tooth55Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M424.2,392.7c-0.5,5.9-2.2,11.6-5.1,16.9c-3.5-7.3-10.7-12.6-19.3-14.1
                                c-7.3-1.3-14.9,0.3-20.8,4.4c-0.7-4.1-0.4-8.4,0.7-12.4c1.3-4.4,3.6-8.6,5.2-13c2.5-6.8,3.2-14,3.5-21.2c2.8,0.1,5.6,0.2,8.3,0.5
                                c9.6,0.8,19.2,2.4,28.2,5.8c0.2,0.1,0.5,0.2,0.7,0.3c-0.8,3.2-1.5,6.4-1.7,9.7C423.3,377.2,424.8,384.9,424.2,392.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.pulpit ? 'pulpit' : ''} ${tooth55Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M443.5,290.9c-0.1,3.9-0.4,7.9-0.8,11.8c-1.3,11.6-4.3,22.9-8.5,33.9
                                c-2.9,7.7-6.5,15.3-8.6,23.2c-0.2-0.1-0.5-0.2-0.8-0.3c-9-3.5-18.6-5.1-28.2-5.8c-2.8-0.2-5.5-0.4-8.3-0.5c0-0.6,0-1.2,0.1-1.7
                                c0.6-17.9-0.5-35.9-3.6-53.5c-0.4-2.4-0.9-4.7-1.4-7h3.4c4.3,14.6,9,29.1,13.3,43.7c0.6,2.1,1.3,4.3,2.2,6.3
                                c1.6-7.7,3-15.4,4.3-23.2c0.2-1,0.3-2,0.5-3c1.3-7.9,2.5-15.9,3.6-23.9h8.9c0.8,10.9,1.7,21.8,2.7,32.7c0.2,1.8,0.4,3.6,0.5,5.5
                                c0.6,5.9,1.2,11.8,1.9,17.6c1.9-2.2,3.5-4.9,4.8-7.6c7.2-15.4,11.2-31.7,12.2-48.1H443.5z"
              />
            </g>
            <g>
              <path
                className={`st22 target middle ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.pulpit ? 'pulpit' : ''} ${tooth55Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M379.4,266.9c-3-8.2-6.9-16.2-11.4-23.8c6.8,15.4,12,31.4,15.5,47.8h3.4c-0.1-0.4-0.2-0.8-0.4-1.3
                                C384.3,282,382.1,274.4,379.4,266.9z"
              />
              <path
                className={`st22 target middle ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.pulpit ? 'pulpit' : ''} ${tooth55Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M416.4,222c-0.7,19.8-2.2,39.6-4.5,59.3c-0.4,3.2-0.8,6.4-1.2,9.6h8.9c-0.1-1.1-0.2-2.2-0.2-3.3
                                C417.9,265.8,416.9,243.9,416.4,222z"
              />
              <path
                className={`st22 target middle ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.channel_class} ${tooth55Diagnozis.pulpit ? 'pulpit' : ''} ${tooth55Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M436.7,247.3c4.1,14.3,5.8,29,5,43.6h1.8c0-0.9,0-1.8,0-2.8C443.5,274.3,441.2,260.5,436.7,247.3z"
              />
            </g>
            <PeriodontitStage55 />
          </g>
          {/*PIN*/}
          <g
            className="pin hEmpty hImplant"
            style={{
              visibility: 'inherit',
              opacity: tooth55Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M338.3 401.699C338.4 412.099 341.8 422.399 348 431.399L381.3 424.699L414.9 434.799L429.1 449.599C439.1 442.999 447.2 434.499 452.7 424.699C456 418.799 458.3 412.499 459.5 405.999C459.8 401.799 459.9 396.999 459.9 392.099V391.999C459.9 391.599 459.9 391.099 459.9 390.699C459.8 390.499 459.7 390.399 459.6 390.199C459.4 389.799 459.3 
                            389.499 459.1 389.199C458.9 388.899 458.7 388.499 458.6 388.199C458.4 387.799 458.2 387.499 458 387.199C457.8 386.799 457.6 386.499 457.4 386.199C457.1 385.699 456.8 385.199 456.5 384.799C456.1 384.199 455.7 383.499 455.2 382.899C453.4 380.399 451.4 377.899 449.3 375.699C448.9 375.299 448.5 374.799 448 374.399C447.6 373.999 447.1 373.599 446.7 373.199C446.3 372.799 445.8 372.399 445.4 371.999C444 370.799 442.6 369.699 441.2 368.699C440.7 
                            368.299 440.2 367.999 439.7 367.699C439.2 367.399 438.7 366.999 438.2 366.699C437.7 366.399 437.2 366.099 436.7 365.699C436.2 365.399 435.7 365.099 435.2 364.799C434.7 364.499 434.2 364.199 433.6 363.899C433.1 363.699 432.7 363.399 432.2 363.199C431.8 362.999 431.3 362.799 430.9 362.599C430.4 362.399 429.9 362.099 429.4 361.899C429 361.699 428.6 361.499 428.2 361.299C427.7 361.099 427.1 360.799 426.5 360.599C426.4 360.599 426.3 360.499 426.2 360.499C426.1 360.399 426 360.399 425.8 360.399C425.7 360.399 425.6 360.299 425.4 360.299C425 360.199 
                            424.6 359.999 424.2 359.899C424 359.799 423.9 359.799 423.7 359.699C423.4 359.599 423.1 359.499 422.9 359.399C422.6 359.299 422.3 359.199 422 359.099C421.8 358.999 421.6 358.999 421.4 358.899C421.2 358.799 421 358.799 420.8 358.699C420.6 358.599 420.4 358.599 420.2 358.499C419.8 358.399 419.3 358.199 418.9 358.099C418.7 358.099 418.6 357.999 418.4 357.999C417.9 357.899 417.5 357.799 417.1 357.599C416.7 357.499 416.2 357.399 415.8 357.299H415.7C415 357.099 414.3 356.999 413.6 356.799C413.6 356.799 413.6 356.799 413.5 356.799C412.8 356.599 412 356.499 411.3 356.299C410.5 356.199 
                            409.8 355.999 409 355.899C408.4 355.799 407.7 355.699 407.1 355.599C407.1 355.599 407.1 355.599 407 355.599C406.7 355.599 406.4 355.499 406 355.499H405.9C405.4 355.399 404.9 355.399 404.4 355.299C403.8 355.199 403.2 355.099 402.5 355.099C401.9 354.999 401.3 354.999 400.7 354.899H400.6C400.1 354.899 399.7 354.799 399.2 354.799C398.6 354.699 398 354.699 397.4 354.599C397 354.599 396.5 354.499 396.1 354.499C395.8 354.499 395.5 354.499 395.2 354.399C394.8 354.399 394.4 354.399 393.9 354.299C393 354.199 392.1 354.199 391.2 354.199C390.7 354.199 390.1 354.199 389.6 354.099C389.4 354.099 389.3 354.099 389.2 354.099C380.4 353.799 371.6 354.199 362.9 355.199C362.8 355.299 362.6 355.399 362.5 355.599C362.4 355.699 362.4 355.699 362.3 355.799C362.2 355.899 362.2 355.899 362.1 355.999C358.2 362.699 352.1 368.899 346.4 374.499C340.9 382.399 338.2 
                            391.999 338.3 401.699Z"
              style={{ visibility: 'hidden' }}
            />
            <path
              className="st57"
              d="M389.5 427.199L414.8 434.799L415.3 435.399C415.5 415.499 416.3 370.899 417.1 331.799C417.1 330.999 417.1 330.199 417.1 329.399C417.8 292.499 418.4 261.199 418.4 261.199C418.3 260.199 417.5 259.399 416.4 259.399C415.4 259.399 414.6 260.099 414.5 261.099L406.7 313.399V313.499L406.3 316.499V316.599L400.6 354.199C400.4 
                            355.299 393.4 401.499 389.5 427.199Z"
              style={{ fill: tooth55Diagnozis.pin ? '#dbd9d3' : 'none' }}
            />
          </g>
          {/* CULT TAB */}
          <g
            className="stump hEmpty hIntact hImplant"
            style={{
              visibility: tooth55Diagnozis.culttab ? 'inherit' : 'hidden',
              opacity: tooth55Diagnozis.culttab ? 1 : 0,
            }}
          >
            <path
              className="st14"
              d="M400.5,354.2c0.6,0.1,1.2,0.1,1.8,0.2c0.6,0.1,1.2,0.1,1.9,0.2c0.5,0.1,1,0.1,1.5,0.2c0,0,0.1,0,0.1,0
                            c0.3,0,0.6,0.1,1,0.1c0,0,0,0,0.1,0c0.6,0.1,1.3,0.2,1.9,0.3c0.8,0.1,1.5,0.3,2.3,0.4c0.7,0.1,1.5,0.3,2.2,0.5c0,0,0.1,0,0.1,0
                            c0.7,0.2,1.4,0.3,2.1,0.5c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0.5,0.1,0.9,0.2,1.3,0.3c0.5,0.1,0.9,0.2,1.3,0.4c0.2,0,0.3,0.1,0.5,0.1
                            c0.4,0.1,0.9,0.2,1.3,0.4c0.2,0.1,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.1,0.6,0.2c0.3,0.1,0.6,0.2,0.9,0.3
                            c0.3,0.1,0.6,0.2,0.8,0.3c0,0,0,0,0,0c0.2,0.1,0.3,0.1,0.5,0.2c0.4,0.1,0.8,0.3,1.2,0.4l0,0c0.1,0,0.2,0.1,0.4,0.1
                            c0.1,0,0.2,0.1,0.4,0.1c0.1,0,0.2,0.1,0.3,0.1l-8.1-99c-0.1-1-0.9-1.8-2-1.8h0c-1,0-1.8,0.7-1.9,1.7L400.5,354.2z"
            />
            <path
              className="st15"
              d="M338.3,401.7c0.1,10.4,3.5,20.7,9.7,29.7l33.3-6.7l33.6,10.1l14.2,14.8c10-6.6,18.1-15.1,23.6-24.9
                            c3.3-5.9,5.6-12.2,6.8-18.7c0.3-4.2,0.4-9,0.4-13.9V392c0-0.4,0-0.9,0-1.3c-0.1-0.2-0.2-0.3-0.3-0.5c-0.2-0.4-0.3-0.7-0.5-1
                            c-0.2-0.3-0.4-0.7-0.5-1c-0.2-0.4-0.4-0.7-0.6-1c-0.2-0.4-0.4-0.7-0.6-1c-0.3-0.5-0.6-1-0.9-1.4c-0.4-0.6-0.8-1.3-1.3-1.9
                            c-1.8-2.5-3.8-5-5.9-7.2c-0.4-0.4-0.8-0.9-1.3-1.3c-0.4-0.4-0.9-0.8-1.3-1.2c-0.4-0.4-0.9-0.8-1.3-1.2c-1.4-1.2-2.8-2.3-4.2-3.3
                            c-0.5-0.4-1-0.7-1.5-1c-0.5-0.3-1-0.7-1.5-1s-1-0.6-1.5-1c0,0,0,0,0,0c-0.5-0.3-1-0.6-1.5-0.9c-0.5-0.3-1-0.6-1.6-0.9
                            c-0.5-0.2-0.9-0.5-1.4-0.7c-0.4-0.2-0.9-0.4-1.3-0.6c-0.5-0.2-1-0.5-1.5-0.7c-0.4-0.2-0.8-0.4-1.2-0.6c-0.5-0.2-1.1-0.5-1.7-0.7
                            c-0.1,0-0.2-0.1-0.3-0.1c-0.1-0.1-0.2-0.1-0.4-0.1c-0.1,0-0.2-0.1-0.4-0.1l0,0c-0.4-0.1-0.8-0.3-1.2-0.4
                            c-0.2-0.1-0.3-0.1-0.5-0.2c0,0,0,0,0,0c-0.3-0.1-0.6-0.2-0.8-0.3c-0.3-0.1-0.6-0.2-0.9-0.3c-0.2-0.1-0.4-0.1-0.6-0.2
                            c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.4-0.1-0.9-0.3-1.3-0.4c-0.2,0-0.3-0.1-0.5-0.1c-0.5-0.1-0.9-0.2-1.3-0.4
                            c-0.4-0.1-0.9-0.2-1.3-0.3c0,0,0,0,0,0c0,0-0.1,0-0.1,0c-0.7-0.2-1.4-0.3-2.1-0.5c0,0,0,0-0.1,0c-0.7-0.2-1.5-0.3-2.2-0.5
                            c-0.8-0.1-1.5-0.3-2.3-0.4c-0.6-0.1-1.3-0.2-1.9-0.3c0,0,0,0-0.1,0c-0.3,0-0.6-0.1-1-0.1c0,0-0.1,0-0.1,0c-0.5-0.1-1-0.1-1.5-0.2
                            c-0.6-0.1-1.2-0.2-1.9-0.2c-0.6-0.1-1.2-0.1-1.8-0.2c0,0-0.1,0-0.1,0c-0.5,0-0.9-0.1-1.4-0.1c-0.6-0.1-1.2-0.1-1.8-0.2
                            c-0.4,0-0.9-0.1-1.3-0.1c-0.3,0-0.6,0-0.9-0.1c-0.4,0-0.8,0-1.3-0.1c-0.9-0.1-1.8-0.1-2.7-0.1c-0.5,0-1.1,0-1.6-0.1
                            c-0.2,0-0.3,0-0.4,0h0c-8.8-0.3-17.6,0.1-26.3,1.1c-0.1,0.1-0.3,0.2-0.4,0.4c-0.1,0.1-0.1,0.1-0.2,0.2c-0.1,0.1-0.1,0.1-0.2,0.2
                            l0,0c-3.9,6.7-10,12.9-15.7,18.5C340.9,382.4,338.2,392,338.3,401.7z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment hEmpty hIntact hRoot"
            style={{
              visibility: tooth55Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth55Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M444.3,370.7c-5.6-4.7-12-8.3-18.8-11c-9-3.5-18.6-5.1-28.2-5.9c-11.1-0.9-23.1-0.2-34.2,1l32-14.1
                            l34.1,4.9L444.3,370.7z"
            />
            <path
              className="st17"
              d="M460.6,406c-1.2,6.5-4.5,12.8-7.8,18.7c-5.5,9.8-13.5,18.3-23.6,24.9L415,434.8l-33.6-10.1l-33.3,6.7
                            c-6.2-9-9.6-19.3-9.7-29.7c-0.1-9.7,2.5-19.3,7.7-27.9c6.3-6.1,12.2-11.2,15.8-18.6c0.2-0.2,0.5-0.4,0.7-0.6
                            c0.4-0.1,0.8-0.1,1.3-0.1c11.1-1.3,22.3-1.4,33.4-0.5c9.6,0.8,19.2,2.4,28.2,5.9c6.8,2.6,13.2,6.3,18.8,11c1.7,1.4,3.4,3,5,4.6
                            c4.3,4.5,7.9,9.7,10.7,15.3c0,1.3,0.1,2.7,0.1,4c0,0.1,0,0.2,0,0.3C460.2,398.7,460.3,402.3,460.6,406z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g
            className="shaper hEmpty hIntact hRoot"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st44"
              d="M433.341 390.613C433.418 393.094 431.24 395.046 428.782 394.698L380.02 387.789C377.563 387.441 376.013 384.962 376.774 382.601L389.053 344.526C389.651 342.669 391.503 341.515 393.434 341.795L428.675 346.907C430.595 347.185 432.038 348.802 432.099 350.741L433.341 390.613Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant hEmpty hIntact hRoot"
            style={{
              visibility:
                tooth55Diagnozis.abutment ||
                tooth55Diagnozis.implant ||
                tooth55Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M436.6,349.9l-52.1-7.5c3.1-15.8,6.9-31.4,11.5-46.9c4.5-15.1,9.7-30.2,15.6-45c4.1-3,9.9-4.4,15.6-3.5
                        c6.4,1,11.9,4.6,14.9,9.4c0.8,15,0.8,30,0,45C441.2,317.6,439.4,333.8,436.6,349.9z"
            ></path>
            <line
              className="st19"
              x1="443.9"
              y1="333.6"
              x2="381.8"
              y2="333.5"
            ></line>
            <line
              className="st19"
              x1="447.4"
              y1="315.6"
              x2="385.3"
              y2="315.5"
            ></line>
            <line
              className="st19"
              x1="449.6"
              y1="297.4"
              x2="387.6"
              y2="297.3"
            ></line>
            <line
              className="st19"
              x1="453.1"
              y1="279.4"
              x2="391.1"
              y2="279.3"
            ></line>
            <line
              className="st19"
              x1="456.6"
              y1="261.3"
              x2="394.6"
              y2="261.3"
            ></line>
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth55Diagnozis.culttab &&
                !tooth55Diagnozis.abutment &&
                !tooth55Diagnozis.implant &&
                !tooth55Diagnozis.shaper &&
                !tooth55Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M460.3,407.7c-0.4-5.3-0.7-10.7-0.9-16.1c0-0.4,0-0.8,0-1.2
                            c-2.8-5.6-6.3-10.8-10.7-15.3c-6.7-6.9-14.8-12.1-23.8-15.6c-9-3.5-18.6-5.1-28.2-5.8c-11.5-0.9-23.1-0.7-34.6,0.7
                            c-0.1,0-0.1,0.1-0.1,0.1c-9.4,8.5-18,17.7-25.8,27.7c-2.7,3.5-5.4,7.1-6.8,11.3c-1.8,5.2-1.5,10.8-1.3,16.4
                            c0.1,2.1,0.1,4.1,0.2,6.2c0.9,12.6,5.9,24.6,14.3,34l2.9,1.1l2.1,0.8c3.6-2,7.6-3.1,11.8-3.5c6.5-0.5,13.3,1.1,19.2-1.9
                            c3.6-1.8,6.1-5.1,8.1-8.7c1.3-2.5,2.4-5.1,3.1-7.8l1.9-0.1c-1.2,2.2-2.1,4.5-2.8,6.9c-0.9,3.4-1.3,7,0,10.2
                            c3.6,8.8,15.5,9.1,21.6,15.8c0.2,0.2,0.4,0.5,0.6,0.7c1.2,1.6,2.1,3.4,2.6,5.3l5.4,1c4.4-0.9,8.8-2.1,13-3.8
                            c9.1-3.6,17.5-9,23.4-16.9c1-1.3,1.9-2.7,2.7-4.1c2-6.5,3-13.2,3.2-20C461.3,419.3,460.7,413.5,460.3,407.7z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth55Diagnozis.culttab && !tooth55Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M336.327 382.099C333.527 385.599 330.927 389.199 329.527 393.399C327.952 398.038 327.985 402.906 328.018 407.735C328.022 408.424 328.027 409.113 328.027 409.799C328.027 411.809 328.118 413.727 328.214 415.729L328.227 415.999C329.127 428.599 334.127 440.599 342.527 449.999L345.427 451.099L347.527 451.899C351.227 449.899 355.227 448.699 359.327 448.399C361.366 448.242 363.435 448.292 365.496 448.342C370.005 448.45 374.478 448.558 378.527 446.499C382.127 444.699 384.727 441.399 386.627 437.799C387.927 435.399 389.027 432.699 389.727 429.999L391.627 429.899C390.427 432.099 389.527 434.399 388.827 436.799C387.827 440.099 387.527 443.799 388.827 446.999C390.901 452.068 395.728 454.317 400.615 456.593C404.212 458.269 407.841 459.959 410.427 462.799C410.527 462.899 410.627 463.024 410.727 463.149C410.827 463.274 410.927 463.399 411.027 463.499C412.327 464.999 413.227 466.899 413.627 468.799L419.027 469.799C423.427 468.899 427.827 467.699 432.027 465.999C441.227 462.399 449.627 456.999 455.427 449.099C456.427 447.799 457.327 446.399 458.127 444.999C460.127 438.499 461.227 431.799 461.327 424.999C461.405 420.488 461.059 415.977 460.713 411.466C460.614 410.177 460.516 408.888 460.427 407.599C460.027 402.199 459.727 396.899 459.527 391.499V390.299C456.727 384.699 453.127 379.499 448.827 374.999C442.227 368.099 434.027 362.899 425.027 359.399C416.027 355.999 406.427 354.399 396.827 353.599C385.327 352.699 373.727 352.899 362.227 354.299C362.227 354.299 362.227 354.399 362.127 354.399C352.727 362.899 344.127 372.099 336.327 382.099ZM397.341 358.256C405.565 358.946 413.789 360.327 421.5 363.261C429.21 366.282 436.235 370.77 441.889 376.724C446.687 381.783 450.049 386.118 450.991 392.537C451.176 393.797 450.042 394.805 448.786 394.598L352.661 378.773C351.139 378.523 350.463 376.713 351.462 375.537C358.673 367.049 363.052 363.321 370.312 360.962C376.857 358.836 386.332 357.388 397.341 358.256Z"
            ></path>
            <path
              className={`st7 ${tooth55Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M421.275 363.261C413.565 360.327 405.34 358.946 397.116 358.256C386.107 357.388 376.632 358.836 370.087 360.962C362.827 363.321 358.448 367.049 351.238 375.537C350.238 376.713 350.914 378.523 352.437 378.773L448.561 394.598C449.818 394.805 450.951 393.797 450.766 392.537C449.824 386.118 446.463 381.783 441.665 376.724C436.01 370.77 428.985 366.282 421.275 
                            363.261Z"
            />
            <path
              className={`st60
                                    ${tooth55Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth55Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth55Diagnozis.seal_cervical_color}
                                `}
              d="M421.275 363.261C413.565 360.327 405.34 358.946 397.116 358.256C386.107 357.388 376.632 358.836 370.087 360.962C362.827 363.321 358.448 367.049 351.238 375.537C350.238 376.713 350.914 378.523 352.437 378.773L448.561 394.598C449.818 394.805 450.951 393.797 450.766 392.537C449.824 386.118 446.463 381.783 441.665 376.724C436.01 370.77 428.985 366.282 
                            421.275 363.261Z"
            />
          </g>
          {/*TARTAR*/}
          <g
            className="tartar"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth55.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M460.5 408L459.5 407L459 406.5L458.5 405.5L457.5 403.5L456.5 400.5L455.5 398.5V396.5L454 392L453.5 388L451 383.5L447.5 378.5L444.5 375.5L441.5 371L438.5 370L434 368L430 364L424.5 362.5L420.5 360H415.5L408.5 358L402 356H396.5L392 355H387L383.5 356L379.5 357L373.5 358L367.5 360H365.5L362.5 361L360 364L357 366L354 369L351.5 373L345.5 377L344 380L342 381.5L340 382.5L337 387L335.5 388L334 389H332L333 385.5L334 383.5L336 380.5L337 378.5L339 377L340 375.5L341 373L342 370L344 368L345.5 366L347.5 362.5L351.5 360V358L354 355L356 352.5L358 350L360 348.5L362.002 346L364.002 343L367.5 342H371.502L377.002 340L382.002 339L387 340H392L396.5 338L402 340H406.502H410.502H415.5L420.5 342H424.5L430 344H433.502L438.5 345.5L441.5 348.5L447.5 350L451 352.5L455.5 355L459 360L463 364L461.502 368L463 373V377L463.502 380L464.502 383.5L463 388L463.502 393L461.502 397V400.5V405.5L460.5 408Z"
            ></path>
            <path
              className="st61 level1"
              d="M459.502 408L458.502 407L458.002 406.5L457.502 405.5L456.502 403.5L455.502 400.5L454.502 398.5V396.5L453.002 392L452.502 388L450.002 383.5L446.502 378.5L443.502 375.5L440.502 371L437.502 370L433.002 368L429.002 364L423.502 362.5L419.502 360H414.502L407.502 358L401.002 356H395.502L391.002 355H386.002L382.502 356L378.502 357L372.502 358L366.502 360H364.502L361.502 361L359.002 364L356.002 366L353.002 369L350.502 373L344.502 377L343.002 380L341.002 381.5L339.002 382.5L336.002 387L334.502 388L333.002 389H331.002V387L334.502 383.5L337.004 378L340.504 372L344.502 369L347.004 364L353.002 358L355.004 354.5L358.504 352.75L363.004 352L370.504 350H378.502L386.002 349L393.504 348L400.004 349L407.502 350H413.004L419.502 352L427.504 355L431.504 358L439.004 360L443.502 364L446.502 366L450.002 368L453.002 371L454.502 373.5L455.502 376.5L458.002 379.5L460.504 382L461.504 383.5V386L460.504 390V393L459.502 395.5L460.004 398L459.502 400.5V403L459.504 405L459.502 408Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling"
            style={{ visibility: 'inherit' }}
          >
            {/*КАРИЕС ЦЕНТР*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M345.5,451.1l2.1,0.8c3.6-2,7.6-3.1,11.8-3.5c6.5-0.5,13.3,1.1,19.2-1.9c3.6-1.8,6.1-5.1,8.1-8.7
                                c1.3-2.5,2.4-5.1,3.1-7.8l1.9-0.1c-1.2,2.2-2.1,4.5-2.8,6.9c-0.9,3.4-1.3,7,0,10.2c3.6,8.8,15.5,9.1,21.6,15.8
                                c4-7.5,13.4-24.8,20.7-38.1c-3.4-3.4-8.2-7.6-13.2-10.1c-12.9-6.5-36.7-12.3-58.7-7.1C354.1,424,348.2,442.5,345.5,451.1z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth55.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth55.seal_center ? `seal-fill ${teethDiagnozis.tooth55.seal_center_color}` : ''}
                            `}
                d="M345.5,451.1l2.1,0.8c3.6-2,7.6-3.1,11.8-3.5c6.5-0.5,13.3,1.1,19.2-1.9c3.6-1.8,6.1-5.1,8.1-8.7
                                c1.3-2.5,2.4-5.1,3.1-7.8l1.9-0.1c-1.2,2.2-2.1,4.5-2.8,6.9c-0.9,3.4-1.3,7,0,10.2c3.6,8.8,15.5,9.1,21.6,15.8
                                c4-7.5,13.4-24.8,20.7-38.1c-3.4-3.4-8.2-7.6-13.2-10.1c-12.9-6.5-36.7-12.3-58.7-7.1C354.1,424,348.2,442.5,345.5,451.1z"
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
                className="st58"
                d="M328,409.8c0.1,2.1,0.1,4.1,0.2,6.2c0.9,12.6,5.9,24.6,14.3,34l2.9,1.1c2.8-8.6,8.7-27,13.8-43.5
                                c5.1-16.1,9.4-30.3,9.4-31.4c0-1.9-4.4-14.8-6.8-21.7c-9.4,8.5-18,17.7-25.8,27.7c-2.7,3.5-5.4,7.1-6.8,11.3
                                C327.6,398.7,327.9,404.3,328,409.8z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth55.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth55.seal_left ? `seal-fill ${teethDiagnozis.tooth55.seal_left_color}` : ''}
                            `}
                d="M328,409.8c0.1,2.1,0.1,4.1,0.2,6.2c0.9,12.6,5.9,24.6,14.3,34l2.9,1.1c2.8-8.6,8.7-27,13.8-43.5
                                c5.1-16.1,9.4-30.3,9.4-31.4c0-1.9-4.4-14.8-6.8-21.7c-9.4,8.5-18,17.7-25.8,27.7c-2.7,3.5-5.4,7.1-6.8,11.3
                                C327.6,398.7,327.9,404.3,328,409.8z"
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
                className="st58"
                d="M410.5,462.8c0.2,0.2,0.4,0.5,0.6,0.7c1.2,1.6,2.1,3.4,2.6,5.3l5.4,1c4.4-0.9,8.8-2.1,13-3.8
                                c9.1-3.6,17.5-9,23.4-16.9c1-1.3,1.9-2.7,2.7-4.1c2-6.5,3-13.2,3.2-20c0.1-5.8-0.5-11.6-0.9-17.4c-0.4-5.3-0.7-10.7-0.9-16.1
                                c-6,4.7-16.5,13.1-18.7,16.3c-1,1.5-4.9,8.3-9.5,16.8C423.9,438,414.5,455.3,410.5,462.8z"
              />
              <path
                className={`
                                st8 target caries-right
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth55.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth55.seal_right ? `seal-fill ${teethDiagnozis.tooth55.seal_right_color}` : ''}
                            `}
                d="M410.5,462.8c0.2,0.2,0.4,0.5,0.6,0.7c1.2,1.6,2.1,3.4,2.6,5.3l5.4,1c4.4-0.9,8.8-2.1,13-3.8
                                c9.1-3.6,17.5-9,23.4-16.9c1-1.3,1.9-2.7,2.7-4.1c2-6.5,3-13.2,3.2-20c0.1-5.8-0.5-11.6-0.9-17.4c-0.4-5.3-0.7-10.7-0.9-16.1
                                c-6,4.7-16.5,13.1-18.7,16.3c-1,1.5-4.9,8.3-9.5,16.8C423.9,438,414.5,455.3,410.5,462.8z"
              />
            </g>
            {/*КАРИЕС У КОРНЯ*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st58"
                d="M359.3,407.6c22-5.2,45.8,0.6,58.7,7.1c4.9,2.5,9.7,6.7,13.2,10.1c4.7-8.5,8.5-15.3,9.5-16.8
                                c2.2-3.2,12.7-11.6,18.7-16.3c0-0.4,0-0.8,0-1.2c-2.8-5.6-6.3-10.8-10.7-15.3c-6.7-6.9-14.8-12.1-23.8-15.6
                                c-9-3.5-18.6-5.1-28.2-5.8c-11.5-0.9-23.1-0.7-34.6,0.7c-0.1,0-0.1,0.1-0.1,0.1c2.4,6.9,6.8,19.7,6.8,21.7
                                C368.7,377.3,364.4,391.5,359.3,407.6z"
              />
              <path
                className={`st8 target caries-bottom
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${tooth55Diagnozis.caries_bottom ? 'caries-fill' : ''}
                                ${tooth55Diagnozis.seal_bottom ? `seal-fill ${teethDiagnozis.tooth55.seal_bottom_color}` : ''}
                            `}
                d="M359.3,407.6c22-5.2,45.8,0.6,58.7,7.1c4.9,2.5,9.7,6.7,13.2,10.1c4.7-8.5,8.5-15.3,9.5-16.8
                                c2.2-3.2,12.7-11.6,18.7-16.3c0-0.4,0-0.8,0-1.2c-2.8-5.6-6.3-10.8-10.7-15.3c-6.7-6.9-14.8-12.1-23.8-15.6
                                c-9-3.5-18.6-5.1-28.2-5.8c-11.5-0.9-23.1-0.7-34.6,0.7c-0.1,0-0.1,0.1-0.1,0.1c2.4,6.9,6.8,19.7,6.8,21.7
                                C368.7,377.3,364.4,391.5,359.3,407.6z"
              />
            </g>
            <g className="with">
              <path
                className="st54"
                d="M359 407L347 446"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_left &&
                      !tooth55Diagnozis.seal_top &&
                      !tooth55Diagnozis.seal_center) ||
                    (tooth55Diagnozis.seal_left &&
                      tooth55Diagnozis.seal_top &&
                      !tooth55Diagnozis.seal_center) ||
                    (!tooth55Diagnozis.seal_left &&
                      tooth55Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M359 407C368 379.5 371.9 377.9 363.5 359.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_left &&
                      !tooth55Diagnozis.seal_bottom) ||
                    (!tooth55Diagnozis.seal_left &&
                      tooth55Diagnozis.seal_bottom &&
                      !tooth55Diagnozis.seal_center) ||
                    (!tooth55Diagnozis.seal_left &&
                      tooth55Diagnozis.seal_bottom &&
                      tooth55Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M359 407C376 402.999 415 411 431 425"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_bottom &&
                      !tooth55Diagnozis.seal_center) ||
                    (tooth55Diagnozis.seal_right &&
                      tooth55Diagnozis.seal_left &&
                      tooth55Diagnozis.seal_center &&
                      !tooth55Diagnozis.seal_bottom) ||
                    (!tooth55Diagnozis.seal_bottom &&
                      !tooth55Diagnozis.seal_top &&
                      tooth55Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M431 425C442.115 405.109 441.456 402.656 454.5 395.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_right &&
                      !tooth55Diagnozis.seal_bottom) ||
                    (!tooth55Diagnozis.seal_right &&
                      tooth55Diagnozis.seal_bottom &&
                      !tooth55Diagnozis.seal_center) ||
                    (!tooth55Diagnozis.seal_right &&
                      tooth55Diagnozis.seal_bottom &&
                      tooth55Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
              />
              <path
                className="st54"
                d="M431 425L413 457.5"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth55Diagnozis.seal_right &&
                      !tooth55Diagnozis.seal_top &&
                      !tooth55Diagnozis.seal_center) ||
                    (tooth55Diagnozis.seal_right &&
                      tooth55Diagnozis.seal_top &&
                      !tooth55Diagnozis.seal_center) ||
                    (!tooth55Diagnozis.seal_right &&
                      tooth55Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
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
                visibility: tooth55Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth55Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className={`vinir-fill ${tooth55Diagnozis.vinir_color}`}
                d="M460.3 407.7C459.9 402.4 459.6 397 459.4 391.6C459.4 391.2 459.4 390.8 459.4 390.4C456.6 384.8 453.1 379.6 448.7 375.1C442 368.2 433.9 363 424.9 359.5C415.9 356 406.3 354.4 396.7 353.7C385.2 352.8 373.6 353 362.1 354.4C362 354.4 362 354.5 362 354.5C352.6 363 344 372.2 336.2 382.2C333.5 385.7 330.8 389.3 329.4 393.5C327.6 398.7 
                                327.9 404.3 328.1 409.9C328.2 412 328.2 414 328.3 416.1C329.2 428.7 334.2 440.7 342.6 450.1L345.5 451.2L347.6 452C351.2 450 355.2 448.9 359.4 448.5C365.9 448 372.7 449.6 378.6 446.6C382.2 444.8 384.7 441.5 386.7 437.9C388 435.4 389.1 432.8 389.8 430.1L391.7 430C390.5 432.2 389.6 434.5 388.9 436.9C388 440.3 387.6 443.9 
                                388.9 447.1C392.5 455.9 404.4 456.2 410.5 462.9C410.7 463.1 410.9 463.4 411.1 463.6C412.3 465.2 413.2 467 413.7 468.9L419.1 469.9C423.5 469 427.9 467.8 432.1 466.1C441.2 462.5 449.6 457.1 455.5 449.2C456.5 447.9 457.4 446.5 458.2 445.1C460.2 438.6 461.2 431.9 461.4 425.1C461.3 419.3 460.7 413.5 460.3 407.7Z"
              />
            </g>
          </g>
          {/* ТИМЧАСОВА/КЕРАМІЧНА/МЕТАЛОКЕРАМІЧНА КОРОНКА*/}
          <g
            className="crown"
            style={{
              visibility:
                tooth55Diagnozis.temporary_crown ||
                tooth55Diagnozis.ceramic_crown ||
                tooth55Diagnozis.mceramic_crown ||
                tooth55Diagnozis.metalic_crown ||
                tooth55Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth55Diagnozis.temporary_crown ||
                tooth55Diagnozis.ceramic_crown ||
                tooth55Diagnozis.mceramic_crown ||
                tooth55Diagnozis.metalic_crown ||
                tooth55Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`
                                temporary-crown crown-fill
                                ${diagnozis}
                                ${tooth55Diagnozis.ceramic_crown_color}
                                ${tooth55Diagnozis.mceramic_crown_color}
                                ${tooth55Diagnozis.metalic_crown_color}
                                ${tooth55Diagnozis.zirconia_crown_color}
                            `}
              d="M460.3,407.7c-0.4-5.3-0.7-10.7-0.9-16.1c0-0.4,0-0.8,0-1.2
                            c-2.8-5.6-6.3-10.8-10.7-15.3c-6.7-6.9-14.8-12.1-23.8-15.6c-9-3.5-18.6-5.1-28.2-5.8c-11.5-0.9-23.1-0.7-34.6,0.7
                            c-0.1,0-0.1,0.1-0.1,0.1c-9.4,8.5-18,17.7-25.8,27.7c-2.7,3.5-5.4,7.1-6.8,11.3c-1.8,5.2-1.5,10.8-1.3,16.4
                            c0.1,2.1,0.1,4.1,0.2,6.2c0.9,12.6,5.9,24.6,14.3,34l2.9,1.1l2.1,0.8c3.6-2,7.6-3.1,11.8-3.5c6.5-0.5,13.3,1.1,19.2-1.9
                            c3.6-1.8,6.1-5.1,8.1-8.7c1.3-2.5,2.4-5.1,3.1-7.8l1.9-0.1c-1.2,2.2-2.1,4.5-2.8,6.9c-0.9,3.4-1.3,7,0,10.2
                            c3.6,8.8,15.5,9.1,21.6,15.8c0.2,0.2,0.4,0.5,0.6,0.7c1.2,1.6,2.1,3.4,2.6,5.3l5.4,1c4.4-0.9,8.8-2.1,13-3.8
                            c9.1-3.6,17.5-9,23.4-16.9c1-1.3,1.9-2.7,2.7-4.1c2-6.5,3-13.2,3.2-20C461.3,419.3,460.7,413.5,460.3,407.7z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
