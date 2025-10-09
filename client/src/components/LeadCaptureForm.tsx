import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, User, Phone } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit: (data: { name: string; email: string; phone?: string }) => void;
  title?: string;
  description?: string;
  buttonText?: string;
  isLoading?: boolean;
  showPhone?: boolean;
}

export default function LeadCaptureForm({
  onSubmit,
  title = "Bijna klaar!",
  description = "Vul uw gegevens in om uw persoonlijke berekening te zien",
  buttonText = "Bekijk berekening",
  isLoading = false,
  showPhone = false,
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      email: formData.email,
      ...(showPhone && formData.phone ? { phone: formData.phone } : {}),
    });
  };

  const isValid = formData.name && formData.email;

  return (
    <Card className="w-full" data-testid="card-lead-capture">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Naam
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Uw volledige naam"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="pl-10"
                data-testid="input-name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              E-mailadres
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="uw.email@voorbeeld.nl"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                data-testid="input-email"
              />
            </div>
          </div>

          {showPhone && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Telefoonnummer <span className="text-muted-foreground">(optioneel)</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+31 6 12345678"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10"
                  data-testid="input-phone"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!isValid || isLoading}
            data-testid="button-submit-lead"
          >
            {isLoading ? "Laden..." : buttonText}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Door verder te gaan accepteert u onze voorwaarden en privacyverklaring
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
