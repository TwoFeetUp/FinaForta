import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Zap, Heart, Sparkles } from "lucide-react";
import GradientText from "@/components/GradientText";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex justify-center mb-8 md:mb-10">
          <Logo linkToHome={false} />
        </div>
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            <GradientText animationSpeed={6} showBorder={false}>
              Leningcalculator
            </GradientText>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Test drie verschillende gebruikerservaringen voor onze leningcalculator.
          </p>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Kies een variant om te beginnen.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <Card className="hover-elevate transition-all" data-testid="card-prototype-a">
            <CardHeader className="space-y-5">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Prototype A: Classic Form</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Professionele side-by-side layout met traditionele input fields.
                Clean en direct met live currency formatting en gated resultaten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-foreground">Kenmerken:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Traditional text inputs</li>
                  <li>• Side-by-side layout</li>
                  <li>• Lead capture before results</li>
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
            <CardHeader className="space-y-5">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Prototype B: Visual Selector</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Visuele wizard interface met grote klikbare tiles en preset buttons.
                4-stappen flow met progress indicator en instant resultaten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-foreground">Kenmerken:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Large visual cards & tiles</li>
                  <li>• Preset amount buttons</li>
                  <li>• Wizard flow with progress bar</li>
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
            <CardHeader className="space-y-5">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Prototype C: Conversational</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Chat-style conversational flow met interactieve sliders en live LTV feedback.
                Persoonlijk met naam-gebruik en gradient chat bubbles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-foreground">Kenmerken:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Chat bubble interface</li>
                  <li>• Interactive sliders with LTV</li>
                  <li>• Personal name-based flow</li>
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
