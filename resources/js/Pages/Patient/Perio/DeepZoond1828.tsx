import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPerioZ1828VDataSelector,
  getPerioYK1828VDataSelector,
  chartKrayUpSelector,
  getPerioZ1828ODataSelector,
  getPerioYK1828ODataSelector,
} from '../../../Redux/Formula/selectors';
import {
  setPZondChart1828Up,
  setPBarChart1828Up,
  setPZondChart1828Down,
  setPBarChart1828Down,
  setPerioZ1828OralData,
} from '../../../Redux/Formula';
import {
  setPerioZ1828VestData,
  setPKrayChart1828Down,
  setPKrayChart1828Up,
} from '@/Redux/Formula/actions';

export default function DeepZond1828({ type = 'vest', idx = 0 }) {
  const dispatch = useDispatch<any>();
  const yasen1828VestData = useSelector(chartKrayUpSelector);

  const zv1828Data = useSelector(getPerioZ1828VDataSelector);
  const ykv1828Data = useSelector(getPerioYK1828VDataSelector);
  const zo1828Data = useSelector(getPerioZ1828ODataSelector);
  const yko1828Data = useSelector(getPerioYK1828ODataSelector);

  const [value, setValue] = useState(
    type === 'vest' ? zv1828Data[idx] : zo1828Data[idx]
  );

  const recalcSlice = type => {
    let arrYasen = ykv1828Data;
    let arrZond = zv1828Data;
    let arrYasenOral = yko1828Data;
    let arrZondOral = zo1828Data;
    const resNewYasn = [];
    const resNewZond = [];
    const chartnNewYasn = [];
    const chartNewZond = [];
    if (type === 'vest') {
      for (let i = 0; i < arrYasen.length; i++) {
        const zondVal = !isNaN(parseInt(arrZond[i])) ? parseInt(arrZond[i]) : 0;
        const yasnVal = !isNaN(parseInt(arrYasen[i]))
          ? parseInt(arrYasen[i])
          : 0;
        resNewYasn.push(-1 * yasnVal);
        resNewZond.push(-1 * (yasnVal - zondVal));
      }
    } else {
      for (let i = 0; i < arrYasenOral.length; i++) {
        const zondVal = !isNaN(parseInt(arrZondOral[i]))
          ? parseInt(arrZondOral[i])
          : 0;
        const yasnVal = !isNaN(parseInt(arrYasenOral[i]))
          ? parseInt(arrYasenOral[i])
          : 0;
        resNewYasn.push(yasnVal);
        resNewZond.push(yasnVal - zondVal);
      }
    }
    // calculate values for zond/yasen/bar chart
    const chartBar = [];
    for (let i = 0; i < resNewZond.length; i++) {
      chartNewZond.push(
        !isNaN(parseInt(resNewZond[i])) ? parseInt(resNewZond[i]) : 0
      );
      chartnNewYasn.push(
        !isNaN(parseInt(resNewYasn[i])) ? parseInt(resNewYasn[i]) : 0
      );
      chartBar.push([
        !isNaN(parseInt(resNewZond[i])) ? parseInt(resNewZond[i]) : 0,
        !isNaN(parseInt(resNewYasn[i])) ? parseInt(resNewYasn[i]) : 0,
      ]);
      // После каждого третьего элемента (индекс 2, 5, 8, ...)
      if ((i + 1) % 3 === 0 && i + 1 < resNewZond.length) {
        let avgZond = (resNewZond[i] + resNewZond[i + 1]) / 2;
        chartNewZond.push(avgZond);
        let avgYasn = (resNewYasn[i] + resNewYasn[i + 1]) / 2;
        chartnNewYasn.push(avgYasn);
        chartBar.push([0, 0]);
      }
    }
    chartNewZond.unshift(0);
    chartNewZond.push(0);
    chartnNewYasn.unshift(0);
    chartnNewYasn.push(0);
    chartBar.unshift(0);
    chartBar.push([0, 0]);

    if (type === 'vest') {
      dispatch(setPKrayChart1828Up(chartnNewYasn));
      dispatch(setPZondChart1828Up(chartNewZond));
      dispatch(setPBarChart1828Up(chartBar));
    } else {
      dispatch(setPKrayChart1828Down(chartnNewYasn));
      dispatch(setPZondChart1828Down(chartNewZond));
      dispatch(setPBarChart1828Down(chartBar));
    }
  };

  return (
    <input
      onChange={e => {
        if (type === 'vest') {
          const _pZData = zv1828Data;
          _pZData[idx] = parseInt(e.target.value);
          setValue(parseInt(e.target.value));
          e.target.style.color =
            Number(e.target.value) > 5
              ? 'red'
              : Number(e.target.value) === 5
                ? 'blue'
                : 'green';
          dispatch(setPerioZ1828VestData(_pZData));
        } else {
          const _pZData = zo1828Data;

          _pZData[idx] = parseInt(e.target.value);
          setValue(parseInt(e.target.value));
          e.target.style.color =
            Number(e.target.value) > 5
              ? 'red'
              : Number(e.target.value) === 5
                ? 'blue'
                : 'green';
          dispatch(setPerioZ1828OralData(_pZData));
        }

        recalcSlice(type);
      }}
      className="psr-input bottom focus:outline-hidden"
      value={value}
      maxLength={2}
      max={19}
      min={0}
      type="text"
    />
  );
}
