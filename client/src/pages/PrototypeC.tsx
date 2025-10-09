import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalculationResults from "@/components/CalculationResults";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { User, Mail, Sparkles, ArrowRight, Home as HomeIcon, Building2, Calculator as CalcIcon } from "lucide-react";
import GradientText from "@/components/GradientText";
import type { CalculationResult } from "@shared/schema";

type Step = "name" | "address" | "propertyType" | "propertyValue" | "loanAmount" | "email" | "results";

export default function PrototypeC() {
  const [step, setStep] = useState<Step>("name");
  const [userName, setUserName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState<"woning" | "zakelijk" | "combinatie">("woning");
  const [propertyValue, setPropertyValue] = useState(500000);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [userEmail, setUserEmail] = useState("");
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

  const totalSteps = 7;
  const currentStepNumber =
    step === "name" ? 1 :
    step === "address" ? 2 :
    step === "propertyType" ? 3 :
    step === "propertyValue" ? 4 :
    step === "loanAmount" ? 5 :
    step === "email" ? 6 : 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center">
      <div className="container max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl">
              <GradientText animationSpeed={6}>Finaforte</GradientText>
            </h1>
            <Badge variant="outline" className="text-xs" data-testid="badge-prototype-c">
              Prototype C - Chat
            </Badge>
          </div>
        </div>

        {/* Progress Dots */}
        {step !== "results" && (
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: totalSteps - 1 }).map((_, i) => (
              <div
                key={i}
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-lg">
                    <p className="text-2xl md:text-3xl font-semibold mb-3">Hey! Welkom bij Finaforte 👋</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      Laten we beginnen met kennismaken.<br />
                      <span className="font-medium text-foreground">Hoe mag ik je noemen?</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <form onSubmit={(e) => { e.preventDefault(); if (userName.trim()) setStep("address"); }} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Typ hier je naam..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-2xl border-2 bg-background"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg rounded-2xl" size="lg" disabled={!userName.trim()}>
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HomeIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-lg">
                    <p className="text-2xl md:text-3xl font-semibold mb-3">Super {userName}! 🏠</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Wat is het adres van je pand?</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <form onSubmit={(e) => { e.preventDefault(); if (propertyAddress.trim()) setStep("propertyType"); }} className="space-y-4">
                  <div className="relative">
                    <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Bijv. Radarweg 29, Amsterdam"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-2xl border-2 bg-background"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg rounded-2xl" size="lg" disabled={!propertyAddress.trim()}>
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-lg">
                    <p className="text-2xl md:text-3xl font-semibold mb-3">Mooi adres {userName}! 🏗️</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Wat voor type pand is het?</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
                <Select value={propertyType} onValueChange={(value: any) => setPropertyType(value)}>
                  <SelectTrigger className="h-14 text-lg rounded-2xl border-2 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="woning">🏠 Woning</SelectItem>
                    <SelectItem value="zakelijk">🏢 Zakelijk</SelectItem>
                    <SelectItem value="combinatie">🏘️ Combinatie</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setStep("propertyValue")} className="w-full h-14 text-lg rounded-2xl" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Property Value with Slider */}
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalcIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-lg">
                    <p className="text-2xl md:text-3xl font-semibold mb-3">Oké, top! 💰</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Wat is de waarde van je pand?</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
                <div className="bg-card border-2 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{formatCurrency(propertyValue)}</p>
                    <p className="text-sm text-muted-foreground">Waarde van het pand</p>
                  </div>
                  <Slider
                    value={[propertyValue]}
                    onValueChange={([value]) => setPropertyValue(value)}
                    min={100000}
                    max={2000000}
                    step={10000}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>€100k</span>
                    <span>€2M</span>
                  </div>
                </div>
                <Button onClick={() => setStep("loanAmount")} className="w-full h-14 text-lg rounded-2xl" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 5: Loan Amount with Slider */}
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalcIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-lg">
                    <p className="text-2xl md:text-3xl font-semibold mb-3">Perfect {userName}! 📊</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      <span className="font-medium text-foreground">Hoeveel wil je lenen?</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
                <div className="bg-card border-2 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{formatCurrency(loanAmount)}</p>
                    <p className="text-sm text-muted-foreground">Gewenste leningshoogte</p>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={([value]) => setLoanAmount(value)}
                    min={50000}
                    max={Math.min(propertyValue, 1500000)}
                    step={10000}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>€50k</span>
                    <span>{formatCurrency(Math.min(propertyValue, 1500000))}</span>
                  </div>
                </div>
                <Button onClick={() => setStep("email")} className="w-full h-14 text-lg rounded-2xl" size="lg">
                  Volgende <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 6: Email */}
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-lg">
                    <p className="text-2xl md:text-3xl font-semibold mb-3">Fantastisch {userName}! 🎉</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      Ik heb je berekening klaar staan!<br />
                      <span className="font-medium text-foreground">Wat is je e-mailadres?</span>
                    </p>
                  </div>
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
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="jouw.email@voorbeeld.nl"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-2xl border-2 bg-background"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg rounded-2xl" size="lg" disabled={!userEmail.trim()}>
                    Bekijk mijn berekening <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Door verder te gaan accepteer je onze voorwaarden en privacyverklaring
                  </p>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Step 7: Results */}
          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-card border-2 rounded-3xl rounded-tl-sm p-6 shadow-lg">
                    <p className="text-2xl md:text-3xl font-semibold mb-3">Gelukt {userName}! 🎊</p>
                    <p className="text-muted-foreground text-base md:text-lg">
                      Hier is je persoonlijke berekening. We hebben ook een kopie naar{" "}
                      <span className="font-medium text-foreground">{userEmail}</span> gestuurd!
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-background/50 backdrop-blur rounded-3xl border-2 p-6">
                <CalculationResults results={results} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
