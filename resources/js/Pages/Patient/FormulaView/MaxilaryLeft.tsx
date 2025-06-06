import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import InputText from '../../../Components/Form/InputText';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import {
  emptyProducersAutocompleteAction,
  findProducersAction,
} from '../../../Redux/Clinic';
import { useDispatch, useSelector } from 'react-redux';
import { userSearchResultsSelector } from '../../../Redux/Clinic/selectors';
import {
  categoryPercentSelector,
  sizeSearchResultsSelector,
  unitSearchResultsSelector,
} from '../../../Redux/Material/selectors';
import {
  emptySizeAction,
  emptyUnitAction,
  findSizeAction,
  findUnitAction,
  findPercentAction,
  setPercentAction,
} from '../../../Redux/Material';
import InputSelect from '../../../Components/Form/InputSelect';

export default function MaxilaryLeft({ className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });
  const dispatch = useDispatch();

  return (
    <g id="Maxillary_l" className="df-sinus">
      <path
        id="Maxillary_x5F_1_1_"
        className="st36"
        d="M305.1,90.5c-6.7,16-9.6,32.5-8.8,49.1c0.8,16.4,5.3,32.7,9.8,48.9
                c2.2,8.2,4.6,16.4,7.2,24.5c2.7,8.6,6.8,17.1,14.4,23.3c5,4.1,11.3,7,17.7,9.9c4.5,2.1,9.1,3.3,11.9,0.6c1.4-1.3,2.1-3,2.2-4.6
                c0.1-2.1,0.9-4.1,2.3-6c1.8-2.4,4.7-4.5,8.5-4.7c3.7-0.1,6.8,1.6,9.2,3.7c2.1,1.8,3.8,3.9,5.3,6c1.3,1.9,2.7,3.9,5.5,4.3
                c2.3,0.3,4.3-0.7,6-2c1.9-1.4,3.1-3.1,4-4.9c1.1-2.2,2-4.5,2.6-6.9c0.8-2.9,1.4-5.9,2.7-8.7c0.7-1.5,1.5-2.9,2.8-4.1
                c1.3-1.3,3.1-2.2,5-2.7c1.3-0.3,2.7-0.5,4.3-0.2c2.6,0.4,5.1,3.2,6.3,4.8c1.1,1.5,1.2,2.1,1.9,3.7c1.2,2.6,1.7,4.3,3.3,6.7
                c0.5,0.8,1.2,1.6,2.3,2c2.5,1,5.4,0.7,8.2,0.9c3,0.2,5.2,1.8,6.8,3.5c3,3.2,4.4,7,6.9,10.4c4.6,6.4,12.5,11.2,22.8,11.1
                c7.9-0.1,14.8-3.4,19.1-8.1c4.1-4.5,7.5-10.3,14.9-9.7c7,0.6,9.5,6.9,10.3,12.7c0.5,3.5,1.7,6.7,7.2,6.3c3.4-0.3,4.7-2.5,5.3-4.9
                c0.9-3.6,1.7-7.8,1.9-11.8c0.4-7.4,5.1-14.6,14.2-14c5.2,0.3,8.7,3.6,10.8,7.1c2.4,4,3.7,8.3,5.4,12.5c1,2.4,2.2,4.9,3,7.3
                c0.8,2.3,2.8,4.4,5.4,3.7c1.8-0.5,2-1.6,2-2.9c0.1-1.6,0.3-3.5,0.3-5.3c0-3.5,1.7-7.2,5.5-8.9c4.7-2,10.5-0.7,14.4,2.2
                c4.6,3.4,6.5,8.2,9,12.4c2.1,3.5,5,6.6,10.4,7.1c9.1,0.8,11.8-4,13-10.3c1.7-9,0.9-19.3,2.8-29.1c0.2-0.9,0.4-1.7,0.7-2.6
                c1.6-4.7,5-9,11.8-9.7c9.3-0.9,16.6,3.8,19.6,10.1c1.4,2.9,2.7,6,3.7,8.9c1.2,3.5,2.5,7.2,3.3,10.6c0.7,3,1.4,5.8,4.3,8.3
                c7.5,6.4,15.4,6.7,19.6-1c1.3-2.5,2.2-6.4,2.2-9.5c0.1-3.2,0.4-6.5,1.4-9.7c1.1-3.6,4.7-7.1,9.5-8.4c2.9-0.8,6.1-0.6,9,0.2
                c2.6,0.7,5.1,1.9,6.6,3.6c1.4,1.7,2.2,3.9,5,4.2c3.1,0.3,4.8-1.9,5.6-4.3c4.5-13,6.1-26.9,8.2-40.4c1.3-8.5,2.6-16.9,3.3-25.4
                c1.9-22.1,2.4-44.2,1.4-66.4L305.1,90.5z"
      />
    </g>
  );
}
