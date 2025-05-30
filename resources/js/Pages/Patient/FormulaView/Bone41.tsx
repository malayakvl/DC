import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone41({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_41"
      className="df-bone bottom"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M1050,1218.5l-0.7,298c-25.5-0.1-50.9-0.6-76.3-1.5c1.5-38.5,3.1-84.3,4.7-124.5
                        c0.1-2.9,0.2-5.7,0.3-8.5c0.2-4.8,0.4-9.5,0.6-14.1c2.1-48.9,4-101.8,5.8-151c0.6-0.2,1.2-0.3,1.9-0.2c2.3,0.1,4.1,1.7,5.7,3.2
                        c7,6.5,15.2,12.6,25.3,13.8c10.2,1.1,20-2.9,26.4-9.8c1.5-1.6,2.9-3.5,4.9-4.7C1049.2,1218.9,1049.6,1218.7,1050,1218.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M984.5,1216.9c0.6-0.2,1.2-0.3,1.9-0.2c2.3,0.1,4.1,1.7,5.7,3.2c7,6.5,15.2,12.6,25.3,13.8
                        c10.2,1.1,20-2.9,26.4-9.8c1.5-1.6,2.9-3.5,4.9-4.7c0.4-0.2,0.8-0.4,1.2-0.6"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1049.9,1246.7l-0.6,269.8c-25.5-0.1-50.9-0.6-76.3-1.5
                            c1.5-38.5,3.2-84.3,4.7-124.5c0.1-2.9,0.2-5.7,0.3-8.5c0.2-4.8,0.4-9.5,0.6-14.1c1.6-39.2,3.2-80.9,4.7-121.2
                            c0.5-0.2,0.9-0.3,1.4-0.3c5.7,0,11.8,17.4,33.7,16.6C1039.4,1262.1,1042.9,1248.8,1049.9,1246.7z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M983.4,1246.7c0.5-0.2,0.9-0.3,1.4-0.3c5.7,0,11.8,17.4,33.7,16.6
                            c20.9-0.8,24.4-14.2,31.5-16.3"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1049.9,1275.8l-0.6,240.8c-25.5-0.1-50.9-0.6-76.3-1.5
                            c1.5-38.5,3.2-84.3,4.7-124.5c0.1-2.9,0.2-5.7,0.3-8.5c0.2-4.8,0.4-9.5,0.6-14.1c1.2-29.5,2.4-60.5,3.6-91.3
                            c0.5-0.2,0.9-0.3,1.4-0.3c5.8,0.1,10.7,14.7,32.6,14.4C1038.7,1290.3,1043.5,1278.4,1049.9,1275.8z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M982.2,1276.6c0.5-0.2,0.9-0.3,1.4-0.3c5.8,0.1,10.7,14.7,32.6,14.4
                            c22.4-0.4,27.3-12.4,33.6-14.9"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1049.8,1307.5l-0.5,209c-25.5-0.1-50.9-0.6-76.3-1.5c1.5-38.5,3.2-84.3,4.7-124.5
                            c0.1-2.9,0.2-5.7,0.3-8.5c0.2-4.8,0.4-9.5,0.6-14.1c0.8-20.3,1.7-41.2,2.5-62.3c0.5-0.3,1-0.4,1.4-0.4c4.9,0.2,10.5,18.5,34.1,17.5
                            C1040.2,1321.6,1043.6,1309.7,1049.8,1307.5z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M981.1,1305.6c0.5-0.3,1-0.4,1.4-0.4c4.9,0.2,10.5,18.5,34.1,17.5
                            c23.6-1.1,26.9-13,33.1-15.1"
          style={{ strokeWidth: 2 }}
        />
      </g>
    </g>
  );
}
