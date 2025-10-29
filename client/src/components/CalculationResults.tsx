import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Percent, Coins, Calendar, ChevronDown } from "lucide-react";
import type { CalculationResult } from "@shared/schema";
import { formatCurrency, formatNumber } from "@/lib/utils";
import MaatwerkBeoordeling from "@/components/MaatwerkBeoordeling";

interface CalculationResultsProps {
  results: CalculationResult;
  className?: string;
  calculatorData?: {
    propertyValue: number;
    loanAmount: number;
    duration: number;
  };
  onRequestMaatwerk?: () => void;
}

// Expandable breakdown section component
function BreakdownSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 border-t border-primary/10 pt-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="w-full justify-start text-xs font-medium text-primary hover:text-primary hover:bg-primary/5 p-0 h-auto py-2"
        data-testid="button-toggle-breakdown"
      >
        <ChevronDown
          className={`h-4 w-4 mr-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        {title}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-xs text-muted-foreground space-y-1 font-mono bg-muted/30 p-2 rounded"
            data-testid="breakdown-content"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CalculationResults({
  results,
  className = "",
  calculatorData,
  onRequestMaatwerk,
}: CalculationResultsProps) {
  const [expandedBreakdowns, setExpandedBreakdowns] = useState<Record<string, boolean>>({});

  const toggleBreakdown = (key: string) => {
    setExpandedBreakdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2).replace('.', ',')}%`;
  };

  const handleMaatwerkRequest = () => {
    if (onRequestMaatwerk) {
      onRequestMaatwerk();
    } else {
      console.log("Maatwerk beoordeling aangevraagd");
      // Default behavior - could show a toast or modal
    }
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
            {calculatorData && (
              <BreakdownSection
                title="Hoe is dit berekend?"
                isOpen={expandedBreakdowns["ltv"]}
                onToggle={() => toggleBreakdown("ltv")}
              >
                <div className="space-y-1">
                  <p>Formule:</p>
                  <p className="text-primary">LTV = (Lening / Pand waarde) × 100</p>
                  <p className="mt-2">Stap-voor-stap:</p>
                  <p>= (€{formatNumber(calculatorData.loanAmount)} / €{formatNumber(calculatorData.propertyValue)}) × 100</p>
                  <p>= {(calculatorData.loanAmount / calculatorData.propertyValue).toFixed(4)} × 100</p>
                  <p className="text-primary mt-1">= {formatPercentage(results.ltv)}</p>
                </div>
              </BreakdownSection>
            )}
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
            <BreakdownSection
              title="Hoe is dit berekend?"
              isOpen={expandedBreakdowns["interest"]}
              onToggle={() => toggleBreakdown("interest")}
            >
              <div className="space-y-1">
                <p>Formule:</p>
                <p className="text-primary">Rente = Basisrente + Premiums</p>
                <p className="mt-2">Premiums worden toegevoegd voor:</p>
                <p>• Zakelijk pand: +0,25%</p>
                <p>• LTV &gt; 80%: +0,25%</p>
                <p>• LTV &gt; 90%: +0,50%</p>
                <p className="mt-2">Uw huidige rente:</p>
                <p className="text-primary">{formatPercentage(results.interestRate)}</p>
                <p className="text-xs mt-1 text-muted-foreground">
                  Dit is een indicatieve rente. De werkelijke rente hangt af van uw persoonlijke situatie en de beoordeling door Finaforte.
                </p>
              </div>
            </BreakdownSection>
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
            {calculatorData && (
              <BreakdownSection
                title="Hoe is dit berekend?"
                isOpen={expandedBreakdowns["monthly"]}
                onToggle={() => toggleBreakdown("monthly")}
              >
                <div className="space-y-1">
                  <p>Formule (annuïteit):</p>
                  <p className="text-primary">Maandlast = K × [r(1+r)^n] / [(1+r)^n - 1]</p>
                  <p className="mt-2">Waarbij:</p>
                  <p>K = Krediet: €{formatNumber(calculatorData.loanAmount)}</p>
                  <p>r = Maandelijkse rente: {(results.interestRate / 100 / 12).toFixed(6)}</p>
                  <p>n = Maanden: {calculatorData.duration * 12}</p>
                  <p className="mt-2">Berekening:</p>
                  <p>= €{formatNumber(calculatorData.loanAmount)} × [{(results.interestRate / 100 / 12).toFixed(6)} × (1 + {(results.interestRate / 100 / 12).toFixed(6)})^{calculatorData.duration * 12}] / [...]</p>
                  <p className="text-primary mt-1">{formatCurrency(results.monthlyPayment)}</p>
                </div>
              </BreakdownSection>
            )}
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
            {calculatorData && results.duration && (
              <BreakdownSection
                title="Hoe is dit berekend?"
                isOpen={expandedBreakdowns["duration"]}
                onToggle={() => toggleBreakdown("duration")}
              >
                <div className="space-y-1">
                  <p>Looptijd:</p>
                  <p className="text-primary">{results.duration} jaar</p>
                  <p className="mt-2">Totaal aflostermijn:</p>
                  <p className="text-primary">{results.duration * 12} maanden</p>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Dit bepaalt de duur van uw lening en de hoogte van uw maandlasten.
                  </p>
                </div>
              </BreakdownSection>
            )}
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

      {/* Maatwerk Beoordeling */}
      <MaatwerkBeoordeling onRequestMaatwerk={handleMaatwerkRequest} />
    </div>
  );
}
