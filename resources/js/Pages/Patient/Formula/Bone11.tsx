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

export default function Bone11() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth11Diagnozis = teethDiagnozis.tooth11;
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
        !teethDiagnozis.tooth11.active &&
        !allTeeth &&
        document.getElementById('17').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth11.active &&
        !allTeeth &&
        document.getElementById('17').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(17));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              17,
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
        style={{ opacity: tooth11Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M1048.9,419.2C1048.9,419.2,1048.9,419.2,1048.9,419.2c-0.8,0.3-1.9,0.4-2.8,0.3
                c-1.1-0.2-2.1-0.7-3-1.2c-15.5-8.3-31-23.9-49.2-24c-17.9,0-27.5,13.2-43.2,20.5c-1.8,0.9-3.7,1.5-5.7,1.8l-22.9-228
                c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2c16.7-2.3,33-6.1,49.7-8.5
                c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8l0.4,189.4l-0.1,32v0L1048.9,419.2z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1048.9,419.4c-0.8,0.1-1.9,0.4-2.9,0.2c-1.1-0.2-2.1-0.7-3-1.2c-15.5-8.3-31-23.9-49.2-24
                c-17.9,0-27.5,13.2-43.2,20.5c-1.8,0.9-3.7,1.5-5.7,1.8"
          style={{ strokeWidth: tooth11Diagnozis.inflamed_gums ? 5 :
              tooth11Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="pst1"
        style={{
          opacity:
            (tooth11Diagnozis.parodontit &&
              tooth11Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1048.9,381.5l0,9.7c-11.3-2.6-30.3-22.6-53.2-22.7c-30.2-0.1-44.6,20.8-53.4,20.8
                h-0.2l-20.2-200.8c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2
                c16.7-2.3,33.1-6.1,49.7-8.5c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8L1048.9,381.5z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1048.9,391.4c-11.3-2.6-30.3-22.6-53.2-22.7c-30.2-0.1-44.6,20.8-53.4,20.8h-0.2"
          style={{ strokeWidth: tooth11Diagnozis.inflamed_gums ? 5 :
              tooth11Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="pst2"
        style={{
          opacity:
            (tooth11Diagnozis.parodontit &&
              tooth11Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1048.9,353.6c-10.2-2-25.6-24.3-53.8-24.3c-36.8,0-45.3,23.1-54.8,23
                c-0.7,0-1.3-0.2-2-0.5l-16.4-163.3c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2
                c16.7-2.3,33.1-6.1,49.7-8.5c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8L1048.9,353.6z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1048.9,353.8c-10.2-2-25.6-24.3-53.8-24.3c-36.8,0-45.3,23.1-54.8,23
                c-0.7,0-1.3-0.2-2-0.5"
          style={{ strokeWidth: tooth11Diagnozis.inflamed_gums ? 5 :
              tooth11Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        className="pst3"
        style={{
          opacity:
            (tooth11Diagnozis.parodontit &&
              tooth11Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1048.8,307.3c-9.5-3.4-16.8-19.9-50.4-20.8c-42.6-1.2-57.1,21.2-64.1,25.4
                l-12.4-123.3c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2
                c16.7-2.3,33.1-6.1,49.7-8.5c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8L1048.8,307.3z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1048.8,307.5c-9.5-3.4-16.8-19.9-50.4-20.8c-42.6-1.2-57.1,21.2-64.1,25.4"
          style={{ strokeWidth: tooth11Diagnozis.inflamed_gums ? 5 :
              tooth11Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
