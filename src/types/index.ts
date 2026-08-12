export type TransactionType = "credit" | "debit";

export type ReminderMethod = "sms" | "whatsapp";
export type ReminderStatus = "draft" | "scheduled" | "sent" | "delivered" | "failed";

export interface Reminder {
  id: string;
  customerId: string;
  amount: number;
  method: ReminderMethod;
  status: ReminderStatus;
  scheduledDate: string;
  note: string;
  sentAt?: string | null;
}

export interface Transaction {
  id: string;
  customerId: string;
  type: TransactionType;
  amount: number;
  note: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  business: string;
  totalCredit: number;
  totalDebit: number;
  outstanding: number;
  lastEntry: string;
  tags?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  price: number;
  period: string;
  cta: string;
  highlight?: boolean;
  features: string[];
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface KpiStat {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

export interface RecentEntry {
  id: string;
  customer: string;
  type: TransactionType;
  amount: number;
  time: string;
}
