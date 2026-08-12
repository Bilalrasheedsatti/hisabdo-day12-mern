"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Smartphone, AlertTriangle, Loader2 } from "lucide-react";

interface FormErrors {
  phone?: string;
  password?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setErrors(validate());

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    try {
      await login(phone.trim(), password);
      router.push("/app");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Unable to log in. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
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

      <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
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
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
          {errors.phone && (
            <p
              id="phone-error"
              className="mt-1 text-xs font-semibold text-danger"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "border-danger" : ""}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            required
            minLength={6}
          />
          {errors.password && (
            <p
              id="password-error"
              className="mt-1 text-xs font-semibold text-danger"
            >
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 font-medium text-ink-soft">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 accent-primary"
            />
            Remember me
          </label>
          <a
            href="#"
            className="font-semibold text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-bold text-primary hover:underline"
        >
          Sign up free
        </Link>
      </p>
    </Card>
  );
}
