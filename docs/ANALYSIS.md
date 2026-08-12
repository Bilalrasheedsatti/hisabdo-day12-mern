# HisabDo Capstone – Analysis & Architecture Document (Day 8)

> **Author:** Intern
> **Track:** MERN / Next.js
> **Date:** Day 8
> **Status:** Planning & Architecture (no feature implementation)

---

## 1. Executive Summary

HisabDo is a digital bookkeeping (khata/ledger) application for small businesses
and shopkeepers in Pakistan. It replaces the traditional handwritten *bahi khata*
with a digital ledger where users can record credit (udhaar) and debit
(receipts), manage customers, send payment reminders, and generate reports.

This document captures the complete analysis of the HisabDo ecosystem and lays
out the architecture for building a modern **Next.js** web implementation.

---

## 2. Product Analysis

### 2.1 Purpose
- Simplify credit/debit tracking for small, often informal, businesses.
- Reduce errors and lost records compared to paper ledgers.
- Help shopkeepers recover money via automated reminders.

### 2.2 Target Users
- Retail shopkeepers and grocery store owners.
- Freelancers and service providers.
- Small wholesalers and distributors.

### 2.3 Core Value Propositions
- Paperless, organized khata.
- Quick entry of transactions.
- Automatic reminders to recover dues.
- Reports to understand business health.

---

## 3. Mobile App Features (Explored)

| Feature | Description |
|---------|-------------|
| Splash / Welcome | Branded intro screen |
| Phone/OTP Auth | Sign up / log in with phone number |
| Business Setup | Business name, category, currency |
| Dashboard | KPIs: receivable, payable, today's dues, customers |
| Customers | Add, edit, delete, import contacts |
| Khata (Ledger) | Per-customer ledger with running balance |
| Transactions | Add credit/debit with amount, note, date |
| Reminders | SMS/WhatsApp payment reminders |
| Reports | Daily/monthly summaries, receivable/payable |
| Settings | Business profile, language, currency, backup |

---

## 4. Complete User Journey

```
Welcome → Auth (OTP) → Business Profile → Dashboard
   → Add Customer → Open Khata → Record Transaction
   → View History → Send Reminder → Check Reports → Settings → Logout
```

Detailed journey steps are in the main `README.md`.

---

## 5. Website Page List (Next.js)

### Marketing Pages
1. Home / Landing (`/`)
2. Features (`/features`)
3. Pricing (`/pricing`)
4. About Us (`/about`)
5. Blog / Resources (`/blog`)
6. Contact (`/contact`)
7. FAQ (`/faq`)
8. Download (App links) (`/download`)
9. Privacy Policy (`/privacy`)
10. Terms of Service (`/terms`)

### Auth Pages
11. Login (`/auth/login`)
12. Signup (`/auth/signup`)

### Application Pages
13. App Dashboard (`/app`)
14. Customers (`/app/customers`)
15. Customer Khata (`/app/customers/[id]`)
16. Transactions (`/app/transactions`)
17. Reminders (`/app/reminders`)
18. Reports (`/app/reports`)
19. Settings (`/app/settings`)

---

## 6. Web Application Modules

| # | Module | Key Features |
|---|--------|--------------|
| 1 | Auth & Onboarding | OTP login, business setup wizard |
| 2 | Dashboard | KPIs, recent transactions, quick actions |
| 3 | Customers | CRUD, import/export, search |
| 4 | Khata / Ledger | Per-customer ledger, running balance |
| 5 | Transactions | Credit/debit entry, history, categories |
| 6 | Reminders | SMS/WhatsApp reminders, recovery tracking |
| 7 | Reports | Daily/monthly summaries, charts, export |
| 8 | Settings | Profile, currency, language, backup, security |

---

## 7. User Flow Diagram

See `README.md` for the Mermaid diagram. High-level flow:

```
Landing → Auth → Dashboard → Customers → Khata → Transactions
        → Reminders → Reports → Settings → Logout
```

---

## 8. Proposed Technology Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Zustand
- **Backend:** Node.js, Express (or Next.js Route Handlers), REST API
- **Database:** MongoDB (Mongoose), optional Prisma ORM
- **Auth:** NextAuth.js / Auth.js, JWT
- **Integrations:** SMS gateway / Twilio, WhatsApp Business API
- **Storage:** Cloudinary / S3 (backups)
- **Deployment:** Vercel, MongoDB Atlas
- **Quality:** ESLint, Prettier, Jest/Vitest

---

## 9. UI/UX Improvement Suggestions

1. Dark mode toggle.
2. Urdu/Arabic localization with RTL support.
3. Multi-step onboarding wizard with progress indicators.
4. Global search and advanced filters.
5. Interactive charts for reports.
6. Bulk actions (multi-select reminders/export).
7. Friendly empty/loading states with skeleton loaders.
8. Accessibility compliance (WCAG 2.1 AA).
9. Offline-first / PWA support.
10. In-app notification center.

---

## 10. Next Steps (Future Days)

- ~~Day 9: Set up ESlint/Prettier, CI, and component library.~~ ✅ Complete
- Day 10+: Begin feature implementation (auth → dashboard → customers → khata → transactions → reminders → reports → settings).
- Integrate backend API and database.

---

## 11. Submission Checklist

- [x] Website Page List
- [x] Web Application Module List
- [x] User Flow Diagram
- [x] Basic Next.js Folder Structure
- [x] Proposed Technology Stack
- [x] UI/UX Improvement Suggestions
- [x] GitHub repository initialized
