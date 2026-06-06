import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mapEmbedUrl, openingHours, visitInfo } from "@/lib/content/site";
import { siteConfig } from "@/lib/navigation";

type VisitInfoProps = {
  showMap?: boolean;
  showQuote?: boolean;
  showVisitDetails?: boolean;
  className?: string;
};

export function VisitInfo({
  showMap = true,
  showQuote = false,
  showVisitDetails = false,
  className,
}: VisitInfoProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {showMap ? (
        <div
          className="relative h-64 overflow-hidden rounded-sm border border-charcoal-light"
          style={{ filter: "grayscale(80%) contrast(1.1)" }}
        >
          <iframe
            src={mapEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            title="The Garrison Location"
          />
        </div>
      ) : null}

      <div className="rounded-sm border border-ember bg-charcoal-mid p-4">
        <p className="font-bebas text-xl leading-tight text-ember">
          {siteConfig.name}
        </p>
        <p className="mt-1 flex items-start gap-2 font-barlow text-sm text-white">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
          {siteConfig.address}
        </p>
        <p className="mt-1 flex items-center gap-2 font-barlow text-sm text-charcoal-light">
          <Phone className="h-4 w-4 shrink-0 text-ember" />
          {siteConfig.phone}
        </p>
        <p className="mt-1 flex items-center gap-2 font-barlow text-sm text-charcoal-light">
          <Mail className="h-4 w-4 shrink-0 text-ember" />
          {siteConfig.email}
        </p>
      </div>

      {showVisitDetails ? (
        <div className="space-y-3 rounded-sm border border-charcoal-light bg-charcoal-mid p-5">
          <p className="font-barlow text-sm leading-relaxed text-white">
            {visitInfo.walkIns}
          </p>
          <p className="font-barlow text-sm text-charcoal-light">
            <span className="font-semibold text-white">Parking:</span>{" "}
            {visitInfo.parking}
          </p>
          <p className="font-barlow text-sm text-charcoal-light">
            <span className="font-semibold text-white">Getting here:</span>{" "}
            {visitInfo.transit}
          </p>
          <p className="font-barlow text-sm text-charcoal-light">
            <span className="font-semibold text-white">Accessibility:</span>{" "}
            {visitInfo.accessibility}
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        {openingHours.map((slot) => (
          <div
            key={slot.days}
            className="rounded-sm border border-charcoal-light bg-charcoal-mid p-4 text-center"
          >
            <Clock className="mx-auto mb-2 h-5 w-5 text-ember" />
            <p className="font-bebas text-base text-white">{slot.days}</p>
            <p className="font-barlow text-xs font-semibold text-charcoal-light">
              {slot.hours}
            </p>
          </div>
        ))}
        <Link
          href={siteConfig.phoneHref}
          className="flex flex-col items-center justify-center rounded-sm bg-ember p-4 text-center transition-colors hover:bg-ember-dark"
        >
          <Phone className="mb-2 h-5 w-5 text-white" />
          <p className="font-bebas text-base text-white">CALL US</p>
          <p className="font-barlow text-xs font-semibold text-white">
            {siteConfig.phone}
          </p>
        </Link>
      </div>

      {showQuote ? (
        <p className="font-barlow text-sm italic text-charcoal-light">
          Walk-ins welcome — no reservations needed.
        </p>
      ) : null}
    </div>
  );
}
