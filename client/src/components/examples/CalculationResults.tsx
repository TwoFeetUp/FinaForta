import CalculationResults from "../CalculationResults";

export default function CalculationResultsExample() {
  const mockResults = {
    ltv: 80,
    interestRate: 3.75,
    monthlyPayment: 1842,
    amortization: 30,
  };

  return <CalculationResults results={mockResults} />;
}
