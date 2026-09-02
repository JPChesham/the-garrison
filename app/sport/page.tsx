import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { LiveFixtures } from "@/components/sport/LiveFixtures";
import { ScreensPromo } from "@/components/sport/ScreensPromo";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getSportContent } from "@/lib/hygraph/get-sport-content";

export async function generateMetadata(): Promise<Metadata> {
  const sport = await getSportContent();
  return {
    title: "Sport Fixtures | The Garrison",
    description: sport.intro,
  };
}

function renderOverlayHeadline(headline: string) {
  const lines = headline.split("\n");
  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 ? <br /> : null}
      {/every screen/i.test(line) ? (
        <span className="text-electric">{line}</span>
      ) : (
        line
      )}
    </span>
  ));
}

export default async function SportPage() {
  const sport = await getSportContent();

  return (
    <>
      <PageHero
        variant="electric"
        eyebrow={sport.eyebrow}
        eyebrowClassName="text-electric"
        title={
          <>
            SPORT <span className="text-electric">FIXTURES</span>
          </>
        }
        description={sport.intro}
      />
      <Container className="pb-16 xl:pb-24">
        <div className="mb-8">
          <ScreensPromo
            title={sport.screensPromoTitle}
            subtitle={sport.screensPromoSubtitle}
          />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
          <LiveFixtures limit={12} />
          <div className="sport-action-glow relative min-h-[400px] overflow-hidden rounded-sm">
            <Image
              src={sport.actionImage.src}
              alt={sport.actionImage.alt}
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
                {renderOverlayHeadline(sport.overlayHeadline)}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
