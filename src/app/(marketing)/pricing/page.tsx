import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { pricingPlans } from "@/lib/data";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, honest pricing for HisabDo. Start free forever, upgrade to Pro or Business for reminders, reports and more.",
};

export default function PricingPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b-2 border-ink bg-[#FFF7E6] py-16 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Simple pricing, <span className="text-primary">honest value</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Start free forever. Upgrade when your khata needs reminders, reports
            and room to grow.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-brutal border-2 border-ink bg-white p-6 shadow-brutal-sm ${
                plan.highlight ? "bg-[#EAF0FF] shadow-brutal-lg md:-translate-y-2" : ""
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="accent" className="border-2 border-ink px-3 py-1 text-sm">
                    Most Popular
                  </Badge>
                </span>
              ) : null}
              <h2 className="text-xl font-extrabold text-ink">{plan.name}</h2>
              <p className="mt-2 min-h-[3rem] text-sm text-ink-soft">{plan.tagline}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-ink">
                  {plan.price === 0 ? "Free" : `Rs ${plan.price.toLocaleString()}`}
                </span>
                {plan.price > 0 ? (
                  <span className="pb-1 text-sm text-ink-faint">{plan.period}</span>
                ) : null}
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href="/auth/signup"
                  variant={plan.highlight ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-ink-faint">
          All prices in Pakistani Rupees. Need a custom plan?{" "}
          <a href="/contact" className="font-semibold text-primary hover:underline">
            Contact us
          </a>
        </p>
      </section>

      <section className="border-t-2 border-ink bg-white py-16">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {[
            { title: "No hidden fees", desc: "What you see is what you pay. Cancel anytime." },
            { title: "15-day Pro trial", desc: "Try every Pro feature free before you commit." },
            { title: "Local support", desc: "Real humans in Pakistan, ready in Urdu or English." },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
