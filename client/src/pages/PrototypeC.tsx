import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import StepIndicator from "@/components/StepIndicator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Sparkles } from "lucide-react";
import GradientText from "@/components/GradientText";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";

type Step = "name" | "calculator" | "email" | "results";

export default function PrototypeC() {
  const [step, setStep] = useState<Step>("name");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
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

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setStep("calculator");
    }
  };

  const handleCalculate = (data: CalculatorFormData) => {
    setCalculatorData(data);
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    setStep("email");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim()) {
      console.log("Lead captured:", { name: userName, email: userEmail }, "Calculator data:", calculatorData);
      setStep("results");
    }
  };

  const steps = [
    {
      number: 1,
      label: "Welkom",
      completed: step === "calculator" || step === "email" || step === "results",
      active: step === "name",
    },
    {
      number: 2,
      label: "Gegevens",
      completed: step === "email" || step === "results",
      active: step === "calculator",
    },
    {
      number: 3,
      label: "Contact",
      completed: step === "results",
      active: step === "email",
    },
    {
      number: 4,
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
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-c">
              Prototype C
            </Badge>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Slimme leningcalculator voor uw vastgoedinvestering
          </p>
        </div>

        <StepIndicator steps={steps} />

        <AnimatePresence mode="wait">
          {step === "name" && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="w-full" data-testid="card-name-input">
                <CardHeader className="space-y-1 text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-3 w-fit mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-4xl">
                    <GradientText animationSpeed={6}>Welkom bij Finaforte!</GradientText>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base pt-2">
                    Laten we beginnen met kennismaken. Hoe mogen we je noemen?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNameSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Jouw naam
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Bijv. Erik"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="pl-11 h-12 text-lg"
                          autoFocus
                          data-testid="input-name"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={!userName.trim()}
                      data-testid="button-submit-name"
                    >
                      Ga verder
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "calculator" && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-2"
              >
                <h2 className="text-2xl font-semibold text-foreground">
                  Hey {userName}! 👋
                </h2>
                <p className="text-muted-foreground">
                  Laten we samen je berekening maken. Vul hieronder de gegevens van je pand in.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CalculatorInput
                  onCalculate={handleCalculate}
                  buttonText="Bereken voor mij"
                />
              </motion.div>
            </motion.div>
          )}

          {step === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="w-full" data-testid="card-email-input">
                <CardHeader className="space-y-1 text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-3 w-fit mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">
                    Bijna klaar, {userName}!
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base pt-2">
                    Waar kunnen we je persoonlijke berekening naartoe sturen?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        E-mailadres
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="jouw.email@voorbeeld.nl"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="pl-11 h-12 text-lg"
                          autoFocus
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={!userEmail.trim()}
                      data-testid="button-submit-email"
                    >
                      Bekijk mijn berekening
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Door verder te gaan accepteer je onze voorwaarden en privacyverklaring
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-2"
              >
                <h2 className="text-2xl font-semibold text-foreground">
                  Hier is je berekening, {userName}!
                </h2>
                <p className="text-muted-foreground">
                  We hebben de samenvatting ook naar <span className="font-medium text-foreground">{userEmail}</span> gestuurd
                </p>
              </motion.div>

              <CalculationResults results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
