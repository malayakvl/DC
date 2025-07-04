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

export default function Bone16() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth16Diagnozis = teethDiagnozis.tooth16;
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
        !teethDiagnozis.tooth16.active &&
        !allTeeth &&
        document.getElementById('17').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth16.active &&
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
        style={{ opacity: tooth16Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="pdtfill"
          d="M623.6,327.1c-0.1,26.4-3.3,51.6-6.1,68.6c-0.2,0-0.4,0-0.7,0c-0.6,0-1.2-0.2-1.7-0.5
                c-0.5-0.2-1.1-0.6-1.6-0.9c-0.4-0.3-0.9-0.6-1.3-0.9c-0.4-0.3-0.8-0.5-1.2-0.8c-0.1-0.1-0.1-0.1-0.2-0.2c-0.6-0.4-1.2-0.8-1.7-1.3
                c-0.2-0.1-0.4-0.3-0.5-0.4c-0.5-0.4-1-0.8-1.5-1.1c0,0-0.1-0.1-0.1-0.1c-0.7-0.5-1.3-1-2-1.6c-1-0.7-1.9-1.5-2.8-2.2
                c-0.6-0.5-1.3-1-2-1.5c-0.6-0.4-1.1-0.9-1.7-1.3c-0.7-0.5-1.4-1.1-2.2-1.6c-0.5-0.3-0.9-0.6-1.4-0.9c-0.6-0.4-1.2-0.8-1.8-1.2
                c-0.5-0.3-1-0.6-1.5-0.9c-0.5-0.3-0.9-0.5-1.4-0.8c-0.5-0.2-0.9-0.5-1.4-0.7c-0.1,0-0.2-0.1-0.3-0.1c-0.4-0.2-0.9-0.4-1.3-0.7
                c-1-0.5-2-0.9-3.1-1.4c-1-0.4-2-0.8-3.1-1.2c0,0,0,0,0,0c-0.5-0.2-1.1-0.4-1.6-0.6c-1.1-0.4-2.1-0.7-3.2-1.1
                c-0.5-0.2-1.1-0.3-1.6-0.5c-0.5-0.2-1.1-0.3-1.6-0.5c-3.8-1.1-7.8-1.9-11.7-2.7c-2.2-0.4-4.4-0.8-6.7-1.2c-1.1-0.2-2.1-0.3-3.2-0.5
                c-3-0.5-6.1-0.8-9.1-1.1c-0.7-0.1-1.4-0.1-2.1-0.2c-0.3,0-0.6,0-0.8-0.1c0,0,0,0,0,0c-4.6-0.4-9.1-0.5-13.7-0.5c-0.6,0-1.2,0-1.8,0
                c-0.6,0-1.2,0-1.8,0.1c-6.8,0.3-13.5,1.1-20,2.9c-0.2,0.1-0.4,0.1-0.6,0.2c-0.2,0.1-0.4,0.1-0.6,0.2c-0.7,0.2-1.3,0.4-2,0.6
                c-2.9,1-5.6,2.1-8.3,3.5h0c-1.7,0.8-3.2,1.8-4.8,2.8c-0.4,0.3-0.9,0.6-1.3,0.9c-0.4,0.3-0.9,0.6-1.3,0.9c-1.9,1.3-3.9,2.5-6.1,3
                c-0.5,0.1-1,0.2-1.5,0.2c-0.3,0-0.5,0-0.8,0c-0.3,0-0.5,0-0.8,0c0,0,0,0,0,0c1.8-13.3,3.8-32.5,4.1-55.1c0.1-7.5,0-14.7-0.2-21.4
                c0-1.4-0.1-2.8-0.1-4.1c0-1.1-0.1-2.1-0.1-3.1c0-0.6,0-1.2-0.1-1.8c-0.6-15.3-1.8-27.7-2.7-35.2c0.5,0,0.9,0,1.3,0
                c7.9-0.1,14.8-3.4,19-8.1c4.1-4.5,7.5-10.3,14.9-9.7c7,0.5,9.5,6.9,10.3,12.7c0.5,3.5,1.7,6.7,7.2,6.3c3.4-0.3,4.7-2.5,5.3-4.9
                c0.9-3.6,1.7-7.8,1.9-11.8c0.4-7.3,5-14.6,14.2-14c5.2,0.3,8.6,3.7,10.8,7.1c2.5,4,3.7,8.3,5.4,12.5c1,2.4,2.2,4.9,3,7.3
                c0.8,2.3,2.8,4.4,5.4,3.7c1.8-0.5,2-1.6,2-2.9c0.1-1.6,0.3-3.5,0.3-5.3c0-3.5,1.7-7.2,5.5-8.9c4.7-2,10.5-0.7,14.4,2.2
                c4.6,3.4,6.5,8.2,9,12.4c2.1,3.5,5,6.6,10.4,7.1c2.2,0.2,4,0,5.5-0.4c0,0,0.3-0.2,0.3-0.1c0,0,0,0,0,0c0.4,5.2,0.9,11.9,1.2,19.2
                c0,0.4,0,0.8,0.1,1.1c0.4,7.1,0.7,14.9,0.9,22.9c0,0.7,0,1.5,0.1,2.2c0,0.6,0,1.3,0,1.9c0,0.5,0,1,0,1.5c0,0.8,0,1.6,0,2.4
                C623.6,319.4,623.6,323.2,623.6,327.1z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M617.5,395.7c-0.2,0-0.4,0-0.7,0c-0.6,0-1.2-0.2-1.7-0.5c-0.5-0.2-1.1-0.6-1.6-0.9
                c-0.4-0.3-0.9-0.6-1.3-0.9c-0.4-0.3-0.8-0.5-1.2-0.8c-0.1-0.1-0.1-0.1-0.2-0.2c-0.6-0.4-1.2-0.8-1.7-1.3c-0.2-0.1-0.4-0.3-0.5-0.4
                c-0.5-0.4-1-0.8-1.5-1.1c0,0-0.1-0.1-0.1-0.1c-0.7-0.5-1.3-1-2-1.6c-1-0.7-1.9-1.5-2.8-2.2c-0.6-0.5-1.3-1-2-1.5
                c-0.6-0.4-1.1-0.9-1.7-1.3c-0.7-0.5-1.4-1.1-2.2-1.6c-0.5-0.3-0.9-0.6-1.4-0.9c-0.6-0.4-1.2-0.8-1.8-1.2c-0.5-0.3-1-0.6-1.5-0.9
                c-0.5-0.3-0.9-0.5-1.4-0.8c-0.5-0.2-0.9-0.5-1.4-0.7c-0.1,0-0.2-0.1-0.3-0.1c-0.4-0.2-0.9-0.4-1.3-0.7c-1-0.5-2-0.9-3.1-1.4
                c-1-0.4-2-0.8-3.1-1.2c0,0,0,0,0,0c-0.5-0.2-1.1-0.4-1.6-0.6c-1.1-0.4-2.1-0.7-3.2-1.1c-0.5-0.2-1.1-0.3-1.6-0.5
                c-0.5-0.2-1.1-0.3-1.6-0.5c-3.8-1.1-7.8-1.9-11.7-2.7c-2.2-0.4-4.4-0.8-6.7-1.2c-1.1-0.2-2.1-0.3-3.2-0.5c-3-0.5-6.1-0.8-9.1-1.1
                c-0.7-0.1-1.4-0.1-2.1-0.2c-0.3,0-0.6,0-0.8-0.1c0,0,0,0,0,0c-4.6-0.4-9.1-0.5-13.7-0.5c-0.6,0-1.2,0-1.8,0c-0.6,0-1.2,0-1.8,0.1
                c-6.8,0.3-13.5,1.1-20,2.9c-0.2,0.1-0.4,0.1-0.6,0.2c-0.2,0.1-0.4,0.1-0.6,0.2c-0.7,0.2-1.3,0.4-2,0.6c-2.9,1-5.6,2.1-8.3,3.5h0
                c-1.7,0.8-3.2,1.8-4.8,2.8c-0.4,0.3-0.9,0.6-1.3,0.9c-0.4,0.3-0.9,0.6-1.3,0.9c-1.9,1.3-3.9,2.5-6.1,3c-0.5,0.1-1,0.2-1.5,0.2
                c-0.3,0-0.5,0-0.8,0c-0.3,0-0.5,0-0.8,0c0,0,0,0,0,0"
          style={{ strokeWidth: tooth16Diagnozis.inflamed_gums ? 5 :
              tooth16Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth16Diagnozis.parodontit &&
              tooth16Diagnozis.parodontit_stage === 'pst1')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M623.6,327.1c-0.1,16.3-1.3,32.2-2.9,45.9c-5.9-0.3-23.6-22.3-63-26
                c-66.9-6.5-66.2,10.9-81.4,11.8c0.9-10,1.5-21.4,1.7-33.9c0.1-7.5,0-14.7-0.2-21.4c0-1.4-0.1-2.8-0.1-4.1c0-1.1-0.1-2.1-0.1-3.1
                c0-0.6,0-1.2-0.1-1.8c-0.7-15.3-1.8-27.7-2.7-35.2c0.4,0,0.9,0,1.3,0c7.9-0.1,14.8-3.4,19-8.1c4.1-4.5,7.5-10.3,14.9-9.7
                c7,0.5,9.5,6.9,10.3,12.7c0.5,3.5,1.7,6.7,7.2,6.3c3.4-0.3,4.7-2.5,5.3-4.9c0.9-3.6,1.7-7.8,1.9-11.8c0.4-7.3,5.1-14.6,14.2-14
                c5.2,0.3,8.7,3.6,10.8,7.1c2.4,4,3.7,8.3,5.4,12.5c1,2.4,2.2,4.9,3,7.3c0.8,2.3,2.8,4.4,5.4,3.7c1.8-0.5,2-1.6,2-2.9
                c0.1-1.6,0.3-3.5,0.3-5.3c0-3.5,1.7-7.2,5.5-8.9c4.7-2,10.5-0.7,14.4,2.2c4.6,3.4,6.5,8.2,9,12.4c2.1,3.5,5,6.6,10.4,7.1
                c2.2,0.2,4,0,5.5-0.4c0,0,0.3-0.2,0.3-0.1c0,0,0,0,0,0c0.4,5.2,0.9,11.9,1.2,19.2c0,0.4,0,0.8,0.1,1.1c0.4,7.1,0.7,14.9,0.9,22.9
                c0,0.7,0,1.5,0,2.2c0,0.6,0,1.3,0,1.9c0,0.5,0,1,0,1.5c0,0.8,0,1.6,0,2.4C623.6,319.4,623.6,323.2,623.6,327.1z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M620.7,373c-5.9-0.3-23.6-22.3-63-26c-66.9-6.5-66.2,10.9-81.4,11.8"
          style={{ strokeWidth: tooth16Diagnozis.inflamed_gums ? 5 :
              tooth16Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth16Diagnozis.parodontit &&
              tooth16Diagnozis.parodontit_stage === 'pst2')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M623.6,327.1c0,5.3-0.2,10.5-0.4,15.6c-0.1,0-0.1,0-0.2,0
                c-7.3,0.1-22.6-20-66.4-23.4c-52.6-4.1-68.1,13.3-77.5,12.8c-0.4,0-0.9-0.1-1.3-0.2c0.1-2.3,0.1-4.7,0.1-7.1
                c0.1-7.5,0-14.7-0.2-21.4c0-1.4-0.1-2.8-0.1-4.1c0-1.1-0.1-2.1-0.1-3.1c0-0.6,0-1.2-0.1-1.8c-0.7-15.3-1.8-27.7-2.7-35.2
                c0.4,0,0.9,0,1.3,0c7.9-0.1,14.8-3.4,19-8.1c4.1-4.5,7.5-10.3,14.9-9.7c7,0.5,9.5,6.9,10.3,12.7c0.5,3.5,1.7,6.7,7.2,6.3
                c3.4-0.3,4.7-2.5,5.3-4.9c0.9-3.6,1.7-7.8,1.9-11.8c0.4-7.3,5.1-14.6,14.2-14c5.2,0.3,8.7,3.6,10.8,7.1c2.4,4,3.7,8.3,5.4,12.5
                c1,2.4,2.2,4.9,3,7.3c0.8,2.3,2.8,4.4,5.4,3.7c1.8-0.5,2-1.6,2-2.9c0.1-1.6,0.3-3.5,0.3-5.3c0-3.5,1.7-7.2,5.5-8.9
                c4.7-2,10.5-0.7,14.4,2.2c4.6,3.4,6.5,8.2,9,12.4c2.1,3.5,5,6.6,10.4,7.1c2.2,0.2,4,0,5.5-0.4c0,0,0.3-0.2,0.3-0.1c0,0,0,0,0,0
                c0.4,5.2,0.9,11.9,1.2,19.2c0,0.4,0,0.8,0.1,1.1c0.4,7.1,0.7,14.9,0.9,22.9c0,0.7,0,1.5,0,2.2c0,0.6,0,1.3,0,1.9c0,0.5,0,1,0,1.5
                c0,0.8,0,1.6,0,2.4C623.6,319.4,623.6,323.2,623.6,327.1z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M623.2,342.7c-0.1,0-0.1,0-0.2,0c-7.3,0.1-22.6-20-66.4-23.4
                c-52.6-4.1-68.1,13.3-77.5,12.8c-0.4,0-0.9-0.1-1.3-0.2"
          style={{ strokeWidth: tooth16Diagnozis.inflamed_gums ? 5 :
              tooth16Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
      <g
        style={{
          opacity:
            (tooth16Diagnozis.parodontit &&
              tooth16Diagnozis.parodontit_stage === 'pst3')
              ? 1
              : 0,
        }}
      >
        <path
          className="pdtfill"
          d="M623.3,305c-0.3,0.1-0.6,0.1-0.8,0.1c-8.3-0.1-28.6-19.5-76.2-20
                c-41.1-0.5-59.3,14.4-68.5,15.2c0-0.4,0-0.7,0-1.1c0-1.1-0.1-2.1-0.1-3.1c0-0.6,0-1.2-0.1-1.8c-0.7-15.3-1.8-27.7-2.7-35.2
                c0.4,0,0.9,0,1.3,0c7.9-0.1,14.8-3.4,19-8.1c4.1-4.5,7.5-10.3,14.9-9.7c7,0.5,9.5,6.9,10.3,12.7c0.5,3.5,1.7,6.7,7.2,6.3
                c3.4-0.3,4.7-2.5,5.3-4.9c0.9-3.6,1.7-7.8,1.9-11.8c0.4-7.3,5.1-14.6,14.2-14c5.2,0.3,8.7,3.6,10.8,7.1c2.4,4,3.7,8.3,5.4,12.5
                c1,2.4,2.2,4.9,3,7.3c0.8,2.3,2.8,4.4,5.4,3.7c1.8-0.5,2-1.6,2-2.9c0.1-1.6,0.3-3.5,0.3-5.3c0-3.5,1.7-7.2,5.5-8.9
                c4.7-2,10.5-0.7,14.4,2.2c4.6,3.4,6.5,8.2,9,12.4c2.1,3.5,5,6.6,10.4,7.1c2.2,0.2,4,0,5.5-0.4c0,0,0.3-0.2,0.3-0.1c0,0,0,0,0,0
                c0.4,5.2,0.9,11.9,1.2,19.2c0,0.4,0,0.8,0.1,1.1C622.8,291.1,623.1,298,623.3,305z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="pdt"
          d="M623.3,305c-0.3,0.1-0.6,0.1-0.8,0.1c-8.3-0.1-28.6-19.5-76.2-20
                c-41.1-0.5-59.3,14.4-68.5,15.2"
          style={{ strokeWidth: tooth16Diagnozis.inflamed_gums ? 5 :
              tooth16Diagnozis.significantly_gums ? 9: 2 }}
        ></path>
      </g>
    </g>
  );
}
