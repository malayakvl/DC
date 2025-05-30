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
import InputSelect from '../../../Components/Form/InputSelect';
import Tooth48 from './Tooth48';
import Tooth47 from './Tooth47';
import Tooth46 from './Tooth46';
import Tooth45 from './Tooth45';
import Tooth44 from './Tooth44';
import Tooth43 from './Tooth43';
import Tooth42 from './Tooth42';
import Tooth41 from './Tooth41';
import Tooth31 from './Tooth31';
import Tooth32 from './Tooth32';
import Tooth33 from './Tooth33';
import Tooth34 from './Tooth34';
import Tooth35 from './Tooth35';
import Tooth36 from './Tooth36';
import Tooth37 from './Tooth37';
import Tooth38 from './Tooth38';
import Tooth28 from './Tooth28';
import Tooth27 from './Tooth27';
import Tooth26 from './Tooth26';
import Tooth25 from './Tooth25';
import Tooth24 from './Tooth24';
import Tooth23 from './Tooth23';
import Tooth22 from './Tooth22';
import Tooth21 from './Tooth21';
import Tooth11 from './Tooth11';
import Tooth12 from './Tooth12';
import Tooth13 from './Tooth13';
import Tooth14 from './Tooth14';
import Tooth15 from './Tooth15';
import Tooth16 from './Tooth16';
import Tooth17 from './Tooth17';
import Tooth18 from './Tooth18';
//
import {
  getStatusesSelector,
  getActiveToothNumberSelector,
} from '../../../Redux/Formula/selectors';

export default function PSR() {
  const toothActive = useSelector(getStatusesSelector);
  const activeNumber = useSelector(getActiveToothNumberSelector);

  return (
    <div className="w-full scroll-x">
      <section className="psr-jaw-up">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 2085 550"
          xmlSpace="preserve"
        >
          <Tooth28 />
          <Tooth27 />
          <Tooth26 />
          <Tooth25 />
          <Tooth24 />
          <Tooth23 />
          <Tooth22 />
          <Tooth21 />
          <Tooth11 />
          <Tooth12 />
          <Tooth13 />
          <Tooth14 />
          <Tooth15 />
          <Tooth16 />
          <Tooth17 />
          <Tooth18 />
        </svg>
      </section>
      <div className="clearfix" />
      <div
        className="flex flex-row psr-b-inputs"
        style={{ margin: '15px 0', height: '32px' }}
      >
        <div
          style={{ maxWidth: '450px', margin: 'auto' }}
          className=" flex flex-row max-w-[650px]"
        >
          <div className="text-center mr-[60px]">
            <input type="text" className="psr" data-position="t14_17" />
          </div>
          <div className="text-center mr-[60px]">
            <input type="text" className="psr" data-position="t13_23" />
          </div>
          <div className="text-center">
            <input type="text" className="psr" data-position="t24_27" />
          </div>
        </div>
      </div>
      <div className="clearfix" />
      <div
        className="flex flex-row psr-b-inputs"
        style={{ margin: '15px 0', height: '32px' }}
      >
        <div
          style={{ maxWidth: '450px', margin: 'auto' }}
          className=" flex flex-row max-w-[650px]"
        >
          <div className="text-center mr-[60px]">
            <input type="text" className="psr" data-position="t14_17" />
          </div>
          <div className="text-center mr-[60px]">
            <input type="text" className="psr" data-position="t13_23" />
          </div>
          <div className="text-center">
            <input type="text" className="psr" data-position="t24_27" />
          </div>
        </div>
      </div>

      <section className="psr-jaw-down">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 1002.9 2085 550"
          xmlSpace="preserve"
        >
          <Tooth48 />
          <Tooth47 />
          <Tooth46 />
          <Tooth45 />
          <Tooth44 />
          <Tooth43 />
          <Tooth42 />
          <Tooth41 />
          <Tooth31 />
          <Tooth32 />
          <Tooth33 />
          <Tooth34 />
          <Tooth35 />
          <Tooth36 />
          <Tooth37 />
          <Tooth38 />
        </svg>
      </section>
    </div>
  );
}
