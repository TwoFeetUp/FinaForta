import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculationResults from "@/components/CalculationResults";
import CTASection from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { Building2, Home, Calculator, Clock, Coins, ArrowRight, ArrowLeft } from "lucide-react";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";

type Step = "propertyType" | "amounts" | "loanTerms" | "results";

const durationOptions = [
  { value: "1", label: "1 jaar", rate: "5.15%" },
  { value: "2", label: "2 jaar", rate: "5.7%" },
  { value: "3", label: "3 jaar", rate: "5.15%" },
  { value: "5", label: "5 jaar", rate: "5.05%" },
  { value: "7", label: "7 jaar", rate: "5.25%" },
  { value: "10", label: "10 jaar", rate: "5.4%" },
];

const repaymentOptions = [
  { value: "volledig", label: "Volledig aflossen", description: "Rente + volledige aflossing" },
  { value: "50", label: "50% aflossen", description: "Rente + halve aflossing" },
  { value: "zonder", label: "Zonder aflossing", description: "Alleen rente betalen" },
];

export default function PrototypeB() {
  const [step, setStep] = useState<Step>("propertyType");
  const [formData, setFormData] = useState<CalculatorFormData>({
    propertyAddress: "",
    propertyValue: "",
    loanAmount: "",
    propertyType: "woning",
    duration: "10",
    repaymentType: "volledig",
  });
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

  const handleCalculate = () => {
    if (formData.propertyValue && formData.loanAmount) {
      const calculatedResults = calculateResults(formData);
      setResults(calculatedResults);
      setShowCTA(true);
      setStep("results");
    }
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    return new Intl.NumberFormat("nl-NL").format(parseInt(numbers));
  };

  const handleValueChange = (field: "propertyValue" | "loanAmount", value: string) => {
    const numbers = value.replace(/\D/g, "");
    setFormData(prev => ({ ...prev, [field]: numbers }));
  };

  const stepNumber =
    step === "propertyType" ? 1 :
    step === "amounts" ? 2 :
    step === "loanTerms" ? 3 : 4;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Badge variant="outline" className="text-xs" data-testid="badge-prototype-b">
                  Prototype B - Visual Wizard
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Slimme leningcalculator voor uw vastgoedinvestering
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {step !== "results" && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Stap {stepNumber} van 3</span>
              <span className="text-sm font-medium text-primary">{Math.round((stepNumber / 3) * 100)}%</span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(stepNumber / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Property Type */}
          {step === "propertyType" && (
            <motion.div
              key="propertyType"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Wat voor type pand betreft het?</h2>
                <p className="text-lg text-muted-foreground">Kies het type vastgoed waarvoor u een lening zoekt</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, propertyType: "woning" }))}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    formData.propertyType === "woning"
                      ? "border-primary bg-primary/10 shadow-xl"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <Home className={`h-16 w-16 mx-auto mb-4 ${formData.propertyType === "woning" ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className={`text-2xl font-bold mb-2 ${formData.propertyType === "woning" ? "text-primary" : "text-foreground"}`}>
                    Woning
                  </h3>
                  <p className="text-sm text-muted-foreground">Hypotheek voor particulieren</p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, propertyType: "zakelijk" }))}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    formData.propertyType === "zakelijk"
                      ? "border-primary bg-primary/10 shadow-xl"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <Building2 className={`h-16 w-16 mx-auto mb-4 ${formData.propertyType === "zakelijk" ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className={`text-2xl font-bold mb-2 ${formData.propertyType === "zakelijk" ? "text-primary" : "text-foreground"}`}>
                    Zakelijk
                  </h3>
                  <p className="text-sm text-muted-foreground">Bedrijfspand of kantoor</p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, propertyType: "combinatie" }))}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    formData.propertyType === "combinatie"
                      ? "border-primary bg-primary/10 shadow-xl"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <Calculator className={`h-16 w-16 mx-auto mb-4 ${formData.propertyType === "combinatie" ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className={`text-2xl font-bold mb-2 ${formData.propertyType === "combinatie" ? "text-primary" : "text-foreground"}`}>
                    Combinatie
                  </h3>
                  <p className="text-sm text-muted-foreground">Wonen en werken gecombineerd</p>
                </motion.button>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep("amounts")} size="lg" className="text-lg h-14 px-8">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Amounts */}
          {step === "amounts" && (
            <motion.div
              key="amounts"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Wat is de waarde van het pand en hoeveel wilt u lenen?</h2>
                <p className="text-lg text-muted-foreground">Vul de bedragen in voor uw berekening</p>
              </div>

              <div className="space-y-8 mb-8">
                {/* Property Value */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <label className="text-lg font-semibold mb-4 block">Waarde van het pand</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-lg">€</span>
                    <Input
                      type="text"
                      placeholder="500.000"
                      value={formatCurrencyInput(formData.propertyValue)}
                      onChange={(e) => handleValueChange("propertyValue", e.target.value)}
                      className="w-full pl-10 h-16 text-2xl font-semibold text-center"
                    />
                  </div>
                </div>

                {/* Loan Amount */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <label className="text-lg font-semibold mb-4 block">Gewenste leningshoogte</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-lg">€</span>
                    <Input
                      type="text"
                      placeholder="400.000"
                      value={formatCurrencyInput(formData.loanAmount)}
                      onChange={(e) => handleValueChange("loanAmount", e.target.value)}
                      className="w-full pl-10 h-16 text-2xl font-semibold text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={() => setStep("propertyType")} size="lg" variant="outline" className="text-lg h-14 px-8">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Terug
                </Button>
                <Button
                  onClick={() => setStep("loanTerms")}
                  size="lg"
                  className="text-lg h-14 px-8"
                  disabled={!formData.propertyValue || !formData.loanAmount}
                >
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Loan Terms */}
          {step === "loanTerms" && (
            <motion.div
              key="loanTerms"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Kies uw gewenste looptijd en aflossing</h2>
                <p className="text-lg text-muted-foreground">Selecteer de voorwaarden die bij u passen</p>
              </div>

              <div className="space-y-8 mb-8">
                {/* Duration */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-6 w-6 text-primary" />
                    <label className="text-xl font-semibold">Gewenste looptijd</label>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {durationOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData(prev => ({ ...prev, duration: option.value }))}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          formData.duration === option.value
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className={`font-bold text-2xl mb-1 ${formData.duration === option.value ? "text-primary" : "text-foreground"}`}>
                          {option.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          tot {option.rate} rente
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Repayment Type */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Coins className="h-6 w-6 text-primary" />
                    <label className="text-xl font-semibold">Aflossingstype</label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {repaymentOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData(prev => ({ ...prev, repaymentType: option.value }))}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          formData.repaymentType === option.value
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className={`font-bold text-xl mb-2 ${formData.repaymentType === option.value ? "text-primary" : "text-foreground"}`}>
                          {option.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={() => setStep("amounts")} size="lg" variant="outline" className="text-lg h-14 px-8">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Terug
                </Button>
                <Button onClick={handleCalculate} size="lg" className="text-lg h-14 px-8">
                  Bereken resultaten <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
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

              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    setStep("propertyType");
                    setResults(null);
                    setShowCTA(false);
                  }}
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8"
                >
                  Nieuwe berekening
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
