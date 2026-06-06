import Image from "next/image";
import Link from "next/link";
import { Tv } from "lucide-react";
import { FixturesListWithLink } from "@/components/sport/FixturesList";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { getSportFixtures } from "@/lib/football-data";
import { sportActionImage } from "@/lib/content/fixtures";

function ScreensPromo({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-sm border border-electric bg-charcoal-mid px-5 py-3 stage-glow-blue ${className ?? ""}`}
    >
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

export async function SportSection() {
  const fixtures = await getSportFixtures({ limit: 4 });

  return (
    <section id="sport" className="bg-charcoal py-16 xl:py-24">
      <Container>
        <SectionHeader
          eyebrow="— LIVE ON THE BIG SCREENS"
          eyebrowClassName="text-electric"
          title={
            <>
              SPORT <span className="text-electric">FIXTURES</span>
            </>
          }
          action={<ScreensPromo className="hidden lg:flex" />}
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-12">
          <div className="space-y-4">
            <FixturesListWithLink fixtures={fixtures} showViewAll />
            <ScreensPromo className="mt-4 lg:hidden" />
          </div>
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
              <p className="font-barlow text-sm font-semibold text-white opacity-80">
                The biggest moments in sport, live at The Garrison.
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
