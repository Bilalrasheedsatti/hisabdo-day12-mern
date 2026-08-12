"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BarChart3,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  Users,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboard },
  { label: "Customers", href: "/app/customers", icon: Users },
  { label: "Transactions", href: "/app/transactions", icon: Receipt },
  { label: "Reminders", href: "/app/reminders", icon: Bell },
  { label: "Reports", href: "/app/reports", icon: BarChart3 },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-ink/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r-2 border-ink bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b-2 border-ink px-4">
          <Logo href="/app" />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink text-ink lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="App navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg border-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-ink bg-accent text-white shadow-brutal-sm"
                    : "border-transparent text-ink-soft hover:border-gray-200 hover:bg-gray-50 hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t-2 border-ink p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-primary-light font-bold text-primary-dark">
              {user?.avatar ?? "BT"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {user?.name ?? "Bilal Traders"}
              </p>
              <p className="truncate text-xs text-ink-faint">
                {user?.business ?? "Free plan"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>
    </>
  );
}
