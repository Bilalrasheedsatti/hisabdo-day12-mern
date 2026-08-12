import type { Metadata } from "next";
import { faqs } from "@/lib/data";
import Button from "@/components/ui/Button";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about HisabDo: pricing, reminders, data export, security and more.",
};

export default function FAQPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b-2 border-ink bg-[#EAF0FF] py-16 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Frequently asked <span className="text-primary">questions</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Everything you need to know about HisabDo. Can&apos;t find your
            answer? Just ask us.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={faqs} />
          <div className="mt-12 rounded-brutal border-2 border-ink bg-[#FFF7E6] p-8 text-center shadow-brutal-sm">
            <h2 className="text-xl font-extrabold text-ink">Still have questions?</h2>
            <p className="mt-2 text-ink-soft">
              Our team is happy to help you get started.
            </p>
            <div className="mt-6">
              <Button href="/contact">Contact Support</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
