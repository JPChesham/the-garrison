import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { VisitInfo } from "@/components/find-us/VisitInfo";
import { ownerQuote } from "@/lib/content/site";

export function CommunitySection() {
  return (
    <section id="community" className="bg-charcoal py-16 xl:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xl:gap-20">
          <div>
            <p className="mb-3 font-barlow text-xs font-extrabold uppercase tracking-widest text-ember">
              — ROOTED IN S70
            </p>
            <h2
              className="mb-2 font-bebas leading-none tracking-wide text-white"
              style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
            >
              PROUDLY
              <br />
              <span className="text-ember">BARNSLEY.</span>
            </h2>
            <p
              className="mb-6 font-bebas leading-none text-charcoal-light"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              NO RIFF-RAFF.
            </p>
            <div className="mb-6 rounded-sm border border-charcoal-light bg-charcoal-mid p-6">
              <p className="mb-4 font-barlow text-base leading-relaxed font-semibold text-white">
                {ownerQuote.text}
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={ownerQuote.avatar}
                  alt={ownerQuote.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border-2 border-ember object-cover"
                />
                <div>
                  <p className="font-bebas text-lg leading-tight text-white">
                    {ownerQuote.name}
                  </p>
                  <p className="font-barlow text-xs font-semibold text-charcoal-light">
                    {ownerQuote.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <VisitInfo />
        </div>
      </Container>
    </section>
  );
}
