import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import StepIndicator from "@/components/StepIndicator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GradientText from "@/components/GradientText";
import { Home, FileText, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl">
              <GradientText animationSpeed={6}>Finaforte</GradientText>
            </h1>
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-a">
              Prototype A - Interactive
            </Badge>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Interactieve stap-voor-stap calculator
          </p>
        </div>

        <StepIndicator steps={steps} />

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Hero Card */}
              <Card className="border-2 shadow-xl bg-card/80 backdrop-blur overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <CardHeader className="text-center relative z-10 pb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mx-auto rounded-full bg-primary/10 p-4 w-fit mb-4"
                  >
                    <Home className="h-10 w-10 text-primary" />
                  </motion.div>
                  <CardTitle className="text-3xl md:text-4xl mb-3">
                    Bereken uw leningmogelijkheden
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg">
                    Vul de gegevens van uw pand in voor een indicatieve berekening
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CalculatorInput
                    onCalculate={handleCalculate}
                    buttonText="Bereken mijn opties"
                  />
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="border hover:border-primary/50 transition-all hover-elevate bg-card/80 backdrop-blur h-full">
                    <CardContent className="pt-6 text-center">
                      <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Snel & Simpel</h3>
                      <p className="text-sm text-muted-foreground">
                        In 3 stappen naar uw resultaat
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="border hover:border-primary/50 transition-all hover-elevate bg-card/80 backdrop-blur h-full">
                    <CardContent className="pt-6 text-center">
                      <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Accuraat</h3>
                      <p className="text-sm text-muted-foreground">
                        Realistische berekeningen op basis van marktdata
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="border hover:border-primary/50 transition-all hover-elevate bg-card/80 backdrop-blur h-full">
                    <CardContent className="pt-6 text-center">
                      <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Persoonlijk</h3>
                      <p className="text-sm text-muted-foreground">
                        Ontvang uw berekening direct per e-mail
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === "lead" && (
            <motion.div
              key="lead"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-2 shadow-2xl bg-card/80 backdrop-blur overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <CardHeader className="text-center relative z-10 pb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="mx-auto rounded-full bg-primary/10 p-4 w-fit mb-4"
                  >
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </motion.div>
                  <CardTitle className="text-3xl md:text-4xl mb-3">
                    Geweldig! Uw berekening is klaar 🎉
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg">
                    Vul uw contactgegevens in om de resultaten te ontvangen
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <LeadCaptureForm
                    onSubmit={handleLeadSubmit}
                    title=""
                    description=""
                    buttonText="Bekijk mijn berekening"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto space-y-6"
            >
              <Card className="border-2 border-primary/20 shadow-2xl bg-card/80 backdrop-blur overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <CardHeader className="text-center relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="mx-auto rounded-full bg-primary/10 p-4 w-fit mb-4"
                  >
                    <TrendingUp className="h-10 w-10 text-primary" />
                  </motion.div>
                  <CardTitle className="text-3xl md:text-4xl mb-3">
                    Uw persoonlijke berekening
                  </CardTitle>
                  <CardDescription className="text-base">
                    Bekijk hieronder uw indicatieve leningmogelijkheden
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CalculationResults results={results} />
                </CardContent>
              </Card>

              {/* Next Steps Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-2 bg-primary/5 backdrop-blur">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Volgende stappen</CardTitle>
                    <CardDescription>
                      Wat kunt u nu doen met deze informatie?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="border hover:border-primary transition-all hover-elevate cursor-pointer">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-primary/10 p-2">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">Vraag offerte aan</h4>
                              <p className="text-sm text-muted-foreground">
                                Ontvang een gedetailleerde offerte op maat
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border hover:border-primary transition-all hover-elevate cursor-pointer">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-primary/10 p-2">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">Plan een gesprek</h4>
                              <p className="text-sm text-muted-foreground">
                                Bespreek uw situatie met een adviseur
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
