# Day 11 Progress Report – HisabDo Capstone Project

**Track:** MERN / Next.js  
**Date:** 2026-08-12  
**Developer:** Bilal Rasheed Satti  

---

## Today's Objective

Continue from the Day 10 project and implement a second functional core module (Customers) with full CRUD operations, connect it with the Dashboard and existing navigation, add loading/empty/error states, and ensure responsive design with reusable components.

---

## What Was Completed

### 1. Customers Module (CRUD)
- Built a fully functional **Customers** module (`/app/customers`) using React Context (`CustomerContext`) for client-side state management.
- **Add Customer**: Modal form with validated fields (name, phone, business, tags).
- **Edit Customer**: Same modal form pre-filled with existing data.
- **Delete Customer**: Confirmation modal before removal.
- **Search/Filter**: Real-time filtering by name, phone, business, or tags.
- **List Views**:
  - Desktop: Responsive data table with action buttons.
  - Mobile: Stacked card layout with touch-friendly actions.

### 2. States Handling
- **Loading**: Skeleton/spinner during initial data load and mutation operations (add/edit/delete).
- **Empty**: Friendly empty state with illustration and call-to-action when no customers match.
- **Error**: Inline error banners for failed operations with dismiss action.

### 3. Form Validation (CustomerForm)
- **Name**: required, minimum 2 characters.
- **Phone**: required, must match Pakistani mobile format (`^03\d{9}$`).
- **Business**: required.
- **Tags**: optional, comma-separated.
- Inline error messages with `text-danger` styling.
- Success feedback on valid submission.

### 4. Dashboard Integration
- Dashboard KPIs are now computed dynamically from live context data:
  - Total Receivable / Payable across all customers.
  - Today&apos; s entries count.
  - Active customers count.
- Recent entries continue to sync with the Transactions module.

### 5. Navigation & Connectivity
- Customers module is accessible from sidebar and Dashboard quick actions.
- Customer detail page (`/app/customers/[id]`) uses the Customer context instead of static data.
- All CRUD operations immediately reflect in the Customers list and Dashboard.

### 6. Reusable Components
Added `Modal` component used across the Customers module for forms and delete confirmation.

---

## Files Added / Modified

**New files:**
- `src/context/CustomerContext.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/customers/CustomerForm.tsx`
- `src/components/customers/CustomersClient.tsx`

**Modified files:**
- `src/app/(app)/layout.tsx` — wrapped app with `CustomerProvider`
- `src/app/(app)/app/customers/page.tsx` — delegated to `CustomersClient`
- `src/app/(app)/app/customers/[id]/page.tsx` — removed static `notFound`, delegated to `KhataClient`
- `src/components/app/KhataClient.tsx` — uses `useCustomers` context instead of static data
- `src/components/app/DashboardClient.tsx` — dynamic KPIs from context
- `README.md` — updated for Day 11

---

## Verification

- ✅ `npm run lint` — no warnings or errors
- ✅ `npx tsc --noEmit` — no type errors
- ✅ `npm run build` — successful production build
- ✅ Two functional modules (Transactions + Customers) with working CRUD
- ✅ Navigation between pages functional
- ✅ Form validation in both modules
- ✅ Loading, empty, and error states implemented
- ✅ Responsive design verified across breakpoints

---

## Screenshots

Screenshots for all major pages are available in the `screenshots/` folder:
- Dashboard (desktop + mobile)
- Customers (desktop + mobile)
- Customer Khata
- Transactions
- Reminders
- Reports
- Settings
- Marketing pages (Home, Features, Pricing, Login, Signup)

---

## Next Steps (Day 12 Preview)

- Connect to backend API (MongoDB/Express) for persistent storage.
- Implement user authentication and protected routes.
- Add CSV/Excel export for customers and transactions.
- Enable customer import from phone contacts.
