import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DateBadge } from "@/components/ui/DateBadge";
import { Tag } from "@/components/ui/Tag";
import {
  getAllEventSlugs,
  getEventBySlug,
} from "@/lib/content/events";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };

  const title = event.title.replace("\n", " ");
  return {
    title: `${title} | The Garrison`,
    description: event.description,
  };
}

const dateVariants = {
  purple: "amber" as const,
  ember: "ember" as const,
  electric: "electric" as const,
};

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const titlePlain = event.title.replace("\n", " ");

  return (
    <>
      <section className="relative pt-16">
        <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
          <Image
            src={event.image}
            alt={event.imageAlt}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        </div>
        <Container className="relative -mt-24 pb-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Events", href: "/events" },
              { label: titlePlain },
            ]}
          />
          <div className="flex flex-wrap items-start gap-6">
            <DateBadge
              day={event.day}
              date={event.date}
              month={event.month}
              variant={dateVariants[event.variant]}
            />
            <div>
              <Tag variant={event.tagVariant}>{event.tag}</Tag>
              <h1 className="mt-2 font-bebas text-[clamp(2.5rem,5vw,4rem)] leading-none whitespace-pre-line text-white">
                {event.title}
              </h1>
              <p className="mt-2 font-barlow text-sm font-semibold uppercase tracking-wider text-charcoal-light">
                {event.subtitle}
              </p>
            </div>
          </div>
        </Container>
      </section>
      <Container className="pb-16 xl:pb-24">
        <div className="max-w-2xl">
          <p className="font-barlow text-base leading-relaxed text-white">
            {event.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 font-barlow text-sm font-semibold uppercase tracking-wider text-charcoal-light">
            {event.meta.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-ember" />
                  {item.label}
                </span>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {event.ticketUrl ? (
              <Button href={event.ticketUrl} size="lg" className="stage-glow-ember">
                {event.ticketCta ?? "GET TICKETS"}
              </Button>
            ) : (
              <p className="rounded-sm border border-charcoal-light bg-charcoal-mid px-5 py-3 font-bebas text-lg tracking-widest text-white">
                FREE ENTRY — JUST TURN UP
              </p>
            )}
            <Button variant="outline-charcoal" href="/events">
              ← ALL EVENTS
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
