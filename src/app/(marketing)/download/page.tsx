import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Apple, PlayCircle, QrCode, Smartphone, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Get the HisabDo app on Android and iOS. Take your digital khata everywhere you go.",
};

export default function DownloadPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b-2 border-ink bg-[#EAF0FF] py-16 lg:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Take your khata <span className="text-primary">everywhere</span>
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              Record entries, check balances, and send reminders — right from
              your pocket. Available on Android and iOS.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#" size="lg">
                <Apple className="h-6 w-6" />
                App Store
              </Button>
              <Button href="#" variant="secondary" size="lg">
                <PlayCircle className="h-6 w-6" />
                Google Play
              </Button>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Works offline in the shop",
                "Syncs across devices",
                "Urdu and English support",
                "Free to start",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Card className="mx-auto w-full max-w-sm rotate-1 shadow-brutal-lg">
            <div className="flex flex-col items-center text-center">
              <Smartphone className="h-16 w-16 text-primary" />
              <h2 className="mt-4 text-xl font-extrabold text-ink">Scan to download</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Point your camera at the QR code
              </p>
              <div className="mt-6 grid h-40 w-40 place-items-center rounded-lg border-2 border-ink bg-white p-3">
                <QrCode className="h-full w-full text-ink" />
              </div>
              <p className="mt-4 text-xs text-ink-faint">
                Available for Android 8+ and iOS 13+
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
