import Image from "next/image";
import { AwardBadge } from "@/components/ui/AwardBadge";
import { StatCard } from "@/components/cards/StatCard";
import { Container } from "@/components/ui/Container";
import { drinksImage, drinksStats } from "@/lib/content/drinks";

export function DrinksSection() {
  return (
    <section id="drinks" className="pint-gradient relative overflow-hidden py-16 xl:py-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, var(--color-pint-glow) 0%, transparent 55%)",
        }}
      />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 xl:gap-20">
          <div>
            <p className="mb-3 font-barlow text-xs font-extrabold uppercase tracking-widest text-amber">
              — THE MIDNIGHT POUR
            </p>
            <h2
              className="mb-4 font-bebas leading-none tracking-wide text-white"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              THE BEST
              <br />
              <span className="text-amber">PINT</span> IN
              <br />
              BARNSLEY.
              <br />
              <span className="text-ember">PERIOD.</span>
            </h2>
            <p className="mb-2 font-barlow text-base font-semibold text-charcoal-light">
              119.5 seconds. No shortcuts. No compromises.
            </p>
            <p className="mb-8 font-barlow text-sm leading-relaxed text-white opacity-80">
              Every Guinness poured to perfection. Every time. We&apos;ve been
              doing this since 2009 and we&apos;re not about to cut corners now.
            </p>
            <div className="mb-8 grid grid-cols-3 gap-4">
              {drinksStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
            <div className="rounded-sm border-l-4 border-amber bg-black/30 p-5">
              <p className="font-bebas text-xl leading-tight text-amber">
                HAPPY HOUR
              </p>
              <p className="font-barlow text-base font-bold text-white">
                Mon–Fri · 4PM – 7PM
              </p>
              <p className="mt-1 font-barlow text-sm text-charcoal-light">
                All draught pints £4.50. All day Sunday.
              </p>
            </div>
          </div>
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-sm"
              style={{
                height: 560,
                boxShadow:
                  "0 0 80px rgba(200,134,10,0.35), 0 0 160px rgba(200,134,10,0.15)",
              }}
            >
              <Image
                src={drinksImage.src}
                alt={drinksImage.alt}
                fill
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(26,26,26,0.4) 0%, transparent 40%)",
                }}
              />
            </div>
            <AwardBadge
              size="lg"
              rotation={2}
              borderColor="amber"
              className="absolute -top-4 -right-4 z-10 shadow-[0_0_30px_rgba(255,179,71,0.4)]"
              lines={[
                { text: "BEST", className: "text-amber text-sm" },
                { text: "PINT", className: "text-white text-base" },
                { text: "IN TOWN", className: "text-amber text-sm" },
              ]}
            />
            <AwardBadge
              rotation={1}
              borderColor="ember"
              className="absolute -bottom-4 -left-4 z-10 shadow-[0_0_30px_rgba(232,93,58,0.4)]"
              lines={[
                { text: "REAL ALE", className: "text-ember" },
                { text: "AWARD", className: "text-white" },
                { text: "2024", className: "text-amber" },
              ]}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
