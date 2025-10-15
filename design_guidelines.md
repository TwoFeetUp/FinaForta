# Design Guidelines: FinaForte Loan Calculator (A/B Testing Prototypes)

**BELANGRIJKE NOTE**: Deze design guidelines zijn gebaseerd op de officiële FinaForte Brand Styleguide. Alle kleuren, typografie en design elementen moeten exact overeenkomen met de merkidentiteit zoals beschreven in `attached_assets/FINAFORTE BRAND STYLEGUIDE-def-2022 14.21.20 (1).pdf`.

## Design Approach
**FinaForte Merkidentiteit**: Professionele, minimalistisch design met mintgroene hoofdkleur dat vertrouwen en expertise uitstraalt. De focus ligt op ondernemers die hypotheken en financieringen nodig hebben, met hoogste klanttevredenheid (9,9) als kernwaarde.

## Core Design Principles
1. **Trust Through Professionalism**: Minimalistisch en professioneel design dat financiële expertise uitstraalt
2. **Clarity Above All**: Heldere visuele hiërarchie die calculator inputs en resultaten prioriteert
3. **Conversion-Focused**: Strategische plaatsing van CTAs en lead capture elementen
4. **Instant Feedback**: Real-time berekeningen met vloeiende transities
5. **Brand Consistency**: Strikte naleving van FinaForte merkidentiteit

## Color Palette

### Primary Brand Colors
- **Mintgroen (Primary Brand Color)**:
  - HEX: `#00A2AA`
  - RGB: `0, 162, 170`
  - CMYK: 77, 12, 35, 1
  - **Gebruik**: Logo, primary buttons, accenten, trust elementen, headers

- **Donkergroen (Dark Brand Color)**:
  - HEX: `#00292B`
  - RGB: `0, 41, 43`
  - CMYK: 96, 58, 60, 71
  - **Gebruik**: Donkere accenten, contrast elementen

### Mintgroen Tinten (Gradient Scale)
- `#E8F5F6` - Zeer licht (backgrounds, subtle accents)
- `#D1EBEE` - Licht
- `#A5D8DC` - Medium licht
- `#7BC4CB` - Medium
- `#58B2BA` - Medium donker
- `#00A2AA` - **Primary brand color**
- `#00838B` - Donker
- `#09686E` - Zeer donker
- `#025256` - Extra donker
- `#013D40` - Diepste tint
- `#00292B` - Donkerste groen

### Steunkleuren & Conversie Kleuren
- **Oranje (Primary CTA Button)**:
  - HEX: `#F28E18`
  - RGB: `242, 142, 24`
  - CMYK: 0, 52, 94, 0
  - **Gebruik**: Primaire CTA buttons ("Gratis gesprek", "Bereken", etc.)

- **Soft Oranje (Hover State)**:
  - HEX: `#F6A75B`
  - RGB: `246, 167, 91`
  - CMYK: 0, 42, 69, 0
  - **Gebruik**: Button hover states

### Functionele Kleuren
- **Wit**:
  - HEX: `#FFFFFF`
  - RGB: `255, 255, 255`
  - **Gebruik**: Backgrounds, cards, logo variant

- **Zwart**:
  - HEX: `#000000`
  - RGB: `0, 0, 0`
  - **Gebruik**: Alleen voor zwart-wit prints

- **Donkergrijs (Body Text)**:
  - HEX: `#2D2D2D`
  - RGB: `45, 45, 45`
  - CMYK: 71, 61, 57, 50
  - **Gebruik**: Body tekst, beschrijvingen

### Subtiele Steunkleuren (Voor Complexe Illustraties - Gebruik Spaarzaam)
- **Paars**: `#544998` (RGB: 84, 73, 152)
- **Mauve**: `#A783BA` (RGB: 167, 131, 186)
- **Soft Roze**: `#F4ACC8` (RGB: 244, 172, 200)

## Typography

### Font Families
**BELANGRIJK**: FinaForte gebruikt **Public Sans** en **Arvo** - NIET Poppins, Lato of Inter.

