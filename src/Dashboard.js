import React, { useState, useEffect, useCallback } from 'react';
import Slider from './components/Slider';
import AllocationDisplay from './components/AllocationDisplay';
import IncomeEstimates from './components/IncomeEstimates';
import ProjectionChart from './components/ProjectionChart';
import TaxSettings from './components/TaxSettings';
import { adjustAllocations } from './utils/allocationUtils';
import config from './config';
import './css/custom.css';

const Dashboard = () => {
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

  const handleAdjustAllocations = useCallback((riskLevel) => {
    adjustAllocations(riskLevel, allocations, setAllocations);
  }, [allocations, setAllocations]);

  useEffect(() => {
    handleAdjustAllocations(riskTolerance);
  }, [riskTolerance, handleAdjustAllocations]);

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
    handleAdjustAllocations(newRiskTolerance);
  };

  const generateProjections = () => {
    const years = 10;
    const growthRate = 0.07;
    return Array.from({ length: years }, (_, i) => ({
      year: i + 1,
      value: totalInvestment * Math.pow(1 + growthRate, i)
    }));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">{config.heading}</h1>

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
          tooltip="Risk tolerance is how much ups and downs you can handle with your investments. Higher risk tolerance means you're okay with more changes for bigger gains; lower risk tolerance means you prefer steady, smaller gains."
          coloredNumbers={true} // Enable colored numbers
        />
      </div>

      <AllocationDisplay allocations={allocations} paymentFrequency={paymentFrequency} yields={yields} />

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
  );
};

export default Dashboard;