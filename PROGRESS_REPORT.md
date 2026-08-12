# Day 12 Progress Report – HisabDo Capstone Project

**Track:** MERN / Next.js  
**Date:** 2026-08-12  
**Developer:** Bilal Rasheed Satti  

---

## Today's Objective

Continue from the Days 10–11 modules (Transactions + Customers), implement a **third core module** (Reminders) with full CRUD and validation, improve navigation across all modules, implement loading/empty/error states, and prepare the UI structure for authentication-protected pages.

---

## What Was Completed

### 1. Reminders Module — Third Core Module (Full CRUD)
- Built a fully functional **Reminders** module (`/app/reminders`) using a new `ReminderContext` with async CRUD operations and loading/error state (mirrors the `CustomerContext` pattern).
- **Type system**: added `Reminder`, `ReminderMethod`, and `ReminderStatus` types and `reminders` mock data in `src/types` and `src/lib/data`.
- **List/Table view**:
  - Desktop: sortable data table with Customer, Amount, Method, Status, Scheduled date, and inline action buttons.
  - Mobile: responsive stacked card layout with touch-friendly Edit/Delete actions.
- **Add**: "Add Reminder" modal form with live customer dropdown (joined from `CustomerContext`), amount, delivery method (SMS/WhatsApp), scheduled date, and note.
- **Edit**: pre-fills the same modal with the existing reminder via the `Reminder` passed to `ReminderForm`.
- **Delete**: confirmation modal before removal.
- **Search & filter**: real-time search by customer or note, plus a status filter dropdown (All / Scheduled / Sent / Delivered / Failed) with semantic badges + icons.
- Customer name is resolved from the `CustomerContext` (with an "Unknown customer" fallback), linking the module to the Customers module.
- Reuses the existing `Modal`, `Table`, `Badge`, `Input`/`Select`, and `Button` components.

### 2. Form Validation (ReminderForm)
- **Customer**: must be selected ("Please select a customer").
- **Amount**: required, positive number, capped at 10,000,000.
- **Method**: required (SMS/WhatsApp).
- **Scheduled date**: required.
- Inline danger-styled error messages and a success feedback line on valid submission.

### 3. Loading, Empty, and Error States
- **Loading**: spinner card while reminders load (initial + during mutations).
- **Empty**: friendly empty state with icon and call-to-action ("Add Reminder") when no records match search/filter.
- **Error**: dismissible inline error banners for failed load, add, edit, and delete operations (consistent with the Customers module).

### 4. Authentication-Protected Pages Structure
- **`AuthContext`** (`src/context/AuthContext.tsx`): client provider with `user`, `loading`, `login`, `signup`, `logout`, and `isAuthenticated`. Persists the session to `localStorage` so it survives reloads.
- **`AuthProvider`** (in root layout): wraps the whole app so auth state is available everywhere, including the marketing layout and auth pages.
- **`ProtectedRoute`** (`src/components/auth/ProtectedRoute.tsx`): guards the entire `/app` section — shows a centered spinner while bootstrapping, redirects unauthenticated users to `/auth/login`, and renders children once authenticated.
- **App layout** (`src/app/(app)/layout.tsx`): wrapped `AppShell` in `ProtectedRoute` (providers: Customer, Transaction, Reminder).
- **Login & Signup forms** rewritten with real validation:
  - Phone number validated against Pakistani format (`^03\d{9}$`).
  - Password required, min 6 characters (signup).
  - Business name required; Terms checkbox must be accepted.
  - Submit now calls `login()` / `signup()` and redirects to `/app`; both forms redirect to `/app` when already authenticated.
  - Submit-time and field-level error banners with `text-danger` styling.
- **Logout** added to the `AppSidebar` footer (dynamic user avatar/name from `AuthContext`).
- **Marketing `Navbar`** is now auth-aware: shows a "Dashboard" link when logged in (instead of "Get Started").

### 5. Navigation Improvements
- **AppTopbar "New Entry"** button now links to `/app/transactions` (was a dead `#`).
- **Transactions list** now resolves and links each `customerId` to its customer Khata page (`/app/customers/[id]`), connecting the Transactions and Customers modules for the first time.
- Sidebar highlights the active module and includes the new Reminders entry; logout is reachable from the app chrome.
- Mobile drawer, hamburger menu, and responsive grid patterns preserved across the new module.

### 6. Reusable Components
- No new UI primitives were required — the new module is built entirely on the existing reusable kit (`Button`, `Card`, `Badge`, `Input`/`Select`/`Textarea`, `Table` family, `Modal`), confirming the components are genuinely reusable.
- `FeatureIcon` unchanged; `Logo` re-used in auth layout.

---

## Files Added
- `src/context/ReminderContext.tsx` — Reminders CRUD context (loading/error)
- `src/components/reminders/ReminderForm.tsx` — validated add/edit form
- `src/components/reminders/RemindersClient.tsx` — list/table + state handling
- `src/context/AuthContext.tsx` — auth session provider
- `src/components/auth/ProtectedRoute.tsx` — route guard

## Files Modified
- `src/types/index.ts` — added `Reminder`, `ReminderMethod`, `ReminderStatus`
- `src/lib/data.ts` — added `reminders` mock data and `Reminder` import
- `src/app/layout.tsx` — wrapped root in `AuthProvider`
- `src/app/(app)/layout.tsx` — added `ReminderProvider` + `ProtectedRoute`
- `src/app/(app)/app/reminders/page.tsx` — delegated to `RemindersClient`
- `src/app/auth/login/LoginForm.tsx` — validation + real `login()` + redirect-if-authed
- `src/app/auth/signup/SignupForm.tsx` — validation + real `signup()` + redirect-if-authed
- `src/components/layout/AppSidebar.tsx` — dynamic user + logout
- `src/components/layout/AppTopbar.tsx` — "New Entry" → `/app/transactions` link
- `src/components/layout/Navbar.tsx` — auth-aware Dashboard link
- `src/components/app/TransactionsClient.tsx` — customer name resolution + Khata links
- `scripts/screenshot.ts` — configurable base URL + auth-user localStorage seeding

---

## Verification

- ✅ `npm run lint` — zero warnings or errors
- ✅ `npx tsc --noEmit` — no type errors
- ✅ `npm run build` — successful production build (3 modules + auth)
- ✅ Three functional core modules: Transactions, Customers, Reminders (full CRUD)
- ✅ Navigation works between modules (sidebar, topbar, customer links, quick actions)
- ✅ Form validation in all module forms + auth forms
- ✅ Loading, empty, and error states in the Reminders module (and Customers)
- ✅ Auth-protected pages redirect to login when unauthenticated
- ✅ Screenshots re-captured for all pages (see `screenshots/`)

## Screenshots

Updated screenshots for all major pages are in the `screenshots/` folder:
- Home (desktop + mobile), Features, Pricing
- Dashboard (desktop + mobile)
- Customers, Customer Khata
- Transactions (now links to customer Khata)
- **Reminders** (full CRUD list view)
- Reports, Settings
- Login, Signup (validated forms)

---

## Next Steps (Future Days)
- Connect to a backend API (MongoDB/Express) for persistent storage instead of context mock data.
- Replace simulated auth with a real backend (JWT/session) and server-side protected route checks.
- Add CSV/Excel export for reminders and transactions.
- Implement scheduled/due overdue highlighting and automated SMS/WhatsApp integrations for reminders.
