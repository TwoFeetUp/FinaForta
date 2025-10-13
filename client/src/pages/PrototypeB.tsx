import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import CTASection from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";

export default function PrototypeB() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showCTA, setShowCTA] = useState(false);
  const { toast } = useToast();

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
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    setShowCTA(true);
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">Finaforte</h1>
              <Badge variant="outline" className="text-xs" data-testid="badge-prototype-b">
                Prototype B
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Slimme leningcalculator voor uw vastgoedinvestering
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <CalculatorInput onCalculate={handleCalculate} />
        </div>

        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 max-w-4xl mx-auto"
            >
              <CalculationResults results={results} />
              
              {showCTA && (
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
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
