import { Marquee } from "@/components/ui/Marquee";
import { getMarqueeItems } from "@/lib/hygraph/get-home-content";

export async function TickerBand() {
  const marqueeItems = await getMarqueeItems();
  return <Marquee items={marqueeItems} />;
}
