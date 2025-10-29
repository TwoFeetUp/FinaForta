import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number to Dutch standard (Nederlandse standaard)
 * Duizendtal separator: punt (.)
 * Decimaal separator: komma (,)
 * Bijvoorbeeld: 500.000
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number as currency in Dutch standard (Nederlandse standaard)
 * Duizendtal separator: punt (.)
 * Decimaal separator: komma (,)
 * Bijvoorbeeld: €500.000,00
 */
export function formatCurrency(value: number, includeDecimals: boolean = false): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(value);
}

/**
 * Format a string input to Dutch number format for display in input fields
 * Strips non-digits and formats with Dutch separators
 */
export function formatCurrencyInput(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (!numbers) return "";
  return formatNumber(parseInt(numbers));
}

/**
 * Property types configuration with LTV (Loan-to-Value) and interest rate (Rente)
 * Based on FinaForte official rates
 */
export const PROPERTY_TYPES_CONFIG = {
  bedrijfspand: {
    label: "Bedrijfspand",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "Factory",
    color: "bg-slate-100 border-slate-300 text-slate-700",
    description: "Algemeen bedrijfspand",
  },
  bedrijfspand_met_bedrijfswoning: {
    label: "Bedrijfspand met bedrijfswoning",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "Building",
    color: "bg-indigo-100 border-indigo-300 text-indigo-700",
    description: "Combinatie bedrijfspand en woning",
  },
  kantoor: {
    label: "Kantoor",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "Building2",
    color: "bg-blue-100 border-blue-300 text-blue-700",
    description: "Kantoor en bedrijfsruimte",
  },
  woning_voor_verhuur: {
    label: "Woning voor de verhuur",
    maxLTV: 85,
    interestRate: 5.25,
    icon: "Home",
    color: "bg-green-100 border-green-300 text-green-700",
    description: "Verhuurbare woning",
  },
  transformatie: {
    label: "Transformatie",
    maxLTV: 80,
    interestRate: 8.00,
    icon: "Hammer",
    color: "bg-amber-100 border-amber-300 text-amber-700",
    description: "Transformatie project",
  },
  winkel: {
    label: "Winkel",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "Store",
    color: "bg-pink-100 border-pink-300 text-pink-700",
    description: "Winkelruimte",
  },
  woon_winkelpand: {
    label: "Woon/Winkelpand",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "Building",
    color: "bg-purple-100 border-purple-300 text-purple-700",
    description: "Combinatie wonen en winkel",
  },
  horeca: {
    label: "Horeca",
    maxLTV: 75,
    interestRate: 7.75,
    icon: "UtensilsCrossed",
    color: "bg-red-100 border-red-300 text-red-700",
    description: "Restaurant, café, hotel",
  },
  recreatiewoning_voor_verhuur: {
    label: "Recreatiewoning voor de verhuur",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "Smile",
    color: "bg-cyan-100 border-cyan-300 text-cyan-700",
    description: "Recreatiewoning verhuur",
  },
  supermarkt: {
    label: "Supermarkt",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "ShoppingCart",
    color: "bg-orange-100 border-orange-300 text-orange-700",
    description: "Supermarkt",
  },
  zorgvastgoed: {
    label: "Zorgvastgoed",
    maxLTV: 75,
    interestRate: 7.25,
    icon: "Heart",
    color: "bg-rose-100 border-rose-300 text-rose-700",
    description: "Zorgfaciliteiten en medisch",
  },
  agrarisch: {
    label: "Agrarisch",
    maxLTV: 65,
    interestRate: 7.25,
    icon: "Wheat",
    color: "bg-lime-100 border-lime-300 text-lime-700",
    description: "Agrarisch vastgoed",
  },
  verbouwing_woning: {
    label: "Verbouwing woning",
    maxLTV: 85,
    interestRate: 5.25,
    icon: "Wrench",
    color: "bg-teal-100 border-teal-300 text-teal-700",
    description: "Verbouwing van woning",
  },
  verbouwing_bedrijfspand: {
    label: "Verbouwing bedrijfspand",
    maxLTV: 75,
    interestRate: 7.75,
    icon: "HardHat",
    color: "bg-yellow-100 border-yellow-300 text-yellow-700",
    description: "Verbouwing van bedrijfspand",
  },
  verduurzaming: {
    label: "Verduurzaming",
    maxLTV: 75,
    interestRate: 7.50,
    icon: "Leaf",
    color: "bg-emerald-100 border-emerald-300 text-emerald-700",
    description: "Duurzaamheidsprojecten",
  },
} as const;

export type PropertyType = keyof typeof PROPERTY_TYPES_CONFIG;

/**
 * Amortization types for loan repayment
 */
export const AMORTIZATION_TYPES = {
  annuity: {
    label: "Annuïteitsaflossing",
    description: "Gelijke maandlasten gedurende hele looptijd",
  },
  linear: {
    label: "Lineaire aflossing",
    description: "Afnemende maandlasten (dalend)",
  },
} as const;

export type AmortizationType = keyof typeof AMORTIZATION_TYPES;

/**
 * Property usage types configuration
 */
export const PROPERTY_USAGE_CONFIG = {
  eigen_gebruik: {
    label: "Eigen gebruik",
    description: "Ik ga het pand zelf gebruiken",
    icon: "Home",
    color: "bg-primary/10 border-primary text-primary",
  },
  verhuur: {
    label: "Verhuur",
    description: "Ik ga het pand verhuren",
    icon: "Building2",
    color: "bg-blue-100 border-blue-300 text-blue-700",
  },
  combinatie: {
    label: "Combinatie",
    description: "Deels eigen gebruik, deels verhuur",
    icon: "Layers",
    color: "bg-purple-100 border-purple-300 text-purple-700",
  },
  verkoop: {
    label: "Verkoop",
    description: "Ik ga het pand doorverkopen",
    icon: "TrendingUp",
    color: "bg-orange-100 border-orange-300 text-orange-700",
  },
} as const;

export type PropertyUsage = keyof typeof PROPERTY_USAGE_CONFIG;

/**
 * Get the maximum LTV percentage for a property type
 */
export function getMaxLTV(propertyType: PropertyType): number {
  return PROPERTY_TYPES_CONFIG[propertyType].maxLTV;
}

/**
 * Get the interest rate for a property type
 */
export function getInterestRate(propertyType: PropertyType): number {
  return PROPERTY_TYPES_CONFIG[propertyType].interestRate;
}

/**
 * Get the maximum loan amount based on property value and type
 */
export function getMaxLoanAmount(propertyValue: number, propertyType: PropertyType): number {
  const maxLTV = getMaxLTV(propertyType);
  return Math.floor((propertyValue * maxLTV) / 100);
}

/**
 * Calculate monthly payment based on loan amount, interest rate, and duration (years)
 * Uses annuity formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  durationYears: number = 30
): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = durationYears * 12;

  if (monthlyRate === 0) return loanAmount / numberOfPayments;

  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return Math.round(monthlyPayment * 100) / 100;
}
