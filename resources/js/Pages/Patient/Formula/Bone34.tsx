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

export default function Bone34() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth34Diagnozis = teethDiagnozis.tooth34;
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
        !teethDiagnozis.tooth34.active &&
        !allTeeth &&
        document.getElementById('34').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth34.active &&
        !allTeeth &&
        document.getElementById('34').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(34));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              34,
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
        style={{ opacity: tooth34Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="st0"
          d="M1271,1213.9c4,44.7,8,91.1,11.9,135.6c3.9,44,7.9,97.7,11.8,142.7
                        c18.9-5.3,37.8-10.8,57-14.9c27.6-5.9,55.9-9.2,83.7-14.2c-14.8-41.5-29.6-91.2-40.2-133.4c-10-40-18.2-82.4-24.5-123.3
                        c-0.9-0.1-1.8-0.1-2.7,0c-3.4,0.3-6.5,1.7-9.3,3.4c-6.5,4-11.3,9.7-17.8,13.7c-6.6,4.1-14.6,6.2-22.9,6.3c-8,0.1-15.7-0.8-22.6-4
                        c-6.8-3.2-12.7-5.7-19.2-9.6C1274.7,1215.1,1272.9,1214.1,1271,1213.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1370.7,1206.3c-0.9-0.1-1.8-0.1-2.7,0c-3.4,0.3-6.5,1.7-9.3,3.4c-6.5,4-11.3,9.7-17.8,13.7
                        c-6.6,4.1-14.6,6.2-22.9,6.3c-8,0.1-15.7-0.8-22.6-4c-6.8-3.2-12.7-5.7-19.2-9.6c-1.7-1-3.4-2-5.4-2.2"
          style={{ strokeWidth: tooth34Diagnozis.inflamed_gums ? 5 :
              tooth34Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth34Diagnozis.parodontit &&
              tooth34Diagnozis.parodontit_stage === 'pst1') ||
            subDiagnozis === 'allst1'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M1273.4,1240.9c3.2,36.2,6.4,73,9.5,108.5c4,44,7.9,97.8,11.8,142.7
                        c18.9-5.3,37.8-10.8,57-14.9c27.6-5.9,55.9-9.1,83.7-14.2c-14.8-41.5-29.5-91.2-40.2-133.4c-7.9-31.6-14.7-64.6-20.3-97.3
                        c-0.2,0-0.4,0-0.6,0c-6,1-21.2,23.6-53,24.4c-32,0.8-42.4-16.5-47.7-15.9C1273.6,1240.9,1273.5,1240.9,1273.4,1240.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1375,1232.4c-0.2,0-0.4,0-0.6,0c-6,1-21.2,23.6-53,24.4c-32,0.8-42.4-16.5-47.7-15.9
                        c-0.1,0-0.2,0-0.3,0.1"
          style={{ strokeWidth: tooth34Diagnozis.inflamed_gums ? 5 :
              tooth34Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth34Diagnozis.parodontit &&
              tooth34Diagnozis.parodontit_stage === 'pst2') ||
            subDiagnozis === 'allst2'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M1276.3,1274.2c2.2,25.3,4.4,50.6,6.6,75.3c4,44,7.9,97.8,11.8,142.7
                        c18.9-5.3,37.8-10.8,57-14.9c27.6-5.9,55.9-9.1,83.7-14.2c-14.8-41.5-29.5-91.2-40.2-133.4c-5.7-22.6-10.7-45.9-15.2-69.3
                        c-0.2,0-0.5,0-0.7,0c-7,1-27.3,25.6-59.2,26.3C1288.5,1287.5,1283.9,1274.1,1276.3,1274.2z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1380.1,1260.4c-0.2,0-0.5,0-0.7,0c-7,1-27.3,25.6-59.2,26.3
                        c-31.7,0.8-36.4-12.7-44-12.6"
          style={{ strokeWidth: tooth34Diagnozis.inflamed_gums ? 5 :
              tooth34Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth34Diagnozis.parodontit &&
              tooth34Diagnozis.parodontit_stage === 'pst3') ||
            subDiagnozis === 'allst3'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M1278.5,1299.7c1.5,16.7,2.9,33.4,4.4,49.8c4,44,7.9,97.8,11.8,142.7
                        c18.9-5.3,37.8-10.8,57-14.9c27.6-5.9,55.9-9.1,83.7-14.2c-14.8-41.5-29.5-91.2-40.2-133.4c-3.6-14.2-6.9-28.6-10-43.2
                        c-0.3,0-0.6,0-0.9,0c-7,1-21.4,27.5-55.3,29.2C1295.7,1317.2,1285.3,1300.4,1278.5,1299.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1385.3,1286.4c-0.3,0-0.6,0-0.9,0c-7,1-21.4,27.5-55.3,29.2
                            c-33.4,1.6-43.8-15.2-50.6-15.9"
          style={{ strokeWidth: tooth34Diagnozis.inflamed_gums ? 5 :
              tooth34Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
