import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Zap, Heart, Sparkles } from "lucide-react";
import GradientText from "@/components/GradientText";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex justify-center mb-6">
          <Logo linkToHome={false} />
        </div>
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-bold text-primary">
            Leningcalculator
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-1">
            Test drie verschillende gebruikerservaringen voor onze leningcalculator.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
            Kies een variant om te beginnen.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto md:items-stretch">
          <Card className="hover-elevate transition-all flex flex-col relative z-10" data-testid="card-prototype-a">
            <CardHeader className="space-y-3 pb-4">
              <div className="rounded-lg bg-primary/10 p-2.5 w-fit">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Prototype A: Classic Form</CardTitle>
              <CardDescription className="text-sm leading-relaxed min-h-[3.5rem]">
                Professionele side-by-side layout met traditionele input fields.
                Clean en direct met live currency formatting en gated resultaten.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col">
              <div className="space-y-3 mb-6 flex-1">
                <h4 className="font-medium text-xs text-foreground">Kenmerken:</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Traditional text inputs</li>
                  <li>• Side-by-side layout</li>
                  <li>• Lead capture before results</li>
                </ul>
              </div>
              <Link href="/prototype-a">
                <Button className="w-full" size="default" data-testid="button-goto-prototype-a">
                  Test Prototype A
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all flex flex-col relative z-10" data-testid="card-prototype-b">
            <CardHeader className="space-y-3 pb-4">
              <div className="rounded-lg bg-primary/10 p-2.5 w-fit">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Prototype B: Visual Selector</CardTitle>
              <CardDescription className="text-sm leading-relaxed min-h-[3.5rem]">
                Visuele wizard interface met grote klikbare tiles en preset buttons.
                4-stappen flow met progress indicator en instant resultaten.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col">
              <div className="space-y-3 mb-6 flex-1">
                <h4 className="font-medium text-xs text-foreground">Kenmerken:</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Large visual cards & tiles</li>
                  <li>• Preset amount buttons</li>
                  <li>• Wizard flow with progress bar</li>
                </ul>
              </div>
              <Link href="/prototype-b">
                <Button className="w-full" size="default" data-testid="button-goto-prototype-b">
                  Test Prototype B
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all flex flex-col relative z-10" data-testid="card-prototype-c">
            <CardHeader className="space-y-3 pb-4">
              <div className="rounded-lg bg-primary/10 p-2.5 w-fit">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Prototype C: Conversational</CardTitle>
              <CardDescription className="text-sm leading-relaxed min-h-[3.5rem]">
                Chat-style conversational flow met interactieve sliders en live LTV feedback.
                Persoonlijk met naam-gebruik en gradient chat bubbles.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col">
              <div className="space-y-3 mb-6 flex-1">
                <h4 className="font-medium text-xs text-foreground">Kenmerken:</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Chat bubble interface</li>
                  <li>• Interactive sliders with LTV</li>
                  <li>• Personal name-based flow</li>
                </ul>
              </div>
              <Link href="/prototype-c">
                <Button className="w-full" size="default" data-testid="button-goto-prototype-c">
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
