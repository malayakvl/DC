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
import setupDiagnoze from '../../../lib/tfunctions';
import { excludeToothEffect } from '../../../Constants';

export default function Bone36() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth36Diagnozis = teethDiagnozis.tooth36;
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
        !teethDiagnozis.tooth36.active &&
        !allTeeth &&
        document.getElementById('36').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth36.active &&
        !allTeeth &&
        document.getElementById('36').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(36));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              36,
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
        className="periodontal level"
        style={{ opacity: tooth36Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="st0"
          d="M1468.3,1202.1c6.1,40.9,15.3,83.2,27.3,122.6c10.5,34.2,28.6,77.2,44.1,111.1
                            c1.7-0.5,3.3-1,5-1.5c42.7-12.7,85.6-24.6,129.2-34.7c23-5.3,46.2-10.2,69.4-15.1c-23.4-28.7-49.9-66-65.8-94.6
                            c-18.5-33.2-32.5-69.2-42-103.7c-0.5,0-0.9,0.1-1.4,0.2c-2.5,0.5-4.5,2-6.5,3.3c-22.4,15-50.7,20.6-78.8,23.3
                            c-25,2.4-51,2.5-73-8.1C1473.5,1203.6,1471,1202.3,1468.3,1202.1z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1635.6,1186.2c-0.5,0-0.9,0.1-1.4,0.2c-2.5,0.5-4.5,2-6.5,3.3c-22.4,15-50.7,20.6-78.8,23.3
                            c-25,2.4-51,2.5-73-8.1c-2.4-1.2-4.9-2.5-7.6-2.7"
          style={{ strokeWidth: tooth36Diagnozis.inflamed_gums ? 5 :
              tooth36Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth36Diagnozis.parodontit &&
              tooth36Diagnozis.parodontit_stage === 'pst1') ||
            subDiagnozis === 'allst2'
              ? 1
              : 0,
        }}
      >
        <path
          id="bone_36_1"
          className="st0"
          d="M1472.5,1227.6c5.9,32.8,13.6,65.8,23.1,97.1c10.5,34.2,28.6,77.2,44.1,111.1
                            c1.7-0.5,3.3-1,5-1.5c42.7-12.8,85.6-24.6,129.2-34.7c23-5.3,46.2-10.2,69.4-15.1c-23.4-28.7-49.9-66-65.8-94.6
                            c-15.2-27.4-27.5-56.7-36.6-85.5c-0.2,0-0.4,0.1-0.6,0.1c-12,1-36,33-92.7,33.1C1498.9,1239.5,1480.9,1227.2,1472.5,1227.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1641,1204.3c-0.2,0-0.4,0.1-0.6,0.1c-12,1-36,33-92.7,33.1c-48.7,2-66.7-10.4-75.2-10"
          style={{ strokeWidth: tooth36Diagnozis.inflamed_gums ? 5 :
              tooth36Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth36Diagnozis.parodontit &&
              tooth36Diagnozis.parodontit_stage === 'pst2') ||
            subDiagnozis === 'allst2'
              ? 1
              : 0,
        }}
      >
        <path
          id="bone_36_2"
          className="st0"
          d="M1477.7,1254.3c5,23.9,11,47.6,17.9,70.4c10.5,34.2,28.6,77.2,44.1,111.1
                            c1.7-0.5,3.3-1,5-1.5c42.7-12.8,85.6-24.6,129.2-34.7c23-5.3,46.2-10.2,69.4-15.1c-23.4-28.7-49.9-66-65.8-94.6
                            c-11.2-20.1-20.7-41.3-28.6-62.5c-0.2,0-0.4,0-0.5,0c-14,2-37,31-96.3,36.7C1504.7,1268.8,1485.7,1254.3,1477.7,1254.3z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1648.9,1227.4c-0.2,0-0.4,0-0.5,0c-14,2-37,31-96.3,36.7c-47.4,4.6-66.4-9.9-74.4-9.9"
          style={{ strokeWidth: tooth36Diagnozis.inflamed_gums ? 5 :
              tooth36Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth36Diagnozis.parodontit &&
              tooth36Diagnozis.parodontit_stage === 'pst3') ||
            subDiagnozis === 'allst3'
              ? 1
              : 0,
        }}
      >
        <path
          id="bone_36_3"
          className="st0"
          d="M1483.7,1280.9c3.6,14.8,7.6,29.5,11.9,43.7c10.5,34.2,28.6,77.2,44.1,111.1
                            c1.7-0.5,3.3-1,5-1.5c42.7-12.8,85.6-24.6,129.2-34.7c23-5.3,46.2-10.2,69.4-15.1c-23.4-28.7-49.9-66-65.8-94.6
                            c-7.3-13.1-13.9-26.6-19.7-40.3c-12.5,3-39.5,32.9-95.7,37.9C1513.3,1291.8,1492,1279.7,1483.7,1280.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1657.8,1249.6c-12.5,3-39.5,32.9-95.7,37.9c-48.8,4.4-70.1-7.8-78.4-6.5"
          style={{ strokeWidth: tooth36Diagnozis.inflamed_gums ? 5 :
              tooth36Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
