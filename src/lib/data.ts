import type {
  Customer,
  FAQItem,
  FeatureItem,
  KpiStat,
  NavItem,
  PricingPlan,
  RecentEntry,
  Reminder,
  Transaction,
} from "@/types";

export const marketingNav: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Download", href: "/download" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const heroFeatures: FeatureItem[] = [
  {
    icon: "book",
    title: "Digital Khata",
    description:
      "Replace your paper bahi with a clean, searchable ledger for every customer.",
  },
  {
    icon: "bell",
    title: "Smart Reminders",
    description:
      "Recover dues automatically with SMS and WhatsApp payment reminders.",
  },
  {
    icon: "chart",
    title: "Reports & Insight",
    description:
      "See daily and monthly summaries, total receivable and payable at a glance.",
  },
  {
    icon: "users",
    title: "Customer Manager",
    description:
      "Add, organize and import customers with their contacts in one place.",
  },
];

export const appNav: NavItem[] = [
  { label: "Dashboard", href: "/app" },
  { label: "Customers", href: "/app/customers" },
  { label: "Transactions", href: "/app/transactions" },
  { label: "Reminders", href: "/app/reminders" },
  { label: "Reports", href: "/app/reports" },
  { label: "Settings", href: "/app/settings" },
];

export const kpiStats: KpiStat[] = [
  { label: "Total Receivable", value: "Rs 284,500", delta: "+12% vs last month", positive: true },
  { label: "Total Payable", value: "Rs 46,200", delta: "-8% vs last month", positive: true },
  { label: "Today's Entries", value: "Rs 18,750", delta: "23 entries recorded", positive: true },
  { label: "Active Customers", value: "48", delta: "+4 this week", positive: true },
];

export const recentEntries: RecentEntry[] = [
  { id: "t-1", customer: "Ahmed Traders", type: "credit", amount: 12500, time: "Today, 10:42 AM" },
  { id: "t-2", customer: "Bismillah Store", type: "debit", amount: 5000, time: "Today, 9:15 AM" },
  { id: "t-3", customer: "Rashid General Store", type: "credit", amount: 3200, time: "Yesterday" },
  { id: "t-4", customer: "Al-Noor Mart", type: "credit", amount: 8400, time: "Yesterday" },
  { id: "t-5", customer: "Sabir & Sons", type: "debit", amount: 2000, time: "Aug 10" },
];

export const customers: Customer[] = [
  {
    id: "c-1",
    name: "Ahmed Traders",
    phone: "0300-1234567",
    business: "Wholesale",
    totalCredit: 184500,
    totalDebit: 72000,
    outstanding: 112500,
    lastEntry: "Today",
    tags: ["High Value"],
  },
  {
    id: "c-2",
    name: "Bismillah Store",
    phone: "0301-7654321",
    business: "Grocery",
    totalCredit: 96500,
    totalDebit: 41000,
    outstanding: 55500,
    lastEntry: "Today",
  },
  {
    id: "c-3",
    name: "Rashid General Store",
    phone: "0322-9876543",
    business: "Retail",
    totalCredit: 42300,
    totalDebit: 35000,
    outstanding: 7300,
    lastEntry: "Yesterday",
  },
  {
    id: "c-4",
    name: "Al-Noor Mart",
    phone: "0333-2468135",
    business: "Super Store",
    totalCredit: 78100,
    totalDebit: 24000,
    outstanding: 54100,
    lastEntry: "Yesterday",
  },
  {
    id: "c-5",
    name: "Sabir & Sons",
    phone: "0345-5550199",
    business: "Electronics",
    totalCredit: 65800,
    totalDebit: 28900,
    outstanding: 36900,
    lastEntry: "Aug 10",
    tags: ["Regular"],
  },
  {
    id: "c-6",
    name: "Madina Cosmetics",
    phone: "0312-4477881",
    business: "Beauty & Care",
    totalCredit: 31200,
    totalDebit: 19800,
    outstanding: 11400,
    lastEntry: "Aug 9",
  },
];

