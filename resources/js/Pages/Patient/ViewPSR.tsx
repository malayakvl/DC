import React from 'react';
import { useSelector } from 'react-redux';
import MovingView from './PerioView/MovingView';
import FurkaciaView from './PerioView/FurkaciaView';
import BleedingView from './PerioView/BleedingView';
import FertilizerView from './PerioView/FertilizerView';
import DentalDepositsView from './PerioView/DentalDepositsView';
import YasenKrayView from './PerioView/YasenKrayView';
import DeepZondView from './PerioView/DeepZoondView';
import IntersectChart1828UpView from './PerioView/IntersectChart1828UpView';
import IntersectChart1828DownView from './PerioView/IntersectChart1828DownView'
import IntersectChart4838UpView from './PerioView/IntersectChart4838UpView'
import IntersectChart4838DownView from './PerioView/IntersectChart4838DownView'
import FormulaPerio1828View from './PerioView/FormulaPerio1828View';
import FormulaPerio4838View from './PerioView/FormulaPerio3848View';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../Lang/Formula/translation';
import PSR from './PSRView/index'
export default function ViewPSR({ psrData }) {
  const psr = JSON.parse(psrData.psr)

  return (
    <div className="py-0 w-full">
      <div className="w-full scroll-x">
        <PSR psrData={psr} />
      </div>
    </div>
  );
}
