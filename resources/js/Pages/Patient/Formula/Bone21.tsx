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

export default function Bone21() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth21Diagnozis = teethDiagnozis.tooth21;
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
        !teethDiagnozis.tooth21.active &&
        !allTeeth &&
        document.getElementById('21').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth21.active &&
        !allTeeth &&
        document.getElementById('21').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(21));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              21,
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
        style={{ opacity: tooth21Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M1176,188.6l-23.3,232c-1.9-0.2-3.6-1-5.3-1.7c-15.7-7.4-24.9-23.9-46.2-23.5
                c-18.2,0.3-30.7,14.7-46.2,23c-1,0.5-1.9,1-3,1.2c-1,0.2-2,0.1-2.9-0.2c0,0,0.1,0,0.1,0l0-5.6v0l-0.1-32l0.4-189.4l0-17.8
                c9-0.1,18,0.1,26.9,0.8c8.4,0.6,16.8,1.5,25.1,2.7c16.6,2.5,33,6.2,49.7,8.5c0.4,0,0.8,0.1,1.2,0.2c0.9,0.1,1.8,0.2,2.7,0.4
                c0.1,0,0.1,0,0.2,0C1162.1,187.8,1169,188.4,1176,188.6z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1152.7,420.8c-1.9-0.2-3.6-1-5.3-1.7c-15.7-7.4-24.9-23.9-46.2-23.5
                c-18.2,0.3-30.7,14.7-46.2,23c-1,0.5-1.9,1-3,1.2c-1,0.2-2.7-0.2-2.9-0.2"
          style={{ strokeWidth: tooth21Diagnozis.inflamed_gums ? 5 :
              tooth21Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth21Diagnozis.parodontit &&
              tooth21Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1048.9,381.5l0,9.7c11.3-2.6,30.3-22.6,53.2-22.7c30.2-0.1,44.6,20.8,53.4,20.8
                h0.2l20.2-200.8c-6.9-0.2-13.8-0.8-20.7-1.7c-0.1,0-0.2,0-0.2,0c-0.9-0.1-1.8-0.2-2.7-0.4c-0.4,0-0.8-0.1-1.2-0.2
                c-16.7-2.3-33.1-6.1-49.7-8.5c-8.3-1.2-16.7-2.2-25.1-2.7c-8.9-0.6-17.9-0.9-26.9-0.8l0,17.8L1048.9,381.5z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1049,391.5c11.3-2.6,30.3-22.6,53.2-22.7c30.2-0.1,44.6,20.8,53.4,20.8h0.2"
          style={{ strokeWidth: tooth21Diagnozis.inflamed_gums ? 5 :
              tooth21Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth21Diagnozis.parodontit &&
              tooth21Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1049,353.6c10.2-2,25.6-24.3,53.8-24.3c36.8,0,45.3,23.1,54.8,23
                c0.7,0,1.3-0.2,2-0.5l16.4-163.3c-6.9-0.2-13.8-0.8-20.7-1.7c-0.1,0-0.2,0-0.2,0c-0.9-0.1-1.8-0.2-2.7-0.4c-0.4,0-0.8-0.1-1.2-0.2
                c-16.7-2.3-33.1-6.1-49.7-8.5c-8.3-1.2-16.7-2.2-25.1-2.7c-8.9-0.6-17.9-0.9-26.9-0.8l0,17.8L1049,353.6z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1049,353.9c10.2-2,25.6-24.3,53.8-24.3c36.8,0,45.3,23.1,54.8,23c0.7,0,1.3-0.2,2-0.5"
          style={{ strokeWidth: tooth21Diagnozis.inflamed_gums ? 5 :
              tooth21Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth21Diagnozis.parodontit &&
              tooth21Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1049.1,307.3c9.5-3.4,16.8-19.9,50.4-20.8c42.6-1.2,57.1,21.2,64.1,25.4
                l12.4-123.3c-6.9-0.2-13.8-0.8-20.7-1.7c-0.1,0-0.2,0-0.2,0c-0.9-0.1-1.8-0.2-2.7-0.4c-0.4,0-0.8-0.1-1.2-0.2
                c-16.7-2.3-33.1-6.1-49.7-8.5c-8.3-1.2-16.7-2.2-25.1-2.7c-8.9-0.6-17.9-0.9-26.9-0.8l0,17.8L1049.1,307.3z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1049.1,307.6c9.5-3.4,16.8-19.9,50.4-20.8c42.6-1.2,57.1,21.2,64.1,25.4"
          style={{ strokeWidth: tooth21Diagnozis.inflamed_gums ? 5 :
              tooth21Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
