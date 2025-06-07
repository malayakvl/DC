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
import PeriodontitStage42 from './periodontit42';
import { excludeToothEffect } from '../../../Constants';

export default function Tooth42() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth42Diagnozis = teethDiagnozis.tooth42;
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
        teethDiagnozis.tooth42.caries_bottom =
          !teethDiagnozis.tooth42.caries_bottom;
      }
      if (toothPart === 'center') {
        teethDiagnozis.tooth42.caries_center =
          !teethDiagnozis.tooth42.caries_center;
      }
      if (toothPart === 'left') {
        teethDiagnozis.tooth42.caries_left =
          !teethDiagnozis.tooth42.caries_left;
      }
      if (toothPart === 'right') {
        teethDiagnozis.tooth42.caries_right =
          !teethDiagnozis.tooth42.caries_right;
      }
      if (toothPart === 'top') {
        teethDiagnozis.tooth42.caries_top = !teethDiagnozis.tooth42.caries_top;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'seal') {
      if (toothPart === 'center') {
        if (
          teethDiagnozis.tooth42.seal_center_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth42.seal_center_color = sealColor1;
          teethDiagnozis.tooth42.seal_center = true;
        } else if (
          teethDiagnozis.tooth42.seal_center_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth42.seal_center_color = sealColor2;
          teethDiagnozis.tooth42.seal_center = true;
        } else if (
          teethDiagnozis.tooth42.seal_center_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth42.seal_center_color = sealColor3;
          teethDiagnozis.tooth42.seal_center = true;
        } else {
          teethDiagnozis.tooth42.seal_center =
            !teethDiagnozis.tooth42.seal_center;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'bottom') {
        if (
          teethDiagnozis.tooth42.seal_bottom_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth42.seal_bottom_color = sealColor1;
          teethDiagnozis.tooth42.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth42.seal_bottom_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth42.seal_bottom_color = sealColor2;
          teethDiagnozis.tooth42.seal_bottom = true;
        } else if (
          teethDiagnozis.tooth42.seal_bottom_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth42.seal_bottom_color = sealColor3;
          teethDiagnozis.tooth42.seal_bottom = true;
        } else {
          teethDiagnozis.tooth42.seal_bottom =
            !teethDiagnozis.tooth42.seal_bottom;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'left') {
        if (
          teethDiagnozis.tooth42.seal_left_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth42.seal_left_color = sealColor1;
          teethDiagnozis.tooth42.seal_left = true;
        } else if (
          teethDiagnozis.tooth42.seal_left_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth42.seal_left_color = sealColor2;
          teethDiagnozis.tooth42.seal_left = true;
        } else if (
          teethDiagnozis.tooth42.seal_left_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth42.seal_left_color = sealColor3;
          teethDiagnozis.tooth42.seal_left = true;
        } else {
          teethDiagnozis.tooth42.seal_left = !teethDiagnozis.tooth42.seal_left;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'right') {
        if (
          teethDiagnozis.tooth42.seal_right_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth42.seal_right_color = sealColor1;
          teethDiagnozis.tooth42.seal_right = true;
        } else if (
          teethDiagnozis.tooth42.seal_right_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth42.seal_right_color = sealColor2;
          teethDiagnozis.tooth42.seal_right = true;
        } else if (
          teethDiagnozis.tooth42.seal_right_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth42.seal_right_color = sealColor3;
          teethDiagnozis.tooth42.seal_right = true;
        } else {
          teethDiagnozis.tooth42.seal_right =
            !teethDiagnozis.tooth42.seal_right;
        }
        dispatch(setToothDiagnoze(teethDiagnozis));
      }
      if (toothPart === 'top') {
        if (
          teethDiagnozis.tooth42.seal_top_color != sealColor1 &&
          sealColor1 != ''
        ) {
          teethDiagnozis.tooth42.seal_top_color = sealColor1;
          teethDiagnozis.tooth42.seal_top = true;
        } else if (
          teethDiagnozis.tooth42.seal_top_color != sealColor2 &&
          sealColor2 != ''
        ) {
          teethDiagnozis.tooth42.seal_top_color = sealColor2;
          teethDiagnozis.tooth42.seal_top = true;
        } else if (
          teethDiagnozis.tooth42.seal_top_color != sealColor3 &&
          sealColor3 != ''
        ) {
          teethDiagnozis.tooth42.seal_top_color = sealColor3;
          teethDiagnozis.tooth42.seal_top = true;
        } else {
          teethDiagnozis.tooth42.seal_top = !teethDiagnozis.tooth42.seal_top;
        }
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
    if (diagnozis === 'wedge_shaped_defect') {
      if (
        teethDiagnozis.tooth42.wedge_shaped_defect_color != wsDefectColor &&
        wsDefectColor != ''
      ) {
        teethDiagnozis.tooth42.wedge_shaped_defect_color = wsDefectColor;
      } else {
        teethDiagnozis.tooth42.wedge_shaped_defect_color =
          !teethDiagnozis.tooth42.wedge_shaped_defect_color;
      }
      dispatch(setToothDiagnoze(teethDiagnozis));
    }
  };

  const showHideTeeth = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth42.show) {
        document.getElementById('TH-42').classList.add('f-tooth-active');
      }
    }

    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'child' && !teethDiagnozis.tooth82.show) {
        document.getElementById('TH-82').classList.remove('f-tooth-active');
      }
      if (teethType === 'adult' && !teethDiagnozis.tooth42.show) {
        document.getElementById('TH-42').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth82.show) {
          document.getElementById('TH-82').classList.add('f-tooth-active');
        }
      }
    }
  };

  const showHideTopCommonView = type => {
    if (type === 'over' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth42.show) {
        document.getElementById('TH-82').classList.remove('f-tooth-active');
        document.getElementById('TH-42').classList.add('f-tooth-active');
      }
    }
    if (type === 'leave' && !excludeToothEffect.includes(diagnozis)) {
      if (teethType === 'adult' && !teethDiagnozis.tooth42.show) {
        document.getElementById('TH-42').classList.remove('f-tooth-active');
        if (teethDiagnozis.tooth85.show) {
          document.getElementById('TH-82').classList.add('f-tooth-active');
        }
      }
    }
  };

  return (
    <>
      <g
        id="42"
        className={`tooth-number-active ${teethType === 'child' ? 'hide-number' : ''}`}
      >
        <text
          transform="matrix(1 0 0 1 932.5898 842.0025)"
          className={`st3 st4 st5 ${selectedTooth === 42 ? 'num-active' : ''}`}
        >
          42
        </text>
      </g>
      <g
        id="TH-42"
        className={`f-tooth-init ${(teethDiagnozis.tooth42.show || allTeeth) && !teethDiagnozis.tooth42.absent ? 'f-tooth-active' : ''} ${teethType}`}
        onClick={() => {
          if (excludeToothEffect.indexOf(diagnozis) < 0) {
            teethDiagnozis.tooth42.show = !teethDiagnozis.tooth42.show;
            teethDiagnozis.tooth82.show = false;
          }

          dispatch(setSelectedToothNumber(42));
          dispatch(setChangeDia(Math.random()));

          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              42,
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
          className={`underlay ${selectedTooth === 42 ? 'selected' : ''}`}
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
            d="M978.8,1202.9c0,0-2,48-5,71s-6,60-11,77s-14,29-25,28s-15-12-17-30
                        s-2-66-2-90s-2.7-79-3.3-98c-1.7-62,17.3-79,16.3-107s-15-43.5-15-67.2c0-23.8,0.6-158.8,2-173.8c2-21,16-28,29-29s34,4,36,38
                        s-0.8,161-1,167c-1,26-16,39-16,68s17,49,15,87S978.8,1202.9,978.8,1202.9z"
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
                  !tooth42Diagnozis.implant &&
                  !tooth42Diagnozis.apex &&
                  !tooth42Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth42Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M924.6,990.6c1.4,2.6,4.3,4.2,7.3,5.4c5.5,2.1,11.7,3,17.8,3c5.2-0.1,10.3-0.8,15.1-2.5
                                c3.5-1.3,6.9-3.1,8.6-6.1c1.2-2.3,1.2-4.9-0.3-7.1c-1.2-1.8-3.3-2.9-5-4.3c-4.1-3.2-6.7-7.6-10.3-11.3c-2.4-2.4-5.4-4.5-9-4.9
                                c-2.7-0.3-5.3,0.4-7.4,1.9c-1.6,1.2-2.8,3-3.9,4.6c-2.5,3.5-5.5,6.8-8.6,9.8c-1.6,1.5-3.2,3.1-4.2,5
                                C923.6,986.3,923.6,988.6,924.6,990.6z"
              />
            </g>
            <g
              style={{
                visibility:
                  tooth42Diagnozis?.apex || tooth42Diagnozis.change_color
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                className={`st9 change-color ${tooth42Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M924.6 990.6C926 993.2 928.9 994.8 931.9 996C937.4 998.1 943.6 999 949.7 999C954.9 998.9 960 998.2 964.8 996.5C968.3 995.2 971.7 993.4 973.4 990.4C974.6 988.1 974.6 985.5 973.1 983.3C971.9 981.5 969.8 980.4 968.1 979C964 975.8 961.4 971.4 957.8 967.7C955.4 965.3 952.4 963.2 948.8 962.8C946.1 962.5 943.5 963.2 941.4 964.7C939.8 965.9 938.6 967.7 937.5 969.3C935 972.8 932 976.1 928.9 979.1C927.3 980.6 925.7 982.2 924.7 984.1C923.6 986.3 923.6 988.6 924.6 990.6Z"
              />
            </g>
          </g>
          <g className="pulp">
            <g
              style={{
                visibility: tooth42Diagnozis.apex ? 'inherit' : 'hidden',
              }}
            >
              <path
                className="st22 target"
                d="M943.171 985.525C943.171 985.127 942.749 984.097 944.763 981.941C946.265 980.568 946.78 978.146 948.701 978.108C950.77 978.068 951.34 980.258 952.679 981.717C954.285 983.468 954.512 984.752 954.319 985.525C953.921 987.117 952.824 987.147 948.701 987.172C944.578 987.197 943.171 985.923 943.171 985.525Z"
                style={{ fill: '#e80808' }}
              />
            </g>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            style={{
              visibility:
                tooth42Diagnozis.implant || tooth42Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <circle className="st48" cx="948.5" cy="983.5" r="14.5" />
            <g className="st27">
              <mask id="implant_42" className="st49">
                <path
                  className="st50"
                  d="M941.341 975.051L939.525 974.46C937.98 976.014 936.831 977.961 936.241 980.139L937.663 981.417C937.536 982.092 937.469 982.788 937.469 983.5C937.469 984.211 937.536 984.907 937.663 985.582L936.241 986.86C936.831 989.038 937.98 990.985 939.524 992.539L941.341 991.947C942.39 992.852 943.61 993.565 944.946 994.031L945.342 995.901C946.388 996.177 947.487 996.324 948.62 996.324C949.754 996.324 950.853 996.177 951.9 995.901L952.297 994.031C953.632 993.565 954.851 992.852 955.9 991.947L957.717 992.539C959.262 990.985 960.41 989.037 961 986.859L959.578 985.581C959.705 984.906 959.772 984.211 959.772 983.5C959.772 982.788 959.705 982.092 959.578 981.418L961 980.139C960.41 977.962 959.261 976.014 957.717 974.46L955.9 975.052C954.851 974.147 953.632 973.434 952.297 972.968L951.901 971.099C950.854 970.823 949.754 970.676 948.62 970.676C947.487 970.676 946.388 970.823 945.342 971.099L944.946 972.968C943.61 973.434 942.39 974.147 941.341 975.051Z"
                ></path>
              </mask>
              <path
                className="st50 st51"
                d="M941.341 975.051L939.525 974.46C937.98 976.014 936.831 977.961 936.241 980.139L937.663 981.417C937.536 982.092 937.469 982.788 937.469 983.5C937.469 984.211 937.536 984.907 937.663 985.582L936.241 986.86C936.831 989.038 937.98 990.985 939.524 992.539L941.341 991.947C942.39 992.852 943.61 993.565 944.946 994.031L945.342 995.901C946.388 996.177 947.487 996.324 948.62 996.324C949.754 996.324 950.853 996.177 951.9 995.901L952.297 994.031C953.632 993.565 954.851 992.852 955.9 991.947L957.717 992.539C959.262 990.985 960.41 989.037 961 986.859L959.578 985.581C959.705 984.906 959.772 984.211 959.772 983.5C959.772 982.788 959.705 982.092 959.578 981.418L961 980.139C960.41 977.962 959.261 976.014 957.717 974.46L955.9 975.052C954.851 974.147 953.632 973.434 952.297 972.968L951.901 971.099C950.854 970.823 949.754 970.676 948.62 970.676C947.487 970.676 946.388 970.823 945.342 971.099L944.946 972.968C943.61 973.434 942.39 974.147 941.341 975.051Z"
              ></path>
              <path
                className="st52"
                d="M939.525 974.46L940.144 972.558L938.974 972.177L938.106 973.05L939.525 974.46ZM941.341 975.051L940.722 976.953L941.794 977.302L942.647 976.566L941.341 975.051ZM936.241 980.139L934.311 979.616L933.989 980.803L934.904 981.626L936.241 980.139ZM937.663 981.417L939.628 981.788L939.837 980.682L939 979.93L937.663 981.417ZM937.663 985.582L939 987.069L939.837 986.316L939.628 985.211L937.663 985.582ZM936.241 986.86L934.904 985.373L933.989 986.196L934.311 987.383L936.241 986.86ZM939.524 992.539L938.105 993.949L938.973 994.822L940.143 994.441L939.524 992.539ZM941.341 991.947L942.647 990.433L941.794 989.697L940.722 990.046L941.341 991.947ZM944.946 994.031L946.902 993.617L946.669 992.514L945.604 992.143L944.946 994.031ZM945.342 995.901L943.385 996.316L943.641 997.521L944.832 997.835L945.342 995.901ZM951.9 995.901L952.411 997.835L953.602 997.52L953.857 996.315L951.9 995.901ZM952.297 994.031L951.638 992.142L950.574 992.514L950.34 993.616L952.297 994.031ZM955.9 991.947L956.52 990.045L955.448 989.696L954.594 990.433L955.9 991.947ZM957.717 992.539L957.098 994.441L958.269 994.822L959.136 993.949L957.717 992.539ZM961 986.859L962.93 987.382L963.252 986.195L962.337 985.372L961 986.859ZM959.578 985.581L957.613 985.21L957.404 986.315L958.241 987.068L959.578 985.581ZM959.578 981.418L958.241 979.931L957.404 980.683L957.613 981.789L959.578 981.418ZM961 980.139L962.337 981.627L963.252 980.804L962.93 979.617L961 980.139ZM957.717 974.46L959.135 973.05L958.268 972.177L957.097 972.558L957.717 974.46ZM955.9 975.052L954.594 976.566L955.447 977.303L956.519 976.953L955.9 975.052ZM952.297 972.968L950.34 973.383L950.574 974.485L951.638 974.857L952.297 972.968ZM951.901 971.099L953.857 970.685L953.602 969.48L952.411 969.165L951.901 971.099ZM945.342 971.099L944.832 969.165L943.64 969.479L943.385 970.684L945.342 971.099ZM944.946 972.968L945.604 974.856L946.668 974.485L946.902 973.382L944.946 972.968ZM938.905 976.362L940.722 976.953L941.96 973.15L940.144 972.558L938.905 976.362ZM938.172 980.662C938.669 978.827 939.637 977.183 940.943 975.87L938.106 973.05C936.323 974.844 934.994 977.095 934.311 979.616L938.172 980.662ZM939 979.93L937.579 978.651L934.904 981.626L936.326 982.904L939 979.93ZM939.469 983.5C939.469 982.913 939.524 982.341 939.628 981.788L935.698 981.046C935.547 981.842 935.469 982.663 935.469 983.5H939.469ZM939.628 985.211C939.524 984.658 939.469 984.086 939.469 983.5H935.469C935.469 984.336 935.547 985.157 935.698 985.953L939.628 985.211ZM937.578 988.348L939 987.069L936.326 984.095L934.904 985.373L937.578 988.348ZM940.942 991.129C939.637 989.816 938.668 988.172 938.172 986.338L934.311 987.383C934.993 989.904 936.322 992.155 938.105 993.949L940.942 991.129ZM940.722 990.046L938.905 990.637L940.143 994.441L941.96 993.849L940.722 990.046ZM945.604 992.143C944.511 991.761 943.51 991.177 942.647 990.433L940.035 993.462C941.271 994.528 942.71 995.369 944.287 995.92L945.604 992.143ZM947.298 995.486L946.902 993.617L942.989 994.446L943.385 996.316L947.298 995.486ZM948.62 994.324C947.661 994.324 946.733 994.2 945.852 993.967L944.832 997.835C946.043 998.154 947.314 998.324 948.62 998.324V994.324ZM951.39 993.967C950.508 994.199 949.58 994.324 948.62 994.324V998.324C949.928 998.324 951.199 998.154 952.411 997.835L951.39 993.967ZM950.34 993.616L949.944 995.486L953.857 996.315L954.253 994.445L950.34 993.616ZM954.594 990.433C953.732 991.176 952.731 991.761 951.638 992.142L952.956 995.919C954.532 995.369 955.971 994.528 957.207 993.462L954.594 990.433ZM958.337 990.637L956.52 990.045L955.281 993.849L957.098 994.441L958.337 990.637ZM959.069 986.337C958.573 988.171 957.604 989.815 956.299 991.129L959.136 993.949C960.919 992.154 962.248 989.903 962.93 987.382L959.069 986.337ZM958.241 987.068L959.663 988.347L962.337 985.372L960.915 984.094L958.241 987.068ZM957.772 983.5C957.772 984.086 957.717 984.657 957.613 985.21L961.543 985.952C961.694 985.156 961.772 984.336 961.772 983.5H957.772ZM957.613 981.789C957.717 982.342 957.772 982.913 957.772 983.5H961.772C961.772 982.663 961.693 981.843 961.543 981.047L957.613 981.789ZM959.662 978.652L958.241 979.931L960.915 982.905L962.337 981.627L959.662 978.652ZM956.298 975.87C957.604 977.184 958.573 978.828 959.069 980.662L962.93 979.617C962.248 977.096 960.919 974.845 959.135 973.05L956.298 975.87ZM956.519 976.953L958.336 976.362L957.097 972.558L955.281 973.15L956.519 976.953ZM951.638 974.857C952.731 975.238 953.732 975.823 954.594 976.566L957.206 973.537C955.97 972.471 954.532 971.63 952.956 971.08L951.638 974.857ZM949.944 971.514L950.34 973.383L954.253 972.554L953.857 970.685L949.944 971.514ZM948.62 972.676C949.581 972.676 950.509 972.8 951.39 973.033L952.411 969.165C951.199 968.846 949.928 968.676 948.62 968.676V972.676ZM945.852 973.033C946.733 972.8 947.661 972.676 948.62 972.676V968.676C947.314 968.676 946.043 968.845 944.832 969.165L945.852 973.033ZM946.902 973.382L947.298 971.513L943.385 970.684L942.989 972.553L946.902 973.382ZM942.647 976.566C943.51 975.822 944.511 975.238 945.604 974.856L944.287 971.079C942.71 971.63 941.271 972.471 940.035 973.537L942.647 976.566Z"
                mask="url(#implant_42)"
              ></path>
            </g>
          </g>
          {/* SHAPER */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <circle className="st44" cx="948.5" cy="984.5" r="16.5" />
            <path
              className="st45"
              d="M946.577 975.739C947.129 973.804 949.871 973.804 950.423 975.739L950.929 977.511C951.225 978.549 952.291 979.164 953.338 978.902L955.126 978.454C957.077 977.965 958.448 980.339 957.049 981.785L955.767 983.109C955.016 983.884 955.016 985.116 955.767 985.891L957.049 987.215C958.448 988.661 957.077 991.035 955.126 990.546L953.338 990.098C952.291 989.836 951.225 990.451 950.929 991.489L950.423 993.261C949.871 995.196 947.129 995.196 946.577 993.261L946.071 991.489C945.775 990.451 944.709 989.836 943.662 990.098L941.874 990.546C939.923 991.035 938.552 988.661 939.951 987.215L941.233 985.891C941.984 985.116 941.984 983.884 941.233 983.109L939.951 981.785C938.552 980.339 939.923 977.965 941.874 978.454L943.662 978.902C944.709 979.164 945.775 978.549 946.071 977.511L946.577 975.739Z"
            ></path>
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth42Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth42Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st47"
              d="M972.268 983.854L972.268 983.854L972.274 983.863C973.539 985.719 973.563 987.914 972.521 989.922C971.007 992.58 967.92 994.273 964.459 995.56C959.792 997.211 954.81 997.9 949.69 998C943.688 997.999 937.62 997.112 932.264 995.068C929.294 993.88 926.708 992.392 925.488 990.139C924.644 988.441 924.63 986.482 925.59 984.556C926.504 982.825 927.985 981.328 929.584 979.829L929.59 979.824L929.595 979.818C932.725 976.79 935.769 973.444 938.314 969.881L938.319 969.874L938.324 969.866C938.361 969.813 938.398 969.759 938.434 969.706C939.523 968.122 940.601 966.553 941.991 965.507C943.888 964.155 946.238 963.521 948.69 963.794C951.962 964.157 954.761 966.076 957.088 968.402C958.448 969.8 959.654 971.292 960.889 972.818C961.252 973.267 961.617 973.719 961.99 974.172C963.61 976.144 965.339 978.111 967.474 979.78C968.004 980.215 968.615 980.655 969.192 981.07C969.543 981.323 969.882 981.567 970.182 981.796C971.042 982.45 971.761 983.094 972.268 983.854Z"
            ></path>
            <path
              className="st47"
              d="M968.199 983.571L968.198 983.571L968.204 983.58C969.217 985.054 969.241 986.797 968.402 988.406C967.172 990.546 964.652 991.929 961.774 992.991C957.906 994.35 953.774 994.918 949.521 995C944.534 994.999 939.499 994.268 935.06 992.586C932.589 991.604 930.487 990.393 929.501 988.588C928.826 987.238 928.812 985.678 929.587 984.134C930.333 982.731 931.547 981.511 932.879 980.271L932.885 980.266L932.891 980.26C935.503 977.751 938.047 974.975 940.176 972.017L940.181 972.01L940.186 972.002C940.215 971.962 940.243 971.921 940.271 971.88C941.183 970.562 942.067 969.285 943.202 968.437C944.749 967.343 946.667 966.829 948.671 967.05C951.345 967.345 953.644 968.903 955.57 970.814C956.697 971.964 957.695 973.19 958.723 974.451C959.026 974.823 959.332 975.199 959.644 975.576C960.996 977.208 962.446 978.847 964.24 980.239C964.683 980.601 965.202 980.972 965.687 981.319C965.978 981.527 966.257 981.726 966.499 981.909C967.211 982.447 967.792 982.966 968.199 983.571Z"
            ></path>
            <circle className="st45" cx="948" cy="983" r="13" />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth42Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56 hIntact"
              d="M972.267 983.854L972.267 983.854L972.273 983.863C973.538 985.719 973.563 987.914 972.521 989.922C971.006 992.58 967.919 994.273 964.458 995.56C959.791 997.211 954.809 997.9 949.69 998C943.687 997.999 937.619 997.112 932.263 995.068C929.294 993.88 926.707 992.392 925.487 990.139C924.643 988.441 924.629 986.482 925.589 984.556C926.503 982.825 927.984 981.328 929.583 979.829L929.589 979.824L929.595 979.818C932.724 976.79 935.768 973.444 938.313 969.881L938.318 969.874L938.323 969.866C938.36 969.813 938.397 969.759 938.434 969.706C939.522 968.122 940.6 966.553 941.99 965.507C943.887 964.155 946.237 963.521 948.689 963.794C951.961 964.157 954.76 966.076 957.087 968.402C958.447 969.8 959.653 971.292 960.889 972.818C961.251 973.267 961.617 973.719 961.989 974.172C963.609 976.144 965.338 978.111 967.474 979.78C968.003 980.215 968.614 980.655 969.191 981.07C969.542 981.323 969.881 981.567 970.181 981.796C971.041 982.45 971.76 983.094 972.267 983.854Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st56 hIntact"
              d="M968.198 983.571L968.198 983.571L968.203 983.58C969.216 985.054 969.24 986.797 968.401 988.406C967.171 990.546 964.651 991.929 961.773 992.991C957.905 994.35 953.773 994.918 949.52 995C944.533 994.999 939.498 994.268 935.059 992.586C932.588 991.604 930.486 990.393 929.5 988.588C928.825 987.238 928.811 985.678 929.586 984.134C930.332 982.731 931.546 981.511 932.878 980.271L932.884 980.266L932.89 980.26C935.502 977.751 938.046 974.975 940.175 972.017L940.18 972.01L940.185 972.002C940.214 971.962 940.242 971.921 940.27 971.88C941.182 970.562 942.066 969.285 943.201 968.437C944.748 967.343 946.666 966.829 948.67 967.05C951.344 967.345 953.643 968.903 955.569 970.814C956.696 971.964 957.694 973.19 958.722 974.451C959.025 974.823 959.331 975.199 959.643 975.576C960.995 977.208 962.445 978.847 964.239 980.239C964.682 980.601 965.201 980.972 965.686 981.319C965.977 981.527 966.256 981.726 966.498 981.909C967.21 982.447 967.791 982.966 968.198 983.571Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <circle
              className="st57"
              cx="947.999"
              cy="983"
              r="12.25"
              style={{ fill: 'black', opacity: tooth42Diagnozis.pin ? 1 : 0 }}
            />
          </g>
          <g
            className="stump"
            style={{
              visibility: !tooth42Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth42Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st47"
              d="M972.268 983.854L972.268 983.854L972.274 983.863C973.539 985.719 973.563 987.914 972.521 989.922C971.007 992.58 967.92 994.273 964.459 995.56C959.792 997.211 954.81 997.9 949.69 998C943.688 997.999 937.62 997.112 932.264 995.068C929.294 993.88 926.708 992.392 925.488 990.139C924.644 988.441 924.63 986.482 925.59 984.556C926.504 982.825 927.985 981.328 929.584 979.829L929.59 979.824L929.595 979.818C932.725 976.79 935.769 973.444 938.314 969.881L938.319 969.874L938.324 969.866C938.361 969.813 938.398 969.759 938.434 969.706C939.523 968.122 940.601 966.553 941.991 965.507C943.888 964.155 946.238 963.521 948.69 963.794C951.962 964.157 954.761 966.076 957.088 968.402C958.448 969.8 959.654 971.292 960.889 972.818C961.252 973.267 961.617 973.719 961.99 974.172C963.61 976.144 965.339 978.111 967.474 979.78C968.004 980.215 968.615 980.655 969.192 981.07C969.543 981.323 969.882 981.567 970.182 981.796C971.042 982.45 971.761 983.094 972.268 983.854Z"
            ></path>
            <path
              className="st47"
              d="M968.199 983.571L968.198 983.571L968.204 983.58C969.217 985.054 969.241 986.797 968.402 988.406C967.172 990.546 964.652 991.929 961.774 992.991C957.906 994.35 953.774 994.918 949.521 995C944.534 994.999 939.499 994.268 935.06 992.586C932.589 991.604 930.487 990.393 929.501 988.588C928.826 987.238 928.812 985.678 929.587 984.134C930.333 982.731 931.547 981.511 932.879 980.271L932.885 980.266L932.891 980.26C935.503 977.751 938.047 974.975 940.176 972.017L940.181 972.01L940.186 972.002C940.215 971.962 940.243 971.921 940.271 971.88C941.183 970.562 942.067 969.285 943.202 968.437C944.749 967.343 946.667 966.829 948.671 967.05C951.345 967.345 953.644 968.903 955.57 970.814C956.697 971.964 957.695 973.19 958.723 974.451C959.026 974.823 959.332 975.199 959.644 975.576C960.996 977.208 962.446 978.847 964.24 980.239C964.683 980.601 965.202 980.972 965.687 981.319C965.978 981.527 966.257 981.726 966.499 981.909C967.211 982.447 967.792 982.966 968.199 983.571Z"
            ></path>
          </g>
          <g
            style={{
              visibility:
                !tooth42Diagnozis.culttab &&
                !tooth42Diagnozis.abutment &&
                !tooth42Diagnozis.implant &&
                !tooth42Diagnozis.apex &&
                !tooth42Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M981.1,982.7c-1.6-2.8-4.3-4.7-6.6-6.9c-3.2-3-5.7-6.8-8.3-10.6c-1.7-2.6-3.4-5.1-5.3-7.5
                            c-3.2-3.9-7-7.2-11.7-7.9c-3.5-0.5-6.9,0.5-9.6,3c-2.1,1.9-3.6,4.7-5.1,7.3c-1,1.8-2.2,3.6-3.3,5.3c-2.4,3.6-5.1,7-7.8,10.3
                            c-2,2.4-4.2,4.9-5.3,7.9c-1.3,3.3-1.4,7,0,10.2c1,2.3,2.5,4,4.3,5.5c1.6,1.3,3.4,2.3,5.2,3.2c7.2,3.4,15.2,4.9,23.2,4.9
                            c6.7,0,13.4-1.2,19.6-3.8c2.5-1.1,5-2.4,7-4.2c1.7-1.5,3.1-3.2,4.1-5.4C983.1,990.3,983.1,986.1,981.1,982.7z"
            />
          </g>

          {/*TARTAR*/}
          <g
            style={{
              opacity: teethDiagnozis.tooth42.tartar ? 1 : 0,
              visibility: 'inherit',
            }}
          >
            <path
              className="st61 level2"
              d="M982.377 996.002C983.962 991.842 984.852 987.138 982.871 983.159C981.286 979.903 978.623 977.913 976.379 975.38C974.782 973.673 972.358 970.351 971.021 968.355C969.426 965.972 966.845 963.873 965.356 961.354C963.86 958.825 963.346 957.303 961.667 954.939C960.201 952.93 957.565 949.611 955.759 948.086C953.662 946.314 951.337 946.464 948.782 946.075C946.983 945.801 945.218 944.562 943.554 945.162C941.92 945.752 940.384 948.168 939.01 949.512C936.897 951.683 934.203 953.513 932.75 956.407C931.174 959.429 930.558 963.795 928.739 966.632C926.747 969.74 924.643 971.298 922.504 974.135C920.391 976.848 917.168 981.169 915.847 984.606C914.395 988.586 915.373 992.746 916.825 996.364C917.635 998.425 917.715 1000.14 919.13 1001.6C920.945 1003.46 924.239 1004.91 926.465 1006.13C929.782 1007.87 933.291 1010.58 936.893 1011.46C941.178 1012.51 945.594 1011.56 949.971 1011.56C953.586 1011.46 957.164 1012.49 960.667 1011.69C963.818 1010.97 966.909 1008.49 969.911 1007.04C972.154 1005.9 975.475 1004.54 977.415 1002.83C979.472 1001.01 981.222 998.796 982.377 996.002ZM932.031 996.001C929.031 994.801 926.131 993.201 924.731 990.601C923.631 988.601 923.731 986.301 924.831 984.101C925.831 982.201 927.431 980.601 929.031 979.101C932.131 976.101 935.131 972.801 937.631 969.301C938.731 967.701 939.931 965.901 941.531 964.701C943.631 963.201 946.231 962.501 948.931 962.801C952.531 963.201 955.531 965.301 957.931 967.701C961.531 971.401 964.131 975.801 968.231 979.001C969.931 980.401 972.031 981.501 973.231 983.301C974.731 985.501 974.731 988.101 973.531 990.401C971.831 993.401 968.431 995.201 964.931 996.501C960.131 998.201 955.031 998.901 949.831 999.001C943.731 999.001 937.531 998.101 932.031 996.001Z"
            ></path>
            <path
              className="st61 level1 hRoot"
              d="M982.377 996.002C983.962 991.842 984.852 987.138 982.871 983.159C981.286 979.903 978.623 977.913 976.379 975.38C974.782 973.673 972.358 970.351 971.021 968.355C969.426 965.972 966.845 963.873 965.356 961.354C963.86 958.825 963.346 957.303 961.667 954.939C960.201 952.93 957.565 949.611 955.759 948.086C953.662 946.314 951.337 946.464 948.782 946.075C946.983 945.801 945.218 944.562 943.554 945.162C941.92 945.752 940.384 948.168 939.01 949.512C936.897 951.683 934.203 953.513 932.75 956.407C931.174 959.429 930.558 963.795 928.739 966.632C926.747 969.74 924.643 971.298 922.504 974.135C920.391 976.848 917.168 981.169 915.847 984.606C914.395 988.586 915.373 992.746 916.825 996.364C917.635 998.425 917.715 1000.14 919.13 1001.6C920.945 1003.46 924.239 1004.91 926.465 1006.13C929.782 1007.87 933.291 1010.58 936.893 1011.46C941.178 1012.51 945.594 1011.56 949.971 1011.56C953.586 1011.46 957.164 1012.49 960.667 1011.69C963.818 1010.97 966.909 1008.49 969.911 1007.04C972.154 1005.9 975.475 1004.54 977.415 1002.83C979.472 1001.01 981.222 998.796 982.377 996.002ZM932.031 996.001C929.031 994.801 926.131 993.201 924.731 990.601C923.631 988.601 923.731 986.301 924.831 984.101C925.831 982.201 927.431 980.601 929.031 979.101C932.131 976.101 935.131 972.801 937.631 969.301C938.731 967.701 939.931 965.901 941.531 964.701C943.631 963.201 946.231 962.501 948.931 962.801C952.531 963.201 955.531 965.301 957.931 967.701C961.531 971.401 964.131 975.801 968.231 979.001C969.931 980.401 972.031 981.501 973.231 983.301C974.731 985.501 974.731 988.101 973.531 990.401C971.831 993.401 968.431 995.201 964.931 996.501C960.131 998.201 955.031 998.901 949.831 999.001C943.731 999.001 937.531 998.101 932.031 996.001Z"
              style={{ visibility: 'inherit' }}
            ></path>
            <path
              className="st61 level1"
              d="M979.102 992.092C980.53 989.175 979.529 985.877 977.745 983.086C976.318 980.803 974.82 979.408 972.798 977.633C971.36 976.436 970.077 974.107 968.873 972.707C967.436 971.036 965.111 970.266 963.77 968.499C962.423 966.726 961.059 964.958 959.546 963.301C958.225 961.892 956.752 959.565 955.125 958.496C953.237 957.253 951.142 957.358 948.841 957.086C947.221 956.894 945.63 956.025 944.132 956.446C942.66 956.859 941.276 958.553 940.039 959.496C938.136 961.018 935.708 962.301 934.4 964.33C932.981 966.449 932.426 969.51 930.787 971.499C928.993 973.678 927.098 974.771 925.17 976.759C923.267 978.662 920.364 981.691 919.175 984.101C917.866 986.891 918.747 989.809 920.056 992.345C920.785 993.79 920.857 994.991 922.132 996.013C923.766 997.324 926.734 998.339 928.739 999.194C931.726 1000.41 934.888 1002.31 938.132 1002.93C941.992 1003.66 945.969 1003 949.911 1003C953.168 1002.93 956.391 1003.65 959.546 1003.09C962.385 1002.59 965.169 1000.85 967.873 999.828C969.893 999.028 972.885 998.079 974.632 996.879C976.485 995.606 978.061 994.05 979.102 992.092ZM932.032 996C929.032 994.8 926.132 993.2 924.732 990.6C923.632 988.6 923.732 986.3 924.832 984.1C925.832 982.2 927.432 980.6 929.032 979.1C932.132 976.1 935.132 972.8 937.632 969.3C938.732 967.7 939.932 965.9 941.532 964.7C943.632 963.2 946.232 962.5 948.932 962.8C952.532 963.2 955.532 965.3 957.932 967.7C961.532 971.4 964.132 975.8 968.232 979C969.932 980.4 972.032 981.5 973.232 983.3C974.732 985.5 974.732 988.1 973.532 990.4C971.832 993.4 968.432 995.2 964.932 996.5C960.132 998.2 955.032 998.9 949.832 999C943.732 999 937.532 998.1 932.032 996Z"
            ></path>
          </g>

          {/*КАРИЕС*/}
          <g
            className="header caries-filling hRoot hImplant hEmpty"
            style={{
              visibility:
                !tooth42Diagnozis.culttab &&
                !tooth42Diagnozis.abutment &&
                !tooth42Diagnozis.implant &&
                !tooth42Diagnozis.shaper &&
                !tooth42Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС C*/}
            <g
              id="s_header_14_5"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
              className="caries-filling"
            >
              <path
                className="st7"
                d="M960.8,980.3c0,1.9,0.4,3.7,1.4,5.3c1.7,2.5,10.8,10.2,15.3,13.8c1.7-1.5,3.1-3.2,4.1-5.4
                                c1.6-3.6,1.5-7.8-0.4-11.3c-1.6-2.8-4.3-4.7-6.6-6.9c-3.2-3-5.7-6.8-8.3-10.6c-1.2,2.6-3,6.7-4.1,9.1
                                C961.4,976.3,960.8,978.3,960.8,980.3z"
              />
              <path
                className={`st8 caries-right
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth42.caries_right ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth42.seal_right ? `seal-fill ${teethDiagnozis.tooth42.seal_right_color}` : ''}
                                `}
                d="M960.8,980.3c0,1.9,0.4,3.7,1.4,5.3c1.7,2.5,10.8,10.2,15.3,13.8c1.7-1.5,3.1-3.2,4.1-5.4
                                c1.6-3.6,1.5-7.8-0.4-11.3c-1.6-2.8-4.3-4.7-6.6-6.9c-3.2-3-5.7-6.8-8.3-10.6c-1.2,2.6-3,6.7-4.1,9.1
                                C961.4,976.3,960.8,978.3,960.8,980.3z"
              />
            </g>
            {/*КАРИЕС RIGHT*/}
            <g
              id="s_header_14_4"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'bottom');
              }}
            >
              <path
                className="st7"
                d="M931.2,965.4c2.7,4.2,8.4,13.2,8.5,16c6.1,0,15-0.6,21-1.1c0-2,0.6-4,1.4-5.9c1.1-2.5,2.9-6.5,4.1-9.1
                                c-1.7-2.6-3.4-5.1-5.3-7.5c-3.2-3.9-7-7.2-11.7-7.9c-3.5-0.5-6.9,0.5-9.6,3c-2.1,1.9-3.6,4.7-5.1,7.3
                                C933.5,961.9,932.4,963.7,931.2,965.4z"
              />
              <path
                className={`st8 caries-bottom
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth42.caries_bottom ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth42.seal_bottom ? `seal-fill ${teethDiagnozis.tooth42.seal_bottom_color}` : ''}
                                `}
                d="M931.2,965.4c2.7,4.2,8.4,13.2,8.5,16c6.1,0,15-0.6,21-1.1c0-2,0.6-4,1.4-5.9c1.1-2.5,2.9-6.5,4.1-9.1
                                c-1.7-2.6-3.4-5.1-5.3-7.5c-3.2-3.9-7-7.2-11.7-7.9c-3.5-0.5-6.9,0.5-9.6,3c-2.1,1.9-3.6,4.7-5.1,7.3
                                C933.5,961.9,932.4,963.7,931.2,965.4z"
              />
            </g>
            <g
              id="s_header_14_2"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st7"
                d="M918.1,993.8c1,2.3,2.5,4,4.3,5.5c5.9-5.7,16.1-15.7,17.2-17.3c0.1-0.1,0.1-0.4,0.1-0.6
                                c-0.1-2.8-5.8-11.8-8.5-16c-2.4,3.6-5.1,7-7.8,10.3c-2,2.4-4.2,4.9-5.3,7.9C916.8,986.9,916.7,990.6,918.1,993.8z"
              />
              <path
                className={`
                                    st8 target caries-left
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth42.caries_left ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth42.seal_left ? `seal-fill ${teethDiagnozis.tooth42.seal_left_color}` : ''}
                                `}
                d="M918.1,993.8c1,2.3,2.5,4,4.3,5.5c5.9-5.7,16.1-15.7,17.2-17.3c0.1-0.1,0.1-0.4,0.1-0.6
                                c-0.1-2.8-5.8-11.8-8.5-16c-2.4,3.6-5.1,7-7.8,10.3c-2,2.4-4.2,4.9-5.3,7.9C916.8,986.9,916.7,990.6,918.1,993.8z"
              />
            </g>
            {/*КАРИЕС C*/}
            <g
              id="s_header_14_1"
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st7"
                d="M922.4,999.3c1.6,1.3,3.4,2.3,5.2,3.2c7.2,3.4,15.2,4.9,23.2,4.9c6.7,0,13.4-1.2,19.6-3.8
                                c2.5-1.1,5-2.4,7-4.2c-4.4-3.7-13.6-11.3-15.3-13.8c-1.1-1.6-1.5-3.4-1.4-5.3c-6.1,0.5-14.9,1.1-21,1.1c0,0.3,0,0.5-0.1,0.6
                                C938.6,983.6,928.4,993.6,922.4,999.3z"
              />
              <path
                className={`
                                    st8 target caries-center
                                    ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                    ${teethDiagnozis.tooth42.caries_center ? 'caries-fill' : ''}
                                    ${teethDiagnozis.tooth42.seal_center ? `seal-fill ${teethDiagnozis.tooth42.seal_center_color}` : ''}
                                `}
                d="M922.4,999.3c1.6,1.3,3.4,2.3,5.2,3.2c7.2,3.4,15.2,4.9,23.2,4.9c6.7,0,13.4-1.2,19.6-3.8
                                c2.5-1.1,5-2.4,7-4.2c-4.4-3.7-13.6-11.3-15.3-13.8c-1.1-1.6-1.5-3.4-1.4-5.3c-6.1,0.5-14.9,1.1-21,1.1c0,0.3,0,0.5-0.1,0.6
                                C938.6,983.6,928.4,993.6,922.4,999.3z"
              />
            </g>
            <g className="with up">
              {/* Черточка лево верх */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth42Diagnozis.seal_left &&
                      !tooth42Diagnozis.seal_top &&
                      !tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_left &&
                      !tooth42Diagnozis.seal_top &&
                      !tooth42Diagnozis.seal_center) ||
                    (!tooth42Diagnozis.seal_left &&
                      tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M940 981.5C937.167 985.167 930.3 993.3 925.5 996.5"
              />
              {/* Черточка лево низ */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth42Diagnozis.seal_left &&
                      !tooth42Diagnozis.seal_bottom) ||
                    (!tooth42Diagnozis.seal_left &&
                      tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center) ||
                    (!tooth42Diagnozis.seal_left &&
                      tooth42Diagnozis.seal_bottom &&
                      tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M940 981.5C939.667 979.667 938 974.8 934 970"
              />
              {/* Черточка середина */}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center) ||
                    (!tooth42Diagnozis.seal_bottom &&
                      tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M940 981.5C943 982.167 951.3 982.9 960.5 980.5"
              />
              {/*Черточка право верх*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth42Diagnozis.seal_right &&
                      !tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center) ||
                    (!tooth42Diagnozis.seal_right &&
                      tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_right &&
                      !tooth42Diagnozis.seal_bottom &&
                      tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_center &&
                      tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_right)
                      ? 5
                      : 0,
                }}
                d="M960.5 980.5C961.333 979.5 963.2 976 964 970"
              />
              {/*Черточка право низ*/}
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth42Diagnozis.seal_right &&
                      tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_right &&
                      !tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M960.5 980.5C961.167 983.167 964.6 989.9 973 995.5"
              />
            </g>
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
              id="dentin_v_42"
              style={{
                visibility:
                  !tooth42Diagnozis.implant &&
                  !tooth42Diagnozis.apex &&
                  !tooth42Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_v_42"
                className={`st9 change-color ${tooth42Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M975.2,1172.7c0,5.2-0.1,10.4-0.3,15.6c-0.7,18.5-2.5,37.1-4.5,55.6
                                c-2.1,19.9-4.5,39.7-7.2,59.5c-2.1,15.4-4.5,30.8-8.9,45.6c-1.7,5.7-4.6,10.8-7.9,14.4c-0.1,0.1-0.3,0.3-0.4,0.4
                                c0.1-0.1,0.3-0.3,0.4-0.4c3.3-3.5,6.2-8.7,7.9-14.4c4.4-14.8,6.8-30.2,8.9-45.6c2.7-19.8,5.1-39.6,7.2-59.5
                                c1.7-15.4,3.2-30.9,4-46.3c-0.4,1.4-0.8,2.8-1.2,4.1c-3,9.4-6.9,19-15.3,23.9c-1.4,0.8-2.9,1.5-4.4,1.9c-3.6,1.1-7.4,1.3-11.1,0.4
                                c-2.3-0.5-4.5-1.5-6.5-2.8c-4.9-3.2-8.1-8.1-10.4-13.5c-0.1-6.9-0.2-13.8,0.1-20.7c0.2-5.1,0.6-10.1,1.1-15.2
                                c0.9-8.7,2.3-17.4,4.1-26l0.9-1.5l1.6-1.4l37.9-0.1l1.8,1l1.4,2.5C974.8,1157.8,975.2,1165.2,975.2,1172.7z"
              />
            </g>
            <g
              id="dentin_n_42"
              style={{
                visibility:
                  !tooth42Diagnozis.implant &&
                  !tooth42Diagnozis.abutment &&
                  !tooth42Diagnozis.shaper
                    ? 'inherit'
                    : 'hidden',
              }}
            >
              <path
                id="dentin_n_42"
                className={`st10 change-color ${tooth42Diagnozis.change_color ? 'diagnoze' : ''}`}
                d="M974.4,1197.5c-0.9,15.4-2.4,30.9-4,46.3c-2.1,19.9-4.6,39.7-7.2,59.5
                                c-2.1,15.4-4.5,30.8-8.9,45.6c-1.7,5.7-4.6,10.8-7.9,14.4c-2.1,2.2-4.4,3.7-6.9,3.9c0,0-0.1,0-0.1,0c-1,0.1-1.9,0-3-0.4
                                c-2.8-0.9-4.2-3.1-5.3-5.7c-1.8-4.5-2.7-10-2.9-15.3c-0.3-6.7-0.4-13.3-0.7-20c-0.4-8.3-1-16.6-1.4-24.9c-0.5-11-0.7-22-0.6-33
                                c0.1-10.3,0.4-20.7,0.4-31c-0.1-8.5-0.4-16.9-0.6-25.3c2.3,5.4,5.5,10.3,10.5,13.6c2,1.3,4.2,2.2,6.5,2.8
                                c3.6,0.9,7.5,0.7,11.1-0.4c1.5-0.5,3-1.1,4.4-1.9c8.4-4.9,12.4-14.5,15.3-23.9C973.6,1200.3,974,1198.9,974.4,1197.5z"
              />
            </g>
          </g>
          {/*PULPIT/CHANNEL NOT SEALED/PART SALED*/}
          <g className="pulp">
            <g>
              <path
                className={`st22 target top ${tooth42Diagnozis.channel_class} ${tooth42Diagnozis.channel_class} ${tooth42Diagnozis.pulpit ? 'pulpit' : ''} ${tooth42Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M958.4,1196.3c-0.7,6.6-1.9,13-3,19.5c-0.7,3.9-1.3,7.8-2,11.7c0,0,0,0,0,0
                                c-0.3,0.1-0.5,0.2-0.8,0.2c-0.5,0.1-0.9,0.2-1.4,0.3c-0.1,0-0.3,0.1-0.4,0.1c-0.5,0.1-0.9,0.1-1.4,0.2c-0.2,0-0.4,0.1-0.7,0.1
                                c-0.1,0-0.2,0-0.3,0c-0.5,0-0.9,0.1-1.4,0.1h-0.1c-0.3,0-0.6,0-0.9,0c-0.1,0-0.3,0-0.4,0c-0.3,0-0.5,0-0.8-0.1
                                c-0.2,0-0.4,0-0.6-0.1c-0.1,0-0.2,0-0.3,0c-0.4-0.1-0.9-0.1-1.3-0.2c-0.1,0-0.2-0.1-0.4-0.1c0-4.1-0.1-8.2-0.3-12.3
                                c-0.2-4.5-0.5-9-0.6-13.5c0-4.8,0.2-9.7,0.7-14.5c0.4-4,0.9-8.1,1.5-12.1l1-1.8l13,0.2l1.2,2
                                C959.3,1182.7,959.1,1189.5,958.4,1196.3z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth42Diagnozis.channel_class} ${tooth42Diagnozis.channel_class} ${tooth42Diagnozis.pulpit ? 'pulpit' : ''} ${tooth42Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M941,1297.7c1.1,0.2,2.2,0.2,3.2,0.2c0.6,0,1.2,0,1.8-0.1
                                c0.2-2.6,0.4-5.2,0.6-7.8c1-13.4,2.1-26.7,3.8-40c0.9-7.5,2-15,3.2-22.5c0,0,0,0,0,0c0,0,0,0,0,0c-0.5,0.2-1,0.3-1.5,0.4
                                c-0.3,0.1-0.6,0.1-0.9,0.2c-0.8,0.1-1.5,0.2-2.3,0.3c-0.1,0-0.1,0-0.2,0c-0.5,0-0.9,0-1.4,0H947c-0.3,0-0.6,0-0.8,0
                                c-0.2,0-0.3,0-0.5,0c-0.2,0-0.5-0.1-0.7-0.1c-0.2,0-0.5-0.1-0.7-0.1h-0.1c-0.5-0.1-1-0.2-1.4-0.3c-0.1,0-0.2-0.1-0.4-0.1
                                c0,0,0,0,0,0c0,4.8,0,9.6-0.1,14.5c-0.2,15.7-0.7,31.5-1.1,47.2C941.1,1292.3,941,1295,941,1297.7z"
              />
            </g>
            <g>
              <path
                className={`st22 target top ${tooth42Diagnozis.channel_class} ${tooth42Diagnozis.channel_class} ${tooth42Diagnozis.pulpit ? 'pulpit' : ''} ${tooth42Diagnozis.periodontit ? 'periodontit' : ''}`}
                d="M939.4,1367.2L939.4,1367.2c1.7-13.7,3.2-27.5,4.3-41.3
                                c0.8-9.4,1.5-18.8,2.2-28.2c-0.6,0.1-1.2,0.1-1.8,0.1c-1,0-2.1,0-3.2-0.2c-0.3,10.9-0.6,21.8-0.9,32.7
                                c-0.3,12.3-0.6,24.6-0.8,36.8c0,0.4,0,0.7,0,1.1C939.3,1367.9,939.4,1367.6,939.4,1367.2z"
              />
            </g>
            <PeriodontitStage42 />
          </g>
          {/* PIN */}
          <g
            className="pin"
            style={{
              visibility: 'inherit',
              opacity: tooth42Diagnozis.pin ? 1 : 0,
            }}
          >
            <path
              className="st56"
              d="M925.399 1211.6C927.799 1217 930.899 1222 935.899 1225.2C937.699 1226.3 939.599 1227.2 941.499 1227.7C941.799 1227.8 942.099 1227.9 942.399 1227.9C945.999 1228.8 949.899 1228.6 953.499 1227.5C953.599 1227.5 953.699 1227.4 953.799 1227.4C955.199 1226.9 956.599 1226.3 957.899 1225.6C966.299 1220.7 970.299 1211.1 973.199 1201.7C973.599 1200.3 973.999 1198.9 974.399 1197.6C974.599 1194.5 974.699 1191.4 974.899 1188.3C975.099 1183.1 975.199 1177.9 975.199 1172.7C975.199 1165.2 974.899 1157.8 974.199 1150.3L972.799 1147.8L971.099 1146.8L933.199 1146.9L931.599 1148.3L930.699 1149.8C928.899 1158.4 927.499 1167.1 926.599 1175.8C926.099 1180.8 925.699 1185.9 925.499 1191C925.199 1197.8 925.299 1204.7 925.399 1211.6Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st57"
              style={{ fill: tooth42Diagnozis.pin ? '#dbd9d3' : 'none' }}
              d="M962.2 1146.9L953.9 1227.4H953.8C953.7 1227.4 953.6 1227.5 953.5 1227.5C953.6 1227.5 953.7 1227.4 953.8 1227.4L947.8 1286.2L947.5 1289.2L945.1 1312.6C945 1313.7 944.1 1314.5 943 1314.5C941.8 1314.5 940.9 1313.6 940.9 1312.4L941.1 1284.2V1284.1L941.6 1227.8L942.3 1147L962.2 1146.9Z"
            ></path>
          </g>
          {/* CULTTAB */}
          <g
            className="stump"
            style={{
              visibility: !tooth42Diagnozis.culttab ? 'hidden' : 'inherit',
              opacity: !tooth42Diagnozis.culttab ? 0 : 1,
            }}
          >
            <path
              className="st14"
              d="M943,1314.5L943,1314.5c1.1,0,2-0.8,2.1-1.9l8.7-85.2c-0.1,0-0.2,0.1-0.3,0.1c-3.6,1.1-7.4,1.3-11.1,0.4
                            c-0.3-0.1-0.6-0.1-0.9-0.2l-0.6,84.7C940.9,1313.5,941.8,1314.5,943,1314.5z"
            />
            <path
              className="st15"
              d="M925.4,1211.6c2.4,5.4,5.5,10.4,10.5,13.6c1.8,1.1,3.7,2,5.6,2.5c0.3,0.1,0.6,0.2,0.9,0.2
                            c3.6,0.9,7.5,0.7,11.1-0.4c0.1,0,0.2-0.1,0.3-0.1c1.4-0.5,2.8-1.1,4.1-1.8c8.4-4.9,12.4-14.5,15.3-23.9c0.4-1.4,0.8-2.8,1.2-4.1
                            c0.2-3.1,0.3-6.2,0.5-9.3c0.2-5.2,0.3-10.4,0.3-15.6c0-7.5-0.3-14.9-1-22.4l-1.4-2.5l-1.7-1l-37.9,0.1l-1.6,1.4l-0.9,1.5
                            c-1.8,8.6-3.2,17.3-4.1,26c-0.5,5-0.9,10.1-1.1,15.2C925.2,1197.8,925.3,1204.7,925.4,1211.6z"
            />
          </g>
          {/* ABUTMENT */}
          <g
            className="abutment"
            style={{
              visibility: tooth42Diagnozis.abutment ? 'inherit' : 'hidden',
              opacity: tooth42Diagnozis.abutment ? 1 : 0,
            }}
          >
            <path
              className="st16"
              d="M974.4,1197.5l-17.9,40.2l-19.2-1.2l-11.9-24.9c2.3,5.4,5.5,10.3,10.5,13.6c6.7,4.3,15.1,4.4,22,0.4
                            c8.4-4.9,12.4-14.5,15.3-23.9C973.6,1200.3,974,1198.9,974.4,1197.5z"
            />
            <path
              className="st17"
              d="M975.2,1172.7c0,5.2-0.1,10.4-0.3,15.6c-0.1,3.1-0.3,6.1-0.5,9.2c-0.4,1.4-0.8,2.8-1.3,4.2
                            c-2.9,9.4-6.9,19-15.3,23.9c-6.9,4-15.3,3.9-22-0.4c-5-3.2-8.1-8.2-10.5-13.6c-0.2-6.9-0.2-13.7,0.1-20.6
                            c0.2-5.1,0.6-10.1,1.1-15.2c0.9-8.7,2.3-17.4,4.1-26l0.9-1.5l1.6-1.4l37.9-0.1l1.7,1l1.4,2.5
                            C974.8,1157.8,975.2,1165.2,975.2,1172.7z"
            />
          </g>
          {/* ФОРМУВАЧ */}
          <g className="shaper" style={{ visibility: 'hidden', opacity: 0 }}>
            <path
              className="st44"
              d="M931.222 1196.47C931.063 1194.1 932.99 1192.12 935.363 1192.21L961.236 1193.18C963.609 1193.27 965.382 1195.39 965.047 1197.74L959.45 1236.97C959.159 1239 957.373 1240.49 955.318 1240.4L937.697 1239.64C935.66 1239.55 934.014 1237.95 933.878 1235.91L931.222 1196.47Z"
            ></path>
          </g>
          {/* IMPLANT/CULTTAB */}
          <g
            className="implant"
            style={{
              visibility:
                tooth42Diagnozis.abutment ||
                tooth42Diagnozis.implant ||
                tooth42Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st18"
              d="M929.3,1236.5c0,0-1.5,49.5-1.8,57.5s-0.5,60.5-0.5,60.5s4.1,6.2,11.8,7c7.8,0.8,11.2-7.2,11.2-7.2
                            s8.6-73.4,9.4-77.6c0.8-4.3,4.1-38.9,4.1-38.9L929.3,1236.5z"
            />
            <line
              className="st19"
              x1="925.9"
              y1="1246.3"
              x2="965"
              y2="1254.3"
            />
            <line
              className="st19"
              x1="923.9"
              y1="1269.3"
              x2="963"
              y2="1277.3"
            />
            <line
              className="st19"
              x1="921.9"
              y1="1293.3"
              x2="961"
              y2="1301.3"
            />
            <line
              className="st19"
              x1="920.8"
              y1="1316.8"
              x2="960.1"
              y2="1323.8"
            />
            <line
              className="st19"
              x1="918.8"
              y1="1339.8"
              x2="958.1"
              y2="1346.8"
            />
          </g>
          <g
            className="toutline"
            style={{
              visibility:
                !tooth42Diagnozis.culttab &&
                !tooth42Diagnozis.abutment &&
                !tooth42Diagnozis.implant &&
                !tooth42Diagnozis.shaper &&
                !tooth42Diagnozis.apex
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st46"
              d="M981.8,1129c0.4-2.1-0.6-4.3-2.5-5.3c-0.8-0.4-1.6-0.6-2.5-0.6l-9-0.1l-28.2-0.2
                            l-17.6-0.2c-1.5,0.4-2.8,1.3-3.8,2.6c-1.1,1.4-1.6,3.2-1.5,4.9c-1,17.5-0.3,35.1,1.8,52.5c0.7,5.5,1.5,11.1,2.8,16.5
                            c1,3.9,2.2,7.8,3.7,11.5c2.4,5.7,5.6,11,10.8,14.4c6.7,4.3,15.1,4.4,22,0.4c8.1-4.7,12.1-13.7,15-22.8c0.1-0.4,0.2-0.7,0.4-1.1
                            c3.6-11.6,6.2-23.5,7.7-35.6C982.3,1153.8,982.6,1141.4,981.8,1129z"
            />
          </g>
          {/*КЛИНОВИДНИЙ ЕФЕКТ/ПРИШИЙКОВА ПЛОМБА/ПРИШИЙКОВИЙ КАРІЄС*/}
          <g
            className="wedge-shaped"
            style={{
              visibility:
                !tooth42Diagnozis.culttab && !tooth42Diagnozis.abutment
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            <path
              className="st7 st59"
              d="M918.435 1125.3C917.335 1126.7 916.835 1128.4 916.935 1130.2C916.035 1147.7 916.635 1165.3 918.835 1182.9C919.435 1188.4 920.335 1194 921.635 1199.4C922.635 1203.3 923.835 1207.2 925.335 1210.9C927.735 1216.6 930.935 1221.9 936.135 1225.3C942.835 1229.6 951.235 1229.7 958.135 1225.7C966.235 1221 970.235 1212 973.135 1202.9C973.185 1202.7 973.235 1202.53 973.285 1202.35C973.335 1202.18 973.385 1202 973.435 1201.8C977.035 1190.2 979.635 1178.3 981.135 1166.2C982.635 1153.9 982.935 1141.5 982.035 1129.1C982.435 1127 981.435 1124.8 979.535 1123.8C978.735 1123.3 977.935 1123.1 977.035 1123.2L968.035 1123.1L939.835 1122.9L922.235 1122.7C920.735 1123.1 919.435 1124 918.435 1125.3ZM968.047 1202.06C968.086 1201.94 968.125 1201.81 968.163 1201.67C969.056 1198.98 969.869 1196.28 970.6 1193.55C970.931 1192.31 970.011 1191.1 968.731 1191.07L928.573 1190.06C927.342 1190.03 926.374 1191.11 926.569 1192.32C926.979 1194.88 927.496 1197.44 928.14 1199.94C928.913 1202.75 929.84 1205.56 930.999 1208.23C932.853 1212.34 935.326 1216.16 939.344 1218.61C944.52 1221.71 951.011 1221.78 956.342 1218.9C962.6 1215.51 965.691 1209.02 967.931 1202.46C967.97 1202.31 968.009 1202.19 968.047 1202.06Z"
            ></path>
            <path
              className={`st7 ${tooth42Diagnozis?.cervical_caries ? 'cervical-caries' : ''}`}
              d="M967.943 1201.67C967.865 1201.95 967.788 1202.17 967.711 1202.46C965.47 1209.02 962.38 1215.51 956.121 1218.9C950.79 1221.78 944.3 1221.71 939.123 1218.61C935.105 1216.16 932.633 1212.34 930.778 1208.23C929.619 1205.56 928.692 1202.75 927.92 1199.94C927.275 1197.44 926.758 1194.88 926.348 1192.32C926.153 1191.11 927.121 1190.03 928.353 1190.06L968.51 1191.07C969.79 1191.1 970.711 1192.31 970.379 1193.55C969.648 1196.28 968.835 1198.98 967.943 1201.67Z"
            />
            <path
              className={`st60
                                    ${tooth42Diagnozis?.wedge_shaped_defect ? `shaped-defect-stroke` : ''}
                                    ${tooth42Diagnozis?.seal_cervical ? `seal-cervical-stroke` : ''}
                                    ${tooth42Diagnozis.seal_cervical_color}
                                `}
              d="M967.943 1201.67C967.865 1201.95 967.788 1202.17 967.711 1202.46C965.47 1209.02 962.38 1215.51 956.121 1218.9C950.79 1221.78 944.3 1221.71 939.123 1218.61C935.105 1216.16 932.633 1212.34 930.778 
                            1208.23C929.619 1205.56 928.692 1202.75 927.92 1199.94C927.275 1197.44 926.758 1194.88 926.348 1192.32C926.153 1191.11 927.121 1190.03 928.353 1190.06L968.51 1191.07C969.79 1191.1 970.711 1192.31 970.379 1193.55C969.648 1196.28 968.835 1198.98 967.943 1201.67Z"
            />
          </g>
          {/* TARTAR */}
          <g
            className="tartar"
            style={{
              visibility: 'inherit',
              opacity: teethDiagnozis.tooth42.tartar ? 1 : 0,
            }}
          >
            <path
              className="st61 level2"
              d="M977.5 1184L975 1187.5L973.5 1190.5V1192L972 1193.5V1195.5L970 1200.5V1203.5L967.5 1206.5L965.5 1211L965 1213.5L963.5 1216L962.5 1217L960 1219L958.5 1219.5L957.5 1220.5L953 1223L950 1224L948.5 1223H945.5L941.5 1222L938.5 1220.5H936L934.5 1219L931.5 1217L930 1213.5L928 1209L926.5 1206.5V1204.5L925 1203.5L924 1200.5L924.5 1199L924 1197.5V1195L922 1191L921.5 1188.5L921 1186.5L919 1183.5L918.5 1185V1186.5L919 1188.5V1189.5V1192L919.5 1193.5L920.5 1196.5V1198V1200.5L921 1201.5L922 1203.5V1205V1207.5L923.5 1209V1211V1212.5L924 1214V1217L923.5 1218L924 1223.5L925 1228V1231.5V1235L926 1238L925.5 1241L926.5 1243.5L932.5 1246.5L938.5 1247.5L943.5 1248.5L947.5 1250L953 1248.5H957.5L962 1247.5L966.5 1244.5L969 1243.5L971 1241L971.5 1238V1235L972.5 1231.5V1229V1227L973 1225L973.5 1223L973 1221.5V1219L973.5 1217L972.5 1214.5L973.5 1212.5V1207.5L975 1205V1200.5L976.5 1198L977.5 1194.5L977 1192L978.5 1188L977.5 1184Z"
            ></path>
            <path
              className="st61 level1"
              d="M977.5 1184L975 1187.5L973.5 1190.5V1192L972 1193.5V1195.5L970 1200.5V1203.5L967.5 1206.5L965.5 1211L965 1213.5L963.5 1216L962.5 1217L960 1219L958.5 1219.5L957.5 1220.5L953 1223L950 1224L948.5 1223H945.5L941.5 1222L938.5 1220.5H936L934.5 1219L931.5 1217L930 1213.5L928 1209L926.5 1206.5V1204.5L925 1203.5L924 1200.5L924.5 1199L924 1197.5V1195L922 1191L921.5 1188.5L921 1186.5L919 1183.5V1186.5L919.5 1189.5V1192L920.5 1194.5L921 1197L921.5 1200.5L923 1203.5V1206.5L924 1209V1212.5L924.5 1214.5V1216L926 1219.5L928 1221L930.5 1222.5L932.5 1225L936 1226L938.5 1226.5L940.5 1228L943.5 1229L945.5 1230L948.5 1229H951.5L954.5 1228L957.5 1227L962.5 1225.5L963.5 1224L966.5 1222H969L970.5 1220L972 1217V1214.5L973 1212.5L972.5 1211.5L973 1210V1208.5L974 1206L974.5 1203.5V1201.5L975 1199.5L976.5 1197L977 1194V1191.5L977.5 1189.5L978 1187.5L977.5 1184Z"
            ></path>
          </g>
          {/*КАРИЕС*/}
          <g
            className="header caries-filling"
            style={{
              visibility:
                !tooth42Diagnozis.culttab &&
                !tooth42Diagnozis.abutment &&
                !tooth42Diagnozis.implant &&
                !tooth42Diagnozis.shaper
                  ? 'inherit'
                  : 'hidden',
            }}
          >
            {/*КАРИЕС R*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'right');
              }}
            >
              <path
                className="st58"
                d="M968.4,1196.8c0.6,1.3,2.8,4,4.4,5.9c0.1-0.4,0.2-0.7,0.4-1.1c3.6-11.6,6.2-23.5,7.7-35.6
                                c1.5-12.3,1.8-24.7,0.9-37.1c0.4-2.1-0.6-4.3-2.5-5.3c-0.8-0.4-1.6-0.6-2.5-0.6l-9-0.1c-0.2,9.7-0.6,30.9-0.9,41
                                C966.6,1177.3,966.8,1193.3,968.4,1196.8z"
              />
              <path
                className={`
                                st8 target caries-right 
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth42.caries_right ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth42.seal_right ? `seal-fill ${teethDiagnozis.tooth42.seal_right_color}` : ''}
                            `}
                d="M968.4,1196.8c0.6,1.3,2.8,4,4.4,5.9c0.1-0.4,0.2-0.7,0.4-1.1c3.6-11.6,6.2-23.5,7.7-35.6
                                c1.5-12.3,1.8-24.7,0.9-37.1c0.4-2.1-0.6-4.3-2.5-5.3c-0.8-0.4-1.6-0.6-2.5-0.6l-9-0.1c-0.2,9.7-0.6,30.9-0.9,41
                                C966.6,1177.3,966.8,1193.3,968.4,1196.8z"
              />
            </g>
            {/*КАРИЕС L*/}
            <g
              className="caries-filling"
              onClick={() => {
                setColordedPart(diagnozis, 'left');
              }}
            >
              <path
                className="st58"
                d="M918.5,1182.7c0.7,5.5,1.5,11.1,2.8,16.5c5.7-4.2,8.5-8.8,9.3-11.1c0.8-2.6,3.1-10.3,5.6-31.3
                                c1.8-14.4,2.9-27.3,3.4-34l-17.6-0.2c-1.5,0.4-2.8,1.3-3.8,2.6c-1.1,1.4-1.6,3.2-1.5,4.9C915.8,1147.7,916.4,1165.3,918.5,1182.7z"
              />
              <path
                className={`st8 caries-left
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth42.caries_left ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth42.seal_left ? `seal-fill ${teethDiagnozis.tooth42.seal_left_color}` : ''}
                            `}
                d="M918.5,1182.7c0.7,5.5,1.5,11.1,2.8,16.5c5.7-4.2,8.5-8.8,9.3-11.1c0.8-2.6,3.1-10.3,5.6-31.3
                                c1.8-14.4,2.9-27.3,3.4-34l-17.6-0.2c-1.5,0.4-2.8,1.3-3.8,2.6c-1.1,1.4-1.6,3.2-1.5,4.9C915.8,1147.7,916.4,1165.3,918.5,1182.7z"
              />
            </g>
            {/* КАРИЕС C */}
            <g
              className="caries-filling hoho1"
              onClick={() => {
                setColordedPart(diagnozis, 'center');
              }}
            >
              <path
                className="st58"
                d="M921.4,1199.2c1,3.9,2.2,7.8,3.7,11.5c2.4,5.7,5.6,11,10.8,14.4c6.7,4.3,15.1,4.4,22,0.4
                                c8.1-4.7,12.1-13.7,15-22.8c-1.6-1.9-3.8-4.6-4.4-5.9c-1.6-3.5-1.8-19.5-1.5-32.8c0.2-10,0.7-31.3,0.9-41l-28.2-0.2
                                c-0.5,6.6-1.6,19.5-3.4,34c-2.6,21-4.8,28.7-5.6,31.3C929.9,1190.5,927,1195,921.4,1199.2z"
              />
              <path
                className={`st8 caries-center
                                ${['caries', 'seal'].includes(diagnozis) ? 'caries-stroke' : ''}
                                ${teethDiagnozis.tooth42.caries_center ? 'caries-fill' : ''}
                                ${teethDiagnozis.tooth42.seal_center ? `seal-fill ${teethDiagnozis.tooth42.seal_center_color}` : ''}
                            `}
                d="M921.4,1199.2c1,3.9,2.2,7.8,3.7,11.5c2.4,5.7,5.6,11,10.8,14.4c6.7,4.3,15.1,4.4,22,0.4
                                c8.1-4.7,12.1-13.7,15-22.8c-1.6-1.9-3.8-4.6-4.4-5.9c-1.6-3.5-1.8-19.5-1.5-32.8c0.2-10,0.7-31.3,0.9-41l-28.2-0.2
                                c-0.5,6.6-1.6,19.5-3.4,34c-2.6,21-4.8,28.7-5.6,31.3C929.9,1190.5,927,1195,921.4,1199.2z"
              />
            </g>
            <g className="with down">
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth42Diagnozis.seal_left &&
                      !tooth42Diagnozis.seal_top &&
                      !tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_left &&
                      tooth42Diagnozis.seal_top &&
                      !tooth42Diagnozis.seal_center) ||
                    (!tooth42Diagnozis.seal_left &&
                      tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M935.5 1162.5C936.5 1157.17 938.6 1142.4 939 1128"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth42Diagnozis.seal_left &&
                      !tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center &&
                      tooth42Diagnozis.seal_left) ||
                    (!tooth42Diagnozis.seal_left &&
                      !tooth42Diagnozis.seal_bottom &&
                      tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M935.5 1162.5C932 1181.5 932 1186.6 926 1195"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (!tooth42Diagnozis.seal_right &&
                      tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_right &&
                      !tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M967 1164.5C967 1181.5 965.5 1192 969 1198"
              />
              <path
                className="st54"
                style={{
                  stroke: 'rgb(81, 79, 72)',
                  strokeWidth:
                    (tooth42Diagnozis.seal_right &&
                      !tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center) ||
                    (tooth42Diagnozis.seal_bottom &&
                      !tooth42Diagnozis.seal_center &&
                      tooth42Diagnozis.seal_right) ||
                    (!tooth42Diagnozis.seal_right &&
                      !tooth42Diagnozis.seal_bottom &&
                      tooth42Diagnozis.seal_center)
                      ? 5
                      : 0,
                }}
                d="M967 1164.5L968.5 1128.5"
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
                visibility: tooth42Diagnozis.vinir ? 'inherit' : 'hidden',
                opacity: tooth42Diagnozis.vinir ? 1 : 0,
              }}
            >
              <path
                className="st55"
                d="M981.8 1129C982.2 1126.9 981.2 1124.7 979.3 1123.7C978.5 1123.3 977.7 1123.1 976.8 1123.1L967.8 1123L939.6 1122.8L922 1122.6C920.5 1123 919.2 1123.9 918.2 1125.2C917.1 1126.6 916.6 1128.4 916.7 1130.1C915.7 1147.6 916.4 1165.2 918.5 1182.6C919.2 1188.1 920 1193.7 921.3 1199.1C922.3 1203 923.5 1206.9 925 1210.6C927.4 1216.3 930.6 1221.6 935.8 1225C942.5 1229.3 950.9 1229.4 957.8 1225.4C965.9 1220.7 969.9 1211.7 972.8 1202.6C972.9 1202.2 973 1201.9 973.2 1201.5C976.8 1189.9 979.4 1178 980.9 1165.9C982.3 1153.8 982.6 1141.4 981.8 1129Z"
              ></path>
            </g>
          </g>
          {/* ТИМЧАСОВА КОРОНКА/КЕРАМІЧНА КОРОНКА */}
          <g
            className="crown"
            style={{
              visibility:
                tooth42Diagnozis.temporary_crown ||
                tooth42Diagnozis.ceramic_crown ||
                tooth42Diagnozis.mceramic_crown ||
                tooth42Diagnozis.metalic_crown ||
                tooth42Diagnozis.zirconia_crown
                  ? 'inherit'
                  : 'hidden',
              opacity:
                tooth42Diagnozis.temporary_crown ||
                tooth42Diagnozis.ceramic_crown ||
                tooth42Diagnozis.mceramic_crown ||
                tooth42Diagnozis.metalic_crown ||
                tooth42Diagnozis.zirconia_crown
                  ? 1
                  : 0,
            }}
          >
            <path
              className={`st46 target temporary-crown crown-fill ${diagnozis}
                                ${tooth42Diagnozis.ceramic_crown_color}
                                ${tooth42Diagnozis.mceramic_crown_color}
                                ${tooth42Diagnozis.metalic_crown_color}
                                ${tooth42Diagnozis.zirconia_crown_color}
                            `}
              d="M981.8,1129c0.4-2.1-0.6-4.3-2.5-5.3c-0.8-0.4-1.6-0.6-2.5-0.6l-9-0.1l-28.2-0.2
                            l-17.6-0.2c-1.5,0.4-2.8,1.3-3.8,2.6c-1.1,1.4-1.6,3.2-1.5,4.9c-1,17.5-0.3,35.1,1.8,52.5c0.7,5.5,1.5,11.1,2.8,16.5
                            c1,3.9,2.2,7.8,3.7,11.5c2.4,5.7,5.6,11,10.8,14.4c6.7,4.3,15.1,4.4,22,0.4c8.1-4.7,12.1-13.7,15-22.8c0.1-0.4,0.2-0.7,0.4-1.1
                            c3.6-11.6,6.2-23.5,7.7-35.6C982.3,1153.8,982.6,1141.4,981.8,1129z"
            />
          </g>
        </g>
      </g>
    </>
  );
}
