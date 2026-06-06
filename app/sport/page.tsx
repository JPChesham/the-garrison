import type { Metadata } from "next";
import Image from "next/image";
import { Tv } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { FixturesList } from "@/components/sport/FixturesList";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { fixtures, sportActionImage, sportIntro } from "@/lib/content/fixtures";

export const metadata: Metadata = {
  title: "Sport Fixtures | The Garrison",
  description:
    "Live sport on six big screens at The Garrison, Barnsley. Sky Sports, TNT, ITV, and BBC.",
};

function ScreensPromo() {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-electric bg-charcoal-mid px-5 py-3 stage-glow-blue">
      <Tv className="h-5 w-5 text-electric xl:h-6 xl:w-6" />
      <div>
        <p className="font-bebas text-lg leading-tight text-white">
          6 SCREENS. ALL THE ACTION.
        </p>
        <p className="font-barlow text-xs font-semibold uppercase tracking-wider text-charcoal-light">
          Sky Sports · TNT · ITV · BBC
        </p>
      </div>
    </div>
  );
}

export default function SportPage() {
  return (
    <>
      <PageHero
        variant="electric"
        eyebrow="— LIVE ON THE BIG SCREENS"
        eyebrowClassName="text-electric"
        title={
          <>
            SPORT <span className="text-electric">FIXTURES</span>
          </>
        }
        description={sportIntro}
      />
      <Container className="pb-16 xl:pb-24">
        <div className="mb-8">
          <ScreensPromo />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
          <FixturesList fixtures={fixtures} />
          <div className="sport-action-glow relative min-h-[400px] overflow-hidden rounded-sm">
            <Image
              src={sportActionImage.src}
              alt={sportActionImage.alt}
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,120,255,0.3) 0%, transparent 50%, rgba(26,26,26,0.8) 100%)",
              }}
            />
            <div className="absolute top-6 left-6 z-10">
              <Tag variant="electric">LIVE SPORT</Tag>
            </div>
            <div className="absolute right-6 bottom-6 left-6 z-10">
              <p
                className="mb-2 font-bebas leading-none text-white"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
              >
                EVERY MATCH.
                <br />
                <span className="text-electric">EVERY SCREEN.</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
