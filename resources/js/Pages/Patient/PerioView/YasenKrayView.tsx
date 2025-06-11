import React from 'react';

export default function YesenKrayView({ data, idx = 1 }) {
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
