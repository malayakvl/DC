import React from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import { useDispatch, useSelector } from 'react-redux';

export default function Bone38({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g
      id="bone_38"
      className="df-bone bottom"
      opacity="0"
      style={{ opacity: 0, transition: 'opacity' }}
    >
      <g className="periodontal level" style={{ visibility: 'inherit' }}>
        <path
          className="st0"
          d="M1785.6,1144.6c13.8,34.8,30.2,68.6,49.2,100.9c18.2,31.1,44.7,66.7,67.8,95.2
                            c6.6-2.5,13.2-5,19.7-7.7l2.2-294.4c-3,11.5-6.8,22.8-11.3,33.9c-3.7,9.1-7.8,18-13.4,26.4c-13,19.5-33,35-57.5,42.3
                            c-9,2.7-18.5,4.2-27.9,5.3c-8.3,1-16.8,1.6-24.7-0.9C1788.2,1145.3,1786.9,1144.8,1785.6,1144.6z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1924.4,1038.7c-3,11.5-6.8,22.8-11.3,33.9c-3.7,9.1-7.8,18-13.4,26.4
                            c-13,19.5-33,35-57.5,42.3c-9,2.7-18.5,4.2-27.9,5.3c-8.3,1-16.8,1.6-24.7-0.9c-1.3-0.4-2.7-0.9-4-1.1"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1791.8,1160c12.4,29.4,26.7,58,42.9,85.5c18.2,31.1,44.7,66.7,67.8,95.2
                            c6.6-2.5,13.2-5,19.7-7.7l2-262.1c-1.3,8.5-10.1,53.8-54.9,78.1C1832.3,1169.1,1804,1156.4,1791.8,1160z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1924.2,1070.9c-1.3,8.5-10.1,53.8-54.9,78.1c-36.9,20.1-65.2,7.4-77.4,10.9"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1800.7,1180c10.2,22.4,21.6,44.3,34.1,65.5c18.2,31.1,44.7,66.7,67.8,95.2
                            c6.6-2.5,13.2-5,19.7-7.7l1.7-229.2c-2,8.7-12.3,41.4-54.6,65.1C1836.5,1187.3,1813.2,1176.8,1800.7,1180z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1923.9,1103.9c-2,8.7-12.3,41.4-54.7,65.1c-32.7,18.3-56.1,7.8-68.6,11"
          style={{ strokeWidth: 2 }}
        />
      </g>
      <g className="periodontal level" style={{ visibility: 'hidden' }}>
        <path
          className="st0"
          d="M1807.9,1195.3c8.3,17.1,17.2,33.8,26.9,50.2c18.2,31.1,44.7,66.7,67.8,95.2
                            c6.6-2.5,13.2-5,19.7-7.7l1.5-199.6c-2.4,5.8-12.5,24.8-45.5,45.6C1847,1198.5,1816.4,1193,1807.9,1195.3z"
          style={{ strokeWidth: 2 }}
        />
        <path
          className="st43"
          d="M1923.7,1133.4c-2.4,5.8-12.5,24.8-45.6,45.6c-31.1,19.6-61.8,14.1-70.2,16.3"
          style={{ strokeWidth: 2 }}
        />
      </g>
    </g>
  );
}
