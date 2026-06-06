import { Flag, HandMetal, Shield, Star } from "@/lib/icons";
import type { FixtureData } from "@/components/cards/FixtureCard";

export const fixtures: FixtureData[] = [
  {
    label: "TOMORROW",
    labelClassName: "text-ember",
    dotClassName: "bg-ember",
    live: true,
    home: { name: "MAN UTD", icon: Shield, iconClassName: "text-red-500" },
    away: { name: "CHELSEA", icon: Shield, iconClassName: "text-blue-400" },
    time: "3PM",
    dateShort: "SAT 7 JUN",
    broadcaster: "Sky Sports",
    broadcasterIconClassName: "text-red-500",
  },
  {
    label: "SUN 8 JUN",
    labelClassName: "text-electric",
    dotClassName: "bg-electric",
    home: { name: "BARNSLEY", icon: Star, iconClassName: "text-amber" },
    away: { name: "SHEFF WED", icon: Star, iconClassName: "text-white" },
    time: "1PM",
    dateShort: "SUN 8 JUN",
    broadcaster: "Sky Sports",
    broadcasterIconClassName: "text-electric",
  },
  {
    label: "SAT 14 JUN",
    labelClassName: "text-purple-light",
    dotClassName: "bg-purple-light",
    home: { name: "FURY", icon: HandMetal, iconClassName: "text-ember" },
    away: { name: "USYK", icon: HandMetal, iconClassName: "text-blue-400" },
    time: "9PM",
    dateShort: "SAT 14 JUN",
    broadcaster: "TNT Sports",
    broadcasterIconClassName: "text-purple-light",
  },
  {
    label: "WED 18 JUN",
    labelClassName: "text-amber",
    dotClassName: "bg-amber",
    home: { name: "ENGLAND", icon: Flag, iconClassName: "text-white" },
    away: { name: "FRANCE", icon: Flag, iconClassName: "text-red-500" },
    time: "8PM",
    dateShort: "WED 18 JUN",
    broadcaster: "ITV",
    broadcasterIconClassName: "text-amber",
  },
];

export const sportActionImage = {
  src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8aed88afdc-13ed7db99d358a4eae58.png",
  alt: "football match action shot dramatic lighting, stadium crowd roaring",
};

export const sportIntro =
  "Six big screens. Sky Sports, TNT, ITV, and BBC. Whether it's Barnsley on a Sunday or the biggest boxing night of the year, you'll not miss a minute.";
