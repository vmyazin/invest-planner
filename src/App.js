import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ModernInvestmentDashboard = () => {
  const [totalInvestment, setTotalInvestment] = useState(100000);
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [allocations, setAllocations] = useState({
    SCHD: 20, VTI: 15, JEPI: 10, VIG: 10, JNJ: 5, KO: 5, PG: 5, O: 10, XOM: 5, MAIN: 5, STAG: 5, VTEB: 5
  });
  const [yields] = useState({
    SCHD: 3.5, VTI: 1.5, JEPI: 7.0, VIG: 1.8, JNJ: 2.7, KO: 3.0, PG: 2.5, O: 5.0, XOM: 3.5, MAIN: 6.5, STAG: 4.5, VTEB: 2.5
  });
  const [paymentFrequency] = useState({
    SCHD: 'Quarterly', VTI: 'Quarterly', JEPI: 'Monthly', VIG: 'Quarterly', JNJ: 'Quarterly', KO: 'Quarterly',
    PG: 'Quarterly', O: 'Monthly', XOM: 'Quarterly', MAIN: 'Monthly', STAG: 'Monthly', VTEB: 'Monthly'
  });
  const [annualIncome, setAnnualIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [includeStateTax, setIncludeStateTax] = useState(false);
  const [stateTaxRate, setStateTaxRate] = useState(5);
  const federalTaxRate = 15;

  // Categorize investments
  const conservative = ['VTEB', 'JNJ', 'KO', 'PG'];
  const moderate = ['SCHD', 'VIG', 'O', 'STAG'];
  const aggressive = ['VTI', 'JEPI', 'XOM', 'MAIN'];

  // Function to adjust allocations based on risk tolerance
  const adjustAllocations = (riskLevel) => {
    const newAllocations = { ...allocations };
    const totalAllocation = 100;

    let conservativeAllocation = Math.max(60 - riskLevel * 5, 10); // 60% at risk 0, 10% at risk 10
    let moderateAllocation = 30; // Keeps moderate allocation steady
    let aggressiveAllocation = Math.min(10 + riskLevel * 5, 60); // 10% at risk 0, 60% at risk 10

    // Normalize allocations to ensure they sum to 100%
    const total = conservativeAllocation + moderateAllocation + aggressiveAllocation;
    conservativeAllocation = (conservativeAllocation / total) * totalAllocation;
    moderateAllocation = (moderateAllocation / total) * totalAllocation;
    aggressiveAllocation = (aggressiveAllocation / total) * totalAllocation;

    // Distribute allocations within each category
    conservative.forEach(symbol => newAllocations[symbol] = conservativeAllocation / conservative.length);
    moderate.forEach(symbol => newAllocations[symbol] = moderateAllocation / moderate.length);
    aggressive.forEach(symbol => newAllocations[symbol] = aggressiveAllocation / aggressive.length);

    setAllocations(newAllocations);
  };

  // Update allocations when risk tolerance changes
  useEffect(() => {
    adjustAllocations(riskTolerance);
  }, [riskTolerance]);

  useEffect(() => {
    const income = Object.keys(allocations).reduce((sum, symbol) => {
      return sum + (totalInvestment * (allocations[symbol] / 100) * (yields[symbol] / 100));
    }, 0);
    setAnnualIncome(income);

    let taxRate = federalTaxRate;
    if (includeStateTax) {
      taxRate += stateTaxRate;
    }

    const afterTaxIncome = income * (1 - taxRate / 100);
    setMonthlyIncome(afterTaxIncome / 12);
  }, [totalInvestment, allocations, yields, includeStateTax, stateTaxRate]);

  const handleRiskToleranceChange = (e) => {
    const newRiskTolerance = Number(e.target.value);
    setRiskTolerance(newRiskTolerance);
    adjustAllocations(newRiskTolerance);
  };

  const generateProjections = () => {
    const years = 10;
    const growthRate = 0.07; // 7% annual growth
    return Array.from({ length: years }, (_, i) => ({
      year: i + 1,
      value: totalInvestment * Math.pow(1 + growthRate, i)
    }));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Investment Plan Dashboard</h1>

      <p className="text-center text-secondary mb-6 px-4 max-w-xl mx-auto">
        Plan and visualize your investment strategy focused on receiving dividents. 
        Adjust your total investment and risk tolerance to see how it affects your portfolio allocation and potential returns. 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Total Investment</h2>
          <div className="slider-container">
            <input
              type="range"
              min="1000"
              max="1000000"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <p className="mt-2 text-lg font-medium text-primary">${totalInvestment.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Risk Tolerance</h2>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="10"
              value={riskTolerance}
              onChange={handleRiskToleranceChange}
              className="w-full"
            />
          </div>
          <p className="mt-2 text-lg font-medium text-primary">{riskTolerance} / 10</p>
        </div>
      </div>

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
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <p className="text-sm text-primary">Yield: {yields[symbol]}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                min="0"
                max="15"
                value={stateTaxRate}
                onChange={(e) => setStateTaxRate(Number(e.target.value))}
                className="w-full mt-2 accent-accent"
              />
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Income Estimates</h2>
          <div className="space-y-2 text-secondary">
            <p><span className="font-medium">Annual (Pre-tax):</span> <span className="text-primary">${annualIncome.toFixed(2)}</span></p>
            <p><span className="font-medium">Monthly (After-tax):</span> <span className="text-primary">${monthlyIncome.toFixed(2)}</span></p>
            <p><span className="font-medium">Federal Tax Rate:</span> <span className="text-primary">{federalTaxRate}%</span></p>
            {includeStateTax && <p><span className="font-medium">State Tax Rate:</span> <span className="text-primary">{stateTaxRate}%</span></p>}
            <p><span className="font-medium">Total Tax Rate:</span> <span className="text-primary">{includeStateTax ? federalTaxRate + stateTaxRate : federalTaxRate}%</span></p>
          </div>
        </div>

      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 text-secondary">10-Year Projection</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={generateProjections()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#f6821e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModernInvestmentDashboard;