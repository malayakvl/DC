import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone33({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_33"
      className="df-bone bottom"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M1184,1213.9c4.1,47.6,8.1,98.8,12.2,146.1c4.1,47.2,8.1,102.5,12.1,150.2
                        c7.9-0.8,15.7-1.8,23.5-3.1c21.4-3.5,42.2-9.2,62.9-14.9c-3.9-44.9-7.8-98.7-11.8-142.7c-4-44.5-8-90.9-11.9-135.6
                        c-0.3,0-0.6,0-1,0c-3,0-3.8,1.6-5.5,3.8c-7.4,9.3-12.3,19.7-18.5,25.1c-5.2,4.6-11.9,5.1-19.5,5.4c-10.1,0.4-16.8-3.8-23.5-10.1
                        c-4.6-4.3-10.4-17.1-14.8-21.6C1187,1215.3,1185.6,1214.2,1184,1213.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1271,1213.9c-0.3,0-0.6,0-1,0c-3,0-3.8,1.6-5.5,3.8c-7.4,9.3-12.3,19.7-18.5,25.1
                        c-5.2,4.6-11.9,5.1-19.5,5.4c-10.1,0.4-16.8-3.8-23.5-10.1c-4.6-4.3-10.4-17.1-14.8-21.6c-1.2-1.2-2.5-2.3-4.1-2.6"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1186.6,1244.5c3.2,38.5,6.4,78.2,9.6,115.5c4.1,47.2,8.1,102.5,12.2,150.2
                            c7.9-0.8,15.7-1.8,23.5-3.1c21.4-3.5,42.2-9.2,62.9-14.9c-3.9-44.9-7.8-98.7-11.8-142.7c-3.2-35.6-6.4-72.4-9.5-108.5
                            c-5.3,1.6-13.6,31.5-46.2,31.2C1196.2,1271.8,1192.5,1245,1186.6,1244.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1273.4,1240.9c-5.3,1.6-13.6,31.5-46.2,31.2c-31-0.3-34.6-27.1-40.5-27.7"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1189.3,1277.9c2.3,27.7,4.6,55.5,6.8,82.1c4.1,47.2,8.1,102.5,12.2,150.2
                            c7.9-0.8,15.7-1.8,23.5-3.1c21.4-3.5,42.2-9.2,62.9-14.9c-3.9-44.9-7.8-98.7-11.8-142.7c-2.2-24.7-4.4-50-6.6-75.3h-0.2
                            c-7.7,0.3-12.4,26.8-47.9,25.7C1198.2,1298.9,1195.1,1279.6,1189.3,1277.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1276.3,1274.2h-0.2c-7.7,0.3-12.4,26.8-47.9,25.7c-30-1-33.1-20.2-38.9-22"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1191.5,1304.5c1.6,18.8,3.1,37.5,4.7,55.5c4.1,47.2,8.1,102.5,12.2,150.2
                            c7.9-0.8,15.7-1.8,23.5-3.1c21.4-3.5,42.2-9.2,62.9-14.9c-3.9-44.9-7.8-98.7-11.8-142.7c-1.5-16.4-2.9-33.1-4.4-49.8
                            c-0.1,0-0.2,0-0.3,0c-6.8-0.2-7.9,28.9-43.3,30.2C1203.5,1330.9,1197,1306.1,1191.5,1304.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1278.5,1299.7c-0.1,0-0.2,0-0.3,0c-6.8-0.2-7.9,28.9-43.3,30.2
                            c-31.4,1.1-37.9-23.8-43.4-25.4"
          style={{ strokeWidth: 2 }}
        />
      </g>
    </g>
  );
}
