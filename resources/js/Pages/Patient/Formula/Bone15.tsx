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

export default function Bone15() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth15Diagnozis = teethDiagnozis.tooth15;
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
        !teethDiagnozis.tooth15.active &&
        !allTeeth &&
        document.getElementById('17').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth15.active &&
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
        style={{ opacity: tooth15Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M699.1,405.9C699.1,406,699.1,406,699.1,405.9c-0.1,0-0.2,0-0.3,0.1h0c-0.2,0-0.4,0-0.6,0
                c-0.9-0.1-1.8-0.6-2.5-1.2c-0.3-0.3-0.6-0.6-0.9-0.9c-0.1-0.2-0.3-0.3-0.4-0.5c-1.4-1.6-2.7-3.2-4-4.9c-0.2-0.3-0.5-0.6-0.8-0.9
                c0,0,0,0,0,0c-5.5-6.7-11.1-13.1-18.2-17.3c-0.6-0.4-1.3-0.7-2-1.1c-0.7-0.3-1.3-0.7-2-1c-1-0.4-2.1-0.8-3.1-1.2
                c-0.4-0.1-0.8-0.2-1.2-0.4c-1-0.3-2.1-0.5-3.2-0.7c-0.7-0.1-1.5-0.2-2.2-0.3c-3.1-0.3-6.2-0.2-9.3,0.4c-2,0.4-4,1-6,1.8
                c-0.8,0.3-1.6,0.7-2.3,1.1c-0.8,0.4-1.5,0.9-2.2,1.4c-0.4,0.2-0.7,0.5-1.1,0.8c-1.1,0.8-2.1,1.6-3.1,2.5c-0.4,0.4-0.9,0.8-1.3,1.2
                c-3.2,2.9-6.3,6-9.9,8.3c-0.8,0.5-1.7,1-2.6,1.5c-0.8,0.4-1.7,0.8-2.6,0.9c0-0.1,0-0.1,0-0.2c2.8-16.9,6-42,6-68.3
                c0-3.8,0-7.6-0.1-11.4c0-0.8,0-1.6,0-2.4c0-0.5,0-1,0-1.5c0-0.6,0-1.3,0-1.9c0-0.7,0-1.5-0.1-2.2c-0.2-8-0.5-15.8-0.9-22.9
                c0-0.4,0-0.8-0.1-1.1c-0.4-7.4-0.8-14-1.2-19.2c0,0,0,0,0,0c0-0.1,0-0.2,0-0.3c3.9-1.6,6.3-5.2,7.1-9.5c1.7-9,0.9-19.3,2.8-29.1
                c0.2-0.9,0.4-1.8,0.7-2.6c1.6-4.7,5-9,11.8-9.7c9.3-0.9,16.6,3.8,19.6,10.1c1.4,2.9,2.7,6,3.7,8.9c1.2,3.5,2.5,7.2,3.3,10.6
                c0.8,3,1.4,5.8,4.3,8.3c3,2.6,6.1,4.2,9,4.7c0.6,5.4,1.3,11.7,2.2,19.2c0,0.5,0.1,1,0.2,1.5c0.2,1.6,0.4,3.3,0.6,5
                c1.5,13.9,3.5,30.9,5.8,50.7c0.5,3.9,0.9,8,1.3,12.2c2.1,21,3.7,43.8,4.8,55.2c0.2,2.2,0.4,4.2,0.6,6
                C699.1,405.8,699.1,405.9,699.1,405.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M699.1,405.7c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0c-0.1,0-0.2,0-0.3,0h0c-0.2,0-0.4,0-0.6,0
                c-0.9-0.1-1.8-0.6-2.5-1.2c-0.3-0.3-0.6-0.6-0.9-0.9c-0.1-0.2-0.3-0.3-0.4-0.5c-1.4-1.6-2.7-3.2-4-4.9c-0.2-0.3-0.5-0.6-0.8-0.9
                c0,0,0,0,0,0c-5.5-6.7-11.1-13.1-18.2-17.3c-0.6-0.4-1.3-0.7-2-1.1c-0.7-0.3-1.3-0.7-2-1c-1-0.4-2.1-0.8-3.1-1.2
                c-0.4-0.1-0.8-0.2-1.2-0.4c-1-0.3-2.1-0.5-3.2-0.7c-0.7-0.1-1.5-0.2-2.2-0.3c-3.1-0.3-6.2-0.2-9.3,0.4c-2,0.4-4,1-6,1.8
                c-0.8,0.3-1.6,0.7-2.3,1.1c-0.8,0.4-1.5,0.9-2.2,1.4c-0.4,0.2-0.7,0.5-1.1,0.8c-1.1,0.8-2.1,1.6-3.1,2.5c-0.4,0.4-0.9,0.8-1.3,1.2
                c-3.2,2.9-6.3,6-9.9,8.3c-0.8,0.5-1.7,1-2.6,1.5c-0.8,0.4-1.7,0.8-2.6,0.9c0-0.1,0-0.1,0-0.2"
          style={{ strokeWidth: tooth15Diagnozis.inflamed_gums ? 5 :
              tooth15Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth15Diagnozis.parodontit &&
              tooth15Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M697,382.7c-6.9-1.4-14.5-21.7-38.2-24.6c-24-3-31,15.1-38.1,14.9c0,0,0,0,0,0
                c1.6-13.7,2.8-29.6,2.9-45.9c0-3.8,0-7.6-0.1-11.4c0-0.8,0-1.6,0-2.4c0-0.5,0-1,0-1.5c0-0.6,0-1.3,0-1.9c0-0.7,0-1.5,0-2.2
                c-0.2-8-0.5-15.8-0.9-22.9c0-0.4,0-0.8-0.1-1.1c-0.4-7.4-0.8-14-1.2-19.2c0,0,0,0,0,0c0-0.1,0-0.2,0-0.3c3.9-1.6,6.3-5.2,7.1-9.5
                c1.7-9,0.9-19.3,2.8-29c0.2-0.9,0.4-1.8,0.7-2.6c1.6-4.7,5-9,11.8-9.7c9.3-0.9,16.6,3.8,19.6,10.1c1.4,2.9,2.7,6,3.7,8.9
                c1.2,3.5,2.5,7.2,3.3,10.6c0.8,3,1.4,5.8,4.3,8.3c3,2.6,6.1,4.2,9,4.7c0.6,5.4,1.3,11.7,2.2,19.2c0.1,0.5,0.1,1,0.2,1.5
                c0.2,1.6,0.4,3.3,0.6,5c1.6,13.9,3.5,30.9,5.8,50.7c0.5,3.9,0.9,8,1.3,12.2C695,357.6,696.1,371.4,697,382.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M697,382.7c-6.9-1.4-14.5-21.7-38.2-24.6c-24-3-31,15.1-38.1,14.9c0,0,0,0,0,0"
          style={{ strokeWidth: tooth15Diagnozis.inflamed_gums ? 5 :
              tooth15Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth15Diagnozis.parodontit &&
              tooth15Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M693.8,345.7c-6-2.2-9.2-15.6-35.6-15.8c-24-0.1-27.8,12.5-35,12.8
                c0.2-5.1,0.4-10.3,0.4-15.6c0-3.8,0-7.6-0.1-11.4c0-0.8,0-1.6,0-2.4c0-0.5,0-1,0-1.5c0-0.6,0-1.3,0-1.9c0-0.7,0-1.5,0-2.2
                c-0.2-8-0.5-15.8-0.9-22.9c0-0.4,0-0.8-0.1-1.1c-0.4-7.4-0.8-14-1.2-19.2c0,0,0,0,0,0c0-0.1,0-0.2,0-0.3c3.9-1.6,6.3-5.2,7.1-9.5
                c1.7-9,0.9-19.3,2.8-29c0.2-0.9,0.4-1.8,0.7-2.6c1.6-4.7,5-9,11.8-9.7c9.3-0.9,16.6,3.8,19.6,10.1c1.4,2.9,2.7,6,3.7,8.9
                c1.2,3.5,2.5,7.2,3.3,10.6c0.8,3,1.4,5.8,4.3,8.3c3,2.6,6.1,4.2,9,4.7c0.6,5.4,1.3,11.7,2.2,19.2c0.1,0.5,0.1,1,0.2,1.5
                c0.2,1.6,0.4,3.3,0.6,5c1.6,13.9,3.5,30.9,5.8,50.7c0.5,3.9,0.9,8,1.3,12.2C693.7,344.9,693.7,345.3,693.8,345.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M693.8,345.7c-6-2.2-9.2-15.6-35.6-15.8c-24-0.1-27.8,12.5-35,12.8"
          style={{ strokeWidth: tooth15Diagnozis.inflamed_gums ? 5 :
              tooth15Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        style={{
          opacity:
            (tooth15Diagnozis.parodontit &&
              tooth15Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M689.6,309c-3.6-1.7-9.2-18.3-33.1-18.3c-22.9,0-28.2,13-33.2,14.3
                c-0.2-7-0.5-13.9-0.8-20.2c0-0.4,0-0.8-0.1-1.1c-0.4-7.4-0.8-14-1.2-19.2c0,0,0,0,0,0c0-0.1,0-0.2,0-0.3c3.9-1.6,6.3-5.2,7.1-9.5
                c1.7-9,0.9-19.3,2.8-29c0.2-0.9,0.4-1.8,0.7-2.6c1.6-4.7,5-9,11.8-9.7c9.3-0.9,16.6,3.8,19.6,10.1c1.4,2.9,2.7,6,3.7,8.9
                c1.2,3.5,2.5,7.2,3.3,10.6c0.8,3,1.4,5.8,4.3,8.3c3,2.6,6.1,4.2,9,4.7c0.6,5.4,1.3,11.7,2.2,19.2c0.1,0.5,0.1,1,0.2,1.5
                c0.2,1.6,0.4,3.3,0.6,5C687.4,289.6,688.5,298.8,689.6,309z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="pdt"
          d="M689.6,309c-3.6-1.7-9.2-18.3-33.1-18.3c-22.9,0-28.2,13-33.2,14.3"
          style={{ strokeWidth: tooth15Diagnozis.inflamed_gums ? 5 :
              tooth15Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
