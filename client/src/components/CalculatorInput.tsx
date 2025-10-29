import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { CalculatorFormData } from "@shared/schema";
import { formatCurrencyInput, formatCurrency, getMaxLTV, getInterestRate, type PropertyType } from "@/lib/utils";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import PropertyUsageSelector from "@/components/PropertyUsageSelector";

interface CalculatorInputProps {
  onCalculate: (data: CalculatorFormData) => void;
  buttonText?: string;
  isLoading?: boolean;
}

export default function CalculatorInput({ onCalculate, buttonText = "Bereken nu", isLoading = false }: CalculatorInputProps) {
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

  const [addressUnknown, setAddressUnknown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Address is optional if addressUnknown is true
    const isValid = formData.propertyValue && formData.loanAmount && (formData.propertyAddress || addressUnknown);
    if (isValid) {
      // Always use annuity amortization
      const completeData = {
        ...formData,
        amortizationType: "annuity",
      };
      onCalculate(completeData as any);
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

  const isFormValid = formData.propertyValue && formData.loanAmount && (formData.propertyAddress || addressUnknown) && isLTVValid;

  return (
    <Card className="w-full" data-testid="card-calculator">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-foreground">Leningcalculator</CardTitle>
        <CardDescription className="text-muted-foreground">
          Bereken uw indicatieve leningsvoorwaarden in enkele seconden
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Type Selector - 15 Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Type vastgoed *</Label>
            <PropertyTypeSelector
              value={formData.propertyType}
              onChange={(newType) => setFormData(prev => ({ ...prev, propertyType: newType }))}
            />
          </div>

          {/* Dutch Property */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nederlands vastgoed? *</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isDutchProperty: "ja" }))}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  formData.isDutchProperty === "ja"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 bg-card text-foreground"
                }`}
              >
                Ja
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isDutchProperty: "nee" }))}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  formData.isDutchProperty === "nee"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 bg-card text-foreground"
                }`}
              >
                Nee
              </button>
            </div>
          </div>

          {/* Property Usage */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Wat is uw gebruiksdoel? *</Label>
            <PropertyUsageSelector
              value={formData.propertyUsage}
              onChange={(newUsage) => setFormData(prev => ({ ...prev, propertyUsage: newUsage }))}
            />
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            {/* Address Input - Collapsible */}
            <AnimatePresence>
              {!addressUnknown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Adres van het pand
                        <span className="text-red-600 ml-1">*</span>
                      </Label>
                    </div>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Bijv. Radarweg 29, Amsterdam"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, propertyAddress: e.target.value }))}
                      data-testid="input-address"
                      required={!addressUnknown}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Address Unknown Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="addressUnknown"
                checked={addressUnknown}
                onCheckedChange={(checked) => {
                  setAddressUnknown(checked as boolean);
                  if (checked) {
                    setFormData(prev => ({ ...prev, propertyAddress: "" }));
                  }
                }}
                data-testid="checkbox-address-unknown"
              />
              <Label htmlFor="addressUnknown" className="text-xs font-medium cursor-pointer">
                Adres nog niet bekend
              </Label>
            </div>
          </div>

          {/* Property Value */}
          <div className="space-y-2">
            <Label htmlFor="propertyValue" className="text-sm font-medium">
              Waarde van het pand *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
              <Input
                id="propertyValue"
                type="text"
                placeholder="500.000"
                value={formatCurrencyInput(formData.propertyValue)}
                onChange={(e) => handleValueChange("propertyValue", e.target.value)}
                className="w-full pl-8"
                data-testid="input-property-value"
                required
              />
            </div>
          </div>

          {/* Loan Amount */}
          <div className="space-y-2">
            <Label htmlFor="loanAmount" className="text-sm font-medium">
              Gewenste leningshoogte *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
              <Input
                id="loanAmount"
                type="text"
                placeholder="400.000"
                value={formatCurrencyInput(formData.loanAmount)}
                onChange={(e) => handleValueChange("loanAmount", e.target.value)}
                className={`w-full pl-8 ${!isLTVValid ? "border-red-500" : ""}`}
                data-testid="input-loan-amount"
                required
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

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium">
              Gewenste looptijd *
            </Label>
            <select
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              data-testid="select-duration"
              required
            >
              <option value="1">1 jaar - {indicativeRate}% rente (indicatie)</option>
              <option value="2">2 jaar - {indicativeRate}% rente (indicatie)</option>
              <option value="3">3 jaar - {indicativeRate}% rente (indicatie)</option>
              <option value="5">5 jaar - {indicativeRate}% rente (indicatie)</option>
              <option value="7">7 jaar - {indicativeRate}% rente (indicatie)</option>
              <option value="10">10 jaar - {indicativeRate}% rente (indicatie)</option>
            </select>
          </div>

          {/* Repayment Percentage */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Aflossing *</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, repaymentType: "zonder" }))}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  formData.repaymentType === "zonder"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 bg-card text-foreground"
                }`}
                data-testid="option-zonder"
              >
                Zonder aflossen
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, repaymentType: "volledig" }))}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  formData.repaymentType === "volledig"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 bg-card text-foreground"
                }`}
                data-testid="option-volledig"
              >
                Volledig aflossen
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, repaymentType: "50" }))}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  formData.repaymentType === "50"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 bg-card text-foreground"
                }`}
                data-testid="option-50"
              >
                50% aflossen
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Annuïtair = Gelijke maandlasten gedurende de looptijd
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
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
