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
    if (formData.propertyAddress && formData.propertyValue && formData.loanAmount && formData.duration && formData.repaymentType) {
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

  const isFormValid = formData.propertyAddress && formData.propertyValue && formData.loanAmount && formData.duration && formData.repaymentType;

  const getDurationInterestRate = (duration: string) => {
    const rates: Record<string, number> = {
      "1": 5.15,
      "2": 5.7,
      "3": 5.15,
      "5": 5.05,
      "7": 5.25,
      "10": 5.4,
    };
    return rates[duration] || 5.0;
  };

  const getRepaymentLabel = (type: string) => {
    const labels: Record<string, string> = {
      "zonder": "Zonder aflossing",
      "volledig": "Ja, volledig",
      "50": "Ja, 50%",
    };
    return labels[type] || type;
  };

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

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium">
              Gewenste looptijd
            </Label>
            <Select
              value={formData.duration}
              onValueChange={(value: "1" | "2" | "3" | "5" | "7" | "10") => 
                setFormData(prev => ({ ...prev, duration: value }))
              }
            >
              <SelectTrigger className="w-full" data-testid="select-duration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1" data-testid="option-duration-1">
                  1 jaar - tot en met 5.15% rente (indicatie)
                </SelectItem>
                <SelectItem value="2" data-testid="option-duration-2">
                  2 jaar - tot en met 5.7% rente (indicatie)
                </SelectItem>
                <SelectItem value="3" data-testid="option-duration-3">
                  3 jaar - tot en met 5.15% rente (indicatie)
                </SelectItem>
                <SelectItem value="5" data-testid="option-duration-5">
                  5 jaar - tot en met 5.05% rente (indicatie)
                </SelectItem>
                <SelectItem value="7" data-testid="option-duration-7">
                  7 jaar - tot en met 5.25% rente (indicatie)
                </SelectItem>
                <SelectItem value="10" data-testid="option-duration-10">
                  10 jaar - tot en met 5.4% rente (indicatie)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repayment" className="text-sm font-medium">
              Aflossing
            </Label>
            <Select
              value={formData.repaymentType}
              onValueChange={(value: "zonder" | "volledig" | "50") => 
                setFormData(prev => ({ ...prev, repaymentType: value }))
              }
            >
              <SelectTrigger className="w-full" data-testid="select-repayment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zonder" data-testid="option-repayment-zonder">
                  Zonder aflossing
                </SelectItem>
                <SelectItem value="volledig" data-testid="option-repayment-volledig">
                  Ja, volledig
                </SelectItem>
                <SelectItem value="50" data-testid="option-repayment-50">
                  Ja, 50%
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
