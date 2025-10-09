import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Download, FileText, Calendar, X } from "lucide-react";

interface CTASectionProps {
  onEmailSubmit?: (email: string) => void;
  onEbookDownload?: (email: string) => void;
  onQuoteRequest?: (data: { name: string; email: string; phone: string }) => void;
  onScheduleAppointment?: () => void;
}

export default function CTASection({
  onEmailSubmit,
  onEbookDownload,
  onQuoteRequest,
  onScheduleAppointment,
}: CTASectionProps) {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const [quoteData, setQuoteData] = useState({ name: "", email: "", phone: "" });

  const handleEmailSubmit = (type: "summary" | "ebook") => {
    if (!emailValue) return;
    if (type === "summary") {
      onEmailSubmit?.(emailValue);
    } else {
      onEbookDownload?.(emailValue);
    }
    setEmailValue("");
    setActiveForm(null);
  };

  const handleQuoteSubmit = () => {
    if (!quoteData.name || !quoteData.email || !quoteData.phone) return;
    onQuoteRequest?.(quoteData);
    setQuoteData({ name: "", email: "", phone: "" });
    setActiveForm(null);
  };

  return (
    <div className="space-y-6" data-testid="section-cta">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-foreground">Volgende stappen</h3>
        <p className="text-muted-foreground">
          Kies hoe u verder wilt gaan met uw leningaanvraag
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid="card-cta-email">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Email samenvatting</CardTitle>
            </div>
            <CardDescription>
              Ontvang uw berekening per e-mail
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeForm === "email" ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-summary" className="text-sm font-medium">E-mailadres</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setActiveForm(null)}
                    data-testid="button-close-email-form"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  id="email-summary"
                  type="email"
                  placeholder="uw.email@voorbeeld.nl"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  data-testid="input-email-summary"
                />
                <Button
                  onClick={() => handleEmailSubmit("summary")}
                  className="w-full"
                  disabled={!emailValue}
                  data-testid="button-send-email"
                >
                  Verstuur samenvatting
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setActiveForm("email")}
                data-testid="button-request-email"
              >
                Vraag samenvatting aan
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid="card-cta-ebook">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Download e-book</CardTitle>
            </div>
            <CardDescription>
              "Lenen bij Finaforte" - Gratis gids
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeForm === "ebook" ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-ebook" className="text-sm font-medium">E-mailadres</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setActiveForm(null)}
                    data-testid="button-close-ebook-form"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  id="email-ebook"
                  type="email"
                  placeholder="uw.email@voorbeeld.nl"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  data-testid="input-email-ebook"
                />
                <Button
                  onClick={() => handleEmailSubmit("ebook")}
                  className="w-full"
                  disabled={!emailValue}
                  data-testid="button-download-ebook"
                >
                  Download e-book
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setActiveForm("ebook")}
                data-testid="button-request-ebook"
              >
                Download nu
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all border-primary/30" data-testid="card-cta-quote">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Indicatieve offerte</CardTitle>
            </div>
            <CardDescription>
              Persoonlijk voorstel op maat
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeForm === "quote" ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Uw gegevens</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setActiveForm(null)}
                    data-testid="button-close-quote-form"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Naam"
                  value={quoteData.name}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, name: e.target.value }))}
                  data-testid="input-quote-name"
                />
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={quoteData.email}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, email: e.target.value }))}
                  data-testid="input-quote-email"
                />
                <Input
                  type="tel"
                  placeholder="Telefoon"
                  value={quoteData.phone}
                  onChange={(e) => setQuoteData(prev => ({ ...prev, phone: e.target.value }))}
                  data-testid="input-quote-phone"
                />
                <Button
                  onClick={handleQuoteSubmit}
                  className="w-full"
                  disabled={!quoteData.name || !quoteData.email || !quoteData.phone}
                  data-testid="button-submit-quote"
                >
                  Vraag offerte aan
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => setActiveForm("quote")}
                data-testid="button-request-quote"
              >
                Vraag offerte aan
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid="card-cta-appointment">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Plan een afspraak</CardTitle>
            </div>
            <CardDescription>
              Direct in gesprek met een adviseur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={onScheduleAppointment}
              data-testid="button-schedule-appointment"
            >
              Bekijk beschikbare tijden
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
