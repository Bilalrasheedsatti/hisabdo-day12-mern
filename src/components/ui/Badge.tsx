import type { ReactNode } from "react";

type BadgeVariant = "neutral" | "accent" | "warn" | "danger" | "primary";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-gray-100 text-ink-soft",
  accent: "bg-accent-light text-accent-dark",
  warn: "bg-warn-light text-amber-700",
  danger: "bg-danger-light text-danger",
  primary: "bg-primary-light text-primary-dark",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({
  variant = "neutral",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