export const ledgerTransactions: Transaction[] = [
  { id: "tx-1", customerId: "c-1", type: "credit", amount: 12500, note: "Stock order – rice & sugar", date: "Aug 12, 2026" },
  { id: "tx-2", customerId: "c-1", type: "debit", amount: 5000, note: "Cash received", date: "Aug 12, 2026" },
  { id: "tx-3", customerId: "c-1", type: "credit", amount: 8400, note: "Weekly grocery supply", date: "Aug 10, 2026" },
  { id: "tx-4", customerId: "c-1", type: "credit", amount: 3200, note: "Soft drinks crate", date: "Aug 8, 2026" },
  { id: "tx-5", customerId: "c-1", type: "debit", amount: 2500, note: "Part payment", date: "Aug 6, 2026" },
  { id: "tx-6", customerId: "c-1", type: "credit", amount: 14700, note: "Flour bags order", date: "Aug 4, 2026" },
];

export const reminders: Reminder[] = [
  {
    id: "r-1",
    customerId: "c-1",
    amount: 112500,
    method: "whatsapp",
    status: "delivered",
    scheduledDate: "Aug 12, 2026",
    note: "Overdue balance reminder",
    sentAt: "Aug 12, 2026 09:00",
  },
  {
    id: "r-2",
    customerId: "c-2",
    amount: 55500,
    method: "sms",
    status: "sent",
    scheduledDate: "Aug 12, 2026",
    note: "Monthly settlement reminder",
    sentAt: "Aug 12, 2026 08:45",
  },
  {
    id: "r-3",
    customerId: "c-4",
    amount: 54100,
    method: "whatsapp",
    status: "scheduled",
    scheduledDate: "Aug 13, 2026",
    note: "Overdue balance follow-up",
    sentAt: null,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    tagline: "For new businesses keeping their first digital khata.",
    price: 0,
    period: "/month",
    cta: "Start Free",
    features: [
      "Up to 25 customers",
      "Unlimited entries",
      "Basic reports",
      "Email support",
    ],
  },
  {
    name: "Pro",
    tagline: "For growing shops that need reminders and insights.",
    price: 999,
    period: "/month",
    cta: "Go Pro",
    highlight: true,
    features: [
      "Unlimited customers",
      "SMS & WhatsApp reminders",
      "Advanced reports & charts",
      "Data export (CSV/Excel)",
      "Priority support",
    ],
  },
  {
    name: "Business",
    tagline: "For multi-outlet businesses and teams.",
    price: 2499,
    period: "/month",
    cta: "Contact Sales",
    features: [
      "Everything in Pro",
      "Multiple users & roles",
      "Multi-branch ledger",
      "API access",
      "Dedicated account manager",
    ],
  },
];

export const featuresList: FeatureItem[] = [
  {
    icon: "book",
    title: "Digital Khata / Ledger",
    description:
      "Keep a running credit/debit ledger for every customer. See outstanding balance instantly, just like your paper bahi but smarter.",
  },
  {
    icon: "history",
    title: "Transaction History",
    description:
      "Every entry is saved with date, amount and note. Search and filter any transaction in seconds.",
  },
  {
    icon: "bell",
    title: "Payment Reminders",
    description:
      "Automatically send SMS and WhatsApp reminders to customers who owe you money — no more awkward follow-ups.",
  },
  {
    icon: "chart",
    title: "Reports & Analytics",
    description:
      "Daily and monthly summaries, receivable vs payable breakdowns, and trends to understand your business health.",
  },
  {
    icon: "users",
    title: "Contacts Management",
    description:
      "Import customers from your phone contacts, add notes and tags, and organize them the way you work.",
  },
  {
    icon: "shield",
    title: "Backup & Security",
    description:
      "Your khata data is backed up securely and can be exported to CSV or Excel anytime. Your records never get lost.",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What is HisabDo?",
    answer:
      "HisabDo is a digital khata (ledger) app that helps shopkeepers and small businesses track credit and debit records, send payment reminders, and understand their business with simple reports.",
  },
  {
    question: "Is HisabDo really free?",
    answer:
      "Yes. The Starter plan is free forever and includes up to 25 customers, unlimited entries and basic reports. You can upgrade to Pro or Business whenever you need more.",
  },
  {
    question: "Can I send reminders automatically?",
    answer:
      "Yes. Pro and Business plans let you send automated SMS and WhatsApp reminders to customers with outstanding dues.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Absolutely. You can export your customer and transaction data to CSV or Excel at any time from the Reports and Settings pages.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is stored securely with encrypted backups. You control access, and you can export or delete your data whenever you want.",
  },
];

export const formatCurrency = (amount: number): string =>
  `Rs ${amount.toLocaleString("en-PK")}`;

export const formatDate = (date: string): string => date;
