import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LegendsGrid } from "@/components/legends/LegendsGrid";
import { Container } from "@/components/ui/Container";
import { getLegends } from "@/lib/hygraph/get-legends";

export const metadata: Metadata = {
  title: "Garrison Legends | The Garrison",
  description:
    "Artists who played The Garrison first — the legends archive from Barnsley's home of live music.",
};

export default async function LegendsPage() {
  const legends = await getLegends();

  return (
    <>
      <PageHero
        variant="purple"
        eyebrow="— THEY PLAYED HERE FIRST"
        eyebrowClassName="text-purple-light"
        title={
          <>
            GARRISON <span className="text-purple-light">LEGENDS</span>
          </>
        }
        description="Every legend started here. Browse the archive of artists who've graced our stage."
      />
      <Container className="pb-16 xl:pb-24">
        {legends.length > 0 ? (
          <LegendsGrid legends={legends} layout="grid" />
        ) : (
          <p className="font-barlow text-base text-charcoal-light">
            Legends archive coming soon.
          </p>
        )}
      </Container>
    </>
  );
}
