import CalculatorInput from "../CalculatorInput";

export default function CalculatorInputExample() {
  return (
    <CalculatorInput
      onCalculate={(data) => console.log("Calculate:", data)}
      buttonText="Bereken nu"
    />
  );
}
