import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FeatureIcon from "@/components/ui/FeatureIcon";
import { featuresList } from "@/lib/data";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore HisabDo features: digital khata, transaction history, payment reminders, reports, contacts management and backup.",
};

export default function FeaturesPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b-2 border-ink bg-[#EAF0FF] py-16 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Features built for your <span className="text-primary">khata</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Everything you need to replace your paper bahi — and a few things a
            paper register could never do.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((feature) => (
            <Card key={feature.title}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-ink bg-accent-light text-accent-dark">
                <FeatureIcon name={feature.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-ink">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t-2 border-ink bg-white py-16 lg:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Reminders that recover your money
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Chasing dues is awkward. HisabDo sends polite, automatic SMS and
              WhatsApp reminders so your customers pay on time — without the
              awkward conversation.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Automatic follow-ups on overdue balances",
                "Custom reminder message templates",
                "Delivery reports for every reminder",
                "Recovery history per customer",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/pricing">
                See pricing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card className="rotate-1 shadow-brutal-lg">
            <div className="rounded-lg border-2 border-ink bg-gray-50 p-4">
              <p className="text-sm font-semibold text-ink-faint">WhatsApp Reminder</p>
              <p className="mt-3 rounded-lg border-2 border-ink bg-white p-4 text-sm text-ink">
                Assalam o Alaikum Ahmed Traders! This is a friendly reminder that
                <span className="font-bold"> Rs 12,500 </span>
                is due on your khata with Bilal Traders. Please settle at your
                earliest. JazakAllah!
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-accent-dark">✓ Delivered</span>
                <span className="text-xs text-ink-faint">Today, 9:00 AM</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-ink py-14 text-center">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            Start using HisabDo free today
          </h2>
          <div className="mt-6">
            <Button href="/auth/signup" size="lg" className="bg-accent hover:bg-accent-dark">
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
