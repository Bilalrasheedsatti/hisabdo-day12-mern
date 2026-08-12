import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-ink">Privacy Policy</h1>
      <p className="text-sm text-ink-faint">Last updated: August 12, 2026</p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">1. Information we collect</h2>
      <p>
        We collect the information you provide when creating an account, such as
        your business name, phone number, and the customer and transaction data
        you record in your khata. We also collect basic usage data to improve
        the product.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">2. How we use your data</h2>
      <p>
        Your data is used to provide and improve HisabDo services, send payment
        reminders on your behalf, generate reports, and provide customer
        support. We never sell your personal data to third parties.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">3. Data storage & security</h2>
      <p>
        Your khata data is stored on secure servers with encryption in transit
        and at rest. Access to your data is protected with authentication, and
        you can export or delete your data at any time.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">4. Sharing</h2>
      <p>
        We only share data with service providers necessary to operate the app
        (such as SMS/WhatsApp gateway providers for sending your reminders) and
        only to the extent needed to provide those services.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">5. Your choices</h2>
      <p>
        You can update or delete your business profile, export your data as
        CSV/Excel, and close your account at any time from the Settings page.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">6. Contact</h2>
      <p>
        Questions about this policy? Contact us at{" "}
        <a href="mailto:support@hisabdo.pk" className="font-semibold text-primary">
          support@hisabdo.pk
        </a>
        .
      </p>
    </>
  );
}
