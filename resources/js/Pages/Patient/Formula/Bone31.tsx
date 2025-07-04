import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setChangeDia,
  setSelectedToothNumber,
  setToothDiagnoze,
} from '../../../Redux/Formula';
import {
  allTeethAdultSelector,
  getCeramicCrownColorSelector,
  getCeramicMCrownColorSelector,
  getDiagnosisSelector,
  getMetalicCrownColorSelector,
  getSealServicalColorSelector,
  getSubDiagnosisSelector,
  getTeethDiagnozisSelector,
  getVinirColorSelector,
  getZirconiaCrownColorSelector,
} from '../../../Redux/Formula/selectors';
import setupDiagnoze from '../../../lib/tFunctions';
import { excludeToothEffect } from '../../../Constants';

export default function Bone31() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth31Diagnozis = teethDiagnozis.tooth31;
  const wsDefectColor = useSelector(getSealServicalColorSelector);
  const vinirColor = useSelector(getVinirColorSelector);
  const ceramicCrownColor = useSelector(getCeramicCrownColorSelector);
  const mceramicCrownColor = useSelector(getCeramicMCrownColorSelector);
  const metalicCrownColor = useSelector(getMetalicCrownColorSelector);
  const zirconiaCrownColor = useSelector(getZirconiaCrownColorSelector);
  const allTeeth = useSelector(allTeethAdultSelector);

  return (
    <g
      className="df-bone top"
      style={{ opacity: 1, transition: 'opacity 0.2s' }}
      onMouseOver={() => {
        !teethDiagnozis.tooth31.active &&
        !allTeeth &&
        document.getElementById('31').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth31.active &&
        !allTeeth &&
        document.getElementById('31').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(31));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              31,
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
        }
      }}
    >
      <g
        style={{ opacity: tooth31Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M1048.9,1218.5l0.7,298c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.1-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-2.1-48.9-4-101.8-5.8-151c-0.6-0.2-1.2-0.3-1.9-0.2
                c-2.3,0.1-4.1,1.7-5.7,3.2c-7,6.5-15.2,12.6-25.3,13.8c-10.2,1.1-20-2.9-26.4-9.8c-1.5-1.6-2.9-3.5-4.9-4.7
                C1049.7,1218.9,1049.3,1218.7,1048.9,1218.5z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1114.4,1216.9c-0.6-0.2-1.2-0.3-1.9-0.2c-2.3,0.1-4.1,1.7-5.7,3.2
                c-7,6.5-15.2,12.6-25.3,13.8c-10.2,1.1-20-2.9-26.4-9.8c-1.5-1.6-2.9-3.5-4.9-4.7c-0.4-0.2-0.8-0.4-1.2-0.6"
          style={{ strokeWidth: tooth31Diagnozis.inflamed_gums ? 5 :
              tooth31Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth31Diagnozis.parodontit &&
              tooth31Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1048.9,1246.7l0.6,269.8c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.2-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-1.6-39.2-3.2-80.9-4.7-121.2c-0.5-0.2-0.9-0.3-1.4-0.3
                c-5.7,0-11.8,17.4-33.7,16.6C1059.5,1262.1,1056,1248.8,1048.9,1246.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M1115.5,1246.7c-0.5-0.2-0.9-0.3-1.4-0.3c-5.7,0-11.8,17.4-33.7,16.6
                c-20.9-0.8-24.4-14.2-31.5-16.3"
          style={{ strokeWidth: tooth31Diagnozis.inflamed_gums ? 5 :
              tooth31Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth31Diagnozis.parodontit &&
              tooth31Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1049,1275.8l0.6,240.8c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.2-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-1.2-29.5-2.4-60.5-3.6-91.3c-0.5-0.2-0.9-0.3-1.4-0.3
                c-5.8,0.1-10.7,14.7-32.6,14.4C1060.2,1290.3,1055.3,1278.4,1049,1275.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M1116.6,1276.6c-0.5-0.2-0.9-0.3-1.4-0.3c-5.8,0.1-10.7,14.7-32.6,14.4
                c-22.4-0.4-27.3-12.4-33.6-14.9"
          style={{ strokeWidth: tooth31Diagnozis.inflamed_gums ? 5 :
              tooth31Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth31Diagnozis.parodontit &&
              tooth31Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1049.1,1307.5l0.5,209c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.2-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-0.8-20.3-1.7-41.2-2.5-62.3c-0.5-0.3-1-0.4-1.4-0.4
                c-4.9,0.2-10.5,18.5-34.1,17.5C1058.7,1321.6,1055.3,1309.7,1049.1,1307.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M1117.7,1305.6c-0.5-0.3-1-0.4-1.4-0.4c-4.9,0.2-10.5,18.5-34.1,17.5
                c-23.6-1.1-26.9-13-33.1-15.1"
          style={{ strokeWidth: tooth31Diagnozis.inflamed_gums ? 5 :
              tooth31Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
