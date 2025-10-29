# FinaForte Loan Calculator Prototypes

A full-stack TypeScript application featuring multiple loan calculator variants designed for A/B testing different conversion strategies in the financial services industry.

## Overview

This application provides three distinct calculator prototypes, each implementing a different UX approach for lead generation and conversion optimization:

- **Prototype A**: Classic form-based calculator with gated content (lead capture before results)
- **Prototype B**: Visual wizard flow with instant results and multiple CTAs
- **Prototype C**: Conversational chat-style interface with personalized experience

All prototypes share the same core calculation logic while testing different user engagement patterns for optimal conversion rates.

## Features

- Multiple calculator variants for A/B testing
- Real-time loan calculations (LTV, interest rates, monthly payments)
- 15 different property types with specific LTV limits and rates
- Lead capture and tracking with prototype version analytics
- Responsive design following FinaForte brand guidelines
- Full TypeScript type safety across client and server
- PostgreSQL database with Drizzle ORM
- Professional UI with shadcn/ui components

## Tech Stack

### Frontend
- **Framework**: React 18.3 with Vite 5.4
- **Router**: Wouter (lightweight routing)
- **State Management**: TanStack React Query
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

### Backend
- **Server**: Express.js 4.21
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM with drizzle-zod
- **Authentication**: Passport.js (local strategy)

### Development
- **TypeScript**: Strict mode, path aliases
- **Build**: Vite (client) + esbuild (server)
- **Runtime**: tsx for development hot reload

## Project Structure

```
FinaForta/
├── client/                      # React frontend application
│   ├── src/
│   │   ├── App.tsx             # Main routing component
│   │   ├── main.tsx            # React entry point
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/             # shadcn/ui components (30+)
│   │   │   ├── CalculatorInput.tsx
│   │   │   ├── CalculationResults.tsx
│   │   │   ├── LeadCaptureForm.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── ...
│   │   ├── pages/              # Route page components
│   │   │   ├── Home.tsx
│   │   │   ├── PrototypeA.tsx
│   │   │   ├── PrototypeB.tsx
│   │   │   └── PrototypeC.tsx
│   │   ├── lib/
│   │   │   ├── utils.ts        # Utilities & config
│   │   │   └── queryClient.ts
│   │   └── hooks/
│   └── index.html
├── server/                      # Express.js backend
│   ├── index.ts                # Server entry & middleware
│   ├── routes.ts               # API route registration
│   ├── vite.ts                 # Vite dev/prod setup
│   └── storage.ts              # Storage abstraction
├── shared/                      # Shared types & schemas
│   └── schema.ts               # Drizzle ORM + Zod schemas
├── attached_assets/            # Brand assets
│   ├── FINAFORTE BRAND STYLEGUIDE-def-2022.pdf
│   └── Logo FinaForte.png
├── CLAUDE.md                   # Project guidelines
├── design_guidelines.md        # Brand design specs
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FinaForta
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file
DATABASE_URL=postgresql://user:password@host:port/database
PORT=5000
NODE_ENV=development
```

4. Push database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Development Commands

