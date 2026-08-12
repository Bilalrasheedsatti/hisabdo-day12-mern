import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-brutal border-2 border-ink bg-white p-5 shadow-brutal-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
