import { useState } from "react";
import PropertyUsageSelector from "@/components/PropertyUsageSelector";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import AmortizationTypeSelector from "@/components/AmortizationTypeSelector";
import Logo from "@/components/Logo";
import type { PropertyType, PropertyUsage, AmortizationType } from "@/lib/utils";

export default function ComponentTest() {
  const [propertyUsage, setPropertyUsage] = useState<PropertyUsage>("eigen_gebruik");
  const [propertyType, setPropertyType] = useState<PropertyType>("woning_voor_verhuur");
  const [amortizationType, setAmortizationType] = useState<AmortizationType>("annuity");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Logo />
          <h1 className="text-3xl font-bold text-foreground">Component Test</h1>
        </div>

        <div className="space-y-12">
          {/* Property Usage Selector */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Wat is uw gebruiksdoel?
            </h2>
            <p className="text-muted-foreground mb-6">
              Selecteer hoe u het pand gaat gebruiken
            </p>
            <PropertyUsageSelector
              value={propertyUsage}
              onChange={setPropertyUsage}
            />
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Geselecteerd: <strong className="text-foreground">{propertyUsage}</strong>
              </p>
            </div>
          </div>

          {/* Property Type Selector */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Type pand
            </h2>
            <p className="text-muted-foreground mb-6">
              Selecteer het type vastgoed
            </p>
            <PropertyTypeSelector
              value={propertyType}
              onChange={setPropertyType}
            />
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Geselecteerd: <strong className="text-foreground">{propertyType}</strong>
              </p>
            </div>
          </div>

          {/* Amortization Type Selector */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Aflossingstype
            </h2>
            <p className="text-muted-foreground mb-6">
              Kies uw aflossingstype
            </p>
            <AmortizationTypeSelector
              value={amortizationType}
              onChange={setAmortizationType}
            />
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Geselecteerd: <strong className="text-foreground">{amortizationType}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
