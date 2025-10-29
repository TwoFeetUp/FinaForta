import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from "lucide-react";

interface CTASectionProps {
  onEbookDownload?: () => void;
  onQuoteRequest?: () => void;
  onScheduleAppointment?: () => void;
}

export default function CTASection({
  onEbookDownload,
  onQuoteRequest,
  onScheduleAppointment,
}: CTASectionProps) {

  return (
    <div className="space-y-6" data-testid="section-cta">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-foreground">Volgende stappen</h3>
        <p className="text-muted-foreground">
          Kies hoe u graag contact met ons opneemt
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Download E-book */}
        <Card className="hover:shadow-lg transition-all" data-testid="card-cta-ebook">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="rounded-lg bg-primary/10 p-3">
                <Download className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-lg">Download e-book</CardTitle>
            <CardDescription>
              "Lenen bij Finaforte" - Gratis gids
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={onEbookDownload}
              className="w-full"
              data-testid="button-download-ebook"
            >
              Download nu
            </Button>
          </CardContent>
        </Card>

        {/* Indicatieve Offerte */}
        <Card className="hover:shadow-lg transition-all border-primary/30" data-testid="card-cta-quote">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-lg">Indicatieve offerte</CardTitle>
            <CardDescription>
              Persoonlijk voorstel op maat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={onQuoteRequest}
              className="w-full"
              data-testid="button-request-quote"
            >
              Vraag offerte aan
            </Button>
          </CardContent>
        </Card>

        {/* Plan Afspraak */}
        <Card className="hover:shadow-lg transition-all" data-testid="card-cta-appointment">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="rounded-lg bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-lg">Plan een afspraak</CardTitle>
            <CardDescription>
              Direct in gesprek met een adviseur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={onScheduleAppointment}
              className="w-full"
              data-testid="button-schedule-appointment"
            >
              Beschikbare tijden
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
