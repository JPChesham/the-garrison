import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LegendsGrid } from "@/components/legends/LegendsGrid";
import { getFeaturedLegends } from "@/lib/content/legends";

export function LegendsSection() {
  const featuredLegends = getFeaturedLegends();

  return (
    <section id="legends" className="purple-light-section overflow-hidden py-16 xl:py-24">
      <Container className="mb-10">
        <SectionHeader
          eyebrow="— THEY PLAYED HERE FIRST"
          eyebrowClassName="text-purple-light"
          title={
            <>
              GARRISON <span className="text-purple-light">LEGENDS</span>
            </>
          }
          action={
            <p className="hidden max-w-xs text-right font-barlow text-sm font-semibold text-charcoal-light lg:block">
              Hover to bring them back to life. Every legend started here.
            </p>
          }
        />
      </Container>
      <LegendsGrid legends={featuredLegends} layout="reel" />
      <Container className="mt-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-charcoal-light" />
          <Button variant="outline-purple" href="/legends">
            VIEW ALL LEGENDS →
          </Button>
          <div className="h-px flex-1 bg-charcoal-light" />
        </div>
      </Container>
    </section>
  );
}
