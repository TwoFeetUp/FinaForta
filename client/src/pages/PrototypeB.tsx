import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import CTASection from "@/components/CTASection";
import StepIndicator from "@/components/StepIndicator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import GradientText from "@/components/GradientText";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";

export default function PrototypeB() {
  const [step, setStep] = useState<"input" | "results">("input");
  const [results, setResults] = useState<CalculationResult | null>(null);
  const { toast } = useToast();

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
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    setStep("results");
  };

  const handleEmailSubmit = (email: string) => {
    console.log("Email summary sent to:", email);
    toast({
      title: "Samenvatting verstuurd",
      description: `We hebben de samenvatting naar ${email} gestuurd.`,
    });
  };

  const handleEbookDownload = (email: string) => {
    console.log("E-book download for:", email);
    toast({
      title: "E-book gedownload",
      description: "Het e-book 'Lenen bij Finaforte' is naar uw e-mail gestuurd.",
    });
  };

  const handleQuoteRequest = (data: { name: string; email: string; phone: string }) => {
    console.log("Quote requested:", data);
    toast({
      title: "Offerte aangevraagd",
      description: "Een adviseur neemt binnen 24 uur contact met u op.",
    });
  };

  const handleScheduleAppointment = () => {
    console.log("Schedule appointment clicked");
    toast({
      title: "Afspraak inplannen",
      description: "U wordt doorgestuurd naar onze agenda...",
    });
  };

  const steps = [
    {
      number: 1,
      label: "Gegevens",
      completed: step === "results",
      active: step === "input",
    },
    {
      number: 2,
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
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-b">
              Prototype B
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
              <CalculatorInput onCalculate={handleCalculate} />
            </motion.div>
          )}

          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 max-w-4xl mx-auto"
            >
              <CalculationResults results={results} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <CTASection
                  onEmailSubmit={handleEmailSubmit}
                  onEbookDownload={handleEbookDownload}
                  onQuoteRequest={handleQuoteRequest}
                  onScheduleAppointment={handleScheduleAppointment}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
