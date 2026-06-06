import Image from "next/image";
import Link from "next/link";
import { Guitar, Mic, Music } from "lucide-react";
import { FeatureRow } from "@/components/cards/FeatureRow";
import { AwardBadge } from "@/components/ui/AwardBadge";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { liveMusicImage } from "@/lib/content/home";
import { siteConfig } from "@/lib/navigation";

const musicFeatures = [
  {
    icon: Guitar,
    iconBgClassName: "bg-purple",
    title: "FRIDAY NIGHTS",
    description: "Live bands from 9PM · Free entry",
  },
  {
    icon: Music,
    iconBgClassName: "bg-electric",
    title: "SATURDAY NIGHTS",
    description: "DJ sets & live acts from 10PM",
  },
  {
    icon: Mic,
    iconBgClassName: "bg-ember",
    title: "OPEN MIC WEDNESDAY",
    description: "Sign up from 7PM · All welcome",
  },
];

export function LiveMusicSection() {
  return (
    <section
      id="music-section"
      className="purple-light-section relative overflow-hidden py-16 xl:py-24"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, #8a2be2 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #0078ff 0%, transparent 60%)",
        }}
      />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 xl:gap-20">
          <div className="stage-glow-purple relative h-[480px] overflow-hidden rounded-sm">
            <Image
              src={liveMusicImage.src}
              alt={liveMusicImage.alt}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(26,26,26,0.2) 0%, rgba(138,43,226,0.2) 100%)",
              }}
            />
            <div className="absolute top-6 left-6 z-10">
              <Tag variant="purple">LIVE EVERY WEEKEND</Tag>
            </div>
          </div>
          <div>
            <p className="mb-3 font-barlow text-xs font-extrabold uppercase tracking-widest text-purple-light">
              — EVERY WEEKEND
            </p>
            <h2
              className="mb-8 font-bebas leading-none tracking-wide text-white"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              LIVE
              <br />
              <span className="text-purple-light">MUSIC</span>
            </h2>
            <div className="mb-8 space-y-4">
              {musicFeatures.map((feature) => (
                <FeatureRow key={feature.title} {...feature} />
              ))}
            </div>
            <div className="flex items-stretch gap-4">
              <div className="flex items-center gap-3">
                <AwardBadge
                  rotation={1}
                  borderColor="ember"
                  glow="ember"
                  lines={[
                    { text: "PROPER", className: "text-ember" },
                    { text: "LOUD", className: "text-white" },
                  ]}
                />
                <AwardBadge
                  size="md"
                  rotation={2}
                  borderColor="purple-light"
                  glow="purple"
                  lines={[
                    { text: "NORTHERN", className: "text-purple-light" },
                    { text: "SOUL", className: "text-white text-sm" },
                    { text: "VIBES", className: "text-ember" },
                  ]}
                />
              </div>
              <div className="flex flex-1 flex-col justify-center rounded-sm border border-charcoal-light bg-charcoal-mid p-4">
                <p className="font-bebas text-xl leading-tight text-white">
                  WANT TO PLAY?
                </p>
                <p className="mb-3 font-barlow text-sm font-semibold text-charcoal-light">
                  We&apos;re always booking acts.
                </p>
                <Link
                  href={`mailto:${siteConfig.gigsEmail}`}
                  className="font-barlow text-sm font-bold uppercase tracking-wider text-ember transition-colors hover:text-amber"
                >
                  GET IN TOUCH →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
