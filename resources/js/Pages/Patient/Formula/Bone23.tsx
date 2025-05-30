import React from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone23({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_23"
      className="df-bone top"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M1348.6,132.3l-27.2,276.5c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0h0c-1.8,0-3.1-1.4-4.3-2.7
                c-4.3-4.9-10.4-10.2-16.1-14.7c-8.4-6.6-17-10.6-27-9.9c-5,0.3-9.7,1.4-14.1,4c-2.8,1.7-5.5,3.6-8.1,5.5
                c-4.2,3.1-8.3,6.9-11.2,10.2c-1.6,1.8-5.8,6.7-6.7,7.5c-0.8,0.7-2.1,1.3-3.1,2.2c-2,1.6-3.9,2.1-3.9,2.1l36-267
                c0-0.1,0-0.2,0.1-0.3c1-3.7,1.5-7.5,1.5-11.3v0l0.3-2.2l15.3,0l68.5,0.2H1348.6z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1321.4,409c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0h0c-1.8,0-3.1-1.4-4.3-2.7
                c-4.3-4.9-10.4-10.2-16.1-14.7c-8.4-6.6-17-10.6-27-9.9c-5,0.3-9.7,1.4-14.1,4c-2.8,1.7-5.5,3.6-8.1,5.5
                c-4.2,3.1-8.3,6.9-11.2,10.2c-1.6,1.8-5.8,6.7-6.7,7.5c-0.8,0.7-2.1,1.3-3.1,2.2c-2,1.6-3.9,2.1-3.9,2.1"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1230.3,385.1c7.5-2.7,16.6-24.4,47.2-23.1c32.9,1.4,38.5,26.7,45.6,24.6
                c0.2-0.1,0.3-0.1,0.5-0.2l25-254.2h-0.2l-68.5-0.2l-15.3,0l-0.3,2.2v0c0,3.8-0.5,7.6-1.5,11.3c0,0.1,0,0.2-0.1,0.3L1230.3,385.1z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1230.3,385.3c7.5-2.7,16.6-24.4,47.2-23.1c32.9,1.4,38.5,26.7,45.6,24.6
                c0.2-0.1,0.3-0.1,0.5-0.2"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1234.7,352.8c7.1-2.4,12-26.8,46.5-26.8c32.9,0.1,39.3,24.7,45.8,24.8h0.1
                l21.5-218.5h-0.2l-68.5-0.2l-15.3,0l-0.3,2.2v0c0,3.8-0.5,7.6-1.5,11.3c0,0.1,0,0.2-0.1,0.3L1234.7,352.8z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1234.7,353c7.1-2.4,12-26.8,46.5-26.8c32.9,0.1,39.3,24.7,45.8,24.8h0.1"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1239.6,316.7C1239.6,316.7,1239.6,316.7,1239.6,316.7c5.9-1.4,10-34.7,49.6-34.9
                c31.9-0.1,36.5,24,41.9,28.2l17.5-177.7h-0.2l-68.5-0.2l-15.3,0l-0.3,2.2v0c0,3.8-0.5,7.6-1.5,11.3c0,0.1,0,0.2-0.1,0.3
                L1239.6,316.7z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1239.6,316.9C1239.6,316.9,1239.6,316.9,1239.6,316.9c5.9-1.4,10-34.7,49.6-34.9
                c31.9-0.1,36.5,24,41.9,28.2"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
    </g>
  );
}
