# Design Guidelines: Finaforte Loan Calculator (A/B Testing Prototypes)

## Design Approach
**System-Based with Financial Industry Standards**: Drawing from professional financial services design (inspired by modern fintech interfaces like Stripe, Wise, and Dutch financial platforms), emphasizing trust, clarity, and conversion optimization.

## Core Design Principles
1. **Trust Through Professionalism**: Clean, modern aesthetic that conveys financial credibility
2. **Clarity Above All**: Clear visual hierarchy prioritizing calculator inputs and results
3. **Conversion-Focused**: Strategic placement of CTAs and lead capture elements
4. **Instant Feedback**: Real-time calculations with smooth transitions

## Color Palette

### Primary Colors
- **Deep Blue**: 220 75% 25% (primary brand, headers, trust elements)
- **White**: 0 0% 100% (backgrounds, cards)
- **Charcoal**: 220 15% 20% (body text)

### Accent Colors
- **Orange/Coral**: 25 95% 55% (primary CTA buttons, interactive elements)
- **Gold**: 45 90% 60% (secondary accents, highlights - use sparingly)

### Functional Colors
- **Success Green**: 145 65% 45% (positive results, confirmations)
- **Neutral Gray**: 220 10% 95% (backgrounds, dividers)
- **Input Borders**: 220 20% 85% (form fields)

## Typography
- **Primary Font**: Poppins (headings, buttons, important numbers)
- **Secondary Font**: Lato or Inter (body text, form labels, descriptions)
- **Font Weights**: 
  - Headings: 600-700 (semibold to bold)
  - Body: 400 (regular)
  - Numbers/Results: 500-600 (medium to semibold)

## Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20 for consistency (p-4, mt-8, mb-12, etc.)

### Page Structure (Both Prototypes)
- **Container**: max-w-4xl centered with generous padding (px-6 py-12)
- **Card-Based Design**: Elevated white cards with subtle shadows on neutral backgrounds
- **Two-Column Desktop Layout** (where appropriate):
  - Left: Calculator inputs
  - Right: Information/trust elements (later results for Prototype B)

## Component Library

### Calculator Input Section
- **Card Container**: White background, rounded corners (rounded-xl), subtle shadow
- **Input Fields**: 
  - Large touch-friendly fields (py-3 px-4)
  - Clear labels above inputs
  - Placeholder text in light gray
  - Border focus states with brand blue
  - Number inputs with currency formatting (€)

### Address Lookup Field
- Autocomplete-style input with dropdown suggestions
- Visual indicator when kadaster data is recognized (small badge or icon)
- Smooth transition when type is auto-populated

### Calculation Results Display
- **Large Number Presentation**: 
  - LTV percentage in bold, large font (text-4xl)
  - Interest rate prominently displayed
  - Monthly costs clearly formatted with € symbol
- **Visual Hierarchy**: Most important metric (LTV) at top, supporting metrics below
- **Card/Panel Design**: Light background to differentiate from inputs

### Prototype A: Gated Content Variant

#### Lead Capture Form (Pre-Results)
- **Modal-Style Overlay** or **Inline Replacement** of calculator
- **Copy**: "Bijna klaar! Vul uw gegevens in om uw persoonlijke berekening te zien"
- **Fields**: Naam, E-mailadres (required)
- **Button**: Prominent orange/coral "Bekijk berekening" button
- **Psychology**: Use anticipation - show loading dots or progress indicator

### Prototype B: Instant Value Variant

#### Results Display
- Results appear immediately below calculator with smooth fade-in
- Clear visual separation from input section

#### Multi-CTA Section
- **Layout**: 2x2 grid on desktop, stacked on mobile
- **CTA Cards**: 
  - Equal size, rounded corners
  - Icon + title + brief description
  - Hover state: subtle lift and shadow increase
  - **Primary CTA** ("Indicatieve offerte aanvragen"): Larger or visually emphasized
- **Options**:
  1. Email samenvatting - Email icon, expandable email field
  2. E-book downloaden - Download icon, gated download
  3. Indicatieve offerte aanvragen - Primary emphasis, form trigger
  4. Direct afspraak inplannen - Calendar icon, link/modal

### Buttons
- **Primary CTA**: Orange/coral background, white text, rounded-lg, py-3 px-6
- **Secondary**: White background, brand blue border and text
- **Hover States**: Slight darkening, subtle scale (scale-105)
- **Disabled States**: Reduced opacity (opacity-50)

## Animations & Interactions
- **Transitions**: 300ms ease-in-out for all state changes
- **Form Sections**: Fade-in/fade-out when showing/hiding (opacity + translate)
- **Results Appearance**: Fade-in from bottom with subtle upward motion
- **No Abrupt Changes**: All visibility toggles animated smoothly
- **Loading States**: Subtle spinner or pulse animation during calculation

## Images
**Hero Section**: NO large hero image needed - this is a conversion-focused calculator tool. Begin immediately with value proposition and calculator interface.

**Trust Elements**: 
- Small logos/badges (e.g., trusted certifications, security icons) near CTA buttons
- Optional: Small illustration/icon next to headline showing calculator/mortgage concept

## Responsive Behavior
- **Desktop (lg+)**: Two-column layout, side-by-side inputs and results
- **Tablet (md)**: Single column, full-width cards
- **Mobile**: Stacked layout, larger touch targets (min 44px), full-width buttons

## UX Enhancements
- **Input Validation**: Real-time feedback with gentle color indicators
- **Progress Indication**: Show completion status (e.g., "Stap 1 van 2")
- **Autosave**: Preserve input values if user navigates away
- **Copy to Clipboard**: Allow users to easily share/save results
- **Print-Friendly Results**: Clean result summary layout

## Quality Standards
- Professional financial service aesthetic - no playful elements
- Minimal distractions - focus on conversion funnel
- Accessibility: WCAG AA contrast ratios, keyboard navigation
- Fast loading: Optimize for immediate interactivity
- Trust indicators throughout (security badges, privacy notes)