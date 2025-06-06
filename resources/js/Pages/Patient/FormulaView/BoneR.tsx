import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function BoneR({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g id="bone_r">
      <path
        id="bone_r"
        className="st1"
        d="M1924.4,1038.7c-3,11.5-6.8,22.8-11.3,33.9c-3.7,9.1-7.8,18-13.4,26.4
            c-13,19.5-33,35-57.5,42.3c-9,2.7-18.5,4.2-27.9,5.3c-8.3,1-16.8,1.6-24.7-0.9c-2.4-0.8-5.1-1.7-7.2-0.6c-0.9,0.5-1.5,1.3-2.1,2.1
            c-6.8,9-15.6,16.8-26,22.5c-12.2,6.7-26.2,10.4-40.3,13.5c-23.3,5.2-47.5,8.9-70.9,3.9c-2.9-0.6-5.9-1.4-8.8-0.8
            c-2.5,0.5-4.5,2-6.5,3.3c-22.4,15-50.7,20.6-78.8,23.3c-25,2.4-51,2.5-73-8.1c-2.8-1.4-5.7-2.9-8.9-2.7c-3,0.2-5.4,1.8-7.8,3.4
            c-10.2,6.7-21.3,12.8-34,14c-15.6,1.4-30.2-4.9-44.5-10.3c-4.1-1.6-8.3-3.1-12.7-2.7c-3.4,0.3-6.5,1.7-9.3,3.4
            c-6.5,4-11.3,9.7-17.8,13.6c-6.6,4.1-14.6,6.2-22.9,6.3c-8,0.1-15.7-1.8-22.6-5c-6.8-3.2-8.7-6.6-15.2-10.5c-1.9-1.2-4-2.3-6.4-2.3
            c-3,0-4.5,0.8-6.5,2.8c-6.1,5.8-12.3,19.7-18.5,25.1c-5.2,4.6-11.9,8.1-19.5,8.4c-10.1,0.4-21.8-8.8-28.5-15.1
            c-4.6-4.3-7.4-9.1-11.8-13.6c-1.4-1.4-3.1-2.8-5.2-2.7c-2.2,0.1-3.6,1.9-4.9,3.4c-3.8,4.6-9.7,11.6-14.7,14.8
            c-5.3,3.4-11.1,3.9-17.8,3.7c-11.5-0.4-17.5-10.9-26.1-17.5c-1.8-1.4-3.7-2.7-5.9-2.5c-2.4,0.1-4.1,1.7-5.8,3.2
            c-7,6.5-14.1,10.6-24.3,11.8c-10.2,1.1-23-2.9-29.4-9.8c-1.5-1.6-2.9-3.5-4.9-4.7c-0.4-0.2-0.8-0.4-1.2-0.6l0.7,298
            c40.9-0.1,81.7-1.3,122.5-3.7c20-1.1,40-2.6,59.8-5.8c40.9-6.7,79.5-21.1,119.9-29.8c31.4-6.7,63.6-10,95-16.4
            c33.3-6.8,65.6-17,97.9-26.6c42.6-12.7,85.6-24.6,129.2-34.7c37.7-8.7,76.1-16.2,113.7-25c31.3-7.3,61.7-15.5,92-25.8
            c14.4-4.8,28.5-10.1,42.5-15.8L1924.4,1038.7z"
      />
    </g>
  );
}
