// src/components/TaxSettings.js
import React from 'react';

const TaxSettings = ({ includeStateTax, setIncludeStateTax, stateTaxRate, setStateTaxRate }) => (
  <div className="bg-white p-6 rounded-lg shadow mt-6">
    <h2 className="text-xl font-semibold mb-4 text-secondary">Tax Settings</h2>
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={includeStateTax}
        onChange={(e) => setIncludeStateTax(e.target.checked)}
        className="form-checkbox h-5 w-5 text-accent"
      />
      <label className="text-secondary">Include State Tax</label>
    </div>
    {includeStateTax && (
      <div className="mt-4">
        <label className="text-secondary">State Tax Rate: {stateTaxRate}%</label>
        <input
          type="range"
          min="1"
          max="20"
          value={stateTaxRate}
          onChange={(e) => setStateTaxRate(Number(e.target.value))}
          className="w-full mt-2 accent-accent"
        />
      </div>
    )}
  </div>
);

export default TaxSettings;
