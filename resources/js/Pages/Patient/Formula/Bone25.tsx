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

export default function Bone25() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth25Diagnozis = teethDiagnozis.tooth25;
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
        !teethDiagnozis.tooth25.active &&
        !allTeeth &&
        document.getElementById('25').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth25.active &&
        !allTeeth &&
        document.getElementById('25').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(25));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              25,
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
        style={{ opacity: tooth25Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M1479.8,391.8c-1.7-0.8-3.3-1.8-4.9-2.8c-6.5-4-12.6-9.1-19.5-12c-1.9-0.8-3.9-1.3-5.8-1.6
                c-4.9-0.7-9.9,0.2-14.6,1.9c-2.9,1.1-5.8,2.5-8.5,4c-0.5,0.3-1,0.6-1.4,0.9c-0.1,0-0.1,0.1-0.2,0.1c-6.2,3.9-11.3,8.7-16.4,14.3
                c-1.7,1.9-3.3,3.8-5,5.8c-1.1,1.4-2.5,2.7-4.3,2.6c-0.1,0-0.2,0-0.2,0c0.2-1.6,0.3-3.4,0.5-5.2c1.4-13.8,3.4-43.9,6.2-67.5
                c4-34.4,6.8-58.3,8.5-74c2.6-0.1,5.5-1.4,8.4-3.9c2.9-2.5,3.5-5.3,4.3-8.3c0.8-3.4,2.2-7.1,3.3-10.6c1-2.9,2.3-6,3.7-8.9
                c3.1-6.3,10.3-14.1,19.6-13.1c6.8,0.7,11.2,7,12.8,11.7c0.3,0.9,0.5,1.7,0.7,2.6c2,9.7,1.2,20.1,2.8,29c0.9,4.9,2.2,9,7.1,10.1
                c-0.1,0.8-0.1,1.7-0.2,2.6c-0.1,0.8-0.1,1.7-0.2,2.6c-0.2,2.9-0.5,6-0.7,9.4c0,0.5-0.1,1.1-0.1,1.7c-0.2,2.8-0.4,5.8-0.5,8.9
                c0,0.6-0.1,1.2-0.1,1.9c-0.1,2.5-0.2,5.1-0.3,7.8c0,1.1-0.1,2.2-0.1,3.3c-0.1,3.6-0.2,7.2-0.2,11c0,0.6,0,1.2,0,1.8
                c0,3.1-0.1,6.2,0,9.3c0,1.5,0,3.1,0,4.6c0,0.8,0,1.5,0,2.3c0,1.5,0.1,3,0.1,4.5c0,1.1,0.1,2.2,0.1,3.3c0,0.1,0,0.3,0,0.4
                c0.1,1.5,0.1,2.9,0.2,4.4c0,0.8,0.1,1.6,0.1,2.4c0.1,2.4,0.3,4.7,0.5,7v0c0.1,1.4,0.2,2.8,0.3,4.2c0,0.1,0,0.2,0,0.3l0.2,2.2
                c0.4,4.5,0.9,8.8,1.4,12.8c0.1,0.7,0.2,1.4,0.2,2C1478.4,382.7,1479.1,387.5,1479.8,391.8z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1479.8,392c-1.7-0.8-3.3-1.8-4.9-2.8c-6.5-4-12.6-9.1-19.5-12c-1.9-0.8-3.9-1.3-5.8-1.6
                c-4.9-0.7-9.9,0.2-14.6,1.9c-2.9,1.1-5.8,2.5-8.5,4c-0.5,0.3-1,0.6-1.4,0.9c-0.1,0-0.1,0.1-0.2,0.1c-6.2,3.9-11.3,8.7-16.4,14.3
                c-1.7,1.9-3.3,3.8-5,5.8c-1.1,1.4-2.5,2.7-4.3,2.6c-0.1,0-0.2,0-0.2,0"
          style={{ strokeWidth: tooth25Diagnozis.inflamed_gums ? 5 :
              tooth25Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth25Diagnozis.parodontit &&
              tooth25Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1401,382.9c6.9-1.4,14.5-21.7,38.2-24.6c24-3,31,15.1,38.1,14.9c0,0,0,0,0,0
                c-1.6-13.7-2.8-29.6-2.9-45.9c0-3.8,0-7.6,0.1-11.4c0-0.8,0-1.6,0-2.4c0-0.5,0-1,0-1.5c0-0.6,0-1.3,0-1.9c0-0.7,0-1.5,0-2.2
                c0.2-8,0.5-15.8,0.9-22.9c0-0.4,0-0.8,0.1-1.1c0.4-7.4,0.8-14,1.2-19.2c0,0,0,0,0,0c0-0.1,0-0.2,0-0.3c-3.9-1.6-6.3-5.2-7.1-9.5
                c-1.7-9-0.9-19.3-2.8-29c-0.2-0.9-0.4-1.8-0.7-2.6c-1.6-4.7-5-9-11.8-9.7c-9.3-0.9-16.6,3.8-19.6,10.1c-1.4,2.9-2.7,6-3.7,8.9
                c-1.2,3.5-2.5,7.2-3.3,10.6c-0.8,3-1.4,5.8-4.3,8.3c-3,2.6-6.1,4.2-9,4.7c-0.6,5.4-1.3,11.7-2.2,19.2c-0.1,0.5-0.1,1-0.2,1.5
                c-0.2,1.6-0.4,3.3-0.6,5c-1.6,13.9-3.5,30.9-5.8,50.7c-0.5,3.9-0.9,8-1.3,12.2C1403,357.8,1401.9,371.6,1401,382.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1401,382.9c6.9-1.4,14.5-21.7,38.2-24.6c24-3,31,16.1,38.1,15.9"
          style={{ strokeWidth: tooth25Diagnozis.inflamed_gums ? 5 :
              tooth25Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth25Diagnozis.parodontit &&
              tooth25Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1404.2,345.9c6-2.2,9.2-15.6,35.6-15.8c24-0.1,27.8,12.5,35,12.8
                c-0.2-5.1-0.4-10.3-0.4-15.6c0-3.8,0-7.6,0.1-11.4c0-0.8,0-1.6,0-2.4c0-0.5,0-1,0-1.5c0-0.6,0-1.3,0-1.9c0-0.7,0-1.5,0-2.2
                c0.2-8,0.5-15.8,0.9-22.9c0-0.4,0-0.8,0.1-1.1c0.4-7.4,0.8-14,1.2-19.2c0,0,0,0,0,0c0-0.1,0-0.2,0-0.3c-3.9-1.6-6.3-5.2-7.1-9.5
                c-1.7-9-0.9-19.3-2.8-29c-0.2-0.9-0.4-1.8-0.7-2.6c-1.6-4.7-5-9-11.8-9.7c-9.3-0.9-16.6,3.8-19.6,10.1c-1.4,2.9-2.7,6-3.7,8.9
                c-1.2,3.5-2.5,7.2-3.3,10.6c-0.8,3-1.4,5.8-4.3,8.3c-3,2.6-6.1,4.2-9,4.7c-0.6,5.4-1.3,11.7-2.2,19.2c-0.1,0.5-0.1,1-0.2,1.5
                c-0.2,1.6-0.4,3.3-0.6,5c-1.6,13.9-3.5,30.9-5.8,50.7c-0.5,3.9-0.9,8-1.3,12.2C1404.3,345.1,1404.3,345.5,1404.2,345.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1404.2,345.9c6-2.2,9.2-15.6,35.6-15.8c24-0.1,27.8,13.5,35,13.8"
          style={{ strokeWidth: tooth25Diagnozis.inflamed_gums ? 5 :
              tooth25Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth25Diagnozis.parodontit &&
              tooth25Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1408.4,309.2c3.6-1.7,9.2-18.3,33.1-18.3c22.9,0,28.2,13,33.2,14.3
                    c0.2-7,0.5-13.9,0.8-20.2c0-0.4,0-0.8,0.1-1.1c0.4-7.4,0.8-14,1.2-19.2c0,0,0,0,0,0c0-0.1,0-0.2,0-0.3c-3.9-1.6-6.3-5.2-7.1-9.5
                    c-1.7-9-0.9-19.3-2.8-29c-0.2-0.9-0.4-1.8-0.7-2.6c-1.6-4.7-5-9-11.8-9.7c-9.3-0.9-16.6,3.8-19.6,10.1c-1.4,2.9-2.7,6-3.7,8.9
                    c-1.2,3.5-2.5,7.2-3.3,10.6c-0.8,3-1.4,5.8-4.3,8.3c-3,2.6-6.1,4.2-9,4.7c-0.6,5.4-1.3,11.7-2.2,19.2c-0.1,0.5-0.1,1-0.2,1.5
                    c-0.2,1.6-0.4,3.3-0.6,5C1410.6,289.8,1409.5,299,1408.4,309.2z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1408.4,309.2c3.6-1.7,9.2-18.3,33.1-18.3c22.9,0,28.2,14,33.2,15.3"
          style={{ strokeWidth: tooth25Diagnozis.inflamed_gums ? 5 :
              tooth25Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
