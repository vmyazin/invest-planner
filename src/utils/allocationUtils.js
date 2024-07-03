// src/utils/allocationUtils.js
export const adjustAllocations = (riskLevel, allocations, setAllocations) => {
  const conservative = ['VTEB', 'JNJ', 'KO', 'PG'];
  const moderate = ['SCHD', 'VIG', 'O', 'STAG'];
  const aggressive = ['VTI', 'JEPI', 'XOM', 'MAIN'];

  const newAllocations = { ...allocations };
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

  setAllocations(newAllocations);
};
