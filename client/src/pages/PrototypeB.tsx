import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationResults from "@/components/CalculationResults";
import CTASection from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GradientText from "@/components/GradientText";
import { ArrowRight, Calculator as CalcIcon, TrendingUp } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl">
              <GradientText animationSpeed={6}>Finaforte</GradientText>
            </h1>
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-b">
              Prototype B - Cards
            </Badge>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Modern card-based calculator experience
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              <Card className="border-2 shadow-2xl bg-card/50 backdrop-blur">
                <CardHeader className="text-center pb-8 pt-10">
                  <div className="mx-auto rounded-full bg-primary/10 p-4 w-fit mb-6">
                    <CalcIcon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl mb-3">
                    Bereken uw lening in 30 seconden
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg">
                    Vul de gegevens in en zie direct uw persoonlijke resultaat
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-10">
                  <div className="max-w-2xl mx-auto">
                    <CalculatorInput onCalculate={handleCalculate} buttonText="Toon mijn resultaten" />
                  </div>
                </CardContent>
              </Card>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">⚡</div>
                    <h3 className="font-semibold mb-2">Direct resultaat</h3>
                    <p className="text-sm text-muted-foreground">
                      Geen wachten, zie direct uw berekening
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className="font-semibold mb-2">100% veilig</h3>
                    <p className="text-sm text-muted-foreground">
                      Uw gegevens zijn bij ons in goede handen
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">💰</div>
                    <h3 className="font-semibold mb-2">Beste tarieven</h3>
                    <p className="text-sm text-muted-foreground">
                      Vergelijk en kies de beste optie
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 max-w-5xl mx-auto"
            >
              <Card className="border-2 border-primary/20 shadow-2xl bg-card/50 backdrop-blur">
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-4 w-fit mb-4">
                    <TrendingUp className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl mb-2">
                    Uw persoonlijke berekening
                  </CardTitle>
                  <CardDescription className="text-base">
                    Hieronder vindt u de resultaten op basis van uw gegevens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalculationResults results={results} />
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="border-2 border-primary/20 shadow-xl bg-card/50 backdrop-blur">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl md:text-3xl mb-2">
                      Wat wilt u nu doen?
                    </CardTitle>
                    <CardDescription className="text-base">
                      Kies een van de onderstaande opties om verder te gaan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CTASection
                      onEmailSubmit={handleEmailSubmit}
                      onEbookDownload={handleEbookDownload}
                      onQuoteRequest={handleQuoteRequest}
                      onScheduleAppointment={handleScheduleAppointment}
                    />
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
