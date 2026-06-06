import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | The Garrison",
  description: "Privacy policy for The Garrison website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="PRIVACY POLICY"
        description="How we handle your information when you visit The Garrison online."
      />
      <Container className="pb-16 xl:pb-24">
        <div className="prose-invert max-w-2xl space-y-6 font-barlow text-charcoal-light">
          <p className="text-sm text-white">
            Last updated: {new Date().getFullYear()}
          </p>
          <section className="space-y-3">
            <h2 className="font-bebas text-xl tracking-widest text-white">
              WHO WE ARE
            </h2>
            <p>
              The Garrison ({siteConfig.address}) operates this website. For
              privacy enquiries, contact us at {siteConfig.email}.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-bebas text-xl tracking-widest text-white">
              WHAT WE COLLECT
            </h2>
            <p>
              We do not collect personal data through this website unless you
              contact us by email or phone. If you follow links to external
              ticket providers, their privacy policies apply.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-bebas text-xl tracking-widest text-white">
              COOKIES
            </h2>
            <p>
              This site may use essential cookies required for basic
              functionality. We do not use third-party advertising cookies at
              this time.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-bebas text-xl tracking-widest text-white">
              YOUR RIGHTS
            </h2>
            <p>
              You may request access to or deletion of any personal data we hold
              about you by emailing {siteConfig.email}.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
