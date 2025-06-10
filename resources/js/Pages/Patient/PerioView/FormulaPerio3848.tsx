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
import {
  getStatusesSelector,
  getActiveToothNumberSelector,
} from '../../../Redux/Formula/selectors';

export default function FormulaPerio3848() {
  const toothActive = useSelector(getStatusesSelector);
  const activeNumber = useSelector(getActiveToothNumberSelector);
  return (
    <section className="f-prerio">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 2085 1602.9"
        xmlSpace="preserve"
        width={'100%'}
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

        {/* <path className="yasen_edge top t18_28" style={{stroke: '#ff009e', strokeWidth: 3, transition: '0.5s'}} d="M0 170L32.5 170 L65 170 L97.5 170 L162.5 170 L195 170 L227.5 170 L292.5 170 L325 170 L357.5 170 L422.5 170 L455 170 L487.5 170 L552.5 170 L585 170 L617.5 170 L682.5 170 L715 170 L747.5 170 L812.5 170 L845 170 L877.5 170 L942.5 170 L975 170 L1007.5 170 L1072.5 170 L1105 170 L1137.5 170 L1202.5 170 L1235 170 L1267.5 170 L1332.5 170 L1365 170 L1397.5 170 L1462.5 170 L1495 170 L1527.5 170 L1592.5 170 L1625 170 L1657.5 170 L1722.5 170 L1755 170 L1787.5 170 L1852.5 170 L1885 170 L1917.5 170 L1982.5 170 L2015 170 L2047.5 170 L2080 170 L2080 170 L2047.5 170 L2015 170 L1982.5 170 L1917.5 170 L1885 170 L1852.5 170 L1787.5 170 L1755 170 L1722.5 170 L1657.5 170 L1625 170 L1592.5 170 L1527.5 170 L1495 170 L1462.5 170 L1397.5 170 L1365 170 L1332.5 170 L1267.5 170 L1235 170 L1202.5 170 L1137.5 170 L1105 170 L1072.5 170 L1007.5 170 L975 170 L942.5 170 L877.5 170 L845 170 L812.5 170 L747.5 170 L715 170 L682.5 170 L617.5 170 L585 170 L552.5 170 L487.5 170 L455 170 L422.5 170 L357.5 170 L325 170 L292.5 170 L227.5 170 L195 170 L162.5 170 L97.5 170 L65 170 L32.5 170 L0 170 Z"></path> */}

        <Tooth38 className={'bottom'} />
        <Tooth37 className={'bottom'} />
        <Tooth36 className={'bottom'} />
        <Tooth35 className={'bottom'} />
        <Tooth34 className={'bottom'} />
        <Tooth33 className={'bottom'} />
        <Tooth32 className={'bottom'} />
        <Tooth31 className={'bottom'} />
        <Tooth41 className={'bottom'} />
        <Tooth42 className={'bottom'} />
        <Tooth43 className={'bottom'} />
        <Tooth44 className={'bottom'} />
        <Tooth45 className={'bottom'} />
        <Tooth46 className={'bottom'} />
        <Tooth47 className={'bottom'} />
        <Tooth48 className={'bottom'} />

        {/* <path className="yasen_edge bottom t48_38" style={{stroke: '#ff009e', strokeWidth: 3, transition: '0.5s'}} d="M0 480L32.5 480 L65 480 L97.5 480 L162.5 480 L195 480 L227.5 480 L292.5 480 L325 480 L357.5 480 L422.5 480 L455 480 L487.5 480 L552.5 480 L585 480 L617.5 480 L682.5 480 L715 480 L747.5 480 L812.5 480 L845 480 L877.5 480 L942.5 480 L975 480 L1007.5 480 L1072.5 480 L1105 480 L1137.5 480 L1202.5 480 L1235 480 L1267.5 480 L1332.5 480 L1365 480 L1397.5 480 L1462.5 480 L1495 480 L1527.5 480 L1592.5 480 L1625 480 L1657.5 480 L1722.5 480 L1755 480 L1787.5 480 L1852.5 480 L1885 480 L1917.5 480 L1982.5 480 L2015 480 L2047.5 480 L2080 480 L2080 480 L2047.5 480 L2015 480 L1982.5 480 L1917.5 480 L1885 480 L1852.5 480 L1787.5 480 L1755 480 L1722.5 480 L1657.5 480 L1625 480 L1592.5 480 L1527.5 480 L1495 480 L1462.5 480 L1397.5 480 L1365 480 L1332.5 480 L1267.5 480 L1235 480 L1202.5 480 L1137.5 480 L1105 480 L1072.5 480 L1007.5 480 L975 480 L942.5 480 L877.5 480 L845 480 L812.5 480 L747.5 480 L715 480 L682.5 480 L617.5 480 L585 480 L552.5 480 L487.5 480 L455 480 L422.5 480 L357.5 480 L325 480 L292.5 480 L227.5 480 L195 480 L162.5 480 L97.5 480 L65 480 L32.5 480 L0 480 Z"></path> */}
      </svg>
    </section>
  );
}
