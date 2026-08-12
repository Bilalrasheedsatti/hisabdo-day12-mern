import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="space-y-4 leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
