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


export default function Bone18() {
  const dispatch = useDispatch<any>();
  const diagnozis = useSelector(getDiagnosisSelector);
  const subDiagnozis = useSelector(getSubDiagnosisSelector);
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const tooth18Diagnozis = teethDiagnozis.tooth18;
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
        !teethDiagnozis.tooth18.active &&
          !allTeeth &&
          document.getElementById('18').classList.add('tooth-number-hover');
      }}
      onMouseLeave={() => {
        !teethDiagnozis.tooth18.active &&
          !allTeeth &&
          document.getElementById('18').classList.remove('tooth-number-hover');
      }}
      onClick={() => {
        if (excludeToothEffect.includes(diagnozis)) {
          dispatch(setSelectedToothNumber(18));
          dispatch(setChangeDia(Math.random()));
          if (diagnozis) {
            const tDiaData = setupDiagnoze(
              18,
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
        style={{ opacity: tooth18Diagnozis.paradont_health ? 1 : 0 }}
      >
        <path
          className="st0"
          d="M347.4,295.9c-1.5,20.3-5.1,42.5-11.3,60.8c0,0-0.1,0-0.1,0c-0.3-0.1-0.5-0.1-0.8-0.2
                    c-0.3-0.1-0.6-0.2-0.9-0.3c-0.3-0.1-0.5-0.2-0.8-0.3c0,0-0.1,0-0.2-0.1c-0.3-0.1-0.5-0.2-0.8-0.3c0,0,0,0,0,0
                    c-0.3-0.1-0.6-0.3-0.8-0.4c0,0,0,0,0,0c-0.2-0.1-0.5-0.3-0.7-0.4c-0.3-0.2-0.7-0.4-1-0.7c-0.3-0.2-0.5-0.4-0.8-0.6
                    c-1.2-0.9-2.4-1.9-3.5-2.9c-0.7-0.6-1.5-1.3-2.2-1.9c-1.7-1.5-3.4-2.9-5.1-4.3h0c-0.2-0.2-0.5-0.4-0.7-0.6c-0.3-0.3-0.7-0.5-1-0.8
                    c-0.9-0.7-1.9-1.5-2.8-2.1c-2.9-2.1-5.8-4.1-8.8-5.9c-1-0.6-2-1.2-3.1-1.7c-0.5-0.3-1-0.5-1.5-0.8c-1-0.5-2.1-1-3.2-1.5
                    c-4-1.8-8.1-3.2-12.3-4.2c-4.2-0.9-8.6-1.4-13.1-1.2c-1,0-2,0.1-3,0.2c-12.3,1.1-18.6,2.6-28.7,7.2c-1.9,0.8-3.9,1.8-6.1,2.9
                    c-7.3,3.6-10,6.1-18.8,8.3c-5.7,1.4-10-0.9-13.5-5.3c-4.7-5.9-6.1-12.7-7.8-19.7c-2.1-8.7-4.7-17.6-8-26.1
                    c-4.8-12.2-11.4-23.8-19.6-34.4l0.2-125.7l129.6,0.1c0,2.2,0,4.4,0.1,6.6c0.8,16.4,5.3,32.7,9.8,48.9c2.2,8.2,4.7,16.3,7.2,24.5
                    c2.7,8.6,6.8,17.1,14.4,23.3c4.6,3.8,10.5,6.6,16.5,9.4c0.1,0.4,0.1,0.6,0.2,0.7c0-0.1-0.1-0.4-0.1-0.7c0,0,0,0,0,0
                    C346.3,259.3,348.6,279.3,347.4,295.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M336.2,356.7c0,0-0.1,0-0.1,0c-0.3-0.1-0.5-0.1-0.8-0.2c-0.3-0.1-0.6-0.2-0.9-0.3
                    c-0.3-0.1-0.5-0.2-0.8-0.3c0,0-0.1,0-0.2-0.1c-0.3-0.1-0.5-0.2-0.8-0.3c0,0,0,0,0,0c-0.3-0.1-0.6-0.3-0.8-0.4c0,0,0,0,0,0
                    c-0.2-0.1-0.5-0.3-0.7-0.4c-0.3-0.2-0.7-0.4-1-0.7c-0.3-0.2-0.5-0.4-0.8-0.6c-1.2-0.9-2.4-1.9-3.5-2.9c-0.7-0.6-1.5-1.3-2.2-1.9
                    c-1.7-1.5-3.4-2.9-5.1-4.3h0c-0.2-0.2-0.5-0.4-0.7-0.6c-0.3-0.3-0.7-0.5-1-0.8c-0.9-0.7-1.9-1.5-2.8-2.1c-2.9-2.1-5.8-4.1-8.8-5.9
                    c-1-0.6-2-1.2-3.1-1.7c-0.5-0.3-1-0.5-1.5-0.8c-1-0.5-2.1-1-3.2-1.5c-4-1.8-8.1-3.2-12.3-4.2c-4.2-0.9-8.6-1.4-13.1-1.2
                    c-1,0-2,0.1-3,0.2c-12.3,1.1-18.6,2.6-28.7,7.2c-1.9,0.8-3.9,1.8-6.1,2.9c-7.3,3.6-10,6.1-18.8,8.3c-5.7,1.4-10-0.9-13.5-5.3
                    c-4.7-5.9-6.1-12.7-7.8-19.7c-2.1-8.7-4.7-17.6-8-26.1c-4.8-12.2-11.4-23.8-19.6-34.4"
          style={{ strokeWidth: tooth18Diagnozis.inflamed_gums ? 5 :
              tooth18Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth18Diagnozis.parodontit &&
              tooth18Diagnozis.parodontit_stage === 'pst1') ||
            subDiagnozis === 'allst2'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M347.4,295.9c-1.1,14.9-3.3,30.8-6.9,45.4c-9.1-1.2-15.4-22.7-59.5-27.9
                    c-37.8-4.4-53,5.9-62.7,9.7c-7.8,3.1-16.8,1.9-22.5-17.6c-5.2-18.2-9.2-40.7-29.5-60.3l0.1-112.5l129.6,0.1c0,2.2,0,4.4,0.1,6.6
                    c0.8,16.4,5.3,32.7,9.8,48.9c2.2,8.2,4.7,16.4,7.2,24.5c2.7,8.6,6.8,17.1,14.4,23.3c4.7,3.8,10.5,6.6,16.5,9.4
                    c0.1,0.4,0.1,0.6,0.1,0.7c0-0.1,0-0.4-0.1-0.7c0,0,0,0,0,0C346.3,259.3,348.6,279.3,347.4,295.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M340.6,341.4c-9.1-1.2-15.4-22.7-59.5-27.9c-37.8-4.4-53,5.9-62.7,9.7
                    c-7.8,3.1-16.8,1.9-22.5-17.6c-5.2-18.2-9.2-40.7-29.5-60.3"
          style={{ strokeWidth: tooth18Diagnozis.inflamed_gums ? 5 :
              tooth18Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth18Diagnozis.parodontit &&
              tooth18Diagnozis.parodontit_stage === 'pst2') ||
            subDiagnozis === 'allst2'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M347.4,295.9c-0.5,7.2-1.3,14.7-2.4,22.1c-10.9-1.3-23.3-19.7-64.8-24.4
                    c-38.5-3.6-53.5,9.8-65.2,12.3c-8.1,1.7-14.2-5.9-20.3-26.9c-5.5-18.9-14.2-36.8-28.3-48.3l0.1-97.8l129.6,0.1c0,2.2,0,4.4,0.1,6.6
                    c0.8,16.4,5.3,32.7,9.8,48.9c2.2,8.2,4.7,16.4,7.2,24.5c2.7,8.6,6.8,17.1,14.4,23.3c4.6,3.8,10.5,6.6,16.5,9.4
                    c0.1,0.4,0.1,0.6,0.2,0.7c0-0.1-0.1-0.4-0.1-0.7c0,0,0,0,0,0C346.3,259.3,348.6,279.3,347.4,295.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M345,318c-10.9-1.3-23.3-19.7-64.8-24.4c-38.5-3.6-53.5,9.8-65.2,12.3
                    c-8.1,1.7-14.2-5.9-20.3-26.9c-5.5-18.9-14.2-36.8-28.3-48.3"
          style={{ strokeWidth: tooth18Diagnozis.inflamed_gums ? 5 :
              tooth18Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
      <g
        className="periodontal level"
        style={{
          opacity:
            (tooth18Diagnozis.parodontit &&
              tooth18Diagnozis.parodontit_stage === 'pst3') ||
            subDiagnozis === 'allst3'
              ? 1
              : 0,
        }}
      >
        <path
          className="st0"
          d="M347.5,294.8c-0.2,0-0.3,0-0.5,0c-8.6-0.3-19-18.9-68.7-19.8
                    c-38.6-0.7-48.4,7.2-57.1,11.3c-13.8,6.4-16,2.8-20.6-15.1c-4.7-18-23.6-50.3-34.2-58.4l0.1-79.9l129.6,0.1c0,2.2,0,4.4,0.1,6.6
                    c0.8,16.4,5.3,32.7,9.8,48.9c2.2,8.2,4.7,16.4,7.2,24.5c2.7,8.6,6.8,17.1,14.4,23.3c4.6,3.8,10.5,6.6,16.5,9.4
                    c0.1,0.4,0.1,0.6,0.2,0.7c0-0.1-0.1-0.4-0.1-0.7c0,0,0,0,0,0C346.2,258.9,348.5,278.4,347.5,294.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M347.5,294.8c-0.2,0-0.3,0-0.5,0c-8.6-0.3-19-18.9-68.7-19.8
                    c-38.6-0.7-48.4,7.2-57.1,11.3c-13.8,6.4-16,2.8-20.6-15.1c-4.7-18-23.6-50.3-34.2-58.4"
          style={{ strokeWidth: tooth18Diagnozis.inflamed_gums ? 5 :
              tooth18Diagnozis.significantly_gums ? 9: 2 }}
        />
      </g>
    </g>
  );
}
