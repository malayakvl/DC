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

export default function Bone17() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth17Diagnozis = teethDiagnozis.tooth17;
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
        !teethDiagnozis.tooth17.active &&
        !allTeeth &&
        document.getElementById('17').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth17.active &&
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
        style={{ opacity: tooth17Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M478,324.8c-0.3,22.6-2.2,41.8-4.1,55.1c-0.5,0-0.9-0.1-1.4-0.2c-0.2,0-0.3-0.1-0.4-0.1
                c-0.7-0.2-1.3-0.4-1.9-0.7c-0.6-0.3-1.2-0.6-1.7-1c-0.5-0.3-0.9-0.6-1.4-1c-0.2-0.2-0.4-0.3-0.6-0.5c0,0-0.1-0.1-0.1-0.1
                c-0.2-0.2-0.5-0.4-0.7-0.7c-0.3-0.2-0.5-0.5-0.8-0.7c-0.5-0.5-1.1-1.1-1.6-1.7c-0.4-0.4-0.8-0.8-1.2-1.3c-0.3-0.3-0.6-0.6-0.8-0.9
                c-0.6-0.7-1.3-1.4-1.9-2c-7.5-7.5-17-13-27.1-16.8c-1.2-0.5-2.5-0.9-3.8-1.3c-1.8-0.6-3.6-1.1-5.5-1.6c-1.2-0.3-2.4-0.6-3.5-0.9
                c-1.2-0.3-2.4-0.5-3.6-0.8c-2.4-0.5-4.8-0.9-7.3-1.2c-0.8-0.1-1.6-0.2-2.4-0.3c-1.6-0.2-3.3-0.3-4.9-0.5c-0.8-0.1-1.6-0.1-2.5-0.2
                c-1.7-0.1-3.3-0.2-5-0.2c-1.8,0-3.5-0.1-5.3-0.1c-8.4,0-16.8,0.8-24.8,2.9c-4.1,1.1-8.1,2.5-11.9,4.2c-4.6,2.1-9.1,4.9-14.2,4.5
                c-0.2,0-0.5,0-0.7-0.1c-0.2,0-0.4-0.1-0.6-0.1c0,0-0.1,0-0.2,0c6.1-18.3,9.8-40.5,11.3-60.8c1.2-16.6-1.1-36.7-3.2-50.3
                c0.4,0.2,0.8,0.3,1.1,0.5c4.5,2.1,9.1,3.3,11.9,0.6c1.3-1.3,2.1-3,2.2-4.6c0.1-2.1,0.9-4.1,2.3-6c1.8-2.4,4.7-4.5,8.5-4.7
                c3.7-0.1,6.8,1.7,9.2,3.7c2.1,1.8,3.8,3.9,5.3,6c1.2,1.9,2.7,3.9,5.5,4.3c2.3,0.3,4.3-0.7,6-2c1.9-1.4,3.1-3.1,4-4.9
                c1.1-2.2,2-4.5,2.6-6.9c0.8-2.9,1.4-5.9,2.7-8.7c0.7-1.5,1.5-2.9,2.8-4.1c1.3-1.2,3.1-2.2,5-2.7c1.3-0.4,2.7-0.5,4.3-0.2
                c2.6,0.4,5.1,3.2,6.3,4.8c1.1,1.5,1.2,2.1,1.9,3.7c1.2,2.6,1.7,4.3,3.3,6.7c0.5,0.8,1.2,1.5,2.3,2c2.5,1,5.4,0.7,8.2,0.9
                c3,0.2,5.2,1.8,6.8,3.5c3,3.2,4.4,7,6.9,10.4c4.4,6,11.7,10.7,21.3,11.1c0.9,7.3,2.2,19.5,2.9,35.2c0,0.6,0.1,1.2,0.1,1.8
                c0,1,0.1,2.1,0.1,3.1c0,1.4,0.1,2.7,0.1,4.1C478,310.1,478.1,317.3,478,324.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M473.9,379.9c-0.5,0-0.9-0.1-1.4-0.2c-0.2,0-0.3-0.1-0.4-0.1c-0.7-0.2-1.3-0.4-1.9-0.7
                c-0.6-0.3-1.2-0.6-1.7-1c-0.5-0.3-0.9-0.6-1.4-1c-0.2-0.2-0.4-0.3-0.6-0.5c0,0-0.1-0.1-0.1-0.1c-0.2-0.2-0.5-0.4-0.7-0.7
                c-0.3-0.2-0.5-0.5-0.8-0.7c-0.5-0.5-1.1-1.1-1.6-1.7c-0.4-0.4-0.8-0.8-1.2-1.3c-0.3-0.3-0.6-0.6-0.8-0.9c-0.6-0.7-1.3-1.4-1.9-2
                c-7.5-7.5-17-13-27.1-16.8c-1.2-0.5-2.5-0.9-3.8-1.3c-1.8-0.6-3.6-1.1-5.5-1.6c-1.2-0.3-2.4-0.6-3.5-0.9c-1.2-0.3-2.4-0.5-3.6-0.8
                c-2.4-0.5-4.8-0.9-7.3-1.2c-0.8-0.1-1.6-0.2-2.4-0.3c-1.6-0.2-3.3-0.3-4.9-0.5c-0.8-0.1-1.6-0.1-2.5-0.2c-1.7-0.1-3.3-0.2-5-0.2
                c-1.8,0-3.5-0.1-5.3-0.1c-8.4,0-16.8,0.8-24.8,2.9c-4.1,1.1-8.1,2.5-11.9,4.2c-4.6,2.1-9.1,4.9-14.2,4.5c-0.2,0-0.5,0-0.7-0.1
                c-0.2,0-0.4-0.1-0.6-0.1c0,0-0.1,0-0.2,0"
          style={{ strokeWidth: tooth17Diagnozis.inflamed_gums ? 5 :
              tooth17Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth17Diagnozis.parodontit &&
              tooth17Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M478,324.8c-0.1,12.5-0.8,24-1.7,33.9c-0.1,0-0.1,0-0.2,0
                c-14.6,0.7-10.6-21.3-62.2-27.1c-42.7-4.9-62.9,10.9-73.2,9.8c-0.1,0-0.1,0-0.2,0c3.5-14.6,5.8-30.5,6.9-45.4
                c1.2-16.6-1.1-36.7-3.2-50.3c0.4,0.2,0.8,0.3,1.1,0.5c4.5,2.1,9.1,3.3,11.9,0.6c1.4-1.3,2.1-3,2.2-4.6c0.1-2.1,0.9-4.2,2.3-6
                c1.8-2.4,4.7-4.5,8.5-4.7c3.7-0.1,6.8,1.7,9.2,3.7c2.1,1.8,3.8,3.9,5.3,6c1.2,1.9,2.7,3.9,5.5,4.3c2.3,0.3,4.3-0.7,6-2
                c1.9-1.4,3.1-3.1,4-4.9c1.1-2.2,2-4.5,2.6-6.9c0.8-2.9,1.4-5.9,2.7-8.7c0.7-1.5,1.5-2.9,2.8-4.1c1.3-1.2,3.1-2.2,5-2.7
                c1.3-0.4,2.7-0.5,4.3-0.2c2.6,0.4,5.1,3.2,6.3,4.8c1.1,1.5,1.2,2.1,1.9,3.7c1.2,2.6,1.7,4.3,3.3,6.7c0.5,0.8,1.2,1.5,2.3,2
                c2.5,1,5.4,0.7,8.2,0.9c3,0.2,5.2,1.8,6.8,3.5c2.9,3.2,4.4,7,6.9,10.4c4.4,6,11.7,10.7,21.3,11.1c0.9,7.3,2.2,19.5,2.9,35.2
                c0,0.6,0.1,1.2,0.1,1.8c0,1,0.1,2.1,0.1,3.1c0,1.4,0.1,2.7,0.1,4.1C478,310.1,478.1,317.3,478,324.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M476.3,358.7c-0.1,0-0.1,0-0.2,0c-14.6,0.7-10.6-21.3-62.2-27.1
                c-42.7-4.9-62.9,10.9-73.2,9.8c-0.1,0-0.1,0-0.2,0"
          style={{ strokeWidth: tooth17Diagnozis.inflamed_gums ? 5 :
              tooth17Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth17Diagnozis.parodontit &&
              tooth17Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M478,324.8c0,2.4-0.1,4.8-0.1,7.1c-8.7-2-16-18.5-61.6-24.4
                c-53.1-5.7-58.3,11.9-70.9,10.6c-0.1,0-0.2,0-0.2,0c1.1-7.4,1.9-14.9,2.4-22.1c1.2-16.6-1.1-36.7-3.2-50.3c0.4,0.2,0.8,0.3,1.1,0.5
                c4.5,2.1,9.1,3.3,11.9,0.6c1.4-1.3,2.1-3,2.2-4.6c0.1-2.1,0.9-4.2,2.3-6c1.8-2.4,4.7-4.5,8.5-4.7c3.7-0.1,6.8,1.7,9.2,3.7
                c2.1,1.8,3.8,3.9,5.3,6c1.2,1.9,2.7,3.9,5.5,4.3c2.3,0.3,4.3-0.7,6-2c1.9-1.4,3.1-3.1,4-4.9c1.1-2.2,2-4.5,2.6-6.9
                c0.8-2.9,1.4-5.9,2.7-8.7c0.7-1.5,1.5-2.9,2.8-4.1c1.3-1.2,3.1-2.2,5-2.7c1.3-0.4,2.7-0.5,4.3-0.2c2.6,0.4,5.1,3.2,6.3,4.8
                c1.1,1.5,1.2,2.1,1.9,3.7c1.2,2.6,1.7,4.3,3.3,6.7c0.5,0.8,1.2,1.5,2.3,2c2.5,1,5.4,0.7,8.2,0.9c3,0.2,5.2,1.8,6.8,3.5
                c2.9,3.2,4.4,7,6.9,10.4c4.4,6,11.7,10.7,21.3,11.1c0.9,7.3,2.2,19.5,2.9,35.2c0,0.6,0.1,1.2,0.1,1.8c0,1,0.1,2.1,0.1,3.1
                c0,1.4,0.1,2.7,0.1,4.1C478,310.1,478.1,317.3,478,324.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M477.8,331.8c-8.7-2-16-18.5-61.6-24.4c-53.1-5.7-58.3,11.9-70.9,10.6
                c-0.1,0-0.2,0-0.2,0"
          style={{ strokeWidth: tooth17Diagnozis.inflamed_gums ? 5 :
              tooth17Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth17Diagnozis.parodontit &&
              tooth17Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M477.7,300.3c-0.3,0-0.6,0-0.8,0c-9.3-0.1-17.9-17.8-67.1-18.6
                c-42.4-0.7-50.3,13-62.3,13.1c1-16.4-1.3-35.8-3.3-49.2c0.4,0.2,0.8,0.3,1.1,0.5c4.5,2.1,9.1,3.3,11.9,0.6c1.4-1.3,2.1-3,2.2-4.6
                c0.1-2.1,0.9-4.2,2.3-6c1.8-2.4,4.7-4.5,8.5-4.7c3.7-0.1,6.8,1.7,9.2,3.7c2.1,1.8,3.8,3.9,5.3,6c1.2,1.9,2.7,3.9,5.5,4.3
                c2.3,0.3,4.3-0.7,6-2c1.9-1.4,3.1-3.1,4-4.9c1.1-2.2,2-4.5,2.6-6.9c0.8-2.9,1.4-5.9,2.7-8.7c0.7-1.5,1.5-2.9,2.8-4.1
                c1.3-1.2,3.1-2.2,5-2.7c1.3-0.4,2.7-0.5,4.3-0.2c2.6,0.4,5.1,3.2,6.3,4.8c1.1,1.5,1.2,2.1,1.9,3.7c1.2,2.6,1.7,4.3,3.3,6.7
                c0.5,0.8,1.2,1.5,2.3,2c2.5,1,5.4,0.7,8.2,0.9c3,0.2,5.2,1.8,6.8,3.5c2.9,3.2,4.4,7,6.9,10.4c4.4,6,11.7,10.7,21.3,11.1
                c0.9,7.3,2.2,19.5,2.9,35.2c0,0.6,0.1,1.2,0.1,1.8c0,1,0.1,2.1,0.1,3.1C477.7,299.6,477.7,300,477.7,300.3z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M477.7,299.3c0,0.4,0,0.7,0,1.1c-0.3,0-0.6,0-0.8,0c-9.3-0.1-17.9-17.8-67.1-18.6
                c-42.4-0.7-50.3,13-62.3,13.1"
          style={{ strokeWidth: tooth17Diagnozis.inflamed_gums ? 5 :
              tooth17Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
