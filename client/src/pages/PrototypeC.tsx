import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculationResults from "@/components/CalculationResults";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { User, Mail, Sparkles, ArrowRight, Home as HomeIcon, Building2, Calculator as CalcIcon, TrendingDown, TrendingUp } from "lucide-react";
import GradientText from "@/components/GradientText";
import Logo from "@/components/Logo";
import type { CalculationResult } from "@shared/schema";

type Step = "name" | "address" | "propertyDetails" | "loanAmount" | "duration" | "repayment" | "email" | "results";

export default function PrototypeC() {
  const [step, setStep] = useState<Step>("name");
  const [userName, setUserName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState<"woning" | "zakelijk" | "combinatie">("woning");
  const [propertyValue, setPropertyValue] = useState(500000);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [duration, setDuration] = useState("10");
  const [repaymentType, setRepaymentType] = useState("volledig");
  const [userEmail, setUserEmail] = useState("");
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateResults = (): CalculationResult => {
    const ltv = (loanAmount / propertyValue) * 100;

    const durationRates: Record<string, number> = {
      "1": 5.15,
      "2": 5.7,
      "3": 5.15,
      "5": 5.05,
      "7": 5.25,
      "10": 5.4,
    };

    let baseRate = durationRates[duration] || 5.0;
    if (propertyType === "zakelijk") baseRate += 0.25;
    if (ltv > 80) baseRate += 0.25;
    if (ltv > 90) baseRate += 0.5;

    const durationNum = parseInt(duration);
    const monthlyRate = baseRate / 100 / 12;
    const numPayments = durationNum * 12;

    let monthlyPayment: number;
    if (repaymentType === "zonder") {
      monthlyPayment = loanAmount * monthlyRate;
    } else if (repaymentType === "50") {
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
      duration: durationNum,
      repaymentType: repaymentLabels[repaymentType] || repaymentType,
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getLTVColor = (ltv: number) => {
    if (ltv <= 70) return "text-green-600 dark:text-green-400";
    if (ltv <= 80) return "text-blue-600 dark:text-blue-400";
    if (ltv <= 90) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  const getLTVLabel = (ltv: number) => {
    if (ltv <= 70) return "Uitstekend";
    if (ltv <= 80) return "Goed";
    if (ltv <= 90) return "Redelijk";
    return "Hoog";
  };

  const currentLTV = (loanAmount / propertyValue) * 100;

  const totalSteps = 8;
  const currentStepNumber =
    step === "name" ? 1 :
    step === "address" ? 2 :
    step === "propertyDetails" ? 3 :
    step === "loanAmount" ? 4 :
    step === "duration" ? 5 :
    step === "repayment" ? 6 :
    step === "email" ? 7 : 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:to-slate-900 flex items-center">
      <div className="container max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white dark:bg-card rounded-2xl p-4 shadow-lg">
              <Logo />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-c">
              Prototype C - Conversational
            </Badge>
          </div>
        </div>

        {/* Progress Dots */}
        {step !== "results" && (
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: totalSteps - 1 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i + 1 <= currentStepNumber ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Name */}
          {step === "name" && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Welkom bij Finaforte</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      Wij helpen u graag met het berekenen van uw leningmogelijkheden.<br />
                      <span className="font-medium text-foreground mt-2 block">Wat is uw naam?</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <form onSubmit={(e) => { e.preventDefault(); if (userName.trim()) setStep("address"); }} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    <Input
                      type="text"
                      placeholder="Uw naam"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-2xl border-2 bg-white dark:bg-background shadow-lg"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg rounded-2xl shadow-lg" size="lg" disabled={!userName.trim()}>
                    Volgende <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Address */}
          {step === "address" && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <HomeIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Bedankt, {userName}</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Wat is het adres van het pand?</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <form onSubmit={(e) => { e.preventDefault(); if (propertyAddress.trim()) setStep("propertyDetails"); }} className="space-y-4">
                  <div className="relative">
                    <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    <Input
                      type="text"
                      placeholder="Bijv. Radarweg 29, Amsterdam"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-2xl border-2 bg-white dark:bg-background shadow-lg"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg rounded-2xl shadow-lg" size="lg" disabled={!propertyAddress.trim()}>
                    Volgende <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Property Details (Type + Value) */}
          {step === "propertyDetails" && (
            <motion.div
              key="propertyDetails"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Details van het pand</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Selecteer het type pand en de waarde</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">

                {/* Property Type Icons */}
                <div className="bg-white dark:bg-card border-2 rounded-3xl p-6 shadow-xl space-y-4">
                  <label className="text-sm font-semibold text-foreground">Type pand</label>
                  <div className="grid grid-cols-3 gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPropertyType("woning")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        propertyType === "woning"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <HomeIcon className={`h-8 w-8 ${propertyType === "woning" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${propertyType === "woning" ? "text-primary" : "text-muted-foreground"}`}>
                        Woning
                      </span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPropertyType("zakelijk")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        propertyType === "zakelijk"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Building2 className={`h-8 w-8 ${propertyType === "zakelijk" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${propertyType === "zakelijk" ? "text-primary" : "text-muted-foreground"}`}>
                        Zakelijk
                      </span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPropertyType("combinatie")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        propertyType === "combinatie"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="relative">
                        <HomeIcon className={`h-8 w-8 ${propertyType === "combinatie" ? "text-primary" : "text-muted-foreground"}`} />
                        <Building2 className={`h-4 w-4 absolute -bottom-1 -right-1 ${propertyType === "combinatie" ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <span className={`text-sm font-medium ${propertyType === "combinatie" ? "text-primary" : "text-muted-foreground"}`}>
                        Combinatie
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Property Value Slider */}
                <div className="bg-white dark:bg-card border-2 rounded-3xl p-8 shadow-xl">
                  <label className="text-sm font-semibold text-foreground block mb-4">Waarde van het pand</label>
                  <motion.div
                    key={propertyValue}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-center mb-8"
                  >
                    <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                      {formatCurrency(propertyValue)}
                    </p>
                  </motion.div>
                  <div className="mb-6">
                    <Slider
                      value={[propertyValue]}
                      onValueChange={([value]) => setPropertyValue(value)}
                      min={100000}
                      max={2000000}
                      step={10000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground font-medium">
                      <span>€100k</span>
                      <span>€2M</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[250000, 500000, 750000, 1000000].map((preset) => (
                      <Button
                        key={preset}
                        onClick={() => setPropertyValue(preset)}
                        variant={propertyValue === preset ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                      >
                        {formatCurrency(preset).replace(/\s/g, '')}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setStep("loanAmount")}
                  className="w-full h-14 text-lg rounded-2xl shadow-lg"
                  size="lg"
                >
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Loan Amount with Enhanced Slider and LTV */}
          {step === "loanAmount" && (
            <motion.div
              key="loanAmount"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <CalcIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Gewenste leningshoogte</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Hoeveel wilt u lenen?</span><br />
                      <span className="text-sm">Gebruik de slider om de leningshoogte aan te passen</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
                <div className="bg-white dark:bg-card border-2 rounded-3xl p-8 shadow-xl">
                  <motion.div
                    key={loanAmount}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-center mb-8"
                  >
                    <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                      {formatCurrency(loanAmount)}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Gewenste leningshoogte</p>
                  </motion.div>

                  {/* LTV Indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${
                      currentLTV <= 70 ? "from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30" :
                      currentLTV <= 80 ? "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30" :
                      currentLTV <= 90 ? "from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30" :
                      "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30"
                    } border-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {currentLTV <= 80 ? (
                          <TrendingDown className={`h-5 w-5 ${getLTVColor(currentLTV)}`} />
                        ) : (
                          <TrendingUp className={`h-5 w-5 ${getLTVColor(currentLTV)}`} />
                        )}
                        <span className="text-sm font-medium text-muted-foreground">Loan-to-Value</span>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getLTVColor(currentLTV)}`}>
                          {currentLTV.toFixed(1)}%
                        </p>
                        <p className={`text-xs font-medium ${getLTVColor(currentLTV)}`}>
                          {getLTVLabel(currentLTV)}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="mb-6">
                    <Slider
                      value={[loanAmount]}
                      onValueChange={([value]) => setLoanAmount(value)}
                      min={50000}
                      max={Math.min(propertyValue, 1500000)}
                      step={10000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground font-medium">
                      <span>€50k</span>
                      <span>{formatCurrency(Math.min(propertyValue, 1500000))}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      Math.floor(propertyValue * 0.5 / 10000) * 10000,
                      Math.floor(propertyValue * 0.7 / 10000) * 10000,
                      Math.floor(propertyValue * 0.8 / 10000) * 10000,
                      Math.floor(propertyValue * 0.9 / 10000) * 10000
                    ].filter(v => v <= Math.min(propertyValue, 1500000)).map((preset) => (
                      <Button
                        key={preset}
                        onClick={() => setLoanAmount(preset)}
                        variant={loanAmount === preset ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                      >
                        {Math.round((preset / propertyValue) * 100)}%
                      </Button>
                    ))}
                  </div>
                </div>
                <Button onClick={() => setStep("duration")} className="w-full h-14 text-lg rounded-2xl shadow-lg" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 5: Duration */}
          {step === "duration" && (
            <motion.div
              key="duration"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <CalcIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Looptijd van de lening</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Wat is uw gewenste looptijd?</span><br />
                      <span className="text-sm">Kies de periode waarin u de lening wilt vastzetten</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
                {[
                  { value: "1", label: "1 jaar", rate: "5.15%" },
                  { value: "2", label: "2 jaar", rate: "5.7%" },
                  { value: "3", label: "3 jaar", rate: "5.15%" },
                  { value: "5", label: "5 jaar", rate: "5.05%" },
                  { value: "7", label: "7 jaar", rate: "5.25%" },
                  { value: "10", label: "10 jaar", rate: "5.4%" },
                ].map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDuration(option.value)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      duration === option.value
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 bg-white dark:bg-card"
                    }`}
                  >
                    <div className="text-left">
                      <p className={`font-bold text-lg ${duration === option.value ? "text-primary" : "text-foreground"}`}>
                        {option.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tot en met {option.rate} rente (indicatie)
                      </p>
                    </div>
                    {duration === option.value && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
                <Button onClick={() => setStep("repayment")} className="w-full h-14 text-lg rounded-2xl shadow-lg mt-6" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 6: Repayment */}
          {step === "repayment" && (
            <motion.div
              key="repayment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Aflossingstype</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Hoe wilt u aflossen?</span><br />
                      <span className="text-sm">Kies de manier waarop u uw lening wilt aflossen</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
                {[
                  { value: "volledig", label: "Volledig aflossen", description: "Rente + volledige aflossing per maand" },
                  { value: "50", label: "50% aflossen", description: "Rente + halve aflossing per maand" },
                  { value: "zonder", label: "Zonder aflossing", description: "Alleen rente betalen per maand" },
                ].map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRepaymentType(option.value)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      repaymentType === option.value
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 bg-white dark:bg-card"
                    }`}
                  >
                    <div className="text-left">
                      <p className={`font-bold text-lg ${repaymentType === option.value ? "text-primary" : "text-foreground"}`}>
                        {option.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    {repaymentType === option.value && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
                <Button onClick={() => setStep("email")} className="w-full h-14 text-lg rounded-2xl shadow-lg mt-6" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 7: Email */}
          {step === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Vrijblijvende berekening</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      Uw berekening is gereed.<br />
                      <span className="font-medium text-foreground mt-2 block">Wat is uw e-mailadres?</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (userEmail.trim()) {
                    console.log("Lead captured:", { name: userName, email: userEmail, address: propertyAddress, propertyType, propertyValue, loanAmount });
                    const calculatedResults = calculateResults();
                    setResults(calculatedResults);
                    setStep("results");
                  }
                }} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    <Input
                      type="email"
                      placeholder="naam@voorbeeld.nl"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-2xl border-2 bg-white dark:bg-background shadow-lg"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg rounded-2xl shadow-lg" size="lg" disabled={!userEmail.trim()}>
                    Bekijk de berekening <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Door verder te gaan accepteert u onze voorwaarden en privacyverklaring
                  </p>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Step 6: Results */}
          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Uw persoonlijke berekening</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      Hieronder vindt u uw indicatieve leningmogelijkheden. Een kopie is verzonden naar{" "}
                      <span className="font-medium text-foreground">{userEmail}</span>.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 dark:bg-background/50 backdrop-blur rounded-3xl border-2 p-6 shadow-xl"
              >
                <CalculationResults results={results} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
