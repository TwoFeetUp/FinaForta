# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack TypeScript application for **Finaforte loan calculator prototypes** designed for A/B testing different conversion strategies. The application features multiple calculator variants testing different UX approaches for lead generation in the financial services industry.

**Stack**: React + Vite (frontend), Express.js (backend), PostgreSQL with Drizzle ORM, Tailwind CSS with shadcn/ui components.

## Development Commands

### Running the Application
```bash
npm run dev              # Start development server with hot reload
npm run build            # Build both client and server for production
npm start                # Run production build
npm run check            # Run TypeScript type checking
```

### Database Commands
```bash
npm run db:push          # Push schema changes to database (requires DATABASE_URL env var)
```

**Note**: The development server runs on port 5000 by default (configurable via PORT env variable). This serves both the API and the Vite dev server.

## Architecture

### Monorepo Structure

The codebase uses a unified monorepo with three main directories:

- **`client/`**: React frontend application with Vite
- **`server/`**: Express.js backend API
- **`shared/`**: Shared TypeScript types and Zod schemas used by both client and server

### Key Architectural Patterns

1. **Unified Development Server**: In development, Express serves the API routes while proxying to Vite's dev server for client assets. In production, Express serves static built assets from `dist/public/`.

2. **Path Aliases**: The project uses TypeScript path aliases for cleaner imports:
   - `@/*` → `client/src/*`
   - `@shared/*` → `shared/*`
   - `@assets/*` → `attached_assets/*`

3. **Schema-Driven Development**: Database schemas are defined in `shared/schema.ts` using Drizzle ORM, with Zod validation schemas automatically generated via `drizzle-zod`. This ensures type safety across the full stack.

4. **Storage Abstraction**: The `server/storage.ts` file defines an `IStorage` interface with a `MemStorage` in-memory implementation. This is designed to be swapped with a database-backed implementation when needed.

### Frontend Architecture

**Router**: Uses `wouter` for lightweight client-side routing (not React Router).

**State Management**: React Query (`@tanstack/react-query`) for server state, React hooks for local state.

**UI Components**: Built with shadcn/ui (Radix UI primitives + Tailwind CSS). All UI components are in `client/src/components/ui/`.

**Prototype Pages**: The application has multiple calculator prototypes for A/B testing:
- `PrototypeA`: Gated content variant (lead capture before showing results)
- `PrototypeB`: Instant value variant (results shown immediately with multiple CTAs)
- `PrototypeC`: Another variant (check implementation for specifics)

Each prototype implements the same core calculator logic with different UX patterns for conversion optimization.

### Backend Architecture

**Server Entry Point**: `server/index.ts` sets up Express, middleware, error handling, and starts the HTTP server.

**Routes**: API routes are registered in `server/routes.ts`. All routes should be prefixed with `/api`.

**Request Logging**: Custom middleware logs API requests with timing and response data (truncated to 80 chars).

**Vite Integration**: The `server/vite.ts` file handles development/production mode differences for serving the React app.

## Database Schema

The application uses PostgreSQL with Drizzle ORM. Schema is defined in `shared/schema.ts`:

- **`users`**: User authentication (username/password)
- **`leads`**: Lead capture data from calculator submissions, including:
  - Contact info (name, email, phone)
  - Property details (address, value, type)
  - Loan calculation results (amount, LTV, interest rate, monthly payment)
  - Prototype version tracking for A/B test analytics

**Important**: The current `server/storage.ts` uses an in-memory implementation. To persist data, you'll need to implement database-backed storage using Drizzle ORM queries.

## Design System

The project follows the **official FinaForte Brand Styleguide**. All design work MUST adhere to the brand identity:

- **Official Styleguide**: `attached_assets/FINAFORTE BRAND STYLEGUIDE-def-2022 14.21.20 (1).pdf`
- **Detailed Guidelines**: See `design_guidelines.md` for comprehensive implementation details

### Key Brand Elements

- **Primary Color**: Mintgroen/Turquoise `#00A2AA` (RGB: 0, 162, 170)
- **CTA Color**: Oranje `#F28E18` (RGB: 242, 142, 24), hover `#F6A75B`
- **Typography**:
  - **Primary**: Public Sans (all headings H1-H3 and body text)
  - **Secondary**: Arvo (testimonials and quotes only)
- **Design Elements**:
  - Rounded corners throughout (cards: `rounded-xl`, buttons: `rounded-lg`)
  - Design element 1: Thin line version of logo icon (oversized decorative)
  - Design element 2: Solid rounded shapes for highlights and stats
- **Icons**: Minimalistic line icons with mintgroen primary, oranje accents
- **Photography**: High light, good contrast, subtle brand colors in scenes
- **Animations**: 300ms ease-in-out transitions, smooth fade-in/fade-out

### Critical Brand Rules

- **NEVER** use blue as primary color (old incorrect guidelines had this)
- **NEVER** use Poppins, Lato, or Inter fonts
- **ALWAYS** use mintgroen `#00A2AA` and oranje `#F28E18` for brand consistency
- **ALWAYS** use Public Sans and Arvo fonts
- Reference `design_guidelines.md` for complete color palette, component specs, and UX patterns

When creating or modifying UI components, consult both the official brand styleguide PDF and `design_guidelines.md` for detailed specifications.

## Calculator Implementation

The calculator uses shared types from `shared/schema.ts`:

- **Input**: `CalculatorFormData` (property address, value, loan amount, property type, duration, repayment type)
- **Output**: `CalculationResult` (LTV, interest rate, monthly payment, optional duration/amortization)

**Note**: The recent simplification removed duration and repayment options from the calculator (see commit `6db3ce1`). If you see references to these in older prototypes, they may need to be updated or removed.

## Working with Prototypes

When adding or modifying calculator prototypes:

1. Create a new page in `client/src/pages/`
2. Add the route to `client/src/App.tsx`
3. Reuse existing calculator components from `client/src/components/`:
   - `CalculatorInput.tsx` - Standard form-based input
   - `CalculatorInputVisual.tsx` - Visual/interactive input variant
   - `CalculationResults.tsx` - Results display
   - `LeadCaptureForm.tsx` - Lead capture modal/form
   - `CTASection.tsx` - Multiple call-to-action grid
4. Track the prototype version in lead submissions for A/B test analytics

## Type Safety

- Run `npm run check` frequently to catch TypeScript errors
- The build process (`npm run build`) includes both Vite build and esbuild for server bundling
- Shared types in `@shared/schema` ensure consistency between client and server

## Environment Variables

- `DATABASE_URL`: Required for database operations (Drizzle ORM connection)
- `NODE_ENV`: Set to 'development' or 'production' (controls Vite dev server usage)
- `PORT`: Server port (defaults to 5000)
