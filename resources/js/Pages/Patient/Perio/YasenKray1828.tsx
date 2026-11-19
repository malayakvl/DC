import React, { forwardRef, useCallback, useEffect, useState } from 'react';
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

type PerioSide = 'vest' | 'oral';

const YasenKray1828 = forwardRef<HTMLInputElement, YasenKray1828Props>(
  ({ type, idx, onEnter }, ref) => {
    const dispatch = useDispatch();
    const zv1828Data = useSelector(getPerioZ1828VDataSelector) as Array<number | string>;
    const ykv1828Data = useSelector(getPerioYK1828VDataSelector) as Array<number | string>;
    const zo1828Data = useSelector(getPerioZ1828ODataSelector) as Array<number | string>;
    const yko1828Data = useSelector(getPerioYK1828ODataSelector) as Array<number | string>;

    const currentArray = type === 'vest' ? ykv1828Data : yko1828Data;
    const currentItem = currentArray?.[idx] ?? '';

    const [value, setValue] = useState<number | string>(currentItem);

    const inputStyle: React.CSSProperties = {
      color: Number(value) > 5 ? 'red' : Number(value) === 5 ? 'blue' : 'green',
    };

    const recalcSlice = useCallback(
      (side: PerioSide, updData: Array<number | string>) => {
        const arrZond = side === 'vest' ? zv1828Data : zo1828Data;

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
          dispatch(setPKrayChart1828Up(chartNewYasn));
          dispatch(setPZondChart1828Up(chartNewZond));
          dispatch(setPBarChart1828Up(chartBar));
        } else {
          dispatch(setPKrayChart1828Down(chartNewYasn));
          dispatch(setPZondChart1828Down(chartNewZond));
          dispatch(setPBarChart1828Down(chartBar));
        }
      },
      [dispatch, zv1828Data, zo1828Data]
    );

    useEffect(() => {
      const nextArray = type === 'vest' ? ykv1828Data : yko1828Data;
      if (!nextArray) return;
      setValue(nextArray[idx] ?? '');
      recalcSlice(type, nextArray);
    }, [type, idx, ykv1828Data, yko1828Data, recalcSlice]);

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

        const baseData = type === 'vest' ? ykv1828Data : yko1828Data;
        const updatedData = [...baseData];
        updatedData[idx] = parsedValue;

        dispatch(
          type === 'vest'
            ? setPerioYK1828VestData(updatedData)
            : setPerioYK1828OralData(updatedData)
        );
        recalcSlice(type, updatedData);

        onEnter(idx);
      },
      [dispatch, idx, onEnter, recalcSlice, type, ykv1828Data, yko1828Data]
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

YasenKray1828.displayName = 'YasenKray1828';

export default YasenKray1828;
