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

export default function Bone47() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth47Diagnozis = teethDiagnozis.tooth47;
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
        !teethDiagnozis.tooth47.active &&
        !allTeeth &&
        document.getElementById('47').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth47.active &&
        !allTeeth &&
        document.getElementById('47').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(47));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              47,
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
        style={{ opacity: tooth47Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="st0"
          d="M463.3,1186.1c-9.5,34.5-23.5,70.5-42,103.7c-15.9,28.6-42.4,65.9-65.8,94.6
                c-14.9-3.2-29.6-6.4-44.3-9.9c-31.3-7.3-61.7-15.5-92-25.8c-7.7-2.6-15.3-5.3-22.8-8.1c23-28.5,49.5-64.1,67.8-95.2
                c19-32.3,35.4-66,49.2-100.8c1.1-0.2,2.2-0.1,3.3,0.5c0.9,0.5,1.5,1.3,2.1,2.1c6.8,9,15.6,16.8,26,22.5
                c12.2,6.7,26.2,12.4,40.2,15.5c23.3,5.2,47.5,6.9,70.9,1.9C458.3,1186.6,460.8,1186,463.3,1186.1z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M313.3,1144.6c1.1-0.2,2.2-0.1,3.3,0.5c0.9,0.5,1.5,1.3,2.1,2.1c6.8,9,15.6,16.8,26,22.5
                c12.2,6.7,26.2,12.4,40.2,15.5c23.3,5.2,47.5,6.9,70.9,1.9c2.5-0.5,4.9-1.1,7.4-0.9"
          style={{ strokeWidth: tooth47Diagnozis.inflamed_gums ? 5 :
              tooth47Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth47Diagnozis.parodontit &&
              tooth47Diagnozis.parodontit_stage === 'pst1') ||
            subDiagnozis === 'allst1'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M457.9,1204.3c-9.1,28.8-21.4,58.1-36.6,85.5c-15.9,28.6-42.4,65.9-65.8,94.6
                c-14.9-3.2-29.6-6.4-44.3-9.9c-31.3-7.3-61.7-15.5-92-25.8c-7.7-2.6-15.3-5.3-22.8-8.1c23-28.5,49.5-64.1,67.8-95.2
                c16.2-27.5,30.5-56.1,42.9-85.5c0.2,0.1,0.5,0.1,0.7,0.2c11.8,4.3,28.4,37.2,75.1,48C424.2,1217.7,448.5,1203.1,457.9,1204.3z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M307,1159.9c0.2,0.1,0.5,0.1,0.7,0.2c11.8,4.3,28.4,37.2,75.1,48
                c41.4,9.6,65.7-5.1,75.1-3.8"
          style={{ strokeWidth: tooth47Diagnozis.inflamed_gums ? 5 :
              tooth47Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth47Diagnozis.parodontit &&
              tooth47Diagnozis.parodontit_stage === 'pst2') ||
            subDiagnozis === 'allst2'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M449.9,1227.4c-7.9,21.2-17.5,42.3-28.6,62.5c-15.9,28.6-42.4,65.9-65.8,94.6
                c-14.9-3.2-29.6-6.4-44.3-9.9c-31.3-7.3-61.7-15.5-92-25.8c-7.7-2.6-15.3-5.3-22.8-8.1c23-28.5,49.5-64.1,67.8-95.2
                c12.5-21.2,23.8-43.1,34.1-65.5c0.2,0,0.4,0.1,0.6,0.2c12.8,3.8,22.7,33.3,75.1,46.9C424.5,1240.2,440.7,1226.7,449.9,1227.4z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M298.2,1180c0.2,0,0.4,0.1,0.6,0.2c12.8,3.8,22.7,33.3,75.1,46.9
                c50.6,13.2,66.8-0.3,76,0.4"
          style={{ strokeWidth: tooth47Diagnozis.inflamed_gums ? 5 :
              tooth47Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth47Diagnozis.parodontit &&
              tooth47Diagnozis.parodontit_stage === 'pst3') ||
            subDiagnozis === 'allst3'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M441,1249.6c-5.9,13.7-12.5,27.2-19.7,40.3c-15.9,28.6-42.4,65.9-65.8,94.6
                c-14.9-3.2-29.6-6.4-44.3-9.9c-31.3-7.3-61.7-15.5-92-25.8c-7.7-2.6-15.3-5.3-22.8-8.1c23-28.5,49.5-64.1,67.8-95.2
                c9.6-16.4,18.6-33.1,26.9-50.2c0.3,0.1,0.6,0.2,0.8,0.3c11.6,4.9,19.6,36.9,73.2,51.4C408.2,1258.7,431.3,1247.3,441,1249.6
                C441,1249.5,441,1249.6,441,1249.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M291,1195.3c0.3,0.1,0.6,0.2,0.8,0.3c11.6,4.9,19.6,36.9,73.2,51.4
                c43.1,11.7,66.3,0.3,76,2.6c0,0,0,0,0.1,0"
          style={{ strokeWidth: tooth47Diagnozis.inflamed_gums ? 5 :
              tooth47Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
