import React, { forwardRef, useCallback, useEffect, useState } from 'react';
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
  setPerioYK4838VestData,
  setPerioYK4838OralData,
} from '../../../Redux/Formula';

interface YasenKray4838Props {
  type: 'vest' | 'oral';
  idx: number;
  onEnter: (idx: number) => void;
}

const YasenKray4838 = forwardRef<HTMLInputElement, YasenKray4838Props>(({ type, idx, onEnter }, ref) => {
  const dispatch = useDispatch();
  const ykv4838Data = useSelector(getPerioYK4838VDataSelector);
  const yko4838Data = useSelector(getPerioYK4838ODataSelector);
  const zv4838Data = useSelector(getPerioZ4838VDataSelector);
  const zo4838Data = useSelector(getPerioZ4838ODataSelector);

  const [value, setValue] = useState<number | ''>(
    type === 'vest' ? ykv4838Data[idx] : yko4838Data[idx]
  );

  const inputStyle = {
    color: Number(value) > 5 ? 'red' : Number(value) === 5 ? 'blue' : 'green',
  };

  // useEffect(() => {
  //   recalcSlice(type)
  // });

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onEnter(idx);
      }
    },
    [idx, onEnter]
  );

  const recalcSlice = useCallback(
    (type, updData) => {
      // let arrYasen = type === 'vest' ? ykv4838Data : yko4838Data;
      let arrYasen = updData;
      let arrZond = type === 'vest' ? zv4838Data : zo4838Data;
      const resNewYasn = [];
      const resNewZond = [];
      const chartNewYasn = [];
      const chartNewZond = [];
      const chartBar = [];

      for (let i = 0; i < arrYasen.length; i++) {
        const zondVal = !isNaN(parseInt(arrZond[i])) ? parseInt(arrZond[i]) : 0;
        const yasnVal = !isNaN(parseInt(arrYasen[i])) ? parseInt(arrYasen[i]) : 0;
        if (type === 'vest') {
          resNewYasn.push(-1 * yasnVal);
          resNewZond.push(-1 * (yasnVal - zondVal));
        } else {
          resNewYasn.push(yasnVal);
          resNewZond.push(yasnVal - zondVal);
        }
      }

      for (let i = 0; i < resNewZond.length; i++) {
        chartNewZond.push(!isNaN(parseInt(resNewZond[i])) ? parseInt(resNewZond[i]) : 0);
        chartNewYasn.push(!isNaN(parseInt(resNewYasn[i])) ? parseInt(resNewYasn[i]) : 0);
        chartBar.push([
          !isNaN(parseInt(resNewZond[i])) ? parseInt(resNewZond[i]) : 0,
          !isNaN(parseInt(resNewYasn[i])) ? parseInt(resNewYasn[i]) : 0,
        ]);

        if ((i + 1) % 3 === 0 && i + 1 < resNewZond.length) {
          const avgZond = (resNewZond[i] + resNewZond[i + 1]) / 2;
          chartNewZond.push(avgZond);
          const avgYasn = (resNewYasn[i] + resNewYasn[i + 1]) / 2;
          chartNewYasn.push(avgYasn);
          chartBar.push([0, 0]);
        }
      }

      chartNewZond.unshift(0);
      chartNewZond.push(0);
      chartNewYasn.unshift(0);
      chartNewYasn.push(0);
      chartBar.unshift([0, 0]);
      chartBar.push([0, 0]);

      if (type === 'vest') {
        dispatch(setPKrayChart4838Up(chartNewYasn));
        dispatch(setPZondChart4838Up(chartNewZond));
        dispatch(setPBarChart4838Up(chartBar));
      } else {
        dispatch(setPKrayChart4838Down(chartNewYasn));
        dispatch(setPZondChart4838Down(chartNewZond));
        dispatch(setPBarChart4838Down(chartBar));
      }
    },
    [dispatch, ykv4838Data, yko4838Data, zv4838Data, zo4838Data]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const lastChar = inputValue.slice(-1);
      const newValue = lastChar === '' || /^[0-9]$/.test(lastChar) ? lastChar : '0';
      const parsedValue = parseInt(newValue) || 0;

      setValue(parsedValue);

      const updatedData = type === 'vest' ? [...ykv4838Data] : [...yko4838Data];
      updatedData[idx] = parsedValue;
      dispatch(type === 'vest'
        ? setPerioYK4838VestData(updatedData)
        : setPerioYK4838OralData(updatedData)
      );

      recalcSlice(type, updatedData);
      onEnter(idx);

    },
    [dispatch, idx, onEnter, recalcSlice, type, ykv4838Data, yko4838Data]
  );

  return (
    <input
      ref={ref}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      className="psr-input bottom focus:outline-none"
      value={value}
      type="text"
      style={inputStyle}
    />
  );
});

export default YasenKray4838;