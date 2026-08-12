import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 w-8 text-base",
  md: "h-9 w-9 text-lg",
  lg: "h-11 w-11 text-xl",
};

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export default function Logo({
  href = "/",
  className = "",
  size = "md",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}
    >
      <span
        className={`flex ${sizes[size]} items-center justify-center rounded-md border-2 border-ink bg-accent text-white shadow-brutal-sm`}
        aria-hidden="true"
      >
        H
      </span>
      <span className={`${textSizes[size]} text-ink`}>HisabDo</span>
    </Link>
  );
}
