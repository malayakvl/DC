import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone22({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_22"
      className="df-bone top"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M1262.6,145.9l-36,267c0,0-2.7,0.8-4,0.5c-5.1-1-9.3-2.9-13.2-5.1c-4.1-2.3-8.5-4.1-13.3-4.3
                c-14-0.7-23.6,8.9-35.8,14.8c-2,1-4.2,1.8-6.5,1.8c-0.4,0-0.8,0-1.2-0.1l23.3-232c11.8,0.4,23.5-0.2,35.1-2.4
                c1.4-0.3,2.8-0.5,4.1-0.8c8.2-1.8,16.1-4.4,23-8.5c8.1-4.7,14.8-11.2,19.5-19.1c2.1-3.5,3.7-7.2,4.8-11.1
                C1262.5,146.4,1262.5,146.2,1262.6,145.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1226.6,413.1c0,0-2.7,0.8-4,0.5c-5.1-1-9.3-2.9-13.2-5.1c-4.1-2.3-8.5-4.1-13.3-4.3
                c-14-0.7-23.6,8.9-35.8,14.8c-2,1-4.2,1.8-6.5,1.8c-0.4,0-0.8,0-1.2-0.1"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1155.8,389.4c8.8-0.2,17.7-15.9,40.1-15.6c21.6,0.3,23.9,11.2,32.8,11.6
                c0.5,0,1.1-0.1,1.6-0.3l32.3-239.2c-0.1,0.3-0.1,0.5-0.2,0.8c-1.1,3.8-2.7,7.5-4.8,11.1c-4.6,7.9-11.3,14.4-19.5,19.1
                c-7,4-14.8,6.7-23,8.5c-1.4,0.3-2.8,0.6-4.2,0.8c-11.6,2.1-23.3,2.8-35.1,2.4L1155.8,389.4z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1155.8,389.6c8.8-0.2,17.7-15.9,40.1-15.6c21.6,0.3,23.9,11.2,32.8,11.6
                c0.5,0,1.1-0.1,1.6-0.3"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1159.6,351.9c6.1-2.6,13.6-15.2,37-15.2c26,0,29.5,16.2,36.9,16.3
                c0.4,0,0.8-0.1,1.2-0.2l27.9-206.8c-0.1,0.3-0.1,0.5-0.2,0.8c-1.1,3.8-2.7,7.5-4.8,11.1c-4.6,7.9-11.3,14.4-19.5,19.1
                c-7,4-14.8,6.7-23,8.5c-1.4,0.3-2.8,0.6-4.2,0.8c-11.6,2.1-23.3,2.8-35.1,2.4L1159.6,351.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1159.6,352.1c6.1-2.6,13.6-15.2,37-15.2c26,0,29.5,16.2,36.9,16.3
                c0.4,0,0.8-0.1,1.2-0.2"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1163.6,311.9c0.6,0.3,1.1,0.5,1.5,0.6c7.1,1.2,17-10.5,39.1-10.4
                c20.1,0,29.5,15.8,35.4,14.5l23-170.8c-0.1,0.3-0.1,0.5-0.2,0.8c-1.1,3.8-2.7,7.5-4.8,11.1c-4.6,7.9-11.3,14.4-19.5,19.1
                c-7,4-14.8,6.7-23,8.5c-1.4,0.3-2.8,0.6-4.2,0.8c-11.6,2.1-23.3,2.8-35.1,2.4L1163.6,311.9z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1163.6,312.1c0.6,0.3,1.1,0.5,1.5,0.6c7.1,1.2,17-10.5,39.1-10.4
                c20.1,0,29.5,15.8,35.4,14.5"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
    </g>
  );
}
