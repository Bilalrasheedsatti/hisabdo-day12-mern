import type { ReactNode } from "react";
import Logo from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF7E6]">
      <header className="container-page flex h-16 items-center">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
