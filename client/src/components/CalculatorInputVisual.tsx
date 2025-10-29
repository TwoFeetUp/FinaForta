import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Home, Calculator, Clock, Coins, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { CalculatorFormData } from "@shared/schema";
import { formatCurrencyInput, formatCurrency, getMaxLTV, getInterestRate, type PropertyType } from "@/lib/utils";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import PropertyUsageSelector from "@/components/PropertyUsageSelector";

interface CalculatorInputVisualProps {
  onCalculate: (data: CalculatorFormData) => void;
  buttonText?: string;
  isLoading?: boolean;
}

// Address database mapping to property types
const addressDatabase: Record<string, PropertyType> = {
  radarweg: "kantoor",
  "radar weg": "kantoor",
  zuidas: "kantoor",
  "de zuidas": "kantoor",
  kalverstraat: "winkel",
  damrak: "winkel",
  herengracht: "woning_voor_verhuur",
  prinsengracht: "woning_voor_verhuur",
  keizersgracht: "woning_voor_verhuur",
  lelylaan: "woning_voor_verhuur",
};

const durationOptions = [
  { value: "1", label: "1 jaar" },
  { value: "2", label: "2 jaar" },
  { value: "3", label: "3 jaar" },
  { value: "5", label: "5 jaar" },
  { value: "7", label: "7 jaar" },
  { value: "10", label: "10 jaar" },
] as const;

const repaymentOptions = [
  { value: "zonder", label: "Zonder aflossing", description: "Alleen rente betalen" },
  { value: "volledig", label: "Volledig aflossen", description: "Rente + volledige aflossing" },
  { value: "50", label: "50% aflossen", description: "Rente + halve aflossing" },
];

export default function CalculatorInputVisual({ onCalculate, buttonText = "Bereken nu", isLoading = false }: CalculatorInputVisualProps) {
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

  useEffect(() => {
    const addressLower = formData.propertyAddress.toLowerCase().trim();
    for (const [key, type] of Object.entries(addressDatabase)) {
      if (addressLower.includes(key)) {
        setFormData(prev => ({ ...prev, propertyType: type }));
        break;
      }
    }
  }, [formData.propertyAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.propertyAddress && formData.propertyValue && formData.loanAmount) {
      onCalculate(formData);
    }
  };

  const handleValueChange = (field: "propertyValue" | "loanAmount", value: string) => {
    const numbers = value.replace(/\D/g, "");
    setFormData(prev => ({ ...prev, [field]: numbers }));
  };

  // LTV validation
  const propertyValue = parseFloat(formData.propertyValue) || 0;
  const loanAmount = parseFloat(formData.loanAmount) || 0;
  const currentLTV = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
  const maxLTV = getMaxLTV(formData.propertyType);
  const maxLoanAmount = Math.floor((propertyValue * maxLTV) / 100);
  const isLTVValid = currentLTV <= maxLTV || loanAmount === 0;

  // Get interest rate for selected property type
  const indicativeRate = getInterestRate(formData.propertyType);

  const isFormValid = formData.propertyAddress && formData.propertyValue && formData.loanAmount && isLTVValid;

  return (
    <Card className="w-full shadow-lg" data-testid="card-calculator">
      <CardHeader className="space-y-1 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="text-3xl font-bold text-foreground">Leningcalculator</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Bereken uw indicatieve leningsvoorwaarden in enkele seconden
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Address Input */}
          <div className="space-y-3">
            <Label htmlFor="address" className="text-base font-semibold">
              Adres van het pand
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Bijv. Radarweg 29, Amsterdam"
              value={formData.propertyAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, propertyAddress: e.target.value }))}
              className="w-full h-12 text-base"
              data-testid="input-address"
            />
            <p className="text-xs text-muted-foreground">
              We detecteren automatisch het type pand
            </p>
          </div>

          {/* Property Value Input */}
          <div className="space-y-3">
            <Label htmlFor="propertyValue" className="text-base font-semibold">
              Waarde van het pand
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">€</span>
              <Input
                id="propertyValue"
                type="text"
                placeholder="500.000"
                value={formatCurrencyInput(formData.propertyValue)}
                onChange={(e) => handleValueChange("propertyValue", e.target.value)}
                className="w-full pl-10 h-12 text-base"
                data-testid="input-property-value"
              />
            </div>
          </div>

          {/* Loan Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="loanAmount" className="text-base font-semibold">
              Gewenste leningshoogte
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">€</span>
              <Input
                id="loanAmount"
                type="text"
                placeholder="400.000"
                value={formatCurrencyInput(formData.loanAmount)}
                onChange={(e) => handleValueChange("loanAmount", e.target.value)}
                className={`w-full pl-10 h-12 text-base ${!isLTVValid ? "border-red-500" : ""}`}
                data-testid="input-loan-amount"
              />
            </div>

            {/* LTV Validation Error */}
            {!isLTVValid && loanAmount > 0 && propertyValue > 0 && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Dit bedrag is niet mogelijk met de gekozen vastgoedtype. De maximale LTV is {maxLTV}%
                  (max. {formatCurrency(maxLoanAmount)}). Verlaag het leningbedrag of verhoog de pandwaarde.
                </AlertDescription>
              </Alert>
            )}

            {/* LTV Info when valid */}
            {isLTVValid && loanAmount > 0 && propertyValue > 0 && (
              <p className="text-xs text-muted-foreground">
                LTV: {currentLTV.toFixed(1)}% van {maxLTV}% toegestaan
              </p>
            )}
          </div>

          {/* Property Type Selector - 15 Types */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Type vastgoed
            </Label>
            <PropertyTypeSelector
              value={formData.propertyType}
              onChange={(newType) => setFormData(prev => ({ ...prev, propertyType: newType }))}
            />
          </div>

          {/* Dutch Property */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Nederlands vastgoed?</Label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData(prev => ({ ...prev, isDutchProperty: "ja" }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.isDutchProperty === "ja"
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <p className={`text-base font-medium ${formData.isDutchProperty === "ja" ? "text-primary" : "text-foreground"}`}>
                  Ja
                </p>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData(prev => ({ ...prev, isDutchProperty: "nee" }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.isDutchProperty === "nee"
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <p className={`text-base font-medium ${formData.isDutchProperty === "nee" ? "text-primary" : "text-foreground"}`}>
                  Nee
                </p>
              </motion.button>
            </div>
          </div>

          {/* Property Usage */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Wat is uw gebruiksdoel?</Label>
            <PropertyUsageSelector
              value={formData.propertyUsage}
              onChange={(newUsage) => setFormData(prev => ({ ...prev, propertyUsage: newUsage }))}
            />
          </div>

          {/* Duration - Visual Cards */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Gewenste looptijd
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {durationOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, duration: option.value }))}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.duration === option.value
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <p className={`font-bold text-lg ${formData.duration === option.value ? "text-primary" : "text-foreground"}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {indicativeRate}% rente (indicatie)
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Repayment Type - Visual Cards */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Aflossing
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {repaymentOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, repaymentType: option.value }))}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.repaymentType === option.value
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <p className={`font-bold ${formData.repaymentType === option.value ? "text-primary" : "text-foreground"}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-semibold shadow-lg"
            size="lg"
            disabled={!isFormValid || isLoading}
            data-testid="button-calculate"
          >
            {isLoading ? "Berekenen..." : buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
