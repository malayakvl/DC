import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone11({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_11"
      className="df-bone top"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M1048.9,419.2C1048.9,419.2,1048.9,419.2,1048.9,419.2c-0.8,0.3-1.9,0.4-2.8,0.3
                c-1.1-0.2-2.1-0.7-3-1.2c-15.5-8.3-31-23.9-49.2-24c-17.9,0-27.5,13.2-43.2,20.5c-1.8,0.9-3.7,1.5-5.7,1.8l-22.9-228
                c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2c16.7-2.3,33-6.1,49.7-8.5
                c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8l0.4,189.4l-0.1,32v0L1048.9,419.2z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1048.9,419.4c-0.8,0.1-1.9,0.4-2.9,0.2c-1.1-0.2-2.1-0.7-3-1.2c-15.5-8.3-31-23.9-49.2-24
                c-17.9,0-27.5,13.2-43.2,20.5c-1.8,0.9-3.7,1.5-5.7,1.8"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1048.9,381.5l0,9.7c-11.3-2.6-30.3-22.6-53.2-22.7c-30.2-0.1-44.6,20.8-53.4,20.8
                h-0.2l-20.2-200.8c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2
                c16.7-2.3,33.1-6.1,49.7-8.5c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8L1048.9,381.5z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1048.9,391.4c-11.3-2.6-30.3-22.6-53.2-22.7c-30.2-0.1-44.6,20.8-53.4,20.8h-0.2"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1048.9,353.6c-10.2-2-25.6-24.3-53.8-24.3c-36.8,0-45.3,23.1-54.8,23
                c-0.7,0-1.3-0.2-2-0.5l-16.4-163.3c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2
                c16.7-2.3,33.1-6.1,49.7-8.5c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8L1048.9,353.6z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1048.9,353.8c-10.2-2-25.6-24.3-53.8-24.3c-36.8,0-45.3,23.1-54.8,23
                c-0.7,0-1.3-0.2-2-0.5"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1048.8,307.3c-9.5-3.4-16.8-19.9-50.4-20.8c-42.6-1.2-57.1,21.2-64.1,25.4
                l-12.4-123.3c6.9-0.2,13.8-0.8,20.7-1.7c0.1,0,0.2,0,0.2,0c0.9-0.1,1.8-0.2,2.7-0.4c0.4,0,0.8-0.1,1.2-0.2
                c16.7-2.3,33.1-6.1,49.7-8.5c8.3-1.2,16.7-2.2,25.1-2.7c8.9-0.6,17.9-0.9,26.9-0.8l0,17.8L1048.8,307.3z"
          style={{ strokeWidth: 2 }}
        ></path>
        <path
          className="st43"
          d="M1048.8,307.5c-9.5-3.4-16.8-19.9-50.4-20.8c-42.6-1.2-57.1,21.2-64.1,25.4"
          style={{ strokeWidth: 2 }}
        ></path>
      </g>
    </g>
  );
}
