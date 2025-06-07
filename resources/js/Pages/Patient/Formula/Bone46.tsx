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

export default function Bone46() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth46Diagnozis = teethDiagnozis.tooth46;
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
        !teethDiagnozis.tooth46.active &&
        !allTeeth &&
        document.getElementById('46').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth46.active &&
        !allTeeth &&
        document.getElementById('46').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(46));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              46,
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
        style={{ opacity: tooth46Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M630.6,1202.1c-6.1,40.9-15.3,83.2-27.3,122.6c-10.5,34.2-28.6,77.2-44.1,111.1
            c-1.7-0.5-3.3-1-5-1.5c-42.7-12.7-85.6-24.6-129.2-34.7c-23-5.3-46.2-10.2-69.4-15.1c23.4-28.7,49.9-66,65.8-94.6
            c18.5-33.2,32.5-69.2,42-103.7c0.5,0,0.9,0.1,1.4,0.2c2.5,0.5,4.5,2,6.5,3.3c22.4,15,50.7,20.6,78.8,23.3c25,2.4,51,2.5,73-8.1
            C625.4,1203.6,627.9,1202.3,630.6,1202.1z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M463.3,1186.2c0.5,0,0.9,0.1,1.4,0.2c2.5,0.5,4.5,2,6.5,3.3c22.4,15,50.7,20.6,78.8,23.3
            c25,2.4,51,2.5,73-8.1c2.4-1.2,4.9-2.5,7.6-2.7"
          style={{ strokeWidth: tooth46Diagnozis.inflamed_gums ? 5 :
              tooth46Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth46Diagnozis.parodontit &&
              tooth46Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M626.4,1227.6c-5.9,32.8-13.6,65.8-23.1,97.1c-10.5,34.2-28.6,77.2-44.1,111.1
            c-1.7-0.5-3.3-1-5-1.5c-42.7-12.8-85.6-24.6-129.2-34.7c-23-5.3-46.2-10.2-69.4-15.1c23.4-28.7,49.9-66,65.8-94.6
            c15.2-27.4,27.5-56.7,36.6-85.5c0.2,0,0.4,0.1,0.6,0.1c12,1,36,33,92.7,33.1C599.9,1239.5,617.9,1227.2,626.4,1227.6z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M457.9,1204.3c0.2,0,0.4,0.1,0.6,0.1c12,1,36,33,92.7,33.1c48.7,2,66.7-10.4,75.2-10"
          style={{ strokeWidth: tooth46Diagnozis.inflamed_gums ? 5 :
              tooth46Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth46Diagnozis.parodontit &&
              tooth46Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M621.2,1254.3c-5,23.9-11,47.6-17.9,70.4c-10.5,34.2-28.6,77.2-44.1,111.1
            c-1.7-0.5-3.3-1-5-1.5c-42.7-12.8-85.6-24.6-129.2-34.7c-23-5.3-46.2-10.2-69.4-15.1c23.4-28.7,49.9-66,65.8-94.6
            c11.2-20.1,20.7-41.3,28.6-62.5c0.2,0,0.4,0,0.5,0c14,2,37,31,96.3,36.7C594.2,1268.7,613.2,1254.3,621.2,1254.3z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M449.9,1227.4c0.2,0,0.4,0,0.5,0c14,2,37,31,96.3,36.7c47.4,4.6,66.4-9.9,74.4-9.9"
          style={{ strokeWidth: tooth46Diagnozis.inflamed_gums ? 5 :
              tooth46Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth46Diagnozis.parodontit &&
              tooth46Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M615.2,1280.9c-3.6,14.8-7.6,29.5-11.9,43.7c-10.5,34.2-28.6,77.2-44.1,111.1
            c-1.7-0.5-3.3-1-5-1.5c-42.7-12.8-85.6-24.6-129.2-34.7c-23-5.3-46.2-10.2-69.4-15.1c23.4-28.7,49.9-66,65.8-94.6
            c7.3-13.1,13.9-26.6,19.7-40.3c12.5,3,39.5,32.9,95.7,37.9C585.6,1291.8,606.9,1279.7,615.2,1280.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M441,1249.6c12.5,3,39.5,32.9,95.7,37.9c48.8,4.4,70.1-7.8,78.4-6.5"
          style={{ strokeWidth: tooth46Diagnozis.inflamed_gums ? 5 :
              tooth46Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
