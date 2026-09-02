import Image from "next/image";
import Link from "next/link";
import { LiveFixtures } from "@/components/sport/LiveFixtures";
import { ScreensPromo } from "@/components/sport/ScreensPromo";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { getSportContent } from "@/lib/hygraph/get-sport-content";

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

export async function SportSection() {
  const sport = await getSportContent();

  return (
    <section id="sport" className="bg-charcoal py-16 xl:py-24">
      <Container>
        <SectionHeader
          eyebrow={sport.eyebrow}
          eyebrowClassName="text-electric"
          title={
            <>
              SPORT <span className="text-electric">FIXTURES</span>
            </>
          }
          action={
            <ScreensPromo
              title={sport.screensPromoTitle}
              subtitle={sport.screensPromoSubtitle}
              className="hidden lg:flex"
            />
          }
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
          <div className="space-y-4">
            <LiveFixtures limit={4} showViewAll />
            <ScreensPromo
              title={sport.screensPromoTitle}
              subtitle={sport.screensPromoSubtitle}
              className="mt-4 lg:hidden"
            />
          </div>
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
              <p className="font-barlow text-sm font-semibold text-white opacity-80">
                {sport.overlayBlurb}
              </p>
              <Link
                href="/sport"
                className="mt-4 inline-block font-barlow text-sm font-semibold uppercase tracking-wider text-electric hover:underline"
              >
                Full fixtures →
              </Link>
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 rounded-sm border-2 border-electric/30" />
          </div>
        </div>
      </Container>
    </section>
  );
}
