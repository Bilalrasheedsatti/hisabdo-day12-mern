# Day 10 Progress Report – HisabDo Capstone Project

**Track:** MERN / Next.js  
**Date:** 2026-08-12  
**Developer:** Bilal Rasheed Satti  

---

## Today's Objective

Continue from the Day 9 project structure and implement the core functionality of the web application: working dashboard, one functional module, reusable components, form validation, and responsive UI.

---

## What Was Completed

### 1. Main Application Layout
- Confirmed responsive `AppShell` layout with `AppSidebar` (mobile drawer + desktop fixed) and `AppTopbar` (sticky header).
- Sidebar navigation covers all app routes: Dashboard, Customers, Transactions, Reminders, Reports, Settings.

### 2. Dashboard Page
- Implemented a working Dashboard at `/app` with:
  - 4 KPI stat cards (Total Receivable, Total Payable, Today's Entries, Active Customers).
  - Recent Entries list with credit/debit indicators and timestamps.
  - Quick Actions panel for fast navigation.

### 3. Functional Module: Transactions
- Built a fully functional **Transactions** module (`/app/transactions`) using React Context (`TransactionContext`) for client-side state management.
- **New Entry form** allows selecting customer, entry type (credit/debit), amount, date, and note.
- Entries added via the form immediately appear in:
  - The **Transactions** page table.
  - The **Dashboard** recent entries list.
  - The **Customer Khata** ledger (`/app/customers/[id]`) filtered by customer, with a running balance.

### 4. Reusable Components
Created and used the following reusable components across the app:

| Component | File | Purpose |
|-----------|------|---------|
| `Button` | `src/components/ui/Button.tsx` | Multi-variant, multi-size button with optional `href` link support |
| `Card` | `src/components/ui/Card.tsx` | Consistent bordered container with brutal shadow |
| `Badge` | `src/components/ui/Badge.tsx` | Status chips with semantic color variants |
| `Input` | `src/components/ui/Input.tsx` | Labeled input, textarea, and select fields |
| `Table` | `src/components/ui/Table.tsx` | Composable data table with `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TableHeaderCell` |
| `AppSidebar` | `src/components/layout/AppSidebar.tsx` | Responsive navigation drawer with active state |
| `AppTopbar` | `src/components/layout/AppTopbar.tsx` | Sticky header with search and quick actions |

### 5. Form Validation
- Implemented client-side validation in `TransactionForm`:
  - **Customer**: required selection.
  - **Amount**: required, must be a positive number, max limit check (10,000,000).
  - **Date**: required.
  - Displays inline error messages styled with `text-danger`.
  - Shows success feedback on valid submission.

### 6. Responsive UI
- All pages use fluid Tailwind grids (`grid-cols-1` → `grid-cols-2` → `grid-cols-4`).
- Mobile hamburger menu with overlay in the marketing navbar.
- Collapsible sidebar drawer on smaller screens for the app layout.
- Horizontally scrollable tables on narrow viewports.

---

## Files Added / Modified

**New files:**
- `src/context/TransactionContext.tsx`
- `src/components/app/DashboardClient.tsx`
- `src/components/app/TransactionsClient.tsx`
- `src/components/app/KhataClient.tsx`
- `src/components/ui/Table.tsx`

**Modified files:**
- `src/app/(app)/layout.tsx` — wrapped app with `TransactionProvider`
- `src/app/(app)/app/page.tsx` — delegated to `DashboardClient`
- `src/app/(app)/app/transactions/page.tsx` — delegated to `TransactionsClient`
- `src/app/(app)/app/customers/[id]/page.tsx` — delegated to `KhataClient`
- `src/components/transactions/TransactionForm.tsx` — added validation
- `README.md` — updated for Day 10

---

## Verification

- ✅ `npm run lint` — no warnings or errors
- ✅ `npx tsc --noEmit` — no type errors
- ✅ `npm run build` — successful production build (27 pages)
- ✅ Git committed and force-pushed to `https://github.com/Bilalrasheedsatti/hisabdo-day10-mern`

---

## Screenshots

Screenshots for all major pages are available in the `screenshots/` folder:
- Dashboard (desktop + mobile)
- Customers
- Customer Khata
- Transactions
- Reminders
- Reports
- Settings
- Marketing pages (Home, Features, Pricing, Login, Signup)

---

## Next Steps (Day 11 Preview)

- Connect transactions to a backend API (MongoDB/MERN).
- Implement user authentication and protected routes.
- Add customer creation and management forms.
- Enable CSV/Excel export for transactions.
