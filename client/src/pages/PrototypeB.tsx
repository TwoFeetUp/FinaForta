import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculationResults from "@/components/CalculationResults";
import CTASection from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { Building2, Home, Calculator, Clock, Coins, Mail, User, Phone, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import type { CalculatorFormData, CalculationResult } from "@shared/schema";
import { formatCurrencyInput, formatCurrency, getInterestRate, getMaxLTV } from "@/lib/utils";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import PropertyUsageSelector from "@/components/PropertyUsageSelector";
import type { PropertyType } from "@/lib/utils";

type Step = "propertyType" | "propertyDetails" | "loanAmount" | "loanTerms" | "contactInfo" | "results";

const durationOptions = [
  { value: "1", label: "1 jaar" },
  { value: "2", label: "2 jaar" },
  { value: "3", label: "3 jaar" },
  { value: "5", label: "5 jaar" },
  { value: "7", label: "7 jaar" },
  { value: "10", label: "10 jaar" },
] as const;

const repaymentOptions = [
  { value: "zonder", label: "Zonder aflossen", description: "Alleen rente betalen" },
  { value: "volledig", label: "Volledig aflossen", description: "Rente + volledige aflossing" },
  { value: "50", label: "50% aflossen", description: "Rente + halve aflossing" },
];

export default function PrototypeB() {
  const [step, setStep] = useState<Step>("propertyType");
  const [propertyType, setPropertyType] = useState<PropertyType>("kantoor");
  const [formData, setFormData] = useState<CalculatorFormData>({
    propertyAddress: "",
    propertyValue: "",
    loanAmount: "",
    propertyType: "kantoor",
    isDutchProperty: "ja",
    propertyUsage: "eigen_gebruik",
    duration: "10",
    repaymentType: "volledig",
  });
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showCTA, setShowCTA] = useState(false);
  const { toast } = useToast();

  const calculateResults = (data: CalculatorFormData): CalculationResult => {
    const propertyValue = parseFloat(data.propertyValue);
    const loanAmount = parseFloat(data.loanAmount);
    const ltv = (loanAmount / propertyValue) * 100;

    // Use interest rate from property type configuration
    const interestRate = getInterestRate(data.propertyType);
    const baseRate = interestRate;

    const duration = parseInt(data.duration);
    const monthlyRate = baseRate / 100 / 12;
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
      interestRate: baseRate,
      monthlyPayment,
      duration,
      repaymentType: repaymentLabels[data.repaymentType] || data.repaymentType,
    };
  };

  const handleCalculate = () => {
    if (formData.propertyValue && formData.loanAmount && userName.trim() && userEmail.trim() && userPhone.trim()) {
      const calculatedResults = calculateResults(formData);
      setResults(calculatedResults);
      setShowCTA(true);
      // Auto-send email summary
      toast({
        title: "Samenvatting verstuurd",
        description: `We hebben de berekening naar ${userEmail} gestuurd.`,
      });
      setStep("results");
    }
  };

  const handleEbookDownload = () => {
    console.log("E-book download for:", userEmail);
    toast({
      title: "E-book gedownload",
      description: "Het e-book 'Lenen bij Finaforte' is naar uw e-mail gestuurd.",
    });
  };

  const handleQuoteRequest = () => {
    console.log("Quote requested:", { name: userName, email: userEmail, phone: userPhone });
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

  const handleMaatwerkRequest = () => {
    console.log("Maatwerk beoordeling aangevraagd");
    toast({
      title: "Maatwerk beoordeling aangevraagd",
      description: "Een adviseur neemt binnen 24 uur contact met u op voor een vrijblijvend gesprek.",
    });
  };

  const handleValueChange = (field: "propertyValue" | "loanAmount", value: string) => {
    const numbers = value.replace(/\D/g, "");
    setFormData(prev => ({ ...prev, [field]: numbers }));
  };

  // LTV validation
  const propertyValue = parseFloat(formData.propertyValue) || 0;
  const loanAmount = parseFloat(formData.loanAmount) || 0;
  const currentLTV = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
  const maxLTV = getMaxLTV(propertyType);
  const maxLoanAmount = Math.floor((propertyValue * maxLTV) / 100);
  const isLTVValid = currentLTV <= maxLTV || loanAmount === 0;

  // Get interest rate for selected property type
  const indicativeRate = getInterestRate(propertyType);

  const stepNumber =
    step === "propertyType" ? 1 :
    step === "propertyDetails" ? 2 :
    step === "loanAmount" ? 3 :
    step === "loanTerms" ? 4 :
    step === "contactInfo" ? 5 : 6;

  const totalSteps = 5;

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
              <span className="text-sm font-medium text-muted-foreground">Stap {stepNumber} van {totalSteps}</span>
              <span className="text-sm font-medium text-primary">{Math.round((stepNumber / totalSteps) * 100)}%</span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(stepNumber / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Property Type Selection */}
          {step === "propertyType" && (
            <motion.div
              key="propertyType"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={(e) => { e.preventDefault(); setStep("propertyDetails"); }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Wat voor type pand betreft het?</h2>
                  <p className="text-lg text-muted-foreground">Selecteer het type vastgoed en het gebruiksdoel</p>
                </div>

                <div className="space-y-8 mb-8">
                {/* Property Type Dropdown */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <label className="text-lg font-semibold mb-4 block">Type vastgoed</label>
                  <PropertyTypeSelector
                    value={propertyType}
                    onChange={(newType) => {
                      setPropertyType(newType);
                      setFormData(prev => ({ ...prev, propertyType: newType }));
                    }}
                  />
                </div>

                {/* Dutch Property */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <label className="text-lg font-semibold mb-4 block">Nederlands vastgoed?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, isDutchProperty: "ja" }))}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.isDutchProperty === "ja"
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className={`font-bold text-xl ${formData.isDutchProperty === "ja" ? "text-primary" : "text-foreground"}`}>
                        Ja
                      </p>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, isDutchProperty: "nee" }))}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.isDutchProperty === "nee"
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className={`font-bold text-xl ${formData.isDutchProperty === "nee" ? "text-primary" : "text-foreground"}`}>
                        Nee
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Property Usage */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <label className="text-lg font-semibold mb-4 block">Wat is uw gebruiksdoel?</label>
                  <PropertyUsageSelector
                    value={formData.propertyUsage}
                    onChange={(newUsage) => setFormData(prev => ({ ...prev, propertyUsage: newUsage }))}
                  />
                </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="text-lg h-14 px-8"
                  >
                    Volgende <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 2: Property Details (Address & Value) */}
          {step === "propertyDetails" && (
            <motion.div
              key="propertyDetails"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={(e) => {
                e.preventDefault();
                if (formData.propertyAddress && formData.propertyValue) {
                  setStep("loanAmount");
                }
              }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Waar bevindt het pand zich?</h2>
                  <p className="text-lg text-muted-foreground">Vul het adres en de waarde van het pand in</p>
                </div>

                <div className="space-y-8 mb-8">
                  {/* Property Address */}
                  <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                    <label className="text-lg font-semibold mb-4 block">Adres van het pand *</label>
                    <Input
                      type="text"
                      placeholder="Bijv. Radarweg 29, Amsterdam"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, propertyAddress: e.target.value }))}
                      className="w-full h-16 text-xl"
                      required
                    />
                  </div>

                  {/* Property Value */}
                  <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                    <label className="text-lg font-semibold mb-4 block">Waarde van het pand *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-lg">€</span>
                      <Input
                        type="text"
                        placeholder="500.000"
                        value={formatCurrencyInput(formData.propertyValue)}
                        onChange={(e) => handleValueChange("propertyValue", e.target.value)}
                        className="w-full pl-10 h-16 text-2xl font-semibold text-center"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={() => setStep("propertyType")} size="lg" variant="outline" className="text-lg h-14 px-8">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Terug
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="text-lg h-14 px-8"
                    disabled={!formData.propertyAddress || !formData.propertyValue}
                  >
                    Volgende <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Loan Amount */}
          {step === "loanAmount" && (
            <motion.div
              key="loanAmount"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={(e) => {
                e.preventDefault();
                if (formData.loanAmount && isLTVValid) {
                  setStep("loanTerms");
                }
              }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Hoeveel wilt u lenen?</h2>
                  <p className="text-lg text-muted-foreground">Vul het gewenste leningbedrag in</p>
                </div>

                <div className="space-y-8 mb-8">
                  {/* Loan Amount */}
                  <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                    <label className="text-lg font-semibold mb-4 block">Gewenste leningshoogte *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-lg">€</span>
                      <Input
                        type="text"
                        placeholder="400.000"
                        value={formatCurrencyInput(formData.loanAmount)}
                        onChange={(e) => handleValueChange("loanAmount", e.target.value)}
                        className={`w-full pl-10 h-16 text-2xl font-semibold text-center ${!isLTVValid ? "border-red-500" : ""}`}
                        required
                      />
                    </div>

                    {/* LTV Validation Error */}
                    {!isLTVValid && loanAmount > 0 && propertyValue > 0 && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Dit bedrag is niet mogelijk met de gekozen vastgoedtype. De maximale LTV is {maxLTV}%
                          (max. {formatCurrency(maxLoanAmount)}). Verlaag het leningbedrag of verhoog de pandwaarde.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* LTV Info when valid */}
                    {isLTVValid && loanAmount > 0 && propertyValue > 0 && (
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        LTV: {currentLTV.toFixed(1)}% van {maxLTV}% toegestaan
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={() => setStep("propertyDetails")} size="lg" variant="outline" className="text-lg h-14 px-8">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Terug
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="text-lg h-14 px-8"
                    disabled={!formData.loanAmount || !isLTVValid}
                  >
                    Volgende <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 4: Loan Terms */}
          {step === "loanTerms" && (
            <motion.div
              key="loanTerms"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={(e) => { e.preventDefault(); setStep("contactInfo"); }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Kies uw gewenste looptijd en aflossingstype</h2>
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
                          {indicativeRate}% rente (indicatie)
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Repayment Percentage */}
                <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Coins className="h-6 w-6 text-primary" />
                    <label className="text-xl font-semibold">Aflossing</label>
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
                          {option.description} (annuïtair)
                        </p>
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Annuïtair = Gelijke maandlasten gedurende de looptijd
                  </p>
                </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={() => setStep("loanAmount")} size="lg" variant="outline" className="text-lg h-14 px-8">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Terug
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="text-lg h-14 px-8"
                  >
                    Volgende <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 5: Contact Info */}
          {step === "contactInfo" && (
            <motion.div
              key="contactInfo"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={(e) => {
                e.preventDefault();
                if (userName.trim() && userEmail.trim() && userPhone.trim()) {
                  handleCalculate();
                }
              }}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Bijna klaar!</h2>
                  <p className="text-lg text-muted-foreground">Vul uw contactgegevens in om de berekening te ontvangen</p>
                </div>

                <div className="space-y-8 mb-8">
                  {/* Contact Info Section */}
                  <div className="bg-card border-2 rounded-2xl p-8 shadow-lg">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Contactgegevens</h3>
                      <p className="text-muted-foreground">We sturen de berekening direct naar uw e-mailadres</p>
                    </div>

                    <div className="space-y-4">
                      {/* Name Field */}
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <Input
                          type="text"
                          placeholder="Uw naam *"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="pl-12 h-14 text-lg rounded-xl border-2"
                          required
                        />
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <Input
                          type="email"
                          placeholder="uw.email@bedrijf.nl *"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="pl-12 h-14 text-lg rounded-xl border-2"
                          required
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <Input
                          type="tel"
                          placeholder="+31 (0)6 12 34 56 78 *"
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          className="pl-12 h-14 text-lg rounded-xl border-2"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={() => setStep("loanTerms")} size="lg" variant="outline" className="text-lg h-14 px-8">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Terug
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="text-lg h-14 px-8"
                    disabled={!userName.trim() || !userEmail.trim() || !userPhone.trim()}
                  >
                    Berekening starten <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 max-w-4xl mx-auto"
            >
              <CalculationResults
                results={results}
                calculatorData={{
                  propertyValue: parseFloat(formData.propertyValue),
                  loanAmount: parseFloat(formData.loanAmount),
                  duration: parseInt(formData.duration),
                }}
                onRequestMaatwerk={handleMaatwerkRequest}
              />

              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <CTASection
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
                    setUserName("");
                    setUserEmail("");
                    setUserPhone("");
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
