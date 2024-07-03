import React, { useState, useEffect, useCallback } from 'react';
import Slider from './components/Slider';
import IncomeEstimates from './components/IncomeEstimates';
import ProjectionChart from './components/ProjectionChart';
import TaxSettings from './components/TaxSettings';
import config from './config';

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

  // Function to adjust allocations based on risk tolerance
  const adjustAllocations = useCallback((riskLevel) => {
    setAllocations((prevAllocations) => {
      const conservative = ['VTEB', 'JNJ', 'KO', 'PG'];
      const moderate = ['SCHD', 'VIG', 'O', 'STAG'];
      const aggressive = ['VTI', 'JEPI', 'XOM', 'MAIN'];

      const newAllocations = { ...prevAllocations };
      const totalAllocation = 100;

      let conservativeAllocation = Math.max(60 - riskLevel * 5, 10);
      let moderateAllocation = 30;
      let aggressiveAllocation = Math.min(10 + riskLevel * 5, 60);

      const total = conservativeAllocation + moderateAllocation + aggressiveAllocation;
      conservativeAllocation = (conservativeAllocation / total) * totalAllocation;
      moderateAllocation = (moderateAllocation / total) * totalAllocation;
      aggressiveAllocation = (aggressiveAllocation / total) * totalAllocation;

      conservative.forEach(symbol => newAllocations[symbol] = conservativeAllocation / conservative.length);
      moderate.forEach(symbol => newAllocations[symbol] = moderateAllocation / moderate.length);
      aggressive.forEach(symbol => newAllocations[symbol] = aggressiveAllocation / aggressive.length);

      return newAllocations;
    });
  }, []);


  // Update allocations when risk tolerance changes
  useEffect(() => {
    adjustAllocations(riskTolerance);
  }, [riskTolerance, adjustAllocations]);

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
  }, [totalInvestment, allocations, yields, includeStateTax, stateTaxRate, federalTaxRate]);

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
    <div>
      <div className="p-4 max-w-6xl mx-auto bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">{config.heading}</h1>

        <p className="text-center text-secondary mb-6 px-4 max-w-xl mx-auto">
          {config.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Slider
            title="Total Investment"
            min={1000}
            max={1000000}
            value={totalInvestment}
            onChange={(e) => setTotalInvestment(Number(e.target.value))}
            displayValue={`$${totalInvestment.toLocaleString()}`}
          />
          <Slider
            title="Risk Tolerance"
            min={1}
            max={10}
            value={riskTolerance}
            onChange={handleRiskToleranceChange}
            displayValue={`${riskTolerance} / 10`}
          />
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
          <TaxSettings
            includeStateTax={includeStateTax}
            setIncludeStateTax={setIncludeStateTax}
            stateTaxRate={stateTaxRate}
            setStateTaxRate={setStateTaxRate}
          />
          <IncomeEstimates
            annualIncome={annualIncome}
            monthlyIncome={monthlyIncome}
            federalTaxRate={federalTaxRate}
            includeStateTax={includeStateTax}
            stateTaxRate={stateTaxRate}
          />
        </div>

        <ProjectionChart data={generateProjections()} />

      </div>
    </div>

  );
};

export default ModernInvestmentDashboard;