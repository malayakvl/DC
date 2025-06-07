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

export default function Bone14() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth14Diagnozis = teethDiagnozis.tooth14;
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
        !teethDiagnozis.tooth14.active &&
        !allTeeth &&
        document.getElementById('17').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth14.active &&
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
        className="periodontal level"
        style={{ opacity: tooth14Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M776.5,407.9c-0.3,0-0.6-0.1-0.9-0.2c-1.2-0.4-2.2-1.5-3-2.5c-2.2-2.6-4.5-5.1-6.9-7.6
                c-2.7-2.8-5.7-5.3-8.9-7.5c-2.7-1.8-5.5-3.4-8.6-4.6c-1.4-0.5-2.9-1-4.4-1.4c-2.7-0.6-5.5-0.9-8.4-0.7c-2.2,0.2-4.3,0.6-6.4,1.3
                c-2.9,0.9-5.7,2.3-8.3,3.8c-3.4,2-6.7,4.5-9.7,7.2c0,0,0,0,0,0c-3.1,2.4-6,4.9-8.7,7.9c-0.8,0.9-1.7,1.8-2.9,2
                c-0.2-1.9-0.4-3.9-0.6-6c-1.2-11.5-2.8-34.3-4.8-55.2c-0.4-4.5-0.8-8.9-1.3-13.1c-2.4-20.1-4.3-36.5-5.8-49.9
                c-0.2-1.7-0.4-3.4-0.6-5c-0.1-0.5-0.1-1-0.2-1.5c-0.8-7.5-1.5-13.9-2.1-19.2c4.2,0.7,8-1.1,10.5-5.7c1.3-2.5,2.2-6.4,2.2-9.5
                c0.1-3.2,0.4-6.5,1.4-9.8c1.1-3.6,4.7-7.1,9.5-8.4c2.9-0.8,6.1-0.6,8.9,0.2c2.6,0.7,5.1,1.9,6.6,3.6c1.4,1.7,2.1,3.9,5,4.2
                c3.1,0.4,4.8-1.9,5.6-4.3c4.5-13,6.1-26.9,8.2-40.4c1.3-8.5,2.6-16.9,3.3-25.4c0.8-9.3,1.4-18.7,1.7-28l2.8,0L776.5,407.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M777.5,408.9c-0.3,0-0.6-0.1-0.9-0.2c-1.2-0.4-3.2-2.5-4-3.5c-2.2-2.6-4.5-5.1-6.9-7.6
                c-2.7-2.8-5.7-5.3-8.9-7.5c-2.7-1.8-5.5-3.4-8.6-4.6c-1.4-0.5-2.9-1-4.4-1.4c-2.7-0.6-5.5-0.9-8.4-0.7c-2.2,0.2-4.3,0.6-6.4,1.3
                c-2.9,0.9-5.7,2.3-8.3,3.8c-3.4,2-6.7,4.5-9.7,7.2c0,0,0,0,0,0c-3.1,2.4-6,4.9-8.7,7.9c-0.8,0.9-1.7,1.8-2.9,2"
          style={{ strokeWidth: tooth14Diagnozis.inflamed_gums ? 5 :
              tooth14Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth14Diagnozis.parodontit &&
              tooth14Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M774.4,386.5c-6.9-2.6-11.5-19.8-36.9-21.2c-26-1.5-33.1,18.3-40.1,17.5
                c-0.1,0-0.2,0-0.3,0c-0.9-11.3-2-25.2-3.3-38.3c-0.4-4.5-0.8-8.9-1.3-13.1c-2.4-20.1-4.3-36.5-5.8-49.9c-0.2-1.7-0.4-3.4-0.6-5
                c-0.1-0.5-0.1-1-0.2-1.5c-0.8-7.5-1.5-13.9-2.1-19.2c4.2,0.7,8-1.1,10.5-5.7c1.3-2.5,2.2-6.4,2.2-9.5c0.1-3.2,0.4-6.5,1.4-9.8
                c1.1-3.6,4.7-7.1,9.5-8.4c2.9-0.8,6.1-0.6,8.9,0.2c2.6,0.7,5.1,1.9,6.6,3.6c1.4,1.7,2.1,3.9,5,4.2c3.1,0.4,4.8-1.9,5.6-4.3
                c4.6-13,6.1-26.9,8.2-40.4c1.3-8.5,2.6-16.9,3.3-25.4c0.8-9.3,1.4-18.7,1.7-28l2.8,0L774.4,386.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M774.4,386.5c-6.9-2.6-11.5-19.8-36.9-21.2c-26-1.5-33.1,18.3-40.1,17.5
                c-0.1,0-0.2,0-0.3,0"
          style={{ strokeWidth: tooth14Diagnozis.inflamed_gums ? 5 :
              tooth14Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth14Diagnozis.parodontit &&
              tooth14Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M770.9,350.8c-5,0-8.1-17.2-36.1-18.5c-27.2-0.4-31.8,14.2-39.7,13.7
                c-0.5,0-0.9-0.1-1.4-0.3c0-0.4-0.1-0.8-0.1-1.2c-0.4-4.5-0.8-8.9-1.3-13.1c-2.4-20.1-4.3-36.5-5.8-49.9c-0.2-1.7-0.4-3.4-0.6-5
                c-0.1-0.5-0.1-1-0.2-1.5c-0.8-7.5-1.5-13.9-2.1-19.2c4.2,0.7,8-1.1,10.5-5.7c1.3-2.5,2.2-6.4,2.2-9.5c0.1-3.2,0.4-6.5,1.4-9.8
                c1.1-3.6,4.7-7.1,9.5-8.4c2.9-0.8,6.1-0.6,8.9,0.2c2.6,0.7,5.1,1.9,6.6,3.6c1.4,1.7,2.1,3.9,5,4.2c3.1,0.4,4.8-1.9,5.6-4.3
                c4.6-13,6.1-26.9,8.2-40.4c1.3-8.5,2.6-16.9,3.3-25.4c0.8-9.3,1.4-18.7,1.7-28l2.8,0L770.9,350.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M770.9,350.8c-5,0-8.1-17.2-36.1-18.5c-27.2-0.4-31.8,14.2-39.7,13.7
                c-0.5,0-0.9-0.1-1.4-0.3"
          style={{ strokeWidth: tooth14Diagnozis.inflamed_gums ? 5 :
              tooth14Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth14Diagnozis.parodontit &&
              tooth14Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M766.8,309.9c-0.5,0.4-1,0.6-1.5,0.7c-6.3,0.5-11.8-18.1-37.4-17.5
                c-25.7,0.6-34.2,16.2-37.8,16.1c-0.1,0-0.3,0-0.5-0.1c-1.2-10.3-2.3-19.5-3.2-27.5c-0.2-1.7-0.4-3.4-0.6-5c-0.1-0.5-0.1-1-0.2-1.5
                c-0.8-7.5-1.5-13.9-2.1-19.2c4.2,0.7,8-1.1,10.5-5.7c1.3-2.5,2.2-6.4,2.2-9.5c0.1-3.2,0.4-6.5,1.4-9.8c1.1-3.6,4.7-7.1,9.5-8.4
                c2.9-0.8,6.1-0.6,8.9,0.2c2.6,0.7,5.1,1.9,6.6,3.6c1.4,1.7,2.1,3.9,5,4.2c3.1,0.4,4.8-1.9,5.6-4.3c4.6-13,6.1-26.9,8.2-40.4
                c1.3-8.5,2.6-16.9,3.3-25.4c0.8-9.3,1.4-18.7,1.7-28l2.8,0L766.8,309.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M766.8,309.9c-0.5,0.4-1,0.6-1.5,0.7c-6.3,0.5-11.8-18.1-37.4-17.5
                c-25.7,0.6-34.2,16.2-37.8,16.1c-0.1,0-0.3,0-0.5-0.1"
          style={{ strokeWidth: tooth14Diagnozis.inflamed_gums ? 5 :
              tooth14Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
