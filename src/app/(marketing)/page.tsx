import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FeatureIcon from "@/components/ui/FeatureIcon";
import { heroFeatures } from "@/lib/data";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Download,
  Smartphone,
  TrendingUp,
  Users,
  Play,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative border-b-2 border-ink bg-[#FFF7E6]">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-accent-light px-4 py-1.5 text-sm font-bold text-accent-dark">
              <BookOpen className="h-4 w-4" />
              Pakistan&apos;s favourite digital khata
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
              Your business&apos;s <span className="text-primary">khata</span>,
              perfectly kept.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              HisabDo replaces your paper bahi with a fast, easy digital ledger.
              Record udhaar and receipts, send reminders, and know exactly who
              owes you — anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/auth/signup" size="lg">
                Start Free Today
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/download" variant="secondary" size="lg">
                <Download className="h-5 w-5" />
                Get the App
              </Button>
            </div>
            <p className="mt-6 text-sm text-ink-faint">
              Free for small businesses · No credit card required
            </p>
          </div>

          {/* Hero mockup card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full border-2 border-ink bg-warn md:block" />
            <div className="absolute -bottom-8 -right-4 hidden h-16 w-16 rounded-lg border-2 border-ink bg-accent md:block" />
            <Card className="rotate-[-1.5deg] shadow-brutal-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink-faint">Total Receivable</p>
                  <p className="text-2xl font-extrabold text-ink">Rs 284,500</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-light px-3 py-1 text-xs font-bold text-accent-dark">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +12%
                </span>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { name: "Ahmed Traders", amount: "Rs 112,500", color: "bg-danger-light text-danger" },
                  { name: "Bismillah Store", amount: "Rs 55,500", color: "bg-warn-light text-amber-700" },
                  { name: "Al-Noor Mart", amount: "Rs 54,100", color: "bg-primary-light text-primary-dark" },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between rounded-lg border-2 border-ink bg-white px-3 py-2.5"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-gray-100 text-xs">
                        {row.name.charAt(0)}
                      </span>
                      {row.name}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${row.color}`}>
                      {row.amount}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-lg border-2 border-ink bg-gray-50 px-3 py-2.5">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Bell className="h-4 w-4 text-warn" />
                  Reminders sent today
                </span>
                <span className="text-sm font-extrabold text-accent-dark">12</span>
              </div>
            </Card>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-ink-faint">
              <Smartphone className="h-4 w-4" />
              A khata that fits in your pocket
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="border-b-2 border-ink bg-white py-16 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Everything your paper bahi does —<br className="hidden sm:block" /> and more
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Built for shopkeepers and small businesses to keep records simple,
              accurate, and always backed up.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {heroFeatures.map((feature) => (
              <Card key={feature.title} className="transition-transform hover:-translate-y-1">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-ink bg-primary-light text-primary-dark">
                  <FeatureIcon name={feature.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/features" variant="secondary">
              Explore all features
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b-2 border-ink bg-[#EAF0FF] py-16 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Start in three simple steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create your business",
                desc: "Sign up in under a minute with your phone number and business name.",
                icon: Users,
              },
              {
                step: "02",
                title: "Add customers",
                desc: "Import your contacts or add customers manually. Tag and organize them.",
                icon: BookOpen,
              },
              {
                step: "03",
                title: "Record & recover",
                desc: "Log credit and debit instantly. Send reminders and watch dues come back.",
                icon: Bell,
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-brutal border-2 border-ink bg-white p-6 shadow-brutal-sm">
                <span className="absolute -top-4 left-6 rounded-full border-2 border-ink bg-accent px-3 py-1 text-sm font-extrabold text-white">
                  {item.step}
                </span>
                <item.icon className="mt-4 h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-center lg:py-20">
        <div className="container-page">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Ready to never forget an udhaar again?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Join thousands of shopkeepers who trust HisabDo to keep their khata
            clean and their money moving.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/auth/signup" size="lg" className="bg-accent text-white shadow-brutal-sm hover:bg-accent-dark">
              Create Free Account
            </Button>
            <Button
              href="/download"
              variant="secondary"
              size="lg"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-page py-10 text-center">
        <p className="text-sm font-semibold text-ink-faint">
          Trusted by shopkeepers across Pakistan — from Karachi&apos;s Saddar to
          Lahore&apos;s Anarkali.
        </p>
      </section>
    </div>
  );
}
