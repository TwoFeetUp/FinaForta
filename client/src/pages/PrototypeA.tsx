import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";

export default function PrototypeA() {
  const [step, setStep] = useState<"input" | "lead" | "results">("input");
  const [calculatorData, setCalculatorData] = useState<CalculatorFormData | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateResults = (data: CalculatorFormData): CalculationResult => {
    const propertyValue = parseFloat(data.propertyValue);
    const loanAmount = parseFloat(data.loanAmount);
    const ltv = (loanAmount / propertyValue) * 100;

    const durationRates: Record<string, number> = {
      "1": 5.15,
      "2": 5.7,
      "3": 5.15,
      "5": 5.05,
      "7": 5.25,
      "10": 5.4,
    };

    let baseRate = durationRates[data.duration] || 5.0;
    if (data.propertyType === "zakelijk") baseRate += 0.25;
    if (ltv > 80) baseRate += 0.25;
    if (ltv > 90) baseRate += 0.5;

    const duration = parseInt(data.duration);
    const monthlyRate = baseRate / 100 / 12;
    const numPayments = duration * 12;

    let monthlyPayment: number;
    if (data.repaymentType === "zonder") {
      monthlyPayment = loanAmount * monthlyRate;
    } else if (data.repaymentType === "50") {
      const interestOnlyPart = (loanAmount * 0.5) * monthlyRate;
      const amortizingPart = (loanAmount * 0.5) * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                             (Math.pow(1 + monthlyRate, numPayments) - 1);
      monthlyPayment = interestOnlyPart + amortizingPart;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const repaymentLabels: Record<string, string> = {
      "zonder": "Zonder aflossing",
      "volledig": "Ja, volledig",
      "50": "Ja, 50%",
    };

    return {
      ltv,
      interestRate: baseRate,
      monthlyPayment,
      duration,
      repaymentType: repaymentLabels[data.repaymentType] || data.repaymentType,
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-8">
            <Logo />
            <div className="space-y-3">
              <Badge variant="outline" className="text-xs" data-testid="badge-prototype-a">
                Prototype A
              </Badge>
              <p className="text-muted-foreground text-sm">
                Slimme leningcalculator voor uw vastgoedinvestering
              </p>
            </div>
          </div>
        </div>

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
