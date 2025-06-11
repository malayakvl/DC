import React, { forwardRef, useCallback, useState, useEffect } from 'react';
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
  setPerioZ4838VestData,
  setPKrayChart4838Down,
  setPKrayChart4838Up,
} from '../../../Redux/Formula';

const DeepZond4838 = forwardRef(({ type, idx, onEnter }, ref) => {
  const dispatch = useDispatch();

  const zv4838Data = useSelector(getPerioZ4838VDataSelector);
  const ykv4838Data = useSelector(getPerioYK4838VDataSelector);
  const zo4838Data = useSelector(getPerioZ4838ODataSelector);
  const yko4838Data = useSelector(getPerioYK4838ODataSelector);

  // Initialize state with Redux data, fallback to empty string
  const [value, setValue] = useState(
    type === 'vest' ? zv4838Data[idx] ?? '' : zo4838Data[idx] ?? ''
  );

  useEffect(() => {
    setValue(type === 'vest' ? zv4838Data[idx] : zo4838Data[idx]);
    recalcSlice(type, type === 'vest' ? zv4838Data : zo4838Data);
  }, [zv4838Data[idx], zo4838Data[idx]]);

  const recalcSlice = useCallback(
    (type, updData) => {
      let arrYasen = type === 'vest' ? ykv4838Data : yko4838Data;
      // let arrZond = type === 'vest' ? zv4838Data : zo4838Data;
      let arrZond = updData;
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

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onEnter(idx);
      }
    },
    [idx, onEnter]
  );

  const handleChange = useCallback(
    (e) => {
      const inputValue = e.target.value;
      let newValue;

      // Check if input is a valid number
      if (inputValue === '' || /^\d*$/.test(inputValue)) {
        // Handle empty input or valid digits
        const parsedValue = inputValue === '' ? '' : parseInt(inputValue, 10);
        newValue = inputValue === '' ? '' : Math.min(parsedValue || 0, 19);
      } else {
        // Replace non-numeric input with 0
        newValue = 0;
      }

      setValue(newValue);

      // Update Redux state
      const updatedData = type === 'vest' ? [...zv4838Data] : [...zo4838Data];
      updatedData[idx] = newValue;
      dispatch(
        type === 'vest'
          ? setPerioZ4838VestData(updatedData)
          : setPerioZ4838OralData(updatedData)
      );

      // Update input color based on value
      e.target.style.color =
        newValue !== '' && Number(newValue) > 5
          ? 'red'
          : newValue !== '' && Number(newValue) === 5
            ? 'blue'
            : 'green';

      // Auto-focus next input for specific values
      const tabValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
      if (inputValue !== '' && !isNaN(Number(inputValue)) && (tabValues.includes(Number(inputValue)) || Number(inputValue) >= 19)) {
        onEnter(idx);
      }
      // Recalculate charts
      recalcSlice(type, updatedData);
    },
    [dispatch, idx, onEnter, recalcSlice, type, zv4838Data, zo4838Data]
  );

  return (
    <input
      ref={ref}
      onKeyPress={handleKeyPress}
      onChange={handleChange}
      className="psr-input bottom focus:outline-hidden"
      value={value}
      maxLength={2}
      step={1}
      max={19}
      min={0}
      type="text"
      onFocus={(e) => e.target.select()} // Select existing value on focus
    />
  );
});

export default DeepZond4838;