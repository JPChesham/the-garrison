import Image from "next/image";
import { MapPin } from "lucide-react";
import { AwardBadge } from "@/components/ui/AwardBadge";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/lib/content/home";
import { siteConfig } from "@/lib/navigation";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="grain-overlay relative min-h-[700px] overflow-hidden pt-16"
      style={{ height: "100vh" }}
    >
      <div className="flex h-full">
        <div className="relative z-10 flex w-full flex-col justify-center px-6 md:px-12 xl:px-20 lg:w-3/5">
          <div className="hero-left-overlay absolute inset-0 z-0" />
          <div className="absolute inset-0 z-0 lg:hidden">
            <Image
              src={heroContent.mobileImage}
              alt={heroContent.imageAlt}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="live-dot inline-block h-2.5 w-2.5 rounded-full bg-ember" />
              <span className="font-barlow text-xs font-extrabold uppercase tracking-widest text-ember">
                {heroContent.liveLabel}
              </span>
            </div>
            <h1
              className="stencil-text-hero mb-4 font-bebas leading-[0.88] text-white"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              BARNSLEY&apos;S
              <br />
              <span
                className="text-ember"
                style={{ fontSize: "clamp(4rem, 8.5vw, 8.5rem)" }}
              >
                HOME OF
              </span>
              <br />
              LIVE MUSIC
              <br />
              <span
                className="text-purple-light"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 7.5rem)" }}
              >
                &amp; SPORT
              </span>
            </h1>
            <p className="mb-8 font-barlow text-sm font-bold uppercase tracking-widest text-white opacity-70">
              No Frills. All Thrills. Est. 2009.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#events" size="lg" className="stage-glow-ember">
                SEE EVENTS
              </Button>
              <Button href="#sport" variant="outline-electric" size="lg">
                LIVE SPORT
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <AwardBadge
                rotation={1}
                borderColor="ember"
                glow="ember"
                lines={[
                  { text: "VOTED", className: "text-ember" },
                  { text: "BEST", className: "text-white" },
                  { text: "2024", className: "text-ember" },
                ]}
              />
              <AwardBadge
                size="md"
                rotation={2}
                borderColor="purple"
                glow="purple"
                lines={[
                  { text: "REAL ALE", className: "text-purple-light" },
                  { text: "AWARD", className: "text-white text-sm" },
                  { text: "2024", className: "text-amber" },
                ]}
              />
              <div className="hidden items-center gap-2 text-charcoal-light md:flex">
                <MapPin className="h-4 w-4 text-ember" />
                <span className="font-barlow text-sm font-semibold">
                  {siteConfig.addressShort}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-2/5 overflow-hidden lg:block">
          <Image
            src={heroContent.desktopImage}
            alt={heroContent.imageAlt}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="hero-right-overlay absolute inset-0 z-10" />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(138,43,226,0.3) 0%, transparent 70%)",
            }}
          />
          <div className="absolute right-8 bottom-8 z-20 text-right">
            <p className="font-bebas text-5xl leading-none text-white opacity-20">
              THE
              <br />
              GARRISON
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
