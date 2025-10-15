import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2, Home, Calculator, Clock, Coins } from "lucide-react";
import { motion } from "framer-motion";
import type { CalculatorFormData } from "@shared/schema";

interface CalculatorInputVisualProps {
  onCalculate: (data: CalculatorFormData) => void;
  buttonText?: string;
  isLoading?: boolean;
}

const addressDatabase: Record<string, "zakelijk" | "woning"> = {
  radarweg: "zakelijk",
  "radar weg": "zakelijk",
  zuidas: "zakelijk",
  "de zuidas": "zakelijk",
  kalverstraat: "zakelijk",
  damrak: "zakelijk",
  herengracht: "woning",
  prinsengracht: "woning",
  keizersgracht: "woning",
  lelylaan: "woning",
};

const durationOptions = [
  { value: "1", label: "1 jaar", rate: "5.15%" },
  { value: "2", label: "2 jaar", rate: "5.7%" },
  { value: "3", label: "3 jaar", rate: "5.15%" },
  { value: "5", label: "5 jaar", rate: "5.05%" },
  { value: "7", label: "7 jaar", rate: "5.25%" },
  { value: "10", label: "10 jaar", rate: "5.4%" },
];

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
    propertyType: "woning",
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

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    return new Intl.NumberFormat("nl-NL").format(parseInt(numbers));
  };

  const handleValueChange = (field: "propertyValue" | "loanAmount", value: string) => {
    const numbers = value.replace(/\D/g, "");
    setFormData(prev => ({ ...prev, [field]: numbers }));
  };

  const isFormValid = formData.propertyAddress && formData.propertyValue && formData.loanAmount;

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
                value={formatCurrency(formData.propertyValue)}
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
                value={formatCurrency(formData.loanAmount)}
                onChange={(e) => handleValueChange("loanAmount", e.target.value)}
                className="w-full pl-10 h-12 text-base"
                data-testid="input-loan-amount"
              />
            </div>
          </div>

          {/* Property Type - Visual Cards */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Type vastgoed
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData(prev => ({ ...prev, propertyType: "woning" }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.propertyType === "woning"
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <Home className={`h-8 w-8 mx-auto mb-2 ${formData.propertyType === "woning" ? "text-primary" : "text-muted-foreground"}`} />
                <p className={`text-sm font-medium ${formData.propertyType === "woning" ? "text-primary" : "text-foreground"}`}>
                  Woning
                </p>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData(prev => ({ ...prev, propertyType: "zakelijk" }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.propertyType === "zakelijk"
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <Building2 className={`h-8 w-8 mx-auto mb-2 ${formData.propertyType === "zakelijk" ? "text-primary" : "text-muted-foreground"}`} />
                <p className={`text-sm font-medium ${formData.propertyType === "zakelijk" ? "text-primary" : "text-foreground"}`}>
                  Zakelijk
                </p>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData(prev => ({ ...prev, propertyType: "combinatie" }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.propertyType === "combinatie"
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <Calculator className={`h-8 w-8 mx-auto mb-2 ${formData.propertyType === "combinatie" ? "text-primary" : "text-muted-foreground"}`} />
                <p className={`text-sm font-medium ${formData.propertyType === "combinatie" ? "text-primary" : "text-foreground"}`}>
                  Combinatie
                </p>
              </motion.button>
            </div>
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
                    tot {option.rate} rente
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
