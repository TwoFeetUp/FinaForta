import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";
import { getInterestRate, getMaxLTV } from "@/lib/utils";

export default function PrototypeA() {
  const [step, setStep] = useState<"input" | "lead" | "results">("input");
  const [calculatorData, setCalculatorData] = useState<CalculatorFormData | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const { toast } = useToast();

  const calculateResults = (data: CalculatorFormData & { amortizationType?: string }): CalculationResult => {
    const propertyValue = parseFloat(data.propertyValue);
    const loanAmount = parseFloat(data.loanAmount);
    const ltv = (loanAmount / propertyValue) * 100;

    // Use interest rate from property type configuration
    const interestRate = getInterestRate(data.propertyType);

    const duration = parseInt(data.duration);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = duration * 12;

    let monthlyPayment: number;
    if (data.repaymentType === "zonder") {
      monthlyPayment = loanAmount * monthlyRate;
    } else if (data.repaymentType === "50") {
      // 50% interest-only + 50% annuity
      const interestOnlyPart = (loanAmount * 0.5) * monthlyRate;
      const amortizingPart = (loanAmount * 0.5) * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                             (Math.pow(1 + monthlyRate, numPayments) - 1);
      monthlyPayment = interestOnlyPart + amortizingPart;
    } else {
      // "volledig" - full repayment with annuity
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
      interestRate,
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

  const handleMaatwerkRequest = () => {
    console.log("Maatwerk beoordeling aangevraagd");
    toast({
      title: "Maatwerk beoordeling aangevraagd",
      description: "Een adviseur neemt binnen 24 uur contact met u op voor een vrijblijvend gesprek.",
    });
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

          {step === "results" && results && calculatorData && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <CalculationResults
                results={results}
                calculatorData={{
                  propertyValue: parseFloat(calculatorData.propertyValue),
                  loanAmount: parseFloat(calculatorData.loanAmount),
                  duration: parseInt(calculatorData.duration),
                }}
                onRequestMaatwerk={handleMaatwerkRequest}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
