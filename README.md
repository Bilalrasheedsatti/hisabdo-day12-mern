# HisabDo – Capstone Project (Day 10)

> **Track:** MERN / Next.js
> **Day 10 Focus:** Core functionality, reusable components, form validation & responsive UI

This repository contains the **Day 10** implementation of the **HisabDo** digital
bookkeeping (khata) ecosystem — extending the Day 9 foundation with working
application logic, reusable components, and validated forms.

---

## Table of Contents

1. [What is HisabDo](#what-is-hisabdo)
2. [What's Implemented (Day 10)](#whats-implemented-day-10)
3. [Pages & Routes](#pages--routes)
4. [Folder Structure](#folder-structure)
5. [Design System](#design-system)
6. [Responsive Layout](#responsive-layout)
7. [Technology Stack](#technology-stack)
8. [Setup & Run](#setup--run)
9. [Submission Checklist](#submission-checklist)

---

## What is HisabDo

**HisabDo** is a Pakistani digital bookkeeping (khata/ledger) application that
helps small shopkeepers and small businesses track credit/debit records, send
payment reminders, and understand their business with simple reports.

### User Flow

```mermaid
flowchart TD
    A[Landing Page] --> B{Authenticated?}
    B -->|No| C[Login / Signup]
    B -->|Yes| D[Dashboard]
    C --> E[Business Setup]
    E --> D
    D --> F[Customers]
    F --> G[Customer Khata / Ledger]
    G --> H[Add Transaction]
    D --> I[Transactions]
    D --> J[Reminders]
    D --> K[Reports]
    D --> L[Settings]
    L --> M[Logout]
```

---

## What's Implemented (Day 10)

- ✅ Next.js 14 (App Router) project configured and running
- ✅ ESLint configured with `next/core-web-vitals` — **lint passes with zero errors**
- ✅ TypeScript strict mode — **type check passes**
- ✅ Production build compiles successfully
- ✅ Clean, scalable folder structure with route groups
  - `(marketing)` – public website
  - `(auth)` – login/signup
  - `(app)` – authenticated khata application
- ✅ **Main application layout** with responsive sidebar + topbar
- ✅ **Working Dashboard** with live KPI cards, recent entries, and quick actions
- ✅ **Functional Transactions module** with React Context state management:
  - Add new credit/debit entries via validated form
  - Entries persist across pages during the session
  - Real-time list updates in Transactions page and Dashboard
- ✅ **Reusable UI components**:
  - `Button` – primary, secondary, ghost, danger, accent variants with sizes
  - `Card` – consistent bordered container with brutal shadow
  - `Badge` – neutral, accent, warn, danger, primary variants
  - `Input` / `Textarea` / `Select` – form fields with labels
  - `Table` / `TableHead` / `TableBody` / `TableRow` / `TableCell` / `TableHeaderCell` – reusable data table
  - `Logo` / `FeatureIcon` – brand components
- ✅ **Proper form validation** in TransactionForm:
  - Customer selection required
  - Amount required, must be positive number, max limit check
  - Date required
  - Inline error messages with danger styling
  - Success feedback on valid submission
- ✅ **Navigation between pages** via sidebar + topbar
- ✅ **Responsive UI** across all breakpoints:
  - Mobile hamburger menu with overlay
  - Collapsible sidebar drawer
  - Fluid grids (4 → 2 → 1 columns)
  - Horizontally scrollable tables
- ✅ **14+ pages** fully built and styled

---

## Pages & Routes

| # | Page | Route |
|---|------|-------|
| 1 | Home / Landing | `/` |
| 2 | Features | `/features` |
| 3 | Pricing | `/pricing` |
| 4 | About | `/about` |
| 5 | Blog | `/blog` |
| 6 | Contact | `/contact` |
| 7 | FAQ | `/faq` |
| 8 | Download | `/download` |
| 9 | Privacy Policy | `/privacy` |
| 10 | Terms of Service | `/terms` |
| 11 | Login | `/auth/login` |
| 12 | Signup | `/auth/signup` |
| 13 | Dashboard | `/app` |
| 14 | Customers | `/app/customers` |
| 15 | Customer Khata | `/app/customers/[id]` |
| 16 | Transactions | `/app/transactions` |
| 17 | Reminders | `/app/reminders` |
| 18 | Reports | `/app/reports` |
| 19 | Settings | `/app/settings` |

---

## Folder Structure

```
src/
├── app/
│   ├── (marketing)/          # Public website (Navbar + Footer layout)
│   │   ├── page.tsx          # Home
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── faq/
│   │   │   └── FAQAccordion.tsx
│   │   ├── download/
│   │   ├── privacy/          # under legal/ layout
│   │   └── terms/            # under legal/ layout
│   ├── (auth)/               # Auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── (app)/                # Authenticated khata app (Sidebar layout)
│   │   ├── app/
│   │   │   ├── page.tsx          # Dashboard
│   │   │   ├── customers/
│   │   │   │   └── [id]/         # Customer khata ledger
│   │   │   ├── transactions/
│   │   │   ├── reminders/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   └── layout.tsx         # AppShell layout
│   ├── layout.tsx             # Root layout + metadata
│   └── globals.css            # Tailwind base + custom tokens
├── components/
│   ├── layout/               # Navbar, Footer, AppSidebar, AppTopbar, AppShell
│   ├── transactions/         # TransactionForm
│   └── ui/                   # Button, Card, Badge, Input, Logo, FeatureIcon, Table
├── context/
│   └── TransactionContext.tsx # Transactions state management
├── lib/
│   └── data.ts               # Mock data & helpers
└── types/
    └── index.ts              # TypeScript types
```

---

## Design System

A **cartoon brutalist** design language with:

- Bold **black outlines** (`border-2 border-ink` on cards/buttons)
- Flat solid colors — blue `primary`, green `accent`, warm cream & blue section backgrounds
- Chunky drop shadows (`shadow-brutal`, `shadow-brutal-sm`, `shadow-brutal-lg`)
- Expressive chunky typography (`font-extrabold` headings)
- Zero gradients

Custom Tailwind theme tokens: `primary`, `accent`, `ink`, `warn`, `danger`, `brutal` shadows/radii.

---

## Responsive Layout

- **Marketing layout**: sticky navbar collapses to a mobile hamburger menu below `md`; footer stacks.
- **App layout**: fixed sidebar on `lg+`, slide-in drawer with overlay on smaller screens; topbar has mobile menu button; content grids collapse from 4 → 2 → 1 columns.
- All pages tested with fluid grids, `sm:`/`md:`/`lg:`/`xl:` breakpoints, and horizontally scrollable tables on narrow screens.

---

## Technology Stack

- **Next.js 14** (App Router, RSC + client components)
- **React 18**
- **TypeScript** (strict)
- **Tailwind CSS 3**
- **lucide-react** (icons)
- **ESLint** with `next/core-web-vitals`

---

## Setup & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Day 10 Implementation Highlights

### Reusable Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Button` | `src/components/ui/Button.tsx` | Multi-variant, multi-size button with link support |
| `Card` | `src/components/ui/Card.tsx` | Bordered container with brutal shadow |
| `Badge` | `src/components/ui/Badge.tsx` | Status chips with semantic colors |
| `Input` | `src/components/ui/Input.tsx` | Labeled input, textarea, select |
| `Table` | `src/components/ui/Table.tsx` | Composable data table with header/body/row/cell |
| `AppSidebar` | `src/components/layout/AppSidebar.tsx` | Responsive navigation drawer |
| `AppTopbar` | `src/components/layout/AppTopbar.tsx` | Sticky header with search + actions |

### Form Validation (TransactionForm)

- **Customer**: must be selected (error: "Please select a customer")
- **Amount**: required, must be positive, max 10,000,000 (error messages for missing/invalid/too large)
- **Date**: required (error: "Date is required")
- Inline error messages styled with `text-danger`
- Success message on valid submission

### Functional Module: Transactions

- `TransactionContext` provides global state for transactions
- `TransactionForm` dispatches new entries via `addTransaction`
- `TransactionsPage` renders live table of all entries
- `DashboardPage` shows the 5 most recent entries
- `CustomerKhataPage` filters transactions by customer and computes running balance

---

## Submission Checklist

- [x] GitHub repository — [https://github.com/Bilalrasheedsatti/hisabdo-day10-mern](https://github.com/Bilalrasheedsatti/hisabdo-day10-mern)
- [x] Working Dashboard with live data
- [x] One functional module (Transactions with form validation)
- [x] Navigation between pages (Sidebar + Topbar)
- [x] Responsive UI (mobile, tablet, desktop)
- [x] Reusable components (Button, Card, Badge, Input, Table, Nav)
- [x] Form validation (TransactionForm)
- [x] ESLint passes with zero errors
- [x] TypeScript type check passes
- [x] Production build succeeds
