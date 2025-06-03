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

export default function Bone43() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth43Diagnozis = teethDiagnozis.tooth43;
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
        !teethDiagnozis.tooth43.active &&
        !allTeeth &&
        document.getElementById('43').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth43.active &&
        !allTeeth &&
        document.getElementById('43').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(43));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              43,
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
        style={{ opacity: tooth43Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="st0"
          d="M914.9,1213.9c-4.1,47.6-8.1,98.8-12.2,146.1c-4.1,47.2-8.1,102.5-12.1,150.2
                        c-7.9-0.8-15.7-1.8-23.5-3.1c-21.4-3.5-42.2-9.2-62.9-14.9c3.9-44.9,7.8-98.7,11.8-142.7c4-44.5,8-90.9,11.9-135.6c0.3,0,0.6,0,1,0
                        c3,0,3.8,1.6,5.5,3.8c7.4,9.3,12.3,19.7,18.5,25.1c5.2,4.6,11.9,5.1,19.5,5.4c10.1,0.4,16.8-3.8,23.5-10.1
                        c4.6-4.3,10.4-17.1,14.8-21.6C911.9,1215.3,913.2,1214.2,914.9,1213.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M827.9,1213.9c0.3,0,0.6,0,1,0c3,0,3.8,1.6,5.5,3.8c7.4,9.3,12.3,19.7,18.5,25.1
                        c5.2,4.6,11.9,5.1,19.5,5.4c10.1,0.4,16.8-3.8,23.5-10.1c4.6-4.3,10.4-17.1,14.8-21.6c1.2-1.2,2.5-2.3,4.1-2.6"
          style={{ strokeWidth: tooth43Diagnozis.inflamed_gums ? 5 :
              tooth43Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth43Diagnozis.parodontit &&
              tooth43Diagnozis.parodontit_stage === 'pst1') ||
            subDiagnozis === 'allst1'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M912.3,1244.5c-3.2,38.5-6.4,78.2-9.6,115.5c-4.1,47.2-8.1,102.5-12.2,150.2
                            c-7.9-0.8-15.7-1.8-23.5-3.1c-21.4-3.5-42.2-9.2-62.9-14.9c3.9-44.9,7.8-98.7,11.8-142.7c3.2-35.6,6.4-72.4,9.5-108.5
                            c5.3,1.6,13.6,31.5,46.2,31.2C902.7,1271.8,906.4,1245,912.3,1244.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M825.5,1240.9c5.3,1.6,13.6,31.5,46.2,31.2c31-0.3,34.6-27.1,40.5-27.7"
          style={{ strokeWidth: tooth43Diagnozis.inflamed_gums ? 5 :
              tooth43Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth43Diagnozis.parodontit &&
              tooth43Diagnozis.parodontit_stage === 'pst2') ||
            subDiagnozis === 'allst2'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M909.5,1277.9c-2.3,27.7-4.6,55.5-6.8,82.1c-4.1,47.2-8.1,102.5-12.2,150.2
                            c-7.9-0.8-15.7-1.8-23.5-3.1c-21.4-3.5-42.2-9.2-62.9-14.9c3.9-44.9,7.8-98.7,11.8-142.7c2.2-24.7,4.4-50,6.6-75.3h0.2
                            c7.7,0.3,12.4,26.8,47.9,25.7C900.7,1298.9,903.8,1279.6,909.5,1277.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M822.6,1274.1h0.2c7.7,0.3,12.4,26.8,47.9,25.7c30-1,33.1-20.2,38.9-22"
          style={{ strokeWidth: tooth43Diagnozis.inflamed_gums ? 5 :
              tooth43Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth43Diagnozis.parodontit &&
              tooth43Diagnozis.parodontit_stage === 'pst3') ||
            subDiagnozis === 'allst3'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M907.4,1304.4c-1.6,18.8-3.1,37.5-4.7,55.5c-4.1,47.2-8.1,102.5-12.2,150.2
                            c-7.9-0.8-15.7-1.8-23.5-3.1c-21.4-3.5-42.2-9.2-62.9-14.9c3.9-44.9,7.8-98.7,11.8-142.7c1.5-16.4,2.9-33.1,4.4-49.8
                            c0.1,0,0.2,0,0.3,0c6.8-0.2,7.9,28.9,43.3,30.2C895.3,1330.9,901.9,1306.1,907.4,1304.4z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M820.4,1299.7c0.1,0,0.2,0,0.3,0c6.8-0.2,7.9,28.9,43.3,30.2
                            c31.4,1.1,37.9-23.8,43.4-25.4"
          style={{ strokeWidth: tooth43Diagnozis.inflamed_gums ? 5 :
              tooth43Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
