// src/components/Slider.js
import React from 'react';

const Slider = ({ title, min, max, value, onChange, displayValue }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-secondary">{title}</h2>
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
    <p className="mt-2 text-lg font-medium text-primary">{displayValue}</p>
  </div>
);

export default Slider;
