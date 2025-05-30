import React from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone31({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_31"
      className="df-bone bottom"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M1048.9,1218.5l0.7,298c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.1-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-2.1-48.9-4-101.8-5.8-151c-0.6-0.2-1.2-0.3-1.9-0.2
                c-2.3,0.1-4.1,1.7-5.7,3.2c-7,6.5-15.2,12.6-25.3,13.8c-10.2,1.1-20-2.9-26.4-9.8c-1.5-1.6-2.9-3.5-4.9-4.7
                C1049.7,1218.9,1049.3,1218.7,1048.9,1218.5z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1114.4,1216.9c-0.6-0.2-1.2-0.3-1.9-0.2c-2.3,0.1-4.1,1.7-5.7,3.2
                c-7,6.5-15.2,12.6-25.3,13.8c-10.2,1.1-20-2.9-26.4-9.8c-1.5-1.6-2.9-3.5-4.9-4.7c-0.4-0.2-0.8-0.4-1.2-0.6"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1048.9,1246.7l0.6,269.8c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.2-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-1.6-39.2-3.2-80.9-4.7-121.2c-0.5-0.2-0.9-0.3-1.4-0.3
                c-5.7,0-11.8,17.4-33.7,16.6C1059.5,1262.1,1056,1248.8,1048.9,1246.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1115.5,1246.7c-0.5-0.2-0.9-0.3-1.4-0.3c-5.7,0-11.8,17.4-33.7,16.6
                c-20.9-0.8-24.4-14.2-31.5-16.3"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1049,1275.8l0.6,240.8c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.2-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-1.2-29.5-2.4-60.5-3.6-91.3c-0.5-0.2-0.9-0.3-1.4-0.3
                c-5.8,0.1-10.7,14.7-32.6,14.4C1060.2,1290.3,1055.3,1278.4,1049,1275.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1116.6,1276.6c-0.5-0.2-0.9-0.3-1.4-0.3c-5.8,0.1-10.7,14.7-32.6,14.4
                c-22.4-0.4-27.3-12.4-33.6-14.9"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1049.1,1307.5l0.5,209c25.5-0.1,50.9-0.6,76.3-1.5c-1.5-38.5-3.2-84.3-4.7-124.5
                c-0.1-2.9-0.2-5.7-0.3-8.5c-0.2-4.8-0.4-9.5-0.6-14.1c-0.8-20.3-1.7-41.2-2.5-62.3c-0.5-0.3-1-0.4-1.4-0.4
                c-4.9,0.2-10.5,18.5-34.1,17.5C1058.7,1321.6,1055.3,1309.7,1049.1,1307.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1117.7,1305.6c-0.5-0.3-1-0.4-1.4-0.4c-4.9,0.2-10.5,18.5-34.1,17.5
                c-23.6-1.1-26.9-13-33.1-15.1"
          style={{ strokeWidth: 2 }}
        />
      </g>
    </g>
  );
}
