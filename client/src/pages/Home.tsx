import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Zap, Heart } from "lucide-react";
import GradientText from "@/components/GradientText";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            <GradientText animationSpeed={6} showBorder={false}>
              Finaforte Calculator
            </GradientText>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Test drie verschillende gebruikerservaringen voor onze leningcalculator.
          </p>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Kies een variant om te beginnen.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card className="hover-elevate transition-all" data-testid="card-prototype-a">
            <CardHeader className="space-y-3">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Prototype A: Gated Content</CardTitle>
              <CardDescription className="text-base">
                Test de hypothese van 'hoge drempel' - gebruikers vullen eerst de calculator in 
                en moeten vervolgens hun contactgegevens achterlaten om de resultaten te zien.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-foreground">Kenmerken:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Calculator eerst invullen</li>
                  <li>• Verplichte lead capture voor resultaten</li>
                  <li>• Psychologie van commitment</li>
                </ul>
              </div>
              <Link href="/prototype-a">
                <Button className="w-full" size="lg" data-testid="button-goto-prototype-a">
                  Test Prototype A
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all" data-testid="card-prototype-b">
            <CardHeader className="space-y-3">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Prototype B: Instant Value</CardTitle>
              <CardDescription className="text-base">
                Test de hypothese van 'directe waarde' - gebruikers zien meteen de resultaten
                en krijgen daarna verschillende opties om verder te gaan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-foreground">Kenmerken:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Directe resultaten zonder barrières</li>
                  <li>• Meerdere call-to-actions na resultaten</li>
                  <li>• Vertrouwen door waarde eerst</li>
                </ul>
              </div>
              <Link href="/prototype-b">
                <Button className="w-full" size="lg" data-testid="button-goto-prototype-b">
                  Test Prototype B
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all" data-testid="card-prototype-c">
            <CardHeader className="space-y-3">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Prototype C: Personal Touch</CardTitle>
              <CardDescription className="text-base">
                Test de hypothese van 'persoonlijke connectie' - eerst kennismaken met naam,
                dan samen de berekening maken met persoonlijke begeleiding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-foreground">Kenmerken:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Eerst naam voor persoonlijke aanpak</li>
                  <li>• Begeleiding door het proces</li>
                  <li>• Minimale friction (alleen email voor resultaten)</li>
                </ul>
              </div>
              <Link href="/prototype-c">
                <Button className="w-full" size="lg" data-testid="button-goto-prototype-c">
                  Test Prototype C
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
