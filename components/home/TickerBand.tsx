import { Marquee } from "@/components/ui/Marquee";
import { marqueeItems } from "@/lib/content/home";

export function TickerBand() {
  return <Marquee items={marqueeItems} />;
}
