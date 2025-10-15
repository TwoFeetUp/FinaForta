import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Percent, Coins, Calendar } from "lucide-react";
import type { CalculationResult } from "@shared/schema";

interface CalculationResultsProps {
  results: CalculationResult;
  className?: string;
}

export default function CalculationResults({ results, className = "" }: CalculationResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className={`space-y-6 ${className}`} data-testid="section-results">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-foreground">Uw persoonlijke berekening</h3>
        <p className="text-muted-foreground">
          Indicatieve waarden op basis van uw gegevens
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary/20" data-testid="card-ltv">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Loan-to-Value (LTV)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground" data-testid="text-ltv-value">
              {formatPercentage(results.ltv)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Verhouding lening tot waarde
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20" data-testid="card-interest">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Indicatieve rente
            </CardTitle>
            <Percent className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground" data-testid="text-interest-value">
              {formatPercentage(results.interestRate)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Jaarlijks rentepercentage
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20" data-testid="card-monthly">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Maandlasten
            </CardTitle>
            <Coins className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground" data-testid="text-monthly-value">
              {formatCurrency(results.monthlyPayment)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per maand
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20" data-testid="card-amortization">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {results.duration ? "Looptijd" : "Aflossing"}
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground" data-testid="text-amortization-value">
              {results.duration ? `${results.duration} jaar` : `${results.amortization} jaar`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {results.repaymentType || "Looptijd"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50 border-muted">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Let op:</strong> Dit zijn indicatieve berekeningen. 
            De werkelijke voorwaarden kunnen afwijken en zijn afhankelijk van uw persoonlijke situatie 
            en een uitgebreide beoordeling door Finaforte.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
