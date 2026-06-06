import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-charcoal pt-16">
      <Container className="py-24 text-center">
        <p className="mb-2 font-barlow text-xs font-extrabold uppercase tracking-widest text-ember">
          — LOST IN THE CROWD
        </p>
        <h1 className="mb-4 font-bebas text-[clamp(4rem,10vw,8rem)] leading-none text-white">
          404
        </h1>
        <p className="mb-8 font-bebas text-2xl tracking-widest text-charcoal-light">
          PAGE NOT FOUND
        </p>
        <p className="mx-auto mb-8 max-w-md font-barlow text-charcoal-light">
          That page doesn&apos;t exist. Maybe it&apos;s gone for a pint.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" size="lg">
            BACK HOME
          </Button>
          <Button href="/events" variant="outline-charcoal" size="lg">
            SEE EVENTS
          </Button>
        </div>
      </Container>
    </section>
  );
}
