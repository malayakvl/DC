import React, { forwardRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPerioZ1828VDataSelector,
  getPerioYK1828VDataSelector,
  getPerioZ1828ODataSelector,
  getPerioYK1828ODataSelector,
} from '../../../Redux/Formula/selectors';
import {
  setPZondChart1828Up,
  setPKrayChart1828Up,
  setPBarChart1828Up,
  setPKrayChart1828Down,
  setPZondChart1828Down,
  setPBarChart1828Down,
  setPerioYK1828VestData,
  setPerioYK1828OralData,
} from '../../../Redux/Formula';

interface YasenKray1828Props {
  type: 'vest' | 'oral';
  idx: number;
  onEnter: (idx: number) => void;
}

const YasenKray1828 = forwardRef<HTMLInputElement, YasenKray1828Props>(({ type, idx, onEnter }, ref) => {
  const dispatch = useDispatch();
  const zv1828Data = useSelector(getPerioZ1828VDataSelector);
  const ykv1828Data = useSelector(getPerioYK1828VDataSelector);
  const zo1828Data = useSelector(getPerioZ1828ODataSelector);
  const yko1828Data = useSelector(getPerioYK1828ODataSelector);
  const [value, setValue] = useState<number | ''>(
    type === 'vest' ? ykv1828Data[idx] : yko1828Data[idx]
  );

  const inputStyle = {
    color: Number(value) > 5 ? 'red' : Number(value) === 5 ? 'blue' : 'green',
  };

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onEnter(idx);
      }
    },
    [idx, onEnter]
  );

  const recalcSlice = useCallback(
    (type) => {

      console.log('type', type)
      console.log(zv1828Data);
      let arrYasen = type === 'vest' ? ykv1828Data : yko1828Data;
      let arrZond = type === 'vest' ? zv1828Data : zo1828Data;
      console.log('zond', arrZond)
      console.log('yasn', arrYasen)

      const resNewYasn = [];
      const resNewZond = [];
      const chartNewYasn = [];
      const chartNewZond = [];
      const chartBar = [];
      const sumZond = arrZond.reduce((sum, num) => sum + (parseInt(num) || 0), 0);
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
        dispatch(setPKrayChart1828Up(chartNewYasn));
        dispatch(setPZondChart1828Up(chartNewZond));
        dispatch(setPBarChart1828Up(chartBar));
      } else {
        dispatch(setPKrayChart1828Down(chartNewYasn));
        dispatch(setPZondChart1828Down(chartNewZond));
        dispatch(setPBarChart1828Down(chartBar));
      }
      console.log('YK')

    },
    [dispatch, ykv1828Data, yko1828Data, zv1828Data, zo1828Data]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const lastChar = inputValue.slice(-1);
      const newValue = lastChar === '' || /^[0-9]$/.test(lastChar) ? lastChar : '0';
      const parsedValue = parseInt(newValue) || 0;

      setValue(parsedValue);

      const updatedData = type === 'vest' ? [...ykv1828Data] : [...yko1828Data];
      updatedData[idx] = parsedValue;
      dispatch(type === 'vest'
        ? setPerioYK1828VestData(updatedData)
        : setPerioYK1828OralData(updatedData)
      );

      onEnter(idx);
      recalcSlice(type);
    },
    [dispatch, idx, onEnter, recalcSlice, type, ykv1828Data, yko1828Data]
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

export default YasenKray1828;