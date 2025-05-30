import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone46({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_45"
      className="df-bone bottom"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M728.2,1206.3c-6.3,40.9-14.5,83.3-24.5,123.3c-10.6,42.2-25.3,91.9-40.2,133.4
                c-3.8-0.7-7.5-1.4-11.3-2.2c-31.6-6.4-62.3-15.9-93-25.2c15.4-33.9,33.6-76.9,44.1-111.1c12-39.4,21.2-81.7,27.3-122.6
                c0.4,0,0.9,0,1.3,0c2.9,0.2,5.4,1.8,7.8,3.4c10.2,6.7,21.3,12.8,34,13.9c15.6,1.4,30.2-4.9,44.5-10.3
                C721.4,1207.8,724.7,1206.6,728.2,1206.3z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M630.6,1202.1c0.4,0,0.9,0,1.3,0c2.9,0.2,5.4,1.8,7.8,3.4c10.2,6.7,21.3,12.8,34,13.9
                c15.6,1.4,30.2-4.9,44.5-10.3c3.3-1.2,6.6-2.5,10-2.7"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M723.9,1232.4c-5.6,32.6-12.4,65.7-20.3,97.3c-10.6,42.2-25.3,91.9-40.2,133.4
                c-3.8-0.7-7.5-1.4-11.3-2.2c-31.6-6.4-62.2-15.9-93-25.2c15.4-33.9,33.6-76.9,44.1-111.1c9.5-31.3,17.3-64.3,23.1-97.1
                c0.4,0,0.8,0,1.2,0.1c7.9,1.7,22.7,17.3,51.8,17.2C709.7,1244.9,718,1232.3,723.9,1232.4z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M626.4,1227.6c0.4,0,0.8,0,1.2,0.1c7.9,1.7,22.7,17.3,51.8,17.2
                c30.3-0.1,38.6-12.6,44.5-12.5"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M718.8,1260.4c-4.5,23.4-9.6,46.7-15.2,69.3c-10.6,42.2-25.3,91.9-40.2,133.4
                c-3.8-0.7-7.5-1.4-11.3-2.2c-31.6-6.4-62.2-15.9-93-25.2c15.4-33.9,33.6-76.9,44.1-111.1c6.9-22.8,12.9-46.5,17.9-70.4
                c0.3,0,0.6,0,0.8,0.1c7.5,1.1,21.6,20.6,50.7,20.6C703.1,1274.8,711.9,1260.4,718.8,1260.4z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M621.2,1254.3c0.3,0,0.6,0,0.8,0.1c7.5,1.1,21.6,20.6,50.7,20.6
                c30.3-0.1,39.2-14.5,46.1-14.5"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M713.6,1286.4c-3.1,14.6-6.4,29.1-10,43.2c-10.6,42.2-25.3,91.9-40.2,133.4
                c-3.8-0.7-7.5-1.4-11.3-2.2c-31.6-6.4-62.2-15.9-93-25.2c15.4-33.9,33.6-76.9,44.1-111.1c4.3-14.3,8.3-28.9,11.9-43.7
                c0.1,0,0.1,0,0.2,0c8.1,1.5,21.6,18.4,50.7,18.4C695.9,1299.2,707.3,1286.9,713.6,1286.4z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M615.2,1280.9c0.1,0,0.1,0,0.2,0c8.1,1.5,21.6,18.4,50.7,18.4
                c29.8-0.1,41.3-12.4,47.5-12.9"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
    </g>
  );
}
