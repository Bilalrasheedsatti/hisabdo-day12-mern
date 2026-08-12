"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Store, AlertTriangle, Loader2 } from "lucide-react";

interface FormErrors {
  businessName?: string;
  phone?: string;
  password?: string;
  terms?: string;
}

export default function SignupForm() {
  const router = useRouter();
  const { signup, isAuthenticated } = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/app");
    }
  }, [isAuthenticated, router]);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required";
    } else if (businessName.trim().length < 2) {
      newErrors.businessName = "Business name must be at least 2 characters";
    }

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (digits.length < 11) {
      newErrors.phone = "Phone number must be at least 11 digits";
    } else if (!/^03\d{9}$/.test(digits)) {
      newErrors.phone = "Enter a valid Pakistani phone number (e.g. 0300-1234567)";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!terms) {
      newErrors.terms = "You must accept the terms to continue";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    try {
      await signup(businessName.trim(), phone.trim(), password);
      router.push("/app");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Unable to create account.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-brutal-lg">
      <div className="text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-accent-light text-accent-dark">
          <Store className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">
          Start your digital khata
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Free forever plan · No credit card required
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <Input
            label="Business name"
            name="businessName"
            placeholder="e.g. Bilal Traders"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className={errors.businessName ? "border-danger" : ""}
            aria-invalid={!!errors.businessName}
            required
          />
          {errors.businessName && (
            <p className="mt-1 text-xs font-semibold text-danger">
              {errors.businessName}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="03xx-xxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? "border-danger" : ""}
            aria-invalid={!!errors.phone}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-xs font-semibold text-danger">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "border-danger" : ""}
            aria-invalid={!!errors.password}
            required
            minLength={6}
          />
          {errors.password && (
            <p className="mt-1 text-xs font-semibold text-danger">
              {errors.password}
            </p>
          )}
        </div>

        {submitError && (
          <div className="flex items-start gap-3 rounded-lg border-2 border-danger bg-danger-light px-3 py-2.5">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
            <p className="text-xs font-semibold text-danger">{submitError}</p>
          </div>
        )}

        <label className="flex items-start gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-primary"
            required
          />
          <span>
            I agree to the{" "}
            <a
              href="/terms"
              className="font-semibold text-primary hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-semibold text-primary hover:underline"
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms && (
          <p className="text-xs font-semibold text-danger">{errors.terms}</p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-bold text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </Card>
  );
}