```bash
npm run dev              # Start development server with hot reload
npm run build            # Build both client and server for production
npm start                # Run production build
npm run check            # Run TypeScript type checking
npm run db:push          # Push schema changes to database
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |

## Architecture

### Monorepo Structure

The codebase uses a unified monorepo with three main directories:

- **`client/`**: React frontend application with Vite
- **`server/`**: Express.js backend API
- **`shared/`**: Shared TypeScript types and Zod schemas

### Key Patterns

1. **Unified Development Server**: In development, Express serves the API routes while proxying to Vite's dev server for client assets. In production, Express serves static built assets.

2. **Path Aliases**: TypeScript path aliases for cleaner imports:
   - `@/*` → `client/src/*`
   - `@shared/*` → `shared/*`
   - `@assets/*` → `attached_assets/*`

3. **Schema-Driven Development**: Database schemas defined in `shared/schema.ts` using Drizzle ORM, with Zod validation schemas automatically generated via `drizzle-zod`. Ensures type safety across the full stack.

4. **Storage Abstraction**: The `server/storage.ts` file defines an `IStorage` interface with a `MemStorage` in-memory implementation, designed to be swapped with a database-backed implementation.

### Calculator Logic

All prototypes implement the same core calculation:

```typescript
// Input: property value, loan amount, property type, duration, repayment type

// LTV Calculation
ltv = (loanAmount / propertyValue) * 100

// Interest Rate (from property type configuration)
interestRate = getInterestRate(propertyType)

// Monthly Payment (Annuity formula)
monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, duration)

// Output: LTV%, interest rate, monthly payment
```

### Property Types

The calculator supports 15 different property types, each with specific LTV limits and interest rates:

- Bedrijfspand (maxLTV: 75%, rate: 7.25%)
- Woning voor verhuur (maxLTV: 85%, rate: 5.25%)
- Kantoor (maxLTV: 70%, rate: 7.0%)
- Horeca (maxLTV: 65%, rate: 8.0%)
- And 11 more specialized types...

## Prototype Variants

### Prototype A: Classic Form - Gated Content
- Traditional text input fields
- Side-by-side layout
- Lead capture **before** showing results
- Best for: Generating qualified leads upfront

### Prototype B: Visual Wizard - Instant Value
- Multi-step wizard interface (6 steps)
- Large visual tiles and preset buttons
- Progress indicator
- Instant results with multiple CTAs
- Best for: Visual engagement and higher completion rates

### Prototype C: Conversational - Chat Style
- Interactive chat-like flow
- Sliders for property value and loan amount
- Real-time LTV feedback with color-coded status
- Personal name-based interaction
- Best for: Personalization and engagement

## Database Schema

### Users Table
```typescript
{
  id: varchar (PK, UUID)
  username: text (unique, required)
  password: text (required)
}
```

### Leads Table
```typescript
{
  id: varchar (PK, UUID)
  name: text (required)
  email: text (required)
  phone: text
  propertyAddress: text (required)
  propertyValue: decimal (required)
  loanAmount: decimal (required)
  propertyType: text (required)
  ltv: decimal (required)
  interestRate: decimal (required)
  monthlyPayment: decimal (required)
  prototypeVersion: text (required)  // A/B test tracking
  createdAt: timestamp (default now)
}
```

## Design System

This project follows the **official FinaForte Brand Styleguide**. All design work adheres to the brand identity guidelines found in `attached_assets/FINAFORTE BRAND STYLEGUIDE-def-2022.pdf` and detailed in `design_guidelines.md`.

### Key Brand Elements

- **Primary Color**: Mintgroen/Turquoise `#00A2AA` (RGB: 0, 162, 170)
- **CTA Color**: Oranje `#F28E18` (RGB: 242, 142, 24), hover `#F6A75B`
- **Typography**:
  - **Primary**: Public Sans (headings and body text)
  - **Secondary**: Arvo (testimonials and quotes only)
- **Design Elements**:
  - Rounded corners throughout (cards: `rounded-xl`, buttons: `rounded-lg`)
  - Minimalistic line icons with mintgroen primary
  - High contrast photography with subtle brand colors
  - 300ms ease-in-out transitions

### Critical Brand Rules

- **NEVER** use blue as primary color
- **NEVER** use Poppins, Lato, or Inter fonts
- **ALWAYS** use mintgroen `#00A2AA` and oranje `#F28E18`
- **ALWAYS** use Public Sans and Arvo fonts

For complete specifications, see `design_guidelines.md`.

## Working with Prototypes

To add or modify calculator prototypes:

1. Create a new page in `client/src/pages/`
2. Add the route to `client/src/App.tsx`
3. Reuse existing calculator components:
   - `CalculatorInput.tsx` - Standard form-based input
   - `CalculatorInputVisual.tsx` - Visual/interactive input variant
   - `CalculationResults.tsx` - Results display
   - `LeadCaptureForm.tsx` - Lead capture modal/form
   - `CTASection.tsx` - Multiple call-to-action grid
4. Track the prototype version in lead submissions for A/B test analytics

## Type Safety

- Run `npm run check` frequently to catch TypeScript errors
- The build process includes both Vite build and esbuild for server bundling
- Shared types in `@shared/schema` ensure consistency between client and server

## API Routes

All API routes should be prefixed with `/api`. Current implementation uses in-memory storage. To implement database-backed storage:

1. Update `server/storage.ts` to implement `IStorage` interface with Drizzle ORM queries
2. Replace `MemStorage` with your database implementation
3. Test with `npm run check` and manual API testing

## Contributing

1. Follow the FinaForte brand guidelines (see `design_guidelines.md`)
2. Maintain TypeScript strict mode compliance
3. Use existing UI components from `client/src/components/ui/`
4. Test all calculator variants after making changes
5. Track prototype versions for A/B testing analytics

## License

Copyright FinaForte. All rights reserved.

## Support

For questions or issues, please contact the development team.
