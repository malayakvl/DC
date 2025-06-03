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

export default function Bone24() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth24Diagnozis = teethDiagnozis.tooth24;
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
        !teethDiagnozis.tooth24.active &&
        !allTeeth &&
        document.getElementById('24').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth24.active &&
        !allTeeth &&
        document.getElementById('24').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(24));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              24,
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
        style={{ opacity: tooth24Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M1414.1,258.3c-1.8,15.7-4.5,39.5-8.5,74c-2.8,23.6-4.8,53.7-6.2,67.5
                c-0.2,1.9-0.4,3.6-0.5,5.2c-1.3-0.2-2.2-1.1-3-2c-0.8-0.8-1.5-1.6-2.3-2.5c-4.9-5-10.3-9.5-16.2-13c-2.6-1.5-5.3-2.5-8.1-3.2
                c-2.1-0.5-4.3-0.8-6.6-0.9c-2.8-0.2-5.6,0.2-8.3,0.9c-2.6,0.7-5.1,1.8-7.5,3.1c-1,0.6-2,1.1-3,1.8c-0.9,0.6-1.8,1.2-2.7,1.8
                c-3.2,2.2-6.2,4.8-8.9,7.5c-2.4,2.4-4.7,5-6.9,7.6c-0.1,0.2-0.3,0.3-0.4,0.5c-0.1,0.1-0.2,0.3-0.4,0.4c-0.1,0.1-0.2,0.2-0.2,0.2
                c-0.2,0.2-0.5,0.4-0.7,0.6c-0.4,0.3-0.8,0.6-1.3,0.7c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0l27.2-276.5h0.1
                c0,0,0.1,0,0.1,0h1.6c0.3,10.1,0.8,20.2,1.7,30.2c0.8,8.5,2,17,3.3,25.4c2.1,13.6,3.7,27.5,8.2,40.4c0.8,2.4,2.5,4.7,5.7,4.3
                c2.8-0.3,3.5-2.5,4.9-4.2c1.5-1.7,4-3.9,6.6-4.6c2.9-0.8,6.1-1,9-0.2c4.8,1.3,7.4,5.8,8.5,9.4c1,3.2,1.5,6.7,2.4,9.7
                c0.8,2.5,1.9,5.9,3.2,8.5C1406.5,256,1410,258.5,1414.1,258.3z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1398.9,405.2c-1.3-0.2-2.2-1.1-3-2c-0.8-0.8-1.5-1.6-2.3-2.5c-4.9-5-10.3-9.5-16.2-13
                c-2.6-1.5-5.3-2.5-8.1-3.2c-2.1-0.5-4.3-0.8-6.6-0.9c-2.8-0.2-5.6,0.2-8.3,0.9c-2.6,0.7-5.1,1.8-7.5,3.1c-1,0.6-2,1.1-3,1.8
                c-0.9,0.6-1.8,1.2-2.7,1.8c-3.2,2.2-6.2,4.8-8.9,7.5c-2.4,2.4-4.7,5-6.9,7.6c-0.1,0.2-0.3,0.3-0.4,0.5c-0.1,0.1-0.2,0.3-0.4,0.4
                c-0.1,0.1-0.2,0.2-0.2,0.2c-0.2,0.2-0.5,0.4-0.7,0.6c-0.4,0.3-0.8,0.6-1.3,0.7c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0
                c-0.1,0-0.2,0-0.3,0"
          style={{ strokeWidth: tooth24Diagnozis.inflamed_gums ? 5 :
              tooth24Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth24Diagnozis.parodontit &&
              tooth24Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1323.5,386.5c6.9-2.6,11.5-19.8,36.9-21.2c26-1.5,33.1,18.3,40.1,17.5
                c0.1,0,0.2,0,0.3,0c0.9-11.3,2-25.2,3.3-38.3c0.4-4.5,0.8-8.9,1.3-13.1c2.4-20.1,4.3-36.5,5.8-49.9c0.2-1.7,0.4-3.4,0.6-5
                c0.1-0.5,0.1-1,0.2-1.5c0.8-7.5,1.5-13.9,2.1-19.2c-4.2,0.7-8-1.1-10.5-5.7c-1.3-2.5-2.2-6.4-2.2-9.5c-0.1-3.2-0.4-6.5-1.4-9.8
                c-1.1-3.6-4.7-7.1-9.5-8.4c-2.9-0.8-6.1-0.6-8.9,0.2c-2.6,0.7-5.1,1.9-6.6,3.6c-1.4,1.7-2.1,3.9-5,4.2c-3.1,0.4-4.8-1.9-5.6-4.3
                c-4.6-13-6.1-26.9-8.2-40.4c-1.3-8.5-2.6-16.9-3.3-25.4c-0.8-9.3-1.4-18.7-1.7-28l-2.8,0L1323.5,386.5z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1323.5,386.7c6.9-2.6,11.5-19.8,36.9-21.2c26-1.5,33.1,18.3,40.1,17.5
                c0.1,0,0.2,0,0.3,0"
          style={{ strokeWidth: tooth24Diagnozis.inflamed_gums ? 5 :
              tooth24Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth24Diagnozis.parodontit &&
              tooth24Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1327,350.8c5,0,8.1-17.2,36.1-18.5c27.2-0.4,31.8,14.2,39.7,13.7
                c0.5,0,0.9-0.1,1.4-0.3c0-0.4,0.1-0.8,0.1-1.2c0.4-4.5,0.8-8.9,1.3-13.1c2.4-20.1,4.3-36.5,5.8-49.9c0.2-1.7,0.4-3.4,0.6-5
                c0.1-0.5,0.1-1,0.2-1.5c0.8-7.5,1.5-13.9,2.1-19.2c-4.2,0.7-8-1.1-10.5-5.7c-1.3-2.5-2.2-6.4-2.2-9.5c-0.1-3.2-0.4-6.5-1.4-9.8
                c-1.1-3.6-4.7-7.1-9.5-8.4c-2.9-0.8-6.1-0.6-8.9,0.2c-2.6,0.7-5.1,1.9-6.6,3.6c-1.4,1.7-2.1,3.9-5,4.2c-3.1,0.4-4.8-1.9-5.6-4.3
                c-4.6-13-6.1-26.9-8.2-40.4c-1.3-8.5-2.6-16.9-3.3-25.4c-0.8-9.3-1.4-18.7-1.7-28l-2.8,0L1327,350.8z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1327,351.1c5,0,8.1-17.2,36.1-18.5c27.2-0.4,31.8,14.2,39.7,13.7
                c0.5,0,0.9-0.1,1.4-0.3"
          style={{ strokeWidth: tooth24Diagnozis.inflamed_gums ? 5 :
              tooth24Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth24Diagnozis.parodontit &&
              tooth24Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1331,309.9c0.5,0.4,1,0.6,1.5,0.7c6.3,0.5,11.8-18.1,37.4-17.5
                c25.7,0.6,34.2,16.2,37.8,16.1c0.1,0,0.3,0,0.5-0.1c1.2-10.3,2.3-19.5,3.2-27.5c0.2-1.7,0.4-3.4,0.6-5c0.1-0.5,0.1-1,0.2-1.5
                c0.8-7.5,1.5-13.9,2.1-19.2c-4.2,0.7-8-1.1-10.5-5.7c-1.3-2.5-2.2-6.4-2.2-9.5c-0.1-3.2-0.4-6.5-1.4-9.8c-1.1-3.6-4.7-7.1-9.5-8.4
                c-2.9-0.8-6.1-0.6-8.9,0.2c-2.6,0.7-5.1,1.9-6.6,3.6c-1.4,1.7-2.1,3.9-5,4.2c-3.1,0.4-4.8-1.9-5.6-4.3c-4.6-13-6.1-26.9-8.2-40.4
                c-1.3-8.5-2.6-16.9-3.3-25.4c-0.8-9.3-1.4-18.7-1.7-28l-2.8,0L1331,309.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1331,310.1c0.5,0.4,1,0.6,1.5,0.7c6.3,0.5,11.8-18.1,37.4-17.5
                c25.7,0.6,34.2,16.2,37.8,16.1c0.1,0,0.3,0,0.5-0.1"
          style={{ strokeWidth: tooth24Diagnozis.inflamed_gums ? 5 :
              tooth24Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
