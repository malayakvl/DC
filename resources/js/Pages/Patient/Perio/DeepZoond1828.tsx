import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPerioZ1828VDataSelector,
  getPerioYK1828VDataSelector,
  getPerioZ1828ODataSelector,
  getPerioYK1828ODataSelector,
} from '../../../Redux/Formula/selectors';
import {
  setPZondChart1828Up,
  setPBarChart1828Up,
  setPZondChart1828Down,
  setPBarChart1828Down,
  setPerioZ1828OralData,
  setPerioZ1828VestData,
  setPKrayChart1828Down,
  setPKrayChart1828Up,
} from '../../../Redux/Formula';

const DeepZond1828 = forwardRef(({ type, idx, onEnter }, ref) => {
  const dispatch = useDispatch();

  const zv1828Data = useSelector(getPerioZ1828VDataSelector);
  const ykv1828Data = useSelector(getPerioYK1828VDataSelector);
  const zo1828Data = useSelector(getPerioZ1828ODataSelector);
  const yko1828Data = useSelector(getPerioYK1828ODataSelector);

  // Initialize state with Redux data, fallback to empty string
  const [value, setValue] = useState(
    type === 'vest' ? zv1828Data[idx] ?? '' : zo1828Data[idx] ?? ''
  );

  // Sync local state with Redux state if it changes externally
  useEffect(() => {
    const newValue = type === 'vest' ? zv1828Data[idx] ?? '' : zo1828Data[idx] ?? '';
    setValue(newValue);
  }, [zv1828Data, zo1828Data, type, idx]);

  const recalcSlice = useCallback(
    (type) => {
      let arrYasen = type === 'vest' ? ykv1828Data : yko1828Data;
      let arrZond = type === 'vest' ? zv1828Data : zo1828Data;
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
        dispatch(setPKrayChart1828Up(chartNewYasn));
        dispatch(setPZondChart1828Up(chartNewZond));
        dispatch(setPBarChart1828Up(chartBar));
      } else {
        dispatch(setPKrayChart1828Down(chartNewYasn));
        dispatch(setPZondChart1828Down(chartNewZond));
        dispatch(setPBarChart1828Down(chartBar));
      }
    },
    [dispatch, ykv1828Data, yko1828Data, zv1828Data, zo1828Data]
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
      const updatedData = type === 'vest' ? [...zv1828Data] : [...zo1828Data];
      updatedData[idx] = newValue;
      dispatch(
        type === 'vest'
          ? setPerioZ1828VestData(updatedData)
          : setPerioZ1828OralData(updatedData)
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
      recalcSlice(type);
    },
    [dispatch, idx, onEnter, recalcSlice, type, zv1828Data, zo1828Data]
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

export default DeepZond1828;