// src/components/AllocationDisplay.js
import React from 'react';

const AllocationDisplay = ({ allocations, paymentFrequency, yields }) => {
  const scaleFactor = 3; // Scale factor to increase the width

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Allocations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(allocations).map(([symbol, value]) => (
          <div key={symbol} className="space-y-2">
            <label className="flex justify-between text-secondary">
              <span>{symbol} ({paymentFrequency[symbol]})</span>
              <span className="font-medium">{value.toFixed(2)}%</span>
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${Math.min(value * scaleFactor, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-primary">Yield: {yields[symbol]}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationDisplay;
