import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone12({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_12"
      className="df-bone top"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M944.8,416.6c-0.3,0-0.5,0-0.8,0.1c-4.6,0.3-10.5-1.8-12.5-2.8
                c-12.2-5.9-15.8-10.5-29.8-9.8c-11.2,0.5-16.1,3-25.8,7.9c-1.4,0.7-3,1.5-4.6,1.4l-36.1-267.3c0.1,0.3,0.1,0.5,0.2,0.8
                c1.1,3.8,2.7,7.6,4.8,11.1c4.6,7.9,11.3,14.4,19.5,19.1c7,4,14.8,6.7,23,8.5c1.4,0.3,2.8,0.6,4.1,0.8c11.6,2.1,23.3,2.8,35.1,2.4
                L944.8,416.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M944.8,416.8c-0.3,0-0.5,0-0.8,0.1c-4.6,0.3-10.5-1.8-12.5-2.8c-12.2-5.9-15.8-10.5-29.8-9.8
                c-11.2,0.5-16.1,3-25.8,7.9c-1.4,0.7-3,1.5-4.6,1.4"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M942.1,389.4c-8.8-0.2-17.7-15.9-40.1-15.6c-21.6,0.3-23.9,11.2-32.8,11.6
                c-0.5,0-1.1-0.1-1.6-0.3l-32.3-239.2c0.1,0.3,0.1,0.5,0.2,0.8c1.1,3.8,2.7,7.5,4.8,11.1c4.6,7.9,11.3,14.4,19.5,19.1
                c7,4,14.8,6.7,23,8.5c1.4,0.3,2.8,0.6,4.2,0.8c11.6,2.1,23.3,2.8,35.1,2.4L942.1,389.4z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M942.1,389.6c-8.8-0.2-17.7-15.9-40.1-15.6c-21.6,0.3-23.9,11.2-32.8,11.6
                c-0.5,0-1.1-0.1-1.6-0.3"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M938.3,351.9c-6.1-2.6-13.6-15.2-37-15.2c-26,0-29.5,16.2-36.9,16.3
                c-0.4,0-0.8-0.1-1.2-0.2l-27.9-206.8c0.1,0.3,0.1,0.5,0.2,0.8c1.1,3.8,2.7,7.5,4.8,11.1c4.6,7.9,11.3,14.4,19.5,19.1
                c7,4,14.8,6.7,23,8.5c1.4,0.3,2.8,0.6,4.2,0.8c11.6,2.1,23.3,2.8,35.1,2.4L938.3,351.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M938.3,352.1c-6.1-2.6-13.6-15.2-37-15.2c-26,0-29.5,16.2-36.9,16.3
                c-0.4,0-0.8-0.1-1.2-0.2"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M934.3,311.9c-0.6,0.3-1.1,0.5-1.5,0.6c-7.1,1.2-17-10.5-39.1-10.4
                c-20.1,0-29.5,15.8-35.4,14.5l-23-170.8c0.1,0.3,0.1,0.5,0.2,0.8c1.1,3.8,2.7,7.5,4.8,11.1c4.6,7.9,11.3,14.4,19.5,19.1
                c7,4,14.8,6.7,23,8.5c1.4,0.3,2.8,0.6,4.2,0.8c11.6,2.1,23.3,2.8,35.1,2.4L934.3,311.9z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M934.3,312.1c-0.6,0.3-1.1,0.5-1.5,0.6c-7.1,1.2-17-10.5-39.1-10.4
                c-20.1,0-29.5,15.8-35.4,14.5"
          style={{ strokeWidth: 2 }}
        />
      </g>
    </g>
  );
}
