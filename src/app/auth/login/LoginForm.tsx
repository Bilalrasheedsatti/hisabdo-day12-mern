"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Smartphone } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/app");
  };

  return (
    <Card className="w-full max-w-md shadow-brutal-lg">
      <div className="text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-primary-light text-primary-dark">
          <Smartphone className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Log in to your digital khata
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="03xx-xxxxxxx"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 font-medium text-ink-soft">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 accent-primary"
            />
            Remember me
          </label>
          <a href="#" className="font-semibold text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Button type="submit" className="w-full" size="lg">
          Log in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="font-bold text-primary hover:underline">
          Sign up free
        </Link>
      </p>
    </Card>
  );
}
