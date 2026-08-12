import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { MapPin, Mail, Users, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about HisabDo — our mission to digitize khata bookkeeping for shopkeepers and small businesses across Pakistan.",
};

const values = [
  {
    icon: Users,
    title: "Built for the bazaar",
    desc: "We design with shopkeepers, not just for them. Simple, fast, and Urdu-friendly.",
  },
  {
    icon: Heart,
    title: "Trust first",
    desc: "Your khata is your livelihood. We protect it with secure backups and honest pricing.",
  },
  {
    icon: MapPin,
    title: "Proudly Pakistani",
    desc: "From Karachi to Peshawar, we're solving a local problem with local sensibilities.",
  },
  {
    icon: Mail,
    title: "Always listening",
    desc: "Our roadmap comes from real feedback from shopkeepers who use HisabDo daily.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b-2 border-ink bg-[#FFF7E6] py-16 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Khata, but <span className="text-primary">made digital</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            HisabDo started with a simple observation: millions of shopkeepers in
            Pakistan still track their udhaar in paper registers that get lost,
            torn, or forgotten. We built a digital khata that is just as simple
            to use — but never loses a record.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            Our story
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p>
              What began as a weekend project to help a family grocery store
              track its credit customers quickly became a mission. We saw how
              much money was lost every year to forgotten entries and
              uncomfortable reminders.
            </p>
            <p>
              Today HisabDo helps shopkeepers record entries in seconds, send
              polite reminders automatically, and see exactly who owes them — all
              from their phone or computer.
            </p>
            <p>
              We believe             technology should serve the people who run our markets,
              not complicate their day. That&apos;s why HisabDo stays simple,
              fast, and free to start.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/auth/signup">Start your khata</Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <Card key={value.title}>
              <value.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-bold text-ink">{value.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{value.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
