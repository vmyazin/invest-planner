// src/components/IncomeEstimates.js
import React from 'react';

const IncomeEstimates = ({ annualIncome, monthlyIncome, federalTaxRate, includeStateTax, stateTaxRate }) => (
  <div className="bg-white p-6 rounded-lg shadow mt-6">
    <h2 className="text-xl font-semibold mb-4 text-secondary">Income Estimates</h2>
    <div className="space-y-2 text-secondary">
      <p><span className="font-medium">Annual (Pre-tax):</span> <span className="text-primary">${annualIncome.toFixed(2)}</span></p>
      <p><span className="font-medium">Monthly (After-tax):</span> <span className="text-primary">${monthlyIncome.toFixed(2)}</span></p>
      <p><span className="font-medium">Federal Tax Rate:</span> <span className="text-primary">{federalTaxRate}%</span>
      {includeStateTax && <span className='ps-6'><span className="font-medium">State Tax Rate:</span> <span className="text-primary">{stateTaxRate}%</span></span>}</p>
      <p><span className="font-medium">Total Tax Rate:</span> <span className="text-primary">{includeStateTax ? federalTaxRate + stateTaxRate : federalTaxRate}%</span></p>
    </div>
  </div>
);

export default IncomeEstimates;
