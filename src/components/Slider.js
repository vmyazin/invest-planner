// src/components/Slider.js
import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import '../css/custom.css';

const Slider = ({ title, min, max, value, onChange, displayValue, tooltip, coloredNumbers }) => {
  const getColor = (value) => {
    const red = Math.floor((value - min) * 255 / (max - min));
    const green = 255 - red;
    return `rgb(${red},${green},0)`;
  };

  const coloredDisplayValue = coloredNumbers
    ? (
      <span>
        <span style={{ color: getColor(value) }}>{value}</span> / {max}
      </span>
    )
    : displayValue;

  return (
    <div className="relative bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-secondary">
        {title}
        {tooltip && (
          <span data-tooltip-id="risk-tooltip" data-tooltip-content={tooltip} className="ml-2 cursor-pointer text-gray-400 hover:text-gray-600">
            &#9432;
          </span>
        )}
      </h2>
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full"
        />
      </div>
      <p className="mt-2 text-lg font-medium">{coloredDisplayValue}</p>
      {tooltip && <ReactTooltip id="risk-tooltip" className="custom-tooltip" />}
    </div>
  );
};

export default Slider;
