"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Store } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/app");
  };

  return (
    <Card className="w-full max-w-md shadow-brutal-lg">
      <div className="text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-accent-light text-accent-dark">
          <Store className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">Start your digital khata</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Free forever plan · No credit card required
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Business name"
          name="businessName"
          placeholder="e.g. Bilal Traders"
          required
        />
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
          placeholder="Create a password"
          required
        />
        <label className="flex items-start gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="terms"
            className="mt-0.5 h-4 w-4 accent-primary"
            required
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="font-semibold text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="font-semibold text-primary hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
        <Button type="submit" className="w-full" size="lg">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-bold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </Card>
  );
}
