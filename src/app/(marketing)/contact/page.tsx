import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the HisabDo team for support, feedback, or partnership inquiries.",
};

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: "support@hisabdo.pk",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+92 300 1234567",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 300 1234567",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Karachi, Pakistan",
  },
];

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b-2 border-ink bg-[#FFF7E6] py-16 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Let&apos;s <span className="text-primary">talk</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
           Questions, feedback, or partnership — our team replies within one
              business day.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-5 lg:py-20">
        <div className="space-y-4 lg:col-span-2">
          {channels.map((channel) => (
            <Card key={channel.label} className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-primary-light text-primary-dark">
                <channel.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-faint">{channel.label}</p>
                <p className="truncate font-bold text-ink">{channel.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-3">
          <h2 className="text-xl font-extrabold text-ink">Send us a message</h2>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input label="Full name" name="name" placeholder="Your name" required />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Phone (optional)"
              name="phone"
              type="tel"
              placeholder="03xx-xxxxxxx"
              className="sm:col-span-2"
            />
            <Input
              label="Subject"
              name="subject"
              placeholder="How can we help?"
              className="sm:col-span-2"
            />
            <Textarea
              label="Message"
              name="message"
              rows={5}
              placeholder="Tell us more..."
              className="sm:col-span-2"
              required
            />
            <div className="sm:col-span-2">
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
