import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { kpiStats } from "@/lib/data";
import { formatCurrency } from "@/lib/data";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import DashboardClient from "@/components/app/DashboardClient";

export const metadata = {
  title: {
    default: "Dashboard | HisabDo",
    template: "%s | HisabDo",
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
