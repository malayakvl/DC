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

export default function Bone44() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth44Diagnozis = teethDiagnozis.tooth44;
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
        !teethDiagnozis.tooth44.active &&
        !allTeeth &&
        document.getElementById('44').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth44.active &&
        !allTeeth &&
        document.getElementById('44').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(44));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              44,
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
        style={{ opacity: tooth44Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M827.9,1213.9c-4,44.7-8,91.1-11.9,135.6c-3.9,44-7.9,97.7-11.8,142.7
                c-18.9-5.3-37.8-10.8-57-14.9c-27.6-5.9-55.9-9.2-83.7-14.2c14.8-41.5,29.6-91.2,40.2-133.4c10-40,18.2-82.4,24.5-123.3
                c0.9-0.1,1.8-0.1,2.7,0c3.4,0.3,6.5,1.7,9.3,3.4c6.5,4,11.3,9.7,17.8,13.7c6.6,4.1,14.6,6.2,22.9,6.3c8,0.1,15.7-0.8,22.6-4
                c6.8-3.2,12.7-5.7,19.2-9.6C824.2,1215.1,826,1214.1,827.9,1213.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M728.1,1206.3c0.9-0.1,1.8-0.1,2.7,0c3.4,0.3,6.5,1.7,9.3,3.4c6.5,4,11.3,9.7,17.8,13.7
                c6.6,4.1,14.6,6.2,22.9,6.3c8,0.1,15.7-0.8,22.6-4c6.8-3.2,12.7-5.7,19.2-9.6c1.7-1,3.4-2,5.4-2.2"
          style={{ strokeWidth: tooth44Diagnozis.inflamed_gums ? 5 :
              tooth44Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth44Diagnozis.parodontit &&
              tooth44Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M825.5,1240.9c-3.2,36.2-6.4,73-9.5,108.5c-4,44-7.9,97.8-11.8,142.7
                c-18.9-5.3-37.8-10.8-57-14.9c-27.6-5.9-55.9-9.1-83.7-14.2c14.8-41.5,29.5-91.2,40.2-133.4c7.9-31.6,14.7-64.6,20.3-97.3
                c0.2,0,0.4,0,0.6,0c6,1,21.2,23.6,53,24.4c32,0.8,42.4-16.5,47.7-15.9C825.3,1240.9,825.4,1240.9,825.5,1240.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M723.9,1232.4c0.2,0,0.4,0,0.6,0c6,1,21.2,23.6,53,24.4c32,0.8,42.4-16.5,47.7-15.9
                c0.1,0,0.2,0,0.3,0.1"
          style={{ strokeWidth: tooth44Diagnozis.inflamed_gums ? 5 :
              tooth44Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth44Diagnozis.parodontit &&
              tooth44Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M822.6,1274.1c-2.2,25.3-4.4,50.6-6.6,75.3c-4,44-7.9,97.8-11.8,142.7
                c-18.9-5.3-37.8-10.8-57-14.9c-27.6-5.9-55.9-9.1-83.7-14.2c14.8-41.5,29.5-91.2,40.2-133.4c5.7-22.6,10.7-45.9,15.2-69.3
                c0.2,0,0.5,0,0.7,0c7,1,27.3,25.6,59.2,26.3C810.4,1287.5,815,1274.1,822.6,1274.1z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M718.8,1260.4c0.2,0,0.5,0,0.7,0c7,1,27.3,25.6,59.2,26.3c31.7,0.8,36.4-12.7,44-12.6"
          style={{ strokeWidth: tooth44Diagnozis.inflamed_gums ? 5 :
              tooth44Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth44Diagnozis.parodontit &&
              tooth44Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M820.4,1299.7c-1.5,16.7-2.9,33.4-4.4,49.8c-4,44-7.9,97.8-11.8,142.7
                c-18.9-5.3-37.8-10.8-57-14.9c-27.6-5.9-55.9-9.1-83.7-14.2c14.8-41.5,29.5-91.2,40.2-133.4c3.6-14.2,6.9-28.6,10-43.2
                c0.3,0,0.6,0,0.9,0c7,1,21.4,27.5,55.3,29.2C803.2,1317.2,813.5,1300.4,820.4,1299.7z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M713.6,1286.4c0.3,0,0.6,0,0.9,0c7,1,21.4,27.5,55.3,29.2
                c33.4,1.6,43.8-15.2,50.6-15.9"
          style={{ strokeWidth: tooth44Diagnozis.inflamed_gums ? 5 :
              tooth44Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
