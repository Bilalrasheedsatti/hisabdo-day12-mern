"use client";

import { Bell, Menu, Plus, Search } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";

interface AppTopbarProps {
  onMenuClick: () => void;
}

export default function AppTopbar({ onMenuClick }: AppTopbarProps) {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b-2 border-ink bg-white px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink bg-white text-ink lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          placeholder="Search customers, entries..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-white py-2 pl-9 pr-4 text-sm placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink bg-white text-ink transition-colors hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <Button
          href="/app/transactions"
          className="hidden items-center gap-1.5 rounded-lg border-2 border-ink bg-primary px-4 py-2 text-sm font-semibold text-white shadow-brutal-sm transition-colors hover:bg-primary-dark sm:inline-flex"
        >
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </div>
    </header>
  );
}
