import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPerioZ4838VDataSelector,
  getPerioYK4838VDataSelector,
  getPerioZ4838ODataSelector,
  getPerioYK4838ODataSelector,
} from '../../../Redux/Formula/selectors';
import {
  setPZondChart4838Up,
  setPBarChart4838Up,
  setPZondChart4838Down,
  setPBarChart4838Down,
  setPerioZ4838OralData,
} from '../../../Redux/Formula';
import {
  setPerioZ4838VestData,
  setPKrayChart4838Down,
  setPKrayChart4838Up,
} from '@/Redux/Formula/actions';

export default function DeepZond4838({ type = 'vest', idx = 0 }) {
  const dispatch = useDispatch<any>();
  // const yasen4838VestData = useSelector(chartKrayUpSelector);

  const zv4838Data = useSelector(getPerioZ4838VDataSelector);
  const ykv4838Data = useSelector(getPerioYK4838VDataSelector);
  const zo4838Data = useSelector(getPerioZ4838ODataSelector);
  const yko4838Data = useSelector(getPerioYK4838ODataSelector);

  const [value, setValue] = useState(
    type === 'vest' ? zv4838Data[idx] : zo4838Data[idx]
  );

  const recalcSlice = type => {
    let arrYasen = ykv4838Data;
    let arrZond = zv4838Data;
    let arrYasenOral = yko4838Data;
    let arrZondOral = zo4838Data;
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
        resNewYasn.push(-1 * (yasnVal != 0 ? yasnVal : 0));
        resNewZond.push(yasnVal - zondVal != 0 ? -1 * (yasnVal - zondVal) : 0);
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
      dispatch(setPKrayChart4838Up(chartnNewYasn));
      dispatch(setPZondChart4838Up(chartNewZond));
      dispatch(setPBarChart4838Up(chartBar));
    } else {
      dispatch(setPKrayChart4838Down(chartnNewYasn));
      dispatch(setPZondChart4838Down(chartNewZond));
      dispatch(setPBarChart4838Down(chartBar));
    }
  };

  return (
    <input
      onChange={e => {
        if (type === 'vest') {
          const _pZData = zv4838Data;
          _pZData[idx] = parseInt(e.target.value);
          setValue(parseInt(e.target.value));
          e.target.style.color =
            Number(e.target.value) > 5
              ? 'red'
              : Number(e.target.value) === 5
                ? 'blue'
                : 'green';
          dispatch(setPerioZ4838VestData(_pZData));
        } else {
          const _pZData = zo4838Data;
          _pZData[idx] = parseInt(e.target.value);
          setValue(parseInt(e.target.value));
          e.target.style.color =
            Number(e.target.value) > 5
              ? 'red'
              : Number(e.target.value) === 5
                ? 'blue'
                : 'green';
          dispatch(setPerioZ4838OralData(_pZData));
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
