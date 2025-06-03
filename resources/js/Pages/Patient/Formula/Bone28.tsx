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

export default function Bone28() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth28Diagnozis = teethDiagnozis.tooth28;
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
        !teethDiagnozis.tooth28.active &&
        !allTeeth &&
        document.getElementById('28').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth28.active &&
        !allTeeth &&
        document.getElementById('28').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(28));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              28,
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
        style={{ opacity: tooth28Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M1931.5,258.5c-1.3,1.7-2.5,3.3-3.7,5c-1.2,1.7-2.4,3.4-3.5,5.2c0,0,0,0,0,0c-0.7,1.1-1.4,2.3-2.1,3.4
                c-4,6.7-7.4,13.6-10.2,20.8c-3.3,8.5-5.9,17.4-8,26.1c-1.7,7-3.1,13.8-7.8,19.7c-0.3,0.4-0.6,0.7-0.8,1c0,0,0,0,0,0
                c-2.9,3.5-4.3,4.4-9.7,2.3c-2.9-1.2-12-6.2-16.3-8.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.2-0.1-0.4-0.2-0.6-0.3c-0.1-0.1-0.2-0.1-0.3-0.2
                c-0.4-0.2-0.8-0.4-1.2-0.6c-0.4-0.2-0.7-0.4-1.1-0.5c-3.4-1.6-6.6-2.8-9.8-3.8c-7.2-2.2-14.2-3.1-22.7-3.2h-0.1c-0.9,0-1.9,0-2.9,0
                c-1.3,0-2.7,0.1-4,0.2c-4.3,0.4-8.6,1.2-12.8,2.5c-0.9,0.3-1.8,0.5-2.8,0.9c0,0-0.1,0-0.1,0c-10.7,3.5-21.1,9.4-30,15.9
                c-2.1,1.5-4,3-5.9,4.6c-0.3,0.2-0.5,0.4-0.8,0.7c-3.6,3.2-7.2,6.5-12,7.4c-1.6-4.9-3.1-10-4.4-15.4c-0.3-1.1-0.5-2.2-0.8-3.3
                c-0.2-0.8-0.4-1.6-0.5-2.5c-0.5-2.5-1-5-1.5-7.5c-0.3-1.7-0.6-3.4-0.9-5c-0.1-0.7-0.2-1.5-0.4-2.2c-0.5-3.4-1-6.7-1.4-10.1
                c0-0.3-0.1-0.7-0.1-1c-0.1-1.1-0.3-2.3-0.4-3.4c-0.1-1.1-0.2-2.3-0.3-3.4c-0.1-1.1-0.2-2.1-0.3-3.2c-0.1-1.3-0.2-2.6-0.3-3.8
                c0-0.5-0.1-1-0.1-1.5c0-0.5,0-0.9-0.1-1.4c-0.1-1.1-0.1-2.2-0.1-3.3c0-0.4,0-0.9,0-1.3c0-1.5,0-3,0-4.5c0-0.4,0-0.8,0-1.2
                c0-0.4,0-0.8,0-1.2c0-0.7,0-1.3,0.1-1.9c0-0.7,0.1-1.4,0.1-2.1c0-0.7,0.1-1.3,0.1-2c0-0.6,0.1-1.2,0.1-1.8c0-0.6,0.1-1.1,0.1-1.7
                c0.1-1.4,0.2-2.8,0.3-4.2c0-0.1,0-0.3,0-0.4c0-0.4,0.1-0.9,0.1-1.3c0-0.4,0.1-0.9,0.1-1.3c0.2-1.8,0.3-3.5,0.5-5.2
                c0.1-0.6,0.1-1.3,0.2-1.9c0.1-0.6,0.2-1.2,0.2-1.9c0.1-0.4,0.1-0.8,0.2-1.2c0.1-0.9,0.2-1.7,0.3-2.6c0.1-0.8,0.2-1.7,0.3-2.5
                c0.2-0.1,0.5-0.2,0.7-0.3c6.4-2.9,10.7-6.9,15.7-10.9c7.1-5.8,11.2-13.6,13.9-21.7c0,0,0-0.1,0-0.1c0.2-0.5,0.3-1,0.5-1.5
                c2.6-8.1,5-16.3,7.2-24.5c4.5-16.2,9-32.5,9.8-48.9c0.1-2.9,0.2-5.9,0.1-8.8h0.8l129.6-0.1l0.1,112.5L1931.5,258.5z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1931.5,258.8c-1.3,1.7-2.5,3.3-3.7,5c-1.2,1.7-2.4,3.4-3.5,5.2c0,0,0,0,0,0
                c-0.7,1.1-1.4,2.3-2.1,3.4c-4,6.7-7.4,13.6-10.2,20.8c-3.3,8.5-5.9,17.4-8,26.1c-1.7,7-3.1,13.8-7.8,19.7c-0.3,0.4-0.6,0.7-0.8,1
                c0,0,0,0,0,0c-2.9,3.5-4.3,4.4-9.7,2.3c-2.9-1.2-12-6.2-16.3-8.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.2-0.1-0.4-0.2-0.6-0.3
                c-0.1-0.1-0.2-0.1-0.3-0.2c-0.4-0.2-0.8-0.4-1.2-0.6c-0.4-0.2-0.7-0.4-1.1-0.5c-3.4-1.6-6.6-2.8-9.8-3.8
                c-7.2-2.2-14.2-3.1-22.7-3.2h-0.1c-0.9,0-1.9,0-2.9,0c-1.3,0-2.7,0.1-4,0.2c-4.3,0.4-8.6,1.2-12.8,2.5c-0.9,0.3-1.8,0.5-2.8,0.9
                c0,0-0.1,0-0.1,0c-10.7,3.5-21.1,9.4-30,15.9c-2.1,1.5-4,3-5.9,4.6c-0.3,0.2-0.5,0.4-0.8,0.7c-3.6,3.2-7.2,6.5-12,7.4"
          style={{ strokeWidth: tooth28Diagnozis.inflamed_gums ? 5 :
              tooth28Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth28Diagnozis.parodontit &&
              tooth28Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1931.5,245.3c-20.4,19.5-24.3,42.1-29.5,60.3c-5.6,19.5-14.6,20.6-22.4,17.6
                c-9.7-3.8-24.9-14.1-62.7-9.7c-44.1,5.1-50.3,26.7-59.4,27.9h0c-0.3-1.1-0.5-2.2-0.8-3.3c-0.2-0.8-0.4-1.6-0.5-2.5
                c-0.5-2.5-1-5-1.5-7.5c-0.3-1.7-0.6-3.4-0.9-5c-0.1-0.7-0.2-1.5-0.4-2.2c-0.5-3.4-1-6.7-1.4-10.1c-0.2-1.5-0.3-2.9-0.5-4.4
                c-0.1-1.1-0.2-2.3-0.3-3.4c-0.1-1.1-0.2-2.1-0.3-3.2c-0.1-1.3-0.2-2.6-0.3-3.8c0-0.5-0.1-1-0.1-1.5c0-0.5,0-0.9-0.1-1.4
                c-0.1-1.1-0.1-2.2-0.1-3.3c0-0.4,0-0.9,0-1.3c0-1.5,0-3,0-4.5c0-0.4,0-0.8,0-1.2c0-0.4,0-0.8,0-1.2c0-0.7,0-1.3,0.1-1.9
                c0-0.7,0.1-1.4,0.1-2.1c0-0.7,0.1-1.3,0.1-2c0-0.6,0.1-1.2,0.1-1.8c0-0.6,0.1-1.1,0.1-1.7c0.1-1.4,0.2-2.8,0.3-4.2
                c0-0.5,0.1-1,0.1-1.5l0-0.2c0-0.4,0.1-0.9,0.1-1.3c0.2-1.8,0.3-3.5,0.5-5.2c0.1-0.6,0.1-1.3,0.2-1.9c0.1-0.6,0.2-1.2,0.2-1.9
                c0.1-0.4,0.1-0.8,0.2-1.2c0.1-0.9,0.2-1.7,0.3-2.6c0.1-0.8,0.2-1.7,0.3-2.5c0.2-0.1,0.5-0.2,0.7-0.3c6.4-2.9,10.7-6.9,15.7-10.9
                c7.1-5.8,11.2-13.6,13.9-21.7c0,0,0-0.1,0-0.1c0.5-1.2,0.9-2.4,1.3-3.7c2.6-8.1,5-16.3,7.2-24.5c4.5-16.2,9-32.5,9.8-48.9
                c0.1-2.2,0.2-4.4,0.1-6.6l129.6-0.1L1931.5,245.3z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1931.5,245.3c-20.4,19.5-24.3,42.1-29.5,60.3c-5.6,19.5-14.6,20.6-22.4,17.6
                c-9.7-3.8-24.9-14.1-62.7-9.7c-44.1,5.1-50.3,26.7-59.4,27.9h0"
          style={{ strokeWidth: tooth28Diagnozis.inflamed_gums ? 5 :
              tooth28Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth28Diagnozis.parodontit &&
              tooth28Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1931.5,230.7c-14.1,11.4-22.8,29.4-28.3,48.3c-6.1,20.9-12.1,28.6-20.3,26.9
                c-11.8-2.5-26.7-15.8-65.2-12.3c-41.5,4.7-53.9,23.1-64.8,24.4c-0.3-1.9-0.5-3.7-0.8-5.6c-0.1-0.9-0.2-1.8-0.3-2.6
                c-0.3-2.3-0.5-4.6-0.7-6.8c-0.1-1.1-0.2-2.1-0.3-3.2c-0.1-1.3-0.2-2.6-0.3-3.8c0-0.5-0.1-1-0.1-1.5c0-0.5,0-0.9-0.1-1.4
                c-0.1-1.1-0.1-2.2-0.1-3.3c0-0.4,0-0.9,0-1.3c0-1.5,0-3,0-4.5c0-0.4,0-0.8,0-1.2c0-0.4,0-0.8,0-1.2c0-0.7,0-1.3,0.1-1.9v-0.1
                c0.1-1.4,0.1-2.7,0.2-4.1c0-0.6,0.1-1.2,0.1-1.8c0-0.6,0.1-1.1,0.1-1.7c0-0.6,0.1-1.2,0.1-1.9c0.1-0.8,0.1-1.5,0.2-2.3
                c0-0.5,0.1-1,0.1-1.5l0-0.2c0-0.4,0.1-0.9,0.1-1.3c0.2-1.8,0.3-3.5,0.5-5.2c0.2-1.7,0.4-3.3,0.6-5c0.2-1.7,0.4-3.4,0.7-5
                c0.2-0.1,0.5-0.2,0.7-0.3c6.4-2.9,10.7-6.9,15.7-10.9c7.1-5.8,11.2-13.6,13.9-21.7c0,0,0-0.1,0-0.1c0.5-1.2,0.9-2.4,1.3-3.7
                c2.6-8.1,5-16.3,7.2-24.5c4.5-16.2,9-32.5,9.8-48.9c0.1-2.2,0.2-4.4,0.1-6.6l129.6-0.1L1931.5,230.7z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1931.5,230.7c-14.1,11.4-22.8,29.4-28.3,48.3c-6.1,20.9-12.1,28.6-20.3,26.9
                c-11.8-2.5-26.7-15.8-65.2-12.3c-41.5,4.7-53.9,23.1-64.8,24.4"
          style={{ strokeWidth: tooth28Diagnozis.inflamed_gums ? 5 :
              tooth28Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth28Diagnozis.parodontit &&
              tooth28Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M1931.5,212.7c-10.6,8.2-29.5,40.4-34.2,58.4c-4.6,17.9-6.8,21.5-20.6,15.1
                c-8.6-4-18.5-12-57.1-11.3c-49.8,0.9-60.2,19.6-68.7,19.8c-0.2,0-0.3,0-0.5,0c0-0.1,0-0.3,0-0.4c0-0.5,0-0.9-0.1-1.4
                c-0.1-1.1-0.1-2.2-0.1-3.3c0-0.4,0-0.9,0-1.3c0-1.5,0-3,0-4.5c0-0.8,0-1.6,0-2.4c0-0.7,0-1.3,0.1-1.9c0.1-2,0.2-4,0.3-6
                c0-0.6,0.1-1.1,0.1-1.7c0.1-0.8,0.1-1.6,0.2-2.4c0-0.6,0.1-1.2,0.1-1.8c0-0.1,0-0.3,0-0.4c0-0.4,0.1-0.9,0.1-1.3
                c0.3-3.5,0.7-7,1.1-10.2c0.1-0.7,0.2-1.3,0.2-2c0-0.2,0.1-0.4,0.1-0.6c0.1-0.5,0.1-1.1,0.2-1.6c0.1-0.7,0.2-1.4,0.3-2
                c0.2-0.1,0.5-0.2,0.7-0.3c6.4-2.9,10.7-6.9,15.7-10.9c7.1-5.8,11.2-13.6,13.9-21.7c0,0,0-0.1,0-0.1c0.5-1.2,0.9-2.5,1.3-3.7
                c2.6-8.1,5-16.3,7.2-24.5c4.5-16.2,9-32.5,9.8-48.9c0.1-2.2,0.2-4.4,0.1-6.6l129.6-0.1L1931.5,212.7z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M1931.5,212.7c-10.6,8.2-29.5,40.4-34.2,58.4c-4.6,17.9-6.8,21.5-20.6,15.1
                c-8.6-4-18.5-12-57.1-11.3c-49.8,0.9-60.2,19.6-68.7,19.8c-0.2,0-0.3,0-0.5,0"
          style={{ strokeWidth: tooth28Diagnozis.inflamed_gums ? 5 :
              tooth28Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
