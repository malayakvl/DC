import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeethDiagnozisSelector, perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze } from '../../../Redux/Formula';

export default function YesenKrayView({ data, type = '', idx = 1 }) {
  let value = data[idx];
  const inputStyle = {
    color: Number(value) > 5 ? 'red' : Number(value) === 5 ? 'blue' : 'green',
  };

  return (
    <input
      className="psr-input-view"
      value={value}
      readOnly={true}
      type="text"
      style={inputStyle}
    />
  );
}
