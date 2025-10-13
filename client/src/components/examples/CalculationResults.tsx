import CalculationResults from "../CalculationResults";

export default function CalculationResultsExample() {
  const mockResults = {
    ltv: 80,
    interestRate: 5.4,
    monthlyPayment: 1842,
    duration: 10,
    repaymentType: "Ja, volledig",
  };

  return <CalculationResults results={mockResults} />;
}
