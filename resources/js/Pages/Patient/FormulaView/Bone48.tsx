import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone48({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_48"
      className="df-bone bottom"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M313.3,1144.6c-13.8,34.8-30.2,68.6-49.2,100.9c-18.2,31.1-44.7,66.7-67.8,95.2
                c-6.6-2.5-13.2-5-19.7-7.7l-2.2-294.4c3,11.5,6.8,22.8,11.3,33.9c3.7,9.1,7.8,18,13.4,26.4c13,19.5,33,35,57.5,42.3
                c9,2.7,18.5,4.2,27.9,5.3c8.3,1,16.8,1.6,24.7-0.9C310.7,1145.3,312,1144.8,313.3,1144.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M174.5,1038.7c3,11.5,6.8,22.8,11.3,33.9c3.7,9.1,7.8,18,13.4,26.4c13,19.5,33,35,57.5,42.3
                c9,2.7,18.5,4.2,27.9,5.3c8.3,1,16.8,1.6,24.7-0.9c1.3-0.4,2.7-0.9,4-1.1"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M307,1160c-12.4,29.4-26.7,58-42.9,85.5c-18.2,31.1-44.7,66.7-67.8,95.2
                c-6.6-2.5-13.2-5-19.7-7.7l-2-262.1c1.3,8.5,10.1,53.8,54.9,78.1C266.5,1169.1,294.8,1156.4,307,1160z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M174.7,1070.9c1.3,8.5,10.1,53.8,54.9,78.1c36.9,20.1,65.2,7.4,77.4,10.9"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          id="bone_48_2"
          className="st0"
          d="M298.2,1180c-10.2,22.4-21.6,44.3-34.1,65.5c-18.2,31.1-44.7,66.7-67.8,95.2
                c-6.6-2.5-13.2-5-19.7-7.7l-1.7-229.2c2,8.7,12.3,41.4,54.6,65.1C262.3,1187.3,285.7,1176.8,298.2,1180z"
          style={{ strokeWidth: 2 }}
        />
        <path
          id="l_48_2"
          className="st43"
          d="M175,1103.9c2,8.7,12.3,41.4,54.6,65.1c32.7,18.3,56.1,7.8,68.6,11"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M291,1195.3c-8.3,17.1-17.2,33.8-26.9,50.2c-18.2,31.1-44.7,66.7-67.8,95.2
                c-6.6-2.5-13.2-5-19.7-7.7l-1.5-199.6c2.4,5.8,12.5,24.8,45.5,45.6C251.9,1198.5,282.5,1193,291,1195.3z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M175.2,1133.4c2.4,5.8,12.5,24.8,45.5,45.6c31.1,19.6,61.8,14.1,70.2,16.3"
          style={{ strokeWidth: 2 }}
        />
      </g>
    </g>
  );
}
