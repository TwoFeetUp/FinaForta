import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import StepIndicator from "@/components/StepIndicator";
import { Badge } from "@/components/ui/badge";
import GradientText from "@/components/GradientText";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";

export default function PrototypeA() {
  const [step, setStep] = useState<"input" | "lead" | "results">("input");
  const [calculatorData, setCalculatorData] = useState<CalculatorFormData | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateResults = (data: CalculatorFormData): CalculationResult => {
    const propertyValue = parseFloat(data.propertyValue);
    const loanAmount = parseFloat(data.loanAmount);
    const ltv = (loanAmount / propertyValue) * 100;
    
    let baseRate = 3.5;
    if (data.propertyType === "zakelijk") baseRate += 0.5;
    if (ltv > 80) baseRate += 0.5;
    if (ltv > 90) baseRate += 0.75;
    
    const monthlyRate = baseRate / 100 / 12;
    const numPayments = 30 * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    return {
      ltv,
      interestRate: baseRate,
      monthlyPayment,
      amortization: 30,
    };
  };

  const handleCalculate = (data: CalculatorFormData) => {
    setCalculatorData(data);
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    setStep("lead");
  };

  const handleLeadSubmit = (leadData: { name: string; email: string }) => {
    console.log("Lead captured:", leadData, "Calculator data:", calculatorData);
    setStep("results");
  };

  const steps = [
    {
      number: 1,
      label: "Gegevens",
      completed: step === "lead" || step === "results",
      active: step === "input",
    },
    {
      number: 2,
      label: "Contactinfo",
      completed: step === "results",
      active: step === "lead",
    },
    {
      number: 3,
      label: "Resultaten",
      completed: false,
      active: step === "results",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl">
              <GradientText animationSpeed={6}>Finaforte</GradientText>
            </h1>
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-a">
              Prototype A
            </Badge>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Slimme leningcalculator voor uw vastgoedinvestering
          </p>
        </div>

        <StepIndicator steps={steps} />

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <CalculatorInput
                onCalculate={handleCalculate}
                buttonText="Toon mijn resultaten"
              />
            </motion.div>
          )}

          {step === "lead" && (
            <motion.div
              key="lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <LeadCaptureForm
                onSubmit={handleLeadSubmit}
                title="Bijna klaar!"
                description="Vul uw gegevens in om uw persoonlijke berekening te zien"
                buttonText="Bekijk berekening"
              />
            </motion.div>
          )}

          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <CalculationResults results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
