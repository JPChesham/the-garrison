import Image from "next/image";
import { AwardBadge } from "@/components/ui/AwardBadge";
import { StatCard } from "@/components/cards/StatCard";
import { Container } from "@/components/ui/Container";
import { getDrinksContent } from "@/lib/hygraph/get-drinks-content";

function renderHeadline(headline: string) {
  const lines = headline.split("\n");
  return lines.map((line, index) => {
    const isAccent = /pint|period/i.test(line);
    return (
      <span key={`${line}-${index}`}>
        {index > 0 ? <br /> : null}
        {isAccent ? (
          <span className={/period/i.test(line) ? "text-ember" : "text-amber"}>
            {line}
          </span>
        ) : (
          line
        )}
      </span>
    );
  });
}

export async function DrinksSection() {
  const drinks = await getDrinksContent();

  return (
    <section
      id="drinks"
      className="pint-gradient relative overflow-hidden py-16 xl:py-24"
    >
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
              {drinks.eyebrow}
            </p>
            <h2
              className="mb-4 font-bebas leading-none tracking-wide text-white"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              {renderHeadline(drinks.headline)}
            </h2>
            <p className="mb-2 font-barlow text-base font-semibold text-charcoal-light">
              {drinks.tagline}
            </p>
            <p className="mb-8 font-barlow text-sm leading-relaxed text-white opacity-80">
              {drinks.body}
            </p>
            <div className="mb-8 grid grid-cols-3 gap-4">
              {drinks.stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
            <div className="rounded-sm border-l-4 border-amber bg-black/30 p-5">
              <p className="font-bebas text-xl leading-tight text-amber">
                {drinks.happyHour.title}
              </p>
              <p className="font-barlow text-base font-bold text-white">
                {drinks.happyHour.times}
              </p>
              <p className="mt-1 font-barlow text-sm text-charcoal-light">
                {drinks.happyHour.detail}
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
                src={drinks.image.src}
                alt={drinks.image.alt}
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
