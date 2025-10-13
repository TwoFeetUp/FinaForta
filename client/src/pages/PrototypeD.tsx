import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculationResults from "@/components/CalculationResults";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { User, Mail, Sparkles, ArrowRight, Home as HomeIcon, Building2, Calculator as CalcIcon, Check, X } from "lucide-react";
import GradientText from "@/components/GradientText";
import type { CalculationResult } from "@shared/schema";

type Step = "name" | "address" | "propertyType" | "propertyValue" | "loanAmount" | "email" | "results";

const EMAIL_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789@.-_".split("");

export default function PrototypeD() {
  const [step, setStep] = useState<Step>("name");
  const [userName, setUserName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState<"woning" | "zakelijk" | "combinatie">("woning");
  const [propertyValue, setPropertyValue] = useState(500000);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [userEmail, setUserEmail] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [emailProgress, setEmailProgress] = useState("");
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateResults = (): CalculationResult => {
    const ltv = (loanAmount / propertyValue) * 100;

    let baseRate = 3.5;
    if (propertyType === "zakelijk") baseRate += 0.5;
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleConfirmChar = () => {
    const selectedChar = EMAIL_CHARS[currentCharIndex];
    setEmailProgress(emailProgress + selectedChar);
  };

  const handleDeleteChar = () => {
    if (emailProgress.length > 0) {
      setEmailProgress(emailProgress.slice(0, -1));
    }
  };

  const handleFinishEmail = () => {
    console.log("Lead captured:", { name: userName, email: emailProgress, address: propertyAddress, propertyType, propertyValue, loanAmount });
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setStep("results");
  };

  const totalSteps = 7;
  const currentStepNumber =
    step === "name" ? 1 :
    step === "address" ? 2 :
    step === "propertyType" ? 3 :
    step === "propertyValue" ? 4 :
    step === "loanAmount" ? 5 :
    step === "email" ? 6 : 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 flex items-center">
      <div className="container max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl">
              <GradientText animationSpeed={6}>Finaforte</GradientText>
            </h1>
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-d">
              Prototype D - Enhanced UX
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
                <form onSubmit={(e) => { e.preventDefault(); if (propertyAddress.trim()) setStep("propertyType"); }} className="space-y-4">
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

          {/* Step 3: Property Type */}
          {step === "propertyType" && (
            <motion.div
              key="propertyType"
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
                    <p className="text-2xl md:text-3xl font-bold mb-3">Type pand</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Wat voor type pand is het?</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
                <Select value={propertyType} onValueChange={(value: any) => setPropertyType(value)}>
                  <SelectTrigger className="h-14 text-lg rounded-2xl border-2 bg-white dark:bg-background shadow-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="woning">🏠 Woning</SelectItem>
                    <SelectItem value="zakelijk">🏢 Zakelijk</SelectItem>
                    <SelectItem value="combinatie">🏘️ Combinatie</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setStep("propertyValue")} className="w-full h-14 text-lg rounded-2xl shadow-lg" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Property Value */}
          {step === "propertyValue" && (
            <motion.div
              key="propertyValue"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <CalcIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-xl"
                  >
                    <p className="text-2xl md:text-3xl font-bold mb-3">Waarde van het pand</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Wat is de waarde van het pand?</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
                <div className="bg-white dark:bg-card border-2 rounded-3xl p-8 shadow-xl">
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
                    <p className="text-sm text-muted-foreground font-medium">Waarde van het pand</p>
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
                </div>
                <Button onClick={() => setStep("loanAmount")} className="w-full h-14 text-lg rounded-2xl shadow-lg" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 5: Loan Amount */}
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
                      <span className="font-medium text-foreground">Hoeveel wilt u lenen?</span>
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
                </div>
                <Button onClick={() => setStep("email")} className="w-full h-14 text-lg rounded-2xl shadow-lg" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 6: Email - THE SLIDER CHALLENGE */}
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

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
                {/* Email Progress Display */}
                <div className="bg-white dark:bg-card border-2 border-primary rounded-3xl p-6 shadow-xl">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Uw e-mailadres tot nu toe:</p>
                    <div className="min-h-[60px] flex items-center justify-center">
                      <motion.p
                        key={emailProgress}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-3xl md:text-4xl font-mono font-bold text-primary break-all"
                      >
                        {emailProgress || "_"}
                      </motion.p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {emailProgress.length} {emailProgress.length === 1 ? 'letter' : 'letters'} ingevoerd
                    </p>
                  </div>
                </div>

                {/* Character Slider */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 border-2 border-primary/20 rounded-3xl p-8 shadow-xl">
                  <div className="text-center mb-8">
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      Gebruik de slider om elk karakter te selecteren:
                    </p>
                    <motion.div
                      key={`char-${currentCharIndex}`}
                      initial={{ scale: 1.2, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-8xl md:text-9xl font-bold text-primary font-mono"
                    >
                      {EMAIL_CHARS[currentCharIndex]}
                    </motion.div>
                  </div>

                  <div className="mb-8">
                    <Slider
                      value={[currentCharIndex]}
                      onValueChange={([value]) => setCurrentCharIndex(value)}
                      min={0}
                      max={EMAIL_CHARS.length - 1}
                      step={1}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                      <span>a</span>
                      <span>0-9</span>
                      <span>@.-_</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleConfirmChar}
                      className="h-14 text-base bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Check className="mr-2 h-5 w-5" />
                      Bevestig letter
                    </Button>
                    <Button
                      onClick={handleDeleteChar}
                      variant="destructive"
                      className="h-14 text-base"
                      size="lg"
                      disabled={emailProgress.length === 0}
                    >
                      <X className="mr-2 h-5 w-5" />
                      Wis laatste
                    </Button>
                  </div>
                </div>

                {/* Finish Button */}
                <Button
                  onClick={handleFinishEmail}
                  className="w-full h-16 text-lg rounded-2xl shadow-xl"
                  size="lg"
                  disabled={emailProgress.length < 5 || !emailProgress.includes("@")}
                >
                  {emailProgress.length < 5 || !emailProgress.includes("@") ? (
                    <>Voer minimaal 5 karakters in met een @</>
                  ) : (
                    <>
                      Bekijk de berekening <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground italic">
                  Tip: U heeft {EMAIL_CHARS.length} karakters om uit te kiezen (a-z, 0-9, @, ., -, _)
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Step 7: Results */}
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
                      <span className="font-medium text-foreground font-mono">{emailProgress}</span>.
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
