import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-ink">Terms of Service</h1>
      <p className="text-sm text-ink-faint">Last updated: August 12, 2026</p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">1. Acceptance of terms</h2>
      <p>
        By creating an account or using HisabDo, you agree to these Terms of
        Service. If you do not agree, please do not use the service.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">2. Your account</h2>
      <p>
        You are responsible for keeping your login credentials secure and for
        all activity under your account. You must provide accurate business
        information when signing up.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">3. Acceptable use</h2>
      <p>
        You agree not to misuse the service, attempt to access other users&apos;
        data, or use the service for any unlawful activity. You are responsible
        for the accuracy of the entries you record.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">4. Payments & subscriptions</h2>
      <p>
        Paid plans are billed monthly or annually. You can cancel anytime;
        access continues until the end of your billing period. Refunds are at
        our discretion.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">5. Service availability</h2>
      <p>
        We aim to keep HisabDo available at all times but do not guarantee
        uninterrupted access. We may temporarily suspend the service for
        maintenance with reasonable notice where possible.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">6. Limitation of liability</h2>
      <p>
        HisabDo is provided &quot;as is&quot;. To the maximum extent permitted
        by law, we are not liable for any indirect, incidental, or consequential
        damages arising from your use of the service.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">7. Changes to terms</h2>
      <p>
        We may update these terms from time to time. We will notify you of
        material changes via email or in-app notice.
      </p>

      <h2 className="pt-4 text-xl font-extrabold text-ink">8. Contact</h2>
      <p>
        Questions about these terms? Contact us at{" "}
        <a href="mailto:support@hisabdo.pk" className="font-semibold text-primary">
          support@hisabdo.pk
        </a>
        .
      </p>
    </>
  );
}
