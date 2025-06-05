// import React, { useRef, useState } from 'react';
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
  setPerioZ1828VestData,
  setPerioZ1828OralData,
  setPerioYK1828VestData,
  setPerioYK1828OralData,
} from '../../../Redux/Formula';

const YasenKray1828 = forwardRef(({ type, idx, onEnter }, ref) => {
// export default function YasenKray1828({ type = 'vest', idx = 0, ref = null, onEnter }) {
  const dispatch = useDispatch<any>();

  const zv1828Data = useSelector(getPerioZ1828VDataSelector);
  const ykv1828Data = useSelector(getPerioYK1828VDataSelector);
  const zo1828Data = useSelector(getPerioZ1828ODataSelector);
  const yko1828Data = useSelector(getPerioYK1828ODataSelector);

  const [value, setValue] = useState<number | ''>(
    type === 'vest' ? ykv1828Data[idx] : yko1828Data[idx]
  );

  const inputStyle = {
    color: Number(value) > 5 ? 'red' : Number(value) === 5 ? 'blue' : 'green', // если больше 5 — красный, иначе черный
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onEnter(idx); // Trigger focus on the next input
      }
    },
    [idx, onEnter]
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
      ref={ref}
      onKeyPress={handleKeyPress}
      onChange={e => {
        if (type === 'vest') {
          const inputValue = e.target.value;
          // Allow empty input or valid numbers; otherwise, set to '0'
          const newValue = inputValue === '' || /^\d*$/.test(inputValue) ? inputValue : '0';
          const _pZData = ykv1828Data;
          _pZData[idx] = parseInt(newValue);
          setValue(parseInt(newValue));
          dispatch(setPerioYK1828VestData(_pZData));
          onEnter(idx);
        } else {
          const inputValue = e.target.value;
          // Allow empty input or valid numbers; otherwise, set to '0'
          const newValue = inputValue === '' || /^\d*$/.test(inputValue) ? inputValue : '0';
          const _pZData = yko1828Data;
          _pZData[idx] = parseInt(newValue);
          setValue(parseInt(newValue));
          dispatch(setPerioYK1828OralData(_pZData));
          onEnter(idx);
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
      value={value}
      step={1} // Ensure whole numbers
      type="text"
    />
  );
});
export default YasenKray1828;
