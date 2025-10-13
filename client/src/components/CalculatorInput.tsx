import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Building2, Home, Calculator } from "lucide-react";
import type { CalculatorFormData } from "@shared/schema";

interface CalculatorInputProps {
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

export default function CalculatorInput({ onCalculate, buttonText = "Bereken nu", isLoading = false }: CalculatorInputProps) {
  const [formData, setFormData] = useState<CalculatorFormData>({
    propertyAddress: "",
    propertyValue: "",
    loanAmount: "",
    propertyType: "woning",
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
    <Card className="w-full" data-testid="card-calculator">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-foreground">Leningcalculator</CardTitle>
        <CardDescription className="text-muted-foreground">
          Bereken uw indicatieve leningsvoorwaarden in enkele seconden
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Adres van het pand
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Bijv. Radarweg 29, Amsterdam"
              value={formData.propertyAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, propertyAddress: e.target.value }))}
              className="w-full"
              data-testid="input-address"
            />
            <p className="text-xs text-muted-foreground">
              We detecteren automatisch het type pand
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyValue" className="text-sm font-medium">
              Waarde van het pand
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
              <Input
                id="propertyValue"
                type="text"
                placeholder="500.000"
                value={formatCurrency(formData.propertyValue)}
                onChange={(e) => handleValueChange("propertyValue", e.target.value)}
                className="w-full pl-8"
                data-testid="input-property-value"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanAmount" className="text-sm font-medium">
              Gewenste leningshoogte
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
              <Input
                id="loanAmount"
                type="text"
                placeholder="400.000"
                value={formatCurrency(formData.loanAmount)}
                onChange={(e) => handleValueChange("loanAmount", e.target.value)}
                className="w-full pl-8"
                data-testid="input-loan-amount"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType" className="text-sm font-medium">
              Type vastgoed
            </Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value: "zakelijk" | "woning" | "combinatie") => 
                setFormData(prev => ({ ...prev, propertyType: value }))
              }
            >
              <SelectTrigger className="w-full" data-testid="select-property-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="woning" data-testid="option-woning">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Woning</span>
                  </div>
                </SelectItem>
                <SelectItem value="zakelijk" data-testid="option-zakelijk">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Zakelijk</span>
                  </div>
                </SelectItem>
                <SelectItem value="combinatie" data-testid="option-combinatie">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    <span>Combinatie</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
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
