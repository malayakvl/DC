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

type PerioSide = 'vest' | 'oral';

const YasenKray4838 = forwardRef<HTMLInputElement, YasenKray4838Props>(
  ({ type, idx, onEnter }, ref) => {
    const dispatch = useDispatch();
    const ykv4838Data = useSelector(getPerioYK4838VDataSelector) as Array<number | string>;
    const yko4838Data = useSelector(getPerioYK4838ODataSelector) as Array<number | string>;
    const zv4838Data = useSelector(getPerioZ4838VDataSelector) as Array<number | string>;
    const zo4838Data = useSelector(getPerioZ4838ODataSelector) as Array<number | string>;

    const currentArray = type === 'vest' ? ykv4838Data : yko4838Data;
    const currentItem = currentArray?.[idx] ?? '';

    const [value, setValue] = useState<number | string>(currentItem);

    const inputStyle: React.CSSProperties = {
      color: Number(value) > 5 ? 'red' : Number(value) === 5 ? 'blue' : 'green',
    };

    const recalcSlice = useCallback(
      (side: PerioSide, updData: Array<number | string>) => {
        const arrZond = side === 'vest' ? zv4838Data : zo4838Data;

        const resNewYasn: number[] = [];
        const resNewZond: number[] = [];
        const chartNewYasn: number[] = [];
        const chartNewZond: number[] = [];
        const chartBar: [number, number][] = [];

        for (let i = 0; i < updData.length; i++) {
          const parsedZond = parseInt(String(arrZond[i] ?? 0), 10);
          const parsedYasn = parseInt(String(updData[i] ?? 0), 10);

          const zondVal = !Number.isNaN(parsedZond) ? parsedZond : 0;
          const yasnVal = !Number.isNaN(parsedYasn) ? parsedYasn : 0;

          if (side === 'vest') {
            resNewYasn.push(-1 * yasnVal);
            resNewZond.push(-1 * (yasnVal + zondVal));
          } else {
            resNewYasn.push(yasnVal);
            resNewZond.push(yasnVal + zondVal);
          }
        }

        for (let i = 0; i < resNewZond.length; i++) {
          const zondPoint = resNewZond[i] ?? 0;
          const yasnPoint = resNewYasn[i] ?? 0;

          chartNewZond.push(zondPoint);
          chartNewYasn.push(yasnPoint);
          chartBar.push([zondPoint, yasnPoint]);

          if ((i + 1) % 3 === 0 && i + 1 < resNewZond.length) {
            const avgZond = (resNewZond[i] + resNewZond[i + 1]) / 2;
            const avgYasn = (resNewYasn[i] + resNewYasn[i + 1]) / 2;
            chartNewZond.push(avgZond);
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

        if (side === 'vest') {
          dispatch(setPKrayChart4838Up(chartNewYasn));
          dispatch(setPZondChart4838Up(chartNewZond));
          dispatch(setPBarChart4838Up(chartBar));
        } else {
          dispatch(setPKrayChart4838Down(chartNewYasn));
          dispatch(setPZondChart4838Down(chartNewZond));
          dispatch(setPBarChart4838Down(chartBar));
        }
      },
      [dispatch, zv4838Data, zo4838Data]
    );

    useEffect(() => {
      const nextArray = type === 'vest' ? ykv4838Data : yko4838Data;
      if (!nextArray) return;
      setValue(nextArray[idx] ?? '');
      recalcSlice(type, nextArray);
    }, [type, idx, ykv4838Data, yko4838Data, recalcSlice]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          onEnter(idx);
        }
      },
      [idx, onEnter]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const lastChar = inputValue.slice(-1);
        const newValue = lastChar === '' || /^[0-9]$/.test(lastChar) ? lastChar : '0';
        const parsedValue = parseInt(newValue, 10) || 0;

        setValue(parsedValue);

        const baseData = type === 'vest' ? ykv4838Data : yko4838Data;
        const updatedData = [...baseData];
        updatedData[idx] = parsedValue;

        dispatch(
          type === 'vest'
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
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className="psr-input bottom focus:outline-none"
        value={value}
        type="text"
        style={inputStyle}
      />
    );
  }
);

YasenKray4838.displayName = 'YasenKray4838';

export default YasenKray4838;
