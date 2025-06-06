import React, { forwardRef, useCallback, useState } from 'react';
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

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onEnter(idx);
      }
    },
    [idx, onEnter]
  );

  const recalcSlice = useCallback(() => {
    const isVest = type === 'vest';
    const arrYasen = isVest ? ykv4838Data : yko4838Data;
    const arrZond = isVest ? zv4838Data : zo4838Data;

    const sumZond = arrZond.reduce((sum, num) => sum + (parseInt(num) || 0), 0);
    const resNewYasn: number[] = [];
    const resNewZond: number[] = [];
    const chartBar: [number, number][] = [];

    for (let i = 0; i < arrYasen.length; i++) {
      const zondVal = parseInt(arrZond[i]) || 0;
      const yasnVal = parseInt(arrYasen[i]) || 0;
      const yasnResult = isVest ? -yasnVal : yasnVal;
      const zondResult = sumZond === 0 ? 0 : isVest ? -(yasnVal - zondVal) : yasnVal - zondVal;

      resNewYasn.push(yasnResult);
      resNewZond.push(zondResult);
      chartBar.push([zondResult, yasnResult]);

      if ((i + 1) % 3 === 0 && i + 1 < arrYasen.length) {
        resNewYasn.push((resNewYasn[i] + (parseInt(arrYasen[i + 1]) || 0) * (isVest ? -1 : 1)) / 2);
        resNewZond.push((resNewZond[i] + (sumZond === 0 ? 0 : (parseInt(arrYasen[i + 1]) || 0) - (parseInt(arrZond[i + 1]) || 0) * (isVest ? -1 : 1))) / 2);
      }
    }

    resNewYasn.unshift(0);
    resNewYasn.push(0);
    resNewZond.unshift(0);
    resNewZond.push(0);
    chartBar.unshift([0, 0]);
    chartBar.push([0, 0]);

    const actions = isVest
      ? [setPKrayChart4838Up, setPZondChart4838Up, setPBarChart4838Up]
      : [setPKrayChart4838Down, setPZondChart4838Down, setPBarChart4838Down];

    dispatch(actions[0](resNewYasn));
    dispatch(actions[1](resNewZond));
    dispatch(actions[2](chartBar));
  }, [dispatch, type, ykv4838Data, yko4838Data, zv4838Data, zo4838Data]);

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

      onEnter(idx);
      recalcSlice();
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