- **Public Sans**: Primaire font voor ALLE koppen (H1, H2, H3, etc.) en body tekst
  - Download: [Google Fonts - Public Sans](https://fonts.google.com/specimen/Public+Sans)
  - Gebruik: Headings, body text, buttons, form labels, alle interface tekst

- **Arvo**: Secundaire font voor speciale teksten
  - Download: [Google Fonts - Arvo](https://fonts.google.com/specimen/Arvo)
  - Gebruik: Testimonials, quotes, speciale call-outs

### Font Weights & Sizes
- **H1 (Hoofdkoppen)**: Public Sans, 600-700 (Semibold/Bold), 2.5rem - 3rem
- **H2 (Subkoppen)**: Public Sans, 600 (Semibold), 2rem - 2.25rem
- **H3 (Sectie titels)**: Public Sans, 600 (Semibold), 1.5rem - 1.75rem
- **Body Text**: Public Sans, 400 (Regular), 1rem
- **Small Text**: Public Sans, 400 (Regular), 0.875rem
- **Quotes/Testimonials**: Arvo, 400-700, 1.125rem - 1.5rem (italic voor quotes)
- **Buttons**: Public Sans, 500-600 (Medium/Semibold), 1rem
- **Numbers/Results**: Public Sans, 600-700 (Semibold/Bold), 2rem - 3rem

## Logo Usage

### Logo Variants
- **Volledig Logo**: FinaForte logo + beeldmerk (icon met "F")
- **Beeldmerk Only**: Vierkant icon met "F" (voor favicon, app icons)
- **Kleuren**:
  - Mintgroen (`#00A2AA`) op witte/lichte achtergrond
  - Wit op mintgroene/donkere achtergrond
  - Zwart alleen voor zwart-wit prints

### Logo Whitespace
- **Minimale witruimte**: 50% van de hoogte van het beeldmerk rondom het logo
- **Uitzondering**: App icons en favicons

### Beeldmerk Opties
- Los vierkant met outline
- Gevuld vierkant (mintgroen achtergrond, wit icon)
- In cirkel (outline of gevuld)
- Als favicon

## Design Elements (Typisch FinaForte)

### Design Element 1: Dunne Lijn Versie
- Gebaseerd op het beeldmerk (afgeronde rechthoek outline)
- Dunne lijn versie
- **Gebruik**: Vergroot de lijn groter dan het canvas waarop het staat
- **Effect**: Speels effect met herkenbare merkstijl
- **Toepassing**: Achtergrond decoratie, section dividers, overlay op hero sections

### Design Element 2: Solide Afgeronde Vormen
- Ook gebaseerd op beeldmerk
- Solide versie met afgeronde hoeken
- **Flexibel**: Kan vergroot of verkleind worden
- **Gebruik**: Tekst highlights, content blocks, statistische gegevens (bijv. "50% van de klanten"), CTA containers
- **Afronding**: Geen vaste regels - altijd in balans met het formaat

### Rounded Corners Philosophy
- Gebruik afgeronde hoeken consistent door het hele design
- **Cards**: `rounded-xl` of `rounded-2xl`
- **Buttons**: `rounded-lg`
- **Input fields**: `rounded-lg`
- **Images**: `rounded-xl` met subtle overlay
- Balanceer altijd met het formaat - grotere elementen = grotere border radius

## Iconography

### Icon Style
- **Type**: Minimalistisch line icons
- **Stijl**: Combinatie van ronde en rechte hoeken (balans met logo)
- **Lijndikte**: Medium (2px)
- **Kleuren**:
  - Primair: Mintgroen `#00A2AA`
  - Accent: Oranje `#F28E18` als highlight
  - Alternatief: Wit (op donkere achtergronden)

### Icon Usage
- Gebruik voor diensten (hypotheek, financiering, etc.)
- Gebruik voor features/benefits
- Gebruik in CTA cards met beschrijving
- Oranje highlight voor actieve/belangrijke elementen

## Photography Style

### Fotografie Richtlijnen (Van Brand Styleguide)
- **Lighting**: Veel licht met voldoende contrast
- **Kleuren**: Subtiel terugkerende kleuren uit het FinaForte palet (mintgroen, oranje tinten)
- **Subjects**: Mensen staan over het algemeen centraal - professionals, ondernemers, adviseur-klant interacties
- **Balance**: Ook foto's zonder mensen gebruiken voor balans (kantoor scenes, documenten, laptops)
- **Setting**: Kantooromgeving, professionele settings, lichte en open ruimtes
- **Authenticity**: Echte gesprekken, authentieke momenten, geen overdreven geposeerde stock foto's

### Foto Behandeling
- Optioneel: Gebruik design element 1 (outline) of 2 (solid shape) als overlay/frame
- Ensure logo leesbaar blijft als gebruikt op foto
- Gebruik mintgroen of oranje kleurvlak achter logo indien nodig op drukke foto's

## Layout System

### Spacing Units
Gebruik Tailwind spacing units voor consistentie:
- `4` (1rem / 16px) - Kleine spacing
- `6` (1.5rem / 24px) - Medium spacing
- `8` (2rem / 32px) - Standaard section spacing
- `12` (3rem / 48px) - Grote section spacing
- `16` (4rem / 64px) - Extra grote section spacing
- `20` (5rem / 80px) - Hero/Major section spacing

### Page Structure
- **Container**: `max-w-6xl` of `max-w-7xl` centered met padding `px-6 lg:px-8 py-12 lg:py-16`
- **Card-Based Design**: Witte cards met `rounded-xl` of `rounded-2xl`, subtiele shadows op lichte achtergronden
- **Background**: Licht mintgroen (`#E8F5F6` of `#D1EBEE`) of wit
- **Two-Column Desktop Layout** (waar geschikt):
  - Left: Calculator inputs / content
  - Right: Results / trust elements / illustrations

### Grid System
- Desktop: 2-column of 3-column grids voor CTA sections, features, diensten
- Tablet: 2-column waar mogelijk
- Mobile: Single column, full-width

## Component Library

### Calculator Input Section
- **Container**: Witte card, `rounded-xl` of `rounded-2xl`, shadow `shadow-lg`
- **Background**: Wit `#FFFFFF`
- **Heading**: Public Sans, 600, mintgroen `#00A2AA` of donkergrijs `#2D2D2D`
- **Input Fields**:
  - Large touch-friendly: `py-3 px-4`
  - Border: `border-2 border-gray-200`
  - Focus: `focus:border-[#00A2AA] focus:ring-2 focus:ring-[#00A2AA]/20`
  - Rounded: `rounded-lg`
  - Label: Public Sans, 500, donkergrijs, boven input
  - Placeholder: Light gray
  - Euro symbol: Zichtbaar in of voor input field

### Address Lookup Field
- Autocomplete met dropdown
- Visual indicator bij kadaster data (badge of checkmark icon, mintgroen)
- Smooth transition wanneer property type auto-populated wordt

### Calculation Results Display
- **Container**: Licht mintgroene achtergrond (`#E8F5F6` of `#D1EBEE`) of wit met mintgroene border
- **Layout**: Card met `rounded-xl`, padding `p-6` of `p-8`
- **Numbers**:
  - LTV percentage: Public Sans, 700 (Bold), `text-4xl` of `text-5xl`, mintgroen `#00A2AA`
  - Interest rate: Public Sans, 600, `text-3xl`, donkergrijs
  - Monthly payment: Public Sans, 600, `text-2xl`, donkergrijs, met € symbool
- **Labels**: Public Sans, 400, `text-sm`, light gray
- **Visual Hierarchy**: Belangrijkste metric (LTV) bovenaan, supporting metrics daaronder

### Buttons

#### Primary CTA Button
```css
background: #F28E18 (oranje)
color: #FFFFFF (wit)
font: Public Sans, 500-600
padding: py-3 px-6 (of py-4 px-8 voor grote buttons)
border-radius: rounded-lg
hover: background #F6A75B (soft oranje)
transition: 300ms ease-in-out
```

#### Secondary Button
```css
background: #FFFFFF (wit)
border: 2px solid #00A2AA (mintgroen)
color: #00A2AA (mintgroen)
font: Public Sans, 500
padding: py-3 px-6
border-radius: rounded-lg
hover: background #E8F5F6 (zeer licht mintgroen)
transition: 300ms ease-in-out
```

#### Tertiary/Text Button
```css
background: transparent
color: #00A2AA (mintgroen)
font: Public Sans, 500
underline on hover
```

### Trust Badges & Rating Display
- **9.9 Rating**: Prominently displayed in oranje `#F28E18` of mint rounded box
- **Font**: Public Sans, 700 (Bold), large size `text-5xl` of `text-6xl`
- **Label**: "Klanten beoordelen ons met een" - Public Sans, 400
- **Source**: "BRON: ADVIESKEUZE.NL" - klein, light gray
- **Container**: Kan in design element 2 (afgeronde vorm, oranje achtergrond, wit tekst)

## Prototype-Specific Guidelines

### Prototype A: Gated Content Variant

#### Lead Capture Form (Pre-Results)
- **Trigger**: Na calculator submit, voor resultaten
- **Modal/Inline**: Overlay of inline replacement
- **Background**: Wit, `rounded-xl`, shadow
- **Copy**: "Bijna klaar! Vul uw gegevens in om uw persoonlijke berekening te zien"
- **Fields**:
  - Naam (required)
  - E-mailadres (required)
  - Telefoonnummer (optional)
- **Button**: Oranje CTA `#F28E18`, "Bekijk berekening" of "Ontvang resultaten"
- **Trust Element**: 9.9 rating subtle zichtbaar, "Hoogste slagingskans" USP
- **Psychology**: Anticipation - "Uw resultaten zijn klaar..." met subtle animation

### Prototype B: Instant Value Variant

#### Immediate Results Display
- Resultaten verschijnen direct onder calculator
- Smooth fade-in animatie met upward motion
- Duidelijke visual separation met calculator input

#### Multi-CTA Section
- **Layout**: 2x2 grid (desktop), stacked (mobile)
- **CTA Cards**:
  - Witte cards met `rounded-xl`, border mintgroen of shadow
  - Icon (mintgroen met oranje accent) + title + description
  - Hover: Subtle lift (`-translate-y-1`) + shadow increase
  - Padding: `p-6`
- **Primary CTA**: "Indicatieve offerte aanvragen"
  - Groter of oranje achtergrond voor emphasis
  - Prominent position (top-left of full-width boven anderen)
- **Secondary CTAs**:
  1. "E-mail samenvatting" - Email icon
  2. "Download e-book" - Download icon
  3. "Plan gratis gesprek" - Calendar icon

### Prototype C: [Als van toepassing]
_Te definiëren op basis van A/B test resultaten_

## Animations & Interactions

### Transition Standards
- **Duration**: `300ms` voor alle state changes
- **Easing**: `ease-in-out`
- **Form Sections**: Fade-in/out met `opacity` + `translate-y`
- **Results**: Fade-in van bottom met `translate-y-4` naar `translate-y-0`
- **Buttons**: Hover met `scale-105` en color transition
- **Cards**: Hover met `-translate-y-1` en shadow transition

### Loading States
- Subtle spinner in mintgroen `#00A2AA`
- Of pulse animation op submit button
- "Berekenen..." tekst tijdens calculation

### Success States
- Checkmark icon in mintgroen
- Subtle success message in licht mintgroen background

## Responsive Behavior

### Breakpoints (Tailwind)
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

### Layout Aanpassingen
- **Desktop (lg+)**: Two-column, side-by-side inputs en results/info
- **Tablet (md)**: Single column, full-width cards, maintain spacing
- **Mobile**:
  - Stacked layout
  - Larger touch targets (min 44px height buttons)
  - Full-width buttons en cards
  - Reduced padding (px-4 instead of px-6)

## Illustrations

### Illustratie Stijl (Van Brand Styleguide)
- **Type**: Minimalistisch, flat design
- **Kleuren**:
  - Simpel: Alleen mintgroen tinten en oranje
  - Complex: Volledig palet inclusief paars, mauve, soft roze voor speels effect
- **Subjects**:
  - Mensen in professionele settings (flat, simplified silhouettes)
  - Grafieken en data visualisaties
  - Financiële concepten (piggy bank, calculator, documents, buildings)
- **Style**: Clean lines, geometric shapes, minimal details
- **Background**: Transparant of licht mintgroen

### Illustratie Gebruik
- Hero sections (optioneel)
- Empty states
- Success/confirmation screens
- Feature explanations
- Decorative elements (niet te dominant)

## Content Guidelines

### Tone of Voice
- **Professional maar toegankelijk**
- **Direct en helder**: Geen jargon zonder uitleg
- **Ondernemend**: Spreek ondernemers aan als peers
- **Vertrouwenwekkend**: Gebruik cijfers en feiten (9.9 rating, 95% slagingskans, 10.000+ klanten)
- **Actiegericht**: Clear CTAs, focus op resultaat

### Key Messages
- "Dé nr. 1 in hypotheken en financieringen voor ondernemers"
- "Hoogste slagingskans - 95%+"
- "Klanten beoordelen ons met een 9.9"
- "Wij begrijpen ondernemers"
- "Gratis oriënterend gesprek"
- "Méér dan 10.000 tevreden ondernemers"

### CTA Copy Voorbeelden
- "Gratis gesprek aanvragen"
- "Bereken uw hypotheek"
- "Bekijk uw mogelijkheden"
- "Vraag offerte aan"
- "Plan gratis gesprek"
- "Start berekening"

## Quality Standards & Best Practices

### Brand Consistency
- **ALTIJD** gebruik officiële FinaForte kleuren (mintgroen `#00A2AA`, oranje `#F28E18`)
- **ALTIJD** gebruik Public Sans en Arvo fonts
- **NOOIT** gebruik andere primary colors (geen blauw, geen andere groen tinten dan officiele)
- Refereer altijd naar brand styleguide PDF voor details

### Accessibility
- WCAG AA contrast ratios:
  - Mintgroen `#00A2AA` op wit: ✓ voldoende contrast
  - Donkergrijs `#2D2D2D` op wit: ✓ voldoende contrast voor body text
  - Wit tekst op oranje `#F28E18`: ✓ test altijd
- Keyboard navigation support voor alle interactive elements
- Focus states duidelijk zichtbaar (mintgroene ring)
- Alt tekst voor alle images en icons
- ARIA labels waar nodig

### Performance
- Optimize images (WebP format waar mogelijk)
- Lazy loading voor below-fold content
- Font loading optimizations (font-display: swap)
- Minimize layout shifts (reserve space voor dynamic content)

### Trust Indicators
- 9.9 rating prominent maar niet opdringerig
- "Hoogste slagingskans" messaging
- Security badges subtiel bij forms
- Privacy notes bij lead capture
- Certificering badges (indien van toepassing)

## Testing & Optimization

### A/B Testing Considerations
- Prototype A (Gated) vs Prototype B (Instant Value)
- Track conversion rates voor lead capture
- Monitor completion rates calculator flow
- Heat mapping voor user engagement
- Time on page en scroll depth

### Analytics Events
- Calculator start
- Calculator completion
- Lead form view
- Lead form submission
- CTA clicks (elk type apart)
- PDF downloads
- Phone number clicks

## File References

- **Brand Styleguide**: `attached_assets/FINAFORTE BRAND STYLEGUIDE-def-2022 14.21.20 (1).pdf`
- **Logo Assets**: Zorg voor correcte logo files in mintgroen, wit, en zwart variants
- **Icon Set**: Gebruik consistente minimalist line icons matching brand style

---

**BELANGRIJKE HERINNERING**: Bij twijfel, raadpleeg altijd de officiële FinaForte Brand Styleguide PDF. Merkidentiteit is heilig en moet exact worden gevolgd.
