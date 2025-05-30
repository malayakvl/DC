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
  setPKrayChart4838Up,
  setPBarChart4838Up,
  setPKrayChart4838Down,
  setPZondChart4838Down,
  setPBarChart4838Down,
  setPerioZ4838VestData,
  setPerioZ4838OralData,
  setPerioYK4838VestData,
  setPerioYK4838OralData,
} from '../../../Redux/Formula';

export default function YasenKray4838({ type = 'vest', idx = 0 }) {
  const dispatch = useDispatch<any>();

  const zv4838Data = useSelector(getPerioZ4838VDataSelector);
  const ykv4838Data = useSelector(getPerioYK4838VDataSelector);
  const zo4838Data = useSelector(getPerioZ4838ODataSelector);
  const yko4838Data = useSelector(getPerioYK4838ODataSelector);

  const [value, setValue] = useState(
    type === 'vest' ? ykv4838Data[idx] : yko4838Data[idx]
  );

  const inputStyle = {
    color: Number(value) > 5 ? 'red' : Number(value) === 5 ? 'blue' : 'green', // если больше 5 — красный, иначе черный
  };

  const recalcSlice = type => {
    let arrYasen = ykv4838Data;
    let arrZond = zv4838Data;
    let arrYasenOral = yko4838Data;
    let arrZondOral = zo4838Data;
    const resNewYasn = [];
    const resNewZond = [];
    const chartnNewYasn = [];
    const chartNewZond = [];
    let sumZond = 0;

    if (type === 'vest') {
      arrZond.forEach(num => {
        sumZond += !isNaN(parseInt(num)) ? parseInt(num) : 0;
      });
      for (let i = 0; i < arrYasen.length; i++) {
        const zondVal = !isNaN(parseInt(arrZond[i])) ? parseInt(arrZond[i]) : 0;
        const yasnVal = !isNaN(parseInt(arrYasen[i]))
          ? parseInt(arrYasen[i])
          : 0;
        resNewYasn.push(-1 * yasnVal);
        if (sumZond == 0) {
          resNewZond.push(0);
        } else {
          resNewZond.push(-1 * (yasnVal - zondVal));
        }
      }
    } else {
      arrZondOral.forEach(num => {
        sumZond += !isNaN(parseInt(num)) ? parseInt(num) : 0;
      });
      for (let i = 0; i < arrYasenOral.length; i++) {
        const zondVal = !isNaN(parseInt(arrZondOral[i]))
          ? parseInt(arrZondOral[i])
          : 0;
        const yasnVal = !isNaN(parseInt(arrYasenOral[i]))
          ? parseInt(arrYasenOral[i])
          : 0;
        resNewYasn.push(yasnVal);
        if (sumZond == 0) {
          resNewZond.push(0);
        } else {
          resNewZond.push(yasnVal - zondVal);
        }
      }
    }
    // calculate values for zond/yasen chart
    const chartBar = [];
    for (let i = 0; i < resNewZond.length; i++) {
      chartNewZond.push(
        !isNaN(parseInt(resNewZond[i])) ? parseInt(resNewZond[i]) : 0
      );
      chartnNewYasn.push(
        !isNaN(parseInt(resNewYasn[i])) ? parseInt(resNewYasn[i]) : 0
      );
      if (sumZond != 0) {
        chartBar.push([
          !isNaN(parseInt(resNewZond[i])) ? parseInt(resNewZond[i]) : 0,
          !isNaN(parseInt(resNewYasn[i])) ? parseInt(resNewYasn[i]) : 0,
        ]);
      } else {
        chartBar.push([0, 0]);
      }
      // После каждого третьего элемента (индекс 2, 5, 8, ...)
      if ((i + 1) % 3 === 0 && i + 1 < resNewZond.length) {
        let avgZond = (resNewZond[i] + resNewZond[i + 1]) / 2;
        chartNewZond.push(avgZond);
        let avgYasn = (resNewYasn[i] + resNewYasn[i + 1]) / 2;
        chartnNewYasn.push(avgYasn);
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
          const _pZData = ykv4838Data;
          _pZData[idx] = parseInt(e.target.value);
          setValue(parseInt(e.target.value));
          dispatch(setPerioYK4838VestData(_pZData));
        } else {
          const _pZData = yko4838Data;
          _pZData[idx] = parseInt(e.target.value);
          setValue(parseInt(e.target.value));
          dispatch(setPerioYK4838OralData(_pZData));
        }
        e.target.style.color =
          Number(e.target.value) > 5
            ? 'red'
            : Number(e.target.value) === 5
              ? 'blue'
              : 'green';
        recalcSlice(type);
      }}
      className="psr-input bottom focus:outline-hidden"
      value={isNaN(value) ? '' : value}
      maxLength={1}
      type="text"
    />
  );
}
