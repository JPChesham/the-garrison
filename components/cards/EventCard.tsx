import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DateBadge } from "@/components/ui/DateBadge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tag } from "@/components/ui/Tag";
import type { EventCategory } from "@/lib/content/events";
import { cn } from "@/lib/utils/cn";

export type EventCardVariant = "purple" | "ember" | "electric";

export type EventMeta = {
  icon: LucideIcon;
  label: string;
};

export type EventData = {
  slug: string;
  category: EventCategory;
  featured?: boolean;
  variant: EventCardVariant;
  image: string;
  imageAlt: string;
  day: string;
  date: string;
  month: string;
  tag: string;
  tagVariant: EventCardVariant | "amber";
  title: string;
  subtitle: string;
  description: string;
  meta: EventMeta[];
  zIndex: number;
  marginTop?: string;
  ticketUrl?: string;
  ticketCta?: string;
};

const variantConfig: Record<
  EventCardVariant,
  {
    offsetShadow: string;
    stencilBorder: string;
    gradient: string;
    dateVariant: "amber" | "ember" | "electric";
  }
> = {
  purple: {
    offsetShadow: "offset-shadow-purple",
    stencilBorder: "stencil-border-purple",
    gradient: "from-purple to-electric",
    dateVariant: "amber",
  },
  ember: {
    offsetShadow: "offset-shadow",
    stencilBorder: "",
    gradient: "from-ember to-amber",
    dateVariant: "ember",
  },
  electric: {
    offsetShadow: "offset-shadow-blue",
    stencilBorder: "stencil-border-blue",
    gradient: "from-electric to-purple",
    dateVariant: "electric",
  },
};

type EventCardProps = {
  event: EventData;
  linkToDetail?: boolean;
};

export function EventCard({ event, linkToDetail = true }: EventCardProps) {
  const config = variantConfig[event.variant];
  const detailHref = `/events/${event.slug}`;

  const mainContent = (
    <>
      <div className="h-52 overflow-hidden">
        <Image
          src={event.image}
          alt={event.imageAlt}
          width={400}
          height={208}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5 pb-0">
        <div className="mb-4 flex items-start justify-between">
          <DateBadge
            day={event.day}
            date={event.date}
            month={event.month}
            variant={config.dateVariant}
          />
          <div className="ml-4 flex-1">
            <Tag variant={event.tagVariant}>{event.tag}</Tag>
            <h3 className="mt-2 font-bebas text-4xl leading-tight whitespace-pre-line text-white">
              {event.title}
            </h3>
            <p className="font-barlow text-xs font-semibold uppercase tracking-wider text-charcoal-light">
              {event.subtitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ScrollReveal>
      <article
        className={cn(
          "poster-card stencil-border overflow-visible rounded-sm bg-charcoal-mid",
          config.offsetShadow,
          config.stencilBorder,
        )}
        style={{ zIndex: event.zIndex, marginTop: event.marginTop }}
      >
        <div
          className={cn(
            "absolute top-0 right-0 left-0 z-10 h-1.5 bg-gradient-to-r",
            config.gradient,
          )}
        />
        {linkToDetail ? (
          <Link href={detailHref} className="block hover:opacity-95">
            {mainContent}
          </Link>
        ) : (
          mainContent
        )}
        <div className="flex items-center justify-between border-t border-charcoal-light p-5 pt-4">
          <div className="flex items-center gap-4 font-barlow text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            {event.meta.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="flex items-center gap-1">
                  <Icon className="h-3 w-3 text-ember" />
                  {item.label}
                </span>
              );
            })}
          </div>
          {event.ticketUrl ? (
            <Button href={event.ticketUrl} size="sm">
              {event.ticketCta ?? "GET TICKETS"}
            </Button>
          ) : linkToDetail ? (
            <Link
              href={detailHref}
              className="font-bebas text-sm tracking-widest text-ember hover:text-amber"
            >
              DETAILS →
            </Link>
          ) : null}
        </div>
      </article>
    </ScrollReveal>
  );
}
