import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface MaatwerkBeoordelingProps {
  onRequestMaatwerk: () => void;
}

export default function MaatwerkBeoordeling({ onRequestMaatwerk }: MaatwerkBeoordelingProps) {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Maatwerk beoordeling</CardTitle>
        </div>
        <CardDescription className="text-base">
          Past de standaard berekening niet helemaal? We kijken graag naar uw specifieke situatie.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <p className="font-medium text-foreground">
            We kunnen naar de volgende mogelijkheden kijken:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Rentedepot</strong> - Rentevaste periode met flexibiliteit
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Inbreng overwaarde ander onroerend goed</strong> - Gebruik de waarde van bestaand vastgoed
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Bouwdepot</strong> - Gefaseerde uitbetaling bij nieuwbouw of verbouwing
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Combinatiefinanciering</strong> - Meerdere onderpanden in één financiering
              </span>
            </li>
          </ul>
        </div>

        <Button
          onClick={onRequestMaatwerk}
          size="lg"
          className="w-full text-lg h-14"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Maatwerk beoordeling aanvragen
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Een adviseur neemt binnen 24 uur contact met u op voor een vrijblijvend gesprek
        </p>
      </CardContent>
    </Card>
  );
}
